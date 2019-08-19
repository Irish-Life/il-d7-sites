<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/Research/content.aspx.vb" Inherits="content" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	
	<!--#INCLUDE FILE="/head.aspx" -->
	
</head>

<body class='<asp:Literal ID="pageClassName" runat="server"></asp:Literal>' >

	<div class="wrapper">
		
		<div class="layout-top" >&nbsp;</div>
		
		<div class="layout-container">
			
			<!--#INCLUDE FILE="/layout-header.aspx" -->
			
			<div class="layout-body">
				
				<div class="body">
					<div class="bodyInner">
												
						<p class="breadcrumbs">
							You are here: <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal>
						</p>
						
						<div class="content" >						
							
							<div class="content-middle content-middle-wide-left" >
								
								<cms:ContentBlock ID="MainContentBlock" runat="server" DynamicParameter="id" DefaultContentID="62" />
								
							</div>
							
							<div class="content-right" >
							
								 <cms:ContentBlock ID="RHS_Content" runat="server" DefaultContentID="64" SuppressWrapperTags="true" />					
								
							</div>							
							
						</div>
						
					</div>
				</div>
				
			</div>	
			
			<!--#INCLUDE FILE="/layout-footer.aspx" -->
			
		</div>
		
		<!--#INCLUDE FILE="/layout-bottom.aspx" -->
		
	</div>
	
</body>

</html>
