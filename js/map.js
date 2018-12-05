'use strict';

var MIN_PRICE = 1000;
var MAX_PRICE = 1000001;
var MIN_ROOMS = 1;
var MAX_ROOMS = 6;
var MIN_GUESTS = 1;
var MAX_GUESTS = 11;
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1100;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 631;
var ANNOUNCEMENT_AMOUNT = 8;
var PIN_AMOUNT = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var card = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');
map.classList.toggle('map--faded');


///Случайное число из дипозона
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

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
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var featuresArr = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArr = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var shuffle = function (anyArr) {
  var j, temp;
  for (var i = anyArr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = anyArr[j];
    anyArr[j] = anyArr[i];
    anyArr[i] = temp;
  }
  return anyArr;
}

var getRandomNumberArr = function (arr) {
  shuffle(arr);
  var number = arr[0];
  return number;
}

var getRandomLengthArray = function (arr) {
  var newArr = shuffle(arr.slice(getRandomNumber(0, arr.length)));
  return newArr;
}


console.log(getRandomLengthArray(featuresArr))
var getRandomObj = function (amount) {
  var arr = [];
  for (var i = 0; i < amount; i++) {
    var locationX = getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X);
    var locationY = getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y);
    arr[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandomNumberArr(titles),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomNumberArr(types),
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
    }
  };

  return arr;
};

var announcementsArr = getRandomObj(ANNOUNCEMENT_AMOUNT);
var firstObj = announcementsArr[0];

var createPinArr = function (amount) {
  for (var i = 0; i < amount; i++) {
    var pinItem = pin.cloneNode(true);
    var pinListFragment = document.createDocumentFragment();
    pinListFragment.appendChild(pinItem)
    pinList.appendChild(pinListFragment);
    pinItem.style.left = (announcementsArr[i].location.x + PIN_HEIGHT / 2) + 'px';
    pinItem.style.top = announcementsArr[i].location.y + PIN_HEIGHT + 'px';
    var pinItemImage = pinItem.querySelector('img');
    pinItemImage.src = announcementsArr[i].author.avatar;
    pinItemImage.alt = announcementsArr[i].offer.title;
  }
  return pinListFragment;
}
createPinArr(PIN_AMOUNT);

var createAnnouncementCard = function () {
  var cardItem = card.cloneNode(true);
  map.insertBefore(cardItem, filtersContainer);
  cardItem.querySelector('.popup__title').textContent = firstObj.offer.title;
  cardItem.querySelector('.popup__text--address').textContent = firstObj.offer.address;
  cardItem.querySelector('.popup__text--price').textContent = firstObj.offer.price + ' ' + '₽/ночь';
  var cardType = cardItem.querySelector('.popup__type');
  if (firstObj.offer.type === 'palace') {
    cardType.textContent = 'Дворец';
  } else if (firstObj.offer.type === 'flat') {
    cardType.textContent = 'Квартира';
  } else if (firstObj.offer.type === 'bungalo') {
    cardType.textContent = 'Бунгало';
  } else {
    cardType.textContent = 'Дом';
  };

  cardItem.querySelector('.popup__text--capacity').textContent = firstObj.offer.rooms + ' комнаты для ' + firstObj.offer.guests + ' гостей.'
  cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + firstObj.offer.checkin + ', выезд после ' + firstObj.offer.checkout;

  var features = cardItem.querySelector('.popup__features');
  features.innerHTML = '';
  var featuresList = features.cloneNode(true);
  console.log(featuresList);
  var featuresListFragment = document.createDocumentFragment();

  for (var i = 0; i < firstObj.offer.features.length; i++) {
    var featuresItem = document.createElement('li');
    featuresItem.classList = 'popup__feature popup__feature--' + firstObj.offer.features[i];
    featuresListFragment.appendChild(featuresItem);
  }

  features.appendChild(featuresListFragment);

  cardItem.querySelector('.popup__description').textContent = firstObj.offer.description;
  var photos = cardItem.querySelector('.popup__photos');
  var photosImg = photos.querySelector('.popup__photo');
  console.log(photosImg);
  var photosList = photos.cloneNode(true);
  photos.innerHTML = '';
  var photosListFragment = document.createDocumentFragment();

  for (var i = 0; i < firstObj.offer.photos.length; i++) {
    var photosItem = photosImg.cloneNode(true);
    photosItem.src = photosArr[i];
    photosListFragment.appendChild(photosItem);
  }

  photos.appendChild(photosListFragment);
  console.log(photosItem);
  console.log(photosListFragment);
}

createAnnouncementCard();
