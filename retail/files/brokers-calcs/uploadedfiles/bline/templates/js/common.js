/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */

(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

with(document.createElement("b")){
	id=4;
	while(innerHTML="<!--[if gt IE "+ ++id+"]>1<![endif]-->",innerHTML>0);
	var ie=id>5?+id:100;
}


function changeVersionPref(pref){
	if (pref=="old")
	{
		$.cookie('website_version_pref', 'old', { expires: 35 , path: '/' });
		window.location.href = "http://www.bline.ie/";
	}
	else{ //alert($.cookie('website_version_pref'));
		$.cookie('website_version_pref', 'new', { expires: 35 , path: '/' });
		window.location.href = "http://www.bline.ie/uploadedFiles/bline/templates/home.aspx";
	}
}

if($.cookie('website_version_pref')) {
var pathname = window.location.pathname;
//alert (pathname);
	// only change the page if they are on the homepage otherwise there is a link on the page
	if(pathname == "/" || pathname == "")
	{
		if ($.cookie('website_version_pref')=="new")
		{
			window.location.href = "http://www.bline.ie/new-home-page.html";
		}
	}
	
	if( pathname == "/new-home-page.html")
	{
		if ($.cookie('website_version_pref')=="old")
		{
			window.location.href = "http://www.bline.ie/";
		}
	}
}

//################################################//
//##################### E N D #######################//
//################################################//



var ajaxManager;
var timeout			= 500;
var closetimer	= 0;
var ddmenuitem	= 0;
var fundCategoriesReceived=false;
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

function jsddm_open(){	
	jsddm_canceltimer();
	jsddm_close();
	ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
}

function jsddm_close(){	
	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}

function jsddm_timer(){	
	closetimer = window.setTimeout(jsddm_close, timeout);
}

function jsddm_canceltimer(){	
	
	if(closetimer){	
		window.clearTimeout(closetimer);
		closetimer = null;
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

$(document).ready(function(){	
	var flag = false;

	
	$('#jsddm > li').make_dropdown(); 
	ajaxManager = $.manageAjax.create('queue',{queue: true});
	if ($('#fundPerformanceResponse').length == 1)
	{
		$('#content_container').width('950');
		$('#right_col').addClass('hidden');
		var parms='applicationId=BW1';
		doAjax('/servlet/blineFunds.jsp', 'fundPerformance', parms, beforeDefault, successFundPrices, errorDefault, abortDefault); 
	}
	if ($('#fundFactsheetResponse').length == 1)
	{
		var parms='applicationId=BWW';
		doAjax('/servlet/ilFundPrices.jsp', 'fundFactsheet', parms, beforeDefault, successFundPrices, errorDefault, abortDefault); 
	}
	initEnterKeyListener();

});

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


$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
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
  
  setupEventTracking();
  timestampPdfs();
  //checkForAcceptCookies();
  updateFundTrackerURL(); 
  
});



/**************************************
* This is used for the google search box on 
* the top right of the webpage.
*
* @autor Stephen Hayden
* @date 14/Feb/2012 
 */
function performSearch()
{
	var search = $('#searchInput').val();
	if (search != "Search...")
	{
		search = search.replace(/ /g,'+');
		window.location='/search-bline.html?search='+search;
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

$('#searchInput').focus(function() {
	$(this).css("color","#666");
	$(this).css("border-color","#666");
});

$('#searchInput').blur( function() {
	$(this).css("color","#bbb");
	$(this).css("border-color","#d0d0d0");
});

function successFundPrices(divId, response)
{
var htmlString = response;
htmlString = htmlString.replace("Core</h2>","<br /></h2>");
htmlString = htmlString.replace("Explore</h2>","<br /></h2>");
$('#' + divId + 'Response').html(htmlString);
 //unblock();
timestampPdfs();
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
	ga('send','event', 'funds', 'Show Annualised');
}

function showCumulative()
{
	$('.growth').each(function(i) {
	$(this).removeClass('hidden-important');
	});
	$('.annualised').each(function(i) {
	$(this).addClass('hidden-important');
	});
	ga('send','event', 'funds', 'Show Cumulative');
}
function createTheChart(checkFundDiv, chartDiv)
{
 var funds = '';
 var numFunds=0;
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
  $('#'+chartDiv).dialog({modal: true, height:510,width:940});
  // ]]>
 ga('send','event', 'funds', 'Draw Chart',funds);
 ga('send', 'pageview','/funds/draw-chart'+funds+'.html');
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
function showCategories()
{
		if (!fundCategoriesReceived)
		{
			parms='applicationId=BLW';
			doAjax('/servlet/startBlineFundPrices.do', 'FundCategories', parms);
			fundCategoriesReceived = true;
		}
		ga('send','event', 'funds', 'Products and Prices'); 
		ga('send', 'pageview','/funds/products-prices.html');
}
function getFundPrices()
{		
	// 2. Ajax request			
	parms = 'fundGroupId=' + $('#FundCategory').val();
			
	doAjax('/servlet/retrieveBlineFundPrices.do', 'fundPrices', parms);		
	selectFunds();
	ga('send', 'pageview','/funds/Prices-'+parms+'.html');
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

$('#open-integration-video').click(function() {
	$('#video-modal-integration').html('<iframe width="853" height="480" src="http://www.youtube.com/embed/xXVW0N3W5LA" frameborder="0" allowfullscreen></iframe>');
	$('#video-modal-integration').modal({
            minHeight:510,
            minWidth: 870,
            persist:true,
            overlayClose:true
        });
});

$("#open-greatwestprofile-video").click(function(){
	$("#video-modal-integration").html('<iframe width="853" height="480" src="//www.youtube.com/embed/aRRgwIF7O_U" frameborder="0" allowfullscreen></iframe><br/><b>Information correct as of July 2013</b>');
	$("#video-modal-integration").modal({
			minHeight:510,
			minWidth:870,
			persist:true,
			overlayClose:true
        });
});

// When the feedback button is click display the feedback in 
// the modal window
$('.openFeedback').click(function()
{
	$('#feedbackContact-modal').modal({
		minHeight:350,
		minWidth: 450,
		maxWidth: 450,
		maxWidth: 450,
		persist:true,
		overlayClose:false
	});
});


$('#sendFeedbackForm').click(function()
{
	$('#feedbackerror').html('');
	if ($('#feedbackEmail').val().length<7)
	{
		if ($('#feedbackText').val().length<10)
		{
			$('#feedbackerror').html('Please enter a comment and a valid email address please.');
		}
		else
		{
			$('#feedbackerror').html('Please enter a valid email address. Thank you.');
		}
	}
	else if ($('#feedbackText').val().length<10)
	{
			$('#feedbackerror').html('Please enter a comment please.');
	}
	else
	{
	sendFeedbackEmail(''+$('#feedbackText').val(),''+$('#feedbackEmail').val())
	}
});



function sendFeedbackEmail(feedbackSuggestions,feedbackEmail){

	var params = 'form_id=popupFeedbackBline'+
				'&feedbackSuggestions='+feedbackSuggestions+
				'&feedbackEmail='+feedbackEmail;
		$.ajax({
			type: 'POST',
			url: '/servlet/submitPopupFeedbackForm.do',
			async: true,
			data: params,
			beforeSend: beforeFeedback,
			success: sucessFeedback,
			error: errorFeedback,
			timeout: 200000
		});
}

function beforeFeedback(){
$('#feedbackContact-modal').html('<b>Loading...</b>');
}
function sucessFeedback(){
$('#feedbackContact-modal').html('<b>Your comments have been sent, thanks.</b>');
	setTimeout( function(){
		$.modal.close();
	}, 2000);
}
function errorFeedback(){
$('#feedbackContact-modal').html('<b>There is an error contacting the server. Please try again later.</b>');
}

function showModalPortal(divIdToShow)
{
$('#content-modal').html($('#'+divIdToShow).html());
	$('#content-modal').modal({
		minHeight:180,
		minWidth: 450,
		maxWidth: 500,
		maxHeight: 200,
		persist:true,
		overlayClose:false,
		position:top
	});
}


function showModalContent(divIdToShow)
{
$('#content-modal').html($('#'+divIdToShow).html());
	$('#content-modal').modal({
		minHeight:350,
		minWidth: 450,
		maxWidth: 800,
		maxHeight: 800,
		persist:true,
		overlayClose:false,
		position:top
	});
}

function openOnlineServicesWindow(theURL,winName)
{	
    var myWin = window.open(theURL ,winName);
            if (myWin == null || typeof(myWin)=='undefined')
                alert("Turn off your pop-up blocker!\n\nWe try to open the following url:\n"+theURL);
}

function launchOnlineServices()
{
	$.get("/servlet/loggedOn", function(data){
	str = jQuery.trim(data);
		ga('send','pageview', '/B-line/launch-MyBiz.html');
		mkVisitWebPage('/B-line/launch.html');
		if (str == 'Y') 
		{
			openOnlineServicesWindow('/servlet/launchOnlineServices','BlineMyBiz');
		}
		else
		{
			openOnlineServicesWindow('https://www.b-line.ie','BlineMyBiz');
			//openOnlineServicesWindow('https://www.bline.ie/secure/openSecureDoc?imageTypeId=1&documentId=98','BlineMyBiz');
		}
		
				
	});
}

function timestampPdfs()
{
 	var ts=new Date().getTime();
	$('a[href*="openSecureDoc"]').each(function(i) 
	{
		var title = $(this).attr('title');
		
		$(this).attr('onclick',"ga('send','event', 'PDF download', '"+title + "');return true");
		$(this).attr('target','_blank');
		
	});
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);		
		$(this).attr('onclick',"ga('send','event', 'PDF download', '"+link + "');return true");
		$(this).attr('target','_blank');
		
	});
}

function setupEventTracking()
{

$('#contentsUnit ol li a').each(function(i)
{
	$(this).attr('onclick',"ga('send','pageview','"+window.location.pathname+"#"+$(this).text() + "');return true");
});

$('#left_col_link ul li a').each(function(i) 
	{		
		var link = $(this).attr('href').substring(0,$(this).attr('href').lastIndexOf('/')).toLowerCase();
		if ($(this).attr('href').indexOf('openSecureDoc') > -1 )
		{
			$(this).attr('onclick',"ga('send','event', 'LHS Menu', '"+$(this).text() + "');return true");
		}
		else if ($(this).attr('href').indexOf('javascript') == -1 )
		{
			$(this).attr('onclick',"ga('send','event', 'LHS Menu', '"+link + "');return true");
		}
	});
	
$('#navigation ul li a').each(function(i) 
	{		
		var link = $(this).attr('href').substring(0,$(this).attr('href').lastIndexOf('/')).toLowerCase();
		if ($(this).attr('href').indexOf('openSecureDoc') > -1 )
		{
			$(this).attr('onclick',"ga('send','event', 'Nav Menu', '"+$(this).text() + "');return true");
		}
		else if ($(this).attr('href').indexOf('javascript') == -1)
		{
			$(this).attr('onclick',"ga('send','event', 'Nav Menu', '"+link + "');return true");
		}
	
	});
}

function updateFundTrackerURL()
{
	/*$('#navigation ul li a').each(function(i) 
	{		
		var link = $(this).attr('href').substring(0,$(this).attr('href').lastIndexOf('/')).toLowerCase();
		
		if (ie > 8 && $(this).attr('href').indexOf('investment-funds.html') > -1)
		{
			$(this).attr('href','http://www.bline.ie/funds/funds-centre.html');
		}
	
	});*/

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





