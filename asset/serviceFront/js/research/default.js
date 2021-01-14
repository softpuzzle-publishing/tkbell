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
		$(this).toggleClass('selected').parent().find('.list-box').toggleClass('selected');
	});
	
	// 전체메뉴
	$('.full-menu').on('click', function(e){
		e.preventDefault();
		$(this).toggleClass('selected');
		$('.full-menu-cont').toggleClass('selected');
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
	$("input[type=file]").change(function(e){
		e.preventDefault();
		var file = $(this).val();
		$(this).parent().find("input[type=text]").val(file);
	});
		
	/* Placeholder */
	$(".placeholder").Placeholder();
	
	$('.globalTab').each(function(){
		  var _this = $('> li',this);
		  var tabsize = _this.size();
		 _this.css('width', (100 / tabsize - 0.000000000001) + '%');
		  
		  if(_browser === "Explorer" && _version === 7){
			_this.css('width', (100 / tabsize - 0.1) + '%');
			};
			
		  _this.each(function(){
		   var len = $(this).find('a br').length;
		   if(len == 1) {
			$(this).find('a').addClass('br1');
		   }else if(len == 2){
			$(this).find('a').addClass('br2');
		   }
		  });
	});
	
	$('.globalTab2').each(function(){
		  var _this = $('> li',this);
		  var tabsize = _this.size();
		  _this.css('width', (100 / tabsize - 0.000000000001) + '%');
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
	
	//tab2 아이스크림 소개
	$('div.indutab').each(function(){
		var $this = $(this),
			tabContainers = $('.tab', $this);
			tabContainers.hide().filter(':first').show();
			
		$('ul.indu_tab a', $this).click(function(){
			tabContainers.hide();
			tabContainers.filter(this.hash).show();
			$('ul.indu_tab a', $this).removeClass('selected');
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

$(document).ready(function(){
	 $('.n_window a.close').on('click', function(e){
	  e.preventDefault();
	  $('#mask, .n_window').hide();
	  $('html').removeClass('scroll_no');
	 });
	 $(".anchorLink").click(function(event){            
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
	$('.indu_tab li a').click(function(){
		$(this).addClass('selected');
		$(this).parent('li').siblings().find('a').removeClass('selected');
		
		return false;
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

//교과목 선택
$(function() {
	$('input.chkbx').click(function(){
		$('input.chkbx:checked').each(function(){
			$(this).siblings('label').addClass('on');
		});
	});
});

//Layer toggle : 테스트용에 가까움
function showID(id)
{
obj=document.getElementById(id);

if(obj.style.display == "none") 
  obj.style.display="inline";
else
  obj.style.display="none";
}

//Tab
function setLayer(tab, layer, obj){
	var tabObj = document.getElementById(tab).getElementsByTagName("A");
	var layerObj = document.getElementById(layer);
	var selectIdx;
	var checkIdx=0;
	
	for(var i=0; i< tabObj.length; i++){

		if(obj == tabObj[i]){
			selectIdx = i;
			tabObj[i].className = "on";
		}else{
			tabObj[i].className = "";
		}
	}
	
	for(var i=0; i< layerObj.childNodes.length; i++){
		if(layerObj.childNodes[i].tagName == "DIV"){
			if(checkIdx==selectIdx){
				layerObj.childNodes[i].style.display = "block";
			}else{
				layerObj.childNodes[i].style.display = "none";
			}
			checkIdx++;
		}
	}
}


