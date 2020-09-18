const StapleItem = require('../models/stapleItemsModel');
const moment = require('moment');

//Gets all staple items from the collection. does not take a request body
exports.getAllStapleItems = async (req, res) => {
    try {
        const stapleItems = await StapleItem.find();

        res.json(stapleItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/***
 * Creates a one staple item. request should be a JSON adhering to the schema:
 * {   
 *    item: String,
 *    inventoryStatus: String,
 *    updated: Date,
 *    notes: String,
 *    category: String,
 *    house: Boolean,
 *    staple: Boolean
 * }
 * Date and Staple values are automatically set and are not send in the request body
 */

exports.createStapleItem = async (req, res) => {
    const item = new StapleItem({
        item: req.body.item,
        inventoryStatus: req.body.inventoryStatus,
        updated: moment().format('l'),
        notes: req.body.notes,
        category: req.body.category,
        house: req.body.house,
        staple: true
    });
    try {
        const newItem = await item.save();

        res.status(201).json({ newItem });
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

/***
 * Updates a staple item. request body is a JSON object containing only
 * the key value pairs to be updated. _id key must be the same as the 
 * specific object to be updated.
 * 
 * returns success message and the updated document
 */

exports.updateStapleItem = async (req, res) => {
    const id = req.body._id;
    const body = { ...req.body, updated: moment().format('l') };

    try {
        const updatedItem = await StapleItem.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false });

        res.json({ message: "Successfully Updated", newItem: updatedItem });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


/**
 * Deletes item by id. req body must contain _id.
 * if successful response will return return success message and object that was deleated.
 * if document was not found body will return null. 
 */

exports.deleteStapleItem = async (req, res) => {
    const idArray = req.body;
    
    try {

        const item = await StapleItem.deleteMany({
            _id: {
                $in: idArray
            }
        });
        
        res.json({ message: "Successfully Deleted", removed: item });
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.bulkStatusUpdate = async (req, res) => {
    const toUpdateArray = req.body;

    try {
        toUpdateArray.forEach( async (object) => {
            let toUpdateObject = { ...object, updated: moment().format('l') };
            await StapleItem.findByIdAndUpdate(toUpdateObject._id, toUpdateObject, { new: true, useFindAndModify: false });
        });
        

        res.json({ message: "Successfully Updated" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}