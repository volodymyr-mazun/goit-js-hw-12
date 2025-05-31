
import axios from 'axios';

// ========== ШЛЯХ ДО РЕСУРСУ ==========
const API_KEY = '50367186-ce245e32e2c7fc274bc460135';
const BASE_URL = 'https://pixabay.com/api/';

// ========== ФУНКЦІЯ З ПАРАМЕТРАМИ ЗАПИТУ ==========
export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,                     //параметр для визначення кількості зображень
    page: page,
  };

// ========== ЗАПИТ ЗА ДОПОМОГОЮ МЕТОДУ AXIOS ==========
  const response = await axios.get(BASE_URL, { params });
  return {
    images: response.data.hits,
    totalHits: response.data.totalHits,
  };
}