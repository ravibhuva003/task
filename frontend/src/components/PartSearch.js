import React, { useState } from 'react';
import '../App.css';

const PartSearch = ({ onSearch }) => {
  const [partNumber, setPartNumber] = useState('');
  const [volume, setVolume] = useState('');

  const handleSearch = () => {
    onSearch(partNumber, volume);
  };

  return (
    <div className="part-search">
      <input 
        type="text" 
        placeholder="Part Number" 
        value={partNumber} 
        onChange={(e) => setPartNumber(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Volume" 
        value={volume} 
        onChange={(e) => setVolume(e.target.value)} 
      />
      <button onClick={handleSearch}>Enter</button>
    </div>
  );
};

export default PartSearch;
