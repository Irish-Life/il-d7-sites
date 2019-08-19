
var getResultOnly=false;

function calcRiskProfile(resultsOnly)
{
	var parms='';
	numQuestionsAnswered = 0;
		parms='showFunds=N&';
		parms=parms+'b2c=Y&';
		parms=parms+'internal=Y&';
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
		document.getElementById('risk-profile-questions').style.display='none';
		$('#' + divId + 'Response').html(response);
		$('#' + divId + 'Response').show('slide', {direction: 'right'}, 500);
		if (_gaq) _gaq.push(['_trackPageview', '/guides/Risk-Questionnaire-Completed.html']);
	}
	else
	{		
		var risk=response.substr(85,1);
		//get the number from the response
		//show the relevant div in the result using the number
		$('#riskProfileResults').removeClass('hidden');
		$('#risk-profile-questions').addClass('hidden');
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
			$(this).addClass('hidden');
		})
		$('#risk-item' + question).removeClass('hidden');
		$('#risk-item' + question).show('slide', {direction: 'right'}, 500);
	}
	else
	{
		alert('Please answer the question');
	}
}

function startQuestionnaire()
{
$('#importantInformation').addClass('hidden');
$('#riskProfileResults').addClass('hidden');
$('#risk-profile-questions').removeClass('hidden');
$(".risk-item").addClass('hidden');
$('#risk-item1').removeClass('hidden');
$('#risk-profile-questions').show('slide', {direction: 'right'}, 500);
}




