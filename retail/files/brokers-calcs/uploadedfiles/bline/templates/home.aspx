<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/bline/templates/home.aspx.vb" Inherits="home" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
	<asp:literal id="metaContent" runat="server"></asp:literal>
	<asp:Literal ID="cssFiles" runat="server"></asp:Literal>

  <!--[if IE 7]>
        <link rel="stylesheet" type="text/css" href="/uploadedImages/bline/templates/css/ie7.css">
	<![endif]-->

</head>
<body>

<div id="container">
	<div id="header" class="SF_niceclear">
			<div id="logo"><a href="/" title="Bline homepage"><img src="http://www.bline.ie/uploadedImages/bline-banner-wide.png" /></a></div>
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
		<div style="display:none">
			<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="15200" SuppressWrapperTags="true" DynamicParameter="id" />
		</div>
		


		<div id="content_container">
			<div class="banner_box welcome_area">
				<asp:Literal ID="topRowCenter" runat="server"></asp:Literal>
			</div>
			<div class="clearer"> </div>
			<!-- ------------------------------------------ 
			// RIGHT COLUMN CONTENT
			-->
				<div id="right_col">
			
					<div class="content_rhs_box">
						<cms:ContentBlock ID="Top_Ad_Space" runat="server" DefaultContentID="20246" SuppressWrapperTags="true" />
					</div>
					
					<div class="content_rhs_box">
						<cms:ContentBlock ID="Mid_Ad_Space" runat="server" DefaultContentID="15180" SuppressWrapperTags="true" />
					</div>

					<div class="content_rhs_box">
						<cms:ContentBlock ID="Bottom_Ad_Space" runat="server" DefaultContentID="15182" SuppressWrapperTags="true" />
					</div>
				</div>

		<div id="main_col">	
			<h2 class="newser">News</h2>
			<div class="content_box">
				<asp:Literal ID="middleRowLeft" runat="server"></asp:Literal>
			</div>
			<div class="content_box">
				<asp:Literal ID="middleRowRight" runat="server"></asp:Literal>
			</div>
			<div class="content_box">
				<asp:Literal ID="bottomRowLeft" runat="server"></asp:Literal>
			</div>
			<div class="content_box">
				<asp:Literal ID="bottomRowRight" runat="server"></asp:Literal>
			</div>
		</div>
		</div>

		
	</div>
</div>
	<!--#INCLUDE FILE="/uploadedFiles/bline/templates/footer.aspx" -->
	<asp:Literal ID="javascriptFiles" runat="server"></asp:Literal>

</body>

</html>