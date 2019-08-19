$(document).ready(function () {

	if (!fundCategoriesReceived)
		{
			parms='applicationId=AIP';
			doAjax('/servlet/startBlineFundPrices.do', 'FundCategories', parms);
			fundCategoriesReceived = true;
		}
});


function updateText()
{
$("td").each(function() {
    var text = $(this).text();
	if (text.indexOf("Price @")== 0)
    {	
		text = text.replace("Price @", "Performance @");
		$(this).text(text);
	}
});

$("th").each(function() {
    var text = $(this).text();
    if (text.indexOf("Fund Charge*")== 0)
    {
		text = text.replace("Fund Charge*", "Fund Charge ");
		$(this).text(text);
	}
});


}
