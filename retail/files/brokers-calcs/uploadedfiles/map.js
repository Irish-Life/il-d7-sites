
var map = null;

var brokerMarker = "/v2/img/marker/markerBlue.png";
var onesourceMarker = "/v2/img/marker/markerGreen.png";
var branchMarker = "/v2/img/marker/markerOrange.png";
var atmMarker = "/v2/img/marker/markerGrey.png";
var consultantMarkerImage = "/v2/img/marker/markerPurple.png";

var selectedMarker = 14;

var advisorURL = "uploadedFiles/advisors.txt";


var brokerData;
var onesourceData;
var branchData;
var consultantData;

var brokerMarkers = new Array();
var onesourceMarkers = new Array();
var branchMarkers = new Array();
var consultantMarkers = new Array();

var consultantDataList = new Array();

var countyValue;

var time;

$().ready(function()
{
	log(' = ready');
	
	// Ektron hack :(
	$('#brokerResultsTable tr').remove();
	$('#onesourceResultsTable tr').remove();
	$('#branchResultsTable tr').remove();
	$('#consultantTable tr').remove();
	
	initialiseMap();
	
	getData();
});


function initialiseMap()
{
	if($("#mapCanvas").length)
	{
		if(GBrowserIsCompatible()) 
		{
			// Set the defaults for the Google Map
			map = new GMap2(document.getElementById("mapCanvas"));
			map.setCenter(new GLatLng(53.402982, -7.624512), 7);
			geocoder = new GClientGeocoder();
			
			// Add map controls
			var uiOptions = map.getDefaultUI();
			uiOptions.maptypes.satellite = false;
			uiOptions.maptypes.physical = false;
			uiOptions.controls.scalecontrol = false;
			map.setUI(uiOptions);
			
			$(window).unload(function () { GUnload(); });
		}
	}
}

function getData()
{
	log(' = getData')
	
	$.ajax(
	{
		type: "GET",
		url: advisorURL,
		cache: false,
		dataType: "text",
		success: function(response)
		{		
			eval(response);		
		}
	});
}

function countyChange()
{
	log(' = countyChange');
	
	countyValue = $('#mapOptionsCounty').val();
	
	// 1. Clear existing markers and tables
	clearData();
	
	if(countyValue == '')
	{
		map.setCenter(new GLatLng(53.232345, -8.162841), 7);
	}
	else
	{	
		// 2. Change map to county location		
		coordinates = countyCoordinates[countyValue];	
		map.setCenter(new GLatLng(coordinates[0], coordinates[1]), 10);
		
		// 3. Search for markers in this county
		addBrokers();
		addOnesource();
		addBranches();
		addConsultants();
		
		initTableHover();
	}
}

function clearData()
{
	map.clearOverlays();
	
	$('#brokerResultsTable tbody').html('');
	$('#onesourceResultsTable tbody').html('');
	$('#branchResultsTable tbody').html('');
	$('#consultantResultsTable tbody').html('');
	
	brokerMarkers = new Array();
	onesourceMarkers = new Array();
	branchMarkers = new Array();
	consultantMarkers = new Array();
	consultantDataList = new Array();
}

function removeMarkers(markersArray)
{
	for(bbi = 0; bbi < markersArray.length; bbi++)
	{
		map.removeOverlay(markersArray[bbi]);
	}
}

function addBrokers()
{	
	if($('#displayBrokers')[0].checked)
	{
		countyValue = $('#mapOptionsCounty').val();
		
		var brokerMarker;
		for(ai = 0; ai < brokerData.length; ai++)
		{
			if( countyValue.equalsIgnoreCase(brokerData[ai]['county']) )
			{
				brokerMarker = createMarker(brokerData[ai], 'broker');
				
				map.addOverlay(brokerMarker);
				brokerMarkers.push(brokerMarker);
				addTableResults(brokerData[ai], brokerMarkers.length - 1);
			}
		}
	}
}

function addOnesource()
{
	if($('#displayOnesource')[0].checked)
	{
		countyValue = $('#mapOptionsCounty').val();
		
		var onesourceMarker;
		for(bi = 0; bi < onesourceData.length; bi++)
		{
			if( countyValue.equalsIgnoreCase(onesourceData[bi]['county']) )
			{
				onesourceMarker = createMarker(onesourceData[bi], 'onesource')
				
				map.addOverlay(onesourceMarker);
				onesourceMarkers.push(onesourceMarker);			
				addTableResults(onesourceData[bi], onesourceMarkers.length - 1);
			}
		}
	}
}

function addBranches()
{
	if($('#displayBranches')[0].checked)
	{
		countyValue = $('#mapOptionsCounty').val();
		
		var branchMarker;
		for(ci = 0; ci < branchData.length; ci++)
		{
			if( branchData[ci]['county'].containsIgnoreCase(countyValue) )
			{
				branchMarker = createMarker(branchData[ci], branchData[ci]['type']);
				
				map.addOverlay(branchMarker);
				branchMarkers.push(branchMarker);
				addTableResults(branchData[ci], branchMarkers.length - 1);
			}
		}
	}
}

function addConsultants()
{
	if($('#displayConsultants')[0].checked)
	{
		countyValue = $('#mapOptionsCounty').val();
		
		var consultantMarker;
		for(di = 0; di < consultantData.length; di++)
		{
			for(dii = 0; dii < consultantData[di].locations.length; dii++)
			{
				if( consultantData[di].locations[dii]['main-area'].containsIgnoreCase(countyValue) 
				 || (countyValue == 'dublin' && (/[0-9]/.test(consultantData[di].locations[dii]['main-area']) || /[0-9]/.test(consultantData[di].locations[dii]['sub-area'])))
				 )
				{
					consultantMarker = createMarker(consultantData[di].locations[dii], 'consultant', consultantData[di]);
					map.addOverlay(consultantMarker);
					consultantMarkers.push(consultantMarker);
										
					// Need to add each item to list
					// Check if the item is already on list first
					// If it isnt add item to list
					var found = false;					
					for(xxi = 0; xxi < consultantDataList.length; xxi++)
					{
						if(consultantData[di]['first-name'] + consultantData[di]['last-name'] == consultantDataList[xxi]['first-name'] + consultantDataList[xxi]['last-name'])
						{
							found = true;
						}						
					}
					
					if(!found)
					{
						consultantDataList.push(consultantData[di]);
					}
				}
			}
		}
		
		addConsultantTableResults();
	}
}

function initTableHover()
{
	$('.mapResultsTableHover tbody tr').mouseover(function()
	{
		$(this).addClass('hover');
	});
	$('.mapResultsTableHover tbody tr').mouseout(function()
	{
		$(this).removeClass('hover');
	});	
}

function addTableResults(data, id)
{
	//log(' = addTableResults. id = ' + id);
	
	if(data['type'] == 'broker')
	{
		var rowHTML = '<tr onclick="openBubble(brokerMarkers[' + id + '])" >' + 
		'<td class="column1" >' + data['name'] + '</td>' + 
		'<td class="column2" >' + data['address1'] + ', '  + data['address2'] + '</td>' + 
		'<td class="column3" >' + data['telephone'] + '</td>' + 
		'<td class="column4" >' + '<a class="emailLink" href="mailto:' + data['email'] + '" >' + data['email'] + '</a></td>' + 
		'</tr>';
	
		$('#brokerResultsTable tbody').append(rowHTML);
	}
	else if(data['type'] == 'onesource')
	{
		var rowHTML = '<tr onclick="openBubble(onesourceMarkers[' + id + '])" >' + 
		'<td class="column1" >' + data['name'] + '</td>' + 
		'<td class="column2" >' + data['address1'] + ', '  + data['address2'] + '</td>' + 
		'<td class="column3" >' + data['telephone'] + '</td>' + 
		'<td class="column4" >' + '<a class="emailLink" href="mailto:' + data['email'] + '" >' + data['email'] + '</a></td>' + 
		'</tr>';
	
		$('#onesourceResultsTable tbody').append(rowHTML);
	}
	else if( (data['type'] == 'branch') || (data['type'] == 'atm') )
	{
		var rowHTML = '<tr onclick="openBubble(branchMarkers[' + id + '])" >' + 
		'<td class="column1" >' + data['branch-name'] + '</td>' + 
		'<td class="column2" >' + data['street'] + ', '  + data['town'] + '</td>' + 
		'<td class="column3" >' + data['telephone'] + '</td>' + 
		'<td class="column4" >' + '<a class="emailLink" href="mailto:' + data['email'] + '" >' + data['email'] + '</a></td>' + 
		'</tr>';
		
		$('#branchResultsTable tbody').append(rowHTML);
	}
}

function addConsultantTableResults()
{
	var bubbleNumber = 0;
	
	for(cti = 0; cti < consultantDataList.length; cti++)
	{
		var rowHTML = '<tr>' + 
		'<td class="column1a" >' + consultantDataList[cti]['first-name'] + consultantDataList[cti]['last-name'] + '</td>' + 
		'<td class="column2a" >' + '<a class="emailLink" href="mailto:' + consultantDataList[cti]['email'] + '" >' + consultantDataList[cti]['email'] + '</a></td>' + 
		'<td class="column3a" >';
		
		for(tri = 0; tri < consultantDataList[cti].locations.length; tri++)
		{
			if( consultantDataList[cti].locations[tri]['main-area'].containsIgnoreCase(countyValue) 
			 || consultantDataList[cti].locations[tri]['sub-area'].containsIgnoreCase(countyValue)
			 || (countyValue == 'dublin' && (/[0-9]/.test(consultantDataList[cti].locations[tri]['main-area']) || /[0-9]/.test(consultantDataList[cti].locations[tri]['sub-area'])))
			 )
			{
				if(countyValue == 'dublin' && (/[0-9]/.test(consultantDataList[cti].locations[tri]['main-area']) || /[0-9]/.test(consultantDataList[cti].locations[tri]['sub-area'])))
				{
					if(/[0-9]/.test(consultantDataList[cti].locations[tri]['main-area']))
					{
						consultantDataList[cti].locations[tri]['main-area'] = "Dublin " + consultantDataList[cti].locations[tri]['main-area'];
					}
					else
					{
						consultantDataList[cti].locations[tri]['main-area'] = "Dublin " + consultantDataList[cti].locations[tri]['main-area'];
					}
				}
				
				rowHTML += '<a href="javascript:openBubble(consultantMarkers[' + bubbleNumber + '])" >' + consultantDataList[cti].locations[tri]['main-area'] + ', ' +consultantDataList[cti].locations[tri]['sub-area'] + '</a><br />';								
				bubbleNumber++;
			}
		}
		
		rowHTML += '</td></tr>';
		
		$('#consultantResultsTable tbody').append(rowHTML);
	}
}

function openBubble(marker)
{
	if(map.getZoom() > selectedMarker)
		map.setCenter(new GLatLng(new Number(marker.latitude), new Number(marker.longitude)), map.getZoom());
	else
		map.setCenter(new GLatLng(new Number(marker.latitude), new Number(marker.longitude)), selectedMarker);
	
	clickedMarker = marker;
	
	marker.openInfoWindowHtml(marker.info);
}

function createMarker(markerData, type, consultantData) 
{
	//log(' = createMarker. type = ' + type);
	
	var markerIcon = new GIcon();
	
	if(type == 'broker')
	{
		markerIcon.image = brokerMarker;
	}
	else if(type == 'onesource')
	{
		markerIcon.image = onesourceMarker;
	}
	else if(type == 'branch')
	{
		markerIcon.image = branchMarker;
	}
	else if(type == 'atm')
	{
		markerIcon.image = atmMarker;
	}
	else if(type == 'consultant')
	{
		markerIcon.image = consultantMarkerImage;
	}
	
	//log('    - markerIcon.image = ' + markerIcon.image);
	
	markerIcon.iconSize = new GSize(20, 34);
	markerIcon.iconAnchor = new GPoint(10, 34);
	markerIcon.infoWindowAnchor = new GPoint(10, 17);
	
	m_opts = { icon:markerIcon };
	var location = new GLatLng(markerData['latitude'], markerData['longitude']);
	var marker = new GMarker(location, m_opts);
	
	GEvent.addListener(marker,"click",function() 
	{
		openBubble(marker);
	});
	
	marker.latitude = markerData['latitude'];
	marker.longitude = markerData['longitude'];
	
	if(type == 'broker' || type == 'onesource')
	{
		marker.info = generateInfo(markerData);	
	}
	else if(type == 'branch' || type == 'atm')
	{
		marker.info = generateBranchInfo(markerData);
	}
	else
	{
		marker.info = generateConsultantInfo(markerData, consultantData);
	}
	
	return marker;
}

function generateInfo(data)
{
	//log(' = generateInfo. data["name"] = ' + data['name']);
	
	var html = '<div class="markerInfo">';
	
	if(data['type'] == 'broker') {	
		html += '<span class="markerInfoType" >Independent Insurance Intermediary</span>'; 
	} else {
		html += '<span class="markerInfoType" >One Source Partner</span>'; 
	}
	html += '<h3>' + data['name'] + '</h3>';
	html += '<div class="markerInfoAddress" >';
	if(data['address1'] != '')
		html += data['address1'] + '<br />';
	if(data['address2'] != '')
		html += data['address2'] + ',<br />';
	if(data['county'] != '')
		html += data['county'] + ',<br />';
	if(data['postal-area'] != '')
		html += data['postal-area'] + ',<br />';
	if(data['postal-code'] != '')
		html += 'Dublin ' + data['postal-code'] + '<br />';	
	html += '</div>';
	if(data['phone'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Tel:</span><span class="markerContact2">' + data['telephone'] + '</span></span>';
	if(data['fax'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Fax:</span><span class="markerContact2">' + data['fax'] + '</span></span>';
	if(data['email'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Email:</span><a href="mailto:' + data['email'] + '" class="markerContact2 markerContactEmail">' + data['email'] + '</a></span>';
	if(data['web'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Web:</span><a href="http://' + data['web'] + '" class="markerContact2">' + data['web'] + '</a></span>';
	
	if(data['match-level'] != '')
		html += '<span class="matchContainer matchContainer2" ><span class="match-level1">Map position accuracy: </span><span class="match-level2">' + data['match-level'] + '</span></span>';
	
	html += '</div>';

	return html;
}

function generateBranchInfo(data)
{
	//log(' = generateBranchInfo. data["branch-name"] = ' + data['branch-name']);
	
	var html = '<div class="markerInfo">';
	if(data['type'] == 'branch') {
		html += '<span class="markerInfoType" >permanent tsb branch</span>'; 
	} else {
		html += '<span class="markerInfoType" >permanent tsb ATM</span>'; 
	}
	html += '<h3>' + data['branch-name'] + '</h3>';
	html += '<div class="markerInfoAddress" >';
	if(data['street'] != '')
		html += data['street'] + '<br />';
	if(data['town'] != '')
		html += data['town'] + ',<br />';
	if(data['county'] != '')
		html += data['county'] + ',<br />';
	if(data['other'] != '')
		html += data['other'] + ',<br />';
	html += '</div>';
	if(data['telephone'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Tel:</span><span class="markerContact2">' + data['telephone'] + '</span></span>';
	if(data['fax'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Fax:</span><span class="markerContact2">' + data['fax'] + '</span></span>';
	if(data['email'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Email:</span><a href="mailto:' + data['email'] + '" class="markerContact2 markerContactEmail">' + data['email'] + '</a></span>';
	if(data['sort-code'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Sort code:</span><span class="markerContact2">' + data['sort-code'] + '</span></span>';
	if(data['has-atm'] == 'true')
		html += '<span class="matchContainer" ><span class="markerContact1">ATM:</span><span class="markerContact2">Yes</span></span>';	
	
	html += '</div>';
	
	return html;
}

function generateConsultantInfo(data, consultantData)
{
	var html = '<div class="markerInfo markerInfoConsultant">';
	
	html += '<span class="markerInfoType" >Irish Life Personal Finance Consultant</span>'; 
	
	html += '<h3>' + consultantData['first-name'] + ' ' + consultantData['last-name'] + '</h3>';
	html += '<div class="markerInfoAddress" >';
	if(data['sub-area'] != '')
		html += data['sub-area'] + ',<br />';
	if(data['main-area'] != '')
		html += data['main-area'] + '<br />';
	html += '</div>';
	if(consultantData['email'] != '')
		html += '<span class="matchContainer" ><span class="markerContact1">Email:</span><a href="mailto:"' + consultantData['email'] + '" class="markerContact2 markerContactEmail">' + consultantData['email'] + '</a></span>';
	html += '</div>';
	
	return html;
}

function typeChange(type)
{
	//log(' = typeChange');
	
	if(type == 'brokers')
	{
		if($('#displayBrokers')[0].checked)
		{
			addBrokers();
		}
		else
		{
			removeMarkers(brokerMarkers);			
			$('#brokerResultsTable tbody').html('');
		}		
	}
	else if(type == 'oneSource')
	{
		if($('#displayOnesource')[0].checked)
		{
			addOnesource();
		}
		else
		{
			removeMarkers(onesourceMarkers);
			$('#onesourceResultsTable tbody').html('');
		}				
	}
	else if(type == 'ptsb')
	{
		if($('#displayBranches')[0].checked)
		{
			addBranches();
		}
		else
		{
			removeMarkers(branchMarkers);
			$('#branchResultsTable tbody').html('');
		}
	}
	else if(type == 'consultants')
	{
		if($('#displayConsultants')[0].checked)
		{
			addConsultants();
		}
		else
		{
			removeMarkers(consultantMarkers);
			$('#consultantResultsTable tbody').html('');
		}
	}	
}


function randomXToY(minVal,maxVal,floatVal)
{
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

String.prototype.equalsIgnoreCase=equalsIgnoreCase;
function equalsIgnoreCase(arg)
{               
	return (new String(this.toLowerCase()) == (new String(arg)).toLowerCase());
}

String.prototype.containsIgnoreCase=containsIgnoreCase;
function containsIgnoreCase(arg)
{
	return (new String(this.toLowerCase())).indexOf( (new String(arg)).toLowerCase() ) != -1;
}


var currentTabId = '0';
function tabChange(id)
{
	$('#tabHeading' + currentTabId).removeClass('on');
	$('#tabContent' + currentTabId).addClass('hidden');
	
	currentTabId = id;
	
	$('#tabHeading' + currentTabId).addClass('on');
	$('#tabContent' + currentTabId).removeClass('hidden');
}



var countyCoordinates = new Array();
countyCoordinates["carlow"] = [52.833857,-6.915894];
countyCoordinates["cavan"] = [53.99421,-7.360896];
countyCoordinates["clare"] = [52.784459,-9.080748];
countyCoordinates["cork"] = [51.897866,-8.471094];
countyCoordinates["donegal"] = [54.659111,-8.09967];
countyCoordinates["dublin" ] = [53.344104,-6.267494];
countyCoordinates["galway"] = [53.273797,-9.05178];
countyCoordinates["kerry"] = [52.222752,-9.709167];
countyCoordinates["kildare"] = [53.243029, -6.803283];
countyCoordinates["kilkenny"] = [52.653754,-7.247983];
countyCoordinates["laois"] = [52.94766,-7.353913];
countyCoordinates["leitrim"] = [53.960933,-8.083190];
countyCoordinates["limerick"] = [52.663857,-8.626773];
countyCoordinates["longford"] = [53.708302,-7.67828];
countyCoordinates["louth"] = [53.868284,-6.447111];
countyCoordinates["mayo"] = [53.972251,-9.486251];
countyCoordinates["meath"] = [53.631337,-6.790839];
countyCoordinates["monaghan"] = [54.194516,-6.874748];
countyCoordinates["offaly"] = [53.220073,-7.828947];
countyCoordinates["roscommon"] = [53.716692,-8.207996];
countyCoordinates["sligo"] = [54.270607,-8.471528];
countyCoordinates["tipperary"] = [52.696461,-7.906886];
countyCoordinates["waterford"] = [52.256787,-7.129204];
countyCoordinates["westmeath"] = [53.551425,-7.40268];
countyCoordinates["wexford"] = [52.339161,-6.460125];
countyCoordinates["wicklow"] = [53.094024,-6.168823];


