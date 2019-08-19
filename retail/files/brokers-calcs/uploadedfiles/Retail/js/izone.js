function sendIZoneFeedback()
{
	valid = true;
	var a1=getRadioAnswer('1');	
	var a2=getRadioAnswer('2');	
	var a3=getRadioAnswer('3');	
	var a4=getRadioAnswer('4');	
	var optIn;
	if ($("#email-opt-in:checked").val())
	{
		optIn = 'Yes';
	}
	else
	{
		optIn = 'No';
	}	
	if (valid)checkemail($('#emailAddress').val());
	
	if (valid)
	{
		var type="I Zone Feedback";
		var detail = "Email Address: " + $('#emailAddress').val() + 
		'\n1. Range of topics: ' + a1 + 
		'\n2. Easy to read: ' + a2 +
		'\n3. Enough information: ' + a3 + 
		'\n4. Forward to friend: ' + a4 +
		'\n5. Comments: ' + $('#comments').val() +
		'\n6. Orig Email: ' + gup('email') + 
		'\nEmail Opt in: ' + optIn;
		var parms = 'form_id=generalFeedback&type='+type + '&detail='+escape(detail);
 
		$.ajax({
			type: 'POST',
			url: '/myonlineservices/servlet/submitForm.do',
			async: true,
			data: parms,
			success: successSubmit,
			timeout: 300000
			}); 
	}

}


var valid = false;

 
function getRadioAnswer(questionNum)
{
	if (valid)
	{
		var answer;
		if ($('#q'+questionNum+'Y:checked').val())
		{
			answer='Yes';
		}
		else if ($('#q'+questionNum + 'N:checked').val())
		{
			answer='No';
		}
		else
		{
			valid = false;
			alert('Answer Question ' + questionNum);				
		}
	}
	return answer;
}
function checkemail(emailAddress){
var str=emailAddress
var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
if (filter.test(str))
{
	valid=true;
}
else
{
	alert("Please input a valid email address!")
	valid=false
}
}

function successSubmit(response)
 {
		$('#izone-feedback').addClass('hidden');
		$('#izone-feedback-confirmed').removeClass('hidden');
 }

function unsubscribe(emailAddress)
{

	var parms = 'form_id=generalFeedback&type=IZone - Unsubscribe&detail='+emailAddress;
 
		$.ajax({
			type: 'POST',
			url: '/myonlineservices/servlet/submitForm.do',
			async: true,
			data: parms,
			success: successUnsubscribe,
			timeout: 300000
			}); 
}

function successUnsubscribe(response)
 {
		$('#confirmUnsubscribe').removeClass('hidden');
		$('#unsubscribe').addClass('hidden');
 }



function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
