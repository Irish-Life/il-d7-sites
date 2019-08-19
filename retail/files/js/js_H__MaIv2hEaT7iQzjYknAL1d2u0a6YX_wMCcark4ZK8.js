Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [980];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };
  
  Drupal.behaviors.tbMegaMenuAction = {
    attach: function(context) {
      $('.tb-megamenu-button', context).once('menuIstance', function () {
        var This = this;
        $(This).click(function() {
          if(parseInt($(this).parent().children('.nav-collapse').height())) {
            $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
            Drupal.TBMegaMenu.displayedMenuMobile = false;
          }
          else {
            $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
            Drupal.TBMegaMenu.displayedMenuMobile = true;
          }
        });
      });
      
      
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(!isTouch){
        $(document).ready(function($){
          var mm_duration = 0;
          $('.tb-megamenu').each (function(){
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.mega').hover(function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.addClass ('open')}, 100));  
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.addClass ('open')}, 100));
            }
          },
          function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', 
              setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.removeClass ('open')}, 100));
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.removeClass ('open')}, 100));
            }
          });
        });
      }
      
      $(window).resize(function() {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if(windowWidth != Drupal.TBMegaMenu.oldWindowWidth){
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    },
  }
})(jQuery);

;
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
      items.children('a').each( function() {
	var $item = $(this);
        var tbitem = $(this).parent();
        $item.click( function(event){
          if ($item.hasClass('tb-megamenu-clicked')) {
            var $uri = $item.attr('href');
            window.location.href = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
            }
          }
        }).closest('li').mouseleave( function(){
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
        });
     });
     /*
     items.children('a').children('span.caret').each( function() {
	var $item = $(this).parent();
        $item.click(function(event){
          tbitem = $item.parent();
          if ($item.hasClass('tb-megamenu-clicked')) {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            if(tbitem.hasClass('open')){	
              tbitem.removeClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
          else {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
        });
     });
     */
  }
  
  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }  
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);
;
(function($){

	$(document).ready(function () {
		timestampPdfs();
		
		var stickyNavTop = $('#zone-menu').offset().top;
		var mobileNavTop = 0;
		
		try
		{
			mobileNavTop = $('.mean-bar').offset().top;
		}
		catch (err)
		{
		
		}
		
		var stickyNav = function(divID){
		var scrollTop = $(window).scrollTop();
		
		var navTop = (divID=='#zone-menu'?stickyNavTop:mobileNavTop);
		
		if (scrollTop > navTop) { 
			$(divID).addClass('sticky');
		} else {
			$(divID).removeClass('sticky'); 
		}
		};
		 
		 stickyNav('#zone-menu');
	  stickyNav('.mean-bar');
		 
		 
		$(window).scroll(function() {
		  stickyNav('#zone-menu');
		  stickyNav('.mean-bar');
		  
		});
	});

	function timestampPdfs()
	{
 	var ts=new Date().getTime();
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);
		$(this).removeAttr('onclick');
		$(this).attr('onclick',"dataLayer.push({'event':'trackEvent','category':'website','action':'Download PDF','label': '"+link+"','value':'1'});return true");
		$(this).attr('target','_blank');
		});
	}

})(jQuery);
;
//$('.test').html('asd');
(function ($) {
  
		var userAnswersArr = [];
		var startDirection;
		var questionTotal;
		var timmerExtra = '00';
		var baseURL = '';
		var stor;
		$( document ).ready(function() {
			
     // OLD WAY OF GETTING QUESTIONS FROM DRUPAL SETTINGS IN MODULE FILE
      //baseURL = Drupal.settings.investment_profile_builder_save.baseurl;
      //questionData = JSON.parse(Drupal.settings.investment_profile_builder_save.question_data);
      //questionData = JSON.parse(questionData);
      
        
       
			$('.bulb-brain').show();
			$('.bulb-brain').delay(100).animate({ 'background-position-y': "-8px" }, {duration: 1750}).animate({ 'background-position-y': "0px" }, {duration: 50});
			$('.speech-bubble-1').delay(20+timmerExtra).fadeIn(500);
			$('.speech-bubble-2').delay(25+timmerExtra).fadeIn(500);
			$('.speech-bubble-3').delay(24+timmerExtra).fadeIn(500);
			$('.speech-bubble-4').delay(21+timmerExtra).fadeIn(1000);      
			$('.brain-words').delay(10+timmerExtra).fadeIn(1+timmerExtra);
			$('.brain-btn-start').delay(22+timmerExtra).fadeIn(100);      
			
			
			$('.getStartedOK').click(function(){
				myIPB._setGAPageViewIPBStart();
			$('#irishlife-atrc-disclaimer').fadeOut('slow');
			$('html, body').animate({ scrollTop: 0 }, 'fast');
					  //AJAX call to get the questions
					  
				 $.ajax({
					type:'GET',
					url:"https://apps.irishlife.ie/myonlineservices/RiskQuestionnaireApi/RiskQuestions",
					success:function(data) {
						//console.log(data);
						//console.log(data[6].QuestionId);
					//console.log('Data \n' + data);
					startQuestions(data);
					//$('#questionAnswerHolder').html(questionAnswers);
					},
					error: function(data){
						//console.log('cant connect to service, please try again later')
					}
				}); 
			});
      
			$('.getStarted').click(function(){
				
				hideBrainExtras();
				slideBrain('left');
				showIntroText();
			});
      
        //setupQuestions(questionData);
		
        /*
    // Get started by calling the json questions 
    $.ajax({
      url: baseURL+"/sites/all/modules/investment_profile_builder_save/js/atr-questions.json",
      data: {
        format: 'json'
      },
      error: function() {
        //$('#irishlife-atrc').html("<p style='color:red'>Error</p>");
      },
      success: function(data) {
        setupQuestions(data);
      },
      dataType: 'json',
      type: 'GET'
    });
	*/
	});

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
		
	function hideBrainExtras(){
		$('.investor-title,.brain-words,.speech-bubble-1,.speech-bubble-2,.speech-bubble-3,.speech-bubble-4,.brain-btn-start ').fadeOut();
    
		//$('.bulb-brain').animate({ 'background-position-y': "-10px" }, {duration: 300}).delay(100).animate({ 'background-position-y': "450px" }, {duration: 1000});
		$('.bulb-brain').removeClass('bulb-brain-img-full').addClass('bulb-brain-img-light');

	}
  function showIntroText(){
    $('#irishlife-atrc-disclaimer').fadeIn('slow');
  }
	function slideBrain(d){

    $('#irishlife-atrc-holder').css('background', 'transparent');

	}
	
	
	
	
	function addZero(num)
    {
	(String(num).length < 2) ? num = String("0" + num) :  num = String(num);
	return num;		
    }
	
	
		
  //####################################################################
  //# S E T T I N G   U P   G O O G L E   A N A L Y T I C S   C A L L S 
  //####################################################################
  // create a new IPB object - Investor Profile Builder object
  var myIPB = new Object(); 


  // set a virtual pageview 
  myIPB._setGAPageViewIPBStart = function() {
    myIPB._setGAPageView(window.location.pathname+'/questionnaire-start/','Investor Profile Builder Start')	
	myIPB._setSCamPageView(window.location.pathname+'/questionnaire-start/')
  }
  // set a virtual pageview 
  myIPB._setGAPageViewIPBMidway = function() {
    myIPB._setGAPageView(window.location.pathname+'/questionnaire-midpoint/','Investor Profile Builder Midpoint Reached')	
	myIPB._setSCamPageView(window.location.pathname+'/questionnaire-midpoint/')
  }
  // set a virtual pageview 
  myIPB._setGAPageViewIPBCompleted = function() {
  
    myIPB._setGAPageView(window.location.pathname+'/questionnaire-completed/','Investor Profile Builder Completed')
	myIPB._setSCamPageView(window.location.pathname+'/questionnaire-completed/')
	
    
  }
  // set a virtual pageview 
  myIPB._setGAEvent = function(category, action, label, value) {
  
    try{
    //tag manager
    dataLayer.push({
                  'event':'trackEvent',
                  'category':""+category,
                  'action':""+action,
                  'label':""+label,
                  'value':""+value
              });	
      }
      catch(err){
        //Do nothing
      }
            
  }
  
		// This is for calling pageviews dynamically on the page
  myIPB._setGAPageView = function(p,t){
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
  
  myIPB._setSCamPageView = function(p){
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



  
	function nextClick(questionsArr){
  
  
  var starti = 0;
	//
	var currentAnswer = $('input:radio[name="answers"]:checked').val();
	userAnswersArr[currentQuestion] = currentAnswer;
	
	if(typeof userAnswersArr[currentQuestion] === "undefined")
	{
		$('#questionAnswerHolder').addClass("error");
	}
	else{
		$('#questionAnswerHolder').removeClass("error");
		
    myIPB._setGAEvent('Investor Profile Builder', 'Question Answered', currentQuestion+1, "1");
	//myIPB._setSCamPageView('');
    
		if(currentQuestion < (questionTotal-1)){
				currentQuestion++;
				$('.backBtn').show();
			}
			else // last page
			{
      
				$('#irishlife-atrc-questions').html('');
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
		
        if(getCookie('userInvestmentResults') !=''){
          currentStorage = JSON.parse( getCookie( 'userInvestmentResults' ) )                        
        }
        var userInvestmentResults = {};
       
            for(i=0; i<userAnswersArr.length; i++){
              userInvestmentResults['q'+(i+1)] = userAnswersArr[i];
              // pdfURL = pdfURL + "q" + (i+1) + "=" + userAnswersArr[i] + "&";
          }
          var d = new Date();
          var dt = addZero(d.getDate()) +"-"+addZero(d.getMonth()+1)+"-"+d.getFullYear()+" "+addZero(d.getHours())+":"+addZero(d.getMinutes())+":"+addZero(d.getSeconds());
          
          if (getCookie( 'userInvestmentResults' )){
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
				$('.meter-value').css({ "width": ""+((currentQuestion-starti)/((questionTotal-starti-1)))*100+"%" });
				
			var questionHead = questionsArr[currentQuestion].Description;
			var questionNumber = questionsArr[currentQuestion].QuestionId;
			//console.log("Number: " + questionNumber);
			$('#questionHeadHolder').html(questionNumber+". "+questionHead);
			for (i=1; i<=(currentQuestion-starti);i++){
				$('.circle-'+i).addClass('selected');
			}
			$('.circle').removeClass('hover');
			$('.circle-'+(currentQuestion+1-starti)).addClass('hover');
			
			populateAnswers(questionsArr);
			
			if(typeof userAnswersArr[currentQuestion] !== "undefined")
			{
				$( "#radio"+userAnswersArr[currentQuestion] ).prop( "checked", true );
			}
		}
		
		$('input[type=radio][name=answers]').click(function() {
			nextClick(questionsArr);
		});
		$('.backBtn').show();
	}
  
	function backClick(questionsArr){
		var starti = 0;
		currentQuestion--;
    
		if(currentQuestion-starti > 0){		
		$('.backBtn').show();
		}
		else
		{
			$('.backBtn').hide();
		}
		
		$('.meter-value').css({ "width": ""+((currentQuestion-starti)/((questionTotal-starti-1)))*100+"%" });
				
		var questionHead = questionsArr[currentQuestion].Description;
		$('#questionHeadHolder').html((currentQuestion+1) + ". "+questionHead);
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
	
		var questionAnswers = '<span id="questionAnswerHolder">';
			
		
		for(i=1;i<=questionsArr[currentQuestion].Answers.length;i++) {
			var answerText = questionsArr[currentQuestion].Answers[i-1].Description;
			//console.log("answer text: " + answerText);
			questionAnswers = questionAnswers + '<input type="radio" id="radio'+i+'"name="answers" value="'+i+'"/>\
			<label for="radio'+i+'" class="radioOption start "><span id="q-label-'+i+'">'+answerText+'</span><span class="checked"></span></label>';
		}
		
		questionAnswers = questionAnswers + '</span>';
		$('#questionAnswerHolder').html(questionAnswers);
	
	}
	
	// Start the question process here
	//
	function startQuestions(questionsArr){
	// if we've passed the first half of the questions 
	// then start in the middle
	//
	questionTotal = Math.round(questionsArr.length);
				
				
				//###############################
		var progressindicator = '<div class="meter-wrap" >\
			\
			<div class="meter-value" style="width: 0%;">\
				<div class="meter-text">\
				</div>\
			</div>\
		</div>';
		var questionHead = "<span id='questionHeadHolder'>"+(currentQuestion+1) + ". " + questionsArr[currentQuestion].Description + "</span>";
		//console.log("question:" + questionHead);
		//console.log("question +:" + questionsArr);
		
		var questionAnswers = '<span id="questionAnswerHolder"></span>';
		//console.log("answer:" + questionAnswers);
		
		var nextButton = '<a href="javascript:void(0)" class="nextBtn moveBtn" >Next</a>';
		var backButton = '<a href="javascript:void(0)" class="backBtn moveBtn" style="display:none">Previous Question</a><br>';
		
		var fullHTML = progressindicator + questionHead + questionAnswers + backButton ;
		$('#irishlife-atrc-questions').hide();
		$('#irishlife-atrc-questions').html(""+fullHTML);
		populateAnswers(questionsArr);
		if(typeof userAnswersArr[currentQuestion] !== "undefined")
		{
			$( "#radio"+userAnswersArr[currentQuestion] ).prop( "checked", true );
		}

		
		
		$('#irishlife-atrc-questions').delay(500).slideDown('slow');

		
		$('.nextBtn').click(function(){
			nextClick(questionsArr);
			
		});
		$('.backBtn').click(function(){
			backClick(questionsArr);
		});
		$('input[type=radio][name=answers]').change(function() {
			nextClick(questionsArr);
			//console.log("question:" + questionsArr);
		});

	}
	
  var resultsArr = new Array();
  //console.log("results arr:" + resultsArr);
  function setupResults(resultJson){

    var resultScore = resultJson[0].score[0].id;
    
  // array of questions
      $.each( resultJson[0].results, function( index, value ) {
      
      
      var resultList = new Object();
      resultList.id = value.id;
      resultList.title = value.title;
      resultList.text = value.text;
      resultList.chartImg = baseURL+"/sites/all/modules/investment_profile_builder_save/img/find-mix-"+value.id+".png";//value.chartImg;
      
      resultsArr[index] = resultList;
      
      //
      
      
      });
      
      updateResults(resultScore);
	}
  
  function updateResults(score){
  var curr = score-1;
  
    $('.score-mainscore-full').html(resultsArr[curr].title).removeClass('score-mainscore-main-1 score-mainscore-main-2 score-mainscore-main-3 score-mainscore-main-4 score-mainscore-main-5 score-mainscore-main-6 score-mainscore-main-7').addClass('score-mainscore-main-'+score);
    $('.final-result-text-contents').html(''+resultsArr[curr].text+'<img src="'+resultsArr[curr].chartImg+'" width="150px">');
   //   $('.final-result-text').perfectScrollbar('update');
  }
		
    
    
    var riskRating;
	function getResult(localStorageData,questionsArr){
		stor = localStorageData;
		var answers = [];
		// make a call to the database to pull down the JSON
		// var resultData = "showFunds=Y&b2c=N&internal=N&alternative1=A4&alternative2=A3&alternative3=A5&alternative4=A5&alternative5=A4&alternative6=A3&alternative7=A4&alternative8=A4&alternative9=A4&alternative10=A5&alternative11=A4&callback_name=?"
		
		var s = questionsArr[currentQuestion].Answers;
		var urlParams = "";
    
		//for(i=0; i<userAnswersArr.length; i++){
				  // pdfURL = pdfURL + "q" + (i+1) + "=" + userAnswersArr[i] + "&";
				 // urlParams += "alternative"+(i+1)+"=A"+userAnswersArr[i]+"&";
		//}
		for (var i = 0; i < userAnswersArr.length; i++) {
        answers[i] = [
            "attitudeToInvestingAnswer" + (i + 1), "A" + userAnswersArr[i]
        ];
        }
		
		var data = { answers:answers };
		
		$.ajax({
        url: "https://apps.irishlife.ie/myonlineservices/RiskQuestionnaireApi/CalculateRiskNumber",
        type: "POST",
        data: data,
        success: function(response){
            //ToDo: Use response to build the page
            //console.log(response.RiskNumber);
            //console.log(response.RiskTitle);
            //console.log(response.RiskDescription);

            //Current: Open hardcoded pages
            riskRating = response.RiskNumber;
            scriptLoaded();
        },
        error: function(response) {
            //console.log(response);
        }
    });


		// make a call to the google analytics tag manager to 
		 // register that the user has completed the questionnaire 
		 myIPB._setGAPageViewIPBCompleted();    
		 //loadScript("https://www.irishlife.ie/servlet/calcRiskProfile.do?resultOnly=Y&"+urlParams,scriptLoaded,urlParams);
	}

	//var questionsArr = new Array();
	var currentQuestion = 0;

  
	function loadScript(url, callback, params) {

	var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback(params);
                }
            };
        } else { //Others
            script.onload = function () {
                callback(params);
            };
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
	
	//the script should be loaded now and we can interrogate the result and go to the appropriate page	
	function scriptLoaded(params)
	{
		if (getCookie( 'userInvestmentResults' )){
            // not the first time doing this
              stor['firstScore'] = stor['firstScore'];
              stor['currentScore'] = riskRating;
            // 
            }
            else{
           // 
            
              stor['firstScore'] = riskRating;
              stor['currentScore'] = riskRating;
            }
          // 
          myIPB._setGAEvent('Investor Profile Builder', 'Result Received', "r-f"+riskRating, "1");
          setCookie( 'userInvestmentResults', JSON.stringify(stor),30 );
		  setCookie( 'investorType',riskRating,30);
		  
		  var loc = "investments/new-to-investing";
          if(riskRating==1){
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_1;
          } else if(riskRating==2){
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_2;
          }else if(riskRating==3){
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_3;
          }else if(riskRating==4){
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_4;
          }else if(riskRating==5){
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_5;            
          }else if(riskRating==6){          
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_6;                 
          }else if(riskRating==7){          
            loc = Drupal.settings.investment_profile_builder_save.ratingurl_7;          
          }
		  
		  var destinationPage = '';
		  
		  if (loc.indexOf('http') < 0)
		  {
			loc = '/' + loc;
		  }
		  
		  if (loc.indexOf('?') < 0)
		  {
			destinationPage= loc+"?source=ipb";
		  }
		  else
		  {
			destinationPage=loc + "&source=ipb";
		  }
		  
		  
		  $('#irishlife-atrc-disclaimer').append('<center><p class="irishlife-atrc-disclaimer-redirect-link" style="display:none;">If you are not redirected in a few seconds then <a href="'+destinationPage+'">click here</a>.</p></center>')
          $('.irishlife-atrc-disclaimer-redirect-link').delay(1000).fadeIn('slow');
		  
  		  top.location.href=destinationPage;//this has to be top in case the application is running in an iframe.
   
	}

  
})(jQuery);;
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);
;
/*!
 * jQuery meanMenu v2.0.6 (Drupal Responsive Menus version)
 * @Copyright (C) 2012-2013 Chris Wharton (https://github.com/weare2ndfloor/meanMenu)
 *
 */
(function(e){"use strict";e.fn.meanmenu=function(t){var n={meanMenuTarget:jQuery(this),meanMenuContainer:"body",meanMenuClose:"X",meanMenuCloseSize:"18px",meanMenuOpen:"<span /><span /><span />",meanRevealPosition:"right",meanRevealPositionDistance:"0",meanRevealColour:"",meanRevealHoverColour:"",meanScreenWidth:"480",meanNavPush:"",meanShowChildren:true,meanExpandableChildren:true,meanExpand:"+",meanContract:"-",meanRemoveAttrs:false,onePage:false,removeElements:""};var t=e.extend(n,t);var r=document.documentElement.clientWidth||document.body.clientWidth;return this.each(function(){function x(){if(a=="center"){var e=document.documentElement.clientWidth||document.body.clientWidth;var t=e/2-22+"px";C="left:"+t+";right:auto;";if(!S){jQuery(".meanmenu-reveal").css("left",t)}else{jQuery(".meanmenu-reveal").animate({left:t})}}}function A(){if(jQuery(L).is(".meanmenu-reveal.meanclose")){L.html(s)}else{L.html(u)}}function O(){jQuery(".mean-bar,.mean-push").remove();jQuery(i).removeClass("mean-container");jQuery(e).show();T=false;N=false;jQuery(E).removeClass("mean-remove")}function M(){if(r<=h){jQuery(E).addClass("mean-remove");N=true;jQuery(i).addClass("mean-container");jQuery(".mean-container").prepend('<div class="mean-bar"><a href="/"><img src="/sites/retail/files/irish-life-logo-shard-mobile.png" class="shard-mobile-js"><a href="/login-to-your-account"><img class="login-mobile-js" src="/sites/retail/files/Login.png"></a></a><a href="#nav" class="meanmenu-reveal" style="background:;color:;right:0;left:auto;top: 10px;"><span></span><span></span><span></span></a><nav class="mean-nav"></nav></div>');var t=jQuery(n).html();jQuery(".mean-nav").html(t);if(b){jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function(){jQuery(this).removeAttr("class");jQuery(this).removeAttr("id")})}jQuery(e).before('<div class="mean-push" />');jQuery(".mean-push").css("margin-top",p);jQuery(e).hide();jQuery(".meanmenu-reveal").show();jQuery(d).html(u);L=jQuery(d);jQuery(".mean-nav ul").hide();if(v){if(m){jQuery(".mean-nav ul ul").each(function(){if(jQuery(this).children().length){jQuery(this,"li:first").parent().append('<a class="mean-expand" href="#" style="font-size: '+o+'">'+g+"</a>")}});jQuery(".mean-expand").on("click",function(e){e.preventDefault();if(jQuery(this).hasClass("mean-clicked")){jQuery(this).text(g);jQuery(this).prev("ul").slideUp(300,function(){})}else{jQuery(this).text(y);jQuery(this).prev("ul").slideDown(300,function(){})}jQuery(this).toggleClass("mean-clicked")})}else{jQuery(".mean-nav ul ul").show()}}else{jQuery(".mean-nav ul ul").hide()}jQuery(".mean-nav ul li").last().addClass("mean-last");L.removeClass("meanclose");jQuery(L).click(function(e){e.preventDefault();if(T==false){L.css("text-align","center");L.css("text-indent","0");L.css("font-size",o);jQuery(".mean-nav ul:first").slideDown();T=true}else{jQuery(".mean-nav ul:first").slideUp();T=false}L.toggleClass("meanclose");A();jQuery(E).addClass("mean-remove")});if(w){jQuery(".mean-nav ul > li > a:first-child").on("click",function(){jQuery(".mean-nav ul:first").slideUp();T=false;jQuery(L).toggleClass("meanclose").html(u)})}}else{O()}}var e=t.meanMenuTarget;var n=t.meanMenuTarget.clone();n.find(".contextual-links-wrapper").remove().find("ul.contextual-links").remove();var i=t.meanMenuContainer;var s=t.meanMenuClose;var o=t.meanMenuCloseSize;var u=t.meanMenuOpen;var a=t.meanRevealPosition;var f=t.meanRevealPositionDistance;var l=t.meanRevealColour;var c=t.meanRevealHoverColour;var h=t.meanScreenWidth;var p=t.meanNavPush;var d=".meanmenu-reveal";var v=t.meanShowChildren;var m=t.meanExpandableChildren;var g=t.meanExpand;var y=t.meanContract;var b=t.meanRemoveAttrs;var w=t.onePage;var E=t.removeElements;if(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Blackberry/i)||navigator.userAgent.match(/Windows Phone/i)){var S=true}if(navigator.userAgent.match(/MSIE 8/i)||navigator.userAgent.match(/MSIE 7/i)){jQuery("html").css("overflow-y","scroll")}var T=false;var N=false;if(a=="right"){C="right:"+f+";left:auto;"}if(a=="left"){var C="left:"+f+";right:auto;"}x();var k="background:"+l+";color:"+l+";"+C;var L="";if(!S){jQuery(window).resize(function(){r=document.documentElement.clientWidth||document.body.clientWidth;if(r>h){O()}else{O()}if(r<=h){M();x()}else{O()}})}window.onorientationchange=function(){x();r=document.documentElement.clientWidth||document.body.clientWidth;if(r>=h){O()}if(r<=h){if(N==false){M()}}};M()})}})(jQuery)

;
/**
 * @file
 * Integrate Mean Menu library with Responsive Menus module.
 */
(function ($) {
  Drupal.behaviors.responsive_menus_mean_menu = {
    attach: function (context, settings) {
      settings.responsive_menus = settings.responsive_menus || {};
      $.each(settings.responsive_menus, function(ind, iteration) {
        if (iteration.responsive_menus_style != 'mean_menu') {
          return true;
        }
        if (!iteration.selectors.length) {
          return;
        }
        // Set 1/0 to true/false respectively.
        $.each(iteration, function(key, value) {
          if (value == 0) {
            iteration[key] = false;
          }
          if (value == 1) {
            iteration[key] = true;
          }
        });
        // Call meanmenu() with our custom settings.
        $(iteration.selectors).once('responsive-menus-mean-menu', function() {
          $(this).meanmenu({
            meanMenuClose: iteration.close_txt || "X",
            meanMenuCloseSize: iteration.close_size || "18px",
            meanMenuOpen: iteration.trigger_txt || "<span /><span /><span />",
            meanRevealPosition: iteration.position || "right",
            meanScreenWidth: iteration.media_size || "480",
            meanExpand: iteration.expand_txt || "+",
            meanContract: iteration.contract_txt || "-",
            meanShowChildren: iteration.show_children,
            meanExpandableChildren: iteration.expand_children,
            meanRemoveAttrs: iteration.remove_attrs
          });
        });
      });

    }
  };
}(jQuery));
;
/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a,b){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),null!=a.scrollContainer&&(this.config.scrollContainer=document.querySelector(a.scrollContainer)),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(b){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);;
