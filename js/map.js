'use strict';

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
var ANNOUNCEMENT_AMOUNT = 8;
var PIN_AMOUNT = 8;
var PIN_WIDTH = 40;
var ESC__KEYCODE = 27;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var fieldsets = document.querySelectorAll('fieldset');
var form = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');
var filtersForm = document.querySelectorAll('.map__filter');
var isActive = false;

var ANNOUNCEMENT_PIN = 70;
var PIN_POINTER_HEIGHT = 22;
var MAIN_PIN_WIDTH = mainPin.offsetWidth / 2;
var MAIN_PIN_HEIGHT = mainPin.offsetHeight / 2;
var MAIN_PIN_ACTIVE_HEIGHT = mainPin.offsetHeight + PIN_POINTER_HEIGHT;
var MAIN_PIN_COORDINATE_X = parseInt(mainPin.style.left, 10);
var MAIN_PIN_COORDINATE_Y = parseInt(mainPin.style.top, 10);

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var card = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
};
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

var shuffle = function (anyArr) {
  var newArr = anyArr.slice(0);
  var j;
  var temp;
  for (var i = newArr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = newArr[j];
    newArr[j] = newArr[i];
    newArr[i] = temp;
  }
  return newArr;
};

var getRandomNumberArr = function (arr) {
  shuffle(arr);
  var number = arr[0];
  return number;
};

var getRandomLengthArray = function (arr) {
  var newArr = shuffle(arr.slice(getRandomNumber(0, arr.length)));
  return newArr;
};

var getRandomObj = function (amount) {
  var arr = [];
  for (var i = 0; i < amount; i++) {
    var locationX = getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
    var locationY = getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);
    var obj = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomNumberArr(Object.keys(types)),
        rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: getRandomNumberArr(checkins),
        checkout: getRandomNumberArr(checkouts),
        features: getRandomLengthArray(featuresArr),
        description: '',
        photos: shuffle(photosArr)
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

var announcementsArr = getRandomObj(ANNOUNCEMENT_AMOUNT);

var renderPins = function (amount) {
  var pinListFragment = document.createDocumentFragment();
  for (var i = 0; i < amount; i++) {
    var pinItem = pin.cloneNode(true);
    pinItem.style.left = (announcementsArr[i].location.x + PIN_WIDTH / 2) + 'px';
    pinItem.style.top = announcementsArr[i].location.y - ANNOUNCEMENT_PIN + 'px';
    var pinItemImage = pinItem.querySelector('img');
    pinItemImage.src = announcementsArr[i].author.avatar;
    pinItemImage.alt = announcementsArr[i].offer.title;
    pinItem.dataset.id = i;
    pinItem.addEventListener('click', function (evt) {
      var button = evt.currentTarget;
      var pinId = button.dataset.id;
      closeCard();
      openCard(pinId);
      var closeButton = document.querySelector('.popup__close');
      closeButton.addEventListener('click', function () {
        closeCard();
      });
      window.addEventListener('keydown', function (keydownEvt) {
        if (keydownEvt.keyCode === ESC__KEYCODE) {
          closeCard();
        }
      });
    });
    pinListFragment.appendChild(pinItem);
  }
  pinList.appendChild(pinListFragment);
};

var renderAnnoucementCard = function (obj) {
  var cardItem = card.cloneNode(true);
  cardItem.querySelector('.popup__title').textContent = obj.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = obj.offer.price + ' ' + '₽/ночь';
  cardItem.querySelector('.popup__avatar').src = obj.author.avatar;
  var cardType = cardItem.querySelector('.popup__type');

  cardType.textContent = types[obj.offer.type];

  cardItem.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей.';
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд после ' + obj.offer.checkout;
  var features = cardItem.querySelector('.popup__features');
  features.innerHTML = '';
  var featuresListFragment = document.createDocumentFragment();

  for (var i = 0; i < obj.offer.features.length; i++) {
    var featuresItem = document.createElement('li');
    featuresItem.classList = 'popup__feature popup__feature--' + obj.offer.features[i];
    featuresListFragment.appendChild(featuresItem);
  }

  features.appendChild(featuresListFragment);
  cardItem.querySelector('.popup__description').textContent = obj.offer.description;
  var photos = cardItem.querySelector('.popup__photos');
  var photosImg = photos.querySelector('.popup__photo');
  photos.innerHTML = '';

  for (var j = 0; j < obj.offer.photos.length; j++) {
    var photosItem = photosImg.cloneNode(true);
    photosItem.src = obj.offer.photos[j];
    photos.appendChild(photosItem);
  }
  map.insertBefore(cardItem, filtersContainer);
};

addressInput.readOnly = true;
addressInput.disabled = true;

var switchesFieldsetsValue = function (arr, value) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].disabled = value;
  }
};

switchesFieldsetsValue(filtersForm, true);
switchesFieldsetsValue(fieldsets, true);

var pageActivation = function () {
  addressInput.disabled = false;
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  switchesFieldsetsValue(filtersForm, false);
  switchesFieldsetsValue(fieldsets, false);
  renderPins(PIN_AMOUNT);
  isActive = true;
};


var closeCard = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
};

var openCard = function (id) {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    closeCard();
  }
  renderAnnoucementCard(announcementsArr[id]);
};

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  getMainPinCoordinates(MAIN_PIN_COORDINATE_X, MAIN_PIN_COORDINATE_Y, MAIN_PIN_WIDTH, MAIN_PIN_ACTIVE_HEIGHT);
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var newCoords = {
      x: mainPin.offsetLeft - shift.x,
      y: mainPin.offsetTop - shift.y
    };

    var mapWidth = map.offsetWidth - mainPin.offsetWidth;
    var maxPositionY = MAX_LOCATION_Y - MAIN_PIN_ACTIVE_HEIGHT;
    var minPositionY = MIN_LOCATION_Y - MAIN_PIN_ACTIVE_HEIGHT;

    if (newCoords.x > mapWidth) {
      newCoords.x = mapWidth;
    }
    if (newCoords.x < 0) {
      newCoords.x = 0;
    }
    if (newCoords.y < minPositionY) {
      newCoords.y = minPositionY;
    }
    if (newCoords.y > maxPositionY) {
      newCoords.y = maxPositionY;
    }

    mainPin.style.top = newCoords.y + 'px';
    mainPin.style.left = newCoords.x + 'px';
    getMainPinCoordinates(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10), MAIN_PIN_WIDTH, MAIN_PIN_ACTIVE_HEIGHT);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (!isActive) {
      pageActivation();
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

});

// mainPin.addEventListener('mouseup', mainPinMouseupHandler);

var getMainPinCoordinates = function (coordX, coodrY, pinWidth, pinHeight) {
  var coordinateX = String(coordX + Math.round(pinWidth));
  var coordinateY = String(coodrY + Math.round(pinHeight));
  addressInput.value = coordinateX + ' , ' + coordinateY;
  return addressInput;
};

getMainPinCoordinates(MAIN_PIN_COORDINATE_X, MAIN_PIN_COORDINATE_Y, MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
var formTitle = form.querySelector('#title');
formTitle.required = true;
formTitle.maxLength = 100;
formTitle.minLength = 30;

var formPrice = form.querySelector('#price');
formPrice.required = true;
formPrice.max = 1000000;

var formType = form.querySelector('#type');

var minPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var setMinPrice = function (price) {
  formPrice.min = price;
  formPrice.placeholder = price;
};


formType.addEventListener('change', function (evt) {
  setMinPrice(minPrice[evt.target.value]);
});


var roomNumbers = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var capacityOption = capacity.querySelectorAll('option');
var submitButton = form.querySelector('.ad-form__submit');
switchesFieldsetsValue(capacityOption, true);
capacityOption[2].disabled = false;

roomNumbers.addEventListener('change', function (evt) {
  switchesFieldsetsValue(capacityOption, true);
  var currentValue = evt.target.value;
  if (currentValue === '100') {
    capacityOption[capacityOption.length - 1].disabled = false;
    capacityOption[capacityOption.length - 1].selected = true;
  } else {
    for (var i = 0; i < capacityOption.length; i++) {
      if (currentValue >= capacityOption[i].value) {
        capacityOption[i].disabled = false;
        capacityOption[capacityOption.length - 1].disabled = true;
      }
    }
  }
});

var timesIn = document.querySelector('#timein');
var timesOut = document.querySelector('#timeout');

timesIn.addEventListener('change', function (evt) {
  timesOut.value = evt.target.value;
});
timesOut.addEventListener('change', function (evt) {
  timesIn.value = evt.target.value;
});

var formInput = form.querySelectorAll('input');
var resetButton = form.querySelector('.ad-form__reset');

var resetButtonClickHandler = function () {
  form.reset();
  map.classList.add('map--faded');
  form.classList.add('ad-form--disabled');

  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < pins.length; i++) {
    pins[i].remove();
  }

  closeCard();

  for (var j = 0; j < formInput.length; j++) {
    formInput[j].style.boxShadow = '';
  }

  capacity.style.boxShadow = '';

  switchesFieldsetsValue(filtersForm, true);
  switchesFieldsetsValue(fieldsets, true);
  mainPin.style.top = MAIN_PIN_COORDINATE_Y + 'px';
  mainPin.style.left = MAIN_PIN_COORDINATE_X + 'px';
  getMainPinCoordinates(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10), MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT);
  isActive = false;
};

resetButton.addEventListener('click', resetButtonClickHandler);

var submitButtonClickHandler = function () {
  capacity.setCustomValidity('');
  capacity.style.boxShadow = '';
  if (capacity[capacity.selectedIndex].disabled) {
    capacity.setCustomValidity('Выбрано неверное количество мест');
    capacity.style.boxShadow = '0 0 3px 3px red';
  }

  for (var i = 0; i < formInput.length; i++) {
    formInput[i].style.boxShadow = '';
    if (!formInput[i].checkValidity()) {
      formInput[i].style.boxShadow = '0 0 3px 3px red';
    }
  }
};

submitButton.addEventListener('click', submitButtonClickHandler);
