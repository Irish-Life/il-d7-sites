<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/ilfs.retail.naked.aspx.vb" 
Inherits="retailcontent" Debug="false" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
		<asp:Literal ID="iqHeaderblock" runat="server"></asp:Literal>
        <cms:ContentBlock ID="ilfsCSS" runat="server" DefaultContentID="17036" SuppressWrapperTags="true" />
        <asp:Literal runat="server" ID="mobileMeta" />
	</head>
<body>
<div id='bodyContainer'>
		<asp:Literal ID="iqMenublock" runat="server"></asp:Literal><br/>
		<div id='mainContent' class='blockContainer'>

				<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />

			<div class='clear'> <!-- Irish Life --> </div>
		</div>

		<div id="tracking" class="hidden">~</div>
			<div id="insertTrackingDiv" class="hidden">~</div>
			
	<asp:Literal ID="iqFooterblock" runat="server"></asp:Literal>
	</div>
	<asp:Literal ID="ilfsGeneralJS" runat="server"></asp:Literal>
    <cms:ContentBlock ID="ilfsJavascript" runat="server" DefaultContentID="17040" SuppressWrapperTags="true" />
</body>
</html>