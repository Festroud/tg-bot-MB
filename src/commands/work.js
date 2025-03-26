// src/commands/work.js
function workCommand(ctx) {
    const workLink = 'https://docs.google.com/spreadsheets/d/1j1z_zuBIx6SycgdJT8f2NDMX14nsIt_TU8489MtiZmk/edit?usp=sharing';
    ctx.replyWithHTML(`Чтобы узнать расписание, посетите <a href="${workLink}">эту ссылку</a>.`, {
      disable_web_page_preview: true,
    });
  }
  
  module.exports = { workCommand };