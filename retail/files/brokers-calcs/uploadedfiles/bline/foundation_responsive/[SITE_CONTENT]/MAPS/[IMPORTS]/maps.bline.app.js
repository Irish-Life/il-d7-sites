$(document).ready(function() {


	//.parallax(xPosition, speedFactor, outerHeight) options:
	//xPosition - Horizontal position of the element
	//inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
	//outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport

	$('.headerRow').parallax("50%", -.33, true);
	// $('.stockContentRow').parallax("50%", -0.06, true);
	$('.pageHeaderRow').parallax("50%", -0.4, false);
	$(document).foundation("magellan", {threshold: 0});
	
	    var nice=$('html').niceScroll(
	{scrollspeed:"75",
	mousescrollstep:"50",
	cursorborder:"",
	cursoropacitymax:0.9,
	cursoropacitymin:0.3,
	cursorcolor:"#333333",
	cursorwidth:"12px"});
	
	// Ektron doesn't like iframes so load via JS
	$('#mapsVideoFullHolder').html('<iframe width="420" height="315" src="http://www.youtube.com/embed/Z1iPrRylU4Q?rel=0&showinfo=0" frameborder="0" allowfullscreen=""></iframe>');
	$('#mapsVideoHolder').html('<iframe width="420" height="315" src="http://www.youtube.com/embed/Z1iPrRylU4Q?rel=0&showinfo=0" frameborder="0" allowfullscreen=""></iframe>');
	
 	var ts=new Date().getTime();
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',$(this).attr('href') + '?ts='+ts);
		$(this).attr('onclick',"if (_gaq) _gaq.push(['_trackEvent', 'PDF download', '"+link + "']);return true");
	});
});


// smooth scroll
	$(function() {
	
		function filterPath(string) {
			return string
			.replace(/^\//,'')
			.replace(/(index|default).[a-zA-Z]{3,4}$/,'')
			.replace(/\/$/,'');
		}
	
		var locationPath = filterPath(location.pathname);
		var scrollElem = scrollableElement('html', 'body');
	
		// Any links with hash tags in them (can't do ^= because of fully qualified URL potential)
		$('a[href*=#]').each(function() {
	
			// Ensure it's a same-page link
			var thisPath = filterPath(this.pathname) || locationPath;
			if (  locationPath == thisPath
				&& (location.hostname == this.hostname || !this.hostname)
				&& this.hash.replace(/#/,'') ) {
	
					// Ensure target exists
					var $target = $(this.hash), target = this.hash;
					if (target) {
	
						// Find location of target
						var targetOffset = $target.offset().top-101;
						$(this).click(function(event) {
	
							// Prevent jump-down
							event.preventDefault();
	
							// Animate to target
							$(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
	
								// Set hash in URL after animation successful
								location.hash = target;
	
							});
						});
					}
			}
	
		});
	
		// Use the first element that is "scrollable"  (cross-browser fix?)
		function scrollableElement(els) {
			for (var i = 0, argLength = arguments.length; i <argLength; i++) {
				var el = arguments[i],
				$scrollElement = $(el);
				if ($scrollElement.scrollTop()> 0) {
					return el;
				} else {
					$scrollElement.scrollTop(1);
					var isScrollable = $scrollElement.scrollTop()> 0;
					$scrollElement.scrollTop(0);
					if (isScrollable) {
						return el;
					}
				}
			}
			return [];
		}
	
	});