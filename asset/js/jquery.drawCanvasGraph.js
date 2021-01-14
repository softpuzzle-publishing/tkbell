/**
 * Created by flashkid on 2016-05-25.
 */
function canvasSupport(){
    return !!document.createElement("canvas").getContext;
}

if(jQuery) (function($) {

    $.extend($.fn, {
        draw_roundGraph : function(){
            $.fn.drawObj = function(){
                var canvas = $(this).find('canvas');
                var context = canvas.get(0).getContext('2d');
                var sw = canvas.width(),sh = canvas.height();
                var center = radius = sw/2;
                var angle = -3.14*0.5;
                var per = $(this).data('per');
                var newAngle = angle + Math.PI*2*(per/100);
                context.fillStyle = '#ff7b28';
                context.beginPath();
                context.moveTo(center,center);
                context.arc(center,center,radius,angle,newAngle);
                context.lineTo(center,center);
                context.fill();
                $(this).find('> strong').text(per + '%');
                //var per = Math.round(ans/total*100);
                //var r = per/100 * 360;
                //$(this).find('dd:eq(0) > strong').html(total);
                //$(this).find('dd:eq(1) > strong').html(ans);
                //$(this).find('span.per').html(per);
                //$(this).find('mark').css({transform:'rotate('+r+'deg)'}).html(per);
            }
            var init = function(obj) {
                obj = $(obj);
                if( !canvasSupport() ){
                    alert('도형 그리기를 지원하지 않는 브라우저입니다.\n도형 그리기를 지원하는 브라우저로 다시 접속하세요.');
                    return;
                }
                if(obj.find('canvas').length === 0) {
                    $(document.createElement('canvas')).appendTo(obj);
                }
                obj.drawObj();
            };

            $(this).each( function() {
                init(this);
            });

            return $(this);
        }

    });

})(jQuery);