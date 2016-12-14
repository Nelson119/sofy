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
		$('body.menu').hammer().one('swiperight',function(e){
			$('body').removeClass('menu');
			$('body.menu').hammer().unbind('swiperight');
			$('#menuoff').hammer().unbind('tap');
		});
		$('#menuoff').hammer().one('tap', function(e){
			$('body').removeClass('menu');
			$('body.menu').hammer().unbind('swiperight');
			$('#menuoff').hammer().unbind('tap');
		});
	});
	$('.kv-container').hammer().on('swipeleft',function(e){
		$('header .burger').trigger('click');
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
		return changeView('rule', e);
	});

	$('.menu nav a:eq(5)').on('click', function(e){
		return changeView('award', e);
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

	function changeView(view, e, isback){
		$('body').removeClass('menu');
		// console.log('view',view);
		var views = ['loading','home', 'loop', 'rule', 'video', 'form', 'thankyou', 'video-carousel', 'award'];
		var rm = views.join(' ').replace(view);
		$('body').removeClass(rm).addClass(view);

		$('body').trigger('viewport:' + view);
		$('body').trigger('viewport:change', view);
		if(!isback){
			viewStack.push(view);
		}

		if(e){
			e.stopPropagation();
			e.preventDefault();
		}
		return false;
	}

	function viewBack(e){
		if(viewStack.length){
			var view = viewStack[viewStack.length - 2];
			viewStack.pop();
			changeView(view, null, true);
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
		if(view === 'loop' && console.clear){			
			console.clear();
		}
	});

	$('.home-content article .home-page').on('mousewheel', function(e){
		if(app.freezeHome){
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
	});
	var freezeTimeout = 0;
	$('body').on('viewport:home', function(e){
		var cont = $('.home-content article');
		app.freezeHome = true;
		clearTimeout(freezeTimeout);
		setTimeout(function(){
			app.freezeHome = false;
		}, 1000);
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
