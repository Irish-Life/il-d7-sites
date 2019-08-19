<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/iq.retail.quote.iframe.aspx.vb" Inherits="retailpremiumquotepage" Debug="false" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<asp:Literal ID="iqHeaderblock" runat="server"></asp:Literal>
		<!--[if lte IE 7]> <link rel='stylesheet' type='text/css' href="/uploadedImages/Retail/css/iq.naughty_ie.css"> <![endif]-->
		<style type="text/css">
		body{background-color:#fff !important;}
		</style>
	</head>
<body>
		
		<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
		<div class='clear'> <!-- Irish Life --> </div>
	<asp:Literal ID="iqContentQuoteJavascript" runat="server"></asp:Literal>
</body>
</html>