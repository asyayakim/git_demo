function findMovieById(id) {
    for (let movie of model.movies) {
        if (movie.id == id) return movie;
    }
    return null;
}