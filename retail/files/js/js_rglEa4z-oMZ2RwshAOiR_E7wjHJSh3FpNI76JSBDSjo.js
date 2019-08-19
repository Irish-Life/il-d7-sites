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
