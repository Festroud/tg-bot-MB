const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log('✅ Подключение к MongoDB установлено');
    } catch (error) {
        console.error('❌ Ошибка подключения к MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB; 