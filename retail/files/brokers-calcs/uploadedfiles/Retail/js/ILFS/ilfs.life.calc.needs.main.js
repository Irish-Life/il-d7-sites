	/*custom made function to create sliders...
	  Input values are - the id of the slider, the id of the output
	  the max vakue of the slider 
	*/
	var total, beforeSlide, householdCosts, medicalCosts, transportCosts,veducationCosts, leisureCosts, 
		otherCosts, id, value, pie, data, userAge, childAge, ANBdiff, myUserTerm, userTerm, userLumpSum, ballNumber, 
		userAge,userSumAssured, months31days, months30days, blue, green, orange, gold, purple, red, colors, outputdiv, 
		sumAssuredChanged, RSATermPicked;

	RSATermPicked = false;
	userSumAssured = 0;
	userAge = 0;
	ballNumber = 0;
	total = 0; //30000;
	beforeSlide = 0; //1000;
	userLumpSum = 0; //3000;
	data = [];
	householdCosts = 0; //7000;
	medicalCosts = 0; //4000;
	transportCosts = 0; //5000;
	educationCosts = 0; //5000;
	leisureCosts = 0; //4000;
	otherCosts = 0; //5000;
	sumAssuredChanged = false;
	months31days = ["0","2","4","6","7","9","11"];
	months30days = ["3","5","8","10"];
	blue = "#3069BF";
	green = "#A3BF30";
	orange = "#BF5B30";
	gold = "#BFA330";
	purple = "#7830BF";
	red =  "#BF3030";
	colors = [blue, green, orange, gold, purple, red];
	
	jQuery.fn.center = function () {
		this.css("position","absolute");
		this.css("top", Math.max(0, (($(this.parent()).height() - this.outerHeight()) / 2) + 
									$(this.parent()).scrollTop()) + "px");
		this.css("left", Math.max(0, (($(this.parent()).width() - this.outerWidth()) / 2) + 
									$(this.parent()).scrollLeft()) + "px");
		return this;
	}

	jQuery.fn.extend ( {
		createPieSlider: function (slider, current_value, max) {
		
			$( this ).slider ( {
				animate: true,
				range: "min",
				step: 10,
				value: 0, //1000,
				min: 0,
				max: max,
						
				start: function ( event, ui ) {
					$("#sliderBubble").fadeOut("fast");
					$('#firstScreenError').fadeOut("fast");
					beforeSlide = $('#' + slider).slider('option', 'value');
					var outputdiv = $('#' + slider).attr("outputdiv");
					$('#' + outputdiv).parent().addClass('hoverColor');
					$('.firstScreenResults').addClass('hoverColor');
				},
				
				slide: function ( event, ui ) { 
					update_slider();  
					updateGroup();
				},
				
				stop: function ( event, ui) {
					setTimeout( update_slider, 10);  
					setTimeout( updateGroup, 10);	
					setTimeout(createPie,10);
					setTimeout(updateLegend,10);
					$('.sliderRightBox').removeClass('hoverColor');			
					$('.firstScreenResults').removeClass('hoverColor');
				}
			} );	
			
			/*This function updates the monthly and yearly values which appear 
			beside underneath each slider slider. It also updates the Total for 
			all the sliders*/
			
			function update_slider () {
				value = $( '#' + slider ).slider( 'option', 'value' );
				total = total + (value - beforeSlide);
				
				// if(typeof updateSumAssured == 'function') { 
				// 	updateSumAssured(); 
				// }				

				updateSumAssured(); 
							
				$( '#' + current_value ).text ( 
					" Monthly: \u20AC" + addCommas(roundNumber(( value / 12), 0 ))
					+ " Yearly:  \u20AC" + addCommas(value) 
				);			
			}
			
			/*This function updates the total for each group */
			
			function updateGroup() {
			
				/*The 'id' variable stores the id of the div that the slider resides in. 
				A check is then made to see if it matches any of our groups, and then an 
				update is made to the appropriate group*/
		
				id = $( "#" + slider ).parent().attr( "group" ) + "Link";
				
				if ( id === "householdCostsLink" ) {
					householdCosts = householdCosts + ( value - beforeSlide );	
					$( '#' + id ).text( "Household Costs \u20AC" + addCommas( householdCosts ) );		
				}
				
				else if ( id === "medicalCostsLink" ) {
					medicalCosts = medicalCosts + ( value - beforeSlide );	
					$( '#' + id ).text( "Medical Costs \u20AC" + addCommas( medicalCosts ) );
				}
				
				else if ( id === "transportCostsLink" ) {
					transportCosts = transportCosts + ( value - beforeSlide );	
					$( '#' + id ).text( "Transport Costs \u20AC" + addCommas( transportCosts ) );
				}
				
				else if ( id === "educationCostsLink" ) {
					educationCosts = educationCosts + ( value - beforeSlide );	
					$( '#' + id ).text( "Education Costs \u20AC" + addCommas( educationCosts ) );
				}
				
				else if ( id === "leisureCostsLink" ) {
					leisureCosts = leisureCosts + ( value - beforeSlide );
					$( '#' + id ).text( "Leisure Costs \u20AC" + addCommas( leisureCosts ) );
				}
				
				else if ( id === "otherCostsLink" ) {
					otherCosts = otherCosts + ( value - beforeSlide );	
					$( '#' + id ).text( "Other Costs \u20AC" + addCommas( otherCosts ) );
				}
				else {
					value = 0;
				}
				
				$( "#total" ).text( "\u20AC" + addCommas(total) );
				/*Before slide is set to value at the end of each slide so that 
				for the next slide the previous slide is stored*/

				beforeSlide = value;
			}
		}
	});

	jQuery.fn.extend ( {
		createSlider: function (slider, current_value, max) {
			$( this ).slider ( {
				animate: true,
				range: "min",
				step: 10,
				value: 0, //1000,
				min: 0,
				max: max,
						
				start: function ( event, ui ) {
					beforeSlide = $('#' + slider).slider('option', 'value');
					var outputdiv = $('#' + slider).attr("outputdiv");
					$('#' + outputdiv).addClass('hoverColor');
					$('.secondScreenResults').addClass('hoverColor');
					if(RSATermPicked == true){$('#RSA').addClass('hoverColor');}
				},
				
				slide: function ( event, ui ) { 
					setTimeout( update_slider, 10 );  
				},
				
				stop: function ( event, ui) {
					setTimeout( update_slider, 10);  
					var outputdiv = $('#' + slider).attr("outputdiv");
					$('#' + outputdiv).removeClass('hoverColor');
					$('.secondScreenResults').removeClass('hoverColor');
					$('#RSA').removeClass('hoverColor');
				}
			} );	
			
			/*This function updates the monthly and yearly values which appear 
			beside underneath each slider slider. It also updates the Total for 
			all the sliders*/
			
			function update_slider () {
				value = $( '#' + slider ).slider( 'option', 'value' );
				userLumpSum = userLumpSum + (value - beforeSlide);
				
				// if(typeof updateSumAssured == 'function') { 

					updateSumAssured(); 
				// }		

				beforeSlide = value;
				$( '#' + current_value ).text( "\u20AC" + addCommas(value) );	
				$( '#lumpSumTotal' ).text( "\u20AC" + addCommas(userLumpSum) );								 
			}
		}
	});
	
	
	/*Function that updates the legend to represent the precentages of the different categories*/
	
	function updateLegend() {
		var i = 0;
		data = [householdCosts, medicalCosts, transportCosts, educationCosts, leisureCosts, otherCosts];
		
		$(".legendItemDesc").each( function () {
			if ( total == 0 ) {
				$(this).find(".percentage").html("0&#37;");
			}
			else {
				$(this).find(".percentage").html(  Math.round((data[i] / total) * 100, 2 ) + "&#37;" );
				i = i + 1;
			}
		})
	}

	/*	function which iterates through all the slider divs and applys sliders to them */
	
	$(".slider").each ( function () {
		
		//check to see if this slider will update a piechart. Indicated by the parent div having the attribute "pie"
		if(typeof $(this ).parent().attr( "pie" ) != 'undefined') {
			$( this ).createPieSlider( this.id, $( this ).attr( "outputDiv" ), $( this ).attr( "max" ));
		}
		else{
			$( this ).createSlider( this.id, $( this ).attr( "outputDiv" ), $( this ).attr( "max" ));
		}	
	});
	
	/*Function which adds options to the dropdown list.*/
	  
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
	
	/*This updates the sum assured value whenever a value is changed from the dropdown field
	  We make a check for reccomended term because calculate term only has to happen if the user 
	  doesn't manually pick it themselves. If they do pick it, we set the user term to the value
	  they picked and then calculate the user term based on their selection.*/
	  
	$(".dropDown ").change(function() {
		getUserAge();
		
		if($(this).attr("id") != "recommendedTerm"){
			calculateTerm();	
		}
		else{
		
			var a = document.getElementById("recommendedTerm");		
		
			if( a.options[a.selectedIndex].value !=0 ){
				RSATermPicked = true;
			
				$('#SecondScreenError').hide();
				userTerm = $("#recommendedTerm").val();
			}
			else{
				RSATermPicked = false;
			}
			
		}
		updateSumAssured();
		if ( sumAssuredChanged ) {
			$('#RSA').addClass('sumAssuredChangeColor');
			setTimeout( function(){ $( '#RSA' ).removeClass( 'sumAssuredChangeColor' ) }, 1000 );
		}
	})
	

	
	/*function which rounds the input number to the nearest 2 decimal places */
	
	function roundNumber ( num, dec ) {
		var result = Math.round ( num*Math.pow ( 10, dec )) / Math.pow ( 10 , dec );
		return result;
	}
	
	/*	function which calculates the user's age based on their DOB*/
	
	getUserAge = function () {
		var currentDate = new Date();
		
		userAge = currentDate.getFullYear() - $("#year").val();
		
		if( $("#month").val() < currentDate.getMonth() ){		
			userAge = userAge + 1;
		}
		else if ( $("#month").val() == currentDate.getMonth()) {
			if ( currentDate.getDay() < $("#day").val() + 1 ) {	
				userAge = userAge + 1;
			}
		}
	}
	
	/*Function which calculates the recommended term for the user, taking their age
	and the age of their youngest child into account.*/
	
	calculateTerm = function () {
	
		 childAge = $("#childAge").val();
		 ANBdiff = (25 - ( parseInt(childAge) + 1));
		 myUserTerm = 0;
		
		if (ANBdiff <= 10){
			myUserTerm = 9;
		}
		else{
			myUserTerm = ANBdiff;			
		}
		
		if( (parseInt( myUserTerm ) + parseInt( userAge ) ) >= 80){
			myUserTerm = 80 - (parseInt(userAge) + 2);//problem here
		}
		else if (childAge == 0){
			myUserTerm = 19;
		}

		userTerm = parseInt(myUserTerm) + 1;
		
		/*this changes the value of the recommended term dropdown value to make 
		the user term the selected value*/
		
		$("#recommendedTerm option:contains(" + userTerm + ")").attr('selected', 'selected');
	}
		
	updateSumAssured = function () {

		var recommendedProtectionTerm = parseInt( userTerm);
		var netMonthlyIncome = parseInt( total ) / 12;
		var nestEggCalc = parseInt( userLumpSum );
		var annuityRate = ( 1 - Math.pow( 1.03, - recommendedProtectionTerm ) ) / Math.log( 1.03 );
		var conversionFactor = annuityRate * 12;
		var sumAssuedCalced = netMonthlyIncome * conversionFactor;

		if(RSATermPicked == true){
					
			if ( userSumAssured === ( Math.round( ( sumAssuedCalced + nestEggCalc ) / 1000 ) * 1000 ) ) {
				sumAssuredChanged = false;
			}
			else {
				sumAssuredChanged = true;
				userSumAssured = Math.round((sumAssuedCalced + nestEggCalc) / 1000 ) * 1000;
				$( '.recommendedSumAssured' ).text( addCommas( "\u20AC" + String(userSumAssured) ) );
			}	
		}	
		else{

			if ( userSumAssured === ( Math.round( ( sumAssuedCalced + nestEggCalc ) / 1000 ) * 1000 ) ) {
				sumAssuredChanged = false;
			}
			else {
				sumAssuredChanged = true;
				userSumAssured = Math.round((sumAssuedCalced + nestEggCalc) / 1000 ) * 1000;
				$( '.recommendedSumAssured' ).text( addCommas( "\u20AC" + String(userSumAssured) ) );
			}	
		}

	}
	
	function getCheckedRadio(radio_group) {	
		return $("input[name='" + radio_group + "']:checked").val();
	}

	/*This function adds the appropriate amount of commas to a number value 
	so that they are more human readable. So for example, 100000  will become 100,000*/

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

	Raphael.easing_formulas.easysin =  function (n) {
		return Math.sin(n*1.5);
	}

	function createPie(){
		$('#pieChart').empty();	
		var archtype = Raphael("pieChart", 250, 250);
		archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {

			var alpha = 360 / total * value,
			a = (90 - alpha) * Math.PI / 180,
			x = xloc + R * Math.cos(a),
			y = yloc - R * Math.sin(a),
			path;
			
			if (total == value) {
				path = [["M", xloc, yloc - R], ["A", R, R, 0, 1, 1, xloc - .01, yloc - R]];
			} else
				path = [["M", xloc, yloc],["L", xloc, yloc - R], ["A", R, R, 0, +(alpha > 180), 1, x, y], ["L", xloc, yloc]];
	
			return {path: path};
		};

		function drawPie(){
		
			var colors =['#BF3030','#7830BF','#BFA330','#BF5B30','#A3BF30','#3069BF'];	
			var angArr = [householdCosts, medicalCosts, transportCosts, educationCosts, leisureCosts, otherCosts];
		
			for( i = 0; i < 6; i++){
				if(angArr[i] === 0){
					angArr [i] = 1;
				}		
			}
			
			var numOfAngles = angArr.length;
			
			/* start off with the first angle to enable the loop*/
			var wedgeArr = [angArr[0]]; 
						
			for(var i = 0; i < numOfAngles-1; i++){
				wedgeArr.push(wedgeArr[i]+angArr[i+1]);				
			}
						
			/* flip th order of the wedges for the animation*/
			wedgeArr.reverse(); 
						
			var totalangs = 0;
			for(var i = 0; i < numOfAngles; i++){
				totalangs += angArr[i];
			}
			
			var centerx = 80, centery = 80, radius = 70;
			archtype.path().attr({
				"fill": "#ffffff", 
				"stroke-width": 0, 
				"stroke-opacity": 0, 
				arc: [centerx, centery, 0, 0, radius+5]
			});
			
			for (i = 0 ;i < wedgeArr.length; i++){
		
				/*Create Arc*/
				var my_arc = archtype.path().attr({
					"fill": ""+ colors[i]  + "",
					"stroke": "#fff", 
					"stroke-width": 3,
					"stroke-linejoin" : "round",
					"stroke-linecap" : "round",  
					arc: [centerx, centery, 0, totalangs, radius]
				});	
				
				/*Animate arc*/						
				my_arc.animate({
					arc: [centerx, centery, wedgeArr[i], totalangs, radius]}, 
					1100, 
					"easysin"
				);
			}
		};
		drawPie();
	};
	
	/*Function which changes the number of days available in the days dropdown list 
	depending on the month chosen. I.e. if the user picks January then the number of 
	days in the days dropdown list will be 31. if they pick September then they can 
	only pick betyween 1 and 30 in the days dropdown list */
	
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
	});
	
	var tabs = $('#navigation li'); //grab tabs
	var contents = $('#tabs-contents li'); //grab contents

	tabs.bind('click',function(){
	  contents.hide(); //hide all contents
	  tabs.removeClass('current'); //remove 'current' classes
	  $(contents[$(this).index()]).show(); //show tab content that matches tab title index
	  $(this).addClass('current'); //add current class on clicked tab title
	});
		
	/*Setup for the male|female*/
	
	$('#lifeInsuranceGenderMale').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceGenderFemale').removeClass("selected");
		$('input:radio[name="genderFirst"]').filter('[value="M"]').attr('checked', true);
	});
	$('#lifeInsuranceGenderFemale').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceGenderMale').removeClass("selected");
		$('input:radio[name="genderFirst"]').filter('[value="F"]').attr('checked', true);
	});	
	
	/*Smoker|Non-smoker buttons */	
	$('#lifeInsuranceSmokerTrue').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceSmokerFalse').removeClass("selected");
		$('input:radio[name="smokingFirst"]').filter('[value="Y"]').attr('checked', true);
	});
	$('#lifeInsuranceSmokerFalse').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceSmokerTrue').removeClass("selected");
		$('input:radio[name="smokingFirst"]').filter('[value="N"]').attr('checked', true);
	});
	
	/*Increase with inflation buttons*/
	$('#lifeInsuranceInflationTrue').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceInflationFalse').removeClass("selected");
		$('input:radio[name="inflation"]').filter('[value="True"]').attr('checked', true);
	});
	$('#lifeInsuranceInflationFalse').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceInflationTrue').removeClass("selected");
		$('input:radio[name="inflation"]').filter('[value="False"]').attr('checked', true);
	});
		
	/*Guaranteed Cover Again buttons*/
	$('#lifeInsuranceCoverTrue').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceCoverFalse').removeClass("selected");
		$('input:radio[name="cover"]').filter('[value="True"]').attr('checked', true);
	});
	$('#lifeInsuranceCoverFalse').click(function(){
		$(this).addClass("selected");
		$('#lifeInsuranceCoverTrue').removeClass("selected");
		$('input:radio[name="cover"]').filter('[value="False"]').attr('checked', true);
	});
	
	$(document).ready(function() {
	
		$(".center").center();
		$("#infoPane").center();
		createPie();
			/*Function which adds the ball indicators to each of the sections*/
	
	
		$(".ball").each ( function () {
			if(ballNumber === colors.length){
				ballNumber = 0;
			}
			 //create circle with colour set to i where i is an array of colours
			var paper = new Raphael((this), 15, 15);  
			var circle = paper.circle(8, 7, 6).attr({fill: colors[ballNumber]});
			ballNumber = ballNumber + 1;
			
		});
		$(".smallBall").each ( function () {
			if(ballNumber === 6){
				ballNumber = 0;
			}
			// console.log("load - "+ ballNumber);
			/*create circle with colour set to i where i is an array of colours*/
			var paper = new Raphael((this), 17, 17);  
			var circle = paper.circle(10, 5, 4).attr({fill: colors[ballNumber]});
			ballNumber = ballNumber + 1;
		});
	
	
		//calculateTerm();
		/*This function adds a tooltip upon hovering over a html DOM element with the class toolTip associated with it.
		It also required the DOM element to have another attribute called Tooltip which will contain the text you want
		the tooltip to say, eg <div class = "toolTip" Tooltip = "This will apear in the tooltip box" > */
	
		$('.toolTip').hover( function(event) {
				var toolTip = $(this).attr('Tooltip');
				$('<span class = "tooltip"></span>').html(toolTip)
					.appendTo('body')
					.css('top', (event.pageY - 10) + 'px')
					.css('left', (event.pageX + 20) + 'px')
					.fadeIn('slow');
			}, 
			function() { 
				$('.tooltip').remove(); 
			}
			
		).mousemove(function(event) {
			$('.tooltip')
			.css('top', (event.pageY - 10) + 'px')
			.css('left', (event.pageX + 20) + 'px');
		});	
		
		//updateSumAssured();
		
		
		/*This function is for hiding the info pane if it is clicked*/
			
			
		$("#start").click(function() {
			$("#intro").fadeOut('500', function(){
				$(".tabs").fadeIn('800');
				$("#progressBarHolder").fadeIn('800');
				$("#progressBoxStep1").fadeIn('800');
			});
		});
		
		$("#loadingbox").fadeOut('800', function(){
			$("#intro").fadeIn('800');
		});
		
		$(".showQuoteBreakdown").click(function(e) {
			e.stopPropagation();
			$('#quoteBreakdownDetails').fadeIn('800');
		});
		
		
		$("#getInfoPane").click(function(e) {
			e.stopPropagation();
			$('#infoPane').fadeIn('800');
		});
		
		$(document).click(function() {
			$('#infoPane').fadeOut('1000');
			$('#quoteBreakdownDetails').fadeOut('1000');
		});
		
		$("#infoPane").click(function(e) {
			e.stopPropagation(); // This is the preferred method.
		});
		
		$("#quoteBreakdownDetails").click(function(e) {
			e.stopPropagation(); // This is the preferred method.
		});
		
		$(".hideQuoteBreakdown").click(function() {
			$('#quoteBreakdownDetails').fadeOut('1000');
		});	
		$("#hideInfo").click(function() {
			$('#infoPane').fadeOut('1000');
		});	
		
		$("#hideIntro").click(function() {
			$('#intro').hide();
			$("#progressBarHolder").fadeIn('800');
			$("#progressBoxStep1").fadeIn('800');
		});	
		
			//$("#progressBarHolder").fadeIn('800');
			//$("#progressBoxStep1").fadeIn('800');
			
		$zopim(function() {
			$zopim.livechat.hideAll();
		});
		
	});
	