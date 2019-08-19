    //////////////////////////////////////////////////////////
    // This function is for logging events in google analytics
    // based on the tags in the html. 

(function($) {
    (function() {
        var logGaEvent = function(gaEvent) {
            if (!gaEvent || !gaEvent.category || !gaEvent.action) {
                return
            }
    		
    		if (typeof _gaq != 'undefined'){//old school analytics
    			_gaq.push(["_trackEvent", myILFS.quoteType+"-"+gaEvent.category, gaEvent.action, gaEvent.label, gaEvent.value, false]);
    			
    		}else
    		{
    		try{
    			//universal analytics
    			ga('send', 'event', myILFS.quoteType+"-"+gaEvent.category, gaEvent.action, gaEvent.label, gaEvent.value);
    			}
    			catch(err){
    				//Do nothing
    			}
    			
    		}
            };
    		
        var addEventHandler = function(eventType, target, handler) {
            target.unbind(eventType, handler);
            target.bind(eventType, handler);
            };
        var logEvent = function(item, eventType) {
            var category = item.attr("ga-category");
            var action = item.attr("ga-action");
            if (!action || !category) {
                return
            }
            var eventData = {
                category: category,
                action: action + (eventType ? (" [" + eventType + "]") : ""),
                label: item.attr("ga-label"),
                value: item.attr("ga-value")
                };
            logGaEvent(eventData)
            };
        var logUIEvent = function(event) {
            logEvent($(event.currentTarget), event.type)
            };
    		
        var trackElementEvent = function(eventName, items) {
    	
            var target = items ? items: $("[ga-" + eventName + "]");
            addEventHandler(eventName, target, logUIEvent);
            };
    		
    	// track the following types of events
         $.fn.trackEvents = function() {
            trackElementEvent("click");
            trackElementEvent("focus");
            trackElementEvent("change");
            };

    }());
    	
    	
    /*! Use this to allow the JSON object to work for ie7 and below */
    /*! JSON v3.2.6 | http://bestiejs.github.io/json3 | Copyright 2012-2013, Kit Cambridge | http://kit.mit-license.org */
    ;(function(){var n=null;
    (function(G){function m(a){if(m[a]!==s)return m[a];var c;if("bug-string-char-index"==a)c="a"!="a"[0];else if("json"==a)c=m("json-stringify")&&m("json-parse");else{var e;if("json-stringify"==a){c=o.stringify;var b="function"==typeof c&&l;if(b){(e=function(){return 1}).toJSON=e;try{b="0"===c(0)&&"0"===c(new Number)&&'""'==c(new String)&&c(p)===s&&c(s)===s&&c()===s&&"1"===c(e)&&"[1]"==c([e])&&"[null]"==c([s])&&"null"==c(n)&&"[null,null,null]"==c([s,p,n])&&'{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}'==c({a:[e,
    !0,!1,n,"\x00\u0008\n\u000c\r\t"]})&&"1"===c(n,e)&&"[\n 1,\n 2\n]"==c([1,2],n,1)&&'"-271821-04-20T00:00:00.000Z"'==c(new Date(-864E13))&&'"+275760-09-13T00:00:00.000Z"'==c(new Date(864E13))&&'"-000001-01-01T00:00:00.000Z"'==c(new Date(-621987552E5))&&'"1969-12-31T23:59:59.999Z"'==c(new Date(-1))}catch(f){b=!1}}c=b}if("json-parse"==a){c=o.parse;if("function"==typeof c)try{if(0===c("0")&&!c(!1)){e=c('{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}');var j=5==e.a.length&&1===e.a[0];if(j){try{j=!c('"\t"')}catch(d){}if(j)try{j=
    1!==c("01")}catch(h){}if(j)try{j=1!==c("1.")}catch(k){}}}}catch(N){j=!1}c=j}}return m[a]=!!c}var p={}.toString,q,x,s,H=typeof define==="function"&&define.amd,y="object"==typeof JSON&&JSON,o="object"==typeof exports&&exports&&!exports.nodeType&&exports;o&&y?(o.stringify=y.stringify,o.parse=y.parse):o=G.JSON=y||{};var l=new Date(-3509827334573292);try{l=-109252==l.getUTCFullYear()&&0===l.getUTCMonth()&&1===l.getUTCDate()&&10==l.getUTCHours()&&37==l.getUTCMinutes()&&6==l.getUTCSeconds()&&708==l.getUTCMilliseconds()}catch(O){}if(!m("json")){var t=
    m("bug-string-char-index");if(!l)var u=Math.floor,I=[0,31,59,90,120,151,181,212,243,273,304,334],z=function(a,c){return I[c]+365*(a-1970)+u((a-1969+(c=+(c>1)))/4)-u((a-1901+c)/100)+u((a-1601+c)/400)};if(!(q={}.hasOwnProperty))q=function(a){var c={},e;if((c.__proto__=n,c.__proto__={toString:1},c).toString!=p)q=function(a){var c=this.__proto__,a=a in(this.__proto__=n,this);this.__proto__=c;return a};else{e=c.constructor;q=function(a){var c=(this.constructor||e).prototype;return a in this&&!(a in c&&
    this[a]===c[a])}}c=n;return q.call(this,a)};var J={"boolean":1,number:1,string:1,undefined:1};x=function(a,c){var e=0,b,f,j;(b=function(){this.valueOf=0}).prototype.valueOf=0;f=new b;for(j in f)q.call(f,j)&&e++;b=f=n;if(e)x=e==2?function(a,c){var e={},b=p.call(a)=="[object Function]",f;for(f in a)!(b&&f=="prototype")&&!q.call(e,f)&&(e[f]=1)&&q.call(a,f)&&c(f)}:function(a,c){var e=p.call(a)=="[object Function]",b,f;for(b in a)!(e&&b=="prototype")&&q.call(a,b)&&!(f=b==="constructor")&&c(b);(f||q.call(a,
    b="constructor"))&&c(b)};else{f=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"];x=function(a,c){var e=p.call(a)=="[object Function]",b,g;if(g=!e)if(g=typeof a.constructor!="function"){g=typeof a.hasOwnProperty;g=g=="object"?!!a.hasOwnProperty:!J[g]}g=g?a.hasOwnProperty:q;for(b in a)!(e&&b=="prototype")&&g.call(a,b)&&c(b);for(e=f.length;b=f[--e];g.call(a,b)&&c(b));}}return x(a,c)};if(!m("json-stringify")){var K={92:"\\\\",34:'\\"',8:"\\b",
    12:"\\f",10:"\\n",13:"\\r",9:"\\t"},v=function(a,c){return("000000"+(c||0)).slice(-a)},D=function(a){var c='"',b=0,g=a.length,f=g>10&&t,j;for(f&&(j=a.split(""));b<g;b++){var d=a.charCodeAt(b);switch(d){case 8:case 9:case 10:case 12:case 13:case 34:case 92:c=c+K[d];break;default:if(d<32){c=c+("\\u00"+v(2,d.toString(16)));break}c=c+(f?j[b]:t?a.charAt(b):a[b])}}return c+'"'},B=function(a,c,b,g,f,j,d){var h,k,i,l,m,o,r,t,w;try{h=c[a]}catch(y){}if(typeof h=="object"&&h){k=p.call(h);if(k=="[object Date]"&&
    !q.call(h,"toJSON"))if(h>-1/0&&h<1/0){if(z){l=u(h/864E5);for(k=u(l/365.2425)+1970-1;z(k+1,0)<=l;k++);for(i=u((l-z(k,0))/30.42);z(k,i+1)<=l;i++);l=1+l-z(k,i);m=(h%864E5+864E5)%864E5;o=u(m/36E5)%24;r=u(m/6E4)%60;t=u(m/1E3)%60;m=m%1E3}else{k=h.getUTCFullYear();i=h.getUTCMonth();l=h.getUTCDate();o=h.getUTCHours();r=h.getUTCMinutes();t=h.getUTCSeconds();m=h.getUTCMilliseconds()}h=(k<=0||k>=1E4?(k<0?"-":"+")+v(6,k<0?-k:k):v(4,k))+"-"+v(2,i+1)+"-"+v(2,l)+"T"+v(2,o)+":"+v(2,r)+":"+v(2,t)+"."+v(3,m)+"Z"}else h=
    n;else if(typeof h.toJSON=="function"&&(k!="[object Number]"&&k!="[object String]"&&k!="[object Array]"||q.call(h,"toJSON")))h=h.toJSON(a)}b&&(h=b.call(c,a,h));if(h===n)return"null";k=p.call(h);if(k=="[object Boolean]")return""+h;if(k=="[object Number]")return h>-1/0&&h<1/0?""+h:"null";if(k=="[object String]")return D(""+h);if(typeof h=="object"){for(a=d.length;a--;)if(d[a]===h)throw TypeError();d.push(h);w=[];c=j;j=j+f;if(k=="[object Array]"){i=0;for(a=h.length;i<a;i++){k=B(i,h,b,g,f,j,d);w.push(k===
    s?"null":k)}a=w.length?f?"[\n"+j+w.join(",\n"+j)+"\n"+c+"]":"["+w.join(",")+"]":"[]"}else{x(g||h,function(a){var c=B(a,h,b,g,f,j,d);c!==s&&w.push(D(a)+":"+(f?" ":"")+c)});a=w.length?f?"{\n"+j+w.join(",\n"+j)+"\n"+c+"}":"{"+w.join(",")+"}":"{}"}d.pop();return a}};o.stringify=function(a,c,b){var g,f,j,d;if(typeof c=="function"||typeof c=="object"&&c)if((d=p.call(c))=="[object Function]")f=c;else if(d=="[object Array]"){j={};for(var h=0,k=c.length,i;h<k;i=c[h++],(d=p.call(i),d=="[object String]"||d==
    "[object Number]")&&(j[i]=1));}if(b)if((d=p.call(b))=="[object Number]"){if((b=b-b%1)>0){g="";for(b>10&&(b=10);g.length<b;g=g+" ");}}else d=="[object String]"&&(g=b.length<=10?b:b.slice(0,10));return B("",(i={},i[""]=a,i),f,j,g,"",[])}}if(!m("json-parse")){var L=String.fromCharCode,M={92:"\\",34:'"',47:"/",98:"\u0008",116:"\t",110:"\n",102:"\u000c",114:"\r"},b,A,i=function(){b=A=n;throw SyntaxError();},r=function(){for(var a=A,c=a.length,e,g,f,j,d;b<c;){d=a.charCodeAt(b);switch(d){case 9:case 10:case 13:case 32:b++;
    break;case 123:case 125:case 91:case 93:case 58:case 44:e=t?a.charAt(b):a[b];b++;return e;case 34:e="@";for(b++;b<c;){d=a.charCodeAt(b);if(d<32)i();else if(d==92){d=a.charCodeAt(++b);switch(d){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:e=e+M[d];b++;break;case 117:g=++b;for(f=b+4;b<f;b++){d=a.charCodeAt(b);d>=48&&d<=57||d>=97&&d<=102||d>=65&&d<=70||i()}e=e+L("0x"+a.slice(g,b));break;default:i()}}else{if(d==34)break;d=a.charCodeAt(b);for(g=b;d>=32&&d!=92&&d!=34;)d=a.charCodeAt(++b);
    e=e+a.slice(g,b)}}if(a.charCodeAt(b)==34){b++;return e}i();default:g=b;if(d==45){j=true;d=a.charCodeAt(++b)}if(d>=48&&d<=57){for(d==48&&(d=a.charCodeAt(b+1),d>=48&&d<=57)&&i();b<c&&(d=a.charCodeAt(b),d>=48&&d<=57);b++);if(a.charCodeAt(b)==46){for(f=++b;f<c&&(d=a.charCodeAt(f),d>=48&&d<=57);f++);f==b&&i();b=f}d=a.charCodeAt(b);if(d==101||d==69){d=a.charCodeAt(++b);(d==43||d==45)&&b++;for(f=b;f<c&&(d=a.charCodeAt(f),d>=48&&d<=57);f++);f==b&&i();b=f}return+a.slice(g,b)}j&&i();if(a.slice(b,b+4)=="true"){b=
    b+4;return true}if(a.slice(b,b+5)=="false"){b=b+5;return false}if(a.slice(b,b+4)=="null"){b=b+4;return n}i()}}return"$"},C=function(a){var c,b;a=="$"&&i();if(typeof a=="string"){if((t?a.charAt(0):a[0])=="@")return a.slice(1);if(a=="["){for(c=[];;b||(b=true)){a=r();if(a=="]")break;if(b)if(a==","){a=r();a=="]"&&i()}else i();a==","&&i();c.push(C(a))}return c}if(a=="{"){for(c={};;b||(b=true)){a=r();if(a=="}")break;if(b)if(a==","){a=r();a=="}"&&i()}else i();(a==","||typeof a!="string"||(t?a.charAt(0):
    a[0])!="@"||r()!=":")&&i();c[a.slice(1)]=C(r())}return c}i()}return a},F=function(a,b,e){e=E(a,b,e);e===s?delete a[b]:a[b]=e},E=function(a,b,e){var g=a[b],f;if(typeof g=="object"&&g)if(p.call(g)=="[object Array]")for(f=g.length;f--;)F(g,f,e);else x(g,function(a){F(g,a,e)});return e.call(a,b,g)};o.parse=function(a,c){var e,g;b=0;A=""+a;e=C(r());r()!="$"&&i();b=A=n;return c&&p.call(c)=="[object Function]"?E((g={},g[""]=e,g),"",c):e}}}H&&define(function(){return o})})(this);
    }());
    	
    	
    	
    	
     // No ui Slider - a lightweight slider that works on ie7+ & touch
     
     (function(e,p){if(e.zepto&&!e.fn.removeData)throw new ReferenceError("Zepto is loaded without the data module.");e.fn.noUiSlider=function(D){function r(a,b,c){e.isArray(a)||(a=[a]);e.each(a,function(a,l){"function"===typeof l&&l.call(b,c)})}function x(a){return a instanceof e||e.zepto&&e.zepto.isZ(a)}function E(a){a.preventDefault();var b=0===a.type.indexOf("touch"),c=0===a.type.indexOf("mouse"),d=0===a.type.indexOf("pointer"),l,h,g=a;0===a.type.indexOf("MSPointer")&&(d=!0);a.originalEvent&&(a=a.originalEvent);b&&(l=a.changedTouches[0].pageX,h=a.changedTouches[0].pageY);if(c||d)d||window.pageXOffset!==p||(window.pageXOffset=document.documentElement.scrollLeft,window.pageYOffset=document.documentElement.scrollTop),l=a.clientX+window.pageXOffset,h=a.clientY+window.pageYOffset;return e.extend(g,{x:l,y:h})}function q(a,b,c,d,l){a=a.replace(/\s/g,u+" ")+u;if(l)return 1<l&&(d=e.extend(b,d)),b.on(a,e.proxy(c,d));d.handler=c;return b.on(a,e.proxy(function(a){if(this.target.is('[class*="noUi-state-"], [disabled]'))return!1;this.handler(E(a))},d))}function m(a){return!isNaN(parseFloat(a))&&isFinite(a)}function F(a){return parseFloat(this.style[a])}function G(a,b){function c(a){return x(a)||"string"===typeof a||!1===a}var d={handles:{r:!0,t:function(a){a=parseInt(a,10);return 1===a||2===a}},range:{r:!0,t:function(a,b,c){if(2!==a.length)return!1;a=[parseFloat(a[0]),parseFloat(a[1])];if(!m(a[0])||!m(a[1])||"range"===c&&a[0]===a[1]||a[1]<a[0])return!1;b[c]=a;return!0}},start:{r:!0,t:function(a,b,c){return 1===b.handles?(e.isArray(a)&&(a=a[0]),a=parseFloat(a),b.start=[a],m(a)):this.parent.range.t(a,b,c)}},connect:{t:function(a,b){return!0===a||!1===a||"lower"===a&&1===b.handles||"upper"===a&&1===b.handles}},orientation:{t:function(a){return"horizontal"===a||"vertical"===a}},margin:{r:!0,t:function(a,b,c){a=parseFloat(a);b[c]=a;return m(a)}},serialization:{r:!0,t:function(a,b){if(a.resolution)switch(a.resolution){case 1:case 0.1:case 0.01:case 0.001:case 1E-4:case 1E-5:break;default:return!1}else b.serialization.resolution=0.01;if(a.mark)return"."===a.mark||","===a.mark;b.serialization.mark=".";return a.to?1===b.handles?(e.isArray(a.to)||(a.to=[a.to]),b.serialization.to=a.to,c(a.to[0])):2===a.to.length&&c(a.to[0])&&c(a.to[1]):!1}},slide:{t:function(a){return"function"===typeof a}},set:{t:function(a,b){return this.parent.slide.t(a,b)}},step:{t:function(a,b,c){return this.parent.margin.t(a,b,c)}},init:function(){var a=this;e.each(a,function(b,c){c.parent=a});delete this.init;return this}}.init();e.each(d,function(c,d){if(d.r&&!a[c]&&0!==a[c]||(a[c]||0===a[c])&&!d.t(a[c],a,c))throw console&&console.log&&console.group&&(console.group("Invalid noUiSlider initialisation:"),console.log("Option:\t",c),console.log("Value:\t",a[c]),console.log("Slider:\t",b[0]),console.groupEnd()),new RangeError("noUiSlider");})}function y(a,b){a=a.toFixed(b.data("decimals"));return a.replace(".",b.data("mark"))}function v(a,b,c){var d=a.data("nui").options,e=a.data("nui").base.data("handles"),h=a.data("nui").style;if(!m(b)||b===a[0].gPct(h))return!1;b=0>b?0:100<b?100:b;if(d.step&&!c){var g=t.from(d.range,d.step);b=Math.round(b/g)*g}if(b===a[0].gPct(h)||a.siblings("."+f[1]).length&&!c&&e&&(a.data("nui").number?(c=e[0][0].gPct(h)+d.margin,b=b<c?c:b):(c=e[1][0].gPct(h)-d.margin,b=b>c?c:b),b===a[0].gPct(h)))return!1;0===a.data("nui").number&&95<b?a.addClass(f[13]):a.removeClass(f[13]);a.css(h,b+"%");a.data("store").val(y(t.is(d.range,b),a.data("nui").target));return!0}function H(a,b){var c=a.data("nui").number,d={target:a.data("nui").target,options:a.data("nui").options,handle:a,i:c};if(x(b.to[c]))return q("change blur",b.to[c],z[0],d,2),q("change",b.to[c],d.options.set,d.target,1),b.to[c];if("string"===typeof b.to[c])return e('<input type="hidden" name="'+b.to[c]+'">').appendTo(a).addClass(f[3]).change(z[1]);if(!1===b.to[c])return{val:function(a){if(a===p)return this.handleElement.data("nui-val");this.handleElement.data("nui-val",a)},hasClass:function(){return!1},handleElement:a}}function I(a){var b=this.base,c=b.data("style"),d=a.x-this.startEvent.x,e="left"===c?b.width():b.height();"top"===c&&(d=a.y-this.startEvent.y);d=this.position+100*d/e;v(this.handle,d);r(b.data("options").slide,b.data("target"))}function A(){var a=this.base,b=this.handle;b.children().removeClass(f[4]);w.off(n.move);w.off(n.end);e("body").off(u);a.data("target").change();r(b.data("nui").options.set,a.data("target"))}function J(a){var b=this.handle,c=b[0].gPct(b.data("nui").style);b.children().addClass(f[4]);q(n.move,w,I,{startEvent:a,position:c,base:this.base,target:this.target,handle:b});q(n.end,w,A,{base:this.base,target:this.target,handle:b});e("body").on("selectstart"+u,function(){return!1})}function K(a){a.stopPropagation();A.call(this)}function L(a){if(!this.base.find("."+f[4]).length){var b,c,d=this.base;c=this.handles;var e=d.data("style");a=a["left"===e?"x":"y"];var h="left"===e?d.width():d.height(),g=[],k={left:d.offset().left,top:d.offset().top};for(b=0;b<c.length;b++)g.push({left:c[b].offset().left,top:c[b].offset().top});b=1===c.length?0:(g[0][e]+g[1][e])/2;c=1===c.length||a<b?c[0]:c[1];d.addClass(f[5]);setTimeout(function(){d.removeClass(f[5])},300);v(c,100*(a-k[e])/h);r([c.data("nui").options.slide,c.data("nui").options.set],d.data("target"));d.data("target").change()}}function M(){var a=[];e.each(e(this).data("handles"),function(b,c){a.push(c.data("store").val())});return 1===a.length?a[0]:a}function N(a,b){if(a===p)return M.call(this);b=!0===b?{trigger:!0}:b||{};e.isArray(a)||(a=[a]);return this.each(function(c,d){d=e(d);e.each(e(this).data("handles"),function(c,f){if(null!==a[c]&&a[c]!==p){var g,k;k=f.data("nui").options.range;g=a[c];b.trusted=!0;if(!1===b.trusted||1===a.length)b.trusted=!1;2===a.length&&0<=e.inArray(null,a)&&(b.trusted=!1);"string"===e.type(g)&&(g=g.replace(",","."));g=t.to(k,parseFloat(g));g=v(f,g,b.trusted);b.trigger&&r(f.data("nui").options.set,d);g||(g=f.data("store").val(),k=t.is(k,f[0].gPct(f.data("nui").style)),g!==k&&f.data("store").val(y(k,d)))}})})}var u=".nui",w=e(document),n={start:"mousedown touchstart",move:"mousemove touchmove",end:"mouseup touchend"},O=e.fn.val,f="noUi-base noUi-origin noUi-handle noUi-input noUi-active noUi-state-tap noUi-target -lower -upper noUi-connect noUi-vertical noUi-horizontal noUi-background noUi-z-index".split(" "),s=[f[0]],B=[f[1]],C=[f[2]],t={to:function(a,b){b=0>a[0]?b+Math.abs(a[0]):b-a[0];return 100*b/this.len(a)},from:function(a,b){return 100*b/this.len(a)},is:function(a,b){return b*this.len(a)/100+a[0]},len:function(a){return a[0]>a[1]?a[0]-a[1]:a[1]-a[0]}},z=[function(){this.target.val([this.i?null:this.val(),this.i?this.val():null],{trusted:!1})},function(a){a.stopPropagation()}];window.navigator.pointerEnabled?n={start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(n={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"});e.fn.val=function(){return this.hasClass(f[6])?N.apply(this,arguments):O.apply(this,arguments)};return function(a){return this.each(function(b,c){c=e(c);c.addClass(f[6]);var d,l,h,g,k=e("<div/>").appendTo(c),m=[],p=[B.concat([f[1]+f[7]]),B.concat([f[1]+f[8]])],r=[C.concat([f[2]+f[7]]),C.concat([f[2]+f[8]])];a=e.extend({handles:2,margin:0,orientation:"horizontal"},a)||{};a.serialization||(a.serialization={to:[!1,!1],resolution:0.01,mark:"."});G(a,c);a.S=a.serialization;a.connect?"lower"===a.connect?(s.push(f[9],f[9]+f[7]),p[0].push(f[12])):(s.push(f[9]+f[8],f[12]),p[0].push(f[9])):s.push(f[12]);l="vertical"===a.orientation?"top":"left";h=a.S.resolution.toString().split(".");h="1"===h[0]?0:h[1].length;"vertical"===a.orientation?s.push(f[10]):s.push(f[11]);k.addClass(s.join(" ")).data("target",c);c.data({base:k,mark:a.S.mark,decimals:h});for(d=0;d<a.handles;d++)g=e("<div><div/></div>").appendTo(k),g.addClass(p[d].join(" ")),g.children().addClass(r[d].join(" ")),q(n.start,g.children(),J,{base:k,target:c,handle:g}),q(n.end,g.children(),K,{base:k,target:c,handle:g}),g.data("nui",{target:c,decimals:h,options:a,base:k,style:l,number:d}).data("store",H(g,a.S)),g[0].gPct=F,m.push(g),v(g,t.to(a.range,a.start[d]));k.data({options:a,handles:m,style:l});c.data({handles:m});q(n.end,k,L,{base:k,target:c,handles:m})})}.call(this,D)}})($);




     //pass in date as YYYYMMDD
    function getAge(yyyy, MM, dd) {
        var today = new Date();
        var birthDate = new Date();
    	birthDate.setFullYear(yyyy,MM-1,dd);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }







    // create a new ILFS object
    var myILFS=new Object();

    ////
    // set the user details
    myILFS._setUser = function(p){
    	myILFS.user = p;
    	//return "user set";
    }

    ////
    // set the user details
    myILFS._setQuoteType = function(q){
    	myILFS.quoteType = q;
    	
    	// Set Full Name - mainly for email and marketo
    	if (q == "T")
    	{
    		myILFS.quoteTypFullName = "Term Life Insurance";
    	}
    	else if (q == "W"){
    		myILFS.quoteTypFullName = "Life Long Life Insurance";
    	}
    	else if (q == "M"){
    		myILFS.quoteTypFullName = "Mortgage Life Insurance";
    	}
    	//return "user set";
    }

    myILFS._setUserQuoteDetails = function(a,b,c,d){
    	myILFS.age1 = a;
    	if (b>100){
    		myILFS.age2 = "";
    	}
    	else{
    		myILFS.age2 = b;
    	}
    	myILFS.smokerCd1 = c;
    	myILFS.smokerCd2 = d;

    	//return "user set";
    }

    ////
    // set if the user has added a 2nd person
    myILFS._setSecondPerson = function(p){
    	myILFS.secondPerson = p;
    	//return "user set";
    }
    // set default for second person
    myILFS._setSecondPerson(false);
    ////
    // set the latest quote for the user
    myILFS._setPerson = function(p){
    	myILFS.person = p;
    	//return "user set";
    }

    ////
    // set the latest quote for the user
    myILFS._setQuote = function(q){
    	myILFS.quote = q;
    	//return "user set";
    }
    ////
    // This is for calling pageviews dynamically on the page
    myILFS._setGAPageView = function(p,t){
    		if (typeof _gaq != 'undefined'){//old school analytics
    			_gaq.push(["_trackPageview",p]);			
    		}else
    		{
    		try{
    			//universal analytics
    			ga('send', 'pageview', {
    			  'page': p,
    			  'title': t
    			});
    			}
    			catch(err){
    				//Do nothing
    			}
    			
    		}
    	//return "user set";
    }

    while (_ilfsa.length > 0) {

    	var ilfsFunc = _ilfsa[0].shift();
    	var ilfsParm = _ilfsa[0].shift();
    	_ilfsa.shift();
    	if(ilfsFunc.length> 1){ // extra check
    		myILFS[ilfsFunc](ilfsParm); // call the function and pass in params
    	}
    }


    myILFS._moveScreen = function(from,to){
    	$('#screen'+from).hide();
    	$('#screen'+to).fadeIn();
    	scrollToTop();
    };
    //#####################################
    //#####################################
    //#####################################
    if (myILFS.user == "ILFS-123" )
    /*&& 
    	(window.location.host =="" || 
    	 window.location.host =="www.irishlife-ebiz.net"|| 
    	 window.location.host =="dit2.123.ie"|| 
    	 window.location.host =="dit2-cms.123.ie"|| 
    	 window.location.host =="sit1.123.ie"|| 
    	 window.location.host =="dit2-cms.123.ie"|| 
    	 window.location.host =="irishlife-ebiz.net")
    	 )
    	 */
    	 {
    	// set up the screen for 123.ie
    	
    	//########################################
    	// product specific settings
    	var ILFSTermMax = 5;
    	var ILFSProductName = 'lifeTermSum';
    	var ILFSProductID = '19';
    	var ILFSProductScreenTitle = 'Life Insurance';
    	var ILFSProductScreenProductName = 'Term Life Insurance';
    	var ILFSProductTerm = true; // has a term
    	var ILFSDualPersons = false; // has a term
    	if (myILFS.quoteType == "T") // Term insurance
    	{
    		ILFSTermMax = 30;	// max term of 25
    		ILFSProductName = 'lifeTermSum';	
    		ILFSProductID = '19';	
    		ILFSProductScreenTitle = 'Term Life Insurance';
    		ILFSProductScreenProductName = 'Term Life Insurance';
    		ILFSProductTerm = true;
    		ILFSDualPersons = false;
    	}
    	else if (myILFS.quoteType == "M") // Mortgage Protection
    	{
    		ILFSTermMax = 35;	// max term of 35
    		ILFSProductName = 'lifeMortgage';	
    		ILFSProductID = '17';	
    		ILFSProductScreenTitle = 'Mortgage Protection';
    		ILFSProductScreenProductName = 'Mortgage Protection';
    		ILFSProductTerm = true;
    		ILFSDualPersons = true;

    	}
    	else if (myILFS.quoteType == "W") // Whole of Life Insurance
    	{
    		ILFSTermMax = 25;
    		ILFSProductName = 'lifeLong';	
    		ILFSProductID = '23';	
    		ILFSProductScreenTitle = 'Whole of Life Insurance';
    		ILFSProductScreenProductName = 'Whole of Life Insurance';
    		ILFSProductTerm = false;
    		ILFSDualPersons = false;
    	}
    	
    	//########################################
    	// html object to hold layout
    	var html=new Object();
    	
    	var stylesheet = document.createElement('link');
    //	stylesheet.href = 'http://ildev.internal.irishlife.ie:8080/uploadedFiles/retail/123/css/ilfsWidget.css';
    	stylesheet.href = 'https://www.irishlife.ie/secureWeb/uploadedImages/retail/123/css/ilfsWidget.css?031213';
    	stylesheet.rel = 'stylesheet';
    	stylesheet.type = 'text/css';
    	document.getElementsByTagName('head')[0].appendChild(stylesheet);
    	//
    	//#######################################
    	
    	
    	//html.progress = '<div class="row"><div class="twelvecol stepHold"><div class="stepCol first stepActive"><span class="step">Step</span>&nbsp;1&nbsp;<span class="title">-&nbsp;Your Details</span><span class="arrowBlue-white" style="display: block"></span><span class="arrowBlue-blue" style="display: none"></span></div><div class="stepCol "><span class="step">Step</span> 2&nbsp; <span class="title">-&nbsp;Your Quote</span><span class="arrowWhite" style="display: block"></span> <span class="arrowBlue-white" style="display: none"></span><span class="arrowBlue-blue" style="display: none"></span></div><div class="stepCol last "><span class="step">Step</span> 3&nbsp; <span class="title">-&nbsp;Your Options</span></div><div class="clear"></div></div></div>';
    	
    	html.progress = '<div class="row"><div class="twelvecol stepHold">'+
    	'<div id="setColA" class="stepCol first stepActive"><span class="step">Step</span>&nbsp;1&nbsp;<span class="title">-&nbsp;Your Details</span><span class="ilfsArrowRight" ></span></div>'+
    	'<div id="setColB" class="stepCol"><span class="step">Step</span> 2&nbsp; <span class="title">-&nbsp;Your Quote</span><span class="ilfsArrowRight"></span> </div>'+
    	'<div id="setColC" class="stepCol last"><span class="step">Step</span> 3&nbsp; <span class="title">-&nbsp;Your Options</span></div><div class="clear"></div></div></div>';
    	
    	
    	html.sliderHeader = '<h2 class="ilfsTitle">Slide To Set The Level of '+ILFSProductScreenTitle+' Required</h2>';
    	
    	
    	html.termHolder = '<div class="termHolder">for <select id="term" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="Term dropdown clicked"></select> years</div>';
    	
    	html.sliderBox = '<div class="ilfsFormColumn"><div class="row smallRow"><div class="eightcol ilfsDetailsPanel"><fieldset><div class="ilfsSliderTextPanel" style="display:none;"></div><div id="ilfsQuoteSlider"></div></fieldset></div><div class="fourcol ilfsDetailsPanel last sliderResultBlock ' + (ILFSProductTerm ? '' : 'termFalse') + '">€<span id="quoteResult" >100,000</span>' + (ILFSProductTerm ? html.termHolder : '' ) + '</div></div><div class="clearer"></div></div>';
    	html.detailsHeader = '<h2 class="ilfsTitle pushDown">Personal Details</h2>';
    	html.dobA = '<div class="ilfsDOB" ><select id="ilfsUserA-dob-day" class="ilfsDOBday" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="dob-1-day dropdown clicked"><option value="" selected="selected" >DD</option></select><select id="ilfsUserA-dob-month" class="ilfsDOBmonth" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="dob-1-month dropdown clicked"><option value="" selected="selected">MM</option></select><select id="ilfsUserA-dob-year" class="ilfsDOByear" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="dob-1-year dropdown clicked"><option value="" selected="selected">YYYY</option></select></div>';	
    	html.dobB = '<div class="ilfsDOB"><select id="ilfsUserB-dob-day" class="ilfsDOBday" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="dob-2-day"><option value="" selected="selected">DD</option></select><select id="ilfsUserB-dob-month" class="ilfsDOBmonth" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="dob-2-month dropdown clicked"><option value="" selected="selected">MM</option></select><select id="ilfsUserB-dob-year" class="ilfsDOByear" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="dob-2-year get instant clicked"><option value="" selected="selected">YYYY</option></select></div>';
    	html.detailsUserA = '<div class="sixcol"><div id="detailsUserA" class="ilfsDetailsPanel"><div class="ilfsDetailsBlock"><h3>Person 1</h3><label>Are you a smoker?</label><select id="ilfsUserA-smoker" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="smoker-1 dropdown clicked"><option value="" selected>Please Select</option><option value="Y">Yes</option><option value="N">No</option></select><div class="clearer"></div><label>Date of Birth</label>'+html.dobA+'</div></div></div>';
    	html.detailsUserBDetails = '<div class="ilfsDetailsBlock" id="ilfsUserB" style="display:none;"><a class="ilfsUserBClose">x</a><h3>Person 2</h3><label>Are you a smoker?</label><select id="ilfsUserB-smoker" ga-change ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="smoker-2 dropdown clicked"><option value="" selected>Please Select</option><option value="Y">Yes</option><option value="N">No</option></select><div class="clearer"></div><label>Date of Birth</label>'+html.dobB+'</div>';
    	html.detailsUserB = '<div class="sixcol last"><div class="ilfsAddUserbtnHolder"><a ga-click ga-category="ilfs-life-quote" ga-action="Page 1"  ga-label="add second person clicked" class="ilfsAddUserbtn" href="javascript:void(0);">+ Add a second person?</a></div><div id="detailsUserB" class="ilfsDetailsPanel" style="margin-right: 0px">'+html.detailsUserBDetails+'</div></div>';
    	html.detailsBox = '<div class="row smallRow"><div class="ilfsFormColumn">'+html.detailsUserA+html.detailsUserB+'<div class="clearer">&nbsp;</div></div></div><div class="ilfsFormColumn" id="progressError" style="display:none;">&nbsp;</div>';
    	html.detailsNextBtn = '<span id="getQuoteLoading" class="ILFSLoading" style="display:none;"><span>&nbsp;</span>loading...</span><a id="getQuote" class="ilfsMovebtn rightbtn" href="javascript:void(0);" ga-click ga-category="ilfs-life-quote" ga-action="Page 1"  ga-label="Get Instant Quote Clicked"><span class="ilfs-hide-for-small">GET INSTANT QUOTE</span><span class="ilfs-show-for-small">QUOTE</span>&nbsp;&rsaquo;</a><div class="clearer"></div>';
    	html.screen1ComplyBox = '<div class="ilfsFormColumn ilfsComply"><strong>This indicative quotation is for a '+ILFSProductScreenProductName+' protection policy which is provided by Irish Life Assurance plc.</strong> You may have other protection needs and we always recommend that you should discuss your overall insurance needs with a Financial Advisor.</div>';
    	html.screen2ComplyBox = '<div class="ilfsFormColumn ilfsComply"><strong>This indicative quotation is for a '+ILFSProductScreenProductName+' protection policy which is provided by Irish Life Assurance plc. and is subject to underwriting.</strong> It can provide a cash sum in the event of death (life cover). No cash will be returned if you cancel your plan or stop making regular payments on your plan during the term. If this happens you will no longer be covered.</div><div class="ilfsFormColumn ilfsComply">The quote is valid either for 7 days or to your next birthday, whichever is sooner. This is subject to no changes to the regulatory or tax rules applying to the product within that period.</div><div class="ilfsFormColumn ilfsComply">For the online quote we assume that your contributions do not increase in line with inflation and that you are not choosing the Guaranteed Cover Again option. You can update these over the phone to receive a different quote.</div>';
    	html.screen3ComplyBox = '<div class="ilfsFormColumn ilfsComply"><strong>This quotation is for a '+ILFSProductScreenProductName+' protection policy which is provided by Irish Life Assurance plc.</strong> </div>';
    	html.screen4ComplyBox = '<div class="ilfsFormColumn ilfsComply">In the interest of customer service we will record and monitor calls. We will only use your personal details for the purpose of dealing with your request. Your privacy is important to us.</div>';
    	
    	
    	// the second screen
    	html.detailsNext2 = '<h2 class="ilfsTitle">Your Quote</h2><div class="ilfsFormColumn"><table><thead><th>'+ILFSProductScreenTitle+' Quote</th></thead><tbody><tr><td class="content"><span class="ilfsQuoteResult">€15.00</span> / month<br><span class="tableBreakdownInfo"><a class="quoteBreakdownButton" href="javascript:void(0);"  ga-click ga-category="ilfs-life-quote" ga-action="Page 2" ga-label="Show/Hide Breakdown Button Clicked"><span style="DISPLAY: inline" class="showQuoteBreakdown">Show Breakdown</span><span style="DISPLAY: none" class="hideQuoteBreakdown">Hide Breakdown</span></a></span><div style="DISPLAY: none" id="quoteBreakdownDetails" class="tableBreakdownInfo"><span class="quoteBreakdownDetails1 quoteBreakdownDetailsText">Cost of Life Cover: €8.35</span><br /><span class="quoteBreakdownDetails2 quoteBreakdownDetailsText">Irish Life Policy Fee: €6.50</span><br /><span class="quoteBreakdownDetails3 quoteBreakdownDetailsText">Government Levy: €0.15</span><br /><span class="quoteBreakdownDetails4 quoteBreakdownDetailsText">&nbsp;</span></div></td></tr><tr class="ilfsQuoteBenefits"><td>'+
    	'<ul><li>Life assurance valued at <span class="progressLifeCoverAmount ">€</span></li>'+
    	'<li>Premium you pay is <span class="progressQuote">€</span> per month for <span class="progressLifeCoverYears">10</span> years</li>'+
    	'<li>A <span class="progressAge1Person"></span><span class="progressSmoker1Person"></span></li>'+
    	'<li class="ilfsHideSecondPersonInfo" style="display:none;">A <span class="progressAge2Person"></span><span class="progressSmoker2Person"></span></li>'+
    	'</td></tr></tbody></table></div>';
    	
    	html.detailsNext2Btn = '<span class="loading" style="display:none;">loading...</span><a id="editQuoteBtn" class="ilfsMovebtn leftbtn" href="javascript:void(0);" ga-click ga-category="ilfs-life-quote" ga-action="Page 2" ga-label="Edit Details Button Clicked">&lsaquo;&nbsp;<span class="ilfs-hide-for-small">EDIT DETAILS</span></a><a id="buyBtn" class="ilfsMovebtn rightbtn" href="javascript:void(0);"  ga-click ga-category="ilfs-life-quote" ga-action="Page 2" ga-label="Next Options Button Clicked">NEXT &nbsp;&rsaquo;</a><div class="clearer"></div>';
    	
    	
    	
    	html.callbackForm = '<div style="width:80%;text-align:right;margin:auto;"><div class="ilfsDetailsBlock"><div class="row smallRow"><div class="fivecol"><label>Name:</label></div><div class="sevencol last "><input id="callbackPopupName" name="callbackPopupName" ga-focus ga-category="ilfs-life-quote" ga-action="Page 3" ga-label="Callback Name Field clicked"><div class="clearer"></div><div class="callbackPopupNameError errorMessage" style="display:none;"></div></div><div class="clearer"></div></div>'+
    	'<div class="row smallRow"><div class="fivecol"><label>Phone:</label></div><div class="sevencol last "><input id="callbackPopupPhone" name="callbackPopupPhone"  ga-focus ga-category="ilfs-life-quote" ga-action="Page 3" ga-label="Callback Phone Field clicked"><div class="clearer"></div><div class="callbackPopupPhoneError errorMessage" style="display:none;"></div></div></div>'+
    	'<div class="row smallRow"><div class="fivecol"><label>Email:</label></div><div class="sevencol last "><input id="callbackPopupEmail" name="callbackPopupEmail" ga-focus ga-category="ilfs-life-quote" ga-action="Page 3" ga-label="Callback Email Field clicked"><div class="clearer"></div><div class="callbackPopupEmailError errorMessage" style="display:none;"></div></div></div>'+
    	'<div class="row smallRow"><div class="fivecol"><label>Best Time to call:</label></div><div class="sevencol last "><select id="callbackPopupCalltime" name="callbackPopupcalltime" ga-change ga-category="ilfs-life-quote" ga-action="Page 3" ga-label="Best Time to call dropdown clicked"><option value="NOW">Now</option><option value="anytime" selected="selected">Anytime</option><option value="morning-before-12pm">Morning (before 12pm)</option><option value="afternoon-12pm-to-5pm">Afternoon (12pm to 5pm)</option><option value="evening-5pm-to-7.30pm">Evening (5pm to 7.30pm)</option></select></div></div>'+
    	'</div><div class="clearer"></div></div>';
    	
    		
    	html.callbackFormRHS = '<b>Your Name:</b><br/><input id="callbackRHSName" name="callbackRHSName" ga-focus ga-category="ilfs-life-quote" ga-action="RHS" ga-label="Callback Name Field clicked"><div class="callbackRHSNameError errorMessage" style="display:none;"></div>'+
    	'<b>Phone Number:</b><br/><input id="callbackRHSPhone" name="callbackRHSPhone"  ga-focus ga-category="ilfs-life-quote" ga-action="RHS" ga-label="Callback Phone Field clicked"><div class="callbackRHSPhoneError errorMessage" style="display:none;"></div>'+
    	'<b>Email Address:</b><br/><input id="callbackRHSEmail" name="callbackRHSEmail" ga-focus ga-category="ilfs-life-quote" ga-action="RHS" ga-label="Callback Email Field clicked"><div class="callbackRHSEmailError errorMessage" style="display:none;"></div>'+
    	'<b>Best Time to call:</b><br/><select id="callbackRHSTime" name="callbackRHSTime" ga-change ga-category="ilfs-life-quote" ga-action="RHS" ga-label="Best Time to call dropdown clicked"><option value="NOW">Now</option><option value="anytime" selected="selected">Anytime</option><option value="morning-before-12pm">Morning (before 12pm)</option><option value="afternoon-12pm-to-5pm">Afternoon (12pm to 5pm)</option><option value="evening-5pm-to-7.30pm">Evening (5pm to 7.30pm)</option></select>'+
    	'<a id="getRHSCallback" class="ilfsRHSSubmitbtn" href="javascript:void(0);" ga-click="" ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="Get Instant Quote Clicked">Call me back&nbsp;›</a><div class="clearer"></div>';
    	
    	
    	
    	// the third screen
    	html.detailsNext3 = '<h2 class="ilfsTitle">Your Options - Callback</h2><div class="ilfsFormColumn"><p>Now that you\'ve completed a quote a Financial Advisor can call you back to look at all your options, answer your questions and see what protection plan may suit your life cover needs.</p>'+html.callbackForm+'</div>';
    	html.detailsNext3Btn = '<span class="loading" style="display:none;">loading...</span><a id="backToQuoteBtn" class="ilfsMovebtn leftbtn" href="javascript:void(0);" ga-click ga-category="ilfs-life-quote" ga-action="Page 3" ga-label="back to Quote Button Clicked">&lsaquo;&nbsp;<span class="ilfs-hide-for-small">BACK</a><a id="ilfsSubmitCallback" class="ilfsMovebtn rightbtn" href="javascript:void(0);" ga-click ga-category="ilfs-life-quote" ga-action="Page 3" ga-label="Submit Callback Button Clicked">SUBMIT&nbsp;&rsaquo;</a><div class="clearer"></div>';
    	
    	// RHS CALLBACK
    	html.detailsRHSCallback = '<h2 class="ilfsTitle ">Advisor Callback</h2><div class="ilfsFormColumn ilfs-right-callback"><p>Get some advice over the phone. Leave your info and let us call you back.</p><br/>'+html.callbackFormRHS+'</div>';
    	//<div class="ilfsFormColumn ilfsComply">Note: In the interest of customer service, we will record and monitor calls. We will only use your personal details for the purpose of dealing with your request.By completing your contact details above, you authorise us to contact you by telephone, mobile and/or email.</div>';
    		

    	// the Callbackcomplete screen
    	html.detailsNext4 = '<h2 class="ilfsTitle"></h2><div class="ilfsFormColumn"><p id="ilfsCallbackRequestComplete">Completed</p></div>'+
    '<a id="getAnotherQuote" style="margin-top:15px;float:left" class="ilfsMovebtn leftbtn" href="javascript:void(0);" ga-click="" ga-category="ilfs-life-quote" ga-action="Page 1" ga-label="Get Another Quote Clicked" style="float: left;"><span class="ilfs-hide-for-small">GET ANOTHER QUOTE</span><span class="ilfs-show-for-small">NEW QUOTE</span>&nbsp;›</a>';
    	// all the screens added
    	$('#ilfsWidget').html(html.progress+'<div class="row"><div class="eightcol"><div id="screen1">'+html.sliderHeader+html.sliderBox+html.detailsHeader+html.detailsBox+html.screen1ComplyBox+html.detailsNextBtn+'</div><div id="screen2" style="display:none">'+html.detailsNext2+html.screen2ComplyBox+html.detailsNext2Btn+'</div><div id="screen3" style="display:none">'+html.detailsNext3+html.detailsNext3Btn+'</div><div id="screen4" style="display:none;">'+html.detailsNext4+'</div></div><div class="fourcol last"><div id="ilfsRHSCallback">'+html.detailsRHSCallback+'</div></div></div>');
    	
    	//<div class="ilfs-right-callback"><div class="ilfs-callback-text"><h4>Request a Callback</h4><a href="#callback">Callback</a></div></div> </div></div></div>');
    	
    	
    	
    	for(i=5;i<=ILFSTermMax;i+=5)
    	{
    		$('#term').append('<option value='+i+' >'+i+'</option>');
    	}
    	
    	for(i=1993;i>=1946;i--)
    	{
    		$('.ilfsDOByear').append('<option value='+i+'>'+i+'</option>');
    	}
    	var ilfsMonthsArr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    	for(i=1;i<=12;i++)
    	{
    		$('.ilfsDOBmonth').append('<option value='+i+'>'+ilfsMonthsArr[i-1]+'</option>');
    	}	

    	
    	for(i=1;i<=31;i++)
    	{
    		$('.ilfsDOBday').append('<option value='+i+'>'+i+'</option>');
    	}
    	
    	$('.ilfsAddUserbtn').click(function(){
    		$('.ilfsAddUserbtnHolder').hide();
    		$('#ilfsUserB').show();
    		myILFS._setSecondPerson(true);
    	});
    	$('.ilfsUserBClose').click(function(){
    		$('.ilfsAddUserbtnHolder').show();
    		$('#ilfsUserB').hide();
    		myILFS._setSecondPerson(false);
    	});
    	
    	
    	$( "#ilfsQuoteSlider" ).noUiSlider({
    	 range: [50000, 500000]
    	,start: 100000
    	,step: 5000
    	,connect: "lower"
    	,handles: 1
    	,slide: function(){
    		var v = parseInt($('#ilfsQuoteSlider').val()).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    		$('#sliderBubble').fadeOut('fast');
    		$( "#quoteResult" ).html( v );
    		$('.sliderResultBlock').addClass("sliderMove");
    		$('.termHolder').hide();
    		$('.ilfsSliderTextPanel').fadeOut(700);
    	},set: function () {
    		$('.sliderResultBlock').removeClass("sliderMove");
    		$('.termHolder').show();
    	}

    })

    	$('.ilfsSliderTextPanel').delay(300).fadeIn(700);
    			 
    	$.fn.trackEvents(); // start analytics

    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/'+myILFS.quoteType+"-"+'life-insurance-quote-step-1/','Your Details Page')	
    }
    else
    {
    	$('#ilfsWidget').html(window.location.host+" does not have persmission to use this quote facility.");
    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/'+myILFS.quoteType+"-"+'life-insurance-quote-step-permissions/','No permissions to use this facility')	

    }
    scrollToTop = function(){ // scroll to top of widget
    	$('html,body').animate({scrollTop: $('#ilfsWidget').offset().top}, 1000);
    };
    //#####################################
    //#####################################
    //#####################################

    $('#getQuote').click(function(){

    	getQuote(function(){});
    	
    });
    $('#getAnotherQuote').click(function(){

    	getAnotherQuote(function(){});
    	
    });

     addStepCol = function(a){
    $('#setCol'+a).addClass('stepActive');
    }
     removeStepCol = function(a){
    $('#setCol'+a).removeClass('stepActive');
    }
    $('#editQuoteBtn').click(function(){

    	myILFS._moveScreen(2,1); // moveScreen(from, to)
    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/life-insurance-quote-step-1/','Your Details - From Quote');
    	// hide the loading 
    	$("#getQuoteLoading").hide();
    	$("#getQuote").show();
    	removeStepCol("B");
    	
    });
    $('#backToQuoteBtn').click(function(){

    	myILFS._moveScreen(3,2); // moveScreen(from, to)
    	
    	removeStepCol("C");
    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/life-insurance-quote-step-2/','Your Quote - From Options');	
    });
    $('#buyBtn').click(function(){

    	myILFS._moveScreen(2,3); // moveScreen(from, to)
    	addStepCol('C');
    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/life-insurance-quote-step-3/','Your Options');	

    });

    $('.quoteBreakdownButton').click(function(){
    	$('#quoteBreakdownDetails').slideToggle();
    	$('.showQuoteBreakdown').toggle();
    	$('.hideQuoteBreakdown').toggle();
    });

    //###############################
    // Submitting a RHS callback
    $('#getRHSCallback').click(function(){
    	var n,e,p,t,z;
    	z = 0;
    	n = $('#callbackRHSName').val();
    	e = $('#callbackRHSEmail').val();
    	p = $('#callbackRHSPhone').val();
    	t = $('#callbackRHSTime').val();

    	$(".callbackRHSNameError").hide().html("");
    	$(".callbackRHSPhoneError").hide().html("");
    	$(".callbackRHSEmailError").hide().html("");
    	
    	if(n.length<=3){
    		z =z+1;
    		$(".callbackRHSNameError").show().html("Invalid Name");
    	}
    	if(p.length<=7){
    		z =z+1;
    		$(".callbackRHSPhoneError").show().html("Invalid Phone Number");
    	}
    	if(isEmail(e) == false){
    		z =z+1;
    		$(".callbackRHSEmailError").show().html("Invalid Email");
    	}
    	if (z==0)
    	{
    		// no errors
    		// send the callback anc change the screen
    		
    		//	mkAssociateLeadWithQuote('NULL', ''+$("#progressName").val(), emailAddress, ''+$("#progressPhone").val(), quoteType, numYears, prmLev,coverValue,p1gender,'NULL',getAge(p1dobyear,p1dobmonth,p1dobday),'NULL',p1smoker,'NULL',''+$('#progressCalltime').val());
    		mkAssociateLead123('', n, e, p, t, myILFS.quoteTypFullName);
    		$('.ilfs-right-callback').html("Thank you "+$('#callbackRHSName').val()+". Your details have been received and we will be in touch.");
    		
    	}
    });

    $('#ilfsSubmitCallback').click(function(){

    var n,e,p,t,z;
    	z = 0;
    	n = $('#callbackPopupName').val();
    	e = $('#callbackPopupEmail').val();
    	p = $('#callbackPopupPhone').val();
    	t = $('#callbackPopupCalltime').val();
    	
    	$(".callbackPopupNameError").hide().html("");
    	$(".callbackPopupPhoneError").hide().html("");
    	$(".callbackPopupEmailError").hide().html("");
    	
    	if(n.length<=3){
    		z =z+1;
    		$(".callbackPopupNameError").show().html("Invalid Name");
    	}
    	if(p.length<=7){
    		z =z+1;
    		$(".callbackPopupPhoneError").show().html("Invalid Phone Number");
    	}
    	if(isEmail(e) == false){
    		z =z+1;
    		$(".callbackPopupEmailError").show().html("Invalid Email");
    	}
    	if (z==0)
    	{
    		// no errors
    		// send the callback anc change the screen

    	$('#ilfsCallbackRequestComplete').html("Thank you "+$('#callbackPopupName').val()+". Your details have been received and we will be in touch.");
    	myILFS._moveScreen(3,4); // moveScreen(from, to)
    	
    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/life-insurance-quote-step-4/','Callback Submitted');	
    	
    	mkAssociateLeadPerformQuote123('', n, e, p, myILFS.quoteType, $("#term").val(),myILFS.quote.prem,myILFS.quote.lifeCover,myILFS.age1,myILFS.age2,myILFS.smokerCd1,myILFS.smokerCd2,t,myILFS.quoteTypFullName);

    	}
    	
    	
    	
    	
    	
    	
    	
    });


    function checkDOB(dobDay,dobMonth,dobYear){
    		if (dobDay.length == 0 || dobMonth.length == 0 || dobYear.length <= 3 ){			
    			var dobOK = false;
    		}else
    		{
    			var dobOK = true;
    		}
    		if (dobMonth == 4 ||dobMonth == 6 ||dobMonth == 9 ||dobMonth == 11)
    		{
    			if (dobDay >30)
    			{
    				dobOK = false;
    			}
    		}
    		if (dobMonth == 2)
    		{
    			if (dobDay >28)
    			{

    				if (dobDay == 29)
    				{
    					if((dobYear%4) != 0)
    					{
    						dobOK = false;
    					}
    				
    				}
    				else
    				{
    					dobOK = false;
    				}
    			}
    	}
    return dobOK;
    }

    // validate email address format	
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    function getAnotherQuote(){
    	myILFS._moveScreen(4,1); // moveScreen(from, to)
    	// Add a pageview into google analytics
    	myILFS._setGAPageView('/ilfs/life-insurance-quote-step-1/','Your Details - From Finish');
    	// hide the loading 
    	$("#getQuoteLoading").hide();
    	$("#getQuote").show();
    	removeStepCol("B");
    	removeStepCol("C");
    	}

    function getQuote(){
    	// hide the button and show loading
    	$("#getQuoteLoading").show();
    	$("#getQuote").hide();
    	
    	$("#progressError").hide().html("");
    	var p1dobday = "27"; // $('#ilfsUserA-dob-day').val();
    	var p1dobmonth = "12"; // $('#ilfsUserA-dob-month').val();
    	var p1dobyear = "1981"; // $('#ilfsUserA-dob-year').val();
    	var p1gender = "M"; //
    	var p1smoker = "N"; // $('#ilfsUserA-smoker').val();
    	var p2dobday = "17"; // $('#ilfsUserB-dob-day').val();
    	var p2dobmonth = "09"; // $('#ilfsUserB-dob-month').val();
    	var p2dobyear = "1968"; // $('#ilfsUserB-dob-year').val();
    	var p2gender = "M"; // 
    	var p2smoker = "Y"; // $('#ilfsUserB-smoker').val();
    	var coverValue = "250000";
    	var coverValue = Math.floor((Math.random()*120000)+30000);
    	var numYears = "10";
    	var params = "";


    	coverValue = $( "#quoteResult" ).html().replace(/,/g,'');


    	p1dobday = $("#ilfsUserA-dob-day").val();
    	p1dobmonth = $("#ilfsUserA-dob-month").val();
    	p1dobyear = $("#ilfsUserA-dob-year").val();

    	p2dobday = $("#ilfsUserB-dob-day").val();
    	p2dobmonth = $("#ilfsUserB-dob-month").val();
    	p2dobyear = $("#ilfsUserB-dob-year").val();

    	p1smoker = $('#ilfsUserA-smoker').val();
    	p2smoker = $('#ilfsUserB-smoker').val();
    	
    	numYears = $("#term").val();

    	var p1dob = checkDOB(p1dobday,p1dobmonth,p1dobyear);
    	var p2dob = checkDOB(p2dobday,p2dobmonth,p2dobyear);
    	var termError = false;
    		
    	if (p1dob == true)
    	{
    		var year=Number(p1dobyear);
    		var month=Number(p1dobmonth)-1;
    		var day=Number(p1dobday);
    		var today=new Date();
    		var age=today.getFullYear()-year;
    		if(today.getMonth()<month || (today.getMonth()==month && today.getDate()<day)){age--;}

    		termcheck = parseInt(numYears)+parseInt(age);
    		if (termcheck>=80){
    		
    			p1dob = false;
    			termError = true;
    			
    		}
    	}
    	else{
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    	}
    		
    	// if a second person has been added then validate the dob
    	if (myILFS.secondPerson == true)
    	{	
    		$('.ilfsHideSecondPersonInfo').show();
    		if (p2dob == true )
    		{
    			//var dob=p2dobyear+p2dobmonth+p2dobday;
    			var year=Number(p2dobyear);
    			var month=Number(p2dobmonth)-1;
    			var day=Number(p1dobday);
    			var today=new Date();
    			var age=today.getFullYear()-year;
    			if(today.getMonth()<month || (today.getMonth()==month && today.getDate()<day)){age--;}

    			termcheck = parseInt(numYears)+parseInt(age);
    			
    			if (termcheck>=80){
    				p2dob = false;
    				termError = true;
    			}
    		}
    		else{
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    		}
    	}else{
    		$('.ilfsHideSecondPersonInfo').hide();
    	}
    		
    	// This is the default and it is for Life Term Cover
    	if (myILFS.secondPerson==true)
    	{
    		if(p1smoker=="" || p2smoker==""){
    			if (p1smoker=="" && p2smoker!="")
    			{
    				$("#progressError").show().html("Please set smoker status of Person 1");
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    			}
    			else if(p1smoker=="" && p2smoker=="")
    			{
    				$("#progressError").show().html("Please set smoker status of both people");
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    			}
    			else if(p2smoker=="")
    			{
    				$("#progressError").show().html("Please set smoker status of Person 2");
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    			}
    			
    			if( !p2dob && !p1dob){
    				$("#progressError").append(" and also the date of birth of both people");
    			}
    			else if( p2dob && !p1dob){
    				$("#progressError").append(" and also the date of birth of Person 1");
    			}
    			else if( !p2dob && p1dob){
    				$("#progressError").append(" and also the date of birth of Person 2");
    			}
    		}

    		else
    		{
    			if (p2dob && p1dob)
    			{

    				params = "quickQuoteId="+ILFSProductName+"&productId="+ILFSProductID+"&coverTypeCd=L"+
    				"&jointLife=True"+
    				"&dateOfBirth1Day="+p1dobday+
    				"&dateOfBirth1Month="+p1dobmonth+
    				"&dateOfBirth1Year="+p1dobyear+
    				"&sexCd1="+p1gender+
    				"&smokerCd1="+p1smoker+
    				"&dateOfBirth2Day="+p2dobday+
    				"&dateOfBirth2Month="+p2dobmonth+
    				"&dateOfBirth2Year="+p2dobyear+
    				"&sexCd2="+p2gender+
    				"&smokerCd2="+p2smoker+
    				"&lifeCoverAmt="+coverValue+
    				"&term="+numYears+
    				"&indexation=False"+
    				"&frequencyCd=M"+
    				"&conversion=False";
    				
    				
    				ilfsQuote.loadScript('https://www.irishlife.ie/secure/submitLifeQuote.js?'+ params, ilfsQuote.scriptLoaded,params);
    			}
    			else{
    				if (termError)
    				{
    					$("#progressError").show().html("Please reduce the term and try again.");
    				}
    				else{
    					$("#progressError").show().html("There is an error with the dates of birth set. Please update and then try again.");
    				}
    				$("#getQuoteLoading").hide();
    				$("#getQuote").show();
    			}
    		}
    	}
    	else
    	{
    		if(p1smoker==""&& p1dob){
    			$("#progressError").show().html("Please set smoker status");
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    		}
    		else if(p1smoker=="" && !p1dob){
    			$("#progressError").show().html("Please set smoker status and date of birth");
    		}
    		else{
    			if (p1dob)
    			{
    				params = "quickQuoteId="+ILFSProductName+"&productId="+ILFSProductID+"&coverTypeCd=L"+
    				"&jointLife=False"+
    				"&dateOfBirth1Day="+p1dobday+
    				"&dateOfBirth1Month="+p1dobmonth+
    				"&dateOfBirth1Year="+p1dobyear+
    				"&sexCd1="+p1gender+
    				"&smokerCd1="+p1smoker+
    				"&dateOfBirth2Day="+p2dobday+
    				"&dateOfBirth2Month="+p2dobmonth+
    				"&dateOfBirth2Year="+p2dobyear+
    				"&sexCd2="+p2gender+
    				"&smokerCd2="+p2smoker+
    				"&lifeCoverAmt="+coverValue+
    				"&term="+numYears+
    				"&indexation=False"+
    				"&frequencyCd=M"+
    				"&conversion=False";
    				
    				ilfsQuote.loadScript('https://www.irishlife.ie/secure/submitLifeQuote.js?'+ params, ilfsQuote.scriptLoaded, params);
    			}
    			else{
    				if (termError)
    				{
    					$("#progressError").show().html("Please reduce the term and try again.");
    				}
    				else{
    					$("#progressError").show().html("Please set your date of birth");
    				}
    				$("#getQuoteLoading").hide();
    				$("#getQuote").show();

    			}
    		}
    			
    	}
    		
    }
    		
    		
    var ilfsQuote = (function() {
    // these functions get the quote and set up the user result
     return {
        loadScript: function(url, callback, params) {

            var script = document.createElement("script")
            script.type = "text/javascript";

            if (script.readyState) { //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback(params);
                    }
                };
            } else { //Others
                script.onload = function () {
                    callback(params);
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        },
    	genericLoad:function(){
    		// do nothing
    	},
    	MKLoad:function(){
    		// do nothing
    		// ilfsQuote.loadScript('http://ildev.internal.irishlife.ie:8080/uploadedFiles/retail/js/mk-uncompressed.js',ilfsQuote.genericLoad );
    		ilfsQuote.loadScript('https://www.irishlife.ie/secureWeb/uploadedFiles/retail/js/mk.js',ilfsQuote.genericLoad );
    		
    	},
        scriptLoaded: function(params) {
    		
    		var v = result; // result is the variable set by the js called before this
    		//var s = v+params; 
    		var s = v+"&"+params; 
    		if (v !="error"){ // success
    		
    						
    			var r = JSON.parse('{"' + decodeURI(s.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
    			myILFS._setQuote(r);
    			$('.quoteBreakdownDetails1').html("");
    			$('.quoteBreakdownDetails2').html("");
    			$('.quoteBreakdownDetails3').html("");
    			$('.quoteBreakdownDetails4').html("");
    			
    			$('.ilfsQuoteResult').html(" €"+(parseInt(myILFS.quote.premInclLevy*100)/100).toFixed(2));
    			if (myILFS.secondPerson == true && ILFSDualPersons == false)
    			{
    				if(ILFSDualPersons){
    					$('.quoteBreakdownDetails1').html("Cost of Life Cover: €"+(parseInt((myILFS.quote.premOptionalExtras3)*100)/100).toFixed(2));
    				}
    				else
    				{
    					
    					$('.quoteBreakdownDetails1').html("Cost of Life Cover for Person 1: €"+(parseInt((myILFS.quote.premOptionalExtras1)*100)/100).toFixed(2));
    					$('.quoteBreakdownDetails2').html("Cost of Life Cover for Person 2: €"+(parseInt((myILFS.quote.premOptionalExtras2)*100)/100).toFixed(2));
    				}
    			
    			
    				$('.quoteBreakdownDetails3').html("Irish Life Policy Fee: €"+(parseInt(myILFS.quote.fee*100)/100).toFixed(2));
    				$('.quoteBreakdownDetails4').html("Government Levy: €"+(parseInt(myILFS.quote.levy*100)/100).toFixed(2));
    			}else{

    				$('.quoteBreakdownDetails1').html("Cost of Life Cover: €"+(parseInt((myILFS.quote.prem-myILFS.quote.fee)*100)/100).toFixed(2));
    				$('.quoteBreakdownDetails2').html("Irish Life Policy Fee: €"+(parseInt(myILFS.quote.fee*100)/100).toFixed(2));
    				$('.quoteBreakdownDetails3').html("Government Levy: €"+(parseInt(myILFS.quote.levy*100)/100).toFixed(2));
    			
    			}
    			// Set the sum assured amount
    			$('.progressLifeCoverAmount').html("€"+(parseInt(r.lifeCoverAmt*100)/100).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    			$('.progressLifeCoverYears').html(r.term);
    			
    			$('.progressQuote').html(" €"+(parseInt(myILFS.quote.premInclLevy*100)/100).toFixed(2));
    			
    			r.age1 = getAge(r.dateOfBirth1Year,r.dateOfBirth1Month,r.dateOfBirth1Day);
    			r.age2 = getAge(r.dateOfBirth2Year,r.dateOfBirth2Month,r.dateOfBirth2Day);
    			$('.progressAge1Person').html(r.age1+" year old ");
    			$('.progressAge2Person').html(r.age2+" year old ");
    			
    										
    			if (r.smokerCd1=="Y")
    			{
    				$('.progressSmoker1Person').html(" who does smoke ");
    			}
    			else{
    				$('.progressSmoker1Person').html(" who does not smoke ");
    			}
    			
    			if (r.smokerCd2=="Y")
    			{
    				$('.progressSmoker2Person').html(" who does smoke");
    			}
    			else{
    				$('.progressSmoker2Person').html(" who does not smoke");
    			}
    			
    			//myILFS._setQuoteScreen(); // Update the quote screen
    			myILFS._moveScreen(1,2); // moveScreen(from, to)
    			addStepCol('B');
    			// Add a pageview into google analytics
    			myILFS._setUserQuoteDetails(r.age1,r.age2,r.smokerCd1,r.smokerCd2);
    			myILFS._setGAPageView('/ilfs/life-insurance-quote-step-2/','Your Quote');
    			
    		}
    		else
    		{
    			// Add a pageview into google analytics
    			myILFS._setGAPageView('/ilfs/life-insurance-quote-step-1/','Error Getting Quote')
    			$("#progressError").show().html("There is an error performing a quote. Please try again later.");
    			$("#getQuoteLoading").hide();
    			$("#getQuote").show();
    		}
        }
    		
     };
    })();

    ilfsQuote.loadScript('https://munchkin.marketo.net/munchkin.js',ilfsQuote.MKLoad );
    // ilfsQuote.loadScript('https://www.irishlife.ie/secureWeb/uploadedFiles/retail/js/mk.js',ilfsQuote.genericLoad );
}(jQuery));