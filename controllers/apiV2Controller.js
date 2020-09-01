const { groupBy } = require('../googleSheets/webApiSheetsHandler');

exports.getAllData = async (req, res) => {
    data = await groupBy('category');
    jsonData = JSON.stringify(data);
    
    res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.json(jsonData);
  
};