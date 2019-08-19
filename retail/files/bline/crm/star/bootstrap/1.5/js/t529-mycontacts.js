(function($) {
	
	$(document).ready(function() {
	// on page load show this 
		var myContacts = getMyContacts();
		
		if (myContacts.length<=0){
	}
	else{
		
		$.each( myContacts, function( key, v ) {
			// totalTasks++;
				
			var contactName = (v.fullname) ? v.fullname.value : "";
			var broker = (v.broker) ? v.broker.name : "";
			var brokerID = (v.broker) ? v.broker.id : "";
			var email = (v.emailaddress1) ? v.emailaddress1.value : "";
			var phone = (v.telephone1) ? v.telephone1.value : "";
			var role = (v.role) ? v.role.formattedValue : "";
			var contactid = (v.contactid) ? v.contactid.value : "";

		
			$('.my-contacts-table').append(
				'<tr>'+
					'<td class="text-center"><a href="javascript:void(0);" style="color:#50C9B5;" class="openContactCRM" data-contactid="'+contactid+'"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a></td>'+
					'<td class="">'+contactName+'</td>'+
					'<td class=""><a href="mailto:'+email+'">'+email+'</a></td>'+
					'<td class="">'+phone+'</td>'+
					'<td class="">'+role+'</td>'+
					'<td class=""><a href="javascript:void(0)" class="showAccount" data-accountid="'+brokerID+'" data-accountname="'+broker+'">'+broker+'</a></td>'+
				'</tr>'
				);
		});

		
		$('.openContactCRM').click(function(){
			var contactID = $(this).data( "contactid" );
			Xrm.Utility.openEntityForm('contact',contactID);
		});
		
		
		$('.showAccount').click(function() {
				// $('.account-modal').modal();
				var subID = $(this).data();
				window.open("broker.html#"+subID.accountid);
				
		});
		
	}
		
		
		
		
		
		
		
		
	});
})(jQuery); // End of use strict


