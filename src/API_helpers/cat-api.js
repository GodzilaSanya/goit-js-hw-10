import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_WeQhJvPy55GccCDCRh6dMVOQrUvGfA3QuSE5aWRWa0GnVVt5RRvtUmOZm4K4ecjF';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function getBreeds() {
  return axios.get('/breeds').then(function (response) {
    return response;
  });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(function (response) {
      return response;
    });
}

export { getBreeds, fetchCatByBreed };
