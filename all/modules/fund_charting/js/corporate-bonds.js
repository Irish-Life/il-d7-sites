(function ($) {
	 $('#corporate-bonds-pie').highcharts({
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
				['Utility 12.52%', 12.52],
				 ['Banking 34.26%', 34.26],
				 ['Basic Industry 5.12%', 5.12],
				 ['Automotive 5.22%', 5.22],
                ['Capital Goods 4.29%', 4.29],
				['Consumer Goods 5.31%', 5.31],
				['Leisure 0.06%', 0.06],
				['Energy 5.56%', 5.56],
				['Financial Services 1.02%', 1.02],
				['Insurance 4.78%', 4.78],
				['Media 1.03%', 1.03],
				['Retail 2.24%', 2.24],
				['Transportation 4.47%', 4.47],
				['Real Estate 1.71%', 1.71],
				['Services 0.66%', 0.66],
				['Healthcare 3.01%', 3.01],
				['Technology & Electronics 1.57%', 1.57],
			    ['Telecommunications 7.19%', 7.19],
            ]
        }]
    });
})(jQuery);



