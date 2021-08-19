
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
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    photoApiServer.query = e.currentTarget.elements.query.value;

        if (photoApiServer.query === '') {
    return alert('Строка поиска пустая')
}

    photoApiServer.resetPage();
    photoApiServer.fetchPhoto().then(hits => {
        clearPhotoCards();
        renderPhotoCard(hits);
    })
}

function onLoadMore() {
    photoApiServer.fetchPhoto().then(renderPhotoCard)
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