import { NextResponse } from "next/server";
import { logger } from "./logger";

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

// In-memory store - works for single-instance deployments
// For multi-instance, use Redis or similar
const rateLimitStore = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
    const now = Date.now();
    if (now - lastCleanup < CLEANUP_INTERVAL) return;
    lastCleanup = now;

    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}

export interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    limit: number;
}

export function checkRateLimit(
    identifier: string,
    config: RateLimitConfig = { maxRequests: 60, windowMs: 60_000 }
): RateLimitResult {
    cleanup();

    const now = Date.now();
    const key = identifier;
    const existing = rateLimitStore.get(key);

    if (!existing || now > existing.resetTime) {
        const entry: RateLimitEntry = {
            count: 1,
            resetTime: now + config.windowMs,
        };
        rateLimitStore.set(key, entry);
        return {
            allowed: true,
            remaining: config.maxRequests - 1,
            resetTime: entry.resetTime,
            limit: config.maxRequests,
        };
    }

    existing.count += 1;

    if (existing.count > config.maxRequests) {
        logger.warn("Rate limit exceeded", { identifier, count: existing.count });
        return {
            allowed: false,
            remaining: 0,
            resetTime: existing.resetTime,
            limit: config.maxRequests,
        };
    }

    return {
        allowed: true,
        remaining: config.maxRequests - existing.count,
        resetTime: existing.resetTime,
        limit: config.maxRequests,
    };
}

export function rateLimitResponse(result: RateLimitResult): NextResponse {
    return NextResponse.json(
        {
            success: false,
            error: "Too many requests. Please try again later.",
        },
        {
            status: 429,
            headers: {
                "X-RateLimit-Limit": result.limit.toString(),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": result.resetTime.toString(),
                "Retry-After": Math.ceil(
                    (result.resetTime - Date.now()) / 1000
                ).toString(),
            },
        }
    );
}

export function addRateLimitHeaders(
    response: NextResponse,
    result: RateLimitResult
): NextResponse {
    response.headers.set("X-RateLimit-Limit", result.limit.toString());
    response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
    response.headers.set("X-RateLimit-Reset", result.resetTime.toString());
    return response;
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }
    const realIp = request.headers.get("x-real-ip");
    if (realIp) {
        return realIp;
    }
    return "unknown";
}
