async function coldDrinksCommand(ctx) {
    try {
      await ctx.replyWithHTML('<b>ХОЛОДНЫЕ НАПИТКИ</b>', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'АЙС Американо', callback_data: 'btn_21' },
              { text: 'Айс Латте', callback_data: 'btn_22' },
              { text: 'Айс Матча', callback_data: 'btn_23' },
            ],
            [
              { text: 'Айс Раф', callback_data: 'btn_24' },
              { text: 'Фрапучино Шоколадный', callback_data: 'btn_25' },
              { text: 'Хорнет', callback_data: 'btn_26' },
            ],
            [
              { text: 'Эспрессо-тоник', callback_data: 'btn_27' },
              { text: 'Банан Крем Кофе', callback_data: 'btn_28' },
              { text: 'Айс Какао', callback_data: 'btn_29' },
            ],
            [
              { text: 'Сорбетто Клубника', callback_data: 'btn_30' },
              { text: 'Сорбетто Ананас/манго/Вишня', callback_data: 'btn_31' },
              { text: 'Крем-сода', callback_data: 'btn_32' },
            ],
            [
              { text: 'Лимонад Классический', callback_data: 'btn_33' },
              { text: 'ФризБриз', callback_data: 'btn_34' },
              { text: 'Лимонады ягодные', callback_data: 'btn_35' },
            ],
            [
              { text: 'Мохито', callback_data: 'btn_36' },
              { text: 'Милк-шейки', callback_data: 'btn_37' },
              { text: 'Смузи Сникерс/Орео', callback_data: 'btn_38' },
            ],
            [
              { text: 'Смузи Ягодные', callback_data: 'btn_39' },
              { text: 'Смузи на растительном', callback_data: 'btn_40' },
              { text: 'Фрапучино Сникерс/Орео', callback_data: 'btn_41' },
            ],
            [
              { text: 'Фрапучино Ваниль/Карамель/Фисташка', callback_data: 'btn_42' },
              { text: 'Фраппе', callback_data: 'btn_84' },
              { text: 'Тархун', callback_data: 'btn_85' },
            ],
          ],
        },
      });
    } catch (e) {
      console.error('Ошибка при выполнении команды cold_drinks:', e);
    }
  }
  
  module.exports = { coldDrinksCommand };