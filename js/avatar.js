'use strict';
(function () {

  var fileTypes = window.data.fileTypes;
  var avatarfileChooser = document.querySelector('#avatar');
  var avatarContainer = document.querySelector('.ad-form-header__preview');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var firstFile = 0;

  avatarfileChooser.addEventListener('change', function () {
    var file = avatarfileChooser.files[firstFile];
    var fileName = file.name.toLowerCase();

    var matches = fileTypes.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarContainer.style.padding = '0';
        avatar.height = '70';
        avatar.width = '70';
        avatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var resetAvatar = function () {
    avatarContainer.style.padding = '0 15px';
    avatar.height = '44';
    avatar.width = '40';
    avatar.src = 'img/muffin-grey.svg';
  };

  window.avatar = {
    reset: resetAvatar
  };
})();
