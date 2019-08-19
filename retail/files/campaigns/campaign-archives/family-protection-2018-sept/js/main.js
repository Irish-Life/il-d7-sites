(function($) {
$(document).ready(function () {
    if(window.location.href.indexOf("?src=daft") > -1) {
		$('body, .download').removeClass('isNotDaft');
		$('body, .download').addClass('isDaft');
        $('header.masthead').css('background-image','url(/sites/retail/files/campaigns/campaign-archives/family-protection-2018/js/protection-planner-family.jpg)');
		$('.intro-text').html('<p>Between work, social and family lives, there can be a lot to keep up with - and to pay for!<br class="hideOniPad"/><br/>With an Irish Life protection plan, you could have the peace of mind of being able to pay essential expenses like your rent or other household bills if you cannot work because of illness or injury, but it does not cover you if you become unemployed.<br/><br/><strong>Check out our Protection Planner</strong> now and see how affordable it could be to protect your income. </p>');
		$('.insert-image').attr('src','/sites/retail/files/campaigns/campaign-archives/family-protection-2018/vendor/assets/family-protection-DAFT.png');
		
    }
	else {
		$('header.masthead').css('background-image','url(/sites/retail/files/campaigns/campaign-archives/family-protection-2018/js/irishlife-family-protection.jpg)');
		$('.intro-text').html('<p>Family protection with Irish Life is a whole lot more than just life insurance. You can also be protected if you can\'t work because of illness or injury. In fact 2 out of every 3 benefits we paid in 2017 to our customers overall were for illnesses, or accidents that stopped people from working *. <br/><br/><strong>Check out our <span style="color:#2e909d">Protection Planner</span> now to get a quote and <br class="hideOnMobile hideOniPad"> have one less thing to worry about!</strong></p>');
		$('body, .download').removeClass('isDaft');
		$('.download').addClass('isNotDaft');
		$('.insert-image').attr('src','/sites/retail/files/campaigns/campaign-archives/family-protection-2018/vendor/assets/family-protection.png');
	}
	
	$('#bottom-cta').click(function() {
		window.location.href = "https://www.irishlife.ie/life-insurance/life-insurance-calculator/family-protection-planner";
	});
	$zopim(function() {
$zopim.livechat.hideAll();
});
	
});
})(jQuery);