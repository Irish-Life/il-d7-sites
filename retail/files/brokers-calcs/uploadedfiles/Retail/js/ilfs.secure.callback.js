
$('#progressStep4Secure').click(function(){
var extraInforForEmail;

timestamp=Number(new Date());

	if (secondPersonAddedLifeCoverProgress ==true){
	extraInforForEmail = 
		"\n\nCover Amount: "+coverValue+
		"\nTerm: "+numYears+" years"+
		
		"\n\n####PERSON ONE DETAILS####"+
		"\nGender: "+p1gender+
		"\nSmoker: "+p1smoker+
		"\nDate of Birth: "+p1dobday+"/"+p1dobmonth+"/"+p1dobyear+
		
		"\n\n####PERSON TWO DETAILS####"+
		"\nGender: "+p2gender+
		"\nSmoker: "+p2smoker+
		"\nDate of Birth: "+p2dobday+"/"+p2dobmonth+"/"+p2dobyear+
		
		"\n\n#### QUOTE ####\nEuro: "+prmLev;

	}else
	{
	extraInforForEmail = 
		"\n\nCover Amount: "+coverValue+
		"\nTerm: "+numYears+" years"+
		
		"\n\n####PERSON ONE DETAILS####"+
		"\nGender: "+p1gender+
		"\nSmoker: "+p1smoker+
		"\nDate of Birth: "+p1dobday+"/"+p1dobmonth+"/"+p1dobyear+
		
		"\n\n#### QUOTE ####\nEuro: "+prmLev;
	}
	extraInforForEmail = extraInforForEmail + "\n\n#### IMPORTANT ####\nThis quote is valid for 7 days.";
	
	
	if ($("#progressPhone").val().length >=7)
	{
		var titleextra = "Term Assurance";
		var trackpageurl = window.location.pathname;
		if(typeof product != 'undefined'){  
			if (product=="wholeoflife")
			{ 
				titleextra = "Whole of Life";
			} 
			else if (product=="mortgageprotection")
			{ 
				titleextra = "Mortgage Protection";
			}
			else if (product=="aib")
			{ 
				titleextra = "****AIB CONTACT - AIB CONTACT ****";
			}
		}
		var emailAddress='N/A';
		if ($("#progressEmail").val())
		{
			emailAddress=$("#progressEmail").val();
		}
		sendClickToCallbackSecure('Q',''+$("#progressName").val(),''+$("#progressPhone").val(),emailAddress,''+$('#progressCalltime').val(),titleextra+' - PROCESS COMPLETE (time: '+timestamp+')',extraInforForEmail,beLifeInsuranceQuote,seLifeInsuranceQuote,eeLifeInsuranceQuote);
		
		if (_gaq){
		_gaq.push(['_trackEvent','Click to callback', 'Times',$('#progressCalltime').val()]);  		
		_gaq.push(['_trackPageview',trackpageurl+'#callback']);
		}
		if (altQuote){writeTrackingDiv(8);}else{writeTrackingDiv(4);}
	 }else
	 {
		alert("Please Enter a valid Phone Number");
	 }
});



//############################################################//
//
//######## This is a generic click to callback function. All click to callbacks should use this  ######//
//######## going forward. Params are the details and the ajax functions to be called.            ######//
//
//############################################################//
function sendClickToCallbackSecure(ty,n,p,e,t,s,ex,be,se,ee){
alert("jjj");
// sendClickToCallback('type','name','phone','email','time','subject','extraInfo', 'beforeClickToCallbackEmailLifeInsurance', 'successClickToCallbackEmailLifeInsurance',
//				     'errorClickToCallbackEmailLifeInsurance');
	if (n==""){n="unknown"} // fix bug that wouldn't send when name empty
	var params = 'type='+ty+
				'&name='+n+
				'&email='+e+
				'&phone='+p+
				'&question='+s+
				'&contacttime='+t+
				'\nEmail: '+e+
				'\n\nOther Information:'+ex;
		$.ajax({
			type: 'POST',
			url: 'https://www.irishlife.ie/secure/submitCallback.do',
			async: true,
			data: params,
			beforeSend: be,
			success: se,
			error: ee,
			timeout: 200000
		});
}
