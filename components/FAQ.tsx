import React from 'react';

const faqs = [
    {
        question: "Are these tools really free?",
        answer: "Yes, all tools on Doodax are 100% free to use. We believe in providing accessible utilities for developers and professionals."
    },
    {
        question: "Do I need to create an account?",
        answer: "No, you can use all tools instantly without any registration or login."
    },
    {
        question: "Is my data safe?",
        answer: "Absolutely. Most of our tools run entirely in your browser (client-side), meaning your data never leaves your device. For tools that require server processing, we do not store any of your input data."
    },
    {
        question: "Can I suggest a new tool?",
        answer: "We love feedback! If you have an idea for a tool that would help your workflow, please reach out to us."
    },
    {
        question: "Do these tools work on mobile?",
        answer: "Yes, our platform is fully responsive and optimized for mobile devices, tablets, and desktops."
    }
];

const FAQ: React.FC = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section className="py-16 bg-gray-800/30">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>

                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-500/30 transition-colors">
                            <h3 className="text-xl font-semibold text-white mb-2">{faq.question}</h3>
                            <p className="text-gray-300">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
