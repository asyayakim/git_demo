const model = {
    // 1: tilstanden selve applikasjonen er i
    app: {
        currentPage: 'search', // selectDate, orderPage, paymentPage
    },

    // 2: inputfelter til hver side
    inputs: {
        search: {
            text: '',
            movieId: null,
        },
        selectDay: {
            movieId: null,
            day: null,
            movieLanguage: '',
            selectTime: null,
            dateSpecialFormat: [
                { weekday: '', mounth: '', day: '' },
            ]
            
        },
        orderpage: {
            movieId: null,
            ticketsAmount: null,
            selectSittingPlace: null,
            email: '',
            paymentMethod: ''
        },
        paymentPage: {
            secretCode: '',
            bankCardDetails: '',
            cardHolderName: '',
            cardHolderSurname: '',
            cardHolderEmail: '',
        }
    },

    // 3: felles data
    movies: [
        {
            id: 1,
            title: "Inception",
            movieLanguage: [   
                ' english', ' norwegian',
            ],
            genre: "Crime, Drama",
            year: 2010,
            director: "Francis Ford Coppola",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg"
        },
        {
            id: 2,
            title: "The Godfather",
            movieLanguage: [   
                 ' german', ' norwegian',
            ],
            year: 1972,
            genre: "Crime, Drama",
            director: "Francis Ford Coppola",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg"
        },
        {
            id: 3,
            title: "Pulp Fiction",
            movieLanguage: [   
                ' english', ' swedish', 
            ],
            genre: "Crime, Thriller",
            director: "Quentin Tarantino",
            year: 1994,
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg"
        },
        {
            id: 4,
            title: "The Shawshank Redemption",
            movieLanguage: [   
                ' english', ' swedish', ' french'
            ],
            genre: "Drama",
            director: "Frank Darabont",
            year: 1994,
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
        },
        {
            id: 5,
            title: "Interstellar",
            movieLanguage: [   
                ' english', ' swedish', ' german', 
            ],
            genre: "Sci-Fi, Drama",
            director: "Christopher Nolan",
            year: 2014,
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg"
        }
    ],
    orderInfo: [
        {
            movieId: null,
            title: "",
            imageUrl: '',
            day: '',
            movieLanguage: '',
            selectTime: '',
            ticketsAmount: 1,
            selectSittingPlace: 'rad 1, plass 9',
            email: '',
            paymentMethod: 'vipps',
        },
    ],
    movieShowTime: [
        '10:00', '12:00', '14:00', '16:00', 
    ],
   
    
};