const {
    google
} = require('googleapis');
const googleSheets = google.sheets('v4');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
const spreadsheetId = '18erzz-8FtCqTCfeW5WHl7n2BdHO10cPi8I59rdMjSFU';
const sheets = ['House Staples', 'JKTT Staples', 'JKTT One-Time Request']

async function getAuthToken() {
    const auth = new google.auth.GoogleAuth({
        scopes: SCOPES
    });
    const authToken = await auth.getClient();
    return authToken;
}

async function getSpreadSheet({
    spreadsheetId,
    auth
}) {
    const res = await googleSheets.spreadsheets.get({
        spreadsheetId,
        auth,
    });
    return res;
}

async function getSpreadSheetValues({
    spreadsheetId,
    auth,
    sheetName
}) {
    const res = await googleSheets.spreadsheets.values.get({
        spreadsheetId,
        auth,
        range: sheetName
    });
    return res;
}

async function getSheetValues(sheetName) {
    try {
        const auth = await getAuthToken();
        const response = await getSpreadSheetValues({
            spreadsheetId,
            sheetName,
            auth
        })
        return response.data.values;
    } catch (error) {
        console.log(error.message, error.stack);
    }
}

async function getRanges() {
    try {
        data = await getSheetValues('Ranges');
        rangesSheet = data.slice(1); //removes header element from the array
        ranges = [];

        rangesSheet.forEach(e => {
            ranges.push(e[1]);
        });
        return ranges;
    } catch (error) {
        console.log(error.message, error.stack);
    }
}

module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSheetValues,
    getRanges,
    sheets
}