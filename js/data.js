'use strict';

(function () {
  var PIN_WIDTH = 40;
  var ANNOUNCEMENT_PIN = 70;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var ESC__KEYCODE = 27;
  var mainPin = document.querySelector('.map__pin--main');
  var PIN_POINTER_HEIGHT = 22;
  var MAIN_PIN_WIDTH = mainPin.offsetWidth / 2;
  var MAIN_PIN_HEIGHT = mainPin.offsetHeight / 2;
  var MAIN_PIN_ACTIVE_HEIGHT = mainPin.offsetHeight + PIN_POINTER_HEIGHT;
  var MAIN_PIN_COORDINATE_X = parseInt(mainPin.style.left, 10);
  var MAIN_PIN_COORDINATE_Y = parseInt(mainPin.style.top, 10);
  var isActive = false;
  var dataArr = [];

  window.data = {
    maxLocationY: MAX_LOCATION_Y,
    minLocationY: MIN_LOCATION_Y,
    pinWidth: PIN_WIDTH,
    announcementPin: ANNOUNCEMENT_PIN,
    pinCoordX: MAIN_PIN_COORDINATE_X,
    pinCoordY: MAIN_PIN_COORDINATE_Y,
    mainPinWidth: MAIN_PIN_WIDTH,
    mainPinHeight: MAIN_PIN_HEIGHT,
    mainPinActiveHeight: MAIN_PIN_ACTIVE_HEIGHT,
    esc: ESC__KEYCODE,
    mainPin: mainPin,
    isActive: isActive,
    arr: dataArr,
    types: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    }
  };
})();
