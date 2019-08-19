function createTheChart(checkFundDiv, chartDiv)
{
	var	funds = '', 
		numFunds=0;
	for (i =0; ;i++)
	{
		if($('#'+checkFundDiv + i).length != 0)
		{
			if ($('#'+checkFundDiv+i+':checked').val())
			{
				funds= funds+ $('#'+checkFundDiv+i+':checked').val() + ';';
				numFunds = numFunds +1;
			}
		}
		else
		{
			break;
		}
	}
	
	if (numFunds >= 1 && numFunds <= 10) 
	{
	 // <![CDATA[
	 var so = new SWFObject("/zoomchart/amchart/amstock.swf", "amstock", "900", "450", "8", "#efefef");
	 //so.addVariable("path", "/servlet/amchart/");
	 so.addVariable("settings_file", encodeURIComponent("/servlet/amchart/?action=getChart&fund="+funds));
	 so.addVariable("preloader_color", "#efefef");
	 $('#'+chartDiv).removeClass('hidden');
	 so.write(chartDiv);
	 
	 $('#'+chartDiv).modal({
		minHeight:520,
		minWidth: 910,
		persist:true,
		overlayClose:false
	});
	
	
	
	 //$('#'+chartDiv).dialog({modal: true, width:950});
	 // ]]>
	 
	ga('send','event', 'funds', 'Draw Chart',funds); 
	ga('send','pageview','/funds/draw-chart-'+funds+'.html'); 	 
	mkVisitWebPage('/funds/draw-chart-'+funds+'.html');
	}
	else if (numFunds == 0)
	{
		alert('Please select at least one fund to chart');
	}
	else
	{
		alert('You can only chart up to 10 funds at any one time');
	}
 }
 
 function createChart()
 {
	createTheChart('CheckFund','fundChart');
 }
function showPrices()
 {
	parms='applicationId=WW1';
	doAjax('/servlet/ilFunds.jsp', 'fundPerformance', parms, null, successPrices, null, null);
 }
 
 function successPrices(divId, response)
 {
	successDefault(divId, response);
	timestampPdfs();
 }
  
function showCategories()
{
		if (!fundCategoriesReceived)
		{
			parms='applicationId=PRD';
			doAjax('/servlet/startBlineFundPrices.do', 'FundCategories', parms);
			fundCategoriesReceived = true;
		}
		ga('send','pageview', '/funds/product-prices.html'); 
}

function getFundPrices()
{		
	// 2. Ajax request			
	parms = 'fundGroupId=' + $('#FundCategory').val();
			
	doAjax('/servlet/retrieveBlineFundPrices.do', 'fundPrices', parms);		
	selectFunds();
	ga('send','pageview','/funds/Prices-'+parms+'.html'); 
	mkVisitWebPage('/funds/Prices-'+parms+'.html');
}

function showAnnualised()
{
	$('.growth').each(function(i) {
		$(this).addClass('hidden-important');
	});

	$('.annualised').each(function(i) {
		$(this).removeClass('hidden-important');
		$(this).removeClass('hidden');
	});

	ga('send','pageview', '/funds/fund-factsheets-prices-annualised.html');
}

function showCumulative()
{
	$('.growth').each(function(i) {
		$(this).removeClass('hidden-important');
	});

	$('.annualised').each(function(i) {
		$(this).addClass('hidden-important');
	});
	ga('send','pageview', '/funds/fund-factsheets-prices.html');
}

