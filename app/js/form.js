'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global app, $ */
app.partial.form = function(){


	$('.form-page .close').on('click', function(e){
		return app.changeView('video', e);
	});

	var form = {};

	$('.submit').on('click', function(){
		if(checkFields()){
			send();
		}
	});

	function checkFields(){
		form.sName = $('[name=sName]').val();
		form.sEmail = $('[name=sEmail]').val();
		form.sName = $('[name=sAddr]').val();
		form.sName = $('[name=sMobile]').val();
		return true;
	}

	function send(){
		$.ajax({
			url: 'http://www1.jwttw.com/event/sofy/2016waka/SaveData.ashx',
			data: form,
			method: 'post',
			dataType: 'json',
			contentType: 'json'
		}).success(function(r){
			if(r.Success == '0'){
				alert(r);
			}else{
				app.changeView('thankyou');
			}
		}).error(function(e){
			alert(e);
		});
	}
};	
