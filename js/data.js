'use strict';

(function () {
  var MAIN_PIN = document.querySelector('.map__pin--main');
  var PIN_WIDTH = 40;
  var PIN_POINTER_HEIGHT = 22;
  var ANNOUNCEMENT_PIN = 70;
  var MAIN_PIN_ACTIVE_HEIGHT = MAIN_PIN.offsetHeight + PIN_POINTER_HEIGHT;
  var TIMEOUT = 10000;
  var DEBOUNCE_INTERVAL = 500;
  var ANNOUNCEMENT_AMOUNT = 5;
  var SELECT_OPTION_DEFAULT = 2;
  var ROOMS_VALUE = '100';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var isActive = false;
  var dataArr = [];

  var Location = {
    MIN_LOCATION_Y: 130,
    MAX_LOCATION_Y: 630
  };

  var MainPinSize = {
    MAIN_PIN_WIDTH: MAIN_PIN.offsetWidth / 2,
    MAIN_PIN_HEIGHT: MAIN_PIN.offsetHeight / 2
  };

  var MainPinCoordintas = {
    MAIN_PIN_COORDINATE_X: parseInt(MAIN_PIN.style.left, 10),
    MAIN_PIN_COORDINATE_Y: parseInt(MAIN_PIN.style.top, 10)
  };

  var typesMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var AddressURL = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var StatusCodes = {
    OK: 200
  };

  window.data = {
    Location: Location,
    MainPinSize: MainPinSize,
    MainPinCoordintas: MainPinCoordintas,
    pinWidth: PIN_WIDTH,
    announcementPin: ANNOUNCEMENT_PIN,
    mainPinActiveHeight: MAIN_PIN_ACTIVE_HEIGHT,
    mainPin: MAIN_PIN,
    debounceInterval: DEBOUNCE_INTERVAL,
    announcementAmount: ANNOUNCEMENT_AMOUNT,
    selectOptionDefault: SELECT_OPTION_DEFAULT,
    roomsValue: ROOMS_VALUE,
    fileTypes: FILE_TYPES,
    isActive: isActive,
    arr: dataArr,
    typesMap: typesMap,
    KeyCodes: KeyCodes,
    StatusCodes: StatusCodes,
    AddressURL: AddressURL,
    timeout: TIMEOUT,
  };
})();
