import { getBreeds, fetchCatByBreed } from './API_helpers/cat-api';
import { createBreeds } from './helpers/createMarkup';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', findCat);

getBreeds()
  .then(response => {
    refs.loader.classList.add('disabled');
    refs.select.classList.remove('disabled');
    refs.select.insertAdjacentHTML('beforeend', createBreeds(response.data));
  })
  .catch(error => {
    refs.loader.classList.add('disabled');
    refs.errorMessage.classList.remove('disabled');
    console.log(error.message);
  });

function findCat(event) {
  const breedId = event.target.value;
  refs.loader.classList.remove('disabled');
  refs.catInfo.classList.add('disabled');
  refs.errorMessage.classList.add('disabled');

  fetchCatByBreed(breedId)
    .then(response => {
      const cat = {
        img: response.data[0].url,
        name: response.data[0].breeds[0].name,
        description: response.data[0].breeds[0].description,
        temperament: response.data[0].breeds[0].temperament,
      };
      createCatCard(cat);
      refs.loader.classList.add('disabled');
      refs.catInfo.classList.remove('disabled');
    })
    .catch(error => {
      refs.loader.classList.add('disabled');
      refs.errorMessage.classList.remove('disabled');
      console.log(error.message);
    });
}

function createCatCard({ img, name, description, temperament }) {
  refs.catInfo.innerHTML = `
  <img src="${img}" alt="${name}" width="500px" />
  <div class="wrapper">    
  <h2>${name}</h2>
      <p>${description}</p>
      <h3>Temperament:</h3>
      <p>${temperament}</p>
      </div>`;
}
