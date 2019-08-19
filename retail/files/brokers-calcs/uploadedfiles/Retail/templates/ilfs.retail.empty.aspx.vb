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

Partial Class retailcontent
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim pageId As Integer
        Dim pageNameStr As String = ""
        'Dim rhs_relatedValue As String = ""
        'Dim rhs_relatedId As Integer = 6596
        
		Dim ilfsCSSID As String = ""
		Dim ilfsCSSContent as Integer = 17036
        
		Dim ilfsJavascriptID As String = ""
		Dim ilfsJavascriptContent as Integer = 17040
        
		Dim ilfsMobileID As String = ""
		Dim ilfsMobileContent as Integer = 17142
        
		Dim api as New Ektron.Cms.API.Content.Content
		
        iqHeaderblock.Text = api.GetContent(10802).Html
		ilfsGeneralJS.Text = api.GetContent(16972).Html
      
		
        
        '# Set the extra css files that might be required. 
        '# These are set in the metadata ilfsCSS section. 
        ilfsCSSID = MainContentBlock.GetMetaData.GetItemByName("ilfsCSS").Value
        If Len(ilfsCSSID) <> 0 Then
            ilfsCSSContent = CInt(ilfsCSSID)
        End If
        ilfsCSS.DefaultContentID = ilfsCSSContent
        
        '# Set RHS Top Ad content
        ilfsJavascriptID = MainContentBlock.GetMetaData.GetItemByName("ilfsJavascript").Value
        If Len(ilfsJavascriptID) <> 0 Then
            ilfsJavascriptContent = CInt(ilfsJavascriptID)
        End If
        ilfsJavascript.DefaultContentID = ilfsJavascriptContent
        
        
        '# Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If
        
        
        
        '###############################################
        '# Setting up the mobile meta tag. If the ilfsMobile
        '# metadata has ANY element linked to it then it will
        '# add the code. Otherwise it will not.
        '###############################################
        ilfsMobileID = MainContentBlock.GetMetaData.GetItemByName("ilfsMobile").Value
        If Len(ilfsMobileID) <> 0 Then
                
            Dim pgClsa As New SiteFunctions
            mobileMeta.Text = "<link rel='alternate' media='only screen and (max-width: 640px)' href='http://m.irishlife.ie/"+pgClsa.GetPageLink2(pageId)+"' >"
            pgClsa = Nothing        
        End If
        'mobileMeta.DefaultContentID = ilfsMobileContent

        
        '# Display Folder Name & Breadcrumb end
        Dim pgCls As New Page


    End Sub

End Class
