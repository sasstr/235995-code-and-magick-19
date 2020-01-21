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
  COLOR: 'rgb(0, 0, 0)',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)',
};

var TEXT = {
  FONT_GAP: 10,
  FONT_SIZE: '16px',
  FONT_FAMILY: 'PT Mono',
  BASELINE: 'hanging',
  WIDTH: 50,
  FIRST_LINE: 'Ура вы победили!',
  SECOND_LINE: 'Список результатов:',
};

/** Функция отрисовывает облако с результами игры ввиде гистограмм
   * @param {object} ctx  контекст канваса
   * @param {array} names массив, с именами игроков прошедших уровень
   * @param {array} times Массив содержит время прохождения уровня соответствующего игрока из массива names.
   *                      Время прохождения уровня задано в миллисекундах.
   * @return {void} отрисовывает облако с результами игры ввиде гистограмм
   */
window.renderStatistics = function (ctx, names, times) {

  /** Функция возращает возвращает координату мага на две трети по высоте экрана
   * @return {number} возращает наибольший результат
   */
  var getMaxResult = function () {
    return Math.max.apply(null, times);
  };

  // Функция возвращает цвет гистограммы
  var getPlayerColor = function () {
    return name === 'Вы' ? CLOUD.BAR_COLOR : 'hsl(235, 100%, ' + Math.random() * 100 + '%)';
  };
  // Функция рисует облако
  var renderCloud = function () {

  };

  //

  //

};
