(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);

function updateOthers(name, value)
{
	$('.'+name).val(value);
	reset();
}
var incomeTaxCalcPageOnly=false;
var maxPensionFund=2300000;
var taxFreeLimit=200000;
var upliftScalesLS=[0.0375,0.075,0.1125,0.15,0.1875,0.225,0.2625,0.3,0.375,0.45,0.525,0.6,0.675,0.7875,0.9,1.0125,1.125,1.2375,1.35,1.5];
var upliftScalesPen=[0.0667,0.1333,0.2,0.2667,0.3333,0.4,0.4667,0.5333,0.6,2/3];
var capFactors = new Array(4);
for (i = 0; i < capFactors.length; ++ i)
{	capFactors [i] = new Array ();}

//Male single
capFactors[0][0]=24.4;
capFactors[0][1]=23.6;
capFactors[0][2]=22.8;	
capFactors[0][3]=22;
capFactors[0][4]=21.2;
capFactors[0][5]=20.4;
capFactors[0][6]=19.6;
capFactors[0][7]=18.9;
capFactors[0][8]=18.1;
capFactors[0][9]=17.4;
capFactors[0][10]=16.7;

//Male Married
capFactors[1][0]=32.4;
capFactors[1][1]=31.6;
capFactors[1][2]=30.8;
capFactors[1][3]=30;
capFactors[1][4]=29.2;
capFactors[1][5]=28.4;
capFactors[1][6]=27.6;
capFactors[1][7]=26.8;
capFactors[1][8]=26;
capFactors[1][9]=25.2;
capFactors[1][10]=24.4;

//Female Single
capFactors[2][0]=27.5;
capFactors[2][1]=26.8;
capFactors[2][2]=26;
capFactors[2][3]=25.3;
capFactors[2][4]=24.6;
capFactors[2][5]=23.8;
capFactors[2][6]=23.1;
capFactors[2][7]=22.4;
capFactors[2][8]=21.6;
capFactors[2][9]=20.9;
capFactors[2][10]=20.2;

//Female Married
capFactors[3][0]=30;
capFactors[3][1]=29.2;
capFactors[3][2]=28.4;
capFactors[3][3]=27.5;
capFactors[3][4]=26.7;
capFactors[3][5]=25.9;
capFactors[3][6]=25.1;
capFactors[3][7]=24.3;
capFactors[3][8]=23.5;
capFactors[3][9]=22.6;
capFactors[3][10]=21.8;

var incomeTaxThresholds = new Array(4);
//single - zero
incomeTaxThresholds[0]=18000;
//married - zero
incomeTaxThresholds[1]=36000;
//single - standard
incomeTaxThresholds[2]=32800;
//married - standard
incomeTaxThresholds[3]=36000;

var statePension=new Array(2);
statePension[0]=11976;
statePension[1]=22703;



$(document).ready(function () {
$('.resultHolderSpinner').hide();
var ageStart="40",earnStart="50000",eeCon="1000", erCon="1000",yearsStart="1",spouseStart="50",
nraStart="60",currentStart="25000",lumpStart="10000", currentValuePrevJobs="0";
		$( ".pensionCTSliderAgeResult" ).html( ageStart );
		$( ".pensionCTSliderNRAResult" ).html( nraStart );
		$( ".pensionCTSliderSpouseResult" ).html( spouseStart );
		$( ".pensionCTSliderNetRelevantResult" ).val( earnStart );
		$( ".pensionCTSliderCurrentValueResult" ).val( currentStart );
		$( ".pensionCTSliderEmployeeConResult" ).val( eeCon );
		$( ".pensionCTSliderEmployerConResult" ).val( erCon );
		$( ".pensionCTSliderYearsCurrentEmployerResult" ).html( yearsStart );
		$( ".pensionCTSliderLumpSumPrevResult" ).val( lumpStart );
		$( ".pensionCTSliderCurrentValuePrevJobsResult" ).val( currentValuePrevJobs );
    
        /* print screen */
        //$('.pensionCTSliderSpouseResultprint').html(spouseStart);
		
		reset();
		
    $( ".pensionCTSliderYearsCurrentEmployer" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:yearsStart,min: 1,max: 40,step: 1,
		slide: function( event, ui ) {
		$('.sliderBubble').fadeOut('fast');
		$( ".pensionCTSliderYearsCurrentEmployerResult" ).html( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderYearsCurrentEmployerResult').css('background-color','#feffc6');
			 $('.pensionCTSliderYearsCurrentEmployerResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderYearsCurrentEmployerResult').css('background-color','#fafafa');
			 $('.pensionCTSliderYearsCurrentEmployerResult').css('color','#82a623');
			 $(".pensionCTSliderYearsCurrentEmployer").slider("option", "value", ui.value);
			 reset();
		}
    });
	
	
	$( ".pensionCTSliderAge" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:ageStart,min: 18,max: 70,step: 1,
		slide: function( event, ui ) {
		$('.sliderBubble').fadeOut('fast');
		$( ".pensionCTSliderAgeResult" ).html( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderAgeResult').css('background-color','#feffc6');
			 $('.pensionCTSliderAgeResult').css('color','#ee1c23');
			 
		},		
		stop: function(e,ui){
			 $('.pensionCTSliderAgeResult').css('background-color','#fafafa');
			 $('.pensionCTSliderAgeResult').css('color','#82a623');
			 $(".pensionCTSliderAge").slider("option", "value", ui.value);
			 reset();
		}
    });
    
	$( ".pensionCTSliderNRA" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:ageStart,min: 60,max: 70,step: 1,
		slide: function( event, ui ) {
		$('.sliderBubble').fadeOut('fast');
		$( ".pensionCTSliderNRAResult" ).html( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderNRAResult').css('background-color','#feffc6');
			 $('.pensionCTSliderNRAResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderNRAResult').css('background-color','#fafafa');
			 $('.pensionCTSliderNRAResult').css('color','#82a623');
			 $(".pensionCTSliderNRA").slider("option", "value", ui.value);
			 reset();
		}
    });
	$( ".pensionCTSliderSpouse" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:spouseStart,min: 0,max: 100,step: 1,
		slide: function( event, ui ) {
		$('.sliderBubble').fadeOut('fast');
		$( ".pensionCTSliderSpouseResult" ).html( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderSpouseResult').css('background-color','#feffc6');
			 $('.pensionCTSliderSpouseResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderSpouseResult').css('background-color','#fafafa');
			 $('.pensionCTSliderSpouseResult').css('color','#82a623');
			 $(".pensionCTSliderSpouse").slider("option", "value", ui.value);
			 $(".pensionCTSliderSpouseResultprint ").html(ui.value);
             
			reset();			 
		}
    });
    
	$( ".pensionCTSliderNetRelevant" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:earnStart,min: 10000,max: 350000,step: 500,
		slide: function( event, ui ) {
		$( ".pensionCTSliderNetRelevantResult" ).val( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderNetRelevantResult').css('background-color','#feffc6');
			 $('.pensionCTSliderNetRelevantResult').css('color','#ee1c23');
			
		},
		stop: function(e,ui){
			 $('.pensionCTSliderNetRelevantResult').css('background-color','#fafafa');
			 $('.pensionCTSliderNetRelevantResult').css('color','#82a623');
			 $(".pensionCTSliderNetRelevant").slider("option", "value", ui.value);
			reset();
		}
    });
    
	$( ".pensionCTSliderCurrentValue" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:earnStart,min: 0,max: 1000000,step: 2000,
		slide: function( event, ui ) {
		$( ".pensionCTSliderCurrentValueResult" ).val( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderCurrentValueResult').css('background-color','#feffc6');
			 $('.pensionCTSliderCurrentValueResult').css('color','#ee1c23');
			 
		},
		
		stop: function(e,ui){
			 $('.pensionCTSliderCurrentValueResult').css('background-color','#fafafa');
			 $('.pensionCTSliderCurrentValueResult').css('color','#82a623');
			 $(".pensionCTSliderCurrentValue").slider("option", "value", ui.value);	
			reset();
		}
    });
	
		$( ".pensionCTSliderCurrentValuePrevJobs" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:currentValuePrevJobs,min: 0,max: 1000000,step: 2000,
		slide: function( event, ui ) {
		$( ".pensionCTSliderCurrentValuePrevJobsResult" ).val( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderCurrentValuePrevJobsResult').css('background-color','#feffc6');
			 $('.pensionCTSliderCurrentValuePrevJobsResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderCurrentValuePrevJobsResult').css('background-color','#fafafa');
			 $('.pensionCTSliderCurrentValuePrevJobsResult').css('color','#82a623');
			 $(".pensionCTSliderCurrentValuePrevJobs").slider("option", "value", ui.value);		
			reset();			 
		}
    });
	
	
	
	$( ".pensionCTSliderLumpSumPrev" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:earnStart,min: 0,max: 150000,step: 1000,
		slide: function( event, ui ) {
		$( ".pensionCTSliderLumpSumPrevResult" ).val( ui.value );
		},
		start: function(e,ui){

			 $('.pensionCTSliderLumpSumPrevResult').css('background-color','#feffc6');
			 $('.pensionCTSliderLumpSumPrevResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderLumpSumPrevResult').css('background-color','#fafafa');
			 $('.pensionCTSliderLumpSumPrevResult').css('color','#82a623');
			 $(".pensionCTSliderLumpSumPrev").slider("option", "value", ui.value);		
				reset();			 
		}
    });
	
	
	
	$( ".pensionCTSliderEmployeeCon" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:eeCon,min: 0,max: 46000,step: 500,
		slide: function( event, ui ) {
		$( ".pensionCTSliderEmployeeConResult" ).val( ui.value );
		},
		start: function(e,ui){
			 $('.pensionCTSliderEmployeeConResult').css('background-color','#feffc6');
			 $('.pensionCTSliderEmployeeConResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderEmployeeConResult').css('background-color','#fafafa');
			 $('.pensionCTSliderEmployeeConResult').css('color','#82a623');
			 $(".pensionCTSliderEmployeeCon").slider("option", "value", ui.value);			
			reset();			 
		}
    });
    
    
    
	$( ".pensionCTSliderEmployerCon" ).slider({
		handle: '#slider-handle',range:"min",animate: true,value:erCon,min: 0,max: 46000,step: 500,
		slide: function( event, ui ) {
		$( ".pensionCTSliderEmployerConResult" ).val( ui.value );
		},
		start: function(e,ui){
			 $('.pensionCTSliderEmployerConResult').css('background-color','#feffc6');
			 $('.pensionCTSliderEmployerConResult').css('color','#ee1c23');
			 
		},
		stop: function(e,ui){
			 $('.pensionCTSliderEmployerConResult').css('background-color','#fafafa');
			 $('.pensionCTSliderEmployerConResult').css('color','#82a623');
			 $(".pensionCTSliderEmployerCon").slider("option", "value", ui.value);	
			reset();			 
		}
    });
    $('.resultHolder').show(0);
    
	if (window.location.pathname == '/pensions/income-tax-relief-relevant-year.html' ||
	    window.location.pathname == '/uploadedfiles/bline/templates/article-full-width-pension-tools.aspx')
	{
		// formatIncomeTaxReliefSoloPage();
		incomeTaxCalcPageOnly=true;
	}
	
	
});

function formatIncomeTaxReliefSoloPage()
{
		$('#bodyFooter').hide();
		$('#trailingFooter').hide();
		$('.breadcrumbs').hide();
		$('#navigation').hide();
		$('#logo').hide();
		$('#banner').hide();
		$('#search_area').hide();
		$('.sliderRow').css('margin-top','10px');
		$('.sliderRowHalf').css('margin-top','10px');
		$('.sliderRow fieldset').css('width','440px');
		$('.sliderLeft').css('width','440px');
		$('.sliderRow').css('width','640px');
		$('#container').css('width','685px');
		$('.slidingBlockInputs .content').css('margin','10px 10px 20px 12px');
		$('.slidingBlockInputs .content').css('padding','0 5px 10px');
		$('.slidingBlockOutputs .content').css('margin','10px 100px 20px 8px');
		//$('.slidingBlockOutputs').css('margin-right','-1100px');
		$('.slidingBlockOutputs').addClass("slidingBlockOutputsSmall");
		$('#content_container_fullwidth').attr('id','narrow-container');
		$('body').css('background-color','#ffffff');
		$('#container').css('border','none');
}

function updateSliderAndFormValues(sliderName, value)
{
$('.'+sliderName).slider("option", "value", value);		
$('.'+sliderName+'Result').val(value);

}

// set a default option to be used by the 
// open close arrows
var whichOneOpen = "A"; 

doCalcs = function(whichOne){
    
    showResults();
    showResultsBlock(whichOne);

    var age, sal, existingContrib, employerContrib, salaryCap=115000, taxRate, percentEarningsLimit=0, maxContrib=0, maxContribLessExisting=0, taxReliefAmt=0, netCostOfContribution=0,nra,service,prevLumpSum,termNRA,serviceNRA,
	finalIncome,gender,marital,maxPension,currentValue,maxPctLS=0, maxPctPen=0, currentValuePrevJobs=0;

	age=$('.pensionCTSliderAgeResult').html();
	sal=Number($('.pensionCTSliderNetRelevantResult').val());
	existingContrib=Number($('.pensionCTSliderEmployeeConResult').val());
	employerContrib=Number($('.pensionCTSliderEmployerConResult').val());
	taxRate=Number($('#taxrate').val());
	service=$('.pensionCTSliderYearsCurrentEmployerResult').html();
	log('service ' + service);
	nra=$('.pensionCTSliderNRAResult').html();
	prevLumpSum=Number($('.pensionCTSliderLumpSumPrevResult').val());
	currentValue=Number($('.pensionCTSliderCurrentValueResult').val());
	currentValuePrevJobs=Number($('.pensionCTSliderCurrentValuePrevJobsResult').val());
	
	termNRA = nra - age - 1;
	log('termNRA ' + termNRA);
	serviceNRA = Number(termNRA) + Number(service);
	log('serviceNRA ' + serviceNRA);
	finalIncome = Number(sal*Math.pow(1.03,termNRA));
	gender=Number($('.gender').val());
	marital=Number($('.marital').val());
	incomeTaxAim=Number($('.rateAim').val());
    
	
    /* Print view outputs */
    $('.taxRatePrint').html(taxRate+"%");
    $('.pensionCTSliderAgeprint').html(age);
    $('.pensionCTSliderNetRelevantResultprint').html('&euro;'+sal.toFixed(0));
    $('.pensionCTSliderNetRelevantResultprint').digits();
    
    $('.pensionCTSliderEmployeeConResultprint').html('&euro;'+existingContrib.toFixed(0));
    $('.pensionCTSliderEmployeeConResultprint').digits();
    
    $('.pensionCTSliderEmployerConResultprint').html('&euro;'+employerContrib.toFixed(0));
    $('.pensionCTSliderEmployerConResultprint').digits();
    
    $('.pensionCTSliderCurrentValueprint').html('&euro;'+currentValue.toFixed(0));
    $('.pensionCTSliderCurrentValueprint').digits();
    
    $('.pensionCTSliderCurrentValuePrevJobsprint').html('&euro;'+currentValuePrevJobs.toFixed(0));
    $('.pensionCTSliderCurrentValuePrevJobsprint').digits();
    
    $('.pensionCTSliderNRAResultprint').html(nra);

    $('.pensionCTSliderYearsCurrentEmployerResultprint').html(service);
    
    $('.pensionCTSliderLumpSumPrevResultprint').html('&euro;'+prevLumpSum.toFixed(0));
    $('.pensionCTSliderLumpSumPrevResultprint').digits();
    
    if(gender=="0"){
        $('.genderprint').html("Male");
    }else{
        $('.genderprint').html("Female");
    }
    
    if(marital=="1"){
        $('.maritalprint').html("Married");
    }else{
        $('.maritalprint').html("Single");
    }
    
    if(age>75) percentEarningsLimit=0;
    else if(age<30) percentEarningsLimit=15;
    else if(age<40) percentEarningsLimit=20;
    else if(age<50) percentEarningsLimit=25;
    else if(age<55) percentEarningsLimit=30;
    else if(age<60) percentEarningsLimit=35;
    else if(age>59) percentEarningsLimit=40;
    else if(age<0) percentEarningsLimit=0;
	
	
	//D Tax Limits	
    // Set the outputs
    $('.percentlimits').html(percentEarningsLimit.toFixed(0)+"%");        
    /*    Max contribution allowed    */
    maxContrib= Math.min(Number(sal)+Number(employerContrib), Number(salaryCap))*percentEarningsLimit/100;
 
    
    $('.maxContsA').html('&euro;'+maxContrib.toFixed(0));
	$('.maxContsA').digits();
    /*    Max contribution less existing    */  
    maxContribLessExisting = Math.max(0,maxContrib - existingContrib - employerContrib);
    $('.maxContsLessExisting').html('&euro;'+maxContribLessExisting.toFixed(0));
    /*    Tax relief amount     */
    $('#taxReliefAmt').html('&euro;'+Number(taxRate/100*maxContribLessExisting).toFixed(0));
    /*     Net current cost     */
    $('#netCurrentCost').html('&euro;'+ Number((1-taxRate/100)*maxContribLessExisting).toFixed(0));  
    $('#maxConts').digits();
    $('.maxContsLessExisting').digits();
    $('#taxReliefAmt').digits();
    $('#netCurrentCost').digits();
	
	var existingContsA = existingContrib + employerContrib
	$('#existingContsA').html('&euro;'+existingContsA.toFixed(0));
	$('#existingContsA').digits();
	
	//B Lump Sum	
	$('#currentIncomeB').html('&euro;'+sal.toFixed(0));
	$('#estimatedFinalIncomeB').html('&euro;'+finalIncome.toFixed(0));
	$('#yearsToNRAB').html(termNRA);
	$('#serviceToNRAB').html(serviceNRA);

	if (serviceNRA >= 20)
	{
		maxPctLS=upliftScalesLS[19];
	}
	else
	{
		maxPctLS=upliftScalesLS[serviceNRA - 1];
	}
	
	
	//Discounted value: P = A/(1 + r)^n
	var maxLumpSum1=Math.max((Math.min(finalIncome*maxPctLS,(finalIncome*1.5)-prevLumpSum)),0);
	var maxLumpSum2=finalIncome*(Math.min((3/80)*serviceNRA,120/80));

	if (whichOne == 'B')
	{
		calcLSPrem(age, sal, nra, maxLumpSum1,maxLumpSum2, prevLumpSum,currentValue);
	}


	
	
	
	//C Rev Max Limits
	var capFactor=capFactors[gender+marital][nra-60];
	
	var assumedNumAnnualPayments = nra -age;
	//termNRA
	//number annual payments
	//serviceNRA
	//
	//
	if (serviceNRA >= 10)
	{
		maxPctPen=upliftScalesPen[9];
	}
	else
	{
		maxPctPen=upliftScalesPen[serviceNRA - 1];
	}
	
	log ('uplift pen ' + maxPctPen);
	maxPension=sal*maxPctPen;
	
	var penByCapFactor=(maxPension.toFixed(2)*capFactor);
	var penByCapFactorLessRetained=penByCapFactor-(currentValue + currentValuePrevJobs);
	//log('big number ' + capFactor + ' * ' + maxPension.toFixed(2) + " = " + penByCapFactorLessRetained);
	var maxCont1=penByCapFactorLessRetained/assumedNumAnnualPayments;
	
	$('#maxContC1').html('&euro;'+maxCont1.toFixed(0));
	$('#maxContC1').digits();
	$('#maxContPct1').html(((maxCont1/sal)*100).toFixed(2)+'%');
		
	var ratioCompletePotential=penByCapFactor*service/(Number(service)+Number(assumedNumAnnualPayments));
	//log ("Ratio: " + penByCapFactor + " * " + service + "/(" + service + " + " + assumedNumAnnualPayments + ")");
	var maxSPC=Math.max(ratioCompletePotential-(currentValue + currentValuePrevJobs),0);
	$('#maxSPC').html('&euro;'+maxSPC.toFixed(0));
	$('#maxSPC').digits();
	var maxEmpAPCC = ((penByCapFactorLessRetained-maxSPC)/assumedNumAnnualPayments);
	$('#maxEmpAPCC').html('&euro;'+maxEmpAPCC.toFixed(0));
	$('#maxEmpAPCC').digits();
	
	//=MIN(C27/(B19+1),C44)
	var maxEmpSPC=Math.min(penByCapFactorLessRetained/(assumedNumAnnualPayments+1),maxSPC);
	$('#maxEmpSPC3').html('&euro;'+maxEmpSPC.toFixed(0));
	$('#maxEmpSPC3').digits();
	
	//=(C27-C50)/B19
	var maxPensC=(penByCapFactorLessRetained-maxEmpSPC)/assumedNumAnnualPayments;
	$('#maxPensionC').html('&euro;'+maxPensC.toFixed(0));
	$('#maxPensionC').digits();
	
	if (whichOne == 'C')
	{
		var sp1=Number(currentValue)+Number(currentValuePrevJobs);
		var sp2=Number(currentValue)+Number(currentValuePrevJobs)+maxSPC;
		var sp3=Number(currentValue)+Number(currentValuePrevJobs)+maxEmpSPC;
		calcRevMaxProjections(age, sal, nra,
		Number(maxCont1.toFixed(2)/12).toFixed(2),sp1.toFixed(0),
		Number(maxEmpAPCC.toFixed(2)/12).toFixed(2),sp2.toFixed(0),
		Number(maxPensC.toFixed(2)/12).toFixed(2),sp3.toFixed(0));
	}
	
	
	//A Pension Gap
	var taxThreshold = Number(incomeTaxThresholds[marital + incomeTaxAim]);
	$('#taxThreshold').html('&euro;'+taxThreshold);
	$('#taxThreshold').digits();
	$('#statePension').html('&euro;'+statePension[marital]);
	$('#statePension').digits();
	var incomeGap=0;
	if (whichOne == 'A')
	{
		projectCurrentPension(age, sal, nra,serviceNRA, Number(currentValue)+Number(currentValuePrevJobs) , marital, $('.pensionCTSliderSpouseResult').html(), taxThreshold);
	}

	if (whichOne == 'A')
	{
		
	}
 
   //$('.resultHolder').hide(0).delay(150).show(0);
   trackPageView(whichOne);
}

function trackPageView(whichOne)
{
	page = '';
	if (whichOne == 'A')
	{
		page = 'incomeGap';
	}
	else if (whichOne == 'B')
	{
		page = 'maxLumpSum';
	}
	else if (whichOne == 'C')
	{
		page = 'revMax'
	}
	else if (whichOne == 'D')
	{
		page = 'taxLimits';
	}

	ga('send','pageview','/pensions/retirement-planning-calculators-'+page+'.html');
}



$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}


$('#taxrate').change(function() {
  reset();
});

$('#openPensionA').click(function(){
    hideEverything();
    showPensionCalc('A');
});

$('#openPensionB').click(function(){
    hideEverything();
    showPensionCalc('B');
});

$('#openPensionC').click(function(){
    hideEverything();
    showPensionCalc('C');
});

$('#openPensionD').click(function(){
    hideEverything();
    showPensionCalc('D');
});


showPensionCalc = function(calcLetter){
    // Show what we need only
    $('#openPension'+calcLetter).addClass('icon'+calcLetter+'selected');
    $('#calc'+calcLetter+'Inputs').show();
    $('.calc'+calcLetter+'Outputs').show();
}







/* 
################################################################################################################
################################################################################################################
################################################################################################################
################################################################################################################
*/
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}
});




$('#showResult').click(function(){
    doCalcs(whichOneOpen);
});

showResults = function(){

    $('.slidingBlockOutputs').animate(
    {
        right:790
    }, {
        duration: 700, 
        easing: 'easeOutBack',
        complete: updateContainerHeight
        });
}

showResultsBlock = function(whichOne){
    hideOutputBlocks();
    $('.slidingBlockOutputs').addClass('ie6WidthFix');
    $('#showResult').removeClass();
    $('#hideResult').show();
    $('#showResult').hide();
    $('.calc'+whichOne+'Outputs').show();
    $('.'+whichOne+'messages').show();
    
    
    //showPensionCalc(whichOne);
}


$('#hideResult').click(function(){
    hideResults();
});


hideResults = function(){
    
    // $('.slidingBlockOutputs').animate({
    //     right:0
    // }, {
    //     duration: 500, 
    //     easing: 'easeInBack'
    // });

    $(".slidingBlockOutputs" ).animate({
	    right:0
	 }, 500, function() {
	    // Animation complete.
	 });

    $('.slidingBlockOutputs').removeClass('ie6WidthFix');
    $('#hideResult').hide();
    $('#showResult').show();
}


$('.openPensionA').click(function(){
    hideResults();
    $(".slidingBlockTabs li").removeClass("selected");
    $(this).parent().addClass('selected');
    showPensionCalc('A');    
    whichOneOpen = "A";
    
});

$('.openPensionB').click(function(){
    hideResults();
    $(".slidingBlockTabs li").removeClass("selected");
    $(this).parent().addClass('selected');
    showPensionCalc('B');
    whichOneOpen = "B";
	
});

$('.openPensionC').click(function(){
    hideResults();
    $(".slidingBlockTabs li").removeClass("selected");
    $(this).parent().addClass('selected');
    showPensionCalc('C');
    whichOneOpen = "C";
	
});

$('.openPensionD').click(function(){
    hideResults();
    $(".slidingBlockTabs li").removeClass("selected");
    $(this).parent().addClass('selected');
    showPensionCalc('D');
    whichOneOpen = "D";
	
});

$('#showPrint').click(function(){
window.print();
return false;
});




hideEverything = function(){
    // Hide Everything
    $('.openPensionA').removeClass('iconAselected');
    $('.openPensionB').removeClass('iconBselected');
    $('.openPensionC').removeClass('iconCselected');
    $('.openPensionD').removeClass('iconDselected');
    
    $('.calcAInputs').hide();
    $('.calcBInputs').hide();
    $('.calcCInputs').hide();
    $('.calcDInputs').hide();
    
    hideOutputBlocks();
}

hideOutputBlocks = function(){

    $('.calcAOutputs').hide();
    $('.calcBOutputs').hide();
    $('.calcCOutputs').hide();
    $('.calcDOutputs').hide();
    
    $('.Amessages').show();
    $('.Bmessages').show();
    $('.Cmessages').show();
    $('.Dmessages').show();
}
showOutputBlocks = function(){

    $('.calcAOutputs').show();
    $('.calcBOutputs').show();
    $('.calcCOutputs').show();
    $('.calcDOutputs').show();
}
showPensionCalc = function(calcLetter){

    showOutputBlocks();
    hideEverything();
    //alert(calcLetter);
    // Show what we need only
    //$('#openPension'+calcLetter).addClass('icon'+calcLetter+'selected');
    $('.calc'+calcLetter+'Inputs').show();
    $('.calc'+calcLetter+'Outputs').show();
    
    
   
}
updateContainerHeight = function(){

    var minboxHeight = $('.slidingBlockOutputs .content').height();
    var currentboxHeight = $('.slidingBlockInputs').height();
    if (currentboxHeight<minboxHeight){
        $('.slidingBlockInputs').height(minboxHeight);
    }
	if (incomeTaxCalcPageOnly == false)
    {
		//$("html, body").animate({ scrollTop: 210 }, 600);
		$('body, html').animate({scrollTop : 210}, 600);
		}
}

function reset()
{
	$('.results').html('<span class="smallSpinner">&nbsp;</span>');
	$('.taxFreeLimitB').html('&euro;'+taxFreeLimit);
	$('.taxFreeLimitB').digits();
	$('.resultMessage').addClass('hidden');
}

function calcLSPrem(age, income, nra, lumpsum1, lumpsum2, prevLumpSum, currentValue)
{
	var prem1=0;
	var prem2=0;
	var today1=0;
	var today2=0;
	
	$.get("/servlet/submitPensionQuote.do?type=1&freq=Y&age="+age+"&income="+income+"&ret="+nra+"&target1="+lumpsum1.toFixed(2)+"&target2="+lumpsum2.toFixed(2)+"&sp="+currentValue.toFixed(2), function(data){
	str = jQuery.trim(data);
		if (str.length > 10) 
		{
			var variables = str.split('&');
			prem1=variables[0].split('=')[1];
			prem2=variables[2].split('=')[1];
			today1=Number(variables[1].split('=')[1]);
			today2=Number(variables[3].split('=')[1]);

		}
		
		$('#maxLSUpliftPrem').html('&euro;' + prem1);
		$('#maxLSUpliftPrem').digits();
		$('#maxLSScalePrem').html('&euro;' + prem2);
		$('#maxLSScalePrem').digits();
		
	
		
		$('#maxLSUpliftBT').html('&euro;' + today1.toFixed(0));
		$('#maxLSUpliftBT').digits();
		$('#maxLSScaleBT').html('&euro;' + today2.toFixed(0));
		$('#maxLSScaleBT').digits();
		
	
	$('#maxLSUpliftB').html('&euro;' + lumpsum1.toFixed(0) );
	$('#maxLSUpliftB').digits();
	
	var tax1=(Math.max((today1 + prevLumpSum-200000)*0.2,0))+(Math.max((today1+prevLumpSum-575000)*0.32,0));
	$('#taxLSUpliftB').html('&euro;'+tax1.toFixed(0)) ;
	$('#taxLSUpliftB').digits();
	var net1=today1-tax1;
	$('#netMaxLSUpliftB').html('&euro;' + net1.toFixed(0));
	$('#netMaxLSUpliftB').digits();
	
	$('#maxLSScaleB').html('&euro;' + lumpsum2.toFixed(0));
	$('#maxLSScaleB').digits();

	var tax2=(Math.max((today2 + prevLumpSum-200000)*0.2,0))+(Math.max((today2+prevLumpSum-575000)*0.32,
	0));
	$('#taxLSScaleB').html('&euro;'+tax2.toFixed(0));
	$('#taxLSScaleB').digits();
	var net2=today2-tax2;
	$('#netMaxLSScaleB').html('&euro;' + net2.toFixed(0));
	$('#netMaxLSScaleB').digits();

		

		
	});
}

function calcRevMaxProjections(age, income, nra,ap1,sp1,ap2,sp2,ap3,sp3)
{
	var value1=0;
	var value2=0;
	var value3=0;
	var today1=0;
	var today2=0;
	var today3=0

	$.get("/servlet/submitPensionQuote.do?type=3&freq=M&age="+age+"&income="+income+"&ret="+nra+"&ap1="+ap1+"&sp1="+sp1+"&ap2="+ap2+"&sp2="+sp2+"&ap3="+ap3+"&sp3="+sp3, function(data){

		str = jQuery.trim(data);
		if (str.length > 10) 
		{
			var variables = str.split('&');
			value1=Number(variables[0].split('=')[1]);
			today1=Number(variables[1].split('=')[1]);
			value2=Number(variables[2].split('=')[1]);
			today2=Number(variables[3].split('=')[1]);
			value3=Number(variables[4].split('=')[1]);
			today3=Number(variables[5].split('=')[1]);
		}

	$('#projectedValueC1').html('&euro;'+value1.toFixed(0));
	$('#projectedValueC1').digits();
	if (value1 > maxPensionFund)
	{
		$('#fundExceededC1').removeClass('hidden');
	}
	else
	{
		$('#fundExceededC1').addClass('hidden');
	}
	if (value2 > maxPensionFund)
	{
		$('#fundExceededC2').removeClass('hidden');
	}
	else
	{
		$('#fundExceededC2').addClass('hidden');
	}
	if (value3 > maxPensionFund)
	{
		$('#fundExceededC3').removeClass('hidden');
	}
	else
	{
		$('#fundExceededC3').addClass('hidden');
	}

	$('#projectedValueC2').html('&euro;'+value2.toFixed(0));
	$('#projectedValueC2').digits();	
	
	$('#projectedValueC3').html('&euro;'+value3.toFixed(0));
	$('#projectedValueC3').digits();	
	
	$('#projectedValueC1T').html('&euro;'+today1.toFixed(0));
	$('#projectedValueC1T').digits();

	$('#projectedValueC2T').html('&euro;'+today2.toFixed(0));
	$('#projectedValueC2T').digits();	
	
	$('#projectedValueC3T').html('&euro;'+today3.toFixed(0));
	$('#projectedValueC3T').digits();	
	
			
	});

}

function calcIncomeGap(age, income, nra, target, marital, serviceNRA, spouse)
{
	var incomeGapPrem=0;
	
	$.get("/servlet/submitPensionQuote.do?type=4&freq=Y&age="+age+"&income="+income+"&ret="+nra+"&target="+target+"&serviceNRA="+serviceNRA+"&marital="+marital+"&spousePension="+spouse, function(data){

		str = jQuery.trim(data);
		if (str.length > 10) 
		{
			var variables = str.split('&');
			incomeGapPrem=Number(variables[0].split('=')[1]);
			$('#fundIncomeGap').html('&euro;'+incomeGapPrem.toFixed(0));
			$('#fundIncomeGap').digits();
			var retirementFund = Number(variables[1].split('=')[1]);			
			$('#retirementFundA').html('&euro;'+Number(retirementFund).toFixed(0));
			$('#retirementFundA').digits();
			var retirementLS = Number(variables[2].split('=')[1]);			
			$('#fundIncomeGapLS').html('&euro;'+Number(retirementLS).toFixed(0));
			$('#fundIncomeGapLS').digits();
		}
		
	});
}

function projectCurrentPension(age, income, nra,serviceNRA, sp, marital, spouse, taxThreshold)
{

	$.get("/servlet/submitPensionQuote.do?type=2&freq=Y&age="+age+"&income="+income+"&ret="+nra+"&sp="+sp+"&serviceNRA="+serviceNRA+"&marital="+marital+"&spousePension="+spouse, function(data){

		str = jQuery.trim(data);
		if (str.length > 10) 
		{
			var incomeGap=0;
			var variables = str.split('&');
			var annualPension=Number(variables[1].split('=')[1]);
			$('#currentPensionA').html('&euro;'+annualPension.toFixed(0));
			$('#currentPensionA').digits();
			var pension = statePension[marital];
			incomeGap = taxThreshold - pension;
			incomeGap = Number(incomeGap) - Number(annualPension);
			$('#incomeGap').html('&euro;'+incomeGap.toFixed(0));
			$('#incomeGap').digits();			
			
			calcIncomeGap(age, income, nra, incomeGap.toFixed(0), marital, serviceNRA, spouse);
		}		
	});
}

var consoleCounter = 0;

function log(message){ 
	try {
		console.log(consoleCounter++ + "\t" + message);
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}
