const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
})

module.exports = mongoose.model('category', categorySchema);