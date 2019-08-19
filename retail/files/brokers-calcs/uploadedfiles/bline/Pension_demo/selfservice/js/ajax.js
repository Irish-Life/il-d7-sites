//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//	
// doAjax - ajax jQuery javascript library function
//
// Each ajax function can have a before, success and error function
// If any of these functions are not send to doAjax, then the default function is used
//
// 
// The main functions to use are:
//		mainMenuChange
//		planMenuChange 
//
// To add a wide section, see planMenuChangeBefore(divId)
// 

var ajaxManager;
var ajaxWaitMessage = '<img class="waitImage" src="/selfservice/images/wait.gif"/><div class="waitText">Loading. Please wait...</div>';
var ajaxErrorMessage = '<div class="contentError"><p>An error has occurred preventing your request from being processed. If this error keeps occurring please report the problem to your servicing team</p></div>';

var ajaxWaitDocumentsMessage = '<img class="waitImage" src="/selfservice/images/wait.gif"/><div class="waitText">Searching for new documents...</div>';


function doAjax(url, divId, parms, beforeFunction, successFunction, errorFunction, abortFunction)
{
	ajaxManager.abort();
	
	ajaxManager.add(
	{
		type: "POST",
		url: url,
		async: true,
		data: parms,
		beforeSend: function(){beforeAjax(divId, beforeFunction);},
		success: function(response){successAjax(divId, response, successFunction);},
		error: function(){errorAjax(divId, errorFunction);},
		abort: function(){abortAjax(divId, abortFunction)},
		timeout: 300000 // 5 minute timeout
	});
}

function doSyncAjax(url, divId, parms, beforeFunction, successFunction, errorFunction, abortFunction)
{
	ajaxManager.abort();
	
	ajaxManager.add(
	{
		type: "POST",
		url: url,
		async: false,
		data: parms,
		beforeSend: function(){beforeAjax(divId, beforeFunction);},
		success: function(response){successAjax(divId, response, successFunction);},
		error: function(){errorAjax(divId, errorFunction);},
		abort: function(){abortAjax(divId, abortFunction)},
		timeout: 300000 // 5 minute timeout
	});
}

function beforeAjax(divId, beforeFunction)
{
	if(beforeFunction != null){ beforeFunction(divId); }
	else{ beforeDefault(divId); }
}

function beforeDefault(divId)
{
	if($('#' + divId + 'Response').length == 0)
	{
		// TODO: Put loading icon at bottom of page
		
	}
	else
	{		
		$('#' + divId + 'Response').html(ajaxWaitMessage);				
	}
	
	block();
}

function beforeReminders(divId)
{
	if($('#' + divId + 'Response').length == 0)
	{
		// TODO: Put loading icon at bottom of page
		
	}
	else
	{		
		$('#' + divId + 'Response').html(ajaxWaitMessage);				
	}
}

function successAjax(divId, response, successFunction)
{
	if(successFunction != null){ successFunction(divId, response); }	
	else{ successDefault(divId, response); }
}

function successDefault(divId, response)
{
	$('#' + divId + 'Response').html(response);
	unblock();
}

function errorAjax(divId, errorFunction)
{
	if(errorFunction != null){errorFunction(divId); }
	else{errorDefault(divId); }
}

function errorDefault(divId, response)
{
	if($('#' + divId + 'Response').length == 0)
	{
		if(response == null)
		{
			alert('An error has occured during your request.');	
		}
		else
		{
			$('#tempDiv').html(response);			
			if($('#tempDiv .contentError p').length != 0)
			{
				alert($('#tempDiv .contentError p').text());				
			}
			else
			{
				alert('An error has occured during your request.');
			}
			$('#tempDiv').html('');
		}
	}
	else
	{		
		$('#' + divId + 'Response').html(ajaxErrorMessage);		
	}
	
	unblock();
}

function abortAjax(divId, abortFunction)
{
	if(abortFunction != null){abortFunction(divId); }
	else{abortDefault(divId);}
}

function abortDefault(divId)
{
	unblock();
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Main menu ajax
//

function mainMenuChange(id)
{
	log(' = mainMenuChange. id = ' + id);
	
	$('#mainMenuButton' + mainMenuItem).removeClass('on');
	$('#mainMenuContent' + mainMenuItem).addClass('hidden');
	
	mainMenuItem = id;
	
	$('#mainMenuButton' + mainMenuItem).addClass('on');
	$('#mainMenuContent' + mainMenuItem).removeClass('hidden');
	
	
	mainMenuChangeInit();
	
	/*
	if(mainMenuItem == 'Documents' && !isDocumentSearchGot)
	{
		doAjax(contextPath + '/agentDocuments.do', 'Documents', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);		
	}
	else if(mainMenuItem == 'Pipeline' && !isPipelineGot)
	{
		if(isEposUser == 'true')
		{
			doAjax(contextPath + '/getPipeline.do', 'Pipeline', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
		}
		else
		{
			mainMenuChangeInit();
		}
	}
	else if(mainMenuItem == 'Persistency')
	{
		$('#mainMenuContentWrapper').addClass('contentWrapperWide');
		
		if(isEposUser == 'true')
		{
			doAjax(contextPath + '/persistency.do', 'Persistency', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
		}
		else
		{
			mainMenuChangeInit();
		}
	}
	else if(mainMenuItem == 'DataDownload')
	{
		$('#mainMenuContentWrapper').addClass('contentWrapperWide');
		
		if(isEposUser == 'true')
		{
			doAjax(contextPath + '/dataDownload.do', 'DataDownload', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
		}
		else
		{
			mainMenuChangeInit();
		}
	}	
	else if (mainMenuItem == 'Commission')
	{
		$('#mainMenuContentWrapper').addClass('contentWrapperWide');
		if(isEposUser == 'true')
		{
			doAjax(contextPath + '/commissionStatements.do', 'Commission', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
		}
		else
		{
			mainMenuChangeInit();
		}
		
	}
	else if (mainMenuItem == 'OnlineTrading')
	{
		doAjax(contextPath + '/onlineTrading.do', 'OnlineTrading', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);	
	}
	else if (mainMenuItem == 'Reconciliations')
	{
		doAjax(contextPath + '/Reconciliations.do', 'Reconciliations', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
	}
	else if (mainMenuItem == 'SchemePlans')
	{
		doAjax(contextPath + '/SchemePlans.do', 'SchemePlans', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
	}
	else if (mainMenuItem == 'Appointments')
	{
		doAjax(contextPath + '/Appointments.do', 'Appointments', '', mainMenuChangeBefore, mainMenuChangeSuccess, mainMenuChangeError);
	}
	else
	{
		mainMenuChangeInit();
	}*/
}

function mainMenuChangeInit()
{
	log(' = mainMenuChangeInit. mainMenuItem = ' + mainMenuItem);
	
	closeAllToolTips();
	
	if(mainMenuItem == 'PlanEnquiry')
	{		
		//displayToolTip('#tooltip1', 'This page now shows the employee scheme details.<br />It\'s the same as Cloas Browser.', 'bottomLeft');
	}
	else if(mainMenuItem == 'ViewSchemeCases')
	{
		displayToolTip('#tooltip2', 'These tables are sortable. <br />You can click the headings to sort.', 'bottomLeft');
		
		displayToolTip('#tooltip3', 'This column has been changed to PPSN numbers instead of plan numbers. <br />Click this link to be shown employee premium details', 'leftMiddle');
		
		//displayToolTip('#tooltip5', 'These checkboxes are used to for premium skips', 'leftMiddle');
	
		
	}
	else if(mainMenuItem == 'PaySchemeCases')
	{
		if(currentPaySchemeNumber == '0')
		{
			displayToolTip('#tooltip4', 'This is the process navigation bar.<br />You can use this like a back button.', 'bottomLeft');
		
			displayToolTip('#resumeButton', 'This button will only appear if you have a saved case', 'leftMiddle');
		}
		
	}
	

	
	
	
	
	/*if(mainMenuItem == 'PlanEnquiry')
	{
		$('#planId').focus();	
		enterFunction = planEnquirySearch;
	}
	else if(mainMenuItem == 'NameSearch')
	{
		$('#firstName').focus();
		enterFunction = nameSearch;		
	}
	else if(mainMenuItem == 'Pipeline')
	{
		$('#eposUserId').focus();
		enterFunction = pipelineSearch;
		isPipelineGot = true;
	}
	else if(mainMenuItem == 'Documents')
	{
		initFieldUpdates('mainMenuContentDocuments');
		
		$('#agentId').focus();
		enterFunction = documentSearch;
		isDocumentSearchGot = true;		
	}
	else if(mainMenuItem == 'FundPrices')
	{
		$('#fundSearchStr').focus();
		enterFunction = fundSearch;
	}
	else if(mainMenuItem == 'Persistency')
	{		
		$('#persistSellerID').focus();
		enterFunction = persistSearch;
		if($("#missedPaymentsTable").length != 0)
		{
			$("#missedPaymentsTable").tablesorter(
			{
				sortList: [[0,0]]
			});
		}		
		if($("#maturitiesTable").length != 0)
		{
			$("#maturitiesTable").tablesorter(
			{
				sortList: [[0,0]]
			});
		}		
		if($("#businessReplacementTable").length != 0)
		{
			$("#businessReplacementTable").tablesorter(
			{
				sortList: [[0,0]]
			});
		}		
	}
	else if (mainMenuItem == 'Commission')
	{		
		$('#masterSellerId').focus();
		enterFunction = commissionStatementsSearch;
	}
	else if (mainMenuItem == 'DataDownload')
	{		
		$('#dataDownloadSellerId').focus();
		enterFunction = dataDownloadSearch;
	}
	
	if(mainMenuItem != 'Persistency' && mainMenuItem != 'DataDownload' && mainMenuItem != 'Commission')
	{
		$('#mainMenuContentWrapper').removeClass('contentWrapperWide');		
	}
	
	highLightTableInit('mainMenuContent' + mainMenuItem);
	isSubmitPressed = false;*/
}

function mainMenuChangeBefore(divId)
{
	log(' = mainMenuChangeBefore');
	
	$('#mainMenuContent' + divId).html(ajaxWaitMessage);
	block();
}

function mainMenuChangeSuccess(divId, response)
{
	log(' = mainMenuChangeSuccess');
	
	// If the response is an error page - goto error page
	if(!isErrorPage(response))
	{
		$('#mainMenuContent' + divId).html(response);
		mainMenuChangeInit();
		unblock();		
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
}

function mainMenuChangeError(divId)
{
	log(' = mainMenuChangeError');
	
	$('#mainMenuContent' + divId).html(ajaxErrorMessage);
	
	unblock();
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Plan menu ajax
//

function planMenuChange(id, url, param)
{
	log(' = planMenuChange. id = ' + id);
		
	$('#planMenuButton' + planMenuItem).removeClass('on');
	$('#planMenuContent' + planMenuItem).addClass('hidden');
	
	planMenuItem = id;
	
	$('#planMenuButton' + planMenuItem).addClass('on');
	$('#planMenuContent' + planMenuItem).removeClass('hidden');
	
	
	closeAllToolTips();
	
	
	/*$('#planMenuButton' + planMenuItem).removeClass('on');	
	planMenuItem = id;
	
	$('#planMenuButton' + planMenuItem).addClass('on');
	
	// 'Summary' requires the left menu, and associated plans drop down to be updated too
	if(id == 'Summary')
	{
		parms = 'planId=' + param;
		doAjax(url, 'planMenuContent', parms, planMenuChangeBefore, planMenuChangeSummarySuccess, planMenuChangeError);		
	}
	else
	{
		doAjax(url, 'planMenuContent', '', planMenuChangeBefore, planMenuChangeSuccess, planMenuChangeError);	
	}*/
	
	return false;
}


function planMenuChangeBefore(divId)
{
	log(' = planMenuChangeBefore');
	
	if(planMenuItem == "ContactHistory" || planMenuItem == "Funds")
	{
		// For sections with Wide content
		//  add the section name to the if condition above
		//  for example: if(planMenuItem == "ContactHistory" || planMenuItem == "<new section name>")
		$('#planMenuContentWrapper').addClass('contentWrapperWide');
	}
	else
	{
		$('#planMenuContentWrapper').removeClass('contentWrapperWide');
	}
	
	$('#planMenuContent').html(ajaxWaitMessage);
	block();
}


function planMenuChangeSuccess(divId, response)
{
	log(' = planMenuChangeSuccess');
	
	if(!isErrorPage(response))
	{
		$('#planMenuContent').html(response);

		planMenuChangeInit();
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
}

function planMenuChangeError(divId)
{
	log(' = planMenuChangeError');
	
	$('#planMenuContent').html(ajaxErrorMessage);	
	unblock();
}


function planMenuChangeSummarySuccess(divId, response)
{
	log(' = planMenuChangeSummarySuccess');
	
	if(!isErrorPage(response))
	{
		if($(response).filter('.ajaxResponse').length != 0)	
		{			
			$('#headerTabContentPlanEnquiry').html($(response).filter('.ajaxResponse').html());				
			planMenuChangeInit();
		}
		else
		{
			$('#planMenuContent').html(response);
			unblock();
		}	
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
}

function planMenuChangeInit()
{
	log(' = planMenuChangeInit');
	
	if(planMenuItem == "Summary")
	{
		initaliseDropMenu();
	}
	else if(planMenuItem == "Funds")
	{
		if($("#fundDetailsTable").length != 0)
		{
			$("#fundDetailsTable").tablesorter(
			{
				sortList: [[0,0]]
			});
		}
	}	
	else if(planMenuItem == "ProjectedValue")
	{
		currentProjectionItem = 'projectionTypeYears';
	}
	else if (planMenuItem == "InvestmentHistory")
	{
		initialiseInvestmentHistoryAccordian();
	}
	
	highLightTableInit('planMenuContent');
	unblock();
	isSubmitPressed = false;
}

function initaliseDropMenu()
{
	$("#menuButton").click(function()
	{
		if(openMenuItem != null && openMenuItem == this)
		{
			closeMenu(openMenuItem);
		}
		else if(openMenuItem != null && openMenuItem != this)
		{
			closeMenu(openMenuItem);
			openMenu(this);
		}
		else
		{
			openMenu(this);
		}
	});
	
	$(".menuDrop").click(function() 
	{
		closeItem = false;
	});
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//	Plan Search
//
function planEnquirySearch()
{
	log(' = planEnquirySearch');
	
	if(validateElement(document.getElementById('planId')))
	{
		parms = 'planId=' + $('#planId').val();		
		doAjax(contextPath + '/planSummaryAjax.do', 'planEnquirySearch', parms, beforeDefault, successPlanEnquiry, errorDefault);		
	}
}

function successPlanEnquiry(divId, response)
{
	log(' = successPlanEnquiry');
	
	if(!isErrorPage(response))
	{
		if($(response).filter('.ajaxResponse').length != 0)	
		{
			$('#headerTabContentPlanEnquiry').html($(response).filter('.ajaxResponse').html());			
			
			initalisePlanEnquiry(divId);
		}
		else
		{
			if($('#' + divId + 'Response').length == 0){
				errorDefault(divId, response);
			} else {
				$('#' + divId + 'Response').html(response); 
			}			
		}
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
	unblock();
}

function initalisePlanEnquiry(divId)
{
	$('#headerTabPlanEnquiry').removeClass('hidden');
	headerTabChange('PlanEnquiry');
	planMenuItem = 'Summary';
	planMenuChangeInit();
	initalisePlanMenu();
	scroll(0,0);
	if($('#' + divId + 'Response').length != 0){$('#' + divId + 'Response').html(''); }
	
	if(divId == 'planEnquiryPipeline')
	{
		planMenuChange('Requirements', contextPath + '/requirements.do');
	}
}

function initalisePlanMenu()
{
	$('.plansTable tr').mouseover(function()
	{
		$(this).children().addClass('underline');
	});
	$('.plansTable tr').mouseout(function()
	{
		$(this).children().removeClass('underline');
	});
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//	Associated Plan Search
//
function persistencySearchPlan(planId, row, divId)
{
	stickRow(row, divId);
	parms = 'planId=' + planId;
	doAjax(contextPath + '/planSummaryAjax.do', 'planEnquiryPersistency', parms, beforeDefault, successPlanEnquiry, errorDefault);
}

function planEnquiryPipeline(planId, row)
{
	stickRow(row, '#pipelineResultsTable');	
	parms = 'planId=' + planId;	
	doAjax(contextPath + '/planSummaryAjax.do', 'planEnquiryPipeline', parms, beforeDefault, successPlanEnquiry, errorDefault);
}

function associatedPlanEnquiryNamesearch(planId, row)
{
	stickRow(row, '#nameSearchTable');
	parms = 'planId=' + planId;	
	doAjax(contextPath + '/planSummaryAjax.do', '', parms, beforeDefault, successPlanEnquiry, errorDefault);
}

function associatedPlanEnquirySearch(planId)
{
	parms = 'planId=' + planId;
	doAjax(contextPath + '/planSummaryAjax.do', '', parms, beforeDefault, successPlanEnquiry, errorDefault);	
}

function planSummaryFromContent(planId, row, table)
{
	if(row != null){stickRow(row, table);}	
	parms = 'planId=' + planId;
	doAjax(contextPath + '/planSummaryAjax.do', '', parms, beforeDefault, successPlanEnquiry, errorDefault);	
}

function fundsAvailableSwitching()
{
	doAjax(contextPath + '/fundsAvailableSwitching.do', 'fundsAvailableSwitching', '', beforeSearch, successSearch, errorSearch);
}


function beforeDocumentsAvailable(divId)
{
	log(' = beforeDocumentsAvailable');
	
	$('#documentsAvailableResponse').html(ajaxWaitDocumentsMessage);
}

function successDocumentsAvailable(divId, response)
{
	log(' = successDocumentsAvailable');
	
	if(!isErrorPage(response))
	{
		$('#documentsAvailableResponse').html(response);
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
}

function errorDocumentsAvailable(divId)
{
	log(' = errorDocumentsAvailable');
	
	$('#documentsAvailableResponse').html('');
}

function abortDocumentsAvailable(divId)
{
	log(' = abortDocumentsAvailable');
	
	$('#documentsAvailableResponse').html('');
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//	
// Each ajax action can have a do, before and success function
//
function beforeSearch(divId)
{
	log(' = beforeSearch. divId = ' + divId);
	
	$('#' + divId + 'Response').removeClass('hidden');	
	$('#' + divId + 'Response').html(ajaxWaitMessage);	
	$('#' + divId + 'Pagination').html('');
	block();
}

function successSearch(divId, response)
{
	log(' = successSearch');
	
	// If the response is an error page - goto error.html
	if(!isErrorPage(response))
	{
		// If this doesn't contain an expected ajaxResponse div - insert error response into page
		if($(response).filter('.ajaxResponse').length != 0)
		{
			$('#' + divId + 'Response').html($(response).filter('.ajaxResponse').html());
			
			if($(response).filter('.pagination').length != 0)
			{
				$('#' + divId + 'Pagination').removeClass('hidden');
				$('#' + divId + 'Pagination').html($(response).filter('.pagination').html());
			}
		}
		else
		{
			$('#' + divId + 'Response').html(response);
		}
		
		searchInit(divId);
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
	unblock();
}

function errorSearch(divId)
{
	log(' = errorSearch');
	
	$('#' + divId + 'Response').html(ajaxErrorMessage);	
	
	unblock();
}

function searchInit(divId)
{
	log(' = searchInit. divId = ' + divId);
	
	if(divId == 'fundsAvailableSwitching')
	{
		if($("#fundsAvailableSwitchingTable").length != 0)
		{
			$("#fundsAvailableSwitchingTable").tablesorter(
			{
				sortList: [[0,0]]
			});
		}
	}
	else if (divId == 'persistSearch')
	{
		if($("#missedPaymentsTable").length != 0)
		{
			$("#missedPaymentsTable").tablesorter(
			{
				sortList: [[0,0]]
			});
		}
	}
	else if (divId == 'persistencyContacts')
	{

		if($("#persistencyContactsTable").length != 0)
		{
			$("#persistencyContactsTable").tablesorter(
			{
				sortList: [[3,1]]
			});
		}
	}
	else if(divId == 'fundNamePerformance')
	{
		scroll(0,$("#fundNamePerformanceResponse").position().top)
	}
	else if(divId == 'fundGrowthRate')
	{
		scroll(0,$("#fundGrowthRateResponse").position().top)
	}
	
	highLightTableInit(divId + 'Results');
}

function documentSearch()
{		
	// 1. Validate fields
	if(validateForm())
	{
		$('#documentSearchResults').removeClass('hidden');
		
		// 2. Ajax request			
		parms = 'startDate=' + $('#startDate').val() +
				'&endDate=' + $('#endDate').val() +
				'&documentType=' + $('#documentType').val() +
				'&agentId=' + $('#agentId').val();
				
		doAjax(contextPath + '/searchAgentDocuments.do', 'documentsSearch', parms, beforeSearch, successSearch, errorSearch);						
	}
}

function nameSearch()
{
	setHiddenDate('nameSearchDate'); 
	
	if(validateForm())
	{
		$('#nameSearchAssociationsResponse').addClass('hidden');
		$('#nameSearchAssociationsResponse').html('');
		
		parms = 'firstName=' + $('#firstName').val()
			  + '&secondName=' + $('#secondName').val()
			  + '&date=' + $('#nameSearchDate').val()
		
		doAjax(contextPath + '/nameSearch.do', 'nameSearch', parms, beforeSearch, successSearch, errorSearch);
	}
}

function pipelineSearch()
{
	if(validateForm())
	{
		parms = 'eposUserId=' + $('#eposUserId').val();		
		doAjax(contextPath + '/searchPipeline.do', 'pipelineSearch', parms, beforeSearch, successSearch, errorSearch);
	}
}

function commissionStatementsSearch()
{
	if(validateForm())
	{
		parms = 'masterSellerId=' + $('#masterSellerId').val();		
		doAjax(contextPath + '/commissionStatements.do', 'commissionStatementsSearch', parms, beforeSearch, successSearch, errorSearch);
	}
}

function persistSearch()
{
	if(validateForm())
	{
		parms = 'sellerId=' + $('#persistSellerId').val();		
		doAjax(contextPath + '/persistency.do', 'persistSearch', parms, beforeSearch, successSearch, errorSearch);
		
		
	}
}

function sendAppointmentReminder(type)
{
	$('#customerMessage').html('');
	$('#agentMessage').html('');
	$('#confirmAppointmentReminder').addClass('hidden');
	if (validateForm())
	{
		if ($('#'+type+'-customer').val() != '')
		{
			var customerMessageTxt = '<h3>Message to customer - '+ $('#'+type+'-customer').val() + '</h3>';
			if (type == 'D' || type == 'O')
			{
				customerMessageTxt = customerMessageTxt + 
				'<p>Meeting confirmed with your Financial Adviser, ' +
				$('#'+type+'-adviser option:selected').text(); 
			}
			else
			{
				customerMessageTxt = customerMessageTxt +
					'<p>Meeting confirmed with your Financial Adviser in ' +
					$('#'+type+'-branch option:selected').text();			
			}
			customerMessageTxt = customerMessageTxt + ', on ' +
			$('#'+type+'-appointmentDateDay').val() + '/' +
			$('#'+type+'-appointmentDateMonth').val() + '/' +
			$('#'+type+'-appointmentDateYear').val() + ' ' +
			$('#'+type+'-appointmentTime').val() + 
			' for your Financial Review</p> ';
			$('#customerMessage').html(customerMessageTxt);
		}	
		
		if (type == 'D' || type == 'U')
		{
			var agentMessageTxt =
				'<h3>Message to agent - ' + $('#'+type+'-adviser option:selected').text() + '</h3>'+
				'<p>Please check your diary for a new appointment from the Contact Centre on ' +
				$('#'+type+'-appointmentDateDay').val() + '/' +
				$('#'+type+'-appointmentDateMonth').val() + '/' +
				$('#'+type+'-appointmentDateYear').val() + ' ' + 
				$('#'+type+'-appointmentTime').val() + 
				'</p>';
			$('#agentMessage').html(agentMessageTxt);
		}
		$('#confirmAppointmentReminder').removeClass('hidden');
		
		$('#confirmMessageToBeSent').html('<input type="button" value="Confirm this appointment reminder"' + 
			'onclick="confirmAppointmentReminder(\''+ type + '\');" />');

	}
}


function confirmAppointmentReminder(type)
{
	log(' -- sending appointment');
	if (validateForm())
	{		
		parms='adviserType='+ type+
		'&adviserId='+ $('#'+type+'-adviser').val()+
		'&branchId='+ $('#'+type+'-branch').val()+
		'&appointmentDate='+ $('#'+type+'-appointmentDate').val() +
		'&appointmentTime='+ $('#'+type+'-appointmentTime').val()+
		'&customerPhone='+$('#'+type+'-customer').val();
		
		log(' --- parms ' + parms);
		
		doAjax(contextPath + '/sendAppointmentReminder.do', 'appointments', parms, beforeReminders, successReminders, errorDefault);
		
	}
	
}

function successReminders(divId, response)
{
	successDefault(divId, response);
	$('#confirmAppointmentReminder').addClass('hidden');
	$('#D-adviser').val('');
	$('#D-branch').val('');
	$('#D-customer').val('');
	
	$('#P-adviser').val('');
	$('#P-branch').val('');
	$('#P-customer').val('');
	
	$('#E-adviser').val('');
	$('#E-branch').val('');
	$('#E-customer').val('');
	
	$('#U-adviser').val('');
	$('#U-branch').val('');
	$('#U-customer').val('');
	
	$('#H-adviser').val('');
	$('#H-branch').val('');
	$('#H-customer').val('');
	
	$('#O-adviser').val('');
	$('#O-branch').val('');
	$('#O-customer').val('');

}

function retrieveMessages()
{
	log(' -- retrieving appointment reminders');
	if (validateForm())
	{				
		parms='userId='+ $('#reportUserId').val()+
		'&fromDate='+ $('#reportFromDate').val() +
		'&toDate='+ $('#reportToDate').val()+
		'&phoneNumber='+$('#reportPhoneNumber').val();
		
		log(' --- parms ' + parms);
		
		doAjax(contextPath + '/retrieveReminders.do', 'appointments', parms, beforeDefault, successDefault, errorDefault);
	}
	
}

function retrieveAppointmentAgents()
{
	$('#newAppointmentAgent').addClass('hidden');
	if (validateForm())
	{
		parms='agentType='+$('#appointmentAgentType').val();
		doAjax(contextPath + '/retrieveAppointmentAgents.do', 'appointments', parms, beforeDefault, successDefault, errorDefault );
	}
	
}

function updateAgent(id, mode)
{
	if (validateForm())
	{
		parms='agentType=' + $('#updateAgentType'+id).val() +
			'&agentId=' + id +
			'&name=' + $('#updateAgentDescription'+id).val() +
			'&phoneNumber=' + $('#updateAgentPhoneNumber'+id).val() +
			'&updateMode='+mode;
		doAjax(contextPath + '/updateAppointmentAgent.do','appointments', parms, beforeDefault, successAgent, errorDefault );
	}
}

function successAgent(divId, response)
{
	$('#newAppointmentAgent').addClass('hidden');
	successDefault(divId, response);
}


function dataDownloadSearch()
{
	if(validateForm())
	{
		parms = 'sellerId=' + $('#dataDownloadSellerId').val();		
		doAjax(contextPath + '/dataDownload.do', 'dataDownloadSearch', parms, beforeSearch, successSearch, errorSearch);
		
		
	}
	
	
}


function viewChart(agent, chart, divId)
{
	parms = 'agent='+agent+'&chart='+chart;
	doAjax(contextPath + '/viewChart.do', divId, 
			parms);
}

function requestPinReissue(divId)
{
	doAjax(contextPath + '/requestPINReissue.do', divId); 
}

function fundSearch()
{
	if(validateElement($('#fundSearchStr')[0]))
	{
		parms = 'fundSearchStr=' + $('#fundSearchStr').val();		
		//remove the fund performance results from a previous search
		$('#fundNamePerformanceResponse').addClass('hidden');
		$('#fundNamePerformanceResponse').html('');
		doAjax(contextPath + '/searchFunds.do', 'fundNameSearch', parms, beforeSearch, successSearch, errorSearch);
	}
}


function searchFundGrowthRate()
{
	log(' = searchFundGrowthRate. startDate = ' + $('#startPriceDate'));
	log(' = searchFundGrowthRate. endDate = ' + $('#endPriceDate'));
	log(' = searchFundGrowthRate. fundSearchId = ' + $('#fundSearchId'));
	// 1. Validate fields
	if(validateForm())
	{
		// 2. Ajax request			
		parms = 'startDate=' + $('#startPriceDate').val() +
				'&endDate=' + $('#endPriceDate').val() +
				'&fundSearchId=' + $('#fundSearchId').val();
				
		doAjax(contextPath + '/searchFundGrowthRate.do', 'fundGrowthRate', parms, beforeSearch, successSearch, errorSearch);						
	}	

}

function projectionValueCalculate(url, divId) 
{
	var params = '';
	
	if(currentProjectionItem == 'projectionTypeYears')
	{
		parms='projY1=' + $('#projY1').val()
			+ '&projY2=' + $('#projY2').val()
			+ '&projY3=' + $('#projY3').val();
		
		doAjax(url, divId, parms, beforeSearch, successSearch, errorSearch);
	}
	else if(currentProjectionItem == 'projectionTypeDate')
	{
		if(validateElement($('#projectionDate')[0]))
		{
			parms = '&projDD=' + $('#projectionDateDay').val()
				  + '&projMM=' + $('#projectionDateMonth').val()
				  + '&projYY=' + $('#projectionDateYear').val();
			
			doAjax(url, divId, parms, beforeSearch, successSearch, errorSearch);
		}
	}
}

var nameSearchRow;
function doNameSearchAssociations(url, divId, clientReference, row)
{
	log(' = doNameSearchAssociations');	
	
	if($(row).hasClass('associationsOpen'))
	{
		closeAssociations(row);
	}
	else
	{
		// If the next row is an associations row
		if($(row).next().hasClass('associationsRow'))
		{
			openAssociations(row);
			
			$(row).next().removeClass('hidden');
		}
		else // Else get associations from server
		{
			nameSearchRow = row;
			parms = 'clientReference=' + clientReference;
			doAjax(url, divId, parms, beforeDefault, successNameSearchAssociations, errorDefault);
		}
	}
}

function successNameSearchAssociations(divId, response)
{
	log('= successNameSearchAssociations');
	
	if(!isErrorPage(response))
	{
		openAssociations(nameSearchRow);
		
		$(nameSearchRow).after('<tr class="associationsRow" ><td colspan="4">' + response + '</td></tr>');
		
		unblock();
	}
	else
	{
		errorDefault(divId, response);
	}
}

function openAssociations(row)
{
	$(row).removeClass('rowHighlight');	
	$(row).addClass('associationsOpen');
	$(row).children(':first').children(':first').removeClass('plusIcon');
	$(row).children(':first').children(':first').addClass('minusIcon');
}

function closeAssociations(row)
{
	$(row).removeClass('associationsOpen');		
	$(row).next().addClass('hidden');
	$(row).children(':first').children(':first').removeClass('minusIcon');
	$(row).children(':first').children(':first').addClass('plusIcon');	
}

function retrieveRecentDocuments(url, divId)
{
	parms='searchType=recent';
	
	doAjax(url, divId, parms, beforeDocSearch, successDocSearch, errorDocSearch);
}

function highLightTableInit(divId)
{
	log(' = highLightTableInit');
	
	$("#" + divId + " table.stripeyTable tbody tr:odd").addClass("stripe");		
	
	$("table.highlightTable tbody tr").mouseover(function()
	{
		if(!$(this).hasClass("associationsOpen") && !$(this).hasClass("associationsRow") && !$(this).hasClass("dontHighlight"))
		{
			$(this).addClass("rowHighlight");
		}
	});
	
	$("table.highlightTable tbody tr").mouseout(function()
	{
		$(this).removeClass("rowHighlight");
	});
}

function persistencyContacts()
{
	log(' = persistencyContacts');
	
	changeTab('persistencyAlertsSection', 1);
	
	doAjax(contextPath + '/persistencyContacts.do', 'persistencyContacts', '', beforeSearch, successSearch, errorSearch);						

}

function getSelectedClaimDetails(claimNo, elementNo, row, table)
{
	stickRow(row, table);
	
	parms = 'claimNo=' + claimNo + '&elementNo=' + elementNo;
	
	doAjax(contextPath + '/claimDetail.do', 'claimDetail', parms, beforeSearch, successSearch, errorSearch);
}

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//	pagination

var paginationURL;
var paginationID;
function setPaginationFunction(f, url, id)
{
	enterFunction = f;
	paginationURL = url;
	paginationID = id;
}

function paginationRefresh(url, id)
{
	log(' = paginationRefresh. paginationID = ' + paginationID + '. paginationID = ' + paginationID);
	
	if(url == null)
	{
		url = paginationURL;
	}
	if(id == null)
	{
		id = paginationID;
	}
	
	if(validateElement($('#' + id + 'PaginationRefresh')[0]))
	{
		paginationNavigate(url, id, $('#' + id + 'PaginationRefresh').val());
	}
	else
	{
		log(' *** error navigateRefresh');
		// TODO: Show error message
	}
}

function paginationNavigate(url, divId, pageNo)
{
	log(' = paginationNavigate');
	
	$('#piplineAssociationsResult').html('');
	
	parms = 'pageNo=' + pageNo;
	
	doAjax(url, divId, parms, paginationNavigateBefore, paginationNavigateSuccess, paginationNavigateError);
}

function paginationNavigateBefore(divId)
{
	log(' = paginationNavigateBefore. divId = ' + divId);
	
	if(divId == 'nameSearch')
	{
		$('#nameSearchAssociationsResponse').addClass('hidden');
		$('#nameSearchAssociationsResponse').html('');
	}
	else if(divId == 'commissionIntro')
	{
		$('#commissionDetailsBreakdownintroResponse').addClass('hidden');
		$('#commissionDetailsBreakdownintroResponse').html('');		
	}
	else if(divId == 'commissionFund')
	{
		$('#commissionDetailsBreakdownfundResponse').addClass('hidden');
		$('#commissionDetailsBreakdownfundResponse').html('');		
	}
	else if(divId == 'fundNameSearch')
	{
		log(' = div is fund name search');
		$('#fundNamePerformanceResponse').addClass('hidden');
		$('#fundNamePerformanceResponse').html('');
	}
	
	$('#' + divId + 'Results').html(ajaxWaitMessage);	
	block();
}

function paginationNavigateSuccess(divId, response)
{
	log(' = paginationNavigateSuccess');
	
	// If the response is an error page - goto error.html
	if(!isErrorPage(response))
	{
		// If this doesn't contain an expected ajaxResponse div - insert error response into page
		if($(response).filter('.ajaxResponse').length != 0)
		{
			$('#' + divId + 'Results').html($(response).find('#' + divId + 'Results').html());
			
			if($(response).filter('.pagination').length != 0)
			{
				$('#' + divId + 'Pagination').removeClass('hidden');
				$('#' + divId + 'Pagination').html($(response).filter('.pagination').html());
			}
			
			searchInit(divId);
		}
		else
		{
			$('#' + divId + 'Results').html(response);
		}
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
	unblock();
}

function paginationNavigateError(divId, response)
{
	log(' = paginationNavigateError');
	
	$('#' + divId + 'Results').html(ajaxErrorMessage);
	unblock();
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function commissionBreakdown(elementNumber, splitNumber, agentId, breakdownType, row, table) 
{
	stickRow(row, table);
	
	parms = 'elementNumber=' + elementNumber
	      + '&splitNumber=' + splitNumber
	      + '&agentId=' + agentId
	      + '&breakdownType=' + breakdownType;
	
	doAjax(contextPath + '/commissionBreakdownDetails.do', 'commissionDetailsBreakdown' + breakdownType, parms, beforeSearch, successSearch, errorSearch);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function getFundPerformance(url, divId, fundId, row)
{
	stickRow(row, '#fundNameSearchResultsTable');
		
	parms = 'fundId='+fundId;
	
	doAjax(url, divId, parms, beforeSearch, successSearch, errorSearch);
	
}

function proposalRequirements(reqtype, reqid, row)
{
	log(' = proposalRequirements');
	
	stickRow(row, '.requirementsTable');
	
	parms = 'reqtype=' + reqtype + '&reqid=' + reqid;	
	doAjax(contextPath + '/requirement.do', 'proposalRequirements', parms, beforeSearch, successSearch, errorSearch);	
}

function initialiseInvestmentHistoryAccordian()
{
	// 1. Hide all the divs in the investment_history div
	$('div.investmentHistory > div').hide();  
	
	// 2. When a .investmentHistorySubHead is clicked
	$('div.investmentHistory > .investmentHistorySubHead').click(function() 
	{
		var $nextDiv = $(this).next();
		var $visibleSiblings = $nextDiv.siblings('div:visible');
		
		if ($visibleSiblings.length ) {
			$visibleSiblings.slideUp(170, function() {
			$nextDiv.slideToggle(170);
			});
		} else {
			$nextDiv.slideToggle(170);
		}
	});
}

function isErrorPage(response)
{
	log(' = isErrorPage');
	
	try
	{	
		if(response.indexOf('errorPage') == -1 && response.indexOf('sessionErrorMessage') == -1)
		{
			return false;
		}
		
		return true;
	}
	catch(e)
	{
		log(' # error caught in isErrorPage()');
		return false;
	}
	return false;
}

function selectSwitchType()
{
	log(' = selectSwitchType');
	
	if(validateForm())
	{
		parms = 'switchType=' + $('#'+getSelectedRadioId("switchType")).val();
		doAjax(contextPath + '/selectSwitchType.do', 'planMenuContent', parms, planMenuChangeBefore, successSwitch, planMenuChangeError);
	}
}

function selectSwitchOut()
{
	log(' = selectSwitchOut');
	
	if(validateForm())
	{
		parms = getParameters('switchOutPctField');
		doAjax(contextPath + '/selectSwitchOut.do', 'planMenuContent', parms, planMenuChangeBefore, successSwitch, planMenuChangeError);
	}
}

function selectSwitchIn()
{
	log(' = selectSwitchIn');
	
	if(validateForm())
	{
		parms = getParameters('switchInField');
		doAjax(contextPath + '/selectSwitchIn.do', 'planMenuContent', parms, planMenuChangeBefore, successSwitch, planMenuChangeError);
	}
}

function selectRedirect()
{
	log(' = selectRedirect');
	
	if(validateForm())
	{
		parms = getParameters('redirectField');
		doAjax(contextPath + '/selectRedirect.do', 'planMenuContent', parms, planMenuChangeBefore, successSwitch, planMenuChangeError);
	}
}

function submitSwitch()
{
	log(' = submitSwitch');
	
	if(validateElement($('#planId')))
	{
		parms = getParameters('switchSummaryField');
		doAjax(contextPath + '/submitSwitch.do', 'planMenuContent', parms, planMenuChangeBefore, successSwitch, planMenuChangeError);
	}
}

function emailPrintSummary(planId)
{
	parms='summary='+$('#printBody').html().replace(/\t/g, '').replace(/\r/g, '').replace(/\n/g, '').replace(/  /g, '') +
		  '&to='+$('#emailTo').val() +
		  '&planId='+planId+
		  '&manualTo='+$('#manualEmailTo').val();
	
	doAjax(contextPath + '/emailPrintSummary.do', 'EmailPrintSummary', parms);
	
}

function successSwitch(divId, response)
{
	log(' = successSwitch');
	
	if(!isErrorPage(response))
	{
		$('#planMenuContent').html(response);	
	
		if($(response).filter('#switchSummary').length != 0)
		{
			initSwitchSummary();
		}
	}
	else
	{
		window.location = contextPath + '/error.html';
	}
	unblock();
}

function initSwitchSummary()
{
	if (document.getElementById("signature1Object") != null)
	{
		clearEpadScreen("signature1");
	}

	if (document.getElementById("signature2Object") != null)
	{
		clearEpadScreen("signature2");
	}
}

function getParameters(classId)
{
      count = 0;
      parameters = "";

      $("." + classId).each(function()
      {
          if ($(this)[0].type=="radio")
          {
        	  fieldName = $(this)[0].name;
        	  if (parameters.indexOf(fieldName)==-1)
        	  {
                  if (count > 0)
                  {
                	  parameters += "&";
                  }
            	  fieldVal = $('#'+getSelectedRadioId(fieldName)).val();
            	  parameters += fieldName + "=" + fieldVal;
                  count++;
        	  }
          }
          else
          {
              if (count > 0)
              {
            	  parameters += "&";
              }
              parameters += $(this)[0].name + "=" + $(this).val();
              count++;
          }
          
      });
      
      log('params=' + parameters);
      return parameters;
}
