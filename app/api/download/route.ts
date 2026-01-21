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

        // Extract public ID and resource type from the URL
        // Example: https://res.cloudinary.com/cloud_name/image/upload/v12345/public_id.pdf
        const urlParts = fileUrl.split('/');
        const uploadIndex = urlParts.indexOf('upload');

        if (uploadIndex === -1) {
            return NextResponse.redirect(fileUrl);
        }

        const resourceType = urlParts[uploadIndex - 1] as 'image' | 'video' | 'raw';

        // The public ID is everything after the version (v12345) or everything after 'upload' if no version
        const remainingParts = urlParts.slice(uploadIndex + 1);

        // Remove version if present (starts with 'v')
        if (remainingParts[0].startsWith('v') && !isNaN(Number(remainingParts[0].substring(1)))) {
            remainingParts.shift();
        }

        // Reconstruct the public ID (might contain folders)
        let publicId = remainingParts.join('/');

        // For 'image' resource type (which many PDFs mistakenly are), 
        // we might need to strip the extension for the publicID
        if (resourceType === 'image' && publicId.toLowerCase().endsWith('.pdf')) {
            publicId = publicId.substring(0, publicId.lastIndexOf('.'));
        }

        // Generate a signed URL with fl_attachment
        const signedUrl = cloudinary.url(publicId, {
            resource_type: resourceType,
            sign_url: true,
            secure: true,
            flags: 'attachment',
            // Ensure we use the correct format for images that are actually PDFs
            format: resourceType === 'image' ? 'pdf' : undefined
        });

        console.log(`Generated signed URL for ${publicId}:`, signedUrl);

        return NextResponse.redirect(signedUrl);
    } catch (error) {
        console.error('Error generating signed URL:', error);
        // Fallback to original URL if signature fails
        return NextResponse.redirect(fileUrl);
    }
}
