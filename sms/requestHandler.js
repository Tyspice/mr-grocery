const getCategoryData = require('./getCategoryData.js');
const getStaplesOnly = require('./getStaplesOnly');

async function requestHandler(request) {
    if (request.body.From === '+19706890776') {
        let data = await getStaplesOnly();
        return data;
    } else {
        let data = await getCategoryData();
        return data;
    }
}

module.exports = requestHandler;