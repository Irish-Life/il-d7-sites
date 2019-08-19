Imports System
Imports System.IO
Imports System.Web.HttpContext
Imports System.Text
Imports System.Xml
Imports System.Web.UI
Imports Ektron.Cms
Imports Ektron.Cms.Common
Imports Ektron.Cms.Common.EkFunctions

Partial Class home
    Inherits System.Web.UI.Page

	Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
	
		Response.Cache.SetExpires(DateTime.Now.AddSeconds(60))
		Response.Cache.SetCacheability(HttpCacheability.Private)
		Response.Cache.SetValidUntilExpires(True)
		Response.Cache.SetLastModifiedFromFileDependencies()
		
		Dim bannerValue As String = ""
		Dim bannerContent as Integer = 15198
		
		Dim topAdValue As String = ""
		Dim topAdContent as Integer = 15180
		
		Dim bottomAdValue As String = ""
		Dim bottomAdContent as Integer = 15182
		
		Dim api as New Ektron.Cms.API.Content.Content
		
		
		'# Set RHS content
        'bannerValue = MainContentBlock.GetMetaData.GetItemByName("Banner").Value
        'If Len(bannerValue) <> 0 Then
        '    bannerContent = CInt(bannerValue)
        'End If
        'banner.DefaultContentID = bannerContent
		
		'# Set RHS Top Ad content
        'topAdValue = MainContentBlock.GetMetaData.GetItemByName("Top_Ad_Space").Value
        'If Len(topAdValue) <> 0 Then
        '    topAdContent = CInt(topAdValue)
        'End If
        'Top_Ad_Space.DefaultContentID = topAdContent
		
		'# Set RHS Bottom Ad content
        'bottomAdValue = MainContentBlock.GetMetaData.GetItemByName("Bottom_Ad_Space").Value
        'If Len(bottomAdValue) <> 0 Then
        '    bottomAdContent = CInt(bottomAdValue)
        'End If
        'Bottom_Ad_Space.DefaultContentID = bottomAdContent
		
		cssFiles.Text = api.GetContent(15158).Html
		javascriptFiles.Text = api.GetContent(15160).Html
		navigation.Text = api.GetContent(15184).Html
		contentFooter.Text = api.GetContent(15186).Html
		trailingFooter.Text = api.GetContent(15188).Html
		myBizLogin.Text = api.GetContent(15178).Html
		'quickLinks.Text = api.GetContent(15162).Html
		topRowCenter.Text = api.GetContent(15168).Html
		middleRowLeft.Text = api.GetContent(15170).Html
		middleRowRight.Text = api.GetContent(15172).Html
		bottomRowLeft.Text = api.GetContent(15174).Html
		bottomRowRight.Text = api.GetContent(15176).Html
		
    End Sub
End Class
