import React, { useState, useMemo, useCallback } from 'react';

const getLOITemplate = (sender: string, recipient: string, date: string, subject: string) => `
**[Your Name/Company Name]**
[Your Address]
[Your City, State, Zip]
[Your Email]

**Date:** ${date || '[Date]'}

**[Recipient Name/Company Name]**
${recipient || '[Recipient Address]'}
[Recipient City, State, Zip]

**Subject: Letter of Intent regarding ${subject || '[Subject of Transaction]'}**

Dear [Recipient Name],

This non-binding Letter of Intent (the "LOI") outlines the general terms and conditions of a proposed agreement between ${sender || '[Your Name/Company]'} (the "Buyer") and [Recipient Name/Company] (the "Seller") concerning the potential acquisition of [Describe assets or business].

**1. Proposed Transaction:** Buyer proposes to acquire [e.g., substantially all of the assets] of the Seller.

**2. Purchase Price:** The proposed consideration for the transaction is [e.g., $X,XXX,XXX], subject to due diligence.

**3. Due Diligence:** Upon execution of this LOI, Buyer shall be granted a period of [e.g., 30] days to conduct a thorough due diligence review of the Seller's business, finances, and operations.

**4. Non-Binding Nature:** This LOI is an expression of mutual intent and does not constitute a legally binding agreement, except for the confidentiality provisions herein. A definitive agreement will be drafted for review and execution by both parties.

We look forward to working with you toward a successful transaction.

Sincerely,

_________________________
${sender || '[Your Name]'}
`;

const LetterOfIntentGenerator: React.FC = () => {
    const [sender, setSender] = useState('Your Company LLC');
    const [recipient, setRecipient] = useState('Their Company Inc.');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [subject, setSubject] = useState('the acquisition of their assets');
    const [copyStatus, setCopyStatus] = useState(false);

    const loiText = useMemo(() => getLOITemplate(sender, recipient, date, subject).trim(), [sender, recipient, date, subject]);
    
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(loiText).then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        });
    }, [loiText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Letter of Intent (LOI) Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a basic, non-binding Letter of Intent template.</p>

            <div className="space-y-4 mb-6">
                 <input type="text" value={sender} onChange={e => setSender(e.target.value)} placeholder="Your Name / Company" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                 <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Recipient Name / Company & Address" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                 <input type="text" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject (e.g., a potential partnership)" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
            </div>

             <div className="bg-red-900/50 text-red-300 border border-red-700 p-4 rounded-md text-center mb-6">
                <strong>Disclaimer:</strong> This is a simplified template for informational purposes and is not legal advice. Always consult a lawyer for business transactions.
            </div>

            <textarea
                readOnly
                value={loiText}
                className="w-full h-[60vh] bg-gray-800/50 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md"
            />
             <div className="text-center mt-6">
                <button onClick={handleCopy} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md">
                    {copyStatus ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
        </div>
    );
};

export default LetterOfIntentGenerator;