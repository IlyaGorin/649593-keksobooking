'use strict';

(function () {
  var card = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');

  var renderAnnoucementCard = function (obj) {
    var cardItem = card.cloneNode(true);
    if (obj.offer.title !== '') {
      cardItem.querySelector('.popup__title').textContent = obj.offer.title;
    } else {
      cardItem.querySelector('.popup__title').remove;
    }
    cardItem.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardItem.querySelector('.popup__text--price').textContent = obj.offer.price + ' ' + '₽/ночь';
    cardItem.querySelector('.popup__avatar').src = obj.author.avatar;
    var closeButton = cardItem.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      window.util.closeCard();
    });
    window.addEventListener('keydown', function (keydownEvt) {
      if (keydownEvt.keyCode === window.data.esc) {
        window.util.closeCard();
      }
    });
    var cardType = cardItem.querySelector('.popup__type');

    cardType.textContent = window.data.types[obj.offer.type];

    cardItem.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей.';
    cardItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд после ' + obj.offer.checkout;
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
  window.renderAnnoucementCard = renderAnnoucementCard;
})();
