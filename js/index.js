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
                    let artistBio = artist.strBiographyEN.split('.')[0];
                    html += `<section class="artist-card">
                    <div class="artist-img"><img src=${artist.strArtistThumb} alt="coldplay"></div>
                    <div class="artist-bio">
                        <div class="artist-bio-header">
                        <h3>${artist.strArtist}</h3>
                        <p>${artist.strGenre}</p>
                        <div class="artist-links">
                            <a href=${artist.strWebsite} target="_blank">Website</a>
                            <a href=${artist.strTwitter} target="_blank">Twitter</a>
                            <a href=${artist.strFacebook} target="_blank">Facebook</a>
                        </div>
                    </div>
                        <p class="artist-bio-sd">${artistBio}.</p>
                        <a href="#" class="artist-bio-view-more">View More</a>
                    </div>
                </section>`;
                console.log(artist.strWebsite);
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