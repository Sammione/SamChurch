import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function POST(request: Request) {
    try {
        const { email } = await request.json();
        const subscriber = await prisma.subscriber.create({
            data: { email },
        });
        return NextResponse.json(subscriber);
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }
}
