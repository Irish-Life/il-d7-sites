'*********************************************************************************
'
'  Author:		Stephen Hayden ()T529
'  Date Created:	Feb '12
'  Description:	Template page for bline.ie content page 
'
'*********************************************************************************
Imports System
Imports System.IO
Imports System.Web.HttpContext
Imports System.Text
Imports System.Xml
Imports System.Web.UI
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions
Imports System.Data.SqlClient

Partial Class article
    Inherits System.Web.UI.Page

	Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
	
		Dim pageId As Integer
		Dim api as New Ektron.Cms.API.Content.Content
        Dim pgCls As New Page
		Dim pageNameStr As String = ""
		
		'# Check for id being passed in on the query string
		If Not IsNumeric(Request.QueryString("id")) Then
			response.redirect("home.html")
		Else
			pageId = Request.QueryString("id")
		End If
		
		cssFiles.Text = api.GetContent(15158).Html
		javascriptFiles.Text = api.GetContent(15160).Html
		navigation.Text = api.GetContent(15184).Html
		contentFooter.Text = api.GetContent(15186).Html
		trailingFooter.Text = api.GetContent(15188).Html
		
		myBizLogin.Text = api.GetContent(15178).Html

		'# Display Page Title
		pageNameStr = Server.HtmlDecode(pgCls.GetPageName(pageId))
	
		metaContent.Text = replace(replace(ContentMetaData.Text,"bline_",""),"<title>B-line</title>","<title>" & pageNameStr & "</title>")
        
        '# Breadcrumb Text
        breadcrumb.Text = pgCls.GetContentBreadCrumb(pageId)
        If Len(pageNameStr) > 0 Then
            breadcrumbEnd.Text = LCase(pageNameStr)
        End If


    End Sub
End Class
