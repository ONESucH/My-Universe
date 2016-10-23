'use strict';

var reverseForm = $('.reverse-form'),
    searchMeLocation = $('#searchMeLocation'),
    feedbackForm = $('#feedbackForm'),
    locationBlock = $('.location'),
    voiceInformationBlock = $('.voice-information-block'),
    header = $('.header'),
    finalResultVoice = $('#finalResultVoice'),
    microphone = $('#microphone'),
    dataStorage = ['связаться с автором', 'найти автора на карте', 'найти автора'],
    recognizer = new webkitSpeechRecognition(),
    upScroll = $('.up-scroll'),
    logo = $('.logo'),
    logic = true;

recognizer.lang = 'ru-Ru';
recognizer.interimResults = true;

/*** Information blocks for voice control ***/
inspectionScreenBrowser();
function inspectionScreenBrowser () {
    var widthScreenBrowser = window.innerWidth;
    if (widthScreenBrowser < 980) {
        return false;
    } else {
        renderingInformationBlock();
    }
}

function renderingInformationBlock() {
    var createInformationBlock = document.createElement('div'),
        title = document.createElement('h5');
    createInformationBlock.className = 'leftInformationBlock';
    setInterval(function () {
        var randomize = Math.floor(Math.random() * dataStorage.length),
            informationPanel = document.createElement('p'),
            helpIcon = document.createElement('i');
        helpIcon.className = 'fa fa-info';
        helpIcon.setAttribute('aria-hidden', 'true');
        informationPanel.appendChild(document.createTextNode(dataStorage[randomize]));
        informationPanel.appendChild(helpIcon);
        createInformationBlock.appendChild(informationPanel);
        setTimeout(function () {
            informationPanel.remove();
        }, 14000);
    }, 15000);
    title.appendChild(document.createTextNode('Для голосового управления используйте команды:'));
    createInformationBlock.appendChild(title);
    header.append(createInformationBlock);
    setInterval(function () {
        var scrollTracking = window.pageYOffset;
        if (scrollTracking > 88) {
            createInformationBlock.className = 'scrollTrackingActive';
        } else {
            createInformationBlock.className = 'leftInformationBlock';
        }
    }, 200)
}

/*** Voice analysis ***/
function speech() {
    recognizer.start();
    microphone.css({'background': '#f25f43', 'color': '#2a2a2a'});

    /** Создаём callback **/
    recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex],
            informationStorage = '',
            voiceScroll = window.pageYOffset,
            screenHeight = screen.height;
        if (result.isFinal) {
            informationStorage = result[0].transcript;
            finalResultVoice.val(result[0].transcript);
            setTimeout(function () {
                finalResultVoice.val('');
            }, 5000);
        }
        switch (informationStorage) {
            case ('связаться с автором'):
                locationBlock.css({'display': 'none'});
                reverseForm.fadeIn('slow', function () {
                    $(this).css({'width': '100%', 'display': 'block'});
                });
                break;
            case ('найти автора на карте'):
                reverseForm.css({'display': 'none'});
                locationBlock.fadeIn('slow', function () {
                    $(this).css({'width': '100%', 'display': 'block'});
                });
                break;
            case ('найти автора'):
                window.location.href = 'https://new.vk.com/0nesuch07';
                break;
            case ('ниже'):
                screenHeight += screenHeight;
                voiceScroll = screenHeight;
                console.log(screenHeight, 'Сработано screenHeight\n', voiceScroll, 'Получение voiceScroll вниз');
                break;
            default:
                console.log(result[0].transcript);
                return microphone.css({'background': '#292929', 'color': '#f25f43'});
        }
    }
}
//
// /*** Ajax reverse form ***/
// reverseForm.submit(function () {
//     $.ajax({
//         type: "POST",
//         url: "mail.php",
//         data: $(this).serialize()
//     }).done(function () {
//         alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
//         reverseForm[0].reset();
//     });
//     return false;
// });

weGetTheScreenResolution();
function weGetTheScreenResolution() {
    var searchImageOne = $('#search-image-one'),
        searchImageTwo = $('#search-image-two'),
        searchImageThree = $('#search-image-three'),
        searchTextOne = $('#search-text-one'),
        searchTextTwo = $('#search-text-two'),
        searchTextThree = $('#search-text-three');

    /*** Animate Rotate Scroll ***/
    setInterval(function () {
        if (innerWidth > 980) {
            var animated = window.pageYOffset;
            if (animated >= 2900 && animated <= 3849) {
                searchImageOne.css({'transition': 'all 2s', 'transform': 'rotate(0deg) translateX(0)', 'opacity': '1'});
                searchTextOne.css({'transition': 'all 2s', 'transform': 'rotate(0deg) translateX(0)', 'opacity': '1'})
            } else {
                searchImageOne.css({
                    'transition': 'all 1s', 'transform': 'rotate(-45deg) translate(-200px)', 'opacity': '0'
                });
                searchTextOne.css({
                    'transition': 'all 1s', 'transform': 'rotate(45deg) translate(200px)', 'opacity': '0'
                });
            }
            if (animated >= 3449 && animated <= 4349) {
                searchImageTwo.css({'transition': 'all 2s', 'transform': 'rotate(0deg) translateX(0)', 'opacity': '1'});
                searchTextTwo.css({'transition': 'all 2s', 'transform': 'rotate(0deg) translateX(0)', 'opacity': '1'})
            } else {
                searchImageTwo.css({
                    'transition': 'all 1s', 'transform': 'rotate(-45deg) translate(-200px)', 'opacity': '0'
                });
                searchTextTwo.css({
                    'transition': 'all 1s',
                    'transform': 'rotate(45deg) translate(200px)', 'opacity': '0'
                });
            }
            if (animated >= 4111 && animated <= 4811) {
                searchImageThree.css({
                    'transition': 'all 2s', 'transform': 'rotate(0deg) translateX(0)', 'opacity': '1'
                });
                searchTextThree.css({'transition': 'all 2s', 'transform': 'rotate(0deg) translateX(0)', 'opacity': '1'})
            } else {
                searchImageThree.css({
                    'transition': 'all 1s', 'transform': 'rotate(-45deg) translate(-200px)', 'opacity': '0'
                });
                searchTextThree.css({
                    'transition': 'all 1s', 'transform': 'rotate(45deg) translate(200px)', 'opacity': '0'
                });
            }
        } else {
            return false;
        }
    }, 200);
}

$(document).ready(function () {

    /*** Show and hide header panel ***/
    setInterval(function () {
        var scrollTracking = window.pageYOffset;
        var widthScreenBrowser = window.innerWidth;
        if (widthScreenBrowser < 980) {
            voiceInformationBlock.css({'display': 'none'});
        } else if (scrollTracking > 88) {
            voiceInformationBlock.css({'top': '45px'});
            voiceInformationBlock.fadeOut(5000, function () {
                $(this).css({'display': 'none'});
            });
        } else {
            voiceInformationBlock.css({'display': 'block', 'top': '140px'});
        }
    }, 200);
    searchMeLocation.click(function () {
        logic = !logic;
        if (!logic) {
            reverseForm.css({'display': 'none'});
            locationBlock.fadeIn('slow', function () {
                $(this).css({'width': '100%', 'display': 'block'});
            });
        } else {
            locationBlock.fadeIn('slow', function () {
                $(this).css({'width': '0', 'display': 'none'});
            });
        }
    });
    feedbackForm.click(function () {
        logic = !logic;
        if (!logic) {
            locationBlock.css({'display': 'none'});
            reverseForm.fadeIn('slow', function () {
                $(this).css({'width': '100%', 'display': 'block'});
            });
        } else {
            reverseForm.fadeIn('slow', function () {
                $(this).css({'display': 'none'});
            });
        }
    });
    setInterval(function () {
        var animated = window.pageYOffset;
        if (animated > 500) {
            upScroll.fadeIn(500,function () {
                upScroll.css({'display':'block'})
            })
        } else {
            upScroll.fadeOut(500,function () {
                upScroll.css({'display':'none'})
            })
        }
    }, 300);

    /*** Carousel ***/
    $(".fancybox").fancybox();

    /*** Smooth to scroll ***/
    logo.on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top - 45}, 1500);
    });

    upScroll.on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    /*** block images ***/
    setInterval(function () {
        $('img').attr({
            'ondrag': 'return false',
            'ondragdrop': 'return false',
            'ondragstart': 'return false'
        });
    }, 300);
});

$(function() {
    if(!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    }
    reverseForm.submit(function() {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            setTimeout(function() {
                // Done Functions
                th.trigger("reset");
            }, 200);
        });
        return false;
    });
    try {
        $.browserSelector();
        if($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch(err){}
    $("img, a").on("dragstart", function(event) { event.preventDefault(); });
});
