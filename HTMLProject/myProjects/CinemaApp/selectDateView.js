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
        <div id="selectSchedule">
            <div id="selectedDateDisplay"></div>
            <div id="selectDateBox" onchange="selectDate(event)">
            </div>
        </div>
            <div>
    <label for="selectLanguage">Select your language: </label>
    <div id="selectLanguage"></div>
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
    generateLanguageButtons();
    generateSchedule(new Date());
}

function selectDate(event) { 
    if (!model.inputs.selectDay) {
        model.inputs.selectDay = {};
    }
    const selectedDate = event.currentTarget.dataset.date;
    console.log('Button clicked:', selectedDate);
    model.inputs.selectDay.day = selectedDate;

    const allButtons = document.querySelectorAll('.date-box');
    allButtons.forEach(button => button.classList.remove('selected'));
    event.target.classList.add('selected');
    
    updateSelectedDateDisplay();
}

function updateSelectedDateDisplay() {
    const selectedDateDiv = document.getElementById('selectedDateDisplay');
    if (selectedDateDiv) {
        const selectedDate = model.inputs.selectDay.day ? new Date(model.inputs.selectDay.day) : new Date();

        const day = selectedDate.getDate();
        const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
        const month = selectedDate.toLocaleDateString('en-US', { month: 'long' });

        selectedDateDiv.innerHTML = `
            <b>Selected Date:</b> ${weekday}, ${month}, ${day}
        `;
    }
}

function generateSchedule(startDate) {
    const scheduleDiv = document.getElementById('selectDateBox');
    scheduleDiv.innerHTML = '';
    scheduleDiv.classList.add('schedule');
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const day = date.getDate();
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const month = date.toLocaleDateString('en-US', { month: 'long' });

        const dateButton = document.createElement('button');
        dateButton.className = 'date-box';
        dateButton.innerHTML = `
            <div class="date">${day}</div>
            <div class="weekday">${weekday}</div>
            <div class="month">${month}</div>
        `;
        dateButton.setAttribute('data-date', date.toISOString());
        if (date.toDateString() === today.toDateString()) {
            dateButton.classList.add('selected');
            model.inputs.selectDay.day = date.toISOString();
        }
        dateButton.addEventListener('click', selectDate);
        
        scheduleDiv.appendChild(dateButton);
    }
}
updateSelectedDateDisplay();
function generateTimeButtons() {
    let buttonsHtml = '';
    for (let i = 0; i < model.movieShowTime.length; i++) {
        const time = model.movieShowTime[i];
        buttonsHtml += `<button class='timeButton' onclick="selectTime('${time}')">${time}</button>`;
    }
    return buttonsHtml;
}
function selectTime(time) {
    model.inputs.selectDay.selectTime = time;
    updateViewOrderPage();
}

function generateLanguageButtons() {
    let buttonsHtml = '';
    const movieId = model.inputs.search.movieId;
    const movie = findMovieById(movieId);

    if (movie && movie.movieLanguage) {
        for (let i = 0; i < movie.movieLanguage.length; i++) {
            const language = movie.movieLanguage[i];
            const selectedClass = i === 0 ? 'selected' : '';
            buttonsHtml += `<div class='language ${selectedClass}'>${language}</div>`;
            if (i === 0) {
                model.inputs.selectDay.movieLanguage = language;
            }
        }
    } else {
        buttonsHtml = '<div>No languages available</div>';
    }
    document.getElementById('selectLanguage').innerHTML = buttonsHtml;

    const languageButtons = document.querySelectorAll('.language');
    languageButtons.forEach(button => {
        button.addEventListener('click', selectLanguageButton);
    });
}
function selectLanguageButton(event) {
    const selectedLanguage = event.target.textContent;
    console.log("Selected Language:", selectedLanguage); 
    model.inputs.selectDay.movieLanguage = selectedLanguage;
    console.log("Stored check", model.inputs.selectDay.movieLanguage);
   
    const allButtons = document.querySelectorAll('.language');
    allButtons.forEach(button => button.classList.remove('selected'));

    event.target.classList.add('selected');
}

function filterOrderPage() {
    //filter order page by language
}

function goBackToMovies() {
    model.app.currentPage = 'search';
    updateView();
}

