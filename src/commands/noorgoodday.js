const { responses } = require('../utils/responses');
const { getData, saveData } = require('../utils/helpers');

async function noorgooddayCommand(ctx) {
  try {
    const chatId = ctx.chat.id;
    const data = await getData() || {}; // Проверка на undefined
    const today = new Date().toISOString().split('T')[0];

    if (data.lastResponseDate === today) {
      return ctx.reply(
        `Сегодня Вы уже получили ответ: 👀\n"${data.lastResponseText}". \n--------------\nПодождите до завтра!⏰`
      );
    }

    if (!responses || !Array.isArray(responses)) {
      throw new Error('Массив responses не загружен или не является массивом.');
    }

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    data.lastResponseDate = today;
    data.lastResponseText = randomResponse;
    await saveData(data);

    return ctx.reply(randomResponse);
  } catch (error) {
    console.error('Ошибка в noorgooddayCommand:', error);
    return ctx.reply('Произошла ошибка при обработке вашего запроса.');
  }
}

module.exports = { noorgooddayCommand };