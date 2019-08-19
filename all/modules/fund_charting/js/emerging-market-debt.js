(function ($) {
	 $('#emerging-market-debt-pie').highcharts({
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
				['Turkey 9.7%', 9.7],
				 ['Brazil 10%', 10],
				 ['Chile 0.11%', 0.11],
				 ['Colombia 6.83%', 6.83],
                ['Hungary 5.84%', 5.84],
				['Indonesia 8.60%', 8.60],
				['Malaysia 9.45%', 9.45],
				['Mexico 10%', 10],
				['Nigeria 0.79%', 0.79],
				['Peru 1.90%', 1.90],
				['Phillipines 0.48%', 0.48],
				['Poland 10%', 10],
				['Romania 3.09%', 3.09],
				['Russia 4.93%', 4.93],
				['South Africa 10%', 10],
			    ['Thailand 8.73%', 8.73],
            ]
        }]
    });
})(jQuery);



