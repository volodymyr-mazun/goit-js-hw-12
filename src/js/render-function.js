import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
        <li class="gallery-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" title="${tags}" />
            </a>
        <div class="img-container">
            <div class="stats">
                <p><strong>Likes:</strong> ${likes}</p>
                <p><strong>Views:</strong> ${views}</p>
                <p><strong>Comments:</strong> ${comments}</p>
                <p><strong>Downloads:</strong> ${downloads}</p>
            </div>
        </div>
        </li>`;
    }).join('');
        galleryContainer.insertAdjacentHTML('afterbegin', markup);
    lightbox.refresh();
}

export function clearGallery() {
    galleryContainer.innerHTML = '';
}

export function showLoader() {
    document.querySelector('.loader').classList.add('is-active');
}
export function hideLoader() {
    document.querySelector('.loader').classList.remove('is-active');
}