(function($) {
	
	$(document).ready(function() {
		updateTickets();
		$( "#addTicket" ).on('shown.bs.modal', function(){		
			$('#broker-ticket-date').Zebra_DatePicker({
				format: 'M d, Y'
			});
		});
		
		$('.requestTicket').click(function(){
			$('#addTicket').modal();
			$('#broker-add-ticket-form').show();
			$('#submit-broker-ticket').show();
			$('.ticket-request-fail').hide();
			$('.ticket-request-success').hide();
		});	
		
		$('.filterTicketsCheck').click(function(){
			var filterSection = $(this).data( "section" );
			$('.filter-'+filterSection).toggle();
		});
		$('#submit-broker-ticket').click(function(){
			
			var ticketName = $('#broker-ticket-title').val();
			var ticketDate = $('#broker-ticket-date').val();
			
			var ticketNumberoftickets = $('#broker-segment-protection').val();
			var ticketBrokername = $('#broker-ticket-name').val();
			var ticketBrokercode = $('#broker-ticket-seller').val();

			$('#broker-add-ticket-form').addClass('was-validated');
			var enteredContact = $('#broker-add-ticket-form')[0].checkValidity();
			if (enteredContact){
				
				try {
					var ticket = {};


					var dateTicket = new Date(ticketDate);
					ticket.ilp_eventtitle = ticketName;
					ticket.ilp_numberoftickets = ticketNumberoftickets;
					ticket.ilp_eventdate = dateTicket;
					ticket.ilp_TicketAddonInformation = 'Broker Name: '+ticketBrokername+'\nBroker Code: '+ticketBrokercode;
					
					XrmServiceToolkit.Rest.Create(
						ticket,
						"ilp_ticketrequestSet",
						function (result) {
							$('#broker-add-ticket-form').hide();
							$('#submit-broker-ticket').hide();
							$('.ticket-request-success').show();
							updateTickets();									
						},
						function (error) {
							$('#broker-add-ticket-form').hide();
							$('#submit-broker-ticket').hide();
							$('.ticket-request-fail').show();	
						},
						false
		);
				}				
				catch(err) {
					console.log("there is an error "+err);
				}
				console.log('***happy enough sure***')
			}
		});
	

	});




	 function updateTickets(){
		$('.my-tickets-table').html('');
		var myTickets = getMyTickets();

		if(myTickets.length <= 0){
			$('#loadingTickets').hide();
			// no tickets activity
			$('.my-tickets-table').append(
				'<tr >'+
					'<td colspan="7">You have no ticket activity recorded in STAR CRM.</td>'+
				'</tr>'
				);
		}
		// load the tickets when the page loads
		$.each( myTickets, function( key, v ) {
			$('#loadingTickets').hide();
			//console.log(JSON.stringify(v)+'\n');

			var createdon = (v.createdon) ? v.createdon.formattedValue : "unknown";
			var statuscode = (v.statuscode) ? v.statuscode.formattedValue : "unknown";
			var eventtitle = (v.eventtitle) ? v.eventtitle.value : "unknown";
			var eventdate = (v.eventdate) ? v.eventdate.formattedValue : "unknown";
			var ticketrequestid = (v.ticketrequestid) ? v.ticketrequestid.value : "unknown";
			var numberoftickets = (v.numberoftickets) ? v.numberoftickets.value : "unknown";
			var accountid = (v.accountid) ? v.accountid.id : "";
			var owner = (v.ownerid) ? v.ownerid.formattedValue : "unknown";
			var accountname = (v.accountid) ? v.accountid.formattedValue : "Not Confirmed";

			var accHTML='';
			if(accountid==''){
				accHTML = '<td >'+accountname+'</td>';
			}
			else{
				accHTML = '<td ><a href="broker.html#'+accountid+'">'+accountname+'</a></td>';
			}
			$('.my-tickets-table').append(
				'<tr style="background:'+getTableRowColor(statuscode)+'" class="filter-'+statuscode.replace(/[^a-zA-Z0-9]+/g, '')+'">'+
					'<td class="text-center"><a href="javascript:void(0);" style="color:#50C9B5;" class="openTicketCRM" data-ticketid="'+ticketrequestid+'" ><i class="fa fa-fw fa-ticket"></i></a></td>'+
					'<td class="">'+createdon+'</td>'+
					'<td class="font-weight-bold">'+eventtitle+'</td>'+
					'<td class="">'+numberoftickets+'</td>'+
					'<td class="">'+eventdate+'</td>'+
					accHTML+
					'<td class="">'+owner+'</td>'+
					'<td class="">'+getStatusIcon(statuscode)+' '+statuscode+'</td>'+
				'</tr>'
				);
		});
			
		$('.openTicketCRM').off();
		$('.openTicketStar').off();
		$('.openTicketCRM').click(function(){
			var ticketID = $(this).data( "ticketid" );
			//console.log('CRM ' +ticketID);
			Xrm.Utility.openEntityForm('ilp_ticketrequest',ticketID);
		});
		$('.openTicketStar').click(function(){
			var ticketID = $(this).data( "ticketid" );
			//console.log('star ' +ticketID);
			Xrm.Utility.openEntityForm('ilp_ticketrequest',ticketID);
		});
	 }
})(jQuery); // End of use strict