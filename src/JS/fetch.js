
import getRefs from  './refs';
import PhotoApiServer from './api-service';
import photoCards from '../Tamplates/photo-card';

import { error } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = getRefs();
const photoApiServer = new PhotoApiServer();


refs.searchForm.addEventListener('submit', onSearch);
// refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    photoApiServer.query = e.currentTarget.elements.query.value.trim();

        if (photoApiServer.query === '') {
         return error({
          text: 'Input line is empty, enter query',
        });
    }

    photoApiServer.resetPage();
    clearPhotoCards();
    photoApiServer.fetchPhoto().then(hits => {
        renderPhotoCard(hits);
        photoApiServer.incrementPage();
    })
}

// function onLoadMore() {
//     photoApiServer.fetchPhoto().then(renderPhotoCard)
// }

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