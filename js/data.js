'use strict';

(function () {
  var PIN_WIDTH = 40;
  var ANNOUNCEMENT_PIN = 70;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var MIN_LOCATION_X = 0;
  var MAX_LOCATION_X = 1100;
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

  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photosArr = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var getRandomObj = function (amount) {
    var arr = [];
    for (var i = 0; i < amount; i++) {
      var locationX = window.util.getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
      var locationY = window.util.getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);
      var obj = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: titles[i],
          address: locationX + ', ' + locationY,
          price: window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: window.util.getRandomNumberArr(Object.keys(types)),
          rooms: window.util.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
          guests: window.util.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
          checkin: window.util.getRandomNumberArr(checkins),
          checkout: window.util.getRandomNumberArr(checkouts),
          features: window.util.getRandomLengthArray(featuresArr),
          description: '',
          photos: window.util.shuffle(photosArr)
        },
        location: {
          x: locationX,
          y: locationY
        }
      };

      arr.push(obj);
    }
    return arr;
  };

  window.data = {
    getRandomObj: getRandomObj,
    maxLocationX: MAX_LOCATION_Y,
    maxLocationY: MAX_LOCATION_Y,
    minLocationX: MIN_LOCATION_X,
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
    types: {
      palace: 'Дворец',
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    }
  };
})();
