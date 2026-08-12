import React, { useState, useCallback, useEffect } from 'react';

// --- TypeScript Interfaces ---
interface OptimizationResult {
    blob: Blob;
    dataUrl: string;
}

interface FileInfo {
    object: File;
    name: string;
    size: number;
    previewUrl: string;
}

type OutputFormat = 'image/jpeg' | 'image/png';

// --- Core Canvas Logic ---
const optimizeImage = (
    image: HTMLImageElement,
    quality: number,
    format: OutputFormat
): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            return reject(new Error('Failed to get canvas context.'));
        }

        ctx.drawImage(image, 0, 0);

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Canvas to Blob conversion failed.'));
                }
            },
            format,
            format === 'image/jpeg' ? quality : undefined // Quality only applies to JPEG
        );
    });
};

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// --- Main Component ---
const ImageFileOptimizer: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<FileInfo | null>(null);
    const [optimizedBlob, setOptimizedBlob] = useState<Blob | null>(null);
    const [quality, setQuality] = useState(0.8); // 80% quality
    const [format, setFormat] = useState<OutputFormat>('image/jpeg');
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const previewUrl = URL.createObjectURL(file);
            setOriginalFile({
                object: file,
                name: file.name,
                size: file.size,
                previewUrl,
            });
            // Automatically set format based on input
            setFormat(file.type === 'image/png' ? 'image/png' : 'image/jpeg');
        } else {
            setOriginalFile(null);
            setOptimizedBlob(null);
        }
    };
    
    const runOptimization = useCallback(async () => {
        if (!originalFile) return;

        setIsLoading(true);
        const img = new Image();
        img.onload = async () => {
            try {
                const blob = await optimizeImage(img, quality, format);
                setOptimizedBlob(blob);
            } catch (error) {
                console.error("Optimization failed:", error);
                setOptimizedBlob(null);
            } finally {
                setIsLoading(false);
                URL.revokeObjectURL(originalFile.previewUrl); // Clean up previous object URL
            }
        };
        img.src = originalFile.previewUrl;

    }, [originalFile, quality, format]);

    useEffect(() => {
        if(originalFile) {
            runOptimization();
        }
    }, [originalFile, quality, format, runOptimization]);


    const handleDownload = () => {
        if (!optimizedBlob || !originalFile) return;
        const url = URL.createObjectURL(optimizedBlob);
        const a = document.createElement('a');
        a.href = url;
        const nameParts = originalFile.name.split('.');
        const extension = format === 'image/jpeg' ? 'jpg' : 'png';
        a.download = `${nameParts[0]}-optimized.${extension}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Image File Optimizer</h2>
            <p className="text-center text-gray-400 mb-8">Compress JPEG & PNG images client-side using the Canvas API.</p>

            <div className="mb-6">
                <label htmlFor="image-upload" className="block text-lg font-semibold text-gray-300 mb-2">Upload Image</label>
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"/>
            </div>

            {originalFile && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 animate-fade-in">
                    {/* Controls & Info */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="format-select" className="block font-medium text-gray-300">Output Format</label>
                            <select id="format-select" value={format} onChange={e => setFormat(e.target.value as OutputFormat)} className="w-full mt-1 bg-gray-800 p-2 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0">
                                <option value="image/jpeg">JPEG</option>
                                <option value="image/png">PNG</option>
                            </select>
                        </div>
                        
                        {format === 'image/jpeg' && (
                             <div>
                                <label htmlFor="quality-slider" className="block font-medium text-gray-300">JPEG Quality: {Math.round(quality * 100)}%</label>
                                <input id="quality-slider" type="range" min="0.1" max="1.0" step="0.05" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} className="w-full h-2 mt-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"/>
                            </div>
                        )}
                        
                        <div className="bg-gray-800/50 p-4 rounded-lg space-y-3 text-center">
                            <div>
                                <p className="text-sm text-gray-400">Original Size</p>
                                <p className="text-xl font-bold">{formatFileSize(originalFile.size)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Optimized Size</p>
                                <p className="text-2xl font-bold text-cyan-400">
                                    {isLoading ? '...' : (optimizedBlob ? formatFileSize(optimizedBlob.size) : 'N/A')}
                                </p>
                            </div>
                             {optimizedBlob && (
                                <div>
                                    <p className="text-sm text-green-400">
                                        Reduction: {(((originalFile.size - optimizedBlob.size) / originalFile.size) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            )}
                        </div>
                        <button onClick={handleDownload} disabled={!optimizedBlob || isLoading} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                            {isLoading ? 'Optimizing...' : 'Download Optimized Image'}
                        </button>
                    </div>

                    {/* Image Preview */}
                    <div className="flex flex-col items-center">
                         <h3 className="text-lg font-semibold mb-2">Preview</h3>
                        <div className="w-full h-80 flex items-center justify-center bg-gray-800/50 rounded-lg p-2">
                            <img src={originalFile.previewUrl} alt="Original preview" className="max-w-full max-h-full object-contain rounded-md" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageFileOptimizer;
