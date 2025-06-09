const User = require('../models/User');

// Middleware для проверки авторизации
async function authMiddleware(ctx, next) {
    const message = ctx.message?.text?.toLowerCase();
    const isCommand = message?.startsWith('/');
    const isKeyword = message && ['читать', 'амхара', 'помол', 'гриндер', 'об-мен'].some(keyword => message.includes(keyword));

    if (!isCommand && !isKeyword) {
        return next();
    }

    const userId = ctx.from.id.toString();
    const user = await User.findOne({ telegramId: userId, isAuthorized: true });

    if (!user) {
        return ctx.reply('❌ У вас нет доступа к боту. Обратитесь к администратору.');
    }

    return next();
}

// Middleware для проверки администратора
async function adminMiddleware(ctx, next) {
    const userId = ctx.from.id.toString();
    const user = await User.findOne({ telegramId: userId, isAdmin: true });

    if (!user) {
        return ctx.reply('❌ У вас нет прав администратора');
    }

    return next();
}

module.exports = {
    authMiddleware,
    adminMiddleware
}; 