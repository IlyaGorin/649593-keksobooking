'use strict';

(function () {

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;

  var xhrSend = function (onLoad, onError, url, method, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    xhrSend(onLoad, onError, LOAD_URL, 'GET');
  };

  var upload = function (formData, onLoad, onError) {
    xhrSend(onLoad, onError, UPLOAD_URL, 'POST', formData);
  };

  var onError = function (message) {
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
      if (evt.keyCode === window.data.esc) {
        errorClose();
      }
    });
    errorMessage.textContent = message;
    main.insertAdjacentElement('afterbegin', errorElement);
  };


  window.backend = {
    upload: upload,
    load: load,
    onError: onError
  };
})();
