import React, { useState } from 'react';

declare const jspdf: any;

interface PersonalDetails { name: string; email: string; phone: string; linkedin: string; }
interface WorkExperience { id: number; title: string; company: string; dates: string; description: string; }
interface Education { id: number; degree: string; school: string; dates: string; }

const ResumeCvMaker: React.FC = () => {
    const [personal, setPersonal] = useState<PersonalDetails>({ name: 'Jane Doe', email: 'jane.doe@example.com', phone: '123-456-7890', linkedin: 'linkedin.com/in/janedoe' });
    const [summary, setSummary] = useState<string>('Highly motivated Senior Frontend Engineer with 8+ years of experience in building scalable, high-performance web applications using React and TypeScript. Proven ability to lead development teams and deliver high-quality products in agile environments.');
    const [experiences, setExperiences] = useState<WorkExperience[]>([{ id: 1, title: 'Senior Frontend Engineer', company: 'Tech Solutions Inc.', dates: 'Jan 2020 - Present', description: '- Led development of a customer dashboard, increasing engagement by 20%.\n- Mentored 4 junior developers, improving team productivity by 15%.' }]);
    const [educations, setEducations] = useState<Education[]>([{ id: 1, degree: 'B.S. in Computer Science', school: 'State University', dates: '2012 - 2016' }]);
    const [skills, setSkills] = useState<string>('React, TypeScript, Next.js, JavaScript (ES6+), HTML5, CSS3, Webpack, Node.js, Agile, Git');

    const handleDynamicChange = <T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, index: number, field: keyof T, value: string) => {
        setter(prev => {
            const items = [...prev];
            items[index] = { ...items[index], [field]: value };
            return items;
        });
    };

    const addExperience = () => setExperiences([...experiences, { id: Date.now(), title: '', company: '', dates: '', description: '' }]);
    const removeExperience = (id: number) => setExperiences(experiences.filter(exp => exp.id !== id));
    const addEducation = () => setEducations([...educations, { id: Date.now(), degree: '', school: '', dates: '' }]);
    const removeEducation = (id: number) => setEducations(educations.filter(edu => edu.id !== id));

    const generatePdf = () => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const contentWidth = pageWidth - (margin * 2);
        let y = 25;

        // Name
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(26);
        doc.text(personal.name, margin, y);
        y += 8;

        // Contact
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(`${personal.email} | ${personal.phone} | ${personal.linkedin}`, margin, y);
        y += 12;
        doc.line(margin, y, pageWidth - margin, y); // horizontal line
        y += 10;
        
        const drawSection = (title: string, content: string | string[]) => {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(title, margin, y);
            y += 7;
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            const lines = doc.splitTextToSize(content, contentWidth);
            doc.text(lines, margin, y);
            y += (Array.isArray(lines) ? lines.length : 1) * 4 + 8;
        };

        if (summary) drawSection('Summary', summary);

        if (skills) drawSection('Skills', skills);

        if (experiences.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Work Experience', margin, y);
            y += 7;
            experiences.forEach(exp => {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text(exp.title, margin, y);
                doc.setFont('helvetica', 'normal');
                doc.text(exp.dates, pageWidth - margin, y, { align: 'right' });
                y += 5;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.text(exp.company, margin, y);
                y += 6;
                doc.setFont('helvetica', 'normal');
                const descLines = doc.splitTextToSize(exp.description, contentWidth);
                doc.text(descLines, margin, y);
                y += descLines.length * 4 + 5;
            });
        }
        
        if (educations.length > 0) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('Education', margin, y);
            y += 7;
            educations.forEach(edu => {
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text(edu.degree, margin, y);
                doc.setFont('helvetica', 'normal');
                doc.text(edu.dates, pageWidth - margin, y, { align: 'right' });
                y += 5;
                doc.setFontSize(10);
                doc.setFont('helvetica', 'italic');
                doc.text(edu.school, margin, y);
                y += 8;
            });
        }
        
        doc.save('resume.pdf');
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Resume/CV Maker (PDF)</h2>
            <div className="space-y-6">
                {/* Personal Details */}
                <fieldset className="border border-gray-700 p-4 rounded-md">
                    <legend className="px-2 text-cyan-400">Personal Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={personal.name} onChange={e => setPersonal({...personal, name: e.target.value})} placeholder="Full Name" className="bg-gray-800 p-2 rounded-md"/>
                        <input value={personal.email} onChange={e => setPersonal({...personal, email: e.target.value})} placeholder="Email" className="bg-gray-800 p-2 rounded-md"/>
                        <input value={personal.phone} onChange={e => setPersonal({...personal, phone: e.target.value})} placeholder="Phone" className="bg-gray-800 p-2 rounded-md"/>
                        <input value={personal.linkedin} onChange={e => setPersonal({...personal, linkedin: e.target.value})} placeholder="LinkedIn URL" className="bg-gray-800 p-2 rounded-md"/>
                    </div>
                </fieldset>

                {/* Summary */}
                <fieldset className="border border-gray-700 p-4 rounded-md">
                    <legend className="px-2 text-cyan-400">Summary</legend>
                    <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={4} className="w-full bg-gray-800 p-2 rounded-md"/>
                </fieldset>

                {/* Work Experience */}
                <fieldset className="border border-gray-700 p-4 rounded-md">
                    <legend className="px-2 text-cyan-400">Work Experience</legend>
                    {experiences.map((exp, index) => (
                        <div key={exp.id} className="space-y-2 border-b border-gray-700 pb-4 mb-4">
                            <input value={exp.title} onChange={e => handleDynamicChange(setExperiences, index, 'title', e.target.value)} placeholder="Job Title" className="w-full bg-gray-800 p-2 rounded-md"/>
                            <div className="flex gap-2">
                                <input value={exp.company} onChange={e => handleDynamicChange(setExperiences, index, 'company', e.target.value)} placeholder="Company" className="flex-grow bg-gray-800 p-2 rounded-md"/>
                                <input value={exp.dates} onChange={e => handleDynamicChange(setExperiences, index, 'dates', e.target.value)} placeholder="Dates (e.g., Jan 2020 - Present)" className="w-1/3 bg-gray-800 p-2 rounded-md"/>
                            </div>
                            <textarea value={exp.description} onChange={e => handleDynamicChange(setExperiences, index, 'description', e.target.value)} rows={3} placeholder="Key responsibilities and achievements..." className="w-full bg-gray-800 p-2 rounded-md"/>
                            <button onClick={() => removeExperience(exp.id)} className="text-red-400 text-sm">Remove</button>
                        </div>
                    ))}
                    <button onClick={addExperience} className="mt-2 text-cyan-400">+ Add Experience</button>
                </fieldset>
                
                {/* Education & Skills */}
                 <fieldset className="border border-gray-700 p-4 rounded-md">
                    <legend className="px-2 text-cyan-400">Education</legend>
                    {educations.map((edu, index) => (
                        <div key={edu.id} className="space-y-2 border-b border-gray-700 pb-4 mb-4">
                            <input value={edu.degree} onChange={e => handleDynamicChange(setEducations, index, 'degree', e.target.value)} placeholder="Degree" className="w-full bg-gray-800 p-2 rounded-md"/>
                             <div className="flex gap-2">
                                <input value={edu.school} onChange={e => handleDynamicChange(setEducations, index, 'school', e.target.value)} placeholder="School/University" className="flex-grow bg-gray-800 p-2 rounded-md"/>
                                <input value={edu.dates} onChange={e => handleDynamicChange(setEducations, index, 'dates', e.target.value)} placeholder="Dates" className="w-1/3 bg-gray-800 p-2 rounded-md"/>
                            </div>
                            <button onClick={() => removeEducation(edu.id)} className="text-red-400 text-sm">Remove</button>
                        </div>
                    ))}
                    <button onClick={addEducation} className="mt-2 text-cyan-400">+ Add Education</button>
                </fieldset>
                <fieldset className="border border-gray-700 p-4 rounded-md">
                    <legend className="px-2 text-cyan-400">Skills</legend>
                    <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Comma-separated skills..." className="w-full bg-gray-800 p-2 rounded-md"/>
                </fieldset>
                
                <div className="text-center pt-4">
                    <button onClick={generatePdf} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg">Generate PDF Resume</button>
                </div>
            </div>
        </div>
    );
};

export default ResumeCvMaker;
