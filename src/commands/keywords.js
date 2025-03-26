function keywordsCommand(ctx) {
    const keywordList = ['читать', 'амхара', 'помол', 'гриндер', 'менеджер'];
    const keywordString = keywordList.join(', ');
    ctx.reply(`Бот реагирует на следующие ключевые слова: ${keywordString}`);
  }
  
  module.exports = { keywordsCommand };