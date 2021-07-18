const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image')
const btnRef = document.querySelector('[data-action="close-lightbox"]')
const overlayRef = document.querySelector('.lightbox__overlay');
const btnNextRef = document.querySelector('.lightbox__button-next');
const btnPreviousRef = document.querySelector('.lightbox__button-previous');

galleryRef.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems)); // Добавляем разметку в html
galleryRef.addEventListener('click', onImageClick); // Открыть модальное окно
btnRef.addEventListener('click', closeModal); // Закрыть модальное окна по клику на кнопку

// Создаем разметку

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
<a
  class="gallery__link"
  href=${original}
>
  <img
    class="gallery__image"
    src=${preview}
    data-source=${original}
    alt=${description}
  />
</a>
</li>
    `;
    })
    .join('');
}

// Открытие модального окна

function onImageClick(evt) {
  evt.preventDefault(); // отменяет переход по ссылке
  if (!evt.target.classList.contains('gallery__image')) { // Клик только на элемент .gallery__image
    return;
  }
  openModal(evt);
}

function openModal(evt) {
    lightboxRef.classList.add('is-open');
    lightboxImageRef.src = evt.target.dataset.source;
    lightboxImageRef.alt = evt.target.alt;

  window.addEventListener('keydown', escClose);
  window.addEventListener('keydown', arrowLeftPress);
  window.addEventListener('keydown', arrowRightPress);
  btnNextRef.addEventListener('click', btnsNextPreviousClick);
  btnPreviousRef.addEventListener('click', btnsNextPreviousClick);
  overlayRef.addEventListener('click', overlayCloseModal);
}

function closeModal(evt) {
    lightboxRef.classList.remove('is-open');
    lightboxImageRef.src = ' ';
    lightboxImageRef.alt = ' ';
}

// Закрытие модального окна по клику на ESC
  
function escClose(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

// Закрытие модального окна по клику на overlay.

function overlayCloseModal(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
}

// Переключение изображений стрелками на клавиатуре

function arrowLeftPress(evt) {
  if (evt.code === 'ArrowLeft') {
    previousImage()
  }
}
 
function arrowRightPress(evt) {
  if (evt.code === 'ArrowRight') {
   nextImage()
  }
}

// Переключение изображений кнопками(стрелками)

function btnsNextPreviousClick(evt) {
  if (evt.target === btnNextRef) {
    nextImage()
  }

  if (evt.target === btnPreviousRef) {
    previousImage()
  }
}

function nextImage() {
  const sources = galleryItems.map(({ original }) => original);
  let indexOfImg = sources.indexOf(lightboxImageRef.src);
    if (indexOfImg + 1 > sources.length - 1) {
      indexOfImg = -1;
    }
  lightboxImageRef.src = sources[indexOfImg + 1];
}

function previousImage() {
  const sources = galleryItems.map(({ original }) => original);
  let indexOfImg = sources.indexOf(lightboxImageRef.src);

    if (indexOfImg === 0) {
      indexOfImg = sources.length;
    }
  lightboxImageRef.src = sources[indexOfImg - 1];
}