'use strict';

var BAR = {
  COORD_X: 140,
  GAP: 50,
  MY_PLAYER_COLOR: 'rgba(255, 0, 0, 1)',
  HEIGTH: 150,
  WIDTH: 40,
};

var CLOUD = {
  COORD_X: 100,
  COORD_Y: 10,
  COLOR: 'rgb(255, 255, 255)',
  GAP: 10,
  MY_PLAYER: 'Вы',
  HEIGHT: 270,
  WIDTH: 420,
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
};

var TEXT = {
  BASELINE: 'hanging',
  COLOR: '#000000',
  COORD_X: 150,
  COORD_Y: 30,
  FONT_GAP: 20,
  FONT: '16px PT Mono',
  HEADERS: ['Ура вы победили!', 'Список результатов:'],
  GAP: 100,
};

/** Функция возращает наибольшее время прохождения игры
 * @param {array} arrayOfResults Массив из результатов прохождения игры
 * @return {number} возращает наибольшее время, за которое пройдена игра
 */
var getMaxResult = function (arrayOfResults) {
  return Math.max.apply(null, arrayOfResults);
};

/** Функция возвращает цвет гистограммы для текущего игрока
 * @param {string} name имя игрока
 * @return {string} цвет для текущей гистограммы
 */
var getPlayerColor = function (name) {
  return name === CLOUD.MY_PLAYER ? BAR.MY_PLAYER_COLOR : 'hsl(235, 100%, ' + Math.random() * 100 + '%)';
};

/**
 * Функция рисует прямоугольник заданного цвета
 * @param {string} color цвет
 * @param {number} coordX координата отступа от края холста по X
 * @param {number} coordY координата отступа от края холста по Y
 * @param {number} width ширина прямоугольника
 * @param {number} heigth высота прямоугольника
 * @param {object} context контекст конваса
 * @return {void} рисует прямоугольник заданного цвета
 */
var renderRectangle = function (color, coordX, coordY, width, heigth, context) {
  context.fillStyle = color;
  context.fillRect(coordX, coordY, width, heigth);
};

/**
 * Функция выводит текст одной строки
 * @param {object} context контекст конваса
 * @param {string} text строка, которая будет отрисована на канвасе
 * @param {number} textCoordX координата начала текста X
 * @param {number} textCoordY координата начала текста Y
 * @return {void} выводит текст одной строки
 */
var renderText = function (context, text, textCoordX, textCoordY) {
  context.textBaseline = TEXT.BASELINE;
  context.fillStyle = TEXT.COLOR;
  context.font = TEXT.FONT;
  context.fillText(text, textCoordX, textCoordY);
};

/**
 * Функция рисует гистограмы и выводит результаты игроков и их имена
 * @param {array} arrayOfTimes массив результатов игры
 * @param {number} maximumTime максимальное время за, которое игрок прошел игру
 * @param {number} barHeight высота гистограмы
 * @param {number} barWidth ширина гистограмы
 * @param {array} namesOfPlayer массив имен игроков
 * @param {object} context контекст конваса
 * @param {string} barGap отступ между гистограмами
 * @param {number} cloudHeight Высота облака
 * @param {number} barCoordX начальная координата отрисовки первой гистограмы
 * @return {void} рисует гистограмы и выводит результаты игроков и их имена
 */
var renderBars = function (arrayOfTimes, maximumTime, barHeight, barWidth, namesOfPlayer, context, barGap, cloudHeight, barCoordX) {

  arrayOfTimes.forEach(function (time, i) {
    // Получаем высоту текущей гистограммы
    var heightCurrentBar = Math.round((time / maximumTime) * barHeight);
    // Получаем координату по Y для отрисовки гистограммы
    var barCoordY = barHeight + barGap * 2 - heightCurrentBar;
    // Рисуем текущию гистограмму
    renderRectangle(getPlayerColor(namesOfPlayer[i]), barCoordX, barCoordY, barWidth, heightCurrentBar, context);
    // Рисуем время текущего игрока
    renderText(context, Math.round(time), barCoordX, barCoordY - barGap / 2);
    //  Рисуем имя текущего игрока
    renderText(context, namesOfPlayer[i], barCoordX, cloudHeight - barGap / 3);
    // Получаем координату X для следующей гистограммы
    barCoordX += barGap + barWidth;
  });
};

/** Функция отрисовывает облако с результами игры ввиде гистограмм
   * @param {object} ctx  контекст канваса
   * @param {array} names массив, с именами игроков прошедших уровень
   * @param {array} times Массив содержит время прохождения уровня соответствующего игрока из массива names.
   *                      Время прохождения уровня задано в миллисекундах.
   * @return {void} отрисовывает облако с результами игры ввиде гистограмм
   */
window.renderStatistics = function (ctx, names, times) {
  // рисует тень для облака
  renderRectangle(CLOUD.SHADOW_COLOR, CLOUD.COORD_X + CLOUD.GAP, CLOUD.COORD_Y + CLOUD.GAP, CLOUD.WIDTH, CLOUD.HEIGHT, ctx);
  // рисует облако
  renderRectangle(CLOUD.COLOR, CLOUD.COORD_X, CLOUD.COORD_Y, CLOUD.WIDTH, CLOUD.HEIGHT, ctx);
  // рисуем заголовки
  TEXT.HEADERS.forEach(function (line, i) {
    renderText(ctx, line, TEXT.COORD_X, TEXT.COORD_Y + TEXT.FONT_GAP * i);
  });
  // рисует гистограммы с результатами и именами участников игры
  renderBars(times, getMaxResult(times), BAR.HEIGTH, BAR.WIDTH, names, ctx, BAR.GAP, CLOUD.HEIGHT, BAR.COORD_X);
};
