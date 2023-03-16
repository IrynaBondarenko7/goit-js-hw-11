import axios from 'axios';

const API_KEY = '34447950-4602eac88cdbfe2314fc4a672';

axios.defaults.baseURL = `https://pixabay.com/api/?key=${API_KEY}`;

export async function getAllImages(name) {
  const { data } = await axios(
    `&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  );
  console.log(data);
  return data;
}
