<?php
header('Content-Type: application/json');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
$url = "http://10.233.202.9:4303/RiskWebService.asmx?WSDL";
$client = new SoapClient($url);
$response = $client->GetRiskQuestions();
$questionsJson='[    {        "questions": [';
foreach($response as $object)
{
	$numQuestions =  sizeof($object->RiskQuestions->RiskQuestion);
	$currentQnum=1;
	foreach($object->RiskQuestions->RiskQuestion as $riskQ)
	{
		$questionsJson .= ' 
		{				
                "id": "'.$currentQnum.'",
                "question": "'.$riskQ->Description.'",
                "answers": [                    {';
				$increLetter = 'a';
				$currentQAlt=1;
				$numQAlts =  sizeof($riskQ->Answers->RiskAnswer);
				foreach($riskQ->Answers->RiskAnswer as $alt)
				{				
				        $questionsJson.='"'.$increLetter.'": "'.$alt->Description.'"';
						if ($currentQAlt < $numQAlts)
						{
							$questionsJson.=',';
						}
						++$increLetter;	++$currentQAlt;
				}
                    $questionsJson .='}                ]        }';
		
		if ($currentQnum < $numQuestions)
		{
			$questionsJson.=',';
		}
		++$currentQnum;
	}
}
echo $questionsJson.']    }]';