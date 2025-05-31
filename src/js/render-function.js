
// ========== IMPORT БІБЛІОТЕКИ ==========
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// ========== DOM-ELEMENTS ==========
const galleryContainer = document.querySelector('.gallery');     //контейнер для списку
const loadMoreBtn = document.querySelector('.load-more');        //кнопка завантажити ще
const loaderEl = document.querySelector('.loader');              //контейнер для стилізації лодера
const loadingText = document.querySelector('.text-loading');     //контейнер для тексту завантаження

// ========== МОДАЛЬНЕ ВІКНО ЗА ДОПОМОГОЮ SIMPLELIGHTBOX ==========
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',                                           //атрибут для підпису картинки
  captionDelay: 250,                                             //затримка по часу
});

// ========== СТВОРЕННЯ РОЗМІТКИ ==========
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
  galleryContainer.insertAdjacentHTML('beforeend', markup);      //метод для додавання в DOM-дерево
  lightbox.refresh();                                            //метод для роботи з simplelightbox, динамічне оновлення
}

// ========== ВИДАЛЕННЯ РОЗМІТКИ ==========
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

// ========== ВІДОБРАЖЕННЯ ЛОДЕРА ТА ТЕКСТУ ==========
export function showLoader() {
  loaderEl.classList.add('is-active');
  loadingText.style.display = 'block';
}

// ========== ПРИХОВУВАННЯ ЛОДЕРА ТА ТЕКСТУ ==========
export function hideLoader() {
  loaderEl.classList.remove('is-active');
  loadingText.style.display = 'none';
}

// ========== ВІДОБРАЖЕННЯ КНОПКИ "ЗАВАНТАЖИТИ ЩЕ" ==========
export function showLoadMoreButton() {
  loadMoreBtn.classList.add('is-active');
}

// ========== ПРИХОВУВАННЯ КНОПКИ "ЗАВАНТАЖИТИ ЩЕ" ==========
export function hideLoadMoreButton() {
  loadMoreBtn.classList.remove('is-active');
}