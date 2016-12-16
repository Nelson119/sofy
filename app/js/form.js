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

	$('.form-page .zip').twzipcode({
		language: 'lang/zh-tw' 
	});

	var form = {};

	$('.submit').on('click', function(){
		if(checkFields()){
			send();
		}
	});
	$('.reset').on('click', function(){
		$('[name=sName]').val('');
		$('[name=sEmail]').val('');
		$('[name=sAddr]').val('');
		$('[name=sMobile]').val('');
		$('[name=district]').val(null);
		$('[name=county]').val(null);
		$('[name=zipcode]').val('');

	});

	function checkFields(){
		form.sName = $('[name=sName]').val();
		form.sEmail = $('[name=sEmail]').val();
		form.sAddr = $('[name=sAddr]').val();
		form.sMobile = $('[name=sMobile]').val();
		form.sDistrict = $('[name=district] option:selected').val();
		form.sCounty = $('[name=county] option:selected').val();
		form.sZip = $('[name=zipcode]').val();
		form.sAD = app.extractUrlValue('utm_source') || 'none';

		if(!form.sName){
			alert('請填寫姓名');
			return false;
		}
		if(!form.sMobile){
			alert('請填寫手機');
			return false;
		}
		if(!/09\d{8,8}/ig.test(form.sMobile)){
			alert('請填寫正確的手機號碼');
			return false;
		}
		if(!form.sEmail){
			alert('請填寫Email');
			return false;
		}
		if(!form.sAddr || !form.sDistrict || !form.sCounty || !form.sZip){
			alert('請填寫完整地址');
			return false;
		}
		if(!$('#agree').is(':checked')){
			alert('請勾選同意');
			return false;
		}


		return true;
	}

	function send(){
		$.ajax({
			url: 'http://wakaimc.sofy.com.tw/SaveData.ashx',
			data: form,
			method: 'post'
		}).success(function(r){
			if(r.Success == '0'){
				console.log(r);
			}else{
				app.changeView('thankyou');

				setTimeout(function(){
					app.changeView('home');
				}, 3000);
			}
		}).error(function(e){
			alert('無法送出表單請稍後再試');
		});
	}


};	
