
var contextPath = '';
var isEposUser = '';

var openMenuItem = null;

var headerTabItem = 'MainMenu';
var mainMenuItem = 'PlanEnquiry';
var planMenuItem = 'Summary';

var enterFunction;


$(document).ready(function()
{
	setBrowserType();
	
	$(document).click(function() 
	{
		if(openMenuItem != null)
		{
			if(closeItem == true)
			{
				closeMenu(openMenuItem);
			}
		}
		closeItem = true;
	});
	
	initEnterKeyListener();
});


function initEnterKeyListener()
{
	$(document).keydown(function(e)
	{
		var keynum = e.which || e.keyCode;
		if(keynum == 13){try{enterFunction(); }catch(e){}}
	});
}

function setBrowserType()
{
    var browserType = 'browserFF';


    if ($.browser.msie) 
    {
        browserType = "browserIE";
    }
    // TODO: add in more of these




    $('#wrapper').addClass(browserType);
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Tab Menu
//

function headerTabChange(id)
{
	$('#headerTab' + headerTabItem).removeClass('on');
	$('#headerTabContent' + headerTabItem).addClass('hidden');

	headerTabItem = id;
	headerTabChangeInit();
	
	$('#headerTab' + headerTabItem).addClass('on');
	$('#headerTabContent' + headerTabItem).removeClass('hidden');
}

function headerTabChangeInit()
{
	if(mainMenuItem == 'MainMenu')
	{
		
	}
	else if(mainMenuItem == 'PlanEnquiry')
	{
		
	}
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Main Menu
//

function menuButtonClick(element)
{
	log(' = menuButton.click');
	
	if(openMenuItem != null && openMenuItem == element)
	{
		closeMenu(openMenuItem);
	}
	else if(openMenuItem != null && openMenuItem != element)
	{
		closeMenu(openMenuItem);
		openMenu(element);
	}
	else
	{
		openMenu(element);
	}
}


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Tabs
//

function changeTab(tabSection, id)
{
	// Max of 20 tabs?
	for(i = 0; i < 20; i++)
	{	
		if($('#'+tabSection+'-tab-link' + i).length != 0)
		{
			if(i == id)
			{
				try
				{
					$('#'+tabSection+'-tab-link' + i).addClass('on'); 
					$('#'+tabSection+'-tab-content' + i).removeClass('hidden'); 
				}
				catch(e){}				
			}
			else
			{
				try
				{
					$('#'+tabSection+'-tab-link' + i).removeClass('on'); 
					$('#'+tabSection+'-tab-content' + i).addClass('hidden');
				}
				catch(e){}
			}
		}
	}
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Associated plans drop down
//

function openMenu(element)
{
	$('#planMenuDrop').slideDown(70);
	$('#menuButton').addClass('on');
	
	openMenuItem = element;
	
	closeItem = false;
}

function closeMenu(element)
{
	$('#planMenuDrop').hide();
	$('#menuButton').removeClass('on');
	
	openMenuItem = null;
}

function buttonFunctions(element)
{
	if(element.id == "")
	{
	}
}


function mouseDownBottom(id)
{
	$("#planMenuButton" + id).addClass("on");
}

function mouseUpBottom(id, url)
{
	$('#planMenuButton' + id).removeClass('on');
	
	if(id == 'PrintSummary')
	{
		window.open(url,'_blank','toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes, width=760, height=800');
	}
}


var currentDateItem = "rangeMonthly";
function rangeUpdate()
{
	log(' = rangeUpdate. currentDateItem = ' + currentDateItem);		
	
	$('.' + currentDateItem + 'Item').addClass('hidden');
	
	// Add hidden to the currentItem
	currentDateItem = getSelectedRadioId('range');
	$('.' + currentDateItem + 'Item').removeClass('hidden');
}


var currentProjectionItem = 'projectionTypeYears';
function projectionUpdate()
{
	log(' = projectionUpdate. currentProjectionItem = ' + currentProjectionItem);		
	
	if(currentProjectionItem != null)
	{
		$('.' + currentProjectionItem + 'Item').addClass('hidden');
	}
	
	// Add hidden to the currentItem
	currentProjectionItem = getSelectedRadioId('projectionType');
	$('.' + currentProjectionItem + 'Item').removeClass('hidden');	
}

function dateUpdate(objId)
{
	log(' = dateUpdate');
	
	var startDate = null;
	var endDate = null;
	
	if($('#rangeWeekly')[0].checked == true)
	{
		// Check if week and year entered
		log('updating weeks');
		var week = $('#dateWeeklyWeek')[0].value;
		var year = $('#dateWeeklyYear')[0].value;
		
		if(week != '' && year != '')
		{
			// TODO: use setWeeks in next version
			startDate = Date.parseExact(year + '-01-01', 'yyyy-MM-dd').addWeeks(week - 1);
			endDate = Date.parseExact(year + '-01-01', 'yyyy-MM-dd').addWeeks(week).addDays(-1);
			
			$('#dateWeekly').val('Y');
			validateElement($('#dateWeekly')[0]);
		}
		else
		{
			$('#rangeWeekly').val('');
		}
	}
	else if($('#rangeMonthly')[0].checked == true)
	{
		log('updating months');
		var month = $('#dateMonthlyMonth')[0].value;
		var year = $('#dateMonthlyYear')[0].value;
		
		log(' * month = ' + month);
		log(' * year = ' + year);
				
		if(month != '' && year != '')
		{
			startDate = Date.parseExact(year + '-01-01', 'yyyy-MM-dd').addMonths(month - 1);
			endDate = Date.parseExact(year + '-01-01', 'yyyy-MM-dd').addMonths(month).addDays(-1);

			$('#dateMonthly').val('Y');
			validateElement($('#dateMonthly')[0]);
		}
		else
		{
			$('#dateMonthly').val('');
		}
	}
	
	log(' * startDate = ' + startDate);
	log(' * endDate = ' + endDate);
		
	if(startDate != null && endDate != null)
	{
		$('#startDateDay').val(startDate.getDate());
		log('start date month [' + startDate.getMonth()+']');
		if( ((startDate.getMonth() + 1) + "").length == 1 )
		{
			$('#startDateMonth').val('0' + (startDate.getMonth() + 1));
		}
		else
		{
			$('#startDateMonth').val('' + (startDate.getMonth() + 1));
		}
		
		$('#startDateYear').val(startDate.getFullYear());
		log('Start Date ' + $('#startDateYear').val() + '-' + $('#startDateMonth').val() + '-' + $('#startDateDay').val());
				
		setHiddenDate('startDate');
					
		$('#endDateDay').val(endDate.getDate());
		
		
		log('end date month ' + endDate.getMonth());
		if( ((endDate.getMonth() + 1) + "").length == 1 )
		{
			$('#endDateMonth').val('0' + (endDate.getMonth() + 1));
		}
		else
		{
			$('#endDateMonth').val('' + (endDate.getMonth() + 1));
		}
		$('#endDateYear').val(endDate.getFullYear());
		
		log('End Date ' + $('#endDateYear').val() + '-' + $('#endDateMonth').val() + '-' + $('#endDateDay').val());
				
		setHiddenDate('endDate');
	}
	else
	{
		$('#startDateDay').val('');
		$('#startDateMonth').val('');
		$('#startDateYear').val('');
		$('#startDate').val('');
		
		$('#endDateDay').val('');
		$('#endDateMonth').val('');
		$('#endDateYear').val('');
		$('#endDate').val('');
	}
}

function dateGreaterThan()
{
	log(' = dateGreaterThan');
	
	// If the endDate is greater than the startDate
	if(Date.parseExact($('#endDate').val(), "yyyy-MM-dd").compareTo(Date.parseExact($('#startDate').val(), "yyyy-MM-dd")) == 1) 
	{		
		return true;
	}
	
	return "The end date should be after the start date";
}


function priceDateGreaterThan()
{
	log(' = dateGreaterThan');
	
	// If the endDate is greater than the startDate
	if(Date.parseExact($('#endPriceDate').val(), "yyyy-MM-dd").compareTo(Date.parseExact($('#startPriceDate').val(), "yyyy-MM-dd")) == 1) 
	{		
		return true;
	}
	
	return "The end date should be after the start date";
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Funds functions
//

function pipelineCodesToggle()
{	
	$('#pipelineInstructions').toggle();
}

function toggleFundDetail(id)
{
	var $visibleSiblings = $("#" + id).siblings('div:visible');
	if ($visibleSiblings.length ) 
	{
		$visibleSiblings.slideUp(170, function() 
		{
			$("#" + id).slideToggle(170);
		});
	} 
	else 
	{
		$("#" + id).slideToggle(170);
	}
}


//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Generic functions
//

function block()
{
	$.blockUI({overlayCSS:{opacity: 0}, fadeIn: 0, fadeOut: 0, message: null});	
}

function unblock()
{
	$.unblockUI();
}

function stickRow(row, table)
{
	// unstick any current stuck rows	
	$(table).find('.selectedRow').removeClass('selectedRow');
	
	$(row).addClass('selectedRow');
}

function disableButton(button)
{
	if (document.getElementById(button) != null)
	{
		if( (document.getElementById(button).disabled === false) && (button != null) )
		{
			document.getElementById(button).disabled = true;
		}
	}			
}

function enableButton(button)
{
	if (document.getElementById(button) != null)
	{
		if(document.getElementById(button).disabled === true)
		{
			document.getElementById(button).disabled = false;
		}
	}
	
	ajaxButton = "";
}

var consoleCounter = 0;
function log(message){ 
	try {
		console.log(consoleCounter++ + "\t" + message);
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}

function setEnterFunction(f)
{
	enterFunction = f;
}

function filterAgentItems(agent)
{
	$(".AgentItem").each(function()
	{
		if ($(this).hasClass('.hidden'))
		{
			// do nothing
		}
		else
		{
			if (agent == 'ALL' || 
					$(this).hasClass('.AgentItem'+agent))
			{
				$(this).removeClass('hidden');
			}
		}
		
	})
}

function filterContactAlerts(showType, checkbox)
{
log('filterContactAlerts for ' + showType);
	if (checkbox.checked)
	{
	log('checkbox is checked');
		$(".contactAlert").each(function()
		{
			$(this).addClass('hidden');
		})

		$(".contactAlert"+showType).each(function()
		{
			$(this).removeClass('hidden');
		})
	}
	else
	{
		log('checkbox is unchecked');
		$(".contactAlert"+showType).each(function()
		{
			$(this).addClass('hidden');
		})
	}
}


function filterColors(showColor, checkbox)
{
	if (checkbox.checked)
	{
		$(".missedPayment").each(function()
		{
			$(this).addClass('hidden');
		})

		$(".missedPayment"+showColor).each(function()
		{
			$(this).removeClass('hidden');
		})
	}
	else
	{
		$(".missedPayment"+showColor).each(function()
		{
			$(this).addClass('hidden');
		})
	}
}

function hideCommissionResponses()
{
	$('.commissionResponseSummary').each(function()
	{
			$(this).addClass('hidden');
	})
}

function showCommissionSummary(show)
{
	hideCommissionResponses();
	$('#statement'+show).removeClass('hidden');
}

function selectReminderType(whichOne)
{
	$(".reminderSection").each(function()
	{
		$(this).addClass('hidden');
	})
	
	$('.reminderSection'+whichOne).removeClass('hidden');
}

function displayTempMessage(divId, message)
{
    $(document).ready(function() {  
        $('<div class="contentSection"><div class="contentError"><p>'+message+'</div></div>')   
        .insertAfter( $('#'+divId) )   
        .fadeIn('slow')   
        .animate({opacity: 1.0}, 8000)   
        .fadeOut('slow', function() {   
          $(this).remove();	   
       });
    });
}

function showNewAgentDialog()
{
	$('#updateAgentDescriptionNew').val('');
	$('#updateAgentPhoneNumberNew').val('');
	$('#error-updateAgentDescriptionNew').html('');
	$('#error-updateAgentPhoneNumberNew').html('');
	$('#newAppointmentAgent').removeClass('hidden');
}

function openEPOSWindow(url)
{
	var parms;
	var windowOpener = window.opener;
	var h;
	var w;
	if(window.screen.availWidth <= 800) 
	{
		w = window.screen.availWidth-10;
		h = window.screen.availHeight-45;		
		parms = 'screenX=0,screenY=0,left=0,top=0,width='+w+',height='+h+',resizable=1,status=1,menubar=1,toolbar=0,location=0,scrollbars=1';
	}
	else 
	{
		w = window.screen.availWidth - 40;
		h = window.screen.availHeight - 105;		
		parms = 'screenX=15,screenY=5,left=15,top=5,width='+w+',height='+h+',resizable=1,status=1,menubar=1,toolbar=0,location=0,scrollbars=1';
	}

	if (windowOpener != null && !windowOpener.closed)
	{
		log ('attempting to open using window.opener');
		try
		{
			windowOpener.location=url;
		}
		catch(err)
		{
			myWin = window.open(url, 'Eposwindow',parms);
		}
	}
	else
	{
		log ('attempting to open using new window');
		myWin = window.open(url, 'Eposwindow',parms);
	}
	
}

function replaceString(source, insertArray) 
{
    for (rsi = 0; rsi < insertArray.length; rsi++) 
    {
    	source = source.replace(new RegExp("\\$\\{" + rsi + "\\}", "g"), insertArray[rsi]);
    }
    return source;
}


function disableButton(element)
{
    try
    {
        $.data(element, 'onclick', element.onclick);
        element.onclick = function() { return false };        
        $(element).attr('disabled', 'disabled');
    }
    catch (e)
    {
        logError('disableButton', e);
    }
}

function enableButton(element)
{
    try
    {
        element.onclick = $.data(element, 'onclick');
        $(element).removeAttr("disabled");
    }
    catch (e)
    {
        logError('enableButton', e);
    }
}
