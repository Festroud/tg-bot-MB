const {handlePomol, handleManager, handleAmhara, handleRead } = require('../utils/helpers');

function handleMessage(ctx) {
  const messageText = ctx.message.text.toLowerCase();

  if (messageText.includes('гриндер')) {
    ctx.replyWithHTML('<a href="https://youtu.be/elf8jRu8gJk?feature=shared">Вот смотри! Если что-то не понятно — позвони или напиши барменеджеру.</a>');
  } else if (messageText.includes('помогите')) {
    ctx.reply('Не нужна тебе помощь! Ты и сам отлично справляешься!');
  } else if (messageText.includes('читать')) {
    handleRead(ctx);
  } else if (messageText.includes('амхара')) {
    handleAmhara(ctx);
  } else if (messageText.includes('менеджер')) {
    handleManager(ctx);
  } else if (messageText.includes('помол')) {
    handlePomol(ctx);
  }
}

module.exports = { handleMessage };