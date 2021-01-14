//sns key
//var kakaoApiKey = '0d7f4bab4ae192e76e977c4f19e60081';
var kakaoApiKey = 'b51709703c4df6edacc7cc7c9d53a733';
var facebookApiKey = '786121921862640';


$(function() {
	var schoolInfoChk = $("#schoolInfoChk").val();
	var sessionChk = $('#sessionChk').val();
	var teacherType = $('#sessionMteacherType').val();
	var schoolType = $('#sessionMschoolType').val();
	
	if(schoolInfoChk == "Y" && sessionChk == "Y" ){
		
		// 선생님 구분 정보 있으면 표시
		if(teacherType != ""){
			$("#schoolInfoChkModal").find("input[name='mTeacherType'][value='"+teacherType+"']").attr("checked", true).checkboxradio("refresh");
		}
		// 학교급 정보 있으면 표시
		if(schoolType != ""){
			$("#schoolInfoChkModal").find("input[name='mSchoolType'][value='"+schoolType+"']").attr("checked", true).checkboxradio("refresh");
		}
		
		// 교사유형, 학교급 선택 모달
		$( "#schoolInfoChkModal" ).dialog({
			autoOpen: false,
			resizable: false,
			width: '550px',
			open:function(){
				$('.dim').show();
			},
			close:function(){
				$('.dim').hide();
				location.href = "/user/login/logout.do";
			},
			buttons: {
				Ok: {
					click: function () {
						var tempTeacherType = $("#schoolInfoChkModal").find("input[name=mTeacherType]:checked").val();
						var tempSchoolType = $("#schoolInfoChkModal").find("input[name=mSchoolType]:checked").val();
						
						if(tempTeacherType == undefined || tempSchoolType == undefined){
							$("#alertModal").dialog({
								autoOpen: false,
								width: '470px',
								resizable: false,
								buttons: {
									Ok: {
										click: function () {
					                        $("#alertModal").dialog("close");
					                    },
					                    text: '확인',
					                    class: 'btn-38 spot'
									}
								}
							}).dialog("open");
						}else{
							
							$.ajax({
								url : '/common/updateSchoolInfo.json',
								type : 'POST',
								dataType : 'json',
								data : {"memberSchoolType" : tempSchoolType, "memberTeacherType" : tempTeacherType },
								success : function(result) {
									var resultVal = result.resultCode;
									
									if(resultVal == "Ex001"){
										$("#schoolInfoChkModal").find("input[name=mTeacherType]:checked").attr("checked", false);
										$("#schoolInfoChkModal").find("input[name=mSchoolType]:checked").attr("checked", false);
										$('.dim').hide();
										$("#schoolInfoChkModal").dialog("destroy");
									}
								}
							});
						}						
	                   
	                },
	                text: '회원정보 저장하기',
	                class: 'btn-38 spot'
				}
			}
		}).dialog("open");
	}
	
	
	$("select[id='emailSelect']").selectmenu({
		change:function(){
			if($(this).val() != ""){
				$("#email2").val($(this).val());
			}else{
				$("#email2").val("");
			}
		}
	});

	$(".tel").keyup(function(){
		$(this).val( $(this).val().replace( /[^0-9]/g, '' ) );
	});

	
	$("input[name='memType']").change(function(){
		var positionVal = $(this).val();
		var isChecked = $(this).is(":checked");

		if(isChecked && positionVal == "O"){
			$("#memTypeName").removeAttr("readonly");
		} else {
			$("#memTypeName").val("");
			$("#memTypeName").attr("readonly",true);
		}
	});
	
	// 플레이 모드 선택 다이얼로그
	$("#dialogPlayMode").dialog({
		autoOpen: false,
		resizable: false,
		width: '640px',
		open:function(){
			$('.dim').show();
		},
		close:function(){
			if(!$(".fullpage-modal").is(':visible')){
				$('.dim').hide();
			}
		}
	});
	
});


/* function */
//텍스트 길이 관련 함수
var calByte = {
	getByteLength : function(s) {
		if (s == null || s.length == 0) {
			return 0;
		}
		var size = 0;
		for (var i = 0; i < s.length; i++) {
			size += this.charByteSize(s.charAt(i));
		}
		return size;
	},
	cutByteByLength : function(s, len) {
		if (s == null || s.length == 0) {
			return 0;
		}
		var size = 0;
		var rIndex = s.length;
		for (var i = 0; i < s.length; i++) {
			size += this.charByteSize(s.charAt(i));
			if (size == len) {
				rIndex = i + 1;
				break;
			} else if (size > len) {
				rIndex = i;
				break;
			}
		}
		return s.substring(0, rIndex);
	},
	charByteSize : function(ch) {
		if (ch == null || ch.length == 0) {
			return 0;
		}
		var charCode = ch.charCodeAt(0);
		if (charCode <= 0x00007F) {
			return 1;
//			} else if (charCode <= 0x0007FF) {
//				return 2;
//			} else if (charCode <= 0x00FFFF) {
//				return 3;
		} else {
//				return 4;
			return 2;
		}
	}
};

//메세지 팝업 열기 
function msgLayerOpen(msg){
	$("div.popup-cont #msg").html(msg);
	$("div.popup-cont").show();
}

// 메세지 팝업 닫기 
function msgLayerClose(){
	$("div.popup-cont").hide();
}

// 페이징 링크
function fnPageLink(pageNo) {
	$("#searchForm input[name=currentPageNo]").val(pageNo); 
    var actionUrl = window.location.pathname;
	$("#searchForm").attr("action", actionUrl).submit();
}

// 검색 실행. 필요시 페이지에서 다시 정의
function fnSearch(formId){
	var $targetForm;
	if(typeof formId != "undefined" && typeof formId != "object"){
		$targetForm = $("#"+formId);
	} else {
		$targetForm = $("#searchForm");
	}
		
	$targetForm.find("input[name=currentPageNo]").val("1"); // 페이지 no 초기화
	$targetForm.find("input[name=curationSeq]").val(""); // 큐레이션 정보 초기화
	actionUrl = window.location.pathname;
	$targetForm.attr("action", actionUrl).submit();
}

// 다른 페이지로 이동 검색 
function fnSearchActionUrl(actionUrl){
	$("#searchForm input[name=currentPageNo]").val("1"); // 페이지 no 초기화
	$("#searchForm input[name=curationSeq]").val(""); // 큐레이션 정보 초기화
	$("#searchForm").attr("action", actionUrl).submit();
}

// 홈아닌 페이지에서 검색 실행 by 태그 클릭
function goHomeSearchByTag(tag){
	var actionUrl = "/user/content/quizUserHome.do";
	var $form = $('<form></form>');
	$form.attr('action', actionUrl);
	$form.attr('method', 'post');
	$form.attr('target', '_self');
	$form.append('<input type="hidden" name="searchType" value="TAG">');
	$form.append('<input type="hidden" name="searchWord" value="' + tag + '">');
	$form.append('<input type="hidden" name="scrollYn" value="Y">');
	$form.appendTo('body');
	$form.submit();
}


//콘텐츠 만들기로 이동
// viewType: VIEW, EDIT, EDIT_SCRAPE
function goMakeContent(quizIdx, quizCategory, viewType, isQuizModalOn){
	
	if(viewType == 'EDIT_SCRAPE'){
		// 복사수 증가 
		var data = {
			'quizIdx' : quizIdx
		};
		
		$.ajax({
			url : '/user/library/updateCopyCount.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				console.log(result);
			}
		});
	}
	
	/*
	// 모달 상태에서 이동할 경우 검색 정보 cookie에 저장
	if(isQuizModalOn){
		var quizModalSearchParam = $("#modalSearchForm").serializeObject(); // 검색 조건 object -> json으로 저장
		// 쿠키 저장
		$.cookie("isQuizModalOn", isQuizModalOn);
		$.cookie("quizModalSearchParam", JSON.stringify(quizModalSearchParam));
	}
	
	// 퀴즈 메인에서 이동할 경우 검색 정보 cookie에 저장
	if((location.pathname).indexOf("/quizUserHome.do") > 0){
		var quizMainSearchParam = $("#searchForm").serializeObject(); // 검색 조건 object -> json으로 저장
		var quizMainSearchFilter = $("#searchForm .filtered-word").html();
		// 쿠키 저장
		$.cookie("isQuizFromMain", true);
		$.cookie("quizMainSearchParam", JSON.stringify(quizMainSearchParam));
		$.cookie("quizMainSearchFilter", quizMainSearchFilter);
	} else {
		$.removeCookie("isQuizFromMain");
	}*/
	
	var actionUrl = "/user/content/make/quizUserMakeContent.do";
	var $form = $('<form></form>');
	$form.attr('action', actionUrl);
	$form.attr('method', 'post');
	$form.attr('target', '_self');
	
	if($("#currentPageNo").length != 0 ){
		var tempPageNo = Number($(".paging").find("li.now").text());
		$form.append('<input type="hidden" name="returnPageNo" value="' + tempPageNo + '">');
	}
	$form.append('<input type="hidden" name="quizIdx" value="' + quizIdx + '">');
	$form.append('<input type="hidden" name="quizCategory" value="' + quizCategory + '">');
	$form.append('<input type="hidden" name="viewType" value="' + viewType + '">');  //viewType: VIEW, EDIT, EDIT_SCRAPE
	if(viewType == 'EDIT_SCRAPE'){
		$form.append('<input type="hidden" name="lastUrl" value="/user/storage/myQuizScrap.do">');
	} else {
		$form.append('<input type="hidden" name="lastUrl" value="' + window.location.pathname + '">');
	}
	$form.append('<input type="hidden" name="lastSearchParam" value="' + $("#searchForm").serialize() + '">');
	$form.appendTo('body');
	$form.submit();
}

// 라이브러리 list by main
function goLibraryList(type, value){
	if(type == "MAIN_CURATION"){
		var actionUrl = "/user/library/quizUserLibraryList.do";
		var $form = $('<form></form>');
		$form.attr('action', actionUrl);
		$form.attr('method', 'post');
		$form.attr('target', '_self');
		$form.append('<input type="hidden" name="curationSeq" value="' + value + '">');
		$form.appendTo('body');
		$form.submit();
	} else if(type == "TAG"){
		var $form = $("#searchForm");
		$form.find("#searchKeyword").val(value);
		$form.submit();
	} else if(type == "KEYWORD"){
		var $form = $("#searchForm");
		var keyword = $.trim($form.find("#searchKeyword").val());
		if(keyword == ""){
			dialogAlert("검색어를 입력하세요.");
			$form.find("#searchKeyword").focus();
		} else {
			$form.submit();
		}
		
	}
}

// 라이브러리 detail
function goLibraryDetail(quizIdx){
	
	// 조회수 증가 
	var data = {
		'quizIdx' : quizIdx
	};
	
	$.ajax({
		url : '/user/library/updateViewCount.json',
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(result) {
			console.log(result);
		}
	});
	
	var actionUrl = "/user/library/quizUserLibraryDetail.do";
	var $form = $('<form></form>');
	$form.attr('action', actionUrl);
	$form.attr('method', 'post');
	$form.attr('target', '_self');
	$form.append('<input type="hidden" name="quizIdx" value="' + quizIdx + '">');
	$form.appendTo('body');
	$form.submit();
}

// loading progress on 
function loadingProgressOn($target){
	
	if(typeof $target == "undefined"){
		$target = $("body");
	}

	if($target.find("div.loading").length > 0){
		$target.find("div.loading").show();
	} else {
		$target.append('<div class="loading"></div>');
	}
}

// loading progress off
function loadingProgressOff(){
	$("div.loading").remove();
}

// front 미리보기 모달 팝업
function popQuizContentPreview(quizIdx){
//	console.log("미리보기: " + quizIdx);
	var data = {
		'quizIdx' : quizIdx
	};

	$.ajax({
		url : '/user/content/modal/quizUserContentPreview.json',
		type : 'POST',
		dataType : 'html',
		data : data,
		success : function(result) {
//			console.log(result);	
			$("div.subArea").append(result);
			/*
			if(sortable){
//				$('.q-preview-popup h3').text("순서변경");
				$( ".q-preview-popup ol").sortable({
					  deactivate: function( event, ui ) {
						  console.log("deactivated");
					  }, remove: function( event, ui ) {
						  console.log("removed");
					  }
				});
			}
			*/
			$('.q-preview-popup').fadeIn();
		}
	});
}

// front 미리보기 모달 닫기
function closeQuizContentPreview(){
//	console.log("미리보기 닫기 ");
	$('.q-preview-popup').fadeOut();
}

//front 순서변경 모달 닫기
function closeQuizContentPreview(){
//	console.log("미리보기 닫기 ");
	$('.q-preview-popup').fadeOut();
}

// 현재 도메인에 따른 tkbell view url 
function getQuizViewUrl(){
	var hostname = window.location.hostname;
	
	var url =  '';
	if(hostname.indexOf("www.") > -1 || hostname == "tkbell.co.kr"){ // real
		url += 'https://q.tkbell.co.kr';
//		url += 'http://q.tkbell.co.kr';
	} else if(hostname.indexOf("stage.") > -1){ // stage
		url += 'https://stage-q.tkbell.co.kr';
	} else if(hostname.indexOf("localhost") > -1 || hostname.indexOf("10.0.1.") > -1 || hostname.indexOf("192.168.10.") > -1){ // localhost
		url += 'http://' + hostname + ':81';
	} else {
		url += 'q.tkbell.co.kr';
	}
	
	return url;
}

// 현재 도메인에 따른 아이스크림 url 
function getIscreamUrl(){
	var hostname = window.location.hostname;
	
	var url =  '';
	if(hostname.indexOf("www.") > -1 || hostname == "tkbell.co.kr"){ // real
		url += 'https://www.i-scream.co.kr';
	} else if(hostname.indexOf("stage.") > -1){ // stage
		url += 'https://stage.i-scream.co.kr';
	} else if(hostname.indexOf("localhost") > -1 || hostname.indexOf("10.0.1.") > -1 || hostname.indexOf("192.168.10.") > -1){ // localhost
		url += 'https://stage.i-scream.co.kr';
	} else {
		url += 'https://www.i-scream.co.kr';
	}
	
	return url;
}

// 퀴즈 시작하기
function playQuizContent(quizIdx, playType){
	var hostname = window.location.hostname;
	var url = getQuizViewUrl();
	
	if(playType == 'OFFLINE'){
		url += '/teacher/offReadyRoom.do';
	} else {
		url += '/teacher/joinReadyRoom.do';
	}
	
//	url += '?quizIdx=' + quizIdx 
	
	// TEST
	if(hostname.indexOf("localhost") > -1 || hostname.indexOf("10.0.1.") > -1 || hostname.indexOf("192.168.10.") > -1){ // localhost
//		url += '&teacherId=tkmaster';
//		url += '&teacherId=jamie0park';
//		url += '?teacherId=jamie0park';
	}
	
//	console.log("url: " + url);
//	window.open(url,"quiz_viewer",'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes,resizeable=1');
	
	var screenSizeWidth,screenSizeHeight;
    screenSizeWidth = screen.width ;  
    screenSizeHeight = screen.height;
    intWidth = screenSizeWidth;
    intHeight = screenSizeHeight;
    intXOffset = 0 ;
    intYOffset = 0 ;

	var windowName = 'quiz_viewer';
//	var windowName = 'quiz_viewer_' + quizIdx;
	
	// IE에서 window.moveTo() 타도메인 액세스가 거부 문제로 blank 페이지 open 후 다시 퀴즈 뷰어 open 
	/*var quizViewer = window.open('/asset/serviceFront/html/blank.html', windowName,'height=' + screen.availHeight + ',width=' + screen.availWidth + 'fullscreen=yes,resizable=yes');
	quizViewer = window.open(encodeURI(url), windowName,'height=' + screen.availHeight + ',width=' + screen.availWidth + 'fullscreen=yes,resizable=yes');
	quizViewer.resizeTo(intWidth, intHeight) ;
	quizViewer.moveTo(intXOffset, intYOffset);
	quizViewer.focus();*/
	
	console.log("url: " + url);
	
	var $form = $("#quizPlayForm");
	$form.attr('action', url);
	$form.attr('method', 'post');
	$form.attr('target', 'quizPlayOnline');
	$form.find('#quizIdx').val(quizIdx);
	
	var quizViewer = window.open('', 'quizPlayOnline','height=' + screen.availHeight + ',width=' + screen.availWidth + 'fullscreen=yes,resizable=yes');
	
	$form.submit();
	
	quizViewer.resizeTo(intWidth, intHeight) ;
	quizViewer.moveTo(intXOffset, intYOffset);
	quizViewer.focus();
	
//	console.log("quizIdx: " + quizIdx);
//	console.log("param: " + $form.serialize());

	
	/* 퀴즈 플레이수 증가 주체 변경 home -> view
	// 플레이수 증가 
	var data = {
		'quizIdx' : quizIdx
	};
	
	$.ajax({
		url : '/user/library/updatePlayCount.json',
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(result) {
//			console.log(result);
		}
	});
	*/
}

// 공유여부 상태 변경
function updateShared(quizIdx, obj){
	console.log("quizIdx: " + quizIdx);
	
	var data = {
		'quizIdx' : quizIdx
	};
	
	$.ajax({
		url : '/user/content/updateShared.json',
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(result) {
//			console.log(result);
//			console.log(result.quizVO.sharedYn);
			if(result.success){
				if(result.quizVO.sharedYn == "Y"){
					$(obj).removeClass("off");
					$(obj).html("<em>"+result.count+"</em>스크랩");
					var msgHtml = '<div class="alert"><div class="msg">공유상태로 설정되었습니다.</div></div>';
					$(msgHtml).appendTo('body').fadeOut(1500).delay(1500).queue(function() { $(this).remove(); });
//					$("#msgLayer .msg").text("공유상태로 설정되었습니다.");
//					$("#msgLayer").show();
//					$("#msgLayer").fadeOut(1000);
				} else {
					$(obj).addClass("off");
					$(obj).html("공유안함");
					var msgHtml = '<div class="alert"><div class="msg">공유안함으로 설정되었습니다.</div></div>';
					$(msgHtml).appendTo('body').fadeOut(1500).delay(1500).queue(function() { $(this).remove(); });
				}
			}
		}
	});
	
}

// 스크랩 저장 or 스크랩 상태 변경. 리스트에서 사용
function upsertScrap(quizIdx, obj){
//	console.log("quizIdx: " + quizIdx);
	
//	console.log($(obj).hasClass("off"));
//	$(obj).find("em").text("aaaa");
//	if(!$(obj).hasClass("off")){ // 활성 상태 일 경우 스크랩 
	
		var data = {
			'quizIdx' : quizIdx
		};
		
		$.ajax({
			url : '/user/content/upsertScrap.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
//				console.log(result);
//				console.log($(obj));
				
				if(result.success){
						$(obj).find("#scrapCnt").html(result.count);
						if(result.isAvailable == 0){
							$(obj).addClass("on");
							var msgHtml = '<div class="alert"><div class="msg">보관함에 스크랩 되었습니다.</div></div>';
							$(msgHtml).appendTo('body').fadeOut(1500).delay(1500).queue(function() { $(this).remove(); });
						} else {
							// 보관함 스크랩에서는 페이지 reload
							if(location.pathname.indexOf("myQuizScrap.do") > 0 && !$(".fullpage-modal").is(':visible')){
								fnSearch();
							}else if($(".fullpage-modal").is(':visible')){
								fnFilterSearch();
							}else { // 아니면 메세지
								$(obj).removeClass("on");
								var msgHtml = '<div class="alert"><div class="msg">스크랩이 해제되었습니다.</div></div>';
								$(msgHtml).appendTo('body').fadeOut(1500).delay(1500).queue(function() { $(this).remove(); });
							}
						}
				}
			}
		});
//	}
	
}

//스크랩 저장. 만들기 화면에서 사용
function insertOnlyScrap(quizIdx){
	var data = {
			'quizIdx' : quizIdx
	};
	
	$.ajax({
		url : '/user/content/insertOnlyScrap.json',
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(result) {
			console.log(result);
			if(result.success){
				var msgHtml = '<div class="popup-cont pop-alt"><p class="txt">'+result.msg+'</p></div>';
				$(msgHtml).appendTo('body').fadeOut(1500).delay(1500).queue(function() { $(this).remove(); });
			}
		}
	});
}

//상세에서 history.back()으로 온 경우 modal 검색 정보 다시 설정 
function popOthersLockerHistoryBack(){
	var quizModalSearchParamJson = JSON.parse($.cookie("quizModalSearchParam"));
//	console.log(quizModalSearchParamJson);
	/*
//	var quizCategoryParam = '';
//	var gradeCdParam = '';
//	var termCdParam = '';
//	if(typeof quizModalSearchParamJson.quizCategory != "undefined"){
//		quizCategoryParam = quizModalSearchParamJson.quizCategory;
//	}
//	if(typeof quizModalSearchParamJson.gradeCd != "undefined"){
//		gradeCdParam = quizModalSearchParamJson.gradeCd;
//	}
//	if(typeof quizModalSearchParamJson.termCd != "undefined"){
//		termCdParam = quizModalSearchParamJson.termCd;
//	}
//	setSearchSelectBoxByValue($("#modal_select_box_quiz_category"), 'quizCategory', quizCategoryParam); // 퀴즈 카테고리
//	setSearchSelectBoxByValue($("#modal_select_box_grade_cd"), 'gradeCd', gradeCdParam); // 학년
//	setSearchSelectBoxByValue($("#modal_select_box_term_cd"), 'termCd', termCdParam); // 학기 
	
	setSearchSelectBoxByValue($("#modal_select_box_quiz_category"), 'quizCategory',quizModalSearchParamJson. quizCategoryParam); // 퀴즈 카테고리
	setSearchSelectBoxByValue($("#modal_select_box_grade_cd"), 'gradeCd', quizModalSearchParamJson.gradeCdParam); // 학년
	setSearchSelectBoxByValue($("#modal_select_box_term_cd"), 'termCd', quizModalSearchParamJson.termCdParam); // 학기 
	
	$("#modalSearchForm").find("input[name=mId]").val(quizModalSearchParamJson.mId); // 대상 사용자 ID
	$("#modalSearchForm").find("input[name=currentPageNo]").val(quizModalSearchParamJson.currentPageNo); // currentPageNo
	
	// scrapViewType: 스크랩 제외보기
	var scrapViewType = "";
	if(quizModalSearchParamJson.scrapViewType == "" || quizModalSearchParamJson.scrapViewType == "INCLUDED"){
		$("#modalSearchForm").find("input[name=scrapViewType]").val("INCLUDED");
	} else {
		$("#modalSearchForm").find("input[name=scrapViewType]").val("EXCLUDED");
		$("#scrapViewTypeBtn").attr("data-scrap-view-type", "EXCLUDED");
		$("#scrapViewTypeBtn").addClass("selected");
	}
	*/
	// 모달 팝업 호출
	popOthersLocker(quizModalSearchParamJson);
}

//다른 사용자 보관함 보기 모달 팝업
// searchParam을 jsonObject로 넘기거나 targetId를 String으로 넘기거나
function popOthersLocker(searchParam){
		
	var data;
	if(typeof searchParam == "string"){ // string type: targetId
		data = {'targetId' : searchParam};
	} else if(typeof searchParam == "object"){ // object type: search param json
		data = searchParam;
	}
	console.log(data);
	
	$.ajax({
		url : '/user/library/modal/othersLockerModal.json',
		type : 'POST',
		dataType : 'html',
		data : data,
		success : function(result) {
//				console.log(result);
			$(".fullpage-modal").html(result);
			$('.dim').fadeIn();
	 		$('.fullpage-modal').fadeIn();
		}
	});
}

// 다른 사용자 보관함 모달 검색 조건 초기화
function initOthersLockerModalSearchCondition(){
	// 카테고리
	setSearchSelectBoxByValue($("#modalSearchForm #modal_select_box_quiz_category"), 'quizCategory', '');
	// 학년
	setSearchSelectBoxByValue($("#modalSearchForm #modal_select_box_grade_cd"), 'gradeCd', '');
	// 학기
	setSearchSelectBoxByValue($("#modalSearchForm #modal_select_box_term_cd"), 'termCd', '');
	// 검색어
	$("#modalSearchForm #modalSearchWord").val("");
}

// 검색 select_box, inputName, 값으로 세팅
function setSearchSelectBoxByValue($targetSelDiv, inputName, checkedVal){
	var selectedText = $targetSelDiv.find("input[name="+inputName+"][value="+checkedVal+"]").next("label").text();	
	$targetSelDiv.find(".current > em").text(selectedText);
	$targetSelDiv.find("input[name="+inputName+"][value="+checkedVal+"]").prop("checked", true); 
}

//검색 select_box 현재 text 가져오기
function getSearchSelectBoxCurrentText($targetSelDiv){
	var selectedText = $targetSelDiv.find("a.current em").text();
	return selectedText;
}

// 검색 select_box 라디오 값 가져오기
function getSearchSelectBoxRadioValue($targetSelDiv){
	var selectedText = getSearchSelectBoxCurrentText($targetSelDiv);
	var selectedValue = $targetSelDiv.find("label:contains('"+selectedText+"')").prev("input").val();
	return selectedValue;
}

// form data serializeObject
jQuery.fn.serializeObject = function() {
	var obj = null;
	try {
		if (this[0].tagName && this[0].tagName.toUpperCase() == "FORM") {
			var arr = this.serializeArray();
			if (arr) {
				obj = {};
				jQuery.each(arr, function() {
					obj[this.name] = this.value;
				});
			}//if ( arr ) {
		}
	} catch (e) {
		alert(e.message);
	} finally {
	}

	return obj;
};

function unserialize(str) {
	str = decodeURIComponent(str);
	var chunks = str.split('&'), obj = {};
	for (var c = 0; c < chunks.length; c++) {
		var split = chunks[c].split('=', 2);
		obj[split[0]] = split[1];
	}
	return obj;
}

// 숫자 콤마 표시
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// random number
function getRandomNumber(min, max){
	if(typeof min == "undefined"){
		min = 1;
	}
	if(typeof max == "undefined"){
		max = 10;
	}
    var random = Math.floor(Math.random() * (+max - +min)) + +min; 
//    console.log("Random Number Generated : " + random ); 
    return random;
}

//퀴즈 만들기 대표 이미지 에러시 
function errorQuizMakeImage(obj) {
	$(obj).attr("src", "/asset/images/make/noimage.png");
}

// 퀴즈 보기 대표 이미지 에러시 
function errorQuizImage(obj) {
	var quizCategory = $(obj).data("category");
	var num = getRandomNumber(1, 5);
//	console.log("category: " + quizCategory);
//	console.log("num: " + num);
	if(quizCategory == "QUIZ"){
		$(obj).attr("src", "/asset/images/common/noimage"+num+".gif");
	} else { // DEBATE
		$(obj).attr("src", "/asset/images/common/noimage"+num+".gif");
	}
}

//날짜를 separator로 구분된 YMD 포맷 형태로 변환. ex) yyyy-mm-dd
function getDateFormatYMD(date, separator) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	if (m < 10) {
		m = "0" + m;
	}
	if (d < 10) {
		d = "0" + d;
	}
	return y + separator + m + separator + d;
}


// 유료 사용자 기능 alert
function alertUnPaidUserMessage() {
	alert("유료회원만 이용하실 수 있는 기능입니다.");
}

// 영상 재생
//아이스크림 동영상 재생 
function playIscreamMediaMultiView(contentNo, contentTypeCd, linkUrl, contentTitle) {
//	console.log("contentTypeCd: " + contentTypeCd);
//		console.log("linkUrl: " + linkUrl);
//	console.log("contentTitle: " + contentTitle);
	var contentTitle = contentTitle.split("@#$%").join("'");
//	console.log("contentTitle: " + contentTitle);

//	var viewURL = 'https://www.i-scream.co.kr/multiview/main/MainPage.do';
	var hostname = window.location.hostname;
	var viewURL =  '';
	if(hostname.indexOf("www.") > -1 || hostname == "tkbell.co.kr"){ // real
		viewURL += 'http://www.i-scream.co.kr/multiview/main/MainPage.do';
	} else {
		viewURL += 'http://stage.i-scream.co.kr/multiview/main/MainPage.do';
	}
	if (contentTypeCd == "MOD") {
		viewURL += '?content_gubun=MOD&sort=iscream&content_no=' + contentNo;
	} else if (contentTypeCd == "MOV") {
		viewURL += '?sort=directUrl&content_gubun=MOV&file_path=' + linkUrl + '&content_title=' + contentTitle;
	}
	console.log("viewURL: " + viewURL);
	window.open(viewURL, 'multiview', 'height=665,width=1000,resizable=yes');
}

// 유튜브 재생
function playYoutubeMedia(youtubeId, contentTitle) {
//		console.log("youtubeId: " + youtubeId);
	window.open('https://www.youtube.com/embed/' + youtubeId, 'youtube', 'height=665,width=1000,resizable=yes');
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//새로추가 기능//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 리스트에서 더보기 버튼
function fnMoreButton(buttonObj){
	$(buttonObj).closest('.item-info').find('.more-panel').fadeToggle(100);
	$(buttonObj).toggleClass('on');	
	autoClose(buttonObj,'.more-panel');
}

function autoClose(tg,obj){
	tg = $(tg);
	obj = $(obj);
	
	$(document).on('mouseup',function(e){
		if (tg.is(e.target) || tg.has(e.target).length != 0){
	       return;
	    }
		//if (!obj.is(e.target) && obj.has(e.target).length === 0){
	        obj.fadeOut(100);
	        tg.removeClass('on')
	    	$(document).off('mouseup');
	    //}		
	});
}

// 기본 모달 얼럿창
function dialogAlert(text){
	$("#dialogAlert p strong").html(text);
	$("#dialogAlert").dialog({
		autoOpen: false,
		width: '470px',
		resizable: false,
		buttons: {
			Ok: {
				click: function () {
					$(this).dialog("close");
                },
                text: '확인',
                class: 'btn-38 spot'
			}
		},
		open:function(){
			$('.dim').show();
		},
		close:function(){
//			console.log($(".ui-dialog:visible").length);
			if(!$(".fullpage-modal").is(':visible') && !$("#dialogPlayMode").is(':visible') && $(".ui-dialog:visible").length < 1){
				$('.dim').hide();
			}
		}
	}).dialog("open");
}

// url 이동 모달 얼럿창
function dialogAlertWithUrl(text, url){
	$("#dialogAlert p strong").text(text);
	$("#dialogAlert").dialog({
		autoOpen: false,
		width: '470px',
		resizable: false,
		buttons: {
			Ok: {
				click: function () {
					location.href = url;
                },
                text: '확인',
                class: 'btn-38 spot'
			}
		},
		open:function(){
			$('.dim').show();
		},
		close:function(){
			$('.dim').hide();
		}
	}).dialog("open");
}

//no dim 모달 얼럿창 
function dialogNoDimAlert(text){
	$("#dialogAlert p strong").text(text);
	$("#dialogAlert").dialog({
		autoOpen: false,
		width: '470px',
		resizable: false,
		buttons: {
			Ok: {
				click: function () {
					$(this).dialog("close");
                },
                text: '확인',
                class: 'btn-38 spot'
			}
		},
		open:function(){
		},
		close:function(){
		}
	}).dialog("open");
}	

// 기본 모달 확인창
// 페이지에서 버튼 함수 재정의 필요
function dialogConfirm(text){
	$("#dialogConfirm p strong").text(text);
	$("#dialogConfirm").dialog({
		autoOpen: false,
		width: '470px',
		resizable: false,
		buttons: {
			Okay: {
				click: function () {
					dialogConfirmOkay($(this));
                },
                text: '확인',
                class: 'btn-38 spot'
			},
			Cancel: {
				click: function () {
					dialogConfirmCancel($(this));
                },
                text: '취소',
                class: 'btn-38'
			}
		},
		open:function(){
			$('.dim').show();
		},
		close:function(){
			$('.dim').hide();
		}
	}).dialog("open");
}


// 기본 모달 확인창 Okay
function dialogConfirmOkay($target){
	$target.dialog("close");
}

//기본 모달 확인창 Cancel
function dialogConfirmCancel($target){
	$target.dialog("close");
}

// 공유하기 모달
function fnShareModal(quizIdx, buttonObj){
	// 대상 모달
	var modalId = "modalShareSns";
	var $targetModal = $("#modalShareSns");
	
	var listId = $(buttonObj).parents("ul.item-list").attr("id");
//	console.log(listId);
	
	var damainUrl = location.origin;
	if(location.port != ""){
		damainUrl += ':'+location.port;
	}
	
	var url = damainUrl + '/user/library/quizUserLibraryDetail.do?quizIdx=' + quizIdx ;

	$targetModal.find("#copyUrl").val(url);
	$targetModal.find("#copyButton").attr("onclick", "copyToClipboard('"+url+"')");
//	$targetModal.find("#kakao").attr("onclick", "fnSnsShare('kakao', '"+modalId+"', '"+quizIdx+"', '"+listId+"')");
	$targetModal.find("#fb").attr("onclick", "fnSnsShare('fb', '"+modalId+"', '"+quizIdx+"', '"+listId+"')");
	$targetModal.find("#band").attr("onclick", "fnSnsShare('band', '"+modalId+"', '"+quizIdx+"', '"+listId+"')");
	
	var shareUrl = $targetModal.find("#copyUrl").val();
	var shareTitle = $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".item-tit").text();
	var shareImage = damainUrl + $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".quizImage").attr("src");
	
	// 공유하기 모달 팝업
	$targetModal.dialog({
		autoOpen: false,
		resizable: false,
		width: '470px',
		open:function(){
			$('.dim').show();
		},
		close:function(){
			if(!$(".fullpage-modal").is(':visible')){
				$('.dim').hide();
			}
			Kakao.Link.cleanup(); // 카카오톡 버튼 설정 해제
		}
	}).dialog("open");
	
	// 카카오 버튼 설정
	Kakao.Link.createDefaultButton({
		container: '#modalShareSns #kakao',
		objectType : 'feed',
		content : {
			title : shareTitle,
			imageUrl : shareImage,
			link : {
				mobileWebUrl : shareUrl,
				webUrl : shareUrl
			}
		},
		buttons : [{
			title : '웹으로 보기',
			link : {
				mobileWebUrl : shareUrl,
				webUrl : shareUrl
			}
		}]
	});
	
}

// SNS 공유하기 - 일반 
function fnSnsShare(snsType, modalId, quizIdx, listId){
	
	var damainUrl = location.origin;
	if(location.port != ""){
		damainUrl += ':'+location.port;
	}	
	
	var shareUrl = $("#"+modalId).find("#copyUrl").val();
	var shareTitle = $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".item-tit").text();
//	var shareImage = damainUrl + $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".quizImage").attr("src");
	var shareImage = ""; 
	if(listId == "reportList"){ // 리포트는 이미지 사용 안하므로 input hidden에서
		shareImage = damainUrl + $("tr[data-quiz-idx='"+quizIdx+"']").find("input[name='quizImage']").val();
	} else {
		shareImage = damainUrl + $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".quizImage").attr("src");
	}
	
	if(snsType == "fb"){
		window.open('https://www.facebook.com/sharer/sharer.php?u='+ encodeURIComponent(shareUrl) + '&enc=utf-8', 'FacebookShare','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
	}else if(snsType == "band"){
		window.open('https://www.band.us/plugin/share?body='+ encodeURIComponent(shareTitle) + '%0A'+ encodeURIComponent(shareUrl) + '&route='	+ encodeURIComponent(shareUrl), 'NaverBandShare','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=500');
	}else{
		// 카카오 버튼 미리 설정
	}
}

// SNS 공유하기 - 하이클래스 
function fnHiclassShare(modalId, pinNumber){
	
	var shareUrl = $("#"+modalId).find("#copyUrl").val();
	$("#hiclassForm #shareUrl").val(shareUrl);
	$("#hiclassForm #pinNumber").val(pinNumber);
	
	hiClassCheck(shareUrl, pinNumber);
}

// URL 복사 type: null, PIN
function copyToClipboard(copyUrl, type) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(copyUrl).select();
	document.execCommand("copy");
	$temp.remove();
	console.log(type);
	if(typeof type != "undefined" && type == "PIN"){
		alert('방번호가 복사되었습니다. 원하시는 곳에 Ctrl+V해서 붙여넣기해주세요.');
	} else {
		alert('URL 주소가 복사되었습니다. 원하시는 곳에 Ctrl+V해서 붙여넣기해주세요.');
	}
}

// 신고하기 모달 
function fnReportQuiz(quizIdx, buttonObj){
	$("#modalReportQuiz").find("#reportWriter").text($("form #nickName").val());
	$("#modalReportQuiz").find("#reportTitle").text($(buttonObj).parents("li").find(".item-tit").text()); // 제목
	$("#modalReportQuiz").find("#reportQuizIdx").val(quizIdx);
	
	// 신고하기 모달 팝업
	$("#modalReportQuiz").dialog({
		autoOpen: false,
		resizable: false,
		width: '600px',
		open:function(){
			$('.dim').show();
		},
		close:function(){
			if(!$(".fullpage-modal").is(':visible')){
				$('.dim').hide();
			}
		},
		buttons: {
			Ok: {
				click: function () {
					fnReport();
                },
                text: '확인',
                class: 'btn-38 spot'
			}
		}
	}).dialog("open");
}

// 신고하기
function fnReport() {
	var tempSeq = "${sessionScope['SESSION_MAP'].sessionMseq}";

	if($("#modalReportQuiz").find("#reportContent").val() == ""){
		alert("신고 사유 및 설명을 작성해 주시기 바랍니다.");
		return false;
	}else{
		var data = {
			"reportTite" : $("#modalReportQuiz").find("#reportTitle").text(),
			"reportContent" : $("#modalReportQuiz").find("#reportContent").val(), 
			"quizIdx"	: $("#modalReportQuiz").find("#reportQuizIdx").val()
		}
//		console.log(data);
		
		$.ajax({
			url : '/user/storage/insertReport.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				var resultVal = result.resultVal;
				
				if(resultVal == "Ex0001"){
					alert("접수 되었습니다.");
					$("#modalReportQuiz").find("#reportContent").val(''); 
					$("#modalReportQuiz").dialog("close");
				}else{
					alert("접수에 실패 하였습니다.");
				}
			}
		});
		
	}
}

//퀴즈 복사
function fnCopyQuiz(quizIdx){
	$("#dialogConfirm p strong").text("복사하시겠습니까?");
	$("#dialogConfirm").dialog({
		autoOpen: false,
		width: '470px',
		resizable: false,
		buttons: {
			Okay: {
				click: function () {
					var data = {
							'quizIdx' : quizIdx
					};
					$.ajax({
						url : '/user/content/copyMyQuizContent.json',
						type : 'POST',
						dataType : 'json',
						data : data,
						success : function(result) {
							console.log(result);
							goMakeContent(result.newQuizVO.quizIdx, result.newQuizVO.quizCategory, 'EDIT', false);
						},
						error: function(e){
							console.log("ERROR : ", e);
						}
					});
                },
                text: '확인',
                class: 'btn-38 spot'
			},
			Cancel: {
				click: function () {
					dialogConfirmCancel($(this));
                },
                text: '취소',
                class: 'btn-38'
			}
		},
		open:function(){
			$('.dim').show();
		},
		close:function(){
			$('.dim').hide();
		}
	}).dialog("open");
}


//퀴즈 삭제
function fnDeleteQuiz(quizIdx){
	if(confirm("삭제하시겠습니까?")){
		console.log(quizIdx);
		var data = {
			'quizIdx' : quizIdx
		};
		$.ajax({
			url : '/user/content/deleteQuizContentOne.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				console.log(result);
				if(result.success){
					if(location.href.indexOf("/user/library/quizUserLibraryDetail") > -1){
//						history.back();
						location.href = '/user/storage/myQuizStorage.do';
					} else {
						location.reload();
					}
				}
			},
			error: function(e){
				console.log("ERROR : ", e);
			}
		});
	}
}

//아이디 중복 체크
function checkDuplicationMemberId() {
	var idReg = /^[a-z]+[a-z0-9]{5,19}$/g;
	var memberId = $.trim($("#memberId").val());

	if (memberId == "") {
		$("#memberForm #memberId").focus();
		dialogAlert("아이디를 입력해 주세요.");
		return;
	} else if (!idReg.test(memberId)) {
		dialogAlert("아이디는 영문으로 시작해야 하며, 영문과 숫자를 조합해 6~20자 이내로 입력해 주세요.");
		return;
	}

	$.ajax({
		url : '/user/login/checkDuplicationMemberId.json',
		type : 'POST',
		dataType : 'json',
		data : {
			'memberId' : memberId
		},
		success : function(result) {
//				console.log(result);
			var message = result.resultMap.message;
			if (message == "DUPLICATION") { // 중복
				dialogAlert("이미 사용중인 아이디입니다.");
			} else if (message == "AVAILABLE") { // 사용가능
				dialogAlert("사용 가능한 아이디입니다.");
				$("#memberForm #checkMemberId").val('Y');
			}
		},
		error : function(e) {
			console.log("ERROR : ", e);
		}
	});
}

// 닉네임 중복 체크
function checkDuplicationMemberNickname() {
	var memberNickname = $.trim($("#memberForm #memberNickname").val());

	if (memberNickname == "") {
		$('#memberForm #memberNickname').focus();
		dialogAlert("닉네임을 입력해 주세요.");
		return;
	}else if(memberNickname.length < 2){
		$('#memberForm #memberNickname').focus();
		dialogAlert('닉네임은 2자 이상 입력해 주시기 바랍니다.');
		return false;
	}else{
	
		$.ajax({
		url : '/user/mypage/SelectNickNameDUplicateChk.json',
		type : 'POST',
		dataType : 'json',
		data : {
			'targetNickName' : memberNickname
		},
		success : function(data) {
			var result = data.resultCode;
			if(result == "CM001"){
				$("#memberForm #checkMemberNickname").val('Y');
			}else{
				$("#memberForm #checkMemberNickname").val('N');
			}
			dialogAlert(fnNickNameResultCodeMessage(result));
		}
		,error : function () {
			$("#memberForm #checkMemberNickname").val('N');
			dialogAlert(fnNickNameResultCodeMessage());
		}
	});
	}
}


//닉네임 관련 메시지 코드 처리.
function fnNickNameResultCodeMessage(code){
	var message = "return massage";
	
	switch (code) {
	case "CM000": message = "닉네임 중복체크를 해주세요.";
		break;
	case "CM001": message = "사용 가능한 닉네임 입니다.";
		break;
	case "CM002": message = "이미 사용중인 닉네임입니다.\n다른 닉네임을 입력해주세요.";
		break;
	case "CM003": message = "닉네임 변경이 완료 되었습니다.";
		break;
	case "CM004": message = "사용할 수 없는 닉네임 입니다.";
		break;
	default: message = "처리 중 오류가 발생하였습니다.";
		break;
	}
	
	return message;
}

// 학교 찾기
function searchMemberSchoolList() {
	var schoolName = $.trim($("#dialogSearchSchool #schoolName").val());

	if (schoolName == "") {
		$("#dialogSearchSchool #schoolName").focus();
		dialogNoDimAlert("학교명을 입력해 주세요.");
		return;
	}

	$.ajax({
		url : '/user/login/searchMemberSchoolList.json',
		type : 'POST',
		dataType : 'json',
		data : {
			'schoolName' : schoolName
		},
		success : function(result) {
			console.log(result);
			var resultList = result.resultList;
			var sHTML = '';
			if(resultList.length > 0){
				for(var i = 0 ; i < resultList.length ; i++) {
					var sido = resultList[i].sido;
					if(sido == undefined || sido == "undefined") {
						sido = "";
					}
					var gugun = resultList[i].gugun;
					if(gugun == undefined || gugun == "undefined") {
						gugun = "";
					}
					var address1 = resultList[i].address1;
					if(address1 == undefined || address1 == "undefined") {
						address1 = "";
					}
					var address2 = resultList[i].address2;
					if(address2 == undefined || address2 == "undefined") {
						address2 = "";
					}
					
					var school = sido + "&nbsp;" + gugun + "&nbsp;" + resultList[i].schoolName;
					var post =  resultList[i].post1 + "-" + resultList[i].post2;
					var school_address = school + post;
					sHTML += '<li><a href="javascript:inputSchoolSearchInfo(\'' + sido + '\',\'' + gugun +'\',\'' +  resultList[i].schoolName +'\',\'' +  resultList[i].post1 +'\',\'' +  resultList[i].post2 +'\',\'' + address1 +'\',\'' + address2 +'\',\'' +  resultList[i].scIdx +'\',\'' +  resultList[i].tel1 +'\',\'' +  resultList[i].tel2 +'\',\'' +  resultList[i].tel3 +'\' ,\'' +  resultList[i].scIdx +'\')">' + school_address + '</a></li>';
				}
			} else {
				sHTML += '<li><span>검색 결과가 없습니다</span></li>'
			}
			$("#dialogSearchSchool #searchList").html(sHTML);
		},
		error : function(e) {
			console.log("ERROR : ", e);
		}
	});
}

// 학교 정보 입력
function inputSchoolSearchInfo(sido,gugun,schoolName,post1,post2,addr1,addr2,idx,tel1,tel2,tel3,scIdx){
	$("#memberForm #schoolInfo1").val(sido);
	$("#memberForm #schoolInfo2").val(gugun);
	$("#memberForm #schoolInfo3").val(schoolName);
	$("#memberForm #schoolNo").val(scIdx);
	if(typeof post1 == "undefined") {
		post1 = "";
	}
	if(typeof post2 == "undefined") {
		post2 = "";
	}
	
	var post = post1;
	if(post2 != ""){
		post += '-' + post2;	
	}
	$("#memberForm #schoolPost").val(post);
	$("#memberForm #schoolAddr1").val(addr1);
	if(typeof addr2 == "undefined") {
		addr2 = "";
	}
	$("#memberForm #schoolAddr2").val(addr2);
	$("#memberForm #schoolNo").val(idx);
	if(typeof tel1 == "undefined") {
		tel1 = "";
	}
	if(typeof tel2 == "undefined") {
		tel2 = "";
	}
	if(typeof tel3 == "undefined") {
		tel3 = "";
	}
	$("#memberForm #schoolTel1").val(tel1);
	$("#memberForm #schoolTel2").val(tel2);
	$("#memberForm #schoolTel3").val(tel3);
	$("#memberForm #n_schoolNo").val(scIdx);
	
	$("#dialogSearchSchool").dialog("close");
}

//배너 팝업링크시 사용
function fnNewPopup(url, popupWidth, popupHeight, popupTop, popupLeft) {
	window.open(url,'thinkerBell','width='+ popupWidth +', height='+ popupHeight +', top='+ popupTop +', left='+ popupLeft +', scrollbars=1');
}

//파일 다운로드
function fnDownload(real, save, path){
	
	var $formSubject = $('<form></form>');
	$formSubject.attr('id', 'fileForm');
	$formSubject.attr('method', 'post');
	//가상폼 생성 end--------------------------------
	var common_realfile = $("<input type=\"hidden\" id=\"common_realfile\" name=\"common_realfile\" value=\""+real+"\"/>");
	var common_savefile = $("<input type=\"hidden\" id=\"common_savefile\" name=\"common_savefile\" value=\""+save+"\"/>");
	var common_filepath = $("<input type=\"hidden\" id=\"common_filepath\" name=\"common_filepath\" value=\""+path+"\"/>");
	
	$formSubject.attr('action', "/common/CommonFileDownload.do");
	$formSubject.attr('target', "_self");
	$formSubject.append(common_realfile).append(common_savefile).append(common_filepath);
	$(".header").append($formSubject);
	$formSubject.submit();
}

//배너 클릭 로그
function bannerClickCnt(seq){
	$.ajax({
		url : '/common/bannerClickCnt.json',
		type : 'POST',
		data: {"bannerSeq" : seq},
		dataType : "json",
		success : function(data) {
			var result = data.resultCode = "Ex001";
			if( result == "Ex001"){
				console.log("성공");
			}else{
				console.log("실패");
			}
		}
	});
}

//제안 문의 팝업
function fnSuggestion(loc){
	var sessionChk = $("#suggestionModal").find("#sessionChk").val();
	
	if(sessionChk == "N"){
		$("#noLoginSuggestionModal").dialog({
			autoOpen: false,
			resizable: false,
			width: '940px',
			open:function(){
				$('.dim').show();
			},
			close:function(){
				$("#noLoginSuggestionForm")[0].reset();
				$('.dim').hide();
			},
			buttons: {
				"확인": {
					click: function () {
						fnNologinSuggestionSave();
                    },
                    text: '확인',
                    class: 'btn-38 spot'
				},
				"취소": {
					click: function () {
                        $(this).dialog("close");
                    },
                    text: '취소',
                    class: 'btn-38'
				}
			}
		}).dialog("open");
	}else{
		$("#suggestionModal").dialog({
			autoOpen: false,
			resizable: false,
			width: '940px',
			open:function(){
				$('.dim').show();
			},
			close:function(){
				$("#suggestionModal").find(".suggestionFileName").val("");
				$("#suggestionModal").find(".suggestionFileUpload").replaceWith( $("#suggestionModal").find(".suggestionFileUpload").clone(true) );
				$('.dim').hide();
			},
			buttons: {
				"확인": {
					click: function () {
						fnSuggestionSave(loc);
	                },
	                text: '확인',
	                class: 'btn-38 spot'
				},
				"취소": {
					click: function () {
						
	                    $(this).dialog("close");
	                },
	                text: '취소',
	                class: 'btn-38'
				}
			}
		}).dialog("open");
	}
}

//제안, 문의 첨부파일 등록
function fnSuggestionFile(buttonObj) {
	var tempTarget = $(buttonObj).closest("div.file-box"); 
	
	var regExp = /(.ade|.adp|.bat|.chm|.cmd|.com|.cpl|.dll|.dmg|.exe|.hta|.ins|.isp|.jar|.js|.jse|.lib|.lnk|.mde|.msc|.msi|.msp|.mst|.nsh|.pif|.scr|.sct|.shb|.sys|.vb|.vbe|.vbs|.vxd|.wsc|.wsf|.wsh)$/i;
	var fileSize = Math.round(($(tempTarget).find(".suggestionFileUpload").get(0).files[0].size/1024));
	//현재 첨부되어있는 파일들의 파일명 배열설정
	 var fileTitle = $(tempTarget).find(".suggestionFileUpload").get(0).files[0].name

	
	
	if($(tempTarget).find(".suggestionFileUpload").get(0).files[0] != undefined && $(tempTarget).find(".suggestionFileUpload").get(0).files[0] != null){
		if (fileSize > 10240) {
			dialogAlert("파일 크기는 최대 10MB 까지 가능합니다.");
				$(tempTarget).find(".suggestionFileUpload").replaceWith( $(tempTarget).find(".suggestionFileUpload").clone(true) );
		        return false;
		    }else if(regExp.test(fileTitle)){
		    	dialogAlert("본 파일은 업로드가 불가합니다.");
		    	$(tempTarget).find(".suggestionFileUpload").replaceWith( $(tempTarget).find(".suggestionFileUpload").clone(true) );
		    	return false;
		    }else{
		    	$(tempTarget).find(".suggestionFileName").val(fileTitle);
		    }
	}else{
		$(tempTarget).find(".suggestionFileUpload").replaceWith( $(tempTarget).find(".suggestionFileUpload").clone(true) );
	}
}

//제안 문의 등록(로그인시)
function fnSuggestionSave(loc) {

	if($("#suggestionSubject").val() == ""){
		dialogAlert("제목을 입력해주세요.");
		$("#suggestionSubject").focus();
		return false;
	}else if($("#suggestionContent").val() == ""){
		dialogAlert("내용을 입력해주세요.");
		$("#suggestionContent").focus();
		return false;
	}else{
		var formData = new FormData();
		if($("#suggestionModal").find(".suggestionFileUpload").get(0).files[0] != undefined){
			formData.append("uploadfile",$("#suggestionModal").find(".suggestionFileUpload")[0].files[0]);
		}
		 formData.append("title",$("#suggestionSubject").val());
		 formData.append("content",$("#suggestionContent").val());
		 if(loc == "footer"){
			 formData.append("location","footer");
		 }
		
		$.ajax({
			url : '/user/support/insertSuggestion.json',
			type : 'POST',
			dataType : 'json',
			processData: false,
          contentType: false,
			data : formData,
			success : function(result) {
				var resultCode = result.resultCode;
				
				if(resultCode == "Ex001"){
					dialogAlert("접수 되었습니다.");
					$("#suggestionModal").find("#suggestionSubject").val(''); 
					$("#suggestionModal").find("#suggestionContent").val('');
					$("#suggestionModal").dialog("close");
				}else if(resultCode == "NO_SESSION_MID"){
					dialogAlertWithUrl("로그인 정보를 찾을수 없습니다.", "/user/login/loginTeacherForm.do");
				}else{
					dialogAlert("접수에 실패 하였습니다.");
					return false;
				}
			}
		});
	}
	
}

//제안 문의 등록(비로그인시)
function fnNologinSuggestionSave() {
	var emailRule = /^[0-9a-zA-Z][0-9a-zA-Z\_\-\.\+]+[0-9a-zA-Z]@[0-9a-zA-Z][0-9a-zA-Z\_\-]*[0-9a-zA-Z](\.[a-zA-Z]{2,6}){1,2}$/;
	var tempEmail = $("#email1").val() + '@' + $("#email2").val();

	if($("#memName").val() == ""){
		$("#memName").focus();
		fnNologinSuggestionAlert("이름을 입력해 주세요.");
		return false;
	}else if($("#email1").val() == "" || $("#email2").val() == ""){
		fnNologinSuggestionAlert("이메일을 입력해주세요.");
		return false;
	}else if(!emailRule.test(tempEmail)){
		fnNologinSuggestionAlert("유효하지 않은 이메일 주소입니다. \n 다시 입력해주세요.");
		return false;
	}else if($("#subject").val() == ""){
		$("#subject").focus();
		fnNologinSuggestionAlert("제목을 입력해주세요.");
		return false;
	}else if($("#content").val() == ""){
		$("#content").focus();
		fnNologinSuggestionAlert("내용을 입력해주세요.");
		return false;
	}else if(!$("input:checkbox[id='agreeChk']").is(":checked")){
		fnNologinSuggestionAlert("개인정보 수집 및 이용에 동의해 주세요.");
		return false;
	}else{
		var formData = new FormData();
		
		if($("#noLoginSuggestionModal").find(".suggestionFileUpload").get(0).files[0] != undefined){
			formData.append("uploadfile",$("#noLoginSuggestionModal").find(".suggestionFileUpload")[0].files[0]);
		}
		formData.append("memName",$("#memName").val());
		formData.append("memType",$("input[name=memType]:checked").val());
		formData.append("memTypeName",$("#memTypeName").val());
		formData.append("memEmail",$("#email1").val() + '@' + $("#email2").val());
		formData.append("memTel",$("#tel1").val() + '-' + $("#tel2").val() + '-' + $("#tel3").val());
		formData.append("subject",$("#subject").val());
		formData.append("comment",$("#content").val());
		
		$.ajax({
			url : '/user/support/insertNologinSuggestion.json',
			type : 'POST',
			dataType : 'json',
			processData: false,
          contentType: false,
			data : formData,
			success : function(result) {
				var resultCode = result.resultCode;
				if(resultCode == "Ex001"){
					$("#noLoginSuggestionForm")[0].reset();
					$("#noLoginSuggestionModal").dialog("close");
					dialogAlert("접수 되었습니다.");
				}else{
					dialogAlert("접수에 실패 하였습니다.");
					return false;
				}
			}
		});
	}
	
}

function fnNologinSuggestionAlert(text){
	$("#dialogAlert p strong").text(text);
	$("#dialogAlert").dialog({
		autoOpen: false,
		width: '470px',
		resizable: false,
		buttons: {
			Ok: {
				click: function () {
					$(this).dialog("close");
                },
                text: '확인',
                class: 'btn-38 spot'
			}
		}
	}).dialog("open");
}


//팝업
function makeWin(url, winname, width, height, scrolltype){

	xposition=0; yposition=0;
	
	if (parseInt(navigator.appVersion) >= 4){
		xposition = (screen.width - width) / 2;
		yposition = (screen.height - height) / 2;
	}
	
	if (scrolltype == undefined){
		scrolltype = "0";
	}
 
	args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=0,"
		+ "scrollbars=" + scrolltype + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
		+ "screenx=" + xposition + ","  //NN Only
		+ "screeny=" + yposition + ","  //NN Only
		+ "left=" + xposition + ","     //IE Only
		+ "top=" + yposition;           //IE Only

	var newWin=window.open(url,winname,args);
	newWin.focus();
}
function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
}

function fnMoveCertification(){
	location.href = "/user/support/certification.do";
}


// 미동의 회원 삭제 
function deleteDisagreeMember(memberId){
	var data = {
		'memberId' : memberId
	};
	
	$.ajax({
		url : '/user/login/deleteDisagreeMember.json',
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(result) {
			console.log(result);
			location.href = "/user/login/logout.do";
		}
	});
}

// 플레이 모드 선택 모달
function dialogPlayMode(quizIdx, buttonObj){
	var teacherId = $("#teacherId").val();
	var listId = $(buttonObj).parents("ul.item-list").attr("id");
	// 버튼에 실행함수 설정
	$("#dialogPlayMode #onlineBtn").attr("onclick","playQuizContent('"+quizIdx+"', 'ONLINE')");
	$("#dialogPlayMode #offlineBtn").attr("onclick","playQuizContent('"+quizIdx+"', 'OFFLINE')");
	if(teacherId == "" || teacherId == "nologin"){
		$("#dialogPlayMode #homeworkBtn").attr("onclick","dialogAlert('로그인 회원만 이용 가능합니다.')");
	} else {
		$("#dialogPlayMode #homeworkBtn").attr("onclick","dialogHomework('"+quizIdx+"', '"+listId+"')");
	}
	$("#dialogPlayMode #challengeBtn").attr("onclick","goChallenge('"+quizIdx+"')");
	
	// 플레이 모드 선택 다이얼로그
	$("#dialogPlayMode").dialog("open");
	/*$("#dialogPlayMode").dialog({
		autoOpen: false,
		resizable: false,
		width: '640px',
		open:function(){
			$('.dim').show();
		},
		close:function(){
			$('.dim').hide();
		}
	}).dialog("open");*/
}

// 과제모드 생성 모달
function dialogMakeHomework(quizIdx, listId){
	$("#dialogPlayMode").dialog("close");
	if($('.dim').css("display") == "none"){
		$('.dim').show();
	}
	
	// console.log("listId: " + listId);
	var quizCategory = quizCategory =  $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").data("quiz-category");
	// 토의토론은 보너스 점수 비활성화
	if(quizCategory == "DEBATE"){
		$("#bonusYnDiv").hide();
		$("#showRankingYnDiv").hide();
		$("#questionShuffleYnDiv").hide();
		$("#answerShuffleYnDiv").hide();
		$("#flashCardYnDiv").hide();
	} else {
		$("#bonusYnDiv").show();
		$("#showRankingYnDiv").show();
		$("#questionShuffleYnDiv").show();
		$("#answerShuffleYnDiv").show();
		$("#flashCardYnDiv").show();
	}
	// 옵션 초기화
	$("#dialogHomework input[name='timerYn'][value='Y']").click();
	$("#dialogHomework input[name='bonusYn'][value='Y']").click();
//	$("#dialogHomework input[name='showRankingYn'][value='Y']").click();
	$("#dialogHomework input[name='showRankingYn'][value='N']").click();
	$("#dialogHomework input[name='questionShuffleYn'][value='N']").click();
	$("#dialogHomework input[name='answerShuffleYn'][value='N']").click();
	$("#dialogHomework input[name='flashCardYn'][value='N']").click();
	$("#dialogHomework select[name='nicknameInfoCd'] option:eq(0)").prop("selected", true);
	$("#dialogHomework select[name='nicknameInfoCd']").selectmenu("refresh");
	$("#dialogHomework input[name='nicknameInfoText']").val("").hide();
	
//	console.log("quizCategory: " + quizCategory);
	
	$("#dialogHomework").dialog({
		autoOpen: false,
		resizable: false,
		width: '600px',
		open:function(){
			$(this).find('input.datepicker').blur();

			$('.dim').show();
			
			// 종료일 설정
			var today = new Date();
			var todayYMD = getDateFormatYMD(today, ".");
		    var year = today.getFullYear();
		    var month = today.getMonth() + 1;
		    var date = today.getDate();
			var dateEnd = new Date(year, (month-1), date+2);
			var dateEndYMD = getDateFormatYMD(dateEnd, ".");
			
			$('#dialogHomework #hwEndDay').val(dateEndYMD);
			
			// 시간 설정. 현재 시 + 1
			var nowHour = today.getHours() + 1;
//			console.log(nowHour);
			$("#hwEndTime option[data-hour='"+nowHour+"']").prop("selected",true);
			$("#hwEndTime").selectmenu("refresh");
			
			// datepicker
			$('#dialogHomework #hwEndDay').datepicker({
				dateFormat: 'yy.mm.dd'
				,minDate: 0
				,maxDate: 28
				,monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
			    ,monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
				,yearSuffix: '년'
			}).on("change", function(e){
//				console.log(e);
				var selectedDay = $('#dialogHomework #hwEndDay').val();
//				console.log(todayYMD);
//				console.log(selectedDay);
//				console.log(nowHour);
				if(todayYMD == selectedDay){ // 마감일이 오늘일 경우 현재 시간보다 작은 시간 disable
					var intNowHour = parseInt(nowHour);
					$("#hwEndTime option").each(function(e){
						var optionHour = $(this).data("hour");
//						console.log(hour);
						if(optionHour < intNowHour){
							$(this).prop("disabled",true);
						} else {
							$(this).prop("disabled",false);
						}
						
					});
					$("#hwEndTime").selectmenu("refresh");
				} else {
					$("#hwEndTime option").prop("disabled",false);
					$("#hwEndTime").selectmenu("refresh");
				}
			});
			
		},
		close:function(){
			if(!$(".fullpage-modal").is(':visible')){
				$('.dim').hide();
			}
			$('.datepicker').datepicker('destroy');
		},
		buttons: {
			Ok: {
				click: function () {
					makeHomework(quizIdx, listId);
                },
                text: '과제 생성',
                class: 'btn-38 spot'
			}
		}
	}).dialog("open");
}

// 과제 생성
function makeHomework(quizIdx, listId){
	var hwEndDay = $("#hwEndDay").val();
	var hwEndTime = $("#hwEndTime").val();
	var endDate = replaceAll(hwEndDay, ".","-") + " " + hwEndTime;
	var timerYn = $("#dialogHomework input[name='timerYn']:checked").val();
	var bonusYn = $("#dialogHomework input[name='bonusYn']:checked").val();
	var showRankingYn = $("#dialogHomework input[name='showRankingYn']:checked").val();
	var questionShuffleYn = $("#dialogHomework input[name='questionShuffleYn']:checked").val();
	var answerShuffleYn = $("#dialogHomework input[name='answerShuffleYn']:checked").val();
	var nicknameInfoCd = $("#dialogHomework select[name='nicknameInfoCd']").val();
	var nicknameInfoText = $.trim($("#dialogHomework input[name='nicknameInfoText']").val());
	var flashCardYn = $("#dialogHomework input[name='flashCardYn']:checked").val();
		
	if(nicknameInfoCd == "CUSTOM" && nicknameInfoText == ""){
		$("#dialogHomework #nicknameError").text("닉네임 안내 문구를 입력하세요.").show();
		$("#dialogHomework input[name='nicknameInfoText']").focus();
	} else {
		var data = {
			'quizIdx' : quizIdx
			,'endDate' : endDate
			,'timerYn' : timerYn
			,'bonusYn' : bonusYn
			,'showRankingYn' : showRankingYn
			,'questionShuffleYn' : questionShuffleYn
			,'answerShuffleYn' : answerShuffleYn
			,'nicknameInfoCd' : nicknameInfoCd
			,'nicknameInfoText' : nicknameInfoText
			,'flashCardYn' : flashCardYn
		};
		console.log(data);
		
		$.ajax({
			url : '/user/content/insertQuizHomework.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				console.log(result);
				if(result.success){
					// 모달 닫기
					$("#dialogHomework").dialog("close");
					$('#dialogHomework .datepicker').datepicker('destroy');
					
					// 과제 공유 모달
					shareHomework(quizIdx, listId, result.paramMap.pinNumber, result.paramMap.startDateFmt, result.paramMap.endDateFmt);
				}
			}
		});
	}
}

//과제모드 수정 모달
function dialogEditHomework(){
	if($('.dim').css("display") == "none"){
		$('.dim').show();
	}
	
	// console.log("listId: " + listId);
	var roomKey = $("#searchForm input[name='roomKey']").val();
	var quizIdx = $("#searchForm input[name='quizIdx']").val();
	var quizCategory = $("#searchForm input[name='quizCategory']").val();
	// 토의토론은 보너스 점수 비활성화
	if(quizCategory == "DEBATE"){
		$("#bonusYnDiv").hide();
		$("#showRankingYnDiv").hide();
		$("#questionShuffleYnDiv").hide();
		$("#answerShuffleYnDiv").hide();
		$("#flashCardYnDiv").hide();
	} else {
		$("#bonusYnDiv").show();
		$("#showRankingYnDiv").show();
		$("#questionShuffleYnDiv").show();
		$("#answerShuffleYnDiv").show();
		$("#flashCardYnDiv").show();
	}
	// 옵션 값
	var timerYn = $("#pinInfoForm input[name='timerYn']").val();
	var bonusYn = $("#pinInfoForm input[name='bonusYn']").val();
	var showRankingYn = $("#pinInfoForm input[name='showRankingYn']").val();
	var questionShuffleYn = $("#pinInfoForm input[name='questionShuffleYn']").val();
	var answerShuffleYn = $("#pinInfoForm input[name='answerShuffleYn']").val();
	var flashCardYn = $("#pinInfoForm input[name='flashCardYn']").val();
	var nicknameInfoCd = $("#pinInfoForm input[name='nicknameInfoCd']").val();
	var nicknameInfoText = $("#pinInfoForm input[name='nicknameInfoText']").val();
	var hwEndDay = $("#pinInfoForm input[name='hwEndDay']").val();
//	var hwEndTime = $("#pinInfoForm input[name='hwEndTime']").val();
	var hwEndHour = parseInt($("#pinInfoForm input[name='hwEndTime']").val());
	
	// 옵션 초기화
	$("#dialogHomework input[name='timerYn'][value='"+timerYn+"']").click();
	$("#dialogHomework input[name='bonusYn'][value='"+bonusYn+"']").click();
	$("#dialogHomework input[name='showRankingYn'][value='"+showRankingYn+"']").click();
	$("#dialogHomework input[name='questionShuffleYn'][value='"+questionShuffleYn+"']").click();
	$("#dialogHomework input[name='answerShuffleYn'][value='"+answerShuffleYn+"']").click();
	$("#dialogHomework input[name='flashCardYn'][value='"+flashCardYn+"']").click();

	$("#dialogHomework select[name='nicknameInfoCd'] option[value='"+nicknameInfoCd+"']").prop("selected", true);
	$("#dialogHomework select[name='nicknameInfoCd']").selectmenu("refresh");
	
	if(nicknameInfoText == ""){
		$("#dialogHomework input[name='nicknameInfoText']").val("").hide();
	} else {
		$("#dialogHomework input[name='nicknameInfoText']").val(nicknameInfoText).show();
	}
	
	
//	console.log("quizCategory: " + quizCategory);
	
	$("#dialogHomework").dialog({
		autoOpen: false,
		resizable: false,
		width: '600px',
		open:function(){
			$(this).find('input.datepicker').blur();

			$('.dim').show();
			
			var today = new Date();
			var todayYMD = getDateFormatYMD(today, ".");
			
			// 종료일 설정
			$('#dialogHomework #hwEndDay').val(hwEndDay);
			
			// 시간 설정. 현재 시 + 1
			var nowHour = today.getHours() + 1;
			
			// 시간 설정
			$("#hwEndTime option[data-hour='"+hwEndHour+"']").prop("selected",true);
			$("#hwEndTime").selectmenu("refresh");
			
			// datepicker
			$('#dialogHomework #hwEndDay').datepicker({
				dateFormat: 'yy.mm.dd'
				,minDate: 0
				,maxDate: 28
				,monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
			    ,monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
				,yearSuffix: '년'
			}).on("change", function(e){
//				console.log(e);
				var selectedDay = $('#dialogHomework #hwEndDay').val();
//				console.log(todayYMD);
//				console.log(selectedDay);
//				console.log(nowHour);
				if(todayYMD == selectedDay){ // 마감일이 오늘일 경우 현재 시간보다 작은 시간 disable
					var intNowHour = parseInt(nowHour);
					$("#hwEndTime option").each(function(e){
						var optionHour = $(this).data("hour");
//						console.log(hour);
						if(optionHour < intNowHour){
							$(this).prop("disabled",true);
						} else {
							$(this).prop("disabled",false);
						}
						
					});
					$("#hwEndTime").selectmenu("refresh");
				} else {
					$("#hwEndTime option").prop("disabled",false);
					$("#hwEndTime").selectmenu("refresh");
				}
			});
			
		},
		close:function(){
			if(!$(".fullpage-modal").is(':visible')){
				$('.dim').hide();
			}
			$('.datepicker').datepicker('destroy');
		},
		buttons: {
			Ok: {
				click: function () {
					editHomeworkOption(roomKey, quizIdx);
                },
                text: '과제 수정',
                class: 'btn-38 spot'
			}
		}
	}).dialog("open");
}

// 과제 옵션 수정
function editHomeworkOption(roomKey, quizIdx){
	var hwEndDay = $("#hwEndDay").val();
	var hwEndTime = $("#hwEndTime").val();
	var endDate = replaceAll(hwEndDay, ".","-") + " " + hwEndTime;
	var timerYn = $("#dialogHomework input[name='timerYn']:checked").val();
	var bonusYn = $("#dialogHomework input[name='bonusYn']:checked").val();
	var showRankingYn = $("#dialogHomework input[name='showRankingYn']:checked").val();
	var questionShuffleYn = $("#dialogHomework input[name='questionShuffleYn']:checked").val();
	var answerShuffleYn = $("#dialogHomework input[name='answerShuffleYn']:checked").val();
	var nicknameInfoCd = $("#dialogHomework select[name='nicknameInfoCd']").val();
	var nicknameInfoText = $.trim($("#dialogHomework input[name='nicknameInfoText']").val());
	var flashCardYn = $("#dialogHomework input[name='flashCardYn']:checked").val();
		
	if(nicknameInfoCd == "CUSTOM" && nicknameInfoText == ""){
		$("#dialogHomework #nicknameError").text("닉네임 안내 문구를 입력하세요.").show();
		$("#dialogHomework input[name='nicknameInfoText']").focus();
	} else {
		var data = {
			'roomKey' : roomKey
			,'quizIdx' : quizIdx
			,'endDate' : endDate
			,'timerYn' : timerYn
			,'bonusYn' : bonusYn
			,'showRankingYn' : showRankingYn
			,'questionShuffleYn' : questionShuffleYn
			,'answerShuffleYn' : answerShuffleYn
			,'nicknameInfoCd' : nicknameInfoCd
			,'nicknameInfoText' : nicknameInfoText
			,'flashCardYn' : flashCardYn
		};
//		console.log(data);
		
		$.ajax({
			url : '/user/content/updateQuizHomeworkOption.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				console.log(result);
				if(result.success){
					// 모달 닫기
					$("#dialogHomework").dialog("close");
					$('#dialogHomework .datepicker').datepicker('destroy');
//					location.reload();
					goReportDetail(roomKey, quizIdx);
				}
			}
		});
	}
}

// 과제 종료일 수정
function closeQuizHomework(){
	if(confirm("과제를 종료하시겠습니까?\n참여자는 더이상 기존 url로 띵커벨에 참여할 수 없습니다.")){
		var roomKey = $("#searchForm input[name='roomKey']").val();
		var quizIdx = $("#searchForm input[name='quizIdx']").val();
		var data = {
				'roomKey' : roomKey
				,'quizIdx' : quizIdx
		};
//		console.log(data);
		
		$.ajax({
			url : '/user/content/closeQuizHomework.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				console.log(result);
				if(result.success){
//					location.reload();
					fnSearch();
				}
			}
		});
	}
}

// 과제공유 모달
function shareHomework(quizIdx, listId, pinNumber, startDate, endDate){
	// 대상 모달
	var modalId = "dialogShareHomework";
	var $targetModal = $("#dialogShareHomework");
	
//	console.log(endDate);
	if($('.dim').css("display") == "none"){
		$('.dim').show();
	}
	
	// 과제 종료일 설정
	$targetModal.find("#endDate").text(endDate);
	
	// 공유 url
	var damainUrl = location.origin;
	var hostname = window.location.hostname;
	var url = getQuizViewUrl();
	url += '/student/index.do?pinNumber='+pinNumber;
	
	
//	$targetModal.find("#kakao").attr("onclick", "fnSnsShare('kakao', '"+modalId+"', '"+quizIdx+"', '"+listId+"')");
	$targetModal.find("#fb").attr("onclick", "fnSnsShare('fb', '"+modalId+"', '"+quizIdx+"', '"+listId+"')");
	$targetModal.find("#band").attr("onclick", "fnSnsShare('band', '"+modalId+"', '"+quizIdx+"', '"+listId+"')");
	$targetModal.find("#hiclass").attr("onclick", "fnHiclassShare('"+modalId+"', '"+pinNumber+"')");
	
	$targetModal.find("#copyUrl").val(url);
	$targetModal.find("#copyUrlBtn").attr("onclick", "copyToClipboard('"+url+"')");
	$targetModal.find("#copyPinNumber").val(pinNumber);
	$targetModal.find("#copyPinNumberBtn").attr("onclick", "copyToClipboard('"+pinNumber+"', 'PIN')");
	
	var shareUrl = $targetModal.find("#copyUrl").val();
	var shareTitle = $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".item-tit").text();
//	var shareImage = damainUrl + $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".quizImage").attr("src");
	var shareImage = damainUrl + $("#"+listId).find("li[data-quiz-idx='"+quizIdx+"']").find(".quizImage").attr("src");
	if(listId == "reportList"){ // 리포트 리스트 형식이 다름
		shareTitle = $("tr[data-pin-number='"+pinNumber+"']").find(".tit a").text();
		shareImage = damainUrl + $("tr[data-pin-number='"+pinNumber+"']").find("input[name='quizImage']").val();
	}
	shareTitle = "[과제] " + shareTitle;
	var shareDescription = "기간: " + startDate + " ~ " + endDate;
	console.log("shareTitle: " + shareTitle);
	console.log("shareDescription: " + shareDescription);
	console.log("shareImage: " + shareImage);
	
	// 과제 공유 팝업
	$targetModal.dialog({
		autoOpen: false,
		resizable: false,
		width: '580px',
		open:function(){
			$('.dim').show();
		},
		close:function(){
			if(!$(".fullpage-modal").is(':visible')){
				$('.dim').hide();
				Kakao.Link.cleanup(); // 카카오톡 버튼 설정 해제
			}
		},
		buttons: {
			Ok: {
				click: function () {
                    $(this).dialog("close");
                    // 리포트에서 공유 제외하고 리포트 페이지로 이동
                    if(listId != "reportList"){ 
                    	location.href = "/user/content/quizUserReportList.do";
                    }
                    Kakao.Link.cleanup(); // 카카오톡 버튼 설정 해제
                },
                text: '확인',
                class: 'btn-38 spot'
			}
		}
	}).dialog("open");
	
	/*// 하이클래스로 보내기 모달
	$( "#dialogSendToHiclass" ).dialog({
		autoOpen: false,
		resizable: false,
		width: '360px',
		open:function(){
			$('.inner-dim').show();
		},
		close:function(){
			$('.inner-dim').hide();
		},
		buttons: {
			"보내기": {
				click: function () {
//                    $(this).dialog("close");
//    				$('.inner-dim').hide();
    				fnCheckBeforeHiclassSubmit();
                },
                text: '보내기',
                class: 'btn-38 spot'
			},
			"취소": {
				click: function () {
                    $(this).dialog("close");
    				$('.inner-dim').hide();
                },
                text: '취소',
                class: 'btn-38'
			}
		}
	});*/
	
	// 카카오 버튼 설정
	Kakao.Link.createDefaultButton({
		container: '#dialogShareHomework #kakao',
		objectType : 'feed',
		content : {
			title : shareTitle,
			description : shareDescription,
			imageUrl : shareImage,
			link : {
				mobileWebUrl : shareUrl,
				webUrl : shareUrl
			}
		},
		buttons : [{
			title : '웹으로 보기',
			link : {
				mobileWebUrl : shareUrl,
				webUrl : shareUrl
			}
		}]
	});
}

// 과제 다시 보기
function reviewHomework(quizIdx, roomKey){
	var url = getQuizViewUrl();
//	url += '/teacher/reviewHomework.do?quizIdx='+quizIdx+'&roomKey='+roomKey;
	url += '/teacher/reviewHomework.do';
	console.log(url);
	
	console.log("url: " + url);
	
	var screenSizeWidth,screenSizeHeight;
    screenSizeWidth = screen.width ;  
    screenSizeHeight = screen.height;
    intWidth = screenSizeWidth;
    intHeight = screenSizeHeight;
    intXOffset = 0 ;
    intYOffset = 0 ;
	
	var $form = $("#quizPlayForm");
	$form.attr('action', url);
	$form.attr('method', 'post');
	$form.attr('target', 'reviewHomework');
	$form.find('#quizIdx').val(quizIdx);
	$form.find('#roomKey').val(roomKey);
	
	var quizViewer = window.open('', 'reviewHomework','height=' + screen.availHeight + ',width=' + screen.availWidth + 'fullscreen=yes,resizable=yes');
	
	$form.submit();
	
	quizViewer.resizeTo(intWidth, intHeight) ;
	quizViewer.moveTo(intXOffset, intYOffset);
	quizViewer.focus();
}

// 도전 모드로 이동
function goChallenge(quizIdx){
//	console.log($("#quizPlayForm").serialize());
	var teacherId = $("#quizPlayForm #teacherId").val();
	var url = getQuizViewUrl();
	url += '/student/solo/hallOfFame.do';
	url += '?quizIdx='+quizIdx+'&teacherId='+teacherId;
	
	var agent = navigator.userAgent.toLowerCase();

	var widthSize = 480;
/*	// IE 예외처리
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		widthSize = 1280;
	}*/
	
	var quizViewer = window.open(url, 'quizPlayChallenge','height=' + 800 + ',width=' + widthSize + 'fullscreen=no,resizable=yes, scrollbars=1');
	quizViewer.moveTo(100, 100);
	quizViewer.focus();	
	
	/*var $form = $("#quizPlayForm");
	$form.attr('action', url);
	$form.attr('method', 'post');
	$form.attr('target', 'quizPlayChallenge');
	$form.find('#quizIdx').val(quizIdx);
	
	
	quizViewer = window.open('', 'quizPlayChallenge','height=' + 800 + ',width=' + 480 + 'fullscreen=no,resizable=yes');
	quizViewer.moveTo(100, 100);
	quizViewer.focus();
	
	$form.submit();*/
}

//빈칸형 보기 텍스트 설정
function showBlankBoxResult(){
	$(".blank-preview-area").each(function(){
		var str = $(this).data("question-desc") + '';
		var strResult = '';
//		console.log(str);
//		console.log(str.length);
//			showBlankBox(str, $(this));

		for(var i=0;i<str.length;i++){	
			if(str.charAt(i) == ' ') { strResult += '<span class="space"></span>'; }
			else if(str.charAt(i) == '*') { strResult += '<span class="char spot"></span>'; }	
			else { strResult += '<span class="char">' + str.charAt(i) + '</span>'; }			
		}
//		console.log(strResult);
		$(this).html(strResult);
	});

}

// 플래쉬 카드
function flashCard(quizIdx){
	var teacherId = $("#quizPlayForm #teacherId").val();
	var url = getQuizViewUrl();
	url += '/student/flashCard/quizFlashCardStart.do';
	url += '?quizIdx='+quizIdx;
	
	var widthSize = 480;

	var quizViewer = window.open(url, 'quizPlayFlashCard','height=' + 800 + ',width=' + widthSize + 'fullscreen=no,resizable=yes, scrollbars=1');
	quizViewer.moveTo(100, 100);
	quizViewer.focus();	
}


