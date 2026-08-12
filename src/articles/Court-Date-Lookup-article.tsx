import React from 'react';

const CourtDateLookupArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-purple-400">
            <h2>Accessing Public Court Records</h2>
            <p>
                In the United States, court proceedings are generally a matter of public record. This principle of transparency is a cornerstone of the justice system. As a result, many court systems provide online portals where the public can look up information about cases, including upcoming court dates, case statuses, and filed documents.
            </p>
            
            <h3>How to Find Official Court Information</h3>
            <p>
                While this tool provides a simulation, accessing real court records requires you to use official government websites. The availability and functionality of these online systems vary greatly by state, county, and whether the case is in federal or state court.
            </p>
            <p>
                To find information about a specific case, you should start by identifying the correct court. Is it a local county court, a state superior court, or a federal district court? Once you've identified the court, visit its official website. Look for a section labeled "Case Search," "Online Services," or "Public Records Access."
            </p>
            <p>
                You can typically search for a case using one of the following pieces of information:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Case Number:</strong> This is the unique identifier assigned to a case by the court and is the most reliable way to look up information.</li>
                <li><strong>Party Name:</strong> You can often search for cases by the name of one of the individuals or businesses involved (the plaintiff or defendant).</li>
            </ul>
            <p>
                These official portals are the only authoritative source for court dates and case information.
            </p>
        
                    <div className="bg-gray-900/70 p-4 rounded-md my-4 border border-cyan-500/30">
                        <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{/* Example code will vary per article */}</code>
                        </pre>
                    </div>
                </article>
    );
};

export default CourtDateLookupArticle;