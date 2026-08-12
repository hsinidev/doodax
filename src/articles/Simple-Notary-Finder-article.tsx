import React from 'react';

const SimpleNotaryFinderArticle: React.FC = () => {
    return (
        <article className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-emerald-400">
            <h2>What is a Notary Public and How Does a Notary Finder Work?</h2>
            <p>
                A Notary Public is a public official appointed by a state government to witness the signing of important documents and administer oaths. The primary role of a notary is to serve as an impartial witness to deter fraud and ensure that the signers of documents are who they claim to be. Many legal documents, such as property deeds, affidavits, and powers of attorney, require a notary's signature and seal to be legally binding.
            </p>

            <h3>The Role of a Notary</h3>
            <p>
                When you visit a notary, they will:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Verify Identity:</strong> The notary will ask for a valid, government-issued photo ID to verify that you are the person you claim to be.</li>
                <li><strong>Ensure Willingness and Awareness:</strong> They will confirm that you are signing the document voluntarily and that you understand what you are signing.</li>
                <li><strong>Administer Oaths:</strong> If the document requires you to swear an oath, the notary will administer it.</li>
                <li><strong>Witness the Signature:</strong> You must sign the document in the physical presence of the notary.</li>
                <li><strong>Complete the Notarial Certificate:</strong> The notary will then complete the notarial certificate on the document, which includes their signature, seal, and the date.</li>
            </ul>

            <h3>How a Notary Finder Uses the Geolocation API</h3>
            <p>
                A digital notary finder uses your device's location to suggest nearby services. This is made possible by the browser's **Geolocation API**.
            </p>
            <p>
                When you click the "Find Notaries Near Me" button, the web application makes a call to <code>navigator.geolocation.getCurrentPosition()</code>. Your browser will then prompt you for permission to share your location. If you grant permission, the browser uses a combination of GPS (if available), Wi-Fi network data, and cell tower information to determine your latitude and longitude.
            </p>
            <p>
                Once the application has your coordinates, it would (in a real-world scenario) send them to a backend server. That server would then query a business directory database or a specialized API to find a list of registered notaries near those coordinates and send the list back to be displayed on a map. This tool simulates that process by simply marking your current location.
            </p>
        </article>
    );
};

export default SimpleNotaryFinderArticle;