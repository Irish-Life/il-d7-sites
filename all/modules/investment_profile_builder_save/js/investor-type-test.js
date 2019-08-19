/*if ($( "#region-fund-page-content-top" ).html())
{
  $( "#region-fund-page-content-top" ).html($( "#region-fund-page-content-top" ).html().replace("You are a E","You are an E"));
  $( "#region-fund-page-content-top" ).html($( "#region-fund-page-content-top" ).html().replace("You are a A","You are an A"));
  $( "#region-fund-page-content-top" ).html($( "#region-fund-page-content-top" ).html().replace("you are a <b>E","you are an <b>E"));
  $( "#region-fund-page-content-top" ).html($( "#region-fund-page-content-top" ).html().replace("you are a <b>A","you are an <b>A"));
}*/
var buildUrl;
var isTestCompleted=false;

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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
	}
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires+";path=/";
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
}
jQuery(document).ready(function($) {
	
	if(localStorage.invDataStored != null) {
	   localStorageRetrieve();
	}

if (gup('utm_medium').toUpperCase() == 'CPC')
{
	$('body').css('background-image','none');
}

isTestCompleted=(getCookie('userInvestmentResults') != '');

$('.hasDoneTest').css('display',isTestCompleted?'block':'none');
$('.notDoneTest').css('display',isTestCompleted?'none':'block');

var originalRating = getCookie( 'investorType');

if (originalRating == '1')
{
	$('#investorTypeDesc').html('a safety first investor');
}
else if (originalRating == '2')
{
	$('investorTypeDesc').html('a careful investor');
}
else if (originalRating == '3')
{
	$('#investorTypeDesc').html('a conservative investor');
}
else if (originalRating == '4')
{
	$('#investorTypeDesc').html('a balanced investor');
}
else if (originalRating == '5')
{
	$('#investorTypeDesc').html('an experienced investor');
}
else if (originalRating == '6')
{
	$('#investorTypeDesc').html('an adventurous investor');
}
else if (originalRating == '7')
{
	$('#investorTypeDesc').html('a very adventurous investor');
}


var rating = originalRating;
if (rating == '7') rating = '6';
$('#mapRating').html(rating);
$('#match-your-fund').click(function(){
	if (rating == '1')
	{
		
		window.location.href='/investments/investor-type-test/funds/investing-is-not-for-you?c=3';
		
	}
	else if (rating == '2')
	{
	
		window.location.href='/investments/investor-type-test/funds/investing-may-not-be-for-you?c=3';
		
	}
	else
	{
		$('#save-bar').fadeIn('slow');
		window.location.href='/investments/investor-type-test/funds/multi-asset-portfolio-fund-'+rating+'?c=3';
		
	}
	
	
});

$('#range-of-returns').click(function(){
	window.location.href='/investments/investor-type-test/range/multi-asset-portfolio-fund-'+rating+'?c=3';
});

$('#finish-get-report').click(function(){
	//window.location.href='/investments/investor-type-test/result/email?c=3&source=ipb';
	
	/*
	build report URL and open
	*/
	 var c = JSON.parse( getCookie( 'userInvestmentResults' ) ); //current storage
	  var buildURL = "z="+c.q1+"&x="+c.q2+"&c="+c.q3+"&v="+c.q4+"&b="+c.q5+"&n="+c.q6+"&m="+c.q7+"&a="+c.q8+"&s="+c.q9+"&d="+c.q10+
	  "&f="+c.q11+"&g="+c.q12+"&h="+c.q13+"&j="+c.q14+"&k="+c.q15+"&re="+c.currentScore;
	  
	  window.open("/investments/investor-profile-builder/pdf/?"+buildURL,"_blank");
});

$('#go-back-a-step').click(function(){
	window.history.back();
});
	$('.menu li').each(function(idx) {
		if ($(this).text() == originalRating)
		{
			$(this).addClass('highlightArrow');
		}
		
		if (!isNaN($(this).text()) && Number($(this).text()) >= 1 
		&& Number($(this).text()) <= 7)
		{			
			$(this).find('a').attr("href",$(this).find('a').attr("href") + "?c=2&source=ipb");
		}		
	});
//associate lead for investor profile
/*
name
email
profile result string
userInvestmentResults
*/
$('#email-the-pdf-report').click(function(){

var name=$('#emailPDFName').val();
var email = $('#emailPDFEmail').val();
var buildURL;

var valid = true;

if (name == null || name.length < 3)
{
	alert('Enter a valid name');
	valid = false;
}

if (valid) {
	var x = email;
	var atpos = x.indexOf("@");
	var dotpos = x.lastIndexOf(".");
	if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
		alert("Enter a valid e-mail address");
	   valid = false;
	}
}


	if(getCookie('userInvestmentResults') && valid){
		var firstName = name.split(" ")[0];
		var lastName = name.split(" ").length >= 2? name.substr(name.indexOf(" ")+1): "";
	  var c = JSON.parse( getCookie( 'userInvestmentResults' ) ); //current storage
	  var buildURL = "z="+c.q1+"&x="+c.q2+"&c="+c.q3+"&v="+c.q4+"&b="+c.q5+"&n="+c.q6+"&m="+c.q7+"&a="+c.q8+"&s="+c.q9+"&d="+c.q10+
	  "&f="+c.q11+"&g="+c.q12+"&h="+c.q13+"&j="+c.q14+"&k="+c.q15+"&re="+c.currentScore;
		
		var hash = getHash(key+email);
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: email,'Permissions-Email':false,
		LastName: lastName,
		FirstName: firstName,
		investorReport: buildURL,
		LastGACampaignNameVisit:gaCampaign,
		OriginalGACampaignVisit:gaCampaign,
		LastGAMedium: gaMedium,
		OriginalGAMedium: gaMedium,	
		LeadSource: 'Investor Type Test Report Email',
		LeadSourceDetail: 'Investor Type Test Report Email'},hash);
		mkVisitWebPage('/investor-profile-send-report-email');
		try{
			//tag manager
			dataLayer.push({
			  'event':'pageview',
			  'pageTitle':'Investor Test Report Email Sent',
			  'virtualURL':'/investments/investor-type-test/result/email/sent'
			  });		
			}
			catch(err){
			  //Do nothing
			}
		$('#emailFirstName').html(firstName);
		$('#sendTheEmailInputs').hide();
		$('.emailThePDF').hide();
		$('#sendTheEmailThankYou').fadeIn();
	}    
});

/*
 ======================= =======================  =======================  =======================
                                                                             SAVE & RETRIEVE QUOTE  // MOBILE LOGIN                                                                      
 ======================= =======================  =======================  =======================
*/   
  
//WHEN SAVE IS CLICKED BUILD UP A STRING AND SEND IT TO JOE	
function savingQuote() {	

       getCookie('userInvestmentResults');
	   
				var firstName = name.split(" ")[0];
				var lastName = name.split(" ").length >= 2? name.substr(name.indexOf(" ")+1): "";
			    var c = JSON.parse( getCookie( 'userInvestmentResults' ) ); //current storage
			    /* var buildURL = "z="+c.q1+"&x="+c.q2+"&c="+c.q3+"&v="+c.q4+"&b="+c.q5+"&n="+c.q6+"&m="+c.q7+"&a="+c.q8+"&s="+c.q9+"&d="+c.q10+
	            "&f="+c.q11+"&g="+c.q12+"&h="+c.q13+"&j="+c.q14+"&k="+c.q15+"&re="+c.currentScore; */
				var buildURL = "z="+c.q1+"%26x="+c.q2+"%26c="+c.q3+"%26v="+c.q4+"%26b="+c.q5+"%26n="+c.q6+"%26m="+c.q7+"%26a="+c.q8+"%26s="+c.q9+"%26d="+c.q10+
	            "%26f="+c.q11+"%26g="+c.q12+"%26h="+c.q13+"%26j="+c.q14+"%26k="+c.q15+"%26re="+c.currentScore; 
 
				var pdfURL = "https://www.irishlife.ie/investments/investor-profile-builder/pdf/"+buildURL;
				
				 //build up the string
				 var saveQuote = "typeOfQuote=20&quoteData=Type=InvestmentTest" +
				 ' - ' + pdfURL +
				 ' - '   + originalRating;
		
    $.ajax({
	type: "GET",
	url: "/myonlineservices/ClientB2CQuotes/StoreQuote?"+saveQuote,
	async: true,
	success: function(response){
		setGAPageView(window.location.pathname+'/quote-saved','Investor Type Teest Quote Saved');	
		setSCamPageView(window.location.pathname+'/quote-saved');
		//show saved message
		// what has joes url sent back?
			////console.log("response is " + response);
			////console.log("Quote Data being sent is=" + saveQuote);
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

function localStorageSave() {
	
	////console.log('Saving to local storage');
	
		localStorage.invDataStored = 'true';
		
		localStorage.URL= buildURL;
		
}

function localStorageRetrieve() {
	////console.log('Retrieving from local storage');
	amILoggedIn = true;
	////console.log('Logged In is' + loggedIn);
	
	    buildURL = localStorage.URL;
		 
		  $('#save-bar').fadeIn('slow');		
}

$("#save-go").click(function() {
	
		if (amILoggedIn == true) {
			savingQuote();
		}
		else
		{
			$('#save-bar').fadeOut('slow');
			$('#need-login-bar').fadeIn('slow');
		}
 });
 
 $("#refresh-go").click(function() {
 location.reload(true);
 });

$("#login-register").click(function()  {
	localStorageSave();
});

$('#login-mobile').click(function(){
	$('#login-area').slideDown(function() {
		$(".modal-frame").attr("src", "/myonlineservices/account/login1modal");
		$('#login-area .html-modal .card .card-login-body #login-form #email').focus();
	});	
	localStorageSave();
});

$('#signup-mobile').click(function(){
	$('#login-area').slideDown(function() {
		$(".modal-frame").attr("src", "/myonlineservices/account/login1modal#SignUp");
		$('#need-login-bar').hide();
	    $('#refresh-bar').show();
	});	
	localStorageSave();
});

$('#sign-up').click(function(){
	$('#need-login-bar').hide();
	$('#refresh-bar').show();
})


$('.close-login').click(function(){
	$('#login-area').slideUp();
	localStorage.clear();
});

});