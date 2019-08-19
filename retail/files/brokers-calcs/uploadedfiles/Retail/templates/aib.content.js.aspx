<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/retail/templates/aib.content.js.aspx.vb" Inherits="content" Debug="false" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!doctype html>
<html>  
<head>
    <cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
    <cms:ContentBlock ID="ilfsCSS" runat="server" DefaultContentID="17036" SuppressWrapperTags="true" />
    <link rel="shortcut icon" href="http://www.aib.ie/favicon.ico" type="image/x-icon" />
    <meta http-equiv="X-UA-Compatible" content="IE=7" /> 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" type="text/css" href="/uploadedImages/retail/css/aib.css?300412" media="screen,print" />
</head>
	<body>
	<div class="containerGlobal">
        <div class="containerBody">
            <div class="containerHeader">
                <div class="aibHeaderDivlet"> 
                    <p>Welcome to AIB.ie</p>
                </div>
            </div>
            <div class="containerContent">
                <cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />
                
                <div class="containerFooter">
                    <div class="footerDivlet">
                    <p>Allied Irish Banks, p.l.c. is a tied agent of Irish Life Assurance plc, for life and pensions business.<br />
                    Allied Irish Banks, p.l.c. and Irish Life Assurance plc are regulated by the Central Bank of Ireland.</p>
                    </div>
                </div>
            </div>
        </div>
	</div>
    <cms:ContentBlock ID="ilfsJavascript" runat="server" DefaultContentID="17040" SuppressWrapperTags="true" />
    <script type="text/javascript">

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-16369698-10', 'irishlife.ie');
  ga('require', 'displayfeatures');
  ga('send', 'pageview');

    </script>
	</body>
</html>
