var ajaxManager;
var ajaxWaitMessage = '<div class="waitText"><p>Loading. Please wait...</p></div>';
var ajaxErrorMessage = '<div class="contentError"><p>An error has occurred preventing your request from being processed. If this error keeps occurring please report the problem to hte B-line helpdesk.</p></div>';

var fundCategoriesReceived = false;

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
	
	//block();
}
function successAjax(divId, response, successFunction)
{
	if(successFunction != null){ successFunction(divId, response); }	
	else{ successDefault(divId, response); }
}

function successDefault(divId, response)
{
	$('#' + divId + 'Response').html(response);
	//unblock();
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
	
	//unblock();
}

function abortAjax(divId, abortFunction)
{
	if(abortFunction != null){abortFunction(divId); }
	else{abortDefault(divId);}
}

function abortDefault(divId)
{
	//unblock();
}

function changeTab(tabSection, id)
{
	for(i = 0; ; i++)
	{	
		if($('#'+tabSection+'-tab-link' + i).length != 0)
		{
			if(i == id)
			{
				$('#'+tabSection+'-tab-link' + i).addClass('on'); 
				$('#'+tabSection+'-tab-content' + i).removeClass('hidden'); 
			}
			else
			{
				$('#'+tabSection+'-tab-link' + i).removeClass('on'); 
				$('#'+tabSection+'-tab-content' + i).addClass('hidden');
			}
		}
		else
		{
			break;
		}
	}
}

function enableSubMenus()
{
			
			$('.sub2').each(function()
			{
				if ($(this).is('.on'))
				{
				$(this).addClass('sub2on');
				}
			})

			var liList = $.makeArray($('li'));
			
			$.each (liList, function(n,val) {

				$('.sub').each(function()
				{
				if ($(this).is('.on'))
				{
				$(this).addClass('subon');
				}
				})
				
				var added = false;
				if ($(val).hasClass('.sub'))
				{    
					$(prev).addClass('on');
					added=true;
				}
				else
				{
					if (!added)
					{
						 prev=$(val);
					}
				}

			});
			
			liList = $.makeArray($('li'));
			
			$.each (liList, function(n,val) {
				var addedSub = false;
				if ($(val).hasClass('.sub2'))
				{    
					$(prev).addClass('on subon');
					addedSub=true;
				}
				else
				{
					if (!addedSub)
					{
						if ($(val).hasClass('.sub'))
						{
							prev=$(val);
						}
					}
				}
			});
}


function showCategories()
{
		if (!fundCategoriesReceived)
		{
			parms='applicationId=BLW';
			doAjax('/servlet/startBlineFundPrices.do', 'FundCategories', parms);
			fundCategoriesReceived = true;
		}
}

function showMarketCommentary()
{
			parms='';
			doAjax('/servlet/getBlineMarketPerformance.do', 'MarketCommentary', parms);

}
function clearDefault(el) {
if (el.defaultValue==el.value) el.value = ""
}
