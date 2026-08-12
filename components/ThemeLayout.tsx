
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { tools, Tool, Category } from '../utils/ToolDefinitions.ts';

interface ThemeLayoutProps {
    children: React.ReactNode;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: Category | 'All';
    setSelectedCategory: (category: Category | 'All') => void;
    currentToolName?: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 animate-fade-in-fast"
            onClick={onClose}
        >
            <div
                className="bg-gray-800 text-white rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative border border-gray-700 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-6 pb-4 border-b border-gray-600">
                    <h2 className="text-2xl font-bold text-cyan-400">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                </header>
                <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

// Simple seeded random number generator
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const stringToSeed = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

const NebulaBackground: React.FC<{ seedString?: string }> = ({ seedString }) => {
    // Use a fixed seed if no string is provided (e.g., home page)
    const baseSeed = seedString ? stringToSeed(seedString) : 12345;

    // Helper to get random number between min and max using the seed
    const getRandom = (min: number, max: number, offset: number) => {
        return seededRandom(baseSeed + offset) * (max - min) + min;
    };

    // Generate colors based on seed
    const getHslColor = (offset: number) => {
        const hue = Math.floor(getRandom(0, 360, offset));
        const sat = Math.floor(getRandom(50, 90, offset + 1));
        const light = Math.floor(getRandom(40, 60, offset + 2));
        return `hsla(${hue}, ${sat}%, ${light}%, 0.4)`; // Reduced opacity for background blending
    };

    // Pre-calculate values to avoid re-render jitter (though useMemo would be better if this component re-renders often)
    const nebula1Color = seedString ? getHslColor(10) : 'rgba(124, 58, 237, 0.5)'; // Default purple
    const nebula2Color = seedString ? getHslColor(20) : 'rgba(14, 165, 233, 0.4)'; // Default blue
    const nebula3Color = seedString ? getHslColor(30) : 'rgba(236, 72, 153, 0.4)'; // Default pink

    // Generate star positions deterministically
    const stars = useMemo(() => {
        return Array.from({ length: 150 }).map((_, i) => {
            const size = seededRandom(baseSeed + i * 10) * 2 + 1;
            const duration = seededRandom(baseSeed + i * 20) * 3 + 2;
            const delay = seededRandom(baseSeed + i * 30) * -5;
            const left = seededRandom(baseSeed + i * 40) * 100;
            const top = seededRandom(baseSeed + i * 50) * 100;
            const opacity = seededRandom(baseSeed + i * 60) * 0.8 + 0.2;

            return { size, duration, delay, left, top, opacity };
        });
    }, [baseSeed]);

    return (
        <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none overflow-hidden bg-[#0a0a1a]">
            {/* Deep Space Base with more color */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1a3a] to-[#2d1b4e] opacity-90"></div>

            {/* Vibrant Nebula Clouds - Procedurally Colored */}
            <div className="absolute inset-0 opacity-70 mix-blend-screen animate-nebula-flow-1" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, ${nebula1Color}, transparent 60%)`,
                filter: 'blur(50px)',
            }}></div>
            <div className="absolute inset-0 opacity-60 mix-blend-screen animate-nebula-flow-2" style={{
                backgroundImage: `radial-gradient(circle at 80% 20%, ${nebula2Color}, transparent 50%)`,
                filter: 'blur(40px)',
            }}></div>
            <div className="absolute inset-0 opacity-50 mix-blend-screen animate-nebula-flow-3" style={{
                backgroundImage: `radial-gradient(circle at 20% 80%, ${nebula3Color}, transparent 50%)`,
                filter: 'blur(60px)',
            }}></div>

            {/* Extra Glow Layer */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1), transparent 70%)',
            }}></div>

            {/* Stars with varied opacity */}
            {stars.map((star, i) => (
                <div
                    key={`star-${i}`}
                    className="absolute bg-white rounded-full animate-twinkle"
                    style={{
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        opacity: star.opacity,
                        animationDuration: `${star.duration}s`,
                        animationDelay: `${star.delay}s`,
                    }}
                />
            ))}
            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); box-shadow: 0 0 4px rgba(255, 255, 255, 0.8); }
                }
                @keyframes nebula-flow-1 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(20px, -30px) scale(1.1); }
                    66% { transform: translate(-15px, 15px) scale(0.95); }
                }
                @keyframes nebula-flow-2 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(-25px, 30px) scale(1.1); }
                    66% { transform: translate(15px, -20px) scale(0.9); }
                }
                 @keyframes nebula-flow-3 {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(30px, 30px) scale(1.15); }
                }

                @keyframes fade-in-fast {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes subtle-glow-shadow {
                    0%, 100% { text-shadow: 0 0 8px rgba(6, 182, 212, 0.4); }
                    50% { text-shadow: 0 0 16px rgba(6, 182, 212, 0.6); }
                }
                @keyframes subtle-glow-filter {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(6, 182, 212, 0.6)); }
                    50% { filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.9)); }
                }

                .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out forwards; }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
                .text-glow { animation: subtle-glow-shadow 4s ease-in-out infinite; }
                .animate-glow-filter { animation: subtle-glow-filter 4s ease-in-out infinite; }
            `}</style>
        </div>
    );
};

const SearchResults: React.FC<{ query: string; onResultClick: () => void }> = ({ query, onResultClick }) => {
    const filteredTools = useMemo(() => {
        if (!query) return [];
        const lowercasedQuery = query.toLowerCase();
        return tools
            .filter(tool =>
                tool.name.toLowerCase().includes(lowercasedQuery) ||
                tool.role.toLowerCase().includes(lowercasedQuery)
            )
            .slice(0, 7); // Limit results
    }, [query]);

    if (filteredTools.length === 0) {
        return (
            <div className="p-4 text-gray-400">No results found.</div>
        );
    }

    // Client-side navigation handler
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
        onResultClick(); // Close the search dropdown
    };

    const handleResultClick = (tool: Tool) => {
        const element = document.getElementById(tool.fileName);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add a temporary highlight effect
            element.classList.add('ring-2', 'ring-cyan-400', 'transition-all', 'duration-300');
            setTimeout(() => {
                element.classList.remove('ring-2', 'ring-cyan-400');
            }, 2000);
        }
        onResultClick();
    };

    return (
        <ul className="space-y-1 p-2">
            {filteredTools.map(tool => (
                <li key={tool.fileName}>
                    <a
                        href={`/tool/${tool.fileName}`}
                        onClick={(e) => handleNav(e, `/tool/${tool.fileName}`)}
                        className="w-full text-left flex items-center space-x-4 p-3 hover:bg-cyan-500/10 rounded-md transition-colors"
                    >
                        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-md" dangerouslySetInnerHTML={{ __html: tool.icon }} />
                        <div>
                            <p className="font-semibold text-white">{tool.name}</p>
                            <p className="text-xs text-gray-400">{tool.category}</p>
                        </div>
                    </a>
                </li>
            ))}
        </ul>
    );
};


const ThemeLayout: React.FC<ThemeLayoutProps> = ({ children, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, currentToolName }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const openModal = useCallback((modalName: string) => {
        setActiveModal(modalName);
    }, []);

    const closeModal = useCallback(() => {
        setActiveModal(null);
    }, []);

    const categoryOrder: Category[] = [
        'Web Dev',
        'AI & Content',
        'Image & Video',
        'Finance & Calculators',
        'Time & Date',
        'Reading & Writing',
        'Business & Productivity',
        'Legal & Public Services',
        'Utilities'
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Generic navigation handler for client-side routing
    const handleNav = (e: React.MouseEvent<HTMLAnchorElement> | null, href: string) => {
        if (e) e.preventDefault();
        window.history.pushState({}, '', href);
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    const navItems = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA', 'Blog'];

    return (
        <div className="relative min-h-screen font-sans">
            <NebulaBackground seedString={currentToolName} />

            <div className="relative z-10 flex flex-col min-h-screen">
                <header className="bg-gray-900/70 backdrop-blur-md sticky top-0 z-30 border-b border-gray-700/80">
                    <nav className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
                        <a href="/" onClick={(e) => handleNav(e, '/')} className="text-2xl font-bold tracking-wider text-white flex-shrink-0">
                            <span className="text-cyan-400">D</span>OODAX
                        </a>

                        {/* Category Filter */}
                        <div className="relative flex-shrink-0">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
                                className="bg-gray-800/50 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                aria-label="Filter by category"
                            >
                                <option value="All">All Categories</option>
                                {categoryOrder.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </nav>
                </header>

                <div className="flex-grow">
                    {children}
                </div>

                <footer className="bg-black bg-opacity-30 mt-16 py-8 border-t border-gray-700">
                    <div className="container mx-auto px-4 text-center text-gray-400">
                        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-4">
                            {navItems.map(item => (
                                <button key={item} onClick={() => openModal(item)} className="text-sm text-gray-400 hover:text-white transition-colors">
                                    {item}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm">&copy; {new Date().getFullYear()} Doodax. All rights reserved.</p>
                        <p className="text-sm mt-2">
                            Powered by <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" style={{ color: '#FFD700' }} className="font-bold hover:underline">HSINI MOHAMED</a>
                        </p>
                    </div>
                </footer>
            </div>

            <Modal isOpen={activeModal === 'About'} onClose={closeModal} title="About Doodax">
                <h3>Our Mission</h3>
                <p>Doodax is a forward-thinking digital platform designed to provide a comprehensive suite of 100 free online tools. Our mission is to empower developers, creators, students, and professionals by offering high-quality, accessible utilities that streamline workflows, enhance productivity, and spark creativity. We believe that powerful tools should be available to everyone, without friction or cost.</p>

                <h3>Who We Are For</h3>
                <p>This portal is a digital toolbox for anyone who builds, creates, or calculates. Our diverse range of tools spans multiple categories, including:</p>
                <ul>
                    <li><strong>Web Developers:</strong> With tools for formatting, minifying, analyzing, and generating code and assets.</li>
                    <li><strong>Content Creators:</strong> Leveraging AI to brainstorm ideas, write captions, and optimize headlines.</li>
                    <li><strong>Financial Planners:</strong> A suite of calculators for everything from mortgage amortization to investment returns.</li>
                    <li><strong>Everyday Users:</strong> Simple utilities for converting units, checking time zones, or generating a QR code.</li>
                </ul>

                <h3>Our Technology</h3>
                <p>Built on a foundation of robust, scalable, component-based architecture, Doodax is a testament to modern full-stack development principles. We leverage cutting-edge technologies like React, TypeScript, and Tailwind CSS to deliver a seamless and performant user experience. A primary focus is on client-side processing, meaning that for most tools, your data never leaves your browser, ensuring maximum speed and privacy.</p>
            </Modal>
            <Modal isOpen={activeModal === 'Contact'} onClose={closeModal} title="Contact Us">
                <p>We welcome your feedback, questions, and suggestions. Please direct your inquiries to the appropriate email address below to ensure a prompt response from our team.</p>

                <h3>General Inquiries & Feedback</h3>
                <p>For general questions about Doodax or to provide feedback on our tools, please email us at:</p>
                <p><strong><a href="mailto:contact@doodax.com" className="text-cyan-400 hover:underline">contact@doodax.com</a></strong></p>

                <h3>Bug Reports & Technical Support</h3>
                <p>If you've encountered a bug or are experiencing technical difficulties with one of our tools, please let us know. Include a description of the issue, the tool you were using, and your browser type if possible.</p>
                <p><strong><a href="mailto:support@doodax.com" className="text-cyan-400 hover:underline">support@doodax.com</a></strong></p>

                <h3>Media & Press Inquiries</h3>
                <p>For all media-related questions, please contact our communications team.</p>
                <p><strong><a href="mailto:press@doodax.com" className="text-cyan-400 hover:underline">press@doodax.com</a></strong></p>

                <p className="mt-4">We typically respond within 24-48 business hours. Thank you for using Doodax!</p>
            </Modal>
            <Modal isOpen={activeModal === 'Guide'} onClose={closeModal} title="User Guide">
                <p>Welcome to the Doodax portal! Here’s how to get the most out of our suite of 100+ free tools.</p>

                <h3>Finding a Tool</h3>
                <p>There are two primary ways to find the tool you need:</p>
                <ol>
                    <li><strong>Smart Search Bar:</strong> Located in the header, the search bar allows you to find tools by name or function. As you type, a dropdown will show the most relevant results. Click a tool to instantly scroll to it.</li>
                    <li><strong>Category Filter:</strong> Use the category dropdown in the header to filter the grid and view only the tools relevant to a specific domain, like "Web Dev" or "Finance & Calculators".</li>
                </ol>

                <h3>Using a Tool</h3>
                <p>Each tool is designed to be simple and intuitive. Just click on a tool card from the main grid to navigate to its dedicated page. All functionalities are self-contained on that page. No sign-up is required for any tool, ensuring immediate access.</p>

                <h3>Privacy and Security</h3>
                <p>Your privacy is a top priority. The vast majority of our tools operate entirely on the client-side. This means that any data you input (like text for a converter, or an image for a resizer) is processed directly in your browser. It is never sent to our servers, ensuring your information remains completely private.</p>
                <p>For the few tools that require server interaction (like the Link Broken Checker), we only send the necessary information to perform the task and do not store it long-term.</p>
            </Modal>
            <Modal isOpen={activeModal === 'Privacy Policy'} onClose={closeModal} title="Privacy Policy">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <h3>1. Introduction</h3>
                <p>Welcome to Doodax. We are committed to protecting your privacy. This Privacy Policy explains our practices regarding the collection, use, and disclosure of information on our website. Our core principle is to collect as little information as possible while providing a high-quality service.</p>

                <h3>2. Information We Do Not Collect</h3>
                <p>For the vast majority of our tools, we do not collect, process, or store any personal data you input. All processing for tools such as text converters, image editors, calculators, and generators is performed on the client-side (directly in your browser). Your data never reaches our servers.</p>

                <h3>3. Information We Collect</h3>
                <ul>
                    <li><strong>Server-Side Tool Data:</strong> For a small number of tools that require server interaction (e.g., "Link Broken Checker," "URL Redirect Tester"), the URL you provide is sent to our server to perform the request. This data is used only to carry out the function and is not stored or associated with you.</li>
                    <li><strong>API Keys:</strong> For tools that integrate with third-party APIs (e.g., "AI tools," "Stock Photo Finder"), you may be required to enter an API key. These keys are stored exclusively in your browser's `localStorage`. They are never sent to our servers and are only used by your browser to make direct requests to the third-party API.</li>
                    <li><strong>Analytics:</strong> We may collect anonymous usage data to understand how our site is used and to improve our services. This data is aggregated and cannot be used to identify you personally.</li>
                </ul>

                <h3>4. Use of Cookies and Local Storage</h3>
                <p>We use `localStorage` to store user preferences and API keys as described above. We do not use cookies for tracking purposes.</p>

                <h3>5. Third-Party Services</h3>
                <p>Some of our tools may rely on third-party APIs (e.g., Google Gemini). Your use of these tools is subject to the privacy policies of those third parties. We are not responsible for the privacy practices of other services.</p>

                <h3>6. Changes to This Privacy Policy</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

                <h3>7. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@doodax.com" className="text-cyan-400">privacy@doodax.com</a>.</p>
            </Modal>
            <Modal isOpen={activeModal === 'Terms of Service'} onClose={closeModal} title="Terms of Service">
                <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By accessing and using the Doodax website and its tools (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.</p>

                <h3>2. Description of Service</h3>
                <p>Doodax provides a collection of free online tools for general use. You understand and agree that the Service is provided "AS IS" and that we assume no responsibility for the timeliness, deletion, or failure to store any user data or personalization settings.</p>

                <h3>3. User Conduct</h3>
                <p>You agree not to use the Service to: (a) upload, post, or transmit any content that is unlawful, harmful, or abusive; (b) interfere with or disrupt the Service or servers or networks connected to the Service.</p>

                <h3>4. Disclaimer of Warranties</h3>
                <p>The tools are provided "as is" without warranty of any kind, express or implied. We do not guarantee the accuracy, reliability, or completeness of any information or results provided by the tools. Your use of the Service is at your sole risk.</p>

                <h3>5. Limitation of Liability</h3>
                <p>In no event shall Doodax or its owners be liable for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use the Service or any of its tools. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.</p>

                <h3>6. Legal Advice Disclaimer</h3>
                <p>Tools related to legal or financial document generation (e.g., "Simple NDA Generator," "Simple Will Template") are for informational and educational purposes only. They are not a substitute for professional legal or financial advice. You must consult with a qualified professional for your specific needs.</p>

                <h3>7. Changes to Terms</h3>
                <p>We reserve the right to modify these Terms at any time. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>
            </Modal>
            <Modal isOpen={activeModal === 'DMCA'} onClose={closeModal} title="DMCA Policy">
                <h3>Digital Millennium Copyright Act (DMCA) Notice</h3>
                <p>Doodax respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998, we will respond expeditiously to claims of copyright infringement committed using the Doodax service that are reported to our Designated Copyright Agent.</p>

                <h3>Notification of Infringement</h3>
                <p>If you are a copyright owner, or are authorized to act on behalf of one, please report alleged copyright infringements by sending a notice containing the following information to our agent:</p>
                <ol>
                    <li>A physical or electronic signature of a person authorized to act on behalf of the owner of the copyright that has been allegedly infringed.</li>
                    <li>Identification of the copyrighted works or materials being infringed.</li>
                    <li>Identification of the material that is claimed to be infringing, including information regarding the location of the infringing materials that the copyright owner seeks to have removed, with sufficient detail so that we are capable of finding and verifying its existence.</li>
                    <li>Your contact information, including address, telephone number, and, if available, email address.</li>
                    <li>A statement that you have a good faith belief that the material is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement made under penalty of perjury that the information provided is a accurate and the notifying party is authorized to make the complaint on behalf of the copyright owner.</li>
                </ol>

                <h3>Designated Copyright Agent</h3>
                <p>Please deliver this notice, with all items completed, to Doodax's Designated Copyright Agent:</p>
                <p><strong>Email:</strong> <a href="mailto:dmca@doodax.com" className="text-cyan-400 hover:underline">dmca@doodax.com</a> (Subject: "DMCA Notice")</p>

                <p className="mt-4">Upon receipt of a proper notice, we will take whatever action, in our sole discretion, we deem appropriate, including removal of the challenged material from the site.</p>
            </Modal>

        </div>
    );
};

export default ThemeLayout;