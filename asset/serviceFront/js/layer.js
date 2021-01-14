/**********************************************/
/**											 **/
/**                StringBuffer              **/
/**											 **/
/**********************************************/
var StringBuffer = Class.create();
StringBuffer.prototype = {
	buffer : null,
	initialize : function(){
		this.buffer = new Array();
	},
	append : function(obj){
		this.buffer.push(obj);
	},
	toString : function(){
		return this.buffer.join("");
	}
}

// 동영상 업로드 진행 상태 layer
var step_2 = new StringBuffer();	
	step_2.append("<table width='400' height='202' border='0' cellpadding='0' cellspacing='0' background='http://imgcdn.pandora.tv/pan_img/upload/upload_bg.gif'>");
	step_2.append("  <tr>");
	step_2.append("    <td valign='top'>");
	step_2.append("      <table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	step_2.append("        <tr>");
	step_2.append("          <td height='33' align='right' style='padding:0px 10px 0px 0px;'><img src='http://imgcdn.pandora.tv/pan_img/upload/x.gif' width='11' height='11' border='0' id='closePop2' style='cursor:pointer' /></td>");
	step_2.append("        </tr>");
	step_2.append("        <tr>");
	step_2.append("          <td height='38' align='center' style='color:#000000';><strong><font color='#FF0000'>동영상 업로드</font>중입니다</strong></td>");
	step_2.append("        </tr>");
	step_2.append("        <tr>");
	step_2.append("          <td height='86' style='padding:0px 15px 0px 15px;'>");
	step_2.append("            <table width='100%' height='86' border='0' cellpadding='15' cellspacing='1' bgcolor='cfcfcf'>");
	step_2.append("              <tr>");
	step_2.append("                <td align='center' bgcolor='ececec' style='color:#000000; line-height:140%;'>");
	step_2.append("                  <table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	step_2.append("                    <tr>");
	step_2.append("                      <td align='left' bgcolor='#959595'><div style=\"background:url('http://imgcdn.pandora.tv/pan_img/upload/blue_bg.gif'); width:1%\" height='16' id='progBar'></div></td>");
	step_2.append("                      <td width='45' align='right' style='font-size:11px; color:#001ea5; font-weight:bold;' id='progNum' align='center'>0%</td>");
	step_2.append("                    </tr>");
	step_2.append("                </table>");
	step_2.append("<table width='100%'  border='0' cellspacing='0' cellpadding='0' style='margin-top:5px'>");
	step_2.append("                    <tr>");
	step_2.append("                      <td><span style='font-size:11px; letter-spacing:-0.1em'><font color='#333333'>#{title}</font></span></td>");
	step_2.append("                    </tr>");
	step_2.append("                  </table>	");
	step_2.append("			  </td>");
	step_2.append("              </tr>");
	step_2.append("          </table></td>");
	step_2.append("        </tr>");
	step_2.append("        <tr>");
	step_2.append("          <td align='center' style=' padding:10px;'>&nbsp;</td>");
	step_2.append("        </tr>");
	step_2.append("    </table></td>");
	step_2.append("  </tr>");
	step_2.append("</table>");



// 네트워크 이상 에러 화면 구성 Layer
var error_1 = new StringBuffer();	
	error_1.append("<table width='400' height='202' border='0' cellpadding='0' cellspacing='0' background='http://imgcdn.pandora.tv/pan_img/upload/upload_bg.gif'>");
	error_1.append("  <tr>");
	error_1.append("    <td valign='top'>");
	error_1.append("      <table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	error_1.append("        <tr>");
	error_1.append("          <td height='33' align='right' style='padding:0px 10px 0px 0px;'><img src='http://imgcdn.pandora.tv/pan_img/upload/x.gif' width='11' height='11' border='0' id='closePop2' style='cursor:pointer' /></td>");
	error_1.append("        </tr>");
	error_1.append("        <tr>");
	error_1.append("          <td height='32' align='center' style='color:#000000'>&nbsp;</td>");
	error_1.append("        </tr>");
	error_1.append("        <tr>");
	error_1.append("          <td height='86' style='padding:0px 15px 0px 15px;'>");
	error_1.append("            <table width='100%' height='86' border='0' cellpadding='0' cellspacing='1' bgcolor='cfcfcf'>");
	error_1.append("              <tr>");
	error_1.append("                <td align='center' bgcolor='#ececec' style='color:#000000; line-height:140%;'> 네트워크 이상으로 <font color='#FF0000'><strong>동영상 업로드가 실패</strong></font>하였습니다. <br /> 창을 닫고, 다시 시도해 주십시오.<br />");
	error_1.append("<span style='font-size:11px;'>같은 문제가 계속 발생시 <strong><a href='http://info.pandora.tv/' target='_blank'><u><font color='#000000'>고객만족센터</font></u></a></strong> 로 연락 바랍니다 .</span></td>");
	error_1.append("              </tr>");
	error_1.append("          </table></td>");
	error_1.append("        </tr>");
	error_1.append("        <tr>");
	error_1.append("          <td align='center' style=' padding:10px;'>");
	error_1.append("            <input type='submit' name='closePop2' value='닫기' id='closePop2' />");
	error_1.append("          </td>");
	error_1.append("        </tr>");
	error_1.append("    </table></td>");
	error_1.append("  </tr>");
	error_1.append("</table>");

