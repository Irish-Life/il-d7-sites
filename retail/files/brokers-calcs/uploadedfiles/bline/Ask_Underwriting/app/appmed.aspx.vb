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


		Dim api as New Ektron.Cms.API.Content.Content
		
		askundermeds_a.Text = api.GetContent(9646).Html
		askundermeds_b.Text = api.GetContent(2894).Html
		askundermeds_c.Text = api.GetContent(9648).Html
		askundermeds_d.Text = api.GetContent(9652).Html
		askundermeds_e.Text = api.GetContent(9654).Html
		
		

    End Sub

End Class
