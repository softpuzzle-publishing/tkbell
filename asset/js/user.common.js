
function addNewClass(){
    promptC({
        title:'클래스 가입',
        msg:'클래스 코드를 입력하세요.',
        callBackPositive:{
            method : guideJoinClass,
            msg:'등록'
        },
        callBackOther : {
            msg : '취소'
        }
    });
}

function guideJoinClass(code){
	// 앞, 뒤 공백제거
	var code = code.replace(/(^\s*)|(\s*$)/g, "");
	if(code == '') {
		alertC('클래스 코드를 입력해주세요.');
		return false;
	}

    $('#addClassForm #classJoinCode').val(code);
    $('#addClassForm').attr('action', BASE_ROOT + '/user/mainUserCheckClassJoinCode.do');
    $('#addClassForm').validSubmit({
        success  : function (data) {
            if($.isEmptyObject(data)) {
                alertC({
                    title : '클래스 가입 실패',
                    msg : '해당 클래스를 찾을 수 없습니다.<br />코드를 확인해 주세요.'
                })
            }
            else if(code == data.classJoinCode) {
                if(data.alreadyJoin == 'Y') {
                    alertC({
                        title : '클래스 가입 실패',
                        msg : '이미 가입된 클래스 입니다.'
                    })
                }
                else if(data.memberDivision == '1') {
                	// 선생님은 클래스 가입 불가
                	alertC({
                        title : '클래스 가입 실패',
                        msg : '학부모 계정으로 이용 가능합니다.'
                    })
                }
                else if(data.memberDivision != '2') {
                	// 부모회원의 경우 추가입력을 받는다.
                    promptC({
                        title:'클래스 추가',
                        msg: data.classSchoolName+ ' ' + data.classSchoolYear+'학년 '+ data.classSchoolClass + data.classSchoolClass2 + ' 클래스에<br />소속된 자녀 이름을 입력해주세요.',
                        callBackPositive:{
                            method : function(classChildName) {
                                $('#addClassForm #classChildName').val(classChildName);
                                insertClassMember();
                            },
                            msg:'등록'
                        },
                        callBackOther : {
                            msg : '취소'
                        }
                    });
                }
                else {
                    confirmC({
                        title: '클래스 가입안내',
                        msg: '"' + data.classSchoolYear+'학년 '+ data.classSchoolClass + data.classSchoolClass2 + '"에<br />가입하시겠습니까?'
                            + '<div class="classThumb"><img src="' + data.classImageUrl + '" alt="클래스 대표 이미지"></div>'
                            + '<strong>'+ data.classSchoolName + '</strong>'
                            + '<span>' + data.teacherName + '선생님 </span>',
                            callBackPositive:{
                                method : insertClassMember,
                                msg:'예'
                            },
                            callBackOther: {msg: '아니오'}
                    });
                    $('.alert .classThumb img').each(function () {
                        thumbCheckPortrait($(this));
                        $(this).on('load', function () {
                            thumbCheckPortrait($(this));
                        });
                    });
                }
            }
        }
    });
}

function insertClassMember() {
	$('.alert.con.btnCon').hide();
    $('#addClassForm').attr('action', BASE_ROOT + '/user/flip/FlipClassMemberUserInsert.do');
    $('#addClassForm').validSubmit({
        success  : function (data) {
            alertC('클래스 가입 성공');
            $('#addClassForm').attr('action', BASE_ROOT + '/user/main.do').submit();
        }
    });
}

function fnCmdLeave(classSequence, classInfo) {
    $('#addClassForm #classSequence').val(classSequence);
    confirmC({
    	title : '클래스 탈퇴',
        msg   : classInfo + '<br />클래스에서 탈퇴 하시겠습니까?',
        callBackPositive : {
            msg : '확인',
            method: function () {
                $('#addClassForm').attr('action',  BASE_ROOT + '/user/flip/FlipClassMemberUserDelete.do');
                $('#addClassForm').validSubmit({
                    success  : function (data) {
                    	alertC('클래스에서 탈퇴하였습니다');
                        $('#addClassForm').attr('action', BASE_ROOT + '/user/main.do').submit();
                    }
                });
            }
        }
    });
}

function fnCmdAlarmMenu() {
	$('#alarmCnt').attr('data-new', '0');

    $('#addClassForm').validSubmit({
        action : BASE_ROOT + '/user/alarm/ScAlarmUserReadUpdate.do'
    });
}

function fnCmdMoveLink(target, classSequence, albumSequence, memberId) {
    if (target.indexOf('FLIP') > -1) {
        top.location.href = BASE_ROOT + '/user/flip/'+ classSequence +'?#'+ albumSequence;
    }
    else if (target.indexOf('EPF') > -1) {
        top.location.href =  BASE_ROOT + '/user/eportfolio/'+ memberId +'?#'+ albumSequence;
    }
    else if (target.indexOf('MEM') > -1) {
        top.location.href =  BASE_ROOT + '/user/flip/Member.do';
    }    
    else if (target.indexOf('CON') > -1) {
        top.location.href = BASE_ROOT + '/user/flip/'+ classSequence +'/contents?#'+ albumSequence;
    }    
    else if (target.indexOf('SENOTE') > -1) {
        top.location.href = BASE_ROOT + '/user/flip/'+ classSequence +'/senote?#'+ albumSequence;
    }    
}
