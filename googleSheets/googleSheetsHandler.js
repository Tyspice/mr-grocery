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

async function objectifyData() {
    try {
        objArray = [];
        staples1 = await getSheetValues(sheets[0]);
        staples2 = await getSheetValues(sheets[1]);
        oneTime = await getSheetValues(sheets[2]);
        ranges = await getRanges();
        mergedStaples = [...staples1, ...staples2, ];
        //init category range obgects
        ranges.forEach(range => {
            objArray.push({
                category: range,
                items: []
            })
        });
        //init end category
        objArray.push({
            category: 'No Category Given',
            items: []
        });

        objArray.forEach(object => {
            mergedStaples.forEach(staple => {
                if ((object.category === staple[4]) && ((staple[1] === 'Out') || (staple[1] === 'Low'))) {
                    object.items.push(`${staple[0]}*`)
                } else if ((object.category === staple[4]) && (staple[1] === 'Could Get More')) {
                    object.items.push(staple[0])
                }
            });
            oneTime.forEach(element => {
                if (object.category === element[2]) {
                    object.items.push(element[1] ? `${element[0]} (${element[1]})` : element[0])
                } else if (((element[2] === '') || (!element[2])) && (object.category === 'No Category Given')) {
                    object.items.push(element[1] ? `${element[0]} (${element[1]})` : element[0])
                }
            });
        });
        
        return objArray;

    } catch (error) {
        console.log(error.message, error.stack);
    }
}

module.exports = {
    getAuthToken,
    getSpreadSheet,
    getSheetValues,
    getRanges,
    objectifyData,
    sheets
}