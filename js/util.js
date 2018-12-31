'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * ((max + 1) - min)) + min;
  };

  var shuffle = function (anyArr) {
    var newArr = anyArr.slice(0);
    var j;
    var temp;
    for (var i = newArr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = newArr[j];
      newArr[j] = newArr[i];
      newArr[i] = temp;
    }
    return newArr;
  };

  var getRandomNumberArr = function (arr) {
    shuffle(arr);
    var number = arr[0];
    return number;
  };

  var getRandomLengthArray = function (arr) {
    var newArr = shuffle(arr.slice(getRandomNumber(0, arr.length)));
    return newArr;
  };

  var switchesFieldsetsValue = function (arr, value) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].disabled = value;
    }
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    shuffle: shuffle,
    getRandomNumberArr: getRandomNumberArr,
    getRandomLengthArray: getRandomLengthArray,
    switchesFieldsetsValue: switchesFieldsetsValue
  };
})();
