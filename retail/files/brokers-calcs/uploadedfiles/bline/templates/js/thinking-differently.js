$(function() {
		$( "#tabs" ).tabs({
			ajaxOptions: {
				error: function( xhr, status, index, anchor ) {
					$( anchor.hash ).html(
						"Couldn't load this tab. We'll try to fix this as soon as possible. " +
						"If this wouldn't be a demo." );
				}
			}
		});
		
		// Allow the user to pass in a param in the URL to set the opening tab by number
		if(window.location.hash) {
		if ($("#tabs").hasClass('ui-tabs')) {
				  var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		
				$( "#tabs" ).tabs( "option", "active",  hash-1);
			}
		
	  }
	});