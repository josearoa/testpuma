const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.send('API de Puma Orders funcionando 🚀');
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se cargó ningún archivo.' });
  res.status(200).json({ message: 'Archivo recibido', filename: req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});