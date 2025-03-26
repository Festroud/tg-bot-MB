require('dotenv').config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  CHAT_ID: '-1001629025233',
  TIMEZONE: 'Europe/Moscow',
  
  // Расписания
  SCHEDULES: {
    MORNING_MOTIVATION: '30 8 * * *',
    DAY_FACT: '0 12 * * *',
    EVENING_THANKS: '30 20 * * *',
    RANDOM_MESSAGES: '0 10-20/2 * * *',
    WEEKLY_REPORT: '0 9 * * 1'
  },

  // Пути
  PATHS: {
    STATS: './data/stats.json',
    LOGS: './logs/bot.log'
  }
};