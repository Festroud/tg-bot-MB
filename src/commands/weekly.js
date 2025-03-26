// src/commands/weekly.js
function weeklyCommand(ctx) {
    const weeklyLink = 'https://docs.google.com/spreadsheets/d/1uSS4f6Cvwmu-JuJkHEOH6sdTzaao6_TOMHOy-t8X56A/edit?usp=sharing';
    ctx.replyWithHTML(`<a href="${weeklyLink}">Недельная заявка</a>.`, {
      disable_web_page_preview: true,
    });
  }
  
  module.exports = { weeklyCommand };