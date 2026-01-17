import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    try {
        const books = await prisma.book.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const book = await prisma.book.create({
            data: body,
        });
        return NextResponse.json(book);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
    }
}
