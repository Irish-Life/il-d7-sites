/*########################################################################*/
/*####################  I R I S H L I F E . I E ##########################*/
/*########################################################################*/
/*                                                                        */
/*   Description:   This is the irishlife.ie uncompressed javascript file.*/
/*                  This file should be compressed and stripped of all    */
/*                  unnecessary data before being uploaded.               */
/*   Contact:       ebusiness@irishlife.ie                                */
/*   Copyright:     irishlife assurance                                   */
/*########################################################################*/

// Global Variables
with(document.createElement("b")){
	id=4;
	while(innerHTML="<!--[if gt IE "+ ++id+"]>1<![endif]-->",innerHTML>0);
	var ie=id>5?+id:100;
}
var ajaxManager;
var fundCategoriesReceived = false;
var callbackTracking='<iframe src="https://fls.doubleclick.net/activityi;src=1459025;type=ilpro894;cat=newca273;ord=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
var pensionTracking='<iframe src="https://fls.doubleclick.net/activityi;src=1459025;type=ilpro894;cat=newca273;ord=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>';
/****
* Control ajax requests for use on the funds page
*
* @LastModified Stephen Hayden
* @Date 23/11/2011
* 
**** 23/11/2011 *** No edits just organising. Might be worth moving out to standalone funds page JS. Used elsewhere?
 */
(function($){
	
	$.manageAjax = (function(){
		var cache 			= {},
			queues			= {},
			presets 		= {},
			activeRequest 	= {},
			allRequests 	= {},
			defaults 		= {
						queue: true, //clear
						maxRequests: 1,
						abortOld: false,
						preventDoubbleRequests: true,
						cacheResponse: false,
						complete: function(){},
						error: function(ahr, status){
							var opts = this;
							if(status &&  status.indexOf('error') != -1){
								setTimeout(function(){
									var errStr = status +': ';
									if(ahr.status){
										errStr += 'status: '+ ahr.status +' | ';
									}
									errStr += 'URL: '+ opts.url;
									throw new Error(errStr);
								}, 1);
							}
						},
						success: function(){},
						abort: function(){}
				}
		;
		
		function create(name, settings){
			var publicMethods = {};
			presets[name] = presets[name] ||
				{};
			
			$.extend(true, presets[name], $.ajaxSettings, defaults, settings);
			if(!allRequests[name]){
				allRequests[name] 	= {};
				activeRequest[name] = {};
				activeRequest[name].queue = [];
				queues[name] 		= [];
			}
			$.each($.manageAjax, function(fnName, fn){
				if($.isFunction(fn) && fnName.indexOf('_') !== 0){
					publicMethods[fnName] = function(param){
						fn(name, param);
					};
				}
			});
			return publicMethods;
		}
		
		function complete(opts, args){
			
			if(args[1] == 'success'){
				opts.success.apply(opts, [args[0].successData, args[1]]);
				if (opts.global) {
					$.event.trigger("ajaxSuccess", args);
				}
			}
			
			if(args[1] === 'abort'){
				opts.abort.apply(opts, args);
				if(opts.global){
					$.active--;
					$.event.trigger("ajaxAbort", args);
				}
			}
			
			opts.complete.apply(opts, args);
			
			if (opts.global) {
				$.event.trigger("ajaxComplete", args);
			}
			
			if (opts.global && ! $.active){
				$.event.trigger("ajaxStop");
			}
			//args[0] = null; 
		}
		
		function proxy(oldFn, fn){
			return function(xhr, s, e){
				fn.call(this, xhr, s, e);
				oldFn.call(this, xhr, s, e);
				xhr = null;
				e = null;
			};
		}
		
					
		function callQueueFn(name){
			var q = queues[name];
			if(q && q.length){
				var fn = q.shift();
				if(fn){
					fn();
				}
			}
		}

		
		function add(name, opts){
			if(!presets[name]){
				create(name, opts);
			}
			opts = $.extend({}, presets[name], opts);
			//aliases
			var allR		= allRequests[name],
				activeR		= activeRequest[name],
				queue		= queues[name],
				id 			= opts.type +'_'+ opts.url.replace(/\./g, '_'),
				oldComplete = opts.complete,
				ajaxFn 		= function(){
								activeR[id] = {
									xhr: $.ajax(opts),
									ajaxManagerOpts: opts
								};
								activeR.queue.push(id);
								return id;
							}
				;
				
			if(opts.data){
				id += (typeof opts.data == 'string') ? opts.data : $.param(opts.data);
			}
			
			if(opts.preventDoubbleRequests && allRequests[name][id]){
				return false;
			}
			
			allR[id] = true;
			
			opts.complete = function(xhr, s, e){
				if(opts.abortOld){
					$.each(activeR.queue, function(i, activeID){
						if(activeID == id){
							return false;
						}
						abort(name, activeID);
						return activeID;
					});
				}
				oldComplete.call(this, xhr, s, e);
				//stop memory leak
				if(activeRequest[name][id]){
					if(activeRequest[name][id] && activeRequest[name][id].xhr){
						activeRequest[name][id].xhr = null;
					} 
					activeRequest[name][id] = null;
				}
				xhr = null;
				activeRequest[name].queue = $.grep(activeRequest[name].queue, function(qid){
					return (qid !== id);
				});
				allR[id] = false;
				e = null;
				delete activeRequest[name][id];
			};
			
			if(cache[id]){
				ajaxFn = function(){
					activeR.queue.push(id);
					complete(opts, cache[id]);
					return id;
				};
			} else if(opts.cacheResponse){
				 opts.complete = proxy(opts.complete, function(xhr, s){
					if(s != 'success'){
						return false;
					}
					cache[id][0].responseXML 	= xhr.responseXML;
					cache[id][0].responseText 	= xhr.responseText;
					cache[id][1] 				= s;
					//stop memory leak
					xhr = null;
					return id; //strict
				});
				
				opts.success = proxy(opts.success, function(data, s){
					cache[id] = [{
						successData: data,
						ajaxManagerOpts: opts
					}, s];
					data = null;
				});
			}
			
			ajaxFn.ajaxID = id;
			
			if(opts.queue){
				opts.complete = proxy(opts.complete, function(){
					
					callQueueFn(name);
				});
				 
				if(opts.queue === 'clear'){
					queue = clear(name);
				}
				
				queue.push(ajaxFn);
				
				if(activeR.queue.length < opts.maxRequests){
					callQueueFn(name); 
				}
				return id;
			}
			return ajaxFn();
		}
		
		function clear(name, shouldAbort){
			$.each(queues[name], function(i, fn){
				allRequests[name][fn.ajaxID] = false;
			});
			queues[name] = [];
			
			if(shouldAbort){
				abort(name);
			}
			return queues[name];
		}
		
		function getXHR(name, id){
			var ar = activeRequest[name];
			if(!ar || !allRequests[name][id]){
				return false;
			}
			if(ar[id]){
				return ar[id].xhr;
			}
			var queue = queues[name],
				xhrFn;
			$.each(queue, function(i, fn){
				if(fn.ajaxID == id){
					xhrFn = [fn, i];
					return false;
				}
				return xhrFn;
			});
			return xhrFn;
		}
		
		function abort(name, id){
			var ar = activeRequest[name];
			if(!ar){
				return false;
			}
			function abortID(qid){
				if(qid !== 'queue' && ar[qid] && typeof ar[qid].xhr !== 'unedfiend' && typeof ar[qid].xhr.abort !== 'unedfiend'){
					ar[qid].xhr.abort();
					complete(ar[qid].ajaxManagerOpts, [ar[qid].xhr, 'abort']);
				}
				return null;
			}
			if(id){
				return abortID(id);
			}
			return $.each(ar, abortID);
		}
		
		function unload(){
			$.each(presets, function(name){
				clear(name, true);
			});
			cache = {};
		}
		
		return {
			defaults: 		defaults,
			add: 			add,
			create: 		create,
			cache: 			cache,
			abort: 			abort,
			clear: 			clear,
			getXHR: 		getXHR,
			_activeRequest: activeRequest,
			_complete: 		complete,
			_allRequests: 	allRequests,
			_unload: 		unload
		};
	})();
	//stop memory leaks
	$(window).unload($.manageAjax._unload);
})(jQuery);


/**
*#######################################################################################################*
 * BASE
 *#######################################################################################################*
 */
$('.risk-questions :radio').click(function () {
		if ($(this).is(':checked'))
		{
			$(this).attr('checked',true);
		}
		else
		{
			$(this).attr('checked',false);
		}
	});

function beforeDefault(divId)
{

	var ajaxWaitMessage = '<div class="waitText"><p>Loading. Please wait...</p></div>';
	
	if($('#' + divId + 'Response').length == 0)
	{
		// TODO: Put loading icon at bottom of page
	}
	else
	{		
		$('#' + divId + 'Response').html(ajaxWaitMessage);				
	}
}
function beforeAjax(divId, beforeFunction)
{
	if(beforeFunction != null){ beforeFunction(divId); }
	else{ beforeDefault(divId); }
}
function successAjax(divId, response, successFunction)
{
	if(successFunction != null){ successFunction(divId, response); }	
	else{ successDefault(divId, response); }
}

function successDefault(divId, response)
{
	var img='/img/icons/pdf.gif';
	$('#' + divId + 'Response').html(response);
}
function errorAjax(divId, errorFunction)
{
	if(errorFunction != null){errorFunction(divId); }
	else{errorDefault(divId); }
}
function errorDefault(divId, response)
{
	if($('#' + divId + 'Response').length == 0)
	{
		if(response == null)
		{
			alert('An error has occured during your request.');	
		}
		else
		{
			$('#tempDiv').html(response);			
			if($('#tempDiv .contentError p').length != 0)
			{
				alert($('#tempDiv .contentError p').text());				
			}
			else
			{
				alert('An error has occured during your request.');
			}
			$('#tempDiv').html('');
		}
	}
	else
	{
		var ajaxErrorMessage = '<div class="contentError"><p>An error has occurred preventing your request from being processed.</p></div>';
		$('#' + divId + 'Response').html(ajaxErrorMessage);		
	}
}
function abortAjax(divId, abortFunction)
{
	if(abortFunction != null){abortFunction(divId); }
	else{abortDefault(divId);}
}

function abortDefault(divId)
{
}

function doAjax(url, divId, parms, beforeFunction, successFunction, errorFunction, abortFunction)
{
	ajaxManager.abort();
	ajaxManager.add(
	{
		type: "POST",
		url: url,
		async: true,
		data: parms,
		beforeSend: function(){beforeAjax(divId, beforeFunction);},
		success: function(response){successAjax(divId, response, successFunction);},
		error: function(){errorAjax(divId, errorFunction);},
		abort: function(){abortAjax(divId, abortFunction);},
		timeout: 300000 // 5 minute timeout
	});
}





/*##########################################################################################
/*##########################################################################################
/* T O   B E   D E L E T E D 
/* T O   B E   D E L E T E D 
/* T O   B E   D E L E T E D 
/*\/ \/ \/ \/ \/ \/ \/ \/ \/

//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Tabs
//


function createTheChart(checkFundDiv, chartDiv)
{
	var	funds = '', 
		numFunds=0;
	for (i =0; ;i++)
	{
		if($('#'+checkFundDiv + i).length != 0)
		{
			if ($('#'+checkFundDiv+i+':checked').val())
			{
				funds= funds+ $('#'+checkFundDiv+i+':checked').val() + ';';
				numFunds = numFunds +1;
			}
		}
		else
		{
			break;
		}
	}
	
	if (numFunds >= 1 && numFunds <= 10) 
	{
	 // <![CDATA[
	 var so = new SWFObject("/zoomchart/amchart/amstock.swf", "amstock", "900", "450", "8", "#efefef");
	 //so.addVariable("path", "/servlet/amchart/");
	 so.addVariable("settings_file", encodeURIComponent("/servlet/amchart/?action=getChart&fund="+funds));
	 so.addVariable("preloader_color", "#efefef");
	 $('#'+chartDiv).removeClass('hidden');
	 so.write(chartDiv);
	 $('#'+chartDiv).dialog({modal: true, width:950});
	 // ]]>
	 
	if (_gaq) _gaq.push(['_trackEvent', 'funds', 'Draw Chart',funds]);  
	if (_gaq) _gaq.push(['_trackPageview','/funds/draw-chart-'+funds+'.html']);	 
	mkVisitWebPage('/funds/draw-chart-'+funds+'.html');
	}
	else if (numFunds == 0)
	{
		alert('Please select at least one fund to chart');
	}
	else
	{
		alert('You can only chart up to 10 funds at any one time');
	}
 }
 
 function createChart()
 {
	createTheChart('CheckFund','fundChart');
 }
function showPrices()
 {
	parms='';
	doAjax('/servlet/ilFundPrices.jsp', 'fundPerformance', parms, null, successPrices, null, null);
 }
 
 function successPrices(divId, response)
 {
	successDefault(divId, response);
	timestampPdfs();
 }
  
function showCategories()
{
		if (!fundCategoriesReceived)
		{
			parms='applicationId=PRD';
			doAjax('/servlet/startBlineFundPrices.do', 'FundCategories', parms);
			fundCategoriesReceived = true;
		}
		if (_gaq) _gaq.push(['_trackPageview','/funds/product-prices.html']);
}

function getFundPrices()
{		
	// 2. Ajax request			
	parms = 'fundGroupId=' + $('#FundCategory').val();
			
	doAjax('/servlet/retrieveBlineFundPrices.do', 'fundPrices', parms);		
	selectFunds();
	if (_gaq) _gaq.push(['_trackPageview','/funds/Prices-'+parms+'.html']);
	mkVisitWebPage('/funds/Prices-'+parms+'.html');
}

function showAnnualised()
{
	$('.growth').each(function(i) {
		$(this).addClass('hidden-important');
	});

	$('.annualised').each(function(i) {
		$(this).removeClass('hidden-important');
		$(this).removeClass('hidden');
	});

	if (_gaq) _gaq.push(['_trackPageview','/funds/fund-factsheets-prices-annualised.html']);
}

function showCumulative()
{
	$('.growth').each(function(i) {
		$(this).removeClass('hidden-important');
	});

	$('.annualised').each(function(i) {
		$(this).addClass('hidden-important');
	});
	if (_gaq) _gaq.push(['_trackPageview','/funds/fund-factsheets-prices.html']);
}


/* ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ 
/* T O   B E   D E L E T E D 
/* T O   B E   D E L E T E D 
/* T O   B E   D E L E T E D 
/*##########################################################################################
/*##########################################################################################
/****
* Controls the mouseover effect of the menu. Hides and shows the large menus
* depending on which link is hovered. Ised accross the whole website.
*
* @autor IQ Content
* @date 01/Jun/2011
 */

 /**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);


 
 
var config={over:showMenu,timeout:380,out:hideMenu,sensitivity:4,interval:70};
$(".menuSelect").hoverIntent(config);


$("#headerNameplate").mouseenter(function(){
	resetAllMenus();
	resetAllMenublocks()
});
$("#searchContainer").mouseover(function(){
	resetAllMenus();
	resetAllMenublocks()
});
$("#bodyContainer").mouseleave(function(){
	resetAllMenus();
	resetAllMenublocks();
});
/*
$("#headerMainNav").mouseleave(function(){

	var s = true;
	$("#menuPopupContainer").mouseenter(function(){
		s = false;
	}).mouseleave(function(){
		resetAllMenus();
		resetAllMenublocks();
	var s = true;
	});
	if (s==true){
		resetAllMenus();
		resetAllMenublocks();
	}
	// alert("s: "+s);

});

*/

function resetAllMenublocks(){$(".mainPopupMenu").fadeOut("fast")}
function resetAllMenus(){$("#headerMainNav a").removeClass("retain").removeClass("active")}

function hideMenu(){

	var a=$(this).attr("rel");
	$("#"+a).mouseleave(function(){
		resetAllMenus();
		resetAllMenublocks()
	})
}
function showMenu(){
resetAllMenus();
resetAllMenublocks();
var a=$(this).attr("rel");
$("#"+a).show();$('#headerMainNav a[rel="'+a+'"]').addClass("retain").addClass("active");$("#"+a).removeClass("hidden")

}


/*
var reviewMenu;
function hidePopupMenu()
{
	clearTimeout( reviewMenu );
	$('#'+reviewMenu).fadeOut(140);
	$('#headerMainNav').find('a:not(.retain)').removeClass( 'active' );
	$('body').find('.mainPopupMenu:not(.retain)').addClass( 'hidden' );
}
 
 // Controls the hover of the links
 $('#headerMainNav a').mouseenter(function(){

	var menu = $(this).attr('rel');
	$('#headerMainNav').find('a.active').removeClass( 'active' );
	$('#headerMainNav').parents('body').find('.mainPopupMenu').addClass( 'hidden' );
	$(this).addClass('active').addClass('retain');
	$('#'+$(this).attr('rel')).removeClass( 'hidden' ).addClass( 'retain' );

}).mouseleave(function(){
	$(this).removeClass( 'retain' )
	$('#'+$(this).attr('rel')).removeClass( 'retain' );
	reviewMenu = setTimeout( 'hidePopupMenu()', 1000);
});

// controls the hover over the containing menu block
$('.mainPopupMenu').mouseenter(function(){
	var menu = $(this).attr('id');
	$(this).addClass('retain');
	$('#headerMainNav a[rel="'+menu+'"]').addClass( 'retain' );
}).mouseleave(function(){
	var menu = $(this).attr('id');
	$(this).removeClass('retain');
	$('#headerMainNav a[rel="'+menu+'"]').removeClass( 'retain' );
	reviewMenu = setTimeout( 'hidePopupMenu()', 1000);
});
*/
/**************************************
* Load the risk questionnaire
*
* @autor Ger Coughlan
* @date 01/Jun/2011
 */
function loadRiskQuestionnaire()
{
	var parms='showFunds=Y&b2c=Y&internal=Y';
   doAjax('/servlet/getRiskQuestionnaire.do', 'RiskProfileQuestions', parms);
}

/**************************************
* Set Cookie information using the following
* few functions. 
*
* @autor Ger Coughlan
* @date 01/Jun/2011
 */
function setCookie(c_name, value, expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	
	document.cookie = c_name + "=" + escape(value) +
								    ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString()) + 
									";path=/";
}

function cookieExists(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start=c_start + c_name.length + 1;
			c_end=document.cookie.indexOf(";", c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return false;
}


function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start=c_start + c_name.length + 1;
			c_end=document.cookie.indexOf(";", c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

function acceptCookies(){
	setCookie("AcceptCookies","true",365);
	location.reload();
}
	
function checkForAcceptCookies()
{
	if(!cookieExists("AcceptCookies")){
		log ('cookie message not accepted');
		$("#bodyContainer").prepend(cookieHtml);
		$('#bodyHeader').css('top','120px');
		if ($('#homepageSliderContainer').length > 0)
		{
			$('#homepageSlider').css('top','0px');
			$('#productContainerChange').css('position','absolute');
			$('#productContainerChange').css('top','567px');		
			$('#homepageSliderContainer').css('height','277px');
			$('#homepageSliderContainer').css('position','absolute');
			$('#homepageSliderContainer').css('top','280px');
			$('#bodyFooter').css('position','absolute');
			$('#bodyFooter').css('top','1230px');
			$('#trailingFooter').css('position','absolute');
			$('#trailingFooter').css('top','1450px');		
			$('#resourceContainer').css('position','absolute');
			$('#resourceContainer').css('top','847px');
			$('#resourceContainer').css('width','910px');
		}
	}
	else
	{
		log ('cookie message accepted');
	}
}

var cookieHtml='<div style="height:120px;position:static;top:0px;" id="cookieHeader"><div style="width:725px;padding:20px;float:left;" id="cookieNotice"><h3>Important information regarding cookies</h3><p>Irish Life uses cookies to enhance your browsing experience and to create a secure and effective website for our customers. By using this site you agree that we may store and access cookies on your device, unless you have disabled your cookies.</p><br><p><a href="http://www.irishlife.ie/about-cookies.html">You can find out more about our cookies here.</a></p></div><div id="button" style="float: left; width: 185px; margin-top: 45px;"><a onclick="acceptCookies()" href="javascript:void(0)"><img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/images/read-notice.gif" /></a></div></div>';

/**************************************
* TODO: Not sure where any of this code is used
* and def not used on majority of pages. could be old
* so needs to be investigated and removed.
*
* @autor 
* @date 01/Jun/2011
 */
	$(function(){
	$('.submitBtn').hover(
		// mouseover
		function(){ $(this).addClass('submitBtnHover'); },
		// mouseout
		function(){ $(this).removeClass('submitBtnHover'); }
	);	

	$('button#getQuoteButton').mousedown(function(){
		$("#quoteDetails").addClass("hidden");
		$("#quoteQuote").removeClass("hidden");
		changeTab('fund-performance', 1);
	});
	$('button#getQuoteButton').mousedown(function(){
		$("#quoteDetails").addClass("hidden");
		$("#quoteQuote").removeClass("hidden");
		changeTab('fund-performance', 1);
	});
	$('#addSICQuote').mousedown(function(){
	if ('#addSICQuote:checked') {
			$("#quoteAmount").addClass("hidden");
			$("#quoteAmountSIC").removeClass("hidden");
		}
		if ($('#addSICQuote').attr('checked')) {
			$("#quoteAmountSIC").addClass("hidden");
			$("#quoteAmount").removeClass("hidden");
		}
	});
	
	$("#changer").removeClass('hidden');
	$("#loading").addClass('hidden');
		
	$("#fontButton").click(function() {
		if ($("#fontButtonHolder").hasClass('hidden'))
		{
			$("#fontButtonHolder").removeClass('hidden');
			$("#arrowDownFont").addClass('hidden');
			$("#arrowUpFont").removeClass('hidden');
		}
		else
		{
			$("#fontButtonHolder").addClass('hidden');
			$("#arrowDownFont").removeClass('hidden');
			$("#arrowUpFont").addClass('hidden');
		}
	});
/////////////////////////////////////////////////////////////////////////
///////// end of the menu area javascript ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
});

/**************************************
* Open over 50s application form and position on 
* the screen for the user. 
* TODO: is this required still?
*
* @autor 
* @date 01/Jun/2011
//GC commented out 20/06/2012
function openApplicationFormWindow(theURL,winName) { 
  if(window.screen.availWidth <= 800) 
  { 
    var w = window.screen.availWidth-10;
    var h = window.screen.availHeight-45;
    myWin = window.open(theURL ,winName ,'screenX=0,screenY=0,left=0,top=0,width='+w+',height='+h+',resizable=1,status=1,menubar=0,toolbar=0,location=0,scrollbars=1');
  }
  else 
  {
    var w = window.screen.availWidth - 400;
    var h = window.screen.availHeight - 200;
    myWin = window.open(theURL ,winName,'screenX=15,screenY=10,left=15,top=10,width='+w+',height='+h+',resizable=1,status=1,menubar=0,toolbar=0,location=0,scrollbars=1');
  }
}
*/


/****
* Sends a user feedback from the website form.
*
* @autor Stephen Hayden
* @date 01/Jun/2011
 */
function beforeFeedbackAjax(response)
{
	$('#FeedbackHolder').html('<div class="loading"><img height="50" src="/uploadedImages/retail/img/loading.gif" width="49" /><br />Loading...</div>');
}

function successFeedbackAjax(response)
{
	$('#FeedbackHolder').html('<div class="loading">Feedback has been sent.<br/><br/>Thank you.</div>');
}

function errorFeedbackAjax()
{
	$('#FeedbackHolder').html('<div class="FRMessage">There is an error with your submission. Please contact us directly at <b>ebusiness@irishlife.ie</b>.</div>');
}

// www.irishlife.ie/myonlineservices/servlet/submitForm.do?form_id=generalFeedback&type=Websitefeedback&detail=testing
$( "#FeedbackSend" ).click(function() {

	content = 'Name: ' + $('#FeedbackFirstname').val() + ' ' + $('#FeedbackSurname').val() + 
	'\nEmail: ' + $("#FeedbackEmail").val() + 
	'\n\nFeedback Suggestions: ' + $("#FeedbackText").val();
	
	var parms = 'form_id=generalFeedback&type=Websitefeedback&detail='+escape(content);
	// alert("parms "+parms);
	
	if($("#FeedbackText").val().length<=10)
	{
	$("#FeedbackText").addClass('errorBox');
	}
	else
	{
		$("#FeedbackText").removeClass('errorBox');
		$.ajax({
			type: 'POST',
			url: '/myonlineservices/servlet/submitForm.do',
			async: true,
			data: parms,
			beforeSend: beforeFeedbackAjax,
			success: successFeedbackAjax,
			error: errorFeedbackAjax,
			timeout: 200000
		});
	}
	return false;
});

	
/****
* Show the advisor images if the advisor is available
* TODO: This will become redundant soon as the images
* should always be on the screen. The only thing changing
* will be an online/offline indicator.
*
* @autor Stephen Hayden
* @date 01/Jun/2011
 */
	// Display the photos on the advisor page if the users are online
function showAdvisorImage()
{
	$('#advisor-pic0').removeClass('hidden');
	$('#advisor-pic1').removeClass('hidden');
	$('#campaign-advisor').removeClass('advisor0');
	$('#campaign-advisor').removeClass('advisor1');
	$('#campaign-advisor').addClass('advisor0');
	
}
	
function togglefp(shower,hider){
		$('#'+shower).removeClass('hidden');
		$('#'+hider).addClass('hidden');
}
	
	
/****
* On the Pension Calculator page have a loading
* page appear while the flash/iframe is loading
* then hide/show. 
*
* @autor Stephen Hayden
* @date 01/Jun/2011
 */
$("#pencalcIframeLoaded").ready(function (){

	$('#pencalcIframeLoading').delay(3000).fadeOut(1300,function(){
	$('#pencalcIframeLoaded').removeClass('hidden');
	});
});


/****
* Add commas to a number.
*
* @autor Stephen Hayden
* @date 01/Jun/2011
 */
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//############################################################//
//
//######## This is a generic click to callback function. All click to callbacks should use this  ######//
//######## going forward. Params are the details and the ajax functions to be called.            ######//
//
//############################################################//
function sendClickToCallback(ty,n,p,e,t,s,ex,be,se,ee){
// sendClickToCallback('type','name','phone','email','time','subject','extraInfo', 'beforeClickToCallbackEmailLifeInsurance', 'successClickToCallbackEmailLifeInsurance',
//				     'errorClickToCallbackEmailLifeInsurance');

//ex = ex + '\n\nPlease read our terms of business (pdf) on <a href="http://www.irishlife.ie/uploadedFiles/Retail/body/products/Protection/Terms-of-business.pdf">irishlife.ie</a>';
//	if (n==""){n="unknown"} // fix bug that wouldn't send when name empty
//	var params = 'type='+ty+
				//'&name='+n+
				//'&email='+e+
				//'&phone='+p+
				//'&question='+s+
				//'&contacttime='+t+
				//'\nEmail: '+e+
				//'\n\nOther Information:'+ex;
		//$.ajax({
//			type: 'POST',
			//url: '/servlet/submitCallback.do',
			//async: true,
			//data: params,
			//beforeSend: be,
			//success: se,
			//error: ee,
			//timeout: 200000
		//});
		be();
		se();
		mkAssociateLead('NULL', n, e, p, t,''+$('#callbackAreaInterest').val());
		
}
//############################################################//
// This is the callback funchtion for the nurse assist and health lines pages. Do not Delete!
//############################################################//
function sendNACallback(n,p,t,s,be,se,ee){

	if (n==""){n="unknown"} // fix bug that wouldn't send when name empty
	var params = 'NAname='+n+
				'&NAphone='+p+
				'&NAquestion='+s+
				'&NAtime='+t;
		$.ajax({
			type: 'POST',
			url: '/secure/submitNurseAssist.do',
			async: true,
			data: params,
			beforeSend: be,
			success: se,
			error: ee,
			timeout: 200000
		});
}

function changeTab(tabSection, id)
{
	for(i = 0; ; i++)
	{	
		if($('#'+tabSection+'-tab-link' + i).length != 0)
		{
			if(i == id)
			{
				$('#'+tabSection+'-tab-link' + i).addClass('on'); 
				$('#'+tabSection+'-tab-content' + i).removeClass('hidden'); 
			}
			else
			{
				$('#'+tabSection+'-tab-link' + i).removeClass('on'); 
				$('#'+tabSection+'-tab-content' + i).addClass('hidden');
			}
		}
		else
		{
			break;
		}
	}
}

/****
* This is used for the google search box on 
* the top right of the webpage.
*
* @autor Stephen Hayden
* @date 23/Nov/2011
 */
$('#sendAdvisorCallbackForm').click(function(){
	var extraInforForEmail = "none";
	
	if ($("#progressPhone").val().length >=7)
	{
		var titleextra = "Click To Callback";
		var trackpageurl = window.location.pathname;
		var emailAddress='N/A';
		if ($("#progressEmail").val())
		{
			emailAddress=$("#progressEmail").val();
		}
		sendClickToCallback('G',''+$("#progressName").val(),''+$("#progressPhone").val(),emailAddress,''+$('#progressCalltime').val(),titleextra+' - PROCESS COMPLETE',extraInforForEmail,beClickTalk,seClickTalk,eeClickTalk);
		
		
	 }else
	 {
		alert("Please enter a valid PHONE NUMBER.");
	 }
});
function beClickTalk(){
	$("#sendAdvisorCallbackForm").hide();
	$("#loadingbox").show();
}

function seClickTalk(){
	$("#loadingbox").hide();
	$("#loadingcomplete").show();
	$(".progressInputs").hide();
	$(".progressSummary").hide();	
	clickSuccess();
}

function eeClickTalk(){
alert("error ");
	$("#sendAdvisorCallbackForm").show();
	$("#loadingbox").hide();
}

function clickSuccess(){
if(_gaq){
	if ($("#progressCalltime").length > 0){
		_gaq.push(['_trackEvent','Click to callback', 'Times',$('#progressCalltime').val()]);  		
	}
	_gaq.push(['_trackPageview','/advice/callback-requested.html']); 
	mkVisitWebPage('/advice/callback-requested.html');
	applyTracking("general");
}


}

$('.ilfsApplySimpleLife').click(function(){
if(_gaq){
	_gaq.push(['_trackPageview','/life-assurance/apply-online-simple-life-insurance']);
	}
});

/****
* This is the callback form for NurseAssist and Women's Health center
*
 */
 
$('#sendHealthlinesCallbackForm').click(function(){
	var extraInforForEmail = "none";
	
	if ($("#NAPhone").val().length >=7)
	{
		var titleextra = "Click To Callback";
		var trackpageurl = window.location.pathname;
		var emailAddress='N/A';
		if ($("#progressEmail").val())
		{
			emailAddress=$("#progressEmail").val();
		}
		sendNACallback(''+$("#NAname").val(),''+$("#NAPhone").val(),''+$('#NATime').val(),''+$('#NAQuestion').val(),beNurseAssist,seNurseAssist,eeNurseAssist);
		
		
	 }else
	 {
		alert("Please enter a valid PHONE NUMBER.");
	 }
});
function beNurseAssist(){
	$("#sendHealthlinesCallbackForm").hide();
	$("#loadingbox").show();
}

function seNurseAssist(){
	$("#loadingbox").hide();
	$("#loadingcomplete").show();
	$(".progressInputs").hide();
	$(".progressSummary").hide();
	if(_gaq){
		_gaq.push(['_trackPageview','/customer-service/healthlines-requested.html']); 
		mkVisitWebPage('/customer-service/healthlines-requested.html');	
	}
}

function eeNurseAssist(){
	alert("error ");
	$("#sendHealthlinesCallbackForm").show();
	$("#loadingbox").hide();
}


/**************************************
* This is used for the google search box on 
* the top right of the webpage.
*
* @autor Stephen Hayden
* @date 23/Nov/2011
 */

function performSearch()
{
	var search = $('#searchInput').val();
	if (search != "Search...")
	{
		search = search.replace(/ /g,'+');
		window.location='http://www.irishlife.ie/search.html?search='+search;
	}
}

function initEnterKeyListener()
{
	$(document).keydown(function(e)
	{
		var keynum = e.which || e.keyCode;
		if(keynum == 13){try{performSearch(); }catch(e){}}
	});
}

$('#searchInput').one("focus", function() {
	$(this).val("");
});


$('#getusercallback').click(function() {
	$('#callback-modal-content').modal();
});

$('#open-integration-video').click(function() {
	$('#video-modal-integration').html('<iframe width="853" height="480" src="//www.youtube.com/embed/SSo9_WhN4xg" frameborder="0" allowfullscreen></iframe>');
	$('#video-modal-integration').modal({
            minHeight:510,
            minWidth: 870,
            persist:true,
            overlayClose:true
        });
});
$('#open-greatwestprofile-video').click(function() {
	$('#video-modal-integration').html('<iframe width="853" height="480" src="//www.youtube.com/embed/aRRgwIF7O_U" frameborder="0" allowfullscreen></iframe><br/><b>Information correct as of July 2013</b>');
	$('#video-modal-integration').modal({
            minHeight:510,
            minWidth: 870,
            persist:true,
            overlayClose:true
        });
});

function showpensionsvid(num) {
	$("#pensions-video-modal-content").modal();
if(num==1){
	$("#pensions-video-modal-content").html('<h2>Introduction</h2><iframe width="560" height="315" src="http://www.youtube.com/embed/fJS_LKtQPYc?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe><br/><p>This section looks at the restrictions around drawing down your pension and the additional information needed when sending in your claim form.</p>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#intro']);
}else if(num==2){
	$("#pensions-video-modal-content").html('<h2>Section 1: Financial Advisor Details</h2><iframe width="560" height="315" src="https://www.youtube.com/embed/L6GBAfZUHYI?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section1']);
}else if(num==3){
	$("#pensions-video-modal-content").html('<h2>Section 2: Personal and Plan details</h2><iframe width="560" height="315" src="http://www.youtube.com/embed/-KCXMAjbE1E?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section2']);
}else if(num==4){
	$("#pensions-video-modal-content").html('<h2>Section 3: Retirement Lump Sum</h2><iframe width="560" height="315" src="//www.youtube.com/embed/r0ahczrslYQ?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section3']);
}else if(num==5){
	$("#pensions-video-modal-content").html('<h2>Section 4 Question 1: Other Pension Benefits</2><iframe width="560" height="315" src="http://www.youtube.com/embed/9cx_dgQJuqE?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section4.1']);
}else if(num==6){
	$("#pensions-video-modal-content").html('<h2>Section 4 Question 2: Other Pension Benefits</2><iframe width="560" height="315" src="http://www.youtube.com/embed/bS2_mNJ2mz4?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section4.2']);
}else if(num==7){
	$("#pensions-video-modal-content").html('<h2>Section 4 Question 3: Other Pension Benefits</2><iframe width="560" height="315" src="http://www.youtube.com/embed/2x4_3zs6Ly8?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section4.3']);
}else if(num==8){
	$("#pensions-video-modal-content").html('<h2>Section 5: Retirement Options</h2><iframe width="560" height="315" src="http://www.youtube.com/embed/V5IXL02Gc5o?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe><br/><p>You may also be interested in our flyer on <a href="http://www.irishlife.ie/uploadedFiles/Retail/body/guides/pensions-tax-relief.pdf" title="pension tax relief">pension tax relief</a></p>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section5']);
}else if(num==9){
	$("#pensions-video-modal-content").html('<h2>Section 6: Pension Adjustment Order</h2><iframe width="560" height="315" src="http://www.youtube.com/embed/8lMoM6xGPEg?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe><br/><p>For more information on Pension adjustment orders, you can visit the <a href="http://www.pensionsboard.ie/en/Publications/Information_Booklets/Pensions_on_separation_and_divorce_checklist_.pdf" title="pensions board"> pensions board</a> website</p>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section6']);
}else if(num==10){
	$("#pensions-video-modal-content").html('<h2>Section 7: Vested PRSA or Taxable Cash</h2><iframe width="560" height="315" src="//www.youtube.com/embed/wsvQ4Reo36w?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section7']);
}else if(num==11){
	$("#pensions-video-modal-content").html('<h2>Section 8: Contributor Declaration</h2><iframe width="560" height="315" src="http://www.youtube.com/embed/hpgp-8OhgJw?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#section8']);
}else if(num==12){
	$("#pensions-video-modal-content").html('<h2>Conclusion</h2><iframe width="560" height="315" src="http://www.youtube.com/embed/T_EltPWS65g?autoplay=1&rel=0" frameborder="0" allowfullscreen>&nbsp </iframe><br/><p>You have now concluded your retirement claim form. Please forward your claim form and additional requirements to:<br/>Pensions Retirement Team<br/>Irish Life<br/>Lower Abbey Street<br/>Dublin 1</p>');
	if (_gaq) _gaq.push(['_trackPageview',window.location.pathname+'#conclusion']);
}
	
}


// TODO: Review this function. Is it needed?
// Ensure that the user who clicks the callback button is on the correct page
$('#callbackTab').click(function()
{
	$('#callback-modal-content').modal();
	_gaq.push(['_trackPageview','/advice/callback-popup-opened.html']); 
	mkVisitWebPage('/advice/callback-popup-opened.html');
});
$('#callbackTab2').click(function()
{
	$('#callback-modal-content').modal();
	_gaq.push(['_trackPageview','/advice/callback-popup-opened-form.html']); 
	mkVisitWebPage('/advice/callback-popup-opened-form.html');
});

$('.anyCallbackButton').click(function()
{
	$('#callback-modal-content').modal();
	_gaq.push(['_trackPageview','/advice/callback-popup-opened-anycallback.html']); 
	mkVisitWebPage('/advice/callback-popup-opened-anycallback.html');
});


/**************************************
* Google Analytics tracking functions. Call
* these functions to track via google analytics
*
* @autor Ger Coughlan
* @date 01/Jun/2011
 */
function trackDownload(page, filename)
{
	if (_gaq) _gaq.push(['_trackEvent', 'pdfs', 'download', page + ' - ' + filename]);  
}
function trackMenuChange(whichmenu)
{
	if (_gaq) _gaq.push(['_trackEvent', 'Show-Menu', whichmenu]);  
}


/**************************************
* Get info from the page URL
*
* @autor Ger Coughlan
* @date 01/Jun/2011
 */
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

/**************************************
* If the rel link is present in a href then
* it can be set to external to open page in
* a new window. Gets around strict XHTML
* practise of not opening in different windows. 
*
* @autor Stephen Hayden
* @date 01/Jun/2011
 */
$(function() {
    $('a[rel*=external]').click( function() {
        window.open(this.href);
        return false;
    });
});




/**************************************
* Generic div function
* TODO: Check if needed
*
* @autor 
* @date 01/Jun/2011
 */
function closeDiv(id)
{
	$("#"+id).removeClass("hidden");
}

/****
* Add an action for the callback on the modal popup
*
* @autor Stephen Hayden
* @date 28/Nov/2011
 */
$('#sendAdvisorCallbackPopupForm').click(function(){
	var extraInforForEmail = "none";
	
	if ($("#callbackPopupPhone").val().length >=7)
	{
		var titleextra = "Click To Callback";
		var trackpageurl = window.location.pathname;
		var emailAddress='N/A';
		var type='G';
		
		if ($('#typeC').attr('checked'))
		{
			type='C';
		}
		
		if ($("#callbackPopupEmail").val())
		{
			emailAddress=$("#callbackPopupEmail").val();
		}
		sendClickToCallback(type,''+$("#callbackPopupName").val(),''+$("#callbackPopupPhone").val(),emailAddress,''+$('#callbackPopupCalltime').val(),titleextra+' - PROCESS COMPLETE',extraInforForEmail,beClickTalkPop,seClickTalkPop,eeClickTalkPop);
	 }else
	 {
		alert("Please enter a valid PHONE NUMBER.");
	 }
});
function beClickTalkPop(){
	$("#progressBoxPopupContents").hide();
	$("#loadingboxpopup").show();
}

function seClickTalkPop(){
	$("#loadingboxpopup").hide();
	$("#loadingcompletepopup").show();
	setTimeout( function(){
		$.modal.close();
	}, 4000);
	  
	clickSuccess();
}

function eeClickTalkPop(){
alert("error ");
}

function populateCallbackTimes(online)
{

var timeOptions = 
'<option value="anytime" selected="selected">Anytime</option>' +
'<option value="morning-before-12pm">Morning (before 12pm)</option>' +
'<option value="afternoon-12pm-to-5pm">Afternoon (12pm to 5pm)</option>' +
'<option value="evening-5pm-to-8pm">Evening (5pm to 8pm)</option>';

if (online=='Y')
{
	timeOptions = '<option value="NOW">Now</option>'+timeOptions;
}
	$('#callbackPopupCalltime').html(timeOptions);
	$('#progressCalltime').html(timeOptions);
	$('#callbackRHSCalltime').html(timeOptions);
}

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
		$(this).attr('onclick',"if (_gaq) _gaq.push(['_trackEvent', 'PDF download', '"+link + "']);return true");	});
}



/****
* Add an action for the pension calculator modal popup.
* It should open in modal when button clicked.
*
* @autor Stephen Hayden
* @date 07/Mar/2012
 */


$('#introBtn1').click(function()
{


$('#simplemodal-container').css('height','585px');
$('#pensionCalcIntroA').hide();
$('#warnings').show();
$('#flashcontent').show();

if (window.location.pathname == '/pensions/make-your-retirement-plan.html' ||
   window.location.pathname == '/pensions/what-is-your-retirement-plan.html' ||
   window.location.pathname == '/pensions/whats-your-retirement-plan.html')
{
/**
campaign calculator with find a broker
*/
	$('#flashcontent').html('<iframe height="480" src="https://www.irishlife.ie/secureWeb/pensions/pension-calculator-iframe.html" frameborder="no" width="700" align="center">&lt;p&gt;Your browser does not support iframes.&lt;/p&gt;</iframe>');
}
else
{
	var version = deconcept.SWFObjectUtil.getPlayerVersion(); 
	if (document.getElementById && version["major"] <10) { 
		document.getElementById('flashcontent').innerHTML = "You have an old version of Flash player installed: version "+ version['major'] +"."+ version['minor'] +"."+ version['rev'] +". In order to user this calculator please upgrade to the latest version."; 
	} 
	else 
	{ 
	var so = new SWFObject("https://www.irishlife.ie/secureWeb/uploadedImages/Retail/body/advice/pensionCalc2.5.swf?id=1044", "mymovie", "685", "467", "8", "#336699"); 
	so.addParam("quality", "high");
	so.addParam("wmode", "transparent"); 
	so.addParam("allowScriptAccess", "true"); 
	so.addParam("salign", "t"); 
	so.addVariable("contactUserID", "1"); 
	so.addVariable("doubleClickCallbackParams", "activityi;src=1459025;type=ilpro894;cat=arran426;ord=1?"); 
	so.write("flashcontent"); 
	}
}
_gaq.push(['_trackPageview','/pension-calculator/open-calculator-clicked-show-logo']); 
mkVisitWebPage('/pension-calculator/open-calculator-clicked-show-logo');
});


$('.pensioncalcbutton').click(function()
{
    var isiPad = navigator.userAgent.match(/iPad/i) != null;
    if(isiPad == true){
        _gaq.push(['_trackPageview','/pension-calculator/redirect-to-tablet']); 
        window.location = "http://m.irishlife.ie/apps/pension-calculator/tablet/";
    }
    else{
    
        
        $('#pensionCalc-modal-content').modal({
            minHeight:600,
            minWidth: 720,
            persist:true,
            overlayClose:true
        });
        $('#simplemodal-container').css('height','420px');
        $('#pensionCalcIntroA').show();
        $('#warnings').hide();
        $('#flashcontent').hide(); 
        _gaq.push(['_trackPageview','/pension-calculator/open-calculator-clicked']); 
		mkVisitWebPage('/pension-calculator/open-calculator-clicked');
        
    }
});

$('.lifecalcbutton').click(function()
{
        $('#pensionCalc-modal-content').modal({
            minHeight:600,
            minWidth: 720,
            persist:true,
            overlayClose:true
        });
        $('#simplemodal-container').css('height','420px');
        _gaq.push(['_trackPageview','/life-calculator/open-calculator-clicked']); 
		mkVisitWebPage('/life-calculator/open-calculator-clicked');
});


$('.incomecalcbutton').click(function()
{
        $('#pensionCalc-modal-content').modal({
            minHeight:480,
            minWidth: 700,
            persist:true,
            overlayClose:true
        });
        $('#simplemodal-container').css('height','500px');
        _gaq.push(['_trackPageview','/life-calculator/open-income-protection']); 
		mkVisitWebPage('/life-calculator/open-i');
});




/****
* Modal popups used in the pension campaign.
* It should open in modal when button clicked.
*
 */
$('.pensionsOptionsModalbutton').click(function()
{
	$('#pensionsOptions-modal-content').modal({
		minHeight:620,
		minWidth: 900,
		persist:true,
		overlayClose:false
	});
    $('#pensionsOptions-modal-content').html("<iframe height=\"600\" src=\"http://blog.irishlife.ie/documents/guide-to-pensions/\" frameborder=\"no\" width=\"880\" align=\"center\"><p>Your browser does not support iframes.</p></iframe>");

	_gaq.push(['_trackPageview','/pension-campaign/pensions-guide-modal']); 
	mkVisitWebPage('/pension-campaign/pensions-guide-modal');
});

$('.pensionsSimpleGuideModalbutton').click(function()
{
	$('#pensionsOptions-modal-content').modal({
		minHeight:620,
		minWidth: 900,
		persist:true,
		overlayClose:false
	});
    $('#pensionsOptions-modal-content').html("<iframe height=\"600\" src=\"http://blog.irishlife.ie/documents/simple-pensions-guide/\" frameborder=\"no\" width=\"880\" align=\"center\"><p>Your browser does not support iframes.</p></iframe>");

	_gaq.push(['_trackPageview','/pension-campaign/simple-pensions-guide-modal']); 
	mkVisitWebPage('/pension-campaign/simple-pensions-guide-modal');
});



$('.pensionsJourneyModalbutton').click(function()
{
	var theURL = 'http://www.irishlife.ie/pensions/income-tax-relief-calculator.html';
	var winName= 'Incometax';
	if(window.screen.availWidth <= 800) 
    { 
    var w = 700;
    var h = window.screen.availHeight-45;
    myWin = window.open(theURL ,winName ,'screenX=0,screenY=0,left=0,top=0,width='+w+',height='+h+',resizable=1,status=1,menubar=0,toolbar=0,location=0,scrollbars=1');
     }
    else 
    {
    var w = 700;
    var h = window.screen.availHeight - 100;
    myWin = window.open(theURL ,winName,'screenX=15,screenY=10,left=15,top=10,width='+w+',height='+h+',resizable=1,status=1,menubar=0,toolbar=0,location=0,scrollbars=1');
   }
	
	_gaq.push(['_trackPageview','/pension-campaign/income-tax-relief-calculator-modal']); 
	mkVisitWebPage('/pension-campaign/income-tax-relief-calculator-modal');
	
});

$('.advisorMapModalbutton').click(function()
{
	$('#advisorMap-modal-content').modal({
		minHeight:670,
		minWidth: 900,
		persist:true,
		overlayClose:false
	});
    $('#advisorMap-modal-content').html("<div id=\"outerdiv3\"><iframe id=\"inneriframe\" src=\"http://www.irishlife.ie/advice/find-a-financial-advisor.html\" frameborder=\"0\" scrolling=\"no\"><p>Your browser does not support iframes.</p></iframe></div>");
	_gaq.push(['_trackPageview','/pension-campaign/advisor-map-modal']); 
	mkVisitWebPage('/pension-campaign/advisor-map-modal');
});

$('.what-is-financial-broker').click(function()
{
	$('#what-is-financial-broker').modal({
		height:150,
		width: 500,
		persist:true,
		overlayClose:false
	});
	$('#simplemodal-container').css('height','150px');
	_gaq.push(['_trackPageview','/find-advisor/what-is-financial-broker']); 
	mkVisitWebPage('/find-advisor/what-is-financial-broker');
});
/****
* Add an action for the callback on Right Hand Side 
* callback. For example on the pension calculator page
*
* @autor Stephen Hayden
* @date 08/03/2012
 */
 $("#sendAdvisorCallbackRHSForm").click(function(){
 var a="none";
 
	 if($("#callbackRHSTopic").val())
	 {
		a=$("#callbackRHSTopic").val()
	 }
	 
	 if($("#callbackRHSPhone").val().length>=7)
	 {
		var b="Click To Callback";
		var c="N/A";
		var d=window.location.pathname;
		if(	$("#callbackRHSEmail").val())
		{
			c=$("#callbackRHSEmail").val()
		}	
		sendClickToCallback("G",""+$("#callbackRHSName").val(),""+$("#callbackRHSPhone").val(),c,""+$("#callbackRHSCalltime").val(),b+" - PROCESS COMPLETE",a,beClickTalkRHS,seClickTalkRHS,eeClickTalkRHS);
		if($("#callbackRHSID").val()=="life")
		{
			_gaq.push(["_trackPageview","/life-assurance/callback-requested-RHS"]);
			mkVisitWebPage('/life-assurance/callback-requested-RHS');
			applyTracking("general");
		}
		
		else if($("#callbackRHSID").val()=="incomeprotection")
		{
			_gaq.push(["_trackPageview","/income-protection/callback-requested-RHS"]);
			mkVisitWebPage('/income-protection/callback-requested-RHS');
			applyTracking("general");
		}
		else
		{
			_gaq.push(["_trackPageview","/pension-calculator/callback-requested-RHS"]);
			mkVisitWebPage('/pension-calculator/callback-requested-RHS');
			applyTracking("pensions");
			
		}
		
	}
	else
	{
		alert("Please enter a valid PHONE NUMBER.")
	}
});
function applyTracking(type)
{
if (type=="general")
	{
		if ($("#insertTrackingDiv").length > 0) {
			$('#insertTrackingDiv').html(callbackTracking);
		}
	} 
	else if (type=="pensions")
	{
		if ($("#insertTrackingDiv").length > 0) {
			$('#insertTrackingDiv').html(pensionTracking);
		}
	} 
} 
 /*
$('#sendAdvisorCallbackRHSForm').click(function(){
	
	var extraInforForEmail = "none";
	
	// See what the RHS topic is and pass that in
	// In specific areas like pension pages etc it is 
	// useful for Advisors to know that the callback
	// is from people who are looking for this information
	if ($("#callbackRHSTopic").val())
	{
		extraInforForEmail=$("#callbackRHSTopic").val();
	}
	
	if ($("#callbackRHSPhone").val().length >=7)
	{
		var titleextra = "Click To Callback";
		var emailAddress='N/A';
		var trackpageurl = window.location.pathname;
		
		if ($("#callbackRHSEmail").val())
		{
			emailAddress=$("#callbackRHSEmail").val();
		}
		
		sendClickToCallback('G',''+$("#callbackRHSName").val(),''+$("#callbackRHSPhone").val(),emailAddress,''+$('#callbackRHSCalltime').val(),titleextra+' - PROCESS COMPLETE',extraInforForEmail,beClickTalkRHS,seClickTalkRHS,eeClickTalkRHS);
		
		_gaq.push(['_trackPageview','/pension-calculator/callback-requested-RHS']); 
		
	 }else
	 {
		alert("Please enter a valid PHONE NUMBER.");
	 }
});

*/

function beClickTalkRHS(){

	$(".callbackRHSHolder").hide();
	$("#callbackRHSLoading").show();

}

function seClickTalkRHS(){

	$("#callbackRHSLoading").hide();
	$("#loadingcompleteRHS").show();
 
}

function eeClickTalkRHS(){
	alert("error ");
}



/*
 * SimpleModal 1.4.3 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2012 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sat, Sep 8 2012 07:52:31 -0700
 */
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],l=b(document),m=b.browser.msie&&6===parseInt(b.browser.version)&&"object"!==typeof window.XMLHttpRequest,o=b.browser.msie&&7===parseInt(b.browser.version),n=null,k=b(window),h=[];b.modal=function(a,d){return b.modal.impl.init(a,d)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=function(){b.modal.impl.setContainerDimensions()};
b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,d){b.modal.impl.update(a,d)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',
closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,d){if(this.d.data)return!1;n=b.browser.msie&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,d);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"})),
this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:h[0],width:h[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||n)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});l.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});k.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||n?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:h[0],width:h[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");l.unbind("keydown.simplemodal");k.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,f){if(f){var g=f[0].style;g.position="absolute";if(2>b)g.removeExpression("height"),g.removeExpression("width"),g.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),g.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,e;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):f.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(e="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),e=-1===e.indexOf("%")?e+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(e.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
e='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');g.removeExpression("top");g.removeExpression("left");g.setExpression("top",c);g.setExpression("left",e)}}})},focus:function(a){var d=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",f=b(":input:enabled:visible:"+a,d.d.wrap);setTimeout(function(){0<f.length?f.focus():d.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?k.height():window.innerHeight;j=[l.height(),l.width()];h=[a,k.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?h[0]:h[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||o,d=this.d.origHeight?this.d.origHeight:b.browser.opera?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:b.browser.opera?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),f=this.d.data.outerHeight(!0),
g=this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||d;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,e=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<h[0]?c:h[0],e=e&&e<h[1]?e:h[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",d=d?this.o.autoResize&&d>c?c:d<i?i:d:f?f>c?c:this.o.minHeight&&"auto"!==i&&f<i?i:f:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>e?e:a<c?c:a:
g?g>e?e:this.o.minWidth&&"auto"!==c&&g<c?c:g:c;this.d.container.css({height:d,width:a});this.d.wrap.css({overflow:f>d||g>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=h[0]/2-this.d.container.outerHeight(!0)/2;b=h[1]/2-this.d.container.outerWidth(!0)/2;var f="fixed"!==this.d.container.css("position")?k.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=f+(this.o.position[0]||a),b=this.o.position[1]||
b):a=f+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});


/*
 * Jquery Notify
 * Addng a simple notifications widget to the screen.
 */
//(function(e){function t(t,n){t.onCleanup.call(this);n.fadeOut("fast",function(){e(this).remove();t.onClosed()})}function n(t,n){return e(document.createElement(t)).addClass(n)}e.extend({notify:function(r,i){var s={inline:false,href:"",html:"",close:"",onStart:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){}},o,u=false,a,f=e("<li></li>").addClass("notification"),l,c,h,p,d;r=e.extend(s,r);r.onStart.call(this);if(e("ul#notification_area").length){a=e("ul#notification_area")}else{a=e("<ul></ul>").attr("id","notification_area");e("body").append(a)}if(r.href){if(r.inline){o=e(r.href).clone()}else{u=true;o=e("<iframe></iframe>").attr("src",r.href).css({width:"100%",height:"100%"})}}else if(r.html){o=e(r.html)}f.append(n("div","notify_top").append(n("div","notify_nw"),l=n("div","notify_n"),n("div","notify_ne")),n("div","notify_center").append(h=n("div","notify_w"),d=n("div","notify_content").append(o),p=n("div","notify_e")),n("div","notify_bottom").append(n("div","notify_se"),c=n("div","notify_s"),n("div","notify_sw")));f.css("visibility","hidden").appendTo(a);if(r.close){var v=e("<span></span>").addClass("cl").html(r.close);d.append(v)}var m=0-parseInt(f.outerHeight());f.css("marginBottom",m);if(u){d.height(parseInt(d.find("iframe").height()+16))}l.width(parseInt(f.width())-40);c.width(parseInt(f.width())-40);h.height(parseInt(d.height()));p.height(parseInt(d.height()));f.animate({marginBottom:0},"fast",function(){f.hide().css("visibility","visible").fadeIn("fast");if(i){setTimeout(function(){t(r,f)},i)}if(!r.close){f.bind("click",function(){t(r,f)})}else{v.bind("click",function(){t(r,f)})}r.onComplete.call(this)})}})})(jQuery)

(function(e){function t(t,n){t.onCleanup.call(this);n.fadeOut("fast",function(){e(this).remove();t.onClosed()})}function n(t,n){return e(document.createElement(t)).addClass(n)}e.extend({notify:function(r,i){var s={inline:false,href:"",html:"",close:"",onStart:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){}},o,u=false,a,f=e("<li></li>").addClass("notification"),l,c,h,p,d;r=e.extend(s,r);r.onStart.call(this);if(e("ul#notification_area").length){a=e("ul#notification_area")}else{a=e("<ul></ul>").attr("id","notification_area");e("body").append(a)}if(r.href){if(r.inline){o=e(r.href).clone()}else{u=true;o=e("<iframe></iframe>").attr("src",r.href).css({width:"100%",height:"100%"})}}else if(r.html){o=e(r.html)}f.append(n("div","notify_top").append(l=n("div","notify_n")),n("div","notify_center").append(h=n("div","notify_w"),d=n("div","notify_content").append(o),p=n("div","notify_e")),n("div","notify_bottom").append(c=n("div","notify_s")));f.css("visibility","hidden").appendTo(a);if(r.close){var v=e("<span></span>").addClass("cl").html(r.close);d.append(v)}var m=0-parseInt(f.outerHeight());f.css("marginBottom",m);if(u){d.height(parseInt(d.find("iframe").height()+16))}l.width(parseInt(f.width())-40);c.width(parseInt(f.width())-40);h.height(parseInt(d.height()));p.height(parseInt(d.height()));f.animate({marginBottom:0},"fast",function(){f.hide().css("visibility","visible").fadeIn("fast");if(i){setTimeout(function(){t(r,f)},i)}if(!r.close){f.bind("click",function(){t(r,f)})}else{v.bind("click",function(){t(r,f)})}r.onComplete.call(this)})}})})(jQuery)

//var remainingIds='';/*4219;3637;3880;U795;6070;4213;';*/
// Get the number of places left on the free cover
//var url = '/servlet/launchfreecover';
//var refer= gup('refer');
//refer = $.trim(refer);
//var numPlacesLeft=99999;
//if (refer !='')
//{
//	url = url+'?refer='+refer;	
//}
//log(url);

//$('.launchFreeCover').click(function () {
//	if (refer != '' && remainingIds.indexOf(refer) >=0)
//	{
//		window.location = url;
//	}
//	else
//	{
//		alert("The Free Parent Life Insurance Offer is now closed!!!");
//	}
//});
	
//function remainingPlaces()
//{
//	$.get("/servlet/numAvailable.jsp", function(data) {
		//str = jQuery.trim(data);
		//var values = str.split(';');
		//var sellerCode='';
		//if (refer !='')
		//{
//			for (var i=0; i < values.length;i++)
			//{				
//				sellerCode = $.trim(values[i].split('=')[0]);
				//if (refer == sellerCode)
				//{
				//	numPlacesLeft=values[i].split('=')[1];
				//}
			//}			
		//}
		
		//if (numPlacesLeft == 99999)
		//{
//			numPlacesLeft=values[0].split('=')[1];
		//}
		//$('.freecoverRemain').html(numPlacesLeft);
		//$('.freecoverRemain').digits();
	//});
//}
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}





/****
* This is the onload function. All this code is executed after the
* page has been fully loaded.
*
* @LastModified Stephen Hayden
* @Date 23/11/2011
*
**** 23/11/2011 *** Removed all 
*/
$(document).ready(function () {
	//remainingPlaces();
	// Certain pages (e.g. pension calc) there is a callback on right hand side. Only load
	// this callback after all js is loaded in order to draw attention and also so that there
	// is no attempt at a callback until all loaded 
	if((typeof loadRHSCallback != 'undefined') && (loadRHSCallback))
	{
		$("#callbackRHSLoading").fadeOut('1700');
		$(".callbackRHSHolder").delay('300').slideDown("slow");
		
	}
	
	//don't show slider on over 50s page
	if (!/over-fifties-life-cover-online\.html$/.test(window.location.href)) {
	$('#callbackSlider').delay('1000').fadeIn(1200);
	}

	// listen for the user to hit ENTER for search
	initEnterKeyListener();
	
	
	// Control the text size on screen by using a cookie
	if($.cookie('TEXT_SIZE')) {
	$('body').addClass($.cookie('TEXT_SIZE')); 
	}
	
	// Resize the font when the button is clicked. 
	$('.resizer a').click(function() {
		var textSize = $(this).attr('rel');
		$('body').removeClass('small medium large').addClass(textSize);
		$.cookie('TEXT_SIZE',textSize, { path: '/', expires: 10000 });
		return false;
	});

	// set the random image for the advisor part of the callback screen
	var randomnumber=Math.floor(Math.random()*2)+1;
	$('#callbackAdvisorImg'+randomnumber).removeClass('hidden');
	
	// TODO: check if this is used? I think it was part of old callback - T529
	// Check the availability of the advisors in Dundalk and then display
	// to the user if they are available
	$.get("/servlet/callbackAvailable.do", function(data){
	str = jQuery.trim(data);

	if (str == 'onlineNow=Y') 
	{
		populateCallbackTimes('Y');
	}
	else
	{
		populateCallbackTimes('N');
	}
		
	// Show the advisor popout and display if they are online or not
	showAdvisorImage();		
	});	
	

	// fund price stuff
	ajaxManager = $.manageAjax.create('queue',{queue: true});
	if ($('#fundPerformanceResponse').length == 1)
	{
		showPrices();
	}
	if ($('#RiskProfileQuestionsResponse').length == 1)
	{
		loadRiskQuestionnaire();
	}

	//timestamp any links to pdfs to ensure the latest one is shown
	timestampPdfs();

	$("#breadcrumbs a").each(function()
    { 
       this.href = 'http://'+document.domain + '/'+ this.pathname;
    });	
	
	// Generic code for controlling tabs from IQContent
	// TODO: Remove if not required. Doesn't work crossbrowser.
	$(".tab_content").hide();
	$("ul.tabs li:first").addClass("active").show();
	$(".tab_content:first").show();
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();
		var activeTab = $(this).find("a").attr("href");
		$(activeTab).fadeIn();
		return false;
	});
	
	/**	############################################
	Pensions campaign 2012
	################################################*/
	if ($('#financialBrokerName').length != 0){ var id = '';name = 'broker';var regexS = "[\\?&]"+name+"=([^&#]*)";var regex = new RegExp( regexS );var results = regex.exec( window.location.href );if( results == null ){ id =  "";} else {id = results[1]};if (id != ''){$.get("/servlet/getBrokerDetails.do?id="+id, function(data){str = jQuery.trim(data);if (str.length > 10){var variables = str.split(';');var name=variables[0];var email=variables[3];var phone=variables[1];$('#financialBrokerName').html(name);$('#financialBrokerEmail').html(email);$('#financialBrokerPhone').html(phone);
	document.title = $('#financialBrokerName').html() + ' ' + document.title;
	$('#headerNameplate').html('<span style="font-size:30px;font-weight:bold;text-decoration:underline;">'+$('#financialBrokerName').html()+'</span>');}});}}
	
	
	
	$('#financialBrokerEmailhref').click(function () {$(this).attr('href','mailto:'+$('#financialBrokerEmail').html());});if ($('.pensioncalcbutton').length != 0){var link = document.createElement('link');link.type = 'image/x-icon';link.rel = 'shortcut icon';link.href = '/uploadedImages/Retail/images/pensions-favicon.ico';document.getElementsByTagName('head')[0].appendChild(link);}
	
	//
	//Populate name, email address, phone, if possible for callback page
	//
	$('#progressName').val(gup('name'));
	$('#progressPhone').val(gup('phone'));
	$('#progressEmail').val(gup('email'));
	
	checkForAcceptCookies();
	
	$('#fb-likebox-footer').html('<iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Firishlifeassurance&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=21&amp;appId=204555346398643" width="100" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>');
	
});

// This is for the €50 cashback for lifecover promotion
// for the start of jan - mar 2012. Can be removed when 
// promotion is completed
// GC Commented out 20/06/2012.
/*
$('#progressCampaignQuoteTermsLink').click(function()
{
		loadTerms();
});
$('#progressCampaignQuoteTermsLink2').click(function()
{
		loadTerms();
});

function loadTerms()
{
		$.get("/uploadedFiles/emptyFragment.aspx?id=14834", function(data){			
			$('#progressBoxPopupContentsText').html(data);
			$('.loading').addClass('hidden');
			$('#progressCampaignQuoteTermsLink-content').modal();
			if (_gaq) _gaq.push(['_trackPageview','/life-assurance/cash-back-offer-terms.html']);	
		});
}
*/

//////////////////////////////////////////////////////////////////////
// Download a guide from the website
// open the download box
$('.downloadBox-fullBox').click(function(){
	$("#download-guide-email").modal({
			minHeight:200,
			onClose: function (dialog) {
			dialog.container.fadeOut('slow', function () {
					$.modal.close();
			});
		}
	});
});
// Submit email address and the guide details to get
// the email sent using marketo
function downloadGuide(guidename){

	var emailDownload = $('#download-guide-email-address').val();
	
	if (emailDownload.length <= 8)
	{
		$('#download-guide-email-pdf-error').show();
		$('#download-guide-email-pdf-error').html('Please enter a valid email address.');
	}
	else{
		$('#download-guide-email-pdf-error').hide();
		mkAssociateLeadEarlyStage(emailDownload, guidename);
		
		$('#download-guide-submitButton').replaceWith("<span class='emboldened greenUp'>&#10004; Thank you. Email has been sent.</span>");
		
			if (_gaq) _gaq.push(['_trackPageview','/guides/download-guide-button-clicked']);
			setTimeout(function() {
				$.modal.close();
			}, 3000);

	}
}
