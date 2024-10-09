const mongoose = require('mongoose');

const paintingSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    artist:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    value:{
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Painting', paintingSchema);