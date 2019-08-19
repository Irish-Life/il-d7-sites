<%@ Page Language="VB" AutoEventWireup="false" CodeFile="~/uploadedFiles/Financial_Advisers/content.aspx.vb" Inherits="content" Debug="true" %><%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><!--#INCLUDE FILE="/head.aspx" --><link href="/uploadedImages/Financial_Advisers/advisers.css" rel="stylesheet" type="text/css"/>
<script type="text/javascript">
function changeOffice()
{

	$('.areaOffice').each(function(i){
		$(this).addClass('hidden');
	});

	var office=$('#areaOfficeSelected').val();
	
	$('#'+office).removeClass('hidden');
}
</script>
</head><body class='<asp:Literal ID="pageClassName" runat="server"></asp:Literal>' ><div class="wrapper"><div class="layout-top" >&nbsp;</div><div class="layout-container"><!--#INCLUDE FILE="/layout-header.aspx" --><div class="layout-body"><div class="body"><div class="bodyInner"><p class="breadcrumbs">You are here: <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal></p><div class="content" ><div class="content-middle content-middle-wide-left" ><cms:ContentBlock ID="MainContentBlock" runat="server" DynamicParameter="id" DefaultContentID="62" /></div></div></div></div></div><!--#INCLUDE FILE="/layout-footer.aspx" --></div><!--#INCLUDE FILE="/layout-bottom.aspx" --></div>
<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-16369698-1']);  _gaq.push(['_trackPageview']);
			  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script>

</body></html>