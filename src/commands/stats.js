const StatsService = require('../services/stats');

// Команда для просмотра общей статистики
const statsCommand = async (ctx) => {
    try {
        const stats = await StatsService.getGeneralStats();
        
        const message = `📊 Общая статистика за последние 7 дней:\n\n` +
            `Всего команд: ${stats.totalCommands}\n` +
            `Уникальных пользователей: ${stats.uniqueUsers.length}\n` +
            `Процент успешных команд: ${(stats.successRate * 100).toFixed(1)}%`;
        
        await ctx.reply(message);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при получении статистики');
    }
};

// Команда для просмотра статистики по командам
const commandStatsCommand = async (ctx) => {
    try {
        const stats = await StatsService.getCommandStats();
        
        if (stats.length === 0) {
            return ctx.reply('📊 Нет данных о использовании команд');
        }
        
        const message = `📊 Статистика по командам за последние 7 дней:\n\n` +
            stats.map(stat => 
                `/${stat._id}: ${stat.count} использований (${stat.successCount} успешных)`
            ).join('\n');
        
        await ctx.reply(message);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при получении статистики команд');
    }
};

// Команда для просмотра статистики по пользователям
const userStatsCommand = async (ctx) => {
    try {
        const stats = await StatsService.getUserStats();
        
        if (stats.length === 0) {
            return ctx.reply('📊 Нет данных о пользователях');
        }
        
        const message = `📊 Статистика по пользователям за последние 7 дней:\n\n` +
            stats.map(stat => 
                `Пользователь ${stat.username || stat._id}: ${stat.totalCommands} команд`
            ).join('\n');
        
        await ctx.reply(message);
    } catch (error) {
        await ctx.reply('❌ Произошла ошибка при получении статистики пользователей');
    }
};

module.exports = {
    statsCommand,
    commandStatsCommand,
    userStatsCommand
}; 