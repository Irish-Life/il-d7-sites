Imports Ektron.Cms
Imports Ektron.Cms.Common

Partial Class login
    Inherits System.Web.UI.Page

    Private m_strAction As String = ""
    Protected m_refMsg As Common.EkMessageHelper
    Protected m_template As String = ""
    Dim bAutoLogin As Boolean = False
    Dim sAutoLoginName As String = ""
    Protected m_refUserApi As New UserAPI
    Protected m_PleaseLoginMsg As String
    Protected m_bMemberOnly As Boolean = False
    Protected m_eAutoAddType As Common.EkEnumeration.AutoAddUserTypes = EkEnumeration.AutoAddUserTypes.Author

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        Dim strScript As String = ""
        Try
            Response.CacheControl = "no-cache"
            Response.AddHeader("Pragma", "no-cache")
            Response.Expires = -1
            ErrorText.InnerText = ""
            m_strAction = Request.QueryString("action")
            If (IsNothing(m_strAction)) Then
                m_strAction = ""
            End If
            m_refMsg = m_refUserApi.EkMsgRef
            LoginRequestPanel.Visible = False
            LoginSuceededPanel.Visible = False
            LoginErrorPanel.Visible = False
            m_PleaseLoginMsg = m_refMsg.GetMessage("lbl logged in refresh")

        Catch ex As Exception
            ShowError(ex.Message)
        End Try
    End Sub

    Private Sub Page_PreRender(ByVal sender As Object, ByVal e As System.EventArgs) Handles MyBase.PreRender
        If (Not Request.QueryString("autoaddtype") Is Nothing) AndAlso (Request.QueryString("autoaddtype").ToString().ToLower() = "member") Then
            m_eAutoAddType = EkEnumeration.AutoAddUserTypes.Member
        End If
        If ((m_strAction.Length > 0) And ((m_strAction.ToLower = "logout") Or (m_strAction.ToLower = "logoutnoprompt"))) Then
            LogoutUser()
        ElseIf ((m_strAction.Length > 0) And (m_strAction.ToLower = "autologin")) Then
            autologin.Text = "<iframe src=""SSO/autologin.aspx?autoaddtype=" & System.Enum.GetName(GetType(Common.EkEnumeration.AutoAddUserTypes), Me.m_eAutoAddType) & """></iframe>"
        ElseIf Context.Items.Count > 0 AndAlso Not (HttpContext.Current.Session("ekusername") Is Nothing) Then
            bAutoLogin = True
            sAutoLoginName = HttpContext.Current.Session("ekusername")
            HttpContext.Current.Session("ekusername") = Nothing
            Login()
        ElseIf (m_strAction.Length > 0 And m_strAction.ToLower = "toggle") Then
            If (m_refUserApi.RequestInformationRef.ShowBorders = True) Then
                m_refUserApi.SetShowBorders(False)
            Else
                m_refUserApi.SetShowBorders(True)
            End If

            Response.Redirect("close.aspx?toggle=true", False)
        Else
            Login()
        End If
    End Sub

    Public Sub Login()
        Dim strUsername As String = ""
        Dim strPassword As String = ""
        Dim strDomain As String = Request.Form("domainname")
        Dim strReload As String = "true"
        Dim strProtocol As String = ""
        Dim strGUID As String = ""
        Dim UserInfo As UserData
        Dim i As Integer = 0
        Try
            If (Not (IsNothing(Request.QueryString("reload")))) Then
                strReload = Request.QueryString("reload")
            End If
            If (Not Request.QueryString("onlymember") Is Nothing) Then
                If (Request.QueryString("onlymember") <> "") Then
                    'We should not check to see the value is true or false to stop hacking. 
                    'by defaut if the key exists then we only allow membership user all other should be logged out.
                    m_bMemberOnly = True
                End If
            End If
            strProtocol = m_refUserApi.AuthProtocol
            If (Not (IsPostBack())) And Not (bAutoLogin) Then
                loginlbl.InnerText = m_refMsg.GetMessage("first login message")
                usernamelbl.InnerText = m_refMsg.GetMessage("user")
                passwordlbl.InnerText = m_refMsg.GetMessage("pwd")
                domainlbl.InnerHtml = m_refMsg.GetMessage("domain")
                LoginBtn.Src = m_refUserApi.AppImgPath & LoginBtn.Src
                LoginRequestPanel.Visible = True
                TR_domain.Visible = False
                If (Not ((m_bMemberOnly) And (m_refUserApi.RequestInformationRef.LDAPMembershipUser = False))) Then
                    Dim domain_list As DomainData()
                    domain_list = m_refUserApi.GetDomains(0, 1)
                    If (Not (IsNothing(domain_list))) Then
                        TR_domain.Visible = True
                        For i = 0 To domain_list.Length - 1
                            domainname.Items.Add(New ListItem(domain_list(i).Name, domain_list(i).Path))
                        Next
                        domainname.Items(0).Selected = True
                    End If
                ElseIf (m_bMemberOnly And m_refUserApi.RequestInformationRef.LDAPMembershipUser = False) Then
                    Dim domain_list As DomainData()
                    domain_list = m_refUserApi.GetDomains(0, 1)
                    If (Not (IsNothing(domain_list))) AndAlso domain_list.Length > 0 Then
                        domainlbl.InnerHtml = "<input type=""hidden"" name=""domainname_"" id=""domainname_"" value=""" & domain_list(0).Path & """ />"
                        TR_domain.Visible = True
                    End If
                    domainname.Visible = False
                End If
            Else
                If bAutoLogin Then
                    Dim arrSAMUsername As Array
                    Dim domain_list As DomainData()
                    domain_list = m_refUserApi.GetDomains(1, 1)
                    strUsername = sAutoLoginName.ToString() 'Context.Items("username").ToString()
                    arrSAMUsername = Split(strUsername, "\")
                    strUsername = arrSAMUsername(1)
                    If (Not (IsNothing(domain_list))) AndAlso domain_list.Length > 0 Then
                        For i = 0 To domain_list.Length - 1
                            If arrSAMUsername(0).ToString().ToLower() = domain_list(i).NETBIOSName.ToString().ToLower() Then
                                strDomain = domain_list(i).Path.ToString()
                                Exit For
                            End If
                        Next
                    End If
                    If strDomain = "" Then
                        Throw New Exception("Invalid Domain")
                    End If
                Else
                    strUsername = Request.Form("username")
                    strPassword = Request.Form("pwd")
                    If (Not (IsNothing(Request.Form("domainname")))) Then
                        strDomain = Request.Form("domainname")
                    ElseIf (m_bMemberOnly And m_refUserApi.RequestInformationRef.LDAPMembershipUser = False) Then
                        strDomain = Request.Form("domainname_")
                    End If
                End If
                If (String.Compare(strUsername, "") > 0 And ((String.Compare(strPassword, "") > 0) Or (bAutoLogin))) Then
                    Dim cookieEktGUID As HttpCookie
                    If (Request.Cookies.Get("EktGUID") Is Nothing) Then
                        strGUID = System.Guid.NewGuid.ToString
                        cookieEktGUID = New HttpCookie("EktGUID", strGUID)
                        cookieEktGUID.Path = "/"
                        cookieEktGUID.Expires = Now.AddYears(1)
                        Response.Cookies.Add(cookieEktGUID)
                        m_refUserApi.RequestInformationRef.ClientEktGUID = strGUID
                    End If
                End If
                If bAutoLogin Then
                    UserInfo = m_refUserApi.autologInUser(strUsername, strDomain, Request.ServerVariables("SERVER_NAME"), m_eAutoAddType)
                Else
                    UserInfo = m_refUserApi.logInUser(strUsername, strPassword, Request.ServerVariables("SERVER_NAME"), strDomain, strProtocol, m_eAutoAddType)
                End If
                If (UserInfo Is Nothing OrElse UserInfo.Id = 0) Then
                    If m_refUserApi.RequestInformationRef.LDAPMembershipUser = False And Me.m_bMemberOnly = True Then
                        TR_domain.Visible = False
                    End If
                    AuthenticationFailed(m_refMsg.GetMessage("com: authentication error"))
                    Exit Sub
                End If

                If m_bMemberOnly Then
                    If ((Not UserInfo Is Nothing) AndAlso (UserInfo.Id > 0)) Then
                        If (Not UserInfo.IsMemberShip) Then
                            Response.Cookies("ecm").Expires = Now()
                            Throw New Exception(m_refMsg.GetMessage("err members only"))
                            ' Response.Redirect("close.aspx?logout=true", False)
                            Exit Sub ' we should not log this user.
                        End If
                    End If
                End If

                If (Not (Request.Cookies.Get("ecm") Is Nothing)) Then
                    Response.Cookies("ecm").Expires = Now()
                End If
                Dim cookie As HttpCookie = System.Web.Security.FormsAuthentication.GetAuthCookie(UserInfo.Username, False)
                Response.Cookies.Add(cookie)
                Dim cookEcm As HttpCookie = New HttpCookie("ecm")
                cookEcm.Values("user_id") = UserInfo.Id
                cookEcm.Values("site_id") = m_refUserApi.SitePath & "," & UserInfo.LoginIdentification
                cookEcm.Values("userfullname") = Server.UrlEncode(UserInfo.Username)
                cookEcm.Values("displayname") = Server.UrlEncode(UserInfo.DisplayName)
                cookEcm.Values("username") = Server.UrlEncode(strUsername)
                cookEcm.Values("new_site") = m_refUserApi.SitePath
                cookEcm.Values("unique_id") = UserInfo.LoginIdentification
                cookEcm.Values("editoroptions") = UserInfo.EditorOption
                cookEcm.Values("site_preview") = 0
                cookEcm.Values("langvalue") = ""
                cookEcm.Values("isMembershipUser") = IIf(UserInfo.IsMemberShip, 1, 0)
                cookEcm.Values("pagesize") = UserInfo.UserPreference.PageSize

                Dim objConfigSettings As New System.Configuration.AppSettingsReader
                Dim i_mLangId As Integer = CType(objConfigSettings.GetValue("ek_DefaultContentLanguage", GetType(System.String)), Integer)
                cookEcm.Values("DefaultLanguage") = i_mLangId
                cookEcm.Values("NavLanguage") = i_mLangId
                cookEcm.Values("SiteLanguage") = i_mLangId

                If (Not UserInfo.UserPreference Is Nothing) Then
                    m_template = UserInfo.UserPreference.Template
                    cookEcm.Values("template") = m_template
                    cookEcm.Values("folderid") = UserInfo.UserPreference.FolderId
                    cookEcm.Values("width") = UserInfo.UserPreference.Width
                    cookEcm.Values("height") = UserInfo.UserPreference.Height
                    cookEcm.Values("FolderPath") = UserInfo.UserPreference.FolderPath
                    cookEcm.Values("DisplayBorders") = UserInfo.UserPreference.DisplayBorders
                    cookEcm.Values("DisplayTitleText") = UserInfo.UserPreference.DisplayTitleText
                End If
                If (UserInfo.LanguageId = 0) Then
                    Dim m_refSiteApi As New SiteAPI
                    Dim setting_data As SettingsData
                    setting_data = m_refSiteApi.GetSiteVariables()
                    If (Not (IsNothing(setting_data))) Then
                        cookEcm.Values("UserCulture") = setting_data.Language
                        cookEcm.Values("LastValidLanguageID") = setting_data.Language
                    Else
                        cookEcm.Values("UserCulture") = UserInfo.LanguageId
                        cookEcm.Values("LastValidLanguageID") = i_mLangId
                    End If
                Else
                    cookEcm.Values("UserCulture") = UserInfo.LanguageId
                    cookEcm.Values("LastValidLanguageID") = i_mLangId
                End If
                Response.Cookies.Add(cookEcm)

                If strReload = "true" Then
                    LoginSuceededPanel.Visible = True
                Else
                    LoginSuceededPanel.Visible = False
                End If
                WorkareaCloserJS.Text = ""
                Dim storeRptUrl As String = ""
                Session("fromLnkPg") = "0"
                If Not (Request.QueryString("fromLnkPg") Is Nothing) Then
                    If Not (Session("RedirectLnk") Is Nothing) And (Session("RedirectLnk") <> "") Then
                        storeRptUrl = Session("RedirectLnk")
                        Session("RedirectLnk") = ""
                        Session("fromLnkPg") = "1"
                        Response.Redirect(storeRptUrl)
                    End If
                End If
            End If
        Catch ex As Exception
            ShowError(ex.Message)
        End Try
    End Sub

    Private Sub ShowError(ByVal ErrorString As String)
        'I just truncate our method names
        If (ErrorString.Length > 0 AndAlso ErrorString.IndexOf("[") <> -1) Then
            ErrorString = ErrorString.Substring(0, ErrorString.IndexOf("["))
        End If
        If (ErrorString.IndexOf(m_refMsg.GetMessage("msg:account locked")) <> -1) Then
            ErrorString = m_refMsg.GetMessage("msg:account locked")
        End If
        If (ErrorString.IndexOf("user name or bad password") <> -1) Then
            ErrorString = ErrorString.Substring(0, (ErrorString.IndexOf("password") + 8))
        End If
        If (ErrorString.IndexOf(m_refMsg.GetMessage("com: could not retrieve ad user information")) <> -1) Then
            ' this should make more sense - SMK
            ErrorString = m_refMsg.GetMessage("com: could not authenticate user against ad")
        End If
        If (ErrorString.IndexOf("Object reference not set to an instance of an object") <> -1) Then
            ErrorString = m_refMsg.GetMessage("com: authentication error")
        End If
        If (ErrorString.IndexOf("LDAP") <> -1) Then
            ErrorString = ErrorString.Substring(0, (ErrorString.IndexOf("LDAP") + 4))
        End If
        If (ErrorString.ToLower().IndexOf("maximum number of licensed users. you cannot ") <> -1) Then
            ErrorString = ErrorString.Substring(0, ErrorString.ToLower().IndexOf(". you cannot"))
        End If
		If (ErrorString.IndexOf(m_refMsg.GetMessage("com:license violation")) <> -1) Then
			ErrorString = m_refMsg.GetMessage("com:license violation")
        End If
        If (ErrorString.ToLower().IndexOf("at ektron.") <> -1) Then
            ErrorString = ErrorString.Substring(0, ErrorString.ToLower().IndexOf("at ektron."))
        End If
        If ((ErrorString.ToLower().IndexOf("unknown error") > -1) Or (ErrorString.ToLower().IndexOf("server is not operational") > -1)) Then
            ErrorString = (m_refMsg.GetMessage("com: error getting ad domains") & ". " & m_refMsg.GetMessage("com: verify ad domains"))
        End If
        If m_refUserApi.RequestInformationRef.LDAPMembershipUser = False And Me.m_bMemberOnly = True Then
            TR_domain.Visible = False
        End If
        AuthenticationFailed(ErrorString)
    End Sub
    Private Sub AuthenticationFailed(ByVal errorMessage As String)
        If (errorMessage = "") Then
            loginlbl.InnerText = m_refMsg.GetMessage("Invalid username or password") & vbCrLf & m_refMsg.GetMessage("Please try again")
        Else
            loginlbl.InnerText = ""
        End If

        LoginErrorPanel.Visible = True
        LoginRequestPanel.Visible = True
        usernamelbl.InnerText = m_refMsg.GetMessage("user")
        passwordlbl.InnerText = m_refMsg.GetMessage("pwd")
        domainlbl.InnerHtml = m_refMsg.GetMessage("domain")
        LoginBtn.Src = LoginBtn.Src
        ErrorText.InnerText = errorMessage
    End Sub
    Private Sub LogoutUser()
        If (Not IsPostBack() And m_strAction.ToLower() <> "logoutnoprompt") Then
            Dim language_data As LanguageData
            Dim m_refSiteApi As New SiteAPI
            language_data = m_refSiteApi.GetLanguageById(m_refSiteApi.UserLanguage)
            logoutmsg.InnerHtml = m_refMsg.GetMessage("logout message")
            'LogoutBtn.Src = language_data.ImagePath & LogoutBtn.Src
            LogoutPanel.Visible = True
            'fixed defect # 19069
            Dim strCloser As New System.Text.StringBuilder
            strCloser.AppendLine("<SCRIPT language='javascript'>")
            strCloser.AppendLine("document.forms[0].action = 'login.aspx?action=logout&i=19069';")
            strCloser.AppendLine("document.forms[0].__VIEWSTATE.name = 'NOVIEWSTATE';")
            strCloser.AppendLine("</SCRIPT>")
            Page.ClientScript.RegisterStartupScript(Me.GetType(), "formsubmit", strCloser.ToString())
        Else


            Dim strCloser As New System.Text.StringBuilder
            ' Render script to close the Workarea:
            strCloser.Append("<SCRIPT language='javascript'>" & vbCrLf)
            strCloser.Append("PopUpWindow('close.aspx?logout=true','Admin400',0,0,0,0);</SCRIPT>" & vbCrLf)
            strCloser.Append("</SCRIPT>" & vbCrLf)
            WorkareaCloserJS.Text = strCloser.ToString()

            If (Not Session("DDSnip") Is Nothing) Then
                Session("DDSnip") = Nothing
            End If
            If (Not Session("LibCategory") Is Nothing) Then
                Session("LibCategory") = Nothing
            End If
            If Response.Cookies(System.Web.Security.FormsAuthentication.FormsCookieName) IsNot Nothing Then
                Response.Cookies(System.Web.Security.FormsAuthentication.FormsCookieName).Expires = Now()
            End If

            Response.Cookies("ecm").Expires = Now()
            LoginSuceededPanel.Visible = True
        End If
    End Sub
    'Private Sub LogoutBtn_ServerClick(ByVal sender As System.Object, ByVal e As System.Web.UI.ImageClickEventArgs) Handles LogoutBtn.ServerClick
    '    'Clear Sessions and Cookies
    '    Dim a As String
    '    a = ""
    'End Sub

    Protected Sub LogoutBtn_Click(ByVal sender As Object, ByVal e As System.Web.UI.ImageClickEventArgs) Handles LogoutBtn.Click

    End Sub
End Class
