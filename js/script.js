$(document).ready(() =>  {
    $('#header-logo').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cinemas").offset().top
        }, 1000);
        return false
    })

    $('#cinemas-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cinemas").offset().top
        }, 1000);
        return false
    })

    $('#movies-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#movies").offset().top
        }, 1000);
        return false
    })

    $('#catering-link').click(function () {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#catering").offset().top
        }, 1000);
        return false
    })

    $('#contact-link').click(function () {
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


const setCarouselReaction = (carousel, previousButtonId, nextButtonId) => {
    var animationInProgress = false

    $( window ).resize(() => {
        const posters = carousel.find('.poster')
        posters.each(function() {
            $(this).css('width', '25%')
            $(this).css('left', $(this).width() * posters.index($(this)));
        });
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