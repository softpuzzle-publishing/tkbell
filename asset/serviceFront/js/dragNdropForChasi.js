function initDrag(){	
	if($('.draggable, .droppable').length < 1) return;
	$('.draggable:not(.droppable) li').draggable({
		cancel : '.folder, .scrap',
		connectToSortable: ".droppable",
		containment : 'document',
		helper : 'clone',
		start : startDrag,
		drag : draging,
		stop : stopDrag
	}).disableSelection();
	$( ".droppable" ).sortable({
		connectWith : '.droppable',
		axis : "y",
		forcePlaceholderSize: true,
		stop : function(event, ui){
			$(this).removeAttr('style');
		},
		update : function(event,ui){
			
			// KKS 차시창 기능 고도화 개발(#20989) 관련 
			var link = document.location.href;
			if( link.indexOf('popup/ChasiView') > -1 || link.indexOf('popup/ChasiView2019') > -1) {
				
				fnShowBtn(); // 이미 담겨 있던, SUB01을 수정하던 저장 버튼을 노출한다.
				
				var item = $(ui.item);
				
				// 콘텐츠 타입
				var content_type_cd = item.find('input[id=content_type_cd]').val();
				// 썸네일
				var img_path = "";
				var thumb_path = "";
			    if (item.find('input[id=service_path]').val().indexOf('youtube') > -1) {
			        thumb_path = item.find('input[id=thumb_path]').val();
			    } else if (content_type_cd == 'PJQ'){
			    	 thumb_path = "http://www.i-scream.co.kr" + item.find('input[id=thumb_path]').val();
			    }else{
			        thumb_path = img_path + item.find('input[id=thumb_path]').val();
			    }
				
				if( item.hasClass('ui-sortable-handle') && !item.hasClass('ui-draggable') ) return;
				
				// 수업 보탬자료 -> | 아이스크림 자료 | 교수학습자료검색 | 자료보관함 | -> 선택 확인
				if( $('.globalTab > li .selected').text().trim() == "아이스크림 자료" ){
					if( item.find('label:eq(0)').text() == "거꾸로 수업활동 선택" ){
						item.find('label:eq(0)').remove(); // 아이스크림 자료의 학생에게 보내기 체크박스 삭제
					}
				}else if( $('.globalTab > li .selected').text().trim() == "교수학습자료검색" || $('.globalTab > li .selected').text().trim() == "자료보관함" || $('.globalTab > li .selected').text().trim().indexOf("동기유발") != -1 || $('.globalTab > li .selected').text().trim().replace(/ /g,'').indexOf("나의찜") != -1  ){
					
					// i-Scream Media 조회 탭
					// if( $('#sel_value_22_1').attr('checked') == "checked" ){
						item.find('div').addClass('list-box'); // Class Add
						
						var contTex = '<div class="cont-tex">';
							contTex += '<a class="tex"><strong>';
							contTex += item.find('input[id=item_subject]').val() ;
							contTex += '</strong></a>';
							
							contTex += '<p>';
							if (item.find('input[id=page_num_info1]').val() != "" && item.find('input[id=page_num_info1]').val() != null && item.find('input[id=page_num_info1]').val() != "undefined") {
								contTex += '<span class="s">' + item.find('input[id=page_num_info1]').val() + "</span><br/>" + getCutString(item.find('input[id=item_desc]').val(), 60);
						    } else {
						    	contTex += getCutString(item.find('input[id=item_desc]').val(), 60);
						    }
							contTex += '</p>';
						contTex += '</div>';
						item.find('div').addClass('list-box').append($(contTex));
						
					// }
					
				}
				
				
				item.removeAttr('style').removeAttr('class').addClass('ui-sortable-handle');
				item.find('label a').remove();
				
				if(item.find("button.share").length != 0){
					item.find("button.share").remove();
				}
				if(item.find("button.like").length != 0){
					item.find("button.like").remove();
				}
				if(item.find("span.state").length != 0){
					item.find("span.state").remove();
				}
				
				
			    
				item.find('label').append("<a href=\"#none\" style=\"background:#eee url(" + thumb_path + ") no-repeat 50% 50%; cursor:move\">" +
				        "<img alt=\"thumbNail\" src=\"" + thumb_path + "\" onerror=\"javascript:errorThumb(this,'" + content_type_cd + "');\" style=\"display:none;\" />" + "</a>");
	
				// item.find('.cont-tex').remove();
				if (item.find('input[id=content_gubun]').val() != '교과활동') { // 자료검색이나 i-Box 자료일경우 배경 회색으로 표시(.nt)
					// item.css('background', '#F7F7F7');
				}
				/* KKS 삭제
				var contTex = '<div class="cont-tex">';
					contTex += '<div class="tex">';
					contTex += '<input type="text" id="item_subject" value="';
					contTex += item.find('input[id=item_subject]').val() ;
					contTex += '" style="width:250px">';
					contTex += '<p>';
					if (item.find('input[id=page_num_info1]').val() != "" && item.find('input[id=page_num_info1]').val() != null && item.find('input[id=page_num_info1]').val() != "undefined") {
						contTex += '<span class="s">' + item.find('input[id=page_num_info1]').val() + "</span><br/>" + getCutString(item.find('input[id=item_desc]').val(), 60);
				    } else {
				    	contTex += getCutString(item.find('input[id=item_desc]').val(), 60);
				    }
					contTex += '</p>';
					contTex += '</div></div>';
				item.find('div').addClass('list-box').append($(contTex));
				*/
				if (item.find('input[id=content_no]').val() != '' && item.find('input[id=content_no]').val() != null) { // content_no가 존재하는 자료일 경우 content_no로 비교
					$('.chat-data1 .chat-data-box .chat-data-box-cont ul li').each(function () {
		                if (item.get(0) != $(this).get(0) && item.find('input[id=content_no]').val() == $(this).find('#content_no').val()) {
		                    alert('이미 담겨진 자료입니다.');
		                    item.remove();
		                    return false;
		                }
		            });
				} else { // content_no가 없는자료(ex:유튜브)일 경우 서비스경로(service_path)으로 비교
					$('.chat-data1 .chat-data-box .chat-data-box-cont ul li').each(function () {                            	                            	
		                if (item.get(0) != $(this).get(0) && item.find('input[id=service_path]').val() == $(this).find('#service_path').val()) {
		                    alert('이미 담겨진 자료입니다.');
		                    item.remove();
		                    return false;
		                }
		            });
				}
				item.find('label input[type=hidden]').each(function(){
					$(this).attr('name',$(this).attr('id'));
				})
				var itemArr = ['content_no','content_type_cd','item_desc','item_memo','step_name','page_num_info1','service_path','thumb_path','content_gubun','media_time','img_count','thumbPath','item_gubun','item_type']
				for(var i = 0; i < itemArr.length; i++){
					if( item.find('label input[id='+itemArr[i]+']').length != 0) {
						item.find('label input[id='+itemArr[i]+']').attr('name',itemArr[i]);
					} else if( item.find('label input[name='+itemArr[i]+']').length == 0 || item.find('label input[name='+itemArr[i]+']').val() == null) {
						$(item.find('.list-box > label')).append($('<input type="hidden" name="'+itemArr[i]+'" />'));
					}
					if(itemArr[i] == 'item_gubun') $(item.find('label input[name=item_gubun]')).val('SUB01');
					if(itemArr[i] == 'content_type_cd' && $(item.find('label input[name=content_type_cd]')).val() == '묶음이미지'){
						$(item.find('label > a')).addClass('imgpack').attr('data-cnt', $(item.find('label input[name=img_count]')).val());	
					}
				}
				item.find('label').attr('UID', jQuery.now()); //중복없는 UID 값을 셋팅한다.
				
				var listRi = "";
				if($('.globalTab > li .selected').text().trim() == "아이스크림 자료"){
					listRi = item.find('.list-box .list_ri')[0].outerHTML; // 삭제버튼 저장. 
					item.find('.list-box .list_ri').remove(); //삭제버튼 삭제.
				}
				
				item.find('.list-box').append( $('<div class="list_ri" style=" margin: -2px -7px 4px 0px; "><a href="#" class="btn-delete" onclick="fnDeleteItem(this);"><span class="blind">삭제</span></a></div>') );
				
				// | 삭제 | 스크랩 | 추천 | 버튼 생성 
				if( $('.globalTab > li .selected').text().trim() == "아이스크림 자료" ){
					item.find('.list-box').append( listRi ); // 삭제버튼 추가.
				}else if( $('.globalTab > li .selected').text().trim() == "교수학습자료검색" ){
				/*	
					var contTex = '<div class="list_ri">';
						contTex += '		<div class="btn_list">';
						contTex += '			<a href="#none" class="scrap" id="'+item.find('input[id=content_no]').val()+'" onclick="saveItem(\''+item.find('input[id=content_no]').val()+'\',\''+$('#session_m_id').val()+'\',\'chasi\')">스크랩</a>';
						contTex += '			<a href="#none" class="recommend" onclick="recommendContent('+item.find('input[id=content_no]').val()+')"><span></span>추천</a>';
						contTex += '		</div>';
						contTex += '</div>';
						item.find('.list-box').append($(contTex));
				*/
					
					
				}
				
				
				
				
				
				
			} //END IF
			// 기존 차시편집 원본
			else{
				var item = $(ui.item);
				
				if(item.hasClass('ui-sortable-handle') && !item.hasClass('ui-draggable')) return;
				
				item.removeAttr('style').removeAttr('class').addClass('ui-sortable-handle');
				
				item.find('label a').remove();
				
				var img_path = "", thumb_path = "";
				
			    if (item.find('input[id=service_path]').val().indexOf('youtube') > -1) {
			        thumb_path = item.find('input[id=thumb_path]').val();
			    } else if (content_type_cd == 'PJQ'){
			    	 thumb_path = "http://www.i-scream.co.kr" + item.find('input[id=thumb_path]').val();
			    } else {
			        thumb_path = img_path + item.find('input[id=thumb_path]').val();
			    }
			    
			    var content_type_cd = item.find('input[id=content_type_cd]').val();
				item.find('label').append("<a href=\"#none\" style=\"background:#eee url(" + thumb_path + ") no-repeat 50% 50%; cursor:move\">" +
				        "<img alt=\"thumbNail\" src=\"" + thumb_path + "\" onerror=\"javascript:errorThumb(this,'" + content_type_cd + "');\" style=\"display:none;\" />" + "</a>");
	
				item.find('.cont-tex').remove();
				if (item.find('input[id=content_gubun]').val() != '교과활동') { // 자료검색이나 i-Box 자료일경우 배경 회색으로 표시(.nt)
					item.css('background', '#F7F7F7');
				}
				
				var contTex = '<div class="cont-tex">';
					contTex += '<div class="tex">';
					contTex += '<input type="text" id="item_subject" value="';
					contTex += item.find('input[id=item_subject]').val() ;
					contTex += '" style="width:250px">';
					contTex += '<p>';
					if (item.find('input[id=page_num_info1]').val() != "" && item.find('input[id=page_num_info1]').val() != null && item.find('input[id=page_num_info1]').val() != "undefined") {
						contTex += '<span class="s">' + item.find('input[id=page_num_info1]').val() + "</span><br/>" + getCutString(item.find('input[id=item_desc]').val(), 60);
				    } else {
				    	contTex += getCutString(item.find('input[id=item_desc]').val(), 60);
				    }
					contTex += '</p>';
					contTex += '</div></div>';
				item.find('div').addClass('list-box').append($(contTex));
					
				if (item.find('input[id=content_no]').val() != '' && item.find('input[id=content_no]').val() != null) { // content_no가 존재하는 자료일 경우 content_no로 비교
					$('.chat-data1 .chat-data-box .chat-data-box-cont ul li').each(function () {
		                if (item.get(0) != $(this).get(0) && item.find('input[id=content_no]').val() == $(this).find('#content_no').val()) {
		                    alert('이미 담겨진 자료입니다.');
		                    item.remove();
		                    return false;
		                }
		            });
				} else { // content_no가 없는자료(ex:유튜브)일 경우 서비스경로(service_path)으로 비교
					$('.chat-data1 .chat-data-box .chat-data-box-cont ul li').each(function () {                            	                            	
		                if (item.get(0) != $(this).get(0) && item.find('input[id=service_path]').val() == $(this).find('#service_path').val()) {
		                    alert('이미 담겨진 자료입니다.');
		                    item.remove();
		                    return false;
		                }
		            });
				}
				item.find('label input[type=hidden]').each(function(){
					$(this).attr('name',$(this).attr('id'));
				})
				var itemArr = ['content_no','content_type_cd','item_desc','item_memo','step_name','page_num_info1','service_path','thumb_path','content_gubun','media_time','img_count','thumbPath','item_gubun','item_type']
				for(var i = 0; i < itemArr.length; i++){
					if( item.find('label input[id='+itemArr[i]+']').length != 0) {
						item.find('label input[id='+itemArr[i]+']').attr('name',itemArr[i]);
					} else if( item.find('label input[name='+itemArr[i]+']').length == 0 || item.find('label input[name='+itemArr[i]+']').val() == null) {
						$(item.find('.list-box > label')).append($('<input type="hidden" name="'+itemArr[i]+'" />'));
					}
					if(itemArr[i] == 'item_gubun') $(item.find('label input[name=item_gubun]')).val('SUB01');
					if(itemArr[i] == 'content_type_cd' && $(item.find('label input[name=content_type_cd]')).val() == '묶음이미지'){
						$(item.find('label > a')).addClass('imgpack').attr('data-cnt', $(item.find('label input[name=img_count]')).val());	
					}
				}
				item.find('label').attr('UID', jQuery.now()); //중복없는 UID 값을 셋팅한다.
				
				item.find('.list-box').append($('<div class="list_ri"><a href="#" class="btn-delete" onclick="fnDeleteItem(this);"><span class="blind">삭제</span></a></div>'));
			} // END ELSE IF
			
			
		}
	});
}
function startDrag(event, ui){
	
	// KKS 차시창 기능 고도화 개발(#20989) 관련
	if($(this).find('a.scrap').text() == "" && $('.globalTab > li .selected').text().trim() == "아이스크림 자료" ){
		/*alert("해당 자료는 스크랩 및 편집이 불가한 자료입니다.");*/
		return false;
	}
	
	// KKS 차시창 기능 고도화 개발(#20989) 관련
	var link = document.location.href;
	if( link.indexOf('popup/ChasiView') > -1 ) {
		
	}else{
		ui.helper.css({opacity:0,width:100,maxHeight:60,overflow:'hidden'});
	}
	
	var cont = $(this).closest('div');
	var helper = $(document.createElement('div'))
		.addClass('dragingObj')
		.appendTo(document.body);
	
	var tempObj = $(document.createElement('div'))
		.addClass('tempObj')
		.css({
			width	:	$(this).width(),
			height	:	$(this).height()
		}).appendTo(helper);
	var tempImg = $(document.createElement('span')).appendTo(tempObj);
	if(ui.helper.find('label > a').get(0).style.background.indexOf('url') > -1){
		tempObj.addClass('type1');
		tempImg.css({backgroundImage : ui.helper.find('label > a').get(0).style.backgroundImage});
	} else if( !!ui.helper.find('.thum_img').get(0) ) {
		tempObj.addClass('type2');
		tempImg.css({backgroundImage : ui.helper.find('.thum_img').get(0).style.backgroundImage});
	} else {
		tempObj.addClass('type3');
		tempImg.css({backgroundImage : ui.helper.find('.thum').get(0).style.backgroundImage});
	}
	var tempDesc = $(document.createElement('div')).appendTo(tempObj);
	var contTex = "<h3>" + ui.helper.find('input[id=item_subject]').val() + "</h3>";
	contTex += "<p>" + "</p>";
	if (ui.helper.find('input[id=page_num_info1]').val() != "" && ui.helper.find('input[id=page_num_info1]').val() != null && ui.helper.find('input[id=page_num_info1]').val() != "undefined") {
		contTex += '<span class="s">' + ui.helper.find('input[id=page_num_info1]').val() + "</span><br/>" + getCutString(ui.helper.find('input[id=item_desc]').val(), 60);
    } else {
    	contTex += getCutString(ui.helper.find('input[id=item_desc]').val(), 60);
    }
	tempDesc.html(contTex);
	
}


function fnShowBtn(){
	$('#modifyChasiComent1').css('display','none');
	$('#modifyChasiComent2').css('display','block');
}


function draging(event, ui){
	var cont = $(this).closest('.chat-data-box-cont');
	$('div.dragingObj div.tempObj').css({
		left	:	ui.helper.offset().left,
		top	:	ui.helper.offset().top
	});
}
function stopDrag(event, ui){
	$('div.dragingObj').remove();
}
function getInputTag(key, value) {
    return "<input type='hidden' id='" + key + "' name='" + key + "' value='" + value + "'  />";
}
function fnDeleteItem(obj){
	/*if (confirm("삭제 하시겠습니까?") == true){
		$(obj).closest('li').remove();
	}*/
	
	confirmC({title:'선택한 학습자료 삭제',msg:'삭제 하시겠습니까?',callBackPositive:{msg:'취소'}
		,	callBackOther:{ msg:'삭제',
			method:function(){
				$(obj).closest('li').remove();
			}
		}
	});
	
}