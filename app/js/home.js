'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app */
app.partial.home = function(){


	$(window).width() > 768 ?
		$('.content article').niceScroll() :
		null;

	$('.bloggers a').on('click', function(e){
		$('#' + $(this).attr('data-target')).addClass('fade in');
		e.stopPropagation();
		e.preventDefault();
	});

	$(window).resize(function(e){
		$(window).width() > 768 ?
			$('.blogger-box article aside').mCustomScrollbar({
				autoDraggerLength: false
			}) : 			
			$('.blogger-box article aside').mCustomScrollbar('destroy') ;

	});

};	
