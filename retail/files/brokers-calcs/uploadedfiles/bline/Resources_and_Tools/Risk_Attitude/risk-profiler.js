function calcRiskProfile()
{
var parms='';
numQuestionsAnswered = 0;
parms='showFunds=N&';
parms=parms+'b2c=N&';
parms=parms+'internal=Y&';
for(i = 1; i <= 11 ; i++)
{
$(".alternative"+i).each(function(){
if ($(this).attr('checked'))
{
parms=parms+'alternative'+i+'='+$(this).val()+'&';
numQuestionsAnswered++;
}
});
}
if (numQuestionsAnswered == 11)
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
document.getElementById('risk-profile-questions').style.display='none';
$('#' + divId + 'Response').html(response);
$('#' + divId + 'Response').show('slide', {direction: 'right'}, 500);
if (_gaq) _gaq.push(['_trackPageview', '/guides/Risk-Questionnaire-Completed.html']);
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
$('#risk-profile-questions').removeClass('hidden');
$('#risk-profile-questions').show('slide', {direction: 'right'}, 500);
}
