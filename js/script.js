$(document).ready(() =>  {
    $('#responsive-nav-button').click(changeMenuSize)

    $('#header-logo').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cinemas").offset().top
        }, 1000);
        return false
    })

    $('.cinemas-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cinemas").offset().top
        }, 1000);
        return false
    })

    $('.movies-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#movies").offset().top
        }, 1000);
        return false
    })

    $('.catering-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#catering").offset().top
        }, 1000);
        return false
    })

    $('.contact-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#contact").offset().top
        }, 1000);
        return false
    })


    const favoriteCarousel = $('#favoriteMovies');
    const latestCarousel = $('#latestMovies');
    for (let i = 0; i < 10; i++) {
        const poster = $("<div class='poster'></div>")
        poster.append("<img class='poster-img' src='../assets/posters/" + i +".jpg'></img>")
        
        favoriteCarousel.append(poster)

        poster.css('left', poster.width() * i);

        latestCarousel.append(poster.clone())
    }

    setCarouselReaction(favoriteCarousel, "#previousFavorite", "#nextFavorite")
    setCarouselReaction(latestCarousel, "#previousLatest", "#nextLatest")
});

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


const changeMenuSize = () => {
    if($("#responsive-nav").height() > 0) {
        $("#responsive-nav").animate({height: '0'})
    } else {
        const height = screen.height * 0.2 + 50
        $("#responsive-nav").animate({height: height})
    }
}



const setCarouselReaction = (carousel, previousButtonId, nextButtonId) => {
    var animationInProgress = false

    $( window ).resize(() => {
        const posters = carousel.find('.poster')
        posters.each(function() {
            $(this).css('left', $(this).width() * posters.index($(this)));
        });

        if($("#responsive-nav").height() > 0 && screen.width > 500) {
            changeMenuSize()
        }
    });

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