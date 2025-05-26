
import axios from 'axios';

const API_KEY = '50367186-ce245e32e2c7fc274bc460135';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data.hits;
}