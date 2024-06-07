const express = require('express');
const { getCo2s, postCo2 } = require('../controllers/Co2Controller');
const router = express.Router();

router.post('/co2p', postCo2);
router.get('/co2', getCo2s);

module.exports = router;


