'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, TweenMax, Hammer share */
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
		return changeView('loop', e);
	});
	$('.scrolldown').on('click', function(e){
		TweenMax.to('.content article', 0.5,  {scrollTop: 1});
		return changeView('home', e);
	});

	$('.menu nav a:eq(0)').on('click', function(e){
		return changeView('video-carousel', e);
	});

	$('.menu nav a:eq(1)').on('click', function(e){
		TweenMax.to('.home-content article', 1, {scrollTop: 1});
		return changeView('home', e);
	});

	$('.menu nav a:eq(2)').on('click', function(e){
		if( $(window).width() > 768){
			// TweenMax.to('.home-content article', 1, {scrollTop: 935*0.8});
			TweenMax.to('.home-content article', 1, {scrollTop: 909});
		}else{
			TweenMax.to('.home-content article', 1, {scrollTop: 1270 / 375 * $(window).width()});
		}
		return changeView('home', e);
	});

	$('.menu nav a:eq(3)').on('click', function(e){
		if( $(window).width() > 768){
			// TweenMax.to('.home-content article', 1, {scrollTop: 2078*0.8});
			TweenMax.to('.home-content article', 1, {scrollTop: 1915});
		}else{
			TweenMax.to('.home-content article', 1, {scrollTop: 2115 / 375 * $(window).width()});
		}
		return changeView('home', e);
	});

	$('.menu nav a:eq(4)').on('click', function(e){
		// TweenMax.set('.content article', {scrollTop: 0});
		return changeView('rule', e);
	});


	$('.kv-container a').on('click', function(e){
		return changeView('video-carousel', e);
	});

	$('.kv-container').on('mousewheel',function(e){
		if(e.deltaY < 0){
			TweenMax.set('.home-content article', {scrollTop: 1});
			return app.changeView('home', e);
		}
		return false;
	});

	var kvc = new Hammer($('.kv-container')[0]);
	kvc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	kvc.on('swipeup',function(e){
		TweenMax.to('.home-content article', 1, {scrollTop: 1});
		return app.changeView('home');
	});

	$('.menu-f').on('click', function(){
		share.facebook(location.href.replace(location.search,'').replace(location.hash,''), '喬喬的午茶約會');
	});

	var viewStack = [];

	function changeView(view, e){
		$('body').removeClass('menu');
		var views = ['loading', 'loop', 'rule', 'video', 'form', 'thankyou', 'home part1', 'home part2', 'home part3', 'video-carousel'];
		var rm = views.join(' ').replace(view);
		$('body').removeClass(rm).addClass(view);

		$('body').trigger('viewport:' + view);
		$('body').trigger('viewport:change', view);

		viewStack.push(view);

		if(e){
			e.stopPropagation();
			e.preventDefault();
		}
		return false;
	}

	function viewBack(e){
		if(viewStack.length){
			viewStack.pop();
			var view = viewStack[viewStack.length - 1];
			changeView(view);
		}
		if(e){
			e.stopPropagation();
			e.preventDefault();
		}
		return false;
	}

	$('body').on('viewport:video', function(e){
		// console.log(e);
	});
	$('body').on('viewport:change', function(e, view){
	});

	// $('.home-content article').on('mousewheel', function(e){
	// 	console.log(app.freezeHome)
	// 	if(app.freezeHome){
	// 		// console.log('freeze');
	// 		e.stopPropagation();
	// 		e.preventDefault();
	// 		return false;
	// 	}
	// });
	$('body').on('viewport:home', function(e){
		var cont = $('.home-content article');
		// app.freezeHome = true;
		// setTimeout(function(){
		// 	app.freezeHome = false;
		// }, 800);
		cont.unbind('scroll').on('scroll', function(e){
			if(cont.scrollTop() == 0 && $('body').hasClass('home')){
				$('.logo').trigger('click');
			}else{
				// hc.off('swipedown');
				// hc.get('swipe').set({ direction: null });
			}
		});
	});

	


	app.changeView = changeView;
	app.viewBack = viewBack;
};
