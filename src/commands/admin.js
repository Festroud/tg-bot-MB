const User = require('../models/User');

// Команда для добавления пользователя
async function addUserCommand(ctx) {
    try {
        const args = ctx.message.text.split(' ');
        if (args.length !== 2) {
            return ctx.reply('❌ Используйте формат: /addUser <telegram_id>');
        }

        const telegramId = args[1];
        const user = await User.findOneAndUpdate(
            { telegramId },
            { isAuthorized: true },
            { new: true, upsert: true }
        );

        await ctx.reply(`✅ Пользователь ${user.username || telegramId} добавлен`);

        try {
            await ctx.telegram.sendMessage(
                telegramId,
                `👋 Привет! Теперь у вас есть доступ к боту.\n\n` +
                `Доступные команды:\n` +
                `/start - Запустить бота\n` +
                `/help - Показать справку\n` +
                `/weather - Узнать погоду\n` +
                `/hotDrinks - Горячие напитки\n` +
                `/coldDrinks - Холодные напитки\n` +
                `/showcase - Витрина\n` +
                `/work - Рабочий график\n` +
                `/weekly - Недельная заявка\n` +
                `/keywords - Ключевые слова\n` +
                `/noorgoodday - Мотивация\n` +
                `/bubble - Бабл-ти\n\n` +
                `Также бот реагирует на ключевые слова: читать, амхара, помол, гриндер, менеджер`
            );
        } catch (error) {
            await ctx.reply('⚠️ Пользователь добавлен, но не удалось отправить ему приветственное сообщение. Возможно, он не начал диалог с ботом.');
        }
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при добавлении пользователя');
    }
}

// Команда для удаления пользователя
async function removeUserCommand(ctx) {
    try {
        const args = ctx.message.text.split(' ');
        if (args.length !== 2) {
            return ctx.reply('❌ Используйте формат: /removeUser <telegram_id>');
        }

        const telegramId = args[1];
        const user = await User.findOneAndUpdate(
            { telegramId },
            { isAuthorized: false },
            { new: true }
        );

        if (!user) {
            return ctx.reply('❌ Пользователь не найден');
        }

        await ctx.reply(`✅ Пользователь ${user.username || telegramId} удален`);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при удалении пользователя');
    }
}

// Команда для просмотра списка пользователей
async function listUsersCommand(ctx) {
    try {
        const users = await User.find({ isAuthorized: true });
        if (users.length === 0) {
            return ctx.reply('📝 Список авторизованных пользователей пуст');
        }

        const userList = users.map(user => 
            `ID: ${user.telegramId}\nUsername: ${user.username || 'Нет'}\nAdmin: ${user.isAdmin ? 'Да' : 'Нет'}`
        ).join('\n\n');

        await ctx.reply(`📝 Список авторизованных пользователей:\n\n${userList}`);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при получении списка пользователей');
    }
}

// Команда для установки прав админа
async function setAdminCommand(ctx) {
    try {
        const args = ctx.message.text.split(' ');
        if (args.length !== 2) {
            return ctx.reply('❌ Используйте формат: /setAdmin <telegram_id>');
        }

        const telegramId = args[1];
        const user = await User.findOneAndUpdate(
            { telegramId },
            { isAdmin: true },
            { new: true, upsert: true }
        );

        await ctx.reply(`✅ Пользователь ${user.username || telegramId} назначен администратором`);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при назначении администратора');
    }
}

// Команда для проверки состояния базы данных
async function checkDbCommand(ctx) {
    try {
        const userId = ctx.from.id.toString();
        const user = await User.findOne({ telegramId: userId });
        
        const message = `
🔍 Проверка состояния базы данных:

Ваш ID: ${userId}
Найден в базе: ${user ? 'Да' : 'Нет'}
${user ? `
Данные пользователя:
- Username: ${user.username || 'Нет'}
- Авторизован: ${user.isAuthorized ? 'Да' : 'Нет'}
- Админ: ${user.isAdmin ? 'Да' : 'Нет'}
- Добавлен: ${user.addedAt.toLocaleString()}
` : ''}
`;
        
        await ctx.reply(message);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при проверке базы данных');
    }
}

module.exports = {
    addUserCommand,
    removeUserCommand,
    listUsersCommand,
    setAdminCommand,
    checkDbCommand
}; 