(function($){

	$(document).ready(function () {
		timestampPdfs();
		
		var stickyNavTop = $('#zone-menu').offset().top;
		var mobileNavTop = 0;
		
		try
		{
			mobileNavTop = $('.mean-bar').offset().top;
		}
		catch (err)
		{
		
		}
		
		var stickyNav = function(divID){
		var scrollTop = $(window).scrollTop();
		
		var navTop = (divID=='#zone-menu'?stickyNavTop:mobileNavTop);
		
		if (scrollTop > navTop) { 
			$(divID).addClass('sticky');
		} else {
			$(divID).removeClass('sticky'); 
		}
		};
		 
		 stickyNav('#zone-menu');
	  stickyNav('.mean-bar');
		 
		 
		$(window).scroll(function() {
		  stickyNav('#zone-menu');
		  stickyNav('.mean-bar');
		  
		});
	});

	function timestampPdfs()
	{
 	var ts=new Date().getTime();
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);
		$(this).removeAttr('onclick');
		$(this).attr('onclick',"dataLayer.push({'event':'trackEvent','category':'website','action':'Download PDF','label': '"+link+"','value':'1'});return true");
		$(this).attr('target','_blank');
		});
	}

})(jQuery);
;
