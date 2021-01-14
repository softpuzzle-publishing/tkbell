$(document).ready(function(){
	/*달력*/
	$('.input_date').datepicker();
		$('.btn_calendar').click(function(e){
			e.preventDefault();
			$(this).prev('.input_date').focus();
		});
		
	
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',		
		showOn: 'button',
		buttonImageOnly: true,
		dateFormat: 'yy-mm-dd',
		changeMonth: true,
		changeYear: true,
		showMonthAfterYear: true ,
		yearRange: 'c-100:c+10' // 년도 선택 셀렉트박스를 현재 년도에서 이전, 이후로 얼마의 범위를 표시할것인가.
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
	
});	
	
	