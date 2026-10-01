const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Фейкові дані для швидкої демонстрації
const menu = [
  { id: 1, name: 'Еспресо', price: 45, isAvailable: true },
  { id: 2, name: 'Капучино', price: 65, isAvailable: true },
  { id: 3, name: 'Лате', price: 70, isAvailable: true },
  { id: 4, name: 'Чізкейк', price: 85, isAvailable: true }
];

let orders = [];

// Отримання меню
app.get('/api/menu', (req, res) => {
  res.json(menu);
});

// Створення замовлення
app.post('/api/orders', (req, res) => {
  const { customer, phone, pickupTime, items } = req.body;
  
  if (!customer || !phone || !items || items.length === 0) {
    return res.status(400).json({ error: 'Заповніть усі обов’язкові поля' });
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    id: orders.length + 1,
    customer,
    phone,
    pickupTime,
    status: 'PENDING',
    totalAmount,
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Замовлення прийнято', order: newOrder });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
