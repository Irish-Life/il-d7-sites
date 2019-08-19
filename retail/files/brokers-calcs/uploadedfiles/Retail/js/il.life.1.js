
$(document).ready(function(){
	$('#tabs').removeClass('hidden');
	$('#tabsSpinner').addClass('hidden');
	}
); 

var simpleQuoteAmt=100000;
   $( "#weightSlider" ).slider({
   range:"min",animate: true,value:100,min: 50,max: 500,step: 5,
   slide: function( event, ui ) {
   $( "#weightResult" ).html( "&euro;"+ ui.value+",000" );
   simpleQuoteAmt = ui.value*1000;
   }
  });
  
  $( "#weightResult" ).html( "&euro;100,000" );

$( "#simpleLifeCoverButton" ).click(function(event) {
		
		var coverValue = simpleQuoteAmt;
		var sexValues = $("#sex").val();
		var smokeValues = $("#smoke").val();
		var ageValues = $("#age").val();
		
		var dobDay = $("#dobDay").val();
		var dobMonth = $("#dobMonth").val();
		var dobYear = $("#dobYear").val();
		
		var dobOK = true;
		if (dobMonth == 4 ||dobMonth == 6 ||dobMonth == 9 ||dobMonth == 11)
		{
			if (dobDay >30)
			{
			$("#campaignQuoteError").html("Sorry there is an error with your birthday");
			
					dobOK = false;
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
						
						dobOK = false;
					}
				
				}
				else
				{
				
						$("#campaignQuoteError").html("Sorry there is an error with your birthday");
						dobOK = false;
				}
			}
		}
		if (dobOK == true)
		{
		
			$("#campaignQuoteError").html("");

			var term = $("#term").val();
			
			var dob=dobYear+dobMonth+dobDay;
			var year=Number(dob.substr(0,4));
			var month=Number(dob.substr(4,2))-1;
			var day=Number(dob.substr(6,2));
			var today=new Date();
			var age=today.getFullYear()-year;
			if(today.getMonth()<month || (today.getMonth()==month && today.getDate()<day)){age--;}

			termcheck = parseInt(term)+parseInt(age);
			
			if(termcheck>85)
			{
			
			$("#campaignQuoteError").html("The term of your cover is too big. Reduce how long you would like cover for.");
			}
			else
			{
			// alert(dobOK);
				
				var parms ='campaign=Y&quickQuoteId=lifeTermSum&productId=19&coverTypeCd=L&jointLife=False&dateOfBirth1Day='+dobDay+'&dateOfBirth1Month='+dobMonth+'&dateOfBirth1Year='+dobYear+'&sexCd1='+sexValues+'&smokerCd1='+smokeValues+'&lifeCoverAmt='+coverValue+'&frequencyCd=M&term='+term+'&indexation=False&conversion=True&id=21290&emailAddress=';
				
				

					$.ajax({
						type: 'POST',
						url: '/servlet/submitLifeCoverCalcQuote.do',
						async: true,
						data: parms,
						beforeSend: beforeQuickQuoteAjax,
						success: successQuickQuoteAjax,
						error: errorQuickQuoteAjax,
						timeout: 200000
					});
				}
			}
			return false;
		});
  
	
		function closeInstantQuote(){
			$('#instantQuoteContent').removeClass('hidden');
			$('#instantQuoteResult').addClass('hidden');
		}

		function beforeQuickQuoteAjax(response)
		{
			$('#instantQuoteContent').addClass('hidden');
			$('#instantQuoteResult').removeClass('hidden');
			$('#instantQuoteResult').html('<div class="loading"><img height="50" src="/uploadedImages/retail/img/loading.gif" width="49" /><br />Loading Quote...</div>');
		}

		function successQuickQuoteAjax(response)
		{
		
			 // alert(response);
			var lc, sic, prem, prmLev, lev;
			var r = ""+response;
			var partsArray = r.split('&');
			
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

			$('#instantQuoteResult').html('<a class="instantQuoteClose" href="javascript:closeInstantQuote();"></a><h2>Life Cover Quote</h2><br/><br/>You pay just <span class="orangeColor">&euro;'+prmLev+'</span> per month<br/><br/><br/>Life Cover of &euro;'+lc+'<div class="instantQuoteCallback section"><h2>Life Cover - Don\'t leave it much longer</h2>If life cover is something you need then keep things moving now you\'ve started. We can call you at a time and date that suits you to discuss this quote and get your plan in place, giving you peace of mind for the future.<br/><br/>So, tell us when it suits you to chat about your life cover and we\'ll do the rest.<br/><br/><span id="quoteCallbackHolder"><b>Name:</b><br/><input type="text" id="qqname" /><br/><b>Phone:</b><br/><input type="text" id="qqphone" /><br/><b>Email:</b><br/><input type="text" id="qqemail" /><br/><b>Preferred Contact Time:</b><br/><input type="text" id="qqtime" /><br/><button id="instantQuoteSubmitButton" onclick="sendAdvisorCallback()"></button></span></div><div class="clear"></div></div>');
			

			$('#campaignLifeCoverQuoteEmail').removeClass('hidden');
			$('#campaignLifeCoverCallback').removeClass('hidden');
			
			_gaq.push(['_trackPageview','/protection/quote-received.html']);
			
			//window.location.hash="results"; 
			
		}

		function errorQuickQuoteAjax()
		{
			$('#campaignLifeCoverQuoteResult').html('<div class="FRMessage">There is an error with your submission. Please contact us directly at <b>customerservice@irishlife.ie</b>.</div>');
		}
		
  
  
		function sendAdvisorCallback(){
					if ($('#qqname').val().length<=3 || $('#qqphone').val().length<=4 )
					{
						alert("Please ensure you have filled in your 'Name' and 'Phone Number' fields correctly.");
					}
					else
					{
					var parms = 'name='+ $('#qqname').val() + '&phone=' + $("#qqphone").val() + '&question=Cover:'+simpleQuoteAmt+'&contacttime='+$('#qqtime').val()+'\nEmail: '+$('#qqemail').val();
				
						$.ajax({
							type: 'POST',
							url: '/servlet/submitCallback.do',
							async: true,
							data: parms,
							beforeSend: beforeSAC,
							success: successSAC,
							error: errorSAC,
							timeout: 200000
						});
						if(_gaq){
						//_gaq.push(['_trackEvent','Click to callback','Advisor callback - Quick Quote']);
						//_gaq.push(['_trackPageview','/advice/callback-requested.html']); 
						}
					}
		
		}
  
  function beforeSAC(){
  $('#quoteCallbackHolder').html('<br/><img height="50" src="http://ildev.internal.irishlife.ie:8080/uploadedImages/retail/img/loading.gif" width="49" /><br />Loading...');
  }
  function successSAC(){
  
  $('#quoteCallbackHolder').html('<br/><b>Your details have been submitted!!<br/>An advisor will be in contact soon. Thank you.</b>');
  }
  function errorSAC(){
  $('#quoteCallbackHolder').html('<br/>There seems to have been a system error. Please try again later.');
  }