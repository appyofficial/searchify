//selectors
const searchInput = document.getElementById('search-artist');
const searchArtistForm = document.querySelector('.search-artist-form');
const searchContainer = document.querySelector('.search-results');
const whenFocus = document.querySelector('.whenfocus');

//on focus
searchInput.addEventListener('focus', (e) => {
    e.preventDefault();
    whenFocus.style.display = 'block';
    document.addEventListener('click', (e) => {
        if (e.target !== searchInput) {
            whenFocus.style.display = 'none';
        }
    })
});

const searchTerm = '';
const endpoint = 'https://www.theaudiodb.com/api/v1/json/1/'
const searchMode = `search.php?s=${searchTerm}`;

/*search results*/
const searchResults = (data) => {
    searchArtistForm.addEventListener('submit', (e) => {
        searchTerm = searchInput.value.trim();
        console.log(searchTerm);
        let html = '';
        let artists = data.artists;
        artists.forEach(artist => {
            console.log(artist);
            html += `
                <div>
                    <h3>${artist.strArtist}</h3>
                    <p>${artist.strBiographyEN}</p>
                </div>
                `;
        });
        searchContainer.innerHTML = html;
        e.preventDefault();
    });
}


/*fetch*/
fetch(endpoint + searchMode)
    .then(res => res.json())
    .then(data => searchResults(data));
