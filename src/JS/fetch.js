
import getRefs from  './refs';
import PhotoApiServer from './api-service';
import photoCards from '../Tamplates/photo-card';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

import setLightbox from './lightbox.js';

const refs = getRefs();
const photoApiServer = new PhotoApiServer();

refs.cardGallery.addEventListener('click', setLightbox);
refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    photoApiServer.query = e.currentTarget.elements.query.value.trim();

    if (photoApiServer.query === '') {
            clearPhotoCards();
         return error({
          text: 'Input line is empty, enter query',
        });
    }

    photoApiServer.resetPage();
    clearPhotoCards();
    photoApiServer.fetchPhoto().then(hits => {
        if (hits.length <= 0) {
             return error({
          text: 'Incorect input',
        });
        }
        renderPhotoCard(hits);
        photoApiServer.incrementPage();
    })
        .catch(err => {
       console.log(err)
    })
}

function renderPhotoCard(hits) {
    
    refs.cardGallery.insertAdjacentHTML('beforeend', photoCards(hits));
    deleteError();
}

function clearPhotoCards() {
    refs.cardGallery.innerHTML = '';
}

function deleteError() {
  const errorMessage = document.querySelector('.pnotify');
  if (document.body.contains(errorMessage)) {
    errorMessage.style.display = 'none';
  }
}

const onEntry = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && photoApiServer.query !== '') {
            console.log(photoApiServer.query)
             photoApiServer.fetchPhoto().then(hits => {
                 renderPhotoCard(hits);
                 photoApiServer.incrementPage();
    })
        }
    });
};


const options = {
    rootMargin: '150px',
}
const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.observerInter)