import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    const isDownload = searchParams.get('download') === 'true';

    if (!fileUrl) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        // Fetch the file from the original URL (Cloudinary or elsewhere)
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        // Get the filename from the URL or a fallback
        const urlPath = new URL(fileUrl).pathname;
        const filename = urlPath.split('/').pop() || 'download.pdf';

        // Create headers for the response
        const headers = new Headers();

        // Pass through essential headers
        const contentType = response.headers.get('Content-Type');
        if (contentType) headers.set('Content-Type', contentType);

        const contentLength = response.headers.get('Content-Length');
        if (contentLength) headers.set('Content-Length', contentLength);

        // Force download if requested
        if (isDownload) {
            headers.set('Content-Disposition', `attachment; filename="${filename}"`);
        } else {
            headers.set('Content-Disposition', 'inline');
        }

        // Stream the response body
        return new NextResponse(response.body, {
            status: 200,
            headers,
        });

    } catch (error) {
        console.error('Download error:', error);
        // Fallback to direct redirect if proxying fails
        return NextResponse.redirect(fileUrl);
    }
}
