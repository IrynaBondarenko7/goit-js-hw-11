import axios from 'axios';

const API_KEY = '34447950-4602eac88cdbfe2314fc4a672';

axios.defaults.baseURL = `https://pixabay.com/api/`;

export default class NewApiService {
  constructor() {
    this.searchValue = '';
    this.page = 1;
    this.perPage = 40;
  }
  async getAllImages() {
    const { data } = await axios(
      `?key=${API_KEY}&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`
    );

    this.incrementPage();

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  //У разі пошуку за новим ключовим словом, значення page повертаємо до початкового
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchValue;
  }

  set query(newQuery) {
    this.searchValue = newQuery;
  }
}
