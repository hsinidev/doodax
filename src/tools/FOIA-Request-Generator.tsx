import React, { useState, useMemo, useCallback } from 'react';

const getFOIATemplate = (agencyName: string, agencyAddress: string, recordsDescription: string, name: string, address: string) => `
[Your Name]
${address || '[Your Address]'}
[Your City, State, Zip]
[Your Email]
[Your Phone Number]

${new Date().toISOString().split('T')[0]}

FOIA Request Officer
${agencyName || '[Agency Name]'}
${agencyAddress || '[Agency Address]'}
[Agency City, State, Zip]

**Subject: Freedom of Information Act Request**

Dear FOIA Officer:

This is a request under the Freedom of Information Act (5 U.S.C. § 552).

I hereby request copies of the following records:
(Please be as specific as possible)

${recordsDescription || '[Provide a detailed description of the records you are seeking.]'}

I request a waiver of all fees for this request. Disclosure of the requested information to me is in the public interest because it is likely to contribute significantly to public understanding of the operations or activities of the government and is not primarily in my commercial interest.
(Optional: You can remove the fee waiver request if it does not apply).

As I am making this request as an individual, I am willing to pay fees for this request up to a maximum of $25. If you estimate that the fees will exceed this limit, please inform me first.

Thank you for your consideration of this request.

Sincerely,

${name || '[Your Name]'}
`;

const FOIARequestGenerator: React.FC = () => {
    const [agencyName, setAgencyName] = useState('Department of Justice');
    const [agencyAddress, setAgencyAddress] = useState('950 Pennsylvania Avenue, NW');
    const [recordsDescription, setRecordsDescription] = useState('All internal memos regarding policy changes on data retention from January 1, 2023, to December 31, 2023.');
    const [requesterName, setRequesterName] = useState('John Q. Public');
    const [requesterAddress, setRequesterAddress] = useState('123 Main Street');

    const letterText = useMemo(() => {
        return getFOIATemplate(agencyName, agencyAddress, recordsDescription, requesterName, requesterAddress).trim();
    }, [agencyName, agencyAddress, recordsDescription, requesterName, requesterAddress]);
    
    const handleDownload = useCallback(() => {
        const disclaimer = "DISCLAIMER:\nThis document is a simplified template for informational purposes. It is NOT legal advice. You should verify the specific requirements for the agency you are contacting.\n\n" + "=".repeat(80) + "\n\n";
        const blob = new Blob([disclaimer + letterText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'foia-request-letter.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [letterText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">FOIA Request Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a template letter for a U.S. Freedom of Information Act request.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Your Information</h3>
                    <input type="text" value={requesterName} onChange={e => setRequesterName(e.target.value)} placeholder="Your Name" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="text" value={requesterAddress} onChange={e => setRequesterAddress(e.target.value)} placeholder="Your Address" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <h3 className="text-lg font-semibold mt-4">Agency Information</h3>
                    <input type="text" value={agencyName} onChange={e => setAgencyName(e.target.value)} placeholder="Agency Name" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="text" value={agencyAddress} onChange={e => setAgencyAddress(e.target.value)} placeholder="Agency Address" className="w-full bg-gray-800 p-2 rounded-md"/>
                </div>
                 <div>
                    <h3 className="text-lg font-semibold">Records Description</h3>
                    <textarea value={recordsDescription} onChange={e => setRecordsDescription(e.target.value)} rows={9} placeholder="Describe the records you are requesting..." className="w-full bg-gray-800 p-2 rounded-md resize-y"/>
                </div>
            </div>

            <textarea readOnly value={letterText} className="w-full h-[50vh] bg-gray-800/50 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md" />
            
             <div className="text-center mt-6">
                <button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md">
                    Download .txt Letter
                </button>
            </div>
        </div>
    );
};

export default FOIARequestGenerator;
