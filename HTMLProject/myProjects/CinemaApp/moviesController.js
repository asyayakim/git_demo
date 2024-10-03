function showMovie(movieId) {
    model.app.currentPage = 'selectDate';
    model.inputs.search.movieId = movieId;
    updateViewSelectDate();
}