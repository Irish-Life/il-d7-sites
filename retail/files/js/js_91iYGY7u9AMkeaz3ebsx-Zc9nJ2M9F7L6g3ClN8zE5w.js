jQuery(document).ready(function($) {
	$("#zone-menu").remove();
	$(".mean-bar").remove();
	$(".breadcrumb").remove();
	$("#section-header").css("margin","0px");
	$(".block-menu-footer-general-links").css("display","none");
	$("a[href='/']").attr('href', 'http://www.irishlife.ie/');//this is just for test purposes - dont want links going back to test site
});;
(function($){
	$(document).ready(function($) {
		$("#zone-branding").css("display","none");
	});
})(jQuery);;
