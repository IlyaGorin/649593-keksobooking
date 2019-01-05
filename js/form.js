'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var filtersForm = document.querySelectorAll('.map__filter');
  var fieldsets = document.querySelectorAll('fieldset');

  var formTitle = form.querySelector('#title');
  formTitle.required = true;
  formTitle.maxLength = 100;
  formTitle.minLength = 30;

  var formPrice = form.querySelector('#price');
  formPrice.required = true;
  formPrice.max = 1000000;

  var formType = form.querySelector('#type');

  var minPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var setMinPrice = function (price) {
    formPrice.min = price;
    formPrice.placeholder = price;
  };

  var switchesFieldsetsValue = window.util.switchesFieldsetsValue;
  var mainPin = window.data.mainPin;
  var pinCoordY = window.data.pinCoordY;
  var pinCoordX = window.data.pinCoordX;
  var mainPinWidth = window.data.mainPinWidth;
  var mainPinHeight = window.data.mainPinHeight;
  var closeCard = window.util.closeCard;
  var addressInput = window.map.addressInput;

  var getMainPinCoordinates = function (coordX, coodrY, pinWidth, pinHeight) {
    var coordinateX = String(coordX + Math.round(pinWidth));
    var coordinateY = String(coodrY + Math.round(pinHeight));
    addressInput.value = coordinateX + ' , ' + coordinateY;
    return addressInput.value;
  };

  addressInput.readOnly = true;
  addressInput.disabled = true;
  switchesFieldsetsValue(filtersForm, true);
  switchesFieldsetsValue(fieldsets, true);

  formType.addEventListener('change', function (evt) {
    setMinPrice(minPrice[evt.target.value]);
  });

  var roomNumbers = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var capacityOption = capacity.querySelectorAll('option');
  var submitButton = form.querySelector('.ad-form__submit');
  switchesFieldsetsValue(capacityOption, true);
  capacityOption[2].disabled = false;

  roomNumbers.addEventListener('change', function (evt) {
    switchesFieldsetsValue(capacityOption, true);
    var currentValue = evt.target.value;
    if (currentValue === '100') {
      capacityOption[capacityOption.length - 1].disabled = false;
      capacityOption[capacityOption.length - 1].selected = true;
    } else {
      for (var i = 0; i < capacityOption.length; i++) {
        if (currentValue >= capacityOption[i].value) {
          capacityOption[i].disabled = false;
          capacityOption[capacityOption.length - 1].disabled = true;
        }
      }
    }
  });

  var timesIn = document.querySelector('#timein');
  var timesOut = document.querySelector('#timeout');

  timesIn.addEventListener('change', function (evt) {
    timesOut.value = evt.target.value;
  });
  timesOut.addEventListener('change', function (evt) {
    timesIn.value = evt.target.value;
  });

  var formInput = form.querySelectorAll('input');
  var resetButton = form.querySelector('.ad-form__reset');

  var resetButtonClickHandler = function () {
    form.reset();
    window.map.field.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }

    closeCard();

    for (var j = 0; j < formInput.length; j++) {
      formInput[j].style.boxShadow = '';
    }

    capacity.style.boxShadow = '';

    switchesFieldsetsValue(filtersForm, true);
    switchesFieldsetsValue(fieldsets, true);
    mainPin.style.top = pinCoordY + 'px';
    mainPin.style.left = pinCoordX + 'px';
    getMainPinCoordinates(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10), mainPinWidth, mainPinHeight);
    window.data.isActive = false;
  };

  resetButton.addEventListener('click', resetButtonClickHandler);

  var onLoad = function () {
    resetButtonClickHandler();
    var main = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var closeMessage = function () {
      successElement.remove();
    };
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === data.esc) {
        closeMessage();
      }
    });
    main.insertAdjacentElement('afterbegin', successElement);
  }

  var submitButtonClickHandler = function () {
    // evt.preventDefault();
    capacity.setCustomValidity('');
    capacity.style.boxShadow = '';
    if (capacity[capacity.selectedIndex].disabled) {
      capacity.setCustomValidity('Выбрано неверное количество мест');
      capacity.style.boxShadow = '0 0 3px 3px red';
    }

    for (var i = 0; i < formInput.length; i++) {
      formInput[i].style.boxShadow = '';
      if (!formInput[i].checkValidity()) {
        formInput[i].style.boxShadow = '0 0 3px 3px red';
      }
    }
  };

  submitButton.addEventListener('click', submitButtonClickHandler);
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(form), onLoad, window.backend.onError)
  });


  window.form = {
    container: form,
    filtersForm: filtersForm,
    fieldsets: fieldsets,
    getMainPinCoordinates: getMainPinCoordinates
  };
})();
