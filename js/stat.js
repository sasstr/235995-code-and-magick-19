'use strict';

var CLOUD = {
  WIDTH: 420,
  HEIGHT: 270,
  COORD_X: 100,
  COORD_Y: 10,
  GAP: 10,
  BAR_GAP: 50,
  BAR_COLOR: 'rgba(255, 0, 0, 1)',
  BAR_HEIGTH: 150,
  BAR_WIDTH: 40,
  COLOR: 'rgb(255, 255, 255)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
};

var TEXT = {
  FONT_GAP: 10,
  FONT_SIZE: '16px',
  FONT_FAMILY: 'PT Mono',
  BASELINE: 'hanging',
  WIDTH: 200,
  FIRST_LINE: 'Ура вы победили!',
  SECOND_LINE: 'Список результатов:',
};

/** Функция возращает возвращает координату мага на две трети по высоте экрана
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
  return name === 'Вы' ? CLOUD.BAR_COLOR : 'hsl(235, 100%, ' + Math.random() * 100 + '%)';
};

/**
 * Функция рисует прямоугольник заданного цвета
 * @param {string} color цвет 
 * @param {number} coordX координата отступа от края холста по X
 * @param {number} coordY координата отступа от края холста по Y
 * @param {number} cloudWidth ширина облака
 * @param {number} cloudHeigth высота облака
 * @param {object} context контекст конваса
 * @return {void} рисует прямоугольник заданного цвета
 */
var renderCloud = function (color, coordX, coordY, cloudWidth, cloudHeigth, context) {
  context.fillStyle = color;
  context.fillRect(coordX, coordY, cloudWidth, cloudHeigth);
};

// Функция рисует одну строку текста

// 

/** Функция отрисовывает облако с результами игры ввиде гистограмм
   * @param {object} ctx  контекст канваса
   * @param {array} names массив, с именами игроков прошедших уровень
   * @param {array} times Массив содержит время прохождения уровня соответствующего игрока из массива names.
   *                      Время прохождения уровня задано в миллисекундах.
   * @return {void} отрисовывает облако с результами игры ввиде гистограмм
   */
window.renderStatistics = function (ctx, names, times) {
  // рисует тень для облака
  renderCloud(CLOUD.SHADOW_COLOR, CLOUD.COORD_X + CLOUD.GAP, CLOUD.COORD_Y + CLOUD.GAP, CLOUD.WIDTH, CLOUD.HEIGHT, ctx);
  // рисует облако
  renderCloud(CLOUD.COLOR, CLOUD.COORD_X, CLOUD.COORD_Y, CLOUD.WIDTH, CLOUD.HEIGHT, ctx);
  // получаем наибольшее время игрока
  var maxTime = getMaxResult(times);
};
