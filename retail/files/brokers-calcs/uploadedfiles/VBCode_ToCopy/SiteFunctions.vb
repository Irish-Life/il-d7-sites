Imports Microsoft.VisualBasic
Imports System
Imports System.IO
Imports System.Web.HttpContext
Imports System.Text
Imports System.Data.SqlClient

Public Class SiteFunctions
    Function GetParentFolderMenuId(ByVal pageId As Integer) As Integer
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        Dim menuId As Integer = 0

        folderId = contentApi.GetContent(pageId).FolderId
        menuId = ReturnMenuId(folderId)

        If menuId <> 0 Then
            GetParentFolderMenuId = menuId
            Exit Function
        End If

        Do While folderApi.GetFolder(folderId).ParentId <> 0
            folderId = folderApi.GetFolder(folderId).ParentId
            menuId = ReturnMenuId(folderId)
            If menuId <> 0 Then
                Exit Do
            End If
        Loop

        folderApi = Nothing
        contentApi = Nothing

        GetParentFolderMenuId = menuId
    End Function
    ''' <summary>
    ''' Returns the Top Menu
    ''' </summary>
    ''' <param name="menuId">The id of the menu</param>
    Public Function ReturnTopMenu(ByVal menuId As Integer, ByVal section As String) As String
        Dim myConnection As New SqlConnection()
        Dim topMenStr As New StringBuilder
        Dim counter As Integer = 1
        Dim selected As String = ""
        Dim separator As String = ""
        section = Replace(section, "and", "&amp;")
        section = Replace(section, "Site", "Contact Us")
        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()
            Dim sql As String = "SELECT menu_tbl.mnu_id, menu_tbl.mnu_name, menu_tbl.mnu_link FROM menu_tbl INNER JOIN menu_to_item_tbl ON menu_tbl.mnu_id = menu_to_item_tbl.item_id WHERE (menu_tbl.parent_id = " & menuId & ") ORDER BY menu_to_item_tbl.order_loc"
            Dim myCommand As New SqlCommand(sql, myConnection)

            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If myDataReader.HasRows Then
                topMenStr.Append("<ul>")
                While myDataReader.Read()
                    If section = myDataReader("mnu_name") Then
                        selected = " class=""on"""
                    Else
                        selected = ""
                    End If

                    If counter > 1 Then
                        topMenStr.Append(" | ")
                    End If
                    topMenStr.Append("<li").Append(selected).Append("><a").Append(" href=""").Append(ConfigurationManager.AppSettings("site_base_url").ToString).Append(myDataReader("mnu_link")).Append(""">").Append(myDataReader("mnu_name")).Append("</a></li>")
                    counter = counter + 1

                End While
                topMenStr.Append("</ul>")
            End If
            myDataReader = Nothing
        Catch ex As Exception
            topMenStr.Append("")
        Finally
            myConnection.Close()
        End Try

        ReturnTopMenu = topMenStr.ToString
    End Function
    ''' <summary>
    ''' Get the Top level folder id, passes in the page Id as a parameter
    ''' </summary>
    ''' <param name="pageId">The id of the page</param>
    Function GetParentFolderId(ByVal pageId As Integer) As Integer
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        folderId = contentApi.GetContent(pageId).FolderId

        Do While folderApi.GetFolder(folderId).ParentId <> 0
            folderId = folderApi.GetFolder(folderId).ParentId
        Loop
        GetParentFolderId = folderId
    End Function
    ''' <summary>
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
    ''' <summary>
    ''' Returns Folder Name
    ''' </summary>
    ''' <param name="pageId">The id of the page</param>
    Function GetFolderName(ByVal pageId As Integer) As String
        Dim folderTitle As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim folderId As Integer
        folderId = GetParentFolderId(pageId)
        folderTitle = folderApi.GetFolder(folderId).Name
        GetFolderName = folderTitle
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

    ''' <summary>
    ''' Returns Page Name
    ''' </summary>
    ''' <param name="pageId">The id of the page</param>
    Function GetPageName(ByVal pageId As Integer) As String
        Dim pageTitle As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        pageTitle = contentApi.GetContent(pageId).Title
        'Current.Response.Write(pageId & "::" & pageTitle & "<br />")
        contentApi = Nothing
        GetPageName = pageTitle
    End Function

    '# Gets Page Link
    Function GetPageLink(ByVal pageId As Integer) As String
        Dim pageLink As String
        'Dim contentApi As New Ektron.Cms.API.Content.Content
        'pageLink = contentApi.GetContent(pageId).Quicklink
        'contentApi = Nothing
        'Dim u As New Ektron.Cms.API.UrlAliasing.UrlAliasCommon
        'pageLink = u.GetAliasForContent(pageId)
        'GetPageLink = pageLink
    End Function

    '# Gets Page Link
    Function GetPageLink2(ByVal pageId As Integer) As String
        Dim pageLink As String
        Dim contentApi As New Ektron.Cms.API.Content.Content
        pageLink = contentApi.GetContent(pageId).Quicklink
        contentApi = Nothing

        GetPageLink2 = pageLink
    End Function

    ''' <summary>
    ''' Returns the menuId associated with a folder
    ''' </summary>
    ''' <param name="folderId">The id of the folder</param>
    Public Function ReturnMenuId(ByVal folderId As Integer) As Integer
        Dim myConnection As New SqlConnection()
        Dim menuId As Integer

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            Dim myCommand As New SqlCommand()
            myCommand.CommandText = "returnMenuId"
            myCommand.Connection = myConnection
            myCommand.CommandType = Data.CommandType.StoredProcedure
            myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))
            myConnection.Open()
            menuId = myCommand.ExecuteScalar
        Catch ex As Exception
            menuId = 0
        Finally
            myConnection.Close()
        End Try

        ReturnMenuId = menuId
    End Function

    '# Function to return the associated breadcrumb, based on pageId
    Function GetContentBreadCrumb(ByVal pageId As Integer, ByVal pageName As String) As String
        Dim folderApi As New Ektron.Cms.API.Folder
        Dim contentApi As New Ektron.Cms.API.Content.Content
        Dim folderId As Integer
        Dim myConnection As New SqlConnection()
        Dim bcrumb As New StringBuilder
        Dim pgNameSame As Boolean = False

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

            bcrumb.Append("<a href='" & ConfigurationManager.AppSettings("site_base_url").ToString & "corporatebusiness'" & " title=""Home Breadcrumb Link"">Home</a> &raquo; ")

            ' Create and Fill DataReader
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If myDataReader.Read() Then
                Do While myDataReader.Read()
                    If pageName = myDataReader("Title") Then
                        bcrumb.Append("<span>" & myDataReader("Title") & " </span>")
                        pgNameSame = True

                    Else
                        bcrumb.Append("<a href=""/" & Replace(myDataReader("Url"), "http://fsai", "/") & """ title=""" & myDataReader("Title") & " Breadcrumb Link"">" & myDataReader("Title") & "</a> &raquo; ")
                    End If
                Loop
            Else
                bcrumb.Append("")
            End If

            If Not pgNameSame Then
                bcrumb.Append("" & Current.Server.HtmlDecode(Left(pageName, 92)) & "")
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            myConnection.Close()
        End Try

        '# Return string
        GetContentBreadCrumb = Replace(bcrumb.ToString, " Index", "")
    End Function


    '# Get Recent Transactions List
    Function GetRecentTransactionsForHomepage()
        Dim myConnection As New SqlConnection()
        Dim contentIds As New StringBuilder

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim myCommand As New SqlCommand()
            myCommand.CommandText = "returnRecentTransactionIDList"
            myCommand.CommandType = Data.CommandType.StoredProcedure
            myCommand.Connection = myConnection

            myCommand.Parameters.Add(New SqlParameter("@folder_id", 92))

            ' Create and Fill DataReader
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If Not (myDataReader Is Nothing) Then
                Do While myDataReader.Read()
                    contentIds.Append(myDataReader("content_id") & ",")
                Loop
            Else
                contentIds.Append("0")
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            myConnection.Close()
        End Try
        GetRecentTransactionsForHomepage = contentIds.ToString.Substring(0, contentIds.ToString.Length - 1)
    End Function


    '# Get News List
    Function GetNewsListForHomepage()
        Dim myConnection As New SqlConnection()
        Dim contentIds As New StringBuilder

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim myCommand As New SqlCommand()
            myCommand.CommandText = "returnTop3NewsIDList"
            myCommand.CommandType = Data.CommandType.StoredProcedure
            myCommand.Connection = myConnection

            ' Create and Fill DataReader
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If Not (myDataReader Is Nothing) Then
                Do While myDataReader.Read()
                    contentIds.Append(myDataReader("content_id") & ",")
                Loop
            Else
                contentIds.Append("0")
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            myConnection.Close()
        End Try
        GetNewsListForHomepage = contentIds.ToString.Substring(0, contentIds.ToString.Length - 1)
    End Function

    '# Get Banner List
    Function GetBannersList(ByVal pageId As Integer)
        Dim myConnection As New SqlConnection()
        Dim contentIds As New StringBuilder

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim myCommand As New SqlCommand()
            myCommand.CommandText = "returnPagesBannerIDList"
            myCommand.CommandType = Data.CommandType.StoredProcedure
            myCommand.Connection = myConnection

            myCommand.Parameters.Add(New SqlParameter("@content_id", pageId))

            ' Create and Fill DataReader
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
            If Not (myDataReader Is Nothing) Then
                Do While myDataReader.Read()
                    contentIds.Append(myDataReader("content_id") & ",")
                Loop
            Else
                contentIds.Append("0")
            End If

        Catch ex As Exception
            Return Nothing
        Finally
            myConnection.Close()
        End Try
        GetBannersList = contentIds.ToString.Substring(0, contentIds.ToString.Length - 1)
    End Function

    ''' <summary>
    ''' Returns the contentids associated with a folder and the smartform configid
    ''' </summary>
    ''' <param name="folderId">The folderId of the content</param>
    ''' <param name="configId">The configId of the smart form</param>
    Public Function ReturnContentIdsSmartFolder(ByVal folderId As Integer, ByVal configId As Integer, ByVal recs As Integer) As String
        Dim myConnection As New SqlConnection()
        Dim contentIds As New StringBuilder

        'Try

        myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString


        Dim sql As String = "SELECT TOP (@topRecords) content_id FROM content WHERE (xml_config_id = @configId) ORDER BY content_id DESC"
        Dim myCommand As New SqlCommand(sql, myConnection)

        myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))
        myCommand.Parameters.Add(New SqlParameter("@configId", configId))
        myCommand.Parameters.Add(New SqlParameter("@topRecords", recs))
        myConnection.Open()
        Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()
        If myDataReader.HasRows Then
            While myDataReader.Read()
                If contentIds.ToString.Length > 0 Then
                    contentIds.Append(",")
                End If
                contentIds.Append(myDataReader("content_id"))
            End While
        End If
        'Catch ex As Exception
        contentIds.Append("")
        'Finally
        '   myConnection.Close()
        'End Try
        ReturnContentIdsSmartFolder = contentIds.ToString()
    End Function


    ''' <summary>
    ''' Returns the contentids associated with a folder and the smartform configid
    ''' </summary>
    ''' <param name="folderId">The folderId of the content</param>
    ''' <param name="configId">The configId of the smart form</param>
    Public Function ReturnOrderedContentList(ByVal folderId As Integer, ByVal configId As Integer) As String
        Dim myConnection As New SqlConnection()
        Dim alphaList As New StringBuilder

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            Dim myCommand As New SqlCommand()
            myCommand.CommandText = "returnOrderedContentList"
            myCommand.Connection = myConnection
            myCommand.CommandType = Data.CommandType.StoredProcedure
            myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))
            myCommand.Parameters.Add(New SqlParameter("@configId", configId))
            myConnection.Open()
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()

            alphaList.AppendLine("<div class=""column""><!-- column -->" & vbCrLf)

            If myDataReader.HasRows Then
                Dim blnUseCol2 As Boolean = False
                Dim strCurrentLetter As String = String.Empty

                While myDataReader.Read()
                    If blnUseCol2 = False And StrComp(myDataReader("col"), "2") = 0 Then
                        alphaList.AppendLine("</ul>" & vbCrLf)
                        alphaList.AppendLine("</div><!-- /column -->" & vbCrLf)
                        alphaList.AppendLine("<div class=""column mr-0 col-ie""><!-- column --> " & vbCrLf)
                        blnUseCol2 = True
                    End If

                    If StrComp(UCase(strCurrentLetter), UCase(myDataReader("letter"))) <> 0 Then
                        If Len(strCurrentLetter) > 0 Then
                            alphaList.AppendLine("</ul>" & vbCrLf)
                        End If
                        alphaList.AppendLine("<p class=""letter"">" & myDataReader("letter") & "</p>" & vbCrLf)
                        alphaList.AppendLine("<ul>" & vbCrLf)
                    End If

                    alphaList.AppendLine("<tr class=""alt"">" & vbCrLf)
                    alphaList.AppendLine("<td>08.00</td>" & vbCrLf)
                    alphaList.AppendLine("<td>09.00</td>" & vbCrLf)
                    alphaList.AppendLine("<td><a href=""booking-view.asp"">Michael Rourke - IT Department</a></td>" & vbCrLf)
                    alphaList.AppendLine("<td><a href=""#"" class=""button-edit"">Edit</a>&nbsp; | &nbsp;<a href=""#"" class=""button-delete"">Delete</a></td>" & vbCrLf)
                    alphaList.AppendLine("</tr>" & vbCrLf)



                    strCurrentLetter = UCase(myDataReader("letter"))

                    'blnUseCol2 = False
                End While
                alphaList.AppendLine("</ul>" & vbCrLf)
            End If

            alphaList.AppendLine("</div><!-- /column -->" & vbCrLf)

        Catch ex As Exception
            alphaList.Append("")
        Finally
            myConnection.Close()
        End Try
        ReturnOrderedContentList = alphaList.ToString()
    End Function

    ''' <summary>
    ''' Returns the smartform id associated with the folder
    ''' </summary>
    ''' <param name="folderId">The folderId of the content</param>
    Function ReturnFolderSmartForm(ByVal folderId As Integer) As Integer
        Dim myConnection As New SqlConnection()
        Dim xmlId As Integer

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim sql As String = "SELECT top 1 xml_id FROM folder_to_xml_tbl WHERE (folder_id = @folderId)"
            Dim myCommand As New SqlCommand(sql, myConnection)
            myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))
            xmlId = myCommand.ExecuteScalar
            myCommand = Nothing
        Catch ex As Exception
            xmlId = 0
        Finally
            myConnection.Close()
            myConnection = Nothing
        End Try
        ReturnFolderSmartForm = xmlId
    End Function



    Function ReturnParentFolderContentId(ByVal folderId As Integer) As Integer
        Dim myConnection As New SqlConnection()
        Dim xmlId As Integer

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            myConnection.Open()

            Dim sql As String = "SELECT top 1 content_id FROM content WHERE (folder_id = @folderId)"
            Dim myCommand As New SqlCommand(sql, myConnection)
            myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))
            xmlId = myCommand.ExecuteScalar
            myCommand = Nothing
        Catch ex As Exception
            xmlId = 0
        Finally
            myConnection.Close()
            myConnection = Nothing
        End Try
        ReturnParentFolderContentId = xmlId
    End Function

    ''' <summary>
    ''' Used to build the related links right hand side menu
    ''' </summary>
    ''' <remarks>related links comes from metadata</remarks>
    Public Function BuildRelatedLinksMenu(ByVal pageId As Integer, ByVal metaCategory As String) As String
        '# Declare functions
        Dim metaDataApi As New Ektron.Cms.API.Metadata
        Dim metaDataList As New Ektron.Cms.CustomAttributeList
        Dim metaItem As New Ektron.Cms.CustomAttribute
        Dim contentIdListString As String
        Dim contentIdList() As String
        Dim returnVal As String = String.Empty

        Try
            '# Get service meta data list
            metaDataList = metaDataApi.GetContentMetadataList(pageId)

            '# Metadata links and services are returned as a list separated by ';'
            If metaDataList.AttributeList.Length > 0 Then
                For Each metaItem In metaDataList.AttributeList
                    If metaItem.Value.ToString().Length > 0 Then
                        Select Case metaItem.Name
                            Case metaCategory
                                contentIdListString = metaItem.Value
                            Case Else
                                '# ignore
                        End Select
                    End If
                Next
            End If

            '# Split metadatalist
            contentIdList = Split(contentIdListString, ";")

            '# Loop through array and build up menu
            If IsArray(contentIdList) Then
                Dim metaId As String
                For Each metaId In contentIdList
                    returnVal &= "<li><a href=""" & GetPageLink(metaId) & """ title=""" & GetPageName(metaId) & """>" & ReturnFriendlyRelatedLinksName(GetPageName(metaId)) & "</a></li>"
                Next
            End If
        Catch ex As Exception
        End Try
        BuildRelatedLinksMenu = returnVal
    End Function

    Function ReturnFriendlyRelatedLinksName(ByVal foldername As String) As String
        Dim friendlyName As String
        Select Case foldername
            Case "Services"
                friendlyName = "What we do"
            Case "Experience"
                friendlyName = "What we've done"
            Case "Testimonials"
                friendlyName = "What others say about us"
            Case "Know How"
                friendlyName = "How we deliver"
            Case "Media"
                friendlyName = "What's new"
            Case "Contact Us"
                friendlyName = "Where we are"
            Case "People"
                friendlyName = "Who to contact"
            Case "Mailing List", "Newsletter", "News Letter", "Mailing List"
                friendlyName = "Subscribe to our publications"
            Case Else
                friendlyName = foldername
        End Select
        ReturnFriendlyRelatedLinksName = friendlyName
    End Function


    Function ReturnFriendlyCareerRelatedLinksName(ByVal foldername As String) As String
        Dim friendlyName As String
        Select Case foldername
            Case "Experience"
                friendlyName = "Our Clients <span class=""external""> <img src=""" & ConfigurationManager.AppSettings("site_base_url").ToString & "CareersHome/img/icons/open-external.jpg"" alt=""open external page""/></span>"
            Case Else
                friendlyName = foldername
        End Select
        ReturnFriendlyCareerRelatedLinksName = friendlyName
    End Function

    ''' <summary>
    ''' Returns the contentids associated with a folder and the smartform configid
    ''' </summary>
    ''' <param name="folderId">The folderId of the content</param>
    ''' <param name="configId">The configId of the smart form</param>
    Public Function ReturnOrderedPeopleContentList(ByVal folderId As Integer, ByVal configId As Integer) As String
        Dim myConnection As New SqlConnection()
        Dim alphaList As New StringBuilder

        Try
            myConnection.ConnectionString = System.Configuration.ConfigurationManager.ConnectionStrings("Ektron.DbConnection").ConnectionString
            Dim myCommand As New SqlCommand()
            myCommand.CommandText = "returnOrderedPeopleContentList"
            myCommand.Connection = myConnection
            myCommand.CommandType = Data.CommandType.StoredProcedure
            myCommand.Parameters.Add(New SqlParameter("@folderId", folderId))
            myCommand.Parameters.Add(New SqlParameter("@configId", configId))
            myConnection.Open()
            Dim myDataReader As SqlDataReader = myCommand.ExecuteReader()

            alphaList.AppendLine("<div class=""column""><!-- column -->" & vbCrLf)

            If myDataReader.HasRows Then
                Dim blnUseCol2 As Boolean = False
                Dim blnUseCol2FirstTime As Boolean = False
                Dim strCurrentLetter As String = String.Empty

                While myDataReader.Read()
                    If blnUseCol2 = False And StrComp(myDataReader("col"), "2") = 0 Then
                        alphaList.AppendLine("</ul>" & vbCrLf)
                        alphaList.AppendLine("</div><!-- /column -->" & vbCrLf)
                        alphaList.AppendLine("<div class=""column mr-0 col-ie""><!-- column --> " & vbCrLf)
                        blnUseCol2 = True
                    End If

                    If StrComp(UCase(strCurrentLetter), UCase(myDataReader("letter"))) <> 0 Then
                        If Len(strCurrentLetter) > 0 Then
                            alphaList.AppendLine("</ul>" & vbCrLf)
                        End If
                        alphaList.AppendLine("<p class=""letter"">" & myDataReader("letter") & "</p>" & vbCrLf)
                        alphaList.AppendLine("<ul>" & vbCrLf)
                    End If

                    alphaList.AppendLine("<li><a href=""" & GetPageLink(myDataReader("content_id")) & """>" & myDataReader("content_title") & "</a></li>" & vbCrLf)
                    strCurrentLetter = UCase(myDataReader("letter"))

                    'blnUseCol2 = False
                End While
                alphaList.AppendLine("</ul>" & vbCrLf)
            End If

            alphaList.AppendLine("</div><!-- /column -->" & vbCrLf)

        Catch ex As Exception
            alphaList.Append("")
        Finally
            myConnection.Close()
        End Try
        ReturnOrderedPeopleContentList = alphaList.ToString()
    End Function

    ''' <summary>
    ''' Used to build the related links right hand side menu
    ''' </summary>
    ''' <remarks>related links comes from metadata</remarks>
    Public Function BuildRelatedPartnersMenu(ByVal pageId As Integer, ByVal metaCategory As String) As String
        '# Declare functions
        Dim metaDataApi As New Ektron.Cms.API.Metadata
        Dim metaDataList As New Ektron.Cms.CustomAttributeList
        Dim metaItem As New Ektron.Cms.CustomAttribute
        Dim contentIdListString As String
        Dim contentIdList() As String
        Dim returnVal As String = String.Empty
        Dim counter As Integer

        Try
            '# Get service meta data list
            metaDataList = metaDataApi.GetContentMetadataList(pageId)

            '# Metadata links and services are returned as a list separated by ';'
            If metaDataList.AttributeList.Length > 0 Then
                For Each metaItem In metaDataList.AttributeList
                    If metaItem.Value.ToString().Length > 0 Then
                        Select Case metaItem.Name
                            Case metaCategory
                                contentIdListString = metaItem.Value
                            Case Else
                                '# ignore
                        End Select
                    End If
                Next
            End If

            '# Split metadatalist
            contentIdList = Split(contentIdListString, ";")

            '# Loop through array and build up menu
            If IsArray(contentIdList) Then
                Dim metaId As String
                For Each metaId In contentIdList
                    returnVal &= ", <br />"
                    returnVal &= "<a href=""" & GetPageLink(metaId) & """ title=""" & GetPageName(metaId) & """>" & GetPageName(metaId) & "</a>"

                Next
            End If
        Catch ex As Exception
        End Try
        BuildRelatedPartnersMenu = returnVal
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

    ''' <summary>
    ''' Used to build the left hand side menu for careers sub site
    ''' </summary>
    ''' <remarks>related links comes from metadata</remarks>
    Public Function BuildCareersRelatedLinksMenu(ByVal pageId As Integer, ByVal metaCategory As String, ByVal pageName As String) As String
        '# Declare functions
        Dim metaDataApi As New Ektron.Cms.API.Metadata
        Dim metaDataList As New Ektron.Cms.CustomAttributeList
        Dim metaItem As New Ektron.Cms.CustomAttribute
        Dim contentIdListString As String
        Dim contentIdList() As String
        Dim returnVal As String = String.Empty

        Try
            '# Get service meta data list
            metaDataList = metaDataApi.GetContentMetadataList(pageId)

            '# Metadata links and services are returned as a list separated by ';'
            If metaDataList.AttributeList.Length > 0 Then
                For Each metaItem In metaDataList.AttributeList
                    If metaItem.Value.ToString().Length > 0 Then
                        Select Case metaItem.Name
                            Case metaCategory
                                contentIdListString = metaItem.Value
                            Case Else
                                '# ignore
                        End Select
                    End If
                Next
            End If

            '# Split metadatalist
            contentIdList = Split(contentIdListString, ";")
            'Current.Response.Write(contentIdListString & "<br />")
            '# Loop through array and build up menu
            If IsArray(contentIdList) Then
                Dim metaId As String
                Dim metaPageName As String = String.Empty
                Dim loopCounter As Integer = 1
                For Each metaId In contentIdList
                    'Current.Response.Write(contentIdList.Length.ToString & " " & loopCounter.ToString & "<br />")
                    metaPageName = GetPageName(metaId)
                    'Current.Response.Write(metaId & "::" & metaPageName & "::" & GetPageLink(metaId) & "<br />")
                    If StrComp(pageName, metaPageName) = 0 Then
                        If contentIdList.Length = loopCounter Then
                            returnVal &= "<li class=""level1""><a href=""" & ConfigurationManager.AppSettings("site_base_url").ToString & GetPageLink(metaId) & """ title=""" & metaPageName & """ class=""last on"">" & ReturnFriendlyCareerRelatedLinksName(metaPageName) & "</a></li>"
                        Else
                            returnVal &= "<li class=""level1""><a href=""" & ConfigurationManager.AppSettings("site_base_url").ToString & GetPageLink(metaId) & """ title=""" & metaPageName & """ class=""on"">" & ReturnFriendlyCareerRelatedLinksName(metaPageName) & "</a></li>"
                        End If
                    Else
                        If contentIdList.Length = loopCounter Then
                            If pageId = 655 Or pageId = 654 Or pageId = 605 Or pageId = 658 Or pageId = 657 Or pageId = 603 Or pageId = 610 Or pageId = 656 Then
                                returnVal &= "<li class=""level1""><a href=""" & ConfigurationManager.AppSettings("site_base_url").ToString & GetPageLink(metaId) & """ title=""" & metaPageName & """ class=""last"">" & ReturnFriendlyCareerRelatedLinksName(metaPageName) & "</a></li>"
                            Else
                                returnVal &= "<li class=""level1""><a href=""" & ConfigurationManager.AppSettings("site_base_url").ToString & GetPageLink(metaId) & """ title=""" & metaPageName & """ class=""last"">" & ReturnFriendlyCareerRelatedLinksName(metaPageName) & "</a></li>"
                            End If

                        Else
                            returnVal &= "<li class=""level1""><a href=""" & ConfigurationManager.AppSettings("site_base_url").ToString & GetPageLink(metaId) & """ title=""" & metaPageName & """>" & ReturnFriendlyCareerRelatedLinksName(metaPageName) & "</a></li>"
                        End If

                    End If
                    loopCounter = loopCounter + 1
                Next
            End If


        Catch ex As Exception
        End Try
        BuildCareersRelatedLinksMenu = returnVal
    End Function
End Class
