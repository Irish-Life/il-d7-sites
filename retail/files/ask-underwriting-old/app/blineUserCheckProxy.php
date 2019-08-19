<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header('Content-type: application/json');
$userId=$_GET['userId'];

if ($userId == 'BillOn')
{
    echo 'Y:2';
}
else if ($userId == 'BillOff')
{
    echo 'Y:1';
}
else
{
    $url = "http://192.168.3.22:7005/secure/blineUserCheck.do?userId=".$userId;
    function url_get_contents ($Url) {
    if (!function_exists('curl_init')){ 
        die('CURL is not installed!');
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $Url);    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    $output = trim($output);
    if (strpos($output,'Y') == 0)
    {
        $channel = substr ( $output , 1);
        $channels = array('2','3','25','12','24','25','26');

        for($x = 0; $x < $channels.length; $x++) {
            if ($channel == $channels[x])
            {
                   $output = 'Y:2';
            }
        }
    }
    curl_close($ch);
    return $output;
    }

echo url_get_contents($url);
}
?>