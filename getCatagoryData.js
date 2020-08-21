const {
    getSheetValues,
    getRanges,
    sheets
} = require('./googleSheetsHandler.js');


// async function getCatagoryData() {
//     try {
//       newItems = [];
//       staples1 = await getSheetValues(sheets[0]);
//       staples2 = await getSheetValues(sheets[1]);
//       oneTime = await getSheetValues(sheets[2]);
//       ranges = await getRanges();
//       mergedStaples = [...staples1, ...staples2,];

//       ranges.forEach(range => {
//           newItems.push(`\n${ range.toUpperCase() }\n---------------\n`);
//           mergedItems.forEach(e =>{
//               if((e[4] === range) && ((e[1] === 'Out') || (e[1] === 'Low'))) {
//                 newItems.push(`${e[0]}*\n`);
//               } else if ((e[4] === range) && (e[1] === 'Could Get More')) {
//                 newItems.push(`${e[0]}\n`);
//               }
//           });
//       });

//       const string = newItems.join("");
//       return string;

//     } catch (error) {
//       console.log(error.message, error.stack);
//     }


//   }


async function getCatagoryData() {
    try {
        objArray = [{
            catagory: 'No Catagory Given',
            items: []
        }];
        staples1 = await getSheetValues(sheets[0]);
        staples2 = await getSheetValues(sheets[1]);
        oneTime = await getSheetValues(sheets[2]);
        ranges = await getRanges();
        mergedStaples = [...staples1, ...staples2, ];

        ranges.forEach(range => {
            objArray.push({
                catagory: range,
                items: []
            })
        });

        objArray.forEach(object => {
            mergedStaples.forEach(staple => {
                if ((object.catagory === staple[4]) && ((staple[1] === 'Out') || (staple[1] === 'Low'))) {
                    object.items.push(`${staple[0]}*`)
                } else if ((object.catagory === staple[4]) && (staple[1] === 'Could Get More')) {
                    object.items.push(staple[0])
                }
            });
            oneTime.forEach(element => {
                if (object.catagory === element[2]) {
                    object.items.push(element[1] ? `${element[0]} (${element[1]})` : element[0])
                } else if ((element[2] === null || element[2] === '') && (object.catagory === 'No Catagory Given')) {
                    object.items.push(element[1] ? `${element[0]} (${element[1]})` : element[0])
                }
            });
        });
        console.log(objArray);







        //   ranges.forEach(range => {
        //       newItems.push(`\n${ range.toUpperCase() }\n---------------\n`);
        //       mergedItems.forEach(e =>{
        //           if((e[4] === range) && ((e[1] === 'Out') || (e[1] === 'Low'))) {
        //             newItems.push(`${e[0]}*\n`);
        //           } else if ((e[4] === range) && (e[1] === 'Could Get More')) {
        //             newItems.push(`${e[0]}\n`);
        //           }
        //       });
        //   });

        //   const string = newItems.join("");
        //   return string;

    } catch (error) {
        console.log(error.message, error.stack);
    }
}
//   module.exports = getCatagoryData;
getCatagoryData();