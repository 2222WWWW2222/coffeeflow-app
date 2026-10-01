import React, { useState, useEffect } from 'react';

export default function App() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then((res) => {
        if (!res.ok) throw new Error('Помилка сервера');
        return res.json();
      })
      .then((data) => setMenu(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  if (loading) return <div>☕ Завантаження меню CoffeeFlow...</div>;
  if (error) return <div>⚠️ Помилка завантаження: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>☕ Кав'ярня «CoffeeFlow»</h1>
      <h2>Меню напоїв та десертів</h2>
      <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {menu.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>{item.name}</h3>
            <p>Ціна: {item.price} грн</p>
            <button 
              onClick={() => addToCart(item)}
              style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Додати у кошик 🛒
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: '30px 0' }} />
      <h2>🛒 Ваш кошик ({cart.length})</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} — {item.price} грн</li>
        ))}
      </ul>
    </div>
  );
}
