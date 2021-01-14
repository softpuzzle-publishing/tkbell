/**
 * WiseLog 공통 로그 쌓기
 */
var wiseLogCommon = {
	/*
	 * 목표설정
	 */
	logSend:function(clickUrl){
		var domain = "http://www.i-scream.co.kr";
		n_click_logging(domain+clickUrl);
		//console.log("WiseLog Param : "+domain+clickUrl);
	},
	/*
	 * 타도메인전환분석
	 */
	clickUrlSend:function(clickType){
		var domain = "http://www.i-scream.co.kr/wiseLog.jsp?link=";	//"http://"+location.host+"?link=";
		n_click_logging(domain+clickType);
		//원격호출
		$.ajax({url: domain+clickType, success: function(data){
			//Todo
	    }});		
		//console.log("WiseLog Param : "+domain+clickType);
	},
	/* 인페이지 분석
	 * n_so_pid(1x); : 메인
	 * n_so_pid(2x); : 교과활동
	 * n_so_pid(3x); : 창의적 체험활동
	 * n_so_pid(4x); : 쉬는 시간
	 * n_so_pid(5x); : 수행평가
	 * n_so_pid(6x); : 커뮤니티
	 * n_so_pid(7x); : 내연구실
	 * n_so_pid(8x); : 차시창
	 * n_so_pid(9x); : 통합뷰어 
	 * */
	clickDataSend:function(clickType){		
		var domain = "http://www.i-scream.co.kr/wiseLog.jsp?area=";
		n_click_logging(domain+clickType);
		//console.log("WiseLog Param : "+domain+clickType);
	},
	/*
	 * 평가자료 다운로드
	 * key1 = evanum
	 * key2 = seq
	 * key3 = tp
	 */
	clickEvaluation:function(key1, key2, key3){
		var domain = "http://www.i-scream.co.kr/";
		var param = "wiseLog.jsp?evanum="+key1+"&seq="+key2+"&tp="+key3;
		$.ajax({url: domain+param, success: function(data){
			//Todo
	    }});		
		//console.log(domain+param);
	},
	/*
	 * 교과활동 한글파일 다운로드
	 * type = {basic : 알짜정리, 수업준비물, 익침책, 과정안, 활동지 등등, share : 공유 자료실}
	 */
	subjectEtcClick:function(type, item_seq){
		var domain = "http://www.i-scream.co.kr/";
		var param = "";//"wiseLog.jsp?key1="+key1+"&key2="+key2+"&key3="+key3;
		
		if(type == "basic"){
			param = "wiseLog.jsp?item_seq="+item_seq;
		}else{
			param = "wiseLog.jsp?chasi_plan_seq="+item_seq;
		}
		
		$.ajax({url: domain+param, success: function(data){
			//Todo
	    }});
		
		//console.log(type + item_seq);
	}
};

var parseData = (function() {
	var s = 1; // 컨텐츠 출처 (1:LCMS, 2:교과, 3:비교과, 4:지역교과, 5:동요노래방, 6:계기교육)
	var r; // 이전메뉴 (1:교과활동, 2: 창체, 3:쉬는시간, 4:커뮤니티, 5:메인, 6:지역교과)
	var d; // 이전메뉴 상세
	var n; // 콘텐츠 이름
	var c; // 콘텐츠 타입
	var g; // 학년
	var t; // 학기 
	var l; // 차시페이지내 컨텐츠구분(step:단계별 학습자료, support:아이스크림자료, iscream:교수학습자료검색)
	var cObj = {"TXT": "3", "MOV": "4", "MOD": "5", "IMGS": "6", "IMG": "7", "LINK": "8", "HTML5": "9"};
  function sendLog() {
    if(r == 1){ //교과일 때 
    	//var query = '?r=' + r + '&s=' + s + '&d=' + d + '&n=' + n + '&c=' + c + '&g=' + g + '&t=' + t;
    	//console.log(query);
    	//alert(query);
    	try {
	    	_n_p1 = r.toString(); // 이전메뉴
	    	_n_p2 = s.toString(); // 컨텐츠 출처
	    	_n_p3 = d.toString(); // 이전 메뉴 상세
	    	if(n != undefined) {
	    		_n_p4 = n.toString(); // 컨텐츠 이름
	    	}
	    	if(c != undefined) {
	    		_n_p5 = c.toString(); // 컨텐츠 카테고리
	    	}
	    	_n_p6 = g.toString(); // 학년
	    	_n_p7 = t.toString(); // 학기    		
	    	
	    	if(l != undefined){
	    		_n_p8 = l.toString();//차시페이지내 컨텐츠구분
	    	}
			n_logging();
		} catch (e) {
			//console.log(e);
		}    	
    }else{ //비교과일 때 
    	//var query = '?r=' + r + '&s=' + s + '&d=' + d + '&n=' + n + '&c=' + c;
    	//console.log(query);
    	//alert(query);
    	try {
	    	_n_p1 = r.toString(); // 이전메뉴
	    	_n_p2 = s.toString(); // 컨텐츠 출처
	    	_n_p3 = d.toString(); // 이전 메뉴 상세
	    	if(n != undefined) {
	    		_n_p4 = n.toString(); // 컨텐츠 이름
	    	}
	    	if(c != undefined) {
	    		_n_p5 = c.toString(); // 컨텐츠 카테고리
	    	}
			n_logging();
		} catch (e) {
			//console.log(e);
		}
    }
  }
  return {
	setReferer: function(referer) {
		if(referer.indexOf('/ChasiView.do') != -1){ // 교과활동 차시창 진입시
			r = 1; // 교과활동
		}else if(referer.indexOf('/subject/') != -1){ // 교과활동 차시리스트 진입시
			// 차시 리스트에서 처리
		}else if(referer.indexOf('/discretion/') != -1){
			r = 2; // 창체
		}else if(referer.indexOf('/rest/') != -1){
			r = 3; // 쉬는시간
		}else if(referer.indexOf('/community/') != -1){
			r = 4; // 커뮤니티
		}else if(referer.indexOf('/main/') != -1){
			r = 5; // 메인
			parseData.setD(0);
		}else if(referer.indexOf('/local/') != -1){ // 교과활동 지역사진
			r = 1; // 교과활동 지역교과시진
		}
		return r;
    }, 
	setD: function(dVal) {
		d = dVal;
    },     
	setR: function(rVal) {
		r = rVal;
    },        
    setChasiInfo: function(gradeCd, termCd, chasiPlanSeq, sort) {
    	g = gradeCd;
    	t = termCd;
    	d = chasiPlanSeq;
    	if(sort != undefined){
    		if("viewer" == sort || "goldenbell" == sort || "local" == sort){
    			l = "support";
        	}else{
        		l = sort;
        	}
    	}
    	
    },
    setContentInfo: function(contentNo, contentTypeCd, nS) {
    	if(contentNo != undefined && contentNo != ""){
    		n = contentNo;
    	}
    	
    	c = cObj[contentTypeCd];
    	if(nS != undefined){
    		s = nS; //컨텐츠 출처 변경 필요시 변경
    	}    	
    	sendLog();
    },    
    getR: function() {
    	return r;
    },
    getChasiInfo: function(chasiPlanSeq, useItemInfo) {
		$.ajax({
			url			: '/user/subject/selectChasiInfo.json'
			,async		: false
			,type		: 'POST'
			,dataType	: 'json'
			,cache		: false
			,data		: {
				'chasi_plan_seq' : chasiPlanSeq
			}
			,success  : function(data) {
				var chasiInfo = data.chasiInfo;
				g = chasiInfo.gradeCd;
				t = chasiInfo.termCd;
				d = chasiInfo.chasiPlanSeq;
				
				if(useItemInfo == true){
					var itemInfo = data.itemInfo;
					for(var i in itemInfo){
						if(itemInfo[i].itemType == "CM0004" || itemInfo[i].itemType == "CM0005" || itemInfo[i].itemType == "CM0008" || itemInfo[i].itemType == "CM0009"){
							n = itemInfo[i].itemSeq;
						}
					}
				}
			}
		});		
    },     
  }   
})();

var queryString = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}();