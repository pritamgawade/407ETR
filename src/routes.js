const express = require('express');
const router = express.Router();
const costCalculate = require("./costCalculate");

router.post('/calculate', costCalculate);

module.exports = router;