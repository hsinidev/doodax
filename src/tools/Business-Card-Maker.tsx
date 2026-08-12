import React, { useState, useRef, useEffect } from 'react';

interface CardDetails {
    name: string;
    title: string;
    company: string;
    phone: string;
    email: string;
    website: string;
}

const BusinessCardMaker: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [details, setDetails] = useState<CardDetails>({
        name: 'Jane Doe',
        title: 'Senior Developer',
        company: 'Tech Innovations Inc.',
        phone: '123-456-7890',
        email: 'jane.doe@techinnovations.com',
        website: 'www.techinnovations.com',
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx || !canvas) return;

        const width = 800;
        const height = 450;
        canvas.width = width;
        canvas.height = height;

        // Background
        ctx.fillStyle = '#111827'; // A dark gray
        ctx.fillRect(0, 0, width, height);
        
        // Decorative line
        ctx.fillStyle = '#06B6D4'; // Cyan
        ctx.fillRect(0, 0, width, 20);

        // Company Name
        ctx.fillStyle = '#E5E7EB'; // Light gray
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(details.company, width - 40, 80);

        // Name
        ctx.fillStyle = 'white';
        ctx.font = 'bold 52px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(details.name, 40, 180);
        
        // Title
        ctx.fillStyle = '#9CA3AF'; // Medium gray
        ctx.font = '32px sans-serif';
        ctx.fillText(details.title, 40, 230);
        
        // Contact Info
        ctx.fillStyle = '#D1D5DB'; // Gray
        ctx.font = '24px sans-serif';
        ctx.fillText(details.phone, 40, 320);
        ctx.fillText(details.email, 40, 360);
        ctx.fillText(details.website, 40, 400);

    }, [details]);

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'business-card.png';
            link.href = url;
            link.click();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setDetails(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Business Card Maker</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <input type="text" name="name" value={details.name} onChange={handleInputChange} placeholder="Name" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="text" name="title" value={details.title} onChange={handleInputChange} placeholder="Title" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="text" name="company" value={details.company} onChange={handleInputChange} placeholder="Company" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="text" name="phone" value={details.phone} onChange={handleInputChange} placeholder="Phone" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="email" name="email" value={details.email} onChange={handleInputChange} placeholder="Email" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="text" name="website" value={details.website} onChange={handleInputChange} placeholder="Website" className="w-full bg-gray-800 p-2 rounded-md"/>
                </div>
                <div className="flex flex-col items-center">
                    <canvas ref={canvasRef} className="w-full h-auto rounded-lg shadow-lg" />
                    <button onClick={handleDownload} className="mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg">
                        Download Card (PNG)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessCardMaker;