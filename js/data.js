'use strict';

(function () {
  var MAIN_PIN = document.querySelector('.map__pin--main');
  var PIN_WIDTH = 40;
  var ANNOUNCEMENT_PIN = 70;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;
  var PIN_POINTER_HEIGHT = 22;
  var MAIN_PIN_WIDTH = MAIN_PIN.offsetWidth / 2;
  var MAIN_PIN_HEIGHT = MAIN_PIN.offsetHeight / 2;
  var MAIN_PIN_ACTIVE_HEIGHT = MAIN_PIN.offsetHeight + PIN_POINTER_HEIGHT;
  var MAIN_PIN_COORDINATE_X = parseInt(MAIN_PIN.style.left, 10);
  var MAIN_PIN_COORDINATE_Y = parseInt(MAIN_PIN.style.top, 10);
  var isActive = false;
  var dataArr = [];
  var keyCodeMap = {
    esc: 27,
    enter: 13
  };

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
    mainPin: MAIN_PIN,
    isActive: isActive,
    arr: dataArr,
    types: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    },
    keyCodes: keyCodeMap
  };
})();
