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
		return changeView('video', e);
	});
	$('.scrolldown').on('click', function(e){
		TweenMax.set('.content article', {scrollTop: 0});
		return changeView('home', e);
	});

	$('.menu nav a:eq(0)').on('click', function(e){
		$('.video-background .video-container').slick('slickGoTo', 0);
		return changeView('video', e);
	});

	$('.menu nav a:eq(1)').on('click', function(e){
		$('.video-background .video-container').slick('slickGoTo', 1);
		return changeView('video', e);
	});

	$('.menu nav a:eq(2)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 935});
		return changeView('home', e);
	});

	$('.menu nav a:eq(3)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 2078});
		return changeView('home', e);
	});

	$('.menu nav a:eq(4)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 0});
		return changeView('rule', e);
	});


	$('.rule-page .close').on('click', function(e){
		return changeView('video', e);
	});


	function changeView(view, e){
		$('body').removeClass('menu');
		var views = ['rule', 'home', 'video'];
		var rm = views.join(' ').replace(view);
		$('body').removeClass(rm).addClass(view);
		e.stopPropagation();
		e.preventDefault();
		return false;
	}
};
