if(jQuery) (function($) {

	$.extend($.fn, {
		
		checkingScrollTop: function() {		
			
			var init = function(nav) {
				
				var secTop = [];
				var $section = $('section[id^="section"]'),
					$sub = $(nav).find(".current").find("li");
				for(var i=0;i < $section.length;i++){
					secTop[i] = parseInt($section.eq(i).offset().top)-10;
				}
				
				if( $(window).scrollTop() > secTop[0] && $(window).scrollTop() <= secTop[1]) {
					addCurrent($sub.eq(0));					
				} else if ( $(window).scrollTop() >= secTop[1] && $(window).scrollTop() < secTop[2] ){
					addCurrent($sub.eq(1));					
				} else if ( $(window).scrollTop() >= secTop[2] && $(window).scrollTop() < secTop[3] ){
					addCurrent($sub.eq(2));
				} else if ( $(window).scrollTop() >= secTop[3] && $(window).scrollTop() < secTop[4] ){
					addCurrent($sub.eq(3));
				} else if ( $(window).scrollTop() >= secTop[4] && $(window).scrollTop() < secTop[5] ){
					addCurrent($sub.eq(4));
				} else if ( $(window).scrollTop() >= secTop[5] && $(window).scrollTop() < secTop[6] ){
					addCurrent($sub.eq(5));
				} else if ( $(window).scrollTop() >= secTop[6] && $(window).scrollTop() < secTop[7] ){
					addCurrent($sub.eq(6));					
				} else if ( $(window).scrollTop() >= secTop[7] && $(window).scrollTop() < secTop[8] ){
					addCurrent($sub.eq(7));
				} else if ( $(window).scrollTop() >= secTop[8] && $(window).scrollTop() < secTop[9] ){
					addCurrent($sub.eq(8));
				} else if ( $(window).scrollTop() >= $section.last().offset().top ){
					addCurrent($sub.last());
				} else {
					$sub.removeClass();
				}

				function addCurrent(obj){
					$sub.removeClass();
					$(obj).addClass("current");
				}
			}

			$(this).each( function() {
				init(this);
			});
			
			return $(this);			
		}		
	});
		

})(jQuery);

$( document ).ready( function() {
	$('body > section').animate({opacity:1});
	$('.event-nav').checkingScrollTop();
	$('.main').each(function(event) {
		  try {
			$('.main').flurry('destroy');
		  }
		  catch(err) {
		  }
		  finally {
			$('.main').flurry({
			  character: '○□●■',
			  height: 900,
			  speed: 10000,
			  wind: 100,
			  windVariance: 10,
			  frequency:500,
			  large: 40,
			  small: 4,
			  rotation: 90,
			  color:"#fff3cc"
			});
		  }
	});

	$(".event-nav li li a").click(function(event){  
		if( !$(this).parent().hasClass("current") ){
			$(this).parents("ul").eq(0).find("li").removeClass("current");
			$(this).parent().addClass("current");
		}
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
});

$(window).scroll(function(){	
	
    clearTimeout($.data(this, 'scrollTimer'));
	$.data(this, 'scrollTimer', setTimeout(function() {
		$('.event-nav').checkingScrollTop();
	},0));
});