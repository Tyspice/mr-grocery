const {
  getAuthToken,
  getSpreadSheetValues
} = require('./googleSheetsHandler.js');

const spreadsheetId = '18erzz-8FtCqTCfeW5WHl7n2BdHO10cPi8I59rdMjSFU';
const sheets = ['House Staples', 'JKTT Staples', 'JKTT One-Time Request']

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

async function parseStaples() {
  newItems = ['\n \nNEED\n---------------\n'];
  try {
    staples1 = await getSheetValues(sheets[0]);
    staples2 = await getSheetValues(sheets[1]);
    mergedItems = [...staples1, ...staples2];

  mergedItems.forEach(e => {
    if(e[1] === 'Out' || e[1] === 'Low') {
        newItems.push(`${e[0]}\n`);
    } 
    
  });

  newItems.push('\nCOULD GET MORE\n---------------\n');

  mergedItems.forEach(e => {
    if(e[1] === 'Could Get More') {
        newItems.push(`${e[0]}\n`);
    }
  });

  return newItems;

  } catch (error) {
    console.log(error.message, error.stack);
  }
  

}

async function parseOneTime() {
  newItems = [' \nONE TIME REQUESTS\n---------------\n'];
  try {
    oneTime = await getSheetValues(sheets[2]);

    oneTime.forEach(e => {
      if (e[0] !== 'Item' && e[0]) {
        newItems.push(`${e[1] ? `${e[0]} (${e[1]})\n` : `${e[0]}\n`}`);
      }
    });
    return newItems;
  } catch (error) {
    console.log(error.message, error.stack);
  }
}

// module.exports = getParsedData;
async function getParsedData() {
  try {
    const staples = await parseStaples();
    const oneTime = await parseOneTime();
    data = [...staples, ...oneTime];
    dataString = data.join("");

    return dataString;

  } catch (error) {
    console.log(error.message, error.stack);
  }
}

module.exports = getParsedData;

