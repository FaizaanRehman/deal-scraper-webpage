import { NextRequest, NextResponse } from "next/server";
import { refreshDeals } from "@/lib/dealService";

const secret = process.env.CRON_SECRET;

export async function POST(request : NextRequest): Promise<NextResponse> {
    const authorization = request.headers.get('Authorization');

    if (authorization !== `Bearer ${secret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try {
        await refreshDeals();
        return NextResponse.json({ message: "Deals refreshed successfully"});
    } catch (error) {
        console.error("Error refreshing deals:", error);
        return NextResponse.json({ error: "Failed to refresh deals" }, { status: 500 });
    }
}