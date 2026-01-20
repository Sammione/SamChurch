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
        const { title, author, description, coverUrl, category, price, pages, pdfUrl } = body;

        const book = await prisma.book.create({
            data: {
                title,
                author,
                description,
                coverUrl,
                category,
                price: price || "Digital Gift",
                pages,
                pdfUrl: pdfUrl || null,
            },
        });
        return NextResponse.json(book);
    } catch (error) {
        console.error('Book creation error:', error);
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
    }
}
