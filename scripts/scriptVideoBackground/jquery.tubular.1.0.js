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

    var tubular=function(e,t){var t=$.extend({},defaults,t),a=$(".three-section"),i=$(e),n='<div id="tubular-container" style="overflow:hidden; position:absolute; left:0; right:0; top:0; bottom:0; z-index:1;opacity:.3;"><div id="tubular-player" style="position: relative; width: 100%; height: 950px;"></div></div><div id="tubular-shield" style=" position: absolute; left: 0; right: 0; top: 0; bottom: 0; z-index: 2;"></div>';a.prepend(n),i.className="three-section",window.player,window.onYouTubeIframeAPIReady=function(){player=new YT.Player("tubular-player",{width:t.width,height:Math.ceil(t.width/t.ratio),videoId:t.videoId,playerVars:{controls:0,showinfo:0,modestbranding:1,wmode:"transparent"},events:{onReady:onPlayerReady,onStateChange:onPlayerStateChange}})},window.onPlayerReady=function(e){o(),t.mute&&e.target.mute(),e.target.seekTo(t.start),e.target.playVideo()},window.onPlayerStateChange=function(e){0===e.data&&t.repeat&&player.seekTo(t.start)};var o=function(){var e,a,i=$(window).width(),n=1e3,o=$("#tubular-player");i/t.ratio<n?(e=Math.ceil(n*t.ratio),o.width(e).height(n).css({left:(i-e)/2,top:0})):(a=Math.ceil(i/t.ratio),o.width(i).height(a).css({left:0,top:(n-a)/0}))};$(window).on("resize.tubular",function(){o()}),$("body").on("click","."+t.playButtonClass,function(e){e.preventDefault(),player.playVideo()}).on("click","."+t.pauseButtonClass,function(e){e.preventDefault(),player.pauseVideo()}).on("click","."+t.muteButtonClass,function(e){e.preventDefault(),player.isMuted()?player.unMute():player.mute()}).on("click","."+t.volumeDownClass,function(e){e.preventDefault();var a=player.getVolume();a<t.increaseVolumeBy&&(a=t.increaseVolumeBy),player.setVolume(a-t.increaseVolumeBy)}).on("click","."+t.volumeUpClass,function(e){e.preventDefault(),player.isMuted()&&player.unMute();var a=player.getVolume();a>100-t.increaseVolumeBy&&(a=100-t.increaseVolumeBy),player.setVolume(a+t.increaseVolumeBy)})},tag=document.createElement("script");tag.src="//www.youtube.com/iframe_api";var firstScriptTag=document.getElementsByTagName("script")[0];firstScriptTag.parentNode.insertBefore(tag,firstScriptTag),$.fn.tubular=function(e){return this.each(function(){$.data(this,"tubular_instantiated")||$.data(this,"tubular_instantiated",tubular(this,e))})};

})(jQuery, window);