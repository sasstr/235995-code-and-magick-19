'use strict';

var Bar = {
  COORD_X: 140,
  GAP: 50,
  MY_PLAYER_COLOR: 'rgba(255, 0, 0, 1)',
  HEIGHT: 150,
  WIDTH: 40,
};

var Cloud = {
  COORD_X: 100,
  COORD_Y: 10,
  COLOR: 'rgb(255, 255, 255)',
  GAP: 10,
  MY_PLAYER: 'Вы',
  HEIGHT: 270,
  WIDTH: 420,
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
};

var Content = {
  BASELINE: 'hanging',
  COLOR: '#000000',
  COORD_X: 150,
  COORD_Y: 30,
  FONT_GAP: 20,
  FONT: '16px PT Mono',
  HEADERS: ['Ура вы победили!', 'Список результатов:'],
  GAP: 100,
};

/** Функция возращает наибольшее число
 * @param {array} array Массив из чисел
 * @return {number} возращает наибольшее число
 */
var getMaxResult = function (array) {
  return Math.max.apply(null, array);
};

/** Функция возвращает цвет гистограммы для текущего игрока
 * @param {string} name имя игрока
 * @return {string} цвет для текущей гистограммы
 */
var getPlayerColor = function (name) {
  return name === Cloud.MY_PLAYER ? Bar.MY_PLAYER_COLOR : 'hsl(235, 100%, ' + Math.random() * 100 + '%)';
};

/**
 * Функция рисует облако с тенью
 * @param {object} context контекст конваса
 * @param {object} cloud
 * @return {void} рисуем облако с тенью
 */
var renderCloud = function (context, cloud) {
  context.fillStyle = cloud['SHADOW_COLOR'];
  context.fillRect(cloud['COORD_X'] + Cloud['GAP'], cloud['COORD_Y'] + Cloud['GAP'], cloud['WIDTH'], cloud['HEIGHT']);

  context.fillStyle = cloud['COLOR'];
  context.fillRect(cloud['COORD_X'], cloud['COORD_Y'], cloud['WIDTH'], cloud['HEIGHT']);
};

/**
 * Функция выводит текст одной строки
 * @param {object} context контекст конваса
 * @param {string} header
 * @param {string} contentCoordX
 * @param {string} contentCoordY
 * @param {string} color
 * @return {void} выводит текст одной строки
 */
var renderText = function (context, header, contentCoordX, contentCoordY) {
  context.textBaseline = Content.BASELINE;
  context.fillStyle = Content.COLOR;
  context.font = Content.FONT;
  context.fillText(header, contentCoordX, contentCoordY);
};

/**
 * Функция рисуем гистограммы
 * @param {object} context контекст конваса
 * @param {array} namesArray массив имен игроков
 * @param {array} timesArray массив
 * @param {object} bar объект
 * @return {void} рисуем гистограммы
 */
var rendeBars = function (context, namesArray, timesArray, bar) {
  var maxResult = getMaxResult(timesArray);
  var barCoordX = bar['COORD_X'];

  // рисуем гистограммы с результатами и именами участников игры
  for (var i = 0; i < timesArray.length; i++) {
    // Получаем высоту текущей гистограммы
    var heightCurrentBar = Math.round((timesArray[i] / maxResult) * bar['HEIGHT']);
    // Получаем координату по Y для отрисовки гистограммы
    var barCoordY = bar['HEIGHT'] + bar['GAP'] * 2 - heightCurrentBar;

    // Рисуем текущию гистограмму
    context.fillStyle = getPlayerColor(namesArray[i]);
    context.fillRect(barCoordX, barCoordY, bar['WIDTH'], heightCurrentBar);

    // Рисуем время текущего игрока
    renderText(context, Math.round(timesArray[i]), barCoordX, barCoordY - bar['GAP'] / 2);

    //  Рисуем имя текущего игрока
    renderText(context, namesArray[i], barCoordX, Cloud.HEIGHT - bar['GAP'] / 3);

    // Получаем координату X для следующей гистограммы
    barCoordX += bar['GAP'] + bar['WIDTH'];
  }
};

/** Функция отрисовывает облако с результами игры ввиде гистограмм
   * @param {object} ctx  контекст канваса
   * @param {array} names массив, с именами игроков прошедших уровень
   * @param {array} times Массив содержит время прохождения уровня соответствующего игрока из массива names.
   *                      Время прохождения уровня задано в миллисекундах.
   * @return {void} отрисовывает облако с результами игры ввиде гистограмм
   */
window.renderStatistics = function (ctx, names, times) {
  // рисуем облако с тенью
  renderCloud(ctx, Cloud);

  // рисуем заголовки
  Content.HEADERS.forEach(function (line, i) {
    renderText(ctx, line, Content.COORD_X, Content.COORD_Y + Content.FONT_GAP * i);
  });
  // рисуем гистограммы
  rendeBars(ctx, names, times, Bar);
};
