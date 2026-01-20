import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        const magazines = await prisma.magazine.findMany({
            orderBy: { publishedAt: 'desc' },
        });
        return NextResponse.json(magazines);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch magazines' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, issue, description, coverUrl, category, pdfUrl } = body;

        const magazine = await prisma.magazine.create({
            data: {
                title,
                issue,
                description,
                coverUrl,
                category,
                pdfUrl: pdfUrl || null,
            },
        });
        return NextResponse.json(magazine);
    } catch (error) {
        console.error('Magazine creation error:', error);
        return NextResponse.json({ error: 'Failed to create magazine' }, { status: 500 });
    }
}
