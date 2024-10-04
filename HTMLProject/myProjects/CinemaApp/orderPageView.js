function updateViewOrderPage(movieLanguage, selectTime) {
    model.app.currentPage = 'orderPage';
    const movieId = model.inputs.search.movieId;
    model.inputs.selectDay.movieLanguage = movieLanguage;
    model.inputs.selectDay.selectTime = selectTime;
    const movie = findMovieById(movieId);

    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Place Selrction for ${movie.title}</h1>
        <div>
            <img src="${movie.imageUrl}" style="height: 150px"/><br/>
            <b>${movie.title}</b><br/>
            ${movie.year}<br/>
            ${movie.genre}<br/>
            Directed by: ${movie.director}<br/>
            <b>Selected Date:</b> ${model.inputs.selectDay.day}<br/>
            <b>Selected Language:</b> ${model.inputs.selectDay.movieLanguage}<br/>
            <b>Selected Time:</b> ${model.inputs.selectDay.selectTime}<br/>
        </div>
        <button onclick="goBackToSelectedMovie()">Back to movies</button>
    `;

}
function goBackToSelectedMovie() {
    model.app.currentPage = 'selectDate';
    resetSelectedData();
    updateView();
}

// nededed to reset selected data when you leave this page
function resetSelectedData() {
    model.inputs.selectDay.day = null;
    model.inputs.selectDay.movieLanguage = '';
    model.inputs.selectDay.selectTime = '';
}