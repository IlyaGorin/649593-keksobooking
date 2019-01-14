'use strict';
(function () {
  var fileTypes = window.data.fileTypes;
  var imagesFileChooser = document.querySelector('#images');
  var imageTemplate = document.querySelector('.ad-form__photo');
  var imageContainer = document.querySelector('.ad-form__photo-container');

  imagesFileChooser.addEventListener('change', function () {
    var files = imagesFileChooser.files;

    var uploadImage = function (file) {
      var fileName = file.name.toLowerCase();
      var matches = fileTypes.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var image = document.createElement('img');
          imageTemplate.appendChild(image);
          var imageBlockCopy = imageTemplate.cloneNode(true);
          var imageCopy = imageBlockCopy.querySelector('img');
          imageCopy.width = '70';
          imageCopy.height = '70';
          imageCopy.src = reader.result;
          imageContainer.appendChild(imageBlockCopy);
        });
        reader.readAsDataURL(file);
      }
    };

    for (var i = 0; i < files.length; i++) {
      uploadImage(files[i]);
    }

    imageTemplate.remove();
  });

  var resetImages = function () {
    var images = imageContainer.querySelectorAll('.ad-form__photo');
    images.forEach(function (image) {
      image.remove();
      imageContainer.appendChild(imageTemplate);
    });
  };

  window.images = {
    reset: resetImages
  };
})();
