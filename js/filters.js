'use strict';

(function () {

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var closeCard = window.card.close;
  var debounce = window.util.debounce;
  var renderPin = window.pin.render;
  var priceMap = {
    min: 10000,
    max: 50000
  };


  var updatePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pinElement) {
      pinElement.remove();
    });
    closeCard();

    var filter = function (el) {
      var typeRes = true;
      var priceRes = true;
      var roomsRes = true;
      var guestsRes = true;
      var featuresRes = true;
      var featuresChecked = housingFeatures.querySelectorAll('input:checked');

      if (housingType.options[housingType.selectedIndex].value !== 'any') {
        typeRes = el.offer.type === housingType.options[housingType.selectedIndex].value;
      }

      if (housingRooms.options[housingRooms.selectedIndex].value !== 'any') {
        roomsRes = el.offer.rooms === parseInt(housingRooms.options[housingRooms.selectedIndex].value, 10);
      }

      if (housingGuests.options[housingGuests.selectedIndex].value !== 'any') {
        guestsRes = el.offer.guests === parseInt(housingGuests.options[housingGuests.selectedIndex].value, 10);
      }

      if (housingPrice.options[housingPrice.selectedIndex].value !== 'any') {
        switch (housingPrice.options[housingPrice.selectedIndex].value) {
          case 'middle':
            priceRes = (el.offer.price > priceMap.min && el.offer.price < priceMap.max);
            break;
          case 'low':
            priceRes = el.offer.price < priceMap.min;
            break;
          case 'high':
            priceRes = el.offer.price > priceMap.max;
            break;
        }
      }

      featuresChecked.forEach(function (feature) {
        if (el.offer.features.indexOf(feature.value) === -1) {
          featuresRes = false;
        }
      });

      return typeRes && priceRes && roomsRes && guestsRes && featuresRes;
    };
    var filteredArr = window.data.arr.filter(filter);

    renderPin(filteredArr);
  };


  var selectChangeHandler = function () {
    debounce(updatePins);
  };


  mapFilters.addEventListener('change', function () {
    selectChangeHandler();
  });
})();
