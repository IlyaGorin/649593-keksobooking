'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');
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

  addressInput.readOnly = true;
  addressInput.disabled = true;
  window.util.switchesFieldsetsValue(filtersForm, true);
  window.util.switchesFieldsetsValue(fieldsets, true);

  formType.addEventListener('change', function (evt) {
    setMinPrice(minPrice[evt.target.value]);
  });


  var roomNumbers = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var capacityOption = capacity.querySelectorAll('option');
  var submitButton = form.querySelector('.ad-form__submit');
  window.util.switchesFieldsetsValue(capacityOption, true);
  capacityOption[2].disabled = false;

  roomNumbers.addEventListener('change', function (evt) {
    window.util.switchesFieldsetsValue(capacityOption, true);
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
    window.map.map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }

    window.map.closeCard();

    for (var j = 0; j < formInput.length; j++) {
      formInput[j].style.boxShadow = '';
    }

    capacity.style.boxShadow = '';

    window.util.switchesFieldsetsValue(filtersForm, true);
    window.util.switchesFieldsetsValue(fieldsets, true);
    window.data.mainPin.style.top = window.data.pinCoordY + 'px';
    window.data.mainPin.style.left = window.data.pinCoordX + 'px';
    window.map.getMainPinCoordinates(parseInt(window.data.mainPin.style.left, 10), parseInt(window.data.mainPin.style.top, 10), window.data.mainPinWidth, window.data.mainPinHeight);
    window.data.isActive = false;
  };

  resetButton.addEventListener('click', resetButtonClickHandler);

  var submitButtonClickHandler = function () {
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

  window.form = {
    form: form,
    addressInput: addressInput,
    filtersForm: filtersForm,
    fieldsets: fieldsets
  };
})();
