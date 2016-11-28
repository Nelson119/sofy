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
};
