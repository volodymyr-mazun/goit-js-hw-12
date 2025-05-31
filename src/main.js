
// ========== IMPORT MODULES ==========
import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';

// ========== IZI TOAST ==========
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ========== DOM-ELEMENTS ==========
const form = document.querySelector('.form');                   //форма
const input = form.querySelector('input[name="search-text"]');  //поле для запиту
const loadMoreBtn = document.querySelector('.load-more');       //кнопка завантажити ще

// ========== ГЛОБАЛЬНІ ЗМІННІ ==========
let currentPage = 1;                                            //номер поточної сторінки
let currentQuery = '';                                          //збереження останнього пошукового запиту
let totalHits = 0;                                              //загальна кількість знайдених елементів
let imagesLoaded = 0;                                           //кількість завантажених елементів
let lastCardHeight = 0;                                         //збереження висити останнього елемента

// ========== РОБОТА З ФОРМОЮ ==========
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  currentQuery = input.value.trim();

  currentPage = 1;
  imagesLoaded = 0;
  clearGallery();                                               //очищення сторінки
  showLoadMoreButton();                                         //кнопка "Load more"

  await fetchAndRender();
});

// ========== КНОПКА LOAD MORE ==========
loadMoreBtn.addEventListener('click', async () => {            //лічильник, для подальшого завантаження
  currentPage += 1;
  await fetchAndRender();
});

// ========== MAIN FUNCTION ==========
async function fetchAndRender() {

showLoader();                                                  //анімація завантаження

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

// ========== ПРОДОВЖЕННЯ ЗАВАНТАЖЕННЯ ==========
createGallery(images);
  imagesLoaded += images.length;

  // ========== ВИСОТА ОСТАННЬОЇ КАРТКИ ТА ПРОКРУТКА ==========
const cards = document.querySelectorAll('.gallery-item');                   //елемент списку

if (cards.length > 0) {
  lastCardHeight = cards[cards.length - 1].getBoundingClientRect().height;  //останній елемент та його точна висота
    window.scrollBy({                                                       //прокручування сторінки до низу
    top: lastCardHeight * 2,                                                //висота прокручування на дві картки
    behavior: 'smooth'                                                      //мяке прокручування
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
    hideLoadMoreButton();                                                   //сховати копку, якщо закінчились елементи
  } else {
    showLoadMoreButton();                                                   //відобразити кнопку у випадку фіктивності перевірки
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

