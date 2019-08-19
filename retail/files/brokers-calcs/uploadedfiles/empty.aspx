<%@ Page Language="VB" AutoEventWireup="false" CodeFile="empty.aspx.vb" Inherits="content" Debug="true" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<html>
<head><title></title>
</head>
<body>
<asp:Literal ID="pageHtml" runat="server"></asp:Literal>
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-16369698-6']);
  _gaq.push(['_trackPageview']);
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
  var page = location.pathname;
  var div = document.createElement('div');
  div.innerHTML = '<img style="visibility:hidden" src="https://www.irishlife.ie/secure/tracking/il.gif?p='+page+';IP='+myIP()+'"/>';
  while (div.children.length > 0) {
    document.body.appendChild(div.children[0]);
  }
  
function myIP() {
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","http://api.hostip.info/get_html.php",false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText.split("\n");

    for (i=0; hostipInfo.length >= i; i++) {
        ipAddress = hostipInfo[i].split(": ");
        if ( ipAddress[0] == "IP" ) return ipAddress[1];
    }

    return 'unknown';
}
</script>
</script>
</body>
</html>