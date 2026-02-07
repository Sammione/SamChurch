import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const archives = await prisma.archive.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(archives);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch archives" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { title, description, type, fileUrl, coverUrl, year } = await req.json();

        const archive = await prisma.archive.create({
            data: {
                title,
                description,
                type,
                fileUrl,
                coverUrl,
                year,
            },
        });

        return NextResponse.json(archive);
    } catch (error) {
        console.error("Error creating archive:", error);
        return NextResponse.json({ error: "Failed to create archive" }, { status: 500 });
    }
}
