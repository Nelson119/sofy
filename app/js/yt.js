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
					player.carouselPlay();
				});

				player.pe = this;

			});
		}).slick({
			arrows: false,
			infinite: false,
			dots: true
		}).on('beforeChange', function(){
			// if($(window).width() > 768){
			// 	players[$('.slick-current').index()].playVideo();
			// }
		}).on('afterChange', function(){
			if($(window).width() > 768){
				players[$('.slick-current').index()].carouselPlay();
			}
		});


		YT.Player.prototype.carouselPlay = function(){

			if(this.getPlayerState() !== 1){

				playing = this;

				$(this.pe).addClass('playing');
				$(this.pe).removeClass('paused');
				$(this.pe).siblings().removeClass('playing').addClass('paused');

				$.each(players, function(i,d){
					if(this != playing){
						this.pauseVideo();
					}
				});

				playing.playVideo();

			}else{
				this.pauseVideo();

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

		$('.video-background .video-container .video .next').on('click', function(e){
			$('.video-container').slick('slickGoTo', 1);
			e.stopPropagation();
			e.preventDefault();
			return false;
		});

		$('.video-background .video-container .video .prev').on('click', function(e){
			$('.video-container').slick('slickGoTo', 0);
			e.stopPropagation();
			e.preventDefault();
			return false;
		});


		$(window).on('resize', function(){


			var w = $(window).width(),
				h = $(window).innerHeight() || $(window).height(),
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
			$('.slick-dots').remove();
			$('.video-background .video-container').slick('reinit');
		}).trigger('resize');

		var tvc = new YT.Player('tvc');

		var kvloop = new YT.Player('kvloop');

		var wait4loop = setInterval(function(){
			if(kvloop.getPlayerState){
				kvloop.playVideo();
				clearInterval(wait4loop);
				setTimeout(function(){
					app.changeView('loop');
				}, 1000);
			}
		}, 500);

		$('body').on('viewport:change', function(e, view){

			if(view !== 'loop' && kvloop.pauseVideo){
				kvloop.pauseVideo();
			}else{
				kvloop.playVideo();
			}

			if(view !== 'home' && tvc.pauseVideo){
				tvc.pauseVideo();
			}

			if(view == 'video-carousel'){
				$('.video-background .video-container').slick('slickGoTo', $('.slick-active').index());
			}else{
				$.each(players, function(i,d){
					if(this.pauseVideo && $(this.pe).hasClass('playing')){
						this.pauseVideo();
						$(this.pe).removeClass('playing');
						$(this.pe).addClass('paused');
					}
				});
			}
		});


	};

	$('.video-background .close-button').on('click', function(e){
		return app.viewBack(e);
	});

};	


