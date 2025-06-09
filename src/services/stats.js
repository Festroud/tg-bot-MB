const Stats = require('../models/Stats');

class StatsService {
    // Запись использования команды
    static async logCommand(command, userId, username, success = true, error = null) {
        try {
            await Stats.create({
                command,
                userId,
                username,
                success,
                error
            });
        } catch (error) {
            console.error('Ошибка при записи статистики:', error);
        }
    }

    // Получение статистики по командам
    static async getCommandStats(days = 7) {
        const date = new Date();
        date.setDate(date.getDate() - days);

        return await Stats.aggregate([
            {
                $match: {
                    timestamp: { $gte: date }
                }
            },
            {
                $group: {
                    _id: '$command',
                    count: { $sum: 1 },
                    successCount: {
                        $sum: { $cond: ['$success', 1, 0] }
                    }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
    }

    // Получение статистики по пользователям
    static async getUserStats(days = 7) {
        const date = new Date();
        date.setDate(date.getDate() - days);

        return await Stats.aggregate([
            {
                $match: {
                    timestamp: { $gte: date }
                }
            },
            {
                $group: {
                    _id: '$userId',
                    username: { $first: '$username' },
                    totalCommands: { $sum: 1 },
                    commands: {
                        $push: {
                            command: '$command',
                            timestamp: '$timestamp'
                        }
                    }
                }
            },
            {
                $sort: { totalCommands: -1 }
            }
        ]);
    }

    // Получение общей статистики
    static async getGeneralStats(days = 7) {
        const date = new Date();
        date.setDate(date.getDate() - days);

        const stats = await Stats.aggregate([
            {
                $match: {
                    timestamp: { $gte: date }
                }
            },
            {
                $group: {
                    _id: null,
                    totalCommands: { $sum: 1 },
                    uniqueUsers: { $addToSet: '$userId' },
                    successRate: {
                        $avg: { $cond: ['$success', 1, 0] }
                    }
                }
            }
        ]);

        return stats[0] || {
            totalCommands: 0,
            uniqueUsers: [],
            successRate: 0
        };
    }
}

module.exports = StatsService; 