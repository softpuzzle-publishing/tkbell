/**
 * 쌤튜브 js
 */
function recommContent(itemSeq, content_no, val, contentSeq) {
	var recomCnt = 0;	
	//중복 추천 방지
	var recommendContents = localStorage.getItem("recommendContent");
	
	var duplicated = false;
	if(recommendContents != undefined){
		recommendContents= recommendContents.split(",");
		for(var i in recommendContents){
			if(content_no == recommendContents[i]){
				duplicated = true;
			}
		}
	}
	
	if(duplicated){
		alert("이미 추천한 자료입니다.");
	}else{
		if ( !confirm("선택하신 콘텐츠를 추천하시겠습니까?")) {
			return;
		}
		
		 $.ajax({
			url			: "/include/recommendContent.json"
			,async		: false
			,type		: "POST"
			,dataType	: "json"
			,cache		: false
			,data		: {
				"content_no" : content_no
			}
			,success  : function(data) {
				recommendContents = recommendContents + "," + content_no;
				localStorage.setItem("recommendContent", recommendContents);
				var msg = data["msg"];
				alert(msg);
				recomCnt = parseInt(val) + 1;
				$("#content_li"+itemSeq+"_"+contentSeq+" .btn_like").html(recomCnt);
			}
		});			 
	}
}

function goMultiView(chasi,gubun,content_no,sort) {
	
	$("#content_no").val("");
	$("#content_no").val(content_no);			 
	$("#content_gubun").val("");
	$("#content_gubun").val(gubun);
	$("#sort").val("");
	$("#sort").val(sort);
	 
	var multiview = window.open("","multiview","height=" + screen.height + ",width=" + screen.width + "fullscreen=yes,resizable=1");
	
	$("#listForm").attr({
		action : "/multiview/main/mainPage.do",
		target : "multiview"
	}).submit();
	
	multiview.focus();
}	

function fnChasiDownload(real, save, path, location){
	real = encodeURI(real);
	$("#fileForm").attr({
		action 		: '/common/CommonFileDownload.do',
		target 		: '_self',
		callpost    : function() {
          	$("#common_realfile").val(real),
          	$("#common_savefile").val(save),
          	$("#common_filepath").val(path);
          	$("#currentLocation").val(location);
      	}
	}).submit();
	return;
}

// 차시에 new 버튼 표시 여부 체크
function fnCheckNewButton(code) {

	if(code == "NONSUB3217") {			// 츄츄서방님
		$(".toggle_list").each(function(index) {
			if(index == 1 || index == 3) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3211") {	// 고학년 놀이
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1 || index == 2) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3212") {	// 저학년 놀이
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1 || index == 2 || index == 3) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3213") {	// 놀이로 공부하기
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 5 || index == 6) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3219") {	// 교과 미술 활동(안은교)
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1 || index == 2 || index == 3 || index == 4) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3218") {	// 월별 미술활동(미미교실)
		$(".toggle_list").each(function(index) {
			/*$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");*/
			if(index == 4) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3216") { 	// 뉴스포츠(김양수)
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 5) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3221") { 	// 변형 구기 게임(김양수)
		$(".toggle_list").each(function(index) {
			if(index == 1 || index == 2 || index == 3 || index == 4) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3222") {	// 츄츄서방님 교실무용 시즌2
		$(".toggle_list").each(function(index) {
			if(index == 3) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3223") {	// 테마 미술 활동(미미교실)
		$(".toggle_list").each(function(index) {
			/*if(index == 0 || index == 1  || index == 2 || index == 3 || index == 4 || index == 5) {*/
			if(index == 2 || index == 3) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3224") {	// 북아트(곽지순X양순이)
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1  || index == 2 || index == 3) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3225") {	// 쉽게 떠먹는 미술(김보법)
		$(".toggle_list").each(function(index) {
			if(index == 0 || index == 1) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}else if(code == "NONSUB3227") {	// 쉽게 만나는 음악(한승모)
		$(".toggle_list").each(function(index) {
			if(index == 2 || index == 3 || index == 4 || index == 5) {
				$("#toggle_list_em_"+ (index + 1)).after("&nbsp;&nbsp;<new></new>");
			}
		});
	}
	
}

// 새창 링크 실행
function goProductUrl(linkURL) {
	window.open(linkURL, "_blank");
	return false;
}


// 의견 등록
function fnInsertOpinion(contentNo, parentSeq){// 콘텐츠번호, 총 댓글+답글 수, 차시안에 속한 컨텐츠 순서, 댓글 시퀀스(답글 입력시에만 사용)
	var confirmMent = "";
	var comment = "";
	var contentIndex = 0;
	
	if($.trim($('#memo_comment_'+contentNo).val()) == "" && parentSeq == "0"){
		alert("의견 내용을 입력하세요.");
		$('#memo_comment_'+contentNo).focus();
	}else if($.trim($('#re_comment'+parentSeq).val()) == "" && parentSeq != "0"){
		alert("답글 내용을 입력하세요.");
		$('#re_comment'+parentSeq).focus();
	}else{
		if(parentSeq == "0"){
			 confirmMent = "의견을 등록하시겠습니까?";
			 comment = $('#memo_comment_'+contentNo).val();
		}else{
			 confirmMent = "답글을 등록하시겠습니까?";
			 comment = $('#re_comment'+parentSeq).val();
			 $('#parentSeq').val(parentSeq);
		}
		
		
		if(confirm(confirmMent)){
			$('#content_no').val(contentNo);
			$('#memo_comment').val(comment);
			$("#stickerImgPath").val($('#memo_comment_'+contentNo).closest(".comment-box").find("#insertStickerImgPath").val())
			
			
			var options = $("#listForm").serialize() +"&codeTypeCd=NONSUB1005";
			
			$.ajax({
				type: "post",
				url: "/user/ssamtube/insertContentOpinion.json",
				data: options,
				dataType: "json",
				success: function(data) {
					if(data.returnCode == "S0000") {	// 성공
						if(parentSeq == "0"){
							alert("의견이 등록되었습니다.");
							$('#memo_comment_'+contentNo).val("");
						}else{
							alert("답변이 등록되었습니다.");
							 $('#re_comment'+parentSeq).val('');
							 //contentsIndex = $('#re_comment'+contentNo + "_" + idx).closest(".add_text").find("ul.repple_box").attr("id").replace("comment",''); //차시안에 속한 컨텐츠 순서
							 $('#parentSeq').val('');
						}
						
						//댓글 다시 조회
						//$("#comment"+ contentsIndex+" li").remove();
						var currentCnt = Number($("#toggle_reple_"+contentNo).data("commentcnt"));
						$("#toggle_reple_"+contentNo).data("commentcnt", (currentCnt+1));
						$("#toggle_reple_"+contentNo).html("의견남기기 " + (currentCnt+1));
						
						fnGetOpinionList(contentNo, 1);
						

					}else{
						alert("의견 등록에 실패하였습니다.");
						return false;
					}
				}
			});
		}
	}
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
			zero += '0';
	}
	return zero + n;
}

// 의견 삭제
function fnDeleteOpinion(memoSeq, parentSeq, contentNo, target){
	if(confirm("의견을 삭제하시겠습니까?")){
		
		$.ajax({
			type: "post",
			url: "/user/ssamtube/deleteContentOpinion.json",
			data: {'MemoSeq' : memoSeq, 'codeTypeCd':'NONSUB1005', 'content_no':contentNo, 'parentSeq':parentSeq},
			dataType: "json",
			success: function(data) {
				if(data.returnCode == "S0000") {	// 성공
					alert("의견이 삭제되었습니다.");
					var currentCnt = Number($("#toggle_reple_"+contentNo).data("commentcnt"));
					$("#toggle_reple_"+contentNo).data("commentcnt", (currentCnt-1));
					$("#toggle_reple_"+contentNo).html("의견남기기 " + (currentCnt-1));
					
					if(parentSeq != "0"){//답글
						$(target).closest("li").remove();
						if($("#comment-reply"+parentSeq).find("li").length == 0 && $("#mainComment_"+parentSeq).hasClass("delComment") ){
							 $("#mainComment_"+parentSeq).closest("li").remove();
						}
					}else{//원글
						if($("#comment-reply"+memoSeq).find("li").length == 0){
							 $("#mainComment_"+memoSeq).closest("li").remove();
						}else{
							$("#mainComment_"+memoSeq).addClass("delComment");
							$("#mainComment_"+memoSeq).find("p").text("삭제 된 글입니다.");
							$("#mainComment_"+memoSeq).find("button").remove();
							$("#mainComment_"+memoSeq).find(".comment-sticker").remove();
						} 
					}
				}else{
					alert("의견 삭제에 실패하였습니다.");
					return false;
				}
			}
		});
	}
}

// 의견 수정
function fnUpdateOpinion(memoSeq, contentNo, target) {
	if($.trim($('#update_comment'+memoSeq).val()) == ""){
		alert("의견 내용을 입력하세요.");
		$('#update_comment'+memoSeq).focus();
	}else{
		if(confirm("의견을 수정하시겠습니까?")){
			$('#content_no').val(contentNo);
			$('#MemoSeq').val(memoSeq);
			$('#memo_comment').val($('#update_comment'+memoSeq).val());
			$("#stickerImgPath").val($(target).closest("fieldset").find("#insertStickerImgPath").val())
			
			var options = $("#listForm").serialize() +"&codeTypeCd=NONSUB1005";
			var tempStickerPath = $(target).closest("fieldset").find("#insertStickerImgPath").val();
			$.ajax({
				type: "post",
				url: "/user/ssamtube/updateContentOpinion.json",
				data: options,
				dataType: "json",
				success: function(data) {
					if(data.returnCode == "S0000") {	// 성공
						alert("의견이 수정되었습니다.");
						
						$("#originComment_"+memoSeq).html($('#update_comment'+memoSeq).val().replace(/(\n|\r\n)/g, '<br/>'));
						$("#originSticker_"+memoSeq).remove();
						if(tempStickerPath != undefined && tempStickerPath != null && tempStickerPath != ""){
							
							var html = "<div class=\"comment-sticker originSticker\" id=\"originSticker_"+memoSeq+"\">";
								html +=		"<span class=\"sticker\">";
								html += 		"<img src=\""+tempStickerPath+"\">";
								html += 		"<input type='hidden' id='insertStickerImgPath' value='"+tempStickerPath+"'>";
								html +=		"</span>";
								html +=	"</div>";
								
								$("#originComment_"+memoSeq).after(html);
						}
						
						editFormMemo(target,memoSeq);
						
					}else{
						alert("의견 수정에 실패하였습니다.");
						return false;
					}
				}
			});
		}
	}
}

// 의견 수정 영역 보이기
function showEditOpinion(id) {
	
	if($("#commbodyEdit"+id).css("display") == "block"){
		$("#commbodyEdit"+id).css("display", "none");
	}else{
		$("#commbodyEdit"+id).css("display", "block");
	}
	
	
}

// 메뉴 이동
function fnGoSubMenu(code2DepthCd, highTypeCd) {
	
	$("#code2DepthCd").val(code2DepthCd);
	$("#highTypeCd").val(highTypeCd);
	
	$('#listForm').attr({
		action : '/user/ssamtube/nonsubjectContents.do',
		target : '_self',
	}).submit();
}

//답글 창 보이기
function RepReOpen(rep_re){
	if($('#' + rep_re).css("display") == "none"){
	    $('#' + rep_re).show();
	} else {
	    $('#' + rep_re).hide();
	}
}

//의견 리스트 조회
function fnGetOpinionList(contentNo, currentPageNo){// 더보기시 사용(maxSeq : 현재 댓글 최종 시퀀스 , commentCnt : 현재 댓글 총 갯수 )
	var sessionMlevel = $("#sessionMlevel").val();
	var sessionMid = $("#sessionMid").val();
	
	$.ajax({
		url			: "/user/ssamtube/getOpinionCommentList.json"
		,type : 'POST'
		,dataType : 'html'
		,data		: {'content_no' : contentNo , 'currentPageNo' : currentPageNo, 'codeTypeCd' : "NONSUB1005"}
		,success  : function(resultData) {
			
			var tempComment = $.parseHTML(resultData);
			var lastPageNo = Number($(tempComment)[5].value);
			
			if(currentPageNo > 1){
				tempComment = $(tempComment).find(".comment-ul").children("li");
				$("#post-comment-"+contentNo).find(".comment-ul").append(tempComment);
			}else{
				tempComment = $(tempComment).find(".post-comment-inner");
				$("#post-comment-"+contentNo).html(tempComment);
			}
			
			if(currentPageNo == lastPageNo){
				$(".paging_more").remove();
			}
			$("#post-comment-"+contentNo).show();
		}
		,beforeSend: function() {
        	$("i.more_arr").hide();
        	$("i.more_loading").show();
        }
        ,complete: function() {
        	$("i.more_arr").show();
        	$("i.more_loading").hide();
        }
	});
}



$(document).ready(function(){
	$('.sticker-panel-header').eaSlider();
	$(document).on('click','.sticker-toggle',function(){
		var clickTargetSection = $(this).closest("section").attr("id");
		$(this).toggleClass('active');
		$('.sticker-panel').css({top:$(this).offset().top - 150}).fadeToggle(300);
		$('.sticker-panel').attr("class", "sticker-panel");
		if($(this).parents('div').hasClass('comment-list')) {
			var stickerTarget = $(this).closest('.editForm').attr("id");
			$(".changeEvent").attr("onclick", "fnInsertSticker(this,'"+stickerTarget+"')");
			$('.sticker-panel').addClass(stickerTarget);
			$('.sticker-panel').css({right:'25px'});
		} else {
			$('.sticker-panel').css({right:0});
			$('.sticker-panel').addClass(clickTargetSection);
			$(".changeEvent").attr("onclick", "fnInsertSticker(this,'"+clickTargetSection+"')");
		}
	});
	
	$(document).on('click',function() { 
		$('.sticker-panel').fadeOut(300);
		$('.sticker-toggle').removeClass('active');
	});
	$(document).on('click','.sticker-panel, .sticker-toggle',function(e){ 
		e.preventDefault();
		e.stopPropagation();
	});
	
	$(document).on("click", ".reply-toggle",function(e){
		var tempSeq = $(this).data("commentseq");
		extendRepple(this, tempSeq);
		
	});
});




function plusRecommend(Seq) {
	if(confirm("해당글을 추천 하시겠습니까?")){
		$('#no').val(Seq);
		$('#viewForm').attr({
			action : '/user/custom/iDear/iDear_toctoc_plusRecommend.do',
			target : '_self'
		}).submit();
	}
}

function plusRecommendJson(Seq,obj) {
	if(confirm("해당글을 추천 하시겠습니까?")){
		$('#no').val(Seq);
		var tagObj = obj;
		var FormData = $('#viewForm').serialize();
		$.ajax({
			url : '/user/custom/iDear/iDear_toctoc_plusRecommend.json',
			async : false,
			type : 'POST',
			dataType : 'json',
			data : FormData,
			success : function(data) {
				alert(data.msg);
				if(data.status == "S"){
					tagObj.text = Number(tagObj.text) + 1	
				}
			}
		});
	}
}


function extendRepple(target, commentSeq){
	$(target).toggleClass('on');
	$("#repleForm_"+commentSeq).slideToggle('fast');
}


//댓글 상용구 및 스티커 
function fnThankyouLike(num, el) {
	var tempTarget = $(el).closest("section").attr("id");
	
	$(el).closest(".comment-box").find('#comment-stickerInsert').empty();
	$(el).closest(".comment-box").find('#InsertedSticker').remove();
	
	
	$(".changeEvent").attr("onclick", "fnInsertSticker(this,'"+tempTarget+"')");
	$('#hiddenStickerImg_'+num).trigger("click");
	if (num == 1) {
		$(el).closest(".comment-box").find('textarea').val($('#Thankyou').val()); 
		$('.stickerMsg').attr('class','stickerMsg');
		$(el).attr('class','stickerMsg active');
	}else if (num == 2) {
		$(el).closest(".comment-box").find('textarea').val($('#Like').val());
		$('.stickerMsg').attr('class','stickerMsg');
        $(el).attr('class','stickerMsg active');
	}else if (num == 3) {
		$(el).closest(".comment-box").find('textarea').val($('#sympathy').val());
		$('.stickerMsg').attr('class','stickerMsg');
        $(el).attr('class','stickerMsg active');
	}else if (num == 4) {
		$(el).closest(".comment-box").find('textarea').val($('#funny').val());
		$('.stickerMsg').attr('class','stickerMsg');
        $(el).attr('class','stickerMsg active');
	}
}

//댓글 입력란에 스티커 집어넣기
function fnInsertSticker(el, target) {
	var imgPath = $(el).val();
	var stickerLen = null;
	if(target.indexOf("post-comment") != -1){
		stickerLen = $("#"+target).find("fieldset").first().find("input[id=insertStickerImgPath]").length;
	}else{
		stickerLen =  $('#'+target+' .comment-sticker').find('span').length;
	}
	
	if (stickerLen > 0) {
		alert("스티커와 이미지는 각각 1개씩 등록 가능 합니다.");
	}else{
		fnInsertImgSticker(imgPath, target);
	}
}


//스티커, 이미지 삭제
function fnDeleteImgSticker(el) {
	$(el).closest("span").remove();
}

//스티커,이미지 집어넣기
function fnInsertImgSticker(imgPath, target) {
	var str = "<span class='sticker' id='InsertedSticker'>"
		str += 	"<img src='"+imgPath+"' />"
		str += 	"<button type='button' class='remove' onclick='fnDeleteImgSticker(this);'><span>삭제</span></button>";
      	str += 	"<input type='hidden' id='insertStickerImgPath' value='"+imgPath+"'>";
      	str +="</span>";
	 
      	if(target.indexOf("post-comment") != -1){
      		$("#"+target).find("fieldset").first().find("#comment-stickerInsert").append(str);
    	}else{
    	 	$('#'+target+' #comment-stickerInsert').append(str);
    	}
  
}


//댓글 수정영역 보이기
function editFormMemo(target,memoSeq){
	
	if($(target).closest(".cmt-contents").find(".editForm").css("display") == "block"){
		$(target).closest(".cmt-contents").find("p").show();
		$(target).closest(".cmt-contents").find(".originSticker").show();
		$(target).closest(".cmt-contents").find(".editForm").hide();
		
	}else{
		$(target).closest(".cmt-contents").find("p").hide();
		$(target).closest(".cmt-contents").find(".originSticker").hide();
		$(target).closest(".cmt-contents").find(".editForm").show();
		
	}
}

function fnMoveSticker(val, target) {
	$('#sticker-panel-insert').empty();	
	var str = "";	
	$.ajax({
        type     : 'post',
        url      : '/user/bbs/selectStickerList.json',
        data     : {"stickerCategory" : val},
        dataType : 'json',
        cache    : false,
        error    : function(xhr, status, error) {
       	   alert("정상적으로 실행되지 않았습니다.");
           console.log(error);
        },
        success  : function(data) {
        	var stickerList = data["result"];
        	var tempTarget = $(target).closest('.sticker-panel').attr('class').replace('sticker-panel','').trim();
        	for(var i = 0; i < stickerList.length; i++) {
        		var stickerObj = stickerList[i];
        		str += "<li><button type=\"button\" id=\"stickerImg_"+stickerObj.stickerSeq+"\" class=\"changeEvent\" onclick=\"fnInsertSticker(this, '"+tempTarget+"');\" value="+stickerObj.stickerImgPath+"><img src="+stickerObj.stickerImgPath+"></button></li>";
            }
        	$('#sticker-panel-insert').append(str);
        }
	});    
}

