<%@ Page Language="VB" AutoEventWireup="false" CodeFile="iq.retail.home.aspx.vb" Inherits="home" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<asp:Literal ID="iqHomepageHeaderblock" runat="server"></asp:Literal>
	</head>
<body>
<div id='bodyContainer'>
	
	<!-- This is where the banner goes -->
	<asp:Literal ID="iqHomepageBanner" runat="server"></asp:Literal>
	<asp:Literal ID="iqHomepageProducts" runat="server"></asp:Literal>
	<!-- This is where the main site goes -->
	<asp:Literal ID="iqHomepageBodyContents" runat="server"></asp:Literal>
	
	
	<div id='bodyHeader'>
	<asp:Literal ID="iqMenublock" runat="server"></asp:Literal>
	
		<div id='menuPopupContainer'>
		<asp:Literal ID="iqMenublockAdvice" runat="server"></asp:Literal>
		<asp:Literal ID="iqMenublockProducts" runat="server"></asp:Literal>
		<asp:Literal ID="iqMenublockCustomerService" runat="server"></asp:Literal> 
		</div>
	</div>
	
	<asp:Literal ID="iqfooterblock" runat="server"></asp:Literal>
</div>
	<asp:Literal ID="iqHomepageJavascript" runat="server"></asp:Literal>
</body>
</html>
