
Imports System.IO
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Partial Class content
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
		Dim api as New Ektron.Cms.API.Content.Content
        ' Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# Sets a default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If

		pageHtml.Text = api.GetContent(pageId).Html
		
    End Sub

End Class
