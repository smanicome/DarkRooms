$(document).ready(function() {
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
        latestCarousel.append(poster.clone())
    }
    const carouselChild = favoriteCarousel.find('.poster'); 
    itemWidth = carouselChild[0].width;

    //Set the event handlers for buttons.
    $('.nextFavorite').click(function(){
            //Animate the slider to left as item width 
            favoriteCarousel.stop(false, true).animate({
                left : '-='+itemWidth
            },300, function(){
                //Find the first item and append it as the last item.
                lastItem = favoriteCarousel.find('.poster:first');
                lastItem.remove().appendTo(favoriteCarousel);
                lastItem.css('left', ((carouselChild.length-1)*(itemWidth)));
                canClick = true;
            });
    });

    $('.previousFavorite').click(function(){
            //Find the first item and append it as the last item.
            lastItem = favoriteCarousel.find('.poster:last');
            lastItem.remove().prependTo(favoriteCarousel);

            lastItem.css('left', itemWidth);             
            //Animate the slider to right as item width 
            favoriteCarousel.finish(true).animate({
                left: '+='+itemWidth
            },300);
    });
});