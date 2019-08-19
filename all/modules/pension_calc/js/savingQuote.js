(function ($) {


$( document ).ready(function() {
	
    var salary;
	var currentPension ;
	var age;
	var employeeContribution;
	var employerContribution ;
	var statePensionYes;
	var statePensionNo;
	var pensionTargetAmt;
	var percentageAmt;
	var annualAmt;
	var expectedPension;

     //build up the string
	var saveQuote; 	
	
    console.log('this is working');	
	
//if not logged in prompt to register	

//check if user is logged in 

	
	
//if logged in get the values from pension calculator and build up a string called saveQuote	
function savingQuote() {	

     salary = $('#salaryInput').val();
	 currentPension = $('#currentPensionInput').val();
	 age = $('#pensionCalcAgeSliderOutput').html();
	 employeeContribution = $('#pensionCalcEmployeeContributionsSliderOutput').html();
	 employerContribution = $('#pensionCalcEmployerContributionsSliderOutput').html();
	 statePensionYes = $('#statePensionYes').is(':checked');
	 statePensionNo = $('#statePensionNes').is(':checked');
	 pensionTargetAmt = $('#pensionCalcTargetSliderOutput').html();
	 percentageAmt = $('#pensionCalcTargetSliderOutputSubA').html();
	 annualAmt = $('#pensionCalcTargetSliderOutputSubB').html();
	 expectedPension = $('#pensionCalcExpectedTotalOutputFinal').html();
	 
	 saveQuote = 'typeOfQuote=30&quoteData=Type=PensionCalc' + '-' + salary + '-' + currentPension + '-' + age + '-' + employeeContribution + '-' +  employerContribution + '-' + statePensionYes + '-' + statePensionNo + '-' + pensionTargetAmt +  '-' + percentageAmt + '-' + annualAmt + '-' + expectedPension; 	

	// url = "/SomeServiceAddress/ClientB2CQuotes/StoreQuote?"+saveQuote;
	url = "/sites/all/modules/pension_calc/js/reference.js?"+saveQuote;
	
    $.ajax({
	type: "POST",
	url: url,
	async: true,
	beforeSend: function(){"spinner"},
	// data: saveQuote,
	success: function(){
	
		//show saved message
		// what has joes url sent back?

			alert("We have recieved the string");
			console.log("data =" + url);
	
		// also show ID reference
		// if not true then say boo hoo
		// 
	},
	error: function(){alert("error message");},
	timeout: 300000
	});
    
	console.log("Quote Data being sent is=" + saveQuote);
};


//if logged in and visitng pension calc page - get the values from the string and put back into the calculator
function retrieveQuote() {
	
	//IF LOGGED IN
	//on page load get VARs 
	
	/*Then if you call 
	http://SomeServiceAddress/ClientB2CQuotes/GetLatestQuote

	I will send you back something like:
	<div id='emailAddress'>joe.lakes@irishlife.ie</div>
	<div id='typeOfQuote'>30</div>
	<div id='quoteData'>Type=PensionCalc-67676-7567567-36-€ 226-€ 395truefalse-€ 3,722 per month, in today&#39;s terms-66% of your salary-Annually: € 44,666- €385,584 per year</div> */

	
	var quoteData = saveQuote;
	console.log("Quote Data coming back is=" + quoteData);
	
	var salaryGet, curPensionGet, ageGet, employeeContGet, employerContGet, statePensionYesGet, statePensionNoGet, pensionTargetAmtGet, percentageAmtGet, annualAmtGet, expectedPensionGet;
	
	
	//retrieve quote
	
	//split returned string
	var partsArray = new Array();
	partsArray = quoteData.split('-');
	
	salaryGet = partsArray[1];
	console.log("1="+salaryGet);

	curPensionGet = partsArray[2];
	console.log("2="+curPensionGet);
	
	ageGet = partsArray[3];
	console.log("3="+ageGet);
	
	employeeContGet = partsArray[4];
	console.log("4="+employeeContGet);
	
	employerContGet = partsArray[5];
	console.log("5="+employerContGet);
	
	statePensionYesGet = partsArray[6];
	console.log("6="+statePensionYesGet);
	
	statePensionNoGet = partsArray[7];
	console.log("7="+statePensionNoGet);
	
	pensionTargetAmtGet = partsArray[8];
	console.log("8="+pensionTargetAmtGet);
	
	percentageAmtGet = partsArray[9];
	console.log("9="+percentageAmtGet);
	
	annualAmtGet = partsArray[10];
	console.log("10="+annualAmtGet);
	
	expectedPensionGet = partsArray[11];
	console.log("11="+expectedPensionGet);
	
	console.log("The Array is=" + partsArray);
	
	
	
	//else normal

}


$("#saveBtn").click(function() {
       savingQuote();
	   retrieveQuote();
	   console.log('button pressed');
    });
	
});	

})(jQuery);
