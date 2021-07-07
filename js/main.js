import galleryItems from './script.js';
const refs = {
  galleryEl: document.querySelector('.js-gallery'),
  itemGalleryEl: document.querySelector('.gallery__item'),
  divLightboxEl: document.querySelector('.js-lightbox'),
  divLightboxOverlay: document.querySelector('.lightbox__overlay'),
  divLightboxContent: document.querySelector('.lightbox__content'),
  lightboxImage: document.querySelector('.lightbox__image'),
  btnModalClose: document.querySelector('[data-action="close-lightbox]'),
};

const createGallery = ({ preview, original, description }) =>
  `<li class = gallery__item data-action="open-lightbox"><a class = gallery__link href = '${original}'><img class = gallery__image src = '${preview}'data-source = '${original}'
   alt = '${description}'/></a></li>`;
const showGallery = galleryItems.reduce(
  (acc, item) => acc + createGallery(item),
  '',
);
refs.galleryEl.insertAdjacentHTML('beforeend', showGallery);
refs.galleryEl.addEventListener('click', onOpenModal);
// refs.btnModalClose.addEventListener('click', onCloseModal);
function onOpenModal(event) {
  event.preventDefault();
  console.log(event.currentTarget);
  refs.divLightboxEl.classList.add('is-open');
  refs.divLightboxEl.classList.add('lightbox__content');

  // const target = event.target;
  // console.log(target);
  // if (target.nodeName !== 'LI') {
  //   return;
  // }
}
// function onCloseModal() {
//   refs.divLightboxEl.classList.remove('is-open');
// }
