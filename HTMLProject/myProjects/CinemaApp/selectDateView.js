function updateViewSelectDate() {
    const movieId = model.inputs.search.movieId;
    const movie = findMovieById(movieId);

    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Select a date for ${movie.title}</h1>
        <div>
            <img src="${movie.imageUrl}" style="height: 150px"/><br/>
            <b>${movie.title}</b><br/>
            ${movie.year}<br/>
            ${movie.genre}<br/>
            Directed by: ${movie.director}
        </div>
        <div>
            <label for="selectDate">Choose a date: </label>
            <input type="date" id="selectDate" onchange="selectDate(event)">
        </div>
            <div>
    <label for="selectLanguage">Select your language: </label>
    ${generateLanguageButtons()}
        </div>
        <div id='selectTime'></div>
        <div id='selectSittingPlace'></div>
        <div>
            <label for="selectSittingPlace">Select your movie time: </label>
            ${generateTimeButtons()}
        </div>
        <div>
        <button onclick="goBackToMovies()">Back to movies</button>
    `;
}
function generateTimeButtons() {
    let buttonsHtml = '';
    for (let i = 0; i < model.movieShowTime.length; i++) {
        const time = model.movieShowTime[i];
        buttonsHtml += `<button onclick="updateViewOrderPage('${model.inputs.selectDay.movieLanguage}', '${time}')">${time}</button>`;
    }
    return buttonsHtml;
}
function generateLanguageButtons() {
    let buttonsHtml = '';
    const movieId = model.inputs.search.movieId;
    const movie = findMovieById(movieId);
    for (let i = 0; i < movie.movieLanguage.length; i++) {
        const language = movie.movieLanguage[i];
        buttonsHtml += `<button onclick="updateViewOrderPage('${language}', '${model.inputs.selectDay.selectTime}')">${language}</button>`;
    }
    return buttonsHtml;
}


function goBackToMovies() {
    model.app.currentPage = 'search';
    updateView();
}

