'use strict';

(function () {
  var debounceInterval = window.data.debounceInterval;

  var switchesFieldsetsValue = function (arr, value) {
    arr.forEach(function (el) {
      el.disabled = value;
    });
  };

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, debounceInterval);
  };

  window.util = {
    switchesFieldsetsValue: switchesFieldsetsValue,
    debounce: debounce,
  };
})();
