const express = require('express');
const { getHums, postHum } = require('../controllers/HumController');
const router = express.Router();

router.post('/hump', postHum);
router.get('/hum', getHums);

module.exports = router;


