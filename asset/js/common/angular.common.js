var postsApp = angular.module('postsApp', ['ngSanitize']);
postsApp.controller('postsCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
	//blank controller
}]);

postsApp.factory('ajax', ['$http', function ($http) {
    return {
        get: function(url) {
        	if (url.indexOf('?') > -1) 
        		url += "&sso=ok";
        	else 
        		url += "?sso=ok";
	        return $http.get(url);
	    },
	    post: function(url, param) {
        	if (url.indexOf('?') > -1) 
        		url += "&sso=ok";
        	else 
        		url += "?sso=ok";	    	
	        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	        return $http.post(url, param);
	    },
	  };
}]);

postsApp.filter('unsafe', function($sce) {
    return function(val, id) {
    	var str = '';
    	if (val == undefined)  return '';
    	
    	if (val.indexOf("\n") > -1) {
    		val = val.split('\n');
	        str = '<p>';
	        for (var i = 0; i < val.length; i ++) {
                str += val[i] +'<br>'; 
	        	if (i == 4 && val.length > 6) {
	        		str += '</p><input type="checkbox" class="textConSwitch" id="textConSwitch_'+ id +'" /><label for="textConSwitch_'+ id +'">더보기</label>'
	        		str += '<p>';
	        	}
	        }
	        val = str +'</p><p>&nbsp;</p>';
	    }

    	val += '<p>&nbsp;</p>';
    	return $sce.trustAsHtml(val);
    };
});

postsApp.filter('embed', function($sce) {
    return function(val) {
    	val = val.replace(/www.youtube.com\/embed\/(.*?)"/g, function (a, b) {
    	    return ['www.youtube.com/embed/', b, '?&wmode=transparent"'].join("");
    	});
    	
        return $sce.trustAsHtml(val);
    };
});

postsApp.filter('striptags', function($sce) {
    return function(val) {
    	val = val.replace(/&(lt|gt);/g, function (strMatch, p1){
    		return (p1 == "lt")? "<" : ">";
    	});
    	val = val.replace(/<\/?[^>]+(>|$)/g, "");
        return val;
    };
});

postsApp.directive('dynamic', function($compile) {
    return {
        restrict: 'A',
        replace: true,
        link: function (scope, element, attrs) {
            scope.$watch(attrs.dynamic, function(html) {
                element[0].innerHTML = html;
                $compile(element.contents())(scope);
            });
        }
    };
});

