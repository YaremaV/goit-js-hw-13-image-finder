
const API_KEY = '22938064-7e67cff9dc13648fb3a6e967b';
const BASE_URL = 'https://pixabay.com/api/';

export default class PhotoApiServer{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhoto() {
  
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url)
            .then(response => {
        if (!response.ok) {
          throw new Error(console.log('Error'));
        }
        return response.json();
      })
      .then(({ hits }) => {
        if (hits.length === 0) {
          return 'error';
        }
        this.incrementPage();
        return hits;
      });
  }
    

      incrementPage() {
    this.page += 1;
  }

    resetPage() {
        this.page = 1;
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}