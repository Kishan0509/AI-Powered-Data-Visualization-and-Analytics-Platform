const XLSX = require('xlsx');

const parseExcel = (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.sheets(workbook.SheetNames[0]);
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
};

module.exports = parseExcel;