$( '.card.card-dashboard-middle' ).each(function( index ) {
var savedQuotesLabel = $(this).html().trim();

if (savedQuotesLabel.indexOf('saved ') > -1)
{ 
$(this).html('Plan your future with Irish Life');
}
});

var cssId = 'cssSavedQuotes';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = '/sites/all/modules/persistent_login/cards/cards.css';
    link.media = 'all';
    head.appendChild(link);
}

//add savedQuotes id to the container if none saved
if(!$("#savedQuotes").length) {
$('.container .row .row-padding').attr('id','savedQuotes');
}

$('#savedQuotes').html('<div class="row"><div class="col s12 m4" id="pos-1"><div class="card card-plan" id="investor-card"><div class="row row-img" style="text-align:center"><img id="inv-test-img" src="/sites/all/modules/persistent_login/cards/investmentcalculator.png" style=""></div><div class="row row-title"><div class="title-col1">Investor Profile Test</div></div><div id="inv-test-default"><div class="row row-item"><p>Identify your investor profile by answering some simple multiple choice questions. Don\'t worry there\'s no right or wrong answers. It\'s quick and easy.</p></div><div class="row row-item"><a class="get-quote-btn" href="/investments/investor-type-test?c=1" target="_blank">Get Quote Now</a></div></div><div id="inv-test-fields"><div class="row row-item"><div class="col2">Quote Expires:</div><div class="col2"><span id="inv-date"></span></div></div><div class="row row-item"><div class="col2">Your Investor Type:</div><div class="col2"><span id="inv-report-type"></span></div></div><div class="row row-item"><div class="col2">Your report:</div><div class="col2"><a href="" id="inv-report" target="_blank">View PDF report</a></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><a class="edit-btn col1 btn btn-primary btn-block" href="/investments/investor-type-test?c=1" target="_blank">Re-take Test</a><a class="col2 btn btn-primary btn-block" href="/financial-advice/financial-planning/arrange-a-financial-advisor-callback" target="_blank">Talk to Us</a></div></div></div></div><div class="col s12 m4" id="pos-2"><div class="card card-plan" id="term-card"><div class="row row-img" style="text-align:center"><img id="term-img" src="/sites/all/modules/persistent_login/cards/termlifeinsurance.png" style=""></div><div class="row row-title"><div class="title-col1">Term Life Insurance</div></div><div id="term-default"><div class="row row-item"><p>Get a quote for life insurance to cover you for a specific term. The cost of life insurance depends on age, health, term and the amount of life insurance sought.</p></div><div class="row row-item"><a class="get-quote-btn" href="/life-insurance/term-life-insurance-quote" target="_blank">Get Quote Now</a></div></div><div id="term-fields"><div class="row row-item"><div class="col2">Quote Expires:</div><div class="col2"><span id="term-date">21/03/2017</span></div></div><div class="row row-item"><div class="col2">Term:</div><div class="col2"><span id="term-term"></span>&nbsp; years</div></div><div class="row row-item"><div class="col2">Cover value:</div><div class="col2">&euro;<span id="term-value"></span>&nbsp; <span id="term-people">(2 people)</span></div></div><div class="row row-item"><div class="col2">Premium:</div><div class="col2"><span id="term-prem"></span></div></div><div class="row row-item"><a class="edit-btn col1 btn btn-primary btn-block" href="" id="term-url" target="_blank">Edit</a><a class="col2 btn btn-primary btn-block" href="/financial-advice/financial-planning/arrange-a-financial-advisor-callback" target="_blank">Talk to Us</a></div></div></div></div><div class="col s12 m4" id="pos-3"><div class="card card-plan" id="family-protection-card"><div class="row row-img" style="text-align:center"><img id="family-img" src="/sites/all/modules/persistent_login/cards/lifelens.png" style=""></div><div class="row row-title"><div class="title-col1">Family Protection</div></div><div id="family-default"><div class="row row-item"><p>This helps you decide how much life insurance you may need and for how many years. It only takes 2 minutes.</p></div><div class="row row-item"><a class="get-quote-btn" href="/life-insurance/life-insurance-calculator/family-protection-planner" target="_blank">Get Quote Now</a></div></div><div id="family-fields"><div class="row row-item"><div class="col2">Quote Expires:</div><div class="col2"><span id="family-date"></span></div></div><div class="row row-item"><div class="col2 changeCol">Lumpsum Death:<span class="fp-2-people" style="font-weight:700;margin-left: 22px;">(2 people)</span></div><div class="col2 one-person"><span class="family-death"></span></div></div><div class="row row-item fp-2-people"><div class="col2"><i aria-hidden="true" class="fa fa-user-o"></i><span class="family-death"></span></div><div class="col2"><i aria-hidden="true" class="fa fa-user-o"></i><span class="family-death-2"></span></div></div><div class="row row-item"><div class="col2">Income on Illness:</div><div class="col2 one-person"><span class="family-illness"></span></div></div><div class="row row-item fp-2-people"><div class="col2"><i aria-hidden="true" class="fa fa-user-o"></i><span class="family-illness"></span></div><div class="col2"><i aria-hidden="true" class="fa fa-user-o"></i><span class="family-illness-2"></span></div></div><div class="row row-item"><div class="col2">Specified Illness:</div><div class="col2 one-person"><span class="family-specill"></span></div></div><div class="row row-item fp-2-people"><div class="col2"><i aria-hidden="true" class="fa fa-user-o"></i><span class="family-specill"></span></div><div class="col2"><i aria-hidden="true" class="fa fa-user-o"></i><span class="family-specill-2"></span></div></div><div class="row row-item"><div class="col2">Premium:</div><div class="col2">&euro;<span id="fam-prem"></span>/mo&nbsp; <span id="family-people">(2 people)</span></div></div><div class="row row-item"><a class="edit-btn col1 btn btn-primary btn-block" href="/life-insurance/life-insurance-calculator/family-protection-planner" id="" target="_blank">New Quote</a><a class="col2 btn btn-primary btn-block" href="/financial-advice/financial-planning/arrange-a-financial-advisor-callback" target="_blank">Talk to Us</a></div></div></div></div></div><br><div class="row"><div class="col s12 m4" id="pos-4"><div class="card card-plan" id="pension-card"><div class="row row-img" style="text-align:center"><img id="pension-img" src="/sites/all/modules/persistent_login/cards/pensioncalculator.png" style=""></div><div class="row row-title"><div class="title-col1">Pension</div></div><div id="pension-default"><div class="row row-item"><p>Estimate what your monthly pension savings should be in order to help secure the future you want. The earlier you start saving, the better.</p></div><div class="row row-item"><a class="get-quote-btn" href="/pensions/pension-calculator" target="_blank">Get Quote Now</a></div></div><div id="pension-fields"><div class="row row-item"><div class="col2">Quote Expires:</div><div class="col2"><span id="pension-date"></span></div></div><div class="row row-item"><div class="col2">Retirement Age:</div><div class="col2"><span id="pension-age"></span></div></div><div class="row row-item"><div class="col2">Target Pension:</div><div class="col2"><span id="pension-target"></span></div></div><div class="row row-item"><div class="col2">Expected Pension:</div><div class="col2"><span id="expected-pension"></span></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><a class="edit-btn col1 btn btn-primary btn-block" href="" id="pension-url" target="_blank">Edit</a><a class="col2 btn btn-primary btn-block" href="/financial-advice/financial-planning/arrange-a-financial-advisor-callback" target="_blank">Talk to Us</a></div></div></div></div><div class="col s12 m4" id="pos-5"><div class="card card-plan" id="mortgage-card"><div class="row row-img" style="text-align:center"><img id="mortgage-img" src="/sites/all/modules/persistent_login/cards/mortgageprotection.png" style=""></div><div class="row row-title"><div class="title-col1">Mortgage protection</div></div><div id="mortgage-default"><div class="row row-item"><p>Mortgage Protection is a form of life insurance that ensures your mortgage will be paid off in cases of death or illness.</p></div><div class="row row-item"><div class="get-quote-btn"><a href="/life-insurance/mortgage-protection-quote" target="_blank">Get Quote Now</a></div></div></div><div id="mortgage-fields"><div class="row row-item"><div class="col2">Quote Expires:</div><div class="col2"><span id="mortgage-date"></span></div></div><div class="row row-item"><div class="col2">Term:</div><div class="col2"><span id="mortgage-term"></span>&nbsp; years</div></div><div class="row row-item"><div class="col2">Cover Value:</div><div class="col2">&euro;<span id="mortgage-value"></span>&nbsp; <span id="mortgage-people">(2 people)</span></div></div><div class="row row-item"><div class="col2">Premium:</div><div class="col2"><span id="mortgage-prem"></span></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><a class="edit-btn col1 btn btn-primary btn-block" href="" id="mortgage-url" target="_blank">Edit</a><a class="col2 btn btn-primary btn-block" href="/financial-advice/financial-planning/arrange-a-financial-advisor-callback" target="_blank">Talk to Us</a></div></div></div></div><div class="col s12 m4" id="pos-6"><div class="card card-plan" id="whole-card"><div class="row row-img" style="text-align:center"><img id="whole-img" src="/sites/all/modules/persistent_login/cards/wholelifeinsurance.png" style=""></div><div class="row row-title"><div class="title-col1">Whole of Life Insurance</div></div><div id="whole-default"><div class="row row-item"><p>Get a quote for life insurance that covers your whole life. The cost of life insurance depends on age, health, and amount of life insurance sought.</p></div><div class="row row-item"><a class="get-quote-btn" href="/life-insurance/whole-of-life-insurance-quote" target="_blank">Get Quote Now</a></div></div><div id="whole-fields"><div class="row row-item"><div class="col2">Quote Expires:</div><div class="col2"><span id="whole-date"></span></div></div><div class="row row-item"><div class="col2">Cover value:</div><div class="col2">&euro;<span id="whole-value"></span>&nbsp; <span id="whole-people">(2 people)</span></div></div><div class="row row-item"><div class="col2">Premium:</div><div class="col2"><span id="whole-prem"></span></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><div class="col1"></div><div class="col2"></div></div><div class="row row-item"><a class="edit-btn col1 btn btn-primary btn-block" href="" id="whole-url" target="_blank">Edit</a><a class="col2 btn btn-primary btn-block" href="/financial-advice/financial-planning/arrange-a-financial-advisor-callback" target="_blank">Talk to Us</a></div></div></div></div></div>');

function orderCards() {
}

function daysBetween(date1, date2) {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms + date2_ms)

    // Convert back to days and return
    return Math.floor(difference_ms/ONE_DAY) 
};

function timeBetween(date1, date2) {

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms + date2_ms)

    return Math.floor(difference_ms) 
};

function getLatestDate(d) {                                        
   // convert to timestamp and sort
   var sorted_ms = d.map(function(item) {
      return new Date(item.MeasureDate).getTime()
   }).sort(); 
   // take latest
   var latest_ms = sorted_ms[sorted_ms.length-1];
   // convert to js date object 
   return new Date(latest_ms);
};

function convertDate(date) {

           var monthName = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
			
			      //convert into day/month/year
			      var day     = ('0' + date.getDate()).slice(-2);
				  var month = date.getMonth();
				  var year   = date.getFullYear();
					 
			      var convertedDate = day + "/" + monthName[month]  + "/" + year; 
				  
				  return convertedDate;
};

function retrieveCard() {
	
	console.log('retrieving quotes');
	
	//GET ALL QUOTES
       $.ajax({
        type:'GET',
		//get all quotes
        url:"/myonlineservices/ClientB2CQuotes/indexjson",
		//params: saveQuote,
        //data:"'typeOfQuote=30&quoteData=Type=PensionCalc-36000-4500-42-3-4-true-false-75-2'", //saveQuote;
		//beforeSend: be,
		//error: function() {
		      //console.log('Oops, you are not logged in');
			  //$('#login-message').show();
		//},
		
        success: function(response) {
 					
			var quoteData = response.SavedQuotes; // this is the JSON array that comes back

			var currentDate = new Date(); //todays date
			var currentDateFull = convertDate(currentDate); //convert it to d/m/y

			console.log("Quote Data coming back is=" + quoteData);
			
			//LOOP THROUGH THE QUOTEDATA
			var pensionQuoteId = "";
			var pensionTimeStamp = "";
			var pensionDays ="";
			var pensionString = "";
			var pensionURL ="";
			
			var termQuoteId = "";
			var termTimeStamp = "";
			var termDays ="";
			var termString = "";
			var termURL = "";
			
			var wholeQuoteId = "";
			var wholeTimeStamp = "";
			var wholeDays ="";
			var wholeString = "";
			var wholeURL="";
			
			var morQuoteId  ="";
			var morTimeStamp ="";
			var morDays="";
			var morString = "";
			var mortgageURL ="";
			
			var famProtectQuoteId = "";
			var famProtectTimeStamp ="";
			var famProtectDays="";
			var famProtectString = "";
			var familyURL ="";
			
			var invTestQuoteId ="";
			var invTestTimeStamp ="";
			var innTestDateSaved="";
			var invTestDays ="";
			var invTestString ="";
			
			
		    // THE LOOP
			for(var i=0;i<quoteData.length;i++) {
			
			console.log("The length of the array is " + quoteData.length);
			console.log("The current date is " + currentDate + " || " + currentDateFull);
			
			  //extract the quote type number and expiry date from the json array
			   var type = quoteData[i]['QuoteType'];
			   var expires = quoteData[i]['ExpiresOn'];
			   var quoteId = quoteData[i]['QuoteNumber'];
			   var quoteString = quoteData[i]['QuoteString'];
			   var quoteImg = quoteData[i]['QuoteIcon'];
			   var expiresMil = Number(expires.replace( /\D+/g, '')); //convert the expiry date string to a number in milliseconds

			  //get the date savedin a readable format
			   var dateSaved = new Date(expiresMil - 604800000); // 604800000 = the amount of milliseconds in 7 days, minus this from the expiry date to get saved date
               var dateSavedFull = convertDate(dateSaved);
				
			  //get the expiry date in a readable format
			   var expiresDate = new Date(expiresMil);
			   var expiresFull = convertDate(expiresDate);

				//check the most recent date by days and milliseconds
				var daysSinceSave = daysBetween(currentDate,dateSaved); //amount of days since it was saved
				var timeSinceSave  = timeBetween(currentDate,dateSaved); //amount of milliseconds since it was saved

				         /*  console.log('Quote ID = ' + quoteId);
						   console.log("The type of quote is " + type);
						   console.log('The Quote Expires: is ' + dateSaved + " || " + dateSavedFull);
						   console.log("The quote expires on " + expiresDate + " || " + expiresFull);
						   console.log("This quote was saved " + daysSinceSave + " days ago & " + timeSinceSave + " milliseconds ago"); */
				
                //check for most recent and assign ID's
			switch (type) {
				
				//pension calculator
				case 30 : 
				     
					 if(pensionQuoteId == "") {
					 
					    pensionQuoteId = quoteId;
						pensionTimeStamp =  expiresMil;
						pensionString = quoteString;	
						pensionURL = "/pensions/pension-calculator?quoteId="+pensionQuoteId;
						$('#pension-url').attr('href', pensionURL);
					 
					 }
					 else if (expiresMil > pensionTimeStamp) {
					    
						pensionQuoteId = quoteId;
					    pensionTimeStamp =  expiresMil;
						pensionString = quoteString;
						pensionURL = "/pensions/pension-calculator?quoteId="+pensionQuoteId;
						$('#pension-url').attr('href', pensionURL);
	

					 };
					 
						
					 break;
					 
				//whole of life quote	 
				case 12 : 
				     
					 if(wholeQuoteId == "") {
					 
					    wholeQuoteId = quoteId;
						wholeTimeStamp = expiresMil;	
						wholeString = quoteString;
						wholeURL = "/life-insurance/whole-of-life-insurance-quote?quoteId="+wholeQuoteId;
						$('#whole-url').attr('href', wholeURL);
					 
					 }
			         else if (expiresMil > wholeTimeStamp) {
					    
						wholeQuoteId = quoteId;
						wholeTimeStamp = expiresMil;
						wholeString = quoteString;
						wholeURL = "/life-insurance/whole-of-life-insurance-quote?quoteId="+wholeQuoteId;
						$('#whole-url').attr('href', wholeURL);

					 };
					 
						
					 break;
					
				//term life insurance quote	
			    case 10 : 
				     
					 if(termQuoteId == "") {
					 
					    termQuoteId = quoteId;
						termTimeStamp = expiresMil;	
						termString = quoteString;
						termURL = "/life-insurance/term-life-insurance-quote?quoteId="+termQuoteId;
						$('#term-url').attr('href', termURL);
						
					 
					 }
			         else if (expiresMil > termTimeStamp) {
					    termQuoteId = quoteId;
						termTimeStamp = expiresMil;
						termString = quoteString;
						termURL = "/life-insurance/term-life-insurance-quote?quoteId="+termQuoteId;
						$('#term-url').attr('href', termURL);
					 
					 };
						
					 break;
				    
				//mortgage protection quote	
				case 11 : 
				     
					 if(morQuoteId == "") {
					 
					    morQuoteId = quoteId;
						morTimeStamp = expiresMil;
                        morString = quoteString;		
    					mortgageURL = "/life-insurance/mortgage-protection-quote?quoteId="+morQuoteId;
						$('#mortgage-url').attr('href', mortgageURL);
						
					 
					 }
			         else if (expiresMil > morTimeStamp) {
					    morQuoteId = quoteId;
						morTimeStamp = expiresMil;
						morString = quoteString;
						mortgageURL = "/life-insurance/mortgage-protection-quote?quoteId="+morQuoteId;
						$('#mortgage-url').attr('href', mortgageURL);
						
					 
					 }; 
					 
					 break;
					 
				//family protection quote	 
				case 14 : 
				     
					 if(famProtectQuoteId == "") {
					 
					    famProtectQuoteId = quoteId;
						famProtectTimeStamp = expiresMil;
                        famProtectString = quoteString;		
                        familyURL = "/life-insurance/life-insurance-calculator/family-protection-planner?quoteId="+famProtectQuoteId;	
                        $('#family-url').attr('href', familyURL);		
                       					
					 
					 }
			         else if (expiresMil > famProtectTimeStamp) {
					    famProtectQuoteId = quoteId;
						famProtectTimeStamp = expiresMil;
                        famProtectString = quoteString;	
                        familyURL = "/life-insurance/life-insurance-calculator/family-protection-planner?quoteId="+famProtectQuoteId;	
                        $('#family-url').attr('href', familyURL);	
                       						
					 
					 };
					 
					 break;
					 
			    //investor type test 
				case 20 : 
				     
					 if(invTestQuoteId == "") {
					 
					    invTestQuoteId = quoteId;
						invTestTimeStamp = expiresMil;
						invTestDateSaved = dateSavedFull;
                        invTestString= quoteString;			
					 
					 }
			         else if (expiresMil > invTestTimeStamp) {
					     invTestQuoteId = quoteId;
						invTestTimeStamp = expiresMil;
						invTestDateSaved = dateSavedFull;
                        invTestString= quoteString;		

					 };

					 break;	  
				}; 
			};
			
			/* console.log("pension quote you have saved is " + pensionQuoteId + " || It's String is " + pensionString + " || It's Date is " +  pensionTimeStamp);
			console.log("whole of life quote you have saved is " + wholeQuoteId + "|| Whole String is " + wholeString);
			console.log("term of life quote you have saved is " + termQuoteId+ "|| Term String is " + termString);
			console.log("mortgage protection quote you have saved is " + morQuoteId + "|| Mortgage String is " + morString); */
			
            ////////////////////////////////////////////////// POPULATE DIVS ///////////////////////////////////////////////////////////////////////
			
			//PENSION CARD
			var pensionArray = new Array();
			
		    pensionArray = pensionString.split('-');
			
			if(pensionArray <= 1) {
			   $('#pension-default').show()
			}
			
			else {
			
			var pensionDateExpires = new Date(pensionTimeStamp);
			var pensionAge = pensionArray[3];
			var targetPension = pensionArray[9];
			var retirementAge = pensionArray[10];
			var expectedPension = pensionArray[11];
			
			$('#pension-date').html(convertDate(pensionDateExpires));
			//$('#expected-pension').html(expectedPension);
			$('#pension-age').html(retirementAge);
			//$('#pension-target').html(targetPension);
			$('#pension-fields').show();
			
			//REPLACE THE MONTH AND YEAR FORMAT
			var newTarget = targetPension.replace('per year','/yr');
			var removeSpaceTarget = newTarget.replace(/\s/g, '');
			$('#pension-target').html(removeSpaceTarget);
			
			var newExpected = expectedPension.replace('per year','/yr');
			var removeSpaceExpected = newExpected.replace(/\s/g, '');
			$('#expected-pension').html(removeSpaceExpected);
			
			
			}
			
			//MORTGAGE CARD
			var mortgageArray = new Array();
			
			mortgageArray = morString.split('-');
			
			if(mortgageArray <= 1) {
			   $('#mortgage-default').show()
			}
			
			else {
			
			var mortgageDateExpires = new Date(morTimeStamp);
			var morTerm =  mortgageArray[4];
			var morValue = mortgageArray[1];
			var morPrem = mortgageArray[2];
			var morPeople = mortgageArray[7];
			
			$('#mortgage-date').html(convertDate(mortgageDateExpires));
			$('#mortgage-term').html(morTerm);
			$('#mortgage-value').html(morValue);
			//$('#mortgage-prem').html(morPrem);
			$('#mortgage-fields').show();
			
			if(morPeople === "2") {
			$('#mortgage-people').show();
			} 
			
			//REPLACE THE MONTH AND YEAR FORMAT
			var newMorPrem = morPrem.replace('/month','/mo');
			$('#mortgage-prem').html(newMorPrem);
			
			}
			
			//WHOLE OF LIFE CARD
			var wholeArray = new Array();
			
			wholeArray = wholeString.split('-');
			
			if(wholeArray <= 1) {
			   $('#whole-default').show()
			}
			
			else {
			
			var wholeDateExpires = new Date(wholeTimeStamp);
			var wholeValue = wholeArray[1];
			var wholePrem = wholeArray[2];
			var wholePeople = wholeArray[7];
			
			if(wholePeople === "2") {
			$('#whole-people').show();
			}
			
			$('#whole-date').html(convertDate(wholeDateExpires));
			$('#whole-value').html(wholeValue);
			//$('#whole-prem').html(wholePrem);
			$('#whole-fields').show();
			
			//REPLACE THE MONTH AND YEAR FORMAT
			var newWholePrem = wholePrem.replace('/month','/mo');
			$('#whole-prem').html(newWholePrem);

			}
			
			//TERM LIFE CARD
			var termArray = new Array();
			
			termArray = termString.split('-');
			
			if(termArray <= 1) {
			   $('#term-default').show()
			}
			
			else {
			
			var termDateExpires = new Date(termTimeStamp);
			var termTerm = termArray[4];
			var termValue = termArray[1];
			var termPrem = termArray[2];
			var termPeople = termArray[7];
			
			$('#term-date').html(convertDate(termDateExpires));
			$('#term-value').html(termValue);
			$('#term-term').html(termTerm);
			//$('#term-prem').html(termPrem);
			$('#term-fields').show();
			
			if(termPeople === "2") {
			$('#term-people').show();
			}
			
			//REPLACE THE MONTH AND YEAR FORMAT
			var newTermPrem = termPrem.replace('/month','/mo');
			$('#term-prem').html(newTermPrem);
			
			
			}
			
			//FAMILY PROTECTION CARD
			var famProtectArray = new Array();
			
			famProtectArray = famProtectString.split('-');
			
			if(famProtectArray <= 1) {
			   $('#family-default').show()
			}
			
			else {
			
			var famDateExpires = new Date(famProtectTimeStamp);
			console.log(famDateExpires);
			var famDeath = famProtectArray[1];
			var famIlness = famProtectArray[2];
			var famSpec = famProtectArray[3];
			var famPrem = famProtectArray[5];
			var familyPeople = famProtectArray[6];
			var famDeath2 = famProtectArray[7];
			var famIllness2 = famProtectArray[8];
			var famSpec2 = famProtectArray[9];
			
			$('#family-date').html(convertDate(famDateExpires));
			$('.family-death').html(famDeath);
			$('.family-death-2').html(famDeath2);
			$('.family-illness').html(famIlness);
			$('.family-illness-2').html(famIllness2);
			$('.family-specill').html(famSpec);
			$('.family-specill-2').html(famSpec2);
			$('#fam-prem').html(famPrem);
			$('#family-fields').show();
			
			if(familyPeople === "2") {
			$('.fp-2-people').show();
			$('.one-person').hide();
			$('.changeCol').removeClass('col2');
			$('.changeCol').addClass('col4');
			$('#term-card, #family-protection-card, #investor-card').css({'height':'600px'});
	
			}
			else {
			$('.fp-2-people').hide();
			$('.one-person').show();
			}
			
			}
			
			//INVESTOR PROFILE CARD
			var invTestArray = new Array();
			
			invTestArray = invTestString.split(' - ');
			console.log('Inv Test array ' + invTestArray);
			
			if(invTestArray < 1) {
			   $('#inv-test-default').show()
			}
			
			else {
			
			var invDateExpires = new Date(invTestTimeStamp);
			var invTestSaved = invTestTimeStamp - 604800000;
			var invReportURL = invTestArray[1].replace(/\/u0026/g, "&");
			var invReportType = invTestArray[2];
			console.log(invTestSaved);
			
		   $('#inv-date').html(convertDate(new Date(invDateExpires)));
		   $('#inv-report').attr('href', invReportURL);
		   if (invReportType == '1')
			{
				$('#inv-report-type').html('Safety First Investor');
			}
			else if (invReportType == '2')
			{
				$('#inv-report-type').html('Careful Investor');
			}
			else if (invReportType == '3')
			{
				$('#inv-report-type').html('Conservative Investor');
			}
			else if (invReportType == '4')
			{
				$('#inv-report-type').html('Balanced Investor');
			}
			else if (invReportType == '5')
			{
				$('#inv-report-type').html('Experienced Investor');
			}
			else if (invReportType == '6')
			{
				$('#inv-report-type').html('Adventurous Investor');
			}
			else if (invReportType == '7')
			{
				$('#inv-report-type').html('Very Adventurous Investor');
			}
		   
		   $('#inv-test-fields').show();
			
			}
			
	}
		
    });
	
	//GET LATEST QUOTE
	/*
	  $.ajax({
	   type:'GET',
	   url: "/myonlineservices/ClientB2CQuotes/getlatestquotejson",
	   success: function(response) {
	     var latestQuoteData = response.SavedQuotes; //this is the quote that comes back
		 
		 console.log("The latest saved Quote is: " + JSON.stringify(latestQuoteData));
		 
		 //GET THE TYPE OF THE LATEST QUOTE SAVED AND THEN MOVE ITS CARD TO THE START 
		 var latestQuoteType = latestQuoteData[0]['QuoteText']
		 console.log(latestQuoteType);
		 
		 if(latestQuoteType == "Term Life Insurance") {
		    $('#pos-2').insertBefore('#pos-1');
		 }
		 
		 if(latestQuoteType == "Mortgage Protection") {
		    $('#pos-3').insertBefore('#pos-1');
		 }
		 
		 if(latestQuoteType == "Whole of Life Insurance") {
		    $('#pos-4').insertBefore('#pos-1');
			$('#pos-1').insertBefore('#pos-5');
		 }
		 
		 if(latestQuoteType == "Life Insurance") {
		    $('#pos-5').insertBefore('#pos-1');
			$('#pos-1').insertBefore('#pos-6');
		 }
		 
		 if(latestQuoteType == "Investor Profile") {
		    $('#pos-6').insertBefore('#pos-1');
			$('#pos-1').insertAfter('#pos-5');
		 }
		 
		 
	   }
	});
	*/
	
};

retrieveCard();