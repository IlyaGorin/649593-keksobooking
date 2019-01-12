'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  var typesMap = window.data.typesMap;
  var escButton = window.data.KeyCodes.ESC;

  var renderAnnoucementCard = function (obj) {
    var cardItem = cardTemplate.cloneNode(true);
    if (obj.offer.title !== '') {
      cardItem.querySelector('.popup__title').textContent = obj.offer.title;
    } else {
      cardItem.querySelector('.popup__title').remove();
    }
    if (obj.offer.address !== '') {
      cardItem.querySelector('.popup__text--address').textContent = obj.offer.address;
    } else {
      cardItem.querySelector('.popup__text--address').remove();
    }
    if (obj.offer.price !== '') {
      cardItem.querySelector('.popup__text--price').textContent = obj.offer.price + ' ' + '₽/ночь';
    } else {
      cardItem.querySelector('.popup__text--price').remove();
    }
    if (obj.author.avatar !== '') {
      cardItem.querySelector('.popup__avatar').src = obj.author.avatar;
    } else {
      cardItem.querySelector('.popup__avatar').remove();
    }

    var closeButton = cardItem.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closeCard();
    });

    window.addEventListener('keydown', escButtonHandler);

    var cardType = cardItem.querySelector('.popup__type');

    cardType.textContent = typesMap[obj.offer.type];
    if (obj.offer.rooms !== '' || obj.offer.guests !== '') {
      cardItem.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей.';
    } else {
      cardItem.querySelector('.popup__text--capacity').remove();
    }

    if (obj.offer.checkin !== '' || obj.offer.checkout !== '') {
      cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд после ' + obj.offer.checkout;
    } else {
      cardItem.querySelector('.popup__text--time').remove();
    }
    var features = cardItem.querySelector('.popup__features');
    features.innerHTML = '';
    var featuresListFragment = document.createDocumentFragment();

    if (obj.offer.features.length !== 0) {
      for (var i = 0; i < obj.offer.features.length; i++) {
        var featuresItem = document.createElement('li');
        featuresItem.classList = 'popup__feature popup__feature--' + obj.offer.features[i];
        featuresListFragment.appendChild(featuresItem);
      }
    } else {
      features.remove();
    }
    features.appendChild(featuresListFragment);

    cardItem.querySelector('.popup__description').textContent = obj.offer.description;
    var photos = cardItem.querySelector('.popup__photos');
    var photosImg = photos.querySelector('.popup__photo');
    photos.innerHTML = '';
    if (obj.offer.photos.length !== 0) {
      for (var j = 0; j < obj.offer.photos.length; j++) {
        var photosItem = photosImg.cloneNode(true);
        photosItem.src = obj.offer.photos[j];
        photos.appendChild(photosItem);
      }
    } else {
      photos.remove();
    }
    window.map.field.insertBefore(cardItem, filtersContainer);
    return cardItem;
  };
  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    var pinActive = document.querySelector('.map__pin--active');
    if (mapCard) {
      mapCard.remove();
      pinActive.classList.remove('map__pin--active');
      window.removeEventListener('keydown', escButtonHandler);
    }
  };

  var openCard = function (id, arr) {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      closeCard();
    }
    renderAnnoucementCard(arr[id], arr);
  };

  var escButtonHandler = function (evt) {
    if (evt.keyCode === escButton) {
      closeCard();
    }
  };

  window.card = {
    render: renderAnnoucementCard,
    open: openCard,
    close: closeCard
  };
})();
