<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/bline/foundation_responsive/templates/foundation.responsive.empty.aspx.vb" Inherits="responsive" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<!--[if lt IE 7]><html class="lt-ie9 lt-ie8 lt-ie7" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><![endif]-->
<!--[if IE 7]><html class="lt-ie9 lt-ie8" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><![endif]-->
<!--[if IE 8]><html class="lt-ie9" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en"><![endif]-->
<!--[if gt IE 8]><!--><html class="no-js" lang="en" xmlns="http://www.w3.org/1999/xhtml"><!--<![endif]-->


<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
	<asp:Literal ID="iqHeaderblock" runat="server"></asp:Literal>
	<cms:ContentBlock ID="ilfsCSS" runat="server" DefaultContentID="17036" SuppressWrapperTags="true" />
	<cms:ContentBlock ID="ilfsFBOG" runat="server" DefaultContentID="18790" SuppressWrapperTags="true" />
	<asp:Literal runat="server" ID="mobileMeta" />	
	<!--[if lt IE 9]>
	<link rel="stylesheet" media="screen, print" type="text/css" href="https://www.irishlife.ie/secureWeb/uploadedImages/ie8-grid-foundation-4.css"/>
	<![endif]-->

</head>
<body>
	<!-- This is the main content of the page -->
	<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />

	<asp:Literal ID="ilfsGeneralJS" runat="server"></asp:Literal>	
	<cms:ContentBlock ID="ilfsJavascript" runat="server" DefaultContentID="17040" SuppressWrapperTags="true" />
</body>
</html>