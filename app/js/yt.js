'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, YT, ProgressBar */
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


		var fragTick = 0;
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
				var totalTime = playing.getDuration();

				clearInterval(fragTick);
				fragTick = setInterval(function(){
					var fragPercent = playing.getVideoLoadedFraction() * 100;
					var currentTime = playing.getCurrentTime();
					var played = currentTime/totalTime * 100;
					$('.duration .played', playing.pe).width(played + '%');

					if(fragPercent < 100){
						$('.duration .downloaded', playing.pe).width(fragPercent + '%');
					}
					if(played === 100){
						playing.pauseVideo();
					}
				}, 25);

				$('.duration', playing.pe).unbind('click').on('click', function(e){
					var percent = (e.clientX - $(this).offset().left) / $('.duration .downloaded', playing.pe).width();
					var to = Math.floor(percent * totalTime);
					$('.duration .played', playing.pe).width(percent*100 + '%');

					playing.seekTo(to, true);
					
					e.stopPropagation();
					e.preventDefault();
					return false;
				});

			}else{
				this.pauseVideo();
				clearInterval(fragTick);

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
		}).find('.share, .prev, .next, .duration').on('mousemove', function(e){
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

		var kvloop = new YT.Player('kvloop', {
			events:{
				onStateChange: function(){
					// console.log('onStateChange');
				}
			}
		});

		var played = false;
		var wait4loop = setInterval(function(){
			if($(window).width() <= 768 || $('html.ios').length){
				clearInterval(wait4loop);
				app.changeView('loop');
				return;
			}
			if(!kvloop.playVideo){
				return;
			}
			kvloop.playVideo();
			var frac = kvloop.getVideoLoadedFraction();
			kvloop.mute();
			if(frac > 0){
				bar.animate(frac);	
			}
			if(frac >= 1 && !played){
				// clearInterval(wait4loop);
				kvloop.pauseVideo();	
				kvloop.seekTo(0);
				setTimeout(function(){
					app.changeView('loop');
					kvloop.playVideo();	
				}, 750);
				played = true;
			}

			var ct = kvloop.getCurrentTime();
			var tt = kvloop.getDuration();
			// console.log((tt-ct) <= 2);
			if((tt-ct) <= 0.1){
				kvloop.seekTo(0);
			}
		}, 100);

		$('body').on('viewport:change', function(e, view){

			if($(window).width() > 768){
				if(view !== 'loop' && kvloop.pauseVideo){
					kvloop.pauseVideo();
				}else{
					kvloop.playVideo();
				}
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



	// progressbar.js@1.0.0 version is used
	// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

	var bar = new ProgressBar.Circle(document.getElementById('fragLoading'), {
	  color: '#aaa',
	  // This has to be the same size as the maximum width to
	  // prevent clipping
	  strokeWidth: 2,
	  trailWidth: 0,
	  easing: 'easeInOut',
	  duration: 50,
	  text: {
	    autoStyleContainer: false
	  },
	  from: { color: '#fff', width: 1 },
	  to: { color: '#fff', width: 2 },
	  // Set default step function for all animate calls
	  step: function(state, circle) {
	    circle.path.setAttribute('stroke', state.color);
	    circle.path.setAttribute('stroke-width', state.width);

	    var value = Math.round(circle.value() * 100);
	    if (value === 0) {
	      circle.setText('');
	    } else {
	      circle.setText(value);
	    }

	  }
	});
	bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
	bar.text.style.fontSize = '2rem';


	var sec1 = Math.random() / 100 / 3;
	var sec2 = Math.random() / 10;
	var pres = sec1 + sec2;

	setTimeout(function(){
		bar.animate(sec1); 
	}, sec1 * 250 + 100);

	setTimeout(function(){
		bar.animate(sec2); 
	}, sec2 * 250 + 500);
};	


