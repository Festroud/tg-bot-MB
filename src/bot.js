const { Telegraf } = require('telegraf');
require('dotenv').config({ path: __dirname + '/.env' });
const config = require('./config');
const { setupCallbackHandlers } = require('./handlers/callbackQuery');
const MessageScheduler = require('./services/schedule');
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

const bot = new Telegraf(config.BOT_TOKEN);

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
  console.error(`Ошибка в чате ${ctx.chat?.id}:`, err.message);
  
  // Игнорируем ошибки "bot was kicked"
  if (err.description?.includes('kicked')) {
    console.warn('Бот исключен из чата, пропускаем ошибку');
    return;
  }
  
  // Для других ошибок пытаемся отправить сообщение
  ctx?.reply('⚠️ Произошла ошибка, попробуйте позже').catch(() => {});
});

// Запуск бота
bot.launch().then(() => {
  console.log('Бот запущен');
});

// Обработка завершения работы
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));