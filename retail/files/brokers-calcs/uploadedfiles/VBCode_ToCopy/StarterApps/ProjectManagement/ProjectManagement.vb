Imports Microsoft.VisualBasic
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.API
Imports Ektron.Cms.API.User.User
Imports System.Xml

Namespace Ektron.Cms.StarterApps.ProjectManagement

    Public Class ProjectManagement

#Region "Project Management Properties"

        Private Const EVERYONEGROUP As Integer = 2
        Private Const ADMINGROUP As Integer = 1
        Private FolderAPI As New Folder
        Private TemplateValue, TemplateLabelValue As String
        Private ContentAPI As New ContentAPI
        Private IAPathValue As String = ""
        Private ClientIDValue As Integer = -1
        Private ProjectIDValue As Integer
        Private IADoc As System.Xml.XmlDocument = Nothing
        Private BlogModeValue As String

        Public Enum InformationArchitectureUserModes
            ''' <summary>
            ''' MembershipUser - Can add members and project to clients.  Cannot remove members or clients.  Cannot see "Private Blog"
            ''' CMSUser - Can add members, projects, and see "CMSUser Blog"  Can remove members, projects, and clients.
            ''' </summary>
            ''' <remarks>This enum is used by the Public Property InformationArchitectureUserMode().</remarks>
            MembershipUser
            CMSUser
        End Enum

        'For use with Public Property Set InformationArchitectureUserMode()
        'Set "MembershipUser" as default - this is a precaution; MembershipUser cannot delete clients and proejcts, and cannot add clients
        Private InformationAchitectureUserModeValues As InformationArchitectureUserModes = InformationArchitectureUserModes.MembershipUser

        'This Property is used to determine "action" rights for users and 
        'is consumed by InformationArchitecture.xslt when called by the "TransformInformationArchitetureXML()"
        'Default value is "MembershipUser"
        Public Property InformationArchitectureUserMode() As InformationArchitectureUserModes
            Get
                Return InformationAchitectureUserModeValues
            End Get
            Set(ByVal Value As InformationArchitectureUserModes)
                InformationAchitectureUserModeValues = Value
            End Set
        End Property

        Public Property ProjectID() As Integer
            Get
                Return ProjectIDValue
            End Get
            Set(ByVal Value As Integer)
                ProjectIDValue = Value
            End Set
        End Property

        Public Property ClientID() As Integer
            Get
                Return ClientIDValue
            End Get
            Set(ByVal Value As Integer)
                ClientIDValue = Value
            End Set
        End Property

        Public Property BlogMode() As String
            Get
                Return BlogModeValue
            End Get
            Set(ByVal Value As String)
                BlogModeValue = Value
            End Set
        End Property

        Public Property IAPath() As String
            Get
                Return IAPathValue
            End Get
            Set(ByVal Value As String)
                IAPathValue = Value
            End Set
        End Property

        Public Property Template() As String
            Get
                Return TemplateValue
            End Get
            Set(ByVal Value As String)
                TemplateValue = Value
            End Set
        End Property

        Public Property TemplateLabel() As String
            Get
                Return TemplateLabelValue
            End Get
            Set(ByVal Value As String)
                TemplateLabelValue = Value
            End Set
        End Property

        Public Property InformationArchitectureXML() As System.Xml.XmlDocument
            Get
                Return IADoc
            End Get
            Set(ByVal Value As System.Xml.XmlDocument)
                IADoc = Value
            End Set
        End Property

        Public Enum MetadataDefinitionTypes
            Wiki
            MembershipBlog
            CMSBlog
        End Enum

#End Region

#Region "Project Management Initialization"

        ''' <summary>
        ''' The Initialize() method is exectuted upon each page load to ensure StartApp has the components it needs, and returns the "Project Management" folder id.
        ''' </summary>
        ''' <returns>Project Management folder id</returns>
        ''' <remarks>
        ''' This method...
        ''' (1) Checks to see if the "StarterApps" and "Project Management" folders exists, and if not, creates them
        ''' (2) Checks to see if the "starterapps.pm" CMS usergroup exists, and if not, creates it
        ''' (3) Checks to see if the three required metadata values "starterapps.pm.DefaultContent", "starterapps.pm.Blog", and "starterapps.pm.PrivateBlog" exist and if not, creates them
        ''' (4) Checks to see if the required .aspx templates are registered with CMS400 and if not, registers them
        ''' </remarks>
        Public Function Initialize() As Integer
            Dim FolderData() As FolderData
            Dim StarterAppsFolderID, PMFolderID, CMSGroupID As Integer
            Dim StarterAppsFolderExists As Boolean = False
            Dim PMFolderExists As Boolean = False
            Dim GroupName As String
            Dim PMUser As New StarterApps.ProjectManagement.Users
            Dim Metadata As New Metadata
            Dim MetadataCollection() As Ektron.Cms.ContentMetaData
            Dim MetadataType As New Ektron.Cms.ContentMetaData
            Dim MetadataID, SmartFormID As Integer
            Dim MembershipBlogMetadataExists, CMSBlogMetadataExists, WikiMetadataExists As Boolean

            'Get all child folders of the CMS Root folder and see if the
            'folder "Starter Apps" has already been created.
            'If so, set StarterAppsFolderExists to TRUE
            FolderData = FolderAPI.GetChildFolders(0, False)
            If Not FolderData Is Nothing Then
                For Each FolderDataItem As FolderData In FolderData
                    If FolderDataItem.Name = "Starter Apps" Then
                        StarterAppsFolderID = FolderDataItem.Id
                        StarterAppsFolderExists = True
                        Exit For
                    End If
                Next
            End If

            'If the "Application Accelerators" folder doesn't exist, create it
            If StarterAppsFolderExists = False Then
                StarterAppsFolderID = AddFolder("Starter Apps", 0)
                'Break inheritence and remove inherited permissions
                SetFolderPermissions(StarterAppsFolderID)
                'Remove permissions for all inherited groups
                RemoveInheritedUserGroups(StarterAppsFolderID)
                'Give everyone traverse-only permission on this folder
                PMUser.AddUserGroupToFolder(StarterAppsFolderID, EVERYONEGROUP, True)
                'Add CMS project management usergroup and add to "Starter Apps" folder
                GroupName = "starterapps.pm"
                CMSGroupID = PMUser.AddCMSUserGroup(GroupName)
                PMUser.AddUserGroupToFolder(StarterAppsFolderID, CMSGroupID, True)
                'Make Folder is marked 'Private'
                SetFolderPrivate(StarterAppsFolderID)
            End If

            'Get all child folders of the "Application Accelerators" folder
            'to see if the "Project Management" foldler exists.
            FolderData = FolderAPI.GetChildFolders(StarterAppsFolderID, False)
            If Not FolderData Is Nothing Then
                For Each FolderDataItem As FolderData In FolderData
                    If FolderDataItem.Name = "Project Management" Then
                        PMFolderID = FolderDataItem.Id
                        PMFolderExists = True
                        Exit For
                    End If
                Next
            End If

            'If the PM folder doesn't exist, folder doesn't exist, create it
            If PMFolderExists = False Then
                PMFolderID = AddFolder("Project Management", StarterAppsFolderID)
                'Break inheritance and remove inherited permissions
                SetFolderPermissions(PMFolderID)
                'Remove permissions for all inherited groups
                RemoveInheritedUserGroups(PMFolderID)
                'Add CMS usergroup and add to PM folder
                GroupName = "starterapps.pm"
                CMSGroupID = PMUser.AddCMSUserGroup(GroupName)
                PMUser.AddUserGroupToFolder(PMFolderID, CMSGroupID, False)
                'Make Folder is marked 'Private'
                SetFolderPrivate(PMFolderID)
            End If

            'See if the metadata mefinition for default content exists
            'If not, create it.

            MembershipBlogMetadataExists = False
            CMSBlogMetadataExists = False
            WikiMetadataExists = False

            MetadataCollection = Metadata.GetMetaDataTypes("Title")
            For Each MetadataType In MetadataCollection
                Select Case MetadataType.TypeName
                    Case "starterapps.pm.DefaultContent"
                        MetadataID = MetadataType.TypeId
                        WikiMetadataExists = True
                    Case "starterapps.pm.MembershipBlog"
                        MetadataID = MetadataType.TypeId
                        MembershipBlogMetadataExists = True
                    Case "starterapps.pm.CMSBlog"
                        MetadataID = MetadataType.TypeId
                        CMSBlogMetadataExists = True
                End Select
            Next

            If WikiMetadataExists = False Then
                MetadataID = AddMetadataDefinition(MetadataDefinitionTypes.Wiki)
            End If

            If MembershipBlogMetadataExists = False Then
                MetadataID = AddMetadataDefinition(MetadataDefinitionTypes.MembershipBlog)
            End If

            If CMSBlogMetadataExists = False Then
                MetadataID = AddMetadataDefinition(MetadataDefinitionTypes.CMSBlog)
            End If

            'Register Page Templates
            RegisterTemplate("Projects.aspx")
            RegisterTemplate("Wiki.aspx")
            RegisterTemplate("Discussion.aspx")
            RegisterTemplate("Documents.aspx")
            RegisterTemplate("Milestones.aspx")
            RegisterTemplate("Blog.aspx")
            RegisterTemplate("Login.aspx")

            'Import Milestones Smartform
            SmartFormID = GetSmartFormID()
            If SmartFormID = -1 Then
                RegisterMilestonesSmartForm()
            End If

            Return PMFolderID
        End Function

#End Region

#Region "Project Management Public Methods"

        ''' <summary>
        ''' This method breaks content and metadata inheritence for folders.  You may specificy which inheritence property you wish to break or specify that you with to break both.
        ''' </summary>
        ''' <param name="FolderID">Folder id of the folder you wish to break inheritence</param>
        ''' <remarks>
        ''' Breaking folder inheritence allows us to apply the three required Project Management StarterApp metadata types to the folders that require them, and only to the folders that require them.
        ''' Only Blogs should be assigned the "blogs" metdata types, and only the "project/wiki" folder should be assigned the "default content" metadata type 
        ''' </remarks>
        Public Sub SetFolderPermissions(ByVal FolderID As Integer)
            Dim PermissionData As New Ektron.Cms.UserPermissionData
            Dim Permissions As New Ektron.Cms.API.Permissions

            'Break Folder Inheritance
            Permissions.DisableFolderInheritance(FolderID)
        End Sub

        ''' <summary>
        ''' This method sets the folder to private status.
        ''' </summary>
        ''' <param name="FolderID">Folder id of the folder to make private</param>
        ''' <remarks>
        ''' This is a workaround since there is no direct API call to ensure a folder is set to private.
        ''' To ensure this method executes properly, we must borrow the internal admin's rights by switching the
        ''' user id of the user executing this folder to the constant INTERNALADMIN, and switch it back before finishing executiion
        ''' Calling this method without doing this even with an authorized CMS user results in a throw.
        ''' Since this user has already been authenticated to perform this action (creating a client or project folder),
        ''' we can use internal admin
        ''' to avoid this problem.
        ''' </remarks>
        Public Sub SetFolderPrivate(ByVal FolderID As Integer)
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim EkContent As Ektron.Cms.Content.EkContent = ContentAPI.EkContentRef
            Dim PageData As New Collection
            Dim TempID As Integer

            'Store the current users's id in a temprorary integer var
            TempID = ContentAPI.RequestInformationRef.CallerId
            'Set the current user's id to the INTERNALADMIN constant
            ContentAPI.RequestInformationRef.CallerId = Ektron.Cms.Common.EkConstants.InternalAdmin
            PageData.Add(FolderID, "ItemID")
            PageData.Add("folder", "RequestType")

            'EkContent.DisableItemPrivateSettingv2_0(pagedata) ' to make public
            EkContent.EnableItemPrivateSettingv2_0(PageData) ' to make private

            'Set the current user's id back
            ContentAPI.RequestInformationRef.CallerId = TempID
        End Sub

        ''' <summary>
        ''' This method gets the information architecture (navigation/content hierarchy) the current user
        ''' </summary>
        ''' <returns>
        ''' XHTML unordered list representing the clients and projects the current user has permissions to view/ineteact with.
        ''' </returns>
        ''' <remarks>
        ''' This method crawls the Project Management folder tree looking for branches to which the user has permissions to access.
        ''' Step 1) Represent this structure as XML
        ''' Step 2) Pass this XML to InformationArchitecture.xslt
        ''' Step 3) Return the transformed XML as XHTML unordered list.
        ''' </remarks>
        Public Function GetInformationArchitecture() As String
            Dim InformationArchitectureXML As New System.Xml.XmlDocument
            Dim InformationArchitectureXHTML As String = ""

            'Get Information Architecture
            If Me.InformationArchitectureXML Is Nothing Then
                InformationArchitectureXML = GetInformationArchitectureXML(False)
            Else
                InformationArchitectureXML = Me.InformationArchitectureXML
            End If
            'Transofrm Information Architecture XML to XHTML
            If (InformationArchitectureXML IsNot Nothing) Then
                InformationArchitectureXHTML = TransformInformationArchitectureXML()
            End If
            Return InformationArchitectureXHTML
        End Function

        ''' <summary>
        ''' This method transformes Information Architecture xml to an XHTML unordered list
        ''' </summary>
        ''' <returns>An XHTML unordered list</returns>
        ''' <remarks>This method is used to create the client/project navigation tree that the current user has permissions to traverse.</remarks>
        Public Function TransformInformationArchitectureXML() As String
            Dim XMLUtils As New XMLUtilities

            'Set XML Args
            XMLUtils.XMLSourceType = XMLUtilities.XMLSourceTypes.XMLDocument
            XMLUtils.XMLDocument = InformationArchitectureXML
            'Set XSLT Params
            XMLUtils.XSLTParams.Add("UserMode", Me.InformationArchitectureUserMode)
            XMLUtils.XSLTParams.Add("ClientID", Me.ClientID)
            XMLUtils.XSLTParams.Add("ProjectID", Me.ProjectID)
            'Set XSLT Args
            XMLUtils.XSLTSourceType = XMLUtilities.XSLTSourceTypes.File
            XMLUtils.XSLTSource = Me.IAPath & "xml/InformationArchitecture.xslt"
            'Transform Information Architectre
            TransformInformationArchitectureXML = XMLUtils.TransformXML()
        End Function

        ''' <summary>
        ''' This method generates an XML-based hierarchy of clients, project, and project components to which the user has permissions.
        ''' </summary>
        ''' <returns>An XML hierarchy of clients, projects, and project components</returns>
        ''' <remarks>
        ''' This hierarchy is generated once per-page load.  
        ''' This hierarchy contains all information necessary to create navigation and gather context for each request.
        ''' This accomplishes three main things...
        ''' (1) All permissions checks are performed once 
        ''' (2) All folder and content ids are looked-up once
        ''' (3) Context information is made available for each URI
        ''' </remarks>
        Public Function GetInformationArchitectureXML(ByVal IncludeMembers As Boolean) As System.Xml.XmlDocument
            Dim InformationArchitectureXML As New System.Xml.XmlDocument
            Dim PMfolderID As Integer
            Dim UserData As New Ektron.Cms.UserData
            Dim User As New Ektron.Cms.API.User.User
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim FolderData() As FolderData = Nothing
            Dim DocumentNode, ErrorNode, CurrentNode As System.Xml.XmlNode
            Dim XMLUtils As New XMLUtilities

            'Initalize the IA XML document
            DocumentNode = InformationArchitectureXML.CreateElement("ektron")
            InformationArchitectureXML.AppendChild(DocumentNode)
            CurrentNode = InformationArchitectureXML.DocumentElement

            'Get the project management folder's id
            PMfolderID = Initialize()

            'Get user information
            UserData = User.GetUser(ContentAPI.UserId)

            'Get all the child folders of the project management fodler (these are "clients")
            Try
                FolderData = ContentAPI.GetChildFoldersByFolderId(PMfolderID)
            Catch ex As Exception
                HttpContext.Current.Response.Redirect("Login.aspx", False)
                GetInformationArchitectureXML = Nothing
                FolderData = Nothing
                Exit Function
            End Try

            If FolderData IsNot Nothing Then
                Try
                    For Each Folder As FolderData In FolderData
                        If UserData.IsMemberShip = True Then
                            If MembershipUserTraverseOnly(ContentAPI.UserId, Folder.Id) = False Then
                                GetProjectXML(CurrentNode, Folder, InformationArchitectureXML)
                            End If
                        Else
                            GetProjectXML(CurrentNode, Folder, InformationArchitectureXML)
                        End If
                    Next
                Catch ex As Exception
                    ErrorNode = InformationArchitectureXML.CreateElement("li")
                    XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, ErrorNode, "status", "error")
                    XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, ErrorNode, "message", "Could not generate information architecture.")
                    CurrentNode.AppendChild(ErrorNode)
                End Try
            End If

            If IncludeMembers = True Then
                Me.InformationArchitectureXML = InformationArchitectureXML
                GetMembersXML()
            End If

            Return InformationArchitectureXML
        End Function

        ''' <summary>
        ''' This method gets an IDs for any of the three metadata definitions for the Project Management StarterApp
        ''' </summary>
        ''' <param name="Type">"Type" enumerated to restrict the lookup to the three required metadata definitions required for this application.</param>
        ''' <returns>A single metadata definition id</returns>
        ''' <remarks>
        ''' This method is intended for use with the Project Management StarterApp.
        ''' This method is not intended to be a general purpose lookup for metadata definition IDs
        ''' </remarks>
        Public Function GetMetadataDefinitionID(ByVal Type As MetadataDefinitionTypes) As Integer
            Dim Metadata As New Metadata
            Dim MetadataCollection() As Ektron.Cms.ContentMetaData
            Dim MetadataType As New Ektron.Cms.ContentMetaData
            Dim SelectedMetadataType As String

            Select Case Type
                Case MetadataDefinitionTypes.Wiki
                    SelectedMetadataType = "starterapps.pm.DefaultContent"
                Case MetadataDefinitionTypes.CMSBlog
                    SelectedMetadataType = "starterapps.pm.CMSBlog"
                Case MetadataDefinitionTypes.MembershipBlog
                    SelectedMetadataType = "starterapps.pm.MembershipBlog"
                Case Else
                    SelectedMetadataType = "None"
            End Select

            MetadataCollection = Metadata.GetMetaDataTypes("Title")
            For Each MetadataType In MetadataCollection
                If MetadataType.TypeName = SelectedMetadataType Then
                    GetMetadataDefinitionID = MetadataType.TypeId
                    Exit For
                Else
                    GetMetadataDefinitionID = -1
                End If
            Next

            Return GetMetadataDefinitionID
        End Function

        ''' <summary>
        ''' This method gets the breadcrumb trail based on the user's navigation selection.
        ''' </summary>
        ''' <returns>An XHTML unordered list.</returns>
        ''' <remarks>To generate the breadcrumb trail, this method transforms InformationArchitecture.xml with Breadcrumbs.xslt</remarks>
        Public Function GetBreadcrumbs() As String
            Dim XMLUtils As New XMLUtilities

            'Set XML Args
            XMLUtils.XMLSourceType = XMLUtilities.XMLSourceTypes.XMLDocument
            XMLUtils.XMLDocument = InformationArchitectureXML
            'Set XSLT Params
            XMLUtils.XSLTParams.Add("ProjectID", Me.ProjectID)
            XMLUtils.XSLTParams.Add("Template", Me.Template)
            XMLUtils.XSLTParams.Add("TemplateLabel", Me.TemplateLabel)
            'Set XSLT Args
            XMLUtils.XSLTSourceType = XMLUtilities.XSLTSourceTypes.File
            XMLUtils.XSLTSource = Me.IAPath & "xml/Breadcrumbs.xslt"
            'Transform Information Architectre
            GetBreadcrumbs = XMLUtils.TransformXML()
        End Function

        Public Function GetSmartFormID() As Integer
            Dim ContentAPI As New Ektron.Cms.ContentAPI()
            Dim TempID As Integer
            Dim SmartForms As Collection
            Dim SmartForm As Collection
            Dim SmartFormID As Integer = -1

            'Store the UserID of the actual user in a Temp var
            TempID = ContentAPI.RequestInformationRef.CallerId
            'Set the UserID internal admin
            ContentAPI.RequestInformationRef.CallerId = Ektron.Cms.Common.EkConstants.InternalAdmin
            'Get All SmartForms
            SmartForms = ContentAPI.EkContentRef.GetAllXmlConfigurations("title")
            Try
                For Each SmartForm In SmartForms
                    If (SmartForm("CollectionTitle") = "starterapps.pm.Milestones") Then
                        SmartFormID = SmartForm("CollectionID")
                        Exit Try
                    End If
                Next
            Catch ex As Exception
                ' handle exception however you want to
            End Try
            'Reset users id
            ContentAPI.RequestInformationRef.CallerId = TempID
            Return SmartFormID
        End Function

#End Region

#Region "Project Management Private Methods"

        ''' <summary>
        ''' This method removes any usergroups and users assigned to a folder.
        ''' </summary>
        ''' <param name="FolderID">The folder ID of the folder you wish to remove all usergroups from</param>
        ''' <remarks>
        ''' This method is used to "clean up" a folder after breaking content inheritence and 
        ''' before adding new usergroups to create a new permissions model.
        ''' Note: this method removes both all users and all usergroups.
        ''' </remarks>
        Private Sub RemoveInheritedUserGroups(ByVal FolderID As Integer)
            Dim Permissions As New Ektron.Cms.API.Permissions
            Dim PermissionsData() As Ektron.Cms.UserPermissionData

            PermissionsData = Permissions.GetUserPermissions(FolderID, "folder", 0, "")

            If PermissionsData IsNot Nothing Then
                For Each UserGroup As UserPermissionData In PermissionsData
                    Select Case UserGroup.GroupId
                        Case -1
                            If UserGroup.UserId > 1 Then
                                'This is a user - delete it.
                                Permissions.DeleteItemPermission(UserGroup.UserId, False, FolderID, EkEnumeration.CMSObjectTypes.Folder)
                            End If
                        Case 1
                            'This is the admin group - do nothing
                        Case Else
                            'This is a group - delete it.
                            Permissions.DeleteItemPermission(UserGroup.GroupId, True, FolderID, EkEnumeration.CMSObjectTypes.Folder)
                    End Select
                Next
            End If
        End Sub

        ''' <summary>
        ''' This method checks to see if a Membership user id has been specifically granted permissions to a folder
        ''' </summary>
        ''' <param name="UserId">The Membership user's id</param>
        ''' <param name="FolderID">The folder id of the fodler we wish to check</param>
        ''' <returns>"True" if the user can only Traverse the folder, "False" if the user has been granted permissions to interact (e.g. add, delete, edit...) with the content in the folder</returns>
        ''' <remarks>
        ''' By default, Membership users have Traverse permissions for all folders
        ''' This is a hardcoded setting!
        ''' This method figures out if a Membership user has been specifically granted permission for a folder
        ''' via direct assignment of the user to the fodler, or via a Membership user group that has been assigned to the folder
        ''' If the user has permissions beyond Traverse, the return value is set to "False", else it is set to "True"
        ''' </remarks>
        Private Function MembershipUserTraverseOnly(ByVal UserId As Integer, ByVal FolderID As Integer) As Boolean
            Dim UserAPI As New Ektron.Cms.API.User.User
            Dim GroupData() As Ektron.Cms.GroupData
            Dim PermissionsAPI As New Ektron.Cms.API.Permissions
            Dim PermissionsData() As Ektron.Cms.UserPermissionData

            'Get all the groups to which the user is assigned
            GroupData = UserAPI.GetGroupsUserIsIn(UserId, "groupname")
            'Get the permissions data for the folder being examined
            PermissionsData = PermissionsAPI.GetUserPermissions(FolderID, "folder", 0, "")
            'Set the default return value - that the Membership user has ONLY traverse permissions
            MembershipUserTraverseOnly = True

            For Each PermissionsItem As UserPermissionData In PermissionsData
                If PermissionsItem IsNot Nothing Then
                    'Check to see if the user has been granted access to the folder directly
                    If PermissionsItem.UserId = UserId Then
                        'In this case, the user has specifically been granted access to the folder
                        'Set return value to false - use has been granted more access
                        'than the default traverse-only permission
                        MembershipUserTraverseOnly = False
                        Exit For
                    End If
                    'Check to see if the user has been granted access to the folder via a Membership group
                    For Each UserGroup As GroupData In GroupData
                        If UserGroup.GroupId = PermissionsItem.GroupId Then
                            'In this case, the user belongs to a Membership usergroup that has
                            'specifically been granted access to the folder
                            'Set return value to false - use has been granted more access
                            'than the default traverse-only permission
                            MembershipUserTraverseOnly = False
                            Exit For
                        End If
                    Next
                End If
                If MembershipUserTraverseOnly = False Then
                    Exit For
                End If
            Next
        End Function

        ''' <summary>
        ''' This method inserts member-information to the Client nodes in the InformationArchitecture.xml generated by GetInformationArchitectureXML()
        ''' </summary>
        ''' <returns>InformationArchitecture.xml including membership users assgined to each client</returns>
        ''' <remarks>
        ''' This method inserts a "Members" node to each client.
        ''' Then loops through the membership group assigned to the client and inserts a "Member" node 
        ''' (with id, username, firstname, lastname attributes) for each client to the "Members" node
        ''' </remarks>
        Private Function GetMembersXML() As System.Xml.XmlDocument
            Dim InformationArchitectureXML As New System.Xml.XmlDocument
            Dim Clients As System.Xml.XmlNodeList = Nothing
            Dim Users As New Ektron.Cms.API.User.User
            Dim UserGroupData As New Ektron.Cms.UserGroupData
            Dim Members As New Collection
            Dim MembersNode, MemberNode As System.Xml.XmlNode
            Dim XMLUtils As New XMLUtilities
            Dim MemberData As New UserData
            Dim TempID As Integer

            InformationArchitectureXML = Me.InformationArchitectureXML
            If (InformationArchitectureXML IsNot Nothing) Then
                Clients = InformationArchitectureXML.SelectNodes("//li[@class='Client']")
            End If
            If (Clients Is Nothing) Then
                Return InformationArchitectureXML
                Exit Function
            End If
            For Each Client As XmlNode In Clients
                Try
                    UserGroupData = Users.GetUserGroupByName("starterapps.pm." & Client.Attributes.GetNamedItem("label").Value)
                Catch ex As Exception
                    Throw New Exception("Error getting membership usergroup for client: " & ex.Message)
                End Try

                If UserGroupData IsNot Nothing Then
                    'Create a "members" node for this client
                    MembersNode = InformationArchitectureXML.CreateElement("li")
                    XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MembersNode, "label", Client.Attributes.GetNamedItem("label").Value & " Members")
                    XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MembersNode, "class", "members")
                    Client.InsertBefore(MembersNode, Client.FirstChild)

                    'Store the UserID of the actual user in a Temp var
                    TempID = Users.RequestInformationRef.CallerId
                    'Set the UserID internal admin
                    Users.RequestInformationRef.CallerId = Ektron.Cms.Common.EkConstants.InternalAdmin
                    'Get all users that belong to the client's membership group using Internal Admin
                    Members = Users.EkUserRef.GetUsersByGroupv2_0(UserGroupData.GroupId, "")

                    If Members IsNot Nothing Then
                        For Each Member As Collection In Members
                            MemberData = Users.GetUser(Member.Item("UserID"))
                            MemberNode = IADoc.CreateElement("li")
                            XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MemberNode, "class", "member")
                            XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MemberNode, "id", Member.Item("UserID"))
                            XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MemberNode, "username", MemberData.Username)
                            XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MemberNode, "firstname", MemberData.FirstName)
                            XMLUtils.ApplyXMLAttribute(InformationArchitectureXML, MemberNode, "lastname", MemberData.LastName)
                            MembersNode.AppendChild(MemberNode)
                        Next
                    End If

                    'Reset the UserID to the id of the actual user
                    Users.RequestInformationRef.CallerId = TempID
                End If

            Next

            Return InformationArchitectureXML
        End Function

        ''' <summary>
        ''' This method collects blog component information and inserts this information into InformationArchitecture.xml
        ''' This method recursively calls itself to gather all folders/sub-folders of a particular project.
        ''' </summary>
        ''' <param name="CurrentNode">This is the current folder in the recursive loop</param>
        ''' <param name="FolderData">This is the Ektron FolderData object of the current fodler in the recursive loop</param>
        ''' <param name="IAdoc">This is the pointer to the InformationAcrichtecture.xml document being built</param>
        ''' <remarks>
        ''' This method fills out the details of project-level components.
        ''' It collects as XML attributes the client, project or component's...
        ''' label - the name of the client, project or component
        ''' id - folder id
        ''' class - Enumerated as "Client," "Project," "Blog," "DiscussionBoard," "DiscussionForum," "CommunityDocuments, "CommunityMilestones," "Content," "Domain," "Root," or "Community" 
        ''' type - if the node is a blog, then it also gets a "type" attribute; either "MembershipBlog", or "CMSBlog"
        '''</remarks>
        Private Sub GetProjectXML(ByRef CurrentNode As XmlNode, ByRef FolderData As Ektron.Cms.FolderData, ByRef IAdoc As System.Xml.XmlDocument)
            Dim Node, ErrorNode As XmlNode
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim Permissions As New Ektron.Cms.API.Permissions
            Dim XMLUtils As New XMLUtilities
            Dim UserData As New Ektron.Cms.UserData
            Dim User As New Ektron.Cms.API.User.User
            Dim NodeDepth As Integer
            Dim NodeDepthNavigator As System.Xml.XPath.XPathNavigator
            Dim NodeClass As String = "Undetermined"
            Dim GetBlogType As Boolean = False
            Dim BlogType As String

            'Create a new li element to hold information regarding the current level in the Info Architecture
            Node = IAdoc.CreateElement("li")

            'Add Title and ID attributes.
            XMLUtils.ApplyXMLAttribute(IAdoc, Node, "label", FolderData.Name)
            XMLUtils.ApplyXMLAttribute(IAdoc, Node, "id", FolderData.Id)

            'Class the node by virtue of it's depth in the hierarchy
            NodeDepthNavigator = CurrentNode.CreateNavigator
            NodeDepth = NodeDepthNavigator.Evaluate("count(ancestor-or-self::li)")
            Select Case NodeDepth
                Case 0
                    NodeClass = "Client"
                Case 1
                    NodeClass = "Project"
                Case Else
                    Select Case FolderData.FolderType
                        Case 0
                            NodeClass = "Content"
                        Case 1
                            NodeClass = "Blog"
                            GetBlogType = True
                        Case 2
                            NodeClass = "Domain"
                        Case 3
                            NodeClass = "DiscussionBoard"
                        Case 4
                            NodeClass = "DiscussionForum"
                        Case 5
                            NodeClass = "Root"
                        Case 6
                            Select Case FolderData.Name
                                Case "Documents"
                                    NodeClass = "CommunityDocuments"
                                Case "Milestones"
                                    NodeClass = "CommunityMilestones"
                                Case Else
                                    NodeClass = "Community"
                            End Select
                    End Select
            End Select

            XMLUtils.ApplyXMLAttribute(IAdoc, Node, "class", NodeClass)

            If GetBlogType = True Then
                BlogType = GetBlogPermissionsType(FolderData.Id)
                XMLUtils.ApplyXMLAttribute(IAdoc, Node, "type", BlogType)
            End If

            'Append current fodler node (with all its attributes, and child node with thier attributes) to its parent node)
            CurrentNode.AppendChild(Node)

            'Get user information
            UserData = User.GetUser(ContentAPI.UserId)

            'Get all child folders that current user has permissions to see
            Dim ChildFolders As New Ektron.Cms.ContentAPI
            Dim ChildFolderData() As Ektron.Cms.FolderData = Nothing

            Try
                ChildFolderData = ChildFolders.GetChildFoldersByFolderId(FolderData.Id)
                If ChildFolderData IsNot Nothing Then
                    For Each ChildFolder As FolderData In ChildFolderData
                        If UserData.IsMemberShip = True Then
                            If MembershipUserTraverseOnly(ContentAPI.UserId, ChildFolder.Id) = False Then
                                GetProjectXML(Node, ChildFolder, IAdoc)
                            End If
                        Else
                            GetProjectXML(Node, ChildFolder, IAdoc)
                        End If
                    Next
                End If
            Catch ex As Exception
                ErrorNode = IAdoc.CreateElement("li")
                XMLUtils.ApplyXMLAttribute(IAdoc, ErrorNode, "status", "error")
                XMLUtils.ApplyXMLAttribute(IAdoc, ErrorNode, "message", ex.Message)
                CurrentNode.AppendChild(ErrorNode)
            End Try
        End Sub

        ''' <summary>
        ''' This method gets the logical "type" of blog.
        ''' </summary>
        ''' <param name="BlogID">ID of a blog inside the Project Management StarterApp folder tree</param>
        ''' <returns>String: either "MembershipBlog", or "CMSBlog."</returns>
        ''' <remarks>
        ''' This value is based on a metadata setting assinged at the time the blog was created.
        ''' This value defferentiates blogs intended for CMS users from those intended for CMS AND Memebership users.
        ''' </remarks>
        Private Function GetBlogPermissionsType(ByVal BlogID As Integer) As String
            Dim Metadata As New Ektron.Cms.API.CustomFields
            Dim MetadataCollection As New Collection
            Dim MetadataType As String = "None"
            Dim BlogTypeArray(0) As String
            Dim BlogType As String

            MetadataCollection = Metadata.GetFieldsByFolder(BlogID, 1033)
            For Each MetadataItem As Collection In MetadataCollection
                If MetadataItem IsNot Nothing Then
                    If MetadataItem.Item("Assigned") <> 0 Then
                        MetadataType = MetadataItem.Item("CustomFieldName")
                    End If
                End If
            Next
            BlogTypeArray = Split(MetadataType, ".")
            BlogType = BlogTypeArray(BlogTypeArray.Length - 1)
            Return BlogType
        End Function

        ''' <summary>
        ''' This method registers our tempates inside CMS400 during Project Management StarterApp Initialization.
        ''' </summary>
        ''' <param name="TemplateName">The name of the template to resister</param>
        ''' <remarks>Path to the templates is hardcoded in this method as "StarterApps/ProjectManagement/"</remarks>
        Private Sub RegisterTemplate(ByVal TemplateName As String)
            Dim TemplateData As New Collection()
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim ExistingTemplates As TemplateData() = ContentAPI.GetAllTemplates("")
            Dim TemplateFileName As String
            Dim TemplateExists As Boolean = False

            TemplateFileName = "StarterApps/ProjectManagement/" & TemplateName

            'Check to see if template already exists
            For Each Template As TemplateData In ExistingTemplates
                If Template.FileName = TemplateFileName Then
                    TemplateExists = True
                    Exit For
                End If
            Next

            'If the template doesn't exist, add it
            If TemplateExists = False Then
                TemplateData.Add(TemplateFileName, "TemplateFileName")
                ContentAPI.EkContentRef.AddTemplatev2_0(TemplateData)
            End If
        End Sub

        ''' <summary>
        ''' This method is called by Initialize() when creating the required metdata values
        ''' </summary>
        ''' <param name="Type">Values: "starterapps.pm.DefaultContent", "starterapps.pm.MembershipBlog", "starterapps.pm.CMSBlog"</param>
        ''' <returns>Metadata definition id</returns>
        ''' <remarks>
        ''' "starterapps.pm.DefaultContent" - used to identify a content entry to load by default when the Wiki loads without any user-selected content
        ''' "starterapps.pm.MembershipBlog" - used during the creation if InformationArchitecture.xml to identify the audience of the blog ("Membership Blogs" are actually viewable by both CMS users AND Membership users.)
        ''' "starterapps.pm.CMSBlog" - used during the creation if InformationArchitecture.xml to identify the audience of the blog ("CMS Blogs" are viewable only by CMS users.)
        ''' </remarks>
        Private Function AddMetadataDefinition(ByVal Type As MetadataDefinitionTypes) As Integer
            Dim Metadata As New Metadata
            Dim MetadataCollection As New Ektron.Cms.ContentMetaData
            Dim MetadataTypeName As String

            Select Case Type
                Case MetadataDefinitionTypes.Wiki
                    MetadataTypeName = "starterapps.pm.DefaultContent"
                Case MetadataDefinitionTypes.MembershipBlog
                    MetadataTypeName = "starterapps.pm.MembershipBlog"
                Case MetadataDefinitionTypes.CMSBlog
                    MetadataTypeName = "starterapps.pm.CMSBlog"
                Case Else
                    Exit Function
            End Select

            MetadataCollection.TypeName = MetadataTypeName
            MetadataCollection.DefaultText = "No"

            'Title Values:
            'text, number, byte, double, float, integer, long, short, date, boolean, select1 (select from a list), select (multiple selections)
            MetadataCollection.Title = "boolean"
            'TagType Values:
            '100 - Searchable Property
            '1 - Meta
            '0 - HTML
            '2 - Collection
            '3 - List Summary
            '4 - Content
            '5 - Image
            '7 - File
            MetadataCollection.TagType = "100"
            MetadataCollection.Editable = True
            MetadataCollection.Separater = ";"
            MetadataCollection.SearchAllowed = True
            MetadataCollection.SelectableText = "-1"
            MetadataCollection.MetaDisplayEE = False
            MetadataCollection.MetaDisplay = False
            MetadataCollection.IsSelectableOnly = True

            Try
                Metadata.AddMetaDataType(MetadataCollection)
            Catch ex As Exception
                Return -1
            End Try

            Return MetadataCollection.TypeId

        End Function

        ''' <summary>
        ''' Creates StarterApps and Project Management folders.
        ''' </summary>
        ''' <param name="FolderName">This should either be "StarterApps" or "Project Management"</param>
        ''' <param name="ParentID">This should either by "0" if it's the "StarterApps" folder or StarterAppsFolderID if it's the "Project Management" folder</param>
        ''' <returns>Folder id</returns>
        ''' <remarks>This method is called by the Intialize() method</remarks>
        Private Function AddFolder(ByVal FolderName As String, ByVal ParentID As Integer) As Integer

            Dim FolderRequest As New FolderRequest
            Dim FolderDataItem As New FolderData

            FolderRequest.FolderName = FolderName
            FolderRequest.ParentId = ParentID
            FolderRequest.MetaInherited = 0
            FolderRequest.StyleSheet = "NoCss.css"
            FolderRequest.TemplateFileName = "NoTemplate.aspx"
            FolderRequest.TaxonomyInherited = False
            FolderRequest.CategoryRequired = False
            FolderRequest.FolderType = Ektron.Cms.Common.EkEnumeration.FolderType.Content
            FolderRequest.suppressNotification = True
            FolderRequest.FolderDescription = "Ektron Starter Apps Folder"
            FolderRequest.SiteMapPathInherit = False
            FolderAPI.AddFolder(FolderRequest)

            Return FolderRequest.FolderId
        End Function

        Private Sub RegisterMilestonesSmartForm()
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim TempID As Integer
            Dim SmartFormData As New Collection
            Dim SmartFormXML, SmartFormDisplayXSLT As String
            Dim XMLDoc, XSLDoc As New System.Xml.XmlDocument
            Dim SmartFormID As Integer
            Dim EkContent As New Ektron.Cms.Content.EkContent
            Dim Package As New Collection()

            'Store the current users's id in a temprorary integer var
            TempID = ContentAPI.RequestInformationRef.CallerId
            'Set the current user's id to the INTERNALADMIN constant
            ContentAPI.RequestInformationRef.CallerId = Ektron.Cms.Common.EkConstants.InternalAdmin

            'Get Milestones SmartForm Package XML
            XMLDoc.Load(System.Web.HttpContext.Current.Server.MapPath("xml/MilestonesSmartForm.xml"))
            SmartFormXML = XMLDoc.InnerXml
            'Get Milestones SmartForm Display XSLT
            XSLDoc.Load(System.Web.HttpContext.Current.Server.MapPath("xml/MilestonesSmartForm.xsl"))
            SmartFormDisplayXSLT = XSLDoc.InnerXml

            'Below are the Collection Paramters for the SmartForm Collection
            SmartFormData.Add("0", "DefaultXSLT")
            SmartFormData.Add("starterapps.pm.Milestones", "CollectionTitle")
            SmartFormData.Add("This smart form is associated with Milestones in the Project Management StarterApp", "CollectionDescription")
            SmartFormData.Add(System.Web.HttpContext.Current.Server.MapPath("xml"), "PhysicalPath")
            SmartFormData.Add("", "displayXslt")
            SmartFormData.Add("", "EditXSLT")
            SmartFormData.Add("", "SaveXSLT")
            SmartFormData.Add("", "XSLT1")
            SmartFormData.Add("", "XSLT2")
            SmartFormData.Add("", "XSLT3")
            SmartFormData.Add("", "XSLT4")
            SmartFormData.Add("", "XSLT5")
            SmartFormData.Add("", "XmlSchema")
            SmartFormData.Add("", "XmlNameSpace")
            SmartFormData.Add("", "XmlAdvConfig")
            SmartFormID = ContentAPI.AddXmlConfiguration(SmartFormData)

            'Add the SmartForm Package
            Package.Add(SmartFormID, "XmlCollectionID")
            Package.Add(SmartFormXML, "Package")
            Package.Add(SmartFormDisplayXSLT, "displayXslt")
            Package.Add("", "DesignStylesheet")
            ContentAPI.UpdatexmlCollectionPackage(Package)

            'Set the current user's id back
            ContentAPI.RequestInformationRef.CallerId = TempID
        End Sub
#End Region

    End Class

    Public Class Projects

#Region "Project Properties"

        Private ProjectNameValue As String
        Private ClientNameValue As String
        Private ClientIDValue As Integer
        Private PMFolderIDValue As Integer

        Public Property ProjectName() As String
            Get
                'Return unescapes project name
                Return System.Web.HttpUtility.HtmlDecode(ProjectNameValue)
            End Get
            Set(ByVal Value As String)
                ProjectNameValue = System.Web.HttpUtility.HtmlDecode(Value)
            End Set
        End Property

        Public Property ClientID() As Integer
            Get
                Return ClientIDValue
            End Get
            Set(ByVal Value As Integer)
                ClientIDValue = Value
            End Set
        End Property

        Public Property PMFolderID() As Integer
            Get
                Return PMFolderIDValue
            End Get
            Set(ByVal Value As Integer)
                PMFolderIDValue = Value
            End Set
        End Property

        Public Property ClientName() As String
            Get
                'Return unescapes client name
                Return System.Web.HttpUtility.HtmlDecode(ClientNameValue)
            End Get
            Set(ByVal Value As String)
                ClientNameValue = System.Web.HttpUtility.HtmlDecode(Value)
            End Set
        End Property

#End Region

#Region "Project Public Methods"

        ''' <summary>
        ''' This method retrieves all project folder names and ids that the user has permissions to view.
        ''' </summary>
        ''' <returns>NameValueCollection; the folder's name, the folder's id</returns>
        ''' <remarks>
        ''' This method respects permissions (using the GetChildFolders() method) and will only return the folders the user is allowed to view.
        ''' </remarks>
        Public Function GetAllProjects() As NameValueCollection
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim PM As New Ektron.Cms.StarterApps.ProjectManagement.ProjectManagement
            Dim PMFolderID As Integer
            Dim Projects As New NameValueCollection
            Dim FolderData() As FolderData
            Dim Folder As New FolderData

            'Get the Project Management folder's id
            PMFolderID = PM.Initialize()
            'Create nameValueCollection of folder names and folder ids
            FolderData = FolderAPI.GetChildFolders(PMFolderID, False)
            If Not FolderData Is Nothing Then
                For Each Folder In FolderData
                    Projects.Add(Folder.Name, Folder.Id)
                Next
            End If
            'Return the NameValueCollection
            Return Projects
        End Function

        Public Function GetProjectTaxonomyID(ByVal ProjectFolderID As Integer) As Integer
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim FolderData As New Ektron.Cms.FolderData
            Dim Taxonomy As New Ektron.Cms.API.Content.Taxonomy
            Dim TaxonomyBaseData() As Ektron.Cms.TaxonomyBaseData
            Dim TaxonomyBaseDatum As New Ektron.Cms.TaxonomyBaseData
            Dim ProjectName, ClientName As String
            Dim TaxonomyID As Integer = -1

            'Get the project's name
            FolderData = FolderAPI.GetFolder(ProjectFolderID, True)
            ProjectName = System.Web.HttpUtility.HtmlDecode(FolderData.Name)
            TaxonomyBaseData = FolderData.FolderTaxonomy

            'Get the client's name
            FolderData = FolderAPI.GetFolder(FolderData.ParentId)
            ClientName = System.Web.HttpUtility.HtmlDecode(FolderData.Name)

            'Get the project's taxonomy
            For Each TaxonomyBaseDatum In TaxonomyBaseData
                If TaxonomyBaseDatum.TaxonomyName = "starterapps.pm." & ClientName & "." & ProjectName Then
                    TaxonomyID = TaxonomyBaseDatum.TaxonomyId
                    Exit For
                End If
            Next

            Return TaxonomyID
        End Function

        ''' <summary>
        ''' This method adds a project to the Project Management StarterApp
        ''' </summary>
        ''' <remarks>
        ''' This method does several things...
        ''' (1) Creates the Project folder (this is the Wiki folder) as a Community Folder and associates this folder with "Wiki.aspx"
        ''' (2) Breaks inheritence and sets the Project folder to PRIVATE
        ''' (3) Creates a default Wiki project entry (a few paragraphs of Lorem Ipsum)
        ''' (4) Imports the default PM Taxonomy for use with the Wiki
        ''' (5) Creates the Documents folder as Community Folder and associates this folder with "Documents.aspx"
        ''' (6) Breaks inheritence and sets the Documents folder to PRIVATE
        ''' (7) Creates the Milestones folder as Community Folder and associates this folder with "Milestones.aspx"
        ''' (8) Breaks inheritence and sets the Milestones folder to PRIVATE
        ''' (9) Creates the MembershipBlog and associates this folder with "Blog.aspx"
        ''' (10) Breaks inheritence and sets permissions for this folder
        ''' (11) Creates the CMSBlog and associates this folder with "Blog.aspx"
        ''' (12) Breaks inheritence and sets permissions for this folder
        ''' (13) Creates the Discussion folder and associates this folder with "Discussion.aspx"
        ''' (14) Breaks inheritence and sets permissions for this folder
        ''' </remarks>
        Public Sub AddProject()

            'Ektron.ProjectManagement Namespace
            Dim PM As New Ektron.Cms.StarterApps.ProjectManagement.ProjectManagement
            Dim Clients As New Clients
            Dim Users As New Users

            'Ektron
            Dim NewProjectFolder As New FolderRequest
            Dim FolderRequest As New Ektron.Cms.FolderRequest
            Dim FolderData As New Ektron.Cms.FolderData
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim ClientGroup As New Ektron.Cms.API.User.User
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim Taxonomy As New Ektron.Cms.API.Content.Taxonomy
            Dim TaxonomyBaseDatum As New Ektron.Cms.TaxonomyBaseData
            Dim TaxonomySyncRequest As New Ektron.Cms.TaxonomySyncRequest
            Dim TaxonomyContentRequest As New TaxonomyContentRequest
            Dim TaxonomyRequest As New Ektron.Cms.TaxonomyRequest
            Dim ContentRW As New Ektron.Cms.DataIO.EkContentRW(ContentAPI.RequestInformationRef)
            Dim UserGroup As New API.User.User
            Dim UserGroupData As New UserGroupData
            Dim Permissions As New Ektron.Cms.API.Permissions

            'General
            Dim PMFolderID, ClientFolderID, ProjectFolderID, DocumentsFolderID, MilestonesFolderID, CMSGroupID, BlogID, DiscussionID, MetadataDefinitionID, TaxonomyID, MilestonesSmartFormID, DefaultWikiContentID, TaxonomyCategoryID As Integer
            Dim DefaultTaxonomy, TaxonomyPath As String
            Dim SmartFormCollection, BlogPermissionData As New Collection()

            'Get PM folder id
            PMFolderID = PM.Initialize
            PM.Initialize()
            'Get Client folder id
            ClientFolderID = Me.ClientID
            'Set ClientName property
            FolderData = FolderAPI.GetFolder(ClientFolderID)
            Me.ClientName = FolderData.Name
            'Get CMS group id
            CMSGroupID = Users.AddCMSUserGroup("starterapps.pm")

            '- Project Folder -
            '----------------------------------------------------------------------------------
            'Get metadta definition id for default content for wiki (so we can assign a "default" content block)
            MetadataDefinitionID = PM.GetMetadataDefinitionID(ProjectManagement.MetadataDefinitionTypes.Wiki)

            'Add Project folder
            Me.ProjectName = MakeFolderNameUnique(ClientFolderID, Me.ProjectName)
            ProjectFolderID = AddPMCommunityFolder(ClientFolderID, Me.ProjectName, "Project Folder", MetadataDefinitionID)
            'Break Inheritance and set Permissions for project folder
            PM.SetFolderPermissions(ProjectFolderID)
            'Make Folder is marked 'Private'
            PM.SetFolderPrivate(ProjectFolderID)

            'Set folder template
            SetFolderTemplate(ProjectFolderID, "Wiki.aspx")

            'Get the default taxonomy and import it
            DefaultTaxonomy = GetDefaultTaxonomy()
            TaxonomyID = Taxonomy.ImportTaxonomy(DefaultTaxonomy, "starterapps.pm." & Me.ClientName & "." & Me.ProjectName)
            'Add the Project (Wiki) folder  to the root of the Taxonomy so that all Wiki content gets indexed
            TaxonomySyncRequest.SyncIdList = ProjectFolderID
            TaxonomySyncRequest.TaxonomyId = TaxonomyID
            TaxonomySyncRequest.TaxonomyLanguage = ContentAPI.DefaultContentLanguage
            Taxonomy.AddTaxonomySyncFolder(TaxonomySyncRequest)

            'Add the Taxonomy to the Project (Wiki) Folder
            FolderData = FolderAPI.GetFolder(ProjectFolderID)
            FolderRequest.FolderId = ProjectFolderID
            FolderRequest.BreakInheritButton = True
            FolderRequest.DomainProduction = FolderData.DomainProduction
            FolderRequest.DomainStaging = FolderData.DomainStaging
            FolderRequest.FolderDescription = FolderData.Description
            FolderRequest.MetaInherited = 0
            FolderRequest.FolderName = FolderData.Name
            FolderRequest.IsDomainFolder = FolderData.IsDomainFolder
            FolderRequest.ParentId = FolderData.ParentId
            FolderRequest.PublishActive = FolderData.PublishHtmlActive
            FolderRequest.SiteMapPath = FolderData.SitemapPath
            FolderRequest.SiteMapPathInherit = False
            FolderRequest.StyleSheet = FolderData.StyleSheet
            FolderRequest.TemplateFileName = FolderData.TemplateFileName
            FolderRequest.XmlInherited = FolderData.XmlInherited
            FolderRequest.TaxonomyInherited = False
            FolderRequest.CategoryRequired = True
            FolderRequest.TaxonomyInheritedFrom = ProjectFolderID
            FolderRequest.TaxonomyIdList = TaxonomyID.ToString
            FolderAPI.UpdateFolder(FolderRequest)

            'Add default Wiki entry
            DefaultWikiContentID = ContentAPI.AddContent(Me.ProjectName & " Wiki", "Default Wiki Entry", LoremIpsumLong(), "", LoremIpsumShort(), ContentAPI.DefaultContentLanguage, ProjectFolderID, "", "", "<metadata><meta id=" & """" & MetadataDefinitionID & """" & ">Yes</meta></metadata>")
            'Add default Wiki entry to Taxonomy "general" category
            TaxonomyPath = "\starterapps.pm." & Me.ClientName & "." & Me.ProjectName & "\General"
            TaxonomyCategoryID = Taxonomy.GetTaxonomyIdByPath(TaxonomyPath)
            TaxonomyContentRequest.ContentId = DefaultWikiContentID
            TaxonomyContentRequest.TaxonomyList = Convert.ToString(TaxonomyCategoryID)
            ContentAPI.AddTaxonomyItem(TaxonomyContentRequest)
            '----------------------------------------------------------------------------------


            '- Documents Folder -
            '----------------------------------------------------------------------------------
            'Add Project folder
            DocumentsFolderID = AddPMCommunityFolder(ProjectFolderID, "Documents", "Project Documents", -1)
            'Break Inheritance and set Permissions for project folder
            PM.SetFolderPermissions(DocumentsFolderID)
            'Make Folder is marked 'Private'
            PM.SetFolderPrivate(DocumentsFolderID)
            'Set folder template
            SetFolderTemplate(DocumentsFolderID, "Documents.aspx")
            '----------------------------------------------------------------------------------


            '- Milestones Folder -
            '----------------------------------------------------------------------------------
            'Add Project folder
            MilestonesFolderID = AddPMCommunityFolder(ProjectFolderID, "Milestones", "Project Milestones", -1)
            'Break Inheritance and set Permissions for project folder
            PM.SetFolderPermissions(MilestonesFolderID)
            'Make Folder is marked 'Private'
            PM.SetFolderPrivate(MilestonesFolderID)
            'Set Read-Only Permissions on this folder for Membersip users (membership users cannot add content via smartforms)
            MakeFolderReadOnly(MilestonesFolderID)
            'Set folder template
            SetFolderTemplate(MilestonesFolderID, "Milestones.aspx")

            'Get Milestones SmartForm ID
            MilestonesSmartFormID = PM.GetSmartFormID()
            'Add Milestones SmartForm to Milestones Folder
            SmartFormCollection.Add(MilestonesSmartFormID, MilestonesSmartFormID)
            ContentRW.UpdateFolderXmlList(MilestonesFolderID, MilestonesSmartFormID, SmartFormCollection)
            '----------------------------------------------------------------------------------


            '- Membership User's Blog -
            '----------------------------------------------------------------------------------
            'Add Project Blog
            BlogID = AddBlog(ProjectFolderID, "Blog", Me.ProjectName & " Blog", "All client members may view and contribute to this blog")
            'Set folder template
            SetFolderTemplate(BlogID, "Blog.aspx")
            'Assign "Blog" metadata definition to blog
            MetadataDefinitionID = PM.GetMetadataDefinitionID(ProjectManagement.MetadataDefinitionTypes.MembershipBlog)
            AddMetadataDefinitionToFolder(BlogID, MetadataDefinitionID)

            'This blog has inherited the Taxonomy of the Wiki (parent folder)
            'Remove Taxonomy inheritence, the Taxonomy itself, and the Taxonomy category requirement from this folder (blog)
            'This code may be removed at some point.  As of build 99 taxonomies are inherited.
            FolderData = FolderAPI.GetFolder(BlogID)
            FolderRequest.FolderId = BlogID
            FolderRequest.BreakInheritButton = True
            FolderRequest.DomainProduction = FolderData.DomainProduction
            FolderRequest.DomainStaging = FolderData.DomainStaging
            FolderRequest.FolderDescription = FolderData.Description
            FolderRequest.MetaInherited = 0
            FolderRequest.FolderName = FolderData.Name
            FolderRequest.IsDomainFolder = FolderData.IsDomainFolder
            FolderRequest.ParentId = FolderData.ParentId
            FolderRequest.PublishActive = FolderData.PublishHtmlActive
            FolderRequest.SiteMapPath = FolderData.SitemapPath
            FolderRequest.SiteMapPathInherit = False
            FolderRequest.StyleSheet = FolderData.StyleSheet
            FolderRequest.TemplateFileName = FolderData.TemplateFileName
            FolderRequest.XmlInherited = FolderData.XmlInherited
            FolderRequest.TaxonomyInherited = False
            FolderRequest.CategoryRequired = False
            FolderRequest.TaxonomyInheritedFrom = BlogID
            FolderRequest.TaxonomyIdList = ""
            FolderAPI.UpdateFolder(FolderRequest)

            'Add a default blog entry (Lorem Ipsum)
            AddDefaultBlogEntry(BlogID, Me.ProjectName & " Blog")
            '----------------------------------------------------------------------------------

            '- CMS User's Blog -
            '----------------------------------------------------------------------------------
            'Add Private Blog
            BlogID = AddBlog(ProjectFolderID, "Private Blog", Me.ProjectName & " Private Blog", "Only CMS users may view and contribute to this blog")
            'Remove Membership usergroup from CMS User's Blog
            UserGroupData = UserGroup.GetUserGroupByName("starterapps.pm." & Me.ClientName)
            Permissions.DeleteItemPermission(UserGroupData.GroupId, True, BlogID, EkEnumeration.CMSObjectTypes.Folder)
            'Set folder template
            SetFolderTemplate(BlogID, "Blog.aspx")
            'Assign "PrivateBlog" metadata definition to blog
            MetadataDefinitionID = PM.GetMetadataDefinitionID(ProjectManagement.MetadataDefinitionTypes.CMSBlog)
            AddMetadataDefinitionToFolder(BlogID, MetadataDefinitionID)

            'This blog has inherited the Taxonomy of the Wiki (parent folder)
            'Remove Taxonomy inheritence, the Taxonomy itself, and the Taxonomy category requirement from this folder (blog)
            'This code may be removed at some point.  As of build 99 taxonomies are inherited.
            FolderData = FolderAPI.GetFolder(BlogID)
            FolderRequest.FolderId = BlogID
            FolderRequest.BreakInheritButton = True
            FolderRequest.DomainProduction = FolderData.DomainProduction
            FolderRequest.DomainStaging = FolderData.DomainStaging
            FolderRequest.FolderDescription = FolderData.Description
            FolderRequest.MetaInherited = 0
            FolderRequest.FolderName = FolderData.Name
            FolderRequest.IsDomainFolder = FolderData.IsDomainFolder
            FolderRequest.ParentId = FolderData.ParentId
            FolderRequest.PublishActive = FolderData.PublishHtmlActive
            FolderRequest.SiteMapPath = FolderData.SitemapPath
            FolderRequest.SiteMapPathInherit = False
            FolderRequest.StyleSheet = FolderData.StyleSheet
            FolderRequest.TemplateFileName = FolderData.TemplateFileName
            FolderRequest.XmlInherited = FolderData.XmlInherited
            FolderRequest.TaxonomyInherited = False
            FolderRequest.CategoryRequired = False
            FolderRequest.TaxonomyInheritedFrom = BlogID
            FolderRequest.TaxonomyIdList = ""
            FolderAPI.UpdateFolder(FolderRequest)

            'Add a default blog entry (Lorem Ipsum)
            AddDefaultBlogEntry(BlogID, Me.ProjectName & " Private Blog")
            '----------------------------------------------------------------------------------

            '- Project Discussion -
            '----------------------------------------------------------------------------------
            DiscussionID = AddDiscussion(ProjectFolderID)
            'Set folder template
            SetFolderTemplate(DiscussionID, "Discussion.aspx")
            '----------------------------------------------------------------------------------
        End Sub

        ''' <summary>
        ''' This method assigns a metadata deinition (by id) to a folder (by id).
        ''' </summary>
        ''' <param name="FolderID">The id of the folder you wish to assign the metadata definition.</param>
        ''' <param name="MetadataDefinitionID">The id of the metadata definition you wish to assign to the folder.</param>
        ''' <remarks></remarks>
        Public Sub AddMetadataDefinitionToFolder(ByVal FolderID As Integer, ByVal MetadataDefinitionID As Integer)
            Dim FolderAPI As New Ektron.Cms.API.Folder

            'Assign metadata definition to folder
            FolderAPI.EkContentRef.ProcessCustomFields(FolderID, "false", "Assigned_" & MetadataDefinitionID, FolderAPI.GetFolder(FolderID).ParentId)
        End Sub

        ''' <summary>
        ''' This method removes a project from the Project Management StarterAPP.
        ''' </summary>
        ''' <param name="ProjectFolderID">The id of the project (folderid) that you wish to remove.</param>
        ''' <remarks>This method removes a project and all project contents including wiki content (and the associated wiki taxonomy), discussion content, documents, and blogs.</remarks>
        Public Sub RemoveProject(ByVal ProjectFolderID As Integer)
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim FolderData As New Ektron.Cms.FolderData
            Dim ProjectName, ClientName As String
            Dim Taxonomy As New Ektron.Cms.API.Content.Taxonomy
            Dim TaxonomyBaseData() As Ektron.Cms.TaxonomyBaseData
            Dim TaxonomyBaseDatum As New Ektron.Cms.TaxonomyBaseData
            Dim TaxonomyRequest As New Ektron.Cms.TaxonomyRequest

            'Get the project's name
            FolderData = FolderAPI.GetFolder(ProjectFolderID, True)
            ProjectName = FolderData.Name
            TaxonomyBaseData = FolderData.FolderTaxonomy

            'Get the client's name
            FolderData = FolderAPI.GetFolder(FolderData.ParentId)
            ClientName = FolderData.Name

            'Delete the project's taxonomy
            For Each TaxonomyBaseDatum In TaxonomyBaseData
                If TaxonomyBaseDatum.TaxonomyName = "starterapps.pm." & Ektron.Cms.Common.EkFunctions.HtmlDecode(ClientName) & "." & Ektron.Cms.Common.EkFunctions.HtmlDecode(ProjectName) Then
                    TaxonomyRequest.TaxonomyId = TaxonomyBaseDatum.TaxonomyId
                    TaxonomyRequest.TaxonomyLanguage = FolderAPI.DefaultContentLanguage
                    Taxonomy.DeleteTaxonomy(TaxonomyRequest)
                    Exit For
                End If
            Next

            'Delete the project's folder
            Try
                FolderAPI.DeleteFolderById(ProjectFolderID)
            Catch ex As Exception
                Throw New Exception("Cannot Delete Project Folder: " & ex.Message)
            End Try
        End Sub

        ''' <summary>
        ''' This method sets the default .aspx template for a folder.
        ''' </summary>
        ''' <param name="FolderID">The id of the folder to which you wish to assign the template.</param>
        ''' <param name="TemplateName">The name of the template you wish to assign to the folder.</param>
        ''' <remarks>
        ''' In addition to assigning the template specified in the parameter, this method also sets the folder's associated stylesheet to "nothing.css".
        ''' This is done to ensure all css styles are applied via the css files (and styles) specified in the html head section...
        ''' That is, so unwanted styles don't sneak in uninvited.
        ''' </remarks>
        Public Sub SetFolderTemplate(ByVal FolderID As Integer, ByVal TemplateName As String)
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim FolderData As New Ektron.Cms.FolderData
            Dim FolderRequest As New Ektron.Cms.FolderRequest

            FolderData = FolderAPI.GetFolder(FolderID, True)
            FolderRequest.FolderId = FolderID
            FolderRequest.BreakInheritButton = True
            FolderRequest.DomainProduction = FolderData.DomainProduction
            FolderRequest.DomainStaging = FolderData.DomainStaging
            FolderRequest.FolderDescription = FolderData.Description
            FolderRequest.MetaInherited = 0
            FolderRequest.FolderName = FolderData.Name
            FolderRequest.IsDomainFolder = FolderData.IsDomainFolder
            FolderRequest.ParentId = FolderData.ParentId
            FolderRequest.PublishActive = FolderData.PublishHtmlActive
            FolderRequest.SiteMapPath = FolderData.SitemapPath
            FolderRequest.SiteMapPathInherit = False
            FolderRequest.StyleSheet = "nothing.css"
            FolderRequest.TemplateFileName = "StarterApps/ProjectManagement/" & TemplateName
            FolderRequest.XmlInherited = FolderData.XmlInherited
            FolderAPI.UpdateFolder(FolderRequest)
        End Sub

#End Region

#Region "Project Protected Methods"

        ''' <summary>
        ''' This method adds a CMS folder to the Project Management StarterApp.
        ''' </summary>
        ''' <param name="ParentFolderID">The id of the folder that will become the parent to the folder to be added.</param>
        ''' <param name="FolderName">The name of the folder to be added.</param>
        ''' <param name="FolderDescription">The description of the folder to be added.  (This can be an empty string.)</param>
        ''' <returns>Returns the id of the newly created CMS folder.</returns>
        ''' <remarks>
        ''' This is inteded to be used only when creating the "StarterApps," "ProjectManagement," and client folders, but
        ''' will work for any folder id (provided user has access to folder).
        ''' All other content folders in Project Management StarterApp are Community folders.
        ''' </remarks>
        Protected Function AddFolder(ByVal ParentFolderID As Integer, ByVal FolderName As String, ByVal FolderDescription As String) As Integer
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim FolderRequest As New FolderRequest

            'Create Folder
            FolderRequest.FolderName = FolderName
            FolderRequest.ParentId = ParentFolderID
            FolderRequest.FolderDescription = FolderDescription
            FolderRequest.SiteMapPathInherit = False
            FolderRequest.MetaInherited = 0
            FolderAPI.AddFolder(FolderRequest)

            Return FolderRequest.FolderId
        End Function

        ''' <summary>
        ''' This method adds a Community folder to the Project Management StarterApp.
        ''' </summary>
        ''' <param name="ParentFolderID">The id of the folder that will become the parent to the folder to be added.</param>
        ''' <param name="FolderName">The name of the folder to be added.</param>
        ''' <param name="FolderDescription">The description of the folder to be added.  (This can be an empty string.)</param>
        ''' <param name="MetadataDefinitionID">The id of a metadata definition to be assigned to the folder.</param>
        ''' <returns>Returns the id of the newly created CMS folder.</returns>
        ''' <remarks>
        ''' The metadata definition can be for general purpose but is intended to be used specifically with Wikis.
        ''' In the Project Management StarterApp, when a user navigates to the Wiki, we need to load a content block by default.
        ''' The first step in figuring out which content block is the default for the selected Wiki is to assign the
        ''' "starterapps.pm.DefaultContent" metadata definition to the Wiki folder.  Step two is to assign this metadata to a content block
        ''' in the Wiki.  Step three is to load the (hopefully) one content block that has been assigned the "starterapps.pm.DefaultContent" metadata value.
        ''' Besides that, this method simply creates a Community Folder.
        ''' </remarks>
        Protected Function AddPMCommunityFolder(ByVal ParentFolderID As Integer, ByVal FolderName As String, ByVal FolderDescription As String, ByVal MetadataDefinitionID As Integer) As Integer
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim FolderRequest As New FolderRequest

            'Create Folder
            FolderRequest.FolderName = FolderName
            FolderRequest.ParentId = ParentFolderID
            FolderRequest.FolderDescription = FolderDescription
            FolderRequest.SiteMapPathInherit = False
            If MetadataDefinitionID <> -1 Then
                FolderRequest.MetaInherited = 0
                FolderRequest.FolderCfldAssignments = "Assigned_" & MetadataDefinitionID
            Else
                FolderRequest.MetaInherited = 1
                FolderRequest.MetaInheritedFrom = ParentFolderID
            End If
            FolderRequest.FolderType = 6
            FolderAPI.AddFolder(FolderRequest)

            Return FolderRequest.FolderId
        End Function

        ''' <summary>
        ''' This method creates a blog for the Project Management StarterApp.
        ''' </summary>
        ''' <param name="ParentFolderID">The id of the folder that will become the parent to the blog to be added.</param>
        ''' <param name="BlogName">The name of the blog.</param>
        ''' <param name="BlogTitle">The title of the blog.</param>
        ''' <param name="BlogDescription">The description of the blog. (This can be empty string "")</param>
        ''' <returns>The id of the newly created blog.</returns>
        ''' <remarks>
        ''' Some details regarding how blogs are being created in this method...
        ''' (1) Blog Visibility is set to private.
        ''' (2) EnableComments is set to True
        ''' (3) ModerateComments is set to False
        ''' (4) CommentsRequireAuthentication is set to True
        ''' (5) No categories are added
        ''' (6) No blogroll information is added
        ''' </remarks>
        Protected Function AddBlog(ByVal ParentFolderID As Integer, ByVal BlogName As String, ByVal BlogTitle As String, ByVal BlogDescription As String) As Integer
            Dim Name, Title, Description As String
            Dim Categories(1) As String
            Dim Blogroll As New Ektron.Cms.BlogRoll 'This is empty.
            Dim EnableComments, ModerateComments, CommentsRequireAuthentication As Boolean
            Dim BlogID As Integer
            Dim NewBlog As New Ektron.Cms.API.Content.Blog


            Name = BlogName
            Title = BlogTitle
            Description = BlogDescription
            EnableComments = True
            ModerateComments = False
            CommentsRequireAuthentication = True
            Categories(0) = "Status"
            Categories(1) = "Questions"

            BlogID = NewBlog.AddBlog(ParentFolderID, Name, Title, Description, EkEnumeration.BlogVisibility.Private, EnableComments, ModerateComments, CommentsRequireAuthentication, Categories, Blogroll)

            Return BlogID
        End Function

        ''' <summary>
        ''' This method creates a default blog entry as a placeholder (Lorem Ipsum text)
        ''' </summary>
        ''' <param name="BlogID">The id of the blog to add the post to.</param>
        ''' <param name="BlogName">The name of the blog (this is used in the post's title)</param>
        ''' <remarks>This method exists to create placeholder text.</remarks>
        Protected Sub AddDefaultBlogEntry(ByVal BlogID As Integer, ByVal BlogName As String)
            Dim PostContent As New Ektron.Cms.ContentData
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim Categories(0) As String
            Dim NewBlog As New Ektron.Cms.API.Content.Blog

            'Add Default Blog Entry
            PostContent.ContType = Ektron.Cms.Common.EkConstants.CMSContentType_Content
            PostContent.DateCreated = Now()
            PostContent.Html = LoremIpsumLong()
            PostContent.Title = "Default " & BlogName & " Entry"
            PostContent.Teaser = LoremIpsumShort()
            PostContent.UserId = ContentAPI.UserId
            PostContent.LanguageId = ContentAPI.DefaultContentLanguage
            NewBlog.AddPost(BlogID, PostContent, Categories, False, "", "")
        End Sub

        ''' <summary>
        ''' This method adds a discussion to the Project Management StarterApp.
        ''' </summary>
        ''' <param name="ParentFolderID">The id of the folder that will become the parent to the blog to be added.</param>
        ''' <returns>The id of the newly created discussion.</returns>
        ''' <remarks>
        ''' Some details regarding how discussions are being created in this method...
        ''' (1) Name is always "Discussion"
        ''' (2) Title is always "~project name~ Discussion"
        ''' (3) Authentication is set to True
        ''' (4) A default category is added ("~project name~ General Discussion")
        ''' (5) ModeratePosts is set to False
        ''' (6) LockForum is set to False
        ''' (7) SortOrder is set to 1 (this sets the order of forums added.  Since there's only one forum, this param doesn't mean much, but it is required).
        ''' </remarks>
        Protected Function AddDiscussion(ByVal ParentFolderID As Integer) As Integer
            Dim Name, Title As String
            Dim Authentication As Boolean
            Dim Categories(0) As String
            Dim BoardID As Integer
            Dim BoardCategories() As Ektron.Cms.DiscussionCategory
            Dim BoardCategory As New Ektron.Cms.DiscussionCategory
            Dim i As Integer = 0

            Name = "Discussion"
            Title = Me.ProjectName & " Discussion"
            Authentication = True
            Categories(0) = Me.ProjectName & " General Discussion"

            Try
                Dim Discussion As New Ektron.Cms.API.Content.ThreadedDiscussion
                BoardID = Discussion.AddBoard(ParentFolderID, Name, Title, Authentication, "", Categories)
                BoardCategories = Discussion.GetBoardCategories(BoardID)

                If Not BoardCategories Is Nothing Then
                    For Each BoardCategory In BoardCategories
                        Discussion.AddForum(BoardID, Me.ProjectName & " Forum", Me.ProjectName & " General Discussion", False, False, 1, BoardCategory.CategoryID)
                    Next
                End If
            Catch ex As Exception
                BoardID = -1
            End Try

            Return BoardID
        End Function

#End Region

#Region "Project Private Methods"

        ''' <summary>
        ''' This method loads the default taxonomy ("DefaultProjectTaxonomy.xml") into a string.
        ''' </summary>
        ''' <returns>An Taxonomy XML String</returns>
        ''' <remarks>
        ''' This method is used during project creation.
        ''' The LoadTaxonomy() method takes an xml string as a param.
        ''' We grab the default taxonomy, load it as a System.Xml.XmlDocument object, and return InnerXML
        ''' </remarks>
        Private Function GetDefaultTaxonomy() As String
            Dim DefaultTaxonomy As New System.Xml.XmlDocument

            DefaultTaxonomy.Load(System.Web.HttpContext.Current.Server.MapPath("../xml/DefaultProjectTaxonomy.xml"))
            GetDefaultTaxonomy = DefaultTaxonomy.InnerXml

            Return GetDefaultTaxonomy
        End Function

        ''' <summary>
        ''' This method ensures a project name is unique.
        ''' </summary>
        ''' <param name="ParentFolderID">Folder id of the parent folder (the "client" folder)</param>
        ''' <param name="NewFolderName">The desired name of the child folder (the "project" folder)</param>
        ''' <returns>A unique name</returns>
        ''' <remarks>
        ''' This method checks to see if there is a sibling folder that has already been given the name of passed in the parameter "NewFodlerName".
        ''' If a folder already exists with this name, the function will append to the name a *count* like Windows does.
        ''' Example: NewFolderName = "Ektron."  An folder named "Ektron" already exists.  This method returns "Ektron (1)"
        ''' </remarks>
        Private Function MakeFolderNameUnique(ByVal ParentFolderID As Integer, ByVal NewFolderName As String) As String
            Dim UniqueName As String = NewFolderName
            Dim IsUnique As Boolean = True
            Dim i As Integer = 1
            Dim currentComponentName As String
            Dim FolderAPI As New Ektron.Cms.API.Folder

            Dim SiblingFolderData() As FolderData
            Dim SiblingFolder As FolderData

            SiblingFolderData = FolderAPI.GetChildFolders(ParentFolderID)
            If Not SiblingFolderData Is Nothing Then
                For Each SiblingFolder In SiblingFolderData
                    If SiblingFolder.Name = NewFolderName Then
                        IsUnique = False
                    End If
                Next
            End If

            If IsUnique = False Then
                For Each SiblingFolder In SiblingFolderData
                    currentComponentName = NewFolderName & " (" & i & ")"
                    If currentComponentName = SiblingFolder.Name Then
                        i = i + 1
                    End If
                Next
                UniqueName = NewFolderName & " (" & i & ")"
            End If

            Return UniqueName
        End Function

        ''' <summary>
        ''' This method generates placeholder text.
        ''' </summary>
        ''' <returns>3 html paragraphs of lorem ipsum text.</returns>
        ''' <remarks>This is here to save the hassle of cutting and pasting placeholder text.</remarks>
        Private Function LoremIpsumLong() As String
            LoremIpsumLong = "<p>" & "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec pharetra, nisl tristique semper rutrum, risus magna congue metus, faucibus venenatis orci metus vel lectus. Duis at ante. Donec bibendum. In lectus orci, rhoncus hendrerit, cursus dictum, auctor pharetra, tortor. Maecenas metus mi, mollis non, iaculis eget, ornare in, risus. Cras ut odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum eu lorem. Suspendisse quis mauris. Quisque nisl. Maecenas felis. Fusce dui odio, tristique sit amet, tincidunt et, volutpat a, diam. Phasellus non libero. Phasellus et leo a libero cursus congue. Pellentesque feugiat est nec nulla." & "</p>"
            LoremIpsumLong = LoremIpsumLong & "<p>" & "Proin et enim interdum nisl elementum porttitor. Etiam quam turpis, hendrerit quis, dictum id, ultricies quis, tortor. Vestibulum ante metus, aliquet quis, posuere at, pharetra at, lorem. Etiam nec felis. Integer fringilla bibendum arcu. Pellentesque iaculis libero vitae libero. Aenean euismod mollis lorem. Etiam sit amet arcu. Nunc nisi dolor, luctus vel, rhoncus commodo, tempor ut, turpis. Praesent auctor vehicula erat. Sed porttitor accumsan massa. Phasellus sed lectus." & "</p>"
            LoremIpsumLong = LoremIpsumLong & "<p>" & "Nunc porta ornare pede. Donec tincidunt elementum mauris. Aliquam interdum elit id neque. Donec quis eros ac tellus nonummy laoreet. Nam ultrices, risus sit amet molestie dignissim, dolor turpis tempus est, in semper dui risus vel nulla. Morbi iaculis metus at ipsum. Praesent lectus pede, malesuada eget, bibendum quis, bibendum luctus, orci. Pellentesque rhoncus lacus a mi. Nam vulputate lorem eget neque. Aliquam aliquet purus in erat. Vivamus dignissim fringilla enim. Curabitur id magna. Maecenas aliquet posuere ante. Proin arcu tortor, cursus in, facilisis quis, sagittis sit amet, est. Nunc et erat at ipsum semper ultricies. Sed mi. Vestibulum sed nisi. Donec massa nisl, posuere sed, pharetra et, egestas vitae, magna." & "</p>"
            Return LoremIpsumLong
        End Function

        ''' <summary>
        ''' This method generates placeholder text.
        ''' </summary>
        ''' <returns>1 html paragraphs of lorem ipsum text.</returns>
        ''' <remarks>This is here to save the hassle of cutting and pasting placeholder text.</remarks>
        Private Function LoremIpsumShort() As String
            LoremIpsumShort = "<p>" & "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec pharetra, nisl tristique semper rutrum, risus magna congue metus, faucibus venenatis orci metus vel lectus. Duis at ante. Donec bibendum. In lectus orci, rhoncus hendrerit, cursus dictum, auctor pharetra, tortor. Maecenas metus mi, mollis non, iaculis eget, ornare in, risus. Cras ut odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum eu lorem. Suspendisse quis mauris. Quisque nisl. Maecenas felis. Fusce dui odio, tristique sit amet, tincidunt et, volutpat a, diam. Phasellus non libero. Phasellus et leo a libero cursus congue. Pellentesque feugiat est nec nulla." & "</p>"
            Return LoremIpsumShort
        End Function

        ''' <summary>
        ''' This method is for use with the Milestones folder in the Project Managmenet Starter App.
        ''' </summary>
        ''' <param name="FolderID">This should be the id of the "Milestones" folder.</param>
        ''' <remarks>The "Milestones" folder is read-only for Membership users, because to add content, you must use a smartform.  Membership users cannot add content via SmartForms.  Thus, this fodler is read-only for Membership users.</remarks>
        Private Sub MakeFolderReadOnly(ByVal FolderID As Integer)
            Dim User As New Ektron.Cms.API.User.User
            Dim UserGroup As New Ektron.Cms.UserGroupData
            Dim Users As New Ektron.Cms.StarterApps.ProjectManagement.Users
            Dim MembershipGroupID As Integer
            Dim UserPermissionData As New Ektron.Cms.UserPermissionData
            Dim Permissions As New Ektron.Cms.API.Permissions

            'Get the Membership usergroup's id
            UserGroup = User.GetUserGroupByName("starterapps.pm." & Me.ClientName)
            MembershipGroupID = UserGroup.GroupId
            
            'Set Read-Only permissions
            UserPermissionData.FolderId = FolderID
            UserPermissionData.UserId = -1
            UserPermissionData.GroupId = MembershipGroupID
            UserPermissionData.IsReadOnly = True
            UserPermissionData.CanAdd = False
            UserPermissionData.CanEdit = False
            UserPermissionData.IsReadOnlyLib = True
            UserPermissionData.CanAddToImageLib = False
            UserPermissionData.CanAddToFileLib = False
            'Update the folder
            Try
                Permissions.UpdateItemPermission(UserPermissionData)
            Catch ex As Exception

            End Try

        End Sub

#End Region

    End Class

    Public Class Clients

#Region "Clients Public Methods"

        ''' <summary>
        ''' This method adds a new client to the Project Management StarterApp.
        ''' </summary>
        ''' <param name="ClientName">The name of the client to add.</param>
        ''' <returns>The id of the newly created Client folder.</returns>
        ''' <remarks>
        ''' This method does several things besides creating a CMS folder for a client.
        ''' (1) If the client name already exists it doesn't do anything.
        ''' (2) It breaks both content and metadata inheritence on the folder - this is so we can set the exact permissions and metadata models we wish
        ''' (3) It sets the folder to PRIVATE
        ''' (4) It creates a new Membership usergroup ("starterapps.pm.~client name~")
        ''' (5) It adds the "starterapps.pm" CMS user group to the folder
        ''' </remarks>
        Public Function AddClient(ByVal ClientName As String) As Integer
            Dim PM As New Ektron.Cms.StarterApps.ProjectManagement.ProjectManagement
            Dim PMFolderID As Integer
            Dim ClientList As New NameValueCollection
            Dim ClientExists As Boolean = False
            Dim ClientFolderID As Integer
            Dim ClientFolder As New FolderRequest
            Dim Projects As New Projects
            Dim Users As New Ektron.Cms.StarterApps.ProjectManagement.Users
            Dim MembershipUserGroupID As Integer
            Dim FolderAPI As New Ektron.Cms.API.Folder

            'Unescape Client Name
            ClientName = System.Web.HttpUtility.HtmlDecode(ClientName)

            'Get the Project Management fodler id
            PMFolderID = PM.Initialize()

            'Get all client folders inside the Project Management Folder
            ClientList = GetAllClients()

            'Loop to see if the client folder already exists
            If Not ClientList.Count = 0 Then
                Dim i As Integer
                For i = 0 To ClientList.Count - 1
                    If ClientList.GetKey(i) = ClientName Then
                        ClientExists = True
                        ClientFolderID = ClientList.GetValues(i)(0)
                        Exit For
                    End If
                Next
            End If

            'If client does not exist, create the client folder
            If ClientExists = False Then

                'Create Client Folder
                ClientFolder.FolderName = ClientName
                ClientFolder.ParentId = PMFolderID
                ClientFolder.FolderDescription = ClientName & " Project Management Folder"
                ClientFolder.SiteMapPathInherit = False
                ClientFolder.MetaInherited = 0
                FolderAPI.AddCommunityFolder(ClientFolder)

                'Get the client ID
                ClientFolderID = ClientFolder.FolderId
                'Break inheritence
                PM.SetFolderPermissions(ClientFolderID)
                'Make the Folder Private
                PM.SetFolderPrivate(ClientFolderID)
                'Add MembershipUserGroup
                MembershipUserGroupID = Users.AddMembershipUserGroup("starterapps.pm." & ClientName)
                'Add MembershipUserGroup To Client Folder
                If MembershipUserGroupID <> -1 Then
                    Users.AddMembershipUserGroupToFolder(ClientFolderID, MembershipUserGroupID)
                End If

            End If

            'Return the ID of the client folder
            Return ClientFolderID
        End Function

        ''' <summary>
        ''' This method removes a client from the Project Management StarterApp.
        ''' </summary>
        ''' <param name="ClientFolderID">The id of the client (folder id) to be removed.</param>
        ''' <remarks>
        ''' (1) This method calls Projects.RemoveProject() to individually remove each to which this client is a parent.project this client.
        ''' (2) This method removes the client Membership group "starterapps.pm.~client name~"
        ''' (3) This method removes the client folder.
        ''' </remarks>
        Public Sub RemoveClient(ByVal ClientFolderID As Integer)
            Dim UserGroup As New Ektron.Cms.StarterApps.ProjectManagement.Users
            Dim Projects As New Ektron.Cms.StarterApps.ProjectManagement.Projects
            Dim ProjectFolders() As Ektron.Cms.FolderData
            Dim ProjectFolderID As Integer
            Dim FolderAPI As New Ektron.Cms.API.Folder

            'Delete all of the client's projects
            ProjectFolders = FolderAPI.GetChildFolders(ClientFolderID)
            If ProjectFolders IsNot Nothing Then
                For Each ProjectFolder As FolderData In ProjectFolders
                    ProjectFolderID = ProjectFolder.Id
                    Try
                        Projects.RemoveProject(ProjectFolderID)
                    Catch ex As Exception

                    End Try

                Next
            End If

            'Delete client Membership usergroup
            Try
                UserGroup.RemoveUserGroup("starterapps.pm." & FolderAPI.GetFolder(ClientFolderID).Name)
            Catch ex As Exception

            End Try


            'Delete client folder
            Try
                FolderAPI.DeleteFolderById(ClientFolderID)
            Catch ex As Exception

            End Try

        End Sub

        ''' <summary>
        ''' This method gathers the Information Architecture for a particular client.
        ''' </summary>
        ''' <param name="ClientID">The id of the client (folder id) for which the IA is to be generated.</param>
        ''' <returns>An XML document containing the Information Architecture for a particular client.</returns>
        ''' <remarks>
        ''' This method is a more efficient version of Project.GetInformationArchitectureXML(), which returns the entire IA tree for a particular user.
        ''' This method restrics the tree to a parituclar branch (one client), so it's a but more efficient.
        ''' Also, Project.GetInformationArchitect() also has a boolean switch to include all the members of the client's Membership usergroup.
        ''' This method does not have such a switch.
        ''' </remarks>
        Public Function GetClientXMLForInformationArchitecture(ByVal ClientID As Integer) As System.Xml.XmlDocument

            Dim PM As New Ektron.Cms.StarterApps.ProjectManagement.ProjectManagement
            Dim DocumentNode, ClientNode As System.Xml.XmlNode
            Dim XMLUtils As New Ektron.Cms.StarterApps.ProjectManagement.XMLUtilities
            Dim FolderAPI As New Ektron.Cms.API.Folder
            Dim ClientFolderData As New Ektron.Cms.FolderData
            Dim FolderData As New Ektron.Cms.FolderData

            GetClientXMLForInformationArchitecture = New System.Xml.XmlDocument

            FolderData = FolderAPI.GetFolder(ClientID)

            'Initalize the IA XML document
            DocumentNode = GetClientXMLForInformationArchitecture.CreateElement("ektron")
            GetClientXMLForInformationArchitecture.AppendChild(DocumentNode)

            ClientNode = GetClientXMLForInformationArchitecture.CreateElement("li")
            XMLUtils.ApplyXMLAttribute(GetClientXMLForInformationArchitecture, ClientNode, "id", ClientID)
            XMLUtils.ApplyXMLAttribute(GetClientXMLForInformationArchitecture, ClientNode, "label", FolderData.Name)
            XMLUtils.ApplyXMLAttribute(GetClientXMLForInformationArchitecture, ClientNode, "class", "Client")
            GetClientXMLForInformationArchitecture.DocumentElement.AppendChild(ClientNode)

            Return GetClientXMLForInformationArchitecture
        End Function

        ''' <summary>
        ''' This method gathers all the client names and client folder id's that the current user has permissions to view.
        ''' </summary>
        ''' <returns>NameValueCollection - client name, client fodler id</returns>
        ''' <remarks>This method uses GetChildFolders and therefore respects permissions.</remarks>
        Public Function GetAllClients() As NameValueCollection
            Dim PM As New Ektron.Cms.StarterApps.ProjectManagement.ProjectManagement
            Dim PMFolderID As Integer
            Dim PMFolderData() As FolderData
            Dim PMFolderItem As New FolderData
            Dim Clients As New NameValueCollection
            Dim FolderAPI As New Ektron.Cms.API.Folder

            PMFolderID = PM.Initialize()

            'Create nameValueCollection of folder names and folder ids
            PMFolderData = FolderAPI.GetChildFolders(PMFolderID, False)
            If Not PMFolderData Is Nothing Then
                For Each PMFolderItem In PMFolderData
                    Clients.Add(PMFolderItem.Name, PMFolderItem.Id)
                Next
            End If

            Return Clients
        End Function

#End Region

    End Class

    Public Class Users

#Region "Users Properties"

        Private MemberIDValue As Integer
        Private ClientIDValue As Integer

        Public Property MemberID() As Integer
            Get
                Return MemberIDValue
            End Get
            Set(ByVal Value As Integer)
                MemberIDValue = Value
            End Set
        End Property

        Public Property ClientID() As Integer
            Get
                Return ClientIDValue
            End Get
            Set(ByVal Value As Integer)
                ClientIDValue = Value
            End Set
        End Property

#End Region

#Region "Users Public Methods"

        ''' <summary>
        ''' This method adds a CMS usergroup to the Project Management StarterApp.
        ''' </summary>
        ''' <param name="CMSGroupName">The name of the CMS group to add.</param>
        ''' <returns>The id of the newly created CMS usergroup.</returns>
        ''' <remarks>
        ''' This method is meant to be executed only when the StarterApp intializes itself.
        ''' There is only 1 CMS usergroup in the StarterApp by design.  All members of the 
        ''' CMS usergroup have permissions to do everything to all folders within the StarterApp.
        ''' </remarks>
        Public Function AddCMSUserGroup(ByVal CMSGroupName As String) As Integer
            Dim User As New Ektron.Cms.API.User.User
            Dim UserGroups() As UserGroupData
            Dim UserGroup As New UserGroupData
            Dim UserGroupExists As Boolean = False
            Dim CMSGroupID As Integer

            'See if the CMS usergroup name already exists
            UserGroups = User.GetAllUserGroups(EkEnumeration.UserTypes.AuthorType)
            For Each UserGroup In UserGroups
                If UserGroup.GroupName = CMSGroupName Then
                    CMSGroupID = UserGroup.GroupId
                    UserGroupExists = True
                    Exit For
                End If
            Next

            'If the CMS usergroup doesn't exist, create it
            If UserGroupExists = False Then
                User.AddUserGroup(CMSGroupName)
                UserGroup = User.GetUserGroupByName(CMSGroupName)
                CMSGroupID = UserGroup.GroupId
            End If

            'return the CMS usergroup id
            Return CMSGroupID
        End Function

        ''' <summary>
        ''' This method adds a Membership usergroup to the Project Management StarterApp.
        ''' </summary>
        ''' <param name="MemershipGroupName">The name of the Membership usergroup to add.</param>
        ''' <returns>The id of the newly created Membership usergroup.</returns>
        ''' <remarks>
        ''' This method is executed once per client.  That is, each client gets its own Membership usergroup.
        ''' The client's Membership usergroup is deleted when the client is removed with the RemoveClient() method.
        ''' </remarks>
        Public Function AddMembershipUserGroup(ByVal MemershipGroupName As String) As Integer
            Dim MembershipUserGroupCollection As New Collection
            Dim User As New Ektron.Cms.API.User.User
            Dim UserGroups() As UserGroupData
            Dim UserGroup As New UserGroupData
            Dim UserGroupExists As Boolean = False
            Dim MembershipGroupID As Integer
            Dim ContentAPI As New Ektron.Cms.ContentAPI
            Dim ErrorMessage As String = ""

            'See if the CMS usergroup name already exists
            UserGroups = User.GetAllUserGroups(EkEnumeration.UserTypes.AuthorType)
            For Each UserGroup In UserGroups
                If UserGroup.GroupName = MemershipGroupName Then
                    MembershipGroupID = UserGroup.GroupId
                    UserGroupExists = True
                    Exit For
                End If
            Next

            'If usergroup doesn't exist, create it
            If UserGroupExists = False Then
                MembershipUserGroupCollection.Add(MemershipGroupName, "UserGroupName")
                MembershipUserGroupCollection.Add("StarterApp membership usergroup", "Description")
                Try
                    User.EkUserRef.AddMemberShipGroupV4(MembershipUserGroupCollection, "", "")
                    UserGroup = User.GetUserGroupByName(MemershipGroupName)
                    MembershipGroupID = UserGroup.GroupId
                Catch ex As Exception
                    MembershipGroupID = -1
                    ErrorMessage = ErrorMessage & "Membership Group Could Not Be Created.  "
                    ErrorMessage = ErrorMessage & "You may manually work around this error by creating a Membership usergroup in the Workarea.  "
                    ErrorMessage = ErrorMessage & "The Membership usergroup name must be '" & MemershipGroupName & "'."
                    Throw New Exception(ErrorMessage & ex.Message)
                End Try

            End If

            'return the usergroup id
            Return MembershipGroupID
        End Function

        ''' <summary>
        ''' This method adds a usergroup to a folder and sets Permissions for the group on the folder.
        ''' </summary>
        ''' <param name="FolderID">The folder to which you wish to assign the usergroup.</param>
        ''' <param name="GroupID">The groupid of the usergroup you wish to assign to the folder.</param>
        ''' <param name="TraverseOnly">
        ''' True means that the group will be given Traverse permissions only.
        ''' False means the group is given all permissions.
        ''' </param>
        ''' <remarks>
        ''' This method can be used as a general-purpose method (it will work against any folder not just the ones in the StarterApp).
        ''' Traverse-only is meaningful only to CMS usergroups.  
        ''' Membership usergroups always have traverse permissions set to True (this is hardcoded in the CMS).
        ''' </remarks>
        Public Sub AddUserGroupToFolder(ByVal FolderID As Integer, ByVal GroupID As Integer, ByVal TraverseOnly As Boolean)
            Dim UserPermissionData As New Ektron.Cms.UserPermissionData
            Dim Permissions As New Ektron.Cms.API.Permissions

            'Add permissions for GroupID to FolderID
            UserPermissionData.GroupId = GroupID
            UserPermissionData.FolderId = FolderID

            If TraverseOnly = False Then
                'Grant everything
                UserPermissionData.CanAddToFileLib = True
                UserPermissionData.CanOverwriteLib = True
                UserPermissionData.CanAddToHyperlinkLib = True
                UserPermissionData.CanAddToImageLib = True
                UserPermissionData.CanAddToQuicklinkLib = True
                UserPermissionData.CanApprove = True
                UserPermissionData.CanBreakPending = True
                UserPermissionData.CanCreateTask = True
                UserPermissionData.CanDecline = True
                UserPermissionData.CanAdd = True
                UserPermissionData.CanDelete = True
                UserPermissionData.CanEdit = True
                UserPermissionData.CanHistory = True
                UserPermissionData.CanPreview = True
                UserPermissionData.CanPublish = True
                UserPermissionData.CanRestore = True
                UserPermissionData.CanView = True
                UserPermissionData.CanDeleteFolders = True
                UserPermissionData.CanAddFolders = True
                UserPermissionData.CanEditFolders = True
                UserPermissionData.CanEditCollections = True
                UserPermissionData.CanTraverseFolders = True
            Else
                'Grant only Traverse and Read-Only
                UserPermissionData.IsReadOnly = False
                UserPermissionData.IsReadOnlyLib = False
                UserPermissionData.CanAddToFileLib = False
                UserPermissionData.CanOverwriteLib = False
                UserPermissionData.CanAddToHyperlinkLib = False
                UserPermissionData.CanAddToImageLib = False
                UserPermissionData.CanAddToQuicklinkLib = False
                UserPermissionData.CanApprove = False
                UserPermissionData.CanBreakPending = False
                UserPermissionData.CanCreateTask = False
                UserPermissionData.CanDecline = False
                UserPermissionData.CanAdd = False
                UserPermissionData.CanDelete = False
                UserPermissionData.CanEdit = False
                UserPermissionData.CanHistory = False
                UserPermissionData.CanPreview = False
                UserPermissionData.CanPublish = False
                UserPermissionData.CanRestore = False
                UserPermissionData.CanView = False
                UserPermissionData.CanDeleteFolders = False
                UserPermissionData.CanAddFolders = False
                UserPermissionData.CanEditFolders = False
                UserPermissionData.CanEditCollections = False
                UserPermissionData.CanTraverseFolders = True
            End If


            Try
                Permissions.AddItemPermission(UserPermissionData)
            Catch ex As Exception

            End Try

        End Sub

        ''' <summary>
        ''' This method adds a Membership usergroup to a folder and sets the permissions apprpriate to the Project Management Starer App for the group on the folder.
        ''' </summary>
        ''' <param name="FolderID">The folder to which you wish to assign the usergroup.</param>
        ''' <param name="GroupID">The groupid of the Membership usergroup you wish to assign to the folder.</param>
        ''' <remarks>
        ''' This method includes the permission settings appropriate to Membership users in the Project Management Starter App.
        ''' </remarks>
        Public Sub AddMembershipUserGroupToFolder(ByVal FolderID As Integer, ByVal GroupID As Integer)
            Dim UserPermissionData As New Ektron.Cms.UserPermissionData
            Dim Permissions As New Ektron.Cms.API.Permissions

            'Add permissions for GroupID to FolderID
            UserPermissionData.GroupId = GroupID
            UserPermissionData.FolderId = FolderID
            'File/folder permissions
            UserPermissionData.CanAdd = True
            UserPermissionData.CanEdit = True
            UserPermissionData.CanDelete = False
            'Library permissions
            UserPermissionData.CanAddToFileLib = True
            UserPermissionData.CanAddToImageLib = True
            UserPermissionData.CanAddToHyperlinkLib = False
            UserPermissionData.CanOverwriteLib = False
            'Membership users can traverse folders by default (hardcoded to True).
            'We are "adding" here to show explicitly that this permission setting is requiroed.
            UserPermissionData.CanTraverseFolders = True
            Try
                Permissions.AddItemPermission(UserPermissionData)
            Catch ex As Exception

            End Try

        End Sub

        ''' <summary>
        ''' This method adds a user (by user id) to a usergroup (by group name)
        ''' </summary>
        ''' <param name="UserID">The id of the user to add to the group.</param>
        ''' <param name="GroupName">The name of the group to add the user to.</param>
        ''' <remarks>
        ''' This method is more or less the same thing as AddMembertoClient() only this method takes a usergroup name
        ''' wheras AddMemberToClient() takes a usergroup id.
        ''' </remarks>
        Public Sub AddUserToGroup(ByVal UserID As Integer, ByVal GroupName As String)
            Dim UserGroup As New Ektron.Cms.API.User.User
            Dim GroupInfo As New UserGroupData
            Dim Users As New Ektron.Cms.API.User.User

            GroupInfo = UserGroup.GetUserGroupByName(GroupName)
            If GroupInfo IsNot Nothing Then
                Try
                    Users.AddUserToGroup(UserID, GroupInfo.GroupId)
                Catch ex As Exception

                End Try
            End If
        End Sub

        ''' <summary>
        ''' This method adds a user (by user id) to a usergroup (by usergroup id)
        ''' </summary>
        ''' <remarks>
        ''' This method requires population of two Users properties...
        ''' (1) MemberID
        ''' (2) ClientID
        ''' This method is more or less the same thing as AddUserToGroup() only this method takes a usergroup id
        ''' wheras AddUserToGroup() takes a usergroup name.
        ''' </remarks>
        Public Sub AddMemberToClient()
            Dim Member As New Ektron.Cms.API.User.User
            Dim GroupInfo As New UserGroupData
            Dim Members As New Ektron.Cms.API.User.User
            Dim FolderAPI As New Ektron.Cms.API.Folder

            GroupInfo = Member.GetUserGroupByName("starterapps.pm." & FolderAPI.GetFolder(Me.ClientID).Name)
            Try
                Members.AddUserToGroup(Me.MemberID, GroupInfo.GroupId)
            Catch ex As Exception
                'Do Nothing
            End Try
        End Sub

        ''' <summary>
        ''' This method removes a Membership user from a client usergroup.
        ''' </summary>
        ''' <remarks>
        ''' This method requires population of two Users properties...
        ''' (1) MemberID
        ''' (2) ClientID
        ''' </remarks>
        Public Sub RemoveMemberFromClient()
            Dim Member As New Ektron.Cms.API.User.User
            Dim GroupInfo As New UserGroupData
            Dim FolderAPI As New Ektron.Cms.API.Folder

            GroupInfo = Member.GetUserGroupByName("starterapps.pm." & FolderAPI.GetFolder(Me.ClientID).Name)
            Try
                Member.DeleteUserFromGroup(Me.MemberID, GroupInfo.GroupId, False)
            Catch ex As Exception
                'Do Nothing
            End Try
        End Sub

        ''' <summary>
        ''' This method removes a usergroup (by usergroup name)
        ''' </summary>
        ''' <param name="GroupName">The name of the usergroup to remove.</param>
        ''' <remarks>This method is called by RemoveClient() method.  When a client is removed, so is its Membership usergroup.</remarks>
        Public Sub RemoveUserGroup(ByVal GroupName As String)
            Dim UserGroup As New API.User.User
            Dim UserGroupData As New UserGroupData
            Try
                UserGroupData = UserGroup.GetUserGroupByName(GroupName)
                UserGroup.DeleteUserGroup(UserGroupData.GroupId)
            Catch ex As Exception

            End Try
        End Sub

#End Region

    End Class

    Public Class XMLUtilities

#Region "XMLUtilities Properties"

        Private XMLDocumentValue As XmlDocument
        Private XMLSourceTypeValue, XSLTSourceTypeValue, XMLSourceValue, XSLTSourceValue As String
        Private myXSLTParams As New NameValueCollection

        Public Enum XMLSourceTypes
            XMLString
            URI
            File
            XMLDocument
        End Enum

        Public Enum XSLTSourceTypes
            XSLTString
            URI
            File
        End Enum

        Public Property XMLSourceType() As XMLSourceTypes
            Get
                Return XMLSourceTypeValue
            End Get
            Set(ByVal value As XMLSourceTypes)
                XMLSourceTypeValue = value
            End Set
        End Property

        Public Property XMLSource() As String
            Get
                Return XMLSourceValue
            End Get
            Set(ByVal value As String)
                XMLSourceValue = value
            End Set
        End Property

        Public Property XMLDocument() As XmlDocument
            Get
                Return XMLDocumentValue
            End Get
            Set(ByVal value As XmlDocument)
                XMLDocumentValue = value
            End Set
        End Property

        Public Property XSLTSourceType() As XSLTSourceTypes
            Get
                Return XSLTSourceTypeValue
            End Get
            Set(ByVal value As XSLTSourceTypes)
                XSLTSourceTypeValue = value
            End Set
        End Property

        Public Property XSLTSource() As String
            Get
                Return XSLTSourceValue
            End Get
            Set(ByVal value As String)
                XSLTSourceValue = value
            End Set
        End Property

        Public Property XSLTParams() As NameValueCollection
            Get
                Return myXSLTParams
            End Get
            Set(ByVal value As NameValueCollection)
                myXSLTParams = value
            End Set
        End Property

#End Region

#Region "XMLUtilities Public Methods"

        ''' <summary>
        ''' This method is a general purpose XML transformation method.  This method allows arguments to be passed to the XSLT transformation.
        ''' </summary>
        ''' <returns>XML transformed by an XSLT stylesheet.</returns>
        ''' <remarks>
        ''' This method takes XML source from
        ''' (1) A string of xml text
        ''' (2) A URI (http://something)
        ''' (3) A file on the file system
        ''' (4) An object of type system.xml.xmldocument
        ''' 
        ''' To take advantage of the first three XML source type options, you must
        ''' (a) Set the XMLSourceType property to XMLString, URI, or File, and
        ''' (b) Set the XMLSource property to the string containing the corresponding value
        ''' 
        ''' To take advantage of the fourth XML source type, you must
        ''' (a) Set the XMLSourceType property to XMLDocument, and
        ''' (b) Set the XMLDocument property to the XML document you wish to transform.
        ''' 
        ''' This method takes XSLT source from
        ''' (1) A string of xml text
        ''' (2) A URI (http://something)
        ''' (3) A file on the file system
        ''' 
        ''' To set the XSLT source type options, you must
        ''' (a) Set the XSLTSourceType property to XMLString, URI, or File, and
        ''' (b) Set the XMLSource property to the string containing the corresponding value
        ''' 
        ''' This method takes an arbitrary number of paramaters to pass into the XSLT transformation.
        ''' In order to pass params into the XSLT transform, you must
        ''' (a) Populate a NameValueCollection (param name, param, value)
        ''' (b) Set the XSLTParams property to your populated NameValueCollection
        ''' </remarks>
        Public Function TransformXML() As String
            Dim myXML As New System.Xml.XmlDocument
            Select Case Me.XMLSourceTypeValue
                Case XMLSourceTypes.File
                    Try
                        myXML.Load(System.Web.HttpContext.Current.Server.MapPath(XMLSourceValue))
                    Catch ex As Exception
                        Return "Cannot Load XML File: " & Me.XMLSource
                    End Try
                Case XMLSourceTypes.URI
                    Try
                        myXML.Load(XMLSourceValue)
                    Catch ex As Exception
                        Return "Cannot Load XML File: " & Me.XMLSource
                    End Try
                Case XMLSourceTypes.XMLString
                    Try
                        myXML.LoadXml(XMLSourceValue)
                    Catch ex As Exception
                        Return "Cannot Load XML String: " & ex.Message
                    End Try
                Case XMLSourceTypes.XMLDocument
                    Try
                        myXML = Me.XMLDocument
                    Catch ex As Exception
                        Return "Cannot Load XML Document: " & ex.Message
                    End Try
                Case Else
                    Try
                        Throw New Exception("XML Type Property (File, URI, XMLString, XMLDocument) Not Set")
                    Catch ex As Exception
                        Return "Cannot Load XML: " & ex.Message
                    End Try
            End Select

            Dim myXSLT As New System.Xml.Xsl.XslCompiledTransform
            Select Case Me.XSLTSourceTypeValue
                Case XSLTSourceTypes.File
                    Try
                        myXSLT.Load(System.Web.HttpContext.Current.Server.MapPath(XSLTSourceValue))
                    Catch ex As Exception
                        Return "Cannot Load XSLT File: " & Me.XSLTSource
                    End Try
                Case XSLTSourceTypes.URI
                    Try
                        myXSLT.Load(XSLTSourceValue)
                    Catch ex As Exception
                        Return "Cannot Load XSLT File: " & Me.XSLTSource
                    End Try
                Case XSLTSourceTypes.XSLTString
                    Try
                        Dim myXSLTString As New XmlDocument()
                        myXSLTString.LoadXml(XSLTSourceValue)
                        myXSLT.Load(myXSLTString)
                    Catch ex As Exception
                        Return "Cannot Load XSLT String: " & ex.Message
                    End Try
                Case Else
                    Try
                        Throw New Exception("XSLT Type Property (File, URI, XSLTString) Not Set")
                    Catch ex As Exception
                        Return "Cannot Load XSLT: " & ex.Message
                    End Try
            End Select

            Dim myOutputStream As New System.IO.MemoryStream()
            Dim myXSLTArgs As New System.Xml.Xsl.XsltArgumentList

            If Not myXSLTParams Is Nothing Then
                Dim i As Integer
                For i = 0 To Me.XSLTParams.Count - 1
                    myXSLTArgs.AddParam(Me.XSLTParams.GetKey(i), "", Me.XSLTParams.GetValues(i)(0))
                Next
                Try
                    myXSLT.Transform(myXML, myXSLTArgs, myOutputStream)
                Catch ex As Exception
                    Return ex.Message
                End Try
            Else
                Try
                    myXSLT.Transform(myXML, Nothing, myOutputStream)
                Catch ex As Exception
                    Return ex.Message
                End Try
            End If

            myOutputStream.Flush()
            myOutputStream.Position = 0

            Dim myXMLStreamReader As New System.IO.StreamReader(myOutputStream)
            Dim myTransformedXML

            myTransformedXML = myXMLStreamReader.ReadToEnd()
            myXMLStreamReader.Close()

            Return myTransformedXML

        End Function

        ''' <summary>
        ''' This method applies XML attributes to an XML Node.
        ''' </summary>
        ''' <param name="IADoc">The XML document being parsed.</param>
        ''' <param name="Node">The node you wish to add the attribute to.</param>
        ''' <param name="AttributeName">The attribute's name</param>
        ''' <param name="AttributeValue">The attribute's value.</param>
        ''' <remarks>This is a general purpose method meant to simplify adding attributes to nodes.  It's meant to help keep code tidy.</remarks>
        Public Sub ApplyXMLAttribute(ByRef IADoc As XmlDocument, ByRef Node As XmlNode, ByVal AttributeName As String, ByVal AttributeValue As String)
            Dim Attribute As XmlAttribute
            Attribute = IADoc.CreateAttribute(AttributeName)
            Attribute.InnerText = AttributeValue
            Node.Attributes.Append(Attribute)
        End Sub

        Public Function PrettyPrintXML(ByRef XMLDocument As System.Xml.XmlDocument) As String
            'Create stream to load formatted XML document into
            Dim OutputStream As System.IO.Stream = New System.IO.MemoryStream
           
            'Create XMLTextWriter with formatting specifics, and direct output into OutputStream
            Dim MyXmlTextWriter As New System.Xml.XmlTextWriter(OutputStream, Nothing)
            MyXmlTextWriter.Formatting = Formatting.Indented
            MyXmlTextWriter.Indentation = 5
            MyXmlTextWriter.IndentChar = " "

            'Load the contents of XMLDocument argument into XMLTextWriter
            XMLDocument.Save(MyXmlTextWriter)

            'Load Formatted XML Stream into StreamReader
            Dim XMLStreamReader As New System.IO.StreamReader(OutputStream)
            OutputStream.Flush()
            OutputStream.Position = 0

            'Return Indented XML String
            PrettyPrintXML = XMLStreamReader.ReadToEnd()
            XMLStreamReader.Close()
        End Function

#End Region

    End Class

End Namespace