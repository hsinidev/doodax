import React, { useState, useCallback, useEffect, useMemo } from 'react';

// --- Sizing Data ---
const SOCIAL_SIZES = [
    { name: 'Instagram Post (Square)', width: 1080, height: 1080 },
    { name: 'Instagram Portrait', width: 1080, height: 1350 },
    { name: 'Instagram Story / Reel', width: 1080, height: 1920 },
    { name: 'Twitter / X Header', width: 1500, height: 500 },
    { name: 'Facebook Link Share', width: 1200, height: 630 },
    { name: 'LinkedIn Post', width: 1200, height: 627 },
    { name: 'Pinterest Pin', width: 1000, height: 1500 },
];

interface FileInfo {
    object: File;
    previewUrl: string;
}

// --- Core Canvas Logic ---
const resizeAndCrop = (
    image: HTMLImageElement,
    targetWidth: number,
    targetHeight: number
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return reject(new Error('Failed to get canvas context.'));
        }

        const sourceWidth = image.naturalWidth;
        const sourceHeight = image.naturalHeight;
        const sourceRatio = sourceWidth / sourceHeight;
        const targetRatio = targetWidth / targetHeight;

        let sx = 0, sy = 0, sWidth = sourceWidth, sHeight = sourceHeight;

        // Calculate the dimensions for center-cropping
        if (sourceRatio > targetRatio) {
            // Source is wider than target, crop the sides
            sHeight = sourceHeight;
            sWidth = sourceHeight * targetRatio;
            sx = (sourceWidth - sWidth) / 2;
        } else {
            // Source is taller than target, crop the top/bottom
            sWidth = sourceWidth;
            sHeight = sourceWidth / targetRatio;
            sy = (sourceHeight - sHeight) / 2;
        }

        ctx.drawImage(image, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Canvas to Blob conversion failed.'));
                }
            },
            'image/jpeg',
            0.9 // 90% quality for good compression
        );
    });
};


// --- Main Component ---
const SocialMediaImageResizer: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<FileInfo | null>(null);
    const [selectedSize, setSelectedSize] = useState(SOCIAL_SIZES[0]);
    const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const processedImageUrl = useMemo(() => {
        if (!processedBlob) return null;
        return URL.createObjectURL(processedBlob);
    }, [processedBlob]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            setOriginalFile({ object: file, previewUrl });
        } else {
            setOriginalFile(null);
            setProcessedBlob(null);
        }
    };

    const runResize = useCallback(async () => {
        if (!originalFile) return;

        setIsLoading(true);
        const img = new Image();
        img.onload = async () => {
            try {
                const blob = await resizeAndCrop(img, selectedSize.width, selectedSize.height);
                setProcessedBlob(blob);
            } catch (error) {
                console.error("Resize failed:", error);
                setProcessedBlob(null);
            } finally {
                setIsLoading(false);
            }
        };
        img.src = originalFile.previewUrl;
    }, [originalFile, selectedSize]);

    useEffect(() => {
        if (originalFile) {
            runResize();
        }
        // Cleanup object URLs on component unmount or when dependencies change
        return () => {
            if (originalFile) URL.revokeObjectURL(originalFile.previewUrl);
            if (processedImageUrl) URL.revokeObjectURL(processedImageUrl);
        }
    }, [originalFile, selectedSize, runResize]);

    const handleDownload = () => {
        if (!processedImageUrl || !processedBlob) return;
        const a = document.createElement('a');
        a.href = processedImageUrl;
        a.download = `resized-${selectedSize.width}x${selectedSize.height}.jpg`;
        document.body.appendChild(a);
a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Social Media Image Resizer</h2>
            <p className="text-center text-gray-400 mb-8">Crop and resize images to the perfect size for social media.</p>

            <div className="mb-6">
                 <label htmlFor="image-upload" className="block text-lg font-semibold text-gray-300 mb-2">1. Upload Your Image</label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"/>
            </div>

            {originalFile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 animate-fade-in">
                    {/* Controls & Preview */}
                    <div>
                         <label htmlFor="size-select" className="block text-lg font-semibold text-gray-300 mb-2">2. Choose a Size</label>
                        <select
                            id="size-select"
                            value={JSON.stringify(selectedSize)}
                            onChange={e => setSelectedSize(JSON.parse(e.target.value))}
                            className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 mb-6"
                        >
                            {SOCIAL_SIZES.map(size => (
                                <option key={size.name} value={JSON.stringify(size)}>
                                    {size.name} ({size.width} x {size.height}px)
                                </option>
                            ))}
                        </select>
                        
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">3. Download Result</h3>
                        <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center justify-center">
                            {isLoading ? (
                                <div className="h-48 flex items-center justify-center">Processing...</div>
                            ) : processedImageUrl ? (
                                <img src={processedImageUrl} alt="Resized Preview" className="max-w-full max-h-48 rounded-md shadow-lg"/>
                            ) : (
                                <div className="h-48 flex items-center justify-center text-gray-400">Preview will appear here</div>
                            )}
                            <button onClick={handleDownload} disabled={!processedBlob || isLoading} className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                                {isLoading ? 'Processing...' : `Download Image (JPEG)`}
                            </button>
                        </div>
                    </div>
                    {/* Original Image Preview */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Original Upload</h3>
                        <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg p-2">
                            <img src={originalFile.previewUrl} alt="Original upload" className="max-w-full max-h-96 object-contain rounded-md" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialMediaImageResizer;
