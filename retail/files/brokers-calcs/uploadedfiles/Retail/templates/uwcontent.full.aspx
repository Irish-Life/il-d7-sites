<%@ Page Language="VB" AutoEventWireup="false" CodeFile="uwcontent.full.aspx.vb" Inherits="uwcontent" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="640" DynamicParameter="id" hide="true" GenerateDublinCore="false" />
<asp:literal id="metaContent" runat="server"></asp:literal>
<meta name="robots" content="all"/>
<meta name="robots" content="index,follow"/>
<meta name="revisit-after" content="2 days"/>
<meta name="rating" content="general"/>
<meta name="language" content="en"/>
<meta name="author" content="Irish Life B-line" />

<script src="http://www.irishlife.ie/uploadedFiles/retail/js/iq.jquery-1.6.1.min.js" type="text/javascript" ></script>
<script type="text/javascript" src="http://www.irishlife.ie/uploadedFiles/retail/js/jquery.tools.min.js?150911"></script>

<script src="http://www.irishlife.ie/uploadedFiles/retail/js/logger.js" type="text/javascript"></script>
<link href="http://www.irishlife.ie/uploadedImages/AskUW/reset-min.css" rel="stylesheet" type="text/css" />
<link href="http://www.irishlife.ie/uploadedImages/UW/ask-uw.css?301111" rel="stylesheet" type="text/css" />

<link type="text/css" rel="stylesheet" href="http://www.irishlife.ie/uploadedImages/AskUW/style.css"/>
</head>
<body>

<div id="wrapper">
<div class="containerBorder">
<div class="top">&nbsp;</div>
<div id="top">

	<span style="float:left"><img alt="Ask Underwriting" src="http://www.irishlife.ie/uploadedImages/UW/ask_uw.jpg"></span>
       <span style="background: url(/uploadedImages/retail/images/utility_belt.gif?150911) no-repeat scroll 0 -331px #FFFFFF;float: right;height: 45px;margin-right:10px;margin-top:40px;width: 158px;"></span>	
		<div class="headerBottom"></div>
</div>
<!-- e header -->
<div class="content leftShadow">
	<div class="minHeight">
	<div id="left">	
	<ul id="menuList">
    	<asp:Literal runat="server" ID="menuText"></asp:Literal>
		</ul>
	</div>
	<div id="middle">

	<p class="breadcrumbs hidden">You are here: 
	<asp:Literal ID="breadcrumb" runat="server"></asp:Literal> <asp:Literal ID="breadcrumbEnd" runat="server"></asp:Literal> </p>
	<cms:ContentBlock ID="content" runat="server" DefaultContentID="186" DynamicParameter="id" SuppressWrapperTags="true" />
	
	</div>
<div id="right">
	

	
</div>
	</div>
	</div>
	</div>
		<div class="footer footerSubMenu">
		<div class="top">&nbsp;</div>		
			<p>Ask Underwriting is the property of Irish Life and can only be used for the purpose of assisting financial advisers through the Irish Life underwriting process. </p>
			<p>Copying, using, displaying or quoting from Ask Underwriting for any other purposes is expressly prohibited without written permission from Irish Life's Head of Underwriting. </p>
			<p>Ask Underwriting © Copyright Irish Life</p>			
								
		</div>

</div>
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16369698-8']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

<script type="text/javascript" src="/servlet/occupationDataSelect.js"></script>
<script type="text/javascript">
    
  $().ready(function()
  {
   log(' = ready');
   
   try
   {
    $('#occupationComboContainer').html(occupationSelect);   
   }
   catch(e){alert('Error creating occupation list');}
  });
  
  function selectChange()
  {
   log(' = selectChange');
   
   parms = "value=" + $("#occupationSelect option:selected")[0].value.substring(1);
   url = "/servlet/occupationData";   
   
   $.ajax({
    type: "POST",
    url: url,
    async: true,
    data: parms,
    beforeSend: function(){},
    success: function(response){successAjax(response);},
    error: function(){errorAjax();},
    timeout: 300000
   });
   
  }
  function successAjax(response)
  {
   log(' = successAjax. response = ' + response);
   occupationData = null;
   try
   {
    eval(response);
   }
   catch(e)
   {
    log(' * error 0');
   }
      
   if(occupationData == null)
   {
    $('#occupationResults').addClass('hidden');    
    $('#occupationError').html(response);
   }
   else
   {
    try
    {
     $('#occupationError').html('');
     $('#occupationResults').removeClass('hidden');
     
     selectedValue = $("#occupationSelect option:selected")[0].value;
     
     if(selectedValue != "")
     {
      occupation = eval("occupationData." + selectedValue);
      
      $('#occupationResultDescription').html(occupation.text);
      $('#occupationResultLifeCover').html(filter(occupation.LLC, 'LifeCover'));
      $('#occupationResultSpecifiedIllnessCover').html(filter(occupation.SIC, 'SpecifiedIllnessCover'));
      $('#occupationResultHospitalCashCover').html(filter(occupation.HIC));
      $('#occupationResultAccidentCover').html(filter(occupation.ACC));
      $('#occupationResultContributionCover').html(filter(occupation.CCC, 'ContributionCover'));
      $('#occupationResultPhiClass').html(filter(occupation.PCC));
      $('#occupationResultDisabilityDefinition').html(filter(occupation.DDC));
      $('#occupationResultMaxExpiryAge').html(filter(occupation.MEA));
      $('#occupationResultMinDeferredPeriod').html(filter(occupation.MDP));
     }
    }
    catch(e)
    {
     log(' * error 1');
    }
   }   
  }
  function errorAjax()
  {
   log(' = errorAjax.');
   $('#occupationResults').addClass('hidden');
   $('#occupationError').html('Error getting occupation data');
  }
  
  function filter(string, type)
  {
   switch(type)
   {
    case 'LifeCover':
     switch(string)
     {
      case "N":
       return "Normal rates";
       break;
      case "E":
       return "An extra premium may apply &ndash; please contact Underwriting for further details";
       break;
      default:
       return "";
     }
    break;
   
    case 'SpecifiedIllnessCover':
     switch(string)
     {
      case "1":
       return "Normal rates";
       break;
      case "2":
       return "An exclusion may apply for this occupation &ndash; please contact Underwriting for further details";
       break;
      default:
       return "";
     }     
    break;
    
    case 'ContributionCover':
     switch(string)
     {
      case "Y":
       return "Yes";
       break;
      case "N":
       return "No";
       break;
      default:
       return "";
     }
    break;
    
    default:
     switch(string)
     {    
      case "A":
       return "Class A";
       break;
      case "B":
       return "Class B";
       break;
      case "X":
       return "Class X";
       break;
      case "Y":
       return "Class Y";
       break;
      case "1":
       return "Class 1";
       break;
      case "2":
       return "Class 2";
       break;
      case "3":
       return "Class 3";
       break;
      case "4":
       return "Class 4 ";
       break;     
      case "D":
       return "Cover is not available for this occupation";
       break;
      case "O":
       return "Own occupation - where the life assured is totally unable to carry out duties pertaining to his/her own occupation by reason of total disablement arising from bodily injury or sickness and is not following any other occupation";
       break;
      case "S":
       return "Own & suited occupation - where the life assured is unable to carry out duties pertaining to his/her own occupation by reason of total disablement arising from bodily injury or sickness and is not following any other occupation and is totally unable as a result of illness or injury to follow any other occupation to which they are suited by reason of education, training or experience";
       break;
      case "13":
       return "13 weeks";
       break;
      case "26":
       return "26 weeks";
       break;     
      case "52":
       return "52 weeks";
       break;
      case "55":
       return "Age 55";
       break;
      case "60":
       return "Age 60";
       break;
      case "65":
       return "Age 65";
       break;
      case "N":
       return "Normal rates";
       break;
      case "E":
       return "An extra premium may apply &ndash; please contact Underwriting for further details";
       break;
      case "Y":
       return "This benefit is available for this occupation";
       break;
      case "N":
       return "This benefit is not available for this occupation";
       break;          
      default:
       return "n/a";
     }
   }
  }
  
 
</script>
<div style="DISPLAY: none" id="medical-modal-content"><div id="medicalInfoText">&nbsp;</div>

</div>
<script src="http://www.bline.ie/uploadedFiles/retail/js/medicalGuide.js?240113" type="text/javascript" ></script>
<script type="text/javascript">
$(document).ready(function() {
$('#menuList li a').each (function(index)
{
if (window.location == $(this).attr('href'))
{
    $(this).parent().addClass('on');
}
});
});

</script>
<script src="https://munchkin.marketo.net/munchkin.js" type="text/javascript"></script>
<script src="https://www.irishlife.ie/secureWeb/uploadedFiles/retail/js/mk.js?230513" type="text/javascript"></script>
</body>
</html>