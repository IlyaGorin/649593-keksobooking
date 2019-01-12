'use strict';

(function () {
  var loadURL = window.data.AddressURL.LOAD;
  var uploadURL = window.data.AddressURL.UPLOAD;
  var timeout = window.data.timeout;
  var statusOk = window.data.StatusCodes.OK;
  var escButton = window.data.KeyCodes.ESC;

  var xhrSend = function (loadHandler, errorHandler, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = timeout;
    xhr.open(method, url);

    xhr.send(data);

  };

  var load = function (loadHandler, errorHandler) {
    xhrSend(loadHandler, errorHandler, loadURL, 'GET');
  };

  var upload = function (formData, loadHandler, errorHandler) {
    xhrSend(loadHandler, errorHandler, uploadURL, 'POST', formData);
  };

  var errorHandler = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorMessage = errorElement.querySelector('.error__message');
    var errorButton = errorElement.querySelector('.error__button');
    var errorClose = function () {
      errorElement.remove();
    };
    errorButton.addEventListener('click', errorClose);
    document.addEventListener('click', errorClose);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === escButton) {
        errorClose();
      }
    });
    errorMessage.textContent = message;
    main.insertAdjacentElement('afterbegin', errorElement);
  };


  window.backend = {
    upload: upload,
    load: load,
    errorHandler: errorHandler
  };
})();
