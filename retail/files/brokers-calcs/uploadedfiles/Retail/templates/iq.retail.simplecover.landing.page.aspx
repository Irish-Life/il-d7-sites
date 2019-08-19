<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/iq.retail.simplecover.landing.page.aspx.vb" Inherits="retaillandingpage" Debug="false" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
		<asp:Literal ID="iqHeaderblock" runat="server"></asp:Literal>
		<!--[if lte IE 7]> <link rel='stylesheet' type='text/css' href="/uploadedImages/Retail/css/iq.naughty_ie.css"> <![endif]-->
	</head>
<body>
<div id='bodyContainer'>
		<asp:Literal ID="iqMenublock" runat="server"></asp:Literal>
	<div id='mainContent' class='blockContainer'>
		
		<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
		<div class='clear'> <!-- Irish Life --> </div>
	</div>
	

						
	<asp:Literal ID="iqFooterblock" runat="server"></asp:Literal>
	</div>
	<asp:Literal ID="iqContentQuoteJavascript" runat="server"></asp:Literal>
</body>
</html>