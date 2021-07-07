'use strict';
import galleryItems from './script.js';
const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  btnModalOpen: document.createElement('img'),
  backdrop: document.querySelector('.js-lightbox'),
  modal: document.querySelector('.lightbox__content'),
  lightboxImg: document.querySelector('.lightbox__image'),
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

refs.galleryEl.addEventListener('click', onClickGallery);
// refs.btnModalClose.addEventListener('click', onCloseModal);
// refs.modal.addEventListener('click', onClickCloseLightbox);
function onClickGallery(event) {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }
  if (target.nodeName === 'IMG') {
    refs.backdrop.classList.add('is-open');
    refs.lightboxImg.src = target.getAttribute('data-source');
    refs.lightboxImg.alt = target.alt;
  }
  // window.addEventListener('keyup', clickKey);
}
refs.btnModalClose.onclick = function onCloseModal(event) {
  return refs.backdrop.classList.remove('is-open');
};
