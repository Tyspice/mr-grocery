const OneTimeItem = require('../models/oneTimeItemsModel');

exports.getAllOneTimeItems = async (req, res) => {
    try {
        const oneTimeItems = await OneTimeItem.find();

        res.set({ 'content-type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.json(oneTimeItems);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

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