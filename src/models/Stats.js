const mongoose = require('mongoose');

const statsCommand = new mongoose.Schema({
    command: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    success: {
        type: Boolean,
        default: true
    },
    error: {
        type: String,
        required: false
    }
});

// Индексы для быстрого поиска
statsCommand.index({ command: 1, timestamp: -1 });
statsCommand.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Stats', statsCommand); 