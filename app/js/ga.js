'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $, ga */
app.partial.ga = function(){
	$('a[data-ga]').on('click', function(){
		ga('send', 'event', 'Button', 'click', $(this).attr('data-ga'));
	});

	$('.page[data-ga]').on('page:in', function(r){
		ga('send', 'pageview', { 'page': 'index.html', 'title': $(this).attr('data-ga') });
		// console.log( { 'page': 'default.htm', 'title': '活動首頁' });
	});
};
