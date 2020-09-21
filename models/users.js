const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String,
    id: String
});

module.exports = mongoose.model('Users', usersSchema);