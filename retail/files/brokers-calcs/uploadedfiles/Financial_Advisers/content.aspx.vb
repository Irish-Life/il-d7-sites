
Imports System.IO
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Partial Class content
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
        Dim pageNameStr As String = ""
		Dim folderNameStr As String = ""
		Dim rhs_relatedValue As String = ""
        Dim rhs_relatedId As Integer = 6000
		
        ' Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# Sets a default Id
            pageId = 52
        Else
            pageId = Request.QueryString("id")
        End If

        ' 1. Page title
        Dim pgCls As New Page
        pageNameStr = Server.HtmlDecode(pgCls.GetPageName(pageId))
				
        '# display Breadcrumb Text
        breadcrumb.Text = pgCls.GetContentBreadCrumb(pageId)
        If Len(pageNameStr) > 0 Then
		
            breadcrumbEnd.Text = LCase(pageNameStr)
        End If		
		
        '# Set RHS content
        rhs_relatedValue = MainContentBlock.GetMetaData.GetItemByName("Associated Content").Value
        If Len(rhs_relatedValue) <> 0 Then
            rhs_relatedId = CInt(rhs_relatedValue)
        End If
        RHS_Content.DefaultContentID = rhs_relatedId
        '#RelatedServices.Text = pgCls.GetLHSContent(pageId)
		
		pageClassName.Text = ""
		
		folderNameStr = Server.HtmlDecode(pgCls.GetFolderName(pageId))	
		Select Case LCase(folderNameStr)
			Case "home"
				pageClassName.Text = "on"
            Case "pensions"
                pageClassName.Text = "page-pension"
            Case "investments"
                pageClassName.Text = "page-investment"
            Case "life cover"
                pageClassName.Text = "page-protection"
            Case "savings"
                pageClassName.Text = "page-investement"
			Case "customer service"
				pageClassName.Text = "page-customer"				
            Case Else
                pageClassName.Text = "page-advice"
        End Select
		
        pgCls = Nothing
		
    End Sub

End Class
