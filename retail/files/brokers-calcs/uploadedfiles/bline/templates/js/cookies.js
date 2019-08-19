var cookieHtml='<div style="position: static; top: 0px; margin-left: 120px; width: 1030px; height: 165px;" id="cookieHeader"><div style="float: left; padding: 10px; width: 758px;" id="cookieNotice"><h3 style="font-weight: bold;">Important information regarding cookies</h3><p style="color: rgb(51, 51, 51); font-size: 1em;">Irish Life uses cookies to enhance your browsing experience and to create a secure and effective website for our customers. By using this site you agree that we may store and access cookies on your device, unless you have disabled your cookies.</p><br><p style=""><a href="http://www.bline.ie/site/privacy-policy.html">You can find out more about our cookies here.</a></p></div><div id="button" style="float: left; width: 185px; margin-top: 45px;"><a onclick="acceptCookies()" href="javascript:void(0)"><img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/read-notice.gif"></a></div></div>';



function acceptCookies(){
	setCookie("AcceptCookies","true",365);
	location.reload();
}

function setCookie(c_name, value, expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	
	document.cookie = c_name + "=" + escape(value) +
								    ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString()) + 
									";path=/";
}

function cookieExists(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start=c_start + c_name.length + 1;
			c_end=document.cookie.indexOf(";", c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return false;
}


function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start=c_start + c_name.length + 1;
			c_end=document.cookie.indexOf(";", c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function checkForAcceptCookies()
{
	if(!cookieExists("AcceptCookies")){
		$('body').prepend(cookieHtml);
	}
}
