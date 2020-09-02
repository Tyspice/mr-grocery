const StapleItem = require('../models/stapleItemsModel');

exports.getAllStaples = async (req, res) => {
    try {
        let staples = await StapleItem.find();

        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.json(staples);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}