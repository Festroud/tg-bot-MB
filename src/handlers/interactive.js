const messages = require('../utils/messages');
const { saveReaction } = require('../utils/stats');
const { setupCallbackHandlers } = require('./callbackQuery');

function setupInteractive(bot) {
  // 1. Настройка обработчиков кнопок
  setupCallbackHandlers(bot);
  
  // 2. Обработка реакций
  bot.action(/rate_(.+)_(.+)/, async (ctx) => {
    const [_, type, reaction] = ctx.match;
    saveReaction(type, reaction);
    await ctx.answerCbQuery(reaction === 'love' ? 'Ваша радость — наша награда! 😊' : 'Спасибо за feedback!');
  });

  // 3. Фабрика обработчиков дополнительных сообщений
  const createMoreHandler = (type) => async (ctx) => {
    try {
      await ctx.deleteMessage();
      const message = messages[type][Math.floor(Math.random() * messages[type].length)];
      
      await ctx.replyWithHTML(
        `<b>${type === 'facts' ? '☕ Кофейный факт' : 
          type === 'jokes' ? '😂 Шутка дня' : 
          '💡 Профессиональный совет'}</b>\n\n${message.text} ${message.emoji}`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "Ещё", callback_data: `more_${type}` }],
              [{ text: "Закрыть", callback_data: "close" }]
            ]
          }
        }
      );
    } catch (error) {
      console.error('Ошибка обработки more action:', error);
    }
  };

  // 4. Регистрация обработчиков
  bot.action('more_facts', createMoreHandler('facts'));
  bot.action('more_jokes', createMoreHandler('jokes'));
  bot.action('more_tips', createMoreHandler('coffeeTips'));
  
  // 5. Обработка кнопки "Закрыть"
  bot.action('close', async (ctx) => {
    await ctx.deleteMessage();
    await ctx.answerCbQuery('Диалог закрыт');
  });

  // 6. Обработка повторных запросов
  bot.action(/more_(.+)/, async (ctx) => {
    const type = ctx.match[1];
    if (messages[type]) {
      createMoreHandler(type)(ctx);
    }
  });
};
module.exports = {
  setupInteractive
};