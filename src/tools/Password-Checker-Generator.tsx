import React, { useState, useCallback, useEffect } from 'react';

// --- TypeScript Interfaces ---
interface StrengthResult {
    score: number; // 0-4
    rating: 'Very Weak' | 'Weak' | 'Medium' | 'Strong';
    criteria: {
        length: boolean;
        uppercase: boolean;
        lowercase: boolean;
        number: boolean;
        symbol: boolean;
    };
}

interface GeneratorOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}

// --- Core Logic ---

const checkStrength = (password: string): StrengthResult => {
    let score = 0;
    const criteria = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password),
    };

    if (criteria.length) score++;
    if (criteria.uppercase && criteria.lowercase) score++;
    if (criteria.number) score++;
    if (criteria.symbol) score++;
    if (password.length > 12 && score > 0) score++;


    let rating: StrengthResult['rating'] = 'Very Weak';
    if (score >= 4) rating = 'Strong';
    else if (score === 3) rating = 'Medium';
    else if (score >= 1) rating = 'Weak';
    
    // Cap score at 4 for bar display
    const finalScore = Math.min(score, 4);

    return { score: finalScore, rating, criteria };
};

const generateSecurePassword = (options: GeneratorOptions): string => {
    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    };

    let availableChars = '';
    if (options.includeUppercase) availableChars += charSets.uppercase;
    if (options.includeLowercase) availableChars += charSets.lowercase;
    if (options.includeNumbers) availableChars += charSets.numbers;
    if (options.includeSymbols) availableChars += charSets.symbols;

    if (availableChars.length === 0) {
        return 'Select at least one character set.';
    }

    let password = '';
    // Use crypto.getRandomValues for cryptographically secure random numbers
    const randomValues = new Uint32Array(options.length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < options.length; i++) {
        password += availableChars[randomValues[i] % availableChars.length];
    }

    return password;
};

// --- UI Components ---
const StrengthBar: React.FC<{ score: number }> = ({ score }) => {
    const colors = ['bg-red-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    return (
        <div className="flex gap-2 h-3 rounded-full overflow-hidden bg-gray-700">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className={`flex-1 transition-all duration-300 ${i < score ? colors[i] : 'bg-gray-700'}`}
                />
            ))}
        </div>
    );
};

const CriteriaItem: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
     <li className={`flex items-center transition-colors duration-300 ${met ? 'text-green-400' : 'text-gray-400'}`}>
        {met ? '✅' : '❌'}
        <span className="ml-2">{text}</span>
    </li>
);

// --- Main Component ---
const PasswordCheckerGenerator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState<StrengthResult>(checkStrength(''));
    
    const [genOptions, setGenOptions] = useState<GeneratorOptions>({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
    });
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [copyStatus, setCopyStatus] = useState(false);

    useEffect(() => {
        setStrength(checkStrength(password));
    }, [password]);

    useEffect(() => {
        // Generate a password on initial load
        handleGenerate();
    }, []);

    const handleGenerate = useCallback(() => {
        const newPassword = generateSecurePassword(genOptions);
        setGeneratedPassword(newPassword);
    }, [genOptions]);

    const handleCopy = () => {
        if (!generatedPassword) return;
        navigator.clipboard.writeText(generatedPassword).then(() => {
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Password Strength & Generator</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Checker Section */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Strength Checker</h3>
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Type a password to check"
                            className="w-full bg-gray-800 p-3 pr-12 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0"
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
                           {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <StrengthBar score={strength.score} />
                    <p className="text-center font-bold my-2">{strength.rating}</p>
                    <ul className="text-sm space-y-1">
                       <CriteriaItem met={strength.criteria.length} text="At least 8 characters" />
                       <CriteriaItem met={strength.criteria.uppercase && strength.criteria.lowercase} text="Uppercase & lowercase letters" />
                       <CriteriaItem met={strength.criteria.number} text="At least one number" />
                       <CriteriaItem met={strength.criteria.symbol} text="At least one symbol" />
                    </ul>
                </div>

                {/* Generator Section */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Password Generator</h3>
                    <div className="bg-gray-800 p-3 rounded-md flex items-center gap-2 mb-4">
                        <code className="flex-grow font-mono text-lg break-all">{generatedPassword}</code>
                        <button onClick={handleCopy} className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded-md transition-colors">
                            {copyStatus ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label htmlFor="length">Length:</label>
                            <span className="font-bold text-lg">{genOptions.length}</span>
                        </div>
                        <input
                            id="length"
                            type="range"
                            min="8"
                            max="32"
                            value={genOptions.length}
                            onChange={(e) => setGenOptions(o => ({ ...o, length: +e.target.value }))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <label className="flex items-center"><input type="checkbox" checked={genOptions.includeUppercase} onChange={(e) => setGenOptions(o => ({ ...o, includeUppercase: e.target.checked }))} className="mr-2" /> Uppercase (A-Z)</label>
                            <label className="flex items-center"><input type="checkbox" checked={genOptions.includeLowercase} onChange={(e) => setGenOptions(o => ({ ...o, includeLowercase: e.target.checked }))} className="mr-2" /> Lowercase (a-z)</label>
                            <label className="flex items-center"><input type="checkbox" checked={genOptions.includeNumbers} onChange={(e) => setGenOptions(o => ({ ...o, includeNumbers: e.target.checked }))} className="mr-2" /> Numbers (0-9)</label>
                            <label className="flex items-center"><input type="checkbox" checked={genOptions.includeSymbols} onChange={(e) => setGenOptions(o => ({ ...o, includeSymbols: e.target.checked }))} className="mr-2" /> Symbols (!@#$)</label>
                        </div>
                    </div>
                     <button onClick={handleGenerate} className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 mt-4 rounded-md transition-colors">
                        Generate New Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordCheckerGenerator;
