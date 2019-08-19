
var isSubmitPressed = false;

$().ready(function()
{
	$("select").change(function() 
	{
		startValidateElement(this);
	});
	
	// validate input on blur
	$("input").blur(function() 
	{
		startValidateElement(this);
	});	
	
	// validate input on change
	$("input").change(function() 
	{
		startValidateElement(this);
	});	
	
	// validate input on click
	$("input").click(function() 
	{
		if( isCheckable(this) )
		{
			startValidateElement(this);
		}
	});
	
	$("textarea").keyup(function()
	{
		isTextareaMaxLength(this, $(this).metadata().maxlength);		
	});
	
	$("textarea").blur(function()
	{
		isTextareaMaxLength(this, $(this).metadata().maxlength);
		startValidateElement(this);
	});

});

function startValidateElement(element)
{
	validateElement(element);
}

function validateForm()
{
	log(' = validateForm');
	
	isSubmitPressed = true;
	
	firstErrorElement = null;
	
	$('.inputField').each(function()
	{
		if(!validateElement(this)){
			if(firstErrorElement == null){
				firstErrorElement = this;
			}
		}
	});	
	
	if(firstErrorElement == null){
		return true;
	}
	else{
		focusFirstInvalid(firstErrorElement);
		return false;
	}
}

function validateElement(element)
{
	if( isCheckable(element) )
	{
		element = getValidationElement(element);
	}
	
	if(element != null && !isFieldHidden(element))
	{
		log('\n = 1. validateElement. element.name = ' + element.name);		
		
		ruleNumber = $(element).metadata().validation;		
		mandatory = $(element).metadata().mandatory;
		
		log(' - ruleNumber = ' + ruleNumber);
		log(' - mandatory = ' + mandatory);
		
		if(ruleNumber == null && mandatory == null) 
		{
			return true;
		}
		
		if(mandatory == null || !mandatory) 
		{
			if(emptyField(element))
			{
				hideError(element);
				return true;
			}
		}
		
		// If empty and mandatory
		if(mandatory == true && element.value.length == 0)
		{
			if(isSubmitPressed)
			{
				displayErrorEmpty(element);
			}
			return false;
		}
		
		// if no rule, and mandatory, do rule 30
		if(ruleNumber == null)
		{
			if(mandatory == null || !mandatory)
			{
				hideError(element);
			}
			else
			{
				ruleNumber = 30;
			}
		}			
		
		// 1. Basic formating rule
		ruleFunction = eval("rule" + ruleNumber);		
		if(ruleFunction != null)
		{
			ruleReturn = ruleFunction(element);
			
			if(ruleReturn == true)
			{
				//log("   --- validate = true");
				hideError(element);
			}
			else
			{
				displayError(element, ruleReturn);
				return false;
			}
		}
		
		// 2. Min Max length
		if($(element).metadata().minLength != null)
		{log("   --- minLength = " + $(element).metadata().minLength);
			ruleReturn = isMinLength(element, $(element).metadata().minLength);
			
			if(ruleReturn == true)
			{
				//log("   --- validate = true");
				hideError(element);
			}
			else
			{
				displayError(element, ruleReturn);
				return false;
			}			
		}
		
		if($(element).metadata().maxLength != null)
		{log("   --- maxLength = " + $(element).metadata().maxLength);
			ruleReturn = isMaxLength(element, $(element).metadata().maxLength);
			
			if(ruleReturn == true)
			{
				//log("   --- validate = true");
				hideError(element);
			}
			else
			{
				displayError(element, ruleReturn);
				return false;
			}			
		}		
		
		// 3. More advanced validation
		if($(element).metadata().moreValidation != null)
		{
			moreValidationFunction = $(element).metadata().moreValidation;
			
			log(' - moreValidationFunction = ' + moreValidationFunction);
			
			if(moreValidationFunction != null)
			{
				moreValidationReturn = eval(moreValidationFunction);
				
				if(moreValidationReturn == true)
				{
					hideError(element);
				}
				else
				{
					displayError(element, moreValidationReturn);
					return false;
				}
			}
		}
	}
	
	return true;
}

function getValidationElement(element)
{
	if( $(element).metadata().validation != null )
	{
		return element;
	}
	
	elements = document.getElementsByName(element.name);
	
	for(gve = 0; gve < elements.length; gve++)
	{
		if( $(elements[gve]).metadata() != null )
		{
			return elements[gve];
		}
	}
	
	return null;
}

function emptyField(element)
{
	if(isCheckable(element))
	{
		elements = document.getElementsByName(element.name);
		
		for(rlt = 0; rlt < elements.length; rlt++)
		{
			if(elements[rlt].checked == true)
			{
				return false;
			}
		}
		return true;
	}
	else
	{
		return element.value == "";
	}
}

function focusFirstInvalid(element)
{
	try 
	{
		if(element.type == "hidden")
		{
			element = document.getElementById(element.id + "1");
			
			element.focus();
		}
		else
		{
			element.focus();
		}
	} 
	catch(e) 
	{
	}
}

function isTextareaMaxLength(element, maxlength)
{
	if(element.value.length != null && maxlength != null)
	{
		if (element.value.length > maxlength )
		{
			element.value = element.value.substring(0, maxlength);
		}
	}
}

function isMaxLength(element, maxLength)
{
	if(element.value.length != null && maxLength != null)
	{
		if (element.value.length > maxLength )
		{
			return "The maximum length for this field is " + maxLength;
		}
		else
		{
			return true;
		}
	}
}

function isMinLength(element, minLength)
{
	if(element.value.length != null && minLength != null)
	{
		if(element.value.length < minLength)
		{
			return ("The minimum length for this field is " + minLength);
		}
		else
		{
			return true;
		}
	}
}

function isCheckable(element) 
{
	return( (element.type == "radio") || (element.type == "checkbox") );
}

function isFieldHidden(element)
{
	fieldHidden = false;

	if($(element).parents(".hidden").length > 0)
	{
		fieldHidden = true;
	}
	
	//log("  --- isFieldHidden(" + element.id + ") = " + fieldHidden);
	return fieldHidden;
}



function displayError(element, message)
{
	//log(' === displayError. element.name = ' + element.name);
		
	if($('#error-' + element.name).length != 0 && message != null && message != '')
	{
		$('#error-' + element.name).html('<span class="inputErrorText" title="' + message + '" >'+message+'</span>');
	}
	else if ($('#error-' + element.name).length != 0)
	{
		$('#error-' + element.name).html('<span class="inputErrorText" title="Invalid Input" >Invalid Input</span>');
	}
}

function displayErrorEmpty(element, message)
{
	//log(' === displayError. element.name = ' + element.name);
		
	if($('#error-' + element.name).length != 0)
	{
		$('#error-' + element.name).html('<span>Required Field</span>');
	}
}

function hideError(element)
{
	//log(' === hideError. element.name = ' + element.name);
		
	if($('#error-' + element.name).length != 0)
	{
		$('#error-' + element.name).html('');
	}
}


function setHiddenDate(objId)
{
	// Get the day, month, and year fields
	// If all present
	// Update the hiddenfield
	
	log(" = setHiddenDate. objId = " + objId);
	
	tempDay = $('#' + objId + 'Day')[0].value;
	tempMonth = $('#' + objId + 'Month')[0].value;
	tempYear = $('#' + objId + 'Year')[0].value;
	
	if(tempDay.length == 1)
	{
		tempDay = '0' + tempDay;
	}
	if(tempMonth.length == 1)
	{
		tempMonth = '0' + tempMonth;
	}		
	
	if( (tempDay != '') && (tempMonth != '') && (tempYear.length == 4) )
	{
		log(' - valid date = ' + tempYear + tempMonth + tempDay);
		
		$('#' + objId)[0].value = tempYear + '-' + tempMonth + '-' + tempDay;	
		
		validateElement($('#' + objId)[0]);			
	}
	else
	{
		log(" ! invalid date = " + tempYear + '-' + tempMonth + '-' + tempDay);
		
		$('#' + objId)[0].value = '';
	}
}

function setHiddenTime(objId)
{
	tempHour = $('#'+objId+'Hour')[0].value;
	tempMin = $('#'+objId+'Min')[0].value;
	
	if(tempHour.length == 1)
	{
		tempHour = '0' + tempHour;
	}
	if(tempMin.length == 1)
	{
		tempMin = '0' + tempMin;
	}
	
	validateElement($('#' + objId)[0]);	
	
	$('#' + objId)[0].value = tempHour + ':' + tempMin;
}







function rule0(element)
{
	return true;
}

// name
function rule2(element)
{
	//log(' --- rule2');
	
	value = stripSpaces(element.value);
	
	if (!value.match(/[^\sA-Z-']/i)) 
	{
		return true;
	}
	
	return "This field can only contain a to z, A to Z, the characters - ' and the space character";
}

// numeric
function rule3(element)
{
	//log(' --- rule3');
	
	value = stripSpaces(element.value);
	
	if (!value.match(/[^0-9]/))
	{
		return true;
	}
	
	return "This field can only contain 0 to 9";
}

//alphanumeric
function rule4(element)
{
	//log(' --- rule4');
	
	value = stripSpaces(element.value);

	if (!value.match(/[^\sA-Z0-9]/i))
	{
		return true;
	}
	
	return "This field can only contain alphanumeric characters";
}


// address
function rule7(element)
{
	//log(' --- rule7');
	
	value = stripSpaces(element.value);
	
	if (!value.match(/[^\sA-Z0-9\.\,\&'-]/i)) 
	{
		return true;
	}
	
	return "This field can only contain a to z and A to Z and 0 to 9 and the characters , - ' . & and the space character";
}

// phone, etc
function rule25(element)
{
	//log(' --- rule25');

	value = stripSpaces(element.value);
	
	if (!value.match(/[^\sA-Z0-9\.\,\&\[\]\(\)\+\%\#\+'-\\\/_]/i)) 
	{
		return true;
	}
	
	return "This field can only contain a to z and A to Z and 0 to 9 and the characters , - ' . & [ ] ( ) + % # + \\ / _ and the space character";
}

// money
function rule14(element)
{
	//log(' --- rule14');
	
	value = stripSpaces(element.value);

	if ( (value.match(/\d{1,9}\.{1}\d{0,2}|\d{1,9}/)) && (value.match(/\d{1,9}\.{1}\d{0,2}|\d{1,9}/) == value) )
	{
		return true;
	}
	
	return "This field can only contain 9 significant digits and 2 after the decimal point";
}

// units
function rule41(element)
{
	//log(' --- rule41');
	
	value = stripSpaces(element.value);

	if ( (value.match(/\d{1,9}\.{1}\d{0,3}|\d{1,9}/)) && (value.match(/\d{1,9}\.{1}\d{0,3}|\d{1,9}/) == value) )
	{
		return true;
	}
	
	return "This field can only contain 9 significant digits and 3 after the decimal point";
}

// 
function rule19(element)
{
	//log(' --- rule19');
	
	value = stripSpaces(element.value);

	if (!value.match(/[^\sA-Z0-9\.\,\%'\-\&]/i)) 
	{
		return true;
	}
	
	return "This field can only contain a to z and A to Z and 0 to 9 and the characters , - ' % & . and the space character";
}

// select, radio, check
// More than 1 character, checked
function rule30(element)
{
	log(' --- rule30');

	if( isCheckable(element) )
	{
		// At least 1 of these elements should be checked
		
		elements = document.getElementsByName(element.name);
		
		for(rlt = 0; rlt < elements.length; rlt++)
		{
			if(elements[rlt].checked == true)
			{
				return true;
			}
		}
	}
	else
	{
		if(element.value.length > 0)
		{
			log('value - [' + element.value + ']')
			return true
		}
	}
	
	return "This field is required";
}

// Valid date
function rule40(element)
{
	log(' - rule40');
	
	// Only skip validation if a value is not entered and its not mandatory
	if(element.value.length == 0)
	{
		if($(element).metadata().mandatory != null)
		{
			if($(element).metadata().mandatory == false)
			{
				return true;
			}
		}
	}
	
	if(Date.parseExact(element.value, "yyyy-MM-dd") != null)
	{
		return true;
	}
	
	return "This is not a valid date";
}

// valid date and cannot be before today
function rule42(element)
{
	log(' --- rule42');
	
	rule40Result = rule40(element);
	if (rule40Result)
	{
		var myDate= Date.parseExact(element.value, "yyyy-MM-dd");
		
		var yesterday = new Date();
		yesterday.setTime(yesterday.getTime() - 24 * 3600 * 1000)

		if (myDate>yesterday)
		 {
		  return true;
		}
		else
		{
		  return "Date cannot be before today";
		}
	}
	else
	{
		return rule40Result;
	}
	
}

//time hour:min
function rule43(element)
{
	//log(' --- rule3');
	
	value = stripSpaces(element.value);
	
	if (!value.match(/[^0-9\:]/))
	{
		return true;
	}
	
	return "Please select a valid time";
}


function stripSpaces(value) 
{
	/* This function strips leading and trailing whitespaces from a string */
	
	var re = new RegExp();
	re = /\s+$|^\s+/g;
	
	return value.replace(re, "");
}

function initFieldUpdates(divId)
{
	log(' = initFieldUpdates');
	
	var fieldUpdateArray;
	
	if(divId != null)
	{
		fieldUpdateArray = $('#' + divId).find(".fieldUpdateElement");
	}
	else
	{
		fieldUpdateArray = $().find(".fieldUpdateElement");
	}
	
	fieldUpdateArray.each(function()
	{		
		if(!isFieldHidden(this))
		{
			if($(this).metadata().fieldUpdateFunction != null)
			{
				eval($(this).metadata().fieldUpdateFunction)
			}
		}
	});
}

function getSelected(id)
{
	return $("#" + id + " option:selected")[0].value;
}


function getSelectedRadioId(name)
{
	elements = document.getElementsByName(name);
	
	for(rlt = 0; rlt < elements.length; rlt++)
	{
		if(elements[rlt].checked == true)
		{
			return elements[rlt].id;
		}
	}
	
	return false;
}

