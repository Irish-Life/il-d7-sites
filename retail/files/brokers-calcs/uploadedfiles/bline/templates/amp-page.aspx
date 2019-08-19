<%@ Page Language="VB" AutoEventWireup="false" CodeFile="/uploadedFiles/bline/templates/amp-page.aspx.vb" Inherits="amppage" %>
<%@ Register TagPrefix="cms" Namespace="Ektron.Cms.Controls" Assembly="Ektron.Cms.Controls" %>
<!doctype html>
<html lang="en">
<head>
  <!-- Set the viewport width to device width for mobile -->
  <meta name="viewport" content="width=device-width" />
	<cms:MetaData ID="contentMetadata" runat="server" SuppressWrapperTags="true" DefaultContentID="62" DynamicParameter="id" GenerateDublinCore="false" />
	<asp:Literal ID="cssFiles" runat="server"></asp:Literal>

  <!--[if IE 7]>
        <link rel="stylesheet" type="text/css" href="/uploadedImages/bline/templates/css/ie7.css">
	<![endif]-->

</head>
<body>

	
  <nav class="top-bar">
    <ul>
      <!-- Title Area -->
      <li class="name">
        <h1>
          <a href="http://www.bline.ie/amp/home.html">
            Bline AM Page 
          </a>
        </h1>
      </li>
      <li class="toggle-topbar"><a href="#"></a></li>
    </ul>

    <section>
		<ul class="left">
			<asp:Literal runat="server" ID="menuText"></asp:Literal>
		</ul>
    </section>
  </nav>
  
  





<div class="container">

		<cms:ContentBlock ID="MainContentBlock" runat="server" DefaultContentID="36" SuppressWrapperTags="true" DynamicParameter="id" />


	<asp:Literal ID="ampfooter" runat="server"></asp:Literal>
</div>

	<asp:Literal ID="javascriptFiles" runat="server"></asp:Literal>
</body>

</html>