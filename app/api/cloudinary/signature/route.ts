import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { paramsToSign } = body;

        const apiSecret = process.env.CLOUDINARY_API_SECRET;

        if (!apiSecret) {
            return NextResponse.json(
                { error: 'Cloudinary API Secret not configured' },
                { status: 500 }
            );
        }

        // Cloudinary requires SHA-1 (not SHA-256) and specific parameter formatting
        const sortedParams = Object.keys(paramsToSign)
            .sort()
            .map(key => `${key}=${paramsToSign[key]}`)
            .join('&');

        const signature = crypto
            .createHash('sha1')
            .update(sortedParams + apiSecret)
            .digest('hex');

        return NextResponse.json({ signature });
    } catch (error) {
        console.error('Signature generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate signature' },
            { status: 500 }
        );
    }
}
