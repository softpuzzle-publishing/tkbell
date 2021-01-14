window.addEventListener('load',function(){
    // iBox 사용현황 그래프 그리기
    $('.drawRoundGraph').draw_roundGraph();

    //커스텀 스크롤 - 세로
    $('.customScrollY').each(function() {
        customScrollY($(this));
    });
    //커스텀 스크롤 - 가로
    $('.customScrollX').each(function() {
        customScrollX($(this));
    });

    //아티클 관련 함수 초기화
    initArticle();

    //check scrolled to near the bottom
    $(document.body).data('lastScrollTop',0);
    infiniteScrollingInit();
    $(window).trigger('scroll');

    //스케줄러 달력
    $('.scheduler .calendar').datepicker({
        onSelect:function(date){
            $('.schedulerData').fullCalendar('gotoDate',date);
        },
        dateFormat:$(this).data('format'),
        showOtherMonths: true,
        showMonthAfterYear : true,
        monthNum : true,
        showDayName:true
    });

    $('.scheduler dl dd:nth-of-type(1) a').on('click',function(){
        $('.schedulerData').fullCalendar('changeView','basicDay');
        $('.schedulerData').fullCalendar('today');
    });

    $('.scheduler dl dd:nth-of-type(2) a').on('click',function(){
        $('.schedulerData').fullCalendar('changeView','basicWeek');
        $('.schedulerData').fullCalendar('today');
    });

    $('.scheduler dl dd:nth-of-type(3) a').on('click',function(){
        $('.schedulerData').fullCalendar('changeView','month');
        $('.schedulerData').fullCalendar('today');
    });

    //스케줄러
    if($('.schedulerData').length > 0) {
        $('.schedulerData').fullCalendar({
            header: {
                left: 'prev,title,next',
                right: 'basicDay,basicWeek,month'
            },
            views : {
                basicWeek : { titleFormat: 'YYYY.MM.DD'},
                basicDay : { titleFormat: 'YYYY.MM.DD'},
                month : { titleFormat: 'YYYY.MM', eventLimit:true}
            },
            //titleFormat: {month: 'yyyy년 MMMM월',week:'yyyy년 MMMM월',day:'yyyy년 MMMM월 dd일'},
            editable: false,
            eventLimit: false,
            defaultView: 'basicDay',
            lang: 'ko',
            height:661,
            events: [
                {
                    subjectcode: 'a1',
                    subject: '국어',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기 시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-25',
                    end: '2016-08-29 23:59',
                    startT: '2016.07.25',
                    endT: '2016.08.29',
                    completecnt: 11,
                    notcompletecnt: 3
                },
                {
                    subjectcode: 'a4',
                    subject: '수학',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-27',
                    end: '2016-08-07 23:59',
                    startT: '2016.07.27',
                    endT: '2016.08.07',
                    completecnt: 11,
                    notcompletecnt: 3
                },
                {
                    subjectcode: 'a2',
                    subject: '도덕',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-27',
                    end: '2016-09-01 23:59',
                    startT: '2016.07.27',
                    endT: '2016.09.01',
                    completecnt: 11,
                    notcompletecnt: 3
                },
                {
                    subjectcode: 'a1',
                    subject: '국어',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기 시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-25',
                    end: '2016-08-29 23:59',
                    startT: '2016.07.25',
                    endT: '2016.08.29',
                    completecnt: 11,
                    notcompletecnt: 3
                },
                {
                    subjectcode: 'a4',
                    subject: '수학',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-27',
                    end: '2016-08-07 23:59',
                    startT: '2016.07.27',
                    endT: '2016.08.07',
                    completecnt: 11,
                    notcompletecnt: 3
                },
                {
                    subjectcode: 'a1',
                    subject: '국어',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기 시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-25',
                    end: '2016-08-29 23:59',
                    startT: '2016.07.25',
                    endT: '2016.08.29',
                    completecnt: 11,
                    notcompletecnt: 3
                },
                {
                    subjectcode: 'a4',
                    subject: '수학',
                    grade: '3학년',
                    session: '5-6차시',
                    title: '시나 이야기를 찾아 읽고 독서 감상문 쓰기',
                    page: '국32-37p',
                    start: '2016-07-27',
                    end: '2016-08-07 23:59',
                    startT: '2016.07.27',
                    endT: '2016.08.07',
                    completecnt: 11,
                    notcompletecnt: 3
                }
            ]
        });
    }

    //클립보드로 복사
    $('.copyClip').on('click',function(){
        var target = $(this).get(0);
        target.focus();
        target.setSelectionRange(0, target.value.length);
        var succeed;
        try {
            succeed = document.execCommand("copy");
        } catch(e) {
            succeed = false;
        }
        if(!!succeed){
            alertC('클립보드에 복사되었습니다.');
        } else {
            $(this).off('click');
        }
        return succeed;
    });
});

function initArticle(){
	// a event remove
	$('article .imgCon a, article .movCon video').unbind();
    // 섬네일 센터 정렬을 위한 가로/세로 비
    $('.userThumb img, .classThumb img, .imgCon img').each(function(){
        thumbCheckPortrait($(this));
        $(this).on('load',function(){
            thumbCheckPortrait($(this));
        });
    });

    //video and play button click
    $('article .movCon video').each(function(){
        var vdo = $(this);
        vdo.nextAll('a.play').on('click',function(){
            vdo.get(0).play();
            vdo.attr('controls','controls');
            $(this).remove();/*.addClass('played')
             .on('mouseout',function(){
             $(this).removeClass('played').addClass('clicked');
             });*/
        });
        vdo.on('click',function(){
        })
    });

    //img or video click
    $('article .imgCon a, article .movCon video').on('click',function(){
        var imgArr = new Array();
        var classNm;
        if($(this).get(0).tagName == 'VIDEO') {
            imgArr.push($(this).get(0).src);
            var vs = $(this).get(0).paused;
            $(this).get(0).pause();
            var ct = $(this).get(0).currentTime;
            classNm = 'vod';
            //console.log(vs,ct);
        } else {
            imgArr = $(this).closest('.imgCon').data('contentslist');
            classNm = 'img';
        }
        var curCnt = $(this).closest('.imgCon').find('a').index($(this));

        var dimmed = $(document.createElement('div')).addClass('dimmed').appendTo($(document.body));
        var prvCon = $(document.createElement('div')).addClass('prvCon').addClass(classNm).appendTo($(document.body));
        prvCon.html('<div class="header"><em>' + (curCnt+1) + '</em><span> / '+ imgArr.length +'</span><a href="#none" title="close">close</a></div>');
        var nav = $(document.createElement('nav')).appendTo(prvCon);
        nav.html('<a href="#none" class="prev" title="previous">previous</a><a href="#none" class="next" title="next">next</a>');
        var imgListUL = $(document.createElement('ul')).appendTo(prvCon);
        var imgDownArr = $(this).closest('.imgCon').data('downslist');
        var imgNameArr = $(this).closest('.imgCon').data('nameslist');
        for(var i = 0; i<imgArr.length; i++){
            var li = $(document.createElement('li')).appendTo(imgListUL);
            if($(this).get(0).tagName == 'VIDEO') {
                prvCon.find('.header em').html('1');
                var vdo = $(this).clone().get(0);
                li.get(0).appendChild(vdo);
                if(!vs) vdo.play();
                try {
                    vdo.currentTime = ct;
                } catch(e){
                    console.log(e);
                }
            } else {
                //console.log(imgArr[i].split('/').pop());
                li.html('<img src="' + imgArr[i] + '" alt="image" /><span>'+imgNameArr[i]+'<a href="'+ imgDownArr[i] +'" download>download</a> </span>');
            }
        }
        var curLI = imgListUL.find('li:eq('+curCnt+')').addClass('current');
        if (curLI.next('li').length == 0) nav.find('.next').addClass('disabled');
        if (curLI.prev('li').length == 0) nav.find('.prev').addClass('disabled');

        prvCon.find('.header > a').on('click',function(){
            dimmed.remove();
            prvCon.remove();
        });
        nav.on('click','a',function(){
            var current = imgListUL.find('li.current');
            if($(this).hasClass('disabled')) return;
            if($(this).hasClass('next')){
                current.removeClass('current').next('li').addClass('current');
            } else if($(this).hasClass('prev') ) {
                current.removeClass('current').prev('li').addClass('current');
            }
            prvCon.find('.header em').html(imgListUL.find('li').index(imgListUL.find('li.current'))+1);
            nav.find('a').removeClass('disabled');
            var newCurrent = imgListUL.find('li.current');
            if (newCurrent.next('li').length == 0) nav.find('.next').addClass('disabled');
            if (newCurrent.prev('li').length == 0) nav.find('.prev').addClass('disabled');
        });
    });

    //.menuCon blur
    $('.menuCon').each(function(){
        $(this).find('>input').on('change', function(event){
            var orgObj = event.target;
            if(event.target.checked){
                $(document.body).on('click',function(e){
                    var trgObj = $(e.target).closest('.menuCon').find('>input').get(0);
                    if(orgObj !== trgObj){
                        $(orgObj).trigger('click');
                    } //else if($(orgObj).closest('.menuCon').get(0) !== $(trgObj).closest('.menuCon').get(0)) {
                    $(document.body).off('click');
                    //}
                })
            }
        });
    });

    //selectAll checkbox
    $('input[name="selectAll"]').on('change',function(){
        var allChecked = this.checked;
        $('input[name="messageSequences"]').each(function(){
            this.checked = allChecked;
        })
    });
    
    //openFileBtn
    $('.openFileBtn').on('click',function(){    	
    	$(this).parent().find(".replyFileCon").css({display:'block'});
    });
}

function infiniteScrollingInit(){
    $('main section .loading').removeClass('active');
    var win = $(window);
    win.on('scroll',function(e) {
        var st = win.scrollTop();
        if(st > $(document.body).data('lastScrollTop') && win.scrollTop() + win.height() > $(document).height() - 300) {
            win.off('scroll');
            $('main section .loading').addClass('active');
            /* call more data */
            console.log('call more data!! after success call infiniteScrollingInit');

            win.trigger('morePosts');
            /* after success  */
            infiniteScrollingInit();
            return;
        }
        $(document.body).data('lastScrollTop',st);
    });
}

function thumbCheckPortrait(obj){
    if(obj.get(0).naturalWidth < obj.get(0).naturalHeight){
        obj.parent().removeClass('landscape').addClass('portrait');
    } else if(obj.get(0).naturalWidth >= obj.get(0).naturalHeight){
        obj.parent().removeClass('portrait').addClass('landscape');
    }
}
function FncMoveToOtherClass(event){
    if(event.target.checked) {
        var classUL = $(event.target).nextAll('.customScrollY').first();
        customScrollY(classUL);
        classUL.get(0).scrollTop = 0;
        classUL.next('.scrollBar').find('>a').css({top:0});
    }
}
function customScrollY(obj){
    if(obj.outerHeight() >= obj.get(0).scrollHeight) return;
    if(!obj.next().hasClass('scrollBar')){
        $(document.createElement('div')).addClass('scrollBar').insertAfter(obj);
        $(document.createElement('a')).attr({href:'#none',title:'scrollbar header'}).text('scrollbar header').appendTo(obj.next('.scrollBar'));
    }
    var liH = obj.get(0).scrollHeight;
    obj.next('.scrollBar').data('liH',liH).css({height:obj.outerHeight()}).find('> a').css({height:obj.outerHeight()/liH * 100 + '%'});
    obj.addClass('activeScroll').on('mousewheel DOMMouseScroll',function(event){
        var evt = event.originalEvent;
        var delta = !!evt.detail ? evt.detail*(-120) : evt.wheelDelta;
        delta > 0 ? obj.get(0).scrollTop = obj.get(0).scrollTop - 32  : obj.get(0).scrollTop = obj.get(0).scrollTop + 32;
        var scrollbar = obj.next('.scrollBar');
        var scrollbarHeader = scrollbar.find('>a');
        scrollbarHeader.css({top:( scrollbar.height()-scrollbarHeader.height() ) / ( this.scrollHeight-scrollbar.height() ) * this.scrollTop});
        event.preventDefault();
    });
    obj.next('.scrollBar').find('>a').on('mousedown',scrollHeaderDragY);
}
function customScrollX(obj){
    if($(this).outerWidth() >= $(this).get(0).scrollWidth) return;
    if(!obj.next().hasClass('scrollBar')){
        $(document.createElement('div')).addClass('scrollBar').insertAfter(obj);
        $(document.createElement('a')).attr({href:'#none',title:'scrollbar header'}).text('scrollbar header').appendTo(obj.next('.scrollBar'));
    }
    var liW = $(this).get(0).scrollWidth;
    $(this).addClass('activeScroll').next('.scrollBar').data('liW',liW).css({width:$(this).outerWidth()}).find('> a').css({width:$(this).outerWidth()/liW * 100 + '%'});
    $(this).addClass('activeScroll').on('mousewheel DOMMouseScroll',function(event){
        var evt = event.originalEvent;
        var delta = !!evt.detail ? evt.detail*(-120) : evt.wheelDelta;
        delta > 0 ? this.scrollLeft = this.scrollLeft - 32  : this.scrollLeft = this.scrollLeft + 32;
        var scrollbar = $(this).next('.scrollBar');
        var scrollbarHeader = scrollbar.find('>a');
        scrollbarHeader.css({left:( scrollbar.width()-scrollbarHeader.width() ) / ( this.scrollWidth-scrollbar.width() ) * this.scrollLeft});
        event.preventDefault();
    });
    $(this).next('.scrollBar').find('>a').on('mousedown',scrollHeaderDragX);
}
function scrollHeaderDragY(event){
    fncDisableSelect();
    var ox = event.pageY;
    var ol = parseInt($(event.target).css("top"));
    var dx,max,maxScroll;
    var scrollbar = $(event.target).closest('.scrollBar')
    max = scrollbar.height() - $(event.target).height();
    maxScroll = scrollbar.data('liH') - scrollbar.height();
    $(document).on({
        mousemove:function(e){
            dx = e.pageY - ox;
            var tx = ol + dx;
            if(tx<0) tx = 0;
            else if(tx > max) tx = max;
            scrollbar.prev('.activeScroll').scrollTop(tx * maxScroll / max);
            $(event.target).css({top:tx});
        },
        mouseup:function(){
            fncEnableSelect();
            $(document).off('mouseup mousemove');
        }
    })
}
function scrollHeaderDragX(event){
    fncDisableSelect();
    var ox = event.pageX;
    var ol = parseInt($(event.target).css("left"));
    var dx,max,maxScroll;
    var scrollbar = $(event.target).closest('.scrollBar')
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
function fncDisableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    //document.onkeydown  = preventDefaultForScrollKeys;
}

function fncEnableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}
function preventDefaultForScrollKeys(e) {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = {33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

window.addEventListener('load',function(){
	/* 초기화 */
	writeInit();

    /*
    $('label.usersClassThumb').pluploadQueue({
        url : 'upload.php',
        filters : [
            {title : "Image Files", extensions : "jpg,jpeg,gif,png"}
        ],
        dragdrop:true,
        uploadType:'thumb',
        max_file_count:1,
        multi_selection:false,
        flash_swf_url : '../js/Moxie.swf',
        silverlight_xap_url : '../js/Moxie.xap'
    });

    $('.addContents.files').pluploadQueue({
        url : 'upload.php',
        filters : [
            {title : "Document Files", extensions : "doc,docx,hwp,pdf,pptx,ppt,xlsx,xls,txt"}
        ],
        dragdrop:true,
        uploadType:'doc',
        max_file_count:10,
        flash_swf_url : '../js/Moxie.swf',
        silverlight_xap_url : '../js/Moxie.xap'
    });

    $('.addContents.images').pluploadQueue({
        url : 'upload.php',
        filters : [
            {title : "Image Files", extensions : "jpg,jpeg,gif,png"}
        ],
        dragdrop:true,
        uploadType:'img',
        max_file_count:30,
        flash_swf_url : '../js/Moxie.swf',
        silverlight_xap_url : '../js/Moxie.xap'
    });

    $('.addContents.movie .mov').pluploadQueue({
        url : 'upload.php',
        filters : [
            {title : "Movie Files", extensions : "mp4"}
        ],
        dragdrop:true,
        uploadType:'mov',
        max_file_count:1,
        multi_selection:false,
        flash_swf_url : '../js/Moxie.swf',
        silverlight_xap_url : '../js/Moxie.xap'
    });
	*/
    $('.writeCon .btnCon .spot').on('click',function(){
        var uploadStart = $('.writeCon form > input:checked + label + div.addContents .plupload_start');
        uploadStart.trigger('click');
    });

    if(/msie/.test(navigator.userAgent.toLowerCase())||/trident/.test(navigator.userAgent.toLowerCase())) {
        $('.writeCon textarea').on('keypress', function () {
            if ($(this).value != null || $(this).value != '') {
                $(this).addClass('valid');
            }
        });
    }
});

function writeInit() {
    //텍스트 에어리어 자동 크기 조정
    $('main > section textarea').each(function(){
        autoResizeHeightTA($(this).get(0));
    });
    $('textarea[maxlength]').each(function(){
        autoCountTA($(this).get(0));
    });

    $('.hasDatePicker').datepicker({
        dateFormat:'yy-mm-dd',
        showOtherMonths: true,
        showMonthAfterYear : true,
        monthNum : true,
        showDayName:false
    });
}

//텍스트 에어리어 자동 크기 조정 * 텍스트 에어리어가 새로 추가될 경우 실행시켜줘야 함
function autoResizeHeightTA(obj){
    obj.addEventListener('keyup',function(){
        obj.style.height = obj.scrollHeight + 1 + 'px';
    },false);
}

// 텍스트 에어리어 글자수 자동 계산
function autoCountTA(obj){
    var cnt = $(obj).next('div.cnt');
    cnt.find('>span').html(obj.getAttribute('maxlength'));
    cnt.find('>em').html(obj.value.length);
    obj.addEventListener('keyup',function(){
        cnt.find('>em').html(obj.value.length);
    });
}