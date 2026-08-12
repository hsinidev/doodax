
import React, { useState, useCallback } from 'react';

const PASSPORT_SIZES = [
    { name: 'United States (2x2 in)', width: 600, height: 600, dpi: 300 },
    { name: 'Schengen Visa (3.5x4.5 cm)', width: 413, height: 531, dpi: 300 },
    { name: 'United Kingdom (3.5x4.5 cm)', width: 413, height: 531, dpi: 300 },
    { name: 'Canada (5x7 cm)', width: 591, height: 827, dpi: 300 },
];

const PassportPhotoResizer: React.FC = () => {
    const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
    const [selectedSize, setSelectedSize] = useState(PASSPORT_SIZES[0]);
    const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => setSourceImage(img);
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = useCallback(async () => {
        if (!sourceImage) return;

        setIsLoading(true);
        const { width: targetWidth, height: targetHeight } = selectedSize;

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const sourceWidth = sourceImage.naturalWidth;
        const sourceHeight = sourceImage.naturalHeight;
        const sourceRatio = sourceWidth / sourceHeight;
        const targetRatio = targetWidth / targetHeight;

        let sx = 0, sy = 0, sWidth = sourceWidth, sHeight = sourceHeight;

        if (sourceRatio > targetRatio) {
            sHeight = sourceHeight;
            sWidth = sourceHeight * targetRatio;
            sx = (sourceWidth - sWidth) / 2;
        } else {
            sWidth = sourceWidth;
            sHeight = sourceWidth / targetRatio;
            sy = (sourceHeight - sHeight) / 2;
        }

        ctx.drawImage(sourceImage, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);
        
        canvas.toBlob((blob) => {
            if (blob) setProcessedBlob(blob);
            setIsLoading(false);
        }, 'image/jpeg', 0.95);

    }, [sourceImage, selectedSize]);

    const handleDownload = () => {
        if (!processedBlob) return;
        const url = URL.createObjectURL(processedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `passport-photo-${selectedSize.width}x${selectedSize.height}.jpg`;
        document.body.appendChild(a);
a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Passport Photo Resizer</h2>
            <p className="text-center text-gray-400 mb-8">Crop your image to official passport photo dimensions.</p>

            <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-300 mb-2">1. Upload Your Photo</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"/>
            </div>

            {sourceImage && (
                <div className="animate-fade-in space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-300 mb-2">2. Select Country/Standard</label>
                        <select
                            value={JSON.stringify(selectedSize)}
                            onChange={e => setSelectedSize(JSON.parse(e.target.value))}
                            className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0"
                        >
                            {PASSPORT_SIZES.map(size => (
                                <option key={size.name} value={JSON.stringify(size)}>
                                    {size.name} ({size.width} x {size.height}px @ {size.dpi}dpi)
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="text-center">
                        <button onClick={processImage} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                            {isLoading ? 'Processing...' : '3. Process Image'}
                        </button>
                    </div>
                    
                    {processedBlob && (
                         <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
                            <h3 className="text-lg font-semibold text-gray-300 mb-2">Result Preview</h3>
                            <img src={URL.createObjectURL(processedBlob)} alt="Processed passport" className="max-w-xs max-h-64 rounded-md shadow-lg"/>
                            <button onClick={handleDownload} className="w-full max-w-xs mt-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 rounded-md text-lg">
                                Download Photo (JPEG)
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PassportPhotoResizer;
