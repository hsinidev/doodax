import React, { useState, useMemo } from 'react';

const SERVICES = [
    { name: 'County Clerk', role: 'Handles property records, marriage licenses, and business registrations.', phone: '555-0101', website: 'county.gov/clerk' },
    { name: 'Department of Motor Vehicles (DMV)', role: 'Manages driver\'s licenses, vehicle registration, and state IDs.', phone: '555-0102', website: 'state.gov/dmv' },
    { name: 'Secretary of State', role: 'Oversees state elections, corporate filings, and notary commissions.', phone: '555-0103', website: 'state.gov/sos' },
    { name: 'Local Courthouse / Superior Court', role: 'Handles civil and criminal cases, traffic violations, and jury duty.', phone: '555-0104', website: 'county.gov/courts' },
    { name: 'Tax Assessor-Collector', role: 'Assesses property taxes and processes voter registration.', phone: '555-0105', website: 'county.gov/tax' },
];

const PublicClerkServiceContactTool: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredServices = useMemo(() => {
        if (!searchTerm.trim()) return SERVICES;
        const lowercasedTerm = searchTerm.toLowerCase();
        return SERVICES.filter(service => 
            service.name.toLowerCase().includes(lowercasedTerm) || 
            service.role.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm]);

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Public Service Contact Tool</h2>
            <p className="text-center text-gray-400 mb-8">(Using generic, placeholder data)</p>

            <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by name or role (e.g., driver's license)"
                className="w-full bg-gray-800 p-3 rounded-md mb-6"
            />
            
            <div className="space-y-4">
                {filteredServices.map(service => (
                    <div key={service.name} className="bg-gray-800 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-cyan-400">{service.name}</h3>
                        <p className="text-gray-300 mt-1">{service.role}</p>
                        <div className="flex justify-between items-center mt-3 text-sm">
                            <span className="font-mono">{service.phone}</span>
                            <a href={`https://${service.website}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{service.website}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PublicClerkServiceContactTool;
