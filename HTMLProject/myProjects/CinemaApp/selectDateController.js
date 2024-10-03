function selectDate(event) {
    model.inputs.selectDay.day = event.target.value;
}

function goBackToMovies() {
    model.app.currentPage = 'search';
    updateView();
}
