$(document).ready(() =>  {
    $('#responsive-nav-button').click(changeMenuSize)

    // Dispose of the dialog when the user clicks outside of it
    // To enforce that, all components in the dialog, dialog excluded, have class "movieDialog"
    // As the dialog is over all the screen, if the part clicked does not have the class, it is not in the dialog box
    $('#movieDescription').click((e) => {
        if (!e.target.classList.contains("movieDialog"))
        e.target.close();
    })

    // Scroll to 'Cinemas'
    $('#header-logo').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cinemas").offset().top
        }, 1000);
        return false
    })

    // Scroll to 'Cinemas'
    $('.cinemas-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cinemas").offset().top
        }, 1000);
        return false
    })

    // Scroll to 'Movies'
    $('.movies-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#movies").offset().top
        }, 1000);
        return false
    })

    // Scroll to 'Catering'
    $('.catering-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#catering").offset().top
        }, 1000);
        return false
    })

    // Scroll to 'Contact'
    $('.contact-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
        return false
    })


    $('#cinema-select').on('change', function() {
        changeCinema(this.value)
    });

    // Load theaters data from a JSON file
    // Add the theaters as option of the select component and default to the first theater
    $.getJSON('../data/theaters.json', function(data) {
        data.forEach((theater) => {
            $('#cinema-select').append($(`<option value="${theater.id}">${theater.name}</option>`))
        })

        changeCinema(data[0].id)
    })


    const favoriteCarousel = $('#favoriteMovies');
    const latestCarousel = $('#latestMovies');

    // Read movies data from a JSON file and add posters to both carousel
    $.getJSON('../data/movies.json', function(data) {
        let count = 0
         data.forEach((movie) => {
            const poster = $("<div class='poster'></div>")
            poster.append("<img class='poster-img' src='../assets/posters/" + movie.id +".jpg'></img>")
            favoriteCarousel.append(poster)
    
            poster.css('left', poster.width() * count);
            poster.click(() => showMovieDescription(movie))
            
            const clonedPoster = poster.clone()
            clonedPoster.click(() => showMovieDescription(movie))
            latestCarousel.append(clonedPoster)

            count++
        })
    })

    setCarouselReaction(favoriteCarousel, "#previousFavorite", "#nextFavorite")
    setCarouselReaction(latestCarousel, "#previousLatest", "#nextLatest")
});

// Refreshes the data When the user selects a cinema
function changeCinema(id) {
    $.getJSON('../data/theaters.json', function(data) {
        const theater = data.find(t => t.id == id)
        
        $('#cinema-monday').text(theater.openHours.monday)
        $('#cinema-tuesday').text(theater.openHours.tuesday)
        $('#cinema-wednesday').text(theater.openHours.wednesday)
        $('#cinema-thursday').text(theater.openHours.thursday)
        $('#cinema-friday').text(theater.openHours.friday)
        $('#cinema-saturday').text(theater.openHours.saturday)
        $('#cinema-sunday').text(theater.openHours.sunday)
        $('#cinemaMap').attr('src', theater.location)
    })
}

// Shows a dialog filled with the full description of the movie clicked
const showMovieDescription = (movie) => {
    $('#movieDescriptionPoster').attr('src', `../assets/posters/${movie.id}.jpg`)
    $('#movieDescriptionTitle').text(movie.title)
    $('#movieDescriptionRelease').text(`Date of release: ${movie.releaseDate}`)
    $('#movieDescriptionSummary').text(movie.description)

    $('#monday').text(movie.screenings.monday.join(' '))
    $('#tuesday').text(movie.screenings.tuesday.join(' '))
    $('#wednesday').text(movie.screenings.wednesday.join(' '))
    $('#thursday').text(movie.screenings.thursday.join(' '))
    $('#friday').text(movie.screenings.friday.join(' '))
    $('#saturday').text(movie.screenings.saturday.join(' '))
    $('#sunday').text(movie.screenings.sunday.join(' '))

    $('#movieDescription')[0].showModal()
}

// Forces responsiveness through width manipulation
// Large screen: 4 posters
// Small screen: 2 posters
const setPosterSize = (poster) => {
    const isMobile = screen.width < screen.height;
    if(isMobile) {
        $(poster).css('height', '75%')
        $(poster).css('width', '50%')
    } else {
        $(poster).css('height', '100%')
        $(poster).css('width', '25%')
    }
}

// Open/close navigation menu for small screens
const changeMenuSize = () => {
    if($("#responsive-nav").height() > 0) {
        $("#responsive-nav").animate({height: '0'})
    } else {
        const height = screen.height * 0.2 + 50
        $("#responsive-nav").animate({height: height})
    }
}


// Sets reactions and animations for carousels
// The posters are animated with 'left' style property manipulation and cycling the list of posters
const setCarouselReaction = (carousel, previousButtonId, nextButtonId) => {
    var animationInProgress = false

    // On screen resize, refresh the placement of the posters
    // Closes the menu if it was open when resized to large screen
    $( window ).resize(() => {
        const posters = carousel.find('.poster')
        posters.each(function() {
            $(this).css('left', $(this).width() * posters.index($(this)));
        });

        if($("#responsive-nav").height() > 0 && screen.width > 500) {
            changeMenuSize()
        }
    });

    // Moves the movies to the right
    // Places the last movie first before animations
    $(previousButtonId).click(() => {
        if(animationInProgress) return;
        animationInProgress = true

        lastItem = carousel.find('.poster:last');
        firstItem = carousel.find('.poster:first');
        lastItem.css('left', firstItem.position().left - lastItem.width())
        lastItem.prependTo(carousel);
        
        carousel.find('.poster').animate(
            {
                left : '+=' + lastItem.width()
            }, 
            500
        ).promise().then(() => animationInProgress = false);
    });

    // Moves the movies to the left
    // Places the first movie last after ALL animations
    $(nextButtonId).click(() => {
        if(animationInProgress) return;
        animationInProgress = true
        
        firstItem = carousel.find('.poster:first');

        carousel.find('.poster').animate(
            {
                left : '-=' + firstItem.width()
            }, 
            500,
        ).promise().then(() => {
            lastItem = carousel.find('.poster:last');
            firstItem.css('left', lastItem.position().left + firstItem.width())
            firstItem.appendTo(carousel);

            animationInProgress = false
        });
    });
}