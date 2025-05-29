import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/orders');
    setOrders(res.data);
  };

  const updateStatus = async (id, newStatus) => {
    await axios.put(`http://localhost:5000/orders/${id}`, { status: newStatus });
    fetchOrders();
  };

  const getStatusClass = (status) => {
    return `status ${status}`;
  };

  const totalOrders = orders.length;
  const approved = orders.filter(o => o.status === 'aprobado').length;
  const pending = orders.filter(o => o.status === 'pendiente').length;
  const error = orders.filter(o => o.status === 'error').length;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <span className="logo">📦 Puma Chile PO Management</span>
        <nav>
          <a href="/admin">Dashboard</a>
          <a href="/client">Cliente</a>
        </nav>
      </header>

      <section className="summary">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="card">
          <h3>Approved</h3>
          <p>{approved}</p>
        </div>
        <div className="card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
        <div className="card">
          <h3>Errors</h3>
          <p>{error}</p>
        </div>
      </section>

      <section className="validation-queue">
        <h2>Validation Queue</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Filename</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client}</td>
                <td>{order.filename}</td>
                <td>{new Date(order.uploadedAt).toLocaleDateString()}</td>
                <td><span className={getStatusClass(order.status)}>{order.status}</span></td>
                <td>
                  {order.status === 'pendiente' && (
                    <>
                      <button onClick={() => updateStatus(order.id, 'aprobado')}>Approve</button>
                      <button onClick={() => updateStatus(order.id, 'error')}>Flag as Error</button>
                    </>
                  )}
                  {order.status !== 'pendiente' && <button>View</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;