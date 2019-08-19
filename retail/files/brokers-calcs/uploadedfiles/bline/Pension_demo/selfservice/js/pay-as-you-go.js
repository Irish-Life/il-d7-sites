


function updateTotal(id, element)
{
	if (validateElement(element))
    {
		var x = $('#employeeInputPremium-' + id).val();
		var b = new Number(x) * 100;
		
		var y = $('#employerInputPremium-' + id).val();
		var c = new Number(y) * 100;
		
		var z = (b + c) / 100;		
		z = z.toFixed(2);
		
		log(x + b + y + c + z);
		
		$('#' + id + 'totalPremium').html('&euro;' + z);
		updateSchemeTotalPayment();
	}	
	else
	{
    	$('#' + id + 'totalPremium').html('');
    }
}

function updateSchemeTotalPayment()
{
	var totalPaymentValue = 0;
	
	$('.totalPayment').each(function()
	{	
		var total = new Number($(this).html().replace(/\,/g, '').replace(String.fromCharCode(8364), ''));
		var newTotal = new Number(total) * 100 ;
		
		if(!isNaN(newTotal))
        {
        	var totalPayment  = new Number(totalPaymentValue) * 100;
        	totalPayment += newTotal;
        	totalPaymentValue = totalPayment / 100;
        	
        	totalPaymentValue = totalPaymentValue.toFixed(2);
        }
	});
	
	if( !isNaN(totalPaymentValue) )
	{
		$('#schemeTotalPayment').html('&euro;'+ totalPaymentValue);
	}
	else 
	{
		$('#schemeTotalPayment').html('&nbsp;');
	}
}




function getSchemePlansPremiumDetails(planId)
{
	//log(' = getSchemePlansPremiumDetails'+ planId);
	
	$('#planMenuButtonPremium').addClass('on');
	parms = 'planId=' + planId;	
	doAjax(contextPath + '/schemePlanSummaryAjax.do', 'planPremiumDetails', parms, beforeDefault, successPlanEnquiry, errorDefault);		
}

function schemePaymentSearch()
{		
	//log(' = in schemePaymentSearch');
	if(validateForm())
	{
		$('#schemePayments').removeClass('hidden');
		parms = '&paymentMonthEffectiveDt=' + $('#paymentMonthEffectiveDt').val() ;
		doAjax(contextPath + '/getSchemePayments.do', 'schemePayments', parms, beforeSearch, successSearch, errorSearch);				
	}
}

function paySchemeCasesPaymentTypeChange()
{
	log('= paySchemeCasesPaymentTypeChange');
	
	// ie6 hack
	if(isIE6())
	{
		setTimeout(function()
		{
			paySchemeCasesPaymentTypeChange2(true);
		}, 10);
	}
	else
	{
		paySchemeCasesPaymentTypeChange2(true);
	}
}

function paySchemeCasesPaymentTypeChange2(doErrors)
{
	var paySchemeCasesPaymentTypeElement = $('#paySchemeCasesPaymentType');
	var psValue = paySchemeCasesPaymentTypeElement.val();
	
	switch(paySchemeCasesPaymentTypeElement.val())
	{
		case '':
			$('#schemePaymentDetailsD').hide();
			$('#schemePaymentDetailsV').hide();
			$('#schemePaymentDetailsL').hide();
			$('#schemePaymentDetailsM').hide();
			$('#schemePaymentDetailsC').hide();
			break;
			
		case 'D':
			$('#schemePaymentDetailsD').show();
			$('#schemePaymentDetailsV').hide();
			$('#schemePaymentDetailsL').hide();
			$('#schemePaymentDetailsM').hide();
			$('#schemePaymentDetailsC').hide();
			break;
			
		case 'V':
			$('#schemePaymentDetailsD').hide();
			$('#schemePaymentDetailsV').show();
			$('#schemePaymentDetailsL').hide();
			$('#schemePaymentDetailsM').hide();
			$('#schemePaymentDetailsC').hide();
			break;
			
		case 'L':
			$('#schemePaymentDetailsD').hide();
			$('#schemePaymentDetailsV').hide();
			$('#schemePaymentDetailsL').show();
			$('#schemePaymentDetailsM').hide();
			$('#schemePaymentDetailsC').hide();
			break;
			
		case 'M':
			$('#schemePaymentDetailsD').hide();
			$('#schemePaymentDetailsV').hide();
			$('#schemePaymentDetailsL').hide();
			$('#schemePaymentDetailsM').show();
			$('#schemePaymentDetailsC').hide();
			break;			
			
		case 'C':
			$('#schemePaymentDetailsD').hide();
			$('#schemePaymentDetailsV').hide();
			$('#schemePaymentDetailsL').hide();
			$('#schemePaymentDetailsM').hide();
			$('#schemePaymentDetailsC').show();
			break;
			
		default:		
	}
	
	if(doErrors)
	{
		switch(paySchemeCasesPaymentTypeElement.val())
		{
			case '':
				displayErrorEmpty(paySchemeCasesPaymentTypeElement[0]);
				break;
				
			case 'D':
				hideError(paySchemeCasesPaymentTypeElement[0]);
				break;
				
			case 'V':
				hideError(paySchemeCasesPaymentTypeElement[0]);
				break;
				
			case 'L':
				hideError(paySchemeCasesPaymentTypeElement[0]);
				break;
				
			case 'M':
				hideError(paySchemeCasesPaymentTypeElement[0]);
				break;			
				
			case 'C':
				hideError(paySchemeCasesPaymentTypeElement[0]);
				break;
				
			default:		
		}
	}
}



function paySchemeCasesBefore(divId)
{
	block();
	blockLoading('#mainMenuContentPaySchemeCases');
}



function paySchemeCasesSuccess(divId, response, XMLHttpRequest)
{
	//log(" = paySchemeCasesSuccess");
	
	$('#mainMenuContentPaySchemeCases').html(response);
	
	
	if($("#schemePaymentsToConfirmTable").length != 0)
	{
		$("#schemePaymentsToConfirmTable").tablesorter(
		{
			sortList: [[2,0],[1,0]]
		});
	}
	
	if($("#schemePaymentsToApplyTable").length != 0)
	{
		$("#schemePaymentsToApplyTable").tablesorter(
		{
			sortList: [[2,0]],
			headers: { 4: {sorter: false}, 6: {sorter: false} }
		});
	}
	
	if( $("#pay-scheme-cases2").length != 0 )
	{
		//log('   - pay-scheme-cases2');
		
		$("input, textarea").blur(function() { validateElement(this); });
	    $("textarea").keyup(function() { validateElement(this); return true; });
	    $("input:radio, input:checkbox").click(function() { validateElement(this); });
	    
	    paySchemeCasesPaymentTypeChange2(false);
		
		$('.inputError2').each(function()
		{
			if( $(this).text().replace(/ /g,'').length > 0 )
			{
				$(this).css('display', 'block');
			}
		});
				
		enterFunction = paySchemeCasesConfirmPaymentDetails;
	}	
	
	unblock();
	$('#mainMenuContentPaySchemeCases').unblock();
}

function paySchemeCasesError(divId)
{
	log(' = paySchemeCasesError');
	
	$('#mainMenuContentPaySchemeCases').html(ajaxErrorMessage);
	
	unblock();
	$('#mainMenuContentPaySchemeCases').unblock();
}




function paySchemeCasesEnterPaymentDetails()
{
	//log("= in paySchemeCasesEnterPaymentDetails. ");
	
	
	// TODO: validation
	
	var parameters = $('#pay-scheme-cases1').serializeAnything();
	doAjax(contextPath + '/paySchemeCasesEnterPaymentDetails.do', 'PaySchemeCases', parameters, paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);



}

function paySchemeCasesBackToPaymentDetails()
{
	doAjax(contextPath + '/paySchemeCasesBackToPaymentDetails.do', 'PaySchemeCases', null, paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
}

function paySchemeCasesBackToPayments()
{
 	log("= paySchemeCasesBackToPayments. ");
	doAjax(contextPath + '/paySchemeCasesBackToPayments.do', 'PaySchemeCases', null, paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
}

/*ssssssssss
function paySchemeCasesReset()
{
	//log("= paySchemeCasesReset");
	doAjax(contextPath + '/paySchemeCasesReset.do', 'PaySchemeCases', '', paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
}*/

function paySchemeCasesEnterPayments()
{	
	doAjax(contextPath + '/paySchemeCasesEnterPayments.do', 'PaySchemeCases', '', paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
}

function paySchemeCasesConfirmPaymentDetails()
{
	//log(" = paySchemeCasesConfirmPaymentDetails" );
		
	if (validateForm('#mainMenuContentPaySchemeCases'))
	{
		var parameters = $('#mainMenuContentPaySchemeCases').serializeAnything2();			
		doAjax(contextPath + '/paySchemeCasesConfirmPaymentDetails.do', 'PaySchemeCases', parameters, paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
	}
}

function paySchemeCasesSubmitPaymentDetails()
{	
	doAjax(contextPath + '/paySchemeCasesSubmitPaymentDetails.do', 'PaySchemeCases', '', paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
}

function paySchemeCasesSave()
{
	if (validateForm('#schemePaymentsToApplyTable'))
	{
		var parameters = $('#pay-scheme-cases1').serializeAnything();
		doAjax(contextPath + '/paySchemeCasesSave.do', 'PaySchemeCases', parameters, paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
	}
}

function paySchemeCasesRetrieve()
{
	//log("= paySchemeCasesRetrieve");
	doAjax(contextPath + '/paySchemeCasesEnterPayments.do', 'PaySchemeCases', '', paySchemeCasesBefore, paySchemeCasesSuccess, paySchemeCasesError);
}



function schemePaymentInputEdit(cardType)
{
	log(' = schemePaymentInputEdit');
	
	$('#schemePaymentInput' + cardType + ' .schemePaymentInputNoEdit').addClass('hidden');	
	$('#schemePaymentInput' + cardType + ' .schemePaymentInputEdit').removeClass('hidden');	
	
	$('#cardNumber' + cardType + 'Input').val('true');
	
}

function schemePaymentInputCancelEdit(cardType)
{
	log(' = schemePaymentInputCancelEdit');
	
	$('#schemePaymentInput' + cardType + ' .schemePaymentInputEdit').addClass('hidden');	
	$('#schemePaymentInput' + cardType + ' .schemePaymentInputNoEdit').removeClass('hidden');	
	
	$('#cardNumber' + cardType + 'Input').val('false');
}





function isIE6() {
    return ($.browser.msie && $.browser.version == "6.0");
}


