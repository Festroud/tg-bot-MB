process.setMaxListeners(20);
const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const text = require('./const');
const cron = require('node-cron');
const path = require('path');

const bot = new Telegraf(process.env.BOT_TOKEN);
const chatId = '-1001629025233';

// Обработчик команды /start
bot.start((ctx) => {
    ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`);
});

// Обработчик команды /help
bot.help((ctx) => {
    ctx.reply(`Это список доступных команд:
        /start - Перезапустить бота
        /showcase - Витрина
        /hot_drinks - Горячие напитки
        /cold_drinks - Холодные напитки
        /work - Рабочий график
        /keywords - Ключевые слова
        /weekly - Недельная
        /noorgoodday - Не бывает плохого дня`);
});

// Обработчик ошибок
bot.catch((err) => {
    if (err.response) {
        if (err.response.error_code === 403) {
            console.log(`Пользователь заблокировал бота: ${err.on.payload.chat_id}`);
        } else if (err.response.error_code === 429) {
            const retryAfter = err.response.parameters.retry_after;
            console.log(`Слишком много запросов. Попробуйте снова через ${retryAfter} секунд.`);
            setTimeout(() => {
                bot.telegram.sendMessage(err.on.payload.chat_id, err.on.payload.text);
            }, retryAfter * 1000);
        }
    } else {
        console.error('Произошла ошибка:', err);
    }
});

const scheduleMessage = (time, message) => {
  cron.schedule(time, async () => {
    try {
      await bot.telegram.sendMessage(chatId, message, {
        parse_mode: 'HTML'
      });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, {
    scheduled: true,
    timezone: "Europe/Moscow"
  });
};

// Запланированные сообщения
scheduleMessage('30 07 * * *', '<b>Доброе утро!🌅🌅🌅 Не забудьте сделать заготовки по бару, а также составить стоп-лист!</b>');
scheduleMessage('30 07 * * *', '<b>Отпишитесь в чат «МЕНЕДЖЕРЫ MERRY BERRY» что вы готовитесь к работе. </b>');
scheduleMessage('00 08 * * *', '<b>В чат «Графики» отправляете ваш график на сегодня.</b>');
scheduleMessage('01 08 * * *', '<b>В чат «Стандарты» отправляете фото всех сотрудников на смене, вместе с менеджером. (аккуратный, опрятный внешний вид. Чистый фартук, футболка, бейдж и значок всегда на вас. Если потеряли или забыли, попросите новый. Собранные волосы у девочек.)</b>');
scheduleMessage('00 08 * * *', '<b>В чат «МЕНЕДЖЕРЫ MERRY BERRY” фото красиво выставленной витрины, фото станции самообслуживания и печенья.</b>');
scheduleMessage('02 08 * * *', '<b>Включаем музыку. Подсветку включить обязательно. Проверить урны (каждую), помыть. Все стеклянные двери помыть. Всё освещение проверить: вывеска, гирлянды, свет на баре и в зале. Кондиционер ставим на 24 градуса всегда.</b>');
scheduleMessage('03 08 * * *', '<b>Не забудьте составить стоп-лист и хот-лист</b>');
scheduleMessage('00 12 * * *', '<b>В чат «МЕНЕДЖЕРЫ MERRY BERRY» фото выставленной витрины после заявки.</b>');
scheduleMessage('00 13 * * *', '<b>Не забывайте предлагать наши новинки в продукции гостям</b>');
scheduleMessage('00 14 * * *', '<b>Проверьте зал. Полы, столы, стулья. Все поправьте, протрите двери. Склад поддерживайте в чистоте.</b>');
scheduleMessage('00 20 * * *', '<b>Не забудьте заказать фрукты. (каждый день, кроме субботы)</b>');
scheduleMessage('00 21 * * *', '<b>Фото вашей витрины вечером в основной чат пожалуйста.</b>');
scheduleMessage('00 23 * * *', '<b>Фото убранной, чистой витрины в основной чат, чтобы все видели что вы закрылись.</b>');
scheduleMessage('30 21 * * *', '<b>Не забудьте отправить электронную заявку.</b>');
scheduleMessage('00 18 * * 4', '<b>Сегодня Чистый четверг. Нужно по окончании смены замочить всю посуду на ночь в растворе из белизны, моющего и воды.</b>');
scheduleMessage('00 07 * * 6', '<b>Сегодня генеральная уборка у П1 и П2. 🧹 Убираем все тщательно, вымываем каждый угол, все столы и холодильники отодвигаем.</b>');
scheduleMessage('00 07 * * 0', '<b>Сегодня генеральная уборка у всех остальных кафе кроме МЕГАНОМА И ПРИМОРСКОГО (у вас в понедельник) 🧹 Убираем все тщательно, вымываем каждый угол, все столы и холодильники отодвигаем.</b>');
scheduleMessage('30 07 * * 1', '<b>Каждый понедельник и четверг в 8:00 Заполните пожалуйста таблицу «склад»</b>');
scheduleMessage('30 07 * * 4', '<b>Каждый понедельник и четверг в 8:00 Заполните пожалуйста таблицу «склад»</b>');
scheduleMessage('00 08 * * *', '<b>ЦЕНТР и АЛУШТА! Не забудьте открыть маркизы</b>');
scheduleMessage('01 08 * * *', '<b>Проверьте, пожалуйста, включена ли подсветка бара</b>');
scheduleMessage('00 10 * * *', '<b>☕️☕️☕️Не забываем проверять помол☕️☕️☕️</b>');
scheduleMessage('00 14 * * *', '<b>Проверьте помол, фотоотчет в соответствующий "тред" в нашем чате</b>');
scheduleMessage('45 18 * * *', '<b>Через 15 минут нужно снять остатки по витрине🍰</b>');
scheduleMessage('30 13 * * *', '<b>Проверьте зал, пожалуйста, чтобы всё было красиво и на своих местах</b>');
scheduleMessage('30 17 * * *', '<b>Менеджеры осмотрите свои владения🏰 и обратите внимание на витрину🍰🍰🍰</b>');
scheduleMessage('30 22 * * *', '<b>Обязательно на ночь замачиваем стимеры, фотоочет в группу</b>');
scheduleMessage('10 23 * * *', '<b>🌃Всем спасибо! Вы молодцы! До завтра!❤️</b>');
scheduleMessage('30 09 * * 6', '<b>Напоминание: Не забудьте сделать недельную заявку</b>');

const responses = [
  "Определенно! Улыбки и радость ждут тебя!",
  "Да, сегодня отличный день для новых рисунков на кофе!",
  "Без сомнений! Жди только приятные сюрпризы!",
  "Конечно! Каждый момент будет приносить радость!",
  "Absolutely! Позитивные события уже на подходе!",
  "Да, сегодня всё сложится так, как ты хочешь!",
  "Конечно! Ты привлечешь к себе только хорошее!",
  "Да, сегодня будет день, наполненный счастьем!",
  "Определенно! Верь в лучшее, и оно произойдет!",
  "Безусловно! Ты заслуживаешь только хорошего!",
  "Да, сегодня ты сможешь сделать что-то замечательное!",
  "Да, день обещает быть волшебным!",
  "Определенно! Ожидай приятные встречи и события!",
  "Этот день сам по себе хороший, так как в нём есть такой замечательный человек как ты сам!",
  "Зуб даю, сегодня твой день!",
  "Каждый новый день — это новая возможность. Действуй и создай свой лучший день!",
  "Сегодня — это чистый лист, на котором ты можешь написать свою историю успеха.",
  "Настройся на позитив, и весь день будет светлым и радостным!",
  "Помни, счастье — это не цель, а способ путешествия. Наслаждайся каждым моментом!",
  "Каждый день — это шанс сделать что-то замечательное. Не упусти его!",
  "Ты сам создаешь свои мысли. Наполни их светом и надеждой!",
  "Начни день с улыбки, и мир ответит тебе тем же.",
  "Верь в себя и свои силы — это ключ к успешному дню!",
  "Каждый день — это новый шанс стать лучше, чем ты был вчера.",
  "Не бойся мечтать. Сегодня — это шаг к исполнению твоих желаний.",
  "Поставь себе цель на день и стремись к её достижению. Успех ждет тебя!",
  "Каждый момент — это возможность. Используй его мудро!",
  "Твое настроение определяет твой день. Выбирай счастье!",
  "Открывай свой день с благодарностью, и он станет особенным.",
  "Улыбка — это самый простой способ сделать свой день лучше.",
  "Помни, что ты — архитектор своего счастья. Строй его с любовью!",
  "Забудь о вчерашних неудачах. Сегодня — это новое начало!",
  "С каждым глотком кофе наполняйся энергией и позитивом!",
  "Сегодня — отличный день для того, чтобы сделать что-то удивительное!",
  "Не ждите идеального момента. Создайте его сами!",
  "Не важно какой сегодня день, важен только путь для самурая"

];

const dataFilePath = path.join(__dirname, 'data.json');

const getData = () => {
  if (fs.existsSync(dataFilePath)) {
      return JSON.parse(fs.readFileSync(dataFilePath));
  }
  return { lastResponseDate: null, lastResponseText: null };
};

const saveData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data));
};

// Обработка команды /noorgoodday
bot.command('noorgoodday', (ctx) => {
  const chatId = ctx.chat.id;
  const data = getData();
  const today = new Date().toISOString().split('T')[0];

  if (data.lastResponseDate === today) {
      ctx.reply(`Сегодня Вы уже получили ответ: 👀\n"${data.lastResponseText}". \n--------------\nПодождите до завтра!⏰`);
  } else {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      data.lastResponseDate = today;
      data.lastResponseText = randomResponse;
      saveData(data);
      ctx.reply(randomResponse);
  }
});

bot.command('hot_drinks', async (ctx) => {
     try {
         await ctx.replyWithHTML('<b>ГОРЯЧИЕ НАПИТКИ</b>', {
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
                         { text: 'ЧАй МАНГО/Лайм', callback_data: 'btn_18' },
                     ],
                     [
                         { text: 'Чай Облепиха с имбирём', callback_data: 'btn_19' },
                         { text: 'Глинтвейн вишня', callback_data: 'btn_20' },
                         { text: 'Клюквенный', callback_data: 'btn_86' },
                         { text: 'Пряное яблоко', callback_data: 'btn_87' },
                     ],
                 ],
             },
         });
     } catch (e) {
         console.error(e);
     }
 });

bot.command('cold_drinks', async (ctx) => {
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
                         { text: 'Тархун', callback_data: 'btn_85' }
                     ],
                 ],
             },
         });
     } catch (e) {
         console.error(e);
     }
 });
// Обработчик команды /showcase
bot.command('showcase', async (ctx) => {
  try {
      await ctx.replyWithHTML('<b>Витрина</b>', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: 'Тарт Лимонный', callback_data: 'btn_43' }, { text: 'Анна Павлова', callback_data: 'btn_44' }, { text: 'Фундучное', callback_data: 'btn_45' }, { text: 'Тарт Лесные ягоды', callback_data: 'btn_46' }],
                  [{ text: 'Сникерс', callback_data: 'btn_47' }, { text: 'Тирамису', callback_data: 'btn_48' }, { text: 'Медовик', callback_data: 'btn_49' }, { text: 'Панна Котта', callback_data: 'btn_50' }],
                  [{ text: 'Манго/маракуйя', callback_data: 'btn_51' }, { text: 'Карамельно-ореховый', callback_data: 'btn_52' }, { text: 'Моти', callback_data: 'btn_53' }, { text: 'Макаронсы', callback_data: 'btn_54' }],
                  [{ text: 'Чиз Классика', callback_data: 'btn_55' }, { text: 'Чиз Карамель', callback_data: 'btn_56' }, { text: 'Чиз Черничный', callback_data: 'btn_57' }, { text: 'Ягодная мерри', callback_data: 'btn_58' }],
                  [{ text: 'Наполеон класс', callback_data: 'btn_59' }, { text: 'Наполеон шок', callback_data: 'btn_60' }, { text: 'Фисташковый', callback_data: 'btn_61' }, { text: 'Творожный', callback_data: 'btn_62' }],
                  [{ text: 'Картошка', callback_data: 'btn_63' }, { text: 'Лесная сказка', callback_data: 'btn_64' }, { text: 'Пряник', callback_data: 'btn_65' }, { text: 'Шок-мятное', callback_data: 'btn_66' }],
                  [{ text: 'Миндальное', callback_data: 'btn_67' }, { text: 'Овсяное', callback_data: 'btn_68' }, { text: 'Тройной шок', callback_data: 'btn_69' }, { text: 'Эклеры', callback_data: 'btn_70' }],
                  [{ text: 'Таллер', callback_data: 'btn_71' }, { text: 'Шок-арахис', callback_data: 'btn_72' }, { text: 'Миндальный чипс', callback_data: 'btn_73' }, { text: 'Сендвичи', callback_data: 'btn_74' }],
                  [{ text: 'Блины', callback_data: 'btn_75' }, { text: 'Сырники', callback_data: 'btn_76' }, { text: 'Кубете', callback_data: 'btn_77' }, { text: 'Шпинатный', callback_data: 'btn_78' }],
                  [{ text: 'Курица/грибы', callback_data: 'btn_79' }, { text: 'Салат Греческий', callback_data: 'btn_80' }, { text: 'Салат Цезарь', callback_data: 'btn_81' }, { text: 'Круассаны', callback_data: 'btn_82' }],
                  [{ text: 'Роллы', callback_data: 'btn_83' }],
              ]
          }
      });
  } catch (e) {
      console.error(e);
  }
});
 bot.command('work', async (ctx) => {
     try {
            
         const workLink = 'https://docs.google.com/spreadsheets/d/1j1z_zuBIx6SycgdJT8f2NDMX14nsIt_TU8489MtiZmk/edit?usp=sharing';
         await ctx.replyWithHTML(`Чтобы узнать расписание, посетите <a href="${workLink}">эту ссылку</a>.`, {
             disable_web_page_preview: true
         });
 
     } catch (e) {
         console.error(e);
     }
 });

 bot.command('weekly', async (ctx) => {
    try {
           
        const weekly = 'https://docs.google.com/spreadsheets/d/1uSS4f6Cvwmu-JuJkHEOH6sdTzaao6_TOMHOy-t8X56A/edit?usp=sharing';
        await ctx.replyWithHTML(`<a href="${weekly}">Недельная заявка</a>.`, {
            disable_web_page_preview: true
        });

    } catch (e) {
        console.error(e);
    }
});

 bot.command('keywords', (ctx) => {
     const keywordList = [
         'читать',
         'амхара',
         'помол',
         'гриндер',
         'менеджер'
     ];
 
     const keywordString = keywordList.join(', ');
 
     ctx.reply(`Бот реагирует на следующие ключевые слова: ${keywordString}`);
 });

function addActionBot(name, src, text) {
     bot.action(name, async (ctx) => {
          try {
               await ctx.replyWithHTML(text, {
                    disable_web_page_preview: true
               })
               await ctx.answerCbQuery ()
               if (src !== false) {
                    await ctx.replyWithPhoto({
                         source: src
                    })
               }
          } catch (e) {
               console.error (e)
          }
     })
}

bot.on('text', (ctx) => {
     const messageText = ctx.message.text.toLowerCase(); 
    if (messageText.includes('гриндер')) {
        const link = 'https://youtu.be/elf8jRu8gJk?feature=shared';
        ctx.replyWithHTML(` <a href="${link}">вот смотри! если что-то не понятно - позвони или напиши барменеджеру</a>.`);
    } else if (messageText.includes('помогите')) {
        ctx.reply('Не нужна тебе помощь! Ты и сам отлично справляешься!');
    }
     else if (messageText.includes('читать')) {
          const link = 'https://drive.google.com/drive/folders/1m-WA6rKeV22vGWhqs-ASIEBh5ls-gqcF?usp=drive_link'; // Ваша ссылка
        ctx.replyWithHTML(` <a href="${link}">Читай</a>.`);
      }
      else if (messageText.includes('амхара')) {
          const formattedText = `<b>Дескрипторы</b>: 
          <i>грейпфрут, темные ягоды, шоколад</i>;
          <b>Закладка кофе</b>: <i>17,4...18 грамм</i>;
          <b>Время пролива</b>: - <i>23...25 сек</i>;
          <b>Вес доппио</b>: — <i>32...36 грамм</i>;
          `;
        ctx.replyWithHTML(formattedText);
      }
      else if (messageText.includes('менеджер')) {
        const formattedText = `📌
Продукцию с витрины убираем в холодильник в конце каждой смены, обязательно проверяем маркировку. Фото чистой витрины каждый день отправлять в чат (где только менеджеры). 
📌 Муссовые десерты и моти. 
Каждый раз когда вы приходите на смену, открывайте таблицу и смотрите кому есть перенос. Каждый день указывайте остатки по этим десертам. Упаковывать муссовые аккуратно, не пихайте по 4-5 штук в 1 пакет. 
📌 Донаты. 
Как только вы видите что их мало, напишите супервайзеру или барменеджеру. Если у вас мало и вы по остаткам видите что у соседних точек много, возьмите перенос. Следите за намолняемостью витрины.
📌 Вовремя приходить на работу. 
Если вы с кем-то поменялись или хотите поменяться, обязательно предупреждайте супервайзера. Если это бариста то пишите барменеджеру.
Напоминаю, невыход в смену - выговор.
📌Внешний вид. 
Соблюдать стандарты не сложно. Черные брюки/штаны/джинсы, корпоративная футболка, бейдж, жетон, фартук. Волосы у девочек всегда собраны. Не хвост, а пучок либо коса. 
📌 Остатки.
Остатки по продукции вносите ежедневно до 20:00. Заявку по кухне делаете сами. Поставьте себе напоминание в телефон если вы забываете вовремя все внести. Как получаете свою заявку, стирайте  таблицу (строго свои два столбца в таблице цех, и два столбца в таблице кухня). 
📌 Подсветка. 
Вы приходите на смену, включаете везде свет. Возьмите себе в привычку вместе с этим включать и подсветку всего на баре, не забывайте об этом пожалуйста. Не нужно чтобы управляющий делал вам постоянно замечания.
📌 
П1. Дверь на склад должна быть всегда закрыта!
📌
С бара уберите все веники, ведра, швабры. Не нужно чтобы лишний инвентарь хранился на видной месте. На каждой точке есть место, куда это все можно спрятать. 
📌Каждый день заполняйте чек-лист открытия смены и отправляйте супервайзеру. Он ходит и проверяет что вы сделали с утра, и что не сделали. 
📌 Поломки.
Если у вас что-то вышло из стоя связанное с баром, обратитесь к барменеджеру(если он не выходной). По всем остальным вопросам к супервайзеру. Сначала пишите или звоните суперу, и уже потом пишите в чат поломки. 
📌 Летняя площадка.
Центр, П1, П2 как обычно. Грязно, зонт открыт не полностью, столы не вымыты, летка не подметена, заборчики не вытерты, двери входные и подсобные грязные. Каждый раз делаешь замечание, толку ноль. Примите во внимание пожалуйста. И на Соколов нужно мыть скамейки новые на улице.
📌 Урны.
Урны вымывать снаружи и внутри каждый день, относиться абсолютно ко всем. Фото прилагать вместе с фото чек-листа. 
📌 Мусор.
Мусор выносить нужно каждый день в по окончании рабочего дня. Не нужно оставлять ничего на завтра, уберите сразу.
📌
Уберите все ведра на точках. Перестаньте уже на них сидеть. У всех есть стулья, устали, пойдите присядьте на стул. 
📌
Подложки из под тортов больше не используем на витрине, убирайте их сразу, кладите торт на тарелку сразу. 
📌
Подсобки сегодня всем привести в порядок. Убрать лишнее и разложить склад. Фото приветствуется. 
📌
Мебель в зале. Следите за этим всегда. Криво стоит стул - пойдите поправьте, это не составит вам труда. 
📌
Следите за ценниками в витрине. Все крепить ровно. Вытирайте витрину как внутри, так и снаружи. 

Если у вас есть вопросы - пишите супервайзеру!)
Спасибо 🌸❤️❤️❤️❤️❤️❤️❤️❤️`;
        ctx.replyWithHTML(formattedText);
      }

else if (messageText.includes('помол')) {
     const formattedText = `
     *Настройка помола (эспрессо):*
1. Берем холдер и очищаем его от остатков кофе и протираем насухо
2. Оттариваем холдер на весах
3. Смалываем двойную порцию кофе 17,3...18 грамм
   3.1. Если кофемолка выдает меньше дозировку, вручную домалываем
   3.2. Если больше, убираем излишки кофе в стаканчик
4. После того как в холдер засыпана нужная дозировка молотого кофе, разравниваем его так, чтобы трамбовка была ровной без наклонов в какую-либо сторону, для правильной экстракции кофе
5. Оттариваем посуду, в которую будем производить пролив (молочник, чашка, стакан)
6. Проливаем из группы воду 3-4 секунды для очистки группы от остатков прошлого приготовления и выравнивания температуры подачи воды
7. Вставляем холдер в группу и включаем пролив (кнопка Start) одновременно с запуском таймера
8. Внимательно следим за таймером, по истечении времени (исходя из рекомендаций по вашему сорту) — отключаем пролив
9. Ставим эспрессо на весы и проверяем вес, он должен составлять (смотри рекомендации к помолу)
   9.1. Если полученный вес больше, кофе обладает явным водянистым и/или кислотным вкусом, то, скорее всего, необходимо уменьшить степень помола
   9.2. Если вес меньше допустимого, то есть вероятность того, что ваш помол слишком мелкий, что в свою очередь даёт кофейной таблетке большее сопротивление и воде сложнее просочиться через неё. В данном случае нужно увеличить степень помола
10. Если вес находится в допустимом диапазоне, пробуем эспрессо на вкус и принимаем решение о дальнейшей настройке. Если всё равно что-то не то, наберите бар-менеджера он точно подскажет!
   `;
     ctx.replyWithHTML(formattedText);
 }
 });

 addActionBot ('btn_1', './img/hot/h1.jpg', text.text1)
 addActionBot ('btn_2', './img/hot/h2.jpg', text.text2)
 addActionBot ('btn_3', './img/hot/h3.jpg', text.text3)
 addActionBot ('btn_4', './img/hot/h4.jpg', text.text4)
 addActionBot ('btn_5', './img/hot/h5.jpg', text.text5)
 addActionBot ('btn_6', './img/hot/h6.jpg', text.text6)
 addActionBot ('btn_7', './img/hot/h7.jpg', text.text7)
 addActionBot ('btn_8', './img/hot/h8.jpg', text.text8)
 addActionBot ('btn_9', './img/hot/h9.jpg', text.text9)
 addActionBot ('btn_10', './img/hot/h10.jpg', text.text10)
 addActionBot ('btn_11', './img/hot/h11.jpg', text.text11)
 addActionBot ('btn_12', './img/hot/h12.jpg', text.text12)
 addActionBot ('btn_13', './img/hot/h13.jpg', text.text13)
 addActionBot ('btn_14', './img/hot/h14.jpg', text.text14)
 addActionBot ('btn_15', './img/hot/h15.jpg', text.text15)
 addActionBot ('btn_16', './img/hot/h16.jpg', text.text16)
 addActionBot ('btn_17', './img/hot/h17.jpg', text.text17)
 addActionBot ('btn_18', './img/hot/h18.jpg', text.text18)
 addActionBot ('btn_19', './img/hot/h19.jpg', text.text19)
 addActionBot ('btn_20', './img/hot/h20.jpg', text.text20)
 addActionBot ('btn_21', './img/cold/c1.jpg', text.text21)
 addActionBot ('btn_22', './img/cold/c2.jpg', text.text22)
 addActionBot ('btn_23', './img/cold/c3.jpg', text.text23)
 addActionBot ('btn_24', './img/cold/c4.jpg', text.text24)
 addActionBot ('btn_25', './img/cold/c5.jpg', text.text25)
 addActionBot ('btn_26', './img/cold/c6.jpg', text.text26)
 addActionBot ('btn_27', './img/cold/c7.jpg', text.text27)
 addActionBot ('btn_28', './img/cold/c8.jpg', text.text28)
 addActionBot ('btn_29', './img/cold/c9.jpg', text.text29)
 addActionBot ('btn_30', './img/cold/c10.jpg', text.text30)
 addActionBot ('btn_31', './img/cold/c11.jpg', text.text31)
 addActionBot ('btn_32', './img/cold/c12.jpg', text.text32)
 addActionBot ('btn_33', './img/cold/c13.jpg', text.text33)
 addActionBot ('btn_34', './img/cold/c14.jpg', text.text34)
 addActionBot ('btn_35', './img/cold/c15.jpg', text.text35)
 addActionBot ('btn_36', './img/cold/c16.jpg', text.text36)
 addActionBot ('btn_37', './img/cold/c17.jpg', text.text37)
 addActionBot ('btn_38', './img/cold/c18.jpg', text.text38)
 addActionBot ('btn_39', './img/cold/c19.jpg', text.text39)
 addActionBot ('btn_40', './img/cold/c20.jpg', text.text40)
 addActionBot ('btn_41', './img/cold/c21.jpg', text.text41)
 addActionBot ('btn_42', './img/cold/c22.jpg', text.text42)
 addActionBot ('btn_43', './img/showcase/tartlim.jpg', text.text43)
 addActionBot ('btn_44', './img/showcase/anna.jpg', text.text44)
 addActionBot ('btn_45', './img/showcase/hazelnut.jpg', text.text45)
 addActionBot ('btn_46', './img/showcase/tartmix.jpg', text.text46)
 addActionBot ('btn_47', './img/showcase/snikers.jpg', text.text47)
 addActionBot ('btn_48', './img/showcase/tiramisu.jpg', text.text48)
 addActionBot ('btn_49', './img/showcase/honey.jpg', text.text49)
 addActionBot ('btn_50', './img/showcase/pk.jpg', text.text50)
 addActionBot ('btn_51', './img/showcase/richmango.jpg', text.text51)
 addActionBot ('btn_52', './img/showcase/richcar.jpg', text.text52)
 addActionBot ('btn_53', './img/showcase/moti.jpg', text.text53)
 addActionBot ('btn_54', './img/showcase/makaron.jpg', text.text54)
 addActionBot ('btn_55', './img/showcase/ny.jpg', text.text55)
 addActionBot ('btn_56', './img/showcase/caramel.jpg', text.text56)
 addActionBot ('btn_57', './img/showcase/blueberry.jpg', text.text57)
 addActionBot ('btn_58', './img/showcase/berry.jpg', text.text58)
 addActionBot ('btn_59', './img/showcase/napc.jpg', text.text59)
 addActionBot ('btn_60', './img/showcase/napsh.jpg', text.text60)
 addActionBot ('btn_61', './img/showcase/pis.jpg', text.text61)
 addActionBot ('btn_62', './img/showcase/tvor.jpg', text.text62)
 addActionBot ('btn_63', './img/showcase/potato.jpg', text.text63)
 addActionBot ('btn_64', './img/showcase/forest.jpg', text.text64)
 addActionBot ('btn_65', './img/showcase/pryanik.jpg', text.text65)
 addActionBot ('btn_66', './img/showcase/chocom.jpg', text.text66)
 addActionBot ('btn_67', './img/showcase/min.jpg', text.text67)
 addActionBot ('btn_68', './img/showcase/oves.jpg', text.text68)
 addActionBot ('btn_69', './img/showcase/thchoc.jpg', text.text69)
 addActionBot ('btn_70', './img/showcase/ecler.jpg', text.text70)
 addActionBot ('btn_71', './img/showcase/taller.jpg', text.text71)
 addActionBot ('btn_72', './img/showcase/chocoh.jpg', text.text72)
 addActionBot ('btn_73', './img/showcase/minchip.jpg', text.text73)
 addActionBot ('btn_74', './img/showcase/sand.jpg', text.text74)
 addActionBot ('btn_75', './img/showcase/blin.jpg', text.text75)
 addActionBot ('btn_76', './img/showcase/ch.jpg', text.text76)
 addActionBot ('btn_77', './img/showcase/kubete.jpg', text.text77)
 addActionBot ('btn_78', './img/showcase/spinach.jpg', text.text78)
 addActionBot ('btn_79', './img/showcase/kubete.jpg', text.text79)
 addActionBot ('btn_80', './img/showcase/salatg.jpg', text.text80)
 addActionBot ('btn_81', './img/showcase/salatc.jpg', text.text81)
 addActionBot ('btn_82', './img/showcase/crc.jpg', text.text82)
 addActionBot ('btn_83', './img/showcase/rolls.jpg', text.text83)
 addActionBot ('btn_84', './img/cold/c23.jpg', text.text84)
 addActionBot ('btn_85', './img/cold/c24.jpg', text.text85)
 addActionBot ('btn_86', './img/hot/h21.jpg', text.text86)
 addActionBot ('btn_87', './img/hot/h22.jpg', text.text87)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))