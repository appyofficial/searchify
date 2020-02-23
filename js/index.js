//selectors
const searchInput = document.querySelector('#search-artist');
const searchArtistForm = document.querySelector('.search-artist-form');
const searchContainer = document.querySelector('.search-results');
const whenFocus = document.querySelector('.whenfocus');




//displaying search results
function searchResults() {
    searchArtistForm.addEventListener('submit', e => {
        e.preventDefault();
        let searchTerm = searchArtistForm.search.value;
        const searchResultsURL = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${searchTerm}`;

        //pushing data to dom
        const showResult = (data) => {
            let html;
            let artists = data.artists;
            if (artists === null) {
                html = '<h2>Artist Not Found!</h2>';
            } else {
                artists.forEach(artist => {
                    html = `<p>${artist.strArtist}</p>`;
                });
            }
            searchContainer.innerHTML = html;
            searchArtistForm.reset();
        }

        //fetching data
        fetch(searchResultsURL)
            .then(res => res.json())
            .then(data => {
                showResult(data);
            });
    });
}
searchResults();