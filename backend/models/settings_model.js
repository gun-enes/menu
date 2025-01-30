const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const settingsSchema = new Schema({
    businessName: {
        type: String,
        required: true,
    },
    businessType: {
        type: String,
    },
    menuType: {
        type: String,
    },
    mainTheme: {
        type: String,
    },
})

module.exports = mongoose.model('settings', settingsSchema);