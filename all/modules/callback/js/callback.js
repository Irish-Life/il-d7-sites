/*
 * SimpleModal 1.4.3 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2012 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sat, Sep 8 2012 07:52:31 -0700
 */
(function($){


	$(document).ready(function($) {

		$(document).on('click', '.anyCallbackButton', function(event) {
			event.preventDefault();
			$('#callback-modal-content').modal();
		});

		 function setGAPageView (p,t) {
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


		// validate email address format
		function isEmail(email) {
		  var regex = /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
		  return regex.test(email);
		}

		function beClickTalkPop(){
			$("#progressBoxPopupContents").hide();
			$("#loadingboxpopup").show();
		}

		function seClickTalkPop(){
			$("#loadingboxpopup").hide();
			$("#progressBoxPopupContents").hide();

			$("#loadingcompletepopup").show();
			setTimeout( function(){
				$.modal.close();
			}, 4000);
		}

		function eeClickTalkPop(){
			alert("error ");
		}

		// Submitting a RHS callback
		$('#sendAdvisorCallbackPopupForm').click(function(){
			var n,e,p,t,z,a,ae;
			z = 0;
			n = $("#callbackPopupName").val()
			e = $('#callbackPopupEmail').val();
			p = $("#callbackPopupPhone").val()
			ae = $('#callbackAreaInterest').val();
			t = $('#callbackPopupCalltime').val();
			
			if(p.length<6){
				z =z+1;
				alert("Please enter a valid PHONE NUMBER.");
			}

			if(isEmail(e) == false){
				e ="N/A";
			}
			if (z==0)
			{
				// no errors
				// send the callback anc change the screen
				mkAssociateLead('', n, e, p, t, ae);
				seClickTalkPop();
				setGAPageView('/financial-advice/callback-requested','Callback Requested callback RHS');
			}
		});
	});
	
	$(window ).load(function() {
		jQuery('#callbackTab').animate({left: 0},2000);
	});

})(jQuery)