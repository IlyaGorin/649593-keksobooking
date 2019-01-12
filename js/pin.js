'use strict';

(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins');
  var closeCard = window.card.close;
  var openCard = window.card.open;
  var announcementAmount = window.data.announcementAmount;

  var renderPins = function (arr) {
    var pinListFragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length && i < announcementAmount; i++) {
      var pinItem = pin.cloneNode(true);
      pinItem.style.left = (arr[i].location.x - window.data.pinWidth / 2) + 'px';
      pinItem.style.top = arr[i].location.y - window.data.announcementPin + 'px';
      var pinItemImage = pinItem.querySelector('img');
      pinItemImage.src = arr[i].author.avatar;
      pinItemImage.alt = arr[i].offer.title;
      pinItem.dataset.id = i;
      pinItem.addEventListener('click', function (evt) {
        var button = evt.currentTarget;
        var pinId = button.dataset.id;
        closeCard();
        if (button.classList.contains('map__pin--active')) {
          button.classList.remove('map__pin--active');
        } else {
          button.classList.add('map__pin--active');
        }
        openCard(pinId, arr);
      });
      pinListFragment.appendChild(pinItem);
    }
    pinList.appendChild(pinListFragment);
  };

  window.pin = {
    render: renderPins,
    list: pinList
  };
})();
