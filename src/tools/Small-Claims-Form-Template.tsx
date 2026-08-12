import React, { useMemo, useCallback } from 'react';

const getTemplate = () => `
## SMALL CLAIMS COURT - PLAINTIFF'S STATEMENT

**Case Number:** (To be assigned by the court)

---

### 1. The Plaintiff (You)
**Name:** 
**Address:** 
**Phone:** 

### 2. The Defendant (The person or business you are suing)
**Name:** 
**Address:** 
**Phone:** 

---

### 3. The Claim
**A. Date the problem started:** 
**B. Amount of money you are claiming:** $
**C. Reason for the claim:**
(Explain what happened and why the defendant owes you money. Be clear, concise, and state the facts. Attach copies of any relevant documents like receipts, contracts, or photos.)

[Your detailed explanation here...]

---

### 4. Statement of Truth
I declare under penalty of perjury under the laws of the State of [Your State] that the foregoing is true and correct.

**Date:** 

**Signature:** _________________________
`;

const SmallClaimsFormTemplate: React.FC = () => {
    const templateText = useMemo(() => getTemplate().trim(), []);

    const handleDownload = useCallback(() => {
        const disclaimer = "LEGAL DISCLAIMER:\nThis is a generic, non-official template for informational purposes ONLY. It is NOT a valid legal document and is NOT a substitute for professional legal advice or the official forms provided by your local court. Small claims procedures and required forms are specific to your state and county. You MUST obtain and use the official forms from your local courthouse.\n\n" + "=".repeat(80) + "\n\n";
        const blob = new Blob([disclaimer + templateText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'small-claims-template.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [templateText]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Small Claims Form Template</h2>
            <p className="text-center text-gray-400 mb-8">A basic template to help you structure your claim.</p>
            
            <div className="bg-red-900/50 text-red-300 border border-red-700 p-4 rounded-md text-center mb-6">
                <strong className="text-xl">IMPORTANT:</strong>
                <p>This is **NOT** a legal form. It is a simplified template for educational purposes only. You **MUST** use the official forms provided by your local small claims court.</p>
            </div>

            <textarea readOnly value={templateText} className="w-full h-[60vh] bg-gray-800/50 p-4 font-mono rounded-md"/>
            
            <div className="text-center mt-6">
                <button onClick={handleDownload} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md">
                    Download .txt Template
                </button>
            </div>
        </div>
    );
};

export default SmallClaimsFormTemplate;
