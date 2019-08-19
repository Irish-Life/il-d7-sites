<%@ Page Language="VB" AutoEventWireup="false" CodeFile="retail-content-wide.aspx.vb" Inherits="retailcontent" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
	<asp:Literal ID="headerblock" runat="server"></asp:Literal>
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
						<div class="bodyHolderLeftWide">
						<!-- *************************************************************-->
						<!-- **** F U L L   P A G E   C O N T E N T   O F   T H E   S I T E   ***********-->
						<!-- *************************************************************--> 
							<div class="bodyContentWide">
								<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
							</div>
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
</body>
</html>
