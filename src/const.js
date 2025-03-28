const commands = `
/start - Перезапустить бота
/showcase - Витрина
/hot_drinks - Горячие напитки
/cold_drinks - Холодные напитки
/work - Рабочий график
/keywords - Ключевые слова
/weekly - Недельная заявка
/noorgoodday - Не бывает плохого дня
/weather - узнать погоду на сегодня
`;

module.exports = { commands };

const text1 = 'Эспрессо'
const text2 = 'Американо'
const text3 = 'Латте'
const text4 = 'Карамельный маккиато'
const text5 = 'Капучино'
const text6 = 'FlatWhite'
const text7 = 'Раф кофе'
const text8 = 'Капучино кедровый орех'
const text9 = 'Матча Латте'
const text10 = 'Гляссе'
const text11 = 'Чай с молоком'
const text12 = 'Чай Лесная ягода'
const text13 = 'Какао/Горячий шоколад'
const text14 = 'Какао на растительном молоке'
const text15 = 'Чай Малина'
const text16 = 'Чай Имбирный'
const text17 = 'Чай Цитрусовый'
const text18 = 'Чай Манго/Лайм'
const text19 = 'Чай Облепиховый с имбирём'
const text20 = 'Глинтвейн Вишня'
const text21 = 'Айс Американо'
const text22 = 'Айс Латте'
const text23 = 'Айс Матча'
const text24 = 'Айс Раф'
const text25 = 'Фрапучино Шоколадный, поливаем шоколадным топпингом'
const text26 = 'Хорнет'
const text27 = 'Эспрессо-тоник'
const text28 = 'Банан Крем Кофе'
const text29 = 'Айс Какао'
const text30 = 'Собретто Клубника'
const text31 = 'Сорбетто МАНГО/АНАНАС/ВИШНЯ'
const text32 = 'Крем-сода'
const text33 = 'Лимонад Классический'
const text34 = 'Фриз Бриз'
const text35 = 'Ягодные лимонады на основе минеральной воды'
const text36 = 'Мохито'
const text37 = 'Милк-шейки'
const text38 = 'Смузи Сникерс/Орео'
const text39 = 'Ягодные смузи (в смузи малина добавляем ягоду - клюкву)'
const text40 = 'Смузи на растительном молоке'
const text41 = 'Фрапучино Сникерс/Орео'
const text42 = 'Фрапучино Ваниль/Карамель/Фисташка (украшаем топпингом только Карамельный)'
const text43 = 'Тарт Лимонный подается на десертной тарелке с вилкой и ножом, из креманки не доставать'
const text44 = 'Анна Павлова подается на десертной тарелке с вилкой и ножом, из креманки не доставать'
const text45 = 'Фундучное подается на десертной тарелке с вилкой и ножом, из креманки не доставать'
const text46 = 'Тарт лесные ягоды подается на десертной тарелке с вилкой и ножом, из креманки не доставать. Есть двух видов: 1) с малиной; 2) с малиной и голубикой;'
const text47 = 'Сникер подается с чайной ложкой на блюдце, если с собой то в маленький крафт пакет с одноразовой ложкой и салфетками'
const text48 = 'Тирамису подается с чайной ложкой на блюдце, если с собой то в маленький крафт пакет с одноразовой ложкой и салфетками'
const text49 = 'Медовик подается с чайной ложкой на блюдце, если с собой то в маленький крафт пакет с одноразовой ложкой и салфетками'
const text50 = 'Панна Котта подается с чайной ложкой на блюдце, если с собой то в маленький крафт пакет с одноразовой ложкой и салфетками'
const text51 = 'Манго/маракуйя подается с чайной ложкой на блюдце, если с собой то в маленький крафт пакет с одноразовой ложкой и салфетками'
const text52 = 'Карамельно-ореховый подается с чайной ложкой на блюдце, если с собой то в маленький крафт пакет с одноразовой ложкой и салфетками'
const text53 = 'Моти. Подается с чайной ложкой на блюдце, если с собой и несколько штук, то отдаем в маленьком картонной коробке, если один моти, то в уголке для круассана'
const text54 = 'Макароны. подается на блюдце, если с собой и несколько штук, то отдаем в маленьком картонной коробке, если один моти, то в уголке для круассана'
const text55 = 'Чиз Классика. В целом торте 10 порций. ОБЯЗАТЕЛЬНО ГРЕЕМ НОЖ ПОД КИПЯТКОМ ПЕРЕД ТЕМ КАК ОТРЕЗАТЬ ПОРЦИЮ. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text56 = 'Чиз Карамельный. В целом торте 10 порций. ОБЯЗАТЕЛЬНО ГРЕЕМ НОЖ ПОД КИПЯТКОМ ПЕРЕД ТЕМ КАК ОТРЕЗАТЬ ПОРЦИЮ. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text57 = 'Чиз Черничный. В целом торте 10 порций. ОБЯЗАТЕЛЬНО ГРЕЕМ НОЖ ПОД КИПЯТКОМ ПЕРЕД ТЕМ КАК ОТРЕЗАТЬ ПОРЦИЮ. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text58 = 'Ягодная Мерри. В целом торте 10 порций. Удобней всего отрезать порцию ножом для пирогов (пилой). Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text59 = 'Наполеон классический. В целом торте 12 порций. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text60 = 'Наполеон Шоколадный. В целом торте 12 порций. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text61 = 'Фисташковый. В целом торте 12 порций. Очень аккуратно работаем с ним, так как он очень мягкий. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text62 = 'Творожно-йогуртовый. В целом торте 10 порций. Прогреваем нож. Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в тортовнице (пробивать в кипере обязательно).'
const text63 = 'Картошка. Подается с чайной ложкой на блюдце, если с собой и несколько штук, то отдаем в маленьком картонной коробке, если один моти, то в уголке для круассана'
const text64 = 'Лесная сказка. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text65 = 'Пряник. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text66 = 'Шоколадно-мятное. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text67 = 'Миндальное. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text68 = 'Овсяное. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text69 = 'Тройной шоколад. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text70 = 'Эклеры. Есть классический (черный), фундук(молочный шоколад), карамель (посыпан дробленным орехом) Если в зале, то отдаем на десертной тарелке с вилкой и ножом. С собой - в ланч-бокс. И не забыть приборы.'
const text71 = 'Таллер. Если в зале, то на блюдце. Если с собой - уголок или крафт пакет маленький (уточнять у гостя (желательно))'
const text72 = 'Шоколадно-арахисовое'
const text73 = 'Миндальный чипс'
const text74 = 'Сендвичи. Подгрееваем на гриле до цвета чуть-чуть светлее хлебной корочки. 1-1,5 минуты в зависимости от мощности и температуры гриля'
const text75 = 'Блины. Греем в микроволновой печи 30 сек. (чтобы были теплые) можно и дольше. Когда подогреваем обязательно снимаем крышку и убираем соус. После того как подогрели обязательно все вернули нам место'
const text76 = 'Сырники. Греем в микроволновой печи 30 сек. (чтобы были теплые) можно и дольше. Когда подогреваем обязательно снимаем крышку и убираем соус. После того как подогрели обязательно все вернули нам место'
const text77 = 'Кубете. В целом пироге 10 порций. Прежде чем разрезать обязательно стоит разметить его на порции. Обязательно используем пилу. Греем 1,5-2 минуты. Подаётся со сливками 33% (30мл).'
const text78 = 'Шпинатный. В целом пироге 10 порций. Прежде чем разрезать обязательно стоит разметить его на порции. Обязательно используем пилу. Греем 1,5-2 минуты. Подаётся со сливками 33% (30мл).'
const text79 = 'Курица/грибы. В целом пироге 10 порций. Прежде чем разрезать обязательно стоит разметить его на порции. Обязательно используем пилу. Греем 1,5-2 минуты. Подаётся со сливками 33% (30мл).'
const text80 = 'Салат Греческий. Если в зале - на тарелке с приборами. С собой - большой крафт пакет + приборы с салфетками.'
const text81 = 'Салат Цезарь. Если в зале - на тарелке с приборами. С собой - большой крафт пакет + приборы с салфетками.'
const text82 = 'Круассаны. Когда подогреваем на гриле (желательно уточнить на кассе), то мы не прижимаешь круассан верхней крышкой, чтобы его "сплющело". Если в зале  - брендированный уголок + десертная тарелка, если с собой  - картонная корбока для круассанов.'
const text83 = 'Роллы. Подогреваем на гриле если это курица - так чтобы лаваш хрустел, если это сёмга - просто чтобы он был теплый. Если в зале то, завернули ролл в пергамент (согласно стандарту), если с собой - пергамент + картонная упаковка для роллов.'
const text84 = 'Фраппе'
const text85 = 'Тархун'
const text86 = 'Клюквенный'
const text87 = 'Пряное яблоко'
const text88 = 'Матча Бамбл'
const text89 = 'матча Тоник'
module.exports.commands = commands
module.exports.text1 = text1
module.exports.text2 = text2
module.exports.text3 = text3
module.exports.text4 = text4
module.exports.text5 = text5
module.exports.text6 = text6
module.exports.text7 = text7
module.exports.text8 = text8
module.exports.text9 = text9
module.exports.text10 = text10
module.exports.text11 = text11
module.exports.text12 = text12
module.exports.text13 = text13
module.exports.text14 = text14
module.exports.text15 = text15
module.exports.text16 = text16
module.exports.text17 = text17
module.exports.text18 = text18
module.exports.text19 = text19
module.exports.text20 = text20
module.exports.text21 = text21
module.exports.text22 = text22
module.exports.text23 = text23
module.exports.text24 = text24
module.exports.text25 = text25
module.exports.text26 = text26
module.exports.text27 = text27
module.exports.text28 = text28
module.exports.text29 = text29
module.exports.text30 = text30
module.exports.text31 = text31
module.exports.text32 = text32
module.exports.text33 = text33
module.exports.text34 = text34
module.exports.text35 = text35
module.exports.text36 = text36
module.exports.text37 = text37
module.exports.text38 = text38
module.exports.text38 = text39
module.exports.text40 = text40
module.exports.text41 = text41
module.exports.text42 = text42
module.exports.text43 = text43
module.exports.text44 = text44
module.exports.text45 = text45
module.exports.text46 = text46
module.exports.text47 = text47
module.exports.text48 = text48
module.exports.text49 = text49
module.exports.text50 = text50
module.exports.text51 = text51
module.exports.text52 = text52
module.exports.text53 = text53
module.exports.text54 = text54
module.exports.text55 = text55
module.exports.text56 = text56
module.exports.text57 = text57
module.exports.text58 = text58
module.exports.text59 = text59
module.exports.text60 = text60
module.exports.text61 = text61
module.exports.text62 = text62
module.exports.text63 = text63
module.exports.text64 = text64
module.exports.text65 = text65
module.exports.text66 = text66
module.exports.text67 = text67
module.exports.text68 = text68
module.exports.text69 = text69
module.exports.text70 = text70
module.exports.text71 = text71
module.exports.text72 = text72
module.exports.text73 = text73
module.exports.text74 = text74
module.exports.text75 = text75
module.exports.text76 = text76
module.exports.text77 = text77
module.exports.text78 = text78
module.exports.text79 = text79
module.exports.text80 = text80
module.exports.text81 = text81
module.exports.text82 = text82
module.exports.text83 = text83
module.exports.text84 = text84
module.exports.text85 = text85
module.exports.text86 = text86
module.exports.text87 = text87
module.exports.text88 = text88
module.exports.text89 = text89
