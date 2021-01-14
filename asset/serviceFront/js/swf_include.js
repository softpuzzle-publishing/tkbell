

/****************************************************| Flash |******************************************************************
*
*  Flash 전용 호출함수 id_name : ID또는Name 값, swf_name : 쇼크웨이브파일 경로(이름,GET값포함), wdith: 넓이값, height: 높이값
*
********************************************************************************************************************************/

function swf_func(id_name,swf_name,width,height){
	document.writeln("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='100%' height='100%' id='"+id_name+"' align='middle' >");
	//document.writeln("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='"+width+"' height='"+height+"' id='"+id_name+"' align='middle' >");
	document.writeln("<param name='movie' value='"+swf_name+"' />");
	document.writeln("<param name='quality' value='high' />");
	document.writeln("<param name='bgcolor' value='#ffffff' />");
	document.writeln("<param name='play' value='true' />");
	document.writeln("<param name='loop' value='true' />");
	document.writeln("<param name='wmode' value='transparent' />");
	//document.writeln("<param name='wmode' value='window' />"); 20120508 기존판서플래시
	document.writeln("<param name='scale' value='noscale' />");
	document.writeln("<param name='menu' value='true' />");
	document.writeln("<param name='devicefont' value='false' />");
	document.writeln("<param name='salign' value='LT' />");
	document.writeln("<param name='flashVars' value='' />");
	document.writeln("<param name='allowFullScreen' value='true' />");
	document.writeln("<param name='allowScriptAccess' value='sameDomain' />");
	document.writeln("</object>");
}

function yessam_swf_func(id_name,swf_name,width,height){
	document.writeln("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' width='"+width+"' height='"+height+"' id='"+id_name+"' align='middle' >");
	document.writeln("<param name='movie' value='"+swf_name+"' />");
	document.writeln("<param name='quality' value='high' />");
	document.writeln("<param name='bgcolor' value='#ffffff' />");
	document.writeln("<param name='play' value='true' />");
	document.writeln("<param name='loop' value='true' />");
	document.writeln("<param name='wmode' value='transparent' />");
	document.writeln("<param name='scale' value='noscale' />");
	document.writeln("<param name='menu' value='true' />");
	document.writeln("<param name='devicefont' value='false' />");
	document.writeln("<param name='salign' value='LT' />");
	document.writeln("<param name='flashVars' value='' />");
	document.writeln("<param name='allowFullScreen' value='true' />");
	document.writeln("<param name='allowScriptAccess' value='sameDomain' />");
	document.writeln("</object>");
}

function swf_include(url,widthNum,hightNum,Access,bgColor,wMode,vars){
	var codeStr = "";
	var id = url.split("/");
	if(id.length > 1) id = id[id.length-1];
	else id = id[0];
	codeStr += "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"";
	codeStr += "codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9.0.47.0\" id=\"" + id + "\" width=\""+widthNum+"\" height=\""+hightNum+"\">";
	codeStr += "<param name=\"allowScriptAccess\" value=\""+Access+"\" />";
	codeStr += "<param name=\"movie\" value=\""+url+"\" />";
	codeStr += "<param name=\"flashvars\" value=\""+vars+"\" />";
	codeStr += "<param name=\"menu\" value=\"false\" />";
	codeStr += "<param name=\"quality\" value=\"high\" />";
	codeStr += "<param name=\"wmode\" value=\""+wMode+"\" />";
	codeStr += "<param name=\"bgcolor\" value=\""+bgColor+"\" />";
	codeStr += "<embed src=\""+url+"\" flashvars=\""+vars+"\" allowScriptAccess=\""+Access+"\" menu=\"false\" quality=\"high\" name=\"" + id + "\" wmode=\""+wMode+"\"";
	codeStr += "devicefont=\"true\" bgcolor=\""+bgColor+"\"  width=\""+widthNum+"\" height=\""+hightNum+"\" align=\"middle\" type=\"application/x-shockwave-flash\"";
	codeStr += "pluginspage=\"http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash\" />";
	codeStr += "</object>";
	document.write(codeStr);
}

// 페이지 세로 사이즈
function setScroll(n){
	document.getElementById("contents_h").height=n;
}

function quick_menu(p_idx){
	var pid = p_idx.toString();

	var _x = screen.availWidth-10;
	var _y = screen.availHeight-20;

	switch (pid){
		case "0": window.open("/include/board.asp", "board", "width="+ _x +", height="+ _y +",top=0,left=0"); break;
		case "1":
      var _t = (screen.height - 530) / 2;
      var _l = (screen.width - 610) / 2;
			window.open("/curriculum/pop_timer.asp", "pop_timer", "resizable=1, width=610, height=530, top="+ _t +", left="+ _l +"");
			break;
		case "2":
      var _t = (screen.height - 660) / 2;
      var _l = (screen.width - 1014) / 2;
			window.open("/curriculum/pop_help01.asp", "pop_help01", "width=1014, height=660, top="+ _t +", left="+ _l +"");
			break;
		//case "3": window.open("/notice/noticeView.asp?winY="+ _y +"&winX="+ _x, "noticeView", "width="+ _x +", height="+ _y +", top=0, left=0"); break;
		case "3": window.open("/schoolmemo/memo.asp?winY="+ _y +"&winX="+ _x, "noticeView", "width="+ _x +", height="+ _y +", top=0, left=0, resizable = yes"); break;
		case "4":
      var _t = (screen.height - 665) / 2;
      var _l = (screen.width - 1014) / 2;
			window.open("/submake/", "submake", "width=1014, height=665, top="+ _t +", left="+ _l +"");
			break;
		case "5": location.href = "/submake/list.asp"; break;
	}
}


function swf_func2(id_name,swf_name,width,height){
document.writeln("<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='/asset/flash/swflash.cab#version=8,0,0,0' width='"+width+"' height='"+height+"' id='"+id_name+"' align='middle'>");
document.writeln("<param name='allowScriptAccess' value='always'>");
document.writeln("<param name='movie' value='"+swf_name+"'>");
document.writeln("<param name='quality' value='high'>");
document.writeln("<param name='bgcolor' value='#ffffff'>");
document.writeln("<param name='wmode' Value='Transparent'>");
document.writeln("<embed src='"+swf_name+"' width='"+width+"' height='"+height+"' type='application/x-shockwave-flash' wmode='transparent' />");
document.writeln("</object>");
}
