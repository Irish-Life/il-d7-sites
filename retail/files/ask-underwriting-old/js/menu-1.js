$(document).ready(function() {
  	$('#left').meanmenu({
            meanMenuClose: "X",
            meanMenuCloseSize:  "18px",
            meanMenuOpen: "Menu",
            meanRevealPosition: "left",
            meanScreenWidth: "2000",
            meanExpand: "+",
            meanContract: "-",
            meanShowChildren: true,
            meanExpandableChildren: true,
            meanRemoveAttrs: false
          })

	//attach data layer push to any pdfs
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
			$(this).attr('onclick',"dataLayer.push({'event':'trackEvent','category':'Ask UW','action':'Download PDF','label': '"+link+"','value':'1'});return true");
		});	  
		  
		  
});