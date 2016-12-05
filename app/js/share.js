'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, share $ */
app.partial.share = function(){
	$('.share a').on('click', function(e){
		share.facebook($(this).parent().attr('data-ref'), '喬喬的午茶約會', true);
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
};	
