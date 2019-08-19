var ajaxManager;
var ajaxWaitMessage = '<div class="waitText"><p>Loading. Please wait...</p></div>';
var ajaxErrorMessage = '<div class="contentError"><p>An error has occurred preventing your request from being processed.</p></div>';
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
}
function successAjax(divId, response, successFunction)
{
	if(successFunction != null){ successFunction(divId, response); }	
	else{ successDefault(divId, response); }
}

function successDefault(divId, response)
{
	$('#' + divId + 'Response').html(response);
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
}
function abortAjax(divId, abortFunction)
{
	if(abortFunction != null){abortFunction(divId); }
	else{abortDefault(divId);}
}

function abortDefault(divId)
{
}


function toggleTwinDivs(idA, idB)
{	
	$('#'+idA).removeClass('hidden'); 
	$('#'+idB).addClass('hidden'); 
}
function openPage(divID)
{
	//Close all the open divs
	closeAllDivs();
	if ($('#menuBlockDetailsHolder').is(":visible")){
		resetArrows('A');
		resetArrows('B');
		resetArrows('C');
		$('#menuBlockDetailsHolder').toggle();
	}
	openDiv(divID);
	// close the menu 
}
function closeAllDivs()
{
	for(x = 0; x<=10; x++)
	{
		$('#linkClicked_'+x).addClass('hidden');
	}
}
function openDiv(divID)
{
	$('#linkClicked_'+divID).removeClass('hidden');
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Tabs
//

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

function createChart()
{

	 // <![CDATA[
	 var so = new SWFObject("charts/amstock.swf", "amstock", "680", "400", "8", "#FFFFFF");
	 so.addVariable("settings_file", encodeURIComponent("charts/performanceSettings.xml"));
	 so.addVariable("preloader_color", "#999999");
	 so.addVariable("preloader_color", "#999999");
	 so.addParam("wmode", "transparent");
	 so.write("flashcontent1");
	 // ]]>
 }
 
 function showPrices()
 {
	parms='';
	doAjax('/servlet/ilFundPrices.jsp', 'fundPerformance', parms);	
 }
 
 function showCategories()
{
		if (!fundCategoriesReceived)
		{
			parms='applicationId=ILW';
			doAjax('/servlet/startBlineFundPrices.do', 'FundCategories', parms);
			fundCategoriesReceived = true;
		}
}
$(document).ready(function () {
		ajaxManager = $.manageAjax.create('queue',{queue: true});	
});

function performSearch(search, start)
{
	parms='search='+search+'&start='+start;
	doAjax('/servlet/performSearch.do','SearchResults',parms,
	beforeSearch, successSearch, errorDefault, abortDefault);
}

function beforeSearch(divId)
{
		//window.location='/search/searchResults.html';
}

function successSearch(divId, response)
{
	successDefault(divId, response);
}