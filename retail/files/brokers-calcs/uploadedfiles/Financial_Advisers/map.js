var map = null;
var selectedMarker = 14;
var consultantMarker = null;

function createConsultantMarker()
{
					consultantMarker = createMarker(thisAdviserData.locations[0], thisAdviserData);
					log('marker created ' + consultantMarker.longitude + ' ' + consultantMarker.latitude);
}

function addConsultantToMap()
{
					map.addOverlay(consultantMarker);
					openBubble(consultantMarker);
}

var consultantMarkerImage = "http://www.irishlife.ie/v2/img/marker/markerPurple.png";

function openBubble(marker)
{

	log('map zoom ' + map.getZoom());
	map.setCenter(new GLatLng(new Number(marker.latitude), new Number(marker.longitude)), selectedMarker);
		
	clickedMarker = marker;
	
	marker.openInfoWindowHtml(marker.info);
}

function createMarker(markerData, consultantData) 
{
	log('creating a marker');
	var markerIcon = new GIcon();
	
	markerIcon.image = consultantMarkerImage;	
	
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
	marker.info = generateConsultantInfo(markerData, consultantData);
	
		
	return marker;
}

function generateConsultantInfo2(data, consultantData)
{
	return '';
}

function generateConsultantInfo(data, consultantData)
{
	var html = '<div class="markerInfo markerInfoConsultant">';
	html += '<h3>' + consultantData['firstname'] + ' ' + consultantData['lastname'] + '</h3>';
	html += '<div class="markerInfoAddress" >';
	html += consultantData['address1'] + '<br />' + 
	consultantData['address2'] + '<br />' + 
	consultantData['address3'] +'<br />' + 
	consultantData['address4'] +'</div></div>';
	log('consultant info ' + html);
	return html;
}
function initialiseMap()
{
	if($("#mapCanvas").length)
	{
		if(GBrowserIsCompatible()) 
		{
			// Set the defaults for the Google Map
			map = new GMap2(document.getElementById("mapCanvas"));
			map.setCenter(new GLatLng(53.402982, -7.624512), 10);
			
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
function showMap()
{
		initialiseMap();
		createConsultantMarker();
		addConsultantToMap();
} 