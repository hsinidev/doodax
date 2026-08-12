import React, { useCallback } from 'react';

const budgetTemplateData = [
    { type: 'Income', category: 'Salary', planned: 5000 },
    { type: 'Income', category: 'Freelance', planned: 500 },
    { type: '', category: '---', planned: '' },
    { type: 'Savings', category: 'Emergency Fund', planned: 250 },
    { type: 'Savings', category: 'Investments', planned: 250 },
    { type: '', category: '---', planned: '' },
    { type: 'Housing', category: 'Rent/Mortgage', planned: 1500 },
    { type: 'Housing', category: 'Utilities (Electric, Water)', planned: 150 },
    { type: 'Housing', category: 'Internet', planned: 60 },
    { type: '', category: '---', planned: '' },
    { type: 'Transportation', category: 'Car Payment', planned: 300 },
    { type: 'Transportation', category: 'Gas/Fuel', planned: 150 },
    { type: 'Transportation', category: 'Insurance', planned: 100 },
    { type: '', category: '---', planned: '' },
    { type: 'Food', category: 'Groceries', planned: 400 },
    { type: 'Food', category: 'Restaurants', planned: 200 },
    { type: '', category: '---', planned: '' },
    { type: 'Personal', category: 'Health Insurance', planned: 200 },
    { type: 'Personal', category: 'Entertainment', planned: 100 },
    { type: 'Personal', category: 'Shopping', planned: 100 },
];

const BudgetPlannerTemplate: React.FC = () => {

    const generateCsvContent = () => {
        const header = 'Type,Category,Planned,Actual\n';
        const rows = budgetTemplateData.map(row => 
            `${row.type || ''},${row.category || ''},${row.planned || ''},`
        ).join('\n');
        return header + rows;
    };

    const handleDownload = useCallback(() => {
        const csvContent = generateCsvContent();
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'monthly_budget_template.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-2">Budget Planner Template</h2>
            <p className="text-center text-gray-400 mb-8">Download a simple monthly budget spreadsheet in CSV format.</p>

            <div className="bg-gray-800/50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold mb-4 text-cyan-400">Template Preview</h3>
                <div className="max-h-80 overflow-y-auto">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-gray-800">
                            <tr>
                                <th className="p-2">Type</th>
                                <th className="p-2">Category</th>
                                <th className="p-2 text-right">Planned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {budgetTemplateData.map((row, index) => (
                                <tr key={index} className="border-t border-gray-700">
                                    <td className="p-2 font-semibold text-gray-400">{row.type}</td>
                                    <td className="p-2">{row.category}</td>
                                    <td className="p-2 text-right font-mono">{row.planned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="text-center">
                <button
                    onClick={handleDownload}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg transition-all duration-300"
                >
                    Download .CSV Template
                </button>
                 <p className="text-sm text-gray-400 mt-4">The CSV file can be opened in Excel, Google Sheets, or any spreadsheet software.</p>
            </div>
        </div>
    );
};

export default BudgetPlannerTemplate;
