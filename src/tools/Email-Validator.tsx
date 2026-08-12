import React, { useState, useMemo } from 'react';

// --- Core Logic ---

/**
 * Validates an email address format using a robust regular expression.
 * This regex checks for a valid local part, a single '@', a domain, and a TLD.
 * It's a practical, client-side check for format, not for deliverability.
 * @param email The email string to validate.
 * @returns `true` if the email format is valid, otherwise `false`.
 */
const isValidEmail = (email: string): boolean => {
    const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return emailRegex.test(email);
};

type ValidationStatus = 'idle' | 'valid' | 'invalid';

// --- Main Component ---
const EmailValidator: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const status: ValidationStatus = useMemo(() => {
        if (!email) {
            return 'idle';
        }
        return isValidEmail(email) ? 'valid' : 'invalid';
    }, [email]);

    const getStatusMessage = () => {
        switch (status) {
            case 'valid':
                return (
                    <div className="flex items-center justify-center text-green-400 bg-green-500/10 p-4 rounded-lg">
                        <span className="text-2xl mr-3">✅</span>
                        <p className="text-lg font-semibold">Valid Email Format</p>
                    </div>
                );
            case 'invalid':
                return (
                    <div className="flex items-center justify-center text-red-400 bg-red-500/10 p-4 rounded-lg">
                        <span className="text-2xl mr-3">❌</span>
                        <p className="text-lg font-semibold">Invalid Email Format</p>
                    </div>
                );
            case 'idle':
            default:
                return <div className="h-16"></div>; // Placeholder to prevent layout shift
        }
    };

    const getInputClass = () => {
        switch (status) {
            case 'valid':
                return 'border-green-500 focus:border-green-500';
            case 'invalid':
                return 'border-red-500 focus:border-red-500';
            default:
                return 'border-gray-700 focus:border-cyan-500';
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Email Validator</h2>
            <p className="text-center text-gray-400 mb-8">Check the syntax of an email address in real-time.</p>

            <div className="mb-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter.email@example.com"
                    className={`w-full bg-gray-800 text-white text-center text-xl p-4 border-2 rounded-md focus:ring-0 transition-colors duration-300 ${getInputClass()}`}
                    aria-label="Email input for validation"
                    autoComplete="off"
                />
            </div>

            <div className="transition-opacity duration-300">
                {getStatusMessage()}
            </div>
        </div>
    );
};

export default EmailValidator;
