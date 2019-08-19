<?php

function writeDate() {
	$date = new DateTime();
	$newDate = $date->format('d/m/Y H:i:s') . "\n";
	//echo $date->format('U = Y-m-d H:i:s') . "\n";
	//echo $date->format('d/m/Y H:i:00') . "\n";
	echo $newDate;
    //echo '<script>';
    //echo 'var phpDate = ' . json_encode($newDate) . ';';
    //echo '</script>';
}
writeDate();

?>