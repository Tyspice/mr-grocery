const requestHandler = require('../sms/requestHandler');
const MessagingResponse = require('twilio').twiml.MessagingResponse;



exports.handleSmsRequest = async (req, res) => {
    const twiml = new MessagingResponse();
  
    message = await requestHandler(req); 
    twiml.message(message);
  
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
};