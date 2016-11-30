'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app */
app.partial.menu = function(){
	$('header .burger').on('click', function(){
		$('body').addClass('menu');
	});
	$('.menu .menu-x').on('click', function(){
		$('body').removeClass('menu');
	});
	$('.logo').on('click', function(e){
		$('.video-background .video-container').slick('slickGoTo', 0);
		$('body').removeClass('sky').addClass('video');
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
	$('.scrolldown').on('click', function(e){
		$('body').removeClass('video').addClass('sky');
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	$('.menu nav a:eq(0)').on('click', function(e){
		$('.video-background .video-container').slick('slickGoTo', 0);
		$('body').removeClass('sky').addClass('video');
		$('body').removeClass('menu');
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	$('.menu nav a:eq(1)').on('click', function(e){
		$('.video-background .video-container').slick('slickGoTo', 1);
		$('body').removeClass('sky').addClass('video');
		$('body').removeClass('menu');
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	$('.menu nav a:eq(2)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 935});
		$('body').removeClass('video').addClass('sky');
		$('body').removeClass('menu');
		e.stopPropagation();
		e.preventDefault();
		return false;
	});

	$('.menu nav a:eq(3)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 2078});
		$('body').removeClass('video').addClass('sky');
		$('body').removeClass('menu');
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
};
