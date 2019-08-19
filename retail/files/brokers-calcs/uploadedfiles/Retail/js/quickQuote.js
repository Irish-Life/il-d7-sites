var coverValue;
var sexValues;
var smokeValues = $("#smoke").val();
//var inflationValues = $("#inflation").val();
var ageValues;
var dobDay;
var dobMonth;
var dobYear;
var dobOK = true;
var dob;
var year;
var month;
var day;
var today;
var age;
var term;
var emailAddress;
var lc, sic, prem, prmLev, lev;
var r;
var partsArray;

function lifeMortgageQuote()
{
		if (validateInputs())
		{
				var parms ='quickQuoteId=lifeMortgage&productId=15&coverTypeCd=L&jointLife=False&dateOfBirth1Day='+dobDay+'&dateOfBirth1Month='+dobMonth+'&dateOfBirth1Year='+dobYear+'&sexCd1='+sexValues+'&smokerCd1='+smokeValues+'&lifeCoverAmt='+coverValue+'&frequencyCd=M&term='+term+'&indexation=False&conversion=True&id=21290&emailAddress=';
				$.ajax({
					type: 'POST',
					url: '/servlet/submitLifeCoverCalcQuote.do',
					async: true,
					data: parms,
					beforeSend: beforeQuoteAjax,
					success: successQuoteAjaxMP,
					error: errorQuoteAjax,
					timeout: 200000
				});
		}
}
function lifeTermQuote()
{
		if (validateInputs())
		{
				var parms ='quickQuoteId=lifeTermSum&productId=19&coverTypeCd=L&jointLife=False&dateOfBirth1Day='+dobDay+'&dateOfBirth1Month='+dobMonth+'&dateOfBirth1Year='+dobYear+'&sexCd1='+sexValues+'&smokerCd1='+smokeValues+'&lifeCoverAmt='+coverValue+'&frequencyCd=M&term='+term+'&indexation=False&conversion=True&id=21290&emailAddress=';
				
				$.ajax({
					type: 'POST',
					url: '/servlet/submitLifeCoverCalcQuote.do',
					async: true,
					data: parms,
					beforeSend: beforeQuoteAjax,
					success: successQuoteAjaxLC,
					error: errorQuoteAjax,
					timeout: 200000
				});
		}
}
function lifeLongQuote()
{
		if (validateInputs())
		{
			var parms ='quickQuoteId=lifeLong&productId=23&coverTypeCd=L&jointLife=False&dateOfBirth1Day='+dobDay+'&dateOfBirth1Month='+dobMonth+'&dateOfBirth1Year='+dobYear+'&sexCd1='+sexValues+'&smokerCd1='+smokeValues+'&lifeCoverAmt='+coverValue+'&frequencyCd=M&indexation=False&conversion=True&id=21290&emailAddress=';
			$.ajax({
				type: 'POST',
				url: '/servlet/submitLifeCoverCalcQuote.do',
				async: true,
				data: parms,
				beforeSend: beforeQuoteAjax,
				success: successQuoteAjaxLC,
				error: errorQuoteAjax,
				timeout: 200000
			});
		}
}

function beforeQuoteAjax(response)
{
	$('#campaignLifeCoverQuoteResultHolder').removeClass('hidden');
	$('#campaignLifeCoverDefault').addClass('hidden');
	$('#campaignLifeCoverQuoteEmail').addClass('hidden');
	$('#campaignLifeCoverQuoteResult').html('<div class="loading" style="top:0px !important;"><img height="50" src="/uploadedImages/retail/img/loading.gif" width="49" /><br />Loading...</div>');
}

function successQuoteAjaxMP(response)
{
		successQuoteAjax(response);
	$('#campaignLifeCoverQuoteResult').html('<p><br/>Mortgage Protection of &euro;'+lc+'<br/><br/> <span class="orangeColor">&euro;'+prmLev+'</span> per month</p>');			
}

function successQuoteAjaxLC(response)
{
		successQuoteAjax(response);
	$('#campaignLifeCoverQuoteResult').html('<p><br/>Life Cover of &euro;'+lc+'<br/><br/> <span class="orangeColor">&euro;'+prmLev+'</span> per month</p>');			
}

function successQuoteAjax(response)
{
	r = ""+response;
	partsArray = r.split('&');

	lc = partsArray[0].split('=');
	lc = parseInt(lc[1]);
	lc = lc.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			
	prem = partsArray[2].split('=');
	prem = prem[1];
			
	prmLev = partsArray[3].split('=');
	//prmLev = parseInt(prmLev[1]).toFixed(2);
	prmLev = prmLev[1];
			
	lev = partsArray[4].split('=');
	lev = lev[1];

	
	$('#LifeCoverCallback').removeClass('hidden');
			
	_gaq.push(['_trackPageview','/life-assurance/quote-received.html']);
			
	window.location.hash="results"; 
			
}

function errorQuoteAjax()
{
	$('#campaignLifeCoverQuoteResult').html('<div class="FRMessage">There is an error with your submission. Please contact us directly at <b>customerservice@irishlife.ie</b>.</div>');
}
		
		
function validateInputs()
{
		var valid = true;
		
		 coverValue = $( "#weightResult" ).html().replace(/,/g,'');
		 sexValues = $("#sex").val();
		 smokeValues = $("#smoke").val();
		// inflationValues = $("#inflation").val();
		 ageValues = $("#age").val();
		
		 dobDay = $("#dobDay").val();
		 dobMonth = $("#dobMonth").val();
		 dobYear = $("#dobYear").val();
		
		if (dobMonth == 4 ||dobMonth == 6 ||dobMonth == 9 ||dobMonth == 11)
		{
			if (dobDay >30)
			{
			$("#campaignQuoteError").html("Sorry there is an error with your birthday");
			valid=false;
			}
		}
		if (dobMonth == 2)
		{
			if (dobDay >28)
			{
				if (dobDay == 29)
				{
					if((dobYear%4) != 0)
					{
						$("#campaignQuoteError").html("Sorry there is an error with your birthday");
						valid=false;
					}
				}
				else
				{
					$("#campaignQuoteError").html("Sorry there is an error with your birthday");
					valid=false;
				}
			}
		}
		if (valid == true)
		{		
			$("#campaignQuoteError").html("");
			term = $("#term").val();			
			dob=dobYear+dobMonth+dobDay;
			year=Number(dob.substr(0,4));
			month=Number(dob.substr(4,2))-1;
			day=Number(dob.substr(6,2));
			today=new Date();
			age=today.getFullYear()-year;
			if(today.getMonth()<month || (today.getMonth()==month && today.getDate()<day)){age--;}

			termcheck = parseInt(term)+parseInt(age);
			
			if(termcheck>85)
			{			
			$("#campaignQuoteError").html("The term of your cover is too big. Reduce how long you would like cover for.");
			valid=false;
			}
		}
		return valid;
}
