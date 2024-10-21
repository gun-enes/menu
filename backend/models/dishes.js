const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const dishSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('dish', dishSchema);