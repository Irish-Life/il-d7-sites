(function($){
    $.fn.scrollingTo = function( opts ) {
        var defaults = {
            animationTime : 1000,
            easing : '',
            callbackBeforeTransition : function(){},
            callbackAfterTransition : function(){}
        };

        var config = $.extend( {}, defaults, opts );

        $(this).click(function(e){
            var eventVal = e;
            e.preventDefault();

            var $section = $(document).find( $(this).data('section') );
            if ( $section.length < 1 ) {
                return false;
            };

            if ( $('html, body').is(':animated') ) {
                $('html, body').stop( true, true );
            };

            var scrollPos = $section.offset().top;

            if ( $(window).scrollTop() == scrollPos ) {
                return false;
            };

            config.callbackBeforeTransition(eventVal, $section);

            $('html, body').animate({
                'scrollTop' : (scrollPos+'px' )
            }, config.animationTime, config.easing, function(){
                config.callbackAfterTransition(eventVal, $section);
            });
        });
    };
}(jQuery));



jQuery(document).ready(function(){
	"use strict";
	new WOW().init();


(function(){
 jQuery('.smooth-scroll').scrollingTo();
}());

});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$(document).ready(function(){


    $(window).scroll(function () {
        if ($(window).scrollTop() > 448) {
            $(".navbar-brand a").css("color","#fff");
			$("#fade-bar").slideDown('slow');

        } else {
            $(".navbar-brand a").css("color","inherit");
			$("#fade-bar").slideUp('slow');
    
        }
    });
	
	$('.version1Content').hide();
	$('.version2Content').hide();
	$('.version3Content').hide();
	var whichVersion = getCookie('mapsversion');
	
	if (whichVersion == '1')
	{
		$('#investing').hide();
		$('#whySignUp').hide();
		
	}
	else if (whichVersion == '2') {
		$('#investing').show();
		$('#whySignUp').hide();
	}
	else if (whichVersion == '3') {
		$('#investing').hide();
		$('#whySignUp').show();	
	}
	else
	{
		$('#investing').hide();
		$('#whySignUp').hide();
		$('.version1Content').show();
	}
	$('.version'+whichVersion+'Content').show();

});


function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}




 




