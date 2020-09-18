const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oneTimeItemsSchema = new Schema({
    item: String,
    notes: String,
    category: String,
    house: Boolean,
    staple: Boolean
});

module.exports = mongoose.model('OneTimeItems', oneTimeItemsSchema);