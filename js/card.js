'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderAnnoucementCard = function (obj) {
    var cardItem = card.cloneNode(true);
    cardItem.querySelector('.popup__title').textContent = obj.offer.title;
    cardItem.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = obj.offer.price + ' ' + '₽/ночь';
    cardItem.querySelector('.popup__avatar').src = obj.author.avatar;
    var cardType = cardItem.querySelector('.popup__type');

    cardType.textContent = window.data.types[obj.offer.type];

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
    window.map.map.insertBefore(cardItem, filtersContainer);
  };

  window.renderAnnoucementCard = renderAnnoucementCard;
})();
