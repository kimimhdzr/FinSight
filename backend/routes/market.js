const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/market-news', marketController.getMarketNews);
router.get('/market-ticker', marketController.getStockTicker);
router.get("/historical/:symbol", marketController.getHistoricalData);

module.exports = router;
