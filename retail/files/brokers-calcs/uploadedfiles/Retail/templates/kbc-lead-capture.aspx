<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">


<%
Dim password as String = Request.QueryString("p")

if password = "fc3707fa908df1e82e30ecbdae3d094804a8f87d" Then
Response.Write(""& _
"<head><meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"" />" & vbCrLf & _
"<script type=""text/javascript"" src=""https://www.irishlife.ie/secureWeb/uploadedFiles/retail/js/iq.jquery.latest.min.js?180912""></script>" & vbCrLf & _
"<script type=""text/javascript"" src=""https://www.irishlife.ie/secureWeb/uploadedFiles/retail/js/gup.js?180912""></script>" & vbCrLf & _
"")
Response.Write("<style type=""text/css"">" & vbCrLf & _
"div.boxSpan {" & vbCrLf & _
  "overflow: hidden;" & vbCrLf & _
"}" & vbCrLf & _
"span.lpContentsItem.richTextSpan {" & vbCrLf & _
  "display: block;" & vbCrLf & _
"}" & vbCrLf & _
"span.lpContentsItem p:first-child{" & vbCrLf & _
  "margin-top: 0px;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"a.lpImageLink img {" & vbCrLf & _
  "border: none;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm {" & vbCrLf & _
  "margin: 0px;" & vbCrLf & _
  "padding: 0px;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm ul {" & vbCrLf & _
  "margin: 0px;" & vbCrLf & _
  "padding: 0px;" & vbCrLf & _
  "list-style: none;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm li {" & vbCrLf & _
  "margin: 0px;" & vbCrLf & _
  "padding: 1px 10px 3px 10px;" & vbCrLf & _
  "list-style: none;" & vbCrLf & _
  "clear: both;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm label {" & vbCrLf & _
  "padding-right: 20px;" & vbCrLf & _
  "float: left;" & vbCrLf & _
  "text-align: left;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm li.mktLblRight label {" & vbCrLf & _
  "float: none;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm li.mktLblRight input[type='checkbox'] {" & vbCrLf & _
  "position: relative;" & vbCrLf & _
  "left: -4px;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"form.lpeRegForm ul.mktLblCenter label {" & vbCrLf & _
  "text-align: right;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm ul.mktLblAbove span.mktInput {" & vbCrLf & _
  "clear: both;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm ul.mktLblAbove label {" & vbCrLf & _
  "padding-left: 10px;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm ul.mktLblAbove li.mktFormReq label {" & vbCrLf & _
  "background:  url(https://www.irishlife.ie/secureWeb/uploadedImages/backRequiredGray.gif) no-repeat -5px 0px;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm ul.mktLblAbove li#mktFrmButtons label {" & vbCrLf & _
  "display: none;" & vbCrLf & _
"}" & vbCrLf & _
"form.lpeRegForm li.mktFormReq label {" & vbCrLf & _
  "font-weight: bold;" & vbCrLf & _
  "background:  url(https://www.irishlife.ie/secureWeb/uploadedImages/backRequiredGray.gif) no-repeat right 0px;" & vbCrLf & _
"}" & vbCrLf & _
"span.mktError {" & vbCrLf & _
  "text-align: left;" & vbCrLf & _
  "position: relative;" & vbCrLf & _
"}" & vbCrLf & _
"span.mktError input {" & vbCrLf & _
  "background: #ECEFFF;" & vbCrLf & _
"}" & vbCrLf & _
"span.mktError span.mktFormMsg {" & vbCrLf & _
  "display: inline;" & vbCrLf & _
  "position: absolute;" & vbCrLf & _
  "top: 2px;" & vbCrLf & _
  "left: 4px;" & vbCrLf & _
  "xcolor: #8C8FFF;" & vbCrLf & _
  "color: red;" & vbCrLf & _
  "font-size: small;" & vbCrLf & _
  "width: 200px;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
".mkiLpeIcon16 a {" & vbCrLf & _
  "background-position: 0 !important;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
".mkiLpeFormBlueEdit a {" & vbCrLf & _
  "background-image: url(/images/icons16/form_blue_edit.png) !important;" & vbCrLf & _
  "float: none !important;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
".mkiLpeHandGrab2 a {" & vbCrLf & _
  "background-image: url(/images/icons16/hand_grab2.png) !important; " & vbCrLf & _
  "float: none !important;" & vbCrLf & _
"}" & vbCrLf & _
".mkiLpeHardDrive a {" & vbCrLf & _
  "background-image: url(/images/icons16/hard_drive.png) !important;  " & vbCrLf & _
  "float: none !important;" & vbCrLf & _
"}" & vbCrLf & _
".mkiLpeDocumentUp a {" & vbCrLf & _
  "background-image: url(/images/icons16/document_up.png) !important;  " & vbCrLf & _
  "float: none !important;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
".mktIpad span.mktInput input," & vbCrLf & _
".mktIpod span.mktInput input," & vbCrLf & _
".mktIphone span.mktInput input {" & vbCrLf & _
  "margin-bottom: 1px; " & vbCrLf & _
  "padding: 1px 0;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"#bodyId {" & vbCrLf & _
	"background: #EFEFEF;" & vbCrLf & _
	"color:#333333;" & vbCrLf & _
	"font-family: Arial, sans-serif;" & vbCrLf & _
	"font-size: 12px;" & vbCrLf & _
	"line-height:18px;" & vbCrLf & _
	"text-align: center;" & vbCrLf & _
	"margin: 0px;" & vbCrLf & _
	"padding: 0px;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"div#outerWrapDiv {" & vbCrLf & _
	"position: relative;" & vbCrLf & _
	"height: 100%;" & vbCrLf & _
	"width: 100%;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"div#innerWrapDiv {" & vbCrLf & _
	"position: relative;" & vbCrLf & _
	"background: transparent;" & vbCrLf & _
	"padding: 0px;" & vbCrLf & _
	"margin-left: auto;" & vbCrLf & _
	"margin-right: auto;" & vbCrLf & _
	"margin-top: 0px;" & vbCrLf & _
	"margin-bottom: 0px;" & vbCrLf & _
	"text-align: left;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
	"div#innerWrapDiv {" & vbCrLf & _
 	 "width: 960px;" & vbCrLf & _
	"}" & vbCrLf & _
"	" & vbCrLf & _
"img {" & vbCrLf & _
	"border:none;	" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"div#mktHeader {" & vbCrLf & _
	"background: #ffffff;" & vbCrLf & _
	"border-radius:0 0 6px 6px;" & vbCrLf & _
	"height: 150px;" & vbCrLf & _
	"margin-bottom:18px;" & vbCrLf & _
	"position:relative;  " & vbCrLf & _
	"}" & vbCrLf & _
"	" & vbCrLf & _
".logo {" & vbCrLf & _
	"border: 0px;" & vbCrLf & _
	"left:40px;" & vbCrLf & _
	"position:absolute;" & vbCrLf & _
	"top:25px;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"div#mktContent {" & vbCrLf & _
	"background: #ffffff;" & vbCrLf & _
	"border-radius:6px;" & vbCrLf & _
	"height: 550px;" & vbCrLf & _
	"position: relative;" & vbCrLf & _
	"}" & vbCrLf & _
"  " & vbCrLf & _
"div#mktcolumns {" & vbCrLf & _
	"border:#E6E6E6 1px solid;" & vbCrLf & _
	"height: 425px;" & vbCrLf & _
	"position: absolute;" & vbCrLf & _
	"right: 50px;" & vbCrLf & _
	"top: 25px;" & vbCrLf & _
	"width: 250px;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"div#mktFooter {" & vbCrLf & _
	"background:transparent;" & vbCrLf & _
	"color:#777777;" & vbCrLf & _
	"font-size:10px; " & vbCrLf & _
	"height: 78px;" & vbCrLf & _
	"position: relative;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
".copyright{" & vbCrLf & _
	"left: 20px;" & vbCrLf & _
	"position: absolute;" & vbCrLf & _
	"top: 14px;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
".footerlinks {" & vbCrLf & _
	"left: 20px;" & vbCrLf & _
	"position: absolute;" & vbCrLf & _
	"top: 14px;" & vbCrLf & _
	"}" & vbCrLf & _
"	" & vbCrLf & _
".footerlinks a {" & vbCrLf & _
	"color:#435399;" & vbCrLf & _
	"text-decoration:none;" & vbCrLf & _
	"}" & vbCrLf & _
"	" & vbCrLf & _
".footerlinks a:hover {" & vbCrLf & _
	"color:#435399;" & vbCrLf & _
	"text-decoration:underline;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"div.buttonSubmit {" & vbCrLf & _
  	"float:left;" & vbCrLf & _
  	"position:relative;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"div.buttonSubmit input, div.buttonSubmit span {" & vbCrLf & _
	"background-image:url(https://www.irishlife.ie/secureWeb/uploadedImages/button-submit10.gif); " & vbCrLf & _
	"background-position:right 0px;" & vbCrLf & _
	"background-repeat:no-repeat;" & vbCrLf & _
	"border:0px none;" & vbCrLf & _
	"color:#FFFFFF;" & vbCrLf & _
	"cursor:pointer;" & vbCrLf & _
	"float:left;" & vbCrLf & _
	"font-weight:bold;" & vbCrLf & _
	"height:36px;" & vbCrLf & _
	"margin:0px;" & vbCrLf & _
	"padding:0px 15px 2px;" & vbCrLf & _
	"position:relative;" & vbCrLf & _
	"z-index:5;" & vbCrLf & _
	"}" & vbCrLf & _
"	" & vbCrLf & _
"div.buttonSubmit span {" & vbCrLf & _
	"background-position:left -36px;" & vbCrLf & _
	"left:-4px;" & vbCrLf & _
	"padding:0px;" & vbCrLf & _
	"position:absolute;" & vbCrLf & _
	"top:0px;" & vbCrLf & _
	"width:4px;" & vbCrLf & _
	"z-index:10;" & vbCrLf & _
	"}" & vbCrLf & _
"	" & vbCrLf & _
"div.buttonSubmit input {" & vbCrLf & _
	"width:auto;" & vbCrLf & _
	"padding-left: 6px !important;" & vbCrLf & _
	"padding-right: 10px !important;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"#mktFrmSubmit{" & vbCrLf & _
	"background-color:transparent;" & vbCrLf & _
    "color: #FFFFFF !important;" & vbCrLf & _
	"font-size:13px;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"div.buttonSubmit:hover input {" & vbCrLf & _
	"background-position: right -72px;" & vbCrLf & _
	"}" & vbCrLf & _
"div.buttonSubmit:hover span {" & vbCrLf & _
	"background-position: " & vbCrLf & _
	"left -108px;" & vbCrLf & _
	"}" & vbCrLf & _
"" & vbCrLf & _
"</style>" & vbCrLf & _
"" & vbCrLf & _
"<!-- END TEMPLATE CSS -->" & vbCrLf & _
"" & vbCrLf & _
"<!-- SYSTEM JAVASCRIPT - DO NOT EDIT -->" & vbCrLf & _
"<script type=""text/javascript"">" & vbCrLf & _
"function isKBCEmail(emailAddressIn) " & vbCrLf & _
"{" & vbCrLf & _
	"if (emailAddressIn.indexOf(""@kbc.ie"") > -1)  " & vbCrLf & _
	"{  " & vbCrLf & _
		"return true;" & vbCrLf & _
	"}  "& vbCrLf & _
	"else " & vbCrLf & _
	"{ " & vbCrLf & _
		"return false; " & vbCrLf & _
	"}  " & vbCrLf & _
"} "& vbCrLf & _
"function fieldValidate(field) {" & vbCrLf & _
  "return true;" & vbCrLf & _
"}" & vbCrLf & _
"function getRequiredFieldMessage(domElement, label) {" & vbCrLf & _
  "return ""This field is required"";" & vbCrLf & _
"}" & vbCrLf & _
"function getTelephoneInvalidMessage(domElement, label) {" & vbCrLf & _
  "return ""Please enter a valid telephone number"";" & vbCrLf & _
"}" & vbCrLf & _
"function getEmailInvalidMessage(domElement, label) {" & vbCrLf & _
  "return ""Please enter a valid email address"";" & vbCrLf & _
"}" & vbCrLf & _
"</script>" & vbCrLf & _
"" & vbCrLf & _
"<!-- Jquery for fancy things!-->" & vbCrLf & _
   "<script>" & vbCrLf & _
     "$(document).ready(function () {" & vbCrLf & _
"" & vbCrLf & _
       "$('input[id=mktFrmSubmit]').wrap(""<div class='buttonSubmit'></div>"");" & vbCrLf & _
       "$("".buttonSubmit"").prepend(""<span></span>"");" & vbCrLf & _
"" & vbCrLf & _
     "});" & vbCrLf & _
"</script>" & vbCrLf & _
"" & vbCrLf & _
"<link rel=""shortcut icon"" href=""https://www.irishlife.ie/secureWeb/favicon.ico"" type=""image/x-icon"" />" & vbCrLf & _
"<link rel=""icon"" href=""https://www.irishlife.ie/secureWeb/favicon.ico"" type=""image/x-icon"" />" & vbCrLf & _
"<style type=""text/css"">" & vbCrLf & _
"DIV#mktContent{height: 550px; z-index: auto; }" & vbCrLf & _
"DIV#mktHeader{height: 165px; }</style><title>KBC Referral</title>" & vbCrLf & _
"<meta name=""description"" content=""early stage insurance information sign up page"" />" & vbCrLf & _
"<meta name=""keywords"" content=""early stage insurance information sign up page information for those starting out with insurance"" />" & vbCrLf & _
"<meta name=""robots"" content=""index, nofollow"" />" & vbCrLf & _
"<style type=""text/css""> div#lpeCDiv_10951 {position: absolute; left: 31px; top: 209px; min-width: 50px; z-index: 15; min-height: 50px; }" & vbCrLf & _
   "div#lpeCDiv_10951 div.lpContentsItem { }" & vbCrLf & _
"" & vbCrLf & _
"</style>" & vbCrLf & _
"<style type=""text/css""> .marketoContent {position: relative;} </style>" & vbCrLf & _
"" & vbCrLf & _
"<link rel=""shortcut icon"" href=""https://www.irishlife.ie/secureWeb/uploadedImages/Retail/img/favicon.ico?041011"" />" & vbCrLf & _
"</head>" & vbCrLf & _
"<body id=""bodyId"" class=""mktEditable"" align=""center"" >" & vbCrLf & _
"<div id=""outerWrapDiv"">" & vbCrLf & _
"<div id=""innerWrapDiv"" class=""mktEditable"">" & vbCrLf & _
"<div id='lpeCDiv_10951' class='lpeCElement HTML_1'><div class='lpContentsItem rawHtmlSpan'><style type='text/css'>form.lpeRegForm ul" & vbCrLf & _ 
"{font-size: 12px; color: black; font-family: Arial, Helvetica, sans-serif; } form.lpeRegForm ul input {font-size: 12px; color: black; font-family:" & vbCrLf & _ 
"Arial, Helvetica, sans-serif; } form.lpeRegForm ul input[type='text'] " & vbCrLf & _
"{font-size: 12px; color: black; font-family: Arial, Helvetica, sans-serif; } " & vbCrLf & _
"form.lpeRegForm ul textarea {font-size: 12px; color: black; font-family: Arial, Helvetica, sans-serif; } " & vbCrLf & _
"form.lpeRegForm ul select" & vbCrLf & _ 
"{font-size: 12px; color: black; font-family: Arial, Helvetica, sans-serif; } " & vbCrLf & _
"form.lpeRegForm li {margin-bottom: 10px; } form.lpeRegForm .mktInput " & vbCrLf & _
"{padding-left: 0px; } form.lpeRegForm label {width: 150px; } form.lpeRegForm input.mktFormText {width: 225px; } " & vbCrLf & _
"form.lpeRegForm textarea {width:" & vbCrLf & _ 
"225px; } form.lpeRegForm select {width: 229px; } </style><!--[if IE]>" & vbCrLf & _
"<style type='text/css'>form.lpeRegForm li {margin-bottom: 8px; } " & vbCrLf & _
"form.lpeRegForm select {width: 231px; } </style><![endif]-->" & vbCrLf & _
"<script type=""text/javascript"">" & vbCrLf & _
"var profiling = {" & vbCrLf & _
  "isEnabled: false," & vbCrLf & _
  "numberOfProfilingFields: 4," & vbCrLf & _
  "alwaysShowFields: [ 'mktDummyEntry']" & vbCrLf & _
"};" & vbCrLf & _
"</script>" & vbCrLf & _
"<form class=""lpeRegForm formNotEmpty"">" & vbCrLf & _
"" & vbCrLf & _
"<ul class='mktLblLeft'>" & vbCrLf & _
"" & vbCrLf & _
"<!--Changed from 'Email Address' to 'Customer Email Address' to avoid confusion-->" & vbCrLf & _
"<li  class='mktFormReq mktField' ><label>Customer Email Address:</label><span class='mktInput'><input class='mktFormText mktFormEmail" & vbCrLf & _ 
"mktFReq' name=""Email"" id=""Email"" type='text' value=""""  maxlength='255' tabIndex='1' /><span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<li  class='mktFormReq mktField' ><label>Customer First Name:</label><span class='mktInput'>" & vbCrLf & _
"<input class='mktFormText mktFReq' " & vbCrLf & _
"name=""FirstName"" id=""FirstName"" type='text' value=""""  maxlength='255' tabIndex='2' />" & vbCrLf & _
"<span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<li  class='mktFormReq mktField' ><label>Customer Last Name:</label><span class='mktInput'><input class='mktFormText mktFReq'" & vbCrLf & _ 
"name=""LastName"" id=""LastName"" type='text' value=""""  maxlength='255' tabIndex='3' /><span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<li  class='mktField' ><label>Customer Phone:</label><span class='mktInput'><input class='mktFormText mktFReq' name=""MobilePhone""" & vbCrLf & _ 
"id=""MobilePhone"" type='text' value=""""  maxlength='255' tabIndex='4' /><span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<li  class='mktFormReq mktField' ><label>Customer Consented to Referral:</label><span class='mktInput'>" & vbCrLf & _
"<input class='mktFormCheckbox' name=""Permissions-Email"" id=""Permissions-Email"" type='checkbox' tabIndex='5' /><span" & vbCrLf & _ 
"class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<li  class='mktFormReq mktField'><label>Lead Source:</label>" & vbCrLf & _
"<span class='mktInput'>" & vbCrLf & _
"<select class='mktFormSelect mktFReq' name=""KBCLeadSource"" id=""KBCLeadSource"" size='1'  tabIndex='6'>" & vbCrLf & _
"""<option value='' selected='selected'>Select...</option><option value='Direct Sales'>Direct Sales</option><option value='Direct" & vbCrLf & _
" Service'>Direct Service</option><option value='Baggot St'>Baggot St. - Dublin</option><option value='Grand Canal - Dublin'>Grand Canal - Dublin</option><option value='Swords'>Swords - Dublin</option><option value='Stillorgan'>Stillorgan - Dublin</option><option value='Cork'>Cork</option><option value='Galway'>Galway</option><option " & vbCrLf & _
"value='Limerick'>Limerick</option><option value='SandwithSt'>Sandwith St.</option><option value='Agile'>Agile</option></select><div" & vbCrLf & _ 
"class='mktFormMsg'></div></span></li>" & vbCrLf & _
"" & vbCrLf & _
"<!-- Field for KBCAreaofInterest does not exist yet....could we use the generic 'Area of Interest'? -->" & vbCrLf & _
"<li  class='mktFormReq mktField' id=""areaOfInterestLine""><label>Area of Interest:</label>" & vbCrLf & _
"<span class='mktInput'>" & vbCrLf & _
"<select class='mktFormSelect mktFReq' name=""KBCAreaofInterest"" id=""KBCAreaofInterest"" size='1'  tabIndex='7'>" & vbCrLf & _
"""<option value='' selected='selected'>Select...</option><option value='Mortgage Life Insurance'>Mortgage Life Insurance" & vbCrLf & _
"</option><option value='Term Life Insurance'>Term Life Insurance</option>" & vbCrLf & _
"<option value='Life Long Insurance'>Life Long Insurance</option>" & vbCrLf & _
"<option value='Income Insurance'>Income Insurance</option></select><div class='mktFormMsg'></div></span></li>" & vbCrLf & _
"<li  class='mktFormReq mktField' id=""followUpRatingLine""><label>Follow up rating:</label>" & vbCrLf & _
"<span class='mktInput'>" & vbCrLf & _
"<select class='mktFormSelect mktFReq' name=""LastDirectSalesAgentRating"" id=""LastDirectSalesAgentRating"" size='1'  tabIndex='7'>" & vbCrLf & _
"<option value='3' selected='selected'>3</option><option value='2'>2</option><option value='1'>1</option>" & vbCrLf & _
"</select><div class='mktFormMsg'></div></span></li>" & vbCrLf & _
"" & vbCrLf & _
"<li  class='mktFormReq mktField' id=""BestTimeToContactLine""><label>Best Time to Contact:</label>" & vbCrLf & _
"<span class='mktInput'>" & vbCrLf & _
"<select class='mktFormSelect mktFReq' name=""PerferredTimeToContact"" id=""PerferredTimeToContact"" size='1'  tabIndex='8'>" & vbCrLf & _
"<option value='' selected='selected'>Select...</option>" & vbCrLf & _
"<option value='Now'>Now</option><option value='Anytime'  " & vbCrLf & _
"selected='selected'>Anytime</option><option value='Morning (before 12pm)'>Morning" & vbCrLf & _ 
"(before 12pm)</option><option value='Afternoon (12pm to 5pm)'>Afternoon (12pm to 5pm)</option>" & vbCrLf & _
"<option value='Evening (5pm to 8pm)'>Evening " & vbCrLf & _
"(5pm to 8pm)</option></select><div class='mktFormMsg'></div></span></li>" & vbCrLf & _
"" & vbCrLf & _
"<!-- Inputted as mktInput rather then checkbox -->" & vbCrLf & _
"<li  class='mktFormReq mktField'><label>KBC Exisitng Customer:</label>" & vbCrLf & _
"<span class='mktInput'>" & vbCrLf & _
"<select class='mktFormSelect mktFReq' name=""KBCExistingCustomer"" id=""KBCExistingCustomer"" size='1'  tabIndex='9'>" & vbCrLf & _
"<option value='' selected='selected'>Select...</option><option value='Yes'>Yes</option><option value='No'>No</option></select><div" & vbCrLf & _ 
"class='mktFormMsg'></div></span></li>" & vbCrLf & _
"" & vbCrLf & _
"<li  class='mktFormReq mktField' ><label>KBC Staff ID:</label><span class='mktInput'><input class='mktFormText mktFReq' name=""KBCStaffID""" & vbCrLf & _ 
"id=""KBCStaffID"" type='text' value=""""  maxlength='255' tabIndex='10' /><span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<li  class='mktFormReq mktField' ><label>KBC Staff Name:</label><span class='mktInput'><input class='mktFormText mktFReq'" & vbCrLf & _ 
"name=""KBCStaffName"" id=""KBCStaffName"" type='text' value=""""  maxlength='255' tabIndex='11' /><span" & vbCrLf & _ 
"class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<!--Not too sure about all the remaining code-->" & vbCrLf & _
"<li  class='mktField' style=""display: none;""><label>Lead Source Detail:</label><span class='mktInput'><input class='mktFormHidden'" & vbCrLf & _ 
"name=""LeadSourceDetail"" id=""LeadSourceDetail"" type='hidden' value=""BNA Referral"" /><span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"<!-- Not too sure if I can just put in KBC Staff Name as this will only be populated after staff go onto landing page??" & vbCrLf & _
"<li  class='mktField' style=""display: none;""><label>Last KBC Staff Name:</label><span class='mktInput'><input class='mktFormHidden'" & vbCrLf & _ 
"name=""KBCStaffName"" id=""KBCStaffName"" type='hidden' value=""KBC Customer Service"" /><span class='mktFormMsg'></span></span></li>" & vbCrLf & _
"-->" & vbCrLf & _
"<li id='mktFrmButtons'><label>&nbsp;</label><input id='mktFrmSubmit' type='button' style=""width: auto; overflow: visible; padding-left:"& _ 
".25em; padding-right: .25em;"" value='Submit' name='submitButton' onclick='formSubmit(""theForm""); return " & vbCrLf & _
"false;' />&nbsp;<input style='display: none;' id='mktFrmReset' type='reset'" & vbCrLf & _
              "value='Clear' name='resetButton' /></li>  </ul>" & vbCrLf & _
"  <span style=""display:none;""><input type=""text"" name=""_marketo_comments"" value="""" /></span>" & vbCrLf & _
  "</form>" & vbCrLf & _
"<script type=""text/javascript"">" & vbCrLf & _
"var Mkto = {" & vbCrLf & _
  "kv : []," & vbCrLf & _
  "kvUrl : null," & vbCrLf & _
  "kvReferrer : null," & vbCrLf & _
  "pageSubmitted: false," & vbCrLf & _
  "defaultMessages : {" & vbCrLf & _
    "English : {" & vbCrLf & _
      "required : ""This field is required""," & vbCrLf & _
      "selectRequired : ""Please select a value for this field""," & vbCrLf & _
      "emailInvalid : ""Please enter a valid email address""," & vbCrLf & _
      "telephoneInvalid : ""Please enter a valid telephone number""," & vbCrLf & _
      "pleaseWait : ""Please wait""" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
"};" & vbCrLf & _
"" & vbCrLf & _
"Mkto.parseUrlParams = function(url) {" & vbCrLf & _
  "var query;" & vbCrLf & _
  "var q = url.indexOf('?');" & vbCrLf & _
  "if (q > -1) {" & vbCrLf & _
    "query = url.substr(q+1);" & vbCrLf & _
    "var pairs = query.split(""&"");" & vbCrLf & _
    "for (var i =0; i < pairs.length; i++) {" & vbCrLf & _
      "var kvArray = pairs[i].split(""="");" & vbCrLf & _
      "Mkto.kv[kvArray[0]] = kvArray[1];" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
  "return Mkto.kv;" & vbCrLf & _
"}" & vbCrLf & _
"Mkto.getValue =  function(key, kv) {" & vbCrLf & _
  "if (typeof Mkto.kv[key] == 'string') {" & vbCrLf & _
    "return decodeURIComponent(Mkto.kv[key].replace(/\+/g, ' '));" & vbCrLf & _
  "} else {" & vbCrLf & _
    "return ""not found"";" & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"Mkto.getReferrerParam = function(key) {" & vbCrLf & _
  "return Mkto.getValue(key, Mkto.kvReferrer);" & vbCrLf & _
"}" & vbCrLf & _
"Mkto.getUrlParam = function(key) {" & vbCrLf & _
  "return Mkto.getValue(key, Mkto.kvUrl);" & vbCrLf & _
"}" & vbCrLf & _
" " & vbCrLf & _
"Mkto.fomSubmit = function(elt) {" & vbCrLf & _
  "for (var i=0; i < elt.elements.length; i++) {" & vbCrLf & _
    "Mkto.clearError(elt.elements[i]);" & vbCrLf & _
  "} " & vbCrLf & _
  "var submitButton = null;" & vbCrLf & _
  "var allowSubmit = true;" & vbCrLf & _
  "try {" & vbCrLf & _
    "Mkto.recomputeMessages();" & vbCrLf & _
  "} catch (e) {}" & vbCrLf & _
  "for (var i=0; i < elt.elements.length; i++) {" & vbCrLf & _
    "var fld = elt.elements[i];" & vbCrLf & _
    "if (!Mkto.validateField(fld)) {" & vbCrLf & _
      "allowSubmit = false;" & vbCrLf & _
    "}" & vbCrLf & _
    "if (fld.name == ""cr"") {" & vbCrLf & _
      "fld.value = Mkto.getUrlParam(""cr"");" & vbCrLf & _
    "}" & vbCrLf & _
    "if (fld.name == ""kw"") {" & vbCrLf & _
      "fld.value = Mkto.getUrlParam(""kw"");" & vbCrLf & _
    "}" & vbCrLf & _
    "if (fld.name == ""searchstr"") {" & vbCrLf & _
      "fld.value = Mkto.getReferrerParam(""q"");" & vbCrLf & _
    "}" & vbCrLf & _
    "if (fld.name == ""submitButton"") {" & vbCrLf & _
      "submitButton = fld;" & vbCrLf & _
    "}" & vbCrLf & _
    "if (fld.name == '_marketo_comments') {" & vbCrLf & _
      "Mkto.addField(elt, 'hidden', '_comments_marketo', fld.value);" & vbCrLf & _
    "}" & vbCrLf & _
    "if (fld.type == 'checkbox') {" & vbCrLf & _
      "var hidden = null;" & vbCrLf & _
"" & vbCrLf & _
      "var related = document.getElementsByName(fld.name);" & vbCrLf & _
      "for (var j=0; j < related.length; j++) {" & vbCrLf & _
        "if (related[j].type == 'hidden') {" & vbCrLf & _
          "hidden = related[j];" & vbCrLf & _
          "break;" & vbCrLf & _
        "} " & vbCrLf & _
      "}" & vbCrLf & _
"" & vbCrLf & _
"      if (fld.checked) {" & vbCrLf & _
        "if (hidden) {" & vbCrLf & _
          "hidden.parentNode.removeChild(hidden);" & vbCrLf & _
        "}            " & vbCrLf & _
      "}" & vbCrLf & _
      "else if (!hidden) {" & vbCrLf & _
        "try {" & vbCrLf & _
          "hidden = document.createElement(""<input type='hidden' name='"" + fld.name + ""' value='0'>"");" & vbCrLf & _
        "}" & vbCrLf & _
        "catch (e) {" & vbCrLf & _
          "hidden = document.createElement(""input"");" & vbCrLf & _
          "hidden.setAttribute('type', 'hidden');" & vbCrLf & _
          "hidden.setAttribute('name', fld.name);" & vbCrLf & _
          "hidden.setAttribute('value', 0);" & vbCrLf & _
        "}" & vbCrLf & _
        "elt.appendChild(hidden);" & vbCrLf & _
      "}" & vbCrLf & _
    "}" & vbCrLf & _
  "} " & vbCrLf & _
  "Mkto.addField(elt, 'hidden', '_mkto_version', '2.4.7');" & vbCrLf & _
"" & vbCrLf & _
  "var syndicationId = Mkto.captureSyndicationId('__cdrop');" & vbCrLf & _
  "if(syndicationId !== null) {" & vbCrLf & _
    "Mkto.addField(elt, 'hidden', 'MarketoSocialSyndicationId', syndicationId);" & vbCrLf & _
  "}" & vbCrLf & _
  "if (allowSubmit) {" & vbCrLf & _
    "if (!Mkto.pageSubmitted) {" & vbCrLf & _
      "Mkto.pageSubmitted = true;" & vbCrLf & _
"" & vbCrLf & _
      "try {" & vbCrLf & _
        "if ((typeof Munchkin != 'undefined') && (typeof Munchkin.createTrackingCookie == 'function')) {" & vbCrLf & _
          "Munchkin.createTrackingCookie(true);" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
      "catch(e) {" & vbCrLf & _
"" & vbCrLf & _
      "}" & vbCrLf & _
"" & vbCrLf & _
"      elt.submit();" & vbCrLf & _
      "if (submitButton != null) {" & vbCrLf & _
        "var lang = typeof mktFormLanguage !== 'undefined' ? mktFormLanguage : 'English';" & vbCrLf & _
        "submitButton.disabled = true;" & vbCrLf & _
        "if (submitButton.value != 'Descargar') {" & vbCrLf & _
          "var msg = Mkto.messages[lang]['pleaseWait'];" & vbCrLf & _
          "if(lang === 'English' && msg == Mkto.defaultMessages[lang]['pleaseWait']) {" & vbCrLf & _
            "try {" & vbCrLf & _
              "msg = getPleaseWaitMessage(submitButton, lang);" & vbCrLf & _
            "} catch (e) {}" & vbCrLf & _
          "}" & vbCrLf & _
          "submitButton.value = msg;" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
    "} else {" & vbCrLf & _
      "allowSubmit = false;" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
  "if(allowSubmit){" & vbCrLf & _
    "var domain=Mkto.getLPDomain(document.location.hostname);" & vbCrLf & _
    "Mkto.clearLPCookie('_mkto_purl','/',domain);" & vbCrLf & _
"    " & vbCrLf & _
  "}" & vbCrLf & _
  "return allowSubmit;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.captureSyndicationId = function(name)" & vbCrLf & _
"{" & vbCrLf & _
  "var cookie = document.cookie;" & vbCrLf & _
  "var start = cookie.indexOf(name + '=');" & vbCrLf & _
  "if (start == -1) {" & vbCrLf & _
    "return null;" & vbCrLf & _
  "}" & vbCrLf & _
  "var len = start + name.length + 1;" & vbCrLf & _
  "var end = cookie.indexOf("";"", len);" & vbCrLf & _
  "if (end == -1) {" & vbCrLf & _
    "end = cookie.length;" & vbCrLf & _
  "}" & vbCrLf & _
  "var cookieval = cookie.substring(len, end);" & vbCrLf & _
  "var cookieparts = cookieval.split(""."");" & vbCrLf & _
  "if (cookieparts.length == 3) {" & vbCrLf & _
    "return cookieparts[2];" & vbCrLf & _
  "}" & vbCrLf & _
  "return null;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.addField = function(mform, type, name, value) {" & vbCrLf & _
  "try {" & vbCrLf & _
    "fld = document.createElement(""<input type='"" + type + ""' name='"" + name + ""' value='"" + value + ""'>"");" & vbCrLf & _
  "}" & vbCrLf & _
  "catch (e) {" & vbCrLf & _
    "fld = document.createElement(""input"");" & vbCrLf & _
    "fld.setAttribute('type', type);" & vbCrLf & _
    "fld.setAttribute('name', name);" & vbCrLf & _
    "fld.setAttribute('value', value);" & vbCrLf & _
  "}" & vbCrLf & _
  "mform.appendChild(fld);" & vbCrLf & _
"}" & vbCrLf & _
"Mkto.recomputeMessages = function () {" & vbCrLf & _
  "function applyIf (reciever, defaults) {" & vbCrLf & _
    "if(defaults) {" & vbCrLf & _
      "for (var property in defaults) {" & vbCrLf & _
        "if(defaults.hasOwnProperty(property)) {" & vbCrLf & _
          "if(reciever[property] === undefined) {" & vbCrLf & _
            "reciever[property] = defaults[property];" & vbCrLf & _
          "} else {" & vbCrLf & _
            "applyIf(reciever[property], defaults[property])" & vbCrLf & _
          "}" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
    "}" & vbCrLf & _
    "return reciever;" & vbCrLf & _
  "}" & vbCrLf & _
  "if(!Mkto.messages) {" & vbCrLf & _
    "Mkto.messages = {};" & vbCrLf & _
  "}" & vbCrLf & _
  "applyIf(Mkto.messages, Mkto.defaultMessages);" & vbCrLf & _
"}" & vbCrLf & _
"Mkto.validateField = function(fld) {" & vbCrLf & _
  "var valid = true;" & vbCrLf & _
  "var msg = null;" & vbCrLf & _
  "var lang = typeof mktFormLanguage !== 'undefined'  ? mktFormLanguage : 'English';" & vbCrLf & _
  "var required = (fld.className.indexOf('mktFReq') != -1);" & vbCrLf & _
  "if (typeof fieldValidate == 'function') {" & vbCrLf & _
     "valid = fieldValidate(fld);" & vbCrLf & _
  "}" & vbCrLf & _
  "if (valid == 'skip') {" & vbCrLf & _
    "valid = true;" & vbCrLf & _
  "} else {" & vbCrLf & _
    "var label = null;" & vbCrLf & _
    "try {" & vbCrLf & _
      "label = fld.parentNode.parentNode.getElementsByTagName('label')[0].innerHTML;" & vbCrLf & _
    "} catch (e) {}" & vbCrLf & _
    "if (valid === true) {" & vbCrLf & _
      "if (required) {" & vbCrLf & _
        "if ((fld.tagName.toUpperCase() == 'INPUT') || (fld.tagName.toUpperCase() == 'TEXTAREA'))  {" & vbCrLf & _
          "if (fld.value.replace(/^\s+/g, """").length == 0) {" & vbCrLf & _
            "msg = Mkto.messages[lang]['required'];" & vbCrLf & _
            "if(lang === 'English' && msg == Mkto.defaultMessages[lang]['required']) {" & vbCrLf & _
              "try {" & vbCrLf & _
                "msg = getRequiredFieldMessage(fld, label, lang);" & vbCrLf & _
              "} catch (e) {}" & vbCrLf & _
            "}" & vbCrLf & _
            "Mkto.setError(fld, msg);" & vbCrLf & _
            "valid = false;" & vbCrLf & _
          "}" & vbCrLf & _
        "} else if (fld.tagName.toUpperCase() == 'SELECT') {" & vbCrLf & _
          "if (fld.selectedIndex <= 0) {" & vbCrLf & _
            "msg = Mkto.messages[lang]['selectRequired'];" & vbCrLf & _
            "if(lang === 'English' && msg == Mkto.defaultMessages[lang]['selectRequired']) {" & vbCrLf & _
              "try {" & vbCrLf & _
                "msg = getRequiredFieldMessage(fld, label, lang);" & vbCrLf & _
              "} catch (e) {}" & vbCrLf & _
            "}" & vbCrLf & _
            "Mkto.setError(fld, msg);" & vbCrLf & _
            "valid = false;" & vbCrLf & _
          "}" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
    "}" & vbCrLf & _
    "if (valid && required && (fld.className.indexOf('mktFormEmail') != -1)) {" & vbCrLf & _	
	"      var emailValid = /^[a-zA-Z0-9_!&=`~#%'\/\$\^\|\+\?\{\}-]+(\.[a-zA-Z0-9_!&=`~#%'\/\$\^\|\+\?\{\}-]+)*@[a-zA-Z0-9]([a-zA-Z0-9_-])*(\.[a-zA-Z0-9][a-zA-Z0-9_-]*)+$/; " & vbCrLf & _	
	 "if (!emailValid.test(fld.value)) {" & vbCrLf & _
        "msg = Mkto.messages[lang]['emailInvalid'];" & vbCrLf & _
        "if(lang === 'English' && msg == Mkto.defaultMessages[lang]['emailInvalid']) {" & vbCrLf & _
          "try {" & vbCrLf & _
            "msg = getEmailInvalidMessage(fld, label, lang);" & vbCrLf & _
          "} catch (e) {}" & vbCrLf & _
        "}" & vbCrLf & _
        "Mkto.setError(fld, msg);" & vbCrLf & _
        "valid = false;" & vbCrLf & _
      "}" & vbCrLf & _
    "}" & vbCrLf & _
    "if (valid && required && (fld.className.indexOf('mktFormPhone') != -1)) {" & vbCrLf & _
      "var phoneValidChars = /^[0-9()+. \t-]+$/;" & vbCrLf & _
"      " & vbCrLf & _
      "var digCount = 0;" & vbCrLf & _
      "var digits = ""0123456789"";" & vbCrLf & _
      "for (var ix = 0; ix < fld.value.length; ix++) {" & vbCrLf & _
        "if (digits.indexOf(fld.value.charAt(ix)) != -1) {" & vbCrLf & _
          "digCount++;" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
"      " & vbCrLf & _
      "if (!phoneValidChars.test(fld.value) || (digCount < 8) || (digCount > 15)) {" & vbCrLf & _
        "msg = Mkto.messages[lang]['telephoneInvalid'];" & vbCrLf & _
        "if(lang === 'English' && msg == Mkto.defaultMessages[lang]['telephoneInvalid']) {" & vbCrLf & _
          "try {" & vbCrLf & _
            "msg = getTelephoneInvalidMessage(fld, label, lang);" & vbCrLf & _
          "} catch (e) {}" & vbCrLf & _
        "}" & vbCrLf & _
        "Mkto.setError(fld, msg);" & vbCrLf & _
        "valid = false;" & vbCrLf & _
      "}" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
  "return valid;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.getMessage = function(fld) {" & vbCrLf & _
  "var msgContainer = fld.nextSibling;" & vbCrLf & _
  "while (msgContainer && msgContainer.nodeType != 1) {" & vbCrLf & _
    "msgContainer = msgContainer.nextSibling;" & vbCrLf & _
  "}" & vbCrLf & _
  "return msgContainer;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.addListener = function(elt, eventName, handler) {" & vbCrLf & _
  "if (window.addEventListener) {" & vbCrLf & _
    "elt.addEventListener(eventName, handler, false);" & vbCrLf & _
  "} else if (window.attachEvent) {" & vbCrLf & _
    "elt.attachEvent(""on"" + eventName, handler);" & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.clearError = function(fld) {" & vbCrLf & _
  "var loc = fld.parentNode.className.indexOf("" mktError"");" & vbCrLf & _
  "if (loc != -1) {" & vbCrLf & _
    "fld.parentNode.className = fld.parentNode.className.substr(0, loc);" & vbCrLf & _
    "fld.parentNode.parentNode.title = """";" & vbCrLf & _
    "var msgContainer = Mkto.getMessage(fld);" & vbCrLf & _
    "msgContainer.innerHTML = """";" & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.clearOnClick = function(e) {" & vbCrLf & _
  "var fld = this;" & vbCrLf & _
  "if (fld == window) {" & vbCrLf & _
    "fld = e.srcElement;" & vbCrLf & _
  "}" & vbCrLf & _
  "Mkto.clearError(fld);" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.getLPDomain=function(hostname){" & vbCrLf & _
  "var hostRegex = /([^.]+\.[^.]{3,})$/i;" & vbCrLf & _
  "var foundDomain = hostRegex.exec(hostname);" & vbCrLf & _
"" & vbCrLf & _
  "if (foundDomain != null) {" & vbCrLf & _
    "return foundDomain[1];" & vbCrLf & _
  "}" & vbCrLf & _
  "else {" & vbCrLf & _
    "var countryHostRegex = /([^.]+\.[^.]+\.[^.]{2})$/i;" & vbCrLf & _
    "foundDomain = countryHostRegex.exec(hostname);" & vbCrLf & _
"" & vbCrLf & _
    "if (foundDomain != null) {" & vbCrLf & _
      "return foundDomain[1];" & vbCrLf & _
    "}" & vbCrLf & _
    "else {" & vbCrLf & _
      "return hostname;" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.setError = function(fld, message) {" & vbCrLf & _
  "fld.parentNode.className += "" mktError"";" & vbCrLf & _
  "fld.parentNode.parentNode.title = message;" & vbCrLf & _
  "var msgContainer = Mkto.getMessage(fld);" & vbCrLf & _
  "msgContainer.innerHTML = message;" & vbCrLf & _
  "msgContainer.style.left = (fld.parentNode.offsetWidth + 10) + ""px"";" & vbCrLf & _
  "Mkto.addListener(fld, 'focus', Mkto.clearOnClick);" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.formReset = function(elt) {" & vbCrLf & _
  "for (var i=0; i < elt.elements.length; i++) {" & vbCrLf & _
    "Mkto.clearError(elt.elements[i]);" & vbCrLf & _
  "}  " & vbCrLf & _
  "elt.reset();" & vbCrLf & _
  "return true;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.doesOptionMatchValue = function(optionValue, leadValue) {" & vbCrLf & _
  "var match = false;" & vbCrLf & _
  "if (leadValue === false) {" & vbCrLf & _
    "if ((optionValue.toLowerCase() == ""no"") || (optionValue == ""0"") || (optionValue.toLowerCase() == ""false"")) {" & vbCrLf & _
      "match = true;" & vbCrLf & _
    "}" & vbCrLf & _
  "} else if (leadValue === true) {" & vbCrLf & _
    "if ((optionValue.toLowerCase() == ""yes"") || (optionValue == ""1"") || (optionValue.toLowerCase() == ""true"")) {" & vbCrLf & _
      "match = true;" & vbCrLf & _
    "}" & vbCrLf & _
  "} else if (optionValue == leadValue) {" & vbCrLf & _
    "match = true;" & vbCrLf & _
  "}" & vbCrLf & _
  "return match;" & vbCrLf & _
"}" & vbCrLf & _
" " & vbCrLf & _
"Mkto.preFillForm = function() {" & vbCrLf & _
  "var theForm = mktoGetForm();" & vbCrLf & _
  "if ((theForm) && (typeof mktoPreFillFields != 'undefined') && (mktoPreFillFields)) {" & vbCrLf & _
    "for (var fld in mktoPreFillFields) {" & vbCrLf & _
      "if ((mktoPreFillFields[fld] !== null) && theForm[fld] && typeof theForm[fld] == 'object') {" & vbCrLf & _
        "var ff = theForm[fld];" & vbCrLf & _
        "if (ff.mktoX) {" & vbCrLf & _
          "ff.mktoX.prefilled = true;" & vbCrLf & _
        "}" & vbCrLf & _
        "if ((ff.type == 'text') || (ff.type == 'textarea')) {" & vbCrLf & _
          "if (!ff.value) {" & vbCrLf & _
            "ff.value = mktoPreFillFields[fld];" & vbCrLf & _
          "}" & vbCrLf & _
        "} else if (ff.type == 'select-one') {" & vbCrLf & _
          "ff.mktoX.prefilled = false;  " & vbCrLf & _
          "var required = (ff.className.indexOf('mktFReq') != -1);" & vbCrLf & _
          "if ((ff.selectedIndex == 0) && (!ff.multiple)) {" & vbCrLf & _
            "for (var ix = 0; ix < ff.options.length; ix++) {" & vbCrLf & _
              "if (Mkto.doesOptionMatchValue(ff.options[ix].value,mktoPreFillFields[fld])) {" & vbCrLf & _
                "ff.selectedIndex = ix;" & vbCrLf & _
                "if (ff.mktoX) {" & vbCrLf & _
                  "if ((ix != 0) || (!required)) {" & vbCrLf & _
                    "ff.mktoX.prefilled = true;" & vbCrLf & _
                  "}" & vbCrLf & _
                "}" & vbCrLf & _
                "break;" & vbCrLf & _
              "}" & vbCrLf & _
            "}" & vbCrLf & _
"" & vbCrLf & _
            "if (ff.mktoX.prefilled == false) { " & vbCrLf & _
              "var option = document.createElement(""option"");" & vbCrLf & _
              "option.value = option.text = mktoPreFillFields[fld];" & vbCrLf & _
              "ff.options.add(option);" & vbCrLf & _
              "ff.selectedIndex = ff.options.length * 1 - 1;" & vbCrLf & _
              "if (ff.mktoX) {" & vbCrLf & _
                "ff.mktoX.prefilled = true;" & vbCrLf & _
              "}" & vbCrLf & _
            "}" & vbCrLf & _
"" & vbCrLf & _
          "}" & vbCrLf & _
        "} else if (ff.type == 'checkbox') {" & vbCrLf & _
          "if (mktoPreFillFields[fld]) {" & vbCrLf & _
            "ff.setAttribute(""checked"", ""checked"");" & vbCrLf & _
          "} else {" & vbCrLf & _
            "ff.removeAttribute(""checked"");" & vbCrLf & _
          "}" & vbCrLf & _
        "} else if (!ff.type && ff.length) {" & vbCrLf & _
          "var ff = theForm[fld];" & vbCrLf & _
          "var radioFilled = false;" & vbCrLf & _
          "for ( var ix = 0; ix < ff.length; ix++) {" & vbCrLf & _
            "ff[ix].mktoX.prefilled = false;  " & vbCrLf & _
          "}" & vbCrLf & _
          "for ( var ix = 0; ix < ff.length; ix++) {" & vbCrLf & _
            "var preValue = mktoPreFillFields[fld];" & vbCrLf & _
            "if (preValue === true) {" & vbCrLf & _
              "preValue = 'Yes';" & vbCrLf & _
            "} else if (preValue === false) {" & vbCrLf & _
              "preValue = ""No"";" & vbCrLf & _
            "}" & vbCrLf & _
            "if (ff[ix].value == preValue) {" & vbCrLf & _
              "ff[ix].setAttribute(""checked"", ""checked"");" & vbCrLf & _
              "radioFilled = true;" & vbCrLf & _
              "break;" & vbCrLf & _
            "}" & vbCrLf & _
          "}" & vbCrLf & _
          "if (radioFilled) {" & vbCrLf & _
            "for ( var ix = 0; ix < ff.length; ix++) {" & vbCrLf & _
              "ff[ix].mktoX.prefilled = true;" & vbCrLf & _
            "}" & vbCrLf & _
          "}" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"Mkto.initForm = function() {" & vbCrLf & _
  "var theForm = mktoGetForm();" & vbCrLf & _
"" & vbCrLf & _
  "for (var ix = 0; ix < theForm.length; ix++) {" & vbCrLf & _
    "if (theForm[ix].name == ""submitButton"") {" & vbCrLf & _
      "break;" & vbCrLf & _
    "}" & vbCrLf & _
    "theForm[ix].mktoX = {prefilled: false};" & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"Mkto.processProfiling = function() {" & vbCrLf & _
  "var theForm = mktoGetForm();" & vbCrLf & _
  "if (profiling.isEnabled) {" & vbCrLf & _
    "var maxShownFields = profiling.numberOfProfilingFields;" & vbCrLf & _
    "var shownFields = 0;" & vbCrLf & _
    "var fieldsToRemove = [];" & vbCrLf & _
    "var lastFieldName = """";" & vbCrLf & _
    "for (var ix = 0; ix < theForm.length; ix++) {" & vbCrLf & _
      "var ff = theForm[ix];" & vbCrLf & _
      "if (ff.type == ""hidden"") {" & vbCrLf & _
        "continue;" & vbCrLf & _
      "}" & vbCrLf & _
      "if (ff.type == ""radio"" && ff.name == lastFieldName) {" & vbCrLf & _
        "continue; " & vbCrLf & _
      "}" & vbCrLf & _
      "if (ff.name == ""submitButton"") {" & vbCrLf & _
        "break;" & vbCrLf & _
      "}" & vbCrLf & _
      "if (ff.name == ""resetButton"") {" & vbCrLf & _
        "break;" & vbCrLf & _
      "}" & vbCrLf & _
      "var required = (ff.className.indexOf('mktFReq') != -1);" & vbCrLf & _
      "var fieldNameWithoutDeco = Mkto.getFieldNameWithoutDeco(ff);" & vbCrLf & _
      "if (profiling.alwaysShowFields.indexOf(fieldNameWithoutDeco) == -1) {" & vbCrLf & _
        "if (ff.mktoX && ff.mktoX.prefilled) {" & vbCrLf & _
          "Mkto.hideField(ff);" & vbCrLf & _
          "fieldsToRemove.push(ff);" & vbCrLf & _
        "} else if (shownFields < maxShownFields) {" & vbCrLf & _
           "shownFields++;" & vbCrLf & _
        "} else {" & vbCrLf & _
           "Mkto.hideField(ff);" & vbCrLf & _
           "fieldsToRemove.push(ff);" & vbCrLf & _
        "}" & vbCrLf & _
      "}" & vbCrLf & _
      "lastFieldName = ff.name;" & vbCrLf & _
    "}" & vbCrLf & _
    "for (var ix = fieldsToRemove.length; ix > 0; ix--) {" & vbCrLf & _
      "var field = fieldsToRemove[ix-1];" & vbCrLf & _
      "field.parentNode.removeChild(field); " & vbCrLf & _
    "}" & vbCrLf & _
  "}  " & vbCrLf & _
"}" & vbCrLf & _
"Mkto.getFieldNameWithoutDeco = function (ff) {" & vbCrLf & _
  "var retVal = ff.name;" & vbCrLf & _
  "if (ff.type && (ff.type == 'select-multiple')) {" & vbCrLf & _
    "if( ff.name.indexOf('[]') != -1) {" & vbCrLf & _
      "retVal = ff.name.slice(0, ff.name.indexOf('[]'));" & vbCrLf & _
    "}" & vbCrLf & _
  "}" & vbCrLf & _
  "return  retVal;" & vbCrLf & _
"};" & vbCrLf & _
"" & vbCrLf & _
"Mkto.hideField = function(field) {" & vbCrLf & _
  "var elt = field;" & vbCrLf & _
  "while (elt.parentNode && elt.tagName.toLowerCase() != ""li"") {" & vbCrLf & _
    "elt = elt.parentNode;" & vbCrLf & _
  "}" & vbCrLf & _
  "if (elt.tagName.toLowerCase() == ""li"") {" & vbCrLf & _
    "elt.style.display = ""none""; " & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"</script>" & vbCrLf & _
"<script type=""text/javascript"">" & vbCrLf & _
"" & vbCrLf & _
"function isEmail(email){" & vbCrLf & _
"return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );" & vbCrLf & _
"} " & vbCrLf & _
"" & vbCrLf & _
"function validateForm()" & vbCrLf & _
"{" & vbCrLf & _
	"valid = true;" & vbCrLf & _
  "if (!isEmail(document.getElementById('Email').value))" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('A valid Email Address is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
    "if (valid && isKBCEmail(document.getElementById('Email').value.toLowerCase()))" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('You cannot use KBC email addresses here');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _  
"  " & vbCrLf & _
"  " & vbCrLf & _
  "if (valid && document.getElementById('FirstName').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('First Name is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"  " & vbCrLf & _
  "if (valid && document.getElementById('LastName').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('Last Name is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"  " & vbCrLf & _
  "if (valid && document.getElementById('KBCLeadSource').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('Lead Source is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"  " & vbCrLf & _
    "if (valid && document.getElementById('KBCAreaofInterest').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('An Area of Interest is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"  " & vbCrLf & _
    "if (valid && document.getElementById('PerferredTimeToContact').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('Best Time to Contact is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"	" & vbCrLf & _
	  "if (valid && document.getElementById('KBCExistingCustomer').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('KBC Existing Customer is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"  " & vbCrLf & _
    "if (valid && document.getElementById('KBCStaffID').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('KBC Staff ID is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"  " & vbCrLf & _
    "if (valid && document.getElementById('KBCStaffName').value == '')" & vbCrLf & _
  "{" & vbCrLf & _
	"alert('KBC Staff Name is required');" & vbCrLf & _
	"valid = false;" & vbCrLf & _
  "}" & vbCrLf & _
"" & vbCrLf & _
	"return valid;" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"function formSubmit(elt) {" & vbCrLf & _
	"var validForm = validateForm();" & vbCrLf & _
	"if (validForm)" & vbCrLf & _
	"{" & vbCrLf & _
"  " & vbCrLf & _
  "mkAssociateLeadKBC(" & vbCrLf & _
  "document.getElementById('Email').value," & vbCrLf & _
  "document.getElementById('FirstName').value," & vbCrLf & _
  "document.getElementById('LastName').value," & vbCrLf & _
  "document.getElementById('MobilePhone').value," & vbCrLf & _
  "document.getElementById('Permissions-Email').checked," & vbCrLf & _
  "document.getElementById('KBCAreaofInterest').value," & vbCrLf & _
  "document.getElementById('LastDirectSalesAgentRating').value," & vbCrLf & _  
  "document.getElementById('PerferredTimeToContact').value," & vbCrLf & _
  "document.getElementById('KBCLeadSource').value," & vbCrLf & _
  "document.getElementById('KBCExistingCustomer').value," & vbCrLf & _
  "document.getElementById('KBCStaffID').value," & vbCrLf & _
  "document.getElementById('KBCStaffName').value);" & vbCrLf & _
"  " & vbCrLf & _
  "alert('Details submitted');" & vbCrLf & _
"  " & vbCrLf & _
  "document.getElementById('Email').value = '';" & vbCrLf & _
  "document.getElementById('FirstName').value = '';" & vbCrLf & _
  "document.getElementById('LastName').value = '';" & vbCrLf & _
  "document.getElementById('MobilePhone').value = '';" & vbCrLf & _
  "document.getElementById('Permissions-Email').checked = false;" & vbCrLf & _
  "document.getElementById('KBCAreaofInterest').value  = '';" & vbCrLf & _
  "document.getElementById('PerferredTimeToContact').value  = '';" & vbCrLf & _
  "document.getElementById('KBCLeadSource').value  = '';" & vbCrLf & _
  "document.getElementById('KBCExistingCustomer').value  = '';" & vbCrLf & _
  "document.getElementById('LastDirectSalesAgentRating').value  = '3';" & vbCrLf & _  
"  " & vbCrLf & _
"  " & vbCrLf & _
  "}" & vbCrLf & _
"}" & vbCrLf & _
"" & vbCrLf & _
"</script>" & vbCrLf & _
"<script type=""text/javascript"">" & vbCrLf & _
"document.getElementById('Email').value = gup('emailAddress');" & vbCrLf & _
"document.getElementById('FirstName').value = gup('CustomerFirstName');" & vbCrLf & _
"document.getElementById('LastName').value = gup('CustomerLastName');" & vbCrLf & _
"document.getElementById('MobilePhone').value = gup('CustomerPhone').replace(""%20"","""");" & vbCrLf & _
"document.getElementById('KBCStaffID').value = gup('KBCStaffID').replace(""%20"","" "");" & vbCrLf & _
"document.getElementById('LeadSourceDetail').value = gup('BNAReferralArea');" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"</script></div></div>" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"<div id=""mktHeader"" class=""mktEditable"">" & vbCrLf & _
  "<!-- Logo and Header -->" & vbCrLf & _
  "<div class=""logo""><a href=""http://www.kbc.ie""><img src=""https://www.irishlife.ie/secureWeb/uploadedImages/KBC_image.jpg"" /></a></div>" & vbCrLf & _
"</div>" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"<div id=""mktContent"" class=""mktEditable"">" & vbCrLf & _
"<!-- Base of Landing Page Content -->" & vbCrLf & _
"" & vbCrLf & _
"" & vbCrLf & _
"</div>" & vbCrLf & _
"" & vbCrLf & _
"<div id=""mktFooter"" class=""mktEditable"">" & vbCrLf & _
"" & vbCrLf & _
	"<div class=""copyright"">" & vbCrLf & _
"" & vbCrLf & _
	"</div>" & vbCrLf & _
	"<div class=""footerlinks"">" & vbCrLf & _
"<small>" & vbCrLf & _
"KBC Bank Ireland plc is regulated by the Central Bank of Ireland" & vbCrLf & _
"Registered in the Republic of Ireland. Number 40537" & vbCrLf & _
"Registered Office: Sandwith Street, Dublin 2, Ireland. Phone <strong>1800 93 92 44</strong>, <a href=""http://www.kbc.ie/contactus""" & vbCrLf & _ 
"title=""Contact Us"">Contact KBC</a>.<br><br/>" & vbCrLf & _
"Irish Life Financial Services ltd. is regulated by the Central Bank of Ireland. Irish Life Assurance plc. is regulated by the Central Bank of" & vbCrLf & _ 
"Ireland.<br>" & vbCrLf & _
"Irish Life Financial Services ltd and Irish Life Assurance plc Registered Office - Lower Abbey Street, PO Box 129, Freepost, Dublin 1. Phone:" & vbCrLf & _ 
"<strong>01 704 2000</strong><br>" & vbCrLf & _
"Irish Life Financial Services Registered Number 489221. Irish Life Assurance plc Registered Number 152576.</small>" & vbCrLf & _
	"</div>" & vbCrLf & _
"      " & vbCrLf & _
"</div>" & vbCrLf & _
"<!-- END TEMPLATE HTML -->" & vbCrLf & _
"" & vbCrLf & _
"<!-- SYSTEM FOOTER - DO NOT EDIT -->" & vbCrLf & _
"</div>" & vbCrLf & _
"</div>" & vbCrLf & _
"<script src=""https://munchkin.marketo.net/munchkin.js"" type=""text/javascript""></script>" & vbCrLf & _
"<script src=""https://www.irishlife.ie/secureWeb/uploadedFiles/retail/js/mk.js?270314"" type=""text/javascript""></script></body>")
End If
%>
</html>