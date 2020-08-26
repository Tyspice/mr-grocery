const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const requestHandler = require('./sms/requestHandler');
const { objectifyData } = require('./googleSheets/googleSheetsHandler');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));



app.post('/sms', async (req, res) => {
  const twiml = new MessagingResponse();

  message = await requestHandler(req); 
  twiml.message(message);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/api/v2', async (req, res) => {
  data = await objectifyData();
  jsonData = await JSON.stringify(data);
  
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