import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ClientView.css';

const ClientView = () => {
  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/upload', formData);
      fetchOrders();
    } catch (err) {
      console.error('Error al subir archivo');
    }
  };

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/orders');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const statusColor = {
    aprobado: 'green',
    pendiente: 'orange',
    error: 'red'
  };

  return (
    <div className="client-container">
      <header className="client-header">
        <span className="logo">🏬 Puma Chile</span>
        <span className="client-name">Falabella</span>
      </header>

      <section className="upload-section">
        <h2>Order Upload</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".csv, .xlsx, .xls, .pdf"
          />
          <button type="submit">Upload</button>
        </form>
        <p>Supported formats: Excel, CSV, PDF</p>
      </section>

      <section className="history-section">
        <h2>Order History</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{new Date(order.uploadedAt).toISOString().split('T')[0]}</td>
                <td>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </td>
                <td>
                  {order.status === 'pendiente' ? (
                    <button className="validate-btn">Validate</button>
                  ) : (
                    <button className="view-btn">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ClientView;