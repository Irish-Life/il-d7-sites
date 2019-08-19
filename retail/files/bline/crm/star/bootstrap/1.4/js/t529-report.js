(function($) {
	
	$('#report-holder').html('Loading page, this may take a few seconds so please wait.');
	$(document).ready(function() {
		// get the report
		
		var reportID = decodeURIComponent(window.location.hash.substring(1));
		var html='Nothing to load.';
		// build a table
		if (reportID=='por')
		{
			var results = getResults('por');
			//console.log(JSON.stringify(results));

			var chart ='show chart';
			var tableStart ='<table id="reportTable" class="table table-light table-sm border table-bordered mb-0">'+
			'<thead class="thead-dark"><tr class="table-active border-bottom-0"><th scope="col">Subject</th><th scope="col">Owner</th><th scope="col">Status</th></tr></thead>'+
			'<tbody style="font-size:0.8em;">';

			var tableRows='';
			$.each( results, function( key, v ) {
			
				var sub = (v.attributes.subject) ? v.attributes.subject.value : "unknown";
				var user = (v.attributes.ownerid) ? v.attributes.ownerid.formattedValue : "unknown";
				var stat = (v.attributes.statecode) ? v.attributes.statecode.formattedValue : "unknown";
				
				tableRows += '<tr><td>'+sub+'</td><td>'+user+'</td><td >'+stat
				+'</td></tr>';			
			
			});	
			var tableEnd = '</tbody></table>';

			html = tableStart+tableRows+tableEnd;
			
			// build a chart
			// console.log('page loaded');

			$('#report-holder').html(html);
			
			$('#reportTable').DataTable( {
				"order": [[ 3, "desc" ]],
				stateSave: true
			} );
		}
	});


	// get the task activities for a specific broker
	function getResults(area){
		var q;
		if (area =='por'){
			q = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				'<entity name="phonecall">'+
				'<attribute name="subject" />'+
				'<attribute name="statecode" />'+
				'<attribute name="ownerid" />'+
				'<order attribute="scheduledstart" descending="true" />'+
				'<filter type="and">'+
					'<condition attribute="subject" operator="like" value="%Phase 1%" />'+
				'</filter>'+
				'</entity>'+
			'</fetch>';
		}

		var fetched = XrmServiceToolkit.Soap.Fetch(q);		

		return fetched;
	}



})(jQuery); // End of use strict