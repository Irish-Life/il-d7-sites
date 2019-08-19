(function ($) {
	 $('#government-bonds-pie').highcharts({
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
				['Lithuania 0.06%', 0.06],
				 ['Luxembourg 0.12%', 0.12],
				 ['Netherlands 6.96%', 6.96],
				 ['Slovenia 0.29%', 0.29],
                ['Slovakia 0.51%', 0.51],
				['Austria 3.76%', 3.76],
				['Belgium 4.92%', 4.92],
				['Germany 19.79%', 19.79],
				['Spain 14.01%', 14.01],
				['Finland 1.52%', 1.52],
				['France 22.7%', 22.7],
				['Ireland 2.23%', 2.23],
			    ['Italy 23.13%', 23.13],
            ]
        }]
    });
})(jQuery);



