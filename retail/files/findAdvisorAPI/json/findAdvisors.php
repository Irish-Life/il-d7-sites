<?php
//$file="advisors.csv";
//$csv= file_get_contents($file);
//$array = array_map("str_getcsv", explode("\n", $csv));
//$json = json_encode($array);
//print_r($json);

header('Content-Type: application/json');
$searchCounty = '';
$searchAdvisorType='';
$searchAdvisorId='';
$numToReturn = 100;
$f2f='';
$branch='';
$home='';
$phone='';
$morning='';
$afternoon='';
$evening='';
try {
	if (isset($_GET["county"]))
	{
		$searchCounty = $_GET["county"];
	}
	if (isset($_GET["type"]))
	{
		$searchAdvisorType=$_GET["type"];
	}
	if (isset($_GET["id"]))
	{
		$searchAdvisorId=$_GET["id"];
	}
	if (isset($_GET["num"]))
	{
		$numToReturn=$_GET["num"];
	}
	if (isset($_GET["f2f"])) {
		$f2f="Y";
	}
	if (isset($_GET["branch"])) {
		$branch="Y";
	}
	if (isset($_GET["home"])) {
		$home="Y";
	}
	if (isset($_GET["phone"])) {
		$phone="Y";
	}
	if (isset($_GET["morning"])) {
		$morning="Y";
	}
	if (isset($_GET["afternoon"])) {
		$afternoon="Y";
	}
	if (isset($_GET["evening"])) {
		$evening="Y";
	}
} catch (Exception $e) {
   
}
//$handle = fopen("advisors.csv", "r");
//$firstRow = fgetcsv($handle, 0, ",");
$counties = array('Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin', 'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick', 'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon', 'Sligo', 'Tipperary', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow');
$branchesSearch=array('ptsb','aib','ulster','kbc','ebs');
echo "[";

$row = 0;
if (($handle = fopen("advisors.csv", "r")) !== FALSE) {
  while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
			$county='';
			$a = strtolower($data[3]);	
			for ($x = 0; $x < 26; $x++) {
				$countyCheck = strtolower($counties[$x]);
				if (strpos($a, $countyCheck) !== false && strpos($a, $countyCheck) > 10) {
					$county = $counties[$x];
				}
			} 	 
			if (strcasecmp($searchCounty, $county) == 0 && $county != '' && $row < $numToReturn) {
				/**
				For subsequent rows stick in comma
				*/									
				$includeThis = false;				
				$includeBranch=false;
				$advisorName=$data[2];
				$branchName='';
				$a = strtolower($data[1]);
				for ($x = 0; $x < count($branchesSearch) && $includeBranch === false; $x++) {
					$branchCheck = strtolower($branchesSearch[$x]);
					if (strpos($a, $branchCheck) !== false && strpos($a, $branchCheck) > -1) {
						$includeBranch=true;
						$advisorName=$branchCheck.' financial advisor';
						$branchName=$branchCheck.' branch - town';
						$data[14]='N';
						$data[13]='Y';
						$data[11]='N';
						$data[10]='N';
						$data[9]='Y';
						$data[8]='N';
					}
				} 
								
				$includeThis = ($searchAdvisorType == '' || $searchAdvisorType == $data[1])
				 && ($searchAdvisorId == '' || $searchAdvisorId == $data[0])
				 && ($f2f == '' || $f2f == $data[8])
				 && ($branch == '' || $branch == $data[9])
				 && ($home == '' || $home == $data[10])
				 && ($phone == '' || $phone == $data[11])
				 && ($morning == '' || $morning == $data[12])
				 && ($afternoon == '' || $afternoon == $data[13])
				 && ($evening == '' || $evening == $data[14]);
								
				$jsonRow='';
				if ($includeThis) {
					if ($row >=1 && $row < $numToReturn) {
					$jsonRow= ',';
				}				
				
				
				$jsonRow=$jsonRow.	
				'{
				"order":"'.$row.'",
				"advisorId":"'.$data[0].'",
				"advisorType": "'.$data[1].'",
				"name": "'.$advisorName.'",
				"address": "the street the town '.$county.'",
				"county": "'.$county.'",
				"mobile": "'.$data[5].'",
				"email": "'.$data[4].'",
				"linkedin": "www.linkedin.com/advisor",
				"skype": "skype:12345678",
				"www": "'.$data[5].'",
				"location": "-51.32555,-65.3258",
				"logoURL": "'.$data[7].'",
				"logoData": "data:image/png;base64 iVBORw0KGgoAAAANSUhEUgAAAJ4AAAAtCAMAAABoBSKSAAAAQlBMVEX///8gIEBAYMD/+/DAwMBAQECgoKTA3MCAgICAYICAoMCmyvBgYECAgMCgoMBgYIBgYMBgQEBAIEBggMBAQMBAQICk1RdKAAADaElEQVRYhe2Y67KjIAyA0XCTi7W1+/6vuhBAgVK17Zk9zk7zR6UkfIQkQAn5yv8rqu+n2Vo7JdG/TVSIsqMAQmDso5wLD9Iz4dFfxXkm+px41IbVtFarE+LZP6N/gIfU9nR4alxe9XQ+7y0C9oyxB6PF5IXZ1b/z4an7HfFcXgCcD8+GbcLVlZnQ8+FBqMvzvbdE/XM8oE7ETh8FMI3KEnsQT3AO+72ejbYqA2edE7PRW6vZR51yOdLEA8dSD+CMDq2Boe0I1y6XH7yyiXzSwzEmN/AQSXs83cKjztqlUuHe6qP7fNd6JigX132xSr2yWF6NANhaCYy3kWho43mU2lPeLGvgdU/wWI4Hq/KwgO7g2fDeqHstPMKZaZg9hkfo1dClne3QBbw+VObGptbEa8tBvEUwCo/hhWNBY1M7B57yr3obDyikmgKQFldQzqmADA98SxGZFV5UhpDDKTO8Gn+cxFE8ztgNCL+5nIULi9lMTYeCsR7wKJYyllspU0Oy7uqekoWOsa6ECljqrXi4uOMWnkuzG/gvhsl3Sf6q8HhqysyUeO7rGhuDyGC9M/L6GB4Z3qb3pJ9aqPEQa6F/Mi5ELNxYb/wokpVbQROPUr8SLOxpMnLJhyhV8Xrmyt4uHuuYdNYSXpULwZc8ImQVrYmXp4ZIg8DDJpDw7LydubgBXSE3wht4Qbv0wi6eLBSLkprq3jwB2ap7cq32ufeyWKYxjqLWC3hs2SSrGUc89BxsbmpyVVxiD1fTpCqSrfVreBjDVHjh6xQzPBvwGue9HO8GJR6JaRo9+Dae6AopdoGIp9/BS9UqTPhtPLqHpzyeDu/lfyzbeOlAiVgfeY+JRYodxyPdlb/jOry7C8PypLSDlwB90rwfe7fmAS3hTQrCnUPP/Vh128Vzk49V7qPUaJ0ZAl5O9DCHA3h4Gv4ED7e05lnHHeZVu/0FPPPh4j47fiPevOYCaPvS4q6ltNrjGngQw76Fh6sbDuDuZlmM72LPakA2Nb2WucDMIPGYwcQeXhTexAvhezNyMKxyIxaTydp5av55m1yT31v8bmFIfp5ClON4rDCDumufocCzfSUlHh3kgGNy56jkPTlgG/Dh6o6TJl6rfVe6aK03WyLdVxD3e1Im2RvaMgxtVXcsPVayd7X7yld+Rv4C1qQiEdQuE6IAAAAASUVORK5CYII=",
				"meeting": [{
					"faceToFace": "'.$data[8].'",
					"bankBranch": "'.$data[9].'",
					"homeVisit": "'.$data[10].'",
					"phone": "'.$data[11].'"
				}],
				"times": [{
					"morning": "'.$data[12].'",
					"afternoon": "'.$data[13].'",
					"evening": "'.$data[14].'"
				}]';

				if ($includeBranch) {
				$jsonRow = $jsonRow.
				',"branches": [{
					"branchName": "'.$branchName.' 1",
					"county": "'.$county.'"
					},
					{
					"branchName": "'.$branchName.' 2",
					"county": "'.$county.'"
					},
					{
					"branchName": "'.$branchName.' 3",
					"county": "'.$county.'"
					},
					{
					"branchName": "'.$branchName.' 4",
					"county": "'.$county.'"
					},
					{
					"branchName": "'.$branchName.' 5",
					"county": "'.$county.'"
					}
				]';
				}
				
			$jsonRow=$jsonRow.'	
			}';			
			
			echo $jsonRow;
				$row++;		
				}
		}
  }
  fclose($handle);
}

echo "]";

?>