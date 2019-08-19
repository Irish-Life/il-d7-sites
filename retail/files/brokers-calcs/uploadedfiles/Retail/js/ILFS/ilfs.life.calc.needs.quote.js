var proceed = true;
var altQuote=false;
var mortProtQuote=false;
var timestamp=0;
var product;
var errorTextVal;
var genderChecked, smokerChecked, inflationChecked, p1CoverChecked, p1InflationChecked;

/* THIS IS FOR SETTING UP THE ERROR MESSAGES WHEN A USER
 HAS ENTERED INVALID DATA OR THE QUOTES ARE NOT CORRECT
 FOR SOME REASON. 
 if the JS variable called 'quoteParent' exisits on a page then we specifiy
 the specific error else just use generic.*/
 
if((typeof quoteParent != 'undefined')){
	if( quoteParent == 'aib' ||  quoteParent == 'AIB' ){
		errorTextVal = "We could not obtain a quote for you given the information entered." +
		" Please contact your AIB Financial Advisor.<br/>Thank you.";
	}
	else if ( quoteParent == 'ila' ||  quoteParent == 'ILA' ) {
		errorTextVal = "We could not obtain a quote for you given the information entered." +
		"Please contact your Irish Life Financial Advisor.<br/>Thank you.";
	}
	else{
		errorTextVal = "We could not obtain a quote for you given the information entered." +
		" Please contact your Financial Advisor.<br/>Thank you.";
	}	
}
else {
	errorTextVal = "We could not obtain a quote for you given the information entered." + 
	" Please contact your Financial Advisor.<br/>Thank you.";
}
	
$(document).ready(function () {
	
	// This piece of code checks the variable campaignComplianceTrigger on a campaign page.
	// If the variable exists and is true then the compliance code is displayed as the first 
	// page of the process. 
	if((typeof campaignComplianceTrigger != 'undefined') && (campaignComplianceTrigger)){
		$("#progressBoxCompliance").fadeIn('800');	
	}
	else{
		;
	}
	
    _gaq.push(['_trackPageview','/life-assurance/quote-started']);
	mkVisitWebPage('/life-assurance/quote-started');
	
});


// listen for a click event on the compliance screen of the page if it is being displayed
$('#progressStepCompliance').click(function(){
	$("#progressBoxCompliance").fadeOut('500', function(){
		$("#progressBoxStep1").fadeIn('800');
	});

	$('#tracking').html('<iframe src="https://1459025.fls.doubleclick.net/activityi;src=1459025;type=gende506;cat=gende428;ord=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
	var trackpageurl = window.location.pathname;
	_gaq.push(['_trackPageview',trackpageurl+'#pageCompliance']);
	mkVisitWebPage(trackpageurl+'#pageCompliance');
});

	
$('#progressStep1').click(function(){
	$("#progressBoxStep2").fadeOut('500', function(){
		$("#progressBoxStep1").fadeIn('800');
		$("#loadingbox").hide();
	});
											
	$("#LifeInsuranceMarker").animate({ left: "74px"}, 800, function() {
		$("#lifeInsuranceComplete").removeClass('s2');
		$("#lifeInsuranceComplete").removeClass('s3');
		$("#lifeInsuranceComplete").addClass('s1');
	});
});
 
var secondPersonAddedLifeCoverProgress = false;
var quoteType,coverValue,numYears,p1gender,p1smoker,p1dob,p1dobday,
p1dobmonth,p1dobyear,p2dob,p2gender,p2smoker,p2dobday,p2dobmonth,p2dobyear;

// Go to the quote results process for a sum assured system
$('#progressStep2').click(function(){

	$("#progressBoxStep1").fadeOut('500', function(){
		$("#progressBoxStep2").fadeIn('800');
		$("#loadingbox").hide();
	});
	
	$("#LifeInsuranceMarker").animate({ left: "283px"}, 800, function() {
		$("#lifeInsuranceComplete").removeClass('s1');
		$("#lifeInsuranceComplete").removeClass('s3');
		$("#lifeInsuranceComplete").addClass('s2');
	});
	
	//setTimeout( successLifeProcessCalcAjax, 400);
});

function checkDOB(dobDay,dobMonth,dobYear){
	var dobOK = true;
	if (dobMonth == 4 ||dobMonth == 6 ||dobMonth == 9 ||dobMonth == 11){
		if (dobDay >30){
			dobOK = false;
		}
	}
	if ( dobMonth == 2 ) {
		if ( dobDay >28 ) {
			if ( dobDay == 29 ) {
				if( ( dobYear % 4 ) != 0) {
					dobOK = false;
				}
			}
			else {
				dobOK = false;
			}
		}
	}
	return dobOK;
}

/*This function sets all the values for the left hand side results on the third screen*/

function setValues() {	
	$(".coverType").html("Single life cover");
	$(".dob").html($("#day").val() +"/"+ $("#month").val() +"/" + $("#year").val());
	$(".smoker").html(smokerChecked);
	$(".term").html(userTerm);
	$(".recommendedSumAssured").html("\u20AC" + addCommas(userSumAssured));
	$(".inflation").html(p1InflationChecked);
	$(".cover").html(p1CoverChecked);
}

function proceedWithQuote(quoteBase){
// sum assured or premium based?
	if ( proceed ) {
		p1smoker = getCheckedRadio("smokingFirst");

		coverValue = userSumAssured;
		p1dobday = $("#day").val();
		p1dobmonth = $("#month").val();
		p1dobyear = $("#year").val();
		
		var inflation = getCheckedRadio("inflation");
		var isCovered = getCheckedRadio("cover");
			
		p1dob = checkDOB(p1dobday,p1dobmonth,p1dobyear);
		
		if ( p1dob == true ) {
			var year = Number(p1dobyear);
			var month = Number(p1dobmonth);
			var day = Number(p1dobday);
			var today = new Date();
			
			termcheck = parseInt(userTerm) + parseInt(userAge);
			
			if (termcheck > 85){	
				p1dob = false;
			}
		}
		else {
			$("#progressError").html("There is an error with your date of birth. Please update and then try again.<br/>");
		}
		
		if ( p1dob ) {
			
			$("#progressError").html("");
			var params;
			// This is the default and it is for Life Term Cover

			params = "quickQuoteId=lifeTermSum&productId=19&coverTypeCd=L"+
			"&jointLife=False" +
			"&dateOfBirth1Day=" + p1dobday +
			"&dateOfBirth1Month=" + p1dobmonth +
			"&dateOfBirth1Year=" + p1dobyear +
			"&sexCd1=M" +
			"&smokerCd1=" + p1smoker +
			"&lifeCoverAmt=" + coverValue +
			"&term=" + userTerm+
			"&indexation="+ inflation + //this is the inflation
			"&frequencyCd=M" +
			"&conversion="+isCovered+""; //this is the gauranteed cover again
			
			log (params);
			
			/*www.irishlife.ie/servlet/submitLifeCoverCalcQuote.do?quickQuoteId=lifeMortgage&productId=19
			&coverTypeCd=L&jointLife=True&dateOfBirth1Day=1&dateOfBirth1Month=4&dateOfBirth1Year=1975&
			sexCd1=M&smokerCd1=Y&dateOfBirth2Day=1&dateOfBirth2Month=4&dateOfBirth2Year=1975&sexCd2=M&
			smokerCd2=N&lifeCoverAmt=500000&frequencyCd=M&term=25*/
			
			$.ajax({
				type: 'GET',
				url: '/servlet/submitLifeCoverCalcQuote.do',
				async: true,
				data: params,
				beforeSend: beforeLifeProcessCalcAjax,
				success: successLifeProcessCalcAjax,
				error: errorLifeProcessCalcAjax,
				timeout: 200000
			});
		}
		else {
			$("#progressError").html("<br />"+errorTextVal);
		}	
	}	
}


function beforeLifeProcessCalcAjax(){
	$("#progressError").html("");
}
var prmLev;


function successLifeProcessCalcAjax(response){

	var lc, sic, prem, lev, fee, pEsc1, pOptE1, pGtdC1, pIndx1, r;
	
	r = "" + response;
	log(r);
	
	if ( r.indexOf('error') > -1 ) {
		setTimeout( errorLifeProcessCalcAjax, 1000);
	}
	else {
		
		var partsArray = new Array("","","","");
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
		
		/* This is a new section for the extra CPC quote breakdown*/
		
		
		fee = partsArray[5].split('=');
		fee = fee[1];
		
		pEsc1 = partsArray[6].split('=');
		pEsc1 = pEsc1[1];
		
		pOptE1 = partsArray[7].split('=');
		pOptE1 = pOptE1[1];
		
		pGtdC1 = partsArray[8].split('=');
		pGtdC1 = pGtdC1[1];
		
		pIndx1 = partsArray[9].split('=');
		pIndx1 = pIndx1[1];
		
		//##############################	
		inflationChecked = getCheckedRadio("inflation");	
		coverChecked = getCheckedRadio("cover");
		
		log("lc = " + lc );
		log("prem = " + prem );
		log("prmLev = " + prmLev );
		log("fee = " + fee );
		log("lev = " + lev );
		log("pEsc1 = " + pEsc1 );
		log("pOptE1 = " + pOptE1 );
		log("pGtdC1 = " + pGtdC1 );
		log("pIndx1 = " + pIndx1 );
		
		
		setTimeout(
			function() { 
			
				var quoteBreakdownDetails1="";
				var quoteBreakdownDetails2="";
				var quoteBreakdownDetails3="";
				var quoteBreakdownDetails4="";
				var quoteBreakdownDetails5="";

			$("#loadingbox").fadeOut('500', function(){
				$("#progressBoxStep3").fadeIn('800');
				$("#loadingbox").hide();
				var parseprmLev = parseInt(prmLev*100)/100;
				
				$('.monthlyPrem').html("\u20AC" + parseprmLev);		
				$('.progressQuote').html("\u20AC" + parseprmLev.toFixed(2));
				$('.progressLifeCoverYears').html(""+$("#term").val());
				
				
				var detailGender1, detailSmoker1;
				detailGender1 = userAge;
				
				// This is a check because the breakdown doesn't come down for everything -
				// such as the mortgage protection quote
				var costLifeCoverBreak = (parseInt(pOptE1*100)/100).toFixed(2);
				var costLifeCoverBreakFlag = false;
				
				if (costLifeCoverBreak==0){
					costLifeCoverBreak = (prem-(parseInt(fee*100)/100)).toFixed(2);
					costLifeCoverBreakFlag = true;
				}
				if (quoteType=="sumassured"){
					quoteBreakdownDetails1 = "Cost of Life insurance: \u20AC" +costLifeCoverBreak;
					log("hibuddy");
				}
				else{
					var minus = parseFloat(pIndx1) + parseFloat(pGtdC1);
					
					quoteBreakdownDetails1 = "Cost of Life insurance: \u20AC"+( parseFloat(parseprmLev - minus -lev -fee).toFixed(2));
					coverValue = lc;
				}
				
				quoteBreakdownDetails2 = "Policy Fee: \u20AC"+(parseInt(fee*100)/100).toFixed(2);
				
				quoteBreakdownDetails3 = "Government Levy: \u20AC"+(parseInt(lev*100)/100).toFixed(2);				
				
				if (pIndx1 > 0){
					quoteBreakdownDetails4 ="Cost of Inflation protection: \u20AC"+ (parseInt(pIndx1*100)/100).toFixed(2);
				}
				
				if (pGtdC1 > 0 ){
					quoteBreakdownDetails5 = "Cost of Guaranteed cover: \u20AC"+ (parseInt(pGtdC1*100)/100).toFixed(2);
				}
				
				$('#quoteBreakdownButton').attr("toolTip",quoteBreakdownDetails1+ " <br />" + quoteBreakdownDetails2 + "<br /> " + quoteBreakdownDetails3
				+ "<br /> " + quoteBreakdownDetails4 + "<br /> " + quoteBreakdownDetails5);
				
				
				
				if (p1gender=="M"){
					detailGender1 = detailGender1 + " year old";
				}
				
				if (p1smoker=="Y"){
					detailSmoker1 = "does";
					smokerChecked = "Yes";
				}
				else{
					detailSmoker1 = "does not";
					smokerChecked = "No";
				}
				
				if(coverChecked == "True"){
					p1CoverChecked = "Yes";
				}
				else{
					p1CoverChecked = "No";
				}
				
				if(inflationChecked =="True"){
					detailInflation = " ";
					p1InflationChecked = "Yes"
				}
				else{
					detailInflation = " don't";
					p1InflationChecked = "No"
				}
					
				
				
				$("#progressLifeCoverDetails").html( 
				"<p>In order to take out life assurance valued at <span class='boldspan'> \u20AC"+ 
				addCommas(userSumAssured) + "</span>" + ", the premium you should pay is <span class='boldspan'> \u20AC"
				+ parseprmLev.toFixed(2) + "</span>" + ", paid on a monthly basis, over <span class='boldspan'> "
				+ userTerm + "</span>"+ " years, where your contributions" 
				+ detailInflation + " increase with inflation.</p>" 
				+ "<p>This quote would include the option to switch to another policy at a later stage. This quote includes the 1% Government levy.</p>");

												
				if (( parseprmLev * 2)>50){
					$('#progressCampaignQuoteEntitled').html("&euro;"+(parseprmLev*2).toFixed(2));
				}
				else{
					$('#progressCampaignQuoteEntitled').html("&euro;50");
				}
					
				setValues();
				
				$("#LifeInsuranceMarker").animate({ 
					left: "487px"}, 800, function() {
						$("#lifeInsuranceComplete").removeClass('s3');
						$("#lifeInsuranceComplete").removeClass('s1');
						$("#lifeInsuranceComplete").addClass('s3');
				})	
			});}, 
			1000
		);
	}
	
	_gaq.push(['_trackPageview','/life-assurance/quote-completed']);
	mkVisitWebPage('/life-assurance/quote-completed-lifeneeds');

	document.cookie ='JSESSIONID=xxxxxxxx; expires=Fri, 3 Aug 2001 20:47:11 UTC; path=/';	
	
}
			


function errorLifeProcessCalcAjax(response){
	$('#firstScreenError').show();
	$("#sliderBubble").show();
	
	$("#progressBoxStep2").fadeOut('500', function(){
		$("#progressBoxStep1").fadeIn('800');
		$("#loadingbox").hide();
	});
												
	$("#LifeInsuranceMarker").animate({ left: "74px"}, 800, function() {
		$("#lifeInsuranceComplete").removeClass('s2');
		$("#lifeInsuranceComplete").removeClass('s3');
		$("#lifeInsuranceComplete").addClass('s1');
	});
	
	
  
	$("#progressError").html("<br />"+errorTextVal);
}

$('#progressStep2backNatural').click(function(){
	$("#progressBoxStep3").fadeOut('500', function(){
		$("#progressBoxStep2").fadeIn('800');
		$("#loadingbox").hide();
	});
	
	$("#LifeInsuranceMarker").animate({ 
	left: "283px"}, 800, function() {
		$("#lifeInsuranceComplete").removeClass('s3');
		$("#lifeInsuranceComplete").removeClass('s1');
		$("#lifeInsuranceComplete").addClass('s2');
	});  
});

$('#progressStep4backTo1').click(function(){

	$("#progressBoxStep4").fadeOut('500', function(){
		$("#progressBoxStep1").fadeIn('800');
		$("#loadingbox").hide();
	});
	
	$("#LifeInsuranceMarker").animate({ left: "74px"}, 800, function() {
		$("#lifeInsuranceComplete").removeClass('s2');
		$("#lifeInsuranceComplete").removeClass('s3');
		$("#lifeInsuranceComplete").addClass('s1');
	});  
});

$('#progressStep3').click(function(){
	var a = document.getElementById("recommendedTerm");		
	if(RSATermPicked == true || a.options[a.selectedIndex].value != 0){	
		$("#progressBoxStep2").fadeOut('500', function(){
			$("#loadingbox").show();
		});
		proceedWithQuote("sumassured");
	}
	else{
		$('#SecondScreenError').show();
	}
});

$('#progressStep4').click(function(){
	$("#progressBoxStep3").fadeOut('500', function(){
		$("#progressBoxStep4").fadeIn('800');
	});
});

$('#progressStep3back').click(function(){
	$("#progressBoxStep2").fadeOut('500', function(){
		$("#progressBoxStep3").fadeIn('800');
	});
	$("#LifeInsuranceMarker").animate({ left: "283px"}, 800, function() {
		$("#lifeInsuranceComplete").removeClass('s1');
		$("#lifeInsuranceComplete").removeClass('s2');
		$("#lifeInsuranceComplete").addClass('s3');
	}); 
});


function be(){
	$("#progressBoxStep4").hide();
	$("#loadingbox").show();
}

function se(){	
	$("#loadingbox").fadeOut('800', function(){
		$("#progressBoxStep5").fadeIn('800');
		$("#loadingbox").hide();
	});
}

function ee(){
	log("Ajax request fail");
}

$('#progressStep5').click(function(){
var extraInforForEmail;

timestamp=Number(new Date());
	
	extraInforForEmail = 
		"\n\nCover Amount: " + coverValue +
		"\nTerm: " + userTerm + " years"+
		
		"\n\n####PERSON ONE DETAILS####"+
		"\nGender: " + p1gender +
		"\nSmoker: " + p1smoker +
		"\nDate of Birth: " + p1dobday + "/" + p1dobmonth + "/" + p1dobyear +
		"\n\n#### QUOTE ####\nEuro: " + prmLev;
	
	extraInforForEmail = extraInforForEmail + "\n\n#### IMPORTANT ####\nThis quote is valid for 7 days.";

	if ($("#progressPhone").val().length >=7) {
		$('#lifeInsurancePhoneError').hide();
		var titleextra = "Term Assurance";
		var trackpageurl = window.location.pathname;
		
		if(typeof product != 'undefined'){  
			if (product=="wholeoflife"){ 
				titleextra = "Whole of Life";
			} 
			else if (product=="mortgageprotection"){ 
				titleextra = "Mortgage Protection";
			}
		}
		
		var emailAddress = 'N/A';
		if ($("#progressEmail").val()){
			emailAddress=$("#progressEmail").val();
		}
		
		sendClickToCallback (
			'Q',
			''+$("#progressName").val(),
			''+$("#progressPhone").val(),
			emailAddress,
			''+$('#progressCalltime').val(),
			titleextra+' - PROCESS COMPLETE (time: '+timestamp+')',
			extraInforForEmail,
			be,
			se,
			ee
		);
	
	
		if ($("#progressEmail").val()){
			if (secondPersonAddedLifeCoverProgress ==true){
				mkAssociateLeadWithQuote('NULL', ''+$("#progressName").val(), emailAddress, ''+$("#progressPhone").val(), quoteType, numYears, prmLev,coverValue,p1gender,p2gender,getAge(p1dobyear,p1dobmonth,p1dobday),getAge(p2dobyear,p2dobmonth,p2dobday),p1smoker,p2smoker,''+$('#progressCalltime').val());				
			}
			else {
				mkAssociateLeadWithQuote('NULL', ''+$("#progressName").val(), emailAddress, ''+$("#progressPhone").val(), quoteType, numYears, prmLev,coverValue,p1gender,'NULL',getAge(p1dobyear,p1dobmonth,p1dobday),'NULL',p1smoker,'NULL',''+$('#progressCalltime').val());	
			}
		}
		
		if (_gaq) {
			_gaq.push(['_trackEvent','Click to callback', 'Times',$('#progressCalltime').val()]);  		
			_gaq.push(['_trackPageview',trackpageurl+'#callback']);
			mkVisitWebPage(trackpageurl+'#callback');
		}
	}
	else {
			$('#lifeInsurancePhoneError').show();
	}
});

$("#sendAdvisorCallbackRHSForm").click(function(){
 var a="none";
 
	 if($("#callbackRHSTopic").val()){
		a=$("#callbackRHSTopic").val()
	 }
	 
	 if($("#callbackRHSPhone").val().length>=7) {
		
		var b="Click To Callback";
		var c="N/A";
		var d=window.location.pathname;
		
		if(	$("#callbackRHSEmail").val()){
			c=$("#callbackRHSEmail").val()
		}	
		sendClickToCallback("G",""+$("#callbackRHSName").val(),""+$("#callbackRHSPhone").val(),c,""+$("#callbackRHSCalltime").val(),b+" - PROCESS COMPLETE",a,beClickTalkRHS,seClickTalkRHS,eeClickTalkRHS);
		if($("#callbackRHSID").val()=="life")
		{
			_gaq.push(["_trackPageview","/life-assurance/callback-requested-RHS"]);
			mkVisitWebPage('/life-assurance/callback-requested-RHS');
			applyTracking("general");
		}
		
		else if($("#callbackRHSID").val()=="incomeprotection")
		{
			_gaq.push(["_trackPageview","/income-protection/callback-requested-RHS"]);
			mkVisitWebPage('/income-protection/callback-requested-RHS');
			applyTracking("general");
		}
		else
		{
			_gaq.push(["_trackPageview","/pension-calculator/callback-requested-RHS"]);
			mkVisitWebPage('/pension-calculator/callback-requested-RHS');
			applyTracking("pensions");
			
		}
		
	}
	else
	{
		alert("Please enter a valid PHONE NUMBER.")
	}
});

