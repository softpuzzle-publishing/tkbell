if (jQuery) (function($) {
	var previousEvent;
	$(document).on('click', function (e) {
		previousEvent = e;
	});

	var _STATUS_SUCCESS = 'SUCCESS';
	var _STATUS_FAIL    = 'FAIL';
	var _STATUS_ERROR   = 'ERROR';

	$.fn.validSubmit = function (options) {
		var self = this;
		var fileForm = '';
		$(self).find(':input').filter('[data-fileupload]').each(function(){
			if ($(this).parent().css('display') != 'none') {
				fileForm += '#'+ this.name +', ';
			}
		});

		if (options.action == undefined || options.action == null) {
			options.action = $(self).attr('action');
		}
		if (options.isJsonp == undefined || options.isJsonp == null) {
			options.isJsonp = false;
		}

    	if (options.action.indexOf('?') > -1) 
    		options.action += "&sso=ok";
    	else 
    		options.action += "?sso=ok";
    	
		if (fileForm != '') {
			fileForm = fileForm.substring(0, fileForm.length - 2);
			$(fileForm).fileUploadStart(function () {
				validSubmit();
			});
		}
		else {
			validSubmit();
		}

		function validSubmit() {
			$.ajax({
				type     : 'post',
				url      : options.action,
				data     : $(self).serialize(),
				dataType : options.isJsonp == true ? 'jsonp' : 'json',
				success  : function (response, status) {
		            if (response.status == 'FAIL') {
		            	var messages = '';
			            $.each(response.result, function(index, row){
			            	messages += row.message +'\n';
			            });
			            alert(messages);
			            return false;
		            }
		            options.success.call('data', response.value);
				},
				error : function (jqXHR) {
					var result = {};
					if (jqXHR.status == 200) {
						return;
					}
					if (jqXHR.status == 401) {
						result.status  = _STATUS_ERROR;
						result.data	= '[' + jqXHR.status + '] - 로그인 후 이용해 주세요.';
					}
					else {
						result.status  = _STATUS_ERROR;
						result.data = 'Network Error ! '+ jqXHR.status;
					}

		        	alert(result.data);
					try {
			            options.error.call(this);
					} catch (ex) {

					}
				}
			});
		}
	},

	/**
	 * jquery 1.9이상 버전에서만 사용 됨.
	 * async : false 가 deprecate 됨.
	 *
	 */
	$.getAjax = function(options) {
    	if (options.commandUrl.indexOf('?') > -1) 
    		options.commandUrl += "&sso=ok";
    	else 
    		options.commandUrl += "?sso=ok";
    			
		var result = {};
		$.ajax({
			type     : 'post',
			url      : options.commandUrl,
			data     : options.commandData,
			dataType : options.commandJsonp == true ? 'jsonp' : 'json',
			success  : function (response, status) {
				options.onSuccess.call('data', response);
			},
			error : function (jqXHR) {
				if (jqXHR.status == 200) {
					return;
				}
				if (jqXHR.status == 401) {
					result.status  = _STATUS_ERROR;
					result.data	= '[' + jqXHR.status + '] - 로그인 후 이용해 주세요.';
				}
				else {
					result.status  = _STATUS_ERROR;
					result.data = 'Network Error ! '+ jqXHR.status;
				}

				try {
					options.onError.call('data', result);
				} catch (ex) {
				}
			}
		});
	};

	/** 업로더 초기화 **/
	$.fn.fileUploadReset = function () {
		$('#'+ this.id).remove();
	};

	$.fn.fileUploadComplete = function (uploader, jsonData) {
		var json = '{"repositoryId" : "' +  uploader.settings.multipart_params.repositoryId + '" ,';
		json += ' "attachId" : "' +  uploader.settings.multipart_params.attachId + '" ,';
		json += ' "classSequence" : "' +  uploader.settings.multipart_params.classSequence + '" ,';
		json += ' "fileSubPath" : "' +  uploader.settings.multipart_params.fileSubPath + '" ,';
		json += '"inputData":[##JSON##]}';

		//setter json data to input form
		jsonData = jsonData.substring(0, jsonData.length - 1);
		jsonData = json.replace('##JSON##', jsonData);
		
		if (jsonData != null && jsonData != '') { 
			$('input[name='+ $(this).attr('id') +']').val(jsonData);
		}
	};

	$.fn.fileUploadStart = function (returnFunction) {
		var uploadFormTotal = $(this).length;
		var self = this[0];
    	if (uploadFormTotal == 0) {
			if (typeof(returnFunction) == "function") {
	    		returnFunction.call(this);
				returnFunction = null;
			}
    		return;
    	}

    	$(self).bind("uploadCompleteAll", function(ss) {
    		if (uploadFormTotal <= 0) {
    			if (typeof(returnFunction) == "function") {
    	    		returnFunction.call(this);
    				returnFunction = null;
    			}
    		}
    	});

    	$(this).each(function() {
    		var subSelf = $(this);
    		var uploader = $(this).pluploadQueue();
    		if (uploader == undefined) { 
    			uploader = $(this).plupload();
    		}
			try {
	    		uploader.start();
	    		if (uploader.total.queued > 0) {
					var jsonData = "";
					uploader.bind('FileUploaded', function(up, file, response) {
						jsonData += response.response +',';
					});

					uploader.bind('UploadProgress', function(up, file) {
						$('.loading span').html('Uploading... '+ (file.percent / uploadFormTotal) +'%');
					});

					uploader.bind('UploadComplete', function(up, files) {
	    	    		uploadFormTotal--;
	    	    		$(subSelf).fileUploadComplete(up, jsonData);		//setter json data
						$(self).trigger("uploadCompleteAll", this);
					});
				}
				else {
    	    		uploadFormTotal--;
					$(self).trigger("uploadCompleteAll", this);
				}
			}
			catch (ex) {
				alert("업로드 오류로 인하여 파일 업로드가 취소 되었습니다.\n확인을 누르시면 데이터만 저장 합니다.\n\n오류 : " + ex);
				if (typeof(returnFunction) == "function") {
					returnFunction.call(this);
					returnFunction = null;
				}
			}
    	});
	};

	/*
	 * 숫자만 입력하게
	 * $('#telNo').numberOnly();
	 */
	$.fn.numberOnly = function () {
		$(this).keyup(function () {
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});
		$(this).blur(function () {
			this.value = this.value.replace(/[^0-9\.]/g,'');
		});
	};

	/*
	 * 전화번호 하이픈 자동 입력.
	 * $('#telNo').phoneFormat();
	 */
	$.fn.phoneFormat = function () {
		$(this).on('input', function (event) {
		    this.value = this.value.replace(/[^0-9]/g, '');
		});

		$(this).blur(function () {
			var str = this.value.replace(/[^0-9]/g, '');
			if (str.indexOf('02') == 0) {
				if (str.length < 10) {
					this.value = str.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
				}
				else {
					this.value = str.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
				}
			}
			else {
				if (str.length < 11) {
					this.value = str.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
				}
				else {
					this.value = str.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
				}
			}
		});
	};

	$.telephoneCheck = function (name, input1, input2, input3) {
		var tel1 = input1.val();
		var tel2 = input2.val();
		var tel3 = input3.val();

		if(tel1 == '' && (tel2.length>0 || tel3.length>0)){
	        alert(name + "번호를 확인해 주세요");
	        input1.focus();
	        return false;
	    }
	    else if(tel1 != '' && tel2.length >= 0 && tel3.length < 3){
	        alert(name + "번호를 확인해 주세요");
	        input2.focus();
	        return false;
	    }
	    else if(tel1 != '' && tel2.length >= 0 && tel3.length < 4){
	        alert(name + "번호를 확인해 주세요");
	        input3.focus();
	        return false;
	    }
	};
	/*
	 * 전체선택/해제.
	 * $('#telNo').checkboxAll(childCheckboxName);
	 */
	$.fn.checkboxAll = function (childCheckboxName) {
		var allCheckbodId = this;
		var childCheckbox = 'input[name=' + childCheckboxName + ']';

		$(allCheckbodId).on('click', function () {
			if ($(allCheckbodId).prop('checked')) {
				$(childCheckbox).prop('checked', true);
			} else {
				$(childCheckbox).removeAttr('checked');
			}
			$(childCheckbox).trigger('change');
		});
		$(childCheckbox).on('click', function() {
			if ($(childCheckbox + ':not(:checked)').length > 0) {
				$(allCheckbodId).removeAttr('checked');
			} else {
				$(allCheckbodId).prop('checked', true);
			}
			$(allCheckbodId).trigger('change');
		});
	};

	$.fn.layerPop = function () {
    	$('div[class^=layerPop]').hide();

    	var self = this;
		$(this).show();
		$(this).center();

		$(this).find('.close').click(function() {
			$(self).layerPopClose();
		});

		$(this).find('.pop-close').click(function() {
			$(self).layerPopClose();
		});

		$(document).keyup(function (e) {
			if (e.keyCode == 27 ) {
				$(self).layerPopClose();
			}
		});
    };

	$.fn.layerPopClose = function () {
		$(this).find('form').each(function() {
			this.reset();
		});
		$(this).hide();
	};
	
	$.fn.email = function () {
		$(this).blur(function () {
			if (this.value != '') { 
	         	var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	        	if(!email_regex.test(this.value)){
	        		alert('올바른 이메일 형식이 아닙니다. 다시 확인하시고 입력해주세요.');
	        		this.select();
	        		this.focus();
	        		return false; 
	        	}
			}
		});
	};
	
	$.fn.editor = function () {
	    //load text editor
		tinymce.init({
	        selector: "#"+ $(this).attr('id'),
	        plugins: [
	                "autoresize advlist autolink link lists print code nonbreaking table textcolor paste textcolor colorpicker textpattern"
	        ],
	        toolbar1: "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist | fontselect fontsizeselect | forecolor backcolor | table | subscript superscript | charmap | print code",
	        menubar: false,
	        statusbar: false,
	        toolbar_items_size: 'small',
	        setup: function (editor) {
	            editor.on('change', function () {
	                tinymce.triggerSave();
	            });
	        }
	    });
	};

})(jQuery);

