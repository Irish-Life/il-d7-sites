(function() {
				// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
				if (!String.prototype.trim) {
					(function() {
						// Make sure we trim BOM and NBSP
						var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
						String.prototype.trim = function() {
							return this.replace(rtrim, '');
						};
					})();
				}

				[].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
					// in case the input is already filled..
					if( inputEl.value.trim() !== '' ) {
						classie.add( inputEl.parentNode, 'input--filled' );
					}

					// events:
					inputEl.addEventListener( 'focus', onInputFocus );
					inputEl.addEventListener( 'blur', onInputBlur );
				} );

				function onInputFocus( ev ) {
					classie.add( ev.target.parentNode, 'input--filled' );
				}

				function onInputBlur( ev ) {
					if( ev.target.value.trim() === '' ) {
						classie.remove( ev.target.parentNode, 'input--filled' );
					}
				}
        $('.close-help').click(function(){
          $('#main-inputs').fadeIn();
          $('#help-details').hide();
          $('#register-details').hide();
        });
        
        $('.close-register').click(function(){
          $('#main-inputs').fadeIn();
          $('#help-details').hide();
          $('#register-details').hide();
        });
        
        
        $('#registerPerson').click(function(){
          $('#main-inputs').hide();
          $('#help-details').hide();
          $('#register-details').fadeIn();
        });
        $('#helpPerson').click(function(){
          $('#main-inputs').hide();
          $('#register-details').hide();
          $('#help-details').fadeIn();
        });
        
			})();
      
      
      
      
      
      
      function cycleBackgrounds() {
	var index = 0;

	$imageEls = $('.toggle-image'); // Get the images to be cycled.

	setInterval(function () {
		// Get the next index.  If at end, restart to the beginning.
		index = index + 1 < $imageEls.length ? index + 1 : 0;
		// Show the next image.
		$imageEls.eq(index).addClass('show');
		// Hide the previous image.
		$imageEls.eq(index - 1).removeClass('show');

	}, 20000);
};

// Document Ready.
$(function () {
	cycleBackgrounds();
});
      