(function($){
var fundName;
var fundData;	
var fundChartDataCollected = []; 
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
drawChart = function(){
		
		$('#fundsChartChart').highcharts('StockChart', {		    
		 title : {
                text : 'Historical Performance'
            },
		colors: ['#5261ac', '#f19c2b', '#5cc151', '#cc092f', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4'],
		credits: {enabled: false},
   chart: {
			marginRight: 0,
			borderRadius: 0, 
			borderWidth: 1,
			height:500,
			borderColor: "#dddddd",
			style: {
			fontFamily: 'Arial, sans-serif',
			fontSize: '12px',
			},
			
			
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
		    	pointFormat: '<span style="color:{series.color}">Price</span>: <b>€{point.y}</b> ({point.change}%)<br/>',
		    	valueDecimals: 2
		    },
		    
			legend: {
				enabled: false
			},
			series: [{
				name: fundName,
				data: fundData
			}]
		    //series: fundChartDataCollected[0]
		});
		$('.highcharts-container').css('float','left');
}

getChartDataAgain = function(){
	$('#fundsChartBody').show();
	// set the url hash
	//
	$('#fundsChartBody').html("<div id=\"fundsChartChart\"></div>");
	
	var fundSelected = localStorage.getItem("mapsFundSelected");
	var fundPricesTotal = 0;
	fundChartDataCollected = []; 
	
	$('#fundsChartChart').html("<h2>LOADING...</h2><div class=\"progress supplementary\"><span class=\"meter\" style=\"width:0%\"></span></div>");
		name = name.split(';')[1];

			/*$.getJSON('https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundComparisonChart?fundIds='+fundSelected.split(';')[0], function (data, error){

			})
			.done(function ( data ) {
				fundChartDataCollected[0] = {
					name: name,
					data: data
				};
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				console.log("error, try again later");
			})
			.always(function ( dataORjqXHR, textStatus, jqXHRORerrorThrown) {
				fundPricesTotal += dataORjqXHR.length;
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
				$('#fundsChartChart').html("<img alt=\"Loading\" src=\"/sites/all/modules/fund_centre/css/images/ajax-loader.gif\">");
				
					drawChart();					
					$('#fundsTableBody').show();
					$('.hideChartClose').show();
			}); */

            $.ajax({
				type: 'POST', 
				url: 'https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundComparisonChart?fundIds='+fundSelected.split(';')[0], //COMPARE AJAX CALL CHANGE TO IRISHLIFE.IE WHEN GOING LIVE
				success: function (response) {
					console.log(response);
					var data = response;

					for (var i=0; i < data.length;i++) {
						  fundName = data[i].FundId;
						  fundData = JSON.parse(data[i].Data);

						  console.log('Fund name = ' + fundName);
						  console.log('Fund data = ' + fundData);
					}

					fundChartDataCollected[0] = {
						name: fundName,
						data: fundData
					};

					$('#fundsChartChart').html("<img alt=\"Loading\" src=\"/sites/all/modules/fund_centre/css/images/ajax-loader.gif\">");
					
						drawChart();					
						$('#fundsTableBody').show();
						$('.hideChartClose').show();

						},			
				error: function(error,status){
									  a.error("error, try again later")
									  //console.log(error);
						}
				}).always(function ( dataORjqXHR, textStatus, jqXHRORerrorThrown) {
					fundPricesTotal += dataORjqXHR.length;
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
					
				}); 

}

window.onload=function(){
	getChartDataAgain();
}
}
)(jQuery);

