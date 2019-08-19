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
		Dim menuId As Integer
		Dim menuCls As New DisplayMenu
        Dim pgCls As New Page
		Dim pageNameStr As String = ""
		
		Dim bannerValue As String = ""
		Dim bannerContent as Integer = 15198
		
		Dim topAdValue As String = ""
		Dim topAdContent as Integer = 15180
		
		Dim bottomAdValue As String = ""
		Dim bottomAdContent as Integer = 15182
		
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
		myBizLogin.Text = api.GetContent(19812).Html
		
		
		
		        '# Get Menu Id and Display menu
        menuId = GetMenuId2(pageId)
		
        If menuId = 0 Then
            '# Set to default 'pensions
            menuId = 356
        End If
		
			
		'# Display Page Title
		pageNameStr = Server.HtmlDecode(pgCls.GetPageName(pageId))
	
		metaContent.Text = replace(replace(ContentMetaData.Text,"bline_",""),"<title>B-line</title>","<title>" & pageNameStr & "</title>")
        
        '# Breadcrumb Text
        breadcrumb.Text = pgCls.GetContentBreadCrumb(pageId)
        If Len(pageNameStr) > 0 Then
            breadcrumbEnd.Text = LCase(pageNameStr)
        End If
		
		
		menuText.Text = menuCls.GenMenu(menuId, Request.RawUrl)
		menuCls = Nothing
		
    End Sub

    '# Menus are associated with folders, based on page Id, get Top Folder and then get the associated menu
    Function GetMenuId2(ByVal pageId As Integer)
        Dim myConnection As New SqlConnection()
        Dim menuId As Integer = 0
        Dim folderId

        '# Get Top level folder Id
        folderId = GetFolderId(pageId)
        If Not IsNumeric(folderId) Then
            GetMenuId2 = 0
        End If

        '# Connect to the database
        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim sql As String = "SELECT mnu_id FROM menu_tbl WHERE (mnu_type = 0) AND (mnu_to_folders LIKE '%" & folderId & "%')"
            Dim myCommand As New SqlCommand(sql, myConnection)

            ' Create and Fill DataReader
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If myDataReader.Read() Then
                menuId = myDataReader("mnu_id")
            Else
                menuId = 0
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            myConnection.Close()
        End Try

        GetMenuId2 = menuId
    End Function

    Function GetFolderId(ByVal pageId As Integer) As Integer
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId
        GetFolderId = folderId
    End Function
End Class
