import axios from 'axios';

const API_KEY = '34447950-4602eac88cdbfe2314fc4a672';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export default class NewApiService {
  constructor() {
    this.searchValue = '';
  }
  async getAllImages() {
    console.log(this);
    const { data } = await axios(
      `&q=${this.searchValue}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    console.log(data);
    return data;
  }
  //щоб мати доступ у зовнішньому коді до this.searchValue
  get query() {
    return this.searchValue;
  }
  set query(newQuery) {
    this.searchValue = newQuery;
  }
}
