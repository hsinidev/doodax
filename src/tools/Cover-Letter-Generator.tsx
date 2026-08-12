import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const CoverLetterGenerator: React.FC = () => {
    const [jobInfo, setJobInfo] = useState<string>('Senior Frontend Engineer at TechCorp');
    const [jobDescription, setJobDescription] = useState<string>('Seeking a skilled frontend engineer with 5+ years of experience in React, TypeScript, and performance optimization. Responsibilities include leading projects and mentoring junior developers.');
    const [keySkills, setKeySkills] = useState<string>('React, TypeScript, Next.js, Web Performance, Team Leadership, Agile Methodologies');
    const [letter, setLetter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!jobDescription.trim() || !keySkills.trim()) {
            setError('Please provide a job description and your key skills.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setLetter('');

        const userInput = `Job Title/Company: ${jobInfo}\nJob Description: ${jobDescription}\nApplicant Key Skills: ${keySkills}`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: userInput,
                config: {
                    systemInstruction: "You are an expert career consultant. Draft a professional, personalized cover letter from the perspective of a highly qualified applicant. The letter must be well-structured, referencing the applicant's relevant experience and demonstrating a clear understanding of the job requirements. Use Markdown for formatting.",
                }
            });
            
            setLetter(response.text);
        } catch (err: any) {
            console.error(err);
            setError(`Failed to generate cover letter: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [jobInfo, jobDescription, keySkills]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">AI Cover Letter Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a personalized cover letter based on the job description.</p>

            <div className="space-y-4">
                <input type="text" value={jobInfo} onChange={(e) => setJobInfo(e.target.value)} placeholder="Job Title / Company" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} rows={6} placeholder="Paste the job description here..." className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                <textarea value={keySkills} onChange={(e) => setKeySkills(e.target.value)} rows={3} placeholder="Enter your key skills, comma-separated..." className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                <div className="text-center pt-2">
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating...' : 'Generate Cover Letter'}
                    </button>
                </div>
            </div>

            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md mt-6">{error}</p>}
            
            {(isLoading || letter) && (
                 <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Generated Cover Letter</label>
                    <div className="w-full min-h-96 bg-gray-800/50 p-6 border-2 border-gray-700 rounded-md">
                        {isLoading ? <p>Generating...</p> : <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: letter.replace(/\n/g, '<br />') }} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoverLetterGenerator;