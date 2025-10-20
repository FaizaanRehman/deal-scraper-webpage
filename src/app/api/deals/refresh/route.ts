import { NextRequest, NextResponse } from "next/server";
import { refreshDeals } from "@/lib/dealService";

const API_KEY = process.env.REFRESH_DEALS_API_KEY;

export async function POST(request : NextRequest) {
    const authorization = request.headers.get('Authorization');
    const secret = process.env.CRON_SECRET;

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