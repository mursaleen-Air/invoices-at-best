import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
        }

        const { error } = await supabase
            .from("documents")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id); // Ensure user owns the document

        if (error) {
            console.error("Failed to delete document:", error);
            return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete document error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
