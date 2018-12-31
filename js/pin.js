'use strict';

(function () {

  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins');

  var renderPins = function (amount) {
    var pinListFragment = document.createDocumentFragment();
    for (var i = 0; i < amount; i++) {
      var pinItem = pin.cloneNode(true);
      pinItem.style.left = (window.map.announcementsArr[i].location.x + window.data.pinWidth / 2) + 'px';
      pinItem.style.top = window.map.announcementsArr[i].location.y - window.data.announcementPin + 'px';
      var pinItemImage = pinItem.querySelector('img');
      pinItemImage.src = window.map.announcementsArr[i].author.avatar;
      pinItemImage.alt = window.map.announcementsArr[i].offer.title;
      pinItem.dataset.id = i;
      pinItem.addEventListener('click', function (evt) {
        var button = evt.currentTarget;
        var pinId = button.dataset.id;
        window.map.closeCard();
        window.map.openCard(pinId);
        var closeButton = document.querySelector('.popup__close');
        closeButton.addEventListener('click', function () {
          window.map.closeCard();
        });
        window.addEventListener('keydown', function (keydownEvt) {
          if (keydownEvt.keyCode === window.data.esc) {
            window.map.closeCard();
          }
        });
      });
      pinListFragment.appendChild(pinItem);
    }
    pinList.appendChild(pinListFragment);
  };
  window.renderPins = renderPins;
})();
