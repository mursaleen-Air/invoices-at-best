type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: string;
    context?: Record<string, unknown>;
    error?: {
        name: string;
        message: string;
        stack?: string;
    };
}

const LOG_LEVELS: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
};

function getMinLevel(): LogLevel {
    const env = process.env.NODE_ENV;
    if (env === "production") return "info";
    return "debug";
}

function shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[getMinLevel()];
}

function formatEntry(entry: LogEntry): string {
    const base = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`;
    if (entry.context) {
        return `${base} ${JSON.stringify(entry.context)}`;
    }
    return base;
}

function createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    error?: Error
): LogEntry {
    return {
        level,
        message,
        timestamp: new Date().toISOString(),
        context,
        error: error
            ? {
                name: error.name,
                message: error.message,
                stack: process.env.NODE_ENV !== "production" ? error.stack : undefined,
            }
            : undefined,
    };
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>, error?: Error) {
    if (!shouldLog(level)) return;

    const entry = createEntry(level, message, context, error);
    const formatted = formatEntry(entry);

    switch (level) {
        case "debug":
            console.debug(formatted);
            break;
        case "info":
            console.info(formatted);
            break;
        case "warn":
            console.warn(formatted);
            break;
        case "error":
            console.error(formatted);
            if (entry.error?.stack) {
                console.error(entry.error.stack);
            }
            break;
    }
}

export const logger = {
    debug: (message: string, context?: Record<string, unknown>) =>
        log("debug", message, context),
    info: (message: string, context?: Record<string, unknown>) =>
        log("info", message, context),
    warn: (message: string, context?: Record<string, unknown>) =>
        log("warn", message, context),
    error: (message: string, error?: Error, context?: Record<string, unknown>) =>
        log("error", message, context, error),
};

export type { LogLevel, LogEntry };
