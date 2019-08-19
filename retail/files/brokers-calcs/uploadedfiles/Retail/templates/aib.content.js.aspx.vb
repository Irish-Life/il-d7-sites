
Imports System.IO
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Partial Class content
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
		Dim api as New Ektron.Cms.API.Content.Content
        
		Dim ilfsCSSID As String = ""
		Dim ilfsCSSContent as Integer = 6978
        
		Dim ilfsJavascriptID As String = ""
		Dim ilfsJavascriptContent as Integer = 6984
        
        '# Set the extra css files that might be required. 
        '# These are set in the metadata ilfsCSS section. 
        ilfsCSSID = MainContentBlock.GetMetaData.GetItemByName("ilfsCSS").Value
        If Len(ilfsCSSID) <> 0 Then
            ilfsCSSContent = CInt(ilfsCSSID)
        End If
        ilfsCSS.DefaultContentID = ilfsCSSContent
        
        '# extra JS
        ilfsJavascriptID = MainContentBlock.GetMetaData.GetItemByName("ilfsJavascript").Value
        If Len(ilfsJavascriptID) <> 0 Then
            ilfsJavascriptContent = CInt(ilfsJavascriptID)
        End If
        ilfsJavascript.DefaultContentID = ilfsJavascriptContent
        
        
        ' Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# Sets a default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If
		
    End Sub

End Class
