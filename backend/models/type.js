const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const typeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
})

module.exports = mongoose.model('type', typeSchema);