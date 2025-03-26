const cron = require('node-cron');
const messages = require('../utils/messages');
const employees = require('../utils/employees');
const { saveReaction, getWeeklyReport } = require('../utils/stats');

class MessageScheduler {
  constructor(bot) {
    this.bot = bot;
    this.chatId = '-1001629025233';
  }

  // Получение случайного сотрудника
  getRandomEmployee() {
    return employees[Math.floor(Math.random() * employees.length)];
  }

  // Получение случайного сообщения
  getRandomMessage(type) {
    const category = messages[type] || messages.motivational;
    return category[Math.floor(Math.random() * category.length)];
  }

  // Отправка интерактивного сообщения
  async sendInteractiveMessage(type) {
    const employee = this.getRandomEmployee();
    const message = this.getRandomMessage(type);
    
    try {
      await this.bot.telegram.sendMessage(
        this.chatId,
        `${employee.emoji} <b>${employee.name}</b>, ${message.text} ${message.emoji}`,
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: [
              [
                { text: "❤️", callback_data: `rate_${type}_love` },
                { text: "👍", callback_data: `rate_${type}_ok` },
                { text: "🤷", callback_data: `rate_${type}_meh` }
              ],
              [
                { text: "📚 Факт", callback_data: 'more_facts' },
                { text: "😂 Шутка", callback_data: 'more_jokes' },
                { text: "💡 Совет", callback_data: 'more_tips' }
              ]
            ]
          }
        }
      );
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
    }
  }

  // Настройка мотивационных сообщений
  setupMotivationalMessages() {
    // Утренняя мотивация
    cron.schedule('30 8 * * *', () => this.sendInteractiveMessage('motivational'), {
      timezone: 'Europe/Moscow'
    });

    // Обеденный факт
    cron.schedule('0 12 * * *', () => this.sendInteractiveMessage('facts'), {
      timezone: 'Europe/Moscow'
    });

    // Вечерняя благодарность
    cron.schedule('30 20 * * *', () => this.sendInteractiveMessage('thanks'), {
      timezone: 'Europe/Moscow'
    });

    // Случайные сообщения (каждые 2 часа с 10 до 20)
    cron.schedule('0 10-20/2 * * *', () => {
      const types = ['motivational', 'facts', 'jokes', 'thanks', 'coffeeTips'];
      this.sendInteractiveMessage(types[Math.floor(Math.random() * types.length)]);
    }, { timezone: 'Europe/Moscow' });

    // Еженедельный отчет
    cron.schedule('0 9 * * 1', () => {
      this.bot.telegram.sendMessage(
        this.chatId,
        getWeeklyReport(),
        { parse_mode: 'HTML' }
      );
    }, { timezone: 'Europe/Moscow' });
  }

  // Настройка рабочих напоминаний
  setupWorkReminders() {
    const reminders = [
      { time: '30 7 * * *', text: '<b>Доброе утро!🌅🌅🌅 Не забудьте сделать заготовки по бару, а также составить стоп-лист!</b>' },
      { time: '30 7 * * *', text: '<b>Отпишитесь в чат «МЕНЕДЖЕРЫ MERRY BERRY» что вы готовитесь к работе.</b>' },
      { time: '58 7 * * *', text: '<b>В чат «Графики» отправляете ваш график на сегодня.</b>' },
      { time: '01 8 * * *', text: '<b>В чат «Стандарты» отправляете фото всех сотрудников на смене, вместе с менеджером. (аккуратный, опрятный внешний вид. Чистый фартук, футболка, бейдж и значок всегда на вас. Если потеряли или забыли, попросите новый. Собранные волосы у девочек.)</b>' },
      { time: '00 8 * * *', text: '<b>В чат «МЕНЕДЖЕРЫ MERRY BERRY" фото красиво выставленной витрины, фото станции самообслуживания и печенья.</b>' },
      { time: '02 8 * * *', text: '<b>Включаем музыку. Подсветку включить обязательно. Проверить урны (каждую), помыть. Все стеклянные двери помыть. Всё освещение проверить: вывеска, гирлянды, свет на баре и в зале. Кондиционер ставим на 24 градуса всегда.</b>' },
      { time: '03 8 * * *', text: '<b>Не забудьте составить стоп-лист и хот-лист</b>' },
      { time: '00 10 * * *', text: '<b>☕️☕️☕️Не забываем проверять помол! Фото в тему "ПОМОЛ"☕️☕️☕️</b>' },
      { time: '00 12 * * *', text: '<b>В чат «МЕНЕДЖЕРЫ MERRY BERRY» фото выставленной витрины после заявки.</b>' },
      { time: '00 13 * * *', text: '<b>Осмотрите зал и обратите внимание на витрину🍰</b>' },
      { time: '00 13 * * *', text: '<b>Не забывайте предлагать наши новинки в продукции гостям</b>' },
      { time: '00 14 * * *', text: '<b>Проверьте зал. Полы, столы, стулья. Все поправьте, протрите двери. Склад поддерживайте в чистоте.</b>' },
      { time: '00 16 * * *', text: '<b>Обратите внимание на витрину🍰🍰</b>' },
      { time: '00 20 * * *', text: '<b>Не забудьте заказать фрукты. (каждый день, кроме субботы)</b>' },
      { time: '00 21 * * *', text: '<b>Фото вашей витрины вечером в основной чат пожалуйста.</b>' },
      { time: '00 23 * * *', text: '<b>Фото убранной, чистой витрины в основной чат, чтобы все видели что вы закрылись.</b>' },
      { time: '30 21 * * *', text: '<b>Не забудьте отправить электронную заявку.</b>' },
      { time: '00 18 * * 4', text: '<b>Сегодня нужно по окончании смены замочить всю посуду на ночь в растворе из белизны, моющего и воды.</b>' },
      { time: '00 8 * * 6', text: '<b>Сегодня генеральная уборка у П1 и П2, СОКОЛОВА И ЦЕНТРА 🧹</b>' },
      { time: '00 7 * * 0', text: '<b>Сегодня генеральная уборка у всех остальных кафе кроме МЕГАНОМА, ПРИМОРСКОГО и ПРИМЫ (у вас в понедельник)🧹</b>' },
      { time: '00 8 * * *', text: '<b>ЦЕНТР и АЛУШТА! Не забудьте открыть маркизы</b>' },
      { time: '01 8 * * *', text: '<b>Проверьте, пожалуйста, включена ли подсветка бара</b>' },
      { time: '00 14 * * *', text: '<b>Проверьте помол, фотоотчет в нашем чате. Указываем время помола и сколько эспрессо было списано</b>' },
      { time: '45 18 * * *', text: '<b>Через 15 минут нужно снять остатки по витрине🍰</b>' },
      { time: '30 13 * * *', text: '<b>Проверьте зал, пожалуйста</b>' },
      { time: '30 17 * * *', text: '<b>Менеджеры осмотрите свои владения🏰 и обратите внимание на витрину🍰🍰🍰</b>' },
      { time: '30 22 * * *', text: '<b>Стимеры замачиваем 2 раза в неделю</b>' },
      { time: '10 23 * * *', text: '<b>🌃Всем большое спасибо! Вы молодцы!❤️</b>' },
      { time: '11 23 * * *', text: '<b>До завтра!</b>' },
      { time: '30 9 * * 6', text: '<b>Напоминание: Не забудьте сделать недельную заявку. И снять остатки по химии!</b>' }
    ];

    reminders.forEach(reminder => {
      cron.schedule(reminder.time, async () => {
        try {
          await this.bot.telegram.sendMessage(this.chatId, reminder.text, { parse_mode: 'HTML' });
        console.log('Напоминание отправлено:', reminder.text.substring(0, 30) + '...');
        // Добавляем случайную реакцию после важных напоминаний
          if(reminder.time.includes('8:00') || reminder.time.includes('20:00')) {
            setTimeout(() => {
              this.sendInteractiveMessage(['motivational', 'thanks'][Math.floor(Math.random() * 2)]);
            }, 60000 * 5); // Через 5 минут
          }
        } catch (error) {
          console.error('Ошибка отправки напоминания:', error);
        }
      }, { timezone: 'Europe/Moscow' });
    });
  }

  // Инициализация всех расписаний
  init() {
    this.setupWorkReminders();
    this.setupMotivationalMessages();
    console.log('Все расписания успешно настроены!');
  }
}

module.exports = MessageScheduler;