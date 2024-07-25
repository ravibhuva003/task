import React from 'react';
import '../App.css';

const PartResults = ({ results, onAddToCart }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Part Number</th>
          <th>Manufacturer</th>
          <th>Data Provider</th>
          <th>Volume</th>
          <th>Unit Price</th>
          <th>Total Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {results.map((result, index) => (
          <tr key={index}>
            <td>{result.partNumber}</td>
            <td>{result.manufacturer}</td>
            <td>{result.dataProvider}</td>
            <td>{result.volume}</td>
            <td>{result.unitPrice}</td>
            <td>{result.totalPrice}</td>
            <td>
              <button onClick={() => onAddToCart(result)}>Add to Cart</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PartResults;
