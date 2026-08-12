const fs = require('fs');
const path = require('path');

const tools = [
    {
        fileName: 'color-converter',
        name: 'Color Converter',
        description: 'Convert between HEX, RGB, and HSL color formats',
        gradient: 'from-pink-400 to-purple-500'
    },
    {
        fileName: 'lorem-ipsum-generator',
        name: 'Lorem Ipsum Generator',
        description: 'Generate placeholder text for your designs',
        gradient: 'from-green-400 to-teal-500'
    },
    {
        fileName: 'md5-hash-generator',
        name: 'MD5 Hash Generator',
        description: 'Generate MD5 hashes from text',
        gradient: 'from-red-400 to-orange-500'
    },
    {
        fileName: 'meta-tag-generator',
        name: 'Meta Tag Generator',
        description: 'Create SEO meta tags for your website',
        gradient: 'from-indigo-400 to-blue-500'
    },
    {
        fileName: 'svg-to-css-converter',
        name: 'SVG to CSS Converter',
        description: 'Convert SVG to CSS background',
        gradient: 'from-yellow-400 to-amber-500'
    },
    {
        fileName: 'css-unit-converter',
        name: 'CSS Unit Converter',
        description: 'Convert between PX, EM, and REM units',
        gradient: 'from-cyan-400 to-blue-500'
    },
    {
        fileName: 'what-is-my-ip',
        name: 'What Is My IP',
        description: 'Find your public IP address',
        gradient: 'from-purple-400 to-pink-500'
    },
    {
        fileName: 'user-agent-finder',
        name: 'User Agent Finder',
        description: 'Display your browser user agent',
        gradient: 'from-emerald-400 to-green-500'
    },
    {
        fileName: 'screen-size-detector',
        name: 'Screen Size Detector',
        description: 'Find your screen resolution',
        gradient: 'from-orange-400 to-red-500'
    },
    {
        fileName: 'regex-tester',
        name: 'Regex Tester',
        description: 'Test and validate regular expressions',
        gradient: 'from-blue-400 to-indigo-500'
    },
    {
        fileName: 'sql-formatter',
        name: 'SQL Formatter',
        description: 'Beautify and format SQL code',
        gradient: 'from-teal-400 to-cyan-500'
    }
];

const toolsDir = path.join(__dirname, '../src/tools');

tools.forEach(tool => {
    const componentName = tool.fileName.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join('');

    let template = '';

    // Special templates for specific tools
    if (tool.fileName === 'what-is-my-ip') {
        template = `import React, { useState, useEffect } from 'react';

const WhatIsMyIp: React.FC = () => {
    const [ip, setIp] = useState('Loading...');
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                setIp(data.ip);
                return fetch(\`https://ipapi.co/\${data.ip}/json/\`);
            })
            .then(res => res.json())
            .then(data => setDetails(data))
            .catch(() => setIp('Error fetching IP'));
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent">
                    ${tool.name}
                </h1>
                <p className="text-gray-400 mb-8">${tool.description}</p>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
                    <p className="text-gray-400 mb-2">Your IP Address:</p>
                    <p className="text-5xl font-bold bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent mb-6">
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

export default WhatIsMyIp;`;
    } else if (tool.fileName === 'user-agent-finder') {
        template = `import React from 'react';

const UserAgentFinder: React.FC = () => {
    const userAgent = navigator.userAgent;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent">
                    ${tool.name}
                </h1>
                <p className="text-gray-400 mb-8">${tool.description}</p>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p className="text-gray-400 mb-2">Your User Agent:</p>
                    <p className="font-mono text-sm break-all">{userAgent}</p>
                </div>
            </div>
        </div>
    );
};

export default UserAgentFinder;`;
    } else if (tool.fileName === 'screen-size-detector') {
        template = `import React, { useState, useEffect } from 'react';

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
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent">
                    ${tool.name}
                </h1>
                <p className="text-gray-400 mb-8">${tool.description}</p>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
                    <p className="text-6xl font-bold bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent mb-4">
                        {size.width} × {size.height}
                    </p>
                    <p className="text-gray-400">pixels</p>
                </div>
            </div>
        </div>
    );
};

export default ScreenSizeDetector;`;
    } else {
        // Generic template for other tools
        template = `import React, { useState } from 'react';

const ${componentName}: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleProcess = () => {
        // Tool-specific logic will be added here
        setOutput('Processing: ' + input);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r ${tool.gradient} bg-clip-text text-transparent">
                    ${tool.name}
                </h1>
                <p className="text-gray-400 mb-8">${tool.description}</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Input</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your input..."
                        />
                    </div>

                    <button
                        onClick={handleProcess}
                        className="px-6 py-3 bg-gradient-to-r ${tool.gradient} rounded-lg font-semibold hover:opacity-90 transition-all"
                    >
                        Process
                    </button>

                    <div>
                        <label className="block text-sm font-medium mb-2">Output</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-4 text-white font-mono text-sm focus:outline-none"
                            placeholder="Result will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ${componentName};`;
    }

    const filePath = path.join(toolsDir, `${tool.fileName}.tsx`);
    fs.writeFileSync(filePath, template);
    console.log(`✅ Created: ${tool.fileName}.tsx`);
});

console.log(`\n🎉 Successfully created ${tools.length} tool components!`);
