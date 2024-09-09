const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    role: {
        type: String,
        default: "viewer",
        enum: [
            "admin",
            "viewer"
        ]
    },
});

module.exports = mongoose.model('User', userSchema);