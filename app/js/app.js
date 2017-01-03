'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global  $, FB, ProgressBar */

var app = {};
app.partial = {};
app.me = {};
app.fbstatus = null;

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|www1.jwttw.com/.test(location.href);

app.debug = debug;

var share = {
	facebook: function(href, title, goform){
		// href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=share&utm_campaign=sofy');
		// title = encodeURIComponent(title || document.title);
		// window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);

		if(!goform){
			window.open('https://www.facebook.com/share.php?u='+encodeURIComponent(href+'?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=sofy'));
			return false;
		}

		// if(app.fbstatus != 'connected'){
			// if(!/crios/ig.test(navigator.userAgent)){
			// 	FB.login(function(r){
			// 		if(r.status === 'connected'){				
			// 			app.fbstatus = r.status;
			// 			ui(href);
			// 			me();
			// 		}else{
			// 			console.log('not logged in');
			// 		}
			// 	}, {
			// 		scope: 'email'
			// 	});

			// }else{
				window.open('https://www.facebook.com/share.php?u='+encodeURIComponent(href+'?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=sofy'));
				app.changeView('form');
			// }
		// }else{
		// 	ui(href);
		// 	me();
		// }

		function me(){
			FB.api('/me', function(me){
				app.me.name = me.name;
				app.me.email = me.email;
				app.me.fbid = me.id;
			});
		}

		function ui(h){
			if( $(window).width() > 768 ){
				$('body').addClass('share');
			}
			FB.ui({
  				method: 'feed',
  				link: h,
  				display: ( app.ismobile ? 'touch' : 'iframe')
			},
			function(r) {
				if(!goform){
					return;
				}
				if (r && !r.error_message) {
					app.changeView('form');
				}
				if( $(window).width() > 768 ){
					$('body').removeClass('share');
				}
			});
		}
	},
	googleplus: function(href){
		href = encodeURIComponent(href || location.href + '?utm_source=g+&utm_medium=fbshare_m&utm_campaign=sofy');
		window.open('https://plus.google.com/share?url=' + href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
	},
	email: function(href, title){
		href = encodeURIComponent(href || location.href + '?utm_source=email&utm_medium=fbshare_m&utm_campaign=sofy');
		title = encodeURIComponent(title || document.title);
		var body = encodeURIComponent(''+href+' #' +title+'');
		window.open('https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:'+title+'&body='+body+'&bcc=');
	}
};
window.fbAsyncInit = function() {
	FB.init({
		appId      : (debug ? '227687320989903' : '227679697657332'),
		xfbml      : true,
		version    : 'v2.7'
	});

	FB.getLoginStatus(function(r) {
		app.fbstatus = r.status;
		if(extractUrlValue('code')){
			share.facebook(decodeURIComponent(extractUrlValue('shref')), null , true);
		}
	});
};
if(extractUrlValue('error_code')){
	alert('請先同意存取');
}
$(function(){

	if($(window).width() <= 768 || $('html.ios').length){
		gifLoad();
	}

	function gifLoad(){
		var gif = new Image();
		gif.onload = function(){	
			app.bar.animate(1);			
			setTimeout(function(){
				if(location.hash == '#rule'){
					app.changeView('rule');
				}else{
					app.changeView('loop');	
				}
			}, 750);
			return;
		};
		gif.src = $('.kv-container .player .kvloop').attr('data-src');
	}

    // 定義每個section
	$.each(app.partial, function(name, init){
		init();
    });


	$(window).hammer().on('tap scroll resize', function(){
		if( $(window).width() <= 768 && window.innerHeight < 560 ){
			$('.video-carousel .video-background').addClass('short');
		}else if($('.video-background').hasClass('short')){
			$('.video-background').removeClass('short');
		}
		if( $(window).width() <= 768 && window.innerHeight ){
			$('html, body, .video-background, .sky-background').height(window.innerHeight);
		}else{
			$('html, body, .video-background, .sky-background').removeAttr('style');
		}
	});
	$('body').on('viewport:video-carousel', function(e){
		$(window).trigger('tap');
		if( $(window).width() <= 768 && window.innerHeight ){
			$('html, body, .video-background, .sky-background').height(window.innerHeight);
		}
	});

	//觸發第一次調整頁面尺寸
	$(window).trigger('resize');



});




//判斷是否具有屬性
$.fn.hasAttr = function(attributeName){
	var attr = $(this).attr(attributeName);
	if (typeof attr !== typeof undefined && attr !== false) {
		return true;
	}else{
		return false;
	}
};

function extractUrlValue(key, url)
{
	if (typeof url === 'undefined'){
		url = window.location.href;
	}
	var match = url.match('[?&]' + key + '=([^&]+)');
	return match ? match[1] : null;
}

app.extractUrlValue = extractUrlValue;


// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

app.bar = new ProgressBar.Circle(document.getElementById('fragLoading'), {
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
app.bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
app.bar.text.style.fontSize = '2rem';


var sec1 = Math.random() / 100 / 3;
var sec2 = Math.random() / 10;
var pres = sec1 + sec2;

setTimeout(function(){
	app.bar.animate(sec1); 
}, sec1 * 250 + 100);

setTimeout(function(){
	app.bar.animate(sec2); 
}, sec2 * 250 + 500);



