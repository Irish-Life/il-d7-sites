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
		
		ilfsGeneralCSS.Text = api.GetContent(21530).Html
		ilfsGeneralJS.Text = api.GetContent(21528).Html
		
		
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
        
        
		


    End Sub

End Class