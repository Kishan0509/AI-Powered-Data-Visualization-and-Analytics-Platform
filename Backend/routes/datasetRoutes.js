const express = require("express");
const multer = require("multer");
const path = require("path");
const { uploadDataset, uploadManualDataset  } = require("../controllers/datasetController");
const authMiddleware = require("../middleware/authMiddleware");
const Dataset = require("../models/Dataset");

const router = express.Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../uploads"), 
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /xlsx|xls/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            return cb(null, true);
        } else {
            cb("Error: Excel Files Only!");
        }
    }
});


router.post("/upload", authMiddleware, upload.single("excel"), uploadDataset);

router.post("/manual", authMiddleware, uploadManualDataset);

router.get("/", authMiddleware, async (req, res) => {
    try {
      const datasets = await Dataset.find({ userId: req.userId });
      res.json(datasets); 
    } catch (error) {
      console.error("Error fetching datasets:", error.message);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  

module.exports = router;
