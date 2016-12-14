'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, ga */
app.partial.ga = function(){

	var ismobile = $('html.mobile, html.tablet').length;
	app.ismobile = ismobile;

	$('[data-ga]').on('click', function(){
		if(!ismobile){
			ga('send', 'event', 'Button', 'click', $(this).attr('data-ga'));
		}
		
	});
	$('[data-ga-m]').on('click', function(){
		if(ismobile){
			ga('send', 'event', 'Button', 'click', $(this).attr('data-ga-m'));
		}
	});
	$('body').on('viewport:change', function(e, view){
		// ga('send', 'pageview', { 'page': 'index.html', 'title': $(this).attr('data-ga') });
		switch(view){
			case 'home':
				if(!ismobile){
					ga('send', 'pageview', { 'page': 'product', 'title': 'pv_product'});
				}else{
					ga('send', 'pageview', { 'page': 'product', 'title': 'pv_product_m'});
				}
				break;
			case 'form':
				if(!ismobile){
					ga('send', 'pageview', { 'page': 'keyin', 'title': 'pv_keyin'});
				}else{
					ga('send', 'pageview', { 'page': 'keyin', 'title': 'pv_keyin_m'});
				}
				break;
			case 'thankyou':
				if(!ismobile){
					ga('send', 'pageview', { 'page': 'thank', 'title': 'pv_thank'});
				}else{
					ga('send', 'pageview', { 'page': 'thank', 'title': 'pv_thank_m'});
				}
				break;
			case 'video-carousel':
				var videoIdx = $('.slick-current').index() + 1;
				if(!ismobile){
					ga('send', 'pageview', { 'page': 'video_' + videoIdx, 'title': 'pv_video_' + videoIdx });
				}else{
					ga('send', 'pageview', { 'page': 'video_' + videoIdx, 'title': 'pv_video_' + videoIdx + '_m'});
				}
				break;
			default:
				ga('send', 'pageview', { 'page': view, 'title': 'pv_' + view});
				break;

		}

	});
	$('.video-background .video-container').on('afterChange', function(){
		var videoIdx = $('.slick-current').index() + 1;
		if(!ismobile){
			ga('send', 'pageview', { 'page': 'intro', 'title': 'pv_video_' + videoIdx });

		}else{
			ga('send', 'pageview', { 'page': 'intro', 'title': 'pv_video_' + videoIdx + '_m'});
		}
	});
	$('.bloggers li').on('click', function(e){
		var kolIdx = $(this).index() + 1;
		if(!ismobile){
			ga('send', 'pageview', { 'page': 'intro', 'title': 'pv_kol_' + kolIdx });
		}else{
			ga('send', 'pageview', { 'page': 'intro', 'title': 'pv_kol_' + kolIdx + '_m'});
		}
	});
	ga('send', 'pageview', { 'page': 'intro', 'title': 'pv_intro'});
};
