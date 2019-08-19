(function($) {
	

	$(document).ready(function() {
		var segment = decodeURIComponent(window.location.hash.substring(1));
		
		var results='';
		var segmentTitle="";
		var segmentDetails="";
		if(segment=="platform"){
			results = getSegmentAccounts('platform');
			segmentTitle = "Platform Segment";
			segmentDetails = "The platform segment shows all brokers who use the Irish Life Portus platform.";
		}
		else if(segment=="brokersource"){
			results = getSegmentAccounts('brokersource');
			segmentTitle = "Brokersource Segment";
			segmentDetails = "The Brokersource segment shows all brokers who are serviced by the inhouse team of Broker Sales Consultants. The focus for the Brokersource team is to understand the needs of large panels of brokers and engage with each brokers in a way that is relevant to them.";
			
		}
		else if(segment=="onesource"){
			results = getSegmentAccounts('onesource');	
			segmentTitle = "One Source Segment";
			segmentDetails = "The One Source segment shows all brokers who have partnered with us as a preferred provider.";
		
			
		}
		else if(segment=="core"){
			segmentTitle = "Core Segment";
			segmentDetails = "The core segment shows all brokers who are critical to our success but they are in a highly competitive environment.  ";
		
			results = getSegmentAccounts('core');
			
		}
		else if(segment=="top20"){
			segmentTitle = "Top 20%";
			segmentDetails = "The top 20% are the vital few as defined by the brokerage strategic plan.";
		
			results = getSegmentAccounts('top20');
			
		}
		else if(segment=="bottom80"){
			segmentTitle = "Bottom 20%";
			segmentDetails = "The Bottom 80% are serviced and supported in a digital first way, as defined by the brokerage strategic plan.";
		
			results = getSegmentAccounts('bottom80');
			
		}
		else{

		}
		//console.log(JSON.stringify(results));
		for(var i = 0; i<results.length; i++)	{
			// All the fields for the broker landing page
			var name = (results[i].name) ? results[i].name : "";
			var accountid = (results[i].accountid) ? results[i].accountid : "";
			var owner = (results[i].ownerid) ? results[i].ownerid.name : "";
			var segment = (results[i].segment) ? results[i].segment.formattedValue : "";
			var pareto = (results[i].pareto) ? results[i].pareto.formattedValue : "";
			var margin = (results[i].margin) ? results[i].margin.formattedValue : "";
			var address1 = (results[i].address1) ? results[i].address1.value : "";
			var address2 = (results[i].address2) ? results[i].address2.value : "";
			var address3 = (results[i].address3) ? results[i].address3.value : "";
			var county = (results[i].countu) ? results[i].countu.value : "";
			var ape = (results[i].ape) ? results[i].ape.formattedValue : "";
			
			// console.log(JSON.stringify(results));
			/*
			console.log('name '+name);
			console.log('accountid '+accountid);
			console.log('owner '+owner);
			console.log('pareto '+pareto);
			console.log('address1 '+address1);
			console.log('address3 '+address3);
			console.log('county '+county);
			console.log('segment '+segment);
			console.log('margin '+margin);
			console.log('ape '+ape);
			console.log('\n\n');
			*/

			$('.my-segment-table').append(
				'<tr>'+
					'<td class="font-weight-bold"><a href="javascript:void(0);" class="showAccount" data-accountid="'+accountid+'" data-accountname="'+name+'">'+name+'</a></td>'+
					'<td class="">'+owner+'</td>'+
					'<td class="">'+segment+'</td>'+
					'<td class="">'+margin+'</td>'+
					'<td class="">'+ape+'</td>'+
				'</tr>'
				);
		}
		// what happens when the user clicks on the link
		$('.showAccount').click(function() {
			// $('.account-modal').modal();
			var subID = $(this).data();
			window.location.href = "broker.html#"+subID.accountid;
		});

		// set the title and other information
		$('.segmenttitle').html(segmentTitle);
		$('.segmentinfo').html(segmentDetails);

		// now make the table searchable and sortable
		$('#segmentTable').DataTable( {
			"order": [[ 3, "desc" ]],
			stateSave: true
		} );
		$('#segmentpageloading').hide();
		$('#segmentpageholder').show();
	});
	 
})(jQuery); // End of use strict


