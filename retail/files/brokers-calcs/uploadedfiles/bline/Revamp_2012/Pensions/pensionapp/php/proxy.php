<?php 
$url = $_GET['url'];
$switchID = $_GET['sid'];
$step = $_GET['step'];

if($switchID == "1"){
    
	$premiumAmt = $_GET['premiumAmt'];
	$exitPenalties = $_GET['exitPenalties'];
	$premiumFreq = $_GET['premiumFreq'];

	$myURL = $url.'?step='.$step.'&premiumAmt='.$premiumAmt.'&exitPenalties='.$exitPenalties.'&premiumFreq='.$premiumFreq;

	echo file_get_contents($myURL);
}
else if($switchID == "2"){
    
	$productId = $_GET['productId'];
	$premiumAmt = $_GET['premiumAmt'];

	//$myURL = $url.'&productId='.$productId.'&premiumAmt='.$premiumAmt;
    //servlet/brokerCommissionApp?step=getAllocations&productId=CA123456&premiumAmt=12345
	$myURL = $url.'?step='.$step.'&productId='.$productId.'&premiumAmt='.$premiumAmt;

	echo file_get_contents($myURL);
}
else if($switchID == "3"){
    

	$emailTo = $_GET['emailTo'];
	$prem = $_GET['prem'];
	$productId = $_GET['productId'];
	$product = $_GET['product'];
	$freq = $_GET['freq'];
	$allocPct = $_GET['allocPct'];
	$exit = $_GET['exit'];
	$amc = $_GET['amc'];
			// http://www.irishlife.ie/servlet/sendBrokerCommEmail.do?emailTo=stephenhayden@gmail.com&prem=55555&productId=C1PPSAA&product=Complete%20Solutions%201&freq=Y&exit=Y&allocPct=100&amc=1.00

	$myURL = 'http://www.irishlife.ie/servlet/sendBrokerCommEmail.do?emailTo='.$emailTo.'&prem='.$prem.'&productId='.$productId.'&product='.$product.'&freq='.$freq.'&allocPct='.$allocPct.'&exit='.$exit.'&amc='.$amc;

	echo file_get_contents($myURL);
}
else
{
    echo "Sorry, there is an error.";
}


?>