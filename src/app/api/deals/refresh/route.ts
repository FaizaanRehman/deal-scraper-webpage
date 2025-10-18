import { NextRequest, NextResponse } from "next/server";
import { refreshDeals } from "@/lib/dealService";

export async function POST(request: NextRequest) {
    try {
        await refreshDeals();
        return NextResponse.json({ message: "Deals refreshed successfully"});
    } catch (error) {
        console.error("Error refreshing deals:", error);
        return NextResponse.json({ error: "Failed to refresh deals" }, { status: 500 });
    }
}