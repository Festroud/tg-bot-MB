async function bubbleCommand(ctx) {
    await ctx.replyWithHTML('<b>Бабл меню</b>', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Кофейный', callback_data: 'btn_90' },
                    { text: 'Шоколадный', callback_data: 'btn_91' },
                    { text: 'Айс Ти', callback_data: 'btn_92' },
                    { text: 'Juice', callback_data: 'btn_93' },
                ]
            ],
        },
    });
}

module.exports = { bubbleCommand };