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
            <div id="selectedDateDisplay"></div>
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
            <div class='seat selected'></div>
            <div class='seat selected'></div>
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
        <div id='confirmOrder'>
        <div id='totalPrice'>Total Price: $${totalPrice}</div>
        </div>
        <button onclick="goBackToSelectedMovie()">Back to movies</button>
        <button onclick="updateViewPaymentPage()">Continue to payment</button>
    `;
    selectedSeatsCount = document.querySelectorAll('.seat.selected').length;
    updateSelectedCount();
    selectSeats();
    updateSelectedDateDisplay();
}
let totalPrice = 200;
let selectedSeatsCount = 2;
let ticketsAmount = 2;
function totalPriceForOrder() {
    ticketsAmount = model.inputs.orderpage.ticketsAmount;
    totalPrice = ticketsAmount * 100;
    document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice}`;
    model.inputs.orderpage.totalPrice = totalPrice;
}
function selectTicketsAmount(action) {
    let html = '';
    if (action == 'ticketsAmount+') {
        ticketsAmount++;

    } else if (action == 'ticketsAmount-') {
        ticketsAmount--;
        if (ticketsAmount < 1) {
            ticketsAmount = 1;
        }
    }
    model.inputs.orderpage.ticketsAmount = ticketsAmount;
    totalPriceForOrder();

    updateViewOrderPage()
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