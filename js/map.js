'use strict';
(function () {
  var map = document.querySelector('.map');
  var addressInput = document.querySelector('#address');
  var switchesFieldsetsValue = window.util.switchesFieldsetsValue;
  var mainPin = window.data.mainPin;
  var mainPinActiveHeight = window.data.mainPinActiveHeight;
  var mainPinWidth = window.data.mainPinWidth;
  var pinCoordX = window.data.pinCoordX;
  var pinCoordY = window.data.pinCoordY;
  var mainPinHeight = window.data.mainPinHeight;
  var enterButton = window.data.keyCodes.enter;
  var load = window.backend.load;

  var getMainPinCoordinates = function (coordX, coodrY, pinWidth, pinHeight) {
    var coordinateX = String(coordX + Math.round(pinWidth));
    var coordinateY = String(coodrY + Math.round(pinHeight));
    addressInput.value = coordinateX + ' , ' + coordinateY;
    return addressInput;
  };

  var pageActivation = function () {
    addressInput.disabled = false;
    map.classList.remove('map--faded');
    window.form.container.classList.remove('ad-form--disabled');
    switchesFieldsetsValue(window.form.filtersForm, false);
    switchesFieldsetsValue(window.form.fieldsets, false);
    var onLoadSuccess = function (arr) {
      window.data.arr = arr;
      window.pin.render(arr);
    };
    load(onLoadSuccess, window.backend.onError);
    window.data.isActive = true;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    getMainPinCoordinates(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10), mainPinWidth, mainPinActiveHeight);
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
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      var mapWidth = map.offsetWidth - mainPin.offsetWidth;
      var maxPositionY = window.data.maxLocationY - mainPinActiveHeight;
      var minPositionY = window.data.minLocationY - mainPinActiveHeight;

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

      mainPin.style.top = newCoords.y + 'px';
      mainPin.style.left = newCoords.x + 'px';
      getMainPinCoordinates(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10), mainPinWidth, mainPinActiveHeight);
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

  var enterButtonHandler = function (evt) {
    if (evt.keyCode === enterButton) {
      if (!window.data.isActive) {
        pageActivation();
      }
    }
  };

  mainPin.addEventListener('keydown', enterButtonHandler);

  getMainPinCoordinates(pinCoordX, pinCoordY, mainPinWidth, mainPinHeight);

  window.map = {
    field: map,
    addressInput: addressInput
  };
})();
