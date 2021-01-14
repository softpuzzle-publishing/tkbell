/**
 * BannerLog 공통 로그 쌓기
 */
var iscreamLog = {
	/*
	 * 배너 & 추천컨텐츠 클릭 로그 수집
	 * 카테고리 컨텐츠 로그 수집 추가(#26044)
	 */
	clickLogSequence:function(bannerSeq,logType){
		try{
			$.ajax({
				type:"POST",
	            url:'/api/log/bannerLogSend',
	            dataType:'json',
	            data : {
	                bannerSequence : bannerSeq,
	                logType : logType
	              },
	            success:function(data){
	            	//success
	            }
	        });	
		}catch(e){
			//console.log(e);
		}
	},
	/*
	 * 평가자료 다운로드 로그 수집
	 */
	evaluationDownLog:function(evanum, seq, type){
		try{
			$.ajax({
				type:"POST",
	            url:'/api/log/evaluationLogSend',
	            dataType:'json',
	            data : {
	            	evanum : evanum,
	            	seq : seq,
	            	type : type
	              },
	            success:function(data){
	            	//success
	            }
	        });	
		}catch(e){
			//console.log(e);
		}		
	}
};