(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define([ "jquery" ], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.pc = $.pc || {};

var version = $.pc.version = "1.0";


function PensionCalculator() {

	//End point to get the content for the back
	this._contentEndPoint = "https://www.irishlife.ie/pensions/pension_calc/widget/aib"; // test webpage
	//path to a css file with custom css that will style caculator for banks
	this._cssEndPoint = 'https://www.irishlife.ie/sites/all/modules/pension_calc/deploy/aib.css';	//this can also be on another server

}


function getCalculatorContent(url){
	$('#pension_response').hide();
	console.log('getting script');
	try
	{
	$.get( url, function( data ) {
		console.log("data received");
	  	$('#pension_response').html(data);
	  	$('#pension_response').show();
	});
	}
	catch(err) {
		console.log("Error attempting to get content " + url);
		console.log("error is " + err);
	}
}

function addCustomCssToPage(css){
	if(css != null && css != ""){
		var cssfile = '<link rel="stylesheet" href="'+css+'" type="text/css" />';
		$('head').append(cssfile);
	}
}


$.fn.pensioncalculator = function( options ) {

	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if ( !$.pensioncalculator.initialized ) {		
		$.pensioncalculator.initialized = true;

		getCalculatorContent( $.pensioncalculator._contentEndPoint );
		addCustomCssToPage($.pensioncalculator._cssEndPoint);

	}

	
};


$.pensioncalculator = new PensionCalculator(); // singleton instance
$.pensioncalculator.initialized = false;
$.pensioncalculator.uuid = new Date().getTime();
$.pensioncalculator.version = "1.0";





}));