jQuery.migrateMute = true;

$('.loading-fc').html('loading almost complete.'); 
//var xx = new Array();
window.onload = function () {
(function() {

var
	a = alertify,
	l = a.log;
// console.log("############ START FUNDS CENTRE");
//####################################################################
//####################################################################
// Start of set up
//## Create a new fund centre object
var fundCentre=new Object();

//## set the Fund Centre's Funds taken from the URL
fundCentre._setURLFunds = function(f){
	var cleanF = jQuery.grep(f, function(value) {
	  return value != 'chartscreentrue';
	});
	fundCentre.URLFunds = cleanF;
	
	cleanURLArray();
		
		
	// check to see if the hash has the chartscreentrue variable 
	if ($.inArray('chartscreentrue', f)!==-1)
	{
		fundCentre._setShowChartStatus(true);
	}
	else{
		fundCentre._setShowChartStatus(false);
	}
	fundCentre._setShowProductChartStatus(false);
	
	//fundCentre._setClosed('none');
	
}
//## Hide these columns after load
fundCentre._setClosed = function(p){

	fundCentre.columnsClosed = p;	
}


//## set the Fund Centre's Hash Status
//## i.e. is there a has in the URL?
fundCentre._setHashStatus = function(b){
	fundCentre.hasHash = b;
}
//## set the Fund Centre's Show Chart Status
fundCentre._setShowChartStatus = function(b){
	fundCentre.showChartScreen = b;
}
//## set the Fund Centre's Show Chart Status
fundCentre._setShowProductChartStatus = function(b){
	fundCentre.showProductChartScreen = b;
}




//## set the Fund Centre's Fav Cookie Funds
fundCentre._setFavCoookieFunds = function(f){
	fundCentre.favCookieFunds = f;
}
//## set the Fund Centre's Chart Cookie Funds
fundCentre._setChartCoookieFunds = function(f){
	fundCentre.chartCookieFunds = f;
}

//## set the Fund Centre's Chart Cookie Funds
fundCentre._setProductChartCoookieFunds = function(f){
	fundCentre.productChartCookieFunds = f;	
	//
}

//## set the Fund Centre's Cookie Status for favourites 
//## i.e. Does a Cookie exist for favourites?
fundCentre._setFavCookieStatus = function(b){
	fundCentre.hasFavCookie = b;
} 
//## set the Fund Centre's Cookie Status  for saved charts
fundCentre._setChartCookieStatus = function(b){
	fundCentre.hasChartCookie = b;
}

//## set the Fund Centre's Cookie Status  for saved charts
fundCentre._setProductChartCoookieStatus = function(b){
	fundCentre.hasProductChartCookie = b;
}








//## set the Fund Centre's Group
fundCentre._setFundGroup = function(p){
	fundCentre.fundGroup = p;
}
//## set the Fund Centre's Upper Limits for fund group seperation
fundCentre._setFundGroupUpperLimits = function(p){
	fundCentre.fundGroupUpperLimits = p;
}
//## set the Fund Centre's Names for fund group seperation titles
fundCentre._setFundGroupNamesLimits = function(p){
	fundCentre.fundGroupNamesLimits = p;
}
//## set the Fund Centre's Product type for different versions of the fund centre
fundCentre._setProductGroup = function(p){
	fundCentre.productGroup = p;
}

//## set the Fund Centre's Product group names
fundCentre._setFundProductGroupNames = function(p){

	fundCentre.productGroupNames = p;	
	fundCentre.productGroupSeperateNames = new Array(); // somewhere to store them later as they are loaded
}
//## set the Fund Centre's Show Chart Status
fundCentre._setShowProductsOnlyStatus = function(b){
	var b = b.toLowerCase();
	fundCentre.showProductsOnly = b;
}

//## After manipulation and sorting set the group Funds arrays
fundCentre._setProductCategorys = function(d){
	fundCentre.productCategorys = new Array();
	fundCentre.fundCategoryProductData = new Array(); // somewhere to store them later as they are loaded
	fundCentre.fundCategoryProductDataHeader = new Array(); // somewhere to store them later as they are loaded
	fundCentre.productCategorys = d;
}

//## After manipulation and sorting set the group Funds arrays
fundCentre._setFundCategoryProductData = function(d,n,l){
	//fundCentre.fundCategoryProductData[n] = d;
	var dataindex = fundCentre.fundCategoryProductDataHeader.length;
	
	fundCentre.fundCategoryProductDataHeader.push({
	index: dataindex,
	id: d,
	name: n
	})
	fundCentre.fundCategoryProductData[dataindex] = l;
}


//## After download, set the group funds json
fundCentre._setGroupFunds = function(g){
	fundCentre.groupFunds = g;
}
//## After download, set the group funds json
fundCentre._setGroupFundsStatus = function(b){
	fundCentre.hasGroupFunds = b;
}
//## After manipulation and sorting set the group Funds arrays
fundCentre._setGroupFundsData = function(d){
	fundCentre.groupFundsData = new Array();
	fundCentre.groupFundsData = d;
}

// fundCentre.URLFunds
// fundCentre.hasHash
// fundCentre.showChartScreen

// fundCentre.favCookieFunds
// fundCentre.chartCookieFunds
// fundCentre.productChartCookieFunds

// fundCentre.hasFavCookie
// fundCentre.hasChartCookie
// fundCentre.hasProductChartCookie

// fundCentre.fundGroup
// fundCentre.fundGroupUpperLimits
// fundCentre.fundGroupNamesLimits
// fundCentre.productGroup
// fundCentre.showChartScreen
// fundCentre.showProductsOnly 
// End
//####################################################################
//####################################################################


// update the URL with the Hashes that the
// user has saved
removefromURLHash = function(fundID){
	
	// current URL Funds
	// fundCentre.URLFunds


	fundCentre.URLFunds = jQuery.grep(fundCentre.URLFunds, function(value) {
	  return value != fundID;
	});
	cleanURLArray();
	updateURLHash();
}
addtoURLHash = function(fundID){

	fundCentre.URLFunds.push(fundID);
	cleanURLArray();
	updateURLHash();
}
cleanURLArray = function(){

	fundCentre.URLFunds = jQuery.grep(fundCentre.URLFunds, function(value) {
	  return value != '';
	});
}
updateURLHash = function(){
	var newCookieHash = "#";
	
	for (i=0;i<fundCentre.URLFunds.length;i++){	
		if (fundCentre.URLFunds[i] != 'chartscreentrue')
		{	
			newCookieHash += fundCentre.URLFunds[i]+"&";
		}
	}
	location.hash = newCookieHash.replace('&&&', '&'); // set the new url

}

updateChartURLHash = function(funds){
	var newCookieHash = "#chartscreentrue&";
	
	for (i=0;i<funds.length;i++){	
		if (funds[i] != 'chartscreentrue')
		{	
			newCookieHash += funds[i]+"&";
		}
	}
	location.hash = newCookieHash.replace('&&&', '&'); // set the new url

}
updateFavCookie = function(){
	$.cookie('favFundsStoredILFS',fundCentre.URLFunds);
}

addtoChartFundsCookie = function(fundID){

	
	
	var tempArrA = new Array();
	
	
	tempArrA = fundCentre.chartCookieFunds;

	
	tempArrA.push(fundID);
	
	fundCentre._setChartCoookieFunds(tempArrA);
	
	
	

}
removeFromChartFundsCookie = function(fundID){
	
	var tempArr = new Array();
	tempArr = fundCentre.chartCookieFunds;

	var result = jQuery.grep(tempArr, function(value) {
	  return value != fundID;
	});
	
	fundCentre._setChartCoookieFunds(result);
	
	
// append new fund to the end
}

updateChartCookie = function(){
	$.cookie('chtFundsStoredILFS',fundCentre.chartCookieFunds);
}




addtoProdChartFundsCookie = function(fundID){

	var tempArr = new Array();
	
	if (fundCentre.productChartCookieFunds.length>=0){
	tempArr = fundCentre.productChartCookieFunds;
	}

	tempArr.push(fundID);
	fundCentre._setProductChartCoookieFunds(tempArr);

}
removeFromProdChartFundsCookie = function(fundID){
	
	var tempArr = new Array();
	tempArr = fundCentre.productChartCookieFunds;

	
	var result = jQuery.grep(tempArr, function(value) {
	  return value != fundID;
	});
	
	fundCentre._setProductChartCoookieFunds(result);	

// append new fund to the end
}

updateProdChartCookie = function(){
	$.cookie('chtFundsPrdStoredILFS',fundCentre.productChartCookieFunds);
}



// This function takes in the parameters passed and calls
// the correct functions. 
while (_ilfsfc.length > 0) {
	var ilfsFunc = _ilfsfc[0].shift();
	var ilfsParm = _ilfsfc[0].shift();
	_ilfsfc.shift();
	if(ilfsFunc.length> 1){ // extra check
		fundCentre[ilfsFunc](ilfsParm); // call the function and pass in params
	}
}


//####################################################################
//####################################################################
// Show the default funds in the fund centre
showDefaultFunds = function(){
	if (fundCentre.hasGroupFunds){
		// no need to make ajax call as we have table stored
		
		showDefaultFundTables();
	}
	else
	{
		pullDownOverallFundData();
	
	}
};

pullDownOverallFundData = function(){

// Call the server
// When done, create the tables
	var jqxhr = $.get( "/servlet/jsonFund.jsp?group="+fundCentre.fundGroup+"&page=prices", function() {
	})
	.done(function(data) {
	// once downloaded store off.
		var myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
		fundCentre._setGroupFunds(myJSON);
		fundCentre._setGroupFundsStatus(true);
		//a.log("Funds loaded");
		showDefaultFundTables();
	})
	.fail(function(jqxhr, textStatus, error ) {
	$('#fundCentreContents').html('<h5><span class="errorText"><i class="fa fa-exclamation-circle"></i> Error loading funds from our servers. Refresh the page or if the problem persists try again later.</span></h5>');
	//a.log("Error loading all funds. Refresh or try later."); 
	
	})

}


// Now that the json has been retrieved seperate it into
// correct groupings. Each grouping is a new table of funds
showDefaultFundTables = function(){
	

	var myProductFundsObject = [];


	//var myTable;
	
	// set up the holding arrays for the fund groupings
	// 1 group for each limit
	// each group has a corresponding name/title
	var fl = fundCentre.fundGroupUpperLimits.length;			
	for (i=0;i<fl; i++){
		myProductFundsObject[i] = [];//.push({id: currentFundGroup});
	}
	// ##################
	// Loop through data
	$.each(fundCentre.groupFunds[0], function(key, val) {
		$.each(val, function(index, vale) {
			//myTable += vale.group+" "+ vale.id+" "+ vale.name+" "+ vale.latest+" "+ vale.priceDate+" "+ vale.lastMonthGrowth+" "+ vale.threeMonthGrowth+" "+ vale.sixMonthGrowth+" "+ vale.yearToDateGrowth+" "+ vale.last12Months+" "+ vale.last3Years+" "+ vale.last5years+" "+ vale.last10Years+" "+ vale.sinceLaunchGrowth+" "+ vale.expsConsMktFnd+" "+ vale.protPrPl+" "+ vale.risk+" "+ vale.fmc+" "+ vale.order+" "+ vale.grouping+" "+ vale.url+" "+ " <br/>";
			
			var currentFundGroup = 0;
			for (i=0;i<fl; i++){
			
				var limitOrder = parseInt(vale.order);
				var limitNum = parseInt(fundCentre.fundGroupUpperLimits[i]);
				if( limitOrder < limitNum)
				{
					currentFundGroup = i;
					break;
				}
			}
			
			//myProductFundsObject.group1['group'] = vale.group;
			    myProductFundsObject[currentFundGroup].push({
				group: vale.group,
				id: vale.id,
				name: vale.name,
				latest: vale.latest,
				priceDate: vale.priceDate,
				lastMonthGrowth: vale.lastMonthGrowth,
				threeMonthGrowth: vale.threeMonthGrowth,
				sixMonthGrowth: vale.sixMonthGrowth,
				yearToDateGrowth: vale.yearToDateGrowth,
				last12Months: vale.last12Months,
				last3Years: vale.last3Years,
				last5years: vale.last5years,
				last10Years: vale.last10Years,
				last3YearsAnn: vale.last3YearsAnn,
				last5yearsAnn: vale.last5yearsAnn,
				last10YearsAnn: vale.last10YearsAnn,
				sinceLaunchGrowth: vale.sinceLaunchGrowth,
				expsConsMktFnd: vale.expsConsMktFnd,
				protPrPl: vale.protPrPl,
				risk: vale.risk,
				fmc: vale.fmc,
				order: vale.order,
				grouping: vale.grouping,
				url: vale.url
			});
		
		});
		fundCentre._setGroupFundsData(myProductFundsObject);
		
		drawGroupFundTable();
	});
	


	
	// fundCentre.groupFunds
	
	
}
drawGroupFundSingleTable = function(groupNum){
	var holdFavFundsArr = new Array();
	var holdChtFundsArr = new Array();
	
	holdChtFundsArr = fundCentre.chartCookieFunds;
	
	if(fundCentre.hasHash)
	{	
		holdFavFundsArr = fundCentre.URLFunds;
		// console.log("1 "+holdFavFundsArr);
		// us the hash for the favourites
	}
	else if (fundCentre.hasFavCookie)
	{
		holdFavFundsArr = fundCentre.favCookieFunds;
		//console.log("2 "+holdFavFundsArr);
		// set the url now
		fundCentre.URLFunds = fundCentre.favCookieFunds;
		// us the Cookies for the favourites
	}else
	{
		holdFavFundsArr = '';
		// console.log("3 "+holdFavFundsArr);
		// empty the 
	}
	
	var r , j = -1, size = fundCentre.groupFundsData[groupNum].length;
	var selectMenuLink = '<a href="javascript:void(0);" data-dropdown="dropmain" data-options="is_hover:true"><i class="fa fa-chevron-circle-down"></i></a>';
	var tableHeader=
			'<table class="dataList"><thead>\
				<th class="fundOptionsHeader " colspan="6">Performance @'+fundCentre.groupFundsData[0][0].priceDate+'</th>\
				<th class="fundOptionsHeader" colspan="100%">\
					<ul class="button-group right ">\
						<li class="showChatBtn"><a href="javascript:void(0);" class="toggleFav"><i class="fa fa-star" style="font-size:1em;color:#FDCB03;"></i> Favourites</a> | </li>\
						<li class="showProductChartBtn"><a href="javascript:void(0);" class="showFundsChart">Show Chart</a></li>\
					</ul>\
				</th>\
				<tr class="hide-for-small">\
					<th class="t-Fav" width="5%">Fav</th>\
					<th class="t-Risk" width="5%">Risk</th>\
					<th class="t-Name leftAlign" >Name</th>\
					<th class="t-Factsheet" width="5%">Fact sheet</th>\
					<th class="t-CSV" width="5%">CSV</th>\
					<th class="t-Price leftAlign" width="10%">Price</th>\
					<th class="t-FMC" width="7%">Charge</th>\
					<th class="t-YTD" width="7%">YTD</th>\
					<th class="t-Launch" width="7%">Since Launch</th>\
					<th class="visCol t-1M" style="display:none;" width="15%">Last Months</th>\
					<th class="visCol t-3M" style="display:none;" width="15%">3 Months</th>\
					<th class="visCol t-6M" width="15%">6 Months</th>\
					<th class="visCol t-12M" style="display:none;" width="15%">1 Year</th>\
					<th class="visCol t-3Y" style="display:none;" width="15%">3 Years</th>\
					<th class="visCol t-5Y" style="display:none;" width="15%">5 Years</th>\
					<th class="visCol t-10Y" style="display:none;" width="15%">10 Years</th>\
					<th class="visCol t-3YA" style="display:none;" width="15%">3 Years Annualised</th>\
					<th class="visCol t-5YA" style="display:none;" width="15%">5 Years Annualised</th>\
					<th class="visCol t-10YA" style="display:none;" width="15%">10 Years Annualised</th>\
					<th class="visColDrop" width="5%">'+selectMenuLink+'</th>\
					<th class="t-Chart" width="7%">Chart List</th>\
				</tr></thead><tbody class=\"list\">';


	r= tableHeader;
	//
	
	for (var key=0;  key<size; key++){
		if ($.inArray(fundCentre.groupFundsData[groupNum][key].id, holdFavFundsArr) >= 0)
		{
			r+= '<tr class="favourite-true"><td id="'+fundCentre.groupFundsData[groupNum][key].id+'" style="DISPLAY: none" class="id"></td>';
			r+= '<td class="starred"><input id="starred-'+fundCentre.groupFundsData[groupNum][key].id+'" class="starred-input" type="checkbox" value="" checked ><label class="feaeae starred-on" for="starred-'+fundCentre.groupFundsData[groupNum][key].id+'"></label><span class="starredAgain" style="display:none">1</span>';
		}
		else
		{
			r+= '<tr class="favourite-false"><td id="'+fundCentre.groupFundsData[groupNum][key].id+'" style="DISPLAY: none" class="id"></td>';
			r+= '<td class="starred"><input id="starred-'+fundCentre.groupFundsData[groupNum][key].id+'" class="starred-input" type="checkbox" value=""><label class="feaeae" for="starred-'+fundCentre.groupFundsData[groupNum][key].id+'"></label><span class="starredAgain" style="display:none">0</span>';
		}
		r+= '</td><td class="t-Risk riskRate risk-'+fundCentre.groupFundsData[groupNum][key].risk+'">';
		r+= fundCentre.groupFundsData[groupNum][key].risk;
		r+= '</td><td class="leftAlign name">';
		r+= '<span class="fundName">'+fundCentre.groupFundsData[groupNum][key].name+'</span>' + '<span class="hidden">('+fundCentre.groupFundsData[groupNum][key].id+")</span>";
		if (fundCentre.groupFundsData[groupNum][key].url.length > 5){
		r+= '</td><td class="t-Factsheet"><a href="'+fundCentre.groupFundsData[groupNum][key].url+'?t='+$.now()+'"  onclick="logGAEvent(\'Fund Prices\', \'Download PDF\',\''+fundCentre.groupFundsData[groupNum][key].name+'\')" download="Fund Factsheet - '+fundCentre.groupFundsData[groupNum][key].name+'"><img alt=\"Loading\" src=\"/uploadedImages/retail/images/pdf-icon.png\"></a>';
		}else{
		r+= '</td><td class="t-Factsheet">';
		}
		 r+= '</td><td class="t-CSV">';
		 r+= '<span class="CSV"><a href="javascript:void(0);" onclick="downloadCSV(\''+fundCentre.groupFundsData[groupNum][key].id+'\',\''+fundCentre.groupFundsData[groupNum][key].name+'\');"><img alt=\"Loading\" src=\"/uploadedImages/retail/images/excel-icon.png\"></a>';
		r+= '</td><td>&euro;';
		r+= fundCentre.groupFundsData[groupNum][key].latest;
		r+= '</td><td>';
		r+= fundCentre.groupFundsData[groupNum][key].fmc;
		r+= '%</td><td class="'+fc(fundCentre.groupFundsData[groupNum][key].yearToDateGrowth)+'">';
		r+= fundCentre.groupFundsData[groupNum][key].yearToDateGrowth;
		r+= '</td><td class="'+fc(fundCentre.groupFundsData[groupNum][key].sinceLaunchGrowth)+'">';
		r+= fundCentre.groupFundsData[groupNum][key].sinceLaunchGrowth;
		r+= '</td><td class="t-1M visCol '+fc(fundCentre.groupFundsData[groupNum][key].lastMonthGrowth)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].lastMonthGrowth;
		r+= '</td><td class="t-3M visCol '+fc(fundCentre.groupFundsData[groupNum][key].threeMonthGrowth)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].threeMonthGrowth;
		r+= '</td><td class="t-6M visCol '+fc(fundCentre.groupFundsData[groupNum][key].sixMonthGrowth)+'" colspan="2" >';
		r+= fundCentre.groupFundsData[groupNum][key].sixMonthGrowth;
		r+= '</td><td class="t-12M visCol '+fc(fundCentre.groupFundsData[groupNum][key].last12Months)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last12Months;
		r+= '</td><td class="t-3Y visCol '+fc(fundCentre.groupFundsData[groupNum][key].last3Years)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last3Years;
		r+= '</td><td class="t-5Y visCol '+fc(fundCentre.groupFundsData[groupNum][key].last5years)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last5years;
		r+= '</td><td class="t-10Y visCol '+fc(fundCentre.groupFundsData[groupNum][key].last10Years)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last10Years;
		r+= '</td><td class="t-3YA visCol '+fc(fundCentre.groupFundsData[groupNum][key].last3YearsAnn)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last3YearsAnn;
		r+= '</td><td class="t-5YA visCol '+fc(fundCentre.groupFundsData[groupNum][key].last5yearsAnn)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last5yearsAnn;
		r+= '</td><td class="t-10YA visCol '+fc(fundCentre.groupFundsData[groupNum][key].last10YearsAnn)+'" colspan="2" style="display:none;">';
		r+= fundCentre.groupFundsData[groupNum][key].last10YearsAnn;
		r+= '</td>';

		if ($.inArray(fundCentre.groupFundsData[groupNum][key].id, holdChtFundsArr) >= 0)
		{
			r+= '<td class="charted"><input id="charted-'+fundCentre.groupFundsData[groupNum][key].id+'" class="charted-input" type="checkbox" checked ><label class="feaeaea chart-on" for="charted-'+fundCentre.groupFundsData[groupNum][key].id+'"></label><span class="chartAgain" style="display:none">0</span></td>';
		}
		else
		{
			r+= '<td class="charted"><input id="charted-'+fundCentre.groupFundsData[groupNum][key].id+'" class="charted-input" type="checkbox"><label class="feaeaea" for="charted-'+fundCentre.groupFundsData[groupNum][key].id+'"></label><span class="chartAgain" style="display:none">0</span></td>';
		}
		r+= '</tr>';
	}
	r+= '</tbody></table>';
	return r;
		 
}
openSection = function(id){
	var h = drawGroupFundSingleTable(id);
	//console.log("v "+fundCentre.groupFundsData.length);
	
	for (var i=0;i<fundCentre.groupFundsData.length;i++){
		//$('.tableBlock-'+i).html('');
	}
	$('.tableBlock-'+id).hide().html(h).fadeIn('slow');
	$('.panel-block-arrowup'+id).toggle();
	$('.panel-block-arrowdown'+id).toggle();

}

drawGroupFundTable = function(){

		
	var q = '';
	for (var i=0;i<fundCentre.groupFundsData.length;i++)
	{
	
		var r, j = -1, size = fundCentre.groupFundsData[i].length;
		
		
		if (size >1){
				
			r= '<section class=""><p class="fund-price-title title" data-section-title>\
			<a class="panel-block" href="javascript:void(0);" onclick="openSection('+i+');">\
			<i class="panel-block-arrowdown'+i+' fa fa-chevron-down"></i>\
			<i class="panel-block-arrowup'+i+' fa fa-chevron-up" style="display:none;"></i>&nbsp;\
			<span style="font-size:1.4em;font-weight:bold">'+fundCentre.fundGroupNamesLimits[i]+'</span>\
			<span class="section-fundcount right" style="background-color: #D5D5D5;border: 1px solid #A5A5A5;\
			border-radius: 6px;padding: 0.2em;text-align: center;width: 8em;">'+size+' funds</span>\
			</a></p><div class="content" data-section-content>';
			r+= '<div class="tableBlock-'+i+'" >';
			r+= '</div></div></section>';
			q+= r;
		 }
	 }
	var helpPanel = '<div class="row help-panel panel radius">\
					<a href="javascript:void(0)" class="help-panel-show" style="font-size:2em" >Show Help</a><span class="help-panel-holder" style="display:none;">\
					<span class="right"><a href="javascript:void(0)" class="help-panel-close"><i class="fa fa-times"></i></a></span>\
					<div class="large-12 large-centered"><h2>Getting Started</h2></div>\
					<div class="large-4 columns"><h4>1. Select the fund group below</h3>\
					<img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/fund-banner-1.png"></div>\
					<div class="large-4 columns"><h4>2. Set favourites/Funds for charting</h3>\
					<img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/fund-banner-2.png"></div>\
					<div class="large-4 columns"><h4>3. Show favourites or fund chart</h3>\
					<img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/fund-banner-3.png"></div>\
					</span></div>';
	var accStart = helpPanel+'<div class="section-container accordion" data-section="accordion">';
	var accEnd = '</div>';
	 // Store the html elements in arrays and join them together and then
	 // push them out to the DOM in 1 go. Much better performance
	 $('#fundCentreContents').html(accStart+q+accEnd);
	 $('.tableBlock-0').show();
	 if(typeof fundCentre.columnsClosed !== "undefined"){
		 if(fundCentre.columnsClosed[0].toLowerCase() != 'false'){
			for(i=0; i<=fundCentre.columnsClosed.length; i++){
				$('.'+fundCentre.columnsClosed[i]).addClass('hidden');
			}
		}
	}			
	
	var selectMenu = '<ul id="dropmain" class="f-dropdown" data-dropdown-content>\
		<li><a href="#" onclick="showColumn(\'t-1M\');return false;">Last Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3M\');return false;">3 Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-6M\');return false;">6 Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-12M\');return false;">1 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3Y\');return false;">3 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-5Y\');return false;">5 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-10Y\');return false;">10 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3YA\');return false;">3 Years Annualised Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-5YA\');return false;">5 Years Annualised Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-10YA\');return false;">10 Years Annualised Growth</a></li>\
		</ul>';
		
	$('#fundCentreContents').append(selectMenu);
	$('.help-panel-holder').hide();
}



$(document).on('click', '.help-panel-show', function(){
	$('.help-panel-show').hide();
	$('.help-panel-holder').slideDown('slow');
});



$(document).on('click', '.help-panel-close', function(){
	$('.help-panel-holder').slideUp('slow', function(){
	$('.help-panel-show').show();
	});
});


$(document).on('click', '.toggleFav', function(){
	$('.favourite-false').toggle();
});


//####################################################################
// listen to see if the button to show the fund categories has 
// been clicked
$(document).on('click', '.showProductCategory', function(){
	getFundCategoryList();
});

$(document).on('click', '.showFundsChart', function(){
	displayChart(fundCentre.chartCookieFunds);
	// 
	
});
$(document).on('click', '.showProductChart', function(){
	fundCentre._setShowProductChartStatus(true);
	displayChart(fundCentre.productChartCookieFunds);
	
});

displayChart = function(funds){

	updateChartURLHash(funds);
	
	if (funds.length>0){
    //$('.pageHolder').hide();
	// pull down the fund price data
	// open a modal window
	var drawChartBox = 	'<h3>Downloading Funds</h3>'+
						'<img alt="Loading" src="https://www.irishlife.ie/secureWeb/uploadedImages/ajax-loader.gif">';
	
	if ($('#chartModal').length <=0){
	// draw chart
		var myModal = 	'<div id="chartModal" class="reveal-modal xlarge"  style="min-height:520px">'+
						'<a class="close-reveal-modal">&#215;</a>'+
						'<div class="drawChartBox" style="min-width:100%;">'+
						drawChartBox+
						'</div><div class="drawChartBoxTable"><img alt=\"Loading\" src=\"https://www.irishlife.ie/secureWeb/uploadedImages/ajax-loader.gif\"></div>'+						
						'</div>';

		$('body').append(myModal);   
		
    }
	else{
	$('.drawChartBox').html(drawChartBox);
	$('.drawChartBoxTable').html('');
	}
	$('#chartModal').foundation('reveal', {animation: 'none'});
	$('#chartModal').foundation('reveal', {
		 opened: function (){
		 
			getChartData(funds);
		 },
          closed: function () {
		  
		  
		  if(!fundCentre.showProductChartScreen){
				
				location.hash = '';
				
				if(fundCentre.showChartScreen){
					loadpage();
					
					fundCentre._setShowChartStatus(false);
				}
				
				if(fundCentre.showProductsOnly == 'true'){
		  
				
					//$('.pageHolder').show();
					// Doesn't have groups of funds, just show list of products
				}else
				{
		  
				
					// showDefaultFunds();

				}
			}else
			{			
				
				
				location.hash = '';
				//$('.pageHolder').show();
				fundCentre._setShowProductChartStatus(false);
			}
		  }
		  
     });
	 
	$('#chartModal').foundation('reveal', 'open');
	 }
	 else{
	 
				
			a.alert("<h4>No funds to display. Select up to 5 funds.</h4>");
			location.hash = '';
	 }

}

// store the chart data
fundCentre.fundChartDataCollected = [];

getChartData = function(funds){
	fundCentre.fundChartDataCollected =[''];
	// var fundsSelected = fundsChartStoredArray;
	var countFinish = funds.length;
	var count = 0;
	 
	//$('#fundsChartChart').html("<h2>LOADING...</h2><div class=\"progress supplementary\"><span class=\"meter\" style=\"width:0%\"></span></div>");
	$.each(funds, function(z, id) {
		if(this.length>=3){ // fund names must be 3 or 4 chars
			$.getJSON('/servlet/fundpricejson?fund='+id, function (data, error){

			})
			.done(function ( data ) {
				fundCentre.fundChartDataCollected[z] = {
					id: id,
					data: data
				};
				
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				a.alert("Error retrieving the fund information. Refresh the page or if the problem persists try again later");
			})
			.always(function ( dataORjqXHR, textStatus, jqXHRORerrorThrown) {
			count++;
			$('.drawChartBoxTable').html('<div class="progress large-12 radius expand"><span class="meter" style="width: '+Math.floor(50*(count/countFinish))+'%"></span></div>');
			//$('.drawChartBoxTable').html("Downloading fund prices: "+Math.floor(50*(count/countFinish))+"%");
			// 
			if(count == countFinish){
				// 
				getChartFundSpecificData(funds);
			}else{
			
			}
			

				
				/*
				if(getDataCounter() == fundsSelected.length){
					drawChart();					
					$('#fundsTableBody').show();
					$('.hideChartClose').show();
				}
				*/
			});
		}
	});
	// 
}
getChartFundSpecificData = function(funds){

	// var fundsSelected = fundsChartStoredArray;
	var countFinish = funds.length;
	var count = 0;
	
	$.each(funds, function(z, name) {
		if(this.length>=3){ // fund names must be 3 or 4 chars
			$.get('/servlet/jsonFund.jsp?page=prices&fund='+name, function (data, error){

			})
			.done(function ( data ) {
				var myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
				fundCentre.fundChartDataCollected[z].risk = myJSON[0].funds[0].risk;
				fundCentre.fundChartDataCollected[z].name = myJSON[0].funds[0].name;
				fundCentre.fundChartDataCollected[z].fmc = myJSON[0].funds[0].fmc;
				fundCentre.fundChartDataCollected[z].priceDate = myJSON[0].funds[0].priceDate;
				fundCentre.fundChartDataCollected[z].url = myJSON[0].funds[0].url;
				fundCentre.fundChartDataCollected[z].latest = myJSON[0].funds[0].latest;
				fundCentre.fundChartDataCollected[z].yearToDateGrowth = myJSON[0].funds[0].yearToDateGrowth;
				fundCentre.fundChartDataCollected[z].sinceLaunchGrowth = myJSON[0].funds[0].sinceLaunchGrowth;
				fundCentre.fundChartDataCollected[z].lastMonthGrowth = myJSON[0].funds[0].lastMonthGrowth;
				fundCentre.fundChartDataCollected[z].threeMonthGrowth = myJSON[0].funds[0].threeMonthGrowth;
				fundCentre.fundChartDataCollected[z].sixMonthGrowth = myJSON[0].funds[0].sixMonthGrowth;
				fundCentre.fundChartDataCollected[z].last12Months = myJSON[0].funds[0].last12Months;
				fundCentre.fundChartDataCollected[z].last3Years = myJSON[0].funds[0].last3Years;
				fundCentre.fundChartDataCollected[z].last5years = myJSON[0].funds[0].last5years;
				fundCentre.fundChartDataCollected[z].last10Years = myJSON[0].funds[0].last10Years;
				fundCentre.fundChartDataCollected[z].last3YearsAnn = myJSON[0].funds[0].last3YearsAnn;
				fundCentre.fundChartDataCollected[z].last5yearsAnn = myJSON[0].funds[0].last5yearsAnn;
				fundCentre.fundChartDataCollected[z].last10YearsAnn = myJSON[0].funds[0].last10YearsAnn;
				
				
				
				//xx = myJSON[0].funds[0];
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				a.error("error, try again later");
			})
			.always(function ( dataORjqXHR, textStatus, jqXHRORerrorThrown) {
			
			count++;
			$('.drawChartBoxTable').html('<div class="progress large-12 radius expand"><span class="meter" style="width: '+Math.floor(50+(50*(count/countFinish)))+'%"></span></div>');
			
			if(count == countFinish){
				// this is the only one that counts #feb 14th  
				//drawChart();
				if(typeof Highcharts === "undefined"){
					loadHighstockJS();
				}else
				{
					drawChart();
				}
				addChartFundTable();
			}
			

				
				/*
				if(getDataCounter() == fundsSelected.length){
					drawChart();					
					$('#fundsTableBody').show();
					$('.hideChartClose').show();
				}
				*/
			});
		}
	});
}
addChartFundTable = function(){

	$('.drawChartBoxTable').html('');
	// 
		// fundCentre.productGroupSeperateNames - all data held in this array
		var selectMenuLink = '<a href="javascript:void(0);" data-dropdown="dropChart" data-options="is_hover:true">\
		<i class="fa fa-chevron-circle-down"></i></a>';
		var selectMenu = '<ul id="dropChart" class="f-dropdown" data-dropdown-content>\
		<li><a href="#" onclick="showColumn(\'t-1M\');return false;">Last Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3M\');return false;">3 Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-6M\');return false;">6 Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-12M\');return false;">1 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3Y\');return false;">3 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-5Y\');return false;">5 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-10Y\');return false;">10 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3YA\');return false;">3 Years Annualised Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-5YA\');return false;">5 Years Annualised Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-10YA\');return false;">10 Years Annualised Growth</a></li>\
		</ul>';
		
	var tableHeader=
			'<table class="dataList"><thead>\
				<tr>\
					<th width="0%" style="display:none;"></th>\
					<th class="t-Risk" width="5%">Risk</th>\
					<th class="t-Name leftAlign" >Name</th>\
					<th class="t-Factsheet" width="10%">Fact sheet</th>\
					<th class="t-CSV" width="5%">CSV</th>\
					<th class="t-Price" width="10%">Price</th>\
					<th class="t-FMC" width="10%">Charge</th>\
					<th class="t-YTD" width="10%">YTD</th>\
					<th class="t-Launch" width="10%">Since Launch</th>\
					<th class="visCol t-1M" style="display:none;" width="15%">Last Months</th>\
					<th class="visCol t-3M" style="display:none;" width="15%">3 Months</th>\
					<th class="visCol t-6M" style="display:none;" width="15%">6 Months</th>\
					<th class="visCol t-12M" style="display:none;" width="15%">1 Year</th>\
					<th class="visCol t-3Y" style="display:none;" width="15%">3 Years</th>\
					<th class="visCol t-5Y" style="display:none;" width="15%">5 Years</th>\
					<th class="visCol t-10Y" style="display:none;" width="15%">10 Years</th>\
					<th class="visCol t-3YA" style="display:none;" width="15%">3 Years Annualised</th>\
					<th class="visCol t-5YA" style="display:none;" width="15%">5 Years Annualised</th>\
					<th class="visCol t-10YA" style="display:none;" width="15%">10 Years Annualised</th>\
					<th class="visColDrop" style="display:none;" width="15%">'+selectMenuLink+'</th>\
				</tr></thead><tbody class=\"list\">';
				
			
			var r, j = -1, size = fundCentre.fundChartDataCollected.length;
				r='';
				if (size >=1){
						 r+= tableHeader;
					 for (var key=0;  key<size; key++){
						 r+= '<tr><td style="display:none"></td>';
						 r+= '<td class="t-Risk riskRate risk-'+fundCentre.fundChartDataCollected[key].risk+'"> ';
						 r+= fundCentre.fundChartDataCollected[key].risk;
						 r+= '</td><td class="leftAlign">';
						 r+= '<span class="fundName">'+fundCentre.fundChartDataCollected[key].name+'</span>' + '<span class="hidden">('+fundCentre.fundChartDataCollected[key].id+")</span>";
						 
						 if (fundCentre.fundChartDataCollected[key].url.length > 5){
							r+= '</td><td class="t-Factsheet"><a href="'+fundCentre.fundChartDataCollected[key].url+'?t='+$.now()+'" download="Fund Factsheet - '+fundCentre.fundChartDataCollected[key].name+'" onclick="logGAEvent(\'Fund Prices\', \'Download PDF\',\''+fundCentre.fundChartDataCollected[key].name+'\')" ><img alt=\"Loading\" src=\"/uploadedImages/retail/images/pdf-icon.png\"></a>';
						 }else{
							r+= '</td><td class="t-Factsheet">';
						 }
						 r+= '</td><td class="t-CSV">';
						 r+= '<span class="CSV"><a href="javascript:void(0);" onclick="downloadCSV(\''+fundCentre.fundChartDataCollected[key].id+'\',\''+fundCentre.fundChartDataCollected[key].name+'\');"><img alt=\"Loading\" src=\"/uploadedImages/retail/images/excel-icon.png\"></a>';
						 r+= '</td><td>&euro;';
						 r+= fundCentre.fundChartDataCollected[key].latest;
						 r+= '</td><td>';
						 r+= fundCentre.fundChartDataCollected[key].fmc;
						 
						 r+= '%</td><td class="'+fc(fundCentre.fundChartDataCollected[key].yearToDateGrowth)+'">';
						 r+= fundCentre.fundChartDataCollected[key].yearToDateGrowth;
						 r+= '</td><td class="'+fc(fundCentre.fundChartDataCollected[key].sinceLaunchGrowth)+'">';
						 r+= fundCentre.fundChartDataCollected[key].sinceLaunchGrowth;
						 r+= '</td><td class="t-1M visCol '+fc(fundCentre.fundChartDataCollected[key].lastMonthGrowth)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].lastMonthGrowth;
						 r+= '</td><td class="t-3M visCol '+fc(fundCentre.fundChartDataCollected[key].threeMonthGrowth)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].threeMonthGrowth;
						 r+= '</td><td class="t-6M visCol '+fc(fundCentre.fundChartDataCollected[key].sixMonthGrowth)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].sixMonthGrowth;
						 r+= '</td><td class="t-12M visCol '+fc(fundCentre.fundChartDataCollected[key].last12Months)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last12Months;
						 r+= '</td><td class="t-3Y visCol '+fc(fundCentre.fundChartDataCollected[key].last3Years)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last3Years;
						 r+= '</td><td class="t-5Y visCol '+fc(fundCentre.fundChartDataCollected[key].last5years)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last5years;
						 r+= '</td><td class="t-10Y visCol '+fc(fundCentre.fundChartDataCollected[key].last10Years)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last10Years;
						 r+= '</td><td class="t-3YA visCol '+fc(fundCentre.fundChartDataCollected[key].last3YearsAnn)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last3YearsAnn;
						 r+= '</td><td class="t-5YA visCol '+fc(fundCentre.fundChartDataCollected[key].last5yearsAnn)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last5yearsAnn;
						 r+= '</td><td class="t-10YA visCol '+fc(fundCentre.fundChartDataCollected[key].last10YearsAnn)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.fundChartDataCollected[key].last10YearsAnn;
						 r+= '</td></tr>';
						 
					 }
				 }
				 
			 			xx=fundCentre.fundChartDataCollected;
					r+= '</tbody></table></div>';
				 
				// fundCentre.fundChartDataCollected[0]+
				$('.drawChartBoxTable').html(r);
				
				if(typeof fundCentre.columnsClosed !== "undefined"){
					if(fundCentre.columnsClosed[0].toLowerCase() != 'false'){
						for(i=0; i<=fundCentre.columnsClosed.length; i++){
							$('.'+fundCentre.columnsClosed[i]).addClass('hidden');
							
						}
					}
				}
				$('.drawChartBoxTable').append(selectMenu);
				
			
	// 
}

drawChart = function(){

		$('.drawChartBox').highcharts('StockChart', {
		    
		colors: ['#435399', '#f19c2b', '#5cc151', '#cc092f', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4'],
		credits: {enabled: false},
   chart: {
			marginRight: 320,
			borderRadius: 0, 
			borderWidth: 3,
			minWidth:100,
			height:450,
			borderColor: "#eeeeee"
		    },

	    rangeSelector: {
	    	buttonTheme: { // styles for the buttons
	    		fill: 'none',
	    		'stroke-width': 1,
	    		r: 0,
	    		style: {
	    			color: '#435399',
	    			fontWeight: 'normal'
	    		},
	    		states: {
	    			hover: {
						fill: '#F4AA00',
	    				style: {
	    					color: 'white'
	    				}
	    			},
	    			select: {
	    				fill: '#435399',
	    				style: {
	    					color: 'white'
	    				}
	    			}
	    		}
	    	},
	    	inputStyle: {
	    		color: '#435399',
	    		fontWeight: 'bold'
	    	},
	    	labelStyle: {
	    		color: '#4d4e53',
	    		fontWeight: 'bold'
	    	},
	    	selected: 2
	    },

		    yAxis: {
				title: {
					text: 'Percentage %'
				},
		    	labels: {
		    		formatter: function() {
		    			return (this.value > 0 ? '+' : '') + this.value + '%';
		    		}
		    	},
		    	plotLines: [{
		    		value: 0,
		    		width: 1,
		    		color: 'silver'
		    	}]
		    },
		    
		    plotOptions: {
		    	series: { 
		    		compare: 'percent'
		    	}
		    },
		    
		    tooltip: {
				followPointer: true,
		    	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
		    	valueDecimals: 2
		    },
		    
			legend: {
				enabled: true,
				align: 'right',
				floating: false,
				padding: 2,
				backgroundColor: '#efefef',
				borderColor: '#4d4e53',
				borderWidth: 1,
				layout: 'vertical',
				borderRadius : 2,
				verticalAlign: 'top',
				y: 100,
				x: 0,
				width:300,
				shadow: true
			},
		    series: fundCentre.fundChartDataCollected
		});
		
		
		window.scrollTo(0, 0);
		
}

//#####################################################################
// Here we are getting the fund product categories  
getFundCategoryList = function(){

//
	
	updateProdChartCookie();
	
		
		
		
		
	var mySelectList;
	
	
	$.get('/servlet/jsonFund.jsp?group='+fundCentre.productGroup+'&page=groups', function (data, error){
				
			})
			.done(function ( data ) {
				var myJSON;
				myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
				
				fundCentre._setProductCategorys(myJSON);
				
				showFundCategoryList();
				
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				a.error('Error, refresh or try again later')
			});
}


//#####################################################################
// Here we are getting the fund product categories  
showFundCategoryList = function(){
	// console.log("show categories");
	
	var mySelectList = "<select id=\"fundCategory\"><option selected=\"selected\" value=\"0\">Pick a Product</option>";
	$.each(fundCentre.productCategorys[0].funds, function(key, val) {
		mySelectList += "<option value=\""+val.id+"\">"+val.name+"</option>";
	});
	mySelectList += "</select>";
					
	$('#fundCategorySelect').html(mySelectList);
	
	$('#fundCategory').change(function() {
	
	var emptyProdCht  = new Array();
	fundCentre._setProductChartCoookieFunds(emptyProdCht);
	getFundCategoryProductData($(this).val(),$("#fundCategory option:selected").text());
	/*
		
		tempFundsForURL = fundsChartStoredArray;					
		fundsChartStoredArray = [];
		fundsChartSessionArray = [];
		

		getProductFundPrices($(this).val(),$("#fundCategory option:selected").text());
		*/
	});
}

//#####################################################################
// Here we are getting the fund product categories  
getFundCategoryProductData = function(id, name){
	// hideChart();
	$('#fundCentreProductContents').html('');
	
	//$('#fundsTableBody').html("<img alt=\"Loading\" src=\"https://www.irishlife.ie/secureWeb/uploadedImages/ajax-loader.gif\"> Loading Funds, Please Wait.");
	// console.log("1 "+id+ " "+name);
	var len = fundCentre.fundCategoryProductDataHeader.length, pullDown = false,showIndex=0;
	if (len>0)
	{
		for (var key=0;  key<len; key++){
		// loop through the array of product categories' data
		var check = false;
		var x = fundCentre.fundCategoryProductDataHeader[key]; // the current set of product categories
			if (x.id == id){
				// x is the 
				// console.log("2 x "+x.index);
				check = true;
				showIndex = x.index; // use this var to select the stored dataset to show
				drawProductCategoryFunds(showIndex); // we have it so show it!
				break;
				// we already have this information
			}
		}
		if(check==false)
		{
			showIndex = len;
			pullDown = true;
		}
	}
	else
	{
		showIndex = 0;
		pullDown = true;
	}
		
	
	// console.log("3 "+id+ " "+name+ " "+ showIndex);
	
	if(pullDown){
		var jqxhr = $.get( "/servlet/jsonFund.jsp?group="+id+"&page=prices ", function() {
			})
			.done(function(data) {
				var myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
				
				// now that we have it, store and show it
				fundCentre._setFundCategoryProductData(id,name,myJSON);
				drawProductCategoryFunds(showIndex); 
				
			})
			.fail(function(jqxhr, textStatus, error ) {a.error("Error loading all funds. Refresh or try later."); })	
	}
	
}
showColumn = function(col){
	
	$('.visCol').hide();
	$('.'+col).show();
	$('#drop1').foundation('dropdown', 'close', $('#drop1'))
	$('#dropChart').foundation('dropdown', 'close', $('#dropChart'))
	$('#dropmain').foundation('dropdown', 'close', $('#dropmain'))
}

downloadCSV = function(fundID,fundName){
	open('http://www.irishlife.ie/servlet/fundpricejson?fund='+fundID+'&fundName='+fundName+'&csv=Y');
	logGAEvent('Fund Prices', 'Download CSV', ''+fundID +' - '+ fundName);
	
}

	
logGAEvent = function(category,action,label){
	
	if (_gaq) _gaq.push(['_trackEvent', category, action, label]);  
	
}
drawProductCategoryFunds = function(showIndex){

	$('#fundCentreProductContents').html('');
// fundCentre.groupFundsData
	var productFunds = fundCentre.fundCategoryProductData[showIndex];

	// set them up productGroupNames
	var nameLen = fundCentre.productGroupNames.length;
	var fundLen = productFunds[0].funds.length;
	//alert(nameLen);
	
	// for length of product groups set up holding arrays
	for (i=0;i<nameLen; i++){
		fundCentre.productGroupSeperateNames[i] = [];//.push({id: currentFundGroup});
	}
	
	// add them
	var q = '';
	
	// run through each fund and put into correct holding array
	 for (var key=0;  key<fundLen; key++){
			var id = selectProductGroup(productFunds[0].funds[key].order,productFunds[0].funds[key].grouping);
			if (fundCentre.productGroupSeperateNames.length == 1)
			{
				id =0;
			}
			
			//fundCentre.productGroupSeperateNames[id] = 
			fundCentre.productGroupSeperateNames[id].push({
				group: productFunds[0].funds[key].group,
				id: productFunds[0].funds[key].id,
				priceDate: productFunds[0].funds[key].priceDate,
				order: productFunds[0].funds[key].order,
				grouping: productFunds[0].funds[key].grouping,
				url: productFunds[0].funds[key].url,
				risk: productFunds[0].funds[key].risk,
				name: productFunds[0].funds[key].name,
				latest: productFunds[0].funds[key].latest,
				fmc: productFunds[0].funds[key].fmc,
				yearToDateGrowth: productFunds[0].funds[key].yearToDateGrowth,
				sinceLaunchGrowth: productFunds[0].funds[key].sinceLaunchGrowth,
				lastMonthGrowth: productFunds[0].funds[key].lastMonthGrowth,
				threeMonthGrowth: productFunds[0].funds[key].threeMonthGrowth,
				sixMonthGrowth: productFunds[0].funds[key].sixMonthGrowth,
				last12Months: productFunds[0].funds[key].last12Months,
				last3Years: productFunds[0].funds[key].last3Years,
				last5years: productFunds[0].funds[key].last5years,
				last10Years: productFunds[0].funds[key].last10Years,
				last3YearsAnn: productFunds[0].funds[key].last3YearsAnn,
				last5yearsAnn: productFunds[0].funds[key].last5yearsAnn,
				last10YearsAnn: productFunds[0].funds[key].last10YearsAnn
			});
			
		 }
	//xx = fundCentre.productGroupSeperateNames;
	
	// display them
	for (i=0;i<nameLen; i++){ // loop each holding array	
	 // console.log("##### "+i+" of "+nameLen+" ##### - "+fundCentre.productGroupNames[i]);
		// fundCentre.productGroupSeperateNames - all data held in this array
		var selectMenuLink = '<a href="javascript:void(0);" data-dropdown="drop1" data-options="is_hover:true"><i class="fa fa-chevron-circle-down"></i></a>';
		var selectMenu = '<ul id="drop1" class="f-dropdown" data-dropdown-content>\
		<li><a href="#" onclick="showColumn(\'t-1M\');return false;">Last Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3M\');return false;">3 Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-6M\');return false;">6 Month Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-12M\');return false;">1 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3Y\');return false;">3 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-5Y\');return false;">5 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-10Y\');return false;">10 Years Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-3YA\');return false;">3 Years Annualised Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-5YA\');return false;">5 Years Annualised Growth</a></li>\
		<li><a href="#" onclick="showColumn(\'t-10YA\');return false;">10 Years Annualised Growth</a></li>\
		</ul>';

		if (fundCentre.productGroupSeperateNames[i].length>0)
		var tableHeader=
			'<table class="dataList"><thead>\
				<th class="fundOptionsHeader" colspan="3"><h5>'+fundCentre.productGroupNames[i]+'</h5></th>\
				<th class="fundOptionsHeader" colspan="3">Performance @ '+fundCentre.productGroupSeperateNames[i][0].priceDate+'</th>\
				<th class="fundOptionsHeader" colspan="100%">\
				<ul class="button-group right">\
					<li><a href="javascript:void(0);" class="showProductChart">Show Chart</a></li>\
				</ul>\
				</th>\
				<tr>\
					<th style="display:none;" width="0%"></th>\
					<th style="display:none" class="t-Risk" width="5%">Risk</th>\
					<th class="t-Name leftAlign" >Name</th>\
					<th class="t-Factsheet" width="5%">Fact sheet</th>\
					<th class="t-CSV" width="5%">CSV</th>\
					<th class="t-Price " width="8%">Price</th>\
					<th class="t-FMC" width="7%">Charge</th>\
					<th class="t-YTD" width="7%">YTD</th>\
					<th class="t-Launch" width="7%">Since Launch</th>\
					<th class="visCol t-1M" style="display:none;" width="15%">Last Months</th>\
					<th class="visCol t-3M" style="display:none;" width="15%">3 Months</th>\
					<th class="visCol t-6M" width="15%">6 Months</th>\
					<th class="visCol t-12M" style="display:none;" width="15%">1 Year</th>\
					<th class="visCol t-3Y" style="display:none;" width="15%">3 Years</th>\
					<th class="visCol t-5Y" style="display:none;" width="15%">5 Years</th>\
					<th class="visCol t-10Y" style="display:none;" width="15%">10 Years</th>\
					<th class="visCol t-3YA" style="display:none;" width="15%">3 Years Annualised</th>\
					<th class="visCol t-5YA" style="display:none;" width="15%">5 Years Annualised</th>\
					<th class="visCol t-10YA" style="display:none;" width="15%">10 Years Annualised</th>\
					<th class="visColDrop" width="5%">'+selectMenuLink+'</th>\
					<th class="t-Chart" width="7%">Chart List</th>\
				</tr></thead><tbody class=\"list\">';
				

				// xx[0].funds[0].id
				var r /*= new Array()*/, j = -1, size = fundCentre.productGroupSeperateNames[i].length;
				if (size >1){
						 r= tableHeader;
					 for (var key=0;  key<size; key++){
						 r+= '<tr><td style="display:none"></td>';
				   		 r+= '<td data-id="'+fundCentre.productGroupSeperateNames[i][key].id+'" style="DISPLAY: none" class="id"></td>';
						 r+= '<td style="display:none" class="t-Risk riskRate risk-'+fundCentre.productGroupSeperateNames[i][key].risk+'"> ';
						 r+= fundCentre.productGroupSeperateNames[i][key].risk;
						 r+= '</td><td class="leftAlign name">';
						 r+= '<span class="fundName">'+fundCentre.productGroupSeperateNames[i][key].name+'</span>' + '<span class="hidden"> ('+fundCentre.productGroupSeperateNames[i][key].id+")</span>";
						 
						 if (fundCentre.productGroupSeperateNames[i][key].url.length > 5){
							r+= '</td><td class="t-Factsheet"><a href="'+fundCentre.productGroupSeperateNames[i][key].url+'?t='+$.now()+'" download="Fund Factsheet - '+fundCentre.productGroupSeperateNames[i][key].name+'" onclick="logGAEvent(\'Fund Prices\', \'Download PDF\',\''+fundCentre.productGroupSeperateNames[i][key].name+'\')"><img alt=\"Loading\" src=\"/uploadedImages/retail/images/pdf-icon.png\" ></a>';
						 }else{
							r+= '</td><td class="t-Factsheet">';
						 }
						 
						 r+= '</td><td class="t-CSV">';
						 r+= '<span class="CSV"><a href="javascript:void(0);" onclick="downloadCSV(\''+fundCentre.productGroupSeperateNames[i][key].id+'\',\''+fundCentre.productGroupSeperateNames[i][key].name+'\');"><img alt=\"Loading\" src=\"/uploadedImages/retail/images/excel-icon.png\"></a>';
						 r+= '</td><td>&euro;';
						 r+= fundCentre.productGroupSeperateNames[i][key].latest;
						 r+= '</td><td>';
						 r+= fundCentre.productGroupSeperateNames[i][key].fmc;
						 r+= '%</td><td class="'+fc(fundCentre.productGroupSeperateNames[i][key].yearToDateGrowth)+'">';
						 r+= fundCentre.productGroupSeperateNames[i][key].yearToDateGrowth;
						 r+= '</td><td class="'+fc(fundCentre.productGroupSeperateNames[i][key].sinceLaunchGrowth)+'">';
						 r+= fundCentre.productGroupSeperateNames[i][key].sinceLaunchGrowth;
						 r+= '</td><td class="t-1M visCol '+fc(fundCentre.productGroupSeperateNames[i][key].lastMonthGrowth)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].lastMonthGrowth;
						 r+= '</td><td class="t-3M visCol '+fc(fundCentre.productGroupSeperateNames[i][key].threeMonthGrowth)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].threeMonthGrowth;
						 r+= '</td><td class="t-6M visCol '+fc(fundCentre.productGroupSeperateNames[i][key].sixMonthGrowth)+'" colspan="2" >';
						 r+= fundCentre.productGroupSeperateNames[i][key].sixMonthGrowth;
						 r+= '</td><td class="t-12M visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last12Months)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last12Months;
						 r+= '</td><td class="t-3Y visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last3Years)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last3Years;
						 r+= '</td><td class="t-5Y visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last5years)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last5years;
						 r+= '</td><td class="t-10Y visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last10Years)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last10Years;
						 r+= '</td><td class="t-3YA visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last3YearsAnn)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last3YearsAnn;
						 r+= '</td><td class="t-5YA visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last5yearsAnn)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last5yearsAnn;
						 r+= '</td><td class="t-10YA visCol '+fc(fundCentre.productGroupSeperateNames[i][key].last10YearsAnn)+'" colspan="2" style="display:none;">';
						 r+= fundCentre.productGroupSeperateNames[i][key].last10YearsAnn;
						 r+= '</td>';

						 
						r+= '<td class="prod-charted"><input id="prod-charted-'+fundCentre.productGroupSeperateNames[i][key].id+'" class="prod-charted-input" type="checkbox" ><label class="feaeaea" for="prod-charted-'+fundCentre.productGroupSeperateNames[i][key].id+'"></label><span class="chartAgain" style="display:none">0</span></td>';
						
						r+= '</tr>';
						}
				 }
				 
			 
					r+= '</tbody></table></div>';
				 q+= r;
		 }
	 // Store the html elements in arrays and join them together and then
	 // push them out to the DOM in 1 go. Much better performance
	$('#fundCentreProductContents').html(q);

	 if(typeof fundCentre.columnsClosed !== "undefined"){
		 if(fundCentre.columnsClosed[0].toLowerCase() != 'false'){
			for(i=0; i<=fundCentre.columnsClosed.length; i++){
				$('.'+fundCentre.columnsClosed[i]).addClass('hidden');
			}
		}
	}
	$('#fundCentreProductContents').append(selectMenu);
	 

}

// Sort the product group names into correct order
// to be used on the product category section
selectProductGroup = function(orderNum, grouping){
	var currentProductGroup=0;
	if (orderNum <=10){
		currentFundGroup = 0;
	}else
	{
		if(grouping.toLowerCase() == 'i')
		{
			currentFundGroup = 1;
		}
		else if(grouping.toLowerCase() == 'f')
		{
			currentFundGroup = 2;
		}
		else if(grouping.toLowerCase() == 'b')
		{
			currentFundGroup = 3;
		}
	}
	
	return currentFundGroup;
}
// return the fund colour class based on the value 
fc = function(n)
{

var m = n.replace('%','');
//console.log("M: "+m);
	var r="";
	if (m>0)
	{
		r= "priceup";
	}
	else if (m<0){
		r = "pricedown";
	}
	else
	{
		r = "";
	}
	return r;
}


loadHighstockJS = function(){
	// $('.'+fundCentre.columnsClosed[0]).hide();
	$.getScript( "https://www.irishlife.ie/secureWeb/uploadedFiles/retail/_retail_[Responsive]/js/highstock.js" )
	.done(function( script, textStatus ) {
	
		drawChart();
		$.getScript( "https://www.irishlife.ie/secureWeb/uploadedFiles/retail/_retail_[Responsive]/js/exporting.js" );
		
	})
	.fail(function( jqxhr, settings, exception ) {
		//a.log( "there was an error drawing the chart." );
	});
	
}





// Load the holding panel to get started
if(fundCentre.showChartScreen){
		
		displayChart(fundCentre.URLFunds);
	}
	else{
		if(fundCentre.showProductsOnly == 'true'){
			
			
			var setupHTML = 
				  '<div class="row"><div class="large-11 large-centered columns"><div id="fundCategorySelect">Loading product list</div></div></div>\
				  <div id="fundCentreProductContents"></div>\
			</div>';
			$('#fundCentreWidget').html(setupHTML); 
			getFundCategoryList();
			// Doesn't have groups of funds, just show list of products
			// console.log('Just show the Products Fund List');
		}else
		{
			var setupHTML = 
			'<div class="section-container tabs" data-section="tabs"><section class="active" style="padding-top:46px">\
				<p class="title" style="font-size:1.3em" data-section-title><a href="#panel1"><i class="fa fa-bar-chart-o"></i> Fund Prices</a></p>\
				<div class="content" data-section-content>\
				  <div id="fundCentreContents"></div>\
				</div>\
			  </section>\
			  <section style="padding-top:46px">\
				<p class="title" style="font-size:1.3em" data-section-title><a class="showProductCategory" href="#panel2">\
				<i class="fa fa-list-alt"></i> Products</a></p>\
				<div class="content" data-section-content>\
				  <div id="fundCategorySelect" style="font-size: 1.3em;padding: 0.2em;"></div>\
				  <div id="fundCentreProductContents"></div>\
				</div>\
			  </section>\
			</div>';
			$('#fundCentreWidget').html(setupHTML); 
			// 
			showDefaultFunds();
		}
	}
	
	
	
	
// Load up the page
loadpage = function(){
	
// Does the URL have hash parameters
	if(window.location.hash) {
	
		var urlFavs = window.location.hash.split('#')[1].split("&");
		fundCentre._setURLFunds(urlFavs);
		fundCentre._setHashStatus(true);
	}
	else{
		
		fundCentre._setURLFunds('');
		// There are no hash params for favourite funds
		fundCentre._setHashStatus(false);
	}
	
	
	
	//#####################################################
	//             .---------------------------.
	//            /_   _   _         __  __   /|
	//           // \ / \ / \ |_/ | |_  (_   / |
	//          / \_  \_/ \_/ | \ | |__ ,_/ /  |
	//         :.__________________________/   /
	//         |  .--. .--.   .--.   .--.  |  /
	//         | (    )    ) (    ) (    ) | /
	//         |  '--' '--'   '--'   '--'  |/
	//         '---------------------------' 
	//######################################################
	// Read the cookies and store the information
	//######################################################
	
	
	// Read the Favourites Cookie
	if ($.cookie('favFundsStoredILFS') !=null)
	{
		fundCentre._setFavCookieStatus(true);
		
		var cookieHash = $.cookie('favFundsStoredILFS');
		// 
		var favFundsStored  = new Array();
			var favFundsStored = cookieHash.replace('#','').split(",");
			// 
			var result = jQuery.grep(favFundsStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
		});
		fundCentre._setFavCoookieFunds(favFundsStored);
	}
	else
	{
		fundCentre._setFavCookieStatus(false);
		fundCentre._setFavCoookieFunds(''); // nothing in cookie
	}
	
	// Read the saved charts cookie
	// Is there a cookie with stored saved chart funds?
	if ($.cookie('chtFundsStoredILFS') !=null)
	{
		fundCentre._setChartCookieStatus(true);
		
		var cookieHash = $.cookie('chtFundsStoredILFS');
			var chartFundsStored = cookieHash.replace('#','').split(",");
			var result = jQuery.grep(chartFundsStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
		});
		
		
		fundCentre._setChartCoookieFunds(result);
	}
	else
	{
		$.cookie('chtFundsStoredILFS','');
		
		fundCentre._setChartCookieStatus(false);
		var tempArr = new Array();
		fundCentre._setChartCoookieFunds(tempArr);
	}
	
	
	// Read the saved charts cookie for the products section
	// Is there a cookie with stored saved chart funds?
	/*
	if ($.cookie('chtFundsPrdStoredILFS') !=null)
	{
		fundCentre._setProductChartCoookieStatus(true);
		
		var cookieHash = $.cookie('chtFundsPrdStoredILFS');
			var chartProdStored = cookieHash.replace('#','').split("&");
			var result = jQuery.grep(chartProdStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
		});
		fundCentre._setProductChartCoookieFunds(result);
	}
	else
	{
		fundCentre._setProductChartCoookieStatus(false);
		fundCentre._setProductChartCoookieFunds('');
	}
	*/
	
	// E N D  C O O K I E S 
	// E N D  C O O K I E S 
	// E N D  C O O K I E S 
	//#########################################################
	
	
// +----------------------------------------------+
// |                    xx                        |
// |                    x x                       |
// |                   x  xx                      |
// |                   x   xx                     |
// |            xx    xx     x      xxx           |
// |           xxx    x      xxx   xx xxxxx       |
// |          xx x    x        xxxx       xxx     |
// |          x  x   x           xx         xx    |
// |         x   xx  x                       xxx  |
// |xx      xx    xxxx                         xxxx
// | xxx    x      xx                           xx|
// |   xxxxx                                      |
// +----------------------------------------------+
	
//#########################################################
//## The default view is either the standalone chart page 
//## or the regular funds data page. If it's the standalone
//## chart then no point calling all funds until user requests
//## that.

	$(this).foundation('section', 'reflow');
	
	

};


	
		// Set up the click events for the starred / favourites on the table		
	$('#fundCentreWidget').on('click', '.starred-input', function(){
	
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('id');
		var isChecked = $(this).is(':checked');
		
		if(isChecked){
			$(this).closest('tr').find('.starred').find('label').addClass('starred-on');
			$(this).closest('tr').find('.starred').find('.starredAgain').html('1');
			$(this).closest('tr').addClass('favourite-true').removeClass('favourite-false');
			$(this).attr('checked', true);
			addtoURLHash(id);
			a.log(name+" added to favourites");
			
		}else{
		$(this).closest('tr').find('.starred').find('label').removeClass('starred-on');
			$(this).closest('tr').find('.starred').find('.starredAgain').html('0');
			$(this).attr('checked', false);
			$(this).closest('tr').addClass('favourite-false').removeClass('favourite-true');;
			
			removefromURLHash(id);
			a.log(name+" removed from favourites" );
		}
		updateFavCookie();
		
		
	});
//table tbody tr .starred
	// Set up the click events for the chart the table		
	$('#fundCentreWidget').on('click', '.charted-input', function(){
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('id');
		var isChecked = $(this).is(':checked');
	
		if(isChecked){
			var limit = 5;
		
			if(fundCentre.chartCookieFunds.length<limit)
			{
				$(this).closest('tr').find('.charted').find('label').addClass('chart-on');
				$(this).closest('tr').find('.charted').find('.chartAgain').html('1');
				$(this).attr('checked', true);
				a.log(name+" added to comparison chart");
				
				addtoChartFundsCookie(id);
				
			}
			else
			{
				a.error("You've reached your limited of "+limit+" funds.");
				$(this).attr('checked', false);
			}
		}else{
		// 
			$(this).closest('tr').find('.charted').find('label').removeClass('chart-on');
			$(this).attr('checked', false);
			$(this).closest('tr').find('.charted').find('.chartAgain').html('0');
			a.log(name+" removed from comparison chart" );
			
				removeFromChartFundsCookie(id);

			
		}
		updateChartCookie();

	});
	
	
	// #############################################
	// #############################################
	// #############################################
	// The Products Chart is seperate to the main funds chart
	// Set up the click events for the chart the table		
	$('#fundCentreWidget').on('click', '.prod-charted-input', function(){
	
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('data-id');
		var isChecked = $(this).is(':checked');

		if(isChecked){
		var limit = 5;
		 
			if(fundCentre.productChartCookieFunds.length<limit)
			{
				$(this).closest('tr').find('.prod-charted').find('label').addClass('chart-on');
				$(this).closest('tr').find('.prod-charted').find('.chartAgain').html('1');
				$(this).attr('checked', true);
				a.log(name+" added to product comparison chart");
				
				addtoProdChartFundsCookie(id);
				
			}
			else
			{
				a.error("You've reached your limited of "+limit+" product funds.");
				$(this).attr('checked', false);
			}
		}else{
		// console.log('Is Not Checked');
			$(this).closest('tr').find('.prod-charted').find('label').removeClass('chart-on');
			$(this).attr('checked', false);
			$(this).closest('tr').find('.prod-charted').find('.chartAgain').html('0');
			a.log(name+" removed from comparison chart" );
			
				removeFromProdChartFundsCookie(id);

			
		}
		updateProdChartCookie();

	});
loadpage();
})()};