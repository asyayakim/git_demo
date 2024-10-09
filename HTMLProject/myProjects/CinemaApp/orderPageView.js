function updateViewOrderPage() {
    console.log("Stored in model:", model.inputs.selectDay.movieLanguage);
    model.app.currentPage = 'orderPage';
    const movieId = model.inputs.search.movieId;
    const movieLanguage= model.inputs.selectDay.movieLanguage;
    const selectTime =model.inputs.selectDay.selectTime;
    const movie = findMovieById(movieId);
    

    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Place Selrction for ${movie.title}</h1>
        <div>
            <img src="${movie.imageUrl}" style="height: 150px"/><br/>
            <b>${movie.title}</b><br/>
            ${movie.year}<br/>
            ${movie.genre}<br/>
            Directed by: ${movie.director}<br/>
            <b>Selected Date:</b> ${new Date(model.inputs.selectDay.day).toLocaleDateString()}<br/>
            <b>Selected Language:</b> ${movieLanguage}
            <br/>
            <b>Selected Time:</b> ${selectTime}<br/>
            <div>
            <label for="selectTicketsAmount">Select Tickets Amount: </label>
            <button name='ticketsAmount+' type='button' onclick='selectTicketsAmount("ticketsAmount+");'>+</button>
            <button name='ticketsAmount-' type='button' onclick='selectTicketsAmount("ticketsAmount-");'>-</button>
            ${ticketsAmount}
            
        </div>
        <div id='container'>
            <b>Select Seats:</b> <br/>
            <div class= 'row'>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            </div>
            <div class= 'row'>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            </div>
            <div class= 'row'>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            </div>
            <div class= 'row'>
            <div class='seat'></div>
            <div class='seat occupied'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            <div class='seat'></div>
            </div>
            <div id="screen">  </div>
            <div class= 'row'>
             <span id="selectedCount">- 0</span>
            </div>

        </div>
        <button onclick="goBackToSelectedMovie()">Back to movies</button>
    `;
    selectedSeatsCount = document.querySelectorAll('.seat.selected').length;
    updateSelectedCount();
    selectSeats();
}
let ticketsAmount = 2;
let selectedSeatsCount = 0;
function selectTicketsAmount(action) {
    if (action == 'ticketsAmount+') {
        ticketsAmount++;
    } else if (action == 'ticketsAmount-') {
        ticketsAmount--;
        if (ticketsAmount < 1) {
            ticketsAmount = 1;
        }
    }
    model.inputs.orderpage.ticketsAmount = ticketsAmount;
    updateView();
}
function updateSelectedCount() {
    const selectedCount = document.getElementById('selectedCount');
    selectedCount.textContent = selectedSeatsCount;
}

function selectSeats() {
    const seats = document.querySelectorAll('.row .seat:not(.occupied)');
    seats.forEach(seat => {
        seat.addEventListener('click', () => {
            if (seat.classList.contains('selected')) {
                seat.classList.remove('selected');
                selectedSeatsCount--;
            } else {
                if (selectedSeatsCount < ticketsAmount) {
                    seat.classList.add('selected');
                    selectedSeatsCount++;
                } else {
                    alert(`You can only select ${ticketsAmount} seats.`);
                }
            }
            updateSelectedCount();
        });
    });
}
selectSeats();
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