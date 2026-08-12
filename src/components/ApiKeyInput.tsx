import React, { useState, useEffect, useCallback } from 'react';

interface ApiKeyInputProps {
    storageKey: string;
    title: string;
    description: string;
    apiKey: string | null;
    setApiKey: (key: string | null) => void;
}

export const useApiKey = (storageKey: string) => {
    const [apiKey, setApiKey] = useState<string | null>(() => {
        try {
            return localStorage.getItem(storageKey);
        } catch (error) {
            console.warn(`Error reading localStorage key “${storageKey}”:`, error);
            return null;
        }
    });

    const handleSetApiKey = useCallback((key: string | null) => {
        try {
            if (key) {
                localStorage.setItem(storageKey, key);
            } else {
                localStorage.removeItem(storageKey);
            }
            setApiKey(key);
        } catch (error) {
            console.warn(`Error setting localStorage key “${storageKey}”:`, error);
        }
    }, [storageKey]);

    return { apiKey, setApiKey: handleSetApiKey };
};


export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ storageKey, title, description, apiKey, setApiKey }) => {
    const [inputValue, setInputValue] = useState(apiKey || '');
    
    useEffect(() => {
        setInputValue(apiKey || '');
    }, [apiKey]);

    const handleSave = () => {
        setApiKey(inputValue);
    };
    
    return (
        <div className="bg-gray-800/50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
            <p className="text-sm text-gray-400 mb-3">{description}</p>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter your API key here"
                    className="flex-grow bg-gray-700 text-white placeholder-gray-500 border-2 border-gray-600 focus:border-cyan-500 focus:ring-0 rounded-md px-3 py-2 transition"
                />
                <button
                    onClick={handleSave}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                    Save Key
                </button>
            </div>
        </div>
    );
};