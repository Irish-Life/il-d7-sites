(function ($) {
	$('#dsc-signal-pie').highcharts({
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            x: -20
        },
		credits: {
				enabled: false
			},
		exporting: { 
				enabled: false 
			},
        xAxis: {
            categories: ['01-10-14', '12-11-14', '24-12-14', '04-02-15', '18-03-15', '29-04-15',
                '10-06-15', '22-07-15', '02-09-15', '30-09-15', '31-12-15']
        },
        yAxis: {
            title: {
                text: 'DSC Signal'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
       
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
			showInLegend: false,
            data: [0.657125763513038, 0.738031400609724, 1.0102555175885, 0.994640500308612, 1.42670892158713,  1.01948296068188, 0.952077008819924, 0.904075431986958, 0.164, 0.14, 0.279341096]
        }]
    });
})(jQuery);



