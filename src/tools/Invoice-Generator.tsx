import React, { useState, useMemo } from 'react';

declare const jspdf: any;

interface LineItem {
    id: number;
    description: string;
    quantity: number;
    price: number;
}

const InvoiceGenerator: React.FC = () => {
    const [fromAddress, setFromAddress] = useState('Your Company\n123 Main St\nAnytown, USA 12345');
    const [toAddress, setToAddress] = useState('Client Company\n456 Oak Ave\nOtherville, USA 54321');
    const [invoiceNumber, setInvoiceNumber] = useState(1001);
    const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    const [lineItems, setLineItems] = useState<LineItem[]>([{ id: 1, description: 'Website Development', quantity: 40, price: 75 }]);
    const [taxRate, setTaxRate] = useState(0);
    const [notes, setNotes] = useState('Thank you for your business!');

    const { subtotal, tax, total } = useMemo(() => {
        const sub = lineItems.reduce((acc, item) => acc + (item.quantity * item.price), 0);
        const taxAmount = sub * (taxRate / 100);
        return { subtotal: sub, tax: taxAmount, total: sub + taxAmount };
    }, [lineItems, taxRate]);

    const handleItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string | number) => {
        setLineItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const addItem = () => setLineItems([...lineItems, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
    const removeItem = (id: number) => setLineItems(lineItems.filter(item => item.id !== id));

    const generatePdf = () => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        const margin = 20;
        const y_start = 30;
        let y = y_start;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('INVOICE', margin, y);
        y += 15;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(fromAddress, margin, y);
        doc.text(toAddress, margin + 100, y);
        y += 25;

        doc.text(`Invoice #: ${invoiceNumber}`, margin, y);
        doc.text(`Date: ${invoiceDate}`, margin + 100, y);
        y += 7;
        doc.text(`Due Date: ${dueDate}`, margin + 100, y);
        y += 15;

        // Table Header
        doc.setFillColor(230, 230, 230);
        doc.rect(margin, y, 170, 8, 'F');
        doc.setFont('helvetica', 'bold');
        doc.text('Description', margin + 2, y + 6);
        doc.text('Qty', margin + 110, y + 6);
        doc.text('Price', margin + 130, y + 6);
        doc.text('Total', margin + 155, y + 6);
        y += 8;

        // Table Body
        doc.setFont('helvetica', 'normal');
        lineItems.forEach(item => {
            const descriptionLines = doc.splitTextToSize(item.description, 100);
            doc.text(descriptionLines, margin + 2, y + 6);
            doc.text(item.quantity.toString(), margin + 110, y + 6);
            doc.text(`$${item.price.toFixed(2)}`, margin + 130, y + 6);
            doc.text(`$${(item.quantity * item.price).toFixed(2)}`, margin + 155, y + 6);
            y += (descriptionLines.length * 4) + 4;
        });

        // Totals
        y += 10;
        doc.text(`Subtotal: $${subtotal.toFixed(2)}`, margin + 120, y);
        y += 7;
        doc.text(`Tax (${taxRate}%): $${tax.toFixed(2)}`, margin + 120, y);
        y += 7;
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: $${total.toFixed(2)}`, margin + 120, y);
        y += 15;
        
        // Notes
        doc.setFont('helvetica', 'normal');
        doc.text('Notes:', margin, y);
        y += 5;
        const noteLines = doc.splitTextToSize(notes, 170);
        doc.text(noteLines, margin, y);

        doc.save(`invoice-${invoiceNumber}.pdf`);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Invoice Generator (PDF)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <textarea value={fromAddress} onChange={e => setFromAddress(e.target.value)} rows={3} placeholder="Your Address" className="w-full bg-gray-800 p-2 rounded-md mb-4"/>
                    <textarea value={toAddress} onChange={e => setToAddress(e.target.value)} rows={3} placeholder="Client Address" className="w-full bg-gray-800 p-2 rounded-md"/>
                </div>
                <div className="space-y-2">
                    <input type="number" value={invoiceNumber} onChange={e => setInvoiceNumber(parseInt(e.target.value))} placeholder="Invoice #" className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="w-full bg-gray-800 p-2 rounded-md"/>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="w-full bg-gray-800 p-2 rounded-md"/>
                </div>
            </div>
            
            <div className="mt-6">
                {lineItems.map((item, index) => (
                    <div key={item.id} className="flex gap-2 mb-2 items-center">
                        <input value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} placeholder="Description" className="flex-grow bg-gray-800 p-2 rounded-md"/>
                        <input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))} className="w-20 bg-gray-800 p-2 rounded-md"/>
                        <input type="number" value={item.price} onChange={e => handleItemChange(item.id, 'price', parseFloat(e.target.value))} className="w-24 bg-gray-800 p-2 rounded-md"/>
                        <p className="w-24 text-right">${(item.quantity * item.price).toFixed(2)}</p>
                        <button onClick={() => removeItem(item.id)} className="text-red-400">X</button>
                    </div>
                ))}
                <button onClick={addItem} className="text-cyan-400">+ Add Item</button>
            </div>
            
             <div className="mt-6 flex justify-end items-center gap-4">
                <input type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value))} placeholder="Tax Rate %" className="w-28 bg-gray-800 p-2 rounded-md"/>
                <div className="text-right">
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <p className="font-bold text-xl">Total: ${total.toFixed(2)}</p>
                </div>
            </div>

             <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Notes" className="w-full bg-gray-800 p-2 rounded-md mt-6"/>

            <div className="text-center pt-6">
                <button onClick={generatePdf} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-md text-lg">Generate PDF Invoice</button>
            </div>
        </div>
    );
};

export default InvoiceGenerator;
