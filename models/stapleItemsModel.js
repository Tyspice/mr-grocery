const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StapleItemsSchema = new Schema({
    item: String,
    inventoryStatus: String,
    updated: String,
    notes: String,
    category: String,
    house: Boolean,
    staple: Boolean
});

module.exports = mongoose.model('StapleItems', StapleItemsSchema);