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

    if (!fileUrl) {
        return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    try {
        // Only process Cloudinary URLs
        if (!fileUrl.includes('cloudinary.com')) {
            return NextResponse.redirect(fileUrl);
        }

        // Check for placeholders in env
        if (!process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET.includes('...')) {
            console.error('Cloudinary API Secret is missing or contains placeholder markers.');
            return NextResponse.redirect(fileUrl);
        }

        // Robust parsing: Everything after 'upload/'
        const uploadMarker = '/upload/';
        const uploadPos = fileUrl.indexOf(uploadMarker);
        if (uploadPos === -1) return NextResponse.redirect(fileUrl);

        // Get everything after '/upload/'
        let pathAfterUpload = fileUrl.substring(uploadPos + uploadMarker.length);

        // Split by '/' to find transformations and public ID
        const parts = pathAfterUpload.split('/');

        // Find where the public ID starts by skipping transformations and version
        let startIndex = 0;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            // Skip transformations: 
            // - Starts with 's--' (signature)
            // - Starts with 'fl_' (flags)
            // - Contains ',' or '=' (common transformation parameters)
            // - Is a version string (v + digits)
            const isTransformation = part.startsWith('s--') ||
                part.startsWith('fl_') ||
                part.includes(',') ||
                part.includes('=');
            const isVersion = part.startsWith('v') && /^\d+$/.test(part.substring(1));

            if (isTransformation || isVersion) {
                startIndex = i + 1;
            } else {
                // First part that isn't a transformation/version is the start of the public ID
                break;
            }
        }

        let publicIdWithExt = parts.slice(startIndex).join('/');

        // Extract resource type from URL (image, raw, video)
        const urlParts = fileUrl.split('/');
        const uploadIdx = urlParts.indexOf('upload');
        const resourceType = (uploadIdx > 0 ? urlParts[uploadIdx - 1] : 'image') as any;

        // Separate public ID from extension
        let publicId = publicIdWithExt;
        if (resourceType === 'image' && publicId.toLowerCase().endsWith('.pdf')) {
            publicId = publicId.substring(0, publicId.lastIndexOf('.'));
        }

        // User mentioned resources folder. If the publicId doesn't have it, 
        // we might want to try both, but Cloudinary SDK needs one.
        // We'll stick to the one extracted from the URL first.

        // Determine if we should sign the URL (only for non-public assets or special cases)
        const sign = searchParams.get('sign') === 'true';
        const isDownload = searchParams.get('download') === 'true';

        const signedUrl = cloudinary.url(publicId, {
            resource_type: resourceType,
            sign_url: sign,
            secure: true,
            flags: isDownload ? 'attachment' : undefined,
            analytics: false,
            format: (resourceType === 'image' && publicIdWithExt.toLowerCase().endsWith('.pdf')) ? 'pdf' : undefined
        });

        console.log(`[Signed Proxy] Parsed PublicID: ${publicId}, ResourceType: ${resourceType}, Target: ${signedUrl}`);

        return NextResponse.redirect(signedUrl);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        // Fallback to original URL if signature fails
        return NextResponse.redirect(fileUrl);
    }
}
