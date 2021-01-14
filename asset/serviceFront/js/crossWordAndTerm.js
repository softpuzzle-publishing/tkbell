/**
 * 
 */
var currentPage = 1;

$(function(){
	
	var str = "";
	
	if(cPath == "word") {		// 낱말 풀이
		str = "낱말 가리기";
	}else {
		str = "용어 가리기";	// 용어 풀이
	}
	
	$(".hide-tit").css("cursor", "default");
	
	// 총 1페이지인 경우 다음 버튼 기능 막기
	if(Number(totalPage) == 1) {
		$(".pager-next").attr("class", "pager-next");
	}
	
	$(".btn-hide").click(function(){
		if($(this).text() == str){
			$("button.hide-tit").css("opacity",1);
			$("button.hide-txt").css("opacity",0);
			$(this).text("풀이 가리기");
			$(".hide-tit").css("cursor", "pointer");
			$(".hide-txt").css("cursor", "default");
		} else {				
			$("button.hide-tit").css("opacity",0);
			$("button.hide-txt").css("opacity",1);
			$(this).text(str);
			$(".hide-txt").css("cursor", "pointer");
			$(".hide-tit").css("cursor", "default");
		}
	});

	$(".hide-tit, .hide-txt").click(function(){
		$(this).css("opacity",0);
		$(this).css("cursor", "default");
	});

	// 사진보기
	$(".balloon button").click(function(){
		var thumb_path = "http://download.i-scream.co.kr" + $(this).find('input[name="thumb_path"]').val();
		var dd = $('#imgSrc');
		dd.unbind('load.imgSrc').bind('load.imgSrc',function(){
			var ratio = $(this).parent().outerHeight() / $(this).parent().outerWidth();
			var ratioN = this.naturalHeight / this.naturalWidth;
			ratioN > ratio ? $(this).css({'height':'80%', 'width':'auto'}) : $(this).css({'width':'80%','height':'auto'}) ;
		});
		dd.attr("src", thumb_path);
		
		var $popId = $(this).attr("data-popId");
		$($popId).fadeIn("fast");
	});

	$(".detail-popup .close").click(function(){
		$(this).closest(".detail-popup").fadeOut("fast");
		$('#imgSrc').attr('src','');
	});
	
	// 이전 페이지 이동
	$(".pager-prev").click(function(){
		
		currentPage = Number(currentPage) - 1;
		if(currentPage < 1) {
			currentPage = 1;
		}
		
		if(Number(currentPage) == 1 && Number(totalPage) == 1) {
			$(this).attr("class", "pager-prev");
			$(".pager-next").attr("class", "pager-next");
		}else if(Number(currentPage) == 1) {
			$(this).attr("class", "pager-prev");
			$(".pager-next").attr("class", "pager-next active");
		}else {
			$(this).attr("class", "pager-prev  active");
			$(".pager-next").attr("class", "pager-next  active");
		}
		
		$("#pager-num").html(currentPage + " / " + totalPage);
		showDivWord(currentPage);
	});
	
	// 다음 페이지 이동
	$(".pager-next").click(function(){
		
		currentPage = Number(currentPage) + 1;
		if(currentPage >= totalPage) {
			currentPage = totalPage;
		}
		
		if(Number(currentPage) == 1 && Number(totalPage) == 1) {
			$(this).attr("class", "pager-next");
			$(".pager-prev").attr("class", "pager-prev");
		}else if(Number(totalPage != 1 && Number(currentPage) < Number(totalPage))) {
			$(this).attr("class", "pager-next  active");
			$(".pager-prev").attr("class", "pager-prev  active");
		}else if(Number(currentPage) == Number(totalPage)){
			$(this).attr("class", "pager-next");
			$(".pager-prev").attr("class", "pager-prev  active");
		}
		
		$("#pager-num").html(currentPage + " / " + totalPage);
		showDivWord(currentPage);
	});
});

// 페이지 보여주기
function showDivWord(no) {
	
	var divClass = "";
	var contentClass;
	var titleClass;
	
	if(cPath == "word") {	// 낱말 풀이
		divClass = ".expOfWord-cont, .expOfWord-tit";
		contentClass = ".expOfWord-cont";
		titleClass = ".expOfWord-tit";
	}else {					// 용어 풀이
		divClass = ".expOfTerm-cont, .expOfTerm-tit";
		contentClass = ".expOfTerm-cont";
		titleClass = ".expOfTerm-tit";
	}
		
	$(divClass).each(function() {
		var count = $(this).data('count');
		if(count == Number(no)) {
			$(this).show();
			var pageInfo = $(this).find($("input[name=pageInfo]")).val();
			$("#page-info").html(pageInfo);
		}else {
			$(this).hide(); 
		}
	});
	
	$(contentClass+':visible').css({
		top: $(titleClass+':visible').outerHeight()/document.documentElement.clientWidth *100 + "vw"
	});
}