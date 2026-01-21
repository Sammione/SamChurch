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

        // Split by '/' to find transformations and version
        const parts = pathAfterUpload.split('/');

        // Skip transformations (usually the first part if it doesn't start with 'v' followed by numbers, 
        // and doesn't look like a real public ID)
        // AND skip the version (v12345)
        let startIndex = 0;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            // If it's a version string (v + digits)
            if (part.startsWith('v') && /^\d+$/.test(part.substring(1))) {
                startIndex = i + 1;
                break;
            }
            // If it looks like a transformation (contains '_' or is very short)
            // This is tricky, but usually the public ID is the LAST part(s)
            // We'll assume the version is the best anchor.
        }

        // If no version found, we might be looking at the public ID directly or transformations
        // Cloudinary Public IDs can have folders, but legacy ones might not.
        let publicIdWithExt = parts.slice(startIndex).join('/');

        // Extract resource type from URL (image, raw, video)
        const urlParts = fileUrl.split('/');
        const resourceType = urlParts[urlParts.indexOf('upload') - 1] as any;

        // Separate public ID from extension
        let publicId = publicIdWithExt;
        if (resourceType === 'image' && publicId.toLowerCase().endsWith('.pdf')) {
            publicId = publicId.substring(0, publicId.lastIndexOf('.'));
        }

        // User mentioned resources folder. If the publicId doesn't have it, 
        // we might want to try both, but Cloudinary SDK needs one.
        // We'll stick to the one extracted from the URL first.

        const signedUrl = cloudinary.url(publicId, {
            resource_type: resourceType,
            sign_url: true,
            secure: true,
            flags: 'attachment',
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
