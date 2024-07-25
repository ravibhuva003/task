const axios = require('axios');
const CartItem = require('../models/CartItem');

const API_KEYS = {
  mouser: '82675baf-9a58-4d5a-af3f-e3bbcf486560',
  rutronik: 'cc6qyfg2yfis',
  element14: 'wb9wt295qf3g6m842896hh2u'
};

const fetchPrices = async (partNumber, volume) => {
  const results = [];

  // Fetch data from Mouser
  try {
    const mouserResponse = await axios.get(`https://api.mouser.com/api/v1/search/partnumber?apiKey=${API_KEYS.mouser}`, {
      params: {
        'SearchByPartRequest.mouserPartNumber': partNumber,
        'SearchByPartRequest.partSearchOptions': 'string'
      }
    });
    // Process Mouser response
    const mouserPrice = mouserResponse.data.price; 
    results.push({
        partNumber,
        manufacturer: mouserResponse.data.manufacturer,  
        dataProvider: 'Mouser',
        volume,
        unitPrice: mouserResponse.data.price, 
        totalPrice: mouserResponse.data.price * volume
    });
  } catch (error) {
    console.error('Error fetching Mouser data', error);
  }

  // Fetch data from Rutronik
  try {
    const rutronikResponse = await axios.get(`https://www.rutronik24.com/api/search/?apikey=${API_KEYS.rutronik}&searchterm=${partNumber}`);
    // Process Rutronik response
    const rutronikPrice = rutronikResponse.data.price; 
    results.push({
      partNumber,
      manufacturer: rutronikResponse.data.manufacturer, 
      dataProvider: 'Rutronik',
      volume,
      unitPrice: rutronikPrice,
      totalPrice: rutronikPrice * volume
    });
  } catch (error) {
    console.error('Error fetching Rutronik data', error);
  }

  // Fetch data from Element14
  try {
    const element14Response = await axios.get(`http://api.element14.com//catalog/products`, {
      params: {
        'term': `manuPartNum:${partNumber}`,
        'storeInfo.id': 'in.element14.com',
        'resultsSettings.offset': 0,
        'resultsSettings.numberOfResults': 1,
        'resultsSettings.refinements.filters': 'inStock',
        'resultsSettings.responseGroup': 'medium',
        'callInfo.omitXmlSchema': false,
        'callInfo.callback': '',
        'callInfo.responseDataFormat': 'json',
        'callInfo.apiKey': API_KEYS.element14
      }
    });
    // Process Element14 response
    const element14Price = element14Response.data.price; 
    results.push({
      partNumber,
      manufacturer: element14Response.data.manufacturer, 
      dataProvider: 'Element14',
      volume,
      unitPrice: element14Price,
      totalPrice: element14Price * volume
    });
  } catch (error) {
    console.error('Error fetching Element14 data', error);
  }

  return results.sort((a, b) => a.totalPrice - b.totalPrice);
};

const searchPart = async (req, res) => {
  const { partNumber, volume } = req.query;
  try {
    const results = await fetchPrices(partNumber, volume);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

const updateCart = async (req, res) => {
    const { partNumber, volume } = req.query;
    console.log(`Received request to update cart with partNumber: ${partNumber}, volume: ${volume}`);
    try {
      const results = await fetchPrices(partNumber, volume);
      if (results.length === 0) {
        return res.status(404).json({ message: 'No results found' });
      }
      const cheapest = results[0];
      const cartItem = new CartItem(cheapest);
      await cartItem.save();
      res.json(cartItem);
    } catch (error) {
      console.error('Error updating cart:', error);  // Log detailed error information
      res.status(500).json({ message: 'Error updating cart' });
    }
  };
  

module.exports = {
  searchPart,
  updateCart
};
