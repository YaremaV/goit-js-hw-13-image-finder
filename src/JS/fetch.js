
import getRefs from  './refs';
import PhotoApiServer from './api-service';
import photoCards from '../Tamplates/photo-card';

const refs = getRefs();
const photoApiServer = new PhotoApiServer();


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    clearPhotoCards();
    photoApiServer.query = e.currentTarget.elements.query.value;
    photoApiServer.resetPage();
    photoApiServer.fetchPhoto().then(renderPhotoCard)
}

function onLoadMore() {
    photoApiServer.fetchPhoto().then(renderPhotoCard)
}

function renderPhotoCard(hits) {
    
    refs.cardGallery.insertAdjacentHTML('beforeend', photoCards(hits));
    // deleteError();
}

function clearPhotoCards() {
    refs.cardGallery.innerHTML = '';
}