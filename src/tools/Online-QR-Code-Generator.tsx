import React, { useState, useCallback, useRef } from 'react';

// This component assumes the qrcode.react library is loaded via a CDN script tag
// in index.html, making the `QRCodeCanvas` component globally available.
declare const QRCode: any;
const QRCodeCanvas = QRCode.QRCodeCanvas;


type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

// --- Main Component ---
const OnlineQRCodeGenerator: React.FC = () => {
    const [text, setText] = useState<string>('https://doodax.com');
    const [size, setSize] = useState<number>(256);
    const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
    const qrCodeRef = useRef<any>(null);

    const handleDownload = useCallback(() => {
        const canvas = qrCodeRef.current?.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = 'qrcode.png';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Online QR Code Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a QR code from any text or URL in real-time.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Configuration Panel */}
                <div className="space-y-6">
                    <div>
                        <label htmlFor="qr-text" className="block text-lg font-semibold text-gray-300 mb-2">Data (URL or Text)</label>
                        <textarea
                            id="qr-text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter text or URL here"
                            className="w-full h-32 bg-gray-800 text-gray-200 p-3 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 resize-y"
                        />
                    </div>
                    <div>
                        <label htmlFor="qr-size" className="block text-lg font-semibold text-gray-300 mb-2">Size ({size}px)</label>
                        <input
                            type="range"
                            id="qr-size"
                            min="64"
                            max="1024"
                            step="8"
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value, 10))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="qr-error-level" className="block text-lg font-semibold text-gray-300 mb-2">Error Correction</label>
                        <select
                            id="qr-error-level"
                            value={errorLevel}
                            onChange={(e) => setErrorLevel(e.target.value as ErrorCorrectionLevel)}
                            className="w-full bg-gray-800 text-white p-3 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0"
                        >
                            <option value="L">Low (recovers ~7% errors)</option>
                            <option value="M">Medium (recovers ~15% errors)</option>
                            <option value="Q">Quartile (recovers ~25% errors)</option>
                            <option value="H">High (recovers ~30% errors)</option>
                        </select>
                    </div>
                </div>

                {/* QR Code Display & Download */}
                <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-lg">
                    <div ref={qrCodeRef} className="bg-white p-4 rounded-md shadow-lg">
                        {text ? (
                            <QRCodeCanvas
                                value={text}
                                size={size}
                                level={errorLevel}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                            />
                        ) : (
                            <div style={{ width: size, height: size }} className="flex items-center justify-center text-center bg-gray-200 text-gray-500">
                                Enter data to generate QR Code
                            </div>
                        )}
                    </div>
                    <button
                        onClick={handleDownload}
                        disabled={!text}
                        className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Download QR Code (PNG)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnlineQRCodeGenerator;
