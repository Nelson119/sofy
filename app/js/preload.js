'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, $ */
app.partial.preload = function(){



	var imagePreload = {}, elements = [];
	$('[data-src]').each(function(idx, ele){
		if($(ele).attr('data-src')){
			imagePreload[$(ele).attr('data-src')] = false;
			elements.push(ele);
		}
	});
	
	$.each(imagePreload, function(src, stat){
		var img = new Image();
		img.onload = function(){
			imagePreload[src] = true;
			var alldone = true;
			$.each(imagePreload, function($s, $done){
				alldone = $done && alldone;
			});

			if(alldone){
				//全部圖片下載完成
				imageLoaded();
			}
		};
		img.src = src;
	});

	function imageLoaded(){
		$.each(elements, function(index, ele){
			// //載入後 加到背景
			if(ele.tagName.toLowerCase() === 'img'){
				$(ele).attr('src', $(ele).attr('data-src'));
			}else{
				$(ele).css('background-image', 'url(' + $(ele).attr('data-src') + ')');
			}
		});

		$('.page:eq(0)').addClass('init');
	}
};	
