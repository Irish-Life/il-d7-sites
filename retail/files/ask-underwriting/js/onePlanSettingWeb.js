//settings here
var isOnePlan = localStorage.getItem("isOnePlan") == "Y" ?true:false;

$(document, '#medicalInfoText').ready(function() {

if (isOnePlan)
{
	$('.onePlan').show();
	$('.notOnePlan').hide();
	$('#medicalInfoText p:contains("questionnaire")').hide();
	$('#medicalInfoText p:contains("Questionnaire")').hide();
	$('#medicalInfoText h2:contains("What information should my client provide?")').hide();

}
else
{
	$('.onePlan').hide();
	$('.notOnePlan').show();
	$('#medicalInfoText p:contains("questionnaire")').show();
	$('#medicalInfoText p:contains("Questionnaire")').show();
	$('#medicalInfoText h2:contains("What information should my client provide?")').show();
	//$('#launcher, .zEWidget-launcher .zEWidget-launcher--active').hide();
	$zopim(function() {
    $zopim.livechat.hideAll();
    });
	/*
	zE(function() {
    zE.hide();
    }); */
}
});


