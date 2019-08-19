
var getResultOnly=false;

function calcRiskProfile(resultsOnly)
{
	var parms='';
	numQuestionsAnswered = 0;
		parms='showFunds=N&';
		parms=parms+'b2c=N&';
		parms=parms+'internal=N&';
	for(i = 1; i <= 15 ; i++)
	{	
	$(".alternative"+i).each(function(){
		if ($(this).attr('checked'))
		{
			parms=parms+'alternative'+i+'='+$(this).val()+'&';
			numQuestionsAnswered++;
		}
	});
	}
	if (resultsOnly)
	{
		parms=parms+'resultOnly=Y';
		getResultOnly=true;
	}
	else
	{
		getResultOnly=false;
	}
	if (numQuestionsAnswered == 15)
	{
		doAjax('/servlet/calcRiskProfile.do','RiskQuestions',parms,beforeQuestionnaire, successQuestionnaire, errorDefault, abortDefault);
  	}
	else
	{
		alert('All questions must be answered!');
	}
}

function beforeQuestionnaire(divId)
{
 // do nothing
}

function successQuestionnaire(divId, response)
{

	if (getResultOnly==false)
	{
		$('#risk-profile-questions').hide();
		$('#' + divId + 'Response').html(response);
		$('#' + divId + 'Response').show();
		if (_gaq) _gaq.push(['_trackPageview', '/guides/Risk-Questionnaire-Completed.html']);
	}
	else
	{		
		var risk=response.substr(38,1);
		//get the number from the response
		//show the relevant div in the result using the number
		$('#riskProfileResults').show();
		$('#risk-profile-questions').hide();
		$('.riskResults').addClass('hidden');
		$('#riskResults'+risk).removeClass('hidden');
	}
}

function showNextQuestion(question)
{
	var lastQAnswered = false;
	if (question-1 >= 1)
	{
		$(".alternative"+(question-1)).each(function(){
			if ($(this).attr('checked'))
			{
				lastQAnswered = true;
			}
		})
	}
	else
	{
		lastQAnswered = true;
	}
	if (lastQAnswered)
	{
		$(".risk-item").each(function()
		{
			$(this).hide();
		})
		
		$('.risk-item').hide();
		$('#risk-item' + question).fadeIn('500');
	}
	else
	{
		alert('Please answer the question');
	}
}

function startQuestionnaire()
{
$('#risk-item11').hide();
$('#riskProfileResults').hide();
$('#risk-profile-questions').removeClass('hidden');
$(".risk-item").addClass('hidden');
$('#risk-item1').removeClass('hidden');
	$('#importantInformation').hide();
	$('#risk-profile-questions').show('50');
	$('#risk-item1').show('500');


}




