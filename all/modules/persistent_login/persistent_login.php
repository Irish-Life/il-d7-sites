<?php

function amILoggedIn()
{
	$loggedIn = "false";
	$cookieName = '_ASPXFORMSAUTH_OnlineServices'; //name if the cookie
	if(isset($_COOKIE[$cookieName])) {
		$loggedIn = "true";
	} 
	return $loggedIn;
}

function persistent_login_contents() {

	//look for specific cookie
	//if cookie exists then use name inside the cookie
	$cookieName = 'OlsPersist';
	$cookieName2 = '_ASPXFORMSAUTH_OnlineServices'; //name if the cookie
	$logIn = '';
	if (isset($_GET['login']))
	{
		$logIn = $_GET['login'];
	}

	//check ASPX cookie 
	//If it exists then we are logged in
	//else not logged in
	//see if the persistent cookie exists
	$detail = '';
	if (isset($_COOKIE[$cookieName]))
	{
		$detail = $_COOKIE[$cookieName];
	}
	
	if ($logIn == 'N')
	{
		//delete cookies
		//redirect page
		setcookie($cookieName, "", time()-(3600*60),'/');
		setcookie($cookieName2, "", time()-(3600*60),'/');
		unset($_COOKIE[$cookieName]); 
		unset($_COOKIE[$cookieName2]); 
		$url = (isset($_SERVER['HTTPS']) ? "https" : "http")."://".$_SERVER[HTTP_HOST].$_SERVER[REQUEST_URI];
		$paramPosition = strPos($url , "?");
		$urlToLoad = $url;
		if ($paramPosition > -1)
		{
				$urlToLoad = substr($url,0,$paramPosition);
		}
		header("Location:".$urlToLoad); /* Redirect browser */
		exit();
		
	}
	else if (amILoggedIn() == "false") //we are logged out
	{
			$htmltoreturn= '<!-- JQuery Modal for Online Services Login -->
		<style>
		.banner-curve {z-index:1}
		</style>
		<div id="persistent-login-modal" class="modal" style="margin:0 auto;display:none;border: none;background: none; box-shadow: none; ">
			<div id="login-modal-content" class="modal-content" style="padding: 0; max-height: none; background: none; ">
			<iframe src="/myonlineservices/account/login1modal" style="height: 100vh; width: 100%; border: none; " allowtransparency="true" ></iframe>
			 <!-- ************* THIS IS WHERE THE MODAL IS INSERTED ********************************************** -->  
			</div>
		</div>
	
		<div class="loginSignup"><a class="login-to-mos" href="#persistent-login-modal" rel="modal:open">Login</a>&nbsp&nbsp; <span style="color:#efefef;font-size:20px">|</span> &nbsp&nbsp;<a target="_blank" href="/myonlineservices/AccountRegister/Register1">Sign Up</a><br></div>';
	}
	else { //only if we are logged in
			$pieces = explode("&", $detail);
			$firstPart=$pieces[1];
			$secondPart=$pieces[2];
			$name = explode("=", $firstPart);
			$htmltoreturn= '
			<style>#region-search-bar-header{margin:1.1em 0.00em 0.00em 0em}</style>	
			<div style="color:#5261ac;float:right;font-size:1.2em">Welcome back, '.$name[1].'!<br><a onClick="location.reload();" id="logout-of-site" style="color:#50c9b5;font-size:0.8em;text-decoration:none" href="'.$_SERVER['PHP_SELF'].'?login=N">Not you?</a>
			';
	}
	return $htmltoreturn;
}

echo persistent_login_contents();

?>