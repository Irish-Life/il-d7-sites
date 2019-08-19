<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/foundation.responsive.aspx.vb" Inherits="responsive" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %> 
<!DOCTYPE html>
<!--[if IE 8]> <html class="no-js lt-ie9" lang="en" > <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en" > <!--<![endif]-->

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width" />
	
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
	<asp:Literal ID="iqHeaderblock" runat="server"></asp:Literal>
	<cms:ContentBlock ID="ilfsCSS" runat="server" DefaultContentID="17036" SuppressWrapperTags="true" />
	
	<!-- Set up Facebook Specific Open Graph Information -->
	<cms:ContentBlock ID="ilfsFBOG" runat="server" DefaultContentID="18790" SuppressWrapperTags="true" />
	
	<asp:Literal runat="server" ID="mobileMeta" />	
	

</head>
<body>
	<!-- Default header of the page, with menus etc -->
	<asp:Literal ID="iqMenublock" runat="server"></asp:Literal>
		
	<!-- This is the main content of the page -->
	<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
		
	<!-- Default Footer -->
	<asp:Literal ID="iqFooterblock" runat="server"></asp:Literal>
	
	<!-- Extra JS that might be needed -->
	<asp:Literal ID="ilfsGeneralJS" runat="server"></asp:Literal>
	
	<!-- Default Template JS that are required -->
	<cms:ContentBlock ID="ilfsJavascript" runat="server" DefaultContentID="17040" SuppressWrapperTags="true" />
</body>
</html>