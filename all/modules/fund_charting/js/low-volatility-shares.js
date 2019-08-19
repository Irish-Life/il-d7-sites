(function ($) {
    // Age categories
    var categories = ['Technology', 'Industrials', 'Financials', 'Consumer Discetionary',
            'Materials', 'Telecoms', 'Energy', 'Utilities', 'Healthcare/Pharma',
            'Consumer Staples'];
    $(document).ready(function () {
		Highcharts.setOptions({
     colors: ['#69923A']
    });
		
        $('#low-volatility-shares-pie').highcharts({
            chart: {
                type: 'bar',
				backgroundColor: '#F1F6FC'
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
			colors: [
            '#002664'
            ],
			
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '%';
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', ' + this.point.category + '</b><br/>' +
                        'Weighting: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },

            series: [{
				showInLegend: false,
                data: [-7.5, -6.5, -6, -4.5, -2, 1, 3, 5,
                    10, 11]
            }]
        });
    });

})(jQuery);