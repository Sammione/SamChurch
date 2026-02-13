"use client";

import { useState, useRef } from "react";

interface FileUploadProps {
    onSuccess: (url: string) => void;
    resourceType?: string;
    label?: string;
    className?: string;
}

export default function FileUpload({
    onSuccess,
    resourceType,
    label = "Upload File",
    className = ""
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setProgress(10); // Start progress

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload/dropbox", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                let errorMessage = "Upload failed";
                try {
                    const errorText = await res.text();
                    try {
                        const errorJson = JSON.parse(errorText);
                        errorMessage = errorJson.error || errorMessage;
                    } catch {
                        // If parsing JSON fails, use the text (likely "Request Entity Too Large")
                        if (errorText.includes("Request Entity Too Large")) {
                            errorMessage = "File is too large to upload.";
                        } else if (errorText.length < 200) {
                            errorMessage = errorText;
                        } else {
                            errorMessage = `Upload failed (${res.status}: ${res.statusText})`;
                        }
                    }
                } catch (e) {
                    errorMessage = `Upload failed (${res.status}: ${res.statusText})`;
                }
                throw new Error(errorMessage);
            }

            const data = await res.json();
            setProgress(100);
            onSuccess(data.url);
        } catch (error: any) {
            console.error("Upload error:", error);
            alert(error.message || "Failed to upload file");
        } finally {
            setIsUploading(false);
            setProgress(0);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.mp3,.webp"
            />

            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`btn-primary px-4 py-2 text-sm flex items-center gap-2 relative overflow-hidden disabled:opacity-70`}
            >
                {isUploading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Uploading...</span>
                        {/* Progress Bar */}
                        <div
                            className="absolute bottom-0 left-0 h-1 bg-secondary transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        {label}
                    </>
                )}
            </button>
        </div>
    );
}
