import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get all documents for this user
        const { data: documents, error } = await supabase
            .from("documents")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Failed to fetch documents:", error);
            return NextResponse.json({
                totalDocuments: 0,
                thisMonth: 0,
                totalRevenue: 0,
                uniqueClients: 0,
                recentDocuments: [],
            });
        }

        const allDocs = documents || [];

        // Calculate stats
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

        const thisMonthDocs = allDocs.filter(
            (doc) => doc.created_at >= startOfMonth
        );

        const totalRevenue = allDocs.reduce(
            (sum, doc) => sum + (parseFloat(doc.total_amount) || 0),
            0
        );

        const uniqueClients = new Set(
            allDocs.map((doc) => doc.customer_name?.toLowerCase().trim()).filter(Boolean)
        ).size;

        // Get the 5 most recent documents
        const recentDocuments = allDocs.slice(0, 5).map((doc) => ({
            id: doc.id,
            documentType: doc.document_type,
            documentNumber: doc.document_number,
            customerName: doc.customer_name,
            totalAmount: parseFloat(doc.total_amount) || 0,
            currency: doc.currency,
            createdAt: doc.created_at,
        }));

        return NextResponse.json({
            totalDocuments: allDocs.length,
            thisMonth: thisMonthDocs.length,
            totalRevenue: Math.round(totalRevenue * 100) / 100,
            uniqueClients,
            recentDocuments,
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({
            totalDocuments: 0,
            thisMonth: 0,
            totalRevenue: 0,
            uniqueClients: 0,
            recentDocuments: [],
        });
    }
}
