$(function(){
//	$("#unit02Seq").hide();
//	$("#unit03Seq").hide();
//	$("#unit04Seq").hide();
});

// 차시 정보 클릭시
$(document).on("click", "#selectChasiDiv ul>li>a", function(){
	var schoolType = $("input[type=radio][name=schoolType]:checked").val();
	var id = $(this).parents("ul").attr("id");
	var val = $(this).parents("li").data("val");
	$(this).parents("li").siblings().removeClass("active");
	$(this).parents("li").addClass("active");
//	console.log(id);
	
	// 차시 선택 하위 정보 초기화
	initChasiSelect(id);

	var gradeCdName = $("#gradeCd li.active a").text();
	var termCdName = $("#termCd li.active a").text();
	var subjectCdName = $("#subjectCd li.active a").text();
	var publisherCdName = $("#publisherCd li.active a").text();
	
	// 선택 텍스트 표시 대상
	var $targetText = $(".btn-qfilter div.option-preview");
	var $targetInfo = $(".btn-qfilter em");
	var seletedText = "";
	var infoText = "";
	var schoolTypeNm = "";
	if(schoolType == "EM"){ // 초등
		schoolTypeNm = "초등>";
	} else if (schoolType == "MD"){ // 중등
		schoolTypeNm = "중등>"
	} else if (schoolType == "HI"){ // 고등
		schoolTypeNm = "고등>"
	}
	
	if(schoolType == "EM"){ // 초등
		// 학년, 학기 선택시
		if(id == "gradeCd" || id == "termCd"){
			// 학년, 학기 value
			var gradeCd = $("#gradeCd li.active").data("val"); // 학년
			var termCd = $("#termCd li.active").data("val"); // 학기
			if(typeof gradeCd == "undefined" || gradeCd == null){
				gradeCd = "";
			}
			if(typeof termCd == "undefined" || termCd == null){
				termCd = "";
			}
			
			// 과목 리스트 조회
			if(gradeCd != "" && termCd != ""){
				fnGetSubjectList(gradeCd, termCd);
			}
			
			// 안내 텍스트 설정
			if(id == "gradeCd"){
				// 학년 공통일때 학기 hide 
				if(gradeCd == "0"){ // 공통
					$("#termCd").hide(); // 학기 hide 
					infoText = "";
					// 학기 정보 제거
					$("#termCd li").removeClass("active") 
				} else { 
					$("#termCd").show(); // 학기 show 
					infoText = "학기, 과목, 단원, 차시를 선택하세요.";
				}
				
				$targetText.text(schoolTypeNm + gradeCdName);
//			infoText = "학기, 과목, 단원, 차시를 선택하세요.";
				$targetInfo.text(infoText);
				
			}
			if(id == "termCd"){
				$targetText.text(schoolTypeNm + gradeCdName + ">" + termCdName);
				infoText = "과목, 단원, 차시를 선택하세요.";
				$targetInfo.text(infoText);
			}
		} 
		
		// 과목 선택시
		if(id == "subjectCd"){
			// 과목 value
			var lessonPlanSeq = $("#subjectCd li.active").data("lesson-plan-seq");
			
			// 출판사 리스트 조회 
			if(typeof lessonPlanSeq != "undefined"){
				fnGetPublisherList(lessonPlanSeq);
			}
			
			// 안내 텍스트 설정
			$targetText.text(schoolTypeNm + gradeCdName + ">" + termCdName + ">" + subjectCdName);
			infoText = "단원, 차시를 선택하세요.";
			$targetInfo.text(infoText);
		}
		
		// 출판사 선택시
		if(id == "publisherCd"){
			// 출판사 value
			var lessonPlanSeq = $("#publisherCd li.active").data("lesson-plan-seq");
			
			// 차시 리스트 조회
			if(typeof lessonPlanSeq != "undefined"){
				fnGetChasiList(lessonPlanSeq);
			}
			
			// 안내 텍스트 설정
			$targetText.text(schoolTypeNm + gradeCdName + ">" + termCdName + ">" + subjectCdName + ">" + publisherCdName);
			infoText = "차시를 선택하세요.";
			$targetInfo.text(infoText);
		}
		
		// 대단원 선택시
		if(id == "unit01Seq"){
			var unit01Seq = $("#unit01Seq li.active").data("val");
			var unit02Len = $("#unit02Seq li[data-unit-01-seq='"+unit01Seq+"']").length;
			// console.log("unit01Seq: " + unit01Seq);
			// console.log("unit02Len: " + unit02Len);
			
			if(unit02Len > 0){ // 중단원 있으면 show
				$("#unit02Seq li").hide();
				$("#unit02Seq li[data-unit-01-seq='"+unit01Seq+"']").show();
				$("#unit02Seq").show();
			} else { // 차시 정보 show
//			console.log("unit01Seq: " + unit01Seq);
				$("#unit04Seq li").hide();
				$("#unit04Seq li[data-unit-01-seq='"+unit01Seq+"']").show();
				$("#unit04Seq").show();
				$("#unit02Seq").hide();
			}
			
			// 안내 텍스트 설정
			var chasiDesc =  $("#unit01Seq li.active").data("chasi-desc");
			$targetText.text(schoolTypeNm + chasiDesc);
			infoText = "차시를 선택하세요.";
			$targetInfo.text(infoText);
		}
		
		// 중단원 선택시
		if(id == "unit02Seq"){
			var unit02Seq = $("#unit02Seq li.active").data("val");
			var unit03Len = $("#unit03Seq li[data-unit-02-seq='"+unit02Seq+"']").length;
			
			if(unit03Len > 0){ // 소단원 있으면 show
				$("#unit03Seq li").hide();
				$("#unit03Seq li[data-unit-02-seq='"+unit02Seq+"']").show();
				$("#unit03Seq").show();
			} else { // 차시 정보 show
//			console.log("unit02Seq: " + unit02Seq);
				$("#unit04Seq li").hide();
				$("#unit04Seq li[data-unit-02-seq='"+unit02Seq+"']").show();
				$("#unit04Seq").show();
			}
			
			// 안내 텍스트 설정
			var chasiDesc =  $("#unit02Seq li.active").data("chasi-desc");
			$targetText.text(schoolTypeNm + chasiDesc);
			infoText = "차시를 선택하세요.";
			$targetInfo.text(infoText);
		}
		
		// 소단원 선택시
		if(id == "unit03Seq"){
			var unit03Seq = $("#unit03Seq li.active").data("val");
			
			$("#unit04Seq li").hide();
			$("#unit04Seq li[data-unit-03-seq='"+unit03Seq+"']").show();
			$("#unit04Seq").show();
			
			// 안내 텍스트 설정
			var chasiDesc =  $("#unit03Seq li.active").data("chasi-desc");
			$targetText.text(chasiDesc);
			infoText = "차시를 선택하세요.";
			$targetInfo.text(infoText);
		}
		
		// 차시 선택시
		if(id == "unit04Seq"){
			// 안내 텍스트 설정
			var chasiDesc =  $("#unit04Seq li.active").data("chasi-desc");
			$targetText.text(chasiDesc);
			infoText = "";
			$targetInfo.text(infoText);
		}
	} else { // 중등, 고등
		// 교과군 선택시
		if(id == "curriculumCd"){
			var curriculumCd =  $("#curriculumCd li.active").data("val");
			console.log("curriculumCd: " + curriculumCd);
			
			
			if(schoolType == 'HI'){
				infoText = "과목을 선택하세요.";
				selectLowerCurriculum(schoolType, curriculumCd);
			} else {
				infoText = "";
			}
			// 안내 텍스트 설정
			var curriculumCdName =  $("#curriculumCd li.active a").text();
			$targetText.text(schoolTypeNm + curriculumCdName);
			$targetInfo.text(infoText);
		}
		
		// 과목 선택시
		if(id == "subjectCd"){
			// 안내 텍스트 설정
			var curriculumCdName =  $("#curriculumCd li.active a").text();
			var subjectCdName =  $("#subjectCd li.active a").text();
			$targetText.text(schoolTypeNm + curriculumCdName + ">" + subjectCdName);
			infoText = "";
			$targetInfo.text(infoText);
		}
	}
});

// 차시 선택 하위 정보 초기화
function initChasiSelect(id){
	// 하위정보 초기화를 위해 break 안함.
	switch(id) {
		case "gradeCd":
		case "termCd":
			$("#subjectCd").html("");
		case "subjectCd":
			$("#publisherCd").html("");
		case "publisherCd":
			$("#unit01Seq").html("");
			$("#unit02Seq").html("").hide();
			$("#unit03Seq").html("").hide();
			$("#unit04Seq").html("").hide();
			break;
			
		case "unit01Seq":
			$("#unit02Seq li").hide();
		case "unit02Seq":
			$("#unit03Seq li").hide();
		case "unit03Seq":
			$("#unit04Seq li").hide();
			break;
		default:
			break;
	}
}

// 과목 리스트 - 기존코드 parameter underscore
function fnGetSubjectList(gradeCd, termCd) {
	// 학년정보 필수
	if(gradeCd != ""){
		// ajax param data 
		var data = {
			'gradeCd' : gradeCd,
			'termCd' : termCd
		};

		$.ajax({
			url : '/user/content/selectSubjectList.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				var subjectList = result.subjectList;
				var sHTML = '';
				for(var i=0; i<subjectList.length; i++){
					if(typeof subjectList[i].subjectCd != "undefined"){
						sHTML += '<li data-val="' + subjectList[i].subjectCd + '" data-lesson-plan-seq="' + subjectList[i].lessonPlanSeq + '">';
						sHTML += '	<a href="#none">' + subjectList[i].subjectCd + '</a>';
						sHTML += '</li>';
					}
				}
				$("#subjectCd").html(sHTML);
			}
		});
	}
}

// 출판사 리스트
function fnGetPublisherList(highPlanSeq) {
	// 학년,학기,과목 highPlanSeq 정보 필수
	if(highPlanSeq != ""){
		// ajax param data 
		var data = {
			'gradeCd' : $("#gradeCd li.active").data("val"),
			'termCd' : $("#termCd li.active").data("val"),
			'subjectCd' : $("#subjectCd li.active").data("val"),
			'highPlanSeq' : highPlanSeq
		};

		$.ajax({
			url : '/user/content/selectPublisherList.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				// console.log(result);
				var publisherList = result.publisherList;
				var sHTML = '';
				for(var i=0; i<publisherList.length; i++){
					var publisherCd;
					if(typeof publisherList[i].publisherCd != "undefined"){
						publisherCd = publisherList[i].publisherCd;
					} else { // 국정으로 추가
						publisherCd = '국정';
					}
					var yearCd = "";
					if(typeof publisherList[i].yearCd != "undefined"){
						yearCd = publisherList[i].yearCd;
					}
					sHTML += '<li data-val="' + publisherCd + '" data-lesson-plan-seq="' + publisherList[i].lessonPlanSeq 
							+ '" data-high-plan-seq="' + publisherList[i].highPlanSeq + '" data-year-cd="' + yearCd + '">';
					sHTML += '	<a href="#none">' + publisherCd + '</a>';
					sHTML += '</li>';
					 
				}
				$("#publisherCd").html(sHTML);
			}
		});
	}
}

// 대단원, 차시 리스트
function fnGetChasiList(lessonPlanSeq) {
	// 출판사 lessonPlanSeq 정보 필수
	if(lessonPlanSeq != ""){
		// ajax param data 
		var data = {
			'lessonPlanSeq' : lessonPlanSeq
		};
		
		$.ajax({
			url : '/user/content/selectChasiList.json',
			type : 'POST',
			dataType : 'json',
			data : data,
			success : function(result) {
				var chasiList = result.chasiList;
				console.log(chasiList);
				
				// unit01: 대단원
				var sHTML = '';
				for(var i=0; i<chasiList.length; i++){
					if(typeof chasiList[i].chasiPlanSeq != "undefined" && chasiList[i].chasiCd == "UNIT01"){
						sHTML += '<li data-val="' + chasiList[i].chasiPlanSeq 
								+ '" data-chasi-cd="' + chasiList[i].chasiCd
								+ '" data-chasi-desc="' + chasiList[i].chasiDesc
								+ '">';
						sHTML += '	<a href="#none">' + chasiList[i].chasiName + '</a>';
						sHTML += '</li>';
					}
				}
				$("#unit01Seq").append(sHTML);
				
				// unit02: 중단원
				var sHTML = '';
				for(var i=0; i<chasiList.length; i++){
					var unit01Seq = "";
					if(typeof chasiList[i].unit01Seq != "undefined"){
						unit01Seq = chasiList[i].unit01Seq;
					}
					if(typeof chasiList[i].chasiPlanSeq != "undefined" && chasiList[i].chasiCd == "UNIT02"){
						sHTML += '<li data-val="' + chasiList[i].chasiPlanSeq 
								+ '" data-chasi-cd="' + chasiList[i].chasiCd 
								+ '" data-unit-01-seq="' + unit01Seq
								+ '" data-chasi-desc="' + chasiList[i].chasiDesc
								+ '">';
						sHTML += '	<a href="#none">' + chasiList[i].chasiName + '</a>';
						sHTML += '</li>';
					}
				}
				$("#unit02Seq").append(sHTML);
				
				// unit03: 소단원
				var sHTML = '';
				for(var i=0; i<chasiList.length; i++){
					var unit02Seq = "";
					if(typeof chasiList[i].unit02Seq != "undefined"){
						unit02Seq = chasiList[i].unit02Seq;
					}
					if(typeof chasiList[i].chasiPlanSeq != "undefined" && chasiList[i].chasiCd == "UNIT03"){
						sHTML += '<li data-val="' + chasiList[i].chasiPlanSeq 
								+ '" data-chasi-cd="' + chasiList[i].chasiCd 
								+ '" data-unit-02-seq="' + unit02Seq
								+ '" data-chasi-desc="' + chasiList[i].chasiDesc
								+ '">';
						sHTML += '	<a href="#none">' + chasiList[i].chasiName + '</a>';
						sHTML += '</li>';
					}
				}
				$("#unit03Seq").append(sHTML);
				
				// unit04: 차시: chasiPlanSeq
				var sHTML = '';
				for(var i=0; i<chasiList.length; i++){
					var unit01Seq = "";
					if(typeof chasiList[i].unit01Seq != "undefined"){
						unit01Seq = chasiList[i].unit01Seq;
					}
					var unit02Seq = "";
					if(typeof chasiList[i].unit02Seq != "undefined"){
						unit02Seq = chasiList[i].unit02Seq;
					}
					var unit03Seq = "";
					if(typeof chasiList[i].unit03Seq != "undefined"){
						unit03Seq = chasiList[i].unit03Seq;
					}
					if(typeof chasiList[i].chasiPlanSeq != "undefined" && chasiList[i].chasiCd == "UNIT04"){
						sHTML += '<li data-val="' + chasiList[i].chasiPlanSeq 
								+ '" data-chasi-cd="' + chasiList[i].chasiCd 
								+ '" data-unit-01-seq="' + unit01Seq 
								+ '" data-unit-02-seq="' + unit02Seq 
								+ '" data-unit-03-seq="' + unit03Seq
								+ '" data-chasi-desc="' + chasiList[i].chasiDesc
								+ '">';
						sHTML += '	<a href="#none">' + chasiList[i].chasiName + '</a>';
						sHTML += '</li>';
					}
				}
				$("#unit04Seq").append(sHTML);
			}
		});
	}
}

//교과군 하위 과목 조회 
function selectLowerCurriculum(schoolType, curriculumCd){
	var data = {
		'schoolType' : schoolType
		,'curriculumCd' : curriculumCd
	};
//		console.log(data);
	$.ajax({
		url : '/user/content/selectLowerCurriculumList.json',
		type : 'POST',
		dataType : 'json',
		data : data,
		success : function(result) {
			console.log(result);
			if(result.curriculumList.length > 0){
				var subjectList = result.curriculumList;
				var sHTML = '';
				for(var i=0; i<subjectList.length; i++){
					if(typeof subjectList[i].curriculumCd != "undefined"){
						sHTML += '<li data-val="' + subjectList[i].curriculumCd + '">';
						sHTML += '	<a href="#none">' + subjectList[i].curriculumName + '</a>';
						sHTML += '</li>';
					}
				}
				$(".qfilter #subjectCd").html(sHTML);
				$(".qfilter #subjectCd").show();
			} else {
				// 과목 필터 숨김
				$(".qfilter #subjectCd").hide();
				$(".qfilter #subjectCd").html("");
				var $targetInfo = $(".btn-qfilter em");
				$targetInfo.text("");
			}
		}
	});
}