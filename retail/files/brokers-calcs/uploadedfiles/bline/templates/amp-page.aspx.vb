
Partial Class amppage
    Inherits System.Web.UI.Page

	Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
		
		Dim api as New Ektron.Cms.API.Content.Content
		Dim menuCls As New DisplayMenu		
		Dim menuId As Integer
        Dim pageId As Integer
		
		cssFiles.Text = api.GetContent(18874).Html
		javascriptFiles.Text = api.GetContent(18876).Html
		ampfooter.Text = api.GetContent(18886).Html
		
        '# Check for id being passed in on the query string
        If Not IsNumeric(Request.QueryString("id")) Then
            '# default Id
            pageId = 66
        Else
            pageId = Request.QueryString("id")
        End If
        
        '# Display Folder Name & Breadcrumb end
        Dim pgCls As New Page
		
		
		menuId=384
		
		menuText.Text = menuCls.GenMenu(menuId, Request.RawUrl)
		menuCls = Nothing
		
    End Sub
End Class
