'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, FB */

var app = {};
app.partial = {};
app.me = {};
app.fbstatus = null;

// var dayOfMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 網址為 gulp 或者 github 時 設定成debug 模式
var debug = /localhost[:]9000|nelson119.github.io/.test(location.href);

var share = {
	facebook: function(href, title, goform){
		// href = encodeURIComponent(href || location.href + '?utm_source=facebook&utm_medium=share&utm_campaign=sofy');
		// title = encodeURIComponent(title || document.title);
		// window.open('https://www.facebook.com/sharer.php?u='+href+'&amp;t='+title);

		if(!goform){
			window.open('https://www.facebook.com/share.php?u='+encodeURIComponent(href+'?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=sofy'));
			return false;
		}

		if(app.fbstatus != 'connected'){
			FB.login(function(r){
				if(r.status === 'connected'){				
					app.fbstatus = r.status;
					ui(href);
					me();
				}else{
					console.log('not logged in');
				}
			}, {
				scope: 'email'
			});
		}else{
			ui(href);
			me();
		}

		function me(){
			FB.api('/me', function(me){
				app.me.name = me.name;
				app.me.email = me.email;
				app.me.fbid = me.id;
			});
		}

		function ui(h){
			FB.ui({
  				method: 'feed',
  				link: h
			},
			function(r) {
				if(!goform){
					return;
				}
				if (r && !r.error_message) {
					app.changeView('form');
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
	});
};

$(function(){

    // 定義每個section
	$.each(app.partial, function(name, init){
		init();
    });



	//觸發第一次調整頁面尺寸
	$(window).trigger('resize');

	if(location.hash == '#rule'){
		app.changeView('rule');
	}

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


