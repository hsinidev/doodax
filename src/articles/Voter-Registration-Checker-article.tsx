import React from 'react';

const VoterRegistrationCheckerArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-blue-400">
            <h2>The Importance of Verifying Your Voter Registration Status</h2>
            <p>
                Voting is a fundamental right and a cornerstone of democracy. However, simply being eligible to vote is not enough; you must be registered. Voter registration rolls are not always static. People can be removed from the rolls if they move, have not voted in recent elections (in some states), or due to administrative errors. For this reason, it's a best practice to regularly check your voter registration status, especially in the months leading up to an election.
            </p>

            <h3>Why You Should Check Your Status</h3>
            <ul className="list-disc pl-5">
                <li><strong>Ensure You Are Active:</strong> The most important reason is to confirm that you are on the list and that your status is "active."</li>
                <li><strong>Verify Your Information:</strong> Checking your status allows you to confirm that your name, address, and party affiliation (if applicable) are all correct. An incorrect address could mean you are assigned to the wrong polling place.</li>
                <li><strong>Avoid Election Day Surprises:</strong> Discovering a problem with your registration on Election Day can be stressful and may prevent you from casting a regular ballot. Checking in advance gives you time to correct any issues.</li>
            </ul>

            <h3>How to Check Your Registration (Official Sources)</h3>
            <p>
                This tool provides a placeholder UI to demonstrate how such a service might work. For official information, you must use government websites. Most states in the U.S. provide an online tool to check your voter registration status.
            </p>
            <p>
                A reliable, non-partisan starting point is the National Association of Secretaries of State (NASS) website, which can direct you to your specific state's election office page. You can also visit official government sites like <a href="https://vote.gov" target="_blank" rel="noopener noreferrer">vote.gov</a>. Typically, you will need to provide your name, date of birth, and address to look up your record.
            </p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default VoterRegistrationCheckerArticle;
