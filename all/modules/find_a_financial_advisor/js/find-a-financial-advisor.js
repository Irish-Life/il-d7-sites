//Get markers for IE
var map, infoWindow, consultantMarkerImage, independentMarkerImage, geocoder, markerCluster, web;
var markers = [];
if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) < 7) {
    var styles = [{
        url: '/sites/all/modules/find_a_financial_advisor/img/m1.gif',
        height: 26,
        width: 26,
        opt_anchor: [13, 0],
        opt_textColor: '#ff00ff',
        opt_textSize: 10
    }, {
        url: '/sites/all/modules/find_a_financial_advisor/img/m2.gif',
        height: 27,
        width: 27,
        opt_anchor: [14, 0],
        opt_textColor: '#ff0000',
        opt_textSize: 11
    }, {
        url: '/sites/all/modules/find_a_financial_advisor/img/m3.gif',
        height: 31,
        width: 31,
        opt_anchor: [15, 0],
        opt_textSize: 12
    }];
}
// Check box listeners - Independent Broker
jQuery(document).ready(function() {
    initialize();
    jQuery('#iibCheckBox').change(function() {
        if (jQuery("#iibCheckBox").is(':checked')) {
            jQuery('#mobIibCheckBox').prop('checked', true);
        } else {
            jQuery('#mobIibCheckBox').prop('checked', false);
        }
        markerCluster.clearMarkers();
        infoWindow.close();
        addMarkers();
    });
    jQuery('#mobIibCheckBox').change(function() {
        if (jQuery("#mobIibCheckBox").is(':checked')) {
            jQuery('#iibCheckBox').prop('checked', true);
        } else {
            jQuery('#iibCheckBox').prop('checked', false);
        }
        markerCluster.clearMarkers();
        infoWindow.close();
        addMarkers();
    });
}); //Include Markers//
var demo;
addMarkers = function() {
        markers = [];
        //get json data and loop through
        jQuery.getJSON("/servlet/adviser", function(data) {
            for (var i = 0; i < data[0].advisers.length; i++) {
                var lat, lng;
                if (data[0].advisers[i].locations.length > 0) {
				
					for (var j = 0; j < data[0].advisers[i].locations.length; j++)
					{
						lat = data[0].advisers[i].locations[j].latitude;
						lng = data[0].advisers[i].locations[j].longitude;
						var id = data[0].advisers[i].id;
						var type = "" + data[0].advisers[i].type;
						//marker images
						consultantMarkerImage = new google.maps.MarkerImage('/sites/all/modules/find_a_financial_advisor/img/map.person.icon.png');
						independentMarkerImage = new google.maps.MarkerImage('/sites/all/modules/find_a_financial_advisor/img/map.person2.icon.png');
						//declare co-ordinates for google maps
						var latLng = new google.maps.LatLng(lat, lng);
						//Check if checkbox is checked and insert Broker marker
						if (type == "BR" && (jQuery("#iibCheckBox").is(':checked') || jQuery("#mobIibCheckBox").is(':checked'))) {
							var marker = new google.maps.Marker({
								position: latLng,
								myID: id,
								icon: independentMarkerImage
							});
							//when marker is clicked on
							var fn = markerClickFunction(id, latLng, '2', marker);
							google.maps.event.addListener(marker, 'click', fn);
							markers.push(marker);
							//Otherwise display only Agents marker
						} else if (type == "DB") {
							//position and place marker
							var marker = new google.maps.Marker({
								position: latLng,
								myID: id,
								icon: consultantMarkerImage
							});
							//when marker is clicked on
							var fn = markerClickFunction(id, latLng, '1', marker);
							google.maps.event.addListener(marker, 'click', fn);
							markers.push(marker);
						}
					}
                }
            };
            //Display info window when markers are clicked on
            infoWindow = new google.maps.InfoWindow();
            markerCluster = new MarkerClusterer(map, markers, {
                maxZoom: 13,
                gridSize: 40,
                styles: styles
            });
        });
    }
    //Initialise and centre Google Map  
function initialize() {
    var center = new google.maps.LatLng(53.35055131839989, -6.317138671875);

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    addMarkers();
} //Display Broker data in info 
markerClickFunction = function(myID, latlng, infoID, marker) {
    return function(e) {
        var fName, lName, id, address1, email, telephone, fax;
        //retrieve data
        jQuery.getJSON("/servlet/adviser?id=" + myID, function(data) {
            fName = data[0].adviser[0].firstname;
            lName = data[0].adviser[0].lastname;
            business = data[0].adviser[0].businessname;
            address1 = data[0].adviser[0].address;
            email = data[0].adviser[0].email
            telephone = data[0].adviser[0].phone;
            web = data[0].adviser[0].web;
            fax = data[0].adviser[0].fax;
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            var trackName = '';
            //Display data if Broker
            if (infoID == '2') {
                var independentAdvisorInfo =
                    '<div class="mapInfoWindow" style="height:230px; width: 330px;">' +
                    '<div class="mapInfoWindowText"><h2><u>Financial Broker or Advisor</u></h2>' +
                    '<h1><b> ' + business + '</b></h1> ' +
                    '<h3> ' + address1 + '</h3>' +
                    '<h3><b>Phone:</b> ' + telephone + '</h3> ';
                //If broker has email
                if (email != "null") {
                    independentAdvisorInfo = independentAdvisorInfo + '<h3><b>Email:</b> <a href="mailto:' + email + '">' + email + '</a></h3>';
                }
                //If broker has website display url
                if (web != "null") {
                    independentAdvisorInfo = independentAdvisorInfo + '<h3><b>Web:</b> <a href="' + web + '" target="_blank">' + web + '</a></h3>';
                }
                independentAdvisorInfo = independentAdvisorInfo +
                    '</div>' +
                    '</div>';
                infoWindow.setContent(independentAdvisorInfo);
                trackName = myID['name'];
            }
            //Display data if Tied Agent
            else {
                var ILAdvisorInfo = '<div class="mapInfoWindow">' +
                    '<div class="mapInfoWindowText"><h2><u>Irish Life Tied Agent</u></h2>' +
                    '<h1><b> ' + fName + ' ' + lName + '</b></h1>' +
                    '<h3><b>Phone:</b> ' + telephone + '<br/> ' +
                    '<b>Fax:</b> ' + fax + '<br/> ' +
                    '<b>Email:</b> <a href="mailto:' + email + '">' + email + '</a></h3>' +
                    '</div>' +
                    '</div>';
                infoWindow.setContent(ILAdvisorInfo);
                trackName = fName + ' ' + lName;
            }
            infoWindow.setPosition(latlng);
            infoWindow.open(map, marker);
        })
    };
};

function clearOverlays(myArr) {
    if (myArr) {
        for (i in myArr) {
            myArr[i].setMap(null);
        }
    }
    clearOverlays(markers);
    markerCluster.clearMarkers();
} //Change County
function countyChange() {
    var mapStreetValues = jQuery('#advisorMapStreet').val();
    var mapTownValues = jQuery('#advisorMapTown').val();
    var mapCountyValues = jQuery('#mapOptionsCounty').val();
    if (mapTownValues == "" && mapCountyValues == "") {
        mapTownValues = "Dublin";
        mapCountyValues = "dublin";
    }
    //var address = mapTownValues + ",co." + mapCountyValues + ", ireland";
	var address = "co. " + mapCountyValues + ", ireland";
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myLatlngAddress = new google.maps.LatLng(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
            map.setZoom(10);
        } else {
            alert("Sorry, we could not find the address for the following reason: " + status);
        }
    });
}; /**/