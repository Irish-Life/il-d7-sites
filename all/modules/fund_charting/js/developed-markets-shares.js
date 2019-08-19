(function ($) {	
   $('#developed-markets-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
			marginTop: 0,
			spacingTop: 0
        },
        title: {
            text: null,
			margin:0
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        plotOptions: {
            pie: {
               innerSize: 80,
			   size:150
            }
        },
        series: [{
            name: 'Geographic Split',
            data: [
				['Japan 8.1%', 8.1],
				 ['United Kingdom 6.7%', 6.7],
				 ['France 3.37%', 3.37],
				 ['Switzerland 3.25%', 3.25],
                ['Other 25.53%', 25.53],
			    ['United States 53.6%', 53.6],
            ]
        }]
    });
})(jQuery);



