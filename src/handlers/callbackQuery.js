const path = require('path');
const fs = require('fs');
const {
  text1, text2, text3, text4, text5, text6, text7, text8, text9, text10,
  text11, text12, text13, text14, text15, text16, text17, text18, text19, text20,
  text21, text22, text23, text24, text25, text26, text27, text28, text29, text30,
  text31, text32, text33, text34, text35, text36, text37, text38, text39, text40,
  text41, text42, text43, text44, text45, text46, text47, text48, text49, text50,
  text51, text52, text53, text54, text55, text56, text57, text58, text59, text60,
  text61, text62, text63, text64, text65, text66, text67, text68, text69, text70,
  text71, text72, text73, text74, text75, text76, text77, text78, text79, text80,
  text81, text82, text83, text84, text85, text86, text87
} = require('../const');

// Карта соответствия кнопок и текстов
const PRODUCT_TEXT_MAP = {
  // Горячие напитки
  'btn_1': text1, 'btn_2': text2, 'btn_3': text3, 'btn_4': text4, 'btn_5': text5,
  'btn_6': text6, 'btn_7': text7, 'btn_8': text8, 'btn_9': text9, 'btn_10': text10,
  'btn_11': text11, 'btn_12': text12, 'btn_13': text13, 'btn_14': text14, 'btn_15': text15,
  'btn_16': text16, 'btn_17': text17, 'btn_18': text18, 'btn_19': text19, 'btn_20': text20,
  'btn_86': text86, 'btn_87': text87,

  // Холодные напитки
  'btn_21': text21, 'btn_22': text22, 'btn_23': text23, 'btn_24': text24, 'btn_25': text25,
  'btn_26': text26, 'btn_27': text27, 'btn_28': text28, 'btn_29': text29, 'btn_30': text30,
  'btn_31': text31, 'btn_32': text32, 'btn_33': text33, 'btn_34': text34, 'btn_35': text35,
  'btn_36': text36, 'btn_37': text37, 'btn_38': text38, 'btn_39': text39, 'btn_40': text40,
  'btn_41': text41, 'btn_42': text42, 'btn_84': text84, 'btn_85': text85,

  // Витрина
  'btn_43': text43, 'btn_44': text44, 'btn_45': text45, 'btn_46': text46, 'btn_47': text47,
  'btn_48': text48, 'btn_49': text49, 'btn_50': text50, 'btn_51': text51, 'btn_52': text52,
  'btn_53': text53, 'btn_54': text54, 'btn_55': text55, 'btn_56': text56, 'btn_57': text57,
  'btn_58': text58, 'btn_59': text59, 'btn_60': text60, 'btn_61': text61, 'btn_62': text62,
  'btn_63': text63, 'btn_64': text64, 'btn_65': text65, 'btn_66': text66, 'btn_67': text67,
  'btn_68': text68, 'btn_69': text69, 'btn_70': text70, 'btn_71': text71, 'btn_72': text72,
  'btn_73': text73, 'btn_74': text74, 'btn_75': text75, 'btn_76': text76, 'btn_77': text77,
  'btn_78': text78, 'btn_79': text79, 'btn_80': text80, 'btn_81': text81, 'btn_82': text82,
  'btn_83': text83
};

// Карта соответствия кнопок и изображений
const PRODUCT_IMAGE_MAP = {
  // Горячие напитки
  'btn_1': 'hot/h1.jpg', 'btn_2': 'hot/h2.jpg', 'btn_3': 'hot/h3.jpg',
  'btn_4': 'hot/h4.jpg', 'btn_5': 'hot/h5.jpg', 'btn_6': 'hot/h6.jpg',
  'btn_7': 'hot/h7.jpg', 'btn_8': 'hot/h8.jpg', 'btn_9': 'hot/h9.jpg',
  'btn_10': 'hot/h10.jpg', 'btn_11': 'hot/h11.jpg', 'btn_12': 'hot/h12.jpg',
  'btn_13': 'hot/h13.jpg', 'btn_14': 'hot/h14.jpg', 'btn_15': 'hot/h15.jpg',
  'btn_16': 'hot/h16.jpg', 'btn_17': 'hot/h17.jpg', 'btn_18': 'hot/h18.jpg',
  'btn_19': 'hot/h19.jpg', 'btn_20': 'hot/h20.jpg',

  // Холодные напитки
  'btn_21': 'cold/c1.jpg', 'btn_22': 'cold/c2.jpg', 'btn_23': 'cold/c3.jpg',
  'btn_24': 'cold/c4.jpg', 'btn_25': 'cold/c5.jpg', 'btn_26': 'cold/c6.jpg',
  'btn_27': 'cold/c7.jpg', 'btn_28': 'cold/c8.jpg', 'btn_29': 'cold/c9.jpg',
  'btn_30': 'cold/c10.jpg', 'btn_31': 'cold/c11.jpg', 'btn_32': 'cold/c12.jpg',
  'btn_33': 'cold/c13.jpg', 'btn_34': 'cold/c14.jpg', 'btn_35': 'cold/c15.jpg',
  'btn_36': 'cold/c16.jpg', 'btn_37': 'cold/c17.jpg', 'btn_38': 'cold/c18.jpg',
  'btn_39': 'cold/c19.jpg', 'btn_40': 'cold/c20.jpg', 'btn_41': 'cold/c21.jpg',
  'btn_42': 'cold/c22.jpg',

  // Витрина
  'btn_43': 'showcase/tartlim.jpg', 'btn_44': 'showcase/anna.jpg',
  'btn_45': 'showcase/hazelnut.jpg', 'btn_46': 'showcase/tartmix.jpg',
  'btn_47': 'showcase/snikers.jpg', 'btn_48': 'showcase/tiramisu.jpg',
  'btn_49': 'showcase/honey.jpg', 'btn_50': 'showcase/pk.jpg',
  'btn_51': 'showcase/richmango.jpg', 'btn_52': 'showcase/richcar.jpg',
  'btn_53': 'showcase/moti.jpg', 'btn_54': 'showcase/makaron.jpg',
  'btn_55': 'showcase/ny.jpg', 'btn_56': 'showcase/caramel.jpg',
  'btn_57': 'showcase/blueberry.jpg', 'btn_58': 'showcase/berry.jpg',
  'btn_59': 'showcase/napc.jpg', 'btn_60': 'showcase/napsh.jpg',
  'btn_61': 'showcase/pis.jpg', 'btn_62': 'showcase/tvor.jpg',
  'btn_63': 'showcase/potato.jpg', 'btn_64': 'showcase/forest.jpg',
  'btn_65': 'showcase/pryanik.jpg', 'btn_66': 'showcase/chocom.jpg',
  'btn_67': 'showcase/min.jpg', 'btn_68': 'showcase/oves.jpg',
  'btn_69': 'showcase/thchoc.jpg', 'btn_70': 'showcase/ecler.jpg',
  'btn_71': 'showcase/taller.jpg', 'btn_72': 'showcase/chocoh.jpg',
  'btn_73': 'showcase/minchip.jpg', 'btn_74': 'showcase/sand.jpg',
  'btn_75': 'showcase/blin.jpg', 'btn_76': 'showcase/ch.jpg',
  'btn_77': 'showcase/kubete.jpg', 'btn_78': 'showcase/spinach.jpg',
  'btn_79': 'showcase/kubete.jpg', 'btn_80': 'showcase/salatg.jpg',
  'btn_81': 'showcase/salatc.jpg', 'btn_82': 'showcase/crc.jpg',
  'btn_83': 'showcase/rolls.jpg'
};

/**
 * Получает полный путь к изображению продукта
 * @param {string} buttonId - ID кнопки (например, 'btn_1')
 * @returns {string|null} Полный путь к изображению или null если не найдено
 */
function getProductImagePath(buttonId) {
  const relativePath = PRODUCT_IMAGE_MAP[buttonId];
  if (!relativePath) {
    console.warn(`Не найден путь к изображению для кнопки ${buttonId}`);
    return null;
  }

  const fullPath = path.join(__dirname, '../img', relativePath);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`Изображение не найдено по пути: ${fullPath}`);
    return null;
  }

  return fullPath;
}

/**
 * Обрабатывает запрос погоды по геолокации
 * @param {TelegrafContext} ctx - Контекст Telegraf
 */
async function handleWeatherLocationRequest(ctx) {
  try {
    await ctx.answerCbQuery();
    await ctx.reply('Пожалуйста, отправьте вашу геолокацию:', {
      reply_markup: {
        keyboard: [
          [{ text: "📍 Отправить местоположение", request_location: true }]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    });
  } catch (error) {
    console.error('Ошибка при обработке запроса геолокации:', error);
    await ctx.answerCbQuery('⚠️ Произошла ошибка при запросе геолокации');
  }
}

/**
 * Обрабатывает нажатие на кнопку продукта
 * @param {TelegrafContext} ctx - Контекст Telegraf
 * @param {string} buttonId - ID кнопки
 * @param {string} productText - Текст описания продукта
 */
async function handleProductButtonClick(ctx, buttonId, productText) {
  try {
    const imagePath = getProductImagePath(buttonId);
    
    // Отправляем текст продукта
    await ctx.replyWithHTML(`<b>Информация о продукте:</b>\n\n${productText}`, {
      disable_web_page_preview: true
    });
    
    // Если есть изображение - отправляем его
    if (imagePath) {
      await ctx.replyWithPhoto({ source: imagePath });
    }
    
    await ctx.answerCbQuery();
  } catch (error) {
    console.error(`Ошибка при обработке кнопки ${buttonId}:`, error);
    await ctx.answerCbQuery('⚠️ Произошла ошибка при обработке запроса');
  }
}

/**
 * Настраивает обработчики callback-запросов для бота
 * @param {Telegraf} bot - Экземпляр бота Telegraf
 */
function setupCallbackHandlers(bot) {
  // Регистрируем обработчики для всех продуктов
  Object.entries(PRODUCT_TEXT_MAP).forEach(([buttonId, productText]) => {
    bot.action(buttonId, async (ctx) => {
      await handleProductButtonClick(ctx, buttonId, productText);
    });
  });

  // Регистрируем специальные обработчики
  bot.action('get_weather_by_location', handleWeatherLocationRequest);
}

module.exports = {
  setupCallbackHandlers
};