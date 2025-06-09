const { Telegraf } = require('telegraf');
require('dotenv').config({ path: __dirname + '/.env' });
const config = require('./config');
const connectDB = require('./database/connection');
const { setupCallbackHandlers } = require('./handlers/callbackQuery');
const MessageScheduler = require('./services/schedule');
const StatsService = require('./services/stats');
const { helpCommand } = require('./commands/help');
const { startCommand } = require('./commands/start');
const { hotDrinksCommand } = require('./commands/hotDrinks');
const { coldDrinksCommand } = require('./commands/coldDrinks');
const { showcaseCommand } = require('./commands/showcase');
const { workCommand } = require('./commands/work');
const { weeklyCommand } = require('./commands/weekly');
const { keywordsCommand } = require('./commands/keywords');
const { noorgooddayCommand } = require('./commands/noorgoodday');
const { handleMessage } = require('./handlers/message');
const { weatherCommand, handleLocation, handleLocationButton } = require('./commands/weather');
const { authMiddleware, adminMiddleware } = require('./middleware/auth');
const { addUserCommand, removeUserCommand, listUsersCommand, setAdminCommand, checkDbCommand } = require('./commands/admin');
const { statsCommand, commandStatsCommand, userStatsCommand } = require('./commands/stats');
const { bubbleCommand } = require('./commands/bubble');

// Подключаемся к базе данных
connectDB();

const bot = new Telegraf(config.BOT_TOKEN);

// Middleware для логирования команд
bot.use(async (ctx, next) => {
    try {
        await next();
        if (ctx.message?.text?.startsWith('/')) {
            const command = ctx.message.text.split(' ')[0].slice(1);
            await StatsService.logCommand(
                command,
                ctx.from.id.toString(),
                ctx.from.username
            );
        }
    } catch (error) {
        if (ctx.message?.text?.startsWith('/')) {
            const command = ctx.message.text.split(' ')[0].slice(1);
            await StatsService.logCommand(
                command,
                ctx.from.id.toString(),
                ctx.from.username,
                false,
                error.message
            );
        }
        throw error;
    }
});

// Применяем middleware для всех сообщений
bot.use(authMiddleware);

// Обработчики команд
bot.start(startCommand);
bot.help(helpCommand);
bot.command('weather', weatherCommand);
bot.command('hot_drinks', hotDrinksCommand);
bot.command('cold_drinks', coldDrinksCommand);
bot.command('showcase', showcaseCommand);
bot.command('work', workCommand);
bot.command('weekly', weeklyCommand);
bot.command('keywords', keywordsCommand);
bot.command('noorgoodday', noorgooddayCommand);
bot.command('checkDb', checkDbCommand);
bot.command('bubble', bubbleCommand);

// Админ-команды (скрытые)
bot.command('adduser', adminMiddleware, addUserCommand);
bot.command('removeUser', adminMiddleware, removeUserCommand);
bot.command('listUsers', adminMiddleware, listUsersCommand);
bot.command('setAdmin', adminMiddleware, setAdminCommand);

// Команды статистики (только для админа)
bot.command('stats', adminMiddleware, statsCommand);
bot.command('commandStats', adminMiddleware, commandStatsCommand);
bot.command('userStats', adminMiddleware, userStatsCommand);

bot.on('location', handleLocation);
bot.action('get_weather_by_location', handleLocationButton);
bot.on('message', handleMessage);

// Инициализация планировщика
const scheduler = new MessageScheduler(bot);
scheduler.init();

// Настройка интерактивных обработчиков
setupCallbackHandlers(bot);

// Глобальный обработчик ошибок
bot.catch((err, ctx) => {
  if (err.description?.includes('kicked')) return;
  ctx?.reply('⚠️ Произошла ошибка, попробуйте позже').catch(() => {});
});

// Запуск бота
bot.launch().then(() => {
  console.log('Бот запущен');
});

// Обработка завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));