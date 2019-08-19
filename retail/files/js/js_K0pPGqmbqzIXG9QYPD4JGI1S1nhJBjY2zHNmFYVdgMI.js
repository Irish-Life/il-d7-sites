Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.oldWindowWidth = 0;
  Drupal.TBMegaMenu.displayedMenuMobile = false;
  Drupal.TBMegaMenu.supportedScreens = [980];
  Drupal.TBMegaMenu.menuResponsive = function () {
    var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
    var navCollapse = $('.tb-megamenu').children('.nav-collapse');
    if (windowWidth < Drupal.TBMegaMenu.supportedScreens[0]) {
      navCollapse.addClass('collapse');
      if (Drupal.TBMegaMenu.displayedMenuMobile) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      } else {
        navCollapse.css({height: 0, overflow: 'hidden'});
      }
    } else {
      // If width of window is greater than 980 (supported screen).
      navCollapse.removeClass('collapse');
      if (navCollapse.height() <= 0) {
        navCollapse.css({height: 'auto', overflow: 'visible'});
      }
    }
  };
  
  Drupal.behaviors.tbMegaMenuAction = {
    attach: function(context) {
      $('.tb-megamenu-button', context).once('menuIstance', function () {
        var This = this;
        $(This).click(function() {
          if(parseInt($(this).parent().children('.nav-collapse').height())) {
            $(this).parent().children('.nav-collapse').css({height: 0, overflow: 'hidden'});
            Drupal.TBMegaMenu.displayedMenuMobile = false;
          }
          else {
            $(this).parent().children('.nav-collapse').css({height: 'auto', overflow: 'visible'});
            Drupal.TBMegaMenu.displayedMenuMobile = true;
          }
        });
      });
      
      
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(!isTouch){
        $(document).ready(function($){
          var mm_duration = 0;
          $('.tb-megamenu').each (function(){
            if ($(this).data('duration')) {
              mm_duration = $(this).data('duration');
            }
          });
          var mm_timeout = mm_duration ? 100 + mm_duration : 500;
          $('.nav > li, li.mega').hover(function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.addClass ('open')}, 100));  
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.addClass ('open')}, 100));
            }
          },
          function(event) {
            var $this = $(this);
            if ($this.hasClass ('mega')) {
              $this.addClass ('animating');
              clearTimeout ($this.data('animatingTimeout'));
              $this.data('animatingTimeout', 
              setTimeout(function(){$this.removeClass ('animating')}, mm_timeout));
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', setTimeout(function(){$this.removeClass ('open')}, 100));
            } else {
              clearTimeout ($this.data('hoverTimeout'));
              $this.data('hoverTimeout', 
              setTimeout(function(){$this.removeClass ('open')}, 100));
            }
          });
        });
      }
      
      $(window).resize(function() {
        var windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
        if(windowWidth != Drupal.TBMegaMenu.oldWindowWidth){
          Drupal.TBMegaMenu.oldWindowWidth = windowWidth;
          Drupal.TBMegaMenu.menuResponsive();
        }
      });
    },
  }
})(jQuery);

;
Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($) {
  Drupal.TBMegaMenu.createTouchMenu = function(items) {
      items.children('a').each( function() {
	var $item = $(this);
        var tbitem = $(this).parent();
        $item.click( function(event){
          if ($item.hasClass('tb-megamenu-clicked')) {
            var $uri = $item.attr('href');
            window.location.href = $uri;
          }
          else {
            event.preventDefault();
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
            }
          }
        }).closest('li').mouseleave( function(){
          $item.removeClass('tb-megamenu-clicked');
          tbitem.removeClass('open');
        });
     });
     /*
     items.children('a').children('span.caret').each( function() {
	var $item = $(this).parent();
        $item.click(function(event){
          tbitem = $item.parent();
          if ($item.hasClass('tb-megamenu-clicked')) {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            if(tbitem.hasClass('open')){	
              tbitem.removeClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
          else {
            Drupal.TBMegaMenu.eventStopPropagation(event);
            $item.addClass('tb-megamenu-clicked');
            if(!tbitem.hasClass('open')){	
              tbitem.addClass('open');
              $item.removeClass('tb-megamenu-clicked');
            }
          }
        });
     });
     */
  }
  
  Drupal.TBMegaMenu.eventStopPropagation = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    else if (window.event) {
      window.event.cancelBubble = true;
    }
  }  
  Drupal.behaviors.tbMegaMenuTouchAction = {
    attach: function(context) {
      var isTouch = 'ontouchstart' in window && !(/hp-tablet/gi).test(navigator.appVersion);
      if(isTouch){
        $('html').addClass('touch');
        Drupal.TBMegaMenu.createTouchMenu($('.tb-megamenu ul.nav li.mega').has('.dropdown-menu'));
      }
    }
  }
})(jQuery);
;
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
/*
 * Copyright (c) 2007-2014, Marketo, Inc. All rights reserved.
 * Marketo marketing automation web activity tracking script
 * Version: prod r470
 */
 (function(a){if(!a.Munchkin){var c=a.document,e=[],k,l={fallback:"142"},g=["147",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],m=function(){if(!k){for(;0<e.length;){var f=e.shift();a.MunchkinTracker[f[0]].apply(a.MunchkinTracker,f[1])}k=!0}},p=function(f){var b=c.createElement("script"),a=c.getElementsByTagName("base")[0]||c.getElementsByTagName("script")[0];b.type="text/javascript";b.async=!0;b.src=f;b.onreadystatechange=function(){"complete"!==this.readyState&&
"loaded"!==this.readyState||m()};b.onload=m;a.parentNode.insertBefore(b,a)},h={ASSOCIATE_LEAD:"ASSOCIATE_LEAD",CLICK_LINK:"CLICK_LINK",VISIT_WEB_PAGE:"visitWebPage",init:function(a){e.push(["init",arguments]);var b=l[a];if(!b&&0<g.length){var b=a,c=0,d;if(0!==b.length)for(d=0;d<b.length;d+=1)c+=b.charCodeAt(d);b=g[c%g.length]}b||(b=l.fallback);p("//munchkin.marketo.net/"+b+"/munchkin.js")}},n=function(a){return h[a]=function(){e.push([a,arguments])}};a.mktoMunchkinFunction=n("munchkinFunction");n("createTrackingCookie");
a.Munchkin=h;a.mktoMunchkin=h.init}})(window);;
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-inlinesvg-svg-svgclippaths-touch-shiv-mq-cssclasses-teststyles-prefixes-ie8compat-load
 */
;window.Modernizr=function(a,b,c){function y(a){j.cssText=a}function z(a,b){return y(m.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n={svg:"http://www.w3.org/2000/svg"},o={},p={},q={},r=[],s=r.slice,t,u=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},v=function(b){var c=a.matchMedia||a.msMatchMedia;if(c)return c(b).matches;var d;return u("@media "+b+" { #"+h+" { position: absolute; } }",function(b){d=(a.getComputedStyle?getComputedStyle(b,null):b.currentStyle)["position"]=="absolute"}),d},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=s.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(s.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(s.call(arguments)))};return e}),o.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:u(["@media (",m.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},o.svg=function(){return!!b.createElementNS&&!!b.createElementNS(n.svg,"svg").createSVGRect},o.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==n.svg},o.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(n.svg,"clipPath")))};for(var D in o)x(o,D)&&(t=D.toLowerCase(),e[t]=o[D](),r.push((e[t]?"":"no-")+t));return e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=m,e.mq=v,e.testStyles=u,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+r.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))},Modernizr.addTest("ie8compat",function(){return!window.addEventListener&&document.documentMode&&document.documentMode===7});
;
(function(){var charSize=8,b64pad="",hexCase=0,Int_64=function(a,b){this.highOrder=a;this.lowOrder=b},str2binb=function(a){var b=[],mask=(1<<charSize)-1,length=a.length*charSize,i;for(i=0;i<length;i+=charSize){b[i>>5]|=(a.charCodeAt(i/charSize)&mask)<<(32-charSize-(i%32))}return b},hex2binb=function(a){var b=[],length=a.length,i,num;for(i=0;i<length;i+=2){num=parseInt(a.substr(i,2),16);if(!isNaN(num)){b[i>>3]|=num<<(24-(4*(i%8)))}else{return"INVALID HEX STRING"}}return b},binb2hex=function(a){var b=(hexCase)?"0123456789ABCDEF":"0123456789abcdef",str="",length=a.length*4,i,srcByte;for(i=0;i<length;i+=1){srcByte=a[i>>2]>>((3-(i%4))*8);str+=b.charAt((srcByte>>4)&0xF)+b.charAt(srcByte&0xF)}return str},binb2b64=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",str="",length=a.length*4,i,j,triplet;for(i=0;i<length;i+=3){triplet=(((a[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((a[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((a[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j+=1){if(i*8+j*6<=a.length*32){str+=b.charAt((triplet>>6*(3-j))&0x3F)}else{str+=b64pad}}}return str},rotl_32=function(x,n){return(x<<n)|(x>>>(32-n))},rotr_32=function(x,n){return(x>>>n)|(x<<(32-n))},rotr_64=function(x,n){if(n<=32){return new Int_64((x.highOrder>>>n)|(x.lowOrder<<(32-n)),(x.lowOrder>>>n)|(x.highOrder<<(32-n)))}else{return new Int_64((x.lowOrder>>>n)|(x.highOrder<<(32-n)),(x.highOrder>>>n)|(x.lowOrder<<(32-n)))}},shr_32=function(x,n){return x>>>n},shr_64=function(x,n){if(n<=32){return new Int_64(x.highOrder>>>n,x.lowOrder>>>n|(x.highOrder<<(32-n)))}else{return new Int_64(0,x.highOrder<<(32-n))}},parity_32=function(x,y,z){return x^y^z},ch_32=function(x,y,z){return(x&y)^(~x&z)},ch_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(~x.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(~x.lowOrder&z.lowOrder))},maj_32=function(x,y,z){return(x&y)^(x&z)^(y&z)},maj_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(x.highOrder&z.highOrder)^(y.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(x.lowOrder&z.lowOrder)^(y.lowOrder&z.lowOrder))},sigma0_32=function(x){return rotr_32(x,2)^rotr_32(x,13)^rotr_32(x,22)},sigma0_64=function(x){var a=rotr_64(x,28),rotr34=rotr_64(x,34),rotr39=rotr_64(x,39);return new Int_64(a.highOrder^rotr34.highOrder^rotr39.highOrder,a.lowOrder^rotr34.lowOrder^rotr39.lowOrder)},sigma1_32=function(x){return rotr_32(x,6)^rotr_32(x,11)^rotr_32(x,25)},sigma1_64=function(x){var a=rotr_64(x,14),rotr18=rotr_64(x,18),rotr41=rotr_64(x,41);return new Int_64(a.highOrder^rotr18.highOrder^rotr41.highOrder,a.lowOrder^rotr18.lowOrder^rotr41.lowOrder)},gamma0_32=function(x){return rotr_32(x,7)^rotr_32(x,18)^shr_32(x,3)},gamma0_64=function(x){var a=rotr_64(x,1),rotr8=rotr_64(x,8),shr7=shr_64(x,7);return new Int_64(a.highOrder^rotr8.highOrder^shr7.highOrder,a.lowOrder^rotr8.lowOrder^shr7.lowOrder)},gamma1_32=function(x){return rotr_32(x,17)^rotr_32(x,19)^shr_32(x,10)},gamma1_64=function(x){var a=rotr_64(x,19),rotr61=rotr_64(x,61),shr6=shr_64(x,6);return new Int_64(a.highOrder^rotr61.highOrder^shr6.highOrder,a.lowOrder^rotr61.lowOrder^shr6.lowOrder)},safeAdd_32_2=function(x,y){var a=(x&0xFFFF)+(y&0xFFFF),msw=(x>>>16)+(y>>>16)+(a>>>16);return((msw&0xFFFF)<<16)|(a&0xFFFF)},safeAdd_32_4=function(a,b,c,d){var e=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16);return((msw&0xFFFF)<<16)|(e&0xFFFF)},safeAdd_32_5=function(a,b,c,d,e){var f=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(f>>>16);return((msw&0xFFFF)<<16)|(f&0xFFFF)},safeAdd_64_2=function(x,y){var a,msw,lowOrder,highOrder;a=(x.lowOrder&0xFFFF)+(y.lowOrder&0xFFFF);msw=(x.lowOrder>>>16)+(y.lowOrder>>>16)+(a>>>16);lowOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);a=(x.highOrder&0xFFFF)+(y.highOrder&0xFFFF)+(msw>>>16);msw=(x.highOrder>>>16)+(y.highOrder>>>16)+(a>>>16);highOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_4=function(a,b,c,d){var e,msw,lowOrder,highOrder;e=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e>>>16);lowOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);e=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e>>>16);highOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_5=function(a,b,c,d,e){var f,msw,lowOrder,highOrder;f=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF)+(e.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e.lowOrder>>>16)+(f>>>16);lowOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);f=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(e.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e.highOrder>>>16)+(f>>>16);highOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);return new Int_64(highOrder,lowOrder)},coreSHA1=function(f,g){var W=[],a,b,c,d,e,T,ch=ch_32,parity=parity_32,maj=maj_32,rotl=rotl_32,safeAdd_2=safeAdd_32_2,i,t,safeAdd_5=safeAdd_32_5,appendedMessageLength,H=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0],K=[0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6];f[g>>5]|=0x80<<(24-(g%32));f[(((g+65)>>9)<<4)+15]=g;appendedMessageLength=f.length;for(i=0;i<appendedMessageLength;i+=16){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];for(t=0;t<80;t+=1){if(t<16){W[t]=f[t+i]}else{W[t]=rotl(W[t-3]^W[t-8]^W[t-14]^W[t-16],1)}if(t<20){T=safeAdd_5(rotl(a,5),ch(b,c,d),e,K[t],W[t])}else if(t<40){T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}else if(t<60){T=safeAdd_5(rotl(a,5),maj(b,c,d),e,K[t],W[t])}else{T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}e=d;d=c;c=rotl(b,30);b=a;a=T}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4])}return H},coreSHA2=function(j,k,l){var a,b,c,d,e,f,g,h,T1,T2,H,numRounds,lengthPosition,i,t,binaryStringInc,binaryStringMult,safeAdd_2,safeAdd_4,safeAdd_5,gamma0,gamma1,sigma0,sigma1,ch,maj,Int,K,W=[],appendedMessageLength;if(l==="SHA-224"||l==="SHA-256"){numRounds=64;lengthPosition=(((k+65)>>9)<<4)+15;binaryStringInc=16;binaryStringMult=1;Int=Number;safeAdd_2=safeAdd_32_2;safeAdd_4=safeAdd_32_4;safeAdd_5=safeAdd_32_5;gamma0=gamma0_32;gamma1=gamma1_32;sigma0=sigma0_32;sigma1=sigma1_32;maj=maj_32;ch=ch_32;K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];if(l==="SHA-224"){H=[0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4]}else{H=[0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19]}}else if(l==="SHA-384"||l==="SHA-512"){numRounds=80;lengthPosition=(((k+128)>>10)<<5)+31;binaryStringInc=32;binaryStringMult=2;Int=Int_64;safeAdd_2=safeAdd_64_2;safeAdd_4=safeAdd_64_4;safeAdd_5=safeAdd_64_5;gamma0=gamma0_64;gamma1=gamma1_64;sigma0=sigma0_64;sigma1=sigma1_64;maj=maj_64;ch=ch_64;K=[new Int(0x428a2f98,0xd728ae22),new Int(0x71374491,0x23ef65cd),new Int(0xb5c0fbcf,0xec4d3b2f),new Int(0xe9b5dba5,0x8189dbbc),new Int(0x3956c25b,0xf348b538),new Int(0x59f111f1,0xb605d019),new Int(0x923f82a4,0xaf194f9b),new Int(0xab1c5ed5,0xda6d8118),new Int(0xd807aa98,0xa3030242),new Int(0x12835b01,0x45706fbe),new Int(0x243185be,0x4ee4b28c),new Int(0x550c7dc3,0xd5ffb4e2),new Int(0x72be5d74,0xf27b896f),new Int(0x80deb1fe,0x3b1696b1),new Int(0x9bdc06a7,0x25c71235),new Int(0xc19bf174,0xcf692694),new Int(0xe49b69c1,0x9ef14ad2),new Int(0xefbe4786,0x384f25e3),new Int(0x0fc19dc6,0x8b8cd5b5),new Int(0x240ca1cc,0x77ac9c65),new Int(0x2de92c6f,0x592b0275),new Int(0x4a7484aa,0x6ea6e483),new Int(0x5cb0a9dc,0xbd41fbd4),new Int(0x76f988da,0x831153b5),new Int(0x983e5152,0xee66dfab),new Int(0xa831c66d,0x2db43210),new Int(0xb00327c8,0x98fb213f),new Int(0xbf597fc7,0xbeef0ee4),new Int(0xc6e00bf3,0x3da88fc2),new Int(0xd5a79147,0x930aa725),new Int(0x06ca6351,0xe003826f),new Int(0x14292967,0x0a0e6e70),new Int(0x27b70a85,0x46d22ffc),new Int(0x2e1b2138,0x5c26c926),new Int(0x4d2c6dfc,0x5ac42aed),new Int(0x53380d13,0x9d95b3df),new Int(0x650a7354,0x8baf63de),new Int(0x766a0abb,0x3c77b2a8),new Int(0x81c2c92e,0x47edaee6),new Int(0x92722c85,0x1482353b),new Int(0xa2bfe8a1,0x4cf10364),new Int(0xa81a664b,0xbc423001),new Int(0xc24b8b70,0xd0f89791),new Int(0xc76c51a3,0x0654be30),new Int(0xd192e819,0xd6ef5218),new Int(0xd6990624,0x5565a910),new Int(0xf40e3585,0x5771202a),new Int(0x106aa070,0x32bbd1b8),new Int(0x19a4c116,0xb8d2d0c8),new Int(0x1e376c08,0x5141ab53),new Int(0x2748774c,0xdf8eeb99),new Int(0x34b0bcb5,0xe19b48a8),new Int(0x391c0cb3,0xc5c95a63),new Int(0x4ed8aa4a,0xe3418acb),new Int(0x5b9cca4f,0x7763e373),new Int(0x682e6ff3,0xd6b2b8a3),new Int(0x748f82ee,0x5defb2fc),new Int(0x78a5636f,0x43172f60),new Int(0x84c87814,0xa1f0ab72),new Int(0x8cc70208,0x1a6439ec),new Int(0x90befffa,0x23631e28),new Int(0xa4506ceb,0xde82bde9),new Int(0xbef9a3f7,0xb2c67915),new Int(0xc67178f2,0xe372532b),new Int(0xca273ece,0xea26619c),new Int(0xd186b8c7,0x21c0c207),new Int(0xeada7dd6,0xcde0eb1e),new Int(0xf57d4f7f,0xee6ed178),new Int(0x06f067aa,0x72176fba),new Int(0x0a637dc5,0xa2c898a6),new Int(0x113f9804,0xbef90dae),new Int(0x1b710b35,0x131c471b),new Int(0x28db77f5,0x23047d84),new Int(0x32caab7b,0x40c72493),new Int(0x3c9ebe0a,0x15c9bebc),new Int(0x431d67c4,0x9c100d4c),new Int(0x4cc5d4be,0xcb3e42b6),new Int(0x597f299c,0xfc657e2a),new Int(0x5fcb6fab,0x3ad6faec),new Int(0x6c44198c,0x4a475817)];if(l==="SHA-384"){H=[new Int(0xcbbb9d5d,0xc1059ed8),new Int(0x0629a292a,0x367cd507),new Int(0x9159015a,0x3070dd17),new Int(0x0152fecd8,0xf70e5939),new Int(0x67332667,0xffc00b31),new Int(0x98eb44a87,0x68581511),new Int(0xdb0c2e0d,0x64f98fa7),new Int(0x047b5481d,0xbefa4fa4)]}else{H=[new Int(0x6a09e667,0xf3bcc908),new Int(0xbb67ae85,0x84caa73b),new Int(0x3c6ef372,0xfe94f82b),new Int(0xa54ff53a,0x5f1d36f1),new Int(0x510e527f,0xade682d1),new Int(0x9b05688c,0x2b3e6c1f),new Int(0x1f83d9ab,0xfb41bd6b),new Int(0x5be0cd19,0x137e2179)]}}j[k>>5]|=0x80<<(24-k%32);j[lengthPosition]=k;appendedMessageLength=j.length;for(i=0;i<appendedMessageLength;i+=binaryStringInc){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];f=H[5];g=H[6];h=H[7];for(t=0;t<numRounds;t+=1){if(t<16){W[t]=new Int(j[t*binaryStringMult+i],j[t*binaryStringMult+i+1])}else{W[t]=safeAdd_4(gamma1(W[t-2]),W[t-7],gamma0(W[t-15]),W[t-16])}T1=safeAdd_5(h,sigma1(e),ch(e,f,g),K[t],W[t]);T2=safeAdd_2(sigma0(a),maj(a,b,c));h=g;g=f;f=e;e=safeAdd_2(d,T1);d=c;c=b;b=a;a=safeAdd_2(T1,T2)}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4]);H[5]=safeAdd_2(f,H[5]);H[6]=safeAdd_2(g,H[6]);H[7]=safeAdd_2(h,H[7])}switch(l){case"SHA-224":return[H[0],H[1],H[2],H[3],H[4],H[5],H[6]];case"SHA-256":return H;case"SHA-384":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder];case"SHA-512":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder,H[6].highOrder,H[6].lowOrder,H[7].highOrder,H[7].lowOrder];default:return[]}},jsSHA=function(a,b){this.sha1=null;this.sha224=null;this.sha256=null;this.sha384=null;this.sha512=null;this.strBinLen=null;this.strToHash=null;if("HEX"===b){if(0!==(a.length%2)){return"TEXT MUST BE IN BYTE INCREMENTS"}this.strBinLen=a.length*4;this.strToHash=hex2binb(a)}else if(("ASCII"===b)||('undefined'===typeof(b))){this.strBinLen=a.length*charSize;this.strToHash=str2binb(a)}else{return"UNKNOWN TEXT INPUT TYPE"}};jsSHA.prototype={getHash:function(a,b){var c=null,message=this.strToHash.slice();switch(b){case"HEX":c=binb2hex;break;case"B64":c=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(a){case"SHA-1":if(null===this.sha1){this.sha1=coreSHA1(message,this.strBinLen)}return c(this.sha1);case"SHA-224":if(null===this.sha224){this.sha224=coreSHA2(message,this.strBinLen,a)}return c(this.sha224);case"SHA-256":if(null===this.sha256){this.sha256=coreSHA2(message,this.strBinLen,a)}return c(this.sha256);case"SHA-384":if(null===this.sha384){this.sha384=coreSHA2(message,this.strBinLen,a)}return c(this.sha384);case"SHA-512":if(null===this.sha512){this.sha512=coreSHA2(message,this.strBinLen,a)}return c(this.sha512);default:return"HASH NOT RECOGNIZED"}},getHMAC:function(a,b,c,d){var e,keyToUse,blockByteSize,blockBitSize,i,retVal,lastArrayIndex,keyBinLen,hashBitSize,keyWithIPad=[],keyWithOPad=[];switch(d){case"HEX":e=binb2hex;break;case"B64":e=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(c){case"SHA-1":blockByteSize=64;hashBitSize=160;break;case"SHA-224":blockByteSize=64;hashBitSize=224;break;case"SHA-256":blockByteSize=64;hashBitSize=256;break;case"SHA-384":blockByteSize=128;hashBitSize=384;break;case"SHA-512":blockByteSize=128;hashBitSize=512;break;default:return"HASH NOT RECOGNIZED"}if("HEX"===b){if(0!==(a.length%2)){return"KEY MUST BE IN BYTE INCREMENTS"}keyToUse=hex2binb(a);keyBinLen=a.length*4}else if("ASCII"===b){keyToUse=str2binb(a);keyBinLen=a.length*charSize}else{return"UNKNOWN KEY INPUT TYPE"}blockBitSize=blockByteSize*8;lastArrayIndex=(blockByteSize/4)-1;if(blockByteSize<(keyBinLen/8)){if("SHA-1"===c){keyToUse=coreSHA1(keyToUse,keyBinLen)}else{keyToUse=coreSHA2(keyToUse,keyBinLen,c)}keyToUse[lastArrayIndex]&=0xFFFFFF00}else if(blockByteSize>(keyBinLen/8)){keyToUse[lastArrayIndex]&=0xFFFFFF00}for(i=0;i<=lastArrayIndex;i+=1){keyWithIPad[i]=keyToUse[i]^0x36363636;keyWithOPad[i]=keyToUse[i]^0x5C5C5C5C}if("SHA-1"===c){retVal=coreSHA1(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen);retVal=coreSHA1(keyWithOPad.concat(retVal),blockBitSize+hashBitSize)}else{retVal=coreSHA2(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen,c);retVal=coreSHA2(keyWithOPad.concat(retVal),blockBitSize+hashBitSize,c)}return(e(retVal))}};window.jsSHA=jsSHA}());
var gaCampaign='';
var gaMedium='';

function testingCall()
{
	return "function called";
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
		$(this).attr('onclick'," ga('send','event', 'PDF download', '"+link + "');return true");	});
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
var key = 'trial1rishLif3';

function getHash(inputStr) {
var hashObj = new jsSHA(inputStr, 'ASCII');
return hashObj.getHash('SHA-1', 'HEX');
}

function mkVisitWebPage(pagename)
{
 	if (isFunction()){
	mktoMunchkinFunction('visitWebPage', {url: pagename});
	updateFreeCover();
	}
}

/**
Record a callback
*/
function mkAssociateLead(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:'Website Callback',
	FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true, 
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,
	PerferredTimeToContact:contacttime, CallbackAreaOfInterest: areaofinterest},hash);
}

function mkAssociateLeadNoCallback(emailAddress,source)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:source,
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	Callbackrequested: false},hash);
}

function isFunction()
{
	return typeof(mktoMunchkinFunction) == "function";
}


/**
Callback requested with a quote.

*/
function mkAssociateLeadWithQuote(firstName, lastName, emailAddress, phoneNumber, type, term, prem,
sumAssured,sex1,sex2,age1,age2,smoker1,smoker2, contacttime)
{
	/*

	type=M/T/W
	term=number of years or zero
	sex1/sex2=M/F	
	parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
	*/	
	var hash = getHash(key+emailAddress);
	
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2, 
			QuoteLifeMortSex1:sex1,QuoteLifeMortSex2:sex2,PerferredTimeToContact:contacttime,
			CallbackAreaOfInterest: 'New Plan',
				LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1: smoker1, QuoteLifeTermSmoker2:smoker2,PerferredTimeToContact:contacttime,
			CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,			
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeTermSex1:sex1,QuoteLifeTermSex2:sex2,QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2:smoker2,PerferredTimeToContact:contacttime,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteLifeWholeSex1:sex1,QuoteLifeWholeSex2:sex2,QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);	
	}
}

function mkAssociateLeadPensionQuote(lastName, firstName, emailAddress, phoneNumber,
QuotePensionAge,QuotePensionCurrentSalary,QuotePensionEmployersContribution,
QuotePensionGapPerAnnum,QuotePensionRetirementAge,QuotePensionSPTransfer,
QuotePensionTargetPensionPerAnnum,QuotePensionYourMonthlyContribution,contacttime)
{

var hash = getHash(key+emailAddress);

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,
		MobilePhone: phoneNumber,
		LastName: lastName, 
		Callbackrequested: true,
		LeadSourceDetail:'Website Quote and Callback',
		quotePensionAge:QuotePensionAge,
		quotePensionCurrentSalary:QuotePensionCurrentSalary,
		quotePensionEmployersContribution:QuotePensionEmployersContribution,
		quotePensionGapPerAnnum:QuotePensionGapPerAnnum,
		quotePensionRetirementAge:QuotePensionRetirementAge,
		quotePensionSPTransfer:QuotePensionSPTransfer,
		quotePensionTargetPensionPerAnnum:QuotePensionTargetPensionPerAnnum,
		quotePensionYourMonthlyContribution:QuotePensionYourMonthlyContribution,
		PerferredTimeToContact:contacttime,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteType:'I'},hash);

}


function mkAssociateLeadIncomeProtection(lastName, firstName, emailAddress, phoneNumber, prem,
age,retAge,occupation,salary,coverAmt,deferredWeeks,inflation,smoker,selfEmployed,contacttime)
{

	var hash = getHash(key+emailAddress);

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,
		MobilePhone: phoneNumber,
		LastName: lastName, 
		Callbackrequested: true,
		LeadSourceDetail:'Website Quote and Callback',
		quoteIncProtAge:age,
		quoteIncProtRetAge:retAge,
		quoteIncProtOcc:occupation,
		quoteIncProtSalary:salary,
		quoteIncProtCover:coverAmt,
		quoteIncProtSmoker:smoker,
		quoteIncProtDefPeriod:deferredWeeks,
		quoteIncProtInflation:inflation,
		quoteIncProtPrem:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		PerferredTimeToContact:contacttime,
		quoteIncProtSelfEmployed:selfEmployed,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteType:'I'},hash);
	
}

/**
Record signup for help on financial products
* 'General Sign up'
* 'Make a will'
* 'Pension guide'
* 'Life insurance guide'
*/
function mkAssociateLeadEarlyStage(emailAddress, guide)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,'Permissions-Email':true,
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	LeadSourceDetail: guide},hash);
	mkVisitWebPage('/download-a-guide-submitted');
	ga('send','pageview','/customer-service/download-a-guide-submitted');
}


/**
Record quote - send email to email address
*/
function mkAssociateLeadPerformQuote(firstName, lastName, emailAddress, phoneNumber, 
type, term, prem,sumAssured,sex1,sex2,age1,age2,smoker1,smoker2,emailPermission)
{	
	var hash = getHash(key+emailAddress);
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeMortSex1:sex1,QuoteLifeMortSex2:sex2,QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1:smoker1,QuoteLifeTermSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeTermSex1:sex1,QuoteLifeTermSex2:sex2,QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteLifeWholeSex1:sex1,QuoteLifeWholeSex2:sex2,QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);
	}
		mkVisitWebPage('/life-assurance-quote-email-to-self');

		ga('send','pageview','/life-assurance/quote-emailed');
		
	
	
}

/**Record a callback*/
function mkAssociateLeadFreeCover(firstName, lastName, emailAddress, channelId, sellerId)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'FreeCoverTaken',
		'Permissions-Email':true,'Permissions-DirectMail':true,'Permissions-Landline':true,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		'Permissions-SMS_MMS':true,
	freeParentCoverPlanTaken:true,
		LastSalesReferrer: sellerId},hash);	
}

/**
Associate a broker lead
*/
function mkAssociateBroker(emailAddress, source)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:source,
	Callbackrequested: false,IsBroker:true  },hash);
}

function mkAssociateLeadKBC(emailAddress,firstName,lastName,phoneNumber,permissionEmail,areaOfInterest,followUpRating,timeToContact,kbcLeadSource,kbcExistingCustomer,kbcStaffId,kbcStaffName)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: true,LeadSource:'KBCReferral',
		'permissionsFollowupEmailKBC':permissionEmail,MobilePhone: phoneNumber,KBCAreaOfInterest: areaOfInterest,PerferredTimeToContact:timeToContact,
		KBCLeadSource: kbcLeadSource,
		LastDirectSalesAgentRating: followUpRating,
		KBCExistingCustomer:kbcExistingCustomer, KBCStaffID: kbcStaffId, KBCStaffName: kbcStaffName},hash);	
}

function mkAssociateLeadAIB(emailAddress,firstName,lastName,phoneNumber,permissionEmail,areaOfInterest,followUpRating,timeToContact,leadSource,existingCustomer,staffId,staffName)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: true,
		LeadSource:'Employee Referral',
		PermissionsFollowupEmail:permissionEmail,
		MobilePhone: phoneNumber,
		CallbackAreaOfInterest: areaOfInterest,
		PerferredTimeToContact:timeToContact,
		LeadSourceDetail:'AIB Internal Referral',
		LastDirectSalesAgentRating: followUpRating
		//KBCExistingCustomer:kbcExistingCustomer, KBCStaffID: kbcStaffId, KBCStaffName: kbcStaffName
		},hash);	
}
//##################################
// 123.ie marketo calls

function mkAssociateLead123(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{
	Email: emailAddress,
	LeadSource:'123',
	FirstName: firstName,
	MobilePhone: phoneNumber,
	LastName: lastName,
	Callbackrequested: true, 
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,	
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	PerferredTimeToContact:contacttime,
	CallbackAreaOfInterest: areaofinterest},hash);
}

// with quote
function mkAssociateLeadPerformQuote123(firstName, lastName, emailAddress, phoneNumber, type, term, prem,
sumAssured,age1,age2,smoker1,smoker2, contacttime,areaofinterest)
{

	var hash = getHash(key+emailAddress);
	
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			CallbackAreaOfInterest: areaofinterest,
			QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1: smoker1, QuoteLifeTermSmoker2:smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			CallbackAreaOfInterest: areaofinterest,
			QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2:smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		CallbackAreaOfInterest: areaofinterest,
		QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);	
	}

}


function getCampaign()
{
	var retValue = '';
	var cookieValue = String(getCookie('__utmz'));
    var n = cookieValue.indexOf('utmccn=');
	var m = cookieValue.indexOf('utmcmd=');

    if (n > -1)
    {
        val2=cookieValue.substr(n);
        val3=val2.split('|');
        for (var i=0; i < val3.length;i++)
        {
            val4=val3[i].split('=');
            if (val4[0] == 'utmccn')
            {
                retValue=val4[1];
				if (retValue != null && retValue.length >1)
				{
					retValue=retValue.replace('(','');
					retValue=retValue.replace(')','');
				}
            }
        }   
	}
	gaCampaign=retValue;
	
	if (m > -1)
    {
        val2=cookieValue.substr(m);
        val3=val2.split('|');
        for (var i=0; i < val3.length;i++)
        {
            val4=val3[i].split('=');
            if (val4[0] == 'utmcmd')
            {
                retValue=val4[1];
				if (retValue != null && retValue.length >1)
				{
					retValue=retValue.replace('(','');
					retValue=retValue.replace(')','');
				}
            }
        }
   
	}
	gaMedium=retValue;
}
function log(message){ 
	try {
		console.log(consoleCounter++ + "\t" + message);
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}

/** Some updates to text on free cover application for,
    This is a hack
*/

function updateFreeCover()
{	
	if (window.location.href.indexOf('eBusinessApps') > -1)
	{
		$(document).ready(function () {
		Munchkin.init('450-GHO-121');	
		getCampaign();	
		timestampPdfs();
		$('.fieldColumnInnerText').each(function(i) 
		{
			if ($(this).html().indexOf('You agree that we may use your ') == 0)
			{
				$(this).html('You agree that we may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about our products and services within the Irish Life Group of companies. If you no longer wish to avail of this service you can opt out by writing to Irish Life at Lower Abbey St, Dublin 1, by clicking the unsubscribe link in any email or by following the unsubscribe instructions that will be in any texts that are sent to you.');
			}
		});
		
		$('.buttonToolTip').each(function(i) 
		{
		if (typeof $(this).attr('content') === "undefined")
		{
		 // do nothing
		}
		else
		{ 
			if ($(this).attr('content').indexOf('You will receive the welcome pack') == 0)
			{
				$(this).attr('content','You will receive the welcome pack and letters by email.');
			}
		}
		});

		$('.subLabel').each(function(i) 
		{
		if ($(this).html().indexOf('For information on how to withdraw') == 0)
		{
			$(this).html('');
		}
		});

		$('a[href$="ILFS.pdf"]').each(function(i) 
		{
			$(this).attr('href','/eBusinessApps/PDF/Terms-of-business-IL.pdf');
			$(this).html('Irish Life Terms of business (209KB)');
		});
		
		$('a[href$="/eBusinessApps/PDF/Plan-booklet.pdf"]').each(function(i) 
		{
			$(this).attr('href','http://www.irishlife.ie/uploadedFiles/free-cover.pdf ');
			$(this).html('Plan booklet, Terms &amp; Conditions)');
		});

		var refer = getCookie('FreeCover');
		
		if (refer == 'VG93')
		{
		
			$('.labelTop').each(function(i) 
			{
				if ($(this).html().indexOf('1st Parent') == 0)
				{
					$(this).html('1st Person');
				}
			});
			$('.ui-button-text2').each(function(i) 
			{			
				if ($(this).html().indexOf('2nd Parent') == 0)
				{
					$(this).html('2nd Person');
				}
				
			});
			$('.text').each(function(i) 
			{			
				if ($(this).html().indexOf('Free Parent') == 0)
				{
					$(this).html('Free Life Cover Application');
				}
				
			});
		
			$('#life1RelationshipWithChild').val('LEG');
			$('#life2RelationshipWithChild').val('LEG');		
			$('#life2RelationshipWithOtherParent').val('MAR');		
			$('#dependentChildrenNo').val(1);
		
			$('.formThreeColumnFullWidth').each(function(i) 
			{
				if ($(this).html().indexOf('Relationship') > -1)
				{
						$(this).addClass('hidden');
				}
				if ($(this).html().indexOf('Children') > -1)
				{
						$(this).addClass('hidden');
				}
			});
		
			$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('In order to provide you with your Free ') == 0)
					{
						$(this).html('In order to provide you with your Free Life Insurance plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and permanent tsb.');
					}
			});
		
			$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('You agree that ') == 0)
					{
						$(this).html('You agree that we may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about our products and services within the Irish Life Group of companies and permanent tsb plc. To opt out at any time please write to both Irish Life and permanent tsb or click on the unsubscribe link in any emails sent by Irish Life and permanent tsb or by following the unsubscribe instructions in any texts sent by Irish Life and permanent tsb.');
					}
			});
				
				
		
		}
		
		if (refer == 'Z402')
		{
			$('.fieldColumnInnerText').each(function(i) 
			{
				if ($(this).html().indexOf('You agree that we may use your ') == 0)
				{
					$(this).html('You agree that we may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about our products and services within the Irish Life Group of companies and GloHealth Financial Services ltd. To opt out at any time please write to both Irish Life and GloHealth or click on the unsubscribe link in any emails sent by Irish Life and GloHealth or by following the unsubscribe instructions in any texts sent by Irish Life and GloHealth.');
				}
			});		
		}
		else if (refer == '4785')
		{		
			if ($(".direct .topLeftLogo").length == 1)
			{	
				$(".direct .topLeftLogo").css("background","url(https://www.irishlife.ie/eBusinessApps/Zip/Default/ChannelImage/logo/mainIrishLifeLogo.gif) no-repeat scroll 0 0 rgba(0, 0, 0, 0)");
				$(".direct .topLeftLogo").css("height","45px");
				$(".direct .topLeftLogo").css("left","30px");
				$(".direct .topLeftLogo").css("top","65px");
				$(".direct .topLeftLogo").css("width","158px");
			}
			$('.fieldColumnInnerText').each(function(i) 
			{
			if ($(this).html().indexOf('You agree that we may use your ') == 0)
			{
				$(this).html('You agree that KBC Bank Ireland Plc may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about their products and services. If you no longer wish to avail of this service you can opt out by writing to Irish Life at Lower Abbey St, Dublin 1, by clicking the unsubscribe link in any email or by following the unsubscribe instructions that will be in any texts that are sent to you.');
			}
			if ($(this).html().indexOf('In order to provide you with your Free Parent Life cover') == 0)
			{
				$(this).html('In order to provide you with your Free Parent Life cover plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and KBC Bank Ireland Plc.');
			}
			
			});		
			
			$('.bottomBoxItems').each(function(i)
			{
				$(this).html('<li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/terms-of-business-IL.pdf">Irish Life Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/KBC-Terms-of-Business.pdf">KBC Bank Ireland Plc Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/free-parent-cover-IL.pdf">Plan booklet, Terms &amp; Conditions</a></li>');
			});

		}
		else if (refer == '4783')
		{
			if (window.location.href.indexOf("eBusinessApps") > -1)
			{
			$(".direct .topLeftLogo").css("background","url(https://www.irishlife.ie/eBusinessApps/Zip/Default/ChannelImage/logo/mainIrishLifeLogo.gif) no-repeat scroll 0 0 rgba(0, 0, 0, 0)");
				$(".direct .topLeftLogo").css("height","45px");
				$(".direct .topLeftLogo").css("left","30px");
				$(".direct .topLeftLogo").css("top","65px");
				$(".direct .topLeftLogo").css("width","158px");
					
				$('.sectionHeading').each(function(i)
				{		
					if ($(this).html().indexOf('Free Parent Life Cover application') > 0)
					{
						$(this).html('<span class="text">Free Parent Life Insurance application</span><img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/123/img/free-life-heading.png" />');
					}
					if ($(this).html().indexOf('Please complete this short') > 0)
					{
						$(this).html('<div class="sectionHeading headingTextSmaller marginBottom0 row"><span class="text">Please complete this short application form to get your free parent life insurance</span></div>');
					}
				});
			
				$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('You agree that we may use your ') == 0)
					{
						$(this).html('You agree that 123.ie may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about their products and services. To opt out at any time please write to 123.ie at 123.ie, MountainView, Central Park, Leopardstown, Dublin 18, or click the unsubscribe link in any email sent by 123.ie, or follow the unsubscribe instructions in any texts sent by 123.ie.');
					}
					if ($(this).html().indexOf('In order to provide you with your Free Parent Life cover') == 0)
					{
						$(this).html('In order to provide you with your Free Parent Life Insurance plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and 123.ie.');
					}
				
				});		
				
				$('.bottomBoxItems').each(function(i)
				{
					$(this).html('<li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/terms-of-business-IL.pdf?121212">Irish Life Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/123.ie-terms-of-business.pdf?121212">123.ie Terms of business</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/free-parent-cover-IL.pdf?121212">Plan booklet, Terms &amp; Conditions</a></li>');
				});
			
				$( "#contactGrid_Div" ).html( '<div id="contactGrid_Div" class="grid"><table id="contactGrid" class="marginBottom30 tableOutput2 tableOutput tableBase"><tbody><tr><td width="100"><span class="textSize2">Name</span></td><td width="360"><span class="bold textSize3">123.ie</span></td></tr><tr><td width="130"><span class="textSize2">Email</span></td><td width="330"><a href="mailto:life@123.ie" class="anchor anchor anchor anchor anchor anchor anchor linkBig2">life@123.ie</a></td></tr></tbody></table><div class="sentence bold textSize4 row"><span class="text" style="text-decoration:underline">Return to <a href="http://www.123.ie">www.123.ie</a></span></div></div>' );
				
				
			}
			
					

			
		}else if (refer == '4786')
		{
			if (window.location.href.indexOf("123") > -1 || window.location.href.indexOf("eBusinessApps") > -1)
			{
				$('.containerBorders').css('background','none');
				$('.containerTop').css('display','none');
				$('.containerCenterer').css('width','auto');
				$('body').css('background-color','#fff');
				$('.contentRightFullWidth').css('padding','0px');
				$('.containerBorders').css('width','760px');
				$('.contentRightFullWidth .contentRightWidth').css('width','760px');
				$('.formThreeColumnFullWidth .fieldColumn').css('width','250px');
				$('.formThreeColumnFullWidth .labelColumn').css('width','200px');
				$('.formThreeColumnFullWidth').css('background','url("https://www.irishlife.ie/eBusinessApps/Zip/BaseImage/background/formThreeColumn.png") repeat-y scroll 0 0 rgba(0, 0, 0, 0)');
				$('.formThreeColumnFullWidth .label').css('width','175px');
				$('.formThreeColumnFullWidth .fieldColumnFirst').css('margin-right','20px');
				$('.footer').css('display','none');
				$('.inputDateDay').css('width','56px');
				$('.serverMessage').css('width','600px');
			
				$('.sectionHeading').each(function(i)
				{		
					if ($(this).html().indexOf('Free Parent Life Cover application') > 0)
					{
						$(this).html('<span class="text">Free Parent Life Insurance application</span><img src="https://www.irishlife.ie/secureWeb/uploadedImages/retail/123/img/free-life-heading.png" />');
					}
				});
			
				$('.fieldColumnInnerText').each(function(i) 
				{
					if ($(this).html().indexOf('You agree that we may use your ') == 0)
					{
						$(this).html('You agree that 123.ie may use your personal data to contact you in writing, by  phone (landline or mobile), email or text with information and marketing material about their products and services. To opt out at any time please write to 123.ie at RSA House, Dundrum Town Centre, Sandyford Road, Dundrum, Dublin 16, or click the unsubscribe link in any email sent by 123.ie, or follow the unsubscribe instructions in any texts sent by 123.ie.');
					}
					if ($(this).html().indexOf('In order to provide you with your Free Parent Life cover') == 0)
					{
						$(this).html('In order to provide you with your Free Parent Life Insurance plan, we need to gather some information about you to generate your free plan. The information will be held for that purpose by Irish Life and 123.ie.');
					}
				
				});
				
				$('.bottomBoxItems').each(function(i)
				{
					$(this).html('<li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/terms-of-business-IL.pdf">Irish Life Terms of business (209KB)</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/123.ie-terms-of-business.pdf?ts=1393507634280">123.ie Terms of business</a></li><li><a target="_blank" href="http://www.irishlife.ie/uploadedFiles/free-parent-cover-IL.pdf">Plan booklet, Terms &amp; Conditions</a></li>');
				});
			
			}
			
		}
		});
	}
};
/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
/*jslint unparam: true, browser: true, indent: 2 */
// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName=null;if(typeof jQuery=="undefined"&&typeof Zepto=="undefined"&&typeof $=="function")libFuncName=$;else if(typeof jQuery=="function")libFuncName=jQuery;else{if(typeof Zepto!="function")throw new TypeError;libFuncName=Zepto}(function(e,t,n,r){"use strict";e("head").append('<meta class="foundation-mq-small">'),e("head").append('<meta class="foundation-mq-medium">'),e("head").append('<meta class="foundation-mq-large">'),t.matchMedia=t.matchMedia||function(e,t){var n,r=e.documentElement,i=r.firstElementChild||r.firstChild,s=e.createElement("body"),o=e.createElement("div");return o.id="mq-test-1",o.style.cssText="position:absolute;top:-100em",s.style.background="none",s.appendChild(o),function(e){return o.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',r.insertBefore(s,i),n=o.offsetWidth===42,r.removeChild(s),{matches:n,media:e}}}(n),Array.prototype.filter||(Array.prototype.filter=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(typeof e!="function")return;var r=[],i=arguments[1];for(var s=0;s<n;s++)if(s in t){var o=t[s];e&&e.call(i,o,s,t)&&r.push(o)}return r}),Function.prototype.bind||(Function.prototype.bind=function(e){if(typeof this!="function")throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var t=Array.prototype.slice.call(arguments,1),n=this,r=function(){},i=function(){return n.apply(this instanceof r&&e?this:e,t.concat(Array.prototype.slice.call(arguments)))};return r.prototype=this.prototype,i.prototype=new r,i}),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){if(this==null)throw new TypeError;var t=Object(this),n=t.length>>>0;if(n===0)return-1;var r=0;arguments.length>1&&(r=Number(arguments[1]),r!=r?r=0:r!=0&&r!=Infinity&&r!=-Infinity&&(r=(r>0||-1)*Math.floor(Math.abs(r))));if(r>=n)return-1;var i=r>=0?r:Math.max(n-Math.abs(r),0);for(;i<n;i++)if(i in t&&t[i]===e)return i;return-1}),e.fn.stop=e.fn.stop||function(){return this},t.Foundation={name:"Foundation",version:"4.3.2",cache:{},media_queries:{small:e(".foundation-mq-small").css("font-family").replace(/\'/g,""),medium:e(".foundation-mq-medium").css("font-family").replace(/\'/g,""),large:e(".foundation-mq-large").css("font-family").replace(/\'/g,"")},stylesheet:e("<style></style>").appendTo("head")[0].sheet,init:function(t,n,r,i,s,o){var u,a=[t,r,i,s],f=[],o=o||!1;o&&(this.nc=o),this.rtl=/rtl/i.test(e("html").attr("dir")),this.scope=t||this.scope;if(n&&typeof n=="string"&&!/reflow/i.test(n)){if(/off/i.test(n))return this.off();u=n.split(" ");if(u.length>0)for(var l=u.length-1;l>=0;l--)f.push(this.init_lib(u[l],a))}else{/reflow/i.test(n)&&(a[1]="reflow");for(var c in this.libs)f.push(this.init_lib(c,a))}return typeof n=="function"&&a.unshift(n),this.response_obj(f,a)},response_obj:function(e,t){for(var n=0,r=t.length;n<r;n++)if(typeof t[n]=="function")return t[n]({errors:e.filter(function(e){if(typeof e=="string")return e})});return e},init_lib:function(e,t){return this.trap(function(){return this.libs.hasOwnProperty(e)?(this.patch(this.libs[e]),this.libs[e].init.apply(this.libs[e],t)):function(){}}.bind(this),e)},trap:function(e,t){if(!this.nc)try{return e()}catch(n){return this.error({name:t,message:"could not be initialized",more:n.name+" "+n.message})}return e()},patch:function(e){this.fix_outer(e),e.scope=this.scope,e.rtl=this.rtl},inherit:function(e,t){var n=t.split(" ");for(var r=n.length-1;r>=0;r--)this.lib_methods.hasOwnProperty(n[r])&&(this.libs[e.name][n[r]]=this.lib_methods[n[r]])},random_str:function(e){var t="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");e||(e=Math.floor(Math.random()*t.length));var n="";for(var r=0;r<e;r++)n+=t[Math.floor(Math.random()*t.length)];return n},libs:{},lib_methods:{set_data:function(e,t){var n=[this.name,+(new Date),Foundation.random_str(5)].join("-");return Foundation.cache[n]=t,e.attr("data-"+this.name+"-id",n),t},get_data:function(e){return Foundation.cache[e.attr("data-"+this.name+"-id")]},remove_data:function(t){t?(delete Foundation.cache[t.attr("data-"+this.name+"-id")],t.attr("data-"+this.name+"-id","")):e("[data-"+this.name+"-id]").each(function(){delete Foundation.cache[e(this).attr("data-"+this.name+"-id")],e(this).attr("data-"+this.name+"-id","")})},throttle:function(e,t){var n=null;return function(){var r=this,i=arguments;clearTimeout(n),n=setTimeout(function(){e.apply(r,i)},t)}},data_options:function(t){function u(e){return!isNaN(e-0)&&e!==null&&e!==""&&e!==!1&&e!==!0}function a(t){return typeof t=="string"?e.trim(t):t}var n={},r,i,s=(t.attr("data-options")||":").split(";"),o=s.length;for(r=o-1;r>=0;r--)i=s[r].split(":"),/true/i.test(i[1])&&(i[1]=!0),/false/i.test(i[1])&&(i[1]=!1),u(i[1])&&(i[1]=parseInt(i[1],10)),i.length===2&&i[0].length>0&&(n[a(i[0])]=a(i[1]));return n},delay:function(e,t){return setTimeout(e,t)},scrollTo:function(n,r,i){if(i<0)return;var s=r-e(t).scrollTop(),o=s/i*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(o,10))||(t.scrollTo(0,e(t).scrollTop()+o),this.scrollTo(n,r,i-10))}.bind(this),10)},scrollLeft:function(e){if(!e.length)return;return"scrollLeft"in e[0]?e[0].scrollLeft:e[0].pageXOffset},empty:function(e){if(e.length&&e.length>0)return!1;if(e.length&&e.length===0)return!0;for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0},addCustomRule:function(e,t){if(t===r)Foundation.stylesheet.insertRule(e,Foundation.stylesheet.cssRules.length);else{var n=Foundation.media_queries[t];n!==r&&Foundation.stylesheet.insertRule("@media "+Foundation.media_queries[t]+"{ "+e+" }")}}},fix_outer:function(e){e.outerHeight=function(e,t){return typeof Zepto=="function"?e.height():typeof t!="undefined"?e.outerHeight(t):e.outerHeight()},e.outerWidth=function(e,t){return typeof Zepto=="function"?e.width():typeof t!="undefined"?e.outerWidth(t):e.outerWidth()}},error:function(e){return e.name+" "+e.message+"; "+e.more},off:function(){return e(this.scope).off(".fndtn"),e(t).off(".fndtn"),!0},zj:e},e.fn.foundation=function(){var e=Array.prototype.slice.call(arguments,0);return this.each(function(){return Foundation.init.apply(Foundation,[this].concat(e)),this})}})(libFuncName,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.alerts={name:"alerts",version:"4.3.2",settings:{animation:"fadeOut",speed:300,callback:function(){}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;e(this.scope).on("click.fndtn.alerts","[data-alert] a.close",function(n){var r=e(this).closest("[data-alert]"),i=e.extend({},t.settings,t.data_options(r));n.preventDefault(),r[i.animation](i.speed,function(){e(this).remove(),i.callback()})}),this.settings.init=!0},off:function(){e(this.scope).off(".fndtn.alerts")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.clearing={name:"clearing",version:"4.3.2",settings:{templates:{viewing:'<a href="#" class="clearing-close">&times;</a><div class="visible-img" style="display: none"><img src="//:0"><p class="clearing-caption"></p><a href="#" class="clearing-main-prev"><span></span></a><a href="#" class="clearing-main-next"><span></span></a></div>'},close_selectors:".clearing-close",init:!1,locked:!1},init:function(t,n,r){var i=this;return Foundation.inherit(this,"set_data get_data remove_data throttle data_options"),typeof n=="object"&&(r=e.extend(!0,this.settings,n)),typeof n!="string"?(e(this.scope).find("ul[data-clearing]").each(function(){var t=e(this),n=n||{},r=t.find("li"),s=i.get_data(t);!s&&r.length>0&&(n.$parent=t.parent(),i.set_data(t,e.extend({},i.settings,n,i.data_options(t))),i.assemble(t.find("li")),i.settings.init||i.events().swipe_events())}),this.settings.init):this[n].call(this,r)},events:function(){var n=this;return e(this.scope).on("click.fndtn.clearing","ul[data-clearing] li",function(t,r,i){var r=r||e(this),i=i||r,s=r.next("li"),o=n.get_data(r.parent()),u=e(t.target);t.preventDefault(),o||n.init(),i.hasClass("visible")&&r[0]===i[0]&&s.length>0&&n.is_open(r)&&(i=s,u=i.find("img")),n.open(u,r,i),n.update_paddles(i)}).on("click.fndtn.clearing",".clearing-main-next",function(e){this.nav(e,"next")}.bind(this)).on("click.fndtn.clearing",".clearing-main-prev",function(e){this.nav(e,"prev")}.bind(this)).on("click.fndtn.clearing",this.settings.close_selectors,function(e){Foundation.libs.clearing.close(e,this)}).on("keydown.fndtn.clearing",function(e){this.keydown(e)}.bind(this)),e(t).on("resize.fndtn.clearing",function(){this.resize()}.bind(this)),this.settings.init=!0,this},swipe_events:function(){var t=this;e(this.scope).on("touchstart.fndtn.clearing",".visible-img",function(t){t.touches||(t=t.originalEvent);var n={start_page_x:t.touches[0].pageX,start_page_y:t.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};e(this).data("swipe-transition",n),t.stopPropagation()}).on("touchmove.fndtn.clearing",".visible-img",function(n){n.touches||(n=n.originalEvent);if(n.touches.length>1||n.scale&&n.scale!==1)return;var r=e(this).data("swipe-transition");typeof r=="undefined"&&(r={}),r.delta_x=n.touches[0].pageX-r.start_page_x,typeof r.is_scrolling=="undefined"&&(r.is_scrolling=!!(r.is_scrolling||Math.abs(r.delta_x)<Math.abs(n.touches[0].pageY-r.start_page_y)));if(!r.is_scrolling&&!r.active){n.preventDefault();var i=r.delta_x<0?"next":"prev";r.active=!0,t.nav(n,i)}}).on("touchend.fndtn.clearing",".visible-img",function(t){e(this).data("swipe-transition",{}),t.stopPropagation()})},assemble:function(t){var n=t.parent();n.after('<div id="foundationClearingHolder"></div>');var r=e("#foundationClearingHolder"),i=this.get_data(n),s=n.detach(),o={grid:'<div class="carousel">'+this.outerHTML(s[0])+"</div>",viewing:i.templates.viewing},u='<div class="clearing-assembled"><div>'+o.viewing+o.grid+"</div></div>";return r.after(u).remove()},open:function(e,t,n){var r=n.closest(".clearing-assembled"),i=r.find("div").first(),s=i.find(".visible-img"),o=s.find("img").not(e);this.locked()||(o.attr("src",this.load(e)).css("visibility","hidden"),this.loaded(o,function(){o.css("visibility","visible"),r.addClass("clearing-blackout"),i.addClass("clearing-container"),s.show(),this.fix_height(n).caption(s.find(".clearing-caption"),e).center(o).shift(t,n,function(){n.siblings().removeClass("visible"),n.addClass("visible")})}.bind(this)))},close:function(t,n){t.preventDefault();var r=function(e){return/blackout/.test(e.selector)?e:e.closest(".clearing-blackout")}(e(n)),i,s;return n===t.target&&r&&(i=r.find("div").first(),s=i.find(".visible-img"),this.settings.prev_index=0,r.find("ul[data-clearing]").attr("style","").closest(".clearing-blackout").removeClass("clearing-blackout"),i.removeClass("clearing-container"),s.hide()),!1},is_open:function(e){return e.parent().prop("style").length>0},keydown:function(t){var n=e(".clearing-blackout").find("ul[data-clearing]");t.which===39&&this.go(n,"next"),t.which===37&&this.go(n,"prev"),t.which===27&&e("a.clearing-close").trigger("click")},nav:function(t,n){var r=e(".clearing-blackout").find("ul[data-clearing]");t.preventDefault(),this.go(r,n)},resize:function(){var t=e(".clearing-blackout .visible-img").find("img");t.length&&this.center(t)},fix_height:function(t){var n=t.parent().children(),r=this;return n.each(function(){var t=e(this),n=t.find("img");t.height()>r.outerHeight(n)&&t.addClass("fix-height")}).closest("ul").width(n.length*100+"%"),this},update_paddles:function(e){var t=e.closest(".carousel").siblings(".visible-img");e.next().length>0?t.find(".clearing-main-next").removeClass("disabled"):t.find(".clearing-main-next").addClass("disabled"),e.prev().length>0?t.find(".clearing-main-prev").removeClass("disabled"):t.find(".clearing-main-prev").addClass("disabled")},center:function(e){return this.rtl?e.css({marginRight:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}):e.css({marginLeft:-(this.outerWidth(e)/2),marginTop:-(this.outerHeight(e)/2)}),this},load:function(e){if(e[0].nodeName==="A")var t=e.attr("href");else var t=e.parent().attr("href");return this.preload(e),t?t:e.attr("src")},preload:function(e){this.img(e.closest("li").next()).img(e.closest("li").prev())},loaded:function(e,t){function n(){t()}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)},img:function(e){if(e.length){var t=new Image,n=e.find("a");n.length?t.src=n.attr("href"):t.src=e.find("img").attr("src")}return this},caption:function(e,t){var n=t.data("caption");return n?e.html(n).show():e.text("").hide(),this},go:function(e,t){var n=e.find(".visible"),r=n[t]();r.length&&r.find("img").trigger("click",[n,r])},shift:function(e,t,n){var r=t.parent(),i=this.settings.prev_index||t.index(),s=this.direction(r,e,t),o=parseInt(r.css("left"),10),u=this.outerWidth(t),a;t.index()!==i&&!/skip/.test(s)?/left/.test(s)?(this.lock(),r.animate({left:o+u},300,this.unlock())):/right/.test(s)&&(this.lock(),r.animate({left:o-u},300,this.unlock())):/skip/.test(s)&&(a=t.index()-this.settings.up_count,this.lock(),a>0?r.animate({left:-(a*u)},300,this.unlock()):r.animate({left:0},300,this.unlock())),n()},direction:function(t,n,r){var i=t.find("li"),s=this.outerWidth(i)+this.outerWidth(i)/4,o=Math.floor(this.outerWidth(e(".clearing-container"))/s)-1,u=i.index(r),a;return this.settings.up_count=o,this.adjacent(this.settings.prev_index,u)?u>o&&u>this.settings.prev_index?a="right":u>o-1&&u<=this.settings.prev_index?a="left":a=!1:a="skip",this.settings.prev_index=u,a},adjacent:function(e,t){for(var n=t+1;n>=t-1;n--)if(n===e)return!0;return!1},lock:function(){this.settings.locked=!0},unlock:function(){this.settings.locked=!1},locked:function(){return this.settings.locked},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".fndtn.clearing"),e(t).off(".fndtn.clearing"),this.remove_data(),this.settings.init=!1},reflow:function(){this.init()}}}(Foundation.zj,this,this.document),function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g,o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a),u===null&&(a.expires=-1);if(typeof a.expires=="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}return u=o.json?JSON.stringify(u):String(u),t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s,h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={},e.removeCookie=function(t,n){return e.cookie(t)!==null?(e.cookie(t,null,n),!0):!1}}(Foundation.zj,document),function(e,t,n,r){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"4.3.2",settings:{activeClass:"open",is_hover:!1,opened:function(){},closed:function(){}},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle scrollLeft data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var r=this;e(this.scope).on("click.fndtn.dropdown","[data-dropdown]",function(t){var n=e.extend({},r.settings,r.data_options(e(this)));t.preventDefault(),n.is_hover||r.toggle(e(this))}).on("mouseenter","[data-dropdown]",function(t){var n=e.extend({},r.settings,r.data_options(e(this)));n.is_hover&&r.toggle(e(this))}).on("mouseleave","[data-dropdown-content]",function(t){var n=e('[data-dropdown="'+e(this).attr("id")+'"]'),i=e.extend({},r.settings,r.data_options(n));i.is_hover&&r.close.call(r,e(this))}).on("opened.fndtn.dropdown","[data-dropdown-content]",this.settings.opened).on("closed.fndtn.dropdown","[data-dropdown-content]",this.settings.closed),e(n).on("click.fndtn.dropdown",function(t){var n=e(t.target).closest("[data-dropdown-content]");if(e(t.target).data("dropdown")||e(t.target).parent().data("dropdown"))return;if(!e(t.target).data("revealId")&&n.length>0&&(e(t.target).is("[data-dropdown-content]")||e.contains(n.first()[0],t.target))){t.stopPropagation();return}r.close.call(r,e("[data-dropdown-content]"))}),e(t).on("resize.fndtn.dropdown",r.throttle(function(){r.resize.call(r)},50)).trigger("resize"),this.settings.init=!0},close:function(t){var n=this;t.each(function(){e(this).hasClass(n.settings.activeClass)&&(e(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(n.settings.activeClass),e(this).trigger("closed"))})},open:function(e,t){this.css(e.addClass(this.settings.activeClass),t),e.trigger("opened")},toggle:function(t){var n=e("#"+t.data("dropdown"));if(n.length===0)return;this.close.call(this,e("[data-dropdown-content]").not(n)),n.hasClass(this.settings.activeClass)?this.close.call(this,n):(this.close.call(this,e("[data-dropdown-content]")),this.open.call(this,n,t))},resize:function(){var t=e("[data-dropdown-content].open"),n=e("[data-dropdown='"+t.attr("id")+"']");t.length&&n.length&&this.css(t,n)},css:function(n,r){var i=n.offsetParent(),s=r.offset();s.top-=i.offset().top,s.left-=i.offset().left;if(this.small())n.css({position:"absolute",width:"95%","max-width":"none",top:s.top+this.outerHeight(r)}),n.css(Foundation.rtl?"right":"left","2.5%");else{if(!Foundation.rtl&&e(t).width()>this.outerWidth(n)+r.offset().left&&!this.data_options(r).align_right){var o=s.left;n.hasClass("right")&&n.removeClass("right")}else{n.hasClass("right")||n.addClass("right");var o=s.left-(this.outerWidth(n)-this.outerWidth(r))}n.attr("style","").css({position:"absolute",top:s.top+this.outerHeight(r),left:o})}return n},small:function(){return e(t).width()<768||e("html").hasClass("lt-ie9")},off:function(){e(this.scope).off(".fndtn.dropdown"),e("html, body").off(".fndtn.dropdown"),e(t).off(".fndtn.dropdown"),e("[data-dropdown-content]").off(".fndtn.dropdown"),this.settings.init=!1},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.forms={name:"forms",version:"4.3.2",cache:{},settings:{disable_class:"no-custom",last_combo:null},init:function(t,n,r){return typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||this.events(),this.assemble(),this.settings.init):this[n].call(this,r)},assemble:function(){var t=this;e('form.custom input[type="radio"],[type="checkbox"]',e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).each(function(e,n){t.set_custom_markup(n)}).change(function(){t.set_custom_markup(this)}),e("form.custom select",e(this.scope)).not('[data-customforms="disabled"]').not("."+this.settings.disable_class).not("[multiple=multiple]").each(this.append_custom_select)},events:function(){var r=this;e(this.scope).on("click.fndtn.forms","form.custom span.custom.checkbox",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_checkbox(e(this))}).on("click.fndtn.forms","form.custom span.custom.radio",function(t){t.preventDefault(),t.stopPropagation(),r.toggle_radio(e(this))}).on("change.fndtn.forms","form.custom select",function(t,n){if(e(this).is('[data-customforms="disabled"]'))return;r.refresh_custom_select(e(this),n)}).on("click.fndtn.forms","form.custom label",function(t){if(e(t.target).is("label")){var n=e("#"+r.escape(e(this).attr("for"))).not('[data-customforms="disabled"]'),i,s;n.length!==0&&(n.attr("type")==="checkbox"?(t.preventDefault(),i=e(this).find("span.custom.checkbox"),i.length===0&&(i=n.add(this).siblings("span.custom.checkbox").first()),r.toggle_checkbox(i)):n.attr("type")==="radio"&&(t.preventDefault(),s=e(this).find("span.custom.radio"),s.length===0&&(s=n.add(this).siblings("span.custom.radio").first()),r.toggle_radio(s)))}}).on("mousedown.fndtn.forms","form.custom div.custom.dropdown",function(){return!1}).on("click.fndtn.forms","form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector",function(t){var n=e(this),s=n.closest("div.custom.dropdown"),o=i(s,"select");s.hasClass("open")||e(r.scope).trigger("click"),t.preventDefault();if(!1===o.is(":disabled"))return s.toggleClass("open"),s.hasClass("open")?e(r.scope).on("click.fndtn.forms.customdropdown",function(){s.removeClass("open"),e(r.scope).off(".fndtn.forms.customdropdown")}):e(r.scope).on(".fndtn.forms.customdropdown"),!1}).on("click.fndtn.forms touchend.fndtn.forms","form.custom div.custom.dropdown li",function(t){var r=e(this),s=r.closest("div.custom.dropdown"),o=i(s,"select"),u=0;t.preventDefault(),t.stopPropagation();if(!e(this).hasClass("disabled")){e("div.dropdown").not(s).removeClass("open");var a=r.closest("ul").find("li.selected");a.removeClass("selected"),r.addClass("selected"),s.removeClass("open").find("a.current").text(r.text()),r.closest("ul").find("li").each(function(e){r[0]===this&&(u=e)}),o[0].selectedIndex=u,o.data("prevalue",a.html());if(typeof n.createEvent!="undefined"){var f=n.createEvent("HTMLEvents");f.initEvent("change",!0,!0),o[0].dispatchEvent(f)}else o[0].fireEvent("onchange")}}),e(t).on("keydown",function(t){var r=n.activeElement,s=Foundation.libs.forms,o=e(".custom.dropdown"),u=i(o,"select"),a=e("input,select,textarea,button");if(o.length>0&&o.hasClass("open")){t.preventDefault(),t.which===9&&(e(a[e(a).index(u)+1]).focus(),o.removeClass("open")),t.which===13&&o.find("li.selected").trigger("click"),t.which===27&&o.removeClass("open");if(t.which>=65&&t.which<=90){var f=s.go_to(o,t.which),l=o.find("li.selected");f&&(l.removeClass("selected"),s.scrollTo(f.addClass("selected"),300))}if(t.which===38){var l=o.find("li.selected"),c=l.prev(":not(.disabled)");c.length>0&&(c.parent()[0].scrollTop=c.parent().scrollTop()-s.outerHeight(c),l.removeClass("selected"),c.addClass("selected"))}else if(t.which===40){var l=o.find("li.selected"),f=l.next(":not(.disabled)");f.length>0&&(f.parent()[0].scrollTop=f.parent().scrollTop()+s.outerHeight(f),l.removeClass("selected"),f.addClass("selected"))}}}),e(t).on("keyup",function(t){var r=n.activeElement,i=e(".custom.dropdown");r===i.find(".current")[0]&&i.find(".selector").focus().click()}),this.settings.init=!0},go_to:function(e,t){var n=e.find("li"),r=n.length;if(r>0)for(var i=0;i<r;i++){var s=n.eq(i).text().charAt(0).toLowerCase();if(s===String.fromCharCode(t).toLowerCase())return n.eq(i)}},scrollTo:function(e,t){if(t<0)return;var n=e.parent(),r=this.outerHeight(e),i=r*e.index()-n.scrollTop(),s=i/t*10;this.scrollToTimerCache=setTimeout(function(){isNaN(parseInt(s,10))||(n[0].scrollTop=n.scrollTop()+s,this.scrollTo(e,t-10))}.bind(this),10)},set_custom_markup:function(t){var n=e(t),r=n.attr("type"),i=n.next("span.custom."+r);n.parent().hasClass("switch")||n.addClass("hidden-field"),i.length===0&&(i=e('<span class="custom '+r+'"></span>').insertAfter(n)),i.toggleClass("checked",n.is(":checked")),i.toggleClass("disabled",n.is(":disabled"))},append_custom_select:function(t,n){var r=Foundation.libs.forms,i=e(n),s=i.next("div.custom.dropdown"),o=s.find("ul"),u=s.find(".current"),a=s.find(".selector"),f=i.find("option"),l=f.filter(":selected"),c=i.attr("class")?i.attr("class").split(" "):[],h=0,p="",d,v=!1;if(s.length===0){var m=i.hasClass("small")?"small":i.hasClass("medium")?"medium":i.hasClass("large")?"large":i.hasClass("expand")?"expand":"";s=e('<div class="'+["custom","dropdown",m].concat(c).filter(function(e,t,n){return e===""?!1:n.indexOf(e)===t}).join(" ")+'"><a href="#" class="selector"></a><ul /></div>'),a=s.find(".selector"),o=s.find("ul"),p=f.map(function(){var t=e(this).attr("class")?e(this).attr("class"):"";return"<li class='"+t+"'>"+e(this).html()+"</li>"}).get().join(""),o.append(p),v=s.prepend('<a href="#" class="current">'+(l.html()||"")+"</a>").find(".current"),i.after(s).addClass("hidden-field")}else p=f.map(function(){return"<li>"+e(this).html()+"</li>"}).get().join(""),o.html("").append(p);r.assign_id(i,s),s.toggleClass("disabled",i.is(":disabled")),d=o.find("li"),r.cache[s.data("id")]=d.length,f.each(function(t){this.selected&&(d.eq(t).addClass("selected"),v&&v.html(e(this).html())),e(this).is(":disabled")&&d.eq(t).addClass("disabled")});if(!s.is(".small, .medium, .large, .expand")){s.addClass("open");var r=Foundation.libs.forms;r.hidden_fix.adjust(o),h=r.outerWidth(d)>h?r.outerWidth(d):h,Foundation.libs.forms.hidden_fix.reset(),s.removeClass("open")}},assign_id:function(e,t){var n=[+(new Date),Foundation.random_str(5)].join("-");e.attr("data-id",n),t.attr("data-id",n)},refresh_custom_select:function(t,n){var r=this,i=0,s=t.next(),o=t.find("option"),u=s.find("ul"),a=s.find("li");if(o.length!==this.cache[s.data("id")]||n){u.html("");var f="";o.each(function(){var t=e(this),n=t.html(),r=this.selected;f+='<li class="'+(r?" selected ":"")+(t.is(":disabled")?" disabled ":"")+'">'+n+"</li>",r&&s.find(".current").html(n)}),u.html(f),s.removeAttr("style"),u.removeAttr("style"),s.find("li").each(function(){s.addClass("open"),r.outerWidth(e(this))>i&&(i=r.outerWidth(e(this))),s.removeClass("open")}),a=s.find("li"),this.cache[s.data("id")]=a.length}},refresh_custom_selection:function(t){var n=e("option:selected",t).text();e("a.current",t.next()).text(n)},toggle_checkbox:function(e){var t=e.prev(),n=t[0];!1===t.is(":disabled")&&(n.checked=n.checked?!1:!0,e.toggleClass("checked"),t.trigger("change"))},toggle_radio:function(e){var t=e.prev(),n=t.closest("form.custom"),r=t[0];!1===t.is(":disabled")&&(n.find('input[type="radio"][name="'+this.escape(t.attr("name"))+'"]').next().not(e).removeClass("checked"),e.hasClass("checked")||e.toggleClass("checked"),r.checked=e.hasClass("checked"),t.trigger("change"))},escape:function(e){return e?e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"):""},hidden_fix:{tmp:[],hidden:null,adjust:function(t){var n=this;n.hidden=t.parents(),n.hidden=n.hidden.add(t).filter(":hidden"),n.hidden.each(function(){var t=e(this);n.tmp.push(t.attr("style")),t.css({visibility:"hidden",display:"block"})})},reset:function(){var t=this;t.hidden.each(function(n){var i=e(this),s=t.tmp[n];s===r?i.removeAttr("style"):i.attr("style",s)}),t.tmp=[],t.hidden=null}},off:function(){e(this.scope).off(".fndtn.forms")},reflow:function(){}};var i=function(t,n){var t=t.prev();while(t.length){if(t.is(n))return t;t=t.prev()}return e()}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";var i=i||!1;Foundation.libs.joyride={name:"joyride",version:"4.3.2",defaults:{expose:!1,modal:!1,tipLocation:"bottom",nubPosition:"auto",scrollSpeed:300,timer:0,startTimerOnClick:!0,startOffset:0,nextButton:!0,tipAnimation:"fade",pauseAfter:[],exposed:[],tipAnimationFadeSpeed:300,cookieMonster:!1,cookieName:"joyride",cookieDomain:!1,cookieExpires:365,tipContainer:"body",postRideCallback:function(){},postStepCallback:function(){},preStepCallback:function(){},preRideCallback:function(){},postExposeCallback:function(){},template:{link:'<a href="#close" class="joyride-close-tip">&times;</a>',timer:'<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',tip:'<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',wrapper:'<div class="joyride-content-wrapper"></div>',button:'<a href="#" class="small button joyride-next-tip"></a>',modal:'<div class="joyride-modal-bg"></div>',expose:'<div class="joyride-expose-wrapper"></div>',exposeCover:'<div class="joyride-expose-cover"></div>'},exposeAddClass:""},settings:{},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"throttle data_options scrollTo scrollLeft delay"),typeof n=="object"?e.extend(!0,this.settings,this.defaults,n):e.extend(!0,this.settings,this.defaults,r),typeof n!="string"?(this.settings.init||this.events(),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("click.joyride",".joyride-next-tip, .joyride-modal-bg",function(e){e.preventDefault(),this.settings.$li.next().length<1?this.end():this.settings.timer>0?(clearTimeout(this.settings.automate),this.hide(),this.show(),this.startTimer()):(this.hide(),this.show())}.bind(this)).on("click.joyride",".joyride-close-tip",function(e){e.preventDefault(),this.end()}.bind(this)),e(t).on("resize.fndtn.joyride",n.throttle(function(){if(e("[data-joyride]").length>0&&n.settings.$next_tip){if(n.settings.exposed.length>0){var t=e(n.settings.exposed);t.each(function(){var t=e(this);n.un_expose(t),n.expose(t)})}n.is_phone()?n.pos_phone():n.pos_default(!1,!0)}},100)),this.settings.init=!0},start:function(){var t=this,n=e(this.scope).find("[data-joyride]"),r=["timer","scrollSpeed","startOffset","tipAnimationFadeSpeed","cookieExpires"],i=r.length;this.settings.init||this.events(),this.settings.$content_el=n,this.settings.$body=e(this.settings.tipContainer),this.settings.body_offset=e(this.settings.tipContainer).position(),this.settings.$tip_content=this.settings.$content_el.find("> li"),this.settings.paused=!1,this.settings.attempts=0,this.settings.tipLocationPatterns={top:["bottom"],bottom:[],left:["right","top","bottom"],right:["left","top","bottom"]},typeof e.cookie!="function"&&(this.settings.cookieMonster=!1);if(!this.settings.cookieMonster||this.settings.cookieMonster&&e.cookie(this.settings.cookieName)===null)this.settings.$tip_content.each(function(n){var s=e(this);e.extend(!0,t.settings,t.data_options(s));for(var o=i-1;o>=0;o--)t.settings[r[o]]=parseInt(t.settings[r[o]],10);t.create({$li:s,index:n})}),!this.settings.startTimerOnClick&&this.settings.timer>0?(this.show("init"),this.startTimer()):this.show("init")},resume:function(){this.set_li(),this.show()},tip_template:function(t){var n,r;return t.tip_class=t.tip_class||"",n=e(this.settings.template.tip).addClass(t.tip_class),r=e.trim(e(t.li).html())+this.button_text(t.button_text)+this.settings.template.link+this.timer_instance(t.index),n.append(e(this.settings.template.wrapper)),n.first().attr("data-index",t.index),e(".joyride-content-wrapper",n).append(r),n[0]},timer_instance:function(t){var n;return t===0&&this.settings.startTimerOnClick&&this.settings.timer>0||this.settings.timer===0?n="":n=this.outerHTML(e(this.settings.template.timer)[0]),n},button_text:function(t){return this.settings.nextButton?(t=e.trim(t)||"Next",t=this.outerHTML(e(this.settings.template.button).append(t)[0])):t="",t},create:function(t){var n=t.$li.attr("data-button")||t.$li.attr("data-text"),r=t.$li.attr("class"),i=e(this.tip_template({tip_class:r,index:t.index,button_text:n,li:t.$li}));e(this.settings.tipContainer).append(i)},show:function(t){var n=null;this.settings.$li===r||e.inArray(this.settings.$li.index(),this.settings.pauseAfter)===-1?(this.settings.paused?this.settings.paused=!1:this.set_li(t),this.settings.attempts=0,this.settings.$li.length&&this.settings.$target.length>0?(t&&(this.settings.preRideCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.show_modal()),this.settings.preStepCallback(this.settings.$li.index(),this.settings.$next_tip),this.settings.modal&&this.settings.expose&&this.expose(),this.settings.tipSettings=e.extend(this.settings,this.data_options(this.settings.$li)),this.settings.timer=parseInt(this.settings.timer,10),this.settings.tipSettings.tipLocationPattern=this.settings.tipLocationPatterns[this.settings.tipSettings.tipLocation],/body/i.test(this.settings.$target.selector)||this.scroll_to(),this.is_phone()?this.pos_phone(!0):this.pos_default(!0),n=this.settings.$next_tip.find(".joyride-timer-indicator"),/pop/i.test(this.settings.tipAnimation)?(n.width(0),this.settings.timer>0?(this.settings.$next_tip.show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings.tipAnimationFadeSpeed)):this.settings.$next_tip.show()):/fade/i.test(this.settings.tipAnimation)&&(n.width(0),this.settings.timer>0?(this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed).show(),this.delay(function(){n.animate({width:n.parent().width()},this.settings.timer,"linear")}.bind(this),this.settings
.tipAnimationFadeSpeed)):this.settings.$next_tip.fadeIn(this.settings.tipAnimationFadeSpeed)),this.settings.$current_tip=this.settings.$next_tip):this.settings.$li&&this.settings.$target.length<1?this.show():this.end()):this.settings.paused=!0},is_phone:function(){return i?i.mq("only screen and (max-width: 767px)")||e(".lt-ie9").length>0:e(t).width()<767},hide:function(){this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.modal||e(".joyride-modal-bg").hide(),this.settings.$current_tip.css("visibility","hidden"),setTimeout(e.proxy(function(){this.hide(),this.css("visibility","visible")},this.settings.$current_tip),0),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip)},set_li:function(e){e?(this.settings.$li=this.settings.$tip_content.eq(this.settings.startOffset),this.set_next_tip(),this.settings.$current_tip=this.settings.$next_tip):(this.settings.$li=this.settings.$li.next(),this.set_next_tip()),this.set_target()},set_next_tip:function(){this.settings.$next_tip=e(".joyride-tip-guide[data-index='"+this.settings.$li.index()+"']"),this.settings.$next_tip.data("closed","")},set_target:function(){var t=this.settings.$li.attr("data-class"),r=this.settings.$li.attr("data-id"),i=function(){return r?e(n.getElementById(r)):t?e("."+t).first():e("body")};this.settings.$target=i()},scroll_to:function(){var n,r;n=e(t).height()/2,r=Math.ceil(this.settings.$target.offset().top-n+this.outerHeight(this.settings.$next_tip)),r>0&&this.scrollTo(e("html, body"),r,this.settings.scrollSpeed)},paused:function(){return e.inArray(this.settings.$li.index()+1,this.settings.pauseAfter)===-1},restart:function(){this.hide(),this.settings.$li=r,this.show("init")},pos_default:function(n,r){var i=Math.ceil(e(t).height()/2),s=this.settings.$next_tip.offset(),o=this.settings.$next_tip.find(".joyride-nub"),u=Math.ceil(this.outerWidth(o)/2),a=Math.ceil(this.outerHeight(o)/2),f=n||!1;f&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),typeof r=="undefined"&&(r=!1);if(!/body/i.test(this.settings.$target.selector)){if(this.bottom()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top+a+this.outerHeight(this.settings.$target),left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"top")}else if(this.top()){var l=this.settings.$target.offset().left;Foundation.rtl&&(l=this.settings.$target.offset().width-this.settings.$next_tip.width()+l),this.settings.$next_tip.css({top:this.settings.$target.offset().top-this.outerHeight(this.settings.$next_tip)-a,left:l}),this.nub_position(o,this.settings.tipSettings.nubPosition,"bottom")}else this.right()?(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.outerWidth(this.settings.$target)+this.settings.$target.offset().left+u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"left")):this.left()&&(this.settings.$next_tip.css({top:this.settings.$target.offset().top,left:this.settings.$target.offset().left-this.outerWidth(this.settings.$next_tip)-u}),this.nub_position(o,this.settings.tipSettings.nubPosition,"right"));!this.visible(this.corners(this.settings.$next_tip))&&this.settings.attempts<this.settings.tipSettings.tipLocationPattern.length&&(o.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),this.settings.tipSettings.tipLocation=this.settings.tipSettings.tipLocationPattern[this.settings.attempts],this.settings.attempts++,this.pos_default())}else this.settings.$li.length&&this.pos_modal(o);f&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_phone:function(t){var n=this.outerHeight(this.settings.$next_tip),r=this.settings.$next_tip.offset(),i=this.outerHeight(this.settings.$target),s=e(".joyride-nub",this.settings.$next_tip),o=Math.ceil(this.outerHeight(s)/2),u=t||!1;s.removeClass("bottom").removeClass("top").removeClass("right").removeClass("left"),u&&(this.settings.$next_tip.css("visibility","hidden"),this.settings.$next_tip.show()),/body/i.test(this.settings.$target.selector)?this.settings.$li.length&&this.pos_modal(s):this.top()?(this.settings.$next_tip.offset({top:this.settings.$target.offset().top-n-o}),s.addClass("bottom")):(this.settings.$next_tip.offset({top:this.settings.$target.offset().top+i+o}),s.addClass("top")),u&&(this.settings.$next_tip.hide(),this.settings.$next_tip.css("visibility","visible"))},pos_modal:function(e){this.center(),e.hide(),this.show_modal()},show_modal:function(){if(!this.settings.$next_tip.data("closed")){var t=e(".joyride-modal-bg");t.length<1&&e("body").append(this.settings.template.modal).show(),/pop/i.test(this.settings.tipAnimation)?t.show():t.fadeIn(this.settings.tipAnimationFadeSpeed)}},expose:function(){var n,r,i,s,o,u="expose-"+Math.floor(Math.random()*1e4);if(arguments.length>0&&arguments[0]instanceof e)i=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;i=this.settings.$target}if(i.length<1)return t.console&&console.error("element not valid",i),!1;n=e(this.settings.template.expose),this.settings.$body.append(n),n.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),r=e(this.settings.template.exposeCover),s={zIndex:i.css("z-index"),position:i.css("position")},o=i.attr("class")==null?"":i.attr("class"),i.css("z-index",parseInt(n.css("z-index"))+1),s.position=="static"&&i.css("position","relative"),i.data("expose-css",s),i.data("orig-class",o),i.attr("class",o+" "+this.settings.exposeAddClass),r.css({top:i.offset().top,left:i.offset().left,width:this.outerWidth(i,!0),height:this.outerHeight(i,!0)}),this.settings.$body.append(r),n.addClass(u),r.addClass(u),i.data("expose",u),this.settings.postExposeCallback(this.settings.$li.index(),this.settings.$next_tip,i),this.add_exposed(i)},un_expose:function(){var n,r,i,s,o,u=!1;if(arguments.length>0&&arguments[0]instanceof e)r=arguments[0];else{if(!this.settings.$target||!!/body/i.test(this.settings.$target.selector))return!1;r=this.settings.$target}if(r.length<1)return t.console&&console.error("element not valid",r),!1;n=r.data("expose"),i=e("."+n),arguments.length>1&&(u=arguments[1]),u===!0?e(".joyride-expose-wrapper,.joyride-expose-cover").remove():i.remove(),s=r.data("expose-css"),s.zIndex=="auto"?r.css("z-index",""):r.css("z-index",s.zIndex),s.position!=r.css("position")&&(s.position=="static"?r.css("position",""):r.css("position",s.position)),o=r.data("orig-class"),r.attr("class",o),r.removeData("orig-classes"),r.removeData("expose"),r.removeData("expose-z-index"),this.remove_exposed(r)},add_exposed:function(t){this.settings.exposed=this.settings.exposed||[],t instanceof e||typeof t=="object"?this.settings.exposed.push(t[0]):typeof t=="string"&&this.settings.exposed.push(t)},remove_exposed:function(t){var n,r;t instanceof e?n=t[0]:typeof t=="string"&&(n=t),this.settings.exposed=this.settings.exposed||[],r=this.settings.exposed.length;for(var i=0;i<r;i++)if(this.settings.exposed[i]==n){this.settings.exposed.splice(i,1);return}},center:function(){var n=e(t);return this.settings.$next_tip.css({top:(n.height()-this.outerHeight(this.settings.$next_tip))/2+n.scrollTop(),left:(n.width()-this.outerWidth(this.settings.$next_tip))/2+this.scrollLeft(n)}),!0},bottom:function(){return/bottom/i.test(this.settings.tipSettings.tipLocation)},top:function(){return/top/i.test(this.settings.tipSettings.tipLocation)},right:function(){return/right/i.test(this.settings.tipSettings.tipLocation)},left:function(){return/left/i.test(this.settings.tipSettings.tipLocation)},corners:function(n){var r=e(t),i=r.height()/2,s=Math.ceil(this.settings.$target.offset().top-i+this.settings.$next_tip.outerHeight()),o=r.width()+this.scrollLeft(r),u=r.height()+s,a=r.height()+r.scrollTop(),f=r.scrollTop();return s<f&&(s<0?f=0:f=s),u>a&&(a=u),[n.offset().top<f,o<n.offset().left+n.outerWidth(),a<n.offset().top+n.outerHeight(),this.scrollLeft(r)>n.offset().left]},visible:function(e){var t=e.length;while(t--)if(e[t])return!1;return!0},nub_position:function(e,t,n){t==="auto"?e.addClass(n):e.addClass(t)},startTimer:function(){this.settings.$li.length?this.settings.automate=setTimeout(function(){this.hide(),this.show(),this.startTimer()}.bind(this),this.settings.timer):clearTimeout(this.settings.automate)},end:function(){this.settings.cookieMonster&&e.cookie(this.settings.cookieName,"ridden",{expires:this.settings.cookieExpires,domain:this.settings.cookieDomain}),this.settings.timer>0&&clearTimeout(this.settings.automate),this.settings.modal&&this.settings.expose&&this.un_expose(),this.settings.$next_tip.data("closed",!0),e(".joyride-modal-bg").hide(),this.settings.$current_tip.hide(),this.settings.postStepCallback(this.settings.$li.index(),this.settings.$current_tip),this.settings.postRideCallback(this.settings.$li.index(),this.settings.$current_tip),e(".joyride-tip-guide").remove()},outerHTML:function(e){return e.outerHTML||(new XMLSerializer).serializeToString(e)},off:function(){e(this.scope).off(".joyride"),e(t).off(".joyride"),e(".joyride-close-tip, .joyride-next-tip, .joyride-modal-bg").off(".joyride"),e(".joyride-tip-guide, .joyride-modal-bg").remove(),clearTimeout(this.settings.automate),this.settings={}},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.magellan={name:"magellan",version:"4.3.2",settings:{activeClass:"active",threshold:0},init:function(t,n,r){return this.scope=t||this.scope,Foundation.inherit(this,"data_options"),typeof n=="object"&&e.extend(!0,this.settings,n),typeof n!="string"?(this.settings.init||(this.fixed_magellan=e("[data-magellan-expedition]"),this.set_threshold(),this.last_destination=e("[data-magellan-destination]").last(),this.events()),this.settings.init):this[n].call(this,r)},events:function(){var n=this;e(this.scope).on("arrival.fndtn.magellan","[data-magellan-arrival]",function(t){var r=e(this),i=r.closest("[data-magellan-expedition]"),s=i.attr("data-magellan-active-class")||n.settings.activeClass;r.closest("[data-magellan-expedition]").find("[data-magellan-arrival]").not(r).removeClass(s),r.addClass(s)}),this.fixed_magellan.on("update-position.fndtn.magellan",function(){var t=e(this)}).trigger("update-position"),e(t).on("resize.fndtn.magellan",function(){this.fixed_magellan.trigger("update-position")}.bind(this)).on("scroll.fndtn.magellan",function(){var r=e(t).scrollTop();n.fixed_magellan.each(function(){var t=e(this);typeof t.data("magellan-top-offset")=="undefined"&&t.data("magellan-top-offset",t.offset().top),typeof t.data("magellan-fixed-position")=="undefined"&&t.data("magellan-fixed-position",!1);var i=r+n.settings.threshold>t.data("magellan-top-offset"),s=t.attr("data-magellan-top-offset");t.data("magellan-fixed-position")!=i&&(t.data("magellan-fixed-position",i),i?(t.addClass("fixed"),t.css({position:"fixed",top:0})):(t.removeClass("fixed"),t.css({position:"",top:""})),i&&typeof s!="undefined"&&s!=0&&t.css({position:"fixed",top:s+"px"}))})}),this.last_destination.length>0&&e(t).on("scroll.fndtn.magellan",function(r){var i=e(t).scrollTop(),s=i+e(t).height(),o=Math.ceil(n.last_destination.offset().top);e("[data-magellan-destination]").each(function(){var t=e(this),r=t.attr("data-magellan-destination"),u=t.offset().top-i;u<=n.settings.threshold&&e("[data-magellan-arrival='"+r+"']").trigger("arrival"),s>=e(n.scope).height()&&o>i&&o<s&&e("[data-magellan-arrival]").last().trigger("arrival")})}),this.settings.init=!0},set_threshold:function(){typeof this.settings.threshold!="number"&&(this.settings.threshold=this.fixed_magellan.length>0?this.outerHeight(this.fixed_magellan,!0):0)},off:function(){e(this.scope).off(".fndtn.magellan"),e(t).off(".fndtn.magellan")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";var i=function(){},s=function(i,s){if(i.hasClass(s.slides_container_class))return this;var f=this,l,c=i,h,p,d,v=0,m,g,y=!1,b=!1;c.children().first().addClass(s.active_slide_class),f.update_slide_number=function(t){s.slide_number&&(h.find("span:first").text(parseInt(t)+1),h.find("span:last").text(c.children().length)),s.bullets&&(p.children().removeClass(s.bullets_active_class),e(p.children().get(t)).addClass(s.bullets_active_class))},f.update_active_link=function(t){var n=e('a[data-orbit-link="'+c.children().eq(t).attr("data-orbit-slide")+'"]');n.parents("ul").find("[data-orbit-link]").removeClass(s.bullets_active_class),n.addClass(s.bullets_active_class)},f.build_markup=function(){c.wrap('<div class="'+s.container_class+'"></div>'),l=c.parent(),c.addClass(s.slides_container_class),s.navigation_arrows&&(l.append(e('<a href="#"><span></span></a>').addClass(s.prev_class)),l.append(e('<a href="#"><span></span></a>').addClass(s.next_class))),s.timer&&(d=e("<div>").addClass(s.timer_container_class),d.append("<span>"),d.append(e("<div>").addClass(s.timer_progress_class)),d.addClass(s.timer_paused_class),l.append(d)),s.slide_number&&(h=e("<div>").addClass(s.slide_number_class),h.append("<span></span> "+s.slide_number_text+" <span></span>"),l.append(h)),s.bullets&&(p=e("<ol>").addClass(s.bullets_container_class),l.append(p),c.children().each(function(t,n){var r=e("<li>").attr("data-orbit-slide",t);p.append(r)})),s.stack_on_small&&l.addClass(s.stack_on_small_class),f.update_slide_number(0),f.update_active_link(0)},f._goto=function(t,n){if(t===v)return!1;typeof g=="object"&&g.restart();var r=c.children(),i="next";y=!0,t<v&&(i="prev"),t>=r.length?t=0:t<0&&(t=r.length-1);var o=e(r.get(v)),u=e(r.get(t));o.css("zIndex",2),o.removeClass(s.active_slide_class),u.css("zIndex",4).addClass(s.active_slide_class),c.trigger("orbit:before-slide-change"),s.before_slide_change(),f.update_active_link(t);var a=function(){var e=function(){v=t,y=!1,n===!0&&(g=f.create_timer(),g.start()),f.update_slide_number(v),c.trigger("orbit:after-slide-change",[{slide_number:v,total_slides:r.length}]),s.after_slide_change(v,r.length)};c.height()!=u.height()&&s.variable_height?c.animate({height:u.height()},250,"linear",e):e()};if(r.length===1)return a(),!1;var l=function(){i==="next"&&m.next(o,u,a),i==="prev"&&m.prev(o,u,a)};u.height()>c.height()&&s.variable_height?c.animate({height:u.height()},250,"linear",l):l()},f.next=function(e){e.stopImmediatePropagation(),e.preventDefault(),f._goto(v+1)},f.prev=function(e){e.stopImmediatePropagation(),e.preventDefault(),f._goto(v-1)},f.link_custom=function(t){t.preventDefault();var n=e(this).attr("data-orbit-link");if(typeof n=="string"&&(n=e.trim(n))!=""){var r=l.find("[data-orbit-slide="+n+"]");r.index()!=-1&&f._goto(r.index())}},f.link_bullet=function(t){var n=e(this).attr("data-orbit-slide");typeof n=="string"&&(n=e.trim(n))!=""&&f._goto(parseInt(n))},f.timer_callback=function(){f._goto(v+1,!0)},f.compute_dimensions=function(){var t=e(c.children().get(v)),n=t.height();s.variable_height||c.children().each(function(){e(this).height()>n&&(n=e(this).height())}),c.height(n)},f.create_timer=function(){var e=new o(l.find("."+s.timer_container_class),s,f.timer_callback);return e},f.stop_timer=function(){typeof g=="object"&&g.stop()},f.toggle_timer=function(){var e=l.find("."+s.timer_container_class);e.hasClass(s.timer_paused_class)?(typeof g=="undefined"&&(g=f.create_timer()),g.start()):typeof g=="object"&&g.stop()},f.init=function(){f.build_markup(),s.timer&&(g=f.create_timer(),g.start()),m=new a(s,c),s.animation==="slide"&&(m=new u(s,c)),l.on("click","."+s.next_class,f.next),l.on("click","."+s.prev_class,f.prev),l.on("click","[data-orbit-slide]",f.link_bullet),l.on("click",f.toggle_timer),s.swipe&&l.on("touchstart.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);var t={start_page_x:e.touches[0].pageX,start_page_y:e.touches[0].pageY,start_time:(new Date).getTime(),delta_x:0,is_scrolling:r};l.data("swipe-transition",t),e.stopPropagation()}).on("touchmove.fndtn.orbit",function(e){e.touches||(e=e.originalEvent);if(e.touches.length>1||e.scale&&e.scale!==1)return;var t=l.data("swipe-transition");typeof t=="undefined"&&(t={}),t.delta_x=e.touches[0].pageX-t.start_page_x,typeof t.is_scrolling=="undefined"&&(t.is_scrolling=!!(t.is_scrolling||Math.abs(t.delta_x)<Math.abs(e.touches[0].pageY-t.start_page_y)));if(!t.is_scrolling&&!t.active){e.preventDefault();var n=t.delta_x<0?v+1:v-1;t.active=!0,f._goto(n)}}).on("touchend.fndtn.orbit",function(e){l.data("swipe-transition",{}),e.stopPropagation()}),l.on("mouseenter.fndtn.orbit",function(e){s.timer&&s.pause_on_hover&&f.stop_timer()}).on("mouseleave.fndtn.orbit",function(e){s.timer&&s.resume_on_mouseout&&g.start()}),e(n).on("click","[data-orbit-link]",f.link_custom),e(t).on("resize",f.compute_dimensions),e(t).on("load",f.compute_dimensions),e(t).on("load",function(){l.prev(".preloader").css("display","none")}),c.trigger("orbit:ready")},f.init()},o=function(e,t,n){var r=this,i=t.timer_speed,s=e.find("."+t.timer_progress_class),o,u,a=-1;this.update_progress=function(e){var t=s.clone();t.attr("style",""),t.css("width",e+"%"),s.replaceWith(t),s=t},this.restart=function(){clearTimeout(u),e.addClass(t.timer_paused_class),a=-1,r.update_progress(0)},this.start=function(){if(!e.hasClass(t.timer_paused_class))return!0;a=a===-1?i:a,e.removeClass(t.timer_paused_class),o=(new Date).getTime(),s.animate({width:"100%"},a,"linear"),u=setTimeout(function(){r.restart(),n()},a),e.trigger("orbit:timer-started")},this.stop=function(){if(e.hasClass(t.timer_paused_class))return!0;clearTimeout(u),e.addClass(t.timer_paused_class);var n=(new Date).getTime();a-=n-o;var s=100-a/i*100;r.update_progress(s),e.trigger("orbit:timer-stopped")}},u=function(t,n){var r=t.animation_speed,i=e("html[dir=rtl]").length===1,s=i?"marginRight":"marginLeft",o={};o[s]="0%",this.next=function(e,t,n){t.animate(o,r,"linear",function(){e.css(s,"100%"),n()})},this.prev=function(e,t,n){t.css(s,"-100%"),t.animate(o,r,"linear",function(){e.css(s,"100%"),n()})}},a=function(t,n){var r=t.animation_speed,i=e("html[dir=rtl]").length===1,s=i?"marginRight":"marginLeft";this.next=function(e,t,n){t.css({margin:"0%",opacity:"0.01"}),t.animate({opacity:"1"},r,"linear",function(){e.css("margin","100%"),n()})},this.prev=function(e,t,n){t.css({margin:"0%",opacity:"0.01"}),t.animate({opacity:"1"},r,"linear",function(){e.css("margin","100%"),n()})}};Foundation.libs=Foundation.libs||{},Foundation.libs.orbit={name:"orbit",version:"4.3.2",settings:{animation:"slide",timer_speed:1e4,pause_on_hover:!0,resume_on_mouseout:!1,animation_speed:500,stack_on_small:!1,navigation_arrows:!0,slide_number:!0,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:!0,timer:!0,variable_height:!1,swipe:!0,before_slide_change:i,after_slide_change:i},init:function(t,n,r){var i=this;Foundation.inherit(i,"data_options"),typeof n=="object"&&e.extend(!0,i.settings,n);if(e(t).is("[data-orbit]")){var o=e(t),u=i.data_options(o);new s(o,e.extend({},i.settings,u))}e("[data-orbit]",t).each(function(t,n){var r=e(n),o=i.data_options(r);new s(r,e.extend({},i.settings,o))})}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.reveal={name:"reveal",version:"4.3.2",locked:!1,settings:{animation:"fadeAndPop",animationSpeed:250,closeOnBackgroundClick:!0,closeOnEsc:!0,dismissModalClass:"close-reveal-modal",bgClass:"reveal-modal-bg",open:function(){},opened:function(){},close:function(){},closed:function(){},bg:e(".reveal-modal-bg"),css:{open:{opacity:0,visibility:"visible",display:"block"},close:{opacity:1,visibility:"hidden",display:"none"}}},init:function(t,n,r){return Foundation.inherit(this,"data_options delay"),typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r),typeof n!="string"?(this.events(),this.settings.init):this[n].call(this,r)},events:function(){var t=this;return e(this.scope).off(".fndtn.reveal").on("click.fndtn.reveal","[data-reveal-id]",function(n){n.preventDefault();if(!t.locked){var r=e(this),i=r.data("reveal-ajax");t.locked=!0;if(typeof i=="undefined")t.open.call(t,r);else{var s=i===!0?r.attr("href"):i;t.open.call(t,r,{url:s})}}}).on("click.fndtn.reveal touchend",this.close_targets(),function(n){n.preventDefault();if(!t.locked){var r=e.extend({},t.settings,t.data_options(e(".reveal-modal.open"))),i=e(n.target)[0]===e("."+r.bgClass)[0];if(i&&!r.closeOnBackgroundClick)return;t.locked=!0,t.close.call(t,i?e(".reveal-modal.open"):e(this).closest(".reveal-modal"))}}),e(this.scope).hasClass("reveal-modal")?e(this.scope).on("open.fndtn.reveal",this.settings.open).on("opened.fndtn.reveal",this.settings.opened).on("opened.fndtn.reveal",this.open_video).on("close.fndtn.reveal",this.settings.close).on("closed.fndtn.reveal",this.settings.closed).on("closed.fndtn.reveal",this.close_video):e(this.scope).on("open.fndtn.reveal",".reveal-modal",this.settings.open).on("opened.fndtn.reveal",".reveal-modal",this.settings.opened).on("opened.fndtn.reveal",".reveal-modal",this.open_video).on("close.fndtn.reveal",".reveal-modal",this.settings.close).on("closed.fndtn.reveal",".reveal-modal",this.settings.closed).on("closed.fndtn.reveal",".reveal-modal",this.close_video),e("body").bind("keyup.reveal",function(n){var r=e(".reveal-modal.open"),i=e.extend({},t.settings,t.data_options(r));n.which===27&&i.closeOnEsc&&r.foundation("reveal","close")}),!0},open:function(t,n){if(t)if(typeof t.selector!="undefined")var r=e("#"+t.data("reveal-id"));else{var r=e(this.scope);n=t}else var r=e(this.scope);if(!r.hasClass("open")){var i=e(".reveal-modal.open");typeof r.data("css-top")=="undefined"&&r.data("css-top",parseInt(r.css("top"),10)).data("offset",this.cache_offset(r)),r.trigger("open"),i.length<1&&this.toggle_bg();if(typeof n=="undefined"||!n.url)this.hide(i,this.settings.css.close),this.show(r,this.settings.css.open);else{var s=this,o=typeof n.success!="undefined"?n.success:null;e.extend(n,{success:function(t,n,u){e.isFunction(o)&&o(t,n,u),r.html(t),e(r).foundation("section","reflow"),s.hide(i,s.settings.css.close),s.show(r,s.settings.css.open)}}),e.ajax(n)}}},close:function(t){var t=t&&t.length?t:e(this.scope),n=e(".reveal-modal.open");n.length>0&&(this.locked=!0,t.trigger("close"),this.toggle_bg(),this.hide(n,this.settings.css.close))},close_targets:function(){var e="."+this.settings.dismissModalClass;return this.settings.closeOnBackgroundClick?e+", ."+this.settings.bgClass:e},toggle_bg:function(){e("."+this.settings.bgClass).length===0&&(this.settings.bg=e("<div />",{"class":this.settings.bgClass}).appendTo("body")),this.settings.bg.filter(":visible").length>0?this.hide(this.settings.bg):this.show(this.settings.bg)},show:function(n,r){if(r){if(n.parent("body").length===0){var i=n.wrap('<div style="display: none;" />').parent();n.on("closed.fndtn.reveal.wrapped",function(){n.detach().appendTo(i),n.unwrap().unbind("closed.fndtn.reveal.wrapped")}),n.detach().appendTo("body")}if(/pop/i.test(this.settings.animation)){r.top=e(t).scrollTop()-n.data("offset")+"px";var s={top:e(t).scrollTop()+n.data("css-top")+"px",opacity:1};return this.delay(function(){return n.css(r).animate(s,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var s={opacity:1};return this.delay(function(){return n.css(r).animate(s,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.trigger("opened")}.bind(this)).addClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.css(r).show().css({opacity:1}).addClass("open").trigger("opened")}return/fade/i.test(this.settings.animation)?n.fadeIn(this.settings.animationSpeed/2):n.show()},hide:function(n,r){if(r){if(/pop/i.test(this.settings.animation)){var i={top:-e(t).scrollTop()-n.data("offset")+"px",opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}if(/fade/i.test(this.settings.animation)){var i={opacity:0};return this.delay(function(){return n.animate(i,this.settings.animationSpeed,"linear",function(){this.locked=!1,n.css(r).trigger("closed")}.bind(this)).removeClass("open")}.bind(this),this.settings.animationSpeed/2)}return n.hide().css(r).removeClass("open").trigger("closed")}return/fade/i.test(this.settings.animation)?n.fadeOut(this.settings.animationSpeed/2):n.hide()},close_video:function(t){var n=e(this).find(".flex-video"),r=n.find("iframe");r.length>0&&(r.attr("data-src",r[0].src),r.attr("src","about:blank"),n.hide())},open_video:function(t){var n=e(this).find(".flex-video"),i=n.find("iframe");if(i.length>0){var s=i.attr("data-src");if(typeof s=="string")i[0].src=i.attr("data-src");else{var o=i[0].src;i[0].src=r,i[0].src=o}n.show()}},cache_offset:function(e){var t=e.show().height()+parseInt(e.css("top"),10);return e.hide(),t},off:function(){e(this.scope).off(".fndtn.reveal")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n){"use strict";Foundation.libs.section={name:"section",version:"4.3.2",settings:{deep_linking:!1,small_breakpoint:768,one_up:!0,multi_expand:!1,section_selector:"[data-section]",region_selector:"section, .section, [data-section-region]",title_selector:".title, [data-section-title]",resized_data_attr:"data-section-resized",small_style_data_attr:"data-section-small-style",content_selector:".content, [data-section-content]",nav_selector:'[data-section="vertical-nav"], [data-section="horizontal-nav"]',active_class:"active",callback:function(){}},init:function(t,n,r){var i=this;return Foundation.inherit(this,"throttle data_options position_right offset_right"),typeof n=="object"&&e.extend(!0,i.settings,n),typeof n!="string"?(this.events(),!0):this[n].call(this,r)},events:function(){var r=this,i=[],s=r.settings.section_selector,o=r.settings.region_selector.split(","),u=r.settings.title_selector.split(",");for(var a=0,f=o.length;a<f;a++){var l=o[a];for(var c=0,h=u.length;c<h;c++){var p=s+">"+l+">"+u[c];i.push(p+" a"),i.push(p)}}e(r.scope).on("click.fndtn.section",i.join(","),function(t){var n=e(this).closest(r.settings.title_selector);r.close_navs(n),n.siblings(r.settings.content_selector).length>0&&r.toggle_active.call(n[0],t)}),e(t).on("resize.fndtn.section",r.throttle(function(){r.resize()},30)).on("hashchange.fndtn.section",r.set_active_from_hash),e(n).on("click.fndtn.section",function(t){if(t.isPropagationStopped&&t.isPropagationStopped())return;if(t.target===n)return;r.close_navs(e(t.target).closest(r.settings.title_selector))}),e(t).triggerHandler("resize.fndtn.section"),e(t).triggerHandler("hashchange.fndtn.section")},close_navs:function(t){var n=Foundation.libs.section,r=e(n.settings.nav_selector).filter(function(){return!e.extend({},n.settings,n.data_options(e(this))).one_up});if(t.length>0){var i=t.parent().parent();if(n.is_horizontal_nav(i)||n.is_vertical_nav(i))r=r.filter(function(){return this!==i[0]})}r.children(n.settings.region_selector).removeClass(n.settings.active_class)},toggle_active:function(t){var n=e(this),r=Foundation.libs.section,i=n.parent(),s=n.siblings(r.settings.content_selector),o=i.parent(),u=e.extend({},r.settings,r.data_options(o)),a=o.children(r.settings.region_selector).filter("."+r.settings.active_class);!u.deep_linking&&s.length>0&&t.preventDefault(),t.stopPropagation();if(!i.hasClass(r.settings.active_class)){if(!r.is_accordion(o)||r.is_accordion(o)&&!r.settings.multi_expand)a.removeClass(r.settings.active_class),a.trigger("closed.fndtn.section");i.addClass(r.settings.active_class),r.resize(i.find(r.settings.section_selector).not("["+r.settings.resized_data_attr+"]"),!0),i.trigger("opened.fndtn.section")}else if(i.hasClass(r.settings.active_class)&&r.is_accordion(o)||!u.one_up&&(r.small(o)||r.is_vertical_nav(o)||r.is_horizontal_nav(o)||r.is_accordion(o)))i.removeClass(r.settings.active_class),i.trigger("closed.fndtn.section");u.callback(o)},check_resize_timer:null,resize:function(t,n){var r=Foundation.libs.section,i=e(r.settings.section_selector),s=r.small(i),o=function(e,t){return!r.is_accordion(e)&&!e.is("["+r.settings.resized_data_attr+"]")&&(!s||r.is_horizontal_tabs(e))&&t===(e.css("display")==="none"||!e.parent().is(":visible"))};t=t||e(r.settings.section_selector),clearTimeout(r.check_resize_timer),s||t.removeAttr(r.settings.small_style_data_attr),t.filter(function(){return o(e(this),!1)}).each(function(){var t=e(this),i=t.children(r.settings.region_selector),s=i.children(r.settings.title_selector),o=i.children(r.settings.content_selector),u=0;if(n&&t.children(r.settings.region_selector).filter("."+r.settings.active_class).length==0){var a=e.extend({},r.settings,r.data_options(t));!a.deep_linking&&(a.one_up||!r.is_horizontal_nav(t)&&!r.is_vertical_nav(t)&&!r.is_accordion(t))&&i.filter(":visible").first().addClass(r.settings.active_class)}if(r.is_horizontal_tabs(t)||r.is_auto(t)){var f=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css(r.rtl?"right":"left",f);var n=parseInt(t.css("border-"+(r.rtl?"left":"right")+"-width"),10);n.toString()==="Nan"&&(n=0),f+=r.outerWidth(t)-n,u=Math.max(u,r.outerHeight(t))}}),s.css("height",u),i.each(function(){var t=e(this),n=t.children(r.settings.content_selector),i=parseInt(n.css("border-top-width"),10);i.toString()==="Nan"&&(i=0),t.css("padding-top",u-i)}),t.css("min-height",u)}else if(r.is_horizontal_nav(t)){var l=!0;s.each(function(){u=Math.max(u,r.outerHeight(e(this)))}),i.each(function(){var n=e(this);n.css("margin-left","-"+(l?t:n.children(r.settings.title_selector)).css("border-left-width")),l=!1}),i.css("margin-top","-"+t.css("border-top-width")),s.css("height",u),o.css("top",u),t.css("min-height",u)}else if(r.is_vertical_tabs(t)){var c=0;s.each(function(){var t=e(this);if(t.is(":visible")){t.css("top",c);var n=parseInt(t.css("border-top-width"),10);n.toString()==="Nan"&&(n=0),c+=r.outerHeight(t)-n}}),o.css("min-height",c+1)}else if(r.is_vertical_nav(t)){var h=0,p=!0;s.each(function(){h=Math.max(h,r.outerWidth(e(this)))}),i.each(function(){var n=e(this);n.css("margin-top","-"+(p?t:n.children(r.settings.title_selector)).css("border-top-width")),p=!1}),s.css("width",h),o.css(r.rtl?"right":"left",h),t.css("width",h)}t.attr(r.settings.resized_data_attr,!0)}),e(r.settings.section_selector).filter(function(){return o(e(this),!0)}).length>0&&(r.check_resize_timer=setTimeout(function(){r.resize(t.filter(function(){return o(e(this),!1)}),!0)},700)),s&&t.attr(r.settings.small_style_data_attr,!0)},is_vertical_nav:function(e){return/vertical-nav/i.test(e.data("section"))},is_horizontal_nav:function(e){return/horizontal-nav/i.test(e.data("section"))},is_accordion:function(e){return/accordion/i.test(e.data("section"))},is_horizontal_tabs:function(e){return/^tabs$/i.test(e.data("section"))},is_vertical_tabs:function(e){return/vertical-tabs/i.test(e.data("section"))},is_auto:function(e){var t=e.data("section");return t===""||/auto/i.test(t)},set_active_from_hash:function(){var n=Foundation.libs.section,r=t.location.hash.substring(1),i=e(n.settings.section_selector),s;i.each(function(){var t=e(this),i=t.children(n.settings.region_selector);i.each(function(){var i=e(this),o=i.children(n.settings.content_selector).data("slug");if((new RegExp(o,"i")).test(r))return s=t,!1});if(s!=null)return!1}),s!=null&&i.each(function(){if(s==e(this)){var t=e(this),i=e.extend({},n.settings,n.data_options(t)),o=t.children(n.settings.region_selector),u=i.deep_linking&&r.length>0,a=!1;o.each(function(){var t=e(this);if(a)t.removeClass(n.settings.active_class);else if(u){var i=t.children(n.settings.content_selector).data("slug");i&&(new RegExp(i,"i")).test(r)?(t.hasClass(n.settings.active_class)||t.addClass(n.settings.active_class),a=!0):t.removeClass(n.settings.active_class)}else t.hasClass(n.settings.active_class)&&(a=!0)}),!a&&(i.one_up||!n.is_horizontal_nav(t)&&!n.is_vertical_nav(t)&&!n.is_accordion(t))&&o.filter(":visible").first().addClass(n.settings.active_class)}})},reflow:function(){var t=Foundation.libs.section;e(t.settings.section_selector).removeAttr(t.settings.resized_data_attr),t.throttle(function(){t.resize()},30)()},small:function(t){var n=e.extend({},this.settings,this.data_options(t));return this
.is_horizontal_tabs(t)?!1:t&&this.is_accordion(t)?!0:e("html").hasClass("lt-ie9")?!0:e("html").hasClass("ie8compat")?!0:e(this.scope).width()<n.small_breakpoint},off:function(){e(this.scope).off(".fndtn.section"),e(t).off(".fndtn.section"),e(n).off(".fndtn.section")}},e.fn.reflow_section=function(e){var t=this,n=Foundation.libs.section;return t.removeAttr(n.settings.resized_data_attr),n.throttle(function(){n.resize(t,e)},30)(),this}}(Foundation.zj,window,document),function(e,t,n,r){"use strict";Foundation.libs.tooltips={name:"tooltips",version:"4.3.2",settings:{selector:".has-tip",additionalInheritableClasses:[],tooltipClass:".tooltip",touchCloseText:"tap to close",appendTo:"body","disable-for-touch":!1,tipTemplate:function(e,t){return'<span data-selector="'+e+'" class="'+Foundation.libs.tooltips.settings.tooltipClass.substring(1)+'">'+t+'<span class="nub"></span></span>'}},cache:{},init:function(t,n,r){Foundation.inherit(this,"data_options");var i=this;typeof n=="object"?e.extend(!0,this.settings,n):typeof r!="undefined"&&e.extend(!0,this.settings,r);if(typeof n=="string")return this[n].call(this,r);Modernizr.touch?e(this.scope).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip","[data-tooltip]",function(t){var n=e.extend({},i.settings,i.data_options(e(this)));n["disable-for-touch"]||(t.preventDefault(),e(n.tooltipClass).hide(),i.showOrCreateTip(e(this)))}).on("click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip",this.settings.tooltipClass,function(t){t.preventDefault(),e(this).fadeOut(150)}):e(this.scope).on("mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip","[data-tooltip]",function(t){var n=e(this);/enter|over/i.test(t.type)?i.showOrCreateTip(n):(t.type==="mouseout"||t.type==="mouseleave")&&i.hide(n)})},showOrCreateTip:function(e){var t=this.getTip(e);return t&&t.length>0?this.show(e):this.create(e)},getTip:function(t){var n=this.selector(t),r=null;return n&&(r=e('span[data-selector="'+n+'"]'+this.settings.tooltipClass)),typeof r=="object"?r:!1},selector:function(e){var t=e.attr("id"),n=e.attr("data-tooltip")||e.attr("data-selector");return(t&&t.length<1||!t)&&typeof n!="string"&&(n="tooltip"+Math.random().toString(36).substring(7),e.attr("data-selector",n)),t&&t.length>0?t:n},create:function(t){var n=e(this.settings.tipTemplate(this.selector(t),e("<div></div>").html(t.attr("title")).html())),r=this.inheritable_classes(t);n.addClass(r).appendTo(this.settings.appendTo),Modernizr.touch&&n.append('<span class="tap-to-close">'+this.settings.touchCloseText+"</span>"),t.removeAttr("title").attr("title",""),this.show(t)},reposition:function(n,r,i){var s,o,u,a,f,l;r.css("visibility","hidden").show(),s=n.data("width"),o=r.children(".nub"),u=this.outerHeight(o),a=this.outerHeight(o),l=function(e,t,n,r,i,s){return e.css({top:t?t:"auto",bottom:r?r:"auto",left:i?i:"auto",right:n?n:"auto",width:s?s:"auto"}).end()},l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",n.offset().left,s);if(e(t).width()<767)l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",12.5,e(this.scope).width()),r.addClass("tip-override"),l(o,-u,"auto","auto",n.offset().left);else{var c=n.offset().left;Foundation.rtl&&(c=n.offset().left+n.offset().width-this.outerWidth(r)),l(r,n.offset().top+this.outerHeight(n)+10,"auto","auto",c,s),r.removeClass("tip-override"),i&&i.indexOf("tip-top")>-1?l(r,n.offset().top-this.outerHeight(r),"auto","auto",c,s).removeClass("tip-override"):i&&i.indexOf("tip-left")>-1?l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left-this.outerWidth(r)-u,s).removeClass("tip-override"):i&&i.indexOf("tip-right")>-1&&l(r,n.offset().top+this.outerHeight(n)/2-u*2.5,"auto","auto",n.offset().left+this.outerWidth(n)+u,s).removeClass("tip-override")}r.css("visibility","visible").hide()},inheritable_classes:function(t){var n=["tip-top","tip-left","tip-bottom","tip-right","noradius"].concat(this.settings.additionalInheritableClasses),r=t.attr("class"),i=r?e.map(r.split(" "),function(t,r){if(e.inArray(t,n)!==-1)return t}).join(" "):"";return e.trim(i)},show:function(e){var t=this.getTip(e);this.reposition(e,t,e.attr("class")),t.fadeIn(150)},hide:function(e){var t=this.getTip(e);t.fadeOut(150)},reload:function(){var t=e(this);return t.data("fndtn-tooltips")?t.foundationTooltips("destroy").foundationTooltips("init"):t.foundationTooltips("init")},off:function(){e(this.scope).off(".fndtn.tooltip"),e(this.settings.tooltipClass).each(function(t){e("[data-tooltip]").get(t).attr("title",e(this).text())}).remove()},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.topbar={name:"topbar",version:"4.3.2",settings:{index:0,stickyClass:"sticky",custom_back_text:!0,back_text:"Back",is_hover:!0,mobile_show_parent_link:!1,scrolltop:!0,init:!1},init:function(n,r,i){Foundation.inherit(this,"data_options addCustomRule");var s=this;return typeof r=="object"?e.extend(!0,this.settings,r):typeof i!="undefined"&&e.extend(!0,this.settings,i),typeof r!="string"?(e(".top-bar, [data-topbar]").each(function(){e.extend(!0,s.settings,s.data_options(e(this))),s.settings.$w=e(t),s.settings.$topbar=e(this),s.settings.$section=s.settings.$topbar.find("section"),s.settings.$titlebar=s.settings.$topbar.children("ul").first(),s.settings.$topbar.data("index",0);var n=s.settings.$topbar.parent();n.hasClass("fixed")||n.hasClass(s.settings.stickyClass)?(s.settings.$topbar.data("height",s.outerHeight(n)),s.settings.$topbar.data("stickyoffset",n.offset().top)):s.settings.$topbar.data("height",s.outerHeight(s.settings.$topbar));var r=e("<div class='top-bar-js-breakpoint'/>").insertAfter(s.settings.$topbar);s.settings.breakPoint=r.width(),r.remove(),s.assemble(),s.settings.is_hover&&s.settings.$topbar.find(".has-dropdown").addClass("not-click"),s.addCustomRule(".f-topbar-fixed { padding-top: "+s.settings.$topbar.data("height")+"px }"),s.settings.$topbar.parent().hasClass("fixed")&&e("body").addClass("f-topbar-fixed")}),s.settings.init||this.events(),this.settings.init):this[r].call(this,i)},toggle:function(){var n=this,r=e(".top-bar, [data-topbar]"),i=r.find("section, .section");n.breakpoint()&&(n.rtl?(i.css({right:"0%"}),i.find(">.name").css({right:"100%"})):(i.css({left:"0%"}),i.find(">.name").css({left:"100%"})),i.find("li.moved").removeClass("moved"),r.data("index",0),r.toggleClass("expanded").css("height","")),n.settings.scrolltop?r.hasClass("expanded")?r.parent().hasClass("fixed")&&(n.settings.scrolltop?(r.parent().removeClass("fixed"),r.addClass("fixed"),e("body").removeClass("f-topbar-fixed"),t.scrollTo(0,0)):r.parent().removeClass("expanded")):r.hasClass("fixed")&&(r.parent().addClass("fixed"),r.removeClass("fixed"),e("body").addClass("f-topbar-fixed")):(r.parent().hasClass(n.settings.stickyClass)&&r.parent().addClass("fixed"),r.parent().hasClass("fixed")&&(r.hasClass("expanded")?(r.addClass("fixed"),r.parent().addClass("expanded")):(r.removeClass("fixed"),r.parent().removeClass("expanded"),n.updateStickyPositioning())))},timer:null,events:function(){var r=this;e(this.scope).off(".fndtn.topbar").on("click.fndtn.topbar",".top-bar .toggle-topbar, [data-topbar] .toggle-topbar",function(e){e.preventDefault(),r.toggle()}).on("click.fndtn.topbar",".top-bar li.has-dropdown",function(t){var n=e(this),i=e(t.target),s=n.closest("[data-topbar], .top-bar"),o=s.data("topbar");if(i.data("revealId")){r.toggle();return}if(r.breakpoint())return;if(r.settings.is_hover&&!Modernizr.touch)return;t.stopImmediatePropagation(),i[0].nodeName==="A"&&i.parent().hasClass("has-dropdown")&&t.preventDefault(),n.hasClass("hover")?(n.removeClass("hover").find("li").removeClass("hover"),n.parents("li.hover").removeClass("hover")):n.addClass("hover")}).on("click.fndtn.topbar",".top-bar .has-dropdown>a, [data-topbar] .has-dropdown>a",function(n){if(r.breakpoint()&&e(t).width()!=r.settings.breakPoint){n.preventDefault();var i=e(this),s=i.closest(".top-bar, [data-topbar]"),o=s.find("section, .section"),u=i.next(".dropdown").outerHeight(),a=i.closest("li");s.data("index",s.data("index")+1),a.addClass("moved"),r.rtl?(o.css({right:-(100*s.data("index"))+"%"}),o.find(">.name").css({right:100*s.data("index")+"%"})):(o.css({left:-(100*s.data("index"))+"%"}),o.find(">.name").css({left:100*s.data("index")+"%"})),s.css("height",r.outerHeight(i.siblings("ul"),!0)+r.settings.$topbar.data("height"))}}),e(t).on("resize.fndtn.topbar",function(){if(typeof r.settings.$topbar=="undefined")return;var t=r.settings.$topbar.parent("."+this.settings.stickyClass),i;if(!r.breakpoint()){var s=r.settings.$topbar.hasClass("expanded");e(".top-bar, [data-topbar]").css("height","").removeClass("expanded").find("li").removeClass("hover"),s&&r.toggle()}t.length>0&&(t.hasClass("fixed")?(t.removeClass("fixed"),i=t.offset().top,e(n.body).hasClass("f-topbar-fixed")&&(i-=r.settings.$topbar.data("height")),r.settings.$topbar.data("stickyoffset",i),t.addClass("fixed")):(i=t.offset().top,r.settings.$topbar.data("stickyoffset",i)))}.bind(this)),e("body").on("click.fndtn.topbar",function(t){var n=e(t.target).closest("li").closest("li.hover");if(n.length>0)return;e(".top-bar li, [data-topbar] li").removeClass("hover")}),e(this.scope).on("click.fndtn",".top-bar .has-dropdown .back, [data-topbar] .has-dropdown .back",function(t){t.preventDefault();var n=e(this),i=n.closest(".top-bar, [data-topbar]"),s=i.find("section, .section"),o=n.closest("li.moved"),u=o.parent();i.data("index",i.data("index")-1),r.rtl?(s.css({right:-(100*i.data("index"))+"%"}),s.find(">.name").css({right:100*i.data("index")+"%"})):(s.css({left:-(100*i.data("index"))+"%"}),s.find(">.name").css({left:100*i.data("index")+"%"})),i.data("index")===0?i.css("height",""):i.css("height",r.outerHeight(u,!0)+r.settings.$topbar.data("height")),setTimeout(function(){o.removeClass("moved")},300)})},breakpoint:function(){return e(n).width()<=this.settings.breakPoint||e("html").hasClass("lt-ie9")},assemble:function(){var t=this;this.settings.$section.detach(),this.settings.$section.find(".has-dropdown>a").each(function(){var n=e(this),r=n.siblings(".dropdown"),i=n.attr("href");if(t.settings.mobile_show_parent_link&&i&&i.length>1)var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li><li><a class="parent-link js-generated" href="'+i+'">'+n.text()+"</a></li>");else var s=e('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');t.settings.custom_back_text==1?s.find("h5>a").html(t.settings.back_text):s.find("h5>a").html("&laquo; "+n.html()),r.prepend(s)}),this.settings.$section.appendTo(this.settings.$topbar),this.sticky()},height:function(t){var n=0,r=this;return t.find("> li").each(function(){n+=r.outerHeight(e(this),!0)}),n},sticky:function(){var n=e(t),r=this;n.scroll(function(){r.updateStickyPositioning()})},updateStickyPositioning:function(){var n="."+this.settings.stickyClass,r=e(t);if(e(n).length>0){var i=this.settings.$topbar.data("stickyoffset");e(n).hasClass("expanded")||(r.scrollTop()>i?e(n).hasClass("fixed")||(e(n).addClass("fixed"),e("body").addClass("f-topbar-fixed")):r.scrollTop()<=i&&e(n).hasClass("fixed")&&(e(n).removeClass("fixed"),e("body").removeClass("f-topbar-fixed")))}},off:function(){e(this.scope).off(".fndtn.topbar"),e(t).off(".fndtn.topbar")},reflow:function(){}}}(Foundation.zj,this,this.document),function(e,t,n,r){"use strict";Foundation.libs.interchange={name:"interchange",version:"4.2.4",cache:{},images_loaded:!1,settings:{load_attr:"interchange",named_queries:{"default":"only screen and (min-width: 1px)",small:"only screen and (min-width: 768px)",medium:"only screen and (min-width: 1280px)",large:"only screen and (min-width: 1440px)",landscape:"only screen and (orientation: landscape)",portrait:"only screen and (orientation: portrait)",retina:"only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min--moz-device-pixel-ratio: 2),only screen and (-o-min-device-pixel-ratio: 2/1),only screen and (min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)"},directives:{replace:function(e,t){if(/IMG/.test(e[0].nodeName)){var n=e[0].src;if((new RegExp(t,"i")).test(n))return;return e[0].src=t,e.trigger("replace",[e[0].src,n])}}}},init:function(t,n,r){return Foundation.inherit(this,"throttle"),typeof n=="object"&&e.extend(!0,this.settings,n),this.events(),this.images(),typeof n!="string"?this.settings.init:this[n].call(this,r)},events:function(){var n=this;e(t).on("resize.fndtn.interchange",n.throttle(function(){n.resize.call(n)},50))},resize:function(){var t=this.cache;if(!this.images_loaded){setTimeout(e.proxy(this.resize,this),50);return}for(var n in t)if(t.hasOwnProperty(n)){var r=this.results(n,t[n]);r&&this.settings.directives[r.scenario[1]](r.el,r.scenario[0])}},results:function(t,n){var r=n.length;if(r>0){var i=e('[data-uuid="'+t+'"]');for(var s=r-1;s>=0;s--){var o,u=n[s][2];this.settings.named_queries.hasOwnProperty(u)?o=matchMedia(this.settings.named_queries[u]):o=matchMedia(u);if(o.matches)return{el:i,scenario:n[s]}}}return!1},images:function(e){return typeof this.cached_images=="undefined"||e?this.update_images():this.cached_images},update_images:function(){var t=n.getElementsByTagName("img"),r=t.length,i=0,s="data-"+this.settings.load_attr;this.cached_images=[],this.images_loaded=!1;for(var o=r-1;o>=0;o--)this.loaded(e(t[o]),function(e){i++;if(e){var t=e.getAttribute(s)||"";t.length>0&&this.cached_images.push(e)}i===r&&(this.images_loaded=!0,this.enhance())}.bind(this));return"deferred"},loaded:function(e,t){function n(){t(e[0])}function r(){this.one("load",n);if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var e=this.attr("src"),t=e.match(/\?/)?"&":"?";t+="random="+(new Date).getTime(),this.attr("src",e+t)}}if(!e.attr("src")){n();return}e[0].complete||e[0].readyState===4?n():r.call(e)},enhance:function(){var n=this.images().length;for(var r=n-1;r>=0;r--)this._object(e(this.images()[r]));return e(t).trigger("resize")},parse_params:function(e,t,n){return[this.trim(e),this.convert_directive(t),this.trim(n)]},convert_directive:function(e){var t=this.trim(e);return t.length>0?t:"replace"},_object:function(e){var t=this.parse_data_attr(e),n=[],r=t.length;if(r>0)for(var i=r-1;i>=0;i--){var s=t[i].split(/\((.*?)(\))$/);if(s.length>1){var o=s[0].split(","),u=this.parse_params(o[0],o[1],s[1]);n.push(u)}}return this.store(e,n)},uuid:function(e){function n(){return((1+Math.random())*65536|0).toString(16).substring(1)}var t=e||"-";return n()+n()+t+n()+t+n()+t+n()+t+n()+n()+n()},store:function(e,t){var n=this.uuid(),r=e.data("uuid");return r?this.cache[r]:(e.attr("data-uuid",n),this.cache[n]=t)},trim:function(t){return typeof t=="string"?e.trim(t):t},parse_data_attr:function(e){var t=e.data(this.settings.load_attr).split(/\[(.*?)\]/),n=t.length,r=[];for(var i=n-1;i>=0;i--)t[i].replace(/[\W\d]+/,"").length>4&&r.push(t[i]);return r},reflow:function(){this.images(!0)}}}(Foundation.zj,this,this.document),function(e){"use strict";function t(e,t,n){if(e.addEventListener)return e.addEventListener(t,n,!1);if(e.attachEvent)return e.attachEvent("on"+t,n)}function n(e,t){var n,r;for(n=0,r=e.length;n<r;n++)if(e[n]===t)return!0;return!1}function r(e,t){var n;e.createTextRange?(n=e.createTextRange(),n.move("character",t),n.select()):e.selectionStart&&(e.focus(),e.setSelectionRange(t,t))}function i(e,t){try{return e.type=t,!0}catch(n){return!1}}e.Placeholders={Utils:{addEventListener:t,inArray:n,moveCaret:r,changeType:i}}}(this),function(e){"use strict";function M(){}function _(e){var t;return e.value===e.getAttribute(a)&&e.getAttribute(f)==="true"?(e.setAttribute(f,"false"),e.value="",e.className=e.className.replace(s,""),t=e.getAttribute(l),t&&(e.type=t),!0):!1}function D(e){var t,n=e.getAttribute(a);return e.value===""&&n?(e.setAttribute(f,"true"),e.value=n,e.className+=" "+i,t=e.getAttribute(l),t?e.type="text":e.type==="password"&&b.changeType(e,"text")&&e.setAttribute(l,"password"),!0):!1}function P(e,t){var n,r,i,s,f;if(e&&e.getAttribute(a))t(e);else{n=e?e.getElementsByTagName("input"):o,r=e?e.getElementsByTagName("textarea"):u;for(f=0,s=n.length+r.length;f<s;f++)i=f<n.length?n[f]:r[f-n.length],t(i)}}function H(e){P(e,_)}function B(e){P(e,D)}function j(e){return function(){w&&e.value===e.getAttribute(a)&&e.getAttribute(f)==="true"?b.moveCaret(e,0):_(e)}}function F(e){return function(){D(e)}}function I(e){return function(t){S=e.value;if(e.getAttribute(f)==="true"&&S===e.getAttribute(a)&&b.inArray(n,t.keyCode))return t.preventDefault&&t.preventDefault(),!1}}function q(e){return function(){var t;e.getAttribute(f)==="true"&&e.value!==S&&(e.className=e.className.replace(s,""),e.value=e.value.replace(e.getAttribute(a),""),e.setAttribute(f,!1),t=e.getAttribute(l),t&&(e.type=t)),e.value===""&&(e.blur(),b.moveCaret(e,0))}}function R(e){return function(){e===document.activeElement&&e.value===e.getAttribute(a)&&e.getAttribute(f)==="true"&&b.moveCaret(e,0)}}function U(e){return function(){H(e)}}function z(e){e.form&&(k=e.form,k.getAttribute(c)||(b.addEventListener(k,"submit",U(k)),k.setAttribute(c,"true"))),b.addEventListener(e,"focus",j(e)),b.addEventListener(e,"blur",F(e)),w&&(b.addEventListener(e,"keydown",I(e)),b.addEventListener(e,"keyup",q(e)),b.addEventListener(e,"click",R(e))),e.setAttribute(h,"true"),e.setAttribute(a,N),D(e)}var t=["text","search","url","tel","email","password","number","textarea"],n=[27,33,34,35,36,37,38,39,40,8,46],r="#ccc",i="placeholdersjs",s=new RegExp("(?:^|\\s)"+i+"(?!\\S)"),o,u,a="data-placeholder-value",f="data-placeholder-active",l="data-placeholder-type",c="data-placeholder-submit",h="data-placeholder-bound",p="data-placeholder-focus",d="data-placeholder-live",v=document.createElement("input"),m=document.getElementsByTagName("head")[0],g=document.documentElement,y=e.Placeholders,b=y.Utils,w,E,S,x,T,N,C,k,L,A,O;y.nativeSupport=v.placeholder!==void 0;if(!y.nativeSupport){o=document.getElementsByTagName("input"),u=document.getElementsByTagName("textarea"),w=g.getAttribute(p)==="false",E=g.getAttribute(d)!=="false",x=document.createElement("style"),x.type="text/css",T=document.createTextNode("."+i+" { color:"+r+"; }"),x.styleSheet?x.styleSheet.cssText=T.nodeValue:x.appendChild(T),m.insertBefore(x,m.firstChild);for(O=0,A=o.length+u.length;O<A;O++)L=O<o.length?o[O]:u[O-o.length],N=L.attributes.placeholder,N&&(N=N.nodeValue,N&&b.inArray(t,L.type)&&z(L));C=setInterval(function(){for(O=0,A=o.length+u.length;O<A;O++){L=O<o.length?o[O]:u[O-o.length],N=L.attributes.placeholder;if(N){N=N.nodeValue;if(N&&b.inArray(t,L.type)){L.getAttribute(h)||z(L);if(N!==L.getAttribute(a)||L.type==="password"&&!L.getAttribute(l))L.type==="password"&&!L.getAttribute(l)&&b.changeType(L,"text")&&L.setAttribute(l,"password"),L.value===L.getAttribute(a)&&(L.value=N),L.setAttribute(a,N)}}}E||clearInterval(C)},100)}y.disable=y.nativeSupport?M:H,y.enable=y.nativeSupport?M:B}(this),function(e,t,n,r){"use strict";Foundation.libs.abide={name:"abide",version:"4.3.2",settings:{live_validate:!0,focus_on_invalid:!0,timeout:1e3,patterns:{alpha:/[a-zA-Z]+/,alpha_numeric:/[a-zA-Z0-9]+/,integer:/-?\d+/,number:/-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/,password:/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,card:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,cvv:/^([0-9]){3,4}$/,email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,url:/(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,domain:/^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,datetime:/([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))/,date:/(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))/,time:/(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}/,dateISO:/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,month_day_year:/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/,color:/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/}},timer:null,init:function(t,n,r){typeof n=="object"&&e.extend(!0,this.settings,n);if(typeof n=="string")return this[n].call(this,r);this.settings.init||this.events()},events:function(){var t=this,n=e("form[data-abide]",this.scope).attr("novalidate","novalidate");n.on("submit validate",function(n){return t.validate(e(this).find("input, textarea, select").get(),n)}),this.settings.init=!0;if(!this.settings.live_validate)return;n.find("input, textarea, select").on("blur change",function(e){t.validate([this],e)}).on("keydown",function(e){clearTimeout(t.timer),t.timer=setTimeout(function(){t.validate([this],e)}.bind(this),t.settings.timeout)})},validate:function(t,n){var r=this.parse_patterns(t),i=r.length,s=e(t[0]).closest("form");for(var o=0;o<i;o++)if(!r[o]&&/submit/.test(n.type))return this.settings.focus_on_invalid&&t[o].focus(),s.trigger("invalid"),e(t[o]).closest("form").attr("data-invalid",""),!1;return/submit/.test(n.type)&&s.trigger("valid"),s.removeAttr("data-invalid"),!0},parse_patterns:function(e){var t=e.length,n=[];for(var r=t-1;r>=0;r--)n.push(this.pattern(e[r]));return this.check_validation_and_apply_styles(n)},pattern:function(e){var t=e.getAttribute("type"),n=typeof e.getAttribute("required")=="string";if(this.settings.patterns.hasOwnProperty(t))return[e,this.settings.patterns[t],n];var r=e.getAttribute("pattern")||"";return this.settings.patterns.hasOwnProperty(r)&&r.length>0?[e,this.settings.patterns[r],n]:r.length>0?[e,new RegExp(r),n]:(r=/.*/,[e,r,n])},check_validation_and_apply_styles:function(t){var n=t.length,r=[];for(var i=n-1;i>=0;i--){var s=t[i][0],o=t[i][2],u=s.value,a=s.type==="radio",f=o?s.value.length>0:!0;a&&o?r.push(this.valid_radio(s,o)):t[i][1].test(u)&&f||!o&&s.value.length<1?(e(s).removeAttr("data-invalid").parent().removeClass("error"),r.push(!0)):(e(s).attr("data-invalid","").parent().addClass("error"),r.push(!1))}return r},valid_radio:function(t,r){var i=t.getAttribute("name"),s=n.getElementsByName(i),o=s.length,u=!1;for(var a=0;a<o;a++)s[a].checked&&(u=!0);for(var a=0;a<o;a++)u?e(s[a]).removeAttr("data-invalid").parent().removeClass("error"):e(s[a]).attr("data-invalid","").parent().addClass("error");return u}}}(Foundation.zj,this,this.document);
;
/*
 Highcharts JS v3.0.4 (2013-08-02)

 (c) 2009-2013 Torstein Hønsi

 License: www.highcharts.com/license
*/
(function(){function r(a,b){var c;a||(a={});for(c in b)a[c]=b[c];return a}function x(){var a,b=arguments.length,c={},d=function(a,b){var c,h;typeof a!=="object"&&(a={});for(h in b)b.hasOwnProperty(h)&&(c=b[h],a[h]=c&&typeof c==="object"&&Object.prototype.toString.call(c)!=="[object Array]"&&typeof c.nodeType!=="number"?d(a[h]||{},c):b[h]);return a};for(a=0;a<b;a++)c=d(c,arguments[a]);return c}function A(a,b){return parseInt(a,b||10)}function da(a){return typeof a==="string"}function U(a){return typeof a===
"object"}function Ha(a){return Object.prototype.toString.call(a)==="[object Array]"}function pa(a){return typeof a==="number"}function ma(a){return N.log(a)/N.LN10}function ea(a){return N.pow(10,a)}function fa(a,b){for(var c=a.length;c--;)if(a[c]===b){a.splice(c,1);break}}function t(a){return a!==v&&a!==null}function w(a,b,c){var d,e;if(da(b))t(c)?a.setAttribute(b,c):a&&a.getAttribute&&(e=a.getAttribute(b));else if(t(b)&&U(b))for(d in b)a.setAttribute(d,b[d]);return e}function ha(a){return Ha(a)?
a:[a]}function p(){var a=arguments,b,c,d=a.length;for(b=0;b<d;b++)if(c=a[b],typeof c!=="undefined"&&c!==null)return c}function M(a,b){if(qa&&b&&b.opacity!==v)b.filter="alpha(opacity="+b.opacity*100+")";r(a.style,b)}function T(a,b,c,d,e){a=z.createElement(a);b&&r(a,b);e&&M(a,{padding:0,border:R,margin:0});c&&M(a,c);d&&d.appendChild(a);return a}function ga(a,b){var c=function(){};c.prototype=new a;r(c.prototype,b);return c}function ya(a,b,c,d){var e=O.lang,a=+a||0,f=b===-1?(a.toString().split(".")[1]||
"").length:isNaN(b=P(b))?2:b,b=c===void 0?e.decimalPoint:c,d=d===void 0?e.thousandsSep:d,e=a<0?"-":"",c=String(A(a=P(a).toFixed(f))),g=c.length>3?c.length%3:0;return e+(g?c.substr(0,g)+d:"")+c.substr(g).replace(/(\d{3})(?=\d)/g,"$1"+d)+(f?b+P(a-c).toFixed(f).slice(2):"")}function za(a,b){return Array((b||2)+1-String(a).length).join(0)+a}function Bb(a,b,c){var d=a[b];a[b]=function(){var a=Array.prototype.slice.call(arguments);a.unshift(d);return c.apply(this,a)}}function Aa(a,b){for(var c="{",d=!1,
e,f,g,h,i,j=[];(c=a.indexOf(c))!==-1;){e=a.slice(0,c);if(d){f=e.split(":");g=f.shift().split(".");i=g.length;e=b;for(h=0;h<i;h++)e=e[g[h]];if(f.length)f=f.join(":"),g=/\.([0-9])/,h=O.lang,i=void 0,/f$/.test(f)?(i=(i=f.match(g))?i[1]:-1,e=ya(e,i,h.decimalPoint,f.indexOf(",")>-1?h.thousandsSep:"")):e=Xa(f,e)}j.push(e);a=a.slice(c+1);c=(d=!d)?"}":"{"}j.push(a);return j.join("")}function lb(a){return N.pow(10,S(N.log(a)/N.LN10))}function mb(a,b,c,d){var e,c=p(c,1);e=a/c;b||(b=[1,2,2.5,5,10],d&&d.allowDecimals===
!1&&(c===1?b=[1,2,5,10]:c<=0.1&&(b=[1/c])));for(d=0;d<b.length;d++)if(a=b[d],e<=(b[d]+(b[d+1]||b[d]))/2)break;a*=c;return a}function Cb(a,b){var c=b||[[Db,[1,2,5,10,20,25,50,100,200,500]],[nb,[1,2,5,10,15,30]],[Ya,[1,2,5,10,15,30]],[Qa,[1,2,3,4,6,8,12]],[ra,[1,2]],[Za,[1,2]],[Ra,[1,2,3,4,6]],[sa,null]],d=c[c.length-1],e=y[d[0]],f=d[1],g;for(g=0;g<c.length;g++)if(d=c[g],e=y[d[0]],f=d[1],c[g+1]&&a<=(e*f[f.length-1]+y[c[g+1][0]])/2)break;e===y[sa]&&a<5*e&&(f=[1,2,5]);e===y[sa]&&a<5*e&&(f=[1,2,5]);c=
mb(a/e,f,d[0]===sa?lb(a/e):1);return{unitRange:e,count:c,unitName:d[0]}}function Eb(a,b,c,d){var e=[],f={},g=O.global.useUTC,h,i=new Date(b),j=a.unitRange,k=a.count;if(t(b)){j>=y[nb]&&(i.setMilliseconds(0),i.setSeconds(j>=y[Ya]?0:k*S(i.getSeconds()/k)));if(j>=y[Ya])i[Fb](j>=y[Qa]?0:k*S(i[ob]()/k));if(j>=y[Qa])i[Gb](j>=y[ra]?0:k*S(i[pb]()/k));if(j>=y[ra])i[qb](j>=y[Ra]?1:k*S(i[Sa]()/k));j>=y[Ra]&&(i[Hb](j>=y[sa]?0:k*S(i[$a]()/k)),h=i[ab]());j>=y[sa]&&(h-=h%k,i[Ib](h));if(j===y[Za])i[qb](i[Sa]()-i[rb]()+
p(d,1));b=1;h=i[ab]();for(var d=i.getTime(),l=i[$a](),m=i[Sa](),o=g?0:(864E5+i.getTimezoneOffset()*6E4)%864E5;d<c;)e.push(d),j===y[sa]?d=bb(h+b*k,0):j===y[Ra]?d=bb(h,l+b*k):!g&&(j===y[ra]||j===y[Za])?d=bb(h,l,m+b*k*(j===y[ra]?1:7)):d+=j*k,b++;e.push(d);n(sb(e,function(a){return j<=y[Qa]&&a%y[ra]===o}),function(a){f[a]=ra})}e.info=r(a,{higherRanks:f,totalRange:j*k});return e}function Jb(){this.symbol=this.color=0}function Kb(a,b){var c=a.length,d,e;for(e=0;e<c;e++)a[e].ss_i=e;a.sort(function(a,c){d=
b(a,c);return d===0?a.ss_i-c.ss_i:d});for(e=0;e<c;e++)delete a[e].ss_i}function Ia(a){for(var b=a.length,c=a[0];b--;)a[b]<c&&(c=a[b]);return c}function ta(a){for(var b=a.length,c=a[0];b--;)a[b]>c&&(c=a[b]);return c}function Ja(a,b){for(var c in a)a[c]&&a[c]!==b&&a[c].destroy&&a[c].destroy(),delete a[c]}function Ta(a){cb||(cb=T(Ba));a&&cb.appendChild(a);cb.innerHTML=""}function ua(a,b){var c="Highcharts error #"+a+": www.highcharts.com/errors/"+a;if(b)throw c;else E.console&&console.log(c)}function ia(a){return parseFloat(a.toPrecision(14))}
function Ka(a,b){Ca=p(a,b.animation)}function Lb(){var a=O.global.useUTC,b=a?"getUTC":"get",c=a?"setUTC":"set";bb=a?Date.UTC:function(a,b,c,g,h,i){return(new Date(a,b,p(c,1),p(g,0),p(h,0),p(i,0))).getTime()};ob=b+"Minutes";pb=b+"Hours";rb=b+"Day";Sa=b+"Date";$a=b+"Month";ab=b+"FullYear";Fb=c+"Minutes";Gb=c+"Hours";qb=c+"Date";Hb=c+"Month";Ib=c+"FullYear"}function va(){}function La(a,b,c,d){this.axis=a;this.pos=b;this.type=c||"";this.isNew=!0;!c&&!d&&this.addLabel()}function tb(a,b){this.axis=a;if(b)this.options=
b,this.id=b.id}function Mb(a,b,c,d,e,f){var g=a.chart.inverted;this.axis=a;this.isNegative=c;this.options=b;this.x=d;this.total=0;this.points={};this.stack=e;this.percent=f==="percent";this.alignOptions={align:b.align||(g?c?"left":"right":"center"),verticalAlign:b.verticalAlign||(g?"middle":c?"bottom":"top"),y:p(b.y,g?4:c?14:-6),x:p(b.x,g?c?-6:6:0)};this.textAlign=b.textAlign||(g?c?"right":"left":"center")}function db(){this.init.apply(this,arguments)}function ub(){this.init.apply(this,arguments)}
function vb(a,b){this.init(a,b)}function wb(a,b){this.init(a,b)}function xb(){this.init.apply(this,arguments)}var v,z=document,E=window,N=Math,s=N.round,S=N.floor,ja=N.ceil,u=N.max,I=N.min,P=N.abs,V=N.cos,ba=N.sin,Ma=N.PI,Ua=Ma*2/360,Da=navigator.userAgent,Nb=E.opera,qa=/msie/i.test(Da)&&!Nb,eb=z.documentMode===8,fb=/AppleWebKit/.test(Da),gb=/Firefox/.test(Da),Ob=/(Mobile|Android|Windows Phone)/.test(Da),wa="http://www.w3.org/2000/svg",Y=!!z.createElementNS&&!!z.createElementNS(wa,"svg").createSVGRect,
Vb=gb&&parseInt(Da.split("Firefox/")[1],10)<4,Z=!Y&&!qa&&!!z.createElement("canvas").getContext,Va,hb=z.documentElement.ontouchstart!==v,Pb={},yb=0,cb,O,Xa,Ca,zb,y,xa=function(){},Ea=[],Ba="div",R="none",Qb="rgba(192,192,192,"+(Y?1.0E-4:0.002)+")",Db="millisecond",nb="second",Ya="minute",Qa="hour",ra="day",Za="week",Ra="month",sa="year",Rb="stroke-width",bb,ob,pb,rb,Sa,$a,ab,Fb,Gb,qb,Hb,Ib,$={};E.Highcharts=E.Highcharts?ua(16,!0):{};Xa=function(a,b,c){if(!t(b)||isNaN(b))return"Invalid date";var a=
p(a,"%Y-%m-%d %H:%M:%S"),d=new Date(b),e,f=d[pb](),g=d[rb](),h=d[Sa](),i=d[$a](),j=d[ab](),k=O.lang,l=k.weekdays,d=r({a:l[g].substr(0,3),A:l[g],d:za(h),e:h,b:k.shortMonths[i],B:k.months[i],m:za(i+1),y:j.toString().substr(2,2),Y:j,H:za(f),I:za(f%12||12),l:f%12||12,M:za(d[ob]()),p:f<12?"AM":"PM",P:f<12?"am":"pm",S:za(d.getSeconds()),L:za(s(b%1E3),3)},Highcharts.dateFormats);for(e in d)for(;a.indexOf("%"+e)!==-1;)a=a.replace("%"+e,typeof d[e]==="function"?d[e](b):d[e]);return c?a.substr(0,1).toUpperCase()+
a.substr(1):a};Jb.prototype={wrapColor:function(a){if(this.color>=a)this.color=0},wrapSymbol:function(a){if(this.symbol>=a)this.symbol=0}};y=function(){for(var a=0,b=arguments,c=b.length,d={};a<c;a++)d[b[a++]]=b[a];return d}(Db,1,nb,1E3,Ya,6E4,Qa,36E5,ra,864E5,Za,6048E5,Ra,26784E5,sa,31556952E3);zb={init:function(a,b,c){var b=b||"",d=a.shift,e=b.indexOf("C")>-1,f=e?7:3,g,b=b.split(" "),c=[].concat(c),h,i,j=function(a){for(g=a.length;g--;)a[g]==="M"&&a.splice(g+1,0,a[g+1],a[g+2],a[g+1],a[g+2])};e&&
(j(b),j(c));a.isArea&&(h=b.splice(b.length-6,6),i=c.splice(c.length-6,6));if(d<=c.length/f)for(;d--;)c=[].concat(c).splice(0,f).concat(c);a.shift=0;if(b.length)for(a=c.length;b.length<a;)d=[].concat(b).splice(b.length-f,f),e&&(d[f-6]=d[f-2],d[f-5]=d[f-1]),b=b.concat(d);h&&(b=b.concat(h),c=c.concat(i));return[b,c]},step:function(a,b,c,d){var e=[],f=a.length;if(c===1)e=d;else if(f===b.length&&c<1)for(;f--;)d=parseFloat(a[f]),e[f]=isNaN(d)?a[f]:c*parseFloat(b[f]-d)+d;else e=b;return e}};(function(a){E.HighchartsAdapter=
E.HighchartsAdapter||a&&{init:function(b){var c=a.fx,d=c.step,e,f=a.Tween,g=f&&f.propHooks;e=a.cssHooks.opacity;a.extend(a.easing,{easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c}});a.each(["cur","_default","width","height","opacity"],function(a,b){var e=d,k,l;b==="cur"?e=c.prototype:b==="_default"&&f&&(e=g[b],b="set");(k=e[b])&&(e[b]=function(c){c=a?c:this;l=c.elem;return l.attr?l.attr(c.prop,b==="cur"?v:c.now):k.apply(this,arguments)})});Bb(e,"get",function(a,b,c){return b.attr?b.opacity||
0:a.call(this,b,c)});e=function(a){var c=a.elem,d;if(!a.started)d=b.init(c,c.d,c.toD),a.start=d[0],a.end=d[1],a.started=!0;c.attr("d",b.step(a.start,a.end,a.pos,c.toD))};f?g.d={set:e}:d.d=e;this.each=Array.prototype.forEach?function(a,b){return Array.prototype.forEach.call(a,b)}:function(a,b){for(var c=0,d=a.length;c<d;c++)if(b.call(a[c],a[c],c,a)===!1)return c};a.fn.highcharts=function(){var a="Chart",b=arguments,c,d;da(b[0])&&(a=b[0],b=Array.prototype.slice.call(b,1));c=b[0];if(c!==v)c.chart=c.chart||
{},c.chart.renderTo=this[0],new Highcharts[a](c,b[1]),d=this;c===v&&(d=Ea[w(this[0],"data-highcharts-chart")]);return d}},getScript:a.getScript,inArray:a.inArray,adapterRun:function(b,c){return a(b)[c]()},grep:a.grep,map:function(a,c){for(var d=[],e=0,f=a.length;e<f;e++)d[e]=c.call(a[e],a[e],e,a);return d},offset:function(b){return a(b).offset()},addEvent:function(b,c,d){a(b).bind(c,d)},removeEvent:function(b,c,d){var e=z.removeEventListener?"removeEventListener":"detachEvent";z[e]&&b&&!b[e]&&(b[e]=
function(){});a(b).unbind(c,d)},fireEvent:function(b,c,d,e){var f=a.Event(c),g="detached"+c,h;!qa&&d&&(delete d.layerX,delete d.layerY);r(f,d);b[c]&&(b[g]=b[c],b[c]=null);a.each(["preventDefault","stopPropagation"],function(a,b){var c=f[b];f[b]=function(){try{c.call(f)}catch(a){b==="preventDefault"&&(h=!0)}}});a(b).trigger(f);b[g]&&(b[c]=b[g],b[g]=null);e&&!f.isDefaultPrevented()&&!h&&e(f)},washMouseEvent:function(a){var c=a.originalEvent||a;if(c.pageX===v)c.pageX=a.pageX,c.pageY=a.pageY;return c},
animate:function(b,c,d){var e=a(b);if(!b.style)b.style={};if(c.d)b.toD=c.d,c.d=1;e.stop();e.animate(c,d)},stop:function(b){a(b).stop()}}})(E.jQuery);var W=E.HighchartsAdapter,L=W||{};W&&W.init.call(W,zb);var ib=L.adapterRun,Wb=L.getScript,na=L.inArray,n=L.each,sb=L.grep,Xb=L.offset,Na=L.map,J=L.addEvent,aa=L.removeEvent,C=L.fireEvent,Sb=L.washMouseEvent,Ab=L.animate,Wa=L.stop,L={enabled:!0,x:0,y:15,style:{color:"#666",cursor:"default",fontSize:"11px",lineHeight:"14px"}};O={colors:"#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a".split(","),
symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),shortMonths:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),weekdays:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),decimalPoint:".",numericSymbols:"k,M,G,T,P,E".split(","),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:","},global:{useUTC:!0,
canvasToolsURL:"http://code.highcharts.com/3.0.4/modules/canvas-tools.js",VMLRadialGradientURL:"http://code.highcharts.com/3.0.4/gfx/vml-radial-gradient.png"},chart:{borderColor:"#4572A7",borderRadius:5,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacingTop:10,spacingRight:10,spacingBottom:15,spacingLeft:10,style:{fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',fontSize:"12px"},backgroundColor:"#FFFFFF",plotBorderColor:"#C0C0C0",resetZoomButton:{theme:{zIndex:20},
position:{align:"right",x:-10,y:10}}},title:{text:"Chart title",align:"center",margin:15,style:{color:"#274b6d",fontSize:"16px"}},subtitle:{text:"",align:"center",style:{color:"#4d759e"}},plotOptions:{line:{allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},lineWidth:2,marker:{enabled:!0,lineWidth:0,radius:4,lineColor:"#FFFFFF",states:{hover:{enabled:!0},select:{fillColor:"#FFFFFF",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:x(L,{align:"center",enabled:!1,formatter:function(){return this.y===
null?"":ya(this.y,-1)},verticalAlign:"bottom",y:0}),cropThreshold:300,pointRange:0,showInLegend:!0,states:{hover:{marker:{}},select:{marker:{}}},stickyTracking:!0}},labels:{style:{position:"absolute",color:"#3E576F"}},legend:{enabled:!0,align:"center",layout:"horizontal",labelFormatter:function(){return this.name},borderWidth:1,borderColor:"#909090",borderRadius:5,navigation:{activeColor:"#274b6d",inactiveColor:"#CCC"},shadow:!1,itemStyle:{cursor:"pointer",color:"#274b6d",fontSize:"12px"},itemHoverStyle:{color:"#000"},
itemHiddenStyle:{color:"#CCC"},itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},symbolWidth:16,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"1em"},style:{position:"absolute",backgroundColor:"white",opacity:0.5,textAlign:"center"}},tooltip:{enabled:!0,animation:Y,backgroundColor:"rgba(255, 255, 255, .85)",borderWidth:1,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},headerFormat:'<span style="font-size: 10px">{point.key}</span><br/>',pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',shadow:!0,snap:Ob?25:10,style:{color:"#333333",cursor:"default",fontSize:"12px",padding:"8px",whiteSpace:"nowrap"}},credits:{enabled:!0,text:"",href:"http://www.highcharts.com",
position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#909090",fontSize:"9px"}}};var X=O.plotOptions,W=X.line;Lb();var oa=function(a){var b=[],c,d;(function(a){a&&a.stops?d=Na(a.stops,function(a){return oa(a[1])}):(c=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a))?b=[A(c[1]),A(c[2]),A(c[3]),parseFloat(c[4],10)]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))?b=[A(c[1],16),A(c[2],16),A(c[3],
16),1]:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))&&(b=[A(c[1]),A(c[2]),A(c[3]),1])})(a);return{get:function(c){var f;d?(f=x(a),f.stops=[].concat(f.stops),n(d,function(a,b){f.stops[b]=[f.stops[b][0],a.get(c)]})):f=b&&!isNaN(b[0])?c==="rgb"?"rgb("+b[0]+","+b[1]+","+b[2]+")":c==="a"?b[3]:"rgba("+b.join(",")+")":a;return f},brighten:function(a){if(d)n(d,function(b){b.brighten(a)});else if(pa(a)&&a!==0){var c;for(c=0;c<3;c++)b[c]+=A(a*255),b[c]<0&&(b[c]=0),b[c]>255&&
(b[c]=255)}return this},rgba:b,setOpacity:function(a){b[3]=a;return this}}};va.prototype={init:function(a,b){this.element=b==="span"?T(b):z.createElementNS(wa,b);this.renderer=a;this.attrSetters={}},opacity:1,animate:function(a,b,c){b=p(b,Ca,!0);Wa(this);if(b){b=x(b);if(c)b.complete=c;Ab(this,a,b)}else this.attr(a),c&&c()},attr:function(a,b){var c,d,e,f,g=this.element,h=g.nodeName.toLowerCase(),i=this.renderer,j,k=this.attrSetters,l=this.shadows,m,o,q=this;da(a)&&t(b)&&(c=a,a={},a[c]=b);if(da(a))c=
a,h==="circle"?c={x:"cx",y:"cy"}[c]||c:c==="strokeWidth"&&(c="stroke-width"),q=w(g,c)||this[c]||0,c!=="d"&&c!=="visibility"&&(q=parseFloat(q));else{for(c in a)if(j=!1,d=a[c],e=k[c]&&k[c].call(this,d,c),e!==!1){e!==v&&(d=e);if(c==="d")d&&d.join&&(d=d.join(" ")),/(NaN| {2}|^$)/.test(d)&&(d="M 0 0");else if(c==="x"&&h==="text")for(e=0;e<g.childNodes.length;e++)f=g.childNodes[e],w(f,"x")===w(g,"x")&&w(f,"x",d);else if(this.rotation&&(c==="x"||c==="y"))o=!0;else if(c==="fill")d=i.color(d,g,c);else if(h===
"circle"&&(c==="x"||c==="y"))c={x:"cx",y:"cy"}[c]||c;else if(h==="rect"&&c==="r")w(g,{rx:d,ry:d}),j=!0;else if(c==="translateX"||c==="translateY"||c==="rotation"||c==="verticalAlign"||c==="scaleX"||c==="scaleY")j=o=!0;else if(c==="stroke")d=i.color(d,g,c);else if(c==="dashstyle")if(c="stroke-dasharray",d=d&&d.toLowerCase(),d==="solid")d=R;else{if(d){d=d.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash",
"8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(e=d.length;e--;)d[e]=A(d[e])*p(a["stroke-width"],this["stroke-width"]);d=d.join(",")}}else if(c==="width")d=A(d);else if(c==="align")c="text-anchor",d={left:"start",center:"middle",right:"end"}[d];else if(c==="title")e=g.getElementsByTagName("title")[0],e||(e=z.createElementNS(wa,"title"),g.appendChild(e)),e.textContent=d;c==="strokeWidth"&&(c="stroke-width");if(c==="stroke-width"||c==="stroke"){this[c]=d;if(this.stroke&&
this["stroke-width"])w(g,"stroke",this.stroke),w(g,"stroke-width",this["stroke-width"]),this.hasStroke=!0;else if(c==="stroke-width"&&d===0&&this.hasStroke)g.removeAttribute("stroke"),this.hasStroke=!1;j=!0}this.symbolName&&/^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c)&&(m||(this.symbolAttr(a),m=!0),j=!0);if(l&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c))for(e=l.length;e--;)w(l[e],c,c==="height"?u(d-(l[e].cutHeight||0),0):d);if((c==="width"||c==="height")&&h===
"rect"&&d<0)d=0;this[c]=d;c==="text"?(d!==this.textStr&&delete this.bBox,this.textStr=d,this.added&&i.buildText(this)):j||w(g,c,d)}o&&this.updateTransform()}return q},addClass:function(a){var b=this.element,c=w(b,"class")||"";c.indexOf(a)===-1&&w(b,"class",c+" "+a);return this},symbolAttr:function(a){var b=this;n("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","),function(c){b[c]=p(a[c],b[c])});b.attr({d:b.renderer.symbols[b.symbolName](b.x,b.y,b.width,b.height,b)})},clip:function(a){return this.attr("clip-path",
a?"url("+this.renderer.url+"#"+a.id+")":R)},crisp:function(a,b,c,d,e){var f,g={},h={},i,a=a||this.strokeWidth||this.attr&&this.attr("stroke-width")||0;i=s(a)%2/2;h.x=S(b||this.x||0)+i;h.y=S(c||this.y||0)+i;h.width=S((d||this.width||0)-2*i);h.height=S((e||this.height||0)-2*i);h.strokeWidth=a;for(f in h)this[f]!==h[f]&&(this[f]=g[f]=h[f]);return g},css:function(a){var b=this.element,c=a&&a.width&&b.nodeName.toLowerCase()==="text",d,e="",f=function(a,b){return"-"+b.toLowerCase()};if(a&&a.color)a.fill=
a.color;this.styles=a=r(this.styles,a);Z&&c&&delete a.width;if(qa&&!Y)c&&delete a.width,M(this.element,a);else{for(d in a)e+=d.replace(/([A-Z])/g,f)+":"+a[d]+";";w(b,"style",e)}c&&this.added&&this.renderer.buildText(this);return this},on:function(a,b){var c=this.element;if(hb&&a==="click")c.ontouchstart=function(a){a.preventDefault();b.call(c,a)};c["on"+a]=b;return this},setRadialReference:function(a){this.element.radialReference=a;return this},translate:function(a,b){return this.attr({translateX:a,
translateY:b})},invert:function(){this.inverted=!0;this.updateTransform();return this},htmlCss:function(a){var b=this.element;if(b=a&&b.tagName==="SPAN"&&a.width)delete a.width,this.textWidth=b,this.updateTransform();this.styles=r(this.styles,a);M(this.element,a);return this},htmlGetBBox:function(){var a=this.element,b=this.bBox;if(!b){if(a.nodeName==="text")a.style.position="absolute";b=this.bBox={x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}}return b},htmlUpdateTransform:function(){if(this.added){var a=
this.renderer,b=this.element,c=this.translateX||0,d=this.translateY||0,e=this.x||0,f=this.y||0,g=this.textAlign||"left",h={left:0,center:0.5,right:1}[g],i=g&&g!=="left",j=this.shadows;M(b,{marginLeft:c,marginTop:d});j&&n(j,function(a){M(a,{marginLeft:c+1,marginTop:d+1})});this.inverted&&n(b.childNodes,function(c){a.invertChild(c,b)});if(b.tagName==="SPAN"){var k,l,j=this.rotation,m;k=0;var o=1,q=0,ka;m=A(this.textWidth);var D=this.xCorr||0,F=this.yCorr||0,Tb=[j,g,b.innerHTML,this.textWidth].join(",");
if(Tb!==this.cTT){t(j)&&(k=j*Ua,o=V(k),q=ba(k),this.setSpanRotation(j,q,o));k=p(this.elemWidth,b.offsetWidth);l=p(this.elemHeight,b.offsetHeight);if(k>m&&/[ \-]/.test(b.textContent||b.innerText))M(b,{width:m+"px",display:"block",whiteSpace:"normal"}),k=m;m=a.fontMetrics(b.style.fontSize).b;D=o<0&&-k;F=q<0&&-l;ka=o*q<0;D+=q*m*(ka?1-h:h);F-=o*m*(j?ka?h:1-h:1);i&&(D-=k*h*(o<0?-1:1),j&&(F-=l*h*(q<0?-1:1)),M(b,{textAlign:g}));this.xCorr=D;this.yCorr=F}M(b,{left:e+D+"px",top:f+F+"px"});if(fb)l=b.offsetHeight;
this.cTT=Tb}}else this.alignOnAdd=!0},setSpanRotation:function(a){var b={};b[qa?"-ms-transform":fb?"-webkit-transform":gb?"MozTransform":Nb?"-o-transform":""]=b.transform="rotate("+a+"deg)";M(this.element,b)},updateTransform:function(){var a=this.translateX||0,b=this.translateY||0,c=this.scaleX,d=this.scaleY,e=this.inverted,f=this.rotation;e&&(a+=this.attr("width"),b+=this.attr("height"));a=["translate("+a+","+b+")"];e?a.push("rotate(90) scale(-1,1)"):f&&a.push("rotate("+f+" "+(this.x||0)+" "+(this.y||
0)+")");(t(c)||t(d))&&a.push("scale("+p(c,1)+" "+p(d,1)+")");a.length&&w(this.element,"transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,b,c){var d,e,f,g,h={};e=this.renderer;f=e.alignedObjects;if(a){if(this.alignOptions=a,this.alignByTranslate=b,!c||da(c))this.alignTo=d=c||"renderer",fa(f,this),f.push(this),c=null}else a=this.alignOptions,b=this.alignByTranslate,d=this.alignTo;c=p(c,e[d],e);d=a.align;e=a.verticalAlign;f=(c.x||
0)+(a.x||0);g=(c.y||0)+(a.y||0);if(d==="right"||d==="center")f+=(c.width-(a.width||0))/{right:1,center:2}[d];h[b?"translateX":"x"]=s(f);if(e==="bottom"||e==="middle")g+=(c.height-(a.height||0))/({bottom:1,middle:2}[e]||1);h[b?"translateY":"y"]=s(g);this[this.placed?"animate":"attr"](h);this.placed=!0;this.alignAttr=h;return this},getBBox:function(){var a=this.bBox,b=this.renderer,c,d=this.rotation;c=this.element;var e=this.styles,f=d*Ua;if(!a){if(c.namespaceURI===wa||b.forExport){try{a=c.getBBox?
r({},c.getBBox()):{width:c.offsetWidth,height:c.offsetHeight}}catch(g){}if(!a||a.width<0)a={width:0,height:0}}else a=this.htmlGetBBox();if(b.isSVG){b=a.width;c=a.height;if(qa&&e&&e.fontSize==="11px"&&c.toPrecision(3)==="22.7")a.height=c=14;if(d)a.width=P(c*ba(f))+P(b*V(f)),a.height=P(c*V(f))+P(b*ba(f))}this.bBox=a}return a},show:function(){return this.attr({visibility:"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var b=this;b.animate({opacity:0},{duration:a||
150,complete:function(){b.hide()}})},add:function(a){var b=this.renderer,c=a||b,d=c.element||b.box,e=d.childNodes,f=this.element,g=w(f,"zIndex"),h;if(a)this.parentGroup=a;this.parentInverted=a&&a.inverted;this.textStr!==void 0&&b.buildText(this);if(g)c.handleZ=!0,g=A(g);if(c.handleZ)for(c=0;c<e.length;c++)if(a=e[c],b=w(a,"zIndex"),a!==f&&(A(b)>g||!t(g)&&t(b))){d.insertBefore(f,a);h=!0;break}h||d.appendChild(f);this.added=!0;C(this,"add");return this},safeRemoveChild:function(a){var b=a.parentNode;
b&&b.removeChild(a)},destroy:function(){var a=this,b=a.element||{},c=a.shadows,d=a.renderer.isSVG&&b.nodeName==="SPAN"&&b.parentNode,e,f;b.onclick=b.onmouseout=b.onmouseover=b.onmousemove=b.point=null;Wa(a);if(a.clipPath)a.clipPath=a.clipPath.destroy();if(a.stops){for(f=0;f<a.stops.length;f++)a.stops[f]=a.stops[f].destroy();a.stops=null}a.safeRemoveChild(b);for(c&&n(c,function(b){a.safeRemoveChild(b)});d&&d.childNodes.length===0;)b=d.parentNode,a.safeRemoveChild(d),d=b;a.alignTo&&fa(a.renderer.alignedObjects,
a);for(e in a)delete a[e];return null},shadow:function(a,b,c){var d=[],e,f,g=this.element,h,i,j,k;if(a){i=p(a.width,3);j=(a.opacity||0.15)/i;k=this.parentInverted?"(-1,-1)":"("+p(a.offsetX,1)+", "+p(a.offsetY,1)+")";for(e=1;e<=i;e++){f=g.cloneNode(0);h=i*2+1-2*e;w(f,{isShadow:"true",stroke:a.color||"black","stroke-opacity":j*e,"stroke-width":h,transform:"translate"+k,fill:R});if(c)w(f,"height",u(w(f,"height")-h,0)),f.cutHeight=h;b?b.element.appendChild(f):g.parentNode.insertBefore(f,g);d.push(f)}this.shadows=
d}return this}};var Fa=function(){this.init.apply(this,arguments)};Fa.prototype={Element:va,init:function(a,b,c,d){var e=location,f,g;f=this.createElement("svg").attr({version:"1.1"});g=f.element;a.appendChild(g);a.innerHTML.indexOf("xmlns")===-1&&w(g,"xmlns",wa);this.isSVG=!0;this.box=g;this.boxWrapper=f;this.alignedObjects=[];this.url=(gb||fb)&&z.getElementsByTagName("base").length?e.href.replace(/#.*?$/,"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(z.createTextNode("Created with Highcharts 3.0.4"));
this.defs=this.createElement("defs").add();this.forExport=d;this.gradients={};this.setSize(b,c,!1);var h;if(gb&&a.getBoundingClientRect)this.subPixelFix=b=function(){M(a,{left:0,top:0});h=a.getBoundingClientRect();M(a,{left:ja(h.left)-h.left+"px",top:ja(h.top)-h.top+"px"})},b(),J(E,"resize",b)},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();Ja(this.gradients||{});this.gradients=null;if(a)this.defs=
a.destroy();this.subPixelFix&&aa(E,"resize",this.subPixelFix);return this.alignedObjects=null},createElement:function(a){var b=new this.Element;b.init(this,a);return b},draw:function(){},buildText:function(a){for(var b=a.element,c=this,d=c.forExport,e=p(a.textStr,"").toString().replace(/<(b|strong)>/g,'<span style="font-weight:bold">').replace(/<(i|em)>/g,'<span style="font-style:italic">').replace(/<a/g,"<span").replace(/<\/(b|strong|i|em|a)>/g,"</span>").split(/<br.*?>/g),f=b.childNodes,g=/style="([^"]+)"/,
h=/href="(http[^"]+)"/,i=w(b,"x"),j=a.styles,k=j&&j.width&&A(j.width),l=j&&j.lineHeight,m=f.length;m--;)b.removeChild(f[m]);k&&!a.added&&this.box.appendChild(b);e[e.length-1]===""&&e.pop();n(e,function(e,f){var m,p=0,e=e.replace(/<span/g,"|||<span").replace(/<\/span>/g,"</span>|||");m=e.split("|||");n(m,function(e){if(e!==""||m.length===1){var o={},n=z.createElementNS(wa,"tspan"),t;g.test(e)&&(t=e.match(g)[1].replace(/(;| |^)color([ :])/,"$1fill$2"),w(n,"style",t));h.test(e)&&!d&&(w(n,"onclick",'location.href="'+
e.match(h)[1]+'"'),M(n,{cursor:"pointer"}));e=(e.replace(/<(.|\n)*?>/g,"")||" ").replace(/&lt;/g,"<").replace(/&gt;/g,">");if(e!==" "&&(n.appendChild(z.createTextNode(e)),p?o.dx=0:o.x=i,w(n,o),!p&&f&&(!Y&&d&&M(n,{display:"block"}),w(n,"dy",l||c.fontMetrics(/px$/.test(n.style.fontSize)?n.style.fontSize:j.fontSize).h,fb&&n.offsetHeight)),b.appendChild(n),p++,k))for(var e=e.replace(/([^\^])-/g,"$1- ").split(" "),u,s=[];e.length||s.length;)delete a.bBox,u=a.getBBox().width,o=u>k,!o||e.length===1?(e=s,
s=[],e.length&&(n=z.createElementNS(wa,"tspan"),w(n,{dy:l||16,x:i}),t&&w(n,"style",t),b.appendChild(n),u>k&&(k=u))):(n.removeChild(n.firstChild),s.unshift(e.pop())),e.length&&n.appendChild(z.createTextNode(e.join(" ").replace(/- /g,"-")))}})})},button:function(a,b,c,d,e,f,g){var h=this.label(a,b,c,null,null,null,null,null,"button"),i=0,j,k,l,m,o,a={x1:0,y1:0,x2:0,y2:1},e=x({"stroke-width":1,stroke:"#CCCCCC",fill:{linearGradient:a,stops:[[0,"#FEFEFE"],[1,"#F6F6F6"]]},r:2,padding:5,style:{color:"black"}},
e);l=e.style;delete e.style;f=x(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#FFF"],[1,"#ACF"]]}},f);m=f.style;delete f.style;g=x(e,{stroke:"#68A",fill:{linearGradient:a,stops:[[0,"#9BD"],[1,"#CDF"]]}},g);o=g.style;delete g.style;J(h.element,qa?"mouseover":"mouseenter",function(){h.attr(f).css(m)});J(h.element,qa?"mouseout":"mouseleave",function(){j=[e,f,g][i];k=[l,m,o][i];h.attr(j).css(k)});h.setState=function(a){(i=a)?a===2&&h.attr(g).css(o):h.attr(e).css(l)};return h.on("click",function(){d.call(h)}).attr(e).css(r({cursor:"default"},
l))},crispLine:function(a,b){a[1]===a[4]&&(a[1]=a[4]=s(a[1])-b%2/2);a[2]===a[5]&&(a[2]=a[5]=s(a[2])+b%2/2);return a},path:function(a){var b={fill:R};Ha(a)?b.d=a:U(a)&&r(b,a);return this.createElement("path").attr(b)},circle:function(a,b,c){a=U(a)?a:{x:a,y:b,r:c};return this.createElement("circle").attr(a)},arc:function(a,b,c,d,e,f){if(U(a))b=a.y,c=a.r,d=a.innerR,e=a.start,f=a.end,a=a.x;a=this.symbol("arc",a||0,b||0,c||0,c||0,{innerR:d||0,start:e||0,end:f||0});a.r=c;return a},rect:function(a,b,c,d,
e,f){e=U(a)?a.r:e;e=this.createElement("rect").attr({rx:e,ry:e,fill:R});return e.attr(U(a)?a:e.crisp(f,a,b,u(c,0),u(d,0)))},setSize:function(a,b,c){var d=this.alignedObjects,e=d.length;this.width=a;this.height=b;for(this.boxWrapper[p(c,!0)?"animate":"attr"]({width:a,height:b});e--;)d[e].align()},g:function(a){var b=this.createElement("g");return t(a)?b.attr({"class":"highcharts-"+a}):b},image:function(a,b,c,d,e){var f={preserveAspectRatio:R};arguments.length>1&&r(f,{x:b,y:c,width:d,height:e});f=this.createElement("image").attr(f);
f.element.setAttributeNS?f.element.setAttributeNS("http://www.w3.org/1999/xlink","href",a):f.element.setAttribute("hc-svg-href",a);return f},symbol:function(a,b,c,d,e,f){var g,h=this.symbols[a],h=h&&h(s(b),s(c),d,e,f),i=/^url\((.*?)\)$/,j,k;if(h)g=this.path(h),r(g,{symbolName:a,x:b,y:c,width:d,height:e}),f&&r(g,f);else if(i.test(a))k=function(a,b){a.element&&(a.attr({width:b[0],height:b[1]}),a.alignByTranslate||a.translate(s((d-b[0])/2),s((e-b[1])/2)))},j=a.match(i)[1],a=Pb[j],g=this.image(j).attr({x:b,
y:c}),g.isImg=!0,a?k(g,a):(g.attr({width:0,height:0}),T("img",{onload:function(){k(g,Pb[j]=[this.width,this.height])},src:j}));return g},symbols:{circle:function(a,b,c,d){var e=0.166*c;return["M",a+c/2,b,"C",a+c+e,b,a+c+e,b+d,a+c/2,b+d,"C",a-e,b+d,a-e,b,a+c/2,b,"Z"]},square:function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c,b+d,a,b+d,"Z"]},triangle:function(a,b,c,d){return["M",a+c/2,b,"L",a+c,b+d,a,b+d,"Z"]},"triangle-down":function(a,b,c,d){return["M",a,b,"L",a+c,b,a+c/2,b+d,"Z"]},diamond:function(a,
b,c,d){return["M",a+c/2,b,"L",a+c,b+d/2,a+c/2,b+d,a,b+d/2,"Z"]},arc:function(a,b,c,d,e){var f=e.start,c=e.r||c||d,g=e.end-0.001,d=e.innerR,h=e.open,i=V(f),j=ba(f),k=V(g),g=ba(g),e=e.end-f<Ma?0:1;return["M",a+c*i,b+c*j,"A",c,c,0,e,1,a+c*k,b+c*g,h?"M":"L",a+d*k,b+d*g,"A",d,d,0,e,0,a+d*i,b+d*j,h?"":"Z"]}},clipRect:function(a,b,c,d){var e="highcharts-"+yb++,f=this.createElement("clipPath").attr({id:e}).add(this.defs),a=this.rect(a,b,c,d,0).add(f);a.id=e;a.clipPath=f;return a},color:function(a,b,c){var d=
this,e,f=/^rgba/,g,h,i,j,k,l,m,o=[];a&&a.linearGradient?g="linearGradient":a&&a.radialGradient&&(g="radialGradient");if(g){c=a[g];h=d.gradients;j=a.stops;b=b.radialReference;Ha(c)&&(a[g]=c={x1:c[0],y1:c[1],x2:c[2],y2:c[3],gradientUnits:"userSpaceOnUse"});g==="radialGradient"&&b&&!t(c.gradientUnits)&&(c=x(c,{cx:b[0]-b[2]/2+c.cx*b[2],cy:b[1]-b[2]/2+c.cy*b[2],r:c.r*b[2],gradientUnits:"userSpaceOnUse"}));for(m in c)m!=="id"&&o.push(m,c[m]);for(m in j)o.push(j[m]);o=o.join(",");h[o]?a=h[o].id:(c.id=a=
"highcharts-"+yb++,h[o]=i=d.createElement(g).attr(c).add(d.defs),i.stops=[],n(j,function(a){f.test(a[1])?(e=oa(a[1]),k=e.get("rgb"),l=e.get("a")):(k=a[1],l=1);a=d.createElement("stop").attr({offset:a[0],"stop-color":k,"stop-opacity":l}).add(i);i.stops.push(a)}));return"url("+d.url+"#"+a+")"}else return f.test(a)?(e=oa(a),w(b,c+"-opacity",e.get("a")),e.get("rgb")):(b.removeAttribute(c+"-opacity"),a)},text:function(a,b,c,d){var e=O.chart.style,f=Z||!Y&&this.forExport;if(d&&!this.forExport)return this.html(a,
b,c);b=s(p(b,0));c=s(p(c,0));a=this.createElement("text").attr({x:b,y:c,text:a}).css({fontFamily:e.fontFamily,fontSize:e.fontSize});f&&a.css({position:"absolute"});a.x=b;a.y=c;return a},html:function(a,b,c){var d=O.chart.style,e=this.createElement("span"),f=e.attrSetters,g=e.element,h=e.renderer;f.text=function(a){a!==g.innerHTML&&delete this.bBox;g.innerHTML=a;return!1};f.x=f.y=f.align=function(a,b){b==="align"&&(b="textAlign");e[b]=a;e.htmlUpdateTransform();return!1};e.attr({text:a,x:s(b),y:s(c)}).css({position:"absolute",
whiteSpace:"nowrap",fontFamily:d.fontFamily,fontSize:d.fontSize});e.css=e.htmlCss;if(h.isSVG)e.add=function(a){var b,c=h.box.parentNode,d=[];if(a){if(b=a.div,!b){for(;a;)d.push(a),a=a.parentGroup;n(d.reverse(),function(a){var d;b=a.div=a.div||T(Ba,{className:w(a.element,"class")},{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px"},b||c);d=b.style;r(a.attrSetters,{translateX:function(a){d.left=a+"px"},translateY:function(a){d.top=a+"px"},visibility:function(a,b){d[b]=a}})})}}else b=
c;b.appendChild(g);e.added=!0;e.alignOnAdd&&e.htmlUpdateTransform();return e};return e},fontMetrics:function(a){var a=A(a||11),a=a<24?a+4:s(a*1.2),b=s(a*0.8);return{h:a,b:b}},label:function(a,b,c,d,e,f,g,h,i){function j(){var a,b;a=p.element.style;F=(Oa===void 0||Ga===void 0||q.styles.textAlign)&&p.getBBox();q.width=(Oa||F.width||0)+2*ca+jb;q.height=(Ga||F.height||0)+2*ca;w=ca+o.fontMetrics(a&&a.fontSize).b;if(A){if(!D)a=s(-u*ca),b=h?-w:0,q.box=D=d?o.symbol(d,a,b,q.width,q.height):o.rect(a,b,q.width,
q.height,0,kb[Rb]),D.add(q);D.isImg||D.attr(x({width:q.width,height:q.height},kb));kb=null}}function k(){var a=q.styles,a=a&&a.textAlign,b=jb+ca*(1-u),c;c=h?0:w;if(t(Oa)&&(a==="center"||a==="right"))b+={center:0.5,right:1}[a]*(Oa-F.width);(b!==p.x||c!==p.y)&&p.attr({x:b,y:c});p.x=b;p.y=c}function l(a,b){D?D.attr(a,b):kb[a]=b}function m(){p.add(q);q.attr({text:a,x:b,y:c});D&&t(e)&&q.attr({anchorX:e,anchorY:f})}var o=this,q=o.g(i),p=o.text("",0,0,g).attr({zIndex:1}),D,F,u=0,ca=3,jb=0,Oa,Ga,G,H,B=0,
kb={},w,g=q.attrSetters,A;J(q,"add",m);g.width=function(a){Oa=a;return!1};g.height=function(a){Ga=a;return!1};g.padding=function(a){t(a)&&a!==ca&&(ca=a,k());return!1};g.paddingLeft=function(a){t(a)&&a!==jb&&(jb=a,k());return!1};g.align=function(a){u={left:0,center:0.5,right:1}[a];return!1};g.text=function(a,b){p.attr(b,a);j();k();return!1};g[Rb]=function(a,b){A=!0;B=a%2/2;l(b,a);return!1};g.stroke=g.fill=g.r=function(a,b){b==="fill"&&(A=!0);l(b,a);return!1};g.anchorX=function(a,b){e=a;l(b,a+B-G);
return!1};g.anchorY=function(a,b){f=a;l(b,a-H);return!1};g.x=function(a){q.x=a;a-=u*((Oa||F.width)+ca);G=s(a);q.attr("translateX",G);return!1};g.y=function(a){H=q.y=s(a);q.attr("translateY",H);return!1};var z=q.css;return r(q,{css:function(a){if(a){var b={},a=x(a);n("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration".split(","),function(c){a[c]!==v&&(b[c]=a[c],delete a[c])});p.css(b)}return z.call(q,a)},getBBox:function(){return{width:F.width+2*ca,height:F.height+2*ca,x:F.x-ca,
y:F.y-ca}},shadow:function(a){D&&D.shadow(a);return q},destroy:function(){aa(q,"add",m);aa(q.element,"mouseenter");aa(q.element,"mouseleave");p&&(p=p.destroy());D&&(D=D.destroy());va.prototype.destroy.call(q);q=o=j=k=l=m=null}})}};Va=Fa;var K;if(!Y&&!Z){Highcharts.VMLElement=K={init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],e=b===Ba;(b==="shape"||e)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",e?"hidden":"visible");c.push(' style="',
d.join(""),'"/>');if(b)c=e||b==="span"||b==="img"?c.join(""):a.prepVML(c),this.element=T(c);this.renderer=a;this.attrSetters={}},add:function(a){var b=this.renderer,c=this.element,d=b.box,d=a?a.element||a:d;a&&a.inverted&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();C(this,"add");return this},updateTransform:va.prototype.htmlUpdateTransform,setSpanRotation:function(a,b,c){M(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",
c,", M12=",-b,", M21=",b,", M22=",c,", sizingMethod='auto expand')"].join(""):R})},attr:function(a,b){var c,d,e,f=this.element||{},g=f.style,h=f.nodeName,i=this.renderer,j=this.symbolName,k,l=this.shadows,m,o=this.attrSetters,q=this;da(a)&&t(b)&&(c=a,a={},a[c]=b);if(da(a))c=a,q=c==="strokeWidth"||c==="stroke-width"?this.strokeweight:this[c];else for(c in a)if(d=a[c],m=!1,e=o[c]&&o[c].call(this,d,c),e!==!1&&d!==null){e!==v&&(d=e);if(j&&/^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))k||
(this.symbolAttr(a),k=!0),m=!0;else if(c==="d"){d=d||[];this.d=d.join(" ");e=d.length;m=[];for(var p;e--;)if(pa(d[e]))m[e]=s(d[e]*10)-5;else if(d[e]==="Z")m[e]="x";else if(m[e]=d[e],d.isArc&&(d[e]==="wa"||d[e]==="at"))p=d[e]==="wa"?1:-1,m[e+5]===m[e+7]&&(m[e+7]-=p),m[e+6]===m[e+8]&&(m[e+8]-=p);d=m.join(" ")||"x";f.path=d;if(l)for(e=l.length;e--;)l[e].path=l[e].cutOff?this.cutOffPath(d,l[e].cutOff):d;m=!0}else if(c==="visibility"){if(l)for(e=l.length;e--;)l[e].style[c]=d;h==="DIV"&&(d=d==="hidden"?
"-999em":0,eb||(g[c]=d?"visible":"hidden"),c="top");g[c]=d;m=!0}else if(c==="zIndex")d&&(g[c]=d),m=!0;else if(na(c,["x","y","width","height"])!==-1)this[c]=d,c==="x"||c==="y"?c={x:"left",y:"top"}[c]:d=u(0,d),this.updateClipping?(this[c]=d,this.updateClipping()):g[c]=d,m=!0;else if(c==="class"&&h==="DIV")f.className=d;else if(c==="stroke")d=i.color(d,f,c),c="strokecolor";else if(c==="stroke-width"||c==="strokeWidth")f.stroked=d?!0:!1,c="strokeweight",this[c]=d,pa(d)&&(d+="px");else if(c==="dashstyle")(f.getElementsByTagName("stroke")[0]||
T(i.prepVML(["<stroke/>"]),null,null,f))[c]=d||"solid",this.dashstyle=d,m=!0;else if(c==="fill")if(h==="SPAN")g.color=d;else{if(h!=="IMG")f.filled=d!==R?!0:!1,d=i.color(d,f,c,this),c="fillcolor"}else if(c==="opacity")m=!0;else if(h==="shape"&&c==="rotation")this[c]=f.style[c]=d,f.style.left=-s(ba(d*Ua)+1)+"px",f.style.top=s(V(d*Ua))+"px";else if(c==="translateX"||c==="translateY"||c==="rotation")this[c]=d,this.updateTransform(),m=!0;else if(c==="text")this.bBox=null,f.innerHTML=d,m=!0;m||(eb?f[c]=
d:w(f,c,d))}return q},clip:function(a){var b=this,c;a?(c=a.members,fa(c,b),c.push(b),b.destroyClip=function(){fa(c,b)},a=a.getCSS(b)):(b.destroyClip&&b.destroyClip(),a={clip:eb?"inherit":"rect(auto)"});return b.css(a)},css:va.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&Ta(a)},destroy:function(){this.destroyClip&&this.destroyClip();return va.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=E.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,
b){var c,a=a.split(/[ ,]/);c=a.length;if(c===9||c===11)a[c-4]=a[c-2]=A(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],e,f=this.element,g=this.renderer,h,i=f.style,j,k=f.path,l,m,o,q;k&&typeof k.value!=="string"&&(k="x");m=k;if(a){o=p(a.width,3);q=(a.opacity||0.15)/o;for(e=1;e<=3;e++){l=o*2+1-2*e;c&&(m=this.cutOffPath(k.value,l+0.5));j=['<shape isShadow="true" strokeweight="',l,'" filled="false" path="',m,'" coordsize="10 10" style="',f.style.cssText,'" />'];h=T(g.prepVML(j),null,
{left:A(i.left)+p(a.offsetX,1),top:A(i.top)+p(a.offsetY,1)});if(c)h.cutOff=l+1;j=['<stroke color="',a.color||"black",'" opacity="',q*e,'"/>'];T(g.prepVML(j),null,null,h);b?b.element.appendChild(h):f.parentNode.insertBefore(h,f);d.push(h)}this.shadows=d}return this}};K=ga(va,K);var la={Element:K,isIE8:Da.indexOf("MSIE 8.0")>-1,init:function(a,b,c){var d,e;this.alignedObjects=[];d=this.createElement(Ba);e=d.element;e.style.position="relative";a.appendChild(d.element);this.isVML=!0;this.box=e;this.boxWrapper=
d;this.setSize(b,c,!1);if(!z.namespaces.hcv)z.namespaces.add("hcv","urn:schemas-microsoft-com:vml"),z.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var e=this.createElement(),f=U(a);return r(e,{members:[],left:f?a.x:a,top:f?a.y:b,width:f?a.width:c,height:f?a.height:d,getCSS:function(a){var b=a.element,c=b.nodeName,a=a.inverted,d=this.top-
(c==="shape"?b.offsetTop:0),e=this.left,b=e+this.width,f=d+this.height,d={clip:"rect("+s(a?e:d)+"px,"+s(a?f:b)+"px,"+s(a?b:f)+"px,"+s(a?d:e)+"px)"};!a&&eb&&c==="DIV"&&r(d,{width:b+"px",height:f+"px"});return d},updateClipping:function(){n(e.members,function(a){a.css(e.getCSS(a))})}})},color:function(a,b,c,d){var e=this,f,g=/^rgba/,h,i,j=R;a&&a.linearGradient?i="gradient":a&&a.radialGradient&&(i="pattern");if(i){var k,l,m=a.linearGradient||a.radialGradient,o,q,p,D,F,u="",a=a.stops,t,s=[],v=function(){h=
['<fill colors="'+s.join(",")+'" opacity="',p,'" o:opacity2="',q,'" type="',i,'" ',u,'focus="100%" method="any" />'];T(e.prepVML(h),null,null,b)};o=a[0];t=a[a.length-1];o[0]>0&&a.unshift([0,o[1]]);t[0]<1&&a.push([1,t[1]]);n(a,function(a,b){g.test(a[1])?(f=oa(a[1]),k=f.get("rgb"),l=f.get("a")):(k=a[1],l=1);s.push(a[0]*100+"% "+k);b?(p=l,D=k):(q=l,F=k)});if(c==="fill")if(i==="gradient")c=m.x1||m[0]||0,a=m.y1||m[1]||0,o=m.x2||m[2]||0,m=m.y2||m[3]||0,u='angle="'+(90-N.atan((m-a)/(o-c))*180/Ma)+'"',v();
else{var j=m.r,r=j*2,G=j*2,H=m.cx,B=m.cy,x=b.radialReference,w,j=function(){x&&(w=d.getBBox(),H+=(x[0]-w.x)/w.width-0.5,B+=(x[1]-w.y)/w.height-0.5,r*=x[2]/w.width,G*=x[2]/w.height);u='src="'+O.global.VMLRadialGradientURL+'" size="'+r+","+G+'" origin="0.5,0.5" position="'+H+","+B+'" color2="'+F+'" ';v()};d.added?j():J(d,"add",j);j=D}else j=k}else if(g.test(a)&&b.tagName!=="IMG")f=oa(a),h=["<",c,' opacity="',f.get("a"),'"/>'],T(this.prepVML(h),null,null,b),j=f.get("rgb");else{j=b.getElementsByTagName(c);
if(j.length)j[0].opacity=1,j[0].type="solid";j=a}return j},prepVML:function(a){var b=this.isIE8,a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=a.indexOf('style="')===-1?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:Fa.prototype.html,path:function(a){var b={coordsize:"10 10"};Ha(a)?b.d=a:U(a)&&r(b,a);return this.createElement("shape").attr(b)},
circle:function(a,b,c){var d=this.symbol("circle");if(U(a))c=a.r,b=a.y,a=a.x;d.isCircle=!0;return d.attr({x:a,y:b,width:2*c,height:2*c})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement(Ba).attr(b)},image:function(a,b,c,d,e){var f=this.createElement("img").attr({src:a});arguments.length>1&&f.attr({x:b,y:c,width:d,height:e});return f},rect:function(a,b,c,d,e,f){if(U(a))b=a.y,c=a.width,d=a.height,f=a.strokeWidth,a=a.x;var g=this.symbol("rect");
g.r=e;return g.attr(g.crisp(f,a,b,u(c,0),u(d,0)))},invertChild:function(a,b){var c=b.style;M(a,{flip:"x",left:A(c.width)-1,top:A(c.height)-1,rotation:-90})},symbols:{arc:function(a,b,c,d,e){var f=e.start,g=e.end,h=e.r||c||d,c=e.innerR,d=V(f),i=ba(f),j=V(g),k=ba(g);if(g-f===0)return["x"];f=["wa",a-h,b-h,a+h,b+h,a+h*d,b+h*i,a+h*j,b+h*k];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*j,b+c*k,a+c*d,b+c*i,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&e.isCircle&&(a-=c/2,
b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){var f=a+c,g=b+d,h;!t(e)||!e.r?f=Fa.prototype.symbols.square.apply(0,arguments):(h=I(e.r,c,d),f=["M",a+h,b,"L",f-h,b,"wa",f-2*h,b,f,b+2*h,f-h,b,f,b+h,"L",f,g-h,"wa",f-2*h,g-2*h,f,g,f,g-h,f-h,g,"L",a+h,g,"wa",a,g-2*h,a+2*h,g,a+h,g,a,g-h,"L",a,b+h,"wa",a,b,a+2*h,b+2*h,a,b+h,a+h,b,"x","e"]);return f}}};Highcharts.VMLRenderer=K=function(){this.init.apply(this,arguments)};K.prototype=x(Fa.prototype,la);Va=K}var Ub;if(Z)Highcharts.CanVGRenderer=
K=function(){wa="http://www.w3.org/1999/xhtml"},K.prototype.symbols={},Ub=function(){function a(){var a=b.length,d;for(d=0;d<a;d++)b[d]();b=[]}var b=[];return{push:function(c,d){b.length===0&&Wb(d,a);b.push(c)}}}(),Va=K;La.prototype={addLabel:function(){var a=this.axis,b=a.options,c=a.chart,d=a.horiz,e=a.categories,f=a.series[0]&&a.series[0].names,g=this.pos,h=b.labels,i=a.tickPositions,d=d&&e&&!h.step&&!h.staggerLines&&!h.rotation&&c.plotWidth/i.length||!d&&(c.optionsMarginLeft||c.chartWidth*0.33),
j=g===i[0],k=g===i[i.length-1],f=e?p(e[g],f&&f[g],g):g,e=this.label,i=i.info,l;a.isDatetimeAxis&&i&&(l=b.dateTimeLabelFormats[i.higherRanks[g]||i.unitName]);this.isFirst=j;this.isLast=k;b=a.labelFormatter.call({axis:a,chart:c,isFirst:j,isLast:k,dateTimeLabelFormat:l,value:a.isLog?ia(ea(f)):f});g=d&&{width:u(1,s(d-2*(h.padding||10)))+"px"};g=r(g,h.style);if(t(e))e&&e.attr({text:b}).css(g);else{d={align:a.labelAlign};if(pa(h.rotation))d.rotation=h.rotation;this.label=t(b)&&h.enabled?c.renderer.text(b,
0,0,h.useHTML).attr(d).css(g).add(a.labelGroup):null}},getLabelSize:function(){var a=this.label,b=this.axis;return a?(this.labelBBox=a.getBBox())[b.horiz?"height":"width"]:0},getLabelSides:function(){var a=this.axis,b=this.labelBBox.width,a=b*{left:0,center:0.5,right:1}[a.labelAlign]-a.options.labels.x;return[-a,b-a]},handleOverflow:function(a,b){var c=!0,d=this.axis,e=d.chart,f=this.isFirst,g=this.isLast,h=b.x,i=d.reversed,j=d.tickPositions;if(f||g){var k=this.getLabelSides(),l=k[0],k=k[1],e=e.plotLeft,
m=e+d.len,j=(d=d.ticks[j[a+(f?1:-1)]])&&d.label.xy&&d.label.xy.x+d.getLabelSides()[f?0:1];f&&!i||g&&i?h+l<e&&(h=e-l,d&&h+k>j&&(c=!1)):h+k>m&&(h=m-k,d&&h+l<j&&(c=!1));b.x=h}return c},getPosition:function(a,b,c,d){var e=this.axis,f=e.chart,g=d&&f.oldChartHeight||f.chartHeight;return{x:a?e.translate(b+c,null,null,d)+e.transB:e.left+e.offset+(e.opposite?(d&&f.oldChartWidth||f.chartWidth)-e.right-e.left:0),y:a?g-e.bottom+e.offset-(e.opposite?e.height:0):g-e.translate(b+c,null,null,d)-e.transB}},getLabelPosition:function(a,
b,c,d,e,f,g,h){var i=this.axis,j=i.transA,k=i.reversed,l=i.staggerLines,m=i.chart.renderer.fontMetrics(e.style.fontSize).b,o=e.rotation,a=a+e.x-(f&&d?f*j*(k?-1:1):0),b=b+e.y-(f&&!d?f*j*(k?1:-1):0);o&&i.side===2&&(b-=m-m*V(o*Ua));!t(e.y)&&!o&&(b+=m-c.getBBox().height/2);l&&(b+=g/(h||1)%l*(i.labelOffset/l));return{x:a,y:b}},getMarkPath:function(a,b,c,d,e,f){return f.crispLine(["M",a,b,"L",a+(e?0:-c),b+(e?c:0)],d)},render:function(a,b,c){var d=this.axis,e=d.options,f=d.chart.renderer,g=d.horiz,h=this.type,
i=this.label,j=this.pos,k=e.labels,l=this.gridLine,m=h?h+"Grid":"grid",o=h?h+"Tick":"tick",q=e[m+"LineWidth"],n=e[m+"LineColor"],D=e[m+"LineDashStyle"],F=e[o+"Length"],m=e[o+"Width"]||0,u=e[o+"Color"],t=e[o+"Position"],o=this.mark,s=k.step,r=!0,w=d.tickmarkOffset,G=this.getPosition(g,j,w,b),H=G.x,G=G.y,B=g&&H===d.pos||!g&&G===d.pos+d.len?-1:1,x=d.staggerLines;this.isActive=!0;if(q){j=d.getPlotLinePath(j+w,q*B,b,!0);if(l===v){l={stroke:n,"stroke-width":q};if(D)l.dashstyle=D;if(!h)l.zIndex=1;if(b)l.opacity=
0;this.gridLine=l=q?f.path(j).attr(l).add(d.gridGroup):null}if(!b&&l&&j)l[this.isNew?"attr":"animate"]({d:j,opacity:c})}if(m&&F)t==="inside"&&(F=-F),d.opposite&&(F=-F),b=this.getMarkPath(H,G,F,m*B,g,f),o?o.animate({d:b,opacity:c}):this.mark=f.path(b).attr({stroke:u,"stroke-width":m,opacity:c}).add(d.axisGroup);if(i&&!isNaN(H))i.xy=G=this.getLabelPosition(H,G,i,g,k,w,a,s),this.isFirst&&!p(e.showFirstLabel,1)||this.isLast&&!p(e.showLastLabel,1)?r=!1:!x&&g&&k.overflow==="justify"&&!this.handleOverflow(a,
G)&&(r=!1),s&&a%s&&(r=!1),r&&!isNaN(G.y)?(G.opacity=c,i[this.isNew?"attr":"animate"](G),this.isNew=!1):i.attr("y",-9999)},destroy:function(){Ja(this,this.axis)}};tb.prototype={render:function(){var a=this,b=a.axis,c=b.horiz,d=(b.pointRange||0)/2,e=a.options,f=e.label,g=a.label,h=e.width,i=e.to,j=e.from,k=t(j)&&t(i),l=e.value,m=e.dashStyle,o=a.svgElem,q=[],n,D=e.color,F=e.zIndex,s=e.events,r=b.chart.renderer;b.isLog&&(j=ma(j),i=ma(i),l=ma(l));if(h){if(q=b.getPlotLinePath(l,h),d={stroke:D,"stroke-width":h},
m)d.dashstyle=m}else if(k){if(j=u(j,b.min-d),i=I(i,b.max+d),q=b.getPlotBandPath(j,i,e),d={fill:D},e.borderWidth)d.stroke=e.borderColor,d["stroke-width"]=e.borderWidth}else return;if(t(F))d.zIndex=F;if(o)q?o.animate({d:q},null,o.onGetPath):(o.hide(),o.onGetPath=function(){o.show()});else if(q&&q.length&&(a.svgElem=o=r.path(q).attr(d).add(),s))for(n in e=function(b){o.on(b,function(c){s[b].apply(a,[c])})},s)e(n);if(f&&t(f.text)&&q&&q.length&&b.width>0&&b.height>0){f=x({align:c&&k&&"center",x:c?!k&&
4:10,verticalAlign:!c&&k&&"middle",y:c?k?16:10:k?6:-4,rotation:c&&!k&&90},f);if(!g)a.label=g=r.text(f.text,0,0,f.useHTML).attr({align:f.textAlign||f.align,rotation:f.rotation,zIndex:F}).css(f.style).add();b=[q[1],q[4],p(q[6],q[1])];q=[q[2],q[5],p(q[7],q[2])];c=Ia(b);k=Ia(q);g.align(f,!1,{x:c,y:k,width:ta(b)-c,height:ta(q)-k});g.show()}else g&&g.hide();return a},destroy:function(){fa(this.axis.plotLinesAndBands,this);delete this.axis;Ja(this)}};Mb.prototype={destroy:function(){Ja(this,this.axis)},
setTotal:function(a){this.cum=this.total=a},addValue:function(a){this.setTotal(ia(this.total+a))},render:function(a){var b=this.options,c=b.format,c=c?Aa(c,this):b.formatter.call(this);this.label?this.label.attr({text:c,visibility:"hidden"}):this.label=this.axis.chart.renderer.text(c,0,0,b.useHTML).css(b.style).attr({align:this.textAlign,rotation:b.rotation,visibility:"hidden"}).add(a)},cacheExtremes:function(a,b){this.points[a.index]=b},setOffset:function(a,b){var c=this.axis,d=c.chart,e=d.inverted,
f=this.isNegative,g=c.translate(this.percent?100:this.total,0,0,0,1),c=c.translate(0),c=P(g-c),h=d.xAxis[0].translate(this.x)+a,i=d.plotHeight,f={x:e?f?g:g-c:h,y:e?i-h-b:f?i-g-c:i-g,width:e?c:b,height:e?b:c};if(e=this.label)e.align(this.alignOptions,null,f),f=e.alignAttr,e.attr({visibility:this.options.crop===!1||d.isInsidePlot(f.x,f.y)?Y?"inherit":"visible":"hidden"})}};db.prototype={defaultOptions:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%e. %b",
week:"%e. %b",month:"%b '%y",year:"%Y"},endOnTick:!1,gridLineColor:"#C0C0C0",labels:L,lineColor:"#C0D0E0",lineWidth:1,minPadding:0.01,maxPadding:0.01,minorGridLineColor:"#E0E0E0",minorGridLineWidth:1,minorTickColor:"#A0A0A0",minorTickLength:2,minorTickPosition:"outside",startOfWeek:1,startOnTick:!1,tickColor:"#C0D0E0",tickLength:5,tickmarkPlacement:"between",tickPixelInterval:100,tickPosition:"outside",tickWidth:1,title:{align:"middle",style:{color:"#4d759e",fontWeight:"bold"}},type:"linear"},defaultYAxisOptions:{endOnTick:!0,
gridLineWidth:1,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8,y:3},lineWidth:0,maxPadding:0.05,minPadding:0.05,startOnTick:!0,tickWidth:0,title:{rotation:270,text:"Values"},stackLabels:{enabled:!1,formatter:function(){return ya(this.total,-1)},style:L.style}},defaultLeftAxisOptions:{labels:{x:-8,y:null},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:8,y:null},title:{rotation:90}},defaultBottomAxisOptions:{labels:{x:0,y:14},title:{rotation:0}},defaultTopAxisOptions:{labels:{x:0,y:-5},
title:{rotation:0}},init:function(a,b){var c=b.isX;this.horiz=a.inverted?!c:c;this.xOrY=(this.isXAxis=c)?"x":"y";this.opposite=b.opposite;this.side=this.horiz?this.opposite?0:2:this.opposite?1:3;this.setOptions(b);var d=this.options,e=d.type;this.labelFormatter=d.labels.formatter||this.defaultLabelFormatter;this.userOptions=b;this.minPixelPadding=0;this.chart=a;this.reversed=d.reversed;this.zoomEnabled=d.zoomEnabled!==!1;this.categories=d.categories||e==="category";this.isLog=e==="logarithmic";this.isDatetimeAxis=
e==="datetime";this.isLinked=t(d.linkedTo);this.tickmarkOffset=this.categories&&d.tickmarkPlacement==="between"?0.5:0;this.ticks={};this.minorTicks={};this.plotLinesAndBands=[];this.alternateBands={};this.len=0;this.minRange=this.userMinRange=d.minRange||d.maxZoom;this.range=d.range;this.offset=d.offset||0;this.stacks={};this.oldStacks={};this.stacksMax={};this._stacksTouched=0;this.min=this.max=null;var f,d=this.options.events;na(this,a.axes)===-1&&(a.axes.push(this),a[c?"xAxis":"yAxis"].push(this));
this.series=this.series||[];if(a.inverted&&c&&this.reversed===v)this.reversed=!0;this.removePlotLine=this.removePlotBand=this.removePlotBandOrLine;for(f in d)J(this,f,d[f]);if(this.isLog)this.val2lin=ma,this.lin2val=ea},setOptions:function(a){this.options=x(this.defaultOptions,this.isXAxis?{}:this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(O[this.isXAxis?"xAxis":"yAxis"],a))},update:function(a,
b){var c=this.chart,a=c.options[this.xOrY+"Axis"][this.options.index]=x(this.userOptions,a);this.destroy(!0);this._addedPlotLB=!1;this.init(c,r(a,{events:v}));c.isDirtyBox=!0;p(b,!0)&&c.redraw()},remove:function(a){var b=this.chart,c=this.xOrY+"Axis";n(this.series,function(a){a.remove(!1)});fa(b.axes,this);fa(b[c],this);b.options[c].splice(this.options.index,1);n(b[c],function(a,b){a.options.index=b});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw()},defaultLabelFormatter:function(){var a=this.axis,
b=this.value,c=a.categories,d=this.dateTimeLabelFormat,e=O.lang.numericSymbols,f=e&&e.length,g,h=a.options.labels.format,a=a.isLog?b:a.tickInterval;if(h)g=Aa(h,this);else if(c)g=b;else if(d)g=Xa(d,b);else if(f&&a>=1E3)for(;f--&&g===v;)c=Math.pow(1E3,f+1),a>=c&&e[f]!==null&&(g=ya(b/c,-1)+e[f]);g===v&&(g=b>=1E3?ya(b,0):ya(b,-1));return g},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=null;a.stacksMax={};a.buildStacks();n(a.series,function(c){if(c.visible||
!b.options.chart.ignoreHiddenSeries){var d=c.options,e;e=d.threshold;a.hasVisibleSeries=!0;a.isLog&&e<=0&&(e=null);if(a.isXAxis){if(e=c.xData,e.length)a.dataMin=I(p(a.dataMin,e[0]),Ia(e)),a.dataMax=u(p(a.dataMax,e[0]),ta(e))}else{d=d.stacking;a.usePercentage=d==="percent";if(a.usePercentage)a.dataMin=0,a.dataMax=99;c.getExtremes();d=c.dataMax;c=c.dataMin;if(!a.usePercentage&&t(c)&&t(d))a.dataMin=I(p(a.dataMin,c),c),a.dataMax=u(p(a.dataMax,d),d);if(t(e))if(a.dataMin>=e)a.dataMin=e,a.ignoreMinPadding=
!0;else if(a.dataMax<e)a.dataMax=e,a.ignoreMaxPadding=!0}}})},translate:function(a,b,c,d,e,f){var g=this.len,h=1,i=0,j=d?this.oldTransA:this.transA,d=d?this.oldMin:this.min,k=this.minPixelPadding,e=(this.options.ordinal||this.isLog&&e)&&this.lin2val;if(!j)j=this.transA;c&&(h*=-1,i=g);this.reversed&&(h*=-1,i-=h*g);b?(a=a*h+i,a-=k,a=a/j+d,e&&(a=this.lin2val(a))):(e&&(a=this.val2lin(a)),f==="between"&&(f=0.5),a=h*(a-d)*j+i+h*k+(pa(f)?j*f*this.pointRange:0));return a},toPixels:function(a,b){return this.translate(a,
!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a,b,c,d){var e=this.chart,f=this.left,g=this.top,h,i,j,a=this.translate(a,null,null,c),k=c&&e.oldChartHeight||e.chartHeight,l=c&&e.oldChartWidth||e.chartWidth,m;h=this.transB;c=i=s(a+h);h=j=s(k-a-h);if(isNaN(a))m=!0;else if(this.horiz){if(h=g,j=k-this.bottom,c<f||c>f+this.width)m=!0}else if(c=f,i=l-this.right,h<g||h>g+this.height)m=!0;return m&&!d?
null:e.renderer.crispLine(["M",c,h,"L",i,j],b||0)},getPlotBandPath:function(a,b){var c=this.getPlotLinePath(b),d=this.getPlotLinePath(a);d&&c?d.push(c[4],c[5],c[1],c[2]):d=null;return d},getLinearTickPositions:function(a,b,c){for(var d,b=ia(S(b/a)*a),c=ia(ja(c/a)*a),e=[];b<=c;){e.push(b);b=ia(b+a);if(b===d)break;d=b}return e},getLogTickPositions:function(a,b,c,d){var e=this.options,f=this.len,g=[];if(!d)this._minorAutoInterval=null;if(a>=0.5)a=s(a),g=this.getLinearTickPositions(a,b,c);else if(a>=
0.08)for(var f=S(b),h,i,j,k,l,e=a>0.3?[1,2,4]:a>0.15?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];f<c+1&&!l;f++){i=e.length;for(h=0;h<i&&!l;h++)j=ma(ea(f)*e[h]),j>b&&(!d||k<=c)&&g.push(k),k>c&&(l=!0),k=j}else if(b=ea(b),c=ea(c),a=e[d?"minorTickInterval":"tickInterval"],a=p(a==="auto"?null:a,this._minorAutoInterval,(c-b)*(e.tickPixelInterval/(d?5:1))/((d?f/this.tickPositions.length:f)||1)),a=mb(a,null,lb(a)),g=Na(this.getLinearTickPositions(a,b,c),ma),!d)this._minorAutoInterval=a/5;if(!d)this.tickInterval=a;return g},
getMinorTickPositions:function(){var a=this.options,b=this.tickPositions,c=this.minorTickInterval,d=[],e;if(this.isLog){e=b.length;for(a=1;a<e;a++)d=d.concat(this.getLogTickPositions(c,b[a-1],b[a],!0))}else if(this.isDatetimeAxis&&a.minorTickInterval==="auto")d=d.concat(Eb(Cb(c),this.min,this.max,a.startOfWeek)),d[0]<this.min&&d.shift();else for(b=this.min+(b[0]-this.min)%c;b<=this.max;b+=c)d.push(b);return d},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,e=this.dataMax-
this.dataMin>=this.minRange,f,g,h,i,j;if(this.isXAxis&&this.minRange===v&&!this.isLog)t(a.min)||t(a.max)?this.minRange=null:(n(this.series,function(a){i=a.xData;for(g=j=a.xIncrement?1:i.length-1;g>0;g--)if(h=i[g]-i[g-1],f===v||h<f)f=h}),this.minRange=I(f*5,this.dataMax-this.dataMin));if(c-b<this.minRange){var k=this.minRange;d=(k-c+b)/2;d=[b-d,p(a.min,b-d)];if(e)d[2]=this.dataMin;b=ta(d);c=[b+k,p(a.max,b+k)];if(e)c[2]=this.dataMax;c=Ia(c);c-b<k&&(d[0]=c-k,d[1]=p(a.min,c-k),b=ta(d))}this.min=b;this.max=
c},setAxisTranslation:function(a){var b=this.max-this.min,c=0,d,e=0,f=0,g=this.linkedParent,h=this.transA;if(this.isXAxis)g?(e=g.minPointOffset,f=g.pointRangePadding):n(this.series,function(a){var g=a.pointRange,h=a.options.pointPlacement,l=a.closestPointRange;g>b&&(g=0);c=u(c,g);e=u(e,da(h)?0:g/2);f=u(f,h==="on"?0:g);!a.noSharedTooltip&&t(l)&&(d=t(d)?I(d,l):l)}),g=this.ordinalSlope&&d?this.ordinalSlope/d:1,this.minPointOffset=e*=g,this.pointRangePadding=f*=g,this.pointRange=I(c,b),this.closestPointRange=
d;if(a)this.oldTransA=h;this.translationSlope=this.transA=h=this.len/(b+f||1);this.transB=this.horiz?this.left:this.bottom;this.minPixelPadding=h*e},setTickPositions:function(a){var b=this,c=b.chart,d=b.options,e=b.isLog,f=b.isDatetimeAxis,g=b.isXAxis,h=b.isLinked,i=b.options.tickPositioner,j=d.maxPadding,k=d.minPadding,l=d.tickInterval,m=d.minTickInterval,o=d.tickPixelInterval,q=b.categories;h?(b.linkedParent=c[g?"xAxis":"yAxis"][d.linkedTo],c=b.linkedParent.getExtremes(),b.min=p(c.min,c.dataMin),
b.max=p(c.max,c.dataMax),d.type!==b.linkedParent.options.type&&ua(11,1)):(b.min=p(b.userMin,d.min,b.dataMin),b.max=p(b.userMax,d.max,b.dataMax));if(e)!a&&I(b.min,p(b.dataMin,b.min))<=0&&ua(10,1),b.min=ia(ma(b.min)),b.max=ia(ma(b.max));if(b.range&&(b.userMin=b.min=u(b.min,b.max-b.range),b.userMax=b.max,a))b.range=null;b.beforePadding&&b.beforePadding();b.adjustForMinRange();if(!q&&!b.usePercentage&&!h&&t(b.min)&&t(b.max)&&(c=b.max-b.min)){if(!t(d.min)&&!t(b.userMin)&&k&&(b.dataMin<0||!b.ignoreMinPadding))b.min-=
c*k;if(!t(d.max)&&!t(b.userMax)&&j&&(b.dataMax>0||!b.ignoreMaxPadding))b.max+=c*j}b.tickInterval=b.min===b.max||b.min===void 0||b.max===void 0?1:h&&!l&&o===b.linkedParent.options.tickPixelInterval?b.linkedParent.tickInterval:p(l,q?1:(b.max-b.min)*o/(b.len||1));g&&!a&&n(b.series,function(a){a.processData(b.min!==b.oldMin||b.max!==b.oldMax)});b.setAxisTranslation(!0);b.beforeSetTickPositions&&b.beforeSetTickPositions();if(b.postProcessTickInterval)b.tickInterval=b.postProcessTickInterval(b.tickInterval);
if(b.pointRange)b.tickInterval=u(b.pointRange,b.tickInterval);if(!l&&b.tickInterval<m)b.tickInterval=m;if(!f&&!e&&!l)b.tickInterval=mb(b.tickInterval,null,lb(b.tickInterval),d);b.minorTickInterval=d.minorTickInterval==="auto"&&b.tickInterval?b.tickInterval/5:d.minorTickInterval;b.tickPositions=a=d.tickPositions?[].concat(d.tickPositions):i&&i.apply(b,[b.min,b.max]);if(!a)a=f?(b.getNonLinearTimeTicks||Eb)(Cb(b.tickInterval,d.units),b.min,b.max,d.startOfWeek,b.ordinalPositions,b.closestPointRange,!0):
e?b.getLogTickPositions(b.tickInterval,b.min,b.max):b.getLinearTickPositions(b.tickInterval,b.min,b.max),b.tickPositions=a;if(!h)e=a[0],f=a[a.length-1],h=b.minPointOffset||0,d.startOnTick?b.min=e:b.min-h>e&&a.shift(),d.endOnTick?b.max=f:b.max+h<f&&a.pop(),a.length===1&&(b.min-=0.001,b.max+=0.001)},setMaxTicks:function(){var a=this.chart,b=a.maxTicks||{},c=this.tickPositions,d=this._maxTicksKey=[this.xOrY,this.pos,this.len].join("-");if(!this.isLinked&&!this.isDatetimeAxis&&c&&c.length>(b[d]||0)&&
this.options.alignTicks!==!1)b[d]=c.length;a.maxTicks=b},adjustTickAmount:function(){var a=this._maxTicksKey,b=this.tickPositions,c=this.chart.maxTicks;if(c&&c[a]&&!this.isDatetimeAxis&&!this.categories&&!this.isLinked&&this.options.alignTicks!==!1){var d=this.tickAmount,e=b.length;this.tickAmount=a=c[a];if(e<a){for(;b.length<a;)b.push(ia(b[b.length-1]+this.tickInterval));this.transA*=(e-1)/(a-1);this.max=b[b.length-1]}if(t(d)&&a!==d)this.isDirty=!0}},setScale:function(){var a=this.stacks,b,c,d,e;
this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();e=this.len!==this.oldAxisLength;n(this.series,function(a){if(a.isDirtyData||a.isDirty||a.xAxis.isDirty)d=!0});if(e||d||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax){if(!this.isXAxis)for(b in a)for(c in a[b])a[b][c].total=null;this.forceRedraw=!1;this.getSeriesExtremes();this.setTickPositions();this.oldUserMin=this.userMin;this.oldUserMax=this.userMax;if(!this.isDirty)this.isDirty=
e||this.min!==this.oldMin||this.max!==this.oldMax}else if(!this.isXAxis){if(this.oldStacks)a=this.stacks=this.oldStacks;for(b in a)for(c in a[b])a[b][c].cum=a[b][c].total}this.setMaxTicks()},setExtremes:function(a,b,c,d,e){var f=this,g=f.chart,c=p(c,!0),e=r(e,{min:a,max:b});C(f,"setExtremes",e,function(){f.userMin=a;f.userMax=b;f.isDirtyExtremes=!0;c&&g.redraw(d)})},zoom:function(a,b){this.allowZoomOutside||(t(this.dataMin)&&a<=this.dataMin&&(a=v),t(this.dataMax)&&b>=this.dataMax&&(b=v));this.displayBtn=
a!==v||b!==v;this.setExtremes(a,b,!1,v,{trigger:"zoom"});return!0},setAxisSize:function(){var a=this.chart,b=this.options,c=b.offsetLeft||0,d=b.offsetRight||0,e=this.horiz,f,g;this.left=g=p(b.left,a.plotLeft+c);this.top=f=p(b.top,a.plotTop);this.width=c=p(b.width,a.plotWidth-c+d);this.height=b=p(b.height,a.plotHeight);this.bottom=a.chartHeight-b-f;this.right=a.chartWidth-c-g;this.len=u(e?c:b,0);this.pos=e?g:f},getExtremes:function(){var a=this.isLog;return{min:a?ia(ea(this.min)):this.min,max:a?ia(ea(this.max)):
this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var b=this.isLog,c=b?ea(this.min):this.min,b=b?ea(this.max):this.max;c>a||a===null?a=c:b<a&&(a=b);return this.translate(a,0,1,0,1)},addPlotBand:function(a){this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){this.addPlotBandOrLine(a,"plotLines")},addPlotBandOrLine:function(a,b){var c=(new tb(this,a)).render(),d=this.userOptions;b&&(d[b]=d[b]||[],d[b].push(a));this.plotLinesAndBands.push(c);
return c},autoLabelAlign:function(a){a=(p(a,0)-this.side*90+720)%360;return a>15&&a<165?"right":a>195&&a<345?"left":"center"},getOffset:function(){var a=this,b=a.chart,c=b.renderer,d=a.options,e=a.tickPositions,f=a.ticks,g=a.horiz,h=a.side,i=b.inverted?[1,0,3,2][h]:h,j,k=0,l,m=0,o=d.title,q=d.labels,ka=0,D=b.axisOffset,F=b.clipOffset,s=[-1,1,1,-1][h],r,w=1,x=p(q.maxStaggerLines,5),Ga,G,H,B;a.hasData=j=a.hasVisibleSeries||t(a.min)&&t(a.max)&&!!e;a.showAxis=b=j||p(d.showEmpty,!0);a.staggerLines=a.horiz&&
q.staggerLines;if(!a.axisGroup)a.gridGroup=c.g("grid").attr({zIndex:d.gridZIndex||1}).add(),a.axisGroup=c.g("axis").attr({zIndex:d.zIndex||2}).add(),a.labelGroup=c.g("axis-labels").attr({zIndex:q.zIndex||7}).add();if(j||a.isLinked){a.labelAlign=p(q.align||a.autoLabelAlign(q.rotation));n(e,function(b){f[b]?f[b].addLabel():f[b]=new La(a,b)});if(a.horiz&&!a.staggerLines&&x&&!q.rotation){for(r=a.reversed?[].concat(e).reverse():e;w<x;){j=[];Ga=!1;for(q=0;q<r.length;q++)G=r[q],H=(H=f[G].label&&f[G].label.bBox)?
H.width:0,B=q%w,H&&(G=a.translate(G),j[B]!==v&&G<j[B]&&(Ga=!0),j[B]=G+H);if(Ga)w++;else break}if(w>1)a.staggerLines=w}n(e,function(b){if(h===0||h===2||{1:"left",3:"right"}[h]===a.labelAlign)ka=u(f[b].getLabelSize(),ka)});if(a.staggerLines)ka*=a.staggerLines,a.labelOffset=ka}else for(r in f)f[r].destroy(),delete f[r];if(o&&o.text&&o.enabled!==!1){if(!a.axisTitle)a.axisTitle=c.text(o.text,0,0,o.useHTML).attr({zIndex:7,rotation:o.rotation||0,align:o.textAlign||{low:"left",middle:"center",high:"right"}[o.align]}).css(o.style).add(a.axisGroup),
a.axisTitle.isNew=!0;if(b)k=a.axisTitle.getBBox()[g?"height":"width"],m=p(o.margin,g?5:10),l=o.offset;a.axisTitle[b?"show":"hide"]()}a.offset=s*p(d.offset,D[h]);a.axisTitleMargin=p(l,ka+m+(h!==2&&ka&&s*d.labels[g?"y":"x"]));D[h]=u(D[h],a.axisTitleMargin+k+s*a.offset);F[i]=u(F[i],d.lineWidth)},getLinePath:function(a){var b=this.chart,c=this.opposite,d=this.offset,e=this.horiz,f=this.left+(c?this.width:0)+d;this.lineTop=d=b.chartHeight-this.bottom-(c?this.height:0)+d;c||(a*=-1);return b.renderer.crispLine(["M",
e?this.left:f,e?d:this.top,"L",e?b.chartWidth-this.right:f,e?d:b.chartHeight-this.bottom],a)},getTitlePosition:function(){var a=this.horiz,b=this.left,c=this.top,d=this.len,e=this.options.title,f=a?b:c,g=this.opposite,h=this.offset,i=A(e.style.fontSize||12),d={low:f+(a?0:d),middle:f+d/2,high:f+(a?d:0)}[e.align],b=(a?c+this.height:b)+(a?1:-1)*(g?-1:1)*this.axisTitleMargin+(this.side===2?i:0);return{x:a?d:b+(g?this.width:0)+h+(e.x||0),y:a?b-(g?this.height:0)+h:d+(e.y||0)}},render:function(){var a=this,
b=a.chart,c=b.renderer,d=a.options,e=a.isLog,f=a.isLinked,g=a.tickPositions,h=a.axisTitle,i=a.stacks,j=a.ticks,k=a.minorTicks,l=a.alternateBands,m=d.stackLabels,o=d.alternateGridColor,q=a.tickmarkOffset,p=d.lineWidth,D,F=b.hasRendered&&t(a.oldMin)&&!isNaN(a.oldMin);D=a.hasData;var u=a.showAxis,s,r;n([j,k,l],function(a){for(var b in a)a[b].isActive=!1});if(D||f)if(a.minorTickInterval&&!a.categories&&n(a.getMinorTickPositions(),function(b){k[b]||(k[b]=new La(a,b,"minor"));F&&k[b].isNew&&k[b].render(null,
!0);k[b].render(null,!1,1)}),g.length&&(n(g.slice(1).concat([g[0]]),function(b,c){c=c===g.length-1?0:c+1;if(!f||b>=a.min&&b<=a.max)j[b]||(j[b]=new La(a,b)),F&&j[b].isNew&&j[b].render(c,!0),j[b].render(c,!1,1)}),q&&a.min===0&&(j[-1]||(j[-1]=new La(a,-1,null,!0)),j[-1].render(-1))),o&&n(g,function(b,c){if(c%2===0&&b<a.max)l[b]||(l[b]=new tb(a)),s=b+q,r=g[c+1]!==v?g[c+1]+q:a.max,l[b].options={from:e?ea(s):s,to:e?ea(r):r,color:o},l[b].render(),l[b].isActive=!0}),!a._addedPlotLB)n((d.plotLines||[]).concat(d.plotBands||
[]),function(b){a.addPlotBandOrLine(b)}),a._addedPlotLB=!0;n([j,k,l],function(a){var c,d,e=[],f=Ca?Ca.duration||500:0,g=function(){for(d=e.length;d--;)a[e[d]]&&!a[e[d]].isActive&&(a[e[d]].destroy(),delete a[e[d]])};for(c in a)if(!a[c].isActive)a[c].render(c,!1,0),a[c].isActive=!1,e.push(c);a===l||!b.hasRendered||!f?g():f&&setTimeout(g,f)});if(p)D=a.getLinePath(p),a.axisLine?a.axisLine.animate({d:D}):a.axisLine=c.path(D).attr({stroke:d.lineColor,"stroke-width":p,zIndex:7}).add(a.axisGroup),a.axisLine[u?
"show":"hide"]();if(h&&u)h[h.isNew?"attr":"animate"](a.getTitlePosition()),h.isNew=!1;if(m&&m.enabled){var w,x,d=a.stackTotalGroup;if(!d)a.stackTotalGroup=d=c.g("stack-labels").attr({visibility:"visible",zIndex:6}).add();d.translate(b.plotLeft,b.plotTop);for(w in i)for(x in c=i[w],c)c[x].render(d)}a.isDirty=!1},removePlotBandOrLine:function(a){for(var b=this.plotLinesAndBands,c=this.options,d=this.userOptions,e=b.length;e--;)b[e].id===a&&b[e].destroy();n([c.plotLines||[],d.plotLines||[],c.plotBands||
[],d.plotBands||[]],function(b){for(e=b.length;e--;)b[e].id===a&&fa(b,b[e])})},setTitle:function(a,b){this.update({title:a},b)},redraw:function(){var a=this.chart.pointer;a.reset&&a.reset(!0);this.render();n(this.plotLinesAndBands,function(a){a.render()});n(this.series,function(a){a.isDirty=!0})},buildStacks:function(){this.isXAxis||n(this.series,function(a){a.setStackedPoints()})},setCategories:function(a,b){this.update({categories:a},b)},destroy:function(a){var b=this,c=b.stacks,d,e=b.plotLinesAndBands;
a||aa(b);for(d in c)Ja(c[d]),c[d]=null;n([b.ticks,b.minorTicks,b.alternateBands],function(a){Ja(a)});for(a=e.length;a--;)e[a].destroy();n("stackTotalGroup,axisLine,axisGroup,gridGroup,labelGroup,axisTitle".split(","),function(a){b[a]&&(b[a]=b[a].destroy())})}};ub.prototype={init:function(a,b){var c=b.borderWidth,d=b.style,e=A(d.padding);this.chart=a;this.options=b;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.label=a.renderer.label("",0,0,b.shape,null,null,b.useHTML,null,"tooltip").attr({padding:e,
fill:b.backgroundColor,"stroke-width":c,r:b.borderRadius,zIndex:8}).css(d).css({padding:0}).hide().add();Z||this.label.shadow(b.shadow);this.shared=b.shared},destroy:function(){n(this.crosshairs,function(a){a&&a.destroy()});if(this.label)this.label=this.label.destroy();clearTimeout(this.hideTimer);clearTimeout(this.tooltipTimeout)},move:function(a,b,c,d){var e=this,f=e.now,g=e.options.animation!==!1&&!e.isHidden;r(f,{x:g?(2*f.x+a)/3:a,y:g?(f.y+b)/2:b,anchorX:g?(2*f.anchorX+c)/3:c,anchorY:g?(f.anchorY+
d)/2:d});e.label.attr(f);if(g&&(P(a-f.x)>1||P(b-f.y)>1))clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){e&&e.move(a,b,c,d)},32)},hide:function(){var a=this,b;clearTimeout(this.hideTimer);if(!this.isHidden)b=this.chart.hoverPoints,this.hideTimer=setTimeout(function(){a.label.fadeOut();a.isHidden=!0},p(this.options.hideDelay,500)),b&&n(b,function(a){a.setState()}),this.chart.hoverPoints=null},hideCrosshairs:function(){n(this.crosshairs,function(a){a&&a.hide()})},getAnchor:function(a,
b){var c,d=this.chart,e=d.inverted,f=d.plotTop,g=0,h=0,i,a=ha(a);c=a[0].tooltipPos;this.followPointer&&b&&(b.chartX===v&&(b=d.pointer.normalize(b)),c=[b.chartX-d.plotLeft,b.chartY-f]);c||(n(a,function(a){i=a.series.yAxis;g+=a.plotX;h+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+(!e&&i?i.top-f:0)}),g/=a.length,h/=a.length,c=[e?d.plotWidth-h:g,this.shared&&!e&&a.length>1&&b?b.chartY-f:e?d.plotHeight-g:h]);return Na(c,s)},getPosition:function(a,b,c){var d=this.chart,e=d.plotLeft,f=d.plotTop,g=d.plotWidth,
h=d.plotHeight,i=p(this.options.distance,12),j=c.plotX,c=c.plotY,d=j+e+(d.inverted?i:-a-i),k=c-b+f+15,l;d<7&&(d=e+u(j,0)+i);d+a>e+g&&(d-=d+a-(e+g),k=c-b+f-i,l=!0);k<f+5&&(k=f+5,l&&c>=k&&c<=k+b&&(k=c+f+i));k+b>f+h&&(k=u(f,f+h-b-i));return{x:d,y:k}},defaultFormatter:function(a){var b=this.points||ha(this),c=b[0].series,d;d=[c.tooltipHeaderFormatter(b[0])];n(b,function(a){c=a.series;d.push(c.tooltipFormatter&&c.tooltipFormatter(a)||a.point.tooltipFormatter(c.tooltipOptions.pointFormat))});d.push(a.options.footerFormat||
"");return d.join("")},refresh:function(a,b){var c=this.chart,d=this.label,e=this.options,f,g,h,i={},j,k=[];j=e.formatter||this.defaultFormatter;var i=c.hoverPoints,l,m=e.crosshairs;h=this.shared;clearTimeout(this.hideTimer);this.followPointer=ha(a)[0].series.tooltipOptions.followPointer;g=this.getAnchor(a,b);f=g[0];g=g[1];h&&(!a.series||!a.series.noSharedTooltip)?(c.hoverPoints=a,i&&n(i,function(a){a.setState()}),n(a,function(a){a.setState("hover");k.push(a.getLabelConfig())}),i={x:a[0].category,
y:a[0].y},i.points=k,a=a[0]):i=a.getLabelConfig();j=j.call(i,this);i=a.series;h=h||!i.isCartesian||i.tooltipOutsidePlot||c.isInsidePlot(f,g);j===!1||!h?this.hide():(this.isHidden&&(Wa(d),d.attr("opacity",1).show()),d.attr({text:j}),l=e.borderColor||a.color||i.color||"#606060",d.attr({stroke:l}),this.updatePosition({plotX:f,plotY:g}),this.isHidden=!1);if(m){m=ha(m);for(d=m.length;d--;)if(i=a.series,e=i[d?"yAxis":"xAxis"],m[d]&&e)if(h=d?p(a.stackY,a.y):a.x,e.isLog&&(h=ma(h)),i.modifyValue&&(h=i.modifyValue(h)),
e=e.getPlotLinePath(h,1),this.crosshairs[d])this.crosshairs[d].attr({d:e,visibility:"visible"});else{h={"stroke-width":m[d].width||1,stroke:m[d].color||"#C0C0C0",zIndex:m[d].zIndex||2};if(m[d].dashStyle)h.dashstyle=m[d].dashStyle;this.crosshairs[d]=c.renderer.path(e).attr(h).add()}}C(c,"tooltipRefresh",{text:j,x:f+c.plotLeft,y:g+c.plotTop,borderColor:l})},updatePosition:function(a){var b=this.chart,c=this.label,c=(this.options.positioner||this.getPosition).call(this,c.width,c.height,a);this.move(s(c.x),
s(c.y),a.plotX+b.plotLeft,a.plotY+b.plotTop)}};vb.prototype={init:function(a,b){var c=Z?"":b.chart.zoomType,d=a.inverted,e;this.options=b;this.chart=a;this.zoomX=e=/x/.test(c);this.zoomY=c=/y/.test(c);this.zoomHor=e&&!d||c&&d;this.zoomVert=c&&!d||e&&d;this.pinchDown=[];this.lastValidTouch={};if(b.tooltip.enabled)a.tooltip=new ub(a,b.tooltip);this.setDOMEvents()},normalize:function(a){var b,c,a=a||E.event;if(!a.target)a.target=a.srcElement;a=Sb(a);c=a.touches?a.touches.item(0):a;this.chartPosition=
b=Xb(this.chart.container);return r(a,{chartX:s(p(c.pageX,c.clientX)-b.left),chartY:s(p(c.pageY,c.clientY)-b.top)})},getCoordinates:function(a){var b={xAxis:[],yAxis:[]};n(this.chart.axes,function(c){b[c.isXAxis?"xAxis":"yAxis"].push({axis:c,value:c.toValue(a[c.horiz?"chartX":"chartY"])})});return b},getIndex:function(a){var b=this.chart;return b.inverted?b.plotHeight+b.plotTop-a.chartY:a.chartX-b.plotLeft},runPointActions:function(a){var b=this.chart,c=b.series,d=b.tooltip,e,f=b.hoverPoint,g=b.hoverSeries,
h,i,j=b.chartWidth,k=this.getIndex(a);if(d&&this.options.tooltip.shared&&(!g||!g.noSharedTooltip)){e=[];h=c.length;for(i=0;i<h;i++)if(c[i].visible&&c[i].options.enableMouseTracking!==!1&&!c[i].noSharedTooltip&&c[i].tooltipPoints.length&&(b=c[i].tooltipPoints[k],b.series))b._dist=P(k-b.clientX),j=I(j,b._dist),e.push(b);for(h=e.length;h--;)e[h]._dist>j&&e.splice(h,1);if(e.length&&e[0].clientX!==this.hoverX)d.refresh(e,a),this.hoverX=e[0].clientX}if(g&&g.tracker){if((b=g.tooltipPoints[k])&&b!==f)b.onMouseOver(a)}else d&&
d.followPointer&&!d.isHidden&&(a=d.getAnchor([{}],a),d.updatePosition({plotX:a[0],plotY:a[1]}))},reset:function(a){var b=this.chart,c=b.hoverSeries,d=b.hoverPoint,e=b.tooltip,b=e&&e.shared?b.hoverPoints:d;(a=a&&e&&b)&&ha(b)[0].plotX===v&&(a=!1);if(a)e.refresh(b);else{if(d)d.onMouseOut();if(c)c.onMouseOut();e&&(e.hide(),e.hideCrosshairs());this.hoverX=null}},scaleGroups:function(a,b){var c=this.chart,d;n(c.series,function(e){d=a||e.getPlotBox();e.xAxis&&e.xAxis.zoomEnabled&&(e.group.attr(d),e.markerGroup&&
(e.markerGroup.attr(d),e.markerGroup.clip(b?c.clipRect:null)),e.dataLabelsGroup&&e.dataLabelsGroup.attr(d))});c.clipRect.attr(b||c.clipBox)},pinchTranslateDirection:function(a,b,c,d,e,f,g){var h=this.chart,i=a?"x":"y",j=a?"X":"Y",k="chart"+j,l=a?"width":"height",m=h["plot"+(a?"Left":"Top")],o,q,p=1,n=h.inverted,u=h.bounds[a?"h":"v"],s=b.length===1,t=b[0][k],r=c[0][k],w=!s&&b[1][k],v=!s&&c[1][k],x,c=function(){!s&&P(t-w)>20&&(p=P(r-v)/P(t-w));q=(m-r)/p+t;o=h["plot"+(a?"Width":"Height")]/p};c();b=q;
b<u.min?(b=u.min,x=!0):b+o>u.max&&(b=u.max-o,x=!0);x?(r-=0.8*(r-g[i][0]),s||(v-=0.8*(v-g[i][1])),c()):g[i]=[r,v];n||(f[i]=q-m,f[l]=o);f=n?1/p:p;e[l]=o;e[i]=b;d[n?a?"scaleY":"scaleX":"scale"+j]=p;d["translate"+j]=f*m+(r-f*t)},pinch:function(a){var b=this,c=b.chart,d=b.pinchDown,e=c.tooltip&&c.tooltip.options.followTouchMove,f=a.touches,g=f.length,h=b.lastValidTouch,i=b.zoomHor||b.pinchHor,j=b.zoomVert||b.pinchVert,k=i||j,l=b.selectionMarker,m={},o={};a.type==="touchstart"&&(e||k)&&a.preventDefault();
Na(f,function(a){return b.normalize(a)});if(a.type==="touchstart")n(f,function(a,b){d[b]={chartX:a.chartX,chartY:a.chartY}}),h.x=[d[0].chartX,d[1]&&d[1].chartX],h.y=[d[0].chartY,d[1]&&d[1].chartY],n(c.axes,function(a){if(a.zoomEnabled){var b=c.bounds[a.horiz?"h":"v"],d=a.minPixelPadding,e=a.toPixels(a.dataMin),f=a.toPixels(a.dataMax),g=I(e,f),e=u(e,f);b.min=I(a.pos,g-d);b.max=u(a.pos+a.len,e+d)}});else if(d.length){if(!l)b.selectionMarker=l=r({destroy:xa},c.plotBox);i&&b.pinchTranslateDirection(!0,
d,f,m,l,o,h);j&&b.pinchTranslateDirection(!1,d,f,m,l,o,h);b.hasPinched=k;b.scaleGroups(m,o);!k&&e&&g===1&&this.runPointActions(b.normalize(a))}},dragStart:function(a){var b=this.chart;b.mouseIsDown=a.type;b.cancelClick=!1;b.mouseDownX=this.mouseDownX=a.chartX;this.mouseDownY=a.chartY},drag:function(a){var b=this.chart,c=b.options.chart,d=a.chartX,a=a.chartY,e=this.zoomHor,f=this.zoomVert,g=b.plotLeft,h=b.plotTop,i=b.plotWidth,j=b.plotHeight,k,l=this.mouseDownX,m=this.mouseDownY;d<g?d=g:d>g+i&&(d=
g+i);a<h?a=h:a>h+j&&(a=h+j);this.hasDragged=Math.sqrt(Math.pow(l-d,2)+Math.pow(m-a,2));if(this.hasDragged>10){k=b.isInsidePlot(l-g,m-h);if(b.hasCartesianSeries&&(this.zoomX||this.zoomY)&&k&&!this.selectionMarker)this.selectionMarker=b.renderer.rect(g,h,e?1:i,f?1:j,0).attr({fill:c.selectionMarkerFill||"rgba(69,114,167,0.25)",zIndex:7}).add();this.selectionMarker&&e&&(e=d-l,this.selectionMarker.attr({width:P(e),x:(e>0?0:e)+l}));this.selectionMarker&&f&&(e=a-m,this.selectionMarker.attr({height:P(e),
y:(e>0?0:e)+m}));k&&!this.selectionMarker&&c.panning&&b.pan(d)}},drop:function(a){var b=this.chart,c=this.hasPinched;if(this.selectionMarker){var d={xAxis:[],yAxis:[],originalEvent:a.originalEvent||a},e=this.selectionMarker,f=e.x,g=e.y,h;if(this.hasDragged||c)n(b.axes,function(a){if(a.zoomEnabled){var b=a.horiz,c=a.toValue(b?f:g),b=a.toValue(b?f+e.width:g+e.height);!isNaN(c)&&!isNaN(b)&&(d[a.xOrY+"Axis"].push({axis:a,min:I(c,b),max:u(c,b)}),h=!0)}}),h&&C(b,"selection",d,function(a){b.zoom(r(a,c?{animation:!1}:
null))});this.selectionMarker=this.selectionMarker.destroy();c&&this.scaleGroups()}if(b)M(b.container,{cursor:b._cursor}),b.cancelClick=this.hasDragged>10,b.mouseIsDown=this.hasDragged=this.hasPinched=!1,this.pinchDown=[]},onContainerMouseDown:function(a){a=this.normalize(a);a.preventDefault&&a.preventDefault();this.dragStart(a)},onDocumentMouseUp:function(a){this.drop(a)},onDocumentMouseMove:function(a){var b=this.chart,c=this.chartPosition,d=b.hoverSeries,a=Sb(a);c&&d&&d.isCartesian&&!b.isInsidePlot(a.pageX-
c.left-b.plotLeft,a.pageY-c.top-b.plotTop)&&this.reset()},onContainerMouseLeave:function(){this.reset();this.chartPosition=null},onContainerMouseMove:function(a){var b=this.chart,a=this.normalize(a);a.returnValue=!1;b.mouseIsDown==="mousedown"&&this.drag(a);b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)&&!b.openMenu&&this.runPointActions(a)},inClass:function(a,b){for(var c;a;){if(c=w(a,"class"))if(c.indexOf(b)!==-1)return!0;else if(c.indexOf("highcharts-container")!==-1)return!1;a=a.parentNode}},
onTrackerMouseOut:function(a){var b=this.chart.hoverSeries;if(b&&!b.options.stickyTracking&&!this.inClass(a.toElement||a.relatedTarget,"highcharts-tooltip"))b.onMouseOut()},onContainerClick:function(a){var b=this.chart,c=b.hoverPoint,d=b.plotLeft,e=b.plotTop,f=b.inverted,g,h,i,a=this.normalize(a);a.cancelBubble=!0;if(!b.cancelClick)c&&this.inClass(a.target,"highcharts-tracker")?(g=this.chartPosition,h=c.plotX,i=c.plotY,r(c,{pageX:g.left+d+(f?b.plotWidth-i:h),pageY:g.top+e+(f?b.plotHeight-h:i)}),C(c.series,
"click",r(a,{point:c})),b.hoverPoint&&c.firePointEvent("click",a)):(r(a,this.getCoordinates(a)),b.isInsidePlot(a.chartX-d,a.chartY-e)&&C(b,"click",a))},onContainerTouchStart:function(a){var b=this.chart;a.touches.length===1?(a=this.normalize(a),b.isInsidePlot(a.chartX-b.plotLeft,a.chartY-b.plotTop)?(this.runPointActions(a),this.pinch(a)):this.reset()):a.touches.length===2&&this.pinch(a)},onContainerTouchMove:function(a){(a.touches.length===1||a.touches.length===2)&&this.pinch(a)},onDocumentTouchEnd:function(a){this.drop(a)},
setDOMEvents:function(){var a=this,b=a.chart.container,c;this._events=c=[[b,"onmousedown","onContainerMouseDown"],[b,"onmousemove","onContainerMouseMove"],[b,"onclick","onContainerClick"],[b,"mouseleave","onContainerMouseLeave"],[z,"mousemove","onDocumentMouseMove"],[z,"mouseup","onDocumentMouseUp"]];hb&&c.push([b,"ontouchstart","onContainerTouchStart"],[b,"ontouchmove","onContainerTouchMove"],[z,"touchend","onDocumentTouchEnd"]);n(c,function(b){a["_"+b[2]]=function(c){a[b[2]](c)};b[1].indexOf("on")===
0?b[0][b[1]]=a["_"+b[2]]:J(b[0],b[1],a["_"+b[2]])})},destroy:function(){var a=this;n(a._events,function(b){b[1].indexOf("on")===0?b[0][b[1]]=null:aa(b[0],b[1],a["_"+b[2]])});delete a._events;clearInterval(a.tooltipTimeout)}};wb.prototype={init:function(a,b){var c=this,d=b.itemStyle,e=p(b.padding,8),f=b.itemMarginTop||0;this.options=b;if(b.enabled)c.baseline=A(d.fontSize)+3+f,c.itemStyle=d,c.itemHiddenStyle=x(d,b.itemHiddenStyle),c.itemMarginTop=f,c.padding=e,c.initialItemX=e,c.initialItemY=e-5,c.maxItemWidth=
0,c.chart=a,c.itemHeight=0,c.lastLineHeight=0,c.render(),J(c.chart,"endResize",function(){c.positionCheckboxes()})},colorizeItem:function(a,b){var c=this.options,d=a.legendItem,e=a.legendLine,f=a.legendSymbol,g=this.itemHiddenStyle.color,c=b?c.itemStyle.color:g,h=b?a.color:g,g=a.options&&a.options.marker,i={stroke:h,fill:h},j;d&&d.css({fill:c,color:c});e&&e.attr({stroke:h});if(f){if(g&&f.isMarker)for(j in g=a.convertAttribs(g),g)d=g[j],d!==v&&(i[j]=d);f.attr(i)}},positionItem:function(a){var b=this.options,
c=b.symbolPadding,b=!b.rtl,d=a._legendItemPos,e=d[0],d=d[1],f=a.checkbox;a.legendGroup&&a.legendGroup.translate(b?e:this.legendWidth-e-2*c-4,d);if(f)f.x=e,f.y=d},destroyItem:function(a){var b=a.checkbox;n(["legendItem","legendLine","legendSymbol","legendGroup"],function(b){a[b]&&(a[b]=a[b].destroy())});b&&Ta(a.checkbox)},destroy:function(){var a=this.group,b=this.box;if(b)this.box=b.destroy();if(a)this.group=a.destroy()},positionCheckboxes:function(a){var b=this.group.alignAttr,c,d=this.clipHeight||
this.legendHeight;if(b)c=b.translateY,n(this.allItems,function(e){var f=e.checkbox,g;f&&(g=c+f.y+(a||0)+3,M(f,{left:b.translateX+e.legendItemWidth+f.x-20+"px",top:g+"px",display:g>c-6&&g<c+d-6?"":R}))})},renderTitle:function(){var a=this.padding,b=this.options.title,c=0;if(b.text){if(!this.title)this.title=this.chart.renderer.label(b.text,a-3,a-4,null,null,null,null,null,"legend-title").attr({zIndex:1}).css(b.style).add(this.group);a=this.title.getBBox();c=a.height;this.offsetWidth=a.width;this.contentGroup.attr({translateY:c})}this.titleHeight=
c},renderItem:function(a){var B;var b=this,c=b.chart,d=c.renderer,e=b.options,f=e.layout==="horizontal",g=e.symbolWidth,h=e.symbolPadding,i=b.itemStyle,j=b.itemHiddenStyle,k=b.padding,l=f?p(e.itemDistance,8):0,m=!e.rtl,o=e.width,q=e.itemMarginBottom||0,n=b.itemMarginTop,s=b.initialItemX,t=a.legendItem,r=a.series||a,w=r.options,v=w.showCheckbox,A=e.useHTML;if(!t&&(a.legendGroup=d.g("legend-item").attr({zIndex:1}).add(b.scrollGroup),r.drawLegendSymbol(b,a),a.legendItem=t=d.text(e.labelFormat?Aa(e.labelFormat,
a):e.labelFormatter.call(a),m?g+h:-h,b.baseline,A).css(x(a.visible?i:j)).attr({align:m?"left":"right",zIndex:2}).add(a.legendGroup),(A?t:a.legendGroup).on("mouseover",function(){a.setState("hover");t.css(b.options.itemHoverStyle)}).on("mouseout",function(){t.css(a.visible?i:j);a.setState()}).on("click",function(b){var c=function(){a.setVisible()},b={browserEvent:b};a.firePointEvent?a.firePointEvent("legendItemClick",b,c):C(a,"legendItemClick",b,c)}),b.colorizeItem(a,a.visible),w&&v))a.checkbox=T("input",
{type:"checkbox",checked:a.selected,defaultChecked:a.selected},e.itemCheckboxStyle,c.container),J(a.checkbox,"click",function(b){C(a,"checkboxClick",{checked:b.target.checked},function(){a.select()})});d=t.getBBox();B=a.legendItemWidth=e.itemWidth||g+h+d.width+l+(v?20:0),e=B;b.itemHeight=g=d.height;if(f&&b.itemX-s+e>(o||c.chartWidth-2*k-s))b.itemX=s,b.itemY+=n+b.lastLineHeight+q,b.lastLineHeight=0;b.maxItemWidth=u(b.maxItemWidth,e);b.lastItemY=n+b.itemY+q;b.lastLineHeight=u(g,b.lastLineHeight);a._legendItemPos=
[b.itemX,b.itemY];f?b.itemX+=e:(b.itemY+=n+g+q,b.lastLineHeight=g);b.offsetWidth=o||u((f?b.itemX-s-l:e)+k,b.offsetWidth)},render:function(){var a=this,b=a.chart,c=b.renderer,d=a.group,e,f,g,h,i=a.box,j=a.options,k=a.padding,l=j.borderWidth,m=j.backgroundColor;a.itemX=a.initialItemX;a.itemY=a.initialItemY;a.offsetWidth=0;a.lastItemY=0;if(!d)a.group=d=c.g("legend").attr({zIndex:7}).add(),a.contentGroup=c.g().attr({zIndex:1}).add(d),a.scrollGroup=c.g().add(a.contentGroup);a.renderTitle();e=[];n(b.series,
function(a){var b=a.options;b.showInLegend&&!t(b.linkedTo)&&(e=e.concat(a.legendItems||(b.legendType==="point"?a.data:a)))});Kb(e,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});j.reversed&&e.reverse();a.allItems=e;a.display=f=!!e.length;n(e,function(b){a.renderItem(b)});g=j.width||a.offsetWidth;h=a.lastItemY+a.lastLineHeight+a.titleHeight;h=a.handleOverflow(h);if(l||m){g+=k;h+=k;if(i){if(g>0&&h>0)i[i.isNew?"attr":"animate"](i.crisp(null,null,null,
g,h)),i.isNew=!1}else a.box=i=c.rect(0,0,g,h,j.borderRadius,l||0).attr({stroke:j.borderColor,"stroke-width":l||0,fill:m||R}).add(d).shadow(j.shadow),i.isNew=!0;i[f?"show":"hide"]()}a.legendWidth=g;a.legendHeight=h;n(e,function(b){a.positionItem(b)});f&&d.align(r({width:g,height:h},j),!0,"spacingBox");b.isResizing||this.positionCheckboxes()},handleOverflow:function(a){var b=this,c=this.chart,d=c.renderer,e=this.options,f=e.y,f=c.spacingBox.height+(e.verticalAlign==="top"?-f:f)-this.padding,g=e.maxHeight,
h=this.clipRect,i=e.navigation,j=p(i.animation,!0),k=i.arrowSize||12,l=this.nav;e.layout==="horizontal"&&(f/=2);g&&(f=I(f,g));if(a>f&&!e.useHTML){this.clipHeight=c=f-20-this.titleHeight;this.pageCount=ja(a/c);this.currentPage=p(this.currentPage,1);this.fullHeight=a;if(!h)h=b.clipRect=d.clipRect(0,0,9999,0),b.contentGroup.clip(h);h.attr({height:c});if(!l)this.nav=l=d.g().attr({zIndex:1}).add(this.group),this.up=d.symbol("triangle",0,0,k,k).on("click",function(){b.scroll(-1,j)}).add(l),this.pager=d.text("",
15,10).css(i.style).add(l),this.down=d.symbol("triangle-down",0,0,k,k).on("click",function(){b.scroll(1,j)}).add(l);b.scroll(0);a=f}else if(l)h.attr({height:c.chartHeight}),l.hide(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0;return a},scroll:function(a,b){var c=this.pageCount,d=this.currentPage+a,e=this.clipHeight,f=this.options.navigation,g=f.activeColor,h=f.inactiveColor,f=this.pager,i=this.padding;d>c&&(d=c);if(d>0)b!==v&&Ka(b,this.chart),this.nav.attr({translateX:i,translateY:e+7+
this.titleHeight,visibility:"visible"}),this.up.attr({fill:d===1?h:g}).css({cursor:d===1?"default":"pointer"}),f.attr({text:d+"/"+this.pageCount}),this.down.attr({x:18+this.pager.getBBox().width,fill:d===c?h:g}).css({cursor:d===c?"default":"pointer"}),e=-I(e*(d-1),this.fullHeight-e+i)+1,this.scrollGroup.animate({translateY:e}),f.attr({text:d+"/"+c}),this.currentPage=d,this.positionCheckboxes(e)}};xb.prototype={init:function(a,b){var c,d=a.series;a.series=null;c=x(O,a);c.series=a.series=d;var d=c.chart,
e=d.margin,e=U(e)?e:[e,e,e,e];this.optionsMarginTop=p(d.marginTop,e[0]);this.optionsMarginRight=p(d.marginRight,e[1]);this.optionsMarginBottom=p(d.marginBottom,e[2]);this.optionsMarginLeft=p(d.marginLeft,e[3]);e=d.events;this.bounds={h:{},v:{}};this.callback=b;this.isResizing=0;this.options=c;this.axes=[];this.series=[];this.hasCartesianSeries=d.showAxes;var f=this,g;f.index=Ea.length;Ea.push(f);d.reflow!==!1&&J(f,"load",function(){f.initReflow()});if(e)for(g in e)J(f,g,e[g]);f.xAxis=[];f.yAxis=[];
f.animation=Z?!1:p(d.animation,!0);f.pointCount=0;f.counters=new Jb;f.firstRender()},initSeries:function(a){var b=this.options.chart;(b=$[a.type||b.type||b.defaultSeriesType])||ua(17,!0);b=new b;b.init(this,a);return b},addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),C(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;b&&e.redraw(c)}));return d},addAxis:function(a,b,c,d){var e=b?"xAxis":"yAxis",f=this.options;new db(this,x(a,{index:this[e].length,isX:b}));f[e]=ha(f[e]||
{});f[e].push(a);p(c,!0)&&this.redraw(d)},isInsidePlot:function(a,b,c){var d=c?b:a,a=c?a:b;return d>=0&&d<=this.plotWidth&&a>=0&&a<=this.plotHeight},adjustTickAmounts:function(){this.options.chart.alignTicks!==!1&&n(this.axes,function(a){a.adjustTickAmount()});this.maxTicks=null},redraw:function(a){var b=this.axes,c=this.series,d=this.pointer,e=this.legend,f=this.isDirtyLegend,g,h,i=this.isDirtyBox,j=c.length,k=j,l=this.renderer,m=l.isHidden(),o=[];Ka(a,this);m&&this.cloneRenderTo();for(this.layOutTitles();k--;)if(a=
c[k],a.options.stacking&&(g=!0,a.isDirty)){h=!0;break}if(h)for(k=j;k--;)if(a=c[k],a.options.stacking)a.isDirty=!0;n(c,function(a){a.isDirty&&a.options.legendType==="point"&&(f=!0)});if(f&&e.options.enabled)e.render(),this.isDirtyLegend=!1;g&&this.getStacks();if(this.hasCartesianSeries){if(!this.isResizing)this.maxTicks=null,n(b,function(a){a.setScale()});this.adjustTickAmounts();this.getMargins();n(b,function(a){if(a.isDirtyExtremes)a.isDirtyExtremes=!1,o.push(function(){C(a,"afterSetExtremes",a.getExtremes())});
if(a.isDirty||i||g)a.redraw(),i=!0})}i&&this.drawChartBox();n(c,function(a){a.isDirty&&a.visible&&(!a.isCartesian||a.xAxis)&&a.redraw()});d&&d.reset&&d.reset(!0);l.draw();C(this,"redraw");m&&this.cloneRenderTo(!0);n(o,function(a){a.call()})},showLoading:function(a){var b=this.options,c=this.loadingDiv,d=b.loading;if(!c)this.loadingDiv=c=T(Ba,{className:"highcharts-loading"},r(d.style,{zIndex:10,display:R}),this.container),this.loadingSpan=T("span",null,d.labelStyle,c);this.loadingSpan.innerHTML=a||
b.lang.loading;if(!this.loadingShown)M(c,{opacity:0,display:"",left:this.plotLeft+"px",top:this.plotTop+"px",width:this.plotWidth+"px",height:this.plotHeight+"px"}),Ab(c,{opacity:d.style.opacity},{duration:d.showDuration||0}),this.loadingShown=!0},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&Ab(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){M(b,{display:R})}});this.loadingShown=!1},get:function(a){var b=this.axes,c=this.series,d,e;for(d=0;d<b.length;d++)if(b[d].options.id===
a)return b[d];for(d=0;d<c.length;d++)if(c[d].options.id===a)return c[d];for(d=0;d<c.length;d++){e=c[d].points||[];for(b=0;b<e.length;b++)if(e[b].id===a)return e[b]}return null},getAxes:function(){var a=this,b=this.options,c=b.xAxis=ha(b.xAxis||{}),b=b.yAxis=ha(b.yAxis||{});n(c,function(a,b){a.index=b;a.isX=!0});n(b,function(a,b){a.index=b});c=c.concat(b);n(c,function(b){new db(a,b)});a.adjustTickAmounts()},getSelectedPoints:function(){var a=[];n(this.series,function(b){a=a.concat(sb(b.points||[],
function(a){return a.selected}))});return a},getSelectedSeries:function(){return sb(this.series,function(a){return a.selected})},getStacks:function(){var a=this;n(a.yAxis,function(a){if(a.stacks&&a.hasVisibleSeries)a.oldStacks=a.stacks});n(a.series,function(b){if(b.options.stacking&&(b.visible===!0||a.options.chart.ignoreHiddenSeries===!1))b.stackKey=b.type+p(b.options.stack,"")})},showResetZoom:function(){var a=this,b=O.lang,c=a.options.chart.resetZoomButton,d=c.theme,e=d.states,f=c.relativeTo===
"chart"?null:"plotBox";this.resetZoomButton=a.renderer.button(b.resetZoom,null,null,function(){a.zoomOut()},d,e&&e.hover).attr({align:c.position.align,title:b.resetZoomTitle}).add().align(c.position,!1,f)},zoomOut:function(){var a=this;C(a,"selection",{resetSelection:!0},function(){a.zoom()})},zoom:function(a){var b,c=this.pointer,d=!1,e;!a||a.resetSelection?n(this.axes,function(a){b=a.zoom()}):n(a.xAxis.concat(a.yAxis),function(a){var e=a.axis,h=e.isXAxis;if(c[h?"zoomX":"zoomY"]||c[h?"pinchX":"pinchY"])b=
e.zoom(a.min,a.max),e.displayBtn&&(d=!0)});e=this.resetZoomButton;if(d&&!e)this.showResetZoom();else if(!d&&U(e))this.resetZoomButton=e.destroy();b&&this.redraw(p(this.options.chart.animation,a&&a.animation,this.pointCount<100))},pan:function(a){var b=this.xAxis[0],c=this.mouseDownX,d=b.pointRange/2,e=b.getExtremes(),f=b.translate(c-a,!0)+d,c=b.translate(c+this.plotWidth-a,!0)-d;(d=this.hoverPoints)&&n(d,function(a){a.setState()});b.series.length&&f>I(e.dataMin,e.min)&&c<u(e.dataMax,e.max)&&b.setExtremes(f,
c,!0,!1,{trigger:"pan"});this.mouseDownX=a;M(this.container,{cursor:"move"})},setTitle:function(a,b){var f;var c=this,d=c.options,e;e=d.title=x(d.title,a);f=d.subtitle=x(d.subtitle,b),d=f;n([["title",a,e],["subtitle",b,d]],function(a){var b=a[0],d=c[b],e=a[1],a=a[2];d&&e&&(c[b]=d=d.destroy());a&&a.text&&!d&&(c[b]=c.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+b,zIndex:a.zIndex||4}).css(a.style).add())});c.layOutTitles()},layOutTitles:function(){var a=0,b=this.title,
c=this.subtitle,d=this.options,e=d.title,d=d.subtitle,f=this.spacingBox.width-44;if(b&&(b.css({width:(e.width||f)+"px"}).align(r({y:15},e),!1,"spacingBox"),!e.floating&&!e.verticalAlign))a=b.getBBox().height,a>=18&&a<=25&&(a=15);c&&(c.css({width:(d.width||f)+"px"}).align(r({y:a+e.margin},d),!1,"spacingBox"),!d.floating&&!d.verticalAlign&&(a=ja(a+c.getBBox().height)));this.titleOffset=a},getChartSize:function(){var a=this.options.chart,b=this.renderToClone||this.renderTo;this.containerWidth=ib(b,"width");
this.containerHeight=ib(b,"height");this.chartWidth=u(0,a.width||this.containerWidth||600);this.chartHeight=u(0,p(a.height,this.containerHeight>19?this.containerHeight:400))},cloneRenderTo:function(a){var b=this.renderToClone,c=this.container;a?b&&(this.renderTo.appendChild(c),Ta(b),delete this.renderToClone):(c&&c.parentNode===this.renderTo&&this.renderTo.removeChild(c),this.renderToClone=b=this.renderTo.cloneNode(0),M(b,{position:"absolute",top:"-9999px",display:"block"}),z.body.appendChild(b),
c&&b.appendChild(c))},getContainer:function(){var a,b=this.options.chart,c,d,e;this.renderTo=a=b.renderTo;e="highcharts-"+yb++;if(da(a))this.renderTo=a=z.getElementById(a);a||ua(13,!0);c=A(w(a,"data-highcharts-chart"));!isNaN(c)&&Ea[c]&&Ea[c].destroy();w(a,"data-highcharts-chart",this.index);a.innerHTML="";a.offsetWidth||this.cloneRenderTo();this.getChartSize();c=this.chartWidth;d=this.chartHeight;this.container=a=T(Ba,{className:"highcharts-container"+(b.className?" "+b.className:""),id:e},r({position:"relative",
overflow:"hidden",width:c+"px",height:d+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},b.style),this.renderToClone||a);this._cursor=a.style.cursor;this.renderer=b.forExport?new Fa(a,c,d,!0):new Va(a,c,d);Z&&this.renderer.create(this,a,c,d)},getMargins:function(){var a=this.options.chart,b=a.spacingTop,c=a.spacingRight,d=a.spacingBottom,a=a.spacingLeft,e,f=this.legend,g=this.optionsMarginTop,h=this.optionsMarginLeft,i=this.optionsMarginRight,j=this.optionsMarginBottom,
k=this.options.legend,l=p(k.margin,10),m=k.x,o=k.y,q=k.align,s=k.verticalAlign,r=this.titleOffset;this.resetMargins();e=this.axisOffset;if(r&&!t(g))this.plotTop=u(this.plotTop,r+this.options.title.margin+b);if(f.display&&!k.floating)if(q==="right"){if(!t(i))this.marginRight=u(this.marginRight,f.legendWidth-m+l+c)}else if(q==="left"){if(!t(h))this.plotLeft=u(this.plotLeft,f.legendWidth+m+l+a)}else if(s==="top"){if(!t(g))this.plotTop=u(this.plotTop,f.legendHeight+o+l+b)}else if(s==="bottom"&&!t(j))this.marginBottom=
u(this.marginBottom,f.legendHeight-o+l+d);this.extraBottomMargin&&(this.marginBottom+=this.extraBottomMargin);this.extraTopMargin&&(this.plotTop+=this.extraTopMargin);this.hasCartesianSeries&&n(this.axes,function(a){a.getOffset()});t(h)||(this.plotLeft+=e[3]);t(g)||(this.plotTop+=e[0]);t(j)||(this.marginBottom+=e[2]);t(i)||(this.marginRight+=e[1]);this.setChartSize()},initReflow:function(){function a(a){var g=c.width||ib(d,"width"),h=c.height||ib(d,"height"),a=a?a.target:E;if(!b.hasUserSize&&g&&h&&
(a===E||a===z)){if(g!==b.containerWidth||h!==b.containerHeight)clearTimeout(e),b.reflowTimeout=e=setTimeout(function(){if(b.container)b.setSize(g,h,!1),b.hasUserSize=null},100);b.containerWidth=g;b.containerHeight=h}}var b=this,c=b.options.chart,d=b.renderTo,e;J(E,"resize",a);J(b,"destroy",function(){aa(E,"resize",a)})},setSize:function(a,b,c){var d=this,e,f,g;d.isResizing+=1;g=function(){d&&C(d,"endResize",null,function(){d.isResizing-=1})};Ka(c,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=
d.chartWidth;if(t(a))d.chartWidth=e=u(0,s(a)),d.hasUserSize=!!e;if(t(b))d.chartHeight=f=u(0,s(b));M(d.container,{width:e+"px",height:f+"px"});d.setChartSize(!0);d.renderer.setSize(e,f,c);d.maxTicks=null;n(d.axes,function(a){a.isDirty=!0;a.setScale()});n(d.series,function(a){a.isDirty=!0});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.getMargins();d.redraw(c);d.oldChartHeight=null;C(d,"resize");Ca===!1?g():setTimeout(g,Ca&&Ca.duration||500)},setChartSize:function(a){var b=this.inverted,c=this.renderer,d=this.chartWidth,
e=this.chartHeight,f=this.options.chart,g=f.spacingTop,h=f.spacingRight,i=f.spacingBottom,j=f.spacingLeft,k=this.clipOffset,l,m,o,q;this.plotLeft=l=s(this.plotLeft);this.plotTop=m=s(this.plotTop);this.plotWidth=o=u(0,s(d-l-this.marginRight));this.plotHeight=q=u(0,s(e-m-this.marginBottom));this.plotSizeX=b?q:o;this.plotSizeY=b?o:q;this.plotBorderWidth=b=f.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:j,y:g,width:d-j-h,height:e-g-i};this.plotBox=c.plotBox={x:l,y:m,width:o,height:q};c=ja(u(b,k[3])/
2);d=ja(u(b,k[0])/2);this.clipBox={x:c,y:d,width:S(this.plotSizeX-u(b,k[1])/2-c),height:S(this.plotSizeY-u(b,k[2])/2-d)};a||n(this.axes,function(a){a.setAxisSize();a.setAxisTranslation()})},resetMargins:function(){var a=this.options.chart,b=a.spacingRight,c=a.spacingBottom,d=a.spacingLeft;this.plotTop=p(this.optionsMarginTop,a.spacingTop);this.marginRight=p(this.optionsMarginRight,b);this.marginBottom=p(this.optionsMarginBottom,c);this.plotLeft=p(this.optionsMarginLeft,d);this.axisOffset=[0,0,0,0];
this.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,d=this.chartHeight,e=this.chartBackground,f=this.plotBackground,g=this.plotBorder,h=this.plotBGImage,i=a.borderWidth||0,j=a.backgroundColor,k=a.plotBackgroundColor,l=a.plotBackgroundImage,m=a.plotBorderWidth||0,o,q=this.plotLeft,p=this.plotTop,n=this.plotWidth,s=this.plotHeight,t=this.plotBox,u=this.clipRect,r=this.clipBox;o=i+(a.shadow?8:0);if(i||j)if(e)e.animate(e.crisp(null,null,null,c-
o,d-o));else{e={fill:j||R};if(i)e.stroke=a.borderColor,e["stroke-width"]=i;this.chartBackground=b.rect(o/2,o/2,c-o,d-o,a.borderRadius,i).attr(e).add().shadow(a.shadow)}if(k)f?f.animate(t):this.plotBackground=b.rect(q,p,n,s,0).attr({fill:k}).add().shadow(a.plotShadow);if(l)h?h.animate(t):this.plotBGImage=b.image(l,q,p,n,s).add();u?u.animate({width:r.width,height:r.height}):this.clipRect=b.clipRect(r);if(m)g?g.animate(g.crisp(null,q,p,n,s)):this.plotBorder=b.rect(q,p,n,s,0,m).attr({stroke:a.plotBorderColor,
"stroke-width":m,zIndex:1}).add();this.isDirtyBox=!1},propFromSeries:function(){var a=this,b=a.options.chart,c,d=a.options.series,e,f;n(["inverted","angular","polar"],function(g){c=$[b.type||b.defaultSeriesType];f=a[g]||b[g]||c&&c.prototype[g];for(e=d&&d.length;!f&&e--;)(c=$[d[e].type])&&c.prototype[g]&&(f=!0);a[g]=f})},render:function(){var a=this,b=a.axes,c=a.renderer,d=a.options,e=d.labels,f=d.credits,g;a.setTitle();a.legend=new wb(a,d.legend);a.getStacks();n(b,function(a){a.setScale()});a.getMargins();
a.maxTicks=null;n(b,function(a){a.setTickPositions(!0);a.setMaxTicks()});a.adjustTickAmounts();a.getMargins();a.drawChartBox();a.hasCartesianSeries&&n(b,function(a){a.render()});if(!a.seriesGroup)a.seriesGroup=c.g("series-group").attr({zIndex:3}).add();n(a.series,function(a){a.translate();a.setTooltipPoints();a.render()});e.items&&n(e.items,function(b){var d=r(e.style,b.style),f=A(d.left)+a.plotLeft,g=A(d.top)+a.plotTop+12;delete d.left;delete d.top;c.text(b.html,f,g).attr({zIndex:2}).css(d).add()});
if(f.enabled&&!a.credits)g=f.href,a.credits=c.text(f.text,0,0).on("click",function(){if(g)location.href=g}).attr({align:f.position.align,zIndex:8}).css(f.style).add().align(f.position);a.hasRendered=!0},destroy:function(){var a=this,b=a.axes,c=a.series,d=a.container,e,f=d&&d.parentNode;C(a,"destroy");Ea[a.index]=v;a.renderTo.removeAttribute("data-highcharts-chart");aa(a);for(e=b.length;e--;)b[e]=b[e].destroy();for(e=c.length;e--;)c[e]=c[e].destroy();n("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","),
function(b){var c=a[b];c&&c.destroy&&(a[b]=c.destroy())});if(d)d.innerHTML="",aa(d),f&&Ta(d);for(e in a)delete a[e]},isReadyToRender:function(){var a=this;return!Y&&E==E.top&&z.readyState!=="complete"||Z&&!E.canvg?(Z?Ub.push(function(){a.firstRender()},a.options.global.canvasToolsURL):z.attachEvent("onreadystatechange",function(){z.detachEvent("onreadystatechange",a.firstRender);z.readyState==="complete"&&a.firstRender()}),!1):!0},firstRender:function(){var a=this,b=a.options,c=a.callback;if(a.isReadyToRender())a.getContainer(),
C(a,"init"),a.resetMargins(),a.setChartSize(),a.propFromSeries(),a.getAxes(),n(b.series||[],function(b){a.initSeries(b)}),C(a,"beforeRender"),a.pointer=new vb(a,b),a.render(),a.renderer.draw(),c&&c.apply(a,[a]),n(a.callbacks,function(b){b.apply(a,[a])}),a.cloneRenderTo(!0),C(a,"load")}};xb.prototype.callbacks=[];var Pa=function(){};Pa.prototype={init:function(a,b,c){this.series=a;this.applyOptions(b,c);this.pointAttr={};if(a.options.colorByPoint&&(b=a.options.colors||a.chart.options.colors,this.color=
this.color||b[a.colorCounter++],a.colorCounter===b.length))a.colorCounter=0;a.chart.pointCount++;return this},applyOptions:function(a,b){var c=this.series,d=c.pointValKey,a=Pa.prototype.optionsToObject.call(this,a);r(this,a);this.options=this.options?r(this.options,a):a;if(d)this.y=this[d];if(this.x===v&&c)this.x=b===v?c.autoIncrement():b;return this},optionsToObject:function(a){var b,c=this.series,d=c.pointArrayMap||["y"],e=d.length,f=0,g=0;if(typeof a==="number"||a===null)b={y:a};else if(Ha(a)){b=
{};if(a.length>e){c=typeof a[0];if(c==="string")b.name=a[0];else if(c==="number")b.x=a[0];f++}for(;g<e;)b[d[g++]]=a[f++]}else if(typeof a==="object"){b=a;if(a.dataLabels)c._hasPointLabels=!0;if(a.marker)c._hasPointMarkers=!0}return b},destroy:function(){var a=this.series.chart,b=a.hoverPoints,c;a.pointCount--;if(b&&(this.setState(),fa(b,this),!b.length))a.hoverPoints=null;if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel)aa(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);
for(c in this)this[c]=null},destroyElements:function(){for(var a="graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","),b,c=6;c--;)b=a[c],this[b]&&(this[b]=this[b].destroy())},getLabelConfig:function(){return{x:this.category,y:this.y,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},select:function(a,b){var c=this,d=c.series,e=d.chart,a=p(a,!c.selected);c.firePointEvent(a?"select":"unselect",{accumulate:b},
function(){c.selected=c.options.selected=a;d.options.data[na(c,d.data)]=c.options;c.setState(a&&"select");b||n(e.getSelectedPoints(),function(a){if(a.selected&&a!==c)a.selected=a.options.selected=!1,d.options.data[na(a,d.data)]=a.options,a.setState(""),a.firePointEvent("unselect")})})},onMouseOver:function(a){var b=this.series,c=b.chart,d=c.tooltip,e=c.hoverPoint;if(e&&e!==this)e.onMouseOut();this.firePointEvent("mouseOver");d&&(!d.shared||b.noSharedTooltip)&&d.refresh(this,a);this.setState("hover");
c.hoverPoint=this},onMouseOut:function(){var a=this.series.chart,b=a.hoverPoints;if(!b||na(this,b)===-1)this.firePointEvent("mouseOut"),this.setState(),a.hoverPoint=null},tooltipFormatter:function(a){var b=this.series,c=b.tooltipOptions,d=p(c.valueDecimals,""),e=c.valuePrefix||"",f=c.valueSuffix||"";n(b.pointArrayMap||["y"],function(b){b="{point."+b;if(e||f)a=a.replace(b+"}",e+b+"}"+f);a=a.replace(b+"}",b+":,."+d+"f}")});return Aa(a,{point:this,series:this.series})},update:function(a,b,c){var d=this,
e=d.series,f=d.graphic,g,h=e.data,i=e.chart,j=e.options,b=p(b,!0);d.firePointEvent("update",{options:a},function(){d.applyOptions(a);U(a)&&(e.getAttribs(),f&&f.attr(d.pointAttr[e.state]));g=na(d,h);e.xData[g]=d.x;e.yData[g]=e.toYData?e.toYData(d):d.y;e.zData[g]=d.z;j.data[g]=d.options;e.isDirty=e.isDirtyData=i.isDirtyBox=!0;j.legendType==="point"&&i.legend.destroyItem(d);b&&i.redraw(c)})},remove:function(a,b){var c=this,d=c.series,e=d.chart,f,g=d.data;Ka(b,e);a=p(a,!0);c.firePointEvent("remove",null,
function(){f=na(c,g);g.splice(f,1);d.options.data.splice(f,1);d.xData.splice(f,1);d.yData.splice(f,1);d.zData.splice(f,1);c.destroy();d.isDirty=!0;d.isDirtyData=!0;a&&e.redraw()})},firePointEvent:function(a,b,c){var d=this,e=this.series.options;(e.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();a==="click"&&e.allowPointSelect&&(c=function(a){d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});C(this,a,b,c)},importEvents:function(){if(!this.hasImportedEvents){var a=
x(this.series.options.point,this.options).events,b;this.events=a;for(b in a)J(this,b,a[b]);this.hasImportedEvents=!0}},setState:function(a){var b=this.plotX,c=this.plotY,d=this.series,e=d.options.states,f=X[d.type].marker&&d.options.marker,g=f&&!f.enabled,h=f&&f.states[a],i=h&&h.enabled===!1,j=d.stateMarkerGraphic,k=this.marker||{},l=d.chart,m=this.pointAttr,a=a||"";if(!(a===this.state||this.selected&&a!=="select"||e[a]&&e[a].enabled===!1||a&&(i||g&&!h.enabled))){if(this.graphic)e=f&&this.graphic.symbolName&&
m[a].r,this.graphic.attr(x(m[a],e?{x:b-e,y:c-e,width:2*e,height:2*e}:{}));else{if(a&&h)e=h.radius,k=k.symbol||d.symbol,j&&j.currentSymbol!==k&&(j=j.destroy()),j?j.attr({x:b-e,y:c-e}):(d.stateMarkerGraphic=j=l.renderer.symbol(k,b-e,c-e,2*e,2*e).attr(m[a]).add(d.markerGroup),j.currentSymbol=k);if(j)j[a&&l.isInsidePlot(b,c)?"show":"hide"]()}this.state=a}}};var Q=function(){};Q.prototype={isCartesian:!0,type:"line",pointClass:Pa,sorted:!0,requireSorting:!0,pointAttrToOptions:{stroke:"lineColor","stroke-width":"lineWidth",
fill:"fillColor",r:"radius"},colorCounter:0,init:function(a,b){var c,d,e=a.series;this.chart=a;this.options=b=this.setOptions(b);this.bindAxes();r(this,{name:b.name,state:"",pointAttr:{},visible:b.visible!==!1,selected:b.selected===!0});if(Z)b.animation=!1;d=b.events;for(c in d)J(this,c,d[c]);if(d&&d.click||b.point&&b.point.events&&b.point.events.click||b.allowPointSelect)a.runTrackerClick=!0;this.getColor();this.getSymbol();this.setData(b.data,!1);if(this.isCartesian)a.hasCartesianSeries=!0;e.push(this);
this._i=e.length-1;Kb(e,function(a,b){return p(a.options.index,a._i)-p(b.options.index,a._i)});n(e,function(a,b){a.index=b;a.name=a.name||"Series "+(b+1)});c=b.linkedTo;this.linkedSeries=[];if(da(c)&&(c=c===":previous"?e[this.index-1]:a.get(c)))c.linkedSeries.push(this),this.linkedParent=c},bindAxes:function(){var a=this,b=a.options,c=a.chart,d;a.isCartesian&&n(["xAxis","yAxis"],function(e){n(c[e],function(c){d=c.options;if(b[e]===d.index||b[e]!==v&&b[e]===d.id||b[e]===v&&d.index===0)c.series.push(a),
a[e]=c,c.isDirty=!0});a[e]||ua(18,!0)})},autoIncrement:function(){var a=this.options,b=this.xIncrement,b=p(b,a.pointStart,0);this.pointInterval=p(this.pointInterval,a.pointInterval,1);this.xIncrement=b+this.pointInterval;return b},getSegments:function(){var a=-1,b=[],c,d=this.points,e=d.length;if(e)if(this.options.connectNulls){for(c=e;c--;)d[c].y===null&&d.splice(c,1);d.length&&(b=[d])}else n(d,function(c,g){c.y===null?(g>a+1&&b.push(d.slice(a+1,g)),a=g):g===e-1&&b.push(d.slice(a+1,g+1))});this.segments=
b},setOptions:function(a){var b=this.chart.options,c=b.plotOptions,d=c[this.type];this.userOptions=a;a=x(d,c.series,a);this.tooltipOptions=x(b.tooltip,a.tooltip);d.marker===null&&delete a.marker;return a},getColor:function(){var a=this.options,b=this.userOptions,c=this.chart.options.colors,d=this.chart.counters,e;e=a.color||X[this.type].color;if(!e&&!a.colorByPoint)t(b._colorIndex)?a=b._colorIndex:(b._colorIndex=d.color,a=d.color++),e=c[a];this.color=e;d.wrapColor(c.length)},getSymbol:function(){var a=
this.userOptions,b=this.options.marker,c=this.chart,d=c.options.symbols,c=c.counters;this.symbol=b.symbol;if(!this.symbol)t(a._symbolIndex)?a=a._symbolIndex:(a._symbolIndex=c.symbol,a=c.symbol++),this.symbol=d[a];if(/^url/.test(this.symbol))b.radius=0;c.wrapSymbol(d.length)},drawLegendSymbol:function(a){var b=this.options,c=b.marker,d=a.options,e;e=d.symbolWidth;var f=this.chart.renderer,g=this.legendGroup,a=a.baseline-s(f.fontMetrics(d.itemStyle.fontSize).b*0.3);if(b.lineWidth){d={"stroke-width":b.lineWidth};
if(b.dashStyle)d.dashstyle=b.dashStyle;this.legendLine=f.path(["M",0,a,"L",e,a]).attr(d).add(g)}if(c&&c.enabled)b=c.radius,this.legendSymbol=e=f.symbol(this.symbol,e/2-b,a-b,2*b,2*b).add(g),e.isMarker=!0},addPoint:function(a,b,c,d){var e=this.options,f=this.data,g=this.graph,h=this.area,i=this.chart,j=this.xData,k=this.yData,l=this.zData,m=this.names,o=g&&g.shift||0,q=e.data;Ka(d,i);c&&n([g,h,this.graphNeg,this.areaNeg],function(a){if(a)a.shift=o+1});if(h)h.isArea=!0;b=p(b,!0);d={series:this};this.pointClass.prototype.applyOptions.apply(d,
[a]);j.push(d.x);k.push(this.toYData?this.toYData(d):d.y);l.push(d.z);if(m)m[d.x]=d.name;q.push(a);e.legendType==="point"&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),j.shift(),k.shift(),l.shift(),q.shift()));this.isDirtyData=this.isDirty=!0;b&&(this.getAttribs(),i.redraw())},setData:function(a,b){var c=this.points,d=this.options,e=this.chart,f=null,g=this.xAxis,h=g&&g.categories&&!g.categories.length?[]:null,i;this.xIncrement=null;this.pointRange=g&&g.categories?1:d.pointRange;
this.colorCounter=0;var j=[],k=[],l=[],m=a?a.length:[];i=p(d.turboThreshold,1E3);var o=this.pointArrayMap,o=o&&o.length,q=!!this.toYData;if(i&&m>i){for(i=0;f===null&&i<m;)f=a[i],i++;if(pa(f)){f=p(d.pointStart,0);d=p(d.pointInterval,1);for(i=0;i<m;i++)j[i]=f,k[i]=a[i],f+=d;this.xIncrement=f}else if(Ha(f))if(o)for(i=0;i<m;i++)d=a[i],j[i]=d[0],k[i]=d.slice(1,o+1);else for(i=0;i<m;i++)d=a[i],j[i]=d[0],k[i]=d[1]}else for(i=0;i<m;i++)if(a[i]!==v&&(d={series:this},this.pointClass.prototype.applyOptions.apply(d,
[a[i]]),j[i]=d.x,k[i]=q?this.toYData(d):d.y,l[i]=d.z,h&&d.name))h[d.x]=d.name;da(k[0])&&ua(14,!0);this.data=[];this.options.data=a;this.xData=j;this.yData=k;this.zData=l;this.names=h;for(i=c&&c.length||0;i--;)c[i]&&c[i].destroy&&c[i].destroy();if(g)g.minRange=g.userMinRange;this.isDirty=this.isDirtyData=e.isDirtyBox=!0;p(b,!0)&&e.redraw(!1)},remove:function(a,b){var c=this,d=c.chart,a=p(a,!0);if(!c.isRemoving)c.isRemoving=!0,C(c,"remove",null,function(){c.destroy();d.isDirtyLegend=d.isDirtyBox=!0;
a&&d.redraw(b)});c.isRemoving=!1},processData:function(a){var b=this.xData,c=this.yData,d=b.length,e;e=0;var f,g,h=this.xAxis,i=this.options,j=i.cropThreshold,k=this.isCartesian;if(k&&!this.isDirty&&!h.isDirty&&!this.yAxis.isDirty&&!a)return!1;if(k&&this.sorted&&(!j||d>j||this.forceCrop))if(a=h.min,h=h.max,b[d-1]<a||b[0]>h)b=[],c=[];else if(b[0]<a||b[d-1]>h)e=this.cropData(this.xData,this.yData,a,h),b=e.xData,c=e.yData,e=e.start,f=!0;for(h=b.length-1;h>=0;h--)d=b[h]-b[h-1],d>0&&(g===v||d<g)?g=d:d<
0&&this.requireSorting&&ua(15);this.cropped=f;this.cropStart=e;this.processedXData=b;this.processedYData=c;if(i.pointRange===null)this.pointRange=g||1;this.closestPointRange=g},cropData:function(a,b,c,d){var e=a.length,f=0,g=e,h;for(h=0;h<e;h++)if(a[h]>=c){f=u(0,h-1);break}for(;h<e;h++)if(a[h]>d){g=h+1;break}return{xData:a.slice(f,g),yData:b.slice(f,g),start:f,end:g}},generatePoints:function(){var a=this.options.data,b=this.data,c,d=this.processedXData,e=this.processedYData,f=this.pointClass,g=d.length,
h=this.cropStart||0,i,j=this.hasGroupedData,k,l=[],m;if(!b&&!j)b=[],b.length=a.length,b=this.data=b;for(m=0;m<g;m++)i=h+m,j?l[m]=(new f).init(this,[d[m]].concat(ha(e[m]))):(b[i]?k=b[i]:a[i]!==v&&(b[i]=k=(new f).init(this,a[i],d[m])),l[m]=k);if(b&&(g!==(c=b.length)||j))for(m=0;m<c;m++)if(m===h&&!j&&(m+=g),b[m])b[m].destroyElements(),b[m].plotX=v;this.data=b;this.points=l},setStackedPoints:function(){if(this.options.stacking&&!(this.visible!==!0&&this.chart.options.chart.ignoreHiddenSeries!==!1)){var a=
this.processedXData,b=this.processedYData,c=b.length,d=this.options,e=d.threshold,f=d.stack,d=d.stacking,g=this.stackKey,h="-"+g,i=this.yAxis,j=i.stacks,k=i.oldStacks,l=i.stacksMax,m,o,p,n,s,t;for(s=0;s<c;s++){o=a[s];t=b[s];n=(m=t<e)?h:g;l[n]||(l[n]=t);j[n]||(j[n]={});if(!j[n][o])k[n]&&k[n][o]?(j[n][o]=k[n][o],j[n][o].total=null):j[n][o]=new Mb(i,i.options.stackLabels,m,o,f,d);p=j[n][o];o=p.total;p.addValue(t);p.cacheExtremes(this,[o,o+t]);if(p.total>l[n]&&!m)l[n]=p.total;else if(p.total<l[n]&&m)l[n]=
p.total}i.oldStacks={}}},getExtremes:function(){var a=this.xAxis,b=this.yAxis,c=this.stackKey,d=this.options,e=d.threshold,f=this.processedXData,g=this.processedYData,h=g.length,i=[],j=0,k=a.min,a=a.max,l,m,o;d.stacking&&(m=b.stacksMax["-"+c]||e,o=b.stacksMax[c]||e);if(!t(m)||!t(o)){for(d=0;d<h;d++)if(l=f[d],c=g[d],e=c!==null&&c!==v&&(!b.isLog||c.length||c>0),l=this.getExtremesFromAll||this.cropped||(f[d+1]||l)>=k&&(f[d-1]||l)<=a,e&&l)if(e=c.length)for(;e--;)c[e]!==null&&(i[j++]=c[e]);else i[j++]=
c;m=p(m,Ia(i));o=p(o,ta(i))}this.dataMin=m;this.dataMax=o},translate:function(){this.processedXData||this.processData();this.generatePoints();for(var a=this.options,b=a.stacking,c=this.xAxis,d=c.categories,e=this.yAxis,f=this.points,g=f.length,h=!!this.modifyValue,i=a.pointPlacement,j=i==="between"||pa(i),k=a.threshold,a=0;a<g;a++){var l=f[a],m=l.x,o=l.y,n=l.low,u=e.stacks[(o<k?"-":"")+this.stackKey],r;if(e.isLog&&o<=0)l.y=o=null;l.plotX=c.translate(m,0,0,0,1,i);if(b&&this.visible&&u&&u[m])u=u[m],
r=u.total,u.cum=n=u.cum-o,o=n+o,u.cum===0&&(n=p(k,e.min)),e.isLog&&n<=0&&(n=null),b==="percent"&&(n=r?n*100/r:0,o=r?o*100/r:0),l.percentage=r?l.y*100/r:0,l.total=l.stackTotal=r,l.stackY=o,u.setOffset(this.pointXOffset||0,this.barW||0);l.yBottom=t(n)?e.translate(n,0,1,0,1):null;h&&(o=this.modifyValue(o,l));l.plotY=typeof o==="number"&&o!==Infinity?s(e.translate(o,0,1,0,1)*10)/10:v;l.clientX=j?c.translate(m,0,0,0,1):l.plotX;l.negative=l.y<(k||0);l.category=d&&d[l.x]!==v?d[l.x]:l.x}this.getSegments()},
setTooltipPoints:function(a){var b=[],c,d,e=(c=this.xAxis)?c.tooltipLen||c.len:this.chart.plotSizeX,f,g,h,i=[];if(this.options.enableMouseTracking!==!1){if(a)this.tooltipPoints=null;n(this.segments||this.points,function(a){b=b.concat(a)});c&&c.reversed&&(b=b.reverse());this.orderTooltipPoints&&this.orderTooltipPoints(b);a=b.length;for(h=0;h<a;h++){f=b[h];g=b[h+1];c=b[h-1]?d+1:0;for(d=b[h+1]?I(u(0,S((f.clientX+(g?g.wrappedClientX||g.clientX:e))/2)),e):e;c>=0&&c<=d;)i[c++]=f}this.tooltipPoints=i}},
tooltipHeaderFormatter:function(a){var b=this.tooltipOptions,c=b.xDateFormat,d=b.dateTimeLabelFormats,e=this.xAxis,f=e&&e.options.type==="datetime",b=b.headerFormat,e=e&&e.closestPointRange,g;if(f&&!c)if(e)for(g in y){if(y[g]>=e){c=d[g];break}}else c=d.day;f&&c&&pa(a.key)&&(b=b.replace("{point.key}","{point.key:"+c+"}"));return Aa(b,{point:a,series:this})},onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&C(this,"mouseOver");this.setState("hover");
a.hoverSeries=this},onMouseOut:function(){var a=this.options,b=this.chart,c=b.tooltip,d=b.hoverPoint;if(d)d.onMouseOut();this&&a.events.mouseOut&&C(this,"mouseOut");c&&!a.stickyTracking&&(!c.shared||this.noSharedTooltip)&&c.hide();this.setState();b.hoverSeries=null},animate:function(a){var b=this,c=b.chart,d=c.renderer,e;e=b.options.animation;var f=c.clipBox,g=c.inverted,h;if(e&&!U(e))e=X[b.type].animation;h="_sharedClip"+e.duration+e.easing;if(a)a=c[h],e=c[h+"m"],a||(c[h]=a=d.clipRect(r(f,{width:0})),
c[h+"m"]=e=d.clipRect(-99,g?-c.plotLeft:-c.plotTop,99,g?c.chartWidth:c.chartHeight)),b.group.clip(a),b.markerGroup.clip(e),b.sharedClipKey=h;else{if(a=c[h])a.animate({width:c.plotSizeX},e),c[h+"m"].animate({width:c.plotSizeX+99},e);b.animate=null;b.animationTimeout=setTimeout(function(){b.afterAnimate()},e.duration)}},afterAnimate:function(){var a=this.chart,b=this.sharedClipKey,c=this.group;c&&this.options.clip!==!1&&(c.clip(a.clipRect),this.markerGroup.clip());setTimeout(function(){b&&a[b]&&(a[b]=
a[b].destroy(),a[b+"m"]=a[b+"m"].destroy())},100)},drawPoints:function(){var a,b=this.points,c=this.chart,d,e,f,g,h,i,j,k,l=this.options.marker,m,o=this.markerGroup;if(l.enabled||this._hasPointMarkers)for(f=b.length;f--;)if(g=b[f],d=S(g.plotX),e=g.plotY,k=g.graphic,i=g.marker||{},a=l.enabled&&i.enabled===v||i.enabled,m=c.isInsidePlot(s(d),e,c.inverted),a&&e!==v&&!isNaN(e)&&g.y!==null)if(a=g.pointAttr[g.selected?"select":""],h=a.r,i=p(i.symbol,this.symbol),j=i.indexOf("url")===0,k)k.attr({visibility:m?
Y?"inherit":"visible":"hidden"}).animate(r({x:d-h,y:e-h},k.symbolName?{width:2*h,height:2*h}:{}));else{if(m&&(h>0||j))g.graphic=c.renderer.symbol(i,d-h,e-h,2*h,2*h).attr(a).add(o)}else if(k)g.graphic=k.destroy()},convertAttribs:function(a,b,c,d){var e=this.pointAttrToOptions,f,g,h={},a=a||{},b=b||{},c=c||{},d=d||{};for(f in e)g=e[f],h[f]=p(a[g],b[f],c[f],d[f]);return h},getAttribs:function(){var a=this,b=a.options,c=X[a.type].marker?b.marker:b,d=c.states,e=d.hover,f,g=a.color,h={stroke:g,fill:g},
i=a.points||[],j=[],k,l=a.pointAttrToOptions,m=b.negativeColor,o;b.marker?(e.radius=e.radius||c.radius+2,e.lineWidth=e.lineWidth||c.lineWidth+1):e.color=e.color||oa(e.color||g).brighten(e.brightness).get();j[""]=a.convertAttribs(c,h);n(["hover","select"],function(b){j[b]=a.convertAttribs(d[b],j[""])});a.pointAttr=j;for(g=i.length;g--;){h=i[g];if((c=h.options&&h.options.marker||h.options)&&c.enabled===!1)c.radius=0;if(h.negative&&m)h.color=h.fillColor=m;f=b.colorByPoint||h.color;if(h.options)for(o in l)t(c[l[o]])&&
(f=!0);if(f){c=c||{};k=[];d=c.states||{};f=d.hover=d.hover||{};if(!b.marker)f.color=oa(f.color||h.color).brighten(f.brightness||e.brightness).get();k[""]=a.convertAttribs(r({color:h.color},c),j[""]);k.hover=a.convertAttribs(d.hover,j.hover,k[""]);k.select=a.convertAttribs(d.select,j.select,k[""]);if(h.negative&&b.marker&&m)k[""].fill=k.hover.fill=k.select.fill=a.convertAttribs({fillColor:m}).fill}else k=j;h.pointAttr=k}},update:function(a,b){var c=this.chart,d=this.type,a=x(this.userOptions,{animation:!1,
index:this.index,pointStart:this.xData[0]},{data:this.options.data},a);this.remove(!1);r(this,$[a.type||d].prototype);this.init(c,a);p(b,!0)&&c.redraw(!1)},destroy:function(){var a=this,b=a.chart,c=/AppleWebKit\/533/.test(Da),d,e,f=a.data||[],g,h,i;C(a,"destroy");aa(a);n(["xAxis","yAxis"],function(b){if(i=a[b])fa(i.series,a),i.isDirty=i.forceRedraw=!0});a.legendItem&&a.chart.legend.destroyItem(a);for(e=f.length;e--;)(g=f[e])&&g.destroy&&g.destroy();a.points=null;clearTimeout(a.animationTimeout);n("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","),
function(b){a[b]&&(d=c&&b==="group"?"hide":"destroy",a[b][d]())});if(b.hoverSeries===a)b.hoverSeries=null;fa(b.series,a);for(h in a)delete a[h]},drawDataLabels:function(){var a=this,b=a.options.dataLabels,c=a.points,d,e,f,g;if(b.enabled||a._hasPointLabels)a.dlProcessOptions&&a.dlProcessOptions(b),g=a.plotGroup("dataLabelsGroup","data-labels",a.visible?"visible":"hidden",b.zIndex||6),e=b,n(c,function(c){var i,j=c.dataLabel,k,l,m=c.connector,o=!0;d=c.options&&c.options.dataLabels;i=e.enabled||d&&d.enabled;
if(j&&!i)c.dataLabel=j.destroy();else if(i){b=x(e,d);i=b.rotation;k=c.getLabelConfig();f=b.format?Aa(b.format,k):b.formatter.call(k,b);b.style.color=p(b.color,b.style.color,a.color,"black");if(j)if(t(f))j.attr({text:f}),o=!1;else{if(c.dataLabel=j=j.destroy(),m)c.connector=m.destroy()}else if(t(f)){j={fill:b.backgroundColor,stroke:b.borderColor,"stroke-width":b.borderWidth,r:b.borderRadius||0,rotation:i,padding:b.padding,zIndex:1};for(l in j)j[l]===v&&delete j[l];j=c.dataLabel=a.chart.renderer[i?"text":
"label"](f,0,-999,null,null,null,b.useHTML).attr(j).css(b.style).add(g).shadow(b.shadow)}j&&a.alignDataLabel(c,j,b,null,o)}})},alignDataLabel:function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=p(a.plotX,-999),i=p(a.plotY,-999),a=b.getBBox(),d=r({x:g?f.plotWidth-i:h,y:s(g?f.plotHeight-h:i),width:0,height:0},d);r(c,{width:a.width,height:a.height});c.rotation?(d={align:c.align,x:d.x+c.x+d.width/2,y:d.y+c.y+d.height/2},b[e?"attr":"animate"](d)):(b.align(c,null,d),d=b.alignAttr);b.attr({visibility:c.crop===
!1||f.isInsidePlot(d.x,d.y)&&f.isInsidePlot(d.x+a.width,d.y+a.height)?f.renderer.isSVG?"inherit":"visible":"hidden"})},getSegmentPath:function(a){var b=this,c=[],d=b.options.step;n(a,function(e,f){var g=e.plotX,h=e.plotY,i;b.getPointSpline?c.push.apply(c,b.getPointSpline(a,e,f)):(c.push(f?"L":"M"),d&&f&&(i=a[f-1],d==="right"?c.push(i.plotX,h):d==="center"?c.push((i.plotX+g)/2,i.plotY,(i.plotX+g)/2,h):c.push(g,i.plotY)),c.push(e.plotX,e.plotY))});return c},getGraphPath:function(){var a=this,b=[],c,
d=[];n(a.segments,function(e){c=a.getSegmentPath(e);e.length>1?b=b.concat(c):d.push(e[0])});a.singlePoints=d;return a.graphPath=b},drawGraph:function(){var a=this,b=this.options,c=[["graph",b.lineColor||this.color]],d=b.lineWidth,e=b.dashStyle,f=this.getGraphPath(),g=b.negativeColor;g&&c.push(["graphNeg",g]);n(c,function(c,g){var j=c[0],k=a[j];if(k)Wa(k),k.animate({d:f});else if(d&&f.length){k={stroke:c[1],"stroke-width":d,zIndex:1};if(e)k.dashstyle=e;a[j]=a.chart.renderer.path(f).attr(k).add(a.group).shadow(!g&&
b.shadow)}})},clipNeg:function(){var a=this.options,b=this.chart,c=b.renderer,d=a.negativeColor||a.negativeFillColor,e,f=this.graph,g=this.area,h=this.posClip,i=this.negClip;e=b.chartWidth;var j=b.chartHeight,k=u(e,j),l=this.yAxis;if(d&&(f||g)){d=s(l.toPixels(a.threshold||0,!0));a={x:0,y:0,width:k,height:d};k={x:0,y:d,width:k,height:k};if(b.inverted)a.height=k.y=b.plotWidth-d,c.isVML&&(a={x:b.plotWidth-d-b.plotLeft,y:0,width:e,height:j},k={x:d+b.plotLeft-e,y:0,width:b.plotLeft+d,height:e});l.reversed?
(b=k,e=a):(b=a,e=k);h?(h.animate(b),i.animate(e)):(this.posClip=h=c.clipRect(b),this.negClip=i=c.clipRect(e),f&&this.graphNeg&&(f.clip(h),this.graphNeg.clip(i)),g&&(g.clip(h),this.areaNeg.clip(i)))}},invertGroups:function(){function a(){var a={width:b.yAxis.len,height:b.xAxis.len};n(["group","markerGroup"],function(c){b[c]&&b[c].attr(a).invert()})}var b=this,c=b.chart;if(b.xAxis)J(c,"resize",a),J(b,"destroy",function(){aa(c,"resize",a)}),a(),b.invertGroups=a},plotGroup:function(a,b,c,d,e){var f=this[a],
g=!f;g&&(this[a]=f=this.chart.renderer.g(b).attr({visibility:c,zIndex:d||0.1}).add(e));f[g?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){return{translateX:this.xAxis?this.xAxis.left:this.chart.plotLeft,translateY:this.yAxis?this.yAxis.top:this.chart.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this.chart,b,c=this.options,d=c.animation&&!!this.animate&&a.renderer.isSVG,e=this.visible?"visible":"hidden",f=c.zIndex,g=this.hasRendered,h=a.seriesGroup;b=this.plotGroup("group",
"series",e,f,h);this.markerGroup=this.plotGroup("markerGroup","markers",e,f,h);d&&this.animate(!0);this.getAttribs();b.inverted=this.isCartesian?a.inverted:!1;this.drawGraph&&(this.drawGraph(),this.clipNeg());this.drawDataLabels();this.drawPoints();this.options.enableMouseTracking!==!1&&this.drawTracker();a.inverted&&this.invertGroups();c.clip!==!1&&!this.sharedClipKey&&!g&&b.clip(a.clipRect);d?this.animate():g||this.afterAnimate();this.isDirty=this.isDirtyData=!1;this.hasRendered=!0},redraw:function(){var a=
this.chart,b=this.isDirtyData,c=this.group,d=this.xAxis,e=this.yAxis;c&&(a.inverted&&c.attr({width:a.plotWidth,height:a.plotHeight}),c.animate({translateX:p(d&&d.left,a.plotLeft),translateY:p(e&&e.top,a.plotTop)}));this.translate();this.setTooltipPoints(!0);this.render();b&&C(this,"updatedData")},setState:function(a){var b=this.options,c=this.graph,d=this.graphNeg,e=b.states,b=b.lineWidth,a=a||"";if(this.state!==a)this.state=a,e[a]&&e[a].enabled===!1||(a&&(b=e[a].lineWidth||b+1),c&&!c.dashstyle&&
(a={"stroke-width":b},c.attr(a),d&&d.attr(a)))},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,f,g=d.options.chart.ignoreHiddenSeries,h=c.visible;f=(c.visible=a=c.userOptions.visible=a===v?!h:a)?"show":"hide";n(["group","dataLabelsGroup","markerGroup","tracker"],function(a){if(c[a])c[a][f]()});if(d.hoverSeries===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&n(d.series,function(a){if(a.options.stacking&&a.visible)a.isDirty=!0});n(c.linkedSeries,function(b){b.setVisible(a,
!1)});if(g)d.isDirtyBox=!0;b!==!1&&d.redraw();C(c,f)},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=a===v?!this.selected:a;if(this.checkbox)this.checkbox.checked=a;C(this,a?"select":"unselect")},drawTracker:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,f=a.chart,g=f.pointer,h=f.renderer,i=f.options.tooltip.snap,j=a.tracker,k=b.cursor,k=k&&{cursor:k},l=a.singlePoints,m,o=function(){if(f.hoverSeries!==
a)a.onMouseOver()};if(e&&!c)for(m=e+1;m--;)d[m]==="M"&&d.splice(m+1,0,d[m+1]-i,d[m+2],"L"),(m&&d[m]==="M"||m===e)&&d.splice(m,0,"L",d[m-2]+i,d[m-1]);for(m=0;m<l.length;m++)e=l[m],d.push("M",e.plotX-i,e.plotY,"L",e.plotX+i,e.plotY);if(j)j.attr({d:d});else if(a.tracker=j=h.path(d).attr({"class":"highcharts-tracker","stroke-linejoin":"round",visibility:a.visible?"visible":"hidden",stroke:Qb,fill:c?Qb:R,"stroke-width":b.lineWidth+(c?0:2*i),zIndex:2}).addClass("highcharts-tracker").on("mouseover",o).on("mouseout",
function(a){g.onTrackerMouseOut(a)}).css(k).add(a.markerGroup),hb)j.on("touchstart",o)}};L=ga(Q);$.line=L;X.area=x(W,{threshold:0});L=ga(Q,{type:"area",getSegments:function(){var a=[],b=[],c=[],d=this.xAxis,e=this.yAxis,f=e.stacks[this.stackKey],g={},h,i,j=this.points,k,l,m;if(this.options.stacking&&!this.cropped){for(l=0;l<j.length;l++)g[j[l].x]=j[l];for(m in f)c.push(+m);c.sort(function(a,b){return a-b});n(c,function(a){g[a]?b.push(g[a]):(h=d.translate(a),k=f[a].percent?f[a].total?f[a].cum*100/
f[a].total:0:f[a].cum,i=e.toPixels(k,!0),b.push({y:null,plotX:h,clientX:h,plotY:i,yBottom:i,onMouseOver:xa}))});b.length&&a.push(b)}else Q.prototype.getSegments.call(this),a=this.segments;this.segments=a},getSegmentPath:function(a){var b=Q.prototype.getSegmentPath.call(this,a),c=[].concat(b),d,e=this.options;b.length===3&&c.push("L",b[1],b[2]);if(e.stacking&&!this.closedStacks)for(d=a.length-1;d>=0;d--)d<a.length-1&&e.step&&c.push(a[d+1].plotX,a[d].yBottom),c.push(a[d].plotX,a[d].yBottom);else this.closeSegment(c,
a);this.areaPath=this.areaPath.concat(c);return b},closeSegment:function(a,b){var c=this.yAxis.getThreshold(this.options.threshold);a.push("L",b[b.length-1].plotX,c,"L",b[0].plotX,c)},drawGraph:function(){this.areaPath=[];Q.prototype.drawGraph.apply(this);var a=this,b=this.areaPath,c=this.options,d=c.negativeColor,e=c.negativeFillColor,f=[["area",this.color,c.fillColor]];(d||e)&&f.push(["areaNeg",d,e]);n(f,function(d){var e=d[0],f=a[e];f?f.animate({d:b}):a[e]=a.chart.renderer.path(b).attr({fill:p(d[2],
oa(d[1]).setOpacity(p(c.fillOpacity,0.75)).get()),zIndex:0}).add(a.group)})},drawLegendSymbol:function(a,b){b.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,a.options.symbolWidth,12,2).attr({zIndex:3}).add(b.legendGroup)}});$.area=L;X.spline=x(W);K=ga(Q,{type:"spline",getPointSpline:function(a,b,c){var d=b.plotX,e=b.plotY,f=a[c-1],g=a[c+1],h,i,j,k;if(f&&g){a=f.plotY;j=g.plotX;var g=g.plotY,l;h=(1.5*d+f.plotX)/2.5;i=(1.5*e+a)/2.5;j=(1.5*d+j)/2.5;k=(1.5*e+g)/2.5;l=(k-i)*(j-d)/(j-h)+e-k;i+=l;
k+=l;i>a&&i>e?(i=u(a,e),k=2*e-i):i<a&&i<e&&(i=I(a,e),k=2*e-i);k>g&&k>e?(k=u(g,e),i=2*e-k):k<g&&k<e&&(k=I(g,e),i=2*e-k);b.rightContX=j;b.rightContY=k}c?(b=["C",f.rightContX||f.plotX,f.rightContY||f.plotY,h||d,i||e,d,e],f.rightContX=f.rightContY=null):b=["M",d,e];return b}});$.spline=K;X.areaspline=x(X.area);la=L.prototype;K=ga(K,{type:"areaspline",closedStacks:!0,getSegmentPath:la.getSegmentPath,closeSegment:la.closeSegment,drawGraph:la.drawGraph,drawLegendSymbol:la.drawLegendSymbol});$.areaspline=
K;X.column=x(W,{borderColor:"#FFFFFF",borderWidth:1,borderRadius:0,groupPadding:0.2,marker:null,pointPadding:0.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{brightness:0.1,shadow:!1},select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}},dataLabels:{align:null,verticalAlign:null,y:null},stickyTracking:!1,threshold:0});K=ga(Q,{type:"column",tooltipOutsidePlot:!0,pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color",r:"borderRadius"},trackerGroups:["group",
"dataLabelsGroup"],init:function(){Q.prototype.init.apply(this,arguments);var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0})},getColumnMetrics:function(){var a=this,b=a.options,c=a.xAxis,d=a.yAxis,e=c.reversed,f,g={},h,i=0;b.grouping===!1?i=1:n(a.chart.series,function(b){var c=b.options,e=b.yAxis;if(b.type===a.type&&b.visible&&d.len===e.len&&d.pos===e.pos)c.stacking?(f=b.stackKey,g[f]===v&&(g[f]=i++),h=g[f]):c.grouping!==!1&&(h=i++),b.columnIndex=h});var c=
I(P(c.transA)*(c.ordinalSlope||b.pointRange||c.closestPointRange||1),c.len),j=c*b.groupPadding,k=(c-2*j)/i,l=b.pointWidth,b=t(l)?(k-l)/2:k*b.pointPadding,l=p(l,k-2*b);return a.columnMetrics={width:l,offset:b+(j+((e?i-(a.columnIndex||0):a.columnIndex)||0)*k-c/2)*(e?-1:1)}},translate:function(){var a=this.chart,b=this.options,c=b.borderWidth,d=this.yAxis,e=this.translatedThreshold=d.getThreshold(b.threshold),f=p(b.minPointLength,5),b=this.getColumnMetrics(),g=b.width,h=this.barW=ja(u(g,1+2*c)),i=this.pointXOffset=
b.offset;Q.prototype.translate.apply(this);n(this.points,function(b){var k=I(u(-999,b.plotY),d.len+999),l=p(b.yBottom,e),m=b.plotX+i,o=ja(I(k,l)),k=ja(u(k,l)-o);P(k)<f&&f&&(k=f,o=s(P(o-e)>f?l-f:e-(d.translate(b.y,0,1,0,1)<=e?f:0)));b.barX=m;b.pointWidth=g;b.shapeType="rect";b.shapeArgs=b=a.renderer.Element.prototype.crisp.call(0,c,m,o,h,k);c%2&&(b.y-=1,b.height+=1)})},getSymbol:xa,drawLegendSymbol:L.prototype.drawLegendSymbol,drawGraph:xa,drawPoints:function(){var a=this,b=a.options,c=a.chart.renderer,
d;n(a.points,function(e){var f=e.plotY,g=e.graphic;if(f!==v&&!isNaN(f)&&e.y!==null)d=e.shapeArgs,g?(Wa(g),g.animate(x(d))):e.graphic=c[e.shapeType](d).attr(e.pointAttr[e.selected?"select":""]).add(a.group).shadow(b.shadow,null,b.stacking&&!b.borderRadius);else if(g)e.graphic=g.destroy()})},drawTracker:function(){var a=this,b=a.chart,c=b.pointer,d=a.options.cursor,e=d&&{cursor:d},f=function(c){var d=c.target,e;if(b.hoverSeries!==a)a.onMouseOver();for(;d&&!e;)e=d.point,d=d.parentNode;if(e!==v&&e!==
b.hoverPoint)e.onMouseOver(c)};n(a.points,function(a){if(a.graphic)a.graphic.element.point=a;if(a.dataLabel)a.dataLabel.element.point=a});a._hasTracking?a._hasTracking=!0:n(a.trackerGroups,function(b){if(a[b]&&(a[b].addClass("highcharts-tracker").on("mouseover",f).on("mouseout",function(a){c.onTrackerMouseOut(a)}).css(e),hb))a[b].on("touchstart",f)})},alignDataLabel:function(a,b,c,d,e){var f=this.chart,g=f.inverted,h=a.dlBox||a.shapeArgs,i=a.below||a.plotY>p(this.translatedThreshold,f.plotSizeY),
j=p(c.inside,!!this.options.stacking);if(h&&(d=x(h),g&&(d={x:f.plotWidth-d.y-d.height,y:f.plotHeight-d.x-d.width,width:d.height,height:d.width}),!j))g?(d.x+=i?0:d.width,d.width=0):(d.y+=i?d.height:0,d.height=0);c.align=p(c.align,!g||j?"center":i?"right":"left");c.verticalAlign=p(c.verticalAlign,g||j?"middle":i?"top":"bottom");Q.prototype.alignDataLabel.call(this,a,b,c,d,e)},animate:function(a){var b=this.yAxis,c=this.options,d=this.chart.inverted,e={};if(Y)a?(e.scaleY=0.001,a=I(b.pos+b.len,u(b.pos,
b.toPixels(c.threshold))),d?e.translateX=a-b.len:e.translateY=a,this.group.attr(e)):(e.scaleY=1,e[d?"translateX":"translateY"]=b.pos,this.group.animate(e,this.options.animation),this.animate=null)},remove:function(){var a=this,b=a.chart;b.hasRendered&&n(b.series,function(b){if(b.type===a.type)b.isDirty=!0});Q.prototype.remove.apply(a,arguments)}});$.column=K;X.bar=x(X.column);la=ga(K,{type:"bar",inverted:!0});$.bar=la;X.scatter=x(W,{lineWidth:0,tooltip:{headerFormat:'<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',
pointFormat:"x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",followPointer:!0},stickyTracking:!1});la=ga(Q,{type:"scatter",sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["markerGroup"],drawTracker:K.prototype.drawTracker,setTooltipPoints:xa});$.scatter=la;X.pie=x(W,{borderColor:"#FFFFFF",borderWidth:1,center:[null,null],clip:!1,colorByPoint:!0,dataLabels:{distance:30,enabled:!0,formatter:function(){return this.point.name}},ignoreHiddenPoint:!0,legendType:"point",marker:null,size:null,
showInLegend:!1,slicedOffset:10,states:{hover:{brightness:0.1,shadow:!1}},stickyTracking:!1,tooltip:{followPointer:!0}});W={type:"pie",isCartesian:!1,pointClass:ga(Pa,{init:function(){Pa.prototype.init.apply(this,arguments);var a=this,b;if(a.y<0)a.y=null;r(a,{visible:a.visible!==!1,name:p(a.name,"Slice")});b=function(b){a.slice(b.type==="select")};J(a,"select",b);J(a,"unselect",b);return a},setVisible:function(a){var b=this,c=b.series,d=c.chart,e;b.visible=b.options.visible=a=a===v?!b.visible:a;c.options.data[na(b,
c.data)]=b.options;e=a?"show":"hide";n(["graphic","dataLabel","connector","shadowGroup"],function(a){if(b[a])b[a][e]()});b.legendItem&&d.legend.colorizeItem(b,a);if(!c.isDirty&&c.options.ignoreHiddenPoint)c.isDirty=!0,d.redraw()},slice:function(a,b,c){var d=this.series;Ka(c,d.chart);p(b,!0);this.sliced=this.options.sliced=a=t(a)?a:!this.sliced;d.options.data[na(this,d.data)]=this.options;a=a?this.slicedTranslation:{translateX:0,translateY:0};this.graphic.animate(a);this.shadowGroup&&this.shadowGroup.animate(a)}}),
requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"borderColor","stroke-width":"borderWidth",fill:"color"},getColor:xa,animate:function(a){var b=this,c=b.points,d=b.startAngleRad;if(!a)n(c,function(a){var c=a.graphic,a=a.shapeArgs;c&&(c.attr({r:b.center[3]/2,start:d,end:d}),c.animate({r:a.r,start:a.start,end:a.end},b.options.animation))}),b.animate=null},setData:function(a,b){Q.prototype.setData.call(this,a,!1);this.processData();this.generatePoints();
p(b,!0)&&this.chart.redraw()},generatePoints:function(){var a,b=0,c,d,e,f=this.options.ignoreHiddenPoint;Q.prototype.generatePoints.call(this);c=this.points;d=c.length;for(a=0;a<d;a++)e=c[a],b+=f&&!e.visible?0:e.y;this.total=b;for(a=0;a<d;a++)e=c[a],e.percentage=e.y/b*100,e.total=b},getCenter:function(){var a=this.options,b=this.chart,c=2*(a.slicedOffset||0),d,e=b.plotWidth-2*c,f=b.plotHeight-2*c,b=a.center,a=[p(b[0],"50%"),p(b[1],"50%"),a.size||"100%",a.innerSize||0],g=I(e,f),h;return Na(a,function(a,
b){h=/%$/.test(a);d=b<2||b===2&&h;return(h?[e,f,g,g][b]*A(a)/100:a)+(d?c:0)})},translate:function(a){this.generatePoints();var b=0,c=this.options,d=c.slicedOffset,e=d+c.borderWidth,f,g,h,i=this.startAngleRad=Ma/180*((c.startAngle||0)%360-90),j=this.points,k=2*Ma,l=c.dataLabels.distance,c=c.ignoreHiddenPoint,m,o=j.length,n;if(!a)this.center=a=this.getCenter();this.getX=function(b,c){h=N.asin((b-a[1])/(a[2]/2+l));return a[0]+(c?-1:1)*V(h)*(a[2]/2+l)};for(m=0;m<o;m++){n=j[m];f=s((i+b*k)*1E3)/1E3;if(!c||
n.visible)b+=n.percentage/100;g=s((i+b*k)*1E3)/1E3;n.shapeType="arc";n.shapeArgs={x:a[0],y:a[1],r:a[2]/2,innerR:a[3]/2,start:f,end:g};h=(g+f)/2;h>0.75*k&&(h-=2*Ma);n.slicedTranslation={translateX:s(V(h)*d),translateY:s(ba(h)*d)};f=V(h)*a[2]/2;g=ba(h)*a[2]/2;n.tooltipPos=[a[0]+f*0.7,a[1]+g*0.7];n.half=h<k/4?0:1;n.angle=h;e=I(e,l/2);n.labelPos=[a[0]+f+V(h)*l,a[1]+g+ba(h)*l,a[0]+f+V(h)*e,a[1]+g+ba(h)*e,a[0]+f,a[1]+g,l<0?"center":n.half?"right":"left",h]}this.setTooltipPoints()},drawGraph:null,drawPoints:function(){var a=
this,b=a.chart.renderer,c,d,e=a.options.shadow,f,g;if(e&&!a.shadowGroup)a.shadowGroup=b.g("shadow").add(a.group);n(a.points,function(h){d=h.graphic;g=h.shapeArgs;f=h.shadowGroup;if(e&&!f)f=h.shadowGroup=b.g("shadow").add(a.shadowGroup);c=h.sliced?h.slicedTranslation:{translateX:0,translateY:0};f&&f.attr(c);d?d.animate(r(g,c)):h.graphic=d=b.arc(g).setRadialReference(a.center).attr(h.pointAttr[h.selected?"select":""]).attr({"stroke-linejoin":"round"}).attr(c).add(a.group).shadow(e,f);h.visible===!1&&
h.setVisible(!1)})},drawDataLabels:function(){var a=this,b=a.data,c,d=a.chart,e=a.options.dataLabels,f=p(e.connectorPadding,10),g=p(e.connectorWidth,1),h=d.plotWidth,d=d.plotHeight,i,j,k=p(e.softConnector,!0),l=e.distance,m=a.center,o=m[2]/2,q=m[1],t=l>0,r,w,v,x,A=[[],[]],z,y,G,H,B,C=[0,0,0,0],I=function(a,b){return b.y-a.y},M=function(a,b){a.sort(function(a,c){return a.angle!==void 0&&(c.angle-a.angle)*b})};if(a.visible&&(e.enabled||a._hasPointLabels)){Q.prototype.drawDataLabels.apply(a);n(b,function(a){a.dataLabel&&
A[a.half].push(a)});for(H=0;!x&&b[H];)x=b[H]&&b[H].dataLabel&&(b[H].dataLabel.getBBox().height||21),H++;for(H=2;H--;){var b=[],L=[],J=A[H],K=J.length,E;M(J,H-0.5);if(l>0){for(B=q-o-l;B<=q+o+l;B+=x)b.push(B);w=b.length;if(K>w){c=[].concat(J);c.sort(I);for(B=K;B--;)c[B].rank=B;for(B=K;B--;)J[B].rank>=w&&J.splice(B,1);K=J.length}for(B=0;B<K;B++){c=J[B];v=c.labelPos;c=9999;var O,N;for(N=0;N<w;N++)O=P(b[N]-v[1]),O<c&&(c=O,E=N);if(E<B&&b[B]!==null)E=B;else for(w<K-B+E&&b[B]!==null&&(E=w-K+B);b[E]===null;)E++;
L.push({i:E,y:b[E]});b[E]=null}L.sort(I)}for(B=0;B<K;B++){c=J[B];v=c.labelPos;r=c.dataLabel;G=c.visible===!1?"hidden":"visible";c=v[1];if(l>0){if(w=L.pop(),E=w.i,y=w.y,c>y&&b[E+1]!==null||c<y&&b[E-1]!==null)y=c}else y=c;z=e.justify?m[0]+(H?-1:1)*(o+l):a.getX(E===0||E===b.length-1?c:y,H);r._attr={visibility:G,align:v[6]};r._pos={x:z+e.x+({left:f,right:-f}[v[6]]||0),y:y+e.y-10};r.connX=z;r.connY=y;if(this.options.size===null)w=r.width,z-w<f?C[3]=u(s(w-z+f),C[3]):z+w>h-f&&(C[1]=u(s(z+w-h+f),C[1])),y-
x/2<0?C[0]=u(s(-y+x/2),C[0]):y+x/2>d&&(C[2]=u(s(y+x/2-d),C[2]))}}if(ta(C)===0||this.verifyDataLabelOverflow(C))this.placeDataLabels(),t&&g&&n(this.points,function(b){i=b.connector;v=b.labelPos;if((r=b.dataLabel)&&r._pos)G=r._attr.visibility,z=r.connX,y=r.connY,j=k?["M",z+(v[6]==="left"?5:-5),y,"C",z,y,2*v[2]-v[4],2*v[3]-v[5],v[2],v[3],"L",v[4],v[5]]:["M",z+(v[6]==="left"?5:-5),y,"L",v[2],v[3],"L",v[4],v[5]],i?(i.animate({d:j}),i.attr("visibility",G)):b.connector=i=a.chart.renderer.path(j).attr({"stroke-width":g,
stroke:e.connectorColor||b.color||"#606060",visibility:G}).add(a.group);else if(i)b.connector=i.destroy()})}},verifyDataLabelOverflow:function(a){var b=this.center,c=this.options,d=c.center,e=c=c.minSize||80,f;d[0]!==null?e=u(b[2]-u(a[1],a[3]),c):(e=u(b[2]-a[1]-a[3],c),b[0]+=(a[3]-a[1])/2);d[1]!==null?e=u(I(e,b[2]-u(a[0],a[2])),c):(e=u(I(e,b[2]-a[0]-a[2]),c),b[1]+=(a[0]-a[2])/2);e<b[2]?(b[2]=e,this.translate(b),n(this.points,function(a){if(a.dataLabel)a.dataLabel._pos=null}),this.drawDataLabels()):
f=!0;return f},placeDataLabels:function(){n(this.points,function(a){var a=a.dataLabel,b;if(a)(b=a._pos)?(a.attr(a._attr),a[a.moved?"animate":"attr"](b),a.moved=!0):a&&a.attr({y:-999})})},alignDataLabel:xa,drawTracker:K.prototype.drawTracker,drawLegendSymbol:L.prototype.drawLegendSymbol,getSymbol:xa};W=ga(Q,W);$.pie=W;r(Highcharts,{Axis:db,Chart:xb,Color:oa,Legend:wb,Pointer:vb,Point:Pa,Tick:La,Tooltip:ub,Renderer:Va,Series:Q,SVGElement:va,SVGRenderer:Fa,arrayMin:Ia,arrayMax:ta,charts:Ea,dateFormat:Xa,
format:Aa,pathAnim:zb,getOptions:function(){return O},hasBidiBug:Vb,isTouchDevice:Ob,numberFormat:ya,seriesTypes:$,setOptions:function(a){O=x(O,a);Lb();return O},addEvent:J,removeEvent:aa,createElement:T,discardElement:Ta,css:M,each:n,extend:r,map:Na,merge:x,pick:p,splat:ha,extendClass:ga,pInt:A,wrap:Bb,svg:Y,canvas:Z,vml:!Y&&!Z,product:"Highcharts",version:"3.0.4"})})();
;
/*
 Highcharts JS v4.0.4 (2014-09-02)
 Exporting module

 (c) 2010-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){var A=f.Chart,t=f.addEvent,B=f.removeEvent,l=f.createElement,o=f.discardElement,v=f.css,k=f.merge,r=f.each,p=f.extend,D=Math.max,j=document,C=window,E=f.isTouchDevice,F=f.Renderer.prototype.symbols,s=f.getOptions(),y;p(s.lang,{printChart:"Print chart",downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",contextButtonTitle:"Chart context menu"});s.navigation={menuStyle:{border:"1px solid #A0A0A0",
background:"#FFFFFF",padding:"5px 0"},menuItemStyle:{padding:"0 10px",background:"none",color:"#303030",fontSize:E?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{symbolFill:"#E0E0E0",symbolSize:14,symbolStroke:"#666",symbolStrokeWidth:3,symbolX:12.5,symbolY:10.5,align:"right",buttonSpacing:3,height:22,theme:{fill:"white",stroke:"none"},verticalAlign:"top",width:24}};s.exporting={type:"image/png",url:"http://export.highcharts.com/",buttons:{contextButton:{menuClassName:"highcharts-contextmenu",
symbol:"menu",_titleKey:"contextButtonTitle",menuItems:[{textKey:"printChart",onclick:function(){this.print()}},{separator:!0},{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]}}};f.post=function(b,a,d){var c,b=l("form",k({method:"post",
action:b,enctype:"multipart/form-data"},d),{display:"none"},j.body);for(c in a)l("input",{type:"hidden",name:c,value:a[c]},null,b);b.submit();o(b)};p(A.prototype,{getSVG:function(b){var a=this,d,c,z,h,g=k(a.options,b);if(!j.createElementNS)j.createElementNS=function(a,b){return j.createElement(b)};b=l("div",null,{position:"absolute",top:"-9999em",width:a.chartWidth+"px",height:a.chartHeight+"px"},j.body);c=a.renderTo.style.width;h=a.renderTo.style.height;c=g.exporting.sourceWidth||g.chart.width||
/px$/.test(c)&&parseInt(c,10)||600;h=g.exporting.sourceHeight||g.chart.height||/px$/.test(h)&&parseInt(h,10)||400;p(g.chart,{animation:!1,renderTo:b,forExport:!0,width:c,height:h});g.exporting.enabled=!1;g.series=[];r(a.series,function(a){z=k(a.options,{animation:!1,enableMouseTracking:!1,showCheckbox:!1,visible:a.visible});z.isInternal||g.series.push(z)});d=new f.Chart(g,a.callback);r(["xAxis","yAxis"],function(b){r(a[b],function(a,c){var g=d[b][c],f=a.getExtremes(),h=f.userMin,f=f.userMax;g&&(h!==
void 0||f!==void 0)&&g.setExtremes(h,f,!0,!1)})});c=d.container.innerHTML;g=null;d.destroy();o(b);c=c.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g,'$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g,
" ").replace(/&shy;/g,"­").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()});return c=c.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'")},exportChart:function(b,a){var b=
b||{},d=this.options.exporting,d=this.getSVG(k({chart:{borderRadius:0}},d.chartOptions,a,{exporting:{sourceWidth:b.sourceWidth||d.sourceWidth,sourceHeight:b.sourceHeight||d.sourceHeight}})),b=k(this.options.exporting,b);f.post(b.url,{filename:b.filename||"chart",type:b.type,width:b.width||0,scale:b.scale||2,svg:d},b.formAttributes)},print:function(){var b=this,a=b.container,d=[],c=a.parentNode,f=j.body,h=f.childNodes;if(!b.isPrinting)b.isPrinting=!0,r(h,function(a,b){if(a.nodeType===1)d[b]=a.style.display,
a.style.display="none"}),f.appendChild(a),C.focus(),C.print(),setTimeout(function(){c.appendChild(a);r(h,function(a,b){if(a.nodeType===1)a.style.display=d[b]});b.isPrinting=!1},1E3)},contextMenu:function(b,a,d,c,f,h,g){var e=this,k=e.options.navigation,q=k.menuItemStyle,m=e.chartWidth,n=e.chartHeight,j="cache-"+b,i=e[j],u=D(f,h),w,x,o,s=function(a){e.pointer.inClass(a.target,b)||x()};if(!i)e[j]=i=l("div",{className:b},{position:"absolute",zIndex:1E3,padding:u+"px"},e.container),w=l("div",null,p({MozBoxShadow:"3px 3px 10px #888",
WebkitBoxShadow:"3px 3px 10px #888",boxShadow:"3px 3px 10px #888"},k.menuStyle),i),x=function(){v(i,{display:"none"});g&&g.setState(0);e.openMenu=!1},t(i,"mouseleave",function(){o=setTimeout(x,500)}),t(i,"mouseenter",function(){clearTimeout(o)}),t(document,"mouseup",s),t(e,"destroy",function(){B(document,"mouseup",s)}),r(a,function(a){if(a){var b=a.separator?l("hr",null,null,w):l("div",{onmouseover:function(){v(this,k.menuItemHoverStyle)},onmouseout:function(){v(this,q)},onclick:function(){x();a.onclick.apply(e,
arguments)},innerHTML:a.text||e.options.lang[a.textKey]},p({cursor:"pointer"},q),w);e.exportDivElements.push(b)}}),e.exportDivElements.push(w,i),e.exportMenuWidth=i.offsetWidth,e.exportMenuHeight=i.offsetHeight;a={display:"block"};d+e.exportMenuWidth>m?a.right=m-d-f-u+"px":a.left=d-u+"px";c+h+e.exportMenuHeight>n&&g.alignOptions.verticalAlign!=="top"?a.bottom=n-c-u+"px":a.top=c+h-u+"px";v(i,a);e.openMenu=!0},addButton:function(b){var a=this,d=a.renderer,c=k(a.options.navigation.buttonOptions,b),j=
c.onclick,h=c.menuItems,g,e,l={stroke:c.symbolStroke,fill:c.symbolFill},q=c.symbolSize||12;if(!a.btnCount)a.btnCount=0;if(!a.exportDivElements)a.exportDivElements=[],a.exportSVGElements=[];if(c.enabled!==!1){var m=c.theme,n=m.states,o=n&&n.hover,n=n&&n.select,i;delete m.states;j?i=function(){j.apply(a,arguments)}:h&&(i=function(){a.contextMenu(e.menuClassName,h,e.translateX,e.translateY,e.width,e.height,e);e.setState(2)});c.text&&c.symbol?m.paddingLeft=f.pick(m.paddingLeft,25):c.text||p(m,{width:c.width,
height:c.height,padding:0});e=d.button(c.text,0,0,i,m,o,n).attr({title:a.options.lang[c._titleKey],"stroke-linecap":"round"});e.menuClassName=b.menuClassName||"highcharts-menu-"+a.btnCount++;c.symbol&&(g=d.symbol(c.symbol,c.symbolX-q/2,c.symbolY-q/2,q,q).attr(p(l,{"stroke-width":c.symbolStrokeWidth||1,zIndex:1})).add(e));e.add().align(p(c,{width:e.width,x:f.pick(c.x,y)}),!0,"spacingBox");y+=(e.width+c.buttonSpacing)*(c.align==="right"?-1:1);a.exportSVGElements.push(e,g)}},destroyExport:function(b){var b=
b.target,a,d;for(a=0;a<b.exportSVGElements.length;a++)if(d=b.exportSVGElements[a])d.onclick=d.ontouchstart=null,b.exportSVGElements[a]=d.destroy();for(a=0;a<b.exportDivElements.length;a++)d=b.exportDivElements[a],B(d,"mouseleave"),b.exportDivElements[a]=d.onmouseout=d.onmouseover=d.ontouchstart=d.onclick=null,o(d)}});F.menu=function(b,a,d,c){return["M",b,a+2.5,"L",b+d,a+2.5,"M",b,a+c/2+0.5,"L",b+d,a+c/2+0.5,"M",b,a+c-1.5,"L",b+d,a+c-1.5]};A.prototype.callbacks.push(function(b){var a,d=b.options.exporting,
c=d.buttons;y=0;if(d.enabled!==!1){for(a in c)b.addButton(c[a]);t(b,"destroy",b.destroyExport)}})})(Highcharts);
;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c*(t/=d)*t*t*t*t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t*t*t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
        return c/2*((t-=2)*t*t*t*t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t/d * (Math.PI/2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
        return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s=1.70158;var p=0;var a=c;
        if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; var s=p/4; }
        else var s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158; 
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
        } else {
            return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;
/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);;
(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.forms = {
    name : 'forms',

    version: '4.3.2',

    cache: {},

    settings: {
      disable_class: 'no-custom',
      last_combo : null
    },

    init: function (scope, method, options) {

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method !== 'string') {
        if (!this.settings.init) {
          this.events();
        }

        this.assemble();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    assemble: function () {

      var forms = this;

      $('form.custom input[type="radio"],[type="checkbox"]', $(this.scope))
        .not('[data-customforms="disabled"]')
        .not('.' + this.settings.disable_class)
        .each(function(idx, sel){
          forms.set_custom_markup(sel);
        })
        .change(function(){
          forms.set_custom_markup(this);
        });

      $('form.custom select', $(this.scope))
        .not('[data-customforms="disabled"]')
        .not('.' + this.settings.disable_class)
        .not('[multiple=multiple]')
        .each(this.append_custom_select);
    },

    events: function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.forms', 'form.custom span.custom.checkbox', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle_checkbox($(this));
        })
        .on('click.fndtn.forms', 'form.custom span.custom.radio', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle_radio($(this));
        })
        .on('change.fndtn.forms', 'form.custom select', function (e, force_refresh) {
          if ($(this).is('[data-customforms="disabled"]')) return;
          self.refresh_custom_select($(this), force_refresh);
        })
        .on('click.fndtn.forms', 'form.custom label', function (e) {
          if ($(e.target).is('label')) {
            var $associatedElement = $('#' + self.escape($(this).attr('for'))).not('[data-customforms="disabled"]'),
              $customCheckbox,
              $customRadio;

            if ($associatedElement.length !== 0) {
              if ($associatedElement.attr('type') === 'checkbox') {
                e.preventDefault();
                $customCheckbox = $(this).find('span.custom.checkbox');
                //the checkbox might be outside after the label or inside of another element
                if ($customCheckbox.length === 0) {
                  $customCheckbox = $associatedElement.add(this).siblings('span.custom.checkbox').first();
                }
                self.toggle_checkbox($customCheckbox);
              } else if ($associatedElement.attr('type') === 'radio') {
                e.preventDefault();
                $customRadio = $(this).find('span.custom.radio');
                //the radio might be outside after the label or inside of another element
                if ($customRadio.length === 0) {
                  $customRadio = $associatedElement.add(this).siblings('span.custom.radio').first();
                }
                self.toggle_radio($customRadio);
              }
            }
          }
        })
        .on('mousedown.fndtn.forms', 'form.custom div.custom.dropdown', function () {
          return false;
        })
        .on('click.fndtn.forms', 'form.custom div.custom.dropdown a.current, form.custom div.custom.dropdown a.selector', function (e) {
          var $this = $(this),
              $dropdown = $this.closest('div.custom.dropdown'),
              $select = getFirstPrevSibling($dropdown, 'select');

          // make sure other dropdowns close
          if (!$dropdown.hasClass('open')) $(self.scope).trigger('click');

          e.preventDefault();
          if (false === $select.is(':disabled')) {
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
              $(self.scope).on('click.fndtn.forms.customdropdown', function () {
                $dropdown.removeClass('open');
                $(self.scope).off('.fndtn.forms.customdropdown');
              });
            } else {
              $(self.scope).on('.fndtn.forms.customdropdown');
            }
            return false;
          }
        })
        .on('click.fndtn.forms touchend.fndtn.forms', 'form.custom div.custom.dropdown li', function (e) {
          var $this = $(this),
              $customDropdown = $this.closest('div.custom.dropdown'),
              $select = getFirstPrevSibling($customDropdown, 'select'),
              selectedIndex = 0;

          e.preventDefault();
          e.stopPropagation();

          if (!$(this).hasClass('disabled')) {
            $('div.dropdown').not($customDropdown).removeClass('open');

            var $oldThis = $this.closest('ul')
              .find('li.selected');
            $oldThis.removeClass('selected');

            $this.addClass('selected');

            $customDropdown.removeClass('open')
              .find('a.current')
              .text($this.text());

            $this.closest('ul').find('li').each(function (index) {
              if ($this[0] === this) {
                selectedIndex = index;
              }
            });
            $select[0].selectedIndex = selectedIndex;

            //store the old value in data
            $select.data('prevalue', $oldThis.html());
            
            // Kick off full DOM change event
            if (typeof (document.createEvent) != 'undefined') {
              var event = document.createEvent('HTMLEvents');
              event.initEvent('change', true, true);
              $select[0].dispatchEvent(event);
            } else {
              $select[0].fireEvent('onchange'); // for IE
            }
          }
      });

      $(window).on('keydown', function (e) {
        var focus = document.activeElement,
            self = Foundation.libs.forms,
            dropdown = $('.custom.dropdown'),
      select = getFirstPrevSibling(dropdown, 'select'),
      inputs = $('input,select,textarea,button'); // Zepto-compatible jQuery(":input")

        if (dropdown.length > 0 && dropdown.hasClass('open')) {
          e.preventDefault();

      if (e.which === 9) {
          $(inputs[$(inputs).index(select) + 1]).focus();
        dropdown.removeClass('open');
      }

          if (e.which === 13) {
            dropdown.find('li.selected').trigger('click');
          }

          if (e.which === 27) {
            dropdown.removeClass('open');
          }

          if (e.which >= 65 && e.which <= 90) {
            var next = self.go_to(dropdown, e.which),
                current = dropdown.find('li.selected');

            if (next) {
              current.removeClass('selected');
              self.scrollTo(next.addClass('selected'), 300);
            }
          }

          if (e.which === 38) {
            var current = dropdown.find('li.selected'),
                prev = current.prev(':not(.disabled)');

            if (prev.length > 0) {
              prev.parent()[0].scrollTop = prev.parent().scrollTop() - self.outerHeight(prev);
              current.removeClass('selected');
              prev.addClass('selected');
            }
          } else if (e.which === 40) {
            var current = dropdown.find('li.selected'),
                next = current.next(':not(.disabled)');

            if (next.length > 0) {
              next.parent()[0].scrollTop = next.parent().scrollTop() + self.outerHeight(next);
              current.removeClass('selected');
              next.addClass('selected');
            }
          }
        }
      });

    $(window).on('keyup', function (e) {
          var focus = document.activeElement,
              dropdown = $('.custom.dropdown');

      if (focus === dropdown.find('.current')[0]) {
        dropdown.find('.selector').focus().click();
      }
    });

      this.settings.init = true;
    },

    go_to: function (dropdown, character) {
      var lis = dropdown.find('li'),
          count = lis.length;

      if (count > 0) {
        for (var i = 0; i < count; i++) {
          var first_letter = lis.eq(i).text().charAt(0).toLowerCase();
          if (first_letter === String.fromCharCode(character).toLowerCase()) return lis.eq(i);
        }
      }
    },

    scrollTo: function (el, duration) {
      if (duration < 0) return;
      var parent = el.parent();
      var li_height = this.outerHeight(el);
      var difference = (li_height * (el.index())) - parent.scrollTop();
      var perTick = difference / duration * 10;

      this.scrollToTimerCache = setTimeout(function () {
        if (!isNaN(parseInt(perTick, 10))) {
          parent[0].scrollTop = parent.scrollTop() + perTick;
          this.scrollTo(el, duration - 10);
        }
      }.bind(this), 10);
    },

    set_custom_markup: function (sel) {
      var $this = $(sel),
          type = $this.attr('type'),
          $span = $this.next('span.custom.' + type);
          
      if (!$this.parent().hasClass('switch')) {
        $this.addClass('hidden-field');
      }

      if ($span.length === 0) {
        $span = $('<span class="custom ' + type + '"></span>').insertAfter($this);
      }

      $span.toggleClass('checked', $this.is(':checked'));
      $span.toggleClass('disabled', $this.is(':disabled'));
    },

    append_custom_select: function (idx, sel) {
        var self = Foundation.libs.forms,
            $this = $(sel),
            $customSelect = $this.next('div.custom.dropdown'),
            $customList = $customSelect.find('ul'),
            $selectCurrent = $customSelect.find(".current"),
            $selector = $customSelect.find(".selector"),
            $options = $this.find('option'),
            $selectedOption = $options.filter(':selected'),
            copyClasses = $this.attr('class') ? $this.attr('class').split(' ') : [],
            maxWidth = 0,
            liHtml = '',
            $listItems,
            $currentSelect = false;

        if ($customSelect.length === 0) {
          var customSelectSize = $this.hasClass('small') ? 'small' : $this.hasClass('medium') ? 'medium' : $this.hasClass('large') ? 'large' : $this.hasClass('expand') ? 'expand' : '';

          $customSelect = $('<div class="' + ['custom', 'dropdown', customSelectSize].concat(copyClasses).filter(function (item, idx, arr) {
            if (item === '') return false;
            return arr.indexOf(item) === idx;
          }).join(' ') + '"><a href="#" class="selector"></a><ul /></div>');

          $selector = $customSelect.find(".selector");
          $customList = $customSelect.find("ul");

          liHtml = $options.map(function () {
            var copyClasses = $(this).attr('class') ? $(this).attr('class') : '';
            return "<li class='" + copyClasses + "'>" + $(this).html() + "</li>";
          }).get().join('');

          $customList.append(liHtml);

          $currentSelect = $customSelect
            .prepend('<a href="#" class="current">' + ($selectedOption.html() || '') + '</a>')
            .find(".current");

          $this.after($customSelect)
            .addClass('hidden-field');
        } else {
          liHtml = $options.map(function () {
              return "<li>" + $(this).html() + "</li>";
            })
            .get().join('');

          $customList.html('')
            .append(liHtml);

        } // endif $customSelect.length === 0

        self.assign_id($this, $customSelect);
        $customSelect.toggleClass('disabled', $this.is(':disabled'));
        $listItems = $customList.find('li');

        // cache list length
        self.cache[$customSelect.data('id')] = $listItems.length;

        $options.each(function (index) {
          if (this.selected) {
            $listItems.eq(index).addClass('selected');

            if ($currentSelect) {
              $currentSelect.html($(this).html());
            }
          }
          if ($(this).is(':disabled')) {
            $listItems.eq(index).addClass('disabled');
          }
        });

        //
        // If we're not specifying a predetermined form size.
        //
        if (!$customSelect.is('.small, .medium, .large, .expand')) {

          // ------------------------------------------------------------------------------------
          // This is a work-around for when elements are contained within hidden parents.
          // For example, when custom-form elements are inside of a hidden reveal modal.
          //
          // We need to display the current custom list element as well as hidden parent elements
          // in order to properly calculate the list item element's width property.
          // -------------------------------------------------------------------------------------

          $customSelect.addClass('open');
          //
          // Quickly, display all parent elements.
          // This should help us calcualate the width of the list item's within the drop down.
          //
          var self = Foundation.libs.forms;
          self.hidden_fix.adjust($customList);

          maxWidth = (self.outerWidth($listItems) > maxWidth) ? self.outerWidth($listItems) : maxWidth;

          Foundation.libs.forms.hidden_fix.reset();

          $customSelect.removeClass('open');

        } // endif

    },

    assign_id: function ($select, $customSelect) {
      var id = [+new Date(), Foundation.random_str(5)].join('-');
      $select.attr('data-id', id);
      $customSelect.attr('data-id', id);
    },

    refresh_custom_select: function ($select, force_refresh) {
      var self = this;
      var maxWidth = 0,
          $customSelect = $select.next(),
          $options = $select.find('option'),
          $customList = $customSelect.find('ul'),
          $listItems = $customSelect.find('li');

      if ($options.length !== this.cache[$customSelect.data('id')] || force_refresh) {
        $customList.html('');

        // rebuild and re-populate all at once
        var customSelectHtml = '';
        $options.each(function () {
          var $this = $(this), thisHtml = $this.html(), thisSelected = this.selected;
          customSelectHtml += '<li class="' + (thisSelected ? ' selected ' : '') + ($this.is(':disabled') ? ' disabled ' : '') + '">' + thisHtml + '</li>';
          if (thisSelected) {
            $customSelect.find('.current').html(thisHtml);
          }
        });

        $customList.html(customSelectHtml);

        // fix width
        $customSelect.removeAttr('style');
        $customList.removeAttr('style');
        $customSelect.find('li').each(function () {
          $customSelect.addClass('open');
          if (self.outerWidth($(this)) > maxWidth) {
            maxWidth = self.outerWidth($(this));
          }
          $customSelect.removeClass('open');
        });

        $listItems = $customSelect.find('li');
        // cache list length
        this.cache[$customSelect.data('id')] = $listItems.length;
      }
    },
    
    refresh_custom_selection: function ($select) {
      var selectedValue = $('option:selected', $select).text();
      $('a.current', $select.next()).text(selectedValue);
    },

    toggle_checkbox: function ($element) {
      var $input = $element.prev(),
          input = $input[0];

      if (false === $input.is(':disabled')) {
        input.checked = ((input.checked) ? false : true);
        $element.toggleClass('checked');

        $input.trigger('change');
      }
    },

    toggle_radio: function ($element) {
        var $input = $element.prev(),
            $form = $input.closest('form.custom'),
            input = $input[0];

        if (false === $input.is(':disabled')) {
          $form.find('input[type="radio"][name="' + this.escape($input.attr('name')) + '"]')
            .next().not($element).removeClass('checked');

          if (!$element.hasClass('checked')) {
            $element.toggleClass('checked');
          }

          input.checked = $element.hasClass('checked');

          $input.trigger('change');
        }
    },

    escape: function (text) {
      if (!text) return '';
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    hidden_fix: {
        /**
         * Sets all hidden parent elements and self to visibile.
         *
         * @method adjust
         * @param {jQuery Object} $child
         */

        // We'll use this to temporarily store style properties.
        tmp: [],

        // We'll use this to set hidden parent elements.
        hidden: null,

        adjust: function ($child) {
          // Internal reference.
          var _self = this;

          // Set all hidden parent elements, including this element.
          _self.hidden = $child.parents();
          _self.hidden = _self.hidden.add($child).filter(":hidden");

          // Loop through all hidden elements.
          _self.hidden.each(function () {

            // Cache the element.
            var $elem = $(this);

            // Store the style attribute.
            // Undefined if element doesn't have a style attribute.
            _self.tmp.push($elem.attr('style'));

            // Set the element's display property to block,
            // but ensure it's visibility is hidden.
            $elem.css({
                'visibility': 'hidden',
                'display': 'block'
            });
          });

        }, // end adjust

        /**
         * Resets the elements previous state.
         *
         * @method reset
         */
        reset: function () {
          // Internal reference.
          var _self = this;
          // Loop through our hidden element collection.
          _self.hidden.each(function (i) {
            // Cache this element.
            var $elem = $(this),
                _tmp = _self.tmp[i]; // Get the stored 'style' value for this element.

            // If the stored value is undefined.
            if (_tmp === undefined)
            // Remove the style attribute.
            $elem.removeAttr('style');
            else
            // Otherwise, reset the element style attribute.
            $elem.attr('style', _tmp);
          });
          // Reset the tmp array.
          _self.tmp = [];
          // Reset the hidden elements variable.
          _self.hidden = null;

        } // end reset
    },

    off: function () {
      $(this.scope).off('.fndtn.forms');
    },

    reflow : function () {}
  };

  var getFirstPrevSibling = function($el, selector) {
    var $el = $el.prev();
    while ($el.length) {
      if ($el.is(selector)) return $el;
      $el = $el.prev();
    }
    return $();
  };
}(Foundation.zj, this, this.document));
;
/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tooltips = {
    name : 'tooltips',

    version : '4.3.2',

    settings : {
      selector : '.has-tip',
      additionalInheritableClasses : [],
      tooltipClass : '.tooltip',
      touchCloseText: 'tap to close',
      appendTo: 'body',
      'disable-for-touch': false,
      tipTemplate : function (selector, content) {
        return '<span data-selector="' + selector + '" class="' 
          + Foundation.libs.tooltips.settings.tooltipClass.substring(1) 
          + '">' + content + '<span class="nub"></span></span>';
      }
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this, 'data_options');
      var self = this;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      } else if (typeof options !== 'undefined') {
        $.extend(true, this.settings, options);
      }

      if (typeof method !== 'string') {
        if (Modernizr.touch) {
          $(this.scope)
            .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip', 
              '[data-tooltip]', function (e) {
              var settings = $.extend({}, self.settings, self.data_options($(this)));
              if (!settings['disable-for-touch']) {
                e.preventDefault();
                $(settings.tooltipClass).hide();
                self.showOrCreateTip($(this));
              }
            })
            .on('click.fndtn.tooltip touchstart.fndtn.tooltip touchend.fndtn.tooltip', 
              this.settings.tooltipClass, function (e) {
              e.preventDefault();
              $(this).fadeOut(150);
            });
        } else {
          $(this.scope)
            .on('mouseenter.fndtn.tooltip mouseleave.fndtn.tooltip', 
              '[data-tooltip]', function (e) {
              var $this = $(this);

              if (/enter|over/i.test(e.type)) {
                self.showOrCreateTip($this);
              } else if (e.type === 'mouseout' || e.type === 'mouseleave') {
                self.hide($this);
              }
            });
        }

        // $(this.scope).data('fndtn-tooltips', true);
      } else {
        return this[method].call(this, options);
      }

    },

    showOrCreateTip : function ($target) {
      var $tip = this.getTip($target);

      if ($tip && $tip.length > 0) {
        return this.show($target);
      }

      return this.create($target);
    },

    getTip : function ($target) {
      var selector = this.selector($target),
          tip = null;

      if (selector) {
        tip = $('span[data-selector="' + selector + '"]' + this.settings.tooltipClass);
      }

      return (typeof tip === 'object') ? tip : false;
    },

    selector : function ($target) {
      var id = $target.attr('id'),
          dataSelector = $target.attr('data-tooltip') || $target.attr('data-selector');

      if ((id && id.length < 1 || !id) && typeof dataSelector != 'string') {
        dataSelector = 'tooltip' + Math.random().toString(36).substring(7);
        $target.attr('data-selector', dataSelector);
      }

      return (id && id.length > 0) ? id : dataSelector;
    },

    create : function ($target) {
      var $tip = $(this.settings.tipTemplate(this.selector($target), $('<div></div>').html($target.attr('title')).html())),
          classes = this.inheritable_classes($target);

      $tip.addClass(classes).appendTo(this.settings.appendTo);
      if (Modernizr.touch) {
        $tip.append('<span class="tap-to-close">'+this.settings.touchCloseText+'</span>');
      }
      $target.removeAttr('title').attr('title','');
      this.show($target);
    },

    reposition : function (target, tip, classes) {
      var width, nub, nubHeight, nubWidth, column, objPos;

      tip.css('visibility', 'hidden').show();

      width = target.data('width');
      nub = tip.children('.nub');
      nubHeight = this.outerHeight(nub);
      nubWidth = this.outerHeight(nub);

      objPos = function (obj, top, right, bottom, left, width) {
        return obj.css({
          'top' : (top) ? top : 'auto',
          'bottom' : (bottom) ? bottom : 'auto',
          'left' : (left) ? left : 'auto',
          'right' : (right) ? right : 'auto',
          'width' : (width) ? width : 'auto'
        }).end();
      };

      objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', target.offset().left, width);

      if ($(window).width() < 767) {
        objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', 12.5, $(this.scope).width());
        tip.addClass('tip-override');
        objPos(nub, -nubHeight, 'auto', 'auto', target.offset().left);
      } else {
        var left = target.offset().left;
        if (Foundation.rtl) {
          left = target.offset().left + target.offset().width - this.outerWidth(tip);
        }
        objPos(tip, (target.offset().top + this.outerHeight(target) + 10), 'auto', 'auto', left, width);
        tip.removeClass('tip-override');
        if (classes && classes.indexOf('tip-top') > -1) {
          objPos(tip, (target.offset().top - this.outerHeight(tip)), 'auto', 'auto', left, width)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-left') > -1) {
          objPos(tip, (target.offset().top + (this.outerHeight(target) / 2) - nubHeight*2.5), 'auto', 'auto', (target.offset().left - this.outerWidth(tip) - nubHeight), width)
            .removeClass('tip-override');
        } else if (classes && classes.indexOf('tip-right') > -1) {
          objPos(tip, (target.offset().top + (this.outerHeight(target) / 2) - nubHeight*2.5), 'auto', 'auto', (target.offset().left + this.outerWidth(target) + nubHeight), width)
            .removeClass('tip-override');
        }
      }

      tip.css('visibility', 'visible').hide();
    },

    inheritable_classes : function (target) {
      var inheritables = ['tip-top', 'tip-left', 'tip-bottom', 'tip-right', 'noradius'].concat(this.settings.additionalInheritableClasses),
          classes = target.attr('class'),
          filtered = classes ? $.map(classes.split(' '), function (el, i) {
            if ($.inArray(el, inheritables) !== -1) {
              return el;
            }
          }).join(' ') : '';

      return $.trim(filtered);
    },

    show : function ($target) {
      var $tip = this.getTip($target);

      this.reposition($target, $tip, $target.attr('class'));
      $tip.fadeIn(150);
    },

    hide : function ($target) {
      var $tip = this.getTip($target);

      $tip.fadeOut(150);
    },

    // deprecate reload
    reload : function () {
      var $self = $(this);

      return ($self.data('fndtn-tooltips')) ? $self.foundationTooltips('destroy').foundationTooltips('init') : $self.foundationTooltips('init');
    },

    off : function () {
      $(this.scope).off('.fndtn.tooltip');
      $(this.settings.tooltipClass).each(function (i) {
        $('[data-tooltip]').get(i).attr('title', $(this).text());
      }).remove();
    },

    reflow : function () {}
  };
}(Foundation.zj, this, this.document));
;
