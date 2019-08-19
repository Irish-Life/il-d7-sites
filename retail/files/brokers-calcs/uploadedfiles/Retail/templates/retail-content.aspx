<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/retail-content.aspx.vb" Inherits="retailcontent" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<head>
		<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
		<asp:Literal ID="headerblock" runat="server"></asp:Literal>
	</head>
<body>
	<div class="bodyContainer">
	<asp:Literal ID="menublock" runat="server"></asp:Literal>
	<div class="containerholder">
		<div class="container">	
		
			<div id="menuBlockDetailsHolder" class="hidden">
				<div id="menuBlockDetails" >
			<asp:Literal ID="menublockAdvice" runat="server"></asp:Literal>
			<asp:Literal ID="menublockProducts" runat="server"></asp:Literal>
			<asp:Literal ID="menublockCustomerService" runat="server"></asp:Literal>
				<!--[if !IE 6]><!-->
				<div class="dropShadow">&nbsp;</div>
				<!--<![endif]-->
				</div>  
			</div>
			<div class="breadcrumbs"><asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal></div>
			<!-- ############# -->
			<!-- BEGINNING OF BODY -->
			<!-- ############# -->
			<div id="mainBody" class="">
				<div class="body-top ">
					<div class="bodyHolder">
						<div class="bodyHolderLeft">
							<div class="bodyContent">
								<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
							</div>
						</div>
						<!-- *************************************************************-->
						<!-- ***************** RIGHT SIDE OF THE PAGE *********************-->
						<!-- *************************************************************--> 
						<div class="bodyHolderRight">
							<asp:Literal ID="addthisToolBox" runat="server"></asp:Literal>
							<cms:ContentBlock ID="RHS_Content" runat="server" DefaultContentID="144" SuppressWrapperTags="true" />
						</div>
					</div>
				<div class="clearer">&nbsp;</div> 
				</div>
				<div class="clearer">&nbsp;</div>
			</div>
			<!-- ############# -->
			<!--      END OF BODY     -->
			<!-- ############# -->
		</div>
	</div><br/><br/><br/><br/>
	</div>
	<asp:Literal ID="footerblock" runat="server"></asp:Literal>
	<asp:Literal ID="contentJavascript" runat="server"></asp:Literal>
	<asp:Literal ID="addthisToolBoxJavascript" runat="server"></asp:Literal>
</body>
</html>
