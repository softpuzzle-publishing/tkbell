$(function(){
	
	// 다른차시 레이어 열고닫기
	var openLayer = 0;
	var otherchasi = false;
	$('.le .le1').click(function(){
		if ( !otherchasi ) {
			$('.menu_list').show();
			if(openLayer == 0 ) {
				fnSearchList();
			}
			openLayer = 1;
			otherchasi = true;
		} else {
			$('.menu_list').hide();
			otherchasi = false;
		}
		
		if($(".menu_list> .m1").height() > 443){
			$(".chat-header > .top_menu > .menu_list > a").css({'top': Number($(".menu_list> .m1").height() + 8)});
		}
	});
	
	icebtn1 = false;
	$('.r > .icebtn-cu1').click(function(){
		if (!icebtn1) {
			closeOtherTools('.chat-menu');
			$('.chat-menu').show();
			icebtn1 = true;
		} else {
			$('.chat-menu').hide();
			icebtn1 = false;
		}
	});
	
	$('.globalTab > li > a').click(function(){
		$('.globalTab > li > a').removeClass('selected');
		$(this).addClass('selected');
	});

	// 오류신청 팝업 열기
	$('.r > .icebtn-cu3').click(function(){
		closeOtherTools('.popup-cont.chat-pop-4');
		$('.popup-cont.chat-pop-4').show();
	});
	
	recentFlag = false;
	$('.r > .icebtn-cu4').click(function(){
		if ( recentFlag ) {
			$('.popup-cont.chat-pop-9').hide();
			recentFlag = false;
		} else {
			closeOtherTools('.popup-cont.chat-pop-9');
			$('.popup-cont.chat-pop-9').show();
			recentFlag = true;
			fnRecentChasiList();
		}
	});
		
	// 스킨설정, 오류신청, 수업도구 취소/적용시 팝업 닫기
	$('.btn-pop-bottom .cancel').click(function(){
		$(this).parent().parent().hide();
	});
	
	// 스킨설정 팝업
	$('.r > .icebtn-cu2').click(function(){
		closeOtherTools('.popup-cont.chat-pop-5');
		$('.popup-cont.chat-pop-5').show();
	});
		
	// 스킨 선택
	$('.sk-type ul li').click(function(){
		$(this).parent().find('div').removeClass('selected');
		$(this).find('div').addClass('selected');
	});
	// 수업공유(개설된 클래스가 없을 시)
	$('.popup-cont.chat-pop-3 > .cancel').click(function(){
		$(this).parent().parent().hide();
	});
	
/* 영상개요부분 삭제 ('14. 11. 25)
	// 영상개요 : cont-tex-lst 의 높이가 일정하지않아 li의 높이에 맞춰주는 스크립트
	$('.cont-tex-lst').each(function(){
	var height = 0;
	var halfSize = 0;
		$(this).find('li').each(function(){
			if ( halfSize != 1) {
				height += $(this).height();
				if ( $(this).width() == 100 ) halfSize++;
			}
			else {
				if ( $(this).width() > 100 ) height += $(this).height();
				else halfSize = 0;
			}
		});
		$(this).height(height);
	});
*/
});
function listHeight(){
	$(".top_menu .menu_list ul").height($(".top_menu .menu_list").prop('scrollHeight')-25);
}

//다른 툴바 닫기
function closeOtherTools(exception){
	var tools = ['.chat-menu', '.popup-cont.chat-pop-4', '.popup-cont.chat-pop-9', '.popup-cont.chat-pop-5'];
	for(var i = 0; i < tools.length; i ++){
		if(tools[i] != exception){
			$(tools[i]).hide();
		}			
	}
	if(exception != '.popup-cont.chat-pop-9'){
		recentFlag = false;
	}
	if(exception != '.chat-menu'){
		icebtn1 = false;
	}	
}
