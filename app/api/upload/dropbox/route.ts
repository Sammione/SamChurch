import { NextRequest, NextResponse } from 'next/server';
import { Dropbox } from 'dropbox';
import fetch from 'isomorphic-fetch';

const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN || undefined,
    clientId: process.env.DROPBOX_APP_KEY,
    clientSecret: process.env.DROPBOX_APP_SECRET,
    refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
    fetch,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const path = `/resources/${Date.now()}_${file.name}`;

        const response = await dbx.filesUpload({
            path,
            contents: buffer,
            mode: { '.tag': 'overwrite' },
        });

        // Create a shared link for the file
        const sharedLinkRes = await dbx.sharingCreateSharedLinkWithSettings({
            path: response.result.path_display || path,
        });

        // Convert dl=0 to dl=1 for direct download
        let downloadUrl = sharedLinkRes.result.url;
        downloadUrl = downloadUrl.replace('?dl=0', '?dl=1');

        return NextResponse.json({
            success: true,
            url: downloadUrl,
            path: response.result.path_display
        });

    } catch (error: any) {
        console.error('Dropbox upload error:', error);
        return NextResponse.json({
            error: error.message || 'Failed to upload to Dropbox'
        }, { status: 500 });
    }
}
