'*********************************************************************************
'
'  Copyright:	2007 - MediaOne, Grand Canal Quay, Dublin 2
'
'  Author:		Glenda Conaty
'
'  Date Created: 14 March 2007
'
'  Description:	Template page for the products section.
'               This is the most complex page as this one page is used to display
'               content from many different folders, where the bcrumb changes,
'               menu needs to be generated, related RHS content needs to be set etc
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

Partial Class product
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
        Dim folderNameStr As String = ""
        Dim pageNameStr As String = ""
        Dim rhs_relatedValue As String = ""
        Dim rhs_relatedId As Integer = 78
		Dim lhs_relatedValue as String = ""
		Dim lhs_relatedId as Integer = 60
        Dim menuId As Integer

        '# Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If
        
        '# Display Folder Name & Breadcrumb end
        Dim pgCls As New Page
		
		
        '# Set folder name
        folderNameStr = Server.HtmlDecode(pgCls.GetFolderName(pageId))
        'folderName.Text = folderNameStr

        '# Start Bcrumb
        breadcrumb.Text = pgCls.GetContentBreadCrumb(pageId)

        '# Set page Name & Breadcrumb end
        pageNameStr = Server.HtmlDecode(pgCls.GetPageName(pageId))
        If Len(pageNameStr) > 0 Then
            breadcrumbEnd.Text = LCase(pageNameStr)
        End If
		
		'# Get Menu Id and Display menu
		menuId = pgCls.GetMenuId(pageId)
		Dim menuCls As New DisplayMenu
		menuText.Text = menuCls.GenMenu(menuId, Request.RawUrl)
		menuCls = Nothing
		
        '# Set RHS content
        rhs_relatedValue = MainContentBlock.GetMetaData.GetItemByName("Associated Content").Value
        If Len(rhs_relatedValue) <> 0 Then
            rhs_relatedId = CInt(rhs_relatedValue)
        End If
        RHS_Content.DefaultContentID = rhs_relatedId
		
		
		' # set LHS - related services
        lhs_relatedValue = MainContentBlock.GetMetaData.GetItemByName("Related Services").Value
        If Len(lhs_relatedValue) <> 0 Then
            lhs_relatedId = CInt(lhs_relatedValue)
        End If
        LHS_Content.DefaultContentID = lhs_relatedId
				
		pageClassName.Text = ""
		
		folderNameStr = Server.HtmlDecode(pgCls.GetFolderName(pageId))	
		Select Case LCase(folderNameStr)
			Case "home"
				pageClassName.Text = "page-home"
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
