import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        env: {
            DATABASE_URL_SET: !!process.env.DATABASE_URL,
            JWT_SECRET_SET: !!process.env.JWT_SECRET,
            NODE_ENV: process.env.NODE_ENV,
            DB_URL_START: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 10) + "..." : "NOT SET",
        },
    });
}
