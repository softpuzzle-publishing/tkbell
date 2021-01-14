// onload
$(function() {
	// 선택 리포트 사용안함 
	$("#deletePlayQuizBtn").click(function(){
		var quizIdxArray = new Array();
		var roomKeyArray = new Array();
		$("input[type=checkbox][name=checkItem]:checked").each(function(e){
			var quizIdx = $(this).parents("tr").data("quiz-idx");
			var roomKey = $(this).parents("tr").data("room-key");
			if(typeof quizIdx != "undefined"){
				quizIdxArray.push(quizIdx);
			}
			if(typeof roomKey != "undefined"){
				roomKeyArray.push(roomKey);
			}
		});
		
		if(quizIdxArray.length == 1){
			quizIdxArray.push("");
			roomKeyArray.push("");
		}
		
		var data = {
				'quizIdxArray' : quizIdxArray
				,'roomKeyArray' : roomKeyArray
		};
		console.log(data);
		
		if($("input[type=checkbox][name=checkItem]:checked").length > 0){ // 삭제 실행
			if(confirm("선택하신 리포트를 삭제하시겠습니까?")){
				$.ajax({
					url : '/user/content/updatePlayQuizNotUseArray.json',
					type : 'POST',
					dataType : 'json',
					data : data,
					success : function(result) {
						console.log(result);
						if(result.success){
							var pageNo = $("#searchForm input[name=currentPageNo]").val();
							fnPageLink(pageNo);
						}
					},
					error: function(e){
						console.log("ERROR : ", e);
					}, 
					beforeSend: function() {
						loadingProgressOn();
					},
					complete: function() {
						loadingProgressOff();
					}
				});
			} 
		} else {
			alert("선택하신 항목이 없습니다.");
		}
	});
	
	// 제목 변경 다이얼 로그 세팅
	$("#dialogChangeReportTitle").dialog({
		autoOpen: false,
		width: '400px',
		resizable: false,
		buttons: {
			"변경": {
				click: function () {
					changeReportTitle();
				},
				text: '변경',
				class: 'btn-38 spot'
			},
			"취소": {
				click: function () {
					$(this).dialog("close");
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
	});
});

//입력 텍스트 길이 체크
$(document).on("keypress keyup change", "#reportTitle", function(e){
	var maxByte = $(this).data("max-byte");
	var inputByte = calByte.getByteLength( $(this).val() )
	var cutText = calByte.cutByteByLength( $(this).val(), maxByte);
	console.log("maxByte: " + maxByte);
	console.log("inputByte: " + inputByte);
	console.log("cutText: " + cutText);
	if(inputByte > maxByte){
		// 메시지 출력 
		$("#dialogChangeReportTitle #warnMsg").show();
		
		// 자른 텍스트값으로 변경
		$(this).val(cutText);
	}
});

//by 퍼블
//더보기 버튼 
function openFncPanel(obj){		
	$('.fnc-panel').fadeOut(100);
	$(obj).closest('.fnc-wrapper').find('.fnc-panel').fadeIn(100);
}

// 더보기 버튼 사라지게
$('html,body').on('click',function(e){
	if($(e.target).hasClass('ico-more')) { return; }
	$('.fnc-panel').fadeOut(100);
});

/* function */
// 엑셀 다운로드
function downloadExcelQuizStatistics(roomKey, pinNumber){
	loadingProgressOn();
	setInterval(function(){ loadingProgressOff(); } ,6000);
	var actionUrl = "/user/content/quizUserStatisticsExcel.do";
	var $form = $('<form></form>');
	$form.attr('action', actionUrl);
	$form.attr('method', 'post');
	$form.attr('target', '_self');
	$form.append('<input type="hidden" name="roomKey" value="' + roomKey + '">');
	$form.append('<input type="hidden" name="pinNumber" value="' + pinNumber + '">');
	$form.appendTo('body');
	$form.submit();
}

// 결과 리포트 사용안함 type: LIST, DETAIL
function deleteQuizStatistics(type, roomKey, quizIdx){
	
	if(confirm("삭제하시겠습니까?")){
		var data = {
			'roomKey' : roomKey
			,'quizIdx' : quizIdx
		};
		console.log(data);
		$.ajax({
			url : '/user/content/updatePlayQuizNotUse.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				console.log(result);
				if(result.success){
					if(type == "LIST") {
						var pageNo = $("#searchForm input[name=currentPageNo]").val();
						fnPageLink(pageNo);
					} else if(type == "DETAIL") {
						goReportList();
					}
				}
			},
			error: function(e){
				console.log("ERROR : ", e);
			}, 
			beforeSend: function() {
	        	loadingProgressOn();
	        },
	        complete: function() {
	        	loadingProgressOff();
	        }
		});
	}
}

// 과제 참여자 보기
function viewRankingHomeworkUrl(roomKey){
// 	console.log(roomKey);
	var url = getQuizViewUrl();
	url += '/student/solo/rankingHomeworkUrl.do?roomKey=' + roomKey;
// 	console.log(url);
	window.open(url, '_blank');
}

// 제목 변경 버튼 type: LIST, DETAIL
function dialogChangeReportTitle(type, target){
	var reportTitle, roomKey, quizIdx;
	if(type == "LIST") {
		var $targetRow = $(target).parents("tr");
		reportTitle = $targetRow.find(".reportTitle").text();
		roomKey = $targetRow.data("room-key");
		quizIdx = $targetRow.data("quiz-idx");
	} else if(type == "DETAIL") {
		reportTitle = $("#searchForm input[name='reportTitle']").val();
		roomKey = $("#searchForm input[name='roomKey']").val();
		quizIdx = $("#searchForm input[name='quizIdx']").val();
	}
// 	console.log($targetRow);
// 	console.log(roomKey);
// 	console.log(quizIdx);
// 	console.log(reportTitle);
	
	$("#reportTitleForm input[name='reportTitle']").val(reportTitle);
	$("#reportTitleForm input[name='roomKey']").val(roomKey);
	$("#reportTitleForm input[name='quizIdx']").val(quizIdx);
	
	$("#dialogChangeReportTitle").dialog("open");
}

// 리포트 제목 변경 
function changeReportTitle(){
	$("#reportTitleForm").ajaxForm({
        url: '/user/content/changeReportTitle.json',
    	type: 'post',
        dataType: 'json',
    	success: function(result){
    		console.log(result);
    		if(result.success){
				var pageNo = $("#searchForm input[name=currentPageNo]").val();
				fnPageLink(pageNo);
			}
	    },
	    error: function(e){
	    	console.log("ERROR : ", e);
	    }
    }).submit();
}

// 리포트 detail
function goReportDetail(roomKey, quizIdx){
	console.log("roomKey: " + roomKey);
	console.log("quizIdx: " + quizIdx);
	var pageNo = $("#searchForm input[name=currentPageNo]").val();
	var actionUrl = "/user/content/quizUserReportDetail.do";
	var $form = $('<form></form>');
	$form.attr('action', actionUrl);
	$form.attr('method', 'post');
	$form.attr('target', '_self');
	$form.append('<input type="hidden" name="roomKey" value="' + roomKey + '">');
	$form.append('<input type="hidden" name="quizIdx" value="' + quizIdx + '">');
	$form.append('<input type="hidden" name="pageNo" value="' + pageNo + '">');
	$form.appendTo('body');
	$form.submit();
}

// 리포트 list
function goReportList(){
	var actionUrl = "/user/content/quizUserReportList.do";
	var $form = $("#searchForm");
	$form.attr('action', actionUrl);
	$form.attr('method', 'post');
	$form.attr('target', '_self');
	$form.submit();
}

