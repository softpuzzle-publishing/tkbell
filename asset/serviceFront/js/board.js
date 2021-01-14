function resizeImage() {

	var imgObj = document.getElementsByName("ContentImg");
	//alert(imgObj);
	if (imgObj == '[object]' || imgObj == '[object HTMLCollection]'){
		var imgObj = document.getElementsByName("ContentImg");
		for (var i=0; i<imgObj.length; i++) {
			if (imgObj[i].width > 650) {
				imgObj[i].width = 650;
			}
		}
	}
}

var request = null;
function createRequest(){
   if(window.ActiveXObject){
        try{
               //win ie4, ie5, ie6
                request =  new ActiveXObject("Msxml2.XMLHTTP");
           }catch(e){
              try{
                request =  new ActiveXObject("Microsoft.XMLHTTP");
              }catch (e2) {
                request =  null;
              }
          }
     }else if(window.XMLHttpRequest){
       //ie, safari, kconqueror, firefox, nescape, opera
       request = new XMLHttpRequest();
     }else{
       request =  null;
    }
}

function ViewSubMainBBS(mxrow, code, category){
	createRequest();
	var url = "/bbs/Submain_inc_bbs.asp?mxrow="+mxrow+"&code="+code+"&category="+category;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

function ViewComment(spage, BoardSeq, memoCnt){
	createRequest();
	var url = "/include/board/comment_list.asp?sFpage="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

function ViewComment_didear(spage, BoardSeq, memoCnt, endflag, finalflg){	
	createRequest();
	var url = "/include/board/comment_list.asp?sFpage="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt+"&endflag="+endflag+"&finalflg="+finalflg;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

function ViewComment_event(spage, BoardSeq, memoCnt){
	createRequest();
	var url = "/include/board/comment_list_event.asp?sFpage="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

function ViewComment_event_view(spage, BoardSeq, memoCnt){
	createRequest();
	var url = "/event/eventRcomment.asp?page="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt;	
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

var const_oc_boardseq = "";
var const_oc_type = "";
var const_oc_seq = "";
var const_oc_interval = null;
var const_oc_boardcode = "";

function OC_NAVI(id){
	/*
	const_oc_boardseq = BoardSeq;
	const_oc_type = type;
	const_oc_seq = t_seq;
	const_oc_boardcode = boardcode;

	createRequest();
	OCNAVI_GetData(const_oc_boardcode);	
	const_oc_interval = setInterval(OCNAVI_GetData(const_oc_boardcode), 1000);
	*/
	
	var code = $('#viewForm input[id=code]').val();
	$.ajax({
		url			: '/user/bbs/selectNaviPannelPG.json'
		,async		: false
		,type		: 'POST'
		,dataType	: 'json'
		,cache		: false
		,data		: {
			'code' : code,
			'no' : $('#'+id).attr('no')
		}
		,success  : function(data) {
			var htm = "";
			var prevList = data['prevList'];
			var nextList = data['nextList'];
			var detailInfo = data['detailInfo'];
			for(var i=1; i<=2; i++){
				htm += "<li>";
				if(prevList[2-i] != null && prevList[2-i].no != ''){
				htm += "	<a href='#none' onclick=\"fnView('"+prevList[2-i].no+"')\"><img src='/datafiles/bbs/"+code+"/"+prevList[2-i].realfilename+"' class=\"upimg\" alt='' border='0' width='80' height='50' /></a>";
				}
				htm += "	<dl>";
				if(prevList[2-i] != null && prevList[2-i].no != ''){
				htm += "		<dt>"+prevList[2-i].subject.split('##')[0]+"</dt><dd>"+prevList[2-i].subject.split('##')[1]+"</dd>";
				}
				htm += "	</dl>";
				htm += "</li>";
			}
			
			htm += "<li class='active'>";
			htm += "	<a href='#none' onclick=\"fnView('"+detailInfo.no+"')\"><img src='/datafiles/bbs/"+code+"/"+detailInfo.realfilename+"' class=\"upimg\" alt='' border='0' width='80' height='50' /></a>";
			htm += "	<dl>";
			htm += "		<dt>"+detailInfo.subject.split('##')[0]+"</dt><dd>"+detailInfo.subject.split('##')[1]+"</dd>";
			htm += "	</dl>";
			htm += "</li>";
			
			for(var i=0; i<=1; i++){
				htm += "<li>";
				if(nextList[i] != null && nextList[i].no != ''){
					htm += "	<a href='#none' onclick=\"fnView('"+nextList[i].no+"')\"><img src='/datafiles/bbs/"+code+"/"+nextList[i].realfilename+"' class=\"upimg\" alt='' border='0' width='80' height='50' /></a>";
				}
				htm += "	<dl>";
				if(nextList[i] != null && nextList[i].no != ''){
					htm += "		<dt>"+nextList[i].subject.split('##')[0]+"</dt><dd>"+nextList[i].subject.split('##')[1]+"</dd>";
				}
				htm += "	</dl>";
				htm += "</li>";
			}
			
			$('#naviPannel').html(htm);
			if( prevList != null && prevList.length == 3){
				$("#prevBtn").show();
				$("#prevBtn").attr("no", prevList[1].no);
			}else{
				$("#prevBtn").hide();
			}
			
			if( nextList != null && nextList.length == 3){
				$("#nextBtn").show();
				$("#nextBtn").attr("no", nextList[1].no);
			}else{
				$("#nextBtn").hide();
			}
		}
	});
}

function OCNAVI_GetData(boardcode){
	var url = "/include/board/naviPannelPG.asp?BoardCode="+boardcode+"&BoardSeq="+const_oc_boardseq+"&type="+const_oc_type+"&keyseq="+const_oc_seq;
	request.open("GET",url,true);
	request.onreadystatechange = OCNAVI_Info;
	request.send(null);
}

function OCNAVI_Info(){
	if(request.readyState == 4){
		if(request.status == 200){
	   	OCNAVI_Info.innerHTML = "";

			var tempComment = request.responseText;
			if(tempComment.indexOf ('<') == -1){
					OC_NAVI_InnerHtml.innerHTML = "";
			}
			else {
					OC_NAVI_InnerHtml.innerHTML = tempComment;
					clearInterval(const_oc_interval);
					window.status = const_oc_interval;
			}
		}
	}
}

function CommentInfo(){

	if(request.readyState == 4){
		if(request.status == 200){
		   	CommentInfo.innerHTML = "";
			var tempComment = request.responseText;
			if(tempComment.indexOf ('<') == -1){
					CommentInnerHtml.innerHTML = "";
			}
			else {
					CommentInnerHtml.innerHTML = tempComment;
			}
		}
	}
}


function memoTran(target) {

if ($.trim($('#memo_comment').val()) == "")
	{
		alert('댓글 내용을 입력해주세요.');
		$('#memo_comment').focus();
	}
	else
	{
		if(confirm('댓글을 등록하시겠습니까?')) {
			
			wiseLogCommon.logSend('/user/bbs/EventCommentInsert.do');
			
			$("#stickerImgPath").val($(target).closest('fieldset').find("#insertStickerImgPath").val());
			
			$('#memoForm').attr({
				action : '/user/bbs/CommentInsert.do',
				target : '_self'
			});
			/* 크롬 오류로 submit을 따로 뺌 */
			setTimeout(function(){
				$('#memoForm').submit();	
			},500);
			
//		document.viewForm.target="ifDetail";
//		if (document.memoForm.BoardCode.value == "idear" || document.memoForm.BoardCode.value == "didear" ) {
//			document.memoForm.action = "/include/board/CommentTran_file.asp";
//		}
//		else {
//			document.memoForm.action = "/user/community/data/CommentTran.do";
//		}
//		document.memoForm.submit();
		}
	}
}

function RequestMemoTran(target){
	if ($.trim($('#memo_comment').val()) == ""){
		alert('댓글 내용을 입력해주세요.');
		$('#memo_comment').focus();
	}else{
		if(confirm('댓글을 등록하시겠습니까?')) {
			
			$("#stickerImgPath").val($(target).closest('fieldset').find("#insertStickerImgPath").val());
			
			$('#memoForm').attr({
				action : '/user/reference/CommentInsert.do',
				target : '_self'
			}).submit();
		}
	}
}

function memoTranRe(memoSeq) {
	if($.trim($('#memoForm textarea[id=re_comment'+memoSeq+']').val()) == ""){
		alert("답글 내용을 입력하세요.");
	}else{
		if(confirm('답글을 등록하시겠습니까?')){
			$('#memoForm input[id=mode]').val("R");
			$('#memoForm input[id=MemoSeq]').val(memoSeq);
			$('#memoForm input[id=ParentNo]').val(memoSeq);
			$('#memoForm textarea[id=memo_comment]').val($('#memoForm textarea[id=re_comment'+memoSeq+']').val());
			
			/* KKS #17877 */
			$('#memoForm input[id=nickname]').val($('#memoForm input[id=nickname'+memoSeq+']').val());
			
			$('#memoForm').attr({
				action : '/user/bbs/CommentReply.do',
				target : '_self'
			}).submit();
		}
	}

//if (frm.memo_comment.value=="")
//	{
//		alert('댓글 내용을 입력해주세요');
//		frm.memo_comment.focus();
//	}
//	else
//	{
//		if(confirm('댓글을 등록하시겠습니까?')) {		
//		frm.target="ifDetail";
//		frm.action = "/include/board/CommentTran.asp";
//		frm.submit();
//		}
//	}
}

function memoTran_event() {

if (document.memoForm.memo_comment.value=="")
	{
		alert('댓글 내용을 입력해주세요');
		document.memoForm.memo_comment.focus();
	}
	else
	{
		if(confirm('댓글을 등록하시겠습니까?')) {
		document.memoForm.target="ifDetail";
		document.memoForm.action = "/include/board/CommentTran.asp?code=eventR";
		document.memoForm.submit();
		}
	}
}
function delMemo(Seq) {
	if(confirm('댓글을 삭제하시겠습니까?')) {
		
		$('#memoForm input[id=mode]').val("D");
		$('#memoForm input[id=MemoSeq]').val(Seq);
		$('#memoForm input[id=commentRe]').val("N");
		$('#memoForm').attr({
			action : '/user/bbs/CommentDelete.do',
			target : '_self'
		}).submit();
	}
}

function delSubMemo(target, Seq, parentNo) {
	if(confirm('답글을 삭제하시겠습니까?')) {
		$('#memoForm input[id=mode]').val("D");
		
		$('#memoForm input[id=commentRe]').val("Y");
		
		if($(target).closest(".cmt-reply").closest("li").find(".originComment").hasClass("delComment")){
			$('#memoForm input[id=MemoSeq]').val(parentNo);
			$('#memoForm input[id=ParentNo]').val(parentNo);
		}else{
			$('#memoForm input[id=MemoSeq]').val(Seq);
			$('#memoForm input[id=ParentNo]').val(0);
		}
		
		$('#memoForm').attr({
			action : '/user/bbs/CommentDelete.do',
			target : '_self'
		}).submit();
	}
}

function delRequestMemo(Seq) {
	if(confirm('댓글을 삭제하시겠습니까?')) {
		$('#memoForm input[id=mode]').val("D");
		$('#memoForm input[id=MemoSeq]').val(Seq);
		$('#memoForm').attr({
			action : '/user/reference/CommentDelete.do',
			target : '_self'
		}).submit();
	}
}

function memoTran_event() {

if (document.memoForm.memo_comment.value=="")
	{
		alert('댓글 내용을 입력해주세요');
		document.memoForm.memo_comment.focus();
	}
	else
	{
		if(confirm('댓글을 등록하시겠습니까?')) {
		document.memoForm.target="ifDetail";
		document.memoForm.action = "/include/board/CommentTran.asp";
		document.memoForm.submit();
		}
	}
}
/**************************************************************************************************
* 파일 다중첨부
**************************************************************************************************/
function addcase(Cnt, plusCnt) {


	if(plusCnt == 1){
		alert("파일첨부는 "+Cnt+"개까지 가능합니다.");
		return;
	}

	if(document.getElementsByName("userfile").length == plusCnt){
		alert("파일첨부는 "+Cnt+"개까지 가능합니다.");
		return;
	}
	var cHtml = "";

	var Tbl = document.getElementById('uploadView');
	var tRow = Tbl.insertRow();

	cHtml +="<input type=file name=userfile style='width:400px;margin-left:3px' class='input'>" ;

	tRow.insertCell().innerHTML += cHtml;
	return;
}

function BBSUpload(form) {
	var BoardCode = form.BoardCode.value;
    theUniqueID = (new Date()).getTime() % 1000000000;
    var szContent = getOrgSource();
    document.getElementById('org_body').value=szContent;
    var uploader = document.OPUploader;
    var strUploadFiles=uploader.GetUploadingFiles().split("<");
    form.OPUploadedFiles.value = uploader.GetUploadedFiles();
    form.OPDeletedFiles.value = uploader.GetDeletedFiles();
    form.OPUploadingFiles.value = uploader.GetUploadingFiles();

	if(form.BoardCode.value == "pds03" ){
		if(form.subject.value == "" ){
			alert("제목을 입력하세요.");
			return;
		}
	}

    //if(strUploadFiles.length > 1){
    //  OPUploaderSubmit(form);
    //}else{
      form.action = "/bbs/bbsTran.asp?code="+BoardCode;
      //form.submit();
		whenFileUploads(form,"p_files");
    //}
}
function BBSEditFlash(form) {

  var linkUrl = form.linkUrl.value;
  var BoardCode = form.BoardCode.value;
  var BoardSeq = form.BoardSeq.value;
  var page = form.page.value;
  var keyfield = form.keyfield.value;
  var keyword = form.keyword.value;
  theUniqueID = (new Date()).getTime() % 1000000000;
  var szContent = getOrgSource();
  document.getElementById('org_body').value=szContent;

	if(form.BoardCode.value == "talkUser" ){ //닉네임  > 한글, 영문, 숫자 혼용 가능(한글 기준 10자 이내)
		var nicknameVal = form.nickname.value 

		if(nicknameVal == "" ){
			alert("닉네임을 입력하세요");
			return;
		} else {			
			var re0 = /[a-z]|[0-9]/gi; //영숫자 패턴
			var re1 = /[ㄱ-�]/g; //한글패턴

			var v0 = nicknameVal.match(re0); //매치확인
			var v1 = nicknameVal.match(re1); //매치확인

			if(v0!=null) v0 = v0.length; //바이트 구함
			if(v1!=null) v1 = v1.length; //바이트 구함

			var tot = v0+(v1*2); //합을 구함

			if (tot > 20 ){
					alert('한글 기준 10자 까지 가능합니다.');
					return;
			}
		}

	}


	form.action = "/bbs/editTran.asp?no="+BoardSeq+"&"+linkUrl+"";
	//form.submit();
	whenFileUploads(form,"p_files");


}
function BBSUploadFlash(form) {

	var BoardCode = form.BoardCode.value;
    theUniqueID = (new Date()).getTime() % 1000000000;
    var szContent = getOrgSource();
    document.getElementById('org_body').value=szContent;


	if(form.BoardCode.value == "pds03" ){
		if(form.subject.value == "" ){
			alert("제목을 입력하세요.");
			return;
		}
	}

	if(form.BoardCode.value == "talkUser" ){ //닉네임  > 한글, 영문, 숫자 혼용 가능(한글 기준 10자 이내)
		var nicknameVal = form.nickname.value 

		if(nicknameVal == "" ){
			alert("닉네임을 입력하세요");
			return;
		} else {			
			var re0 = /[a-z]|[0-9]/gi; //영숫자 패턴
			var re1 = /[ㄱ-힣]/g; //한글패턴

			var v0 = nicknameVal.match(re0); //매치확인
			var v1 = nicknameVal.match(re1); //매치확인

			if(v0!=null) v0 = v0.length; //바이트 구함
			if(v1!=null) v1 = v1.length; //바이트 구함

			var tot = v0+(v1*2); //합을 구함

			if (tot > 20 ){
					alert('한글 기준 10자 까지 가능합니다.');
					return;
			}
		}

	}
	
	form.action = "/bbs/bbsTran.asp?code="+BoardCode;
	//form.submit();
	whenFileUploads(form,"p_files");
}

function BBSUploadFlashmystudy(form) {
	//alert (lastChasiSelect);
	var idxlast = lastChasiSelect - 1;
	if (document.getElementById('chasi1'))
	{
		if (document.getElementById('chasi1').options[document.getElementById('chasi1').selectedIndex].value != "-1" && document.getElementById('chasi'+idxlast).options[document.getElementById('chasi'+idxlast).selectedIndex].value2.indexOf("차시") < 0 && document.getElementById('chasi3').options[document.getElementById('chasi3').selectedIndex].value2.indexOf("우리들은") < 0)
		{
			alert("과목분류가 공통이 아닐경우 마지막 차시까지 선택하셔야 합니다.");
			//alert (document.getElementById('chasi'+idxlast).options[document.getElementById('chasi'+idxlast).selectedIndex].value2);
		}
	}
	else
	{
		var BoardCode = form.BoardCode.value;
		theUniqueID = (new Date()).getTime() % 1000000000;
		var szContent = getOrgSource();
		document.getElementById('org_body').value=szContent;


		if(form.BoardCode.value == "pds03" ){
			if(form.subject.value == "" ){
				alert("제목을 입력하세요.");
				return;
			}
		}

		form.action = "/bbs/bbsTran.asp?code="+BoardCode;
		//form.submit();
		whenFileUploads(form,"p_files");
	}
}

function BBSUploadmystudy(form) {
	//alert (lastChasiSelect);
	var idxlast = lastChasiSelect - 1;
	if (document.getElementById('chasi1').options[document.getElementById('chasi1').selectedIndex].value != "-1" && document.getElementById('chasi'+idxlast).options[document.getElementById('chasi'+idxlast).selectedIndex].value2.indexOf("차시") < 0 && document.getElementById('chasi3').options[document.getElementById('chasi3').selectedIndex].value2.indexOf("우리들은") < 0)
	{
		alert("과목분류가 공통이 아닐경우 마지막 차시까지 선택하셔야 합니다.");
		//alert (document.getElementById('chasi'+idxlast).options[document.getElementById('chasi'+idxlast).selectedIndex].value2);
	}
	else
	{
		var BoardCode = form.BoardCode.value;
		theUniqueID = (new Date()).getTime() % 1000000000;
		var szContent = getOrgSource();
		document.getElementById('org_body').value=szContent;
		var uploader = document.OPUploader;
		var strUploadFiles=uploader.GetUploadingFiles().split("<");
		form.OPUploadedFiles.value = uploader.GetUploadedFiles();
		form.OPDeletedFiles.value = uploader.GetDeletedFiles();
		form.OPUploadingFiles.value = uploader.GetUploadingFiles();
		if(strUploadFiles.length > 1){
		  OPUploaderSubmit(form);
		}else{
		  form.action = "/bbs/bbsTran.asp?code="+BoardCode;
		  form.submit();
		}
	}
}

function BBSDelete() {
//		if(confirm('게시글을 삭제하시겠습니까?')) {
//		document.DeleteFrm.target="ifDetail";
//		document.DeleteFrm.action = "/bbs/Delete.asp";
//		document.DeleteFrm.submit();
//		}
	if(confirm("게시글을 삭제하시겠습니까?")){
		$('#viewForm').attr({
			action : '/user/bbs/deleteData.do',
			target : '_self'
		}).submit();
	}
}

function BBSEdit(form) {

  var linkUrl = form.linkUrl.value;
  var BoardCode = form.BoardCode.value;
  var BoardSeq = form.BoardSeq.value;
  var page = form.page.value;
  var keyfield = form.keyfield.value;
  var keyword = form.keyword.value;
  theUniqueID = (new Date()).getTime() % 1000000000;
  var szContent = getOrgSource();
  document.getElementById('org_body').value=szContent;
  var uploader = document.OPUploader;
  if(uploader == "undefined") return;
  form.OPUploadedFiles.value  = uploader.GetUploadedFiles();
  form.OPDeletedFiles.value   = uploader.GetDeletedFiles();
  form.OPUploadingFiles.value = uploader.GetUploadingFiles();


  var lengthUploadedFiles=uploader.GetUploadedFiles().split("<").length;
  var lengthUploadingFiles=uploader.GetUploadingFiles().split("<").length;
  if (lengthUploadedFiles==lengthUploadingFiles){
	form.action = "/bbs/editTran.asp?no="+BoardSeq+"&"+linkUrl+"";
	form.submit();
  }else{
	OPUploaderSubmit(form);
  }
}

function BBSEdit_Custom(form) {

  var linkUrl = form.linkUrl.value;
  var BoardCode = form.BoardCode.value;
  var BoardSeq = form.BoardSeq.value;
  var page = form.page.value;
  var keyfield = form.keyfield.value;
  var keyword = form.keyword.value;
  theUniqueID = (new Date()).getTime() % 1000000000;
  var szContent = getOrgSource();
  document.getElementById('org_body').value=szContent;
  var uploader = document.OPUploader;
  if(uploader == "undefined") return;
/*  form.OPUploadedFiles.value  = uploader.GetUploadedFiles();
  form.OPDeletedFiles.value   = uploader.GetDeletedFiles();
  form.OPUploadingFiles.value = uploader.GetUploadingFiles();
*/

 // var lengthUploadedFiles=uploader.GetUploadedFiles().split("<").length;
 // var lengthUploadingFiles=uploader.GetUploadingFiles().split("<").length;
  //if (lengthUploadedFiles==lengthUploadingFiles){
	form.action = "/bbs/editTran.asp?no="+BoardSeq+"&"+linkUrl+"";
	form.submit();
//  }else{
//	OPUploaderSubmit(form);
//  }*/
}

function RequestUpload(form) {
	var BoardCode = form.BoardCode.value;
    var szContent = getOrgSource();
    document.getElementById('org_body').value=szContent;
      form.action = "/community/request_Ins.asp";
      form.submit();
}

function RequestUpload_Update(form) {
	var BoardCode = form.BoardCode.value;
    var szContent = getOrgSource();
    document.getElementById('org_body').value=szContent;
      form.action = "/community/request_update.asp";
      form.submit();
}

function RequestDelete() {
	if(confirm('게시글을 삭제하시겠습니까?')){
		$("#viewForm").attr({
			action : '/user/reference/deleteRequest.do',
			target : '_self'
		}).submit();
	}
	
//		if(confirm('게시글을 삭제하시겠습니까?')) {
//		document.DeleteFrm.target="ifDetail";
//		document.DeleteFrm.action = "/community/request_Delete.asp";
//		document.DeleteFrm.submit();
//		}
}


function RequestTop(TopChk) {
	var msg = "";
	if( TopChk == 0 ){
		msg = "공지글로 등록하시겠습니까?";
	}else{
		msg = "공지글을 해제 하시겠습니까?";
	}
	if(confirm(msg)){
		$('#viewForm').attr({
			action : '/user/reference/requestTopTran.do',
			target : '_self'
		}).submit();
	}

//		if (TopChk == 0 )
//		{
//			if(confirm('공지글로 등록하시겠습니까?')) {
//			document.DeleteFrm.topchk.value = "1";
//			document.DeleteFrm.target="ifDetail";
//			document.DeleteFrm.action = "/community/request_TopTran.asp";
//			document.DeleteFrm.submit();
//			}
//		}
//		else
//		{
//			if(confirm('공지글을 해제 하시겠습니까?')) {
//			document.DeleteFrm.topchk.value = "0";
//			document.DeleteFrm.target="ifDetail";
//			document.DeleteFrm.action = "/community/request_TopTran.asp";
//			document.DeleteFrm.submit();
//			}
//
//		}
}

function checkCounselForm(form) {
   if(checkValue(form.subject, '제목을')==false)return false;
   if(checkValue(form.comment, '내용을')==false)return false;
	form.target="ifDetail";
	form.action = "/custom/ServiceTran.asp";

}

function leftHideMenu(n,g){
	var divID  = 'sub';
	for(i=1;i<=n;i++){
		if (g==0)
		{
		  document.getElementById(divID+i).style.display='block';
		}
		else
		{
		  document.getElementById(divID+i).style.display='none';
		}
	}
}

//첨부파일 다운로드
function fnFileDown(mode, fileno) {
	var f = document.downfrm;
	f.mode.value = mode;
	f.fileno.value = fileno;
	f.target = "ifDetail";
	f.action = "/include/board/filedown.asp";
	f.submit();
}

//첨부파일 수정하기
function fnEditReplyFile(fileno) {
		window.open("","popFileEdit","width=300,height=200");
		var f = document.downfrm;
		f.fileno.value = fileno;
		f.target = "popFileEdit";
		f.action = "/include/board/popFileUpdate.asp";
		f.submit();
}

/*************************************************************************************************
* 차시정보 가져오기
*************************************************************************************************/
var lastChasiSelect = 1;
function getChasiCategory(chasiStep){

//	var chasiID = document.getElementById('chasi'+chasiStep);
//
//	var chasiCode = chasiID.options[chasiID.selectedIndex].value;
//
//	chasiStep++;
//
//	var chasiList = document.getElementById('chasiList');
//	chasiList.src = "/bbs/getChasiOptions.asp?chasiCode="+chasiCode+'&chasiStep='+chasiStep;
	
	var chasiCode = $('#chasi'+chasiStep+' option:selected').val();
	chasiStep++;
	lastChasiSelect = chasiStep;
	
	$.ajax({
		url			: '/user/bbs/selectChasiOptions.json'
		,async		: false
		,type		: 'POST'
		,dataType	: 'json'
		,cache		: false
		,data		: {
			'chasiCode' : chasiCode,
			'chasiStep' : chasiStep
		}
		,success  : function(data) {
			var selectTitle = "";
			switch(chasiStep){
				case 2:
					selectTitle = "<option value=\"-1\" value2=\"-1\">== 학기 ==</option>";
					break;
				
				case 3:
					selectTitle = "<option value=\"-1\" value2=\"-1\">== 과목 ==</option>";
					break;
					
				default:
					selectTitle = "<option value=\"-1\" value2=\"-1\">== 선택 ==</option>";
					break;
			}
			var result = data['chasiList'];
			if( result != null ){
				
				selectBox = "<select id=\"chasi"+chasiStep+"\" name=\"chasi"+chasiStep+"\" onChange=\"getChasiCategory("+chasiStep+")\" style=\"font-size:9pt\">"+selectTitle;
				for(var i=0; i<result.length; i++){
					selectBox += "<option value=\""+result[i].lesson_plan_seq+"\" value2=\""+result[i].plan_name+"\">"+result[i].plan_name+"</option>";
				}
				selectBox += "</select>";
				var selectBox2 = "<select id=\"chasi3\" name=\"chasi3\" style=\"font-size:9pt\"><option value=\"-1\" value2=\"-1\">== 과목 ==</option></select>";
				if( chasiStep == 6 ){
					selectBox = "<br/>" + selectBox;
				}
				
				blankDiv(chasiStep);
				if( chasiStep == 2 ){
					$('#chasiArea'+chasiStep).html(selectBox);
					$('#chasiArea3').html(selectBox2);
				}else{
					$('#chasiArea'+chasiStep).html(selectBox);
				}
			}else{
				blankDiv(chasiStep);
			}
		}
	});
}

function getChasiCategoryNew(chasiStep, chasiCode, value2){
	$('#chasi' + chasiStep + ' li>a').removeClass('selected');
	$('#menuNum' + chasiCode).addClass('selected');
	$('#menuNum' + chasiCode).children().addClass('selected');	
	$("input[name= chasi" + chasiStep + "]").val(chasiCode);
	console.log(chasiStep);
	console.log(chasiCode);
	console.log($("input[name= chasi" + chasiStep + "]").val());
	//선택한 차시가 보여지는 부분
	chasiName = null;
	for(var i =1; i <= 6; i++){
		if ($('#chasi' + i + '>li').find('.selected').text() != null && $('#chasi' + i + '>li').find('.selected').text() != ''){
			if (i == 1){
				chasiName = $('#chasi' + i + '>li').find('.selected').text();
			} else {
				chasiName += " > " + $('#chasi' + i + '>li').find('.selected').text();
			}
		}
	}
	if (chasiName == null || chasiName == ''){
		chasiName = "차시를 선택하세요.";
	}
	$('#chasiName').html(chasiName);
	
	chasiStep++;
	lastChasiSelect = chasiStep;	
	$.ajax({
		url			: '/user/bbs/selectChasiOptions.json'
		,async		: false
		,type		: 'POST'
		,dataType	: 'json'
		,cache		: false
		,data		: {
			'chasiCode' : chasiCode,
			'chasiStep' : chasiStep
		}
		,success  : function(data) {
			var selectTitle = "";
			var result = data['chasiList'];
			if( result != null && result.length != 0){
				for(var i=0; i<result.length; i++){
					if(i == 0) {
					selectBox = "<li id=\"menuNum"+result[i].lessonPlanSeq+"\" value=\""+result[i].planName+"\">"+"<a href=\"javascript:;\" onClick=\"getChasiCategoryNew("+chasiStep+ "," +result[i].lessonPlanSeq+ ",'" +result[i].planName+"')\">"+result[i].planName+"</a></li>";
					} else {
					selectBox += "<li id=\"menuNum"+result[i].lessonPlanSeq+"\" value=\""+result[i].planName+"\">"+"<a href=\"javascript:;\" onClick=\"getChasiCategoryNew("+chasiStep+ "," +result[i].lessonPlanSeq+ ",'" +result[i].planName+"')\">"+result[i].planName+"</a></li>";
					}
				}
				blankDiv(chasiStep);
				$('#chasi'+chasiStep).html(selectBox);
			}else{
				blankDiv(chasiStep);
				if(chasiStep!='2' || chasiCode == '-1'){
					$('.pre_choice').toggleClass('disnone');
				}
			}
		}
	});
}

function setChasiCategory(chasicode){
	var chasi = chasicode.split("|");
	var chasiStep = 2;
	if( chasi.length > 1 ){
		$('#chasi1').val(chasi[i]);
		for(var i=0; i<chasi.length; i++){
			$.ajax({
				url			: '/user/bbs/selectChasiOptions.json'
				,async		: false
				,type		: 'POST'
				,dataType	: 'json'
				,cache		: false
				,data		: {
					'chasiCode' : chasi[i],
					'chasiStep' : chasiStep
				}
				,success  : function(data) {
					var selectTitle = "";
					switch(chasiStep){
						case 2:
							selectTitle = "<option value=\"-1\" value2=\"-1\">== 학기 ==</option>";
							break;
						
						case 3:
							selectTitle = "<option value=\"-1\" value2=\"-1\">== 과목 ==</option>";
							break;
							
						default:
							selectTitle = "<option value=\"-1\" value2=\"-1\">== 선택 ==</option>";
							break;
					}
					var result = data['chasiList'];
					if( result != null ){
						
						selectBox = "<select id=\"chasi"+chasiStep+"\" name=\"chasi"+chasiStep+"\" onChange=\"getChasiCategory("+chasiStep+")\" style=\"font-size:9pt\">"+selectTitle;
						for(var j=0; j<result.length; j++){
							var selected = "";
							if(chasi[i + 1] == result[j].lesson_plan_seq){
								selected = "selected";
							}
							selectBox += "<option value=\""+result[j].lesson_plan_seq+"\" value2=\""+result[j].plan_name+"\" "+selected+" >"+result[j].plan_name+"</option>";
						}
						selectBox += "</select>";
						var selectBox2 = "<select id=\"chasi3\" name=\"chasi3\" style=\"font-size:9pt\"><option value=\"-1\" value2=\"-1\">== 과목 ==</option></select>";
						if( chasiStep == 6 ){
							selectBox = "<br/>" + selectBox;
						}
						
						blankDiv(chasiStep);
						if( chasiStep == 2 ){
							$('#chasiArea'+chasiStep).html(selectBox);
							$('#chasiArea3').html(selectBox2);
						}else{
							$('#chasiArea'+chasiStep).html(selectBox);
						}
					}
				}
			});
			chasiStep++;
		}
	}else{
		$('#chasi1').val(chasi);
	}
}



function getChasiCategory_sean(chasiStep){

	var chasiID = document.getElementById('chasi'+chasiStep);

	var chasiCode = chasiID.options[chasiID.selectedIndex].value;

	chasiStep++;

	var chasiList = document.getElementById('chasiList');
	chasiList.src = "/bbs/getChasiOptions_sean.asp?chasiCode="+chasiCode+'&chasiStep='+chasiStep;
	lastChasiSelect = chasiStep;


}

function blankDiv(startNum){
  for(var i=startNum; i<=8; i++){
	  $('#chasi'+i).html("");
     //if(parent.document.getElementById('chasiArea'+i))  parent.document.getElementById('chasiArea'+i).innerHTML = '';
  }
  lastChasiSelect = startNum;
}




/*************************************************************************************************
* 학급경영자료 셀렉트 박스 처리
*************************************************************************************************/

Cats=new Array(5);
Cats[0]=new Array(1);
Cats[1]=new Array(11);
Cats[2]=new Array(9);
Cats[3]=new Array(1);
Cats[4]=new Array(1);

Cats[0][0]="---------";

//학급경영일반
Cats[1][0]="모둠활동";
Cats[1][1]="학급양식";
Cats[1][2]="학급규칙";
Cats[1][3]="생활지도";
Cats[1][4]="보상체계";
Cats[1][5]="편지지";
//Cats[1][6]="교실환경";
Cats[1][6]="운영계획";
Cats[1][7]="자리배치";
Cats[1][8]="레크레이션";
Cats[1][9]="환경미화";
Cats[1][10]="기타";

//행사관련
Cats[2][0]="학예회";
Cats[2][1]="운동회";
Cats[2][2]="계기일";
Cats[2][3]="학급졸업식";
Cats[2][4]="개학식";
Cats[2][5]="입학식";
Cats[2][6]="현장학습";
Cats[2][7]="수학여행";
Cats[2][8]="기타";

//재량활동
Cats[3][0]="";

//특별활동
Cats[4][0]="";


//특정 채널을 선택하면 해당 카테고리를 생성
function SelectOption(num)
{
	$('#subcode option').remove();
	for(var i=0; i<Cats[num].length; i++){
		$('#subcode').append("<option value='"+Cats[num][i]+"' >"+Cats[num][i]+"</option>");
	}
	$('#subcode').attr('disabled', ( num == 3 || num == 4 ) ? true : false);
	
	/*
      //첫 번째 카테고리 선택
      document.signform.SelectSubCode.selectedIndex=0;

      //해당 채널의 서브 카테고리 배열 길이만큼 반복
      for(ctr=0;ctr<Cats[num].length;ctr++)
      {
       //카테고리에 해당하는 콤보박스의 값을 채움
       document.signform.SelectSubCode.options[ctr]=new Option(Cats[num][ctr],Cats[num][ctr]);
      }
      //select 리스트 길이 지정
      document.signform.SelectSubCode.length=Cats[num].length;
	  if (num==3 || num==4)
	  {
			document.signform.SelectSubCode.disabled=true;
	  }
	  else
		{
				document.signform.SelectSubCode.disabled=false;
		}
	*/
}

Cats_clipart=new Array(2);
//Cats_clipart[0]=new Array(7);
Cats_clipart[0]=new Array(9);
Cats_clipart[1]=new Array(10);
Cats_clipart[2]=new Array(1);
Cats_clipart[3]=new Array(1);
Cats_clipart[4]=new Array(1);

/*
//학급환경자료
Cats_clipart[0][0]="교실앞면";
Cats_clipart[0][1]="교실뒷면";
//Cats_clipart[0][2]="학생작품";
Cats_clipart[0][3]="만들기";
Cats_clipart[0][4]="꾸미기";
//Cats_clipart[0][5]="종이접기";
Cats_clipart[0][6]="작품전시";
Cats_clipart[0][2]="테마기획";
Cats_clipart[0][5]="기타";
*/


//학급 서식자료
Cats_clipart[0][0]="학생기초조사";
Cats_clipart[0][1]="학급안내";
Cats_clipart[0][2]="시간표";
//Cats_clipart[0][3]="라벨/클리어화일";
Cats_clipart[0][4]="번호/이름표";
//Cats_clipart[0][5]="쿠폰";
Cats_clipart[0][6]="스티커/쿠폰";
Cats_clipart[0][7]="방학";
Cats_clipart[0][3]="타이틀";
Cats_clipart[0][5]="학습그림자료";
Cats_clipart[0][8]="기타";

//월중 행사 자료
Cats_clipart[1][0]="입학/학부모총회";
Cats_clipart[1][1]="식목/과학의달";
Cats_clipart[1][2]="5월행사";
Cats_clipart[1][3]="운동회";
Cats_clipart[1][4]="학예회";
Cats_clipart[1][5]="현장학습/수련회";
Cats_clipart[1][6]="한글날/빼빼로";
Cats_clipart[1][7]="방학행사";
Cats_clipart[1][8]="종업식/졸업식";
Cats_clipart[1][9]="기타행사";

// 자율활동
Cats_clipart[2][0]="기타자료";

// 봉사활동
Cats_clipart[3][0]="기타자료";

// 진로활동
Cats_clipart[4][0]="기타자료";

//클립아트용 셀렉트 �
function SelectOption_clipart(num)
{
	$('#subcode option').remove();
	for(var i=0; i<Cats_clipart[num].length; i++){
		$('#subcode').append("<option value='"+Cats_clipart[num][i]+"' >"+Cats_clipart[num][i]+"</option>");
	}
	
	
	/*
      //첫 번째 카테고리 선택
      document.signform.SelectSubCode.selectedIndex=0;

      //해당 채널의 서브 카테고리 배열 길이만큼 반복
      for(ctr=0;ctr<Cats_clipart[num].length;ctr++)
      {
       //카테고리에 해당하는 콤보박스의 값을 채움
       document.signform.SelectSubCode.options[ctr]=new Option(Cats_clipart[num][ctr],Cats_clipart[num][ctr]);
      }
      //select 리스트 길이 지정
      document.signform.SelectSubCode.length=Cats_clipart[num].length;
      */
}


function makewinBBS(code,filename)
{
	imgPath="/datafiles/bbs/"+code+"/"+filename;
	photobbs = new Image();
	photobbs.src = (imgPath);
	makeWinBBS2(imgPath);
}

function makeWinBBS2(imgPath){
	if ( (photobbs.width!=0)&&(photobbs.height!=0) )
	{
			var winwidth = photobbs.width + 20;
			var winheight = photobbs.height + 5;
		newWin=window.open(imgPath,"bigimage","width="+winwidth+",height="+winheight+",scrollbars=yes");
		newWin.focus();
	}
}


// 교육이야기
function ConRecommend(c, g) {
	var msg = "추천";
	if( g != "I" ){
		"추천삭제";
	}
	if(confirm(msg + "하시겠습니까?")){
		$('#Contents_no').val(c);
		$('#gubun').val(g);
		$("#listForm").attr({
			action : 'story_recomm.do',
			target : '_self'
		}).submit();
	}
	
//	if (g == "I")
//	{
//		if(confirm('추천하시겠습니까?')) {
//		document.DeleteFrm.target="ifDetail";
//		document.DeleteFrm.Contents_no.value = c;
//		document.DeleteFrm.gubun.value = g;
//		document.DeleteFrm.action = "/community/story_recomm.asp";
//		document.DeleteFrm.submit();
//		}
//	}
//	else
//	{
//		if(confirm('추천삭제하시겠습니까?')) {
//		document.DeleteFrm.target="ifDetail";
//		document.DeleteFrm.Contents_no.value = c;
//		document.DeleteFrm.gubun.value = g;
//		document.DeleteFrm.action = "/community/story_recomm.asp";
//		document.DeleteFrm.submit();
//		}
//
//	}
}
function ConMemoTran() {

if (document.memoForm.memo_comment.value=="")
	{
		alert('댓글 내용을 입력해주세요');
		document.memoForm.memo_comment.focus();
	}
	else
	{
		if(confirm('댓글을 등록하시겠습니까?')) {
		document.memoForm.target="ifDetail";
		document.memoForm.action = "/community/StoryCommentTran.asp";
		document.memoForm.submit();
		}
	}
}

function ConDelMemo(Seq) {
		if(confirm('댓글을 삭제하시겠습니까?')) {
		document.memoForm.mode.value="D";
		document.memoForm.MemoSeq.value=Seq;
		document.memoForm.target="ifDetail";
		document.memoForm.action = "/community/StoryCommentTran.asp";
		document.memoForm.submit();
		}
}

function bbsTop(TopChk) {
	var msg = "";
	if( TopChk == 0 ){
		msg = "공지글로 등록하시겠습니까?";
	}else{
		msg = "공지글을 해제 하시겠습니까?";
	}
	if(confirm(msg)){
		$('#viewForm').attr({
			action : '/user/bbs/bbsTopTran.do',
			target : '_self'
		}).submit();
	}
	
	

//		if (TopChk == 0 )
//		{
//			if(confirm('공지글로 등록하시겠습니까?')) {
//			document.DeleteFrm.target="ifDetail";
//			document.DeleteFrm.action = "/user/bbs/bbsTopTran.do";
//			document.DeleteFrm.submit();
//			}
//		}
//		else
//		{
//			if(confirm('공지글을 해제 하시겠습니까?')) {
//			document.DeleteFrm.target="ifDetail";
//			document.DeleteFrm.action = "/user/bbs/bbsTopTran.asp";
//			document.DeleteFrm.submit();
//			}
//
//		}
}

function bbsBestTop(chk, type) {
	var msg = "",
		typeTxt = "",
		action = "";
	if(type == "notice"){
		typeTxt = "공지";
		action = "/user/bbs/bbsBest.do";
	}else if(type == "recommend"){
		typeTxt = "추천";
		action = "/user/bbs/bbsTopTran.do";
	}
	if( chk == 0 ){
		msg = typeTxt + "글로 등록하시겠습니까?";
	}else{
		msg = typeTxt + "글을 해제 하시겠습니까?";
	}
	if(confirm(msg)){
		$('#viewForm').attr({
			action : action,
			target : '_self'
		}).submit();
	}
}

function plusRecommend(Seq) {
//		if(confirm('해당글을 추천 하시겠습니까?')) {
//		document.DeleteFrm.target="ifDetail";
//		document.DeleteFrm.action = "/bbs/plusRecommend.asp";
//		document.DeleteFrm.submit();
//		}
	if(confirm("해당글을 추천 하시겠습니까?")){
		$('#viewForm').attr({
			action : '/user/bbs/plusRecommend.do',
			target : '_self'
		}).submit();
	}
}

function currentEditMemo(memoSeq, target){
	if($.trim($('#memoForm textarea[id=update_comment'+memoSeq+']').val()) == ""){
		alert("댓글 내용을 입력하세요.");
	}else{
		if(confirm('댓글 수정을 완료하시겠습니까?')){
//		document.commentEditForm.commentSeq.value = memoSeq;
//		document.commentEditForm.commentBody.value = document.getElementById('commbodyEditContent'+memoSeq).value;
//		document.commentEditForm.submit();
			
			$('#memoForm input[id=mode]').val("U");
			$('#memoForm input[id=MemoSeq]').val(memoSeq);
			$('#memoForm textarea[id=memo_comment]').val($('#memoForm textarea[id=update_comment'+memoSeq+']').val());
			$('#memoForm input[id=present_chk]').eq($(":radio[id='present_chk"+ memoSeq +"']:checked").val()-1).attr("checked","checked");
			$("#stickerImgPath").val($(target).closest('fieldset').find("#insertStickerImgPath").val());
			//스티커 이미지 사용안할경우 
			
			$('#memoForm').attr({
				action : '/user/bbs/CommentUpdate.do',
				target : '_self'
			}).submit();
		}
	}
}

function requestEditMemo(memoSeq, target){
	if($.trim($('#memoForm textarea[id=update_comment'+memoSeq+']').val()) == ""){
		alert("댓글 내용을 입력하세요.");
	}else{
		if(confirm('댓글 수정을 완료하시겠습니까?')){
			$('#memoForm input[id=mode]').val("U");
			$('#memoForm input[id=MemoSeq]').val(memoSeq);
			$('#memoForm textarea[id=memo_comment]').val($('#memoForm textarea[id=update_comment'+memoSeq+']').val());
			$("#stickerImgPath").val($(target).closest('fieldset').find("#insertStickerImgPath").val());
			$('#memoForm').attr({
				action : '/user/reference/CommentUpdate.do',
				target : '_self'
			}).submit();
		}
	}
}

function replyComment(replyid){
	if (document.getElementById(replyid).style.display == "none"){
		document.getElementById(replyid).style.display = "";
	}
	else{
		document.getElementById(replyid).style.display = "none";
	}
}
function currentEditMemoToggle(MEMO_SEQ){
	if (document.getElementById("commbody"+MEMO_SEQ).style.display =="none")
	{
		$(".event_sel"+MEMO_SEQ).hide();
		document.getElementById("commbody"+MEMO_SEQ).style.display = "block";
		document.getElementById("commbodyEdit"+MEMO_SEQ).style.display = "none";
	}
	else{
		$(".event_sel"+MEMO_SEQ).show();
		document.getElementById("commbody"+MEMO_SEQ).style.display = "none";
		document.getElementById("commbodyEdit"+MEMO_SEQ).style.display = "block";
	}
}

function stripHTML(){
	var re= /<\S[^><]*>/g
	for (i=0; i<arguments.length; i++)
	arguments[i].value=arguments[i].value.replace(re, "")
}
//좋아요 추천하기
function fnGoodSel(memo_idx) {
	var f = document.goodfrm;
	f.memo_idx.value = memo_idx;
	f.target = "ifDetail";
	f.action = "/include/board/comment_choice.asp";
	f.submit();
}
//당첨자지정
function fnFinal(memo_idx, flag) {
	var f = document.finalfrm;
	f.memo_idx.value = memo_idx;
	f.final_flag.value = flag;
	f.target = "ifDetail";
	f.action = "/include/board/comment_final.asp";
	f.submit();
}

//20120510 감사의 달 이벤트
function TeacherEventViewComment(spage, BoardSeq, memoCnt){
	createRequest();
	var url = "/event/eventRcomment.asp?sFpage="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

// 20130429 5월 이벤트
function ViewComment_may(spage, BoardSeq, memoCnt){
	createRequest();
	var url = "/include/board/comment_list_may.asp?sFpage="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}

function ViewComment_may_good(spage, BoardSeq, memoCnt){
	createRequest();
	var url = "/include/board/comment_list_may_good.asp?sFpage="+spage+"&BoardSeq="+BoardSeq+"&memoCnt="+memoCnt;
	request.open("GET",url,true);
	request.onreadystatechange = CommentInfo;
	request.send(null);
}
