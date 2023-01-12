import axios from 'axios';

const KEY = '30789164-35a7cf56b7677b8602e966f0f';

export async function requestImages(userRequest, page) {
  const response = await axios.get(`https://pixabay.com/api/?key=${KEY}&q=${userRequest}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`);
  return response;
}