const { getWeather, getWeatherByCoords } = require('../services/weather');

async function weatherCommand(ctx) {
  // Если команда вызвана не в приватном чате - игнорируем
  if (ctx.chat.type !== 'private') {
    return; // Просто выходим без ответа
  }

  // Если есть текст после команды (город)
  if (ctx.message.text.split(' ')[1]) {
    const city = ctx.message.text.split(' ')[1];
    const weatherInfo = await getWeather(city);
    return ctx.reply(weatherInfo, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "📍 Узнать погоду по моей геолокации", callback_data: "get_weather_by_location" }]
        ]
      }
    });
  }

  // Если город не указан
  ctx.reply('Вы можете:', {
    reply_markup: {
      keyboard: [
        [{ text: "📍 Отправить геолокацию", request_location: true }],
        ["/weather Симферополь", "/weather Ялта", "/weather Алушта", "/weather Судак", "/weather Евпатория"]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
}

// Обработчик геолокации
async function handleLocation(ctx) {
  // Работаем только в приватных чатах
  if (ctx.chat.type !== 'private') return;

  const { latitude, longitude } = ctx.message.location;
  const weatherInfo = await getWeatherByCoords(latitude, longitude);
  ctx.reply(weatherInfo);
}

// Обработчик inline-кнопки
async function handleLocationButton(ctx) {
  // Работаем только в приватных чатах
  if (ctx.chat.type !== 'private') {
    await ctx.answerCbQuery('Доступно только в личных сообщениях с ботом', { show_alert: true });
    return;
  }

  await ctx.answerCbQuery();
  await ctx.reply('Пожалуйста, отправьте вашу геолокацию:', {
    reply_markup: {
      keyboard: [
        [{ text: "📍 Отправить местоположение", request_location: true }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
}

module.exports = { 
  weatherCommand, 
  handleLocation,
  handleLocationButton
};