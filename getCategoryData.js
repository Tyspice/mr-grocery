const {
    getSheetValues,
    getRanges,
    sheets
} = require('./googleSheetsHandler.js');

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
        // console.log(oneTime);
        return objArray;

    } catch (error) {
        console.log(error.message, error.stack);
    }
}

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