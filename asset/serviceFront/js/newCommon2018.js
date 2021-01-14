
window.onload = function() {
//	console.log($(window).width());
    $('section div.userLog form input#id').on('focus',function(){
        if($(this).closest('aside').width() < 160){
            $(this).closest('aside').find('input:eq(0)').click();
        }
    });
    $('section div.userLog form > a,aside section .userThumb').on('click',function(){
        $(this).closest('aside').find('input:eq(0)').click();
    });
    $('section.newLessonSec').each(function(){
        var ul = $(this).find('ul.init');
        if(navigator.appVersion.indexOf("MSIE 9")!=-1){
            ul.removeClass('init');
        } else {
            ul.get(0).addEventListener('animationend', function () {
                ul.removeClass('init');
            }, false);
        }
        if (ul.find('li').length % 12 > 0){
            var blankLiLen = 12 - ul.find('li').length % 12;
            for(var i = 0; i < blankLiLen; i++){
                var li = $(document.createElement('li'))
                    .addClass('blank')
                    .html('<a href="/user/research/mypage/CurriculumPublish.do"></a>')
                    .appendTo(ul);
            }
        }
        ul.attr('data-current',0).data('max',ul.find('li').length / 12 - 1);
        var str = '';
        $(this).find('nav').on('click','a',function() {
            var data = ul.data();
            if ($(this).hasClass('next')) {
                if (data.current == data.max) {
                    ul.addClass('bounceMax').get(0).addEventListener('animationend',bounceAnimationEnd,false);
                    return;
                }
                data.current++;
            } else {
                if (data.current == 0) {
                    ul.addClass('bounceMin').get(0).addEventListener('animationend',bounceAnimationEnd,false);
                    return;
                }
                data.current--;
            }
            ul.attr('data-current',data.current);
        });
        function bounceAnimationEnd(){
            $(this).removeClass('bounceMax').removeClass('bounceMin');
        }
    });

	/* 메인 중앙 카테고리영역 */
	$('.comContents-tit').each(function(){
		var div = $(this).find('.tabs-nav');
        var ul = div.find('ul');

		var innerUl = 0;
		for(var i=0;i < ul.find('li').length;i++){
			innerUl += ul.find('li').eq(i).outerWidth();
		}
		ul.data('max',ul.find('li').length);
		ul.data('current',ul.find('.active').index());

		div.addClass('first');

		var sortW = $('.comContents-tit .sort').width();
		if(ul.find('.active').hasClass('with-sort')) { 
			$(this).find('.sort').fadeIn('fast'); 
			div.width( $('.comContents-tit').width() - sortW);
		}

		var ml = [];
		for(var i=0;i < ul.find('li').length;i++){
			ml[i]= ul.find('li').eq(i).position().left;
		}
		
		var data = ul.data();

        $(this).find('nav').on('click','a',function() {
			var slideWidth = 0;
			
            if ($(this).hasClass('next')) {
				ul.parent().removeClass('first');
                if (data.current == data.max-1) {
                	data.current = 0;
                    /*ul.addClass('bounceMax').get(0).addEventListener('animationend',bounceAnimationEnd,false);
					return;*/
                } else {		
					data.current++;
                }
				ul.find('.active').removeClass('active');
				fnGetContentsList(ul.find('li').eq(data.current).find('a'));
				ul.find('li').eq(data.current).addClass('active');
				if(data.current == data.max-1){
					ul.parent().addClass('end');
				} 
				
            } else {
				ul.parent().removeClass('end');
                if (data.current == 0) {
                	data.current = data.max-1;
                	
                    /*ul.addClass('bounceMin').get(0).addEventListener('animationend',bounceAnimationEnd,false);
					return;*/
                } else {
					data.current--;
                }
					ul.find('.active').removeClass('active');
					fnGetContentsList(ul.find('li').eq(data.current).find('a'));
					ul.find('li').eq(data.current).addClass('active');
					if(data.current == 1){						
						ul.parent().addClass('first');
					}
			}
            
            if(ul.find('li').eq(data.current).hasClass('with-sort')){
				div.width( $('.comContents-tit').width() - sortW);
            	$('.sort').fadeIn('fast'); 
            } else {
            	div.width('100%');
            	$('.sort').fadeOut('fast');             	
            }
            
			if( ml[data.current] > 180 && innerUl > div.width()) {
				if( ml[data.current] > innerUl - div.width() + 180) { 
					ul.css({marginLeft: -(innerUl - div.width())}); 
				} else { 
					ul.css({marginLeft:-ml[data.current]+180}); 
				}
			}  else if(innerUl <= div.width()){
				ul.css({marginLeft:0}); 				
			}
			ul.attr('data-current',data.current);
			
        });

        function bounceAnimationEnd(){
            $(this).removeClass('bounceMax').removeClass('bounceMin');
        }
		
		ul.find('li a').on('click',function(){
			if(!$(this).parent().hasClass('active')) {				
				ul.find('li').removeClass('active');
				$(this).parent().addClass('active');
				data.current = $(this).parent().index();
			}				
			if(!$(this).parent().hasClass('with-sort')) {
				div.width('100%');
				$(this).parents('.comContents-tit').first().find('.sort').fadeOut('fast');
			} else {
				div.width( $('.comContents-tit').width() - sortW);
				$(this).parents('.comContents-tit').first().find('.sort').fadeIn('fast');
			}
			
			if(data.current == 0){
				div.addClass('first');
			} else if (data.current == data.max-1){
				div.addClass('end');			
			} else {
				div.removeClass('first').removeClass('end');
			}
			
			if( ml[data.current] > 180 && innerUl > div.width()) {
				if( ml[data.current] > innerUl - div.width() + 180) { 
					ul.css({marginLeft: -(innerUl - div.width())}); 
				} else { 
					ul.css({marginLeft:-ml[data.current]+180}); 
				}
			} else if(innerUl <= div.width()){
				ul.css({marginLeft:0}); 				
			}
			ul.attr('data-current',data.current);
		});
	});
      
    if(document.URL.indexOf('/user/research/') != -1 || document.URL.indexOf('/user/main/mainPage') != -1){
    	$('.iBoxChart').draw_iBoxChart();
        $('.reqChart').draw_reqChart();
    }
    
    if($('body > aside > input').get(0).checked){
        $('body > aside > input').closest('aside').addClass('minimal');
    };
    
    $('body > aside > input').on('change',function(){
        if(this.checked){
            $(this).closest('aside').addClass('minimal');
        } else {
            $(this).closest('aside').removeClass('minimal');
        }
    });
    
    initMainFavNav($('section.ADarea > ul'));
    //initMainFavNav($('section.recommendContents article.tip ul'));
    //initMainFavNav($('div.iscreamNews article:nth-last-of-type(1) ul')); 
    
    initMainFavNav($('section.notice article.rolling_nav ul'));
    initMainFavNav($('section.listenMusic div.lm-rolling > ul')); //2016-11-11 박소미 추가
    initMainFavNav($('section.listenMusic .lm-weekly ol')); //2016-11-14 박소미 추가
    initMainFavNav($('section.miniShop .miniShop-rolling ul')); //2017-06-28 박소미 추가
    initMainFavNav($('section.ssamblog .ssamblog-rolling ul')); //2017-07-04 박소미 추가
	initMainFavNav($('.noticeArea > article.noti > ul'));  //2018-01-24 박소미 추가
	initMainFavNav($('.noticeArea > article.news > ul'));  //2018-01-24 박소미 추가

    $('section.recommendContents article.tip ul img').each(function(){
        thumbCheckWH($(this));
        $(this)
            .on('load',function(){
                thumbCheckWH($(this));
            })
            .on('error',function(){
                $(this).parent().addClass('error');
            });
        
    });
    
    $(document).on('scroll',headerFix);
    function headerFix(){
        //var top = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var top = $(window).scrollTop();
    	if(top > 163) {
            $('header').addClass('fix');
            $('aside').addClass('fix');
            $('.floating-bnn').addClass('fix');
        } else if(top < 163) {
            $('header').removeClass('fix');
            $('aside').removeClass('fix');
            $('.floating-bnn').removeClass('fix');
        }
    }
    headerFix();
    $('ul.customScrollX, ol.customScrollX').each(function(){
        if($(this).outerWidth() >= $(this).get(0).scrollWidth) return;
        var liW = $(this).get(0).scrollWidth;
        $(this).addClass('activeScroll').next('.scrollbar').data('liW',liW).css({width:$(this).outerWidth()}).find('> a').css({width:$(this).outerWidth()/liW * 100 + '%'});
        $(this).next('.scrollbar').find('>a').on('mousedown',scrollHeaderDragX);
    });
    $('ul.autoScroll').each(function(){
        var obj = $(this);
        obj.data('span', obj.get(0).scrollHeight / obj.find('li').length);
        obj.data('i',1);
        setInterval(function(){autoScrollAnimate(obj)},5000);
    });

    /*var ifr = $('.smartArea iframe').get(0);
    if(!!ifr) {
        ifr = ifr.contentWindow;
        ifr.addEventListener('resize',function(){
            resizeSmartFrame(ifr.document.body.scrollHeight);
        });
    }*/
    $('.accessibility').each(function(){
    	if(!$($(this).attr('href')).get(0)) $(this).addClass('disable');
    	if($(this).attr('href') == '#SkipToLogin' && !$($(this).attr('href')).find('input').get(0)) $(this).addClass('disable');
    });
    $('.accessibility').on('click',function(){
		var targetID = $(this).attr('href');
		if(!$(targetID).get(0)) return;
		if($(targetID).get(0).tagName == "A") {
			$(targetID).focus();
		} else {
			if(targetID == "#SkipToGNB") {
				$(targetID).attr('tabindex','-1');
				$(targetID).focus();//.find('input').first().focus();
				$(targetID).on('blur',function(){
					$(this).removeAttr('tabindex');
				});
			} else if(targetID == "#SkipToLogin") {
				$(targetID).find('input').first().focus();
			} else {
				$(targetID).attr('tabindex','-1');
				$(targetID).focus();
				$(targetID).on('blur',function(){
					$(this).removeAttr('tabindex');
				});
			}
		}
		return false;
	});
    $('input.showHideSwitch').on('keyup',function(e){
    	var code = e.which?e.which:e.keyCode;
    	if(code == 13){
    		$(this).trigger('click');
    	}
    });
    $('.userThumb img').each(function(){
    	userThumbRePos($(this));
    	$(this).on('load',function(){
        	userThumbRePos($(this));
        });
    });
    /*해당 function을 못찾아 임시 주석 처리
    $("SELECT.customSelect").selectBox();*/
   
	$(".hasMarquee li").each(function(){
		if( $(this).width() < $(this).find("a").width()) { $(this).addClass("marquee"); }
	});
    	
	
	
	//추천 컨텐츠 롤링 랜덤처리
	var naving = $(".tip").find("nav");
	if(naving.data('length') == 1 ){
		$("article.tip").find("h3").html($("#categoryTitle").val() + "<a href=\""+$("#categoryLink").val()+"\" class=\"more\" target=\"_self\" title=\""+$("#categoryTitle").val()+"\"></a>");
	}else{
		var randomVal = Math.floor(Math.random()*naving.data('length'));
		if((randomVal == 0 && naving.find('a:not(".prev"):not(".next"):eq(0)').hasClass('current'))){
			naving.closest('article').find('h3').html(fnRecommendContentsTipTitle(naving, randomVal));
		}else{
			target = naving.find('a:not(".prev"):not(".next"):eq(' + randomVal + ')');
			target.trigger('click');
		}
	}
	
}

/* 
  	KKS #22187 MainPage 중앙의 롤링 베너 수정 요청 건
	#22586 banner 변수 추가(20170328)  
*/
function fnRecommendContentsTipTitle(thisobj, number){
	var currentLi = thisobj.closest('article').find("li").eq(2*number);
	var categoryLink = currentLi.find("#categoryLink").val();
	var categoryTitle = currentLi.find("#categoryTitle").val();
	
	
	var returnStr = "";
	if("" == categoryTitle || null == categoryTitle || undefined == categoryTitle){
		returnStr = "";
	}else{
		returnStr = categoryTitle + "<a href=\""+categoryLink+"\" class=\"more\" target=\"_self\" title=\""+categoryTitle+"\"></a>";
	}
	/*var returnStr = '자료실<a href="/user/reference/Submain.do" class="more" title="more">more</a>';
	switch(number) {
    case "0":
    	returnStr = '수업 Idea<a href="#none" onclick="fnSubjectList(\'3\', \'1\', \'70507\', \'237594\', \'242032\', \'미술\', \'2170216o3844296\',\'banner\');">more</a>';
        break;
    case "1":
    	returnStr = '계기교육<a href="/user/discretion/popup/special_issue/05_05.do"  target="_blank" class="more" title="more">more</a>';
    	returnStr = '수업 Idea<a href="/user/discretion/bokhapIndex.do?depth_search_term_cd=NONSUB14159&schcodetypecd=NONSUB13019&sort=rest&gubun=sch&sorting_view=list&search_subject_cd=NONSUB12002&code_type_cd=NONSUB12002&currentPageNo=1" class="more" title="more">more</a>';
        break;
    case "2":
    	//returnStr = '체육 수업 Idea<a href="#none" onclick="fnSubjectList(\'3\', \'1\', \'72290\', \'237597\', \'242045\', \'체육\', \'2170216n3750250\',\'banner\');">more</a>';
    	returnStr = '학급경영 꿀 Tip<a href="/user/reference/classManagement.do" class="more" title="more">more</a>';
    	returnStr = '주제별 교육<a href="/user/discretion/popup/special_issue/07_01.do" target="blank" class="more" title="more">more</a>'
    	break;
    default:
    	returnStr = '자료실<a href="/user/reference/Submain.do" class="more" title="more">more</a>';
	}*/
	return returnStr;
}

function initMainFavNav(obj){
    if(!obj.get(0)) return;
	var div = obj.data('division') ? parseInt(obj.data('division')) : 1;
	var cnt = Math.round(obj.find('> li').length / div);
	var nav = obj.parent().find('>nav');
	var prevT,nextT;
	if(!!nav.find('a.prev').get(0)) {
	    prevT = $(nav.find('a.prev').get(0).outerHTML);
	    nextT = $(nav.find('a.next').get(0).outerHTML);
    } else {
        if(nav.hasClass('nav')){
            prevT = $('<a href="#none" title="prev" class="prev">prev</a>');
            nextT = $('<a href="#none" title="next" class="next">next</a>');
        }
    }
	
    //console.log(prevT);
    nav.html("");
    
    
    nav.attr('data-length',cnt).attr('data-current',0);
    for (var i = 0; i < cnt; i++) {
        nav.append("<a href='#none' title='page" + (i + 1) + "'>page" + (i + 1) + "</a>");
    }
    nav.find('a:nth-of-type(1)').addClass('current');
    
    if(nav.hasClass('cnt')){
	    nav.append('<div class="cnt"><em>1</em><span>'+ cnt +'</span></div>');
    }
    nav.prepend(prevT).append(nextT);

    nav.on('click','a:not(.prev):not(.next)', function () {
        if ($(this).hasClass('current')) return;
        var navi = $(this).closest('nav');
        navi.find('a.current').removeClass('current');
        $(this).addClass('current');
        navi.attr('data-current', navi.find('a:not(".prev"):not(".next")').index($(this)));
        if(navi.hasClass('cnt')){
            navi.find('div.cnt em').html(navi.get(0).getAttribute('data-current')*1+1);
        }else {
        	/* KKS #22187 MainPage 중앙의 롤링 베너 수정 요청 건 */
        	if( $(this).closest('section').attr('class') == 'recommendContents' ){
        		/*$(this).closest('h3').html( fnRecommendContentsTipTitle( $('.recommendContents > div > article > nav').attr('data-current') ));*/
        		$(this).closest('article').find('h3').html(fnRecommendContentsTipTitle($(this),$('.recommendContents > div > article > nav').attr('data-current') ));
            }
        }
    });
    nav.on('click','a.prev,a.next',function(){
        var target,navig;
        navig = $(this).closest('nav');

        if(nav.parent().attr('class') == 'tip') nav.parent().find("ul").addClass("transition"); //박소미 2017-08-17
        if($(this).hasClass('next')) {
            if(navig.get(0).getAttribute('data-current') < navig.data('length')) {
                target = navig.find('a:not(".prev"):not(".next"):eq(' + (navig.get(0).getAttribute('data-current') * 1 + 1) + ')');
                target.trigger('click');
            }
            else {}
        } else if($(this).hasClass('prev')) {
            if(navig.get(0).getAttribute('data-current') > 0) {
                target = navig.find('a:not(".prev"):not(".next"):eq(' + (navig.get(0).getAttribute('data-current') * 1 - 1) + ')');
                target.trigger('click');
            }
            else {}
        }
    });
    
    obj.find('a').on("focus",function(){
        if(!obj.parents().hasClass('lm-weekly') && !obj.parents().hasClass('lm-rolling')) return;
    	if(obj.parents().hasClass("lm-weekly")){
    		obj.parents("dl").first().attr("class","lm-weekly active");
    	}
    	var num = $(this).parents("li").first().index();  
    	nav.find('a.current').removeClass('current');
    	nav.find("a").eq(num).addClass('current');
    	nav.data('current',num);
	});
    obj.find('a').on("blur",function(){
    	if(obj.parents().hasClass("lm-weekly")){
    		obj.parents("dl").removeClass("active");
    	}    	
    });
    
    if(obj.hasClass('autoRolling') && nav.find('>a:not(.prev):not(.next)').length > 1){
    	// KKS 18524 rolling set time 6
    	var setTime = 3000;
    	if(obj.parent().hasClass('event')){
    		setTime = 6000;
    	}
		if(obj.parent().hasClass('noti') || obj.parent().hasClass('news')){
    		setTime = 5000;
    	}
    	// KKS 18524 rolling set time 6    	
    	
    	
    	var eventRollingTimer = setInterval(function(){
    		if($(obj).find(':hover').length == 0 && $(nav).find(':hover').length == 0 && obj.find("a:focus").length == 0) {
	    		var next = nav.find('>a.current').next('a:not(.prev):not(.next)');
	    		if(!next.get(0)) next = nav.find('> a:not(.prev):not(.next):eq(0)');
    			if(next.get(0) == undefined) return;

    			// next.trigger('click'); 
    		    if($(".schoolInfoLayerPop").css("display") != "block") next.trigger('click'); //임시조치
	    		
    		}
    	},setTime);
    }
}

function updateLessonSecArticle(){
	if($(this).closest('li').hasClass('blank')) return;
    $(this).closest('ul').find('> li.current').removeClass('current');
    $(this).closest('li').addClass('current');
    //$(this).closest('section.lessonSec').addClass('active');
    $(this).closest('section.lessonSec').find('article > div > h4').html($(this).data('grade'));
    $(this).closest('section.lessonSec').find('article > div > h5').html($(this).data('subject'));
    $(this).closest('section.lessonSec').find('article > div > h5').attr('onclick', $(this).data('subclick'));
    $(this).closest('section.lessonSec').find('article > div > a:eq(0)').html($(this).data('periods'));
    $(this).closest('section.lessonSec').find('article > div > a:eq(0)').attr('onclick', $(this).data('chasiclick'));
    //$(this).closest('section.lessonSec').find('article > div > div.fnc > a.prev').attr('onclick', $(this).data('prevchasiclick'));
    //$(this).closest('section.lessonSec').find('article > div > div.fnc > a.next').attr('onclick', $(this).data('nextchasiclick'));
}

function userThumbRePos(obj){
	if(obj.get(0).naturalWidth < obj.get(0).naturalHeight){
		obj.css({width:'100%',height:'auto'}).css({margin:(obj.height() - obj.width())/-2+'px 0 0 0'});
	} else if(obj.get(0).naturalWidth > obj.get(0).naturalHeight){
		obj.css({height:'100%',width:'auto'}).css({margin:'0 0 0 '+(obj.width() - obj.height())/-2+'px'});
	}
}

function thumbCheckWH(obj){
    //console.log(obj.get(0).naturalWidth, obj.get(0).naturalHeight);
    if(obj.get(0).naturalWidth == 0 && obj.get(0).naturalHeight == 0){
        obj.parent().removeClass('overW').removeClass('overH').addClass('error');
    }
    else if(obj.width() < obj.parent().width()){
        obj.parent().removeClass('overW').addClass('overH');
    }
    else {
        obj.parent().removeClass('overH').addClass('overW');
    }
}

function fncRollingList(obj){
	if(!$(obj).find('.current').get(0) || !$(obj).find('.current').next('li').get(0)) {
		$(obj).find('li:nth-of-type(1)').addClass('current');
		return;
	} else {
		$(obj).find('.current').removeClass('current').next('li').addClass('current');
	}
}
function autoScrollAnimate(obj){
    obj.stop().animate({scrollTop:obj.data().span*obj.data().i}, '500', function(){
        obj.data().i++;
        if(obj.data().i >= obj.find('li').length) obj.data().i = 0;
    });
}
function scrollHeaderDragX(event){
    fncDisableSelect();
    var ox = event.pageX;
    var ol = parseInt($(event.target).css("left"));
    var dx,max,maxScroll;
    var scrollbar = $(event.target).closest('.scrollbar')
    max = scrollbar.width() - $(event.target).width();
    maxScroll = scrollbar.data('liW') - scrollbar.width();
    $(document).on({
        mousemove:function(e){
            dx = e.pageX - ox;
            var tx = ol + dx;
            if(tx<0) tx = 0;
            else if(tx > max) tx = max;
            scrollbar.prev('.activeScroll').scrollLeft(tx * maxScroll / max);
            $(event.target).css({left:tx});
        },
        mouseup:function(){
            fncEnableSelect();
            $(document).off('mouseup mousemove');
        }
    })
}
function fncDisableSelect() {
    $(document).bind('selectstart',function() { return false; })
        .bind('dragstart',function() { return false; })
        .unselectable = 'on';
    $('body').css('user-select',"none")
        .css('-o-user-select',"none")
        .css('MozUserSelect',"none")
        .css('KhtmlUserSelect','none')
        .css('-webkit-user-select',"none");
};

function fncEnableSelect() {
    $(document).unbind('selectstart')
        .unbind('dragstart')
        .unselectable = 'off';
    $('body').css('user-select',"text")
        .css('-o-user-select',"text")
        .css('MozUserSelect',"text")
        .css('KhtmlUserSelect','text')
        .css('-webkit-user-select',"text");
};

addEventListener("message",receiveMessage,false);
function receiveMessage(event){
//    console.log(event.data);
    resizeSmartFrame(event.data);
}
function resizeSmartFrame(h){
    $('iframe.smartFrame').css({height:h});
}

//관리자 배너 공통 새창 팝업
function commonNewPopup(url, popupWidth, popupHeight, popupTop, popupLeft, popupScrollWidth, popupScrollHeight) {
	window.open(url,'i-scream','width='+ popupWidth +', height='+ popupHeight +', top='+ popupTop +', left='+ popupLeft +', scrollbars=1');
}

/**
 * 공통 레이어 팝업 생성
 * param1 - msg (메세지 내용)
 * param2 - type (c:confirm, a:alert)
 * param3 - closeType (true, false)
 * param4 - callback (확인 버튼 javascript function명)
 * ex function) layerPopupGenerator('팝업을 열었습니다.<br/>닫으시겠습니까?','c','finalFunc()');
 */
function layerPopupGenerator(msg, type, closeType, callback){
	var html = "";	
	var callbackFunc = "";
	
	if(callback != ""){
		callbackFunc = callback+";";
	}
	
	html += "<div class='commonLayerDim' style='z-index:999;position:fixed;width:100%;height:100%;top:0px;left:0px;background-color:#fff;filter: alpha(opacity=80); -khtml-opacity: 0.8; -moz-opacity: 0.8; opacity: 0.8;'></div>";
	html += "<div class='commonLayerPopup' style='z-index:999;position:fixed;width:400px;left:50%;margin-left:-200px;top:50%;margin-top:-100px;background-color:#fff;border:1px solid #989696;text-align:center;'>";
	html += "	<div style='padding:10px;'>";
	html += "		<span style='font-weight:bold;'>"+ msg +"</span>";
	html += "	</div>";
	html += "	<div style='padding-bottom:10px;'>";
	html += "		<a onClick='"+ callbackFunc +" layerPopupRemove("+ closeType +");' style='cursor:pointer;background-color: #e74337;border: 1px solid #d5382c;-webkit-border-radius: .35em;-moz-border-radius: .35em;border-radius: .35em;color:#fff;display:inline-block;padding:5px 10px;'>확인</a>";
	
	if(type == "c"){
		html += "		<a onClick='layerPopupRemove("+ closeType +");' style='cursor:pointer;background-color: #515151;border: 1px solid #474747;-webkit-border-radius: .35em;-moz-border-radius: .35em;border-radius: .35em;color:#fff;display:inline-block;padding:5px 10px;'>닫기</a>";
	}
	
	html += "	</div>";
	html += "</div>	";
	
	$(".commonLayerPopup").remove();
	$("body").append(html);
}

//공통 레이어 팝업 닫기
function layerPopupRemove(closeType){
	if(!closeType){
		$(".commonLayerDim").remove();
		$(".commonLayerPopup").remove();
	}else{
		$(".commonLayerDim").fadeOut(800, function(){
			$(this).remove();
		});
		
		$(".commonLayerPopup").fadeOut(800, function(){
			$(this).remove();
		});
	}
}

//공통 레이어 함수 테스트
function finalFunc(){
	console.log("javascript function 실행 후 팝업 닫기");
}
