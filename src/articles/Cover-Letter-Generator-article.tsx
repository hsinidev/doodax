import React, { useState } from 'react';

const CoverLetterGeneratorArticle: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-zinc-800/50 p-6 rounded-lg">
            <div className={`relative transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[9999px]' : 'max-h-56 overflow-hidden'}`}>
                <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
                    <h2>Drafting the Perfect Cover Letter with AI: Personalization at Scale</h2>
                    <p>
                        A cover letter is your opportunity to make a strong first impression on a hiring manager. While a resume lists your skills and experience, a cover letter tells your story, connecting your qualifications directly to the needs of the company and the specific role. However, writing a unique, personalized cover letter for every application is a time-consuming and often daunting task. This is where an AI cover letter generator, powered by an advanced model like Gemini Pro, can be a game-changer for job seekers.
                    </p>

                    <h3>The Problem with Generic Templates</h3>
                    <p>
                        Hiring managers can spot a generic, copy-pasted cover letter from a mile away. These letters fail to demonstrate genuine interest in the position and do little to differentiate the candidate from the competition. An effective cover letter must be tailored, showing that you have read and understood the job description and have thoughtfully considered how your skills align with the company's needs.
                    </p>

                    <h3>How AI Achieves Personalization</h3>
                    <p>
                        An AI generator goes far beyond simple templates. By providing it with three key pieces of information—the job title/company, the full job description, and your own key skills—the AI can perform a sophisticated analysis to draft a highly relevant letter:
                    </p>
                    <ol className="list-decimal list-inside">
                        <li><strong>Keyword Extraction:</strong> The AI scans the job description to identify the most important keywords, skills, and qualifications the employer is looking for (e.g., "React," "agile environment," "team leadership").</li>
                        <li><strong>Skill Matching:</strong> It then compares this list of requirements to the list of key skills you provided, identifying the most significant overlaps.</li>
                        <li><strong>Contextual Narrative Generation:</strong> Using this information, the AI drafts a narrative that highlights your most relevant skills. It doesn't just list them; it can frame them as solutions to the problems outlined in the job description. For example, if the job requires "performance optimization," the AI can craft a sentence that showcases your experience in that specific area.</li>
                        <li><strong>Professional Tone and Structure:</strong> The model is trained on a vast corpus of professional documents, allowing it to generate a letter with a formal tone, proper structure (introduction, body paragraphs, conclusion), and polished grammar.</li>
                    </ol>
                    <p>
                        The result is a strong first draft that is already 80% of the way there. From there, you can add your own personal anecdotes and refine the language to perfectly match your voice, saving you hours of work while dramatically improving the quality of your applications.
                    </p>
                </article>
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800/50 to-transparent"></div>
                )}
            </div>
            <button 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="text-blue-400 hover:text-cyan-300 font-semibold mt-4"
            >
                {isExpanded ? 'Show Less' : 'Read More...'}
            </button>
        </div>
    );
};

export default CoverLetterGeneratorArticle;