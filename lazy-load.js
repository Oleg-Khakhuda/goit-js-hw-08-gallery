const lazyGalleryItems = document.querySelectorAll('img[loading="lazy"]');

lazyGalleryItems.forEach(image => {
  image.addEventListener('load', onImageLoaded, { once: true });
});

function onImageLoaded(evt) {
  console.log('Картинка загрузилась');
  evt.target.classList.add('appear');
}