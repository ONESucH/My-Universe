;(function ($, window) {

    var defaults = {
        ratio: 16 / 9, // usually either 4/3 or 16/9 -- tweak as needed
        videoId: 'Zz7ldlZX8Cs',
        mute: true,
        repeat: true,
        width: $(window).width(),
        wrapperZIndex: 10,
        playButtonClass: 'tubular-play',
        pauseButtonClass: 'tubular-pause',
        muteButtonClass: 'tubular-mute',
        volumeUpClass: 'tubular-volume-up',
        volumeDownClass: 'tubular-volume-down',
        increaseVolumeBy: 10,
        start: 0
    };

    var tubular = function (node, options) {
        var options = $.extend({}, defaults, options),
            $body = $('.three-section'),
            $node = $(node);


        var tubularContainer = '<div id="tubular-container" style="overflow:hidden; position:absolute; left:0; right:0; top:0; bottom:0; z-index:1;opacity:.3;"><div id="tubular-player" style="position: relative; width: 100%; height: 950px;"></div></div><div id="tubular-shield" style=" position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 2;"></div>';

        $body.prepend(tubularContainer);
        $node.className = 'three-section';

        window.player;
        window.onYouTubeIframeAPIReady = function () {
            player = new YT.Player('tubular-player', {
                width: options.width,
                height: Math.ceil(options.width / options.ratio),
                videoId: options.videoId,
                playerVars: {
                    controls: 0,
                    showinfo: 0,
                    modestbranding: 1,
                    wmode: 'transparent'
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        window.onPlayerReady = function (e) {
            resize();
            if (options.mute) e.target.mute();
            e.target.seekTo(options.start);
            e.target.playVideo();
        };

        window.onPlayerStateChange = function (state) {
            if (state.data === 0 && options.repeat) {
                player.seekTo(options.start);
            }
        };

        var resize = function () {
            var width = $(window).width(),
                pWidth,
                height = 1000,
                pHeight,
                $tubularPlayer = $('#tubular-player');

            if (width / options.ratio < height) {
                pWidth = Math.ceil(height * options.ratio);
                $tubularPlayer.width(pWidth).height(height).css({left: (width - pWidth) / 2, top: 0});
            } else {
                pHeight = Math.ceil(width / options.ratio);
                $tubularPlayer.width(width).height(pHeight).css({left: 0, top: (height - pHeight) / 0});
            }
        };

        $(window).on('resize.tubular', function () {
            resize();
        });

        $('body').on('click', '.' + options.playButtonClass, function (e) { // play button
            e.preventDefault();
            player.playVideo();
        }).on('click', '.' + options.pauseButtonClass, function (e) { // pause button
            e.preventDefault();
            player.pauseVideo();
        }).on('click', '.' + options.muteButtonClass, function (e) { // mute button
            e.preventDefault();
            (player.isMuted()) ? player.unMute() : player.mute();
        }).on('click', '.' + options.volumeDownClass, function (e) { // volume down button
            e.preventDefault();
            var currentVolume = player.getVolume();
            if (currentVolume < options.increaseVolumeBy) currentVolume = options.increaseVolumeBy;
            player.setVolume(currentVolume - options.increaseVolumeBy);
        }).on('click', '.' + options.volumeUpClass, function (e) { // volume up button
            e.preventDefault();
            if (player.isMuted()) player.unMute(); // if mute is on, unmute
            var currentVolume = player.getVolume();
            if (currentVolume > 100 - options.increaseVolumeBy) currentVolume = 100 - options.increaseVolumeBy;
            player.setVolume(currentVolume + options.increaseVolumeBy);
        })
    };

    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $.fn.tubular = function (options) {
        return this.each(function () {
            if (!$.data(this, 'tubular_instantiated')) {
                $.data(this, 'tubular_instantiated',
                    tubular(this, options));
            }
        });
    }

})(jQuery, window);