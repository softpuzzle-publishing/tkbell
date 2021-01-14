$(function(){
	// 메뉴바 오픈
	$("#multiview_side .btn_open").click(function(){
		var multiview_side = $("#multiview_side");
		if (multiview_side.hasClass("current"))
		{
			multiview_side.animate({right: "-312px"}, 1000, 'easeInOutQuint');
			multiview_side.removeClass("current");
		} else {
			multiview_side.animate({right: "0"}, 1000, 'easeInOutQuint');
			multiview_side.addClass("current");
		}
	});
	// 하단메뉴 오픈
	$("#multiview_footer .btn_open").click(function(){
		var multiview_footer = $("#multiview_footer");
		if (multiview_footer.hasClass("current"))
		{
			multiview_footer.animate({bottom: "-42px"}, 500, 'easeInOutQuint');
			multiview_footer.removeClass("current");
		} else {
			multiview_footer.animate({bottom: "0"}, 500, 'easeInOutQuint');
			multiview_footer.addClass("current");
		}
	});
	// 하단 썸네일 오픈
	$("#multiview_footer_thumb .btn_open").click(function(){
		var multiview_footer_thumb = $("#multiview_footer_thumb");
		if (multiview_footer_thumb.hasClass("current"))
		{
			multiview_footer_thumb.animate({bottom: "-83px"}, 500, 'easeInOutQuint');
			multiview_footer_thumb.removeClass("current");
		} else {
			multiview_footer_thumb.animate({bottom: "0"}, 500, 'easeInOutQuint');
			multiview_footer_thumb.addClass("current");
		}
	});
	
	// 이미지 뷰어 줌인버튼
	$(".zoom .btn_in").click(function(){
		$("#multiview_wrap").addClass("zoom_wrap");
	});
	$(".zoom .btn_out").click(function(){
		$("#multiview_wrap").removeClass("zoom_wrap");
	});
	
});
$(window).load(function(){
	// 컨텐츠 세로 중앙정렬
	var contents_h = $("#multiview_container").find(".contents").height() - 40;
	var con_h = $("#multiview_container").find(".con").height();
	var arr_h = $("#multiview_container").find(".arr a").height();
	var contents_pd = (contents_h - con_h)/2;
	var arr_top = (contents_h - arr_h)/2;
	$("#multiview_container").find(".contents").css({paddingTop : contents_pd});
	$("#multiview_container").find(".arr a").css({top : arr_top});
});

$(window).on('resize', function(){
	// 브라우저 창 변동시 컨텐츠 세로 중앙정렬
	var contents_h = $("#multiview_container").find(".contents").height() - 40;
	var con_h = $("#multiview_container").find(".con").height();
	var arr_h = $("#multiview_container").find(".arr a").height();
	var contents_pd = (contents_h - con_h)/2;
	var arr_top = (contents_h - arr_h)/2;
	$("#multiview_container").find(".contents").css({paddingTop : contents_pd});
	$("#multiview_container").find(".arr a").css({top : arr_top});
});