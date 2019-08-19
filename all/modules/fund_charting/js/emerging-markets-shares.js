(function ($) {
	Highcharts.setOptions({
     colors: ['#69923A', '#C9DD03', '#9ADCC6', '#5582AB', '#002664', '#50C9B5']
    });
    $('#emerging-markets-pie').highcharts({
        chart: {
            type: 'pie',
			backgroundColor: '#F1F6FC',
            options3d: {
                enabled: false,
                alpha: 45
            }
        },
        title: {
            text: ''
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
				['China 23.16%', 23.16],
				 ['South Korea 16.18%', 16.18],
				 ['Taiwan 13.21%', 3.85],
				 ['India 9.27%', 9.27],
                ['South Africa 7.54%', 7.54],
			    ['Other 30.64%', 30.64],
            ]
        }]
    });
})(jQuery);