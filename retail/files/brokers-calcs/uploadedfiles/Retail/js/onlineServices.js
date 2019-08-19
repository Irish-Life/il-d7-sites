var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-16369698-4']);
_gaq.push(['_trackPageview']);

function addJavascript(jsname,pos) {
	var th = document.getElementsByTagName(pos)[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
} 

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MVJRKX');

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	
	//addJavascript('https://munchkin.marketo.net/munchkin.js','body');
	//addJavascript('/secureWeb/uploadedFiles/retail/js/mk.js','body');
	var link=document.createElement('link');
	link.href='https://www.irishlife.ie/sites/retail/files/myonlineservices/style.css';
	link.rel='stylesheet';
	document.getElementsByTagName('head')[0].appendChild(link);
	
})();
  
function doNothing()
{

}

jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "fixed",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
return this;
}


$(document).ready(function () {
//$('body').html('');
	//$.get("/secure/onlineServicesUser.js?id=1204894812", function(data) {
	//	str = jQuery.trim(data);
	//	
	//	eval(data);
	//	$('#footer').before('<div>' + userDetails.user[0].firstName);
		
	//});
	showPopout=false;
	$('h4').each(function(i) 
	{
		if ($(this).html().indexOf('New User Registration') == 0)
		{
			$(this).html('Don\'t have a user id?');
			showPopout=true;
		}
				
		if ($(this).html().indexOf('Regular User Login') == 0)
		{
			$(this).html('Got a user id? Login here!');
			showPopout=true;
		}
	
	});
	
	$('p').each(function(i) 
	{
		if ($(this).html().indexOf('Call us now on 01 704 1010') == 0)
		{
			$(this).html('Call us now on 01 704 1010 and we will get you started.');
		}
		
		if ($(this).html().indexOf('href="/myonlineservices/startReset') >= 0)
		{
			$(this).html('<b>Forgot your password? If you\'ve used the system before you can request a new one <a class="middleButton" href="/myonlineservices/startResetPassword.do">here</a>.</b>');
		}
		
		if ($(this).html().indexOf('Warning: Investments may go') == 0)
		{
			$(this).html('Warning: The value of your investments may go down as well as up.');
		}
		
		if ($(this).html().indexOf('This page is for information only and does not constitute financial ') >= 0)
		{
			$(this).html('This page is for information only and does not constitute financial or other professional advice in any way. Irish Life Assurance plc is regulated by the Central Bank of Ireland. The investment prices we use for your switch will be the next available fund price. We do not charge for this service.');
		}
	});
	
	

	
	
	if (showPopout)
	{
		
		/*
		$('#footer').before('<div class="notification"><div id="inpage_popout"><h3>Need help logging in?</h3><p>Watch a <a id = "needHelp">short video</a> to show you how!</p></div></div>');
		$('#footer').before('<div id="backdrop" style = ""></div>');
		$('#footer').before('<div id = "popupWindow"  ><div id="video"></div><span class = "xoff">X</span></div>');

		
		$('.notification').css('right', '-300px');
		$('.notification').css('position', 'fixed');
		$('.notification').css('bottom', '300px');
		
		$('#inpage_popout').css('width', '195px');
		$('#inpage_popout').css('height', '65px');
		$('#inpage_popout').css('background-image', 'url(https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/banner.bubble.jan.2013.bg.jpg)');
		$('#inpage_popout').css('padding', '8px');
		$('#inpage_popout').css('font-size', '14px');
		$('#inpage_popout').css('border-radius', '10px');
		$('#inpage_popout').css('color', 'white');
		$('#inpage_popout a').css('color', '#F19C2B');
		$('#inpage_popout a').css('text-decoration', 'underline');
		
		
		$('#backdrop').css('width', $(window).width() +'px');
		$('#backdrop').css('height', $(window).height() +'px');
		$('#backdrop').css('background-color', 'black');
		$('#backdrop').css('opacity', '0.4');
		$('#backdrop').css('position', 'fixed');
		$('#backdrop').css('display', 'none');
		
		$('#needHelp').css('cursor','pointer');
		$('#video').css('text-align','center'); 
		
		$('#popupWindow').css('width','565px'); 
		$('#popupWindow').css('height','318px'); 
		$('#popupWindow').css('padding-top','10px'); 
		$('#popupWindow').css('padding-right','16px'); 
		$('#popupWindow').css('background','white'); 
		$('#popupWindow').css('text-align','center'); 
		$('#popupWindow').css('display', 'none');
		$('#popupWindow').css('z-index', '10');
		$('#popupWindow').css('border-radius', '5px');
		
		$('.xoff').css('cursor', 'pointer');
		$('.xoff').css('cursor', 'pointer');
		$('.xoff').css('float', 'right');
		$('.xoff').css('right', '6px');
		$('.xoff').css('top', '0');
		$('.xoff .a:hover').css('color', 'red');
		$('.xoff').css('position', 'absolute');
		$('.xoff').hover(function(){
				$(this).css('color', 'red');
			},
			function(){
				$(this).css('color', 'black');
			}
		);
		
		$('#video').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/0fhA94e0Hic?&rel=0" frameborder="0" allowfullscreen></iframe>');
		$('#backdrop').center(false);
		$('#popupWindow').center(false);
	
		setTimeout(function(){
			$(".notification").animate({ right:0 },1500);
		}, 3000);
	
		$("#needHelp").click(function(){
			$('#video').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/0fhA94e0Hic?&rel=0" frameborder="0" allowfullscreen></iframe>');
			$('#backdrop').fadeIn('slow');
			$('#popupWindow').fadeIn('slow');
			$('#video').fadeIn('slow');
		});
		*/
	}
	
	$(".xoff").click(function(){
		$('#popupWindow').fadeOut();
		$('#video').fadeOut();
		$('#backdrop').fadeOut();
		$('#video').html('');
	})
	
	$("#backdrop").click(function(){
		$('#popupWindow').fadeOut();	
		$('#video').fadeOut();
		$('#backdrop').fadeOut();
		$('#video').html('');
	})
	
	$('#left-inner-nav h3').css('display','none');
	$('#leadershipFactor').css('display','none');

	$('p').each(function(i) 
	{
		if ($(this).html().indexOf('By agreeing to these') == 0)
		{
			$(this).html('By agreeing to these On-Line Service terms, filling in the registration instructions and accessing or using \'My Online Services\', you will be providing us with personal information. We will use this information in connection with running \'My Online Services\', for verification purposes and statistical analysis. We may occasionally email users about our products and services where explicit permission has previously been given. Users can unsubscribe from these communications at any time. We do not sell or share mailing lists with other companies.');
		}
	});


	
});
