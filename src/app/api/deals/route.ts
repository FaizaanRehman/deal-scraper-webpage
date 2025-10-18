import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const deals = await prisma.deal.findMany();
        return NextResponse.json(deals, { status: 200 });
    } catch (error) { 
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch deals"}, { status: 200 });
    }
}