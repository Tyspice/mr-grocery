const express = require('express');
const path = require('path');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const requestHandler = require('./sms/requestHandler');
const { groupBy } = require('./googleSheets/webApiSheetsHandler');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();

  message = await requestHandler(req); 
  twiml.message(message);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/api/v2/data', async (req, res) => {
  data = await groupBy('category');
  jsonData = JSON.stringify(data);
  
  res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
  res.json(jsonData);

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
});