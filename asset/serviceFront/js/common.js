function whenFlashSongPlay(p_file){
	makeWin("/rest/music_room_player.asp?getfilename="+p_file, 'swf', 800, 600)
}
function share_study_pop(codeid){

	if (codeid == undefined)
	{
		codeid = 0;
	}
	if (navigator.userAgent.toLowerCase().indexOf('chrome')!=-1) {
		makeWin('/myscrap/share_studydata.asp?codeId='+codeid,'sharedata', 1034, 670, 0);
	}
	else {
		makeWin('/myscrap/share_studydata.asp?codeId='+codeid,'sharedata', 1016, 670, 0);
	}
}
function Moving(target, position, topLimit, btmLimit) {
	if (!target)
		return false;

	var obj = target;
	obj.initTop = position;
	obj.topLimit = topLimit;
	obj.bottomLimit = document.documentElement.scrollHeight - btmLimit;

	obj.style.position = "absolute";
	obj.top = obj.initTop;
	obj.left = obj.initLeft;

	if (typeof(window.pageYOffset) == "number") {
		obj.getTop = function() {
			return window.pageYOffset;
		}
	} else if (typeof(document.documentElement.scrollTop) == "number") {
		obj.getTop = function() {
			return document.documentElement.scrollTop;
		}
	} else {
		obj.getTop = function() {
			return 0;
		}
	}

	if (self.innerHeight) {
		obj.getHeight = function() {
			return self.innerHeight;
		}
	} else if(document.documentElement.clientHeight) {
		obj.getHeight = function() {
			return document.documentElement.clientHeight;
		}
	} else {
		obj.getHeight = function() {
			return 500;
		}
	}

	obj.move = setInterval(function() {
		if (obj.initTop > 0) {
			pos = obj.getTop() + obj.initTop;
		} else {
			pos = obj.getTop() + obj.getHeight() + obj.initTop;
		}

		if (pos > obj.bottomLimit)
			pos = obj.bottomLimit;
		if (pos < obj.topLimit)
			pos = obj.topLimit;

		interval = obj.top - pos;
		obj.top = obj.top - interval / 3;
		obj.style.top = obj.top + "px";
	}, 30)
}

// 오늘하루 공지띄우지 않기
function setCookie( name, value, expiredays ){
	var todayDate = new Date();
	//유효기간을 일단위 설정
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}
function getCookieVal(offset) {
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
    endstr = document.cookie.length;

	var v_cname = document.cookie.substring(offset, endstr);
	if (v_cname != "undefined")
		return v_cname;
	else
		return "";
}

function checkValue(obj, objName){
	var result;
	var msg;
	result = trim(obj.value);		// 공백제거

	if (result == ""){
		if ( (obj.type == "text") || (obj.type == "textarea") || (obj.type == "password")){
			msg = "입력";
		}else{
			msg = "선택";
		}

		alert( objName + " " + msg + "하세요.");
		obj.focus();

		if (obj.type == "text") obj.select();
		return(false);
	}
}

//공백제거
function trim(str){
	var arrStr = new Array();
	var lenStr;
	var rtnStr = "";

	if(str == null) return "";
	lenStr = str.length;

	for (var i = 0; i <lenStr; i++)	{
		arrStr[i] = str.charAt(i);

		if (arrStr[i] == " ")
		{
			if (i > 0)
			{
				if (!arrStr[i - 1])
					arrStr[i] = "";
			}
			else
				arrStr[i] = "";
		}
	}

	for (i = lenStr - 1; i >= 0; i--) {
		if (arrStr[i] == " "){
			if (i < lenStr - 1){
				if (!arrStr[i + 1])
					arrStr[i] = "";
			}
			else
				arrStr[i] = "";
		}
	}

	for (i = 0; i < lenStr; i++)
		if (arrStr[i])
			rtnStr += arrStr[i];

	return rtnStr;
}


function viewNote(){
 // makeWin('/note/note.asp','viewNote',645,497);
  makeWin('/note/note.asp','viewNote',645,620);
}


/*******************************************************
******                                            ******
******              설명 : 팝업 띄우기            ******
******                                            ******
*******************************************************/
//팝업생성
function popupWin(url, winnm, width, height, top, left, resize, menu, tool, status, scroll) {
	 var args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar="+menu+"," + "resizable="+resize+","
         + "scrollbars=" + scroll + "," + "status="+status+","+ "toolbar="+tool+"," + "hotkeys=0,"
		 + "left=" + left + ","     //IE Only
		 + "top=" + top;           //IE Only	
	//var popupWin = window.open(url, winnm, args);
	var popupWin = window.open(url, "메인팝업", args);//20120806 메인동영상 팝업을 새창이 아닌 같은창에 연속 띄우기 위해 title고정
	popupWin.focus();

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
	
	// 영상 재생 전 intro 처리 2012-05-24
/*	
	var mainUrl = new Array();
	mainUrl = url.split('/');
	
	if (mainUrl[1] == "kpeer") {
		var newWin = window.open("/kpeer/intro.asp?playerUrl="+url, winname, args);
	} else {
		var newWin=window.open(url,winname,args);
	}
*/	
	
	newWin.focus();
}

//팝업 - 위치 지정
function makeWin1(url, winname, width, height, scrollbars, xposition1, yposition1,ck){
   xposition=0; yposition=0;
   if (parseInt(navigator.appVersion) >= 4){
      xposition = (screen.width - width) / 2;
      yposition = (screen.height - height) / 2;
   }
   if (scrollbars == null){
      scrollbars = '0';
   }
   args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=0,"
         + "scrollbars=" + scrollbars + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
   + "screenx=" + xposition + ","  //NN Only
   + "screeny=" + yposition + ","  //NN Only
   + "left=" + xposition1 + ","     //IE Only
   + "top=" + yposition1;           //IE Only

   var newWin=window.open('http://www.i-scream.co.kr'+url,winname,args,ck)
   newWin.focus();
}
//팝업 - 위치 지정
function makeWin2(url, winname, width, height, scrollbars, xposition1, yposition1,ck){
   xposition=0; yposition=0;
   if (parseInt(navigator.appVersion) >= 4){
      xposition = (screen.width - width) / 2;
      yposition = (screen.height - height) / 2;
   }
   if (scrollbars == null){
      scrollbars = '0';
   }
   args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=1,"
         + "scrollbars=" + scrollbars + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
   + "screenx=" + xposition + ","  //NN Only
   + "screeny=" + yposition + ","  //NN Only
   + "left=" + xposition1 + ","     //IE Only
   + "top=" + yposition1;           //IE Only

   var newWin=window.open('http://www.i-scream.co.kr'+url,winname,args,ck)
   newWin.focus();
}

function makeWin3(p_url, winname, width, height, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    if(winX == "800") {
        winX = winX - winX/95;
        winX = winY*1000/700;
    } else {
        winY = winY - winY/28;
        winX = winX - winX/150;
    }
    winX = Math.round(winX, 0);
    winY = Math.round(winY, 0);

    var newWin = window.open('http://www.i-scream.co.kr'+p_url,"_blank","resizable=yes,hotkeys=yes,width="+winX+",height="+winY+",top=0,left=0");
    //var newWin = window.open(url,"_blank","status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top=0,left=0");
}

function makeWin3_local(p_url, winname, width, height, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    if(winX == "800") {
        winX = winX - winX/95;
        winX = winY*1000/700;
    } else {
        winY = winY - winY/28;
        winX = winX - winX/150;
    }
    winX = Math.round(winX, 0);
    winY = Math.round(winY, 0);

    var newWin = window.open(p_url,"_blank","resizable=yes,hotkeys=yes,width="+winX+",height="+winY+",top=0,left=0");
    //var newWin = window.open(url,"_blank","status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top=0,left=0");
}

function makeWin4(url, winname, width, height, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    if(winX == "800") {
        winX = winX - winX/95;
        winX = winY*1000/700;
    } else {
        winY = winY - winY/28;
        winX = winX - winX/150;
    }
    var newWin = window.open('http://www.i-scream.co.kr'+url,winname,"status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top=0,left=0");
}
function makeWin5(url, winname, width, height, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    if(winX == "800") {
        winX = winX - winX/95;
        winX = winY*1000/700;
    } else {
        winY = winY - winY/28;
        winX = winX - winX/150;
    }
    var newWin = window.open('http://www.i-scream.co.kr'+url,winname,"status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=yes,width="+winX+",height="+winY+",top=0,left=0");
}

function makeWin7(p_url, winname, width, height, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    if(winX == "800") {
        winX = winX - winX/95;
        winX = winY*1000/700;
    } else {
        winY = winY - winY/28;
        winX = winX - winX/150;
    }
    winX = Math.round(winX, 0);
    winY = Math.round(winY, 0);

    var newWin = window.open('http://www.i-scream.co.kr'+p_url,"_blank","resizable=yes,hotkeys=yes,width="+width+",height="+height+",top=0,left=0");
}

//미래에셋전용 팝업
function makeWin_mirae(url, winname, width, height, scrollbars){
   xposition=0; yposition=0;
   xposition = (screen.width - width) / 2;
   yposition = (screen.height - height) / 2;

   if (scrollbars == null){
      scrollbars = '0';
   }
   args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=no,"
         + "scrollbars=" + scrollbars + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
   + "screenx=" + xposition + ","  //NN Only
   + "screeny=" + yposition + ","  //NN Only
   + "left=" + xposition + ","     //IE Only
   + "top=" + yposition;           //IE Only

   var newWin=window.open('http://www.i-scream.co.kr'+url,winname,args)
   newWin.focus();
}


function makeWinAni(url, winname, width, height, scrolltype){
   xposition=0; yposition=0;
   if (parseInt(navigator.appVersion) >= 4){
      xposition = (screen.width - width) / 2;
      yposition = (screen.height - height) / 2;
   }
   args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=1,"
         + "scrollbars=" + scrolltype + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
		 + "screenx=" + xposition + ","  //NN Only
		 + "screeny=" + yposition + ","  //NN Only
		 + "left=" + xposition + ","     //IE Only
		 + "top=" + yposition;           //IE Only

   var newWin=window.open('http://www.i-scream.co.kr'+url,winname,args)
   newWin.focus();
}

function viewMovies(tableName, contents_no, codeId, preNext){
	
  var v_height = screen.height;
  var linkPage;
  //window.status = v_height;
  if (v_height < 768 ){
		makeWin('/kpeer/movPlayer_small.asp?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId+'&closeType=1&preNext='+preNext+'&fs=500', 'viewMovies', 778, 600,0);
	}
	else{
		makeWin('/kpeer/movPlayer.asp?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId+'&closeType=1&preNext='+preNext+'&fs=500', 'viewMovies', 840, 660,0);
	}
}
function viewMovies_oc(tableName, contents_no, codeId, preNext){
	var linkPage;
	alert("동영상플레이어 미작업");
	//makeWin('/common/kpeer/movPlayer_oc_student.do?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId+'&closeType=1&preNext='+preNext+'&fs=500', 'viewMovies', 838, 660,0);
}
function viewMovies2(tableName, contents_no, codeId, preNext, pix){	
  var linkPage;
   var v_height = screen.height;
  if (v_height < 768 ){
		makeWin('/kpeer/movPlayer_small.asp?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId+'&closeType=1&preNext='+preNext+'&fs='+pix+'', 'viewMovies', 778, 600,0);
	}
	else{
		makeWin('/kpeer/movPlayer.asp?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId+'&closeType=1&preNext='+preNext+'&fs='+pix+'', 'viewMovies', 838, 660,0);
	}
}


function showAni(codeId){
  var linkPage;

	//alert(codeId);
//  hideQuickMenu();
	makeWinAni('/Ani/viewAni.asp?codeId='+codeId, 'viewMovies', 1024, 768);

	/*
	myLightWindow.activateWindow({
	href: '/pcube/movPlayer.asp?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId,
	width:853,
	height:664}
	);
	*/
}
//모듈띄우기(2013 XML 구조 변경 버젼)
function viewModule2013(tableName, contents_no, orgVector, codeId){
	
	var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/';
	
	if (orgVector.split('/')[4].indexOf(".swf") > -1){
		flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/';
	}
	
	if(orgVector.split('/').length > 6)//영어 부분 한뎁스 더
	{
		if (orgVector.split('/')[6].indexOf(".swf") > -1)
			{
				
				var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/';
			}
	}
	
	if (orgVector.split('/').length > 7)//창의 부분 한뎁스 더
	{
		var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/'+orgVector.split('/')[6]+'/';
	}
	
	var vis_check = "flashViewer.swf?";

	if (orgVector.indexOf("/2014/chv_3/") > -1 || orgVector.indexOf("/2014/chv_4/") > -1 || orgVector.indexOf("/2014/euv304/") > -1 || orgVector.indexOf("/2014/miv_304/") > -1)
	{
		vis_check = "flashViewer_vis.swf?";
	}

	var chapterinfo = orgVector.split('?')[0];
	chapterinfo = chapterinfo.replace('/data/files/2013/','')
	var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/';
	
	if (orgVector.indexOf("/2014/mis_304/") > -1)
	{
		vis_check = "flashViewer_kyo.swf?";
		flashPath = flashPath+"mis_304/";
	}
	orgVector = flashPath + vis_check + orgVector.split('?')[1];
	makeWin3(flashPath+'viewFlash.asp?flashWidth=1012&flashHeight=664&displaySizeDefault=y&chapterinfo='+chapterinfo +'&orgVector='+orgVector+'&codeid='+codeId+'&skin_num=1','images', 1012,664,0);
}

//모듈띄우기(팝업)
function viewModule(tableName, contents_no, orgVector, codeId){
	
	var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/';
	
	if (orgVector.split('/')[4].indexOf(".swf") > -1){
		flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/';
	}
	
	if(orgVector.split('/').length > 6)//영어 부분 한뎁스 더
	{
		if (orgVector.split('/')[6].indexOf(".swf") > -1)
			{
				
				var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/';
			}
	}
	
	if (orgVector.split('/').length > 7)//창의 부분 한뎁스 더
	{
		var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/'+orgVector.split('/')[6]+'/';
	}
	makeWin3(flashPath+'viewFlash.asp?flashWidth=1012&flashHeight=664&displaySizeDefault=y&orgVector='+orgVector+'&codeid='+codeId+'&skin_num=1','images', 1012,664,0);
}

/*플래시 플레이어 신규*/
function viewModule_ad(tableName, contents_no, orgVector, codeId){

  var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/';

	if (orgVector.split('/')[4].indexOf(".swf") > -1){
		flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/';
	}

	if(orgVector.split('/').length > 6)//영어 부분 한뎁스 더
	{
		if (orgVector.split('/')[6].indexOf(".swf") > -1)
		{
			
			var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/';
		}
	}
	if (orgVector.split('/').length > 7)//창의 부분 한뎁스 더
	{
		var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/'+orgVector.split('/')[6]+'/';
	}
	
  makeWin3(flashPath+'viewFlash.asp?flashWidth=1012&flashHeight=664&displaySizeDefault=y&orgVector='+orgVector+'&codeid='+codeId+'&skin_num=1','images', 1012,664,0);
}


//모듈띄우기(팝업)
function viewModule_oc(tableName, contents_no, orgVector, codeId){
  var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/';
  makeWin3(flashPath+'viewFlash.asp?school_mode=student&flashWidth=1012&flashHeight=664&displaySizeDefault=y&orgVector='+orgVector+'&codeId='+codeId,'images', 1012,664,0,0,0);
}


//개별 이미지

function viewImagesContentsNo(contentsNO, viewType){
  //makeWin1('/curriculum/img.asp?closeType=1&num='+contentsNO+'&viewType='+viewType,'images', 1012,700,0,0,0);  //org
  //makeWin1('/curriculum/img.asp?closeType=1&num='+contentsNO+'&viewType='+viewType,'images', 1012,665,0,0,0);
  makeWin1('/curriculum/img.asp?closeType=1&num='+contentsNO+'&viewType='+viewType,'images', 1009,661,0,0,0);
}
//이미지 묶음
function viewImages(codeId, subjectId, subjectNo){
  //makeWin1('/curriculum/img.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1012, 700,1,0,0);//org
  makeWin1('/curriculum/img.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1009,661,0,0);
}
//이미지 묶음
function viewImages_ad(codeId, subjectId, subjectNo){
 makeWin1('/curriculum/img_34.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1009,661,0,0,0); //org
 //makeWin1('/curriculum/img_34.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1012, 665,0,0,0); //org
	//2013 renewal : IE8 size 맞춤 by wgkim	
 //makeWin1('/curriculum/img_34.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1031,666,1,0,0); //ok 
}

//이미지 묶음
function viewImages_nurinori(codeId, subjectId, subjectNo){
  makeWin1('/curriculum/img_nurinori.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1012, 700,1,0,0);
}

//이미지 묶음
function viewImages_nn(codeId, subjectId, subjectNo){
  makeWin1('/curriculum/img_nurinori.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1012, 700,1,0,0);
}


//이미지 묶음 창의적 체험 활동 - 계기교육
function viewImages_sg(codeId){
  //makeWin1('/discretion/img2012.asp?codeId='+codeId, 'subjectImage', 1012, 700,1,0,0);
  makeWin1('/discretion/img2012.asp?codeId='+codeId, 'subjectImage', 1032, 668,1,0,0);
}

function viewImages_Local(num){
  makeWin('/curriculum/img.asp?viewType=2&closeType=1&num='+num,'images', 1014,664);
}

//지역사진보기
function localPhoto(){
  makeWin1('/curriculum/pop_local.asp','local', 1015, 665,0,0,0);
}

function viewChasi(codeId){
  makeWin1('/curriculum/curriculum.asp?codeId='+codeId,codeId,1014, 665, 0, 0, 0);
}

//스크랩 데이터 보기
function viewScrapData(codeId){
  window.open('/myscrap/myscrap_datashow.asp?codeId='+codeId);
}
function MovByFlash(url){
  makeWin(url,'MovByFlash', '840', '660');
}

function SwfByFlash(url){
  makeWin3(url,'SwfByFlash', '840', '660','');
}

function helperNew(){
  makeWin('/curriculum/pop_help01.asp','helper', '1014', '660');
}

function timerNew(){
  makeWin2('/curriculum/pop_timer.asp','timer', '615', '530');
}
//판서/flash/boardMain.swf
function boardMain(){
  makeWin3('/include/board.asp','boardMain', 963, 662);
}
//알림판
function viewNotice(){
  var winX = screen.availWidth;
  var winY = screen.availHeight;
//  alert(screen.availWidth +' * ' + screen.availHeight;
//  makeWin3('/notice/noticeView.asp?winY='+winY+'&winX='+winX,'noticeBoard', winX, winY);

  makeWin3('/schoolmemo/memo.asp?winY='+winY+'&winX='+winX,'noticeBoard', winX, winY);
}

function screenCover(){

  if(document.getElementById('screenCover').style.display == 'none'){
   document.getElementById('screenCover').style.width =document.body.offsetWidth +'px';
	document.getElementById('screenCover').style.height =document.body.offsetHeight +'px';
   document.getElementById('screenCover').style.display = 'block';
  }else{
    document.getElementById('screenCover').style.display = 'none';
  }
}


function colorPan(){

  if(document.getElementById('colorPan').style.display == 'none'){

	document.getElementById('colorPan').style.width =document.body.offsetWidth;
	document.getElementById('colorPan').style.height =document.body.offsetHeight-50;
	document.getElementById('colorPan').style.display = 'block';
  }else{
    document.getElementById('colorPan').style.display = 'none';
  }
}


// 숫자만 입력하도록 검사 (document.form[0].money, 가격)
function checkNumber(obj, objName){
	var result;

	result = trim(obj.value);		// [trim.js] 공백제거

	if (isNaN(result)){
		alert( objName + "숫자로만 입력하세요.");
		obj.focus();

		if (obj.type == "text") obj.select();
		return(false);
	}
}
// 라디오버튼의 선택여부 알아내기
function checkRadio(strObj, msg)	{
	var msg;
	if (strObj.length > 1) {
		for (var inx = 0; inx < strObj.length; inx++) {
			if (strObj[inx].checked) return true;
		}
	} else {
		if (strObj.checked) return true;
	}
	alert(msg +" 선택해 주세요");
	strObj[0].focus();
	return false;
}

function swf(src, width, height) {
 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="' + width + '" height="' + height + '">';
 html += '<param name="movie" value="' + src + '" />';
 html += '<param name="quality" value="high" />';
//html += '<param name="menu" value="false" />';
 html += '<param name="wmode" value="transparent" />';
 html += '<param name="allowScriptAccess" value="always" />';
 html += '<embed src="' + src + '" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="' + width + '" height="' + height + '" wmode="transparent"></embed>';
 html += '<base href="' + src + '">';
 html += '</object>';
 
 document.write(html);
}

function swf_nobase(src, width, height) {
	 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
	  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
	  ' width="' + width + '" height="' + height + '">';
	 html += '<param name="movie" value="' + src + '" />';
	 html += '<param name="quality" value="high" />';
	//html += '<param name="menu" value="false" />';
	 html += '<param name="wmode" value="transparent" />';
	 html += '<param name="allowScriptAccess" value="always" />';
	 html += '<embed src="' + src + '" quality="high"' +
	  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
	  ' type="application/x-shockwave-flash"' +
	  ' width="' + width + '" height="' + height + '" wmode="transparent"></embed>';

	 html += '</object>';	 
	 document.write(html);
}


function swf_chasi(src, width, height) {

 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="' + width + '" height="' + height + '" id="FlashID" >';
 html += '<param name="movie" value="' + src + '" />';
 html += '<param name="quality" value="high" />';
//html += '<param name="menu" value="false" />';
//html += '<param name="wmode" value="default" />';
html += '<param name="wmode" value="transparent" />';
 html += '<param name="allowScriptAccess" value="always" />';
 html += '<embed src="' + src + '" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="' + width + '" height="' + height + '" wmode="default"></embed>';
 html += '<base href="' + src + '">';
 html += '</object>';


/*

html ='	<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" '
html += '  id="FlashID" width="'+width+'" height="'+height+'" '
html += '  codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"> '
html += '		<param name="movie" value="'+src+'" /> '
html += '		<param name="quality" value="high" /> '
html += '		<param name="bgcolor" value="#869ca7" /> '
html += '		<param name="allowScriptAccess" value="always" /> '
html += '		<param name="wmode" value="transparent" />';
html += '		<param name="allowScriptAccess" value="always" />';
html += '       <embed src="'+src+'" quality="high" bgcolor="#869ca7" '
html += '          width="'+width+'" height="'+height+'" align="middle" '
html += '           play="true" loop="false" quality="high" allowScriptAccess="always" '
html += '           type="application/x-shockwave-flash" '
html += '           pluginspage="http://www.macromedia.com/go/getflashplayer"> '
html += '       </embed> '
html += '   </object> '
*/
 document.write(html);
}

function swf_song_room(src, width, height) {
 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="' + width + '" height="' + height + '">';
 html += '<param name="movie" value="' + src + '" />';
 html += '<param name="quality" value="high" />';
// html += '<param name="menu" value="false" />';
 html += '<param name="wmode" value="transparent" />';
 html += '<param name="allowScriptAccess" value="always" />';
 html += '<param name="allowFullScreen" value="true" />';
 html += '<embed src="' + src + '" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="' + width + '" height="' + height + '" wmode="transparent"></embed>';
 html += '<base href="' + src + '">';
 html += '</object>';
// alert(html);
 document.write(html);
}


function swfAni(src) {
 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="100%" height="100%">';
 html += '<param name="movie" value="' + src + '" />';
 html += '<param name="quality" value="high" />';
 html += '<param name="menu" value="false" />';
 html += '<param name="wmode" value="transparent" />';
 html += '<param name="allowScriptAccess" value="always" />';
 html += '<embed src="' + src + '" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="100%" height="100%" wmode="transparent"></embed>';
 html += '<base href="' + src + '">';
 html += '</object>';
 document.write(html);
}


function MovByFlash(url){
  makeWin(url,'MovByFlash', '840', '660');
}

function SwfByFlash(url){
  makeWin3(url,'SwfByFlash', '840', '660','');
}
//function whenFlashSongPlay(p_file){
//	makeWin("/rest/music_room_player.asp?getfilename="+p_file, 'swf', 800, 600)
//}
function pasteMyScrap(scrapType, code, uid){
  makeWin ("/myScrap/addScrap.asp?code="+code+"&uid="+uid+"&scrapType="+scrapType,"스크랩하기",600, 368,0);
}

function pasteMyScrapYBM(scrapType, code, uid, code1, filename){
  makeWin ("/myScrap/addScrapYbm.asp?code="+code+"&uid="+uid+"&scrapType="+scrapType+"&code1="+code1+"&filename="+filename,"스크랩하기",368, 468,0);
}
function showAniNew(codeId, sub){
  var linkPage;


	//alert(codeId);
//  hideQuickMenu();


//091203 ORIGINAL
//	makeWinAni('/data/files/ani'+sub+'/viewFlash.asp?codeId='+codeId, 'viewMovies', 1024, 768);
//091203 EDIT
	makeWinAni('/data/files/ani'+sub+'/viewFlash.asp?codeId='+codeId, 'viewMovies', 1024, 768);


	//makeWinAni('/Ani/viewAni.asp?codeId='+codeId, 'viewMovies', 1024, 768);

	/*
	myLightWindow.activateWindow({
	href: '/pcube/movPlayer.asp?tableName='+tableName+'&contents_no='+contents_no+'&codeId='+codeId,
	width:853,
	height:664}
	);
	*/
}
/*
function showAniNew_LCMS(codeId, sub, aniaddr){
	makeWinAni('/data/files/ani'+sub+'/viewFlash.asp?codeId='+codeId+'&aniaddr='+aniaddr, 'viewMovies', 1024, 768);
}
*/
function showAniNew_LCMS(codeId, sub){
	makeWinAni('/data/files/ani'+sub+'/viewFlash.asp?codeId='+codeId+'&anino=1&aniaddr='+sub, 'viewMovies', 1024, 768);
	//&aniaddr='+sub
}
function checkSearchForm(){
	var form = document.searchForm;
	if(checkValue(form.kw, '검색어를')==false) return false;

//	if(opener.closed){
		window.open('/search/search.asp','chasiSearch');
		form.target = 'chasiSearch';
		form.action = "/search/search.asp";
/*
	}else{
		opener.location.href = 'http://www.i-scream.co.kr/search/search.asp?where=union&kw='+escape(form.kw.value);
		opener.focus();
		return false;
	}
*/
}

function recommend_chasi(contentsType, codeId, contentsNo)
{
	recommend_chasi(contentsType, codeId, contentsNo,'');
}

function recommend_chasi(contentsType, codeId, contentsNo, subjectId){
	if(confirm('선택하신 컨텐츠를 추천자료로 등록하시겠습니까?'))
	{
		document.RecomendFrm.contentsType.value = contentsType;
		document.RecomendFrm.codeId.value = codeId;
		document.RecomendFrm.contentsNo.value = contentsNo;
		document.RecomendFrm.subjectId.value = subjectId;
		document.RecomendFrm.target = 'ifDetail';
		document.RecomendFrm.action = "/curriculum/recommend.asp";
		document.RecomendFrm.submit();
	}
}

function mainGpki(grade){

if (grade == 10)
{
	alert('특수학교 교사로 인증신청하셨습니다.\n\n아이스크림 팩스 또는 이메일로 재직증명서 사본을 보내주시면\n\n관리자가 검토 후 유료회원으로 전환해 드리도록 하겠습니다.');
}
else{
	var today = new Date(); //오늘에 날짜
	var mday = new Date("apr 2, 2009"); //특정 날짜 넣는곳(월:jan,feb,mar,apr,may.....일, 년도)
	var tmime = (mday.getTime()- today.getTime() );
	var itime = 24 * 60 * 60 * 1000;
	var fdday = tmime / itime;
	var dday = Math.floor(fdday);


	if(confirm('교사인증을 받지 않으시면 컨텐츠 이용에 제한이 있습니다.\n[확인]클릭 시, 교사인증 페이지로 이동합니다')){
		location.href="/member/join_step03.asp"
		}
	}
}

//쉬는시간 베스트
function ChangeBestRest(idx){
  for(var i=1;i<=5;i++){
	if (document.getElementById('rest_bestSect_'+i))
	{
		if(i==idx){
		  document.getElementById('rest_bestSect_'+i).style.display = 'block';
		}else{
		  document.getElementById('rest_bestSect_'+i).style.display = 'none';
		}
	}

  }
}

function tCodeSearch(){
		document.tSearch.submit();
}

//1,2학년 캐릭터 설명
function popchinfo(){
	var winX = screen.availWidth;
	var winY = screen.availHeight;
	makeWin3_local('/multiview/main/popup/Pop_Shinfo.do?winX='+winX+'&winY='+winY,'chinfo', winX, winY);
}

function confirmlogin(){
	alert("유료회원만 이용하실 수 있는 콘텐츠 입니다.");
}

/*************************************************************************************************
* 게시판 아이디 클릭시 작동 스크립트
*************************************************************************************************/
function memInfo(idx){
	for(i=0;i<=20;i++){
		if(document.getElementById('info'+i)){
			if(i==idx){
				if(document.getElementById('info'+i).style.display=='block'){
					document.getElementById('info'+i).style.display='none';
					break;
				}else{
					document.getElementById('info'+i).style.display='block';
				}
			}else{
				document.getElementById('info'+i).style.display='none';
			}
		}
	}
}

function memInfo2(id){
	makeWin("/user/member/popup/memInfo.do?s_id="+id, 'memInfo', 410,475);
}

function addFriend(id, idx){
	if(id=='0'){
		alert('이미 이웃입니다.');
	}else{
		if(document.getElementById('info'+idx).style.display=='block') document.getElementById('info'+idx).style.display='none';
		//if(confirm('이웃신청을 하시겠습니까?')){
      makeWin("/member/addFriend.asp?tId="+id, "friens", 403,232);
			//location.href("/mypage/addFriend_rs.asp?tId="+id);
		//}
	}
}


function sendNote(id, idx){
  if(document.getElementById('info'+idx).style.display=='block') document.getElementById('info'+idx).style.display='none';
  makeWin('/note/note_send.asp?mem_id='+id,'sendNote', 470,340);
}


function whenQuickAsk(){
  if(document.getElementById('quickask').style.display=='block'){
	document.getElementById('quickask').style.display='none';
  }else{
	document.getElementById('quickask').style.display='block';
  }
}
function QuickMap(){
  if(document.getElementById('all_view_list').style.display=='block'){
	document.getElementById('all_view_list').style.display='none';
  }else{
	document.getElementById('all_view_list').style.display='block';
  }
}

function pop_renew_notice(){
	makeWin("/popup/use_infopop01.asp?page=1", 'renew_pop', 660,600,1);
}


/*플레이어에서 동영상 호출할 때*/
var flash_codeId = 0;
function viewMovieFlash(contents_no, movtype){
	var v_bit = "700";	//동영상 화질 -- flash 에서 H 와 L 값이 넘어온다.
	if (movtype == "L")
		v_bit = "300";

  var v_height = screen.height;
  if (v_height < 768 ){
		makeWin('/kpeer/movPlayer_small.asp?tableName=V_CONTENTS_MOV&contents_no='+contents_no+'&codeId='+flash_codeId+'&closeType=1&preNext=&fs='+ v_bit, 'viewMovies', 778, 600);
	}
	else{
		makeWin('/kpeer/movPlayer.asp?tableName=V_CONTENTS_MOV&contents_no='+contents_no+'&codeId='+flash_codeId+'&closeType=1&preNext=&fs='+ v_bit, 'viewMovies', 838, 660);
	}
}

/*3,4학년 영어 플래시 플레이어 */  
function viewModule_eg(tableName, contents_no, orgVector, codeId){
  var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/'+orgVector.split('/')[4]+'/'+orgVector.split('/')[5]+'/';

  makeWin3(flashPath+'viewFlash.asp?flashWidth=1012&flashHeight=664&displaySizeDefault=y&orgVector='+orgVector+'&codeid='+codeId+'&skin_num=1','images', 1012,664,0);
}


function filedown_bylogon(t_name,t_ext,d_name){
	makeWin('/monthlyinf/down.asp?fileno='+t_name+'&mame='+t_ext+'&filename='+d_name,'filedown_bylogon',200,200,0);

}

/*2010교무수첩 판매 페이지 용*/
function switchDDimg(obj){
             var dl,dt,dd;
             dl = obj;
             dd = obj.parentNode;
             while(dl.nodeName != "DL") dl = dl.parentNode;
             for(var i=0; i<dl.childNodes.length; i++) {
                           if(dl.childNodes[i].nodeName == "DT"){
                                        dt = dl.childNodes[i];
                                        dt.childNodes[0].src = obj.childNodes[0].src;
                           } else if(dl.childNodes[i].nodeName == "DD") dl.childNodes[i].className = "disActive";
             }
             dd.className = "active";
}

/*2010 6월 도서이벤트 리다이렉트 팝업용*/

function eventRedirect(idx){
	var newWin=window.open('/event/eventRedirect.asp?linkIdx='+idx);
   newWin.focus();
}
/*이벤트 우편번호 검색 팝업용*/
function popEventFindAddr(){
	makeWin('/event/post_by_address.asp','주소검색','447','398');
}
/*숫자만 입력가능하도록*/
	function handlerNum( obj ) {
		//숫자만 입력 받게끔 하는 함수.
		//키코드의 값과 기존에 입력되어있는 값을 토대로 제어한다.
		e = window.event; //윈도우의 event를 잡는것입니다.

		//입력 허용 키
		//1,2,3만 허용한다. 숫자중
		if( ( e.keyCode >=  48 && e.keyCode <=  57 ) ||   //숫자열 0 ~ 9 : 48 ~ 57
			( e.keyCode >=  96 && e.keyCode <= 105 ) ||   //키패드 0 ~ 9 : 96 ~ 105
			e.keyCode ==   8 ||    //BackSpace
			e.keyCode ==  46 ||    //Delete
			//e.keyCode == 110 ||    //소수점(.) : 문자키배열
			//e.keyCode == 190 ||    //소수점(.) : 키패드
			e.keyCode ==  37 ||    //좌 화살표
			e.keyCode ==  39 ||    //우 화살표
			e.keyCode ==  35 ||    //End 키
			e.keyCode ==  36 ||    //Home 키
			e.keyCode ==   9       //Tab 키
			) 
		{
				/*
			if ( (e.keyCode ==   8 ||    //BackSpace
					e.keyCode ==  9 ||    //Tab
					e.keyCode ==  46 ||    //Delete
					e.keyCode ==  37 ||    //좌 화살표
					e.keyCode ==  39 )     //우 화살표
					//obj.value != ""
				)
			{
				return; //-->입력시킨다.
			}
			else
			{
				e.returnValue=false; //-->입력되지않는다.
				obj.focus();
			}
				*/
			return;
		}
		else //숫자가 아니면 넣을수 없다.
		{
			//obj.focus();
			//alert('숫자만 입력가능합니다');
			e.returnValue=false;
			obj.focus();
		}
	}

	function fnClassSel(class_idx){
		switch (class_idx)
		{
			case 1:
				document.getElementById("student1").style.display = "block";
				document.getElementById("student2").style.display = "none";
				document.getElementById("student3").style.display = "none";
				document.getElementById("student4").style.display = "none";
				document.getElementById("student5").style.display = "none";
				document.getElementById("student6").style.display = "none";
				/*document.getElementById("stCon1").style.display = "block";
				document.getElementById("stCon2").style.display = "none";
				document.getElementById("stCon3").style.display = "none";
				document.getElementById("stCon4").style.display = "none";
				document.getElementById("stCon5").style.display = "none";
				document.getElementById("stCon6").style.display = "none";*/
				document.all.class_img1.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_1_on.gif";
				document.all.class_img2.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_2_off.gif";
				document.all.class_img3.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_3_off.gif";
				document.all.class_img4.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_4_off.gif";
				document.all.class_img5.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_5_off.gif";
				document.all.class_img6.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_6_off.gif";
				break;		
			case 2:
				document.getElementById("student1").style.display = "none";
				document.getElementById("student2").style.display = "block";
				document.getElementById("student3").style.display = "none";
				document.getElementById("student4").style.display = "none";
				document.getElementById("student5").style.display = "none";
				document.getElementById("student6").style.display = "none";
				/*document.getElementById("stCon1").style.display = "none";
				document.getElementById("stCon2").style.display = "block";
				document.getElementById("stCon3").style.display = "none";
				document.getElementById("stCon4").style.display = "none";
				document.getElementById("stCon5").style.display = "none";
				document.getElementById("stCon6").style.display = "none";*/
				document.all.class_img1.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_1_off.gif";
				document.all.class_img2.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_2_on.gif";
				document.all.class_img3.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_3_off.gif";
				document.all.class_img4.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_4_off.gif";
				document.all.class_img5.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_5_off.gif";
				document.all.class_img6.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_6_off.gif";
				break;
			case 3:
				document.getElementById("student1").style.display = "none";
				document.getElementById("student2").style.display = "none";
				document.getElementById("student3").style.display = "block";
				document.getElementById("student4").style.display = "none";
				document.getElementById("student5").style.display = "none";
				document.getElementById("student6").style.display = "none";
				/*document.getElementById("stCon1").style.display = "none";
				document.getElementById("stCon2").style.display = "none";
				document.getElementById("stCon3").style.display = "block";
				document.getElementById("stCon4").style.display = "none";
				document.getElementById("stCon5").style.display = "none";
				document.getElementById("stCon6").style.display = "none";*/
				document.all.class_img1.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_1_off.gif";
				document.all.class_img2.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_2_off.gif";
				document.all.class_img3.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_3_on.gif";
				document.all.class_img4.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_4_off.gif";
				document.all.class_img5.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_5_off.gif";
				document.all.class_img6.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_6_off.gif";
				break;
			case 4:
				document.getElementById("student1").style.display = "none";
				document.getElementById("student2").style.display = "none";
				document.getElementById("student3").style.display = "none";
				document.getElementById("student4").style.display = "block";
				document.getElementById("student5").style.display = "none";
				document.getElementById("student6").style.display = "none";
			/*	document.getElementById("stCon1").style.display = "none";
				document.getElementById("stCon2").style.display = "none";
				document.getElementById("stCon3").style.display = "none";
				document.getElementById("stCon4").style.display = "block";
				document.getElementById("stCon5").style.display = "none";
				document.getElementById("stCon6").style.display = "none";*/
				document.all.class_img1.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_1_off.gif";
				document.all.class_img2.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_2_off.gif";
				document.all.class_img3.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_3_off.gif";
				document.all.class_img4.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_4_on.gif";
				document.all.class_img5.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_5_off.gif";
				document.all.class_img6.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_6_off.gif";
				break;
			case 5:
				document.getElementById("student1").style.display = "none";
				document.getElementById("student2").style.display = "none";
				document.getElementById("student3").style.display = "none";
				document.getElementById("student4").style.display = "none";
				document.getElementById("student5").style.display = "block";
				document.getElementById("student6").style.display = "none";
				/*document.getElementById("stCon1").style.display = "none";
				document.getElementById("stCon2").style.display = "none";
				document.getElementById("stCon3").style.display = "none";
				document.getElementById("stCon4").style.display = "none";
				document.getElementById("stCon5").style.display = "block";
				document.getElementById("stCon6").style.display = "none";*/
				document.all.class_img1.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_1_off.gif";
				document.all.class_img2.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_2_off.gif";
				document.all.class_img3.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_3_off.gif";
				document.all.class_img4.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_4_off.gif";
				document.all.class_img5.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_5_on.gif";
				document.all.class_img6.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_6_off.gif";
				break;
			case 6:
				document.getElementById("student1").style.display = "none";
				document.getElementById("student2").style.display = "none";
				document.getElementById("student3").style.display = "none";
				document.getElementById("student4").style.display = "none";
				document.getElementById("student5").style.display = "none";
				document.getElementById("student6").style.display = "block";
			/*	document.getElementById("stCon1").style.display = "none";
				document.getElementById("stCon2").style.display = "none";
				document.getElementById("stCon3").style.display = "none";
				document.getElementById("stCon4").style.display = "none";
				document.getElementById("stCon5").style.display = "none";
				document.getElementById("stCon6").style.display = "block";*/
				document.all.class_img1.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_1_off.gif";
				document.all.class_img2.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_2_off.gif";
				document.all.class_img3.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_3_off.gif";
				document.all.class_img4.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_4_off.gif";
				document.all.class_img5.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_5_off.gif";
				document.all.class_img6.src = "http://download.i-scream.co.kr/images_renew/main/btn_my_class_6_on.gif";
				break;
		}
	}

		
	function open_win(url) {	//3,4학년 스토리타임월드투어 
		window.open(url);
	}

	function open_win_mydic_print(url) {	//3,4학년 그림사전

		window.open(url,"printWin","width=650,height=800,location=0,menubar=0,resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=0");

	}

	function open_win_listenandwrite1_print(url) {	//3학년2학기 3차시 Listen and Write

		window.open(url,"printWin","width=650,height=800,location=0,menubar=0,resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=0");

	}



 

/*YBM(상록) 3,4년 차시창 띄우기*/
function popYBM_Module34(contents_no, orgVector, codeId){
  makeWin3(orgVector+'&flashWidth=1171px&flashHeight=768px&displaySizeDefault=y&contents_no='+contents_no+'&codeid='+codeId+'&skin_num=1&gardeGubun=34','images', 1012,664,0);

} 


/*YBM(상록) 5,6년 차시창 띄우기*/
function popYBM_Module56(contents_no, orgVector, codeId){
  makeWin3(orgVector+'&flashWidth=1171px&flashHeight=768px&displaySizeDefault=y&contents_no='+contents_no+'&codeid='+codeId+'&skin_num=1&gardeGubun=56','images', 1012,664,0);

} 	

/*YBM차시창 띄우기*/
function popYBM_Module(contents_no, orgVector, codeId){
  makeWin3(orgVector+'?flashWidth=1171px&flashHeight=768px&displaySizeDefault=y&contents_no='+contents_no+'&codeid='+codeId+'&skin_num=1','images', 1012,664,0);
  //var url = orgVector+"&contents_no="+contents_no+"&codeid="+codeId;
  //var newWin = window.open(url,"_blank","resizable=yes,hotkeys=yes,width="+1171+",height="+768+",top=0,left=0");
} 
	
function makeWin_Full(url, winname, scrolltype) { //전체창으로 띄우기
  //win = window.open(url, 'winname1', 'fullscreen=yes, resizable=yes, scrollbars=yes, x=100,y=200,width=' + w + ',height=' + h);

	var wX = screen.availWidth;
	var wY = screen.availHeight;

	makeWin(url, winname, wX, wY, scrolltype)
} 

/*
특수문자 제한 스크립트
*/
function inputCheckSpecial(obj)
{
var str = obj.value;
var err = 0;
var re = /[~!@\#$%<>^&*\()\-=+_\']/gi;

        for (var i=0; i<str.length; i++)
        {
                var chk = str.substring(i,i+1);
                if(!chk.match(/[~!@\#$%<>^&*\()\-=+_\']/gi))
                {
					err = err + 1;
                }

			//	alert(err)
        }
        if (err > 0)
        {
              //  alert("특수문자는 사용할수 없습니다");
			//	return false
               //obj.focus();
        }
} 

// 암시적 레이블 방식 명시적으로 적용
function explicitLabel(cssName, margin) {
	$('label[class*='+cssName+']').css('padding-left', function() {return $(this).next().outerWidth(true)});
	$('input[class*='+cssName+']').css({
		'margin-left' : function() {
			return -$(this).prev().outerWidth(true)
		},
		'margin-right' : function() {
			if($(this).next().is('label')) {
			if (margin) {
				return $(this).prev().width() + margin;
			} else {
				return $(this).prev().width();
			}
			}
		}
	});
}

// 2013 리뉴얼 핵심콕콕
function viewCok(url, winname, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    
    winX = winX - winX/6;
    winY = winY - winY/7;
  
    var newWin = window.open(url,winname,"status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top=0,left=0");
}

//2013 두산동아 open
function doosan_sil5(pagenum) {
	  var mainWin;
	  mainWin = window.open("/data/files/dds5/doosan_sil5.asp?pagenum=" + pagenum, "mainWin", "left=0, top=0, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=yes");
	  mainWin.focus();
}

function doosan_sil6(pagenum) {
	  var mainWin;
	  mainWin = window.open("/data/files/dds6/doosan_sil6.asp?pagenum=" + pagenum, "mainWin", "left=0, top=0, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=yes");
	  mainWin.focus();
}

function doosan_che5(pagenum) {
	  var mainWin;
	  mainWin = window.open("/data/files/ddc5/doosan_che5.asp?pagenum=" + pagenum, "mainWin", "left=0, top=0, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=yes");
	  mainWin.focus();
}

function doosan_che6(pagenum) {
	  var mainWin;
	  mainWin = window.open("/data/files/ddc6/doosan_che6.asp?pagenum=" + pagenum, "mainWin", "left=0, top=0, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=yes");
	  mainWin.focus();
}

function doosan_mi56(pagenum) {
	  var mainWin;
	  mainWin = window.open("/data/files/ddm56/doosan_mi56.asp?pagenum=" + pagenum, "mainWin", "left=0, top=0, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=yes");
	  mainWin.focus();
}

function hanjaSG(page) {
	  var mainWin;
	  mainWin = window.open(page,'hanjasingong','width=1000,height=700');
	  mainWin.focus();
}

function moj_josun(page) {
	  var mainWin;
	  url = "http://download.i-scream.co.kr/images_renew/2013/event/happy_school/josun/"+page+"/intro.html";
	  mainWin = window.open(url,'moj_josun','width=1000,height=680, left=0, top=0');
	  mainWin.focus();
}

function moj_maum(page) {
	  var mainWin;
	  url = "http://download.i-scream.co.kr/images_renew/2013/event/happy_school/maum/"+page+"/"+page+"01.html";
	  mainWin = window.open(url,'moj_maum','width=745,height=495, left=0, top=0');
	  mainWin.focus();
}

function moj_talkKing(page) {
	  var mainWin;
	  url = "http://download.i-scream.co.kr/images_renew/2013/event/happy_school/talkKing/"+page+"/intro.html";
	  mainWin = window.open(url,'moj_talkKing','width=1000,height=680, left=0, top=0');
	  mainWin.focus();
}

// 아침나라 팝업
function achim34(pagenum) {
	  makeWin3("/data/files/2014/mia_304/main.asp?pageno=" + pagenum,'auth2014', 1027,768,0);
}

//아침나라 팝업
function euj_304(pagenum) {
	  makeWin3("/data/files/2014/euj_304/main.asp?pageno=" + pagenum,'auth2014', 1027,768,0);
}

// 2014 검정교과 팝업
function auth2014(pagenum) {
	 // var mainWin;
	 // mainWin = window.open(pagenum, "mainWin", "left=0, top=0, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=yes");
	/*
	if ((pagenum.indexOf("/end_3/") > -1) || (pagenum.indexOf("/end_4/") > -1))  
	{
		makeWin7(pagenum,'auth2014', 1245,1080,0); // end_3 , end_4
	}
	else if ((pagenum.indexOf("/eny_3/") > -1) || (pagenum.indexOf("/eny_4/") > -1))
	{
		makeWin7(pagenum,'auth2014', 1023,768,0); // eny_3 , eny_4
	}
	else
	{
	*/
		makeWin3(pagenum,'auth2014', 1027,768,0);
	//}
	 // mainWin.focus();
}

//탈퇴팝업
function secessionDel(){
  makeWin1('/member/secessionDel.asp','local', 725, 665,1,0,0);
}



function getCutString(str, limit){
	var len = 0;
	for(var i=0; i<str.length; i++){
		len += chr_byte(str.charAt(i));
		if( len > limit ){
			str = str.substring(0, i+1) + '...';
			break;
		}
	}
	return str;
}


function chr_byte(chr){
	if(escape(chr).length > 4){
		return 2;
	}else{
		var unicode = chr.charCodeAt(0);
		if(unicode >= 65 && unicode <= 90){//대문자
			return 1.36;
		}else if(unicode >= 97 && unicode <= 122){
			return 1;
		}else{
			return 1;
		}
	}
}
