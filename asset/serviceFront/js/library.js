$(function(){
	//상세조회버튼 
	$(".btn_detail_search").click(function(){
		$("#library_container").toggleClass("detail_search_current");
		if ($("#library_container").hasClass("detail_search_current"))
		{
			$("#library_wrap").css('min-height', '765px');
		} else {
			$("#library_wrap").css('min-height', '665px');
		}
	});
	//정렬기준, 자료유형
	$(".sort_type .sort_order").click(function(){
		var sort = $(this).parents(".list_select");
		var sort_select = $(this).parents(".sort_type").siblings(".sort_select");
		if (sort.hasClass('current'))
		{
			sort.removeClass('current');
			sort_select.hide();
		} else {
			sort.addClass('current');
			sort_select.show();
		}
	});

	// 폴더 우측 클릭 레이어 팝업 포지션
	$(".folder_a").click(function(e){
		$(".folder_r").hide();
		$(".list_folder_li").css( "zIndex", "90");
		$(this).parents(".list_folder_li").css( "zIndex", "95");
		var parentOffset = $(this).offset(); 
		var relX = e.pageX - parentOffset.left + 30;
		var relY = e.pageY - parentOffset.top;
		$(this).parent().find(".folder_r").css({'display':'block','top':relY,'left':relX});
		
		
	});

	//레이어팝업 열기
	$(".btn_group a").click(function(){
		$(".pop_alert").hide();
		var href = $(this).attr("href");
		var pop_id = href.replace("#","");
		$("#"+ pop_id).show();
		//alert(pop_id);
	});
	//레이어팝업 닫기
	$(".btn_cancel").click(function(){
		$(this).parents(".pop_alert").hide();
	});
	//아이클레스 레이어팝업 열기
	$("#send_pop .btn_class_open").click(function(){
		$(".pop_alert").hide();
		var href = $(this).attr("href");
		var pop_id = href.replace("#","");
		$("#"+ pop_id).show();
		//alert(pop_id);
	});

	//공개 비공개 열기
	$(".open_wrap").click(function(){
		$(".open").removeClass("current");
		var open_li = $(this).parents(".open");
		$(".list_info").css( "zIndex", "85");

		if (open_li.hasClass("current"))
		{
			open_li.removeClass("current");
		} else {
			open_li.addClass("current");
			$(this).parents(".list_info").css( "zIndex", "90");
		}
	});

	// 파일선택 디자인
	$('.fake_section').click(function(e){
		e.preventDefault();		
		$(this).parents(".fileWrap").find('.file').trigger('click');    
	});
	$('.file').change(function(e){
		var filename = $(this).val();
		var ext = filename.split('.').pop().toLowerCase();
		$(this).parent().find('input[name="fake_section"]').val(filename);
	});
});



// 탭 스크립트
function tabOn(tabid,a) {
	for (i=1;i<=10;i++) {
		if(i<10){inn="0"+i;} else {inn=""+i;}
		tabMenu = document.getElementById("tab"+tabid+"m"+i);
		tabContent = document.getElementById("tab"+tabid+"c"+i);
		tabMore = document.getElementById("tab"+tabid+"more"+i);
		tabImg = document.getElementById("tab"+tabid+"img"+i);
		
		if (tabMenu) { //객체가존재하면
			if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace("on.gif", "off.gif"); } //이미지일때
			if (tabMenu.tagName=="A") { tabMenu.className=""; } //앵커일때
			if (tabMenu.tagName=="LI") { tabMenu.className=""; }
			if (tabMenu.tagName=="SPAN") { tabMenu.className="off"; } 
		}
		if (tabContent) { tabContent.style.display="none"; }
		if (tabMore) { tabMore.style.display="none"; }
		if (tabImg) { tabImg.style.display="none"; }
	}

	if(a<10){ann="0"+a;} else {ann=""+a;}
	tabMenu = document.getElementById("tab"+tabid+"m"+a);
	tabContent = document.getElementById("tab"+tabid+"c"+a);
	tabMore = document.getElementById("tab"+tabid+"more"+a);
	tabImg = document.getElementById("tab"+tabid+"img"+a);

	if (tabMenu) { //객체가존재하면
		if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace("off.gif", "on.gif"); } //이미지일때
		if (tabMenu.tagName=="A") { tabMenu.className="on"; } //앵커일때
		if (tabMenu.tagName=="LI") { tabMenu.className="current"; }
		if (tabMenu.tagName=="SPAN") { tabMenu.className="on"; } 
	}
	if (tabContent) { tabContent.style.display="block"; }
	if (tabMore) { tabMore.style.display="block"; }
	if (tabImg) { tabImg.style.display="block"; }
	
}


