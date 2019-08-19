<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/bline/templates/article-full-width.aspx.vb" Inherits="article" Debug="true"%>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<script src="//cdn.optimizely.com/js/53284191.js" type="text/javascript"></script>
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
			<div id="logo"><a href="/" title="Bline homepage"><img src="/uploadedImages/bline-banner-wide.png" /></a></div>
		<div id="headerRight">
				<div id="mybizHolder">
				<asp:Literal ID="myBizLogin" runat="server"></asp:Literal>
				</div>
				<div id="searchHolder">
					<div id="search_area" class="SF_niceclear">
						<a href="javascript:void(0)" onclick="javascript:performSearch();" class="search"><i></i></a>
						<input type="text" name="search" value="Search..." id="searchInput">
					</div>
				</div>
		</div>
		<div style="clear:both;"> </div>
			<!--#INCLUDE FILE="/uploadedFiles/bline/templates/navigation.aspx" -->
			<div class="clearer"></div>
			

			
			<div id="content_container_fullwidth">
			<div class="breadcrumbs"><b>You are here:</b> <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal> </div>
			<div class="clearer"></div>
				<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
			</div>

		</div>
	</div>
	<!--#INCLUDE FILE="/uploadedFiles/bline/templates/footer.aspx" -->
	<asp:Literal ID="javascriptFiles" runat="server"></asp:Literal>
</body>
</html>