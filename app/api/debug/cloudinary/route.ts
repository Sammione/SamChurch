import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const testUrl = searchParams.get('url') || 'https://res.cloudinary.com/dgygu2pla/image/upload/v1737409425/1746435982_Defender_Of_Truth_Vol._1_No_3_e4rtgl.pdf';

    const config = {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? 'Present' : 'Missing',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing',
    };

    const urlParts = testUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    let debugInfo: any = {
        testUrl,
        config,
        uploadIndex,
    };

    if (uploadIndex !== -1) {
        const resourceType = urlParts[uploadIndex - 1];
        const remainingParts = urlParts.slice(uploadIndex + 1);
        const versionRaw = remainingParts[0];
        const hasVersion = versionRaw.startsWith('v') && !isNaN(Number(versionRaw.substring(1)));

        if (hasVersion) {
            remainingParts.shift();
        }

        let publicId = remainingParts.join('/');
        const originalPublicId = publicId;

        if (resourceType === 'image' && publicId.toLowerCase().endsWith('.pdf')) {
            publicId = publicId.substring(0, publicId.lastIndexOf('.'));
        }

        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });

        const signedUrl = cloudinary.url(publicId, {
            resource_type: resourceType as any,
            sign_url: true,
            secure: true,
            flags: 'attachment',
            format: resourceType === 'image' ? 'pdf' : undefined
        });

        debugInfo = {
            ...debugInfo,
            resourceType,
            versionRaw,
            hasVersion,
            originalPublicId,
            finalPublicId: publicId,
            generatedSignedUrl: signedUrl
        };
    }

    return NextResponse.json(debugInfo);
}
