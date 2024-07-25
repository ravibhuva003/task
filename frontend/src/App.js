import React, { useState } from 'react';
import PartSearch from './components/PartSearch';
import PartResults from './components/PartResults';
import CartSidebar from './components/CartSidebar';
import axios from 'axios';
import './App.css';

const App = () => {
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState(null);

  const handleSearch = async (partNumber, volume) => {
    const response = await axios.get(`http://localhost:5000/api/parts/search`, {
      params: { partNumber, volume }
    });
    setResults(response.data);
  };

  const handleAddToCart = async (item) => {
    const response = await axios.get(`http://localhost:5000/api/parts/updateVolume`, {
      params: { partNumber: item.partNumber, volume: item.volume }
    });
    setCart(response.data);
  };

  const handleUpdateVolume = async (partNumber, volume) => {
    const response = await axios.get(`http://localhost:5000/api/parts/updateVolume`, {
      params: { partNumber, volume }
    });
    setCart(response.data);
  };

  return (
    <div className="container">
      <header>
        Part Search Application
      </header>
      <PartSearch onSearch={handleSearch} />
      <PartResults results={results} onAddToCart={handleAddToCart} />
      {cart && <CartSidebar cart={cart} onUpdateVolume={handleUpdateVolume} />}
    </div>
  );
};

export default App;
