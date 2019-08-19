<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/bline/templates/article-nomenu.aspx.vb" Inherits="article" Debug="true"%>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" hide="true" GenerateDublinCore="false" />
	<asp:literal id="metaContent" runat="server"></asp:literal>
	<asp:Literal ID="cssFiles" runat="server"></asp:Literal>
	<!--[if IE 7]>
	<link rel="stylesheet" type="text/css" href="/uploadedImages/bline/templates/css/ie7.css">
	<![endif]-->
</head>

<body>
	<div id="container">
		<div id="header" class="SF_niceclear">
			<div id="logo"><a href="/new-home-page.html" title="Bline homepage"><img src="/uploadedImages/bline/templates/images/logo.png" /></a></div>
			<div id="banner">
				<cms:ContentBlock ID="Banner" runat="server" DefaultContentID="15198" SuppressWrapperTags="true" />
			</div>
			<!--#INCLUDE FILE="/uploadedFiles/bline/templates/navigation.aspx" -->
			<div class="breadcrumbs">You are here: <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal> </div>

			
			<div id="content_container" class="full_content_container">
				<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
			</div>
			
			<div id="right_col">
				<div class="content_box toprow mybiz">
					<asp:Literal ID="myBizLogin" runat="server"></asp:Literal>
				</div>

				<div class="content_box middlerow ad">
					<asp:Literal ID="middleRowAd" runat="server"></asp:Literal>
				</div>

				<div class="content_box bottomrow ad">
					<asp:Literal ID="bottomRowAd" runat="server"></asp:Literal>
				</div>
			</div>
		</div>
	</div>
	<!--#INCLUDE FILE="/uploadedFiles/bline/templates/footer.aspx" -->
	<asp:Literal ID="javascriptFiles" runat="server"></asp:Literal>
</body>
</html>