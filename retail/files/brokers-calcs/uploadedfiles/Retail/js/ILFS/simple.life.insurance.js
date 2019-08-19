var p1gender, p1smoker, coverValue, p1dobday, p1dobmonth, p1dobyear,coverValue, 
fiveYears, tenYears, fifteenYears, twentyYears, fee, r;
var data = [10,10,10,10,10]; //set defaults for onload
var coverValue = 100000;
var max = 150000;
var min = 10000;
var	months31days = ["0","2","4","6","7","9","11"];
var	months30days = ["3","5","8","10"];



	$( "#simpleLifeInsuranceSlider" ).slider({
		range:"min",
		animate: true,
		value:coverValue,
		min: min,
		max: max,
		step: 1000,
		
		create: function( event, ui ) {	},
		slide: function( event, ui ) {
			var value = ui.value;
			$("#sliderValue").html("&#8364;" + addCommas(value) );
		},
		start: function(e,ui){
			$('#sliderValue').addClass('hoverColor');
			$('.sliderBox').addClass('hoverColor');
		},
		stop: function(e,ui){
			$('#sliderValue').removeClass('hoverColor');			
			$('.sliderBox').removeClass('hoverColor');	
			coverValue = ui.value;
			proceedWithQuote();
		}
	});
	
	
	function getCheckedRadio(radio_group) {	
		return $("input[name='" + radio_group + "']:checked").val();
	}
	
	
	function proceedWithQuote(){
		$( "#simpleLifeInsuranceSlider" ).slider({ disabled: true });
			$("#loadingbox").fadeIn('200');	
		
		
		// p1smoker = getCheckedRadio("smoker");
		p1smoker = $('input[name=rr]:checked').val();
//console.log('p1smoker '+p1smoker);
		p1dobday = $("#day").val();
		p1dobmonth = $("#month").val();
		p1dobyear = $("#year").val();
		
		
		var params = "LoadingPct=0&coverTypeCd=L&productId=29&quickQuoteId=simpleSum&coverTypeCd=L"+
					"&jointLife=False"+
					"&dateOfBirth1Day="+p1dobday+
					"&dateOfBirth1Month="+p1dobmonth+
					"&dateOfBirth1Year="+p1dobyear+
					"&sexCd1=M"+
					"&smokerCd1="+p1smoker+
					"&lifeCoverAmt="+coverValue+
					"&frequencyCd=M";
		
		
			$.ajax({
				type: 'GET',
				url: '/servlet/submitSimpleLifeQuote.do',
				async: true,
				data: params,
				cache :false,
				beforeSend: beforeAjax,
				success: successAjax,
				error: errorAjax,
				timeout: 200000
			});	
	}

	function successAjax(response){
		

		r = "" + response;
		// console.log("response = " +r);
		//var r = "fifteenYears5years=14.8&tenYears0years=16.18&tenYears5years=17.65&fifteenYears20years=18.84&fee=6.5"
		var partsArray = new Array("","","","");
		
		partsArray = r.split('&');
		
		fiveYears = partsArray[0].split('=');
		data[0] = fiveYears[1];
		//console.log('fiveYears = '+ data[0]);
		
		tenYears = partsArray[1].split('=');
		data[1] = tenYears[1];
		//console.log('tenYears = '+data[1]);
		
		fifteenYears = partsArray[2].split('=');
		data[2] = fifteenYears[1];
		//console.log('fifteenYears = '+data[2]);
		
		twentyYears = partsArray[3].split('=');
		data[3] = twentyYears[1];
		//console.log('twentyYears = ' +data[3]);
		
		fee = partsArray[4].split('=');
		data[4] = fee[1];
		//console.log('fee = ' + data[4]);
		
		
	
		redraw(data);
		$("#loadingbox").fadeOut('150');
		$( "#simpleLifeInsuranceSlider" ).slider({ disabled: false });
		//setTimeout(function(){;}, 1000);
	}

	function beforeAjax(){}
	function errorAjax(response){ console.log("error");}
	
	/*Function which adds options to the dropdown list.*/
	  /*
	$(".dropDown").each ( function () {
	
		var end = $( this ).attr( "end" );
		var start = $( this ).attr( "start" );
		
		if(start > end){
			for(var i = start; i > end; i--) {		
				$( this ).append('<option value="' + i + '">' + i + '</option>' );
			}
		}
		else {
			for(var i = start; i < end; i++) {		
				$( this ).append('<option value="' + i + '">' + i + '</option>' );
			}
		}
	});
	*/
	var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	for( var i = 1; i <= 12; i++ ){		
		$('#month').append( '<option value="'+ i + '">'+ months[i-1] + '</option>' );
	}
	for( var i = 1; i <= 31; i++ ){		
		$('#day').append( '<option value="'+ i + '">'+ i + '</option>' );
	}
	var thisyear= new Date().getFullYear();
	for( var i = thisyear-49; i <= thisyear-18; i++ ){		
		if( i ==1975)
		{
			$('#year').append( '<option value="'+ i + '" selected>'+ i + '</option>' );
		}
		else
		{
			$('#year').append( '<option value="'+ i + '">'+ i + '</option>' );
		}
	}
	
	/*Function which changes the number of days available in the days dropdown list 
	depending on the month chosen. I.e. if the user picks January then the number of 
	days in the days dropdown list will be 31.*/
	/*
	$('#month').change(function() {
	
		$( "#day" ).html( '<option value="1">1</option>' );
		var currentMonth = $("#month").val();
		var isLeap = new Date( $( "#year" ).val(), 1, 29).getMonth() == 1;
		
		if( $.inArray( String( currentMonth - 1 ), months31days ) != -1 ) {
			for( var i = 2; i < 32; i++ ){		
				$( "#day" ).append('<option value="' + i + '">' + i + '</option>' );
			}
		}
		else if ( $.inArray( String( currentMonth - 1 ) , months30days ) != -1 ) {
			for(var i = 2; i < 31; i++){		
				$( "#day" ).append('<option value="' + i + '">' + i + '</option>' );
			}
		}	
		else {
			if( isLeap === true ){
				for(var i = 2; i < 30; i++){		
					$( "#day" ).append('<option value="' + i + '">' + i + '</option>' );
				}	
			}
			else {
				for(var i = 2; i < 29; i++){		
					$( "#day" ).append('<option value="' + i + '">' + i + '</option>' );
				}	
			}
		}
			proceedWithQuote();
	});
*/
	$('#year').change(function() {
		proceedWithQuote();
	});
	$('#month').change(function() {
		proceedWithQuote();
	});
	$('#day').change(function() {
		proceedWithQuote();
	});
	$('#r1').change(function() {
		proceedWithQuote();
	});
	$('#r2').change(function() {
		proceedWithQuote();
	});
	
	
//#############################################################################################
//#############################################################################################
//#############################################################################################

var barHeights = [100,100,100,100];

function setBarHeights(){
	var barA,barB,barC,barD;
	barA = data[0], barB = data[1], barC = data[2], barD = data[3];
	var x = (Math.round((barD-barA)*100))/100;
	var y = (Math.round((barB-barA)*100))/100;
	var z = (Math.round((barC-barA)*100))/100;
	if( x <=0){
	console.log ("*** SECTION A");
		// The prices that are returned are all the same so make the heights all 
		// the same. They should be all as high as the highest.
		barHeights[0] = 30;		
		barHeights[1] = 30;
		barHeights[2] = 30;
		barHeights[3] = 30;
	}
	else if( barD <= 50 && barA >= 20){ // prices between €12.50 & €50
	console.log ("*** SECTION B");
		// There is a difference
		barHeights[0] = barA*2;		
		barHeights[1] = barB*2;
		barHeights[2] = barC*2;
		barHeights[3] = barD*2;
	}
	else if( barD < 20){ // Highest price less €20
	console.log ("*** SECTION C");
	var randomNum=Math.floor(Math.random()*10)
		// There is a difference
		barHeights[0] = randomNum+25;		
		barHeights[1] = randomNum+25+((y/x)*40);
		barHeights[2] = randomNum+25+((z/x)*40);
		barHeights[3] = randomNum+65;
	}
	else{
	console.log ("*** SECTION D");
		// There is a difference
		barHeights[0] = 25;		
		barHeights[1] = 25+((y/x)*75);
		barHeights[2] = 25+((z/x)*75);
		barHeights[3] = 100;
	}
	console.log("€"+barA+" / €"+barB+" / €"+barC+" / €"+barD)
	console.log(barHeights[0]+"px / "+barHeights[1]+"px / "+barHeights[2]+"px / "+barHeights[3]+"px")
}

function redraw( data ) {
console.log("****************");
	setBarHeights();
	dataset = data;                        
	for(var i = 0; i < dataset.length-1; i++) {
	
		var rect = bars[i];
		var value = values[i];
		// console.log(dataset[i]);
		rect.animate({ y: height - (barHeights[i]) },1000);
		rect.attr({'fill-opacity': 0.6+(barHeights[i]/200)});
		var numX=(Math.round(dataset[i]*100)/100).toFixed(2);
		values[i].attr({ text:"\u20AC" + numX });
		value.animate({ y: height - (barHeights[i] - 16) },1000);	
	}
}

var dataset =[20,20,20,20]; // make global
$(document).ready(function () {
	values = [];
	height = 100;
	width = 650;
	bars = [];
	years = ["5 yr","10 yr","15 yr","20 yr","25 yr"]
	var rectangle;
	var text;
	var rect;

	var paper = new Raphael(document.getElementById("barchart"), width,height );
	var xAxis = new Raphael(document.getElementById("xAxis"), width, 30 );
	
	for(var i = 0; i< dataset.length; i++) {
		 //rectangle = paper.rect(i * width/dataset.length + 8, height - (dataset[i] * 3),150,268);
		 rectangle = paper.rect(i * width/dataset.length + 10, 5,150,268);
		 rectangle.attr({  
					fill:'#f19c2b',
					stroke: '#e07e00',  
					'stroke-width': 1, 
					'stroke-linejoin': 'round'
		});
		
		
		text = paper.text(i * width/dataset.length +85,  height + dataset[i], "\u20AC" + dataset[i]);
		xAxis.text(i * width/dataset.length +90, 10, "" + years[i] +" term");		
		text.attr({
					fill:'#ffffff',
					'font-size' : 15,
					'font-weight' : 'bold'
		});
		values [i] = text;
		bars[i] = rectangle;
	}
	$("#simpleLifeInsuranceSlider").slider('value',coverValue);
	$("#sliderValue").html("&#8364;" + addCommas(coverValue) );
	//proceedWithQuote();
	
	
	$("#showSimpleCoverApp").click(function(){
		$(this).fadeOut(function(){
			$("#simpleCoverApp").fadeIn(1000, function(){;});
		});
		proceedWithQuote();
	})
	
	$(".noclassuse").addClass("unchecked");
	$(".noclassuse:first").addClass("checked");

	$(".noclassuse").click(function(){
		$(".noclassuse").removeClass("checked");
		$(this).addClass("checked");
	});
	
	
});

	function addCommas(nStr) {
		nStr += '';
		var x = nStr.split('.');
		var x1 = x[0];
		var x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}	