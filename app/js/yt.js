'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ YT */
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

		var players = [];
		
		$('.video-background .video-container').on('init', function(){
			$('.video-background .video').each(function(i){

				$('iframe', this).attr('id', 'player' + i);
				var player = new YT.Player('player' + i);

				players.push(player);

				$(this).on('click', function(){
					player.play();
				});

				player.pe = this;

			});
		}).slick({
			arrows: false,
			infinite: false
		}).on('afterChange', function(){
			if(playing != null){
				playing.play();
				playing = players[$('.slick-current').index()].playVideo();
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
		};
		var moving = 0;
		$('.video-background .video-container .video').on('mousemove', function(){
			clearTimeout(moving);
			$(this).addClass('mousemove');
			moving = setTimeout(function(){
				$('.video-background .video-container .video').removeClass('mousemove');
			}, 750);
		}).find('.share, .prev, .next').on('mousemove', function(e){
			clearTimeout(moving);
			e.stopPropagation();
		});
		$('.scrolldown').on('click', function(e){
			if(playing != null){
				playing.play();
			}
			e.stopPropagation();
			e.preventDefault();
			return false;
		});

		$(window).on('resize', function(){


			var w = $(window).width(),
				h = $(window).height(),
				ratio = 16 / 9;

			var iframeX = 0,
				iframeY = 0,
				iframeW = w,
				iframeH = h;


			if(w / h >= ratio){
				iframeH = w / ratio;
				iframeW = w;
				iframeY = ((w / ratio - h) / 2 * -1);
				iframeX = 0;
			}else{
				iframeH = h;
				iframeW = h *  ratio + 2;
				iframeY = 0;
				iframeX = ((h *  ratio - w) / 2 * -1);

			}
			$('.video-background iframe').height(iframeH).width(iframeW)
				.css('margin-top', iframeY)
				.css('margin-left', iframeX);

			$('.video-background .video-container').slick('reinit');
		}).trigger('resize');

		var tvc = new YT.Player('tvc');
		
		$('.menu nav a, .logo').on('click', function(){
			tvc.pauseVideo();
			if(playing != null){
				playing.pauseVideo();
			}
		});
	};
};	
