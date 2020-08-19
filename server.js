const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const getParsedData = require('./getParsedData');

const app = express();

app.post('/', async (req, res) => {
  const twiml = new MessagingResponse();

  message = await getParsedData(); 
  twiml.message(message); 

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => {
    console.log(`app listening on port: ${port}`)
});