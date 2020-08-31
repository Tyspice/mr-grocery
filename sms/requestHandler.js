const getParsedSmsStringAll = require('./getParsedSmsStringAll');
const getParsedSmsStringStaples = require('./getParsedSmsStringStaples');

async function requestHandler(request) {
    if (request.body.From === '+19706890776') {
        let data = await getParsedSmsStringStaples();
        return data;
    } else {
        let data = await getParsedSmsStringAll();
        return data;
    }
}

module.exports = requestHandler;