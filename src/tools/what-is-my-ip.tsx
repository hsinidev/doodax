import React, { useState, useEffect } from 'react';

const WhatIsMyIp: React.FC = () => {
    const [ip, setIp] = useState('Loading...');
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                setIp(data.ip);
                return fetch(`https://ipapi.co/${data.ip}/json/`);
            })
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(() => setIp('Error fetching IP'));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    What Is My IP
                </h1>
                <p className="text-gray-400 mb-8">Find your public IP address</p>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
                    <p className="text-gray-400 mb-2">Your IP Address:</p>
                    <p className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">
                        {ip}
                    </p>
                    
                    {details && (
                        <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                            <div className="bg-gray-900/50 p-4 rounded">
                                <p className="text-gray-400 text-sm">Location</p>
                                <p className="font-semibold">{details.city}, {details.country_name}</p>
                            </div>
                            <div className="bg-gray-900/50 p-4 rounded">
                                <p className="text-gray-400 text-sm">ISP</p>
                                <p className="font-semibold">{details.org || 'N/A'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WhatIsMyIp;