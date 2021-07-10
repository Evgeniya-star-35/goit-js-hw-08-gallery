'use strict';
import galleryItems from './script.js';
const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  btnModalOpen: document.createElement('img'),
  backdrop: document.querySelector('.js-lightbox'),
  modal: document.querySelector('.lightbox__content'),
  lightboxImg: document.querySelector('.lightbox__image'),
  lightboxOverlay: document.querySelector('div.lightbox__overlay'),
  btnModalClose: document.querySelector('[data-action="close-lightbox"]'),
};

const createGallery = ({ preview, original, description }) =>
  `<li class = gallery__item data-action="open-lightbox"><a class = gallery__link href = '${original}'><img class = gallery__image src = '${preview}'data-source = '${original}'
   alt = '${description}'/></a></li>`;
const showGallery = galleryItems.reduce(
  (acc, item) => acc + createGallery(item),
  '',
);
refs.galleryEl.insertAdjacentHTML('beforeend', showGallery);

refs.galleryEl.addEventListener('click', onClickGalleryItem);

// refs.modal.addEventListener('click', onClickCloseLightbox);
function onClickGalleryItem(event) {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }
  if (target.nodeName === 'IMG') {
    refs.backdrop.classList.add('is-open');
    // refs.lightboxImg.src = target.getAttribute('data-source');
    refs.lightboxImg.src = target.dataset.source;
    refs.lightboxImg.alt = target.alt;
  }
}
refs.btnModalClose.onclick = function onCloseModal(event) {
  event.preventDefault();
  refs.backdrop.classList.remove('is-open');
  refs.lightboxImg.src = '';
  refs.lightboxImg.alt = '';
};
refs.lightboxOverlay.onclick = function onCloseModalOverlay(event) {
  refs.backdrop.classList.remove('is-open');
};
window.addEventListener('keydown', onclickEsc);
function onclickEsc(event) {
  if (event.code === 'Escape') {
    refs.backdrop.classList.remove('is-open');
  }
}
