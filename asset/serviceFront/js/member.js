/*************************************************************************************************
* 회원가입 시 중복 가입 여부 체크(실명인증)
*************************************************************************************************/
function chkRealName(form){
   	if(form.agree1.checked == false )
	{
		alert("서비스 이용약관에 동의하셔야 합니다.");
		return ;
	}
   	if(form.agree2.checked == false )
	{
		alert("수집하는 개인정보 항목 및 수집방법에 동의하셔야 합니다.");
		return ;
	}
   	if(form.agree3.checked == false )
	{
		alert("개인정보의 수집 및 이용 목적에 동의하셔야 합니다.");
		return ;
	}
   	if(form.agree4.checked == false )
	{
		alert("개인정보의 보유 및 이용기간에 동의하셔야 합니다.");
		return ;
	}
   	if(form.agree[0].checked == false )
	{
		alert("회원가입 약관에 동의하셔야 합니다.");
		return ;
	}

	//아이디
	if(form.name.value==""){
		alert('이름을 입력해 주세요');
		form.name.focus();
		return;
	}
	if(stringCheck(form.name.value) == false){
		alert("특수문자 또는 공백을 입력할 수 없습니다.");
		form.name.focus();
		return;
	}

	//주민번호
	if(form.jumin1.value==""){
		alert('주민번호를 입력해 주세요');
		form.jumin1.focus();
		return;
	}
    obj = form.jumin1;
		str = obj.value;
		len = str.length;
		for(i = 0; i < len; i++){
			ch = str.charAt(i);

			if(!('0' <= ch  && ch <= '9')){
				alert("숫자만 가능합니다.");
				obj.focus();
				obj.select();
				return;
			  }
       }
	if(form.jumin2.value==""){
		alert('주민번호를 입력해 주세요');
		form.jumin2.focus();
		return;
	}
    obj = form.jumin2;
		str = obj.value;
		len = str.length;
		for(i = 0; i < len; i++){
			ch = str.charAt(i);

			if(!('0' <= ch  && ch <= '9')){
				alert("숫자만 가능합니다.");
				obj.focus();
				obj.select();
				return;
			  }
       }
	if(jumin_check(form)==false) return ;

	form.target="ifDetail";
	//form.action = "/member/registCheck.asp";
	form.action = "/member/realName/name_sample_seed.asp?parentWindow=join";
	form.submit();
}

/*************************************************************************************************
* 회원가입 시 중복 가입 여부 체크(아이핀)
*************************************************************************************************/
function chkRealName_for_IPin (frmName,type){
	
	if(frmName == 'readCheckForm') {		// 약관 동의
		if(document.getElementById('check1').checked==false){
			alert("이용약관에 동의해주세요.");
			$(document).scrollTop( 200 );
			$('#check1').focus();
			return ;
		}
		if(document.getElementById('check2').checked==false){
			alert("개인정보 수집 및 이용에 동의해주세요.");
			$('#check1').focus();
			$('#check2').focus();
			return ;
		}
	}
	
	
	
	
	var terms_of_use = $('input:checkbox[name=terms_of_use]').is(":checked") == true ? 'Y':'N'; 	//아이스크림 이용약관
	var personal_info = $('input:checkbox[name=personal_info]').is(":checked") == true ? 'Y':'N' 	//개인정보 수집 및 이용
	var offering_personal_info = $('input:checkbox[name=offering_personal_info]').is(":checked") == true ? 'Y':'N';	// 제3자 제공 및 이용
	var is_mail_yn = $('input:checkbox[name=is_mail_yn]').is(":checked") == true ? 'Y':'N';	//이메일 수신동의
	var is_sms_yn = $('input:checkbox[name=is_sms_yn]').is(":checked") == true ? 'Y':'N';		//sms 수신동의
	var sort = $("#sort").val();	// 일반선생님, 교대생, 교대교수  판단
	
	if(type == "ipin"){		// 아이핀인증
		var url = '';                      
		if(frmName == 'readCheckForm') url = '/user/member/ipin/ipin_request_seed.do?parentWindow=join&terms_of_use='+terms_of_use 
											+'&personal_info='+personal_info+'&offering_personal_info='+offering_personal_info
											+'&is_mail_yn='+is_mail_yn+'&is_sms_yn='+is_sms_yn+'&type='+type+"&sort=" + sort;
		else if(frmName == 'modify') url = '/user/member/ipin/ipin_request_seed.do?parentWindow=' + frmName;
		else if(frmName == 'findId') url = '/user/member/ipin/ipin_request_seed.do?parentWindow=' + frmName;
		else if(frmName == 'findPw') url = '/user/member/ipin/ipin_request_seed.do?parentWindow=' + frmName;
		else if(frmName == 'dormantAccount') url = '/user/member/ipin/ipin_request_seed.do?parentWindow=' + frmName;
	} else {					// 휴대폰인증
		var url = '';
		if(frmName == 'readCheckForm') url = '/user/member/ipin/pcc_V3_request_seed.do?parentWindow=join&terms_of_use='+terms_of_use 
											+'&personal_info='+personal_info+'&offering_personal_info='+offering_personal_info
											+'&is_mail_yn='+is_mail_yn+'&is_sms_yn='+is_sms_yn+'&type='+type+"&sort=" + sort; 		// 회원가입
		else if(frmName == 'modify') url = '/user/member/ipin/pcc_V3_request_seed.do?parentWindow=' + frmName;	// 회원정보수정
		else if(frmName == 'findId') url = '/user/member/ipin/pcc_V3_request_seed.do?parentWindow=' + frmName; 		// 아이디찾기
		else if(frmName == 'findPw') url = '/user/member/ipin/pcc_V3_request_seed.do?parentWindow=' + frmName;	// 비밀번호찾기
		else if(frmName == 'dormantAccount') url = '/user/member/ipin/pcc_V3_request_seed.do?parentWindow=' + frmName;	// 비밀번호찾기
	}

	makeWin(url,'pcc_chk',440,540,'yes');

}

/*************************************************************************************************
* 본인인증 SMS 체크
*************************************************************************************************/
//인증SMS발송
function fnSmsSend() {
	//var f = document.joinForm;

	// 2013 renewal by wgkim
	//form id 값으로 form object를 가져오지 못한다. 이유는 알수 없다.
	//form은 사용하지 말고, 각 필드의 id값을 직접 사용한다.
	//var f = document.getElementById('joinForm').form;

	//if (f.m_agency.value == "") {
	if (document.getElementById('m_agency').value == "") {
		alert("통신사를 선택해주세요.");
		return;
	}
	if (document.getElementById('m_tel2').value == "") {
		alert("핸드폰 번호를 입력해주세요.");
		return;
	}
	if (document.getElementById('m_tel3').value == "") {
		alert("핸드폰 번호를 입력해주세요.");
		return;
	}
	//f.target = "ifDetail";
	//f.action = "/member/sms_check/pcc_sms_check_result_seed.asp";
	//f.submit();
	document.getElementById('m_agency').form.target = "ifDetail";
	document.getElementById('m_agency').form.action = "/member/sms_check/pcc_sms_check_result_seed.asp";
	document.getElementById('m_agency').form.submit();


}
//인증확인
function fnSmsCheck() {
	//var f = document.joinForm;

	//if (f.sms_chk_val.value == "") {
	if (document.getElementById('sms_chk_val').value == "") {

			alert("전송 받으신 SMS 번호를 입력해주세요.");
			return;
	}
	//f.target = "ifDetail";
	//f.action = "/member/sms_check/pcc_sms_check_verify_seed.asp";
	//f.submit();

	document.getElementById('sms_chk_val').form.target = "ifDetail";
	document.getElementById('sms_chk_val').form.action = "/member/sms_check/pcc_sms_check_verify_seed.asp";
	document.getElementById('sms_chk_val').form.submit();

}

//별도인증
function fnEtcAcc() {
	window.open("/member/sms_check/ect_acc.asp","popEtcAcc","width=460,height=350");
}
//전화번호 변경(인증 변경)
function fnEditTel() {
	window.open("","popEditHp","width=460,height=350");
	var f = document.joinForm;
	f.action = "/member/sms_check/edit_hp.asp";
	f.target = "popEditHp";
	f.submit();
}
/*************************************************************************************************
* 특수문자 입력 체크
*************************************************************************************************/

function stringCheck(str) {
        for (var i=0; i<str.length; i++) {
         var chk = str.substring(i,i+1);
         if(!chk.match(/[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/)) {
          return false
         }
        }

     return true;
 }


/*************************************************************************************************
* 아이디 중복확인
*************************************************************************************************/
function idCheck(){

	//아이디
	if(document.getElementById('m_id').value==""){
		alert('아이디를 입력해 주세요');
		document.getElementById('m_id').focus();
		return;
	}

	if(stringCheck(document.getElementById('m_id').value) == false){
		alert("특수문자 또는 공백을 입력할 수 없습니다.");
		document.getElementById('m_id').focus();
		return;
	}
	
	if($('#m_id').val().length < 4 || $('#m_id').val().length > 12){
		alert("아이디는 4~12자 이내로 입력 해주십시요.");
		return;
	}

	document.getElementById('m_id').form.target="ifDetail";
	document.getElementById('m_id').form.action = "/user/member/idcheck.do";
	document.getElementById('m_id').form.submit();
}


/*************************************************************************************************
* 주민번호 체크
*************************************************************************************************/
function jumin_check(form){

//먼저 배열을 정해 놓습니다.
a = Array(6); //앞에 6자리
b = Array(7); //뒤에 7자리
 var num1, num2, total, tot; //변수 생성

 if(form.jumin1.value.length==6 && form.jumin2.value.length==7) //입력받은 길이가 만약 6자리-7자리가 맞는지 체크

{
  num1 = form.jumin1.value;  //첫번째 문자열 6자리를 담기
  num2 = form.jumin2.value; //두번째 문자열 7자리를 담기
  for (var i=0; i<6; i++){
   a[i] = parseInt(num1.charAt(i));


  }//첫번째 for문 종료.

   /* parseInt문자열로 표시된 정수값을 숫자로 변환하는 역할을 합니다.
       parseInt는 두개의 인자를 가지는데, 첫번째 해당문자열, 두번째 변환타입(몇진수로 인식할것인가?)을 가집니다.

       (생략가능).*/


 // charAt은 한 문자만을 뽑아 냅니다. 예를 들어 num1="654321" num1.charAt(2)는 5값을 가집니다



  for (var j=0; j<7; j++){
   b[j] = parseInt(num2.charAt(j));
  }//두번째 주민번호 for문 종료


  total = (a[0]*2)+(a[1]*3)+(a[2]*4)+(a[3]*5)+(a[4]*6)+(a[5]*7) + (b[0]*8)+(b[1]*9)+(b[2]*2)+(b[3]*3)+(b[4]*4)+(b[5]*5);


  tot = 11 - (total%11);//오류검중번호 계산하기.


  if (tot == 11) //예외인 11과 10처리
  {
   tot = 1;
  }
  else if(tot == 10)
  {
   tot = 0;
  }


  if (b[6] != tot){
   alert ("주민번호가 틀립니다.");
   form.jumin1.value = "";
   form.jumin2.value = "";
   form.jumin1.focus();
   return (false);
  }//주민번호 비교.
   return (true);
 }//주민번호값이 제대로 들어왔는지 if문 종료

 else//창에 만약 6자리 7자리가 제대로 입력이 된게 아니라면 실행문

{

 alert ("주민번호를 정확히 입력해주세요");
 form.jumin1.value = "";  //값을 Clear
 form.jumin2.value = "";
 form.jumin1.focus(); //커서를 이동
 return (false);

 }//else문 종료


}//function종료

/*************************************************************************************************
* 회원가입 직위 체크
*************************************************************************************************/

function duty_sub(chk)
{

	var joinForm = document.getElementById('joinTitle').form;
	if(chk == "5") // 직접 입력 선택시
	{

		//document.joinForm.m_duty_sub_etc.value = "";
		//document.joinForm.m_duty_sub_etc.disabled = false;
		//document.joinForm.m_duty_sub_etc.style.backgroundColor = "white";
		//document.joinForm.m_duty_sub_etc.focus();
		joinForm.m_duty_sub_etc.value = "";
		joinForm.m_duty_sub_etc.disabled = false;
		joinForm.m_duty_sub_etc.style.backgroundColor = "white";
		joinForm.m_duty_sub_etc.focus();
	}
	else
	{
		//document.joinForm.m_duty_sub_etc.value = "";
		//document.joinForm.m_duty_sub_etc.style.backgroundColor = "EEEEEE";
		//document.joinForm.m_duty_sub_etc.disabled = true;
		joinForm.m_duty_sub_etc.value = "";
		joinForm.m_duty_sub_etc.style.backgroundColor = "EEEEEE";
		joinForm.m_duty_sub_etc.disabled = true;
	}

}

function searchSchool(){
	makeWin("/user/member/popup/post.do","학교검색",360,398);
}

function searchSchool_univ(){
	makeWin("/user/member/popup/post_univ.do","학교검색",360,398);
}

/*************************************************************************************************
비밀번호, 비밀번호 확인 체크
*************************************************************************************************/
function checkPassword(strObj1, strObj2){
	var strValue1 = strObj1.value;
	var strValue2 = strObj2.value;
	if(strValue1 != strValue2) {
		alert("비밀번호란과 비밀번호 확인란이 일치하지 않습니다");
		strObj2.focus();
		return false;
	}
	return true;
}

/*************************************************************************************************
* 회원가입 validation check
*************************************************************************************************/


function checkForm(form){
	var form = document.getElementById('mode').form;
	var joinForm = form;


	var mode = form.mode.value;


	if (mode == "input"){
		if(checkValue(form.m_id,"아이디를")==false)return ;
		if($('#id_flag').val() != "Y" || ($('#temp_id').val() != $('#m_id').val())){
			alert('아이디 중복확인을 해주세요');
			return ;
		}
			// 특수문자 체크 스크립트 추가 2008.06.26 김성철
		if(stringCheck(form.m_id.value) == false){
			alert("특수문자 또는 공백을 입력할 수 없습니다.");
			form.m_id.focus();
			return ;
		}

		// 특수문자 체크 스크립트 끝
		if(checkValue(form.m_pw,"비밀번호를")==false)return ;
		if(checkValue(form.m_pw2,"비밀번호 확인을")==false)return ;
		if(checkPassword(form.m_pw,form.m_pw2)==false)return ;


	}



	if(checkValue(form.m_email1,"이메일을")==false)return ;
	if (form.domain.value=="")
	{
		if (form.m_email2 =="")
		{
			alert('이메일을 선택해주세요');
			return ;
		}
	}


	if(checkValue(form.m_school1,"학교를")==false)return ;
	if(checkValue(form.m_school3,"학교를")==false)return ;

	if(checkRadio(form.m_teacher, "교사구분을")==false)return ;
	if(checkRadio(form.m_duty, "담임유무를")==false)return ;

	if(checkRadio(form.m_chargeyn, "교과전담여부를")==false)return ;

	if (form.m_chargeyn[0].checked == true){
		if(checkValue(form.m_charge,"과목을")==false)return ;
		if(checkValue(form.m_charge_grade,"학년을")==false)return ;
	}

	if(form.m_duty[0].checked == true){
		if(checkValue(form.m_class1,"학년을")==false)return ;

		if(form.m_class2.value == "" && form.m_class3.value == ""){
			alert("반을 선택하시거나, 입력 해주십시요.");
			return ;
		}
	}

	m_duty_sub = "";

	for(var i = 0; i < document.joinForm.m_duty_sub.length; i++){
		if(document.joinForm.m_duty_sub[i].checked == true){
			m_duty_sub = document.joinForm.m_duty_sub[i].value+"|"+m_duty_sub;
		}
	}
	
	document.joinForm.m_duty_subs.value=m_duty_sub;

	if (m_duty_sub == ""){
		alert("직위를 선택해주십시요.");
		return;
	}

	if(form.joinChildN.checked==false&&form.joinChild.checked==false&&form.joinChild7.checked==false&&form.joinSchild1.checked==false&&form.joinSchild2.checked==false&&form.joinSchild3.checked==false&&form.joinSchild4.checked==false&&form.joinSchild5.checked==false&&form.joinSchild6.checked==false&&form.joinSchildMid1.checked==false&&form.joinSchildMid2.checked==false&&form.joinSchildMid3.checked==false&&form.joinSchildHi1.checked==false&&form.joinSchildHi2.checked==false&&form.joinSchildHi3.checked==false&&form.joinSchildUni.checked==false) {
		alert("가족사항을 선택해주십시요.");
			return ;
	}

	var ssl_frm = joinForm.ssl_frm.value;

	if(joinForm.m_univ_code.value == "" || joinForm.m_univ_code.value == "0"){
		if(!confirm("출신 학교정보 없이 다음단계로 이동하시겠습니까?")){
			return;
		}
	}
	
	
	/*joinForm.action = "https://"+ssl_frm+"/member/memberTran.asp";  //org
	joinForm.target="";
	joinForm.submit();*/
	$('#joinForm').attr({
		action : "/user/member/memberTran.do",
		target : "_self"
	}).submit();


}

/*************************************************************************************************
* 회원수정 validation check
*************************************************************************************************/

function modifyCheckForm(form){

	var mode = form.mode.value;

	if (mode == "input"){
		if(checkValue(form.m_id,"아이디를")==false)return ;
		if(form.result.value != "1"){
			alert('아이디 중복확인을 해주세요');
			return ;
		}

		// 특수문자 체크 스크립트 추가 2008.06.26 김성철
		if(stringCheck(form.m_id.value) == false){
			alert("특수문자 또는 공백을 입력할 수 없습니다.");
			form.m_id.focus();
			return ;
		}
		if(checkValue(form.m_nm,"이름을")==false)return ;

		// 특수문자 체크 스크립트 끝
		if(checkValue(form.m_pw,"비밀번호를")==false)return ;
		if(checkValue(form.m_pw2,"비밀번호 확인을")==false)return ;
		if(checkPassword(form.m_pw,form.m_pw2)==false)return ;
		
		//휴대전화 인증 체크
		if (form.sms_result.value==""||form.sms_result.value == "N") {
			alert("휴대전화 인증번호를 받아 입력해주세요.");
			return;
		}
	}

	if(checkValue(form.m_email1,"이메일을")==false)return ;
	/*if (form.domain.value=="")
	{
		if (form.m_email2 =="")
		{
			alert('이메일을 선택해주세요');
			return ;
		}
	}*/

	//if(checkValue(form.domain,"이메일을")==false)return ;


	if(checkValue(form.m_tel1,"연락처를")==false)return ;
	if(checkNumber(form.m_tel1,"연락처를 ")==false)return ;
	if(checkValue(form.m_tel2,"연락처를")==false)return ;
	if(checkNumber(form.m_tel2,"연락처를 ")==false)return ;
	if(checkValue(form.m_tel3,"연락처를")==false)return ;
	if(checkNumber(form.m_tel3,"연락처를 ")==false)return ;
	
	if(checkRadio(form.dormant_year, "개인정보 유효기간을")==false)return ;

	if(checkValue(form.m_school1,"학교를")==false)return ;
	//if(checkValue(form.m_school2,"학교를")==false)return ;	2012-03-06 학교2번째 정보가 없는 실 데이터가 있는 경우가 있으므로 체크 해제
	if(checkValue(form.m_school3,"학교를")==false)return ;

	if(checkRadio(form.m_teacher, "교사구분을")==false)return ;
	if(checkRadio(form.m_duty, "담임유무를")==false)return ;

	if(checkRadio(form.m_chargeyn, "교과전담여부를")==false)return ;
	//if(checkRadio(form.m_family_child, "가족사항을")==false)return ;

	/*if (form.m_chargeyn[0].checked == true){
		if(checkValue(form.m_charge,"과목을")==false)return ;
		if(checkValue(form.m_charge_grade,"학년을")==false)return ;
	}*/
	
	if(form.m_duty[0].checked == true){		
		if(!$('input:radio[name=m_class1]:checked').val()){
			alert("학년을 선택해주세요.");
			return ;
		}
		
		if($('input:radio[name=m_class2]:checked').val() == undefined) {
			alert("반을 선택해주세요.");
			return ;
		}else {
			if ($(':radio[name="m_class2"]:checked').val() == "" && ($("#m_class3").val() == "" || $("#m_class3").val() == null)) {
				alert("반을 입력해주세요.");
				return ;
			}
		}
		
		/*if(checkValue(form.m_class1,"학년을")==false)return ;
	
		if(form.m_class2.value == "" && form.m_class3.value == ""){
			alert("반을 선택하시거나, 입력 해주십시요.");
			return ;
		}*/
	}

/*	if(form.joinChildN.checked==false&&form.joinChild.checked==false&&form.joinChild7.checked==false&&form.joinSchild1.checked==false&&form.joinSchild2.checked==false&&form.joinSchild3.checked==false&&form.joinSchild4.checked==false&&form.joinSchild5.checked==false&&form.joinSchild6.checked==false&&form.joinSchildMid.checked==false) {
			alert("가족사항을 선택해주십시요.");
				return ;
	}
*/
	m_duty_sub = "";

	for(var i = 0; i < document.joinForm.m_duty_sub.length; i++){
		if(document.joinForm.m_duty_sub[i].checked == true){
			m_duty_sub = document.joinForm.m_duty_sub[i].value+"|"+m_duty_sub;
		}
	}
	
	document.joinForm.m_duty_subs.value=m_duty_sub;

	if (m_duty_sub == ""){
		alert("직위를 선택해주십시요.");
		return;
	}

	if(form.joinChildN.checked==false&&form.joinChild.checked==false&&form.joinChild7.checked==false&&form.joinSchild1.checked==false&&form.joinSchild2.checked==false&&form.joinSchild3.checked==false&&form.joinSchild4.checked==false&&form.joinSchild5.checked==false&&form.joinSchild6.checked==false&&form.joinSchildMid1.checked==false&&form.joinSchildMid2.checked==false&&form.joinSchildMid3.checked==false&&form.joinSchildHi1.checked==false&&form.joinSchildHi2.checked==false&&form.joinSchildHi3.checked==false&&form.joinSchildUni.checked==false) {
			alert("가족사항을 선택해주십시요.");
				return ;
	}
	/* 새기능 #26954 disable 처리 요청
	if($('input:radio[name=m_employment_year]:checked').val() == undefined){
		alert("임용년도를 선택해주세요.");
		return ;
	}
	*/	
/*
	if(form.sms_result.value == "N")
	{
		alert("본인 확인을 위해 휴대전화 인증을 해주세요.");
		return ;
	}
*/

/*	if(form.m_teacher[0].checked == true){
		if(checkValue(form.m_class1,"학년을")==false)return ;

		if(form.m_class2.value == "" && form.m_class3.value == ""){
			alert("반을 선택하시거나, 입력 해주십시요.");
			return ;
		}
	}
*/

	var ssl_frm = document.joinForm.ssl_frm.value;
	if(document.joinForm.m_univ_code.value == ""){
		if(!confirm("출신 학교정보 없이 다음단계로 이동하시겠습니까?")){
			return;
		}
	}
	

	//memeber_history에 현재 학년과 학기 정보를 입력
	var currentTime = new Date();
	var year = currentTime.getFullYear();	
	var month = currentTime.getMonth() + 1;
	if( month < 3){
		year--; //현재학년
	}
	var sessionString = "2"; // 현재학기
	if( month >= 3 && month < 8 ){
		sessionString = "1";
	}
	$('input[name=m_year]').val(year)
	$('input[name=m_session]').val(sessionString)
	
	$('#joinForm').attr({
		action : "/user/research/mypage/UpdateMemberInfo.do",
		target : "_self"
	}).submit();
	
}

/*************************************************************************************************
* 회원가입 이메일 도메인 확인
*************************************************************************************************/

function domainChange()
{
	//var value = document.joinForm.domain[document.joinForm.domain.selectedIndex].value;
	//var index = document.joinForm.domain.selectedIndex;
	//var len = document.joinForm.domain.length;
  //
	//if( index == len-1 )
	//{
	//	document.joinForm.m_email2.disabled = false;
	//	document.joinForm.m_email2.value=value;
	//	document.joinForm.m_email2.focus();
	//}
	//else if( index == 0 )
	//{
	//	document.joinForm.m_email2.disabled = true;
	//	document.joinForm.m_email2.value="";
	//	document.joinForm.m_email1.focus();
	//}
	//else
	//{
	//	document.joinForm.m_email2.disabled = true;
	//	document.joinForm.m_email2.value=value;
	//	document.joinForm.m_email1.focus();
	//}

	var joinForm = document.getElementById('joinEmail').form;


	var value = joinForm.domain[joinForm.domain.selectedIndex].value;
	var index = joinForm.domain.selectedIndex;
	var len = joinForm.domain.length;

	if( index == len-1 )
	{
		joinForm.m_email2.disabled = false;
		joinForm.m_email2.value=value;
		joinForm.m_email2.focus();
	}
	else if( index == 0 )
	{
		joinForm.m_email2.disabled = true;
		joinForm.m_email2.value="";
		joinForm.m_email1.focus();
	}
	else
	{
		joinForm.m_email2.disabled = true;
		joinForm.m_email2.value=value;
		joinForm.m_email1.focus();
	}


	return;
}
/*************************************************************************************************
* 교사인증 팝업
*************************************************************************************************/
function gpki(chk,m_mode){

	//2013 renewal : 주민번호 수집 금지 - 현 위치 코드 삭제함 by wgkim

	//if (document.form2.m_jumin.value == "")
	//{
		//if (confirm("주민등록번호 대체수단으로 가입하신 회원입니다. \n인증을 위해 주민등록 번호 입력후 다시 진행을 하셔야 합니다.")==true){
		//	//makeWin('/member/Ji.asp?m='+document.form2.m_id.value,'iJumin',410,250);
		//	location.href="/member/Ji.asp?m="+document.form2.m_id.value;
		//	return;
		//}
		//else
		//{
		//	location.href="/";
		//	return;
		//}
	//}

  xposition=0; yposition=0;
   if (parseInt(navigator.appVersion) >= 4){
      xposition = (screen.width - 485) / 2;
      //yposition = (screen.height - 447) / 2;
	  yposition = 0;

   }

//document.domain = document.form2.domain.value;
//document.domain = document.getElementById('m_id_f2').form.domain.value;
document.domain = "i-scream.co.kr";

if (chk == "P" || chk == "E" )
{
	//document.form2.authMethod.value=chk;
	//var AuthUrl = document.form2.AuthSeverPath.value;
	document.getElementById('m_id_f2').form.authMethod.value=chk;
	var AuthUrl = document.getElementById('m_id_f2').form.AuthSeverPath.value;

	//window.open('http://'+AuthUrl+'/AuthStep01.asp?m='+chk+'&mode='+m_mode,'popup','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=485,height=547,top='+yposition+',left='+xposition);

	//urlPath = 'http://'+AuthUrl+'/TrustWeb/TrustWeb_Demo.html?m='+chk+'&mode='+m_mode

	urlPath = 'http://'+ AuthUrl +'/TrustWeb/AuthStep01_j.asp?m='+chk+'&mode='+m_mode

	window.open(urlPath,'popup','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=485,height=547,top='+yposition+',left='+xposition);


}
else{

	//document.form1.authMethod.value=chk;
	document.getElementById('m_id_f1').form.authMethod.value=chk;
	var win = window.open('/member/certification.asp?m='+chk,'popup',
	'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=498,height=532,top='+yposition+',left='+xposition);

	win.focus();
	}
}
function pw_change(m_id)
{
	winobject = window.open("/member/change_pw.asp","pwch","toolbar=no,directories=no,status=yes,menubar=no,scrollbars=no,resizable=no,width=520,height=332,top=100,left=400");
	winobject.focus();
}

function chkPsw(form)
{
	$('#passCheck').attr({
		action : '/user/research/mypage/memberPasswordCheck.do',
		target : '_self'
	}).submit();

//	form.target="ifDetail";
//	form.action = "/member/passwordCheck.asp";
//	form.submit();
}
//자녀없음 선택시 중복선택 못하도록 처리
function fnChkChild() {
	//var f = document.joinForm;
	var f = document.getElementById('joinChildN').form;
	if (f.joinChildN.checked == true) {
		f.joinChild.checked = false;
		f.joinSchild1.checked = false;
		f.joinSchild2.checked = false;
		f.joinSchild3.checked = false;
		f.joinSchild4.checked = false;
		f.joinSchild5.checked = false;
		f.joinSchild6.checked = false;
		f.joinChild7.checked = false;
		//20120328 중고등 자녀정보 세분화
		//f.joinSchildMid.checked = false;
		f.joinSchildMid1.checked = false;
		f.joinSchildMid2.checked = false;
		f.joinSchildMid3.checked = false;
		f.joinSchildHi1.checked = false;
		f.joinSchildHi2.checked = false;
		f.joinSchildHi3.checked = false;
		//--------------------------------------

		f.joinChild.disabled = true;
		f.joinSchild1.disabled = true;
		f.joinSchild2.disabled = true;
		f.joinSchild3.disabled = true;
		f.joinSchild4.disabled = true;
		f.joinSchild5.disabled = true;
		f.joinSchild6.disabled = true;
		f.joinChild7.disabled = true;
		//20120328 중고등 자녀정보 세분화
		//f.joinSchildMid.disabled = true;
		f.joinSchildMid1.disabled = true;
		f.joinSchildMid2.disabled = true;
		f.joinSchildMid3.disabled = true;
		f.joinSchildHi1.disabled = true;
		f.joinSchildHi2.disabled = true;
		f.joinSchildHi3.disabled = true;
		//20140225 대학 자녀정보 추가
		f.joinSchildUni.disabled = true;
	}
	else {
		f.joinChild.disabled = false;
		f.joinSchild1.disabled = false;
		f.joinSchild2.disabled = false;
		f.joinSchild3.disabled = false;
		f.joinSchild4.disabled = false;
		f.joinSchild5.disabled = false;
		f.joinSchild6.disabled = false;
		f.joinChild7.disabled = false;
		//20120328 중고등 자녀정보 세분화
		//f.joinSchildMid.disabled = false;
		f.joinSchildMid1.disabled = false;
		f.joinSchildMid2.disabled = false;
		f.joinSchildMid3.disabled = false;
		f.joinSchildHi1.disabled = false;
		f.joinSchildHi2.disabled = false;
		f.joinSchildHi3.disabled = false;
		
		//20140225 대학 자녀정보 추가
		f.joinSchildUni.disabled = false;
	}
}


function findidpw_for_IPin(mode,sort){

	if(mode == "ipin"){
		makeWin('/user/member/ipin/ipin_request_seed.do?parentWindow='+sort,'ipin_chk',440,540,'yes');
	} else {
		makeWin('/user/member/ipin/pcc_V3_request_seed.do?parentWindow='+sort,'pcc_chk',440,540,'yes');
	}

}

/*************************************************************************************************
* 교사, 교대셍에 따른 파라미터 설정 후 페이지 이동
*************************************************************************************************/
function fnMovePage(mode, url) {
	
	$("#sort").val(mode); // mode - U: 교대생
	$("#teaherYn").attr("action", url).submit();
} 