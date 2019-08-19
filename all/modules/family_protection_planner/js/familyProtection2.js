var isBrokerVersion = false;
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
            if(window.sessionCamRecorder.createVirtualPageLoad)
            window.sessionCamRecorder.createVirtualPageLoad(p);
        }
			}
			catch(err){
				//Do nothing
			}
	//return "user set";
}

//the buttons are disabled by default
$(".next").attr('disabled', true);
$(".family-next").attr('disabled', true);
$(".income-next").attr('disabled', true);
$(".existing-next").attr('disabled', true);
	
//This is an IE fix because pointer-events does not work in IE
$(document).on('mousedown', '.disabled', function (e) {

    $(this).hide();
    var BottomElement = document.elementFromPoint(e.clientX, e.clientY);
    $(this).fadeIn();
    $(BottomElement).mousedown(); //Manually fire the event for desired underlying element

    return false;

});

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

// FUNCTIONS FOR fadeInING THE DIVS 
function letsGo() {
	$("#intro").hide();
	$("#about-you").fadeIn(1000);
	$("#menu").fadeIn(1000);
	
}
// income-next
var incomeNextMax = 3;
function addPartner() {
  incomeNextMax = 4;
	$("#partner-fields").removeClass('hidden');
	$("#partner-existing-fields").removeClass('hidden');
	$(".partner-info").removeClass('hidden');
	$(".partnerSlide").removeClass('hidden');
	$(".quote-box1").css('height', '240px');
	$(".quote-box2").css('height', '285px');
	$(".quote-box3").css('height', '195px');
	$(".next").attr('disabled', true);
	$('.next').addClass('disabled');
	$('.existing-next').addClass('disabled');
	$(".partner").addClass('hidden');
	$('#incomeCirc').trigger('configure', {
    max: incomeNextMax});
    
	$('#incomeCirc').trigger('change');
}

function hidePartner() {
	incomeNextMax = 3;
	$("#partner-fields").addClass('hidden');
	$(".partner-info").addClass('hidden');
	$(".partner").removeClass('hidden');
	$("#partner-existing-fields").addClass('hidden');
	$(".quote-box").css('height', '184px');
	$(".partnerSlide").addClass('hidden');
	if ($("#aboutCirc").val() === '4') {
	$(".next").attr('disabled', false);
	$('.next').removeClass('disabled');
    }
	$('#incomeCirc').trigger('configure', {
    max: incomeNextMax});
    
	$('#incomeCirc').trigger('change');
}

function aboutNext() {
	$("#about-you").hide();
	$("#your-family").fadeIn(1000);
	$("#family").removeClass('locked');
	$("#family p").addClass('active');
	$("#about p").removeClass('active');
	setGAPageView(window.location.pathname+'/family','Your Family Screen Protection Planner');
	setSCamPageView(window.location.pathname+'/family');
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
	setGAPageView(window.location.pathname+'/income','Your Income Screen Protection Planner');
	setSCamPageView(window.location.pathname+'/income');
}


function incomePrev() {
	$("#your-income").hide();
	$("#your-family").fadeIn(1000);
	$(".family-income").removeClass('locked');
	$("#income").removeClass('locked');
	$("#family p").addClass('active');
	$("#income p").removeClass('active');
}

function incomeNext() {
	$("#your-income").hide();
	$("#existing-cover").fadeIn(1000);
	$("#existing").removeClass('locked');
	$("#existing p").addClass('active');
	$("#income p").removeClass('active');
	setGAPageView(window.location.pathname+'/existing-cover','Your Existing Cover Screen Protection Planner');
	setSCamPageView(window.location.pathname+'/existing-cover');
}


function existingPrev() {
	$("#existing-cover").hide();
	$("#your-income").fadeIn(1000);
	$(".income-existing").removeClass('locked');
	$("#existing").removeClass('locked');
	$("#income p").addClass('active');
	$("#existing p").removeClass('active');
}

function existingNext() {
	$("#existing-cover").hide();
	$("#your-quote").fadeIn(1000);
	$("#yourresult").removeClass('locked');
	$("#yourresult p").addClass('active');
	$("#existing p").removeClass('active');
	setGAPageView(window.location.pathname+'/result','Your Results Screen Protection Planner');
	setGAPageView(window.location.pathname+'/quote-completed','Your Results Screen Protection Planner');
	setSCamPageView(window.location.pathname+'/results');
}


function quotePrev() {
	$("#menu").fadeIn();
	$("#existing-cover").fadeIn(1000);
	$(".existing-quote").removeClass('locked');
	$("#yourresult").removeClass('locked');
	$("#your-quote").hide();
	$("#yourresult p").removeClass('active');
	$("#existing p").addClass('active');
}

function talktoUs() {
	$("#your-quote").hide();
	$("#menu").hide();
	$("#callback-screen").fadeIn(1000);
	setGAPageView(window.location.pathname+'/callback','Talk to Us Callback form Protection Planner');
	setSCamPageView(window.location.pathname+'/callback');
}

function talkPrev() {
	$("#callback-screen").hide();
	$("#your-quote").fadeIn(1000);
}

///////////////////////////////////////////////////////////////////////////////////

$.updateTheOccupationSelected = function(occupationId,whichOne) {

   //parms = "value=" + $("#occupationSelect option:selected")[0].value.substring(1);
   parms = "value=" + occupationId.substring(1);
   
   url = "/servlet/occupationData?"+parms;
   $.ajax({
	type: "POST",
	url: url,
	async: true,
	beforeSend: function(){},
	success: function(response){getOccupationClass(response,whichOne);},
	error: function(){occupationClassError(whichOne);},
	timeout: 300000
	});
}

function occupationClassError(whichOne)
{
	  $('#occupationClass'+whichOne).html("1");
	  $('#phiOccClass'+whichOne).html("1");
}

function getOccupationClass(response, whichOne)
{
	//console.log('getting occupation class for ' + whichOne);
	
	occupationData = null;
   try
   {
	eval(response);
   }
   catch(e)
   {
	
   }
   try{
	 selectedValue = $('#occupationSelect'+whichOne).val();
	 
	 if(selectedValue != "")
	 {
	  occupation = eval("occupationData." + selectedValue);
	  
	  $('#occupationClass'+whichOne).html(isNaN(occupation.BPY)? 'N':occupation.BPY);
	  $('#phiOccClass'+whichOne).html(isNaN(occupation.PCC)? 'N':occupation.PCC);
	  
	  if(whichOne == "1") {
	  $('#about-form #about-age, #about-form #about-rel,  #about-form #radio1,  #about-form #radio2').trigger("change");
	  }
	  
	  else {
	  $("#partner-form #partner-age, #partner-form #radio7,  #partner-form #radio8, #partner-form #partner-rel").trigger("change");
	  }
	  
	 }
	}
	catch(e)
	{
	 //console.log(' * error 1');
	}
}

	


// CALLING THE FUNCTIONS 
$( document ).ready(function() {
	$("#start").click(letsGo); //Let's go btn

	$(".partner").click(addPartner); //Add Partner
	$(".close-btn").click(hidePartner); //Hide Partner


	$(".next").click(aboutNext); // About Page Next 


	$(".family-prev").click(familyPrev); //Your Family Previous
	$(".family-next").click(familyNext); //Your Family Next 


	$(".income-prev").click(incomePrev); //Your Income Previous
	$(".income-next").click(incomeNext); //Your Income Next


	$(".existing-prev").click(existingPrev); //Existing Cover Previous
	$(".existing-next").click(existingNext); //Existing Cover Next


	$(".quote-prev").click(quotePrev); //Your Quote Previous


	$(".quote-next").click(talktoUs); //Quote screen to callback screen
	$(".callback-prev").click(talkPrev); //Callback screen to Quote screen
	//broker version?
	if(window.location.href.indexOf("bline") > -1 ||
	   window.location.href.indexOf("broker") > -1)
	{
		isBrokerVersion = true;	
		$('.help').hide();
		$('.printBtn').removeClass('hidden');
		$('.cta-talk-to-us').hide();
	}

	if ($('#lumpsumDeath').text().length > 0) {
	//console.log("The menu is now activated");
	};

	//DYNAMICALLY ADD THE OCCUPATIONS LIST
	//update occupationSelect for two people
	var occupationSelectFirst = occupationSelect;
	occupationSelectFirst = occupationSelectFirst.replace("id='occupationSelect'","id='occupationSelect1'");
	var newFunctionCallStr1 = "(function ($) {$.updateTheOccupationSelected(document.getElementById(&quot;occupationSelect1&quot;).value,1);})(jQuery);";
	occupationSelectFirst = occupationSelectFirst.replace("onchange='selectChange()'","onchange='"+newFunctionCallStr1+"'");
	
	var occupationSelectSecond = occupationSelect;
	occupationSelectSecond = occupationSelectSecond.replace("id='occupationSelect'","id='occupationSelect2'");
	
		var newFunctionCallStr2 = "(function ($) {$.updateTheOccupationSelected(document.getElementById(&quot;occupationSelect2&quot;).value,2);})(jQuery);";
	occupationSelectSecond = occupationSelectSecond.replace("onchange='selectChange()'","onchange='"+newFunctionCallStr2+"'");

	
	
	$('#about-occ').html(occupationSelectFirst);
	$('#partner-occ').html(occupationSelectSecond);   
	
	//REMOVE CHOSEN ON MOBILE AND TABLETS
	if ($(window).width() > 768) {
		$("#about-occ #occupationSelect1, #partner-occ #occupationSelect2, #family-age").addClass('chosen-select');
	    $(".chosen-select").chosen();
	 }

	$('#about-rel :first-child').addClass('grey'); 

	//JQUERY KNOB
	$('#aboutCirc').knob( {	
		'min' : 0,
		'max' : 4,
		'value' : 0,
		'bgColor' : '#edeaed',
		'fgColor' : '#5261ac',
		'width' :  250,	
		'height' : 300,
		'readOnly' : true,
	});


	$('#familyCirc').knob( {
		
		'min' : 0,
		'max' : 3,
		'value' : 0,
		'bgColor' : '#edeaed',
		'fgColor' : '#5261ac',
		'width' :  250,	
		'height' : 300,
		'readOnly' : true,
	});


	$('#incomeCirc').knob( {
		
		'min' : 0,
		'max' : 3,
		'value' : 0,
		'bgColor' : '#edeaed',
		'fgColor' : '#5261ac',
		'width' :  250,	
		'height' : 300,
		'readOnly' : true,
	});

	$('#existingCirc').knob( {
		
		'min' : 0,
		'max' : 3,
		'value' : 0,
		'bgColor' : '#edeaed',
		'fgColor' : '#5261ac',
		'width' :  250,	
		'height' : 300,
		'readOnly' : true,
	});

	$('#existingCircPartner').knob( {
		
		'min' : 0,
		'max' : 3,
		'value' : 0,
		'bgColor' : '#edeaed',
		'fgColor' : '#5261ac',
		'width' :  250,	
		'height' : 300,
		'readOnly' : true,
	});

	$('#partnerCirc').knob( {
		
		'min' : 0,
		'max' : 4,
		'value' : 0,
		'bgColor' : '#edeaed',
		'fgColor' : '#5261ac',
		'width' :  250,	
		'height' : 300,
		'readOnly' : true,
	}); 
	
	//ANIMATE THE KNOB
	     
	//POPOVER
	$('[data-toggle="popover"]').popover();   
	
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
		scrollTop: 0
	}, 600);
	return false;
}
});

$('.lifelens-cta').click(function () {

	$("html, body").animate({
		scrollTop: 0
	}, 600);
	return false;

});


///////////////////////////////////////////////////////////////////////////////////

//CHANGE THE KNOBS ON INPUT 

//ABOUT YOU
//#about-form select, 
$("#about-form #about-age, #about-form #radio1,  #about-form #radio2, #about-form #about-rel").change( function () {

var circleVal = 0;
var circleVal2 = 0;
var maxCircle=0;

// validation for all ages
if ($("#about-age").val() >= 18 && $("#about-age").val() <= 75 ) {
    circleVal++;
    yourAge = $("#about-age").val();
    $('#ageVal').html(yourAge);	
    $(".warning3").hide();
}else
{
  // fadeIn age error
  $(".warning3").fadeIn(1000);	
  $(".next").addClass('disabled');
}

// case 2
if($("#about-age").val() > billPayMaxAgeEntry && $("#about-age").val() < 65)	{
   maxCircle=2;
	$("#you-protection").addClass('hidden');
	$('#existingCirc').trigger('configure', {
    max: maxCircle});
}
else if($("#about-age").val() > 65 && $("#about-age").val() <= 75)	{
  maxCircle=1;
	$("#you-protection").addClass('hidden');
	$("#you-spec-existing").addClass('hidden');
	$('.output4, .range4').val('0');
	$('#existingCirc').trigger('configure', {
    max: maxCircle});
    //t529
}
else {
  maxCircle=3;
	$("#you-spec-existing").removeClass('hidden');  
	$("#you-protection").removeClass('hidden');
	$('#existingCirc').trigger('configure', {
    max: maxCircle});
}
  releaseBtn = maxCircle;
	
	
if ($("#about-rel option:selected").val() > 0) {
	circleVal++;
	yourRel = $("#about-rel option:selected").text();
	$('#relStatus').html(yourRel);	
	}
	
		
if ($("#occupationSelect1 option:selected").index() > 0) {
	circleVal++;
	yourOcc = $("#occupationSelect1 option:selected").text();
	$('#occupation').html(yourOcc);	
	}
	
if ($("#occupationSelect1 option:selected").val() === 'v10687' ||
	$("#occupationSelect1 option:selected").val() === 'v10702' ||
	$("#occupationSelect1 option:selected").val() === 'v10700') {
	
	$('.output1').html('2,500');
	$('.range1').val(2500);
	$('#js-rangeslider-0').addClass('hidden');
	$('#home-maker').removeClass('hidden');
	circleVal2++;
	
	}

if ($("#radio1").is(":checked") || $("#radio2").is(":checked")) circleVal++;

$("#aboutCirc").val(circleVal).trigger('change');
$("#incomeCirc").val(circleVal2).trigger('change');

//enable the button
if ($("#aboutCirc").val() === '4') {
	$(".next").attr('disabled', false);
	$('.next').removeClass('disabled');
}

else {
	$(".next").attr('disabled', true);
	$('.next').addClass('disabled');
}
	
return false;
});

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
	$(".next").addClass('disabled');
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

if ($("#radio7").is(":checked") || $("#radio8").is(":checked")) circleVal++;

$("#partnerCirc").val(circleVal).trigger('change');
$("#incomeCirc").val(circleVal3).trigger('change');

//enable the button
if ($("#partnerCirc").val() === '4' && $('#aboutCirc').val() === '4') {
	$(".next").attr('disabled', false);
	$('.next').removeClass('disabled');
}

else {
	$(".next").attr('disabled', true);
	$('.next').addClass('disabled');
}
	
return false;
});

//YOUR FAMILY
var childAge;

$("#family-form input, #family-form radio, #family-form select").on('input change', function () {
var circleVal = 0;

if ($("#family-age option:selected").val() != 'notSelected') {
	circleVal++;
	childAge = $("#family-age option:selected").val();
	if(childAge == 0) {
	$('#childAge').html("Newborn - " + childAge);
	}
	
	else {
	$('#childAge').html(childAge);	
	}
    }

	
if ($("#childNum option:selected").val() > 0) {
	circleVal++;	
	}	
	
if ($("#radio3").is(":checked")) {
	circleVal++;
	$("#family-age, #family_age_chosen").removeClass('disable-age');
	$("#childNum").removeClass('disable-age');}
	$("#resultYoungestChild").css("display","block");

if ($("#radio4").is(":checked")) {
	$("#family-age, #family_age_chosen").addClass('disable-age');
	$("#childNum").addClass('disable-age');
	$("#resultYoungestChild").css("display","none");
	circleVal = 3;}

$("#familyCirc").val(circleVal).trigger('change');

//enable the button
if ($("#familyCirc").val() === '3') {
	$('.family-next').removeClass('disabled');
	$(".family-next").attr('disabled', false);
}

else {
	$('.family-next').addClass('disabled');
	$(".family-next").attr('disabled', true);
}
	
return false;
});

//YOUR INCOME
var morRent;

$("#income-form input, #income-form select").on('input change', function () {

var circleVal = 0; 

if ($(".range1").val() >= 1000) {
	circleVal++;
	netInc = $(".range1").val();
	$('#netIncome').html('&euro; ' + addCommas(netInc));	
	}
	
if ($(".range2").val() >= 0) {
	circleVal++;
	morRent = $(".range2").val();
	$('#morRent').html('€ ' + addCommas(morRent));
	}
	
if ($(".range5").val() >= 1000) {
	circleVal++;
	parInc = $(".range5").val();
	$('#parIncome').html('€ ' + addCommas(parInc));
	}	
	
	
if ($(".tick6").is(":checked"))	{
	circleVal++;
	$("#income-age").addClass('disable-age');
	$(".MortOrrent").html('Rent');
	}
	else {
		$("#income-age").removeClass('disable-age');
		$(".MortOrrent").html('Mortgage');
	}
	
if ($("#income-age").val() > 0 && $("#income-age").val() <= 35) {
    circleVal++;
    $(".warning2").hide();
	}
	
else if ($('#income-age').val() > 35) {
	$(".warning2").fadeIn(1000);	
	$(".income-next").addClass('disabled');
    }	

$("#incomeCirc").val(circleVal).trigger('change');

//enable the button t529
//incomeNextMax
if ($("#incomeCirc").val() == incomeNextMax) {
	$('.income-next').removeClass('disabled');
	$(".income-next").attr('disabled', false);
}

else {
	$('.income-next').addClass('disabled');
	$(".income-next").attr('disabled', true);
}
	
return false;
});

//YOUR EXISTING COVER
$("#existing-form input,#existing-form radio").on('input change', function () {
var circleVal = 0;
if ($(".range3").val() > 1000) circleVal++;
if ($(".tick2").is(":checked")) {
	circleVal++;
	$("#js-rangeslider-3").addClass('noSlide');
	$("#js-rangeslider-3 .rangeslider__fill").css('width', '20px');
	$("#js-rangeslider-3 .rangeslider__handle").css('left', '0px');
	$('.output3').css('visibility','hidden');
	$('.output3, .range3').val('0');
	
	}
	else {
		$("#js-rangeslider-3").removeClass('noSlide');
		$('.output3').css('visibility','visible');
		
	}
	
if ($(".tick3").is(":checked")) {
	circleVal++;
	$("#js-rangeslider-5").addClass('noSlide');
	$("#js-rangeslider-5 .rangeslider__fill").css('width', '20px');
	$("#js-rangeslider-5 .rangeslider__handle").css('left', '0px');
	$('.output4').css('visibility','hidden');
	$('.output4, .range4').val('0');
	}
	else {
		$("#js-rangeslider-5").removeClass('noSlide');
		$('.output4').css('visibility','visible');
	}	
	
if ($(".range4").val() > 1000) circleVal++;	
if ($("#radio11").is(":checked") || $("#radio12").is(":checked")) circleVal++;


$("#existingCirc").val(circleVal).trigger('change');

//enable the button
//console.log($("#existingCirc").val()+' - releaseBtn '+releaseBtn);
if ($("#existingCirc").val() == releaseBtn && $('#partner-existing-fields').css('display') == 'none') {
//console.log("should appear");
	$('.existing-next').removeClass('disabled');
	$(".existing-next").attr('disabled', false);
}

else {
	$('.existing-next').addClass('disabled');
	$(".existing-next").attr('disabled', true);
}
	
return false;
});

//PARTNERS EXISTING COVER
$("#partner-existing-fields #existing-form input,#existing-form radio").on('input change', function () {
var circleVal = 0;
if ($(".range6").val() > 1000) circleVal++;
if ($(".tick4").is(":checked")) {
	circleVal++;
	$("#js-rangeslider-4").addClass('noSlide');
	$("#js-rangeslider-4 .rangeslider__fill").css('width', '20px');
	$("#js-rangeslider-4 .rangeslider__handle").css('left', '0px');
	$('.output6').css('visibility','hidden');
	$('.output6, .range6').val('0');
	}
	else {
		$("#js-rangeslider-4").removeClass('noSlide');
		$('.output6').css('visibility','visible');
		
	}

if ($(".range7").val() > 1000) circleVal++;		
	
if ($(".tick5").is(":checked")) {
	circleVal++;
	$("#js-rangeslider-6").addClass('noSlide');
	$("#js-rangeslider-6 .rangeslider__fill").css('width', '20px');
	$("#js-rangeslider-6 .rangeslider__handle").css('left', '0px');
	$('.output7').css('visibility','hidden');
	$('.output7, .range7').val('0');
	}
	else {
		$("#js-rangeslider-6").removeClass('noSlide');
		$('.output7').css('visibility','visible');
	}	
	
if ($("#radio9").is(":checked") || $("#radio10").is(":checked")) circleVal++;


$("#existingCircPartner").val(circleVal).trigger('change');

//enable the button t529 gherer
if ($("#existingCircPartner").val() == releasePartnerBtn && $('#partner-existing-fields').css('display') == 'block') {
	$('.existing-next').removeClass('disabled');
	$(".existing-next").attr('disabled', false);
}

else {
	$('.existing-next').addClass('disabled');
	$(".existing-next").attr('disabled', true);
}
	
return false;
});


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

	var children = $("#radio3").is(":checked");
	var mortgage = (!$('.tick6').is(':checked') && $("#income-age").val() > 0);

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
	if ($('#about-rel option:selected').val() === '1' )
	{
		stateBenefit = widowsPension;
			//children?	
		if ($("#radio3").is(":checked"))
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
	
	//married = state benefit, not married = no state benefit
	var stateBenefit = calculateStateBenefit();
	var mortgagePayment = Number(removeCommaFromNumber($('.output2').html()));
	
	//no mortgage
	if ($('.tick6').is(':checked'))
	{
		mortgagePayment = 0;
	}
	 var sumDeath = 0;	
	 
	 var monthlyGap = Number(removeCommaFromNumber(netIncome)) - stateBenefit - mortgagePayment;
	 var overallTermGap = monthlyGap * 12 * Number(termVal);
	 
	  //if single review, not married and have no children lumpum on death is 0 
	 if($('#about-rel option:selected').val() === '2' && !twoLives && $('#radio4').is(':checked')) {
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
	 

	 
	 if ($('.tick6').is(':checked')) {
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
		hideChart.addClass('hidden');
	}	 
	
	else {
		hideInfo.removeClass('hidden');
		fadeInMessage.addClass('hidden');
		hideChart.removeClass('hidden');
	}
	 
	//}
	return sumDeath;

};

//calculate bill pay 
function calcBillPay(existingIncomeProtection,insertBillPayValue, hideInfo, fadeInMessage, whichAge, whichOne, income, proportion, isIP) {
	
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
	}
	
	else {		
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
	if($(whichAge+'age').val() >= 65) {
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
		hideChart.addClass('hidden');
		
	}
	
	
	return specifiedIllSum;

	
};

function isSecondLife()
{
return (($('.range1').val() > 1000 && $('.range5').val() > 1000 && !$("#partner-existing-fields").hasClass('hidden')));
}

//CALL THE FUNCTIONS TO DO CALCULATIONS WHEN GET YOUR RESULT IS CLICKED
$( ".result" ).click(function() {
	
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
	
	//console.log('Calculate for one person');
	lifeCover1=calcDeath($('.output1').html(), ($(".tick2").is(":checked")?"0":$('.output3').html()), $('#lumpsumDeath'), $('.income-gap'), $('#insert-mortgage'), $('.you-info-death'), $('.ifcovered-message'), $('.your-needs-death'), termVal1Life, twoLives);
	sicCover1=calcSpecifiedIll($('.output1').html(), ($(".tick3").is(":checked")?"0":$('.output4').html()), $('#specIll'),$('#salary'),$('.output1').html(),$('.you-info-specIll'), $('.ifcovered-message3'), $('.your-needs-specIll'),'#about-',1);
	billPayCover1=calcBillPay($('#radio11').is(':checked'),$("#billPayCover1Amt1"), $('.you-info-billpay'), $('.ifcovered-message2'),'#about-',1,$('.output1').html(), proportion1, isBrokerVersion);
	//console.log("Your Bill Pay cover is " + billPayCover1);

	
	//this checks if both you and partner have given an income value
	if (isSecondLife()) {
		//console.log('Calculate for two people');
		lifeCover2=calcDeath($('.output5').html(), ($(".tick4").is(":checked")?"0":$('.output6').html()), $('#lumpsumDeathPartner'), $('.income-gap-partner'), $('#insert-mortgage-partner'), $('.partner-info-death'), $('.ifcovered-message-partner'),$('.partner-needs-death'), termVal2Life, twoLives);
		sicCover2=calcSpecifiedIll($('.output5').html(), ($(".tick5").is(":checked")?"0":$('.output7').html()), $('#specIllPartner'),$('#salary-partner'),$('.output5').html(),$('.partner-info-specIll'), $('.ifcovered-message-partner3'),$('.partner-needs-specIll'),'#partner-',2);
		billPayCover2=calcBillPay($('#radio9').is(':checked'),$("#billPayCover1Amt2"),$('.partner-info-billpay'), $('.ifcovered-message-partner2'),'#partner-', 2,$('.output5').html(),proportion2, isBrokerVersion);
		//console.log("Your Partners Bill Pay cover is " + billPayCover2);
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
	
	newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
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
	
	
	
	newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
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
	//console.log('this is where we get the quote results and parse them onto the screen');
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
	time = "";
	
	
	if($('#notSureBefore12').hasClass('pressed')) {
		time = $('#notSureBefore12').html();
	}
	
	if($('#notSure12-5').hasClass('pressed')) {
		time = $('#notSure12-5').html();
	}
	
	if($('#notSureAfter5').hasClass('pressed')) {
		time = $('#notSureAfter5').html();
	}
	
	else if (!$('#notSureBefore12').hasClass('pressed') && !$('#notSure12-5').hasClass('pressed') && !$('#notSureAfter5').hasClass('pressed')) {
		time = null;
	}
	
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
	
    if(isEmail(emailAdd) == false){
        z =z+1;
        $("#notSureEmailError").fadeIn(1000);
    }else{
        $("#notSureEmailError").hide();
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
    emailAdd = $('#talkToUsEmail').val();
    phone = $('#talkToUsPhone').val();
	time = "";
	
	if($('#talkToUsBefore12').hasClass('pressed')) {
		time = $('#talkToUsBefore12').html();
		$("#callTime").html(time);
	}
	
	if($('#talkToUs12-5').hasClass('pressed')) {
		time = $('#talkToUs12-5').html();
		$("#callTime").html(time);
	}
	
	if($('#talkToUsAfter5').hasClass('pressed')) {
		time = $('#talkToUsAfter5').html();
		$("#callTime").html(time);
	}
	
	else if (!$('#talkToUsBefore12').hasClass('pressed') && !$('#talkToUs12-5').hasClass('pressed') && !$('#talkToUsAfter5').hasClass('pressed')) {
		time = null;
	}
	
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
	
    if(isTalkToUsEmail(emailAdd) == false){
        z =z+1;
        $("#talkToUsEmailError").fadeIn(1000);
    }else{
        $("#talkToUsEmailError").hide();
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
        $("#thanks-screen").fadeIn(1000);
		
        //Marketo call
        mkAssociateLeadOnePlan(name,'',emailAdd, phone, time,'Family Protection Planner',$('#about-age').val(),$('#partner-age').val(),$('#lumpsumDeath').html(),$('#lumpsumDeathPartner').html(),$('#totalLifeCoverPrem').html(),$('#billPayCover1Amt1').html(),$('#billPayCover1Amt2').html(),$('#totalBillPayPrem').html(),$('#specIll').html(),$('#specIllPartner').html(),$('#totalSicCoverPrem').html(),$('.term').html(),$('#totalPrem').html())
		
		setGAPageView(window.location.pathname+'/callback-requested','Talk to Us Callback form Protection Planner');
		setGAPageView(window.location.pathname+'/callback-requested-quote','Talk to Us Callback form Protection Planner');
		setSCamPageView(window.location.pathname+'/callback-requested');

    } 
};

//SUBMIT THE FORMS

$("#notSureSubmit").click(function() {
       notSureCallBack();
    });
	
$(".talkToUsSubmit").click(function() {
       talkToUsCallBack();
    });	

})(jQuery);