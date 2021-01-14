  (function() {
    var po = document.createElement('script');
    po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/client.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
  })();

var isYoutubeLoading = false;
youtubeSearchKeyword = '';
nextPageToken ='';
lastSearchCount = 31; 
var tempVideIdArray = [];

function showMyVideos(json) {	
	var items = json.items;
	if(items != null) {
		setYoutubeTag(items);
	} else {
		isYoutubeLoading = false;
	}
}

function youtubeSearch() { //기존 유튜브 영역과 구분값
	tempVideIdArray = [];
	gapi.client.setApiKey('AIzaSyC4L0zSIZrQNkCpT8wVPzBSHIsn3jy46xc');
	if(youtubeSearchKeyword != $('#searchKeyword').val()){
		nextPageToken = '';
	}
	
	if(lastSearchCount < 30){
		return;
	}
		
	youtubeSearchKeyword = $('#searchKeyword').val();
	if(youtubeSearchKeyword == '')
		youtubeSearchKeyword = '교육';
    gapi.client.load('youtube', 'v3', youtubeList); 
    		
    		
    	
}

function youtubeList() {    	
  	var request = gapi.client.youtube.search.list({
  	    q: youtubeSearchKeyword,
  	    type : 'video',
  	    videoCategoryId : '27',
  	    maxResults: '30',
  	    pageToken : nextPageToken,
  	    part: 'snippet'
   }).then(function(response){
	   var resultList = response.result.items;
	   if(resultList.length != 0){
		   var str = JSON.stringify(response.result);
		   nextPageToken = response.result.nextPageToken;
		   lastSearchCount = response.result.items.length;
		   
		   for ( var i = 0; i < resultList.length; i++) {
			   tempVideIdArray.push(resultList[i].id.videoId);
		   }
		   
		   youtubeDetailList(tempVideIdArray);
	   }
	  
   });
}

function youtubeDetailList(array){
	var request1 = gapi.client.youtube.videos.list({
  	    id: array.toString(),
  	    part: 'snippet,contentDetails'
   }).then(function(response){
	   showMyVideos(response.result);
   });
	
}


function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("ytPlayer");
	// This causes the updatePlayerInfo function to be called every 250ms to
	// get fresh data from the player

	ytplayer.addEventListener("onStateChange", "onPlayerStateChange");
	ytplayer.addEventListener("onError", "onPlayerError");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
	// The video to load
	var videoID = "WgsXcJi1CHY";

	// The element id of the Flash embed
	var atts = {
		id : "ytPlayer"
	};
	// All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
	swfobject.embedSWF("http://www.youtube.com/v/" + videoID
			+ "?version=3&enablejsapi=1&playerapiid=player1&fs=1", "videoDiv",
			"592", "364", "8", null, null, {
				allowScriptAccess : 'always',
				allowfullscreen : 'true'
			}, atts);
}

function _googlePlyerLoader() {
	loadPlayer();
}

function youtubeTimePad(n, width, z) {
	  z = z || '0';
	  n = n + '';
	  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}


/***********************************************************************************************
 * Search API
 ***********************************************************************************************/
//defatul request json-c feeds 
function REQUEST_JSON_C_FEEDS() {
	this.ALT = 'jsonc';
	this.AUTHOR = '';
	this.CALLBACK = 'showMyVideos';
	this.FIELDS = '';
	this.FIELDS_LANGUAGE = '';
	this.MAX_RESULTS = '20'; //maximum values 50
	this.PRETTYPRINT = 'true';
	this.START_INDEX = '';
	this.STRICT = '';
	this.V = '2'; //API version
}

var Loader = function () { };
Loader.prototype = {
    require: function (scripts, callback) {
        this.loadCount      = 0;
        this.totalRequired  = scripts.length;
        this.callback       = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function (evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function (src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = src;
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
};

function loadJavascript(url, callback, charset) {
    var head = document.documentElement.firstChild; //getElementsByTagName('head')[0];
    var script= document.createElement('script');
    script.type= 'text/javascript';
    if (charset != null) {
        script.charset = "euc-kr";
    }
    var loaded = false;
    script.onreadystatechange= function () {
//    	console.log('ie');
        if (this.readyState == 'loaded' || this.readyState == 'complete') {
            if (loaded) {
                return;
            }
            loaded = true;
            callback();
        }
    };
    script.onload = function () {
//    	console.log('chrom');
        callback();
    };
    script.src = url;
    head.appendChild(script);
}

function loadScript(url, callback){

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}