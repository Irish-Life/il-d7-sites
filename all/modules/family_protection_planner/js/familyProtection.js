var today = new Date();
(function ($) {
//GOOGLE ANALYTICS AND SESSIONCAM DATA
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
            if(window.sessionCamRecorder.createVirtualPageLoad){
            window.sessionCamRecorder.createVirtualPageLoad(p);
        }
		}
			}
			catch(err){
				//Do nothing
			}
	//return "user set";
}

//REMOVE THE SAVE QUOTE STUFF FOR BANK SITES - PUT BACK IN WHEN GOING LIVE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
var bankSite;
if( document.location.href.indexOf('ulsterbank') > -1 || 
    document.location.href.indexOf('ub') > -1 || 
	document.location.href.indexOf('aib') > -1 || 
	document.location.href.indexOf('ptsb') > -1 || 
	document.location.href.indexOf('broker') > -1 ||
	document.location.href.indexOf('permanenttsb') > -1 ) {
		bankSite = true;
	}
	
	else {
		bankSite =false;
	} 
if (bankSite && document.location.href.indexOf('aib') > -1)
{
	$('.quote-next').click(function(){
		window.location = 'https://aib.ie/personal-forms/financialadvisor';
	})
}
var isBrokerVersion = false;
if (document.location.href.indexOf('bline') > -1) //||
//document.location.href.indexOf('broker') >-1)
{
	isBrokerVersion = true;

}

var partnerAdded = false;
var valid = false;

/*the buttons are disabled by default
$(".next").attr('disabled', true);
$(".family-next").attr('disabled', true);
$(".income-next").attr('disabled', true);
$(".existing-next").attr('disabled', true);
*/
if (totalLifeCoverPrem == 0) {
	
	$(".coverText").hide();

};	

function addCommas(nStr) {
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

//Print Your Results 
function printResults() {
    window.print();
}
var releaseBtn=3;
var releasePartnerBtn=3;
$('.printBtn').click(printResults);

//get a paramter
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

$('.nextButton').click(function(){

})

// FUNCTIONS FOR fadeInING THE DIVS 
function letsGo() {
	$("#intro").hide();
	$("#about-you").fadeIn(1000);
	$("#menu").fadeIn(1000);
	
}
// income-next
var incomeNextMax = 3;
function addPartner() {
  partnerAdded = true;
  incomeNextMax = 4;
	$("#partner-fields").removeClass('hidden');
	$("#partner-existing-fields").removeClass('hidden');
	$(".partner-info").removeClass('hidden');
	$(".partnerSlide").removeClass('hidden');
	//$(".quote-box1, .quote-box2, .quote-box3").css('height', 'auto');
	$(".partner").addClass('hidden');
	$('#incomeCirc').trigger('configure', {
    max: incomeNextMax});
	
	$('html,body').animate({
        scrollTop: $("#partner-fields").offset().top},
        'slow');
    
	$('#incomeCirc').trigger('change');
}

function hidePartner() {
	partnerAdded = false;
	incomeNextMax = 3;
	$('html,body').animate({
        scrollTop: $("#marital-status").offset().top},
        'slow');
	$("#partner-fields").addClass('hidden');
	$(".partner-info").addClass('hidden');
	$(".partner").removeClass('hidden');
	$("#partner-existing-fields").addClass('hidden');
	//$(".quote-box").css('height', 'auto');
	$(".partnerSlide").addClass('hidden');
	$('#incomeCirc').trigger('configure', {
    max: incomeNextMax});
    
	$('#incomeCirc').trigger('change');
}



function familyPrev() {
	$("#your-family").hide();
	$("#about-you").fadeIn(1000);
	$("#family p").removeClass('active');
	$("#about p").addClass('active');

}

function familyNext() {
	$("#your-family").hide();
	$("#your-income").fadeIn(1000);
	$("#income").removeClass('locked');
	$("#income p").addClass('active');
	$("#family p").removeClass('active');
	//setGAPageView(window.location.pathname+'/income','Your Income Screen Protection Planner');
	//setSCamPageView(window.location.pathname+'/income');
}


function incomePrev() {
	$("#your-income").addClass('hidden');
	$("#about-you").removeClass('hidden');
	$("#income-menu").removeClass('active');
	$("#about-menu").addClass('active');
			$('html,body').animate({
        scrollTop: $(".steps-menu").offset().top},
        'slow');
}

function incomeNext() {
	
	if(partnerAdded) {
		$('#divider').show()
	} else {
		$('#divider').hide();
	}
	
	if ($('#income-age').val() > 35) {
	$(".warning2").fadeIn(1000);	
	valid =  false;
    }	
	else {
		valid = true;
	}
	
	
	if(valid) {
	$("#your-income").addClass('hidden');
	$("#existing-cover").removeClass('hidden');
	$('#income-menu').removeClass('active');
	$('#existing-menu').addClass('active');
		$('html,body').animate({
        scrollTop: $(".steps-menu").offset().top},
        'slow');
	setGAPageView(window.location.pathname+'/existing-cover','Your Existing Cover Screen Protection Planner');
	setSCamPageView(window.location.pathname+'/existing-cover');
	}
	else {
		$(".warning2").fadeIn(1000);	
	}
}


function existingPrev() {
	$("#existing-cover").addClass('hidden');
	$("#your-income").removeClass('hidden');
	$("#income-menu").addClass('active');
	$("#existing-menu").removeClass('active');
			$('html,body').animate({
        scrollTop: $(".steps-menu").offset().top},
        'slow');
}

function existingNext() {
	
	setGAPageView(window.location.pathname+'/result','Your Results Screen Protection Planner');
	//setGAPageView(window.location.pathname+'/quote-completed','Your Results Screen Protection Planner');
	setGAPageView('/life-assurance/quote-completed','Quote Completed Family Protection Planner');
	setSCamPageView(window.location.pathname+'/results');
	
	if(!partnerAdded) {
		$('.partner-info-table').css('visibility','hidden');
	}
	else {
		
	}
	
	if($('#income-age').val() == '') {
		$('.MortOrrent').html('Rent');
	}
	else {
		$('.MortOrrent').html('Mortgage');
	}
	
	var parAge = $("#partner-age").val();
	var yourAge = $("#about-age").val();
	var yourRel = $('input[name=about-rel]:checked').val();
	var parOcc = $("#partner-occ #occupationSelect2 option:selected").text();
	var yourOcc = $("#occupationSelect1 option:selected").text();
	var netInc = $(".range1").val();
	var parInc = $(".range5").val();
	var morRent = $('.output2').val();
	var childAmt = $("#childNum").val();
	var ageOfChild = $('#family-age').val();
	var hasChildren = false;
	
	if(childAmt != 0) {
		hasChildren = true;
	}
	else {
		hasChildren = false;
	}
	
	$('#ageVal').html(yourAge);	
	$('#parAge').html(parAge);
	$('#relStatus').html(yourRel);	
	$('#paroccupation').html(parOcc);
	$('#occupation').html(yourOcc);	
	$('#netIncome').html('&euro; ' + addCommas(netInc));
	$('#parIncome').html('€ ' + addCommas(parInc));
	$('#morRent').html('&euro; ' + morRent + ' per month');
	
	if(!hasChildren) {
		$('#childAge').html('No children under 25 years old');
	}
	else if(hasChildren && childAmt > 1) {
		$('#childAge').html(childAmt + ' children, youngest aged ' + ageOfChild);
	}
	else if(hasChildren && childAmt == 1) {
		$('#childAge').html(childAmt + ' child, aged ' + ageOfChild);
	}
	
	$("#existing-cover").addClass('hidden');
	$("#your-quote").removeClass('hidden');
	$('.contact-us').hide();
		
		var quoteBox1 = $('.quote-box1').outerHeight();
		var quoteBox2 = $('.quote-box2').outerHeight();
		var quoteBox3 = $('.quote-box3').outerHeight();
	
	if($(window).width() >= 767) {
        $('a.expand').click();
    
	    $('.cost-box1').css('height',quoteBox1+'px');
		$('.cost-box2').css('height',quoteBox2+'px');
		$('.cost-box3').css('height',quoteBox3+'px');
	}
		
			$('html,body').animate({
        scrollTop: $("#your-quote").offset().top},
        'slow');
	
	
	
	/*
     if(amILoggedIn && bankSite == false) {
		//$('#save-bar').fadeIn('slow');
		//$('#login-register').hide();
		////console.log('logged in and not on bank');
		}
		
		else if(amILoggedIn && bankSite == true) {
			//$('#save-bar').hide();
			//$('#login-register').hide();
			////console.log('logged in and are on bank');
		}
		
		else if(!amILoggedIn && bankSite == true) {
			////console.log('not logged in and are on bank');
			//$('#need-login-bar').hide();
			//$('#login-register').hide();
		}
		else {
			$('#need-login-bar').fadeIn('slow');
			////console.log('not logged in and not on bank');
		} */
}


function quotePrev() {
	$(".steps-menu").show();
	if(!bankSite) {
	$('.contact-us').show();
	}
	$("#existing-cover").removeClass('hidden');
	$("#your-quote").addClass('hidden');
	
	
}

function talktoUs() {
	setGAPageView(window.location.pathname+'/callback-form-screen','Talk to Us Callback form Protection Planner');
	setSCamPageView(window.location.pathname+'/callback-form-screen');
	$("#your-quote").addClass('hidden');
	$("#menu").hide();
	$("#callback-screen").removeClass('hidden');
	$('#need-login-bar').hide();
	$('#save-bar').hide();
	$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');
}

function talkPrev() {
	$("#callback-screen").addClass('hidden');
	$("#your-quote").removeClass('hidden');
	
}

///////////////////////////////////////////////////////////////////////////////////

function updateTheOccupationSelected(occupationId,whichOne) {

   parms = "value=" + occupationId.substring(1);
   
	var headID = document.getElementsByTagName("head")[0];
	var newScript = document.createElement('script');
	var params;
	newScript.type = 'text/javascript';
	newScript.onload = function(response){getOccupationClass(response,whichOne);},
	newScript.src = 'https://apps.irishlife.ie/myonlineservices/servlet/OccupationDataDetails?'+parms;
	//newScript.src = 'https://www.irishlife.ie/servlet/occupationData?'+parms;
	headID.appendChild(newScript);
	
	
}

function occupationClassError(whichOne)
{
	  $('#occupationClass'+whichOne).html("1");
	  $('#phiOccClass'+whichOne).html("1");
}

function getOccupationClass(response, whichOne)
{
   try{
	 selectedValue = $('#occupationSelect'+whichOne).val();
	 
	 if(selectedValue != "")
	 {
	  occupation = eval("occupationData." + selectedValue);
	  
	  $('#occupationClass'+whichOne).html(isNaN(occupation.BPY)? 'N':occupation.BPY);
	  $('#phiOccClass'+whichOne).html(isNaN(occupation.PCC)? 'N':occupation.PCC);
	  
	  if(whichOne == "1") {
	  $('#about-age, #about-rel,  #radio1,  #radio2').trigger("change");
	  }
	  
	  else {
	  $("#partner-age, #radio7,  #radio8, #partner-rel").trigger("change");
	  }
	  
	 }
	}
	catch(e)
	{
	 ////console.log(' * error 1');
	}
}

function showSliders() {
	
	if($('#radio-life-ins').is(':checked')) {
		$('.life-ins-slider').removeClass('hidden');
		$('#js-rangeslider-3').show();
	}
	else {
		$('.life-ins-slider').addClass('hidden');
		$('#js-rangeslider-3').hide();
		$('.output3').val('0');
		$('#js-rangeslider-3 .rangeslider__fill').css('width','0');
		$('#js-rangeslider-3 .rangeslider__handle').css('left','0');
	}
	
	if($('#radio-spec-ill').is(':checked')) {
		$('.spec-ill-slider').removeClass('hidden');
	    $('#js-rangeslider-5').show();	
	} 
	else {
		$('.spec-ill-slider').addClass('hidden');
		$('#js-rangeslider-5').hide();
		$('.output4').val('0');
		$('#js-rangeslider-5 .rangeslider__fill').css('width','0');
		$('#js-rangeslider-5 .rangeslider__handle').css('left','0');
	}
	
	if($('#radio-life-ins-partner').is(':checked')) {
		$('.life-ins-slider-partner').removeClass('hidden');
		$('#js-rangeslider-4').show();
	}
	else {
		$('.life-ins-slider-partner').addClass('hidden');
		$('#js-rangeslider-4').hide();
		$('.output6').val('0');
		$('#js-rangeslider-4 .rangeslider__fill').css('width','0');
		$('#js-rangeslider-4 .rangeslider__handle').css('left','0');
	}
	
	if($('#radio-spec-ill-partner').is(':checked')) {
		$('.spec-ill-slider-partner').removeClass('hidden');
	    $('#js-rangeslider-6').show();	
	} 
	else {
		$('.spec-ill-slider-partner').addClass('hidden');
		$('#js-rangeslider-6').hide();
		$('.output7').val('0');
		$('#js-rangeslider-6 .rangeslider__fill').css('width','0');
		$('#js-rangeslider-6 .rangeslider__handle').css('left','0');
	}
}

//CLEAR LOCAL STORAGE AFTER 3 MINUTES
	var expired;
	 var lastclear = localStorage.getItem('fplastclear'),
      timeNow  = (new Date()).getTime();

	  // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
	  if ((timeNow - lastclear) > 180000) {
		  ////console.log('Local Storage expired');
		  expired = true;
		   localStorage.clear();
	  };
	  
function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}	  
	  


// CALLING THE FUNCTIONS 
$( document ).ready(function() {
//$( window ).load(function() {

	
	/*
	$('.deathCost').on('click',function() {
	 $("#death-modal").modal({
	   closeClass: 'fa fa-times',
	   closeText: '',
	   position: {
                        my: "left top", 
                        at: "right top",
                        of: window } 
	 });
	});
	
	$('.illnessCost').click(function() {
	 $("#illness-modal").modal({
	   closeClass: 'fa fa-times',
	   closeText: '',
	    position: {
                        my: "left top", 
                        at: "right top",
                        of: window } 
	 });
	});
	
	$('.specifiedIllness').click(function() {
	 $("#specified-modal").modal({
	   closeClass: 'fa fa-times',
	   closeText: '',
	    position: {
                        my: "left top", 
                        at: "right top",
                        of: window } 
	 });
	});
	*/
	
	$('.close-this').click(function() {
		$.modal.close();
	});
	
	
	$('#childNum').on('change',function() {
		if($('select[name=children]').val() > 0) {
			$('#youngest-child').css('display','inline-block');
		}
		else {
			$('#youngest-child').css('display','none');
		}
	});
	
	
	$('#radio-life-ins, #radio-spec-ill, #radio-life-ins-partner, #radio-spec-ill-partner').on('change',function(){
		showSliders();
	});

	
	if(localStorage.fpDataStored != null && amILoggedIn) {
	localStorageRetrieve();
	$('#login-register').hide();}
	
	$("#start").click(letsGo); //Let's go btn

	$(".partner").click(addPartner); //Add Partner
	$(".close-btn").click(hidePartner); //Hide Partner


	$(".next").click(function(){
	setGAPageView(window.location.pathname+'/your-income','Your Income Screen Protection Planner');
	setSCamPageView(window.location.pathname+'/your-income');
	validateFields();
	if(validateFields() == true) {
	$("#about-you").addClass('hidden');
    $('#your-income').removeClass('hidden');
	$('#about-menu').removeClass('active');
	$('#income-menu').addClass('active');

	$('#about-warning').hide();
		$('html,body').animate({
        scrollTop: $(".steps-menu").offset().top},
        'slow');
	}

	}); // About Page Next 


	$(".family-prev").click(familyPrev); //Your Family Previous
	//$(".family-next").click(familyNext); //Your Family Next 


	$(".income-prev").click(incomePrev); //Your Income Previous
	$(".income-next").click(incomeNext); //Your Income Next


	$(".existing-prev").click(existingPrev); //Existing Cover Previous
	$(".existing-next").click(existingNext); //Existing Cover Next


	$(".quote-prev").click(quotePrev); //Your Quote Previous


	$(".quote-next").click(talktoUs); //Quote screen to callback screen
	$(".callback-prev").click(talkPrev); //Callback screen to Quote screen
	//broker version? PUT BACK IN WHEN GOING LIVE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if(bankSite || isBrokerVersion)
	{		
		$('.help').hide();
		$('.printBtn').removeClass('hidden');
		$('.cta-talk-to-us').hide();
	    $('#page-title').hide();
		$('.contact-us, .quote-next').hide();
		$('.brokerHide').hide();
		$('.changeBroker').removeClass('col-lg-8');
		$('.changeBroker').removeClass('col-sm-8');
		$('.changeBroker').addClass('col-lg-12');
		$('.changeBroker').addClass('col-sm-12');
		$('#about-age').css('height','33px');
		$('#about-age').css('border', '1px solid #ced4da');
	}

	if ($('#lumpsumDeath').text().length > 0) {
	////console.log("The menu is now activated");
	};
	

	//DYNAMICALLY ADD THE OCCUPATIONS LIST
	//update occupationSelect for two people
	var occupationSelectFirst = occupationSelect;
	occupationSelectFirst = occupationSelectFirst.replace("id='occupationSelect'","id='occupationSelect1'");
	occupationSelectFirst = occupationSelectFirst.replace("onchange='selectChange()'","");
	//var newFunctionCallStr1 = "(function ($) {$.updateTheOccupationSelected(document.getElementById(&quot;occupationSelect1&quot;).value,1);})(jQuery);";
	//occupationSelectFirst = occupationSelectFirst.replace("onchange='selectChange()'","onchange='"+newFunctionCallStr1+"'");
	
	
	$('body').on('change','#occupationSelect1',function() {
		updateTheOccupationSelected($('#occupationSelect1').val(),1);
	});
	
	var occupationSelectSecond = occupationSelect;
	occupationSelectSecond = occupationSelectSecond.replace("id='occupationSelect'","id='occupationSelect2'");
	occupationSelectSecond = occupationSelectSecond.replace("onchange='selectChange()'","");
	
	//var newFunctionCallStr2 = "(function ($) {$.updateTheOccupationSelected(document.getElementById(&quot;occupationSelect2&quot;).value,2);})(jQuery);";
	//occupationSelectSecond = occupationSelectSecond.replace("onchange='selectChange()'","onchange='"+newFunctionCallStr2+"'");
	
	$('body').on('change','#occupationSelect2',function() {
		updateTheOccupationSelected($('#occupationSelect2').val(),2);
	});
	
	$('#about-occ').html(occupationSelectFirst);
	$('#partner-occ').html(occupationSelectSecond); 
    //$('#occupationSelect1, #occupationSelect2').addClass('form-control');
	
	//REMOVE CHOSEN ON MOBILE AND TABLETS
	if ($(window).width() > 768) {
		$("#about-occ #occupationSelect1, #partner-occ #occupationSelect2").addClass('chosen-select form-control');
	    //$(".chosen-select").chosen();
	 }
	 else {
		 $("#about-occ #occupationSelect1, #partner-occ #occupationSelect2, #family-age").removeClass('chosen-select');
	 }

	$('#about-rel :first-child').addClass('grey'); 

	
	//ANIMATE THE KNOB
	  
	
	//INCOME 
	var dvText = $('.output1').text();
	$('.output1').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
	;

	$('.range1').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output1' ).insertBefore( this.$range ).html( this.$element.val() );
		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output1').text();
		$('.output1').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
	});

	 //your partner
	var dvText = $('.output5').text();
	$('.output5').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


	$('.range5').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output5' ).insertBefore( this.$range ).html( this.$element.val() );
		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output5').text();
		$('.output5').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")); }
	});
			

	//	Mortgage/rent per month
	$('.range2').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output2' ).insertBefore( this.$range ).html( this.$element.val() );
		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output2').text();
			$('.output2').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});

	//	How much Life Insurance do you currently have
	var dvText = $('.output3').text();
	$('.output3').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


	$('.range3').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output3' ).insertBefore( this.$range ).html( this.$element.val() );

		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output3').text();
			$('.output3').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});

	// How much life insurance does your partner have
	var dvText = $('.output6').text();
	$('.output6').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


	$('.range6').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output6' ).insertBefore( this.$range ).html( this.$element.val() );

		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output6').text();
			$('.output6').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});


	//	How much Specified Illness do you currently have
	var dvText = $('.output4').text();
	$('.output4').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


	$('.range4').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output4' ).insertBefore( this.$range ).html( this.$element.val() );
		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output4').text();
			$('.output4').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});

	//	How much Specified Illness does your partner have
	var dvText = $('.output7').text();
	$('.output7').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));


	$('.range7').rangeslider({
		polyfill : false,
		onInit : function() {
			this.output = $( '.output7' ).insertBefore( this.$range ).html( this.$element.val() );
		},
		onSlide : function( position, value ) {
			this.output.html( value );
			var dvText = $('.output7').text();
			$('.output7').text( dvText.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") );
		}
	});
	
});

//scroll back to top
$('.lifelens-cta').click(function () {
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	$("html, body").animate({
		scrollTop: 50
	}, 600);
	return false;
}
});

$('.lifelens-cta').click(function () {

	$("html, body").animate({
		scrollTop: 100
	}, 600);
	return false;

}); 

$('#childNum').change(function() {
	if($(this).val() == '0'){
		$('#family-age').val('Please Select');
	}
});


//validate on next click

function validateFields() {
	
	//FORM VALIDATION
	var age = $('#about-age').val();
	var relationship = $('input[name=about-rel]:checked').val();
	var occupation = $('#occupationSelect1').val();
	var smoker = $('input[name=radiosSmoker]:checked').val();
		
	var partnerAge = $('#partner-age').val();
	var partnerOccupation = $('#occupationSelect2').val();
	var partnerSmoker = $('input[name=radiosPartner]:checked').val();
	var childNumber = $('#childNum').val();
	var childAge = $('#family-age').val();
	
	if(childNumber != 0 && childAge == null || !childNumber != 0 && childAge == 'please-select') {
		$('.warningChild').fadeIn();
		$('#about-warning').show();
		return false;
	}
	else {
		$('.warningChild').hide();
	}
	
	if(age == null || age == "") {
		$('#age-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else if(age < 18) {
		$('#age-label').css('color','red');
		$('.warning3').show();
		$('#about-warning').show();
		return false
	}
	else {
		$('#age-label').css('color','black');
		$('.warning3').hide();
	}
	
	if(relationship == null || relationship == "") {
		$('#marital-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else {
		$('#marital-label').css('color','black');
	}
	
	if(occupation == null || occupation == "") {
		$('#occ-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else {
		$('#occ-label').css('color','black');
	}
	
	if(smoker == null || smoker == "") {
		$('#smoker-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else {
		$('#smoker-label').css('color','black');
	}
	
	if(partnerAge == '' && partnerAdded) {
		$('#partner-age-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else {
		$('#partner-age-label').css('color','black');
	}
	
	if(partnerOccupation == '' && partnerAdded) {
		$('#partner-occ-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else {
		$('#partner-occ-label').css('color','black');
	}
	
	if(partnerSmoker == "" && partnerAdded) {
		$('#partner-smoke-label').css('color','red');
		$('#about-warning').show();
		return false;
	}
	else {
		$('#partner-smoke-label').css('color','black');
	}
	
	return true;	

}



//PARTNER ABOUT INFO
//#partner-form select, 
$("#partner-form #partner-age, #partner-form #radio7,  #partner-form #radio8, #partner-form #partner-rel").change( function () {
var circleVal = 0;
var circleVal3 = 0;
var maxPartnerCircle=0;


// validation for all ages
if ($("#partner-age").val() >= 18 && $("#partner-age").val() <= 75 ) {
	circleVal++;
	parAge = $("#partner-age").val();
	$('#parAge').html(parAge);
    $(".warning4").hide();
}else
{
  // fadeIn age error
	$(".warning4").fadeIn(1000);	
}


// case 2
if($("#partner-age").val() >= 60 && $("#partner-age").val() < 65)	{
   maxPartnerCircle=2;
	$("#partner-protection").addClass('hidden');
	$('#existingCircPartner').trigger('configure', {
    max: maxPartnerCircle});
}
else if($("#partner-age").val() >= 65 && $("#partner-age").val() <= 75)	{
  maxPartnerCircle=1;
	$("#partner-protection").addClass('hidden');
	$("#partner-spec-existing").addClass('hidden');
	$('.output7, .range7').val('0');
	$('#existingCircPartner').trigger('configure', {
    max: maxPartnerCircle});
}
else {
  maxPartnerCircle=3;
	$("#partner-protection").removeClass('hidden');
	$("#partner-spec-existing").removeClass('hidden');
	//$("#partner-protection").addClass('hidden');
	//$("#partner-spec-existing").addClass('hidden');
	$('.output7, .range7').val('0');
	$('#existingCircPartner').trigger('configure', {
    max: maxPartnerCircle});
}
  releasePartnerBtn = maxPartnerCircle;

/*
if($("#partner-age").val() >= 60 && $("#partner-age").val() < 65)	{
	$("#partner-protection").addClass('hidden');
	$('#existingCircPartner').trigger('configure', {
    max: 2});
}	

else {
	$("#partner-protection").removeClass('hidden');
	$('#existingCircPartner').trigger('configure', {
    max: 3})
}

if($("#partner-age").val() >= 65 && $("#partner-age").val() <= 75)	{
	$("#partner-protection").addClass('hidden');
	$("#partner-spec-existing").addClass('hidden');
	$('.output7, .range7').val('0');
	$('#existingCircPartner').trigger('configure', {
    max: 1});
}

else {
	$("#partner-protection").removeClass('hidden');
	$("#partner-spec-existing").removeClass('hidden');
	$('#existingCircPartner').trigger('configure', {
    max: 3})
}
	
if ($("#partner-age").val() < 18 || $("#partner-age").val() > 75){

    }	

  */
if ($("#partner-rel option:selected").val() > 0) {
	circleVal++;
	parRel = $("#partner-rel option:selected").text();
	$('#parStatus').html(parRel);	
	}

if ($("#partner-occ #occupationSelect2 option:selected").index() > 0) {
	circleVal++;
	parOcc = $("#partner-occ #occupationSelect2 option:selected").text();
	$('#paroccupation').html(parOcc);
	}

if ($("#partner-occ #occupationSelect2 option:selected").val() === 'v10687' ||
    $("#partner-occ #occupationSelect2 option:selected").val() === 'v10700' ||
    $("#partner-occ #occupationSelect2 option:selected").val() === 'v10702') {
    
    $('.output5').html('2,500');
    $('.range5').val(2500);
	$('#js-rangeslider-1').addClass('hidden');
	$('#home-maker-partner').removeClass('hidden');
	circleVal3++;
	
	}	



	
return false;
});

//YOUR FAMILY
var childAge;

//YOUR INCOME


$("#income-age").on('input change', function () {
	
if ($("#income-age").val() >= 0 && $("#income-age").val() <= 35) {
    $(".warning2").hide();
	valid = true;
	}
	
else if ($('#income-age').val() > 35) {
	$(".warning2").fadeIn(1000);
    valid = false;	
    }	
});

//YOUR EXISTING COVER

//PARTNERS EXISTING COVER


///////////////////////////////////////////////////////////////////////////////////

//LOG THE PARTNER INFORMATION


//Done above when partner button functions are called


///////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////

//CHANGE RADIO BUTTONS INSIDE MODAL
$('.btn').click(function() {
  $(this).toggleClass('pressed');
});


////////////////////////////////////////////////////////////////////////////////

//FUNCTIONS TO DO THE CALCULATIONS
var widowsPension = 860;
var widowsPensionWithChild = 129;
var deathMaxAgeEntry = 75;
var deathMaxAgePlusTerm=79;
var sicMaxAgeEntry = 60;
var sicMaxAgePlusTerm=74;
var billPayMaxAgeEntry = 60;
var billPayMaxAgePlusTerm=68;
var billPayMinTerm = 3;
var billPayDefaultPaymentTerm=5;
var minLifeCover = 1000;
var minSic = 500;
var minBillPay = 50;

function removeCommaFromNumber(numberIn)
{
	var a=numberIn;
	a=a.replace(/\,/g,''); // 1125, but a string, so convert it to number
	a=parseInt(a,10);
	return a;
}

var NRA = 68;

function calcBillPayPaymentTerm(term, whichOne) {
	term <=6?term=2:term=billPayDefaultPaymentTerm;
	
	$('.billPayPaymentTerm'+whichOne).html(term);
			
	return term;
}

//Calculate the term
function calcTerm(whichPerson,personAge,maxAge,maxAgePlusTerm, benefitType) {

	var children = $("#childNum").val() > 0;
	var mortgage = ($("#income-age").val() > 0);
	
	if ($("#family-age option:selected").val() != 'please-select') {
	childAge = $("#family-age option:selected").val();
    }

	var term;		
	if (benefitType === 'Life' || benefitType === 'Sic') 
	{
		if (children) {		
			//if youngest >= 18 then term = 68-your age
			if (childAge >= 18)
			{
				term = 68 - (Number(personAge)+1);
			}
			else
			{
				term = 25 - childAge;
			}
		}
		else
		{
			term = Math.min((NRA - (Number(personAge)+1)),20);;
		}
	}	
	else //billcover
	{
		if ( children && childAge < 18 && mortgage) {//children
		term = Math.min(
			Math.max($("#income-age").val(),(25 - childAge)),
			NRA - (Number(personAge)+1));
		}
		else if (children && childAge < 18 && !mortgage)
		{
			term = Math.min((NRA - (Number(personAge)+1)),25 - childAge);
		}
		else if (!children && mortgage)
		{
			term = Math.min($("#income-age").val(),NRA - (Number(personAge)+1));
		}
		else {
			term = Math.min(NRA - (Number(personAge)+1),20);
		}
		
		//check min billpay
		if (benefitType === 'BillPay') {
			term = ((term < 3)?billPayMinTerm:term);
		}

	}

	//check max ages and age plys term
	agePlusTerm = Number(personAge) + Number(term);

	if (personAge > maxAge)
	{
		term = 0;
	}
	else if (agePlusTerm > maxAgePlusTerm)
	{
		term = maxAgePlusTerm - (Number(personAge)+1);
	}
	
	$('.term'+whichPerson+benefitType).html(term + ' years');
	//console.log(term);

	return term;
};

function calculateStateBenefit() {


	var stateBenefit = 0;
	
	$('.widowsPension').html(widowsPension);
	$('.childBenefit').html(widowsPensionWithChild);
	
	//married?
	if ($('input[name=about-rel]:checked').val() === 'Married')
	{
		stateBenefit = widowsPension;
		//console.log(stateBenefit);
			//children?	
		if ($("#childNum").val() > 0)
		{
			var howManyChildren = Number($('#childNum').val());	
			howManyChildren = (howManyChildren > 4 ? 4:howManyChildren);
			var youngest = Number($('#family-age').val());
			howManyChildren = (youngest >=18)?0:howManyChildren;
			stateBenefit += widowsPensionWithChild*howManyChildren;
		}
		$('.stateBenefitDesc').show();
	}
	else
	{
		$('.stateBenefitDesc').hide();
	}
	return stateBenefit;
};	
	

//Calculate the lumpsum on death
function calcDeath(netIncome, existingLifeCover, insertDeathValue, insertIncomeGap, insertMortgage, hideInfo, fadeInMessage, 
hideChart, termVal,twoLives) {
	
	//console.log(existingLifeCover);
	
	//married = state benefit, not married = no state benefit
	var stateBenefit = calculateStateBenefit();
	var mortgagePayment = Number(removeCommaFromNumber($('.output2').html()));
	
	//console.log(stateBenefit);
	
	//no mortgage
	if ($('#income-age').val() == 0)
	{
		mortgagePayment = 0;
	}
	 var sumDeath = 0;	
	 
	 var monthlyGap = Number(removeCommaFromNumber(netIncome)) - stateBenefit - mortgagePayment;
	 var overallTermGap = monthlyGap * 12 * Number(termVal);
	 
	  //if single review, not married and have no children lumpum on death is 0 
	 if($('input[name=about-rel]:checked').val() == 'Single' && !twoLives && $('#childNum').val() == '0') {
		 sumDeath=0;
		 //console.log('not married and have no children ');
	 }
	 else {
		sumDeath = overallTermGap - Number(removeCommaFromNumber(existingLifeCover));
		sumDeath = Math.round(sumDeath);
	 }
	 if (sumDeath > 0 && sumDeath < minLifeCover) {
		sumDeath = minLifeCover;
	 }	 
	 insertDeathValue.html('€' + addCommas(sumDeath));
	 insertIncomeGap.html('€' + addCommas(Math.round(monthlyGap)));
	 insertMortgage.html('€' + $('.output2').html());
	 $('.state-benefit').html('€' + stateBenefit);
	 

	 
	 if ($('#income-age').val() == 0) {
		$('.mid-slice').addClass('hidden');
	 }
	 
	 else {
		$('.mid-slice').removeClass('hidden');
	 }
	 
	
	 
	 
	 //console.log('The existing life cover being calculated for lumpsum on death is ' + addCommas(existingLifeCover));
	 //console.log('The lumpsum on death is ' + addCommas(sumDeath));		

    if (sumDeath <= 0) {
		insertDeathValue.html('');
		hideInfo.addClass('hidden');
		fadeInMessage.removeClass('hidden');
		$('.death-tick').removeClass('fa-check');
		$('.death-tick').addClass('fa-times');
		if($(window).width() >= 768) {
		$('.quote-box1').insertAfter('.quote-box3');
		$('.cost-box1').insertAfter('.cost-box3');
		}
		hideChart.addClass('hidden');
	}	 
	
	else {
		$('.death-tick').removeClass('fa-times');
		$('.death-tick').addClass('fa-check');
		hideInfo.removeClass('hidden');
		fadeInMessage.addClass('hidden');
		hideChart.removeClass('hidden');
	}
	 
	//}
	return sumDeath;

};

//calculate bill pay 
function calcBillPay(existingIncomeProtection,insertBillPayValue, hideInfo, fadeInMessage, whichAge, whichOne, income, proportion, isIP) {
	
	//console.log(existingIncomeProtection);
	
	var billPaySum;
	var billsToPay = 300;
	if (isIP && $('#phiOccClass'+whichOne).html() != 'N' && !existingIncomeProtection && $(whichAge+'age').val() <= 60) 
	{
		billPaySum = Math.round(Number($('.range2').val()) + billsToPay);
	}
	else if(!isIP && $('#occupationClass'+whichOne).html() != 'N' && !existingIncomeProtection && $(whichAge+'age').val() <= 60) 
	{
		
		billPaySum = Math.round(Number($('.range2').val()) + billsToPay);
	}	
	else {
		billPaySum = 0;
	}
	
	billPaySum = Math.round(billPaySum*proportion);
	
	//billPaySum max rules
	// - 40% net monthly income
	// - 2K
	var incomeNum = Number(removeCommaFromNumber(income));
	billPaySum = (billPaySum > incomeNum*0.4)? incomeNum*0.4:billPaySum;
	billPaySum = (billPaySum > 2000)?2000:billPaySum;
	if (billPaySum > 0 && billPaySum < minBillPay)
	{
		billPaySum = minBillPay;
	}
	
	insertBillPayValue.html('€' + addCommas(billPaySum));
	$('#billPayMortgage'+whichOne).html('€' + (billPaySum - Math.round(billsToPay*proportion)));
	$('.bills'+whichOne).html('€'+Math.round(billsToPay*proportion));
	
	if (billPaySum <= 0) {
		$('#billPayMortgage'+whichOne).html('');
		hideInfo.addClass('hidden');
		fadeInMessage.removeClass('hidden');
		$('.income-ill-tick').removeClass('fa-check');
		$('.income-ill-tick').addClass('fa-times');
		if($(window).width() >= 768) {
		$('.quote-box2').insertAfter('.quote-box3');
		$('.cost-box2').insertAfter('.cost-box3');
		}
	}
	
	else {		
	    $('.income-ill-tick').addClass('fa-check');
		$('.income-ill-tick').removeClass('fa-times');
		hideInfo.removeClass('hidden');
		fadeInMessage.addClass('hidden');
		$('#incomeIllBill'+whichOne).html('We will provide €' + billPaySum);
	}
		
	return billPaySum;

};


//Calculate the specified illness
function calcSpecifiedIll(netIncome,existingSpecIllCover,insertSpecIllValue,insertSalary,salary,hideInfo,fadeInMessage,hideChart,whichAge,whichOne) {
	
    var specifiedIllSum = 0;
	var annualSalary = Number(removeCommaFromNumber(netIncome))*12;
	$('.sicAmountCalcDisplay').html('one year\'s');
	
	if($(whichAge+'age').val() >= sicMaxAgeEntry) {
		specifiedIllsum = 0;
	}
	else if($('#occupationClass'+whichOne).html() == 'N') {
		annualSalary = annualSalary*2;
		$('.sicAmountCalcDisplay').html('two years');
		specifiedIllSum = annualSalary - 
		Number(removeCommaFromNumber(existingSpecIllCover));
		$('.illnessSalaryYears'+whichOne).html('two years');
	}
	else {
		specifiedIllSum = annualSalary - 
		Number(removeCommaFromNumber(existingSpecIllCover));
		$('.illnessSalaryYears'+whichOne).html('one year\'s');
	}
	
	specifieldIllSum = Math.round(specifiedIllSum);
	
	if (specifiedIllSum > 0 && specifiedIllSum < minSic)
	{
		specifiedIllSum = minSic;
	}
		
	insertSpecIllValue.html('€' + addCommas(specifiedIllSum));
	insertSalary.html('€' + addCommas(annualSalary));
	
	if (specifiedIllSum <= 0) {
		insertSpecIllValue.html('');
		hideInfo.addClass('hidden');
		fadeInMessage.removeClass('hidden');
		$('.spec-ill-tick').removeClass('fa-check');
		$('.spec-ill-tick').addClass('fa-times');
		hideChart.addClass('hidden');
		
	}
	else {
		hideInfo.removeClass('hidden');
		fadeInMessage.addClass('hidden');
		$('.spec-ill-tick').addClass('fa-check');
		$('.spec-ill-tick').removeClass('fa-times');
	}
	
	
	return specifiedIllSum;

	
};

function isSecondLife()
{
return (($('.range1').val() > 1000 && $('.range5').val() > 1000 && !$("#partner-existing-fields").hasClass('hidden')));
}


//CALL THE FUNCTIONS TO DO CALCULATIONS WHEN GET YOUR RESULT IS CLICKED
$("#result").click(function() {
	
	//console.log('Result was clicked');
	
	$('.steps-menu').hide();
    
    var twoPeople = false;      
    var lifeCover1=150000;
    var lifeCover2=150000;
    var sicCover1=25000;
    var sicCover2=25000;
    var billPayCover1=800;
    var billPayCover2=0;        
    var termVal1Life = calcTerm(1,$('#about-age').val(),deathMaxAgeEntry, deathMaxAgePlusTerm,'Life');
    var termVal1Sic = calcTerm(1,$('#about-age').val(),sicMaxAgeEntry, sicMaxAgePlusTerm, 'Sic');
    var termVal1BillPay = calcTerm(1,$('#about-age').val(),billPayMaxAgeEntry, billPayMaxAgePlusTerm, 'BillPay');
    var termVal2Life = 0;
    var termVal2Sic = 0;
    var termVal2BillPay = 0;
    
    var proportion1 = 1;
    var proportion2=0;
    var twoLives = false;
    if (isSecondLife())
    {
        twoLives = true;
        var income1 = Number(removeCommaFromNumber($('.output1').html()));
        var income2 = Number(removeCommaFromNumber($('.output5').html()));
        var termVal2Life = calcTerm(2,$('#partner-age').val(),deathMaxAgeEntry, deathMaxAgePlusTerm,'Life');
        var termVal2Sic = calcTerm(2,$('#partner-age').val(),sicMaxAgeEntry, sicMaxAgePlusTerm, 'Sic');
        var termVal2BillPay = calcTerm(2,$('#partner-age').val(),billPayMaxAgeEntry, billPayMaxAgePlusTerm,'BillPay');
                
        if ($("#occupationSelect1 option:selected").val() === 'v10687' ||
            $("#occupationSelect1 option:selected").val() === 'v10700' ||
            $("#occupationSelect1 option:selected").val() === 'v10702') {
            income1 = 0;            
        }
        else if ($("#partner-occ #occupationSelect2 option:selected").val() === 'v10687' ||
                 $("#partner-occ #occupationSelect2 option:selected").val() === 'v10700' ||
                 $("#partner-occ #occupationSelect2 option:selected").val() === 'v10702') {
            income2 = 0;
        }
        
        var totalIncome = income1 + income2;        
        
        proportion1=income1/totalIncome;
        proportion2=income2/totalIncome;
    }
    
 
    ////console.log('Calculate for one person');
    lifeCover1=calcDeath($('.output1').html(), (!$(".tick2").is(":checked")?"0":$('.output3').html()), $('#lumpsumDeath'), $('.income-gap'), $('#insert-mortgage'), $('.you-info-death'), $('.ifcovered-message'), $('.your-needs-death'), termVal1Life, twoLives);
    sicCover1=calcSpecifiedIll($('.output1').html(), (!$(".tick3").is(":checked")?"0":$('.output4').html()), $('#specIll'),$('#salary'),$('.output1').html(),$('.you-info-specIll'), $('.ifcovered-message3'), $('.your-needs-specIll'),'#about-',1);
    billPayCover1=calcBillPay($('#radio11').is(':checked'),$(".billPayCover1Amt1"), $('.you-info-billpay'), $('.ifcovered-message2'),'#about-',1,$('.output1').html(), proportion1, isBrokerVersion);
    ////console.log("Your Bill Pay cover is " + billPayCover1);
	//console.log(addCommas(lifeCover1));
	//console.log(sicCover1);
	//console.log(billPayCover1);
	//Death Lump Sum for mobile
	$('#lumpsumDeath-mob').html("€" + addCommas(lifeCover1));
	//SIC Lump Sum for mobile
	$('#specIll-mob').html("€" + addCommas(sicCover1));
	//Bill Pay Lump Sum for mobile
	$('#billPayCover1Amt1-mob').html("€" + addCommas(billPayCover1));
 
    
    //this checks if both you and partner have given an income value
    if (isSecondLife()) {
        ////console.log('Calculate for two people');
        lifeCover2=calcDeath($('.output5').html(), (!$(".tick4").is(":checked")?"0":$('.output6').html()), $('.lumpsumDeathPartner'), $('.income-gap-partner'), $('#insert-mortgage-partner'), $('.partner-info-death'), $('.ifcovered-message-partner'),$('.partner-needs-death'), termVal2Life, twoLives);
        sicCover2=calcSpecifiedIll($('.output5').html(), (!$(".tick5").is(":checked")?"0":$('.output7').html()), $('.specIllPartner'),$('#salary-partner'),$('.output5').html(),$('.partner-info-specIll'), $('.ifcovered-message-partner3'),$('.partner-needs-specIll'),'#partner-',2);
        billPayCover2=calcBillPay($('#radio9').is(':checked'),$(".billPayCover1Amt2"),$('.partner-info-billpay'), $('.ifcovered-message-partner2'),'#partner-', 2,$('.output5').html(),proportion2, isBrokerVersion);
        ////console.log("Your Partners Bill Pay cover is " + billPayCover2);
        twoPeople = true;
    }   
    
    $('.your-billpay-needs').css('display',(billPayCover1 <= 0?'none':'block'));
    $('.partner-billpay-needs').css('display',(billPayCover2 <=0?'none':'block'));
    $('.partner-billpay-explanation').css('display',(isSecondLife()?'block':'none'));
 
    //state benefit
    //income on illness
    //specified illness
    
    if (isBrokerVersion)
    {
        //$('.hideForBline').css('display','none');
        $('.decreasingCover').css('display','none');
        $('.levelTerm').css('display','');
        $('#LTotalPrem').html(0);
        $('#LCoverLevy').html(0);
        $('#LCoverFee').html(0);
        $('#LCoverCost').html(0);
        $('#LSITotalPrem').html(0);
        $('#LSICoverLevy').html(0);
        $('#LSICoverFee').html(0);
        $('#LSICoverCost').html(0);
        $('#IPTotalPrem1').html(0);
        $('#IPCoverLevy1').html(0);
        $('#IPCoverFee1').html(0);
        $('#IPCoverCost1').html(0);
        $('#IPTotalPrem2').html(0);
        $('#IPCoverLevy2').html(0);
        $('#IPCoverFee2').html(0);
        $('#IPCoverCost2').html(0);
            
        
        if (lifeCover1 > 0 || lifeCover2 > 0) getTheBrokerQuote('L',twoPeople, lifeCover1, lifeCover2, termVal1Life, termVal2Life, 1);
        if (sicCover1 > 0 || sicCover2 > 0) getTheBrokerQuote('LSI',twoPeople, sicCover1, sicCover2, termVal1Sic, termVal2Sic,2);
        if (billPayCover1 > 0)
        {
            getTheBrokerQuote('IP',false,billPayCover1,0,65,3);
        }
        else 
        {
            $('#totalBillPayPrem').html("0.00");
        }
        if (twoPeople)
        {
            if (billPayCover2 > 0)
            {
                getTheBrokerQuote('IP',true,billPayCover2,0,65,4);
            }
        }
    }
    else
    {
        $('.decreasingCover').css('display','');
        $('.levelTerm').css('display','none');
        getTheQuote(twoPeople, lifeCover1, sicCover1, billPayCover1, lifeCover2, sicCover2, billPayCover2, termVal1Life, termVal1Sic, termVal1BillPay, termVal2Life, termVal2Sic, termVal2BillPay);
    }
	
	
	
    
});

function getTheBrokerQuote(type, twoPeople, cover1Amt, cover2Amt,  termVal,quoteNum)
{
				
	var headID = document.getElementsByTagName("head")[0];
	var newScript = document.createElement('script');
	var params;
	newScript.type = 'text/javascript';
	newScript.onload = function(){brokerQuoteResults(type,twoPeople,quoteNum)};
	
	params = "";
	
	constantParms = "quickQuoteId="+(type=='IP'?'incomeProtection':'lifeTermSum')+"&productId="+
	(type =='IP'?'24':'19')+"&coverTypeCd="+(type=='IP'?'L':type)+"&indexation=False&frequencyCd=M&conversion=False";
	params += constantParms;
	singleOrJoint = (twoPeople && type != 'IP')?"jointLife=True":"jointLife=False";
	params += "&" + singleOrJoint;
	
	params+= "&term="+termVal;
	
	var age1=$('#about-age').val();
	var dobday = today.getDate();
	var dobMonth = today.getMonth() + 1; //January is 0!
	var dob1Year = today.getFullYear() - age1;
	
	person1="dateOfBirth1Day="+dobday+"&dateOfBirth1Month="+dobMonth+"&dateOfBirth1Year="+dob1Year+"&sexCd1=M&smokerCd1="+($("#radio1").is(":checked")?"Y":"N");
	params += "&" + person1;
	
	if (type == 'L' && cover1Amt > 0)
	{
		lifeCover1="lifeCoverAmt1="+cover1Amt;
		params += "&" + lifeCover1;
	}
	
	if (type=='LSI' && cover1Amt > 0)
	{
		sicCover1="sicCoverAmt1="+cover1Amt;
		params += "&" + sicCover1;
	}
	
	if (type=="IP" && cover1Amt > 0 && $('#phiOccClass1').html() != 'N')
	{
		/*billPay1="billPayAmt1="+billPayCover1Amt+"&billPayTerm1=5&billPayDeferredWeeks1=8&billPayOccupationClassCd1="+
		$('#occupationClass1').html() + "&billPayConversion1=Y";
		params += "&" + billPay1;*/		
		
		params+="&occupationClass="+$('#phiOccClass1').html()+"&deferredWeeks=26&endAge=65&indexation=False&incomeAmt="+(cover1Amt*12)+"&incomeIncreaseRate=5";
	}
	
	lifeCover2="";
	sicCover2="";
	billPay2="";
	person2="";	
	if (twoPeople && type != 'IP')
	{
		var age2 = $('#partner-age').val();
		var dob2Year = today.getFullYear() - age2;
		person2="dateOfBirth2Day="+dobday+"&dateOfBirth2Month="+dobMonth+"&dateOfBirth2Year="+dob2Year+"&sexCd2=M&smokerCd2="+($("#radio7").is(":checked")?"Y":"N");
		params += "&" + person2;
		
		if (type=='L' && cover2Amt > 0)
		{
			lifeCover2="lifeCoverAmt2="+cover2Amt;
			params += "&" + lifeCover2;
		}
	
		if (type=='LSI' && cover2Amt > 0)
		{
			sicCover2="sicCoverAmt2="+cover2Amt;
			params += "&" + sicCover2;
		}		
	}
	
	newScript.src = 'https://apps.irishlife.ie/myonlineservices/servlet/LifeCoverQuote/?' + params;
	//newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
	headID.appendChild(newScript);
	
	//get the ip quote

	
}

function getTheQuote(twoPeople, lifeCover1Amt, sicCover1Amt, billPayCover1Amt, lifeCover2Amt, sicCover2Amt, billPayCover2Amt, 
termVal1Life, termVal1Sic, termVal1BillPay, termVal2Life, termVal2Sic, termVal2BillPay)
{
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    var params;
    newScript.type = 'text/javascript';
    newScript.onload = function(){quoteResults(twoPeople)};
    
    params = "";
 
    constantParms = "quickQuoteId=lifeOnePlan&productId=100&coverTypeCd=L&indexation=False&frequencyCd=M&conversion=False";
    params += constantParms;
    singleOrJoint = twoPeople?"jointLife=True":"jointLife=False";
    params += "&" + singleOrJoint;
    
    
    person1="age1="+$('#about-age').val()+"&sexCd1=M&smokerCd1="+($("#radio1").is(":checked")?"Y":"N");
    params += "&" + person1;
    
    if (lifeCover1Amt > 0)
    {
        lifeCover1="lifeCoverAmt1="+lifeCover1Amt+"&lifeCoverTerm1="+termVal1Life+"&lifeCoverConversion1=N";
        params += "&" + lifeCover1;
    }
    
    if (sicCover1Amt > 0)
    {
        sicCover1="specifiedIllnessAmt1="+sicCover1Amt+"&specifiedIllnessTerm1="+termVal1Sic+"&specifiedIllnessConversion1=N";
        params += "&" + sicCover1;
    }
    
    if (billPayCover1Amt > 0 && $('#occupationClass1').html() != 'N')
    {
        billPay1="billPayAmt1="+billPayCover1Amt+"&billPayTerm1="+termVal1BillPay+"&billPayDeferredWeeks1=8&billPayOccupationClassCd1="+
        $('#occupationClass1').html() + "&billPayConversion1=N&billPayExpiration1="+calcBillPayPaymentTerm(termVal1BillPay,1);
        params += "&" + billPay1;
    }
    
    lifeCover2="";
    sicCover2="";
    billPay2="";
    person2="";
    if (twoPeople)
    {
        person2="age2="+$('#partner-age').val()+"&sexCd2=M&smokerCd2="+($("#radio7").is(":checked")?"Y":"N");
        params += "&" + person2;
        
        if (lifeCover2Amt > 0)
        {
            lifeCover2="lifeCoverAmt2="+lifeCover2Amt+"&lifeCoverTerm2="+termVal2Life+"&lifeCoverConversion2=N";
            params += "&" + lifeCover2;
        }
    
        if (sicCover2Amt > 0)
        {
            sicCover2="specifiedIllnessAmt2="+sicCover2Amt+"&specifiedIllnessTerm2="+termVal2Sic+"&specifiedIllnessConversion2=N";
            params += "&" + sicCover2;
        }
        
        if (billPayCover2Amt > 0 && $('#occupationClass2').html() != 'N')
        {
            billPay2="billPayAmt2="+billPayCover2Amt+"&billPayTerm2="+termVal2BillPay+"&billPayDeferredWeeks2=8&billPayOccupationClassCd2=" + 
            $('#occupationClass2').html() + 
            "&billPayConversion2=N&billPayExpiration2="+calcBillPayPaymentTerm(termVal2BillPay,2);
            params += "&" + billPay2;
        }
    }
    
    
    
    newScript.src = 'https://apps.irishlife.ie/myonlineservices/servlet/LifeCoverQuote/?' + params;
	//newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
    headID.appendChild(newScript);
	
 
    /* if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        $.getScript('https://www.irishlife.ie/secure/submitLifeQuote.js?' + params, quoteResults(twoPeople));
    } */
        
}

function brokerQuoteResults(type,twoPeople, quoteNum)
{
var prem, premInclLevy, levy, fee,  temp = [], 
coverPrem1=0,coverPrem2=0,
	reggie = /\=|&/;
	var temp = result.split(reggie);
	prem = parseFloat(temp[15]).toFixed(2);

	var ipAppend = '';
	if (type=='IP' && quoteNum==3)
	{
		ipAppend = '1';
	}
	else if (type == 'IP' && quoteNum == 4)
	{
		ipAppend = '2';
	}
	
	//4
	premInclLevy = parseFloat(temp[7]);
	$('#'+type+'TotalPrem'+ipAppend).html(premInclLevy);
	
	//2
	levy = parseFloat(temp[9]).toFixed(2);
	$('#'+type+'CoverLevy'+ipAppend).html(levy);
	
	//3
	fee = (type == 'IP'?4:parseFloat(temp[11]).toFixed(2));
	$('#'+type+'CoverFee'+ipAppend).html(fee);
	
	
	for ( i=0;i < temp.length; i+=2)
	{
		if (temp[i] == 'premOptionalExtras1' || temp[i] == 'premEsc1')
		{
			coverPrem1=parseFloat(Number(coverPrem1) + Number(temp[i+1])).toFixed(2);
		}
	 }
	
	if (twoPeople)
	{
		for ( i=0;i < temp.length;i+=2)
	{
		if (temp[i] == 'premOptionalExtras2' || temp[i] == 'premEsc2')
		{
			coverPrem2=parseFloat(temp[i+1]).toFixed(2);
		}		
	}
	}
	
		//1
	$('#'+type+'CoverCost'+ipAppend).html(parseFloat(Number(coverPrem1) + Number(coverPrem2)).toFixed(2));

		
	if (type == 'L')
	{
		$('#totalLifeCoverPrem').html("€" + parseFloat(Number(coverPrem1)+Number(coverPrem2)).toFixed(2));
	}
	else if (type == 'LSI')
	{
		$('#totalSicCoverPrem').html("€" + parseFloat(Number(coverPrem1)+Number(coverPrem2)).toFixed(2));
	}
	else if (type == 'IP')
	{
	    $('#totalBillPayPrem').html("€" + parseFloat(Number($('#IPCoverCost1').html()) + Number($('#IPCoverCost2').html())));//+Number(billPayPrem2)).toFixed(2));
	}
	
	//if (quoteNum == 3 || (quoteNum == 4 && twoPeople))
	//{
		//add everything up and put total on screen.
			//1
		
	var totalCost = Number($('#LCoverCost').html())+Number($('#LSICoverCost').html())+Number($('#IPCoverCost1').html())+Number($('#IPCoverCost2').html());
	$('#totalCost').html(parseFloat(Number(totalCost)).toFixed(2));
	
	//2
	var totalLevy = Number($('#LCoverLevy').html())+Number($('#LSICoverLevy').html())+Number($('#IPCoverLevy1').html())+Number($('#IPCoverLevy2').html());
	$('#theLevy').html(parseFloat(Number(totalLevy)).toFixed(2));
	
	//3
	if (Number($('#LCoverFee').html() > 0 && Number($('#LSICoverFee').html()) > 0))
	{
		$('#LTotalPrem').html(Number($('#LTotalPrem').html())-Number($('#LCoverFee').html()));
		$('#LCoverFee').html(0);		
	}
	
	//4
	var totalPrem = Number($('#LTotalPrem').html())+Number($('#LSITotalPrem').html())+Number($('#IPTotalPrem1').html())+Number($('#IPTotalPrem2').html());
	$('#totalPrem').html(parseFloat(Number(totalPrem)).toFixed(2));

	
	var totalFee = Number($('#LCoverFee').html())+Number($('#LSICoverFee').html())+Number($('#IPCoverFee1').html())+Number($('#IPCoverFee2').html());
	$('#thePolicyFee').html(parseFloat(Number(totalFee)).toFixed(2));
	

	//}
}

function ipQuoteResults(prem) {
}

function quoteResults(twoPeople)
{
	////console.log('this is where we get the quote results and parse them onto the screen');
	var prem, premInclLevy, levy, fee,  temp = [], lifeCoverPrem1=0, sicCoverPrem1=0, billPayPrem1=0,lifeCoverPrem2=0, sicCoverPrem2=0, billPayPrem2=0,
	reggie = /\=|&/;
	var temp = result.split(reggie);
	prem = parseFloat(temp[5]).toFixed(2);
	premInclLevy = parseFloat(temp[7]);
	$('#totalPrem').html(premInclLevy);
	levy = parseFloat(temp[9]).toFixed(2);
	$('#theLevy').html(levy);
	fee = parseFloat(temp[11]).toFixed(2);
	$('#thePolicyFee').html(fee);
	totalprem = premInclLevy;
	
	
	for ( i=0;i < temp.length; i+=2)
	{
		if (temp[i] == 'lifeCoverPrem1')
		{
			lifeCoverPrem1=parseFloat(temp[i+1]).toFixed(2);
		}
		
		if (temp[i] == 'sicCoverPrem1')
		{
			sicCoverPrem1=parseFloat(temp[i+1]).toFixed(2);
		}
		if (temp[i] == 'billPayPrem1')
		{
			billPayPrem1=parseFloat(temp[i+1]).toFixed(2);
		}
	 }
	
	if (twoPeople)
	{
		for ( i=0;i < temp.length;i+=2)
	{
		if (temp[i] == 'lifeCoverPrem2')
		{
			lifeCoverPrem2=parseFloat(temp[i+1]).toFixed(2);
		}
		
		if (temp[i] == 'sicCoverPrem2')
		{
			sicCoverPrem2=parseFloat(temp[i+1]).toFixed(2);
		}
		if (temp[i] == 'billPayPrem2')
		{
			billPayPrem2=parseFloat(temp[i+1]).toFixed(2);
		}
	}
	}
	
	$('#totalLifeCoverPrem').html("€" + parseFloat(Number(lifeCoverPrem1)+Number(lifeCoverPrem2)).toFixed(2));
	$('#totalSicCoverPrem').html("€" + parseFloat(Number(sicCoverPrem1)+Number(sicCoverPrem2)).toFixed(2));
	$('#totalBillPayPrem').html("€" + parseFloat(Number(billPayPrem1)+Number(billPayPrem2)).toFixed(2));
	$('#totalCost').html(parseFloat(Number(lifeCoverPrem1)+Number(sicCoverPrem1)+Number(billPayPrem1)+Number(lifeCoverPrem2)+Number(sicCoverPrem2)+Number(billPayPrem2)).toFixed(2));
	
}

////////////////////////////////////////////////////////////////////////////////

//#################################################################
//######## CALLBACK FORMS ##########
//#################################################################
// Function for callback forms 
// The email is sent using marketo and the details are stored on 
// the system. 

////////////////////////////////////////////////////////////////////////////////

////////////// CUSTOME MARKETO PIECE FOR ONE PLAN //////////////////////////////////////////////////////////////

function mkAssociateLeadOnePlan(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest, age1OnePlan, age2OnePlan,incDeathAmt1, incDeathAmt2, incDeathPrem, incIllAmt1, incIllAmt2, incIllPrem, incSpecIllAmt1, incSpecIllAmt2, incSpecIllPrem, Term, Total)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{
	Email: emailAddress,LeadSourceDetail:'Website Callback',	
	FirstName: firstName,	
	MobilePhone: phoneNumber,	
	LastName: lastName, 	
	Callbackrequested: true,   
	oneplanage1: age1OnePlan,	
	oneplanage2: age2OnePlan,	
	oneplanincdeathamt1: incDeathAmt1,
	oneplanincdeathamt2: incDeathAmt2,
	oneplanincdeathprem: incDeathPrem,
	oneplanincillamt1: incIllAmt1,
	oneplanincillamt2: incIllAmt2,	
	oneplanincillprem: incIllPrem,	
	oneplanspecillamt1: incSpecIllAmt1,
	oneplanspecillamt2: incSpecIllAmt2,
	oneplanspecillprem: incSpecIllPrem,
	oneplanterm: Term,
	oneplantotalprem: Total,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,
	PerferredTimeToContact:contacttime, CallbackAreaOfInterest: areaofinterest},hash);
}

//THE POPUP CALLBACK FORM
// validate email address format    
function isEmail(emailAdd) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(emailAdd);
}

function notSureCallBack(){

var name,emailAdd,phone,before12,from125,after5
   
    z = 0;
    name = $('#notSureName').val();
    emailAdd = $('#notSureEmail').val();
    phone = $('#notSurePhone').val();
	time = $('input[name=time-to-call-notSure]:checked').val();
	
    if(name.length<=3){
        z =z+1;
        $("#notSureNameError").fadeIn(1000)
    } else{
        $("#notSureNameError").hide();
    }
    if(phone.length<=7){
        z =z+1;
        $("#notSurePhoneError").fadeIn(1000);
    } else{
        $("#notSurePhoneError").hide();
    }
	
    if(emailAdd == ''){
      $("#notSureEmailError").hide();
    } else{
        if(!emailAdd == '' && isEmail(emailAdd) == false) {
			z =z+1;
		$("#notSureEmailError").fadeIn(1000);
		}
		else {
			$("#notSureEmailError").hide();
		}
    }
	
	if(time == null) {
		z =z+1;
		$("#notSureTimeError").fadeIn(1000);
	}else{
		$("#notSureTimeError").hide();
	}

    if (z==0) {
		// no errors
        // send the callback and change the screen

        $("#notSureSent").removeClass('hidden');
		$("#notSureForm").hide(1000);
		$("#notSureSubmit").addClass('hidden');
		
        //Marketo call
        mkAssociateLead(name, '', emailAdd, phone, time, 'Family Protection Planner' );
    } else{
        $("#notSureSent").addClass('hidden');
		$("#notSureForm").fadeIn(1000);
		$("#notSureSubmit").removeClass('hide');
    }
};

////////////////////////////////////////////////////////////////////////////////

//THE TALK TO US CALLBACK FORM
// validate email address format    
function isTalkToUsEmail(emailAdd) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(emailAdd);
}

function talkToUsCallBack(){

var name,emailAdd,phone,before12,from125,after5
   
    z = 0;
    name = $('#talkToUsName').val();
	//console.log(name);
    emailAdd = $('#talkToUsEmail').val();
	//console.log(emailAdd);
    phone = $('#talkToUsPhone').val();
	//console.log(phone);
	time = $('input[name=time-to-call]:checked').val();
	//console.log(time);
	
	
    if(name.length<=3){
        z =z+1;
        $("#talkToUsNameError").fadeIn(1000);
    } else{
        $("#talkToUsNameError").hide();;
    }
    if(phone.length<=7){
        z =z+1;
        $("#talkToUsPhoneError").fadeIn(1000);
    } else{
        $("#talkToUsPhoneError").hide();;
    }
	
     if(emailAdd == ''){
      $("#talkToUsEmailError").hide();
    } else{
        if(!emailAdd == '' && isTalkToUsEmail(emailAdd) == false) {
			z =z+1;
		$("#talkToUsEmailError").fadeIn(1000);
		}
		else {
			$("#talkToUsEmailError").hide();
		}
    }
	
	if(time == null) {
		z =z+1;
		$("#talkToUsTimeError").fadeIn(1000);
	}else{
		$("#talkToUsTimeError").hide();
	}

    if (z==0) {
		// no errors
        // send the callback and change the screen
        $("#callback-screen").hide();
		$('html,body').animate({
        scrollTop: $("#page").offset().top},
        'slow');
        $("#thanks-screen").fadeIn(1000);
		$('#callTime').html(time);
		
        //Marketo call
        mkAssociateLeadOnePlan(name,'',emailAdd, phone, time,'Family Protection Planner',$('#about-age').val(),$('#partner-age').val(),$('#lumpsumDeath').html(),$('.lumpsumDeathPartner').html(),$('#totalLifeCoverPrem').html(),$('.billPayCover1Amt1').html(),$('.billPayCover1Amt2').html(),$('#totalBillPayPrem').html(),$('#specIll').html(),$('.specIllPartner').html(),$('#totalSicCoverPrem').html(),$('.term').html(),$('#totalPrem').html())
		
		setGAPageView(window.location.pathname+'/callback-submitted','Talk to Us Callback form Protection Planner');
		setSCamPageView(window.location.pathname+'/callback-submitted');

    } 
};

//SUBMIT THE FORMS

$("#notSureSubmit").click(function() {
       notSureCallBack();
    });
	
$(".talkToUsSubmit").click(function() {
       talkToUsCallBack();
    });	
	
	
/*
 ======================= =======================  =======================  =======================
                                                                             SAVE & RETRIEVE QUOTE                                                                            
 ======================= =======================  =======================  =======================
*/   

$('#login-mobile').click(function(){
	localStorageSave();
});

$('#signup-mobile').click(function(){
    $('#need-login-bar').hide();
	$(".modal-frame").attr('src','https://apps.irishlife.ie/myonlineservices/account/login1modal#SignUp');
	localStorageSave();
});

$('.close-login').click(function(){
	$('#login-area').slideUp();
	localStorage.clear();
});

function removeCommaFromNumber(numberIn) {
                var a=numberIn;
                a=a.replace(/\,/g,''); // 1125, but a string, so convert it to number
                a=parseInt(a,10);
                return a;
}

 
//WHEN SAVE IS CLICKED BUILD UP A STRING AND SEND IT TO JOE	
function savingQuote() {	
 
        var theTerm = $('.term').html();
		var totalPrem = $('#totalPrem').html();
        var lumpsumDeathAmt;
		var specifiedIllnessAmt;
		var llnessAmt;
		var people = 1;
		var deathAmt2 = $('.lumpsumDeathPartner').html();
		var specill2 = $('.specIllPartner').html();
		var illness2 = $('.billPayCover1Amt2').html();;
		
		if(!$('#partner-fields').hasClass('hidden')) {
			people = 2;
		}
		
        if($('#lumpsumDeath').html() == "") {
		lumpsumDeathAmt = "0.00" }
		else {
			lumpsumDeathAmt = $('#lumpsumDeath').html();
		};
		
		
		 if($('.billPayCover1Amt1').html() == "") {
		illnessAmt= "0.00" }
		else {
			illnessAmt = $('.billPayCover1Amt1').html();
		}
		
		 if($('#specIll').html() == "") {
		specifiedIllnessAmt = "0.00" }
		else {
			specifiedIllnessAmt = $('#specIll').html();
		};
		
     //build up the string
	 saveQuote = "typeOfQuote=14&quoteData=Type=FamilyProtection" +
		 '-' + lumpsumDeathAmt +
		 '-' + illnessAmt +
		 '-' + specifiedIllnessAmt +
		 '-' + theTerm +
		 '-' + totalPrem +
		 '-' + people +
		 '-' + deathAmt2 +
		 '-' + illness2 +
		 '-' + specill2;
		  
	
    $.ajax({
	type: "GET",
	url: "https://apps.irishlife.ie/myonlineservices/ClientB2CQuotes/StoreQuote?"+saveQuote,
	async: true,
	success: function(response){
		setGAPageView(window.location.pathname+'/quote-saved','Family Protection Planner Quote Saved');
		setSCamPageView(window.location.pathname+'/quote-saved');
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

function localStorageSave() {
	
	////console.log('Saving to local storage');
	
		localStorage.fpDataStored = 'true';
		
		localStorage.setItem('fplastclear', timeNow);
		
		localStorage.incomeGap = $('.income-gap').html();
		localStorage.monthlyMortage = $('.insert-mortgage').html();
		localStorage.stateBenefit = $('.state-benefit').html();
		localStorage.incomeIllBill1 = $('#incomeIllBill1').html();
		localStorage.mortOrRent = $('#MortOrrent').html();
		localStorage.billPayMortgage1 = $('#billPayMortgage1').html();
		localStorage.salary = $('#salary').html();
		
		if(!$('.partner-needs-death').hasClass('hidden')) {
		localStorage.partnerNeedsDeath = $('.partner-needs-death').html();
		}
		
		if(!$('.partner-needs-specIll').hasClass('hidden')) {
		localStorage.partnerNeedsSpecIll = $('.partner-needs-specIll').html();
		}
		
		if(!$('.partner-billpay-needs').css('display') == 'none') {
		localStorage.billPayMortgage2 = $('#billPayMortgage2').html();
		localStorage.incomeIllBill2 = $('#incomeIllBill2').html();
		}
		
		
		localStorage.quoteScreen = $('#your-quote').html();
		
}

function localStorageRetrieve() {
	 
	 ////console.log('Retrieving from local storage');
	 
		  $('#about-you').addClass('hidden');
		  $('#your-family').addClass('hidden');
		  $('#your-income').addClass('hidden');
		  $('#existing-cover').addClass('hidden');
		  $('.contact-us').addClass('hidden');
		  $('#your-quote').removeClass('hidden');
		  		  $('#login-register').hide();
		  
		  $('#about-menu').removeClass('active');
		  $('#existing-menu').addClass('active');
		  $('.steps-menu').hide();
		  
			$('.income-gap').html(localStorage.incomeGap);
			$('.insert-mortgage').html(localStorage.monthlyMortage);
			$('.state-benefit').html(localStorage.stateBenefit);
			$('#incomeIllBill1').html(localStorage.incomeIllBill1);
			$('#MortOrrent').html(localStorage.mortOrRent);
			$('#billPayMortgage1').html(localStorage.billPayMortgage1);
			$('#salary').html(localStorage.salary);
		
		if(localStorage.partnerNeedsDeath != null) {
			$('.partner-needs-death').removeClass('hidden');
			$('.partner-needs-death').html(localStorage.partnerNeedsDeath);
		}
		
		if(localStorage.partnerNeedsSpecIll != null) {
			$('.partner-needs-specIll').removeClass('hidden');
			$('.partner-needs-specIll').html(localStorage.partnerNeedsSpecIll);
		}
		
		if(localStorage.billPayMortgage2 != null) {
			$('#billPayMortgage2').html(localStorage.billPayMortgage2);
			$('#incomeIllBill2').html(localStorage.incomeIllBill2);
		}
		
		else {
			$('.partner-needs-death').addClass('hidden');
			$('.partner-needs-specIll').addClass('hidden');
			$('.partner-billpay-needs').addClass('hidden');
		}

		 $('#your-quote').html(localStorage.quoteScreen);
		 $('.quote-prev').html('Restart');
		 $('.quote-prev').addClass('restart');
		 $('.restart').removeClass('quote-prev');
		 $('.restart').click(function(){
			     localStorage.clear();
			     location.reload();
		 });
		 
		 
		 $('#save-bar').fadeIn('slow');			
	 
	 
}

//if logged in and selecting a saved quote get the values from the string and put back into the calculator
function retrieveQuote(quoteId) {
	
	////console.log('retrieving quote ' + quoteId);
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
		
			////console.log("Quote Data coming back is=" + quoteData);
		
		//split returned string
		
		//$('#pensionCalcTotalContribOutputFinal').html(totalContributions);
		// need to trigger chart & total contributions
		// Display the thumbnails on the page
		},
    });
	
};

$("#login-register").click(function()  {
	localStorageSave();
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

$('.close-save').click(function() {
	$('#save-bar').fadeOut('slow');
	$('#quote-saved-bar').fadeOut('slow');
	$('#need-login-bar').fadeOut('slow');
	localStorage.clear();
});	

$('loginSignup a').click(function(){
	if(amILoggedIn) {
	$('#need-login-bar').hide();
	}
	else{
		$('#save-bar').hide();
	}
});

})(jQuery);