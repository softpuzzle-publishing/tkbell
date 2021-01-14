/**
*	Detect browser by Peter-Paul Koch. browser-detect.js
*	Author Uri : http://www.quirksmode.org/js/detect.html
*/
var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)return data[i].identity}else if(dataProp)return data[i].identity}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone_iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init();


/**
 * @see http://github.com/NV/placeholder.js
 */
jQuery.fn.Placeholder=function(){return this.each(function(){var a=this;if(a.placeholder&&'placeholder'in document.createElement(a.tagName))return;var b=a.getAttribute('placeholder');var c=$(a);if(a.value===''||a.value==b){c.addClass('text-placeholder');a.value=b}c.focus(function(){if(c.hasClass('text-placeholder')){this.value='';c.removeClass('text-placeholder')}});c.blur(function(){if(this.value===''){c.addClass('text-placeholder');this.value=b}else{c.removeClass('text-placeholder')}});a.form&&$(a.form).submit(function(){if(c.hasClass('text-placeholder')){a.value=''}})})};

$(function(){

	/* 브라우저 체크 */
	var _html = $('html'),
		_browser = BrowserDetect.browser,
		_version = BrowserDetect.version;
	if(_browser === "Mozilla" && _version == 11){
		_html.addClass('Mozilla_11');
	}else if(_browser === "Safari"){
		_html.addClass('Safari');
	}else if(_browser === "Chrome"){
		_html.addClass('Chrome');
	}else if(_browser === "Firefox"){
		_html.addClass('Firefox');
	}else if(_browser === "Explorer" && _version === 9){
		_html.addClass('ie9');
	}else if(_browser === "Explorer" && _version == 10){
		_html.addClass('ie10');
	}else if(_browser === "Explorer" && _version == 11){
		_html.addClass('ie11');
	}

	// Toggle
	/* 	$.fn.menuToggle = function(option){
		option = $.extend({}, option);
		return this.each(function(){
			var elem = $(this),
				tag = $(option.tag, '.toggle_list');
			elem.on('click', function(e){
				e.preventDefault();
				$(this).toggleClass('selected');
				tag.toggleClass('selected');
			});
		});
	};
	$('.toggle_list .tit').menuToggle({tag:'.toggle_list .list-box'}); */
	
	$('.toggle_list .tit').on('click', function(e){
		e.preventDefault();
		var tempTabName = $(this).find('strong').text();
		if(tempTabName.indexOf('태국어') == -1 && tempTabName.indexOf('캄보디아') == -1 && tempTabName.indexOf('필리핀') == -1){ //이중언어 캄보디아어,필리핀어,태국어 일때 unit01 토글기능 해제
			$(this).closest('.toggle_list').toggleClass('selected');
			$(this).toggleClass('selected').parent().find('.list-box').toggleClass('selected');
		}
//		$(this).toggleClass('selected').parent().find('.list-box').toggleClass('selected'); 
	});
	
	// 전체메뉴
	$('.full-menu').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('selected');
		$('.full-menu-cont').toggleClass('selected');
		$('.user-login').toggleClass('none');
		$('.user-info').toggleClass('none');
	});
	
	
	// 퀵메뉴
	$('.btn_quick').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('selected');
		$('.qikmu').toggleClass('selected');
	});
	
	// 파일첨부
	$(".btn_file").click(function(e){
		e.preventDefault();
		$(this).parent().find("input[type=file]").click();
	});
	// 5개 파일 첨부
	$(".btn_file_modified").click(function(e){
		flg = false;
		e.preventDefault();
		p = 1;
		//글 수정시 기존 파일이 있을경우 기존 파일 개수를 제외한 파일 개수만 업로드 가능 
		if($('#fileListSize').val() !=  null){
			p = parseInt($('#fileListSize').val()) + 1;
		}
		for(var i = p; i <= 5; i++) {
			if(flg == false){
				if($('#file' + i).val() == null || $('#file' + i).val() == '') {
					$('#file' + i).click();
					flg = true;
				}
			}
		}
		if(flg == false) {			
			/* 20160130 알럿 -> 레이어팝업으로 변경 전체 공통으로 사용 */
			var alertLayer = "";
			alertLayer += "<div class='popup-cont pop-alt' id='msgLayer1' style='position: absolute;    top: 50%;    left: 50%;    margin-left: -150px;    margin-top: -64px;    padding: 30px 20px 60px;    min-width: 250px;    zoom: 1;    border: 1px solid #666;    background-color: #fff;    z-index: 10;    text-align: center;'>";
			alertLayer += "<p class='txt' id='msg1' style='text-align: center;    padding-bottom: 18px;    zoom: 1;    line-height: 18px;    zoom: 1;    min-width: 250px;'>";
			alertLayer += "<strong style='font-weight: 500;    text-align: center;    line-height: 18px;    zoom: 1;'>최대 첨부 가능한 파일 수는 5개입니다.</strong>";
			alertLayer += "</p>";
			alertLayer += "<div class='btn-pop-bottom' style='position: absolute;    bottom: 25px;    left: 0;    width: 100%;'>";
			alertLayer += "<a href=javascript:layer_close(); class='cbtn_rtyp1' style='display: inline-block;    padding: 7px 10px 6px;    color: #fff;    font-size: 12px;    min-width: 45px;    zoom: 1;    background-color: #e74337;    border: 1px solid #d5382c;    position: relative;'><span>확인</span></a>";
			alertLayer += "</div>";
			alertLayer += "</div>";			
			
			$("body").append(alertLayer);			
		}	
	});
	
	$("input[type=file]").change(function(e){
		e.preventDefault();
		var file = $(this).val();
		
		//에디터내 파일첨부시 상위 텍스트 파일명 입력되는 부분 분기
		if($(this).attr("id") != "fileloadImg"){
			$(this).parent().find("input[type=text]").val(file);
		}
	});
		
	/* Placeholder */
	$(".placeholder").Placeholder();
	
	$('.globalTab').each(function(){
		/*if(!!$(this).closest('.chat-data-tab').get(0)) return;
		  var _this = $('> li',this);
		  var tabsize = _this.size();
		 _this.css('width', (100 / tabsize - 0.000000000001) + '%');
		  
		  if(_browser === "Explorer" && _version === 7){
			_this.css('width', (100 / tabsize - 0.1) + '%');
			};*/
		  var _this = $('> li',this);
		  _this.each(function(){
		   var len = $(this).find('a br').length;
		   if(len == 1) {
			$(this).find('a').addClass('br1');
		   }else if(len == 2){
			$(this).find('a').addClass('br2');
		   }
		  });
	});
	
	/*$('.globalTab2').each(function(){
		return;
		  var _this = $('> li',this);
		  var tabsize = _this.size();
		  _this.css('width', (100 / tabsize - 0.000000000001) + '%');
	});

	$('.globalTab3').each(function(){
		return;
		  var _this = $('> li',this);
		  var tabsize = _this.size();
		  _this.css('width', (100 / tabsize - 0.000000000001) + '%');
	});*/
	
	// 고객센터 faq 영역
	$('.globalTab.faq').each(function(){
		 var _this = $('> li',this);
		 var tabsize = _this.size();
		 var globalWidth = parseInt($(".globalTab.faq").css("width"));
		 var restWidth = globalWidth - 60;
		 var eachWidth = restWidth / (tabsize - 1);
		 
		 // width 값 설정  (기타 탭을 제외하고 균등분할 )
		 _this.css('width', ( eachWidth - 0.000000000001) + 'px');
		 if(_browser === "Explorer" && _version === 7){
			 _this.css('width', ( eachWidth - 0.1) + 'px');
		 }
		// 기타 탭만 고정 60px 적용
		 var eachTab = $('.globalTab.faq > li');
		 $(eachTab[tabsize-1]).css('width','60px');
		 
		 _this.each(function(){
			 var len = $(this).find('a br').length;
			 if(len == 1) {
				$(this).find('a').addClass('br1');
			 }else if(len == 2){
				 	$(this).find('a').addClass('br2');
			 }
		 });
	});
	
	//tab
	$('div.tabs').each(function(){
		var $this = $(this),
			tabContainers = $('.tab', $this);
			tabContainers.hide().filter(':first').show();
			
		$('ul.tabNavi a', $this).click(function(){
			tabContainers.hide();
			tabContainers.filter(this.hash).show();
			$('ul.tabNavi a', $this).removeClass('selected');
			$(this).addClass('selected');
			return false;
		}).filter(':first').click();
	});
	
	//동적 selectbox를 위해 함수화 처리 
	function selectBox(){
		$('.select_box > ul > li > input[type=radio]').click(function(){
			var this_label = $(this).next('label');	
			$(this).parent().parent().parent().find('.current > em').text(this_label.text());
			$(this).parents('.select_box').removeClass('on');
			this_label.focus();
		});	

		//select-box checked 처리
		$('.select_box > ul > li > input[type=radio]').each(function(){
			if ($(this).attr("checked") || $(this).attr("checked")== true){
				var this_label = $(this).next('label');	
				$(this).parent().parent().parent().find('.current > em').text(this_label.text());
				$(this).parents('.select_box').removeClass('on');
			}			
		});		
	}
	
	/* 디자인 셀렉트 박스 값 세팅 */
		$('.select_box').find('.current').click(function(e){
			e.preventDefault();
			if(!$(this).parent().hasClass('disabled')){
				if($(this).parents('.select_box').hasClass('on')){			
					$(this).parents('.select_box').css('z-index', 10);
				}else{
					$(this).parents('.select_box').css('z-index', 1000);
				}
				$(this).parents('.select_box').toggleClass('on');
			}
		});
		
		$('.select_box').mouseleave(function(){
			$(this).removeClass('on');
			$(this).css('z-index', 1);
		});
		
		selectBox();
});

//교과목 선택
$(function() {
	$('input.chkbx').click(function(){
		$('input.chkbx:checked').each(function(){
			$(this).siblings('label').addClass('on');
		});
	});
});

//layer 팝업 닫기
function layer_close(){
	$("#msgLayer1, #msgLayer2").hide();
}

// modal window
function modal(Id){
	 var $height = $(document).height(),
	  $height_w = $(window).height(),
	  $left = ($(window).scrollLeft() + ($(window).width() - $('.pop'+Id).width()) / 2),
	  $top  = ($(window).scrollTop() + ($(window).height() - $('.pop'+Id).height()) / 2);
	  
	 $('#mask').css({'height': $height}).fadeTo("fast", 0.7);
	 $('.pop'+Id).css({'left':$left, 'top':$top});
	 $('html').addClass('scroll_no');
	 var modal = $('.pop'+Id);
	 $(modal).show();
	 return false;
	}
//modal window_02
function modalSub(Id){
	 var $height = $(document).height(),
	  $height_w = $(window).height(),
	  $left = ($(window).scrollLeft() + ($(window).width() - $('.pop'+Id).width()) / 2),
	  $top  = ($(window).scrollTop() + ($(window).height() - $('.pop'+Id).height()) / 2);
	  
	 $('#mask').css({'height': $height}).fadeTo("fast", 0.7);
	 $('.pop'+Id).css({'left':$left});
	 $('html').addClass('scroll_no');
	
	 var modal = $('.pop'+Id);
	 $(modal).show();
	 return false;
}

$(document).ready(function(){
	 $('.n_window a.close').on('click', function(e){
	  e.preventDefault();
	  $('#mask, .n_window').hide();
	  $('html').removeClass('scroll_no');
	 });
	 
	 //차시선택 팝업
	 $('#cho_btn').click(function(){
		$('.pre_choice').toggleClass('disnone');
		return false;
	});
	 
	 //롤링배너
	$("#bannerZone ul").show();
		$("#bannerZone .bannerContents li").hide();
		$("#bannerZone .bannerContents li:first").show();
			
			
			//해당 번호 클릭시
			$(".bannerCon .bannerCut li a").click(function(){
					clearTimeout(banner_rolling);
					clickNum = $(this).text()-1;
					rolling_ea = clickNum;
					banner_view(clickNum);
					return false;
			});
				
			//배너롤링
			rolling_ea = 0;
						//setInterval(function(){},1000);
			banner_rolling = setInterval(function(){
						banner_view(++rolling_ea%3);
						},2000); 
			
			
			$stop = $(".bannerCon .bannerBtn li a").eq(0);
			$play = $(".bannerCon .bannerBtn li a").eq(1);
			$play.parent(".bannerCon .bannerBtn li").addClass('dinone');
			//정지 버튼 클릭시
			$stop.click(function(){
				clearTimeout(banner_rolling);
				$(this).parent(".bannerCon .bannerBtn li").addClass('dinone');
				$play.parent(".bannerCon .bannerBtn li").removeClass('dinone');
				return false;
			});
			
			
			//재생 버튼 클릭시
			$play.click(function(){
				clearTimeout(banner_rolling);
				$stop.parent(".bannerCon .bannerBtn li").removeClass('dinone');
				$play.parent(".bannerCon .bannerBtn li").addClass('dinone');
				banner_rolling = setInterval(function(){
									banner_view(++rolling_ea%3);
									},2000); 
				return false;
			});

	});	

		function banner_view(num){
			$("#bannerZone .bannerContents li").eq(num)
				.show()
				.siblings().hide();

			$(".bannerCon .bannerCut li").eq(num)
				.addClass("ing")
				.siblings().removeClass("ing");
		}



// 박물관 체험활동
function toggleMuseumAlert(museum,mapcheck)
{
	if(mapcheck == "map")
	{
		for(var i=1; i<=5; i++)
		{
			museum_f = "newPopupS"+i
			map_f = "map_"+i			
			document.getElementById(museum_f).style.display	= "none"
			document.getElementById(map_f).className = "";
		}
		document.getElementById('newPopupS'+museum).style.display	= "block"
		document.getElementById('map_'+museum).className = "active";

		switch(museum)
		{
			case "1" :
				m_code = "MK";
			break;
			case "2" :
				m_code = "GJ";
			break;
			case "3" :
				m_code = "BY";
			break;
			case "4" :
				m_code = "GYJ";
			break;
			case "5" :
				m_code = "GH";
			break;
			default :
				m_code = "ERROR";
		}

		download(m_code+'_MAIN','_blank');
	}
	else
	{
		for(var i=1; i<=5; i++)
		{
			map_f = "map_"+i
			document.getElementById(map_f).className = "";
		}
		if (document.getElementById('newPopupS'+museum).style.display== "none")
		{
			document.getElementById('newPopupS'+museum).style.display = "block"
			document.getElementById('map_'+museum).className = "active";
			
			switch(museum)
			{
				case "1" :
					m_code = "MK";
				break;
				case "2" :
					m_code = "GJ";
				break;
				case "3" :
					m_code = "BY";
				break;
				case "4" :
					m_code = "GYJ";
				break;
				case "5" :
					m_code = "GH";
				break;
				default :
					m_code = "ERROR";
			}
			download(m_code+'_MAIN','_blank');
		}
		else
		{
			document.getElementById('newPopupS'+museum).style.display= "none";
		}
	}
}

//2014-07-07 LKM
// POPUP height=100% 스크롤 높이
function funLoad(){
        var Cheight = $(window).height();
        $('.chat-data1').css({'height':Cheight-200+'px'});
		$('.chat-data2').css({'height':Cheight-246+'px'});
    }
    window.onload = funLoad;
    window.onresize = funLoad;

//게시판 내 글 생성 또는 수정시 임시 등록했던 파일 제거    
function fnTempFileDel(id ,fileName) {
	$('#' + id).val('');
	$('#' + id + '_temp').remove()
}    