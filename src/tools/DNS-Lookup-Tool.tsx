import React, { useState, useCallback } from 'react';

// --- TypeScript Interfaces for DNS Records ---
interface ARecord {
    ip: string;
    ttl: number;
}

interface CNAMERecord {
    alias: string;
    canonical: string;
    ttl: number;
}

interface MXRecord {
    priority: number;
    target: string;
    ttl: number;
}

interface DnsRecordsInterface {
    a: ARecord[];
    cname: CNAMERecord[];
    mx: MXRecord[];
}

// --- API Simulation Function ---
// Simulates a DNS API lookup with structured data.
const getDnsRecords = (domain: string): Promise<DnsRecordsInterface> => {
    console.log(`Looking up DNS for ${domain}...`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const normalizedDomain = domain.toLowerCase();
            if (normalizedDomain === 'nonexistent-domain-12345.com') {
                reject(new Error('NXDOMAIN: The requested domain does not exist.'));
            } else {
                // Generate consistent mock data based on the domain name
                const ipSuffix = Array.from(normalizedDomain).reduce((acc, char) => acc + char.charCodeAt(0), 0) % 255;
                resolve({
                    a: [
                        { ip: `192.0.2.${ipSuffix}`, ttl: 3600 },
                        { ip: `192.0.2.${ipSuffix + 1}`, ttl: 3600 },
                    ],
                    cname: [
                        { alias: `www.${normalizedDomain}`, canonical: normalizedDomain, ttl: 86400 },
                    ],
                    mx: [
                        { priority: 10, target: `mail.mx.${normalizedDomain}`, ttl: 14400 },
                        { priority: 20, target: `alt.mail.mx.${normalizedDomain}`, ttl: 14400 },
                    ],
                });
            }
        }, 1200); // Simulate network delay
    });
};

type LookupStatus = 'idle' | 'loading' | 'success' | 'error';
type RecordType = 'A' | 'CNAME' | 'MX';


// --- Main Component ---
const DNSLookupTool: React.FC = () => {
    const [domain, setDomain] = useState<string>('');
    const [status, setStatus] = useState<LookupStatus>('idle');
    const [records, setRecords] = useState<DnsRecordsInterface | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<RecordType>('A');

    const handleLookup = useCallback(async () => {
        const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!domainRegex.test(domain)) {
            setError('Please enter a valid domain name.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        setError(null);
        setRecords(null);

        try {
            const result = await getDnsRecords(domain);
            setRecords(result);
            setStatus('success');
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setStatus('error');
        }
    }, [domain]);
    
    const renderTable = () => {
        if (!records) return null;

        switch (activeTab) {
            case 'A':
                return (
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="bg-gray-800 text-gray-300">
                                <th className="p-3">IP Address</th>
                                <th className="p-3">TTL (Seconds)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.a.map((record, i) => (
                                <tr key={i} className="border-b border-gray-700">
                                    <td className="p-3 font-mono">{record.ip}</td>
                                    <td className="p-3">{record.ttl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'CNAME':
                 return (
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="bg-gray-800 text-gray-300">
                                <th className="p-3">Alias</th>
                                <th className="p-3">Canonical Name</th>
                                <th className="p-3">TTL (Seconds)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.cname.map((record, i) => (
                                <tr key={i} className="border-b border-gray-700">
                                    <td className="p-3 font-mono">{record.alias}</td>
                                    <td className="p-3 font-mono">{record.canonical}</td>
                                    <td className="p-3">{record.ttl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            case 'MX':
                 return (
                    <table className="w-full text-left table-auto">
                        <thead>
                            <tr className="bg-gray-800 text-gray-300">
                                <th className="p-3">Priority</th>
                                <th className="p-3">Mail Server (Target)</th>
                                <th className="p-3">TTL (Seconds)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.mx.map((record, i) => (
                                <tr key={i} className="border-b border-gray-700">
                                    <td className="p-3">{record.priority}</td>
                                    <td className="p-3 font-mono">{record.target}</td>
                                    <td className="p-3">{record.ttl}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">DNS Lookup Tool</h2>
            <p className="text-center text-gray-400 mb-8">Enter a domain to look up its A, CNAME, and MX records.</p>
            
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="flex-grow bg-gray-800 text-white placeholder-gray-500 border-2 border-gray-700 focus:border-cyan-500 focus:ring-0 rounded-md px-4 py-3 text-lg transition"
                    disabled={status === 'loading'}
                    onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                />
                <button
                    onClick={handleLookup}
                    disabled={status === 'loading'}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {status === 'loading' ? 'Looking Up...' : 'Lookup DNS'}
                </button>
            </div>

            {status === 'loading' && <div className="text-center py-10">Fetching DNS records...</div>}
            {status === 'error' && <p className="text-center text-red-400 mt-4 bg-red-500/10 p-3 rounded-md">{error}</p>}

            {status === 'success' && records && (
                <div className="mt-10 animate-fade-in">
                    <div className="flex border-b border-gray-700 mb-4">
                        {(['A', 'CNAME', 'MX'] as RecordType[]).map(type => (
                             <button
                                key={type}
                                onClick={() => setActiveTab(type)}
                                className={`py-2 px-6 font-semibold transition-colors duration-300 ${activeTab === type ? 'border-b-2 border-cyan-400 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                            >
                                {type} Records
                            </button>
                        ))}
                    </div>
                    <div className="bg-gray-800/50 rounded-lg overflow-hidden">
                        {renderTable()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DNSLookupTool;
