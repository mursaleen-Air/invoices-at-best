import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const supabase = await createClient();

    // Sign out from Supabase (invalidates the server-side session)
    await supabase.auth.signOut();

    // Clear all Supabase-related cookies from the response
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const response = NextResponse.json({ success: true });

    allCookies.forEach((cookie) => {
        if (cookie.name.startsWith("sb-") || cookie.name.includes("supabase")) {
            response.cookies.set(cookie.name, "", {
                expires: new Date(0),
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
            });
        }
    });

    return response;
}
