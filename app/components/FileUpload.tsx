"use client";

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';

interface FileUploadProps {
    onSuccess: (url: string) => void;
    resourceType?: "image" | "video" | "raw" | "auto";
    label?: string;
    className?: string;
}

export default function FileUpload({
    onSuccess,
    resourceType = "raw",
    label = "Upload File",
    className = ""
}: FileUploadProps) {

    const handleUpload = useCallback((result: any) => {
        if (result.info && (result.info.secure_url || result.info.public_id)) {
            console.log('Upload success info:', result.info);

            // Manually construct the cleanest possible public URL
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgygu2pla';
            const resourceType = result.info.resource_type || 'image';
            const publicId = result.info.public_id;
            const format = result.info.format;

            // Clean URL format: https://res.cloudinary.com/cloudname/resource_type/upload/public_id.format
            const cleanUrl = `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${publicId}${format ? '.' + format : ''}`;

            console.log('Constructed Clean URL:', cleanUrl);
            onSuccess(cleanUrl);
        }
    }, [onSuccess]);

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "churchasset"}
            options={{
                sources: ['local', 'url'],
                multiple: false,
                resourceType: resourceType,
                folder: 'resources',
                tags: ['public', 'samchurch'],
                useFilename: true,
                uniqueFilename: false,
                clientAllowedFormats: resourceType === 'image' ? ['png', 'jpeg', 'jpg', 'webp', 'pdf'] : undefined,
                maxFileSize: resourceType === 'image' ? 20000000 : 100000000, // 20MB for image/pdf, 100MB others
            } as any}
            onSuccess={handleUpload}
        >
            {({ open }) => {
                return (
                    <button
                        type="button"
                        onClick={() => open()}
                        className={`btn-primary px-4 py-2 text-sm flex items-center gap-2 ${className}`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {label}
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
