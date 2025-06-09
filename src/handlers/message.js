const { handlePomol, handleManager, handleAmhara, handleRead } = require('../utils/helpers');

// Добавляем константы для ключевых слов для удобства
const COMMANDS = {
  GRINDER: 'гриндер',
  HELP: 'помогите',
  READ: 'читать',
  AMHARA: 'амхара',
  MANAGER: 'об-мен',
  POMOL: 'помол'
};

async function handleMessage(ctx) {
  try {
    // Проверяем наличие сообщения и текста
    if (!ctx?.message?.text) {
      console.warn('Получено сообщение без текста:', ctx.updateType);
      return;
    }

    // Нормализуем текст (удаляем лишние пробелы и приводим к нижнему регистру)
    const messageText = ctx.message.text.trim().toLowerCase();

    // Определяем обработчики для каждой команды
    const commandHandlers = {
      [COMMANDS.GRINDER]: () => ctx.replyWithHTML(
        '<a href="https://youtu.be/elf8jRu8gJk?feature=shared">Вот смотри! Если что-то не понятно — позвони или напиши барменеджеру.</a>'
      ),
      [COMMANDS.HELP]: () => ctx.reply('Не нужна тебе помощь! Ты и сам отлично справляешься!'),
      [COMMANDS.READ]: handleRead,
      [COMMANDS.AMHARA]: handleAmhara,
      [COMMANDS.MANAGER]: handleManager,
      [COMMANDS.POMOL]: handlePomol
    };

    // Ищем подходящую команду
    const foundCommand = Object.keys(commandHandlers).find(command => 
      messageText.includes(command)
    );

    // Если команда найдена - выполняем соответствующий обработчик
    if (foundCommand) {
      commandHandlers[foundCommand](ctx);
    }

  } catch (error) {
    console.error('Ошибка при обработке сообщения:', error);
    // Можно добавить уведомление об ошибке
    ctx.reply('Произошла ошибка при обработке вашего сообщения. Попробуйте позже.');
  }
}

module.exports = { handleMessage };