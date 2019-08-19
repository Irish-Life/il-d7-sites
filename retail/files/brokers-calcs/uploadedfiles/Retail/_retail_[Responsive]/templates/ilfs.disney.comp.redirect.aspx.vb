
Partial Class home
    Inherits System.Web.UI.Page

	Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
	
    
        '#######################################################################################
        '# Mobile redirection
        '# Redirect the page if 'mob' is not set to anything
        Dim useragent = HttpContext.Current.Request.Headers("User-Agent")
        
        Dim isMobile = "false"
         
        If useragent <> ""
            If useragent.ToLower().Contains("android") OR useragent.ToLower().Contains("iphone") OR useragent.ToLower().Contains("ipod") OR useragent.ToLower().Contains("mobile") OR useragent.ToLower().Contains("blackberry") OR useragent.ToLower().Contains("windows ce") OR useragent.ToLower().Contains("opera mini") OR useragent.ToLower().Contains("palm") OR useragent.ToLower().Contains("ipad")
                isMobile = "true"
            End If           
        End If
        
        Dim mobRedirect = Request.QueryString("mob")
        '#mobileMetaBro.Text = mobRedirect
        
        Dim device = Request.Browser.IsMobileDevice
        
        If mobRedirect <> "false"
            If device.Equals("True") or isMobile.Equals("true") Then
                ' mobileMetaBro.Text = "isMobile"
                ' Dim redirectUrl = Request.Url.ToString().Replace("http://www.", "http://m")
                Dim redirectUrl = "http://resources.irishlife.ie/disneyland-paris-2014-competition.html"
                Response.Redirect(redirectUrl)
			Else
                Dim redirectUrl = "https://www.facebook.com/irishlifeassurance/app_224897724379293"
                Response.Redirect(redirectUrl)			
            End If
        End If
        
        '#
        '######################################################################################
        
		
    End Sub
End Class
