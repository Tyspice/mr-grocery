const { getSmsDataStaples } = require('../googleSheets/smsSheetsHandler.js');

async function getParsedSmsStringStaples() {
    try {
        data = await getSmsDataStaples();
        parsedArray = [];

        data.forEach(object => {
            if (object.items.length !== 0) {
                parsedArray.push(`\n${ object.category.toUpperCase() }\n---------------\n`)
                object.items.forEach(item => {
                    parsedArray.push(`${item}\n`)
                })
            }

        });
        parsedString = parsedArray.join("");
        return parsedString;

    } catch (error) {
        console.log(error.message, error.stack);
    }
}

module.exports = getParsedSmsStringStaples;