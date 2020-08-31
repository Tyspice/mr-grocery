const {
    google
} = require('googleapis');
const googleSheets = google.sheets('v4');
const _ = require('lodash');
const { isArrayLike } = require('lodash');

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

async function getGoogleSpreadSheet({
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

async function getSpreadSheetValues(sheetName) {
    try {
        const auth = await getAuthToken();
        const response = await getGoogleSpreadSheet({
            spreadsheetId,
            sheetName,
            auth
        })
        return response.data.values;
    } catch (error) {
        console.log(error.message, error.stack);
    }
}

async function getObjectifiedData() {
    let spreadsheet1 = await getSpreadSheetValues(sheets[0]);
    let spreadsheet2 = await getSpreadSheetValues(sheets[1]);
    let spreadsheet3 = await getSpreadSheetValues(sheets[2]);
    allSheetsArray = [...spreadsheet1.slice(1), ...spreadsheet2.slice(1), ...spreadsheet3.slice(1)];

    let objects = allSheetsArray.map((array) => {
        if(array.length === 5) {
            return {
                item: array[0],
                inventoryStatus: array[1],
                inventoryStatusUpdated: array[2],
                notes: array[3],
                category: array[4],
                staple: true
            }; 
        } else {
            return {
                item: array[0],
                notes: array[1],
                category: array[2],
                staple: false
            };
        }
        
    });
    return objects;
}

async function groupBy(field) {
    data = await getObjectifiedData();
    grouped = _.groupBy(data, field);
    return grouped;

}

async function getRanges() {
    try {
        data = await getSpreadSheetValues('Ranges');
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
    getObjectifiedData,
    getSpreadSheetValues,
    groupBy,
    getRanges 
}