(function ($) {
    $('#emerging-markets-pie').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: false,
                alpha: 45
            }
        },
        title: {
            text: 'The geographic split of the index is illustrated below'
        },
        plotOptions: {
            pie: {
                innerSize: 150,
                depth: 45
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