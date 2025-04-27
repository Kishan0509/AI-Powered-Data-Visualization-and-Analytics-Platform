const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Dataset = require('../models/Dataset');

router.get('/', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const datasetCount = await Dataset.countDocuments();
    res.json({ userCount, datasetCount });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = router;
