const OneTimeItems = require('../models/oneTimeItemsModel');

exports.getAllOneTimeItems = async (req, res) => {
    try {
        let oneTimeItems = await OneTimeItems.find();

        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.json(oneTimeItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}