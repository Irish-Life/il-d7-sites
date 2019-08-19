(function ($) {
//#######################################################
// This is the universal javascript. Nothing should be 
// loaded until everything has been downloaded.
//REMOVE THE SAVE QUOTE STUFF FOR BANK SITES
var ulsterBank = '/pensions/pension-calculator/ub';
var aib = '/pensions/pension-calculator/aib';
var ptsb = '/pensions/pension-calculator/ptsb';
var bankSite;
if( document.location.href.indexOf('ulsterbank') > -1 || 
    document.location.href.indexOf('ub') > -1 || 
	document.location.href.indexOf('aib') > -1 || 
	document.location.href.indexOf('ptsb') > -1 || 
	document.location.href.indexOf('permanenttsb') > -1 ) {
		bankSite = true;
	}
	
	else {
		bankSite =false;
		if (/\d/.test(location.hostname)) {
			bankSite = true;
		}
	}

var chartColours = [
           '#5261ac', 
           '#5582AB', 
           '#A49382'
        ];
var chartYAxisColor	= {"color": "#5261ac"};	
if (document.location.href.indexOf('aib') > -1)
{
chartColours = [
           '#6E2E7A', 
           '#C533A0', 
           '#A8ACB7'
        ];
chartYAxisColor = {"color": "#6E2E7A"};
}
var currentScreen, chart, salary, gender, age, surpassedAmount, targetIncomeMinusState, statePension, currentPension, employeeContribPercent, employerContribPercent,employeeContribAmt, employerContribAmt, targetPercent, delay, targetIncome, retirementAge,extraContributionsRequired;
var annualPension = 0;
var ap = 0;
var premium = 0;
employerContribAmt = 0;
employeeContribAmt = 0;

var quoteIdPresent = false;
// set the defaults for the startup
    currentScreen = 1;
    age = 40; // slider
    salary = "40000"; // input
    salaryInput.value = 40000;
    gender = "male"; // checkbox
    gender = "male"; // checkbox
    statePension = "true"; // slider
    currentPension=0; // input
    employeeContribPercent= 0; // slider
    employerContribPercent=0; // slider
    targetPercent=66; // slider
    delay = 0; // slider

	//CLEAR LOCAL STORAGE AFTER 3 MINUTES
	var expired;
	 var lastclear = localStorage.getItem('lastclear'),
      timeNow  = (new Date()).getTime();

	  // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
	  if ((timeNow - lastclear) > 180000) {
		  //console.log('Local Storage expired');
		  expired = true;
		   localStorage.clear();
	  };


$( document ).ready(function() {

	loadSliders();
	
	if(localStorage.pDataStored != null && amILoggedIn) {
		//CHANGE TO THE FINAL SCREEN HERE SOMEHOW
		$("#splashScreen,.pc-header-banner").hide(function(){
            
            setMKVisitWebPageView(window.location.pathname+'/quote-started');
            setGAPageView('/life-assurance/quote-started','Pension calculator Started - for goals');
            setGAPageView(window.location.pathname+'/quote-started','Pension calculator Started');
            setSCamPageView(window.location.pathname+'/quote-started');
            $("#pension-app").show();
			$('#screenLoadingPage').css('display','none !important');
        });
        scrollToHead(); 
	    localStorageRetrieve();
		$('#screenLoadingPage').css('display','none !important');
		
		}

	//when document is ready
	// check for quoteId param
	// if it exists then attempt to retrieveQuote using this id
	
	$('#statePensionYes').prop("checked", true);

	
	if (gup('quoteId') != '')
	{
		var quoteId = gup('quoteId');
		retrieveQuote(quoteId);
		quoteIdPresent = true;
		//CHANGE TO THE FINAL SCREEN HERE SOMEHOW
		$("#splashScreen,.pc-header-banner").hide(function(){
            
            setMKVisitWebPageView(window.location.pathname+'/quote-started');
            setGAPageView('/life-assurance/quote-started','Pension calculator Started - for goals');
            setGAPageView(window.location.pathname+'/quote-started','Pension calculator Started');
            setSCamPageView(window.location.pathname+'/quote-started');
            $("#pension-app").show();
			$('#screenLoadingPage').css('display','none !important');
        });
        scrollToHead(); 
		$('#screenLoadingPage').css('display','none !important');
	}
    
  // loaded, now show next buttons
    $('.open').fadeIn();
    $(".open").click(function(){
      
	    if (gup('quoteId') == '') {
		$("#screenLoadingPage").css('height', "" + $("#screen1").height() + "px");
		$(".center").css('margin-top', "" + ($("#screen1").height()/2) - 40 + "px");}
		else {
			$('#screenLoadingPage').css('display','none !important');
		}
		
        $("#splashScreen,.pc-header-banner").fadeOut("140",function(){
            
            setMKVisitWebPageView(window.location.pathname+'/quote-started');
            setGAPageView('/life-assurance/quote-started','Pension calculator Started - for goals');
            setGAPageView(window.location.pathname+'/quote-started','Pension calculator Started');
            setSCamPageView(window.location.pathname+'/quote-started');
            $("#pension-app").show();
			
        });
        scrollToHead();
    });
    updateCalculator();
});


     $("#info").click(function(){
     $('#pc-info').modal();
    }); 
    $("#ShowWarnings").click(function(){
      $("#warningsInfo").slideToggle();
    });
    $("#ShowTaxRelief").click(function(){
      $("#TaxReliefInfo").slideToggle();
    });
    $("#ShowAssumptions").click(function(){
      $("#AssumptionsInfo").slideToggle();
    });
    $("#ShowPrivacy").click(function(){
      $("#PrivacyInfo").slideToggle();
    });
    $("#ShowQandA").click(function(){
      $("#QandAInfo").slideToggle();
    });
    $(".get-callback").click(function(){
      $("#nextBtn").click();
    });
    $(".get-callback-broker").click(function(){
				$("#p1Age").html(age);
                $("#p1Salary").html(" €"+addCommas(salary));
                $("#p1EmployeeContribution").html(" €"+addCommas(employeeContribAmt));
                $("#p1EmployerContribution").html(" €"+addCommas(employerContribAmt));
                $("#p1PensionTarget").html(" €"+addCommas(targetIncome)); 
			$("#screen4").hide();
			$("#screen5Broker").show();
    });
    
    // after the user has sent a callback this is the 
    // btn that they click to return to the resutls
    $("#resultsBckBtn").click(function(){
        $("#screen6").fadeOut("500",function(){
            $(".progressImg").fadeIn();
            $("#screen3").fadeIn();
            $("#prevBtn").show();
            $("#callback").show();
        });
    });
    $("#resultsBckBtnBroker").click(function(){
			location.reload();
    });
 

    $( "#pensionCalcAgeSliderOutput" ).html( age );
    
    $("#closeBubble").click(function(){
        $( ".bubble" ).hide();
        $( ".chart-result-holder" ).removeClass('surpassed');
    });

    $("#callback").click(function(){

      setMKVisitWebPageView(window.location.pathname+'/callback-screen');
      setGAPageView(window.location.pathname+'/callback-screen','Pension calculator Callback');
      setSCamPageView(window.location.pathname+'/callback-screen');
      emailInfo();
     
    });
    
    $("#callback-broker").click(function(){
      emailTheBroker();     
    });



// this function monitors the changing of the 
// user salary field
    $('#salaryInput').bind('change keyup', function() {
        var prevSal;
        var mySal = $('#salaryInput').val();
        var regx = /^[0-9]+$/;
        if (!regx.test(mySal)) {
            $('#salaryInput').val(prevSal);
            if(prevSal.length==1){
            $('#salaryInput').val("");
            }
        } else {
            if (mySal > 200000) {
                $('#salaryInput').val("200000");
                prevSal = "200000";
                $('#salaryInputError').show();
                $('#salaryInputError').html("Max is €200,000");
            } else {
                prevSal = mySal;
                $(this).removeClass('error');
                $('#salaryInputError').hide();
            }
        }
        setSalary();
    });
    
setMKVisitWebPageView = function(p){
		try{
			
          mkVisitWebPage(p);
			}
			catch(err){
				//Do nothing
			}
	//return "user set";
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
/*
#######################################
    Update All screen's based on the 
    changes to the global variables like
    age, or salary.
#######################################
*/
updateCalculator = function (){
    // Every screen element to be updated here. 
    // Based on every global var setting

    $( "#pensionCalcEmployeeContributionsSlider" ).slider('value', employeeContribPercent);
    $( "#pensionCalcEmployerContributionsSlider" ).slider('value', employerContribPercent);
    $( "#pensionCalcAgeSlider" ).slider('value', age);
    $( "#pensionCalcTargetSlider" ).slider('value', targetPercent);
    $( "#pensionCalcDelaySlider" ).slider('value', delay);
    $( "#pensionCalcEmployeeContributionsFinalSlider" ).slider('value', employeeContribPercent);

    setSalary();
    setCurrentPension();
}
//#########################################


/*#######################################
    Update the global salary number with
    the value from the input
#######################################*/
setSalary = function(salaryVal){
    salary = $('#salaryInput').val();
    $('.barLineTotalText').html("&euro; "+addCommas(Math.round(salary*(targetPercent/100))));
}
setCurrentPension = function(){
    currentPension = parseInt($('#currentPensionInput').val()) || 0;
}

//################
// List to the switching of the state pension button

$('input:radio[name="statePension"]').change(

    function(){
        if ($(this).is(':checked') && $(this).attr("id") == 'statePensionYes') {
            statePension = "true";
        }
        else {
            statePension = "false";
        }
    }
);

/*
#######################################
    Add commas to the numbers
#######################################
*/


  setRetirementAge = function(age){
    var rAge = 67;
  
    var currentYear = (new Date).getFullYear();
    var currentMonth = (new Date).getMonth();
    var retirementAgeA = 1955;
    var retirementAgeB = 1960; 
    if ((currentYear - age) >= retirementAgeA )
    {
      rAge = 67;
    }
     if ((currentYear - age) >= retirementAgeB )
    {
      if (((currentYear - age) == retirementAgeB)&&(currentMonth<5)) {
        rAge = 67;
      }
      else{
        rAge = 68; 
      }
    }
    retirementAge = rAge;
    return rAge;
  }

loadSliders = function(){
  
         
  var currentYear = (new Date).getFullYear();
    $( "#pensionCalcAgeSlider" ).slider({
        handle: '#slider-handle',range:"min",animate: true,value:0,min: 20,max: 60,step: 1,
        slide: function( event, ui ) {
            $( "#pensionCalcAgeSliderOutput" ).html( ui.value ).addClass("sliderActive");
            $( "#pensionCalcRetirementAgeOutput" ).html(setRetirementAge(ui.value) );
        },
        change: function(e,ui) {
            age = ui.value;
            $( "#pensionCalcRetirementAgeOutput" ).html(setRetirementAge(ui.value) );
            $( "#pensionCalcAgeSliderOutput" ).html( ui.value );
            
        },
        start: function(e,ui){
            $( "#pensionCalcAgeSliderOutput" ).html( ui.value );
            $( "#pensionCalcRetirementAgeOutput" ).html(setRetirementAge(ui.value) );
        },
        stop: function(e,ui){
            age = ui.value; // set the global age var
           // hideLargeOutput();
            $( "#pensionCalcAgeSliderOutput" ).html( ui.value ).removeClass("sliderActive");
            $( "#pensionCalcRetirementAgeOutput" ).html(setRetirementAge(ui.value) );
        }
        

    });
    
     
/*
#######################################################################
    Your Contributions Slider [SCREEN 1]
#######################################################################
*/
    $( "#pensionCalcEmployeeContributionsSlider" ).slider({

        handle: '#slider-handle',range:"min",animate: true,value:0,min: 0,max: 25,step: 1,
        slide: function( event, ui ) {
            var outterAnnual = addCommas(Math.round((ui.value/100)*salary));
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            
            $( "#pensionCalcEmployeeContributionsSliderOutput" ).html("&euro; "+outterMonth ).addClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsSliderOutputSubA" ).html( ui.value +"% of your salary" ).addClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsSliderOutputSubB" ).html( "Annually: &euro; "+outterAnnual ).addClass("sliderActive");
        },
        change: function (e,ui){
            // Use the change function to update the values on the screen.
            // When called programatically it triggers this change event.
            var outterAnnual = addCommas(Math.round((ui.value/100)*salary));
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            
            $( "#pensionCalcEmployeeContributionsSliderOutput" ).html("&euro; "+outterMonth ).removeClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsSliderOutputSubA" ).html( ui.value +"% of your salary" ).removeClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsSliderOutputSubB" ).html( "Annually: &euro; "+outterAnnual ).removeClass("sliderActive");
        },
        start: function(e,ui){
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            $( "#pensionCalcEmployeeContributionsSliderOutput" ).html("&euro; "+outterMonth );
        },
        stop: function(e,ui){
            employeeContribPercent = ui.value; // set the global employee contribution percenta value
            employeeContribAmt = Math.round( (employeeContribPercent /1200) * salary);
        }
    });
    
    
    
    $( "#pensionCalcEmployerContributionsSlider" ).slider({
        handle: '#slider-handle',range:"min",animate: true,value:0,min: 0,max: 25,step: 1,
        slide: function( event, ui ) {
        
            var outterAnnual = addCommas(Math.round((ui.value/100)*salary));
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            $( "#pensionCalcEmployerContributionsSliderOutput" ).html("&euro; "+ outterMonth ).addClass("sliderActive");
            $( "#pensionCalcEmployerContributionsSliderOutputSubA" ).html( ui.value +"% of your salary" ).addClass("sliderActive");
            $( "#pensionCalcEmployerContributionsSliderOutputSubB" ).html( "Annually: &euro; "+outterAnnual ).addClass("sliderActive");
            
           // updateLargeOutput("&euro;"+outterMonth);
        },
        change: function (e,ui){
            // Use the change function to update the values on the screen.
            // When called programatically it triggers this change event.
            var outterAnnual = addCommas(Math.round((ui.value/100)*salary));
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            $( "#pensionCalcEmployerContributionsSliderOutput" ).html("&euro; "+outterMonth ).removeClass("sliderActive");
            $( "#pensionCalcEmployerContributionsSliderOutputSubA" ).html( ui.value +"% of your salary" ).removeClass("sliderActive");
            $( "#pensionCalcEmployerContributionsSliderOutputSubB" ).html( "Annually: &euro; "+outterAnnual ).removeClass("sliderActive");
            
            $('#pensionCalcEmployeeContribOutputFinal').html("&euro; "+outterMonth);
            
            // How to call it...
            // $( "#pensionCalcEmployerContributionsSlider" ).slider('value', 3);
        },
        start: function(e,ui){
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            //updateLargeOutput("&euro;"+outterMonth);
             
        },
        stop: function(e,ui){
            //hideLargeOutput();
            employerContribPercent = ui.value; // set the global employee contribution percenta value
            employerContribAmt = Math.round( (employerContribPercent /1200) * salary);
        }
    });

   /*#####################################################################################
        This is the target slider on screen 2
    #####################################################################################
    */
    
    $( "#pensionCalcTargetSlider" ).slider({
        handle: '#slider-handle',range:"min",animate: true,value:0,min: 20,max: 100,step: 1,
        slide: function( event, ui ) {        
        
            var outterTarget = addCommas(Math.round((ui.value/1200)*salary));
            var outterTargetAnn = addCommas(Math.round((ui.value/100)*salary));
            $('#pensionCalcTargetSliderOutput').html("&euro; "+outterTarget + " per month, in today's terms").addClass("sliderActive");
            
            $( "#pensionCalcTargetSliderOutputSubA" ).html( ui.value +"% of your salary" ).addClass("sliderActive");
            $( "#pensionCalcTargetSliderOutputSubB" ).html( "Annually: &euro; "+outterTarget ).addClass("sliderActive");
            $( "#pensionCalcTargetSliderOutputSubB" ).html( "Annually: &euro; "+outterTargetAnn).addClass("sliderActive");
            
            //updateLargeOutput("&euro;"+outterTarget);
        },
        change: function(e,ui){
            var outterTarget = addCommas(Math.round((ui.value/1200)*salary));
            var outterTargetAnn = addCommas(Math.round((ui.value/100)*salary));
            
            targetPercent = ui.value;
            targetIncome = (targetPercent*salary)/100;
            $('#pensionCalcTargetSliderOutput').html("&euro; "+outterTarget + " per month, in today's terms").removeClass("sliderActive");
            
            $( "#pensionCalcTargetSliderOutputSubA" ).html( ui.value +"% of your salary" ).removeClass("sliderActive");
            $( "#pensionCalcTargetSliderOutputSubB" ).html( "Annually: &euro; "+outterTarget ).removeClass("sliderActive");
            $( "#pensionCalcTargetSliderOutputSubB" ).html( "Annually: &euro; "+outterTargetAnn).removeClass("sliderActive");
            $( ".pensionCalcTargetSetOutput" ).html( "&euro;"+outterTargetAnn+" per year");
        },
        start: function(e,ui){
            var outterTarget = addCommas(Math.round((ui.value/1200)*salary));
            var outterTargetAnn = addCommas(Math.round((ui.value/100)*salary));
            
            $('#pensionCalcTargetSliderOutput').html("&euro; "+outterTarget + " per month, in today's terms");
            $( "#pensionCalcTargetSliderOutputSubA" ).html( ui.value +"% of your salary" );
            $( "#pensionCalcTargetSliderOutputSubB" ).html( "Annually: &euro; "+outterTargetAnn);

         //   updateLargeOutput("&euro;"+outterTarget);
            $( ".pensionCalcTargetSetOutput" ).html( "&euro;"+outterTargetAnn+" per year");
        },
        stop: function(e,ui){
             $('#pensionCTSliderEmployerConResult').css('background-color','#fff');
             $('#pensionCTSliderEmployerConResult').css('color','#82a623');
            targetPercent = ui.value;
            targetIncome = (targetPercent*salary)/100;
         //   hideLargeOutput();
        }
    });


    /*
    #####################################################################################
        On screen 3 are the last 2 sliders, one for delay and one for the employee
        contributions which has already been set. Keep these 2 in sync.
    #####################################################################################
    */
    $( "#pensionCalcDelaySlider" ).slider({
        handle: '#slider-handle',range:"min",animate: true,value:delay,min: 0,max: 15,step: 1,
        slide: function( event, ui ) {
            delay = Math.floor(ui.value);
            if (delay == 0)
            {
                $( "#pensionCalcDelaySliderOutput" ).html("TODAY").addClass("sliderActive");
                $( "#pensionCalcDelayAgeSliderOutput" ).html("Your age: "+age).addClass("sliderActive");
           //     updateLargeOutput("TODAY");
            }
            else{
                $( "#pensionCalcDelaySliderOutput" ).html("In "+delay+" years").addClass("sliderActive");
                $( "#pensionCalcDelayAgeSliderOutput" ).html("Your age: "+(delay+age)).addClass("sliderActive");
            //    updateLargeOutput(delay+" years");
            }
            
        },
        start: function(e,ui){
       //     showLargeOutput();
        },
        change: function(e,ui){
            delay = Math.floor(ui.value);
            if (delay == 0)
            {
                $( "#pensionCalcDelaySliderOutput" ).html("TODAY").removeClass("sliderActive");
                $( "#pensionCalcDelayAgeSliderOutput" ).html("Your age: "+age).removeClass("sliderActive");
            }
            else{
                $( "#pensionCalcDelaySliderOutput" ).html("In "+delay+" years").removeClass("sliderActive");
                $( "#pensionCalcDelayAgeSliderOutput" ).html("Your age: "+(delay+age)).removeClass("sliderActive");
            }
        },
        stop: function(e,ui){
             annualPensionQuote();
        }
    });
    
    $( "#pensionCalcEmployeeContributionsFinalSlider" ).slider({
        handle: '#slider-handle',range:"min",animate: true,value:employeeContribPercent,min: 0,max: 25,step: 1,
        slide: function( event, ui ) {
            var outterAnnual = addCommas(Math.round((ui.value/100)*salary));
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            
            $( "#pensionCalcEmployeeContributionsFinalSliderOutput" ).html("&euro; "+outterMonth ).addClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsFinalSliderOutputSubA" ).html( ui.value +"% of your salary" ).addClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsFinalSliderOutputSubB" ).html( "Annually: &euro; "+outterAnnual ).addClass("sliderActive");
            $( "#pensionCalcTotalContribOutputFinal").html("&euro; "+Math.round(parseInt(employerContribAmt)+parseInt(outterMonth.replace(/,/g,'')))).addClass("sliderActive");
                // updateLargeOutput("&euro;"+outterMonth);
				//alert('hello '+employerContribAmt);
        },
        change: function (e,ui){
            // Use the change function to update the values on the screen.
            // When called programatically it triggers this change event.
            var outterAnnual = addCommas(Math.round((ui.value/100)*salary));
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            
            $( "#pensionCalcEmployeeContributionsFinalSliderOutput" ).html("&euro; "+outterMonth ).removeClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsFinalSliderOutputSubA" ).html( ui.value +"% of your salary" ).removeClass("sliderActive");
            $( "#pensionCalcEmployeeContributionsFinalSliderOutputSubB" ).html( "Annually: &euro; "+outterAnnual ).removeClass("sliderActive");
            
            $( "#pensionCalcTotalContribOutputFinal").html("&euro; "+Math.round(parseInt(employerContribAmt)+parseInt(outterMonth))).removeClass("sliderActive");
            
            // How to call it...
            // $( "#pensionCalcEmployeeContributionsFinalSlider" ).slider('value', 3);
        },
        start: function(e,ui){
            $('#placeholderOverlay').show();
          //  setSalary();
          //  showLargeOutput();
            
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            $( "#pensionCalcEmployeeContributionsFinalSliderOutput" ).html("&euro; "+outterMonth );
            $( "#pensionCalcTotalContribOutputFinal").html("&euro; "+Math.round(parseInt(employerContribAmt)+parseInt(outterMonth.replace(/,/g,''))));
         //   updateLargeOutput("&euro;"+outterMonth);
             
        },
        stop: function(e,ui){
         //   hideLargeOutput();
            var outterMonth = addCommas(Math.round((ui.value/1200)*salary));
            employeeContribPercent = ui.value; // set the global employee contribution percenta value#
            employeeContribAmt = Math.round( (employeeContribPercent /1200) * salary);
             $( "#pensionCalcTotalContribOutputFinal").html("&euro; "+Math.round(parseInt(employerContribAmt)+parseInt(outterMonth.replace(/,/g,'')))).removeClass("sliderActive");;
             $( "#pensionCalcEmployeeContributionsSlider" ).slider('value', employeeContribPercent);
             annualPensionQuote();
         //    updateChartData();
        }
    });
}

    $('#nextBtn').click(function(){
      $(this).addClass('pc-btn-lock');
      
        if (currentScreen < 5) {
           // lockScreen(); // overlay to prevent user clicking buttons
            if (currentScreen == 1){
                if(salary < 15000) {
                    $('#salaryInput').addClass('error');
                    $('#salaryInputError').show();
                    $('#salaryInputError').html("Please enter salary. Min 15,000");
                } else{
                  
                    changeButtonsNext(currentScreen);
                    
                $('.meter-value').css("width","50%");
                $('.circle-2').addClass('selected');
                
                    // currentScreen number is now set to screen we want to display
                    changeScreen(currentScreen);
                    $('#salaryInput').removeClass('error');
                    $('#salaryInputError').hide();
                    $('#salaryInputError').html('');
                }
            } else if(currentScreen == 2) {
              $('.meter-value').css("width","100%");
                $('.circle-3').addClass('selected');
				
                // currentScreen number is now set to screen we want to display
                changeScreen("LoadingPage");
            } else if(currentScreen == 3) {

              $('.meter-value').css("width","100%");
      
                changeButtonsNext(currentScreen);
                changeScreen(currentScreen);
            }
            else if(currentScreen == 4) {

              $('.meter-value').css("width","100%");
      
                changeButtonsNext(currentScreen);
                changeScreen(currentScreen);
            }            
            else {
                // //console.log("currentScreen33: "+currentScreen);
            }
        } 
        updateCalculator();
    });

    $('#prevBtn').click(function(){
		$('#save-bar').hide();
		$('#need-login-bar').hide();
		$('#quote-saved-bar').hide();
		

      // make the button work again for these few screen
      $('#nextBtn').removeClass('pc-btn-lock');
        if (currentScreen >1)
        {
            // lockScreen(); // overlay to prevent user clicking buttons
            
            var nowScreen = currentScreen;
            //changeSliderPrevious(nowScreen);
            changeButtonsPrev(nowScreen);
            if (currentScreen == 1){
                $(this).addClass("disable");
              $('.meter-value').css("width","0%");
                $('.circle-2').removeClass('selected');
                $('.circle-3').removeClass('selected');
            }else{
              $('.meter-value').css("width","50%");
                $('.circle-2').addClass('selected');
                $('.circle-3').removeClass('selected');
                $(this).removeClass("disable");
                $('#nextBtn').removeClass("disable");
            }
             if (currentScreen == 3){
              $('.meter-value').css("width","100%");
                $('.circle-3').addClass('selected');
            }
            // currentScreen number is now set to screen we want to display
            changeScreen(currentScreen); 
        }
    });

changeScreen = function (showScreen){

    // take in the current screen being displayed and 
    // change to the next screen if possible
    // Update the bar chart straight after the screen has been drawn.
    // This is because heights are based on % and the screen needs to 
    // be in place before we can add the chart.
    
    ////console.log(showScreen);
    if(showScreen == "LoadingPage"){
      
      $(this).addClass('pc-btn-lock');
        $('#screen2').fadeOut("500",function(){
			if (gup('quoteId') == '') {
			$("#screenLoadingPage").hide();}
			else{
          $("#screenLoadingPage").fadeIn("1000");
			}
			
        });

        createChart();
        premiumQuote();
        annualPensionQuote();
		
        setGAPageView('/life-assurance/quote-completed','Pension calculator Quote completed - for goals');
        setGAPageView(window.location.pathname+'/quote-completed','Pension calculator Quote completed');
        setSCamPageView(window.location.pathname+'/quote-completed');
        
    } else {
      $('.meter-wrap').show();
	    $('#screen1, #screen2, #screen3, #screen4, #screen5, #screen5Broker').hide();
        if(showScreen == "3" && amILoggedIn){
			//console.log("third screen logged In");
            //$("#screenLoadingPage").fadeOut("500",function(){
              $("#screenLoadingPage").hide();
			  $('#screen'+showScreen).fadeIn("1000");	
			  	 if (bankSite == true) {
			          //console.log('You are on a bank site');
	                  $('#save-bar').hide();
		              }
					else {
						$('#save-bar').fadeIn('slow');
						$('#quote-saved-bar').hide();
						  }
			  
            //});
			

            //$('.progress1, .progress2, .progress3, .progress4').hide();
            //$('.progress'+showScreen).show();

            $('#callback').hide();
            $('#nextBtn').show();

        }
		
		else if(showScreen == "3" && !amILoggedIn) {
			//console.log("third screen not logged In");
            //$("#screenLoadingPage").fadeOut("500",function(){
			  $("#screenLoadingPage").hide();
              $('#screen'+showScreen).fadeIn("1000");	
			  if (bankSite == true)  {
			          //console.log('You are on a bank site');
	                  $('#need-login-bar').hide();
		              }
					else {
						$('#need-login-bar').fadeIn('slow');
						  }
			 
			 
            $('#callback').hide();
            $('#nextBtn').show();
			
		//});
		}

		else {
            $('#screen'+showScreen).fadeIn();

            //$('.progress1, .progress2, .progress3, .progress4').hide();
            //$('.progress'+showScreen).show();


            if(showScreen>1){
                $('#prevBtn').show();
            }
            else{
                $('#prevBtn').hide();
            }

            if(showScreen == "4"){
                 $('#nextBtn').hide();
                 $('.meter-wrap').hide();
				 	if (!quoteIdPresent) {
					$('#save-btn-container').fadeOut('slow');
				}
			
            }
            else if(showScreen == "5"){
                 $('.meter-wrap').hide();
                $("#p1Age").html(age);
                $("#p1Salary").html(" €"+addCommas(salary));
                $("#p1EmployeeContribution").html(" €"+addCommas(employeeContribAmt));
                $("#p1EmployerContribution").html(" €"+addCommas(employerContribAmt));
                $("#p1PensionTarget").html(" €"+addCommas(targetIncome)); 
                
                 //$('.progress3').show();
                 $('#callback').show();
                 $('#nextBtn').hide();
            } else{
                $('#callback').hide();
                $('#nextBtn').show();
                  // make the button work again for these few screen
                $('#nextBtn').removeClass('pc-btn-lock');
            }
            

        }
        
    }

	setMKVisitWebPageView(window.location.pathname+'/show-screen-'+showScreen);
	setGAPageView(window.location.pathname+'/show-screen-'+showScreen,'Pension calculator Screen ' + showScreen);
  setSCamPageView(window.location.pathname+'/show-screen-'+showScreen);
	
	scrollToHead();
}
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

scrollToHead = function() {

	if ($("page-title").offset() != undefined)
	 $('html, body').animate({
        scrollTop: $("#page-title").offset().top
    }, 500);
}

changeButtonsNext = function (cs){
    // take in the current screen being displayed and 
    // depending on what the next screen is update the 
    // buttons being displayed [prev], [next] etc...
    // also update the button rel info 
    var newCurentScreen = Number(cs)+1;
    currentScreen = newCurentScreen;
}
changeButtonsPrev = function (cs){
    // take in the current screen being displayed and 
    // depending on what the next screen is update the 
    // buttons being displayed [prev], [next] etc...
    // also update the button rel info 
    var newCurentScreen = Number(cs)-1;
    currentScreen = newCurentScreen;
}


var statePerInput,contribPerInput,shortfallPerInput,
    stateAmtInput,contribAmtInput,shortfallAmtInput,
    statePerOutput,contribPerOutput,shortfallPerOutput,
    stateAmtOutput,contribAmtOutput,shortfallAmtOutput;

function premiumQuote(){
    chart.showLoading();
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    
    newScript.type = 'text/javascript';
    newScript.onload= premiumResults;
    var delayedAge = age + delay;

    if(statePension === "true") {
        stateAmtInput = 11976;
    } else {
        stateAmtInput = 0;
    }

    targetIncomeMinusState = parseInt(targetIncome) - parseInt(stateAmtInput);
    var params = "type=6&freq=Y&age="+ delayedAge +"&income="+ salary+"&ret="+retirementAge+"&target="+targetIncomeMinusState+"&sp="+currentPension;

    if(navigator.appVersion.indexOf("MSIE 8.")!=-1){
        $.getScript( 'https://www.irishlife.ie/secure/submitPensionQuote.js?'+ params, premiumResults );
    }
    else if (navigator.appVersion.indexOf("MSIE 7.")!=-1) {
        $.getScript( 'https://www.irishlife.ie/secure/submitPensionQuote.js?'+ params, premiumResults );
    }
    else{
        newScript.src = 'https://www.irishlife.ie/secure/submitPensionQuote.js?' + params;
        headID.appendChild(newScript);
    }
}

function premiumResults() {
    var temp = new Array();
    var reggie = /=|&/;
    temp = result.split(reggie)
    premium = parseInt(temp[1]);
    addData();
}


function annualPensionQuote(){
    chart.showLoading();
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    
    newScript.type = 'text/javascript';
    newScript.onload= annualPensionResults;

    ap = employerContribAmt + employeeContribAmt;
    var delayedAge = age + delay;
    var params = "";

    if (ap==0){
       ap = 1;
    }

     params = "type=5&freq=M&age="+ delayedAge +"&income="+ salary+"&ret="+retirementAge+"&ap="+ ap+"&sp="+currentPension;


    if(navigator.appVersion.indexOf("MSIE 8.")!=-1){
        $.getScript( 'https://www.irishlife.ie/secure/submitPensionQuote.js?'+ params, annualPensionResults );
    }
    else if (navigator.appVersion.indexOf("MSIE 7.")!=-1) {
        $.getScript( 'https://www.irishlife.ie/secure/submitPensionQuote.js?'+ params, annualPensionResults );
    }
    else{
        newScript.src = 'https://www.irishlife.ie/secure/submitPensionQuote.js?' + params;
        headID.appendChild(newScript);
    }


}

function annualPensionResults(){
    var temp = new Array();
    var reggie = /&/;
    temp = result.split(reggie);

    for (var i = 0; i < temp.length; i++) {
        var temp2 = temp[i].split(/=/);
        if(temp2[0] == "annualPension" ){
            annualPension = parseInt(temp2[1]);
        }
    };

    addData();
}


function createChart () {
    var options = {
        chart: {
            backgroundColor: 'rgba(0,0,0,0)',
            renderTo: 'chartContainer',
            type: 'column'
        },
		
				
        loading: {
            labelStyle: {
                top: '45%'
            }
        },

        colors: chartColours,

        title: {
            text: ''
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Target Pension',
				style: chartYAxisColor
            }
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.2f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Shortfall',
            data: [extraContributionsRequired]
        }, {
            name: 'Covered By You',
            data: [annualPension]
        }, {
            name: 'Covered By State',
            data: [stateAmtInput]
        }]
    };
    chart = new Highcharts.Chart(options);
}

function addData(){
	
    surpassedAmount = 0;
    var premiumPerMonth = parseInt((premium/12).toFixed(2));
	////console.log('addData '+premium);
    surpassedAmount = ap - premiumPerMonth;

    if (surpassedAmount > 0) {
        //target is surpassed
        $( ".bubble" ).fadeIn();
        $( ".chart-result-holder" ).addClass('surpassed');
        
        $('#p1PensionGap').html(" €" + addCommas(surpassedAmount));
        $('#gapPer').html(" (Surplus per month)");
        
        $("#surpassedAmount").html(" €" + addCommas(surpassedAmount ));
        $("#pensionCalcExpectedTotalOutputFinal").html(" €" + addCommas(targetIncome) + " per year");
    } else {
        $( ".chart-result-holder" ).removeClass('surpassed');
        //target is still not surpassed
        $('#p1PensionGap').html(" €" + addCommas( Math.round(targetIncome - (annualPension + stateAmtInput))));
        $('#gapPer').html(" (per year)");
       $("#pensionCalcExpectedTotalOutputFinal").html(" €" + addCommas(annualPension + stateAmtInput) + " per year");
       $( ".bubble" ).fadeOut();
    }

    chart.series[0].setData([targetIncomeMinusState - annualPension]);
    chart.series[1].setData([annualPension]);
    chart.series[2].setData([stateAmtInput]);
    chart.hideLoading();

      $('#nextBtn').delay(1200).queue(function() {
                           $(this).removeClass("pc-btn-lock");
                           $(this).dequeue();
                       });
     if(currentScreen == 2) {
        changeButtonsNext(currentScreen);
        changeScreen(currentScreen);
     }
   
};

function emailTheBroker() {
 
	var brokerId = gup('brokerId');
    var extraInforForEmail = 
      "\n\nName: " + $("#nameBR").val() +
      "\n\nPhone: " + $("#telephoneBR").val() +	  	
	  "\n\nEmail: " + $("#emailBR").val() +	  	
      "\n\nSalary/income: " + salary +
      "\n\nAge: " + age +
      "\nCurrent Pension: " + currentPension +
      "\nState Pension: " + statePension +
      "\nEmployee Contribution :" + employeeContribAmt + 
      "\nEmployer Contribution:" + employerContribAmt;

    extraInforForEmail = extraInforForEmail + "\n\n#### QUOTE ####\nEuro: " + addCommas( employeeContribAmt )//prmLev
    + "\n\n#### IMPORTANT ####\nThis quote is valid for 7 days.";		
    if ($("#telephoneBR").val().length >=7 && $("#telephoneBR").val().length <=20 && $("#nameBR").val() !="" ) {
        $('#phoneBRError, #nameBRError').fadeOut();  
        function be(){}
        function se(){}
        function ee(){}


		var URL = "https://www.irishlife.ie/myonlineservices/servlet/submitForm.do";
		var params = "type=PENSION%20CALCULATOR&detail="+extraInforForEmail+"&from=DO-NOT-REPLY@irishlife.ie&contactUserID="+brokerId;
		/*
		Send the broker email
		*/
		$.ajax({
			type: 'POST',
			url: URL,
			async: true,
			data: params,
			beforeSend: be,
			success: se,
			error: ee,
			timeout: 200000
		});
        $("#screen5Broker").fadeOut("500",function(){
            $("#prevBtn").hide();
            $("#callback").hide();
            $(".progressImg").hide();
            $("#screen6Broker").fadeIn("1000");
        });
		
    }
    else {
			//error
           $('#phoneBRError, #nameBRError').fadeOut();
      
        if ($("#telephoneBR").val().length > 7 && $("#telephone").val().length <=20){
            $('#phoneBRError').fadeOut();
          }else{
            $('#phoneBRError').fadeIn();
            }
        if ($("#nameBR").val() =="" || $("#nameBR").val() == "Enter your name"){
            $('#nameBRError').fadeIn();
          }
          else{
            $('#nameBRError').fadeOut();
          }
    }
    return false;
};

function emailInfo() {
 
    var extraInforForEmail;
    timestamp=Number(new Date());
    
    extraInforForEmail = 
      "\n\nSalary/income: " + salary +
      "\n\nAge: " + age +
      "\nCurrent Pension: " + currentPension+
      "\nState Pension: " + statePension+
      "\nEmployee Contribution :" + employeeContribAmt+ "("+ employeeContribPercent +")" +
      "\n Employer Contribution:" + employerContribAmt+ "("+ employerContribPercent +")";

    extraInforForEmail = extraInforForEmail + "\n\n#### QUOTE ####\nEuro: " + addCommas( employeeContribAmt )//prmLev
    + "\n\n#### IMPORTANT ####\nThis quote is valid for 7 days.";

    if ($("#telephone").val().length >=7 && $("#telephone").val().length <=20 && $("#name").val() !="" ) {
      ////console.log($("#name").val()+' start email stuff '+$("#telephone").val());
        $('#phoneError').fadeIn();
        $('#nameError').fadeIn();
            
        var titleextra = "Term Assurance";
        var trackpageurl = window.location.pathname;
        
        if( typeof product != 'undefined' ){  
            if ( product=="wholeoflife" ){ 
                titleextra = "Whole of Life";
            } 
            else if ( product=="mortgageprotection" ){ 
                titleextra = "Mortgage Protection";
            }
        }
        
        var emailAddress = 'N/A';
        if ($("#email").val()){
            emailAddress = $("#email").val();
        }
        
        /*sendClickToCallback (
            'Q',
            ''+$("#name").val(),
            ''+$("#telephone").val(),
            emailAddress,
            ''+$('#callTime').val(),
            titleextra+' - PROCESS COMPLETE (time: '+timestamp+')',
            extraInforForEmail,
            be,
            se,
            ee
        );*/

        function be(){}
        function se(){}
        function ee(){}
        var quoteType = "T";
        if ( $("#email").val() ) {
           mkAssociateLeadPensionQuote(''+ $("#name").val(),'NULL' , emailAddress, ''+$("#telephone").val(), age, salary, employerContribAmt, Math.round(targetIncome - (annualPension + stateAmtInput)), 68, currentPension, targetIncome, employeeContribAmt,""+$("#callTime").val());
        }
        $("#screen5").fadeOut("500",function(){
            $("#prevBtn").hide();
            $("#callback").hide();
            $(".progressImg").hide();
            $("#screen6").fadeIn("1000");
        });

			setMKVisitWebPageView(window.location.pathname+'/callback-requested');
			setGAPageView(window.location.pathname+'/callback-requested','Pension calculator callback requested');
            setSCamPageView(window.location.pathname+'/callback-requested');
			
    }
    else {
      
            $('#phoneError, #nameError').fadeOut();
      ////console.log('Errors shown');
        if ($("#telephone").val().length > 7 && $("#telephone").val().length <=20){
            $('#phoneError').fadeOut();
          }else{
            $('#phoneError').fadeIn();
            }
        if ($("#name").val() =="" || $("#name").val() == "Enter your name"){
            $('#nameError').fadeIn();
          }
          else{
            $('#nameError').fadeOut();
          }
    }
    return false;
};

/*
 ======================= =======================  =======================  =======================
                                                                             SAVE & RETRIEVE QUOTE                                                                            
 ======================= =======================  =======================  =======================
*/ 

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

var saveQuote;
var totalContributions = $('#pensionCalcTotalContribOutputFinal').html();
var cookie = 0;
			
//console.log('this is working');	
	
function triggerScreen() {

		currentScreen = 1;
        changeButtonsNext(currentScreen);                    
		$('.meter-value').css("width","50%");
		$('.circle-2').addClass('selected');                
		// currentScreen number is now set to screen we want to display
		changeScreen(currentScreen);
		$('#salaryInput').removeClass('error');
		$('#salaryInputError').hide();
		$('#salaryInputError').html('');
			
        $('.meter-value').css("width","100%");
        $('.circle-3').addClass('selected');
        changeScreen("LoadingPage");
		$('#screenLoadingPage').css('display','none!important');
}
	
	
//WHEN SAVE IS CLICKED BUILD UP A STRING AND SEND IT TO JOE	
function savingQuote() {	

     //build up the string
	 saveQuote = 'typeOfQuote=30&quoteData=Type=PensionCalc' +
		 '-' + salary + 
		 '-' + currentPension + 
		 '-' + age + 
		 '-' + employeeContribPercent +
		 '-' + employerContribPercent +
		 '-' + statePension +
		 '-' + targetPercent +
		 '-' + delay +
		 '-' + $('#targetPensionVal').html() +
		 '-' + $( "#pensionCalcRetirementAgeOutput" ).html() +
		 '-' + $('#pensionCalcExpectedTotalOutputFinal').html();
		  
	
    $.ajax({
	type: "GET",
	url: "/myonlineservices/ClientB2CQuotes/StoreQuote?"+saveQuote,
	async: true,
	success: function(response){
		setGAPageView(window.location.pathname+'/quote-saved','Pension Calculator Quote Saved');
		//show saved message
		// what has joes url sent back?
			//console.log("response is " + response);
			//console.log("Quote Data being sent is=" + saveQuote);
				$('#save-bar').fadeOut('slow');
				$('#quote-saved-bar').fadeIn('slow');
				localStorage.clear();
			
	
		// also show ID reference
		// if not true then say boo hoo
		// 
	},
	error: function(){alert("error message");},
	timeout: 300000
	});

};

function localStorageSave() {
	
	//console.log('Saving to local storage');
	
		localStorage.pDataStored = 'true';
		
		localStorage.setItem('lastclear', timeNow);
		
		localStorage.totalOutput= $('#pensionCalcExpectedTotalOutputFinal').html();
		localStorage.targetPension = $('#targetPensionVal').html();
		localStorage.totalContributions = $('#pensionCalcTotalContribOutputFinal').html();

		localStorage.salary = salary;
		localStorage.currentPension = currentPension;
		localStorage.age = age;
		localStorage.employeeContribPercent = employeeContribPercent;
		localStorage.employerContribPercent = employerContribPercent;
		localStorage.statePension = statePension;
		localStorage.targetPercent = targetPercent;
		localStorage.delay = delay;
		
}

function localStorageRetrieve() {
	
	//console.log('Retrieving from local storage');
	
	    salary = localStorage.salary;
	    employeeContribPercent = localStorage.employeeContribPercent;
		employerContribPercent =localStorage.employerContribPercent 
		currentPension = localStorage.currentPension ;
		statePension = localStorage.statePension;
		targetPercent = localStorage.targetPercent;
		delay = localStorage.delay;
	    
		employerContribAmt = (salary*employerContribPercent)/1200;
		employeeContribAmt = (salary*employeeContribPercent)/1200;
		//alert('here '+salary+ " "+employerContribPercent+" " + employerContribAmt);
		// set all the variables on the screen
		$('#salaryInput').val(salary);
		$('#currentPensionInput').val(currentPension);
		
		 if(statePension === 'true') {
			$('#statePensionYes').attr("checked", true);
			//console.log('State pension should be set to yes');
		}
			
		else {
			//$('input:radio[name="statePension"]').trigger('change', function() {
			$('#statePensionNo').attr("checked", true);
			//console.log('State pension should be set to no');
			//});
	    }
		
		//$('#pensionCalcTotalContribOutputFinal').html(totalContributions);
		// need to trigger chart & total contributions
		
		
		 $( "#pensionCalcTotalContribOutputFinal").html("&euro; "+Math.round(salary*(Math.round((parseInt(employeeContribPercent)+parseInt(employerContribPercent))))/1200));

		 updateCalculator();
	     triggerScreen();
		 
		 
		  $('#save-bar').fadeIn('slow');		
	
}


//if logged in and selecting a saved quote get the values from the string and put back into the calculator
function retrieveQuote(quoteId) {
	
	//console.log('retrieving quote ' + quoteId);
	//IF LOGGED IN
	//on page load get VARs 
	
       $.ajax({
        type:'GET',
        url:"/myonlineservices/ClientB2CQuotes/getspecificquotejson?quoteId="+quoteId,		
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
		
		salary = partsArray[1];
		//console.log(salary + ' 1 Annual Salary');

		currentPension = partsArray[2];
		//console.log(currentPension + ' 2 Current Pension Value');
		
		age = partsArray[3];
		//console.log(age + ' 3 Your Age');
		
		employeeContribPercent = partsArray[4];
		//console.log(employeeContribPercent + ' 4 Your contributions');
		
		employerContribPercent = partsArray[5];
		//console.log(employerContribPercent + ' 5 % of your salary ');
		
		statePension = partsArray[6]
		//console.log(statePension + ' State Pension');

		targetPercent = partsArray[7];
		//console.log(targetPercent + ' 8 pension target amt');
		
		delay = partsArray[8];
		//console.log(delay + ' 9 start from when');	

		employerContribAmt = (salary*employerContribPercent)/1200;
		employeeContribAmt = (salary*employeeContribPercent)/1200;
		//alert('here '+salary+ " "+employerContribPercent+" " + employerContribAmt);
		// set all the variables on the screen
		$('#salaryInput').val(salary);
		$('#currentPensionInput').val(currentPension);
		
		
		if(statePension === 'true') {
			$('#statePensionYes').attr("checked", true);
			//console.log('State pension should be set to yes');
		}
			
		else {
			//$('input:radio[name="statePension"]').trigger('change', function() {
			$('#statePensionNo').attr("checked", true);
			//console.log('State pension should be set to no');
			//});
	    }
		
		//$('#pensionCalcTotalContribOutputFinal').html(totalContributions);
		// need to trigger chart & total contributions
		
		
		 $( "#pensionCalcTotalContribOutputFinal").html("&euro; "+Math.round(salary*(Math.round((parseInt(employeeContribPercent)+parseInt(employerContribPercent))))/1200));

		 updateCalculator();
	     triggerScreen();

				// Display the thumbnails on the page
		},
    });
	
};


$("#login-register").click(function()  {
	$('#login-modal').modal({
		overlayClose: true,
	});
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
})(jQuery);
