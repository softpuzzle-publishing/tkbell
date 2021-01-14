/**
 * jquery.plupload.queue.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/* global jQuery:true, alert:true */

/**
 jQuery based implementation of the Plupload API - multi-runtime file uploading API.

 To use the widget you must include _jQuery_. It is not meant to be extended in any way and is provided to be
 used as it is.

 @example
 <!-- Instantiating: -->
 <div id="uploader">
 <p>Your browser doesn't have Flash, Silverlight or HTML5 support.</p>
 </div>

 <script>
 $('#uploader').pluploadQueue({
			url : '../upload.php',
			filters : [
				{title : "Image files", extensions : "jpg,gif,png"}
			],
			rename: true,
			flash_swf_url : '../../js/Moxie.swf',
			silverlight_xap_url : '../../js/Moxie.xap',
		});
 </script>

 @example
 // Retrieving a reference to plupload.Uploader object
 var uploader = $('#uploader').pluploadQueue();

 uploader.bind('FilesAdded', function() {
		
		// Autostart
		setTimeout(uploader.start, 1); // "detach" from the main thread
	});

 @class pluploadQueue
 @constructor
 @param {Object} settings For detailed information about each option check documentation.
 @param {String} settings.url URL of the server-side upload handler.
 @param {Number|String} [settings.chunk_size=0] Chunk size in bytes to slice the file into. Shorcuts with b, kb, mb, gb, tb suffixes also supported. `e.g. 204800 or "204800b" or "200kb"`. By default - disabled.
 @param {String} [settings.file_data_name="file"] Name for the file field in Multipart formated message.
 @param {Array} [settings.filters=[]] Set of file type filters, each one defined by hash of title and extensions. `e.g. {title : "Image files", extensions : "jpg,jpeg,gif,png"}`. Dispatches `plupload.FILE_EXTENSION_ERROR`
 @param {String} [settings.flash_swf_url] URL of the Flash swf.
 @param {Object} [settings.headers] Custom headers to send with the upload. Hash of name/value pairs.
 @param {Number|String} [settings.max_file_size] Maximum file size that the user can pick, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. `e.g. "10mb" or "1gb"`. By default - not set. Dispatches `plupload.FILE_SIZE_ERROR`.
 @param {Number} [settings.max_retries=0] How many times to retry the chunk or file, before triggering Error event.
 @param {Boolean} [settings.multipart=true] Whether to send file and additional parameters as Multipart formated message.
 @param {Object} [settings.multipart_params] Hash of key/value pairs to send with every file upload.
 @param {Boolean} [settings.multi_selection=true] Enable ability to select multiple files at once in file dialog.
 @param {Boolean} [settings.prevent_duplicates=false] Do not let duplicates into the queue. Dispatches `plupload.FILE_DUPLICATE_ERROR`.
 @param {String|Object} [settings.required_features] Either comma-separated list or hash of required features that chosen runtime should absolutely possess.
 @param {Object} [settings.resize] Enable resizng of images on client-side. Applies to `image/jpeg` and `image/png` only. `e.g. {width : 200, height : 200, quality : 90, crop: true}`
 @param {Number} [settings.resize.width] If image is bigger, it will be resized.
 @param {Number} [settings.resize.height] If image is bigger, it will be resized.
 @param {Number} [settings.resize.quality=90] Compression quality for jpegs (1-100).
 @param {Boolean} [settings.resize.crop=false] Whether to crop images to exact dimensions. By default they will be resized proportionally.
 @param {String} [settings.runtimes="html5,flash,silverlight,html4"] Comma separated list of runtimes, that Plupload will try in turn, moving to the next if previous fails.
 @param {String} [settings.silverlight_xap_url] URL of the Silverlight xap.
 @param {Boolean} [settings.unique_names=false] If true will generate unique filenames for uploaded files.

 @param {Boolean} [settings.dragdrop=true] Enable ability to add file to the queue by drag'n'dropping them from the desktop.
 @param {Boolean} [settings.rename=false] Enable ability to rename files in the queue.
 @param {Boolean} [settings.multiple_queues=true] Re-activate the widget after each upload procedure.
 */
;(function($, o) {
	var uploaders = {};

	function _(str) {
		return plupload.translate(str) || str;
	}

	function renderUI(id, target, uploadType, maxCnt) {
		// Remove all existing non plupload items
		target.contents().each(function(i, node) {
			node = $(node);

			if (!node.is('.plupload')) {
				node.remove();
			}
		});

		var filetypeStr,wording;
		if(uploadType == 'thumb'){
			target.prepend(
				'<input type="hidden" id="' + id + '_count" name="' + id + '_count" value="0" />'+
				'<span id="' + id + '_filelist" class="'+uploadType+'List uploadFileList"></span>'+
				'<a href="#none" class="plupload_button plupload_add" id="' + id + '_browse">' + _('이미지 찾기') + '</a>' +
				'<a href="#" class="plupload_button plupload_start">' + _('Start Upload') + '</a>'
			);
			return;
		}
		switch(uploadType){
			case 'img':
				filetypeStr = '이미지';
				wording='를';
				break;
			case 'mov':
				filetypeStr = '동영상';
				wording='을';
				break;
			default:
				filetypeStr = '파일';
				wording='을';
				break;
		}
		target.prepend(
			'<input type="hidden" id="' + id + '_count" name="' + id + '_count" value="0" />'+
			'<div class="plupload_file_count"><strong>' + filetypeStr + '</strong><em>0</em>/<span>'+ maxCnt +'</span></div>' +
			'<a href="#none" class="plupload_button plupload_add" id="' + id + '_browse">' + filetypeStr +_(' 첨부') + '</a>' +
			'<ul id="' + id + '_filelist" class="'+uploadType+'List uploadFileList"></ul>'+
			'<div class="guide">이 영역에 첨부할 '+ filetypeStr + wording +' <strong>마우스로 끌어다</strong> 놓아주세요. <br>상단의 첨부버튼을 통해서도 가능합니다</div>' +

			'<a href="#" class="plupload_button plupload_start">' + _('Start Upload') + '</a>'
			/* +
			 '<div class="plupload_progress">' +
			 '<div class="plupload_progress_container">' +
			 '<div class="plupload_progress_bar"></div>' +
			 '</div>' +
			 '</div>'*/

			/*'<div class="plupload_wrapper plupload_scroll">' +
			 '<div id="' + id + '_container" class="plupload_container">' +
			 '<div class="plupload">' +
			 '<div class="plupload_header">' +
			 '<div class="plupload_header_content">' +
			 '<div class="plupload_header_title">' + _('Select files') + '</div>' +
			 '<div class="plupload_header_text">' + _('Add files to the upload queue and click the start button.') + '</div>' +
			 '</div>' +
			 '</div>' +

			 '<div class="plupload_content">' +
			 '<div class="plupload_filelist_header">' +
			 '<div class="plupload_file_name">' + _('Filename') + '</div>' +
			 '<div class="plupload_file_action">&nbsp;</div>' +
			 '<div class="plupload_file_status"><span>' + _('Status') + '</span></div>' +
			 '<div class="plupload_file_size">' + _('Size') + '</div>' +
			 '<div class="plupload_clearer">&nbsp;</div>' +
			 '</div>' +

			 '<ul id="' + id + '_filelist" class="plupload_filelist"></ul>' +

			 '<div class="plupload_filelist_footer">' +
			 '<div class="plupload_file_name">' +
			 '<div class="plupload_buttons">' +
			 '<a href="#" class="plupload_button plupload_add" id="' + id + '_browse">' + _('Add Files') + '</a>' +
			 '<a href="#" class="plupload_button plupload_start">' + _('Start Upload') + '</a>' +
			 '</div>' +
			 '<span class="plupload_upload_status"></span>' +
			 '</div>' +
			 '<div class="plupload_file_action"></div>' +
			 '<div class="plupload_file_status"><span class="plupload_total_status">0%</span></div>' +
			 '<div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div>' +
			 '<div class="plupload_progress">' +
			 '<div class="plupload_progress_container">' +
			 '<div class="plupload_progress_bar"></div>' +
			 '</div>' +
			 '</div>' +
			 '<div class="plupload_clearer">&nbsp;</div>' +
			 '</div>' +
			 '</div>' +
			 '</div>' +
			 '</div>' +
			 '<input type="hidden" id="' + id + '_count" name="' + id + '_count" value="0" />' +
			 '</div>'*/
		);
	}

	$.fn.pluploadQueue = function(settings) {
		if (settings) {
			this.each(function() {
				var uploader, target, id, contents_bak;

				target = $(this);
				id = target.attr('id');

				if (!id) {
					id = plupload.guid();
					target.attr('id', id);
				}

				contents_bak = target.html();
				renderUI(id, target, settings.uploadType, settings.max_file_count);

				settings = $.extend({
					dragdrop : true,
					browse_button : id + '_browse',
					container : id
				}, settings);

				// Enable drag/drop (see PostInit handler as well)
				if (settings.dragdrop) {
					settings.drop_element = id ;//+ '_filelist';
				}

				uploader = new plupload.Uploader(settings);

				uploaders[id] = uploader;

				function handleStatus(file) {
					var actionClass;

					if (file.status == plupload.DONE) {
						actionClass = 'plupload_done';
					}

					if (file.status == plupload.FAILED) {
						actionClass = 'plupload_failed';
					}

					if (file.status == plupload.QUEUED) {
						actionClass = 'plupload_delete';
					}

					if (file.status == plupload.UPLOADING) {
						actionClass = 'plupload_uploading';
					}

					var icon = $('#' + file.id).attr('class', actionClass).find('a').css('display', 'block');
					if (file.hint) {
						icon.attr('title', file.hint);
					}
				}

				function updateTotalProgress() {
					var tit;
					switch(uploader.settings.uploadType) {
						case 'thumb':
						case 'img' :
							tit = '이미지';
							break;
						case 'mov' :
							tit = '동영상';
							break;
						default :
							tit= '파일';
							break;
					}
					if($('.uploadStateDiv').length < 1){
						var uploadStateDiv = document.createElement('div');
						uploadStateDiv.className = 'uploadStateDiv';
						$(document.body).append($('<div class="dimmed" id="uploadDimmed"></div>')).append($(uploadStateDiv));
						var progressHTML = '<cite>' + tit + ' 첨부하기</cite>'+
							'<span class="cnt"><em>' + uploader.total.uploaded + '</em> / ' + uploader.files.length + '</span>'+
							'<span class="per total">'+ uploader.total.percent + '%</span>'+
							'<div class="progress total"><div class="progressBar"></div></div>'+
							'<span class="upfileNm"></span>'+
							'<span class="per individual">%</span>'+
							'<div class="progress individual"><div class="progressBar"></div></div>';
						uploadStateDiv.innerHTML = progressHTML;
					}
					$('.uploadStateDiv .progress.total .progressBar').css({width:uploader.total.percent + '%'});
					$('.uploadStateDiv .per.total').html(uploader.total.percent+'%');
					$('.uploadStateDiv .cnt em').html(uploader.total.uploaded);

					$('.uploadStateDiv .progress.individual .progressBar').css({width:uploader.files[uploader.total.uploaded].percent + '%'});
					$('.uploadStateDiv .per.individual').html(uploader.files[uploader.total.uploaded].percent+'%');
					$('.uploadStateDiv .upfileNm').html(uploader.files[uploader.total.uploaded].name);
				}

				function updateList() {
					var fileList = $('.uploadFileList', target).html(''), inputCount = 0, inputHTML;

					$.each(uploader.files, function(i, file) {
						inputHTML = '';

						if (file.status == plupload.DONE) {
							if (file.target_name) {
								inputHTML += '<input type="hidden" name="' + id + '_' + inputCount + '_tmpname" value="' + plupload.xmlEncode(file.target_name) + '" />';
							}

							inputHTML += '<input type="hidden" name="' + id + '_' + inputCount + '_name" value="' + plupload.xmlEncode(file.name) + '" />';
							inputHTML += '<input type="hidden" name="' + id + '_' + inputCount + '_status" value="' + (file.status == plupload.DONE ? 'done' : 'failed') + '" />';

							inputCount++;

							$('#' + id + '_count').val(inputCount);
						}
						//console.log(uploader.settings.uploadType);
						var html='';
						switch(uploader.settings.uploadType) {
							case 'thumb':
								html = '<div id="' + file.id + '">' +
									'<span class="plupload_file_action"><a href="#none" title="remove">remove</a></span>'+
									inputHTML +
									'</div>';
								var thumb = new o.Image();
								thumb.onload = function() {
									this.embed(file.id , {
										width: 60,
										height: 72,
										crop: true
									});
								};
								thumb.load(file.getSource());
								break;
							case 'mov':
								html = '<li id="' + file.id + '">' +
									'<cite class="plupload_file_name">' + file.name + '</cite>' +
									'<video width="" src="" controls></video>'+
									'<span class="plupload_file_action"><a href="#none" title="remove">remove</a></span>'+
									inputHTML +
									'</li>'
								break;
							case 'img':
								html = '<li id="' + file.id + '">' +
									'<cite class="plupload_file_name">' + file.name + '</cite>' +
									'<span class="plupload_file_action"><a href="#none" title="remove">remove</a></span>'+
									inputHTML +
									'</li>'
								var img = new o.Image();
								img.onload = function() {
									this.embed(file.id , {
										width: 98,
										height: 98,
										crop: true
									});
								};
								img.load(file.getSource());
								break;
							default:
								html = '<li id="' + file.id + '">' +
									'<cite class="plupload_file_name '+ file.name.split('.').pop() +'" data-file-type="'+ file.name.split('.').pop() +'">' + file.name + '</cite>' +
									'<span class="plupload_file_size">' + plupload.formatSize(file.size) + '</span>' +
									'<span class="plupload_file_action"><a href="#none" title="remove">remove</a></span>'+
									inputHTML +
									'</li>'
								break;
						}
						fileList.append(html);

						handleStatus(file);

						$('#' + file.id + '.plupload_delete a').click(function(e) {
							$('#' + file.id).remove();
							uploader.removeFile(file);

							e.preventDefault();
						});
					});

					$('span.plupload_total_file_size', target).html(plupload.formatSize(uploader.total.size));

					if (uploader.total.queued === 0) {
						$('span.plupload_add_text', target).html(_('Add Files'));
					} else {
						$('span.plupload_add_text', target).html(o.sprintf(_('%d files queued'), uploader.total.queued));
					}

					$('a.plupload_start', target).toggleClass('plupload_disabled', uploader.files.length == (uploader.total.uploaded + uploader.total.failed));

					// Scroll to end of file list
					//fileList[0].scrollTop = fileList[0].scrollHeight;

					//updateTotalProgress();

					// Re-add drag message if there is no files
					if (!uploader.files.length && uploader.features.dragdrop && uploader.settings.dragdrop) {
						//$('#' + id + '_filelist').append('<li class="plupload_droptext">' + _("Drag files here.") + '</li>');
					}
				}

				function destroy() {
					delete uploaders[id];
					uploader.destroy();
					target.html(contents_bak);
					uploader = target = contents_bak = null;
				}

				uploader.bind("UploadFile", function(up, file) {
					$('#' + file.id).addClass('plupload_current_file');
				});

				uploader.bind('Init', function(up, res) {
					// Enable rename support
					if (!settings.unique_names && settings.rename) {
						target.on('click', '#' + id + '_filelist div.plupload_file_name span', function(e) {
							var targetSpan = $(e.target), file, parts, name, ext = "";

							// Get file name and split out name and extension
							file = up.getFile(targetSpan.parents('li')[0].id);
							name = file.name;
							parts = /^(.+)(\.[^.]+)$/.exec(name);
							if (parts) {
								name = parts[1];
								ext = parts[2];
							}

							// Display input element
							targetSpan.hide().after('<input type="text" />');
							targetSpan.next().val(name).focus().blur(function() {
								targetSpan.show().next().remove();
							}).keydown(function(e) {
								var targetInput = $(this);

								if (e.keyCode == 13) {
									e.preventDefault();

									// Rename file and glue extension back on
									file.name = targetInput.val() + ext;
									targetSpan.html(file.name);
									targetInput.blur();
								}
							});
						});
					}

					$('#' + id + '_container').attr('title', 'Using runtime: ' + res.runtime);

					$('a.plupload_start', target).click(function(e) {
						if (!$(this).hasClass('plupload_disabled')) {
							uploader.start();
						}

						e.preventDefault();
					});

					$('a.plupload_stop', target).click(function(e) {
						e.preventDefault();
						uploader.stop();
					});

					$('a.plupload_start', target).addClass('plupload_disabled');
				});

				uploader.bind("Error", function(up, err) {
					var file = err.file, message;

					if (file) {
						message = err.message;

						if (err.details) {
							message += " (" + err.details + ")";
						}

						if (err.code == plupload.FILE_SIZE_ERROR) {
							alert("업로드 가능 용량을 초과 하였습니다. \n업로드 가능 용량은 " + up.settings.filters.max_file_size +' 입니다.');
						}

						if (err.code == plupload.FILE_EXTENSION_ERROR) {
							if (up.settings.uploadType == 'thumb' || up.settings.uploadType == 'img') {
								//alert("사진 파일만 등록 가능합니다");
							}
							else if (up.settings.uploadType == 'mov') {
								alert("MP4 파일의 동영상만 등록 가능합니다");
							}
							else if (up.settings.uploadType == 'doc') {
								//alert("문서 파일만 등록 가능합니다");
							}
							else { 
								var fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
								plupload.each(up.settings.filters.mime_types , function(filter) {
									if (filter.extensions.indexOf(fileExt) == -1) {
										alert('업로드 불가능한 파일형식 입니다.\n업로드 가능 파일형식은 '+ filter.title +' 입니다.')
									}
								});
							}
						}

						file.hint = message;
						$('#' + file.id).attr('class', 'plupload_failed').find('a').css('display', 'block').attr('title', message);
					}

					if (err.code === plupload.INIT_ERROR) {
						setTimeout(function() {
							destroy();
						}, 1);
					}
					
					return;
				});

				uploader.bind("PostInit", function(up) {
					// features are populated only after input components are fully instantiated
					if (up.settings.dragdrop && up.features.dragdrop) {
						//$('#' + id + '_filelist').append('<li class="plupload_droptext">' + _("Drag files here.") + '</li>');
					}
				});

				uploader.init();

				uploader.bind('StateChanged', function() {
					if (uploader.state === plupload.STARTED) {
						//$('li.plupload_delete a,div.plupload_buttons', target).hide();
						uploader.disableBrowse(true);

						/*$('span.plupload_upload_status,div.plupload_progress,a.plupload_stop', target).css('display', 'block');
						 $('span.plupload_upload_status', target).html('Uploaded ' + uploader.total.uploaded + '/' + uploader.files.length + ' files');

						 if (settings.multiple_queues) {
						 $('span.plupload_total_status,span.plupload_total_file_size', target).show();
						 }*/
					} else {
						if( uploader.state == 1) {
							setTimeout(function(){
								$('.uploadStateDiv').remove();
								$('#uploadDimmed').remove();
							},1000);
							return;
						}
						updateList();
						/*$('a.plupload_stop,div.plupload_progress', target).hide();
						 $('a.plupload_delete', target).css('display', 'block');*/

						if (settings.multiple_queues && uploader.total.uploaded + uploader.total.failed == uploader.files.length) {
							//$(".plupload_buttons,.plupload_upload_status", target).css("display", "inline");
							uploader.disableBrowse(false);

							$(".plupload_start", target).addClass("plupload_disabled");
							//$('span.plupload_total_status,span.plupload_total_file_size', target).hide();
						}
					}
				});

				//uploader.bind('FilesAdded', updateList);
				uploader.bind('FilesAdded', function(up, files) {
					var max_files = Number(up.settings.max_file_count);
					var overMaxFiles = false;
					plupload.each(files, function(file) {
						if (up.files.length > max_files) {
							if (up.settings.uploadType == 'thumb') {
								if (confirm('이미 대표 사진을 선택했습니다.\n사진을 대치 하시겠습니까?')) {
							        $.each(uploader.files, function(i, f) {
							        	if (f != undefined) { 
							        		uploader.removeFile(f);
							        	}
							        });
								}
								else {
									up.removeFile(file);
									return;
								}
							}
							else {
								if (max_files == 1) {  
									if (confirm('이미 파일을 선택하셨습니다.\파일을 대치 하시겠습니까?')) { 
								        $.each(uploader.files, function(i, f) {
								            uploader.removeFile(f);
								        });
									}
								}
								else {  
									overMaxFiles = true;
									up.removeFile(file);
								}
							}
						}
					});
					
					if (overMaxFiles) {
						alert('파일은 최대  ' + max_files + '개 까지 업로드 가능합니다.');
					}
					
					updateList();
					if(up.settings.uploadType == 'thumb'){
						$(target).trigger('click');
					}
					if(up.settings.uploadType == 'mov'){
						var URL = window.URL || window.webkitURL;
						var fileURL = URL.createObjectURL(files[0].getNative());
						$('video', target).get(0).src = fileURL;
					}
					$('.plupload_file_count em', target).html( up.files.length );
				});

				uploader.bind('FilesRemoved', function(up, file) {
					// since the whole file list is redrawn for every change in the queue
					// we need to scroll back to the file removal point to avoid annoying
					// scrolling to the bottom bug (see #926)
					var scrollTop = $('#' + id + '_filelist').scrollTop();
					updateList();
					$('#' + id + '_filelist').scrollTop(scrollTop);
					if(target.hasClass('usersClassThumb')){
						target.prev('input').get(0).checked = false;
					}
					$('.plupload_file_count em', target).html( up.files.length );
				});

				uploader.bind('FileUploaded', function(up, file) {
					handleStatus(file);
				});

				uploader.bind("UploadProgress", function(up, file) {
					// Set file specific progress
					$('#' + file.id + ' div.plupload_file_status', target).html(file.percent + '%');

					handleStatus(file);
					updateTotalProgress();
				});

				// Call setup function
				if (settings.setup) {
					settings.setup(uploader);
				}
			});

			return this;
		} else {
			// Get uploader instance for specified element
			return uploaders[$(this[0]).attr('id')];
		}
	};
})(jQuery, mOxie);
