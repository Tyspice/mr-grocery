const {
    getSheetValues,
    getRanges,
    sheets
} = require('../googleSheets/googleSheetsHandler.js');

async function objectifyData() {
    try {
        objArray = [];
        staples = await getSheetValues(sheets[0]);
        ranges = await getRanges();
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
            staples.forEach(staple => {
                if ((object.category === staple[4]) && ((staple[1] === 'Out') || (staple[1] === 'Low'))) {
                    object.items.push(`${staple[0]}*`)
                } else if ((object.category === staple[4]) && (staple[1] === 'Could Get More')) {
                    object.items.push(staple[0])
                }
            });
        });
        // console.log(oneTime);
        return objArray;

    } catch (error) {
        console.log(error.message, error.stack);
    }
}

async function getStaplesOnly() {
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

module.exports = getStaplesOnly;