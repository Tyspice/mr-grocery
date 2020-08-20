const { getSheetValues, getRanges, sheets } = require('./googleSheetsHandler.js');


async function getCatagoryData() {
    try {
      newItems = [];
      staples1 = await getSheetValues(sheets[0]);
      staples2 = await getSheetValues(sheets[1]);
      oneTime = await getSheetValues(sheets[2]);
      ranges = await getRanges();
      mergedItems = [...staples1, ...staples2, ...oneTime];

      ranges.forEach(range => {
          newItems.push(`\n${ range.toUpperCase() }\n---------------\n`);
          mergedItems.forEach(e =>{
              if((e[4] === range) && ((e[1] === 'Out') || (e[1] === 'Low'))) {
                newItems.push(`${e[0]}*\n`);
              } else if ((e[4] === range) && (e[1] === 'Could Get More')) {
                newItems.push(`${e[0]}\n`);
              }
          });
      });

      const string = newItems.join("");
      return string;
  
    } catch (error) {
      console.log(error.message, error.stack);
    }
    
  
  }

  module.exports = getCatagoryData;