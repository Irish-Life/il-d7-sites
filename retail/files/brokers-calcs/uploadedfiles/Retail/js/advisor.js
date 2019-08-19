var map;
var geocoder;

// for setting up markers
var markersIndeArray = [];
var markersArray = [];
function clearOverlays(myArr) {
  if (myArr) {
    for (i in myArr) {
      myArr[i].setMap(null);
    }
  }
}


var windowsArray = [];
function clearInfoWindows() {
  if (windowsArray) {
    for (i in windowsArray) {
      windowsArray[i].close();
    }
  }
}

function initialize() {
 geocoder = new google.maps.Geocoder();
 var myLatlng = new google.maps.LatLng(53.35055131839989,-7.20703125);
 var myOptions = {
	 zoom: 7,
	 center: myLatlng,
	 mapTypeId: google.maps.MapTypeId.ROADMAP
 }

	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	// load the points and info into memory after the map has been displayed 
	$('#advisorMapPointerBox').fadeIn(1700);
	
	// load the advisor data - Irish Life Personal Finance Consultant	
	// load the Independent Insurance Intermediary
	$.getScript('http://www.irishlife.ie/uploadedfiles/retail/js/adviserData.js');
	
		// var markerCluster = new MarkerClusterer(map, markers);
	
}


function countyChange(marker, number) {

	clearOverlays(markersArray);
	$('#advisorMapPointerBox').fadeOut("slow");
	thisAdviserData=consultantData;
	// alert(thisAdvisorData.photo);
	createConsultantMarker();
	var mapStreetValues = $('#advisorMapStreet').val();
	var mapTownValues = $('#advisorMapTown').val();
	var mapCountyValues = $('#mapOptionsCounty').val();

	if (mapTownValues=="" && mapCountyValues=="")
	{
		mapTownValues = "Dublin";
		mapCountyValues="dublin";
	}

	var address = mapTownValues+",co."+mapCountyValues+", ireland";
 
	geocoder.geocode( { 'address': address}, function(results, status) {

	if (status == google.maps.GeocoderStatus.OK) {
		var myLatlngAddress = new google.maps.LatLng(results[0].geometry.location);
		map.setCenter(results[0].geometry.location);
		map.setZoom(9);
		var marker = new google.maps.Marker({
		map: map,
		position: results[0].geometry.location,
		animation: google.maps.Animation.DROP});
		markersArray.push(marker);
		google.maps.event.addListener(marker,"click",function(){});
	} 
	else{
		alert("Sorry, we could not find the address for the following reason: " + status);
		}
	});
	
	$("#firstCheckBox").attr("disabled", false); 
	$("#secondCheckBox").attr("disabled", false); 
	if (_gaq) _gaq.push(['_trackEvent', 'find advisors', 'Changing county', address]);  
}

// Create the Consultants on the screen
function createConsultantMarker()
{
	var consultantMarkerImage = new google.maps.MarkerImage('/uploadedImages/retail/img/map.person.icon.png');

	jQuery.each(thisAdviserData, function() {
		createMarker(this, this.locations[0], thisAdviserData, consultantMarkerImage);
	});
}

function createMarker(markerData, locData, thisAdviserData, marker) 
{
	lat = locData['latitude'];
	lng = locData['longitude'];
	
	var latlng = new google.maps.LatLng(lat,lng);  
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: marker
	});
	var contentString = '<div class="mapInfoWindow">'+
    '<div class="mapInfoWindowText"><h2>Irish Life Advisor</h2><br/>' +
	'<h3><b> '+markerData['firstname']+' '+markerData['lastname']+'</b></h3><hr/>'+
    '<h3><b>Phone:</b> '+markerData['phone']+'<br/> '+
    '<b>Fax:</b> '+markerData['fax']+'<br/> '+
    '<b>Email:</b> '+markerData['email']+'</h3>'+
    '</div>'+
    '</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	  //google.maps.event.addListener(marker, 'click', setInfoWindow);
	  google.maps.event.addListener(marker, 'click', function() {
	  clearInfoWindows();
      infowindow.setPosition(latlng);
	  infowindow.open(map,marker);
	  windowsArray.push(infowindow);
	});
	markersArray.push(marker);
}



// Create the independent Advisor Data on the screen
function createIndependentMarker()
{
	var consultantMarkerImage = new google.maps.MarkerImage('/uploadedImages/retail/img/map.person2.icon.png');

	jQuery.each(independentAdvisorData, function() {
		createIndMarker(this, this, independentAdvisorData, consultantMarkerImage);
	});
}
function createIndMarker(markerData, locData, thisAdviserData, marker) 
{
	lat = locData['latitude'];
	lng = locData['longitude'];
	
	var latlng = new google.maps.LatLng(lat,lng);  
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		animation: google.maps.Animation.DROP,
		icon: marker
	});
	var contentString = '<div class="mapInfoWindow">'+
    '<div class="mapInfoWindowText"><h2>Independent Insurance Intermediary</h2><br/>' +
	'<h2><b> '+markerData['name']+'</b></h2><hr/> '+
	'<h3> '+markerData['address1']+', '+markerData['address2']+', '+markerData['county']+'</h3>'+
    '<h3><b>Phone:</b> '+markerData['telephone']+'</h3> '+
    '<h3><b>Email:</b> '+markerData['email']+'</h3>'+
    '</div>'+
    '</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	  //google.maps.event.addListener(marker, 'click', setInfoWindow);
	  google.maps.event.addListener(marker, 'click', function() {
	  clearInfoWindows();
      infowindow.setPosition(latlng);
	  infowindow.open(map,marker);
	  windowsArray.push(infowindow);
	  if (_gaq) _gaq.push(['_trackEvent', 'find advisors', 'Clicking an advisor', markerData['name']]);  
	});
	markersIndeArray.push(marker);
}


$('#advisorMapTown').one('click', function() {
  //alert('This will be displayed only once.');
  $('#advisorMapPointerBox').fadeOut("slow");
});
$('#mapOptionsCounty').one('click', function() {
  //alert('This will be displayed only once.');
  $('#advisorMapPointerBox').fadeOut("slow");
});

// Check box listeners
$('#firstCheckBox').change(function() {
	if ($('#firstCheckBox:checked').val() !== undefined) {
		createConsultantMarker();
		if (_gaq) _gaq.push(['_trackEvent', 'find advisors', 'Consultants Checked']);  
	}
	else
	{
		clearOverlays(markersArray);
		clearInfoWindows();
		if (_gaq) _gaq.push(['_trackEvent', 'find advisors', 'Consultants Unchecked']);  
	}  
});

$('#secondCheckBox').change(function() {
	if ($('#secondCheckBox:checked').val() !== undefined) {
	  createIndependentMarker();
	  if (_gaq) _gaq.push(['_trackEvent', 'find advisors', 'Brokers Checked']);  
	}
	else
	{
		clearOverlays(markersIndeArray);
		clearInfoWindows();
		if (_gaq) _gaq.push(['_trackEvent', 'find advisors', 'Brokers Unchecked']);  
	}  
});


        $("input, textarea").focus(function(){
            $(this).addClass("activeMapInput");
    }).blur(function(){
            $(this).removeClass("activeMapInput");
    });
$(document).ready(function(){
	// checkbox buttons for map page;
	$( "#findFAAddress" ).button();
	initialize();
	
	$( "#advisormapLoader" ).addClass('hidden');
	$( "#advisormapLoaderComplete" ).removeClass('hidden');
	
 });