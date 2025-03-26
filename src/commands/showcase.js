function showcaseCommand(ctx) {
    try {
      ctx.replyWithHTML('<b>Витрина</b>', {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Тарт Лимонный', callback_data: 'btn_43' },
              { text: 'Анна Павлова', callback_data: 'btn_44' },
              { text: 'Фундучное', callback_data: 'btn_45' },
              { text: 'Тарт Лесные ягоды', callback_data: 'btn_46' },
            ],
            [
              { text: 'Сникерс', callback_data: 'btn_47' },
              { text: 'Тирамису', callback_data: 'btn_48' },
              { text: 'Медовик', callback_data: 'btn_49' },
              { text: 'Панна Котта', callback_data: 'btn_50' },
            ],
            [
              { text: 'Манго/маракуйя', callback_data: 'btn_51' },
              { text: 'Карамельно-ореховый', callback_data: 'btn_52' },
              { text: 'Моти', callback_data: 'btn_53' },
              { text: 'Макаронсы', callback_data: 'btn_54' },
            ],
            [
              { text: 'Чиз Классика', callback_data: 'btn_55' },
              { text: 'Чиз Карамель', callback_data: 'btn_56' },
              { text: 'Чиз Черничный', callback_data: 'btn_57' },
              { text: 'Ягодная мерри', callback_data: 'btn_58' },
            ],
            [
              { text: 'Наполеон класс', callback_data: 'btn_59' },
              { text: 'Наполеон шок', callback_data: 'btn_60' },
              { text: 'Фисташковый', callback_data: 'btn_61' },
              { text: 'Творожный', callback_data: 'btn_62' },
            ],
            [
              { text: 'Картошка', callback_data: 'btn_63' },
              { text: 'Лесная сказка', callback_data: 'btn_64' },
              { text: 'Пряник', callback_data: 'btn_65' },
              { text: 'Шок-мятное', callback_data: 'btn_66' },
            ],
            [
              { text: 'Миндальное', callback_data: 'btn_67' },
              { text: 'Овсяное', callback_data: 'btn_68' },
              { text: 'Тройной шок', callback_data: 'btn_69' },
              { text: 'Эклеры', callback_data: 'btn_70' },
            ],
            [
              { text: 'Таллер', callback_data: 'btn_71' },
              { text: 'Шок-арахис', callback_data: 'btn_72' },
              { text: 'Миндальный чипс', callback_data: 'btn_73' },
              { text: 'Сендвичи', callback_data: 'btn_74' },
            ],
            [
              { text: 'Блины', callback_data: 'btn_75' },
              { text: 'Сырники', callback_data: 'btn_76' },
              { text: 'Кубете', callback_data: 'btn_77' },
              { text: 'Шпинатный', callback_data: 'btn_78' },
            ],
            [
              { text: 'Курица/грибы', callback_data: 'btn_79' },
              { text: 'Салат Греческий', callback_data: 'btn_80' },
              { text: 'Салат Цезарь', callback_data: 'btn_81' },
              { text: 'Круассаны', callback_data: 'btn_82' },
            ],
            [{ text: 'Роллы', callback_data: 'btn_83' }],
          ],
        },
      });
    } catch (e) {
      console.error('Ошибка при выполнении команды showcase:', e);
    }
  }
  
  module.exports = { showcaseCommand };