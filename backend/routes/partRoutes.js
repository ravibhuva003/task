const express = require('express');
const { searchPart, updateCart } = require('../controllers/partController');

const router = express.Router();

router.get('/search', searchPart);
router.get('/updateVolume', updateCart);

module.exports = router;
