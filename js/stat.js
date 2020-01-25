'use strict';

var Bar = {
  coordX: 140,
  gap: 50,
  myPlayerColor: 'rgba(255, 0, 0, 1)',
  height: 150,
  width: 40,
};

var Cloud = {
  coordX: 100,
  coordY: 10,
  color: 'rgb(255, 255, 255)',
  gap: 10,
  myPlayer: 'Вы',
  height: 270,
  width: 420,
  shadowColor: 'rgba(0, 0, 0, 0.7)',
};

var Content = {
  baseline: 'hanging',
  color: '#000000',
  coordX: 150,
  coordY: 30,
  fontGap: 20,
  font: '16px PT Mono',
  headers: ['Ура вы победили!', 'Список результатов:'],
  gap: 100,
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
  return name === Cloud.myPlayer ? Bar.myPlayerColor : 'hsl(235, 100%, ' + Math.random() * 100 + '%)';
};

/**
 * Функция рисует облако с тенью
 * @param {object} context контекст конваса
 * @param {object} cloud координата начала текста Y
 * @return {void} рисуем облако с тенью
 */
var renderCloud = function (context, cloud) {
  context.fillStyle = cloud['shadowColor'];
  context.fillRect(cloud['coordX'] + Cloud['gap'], cloud['coordY'] + Cloud['gap'], cloud['width'], cloud['height']);

  context.fillStyle = cloud['color'];
  context.fillRect(cloud['coordX'], cloud['coordY'], cloud['width'], cloud['height']);
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
  context.textBaseline = Content.baseline;
  context.fillStyle = Content.color;
  context.font = Content.font;
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
  var barCoordX = bar['coordX'];

  // рисуем гистограммы с результатами и именами участников игры
  timesArray.forEach(function (time, i) {
    // Получаем высоту текущей гистограммы
    var heightCurrentBar = Math.round((time / maxResult) * Bar['height']);
    // Получаем координату по Y для отрисовки гистограммы
    var barCoordY = bar['height'] + bar['gap'] * 2 - heightCurrentBar;

    // Рисуем текущию гистограмму
    context.fillStyle = getPlayerColor(namesArray[i]);
    context.fillRect(barCoordX, barCoordY, Bar['width'], heightCurrentBar);

    // Рисуем время текущего игрока
    renderText(context, Math.round(time), barCoordX, barCoordY - bar['gap'] / 2);

    //  Рисуем имя текущего игрока
    renderText(context, namesArray[i], barCoordX, Cloud.height - bar['gap'] / 3);

    // Получаем координату X для следующей гистограммы
    barCoordX += bar['gap'] + bar['width'];
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
  // рисуем облако с тенью
  renderCloud(ctx, Cloud);

  // рисуем заголовки
  Content.headers.forEach(function (line, i) {
    renderText(ctx, line, Content.coordX, Content.coordY + Content.fontGap * i);
  });
  // рисуем гистограммы
  rendeBars(ctx, names, times, Bar);
};
