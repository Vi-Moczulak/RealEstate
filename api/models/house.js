const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
    name: String,
    city: String,
    address: String,
    price: Number,
    bedrooms: Number,
    bathrooms: Number,
    yearBuilt: Number,
    squareFootage: Number
});

module.exports = mongoose.model('House', houseSchema);
