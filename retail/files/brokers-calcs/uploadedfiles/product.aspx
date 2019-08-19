<%@ Page Language="VB" AutoEventWireup="false" CodeFile="product.aspx.vb" Inherits="product" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	
	<!--#INCLUDE FILE="..\head.aspx" -->
	
</head>

<body class='<asp:Literal ID="pageClassName" runat="server"></asp:Literal>' >

	<div class="wrapper">
		
		<div class="layout-top" >&nbsp;</div>
		
		<div class="layout-container">
			
			<!--#INCLUDE FILE="..\layout-header.aspx" -->
			
			<div class="layout-body">
				
				<div class="body">
					<div class="bodyInner">
												
						<p class="breadcrumbs">
							You are here: <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal>
						</p>
						
						<div class="content" >
						
							<div class="content-left" >
								
								<ul>
									<asp:Literal runat="server" ID="menuText"></asp:Literal>
								</ul>

								<cms:ContentBlock ID="LHS_Content" runat="server" DefaultContentID="60" SuppressWrapperTags="true" />								

								
							</div>
							
							<div class="content-middle" >
								
								<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
								
							</div>
							
							<div class="content-right" >
							
								<cms:ContentBlock ID="RHS_Content" runat="server" DefaultContentID="144" SuppressWrapperTags="true" />								
								
							</div>							
							
						</div>
						
					</div>
				</div>
				
			</div>	
			
			<!--#INCLUDE FILE="../layout-footer.aspx" -->
			
		</div>
		
		<!--#INCLUDE FILE="../layout-bottom.aspx" -->
		
	</div>
	
</body>

</html>
