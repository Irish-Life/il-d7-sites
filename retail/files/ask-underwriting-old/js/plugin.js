var isProd = (document.location.href.indexOf("https://www.irishlife.ie/") > -1);
if (document.location.pathname != "/myonlineservices" && document.location.pathname != "/myonlineservices/") {
	$(document).prop('title', document.location.pathname.substr(document.location.pathname.indexOf('onlineservices/')+15) + ' | Irish Life');
}

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();
$('#exampleModalLabel').html('You are using an old web browser');
$('#browser-modal .modal-body').html('<div style="margin-top: -5px; margin-bottom: 10px; font-size: 1.3em; line-height: 1.6; ">            Your browser is not compatibile with this website. We recommend that you upgrade your web browser:        </div>        <ul class="ulBase" style="font-size: 1.3em; margin-bottom: 20px; " >        <li><a style="color:#fff" href="http://windows.microsoft.com/en-ie/internet-explorer/download-ie" >Internet explorer 11</a></li>        <li><a style="color:#fff" href="http://www.google.com/chrome" >Chrome</a></li>        <li><a href="https://www.mozilla.org/firefox/" style="color:#fff" >Firefox</a></li>        </ul>');
$('#browser-modal').css('top','130px');
$('#browser-modal .modal-content').css('background-color','#5261ac');
$('#browser-modal .modal-content').css('color','#ffffff');
$('#browser-modal li').css('color','#ffffff');

if (navigator.sayswho == 'MSIE 9')
{
	_gscq.push(['targeting','oldIE', 'Y']);
	$('#browser-modal').hide();
	$('.modal-backdrop').hide();
}


window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
$.src='//v2.zopim.com/?1LCIUvaE6uBAIbiv6o5C0qrqykLpn4RN';z.t=+new Date;$.
type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');

function doNothing() {

}

function setBackground()
{
	var d = new Date();
	var hour = d.getHours();
	var url = window.location.pathname;
	var urlsToCheck = "/myonlineservices/client;/myonlineservices/ClientAccount/Login1;/myonlineservices/ClientAccount/ForgotPassword1;/myonlineservices/ClientAccount/Login1Help;/myonlineservices/ClientAccount/Login1B2C;/myonlineservices/ClientAccount/LogOut;/myonlineservices/ClientAccount/ForgotPassword2;/myonlineservices/ClientAccount/ForgotUserId;";
	
	if (urlsToCheck.indexOf(url) > -1)
	{
	$(".anchor2").attr({"href":"https://help.irishlife.ie/hc/en-us/categories/201351349-Online-Service-Help-"});
	$(".anchor2").attr({"target":"_blank"});
	$("#myTopnav").css({"display":"none"});
	
	if (isProd) {
	if (hour >= 6 && hour <= 10)
	{		
		$(".app-body").css({"background":"url(/sites/retail/files/myonlineservices/plugin/background/b-morning-time.jpg)  50% 50% / cover no-repeat"});
		$(".app-body").css({"background-image":"url(/sites/retail/files/myonlineservices/plugin/background/b-morning-time.jpg)"});
	}
	else if (hour >= 11 && hour <= 16)
	{
		$(".app-body").css({"background":"url(/sites/retail/files/myonlineservices/plugin/background/b-afternoon-time.jpg)  50% 50% / cover no-repeat"});
		$(".app-body").css({"background-image":"url(/sites/retail/files/myonlineservices/plugin/background/b-afternoon-time.jpg)"});	
	}
	else if (hour >= 17 && hour <= 21)
	{
		$(".app-body").css({"background":"url(/sites/retail/files/myonlineservices/plugin/background/b-evening-time.jpg)  50% 50% / cover no-repeat"});
		$(".app-body").css({"background-image":"url(/sites/retail/files/myonlineservices/plugin/background/b-evening-time.jpg)"});
	}
	else if ((hour >= 22 && hour <= 23) || (hour >= 0 && hour <= 5))
	{
		$(".app-body").css({"background":"url(/sites/retail/files/myonlineservices/plugin/background/b-night-time.jpg)  50% 50% / cover no-repeat"});
		$(".app-body").css({"background-image":"url(/sites/retail/files/myonlineservices/plugin/background/b-night-time.jpg)"});
	}	
	}
	}
}

setBackground();
 
$( document ).ready(function() {


if (navigator.sayswho == 'MSIE 9')
{
	_gscq.push(['targeting','oldIE', 'Y']);
}

try
{
	try{
  if (firstName != null)
  {
  $zopim(function() {
    $zopim.livechat.setName(firstName + ' ' + lastName);
    $zopim.livechat.setEmail(emailAddress);
	$zopim.livechat.addTags(clientReference);
	 $zopim.livechat.sendVisitorPath();
  });
  }
  }
	catch (e) {
	
	}	
  
  	var planDetailsPage = (window.location.href.indexOf('Plans') > -1);
	var currentValText = $('.card-blue1 .row').html();
	var d = new Date();
	var hour = d.getHours();
	var day = d.getDay();
	var webchatHours = ((hour >=9 && hour <=17) && (day >= 1 && day <= 5));
	
	
	
	if (isProd && planDetailsPage && currentValText != undefined && currentValText.trim() == 'Current Value') {
		if (webchatHours) {
			$('#planDetailsTab .row-padding ').first().html('<div class="col s12 m4" style="margin-bottom: 20px;color: #fff;">        <div class="card card-plan card-plan-button" style="    background-color: #61a4e0;    color: #fff;">            <div class="row row-title row-title-tall row-title-more-space row-title-icon">                    <div class="title-col1" style=" color: #fff;">                        Surrender Value                    </div>            </div>            <div class="row row-item">Your surrender value will be available here on 25th March - If you need to know your surrender value you can request it through our webchat below.            </div>        </div>    </div>			'+$('#planDetailsTab .row-padding ').first().html());
		}
		else
		{
			$('#planDetailsTab .row-padding ').first().html('<div class="col s12 m4" style="margin-bottom: 20px;color: #fff;">        <div class="card card-plan card-plan-button" style="    background-color: #61a4e0;    color: #fff;">            <div class="row row-title row-title-tall row-title-more-space row-title-icon">                    <div class="title-col1" style=" color: #fff;">                        Surrender Value                    </div>            </div>            <div class="row row-item">Your surrender value will be available here on 25th March. Apologies for the inconvenience.           </div>        </div>    </div>			'+$('#planDetailsTab .row-padding ').first().html());
		}
	}
	
	if (planDetailsPage && $('#documentsContent .card').first().html() != undefined && $('#documentsContent .card').first().html().trim() == 'You have 0 new Documents') {
		$('#documentsContent .card').first().html('View your plan documents here');
	}	
  
	var fundpage = (window.location.href.indexOf('FundDetails') > -1);		

	if (fundpage) {
		var priceDate = $('.card-plan .row-item .col2').last().html().trim();
		var sifPrice = '01'+priceDate.substr(2);
		var selfInvestedFundPage = ($('.heading-breadcrumb-text').html().indexOf('Self-Invested Fund') >-1);
		if (selfInvestedFundPage)
		{
		$('.col.s12.m4.m-padding-right').last().after('<p style="float:left">Some useful information and guides relating to Self Invested Fund can be found <a href="https://www.irishlife.ie/pensions/products/self-invested-fund-forms" target="_blank">here</a>. <br><br>The value of the SIF shown above is indicative only and is based on a  valuation of assets as at '+sifPrice +'. It takes into account new contributions paid into, and withdrawals taken from, the fund up to ' + priceDate+'.    However, other than in exceptional circumstances it does not take into account any costs paid or incomes received by the SIF or any revaluation of assets which may have occurred since '+priceDate+'. </p>		<div style="border: 1px solid #333;padding: 10px;float: left;width: 100%;font-weight: bold;">Warning: The value of your investment may go down as well as up.<br><br>Warning: Past performance is not a reliable guide to future performance.<br><br>Warning: These funds may be affected by changes in currency exchange rates.</div>');
		}
		else
		{
		$('.col.s12.m4.m-padding-right').last().after('<div style="border: 1px solid #333;padding: 10px;float: left;width: 100%;font-weight: bold;">Warning: The value of your investment may go down as well as up.<br><br>Warning: Past performance is not a reliable guide to future performance.<br><br>Warning: These funds may be affected by changes in currency exchange rates.</div>');
		}
		
		$( ".card-blue .row-item .col2" ).each(function( index ) {
			$( this ).html($(this).html().trim()+"%");
		});
		
	}	

	
	if (currentValText != null && currentValText.trim() == 'Current Value') {
		if (fundpage) {
			$('.card-blue1 .row').first().html('Unit holding value');			
		}
		else {
			$('.card-blue1 .row').first().html('Gross current value, before exit tax &amp; deductions');
		}
	}
	
	
	var executionOnlyText = $('.menu-left-bottom .nav-text').html();
	if (executionOnlyText != null && executionOnlyText.trim() == 'Execution-Only Trading') {
		$('.menu-left-bottom').css('bottom','0px');
		$('.menu-left-bottom').css('position','relative');
		$('.menu-left-bottom .nav-text').first().html('Online Trading A/C');
	}
	var executionOnlyPageTitle = $('.page-title').first().html();
	if (executionOnlyPageTitle != null && executionOnlyPageTitle.trim() == 'Execution-Only Trading') {
		$('.page-title').first().html('Online Trading A/C');
	}
	
	var greenBoxText = $('.card-green1').first().html();
	if (greenBoxText != null && greenBoxText.trim() == '') {
		$('.card-green1').first().html('<div class="row" style="text-align: center;">             <i class="material-icons" style="font-size: 60px;">check_circle</i>  </div><div class="row" id="responsiveText2" style="text-align: center; font-size: 26px; font-weight: 700; visibility: visible;"> Payments up to date </div>');
	}
	
	var perfChartLabel = $('.performance-text-row2').first().html();
	if (perfChartLabel != null && perfChartLabel.trim() == 'all-time') {
			$('.performance-text-row2').first().html('This period');
	}
	
	var sifModalDisclaimer = $('#termsModal h4').first().html();
	var tradingLaunch = (window.location.href.indexOf('TradingApp') > -1);
	if (tradingLaunch && sifModalDisclaimer.trim() != null && sifModalDisclaimer.trim() == 'Terms &amp; Conditions')
	{
		$('#termsModal h4').first().html('Disclaimer');
	}
	
	var switchModalDisclaimer = $('#termsModal h4').first().html();
	var switchConfirm = (window.location.href.indexOf('Switch3Confirm') > -1);
	if (switchConfirm && switchModalDisclaimer.trim() != null && switchModalDisclaimer.trim() == 'Terms &amp; Conditions')
	{
		$('#termsModal h4').first().html('Disclaimer');
		$('.modal-content').first().html('Please confirm that you are aware of the annual fund charges on any new funds that you have chosen and are satisfied with the level of potential risk and return offered by your new fund selection.<br><br>The investment prices we use will be the next available fund price. We don\'t charge for this service.');
	}

	var switchComplete = (window.location.href.indexOf('Switch4Complete') > -1);
	if (switchComplete)
	{	
		$('.card-dashboard-middle').first().after('<div class="row">Your request will be processed and we will confirm details by post. <br><br>Please note that switches made after 5pm Monday to Thursday will use the next day\'s prices. Switches made after 5pm on Fridays will use the Monday\'s prices.<br><br>It normally takes 2 working days for the switch request to be reflected in your current valuation screen. Switches can take longer if there is another transaction such as a partial encashment in process or over the Christmas period.<br><br></div>.');
	}
}
catch (e) {

}
  });