const { objectifyData } = require('../googleSheets/googleSheetsHandler.js');



async function getCategoryData() {
    try {
        data = await objectifyData();
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

module.exports = getCategoryData;