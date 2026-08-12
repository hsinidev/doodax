import React, { useState, useMemo, useCallback } from 'react';

const getWillTemplate = (testator: string, executor: string, beneficiary: string) => `
## LAST WILL AND TESTAMENT of ${testator || '[Your Full Name]'}

**I,** ${testator || '[Your Full Name]'}, residing at [Your Address], being of sound mind and memory, do hereby declare this to be my last Will and Testament, revoking all previous wills and codicils made by me.

### ARTICLE I: APPOINTMENT OF EXECUTOR
I appoint **${executor || '[Executor\'s Full Name]'}**, residing at [Executor's Address], as the Executor of this Will. If my Executor is unable or unwilling to serve, I appoint [Alternate Executor's Name] as the alternate Executor.

### ARTICLE II: BEQUESTS
I give, devise, and bequeath all the rest, residue, and remainder of my estate, both real and personal, of whatsoever kind and wheresoever situated, to **${beneficiary || '[Beneficiary\'s Full Name]'}**.

### ARTICLE III: SIGNATURE
IN WITNESS WHEREOF, I have subscribed my name this [Date] day of [Month], [Year].

_________________________
(${testator || '[Your Full Name]'})

### WITNESSES
We, the undersigned witnesses, each declare that the Testator signed this Will in our presence, that the Testator declared it to be their Will, and that we sign our names here as witnesses in the presence of the Testator and of each other.

_________________________
Witness 1 Name & Address

_________________________
Witness 2 Name & Address
`;

const SimpleWillTemplateGenerator: React.FC = () => {
    const [testator, setTestator] = useState('John Doe');
    const [executor, setExecutor] = useState('Jane Smith');
    const [beneficiary, setBeneficiary] = useState('John Doe Jr.');

    const willText = useMemo(() => getWillTemplate(testator, executor, beneficiary).trim(), [testator, executor, beneficiary]);
    
    const handleDownload = useCallback(() => {
        const disclaimer = "DISCLAIMER:\nThis document is a simplified template for informational and educational purposes only. It is NOT a valid legal document and is NOT a substitute for professional legal advice. Will and testament laws are complex and vary significantly by jurisdiction. You MUST consult with a qualified attorney to create a legally binding will.\n\n" + "=".repeat(80) + "\n\n";
        const blob = new Blob([disclaimer + willText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'will-template.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [willText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Simple Will Template Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a basic template to understand the structure of a will.</p>

            <div className="bg-red-900/50 text-red-300 border border-red-700 p-4 rounded-md text-center mb-6">
                <strong className="text-xl">EXTREMELY IMPORTANT:</strong>
                <p>This tool is for educational purposes ONLY. The document generated is **NOT** a legal will. You **MUST** consult a qualified lawyer to create a valid and enforceable last will and testament.</p>
            </div>

            <div className="space-y-4 mb-6">
                 <input type="text" value={testator} onChange={e => setTestator(e.target.value)} placeholder="Your Full Name (Testator)" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                 <input type="text" value={executor} onChange={e => setExecutor(e.target.value)} placeholder="Executor's Full Name" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
                 <input type="text" value={beneficiary} onChange={e => setBeneficiary(e.target.value)} placeholder="Primary Beneficiary's Full Name" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700"/>
            </div>

            <textarea
                readOnly
                value={willText}
                className="w-full h-[60vh] bg-gray-800/50 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md"
            />
             <div className="text-center mt-6">
                <button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md">
                    Download .txt Template
                </button>
            </div>
        </div>
    );
};

export default SimpleWillTemplateGenerator;