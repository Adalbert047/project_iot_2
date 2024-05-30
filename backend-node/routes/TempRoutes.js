const express = require('express');
const { getTemps, postTemp } = require('../controllers/TempController');
const router = express.Router();

router.post('/tempp', postTemp);
router.get('/temp', getTemps);

module.exports = router;


