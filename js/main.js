"use strict";function extractUrlValue(e,o){"undefined"==typeof o&&(o=window.location.href);var t=o.match("[?&]"+e+"=([^&]+)");return t?t[1]:null}var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},app={};app.partial={},app.me={},app.fbstatus=null;var debug=/localhost[:]9000|www1.jwttw.com/.test(location.href);app.debug=debug;var share={facebook:function(e,o,t){return t?(window.open("https://www.facebook.com/share.php?u="+encodeURIComponent(e+"?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=sofy")),void app.changeView("form")):(window.open("https://www.facebook.com/share.php?u="+encodeURIComponent(e+"?utm_source=facebook&utm_medium=fbshare_m&utm_campaign=sofy")),!1)},googleplus:function(e){e=encodeURIComponent(e||location.href+"?utm_source=g+&utm_medium=fbshare_m&utm_campaign=sofy"),window.open("https://plus.google.com/share?url="+e,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")},email:function(e,o){e=encodeURIComponent(e||location.href+"?utm_source=email&utm_medium=fbshare_m&utm_campaign=sofy"),o=encodeURIComponent(o||document.title);var t=encodeURIComponent(""+e+" #"+o);window.open("https://mail.google.com/mail/?view=cm&fs=1&to=&su=與你分享:"+o+"&body="+t+"&bcc=")}};window.fbAsyncInit=function(){FB.init({appId:debug?"227687320989903":"227679697657332",xfbml:!0,version:"v2.7"}),FB.getLoginStatus(function(e){app.fbstatus=e.status,extractUrlValue("code")&&share.facebook(decodeURIComponent(extractUrlValue("shref")),null,!0)})},extractUrlValue("error_code")&&alert("請先同意存取"),$(function(){function e(){var e=new Image;e.onload=function(){app.bar.animate(1),setTimeout(function(){"#rule"==location.hash?app.changeView("rule"):app.changeView("loop")},750)},e.src=$(".kv-container .player .kvloop").attr("data-src")}($(window).width()<=768||$("html.ios").length)&&e(),$.each(app.partial,function(e,o){o()}),$(window).hammer().on("tap scroll resize",function(){$(window).width()<=768&&window.innerHeight<560?$(".video-carousel .video-background").addClass("short"):$(".video-background").hasClass("short")&&$(".video-background").removeClass("short"),$(window).width()<=768&&window.innerHeight?$("html, body, .video-background, .sky-background").height(window.innerHeight):$("html, body, .video-background, .sky-background").removeAttr("style")}),$("body").on("viewport:video-carousel",function(e){$(window).trigger("tap"),$(window).width()<=768&&window.innerHeight&&$("html, body, .video-background, .sky-background").height(window.innerHeight)}),$(window).trigger("resize")}),$.fn.hasAttr=function(e){var o=$(this).attr(e);return"undefined"!==("undefined"==typeof o?"undefined":_typeof(o))&&o!==!1},app.extractUrlValue=extractUrlValue,app.bar=new ProgressBar.Circle(document.getElementById("fragLoading"),{color:"#aaa",strokeWidth:2,trailWidth:0,easing:"easeInOut",duration:50,text:{autoStyleContainer:!1},from:{color:"#fff",width:1},to:{color:"#fff",width:2},step:function(e,o){o.path.setAttribute("stroke",e.color),o.path.setAttribute("stroke-width",e.width);var t=Math.round(100*o.value());0===t?o.setText(""):o.setText(t)}}),app.bar.text.style.fontFamily='"Raleway", Helvetica, sans-serif',app.bar.text.style.fontSize="2rem";var sec1=Math.random()/100/3,sec2=Math.random()/10,pres=sec1+sec2;setTimeout(function(){app.bar.animate(sec1)},250*sec1+100),setTimeout(function(){app.bar.animate(sec2)},250*sec2+500),app.partial.preload=function(){function e(){$.each(t,function(e,o){"img"===o.tagName.toLowerCase()?$(o).attr("src",$(o).attr("data-src")):$(o).css("background-image","url("+$(o).attr("data-src")+")")}),$(".page:eq(0)").addClass("init")}var o={},t=[];$("[data-src]").each(function(e,a){$(a).attr("data-src")&&(o[$(a).attr("data-src")]=!1,t.push(a))}),$.each(o,function(t,a){var n=new Image;n.onload=function(){o[t]=!0;var a=!0;$.each(o,function(e,o){a=o&&a}),a&&e()},n.src=t})},app.partial.yt=function(){var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(e,o);var t=null;window.onYouTubeIframeAPIReady=function(){function e(){r.playVideo(),setTimeout(e,9.8)}var o=[];$(".video-background .video-container").on("init",function(){$(".video-background .video").each(function(e){$("iframe",this).attr("id","player"+e);var t=new YT.Player("player"+e);o.push(t),$(this).on("click",function(){t.carouselPlay()}),t.pe=this})}).slick({arrows:!1,infinite:!1,dots:!0}).on("beforeChange",function(){}).on("afterChange",function(){$(window).width()>768&&o[$(".slick-current").index()].carouselPlay()});var a=0;YT.Player.prototype.carouselPlay=function(){if(1!==this.getPlayerState()){t=this,$(this.pe).addClass("playing"),$(this.pe).removeClass("paused"),$(this.pe).siblings().removeClass("playing").addClass("paused"),$.each(o,function(e,o){this!=t&&this.pauseVideo()}),t.playVideo();var e=t.getDuration();clearInterval(a),a=setInterval(function(){var o=100*t.getVideoLoadedFraction(),a=t.getCurrentTime(),n=a/e*100;$(".duration .played",t.pe).width(n+"%"),o<100&&$(".duration .downloaded",t.pe).width(o+"%"),100===n&&t.pauseVideo()},25),$(".duration",t.pe).unbind("click").on("click",function(o){var a=(o.clientX-$(this).offset().left)/$(".duration .downloaded",t.pe).width(),n=Math.floor(a*e);return $(".duration .played",t.pe).width(100*a+"%"),t.seekTo(n,!0),o.stopPropagation(),o.preventDefault(),!1})}else this.pauseVideo(),clearInterval(a),$(this.pe).removeClass("playing"),$(this.pe).addClass("paused")};var n=0;$(".video-background .video-container .video").on("mousemove",function(){clearTimeout(n),$(this).addClass("mousemove"),n=setTimeout(function(){$(".video-background .video-container .video").removeClass("mousemove")},750)}).find(".share, .prev, .next, .duration").on("mousemove",function(e){clearTimeout(n),e.stopPropagation()}),$(".video-background .video-container .video .next").on("click",function(e){return $(".video-container").slick("slickGoTo",1),e.stopPropagation(),e.preventDefault(),!1}),$(".video-background .video-container .video .prev").on("click",function(e){return $(".video-container").slick("slickGoTo",0),e.stopPropagation(),e.preventDefault(),!1}),$(window).on("resize",function(){var e=$(window).width(),o=$(window).innerHeight()||$(window).height(),t=16/9,a=0,n=0,i=e,r=o;e/o>=t?(r=e/t,i=e,n=(e/t-o)/2*-1,a=0):(r=o,i=o*t+2,n=0,a=(o*t-e)/2*-1),$(".video-background iframe").height(r).width(i).css("margin-top",n).css("margin-left",a),$(".slick-dots").remove(),$(".video-background .video-container").slick("reinit")}).trigger("resize");var i=new YT.Player("tvc"),r=new YT.Player("kvloop",{events:{onStateChange:function(){}}}),c=setInterval(function(){if(($(window).width()<=768||$("html.ios").length)&&clearInterval(c),r.playVideo){r.playVideo();var e=r.getVideoLoadedFraction();if(r.mute(),e>0&&app.bar.animate(e),e>=.95){clearInterval(c),r.pauseVideo(),r.seekTo(0);setTimeout(function(){"#rule"==location.hash?app.changeView("rule"):app.changeView("loop")},750)}}},100);$("body").on("viewport:change",function(t,a){$(window).width()>768&&("loop"!==a&&r.pauseVideo?r.pauseVideo():e()),"home"!==a&&i.pauseVideo&&i.pauseVideo(),"video-carousel"==a?$(".video-background .video-container").slick("slickGoTo",$(".slick-active").index()):$.each(o,function(e,o){this.pauseVideo&&$(this.pe).hasClass("playing")&&(this.pauseVideo(),$(this.pe).removeClass("playing"),$(this.pe).addClass("paused"))})})},$(".video-background .close-button").on("click",function(e){return app.viewBack(e)})},app.partial.menu=function(){function e(e,o,t){$("body").removeClass("menu"),$(".blogger-box .in").removeClass("in");var n=["loading","home","loop","rule","video","form","thankyou","video-carousel","award"],i=n.join(" ").replace(e);return $("body").removeClass(i).addClass(e),$("body").trigger("viewport:"+e),$("body").trigger("viewport:change",e),t||a.push(e),o&&(o.stopPropagation(),o.preventDefault()),!1}function o(o){if(a.length){var t=a[a.length-2];a.pop(),e(t,null,!0)}return o&&(o.stopPropagation(),o.preventDefault()),!1}$("header .burger").on("click",function(){$("body").addClass("menu"),$("body.menu").hammer().one("swiperight",function(e){$("body").removeClass("menu"),$("body.menu").hammer().unbind("swiperight"),$("#menuoff").hammer().unbind("tap")}),$("#menuoff").hammer().one("tap",function(e){$("body").removeClass("menu"),$("body.menu").hammer().unbind("swiperight"),$("#menuoff").hammer().unbind("tap")})}),$(".kv-container,.content:not(.form-content),.video-container .video:eq(1),.blogger-box").hammer().on("swipeleft",function(e){$("header .burger").trigger("click")}),$(".menu .menu-x").on("click",function(){$("body").removeClass("menu")}),$(".logo").on("click",function(o){return e("loop",o)}),$(".scrolldown").on("click",function(o){return TweenMax.to(".content article",.5,{scrollTop:1}),e("home",o)}),$(".menu nav a:eq(0)").on("click",function(o){return e("video-carousel",o)}),$(".menu nav a:eq(1)").on("click",function(o){return TweenMax.to(".home-content article",1,{scrollTop:1}),e("home",o)}),$(".menu nav a:eq(2)").on("click",function(o){return $(window).width()>768?TweenMax.to(".home-content article",1,{scrollTop:837}):TweenMax.to(".home-content article",1,{scrollTop:1270/375*$(window).width()}),e("home",o)}),$(".menu nav a:eq(3)").on("click",function(o){return $(window).width()>768?TweenMax.to(".home-content article",1,{scrollTop:1865}):TweenMax.to(".home-content article",1,{scrollTop:5.64*$(window).width()}),e("home",o)}),$(".menu nav a:eq(4)").on("click",function(o){return e("rule",o)}),$(".menu nav a:eq(5)").on("click",function(o){return e("award",o)}),$(".kv-container a").on("click",function(o){return e("video-carousel",o)}),$(".kv-container").on("mousewheel",function(e){return e.deltaY<0&&(TweenMax.set(".home-content article",{scrollTop:1}),app.changeView("home",e))});var t=new Hammer($(".kv-container")[0]);t.get("swipe").set({direction:Hammer.DIRECTION_VERTICAL}),t.on("swipeup",function(e){return TweenMax.to(".home-content article",1,{scrollTop:1}),app.changeView("home")}),$(".menu-f").on("click",function(){share.facebook(location.href.replace(location.search,"").replace(location.hash,""),"喬喬的午茶約會")});var a=[];$("body").on("viewport:video",function(e){}),$("body").on("viewport:change",function(e,o){"loop"===o&&console.clear&&console.clear()}),$(".home-content article .home-page").on("mousewheel",function(e){if(app.freezeHome)return e.stopPropagation(),e.preventDefault(),!1});var n=0;$("body").on("viewport:home",function(e){var o=$(".home-content article");app.freezeHome=!0,clearTimeout(n),setTimeout(function(){app.freezeHome=!1},1e3),o.unbind("scroll").on("scroll",function(e){0==o.scrollTop()&&$("body").hasClass("home")&&$(".logo").trigger("click")})}),app.changeView=e,app.viewBack=o},app.partial.home=function(){$("html.mobile,html.tablet").length||$(".content article").niceScroll({horizrailenabled:!1}),$(".bloggers a").on("click",function(e){return!$(this).hasClass("disabled")&&($("#"+$(this).attr("data-target")).addClass("fade in"),e.stopPropagation(),void e.preventDefault())}),$(window).resize(function(e){$(window).width()>768?$(".blogger-box article aside").mCustomScrollbar({autoDraggerLength:!1}):$(".blogger-box article aside").mCustomScrollbar("destroy")}),$(".back").on("click",function(e){app.changeView("loop",e)})},app.partial.rule=function(){$(".rule-page .close").on("click",function(e){return app.viewBack(e)})},app.partial.award=function(){$(".award-page .close").on("click",function(e){return app.viewBack(e)})},app.partial.form=function(){function e(){return t.sName=$("[name=sName]").val(),t.sEmail=$("[name=sEmail]").val(),t.sAddr=$("[name=sAddr]").val(),t.sMobile=$("[name=sMobile]").val(),t.sDistrict=$("[name=district] option:selected").val(),t.sCounty=$("[name=county] option:selected").val(),t.sZip=$("[name=zipcode]").val(),t.sAD=app.extractUrlValue("utm_source")||"none",t.sValidateCode=$("[name=sValidateCode]").val(),t.sName?t.sMobile?/09\d{8,8}/gi.test(t.sMobile)?t.sEmail?t.sAddr&&t.sDistrict&&t.sCounty&&t.sZip?t.sValidateCode?!!$("#agree").is(":checked")||(alert("請勾選同意"),!1):(alert("請填寫驗證碼"),!1):(alert("請填寫完整地址"),!1):(alert("請填寫Email"),!1):(alert("請填寫正確的手機號碼"),!1):(alert("請填寫手機"),!1):(alert("請填寫姓名"),!1)}function o(){$.ajax({url:app.debug?"http://www1.jwttw.com/event/sofy/2016waka/SaveData.ashx":"http://wakaimc.sofy.com.tw/SaveData.ashx",data:t,method:"post"}).success(function(e){"0"==e.Success&&e.Msg?alert(e.Msg):(app.changeView("thankyou"),setTimeout(function(){app.changeView("home")},3e3))}).error(function(e){alert("無法送出表單請稍後再試")})}$(".form-page .close").on("click",function(e){return app.changeView("video",e)}),$(".form-page .zip").twzipcode({language:"lang/zh-tw"});var t={};$(".submit").on("click",function(){e()&&o()}),$(".reset").on("click",function(){$("[name=sName]").val(""),$("[name=sEmail]").val(""),$("[name=sAddr]").val(""),$("[name=sMobile]").val(""),$("[name=district]").val(null),$("[name=county]").val(null),$("[name=zipcode]").val(""),$("[name=sValidateCode]").val("")})},app.partial.thankyou=function(){},app.partial.share=function(){$(".share a").unbind("click").on("click",function(e){return share.facebook($(this).parent().attr("data-ref"),"喬喬的午茶約會",!0),app.ismobile?ga("send","event","Button","click",$(this).attr("data-ga-m")):ga("send","event","Button","click",$(this).attr("data-ga")),e.preventDefault(),e.stopPropagation(),!1})},app.partial.ga=function(){var e=$("html.mobile, html.tablet").length;app.ismobile=e,$("[data-ga]").on("click",function(){e||ga("send","event","Button","click",$(this).attr("data-ga"))}),$("[data-ga-m]").on("click",function(){e&&ga("send","event","Button","click",$(this).attr("data-ga-m"))}),$("body").on("viewport:change",function(o,t){switch(t){case"home":e?ga("send","pageview",{page:"product",title:"pv_product_m"}):ga("send","pageview",{page:"product",title:"pv_product"});break;case"form":e?ga("send","pageview",{page:"keyin",title:"pv_keyin_m"}):ga("send","pageview",{page:"keyin",title:"pv_keyin"});break;case"thankyou":e?ga("send","pageview",{page:"thank",title:"pv_thank_m"}):ga("send","pageview",{page:"thank",title:"pv_thank"});break;case"video-carousel":var a=$(".slick-current").index()+1;e?ga("send","pageview",{page:"video_"+a,title:"pv_video_"+a+"_m"}):ga("send","pageview",{page:"video_"+a,title:"pv_video_"+a});break;default:ga("send","pageview",{page:t,title:"pv_"+t})}}),$(".video-background .video-container").on("afterChange",function(){var o=$(".slick-current").index()+1;e?ga("send","pageview",{page:"intro",title:"pv_video_"+o+"_m"}):ga("send","pageview",{page:"intro",title:"pv_video_"+o})}),$(".bloggers li").on("click",function(o){var t=$(this).index()+1;e?ga("send","pageview",{page:"intro",title:"pv_kol_"+t+"_m"}):ga("send","pageview",{page:"intro",title:"pv_kol_"+t})}),ga("send","pageview",{page:"intro",title:"pv_intro"})};