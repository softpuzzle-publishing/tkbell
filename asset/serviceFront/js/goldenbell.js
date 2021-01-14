/**
 * goldenbell.js
 */
var isLast = false;
var isTimerStart = false;
var isTimerOver = true;
var isQuestionEnd = false;
var isGoldenBellOver = false;
var isHintLoser = false;
$(document).ready(function(){
	$(".btn_viewQuiz").click(function(){
		var $popId = $(this).attr("data-popId");
		$($popId).fadeIn("fast");
	});

	$(".layerPopup_wrapBig2 .close").click(function(){
		$(this).closest(".layerPopup_wrapBig2").fadeOut("fast");
	});

	// 미리보기 열기
	$("#mainbtn_viewQuiz").click(function(){
		$("#layerPopup_wrapBig2").fadeIn("fast");
	});
	
	// 미리보기 열기
	$("#btn_viewQuiz").click(function(){
		$("#layerPopup_wrapBig2").fadeIn("fast");
		ResetTimer();
	});

	// 미리보기 닫기
	$(".layerPopup_wrapBig2 .close").click(function(){
		$("#layerPopup_wrapBig2").fadeOut("fast");
		fnTimerUseYN();
	});

	// 정답확인 열기
	$("#checkAnswer").click(function(){
		var dd = $("#shortAnswer_"+ Number(currentQuiz));
		dd.show();
		if(dd.find('audio').length > 0){
			dd.find('audio').get(0).play();
		}
		$("#pop1").fadeIn("fast");
		// 타이머 멈추기
		isQuestionEnd = true;
		ResetTimer();
	});
	
	// 다음 문제 이동
	$("#nextQuiz").click(function(){
		isQuestionEnd = false;
		// 힌트 버튼 숨기기
		if($("#viewHint"+ currentQuiz) != "undefined") {
			$("#viewHint"+ currentQuiz).css("display", "none");
		}
		
		// 버튼 처리
		$("#nextQuiz").css("display", "none");
		$("#checkAnswer").css("display", "block");

		// 다음 문제 보여주기
		$("#goldenbell_" + currentQuiz).css("display", "none");
		$("#quiz_pager_"+ currentQuiz).removeClass("current quiz_pager_hover");
		$("#quiz_pager_"+ currentQuiz).addClass("quiz_pager_hover");
		
		currentQuiz = currentQuiz + 1;
		$("#goldenbell_" + currentQuiz).css("display", "block");
		$("#quiz_pager_"+ currentQuiz).addClass("current quiz_pager_hover");
		
		// 문제 헤더 변경
		if($("#questionform_" + currentQuiz).val() == "A") {
			$("#quizType").html('');
			$("#quizType").append($('<span>',{class : "titleO"}));
			$("#quizType").append($('<span>',{class : "titlex"}));
			$("#quizType").append('문제');
		}else {
			$("#quizType").text("단답식");
		}

		// 힌트 버튼 보여주기
		if($("#viewHint"+ currentQuiz) != "undefined") {
			$("#viewHint"+ currentQuiz).css("display", "block");
		}
		
		// 타이머 사용 여부
		fnTimerUseYN();
	});

	// 골든벨 버튼 클릭 후 열기
	$(".btnIcon_goldenbell").click(function(){
		var $popId = $(this).attr("data-popId");
		$($popId).fadeIn("fast");
		isGoldenBellOver = true;
	});

	// 골든벨 화면 닫기
	$(".layerPopup_wrapBig .close").click(function(){
		$(this).closest(".layerPopup_wrapBig").fadeOut("fast");
	});

	// 전원탈락 버튼 열기
	$(".btn_omitEveryone").click(function(){
		var $popId = $(this).attr("data-popId");
		$($popId).fadeIn("fast");
		$($popId).find('audio').get(0).play();
		// 타이머 멈추기
		isQuestionEnd = true;
		ResetTimer();
	});

	// 전원탈락 닫기
	$("#allOut .close").click(function(){
		$(this).closest(".layerPopup_wrap").fadeOut("fast");
		//fnTimerUseYN();
	});
	
	// 패자부활전 보기
	$(".btn_loserMatch").click(function(){
		/*패자 부활전/전원 탈락/문제 미리 보기*/
		var $popId = $(this).attr("data-popId");
		$($popId).fadeIn("fast");
		// 타이머 멈추기
		isHintLoser = true;
		ResetTimer();
	});

	// 패자부활전 닫기
	$(".layerPopup_wrap2 .close").click(function(){
		$(this).closest(".layerPopup_wrap2").fadeOut("fast");
		isHintLoser = false;
		fnTimerUseYN();
	});

	// 힌트보기 닫기
	$("#pop2 .close").click(function(){
		$(this).closest(".layerPopup_wrap").fadeOut("fast");
		$("#hintContent_" + Number(currentQuiz)).hide();
		if(!isHintLoser){
			fnTimerUseYN();
		}
	});
	fnTimerUseYN();
});
	
$(window).resize(function(){
	var w = 1;
	var h = 1;

	w = $(window).width()/1171;
	h = $(window).height()/768;

	/*$(".goldenBell_wrap, .layerPopup_wrap, .layerPopup_wrap2, .layerPopup_wrapBig, .layerPopup_wrapBig2, .layerPopup_wrap3").css({
		transform:'scale('+ w +','+ h +')'
	});*/
});
	
	// scroll script
	(function($){
        $(window).on("load",function(){
            $(".mCustomScrollbar").mCustomScrollbar();
        });
    })(jQuery);
	
	// print
	function goPrint() {
		var mywindow = window.open('', 'my div', 'height=600,width=900,scrollbars=yes');
		var host = location.host;
		var css1= mywindow.document.createElement('link');
		css1.setAttribute('type','text/css');
		css1.setAttribute('rel','stylesheet');
		css1.setAttribute('href',"http://"+host+"/asset/serviceFront/css/goldenBell.css");
		
		var css2= mywindow.document.createElement('link');
		css2.setAttribute('type','text/css');
		css2.setAttribute('rel','stylesheet');
		css2.setAttribute('href',"http://"+host+"/asset/serviceFront/css/jquery.mCustomScrollbar.css");
		
		$('head',mywindow.document).get(0).appendChild(css1);
		$('head',mywindow.document).get(0).appendChild(css2);
		
		var str = '';
		str +='<body style="overflow:auto;">';
		str +=$("#layerPopup_wrapBig_forPrint").html();
		str +='</body></html>';
		
		$(mywindow.document.body).append($("#layerPopup_wrapBig_forPrint").html());
		
		setTimeout(function(){ 
			mywindow.document.close();
			mywindow.focus();
			mywindow.print();
			mywindow.close();
		}, 500);
		// IE >= 10에 필요
		 // necessary for IE >= 10
		return true;
	}
	
	// 타이머 사용 여부 체크
	function fnTimerUseYN() {
		
		if(timerUseYn != "N" && !isLast && !isTimerStart && !isQuestionEnd) {
			// 타이머 효과 사용 여부 확인
			$("#timer").css("display", "block");
			$("#timer").html($("#timeSecond").val());
			TimerStart();
		}
	}
	
	// 정답 보기
	function fnShowAnswer(num) {
		$("#shortAnswer_"+ Number(currentQuiz)).css("display", "none");
		$("#shortAnswer_"+ Number(num)).show();
		$("#answerClose").css("display", "none");
		$("#loseAnswerClose").css("display", "block");
		$("#pop1").fadeIn("fast");
		
		var dd = $("#shortAnswer_"+ Number(num));
		dd.show();
		if(dd.find('audio').length > 0){
			dd.find('audio').get(0).play();
		}
		// 타이머 멈추기
		ResetTimer();
	}
	
	// 패자부활전 힌트보기
	function fnShowHint(num) {
		$(".popup_paddingR").hide();
		$("#hintContent_" + Number(num)).show();
		$("#pop2").fadeIn("fast");
		// 타이머 멈추기
		ResetTimer();
	}
	
	// 정답 보기 닫기
	function fnAnswerClose() {
		
		$("#pop1").closest(".layerPopup_wrap").fadeOut("fast");
		$("#checkAnswer").hide();
		isLast = false;
		var totalCount = $(".quiz_pager > span").length;	// 총 갯수
		if(Number(currentQuiz) < Number(totalCount)) {
			$("#nextQuiz").show();
		}else {
			isLast = true;
			$("#callGoldenbell").show();
		}
		$("#shortAnswer_"+currentQuiz).hide();
		//fnTimerUseYN();
	}
	
	// 패자부활전 정답보기 닫기
	function fnLoseAnswerClose(num) {
		$("#pop1").closest(".layerPopup_wrap").fadeOut("fast");
		$("#shortAnswer_"+ Number(num)).hide();
		$("#answerClose").show();
		$("#loseAnswerClose").hide();
	}

	// 처음으로
	function fnGoHone() {
		var currentUrl = $(location).attr('href');
		if(currentUrl.indexOf('playGoldenbell.do') > -1){
			parent.document.location.href = $("#returnUrl").val();
		}else{
			parent.location.reload();
		}
	}
	
	// 타이머
	var time = 0;
	var movieTime = 0;
	var tid;
	var timerstop;
	function TimerStart(){ 
		isTimerStart = true;
		isTimerOver = false;
		if(!isGoldenBellOver){
			tid = setInterval('msg_time()',1000);
			time = time = $("#timeSecond").val();
		}
	};
	
	function ResetTimer(){
		isTimerStart = false;
		clearInterval(tid);
	}
	
	// 1초씩 count
	function msg_time() {
		 time--;
		 $("#timer").html(time);
		 if(time < 1) {
			 ResetTimer();
			 var date = new Date();
			 $("#timeout").show();
			 $('<div>',{	'class' : 'timer_timeover' }).css({
				 'background-image':'url(/asset/serviceFront/images/goldenbell/goldenbell_02_mo.gif?nocache='+date.getTime()+')'
			 }).appendTo($("#timeout"));
			 $("#timeout").find('audio').get(0).play();
			 movieTime = 2;
			 timerstop = setInterval('stop_timer()',1000);
			 isTimerOver = true;
		 }
	}
	
	// 타임아웃 동영상 재생 시간
	function stop_timer() {
		movieTime--;
		if(movieTime < 1) {
			isTimerStart = false;
			clearInterval(timerstop);
			$("#timeout").hide();
			$("#timeout .timer_timeover").remove();
		}
	}
	
	function goNext(num) {
		// 힌트 버튼 숨기기
		if($("#viewHint"+ num) != "undefined") {
			$("#viewHint"+ num).hide();
		}
		
		// 버튼 처리
		$("#nextQuiz").hide();
		$("#checkAnswer").show();

		// 다음 문제 보여주기
		$("#goldenbell_" + num).show();
		currentQuiz = currentQuiz + 1;
		$("#goldenbell_" + Number(num + 1)).show();
		$("#quiz_pager_" + Number(num + 1)).addClass("quiz_pager_hover");
		
		// 문제 헤더 변경
		if($("#questionform_" + Number(num + 1)).val() == "A") {
			$("#quizType").text("OX 문제");
		}else {
			$("#quizType").text("단답식");
		}
		
		// 힌트 버튼 보여주기
		if($("#viewHint" + Number(num + 1)) != "undefined") {
			$("#viewHint" + Number(num + 1)).show();
		}
	}