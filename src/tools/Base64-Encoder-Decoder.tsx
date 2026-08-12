import React, { useState, useCallback, useRef } from 'react';

type ProcessStatus = 'idle' | 'success' | 'error';

const StatusMessage: React.FC<{ status: ProcessStatus; message: string }> = ({ status, message }) => {
    if (status === 'idle' || !message) return null;

    const colorClasses = status === 'success' 
        ? 'text-green-400 bg-green-500/10' 
        : 'text-red-400 bg-red-500/10';

    return (
        <div className={`p-3 rounded-md text-center font-semibold ${colorClasses}`}>
            {message}
        </div>
    );
};

const Base64EncoderDecoder: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [output, setOutput] = useState<string>('');
    const [status, setStatus] = useState<ProcessStatus>('idle');
    const [message, setMessage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const setStatusMessage = (status: ProcessStatus, msg: string) => {
        setStatus(status);
        setMessage(msg);
        setTimeout(() => {
            setStatus('idle');
            setMessage('');
        }, 3000);
    };

    const handleEncodeText = useCallback(() => {
        if (!input) {
            setStatusMessage('error', 'Input text is empty.');
            return;
        }
        try {
            // Using btoa which works on strings of single-byte characters.
            // For full Unicode support, a more complex function is needed, but this adheres to the prompt's spec.
            const encoded = btoa(input);
            setOutput(encoded);
            setStatusMessage('success', 'Text encoded successfully.');
        } catch (e: any) {
            // This can happen with Unicode characters in some browser implementations.
            setStatusMessage('error', `Encoding failed: ${e.message}. Ensure input is valid ASCII/Latin1 characters.`);
        }
    }, [input]);

    const handleDecodeText = useCallback(() => {
        if (!input) {
            setStatusMessage('error', 'Input text is empty.');
            return;
        }
        try {
            const decoded = atob(input);
            setOutput(decoded);
            setStatusMessage('success', 'Base64 decoded successfully.');
        } catch (e: any) {
            setOutput('');
            setStatusMessage('error', `Decoding failed: ${e.message}. The input is not a valid Base64 string.`);
        }
    }, [input]);
    
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // The result includes the Data URL prefix (e.g., "data:image/png;base64,"), we need to strip it.
            const base64String = result.substring(result.indexOf(',') + 1);
            setOutput(base64String);
            setInput(`File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
            setStatusMessage('success', `File "${file.name}" encoded successfully.`);
        };
        reader.onerror = () => {
             setStatusMessage('error', 'Failed to read the file.');
        };
        reader.readAsDataURL(file);
    };
    
    const handleDownloadFile = useCallback(() => {
        if (!output) {
            setStatusMessage('error', 'There is no decoded content to download.');
            return;
        }
        try {
            // Convert the Base64 decoded string (which is a string of bytes) to a Uint8Array
            const byteCharacters = output;
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/octet-stream' });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'decoded_file'; // Generic filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatusMessage('success', 'Download started.');

        } catch (e: any) {
            setStatusMessage('error', `Failed to create download: ${e.message}`);
        }
    }, [output]);


    return (
        <div className="w-full max-w-6xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Base64 Encoder & Decoder</h2>
            <p className="text-center text-gray-400 mb-8">All operations are done securely in your browser. No data is sent to a server.</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Input: Paste text here or upload a file..."
                    className="w-full h-64 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-y"
                />
                <textarea
                    readOnly
                    value={output}
                    placeholder="Output will appear here..."
                    className="w-full h-64 bg-gray-800 text-gray-200 font-mono p-4 border-2 border-gray-700 rounded-md focus:border-cyan-500 focus:ring-0 transition resize-y"
                />
            </div>

            <div className="mb-6 h-12">
                <StatusMessage status={status} message={message} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
                <button onClick={handleEncodeText} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-md transition-all">Encode Text</button>
                <button onClick={handleDecodeText} className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-md transition-all">Decode Text</button>
                <button onClick={() => fileInputRef.current?.click()} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-md transition-all">Upload File to Encode</button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                <button onClick={handleDownloadFile} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-6 rounded-md transition-all">Download Decoded File</button>
            </div>
        </div>
    );
};

export default Base64EncoderDecoder;
