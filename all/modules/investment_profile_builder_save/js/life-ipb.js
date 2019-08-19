
(function ($) {
	
var questionTotal;
  
$('#ilfs-bg-holder').fadeIn(function(){
  
    $('#ilfs-bg-holder').animate({ 'background-position-y': "-12px" }, {duration: 1050}).animate({ 'background-position-y': "0px" }, {duration: 50});
    
    $('.ilfs-bg-words').delay(700).fadeIn();
    //$('.ilfs-speech-bubble-1').delay(400).fadeIn();
    //$('.ilfs-speech-bubble-2').delay(500).fadeIn();
    //$('.ilfs-speech-bubble-3').delay(550).fadeIn();
    //$('.ilfs-speech-bubble-4').delay(600).fadeIn();
		// hide the get started button
		$('.ilfs-start-btn').click();
});

// Click & hide the start button
$('.ilfs-start-btn').click(function(){
  
  // hide the words
  $('.ilfs-bg-words').css({"background": "none"});
  $('.ilfs-investment-profile-holder').addClass('ilfs-white-bg');
  //$('.ilfs-speech-bubble-1').fadeOut();
  //$('.ilfs-speech-bubble-2').fadeOut();
  //$('.ilfs-speech-bubble-3').fadeOut();
  //$('.ilfs-speech-bubble-4').fadeOut();
  $(this).hide();
  
  // display the disclaimer text
  
  var h =  $('#ilfs-bg-holder').height();
    $('.ilfs-investment-profile-holder').css('min-height', h+'px');
  
  $('.ilfs-disclaimer-holder').fadeIn('slow');



});

$('.ilfs-disclaimer-btn').click(function(){
					 $.ajax({
					type:'GET',
					url:"https://apps.irishlife.ie/myonlineservices/RiskQuestionnaireApi/RiskQuestions", // CHANGE TO IRISHLIFE.IE WHEN GOING LIVE
					success:function(data) {
					//console.log('Data \n' + data)
					startQuestions(data);
					//$('#questionAnswerHolder').html(questionAnswers);
					},
					error: function(data){
						//console.log('cant connect to service, please try again later')
					}
				}); 
  //setupQuestions(questionJson);
  setupResultURL(resultURLJson);
  // hide the disclaimer
  $('.ilfs-disclaimer-holder').fadeOut(500, function(){
    
  //startQuestions();
  // show the questions
  $('.ilfs-questions-holder').fadeIn('slow');
  });
  
});
/*
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
		*/
// to add a zero to make number 2 digits
function addZero(num)
{
	(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
	return num;		
}

  //var  questionsArr = new Array();
  var  answerURLArr = new Array();
  var currentQuestion = 0;
  var userAnswersArr = [];
  var middlePassed = false;
  
	var baseURL = 'https://www.irishlife.ie/';

  

  	function setupResultURL(urlsPassed){
		var resultURLJson = jQuery.parseJSON( urlsPassed );
		// array of questions
				$.each( resultURLJson[0].urls, function( index, value ) {
				//
				
				var resultURLList = new Object();
				resultURLList.id = value.id;
				resultURLList.url = value.url;
				
				answerURLArr[index] = resultURLList;
				
				});
        
	}
  
  
  



	function nextClick(questionsArr){
  
		var starti = 0;
			
		//
		var currentAnswer = $('input:radio[name="answers"]:checked').val();
		userAnswersArr[currentQuestion] = currentAnswer;

		if(typeof userAnswersArr[currentQuestion] === "undefined")
		{
			$('.ilfs-answers-error').slideDown('fast');
		}
		else{
			$('.ilfs-answers-error').hide();
		
		//myIPB._setGAEvent('Investor Profile Builder', 'Question Answered', currentQuestion+1, "1");
      if(currentQuestion < (questionTotal-1)){
				currentQuestion++;
				$('.backBtn').show();
			}
			else // last page
			{
			$('.backBtn').hide();
			$('.ilfs-middle-text').slideUp(200);
			$('.ilfs-middle-holder').delay(300).fadeOut(25);
          
          
				$('.ilfs-middle-holder').html('');
				$('#irishlife-atrc-disclaimer').html('<br/><br/><br/><center><h3>Calculating the results. You will be redirected shortly. </h3></center>').fadeIn(200);
        
//        window.location = baseURL+"/investments/new-to-investing/2-careful-investor?source=ipb"

					
				//$('#irishlife-atrc-questions').html(divEndHTML);
        
        /********************************************************************************
        * 
        * 
        * This is the redirect on the last page.
        * Update the local storage and then redirect
        * to the page that we get for the result 
        * i.e. balanced, adventurous etc
        *
        *
        ********************************************************************************/
        
        /////////////////////////////////////////////////////////////////////////////////
        // Store off all the details in local storage
        var currentStorage;
        if(localStorage && localStorage.getItem('userInvestmentResults')){
          currentStorage = JSON.parse( localStorage.getItem( 'userInvestmentResults' ) )
			/*
			if(getCookie('userInvestmentResults')){		        if(localStorage && localStorage.getItem('userInvestmentResults')){
				  currentStorage = JSON.parse( getCookie( 'userInvestmentResults' ) )
			*/
              
        }
        var userInvestmentResults = {};
        if(localStorage){
          for(i=0; i<userAnswersArr.length; i++){
            userInvestmentResults['q'+(i+1)] = userAnswersArr[i];
              // pdfURL = pdfURL + "q" + (i+1) + "=" + userAnswersArr[i] + "&";
          }
          var d = new Date();
          var dt = addZero(d.getDate()) +"-"+addZero(d.getMonth()+1)+"-"+d.getFullYear()+" "+addZero(d.getHours())+":"+addZero(d.getMinutes())+":"+addZero(d.getSeconds());
          
          if (localStorage.getItem( 'userInvestmentResults' )){
			  //if (getCookie( 'userInvestmentResults' )){
          // not the first time doing this
            
            
            userInvestmentResults.firstCompleted = currentStorage.firstCompleted;
            userInvestmentResults.latestCompleted = dt;
            
            var c = parseInt(currentStorage.counter);
            if (c>=0){
              userInvestmentResults.counter = c+1;
            }
            else{
              userInvestmentResults.counter = 1;
            }
            
          }
          else{
            // first time doing this
            
            
            userInvestmentResults.firstCompleted = dt;
            userInvestmentResults.latestCompleted = dt;
            userInvestmentResults.counter = 1;
          }
          getResult(userInvestmentResults,questionsArr);
        }		
			}
      
				//
				$('.ilfs-meter-value').css({ "width": ""+((currentQuestion-starti)/((questionTotal-starti-1)))*100+"%" });
				

			//
			var questionHead = questionsArr[currentQuestion].Description;
      // set the question
			$('.ilfs-question-holder').html('Q.'+questionsArr[currentQuestion].QuestionId+' '+questionsArr[currentQuestion].Description);
			//$('.ilfs-question-holder').html("Q. "+questionHead);
			
			for (i=1; i<=(currentQuestion-starti);i++){
				$('.ilfs-circle-'+i).addClass('selected');
			}
			$('.ilfs-circle').removeClass('hover');
			$('.ilfs-circle-'+(currentQuestion+1-starti)).addClass('hover');
			
			populateAnswers(questionsArr);
			
			if(typeof userAnswersArr[currentQuestion] !== "undefined")
			{
				$( "#radio"+userAnswersArr[currentQuestion] ).prop( "checked", true );
			}
		}
		$('input[type=radio][name=answers]').click(function() {
			nextClick(questionsArr);
		});
	}
	
	
   //vvvvvvvvvvvvvvvvvPrevious Question Buttonvvvvvvvvvvvvvvvvvv
  function backClick(questionsArr){
		$('.backBtn').hide();
		var starti = 0;
		currentQuestion--;

		$('.ilfs-question-holder').html('Q.'+questionsArr[currentQuestion].QuestionId+' '+questionsArr[currentQuestion].Description);
		if(currentQuestion-starti > 0){
		
			$('.backBtn').show();
			//console.log("back button appear");
		}
		
		else
		{
	
			$('.backBtn').hide();
		}

		$('.ilfs-meter-value').css({ "width": ""+((currentQuestion-starti)/((questionTotal-starti-1)))*100+"%" });
				
		var questionHead = questionsArr[currentQuestion].Description;
		$('#questionHeadHolder').html("Q. "+questionHead);
		$('.circle').removeClass('selected');
		for (i=1; i<=currentQuestion-starti;i++){
				
			$('.circle-'+i).addClass('selected');
		}
		$('.circle').removeClass('hover');
		$('.circle-'+(currentQuestion+1-starti)).addClass('hover');
		
		populateAnswers(questionsArr);
		
		if(typeof userAnswersArr[currentQuestion] !== "undefined")
		{
			$( "#radio"+userAnswersArr[currentQuestion] ).prop( "checked", true );
		}
		$('input[type=radio][name=answers]').change(function() {
			nextClick(questionsArr);
		});
		
		$('#questionAnswerHolder input[type="radio"]').attr('checked',false);
			
	}
	
	function populateAnswers(questionsArr){
	//
	
		var questionAnswers = '<span class="ilfs-answers-holder">';
			
		
		for(i=1;i<=questionsArr[currentQuestion].Answers.length;i++) {
			var answerText = questionsArr[currentQuestion].Answers[i-1].Description;
			
			questionAnswers = questionAnswers + '<input type="radio" id="radio'+i+'"name="answers" value="'+i+'"/>\
			<label for="radio'+i+'" class="radioOption start "><span id="q-label-'+i+'">'+answerText+'</span><span class="checked"></span></label>';
		}
		
		questionAnswers = questionAnswers + '</span>';
		$('.ilfs-answers-holder').html(questionAnswers);
	
	}
  
 
 
  //############################
  // @startQuestions
  // Load the questions and set up 
  // circles for movement
  //
  //##############################
  
	function startQuestions(questionsArr){
	// if we've passed the first half of the questions 
	// then start in the middle
	//
    /*if(middlePassed){
      currentQuestion++;
      questionTotal = questionsArr.length - Math.round(questionsArr.length/2);
    }*/
	
	questionTotal = Math.round(questionsArr.length);

    $('.ilfs-question-holder').html("Q."+questionsArr[currentQuestion].QuestionId+" "+questionsArr[currentQuestion].Description);
		//console.log(questionsArr[currentQuestion].question);
		populateAnswers(questionsArr);
		if(typeof userAnswersArr[currentQuestion] !== "undefined")
		{
			$( "#radio"+userAnswersArr[currentQuestion] ).prop( "checked", true );
		}

		
		
		$('#irishlife-atrc-questions').delay(500).slideDown('slow');

	  $('.backBtn').click(function(){
			backClick(questionsArr);
			//console.log("back button clicked");
		});
		
    // the next button on the questions
    // store answer and move to next page
		$('.ilfs-next-btn').click(function(){
			nextClick(questionsArr);
			
		});
		$('input[type=radio][name=answers]').change(function() {
			nextClick(questionsArr);
		});
	  
  }

		
		/*
		$('.ilfs-circle').click(function(){
			nextClick();
		});
		*/

  
  //############################
  // @nextClick
  // When the user clicks the 
  // 'next' button on the answers
  // section they are moved on
  //
  //##############################
  
	
  
 
	

  
  function showResult(){
    
        //var riskRating is now accessible 
        
        // This is the result of the call which hsa been added to the DOM
        // Use this var to get the URL to forward to.
        // All the URLs have been passed in and loaded into an array called answerURLArr
        //var riskRating = '4';
              
        loc = answerURLArr[riskRating-1].url;
        
        $( ".ilfs-middle-spinner" ).html( '<div class=\'ilfs-answers-finished\' >Finished Loading Results.<br/> You have a risk rating of '+riskRating+'.</div><center><p class="irishlife-atrc-disclaimer-redirect-link" style="display:none;">If you are not redirected in a few seconds then <a href="'+loc+"?source=ipb"+'">click here</a>.</p></center>' );
        
          
          $('.irishlife-atrc-disclaimer-redirect-link').delay(500).fadeIn('slow');
          
         // redirect the user here
         // redirect the user here
         // redirect the user here
         // redirect the user here
         window.location = ""+loc+"?source=ipb";
         
  }
  
  
	function loadResultScript(url, callback) {
    
  //https://www.irishlife.ie/servlet/calcRiskProfile.do?resultOnly=Y&?alternative1=A4&alternative2=A4&alternative3=A6&alternative4=A5&alternative5=A4&alternative6=A3&alternative7=A4&alternative8=A4&alternative9=A4&alternative10=A5&alternative11=A4&
  
	var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    
               callback();
               //callback(params);
                }
            };
        } else { //Others
            script.onload = function () {
              
               // callback(params);
               callback();
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
 
 
  
    
    
	function getResult(localStorageData, questionsArr){
  
  
  $( ".ilfs-questions-holder" ).hide();
  $( ".ilfs-middle-spinner" ).show();
  
  var stor = localStorageData;
		
		var s = questionsArr[currentQuestion].Answers;
    var url = "";
    
    // create the result
    for(i=0; i<userAnswersArr.length; i++){
        url += "alternative"+(i+1)+"=A"+userAnswersArr[i]+"&";
    }
    
     // make a call to the google analytics tag manager to 
     // register that the user has completed the questionnaire 
     //myIPB._setGAPageViewIPBCompleted();    
     
    //load the result
    //ilfsResult.loadScript('/servlet/calcRiskProfile.do?resultOnly=Y&?'+ url, ilfsResult.scriptLoaded);
	var answers = [];
	for (var i = 0; i < userAnswersArr.length; i++) {
        answers[i] = [
            "attitudeToInvestingAnswer" + (i + 1), "A" + userAnswersArr[i]
        ];
    }
		
	var data = { answers };
  
    $.ajax({
        url: "https://apps.irishlife.ie/myonlineservices/RiskQuestionnaireApi/CalculateRiskNumber", // CHANGE TO IRISHLIFE.IE WHEN GOING LIVE
        type: "POST",
        data: data,
        success: function(response){
            //ToDo: Use response to build the page

            //Current: Open hardcoded pages
            riskRating = response.RiskNumber;
            showResult();

				
        },
        error: function(response) {
            console.log(response);
        }
    });

	}

})(jQuery);