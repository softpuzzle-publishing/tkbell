/**
 * jquery.kakaologin - v1.0.0 
 */
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//developers.kakao.com/sdk/js/kakao.min.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'kakao-jssdk'));

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.extend({
        /**
         * kakao login
         * @property {object}  options      - settings for kakao plugin.
         * 
         * options.kakaoId         {string}    - the kakao app id
         *
         * Optional:
         * options.permissions  {string}    - a comma seperated list of kakao permissions. See http://bit.ly/1plqJSs
         * options.success      {function}  - callback that will be triggered when data is successfully returned from FB.
         * options.error        {function}  - callback that will be triggered by any errors.
         */
        kakaologin: function (options) {
            
            /**
             * Private Props
             * @property {object}  __               - add private module functions here.
             * @property {object}  isSdkLoaded      - a flag for when the kakao SDK has loaded.
             * @property {object}  isKakaoInitiated    - a flag for when kakao.init has been called.
             * @property {object}  $dfd             - stores an instance of jquery Deferred.
             */
            var __,           
                isSdkLoaded,      
                isKakaoInitiated,
                $dfd;

            options = options || {};
            isSdkLoaded = false;
            isKakaoInitiated = false;
            $dfd = $.Deferred();

            // PRIVATE FUNCTIONS
            __ = {  
                init: function () {
                    // kakao ID is required
                    if (!options.kakaoId) {
                    	throw new Error('Required option "kakaoId" is missing!');
                    }

                    __.initKakao();
                    options.success = options.success || function(){};
                    options.error = options.error || function(){};
                },
                initKakao: function () {
                    if (!isKakaoInitiated) {
                    	try { 
                    		Kakao.init(options.kakaoId);
                    	}
                    	catch (ex) {}
                        isKakaoInitiated = true;
                    }
                    
                    $dfd.notify({status: 'init.kakaologin'});
                },
                loginToKakao: function () {
                	Kakao.Auth.login({
                	    persistAccessToken: true,
                	    success: function (response) {
                            $dfd.notify({
                                status: 'authenticate.kakaologin',
                                data: response
                            });                	    	
                	    },
                	    fail: function(response) {
                	    	console.log(response)
                	    	// mimic facebook sdk error format
                            $dfd.reject({
                                error: {
                                    message: 'User cancelled login or did not fully authorize.'
                                }
                            });
                	    }
                	});                	
                },
                getFields: function (accessToken) {
                	Kakao.API.request({
                	    url: '/v1/user/me',
                	    success: function(response) {
                            if (response && !response.error) {
                            	response.accessToken = accessToken;
                            	$dfd.resolve(response);
                            }
                	    },
                	    fail: function(response) {
                            $dfd.reject(response);
                	    }
                	});
                }
            };

            // This monitors the Kakao login progresssion
            // 1. Init Kakao
            // 2. kakao.login
            // 3. Get user data
            $dfd.progress(function (response) {
                if( response.status === 'init.kakaologin' ) {
                    __.loginToKakao();
                } else if( response.status === 'authenticate.kakaologin' ) {
                     __.getFields(response.data.access_token);
                } else {
                    dfd.reject();
                }
            });

            // point callbacks at deffereds
            $dfd.done(options.success);
            $dfd.fail(options.error);

            // here we go!
            __.init();

            return $dfd;
        }
    });
}));