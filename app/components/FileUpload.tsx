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
    resourceType = "auto",
    label = "Upload File",
    className = ""
}: FileUploadProps) {

    const handleUpload = useCallback((result: any) => {
        if (result.info && result.info.secure_url) {
            onSuccess(result.info.secure_url);
        }
    }, [onSuccess]);

    return (
        <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "samchurch_uploads"}
            options={{
                sources: ['local', 'url'],
                multiple: false,
                resourceType: resourceType,
                clientAllowedFormats: resourceType === 'image' ? ['png', 'jpeg', 'jpg', 'webp'] : undefined,
                maxFileSize: resourceType === 'image' ? 10000000 : 50000000, // 10MB image, 50MB others
            }}
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
