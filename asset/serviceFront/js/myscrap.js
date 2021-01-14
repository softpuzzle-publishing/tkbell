$(function(){
	$(".pop_curriculum").hide();
	/*$(".curriculum .btn_another").click(function(){
	});
	$(".sel_curriculum").click(function(){
		$(".info .pop_curriculum ul").css({"height" : ''});
		var pop_curriculum = $(this).siblings(".pop_curriculum");
		pop_curriculum.toggle();
		pop_curriculum.css('width','100%');
		pop_curriculum.find(".m1").css('width','6%');

		// 차시선택
		var liMaxHeight = -1;
		var node;
		$(".info .pop_curriculum ul").each(function(index){
			if ($(this).outerHeight() > liMaxHeight) {
				liMaxHeight = $(this).outerHeight();
				node = index;
			}
		});
		$(".info .pop_curriculum ul").css({"height" : liMaxHeight})
	});*/
});
function listArea(){
	$(".pop_curriculum ul").css({"height" : ''});
	var pop_curriculum = $(this).siblings(".pop_curriculum");
	//pop_curriculum.toggle();
	pop_curriculum.css('width','100%');
	pop_curriculum.find(".m1").css('width','6%');

	// 차시선택
	var liMaxHeight = -1;
	var node;
	$(".pop_curriculum ul").each(function(index){
		if ($(this).outerHeight() > liMaxHeight) {
			liMaxHeight = $(this).outerHeight();
			node = index;
		} 
	});
	$(".pop_curriculum ul").css({"height" : liMaxHeight})
}