<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/iq.retail.content.wide.custom.quote.aspx.vb" Inherits="retailcontentcustomquotewide" Debug="false" %>
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
	
	<div id="breadcrumbs"><asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal></div>

		<div id='mainContent' class='blockContainer'>
		<div class="aside share-this">
<div class="addthis_toolbox addthis_default_style ">
<a class="addthis_button_google_plusone"> </a>
<a class="addthis_button_twitter"> </a>
<a class="addthis_button_facebook"> </a><a class="addthis_button_print"> </a><a class="addthis_button_email"> </a><a class="addthis_button_linkedin"> </a><a class="addthis_button_compact"> </a><a class="addthis_counter addthis_bubble_style"> </a>
</div><!-- AddThis Button END -->
</div>
				<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
			<div class='clear'> <!-- Irish Life --> </div>
		</div>
		<div id='bodyHeader'>
	<asp:Literal ID="iqMenublock" runat="server"></asp:Literal>
	
		<div id='menuPopupContainer'>
		<asp:Literal ID="iqMenublockAdvice" runat="server"></asp:Literal>
		<asp:Literal ID="iqMenublockProducts" runat="server"></asp:Literal>
		<asp:Literal ID="iqMenublockCustomerService" runat="server"></asp:Literal> 
		</div>
	</div>
	<asp:Literal ID="iqFooterblock" runat="server"></asp:Literal>
	</div>
	<asp:Literal ID="iqContentQuoteJavascript" runat="server"></asp:Literal>
	<asp:Literal ID="iqAddthisToolBoxJavascript" runat="server"></asp:Literal>
</body>
</html>