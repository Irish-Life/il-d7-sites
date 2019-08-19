(function($) {
	
function getTaskIcon(taskType){
	
	var arrowIcon='';
	if (taskType=="phonecall"){
		arrowIcon = '<i class="fa fa-phone" aria-hidden="true"></i>';
	}
	else if (taskType=="email"){
		arrowIcon = '<i class="fa fa-envelope-o" aria-hidden="true"></i>';
	}
	else if (taskType=="task"){
		arrowIcon = '<i class="fa fa-calendar-check-o" aria-hidden="true"></i>';
	}else{
		
		arrowIcon = '<i style="color:#EDEAED;" class="fa fa-circle" aria-hidden="true"></i>';
	}

	return arrowIcon;
	
}
function getPriorityIcon(taskType){
	
	var arrowIcon='';
	if (taskType=="0"){
		arrowIcon = '<i style="color:#A4A4A4;font-size:20px;" class="fa fa-thermometer-quarter" aria-hidden="true"></i>';
	}
	else if (taskType=="1"){
		arrowIcon = '<i style="color:#FCB364;font-size:20px;" class="fa fa-thermometer-half" aria-hidden="true"></i>';
	}
	else if (taskType=="2"){
		arrowIcon = '<i style="color:#50C9B5;font-size:20px;" class="fa fa-thermometer-full" aria-hidden="true"></i>';
	}else{
		
		arrowIcon = '<i style="color:#A4A4A4;font-size:20px;" class="fa fa-thermometer-empty" aria-hidden="true"></i>';
	}

	return arrowIcon;
	
}

	
	
	$(document).ready(function() {
	// on page load show this 
		var myPanel = getMyPanel();
		
		if (myPanel.length<=0){
		$('.panel-empty').show();
		$('#all-panel-loading').hide();
		$('#list-panel').fadeIn();
	}
	else{
		$('.tasks-empty').hide();	
		
		var totalPanel=0;
		$.each( myPanel, function( key, v ) {
			// totalTasks++;
			

			
			var accountName = (v.name) ? v.name.value : "";
			var brokersegment = (v.brokersegment) ? v.brokersegment.formattedValue : "";
			var accountID = (v.accountid) ? v.accountid.value : "";
			var accountWarning = (v.warning) ? v.warning.formattedValue : "";
			var accountWarningDetails = (v.warningDetails) ? v.warningDetails.value : "";
			
			var thisyearMargin = (v.thisyearMargin) ? v.thisyearMargin.value : "";
			var thisyearMarginFormatted = (v.thisyearMargin) ? v.thisyearMargin.formattedValue : "";
			var thisyearApe = (v.thisyearApe) ? v.thisyearApe.value : "";
			var thisyearApeFormatted = (v.thisyearApe) ? v.thisyearApe.formattedValue : "";
			var lastyearApe = (v.lastyearApe) ? v.lastyearApe.value : "";
			var lastyearMargin = (v.lastyearMargin) ? v.lastyearMargin.value : "";
			
			var volumenumberofcases = (v.volumenumberofcases) ? v.volumenumberofcases.value : "";
			
			var threeYP = (v.threeYP) ? v.threeYP.value : "";
			var pareto = (v.pareto) ? v.pareto.value : "";
			var brokervaluetier = (v.brokervaluetier) ? v.brokervaluetier.value : "";
			

		
			$('.my-panel-table').append(
				'<tr>'+
					'<td class="text-center">&nbsp;</td>'+
					'<td class=""><a href="javascript:void(0)" class="showAccount" data-accountid="'+accountID+'" data-accountname="'+name+'">'+accountName+'</td>'+
					'<td class="">'+getArrowIcon(thisyearMargin,lastyearMargin)+'&nbsp;'+thisyearMarginFormatted+'</td>'+
					'<td class="">'+getArrowIcon(thisyearApe,lastyearApe)+'&nbsp;'+thisyearApeFormatted+'</td>'+
					'<td class="">'+brokersegment+'</td>'+
					'<td class="">'+volumenumberofcases+'</td>'+
					'<td class="">'+brokervaluetier+'</td>'+
					'<td class="">'+threeYP+'</td>'+
				'</tr>'
				);
		});

		
		$('.showAccount').click(function() {
				// $('.account-modal').modal();
				var subID = $(this).data();
				window.open("broker.html#"+subID.accountid);
				
		});
		
	}
		
		
		
		
		
		
		
		
	});
})(jQuery); // End of use strict


