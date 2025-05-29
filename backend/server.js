const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Ruta al archivo JSON
const ordersFile = path.join(__dirname, 'orders.json');
let orders = [];

// Cargar órdenes desde archivo
if (fs.existsSync(ordersFile)) {
  const data = fs.readFileSync(ordersFile, 'utf-8');
  orders = JSON.parse(data);
}

// Guardar órdenes al archivo
function saveOrders() {
  fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
}

// 🧪 Test básico
app.get('/', (req, res) => {
  res.send('API Puma funcionando 🚀');
});

// 📥 Cargar una nueva orden
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se cargó ningún archivo.' });

  const newOrder = {
    id: `PO-${Date.now()}`,
    client: 'Falabella', // Hardcodeado por ahora
    filename: req.file.originalname,
    uploadedAt: new Date().toISOString(),
    status: 'pendiente'
  };

  orders.push(newOrder);
  saveOrders();

  res.status(200).json({ message: 'Orden registrada', order: newOrder });
});

// 📤 Listar todas las órdenes
app.get('/orders', (req, res) => {
  res.json(orders);
});

// ✏️ Actualizar estado de una orden
app.put('/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada' });

  order.status = status;
  saveOrders();

  res.json({ message: 'Orden actualizada', order });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});