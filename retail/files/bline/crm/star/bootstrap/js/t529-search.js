(function($) {
	
	$(document).ready(function() {
		$(".searchBox").on('keyup', function (e) {
				if (e.keyCode == 13) {
					$('.search-loading').show();
					performSearch();
				}
			});
		$('.searchBtn').click(function() {
			$('.search-loading').show();
			performSearch();
		});
		function arrUnique(arr) {
				var ids = [];
				var clean = [];

				$.each(arr, function(index, value) {
					if($.inArray(value.id, ids) == -1)
					{
						ids.push(value.id);
						clean.push(value);
					}
				});
				return clean;
			}


	// when the async call for the contact search query 
	// is complete it is returned here
	updateSearchResultsContact = function(myContacts){
		$.each( myContacts, function( key, v ) {
			var contactName = (v.fullname) ? v.fullname.value : "";
			var broker = (v.broker) ? v.broker.name : "";
			var brokerID = (v.broker) ? v.broker.id : "";
			var email = (v.emailaddress1) ? v.emailaddress1.value : "";
			var phone = (v.telephone1) ? v.telephone1.value : "";
			var role = (v.role) ? v.role.formattedValue : "";
			var contactid = (v.contactid) ? v.contactid.value : "";
			
			$('.search-contacts-table').append(
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
		// Do a check for the vars and if all searches are complete then show results
		if(searchCountFull==3){
			
			if(myContacts.length>0){
				
				$('.table-searchcontacts').show();
			}
			else{
				
				$('.table-searchcontacts').hide();
			}
			
			showSearchResults();
			$('.search-loading').html('Searching complete. Results below.').delay(1000).fadeOut();
		}
	}
	
	
	var accountInfoConcat={};
	updateSearchResultsAccounts = function(myBrokers){
		
		$.extend(accountInfoConcat, myBrokers);
		if (searchCount==2)
		{
		$('.search-loading').html('<i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;Still searching, nearly there...');
			var ids = [];
			var clean = [];

			$.each(accountInfoConcat, function(index, value) {
				
		
				if($.inArray(value.accountid, ids) == -1)
				{
					ids.push(value.accountid);
					clean.push(value);
					console.log("added"+value.accountid);
				}
			});

			$.each( clean, function( key, v ) {
				var accountName = (v.name) ? v.name : "";
				var accountid = (v.accountid) ? v.accountid : "";
				var address1 = (v.address1) ? v.address1.value+"," : "";
				var address2 = (v.address2) ? v.address2.value+"," : "";
				var address3 = (v.address3) ? v.address3.value : "";
				var owner = (v.ownerid) ? v.ownerid.name : "";
				var segment = (v.segment) ? v.segment.formattedValue : "";
				var pareto = (v.pareto) ? v.pareto.formattedValue : "";
				var margin = (v.margin) ? v.margin.formattedValue : "";
				var ape = (v.ape) ? v.ape.formattedValue : "";
				var paretoRes='';
				if(pareto){
					paretoRes = '<i style="color:#FFCF30;" class="fa fa-star "></i>';
				}else{
					paretoRes = '<i style="color:#FFCF30;" class="fa fa-star "></i>';
				}
				$('.search-brokers-table').append(
					'<tr>'+
						'<td>'+paretoRes+'</td>'+
						'<td class=""><a href="javascript:void(0)" class="showAccount" data-accountid="'+accountid+'" data-accountname="'+accountName+'">'+accountName+'</td>'+
						'<td>'+address1+' '+address2+' '+address3+'</td>'+
						'<td>'+owner+'</td>'+
						'<td>'+segment+'</td>'+
						'<td>'+margin+'</td>'+
						'<td>'+ape+'</td>'+
					'</tr>'
					);
			});

			if(myBrokers.length>0){						
				
				$('.table-searchbrokers').show();
			}
			else{
				$('.table-searchbrokers').hide();
			}

				$('.showAccount').click(function() {
						// $('.account-modal').modal();
						var subID = $(this).data();
						window.open("broker.html#"+subID.accountid);
						
				});
			}
			
		
			// Do a check for the vars and if all searches are complete then show results
			if(searchCountFull==3){
				
				showSearchResults();
				$('.search-loading').hide();
			}
		}
	
		performSearch = function(){
			accountInfoConcat={};
			myContacts={};
			searchCountFull = 0;
			searchCount = 0;
			//$('.search-loading').show();
			$('.search-noresults').hide();
			$('.table-searchcontacts').hide();
			$('.search-contacts-table').html('');
			$('.search-brokers-table').html('');
			
			var searchq = $('.searchBox').val();
			
			$('#broker-search-form').addClass('was-validated');
			if (searchq.length>=3){
				$('.search-error').hide();
				var myContacts = findContact(searchq);
				var myBrokersDup = findBroker(searchq);
				var myBrokers = arrUnique(myBrokersDup);
				
			}else{
				$('.search-error').show();
			}
		}
		showSearchResults = function(){
			
			//console.log('at this point show search results');
			
			
		}
		
		
	});
	 
})(jQuery); // End of use strict


