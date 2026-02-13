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
        // Handle Dropbox URLs
        if (fileUrl.includes('dropbox.com')) {
            let dropboxUrl = fileUrl;
            if (isDownload) {
                dropboxUrl = dropboxUrl.replace('dl=0', 'dl=1');
            }
            return NextResponse.redirect(dropboxUrl);
        }

        // Handle Cloudinary URLs
        if (fileUrl.includes('cloudinary.com') && fileUrl.includes('/upload/') && !fileUrl.includes('/s--')) {
            if (isDownload) {
                const parts = fileUrl.split('/upload/');
                const downloadUrl = `${parts[0]}/upload/fl_attachment/${parts[1]}`;
                return NextResponse.redirect(downloadUrl);
            }
        }

        return NextResponse.redirect(fileUrl);

    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.redirect(fileUrl);
    }
}
