'use strict';

(function () {
  var switchesFieldsetsValue = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
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
    window.backend.load(function(arr){
      window.renderAnnoucementCard(arr[id]);
    });
  };

  window.util = {
    switchesFieldsetsValue: switchesFieldsetsValue,
    closeCard: closeCard,
    openCard: openCard
  };
})();
