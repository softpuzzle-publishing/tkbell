/*		
	date : 2018-11-06
	author :  Hyojeong Yang
	modify :  Hyojeong Yang
	site : projectQ
*/

var ie = /MSIE/.test(navigator.userAgent);
ieVer = ie ? parseInt(navigator.userAgent.split('MSIE')[1].split(';')[0]) : false;


if (jQuery) (function ($) {

    //Width Control
    $.extend($.fn, {

        adjustWidth: function () {

            var init = function (menu) {

                if ($(menu)[0].tagName == "UL") { menu = $(menu); }
                else { menu = $(menu).find('>ul'); }
                menu.find('>li').css({ width: 100 / menu.find('>li').length + '%' });
            }

            $(this).each(function () {
                init(this);
            });

            return $(this);
        }
    });

    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전달',
        nextText: '다음달',
        currentText: '오늘',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        duration: 200,
        showAnim: 'show',
        showMonthAfterYear: true
        // yearSuffix: '년'
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);

    // datepicker select
    $.extend($.fn, {
        directDate: function (directDateTo) {
            var init = function (directDateFrom) {
                var dateFormat = "yy-mm-dd",
                    from = directDateFrom.datepicker({
                        defaultDate: "+1w",
                        changeMonth: true
                    }).on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                    to = directDateTo.datepicker({
                        defaultDate: "+1w",
                        changeMonth: true
                    }).on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });
                function getDate(element) {
                    var date;
                    try {
                        date = $.datepicker.parseDate(dateFormat, element.value);
                    } catch (error) {
                        date = null;
                    }
                    return date;
                }
            }

            $(this).each(function () {
                init($(this));
            });

            return $(this);
        }
    });


    $.extend($.fn, {
        infoFnc: function () {
            var init = function () {

                /* infoOpen */
                function infoOpen(idx) {
                    $('.make-info').scrollTop(0);
                    $('.make, .make-info, .btn-info').addClass('active');
                }

                /* infoClose */
                function infoClose() {
                    $('.make, .make-info, .make-info-btn a').removeClass('active');
                }
               
                /*infoMove*/
                function infoMove(el,idx) {
                    $('.make-info-btn a').removeClass('active');
                    el.addClass('active');
					
					$('.make-info > section').hide();
					$('.make-info > section').eq(idx).show(0);
                    
                    var id = el.attr('href'),// target element id
                        $id = $(id),// target element
                        pos = $id.offset().top,
                        windowScollTopPos = $(window).scrollTop();
                        scrollTopPos = $('.make-info').scrollTop() - windowScollTopPos;
                        if ($id.length === 0) {
                            return;
                        }
						$('.highlight').removeClass();
						$id.addClass('highlight');
                        $('.make-info').animate({ scrollTop: scrollTopPos + pos - $('.make-header').outerHeight() + 5});
                }

                $('.btn-info, .btn-info-close').on('click', function () {
                    if (!$('.make').hasClass('active') && !$('.make-info').hasClass('active')) {
                        infoOpen();
                    }
                    else {
                        infoClose();
                    }
                });

                $('.make-info-btn a').on('click', function (e) {
                    e.preventDefault();

					var idx = $(this).closest('li').index();
                    if (!$('.make').hasClass('active') && !$('.make-info').hasClass('active')) {
                        infoOpen();
                        infoMove($(this),idx);
                    }
                    else if (!$(this).hasClass('active')) {
                        infoMove($(this),idx);
                    }
                    else {
                        infoClose();
                    }
                });

                /* all close */
                $(document).click(function (e) {
                    if ($('.make').hasClass('active') && $('.make-info').hasClass('active') && !$(e.target).is('.btn-info, .make-mn li a, .make-info, .make-info *')) {
                        infoClose();
                    }
                });
            }

            $(this).each(function () {
                init(this);
            });

            return $(this);
        }
    });

})(jQuery);


$(document).ready(function () {

    //jquery-ui
    $(".tabs").tabs();
    $('select:not(select[multiple]):not(.normal)').selectmenu();
	$(".datepicker").datepicker({
		showOn: "button",
		buttonImage: "/assets/cms/images/common/ico_calendar.png",
		buttonText: "Select date"
	});
	$("input[type=checkbox], input[type=radio]").checkboxradio();

    // 도움말 이동
	$('.make-info').infoFnc();


    //tag 입력
	/*$('.tags-area input[type=text]').tagEditor({
	    placeholder: '태그를 입력하세요.(최대 10개)',
	    initialTags: [],
	    delimiter: '# ,',
	    maxLength: 12,
	    maxTags: 10,
	    removeDuplicates: false
	});*/

    //단답형 입력
	$('.shortanswer-area input').tagEditor({
	    placeholder: '정답을 입력하세요.(공백 포함 최대 20자까지 가능, 엔터키로 추가 입력 가능)',
	    initialTags: [],
	    //delimiter: '',
//	    maxLength: 12,
	    maxLength: 20,
	    maxTags: 5,
	    removeDuplicates: false,
	    forceLowercase: false,
	    sortable: false
	});
	
	//빈칸형 입력
	$('.blankanswer-area input').tagEditor({
	    placeholder: '정답을 입력하세요.(공백 포함 최대 20자까지 가능, 엔터키로 추가 입력 가능)',
	    initialTags: [],
	    //delimiter: '',
//	    maxLength: 15,
	    maxLength: 20,
	    maxTags: 5,
	    removeDuplicates: false,
	    forceLowercase: false,
	    sortable: false
	});

	//textarea 자동 높이 조절
	$('.textarea-auto textarea').each(function(){
		$(this).height(this.scrollHeight);
	});
	$('.textarea-auto').on('keyup', 'textarea', function (e) {
	    //$(this).css('height', 'auto');
	    $(this).height(this.scrollHeight);
	});


    //media video play
    //$('.video').hover(showVideo, hideVideo);
    //function showVideo(e) {
    //    var $video = $(this).children().find('video');

    //    $(this).children('.video figure').hide();
    //    $(this).children('.video-cont').show();
    //    $($video, this).get(0).play();
    //}

    //function hideVideo(e) {
    //    var $video = $(this).children().find('video');

    //    $(this).children('.video figure').show();
    //    $(this).children('.video-cont').hide();
    //    $($video, this).get(0).pause();
    //}

    /* 선택조건 */
    $('.btn-qfilter, .qfilter button').on('click', function () {
        var hasText = $.trim($('.option-preview').text());
        $('.qfilter').slideToggle();
		if(hasText.length == 0) {
			$('.option-preview').fadeToggle();
		} else {
			$('.option-preview').fadeIn();
		}
    });
});


$(window).scroll(function () {
});
$(window).resize(function () {

});

