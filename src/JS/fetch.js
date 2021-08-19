
import getRefs from  './refs';
import PhotoApiServer from './api-service';
import photoCards from '../Tamplates/photo-card';

const refs = getRefs();
const photoApiServer = new PhotoApiServer();

let searchQuery = '';




refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    photoApiServer.query = e.currentTarget.elements.query.value;
    photoApiServer.resetPage();
    photoApiServer.fetchPhoto().then(hits=>console.log(hits))
}

function onLoadMore() {
    photoApiServer.fetchPhoto().then(hits=>console.log(hits))
}

function renderPhotoCard(photo) {
    const markupList = photoCards(photo);
    refs.cardGallery.innerHTML = markupList;
    // deleteError();
}