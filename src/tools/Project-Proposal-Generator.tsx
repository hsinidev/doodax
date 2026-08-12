import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

const ProjectProposalGenerator: React.FC = () => {
    const [projectName, setProjectName] = useState<string>('New E-commerce Platform');
    const [primaryGoal, setPrimaryGoal] = useState<string>('Develop and launch a scalable e-commerce website to increase online sales by 50% within the first year.');
    const [proposal, setProposal] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!projectName.trim() || !primaryGoal.trim()) {
            setError('Please provide both a project name and a primary goal.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setProposal('');

        const userInput = `Project Name: ${projectName}\nPrimary Goal: ${primaryGoal}`;

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userInput,
                config: {
                    systemInstruction: "You are a business analyst. Generate a professional project proposal outline and draft content for the main sections: Executive Summary, Project Goal/Scope, Deliverables, and Timeline (Placeholder text). The output should be formatted using Markdown headings.",
                }
            });
            
            setProposal(response.text);
        } catch (err: any) {
            console.error(err);
            setError(`Failed to generate proposal: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    }, [projectName, primaryGoal]);

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">AI Project Proposal Generator</h2>
            <p className="text-center text-gray-400 mb-8">Generate a structured proposal outline for your next project.</p>

            <div className="space-y-4">
                <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                <textarea value={primaryGoal} onChange={(e) => setPrimaryGoal(e.target.value)} rows={3} placeholder="Describe the primary goal of the project..." className="w-full bg-gray-800 p-3 rounded-md border-2 border-gray-700 focus:border-cyan-500 focus:ring-0" />
                <div className="text-center pt-2">
                    <button onClick={handleGenerate} disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isLoading ? 'Generating...' : 'Generate Proposal'}
                    </button>
                </div>
            </div>

            {error && <p className="text-center text-red-400 bg-red-500/10 p-3 rounded-md mt-6">{error}</p>}
            
            {(isLoading || proposal) && (
                 <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Generated Proposal Outline</label>
                    <div className="w-full min-h-96 bg-gray-800/50 p-6 border-2 border-gray-700 rounded-md">
                        {isLoading ? <p>Generating...</p> : <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: proposal.replace(/\n/g, '<br />') }} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectProposalGenerator;