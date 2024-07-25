// src/components/CartSidebar.js

import React, { useState, useEffect } from 'react';
import '../App.css';

const CartSidebar = ({ cart, onUpdateVolume }) => {
  const [newVolume, setNewVolume] = useState(cart.volume);

  useEffect(() => {
    setNewVolume(cart.volume);
  }, [cart]);

  const handleVolumeChange = (e) => {
    setNewVolume(e.target.value);
    onUpdateVolume(cart.partNumber, e.target.value);
  };

  return (
    <div className="cart-sidebar">
      <h2>My Cart</h2>
      <div>
        <p>Part Number: {cart.partNumber}</p>
        <p>Manufacturer: {cart.manufacturer}</p>
        <p>Data Provider: {cart.dataProvider}</p>
        <p>
          Volume: <input type="number" value={newVolume} onChange={handleVolumeChange} />
        </p>
        <p>Unit Price: {cart.unitPrice}</p>
        <p>Total Price: {cart.totalPrice}</p>
      </div>
    </div>
  );
};

export default CartSidebar;
