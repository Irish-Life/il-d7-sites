<%@ Page Language="vb" AutoEventWireup="false" Inherits="login" CodeFile="login.aspx.vb" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    <title>login</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
    <meta name="vs_defaultClientScript" content="JavaScript">
    <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
    <meta http-equiv="Pragma" content="no-cache">
    <link rel="stylesheet" href="csslib/global.css" type="text/css">

    <script language="JavaScript" src="java/jfunct.js"></script>

    <script language="javascript">
		function setFocus() {
			self.focus();
			if((typeof(document.LoginRequestForm)).toLowerCase() != "undefined") {
				if((typeof(document.LoginRequestForm.username)) != "undefined") {
					document.LoginRequestForm.username.focus();
				}
			}
		}
    </script>

</head>
<body class="Login" onload="setFocus();">
    <form id="LoginRequestForm" method="post" runat="server">
        <asp:Panel ID="LoginErrorPanel" runat="server" Visible="False">
            <table width="100%">
                <tr>
                    <td class="important" id="ErrorText" align="center" runat="server">
                    </td>
                </tr>
            </table>
        </asp:Panel>
        <asp:Panel ID="LoginRequestPanel" runat="server" Visible="False">
            <table width="100%">
                <tr>
                    <td id="loginlbl" align="center" colspan="2" runat="server">
                    </td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td id="usernamelbl" align="right" runat="server">
                    </td>
                    <td width="90%" align="left">
                        <input style="width: 100%" type="text" name="username"></td>
                </tr>
                <tr>
                    <td id="passwordlbl" align="right" runat="server">
                    </td>
                    <td width="90%" align="left">
                        <input style="width: 100%" type="password" name="pwd"></td>
                </tr>
                <tr id="TR_domain" runat="server">
                    <td id="domainlbl" align="right" runat="server">
                    </td>
                    <td width="90%" align="left">
                        <asp:DropDownList ID="domainname" runat="server" Width="100%">
                        </asp:DropDownList></td>
                </tr>
                <tr>
                    <td width="90%" align="center" colspan="2">
                        <input id="LoginBtn" title="Click here to log in" type="image" src="btn_login_big.gif"
                            value="Login" name="" runat="server">
                    </td>
                </tr>
            </table>
        </asp:Panel>
        <asp:Panel ID="LogoutPanel" runat="server" Visible="False">
            <table width="100%" align="center">
                <tr>
                    <td id="logoutmsg" align="center" runat="server">
                    </td>
                </tr>
                <tr>
                    <td valign="middle" align="center">
                        <asp:ImageButton OnClick="LogoutBtn_Click" PostBackUrl="login.aspx?action=logout&i=19069" ID="LogoutBtn" runat="server" ImageUrl="images/english/btn_logout_big.gif" />
                    </td>
                </tr>
            </table>
        </asp:Panel>
        <asp:Panel ID="LoginSuceededPanel" runat="server" Visible="False">
            <script type="text/javascript" language="javascript">
				    //debugger;
					var test = "<%=Session("RedirectLnk")%>"
					var frmRedirectLnk = "<%=Session("fromLnkPg")%>"
					if (test.length == 0) {
						PopUpWindow("close.aspx?logout=true","Admin400",1,1,0,0);
						self.close;
					}
					var szTmp = typeof(top.opener);
					szTmp = szTmp.toLowerCase();
					if (szTmp != "undefined") {
						if (!top.opener.closed && top.opener.location)
						{
						<%							
						if (len(m_template) > 0) then
						%>
							top.opener.location.href="<%=(m_refUserApi.SitePath & m_template)%>";
						<% 
						else
						%>
						    var UseSSL = "<%=m_refUserApi.UseSsl %>";
						    var PleaseRefresh = "<%=m_PleaseLoginMsg %>";
						    if( UseSSL == "False" ) {	
						        //20854 - don't refresh the opener instead redirect. The refresh will post the data back on the server.					   
						        top.opener.location.href = (top.opener.location.href).replace(top.opener.location.hash,"");
						    }
						    else {
						        try {
						            top.opener.location.href = (top.opener.location.href).replace(top.opener.location.hash,"");
						            //top.opener.location.reload();
						        }
						        catch( exp ) {
						            alert(PleaseRefresh);
						        }
						    }
						<%
						end if
						%>
						}
					}
					if ((test.length == 0) || (frmRedirectLnk == "0")) {
							self.close();
					}					
            </script>
        </asp:Panel>
        <asp:Literal ID="autologin" runat="server"></asp:Literal>
        <asp:Literal ID="WorkareaCloserJS" runat="server"></asp:Literal>
    </form>
</body>
</html>
