Imports System
Imports System.IO
Imports System.Web.HttpContext
Imports System.Text
Imports System.Xml
Imports System.Web.UI
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Partial Class responsive
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
        Dim folderNameStr As String = ""
        Dim pageNameStr As String = ""
        Dim rhs_relatedValue As String = ""
        Dim menuId As Integer

		Dim api as New Ektron.Cms.API.Content.Content
		
		Dim ilfsFBOGID As String = ""
		Dim ilfsFBOGContent as Integer = 18790
		
		Dim ilfsCSSID As String = ""
		Dim ilfsCSSContent as Integer = 17036
        
		Dim ilfsJavascriptID As String = ""
		Dim ilfsJavascriptContent as Integer = 17040
		
		ilfsGeneralCSS.Text = api.GetContent(21422).Html
		 
		ilfsHeader.Text = api.GetContent(21428).Html
		
		ilfsMenu.Text = api.GetContent(21430).Html
		
		ilfsFooter.Text = api.GetContent(21426).Html
		ilfsSocial.Text = api.GetContent(21432).Html
		ilfsTandC.Text = api.GetContent(21434).Html
		
		ilfsGeneralJS.Text = api.GetContent(21424).Html
        '# Facebook use the site generic tags to get information but 
        '# it is sometimes best to set facebook specific text
        ilfsFBOGID = MainContentBlock.GetMetaData.GetItemByName("ilfsFBOG").Value
        If Len(ilfsFBOGID) <> 0 Then
            ilfsFBOGContent = CInt(ilfsFBOGID)
        End If
        ilfsFBOG.DefaultContentID = ilfsFBOGContent
		
        '# Set the extra css files that might be required. 
        '# These are set in the metadata ilfsCSS section. 
        ilfsCSSID = MainContentBlock.GetMetaData.GetItemByName("ilfsCSS").Value
        If Len(ilfsCSSID) <> 0 Then
            ilfsCSSContent = CInt(ilfsCSSID)
        End If
        ilfsCSS.DefaultContentID = ilfsCSSContent
        
        '# Set RHS Top Ad content
        ilfsJavascriptID = MainContentBlock.GetMetaData.GetItemByName("ilfsJavascript").Value
        If Len(ilfsJavascriptID) <> 0 Then
            ilfsJavascriptContent = CInt(ilfsJavascriptID)
        End If
        ilfsJavascript.DefaultContentID = ilfsJavascriptContent
        
        
        '# Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If
        
        
        '# Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If
        
        '# Display Folder Name & rumb end
        Dim pgCls As New Page
		
        '# Start Bcrumb
        breadcrumb.Text = pgCls.GetContentBreadCrumb(pageId)
                
        '# Set page Name & Breadcrumb end
        pageNameStr = Server.HtmlDecode(pgCls.GetPageName(pageId))
        If Len(pageNameStr) > 0 Then
            breadcrumbEnd.Text = LCase(pageNameStr)
        End If
		


    End Sub

End Class