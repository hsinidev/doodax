import React, { useState, useCallback } from 'react';

type CheckStatus = 'idle' | 'loading' | 'success' | 'error';

const VoterRegistrationChecker: React.FC = () => {
    const [status, setStatus] = useState<CheckStatus>('idle');
    const [formData, setFormData] = useState({
        firstName: 'Jane',
        lastName: 'Doe',
        dob: '1990-01-01',
        zip: '12345'
    });
    const [result, setResult] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleCheck = useCallback(() => {
        setStatus('loading');
        // Simulate an API call
        setTimeout(() => {
            // Placeholder logic
            if (formData.firstName && formData.lastName && formData.dob && formData.zip) {
                setResult(`Status for ${formData.firstName} ${formData.lastName}: You are registered and active! (Simulated Result)`);
                setStatus('success');
            } else {
                setResult('Error: All fields are required. (Simulated Result)');
                setStatus('error');
            }
        }, 1500);
    }, [formData]);

    return (
        <div className="w-full max-w-lg mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Voter Registration Checker</h2>
            <p className="text-center text-gray-400 mb-8">(Placeholder UI for a U.S. based service)</p>
            
            <div className="space-y-4">
                <input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input name="dob" type="date" value={formData.dob} onChange={handleInputChange} placeholder="Date of Birth" className="w-full bg-gray-800 p-3 rounded-md"/>
                <input name="zip" value={formData.zip} onChange={handleInputChange} placeholder="ZIP Code" className="w-full bg-gray-800 p-3 rounded-md"/>
            </div>

            <div className="text-center mt-6">
                <button onClick={handleCheck} disabled={status === 'loading'} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg disabled:bg-gray-600">
                    {status === 'loading' ? 'Checking...' : 'Check Status'}
                </button>
            </div>
            
            {result && (
                <div className={`mt-6 p-4 rounded-md text-center ${status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {result}
                </div>
            )}
        </div>
    );
};

export default VoterRegistrationChecker;
