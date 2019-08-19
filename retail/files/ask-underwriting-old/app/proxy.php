<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header('Content-type: application/json');
$site=$_GET['site'];
$url='';
if ($site=='2')
$url = "http://192.168.3.22:7005/".$_GET['url'];
else
$url = "http://192.168.3.22:7005/".$_GET['url'];

function url_get_contents ($Url) {
    if (!function_exists('curl_init')){ 
        die('CURL is not installed!');
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $Url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}

echo url_get_contents($url);

// echo file_get_contents(''.$url.'');

?>