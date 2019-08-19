//settings here
var isOnePlan = localStorage.getItem("isOnePlan") == "Y" ?true:false;

if (isOnePlan)
{
	$('.onePlan').show();
	$('.notOnePlan').hide();
}
else
{
	$('.onePlan').hide();
	$('.notOnePlan').show();
}


