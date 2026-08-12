import React, { useState, useEffect } from 'react';

const ScreenSizeDetector: React.FC = () => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Screen Size Detector
                </h1>
                <p className="text-gray-400 mb-8">Find your screen resolution</p>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
                    <p className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
                        {size.width} × {size.height}
                    </p>
                    <p className="text-gray-400">pixels</p>
                </div>
            </div>
        </div>
    );
};

export default ScreenSizeDetector;