import React, { useState, useMemo, useCallback } from 'react';

const getNDATemplate = (disclosingParty: string, receivingParty: string, effectiveDate: string) => `
# Non-Disclosure Agreement (NDA)

**Effective Date:** ${effectiveDate || '[Effective Date]'}

This Non-Disclosure Agreement (the "Agreement") is entered into by and between:

**The Disclosing Party:** ${disclosingParty || '[Disclosing Party Name]'}
**The Receiving Party:** ${receivingParty || '[Receiving Party Name]'}

(Collectively, the "Parties")

## 1. Confidential Information
The Disclosing Party intends to disclose information (the "Confidential Information") to the Receiving Party for the purpose of [Purpose of Disclosure, e.g., evaluating a potential business relationship].

## 2. Obligations
The Receiving Party shall hold and maintain the Confidential Information in strict confidence and shall not disclose it to any third party. The Receiving Party shall not use the Confidential Information for any purpose except for the Purpose.

## 3. Term
This Agreement shall remain in effect for a period of two (2) years from the Effective Date.

## 4. Governing Law
This Agreement shall be governed by the laws of the State of [State], without regard to its conflict of laws principles.

---
*Disclaimer: This is a simplified, non-binding template for informational purposes only. It is not a substitute for professional legal advice. Consult with a lawyer before using this document in a real transaction.*
`;

const SimpleNdaGenerator: React.FC = () => {
    const [disclosingParty, setDisclosingParty] = useState('Your Company LLC');
    const [receivingParty, setReceivingParty] = useState('Their Company Inc.');
    const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
    const [copyStatus, setCopyStatus] = useState(false);

    const ndaText = useMemo(() => {
        return getNDATemplate(disclosingParty, receivingParty, effectiveDate).trim();
    }, [disclosingParty, receivingParty, effectiveDate]);
    
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(ndaText).then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        });
    }, [ndaText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Simple NDA Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a basic, one-way Non-Disclosure Agreement template.</p>

            <div className="space-y-4 mb-6">
                 <input type="text" value={disclosingParty} onChange={e => setDisclosingParty(e.target.value)} placeholder="Disclosing Party Name" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                 <input type="text" value={receivingParty} onChange={e => setReceivingParty(e.target.value)} placeholder="Receiving Party Name" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                 <input type="date" value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
            </div>

            <div className="bg-red-900/50 text-red-300 border border-red-700 p-4 rounded-md text-center mb-6">
                <strong>Disclaimer:</strong> This tool generates a basic template for informational purposes only and does not provide legal advice. Consult with a qualified attorney for your specific needs.
            </div>

            <textarea
                readOnly
                value={ndaText}
                className="w-full h-[50vh] bg-gray-800/50 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md"
            />
             <div className="text-center mt-6">
                <button onClick={handleCopy} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md">
                    {copyStatus ? 'Copied!' : 'Copy to Clipboard'}
                </button>
            </div>
        </div>
    );
};

export default SimpleNdaGenerator;