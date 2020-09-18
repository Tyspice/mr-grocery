const { groupBy } = require('../googleSheets/webApiSheetsHandler');

exports.getAllData = async (req, res) => {
    data = await groupBy('category');
    jsonData = JSON.stringify(data);
    
    res.json(jsonData);
  
};