import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onImageClick);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}" rel='noreferrer noopener nofollow'>
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </div> 
        `;
    })
    .join('');
}

function onImageClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const imageSource = event.target.dataset.source;

  const instance = basicLightbox.create(
    `
    <img src='${imageSource}'>
  `,
    {
      onShow: () => {
        window.addEventListener('keydown', onEscapePress);
      },
      onClose: () => {
        window.removeEventListener('keydown', onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(event) {
    if (event.key === 'Escape') {
      instance.close();
    }
  }
}
