function updateViewMovies() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Movies in the cinema</h1>
        <div class="movies-grid">
            ${createMoviesHtml()}
        </div>
    `;
}

function createMoviesHtml() {
    const movies = model.movies;
    let html = '';
    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i];

        html += /*HTML*/`
            <div class="movie-card" onclick="showMovie(${movie.id})">
                <div class="movie-image">
                    <img src="${movie.imageUrl}"/>
                </div>
                <div class="movie-info">
                <h3>${movie.title}</h3>
                <p class="movie-year-genre">${movie.year} | ${movie.genre}</p>
                    <!--<div>${movie.movieLanguage}</div>--->
                </div>
            </div>
        `;
    }
    return html;
}
