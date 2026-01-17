import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        const sermons = await prisma.sermon.findMany({
            orderBy: { date: 'desc' },
        });
        return NextResponse.json(sermons);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch sermons' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const sermon = await prisma.sermon.create({
            data: {
                ...body,
                date: new Date(body.date),
            },
        });
        return NextResponse.json(sermon);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create sermon' }, { status: 500 });
    }
}
