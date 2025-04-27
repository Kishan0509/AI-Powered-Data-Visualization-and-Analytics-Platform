const express = require('express');
const { generateInsights } = require('../controllers/insightController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/generate", authMiddleware, generateInsights);

module.exports = router;
