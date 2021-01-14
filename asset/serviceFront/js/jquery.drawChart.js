/**
 * Created by flashkid on 2015-07-08.
 */

function canvasSupport(){
    return !!document.createElement("canvas").getContext;
}

if(jQuery) (function($) {

    $.extend($.fn, {

        draw_iBoxChart: function() {
            $.fn.drawObj = function(){
                var canvas = $(this).find('canvas');
                var context = canvas.get(0).getContext('2d');
                var sw = canvas.width(),sh = canvas.height();
                var center  = radius = sw/2;
                var angle = -3.14*0.5;
                var color = ['#79c084','#ff6767','#f7ce40','#ede2d9'];
                var total = $(this).data('iboxTotal');
                var data = [parseFloat($(this).data('iboxVideo')).toFixed(1)*1,
                    parseFloat($(this).data('iboxImage')).toFixed(1)*1,
                    parseFloat($(this).data('iboxDoc')).toFixed(1)*1];
                data.push( (total - (data[0] + data[1] + data[2])).toFixed(1)*1 );
                for(var i = 0; i < data.length; i++){
                    var newAngle = angle + Math.PI*2*(data[i]/total);
                    context.fillStyle = color[i];
                    context.beginPath();
                    context.moveTo(center,center);
                    context.arc(center,center,radius,angle,newAngle);
                    context.lineTo(center,center);
                    context.fill();
                    angle = newAngle;
                }
                var used = (total - data[data.length-1]).toFixed(1);
                $(this).find('div strong').html(used);
                $(this).find('div span').html(total);
                $(this).find('dl dd:eq(0)').html(Math.round(data[0]/total * 100));
                $(this).find('dl dd:eq(1)').html(Math.round(data[1]/total * 100));
                $(this).find('dl dd:eq(2)').html(Math.round(data[2]/total * 100));
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

        },

        draw_reqChart : function(){
            $.fn.drawObj = function(){
                var canvas = $(this).find('canvas');
                var context = canvas.get(0).getContext('2d');
                var sw = canvas.width(),sh = canvas.height();
                var center  = radius = sw/2;
                var angle = -3.14*0.5;
                var total = $(this).data('req');
                var ans = $(this).data('ans');
                var newAngle = angle + Math.PI*2*(ans/total);
                context.fillStyle = '#ff7640';
                context.beginPath();
                context.moveTo(center,center);
                context.arc(center,center,radius,angle,newAngle);
                context.lineTo(center,center);
                context.fill();
                var per = Math.round(ans/total*100);
                var r = per/100 * 360;
                $(this).find('dd:eq(0) > strong').html(total);
                $(this).find('dd:eq(1) > strong').html(ans);
                $(this).find('span.per').html(per);
                $(this).find('mark').css({transform:'rotate('+r+'deg)'}).html(per);
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