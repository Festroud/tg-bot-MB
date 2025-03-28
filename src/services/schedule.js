const cron = require('node-cron');
const messages = require('../utils/messages');

class MessageScheduler {
  constructor(bot) {
    this.bot = bot;
    this.chatId = '-1001629025233';
  }

  // Получение случайного сообщения с проверкой
  getRandomMessage(type) {
    try {
      const category = messages[type];
      if (!category || !Array.isArray(category)) {
        console.error(`Категория сообщений ${type} не найдена или не является массивом`);
        return messages.motivational[0]; // Возвращаем сообщение по умолчанию
      }
      return category[Math.floor(Math.random() * category.length)];
    } catch (error) {
      console.error('Ошибка при получении случайного сообщения:', error);
      return { text: 'Произошла ошибка при подготовке сообщения', emoji: '❌' };
    }
  }

  // Отправка интерактивного сообщения
  async sendInteractiveMessage(type) {
    try {
      const messageObj = this.getRandomMessage(type);
      if (!messageObj || !messageObj.text) {
        throw new Error(`Некорректный формат сообщения для типа ${type}`);
      }

      const message = `${messageObj.text} ${messageObj.emoji || ''}`.trim();
      await this.bot.telegram.sendMessage(this.chatId, message, { parse_mode: 'HTML' });
      console.log(`[${type}] Сообщение успешно отправлено`);
    } catch (error) {
      console.error(`Ошибка при отправке сообщения типа ${type}:`, error);
    }
  }

  // Настройка мотивационных сообщений
  setupMotivationalMessages() {
    try {
      // Утренняя мотивация
      cron.schedule('30 8 * * *', () => {
        console.log('[MOTIVATIONAL] Запуск утренней мотивации');
        this.sendInteractiveMessage('motivational');
      }, { timezone: 'Europe/Moscow' });

      // Факт дня (01:19)
      cron.schedule('19 1 * * *', () => {
        console.log('[DAY_FACT] Запуск факта дня');
        this.sendInteractiveMessage('dayFact');
      }, { timezone: 'Europe/Moscow' });

      // Вечерняя благодарность
      cron.schedule('30 20 * * *', () => {
        console.log('[THANKS] Запуск вечерней благодарности');
        this.sendInteractiveMessage('thanks');
      }, { timezone: 'Europe/Moscow' });

      // Случайные сообщения (каждые 2 часа с 10 до 20)
      cron.schedule('0 10-20/2 * * *', () => {
        const types = ['motivational', 'facts', 'jokes', 'thanks', 'coffeeTips'];
        const type = types[Math.floor(Math.random() * types.length)];
        console.log(`[RANDOM] Запуск случайного сообщения типа ${type}`);
        this.sendInteractiveMessage(type);
      }, { timezone: 'Europe/Moscow' });

      console.log('Мотивационные сообщения настроены');
    } catch (error) {
      console.error('Ошибка при настройке мотивационных сообщений:', error);
    }
  }
  // Настройка рабочих напоминаний
  setupWorkReminders() {
    try {
      const reminders = [
        { time: '30 7 * * *', text: '<b>Доброе утро!🌅🌅🌅 Не забудьте сделать заготовки по бару, а также составить стоп-лист!</b>' },
        { time: '30 7 * * *', text: '<b>Отпишитесь в чат «МЕНЕДЖЕРЫ MERRY BERRY» что вы готовитесь к работе.</b>' },
        { time: '58 7 * * *', text: '<b>В чат «Графики» отправляете ваш график на сегодня.</b>' },
        { time: '01 8 * * *', text: '<b>В чат «Стандарты» отправляете фото всех сотрудников на смене, вместе с менеджером. (аккуратный, опрятный внешний вид. Чистый фартук, футболка, бейдж и значок всегда на вас. Если потеряли или забыли, попросите новый. Собранные волосы у девочек.)</b>' },
        { time: '00 8 * * *', text: '<b>В чат «МЕНЕДЖЕРЫ MERRY BERRY" фото красиво выставленной витрины, фото станции самообслуживания и печенья.</b>' },
        { time: '02 8 * * *', text: '<b>Включаем музыку. Подсветку включить обязательно. Проверить урны (каждую), помыть. Все стеклянные двери помыть. Всё освещение проверить: вывеска, гирлянды, свет на баре и в зале. Кондиционер ставим на 24 градуса всегда.</b>' },
        { time: '03 8 * * *', text: '<b>Не забудьте составить стоп-лист и хот-лист</b>' },
        { time: '00 10 * * *', text: '<b>☕️☕️☕️Пссс, дружочек...помол не хочешь проверить? ☕️☕️☕️</b>' },
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
        { time: '30 9 * * 6', text: '<b>Напоминание: Не забудьте сделать недельную заявку. И снять остатки по химии!</b>' },
      ];

      reminders.forEach(reminder => {
        cron.schedule(reminder.time, async () => {
          try {
            console.log(`[REMINDER] Отправка напоминания: ${reminder.time}`);
            await this.bot.telegram.sendMessage(this.chatId, reminder.text, { parse_mode: 'HTML' });
            
            if(reminder.time.includes('8:00') || reminder.time.includes('20:00')) {
              setTimeout(() => {
                const type = ['motivational', 'thanks'][Math.floor(Math.random() * 2)];
                this.sendInteractiveMessage(type);
              }, 60000 * 5);
            }
          } catch (error) {
            console.error('Ошибка отправки напоминания:', error);
          }
        }, { timezone: 'Europe/Moscow' });
      });

      console.log('Рабочие напоминания настроены');
    } catch (error) {
      console.error('Ошибка при настройке рабочих напоминаний:', error);
    }
  }

  // Инициализация всех расписаний
  init() {
    try {
      this.setupWorkReminders();
      this.setupMotivationalMessages();
      console.log('Все расписания успешно настроены!');
    } catch (error) {
      console.error('Ошибка при инициализации расписаний:', error);
    }
  }
}

module.exports = MessageScheduler;