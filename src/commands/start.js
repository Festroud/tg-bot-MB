async function startCommand(ctx) {
    ctx.reply(`Привет, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`);
  }
  
  module.exports = { startCommand };