const { commands } = require('../const');

function helpCommand(ctx) {
  try {
    // Используем HTML-форматирование для лучшей читаемости
    ctx.replyWithHTML(`<b>Список доступных команд:</b>\n${commands}`);
  } catch (e) {
    console.error('Ошибка при выполнении команды help:', e);
    ctx.reply('Произошла ошибка при обработке команды. Пожалуйста, попробуйте позже.');
  }
}

module.exports = { helpCommand };