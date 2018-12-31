'use strict';
(function () {
  var ANNOUNCEMENT_AMOUNT = 8;
  var PIN_AMOUNT = 8;

  var map = document.querySelector('.map');
  var announcementsArr = window.data.getRandomObj(ANNOUNCEMENT_AMOUNT);

  var getMainPinCoordinates = function (coordX, coodrY, pinWidth, pinHeight) {
    var coordinateX = String(coordX + Math.round(pinWidth));
    var coordinateY = String(coodrY + Math.round(pinHeight));
    window.form.addressInput.value = coordinateX + ' , ' + coordinateY;
    return window.form.addressInput;
  };

  var pageActivation = function () {
    window.form.addressInput.disabled = false;
    map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    window.util.switchesFieldsetsValue(window.form.filtersForm, false);
    window.util.switchesFieldsetsValue(window.form.fieldsets, false);
    window.renderPins(PIN_AMOUNT);
    window.data.isActive = true;
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
    window.renderAnnoucementCard(announcementsArr[id]);
  };

  window.data.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    getMainPinCoordinates(parseInt(window.data.mainPin.style.left, 10), parseInt(window.data.mainPin.style.top, 10), window.data.mainPinWidth, window.data.mainPinActiveHeight);
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
        x: window.data.mainPin.offsetLeft - shift.x,
        y: window.data.mainPin.offsetTop - shift.y
      };

      var mapWidth = map.offsetWidth - window.data.mainPin.offsetWidth;
      var maxPositionY = window.data.maxLocationY - window.data.mainPinActiveHeight;
      var minPositionY = window.data.minLocationY - window.data.mainPinActiveHeight;

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

      window.data.mainPin.style.top = newCoords.y + 'px';
      window.data.mainPin.style.left = newCoords.x + 'px';
      getMainPinCoordinates(parseInt(window.data.mainPin.style.left, 10), parseInt(window.data.mainPin.style.top, 10), window.data.mainPinWidth, window.data.mainPinActiveHeight);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!window.data.isActive) {
        pageActivation();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  getMainPinCoordinates(window.data.pinCoordX, window.data.pinCoordY, window.data.mainPinWidth, window.data.mainPinHeight);

  window.map = {
    map: map,
    announcementsArr: announcementsArr,
    closeCard: closeCard,
    openCard: openCard,
    getMainPinCoordinates: getMainPinCoordinates
  };
})();
