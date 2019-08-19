
'*********************************************************************************
'
'  Copyright:	2007 - MediaOne, Grand Canal Quay, Dublin 2
'
'  Author:		Glenda Conaty
'
'  Date Created:	14 March 2007
'
'  Description:		Contains general page functions
'
'*********************************************************************************
Imports Microsoft.VisualBasic
Imports System
Imports System.IO
Imports System.Web.HttpContext
Imports System.Text
Imports System.Data.SqlClient
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Public Class Page

    '# Get the Top level folder id, passes in the page Id as a parameter
    Function GetParentFolderId(ByVal pageId As Integer)
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId

        Do While folderApi.GetFolder(folderId).ParentId <> 0
            folderId = folderApi.GetFolder(folderId).ParentId
        Loop
        GetParentFolderId = folderId
    End Function

    '# Function to return the associated breadcrumb, based on pageId
    Function GetContentBreadCrumb(ByVal pageId As Integer)
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        Dim myConnection As New SqlConnection()
        Dim bcrumb As String = ""

        '# Check for valid PageId
        If Not IsNumeric(pageId) Then
            GetContentBreadCrumb = ""
        End If

        '# Get FolderID
        folderId = contentApi.GetContent(pageId).FolderId
        If Not IsNumeric(folderId) Then
            GetContentBreadCrumb = ""
        End If

        '# Connect to the database
        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim sql As String = "SELECT Title, Url FROM SiteMap WHERE folderId = @folderId ORDER BY OrderLocation"
            Dim myCommand As New SqlCommand(sql, myConnection)
            myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))

            bcrumb = "<a href=""/home.html"" title=""home"">home</a> &raquo; "

            ' Create and Fill DataReader
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If myDataReader.Read() Then
                Do While myDataReader.Read()
                    bcrumb &= "<a href=""/" & myDataReader("Url") & """ title=""" & myDataReader("Title") & """>" & myDataReader("Title") & "</a> &raquo; "
                Loop
            Else
                bcrumb = ""
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            myConnection.Close()
        End Try

        '# Return string
        GetContentBreadCrumb = bcrumb
    End Function

    '# Displays Page Name
    Function GetPageName(ByVal pageId As Integer)
        Dim pageTitle As String
        Dim contentApi As New Ektron.Cms.API.Content.Content

        pageTitle = contentApi.GetContent(pageId).Title
        GetPageName = pageTitle
    End Function

    '# Returns Folder Name
    Function GetFolderName(ByVal pageId As Integer)
        Dim folderTitle As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim folderId As Integer
        folderId = GetParentFolderId(pageId)
        folderTitle = folderApi.GetFolder(folderId).Name
        GetFolderName = folderTitle
    End Function

    '# Gets Content to be displayed on the LHS - All content contained in the LHS folder is displayed
    Function GetLHSContent(ByVal pageId As Integer)
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim folders As FolderData()
        Dim folderId As Integer
        Dim strString As String = ""

        '# Get Folder Id
        folderId = GetParentFolderId(pageId)

        '# loop thru parent folder ids for child folder
        folders = folderApi.GetChildFolders(folderId, True, "name")
        If folders IsNot Nothing Then
            Dim i As Integer
            For i = 0 To folders.Length - 1 Step 1
                If folders(i).Name = "LHS" Then
                    If contentApi.GetChildContent(folders(i).Id) IsNot Nothing Then
                        For Each ContentFolder As Ektron.Cms.ContentData In contentApi.GetChildContent(folders(i).Id)
                            strString &= contentApi.GetContent(ContentFolder.Id).Html
                        Next
                    End If
                End If
            Next
        End If

        GetLHSContent = strString
    End Function

    '# Menus are associated with folders, based on page Id, get Top Folder and then get the associated menu
    Function GetMenuId(ByVal pageId As Integer)
        Dim myConnection As New SqlConnection()
        Dim menuId As Integer = 0
        Dim folderId

        '# Get Top level folder Id
        folderId = GetParentFolderId(pageId)
        If Not IsNumeric(folderId) Then
            GetMenuId = 0
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

        GetMenuId = menuId
    End Function

    '# Returns Direct Folder Name
    Function GetDirectFolderName(ByVal pageId As Integer) As String
        Dim folderTitle As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId
        folderTitle = folderApi.GetFolder(folderId).Name
        folderApi = Nothing
        contentApi = Nothing
        GetDirectFolderName = folderTitle
    End Function

    '# Returns Direct Folder Id
    Function GetDirectFolderId(ByVal pageId As Integer) As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId
        folderApi = Nothing
        contentApi = Nothing
        GetDirectFolderId = folderId
    End Function

    '# Returns Direct Folder Parent Id
    Function GetDirectFolderParentId(ByVal pageId As Integer) As String
        Dim folder_direct_Parent As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId
        folder_direct_Parent = folderApi.GetFolder(folderId).ParentId
        folderApi = Nothing
        contentApi = Nothing
        GetDirectFolderParentId = folder_direct_Parent
    End Function


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

    ''' Get the Top level folder id, passes in the page Id as a parameter
    ''' </summary>
    ''' <param name="pageId">The id of the page</param>
    Function GetFolderId(ByVal pageId As Integer) As Integer
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId
        GetFolderId = folderId
    End Function

End Class
