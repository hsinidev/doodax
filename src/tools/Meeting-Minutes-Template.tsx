import React, { useState, useCallback } from 'react';

const meetingTemplate = `
# Meeting Minutes: [Project Name]

**Date:** ${new Date().toISOString().split('T')[0]}
**Time:** 
**Location:** 
**Facilitator:** 
**Note Taker:** 

---

## 1. Attendees

- [Name 1]
- [Name 2]
- [Name 3]

---

## 2. Agenda

1.  **Topic 1:** [Brief description]
2.  **Topic 2:** [Brief description]
3.  **Topic 3:** [Brief description]

---

## 3. Discussion Summary

### Regarding Topic 1:
- [Key point discussed]
- [Decision made or outcome]

### Regarding Topic 2:
- [Key point discussed]
- [Decision made or outcome]

---

## 4. Action Items

| Task | Assigned To | Due Date |
| ---- | ----------- | -------- |
| [Task description] | [Name] | [YYYY-MM-DD] |
| [Task description] | [Name] | [YYYY-MM-DD] |

---

## 5. Next Meeting

**Date:** 
**Time:** 
**Agenda:** 
`;

const MeetingMinutesTemplate: React.FC = () => {
    const [content, setContent] = useState(meetingTemplate.trim());
    const [copyStatus, setCopyStatus] = useState(false);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(content).then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        });
    }, [content]);
    
    const handleDownload = useCallback(() => {
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'meeting-minutes.md';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [content]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Meeting Minutes Template</h2>
            <p className="text-center text-gray-400 mb-8">Use this Markdown template to structure and format your meeting notes.</p>

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[60vh] bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 resize-y"
                aria-label="Meeting minutes template editor"
            />
            <div className="flex justify-center gap-4 mt-6">
                <button onClick={handleCopy} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md">
                    {copyStatus ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <button onClick={handleDownload} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md">
                    Download .md File
                </button>
            </div>
        </div>
    );
};

export default MeetingMinutesTemplate;