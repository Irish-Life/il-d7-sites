<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/_retail_[Responsive]/templates/foundation.responsive.aspx.vb" Inherits="responsive" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %> 
<!DOCTYPE html>
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
	<asp:Literal ID="ilfsGeneralCSS" runat="server"></asp:Literal>
	<cms:ContentBlock ID="ilfsCSS" runat="server" DefaultContentID="19600" SuppressWrapperTags="true" />
	<cms:ContentBlock ID="ilfsFBOG" runat="server" DefaultContentID="18790" SuppressWrapperTags="true" />
	<asp:Literal runat="server" ID="mobileMeta" />
<!--[if lt IE 9]>
	<link rel="stylesheet" media="screen, print" type="text/css" href="https://www.irishlife.ie/secureWeb/uploadedImages/retail/_retail_[Responsive]/css/ie8-grid-foundation-4.css"/>
	<![endif]-->



</head>
<body>

	<div class="pageHolder">
	
	
	<!-- This is the main header of the page, with menus etc -->
	<asp:Literal ID="ilfsHeader" runat="server"></asp:Literal> 
	
	<!-- This is the main header of the page, with menus etc -->
	<asp:Literal ID="ilfsMenu" runat="server"></asp:Literal>
	
	
	<div id="breadcrumbs"><asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal></div>
	<div class="pageContents">
	<!-- This is the main content of the page -->
	<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
	</div>
	<asp:Literal ID="ilfsFooter" runat="server"></asp:Literal>
	<asp:Literal ID="ilfsSocial" runat="server"></asp:Literal>
	<asp:Literal ID="ilfsTandC" runat="server"></asp:Literal>
	
	</div>
	<asp:Literal ID="ilfsGeneralJS" runat="server"></asp:Literal>
	

	<cms:ContentBlock ID="ilfsJavascript" runat="server" DefaultContentID="17040" SuppressWrapperTags="true" />

</body>
</html>