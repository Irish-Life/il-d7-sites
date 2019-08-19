

$().ready(function()
{
	mainMenuChangeInit();
	
	
	//$('.checkbox2').checkbox();
	
})


function testPlanEnquirySearch()
{
	log("= testPlanEnquirySearch");
		
	
	
	$("#testNameSearchResponse").removeClass("hidden");
	
	
}


function openPremiumSkipPopup()
{
	log("= openPremiumSkipPopup");
	
	//closeAllToolTips();
	
	alert('When you click a premium skip checkbox, a popup asking for a premium skip end date will be displayed');
	
	//openWindow('Premium Skip', '<table><tr><td>Premium skip end date</td><td><input type="text" class="inputFieldText" /></td></tr></table><button onclick="dialogClose();" >Ok</button>');
	
}




var currentPaySchemeNumber = '0';
function testPaySchemeCase(number)
{
	log("= testPaySchemeCase. number = " + number);
	
	
	$('#paySchemeCases' + currentPaySchemeNumber).addClass('hidden');
	
	$('#paySchemeCases' + number).removeClass('hidden');
	
	
	closeAllToolTips();
	
	if(number == '0')
	{
		displayToolTip('#tooltip4', 'This is the process navigation bar.<br />You can use this like a back button.', 'bottomLeft');
		
		displayToolTip('#resumeButton', 'This button will only appear if you have a saved case', 'leftMiddle');
		
	}
	else if(number == '1')
	{
		
	}
	else if(number == '2')
	{
	
	}
	else if(number == '3')
	{
	
	}
	else if(number == '4')
	{
	
	}
	
	currentPaySchemeNumber = number;
	

}



function paySchemeCasesReset()
{

	$('#schemePaymentsToApplyTable .inputField').val('');

}




function paySchemeCasesSave()
{
	
	alert('Demo Version\n\nYour payment amounts are saved\nYou can come back and continue inputting whenever you like');
	
}

function testOpenPlan()
{
	log("= testOpenPlan");
		
	$('#headerTabPlanEnquiry').removeClass('hidden');
		
	headerTabChange('PlanEnquiry'); 
}


var currentPaymentType = '';
function testPaymentType()
{
	log("= testPaymentType");
	
	var paymentTypeValue = $('#paymentType').val();
	
	if(currentPaymentType != '')
	{
		$('#' + currentPaymentType).addClass('hidden');
	}
	
	currentPaymentType = "paymentTypeDetails" + paymentTypeValue;
	
	
	$('#' + currentPaymentType).removeClass('hidden');
	
	
}



function isUndefined(object) 
{
    if (typeof (object) == "undefined") 
    {
        return true;
    }
    return false;
}

function checkboxTooltipChecked()
{
	var displayTooltips = $('#checkboxTooltip')[0].checked;
	
	if(!displayTooltips)
	{
		closeAllToolTips();
	}
}


function displayToolTip(selector, content, positionTip)
{
	log("= displayToolTip");
	
	/*var displayTooltips = $('#checkboxTooltip')[0].checked;
	
	if(displayTooltips)
	{
		$(selector).qtip(
		{
			content: content + '<br /><a class="tooltipCloseButton" href="javascript: void(0);" >close</a>',
			tip: true,
			position: 
			{
			  corner: {
				 target: 'topRight',
				 tooltip: positionTip
			  }
			},
			show: 
			{ 
				when: false, 
				ready: true 
			},
			hide: false,
			style: 
			{
				border: 
				{
					width: 4,
					radius: 0,
					color: '#101010'
				},
				padding: 6, 
				tip: true
			},
			api: 
			{
				onRender : function ()
				{ 
					this.elements.content.find('.tooltipCloseButton').click(this.hide);
				}
			}
		});
	}*/
}


function closeAllToolTips()
{
	try
	{
		//log('### closeAllToolTips');
		
		$('.tooltip').each(function()
		{
			try
			{
				$(this).qtip('hide');				
			}
			catch(e){}
		});	
		
		$('.qtip').remove();
	}
	catch(e){}
}


/*
var dialogLayoutDefault = { width: 400, height: 'auto', position: ['center', 200] };
var dialog;
function openWindow(heading, content)
{
	dialog = $("<div class='dialogComponent' >" + content + "</div>").dialog(
	{
		title: '<div class="dialogHeading" >' + heading + '</div>',	        
		dialogClass: 'themeDefault',
		resizable: false,
		width: dialogLayoutDefault.width,
		position: dialogLayoutDefault.position,
		modal: true,
		height: dialogLayoutDefault.height
	});
	
	
	$('select').hide();
}

function dialogClose() 
{
    try 
    {
        log('= dialogClose');        
        
        dialog.dialog("destroy");
        $('#dialogWrapper').remove();
        dialog = null;
		
		$('select').show();
    }
    catch (e) 
    {
        logError('dialogClose', e);
    }    
}*/



