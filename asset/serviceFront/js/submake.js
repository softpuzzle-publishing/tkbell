$(function(){


	// 자료추가 및 순서 정렬 상세설명 열고닫기
	$(".submake_input .title_desc_open").click(function(){
		$(".title_desc").show();
		$(".submake_input .title_desc_cls").css('display','block');
		$(this).hide();
	});
	$(".submake_input .title_desc_cls").click(function(){
		$(".title_desc").hide();
		$(".submake_input .title_desc_open").css('display','block');
		$(this).hide();
	});
	// 자료추가 및 순서 정렬 스킨설정
	$(".btn_skin_sel").click(function(){
		$("#skin_pop_wrap").show();
		var wrap_w = $("#submake_wrap").outerWidth();
		var wrap_h = $("#submake_wrap").height();
		$("#skin_pop_wrap").css({width:wrap_w, height:wrap_h})
	});
	// 완료페이지 편집버튼 클릭
	$("#submake_container .btn_edit").click(function(){
		$("#submake_container .pop_edit").toggle();
	});
	$('input, textarea').placeholder();

	
	// 노트뷰어 메뉴바 오픈
	$("#skin_side .btn_open").click(function(){
		var multiview_side = $("#skin_side");
		if (multiview_side.hasClass("current"))
		{
			multiview_side.animate({right: "-312px"}, 1000, 'easeInOutQuint');
			multiview_side.removeClass("current");
		} else {
			multiview_side.animate({right: "0"}, 1000, 'easeInOutQuint');
			multiview_side.addClass("current");
		}
	});
	// 노트뷰어 하단메뉴 오픈
	$("#skin_footer .btn_open").click(function(){
		var multiview_footer = $("#skin_footer");
		if (multiview_footer.hasClass("current"))
		{
			multiview_footer.animate({bottom: "-42px"}, 500, 'easeInOutQuint');
			multiview_footer.removeClass("current");
		} else {
			multiview_footer.animate({bottom: "0"}, 500, 'easeInOutQuint');
			multiview_footer.addClass("current");
		}
	});
	// 노트뷰어 편집버튼 클릭
	$("#skin_container .btn_edit").click(function(){
		$("#skin_container .pop_edit").toggle();
	});
});

function listHeight(){

	var liMaxHeight = -1;
	var node;
	$(".step5_wrap .curriculum ul").each(function(index){
		
		if ($(this).prop('scrollHeight') > liMaxHeight) {
			liMaxHeight = $(this).prop('scrollHeight');
			node = index;
		}
	});
	$(".step5_wrap .curriculum ul").each(function(){
		$(this).css({"height" : liMaxHeight});
	});
}
