var euro = "&#8364;"
var salary = 30000;
var p1Day = "";
var p1Month = "";
var p1Year = "";
var p1Job = "";
var p1JobClass = "";
var p1RetirementAge = "";
var p1DeferredPeriod = "";
var p1IncreaseWithInflation = true;
var p1SelfEmployed = false;
var p1Smoker = true;
var chart;
var incomeToProtect = 22500;
var coveredByState = 9776;
var coveredByYou = 12724;
var data = [7500,12724,9776]
var availableTags = [];

// function for getting the current version of ie
var ie = (function(){
    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : undef;
}());


var $xml;

var lifeCover,prem,premInclLevy,levy,fee,premEsc1,premOptionalExtras1,premGtdCover1,premIndex1,premEsc2,premOptionalExtras2,premGtdCover2,premIndex2;

$(document).ready( function() {

    if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
      $("select").css("display","block");
    }

    $("#start").click(function(event) {
      $("#splash").fadeOut(function() {
        $("#pageOne").fadeIn('1000',function(){
            createChart();
        });
      });
    });

    $(".slider").createSlider();
    $('#month').click(function(){
      $("#monthError").css("display","none");
      var dayCount  = daysInMonth($(this).val() ,$('#year').val());
      if (dayCount == 31) {
         $("#day").next().find("ul :nth-child(n+28)").removeClass("hideDays");
      } else if (dayCount == 30) {
         $("#day").next().find("ul :nth-child(n+29)").addClass("hideDays");
      } else if (dayCount == 28) {
        $("#day").next().find("ul :nth-child(n+27)").addClass("hideDays");
      } else{
        $("#day").next().find("ul :nth-child(n+28)").addClass("hideDays");
      }
    });

    $('#year').click(function(){
      var dayCount  = daysInMonth($(this).val() ,$('#year').val());
      if (dayCount == 31) {
         $("#day").next().find("ul :nth-child(n+28)").removeClass("hideDays");
      } else if (dayCount == 30) {
         $("#day").next().find("ul :nth-child(n+29)").addClass("hideDays");
      } else if (dayCount == 28) {
        $("#day").next().find("ul :nth-child(n+27)").addClass("hideDays");
      } else{
        $("#day").next().find("ul :nth-child(n+28)").addClass("hideDays");
      }
      if ($('#year').val() != "year"){
        $("#yearError").css("display","none");
      }
    });


    $('#day').click(function(){
      $("#dayError").css("display","none");
    });

    $('#salary').change(function(){
      if ( $(this).val().replace(/,/g,'') <15000 || $(this).val().replace(/,/g,'') == ""){
        $("#employerMI").slider("disable");
        $("#salary").addClass("error");
       $("#salaryError").css("display","block");
         salary = 0;
      } else {
        $("#salary").removeClass("error");
        $("#employerMI").slider("enable");
        var percentage = (incomeToProtect / salary * 100).toFixed();
        salary = parseInt( $('#salary').val().replace(/,/g,'') );
        $(".slider").slider('option',{min: parseInt( (salary / 100 * 10).toFixed()), max: parseInt((salary / 100 * 75).toFixed())});
        $(this).val(addCommas(salary));
        $('#sliderOutput').html((incomeToProtect / salary * 100).toFixed() + "%" + "/" + euro + addCommas(incomeToProtect));
      }

    });


    $( "#salary" ).focus(function() {
      if($(this).val() < 15000) {
         $("#salaryError").css("display","block");
        }
    });

     $( "#salary" ).blur(function() {
      if(parseInt( $(this).val().replace(/,/g,'') ) > 14999) {
           $("#salaryError").css("display","none");
        }
    });


    $("input[name=radio2]:radio").change(function(){
      if($("#selfEmployedYes").attr("checked")){
        coveredByState = 0;
      } else {
        coveredByState = 9776;
      }
      addData();
    });

    $('#sliderOutput').html("75%" + "/" + euro + "22,500");
    populateDropdowns();

    $("#getQuote").click(function(event){
      event.preventDefault();
      if ( getInputs() ){
        $("#pageOne").fadeOut(function(){
            $("#loadingPage").fadeIn("1000", function(){
              populateResults ();
              getQuote();
            });
            _gaq && _gaq.push(['_trackEvent','Enter Screen','getquote button clicked','Results screen']); 
        });
      }
    });

    

    $("#thirdScreenResultsBckBtn").click(function(event){
      event.preventDefault();
        $("#pageThree").fadeOut(function(){
           $("#pageTwo").fadeIn("1000");
           _gaq && _gaq.push(['_trackEvent','Enter Screen','Thank you back button','Results Screen']); 
        });
    });

    $("#backToInputs").click(function(event){
      event.preventDefault();
      _gaq && _gaq.push(['_trackEvent','Enter Screen','Wrong occupation back button','inputs Screen']); 
      $('#jobClassIssue').foundation('reveal', 'close');
    });

    $("#back").click(function(event){
        event.preventDefault();
        $("#pageTwo").fadeOut(function(){
          $("#pageOne").fadeIn("1000");
          _gaq && _gaq.push(['_trackEvent','Enter Screen','results back button','inputs Screen']); 
        });
    });

     $("#showBreakdown").click(function(event){
      if ($("#showBreakdown").html() == "Show Breakdown" ) {
          $("#quoteBreakdown").slideDown();
          $("#showBreakdown").html("Hide Breakdown");
      } else {
        $("#quoteBreakdown").slideUp();
         $("#showBreakdown").html("Show Breakdown");
      }
    });

     $("#bookReview").click(function(){
        $('#myModal').foundation('reveal', 'open');
         _gaq && _gaq.push(['_trackEvent','Enter Screen','Results screen get callback button','call back Screen']); 
    });

    $("#callback").click(function(){
        _gaq && _gaq.push(['_trackEvent','Enter Screen','Callback modal callback button','email sent']); 
        emailInfo();
    });

    $("#pageThree").css('height', "" + $("#pageTwo").height() + "px");
    $("#loadingPage").css('height', "" + $("#pageTwo").height() + "px");
    $(".center").css('margin-top', "" + ($("#pageTwo").height()/2) - 40 + "px");

    
});

$.ajax({
    type: "GET",
    // url: "http://www.irishlife.ie/servlet/occupationDataInsight.xml",
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
    $( "#userJob" ).autocomplete({
      source: availableTags
    });
});



function populateDropdowns(){
  var currentYear = new Date().getFullYear();

  var end = currentYear - 54;
  var start = currentYear - 20;
  var html = "";

  for (var i = start; i > end-1; i--) {
    html += "<option>" + i + "</option>";
  };

  $("#year").append(html);
  if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
   ;
  }
  else{
    Foundation.libs.forms.refresh_custom_select($('#year'), true);
  }

}

function getInputs(){
  var error = false;
  p1JobClass = "";
  p1Day = $('#day').val();
  p1Month = $('#month').val();
  p1Year = $('#year').val();

  p1Job = capitaliseFirstLetter( $('#userJob').val());

  $xml.find('Occupation').each(function () {
      var perm_hlth_ins;
      if($(this).attr('name') == p1Job){
         p1JobClass = $(this).attr('perm_hlth_ins');
      }
  });

  p1RetirementAge = $('#retirementAge').val();
  p1DeferredPeriod = $('#deferredStatus').val();

  p1Smoker = $("#smokeYes").attr("checked")? 'Y':'N';
  p1SelfEmployed = $("#selfEmployedYes").attr("checked")? 'Y':'N';
  p1IncreaseWithInflation = $("#inflationYes").attr("checked") ? "True": "False";


  if (p1Year == "Year"){
    $("#yearError").css("display","block");
      error = true;
  } else{
    $("#yearError").css("display","none");
  }

  if (p1Month == "Month"){
    $("#monthError").css("display","block");
      error = true;
  } else{
      $("#monthError").css("display","none");
  }

  if (p1Day == "Day"){
    $("#dayError").css("display","block");
      error = true;
  }
  else{
      $("#dayError").css("display","none");
  }

  if (salary < 15000){
      error = true;
  }

  if (incomeToProtect < coveredByState) {
    error = true;
  }

  if ( p1Job != "") {
    $("#userJob").removeClass("error");
    $("#jobError").css("display","none");

    if (p1JobClass == "D") {
      $('#jobClassIssue').foundation('reveal', 'open');
       error = true;
    } else if ( p1JobClass == ""){
      $("#userJob").addClass("error");
      $("#jobError").css("display","block");
      error = true;
    }
  }
  else{
    $("#userJob").addClass("error");
    $("#jobError").css("display","block");
    error = true;
  }

  if (error == true) {
    return false;
  } else {
    return true;
  }
}

function populateResults () {
  $(".salaryResult").html(euro + addCommas(salary));
  $("#selfEmployedResult").html("" + p1SelfEmployed == 'Y'? 'Yes':'No' );
  $(".incomeToProtectResult").html((incomeToProtect/salary *100).toFixed()+ "%" + "(" + euro + addCommas(incomeToProtect) + ")");
  $("#retirementAgeResult").html(p1RetirementAge);
  $("#dobResult").html(p1Day + "/" + p1Month + "/" + p1Year);
  $("#occupationResult").html(p1Job + "(" + p1JobClass +")");
  $("#smokerResult").html("" + p1Smoker == 'Y'? 'Yes':'No');
  $("#deferredResult").html(p1DeferredPeriod + " years");
  $("#inflationResult").html("" + p1IncreaseWithInflation == 'True'? 'Yes':'No');
  $(".annualIncapacityBenefit").html(euro + addCommas(coveredByYou));
}


function addCommas(nStr) {
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
function createChart () {

    var options = {
        chart: {
            renderTo: 'chartsContainer',
            type: 'column',
            height: $("#userDetails").height()
        },
        colors: [
           '#435399', 
           '#5cc151', 
           '#F19C2B'
        ],

        title: {
            text: 'Your Income'
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Your Income'
            },

            tickPositions: [0,75, 100]
        },
        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
            shared: true
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            }
        },
        series: [{
            name: 'Not Covered',
            data: [7500],
            pointWidth: 125
        }, {
            name: 'Covered By You',
            data: [12724],
            pointWidth: 125
        }, {
            name: 'Covered By State',
            data: [coveredByState],
            pointWidth: 125
        }]
    };
    chart = new Highcharts.Chart(options);
}

function addData(){
      if ((salary / 100) * 75 < (incomeToProtect)) {
        chart.series[0].setData([(salary / 100) * 25]); //cap at 75%
        coveredByYou = (salary / 100) * 75
      } else {
        if (incomeToProtect < coveredByState) {
          chart.series[0].setData([salary - coveredByState]);
          $('#sliderOutput').addClass("errorText");
          $('#precentError').addClass("errorText");
        } else {
          chart.series[0].setData([salary - incomeToProtect]);
          $('#precentError').removeClass("errorText");
          $('#sliderOutput').removeClass("errorText");
        }

        coveredByYou = Math.max(incomeToProtect - coveredByState,0);
      }
      chart.series[1].setData([coveredByYou]);
      chart.series[2].setData([coveredByState]);
};

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

jQuery.fn.extend({
    createSlider: function () {;

        $(this).slider({
            animate: true,
            range: "min",
            step: 1000,
            min: salary/100 * 10,
            max: salary/100 * 75,
            value: salary/100 * 75,

            /*Not sure if this function is relevant all it seems to do is populate the feilds with 0s to begin with*/
            start: function ( event, ui ) {
                $("#sliderOutput").addClass('sliderActive');
            },
            
            slide: function(event, ui){
                $('#sliderOutput').html( (ui.value/salary *100).toFixed()+ "%" + "/" + euro + addCommas("" + ui.value));
                incomeToProtect = ui.value;
                addData();
            },

            stop: function(event, ui
              ){
               $("#sliderOutput").removeClass('sliderActive');
                $('#sliderOutput').html( (ui.value/salary *100).toFixed()+ "%" + "/" + euro + addCommas("" + ui.value));

            }
        });
    }
});


function getQuote(){
    var headID = document.getElementsByTagName("head")[0];
    var newScript = document.createElement('script');
    
    newScript.type = 'text/javascript';
    newScript.onload= quoteResults;

    // incomeIncreaseRate=5
    
    var params = "?quickQuoteId=incomeProtection&productId=24&coverTypeCd=L&jointLife=False&"+
    "dateOfBirth1Day=" + p1Day + "&dateOfBirth1Month=" + p1Month + "&dateOfBirth1Year=" + p1Year + "&sexCd1=M&smokerCd1=" + p1Smoker +
    "&frequencyCd=M&incomeAmt=" + coveredByYou + "&incomeIncreaseRate=5&occupationClass="+ p1JobClass +"&deferredWeeks=" + p1DeferredPeriod +
    "&endAge=" + p1RetirementAge + "&indexation=" + p1IncreaseWithInflation;

  
    if (ie < 9) {
        $.getScript( 'https://www.irishlife.ie/secure/submitLifeQuote.js'+ params, quoteResults );
    }
    else{
        newScript.src = 'https://www.irishlife.ie/secure/submitLifeQuote.js' + params;
        headID.appendChild(newScript);
    }
}

// https://www.irishlife.ie/secure/submitLifeQuote.js??quickQuoteId=incomeProtection&productId=24&coverTypeCd=L&jointLife=False&dateOfBirth1Day=10&dateOfBirth1Month=2&dateOfBirth1Year=1993&sexCd1=M&smokerCd1=N&frequencyCd=M&incomeAmt=12224&incomeIncreaseRate=5&occupationClass=2&deferredWeeks=13&endAge=65&indexation=False

function quoteResults(){
    var temp = new Array();
    var reggie = /=|&/;
    temp = result.split(reggie)
    lifeCover = parseFloat(temp[1]);
    prem = parseFloat(temp[5]);
    premInclLevy = parseFloat(temp[7]);
    levy = parseFloat(temp[9]);
    fee = parseFloat(temp[11]);
    premEsc1 = parseFloat(temp[13]);
    premOptionalExtras1 =parseFloat(temp[15]); 
    premGtdCover1 = parseFloat(temp[17]);
    premIndex1 = parseFloat(temp[19]);
    premEsc2 = temp[21];
    premOptionalExtras2 = temp[23];
    premGtdCover2 = temp[25];
    premIndex2 = temp[27];

    $("#prem").html(euro + prem);
    $("#levy").html(euro + (levy).toFixed(2));
    $("#inflation").html(euro + (premEsc1).toFixed(2));
    $(".monthlyPrem").html( euro +  (fee + premInclLevy + premEsc1 + 4).toFixed(2));


    $("#loadingPage").fadeOut("1000",function(){
      $("#pageTwo").fadeIn(function(){
          var descriptionHeight = $("#rightTable .title").outerHeight() + $("#rightTable #price1").outerHeight() + $("#rightTable #price2").outerHeight() + $("#rightTable .bullet-item").outerHeight() + $("#rightTable .cta-button").outerHeight();
          var personalDetailsHeight = $("#personalDetails").outerHeight();
          var descriptionHeight = ( personalDetailsHeight - descriptionHeight) -1;
          $("#rightTable .description").css("height", "" + descriptionHeight + "px");
      });
    });
}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function calcAge(dateString) {
    var birthday = +new Date(dateString);
    return ~~((Date.now() - birthday) / (31557600000));
}

function emailInfo() {
    var extraInforForEmail;
    timestamp=Number(new Date());
    
    extraInforForEmail = 
      "\n\nSalary/income: " + salary +

      "\nSelf Employed: " + p1SelfEmployed+
      "\nSmoker: " + p1Smoker +
      "\nDate of Birth: " + p1Day + "/" + p1Month + "/" + p1Year +
      "\nOccupation:" + p1Job +
      "\n% of Income to Protect:" + incomeToProtect +
      "\nRetirement Age:" + p1RetirementAge +
      "\nDeferred Period:" + p1DeferredPeriod +
      "\nIncrease With Inflation:" + p1IncreaseWithInflation;


    extraInforForEmail = extraInforForEmail + "\n\n#### QUOTE ####\nEuro: " + addCommas( premInclLevy )//prmLev
    + "\n\n#### IMPORTANT ####\nThis quote is valid for 7 days.";

    if ($("#telephone").val().length >=7) {
        $('#phoneError').css('visibility', 'hidden');
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
        
        sendClickToCallback (
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
        );

        function be(){
        }
        function se(){
        }
        function ee(){
        }
    
        var quoteType = "T";
        // Term = ;

        


        if ( $("#email").val() ) {
          mkAssociateLeadIncomeProtection(''+$("#name").val(), 'NULL',emailAddress, ''+$("#telephone").val(), addCommas( premInclLevy ), calcAge(p1Year,p1Month,p1Day), p1RetirementAge, p1Job, salary, incomeToProtect, p1DeferredPeriod, p1IncreaseWithInflation, p1Smoker, p1SelfEmployed, $('#callTime').val() );
        }

        $('#myModal').foundation('reveal', 'close');
        $("#pageTwo").fadeOut(function(){
           $("#pageThree").fadeIn("1000");
        });
        
        if (_gaq) {
            _gaq.push(['_trackEvent','Click to callback', 'Times',$('#callTime').val()]);
            _gaq.push(['_trackPageview',trackpageurl+'#callback']);
            mkVisitWebPage(trackpageurl+'#callback');
        }
    }
    else {
        $('#phoneError').css('visibility', 'visible');
    }

    return false;
};

