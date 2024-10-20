const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const imageSchema = new mongoose.Schema({
    name: String,
    img: {
      data: Buffer,
      contentType: String
    }
  });

module.exports = mongoose.model('image', imageSchema);