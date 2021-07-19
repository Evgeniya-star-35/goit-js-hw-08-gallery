'use strict';
import galleryItems from './script.js';
const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  backdrop: document.querySelector('.js-lightbox'),
  modal: document.querySelector('.lightbox__content'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('div.lightbox__overlay'),
  btnModalClose: document.querySelector('[data-action="close-lightbox"]'),
};
// ххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххх

// const createGallery = ({ preview, original, description }) =>
//   `<li class = gallery__item ><a class = gallery__link href = '${original}'><img class = gallery__image src = '${preview}'data-source = '${original}
//   alt = '${description}'/></a></li>`;
// const showGallery = galleryItems.reduce(
//   (acc, item) => acc + createGallery(item),
//   '',
// );
// refs.galleryEl.insertAdjacentHTML('beforeend', showGallery);
// хххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххххх

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `<li class="gallery__item ><a class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}" data-index="${index}"
      />
    </a>
  </li>`;
    })
    .join('');
}

const imgGallery = createGallery(galleryItems);

refs.galleryEl.insertAdjacentHTML('beforeend', imgGallery);

refs.galleryEl.addEventListener('click', onClickGalleryItem);
refs.btnModalClose.addEventListener('click', onCloseButtonClick);
refs.lightboxOverlay.addEventListener('click', onCloseOverlayClick);

function onClickGalleryItem(e) {
  e.preventDefault();
  window.addEventListener('keydown', onClickEsc);
  const target = e.target;
  if (target.nodeName !== 'IMG') {
    return;
  }
  if (target.nodeName === 'IMG') {
    refs.backdrop.classList.add('is-open');
    // refs.lightboxImg.src = target.getAttribute('data-source');
    refs.lightboxImg.src = target.dataset.source;
    refs.lightboxImg.alt = target.alt;
    refs.lightboxImg.dataset.index = e.target.dataset.index;
  }
}
function onClickCloseModal() {
  refs.backdrop.classList.remove('is-open');
}

function onCloseButtonClick(e) {
  window.removeEventListener('keydown', onClickEsc);

  e.preventDefault();
  onClickCloseModal();
  refs.lightboxImg.src = '';
  refs.lightboxImg.alt = '';
}
function onCloseOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onClickCloseModal();
  }
}

function onClickEsc(e) {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onClickCloseModal();
  }
}
window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    onArrowLeft();
  }
  if (e.code === 'ArrowRight') {
    onArrowRight();
  }
});

function onArrowLeft() {
  let index = +refs.lightboxImg.dataset.index;

  if (index === 0) {
    newSrc(index, galleryItems.length - 1);
    return;
  }
  newSrc(index, -1);
}
function onArrowRight() {
  let index = +refs.lightboxImg.dataset.index;
  if (index === galleryItems.length - 1) {
    newSrc(0);
    return;
  }
  newSrc(index, 1);
}

function newSrc(index, step = 0) {
  refs.lightboxImg.dataset.index = `${index + step}`;
  refs.lightboxImg.src = galleryItems[index + step].original;
}
