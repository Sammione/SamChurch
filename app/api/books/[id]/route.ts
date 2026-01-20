import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;

        if (!id) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        await prisma.book.delete({
            where: { id },
        });

        return NextResponse.json({ success: true, message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Book deletion error:', error);
        return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
    }
}
