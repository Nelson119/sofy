'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, TweenMax */
app.partial.menu = function(){
	$('header .burger').on('click', function(){
		$('body').addClass('menu');
		$('.menu').hammer().one('swiperight',function(e){
		  $('body').removeClass('menu');
		});
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
		return changeView('home part1', e);
	});

	$('.menu nav a:eq(0)').on('click', function(e){
		$('.video-background .video-container').slick('slickGoTo', 0);
		return changeView('video', e);
	});

	$('.menu nav a:eq(1)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 0});
		return changeView('home part1', e);
	});

	$('.menu nav a:eq(2)').on('click', function(e){
		if( $(window).width() > 768){
			TweenMax.to('.content article', 0.5, {scrollTop: 935*0.8});
		}else{
			TweenMax.to('.content article', 0.5, {scrollTop: 0});
		}
		return changeView('home part2', e);
	});

	$('.menu nav a:eq(3)').on('click', function(e){
		if( $(window).width() > 768){
			TweenMax.to('.content article', 0.5, {scrollTop: 2078*0.8});
		}else{
			TweenMax.to('.content article', 0.5, {scrollTop: 0});
		}
		return changeView('home part3', e);
	});

	$('.menu nav a:eq(4)').on('click', function(e){
		TweenMax.to('.content article', 0.5, {scrollTop: 0});
		return changeView('rule', e);
	});


	$('.kv-container a').on('click', function(e){
		changeView('video-carosel', e);
	});


	function changeView(view, e){
		$('body').removeClass('menu');
		var views = ['rule', 'video', 'form', 'thankyou', 'home part1', 'home part2', 'home part3', 'video-carosel'];
		var rm = views.join(' ').replace(view);
		$('body').removeClass(rm).addClass(view);
		if(e){
			e.stopPropagation();
			e.preventDefault();
		}
		return false;
	}

	app.changeView = changeView;
};
