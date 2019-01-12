'use strict';

(function () {
  var debounceInterval = window.data.debounceInterval;

  var switchesFieldsetsValue = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
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
