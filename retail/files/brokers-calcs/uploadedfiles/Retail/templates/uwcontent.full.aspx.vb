'*********************************************************************************
'
'  Copyright:	2008 - MediaOne, Grand Canal Quay, Dublin 2
'
'  Author:		Glenda Conaty
'
'  Date Created:	Jan '08
'
'  Description:		Template page for content page. This page conrols all of the content pages in the CMS
'                   
'
'*********************************************************************************
Imports System
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Partial Class uwcontent
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
        Dim menuId As Integer
        Dim pgCls As New Page
        Dim lhs_relatedValue As String = ""
        Dim lhs_relatedId As Integer
        Dim pageNameStr As String = ""
		Dim api as New Ektron.Cms.API.Content.Content
		
		'# Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            response.redirect("home_page.html")
        Else
            pageId = Request.QueryString("id")
        End If
        
        '# Get Menu Id and Display menu
		menuId=352
     
        '# display General menu if no menu associated with the content
        If menuId = 0 Then
            '# Set to default 'General menu'
            menuId = 36
        End If
		
        '# Display the Actual menu
        Dim menuCls As New DisplayMenu
        menuText.Text = menuCls.GenMenu(menuId, Request.RawUrl)
		'menuname.Text = "<p class=""title " & getMenuClass(menuId) & """>" & menuCls.GetMenuName(menuId, Request.RawUrl)
        menuCls = Nothing

        '# Display Page Title
        pageNameStr = Server.HtmlDecode(pgCls.GetPageName(pageId))
	
		metaContent.Text = replace(replace(ContentMetaData.Text,"bline_",""),"<title>B-line</title>","<title>B-line | " & pageNameStr & "</title>")
        
        '# Breadcrumb Text
        breadcrumb.Text = pgCls.GetContentBreadCrumb(pageId)
        If Len(pageNameStr) > 0 Then
            breadcrumbEnd.Text = LCase(pageNameStr)
        End If
    
        '# Free up object
        pgCls = Nothing

    End Sub

	'# Get menu class associated with each section
    Function getMenuClass(ByVal menuId As Integer)
        Dim menuCls As String = ""
        Select Case menuId
            Case 44
                menuCls = "purple"
            Case 96
                menuCls = "green"
            Case 40
                menuCls = "grey"
            Case 42
                menuCls = "purple"
            Case Else
                menuCls = "darkgrey"
        End Select
        getMenuClass = menuCls
    End Function
	
End Class
