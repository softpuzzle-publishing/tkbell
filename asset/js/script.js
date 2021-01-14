/* Font Face Observer v2.1.0 - 짤 Bram Stein. License: BSD-3-Clause (function(){function l(a,b){document.addEventListener?a.addEventListener("scroll",b,!1):a.attachEvent("scroll",b)}function m(a){document.body?a():document.addEventListener?document.addEventListener("DOMContentLoaded",function c(){document.removeEventListener("DOMContentLoaded",c);a()}):document.attachEvent("onreadystatechange",function k(){if("interactive"==document.readyState||"complete"==document.readyState)document.detachEvent("onreadystatechange",k),a()})};function t(a){this.a=document.createElement("div");this.a.setAttribute("aria-hidden","true");this.a.appendChild(document.createTextNode(a));this.b=document.createElement("span");this.c=document.createElement("span");this.h=document.createElement("span");this.f=document.createElement("span");this.g=-1;this.b.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.c.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
this.f.style.cssText="max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";this.h.style.cssText="display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";this.b.appendChild(this.h);this.c.appendChild(this.f);this.a.appendChild(this.b);this.a.appendChild(this.c)}
function u(a,b){a.a.style.cssText="max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:"+b+";"}function z(a){var b=a.a.offsetWidth,c=b+100;a.f.style.width=c+"px";a.c.scrollLeft=c;a.b.scrollLeft=a.b.scrollWidth+100;return a.g!==b?(a.g=b,!0):!1}function A(a,b){function c(){var a=k;z(a)&&a.a.parentNode&&b(a.g)}var k=a;l(a.b,c);l(a.c,c);z(a)};function B(a,b){var c=b||{};this.family=a;this.style=c.style||"normal";this.weight=c.weight||"normal";this.stretch=c.stretch||"normal"}var C=null,D=null,E=null,F=null;function G(){if(null===D)if(J()&&/Apple/.test(window.navigator.vendor)){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);D=!!a&&603>parseInt(a[1],10)}else D=!1;return D}function J(){null===F&&(F=!!document.fonts);return F}
function K(){if(null===E){var a=document.createElement("div");try{a.style.font="condensed 100px sans-serif"}catch(b){}E=""!==a.style.font}return E}function L(a,b){return[a.style,a.weight,K()?a.stretch:"","100px",b].join(" ")}
B.prototype.load=function(a,b){var c=this,k=a||"BESbswy",r=0,n=b||3E3,H=(new Date).getTime();return new Promise(function(a,b){if(J()&&!G()){var M=new Promise(function(a,b){function e(){(new Date).getTime()-H>=n?b(Error(""+n+"ms timeout exceeded")):document.fonts.load(L(c,'"'+c.family+'"'),k).then(function(c){1<=c.length?a():setTimeout(e,25)},b)}e()}),N=new Promise(function(a,c){r=setTimeout(function(){c(Error(""+n+"ms timeout exceeded"))},n)});Promise.race([N,M]).then(function(){clearTimeout(r);a(c)},
b)}else m(function(){function v(){var b;if(b=-1!=f&&-1!=g||-1!=f&&-1!=h||-1!=g&&-1!=h)(b=f!=g&&f!=h&&g!=h)||(null===C&&(b=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent),C=!!b&&(536>parseInt(b[1],10)||536===parseInt(b[1],10)&&11>=parseInt(b[2],10))),b=C&&(f==w&&g==w&&h==w||f==x&&g==x&&h==x||f==y&&g==y&&h==y)),b=!b;b&&(d.parentNode&&d.parentNode.removeChild(d),clearTimeout(r),a(c))}function I(){if((new Date).getTime()-H>=n)d.parentNode&&d.parentNode.removeChild(d),b(Error(""+
n+"ms timeout exceeded"));else{var a=document.hidden;if(!0===a||void 0===a)f=e.a.offsetWidth,g=p.a.offsetWidth,h=q.a.offsetWidth,v();r=setTimeout(I,50)}}var e=new t(k),p=new t(k),q=new t(k),f=-1,g=-1,h=-1,w=-1,x=-1,y=-1,d=document.createElement("div");d.dir="ltr";u(e,L(c,"sans-serif"));u(p,L(c,"serif"));u(q,L(c,"monospace"));d.appendChild(e.a);d.appendChild(p.a);d.appendChild(q.a);document.body.appendChild(d);w=e.a.offsetWidth;x=p.a.offsetWidth;y=q.a.offsetWidth;I();A(e,function(a){f=a;v()});u(e,
L(c,'"'+c.family+'",sans-serif'));A(p,function(a){g=a;v()});u(p,L(c,'"'+c.family+'",serif'));A(q,function(a){h=a;v()});u(q,L(c,'"'+c.family+'",monospace'))})})};"object"===typeof module?module.exports=B:(window.FontFaceObserver=B,window.FontFaceObserver.prototype.load=B.prototype.load);}());*/

if(jQuery) (function($) {

	//slider
	$.extend($.fn, {

		uiSlider: function(num, pagerYN, controlsYN, sWidth, sMargin) {

			var init = function(slider) {
				slider = $(slider),
				infiniteYN = slider.find("li").length > 1;

				slider.bxSlider({
					auto: true,
					pause: 7000,
					minSlides: num,
					maxSlides: num,
					moveSlides: num,
					pager: pagerYN,
					slideWidth: sWidth,
					slideMargin : sMargin,
					controls: controlsYN,
					infiniteLoop: infiniteYN,
					hideControlOnEnd: true
				});
			}
			$(this).each( function() {
				init(this);
			});
			return $(this);
		}
	});

	//eaSlider
	$.extend($.fn, {

		eaSlider: function() {

			var init = function(div) {
				var div = $(div);
				var innerDiv = div.find('.slider-inner');
				var ul = div.find('ul');

				var innerUl = 0;
				for(var i=0;i < ul.find('li').length;i++){
					innerUl += ul.find('li').eq(i).outerWidth();
				}
				$(ul).data('max',ul.find('li').length);
				$(ul).data('current',ul.find('.active').index());

				innerDiv.addClass('first');

				var minLeft = ul.find('li').outerWidth()*3;

				var ml = [];
				for(var i=0;i < ul.find('li').length;i++){
					//ml[i]= ul.find('li').eq(i).position().left;
					ml[i] = ul.find('li').outerWidth() * i;
				}

				var data = ul.data();

				ul.find('li button').on('click',function(){
					if(!$(this).parent().hasClass('active')) {
						ul.find('li').removeClass('active');
						$(this).parent().addClass('active');
						data.current = $(this).parent().index();
					}

					if(data.current == 0){
						div.addClass('first');
					} else if (data.current == data.max-1){
						div.addClass('end');
					} else {
						div.removeClass('first').removeClass('end');
					}

					if( ml[data.current] > minLeft && innerUl > div.width()) {
						if( ml[data.current] > innerUl - div.width() + minLeft) {
							ul.css({marginLeft: -(innerUl - div.width())});
						} else {
							ul.css({marginLeft:-ml[data.current]+minLeft});
						}
					} else if(innerUl <= div.width()){
						ul.css({marginLeft:0});
					}
					ul.attr('data-current',data.current);
				});

				div.find('nav').on('click','a',function() {
					var slideWidth = 0;
					if ($(this).hasClass('next')) {
						ul.parent().removeClass('first');
						if (data.current == data.max-1) {
							//data.current = 0;
							//i
							ul.parent().addClass('end');
							ul.addClass('bounceMax').get(0).addEventListener('animationend',bounceAnimationEnd,false);
							return;
						} else {
							data.current++;
							ul.css({ marginLeft :-ml[data.current] });
						}
						ul.find('.active').removeClass('active');
						ul.find('li').eq(data.current).addClass('active');
						if(div.attr("class").indexOf("sticker") != -1){
							ul.find('.active button').click();
						}
						if(data.current == data.max-1){

						}
					} else {
						ul.parent().removeClass('end');
						if (data.current == 0) {
							//data.current = data.max-1;
							ul.addClass('bounceMin').get(0).addEventListener('animationend',bounceAnimationEnd,false);
							return;
						} else {
							data.current--;
							ul.css({ marginLeft :-ml[data.current] });
						}
						ul.find('.active').removeClass('active');
						ul.find('li').eq(data.current).addClass('active');
						if(div.attr("class").indexOf("sticker") != -1){
							ul.find('.active button').click();
						}
						if(data.current == 1){
							ul.parent().addClass('first');
						}
					}

					/*
					if ($(this).hasClass('next')) {
						div.removeClass('first');
						if (data.current == data.max) {
							ul.addClass('bounceMax').get(0).addEventListener('animationend',bounceAnimationEnd,false);
							return;
						} else if(data.current == data.max-1){
							ml = ml + (innerUl - ml - div.width());
							div.addClass('end');
							ul.css({ marginLeft : -ml });
							data.current++;
						} else {
							ml = ml + slideWidth;
							ul.css({ marginLeft : -ml });
							data.current++;
						}
					} else {
						div.removeClass('end');
						if (data.current == 0) {
							ul.addClass('bounceMin').get(0).addEventListener('animationend',bounceAnimationEnd,false);
							return;
						} else if(data.current == 1){
							ml = 0;
							ul.css({ marginLeft : -ml });
							div.addClass('first');
							data.current--;
						} else {
							ml = ml - slideWidth;
							ul.css({ marginLeft : -ml });
							data.current--;
						}
					}

					*/

					if( ml[data.current] > minLeft && innerUl > div.width()) {
						if( ml[data.current] > innerUl - div.width() + minLeft) {
							ul.css({marginLeft: -(innerUl - div.width())}); // === right:0
							//ul.css({marginLeft: 0});
						} else {
							ul.css({marginLeft:-ml[data.current] + minLeft});
						}
					}  else if(innerUl <= div.width()){
						ul.css({marginLeft:0});
					}
					ul.attr('data-current',data.current);

				});

				function bounceAnimationEnd(){
					$(this).removeClass('bounceMax').removeClass('bounceMin');
				}
			}

			$(this).each(function() {
				init(this);
			});

			return $(this);
		}
	});
})(jQuery);


$(document).ready(function(){
	//uiSlider(num, pagerYN, controlsYN);
	$('.bnn-promotion ul').uiSlider(1,true,true);
	$('.bnn-review ul').uiSlider(3,false,true,360,20);
	$('.mn-banner .bnn1 ul').uiSlider(1,true,true);
	$('.mn-banner .bnn2 ul').uiSlider(1,true,false);

	$('select').selectmenu();
	$('input[type="checkbox"], input[type="radio"]').checkboxradio();

	$('.float-bnn-wrap').css({
		top: $('.header').offset().top + $('.header').outerHeight() + 30 + 'px'
	})

	$('.top-bnn').find('.bnn-close').on('click',function(){
		var originTop = $('.header').outerHeight() + 30;
		$('.float-bnn-wrap').animate({top: originTop + 'px'},300);
	});

	$('.info-tabs').tabs({active:0});
	$('.info-sub-slides ul').bxSlider({
		auto: false,
		minSlides: 1,
		maxSlides: 1,
		moveSlides: 1,
		pager: true,
		pagerCustom:'.info-sub-slides .slides-pager',
		slideWidth: 840,
		slideMargin : 0,
		controls: true,
		infiniteLoop: true
	});

//	var font = new FontFaceObserver('Noto Sans KR');
//	font.load().then(function () {
//		$('body').animate({opacity:1},500);
//	});
	$('body').animate({opacity:1},500);
});

$(window).on('scroll',function(){
	var originTop = $('.header').offset().top + $('.header').outerHeight() + 30;
	if($(document).scrollTop() > originTop) {
		$('.float-bnn-wrap').css({top:30+'px'});
	} else {
		$('.float-bnn-wrap').css({top: originTop + 'px'})
	}
});