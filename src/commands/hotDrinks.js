async function hotDrinksCommand(ctx) {
    try {
      ctx.replyWithHTML('<b>ГОРЯЧИЕ НАПИТКИ</b>', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Эспрессо', callback_data: 'btn_1' },
              { text: 'Американо', callback_data: 'btn_2' },
              { text: 'Латте', callback_data: 'btn_3' },
            ],
            [
              { text: 'Карамельный Маккиато', callback_data: 'btn_4' },
              { text: 'Капучино', callback_data: 'btn_5' },
              { text: 'FlatWhite', callback_data: 'btn_6' },
            ],
            [
              { text: 'РАФ', callback_data: 'btn_7' },
              { text: 'Кедровый капучино', callback_data: 'btn_8' },
              { text: 'МАТЧА', callback_data: 'btn_9' },
            ],
            [
              { text: 'Гляссе', callback_data: 'btn_10' },
              { text: 'Чай с молоком', callback_data: 'btn_11' },
              { text: 'ЧАй Лесная ягода', callback_data: 'btn_12' },
            ],
            [
              { text: 'Какао/Горячий шоколад', callback_data: 'btn_13' },
              { text: 'Какао на растительном', callback_data: 'btn_14' },
              { text: 'ЧАй Малина', callback_data: 'btn_15' },
            ],
            [
              { text: 'Чай Имбирный', callback_data: 'btn_16' },
              { text: 'Чай Цитрусовый', callback_data: 'btn_17' },
              { text: 'ЧАй Манго-Лайм', callback_data: 'btn_18' },
            ],
            [
              { text: 'Чай Облепиха-имбирь', callback_data: 'btn_19' },
              { text: 'Глинтвейн вишня', callback_data: 'btn_20' },
              { text: 'Клюквенный', callback_data: 'btn_86' },
              { text: 'Пряное яблоко', callback_data: 'btn_87' },
            ],
          ],
        },
      });
    } catch (e) {
      console.error('Ошибка при выполнении команды hot_drinks:', e);
    }
  }
  
  module.exports = { hotDrinksCommand };