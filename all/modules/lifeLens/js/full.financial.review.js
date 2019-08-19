(function($){

var today = new Date();
var p1Day = today.getDate();
var p1Month = today.getMonth() + 1; //January is 0!
var p1Year;
var p1Age;
var p1Marital = "married";
var p1Smoker = "N";
var p1Welfare = 0.0;
var p1MonthlyWage = 4000;
var p1MonthlyNeed = 2000;
var chart;
var p1LifeInsurance = 0;
var incomeDeficit = 0;
var numChildren = 0;
var childAge = 0;
var lifeInsuranceRequired = 0;
var term = 0;
var conversionFactor = 0;
var euroSign = "&euro;";
var dropInIncome;
var maxLC = 0;
var totalprem=0;
var lifeCover=0;

//Colors being brought in from alt js in the module
var colors = window.colors || ['#50C9B5','#5261ac','#675C53','#002664'];
var res;

var v, spinnerVal = 20,
    $idir = $("div#idir"),
    $ival = $(".p1Ival");

var screens = ["splash", "yourInfo", "yourFamily", "yourJob", "yourExpenses", "firstResults", "secondResults", "thirdResults", "fourthResultsScreen"];
var currentScreenNum = 1;

$(document).ready(function() {

    $("#getStarted").click(function() {
        $("#splash").fadeOut(function() {
            $("#navMenu").fadeIn();
            $("#yourInfoScreen").fadeIn();
        });
    })

    $(".moveBack").on("click", function() {
        changeScreen(currentScreenNum - 1);
    });

    $(".moveForward").on("click", function() {
        changeScreen(currentScreenNum + 1);
    });

     $(".moveForwardTwo").on("click", function() {
        changeScreen(currentScreenNum + 2);
    });
    $(".moveBackTwo").on("click", function() {
        changeScreen(currentScreenNum - 2);
    });

    $("#homeButton").on("click",function(){
		location.reload();
    });
    
    $("#changeDetails").on("click", function() {

        $("#coverSliderOutput").val(0);
        $("#resultsScreen").addClass("invisible");
        $("#coverPercent").slider('value', 0);
        currentScreenNum = 4; //Expenses Screen
        changeScreen(1);
        $("#resultsScreen").animate({
            right: "-140%"
        }, 1500, function() {});
    });

    $(".slider").each(function() {
        $(this).createSlider($(this).attr("outputDiv"), $(this).attr("max"));
        $(this).slider('value', parseInt($(this).attr("value")));
        $($(this).attr("outputDiv")).text(addCommas($(this).attr("value")));
    });


    $("#frthResultsBckBtn").click(function() {
        $("#fourthScreen").fadeOut("800", function() {
            $("#firstScreen").fadeIn("1000");
        });
    })

    $("#fifthResultsBckBtn").click(function() {
        $("#fifthScreen").fadeOut("800", function() {
            $("#secondScreen").fadeIn("1000");
        });
    })

    /*These methods control the checkboxes*/
    $('#noKids').change(function() {
        $(this).is(":Checked") && $("#disabler").show() || $("#disabler").hide();
    });

    $("#callback").click(function() {
       callback();
    });
});

function addCommas(nStr) {
    return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// This is for calling pageviews dynamically on the page
function setGAPageView(p,t) {
    try{
    dataLayer.push({
        'event':'pageview',
        'pageTitle':t,
        'virtualURL':p
        });     
    }
    catch(err){
       //console.log(err);
    }
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
function changeScreen(screenNum) {//2
    
    var onScreen = '#' + screens[currentScreenNum];
    var toScreen = '#' + screens[screenNum];
    var currentMenuItem = $("#"+screens[currentScreenNum]);

	if (currentScreenNum > screenNum) {
        /*User is going back*/
        currentMenuItem.removeClass('active');
        currentMenuItem = $(toScreen);
        currentMenuItem.addClass('active');

        $(onScreen + "Screen").fadeOut("800", function() {
            $(toScreen + "Screen").fadeIn("1000");
        });
        currentScreenNum = screenNum;
    } else if (checkIfDone(currentScreenNum)) {
        /*User is going forward*/
        currentMenuItem.removeClass('active');
        currentMenuItem = $(toScreen);
        currentMenuItem.addClass('active');

        $(onScreen + "Screen").fadeOut("800", function() {
            $(toScreen + "Screen").fadeIn("1000");
        });

        if (onScreen.indexOf("Expenses") > 0) {
            $("#resultsScreen").animate({
                right: "0"
            }, 1500, function() {
                $("#resultsScreen").removeClass("invisible");
                createChart('#problemChart');               
                getQuote();     
                checkMaxAgeTermAndCover();
            });
        }
        currentScreenNum = screenNum;
    }
    setGAPageView(window.location.pathname+'/LifeLens'+"-"+'quote-step-'+currentScreenNum,''+screens[currentScreenNum]);
	setSCamPageView(window.location.pathname+'/LifeLens'+"-"+'quote-step-'+currentScreenNum);
}

function checkMaxAgeTermAndCover() {
	var canQuote = true;
	
	if (p1Age + term < 80) {
		$('#agePlusTermProblem').hide();		
	}
	else 
	{
		$('#agePlusTermProblem').show();		
		canQuote = false;
	}
	
	if (incomeDeficit <= 0) 
	{
	    $('#notFullyCovered').hide();
        $('#fullyCovered').show();
		canQuote = false;
	}
	else if (incomeDeficit > 0)
	{
	    $('#notFullyCovered').show();
        $('#fullyCovered').hide();
	}	
	
	if (canQuote)
	{
		 $('#canQuote').show();  
		 $('#directToCallbackFromChart').hide(); 
         $('#callbackBackOne').show();
         $('#callbackBackTwo').hide();
	}
	else
	{
		$('#canQuote').hide();
		$('#directToCallbackFromChart').show();
        $('#callbackBackOne').hide();
        $('#callbackBackTwo').show();
	}
}

function checkIfDone(screenNum) {
    getInputs();
    var complete = true;
    switch (screenNum) {
        case 1: //Screen 1 your Info
            if (p1Age < 18 || p1Age > 70) {
                $('#dobError').addClass("errorMessage");
                $('#dobError').html("You must be aged between 18 and 50 to avail of this service");
                complete = false;
            } else {
                complete = true;
                $('#dobError').html("");
                $('#dobError').removeClass("errorMessage");
            }

            if (p1Smoker == null) {
                $('#smokerError').addClass("errorMessage")
                complete = false;
            } else {
                $('#smokerError').removeClass("errorMessage")
            }

            if (p1Marital == null) {
                $('#maritalStatusError').addClass("errorMessage")
                complete = false;
            } else {
                $('#maritalStatusError').removeClass("errorMessage");
            }
            break;
        case 2: //Screen two Family
            break;
        case 3: //screen three - yourJob
            $("#p1Ival").html(p1MonthlyWage); 
            spinnerVal = p1MonthlyWage/100;
            break;
            /* case 4://Screen 4 Cover
                break;*/
        case 4: //Screen 5 Expenses
            if (p1MonthlyNeed > 0) {
                $('.expensesError').removeClass("errorMessage");
            } else {
                $('.expensesError').addClass("errorMessage")
                complete = false;
            }
            break;
        case 5: //Screen 5 First results Screen
            return true;
        case 6: //Screen 6 Second results Screen
            return true;
        case 7: //Screen 7 Third results Screen
            return true;
        case 8: //Screen 8 Fourth results Screen
            return true;
        default:
            alert('Default case');
            return false;
    }

    if (complete) {
        $('#' + screens[screenNum] + ' .fa-check-circle').css("display", "block");
        return true;
    } else {
        $('#' + screens[screenNum] + ' .fa-check-circle').css("display", "none");
        return false;
    }
}

$(function($) {
    $(".knob").dial({
        draw: function() {
            // "tron" case
            if (this.$.data('skin') == 'tron') {
                var a = this.angle(this.cv) // Angle
                    ,
                    sa = this.startAngle // Previous start angle
                    ,
                    sat = this.startAngle // Start angle
                    ,
                    ea // Previous end angle
                    , eat = sat + a // End angle
                    ,
                    r = 1;
                this.g.lineWidth = this.lineWidth;
                this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

                if (this.o.displayPrevious) {
                    ea = this.startAngle + this.angle(this.v);
                    this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
                    this.g.beginPath();
                    this.g.strokeStyle = this.pColor;
                    this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                    this.g.stroke();
                }
                this.g.beginPath();
                this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                this.g.stroke();
                this.g.lineWidth = 2;
                this.g.beginPath();
                this.g.strokeStyle = this.o.fgColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                this.g.stroke();
                return false;
            }
        }
    });

    // Example of infinite knob, iPod click wheel

    var incr = function(currentVal, dir, val) {
        if (currentVal < 60) {
            currentVal++;
            dir.show().html("+").fadeOut();
            val.html(currentVal + "00");
        }
        return currentVal;
    }

    var decr = function(currentVal, dir, val) {
        if (currentVal != 0) {
            currentVal--;
            dir.show().html("-").fadeOut();
            if (currentVal == 0) {
                val.html(currentVal);
            } else {
                val.html(currentVal + "00");
            }
        }
        return currentVal;
    }

    $("#infiniteDial").dial({
        min: 0,
        max: 30,
        stopper: false,
        change: function() {
            v > this.cv && $(function() {
                spinnerVal = decr(spinnerVal, $("#idir"), $(".p1Ival"));
            });
            v < this.cv && $(function() {
                spinnerVal = incr(spinnerVal, $("#idir"), $(".p1Ival"));
            });
            v = this.cv;
        }
    });
});

jQuery.fn.extend({
    createSlider: function(current_value, max) {
        var step;
        step = ((max / 100) > 100) ? 1000 : 100;
        step = ((max < 101)) ? 1 : 100;

        $(this).slider({
            animate: true,
            range: "min",
            step: step,
            min: 0,
            max: max,
            change: function(event, ui) {},
            slide: function(event, ui) {

                if ($(this).attr("id") === "coverPercent") {
                    $("#" + current_value).val(parseInt(ui.value) + "%");
                    var totalCover = (lifeInsuranceRequired > 0) ? addCommas(((maxLC / 100) * ui.value).toFixed(0)) : addCommas(maxLC) + "+";
                    $("#coverSliderAmtOutput").html(euroSign+totalCover);
                } else {
                    $("#" + current_value).val(parseInt(ui.value));
                }
            },
            stop: function(event, ui) {
                if ($(this).attr("id") === "coverPercent") {
                    $("#" + current_value).val(parseInt(ui.value) + "%");
                    getQuote();
                } else {
                    $("#" + current_value).val(parseInt(ui.value));
                }
            }
        });
    }
});

function createChart(div) {
    var titleText = "Your income overview";
    lifeInsuranceRequired = insuranceRequiredCalc(p1MonthlyNeed, p1LifeInsurance);
    maxLC = lifeInsuranceRequired;
    dropInIncome = parseInt(lifeInsuranceRequired / conversionFactor, 10);

    dropInIncome = (dropInIncome < 0) ? 0 : dropInIncome;
    incomeDeficit = dropInIncome - p1Welfare;

    $(div).highcharts({
        chart: {
            type: 'column',
            backgroundColor: 'rgba(255,255,255,0.002)',
            height: 400
        },
        title: {
            text: ''
        },
        legend: {
            backgroundColor: '#FFF',
            reversed: false
        },
        tooltip: {
            valueDecimals: 0,
            valuePrefix: 'EUR',
            pointFormat: "{series.name}: {point.y}"
        },
        xAxis: {
            categories: ['Income', 'Spending']
        },
        yAxis: {
            min: 0,
            lineColor: '#999',
            lineWidth: 1,
            tickColor: '#666',
            tickLength: 3,
            title: {
                text: 'Monthly Amount'
            }
        },
        plotOptions: {
            column: {
                borderColor: '#303030',
                stacking: 'normal',
                groupPadding: 0.1,
                events: {
                    legendItemClick: function () {
                        return false; // <== returning false will cancel the default action
                    }
                }
            }
        }
    });

    chart = $(div).highcharts();
    var deficit = {
        name: 'Possible Deficit',
        color: colors[0],
        data: [incomeDeficit, 0]
    };
    var coverNeed = {
        name: 'Existing Cover',
        color: colors[1],
        data: [0, 0]
    };
    var sw = {
        name: 'Widow/Widowers Pension',
        color: colors[2],
        data: [p1Welfare, 0]
    };
    var spending = {
        name: 'Spending',
        color: colors[3],
        data: [0, dropInIncome]
    };

    chart.addSeries(deficit);
    chart.addSeries(coverNeed);
    chart.addSeries(sw);
    chart.addSeries(spending);
}

function updateChart() {
    /*chart.showLoading();*/
    var percent = parseInt($("#coverSliderOutput").val().replace(/,/g, ''), 10);
    var covered = ((dropInIncome - p1Welfare) / 100) * percent;
    if (covered < 0) {
        covered = 0;
    }

    incomeDeficit = parseInt(((dropInIncome - p1Welfare) - covered).toFixed(0));
    incomeDeficit = incomeDeficit.toFixed(0);
    incomeDeficit = parseInt(incomeDeficit);
    covered = covered.toFixed(0);
    covered = parseInt(covered);
    var need = p1MonthlyNeed - (p1Welfare + covered);   
    lifeInsuranceRequired = parseInt(insuranceRequiredCalc(need, 0));
	
	maxLC = insuranceRequiredCalc(p1MonthlyNeed - p1Welfare,0);
	
    var totalCover = (lifeInsuranceRequired > 0) ? addCommas(((maxLC / 100) * percent).toFixed(0)) : addCommas(maxLC) + "+";
    $("#coverSliderAmtOutput").html(euroSign+totalCover);

    //Changes the data and calls redraw animation
    chart.series[0].data[0].update(incomeDeficit);
    chart.series[1].data[0].update(covered);
};

function getQuote() {
    
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    var params;
    updateChart();
    newScript.type = 'text/javascript';
    newScript.onload = quoteResults;

    params = "conversion=False" + "&coverTypeCd=" + "L" + "&coverTypeCd=" + "L" + "&dateOfBirth1Day=" + p1Day + "&dateOfBirth1Month=" + p1Month + "&dateOfBirth1Year=" + p1Year + "&frequencyCd=" + "M" + "&indexation=" + "False" + "&jointLife=" + "False" + "&lifeCoverAmt=" + lifeInsuranceRequired + "&productId=" + "19" + "&quickQuoteId=" + "lifeTermSum" + "&sexCd1=" + "M" + "&smokerCd1=" + p1Smoker + "&term=" + term;

    //newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js?' + params;
	newScript.src = 'https://apps.irishlife.ie/myonlineservices/servlet/LifeCoverQuote/?' + params;
    headID.appendChild(newScript);

    if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        $.getScript('https://apps.irishlife.ie/myonlineservices/servlet/LifeCoverQuote/?' + params, quoteResults);
    }
}

function quoteResults() {
    var prem, premInclLevy, levy, fee, premEsc1, premOptionalExtras1, premGtdCover1, premIndex1, premEsc2, premOptionalExtras2, premGtdCover2, premIndex2, temp = [],
        reggie = /\=|&/;
    var temp = result.split(reggie);
    lifeCover = parseFloat(temp[1]).toFixed(0);
    prem = parseFloat(temp[5]).toFixed(2);
    premInclLevy = parseFloat(temp[7]);
    levy = parseFloat(temp[9]);
    fee = parseFloat(temp[11]);
    premOptionalExtras1 = parseFloat(temp[15]);
    totalprem = premInclLevy;

    res = temp;
    
    if(p1Age >49 || lifeCover > 150000){
        $("#detailsABOption2").addClass("hidden");
        $("#detailsABOption3").removeClass("hidden");
    } else {
        $("#detailsABOption3").addClass("hidden");
        $("#detailsABOption2").removeClass("hidden");
    }
      
    
    checkMaxAgeTermAndCover();

    $(".monthlyPrem").html("" + euroSign + addCommas((premInclLevy).toFixed(2)));
    $(".deficit").html("" + euroSign + addCommas(incomeDeficit));
    $(".monthlyNeed").html("" + euroSign + addCommas(incomeDeficit));
    $(".recommendedCover").html("" + euroSign + addCommas(lifeInsuranceRequired.toFixed(0)));
    $(".welfare").html("" + euroSign + addCommas(p1Welfare));
    $(".term").html("" + term);
    $(".costLife").html(euroSign + premOptionalExtras1.toFixed(2));
    $(".levy").html(euroSign + levy.toFixed(2));
    $(".fee").html(euroSign + fee.toFixed(2));
    (childAge === 0 && numChildren === 0) ? $("#hasChild").html(""): $("#hasChild").html(" to keep you covered until youngest child turns <span class='highlight'>25</span>");

    /* Google analytics*/

    try {
        dataLayer.push({
            'event':'trackEvent',
            'category':"LifeLens",
            'action':"Age",
            'label':p1Age,
            'value': "1"
        });

        dataLayer.push({
            'event':'trackEvent',
            'category':"LifeLens",
            'action':"Premium",
            'label':premOptionalExtras1.toFixed(2),
            'value':"1"
        });

        dataLayer.push({
            'event':'trackEvent',
            'category':"LifeLens",
            'action':"Sum Assured",
            'label':addCommas(lifeInsuranceRequired.toFixed(0)),
            'value':"1"
        });

        dataLayer.push({
            'event':'trackEvent',
            'category':"LifeLens",
            'action':"Term",
            'label':term,
            'value':"1"
        });
    }
    catch(err) {
        //console.log(err);
    }
}

function insuranceRequiredCalc(mn, lc) {

    p1Welfare = CalculateStateBenefitAmount();
    if (lc < 0) {
        lc = 0;
    }

    if (numChildren > 0) {
        childAge > 2 ? term = 25 - childAge : term = 25;
    } else {
        term = 20;
    }

    // Sum assured Calcs
    var annuityRate = parseFloat((1 - Math.pow(1.03, -term)) / Math.log(1.03)).toFixed(2);
    conversionFactor = parseFloat(annuityRate * 12).toFixed(2);
    var sumAssuredCalced = parseFloat(mn * conversionFactor).toFixed(2);
    var currentMonthlyLC = parseFloat((lc / conversionFactor)).toFixed(2);
    var lifeInsurance = sumAssuredCalced - lc;

    if (lifeInsurance < 1) {
        lifeInsurance = 0;
    }
	else
	{
		lifeInsurance = Math.ceil(lifeInsurance/1000)*1000;
	}

    return lifeInsurance;
}

function getInputs() {
    p1Age = parseInt($('#age input').val());
    p1Year = today.getFullYear() - p1Age;
    p1Marital = $('#maritalStatus').val();
    p1Smoker = $('#smoker').val();
    p1MonthlyNeed = parseInt($("#p1Ival").text(), 10);

    if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
        numChildren = parseInt($("#numChildOutput").val(), 10);
        childAge = parseInt($("#ageChildOutput").val(), 10);
        p1MonthlyNeed = parseInt($("#p1NeedsSliderOutput").val().replace(/, /g, ''), 10);
        p1MonthlyWage = parseInt($("#monthlyWageSliderOutput").val().replace(/,/g, ''), 10);
    } else {
        numChildren = parseInt($('#numChild input').val(), 10);
        childAge = parseInt($('#ageChild input').val(), 10);
        p1MonthlyWage = parseInt($('#monthlyWage input').val().replace(/,/g, ''))
;    }

    if ($('#noKids').is(':checked')) {
        numChildren = 0;
        childAge = 0;
    }
}

function CalculateStateBenefitAmount() {
    var FrequencyAnn = 12;
    var SurvivorsPensionAnnualAmount = 10062; //193.50 * 52
    var SurvivorsPensionChildAnnualAmount = 1549.60; // 29.80 * 52;
    var WidowsBenefitAnnualAmount = 10062;
    var WidowsChildAnnualAmount = 1549.60; // 29.80 * 52;
    var childBenefitAmountAnnual = 0.0;
    var result = 0;
    (numChildren < 4) ? numChildren = numChildren: numChildren = 4; //Max 4

    if (p1Marital == "Married") {
        childBenefitAmountAnnual = SurvivorsPensionChildAnnualAmount * numChildren;
        result = Math.round((SurvivorsPensionAnnualAmount + childBenefitAmountAnnual) / FrequencyAnn);
    } else if (p1Marital == "Separated") {
        childBenefitAmountAnnual = WidowsChildAnnualAmount * numChildren;
        result = Math.round((WidowsBenefitAnnualAmount + childBenefitAmountAnnual) / FrequencyAnn);
    } else {
        result = 0;
    }
    return result;
}

// validate email address format    
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}


function callback(){
//#################################################################
//######## E M A I L   Q U O T E   T O   Y O U R S E L F ##########
//#################################################################
// Allow the user to email the details of the quote to themselves. 
// The email is sent using marketo and the details are stored on 
// the system. 


var n,e,p,t,z;
    z = 0;
    n = $('#callbackName').val();
    e = $('#callbackEmail').val();
    p = $('#callbackTelephone').val();
    t = $('#callbackCallTime').val();
    
    $("#nameError").hide().html("");
    $("#phoneError").hide().html("");
    $("#emailError").hide().html("");

    if(n.length<=3){
        z =z+1;
        $("#nameError").show().html("Invalid Name");
        $("#nameError").addClass("errorMessage");
    } else{
        $("#nameError").show().html("Name");
        $("#nameError").removeClass("errorMessage");
    }
    if(p.length<=7){
        z =z+1;
        $("#phoneError").show().html("Invalid Phone Number");
        $("#phoneError").addClass("errorMessage");
    } else{
        $("#phoneError").show().html("Phone Number");
        $("#phoneError").removeClass("errorMessage");
    }
    if(isEmail(e) == false){
        z =z+1;
        $("#emailError").show().html("Invalid Email");
        $("#emailError").addClass("errorMessage");
    }else{
        $("#emailError").show().html("Email");
        $("#emailError").removeClass("errorMessage");
    }

    if (z==0) {

        $("#callbackSent").html("Thank you "+n+". Your details have been received and we will be in touch.");
        $("#callbackSent").addClass("successMessage");
        // no errors
        // send the callback and change the screen

        mkAssociateLeadWithQuote('', n, e, p,"T",term,totalprem,lifeCover,'~', '~', p1Age,'~',p1Smoker,'~',t);
    } else{
        $("#callbackSent").html("");
        $("#callbackSent").removeClass("successMessage");
    }
};

})(jQuery);