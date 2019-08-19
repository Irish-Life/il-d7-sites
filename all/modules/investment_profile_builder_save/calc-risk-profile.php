<?php

$url = "http://serv8303:4303/RiskWebService.asmx?WSDL";
$client = new SoapClient($url);
$fcs = $client->__getFunctions();
$response = $client->GetRiskQuestions();

$questionsJson='[
    {
        "questions": [
';

//var_dump($response);

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
                "answers": [
                    {';
				
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
						++$increLetter;
						++$currentQAlt;

				}

				
                    $questionsJson .='}
                ]
        }';
		
		if ($currentQnum < $numQuestions)
		{
			$questionsJson.=',';
		}
		++$currentQnum;

	}
	
	
}


echo $questionsJson.']
    }
]';