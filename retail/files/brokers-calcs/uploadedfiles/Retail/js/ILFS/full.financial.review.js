var test = false;
var p1Name = "";
var p2Name = "";
var p1Day, p2Day = 25;
var p1Month, p2Month = 3;
var p1Year, p2Year = 1960;
var p1Gender = "male";
var p1Marital, p2Marital = "married";
var p1Smoker, p2Smoker = "N";
var p1Occupation, p2Occupation;
var p1OccupationStatus, p2OccupationStatus;
var p1Welfare, p2Welfare = 0.0;
var p1MonthlyWage, p2MonthlyWage = 4000;
var p1MonthlyNeed, p2MonthlyNeed, monthlyNeed;
var p1LifeInsurance, p2LifeInsurance = 0;
var p1EmployerCover, p2EmployerCover = 0;
var p1EmployerCoverMonthly, p2EmployerCoverMonthly;
var p1LifeInsuranceRequired, p2LifeInsuranceRequired;

var numChildren = 0;
var childAge = 10;
var monthlyWage = 8000; //Monthly income
var disposableIncome = 0;
var lifeInsurance = 0;
var employerLC = 0; //How much life cover the employer provides
var employerMI = 0; //How much monthly income the employer would provide
var lifeInsuranceRequired = 0;
var conversionFactor = 0;
var insuranceRequired = true;
var availableTags = [];
var term = 0;
var euro = "&#8364;";
var links = [];
var timestamp = 0;
var product;
var secondPerson = false;
var completed = 0;
var startPX;

var resultsHidden = true;
var fromSmallResultLink = false;
var dropInIncome;

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
}

function addCommas(nStr) {
    "use strict";
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

$(window).scroll(function () {

    "use strict";
    var scrollTop = $(window).scrollTop();
    startPX = String(parseInt(links[0], 10) - 100);

    if (scrollTop > (startPX || 960)) {
        $('#smallMenu').fadeIn();
    } else {
        $('#smallMenu').fadeOut();
    }
});

function showSmallMenu(){
    $('#smallMenu').fadeIn();
    $('.LRNav').fadeIn();
     $('#footer').fadeIn();
}
function hideSmallMenu(){
    $('#smallMenu').fadeOut();
    $('.LRNav').fadeOut();
    $('#footer').fadeOut();
}

$(document).ready(function() {

    $('#printPreview').click(function(){ window.print(); return false; 
        _gaq && _gaq.push(['_trackEvent','button clicked','print button','print Screen Open']);       
    });

    $("#getStarted").click(function() {

        // scrollToAnchor("id");

        $("#splash").fadeOut(function() {
            $("body").css("overflow-y", "scroll");
            $('.anchor_tags').each(function () {
                links.push($(this).offset().top.toFixed());     
            });

             $("#mainNav").fadeIn("slow"); 

        });

        if (_gaq) {
            _gaq.push(['_trackEvent', 'Page navigation', 'splash page']);
            return true;
        }
    })

    $( ".sliderOutput" ).change(function(event) {
        var input = $(this).val().replace(/,/g,'');
        var id = String ( $(this).attr("id") );

        if (id === "monthlyEmployerPercent") {           
            input = (parseInt( $('#monthlyWage input').val()) / 100) * input;
        }
        
        $(this).parent().parent().parent().find(".slider").slider('value', parseInt(input));      
    });

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
            || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                 $('html,body').animate({scrollTop: target.offset().top}, 1000 ); 
                checkIfDone();
                return false;
            }
        }
    });

    $(".slider").each ( function (){   
        $(this).createSlider( $(this).attr("outputDiv"), $(this).attr("max"));
        $(this).slider('value',parseInt( $(this).attr("value") ) );
        $( $(this).attr("outputDiv") ).text( addCommas( $(this).attr("value") ) );
    });

    if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
        ;
    } else {
        $(function() {
            $(".knobTick").knob();
        });
    }

     $("#firstResultsfwdBtn").click(function(){
       $("#firstScreen").fadeOut(function(){
           $("#secondScreen").fadeIn("1000");  
          
            if(secondPerson == true){
                $(".dualGraph").show();
                $(".singleGraph").hide();
                createChart('#p1ChartContainer', p1LifeInsuranceRequired, p1LifeInsurance, p1EmployerCover, p1EmployerCoverMonthly, p1Welfare,1);
                createChart ('#p2ChartContainer', p2LifeInsuranceRequired, p2LifeInsurance, p2EmployerCover, p2EmployerCoverMonthly, p2Welfare,2);
                createChart('#p1PrintChartContainer', p1LifeInsuranceRequired, p1LifeInsurance, p1EmployerCover, p1EmployerCoverMonthly, p1Welfare,1);
                createChart('#p2PrntChartContainer', p2LifeInsuranceRequired, p2LifeInsurance, p2EmployerCover, p2EmployerCoverMonthly, p2Welfare,2);
            }
            else{
                $(".singleGraph").show();
                $(".dualGraph").hide();
                createChart('#chartContainer', p1LifeInsuranceRequired, p1LifeInsurance, p1EmployerCover, p1EmployerCoverMonthly, p1Welfare);
                createChart('#printChartContainer', p1LifeInsuranceRequired, p1LifeInsurance, p1EmployerCover, p1EmployerCoverMonthly, p1Welfare);
            }
            _gaq && _gaq.push(['_trackEvent','Enter Screen','Results next button','second results Screen']); 
        });
     })

     $("#sndResultsBckBtn").click(function(){
         $("#secondScreen").fadeOut("800", function(){
            $("#firstScreen").fadeIn("1000");
            _gaq && _gaq.push(['_trackEvent','Enter Screen','Results back button','first results Screen']); 
        });
     })

     $("#sndResultsfwdBtn").click(function(){
        $("#secondScreen").fadeOut(function(){

            if ( insuranceRequired == false ){
                 $("#fifthScreen").fadeIn("1000");
                 _gaq && _gaq.push(['_trackEvent','Enter Screen','Results next button','`fifth results Screen']);
            }
            else{
                $("#thirdScreen").fadeIn("1000");
                if (secondPerson == true ) {
                    $("#dualResultsScreen").show();
                    $("#singleResultsScreen").hide();
                }
                else {
                    $("#singleResultsScreen").show();
                    $("#dualResultsScreen").hide();
                }
                _gaq && _gaq.push(['_trackEvent','Enter Screen','Results next button','third results Screen']);
            }
        });
     })

     $("#thirdResultsBckBtn").click(function(){
         $("#thirdScreen").fadeOut("800", function(){
            $("#secondScreen").fadeIn("1000");
            _gaq && _gaq.push(['_trackEvent','Enter Screen','Results back button','second results Screen']); 
        });
     })

    $("#frthResultsBckBtn").click(function(){
        checkIfDone();
         $("#fourthScreen").fadeOut("800", function(){
            $("#firstScreen").fadeIn("1000");
            _gaq && _gaq.push(['_trackEvent','Enter Screen','Results back button','first results Screen']); 
        });
     })

    $("#fifthResultsBckBtn").click(function(){
         $("#fifthScreen").fadeOut("800", function(){
            $("#secondScreen").fadeIn("1000");
            _gaq && _gaq.push(['_trackEvent','Enter Screen','Results back button','second results Screen']); 
        });
    })

    $(".changeDetails").click(function(){
         scrollToAnchor("id");
         $("#fifthScreen").fadeOut("800", function(){
            $("#firstScreen").fadeIn("1000");
            _gaq && _gaq.push(['_trackEvent','Enter Screen','Results back button','first results Screen']); 
        });
    })

    $("#resultsSmall").click(function(event){
        event.preventDefault();
        resultsHidden = true; 
        $("#resultsSmall").css("visibility", "visible"); 
        checkIfDone();
    })


   /* This function lets the user know that the years must be between 50 and 95*/
    $('.year').change(function(){
        var yearVal = $(this).closest("input").val();
        var id = $(this).attr("id");
      
        if (  yearVal > 94 ) {
            if(id == "p1Year") {
                $('#year1Error').show();
            }
            else{
                $('#year2Error').show();
            }
              
        }
        else if( yearVal < 50 ) {
              if(id == "p1Year") {
                $('#year1Error').show();
            }
            else if (id == "p2Year"){
                $('#year2Error').show();
            }
            else{
                $('#yearError').show();  
            }
        }
        else{
            if(id == "p1Year") {
                $('#year1Error').hide();
            }
            else if(id == "p2Year"){
                $('#year2Error').hide();
            }
             else{
                $('#yearError').hide();  
            }
        }
    });

     $('.month').change(function(){
        var monthVal = $(this).closest("input").val();
        var id = $(this).attr("id");
        if(monthVal > 12){
            $(this).closest("input").val(12)
        }
        else if(monthVal < 1){
            $(this).closest("input").val(1)
        }

        if(id == "p1Month") {
            if( $('#p1Day').val() > daysInMonth(monthVal,$('#p1Year').val()) ){
                $('#p1DobError').show();  
            } 
            else{
                $('#p1DobError').hide();  
            }  
        }
        else if (id == "p2Month") {
            if( $('#p2Day').val() > daysInMonth(monthVal,$('#p2Year').val())){
                $('#p2DobError').show();  
            }else{
                $('#p2DobError').hide();  
            }  
        }
        else{
            if( $('#day').val() > daysInMonth(monthVal,$('#year').val())){
                $('#dobError').show();  
            }else{
                $('#dobError').hide();  
            }  
        }
    });

    $('.day').change(function(){
        var dayVal = $(this).closest("input").val();
        var id = $(this).attr("id");
        
        if(dayVal > 31){
            $(this).closest("input").val(1)
        }
        else if(dayVal < 1){
            $(this).closest("input").val(1)
        }


        if(id == "p1Month") {
            if( dayVal > daysInMonth($('#p1Month').val(),$('#p1Year').val()) ){
                $('#p1DobError').show();  
            } 
            else{
                $('#p1DobError').hide();  
            }  
        }
        else if (id == "p2Month") {
            if( dayVal > daysInMonth($('#p2Month').val(),$('#p2Year').val())){
                $('#p2DobError').show();  
            }else{
                $('#p2DobError').hide();  
            }  
        }
        else{
            if( dayVal > daysInMonth($('#month').val(),$('#year').val())){
                $('#dobError').show();  
            }else{
                $('#dobError').hide();  
            }  
        }
    });

/*These methods control the checkboxes*/
    $('#noLifeInsurance').change(function(){
        if ( $(this).is(":Checked") ) {
            $(".currentCover").find(".slider").slider("disable");
        }
        else {
            $(".currentCover").find(".slider").slider("enable");
        }
    });

    $('#dualP1noLifeInsurance').change(function(){
        if ( $(this).is(":Checked") ) {
            $(".dualP1CurrentCover").find(".slider").slider("disable");
        }
        else {
            $(".dualP1CurrentCover").find(".slider").slider("enable");
        }
    });

    $('#dualP2noLifeInsurance').change(function(){
        if ( $(this).is(":Checked") ) {
            $(".dualP2CurrentCover").find(".slider").slider("disable");
        }
        else {
            $(".dualP2CurrentCover").find(".slider").slider("enable");
        }
    });

    $('#noKids').change(function(){
        if ( $(this).is(":Checked") ) {
            $("#disabler").show();
        }
        else {
            $("#disabler").hide();
        }
    });

       
    $("#DL").click( function() {
        _gaq && _gaq.push(['_trackEvent','button clicked','dual life','dual life quote']);
        
        var curerrentDiv = $(this); 
        curerrentDiv.css("pointer-events","none");
        $("#SL").removeClass("selected");
        curerrentDiv.addClass("selected");

        $( "#yourInfoSingle" ).fadeOut(900, function(){
            $( "#yourInfoDual" ).fadeIn(500);
        });

        $( "#yourJobSingle" ).fadeOut(900, function(){
            $( "#yourJobDual" ).fadeIn(500, function(){
                curerrentDiv.css("pointer-events","inherit");
            });
        });

        $( "#singleYourCover" ).fadeOut(900, function(){
            $( "#dualYourCover" ).fadeIn(500);
        });

        if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
            $("#ie8DualYourNeeds").slideDown();
        } 
        else {
            $("#dualYourNeeds").slideDown();
        }
       
        $("#singlePrintResultsScreen").removeClass("show-for-print");
        $("#singlePrintResultsScreen").addClass("hide-for-print");

        $("#dualPrintResultsScreen").removeClass("hide-for-print");
        $("#dualPrintResultsScreen").addClass("show-for-print");

        $("#secondScreen").hide();
        $("#thirdScreen").hide();
        $("#firstScreen").show()
        secondPerson = true;
    }) 

   $("#SL").click( function() {
        _gaq && _gaq.push(['_trackEvent','button clicked','single life','single life quote']);
        
        var curerrentDiv = $(this); 
        curerrentDiv.css("pointer-events","none");
        $("#DL").removeClass("selected");
        curerrentDiv.addClass("selected");
        
        $( "#yourInfoDual" ).fadeOut(900, function(){
            $( "#yourInfoSingle" ).fadeIn(500);
        });

        $( "#yourJobDual" ).fadeOut(900, function(){
            $( "#yourJobSingle" ).fadeIn(500, function(){
                curerrentDiv.css("pointer-events","inherit");
            });
        });

        $( "#dualYourCover" ).fadeOut(900, function(){
            $( "#singleYourCover" ).fadeIn(500);
        });

        if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
            $("#ie8DualYourNeeds").slideUp();
        } 
        else {
            $("#dualYourNeeds").slideUp();
        }

        $("#dualPrintResultsScreen").removeClass("show-for-print");
        $("#dualPrintResultsScreen").addClass("hide-for-print");

        $("#singlePrintResultsScreen").removeClass("hide-for-print");
        $("#singlePrintResultsScreen").addClass("show-for-print");
        
        
        $("#secondScreen").hide();
        $("#thirdScreen").hide();
        $("#firstScreen").show()
         secondPerson = false;
    });

   $("#resultsLink").click(function(){
         $(".row.results").show();   
         scrollToAnchor("results");
    });  
     
    $("#showBreakdown").toggle(
        function(){
            $("#showBreakdown").html("Hide Breakdown"); 
            $("#breakdown").slideDown(); 
        },
        function(){
            $("#showBreakdown").html("Show Breakdown"); 
            $("#breakdown").slideUp();
        }  
    ); 

    $("#dualShowBreakdown").toggle(
        function(){
            $("#dualShowBreakdown").html("Hide Breakdown"); 
            $("#dualBreakdown").slideDown(); 
        },
        function(){
            $("#dualShowBreakdown").html("Show Breakdown"); 
            $("#dualBreakdown").slideUp();
        }  
    ); 

    
    $("#bookReview").click(function(){
        $('#myModal').foundation('reveal', 'open');
         _gaq && _gaq.push(['_trackEvent','button clicked','book review button','callback Screen Open']);
    });

    $("#callback").click(function(){
        emailInfo();
        _gaq && _gaq.push(['_trackEvent','button clicked','callback button','callback requested']);
       $('#myModal').foundation('reveal', 'close');
        $("#thirdScreen").fadeOut(function(){
           $("#fourthScreen").fadeIn("1000");
        });        

    }); 

    /*This is for the placeholders in the dropdown lists*/
    $(".dropdown .current").html("Please choose..."); 
});

$(window).load(function() {
    scrollToAnchor("splash");

    $("#p1Name").val("Your First Name");
    $("#p2Name").val("Second Person's First Name");
    $(".occupation").val("Enter your Job Title");

    $( ".occupation" ).click(function() {
       $(this).val("");
    });

    $(".ui-menu-item a").live("click", function(){
        var content =  $(this).text();
        var id = $(this).closest("ul").attr("id");
      
        if (id == "ui-id-1") {
            $(".jobTitle").val(""+content);
        }
        else if (id == "ui-id-2") {
            $(".p1JobTitle").val(""+content);
        }
        else{
            $(".p2JobTitle").val(""+content);
        }
    });

    $( "#p1Name" ).click(function() {
       $(this).val("");
    });

    $( "#p2Name" ).click(function() {
       $(this).val("");
    });
});


$.fn.animateRotate = function(angle,prev, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: prev}).animate({deg: angle}, args);
    });
};

var currentDeg = 10.0;

$("i, .circleText").mouseenter(function () {
    $('.circle-closed').fadeOut();
    $('.circle').fadeIn();
});
$(".id").mouseenter(function () {
    $('.circle').animateRotate(180.68 + currentDeg / 360, currentDeg);
    $('.circleText').find("span").hide();
    $('#circleText-id').show();
    currentDeg = 180.68;
});
$(".family").mouseenter(function () {
    $('.circle').animateRotate(257.1 + currentDeg / 360, currentDeg);
    $('.circleText').find("span").hide();
    $('#circleText-family').show();
     currentDeg = 257.1;
});
$(".work").mouseenter(function () {
    $('.circle').animateRotate(308.52 + currentDeg / 360, currentDeg);
    $('.circleText').find("span").hide();
    $('#circleText-work').show();
    currentDeg = 308.52;
});
$(".cc").mouseenter(function () {
    $('.circle').animateRotate(51.42 + currentDeg / 360, currentDeg);
    $('.circleText').find("span").hide();
    $('#circleText-cc').show();
    currentDeg = 51.42;
});
$(".umbrella").mouseenter(function () {
    $('.circle').animateRotate(102.84 + currentDeg / 360, currentDeg);
    $('.circleText').find("span").hide();
    $('#circleText-umbrella').show();
    currentDeg = 102.84;
});

$(".clipboard").mouseenter(function () {
    $('.circle').animateRotate(360 + currentDeg / 360, currentDeg);
    $('.circleText').find("span").hide();
    $('#circleText-clipboard').show();
    currentDeg = 360;
});

function checkIfDone() {
    //Screen one id
    getInputs();
    if (secondPerson == true) {
        var incomplete = false;

        if (p2Name  != "" && p2Name != "Second Person's First Name") {
            $('.p2FName').text(p2Name);
        }
        if (p1Name  != "" && p1Name != "Your First Name") {
            $('.p1FName').text(p1Name + "'s");
        }

        //screen one
        if (p1Smoker == "Please choose..." && p1Marital == "Please choose..." && p2Smoker == "Please choose..." && p2Marital == "Please choose..." && p1Day < daysInMonth(p1Month, p1Year) && p2Day < daysInMonth(p2Month, p2Year) && p1Year > 49 && p1Year < 95 && p2Year > 49 && p2Year < 95) {
            $("dd[data-magellan-arrival = 'id'] .icon-exclamation").css("display", "none");
            $('.idSmall + .icon-check').css("display", "none");
        } else {
            if (p1Day > daysInMonth(p1Month, p1Year)) {
                $('#p1DobError').show();
                incomplete = true;
            } else {
                var dateString = p1Year + "-" + p1Month + "-" + p1Day;
                if (calcAge(dateString) > 17) {
                    $('#p1DobError').hide();
                }
            }

            if (p2Day > daysInMonth(p2Month, p2Year)) {
                $('#p2DobError').show();
                incomplete = true;
            } else {
                $('#p2DobError').hide();
            }

            if (p2Year > 95) {
                incomplete = true;
            } else if (p2Year < 50) {
                incomplete = true;
            }

            if (p1Year > 95) {
                incomplete = true;
            } else if (p1Year < 50) {
                incomplete = true;
            }

            if (p1Smoker == "Please choose...") {
                $('#p1SmokerError').show();
                incomplete = true;
            } else {
                $('#p1SmokerError').hide();
            }

            if (p1Marital == "Please choose...") {
                $('#p1MaritalError').show();
                incomplete = true;
            } else {
                $('#p1MaritalError').hide();
            }

            if (p2Smoker == "Please choose...") {
                $('#p2SmokerError').show();
                incomplete = true;
            } else {
                $('#p2SmokerError').hide();
            }

            if (p2Marital == "Please choose...") {
                $('#p2MaritalError').show();
                incomplete = true;
            } else {
                $('#p2MaritalError').hide();
            }

            if (incomplete == true) {
                $('.idSmall + .icon-check').css("display", "none");
                $("dd[data-magellan-arrival = 'id'] .icon-exclamation").css("display", "block");
            } else {
                $("dd[data-magellan-arrival = 'id'] .icon-exclamation").css("display", "none");
                $('.idSmall + .icon-check').css("display", "block");
                completed++;
            }
        }

       //screen three - work
        incomplete = false;
        if (p1Occupation == "Enter your Job Title" && p1OccupationStatus == "Please choose..." && p2Occupation == "Enter your Job Title" && p2OccupationStatus == "Please choose..." && monthlyWage == 8000) {
            $('.workSmall + .icon-check').css("display", "none");
        } else {
            if (p1Occupation == "Enter your Job Title") {
                $('#p1JobTitleError').show();
                incomplete = true;
            } else {
                $('#p1JobTitleError').hide();
            }

            if (p1OccupationStatus == "Please choose...") {
                $('#p1JobStatusError').show();
                incomplete = true;
            } else {
                $('#p1JobStatusError').hide();
            }

            if (p2Occupation == "Enter your Job Title") {
                $('#p2JobTitleError').show();
                incomplete = true;
            } else {
                $('#p2JobTitleError').hide();
            }

            if (p2OccupationStatus == "Please choose...") {
                $('#p2JobStatusError').show();
                incomplete = true;
            } else {
                $('#p2JobStatusError').hide();
            }

            if (incomplete == true) {
                $('.workSmall + .icon-check').css("display", "none");
                $("dd[data-magellan-arrival = 'work'] .icon-exclamation").css("display", "block");
            } else {
                $("dd[data-magellan-arrival = 'work'] .icon-exclamation").css("display", "none");
                $('.workSmall + .icon-check').css("display", "block");
                completed++;
            }
        }

        //Screen five Existing Life insurance
        if (lifeInsurance != 0 || p1LifeInsurance > 0 || p2LifeInsurance > 0) {
            $('.umbrellaSmall + .icon-check').css("display", "block");
            completed++;
        } else {
            $('.umbrellaSmall + .icon-check').css("display", "none");
        }

        //Screen six clipboard
        if (p1MonthlyNeed > 0  && p2MonthlyNeed > 0) {
            $('.clipboardSmall + .icon-check').css("display", "block");
            completed++;
        } else {
            $('.clipboardSmall + .icon-check').css("display", "none");
        }
    } else {
        //screen One
        var incomplete = false;
        if (p1Smoker == "Please choose..." && p1Marital == "Please choose..." && p1Day < daysInMonth(p1Month, p1Year)) {
            $("dd[data-magellan-arrival = 'id'] .icon-exclamation").css("display", "none");
            $('.idSmall + .icon-check').css("display", "none");
        } else {
            if (p1Day > daysInMonth(p1Month, p1Year)) {
                $('#dobError').show();
                incomplete = true;
            } else {
                $('#dobError').hide();
            }

            if (p1Smoker == "Please choose...") {
                $('#smokerError').show();
                incomplete = true;
            } else {
                $('#smokerError').hide();
            }

            if (p1Marital == "Please choose...") {
                $('#maritalStatusError').show();
                incomplete = true;
            } else {
                $('#maritalStatusError').hide();
            }

            if (incomplete == true) {
                $('.idSmall + .icon-check').css("display", "none");
                $("dd[data-magellan-arrival = 'id'] .icon-exclamation").css("display", "block");
            } else {
                $("dd[data-magellan-arrival = 'id'] .icon-exclamation").css("display", "none");
                $('.idSmall + .icon-check').css("display", "block");
                completed++;
            }
        }

        //screen three - work
        incomplete = false;
        if (p1Occupation == "Enter your Job Title" && p1OccupationStatus == "Please choose..." && monthlyWage == 4000) {
            $('.workSmall + .icon-check').css("display", "none");
        } else {
            if (p1Occupation == "Enter your Job Title") {
                $('#jobTitleError').show();
                incomplete = true;
            } else {
                $('#jobTitleError').hide();
            }

            if (p1OccupationStatus == "Please choose...") {
                $('#jobStatusError').show();
                incomplete = true;
            } else {
                $('#jobStatusError').hide();
            }

            if (incomplete == true) {
                $('.workSmall + .icon-check').css("display", "none");
                $("dd[data-magellan-arrival = 'work'] .icon-exclamation").css("display", "block");
            } else {
                $("dd[data-magellan-arrival = 'work'] .icon-exclamation").css("display", "none");
                $('.workSmall + .icon-check').css("display", "block");
                completed++;
            }
        }

        //Screen five Existing Life insurance
        if (lifeInsurance != 0 || p1LifeInsurance > 0 || p2LifeInsurance > 0) {
            $('.umbrellaSmall + .icon-check').css("display", "block");
            completed++;
        } else {
            $('.umbrellaSmall + .icon-check').css("display", "none");
        }

        //Screen six clipboard
        if (p1MonthlyNeed > 0) {
            $('.clipboardSmall + .icon-check').css("display", "block");
            completed++;
        } else {
            $('.clipboardSmall + .icon-check').css("display", "none");
        }
    }

    //Screen two Family
    if ((childAge > 0 && numChildren > 0) || $('#noKids').is(':checked')) {
        $('.familySmall + .icon-check').css("display", "block");
        completed++;
    } else {
        $('.familySmall + .icon-check').css("display", "none");
    }

    //Screen four loans
    if (disposableIncome > 0) {
        $('.ccSmall + .icon-check').css("display", "block");
        completed++;
    } else {
        $('.ccSmall + .icon-check').css("display", "none");
    }

    if (completed == 6) {
        fillTable();
        p1LifeInsuranceRequired = calculation(p1MonthlyWage, p1MonthlyNeed, p1LifeInsurance, p1EmployerCover, p1EmployerCoverMonthly);

        if (secondPerson == true) {
            p2LifeInsuranceRequired = calculation(p2MonthlyWage, p2MonthlyNeed, p2LifeInsurance, p2EmployerCover, p2EmployerCoverMonthly);
        }

        lifeInsuranceRequired = p1LifeInsuranceRequired + (p2LifeInsuranceRequired || 0);
        getQuote();

        //get results
        if (lifeInsuranceRequired == 0) {
            insuranceRequired = false;
        } else {
            insuranceRequired = true;
        }

        if (resultsHidden != false) {
            $(".row.results").show();
            scrollToAnchor("results");
            resultsHidden = false;
            $("#resultsSmall").css("visibility", "visible");
        }

        completed = 0;
    } else {
        $(".row.results").hide();
        resultsHidden = true;
        $("#resultsSmall").css("visibility", "hidden");
        completed = 0;
    }
}
var completed = 0;

function scrollToAnchor(aid) {
    var aTag = $("a[name='" + aid + "']");
    $('html,body').animate({ scrollTop: aTag.offset().top }, 'slow');
}

var v,spinnerVal=0
,$idir = $("div#idir")
,$ival = $(".p1Ival");
var p2v,p2SpinnerVal=0
,$p2Idir = $("div#p2Idir")
,$p2Ival = $(".p2Ival");

$(function($) {

   /* This only affects the half circle in the monthly take home pay section*/
    $(".knob").dial({

        draw : function () {

            // "tron" case
            if(this.$.data('skin') == 'tron') {

                var a = this.angle(this.cv)  // Angle
                    , sa = this.startAngle          // Previous start angle
                    , sat = this.startAngle         // Start angle
                    , ea                            // Previous end angle
                    , eat = sat + a                 // End angle
                    , r = 1;

                this.g.lineWidth = this.lineWidth;

                this.o.cursor
                    && (sat = eat - 0.3)
                    && (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.v);
                    this.o.cursor
                        && (sa = ea - 0.3)
                        && (ea = ea + 0.3);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                    this.g.stroke();
                }

                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor ;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                this.g.stroke();

                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc( this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();

                return false;
            }
        }
    });

     // Example of infinite knob, iPod click wheel

    var incr = function(currentVal,dir,val) { 
        if (currentVal < 60 ) { 
            currentVal++; 
            dir.show().html("+").fadeOut(); 
            val.html(currentVal + "00");
        } 
        return currentVal;
    }
    var decr = function(currentVal,dir,val) { 
        if(currentVal!=0)
        {
            currentVal--; 
            dir.show().html("-").fadeOut(); 
            if(currentVal == 0) {
                val.html(currentVal); 
            }
            else{
                val.html(currentVal + "00"); 
            }
        }
        return currentVal;
     }   

    $("input.infinite").dial({
        min : 0,
        max : 30,
        stopper : false,
        change : function () {  
            v > this.cv && $(function(){ spinnerVal = decr(spinnerVal,$idir,$ival);});
            v < this.cv && $(function(){ spinnerVal = incr(spinnerVal,$idir,$ival);});
            v = this.cv;
        }
    });

    $("input.infinite1").dial({
        min : 0,
        max : 30,
        stopper : false,
        change : function () {  
            p2v > this.cv && $(function(){ p2SpinnerVal = decr(p2SpinnerVal,$p2Idir,$p2Ival);});
            p2v < this.cv && $(function(){ p2SpinnerVal = incr(p2SpinnerVal,$p2Idir,$p2Ival);});
            p2v = this.cv;
        }
    });
});

jQuery.fn.extend({
    createSlider: function (current_value, max) {

        var step = 100;
        if ((max / 100) > 100) {
            step = 1000;
        }

        if (max < 25) {
            step = 1;
        }

        $(this).slider({
            animate: true,
            range: "min",
            step: step,
            min: 0,
            max: max,

            /*Not sure if this function is relevant all it seems to do is populate the feilds with 0s to begin with*/
            change: function (event, ui) {
                $('#' + current_value).val("" + addCommas(ui.value));
                if (current_value == "monthlyEmployer") {
                    (parseInt($('#monthlyWage input').val(), 10) > 0
                    && $("#monthlyEmployerPercent").val(parseInt(ui.value / monthlyWage * 100, 10)))
                    || (function () { $("#monthlyEmployerPercent").val("-"); }());
                }
            },

            slide: function (event, ui) {
                $('#' + current_value).val("" + addCommas(ui.value));
                if (current_value == "monthlyEmployer") {
                    monthlyWage > 0  && $("#monthlyEmployerPercent").val(parseInt(ui.value / p1MonthlyWage * 100, 10))
                    || (function () { $("#monthlyEmployerPercent").val("-"); }());
                } else if (current_value == "dualP1MonthlyEmployer") {
                    monthlyWage > 0 &&  $("#dualP1MonthlyEmployerPercent").val(parseInt(ui.value / p1MonthlyWage * 100, 10))
                    || (function () { $("#dualP1MonthlyEmployerPercent").val("-"); }());
                } else if (current_value == "dualP2MonthlyEmployer") {
                    monthlyWage > 0 &&  $("#dualP2MonthlyEmployerPercent").val(parseInt(ui.value / p2MonthlyWage * 100, 10))
                    || (function () { $("#dualP2MonthlyEmployerPercent").val("-"); }());
                }
            },

            stop: function (event, ui) {
                if (this.id == "employerMI") { employerMI = ui.value; } else if (this.id == "disposableIncome") { disposableIncome = ui.value; }
            }
        });
    }
});


function createChart(div, lifeCoverRequired, currentLifeCover, employerLifeCover, employerMonthlyCover, welfare, name) {

    var titleText = "Your income overview";
    if (secondPerson == true) {

        if (name == 1 && p1Name != "") {
            titleText = p1Name + "'s income overview";
        } else if (name == 2 && p2Name != "") {
            titleText = p2Name + "'s income overview";
        } else if (name == 2) {
            titleText = "Second Person's income overview";
        }
    }
    dropInIncome = parseInt(lifeCoverRequired / conversionFactor, 10);
    if (dropInIncome < 0) {
        dropInIncome = 0;
    }

    $(div).highcharts({
        chart: {
            type: 'pie',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        colors: ['#cc092f', '#5cc151', '#f19c2b', '#435399', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4'],
        title: {
            text: titleText
        },

        plotOptions: {
            pie: {
                size: '100%',
                allowPointSelect: true,
                cursor: 'pointer',
                showInLegend: true,
                dataLabels: {
                    enabled: false,
                    formatter: function () {
                        return this.percentage.toFixed(2) + '%';
                    }
                }
            }
        },
       legend: {
            enabled: true,
            layout: 'vertical',
            align: 'center',
            width: 200,
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
            useHTML: true,
            labelFormatter: function () {
                return '<span style="text-align: left; width:130px;">' + this.name + '</span><span><b> &#8364;' + this.y + '</b></span>';
            }
        },
        series: [{
            type: 'pie',
            name: 'Income share',
            dataLabels: {},
            data: [
                ['Drop In Income', dropInIncome ],
                ['Exisiting Life Cover', parseInt(currentLifeCover / conversionFactor, 10)],
                ['Employer provides', parseInt((employerLifeCover / conversionFactor) + employerMonthlyCover, 10)],
                ['Social welfare', parseInt(welfare, 10)]
            ]
        }]
    });
}

$.ajax({
    type: "GET",
    url: "/servlet/occupationDataInsight.xml",

    dataType: "xml",
    success: function (xml) {
        // Parse the xml file and get data
        $xml = $(xml);

        $(xml).find('Occupation').each(function () {
          var name;
          name = $(this).attr('name');
          availableTags.push(name);
        });
    }
});

$(function() {
    $( "#jobTitle" ).autocomplete({
      source: availableTags
    });

    $( "#p1JobTitle" ).autocomplete({
      source: availableTags
    });

    $( "#p2JobTitle" ).autocomplete({
      source: availableTags
    });
});


function getQuote(){
    //still have to add smoker status 
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    var params;

    newScript.type = 'text/javascript';
    newScript.onload= quoteResults;
   
    if (secondPerson == true) {
         params = "conversion=False"
                + "&coverTypeCd=" + "L" + "&coverTypeCd=" + "L" + "&dateOfBirth1Day=" + p1Day + "&dateOfBirth1Month=" + p1Month
                + "&dateOfBirth1Year=19" + p1Year + "&frequencyCd=" + "M" + "&indexation=" + "False" + "&jointLife=" + "False"
                + "&lifeCoverAmt=" + lifeInsuranceRequired + "&productId=" + 19 + "&quickQuoteId=" + "lifeTermSum" + "&sexCd1=" + "M"
                + "&smokerCd1=" + "N" + "&term=" + term
                +  "&dateOfBirth2Day=" + p2Day + "&dateOfBirth2Month=" + p2Month + "&dateOfBirth2Year=" + p2Year + "&  sexCd2=F& smokerCd2=N";
    } else {
        params = "conversion=False"
                + "&coverTypeCd=" + "L" + "&coverTypeCd=" + "L" + "&dateOfBirth1Day=" + p1Day + "&dateOfBirth1Month=" + p1Month
                + "&dateOfBirth1Year=19" + p1Year + "&frequencyCd=" + "M" + "&indexation=" + "False" + "&jointLife=" + "False"
                + "&lifeCoverAmt=" + lifeInsuranceRequired + "&productId=" + 19 + "&quickQuoteId=" + "lifeTermSum" + "&sexCd1=" + "M"
                + "&smokerCd1=" + "N" + "&term=" + term;
    }

    newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
    headID.appendChild(newScript);

    if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        $.getScript('https://www.irishlife.ie/secure/submitLifeQuote.js?' + params, quoteResults);
    }
}


function quoteResults() {
    var lifeCover, prem, premInclLevy, levy, fee, premEsc1, premOptionalExtras1, premGtdCover1, premIndex1, premEsc2, premOptionalExtras2, premGtdCover2, premIndex2,temp = [], reggie = /\=|&/;
    temp = result.split(reggie);
    lifeCover = parseFloat(temp[1]).toFixed(2);
    prem = parseFloat(temp[5]).toFixed(2);
    premInclLevy = parseFloat(temp[7]);
    levy = parseFloat(temp[9]);
    fee = parseFloat(temp[11]);
    premEsc1 = parseFloat(temp[13]).toFixed(2);
    premOptionalExtras1 = parseFloat(temp[15]).toFixed(2);
    premGtdCover1 = parseFloat(temp[17]).toFixed(2);
    premIndex1 = parseFloat(temp[19]).toFixed(2);
    premEsc2 = temp[21];
    premOptionalExtras2 = temp[23];
    premGtdCover2 = temp[25];
    premIndex2 = temp[27];

    $(".monthlyPrem").html("" + euro + addCommas((premInclLevy + fee).toFixed(2)));

    if (secondPerson == true) {
        $("#p1Results .finalResultsScreenLife").html("" + euro + addCommas(p1LifeInsuranceRequired));
        $("#p2Results .finalResultsScreenLife").html("" + euro + addCommas(p2LifeInsuranceRequired));
        $(".combinedSumAssured").html("" + euro + addCommas(lifeInsuranceRequired));
    } else {
        $(".finalResultsScreenMonthly").html("" + euro + addCommas(monthlyNeed));
        $(".finalResultsScreenLife").html("" + euro + addCommas(lifeInsuranceRequired));
    }

    $("#term").html("" + term);
    $(".prem").html(euro + prem);
    $(".levy").html(euro + levy.toFixed(2));
    $(".fee").html(euro + fee.toFixed(2));
}


function calculation(mw, mn, lc, emlc, empMI) {
    if (lc < 0) {
        lc = 0;
    }
    childAge > 2 ? term = 25 - childAge : term = 23;
   // Sum assured Calcs
    var annuityRate = parseFloat((1 - Math.pow(1.03, - term)) / Math.log(1.03)).toFixed(2);
    conversionFactor = parseFloat(annuityRate * 12).toFixed(2);
    var sumAssuredCalced = parseFloat(mn * conversionFactor).toFixed(2);
    var currentMonthlyLC = parseFloat((lc / conversionFactor) + (emlc / conversionFactor) + empMI).toFixed(2);
    var lifeInsuranceCurrently = lc + emlc + (empMI * conversionFactor);
    lifeInsuranceRequired = sumAssuredCalced - lifeInsuranceCurrently;

    if (lifeInsuranceRequired < 1) {
        lifeInsuranceRequired = 0;
    }
    CalculateStateBenefitAmount();
    return lifeInsuranceRequired;
}

function getInputs() {

    /*This is here so that the checkboxes stay consistant when switching from dual to single life and vice versa*/
    lifeInsurance = 0;
    p1LifeInsurance = 0;
    p2LifeInsurance = 0;

    if (test == false) {
        if (secondPerson == true) {

            p1Name = $('#p1Name').val();
            p2Name = $('#p2Name').val();

            p1Day = $('#p1Day').val();
            p1Month = $('#p1Month').val();
            p1Year = $('#p1Year').val();
            p1Marital = $('#p1MaritalStatus .current').text();
            p1Gender = $('#gender .current').text();
            p1Smoker = $('#p1Smoker .current').text();
            p1OccupationStatus = $('#p1JobStatus .current').text();
            p1Occupation = $('.p1Occupation').val();
            p1LifeInsurance = parseInt($("#dualP1LifeInsurance").val().replace(/,/g, ''), 10);
            p1EmployerCover = parseInt($("#dualP1EmployerCover").val().replace(/,/g, ''), 10);
            p1EmployerCoverMonthly = parseInt($("#dualP1MonthlyEmployer").val().replace(/,/g, ''), 10);

            p2Day = $('#p2Day').val();
            p2Month = $('#p2Month').val();
            p2Year = $('#p2Year').val();
            p2Marital = $('#p2MaritalStatus .current').text();
            p2Smoker = $('#p2Smoker .current').text();
            p2OccupationStatus = $('#p2JobStatus .current').text();
            p2Occupation = $('.p2Occupation').val();
            p2LifeInsurance = parseInt($("#dualP2lifeInsurance").val().replace(/,/g, ''), 10);
            p2EmployerCover = parseInt($("#dualP2EmployerCover").val().replace(/,/g, ''), 10);
            p2EmployerCoverMonthly = parseInt($("#dualP2MonthlyEmployer").val().replace(/,/g, ''), 10);

            if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
                p1MonthlyWage = parseInt($("#p1MonthlyWageSliderOutput").val().replace(/,/g, ''), 10);
                p2MonthlyWage = parseInt($("#p2MonthlyWageSliderOutput").val().replace(/,/g, ''), 10);

                p1MonthlyNeed = parseInt($("#p1NeedsSliderOutput").val().replace(/,/g, ''), 10);
                p2MonthlyNeed = parseInt($("#p2NeedsSliderOutput").val().replace(/,/g, ''), 10);
            } else {
                p1MonthlyWage = parseInt($('#p1NetMonthlyIncome input').val().replace(/,/g, ''), 10);
                p2MonthlyWage = parseInt($('#p2NetMonthlyIncome input').val().replace(/,/g, ''), 10);
                p1MonthlyNeed = parseInt($("#p1Ival").text(), 10);
                p2MonthlyNeed = parseInt($("#p2Ival").text(), 10);
            }

            if ($('#dualP1noLifeInsurance').is(':checked') && $('#dualP2noLifeInsurance').is(':checked')) {
                lifeInsurance = -1;
            } else {
                lifeInsurance = p1LifeInsurance + p2LifeInsurance + p1EmployerCover + p2EmployerCover + p1EmployerCoverMonthly + p2EmployerCoverMonthly;
            }

            employerMI = p1EmployerCoverMonthly + p2EmployerCoverMonthly;
            monthlyWage = parseInt(p1MonthlyWage, 10) + parseInt(p2MonthlyWage, 10);
            employerLC = p1EmployerCover + p2EmployerCover;
            monthlyNeed = p1MonthlyNeed + p2MonthlyNeed;

        } else {

            p1Day = $('#day input').val();
            p1Month = $('#month input').val();
            p1Year = $('#year input').val();
            p1Marital = $('#maritalStatus .current').text();
            p1Gender = $('#gender .current').text();
            p1Smoker = $('#smoker .current').text();
            p1OccupationStatus = $('#jobStatus .current').text();
            p1Occupation = $('.occupation').val();
            p1LifeInsurance = parseInt($("#lifeInsurance").val().replace(/,/g, ''), 10);
            p1EmployerCover = parseInt($("#employerCover").val().replace(/,/g, ''), 10);
            p1EmployerCoverMonthly = parseInt($("#monthlyEmployer").val().replace(/,/g, ''), 10);
            p1MonthlyNeed = parseInt($("#p1Ival").text(), 10);

            if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
                p1MonthlyWage = parseInt($("#monthlyWageSliderOutput").val().replace(/,/g, ''), 10);
            } else {
               p1MonthlyWage = $('#monthlyWage input').val().replace(/,/g, '');
            }

            if ($('#noLifeInsurance').is(':checked')) {
                lifeInsurance = -1;
            } else {
                lifeInsurance = p1LifeInsurance + p1EmployerCover + (p1EmployerCoverMonthly || 0);
            }

            employerMI = p1EmployerCoverMonthly;
            monthlyWage = parseInt(p1MonthlyWage, 10);
            employerLC = p1EmployerCover;
            monthlyNeed = p1MonthlyNeed;
        }

        if ($('#noKids').is(':checked')) {
            numChildren = 0;
            childAge = 0;
        } else if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
            numChildren = parseInt($("#numChildOutput").val(), 10);
            childAge = parseInt($("#ageChildOutput").val(), 10);
            p1MonthlyNeed =  parseInt($("#p1NeedsSliderOutput").val().replace(/, /g, ''), 10);
        } else {
            numChildren = parseInt($('#numChild input').val(), 10);
            childAge = parseInt($('#ageChild input').val(), 10);
        }


    } else {
        p1Name = "Adam";
        p1Day = 11;
        p1Month = 1;
        p1Year = 1981;
        p1Marital = "Married";
        p1Gender = "Male";
        p1Smoker = "Smoker";
        p1OccupationStatus = "Employed (Non-Pensionable)";
        p1Occupation = "WebDeveloper";
        p1LifeInsurance = 5000;
        p1EmployerCover = 3000;
        p1EmployerCoverMonthly = 200;

        p1MonthlyWage = 6000;
        p1MonthlyNeed = 4000;

        p2Name = "Michelle";
        p2Day = 11;
        p2Month = 1;
        p2Year = 1980;
        p2Marital = "Married";
        p2Smoker = "Smoker";
        p2OccupationStatus = "Employed (Non-Pensionable)";
        p2Occupation = "Teacher";
        p2LifeInsurance = 80000;
        p2EmployerCover = 0;
        p2EmployerCoverMonthly = 300;

        p2MonthlyWage = 3000;
        p2MonthlyNeed = 2000;

        lifeInsurance = p1LifeInsurance + p2LifeInsurance + p1EmployerCover + p2EmployerCover + p1EmployerCoverMonthly + p2EmployerCoverMonthly;

        numChildren = 1;
        childAge = 5;

        disposableIncome = 2000;

        employerMI = p1EmployerCoverMonthly + (parseInt(p2EmployerCoverMonthly, 10) || 0);
        monthlyWage = p1MonthlyWage + (parseInt(p2MonthlyWage, 10) || 0);
        employerLC = p1EmployerCover + (p2EmployerCover || 0);
        monthlyNeed = p1MonthlyNeed + p2MonthlyNeed;
    }
}

function fillTable() {

    $(".p1DobResult").text("" + p1Day + "/" + p1Month + "/" + p1Year);
    $(".p1MarriedResult").text("" + p1Marital);
    $(".p1SmokerResult").text("" + p1Smoker);
    $(".P1JobResult").html("" + p1Occupation);

    if (secondPerson == true) {
        $("#singlePrintResults").hide();
        $("#dualPrintResults").show();
        $("#singleResults").hide();
        $("#dualResults").show();
        $(".p2DobResult").text("" + p2Day + "/" + p2Month + "/" + p2Year);
        $(".p2MarriedResult").text("" + p2Marital);
        $(".p2SmokerResult").text("" + p2Smoker);
        $(".p2JobResult").html("" + p2Occupation);
    } else {
        $("#dualPrintResults").hide();
        $("#singlePrintResults").show();
        $("#dualResults").hide();
        $("#singleResults").show();
        $(".genderResult").text("" + p1Gender);
    }

    $(".numChildrenResult").text("" + numChildren);
    $(".ageResult").text("" + childAge);
    $(".salaryResult").html("&#8364;" + addCommas(monthlyWage));
    $(".MIEmployerResult").html("&#8364;" + addCommas(employerMI));
    $(".LCEmployerResult").html("&#8364;" + addCommas(employerLC));
    $(".loansResult").html("&#8364;" + addCommas(parseInt(disposableIncome, 10)));
    $(".monthlyNeedResult").html("&#8364;" + addCommas(parseInt(monthlyNeed, 10)));
}


function CalculateStateBenefitAmount() {

    var FrequencyAnn = 12;
    var SurvivorsPensionAnnualAmount = 10062;
    var SurvivorsPensionChildAnnualAmount = 1549.60;    // 29.80 * 52;
    var WidowsBenefitAnnualAmount = 10062;
    var WidowsChildAnnualAmount = 1549.60;  // 29.80 * 52;
    var childBenefitAmountAnnual = 0.0;

    (numChildren < 4) ? numChildren = numChildren : numChildren = 4;//Max 4

    if (p1Marital == "Married") {
         childBenefitAmountAnnual = SurvivorsPensionChildAnnualAmount * numChildren;
         p1Welfare = Math.round((SurvivorsPensionAnnualAmount + childBenefitAmountAnnual) / FrequencyAnn);
    } else if (p1Marital == "Separated") {
        childBenefitAmountAnnual = WidowsChildAnnualAmount * numChildren;
        p1Welfare = Math.round((WidowsBenefitAnnualAmount + childBenefitAmountAnnual) / FrequencyAnn);
    } else {
        p1Welfare = 0;
    }

    if (secondPerson == true) {
        if (p2Marital == "Married") {
            childBenefitAmountAnnual = SurvivorsPensionChildAnnualAmount * numChildren;
            p2Welfare = Math.round((SurvivorsPensionAnnualAmount + childBenefitAmountAnnual) / FrequencyAnn);
        } else if (p2Marital == "Separated") {
            childBenefitAmountAnnual = WidowsChildAnnualAmount * numChildren;
            p2Welfare = Math.round((WidowsBenefitAnnualAmount + childBenefitAmountAnnual) / FrequencyAnn);
        } else {
            p2Welfare = 0;
        }
    }
    return false;
}


function emailInfo() {
    var extraInforForEmail;
    timestamp = Number(new Date());

    extraInforForEmail =
            "\n\n Cover Amount: " + lifeInsuranceRequired +
            "\n Term: " + term + " years"+
            "\n\n ####PERSON ONE DETAILS####" +
            "\n Smoker: " + p1Smoker +
            "\n Date of Birth: " + p1Day + "/" + p1Month + "/" + p1Year;

    if (secondPerson == true) {
        extraInforForEmail = extraInforForEmail +
            "\n\n ####PERSON TWO DETAILS####" +
            "\n Smoker: " + p2Smoker +
            "\n Date of Birth: " + p2Day + "/" + p2Month + "/" + p2Year;
    }

    extraInforForEmail = extraInforForEmail + "\n\ n#### QUOTE ####\n Euro: " + addCommas(premInclLevy)//prmLev
    + "\n\n #### IMPORTANT ####\n This quote is valid for 7 days.";

    if ($("#telephone").val().length >= 7) {
        $('#phoneError').hide();
        var titleextra = "Term Assurance";
        var trackpageurl = window.location.pathname;

        if (typeof product != 'undefined') {
            if (product == "wholeoflife") {
                titleextra = "Whole of Life";
            } else if (product == "mortgageprotection") {
                titleextra = "Mortgage Protection";
            }
        }

        var emailAddress = 'N/A';
        if ($("#email").val()) {
            emailAddress = $("#email").val();
        }

        sendClickToCallback(
            'Q',
            '' + $("#name").val(),
            '' + $("#telephone").val(),
            emailAddress,
            '' + $('#callTime').val(),
            titleextra + ' - PROCESS COMPLETE (time: ' + timestamp + ')',
            extraInforForEmail
        );

        var quoteType = "T";

        if ($("#email").val()) {
            if (secondPerson == true) {
                mkAssociateLeadWithQuote('NULL', '' + $("#name").val(), emailAddress, '' + $("#telephone").val(), quoteType, term, addCommas(premInclLevy), lifeInsuranceRequired, 'Null', 'Null', calcAge(p1Day + "," + p1Month + "," + p1Year), calcAge(p2Day + "," + p2Month + "," + p2Year), p1Smoker, p2Smoker, '' + $('#callTime').val());
            } else {
                mkAssociateLeadWithQuote('NULL', '' + $("#name").val(), emailAddress, '' + $("#telephone").val(), quoteType, term, addCommas(premInclLevy), lifeInsuranceRequired, p1Gender, 'NULL', calcAge(p1Day + "," + p1Month + "," + p1Year), 'NULL', p1Smoker, 'NULL', '' + $('#callTime').val());
            }
        }

        if (_gaq) {
            _gaq.push(['_trackEvent', 'Click to callback', 'Times', $('#callTime').val()]);
            _gaq.push(['_trackPageview', trackpageurl + '#callback']);
            mkVisitWebPage(trackpageurl + '#callback');
        }
    } else {
        $('#phoneError').show();
    }

    return false;
}

function reset() {
    $("#day input").val(25).trigger("change");
    $("#month input").val(3).trigger("change");
    $("#year input").val(60).trigger("change");
    $("#numChild input").val(0).trigger("change");
    $("#ageChild input").val(10).trigger("change");
    $("#monthlyWage input").val(4000).trigger("change");
    $("#monthlyNeed input").val(0).trigger("change");
    $(".ival").text("0");
    spinnerVal = 0;
    $("div.slider").slider('value', 0);
    $(".sliderOutput").text("0");
    $("#tags").val("");
    $(".dropdown .current").html("Please choose...");
    $("#noExpenses").parents("div .screen").find(".slider").slider("enable");
    $('#noLifeInsurance').parents("div .screen").find(".slider").slider("enable");
    $(".row .results").show();
}