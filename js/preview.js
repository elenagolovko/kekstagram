'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.cancel');
  var commentsList = document.querySelector('.social__comments');

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideBigPicture();
    }
  };

  var resetComments = function () {
    commentsList.textContent = '';
  };

  var hideBigPicture = function () {
    bigPicture.classList.add('hidden');
    closeBigPicture.removeEventListener('click', hideBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
    resetComments();
  };

  var initComments = function (text) {
    var img = window.data.makeElement('img', 'social__picture');
    img.src = 'img/avatar-' + window.data.getRandomInt(1, 6) + '.svg';
    img.alt = 'Аватар комментатора фотографии';
    img.width = '35';
    img.height = '35';

    var comment = window.data.makeElement('li', ['social__comment', 'social__comment--text']);
    comment.appendChild(img);
    comment.appendChild(document.createTextNode(text));

    return comment;
  };

  var initBigPictureData = function (picture) {
    resetComments();
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = picture.comments[0];
    for (var j = 0; j < picture.comments.length; j++) {
      var bigPictureComments = initComments(picture.comments[j]);
      commentsList.appendChild(bigPictureComments);
    }
  };

  var openBigPicture = function () {
    bigPicture.classList.remove('hidden');
    closeBigPicture.addEventListener('click', hideBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  window.preview = {
    initBigPictureData: initBigPictureData,
    openBigPicture: openBigPicture
  };
})();
