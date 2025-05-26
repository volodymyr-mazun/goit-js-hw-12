import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-function.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', event => {
    event.preventDefault();

const query = input.value.trim();
    if (query === '') {
        iziToast.info({ title: 'Warning', message: 'Please enter a search term.' });
    return;
    }

    currentQuery = query;
    currentPage = 1;
    clearGallery();
    fetchImages();
});

function fetchImages() {

    showLoader();

    getImagesByQuery(currentQuery)
    .then(images => {
        if (images.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'topRight',
                backgroundColor: ' #ef4040',
                messageColor: ' #fafafb',
                maxWidth: '432px',
                timeout: 3000,
            });
        return;
        }

        createGallery(images);
    })
    .catch(error => {
        iziToast.error({ title: 'Error', message: 'An error occurred. Please try again later.' });
        console.error(error);
    })
    .finally(() => {
        hideLoader();
    });
}