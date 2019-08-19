<%@ Page Language="VB" AutoEventWireup="false" CodeFile="~/uploadedFiles/Financial_Advisers/content.aspx.vb" Inherits="content" Debug="true" %><%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN""http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en"><head><!--#INCLUDE FILE="/head.aspx" --><link href="/uploadedImages/Financial_Advisers/advisers.css" rel="stylesheet" type="text/css"/><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/adviserData.js"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/popups.js"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/date.js"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/jquery.datenormalizer.js"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/jquery.newsticker.pack.js"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/jquery.simplemodal-1.3.5.min.js"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/jquery.styledButton.js"></script><script src="http://maps.google.com/maps?file=api&v=2&key=ABQIAAAAJ5g22DXQDDi8yc-N4s76lxRl9y_niFQI7YjhUHEqbbs9Xm9E4xS_359YfnkY9q5IsuOXbH4ebKvyKw&sensor=true" type="text/javascript"></script><script type="text/javascript" src="/uploadedFiles/Financial_Advisers/map.js"></script><script type="text/javascript">
$(document).ready(function(){$('#adviserPhoto').html(thisAdviserData.photo);$('#adviserName').html(thisAdviserData.firstname + ' ' + thisAdviserData.lastname);$('#adviserAddress').html(thisAdviserData.address1 + '<br />' + thisAdviserData.address2 + '<br />' +  thisAdviserData.address3 + '<br />' +  thisAdviserData.address4 + '<br />');$('#adviserPhone').html(thisAdviserData.phone);$('#adviserEmail').html('<a href=\"mailto:' + thisAdviserData.email + '\">' + thisAdviserData.email +'</a>' );$('#adviserFax').html(thisAdviserData.fax);showAbout();$('#adviserComments').html(thisAdviserData.comments);$('#youtubeVideo').html(thisAdviserData.smallvideo);$('#video-modal-content').html(thisAdviserData.largevideo);$("#news").newsTicker();

if (thisAdviserData.about == '')
{
	$('#aboutMe').addClass('hidden');
}

if (thisAdviserData.comments == '')
{
	$('#comments').addClass('hidden');
}
if (thisAdviserData.smallvideo == '')
{
	$('#adviserVideo').addClass('hidden');
}
});

function showAllAbout()
{
	$('#adviserAbout').html(thisAdviserData.about.substring(0,thisAdviserData.about.length - 4)
	+ ' [<a class="open" href="javascript:void();" onclick="showAbout();">less</a>]</p>');
}

function showAbout()
{
if (thisAdviserData.about.length > 300)
{
	$('#adviserAbout').html(thisAdviserData.about.substring(0,300) + '... [<a class="open" href="javascript:void(0);" onclick="showAllAbout();">more</a>]</p>');
}
else
{
	$('#adviserAbout').html(thisAdviserData.about);
}

}

</script></head><body class='<asp:Literal ID="pageClassName" runat="server"></asp:Literal>' ><div class="wrapper"><div class="layout-top" >&nbsp;</div><div class="layout-container"><!--#INCLUDE FILE="/layout-header.aspx" --><div class="layout-body"><div class="body"><div class="bodyInner"><p class="breadcrumbs">You are here: <asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal></p><div class="content" ><div class="content-middle content-middle-wide-left" ><cms:ContentBlock ID="MainContentBlock" runat="server" DynamicParameter="id" DefaultContentID="62" /><div class="bodyInner-top"><div class="bodyInner-top-left"><div class="body-tl-img"><span id="adviserPhoto"></span></div><div class="body-tl-info"><h3><span id="adviserName"></span></h3><p><span id="adviserAddress"></span></p><div id="map-modal"><small>[<a class="open" href="javascript:void(0)">show on map</a>]</small></div></div></div><div class="bodyInner-top-right"><h3>Contact Information</h3><p>Phone: <span id="adviserPhone"></span><br />Email: <span id="adviserEmail"></span><br />fax: <span id="adviserFax"></span>
<br />
</p></div><img src="/uploadedImages/Financial_Advisers/clear.jpg" alt="clear" /><div class="clearer"></div></div><div class="body-mid"><div class="body-mid-left"><div id="aboutMe"><h2 class="highligher">About Me</h2><span id="adviserAbout"></span></div></div></div><div class="clearer"></div><div class="body-bottom"><div id="comments"><h2 class="highligher">Customer Comments</h2><span id="adviserComments"></span></div><div class="clearer"></div><h2 class="highligher">Experienced Financial Advice</h2><p>Being prepared for the future is more important now, than ever before. So, why not meet with me for a free review of your finances to get a clearer picture of your personal situation. This service is free of charge and it can be arranged at a time and place to suit you. I can explain the review to you in a bit more detail: just click on the video to find out more.&gt;&gt;</p></div><br /><div id="map-modal-content"><div id="mapCanvas"></div></div><div id="video-modal-content"></div></div><div class="content-right" ><cms:ContentBlock ID="RHS_Content" runat="server" DefaultContentID="6000" SuppressWrapperTags="true" /></div></div></div></div></div><!--#INCLUDE FILE="/layout-footer.aspx" --></div><!--#INCLUDE FILE="/layout-bottom.aspx" --></div>
<script type="text/javascript">  var _gaq = _gaq || [];  _gaq.push(['_setAccount', 'UA-16369698-1']);  _gaq.push(['_trackPageview']);
			  (function() {    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);  })();</script>

</body></html>