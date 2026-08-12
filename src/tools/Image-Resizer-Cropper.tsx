import React, { useState, useCallback, useRef, MouseEvent } from 'react';

// --- TypeScript Interfaces ---
interface CropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FileInfo {
    object: File;
    previewUrl: string;
    width: number;
    height: number;
}

// --- Core Canvas Logic ---
const cropAndResize = (
    image: HTMLImageElement,
    cropArea: CropArea, // in pixels of the source image
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
        
        // Use the powerful 9-argument version of drawImage to crop and resize in one step.
        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        // sx, sy, sWidth, sHeight: The source rectangle to crop from the original image.
        // dx, dy, dWidth, dHeight: The destination rectangle on the canvas to draw the cropped image into.
        ctx.drawImage(
            image,
            cropArea.x,
            cropArea.y,
            cropArea.width,
            cropArea.height,
            0,
            0,
            targetWidth,
            targetHeight
        );

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Canvas to Blob conversion failed.'));
                }
            },
            'image/jpeg',
            0.95 // 95% quality
        );
    });
};

// --- Main Component ---
const ImageResizerCropper: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<FileInfo | null>(null);
    const [crop, setCrop] = useState<CropArea>({ x: 10, y: 10, width: 100, height: 100 });
    const [targetWidth, setTargetWidth] = useState<number>(512);
    const [targetHeight, setTargetHeight] = useState<number>(512);
    const [isDragging, setIsDragging] = useState(false);
    
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setOriginalFile({
                        object: file,
                        previewUrl: img.src,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                    });
                     // Reset crop to a default centered square
                    const initialSize = Math.min(img.naturalWidth, img.naturalHeight) * 0.5;
                    setCrop({
                        x: (img.naturalWidth - initialSize) / 2,
                        y: (img.naturalHeight - initialSize) / 2,
                        width: initialSize,
                        height: initialSize,
                    });
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const startX = e.clientX;
        const startY = e.clientY;
        const startCrop = { ...crop };

        const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
            if (!imageRef.current || !originalFile) return;

            const scaleX = originalFile.width / imageRef.current.clientWidth;
            const scaleY = originalFile.height / imageRef.current.clientHeight;

            const deltaX = (moveEvent.clientX - startX) * scaleX;
            const deltaY = (moveEvent.clientY - startY) * scaleY;

            setCrop(prev => ({
                ...prev,
                x: Math.max(0, Math.min(startCrop.x + deltaX, originalFile.width - prev.width)),
                y: Math.max(0, Math.min(startCrop.y + deltaY, originalFile.height - prev.height)),
            }));
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleDownload = async () => {
        if (!originalFile) return;

        const img = new Image();
        img.onload = async () => {
            try {
                const blob = await cropAndResize(img, crop, targetWidth, targetHeight);
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `cropped-${targetWidth}x${targetHeight}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (err) {
                console.error("Failed to crop and download:", err);
                alert("An error occurred while processing the image.");
            }
        };
        img.src = originalFile.previewUrl;
    };

    const cropStyle = imageRef.current && originalFile ? {
        left: `${(crop.x / originalFile.width) * 100}%`,
        top: `${(crop.y / originalFile.height) * 100}%`,
        width: `${(crop.width / originalFile.width) * 100}%`,
        height: `${(crop.height / originalFile.height) * 100}%`,
        cursor: isDragging ? 'grabbing' : 'grab',
    } : {};

    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Image Resizer & Cropper</h2>
            <p className="text-center text-gray-400 mb-8">Upload an image, select a crop area, and download the result.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-300 mb-2">1. Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/>
                    </div>
                     <div>
                        <label className="block text-lg font-semibold text-gray-300 mb-2">2. Set Output Size</label>
                        <div className="flex gap-2">
                             <input type="number" value={targetWidth} onChange={e => setTargetWidth(parseInt(e.target.value) || 0)} className="w-1/2 bg-gray-800 p-2 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" placeholder="Width" />
                             <input type="number" value={targetHeight} onChange={e => setTargetHeight(parseInt(e.target.value) || 0)} className="w-1/2 bg-gray-800 p-2 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" placeholder="Height" />
                        </div>
                    </div>
                    <button onClick={handleDownload} disabled={!originalFile} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        3. Download Image (JPEG)
                    </button>
                </div>
                
                {/* Interactive Area */}
                <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-2">Interactive Cropper</h3>
                    <div ref={imageContainerRef} className="w-full aspect-video bg-gray-800/50 rounded-lg flex items-center justify-center relative select-none overflow-hidden">
                        {originalFile ? (
                            <>
                                <img ref={imageRef} src={originalFile.previewUrl} alt="Source" className="max-w-full max-h-full object-contain" />
                                <div
                                    className="absolute border-2 border-dashed border-cyan-400 bg-black/30"
                                    style={cropStyle}
                                    onMouseDown={handleMouseDown}
                                >
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-2 border-cyan-400 bg-gray-900"></div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-cyan-400 bg-gray-900"></div>
                                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-2 border-cyan-400 bg-gray-900"></div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-2 border-cyan-400 bg-gray-900"></div>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400">Upload an image to begin</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageResizerCropper;
