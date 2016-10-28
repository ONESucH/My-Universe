'use strict';
var reverseForm = $('.reverse-form'),
    searchMeLocation = $('#searchMeLocation'),
    feedbackForm = $('#feedbackForm'),
    locationBlock = $('.location'),
    header = $('.header'),
    finalResultVoice = $('#finalResultVoice'),
    microphone = $('#microphone'),
    rightTopBlock = $('.voice-information-block'),
    dataStorage = ['связаться с автором', 'найти автора на карте', 'найти автора'],
    recognizer = new webkitSpeechRecognition(),
    upScroll = $('.up-scroll'),
    fiveSection = $('.five-section'),
    logo = $('.logo'),
    logic = true;

/*** Initialization ***/
new WOW().init();
recognizer.lang = 'ru-Ru';
recognizer.interimResults = true;

/*** Information blocks for voice control ***/
/*** Max and min width screen ***/
valuesHandler();
function valuesHandler() {
    var widthScreenBrowser = window.innerWidth;
    if (widthScreenBrowser <= 490) {
        rightTopBlock.css({'display':'none'});
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
        if (scrollTracking > 58) {
            createInformationBlock.className = 'scrollTrackingActive';
            rightTopBlock.removeClass('voice-information-block');
            rightTopBlock.addClass('voice-information-block-active');
            setTimeout(function () {
                rightTopBlock.fadeOut(3000, function () {
                    $(this).css({'display':'none'});
                })
            }, 1500)
        } else {
            createInformationBlock.className = 'leftInformationBlock';
            rightTopBlock.removeClass('voice-information-block-active');
            rightTopBlock.addClass('voice-information-block');
        }
    }, 200)
}

/*** Voice analysis ***/
function speech() {
    recognizer.start();
    microphone.css({'background': '#123f58', 'color': '#caffcf'});

    /** Создаём callback **/
    recognizer.onresult = function (event) {
        var result = event.results[event.resultIndex],
            informationStorage = '';
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
            default:
                console.log(result[0].transcript);
                return microphone.css({'background': '#123f58', 'color': '#caffcf'});
        }
    }
}

$(window).bind('scroll', function() {
    var vScroll = $(this).scrollTop();
    if (vScroll > fiveSection.offset().top - 350) {
        show_graphics();
    }
});
function show_graphics() {
    $(window).unbind('scroll');
    $('.circlestat').circliful();
}

$(document).ready(function () {

    /*** Show and hide header panel ***/
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
        $('body,html').animate({scrollTop: top - 42}, 1500);
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
            url: "mail.php",
            data: th.serialize()
        }).done(function() {
            alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
            setTimeout(function() {
                th.trigger("reset");
            }, 200);
            reverseForm.fadeOut('slow', function () {
                reverseForm.css({'display': 'none'});
            });
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
