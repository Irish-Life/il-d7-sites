<html>
<head><title>Free parent life insurance</title>
<script type="text/javascript">
	var url = 'https://www.irishlife.ie/eBusinessApps/Launch/Referral/Free/';

	function gup( name )
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
		return "";
	  else
		return results[1];
	}
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires+";domain=.irishlife.ie;path=/";
	}

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create', 'UA-16369698-6', 'irishlife.ie');
	  ga('require', 'displayfeatures');
	  ga('send', 'pageview','/life-assurance/free-life-insurance-123-auto-launch');

	var _prum = [['id', '52d56553abe53dfb39000000'],
				 ['mark', 'firstbyte', (new Date()).getTime()]];
	(function() {
		var s = document.getElementsByTagName('script')[0]
		  , p = document.createElement('script');
		p.async = 'async';
		p.src = '//rum-static.pingdom.net/prum.min.js';
		s.parentNode.insertBefore(p, s);
	})();
	var refer = gup('refer');
	ga('send','event','Free Parent Cover', refer, 'Apply Now Button');

	setTimeout(function(){setCookie('FreeCover', refer, 1)},1200);
	
	setTimeout(function(){window.location=url+refer},1200);

</script>
</head>
<body>
<img style="margin-left: 300px;margin-top: 150px;" src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/ajax-loader-med.gif" />
</body>

</html>