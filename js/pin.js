'use strict';

(function () {

  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinList = document.querySelector('.map__pins');

  var renderPins = function (arr) {
    var pinListFragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length && i < 5; i++) {
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
        window.util.closeCard();
        window.util.openCard(pinId);
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
