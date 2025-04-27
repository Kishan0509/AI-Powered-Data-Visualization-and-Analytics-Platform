const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const Dataset = require("../models/Dataset");

exports.uploadDataset = async (req, res) => {
  try {
    console.log("Received file:", req.file);
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const parsedData = XLSX.utils.sheet_to_json(sheet);

    console.log("Parsed Data:", parsedData); 
    fs.unlinkSync(filePath);

    const newDataset = await Dataset.create({
      datasetName: req.file.originalname,
      userId: req.userId,
      data: parsedData, 
    });

    res.json({ message: 'File parsed and saved successfully', data: parsedData });
  } catch (error) {
    console.error('Upload Error:', error.message);
    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.uploadManualDataset = async (req, res) => {
  try {
      const { data } = req.body;
      if (!data || !Array.isArray(data)) {
          return res.status(400).json({ message: "Invalid data format" });
      }

      const newDataset = await Dataset.create({
          datasetName: "Manual Entry",
          userId: req.userId,
          data: data
      });

      res.json({ message: "Manual data saved successfully", data });
  } catch (error) {
      console.error("Manual Upload Error:", error.message);
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};
