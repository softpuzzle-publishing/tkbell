$(function(){
	/*
	$(".sort_type .sort_order").click(function(){
		var sort = $(this).parents(".sort");
		var sort_select = $(this).parents(".sort_type").siblings(".sort_select");
		if (sort.hasClass('current'))
		{
			sort.removeClass('current');
			sort_select.hide();
		} else {
			sort.addClass('current');
			sort_select.show();
		}
	});
	*/
	
	
	/* 디자인 셀렉트 박스 값 세팅 */
	$('.sort_type').find('.sort_order').click(function(e){
		e.preventDefault();
		var sort = $(this).parents(".sort");
		var sort_select = $(this).parents(".sort_type").siblings(".sort_select");
		if (sort.hasClass('current'))
		{
			sort.removeClass('current');
			sort_select.hide();
		} else {
			sort.addClass('current');
			sort_select.show();
		}
	});
	
	$('.sort').mouseleave(function(){
		$(this).removeClass('current');
	});
	
	//selectBox();
});