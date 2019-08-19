var quoteType = "T";
var premURL = false;
var quoteIdPresent = false;
var jointLife;
(function($){
	
	//GOOGLE ANALYTICS AND SESSIONCAM DATA
	
	setGAPageViewQuoteStarted = function(){
		setGAPageView('/life-assurance/quote-started','Quote started');
	}

	setGAPageViewQuoteCompleted = function(){
		setGAPageView('/life-assurance/quote-completed','Quote completed');
	}
	
	setGAPageView = function(p,t){
		try{
		//tag manager
		dataLayer.push({
			'event':'pageview',
			'pageTitle':t,
			'virtualURL':p
			});		
		}
		catch(err){
			//Do nothing
		}
		//return "user set";
	}

	setSCamPageView = function(p){
			try{
			//session cam call
			if(window.sessionCamRecorder) {
				if(window.sessionCamRecorder.createVirtualPageLoad)
				window.sessionCamRecorder.createVirtualPageLoad(p);
			}
				}
				catch(err){
					//Do nothing
				}
		//return "user set";
	}

	/*------------------------------------*/	
	
//REMOVE THE SAVE QUOTE STUFF FOR BANK SITES
var ulsterBank = '/life-insurance/term-life-insurance-quote/ub';
var aib = '/life-insurance/term-life-insurance-quote/aib';
var ptsb = '/life-insurance/term-life-insurance-quote/ptsb';
var bankSite;
if(document.location.pathname == ulsterBank || document.location.pathname == aib || document.location.pathname == ptsb) {
		bankSite = true;
	}
	
	else {
		bankSite =false;
	}


/*Rangeslider*/

$("input[type='range']").rangeslider({
    polyfill : false,
    onInit : function() {
		this.output = $( "#cover-required-output" ).insertAfter( this.$range ).html( this.$element.val() );
		
        //this.output = $( '<div id="cover-amount-output" val="" />' ).insertAfter( this.$range ).html( this.$element.val() );
    },
    onSlide : function( position, value ) {
      this.output.html( value );
		                var dvText = $('#cover-required-output').text();
                $('#cover-required-output').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));

    }
});
	
/*jquery show and hide stuff*/

/* window.onbeforeunload = function() {
    localStorage.clear();
}; */

//CLEAR LOCAL STORAGE AFTER 3 MINUTES
	var expired;
	 var lastclear = localStorage.getItem('ilfslastclear'),
      timeNow  = (new Date()).getTime();

	  // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
	  if ((timeNow - lastclear) > 180000) {
		  //console.log('Local Storage expired');
		  expired = true;
		   localStorage.clear();
	  };


$(document).ready(function(){
	
	if(localStorage.ilfsDataStored != null && amILoggedIn) {
	localStorageRetrieve();}
	
	if (gup('quoteId') != '')
	{
		var quoteId = gup('quoteId');
		retrieveQuote(quoteId);
		quoteIdPresent = true;
		$("#quote-screen-1").hide(1000);
		$("#progress-bar").show( 1000 );
		$("#quote-screen-2").show( 1000 );
		$("#smoker-no-p1").addClass("selected green-button");
		$("#remove-person").hide( 1000 );
		$("#two-people").hide();
		$("#second-person").hide();
		$("#progress-details").addClass("active");
		$("#progress-quote").off("click").css({'cursor' :"default"});
		$("#progress-contact").off("click").css({'cursor' :"default"});
	}
	
	
	//depending on the url set the quote type
	var isBlineWholeLife = (window.location.href.indexOf("bline") > -1 && window.location.href.indexOf("whole-") > -1);
    var currentPage = window.location.pathname;

	    if (~currentPage.indexOf('/premium/')){
			premURL = true;
		}

	    if (~currentPage.indexOf('long') || ~currentPage.indexOf('whole')){
			quoteType = "W";
			$('.term-input').hide();
			$('.term-header').css("visibility", "hidden");
			$('.product-name').html("Whole of Life");
			$('.term-life-intro, .mortgage-protection-intro').hide();
		}
		else if (~currentPage.indexOf('mortgage')){
			quoteType = "M";
			$('.product-name').html("Mortgage Protection");
			$('.term-life-intro, .whole-life-intro').hide();
		} else{
			quoteType = "T";
			$('.product-name').html("Term Life");
			$('.mortgage-protection-intro, .whole-life-intro').hide();
		}

/*vvvvvvvvvvvvvvvvvvv<<navigation behaviour for progress bar>>vvvvvvvvvvvvvvvvvvvvvvvvvvvvv*/	
	
	$("#progress-details, #edit-quote").click(function(){
		$("#quote-screen-1").hide();
		$("#progress-bar").show(1000);
		$("#quote-screen-2").show(1000);
		$("#quote-screen-3").hide(1000);
		$("#quote-screen-4").hide(1000);
		$("#quote-screen-5").hide(1000);
		$("#progress-details").addClass("active");
		$('#need-login-bar').hide();
		$('#save-bar').hide();
	});
	
	$("#progress-quote").click(function(){
		$("#quote-screen-3").show(1000);
		$("#quote-screen-1").hide();
		$("#quote-screen-2").hide(1000);
		$("#quote-screen-4").hide(1000);
		$("#quote-screen-5").hide(1000);
		$("#progress-quote").addClass("active");
			
	});
	
	$("#progress-contact").click(function(){
		$("#quote-screen-3").hide(1000);
		$("#quote-screen-4").show(1000);
		$("#quote-screen-5").hide(1000);
		$("#progress-contact").addClass("active");
		$("#progress-details").removeClass("active").on("click").css({'cursor':"pointer"});
		$("#progress-quote").removeClass("active").on("click").css({'cursor':"pointer"});
	});
/*^^^^^^^^^^^^^^^^^^^^^^^^<<navigation behaviour for progress bar>>^^^^^^^^^^^^^^^^^^^^^^^^^^^*/	

$('.edit-quote-options').click(function(){
    setGAPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-2','Your Quote - From Options');	
});

$('.edit-quote-callback').click(function(){
    setGAPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-2','Your Quote - From Callback');	
});

/*<<<<<<<<<<<<<<<<<<Get started link>>>>>>>>>>>>>>>>>>>>>*/		
	$("#term-start-button").click(function(){
		$("#quote-screen-1").hide(1000);
		$("#progress-bar").show( 1000 );
		$("#quote-screen-2").show( 1000 );
		$("#smoker-no-p1").addClass("selected green-button");
		$("#remove-person").hide( 1000 );
		$("#two-people").hide();
		$("#second-person").hide();
		$("#progress-details").addClass("active");
		$("#progress-quote").off("click").css({'cursor' :"default"});
		$("#progress-contact").off("click").css({'cursor' :"default"});
		setGAPageView(window.location.pathname+'/'+quoteType+"-"+'life-insurance-quote-step-1','Your Details Page');	
		setGAPageViewQuoteStarted();
		setSCamPageView(window.location.pathname+'/'+quoteType);
	});

/*<<<<<<<<<<<<<<<<<<Add person>>>>>>>>>>>>>>>>>>>>>*/		
	$("#add-person, #new-user").click(function(){
		$("#two-people").show( 1000 );
		$("#second-person").show( 1000 ).addClass("visible");
		$('#smoker-no-p2').addClass("selected green-button");
		$("#add-person").hide( 1000 );
		$("#new-user").hide( );
		$("#remove-person").show( 1000 );
		$("#just-you").hide( 1000 );			
	});

/*<<<<<<<<<<<<<<<<<<Remove person>>>>>>>>>>>>>>>>>>>>>*/		
	$("#remove-person, #close-user").click(function(){
		$("#two-people").hide( 1000 );
		$("#just-you").show( 1000 );
		$("#second-person").hide( 1000 ).removeClass("visible");
		$("#remove-person").hide( 1000 );
		$("#add-person").show( 1000 );
		$("#new-user").show( );
		$("#person-2-age").val("");
		$('.age-1-warning').addClass("hidden");
		$('.age-2-warning').addClass("hidden");
	});

	
/*<<<<<<<<<<<<<<<<<<Check for Smoker>>>>>>>>>>>>>>>>>>>>>*/	


/*<<<<<<<<<<<<<<<<<<Get Quote>>>>>>>>>>>>>>>>>>>>>*/	
function removeCommaFromNumber(numberIn) {
                var a=numberIn;
                a=a.replace(/\,/g,''); // 1125, but a string, so convert it to number
                a=parseInt(a,10);
                return a;
}

	$("#get-quote-button").click(function(){
		coverAmount = $('#cover-required-output').html();
		coverAmountNoComma = removeCommaFromNumber($('#cover-required-output').html());
		numYears = $('#number').val();
		agePerson1 = $('#person-1-age').val();
		agePerson2 = $('#person-2-age').val();
		p1smoker = $('#smoker-yes-p1').hasClass("selected");
		var smokerNoP1 = $('#smoker-no-p1').hasClass("selected");
		p2smoker = $('#smoker-yes-p2').hasClass("selected");
		var smokerNoP2 = $('#smoker-no-p2').hasClass("selected");
		maxYears1 = (parseInt(agePerson1) + parseInt(numYears))
		maxYears2 = (parseInt(agePerson2) + parseInt(numYears))
		 
		
		
		//Display warning if no age is entered
		if(agePerson1 == null || agePerson1 == ""){
					$('.age-1-warning').removeClass("hidden");
					return false;
					}
			//If the second person is visible and input is empty		
		if ($("#second-person").hasClass("visible")) {
			if(agePerson2 == null || agePerson2 == ""){
						$('.age-2-warning').removeClass("hidden");
						return false;
						}
		}
		
		//if the age + the term is over 80 display warning, this takes into account 5 years as selected in the input first
		if (maxYears1 >= 81){
			$('.term-length-warning-1').removeClass("hidden");
				return false;
		}
			else{
				$('.term-length-warning-1').addClass("hidden");
			}
			
		if (maxYears2 >= 81){
			$('.term-length-warning-2').removeClass("hidden");
				return false;
		}
			else{
				$('.term-length-warning-2').addClass("hidden");
			}
		

		performQuotes(Number(removeCommaFromNumber(coverAmount)), numYears, agePerson1, agePerson2, p1smoker, p2smoker, 1);
		performQuotes(Number(removeCommaFromNumber(coverAmount))+50000, numYears, agePerson1, agePerson2, p1smoker, p2smoker, 2);
		performQuotes(Number(removeCommaFromNumber(coverAmount))+100000, numYears, agePerson1, agePerson2, p1smoker, p2smoker, 3);
		
		
		
		$("#quote-screen-2").hide(1000);
		$("#quote-screen-3").show(1000);
		$("#progress-details").removeClass("active");
		$("#progress-quote").addClass("active");
		$("#progress-contact").off("click").css({'cursor' :"default"});
		if(amILoggedIn && bankSite == false) {
		$('#save-bar').fadeIn('slow');
		//console.log('logged in and not on bank');
		}
		
		else if(amILoggedIn && bankSite == true) {
			$('#save-bar').hide();
			//console.log('logged in and are on bank');
		}
		
		else if(!amILoggedIn && bankSite == true) {
			//console.log('not logged in and are on bank');
			$('#need-login-bar').hide();
		}
		else {
			$('#need-login-bar').fadeIn('slow');
			//console.log('not logged in and not on bank');
		}
		
		// Add a pageview into google analytics
		setGAPageView(window.location.pathname+'/life-insurance-quote-step-2','Get Quote'); 
		setSCamPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-2');
	});
	
		//make sure warnings do not display if age is entered
		$('#person-1-age').on("input change", function() {
			$(".age-1-warning").addClass("hidden");
		});
		
		$('#person-2-age').on("input change", function() {
			$(".age-2-warning").addClass("hidden");
		});
		
		//make sure warnings do not display if smoker is selected
		$('#smoker-yes-p1').click( function( event ) {
			$(".smoker-1-warning").addClass("hidden");
		});
		$('#smoker-yes-p2').click( function( event ) {
			$(".smoker-2-warning").addClass("hidden");
		});
		
	
	//Perform the quotes
	function performQuotes (coverValue, numYears, age1, age2,  p1smoker,  p2smoker, whichQuote) {
		
			var headID = document.getElementsByTagName("head")[0];
			var newScript = document.createElement('script');
			var params;
			//Calculate DOB
			var currentDate = new Date();
			var dobday = currentDate.getDate();
			var dobmonth = currentDate.getMonth() + 1;
			var currentyear = currentDate.getFullYear();
			//Check if Joint Life
			jointLife = (age2 != null && age2!="")?true:false;
			newScript.type = 'text/javascript';
			newScript.onload = function(){quoteResults(whichQuote)};
			
			var quoteTypeParms = "";
			
			if (quoteType == 'T')
			{
				quoteTypeParms = 'quickQuoteId=lifeTermSum&productId=19';
			}
			else if (quoteType == 'M')
			{
				quoteTypeParms = 'quickQuoteId=lifeMortgage&productId=16';
			}
			else if (quoteType == 'W')
			{
				quoteTypeParms = 'quickQuoteId=lifeLong&productId=23'
			}
				
			
			
			//Get params and send to script
			params =  quoteTypeParms+"&coverTypeCd=L&indexation=False&frequencyCd=M&conversion=False"+
								"&jointLife="+(jointLife?"True":"False")+
								"&dateOfBirth1Day="+dobday+
								"&dateOfBirth1Month="+dobmonth+
								"&dateOfBirth1Year="+(currentyear-age1)+
								"&sexCd1=M"+
								"&smokerCd1="+((p1smoker == true)?"Y":"N")+
								"&lifeCoverAmt="+coverValue+
								"&term="+numYears;
								
			if (jointLife) //if joint life add these params
			{
				params+=	"&dateOfBirth2Day="+dobday+
								"&dateOfBirth2Month="+dobmonth+
								"&dateOfBirth2Year="+(currentyear-age2)+
								"&sexCd2=M"+
								"&smokerCd2="+((p2smoker==true)?"Y":"N");
			}
			//Old Call
			//newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
			
			//New Call
		    newScript.src = 'https://apps.irishlife.ie/myonlineservices/servlet/LifeCoverQuote/?' + params; // CHANGE TO IRISHLIFE.IE WHEN GOING LIVE
			headID.appendChild(newScript);

//				if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
//					$.getScript('https://www.irishlife.ie/secure/submitLifeQuote.js?' + params, quoteResults);
//				}
		
	}
	
	function errorLifeProcessCalcAjax(response){
		////console.log("an error occurred getting the quote - need to show this on screen if it happens");
		
	}
	
	//Get the quote results
    function quoteResults(whichOne) {
		
		//this executes after quote is retrieved
		//get results and put on screen
		var lifeCover, lc, sic, prem, lev, fee, pEsc1, pEsc2, pOptE1, pOptE2, pGtdC1, pGtdC2, pIndx1, pIndx2;
		var r = ""+result;
			////console.log("r = " + r);
			if (r.indexOf('error') > -1)
			{
				errorLifeProcessCalcAjax(r);

				//$("#progressError").html("<br />"+ errorTextVal);
			}
			else
			{
				var partsArray = new Array("","","","");
				partsArray = r.split('&');
				
				lc = partsArray[0].split('=');
				lc = parseInt(lc[1]);
				lc = lc.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
				
				prem = partsArray[2].split('=');
				prem = prem[1];
				
				prmLev = partsArray[3].split('=');
				prmLev = prmLev[1]; // prem incl levy
				
				lev = partsArray[4].split('=');
				lev = lev[1];

				
				//#################################
				// This is a new section for the extra CPC quote breakdown
				//#################################
				
				fee = partsArray[5].split('=');
				fee = fee[1];
				
				pEsc1 = partsArray[6].split('=');
				pEsc1 = pEsc1[1];
				
				pOptE1 = partsArray[7].split('='); // cost of life cover 1
				pOptE1 = pOptE1[1];
				
				pGtdC1 = partsArray[8].split('=');
				pGtdC1 = pGtdC1[1];
				
				pIndx1 = partsArray[9].split('=');
				pIndx1 = pIndx1[1];
				
				pEsc2 = partsArray[10].split('=');
				pEsc2 = pEsc2[1];
				
				pOptE2 = partsArray[11].split('='); //cost of life cover 2
				pOptE2 = pOptE2[1];
				
				pGtdC2 = partsArray[12].split('=');
				pGtdC2 = pGtdC2[1];
				
				pIndx2 = partsArray[13].split('=');
				pIndx2 = pIndx2[1];
		
				//now put these on the screen depending on which quote it is 
				if (p1smoker==true)
							{
								detailSmoker1 = "does";
							}
							else{
								detailSmoker1 = "does not";
							}
							
				if (p2smoker==true)
							{
								detailSmoker2 = "does";
							}
							else{
								detailSmoker2 = "does not";
							}
				
				if (whichOne == 1)
				{
					//Display Quote 1
					$("#quote-1-amount").html(lc);
					$("#quote-1-premium").html("€"+ prmLev + "/month");
					$("#quote-1-value").html("Life Insurance valued at €" + lc)
					
					if (quoteType == 'W'){
						$("#quote-1-premium-years").html("Premium you pay is €" + prmLev + " per month")
					}else{
					$("#quote-1-premium-years").html("Premium you pay is €" + prmLev + " per month for " + numYears + " years")
					//$("#quote-1-premium-person-1").html("A " + agePerson1 + " year old who " + detailSmoker1 + " smoke")
					}
					if (jointLife==true)
						{
							$("#quote-1-premium-person-1").html("A " + agePerson1 + " year old who " + detailSmoker1 + " smoke")
							$("#quote-1-premium-person-2").html("A " + agePerson2 + " year old who " + detailSmoker2 + " smoke")
							$("#quote-1-premium-person-2").removeClass("hidden")
						}
						else
						{
							$("#quote-1-premium-person-1").html("A " + agePerson1 + " year old who " + detailSmoker1 + " smoke")
								//Hide the second smoker if empty	
							$('#quote-1-premium-person-2').html("")
							$('#quote-1-premium-person-2').addClass("hidden")
						}
						
						
					
					//breakdown for quote 1
					$("#quote-breakdown-1").html(
							"<li>Cost of Life Cover: €" + (Number(pOptE1) + Number(pOptE2)) + "/month</li><li>Irish Life Policy Fee: €" + fee + "</li><li>Government Levy: €" + lev + "</li>"
						)
				}
				else 
				{
					//Display Quote 2 or 3
					$("#quote-"+whichOne+"-amount").html(lc);
					$("#quote-"+whichOne+"-premium").html("€"+ prmLev + "/month");
					$("#quote-breakdown-"+whichOne).html(
							"<li>Cost of Life Cover: €" + (Number(pOptE1) + Number(pOptE2)) + "/month</li><li>Irish Life Policy Fee: €" + fee + "</li><li>Government Levy: €" + lev + "</li>"
						)
					$("#quote-breakdown-"+whichOne).html(
							"<li>Cost of Life Cover: €" + (Number(pOptE1) + Number(pOptE2)) + "/month</li><li>Irish Life Policy Fee: €" + fee + "</li><li>Government Levy: €" + lev + "</li>"
						)
				}
	}	
}
	
/*<<<<<<<<<<<<<<<<<<Links to Contact form>>>>>>>>>>>>>>>>>>>>>*/		
	
	
	$("#quote-button-1").click(function(){
		
		var finalAmount = $('#quote-1-amount').html();
		var monthlyCost = $('#quote-1-premium').html();
		
		$('.total-cost-output').html("€" + finalAmount);
		$('.monthly-cost-output').html(monthlyCost);
		setGAPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-3','Quote 1 Selected'); 
		setSCamPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-3');
		
		$('#save-bar').fadeOut('slow');
		$('#need-login-bar').fadeOut('slow');
		
	});
	
	$("#quote-button-2").click(function(){
	
		var finalAmount = $('#quote-2-amount').html();
		var monthlyCost = $('#quote-2-premium').html();
		
		$('.total-cost-output').html("€" + finalAmount);
		$('.monthly-cost-output').html(monthlyCost);
		setGAPageView(window.location.pathname+'/life-insurance-quote-step-3','Quote 2 Selected'); 
		
		$('#save-bar').fadeOut('slow');
		$('#need-login-bar').fadeOut('slow');
		
	});
	
	$("#quote-button-3").click(function(){
		var finalAmount = $('#quote-3-amount').html();
		var monthlyCost = $('#quote-3-premium').html();
		
		$('.total-cost-output').html("€" + finalAmount);
		$('.monthly-cost-output').html(monthlyCost);
		setGAPageView(window.location.pathname+'/life-insurance-quote-step-3','Quote 3 Selected'); 
		
		$('#save-bar').fadeOut('slow');
		$('#need-login-bar').fadeOut('slow');
		
	});
	
	$(".quote-button-selected").click(function(){
		$("#quote-screen-3").hide(1000);
		$("#quote-screen-4").show(1000);
		$("#progress-quote").removeClass("active");
		$("#progress-contact").addClass("active");
		$("#progress-details").on("click");
		$("#progress-quote").on("click").css({'cursor':"pointer"});
		// Add a pageview into google analytics
		setGAPageView(window.location.pathname+'/life-insurance-quote-step-3','Select Quote'); 
	});
	
/*<<<<<<<<<<<<<<<<<<Links to Contact form>>>>>>>>>>>>>>>>>>>>>*/	

$("#request-callback-button").click(function(){
		//Validate the form
		function isEmail(emailAdd) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(emailAdd);
		}

			var name,emailAdd,phone,before12,from125,after5
   
			z = 0;
			name = $('#contactName').val();
			emailAdd = $('#contactEmail').val();
			phone = $('#contactPhone').val();
			time = "";
			
			if($('#contactBefore12').hasClass('selected')) {
				time = $('#contactBefore12').html();
				$("#callTime").html(time);
			}
			
			if($('#contact12-5').hasClass('selected')) {
				time = $('#contact12-5').html();
				$("#callTime").html(time);
			}
			
			if($('#contactAfter5').hasClass('selected')) {
				time = $('#contactAfter5').html();
				$("#callTime").html(time);
			}
			
			else if (!$('#contactBefore12').hasClass('selected') && !$('#contact12-5').hasClass('selected') && !$('#contactAfter5').hasClass('selected')) {
				time = null;
			}
			
			if(name.length<=3){
				z =z+1;
				$("#contactNameError").fadeIn(1000)
			} else{
				$("#contactNameError").hide();
			}
			
			
			 if(phone.length<=7){
				z =z+1;
				$("#contactPhoneError").fadeIn(1000);
			} else{
				$("#contactPhoneError").hide();
			}
			
			if(isEmail(emailAdd) == false){
				z =z+1;
				$("#contactEmailError").fadeIn(1000);
			}else{
				$("#contactEmailError").hide();
			}
			
			if(time == null) {
				z =z+1;
				$("#contactTimeError").fadeIn(1000);
			}else{
				$("#contactTimeError").hide();
			}
			
		
		if (z==0) {
		
		// no errors
        // send the callback and change the screen
		$("#quote-screen-4").hide(1000);
		$("#quote-screen-5").show(1000);
		$("#progress-quote").removeClass("active");
		$("#progress-contact").addClass("active");
		

			mkAssociateLeadWithQuote(name,'',emailAdd, phone, quoteType, numYears, prmLev, $('.total-cost-output').html(),'','', agePerson1, agePerson2, p1smoker, p2smoker, time);
		}
	
	 //Marketo call
	 
	//mkAssociateLeadOnePlan(name,'',emailAdd, phone, time, 'Life Insurance Quote'

	//mkAssociateLead("NULL", $("#").val(), $("#callbackRHSEmail").val(), $("#callbackRHSPhone").val(), 
			//$("#callbackRHSCalltime").val(), 'New Plan');
	
	
	// Add a pageview into google analytics
    setGAPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-4','Request Callback'); 
	setGAPageViewQuoteCompleted();
	setSCamPageView(window.location.pathname+'/'+quoteType+'/life-insurance-quote-step-4');
	});
	
});





/*<<<<<<<<<<<<<<<<<<Custom Handle for Slider>>>>>>>>>>>>>>>>>>>>>*/


$( function() {
    var handle = $( "#custom-handle" );
	$( "#slider" ).slider({
		range: "min",
      value: 50000,
      min: 1000,
      max: 500000,
	  step: 1000,
      create: function() {
        handle.text( $( this ).slider( "value" ) );
      },
      slide: function( event, ui ) {
        handle.text( ui.value );
		$("#custom-handle").val(addCommas);
      }
    });
				function addCommas(nStr)
			{
				nStr += '';
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? '.' + x[1] : '';
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, '$1' + ',' + '$2');
				}
				return x1 + x2;
			}
  } );
  
  
  
  $( function() {
    $( "#speed" ).selectmenu();
 
    $( "#files" ).selectmenu();
 
    $( "#number" )
      .selectmenu()
      .selectmenu( "menuWidget" )
        .addClass( "overflow" );
 
    $( "#salutation" ).selectmenu();
  } );
  
 /*<<<<<<<<<<<<<<<<<<Activate Green Button for smoker question>>>>>>>>>>>>>>>>>>>>>*/ 
   $( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( ".smoker-button, .call-time-button" ).click( function( event ) {
		if($(this).hasClass("green-button"))
        return false;
      event.preventDefault();
	  $(this).toggleClass("green-button").siblings().removeClass("green-button");
	  $(this).toggleClass("selected").siblings().removeClass("selected");
	
    } );
  } );
  
/*
 ======================= =======================  =======================  =======================
                                                                             SAVE & RETRIEVE QUOTE                                                                            
 ======================= =======================  =======================  =======================
*/   

function removeCommaFromNumber(numberIn) {
                var a=numberIn;
                a=a.replace(/\,/g,''); // 1125, but a string, so convert it to number
                a=parseInt(a,10);
                return a;
}

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
};


function localStorageSave() {
	
	//console.log('Saving to local storage');
	
		localStorage.ilfsDataStored = 'true';
		
		localStorage.setItem('ilfslastclear', timeNow);
		
		localStorage.quote1amount = $('#quote-1-amount').html();
		localStorage.quote1value = $('#quote-1-value').html();
		localStorage.quote1premiumyears = $('#quote-1-premium-years').html();
		localStorage.quote1premiumperson1 = $('#quote-1-premium-person-1').html();
		localStorage.quote1premiumperson2 = $('#quote-1-premium-person-2').html();
		localStorage.quote2amount = $('#quote-2-amount').html();
		localStorage.quote2premium =  $('#quote-2-premium').html();
		localStorage.quote3amount = $('#quote-3-amount').html();
		localStorage.quote3premium =  $('#quote-3-premium').html();
		
		localStorage.monthlyCost = $('#quote-1-premium').html();
		localStorage.yourAge = $('#person-1-age').val();
		localStorage.theTerm = $('#number option:selected').val();
		localStorage.notSmoker = $('#smoker-no-p1').hasClass('selected');
		localStorage.isSmoker = $('#smoker-yes-p1').hasClass('selected');
		if(jointLife) {
			localStorage.amountOfPeople = 2;
		}
		else {
			localStorage.amountOfPeople = 1; 
		}
		localStorage.partnerAge = $('#person-2-age').val();
		localStorage.partnerNotSmoker =  $('#smoker-no-p2').hasClass('selected');
		localStorage.partnerIsSmoker = $('#smoker-yes-p2').hasClass('selected');
		
		localStorage.breakdown1 = $('#breakdown-1').html();
		localStorage.breakdown2 = $('#breakdown-2').html();
		localStorage.breakdown3 = $('#breakdown-3').html();
		
		
}

function localStorageRetrieve() {

	    //console.log('Retrieving from local storage');
		
		$('#quote-screen-1').hide();
		$('#quote-screen-2').hide();
		$('#quote-screen-3').show();
		
	    
		$('#quote-1-amount').html(localStorage.quote1amount);
		$('#quote-1-value').html(localStorage.quote1value);
		$('#quote-1-premium-years').html(localStorage.quote1premiumyears);
		$('#quote-1-premium-person-1').html(localStorage.quote1premiumperson1);
		$('#quote-2-amount').html(localStorage.quote2amount);
		$('#quote-2-premium').html(localStorage.quote2premium);
		$('#quote-3-amount').html(localStorage.quote3amount);
		$('#quote-3-premium').html(localStorage.quote3premium);
		
		if(localStorage.quote1premiumperson2 != '') {
		$('#quote-1-premium-person-2').html(localStorage.quote1premiumperson2);
		jointLife == true;
		//console.log('Joint Life is true');
		     }
		else {
			$('#quote-1-premium-person-2').hide();
			$("#second-person").hide();
			$("#two-people").hide();
			$("#remove-person").hide( 1000 );
			jointLife == false;
			//console.log('Joint Life is false');
		}
		
		$('#quote-1-premium').html(localStorage.monthlyCost);
		$('#person-1-age').val(localStorage.yourAge);
		$('#number option:selected').val(localStorage.theTerm);
		
		if(localStorage.notSmoker === 'true') {
				$('#smoker-yes-p1').removeClass("selected green-button");
				$('#smoker-no-p1').addClass("selected green-button");
			}
				
			else {
				$('#smoker-no-p1').removeClass("selected green-button");
				$('#smoker-yes-p1').addClass("selected green-button");
		}
		
		if(localStorage.amountOfPeople === "2") {
                 $('#person-2-age').val(localStorage.partnerAge);			
			}
			
			if(localStorage.partnerNotSmoker === 'true') {
				$('#smoker-yes-p2').removeClass("selected green-button");
				$('#smoker-no-p2').addClass("selected green-button");
			}
			
			else {
				$('#smoker-no-p2').removeClass("selected green-button");
				$('#smoker-yes-p2').addClass("selected green-button");
			}
			
	   $('#breakdown-1').html(localStorage.breakdown1);
	   $('#breakdown-2').html(localStorage.breakdown2 );
	   $('#breakdown-3').html(localStorage.breakdown3);

        $('#save-bar').fadeIn('slow');			
	
}
  
//WHEN SAVE IS CLICKED BUILD UP A STRING AND SEND IT TO JOE	
function savingQuote() {	
 
        var finalAmount = $('#quote-1-amount').html();
		var monthlyCost = $('#quote-1-premium').html();
		var yourAge = $('#person-1-age').val();
		var theTerm = $('#number option:selected').val();
		var notSmoker = $('#smoker-no-p1').hasClass('selected');
		var isSmoker = $('#smoker-yes-p1').hasClass('selected');
		var amountOfPeople;
		var partnerAge = $('#person-2-age').val();
		var partnerNotSmoker =  $('#smoker-no-p2').hasClass('selected');
		var partnerIsSmoker = $('#smoker-yes-p2').hasClass('selected');

		if(partnerAge != '') {
			//console.log('Joint Life is true');
			amountOfPeople = 2;
		}
		
		else {amountOfPeople = 1; 
		}
		
		var quoteSaveParms = " ";
			
			if (quoteType == 'T')
			{
				quoteSaveParms = 'quickQuoteId=lifeTermSum&productId=19';
				quoteSaveParms = 'typeOfQuote=10&quoteData=Type=TermLife';
			}
			else if (quoteType == 'M')
			{
				quoteTypeParms = 'quickQuoteId=lifeMortgage&productId=16';
				quoteSaveParms = 'typeOfQuote=11&quoteData=Type=MortgageProtect';
			}
			else if (quoteType == 'W')
			{
				quoteTypeParms = 'quickQuoteId=lifeLong&productId=23';
				quoteSaveParms = 'typeOfQuote=12&quoteData=Type=WholeOfLife';
			}

     //build up the string
	 saveQuote = quoteSaveParms +
		 '-' + finalAmount +
		 '-' + monthlyCost +
		 '-' + yourAge +
		 '-' + theTerm +
		 '-' + notSmoker +
		 '-' + isSmoker +
		 '-' + amountOfPeople +
		 '-' + partnerAge +
		 '-' + partnerNotSmoker +
		 '-' + partnerIsSmoker;
		  
	
    $.ajax({
	type: "GET",
	url: "https://apps.irishlife.ie/myonlineservices/ClientB2CQuotes/StoreQuote?"+saveQuote,
	async: true,
	success: function(response){
	setGAPageView(window.location.pathname+'/quote-saved','Life Cover Quick Quote Saved');	
		//show saved message
		// what has joes url sent back?
			////console.log("response is " + response);
			//console.log("Quote Data being sent is=" + saveQuote);
				$('#save-bar').fadeOut('slow');
				$('#quote-saved-bar').fadeIn('slow');
				localStorage.clear();
			/*	function () {
				$(this).delay(5000).fadeOut('slow');
				}); */
			
	
		// also show ID reference
		// if not true then say boo hoo
		// 
	},
	error: function(){alert("error message");},
	timeout: 300000
	});

};

//if logged in and selecting a saved quote get the values from the string and put back into the calculator
function retrieveQuote(quoteId) {
	
	//console.log('retrieving quote ' + quoteId);
	//IF LOGGED IN
	//on page load get VARs 
	
       $.ajax({
        type:'GET',
        url:"https://apps.irishlife.ie/myonlineservices/ClientB2CQuotes/getspecificquotejson?quoteId="+quoteId,		
		//params: saveQuote,
        //data:"'typeOfQuote=30&quoteData=Type=PensionCalc-36000-4500-42-3-4-true-false-75-2'", //saveQuote;
		//beforeSend: be,
        success:function(response) {
            // Create an empty array to store images
			//retrieve quote STATIC FOR NOW
			//var quoteResponse = JSON.parse(response);
			//response = {"SavedQuotes":[{"QuoteIcon":"account.png","QuoteText":"Pension","QuoteUrl":"http://winuatag0437/pensions/pension-calculator","QuoteButtonTxt":"View Quote","QuoteNumber":"QUO-01036-G1S1S7","QuoteType":30,"QuoteString":"Type=PensionCalc-55000-5000-35-5-3-false-true-60-0","ExpiresOn":"\/Date(1490958997000)\/"}]};						
			
			var quoteData = response.SavedQuotes[0].QuoteString;
		
			//console.log("Quote Data coming back is=" + quoteData);
		
			//split returned string
			var partsArray = new Array();
			partsArray = quoteData.split('-');
			
			coverValue = partsArray[1];
			//console.log(coverValue + ' 1 Cover Value');

			premiumPrice = partsArray[2];
			//console.log(premiumPrice + ' 3 Premium you pay');
			
			theAge = partsArray[3];
			//console.log(theAge + ' 4 Your Age');
			
			numYears = partsArray[4];
			//console.log(numYears + ' 2 The Term');
			
			smokerNo = partsArray[5];
			//console.log(smokerNo + ' Does not smoke');
			
			amountOfPeople = partsArray[7];
			//console.log('Amount of people ' + amountOfPeople);
			
			partnerAge = partsArray[8];
			//console.log('Partner age is ' + partnerAge);
			
			partnerNotSmoker = partsArray[9];
			//console.log('Partner is not a smoker ' + partnerNotSmoker);
			
			
			if(smokerNo === 'true') {
				$('#smoker-yes-p1').removeClass("selected green-button");
				$('#smoker-no-p1').addClass("selected green-button");
			}
				
			else {
				$('#smoker-no-p1').removeClass("selected green-button");
				$('#smoker-yes-p1').addClass("selected green-button");
			}
			
			if(amountOfPeople === "2") {
				$('#second-person').show();
                $('#person-2-age').val(partnerAge);				
			}
			
			if(partnerNotSmoker === 'true') {
				$('#smoker-yes-p2').removeClass("selected green-button");
				$('#smoker-no-p2').addClass("selected green-button");
			}
			
			else {
				$('#smoker-no-p2').removeClass("selected green-button");
				$('#smoker-yes-p2').addClass("selected green-button");
			}
			
			$('#cover-required-output').val(coverValue);
			$('#number option:selected').val(numYears).attr('selected','selected');
			$('.ui-selectmenu-text').html(numYears + ' years');
			$('#person-1-age').val(theAge);

		},
    });
	
};

$("#login-register").click(function()  {
	localStorageSave();
	$('#login-modal').modal({
		showClose: false
	})
});


$("#save-go").click(function() {
	
	if (amILoggedIn) {
		savingQuote();
	}
	else
	{
		$('#save-bar').fadeOut('slow');
		$('#need-login-bar').fadeIn('slow');
	}
	
});

$('#sign-up').click(function(){
	$('#need-login-bar').hide();
});

$('.close-save').click(function() {
	$('#save-bar').fadeOut('slow');
	$('#quote-saved-bar').fadeOut('slow');
	$('#need-login-bar').fadeOut('slow');
	localStorage.clear();
});

}(jQuery));

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/
