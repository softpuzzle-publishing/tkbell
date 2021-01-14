/*******************************************************
******                                            ******
******    ���ϸ� : Form_Check.js                  ******
******    ���� : �����ȣ, ���̵�ã�� �� ��üũ   ******
******                                            ******
*******************************************************/



//�̹��� �������� '080316 �߰�
function getImageSize(id) {

  var img = document.body.appendChild(document.createElement('img'));
  img.src = id.src;
  var w = img.offsetWidth;
  var h = img.offsetHeight;

  document.body.removeChild(img);
  return {width:w,height:h};
}


function imageResize(id, resizeType, resize){
  var imgId = document.getElementById(id);
  var size = getImageSize(document.getElementById(id));

  var width;
  var height;

//  alert(size.width + " = " + size.height);
  if(resizeType==1){ //���ΰ���
    if(size.width > resize){
      width = resize;
      height = (resize * size.height ) / size.width;
    }else{
      width = size.width;
      height = size.height;
    }
  }else if(resizeType==2){ //���ΰ���
    if(size.height > resize){
      height = resize;
      width = (resize * size.width) / size.height;
    }else{
      width = size.width;
      height = size.height;
    }
  }else if(resizeType==0){ //���μ��� ��� size���� �̳���...

    if(size.width > resize){
      width = resize;
      height = (resize * size.height ) / size.width;
    }else{
      width = size.width;
      height = size.height;
    }

    if(height > resize){
      height = resize;
      width = (resize * width) / height;
    }else{
      width = width;
      height = height;
    }
  }

//  alert(width + " = " + height);
  document.getElementById(id).style.width=width+'px';
  document.getElementById(id).style.height=height+'px';

//  window.resizeTo(width+10, height+49);
}



//���������� ������
  var IE = false ;
  if (window.navigator.appName.indexOf("Explorer") !=-1){
    IE = true;
  }

  function resizeIfr(obj, minHeight) {
	minHeight = minHeight || 10;


	try {
		var getHeightByElement = function(body) {
			var last = body.lastChild;
			try {
				while (last && last.nodeType != 1 || !last.offsetTop) last = last.previousSibling;
				return last.offsetTop+last.offsetHeight;
			} catch(e) {
				return 0;
			}

		}

		var doc = obj.contentDocument || obj.contentWindow.document;
		if (doc.location.href == 'about:blank') {
			obj.style.height = minHeight+'px';
			return;
		}


		if (/MSIE/.test(navigator.userAgent)) {
			var h = doc.body.scrollHeight;
		} else {
			var s = doc.body.appendChild(document.createElement('DIV'))
			s.style.clear = 'both';

			var h = s.offsetTop;
			s.parentNode.removeChild(s);
		}

		if (h < minHeight) h = minHeight;

		obj.style.height = h + 'px';
		if (typeof resizeIfr.check == 'undefined') resizeIfr.check = 0;
		if (typeof obj._check == 'undefined') obj._check = 0;


			setTimeout(function(){ resizeIfr(obj,minHeight) }, 200); // check 5 times for IE bug

	} catch (e) {
		//alert(e);
	}

}


//�����ȣ ã��(�ּ�ã�� ���� ��� �Է�)
function findPost(form,url){
	form.address.focus();
	var postwindow = window.open(url,'�ּ�ã��','width=410,height=424');
	postwindow.focus();
}

//���̵� ã��
function findId(form,url){
	var idwindow = window.open(url,'���̵�ã��','width=410,height=310');
	idwindow.focus();
}


// Ȯ�� ��� Ȯ���� �Է� ��η� �̵�
function goUrl(msg, url){
  if ( confirm (msg)) {
    location.replace(url);
  }
}

//�ѱ� üũ (�ѱۻ�����)
function checkHan(strObj , msg) {
	var strValue = strObj.value;
	var intCode = 0;
	var msg;

	for (i = 0; i < strValue.length; i++) {
		var intCode = strValue.charCodeAt(i)
		var strChar = strValue.substr(i,1).toUpperCase()
		intCode = parseInt(intCode)

		if ((strChar < "0" || strChar > "9") && (strChar < "A" || strChar > "Z") && ((intCode > 255) || (intCode < 0))) {
			alert(msg +" �ѱ��� �Է��� �� ����ϴ�.");
			strObj.focus();
			return false;
		}
	}
	return true;
}


//�ѱ��̸��Է�üũ
function checkName(strObj,msg) {
	if(strObj.value.length == 0) {
		alert(msg+" �Է��ϼ���.");
		strObj.focus();
		return false;
	}

	if(han_check(strObj) == true) {
		alert(msg+" �ѱ۷� �Է��ϼ���.");
		strObj.focus();
		return false;
	}
	return	true;
}

//��й�ȣ, ��й�ȣ Ȯ�� üũ
function checkPassword(strObj1, strObj2){
	var strValue1 = strObj1.value;
	var strValue2 = strObj2.value;
	if(strValue1 != strValue2) {
		alert("��й�ȣ���� ��й�ȣ Ȯ�ζ��� ��ġ���� �ʽ��ϴ�");
		strObj2.focus();
		return false;
	}
	return true;
}

//��� üũ
function checkSpace(strObj, msg) {
	var strValue = strObj.value;
	var intCode = 0;
	var msg;
	for (i = 0; i < strValue.length; i++) {
		var intCode = strValue.charCodeAt(i)
		var retChar = strValue.substr(i,1).toUpperCase()
		intCode = parseInt(intCode)
		if (retChar == " " ){
			alert(msg +"�����̽��� �����ø� �ȵ˴ϴ�.");
			strObj.focus();
			return false;
		}
	}
	return true;
}

// E-Mail üũ
function checkEmail(strObj) {
	var strValue = strObj.value;
	var intCode = 0;
	var flag =0;

	for (i = 0; i < strValue.length; i++) {
		var intCode = strValue.charCodeAt(i)
		var strChar = strValue.substr(i,1).toUpperCase()
		intCode = parseInt(intCode)
		if( strChar == "@" ) {
			flag +=1;
		}
		if( strChar == "." ) {
		  	flag +=1;
		}
	}
	if( flag < 2 ){
		alert("�̸��� ����� �����ּ���.");//�̸��� ��� üũ
		strObj.focus();
		return false;
	}
	return true;
}

// E-Mail üũ
function checkEmail2(strObj) {
	var strValue = strObj;
	var intCode = 0;
	var flag =0;

	for (i = 0; i < strValue.length; i++) {
		var intCode = strValue.charCodeAt(i)
		var strChar = strValue.substr(i,1).toUpperCase()
		intCode = parseInt(intCode)
		if( strChar == "@" ) {
			flag +=1;
		}
		if( strChar == "." ) {
		  	flag +=1;
		}
	}
	if( flag < 2 ){
		alert("�̸��� ����� �����ּ���.");//�̸��� ��� üũ
	}
	return true;
}

//�������
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

//����Ʈ �ڽ� ���� ����
function checkSelect(strObj , msg) {
	var msg;
    if (strObj.length > 1) {
        for (var inx = 1; inx < strObj.length; inx++) {
            if (strObj[inx].selected) return true;
        }
    } else {
        if (strObj.selected) return true;
    }
	alert(msg +" �������� �ʾҽ��ϴ�.");
    return false;
}


// ������ư�� ���ÿ��� �˾Ƴ���
function checkRadio(strObj, msg)	{
	var msg;
	if (strObj.length > 1) {
		for (var inx = 0; inx < strObj.length; inx++) {
			if (strObj[inx].checked) return true;
		}
	} else {
		if (strObj.checked) return true;
	}
	alert(msg +" ������ �ּ���");
	strObj[0].focus();
	return false;
}


function checkboxCheck(strObj, cbObjText){

	for(i=0; i < strObj.length ; i++){
		if ((strObj[i].checked == true)){
			return(true);		// ���õ� ��� ������
			break;
		}
	}
	alert("���õ� " + cbObjText + "����ϴ�.\n\n���� �����Ͽ� �ֽʽÿ�");
	strObj[0].focus();
	return(false);		// ���õ� ��� ������
}

//������
function onlyEnglish(chkObj, chkObjText){
	for(i = 0 ; i < chkObj.value.length ; i++){
		if((chkObj.value.charAt(i) < "A" || chkObj.value.charAt(i) > "Z" ) && (chkObj.value.charAt(i) < "a" || chkObj.value.charAt(i) > "z" )){
			alert(chkObjText + " " + "�������θ� �Է��ϼ���.");
			chkObj.focus();
			return(false);
		}
	}
}

//������2
function checkEnglish2(chkObj){
	for(i = 0 ; i < chkObj.value.length ; i++){
		if((chkObj.value.charAt(i) < "A" || chkObj.value.charAt(i) > "Z" ) && (chkObj.value.charAt(i) < "a" || chkObj.value.charAt(i) > "z" )){
			return(false);
		}
	}
}


// ����ͼ��ڸ� �ԷµǾ�°� �˻��� (document.form.username, '����ID')
// ������(-), �����(_) �Է°���
function onlyEngNum(chkObj, chkObjText){
	for(i = 0 ; i < chkObj.value.length ; i++){
		if((chkObj.value.charAt(i) < "A" || chkObj.value.charAt(i) > "Z" ) && (chkObj.value.charAt(i) < "a" || chkObj.value.charAt(i) > "z" ) && ( chkObj.value.charAt(i) < '0' || chkObj.value.charAt(i) > '9') && ( chkObj.value.charAt(i) != '-' && chkObj.value.charAt(i) != '_')){
			alert(chkObjText + " " + "������ ���ڷθ� �Է��ϼ���.");
			chkObj.focus();
			return(false);
		}
	}
}

/* ex)
	bCheck = form_chk_onlyEngNum(form.lid, "����ID");
	if ( bCheck == false ) return;
*/


// ���� Ư�� elementã��
function findElement(form, element){		// ã�� ��, ã�� ��ü�̸�(obj.name or 'lc_cd[]')
	for(i=0; i < form.elements.length ; i++){
		if(form.elements[i].name == element){
			element = form.elements[i];
			return(element);
		}
	}
}

/* ex)
	// �迭�� ����� ��ü�� �����ϱ�
	var selectObj = form_findElement(document.form, 'lc_cd[]');		// selectObj => document.form.elements[?]
*/


// �Է¿��� �˻� (document.form[0].title, ����)
function checkValue(obj, objName){
	var result;
	var msg;
	result = trim(obj.value);		// �������

	if (result == ""){
		if ( (obj.type == "text") || (obj.type == "textarea") || (obj.type == "password")){
			msg = "�Է�";
		}else{
			msg = "����";
		}

		alert( objName + " " + msg + "�ϼ���.");
		obj.focus();

		if (obj.type == "text") obj.select();
		return(false);
	}
}

/* ex)
	bCheck = form_chk_value(form.lid, "����ID");
	if ( bCheck == false ) return;
*/

// ���� �˻� (document.form[0].title, ����, �ּұ���, �ִ����) - �ѱ۵� ������ �����ϰ� �����.
function checkLength(obj, objName, minLen, maxLen){
	var result;
	var msg;

	result = trim(obj.value);		// [trim.js] �������
	if (result.length < minLen){
		alert( objName +" "+minLen + "�� �̻� �Է��ϼ���.");
		obj.focus();
		obj.select();

		return(false);
	}

	if (result.length > maxLen){
		alert( objName + " "+maxLen + "�� ���Ϸ� �Է��ϼ���.");
		obj.focus();
		obj.select();

		return(false);
	}
}

/* ex)
		bCheck = form_chk_value(form.lid, "����ID");
		if ( bCheck == false ) return;
*/

//����ڵ�Ϲ�ȣüũ
function checkCompany(obj){
	var sum = 0;
	var li_epno = new Array(10);
	var li_chkvalue = new Array(1,3,7,1,3,7,1,3,5);

	for( i = 0 ; i < 10 ; i ++ ){
		li_epno[i] = obj.substr(i, 1);
	}
	for( i = 0 ; i < 9 ; i++ ){
		sum += li_epno[i] * li_chkvalue[i];
	}

	sum = sum + ((li_epno[8] * 5) / 10);
	var li_y = sum%10 ;

	if( li_y == 0 ){
		epno_chk = 0 ;
	}else{
		epno_chk = 10 - li_y ;
	}

	if( epno_chk == li_epno[9] ){
		return true;
	}else{
		alert('��ȿ���� ���� ����ڵ�Ϲ�ȣ �Դϴ�. Ȯ�����ּ���');
		obj.focus();
		return false;
	}
}


//�ֹι�ȣ üũ
function checkResNumber(obj1,obj2){

	var str_f_num = obj1.value;
	var str_l_num = obj2.value;

	if (str_f_num=='' || str_l_num==''){
		alert('�ֹι�ȣ�� �Է��ϼ���');
		if(str_f_num=='') obj1.focus();
		else obj2.focus();
	}
	var i3=0

	for (var i=0;i<str_f_num.length;i++){
		var ch1 = str_f_num.substring(i,i+1);
		if (ch1<'0' || ch1>'9'){ i3=i3+1 }
	}
	if ((str_f_num == '') || ( i3 != 0 )){
		return false;
	}
	var i4=0

	for (var i=0;i<str_l_num.length;i++){
		var ch1 = str_l_num.substring(i,i+1);
		if (ch1<'0' || ch1>'9') { i4=i4+1 }
	}
	if ((str_l_num == '') || ( i4 != 0 )){
		return false;
	}
	if(str_f_num.substring(0,1) < 0){
		return false;
	}
	if(str_l_num.substring(0,1) > 2){
		return false;
	}
	if((str_f_num.length > 7) || (str_l_num.length > 8)){
		return false;
	}
	if ((str_f_num == '72') || ( str_l_num == '18')){
		return false;
	}

	var f1=str_f_num.substring(0,1)
	var f2=str_f_num.substring(1,2)
	var f3=str_f_num.substring(2,3)
	var f4=str_f_num.substring(3,4)
	var f5=str_f_num.substring(4,5)
	var f6=str_f_num.substring(5,6)
	var hap=f1*2+f2*3+f3*4+f4*5+f5*6+f6*7
	var l1=str_l_num.substring(0,1)
	var l2=str_l_num.substring(1,2)
	var l3=str_l_num.substring(2,3)
	var l4=str_l_num.substring(3,4)
	var l5=str_l_num.substring(4,5)
	var l6=str_l_num.substring(5,6)
	var l7=str_l_num.substring(6,7)
	hap=hap+l1*8+l2*9+l3*2+l4*3+l5*4+l6*5
	hap=hap%11
	hap=11-hap
	hap=hap%10
	if (hap != l7){
		alert("�ֹι�ȣ�� ��Ȯ�� �Է����ּ���");
		obj1.focus();
		return false;
	}
  return true;
}

// ���ڸ� �Է��ϵ��� �˻� (document.form[0].money, ����)
function checkNumber(obj, objName){
	var result;

	result = trim(obj.value);		// [trim.js] �������

	if (isNaN(result)){
		alert( objName + "���ڷθ� �Է��ϼ���.");
		obj.focus();

		if (obj.type == "text") obj.select();
		return(false);
	}
}


// ���ڸ� �Է��ϵ��� �˻� (document.form[0].money, ����)
function onlyNumber(obj, objName){
	var result;

	result = trim(obj.value);		// [trim.js] �������

	if (isNaN(result)){
		alert( objName + "���ڷθ� �Է��ϼ���.");
		obj.focus();

		if (obj.type == "text") obj.select();
		return(false);
	}
}

/* ex)
		bCheck = form_chk_number(form.money, "����");
		if ( bCheck == false ) return;
*/



// ��¥���� �˻� (dateObject = document.form[0].date1)(msg = ��ü��)
function checkDate(dateObject, msg){
	var date = dateObject.value;
	var s_date = date.split("-");
	var yyyy = (s_date[0]*10)/10;		// parseInt()�� ��� "08", "09"�϶� 0���� �߸� ����ǹǷ� ������ �̿���.
	var mm = (s_date[1]*10)/10;
	var dd = (s_date[2]*10)/10;
	var chk_day;
	var result;

	if (date != "" ){		// �Է°��� �����Ҷ��� �˻���
		if ((date.length >= 8) && (date.length <= 10)){		// [����] 2001-1-1 ~ 2001-12-12
			if (s_date.length == 3){		// [���] xxxx-xx-xx
				if ((yyyy > 1900) && (yyyy < 2100)){		// [�⵵] 1900�� ~ 2100��
					if ((mm >= 1) && (mm <= 12)){		// [��] 1�� ~ 12��
						switch (mm){		// [�޺�����] 1�� - 31, 4�� - 30 ...
							case 2:
								chk_day = (!(yyyy % 4) && (yyyy % 100) || !(yyyy % 400)) ? 29 : 28;		// ���ⱸ��
								break;
							case 4: case 6: case 9: case 11:
								chk_day = 30;
								break;
							default :
								chk_day = 31;
								break;
						}

						//alert(chk_day + " / " + dd + " / " + s_date[2]);
						if ((dd >= 1) && (dd <= chk_day)){			// [��] 1�� ~ �޺�����
							result = true;
						}
					}
				}
			}
		}

		if (result != true){
			alert(msg + "�� ��¥����� �߸�Ǿ�ų� �ùٸ� ��¥�� �ƴմϴ�.\n\n[2001-01-01]������� �Է��Ͽ� �ֽʽÿ�.");
			dateObject.focus();
			dateObject.select();
			return(false);
		}
	}
}

/* ex
		// ��¥���� �˻�
		bCheck = form_chk_date(form.c_buydate, "���������");
		if ( bCheck == false ) return;
*/


// ��¥ �Ⱓ �˻� (dateObject1 = document.form[0].date1)(objName = ȭ��� ǥ�õ� ��ü�̸�)
function compareDate(dateObject1, dateObject2, objName){
	function form_getTime(value){
		var d;	// Date Object
		var sd;		// Split Date
		sd= value.split("-");
		d = new Date(sd[0], sd[1], sd[2]);
		return(d.getTime());		// getTime() - returns a numeric value
	}

	var d1;		// First Compare Date
	var d2;		// Second Compare Date

	d1 = form_getTime(dateObject1.value);
	d2 = form_getTime(dateObject2.value);
	if (d1 > d2){
		alert( objName + "�� �߸�Ǿ���ϴ�.\n\nù��° ��¥�� �ι�°��¥���� ����� �մϴ�." );
		dateObject1.focus();
		dateObject1.select();
		return(false);
	}
}

/* ex
		// ��¥ �Ⱓ �˻�
		bCheck = form_compare_date(form.c_hb_begin, form.c_hb_end, "�ҺαⰣ");
		if ( bCheck == false ) return;
*/

// Change Div display
function changeDiv(IObject){
   var ObjStyle;

   if (IObject.style.display != "none"){
		ObjStyle = "none";
   }else{
        ObjStyle = "";
   }

   IObject.style.display = ObjStyle;
}

//onkeypress='Check_Number()' �̺�Ʈ �ڵ鷯 �߻�� ���� üũ
function checkEventNumber(){
 	if ((event.keyCode<48)||(event.keyCode>57)){
  		alert("���ڸ� �Է��� ���˴ϴ�.");
  		event.returnValue=false;
 	}
}

//�ݾ��Է�(,���) : onkeyup="this.value=this.value.replace(/[^0-9]/g,'');amount_aden(this);amount_aden2(Form.tg_price);"
function checkPrice(frm)
{
	var rtn = "";
	var val = "";
	var j = 0;
	x = frm.value.length;

	for(i=x; i>0; i--)
	  {
		if(frm.value.substring(i,i-1) != ",")
		  {
			val = frm.value.substring(i,i-1)+val;
		  }
	  }
	x = val.length;
	for(i=x; i>0; i--)
	  {
		if(j%3 == 0 && j!=0)
		  {
			rtn = val.substring(i,i-1)+","+rtn;
		  } else {
			rtn = val.substring(i,i-1)+rtn;
		  }
		j++;
	  }
	frm.value=rtn;
	amount=frm.value.replace(/,/g,'')
}

//��Ŀ�� �̵��ϱ�
function moveNext(varControl,varNext){
  if(varControl.value.length == varControl.maxLength){
    varNext.focus();
    varNext.select();
  }
}

/*******************************************************
******                                            ******
******              ���� : �˾� ����            ******
******                                            ******
*******************************************************/


//�˾�
function makeWin(url, winname, width, height, scrolltype){
   xposition=0; yposition=0;
   if (parseInt(navigator.appVersion) >= 4){
      xposition = (screen.width - width) / 2;
      yposition = (screen.height - height) / 2;
   }
   args = "width=" + width + "," + "height=" + height + "," + "location=0," + "menubar=0," + "resizable=0,"
         + "scrollbars=" + scrolltype + "," + "status=0," + "titlebar=0," + "toolbar=0," + "hotkeys=0,"
		 + "screenx=" + xposition + ","  //NN Only
		 + "screeny=" + yposition + ","  //NN Only
		 + "left=" + xposition + ","     //IE Only
		 + "top=" + yposition;           //IE Only

   newWin=window.open(url,winname,args)
   newWin.focus();
}

//�˾� - ��ġ ����
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

   newWin=window.open(url,winname,args,ck)
   newWin.focus();
}
//�˾� - ��ġ ����
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

   newWin=window.open(url,winname,args,ck)
   newWin.focus();
}
/*function makeWin3(url, winname, width, height, scrolltype){
   xposition=0; yposition=0;
   if (parseInt(navigator.appVersion) >= 4){
      xposition = (screen.width - width) / 2;
      yposition = (screen.height - height) / 2;
   }

   args = "width=" + width + "," + "height=" + height + "," + "location=no," + "menubar=no," + "resizable=yes,address=no,"
         + "scrollbars=" + scrolltype + "," + "status=no," + "titlebar=no," + "toolbar=no," + "hotkeys=yes,channelmode=0,directories=no,"
		 + "screenx=" + xposition + ","  //NN Only
		 + "screeny=" + yposition + ","  //NN Only
		 + "left=" + xposition + ","     //IE Only
		 + "top=" + yposition;           //IE Only

   newWin=window.open(url,winname,args)
   newWin.focus();
}
*/

function makeWin3(url, winname, width, height, scrolltype) {
    var winX = screen.availWidth;
    var winY = screen.availHeight;
    if(winX == "800") {
        winX = winX - winX/95;
        winX = winY*1000/700;
    } else {
        winY = winY - winY/28;
        winX = winX - winX/150;
    }
    newWin = window.open(url,"_blank","status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top=0,left=0");
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
    newWin = window.open(url,winname,"status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top=0,left=0");
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

   newWin=window.open(url,winname,args)
   newWin.focus();
}


function newWindow(mypage, myname, w, h, scroll) {
	var winl = (screen.width - w) / 2;
	var wint = (screen.height - h) / 2;
	winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable'
	win = window.open(mypage, myname, winprops)
	if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
}

/* �˾� */
function popup(pop,width,height)
{
	var url = pop;
	var wd = width;
	var he = height;

	window.open(url,"","left=300;top=300,toolbar=0,menubar=0,scrollbars=no,resizable=no,width=" + wd +",height=" + he + ";")
}

function formatNumber(s)
{
  s = "" + s;
  len = s.length-3;
  while(len > 0 ) {
    s=s.substr(0,len)+","+s.substr(len);
    len -= 3;
  }
  return s;
}

/*
function swf(src, width, height) {
 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="' + width + '" height="' + height + '">';
 html += '<param name="movie" value="' + src + '" />';
 html += '<param name="quality" value="high" />';
 html += '<param name="wmode" value="transparent" />';
 html += '<param name="menu" value="false" />';

 html += '<embed src="' + src + '" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="' + width + '" height="' + height + '" ></embed>';
 html += '</object>';
 document.write(html);
}
*/


/*************************************************************************************************
* ���̽�ũ�� ���� JS
*************************************************************************************************/
function addFriend(id, idx){
	if(id=='0'){
		alert('�̹� �̿��Դϴ�.');
	}else{
		if($('info'+idx)) $('info'+idx).style.display='none';
		//if(confirm('�̿���û�� �Ͻðڽ��ϱ�?')){
      makeWin("/mypage/addFriend.asp?tId="+id, "friens", 403,232);
			//location.href("/mypage/addFriend_rs.asp?tId="+id);
		//}
	}
}


function sendNote(id, idx){
  if($('info'+idx)) $('info'+idx).style.display='none';
  makeWin('/note/note_send.asp?mem_id='+id,'sendNote', 470,340);
}

function viewNote(){
  makeWin('/note/note.asp','viewNote',645,497);
}

function swf(src, width, height) {
 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="' + width + '" height="' + height + '">';
 html += '<param name="movie" value="' + src + '" />';
 html += '<param name="quality" value="high" />';
// html += '<param name="menu" value="false" />';
 html += '<param name="wmode" value="transparent" />';
 html += '<embed src="' + src + '" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="' + width + '" height="' + height + '" wmode="transparent"></embed>';
 html += '</object>';
 document.write(html);
}
function swfAni(src, width, height) {
 html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
  ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"' +
  ' width="100%" height="100%">';
 html += '<param name="movie" value="100%" />';
 html += '<param name="quality" value="high" />';
 html += '<param name="menu" value="false" />';
 html += '<param name="wmode" value="transparent" />';
 html += '<embed src="100%" quality="high"' +
  ' pluginspage="http://www.macromedia.com/go/getflashplayer"' +
  ' type="application/x-shockwave-flash"' +
  ' width="100%" height="100%" wmode="transparent"></embed>';
 html += '</object>';
 document.write(html);
}

/*************************************************************************************************
* ȸ���� ���
*************************************************************************************************/
function agree(){
  $('agreeForm').submit();
}

function searchId(){
	var word = $("m_id").value;
	$("searchId").src ="/member/search_id.asp?word="+word;
}
// Ư������ üũ ��ũ��Ʈ �߰� 2008.06.26 �輺ö
var mikExp = /[$\\@\\\#%\^\-\!\&\*\(\)\[\]\+\_\{\}\`\~\=\|]/;

function isValid_id(form) {

    if(form.value.search(mikExp) != -1)
	{
        alert("���̵�� ���� �ҹ��ڿ� ���ڸ� ����� �� �ֽ��ϴ�.");
        return false;
    }
	else
	{
		return true;
	}
}
// Ư������ üũ ��ũ��Ʈ ��
function checkForm(lv1, lv2){
	var form = document.joinForm;
	var mode = form.mode.value;

  if (mode == "input"){
	if(checkValue(form.m_pw,"��й�ȣ��")==false)return false;
	if(checkValue(form.m_pw2,"��й�ȣ Ȯ����")==false)return false;
	if(checkPassword(form.m_pw,form.m_pw2)==false)return false;
  }

	if(checkValue(form.m_id,"���̵�")==false)return false;
	if(form.idAcess.value != "1"){
		alert('����� �� ��� ���̵��Դϴ�.');
		return false;
	}
	// Ư������ üũ ��ũ��Ʈ �߰� 2008.06.26 �輺ö
	res = isValid_id(form.m_id);
	 if( !res ) {
		 alert("��ȿ���� ���� ���̵��Դϴ�.");
		 document.getElementById("resultArea").innerHTML = "<span style='color:#ff6600'>���̵� <b>Ư������</b>�� ���� �ȵ˴ϴ�. �ٽ� �Է����ֽʽÿ�.</span>"
		 return false;
	 }
	// Ư������ üũ ��ũ��Ʈ ��



	if(checkValue(form.m_nm,"�̸���")==false)return false;

/*
	if(checkValue(form.m_jumin1, "�ֹι�ȣ ���ڸ���")==false) return false;
	if(checkValue(form.m_jumin2, "�ֹι�ȣ ���ڸ���")==false) return false;
	if(checkResNumber(form.m_jumin1, form.m_jumin2)==false) return false;
*/

	if(checkValue(form.m_email,"�̸�����")==false)return false;
	if(checkEmail(form.m_email,"�̸�����")==false)return false;

	if(checkValue(form.m_tel1,"����ó��")==false)return false;
	if(checkNumber(form.m_tel1,"����ó�� ")==false)return false;
	if(checkValue(form.m_tel2,"����ó��")==false)return false;
	if(checkNumber(form.m_tel2,"����ó�� ")==false)return false;
	if(checkValue(form.m_tel3,"����ó��")==false)return false;
	if(checkNumber(form.m_tel3,"����ó�� ")==false)return false;

	/*
	�űԷ� �߰� 2008.09.26
	*/

	if(checkValue(form.m_school1,"�б���")==false)return false;
	if(checkValue(form.m_school2,"�б���")==false)return false;
	if(checkValue(form.m_school3,"�б���")==false)return false;

	if(checkRadio(form.m_duty, "����������")==false)return false;
	if(form.m_duty[0].checked == true){
			if(checkValue(form.m_class1,"�г���")==false)return false;

			if(form.m_class2.value == "" && form.m_class3.value == ""){
				alert("���� �����Ͻðų�, �Է� ���ֽʽÿ�.");
				return false;
			}
		}

	if(form.m_duty[4].checked != true){

		if(checkRadio(form.m_duty_sub, "������")==false)return false;

		if(form.m_duty_sub[5].checked == true){
			if(form.m_duty_sub_etc.value == ""){
				alert("������ �Է����ּ���");
				form.m_duty_sub_etc.focus();
				return false;
			}
		}
	}
	/*
	�űԷ� �߰� ��
	*/



	if ((lv1=='1' && (lv2=='1' || lv2=='2'))){
		if(checkValue(form.m_school1,"�б���")==false)return false;
		if(checkValue(form.m_school2,"�б���")==false)return false;
		if(checkValue(form.m_school3,"�б���")==false)return false;

		if(form.m_duty[0].checked == true){
			if(checkValue(form.m_class1,"�г���")==false)return false;

			if(form.m_class2.value == "" && form.m_class3.value == ""){
				alert("���� �����Ͻðų�, �Է� ���ֽʽÿ�.");
				return false;
			}
		}
	}


}


//���� �����û ȸ��Ȯ��
function checkExIdForm(form, gcode){
	if(checkValue(form.m_id,"���̵�")==false)return false;
	if(checkValue(form.m_pw,"��й�ȣ��")==false)return false;
	if(checkResNumber(form.m_jumin1, form.m_jumin2)==false)return false;

	if (gcode == 1){
		if(checkValue(form.groupCode,"��ü�ڵ带")==false)return false;
	}
}

function openZip(){
makeWin("zipsearch.asp","�����ȣã��",440,460);
}

function searchSchool(){
	makeWin("/member/post02.asp","�б��˻�",400,253);
}

function searchSchool2(){
	makeWin("/member/post03.asp","�б��˻�",400,253);
}

function searchSchool3(){
	var word = $("m_sCode").value;
	$("searchId").src ="/member/search_school.asp?word="+word;
}

function checkGroupCodeForm(form){
	if(checkValue(form.groupCode,"�߱޹��� ��ü�ڵ带")==false)return false;
}

//��ǥ����� ����
function changeCodeAdmin(){
	makeWin("/member/groupCodeAdminChange.asp","��ǥ����Ժ���",380,300);
}

//��ü�ڵ� ����� ����
function useGroupCode(groupCode){
	makeWin("/member/groupCodeUse.asp?groupCode="+groupCode,"��ü�ڵ�",380,300);
}

//��ü�ڵ� ����� ����
function deleteGroupCode(groupCode){
	if(confirm(groupCode+'�ڵ��� ����ڸ� �����Ͻðڽ��ϱ�?')){
		var form = document.deleteGroupCodeForm;
		form.groupCode.value = groupCode;
		form.submit();

	}
}

//���õ� ��ü�ڵ� ����
function deleteSelectedGroupCode(){
	if(document.getElementsByName('num')){
		var groupCodeNumber = document.getElementsByName('num');
		var checkCount = 0;
		for(i=0;i<groupCodeNumber.length;i++){
			if(groupCodeNumber[i].checked == true) checkCount++;
		}

		if(checkCount==0){
			alert('������ �׷��ڵ带 ������ �ּ���');
			return;
		}

		if(confirm('�����Ͻ� ��ü�ڵ��� ����ڸ� �����Ͻðڽ��ϱ�?')){
			var form = document.deleteGroupCodesForm;
			form.method = 'post';
			form.action = '/member/groupCodeUse_deleteAll.asp';
			form.submit();
		}
	}
}

//��ü�ڵ� �ϰ� ����
function checkAll(){
	var form = document.deleteGroupCodesForm;
	var groupCodeNumber = document.getElementsByName('num');

	for(i=0;i<groupCodeNumber.length;i++){
		if(groupCodeNumber[i].checked == true) groupCodeNumber[i].checked = false;
		else groupCodeNumber[i].checked = true;
	}
}

//ȸ�� ������ ������ �̵�
function endInput(){
	self.close();
	opener.location.href='/';
}
/*************************************************************************************************
* ī�����
*************************************************************************************************/
function payDacom()
{

	var checkCount = 0;
	var actionURL  = '';

	if(document.getElementsByName("payMethod")[0].checked == true){
		actionURL = 'http://pg.dacom.net:7080/card/cardAuthAppInfo.jsp';
		checkCount++;
	}

	if(document.getElementsByName("payMethod")[1].checked == true){
		actionURL = 'http://pg.dacom.net:7080/cas/casRequestSA.jsp';
		checkCount++;
	}

	if(document.getElementsByName("payMethod")[2].checked == true){
		actionURL = 'http://pg.dacom.net:7080/transfer/transferSelectBank.jsp';
		checkCount++;
	}

	if(checkCount==0){
		alert('��������� ������ �ּ���');
		document.getElementsByName("payMethod")[0].focus();
		return;
	}


	window.open("","Window","width=330, height=430, status=yes, scrollbars=no,resizable=yes, menubar=no");
	document.mainForm.action = actionURL;
	document.mainForm.target = "Window";
	document.mainForm.submit();

	//document.mainForm.action="http://pg.dacom.net:7080/card/cardAuthAppInfo.jsp";
	/*
	========
	�ſ�ī��
	========
	�׽�Ʈ�� ����â URL        http://pg.dacom.net:7080/card/cardAuthAppInfo.jsp;
	���񽺿� ����â URL        http://pg.dacom.net/card/cardAuthAppInfo.jsp;

	========
	������ü
	========
	�׽�Ʈ�� ����â URL        http://pg.dacom.net:7080/transfer/transferSelectBank.jsp
	���񽺿� ����â URL        http://pg.dacom.net/transfer/transferSelectBank.jsp

	========
	�޴���
	========
	�׽�Ʈ�� ����â URL        http://pg.dacom.net:7080/wireless/wirelessAuthAppInfo1.jsp
	���񽺿� ����â URL        http://pg.dacom.net/wireless/wirelessAuthAppInfo1.jsp

	========
	�������Ա�
	========
	�׽�Ʈ�� ����â URL        http://pg.dacom.net:7080/cas/casRequestSA.jsp
	���񽺿� ����â URL        http://pg.dacom.net/cas/casRequestSA.jsp


	Test ID�� �׽�Ʈ�� �׽�Ʈ�� URL�� �׽�Ʈ �ϼž� �մϴ�.

	*/

}


/*************************************************************************************************
* �н����
*************************************************************************************************/
function viewContentsWeb(contentsNo){
  makeWin('/britannica/viewContentsWeb.asp?contents_no='+contentsNo, 'contentsWeb', 402, 417);
}

//������ �ι� �̹��� ũ�Ժ���
function viewGreatManImage(contentsNo, openType){
	if(openType=='1'){
		widthSize = 752;
	}else{
		widthSize = 342;
	}
  makeWin('/britannica/greatManServiceImage.asp?contents_no='+contentsNo, 'greatManServiceImage', widthSize, 490,0);
}


/*************************************************************************************************
* ��ũ��
*************************************************************************************************/
function pasteMyScrap(scrapType, code, uid){
  makeWin ("/myScrap/addScrap.asp?code="+code+"&uid="+uid+"&scrapType="+scrapType,"��ũ���ϱ�",368, 468,0);
}

function deleteMyScrap(tid, num){
  if(confirm('�����Ͻðڽ��ϱ�?')){

    location.href("/myScrap/delete.asp?tid="+tid+"&num="+num);
  }
}



/*************************************************************************************************
* ��� ��¥�˻�
*************************************************************************************************/
function checkTopSearchForm(form){
	if(checkValue(form.kw, "�˻��")==false) return false;
}

function loginBeforeSearch(){
	alert('�˻��Ͻ÷��� �α����� ���ּ���');
	location.href='/member/login.asp';
}

//�̹��� ����
function viewImages(codeId, subjectId, subjectNo){
  makeWin1('/curriculum/img.asp?codeId='+codeId+'&subjectId='+subjectId+'&subjectNo='+subjectNo+'&closeType=1', 'subjectImage', 1012, 664,0,0,0);
}

//������ �̹��� ��������
function viewImagesBuje(buje){
  makeWin1('/search/imgViewer.asp?buje='+escape(buje)+'&closeType=1', 'bujeImages', 1012, 664,0,0,0);
}


function viewImagesContentsNo(contentsNO, viewType){
  makeWin1('/main/example2.asp?closeType=1&num='+contentsNO+'&viewType='+viewType,'images', 1012,664,0,0,0);
}

//������(�˾�)
function viewModule(tableName, contents_no, orgVector, codeId){
  var flashPath = '/'+orgVector.split('/')[1]+'/'+orgVector.split('/')[2]+'/'+orgVector.split('/')[3]+'/';
  makeWin3(flashPath+'viewFlash.asp?flashWidth=1012&flashHeight=664&displaySizeDefault=y&orgVector='+orgVector+'&codeId='+codeId,'images', 1012,664,0,0,0);
}



//���������
function localPhoto(){
  makeWin1('/curriculum/pop_local.asp','local', 950, 680,0,0,0);
}



/*************************************************************************************************
* ��õ�ڷ�
*************************************************************************************************/

//����Ÿ ����
function dataDel(num,check){
  if(confirm('�����Ͻðڽ��ϱ�?')){
    location.href("/opmanager/include/dataDel.asp?num="+num+"&check="+check);
  }
}


//�˸���
function viewNotice(){
  var winX = screen.availWidth;
  var winY = screen.availHeight;
  makeWin3('/notice/noticeView.asp?winY='+winY+'&winX='+winX,'noticeBoard', winX, winY);
}

//1,2�г� ĳ���� ����
function popchinfo(){
	var winX = screen.availWidth;
	var winY = screen.availHeight;
	makeWin3_local('/multiview/main/popup/Pop_Shinfo.do?winX='+winX+'&winY='+winY,'chinfo', winX, winY);
}

//�л�,�кθ�� �˸��� �˻� ã��
function seeknotice(){
	var url = "/notice/noticeseek.asp";
	var winX = 780;//screen.availWidth;
    var winY = 600;//screen.availHeight;
	var xposition = (screen.width - winX) / 2;
	var yposition = (screen.height - winY) / 2;

    newWin = window.open(url,"seeknotice","status=no,resizable=yes,hotkeys=yes,channelmode=0,directories=no,location=no,address=no,menubar=no,toolbar=no,scrollbars=no,width="+winX+",height="+winY+",top="+yposition+",left="+xposition);
//	makeWin3('/notice/noticeseek.asp','',800,600);
}

//�Ǽ�/flash/boardMain.swf
function boardMain(){
  makeWin3('/include/board.asp','boardMain', 963, 662);
}

/*
function boardMain(){
  makeWin('/flash/boardMain.swf','boardMain', 963, 662);
}
*/

//ȭ�鼳��
function settingMyPage(){
  makeWin("/mypage/computerSet.asp", 'setting', 330, 233);
}



//���񽺹���
function inquiry(){
  location.href("/company/counsel.asp");
}


//�ٸ� ����Կ��� ��õ�ϱ�
function recommendTeacher(){
  makeWin('/main/pop_teacher.asp','recommendTeacher', 510, 564);
}

//���ε�����
function vodview(){
  makeWin('/main/main_vod.asp','vodview', 640, 520);
}

function vodview01(){
  makeWin('/main/main_vod01.asp','vodview', 640, 520);
}

/*************************************************************************************************
* �Ǹ�Ȯ��
*************************************************************************************************/
function checkRealName(form){
	if(!(form.agree[0].checked))
	{
		alert("ȸ���� �����ϼž� �����Ͻ� �� �ֽ��ϴ�.");
		return false;
	}

	if(checkValue(form.name, "�̸���")==false) return false;
	if(checkValue(form.jumin1, "�ֹι�ȣ ���ڸ���")==false) return false;
	if(checkValue(form.jumin2, "�ֹι�ȣ ���ڸ���")==false) return false;
}



//���������� ������ ü����
function changeMov(type, idx){
  for(var i=1;i<=3;i++){
    if(i==idx){
      document.getElementById(type+'_text_'+i).style.display = 'block';
      document.getElementById(type+'_play_'+i).style.display = 'block';
      document.getElementById(type+'_image_'+i).style.display = 'block';
    }else{
      document.getElementById(type+'_text_'+i).style.display = 'none';
      document.getElementById(type+'_play_'+i).style.display = 'none';
      document.getElementById(type+'_image_'+i).style.display = 'none';
    }

  }
}

function view_tab_item(index) {

		for (i=1; i<=2; i++)
        if (index == i) {
			thisMenu = eval("menu" + index + ".style");
			thisMore = eval("more" + index + ".style");
			thisMenu.display = "";
			thisMore.display = "";
			nws_tab_img.src = '/images/main/vod_tab03.gif';
			nws_tab_img1.src = '/images/main/vod_tab04_on.gif';
		}
        else {
			otherMenu = eval("menu" + i + ".style");
			otherMore = eval("more" + i + ".style");
			otherMenu.display = "none";
			otherMore.display = "none";
			nws_tab_img.src = '/images/main/vod_tab03_on.gif';

			nws_tab_img1.src = '/images/main/vod_tab04.gif';
        }
}

//����Ʈ�ڽ� �ٹ̱� v1.2
//================================================ JS
var zindex = 10000;
select_count = new Array();
ev_click     = new Array();

function insert_select (sn,w,f,b,g,fc,c,img,event) {
ev_click[sn]    = event;
select_count[sn] = 0;
zindex--;
document.write("<input type=hidden name="+sn+" id="+sn+" value=''>");
document.write("    <table border='0' cellspacing='1' cellpadding='1' width='"+w+"' style='table-layout:fixed;width:"+w+";' ' bgcolor='"+b+"' onclick='select_click(\""+sn+"\");' >");
document.write("    <tr>");
document.write("        <td bgcolor='"+g+"' align='absmiddle'>");
document.write("            <input type='text' id='"+sn+"_select_name' name='"+sn+"_select_name' style='border:none;background-color: "+g+";cursor:hand;width:100%;height:11px;color:"+fc+";font-size:"+f+"pt' onselectstart=\"return false\" readonly> ");
document.write("        </td>");
if(img != "") {
document.write("    <td width=18 bgcolor='"+g+"' align=center valign=middle style='cursor:hand'><img src='"+img+"' align='absmiddle'></td>");
} else {
document.write("    <td width=18 bgcolor='"+g+"' align=center valign=middle style='cursor:hand'>v</td>");
}
document.write("    </tr>");
document.write("    </table>");

document.write("<div id='"+sn+"_select_div' name='"+sn+"_select_div'  style='display:none;z-index:"+zindex+";position:absolute;cursor:hand' onmouseover='"+sn+"_select_div.style.display=\"\";' onmouseout='"+sn+"_select_div.style.display=\"none\";'>");
document.write("        <table border='0' cellspacing='1' cellpadding='1' bgcolor='"+b+"' width="+w+" onmouseover='"+sn+"_select_div.style.display=\"\";'>");
document.write("        <tr><td bgcolor='"+g+"' style='line-height:1.3em;' id='"+sn+"_select_span'></td></tr>");
document.write("        </table>");
document.write("    </div>");
}

function insert_select_option(sn,f,b,g,fc,c,v,vv,chk)     {
select_count[sn] ++;
option_html = "<span style='width:100%;color:"+fc+";font-size:"+f+"pt' onclick='"+sn+"_select_name.value=\""+vv+"\";"+sn+".value=\""+v+"\";"+sn+"_select_div.style.display=\"none\";"+ev_click[sn]+";' onmouseover='this.style.background=\""+c+"\"' onmouseout='this.style.background=\""+g+"\"'>"+vv+"</span><br>";

if(select_count[sn] == 1 || chk == "Y" ) {
document.getElementById( sn+"_select_name" ).value = vv
document.getElementById( sn).value = v
}
document.getElementById( sn+"_select_span").innerHTML += option_html;
}

function  select_click(sn)     {
if ( document.getElementById( sn+"_select_div").style.display == "none") {
document.getElementById( sn+"_select_div").style.display = "";
} else {
document.getElementById( sn+"_select_div").style.display = "none";
}
}





function helperNew(){
  makeWin('/curriculum/pop_help01.asp','helper', '600', '520');
}

function timerNew(){
  makeWin('/curriculum/pop_timer.asp','timer', '615', '530');
}

function duty_sub(chk)
{


	if(chk == "5") // ���� �Է� ���ý�
	{

		document.joinForm.m_duty_sub_etc.value = "";
		document.joinForm.m_duty_sub_etc.disabled = false;
		document.joinForm.m_duty_sub_etc.style.backgroundColor = "white";
		document.joinForm.m_duty_sub_etc.focus();
	}
	else
	{
		document.joinForm.m_duty_sub_etc.value = "";
		document.joinForm.m_duty_sub_etc.style.backgroundColor = "EEEEEE";
		document.joinForm.m_duty_sub_etc.disabled = true;
	}

}
// 2008.10.23 �߰�

function MovByFlash(url){
  makeWin(url,'MovByFlash', '840', '660');
}

function SwfByFlash(url){
  makeWin3(url,'SwfByFlash', '840', '660','');
}
function whenFlashSongPlay(p_file){
	makeWin("/rest/music_room_player.asp?getfilename="+p_file, 'swf', 800, 600)
}

function mainGpki(grade){

if (grade == 10)
{
	alert('Ư���б� ����� ������û�ϼ̽��ϴ�.\n\n���̽�ũ�� �ѽ� �Ǵ� �̸��Ϸ� �������? �纻�� �����ֽø�\n\n���ڰ� ���� �� ����ȸ������ ��ȯ�� �帮���� �ϰڽ��ϴ�.');
}
else{
	var today = new Date(); //���ÿ� ��¥
	var mday = new Date("apr 2, 2009"); //Ư�� ��¥ �ִ°�(��:jan,feb,mar,apr,may.....��, �⵵)
	var tmime = (mday.getTime()- today.getTime() );
	var itime = 24 * 60 * 60 * 1000;
	var fdday = tmime / itime;
	var dday = Math.floor(fdday);


	if(confirm('���������� ���� �����ø� ������ �̿뿡 ������ �ֽ��ϴ�.\n[Ȯ��]Ŭ�� ��, �������� �������� �̵��մϴ�')){
		location.href="/member/join01_step4.asp"
		}
	}
}

function keyinfo(){
  makeWin('/mypage/authKeySel.asp','key', '595', '393');
}

function wizard(){
	makeWin('/wizard/','wizard','1024','700','y');
}

function wizardlist(){
//  makeWin('/curriculum/pop_help01.asp','helper', '600', '520');
	location.href("/wizard/list.asp");
}

function board(){
	window.close();
}