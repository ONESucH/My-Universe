var allDateHtml = {
    home: $('.home'),
    movies: $('.movies'),
    aboutUs: $('.about-us'),
    shares: $('.shares'),
    regulation: $('.regulation'),
    trainer: $('.trainer'),
    pros: $('.pros'),
    rates: $('.rates'),
    header: $('.header'),
    twoSection: $('.two-section'),
    decorativeBlockThreeH2: $('.decorative-block-three-h2'),
    sixSection: $('.six-section'),
    sixSectionH2: $('.six-section-h2'),
    teacher: $('.teacher'),
    sevenEightSection: $('.seven-eight-section'),
    ratesH2: $('.rates-h2'),
    sendingAllForms: $('.sending-all-forms'),
    ajaxForm: $('.ajax-form'),
    inp: $('.inp')
};

$(document).ready(function(){
    /*** Отправка форм ***/
    allDateHtml.sendingAllForms.submit(function() {
        var searchInput = document.getElementsByClassName('sending-all-forms');
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            allDateHtml.ajaxForm.fadeIn('slow', function () {
                allDateHtml.ajaxForm.css({'display': 'block'});
                setTimeout(function () {
                    allDateHtml.ajaxForm.fadeOut('slow', function () {
                        allDateHtml.ajaxForm.css({'display': 'none'});
                    })
                }, 4000);
            });
            allDateHtml.inp.val('');
            searchInput[0].reset();
        });
        return false;
    });

    /*** Плавный скролинг ***/
    allDateHtml.home.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.header.offset().top }, 800);
    });
    allDateHtml.movies.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.twoSection.offset().top }, 800);
    });
    allDateHtml.aboutUs.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.decorativeBlockThreeH2.offset().top }, 800);
    });
    allDateHtml.shares.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.sixSection.offset().top }, 800);
    });
    allDateHtml.regulation.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.sixSectionH2.offset().top }, 800);
    });
    allDateHtml.trainer.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.teacher.offset().top }, 800);
    });
    allDateHtml.pros.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.sevenEightSection.offset().top }, 800);
    });
    allDateHtml.rates.click( function() {
        $('html, body').animate({ scrollTop: allDateHtml.ratesH2.offset().top }, 800);
    });

    /*** Fancy Box ***/
    $('a.popupbox-video').fancybox();
});
