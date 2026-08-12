import React from 'react';

const UserAgentFinder: React.FC = () => {
    const userAgent = navigator.userAgent;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    User Agent Finder
                </h1>
                <p className="text-gray-400 mb-8">Display your browser user agent</p>

                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                    <p className="text-gray-400 mb-2">Your User Agent:</p>
                    <p className="font-mono text-sm break-all">{userAgent}</p>
                </div>
            </div>
        </div>
    );
};

export default UserAgentFinder;