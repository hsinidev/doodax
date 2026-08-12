import React, { useState, useCallback, useRef } from 'react';

// --- TypeScript Interfaces ---
interface FaviconResult {
    size: number;
    dataUrl: string;
}

type InputMode = 'image' | 'text';

const SIZES_TO_GENERATE = [16, 32, 48, 64];

// --- Core Canvas Logic ---
const generateFavicon = async (source: HTMLImageElement | string, size: number, options: { bgColor?: string, textColor?: string } = {}): Promise<string> => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        if (!ctx) return resolve('');

        ctx.clearRect(0, 0, size, size);

        if (typeof source === 'string') {
            // Text mode
            ctx.fillStyle = options.bgColor || '#2563EB';
            ctx.fillRect(0, 0, size, size);
            
            ctx.font = `bold ${size * 0.7}px sans-serif`;
            ctx.fillStyle = options.textColor || '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(source.slice(0, 2).toUpperCase(), size / 2, size / 2);
        } else {
            // Image mode
            ctx.drawImage(source, 0, 0, size, size);
        }
        resolve(canvas.toDataURL('image/png'));
    });
};


// --- Main Component ---
const FaviconGenerator: React.FC = () => {
    const [inputMode, setInputMode] = useState<InputMode>('image');
    const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
    const [sourceText, setSourceText] = useState<string>('FG');
    const [bgColor, setBgColor] = useState<string>('#2563EB');
    const [generatedFavicons, setGeneratedFavicons] = useState<FaviconResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    setSourceImage(img);
                };
                img.src = event.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleGenerate = useCallback(async () => {
        setIsLoading(true);
        const source = inputMode === 'image' ? sourceImage : sourceText;
        if (!source) {
            alert('Please upload an image or enter text first.');
            setIsLoading(false);
            return;
        }

        const favicons: FaviconResult[] = [];
        for (const size of SIZES_TO_GENERATE) {
            const dataUrl = await generateFavicon(source, size, { bgColor });
            favicons.push({ size, dataUrl });
        }
        setGeneratedFavicons(favicons);
        setIsLoading(false);
    }, [sourceImage, sourceText, inputMode, bgColor]);
    
    const handleDownloadAll = useCallback(() => {
        generatedFavicons.forEach(favicon => {
            const link = document.createElement('a');
            link.href = favicon.dataUrl;
            link.download = `favicon-${favicon.size}x${favicon.size}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }, [generatedFavicons]);


    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Favicon Generator</h2>
            <p className="text-center text-gray-400 mb-8">Create favicons from an image or text using the HTML Canvas API.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Controls */}
                <div className="space-y-4">
                    <div className="flex bg-gray-800 p-1 rounded-lg">
                        <button onClick={() => setInputMode('image')} className={`w-1/2 p-2 rounded-md transition ${inputMode === 'image' ? 'bg-cyan-600' : ''}`}>Image</button>
                        <button onClick={() => setInputMode('text')} className={`w-1/2 p-2 rounded-md transition ${inputMode === 'text' ? 'bg-cyan-600' : ''}`}>Text</button>
                    </div>

                    {inputMode === 'image' ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image</label>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/>
                             {sourceImage && <img src={sourceImage.src} alt="Preview" className="mt-4 rounded-md max-w-full h-auto max-h-48" />}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="text-input" className="block text-sm font-medium text-gray-300 mb-2">Text (1-2 characters)</label>
                                <input id="text-input" type="text" value={sourceText} onChange={(e) => setSourceText(e.target.value)} maxLength={2} className="w-full bg-gray-800 p-2 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0"/>
                            </div>
                             <div>
                                <label htmlFor="bg-color" className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
                                <input id="bg-color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1 bg-gray-800 border-gray-700 rounded-md cursor-pointer"/>
                            </div>
                        </div>
                    )}
                     <button onClick={handleGenerate} disabled={isLoading || (inputMode === 'image' && !sourceImage)} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating...' : 'Generate Favicons'}
                    </button>
                </div>
                
                {/* Previews */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Preview & Download</h3>
                    {generatedFavicons.length > 0 ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-4 p-4 bg-gray-800/50 rounded-lg">
                                {generatedFavicons.map(f => (
                                    <div key={f.size} className="text-center">
                                        <img src={f.dataUrl} alt={`${f.size}x${f.size} favicon`} className="bg-white p-1 rounded-md mx-auto" style={{ imageRendering: 'pixelated' }}/>
                                        <p className="text-xs mt-2 text-gray-400">{f.size}x{f.size}</p>
                                    </div>
                                ))}
                            </div>
                            <button onClick={handleDownloadAll} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded-md">Download All (.png)</button>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center bg-gray-800/50 rounded-lg text-gray-400">
                            Previews will appear here.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaviconGenerator;