const OneTimeItem = require('../models/oneTimeItemsModel');


//Gets all one time items from the collection. does not take a request body
exports.getAllOneTimeItems = async (req, res) => {
    try {
        const oneTimeItems = await OneTimeItem.find();

        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.json(oneTimeItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/***
Creates a one time Item. request should be a JSON adhering to the schema:
{   
    item: String,
    notes: String,
    category: String,
    house: Boolean,
    staple: Boolean
}
 ***/

exports.createOneTimeItem = async (req, res) => {
    const item = new OneTimeItem({
        item: req.body.item,
        notes: req.body.notes,
        category: req.body.category,
        house: req.body.house,
        staple: false
    });
    try {
        const newItem = await item.save();
        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.status(201).json({ newItem });
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
}

/***
 * Updates a one time item. request body is a JSON object containing only
 * the key value pairs to be updated. _id key must be the same as the 
 * specific object to be updated.
 * 
 * returns success message and the updated document
 */

exports.updateOneTimeItem = async (req, res) => {
    const id = req.body._id;
    const body = req.body;

    try {
        const updatedItem = await OneTimeItem.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false });

        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
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

exports.deleteOneTimeItem = async (req, res) => {
    const id = req.body._id;
    
    try {
        const item = await OneTimeItem.findByIdAndDelete(id);
        
        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.json({ message: "Successfully Deleted", removed: item });
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}