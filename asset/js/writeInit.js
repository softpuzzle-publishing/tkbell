/**
 * Created by flashkid on 2016-06-03.
 */
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
