(function ($) {

var url = 'https://www.irishlife.ie/eBusinessApps/Launch/Referral/Free/';
var refer= getParameterByName('refer');
var npa2014=getParameterByName('npa2014');
var numPlacesLeft=99999;
var values;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function remainingPlaces() {
	$.get("/secure/numAvailable.jsp", function(data) {
		str = jQuery.trim(data);
		values = str.split(';');
		var sellerCode='';
		var sellerHasLimit=false;
		if (refer !='') {
			for (var i=0; i < values.length;i++) {
				sellerCode = $.trim(values[i].split('=')[0]);
				if (refer == sellerCode) {
					sellerHasLimit = true;
					numPlacesLeft=values[i].split('=')[1];
				} 
			}
		} 
		if (sellerHasLimit){
			if(numPlacesLeft<1){
				$("#open").hide();
				$("#notOpen").show();

				$("#limitedOffer").html("This offer is fully subscribed.");
				numPlacesLeft = 0;
			}

			$('.freecoverRemain').html(numPlacesLeft);
			$('.freecoverRemain').digits();
		}


	});
}
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

refer = $.trim(refer).toUpperCase();
if (refer == '') {
	refer='~';
}

remainingPlaces();

})(jQuery);