//CHANGES THE MAIN MENU MOS BUTTON DEPENDING ON LOGIN
(function($) { /* Code here */ 

    var cx = '010888959185650814693:yvxml3wm7nk';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);

$( document ).ready(function() {
	if(amILoggedIn) {
		$('.searchbox').addClass('neg-margin');
		$('.menu-2663').hide();
		$('.menu-3168 a').attr('href','https://www.irishlife.ie/myonlineservices/ClientB2C/Home');
		$('.menu-3168 a').html('My Irish Life');
		$('.menu-3168 a:before').show();
		//$('#zone-preface-wrapper').css('background-image','url(/sites/retail/files/banner-bg-2.jpg)');
        //$('#banner-1').hide();	
		//$('#banner-2').show();
	}
	else {
		//$('.menu-2663 a').prop('href','#persistent-login-modal');
		//$('.menu-2663 a').attr('rel','modal');
		/*$('.menu-2663 a').click(function(e) {
			$('#persistent-login-modal').modal();
			e.preventDefault();
		});*/
	    $('.menu-3168 a:before').hide();
		//$('#zone-preface-wrapper').css('background-image','url(/sites/retail/files/banner-bg-1.jpg)');
		//$('#banner-2').hide();
		//$('#banner-1').show();
	}
	
	// SEARCH BAR 
            var submitIcon = $('.searchbox-icon');
            var inputBox = $('.searchbox-input');
            var searchBox = $('.searchbox');
            var isOpen = false;
			
            submitIcon.click(function(){
                if(isOpen == false){
                    searchBox.addClass('searchbox-open');
					submitIcon.html('<i class="fa fa-times" aria-hidden="true"></i>');
					$('#gsc-i-id1').attr('placeholder', 'Type then hit enter to search...');
                    inputBox.focus();
                    isOpen = true;
                } else {
                    searchBox.removeClass('searchbox-open');
					submitIcon.html('<i class="fa fa-search" aria-hidden="true"></i>');
                    inputBox.focusout();
                    isOpen = false;
                }
            });  
             submitIcon.mouseup(function(){
                    return false;
                });
            searchBox.mouseup(function(){
                    return false;
                });
            $(document).mouseup(function(){
                    if(isOpen == true){
                        $('.searchbox-icon').css('display','block');
                        submitIcon.click();
                    }
                });
        });
            function buttonUp(){
                var inputVal = $('.searchbox-input').val();
                inputVal = $.trim(inputVal).length;
                if( inputVal !== 0){
                    $('.searchbox-icon').css('display','none');
                } else {
                    $('.searchbox-input').val('');
                    $('.searchbox-icon').css('display','block');
                }
				}

})(jQuery);
