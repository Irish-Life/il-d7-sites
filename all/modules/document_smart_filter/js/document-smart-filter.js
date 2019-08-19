(function ($) {
  var transferLocation=0;
  
  // PRODUCT ID
  // PRB = 0
  // PRSA = 1
  // PERSONAL PENSION = 2 0-4-0-8
  
  // COMPANY PENSION = 3
  // ARF = 4
  // VESTED PRSA = 5
  // PRSA AVC = 6
  var transferMatrix = [
  
    [true,false,false,true,false,false,false,false,false,false], //PRB to ...
    [false,true,false,true,false,false,false,false,false,false], // PRSA to ...
    [false,true,true,false,false,false,false,false,false,false], // Personal Pension to ...
    [true,true,false,true,false,false,false,false,false,false], // Company Pension to ...
    [false,false,false,false,true,false,false,false,false,true], // ARF to ...
    [false,false,false,false,true,true,false,false,true,true], // Vested PRSA to ...
    [false,false,false,true,false,false,true,false,false,false], // PRSA AVC to ...
    [true,false,false,true,false,false,true,false,false,false], // AVC Scheme to ...
    [false,false,false,false,false,false,false,false,true,true] // AMRF  to ...
    ];
	// PRB, PRSA AVC, Personal Pension, company pension, ARF, PRSA AVC, Vested PRSA, AVC Scheme, AMRF, Annuity
  
  //////////////////////////
  // Now what product have they selected as the product they are transferring from
  
  var transferFromSource; // screen 1 - 0 = External & 1 = Internal
  var transferFromPlanType; // screen 2
  var transferIntoExistingNew; // screen 3
  var transferIntoPlanType; // screen 4
  var holdingtransferIntoPlanType;
  var titles = ['1. Transfer source','2. Source of funds','3. New Product','4. New or Existing'];
  // e.g. transferMatrix[0][2] is 'PRB' into 'Personal Pension' which is 
  // alert(transferMatrix[0][2]);
  
  $(document).ready(function() {
	  
	setTitles(1);
    //////////////////////
    // this is the click on the first screen e.g. irish life or others
    $('.welcomeBtn').click(function(){
      $('.document_smart_filter_welcome').hide();
      $('.document_smart_filter').fadeIn();
    });
    //////////////////////
    // this is the click on the first screen e.g. irish life or others
    $('.screen-1').click(function(){
      resetScreen('1');
    }); 
    $('.screen-2').click(function(){
      resetScreen('2');
    }); 
    $('.screen-3').click(function(){
      resetScreen('3');
    }); 
	
    $('.select-1-a').click(function(){
      setScreen('1','External');
      transferFromSource = 0;
    }); 

    $('.select-1-aa').click(function(){
      setScreen('1','External');
      $('.subdesccc').show();
      transferFromSource = 0;
    }); 	
	$('.select-1-b').click(function(){
      setScreen('1','Internal');
      transferFromSource = 1;
    });    
	
  // PRB = 0
  // PRSA = 1
  // PERSONAL PENSION = 2
  // COMPANY PENSION = 3
  // ARF = 4
  // VESTED PRSA = 5
  // PRSA AVC = 6  
  var namesprod = ['PRB','PRSA','PERSONAL PENSION','COMPANY PENSION','ARF','VESTED PRSA','PRSA AVC'];
  //Transferring into which product?
	$('.select-2-a').click(function(){
      transferFromPlanType = 2;
      setScreen('2','Personal Pension');
      setProductFromOptions(transferFromPlanType);
      
    }); 
	$('.select-2-b').click(function(){
      transferFromPlanType = 1;
      setScreen('2','PRSA');
      setProductFromOptions(transferFromPlanType);
    }); 
	$('.select-2-c').click(function(){
      transferFromPlanType = 6;
      setScreen('2','PRSA AVC');
      setProductFromOptions(transferFromPlanType);
    }); 
	$('.select-2-d').click(function(){
      transferFromPlanType = 5;
      setScreen('2','Vested PRSA');
      setProductFromOptions(transferFromPlanType);
    }); 
	$('.select-2-e').click(function(){
      transferFromPlanType = 3;
      setScreen('2','Company Pension');
      setProductFromOptions(transferFromPlanType);
    });   
	$('.select-2-f').click(function(){
      transferFromPlanType = 0;
      setScreen('2','PRB');
      setProductFromOptions(transferFromPlanType);
    });   
	$('.select-2-g').click(function(){
      transferFromPlanType = 4;
      setScreen('2','ARF');
      setProductFromOptions(transferFromPlanType);
    });  
// ## NEW ##	
	$('.select-2-h').click(function(){
      transferFromPlanType = 7;
      setScreen('2','AVC Scheme');
      setProductFromOptions(transferFromPlanType);
    });   
	$('.select-2-i').click(function(){
      transferFromPlanType = 8;
      setScreen('2','AMRF');
      setProductFromOptions(transferFromPlanType);
    });   


	// PRB = 0
	// PRSA = 1
	// PERSONAL PENSION = 2
	// COMPANY PENSION = 3
	// ARF = 4
	// VESTED PRSA = 5
	// PRSA AVC = 6  
	// AVC Scheme =7  
	// AMRF = 8  
	
  //Transferring into which product?
	$('.select-3-a').click(function(){
      setScreen('3','Personal Pension');
      transferIntoPlanType = 2;
      
    }); 
	$('.select-3-b').click(function(){
      transferIntoPlanType = 1;
      setScreen('3','PRSA');
    }); 
	$('.select-3-c').click(function(){
      transferIntoPlanType = 6;
      setScreen('3','PRSA AVC');
    }); 
	$('.select-3-d').click(function(){
      transferIntoPlanType = 5;
      setScreen('3','Vested PRSA');
    }); 
	$('.select-3-e').click(function(){
      transferIntoPlanType = 3;
      setScreen('3','Company Pension');
    });   
	$('.select-3-f').click(function(){
      transferIntoPlanType = 0;
      setScreen('3','PRB');
    });   
	$('.select-3-g').click(function(){
      transferIntoPlanType = 4;
      setScreen('3','ARF');
    }); 
	$('.select-3-h').click(function(){
      transferIntoPlanType = 7;
      setScreen('3','AVC Scheme');
    }); 
	$('.select-3-i').click(function(){
      transferIntoPlanType = 8;
      setScreen('3','AMRF');
    }); 
	$('.select-3-j').click(function(){
      transferIntoPlanType = 9;
      setScreen('3','Annuity');
    }); 
    
    
	// Products - Pensions
	$('.select-4-a').click(function(){
      transferIntoExistingNew = '0';
      setScreen('4','Existing Plan');
    }); 
	$('.select-4-b').click(function(){
	  transferIntoExistingNew = '1';
      setScreen('4','New Plan');
    });

 	
	
	$('.back-step1').click(function(){
      resetScreen('1');
      setScreen('0');
	  $('.postit').hide();
	  $('.resultnote').hide();
	  $('.resultDoc').hide();
    }); 
	$('.back-step2').click(function(){
      resetScreen('2');
      setScreen('1');
	  $('.postit').hide();
	  $('.resultnote').hide();
	  $('.resultDoc').hide();
    }); 	
	
	
	$('.back-step3').click(function(){
      resetScreen('3');
      setScreen('2');
	  $('.postit').hide();
	  $('.resultnote').hide();
	  $('.resultDoc').hide();
    }); 	
	
	
	$('.back-step5').click(function(){
	  $('.postit').hide();
	  $('.resultnote').hide();
	  $('.resultDoc').hide();
      resetScreen('4');
	  transferIntoPlanType=holdingtransferIntoPlanType;
      setScreen('3');
    }); 	
	
	
  
  
  
  
  
  

	
	
	resetScreen = function(screen){
		//alert(screen);
		setTitles(screen);
		
      $('.subdesccc').hide();
		var nextScreen = Number(screen);
		
		$('.screen-1').removeClass('selected').removeClass('phase');
		$('.screen-2').removeClass('selected').removeClass('phase');
		$('.screen-3').removeClass('selected').removeClass('phase');
		$('.screen-4').removeClass('selected').removeClass('phase');
		
		for (i=1;i<screen; i++){
			$('.screen-'+screen).addClass('selected').removeClass('phase');
		}
		
		$('.screen-'+nextScreen).addClass('phase');	

		$('.screen-block-2').hide();
		$('.screen-block-3').hide();
		$('.screen-block-4').hide();
		$('.screen-block-5').hide();
		 $('.extraQuestion ').hide();
		 $('.result-note ').hide();
		//$('.screen-block-'+nextScreen).fadeIn('slow');
	
	}
	
	
	setScreen = function(screen,choice){
		//alert(screen);
		/*console.log('transferFromSource: '+transferFromSource);
		console.log('transferFromPlanType: '+transferFromPlanType);
		console.log('transferIntoExistingNew: '+transferIntoExistingNew);
		console.log('transferIntoPlanType: '+transferIntoPlanType);
		*/
		holdingtransferIntoPlanType=transferIntoPlanType;
		//console.log('screen '+screen);
		var nextScreen = Number(screen)+1;
    
		if(nextScreen=="1"){
		  $('.step-bar').width('12%');
		  $('#step2').removeClass('activated');
		  $('#step3').removeClass('activated');
		  $('#step4').removeClass('activated');
		}
		else if(nextScreen=="2"){
		  $('#step2').addClass('activated');
		  $('#step3').removeClass('activated');
		  $('#step4').removeClass('activated');
		  $('.step-bar').width('37%');
		}
		else if(nextScreen=="3"){
		  $('#step3').addClass('activated');
		  $('#step4').removeClass('activated');
		  $('.step-bar').width('62%');
		}
		else if(nextScreen=="4"){
		  $('#step4').addClass('activated');
		  $('.step-bar').width('87%');
		}
		
		if(nextScreen == 5){
			// we have some EXTRA questions for specific movements
			if (transferFromPlanType=='3' && transferIntoPlanType=='1'){
				showExtraScreen('31');
			}
			else if (transferFromPlanType=='7' && transferIntoPlanType=='6'){
				showExtraScreen('71');
			}
			else{
				$('.screen-block-'+screen).hide();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
				
				$('.step-bar').width('100%');
				
				$('.screen-'+screen).addClass('selected').removeClass('phase');
				$('.screen-'+screen).html(screen+'. '+choice+'<span class="checkbox"></span>');
				$('.title-screen-'+screen).html(choice);
				$('.screen-'+nextScreen).addClass('phase');	

				$('.screen-block-'+nextScreen).fadeIn('slow');
			}
		}
		else{
			$('.screen-block-'+screen).hide();
			$('.screen-'+screen).addClass('selected').removeClass('phase');
			$('.screen-'+screen).html(screen+'. '+choice+'<span class="checkbox"></span>');
			$('.title-screen-'+screen).html(choice);
			$('.screen-'+nextScreen).addClass('phase');	

			$('.screen-block-'+nextScreen).fadeIn('slow');
		}
		
	}
	showExtraScreen = function(extraScreen){
	//console.log("extraScreen "+extraScreen);
		if(extraScreen == '31'){
			
			$('.extra-31-a').show();			
			
			// hide and show the relevant screens
			$('.screen-block-4').hide();
			$('.screen-block-extra').show();
			$('.extra-31').show();
			
			///////////////////////////////////////
			// Question 1
			$('.extra-31-a-yes').click(function(){
			  $('.extra-31-a').hide();
			  $('.extra-31-b').fadeIn();
			});
			
			$('.extra-31-a-no').click(function(){
			  $('.extra-31-a').hide();
			  
				transferIntoPlanType = '3-2';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			  //$('.extra-31-e').fadeIn();
			});
			
			///////////////////////////////////////
			// Question 2
			$('.extra-31-b-yes').click(function(){
			  $('.extra-31-b').hide();
				transferIntoPlanType = '3-1';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			$('.extra-31-b-no').click(function(){
			  $('.extra-31-b').hide();
			  $('.extra-31-c').fadeIn();
			});
			///////////////////////////////////////
			// Question 3
			$('.extra-31-c-yes').click(function(){
			  $('.extra-31-c').hide();
			  $('.extra-31-d').fadeIn();
			});
			
			$('.extra-31-c-no').click(function(){
			  $('.extra-31-c').hide();
				transferIntoPlanType = '3-2';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			///////////////////////////////////////
			// Question 4
			$('.extra-31-d-yes').click(function(){
			  $('.extra-31-d').hide();
				transferIntoPlanType = '3-1';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			$('.extra-31-d-no').click(function(){
			  $('.extra-31-d').hide();
			  $('.extra-31-e').fadeIn();
			});
			
			///////////////////////////////////////
			// Question 5
			$('.extra-31-e-db').click(function(){
			  $('.extra-31-d').hide();
				transferIntoPlanType = '3-3';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			$('.extra-31-e-dc').click(function(){
				transferIntoPlanType = '3-1';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
				$('.r-0313-1a').show();
			});
			
			
			// manage the questions
			// show the 1st questions
			
			
		}
		else if(extraScreen == '71'){
			
			$('.extra-71-a').show();
			
			
			// hide and show the relevant screens
			$('.screen-block-4').hide();
			$('.screen-block-extra').show();
			$('.extra-71').show();
			
			///////////////////////////////////////
			// Question 1
			$('.extra-71-a-yes').click(function(){
			  $('.extra-71-a').hide();
				transferIntoPlanType = '7-2';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			$('.extra-71-b-yes').click(function(){
			  $('.extra-71-a').hide();
				transferIntoPlanType = '7-2';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			$('.extra-71-b-no').click(function(){
			  $('.extra-71-a').hide();
				transferIntoPlanType = '7-3';
				
				$('.screen-block-extra').hide();
				$('.screen-block-5').show();
				
				setResults(transferFromSource,transferFromPlanType,transferIntoExistingNew,transferIntoPlanType);
			});
			
			
			$('.extra-71-a-no').click(function(){
			  $('.extra-71-a').hide();
			  $('.extra-71-b').fadeIn();
			  //$('.extra-31-e').fadeIn();
			});
		}
			
	}
	setResults = function(a,b,c,d){
			
	// PRB = 0
	// PRSA = 1
	// PERSONAL PENSION = 2
	// COMPANY PENSION = 3
	// ARF = 4
	// VESTED PRSA = 5
	// PRSA AVC = 6  
	// AVC Scheme =7  
	// AMRF = 8  
	// Annuity = 9  
  
    /*
      
      transferFromSource - transferFromPlanType - transferIntoExistingNew - transferIntoPlanType
      
    */
			
			//console.log(a+' - '+b+' - '+c+' - '+d);
			//$('.code').html('<strong>Screen Code: '+a+'-'+b+'-'+c+'-'+d+' (TEST Information)</strong>');
			//$('#result-'+a+'-'+b+'-'+c+'-'+d).show();
			$('.r-'+a+''+b+''+c+''+d).show();
			//console.log(a+' from: '+namesprod[b]+' to '+c+' '+namesprod[d]);
		}
		
		
  setProductFromOptions = function(fromID){
  $('.product-box').hide();
    for(i=0; i<=transferMatrix[fromID].length; i++){
      //console.log("fromID "+fromID+" i "+i);
      //console.log(transferMatrix[fromID][i]);
      if(transferMatrix[fromID][i])
      {
        $('.product-into-show-'+i).show();
      }
    }
  }
  
  setProductIntoOptions = function(intoID){
  
    for(i=0; i<=transferMatrix[intoID].length; i++){
     // console.log(transferMatrix[intoID][i]);
      if(transferMatrix[intoID][i])
      {
        $('.product-into-show-'+i).show();
      }
    }
  }
  });
  
  hideScreen = function(n){
    $('#select-'+n).hide();
      $('.smart-filter-holder').hide();
    /*
    resetFirstScreen();
    for(i=1; i<=$("#select-1 > li").size(); i++){
      if (i!=exclude){
        $('#select-1-'+i).addClass('transparent');
      }
      else{
        $('#select-1-'+i).addClass('selected');
      }
    }
    */
  }
  
  setTitles = function(start){
	  for(i=start; i<=titles.length; i++){
		  $('.screen-'+i).html(titles[i-1]);
	  }
  }
  
  ///////////////////////////////////////////////
  //
  // Record activity on various 3rd party websites
  //
  //
  ////////////////////////////////////////////////
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
  function mkVisitWebPage(pagename)
  {
    if (isFunction()){
      mktoMunchkinFunction('visitWebPage', {url: pagename});
    }
  }
})(jQuery);



