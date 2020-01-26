'use strict';

var PERSON_AMOUNT = 4;

var Person = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  SURNAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COATS_COLOR: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ],
  EYES_COLOR: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
};

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

userDialog.classList.remove('hidden');
/**
 * Функция возращает случайное целое число между min и max - включительно
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number} случайное значение в заданном диапозоне
 */
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

//  Функция возращает случайный элемент массива
/**
 *
 * @param {array} array
 * @return {any} случайный элемент массива
 */
var getRendomItemOfArray = function (array) {
  return array[getRandomInteger(0, array.length)];
};

/** Функция возращает в случайном порядке имя и фамилию
 * @param {array} names Объект имен
 * @param {array} surnames Объект фамилий
 * @return {string} имя и фамилия в случайном порядке
 */
var getRandomName = function (names, surnames) {

  var name = getRendomItemOfArray(names);
  var surname = getRendomItemOfArray(surnames);

  return getRandomInteger(0, 2) > 1 ? name + ' ' + surname : surname + ' ' + name;
};

/** Функция возращает массив объектов со случайными данными для волшебников
 *
 * @param {number} amount кол-во волшебников
 * @param {object} personsObject объект
 * @return {array} массив объектов со случайными данными для волшебников
 */
var getRandomWizards = function (amount, personsObject) {
  var randomWizards = [];
  for (var i = 0; i < amount; i++) {
    var wizardsName = getRandomName(personsObject['NAMES'], personsObject['SURNAMES']);
    var coatColor = getRendomItemOfArray(personsObject['COATS_COLOR']);
    var eyesColor = getRendomItemOfArray(personsObject['EYES_COLOR']);

    randomWizards.push({
      name: wizardsName,
      coatColor: coatColor,
      eyesColor: eyesColor
    });
  }
  return randomWizards;
};

var wizards = getRandomWizards(PERSON_AMOUNT, Person);

/**
 * Функция возращает элемент готовый для вставки в DOM
 *
 * @param {object} wizard объект
 * @return {element} wizard элемент готовый для вставки в DOM
 */
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

