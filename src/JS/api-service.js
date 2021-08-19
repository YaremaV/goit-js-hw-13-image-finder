
const API_KEY = '22938064-7e67cff9dc13648fb3a6e967b';
const BASE_URL = 'https://pixabay.com/api/';

export default class PhotoApiServer{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhoto(searchQuery) {
         console.log(this)
            const options = {
        // headers: {
        //     Autorization: '22938064-7e67cff9dc13648fb3a6e967b'
        // }
    };

    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url, options)
            .then(response => response.json())
            .then(data => {
                
                this.page += 1;

                return data.hits;
            });
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