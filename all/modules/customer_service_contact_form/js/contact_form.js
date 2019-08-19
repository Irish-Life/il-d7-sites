(function($){
	
    //WHEN THE FORM IS SUBMITTED DO THIS STUFF
	 $('#submitContact').click(function() {
	
	if (validateForm())
	{
		 $('html, body').animate({
			scrollTop: $(".wrapper").offset().top
		 }, 2000);	
		
		var emailBody = '';
		var userID = '';
		var subject = '';
		var dob ='';
		var plan ='';
		
		//IF A DROPDOWN ITEM IS SELECTED MAKE IT THE SUBJECT
		if($('#customerYes').is(":checked")) {			
			var topLevelSelectedOption = $('#contactReasons option:selected').val();
			var topLevelSelectedOptionClass = '.'+topLevelSelectedOption;			
			subject = "Web Contact - " + $(topLevelSelectedOptionClass +' .sub option:selected').text();
		}
		else {
			subject = "Web Contact - " + $('#subjectField').val(); //otherwise use the subject field
		}
		
		//IF NO IS SELECTED DONT SEND THE DATE OF BIRTH
		if($('#customerNo').is(":checked")) {
			dob = ""
			plan = ""
		}
		
		else {
			dob = "\nDate of Birth: " + $('#customerContactDay option:selected').text() + '/' + $('#customerContactMonth option:selected').text() + '/' + $('#customerContactYear option:selected').text();
			
			plan = "\nPlan Number: " + $('#customerContactPlan').val();
		}
		
	   
	   //THE EMAIL BODY CONTENTS
		emailBody = "Name: " + $('#customerContactFirstName').val() + $('#customerContactLastName').val() + 
		plan + dob + "\n\nMessage: " + $('#customerContactMessage').val();
		
		
		//GET THE USER ID DEPENDING ON WHAT THE CONTACT REASON IS
		if ($('#contactReasons').val() == "pensions") {
			userID = Drupal.settings.customer_service_contact_form.contactIdAlt;
		}
		else 
		{
			 userID = Drupal.settings.customer_service_contact_form.contactId;
		}

		var parms = "contactUserID="+userID+"&detail="+emailBody+"&from="+$('#customerContactEmail').val()+"&type="+subject;
		
		if (isFunction())
		{ 
			var hash = getHash(key+$('#customerContactEmail').val());
			
			mktoMunchkinFunction('associateLead',{Email: $('#customerContactEmail').val(),
			LeadSourceDetail:'CustomerContactForm',
			workDepartment:userID,
			FirstName: $('#customerContactFirstName').val(),
			MobilePhone: $('#customerContactPhone').val(),
			LastName: $('#customerContactLastName').val(),
			emailSubject: subject,
			emailBody:emailBody,
				LastGACampaignNameVisit:gaCampaign,
			OriginalGACampaignVisit:gaCampaign,
			LastGAMedium: gaMedium,
			OriginalGAMedium: gaMedium,	
			Callbackrequested: false},hash);
		}
		showSuccess();
		
		
		/*
		  $.ajax({
				type: 'POST',
				url: '/myonlineservices/servlet/submitForm.do',
				async: true,
				data: parms,
				before: beforeSend,
				success: showSuccess, //SHOW THE THANK YOU MESSAGE 
				error: showSuccessNo, //SHOW THE ERROR MESSSAGES - SEE BELOW
				timeout: 200000	   
	   });*/
	}
	
   });
   
   
   
   //FORM VALIDATION - IF ANY FIELDS ARE BLANK SHOW THE CORRESPONDING MESSAGE
   function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    }
    
	function validateForm() {
		
	var valid = true;	
    var n = document.forms["contact-form"]["fname"].value;
	var s = document.forms["contact-form"]["fsname"].value;
    var e = document.forms["contact-form"]["femail"].value;
	var p = document.forms["contact-form"]["fplan"].value;
	var d = $('#customerContactDay option:selected').val();
	var m = $('#customerContactMonth option:selected').val();
	var y = $('#customerContactYear option:selected').val();
	var myEmail = $('#customerContactEmail').val();

    if (n == null || n == "") {
        $('#nameError').show();
		$('#submitError').show();
		valid = false;
		
    }
	
	if (s == null || s == "") {
        $('#nameError').show();
		$('#submitError').show();
		valid = false;
		
    }
	
	if (e == null || e == "") {
        $('#emailError2').show();
		$('#submitError').show();
		valid = false;
		
    }
	
	if($('#customerYes').is(':checked')){
	
	if ( p == null || p == "") {
        $('#planError').show();
		$('#submitError').show();
		valid = false;
		
    }
	
	if  (d == null || d == "") {
		$('#dobError').show();
		$('#submitError').show();
		$('#dobMsg').css("color:red");
		valid = false;
	}
	
	if  (m == null || m == "") {
		$('#dobError').show();
		$('#submitError').show();
		$('#dobMsg').css("color:red");
		valid = false;
	}
	
	if  (y == null || y == "") {
		$('#dobError').show();
		$('#submitError').show();
		$('#dobMsg').css("color:red");
		valid = false;
	}
	}
	
	if(!validateEmail(myEmail)){		
		$('#emailError2').show();
		$('#submitError').show();
		valid = false;
		}
	
	return valid;
	
    }
	
	//SET THE YEAR RANGE TO BE 18 YEARS OLD
	var minOffset = 18, maxOffset = 100;
    var thisYear = (new Date()).getFullYear();
    var select = $('#customerContactYear');

    for (var i = minOffset; i <= maxOffset; i++) {
    var year = thisYear - i;
    $('<option>', {value: year, text: year}).appendTo(select);
    }
	
	
	
   //IF THERE IS A SLOW CONNECTION SHOW PLEASE WAIT
  function beforeSend() {
	  $('#main').fadeOut(function(){
		$('#form-send').show();
	 });
	}
	
  //IF SUBMITTED SUCCESSFULLY SHOW THANK YOU MESSAGE
  function showSuccess() {
	 $('#main').fadeOut(function(){
		$('#form-submit').fadeIn();
	 });
	 /*mkAssociateLeadNoCallback($('#customerContactEmail').val(),'WebsiteContactForm');*/
    }
	
  //IF THERE IS AN ERROR WITH THE SUBMIT SHOW MESSAGE
  function showSuccessNo() {
	$('#main').fadeOut(function() {
	   $('#form-submit-no').fadeIn();
	});
	}
	
   //HIDE THE REST OF THE FORM AT BEGINING
	$(".customerDetails1").hide();
	$(".message").hide();
	
	//IF NO IS SELECTED SHOW THE SUBJECT AND THE MESSAGE FIELDS
	$("#customerNo").click(function() {
		
    if($(this).is(":checked")) {
		$("#subject").show();
        $(".message").show();
		$(".customerDetails1").hide();	
		
		
    } else {
        $(".message").hide();
	
    }
    });
	
	//IF YES IS SELECTED SHOW THE DOB AND REASONS
    $("#customerYes").click(function() {
		
    if($(this).is(":checked")) {
        $(".customerDetails1").show();
		$("#subject").hide();
		$(".message").hide();
		
		
    } else {
        $(".customerDetails1").hide();
		
    }
    });
	
	//TOGGLE THE CONTACT REASONS
   $(document).ready(function() {
    $('#contactReasons').bind('change', function() {
        var elements = $('div.container').children().hide(); // hide all the elements
        var value = $(this).val();

        if (value.length && value != "pensions") { // if somethings' selected
            elements.filter('.' + value).show(); // show the ones we want
        }
		
		else if (value.length && value == 'pensions') {
			$(".message").show();
		}
		
	    if (value.length && value != "other" ) { // if somethings' selected
            elements.filter('.' + value).show(); // show the ones we want
        }
		
		else if (value.length && value == 'other') {
			$(".message").show();
		}
		
    }).trigger('change');
   });
	
	//WHEN THE SUB-REASONS ARE SELECTED SHOW THE MESSAGE FIELD
    $(".sub").on("change", function() {
      $(".message").show();
    });	
	
    // ------------------ EXTRAS ------------------------- 
 
    //MAKE THE FIRST DATE OF BIRTH OPTION GREY 
	$(document).ready(function() {
	$("#customerContactYear").val("").prop('selected', true);
	});
	
   //PLACEHOLDER FOR IE, FIREFOX AND OPERA 

	  // ref: http://diveintohtml5.org/detect.html
	  function supports_input_placeholder()
	  {
		var i = document.createElement('input');
		return 'placeholder' in i;
	  }

	  if(!supports_input_placeholder()) {
		var fields = document.getElementsByTagName('INPUT');
		for(var i=0; i < fields.length; i++) {
		  if(fields[i].hasAttribute('placeholder')) {
			fields[i].defaultValue = fields[i].getAttribute('placeholder');
			fields[i].onfocus = function() { if(this.value == this.defaultValue) this.value = ''; }
			fields[i].onblur = function() { if(this.value == '') this.value = this.defaultValue; }
		  }
		}
	  }
	  
    
})(jQuery)
 
   
  
	 
  
   
   
 