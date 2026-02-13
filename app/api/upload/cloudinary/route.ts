import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const resourceType = (formData.get('resourceType') as 'auto' | 'image' | 'video' | 'raw') || 'auto';

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Cloudinary using a stream
        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: resourceType,
                    folder: 'resources',
                    upload_preset: 'churchasset', // Use the preset if available/needed

                    // User specified settings
                    overwrite: false,
                    use_filename: true,
                    unique_filename: true,
                    use_filename_as_display_name: true,
                    asset_folder: 'resources',
                    access_mode: 'public',
                    // For 'raw' files (PDFs/Archives), force download via flags if possible, 
                    // though for raw files we often need to append to url
                },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary Upload Error:', error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            // Write buffer to stream
            uploadStream.end(buffer);
        });

        // If it's a raw file (PDF, Archive), append fl_attachment to force download
        let finalUrl = result.secure_url;
        if (resourceType === 'raw' || result.resource_type === 'raw') {
            // For raw files, simply adding fl_attachment:name works best or just relying on browser
            // Usually: /raw/upload/fl_attachment/v1234/filename
            finalUrl = finalUrl.replace('/upload/', '/upload/fl_attachment/');
        }

        return NextResponse.json({
            success: true,
            url: finalUrl,
            public_id: result.public_id
        });

    } catch (error: any) {
        console.error('Upload Error:', error);
        return NextResponse.json({
            error: error.message || 'Failed to upload file'
        }, { status: 500 });
    }
}
