import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Error al subir archivo');
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Puma Chile - Plataforma de Ordenes</h1>
      </header>

      <section>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".csv, .xlsx, .xls, .pdf"
          />
          <button type="submit">Subir Orden</button>
        </form>
        <p>{message}</p>
      </section>
    </div>
  );
}