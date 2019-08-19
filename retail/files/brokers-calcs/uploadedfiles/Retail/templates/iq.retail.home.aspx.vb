
Partial Class home
    Inherits System.Web.UI.Page

	Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

		Response.Cache.SetExpires(DateTime.Now.AddSeconds(60))
		Response.Cache.SetCacheability(HttpCacheability.Private)
		Response.Cache.SetValidUntilExpires(True)
		Response.Cache.SetLastModifiedFromFileDependencies()
		
		Dim api as New Ektron.Cms.API.Content.Content
		iqHomepageHeaderblock.Text = api.GetContent(10804).Html
		
		iqHomepageBodyContents.Text = api.GetContent(10816).Html
		iqHomepageBanner.Text = api.GetContent(10814).Html
		iqHomepageProducts.Text = api.GetContent(10818).Html
		
		iqMenublock.Text = api.GetContent(10806).Html
		iqMenublockAdvice.Text = api.GetContent(10808).Html
		iqMenublockProducts.Text = api.GetContent(10810).Html
		iqMenublockCustomerService.Text = api.GetContent(10812).Html
		iqFooterblock.Text = api.GetContent(10824).Html
		
		iqHomepageJavascript.Text = api.GetContent(10822).Html

    End Sub
End Class
