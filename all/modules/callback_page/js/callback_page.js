(function($){


	$(document).ready(function($) {

		//check for retirement planning param in URL and show the relevant callback button
		if(window.location.href.indexOf('retirement-planning') > -1) {
			$('#sendAdvisorCallbackForm2').show();
		}
		else {
			$('#sendAdvisorCallbackForm').show();
		}

		// validate email address format
		function isEmail(email) {
		  //var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		  var regex = /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
		  return regex.test(email);
		}

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

		function beClickTalkPop(){
			$("#progressBoxPopupContents").hide();
			$("#loadingbox").show();
		}

		function seClickTalkPop(){
			$("#loadingbox").hide();
			$("#progressBoxPopupContents").hide();
			$("#loadingcomplete").show();
		}

		function eeClickTalkPop(){
			alert("error ");
		}

		// Submitting a RHS callback
		$('#sendAdvisorCallbackForm, #sendAdvisorCallbackForm2').click(function(){
			var n,e,p,t,z,a,ae;
			z = 0;
			n = $("#progressName").val()
			e = $('#progressEmail').val();
			p = $("#progressPhone").val()
			ae = $('#callbackAreaInterest').val();
			t = $('#progressCalltime').val();
			
			if(p.length<6){
				z =z+1;
				alert("Please enter a valid PHONE NUMBER.");
			}

			/* if(isEmail(e) == false){
				e ="N/A";
				alert("Please enter a valid email.");
			} */
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
})(jQuery)