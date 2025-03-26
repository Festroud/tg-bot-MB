const fs = require('fs');
const path = require('path');

const STATS_FILE = path.join(__dirname, '../data/stats.json');

// Инициализация файла статистики
function initStatsFile() {
  if (!fs.existsSync(STATS_FILE)) {
    fs.mkdirSync(path.dirname(STATS_FILE), { recursive: true });
    fs.writeFileSync(STATS_FILE, JSON.stringify({}));
  }
}

function saveReaction(type, reaction) {
  initStatsFile();
  const stats = JSON.parse(fs.readFileSync(STATS_FILE));
  
  stats[type] = stats[type] || {};
  stats[type][reaction] = (stats[type][reaction] || 0) + 1;
  
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));
}

function getStats() {
  initStatsFile();
  return JSON.parse(fs.readFileSync(STATS_FILE));
}

function getWeeklyReport() {
  const stats = getStats();
  const types = {
    motivational: "Мотивация",
    facts: "Факты",
    jokes: "Шутки", 
    thanks: "Благодарности",
    coffeeTips: "Советы"
  };

  let report = "📊 <b>Недельный отчет по реакциям</b>:\n\n";
  
  for (const [type, name] of Object.entries(types)) {
    if (stats[type]) {
      report += `☕ <b>${name}</b>:\n` +
               `   ❤️: ${stats[type].love || 0}\n` +
               `   👍: ${stats[type].ok || 0}\n` +
               `   🤷: ${stats[type].meh || 0}\n\n`;
    }
  }

  const total = Object.values(stats).reduce(
    (sum, type) => sum + Object.values(type).reduce((s, v) => s + v, 0), 0);

  return report + 
         `📈 <b>Всего реакций за неделю:</b> ${total}\n\n` +
         `Самый популярный раздел: ${getMostPopularCategory(stats)}`;
}

function getMostPopularCategory(stats) {
  const [popular] = Object.entries(stats)
    .map(([type, data]) => ({
      type,
      total: Object.values(data).reduce((a, b) => a + b, 0)
    }))
    .sort((a, b) => b.total - a.total)
    .map(item => item.type);

  return popular || "ещё нет данных";
}

module.exports = { 
  saveReaction, 
  getStats, 
  getWeeklyReport 
};