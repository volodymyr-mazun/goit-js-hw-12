
// ========== IMPORT MODULES ==========
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-function.js';

// ========== IZI TOAST ==========
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ========== DOM-ELEMENTS ==========
const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');
const cards = document.querySelectorAll('.gallery-item');

// ========== ГЛОБАЛЬНІ ЗМІННІ ==========
let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
let imagesLoaded = 0;
let lastCardHeight = 0;

// ========== РОБОТА З ФОРМОЮ ==========
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = input.value.trim();

  currentPage = 1;
  imagesLoaded = 0;
  clearGallery();
  showLoadMoreButton();

  await fetchAndRender();
});

// ========== КНОПКА LOAD MORE ==========
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRender();
});

// ========== MAIN FUNCTION ==========
async function fetchAndRender() {
  showLoader();

try {
  const { images, totalHits: total } = await getImagesByQuery(currentQuery, currentPage);
  totalHits = total;

// ========== ПЕРЕВІРКА НА НАЯВНІСТЬ ==========    
if (images.length === 0 && currentPage === 1) {
  iziToast.warning({
    title: 'No results',
    message: 'Sorry, no images found.',
    position: 'topRight',
    backgroundColor: ' #ef4040',
    messageColor: ' #fafafb',
    maxWidth: '432px',
    timeout: 3000,
  });
    hideLoadMoreButton();
    return;
}

// ========== ОНОВЛЕННЯ ЛІЧИЛЬНИКА ==========
createGallery(images);
  imagesLoaded += images.length;

// ========== ВИСТОТА ОСТАННЬОЇ КАРТКИ ТА ПРОКРУТКА ==========
if (cards.length > 0) {
  lastCardHeight = cards[cards.length - 1].getBoundingClientRect().height;
    window.scrollBy({
    top: lastCardHeight * 2,
    behavior: 'smooth'
  });
}

// ========== ПЕРЕВІРКА НА ЗАКІНЧЕННЯ КОЛЕКЦІЇ ==========
if (imagesLoaded >= totalHits) {
  iziToast.info({
    message: 'We re sorry, but you ve reached the end of search results.',
    position: 'topRight',
    backgroundColor: ' #007bff',
    messageColor: ' #fafafb',
    maxWidth: '432px',
    timeout: 3000,
  });
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
}

// ========== ОБРОБКА ПОМИЛКИ ==========
} catch (error) {
  iziToast.error({
    message: 'Error fetching images.',
    position: 'topRight',
    backgroundColor: ' #ef4040',
    messageColor: ' #fafafb',
    maxWidth: '432px',
    timeout: 3000,
  });

  } finally {
    hideLoader();
  }
}

