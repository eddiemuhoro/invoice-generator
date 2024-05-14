import  { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

import './InvoiceGenerator.css';

function InvoiceGenerator() {
  const [items, setItems] = useState([
    { name: 'Plan me', description: 'Basic plan with limited features', price: 100 },
  ]);
  const [billTo, setBillTo] = useState('');
  const [billFrom, setBillFrom] = useState('');

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', description: '', price: 0 }]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    doc.text('Invoice', 15, 20);
    doc.setFontSize(10);
  
    const billToText = `Bill To:\nName: ${billTo.name}\nEmail: ${billTo.email}\nPhone: ${billTo.phoneNumber}`;
    doc.text(billToText, 15, 30);
  
    const billFromText = `Bill From:\nName: ${billFrom.name}\nEmail: ${billFrom.email}\nPhone: ${billFrom.phoneNumber}`;
    doc.text(billFromText, 160, 30);
  
    const tableData = items.map((item) => [item.name, item.description, item.price]);
    doc.autoTable({
      head: [['Name', 'Description', 'Price']],
      body: tableData,
      startY: 50,
    });
  
    const total = calculateTotal();
    doc.text(`Total Items: ${items.length}`, 160, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Price: $${total.toFixed(2)}`, 160, doc.lastAutoTable.finalY + 20);
  
    doc.save('invoice.pdf');
  };
  
  return (
    <div className="home-container">
    <div className="invoice-container">
<div className="bill-section">
  <div className="bill-to">
    <h3>Bill To</h3>
    <div className="label">Name</div>
    <input
      type="text"
      className="input-field"
      value={billTo.name}
      onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
    />
    <div className="label">Email</div>
    <input
      type="email"
      className="input-field"
      value={billTo.email}
      onChange={(e) => setBillTo({ ...billTo, email: e.target.value })}
    />
    <div className="label">Phone Number</div>
    <input
      type="tel"
      className="input-field"
      value={billTo.phoneNumber}
      onChange={(e) => setBillTo({ ...billTo, phoneNumber: e.target.value })}
    />
  </div>
  <div className="bill-from">
    <h3>Bill From</h3>
    <div className="label">Name</div>
    <input
      type="text"
      className="input-field"
      value={billFrom.name}
      onChange={(e) => setBillFrom({ ...billFrom, name: e.target.value })}
    />
    <div className="label">Email</div>
    <input
      type="email"
      className="input-field"
      value={billFrom.email}
      onChange={(e) => setBillFrom({ ...billFrom, email: e.target.value })}
    />
    <div className="label">Phone Number</div>
    <input
      type="tel"
      className="input-field"
      value={billFrom.phoneNumber}
      onChange={(e) => setBillFrom({ ...billFrom, phoneNumber: e.target.value })}
    />
  </div>
</div>
      <div className="items-section">
        <h3>Items</h3>
        {items.map((item, index) => (
          <div key={index} className="item">
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              placeholder="Name"
            />
            <input
              type="text"
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="Description"
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
              placeholder="Price"
            />
          </div>
        ))}
        <button className="add-item-button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>
      <div className="total-section">
        <p>Total Items: {items.length}</p>
        <p>Total Price: ${calculateTotal().toFixed(2)}</p>
      </div>
      <button className="download-button" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
    </div>
  );
}

export default InvoiceGenerator;
