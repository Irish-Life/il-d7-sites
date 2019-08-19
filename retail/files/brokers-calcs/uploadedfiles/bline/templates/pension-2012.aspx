<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/bline/templates/pension-2012.aspx.vb" Inherits="article" Debug="true"%>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" hide="true" GenerateDublinCore="false" />
	<asp:literal id="metaContent" runat="server"></asp:literal>
	<asp:Literal ID="cssFiles" runat="server"></asp:Literal>
	<!--[if IE 7]>
	<link rel="stylesheet" type="text/css" href="https://www.irishlife.ie/secureContent/uploadedImages/bline/templates/css/ie7.css">
	<![endif]-->
	<link rel="stylesheet" type="text/css" href="https://www.irishlife.ie/secureContent/uploadedImages/bline/templates/css/thinking-differently.css"/>
	<link rel="stylesheet" type="text/css" href="https://www.irishlife.ie/secureContent/uploadedImages/bline/templates/css/jquery.ui.core.css"/>
	<link rel="stylesheet" type="text/css" href="https://www.irishlife.ie/secureContent/uploadedImages/bline/templates/css/jquery.ui.tabs.css"/>
	<link rel="stylesheet" type="text/css" href="https://www.irishlife.ie/secureContent/uploadedImages/bline/templates/css/jquery-ui-extras.css"/>
</head>

<body>
	<div id="container">
		<div id="header" class="SF_niceclear">
			<div id="logo"><a href="/" title="Bline homepage"><img src="https://www.irishlife.ie/secureContent/uploadedImages/bline/templates/images/logo.png" /></a></div>
			<div id="banner">
				<cms:ContentBlock ID="Banner" runat="server" DefaultContentID="17688" SuppressWrapperTags="true" />
			</div>
			<div class="hidden">
			<!--#INCLUDE FILE="/uploadedFiles/bline/templates/navigation.aspx" -->
			</div>
			<div class="clearer"></div>
			<div id="content_container_fullwidth">
			<div class="breadcrumbs hidden"><b>You are here:</b> <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal> </div>
			<div class="clearer"></div>
				<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
			</div>
		</div>
	</div>
	<!--#INCLUDE FILE="/uploadedFiles/bline/templates/footer.aspx" -->
	<asp:Literal ID="javascriptFiles" runat="server"></asp:Literal>
	<script type="text/javascript" src="https://www.irishlife.ie/secureContent/uploadedFiles/bline/templates/js/thinking-differently.js"></script>
</body>
</html>