import React, { useState, useCallback } from 'react';

// --- Main Component ---
const ImageToBase64Converter: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64String, setBase64String] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [copyStatus, setCopyStatus] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        // Basic validation for image types
        if (!file.type.startsWith('image/')) {
            setError('Invalid file type. Please upload an image.');
            setImagePreview(null);
            setBase64String('');
            setFileName('');
            return;
        }

        setError(null);
        setFileName(file.name);

        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            setImagePreview(result);
            setBase64String(result);
        };
        
        reader.onerror = () => {
            setError('Failed to read the file. Please try again.');
            setImagePreview(null);
            setBase64String('');
            setFileName('');
        }

        // This reads the file and returns a Data URL.
        reader.readAsDataURL(file);
    }, []);

    const handleCopy = useCallback(() => {
        if (!base64String) return;
        navigator.clipboard.writeText(base64String).then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        });
    }, [base64String]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Image to Base64 Converter</h2>
            <p className="text-center text-gray-400 mb-8">Upload an image to generate its Base64 Data URL. All processing is done securely in your browser.</p>

            <div className="mb-6">
                <label htmlFor="image-upload" className="block text-lg font-semibold text-gray-300 mb-2">Upload Image File</label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 cursor-pointer"
                />
            </div>
            
            {error && <p className="text-center text-red-400 my-4 bg-red-500/10 p-3 rounded-md">{error}</p>}

            {imagePreview && (
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Image Preview</h3>
                        <div className="bg-gray-800/50 p-4 rounded-lg flex justify-center items-center">
                            <img src={imagePreview} alt={fileName} className="max-w-full max-h-48 rounded-md" />
                        </div>
                    </div>

                    <div>
                         <label htmlFor="base64-output" className="block text-lg font-semibold text-gray-300 mb-2">Base64 Data URL</label>
                         <div className="relative">
                            <textarea
                                id="base64-output"
                                readOnly
                                value={base64String}
                                className="w-full h-48 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md resize-y"
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute top-3 right-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-1 px-3 rounded-md text-sm transition-colors"
                            >
                                {copyStatus ? 'Copied!' : 'Copy'}
                            </button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageToBase64Converter;
