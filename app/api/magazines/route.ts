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
        const magazine = await prisma.magazine.create({
            data: body,
        });
        return NextResponse.json(magazine);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create magazine' }, { status: 500 });
    }
}
