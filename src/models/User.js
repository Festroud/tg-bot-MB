const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    telegramId: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    isAuthorized: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userModel); 