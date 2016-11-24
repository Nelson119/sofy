'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app */
app.partial.yt = function(){
	// 2. This code loads the IFrame Player API code asynchronously.
	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	// 3. This function creates an <iframe> (and YouTube player)
	//    after the API code downloads.

	var playing = null;

	window.onYouTubeIframeAPIReady = function () {

	
		$('.video-background .video-container').on('init', function(){
			$('.video-background .video .player').each(function(i){

				$('iframe', this).attr('id', 'player' + i)
				var player = new YT.Player('player' + i);

				$(this).on('click', function(){
					player.play();
				});

				player.pe = this;

			});
		}).slick({
			arrows: false
		}).on('afterChange', function(){
			if(playing != null){
				playing.play();
			}
		});

		YT.Player.prototype.play = function(){
			// alert('');
			if(this.getPlayerState() !== 1){
				if(playing != null){
					playing.pauseVideo();	
				}
				this.playVideo();
				playing = this;
				$(this.pe).addClass('playing');
				$(this.pe).removeClass('paused');
				$(this.pe).siblings().addClass('paused');

			}else{
				this.pauseVideo();
				playing = null;
				$(this.pe).removeClass('playing');
				$(this.pe).addClass('paused');
			}
		}
	};
};	
