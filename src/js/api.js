import axios from 'axios';

const API_KEY = '34447950-4602eac88cdbfe2314fc4a672';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export default class NewApiService {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }
  async getAllImages() {
    console.log(this);
    const { data } = await axios(
      `&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
    );
    // console.log(data);
    this.incrementPage();
    const hits = data.hits;
    return data;
  }

  incrementPage() {
    this.page += 1;
  }

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
