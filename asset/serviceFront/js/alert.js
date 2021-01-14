/**
*	
*	javascript alertC, confirmC and progressC by flashkid (Version 0.0.1)
*
*	Copyright:
*		
*		Copyright (c) 2013 by i-Scream Media All rights reserved.
*			
*	Change Log:
*		
*		v0.0.1	(2013-07-02) - make
*
*	Description:
*		
*		사용자 정의 알럿창, 컨펌창, 프로그래스 창
*
*		알럿창 호출 방법 : alertC('메세지');
*		알럿창 호출 방법2 : alertC('메세지',callback); //콜백이 있는 경우
*
*		컨펌창 호출 방법 : confirmC({msg:'메세지',
*									 callBackPositive:{msg:'버튼이름',method:콜백함수},
*									 callBackNegative:{msg:'버튼이름',method:콜백함수},
*									 callBackOther:{msg:'버튼이름',method:콜백함수}
*									 });
*		컨펌창 특별 케이스 내부 정의 가능	:	confirmC('new');//새로 만들기, confirmC('close');//닫기
*
*		프로그래스 창 호출 방법 : progressC({kind:창 종류('upload'),	//by Designer : 업로드 : upload, 로드 : load, 변환 : convert	*** 추가사항 발생 시 디자인 파트에 문의 바랍니다!!!!!
*											 tit:창 타이틀('업로드중'),
*											 msg:메세지('진행중입니다. 잠시만 기다리세요.'),
*											 remTime:남은 시간('5분 20초'),
*											 progress:프로그래스 퍼센트(55),
*											 length:파일 카운트('1/100'),
*											 callBack:프로그래스 완료 후 콜백	// progress: 100 을 넘기면 프로그래스 바를 100% 까지 그린 후, 자동으로 콜백 호출 / 초기화 / 창닫기
*											 });
*		프로그래스 진행 시 해당 사항만 넘겨줌	:	progressC({remTime:'3분 10초'});	//남은 시간만 변경되는 경우
*													progressC({progress:50});			//프로그래스 퍼센트만 변경되는 경우
*													progressC({progress:30,remTime:'2분 40초',length:'55/100'});			//여러 속성이 함께 변경되는 경우
*
*	Notice:
*		
*		본 소스는 자바스크립트만을 이용하여 작성되었습니다.
*		제이쿼리를 사용해야하는 커튼 호출은 본 페이지에서는 호출하지 않습니다.
*		만약 창이 열리고 바닥 컨트롤을 막아야 한다면 브라우저의 사용과 동일하게 검은 배경이 아닌 투명 배경의 커튼을 사용할까 합니다.
*		이에 대한 요청이 있으면 작업하도록 하겠습니다.
*		감사합니다.
*	
**/

var alertWin = {
	title : '알려드립니다',
	msg : '',
	callback : null,
	init : function(){
		alertWin.alertCurtain = alertCurtain();
		var alertDiv = document.createElement('div');
		alertDiv.className = 'alert';
		document.body.appendChild(alertDiv);
		alertWin.container = alertDiv;
		var h = document.createElement('h2');
		h.innerHTML = alertWin.title;
		alertDiv.appendChild(h);
		var con = document.createElement('div');
		con.className = 'con';
		alertDiv.appendChild(con);
		var txtCon = document.createElement('div');
		txtCon.className = 'msg';
		txtCon.innerHTML = alertWin.msg;
		con.appendChild(txtCon);
		var btnCon = document.createElement('div');
		btnCon.className = 'btnCon';
		con.appendChild(btnCon);
		var btn = document.createElement('button');
		btn.type='button';
		btn.innerHTML = '확인';
		btnCon.appendChild(btn);
		btn.focus();
		
		btn.addEventListener('click',alertWin.close);
		if(alertWin.callback !== null){
			btn.addEventListener('click',alertWin.callback);
		}
		
		alertDiv.style.marginLeft = -(alertDiv.offsetWidth/2) + 'px';
		var h = window.innerHeight || document.body.clientHeight;
		alertDiv.style.top = (h - alertDiv.offsetHeight)/2 + 'px';
			//$(alertDiv).prevAll().addClass('blur');
	},
	close : function(event){
		//$('.blur').removeClass('blur');
		document.body.removeChild(alertWin.alertCurtain);
		document.body.removeChild(alertWin.container);
		alertWin.msg = '';
		alertWin.callback = null;
	}
};

var alertC = function (param){
	if(typeof(param) === 'string') {
		alertWin.msg = param;
	} else {
		for(var i in param){
			alertWin[i] = param[i];
		}
	}
	alertWin.init();
};

var confirmWin = {
	title : 'Message',
	msg:'',
	callBackPositive:{
		msg	: 'Confirm',
		method : null
	},
	callBackNegative:{
		msg	: 'No',
		method : null
	},
	callBackOther:{
		msg	: 'Cancle',
		method : null
	},
	init : function(){
		confirmWin.alertCurtain = alertCurtain();
		var confirmDiv = document.createElement('div');
		confirmDiv.className = 'alert';
		document.body.appendChild(confirmDiv);
		confirmWin.container = confirmDiv;
		var h = document.createElement('h2');
		h.innerHTML = confirmWin.title;
		confirmDiv.appendChild(h);

		var con = document.createElement('div');
		con.className = 'con';
		confirmDiv.appendChild(con);

		var txtCon = document.createElement('div');
		txtCon.className = 'msg';
		txtCon.innerHTML = confirmWin.msg;
		con.appendChild(txtCon);

		var btnCon = document.createElement('div');
		btnCon.className = 'btnCon';
		con.appendChild(btnCon);

		var positive = document.createElement('button');
		positive.type='button';
		positive.innerHTML = confirmWin.callBackPositive.msg;
		btnCon.appendChild(positive);
		positive.addEventListener('click',confirmWin.close);
		positive.addEventListener('click',confirmWin.callBackPositive.method);
		if(confirmWin.callBackNegative.method !== null){
			var negative = document.createElement('button');
			negative.type='button';
			negative.innerHTML = confirmWin.callBackNegative.msg;
			btnCon.appendChild(negative);
			negative.addEventListener('click',confirmWin.close);
			negative.addEventListener('click',confirmWin.callBackNegative.method);
		}

		var other = document.createElement('button');
		other.type='button';
		other.innerHTML = confirmWin.callBackOther.msg;
		btnCon.appendChild(other);
		other.addEventListener('click',confirmWin.close);
		if(confirmWin.callBackOther.method !== null){
			other.addEventListener('click',confirmWin.callBackOther.method);
		}

		confirmDiv.style.marginLeft = -(confirmDiv.offsetWidth/2) + 'px';
		var h = window.innerHeight || document.body.clientHeight;
		confirmDiv.style.top = (h - confirmDiv.offsetHeight)/2 + 'px';
	},
	close : function(event){
		document.body.removeChild(confirmWin.alertCurtain);
		document.body.removeChild(confirmWin.container);
		confirmWin.msg='';
		confirmWin.callBackPositive.msg = "Confirm";
		confirmWin.callBackPositive.method = null;
		confirmWin.callBackNegative.msg = "No";
		confirmWin.callBackNegative.method = null;
		confirmWin.callBackOther.msg = "Cancle";
		confirmWin.callBackOther.method = null;
	}
};

var confirmC = function (distribute){
	switch (distribute)
	{
	case 'close':
		confirmWin.msg = '지금 만들고 있는 문서를 저장한 후,<br />문서를 닫으시겠습니까?';
		confirmWin.callBackPositive = {msg	:	"Yes"
									  ,method	:	function(){
													  alertC('저장하고');
													  alertC('닫기');
													}
									  };
		confirmWin.callBackNegative = {msg	:	"No"
									  ,method	:	function(){
													  alertC('저장하지 않고 닫기');
													}
									  };
		break;
	case 'new':
		confirmWin.msg = '지금 만들고 있는 문서를 저장한 후,<br />새로 만드시겠습니까?';
		confirmWin.callBackPositive = {msg	:	"Yes"
									  ,method	:	function(){
													  alertC('저장하고');
													  alertC('새로 만들기');
													}
									  };
		confirmWin.callBackNegative = {msg	:	"No"
									  ,method	:	function(){
													  alertC('저장하지 않고 새로 만들기');
													}
									  };
		break;
	default :
        if(typeof(distribute) == "string") {
            confirmWin.msg = distribute;
        } else {
            for (var i in distribute) {
                confirmWin[i] = distribute[i];
            }
        }
	}

	confirmWin.init();
};

var promptWin = {
	title		: 'AnyAuthor',
	value		: '',
	callBackPositive:{
		msg	: 'OK',
		method : null
	},
	callBackOther:{
		msg	: 'Cancle',
		method : null
	},
	init	:	function(){
		promptWin.alertCurtain = alertCurtain();
		var promptDiv = document.createElement('div');
		promptDiv.className = 'alert';
		document.body.appendChild(promptDiv);
		promptWin.container = promptDiv;
		var h = document.createElement('h2');
		h.innerHTML = promptWin.title;
		promptDiv.appendChild(h);

		var con = document.createElement('div');
		con.className = 'con';
		promptDiv.appendChild(con);

		var txtCon = document.createElement('div');
		txtCon.className = 'msg';
		txtCon.innerHTML = "<span>" + promptWin.msg + "</span>";
		con.appendChild(txtCon);

		var input = document.createElement('input');
		input.type = 'text';
		input.value = promptWin.value;
		txtCon.appendChild(input);
		input.addEventListener('keyup',function(){promptWin.value = this.value;});

		var btnCon = document.createElement('div');
		btnCon.className = 'btnCon';
		con.appendChild(btnCon);

		var positive = document.createElement('button');
		positive.type='button';
		positive.innerHTML = promptWin.callBackPositive.msg;
		btnCon.appendChild(positive);
		positive.addEventListener('click', promptWin.callPositiveMethod);
		positive.addEventListener('click',function(){
			if(!promptWin.callBackPositive.updateMsg){
				promptWin.close();
			} else {
				txtCon.querySelector('span').innerHTML = promptWin.callBackPositive.updateMsg;
				txtCon.querySelector('input').focus();
				promptWin.callBackPositive.updateMsg = null;
			}
			return input.value;
		});

		var other = document.createElement('button');
		other.type='button';
		other.innerHTML = promptWin.callBackOther.msg;
		btnCon.appendChild(other);
		other.addEventListener('click',promptWin.callBackOther.method);
		other.addEventListener('click',promptWin.close);

		promptDiv.style.marginLeft = -(promptDiv.offsetWidth/2) + 'px';
		var h = window.innerHeight || document.body.clientHeight;
		promptDiv.style.top = (h - promptDiv.offsetHeight)/2 + 'px';

		input.focus();
	},
	callPositiveMethod : function(){
		if( promptWin.callBackPositive.method ){
			promptWin.callBackPositive.method(promptWin.value);
		}
	},
	close : function(event){
		document.body.removeChild(promptWin.alertCurtain);
		document.body.removeChild(promptWin.container);
		promptWin.msg='';
		promptWin.value = '';
		promptWin.callBackPositive.msg = "OK";
		promptWin.callBackPositive.method = null;
		promptWin.callBackOther.msg = "Cancle";
		promptWin.callBackOther.method = null;
	}
};

var promptC = function(param){
	for(var i in param){
		promptWin[i] = param[i];
	}
	promptWin.init();
};

promptC.close = function() {
	promptWin.close();
};

var promptLoginWin = {
	title		: '로그인',
	valueId			: '',
	valuePassword	: '',
	callBackPositive:{
		msg	: 'OK',
		method : null
	},
	callBackOther:{
		msg	: 'Facebook Login',
		method : null
	},
	callBackNegative:{
		msg	: 'Cancel',
		method : null
	},
	init	:	function(){
		promptLoginWin.alertCurtain = alertCurtain();
		var promptDiv = document.createElement('div');
		promptDiv.className = 'alert';
		document.body.appendChild(promptDiv);
		promptLoginWin.container = promptDiv;
		var h = document.createElement('h2');
		h.innerHTML = promptLoginWin.title;
		promptDiv.appendChild(h);

		var con = document.createElement('div');
		con.className = 'con';
		promptDiv.appendChild(con);

		var txtCon = document.createElement('div');
		txtCon.className = 'msg';
		txtCon.innerHTML = '아이디';
		con.appendChild(txtCon);

		var input = document.createElement('input');
		input.value = promptLoginWin.valueId;
		txtCon.appendChild(input);
		input.addEventListener('keyup',function(){promptLoginWin.valueId = this.value;});

		//$(txtCon).css('padding','0px 0px 0px 0px');
		txtCon.style.padding = '0 0 0 0';
		
		var txtConPassword = document.createElement('div');
		txtConPassword.className = 'msg';
		txtConPassword.innerHTML = '패스워드';
		con.appendChild(txtConPassword);
		
		var inputPassword = document.createElement('input');
		inputPassword.value = promptLoginWin.valuePassword;
		inputPassword.type = 'password';
		txtConPassword.appendChild(inputPassword);
		inputPassword.addEventListener('keyup',function(){promptLoginWin.valuePassword = this.value;});
		
		//$(txtConPassword).css('padding','0px 0px 0px 0px');
		txtConPassword.style.padding = '0 0 0 0';
		
		var btnCon = document.createElement('div');
		btnCon.className = 'btnCon';
		con.appendChild(btnCon);

		var positive = document.createElement('button');
		positive.type='button';
		positive.innerHTML = promptLoginWin.callBackPositive.msg;
		btnCon.appendChild(positive);
		positive.addEventListener('click',promptLoginWin.callPositiveMethod);
		//positive.addEventListener('click',promptLoginWin.close);

		var other = document.createElement('button');
		other.type='button';
		other.innerHTML = promptLoginWin.callBackOther.msg;
		btnCon.appendChild(other);
		other.addEventListener('click',promptLoginWin.callBackOtherMethod);
		
		
		var negative = document.createElement('button');
		negative.type='button';
		negative.innerHTML = promptLoginWin.callBackNegative.msg;
		btnCon.appendChild(negative);
		negative.addEventListener('click',promptLoginWin.callBackNegativeMethod);
		negative.addEventListener('click',promptLoginWin.close);
		

		promptDiv.style.marginLeft = -(promptDiv.offsetWidth/2) + 'px';
		var h = window.innerHeight || document.body.clientHeight;
		promptDiv.style.top = (h - promptDiv.offsetHeight)/2 + 'px';
	},
	callPositiveMethod : function(){
		promptLoginWin.callBackPositive.method(promptLoginWin.valueId,promptLoginWin.valuePassword);
	},
	callBackOtherMethod : function(){
		promptLoginWin.callBackOther.method(promptLoginWin.valueId,promptLoginWin.valuePassword);
	},
	callBackNegativeMethod : function(){
		promptLoginWin.callBackNegative.method();
	},
	close : function(event){
		document.body.removeChild(promptLoginWin.alertCurtain);
		document.body.removeChild(promptLoginWin.container);
		promptLoginWin.msg='';
		promptLoginWin.callBackPositive.msg = "OK";
		promptLoginWin.callBackPositive.method = null;
		promptLoginWin.callBackOther.msg = "Cancle";
		promptLoginWin.callBackOther.method = null;
	}
};

var promptLoginC = function(param){
	for(var i in param){
		promptLoginWin[i] = param[i];
	}
	promptLoginWin.init();
};

promptLoginC.close = function() {
	promptLoginWin.close();
};

var progressWin = {
	tit			:	'',
	message		:	'',
	msg			:	function(txt){
		progressWin.message = txt;
		if(!progressWin.container){ return; }
		var msgCon = progressWin.container.getElementsByClassName('msg');
		if(msgCon.length > 0){
			msgCon[0].innerHTML = progressWin.message;
		}
	},
	kind		:	'',
	callBack	:	null,/*여기까지 외부에서 지정. 이하 내부에서만 사용. to 진석 : 혹시 모르니 외부에서 건들 수 없도록 할 수 있을까?*/
	per			:	0,
	container	:	null,
	progressBar	:	null,
	aniTimer	:	null,
	autoClose	:	false,
	init		:	function(){
		progressWin.alertCurtain = alertCurtain();
		progressWin.container = document.createElement('div');
		progressWin.container.className = 'progress alert';
		document.body.appendChild(progressWin.container);
		var h = document.createElement('h2');
		h.innerHTML = progressWin.tit;
		progressWin.container.appendChild(h);
		var con = document.createElement('div');
		con.className = 'con';
		progressWin.container.appendChild(con);
		var txtCon = document.createElement('div');
		txtCon.className = 'msg '+progressWin.kind;
		txtCon.innerHTML = progressWin.message;
		con.appendChild(txtCon);
		progressWin.container.style.marginLeft = -(progressWin.container.offsetWidth/2) + 'px';
		var h = window.innerHeight || document.body.clientHeight;
		progressWin.container.style.top = (h - progressWin.container.offsetHeight)/2 + 'px';
	},
	currentLength	:	function(cnt){
		progressWin.length({currentLength:cnt});
	},
	totalLength	:	function(cnt){
		progressWin.length({totalLength:cnt});
	},
	length		:	function(obj){
		if(progressWin.container === null){
			progressWin.init();
		}
		var fileLength = progressWin.container.getElementsByClassName('fileLeng')[0];
		var cLength = progressWin.container.getElementsByClassName('cLength')[0];
		var tLength = progressWin.container.getElementsByClassName('tLength')[0];
		if( fileLength === undefined ){
			fileLength = document.createElement('div');
			fileLength.className = "fileLeng";
			cLength = document.createElement('span');
			cLength.className = 'cLength';
			tLength = document.createElement('span');
			tLength.className = 'tLength';
			fileLength.appendChild(cLength);
			fileLength.appendChild(tLength);
			if( progressWin.container.getElementsByClassName('remTimer').length > 0 ){
				progressWin.container.getElementsByClassName('con')[0].insertBefore(fileLength,progressWin.container.getElementsByClassName('remTimer')[0]);
			} else {
				progressWin.container.getElementsByClassName('con')[0].appendChild(fileLength);
			}
		}
		if(!!obj.currentLength){
			cLength.innerHTML = obj.currentLength; 
		}
		if(!!obj.totalLength){
			tLength.innerHTML = obj.totalLength;
		}
		//fileLength.innerHTML = cnt;
	},
	remTime		:	function(time){
		if(progressWin.container === null){
			progressWin.init();
		}
		var remTimer = progressWin.container.getElementsByClassName('remTimer')[0];
		if( remTimer === undefined ){
			remTimer = document.createElement('div');
			remTimer.className = "remTimer";
		}
		remTimer.innerHTML = '완료까지 남은 예상시간 : ' + time;
		progressWin.container.getElementsByClassName('con')[0].appendChild(remTimer);
	},
	progress	:	function(per){
		progressWin.per = per;
		if(progressWin.container === null){
			progressWin.init();
		}
		if( progressWin.progressBar === null){
			progressWin.progressBar = document.createElement('div');
			progressWin.progressBar.className = "progressBar";
			if( progressWin.container.getElementsByClassName('fileLeng').length > 0 ){
				progressWin.container.getElementsByClassName('con')[0].insertBefore(progressWin.progressBar,progressWin.container.getElementsByClassName('fileLeng')[0]);
			} else if( progressWin.container.getElementsByClassName('remTimer').length > 0 ) {
				progressWin.container.getElementsByClassName('con')[0].insertBefore(progressWin.progressBar,progressWin.container.getElementsByClassName('remTimer')[0]);
			} else {
				progressWin.container.getElementsByClassName('con')[0].appendChild(progressWin.progressBar);
			}
			var barBg = document.createElement('span');
			barBg.className = "barBg";
			progressWin.progressBar.appendChild(barBg);
			var bar = document.createElement('span');
			bar.className = "bar";
			barBg.appendChild(bar);
			var mark = document.createElement('span');
			mark.className = "mk";
			progressWin.progressBar.appendChild(mark);
		}
		clearInterval(progressWin.aniTimer);
		progressWin.aniTimer = setInterval(progressWin.initProgress,10);
	},
	initProgress	: function(){
		if ( progressWin.progressBar == null){ return; }
		var wp = progressWin.progressBar.getElementsByClassName('bar')[0].style.width.replace('%','');
		wp++;
		if(wp >= progressWin.per) {
			wp = progressWin.per;
			clearInterval(progressWin.aniTimer);
		}
		progressWin.progressBar.getElementsByClassName('bar')[0].style.width = wp +'%';
		progressWin.progressBar.getElementsByClassName('mk')[0].innerHTML = wp + '%';
		progressWin.progressBar.getElementsByClassName('mk')[0].style.left = (progressWin.progressBar.getElementsByClassName('bar')[0].offsetWidth-progressWin.progressBar.getElementsByClassName('mk')[0].offsetWidth/2) + 'px';
		if(wp == 100 && progressWin.container.getElementsByClassName('cLength')[0].innerHTML / progressWin.container.getElementsByClassName('tLength')[0].innerHTML === 1){
			if ( progressWin.callBack ) { progressWin.callBack(); }
			if ( progressWin.autoClose ) { progressWin.close(); }
		}
	},
	close		:	function(){
		if(!progressWin.container) return;
		document.body.removeChild(progressWin.alertCurtain);
		document.body.removeChild(progressWin.container);
		progressWin.tit			=	'';
		progressWin.message		=	'';
		progressWin.kind		=	'';
		progressWin.callBack	=	null;
		progressWin.per			=	0;
		progressWin.container	=	null;
		progressWin.progressBar	=	null;
	}
};

var progressC = function(obj){
	var lastFnc = null;
	for(var i in obj){
		switch( typeof progressWin[i] ){
			case 'function' :
				if(i !== 'progress') {
					progressWin[i](obj[i]);
				} else {
					lastFnc = i;
				}
				break;
			default:
				progressWin[i] = obj[i];
				break;
		}
	}
	if(!!lastFnc) { progressWin[lastFnc](obj[lastFnc]); }
};

progressC.close = function() {
	progressWin.close();
};

var alertCurtain = function(){
	var ac = document.createElement('div');
	ac.className = 'alertCurtain';
	/*ac.style.width = document.body.clientWidth+'px';
	ac.style.height = document.body.clientHeight+'px';*/
	document.body.appendChild(ac);
	return ac;
}