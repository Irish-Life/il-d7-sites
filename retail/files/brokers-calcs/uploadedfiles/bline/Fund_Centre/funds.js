//#######################################################
// This is the javascript for the fund prices page only.
// This js file should not be included anywhere else.
//var fundsProfile = '55'; // default
var
	a = alertify,
	l = a.log;

// get the specific funds for the site - set in the html on the page	
var fundGroupMain = (typeof fundsProfile === 'undefined') ? '55' : fundsProfile;
// get the product groupings for this site
var retailFundGroupID = (typeof fundsGroup === 'undefined') ? ['4','2','3','1','5','6'] : fundsGroup;
// Get the upper limits set for seperating funds into groups
// var fundsGroupUpperLimits = ['10','60','80','100'];
var retailFundGroupUpperLimits = (typeof fundsGroupUpperLimits === 'undefined') ? ['10','60','80','100'] : fundsGroupUpperLimits;
// get the product groupings ID for this site, for use calling json feed
var productGroupsId = (typeof productGroup === 'undefined') ? 'PRD' : productGroup;


// The fund group ID's for the default product groups
// var retailFundGroupID = ['4','2','3','1','5','6'];
// var blineFundGroupID = ['1','2','3','4'];
var retailFundGroupNames;
var productGroupNames = ['Popular Funds','ILIM Funds','Fidelity Funds','Davy Funds'];
if(fundGroupMain =='59')
{
	retailFundGroupNames = ['Core Options','Explore Options','',''];
}
else
{
	// The fund group Names [matching the IDs]
	retailFundGroupNames = ['Irish Life Indexed Funds','CORE','Protected Funds','ILIM Actively Managed Funds','External Fund Managers','Clear PRSA Managed Portfolios'];
}
//var blineFundGroupNames = ['Core Options','Explore Options','Davy','Fidelity'];


var currentFundGroupID,currentFundGroupNames,allProductTables=[];

// var fundGroupMain = thisFundsProfile;
// var blineFundGroupMain = '59';
//var productGroupsId = 'PRD';
// var blineProductGroupsId = 'BLW';


// The array of funds stored in the cookie and the url hash
var fundsStoredArray = [''];
// The array of funds stored in the cookie for charts
var fundsChartStoredArray = [];
// The array of funds stored in session for the product only
var tempFundsForURL = []; // fundsChartProductArray
// The current array of funds checked by user in this session
var fundsChartSessionArray = [];

//////////////////////////////////////////////////////////////////////
// Define the table for the list and sorting options

var contactList = [];
var productFundList;
// set up the required tables as defined by Group ID and Group Name

$(window).on('hashchange', function() {
 // console.log('Change to the URL');
});

/****
* Add commas to a number.
*
* @autor Stephen Hayden
* @date 01/Jun/2011
 */
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
// update the URL with the Hashes that the
// user has saved
updateURLHash = function(cookieName,hashes,updateURL){
	var hashArr = hashes; // passed array
	var newCookieHash = "#";
	
	for (i=0;i<hashes.length;i++){	
		if (hashArr[i] != 'chartscreentrue')
		{	
			newCookieHash += hashArr[i]+"&";
		}
	}
	
	if (updateURL)
	{
		if(cookieName=="chtFundsStoredILFS"){
			location.hash = newCookieHash+"chartscreentrue"; // set the new url
		}
		else
		{
			location.hash = newCookieHash; // set the new url
		}
	}
	$.cookie(cookieName, newCookieHash );
}

loadFundsFromURLandCookie = function(type){

	// check the URL for hashes and use the
	// info to set up the favourites
	var urlFavs = [],fundsStoredArraySort;
	if(window.location.hash) {
	  urlFavs = window.location.hash.split('#')[1].split("&");
	}
	
	if (type=="fav")
	{
		// Cookie overrides the favourites from URL
		if ($.cookie('favFundsStoredILFS') !=null)
		{ // if there is a cookie
			var cookieHash = $.cookie('favFundsStoredILFS')
			var favFundsStored = cookieHash.replace('#','').split("&");
			fundsStoredArraySort = jQuery.grep(favFundsStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
			});
		}
		else
		{
			$.cookie('favFundsStoredILFS','');
			fundsStoredArraySort = urlFavs;
		}
	}
	else if (type=="cht")
	{
		// ####################################
		// If the URL has 'chartscreentrue' then the funds passed in override
		// the funds from the chart cookie
		// ####################################
		if ($.inArray('chartscreentrue', urlFavs)>=1)
		{
			$.cookie('chtFundsStoredILFS','');
			fundsStoredArraySort = urlFavs;
		}
		else
		{
			if ($.cookie('chtFundsStoredILFS') !=null)
			{ //
				var cookieHash = $.cookie('chtFundsStoredILFS');
				var chtFundsStored = cookieHash.replace('#','').split("&");
				
				fundsStoredArraySort = jQuery.grep(chtFundsStored, function(value) {
						return (value !== "" && value != null); // remove empty vals
				});
			}
			else{
				$.cookie('chtFundsStoredILFS','');
				fundsStoredArraySort = urlFavs;
			}
		}
		
		$.cookie('chtFundsStoredILFS',fundsStoredArraySort);

	}
	else if (type=="prd")
	{
	// Cookie overrides the favourites from URL
		if ($.cookie('chtFundsPrdStoredILFS') !=null)
		{ // if there is a cookie
			var cookieHash = $.cookie('chtFundsPrdStoredILFS')
			var chtFundsStored = cookieHash.replace('#','').split("&");
			fundsStoredArraySort = jQuery.grep(chtFundsStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
			});
		}
		else
		{
			$.cookie('chtFundsPrdStoredILFS','');
			fundsStoredArraySort = urlFavs;
		}
	}
	return fundsStoredArraySort;
}

// Called by the table header when the user scrolls so the header
// floats with the scrolling
function UpdateTableHeaders() {
   $(".persist-area,.persist-area-product").each(function() {
   
       var el             = $(this),
           offset         = el.offset(),
           scrollTop      = $(window).scrollTop(),
           floatingHeader = $(".floatingHeader", this)
       
       if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
           floatingHeader.css({
            "visibility": "visible"
           });
       } else {
           floatingHeader.css({
            "visibility": "hidden"
           });      
       };
   });
}

// Show the chart of the selected funds 
// on the screen.
showChartScreen = function(){

	$('#fundsChartBody').show();
	// set the url hash
	//
	$('#fundsChartBody').html("<div class=\"large-10 columns\" style=\"height:34px;background-color:#dddddd;\">&nbsp;</div><div class=\"large-2 columns\" style=\"text-align:right;background-color:#dddddd;height:34px;padding-top:2px;\"><a href=\"javascript:void(0)\" class=\"hideChart\"><img class=\"hideChartClose\" alt=\"CLOSE\" src=\"http://www.irishlife.ie/uploadedImages/icon-funds-close.png\"></a></div><div id=\"fundsChartChart\"></div>");

	getChartDataAgain();
	updateURLHash('chtFundsStoredILFS',fundsChartStoredArray,true); // set the url
		

}

  
var fundChartDataCollected = []; 
drawChart = function(){

		
		$('#fundsChartChart').highcharts('StockChart', {
		    
		colors: ['#435399', '#f19c2b', '#5cc151', '#cc092f', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4'],
		credits: {enabled: false},
   chart: {
			marginRight: 20,
			borderRadius: 0, 
			borderWidth: 3,
			height:500,
			borderColor: "#dddddd",
			
			backgroundColor: {
				 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				 stops: [
					[0, 'rgb(265, 265, 265)'],
					[1, 'rgb(240, 240, 240)']
				 ]
			  }
		    },

	    rangeSelector: {
	    	buttonTheme: { // styles for the buttons
	    		fill: 'none',
	    		stroke: 'none',
	    		'stroke-width': 0,
	    		r: 2,
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
	    		color: '4d4e53',
	    		fontWeight: 'bold'
	    	},
	    	selected: 5
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
		    		width: 4,
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
				align: 'left',
				floating: true,
				padding: 2,
				backgroundColor: '#efefef',
				borderColor: '#4d4e53',
				borderWidth: 1,
				layout: 'vertical',
				borderRadius : 2,
				verticalAlign: 'top',
				y: 30,
				x: 70,
				shadow: true,
				labelFormatter: function() {
					var n = this.name;
					var nArr = n.split(" ");
					var r ="";
					if(nArr.length>2){
						nArr[0] = nArr[0].substring(0,2);
					}
					if(n.length >=20)
					{
						for (i=0; i<nArr.length; i++){
							r += nArr[i]+" ";
						}
						if(r.length>=20)
						{
							r =r.substring(0,17)+"...";
						}
					}
					else
					{
						r = this.name;
					}
					return r;
				}
			},
		    series: fundChartDataCollected
		});
		
		
		
		$('.highcharts-container').css('float','left');
		
}

var totalFundsSelected = 0;

setDataCounter = function(){
	totalFundsSelected++;
}
resetDataCounter = function(){
	totalFundsSelected=0;
}

getDataCounter = function(){
	return totalFundsSelected;
}
getChartDataAgain = function(){
	$('.hideChartClose').hide();
	resetDataCounter(); 
	// var fundsSelected = fundsChartStoredArray;
	var fundsSelected = fundsChartSessionArray;
	var fundPricesTotal = 0;
	fundChartDataCollected = []; 
	
	$('#fundsChartChart').html("<h2>LOADING...</h2><div class=\"progress supplementary\"><span class=\"meter\" style=\"width:0%\"></span></div>");
	$.each(fundsSelected, function(z, name) {
		name = name.split(';')[1];
		if(this.length>=3 & fundsSelected[z].split(';')[0] !='chartscreentrue'){ // fund names must be 3 or 4 chars
			$.getJSON('/servlet/fundpricejson?fund='+fundsSelected[z].split(';')[0], function (data, error){

			})
			.done(function ( data ) {
				fundChartDataCollected[z] = {
					name: name,
					data: data
				};
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				a.error("error, try again later");
			})
			.always(function ( dataORjqXHR, textStatus, jqXHRORerrorThrown) {
				fundPricesTotal += dataORjqXHR.length;
				setDataCounter();
				var messageOption;
				if(fundPricesTotal<=5)
				{
					messageOption = 0;
				}
				else if(fundPricesTotal<=10)
				{
					messageOption = 1;
				}
				else if(fundPricesTotal<=17)
				{
					messageOption = 2;
				}
				else if(fundPricesTotal>17)
				{
					messageOption = 3;
				}
				$('#fundsChartChart').html("<h2>LOADING FUND "+getDataCounter()+" OF "+fundsSelected.length+
				"</h2><img alt=\"Loading\" src=\"http://www.irishlife.ie/uploadedImages/ajax-loader.gif\"><h5>"
				+addCommas(fundPricesTotal)+" day's worth of prices have been loaded so far.<h5><p>Please Wait. Downloading shouldn\'t take too long.<p><div class=\"progress supplementary\"><span class=\"meter\" style=\"width:"
				+Math.round((100/fundsSelected.length)*getDataCounter())+"%\"></span></div>");
				
				if(getDataCounter() == fundsSelected.length){
					drawChart();					
					$('#fundsTableBody').show();
					$('.hideChartClose').show();
				}
			});
		}
		else{
			setDataCounter();
		}
	});
}
$(window).load(function () {

	///////////////////////////////////////////////////////
	// Alertify - Alertify - Alertify - Alertify - Alertify 
	// Use this to send messages to the users on the screen
	// for various events such as clicking buttons etc
	// Helps the user understand what they are doing on 
	// more complicated screens such as fund prices page
	alertify.set({ delay : 3000 }); // 3 sec
	///////////////////////////////////////////////////////

	// Set up the stored favourites. This array will set up what is 
	// pre-selected for user 
	fundsStoredArray = loadFundsFromURLandCookie('fav');
	fundsChartStoredArray = loadFundsFromURLandCookie('cht');
	fundsChartStoredArrayForProducts = loadFundsFromURLandCookie('prd');
	
	// Pull down the data from the server and the cookies have been set up to set the
	// chart data to the funds in URL if there or from Cookie if existing
	pullDownOverallFundData();

	// Set up the click events for the starred / favourites on the table		
	$(document).on('click', '.starred-input', function(){
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('id');
		var isChecked = $(this).is(':checked');
		
		if(isChecked){
			$(this).closest('tr').find('.starred').find('label').addClass('starred-on');
			$(this).closest('tr').find('.starred').find('.starredAgain').html('1');
				$(this).attr('checked', true);
			a.log(name+" added to favourites");
			
			// causing error with empty
			fundsStoredArray.push(id);
		}else{
		$(this).closest('tr').find('.starred').find('label').removeClass('starred-on');
			$(this).closest('tr').find('.starred').find('.starredAgain').html('0');
			
				$(this).attr('checked', false);
			a.log(name+" removed from favourites" );
			fundsStoredArray =  jQuery.grep(fundsStoredArray, function(value) {
				return (value != id);
			});
		}
		updateURLHash('favFundsStoredILFS', fundsStoredArray,true);
	});
	
	// Set up the click events for the chart the table		
	$(document).on('click', '.charted-input', function(){
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('id');
		var isChecked = $(this).is(':checked');

		if(isChecked){
		var limit = 8;
			if(fundsChartSessionArray.length<limit)
			{
				$(this).closest('tr').find('.charted').find('label').addClass('chart-on');
				$(this).closest('tr').find('.charted').find('.chartAgain').html('1');
				$(this).attr('checked', true);
				a.log(name+" added to comparison chart");
				fundsChartStoredArray.push(id);
				fundsChartSessionArray.push(id+';'+name);
			}
			else
			{
				a.error("You've reached your limited of "+limit+" funds.");
				$(this).attr('checked', false);
			}
		}else{
			$(this).closest('tr').find('.charted').find('label').removeClass('chart-on');
			$(this).attr('checked', false);
			$(this).closest('tr').find('.charted').find('.chartAgain').html('0');
			a.log(name+" removed from comparison chart" );
			
			fundsChartStoredArray =  jQuery.grep(fundsChartStoredArray, function(value) {
				return (value != id);
			});
			fundsChartSessionArray =  jQuery.grep(fundsChartSessionArray, function(value) {
				return (value.split(';')[0] != id);
			});
			
		}
		updateURLHash('chtFundsStoredILFS',fundsChartStoredArray,false);

	});
});
//var starredHTML;
setSortList = function(type){
	// type = 0 - for default list of funds
	// type = 1 - for product groups of 
	var options;
	if (type=="1"){
		options = {
			valueNames: [ 'id', 'charted', 'name', 'price','1mth', '3mth', 
			'6mth', '12mth', '3yrs', '5yrs', '10yrs', '3yrsAnn', '5yrsAnn', '10yrsAnn', 'fromlaunch' ]
		};
		
		for (i=0;i<productGroupNames.length; i++){
			contactList[i] = new List("productGroup"+i, options);
		}
		// contactList[0] = new List("productGroup"+currentFundGroupID[0], options);
	}
	else if (type=="0"){
		options = {
			valueNames: [ 'id', 'starred', 'charted', 'risk', 'name', 'charge', 'price','1mth', '3mth', 
			'6mth', '12mth', '3yrs', '5yrs', '10yrs', '3yrsAnn', '5yrsAnn', '10yrsAnn', 'fromlaunch' ]
		};
		for (i=0;i<retailFundGroupUpperLimits.length; i++){
			contactList[i] = new List("fundsGroup"+i, options);
		}
	
	}

	

}








pullDownOverallFundData = function(){


	fundsChartSessionArray = [];
	
	if ((typeof allProductTables[0] !== 'undefined') ){
		// no need to make ajax call as we have table stored
		//currentFundGroupID = retailFundGroupID;
		currentFundGroupNames = retailFundGroupNames;
		setDefaultFunds(allProductTables[0],false);
	}
	else
	{
		var jqxhr = $.get( "/servlet/jsonFund.jsp?group="+fundGroupMain+"&page=prices", function() {
		})
		.done(function(data) {
			var myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
			//currentFundGroupID = retailFundGroupID;
			currentFundGroupNames = retailFundGroupNames;

			setDefaultFunds(myJSON,false);
			allProductTables[0]=myJSON;
		})
		.fail(function(jqxhr, textStatus, error ) {a.log("Error loading all funds. Refresh or try later."); })
	}
	
}

selectFundGroup = function(orderNum){
var currentFundGroup=0;
	for(i=0;i<retailFundGroupUpperLimits.length; i++){
	var limitNum = parseInt(retailFundGroupUpperLimits[i]);
		if(orderNum <= limitNum)
		{
			currentFundGroup = i;
			break;
		}
	}
	// console.log(" "+orderNum+" : "+currentFundGroup);
	return currentFundGroup;
}


//##############################################################
// This function is for setting up the funds for the default page
// rather than products page. The data is passed in and the headers
// and button events are set up specifically for this. 
//##############################################################
setDefaultFunds = function(data, productGroup){
	$('#fundsTableBody').html('');
	
	// hold all the HTML for the tables
	var tableBodyContents = [];
	var tableHeader="<th class=\"fundOptionsHeader fundOptionsHeaderOptions\" colspan=\"7\">\
	<ul class=\"button-group right\">\
	<li class=\"showChatBtn\"><a href=\"javascript:window.print();\"  c title=\"Print This Page\"  ><img \
	src=\"http://www.irishlife.ie/uploadedImages/icon-funds-print.png\"  ></a></li>\
	<li class=\"showAllFundsBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" class=\"has-tip showAllFunds\" title=\"Show All Funds\">\
	<img class=\"\" src=\"http://www.irishlife.ie/uploadedImages/icon-funds-star-all.png\" ></a></li>\
	<li class=\"showFavFundsBtn\" ><a href=\"javascript:void(0);\" title=\"Show Only Favourites\" class=\"has-tip showFavFunds\">\
	<img src=\"http://www.irishlife.ie/uploadedImages/icon-funds-star.png\"></a></li>\
	<li class=\"showChartBtn\"><a href=\"javascript:void(0);\" title=\"Show Chart of Selected Funds\" class=\"showChart has-tip\">\
	<img alt=\"Show Chart of Selected Funds\" src=\"http://www.irishlife.ie/uploadedImages/icon-chart-off.png\" \
	></a></li>\
	<li class=\"hideChartBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Hide Chart of Selected Funds\" class=\"has-tip hideChart\">\
	<img src=\"http://www.irishlife.ie/uploadedImages/icon-chart-on.png\" ></a></li>\
	<li class=\"showCumFundsBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Show Cumulative Funds\"  class=\"has-tip showCumFunds\">\
	<img src=\"http://www.irishlife.ie/uploadedImages/icon-funds-cumulative.png\" ></a></li>\
	<li class=\"showAnnFundsBtn\" ><a href=\"javascript:void(0);\" title=\"Show Annualised\" class=\"showAnnFunds has-tip\"><img \
	 src=\"http://www.irishlife.ie/uploadedImages/icon-funds-annualised.png\"></a></li>\
	</ul></th></tr><tr>\
	<th style=\"DISPLAY: none\" class=\"sort\" data-sort=\"id\" ></th>\
	<th class=\"sort\" data-sort=\"starred\">Fav</th>\
	<th class=\"sort\" data-sort=\"charted\">Chrt</th>\
	<th class=\"sort\" data-sort=\"risk\">Risk</th>\
	<th class=\"sort leftAlign\" width=\"25%\" data-sort=\"name\">Name</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"charge\">Charge</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"price\">Price</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"1mth\">1 Mth</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"3mth\">3 Mths</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"6mth\">6 Mths</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"12mth\">12 Mths</th>\
	<th class=\"sort 3yrs\" width=\"7%\" data-sort=\"3yrs\">3 Yrs</th>\
	<th class=\"sort 5yrs\" width=\"7%\" data-sort=\"5yrs\">5 Yrs</th>\
	<th class=\"sort 10yrs\" width=\"7%\" data-sort=\"10yrs\">10 Yrs</th>\
	<th style=\"display:none\" class=\"sort 3yrsAnn\" width=\"7%\" data-sort=\"3yrsAnn\">3 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 5yrsAnn\" width=\"7%\" data-sort=\"5yrsAnn\">5 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 10yrsAnn\" width=\"7%\" data-sort=\"10yrsAnn\">10 Yrs <small>Annualised</small></th>\
	<th class=\"sort\" width=\"8%\" data-sort=\"fromlaunch\">From Launch</th>\
	</tr></thead><tbody class=\"list\">";

	var tableFooter = "</tbody></table></div>";
	
	// set up the required tables as defined by Group ID and Group Name
	for (i=0;i<retailFundGroupUpperLimits.length; i++){	
		tableBodyContents[i] = "<div id=\"fundsGroup"+i+"\"><div class=\"large-6 columns\"></div>\
		<div class=\"large-6 columns\"></div><table class=\"dataList persist-area\"><thead class=\"persist-header\">\
		<th class=\"fundOptionsHeader\" colspan=\"7\"><h5>"+currentFundGroupNames[i]+"</h5></th>"+tableHeader;
	}
		
	// ##################
	// Loop through data
	$.each(data[0], function(key, val) {
		$.each(val, function(index, vale) {
			if (productGroup) {vale.group=0;}
			
			var fundGroupIDtemp = "0";

			fundGroupIDtemp = selectFundGroup(vale.order);
			tableBodyContents[fundGroupIDtemp] +="<tr><td id=\""+vale.id+"\" style=\"DISPLAY: none\" class=\"id\">"+vale.order+"</td>";
					 
			if (!productGroup) {
			tableBodyContents[fundGroupIDtemp] +="<td class=\"starred\">";
				if ($.inArray(vale.id, fundsStoredArray) >= 0)
				{
					tableBodyContents[fundGroupIDtemp] += "<input id=\"starred-"+vale.id+"\" class=\"starred-input\" type=\"checkbox\" value=\"\" checked/><label class=\"feaeae starred-on\" for=\"starred-"+vale.id+"\"></label><span class=\"starredAgain\" style=\"display:none\">1</span></td>";
				}
				else
				{
					tableBodyContents[fundGroupIDtemp] += "<input id=\"starred-"+vale.id+"\" class=\"starred-input\" type=\"checkbox\" value=\"\"/><label class=\"feaeae\" for=\"starred-"+vale.id+"\"></label><span class=\"starredAgain\" style=\"display:none\">0</span></td>";
				}
			}
			
			tableBodyContents[fundGroupIDtemp] += "<td class=\"charted\" >";	
			if ($.inArray(vale.id, fundsChartStoredArray) >= 0)
			{
				tableBodyContents[fundGroupIDtemp] += "<input id=\"charted-"+vale.id+"\" class=\"charted-input\" type=\"checkbox\" checked/><label class=\"feaeaea chart-on\" for=\"charted-"+vale.id+"\"></label><span class=\"chartAgain\" style=\"display:none\">1</span></td></td>";
				
				fundsChartSessionArray.push(vale.id+';'+vale.name); // set the session chart array to what is taken from URL
			}
			else
			{
				tableBodyContents[fundGroupIDtemp] += "<input id=\"charted-"+vale.id+"\" class=\"charted-input\" type=\"checkbox\" /><label class=\"feaeaea\" for=\"charted-"+vale.id+"\"></label><span class=\"chartAgain\" style=\"display:none\">0</span></td></td>";
			}
			
			
			tableBodyContents[fundGroupIDtemp] += "<td class=\"risk\"><div class=\"riskRating rated-"+vale.risk+"\">\
			<span class=\"rateditem\">"+vale.risk+"</span></div></td>";
			if (vale.url.length<=10)
			{
			
				tableBodyContents[fundGroupIDtemp] += "<td class=\"name leftAlign\"><span class=\"fundName\">"+vale.name+"</span></td>";
			}
			else
			{
				tableBodyContents[fundGroupIDtemp] += "<td class=\"name leftAlign\"><a href=\""+vale.url+"\" download=\""+vale.name+" - "+vale.id+".pdf\"><span class=\"pdf\"></span><span class=\"fundName\">"+vale.name+"</span></a>";
			}

			if (vale.protPrPl > 0)
			{
			
				tableBodyContents[fundGroupIDtemp] += "<br/><span style='font-size:11px;'>Protected Price Pledge: &euro;"+vale.protPrPl+"<br/>Exposure to Consensus Markets Fund: "+vale.expsConsMktFnd+"</span></td>";
			}
			else
			{
				tableBodyContents[fundGroupIDtemp] += "</td>";
			}
			
			tableBodyContents[fundGroupIDtemp] += "<td class=\"charge\">"+vale.fmc+"%</td>\
			<td class=\"price\">&euro;"+vale.latest+"</td>\
			<td class=\"1mth "+fc(vale.lastMonthGrowth)+"\">"+vale.lastMonthGrowth+"</td>\
			<td class=\"3mth "+fc(vale.threeMonthGrowth)+"\">"+vale.threeMonthGrowth+"</td>\
			<td class=\"6mth "+fc(vale.sixMonthGrowth)+"\">"+vale.sixMonthGrowth+"</td>\
			<td class=\"12mth "+fc(vale.last12Months)+"\">"+vale.last12Months+"</td>\
			<td class=\"3yrs "+fc(vale.last3Years)+"\">"+vale.last3Years+"</td>\
			<td class=\"5yrs "+fc(vale.last5years)+"\">"+vale.last5years+"</td>\
			<td class=\"10yrs "+fc(vale.last10Years)+"\">"+vale.last10Years+"</td>\
			<td style=\"display:none\" class=\"3yrsAnn "+fc(vale.last3YearsAnn)+"\">"+vale.last3YearsAnn+"</td>\
			<td style=\"display:none\" class=\"5yrsAnn "+fc(vale.last5yearsAnn)+"\">"+vale.last5yearsAnn+"</td>\
			<td style=\"display:none\" class=\"10yrsAnn "+fc(vale.last10YearsAnn)+"\">"+vale.last10YearsAnn+"</td>\
			<td class=\"fromlaunch "+fc(vale.sinceLaunchGrowth)+"\">"+vale.sinceLaunchGrowth+"</td></tr>";
			
		});
	});
	
	// Close off each table
	for (i=0;i<retailFundGroupUpperLimits.length; i++){
			tableBodyContents[i] += tableFooter;
			
	}
	
	for (i=0;i<retailFundGroupUpperLimits.length; i++){
			 $('#fundsTableBody').append(tableBodyContents[i]);
	}
	
	
	a.log("Funds Loaded");
	
	$(".fundOptionsHeaderOptions:first").removeClass("fundOptionsHeaderOptions");
	
	
	if($.inArray('fundscreentrue', fundsChartStoredArray) >= 0)
	{
		// removeChartFilter();				
		showChartFilter();
	}
	
	
	// Set up the header to persist. This code basically
	// copys the header and shows it when scrolling for 
	// any table header with the persist-area class
	var clonedHeaderRow;
   $(".persist-area").each(function() {
	   clonedHeaderRow = $(".persist-header", this);
	   clonedHeaderRow
		 .before(clonedHeaderRow.clone())
		 .css("width", clonedHeaderRow.width())
		 .addClass("floatingHeader");
		 
   });
   
   $(window)
	.scroll(UpdateTableHeaders)
	.trigger("scroll");
	
	setSortList('0');
	if($.inArray('chartscreentrue', fundsChartStoredArray) >= 0)
	{
		displayChart("default");
	}
}




















getProductFundPrices = function(id, name){
	hideChart();
	// console.log('>> Get the table data for products');
	
	$('#fundsTableBody').html("<img alt=\"Loading\" src=\"http://www.irishlife.ie/uploadedImages/ajax-loader.gif\"> Loading Funds, Please Wait.");
	
	if ((typeof allProductTables[id] !== 'undefined') ){
		// no need to make ajax call as we have table stored
		
		var prodFundGroupNames = [name + ' Prices and Performance'];
		//currentFundGroupNames = prodFundGroupNames;
		// currentFundGroupID = [id];
		setProductFunds(allProductTables[id],id,prodFundGroupNames);
	}
	else
	{
		if (id > 0)
		{
			var jqxhr = $.get( "/servlet/jsonFund.jsp?group="+id+"&page=prices ", function() {
			})
			.done(function(data) {
				var myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
				
				//var prodFundGroupID = [0]; // set to 0 
				var prodFundGroupNames = [name + ' Prices and Performance'];
				
				// currentFundGroupID = [id];
				setProductFunds(myJSON,id,prodFundGroupNames);
				allProductTables[id] = myJSON;

				
			})
			.fail(function(jqxhr, textStatus, error ) {a.error("Error loading all funds. Refresh or try later."); })
		
		}
	}
	
}


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

	// console.log(" "+orderNum+" : "+currentFundGroup+"\n");
	return currentFundGroup;
}
//##############################################################
// This function is for setting up the funds for the default page
// rather than products page. The data is passed in and the headers
// and button events are set up specifically for this. 
//##############################################################
setProductFunds = function(data,productGroupID,name){
	// console.log('>> Print tables for product groups')

	$('#fundsTableBody').html('');
	
			 
	// Build up the html for the group <div> - <table> - </div>
	var tableHeader="<th class=\"fundOptionsHeader fundOptionsHeaderOptions\" colspan=\"7\">\
	<ul class=\"button-group right\">\
	<li class=\"showChatBtn\"><a href=\"javascript:window.print();\" title=\"Print This Page\"  ><img \
	src=\"http://www.irishlife.ie/uploadedImages/icon-funds-print.png\"  ></a></li>\
	<li class=\"showProductChartBtn\"><a href=\"javascript:void(0);\" title=\"Show Chart of Selected Funds\" class=\"showProductChart has-tip\">\
	<img alt=\"Show Chart of Selected Funds\" src=\"http://www.irishlife.ie/uploadedImages/icon-chart-off.png\" \
	></a></li>\
	<li class=\"hideProductChartBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Hide Chart of Selected Funds\" class=\"has-tip hideProductChart\">\
	<img src=\"http://www.irishlife.ie/uploadedImages/icon-chart-on.png\" ></a></li>\
	<li class=\"showCumFundsBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Show Cumulative Funds\"  class=\"has-tip showCumFunds\">\
	<img src=\"http://www.irishlife.ie/uploadedImages/icon-funds-cumulative.png\" ></a></li>\
	<li class=\"showAnnFundsBtn\" ><a href=\"javascript:void(0);\" title=\"Show Annualised\" class=\"showAnnFunds has-tip\"><img \
	 src=\"http://www.irishlife.ie/uploadedImages/icon-funds-annualised.png\"></a></li>\
	</ul></th></tr><tr>\
	<th style=\"DISPLAY: none\" class=\"sort\" data-sort=\"id\" ></th>\
	<th class=\"sort\" data-sort=\"charted\">Chrt</th>\
	<th class=\"sort leftAlign\" width=\"33%\" data-sort=\"name\">Name</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"price\">Price</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"1mth\">1 Mth</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"3mth\">3 Mths</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"6mth\">6 Mths</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"12mth\">12 Mths</th>\
	<th class=\"sort 3yrs\" width=\"7%\" data-sort=\"3yrs\">3 Yrs</th>\
	<th class=\"sort 5yrs\" width=\"7%\" data-sort=\"5yrs\">5 Yrs</th>\
	<th class=\"sort 10yrs\" width=\"7%\" data-sort=\"10yrs\">10 Yrs</th>\
	<th style=\"display:none\" class=\"sort 3yrsAnn\" width=\"7%\" data-sort=\"3yrsAnn\">3 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 5yrsAnn\" width=\"7%\" data-sort=\"5yrsAnn\">5 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 10yrsAnn\" width=\"7%\" data-sort=\"10yrsAnn\">10 Yrs <small>Annualised</small></th>\
	<th class=\"sort\" width=\"8%\" data-sort=\"fromlaunch\">From Launch</th>\
	</tr></thead><tbody class=\"list\">";

	var tableFooter = "</tbody></table></div>";
	var localTableHolder = [];
	// productGroupNames
	// set up the required tables for each product section (popular, ilim etc)
	for (i=0;i<productGroupNames.length; i++){	
		localTableHolder[i] = "<div id=\"productGroup"+i+"\"><div class=\"large-6 columns\"></div>\
		<div class=\"large-6 columns\"></div><table class=\"dataList persist-area-product\"><thead class=\"persist-header-product\">\
		<th class=\"fundOptionsHeader\" colspan=\"7\"><h5>"+productGroupNames[i]+"</h5></th>"+tableHeader;
	}
	
	
	//localTableHolder = "<div id=\"productGroup"+productGroupID+"\"><div class=\"large-6 columns\"></div>\
	//	<div class=\"large-6 columns\"></div><table class=\"dataList persist-area-product\"><thead class=\"persist-header-product\">\
	//	<th class=\"fundOptionsHeader\" colspan=\"7\"><h5>"+name+"</h5></th>"+tableHeader;
	
		
	// ##################
	// Loop through data
	$.each(data[0], function(key, val) {
		$.each(val, function(index, vale) {
				
			var fundGroupIDtemp = "0";

			fundGroupIDtemp = selectProductGroup(vale.order, vale.grouping);
			// console.log(vale.order+" "+vale.grouping+' - fundGroupIDtemp '+fundGroupIDtemp);
			//tableBodyContents[fundGroupIDtemp] +="<tr><td id=\""+vale.id+"\" style=\"DISPLAY: none\" class=\"id\">"+vale.order+"</td>";
			
	
			localTableHolder[fundGroupIDtemp] +="<tr><td id=\""+vale.id+"\" style=\"DISPLAY: none\" class=\"id\">"+vale.order+"</td>";
			
			localTableHolder[fundGroupIDtemp] += "<td class=\"charted\" >";	
			
			if ($.inArray(vale.id, fundsChartStoredArrayForProducts) >= 0)
			{
				localTableHolder[fundGroupIDtemp] += "<input id=\"charted-"+vale.id+"\" class=\"charted-input\" type=\"checkbox\" checked/><label class=\"feaeaea chart-on\" for=\"charted-"+vale.id+"\"></label><span class=\"chartAgain\" style=\"display:none\">1</span></td></td>";
			}
			else
			{
				localTableHolder[fundGroupIDtemp] += "<input id=\"charted-"+vale.id+"\" class=\"charted-input\" type=\"checkbox\" /><label class=\"feaeaea\" for=\"charted-"+vale.id+"\"></label><span class=\"chartAgain\" style=\"display:none\">0</span></td></td>";
			}
			
			
			if (vale.url.length<=10)
			{
			
				localTableHolder[fundGroupIDtemp] += "<td class=\"name leftAlign\"><span class=\"fundName\">"+vale.name+"</span></td>";
			}
			else
			{
				localTableHolder[fundGroupIDtemp] += "<td class=\"name leftAlign\"><a href=\""+vale.url+"\" download=\""+vale.name+" - "+vale.id+".pdf\"><span class=\"pdf\"></span><span class=\"fundName\">"+vale.name+"</span></a></td>";
			}
			
				
			
			localTableHolder[fundGroupIDtemp] += "<td class=\"price\">&euro;"+vale.latest+"</td>\
			<td class=\"1mth "+fc(vale.lastMonthGrowth)+"\">"+vale.lastMonthGrowth+"</td>\
			<td class=\"3mth "+fc(vale.threeMonthGrowth)+"\">"+vale.threeMonthGrowth+"</td>\
			<td class=\"6mth "+fc(vale.sixMonthGrowth)+"\">"+vale.sixMonthGrowth+"</td>\
			<td class=\"12mth "+fc(vale.last12Months)+"\">"+vale.last12Months+"</td>\
			<td class=\"3yrs "+fc(vale.last3Years)+"\">"+vale.last3Years+"</td>\
			<td class=\"5yrs "+fc(vale.last5years)+"\">"+vale.last5years+"</td>\
			<td class=\"10yrs "+fc(vale.last10Years)+"\">"+vale.last10Years+"</td>\
			<td style=\"display:none\" class=\"3yrsAnn "+fc(vale.last3YearsAnn)+"\">"+vale.last3YearsAnn+"</td>\
			<td style=\"display:none\" class=\"5yrsAnn "+fc(vale.last5yearsAnn)+"\">"+vale.last5yearsAnn+"</td>\
			<td style=\"display:none\" class=\"10yrsAnn "+fc(vale.last10YearsAnn)+"\">"+vale.last10YearsAnn+"</td>\
			<td class=\"fromlaunch "+fc(vale.sinceLaunchGrowth)+"\">"+vale.sinceLaunchGrowth+"</td></tr>";
		});
	});
	
	for (i=0;i<productGroupNames.length; i++){	
		localTableHolder[i] += tableFooter;
		if(localTableHolder[i].length>2750){
		// don't display empty tables
			$('#fundsTableBody').append(localTableHolder[i]);
		}
		//console.log("localTableHolder[i] length "+localTableHolder[ifind('.list').length);
	}
	
			//var thisTableContents = $('#fundsGroup'+i).find('table').find('.list').html();
	

	
	a.log("Funds Loaded");
	
	$(".fundOptionsHeaderOptions:first").removeClass("fundOptionsHeaderOptions");
	
	
		
	// Set up the header to persist. This code basically
	// copys the header and shows it when scrolling for 
	// any table header with the persist-area class
	var clonedHeaderRow;
   $(".persist-area-product").each(function() {
	   clonedHeaderRow = $(".persist-header-product", this);
	   clonedHeaderRow
		 .before(clonedHeaderRow.clone())
		 .css("width", clonedHeaderRow.width())
		 .addClass("floatingHeader");
		 
   });
   
   $(window)
	.scroll(UpdateTableHeaders)
	.trigger("scroll");
	
	// set the table sort
	setSortList('1');
}

// return the fund colour class based on the value 
fc = function(n)
{

var m = n.replace('%','');
// console.log("M: "+m);
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

clearCharted = function(){

	$('.charted').find('.chartAgain').html('0');
	$('.charted').find('label').removeClass('chart-on');
	$('.charted').find('input').attr('checked', false);
}		
	
//######################################
// Click events on the page
$(document).on('click', '.showAnnFunds', function(){
	$('.showAnnFundsBtn, .3yrs, .5yrs, .10yrs').hide();
	$('.showCumFundsBtn, .3yrsAnn, .5yrsAnn, .10yrsAnn').show();
});
	
$(document).on('click', '.showCumFunds', function(){
	$('.showAnnFundsBtn, .3yrs, .5yrs, .10yrs').show();
	$('.showCumFundsBtn, .3yrsAnn, .5yrsAnn, .10yrsAnn').hide();
});
	
	
	
$(document).on('click', '.showFavFunds', function(){

	if (fundsStoredArray.length > 0)
	{
		$('.showFavFundsBtn').hide();
		$('.showAllFundsBtn').show();
		contactList = [];
		setSortList('0');
		for (i=0;i<retailFundGroupUpperLimits.length; i++){
			contactList[i].filter(function(item) {
			var starredHTML = $.parseHTML( item.values().starred);
			var isStarredCheck = $(starredHTML[2]).filter('span').html();
				if (isStarredCheck >= 1) {
					return true;
				} else {
					return false;
				}
			});
		
			var thisTable = "fundsGroup"+i;
			var thisTableContents = $('#fundsGroup'+i).find('table').find('.list').html();

			if(thisTableContents.length<=5)
			{
				$("#fundsGroup"+i).hide();
			}
		}
	}
	else
	{
		a.error('No funds starred');
	}
		
});



$(document).on('click', '.showAllFunds', function(){
		$('.showFavFundsBtn').show();
		$('.showAllFundsBtn').hide();
		
			for (i=0;i<retailFundGroupUpperLimits.length; i++){
				if (contactList[i])
				{	
					contactList[i].filter();
				}
			}
		
		removeChartFilter();
	});

$(document).on('click', '.showChart', function(){
	displayChart("default");


});
$(document).on('click', '.showProductChart', function(){

	displayChart("product");
});

// Show the chart on the screen
function displayChart(type){
	// clean up in case fav filter is on
	if (fundsChartSessionArray.length >0)
	{

		$('.showFavFundsBtn').show();
		$('.showAllFundsBtn').hide();
		removeChartFilter();
		$('#fundsTableBody').hide();
		showChartScreen();	
		$('.hideChartBtn').show();
		$('.showChartBtn').hide();
		
		if(type=="product")
		{
			showProductChartFilter();
		}
		else
		{
			showChartFilter();
		}
	}
	else
	{
		a.error("Cannot chart - no funds selected");		
	}
}
$(document).on('click', '.hideChart', function(){
		hideChart();
});
hideChart = function(){

		$('#fundsChartBody').hide();
		$('.hideChartBtn').hide();
		$('.showChartBtn').show();
		
		removeChartFilter();
		
		$(".button-group").show();
		updateURLHash('favFundsStoredILFS',fundsStoredArray,true); // set the url
}

$(document).on('click', '.showFundProducts', function(){

		$('.fundsProductsHeaderContent').slideDown('slow');
		$('.fundsProductHeaderButton').addClass('open');
		$('.fundsProductHeaderButton').addClass('hideFundProducts');		
		$('.fundsProductHeaderButton').removeClass('showFundProducts');

		getFundProductsList();

});	
	
$(document).on('click', '.hideFundProducts', function(){

		$('.fundsProductsHeaderContent').slideUp('slow');
		$('.fundsProductHeaderButton').removeClass('open');
		$('.fundsProductHeaderButton').addClass('showFundProducts');
		$('.fundsProductHeaderButton').removeClass('hideFundProducts');
		
		tempFundsForURL = fundsChartStoredArray;
		pullDownOverallFundData();
		hideChart();
});	



getFundProductsList = function(){
	
	var mySelectList;
	
	$('#fundCategorySelect').html("<img alt=\"Loading\" src=\"http://www.irishlife.ie/uploadedImages/ajax-loader.gif\"> Loading Products");
	$.get('/servlet/jsonFund.jsp?group='+productGroupsId+'&page=groups', function (data, error){
				
			})
			.done(function ( data ) {
				var myJSON;
				myJSON = $.parseJSON(data.replace(/&#034;/g,'\"'));
				
				mySelectList = "<select id=\"fundCategory\"><option selected=\"selected\" value=\"0\">Pick a Product</option>";
				$.each(myJSON[0].funds, function(key, val) {
					mySelectList += "<option value=\""+val.id+"\">"+val.name+"</option>";
				});
				mySelectList += "</select>";
								
				$('#fundCategorySelect').html(mySelectList);
				
				$('#fundCategory').change(function() {
				
					
					tempFundsForURL = fundsChartStoredArray;					
					fundsChartStoredArray = [];
					fundsChartSessionArray = [];
					

					getProductFundPrices($(this).val(),$("#fundCategory option:selected").text());
					
				});
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				a.error('Error, refresh or try again later')
			});

			
}

// Shows the list of funds filtered to only show what has
// been selected by the user to display for the chart
function showChartFilter(){
		contactList = [];
		setSortList('0');
		
		for (i=0;i<retailFundGroupUpperLimits.length; i++){
			contactList[i].filter(function(item) {
			
			var chartedHTML = $.parseHTML( item.values().charted);
			var isChartedCheck = $(chartedHTML[2]).filter('span').html();
				
				if (isChartedCheck >= 1) {
					return true;
				} else {
					return false;
				}
			});
			
			//var thisTable = "fundsGroup"+currentFundGroupID[i];
			var thisTableContents = $('#fundsGroup'+i).find('table').find('.list').html();

			if(thisTableContents.length<=5)
			{
				$("#fundsGroup"+i).hide();
			}
			$(".button-group").hide();
		}
}


// Shows the list of funds filtered to only show what has
// been selected by the user to display for the chart
function showProductChartFilter(){
	contactList = [];
	setSortList('1');

	for (i=0;i<productGroupNames.length; i++){
		contactList[i].filter(function(item) {
		
			var chartedHTML = $.parseHTML( item.values().charted);
			var isChartedCheck = $(chartedHTML[2]).filter('span').html();
				
			if (isChartedCheck >= 1) {
				return true;
			} else {
				return false;
			}
		});
		
		var thisTableContents = $('#productGroup'+i).find('table').find('.list').html();

		if(thisTableContents.length<=5)
		{
			$("#productGroup"+i).hide();
		}
		$(".button-group").hide();
	}
			
}
	
// Reset the funds list after a filter has been applied to 
// it to show a chart for the user
function removeChartFilter(){

	for (i=0;i<retailFundGroupUpperLimits.length; i++){
		if (contactList[i])
		{
			contactList[i].filter();
		}
		$("#fundsGroup"+i).show();
		$("#productGroup"+i).show();
	}
}


