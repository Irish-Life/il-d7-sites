<?php
header('Content-Type: application/javascript');

function amILoggedIn()
{
	$loggedIn = "false";
	$cookieName = '_ASPXFORMSAUTH_OnlineServices'; //name if the cookie
	$cookieName = '_OnlineServicesAuth';
	if(isset($_COOKIE[$cookieName])) {
		$loggedIn = "true";
	} 
	return $loggedIn;
}

echo "var amILoggedIn = ".amILoggedIn().";";

function persistent_login_contents() {

	//look for specific cookie
	//if cookie exists then use name inside the cookie
	$cookieName = 'OlsPersist';

	//check ASPX cookie 
	//If it exists then we are logged in
	//else not logged in
	//see if the persistent cookie exists
	$detail = '';
	if (isset($_COOKIE[$cookieName]))
	{
		$detail = $_COOKIE[$cookieName];
	}
	if (amILoggedIn() == "true" && $detail != '') //we are logged in
	{
		//only if we are logged in
		$pieces = explode("&", $detail);
		$firstPart=$pieces[1];
		$secondPart=$pieces[2];
		$name = explode("=", $firstPart);
		$htmltoreturn= '
			<style>#region-search-bar-header{margin:1.1em 0.00em 0.00em 0em}</style>	
			<div style="color:#5261ac;float:right;font-size:1.2em">Welcome back, '.$name[1].'!<br><a onClick="location.reload();" id="logout-of-site" style="color:#50c9b5;font-size:0.8em;text-decoration:none" href="'.$_SERVER['PHP_SELF'].'?login=N">Not you?</a>
			';
		echo "var welcomeBackName='".$name[1]."';";
	}
}

persistent_login_contents();

?>