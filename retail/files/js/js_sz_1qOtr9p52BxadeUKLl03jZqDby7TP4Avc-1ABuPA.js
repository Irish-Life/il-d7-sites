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
var libFuncName = null;

if (typeof jQuery === "undefined" &&
    typeof Zepto === "undefined" &&
    typeof $ === "function") {
  libFuncName = $;
} else if (typeof jQuery === "function") {
  libFuncName = jQuery;
} else if (typeof Zepto === "function") {
  libFuncName = Zepto;
} else {
  throw new TypeError();
}

(function ($, window, document, undefined) {
  'use strict';

  /*
    matchMedia() polyfill - Test a CSS media 
    type/query in JS. Authors & copyright (c) 2012: 
    Scott Jehl, Paul Irish, Nicholas Zakas. 
    Dual MIT/BSD license

    https://github.com/paulirish/matchMedia.js
  */

   $('head').append('<meta class="foundation-mq-small">');
   $('head').append('<meta class="foundation-mq-medium">');
   $('head').append('<meta class="foundation-mq-large">');

  window.matchMedia = window.matchMedia || (function( doc, undefined ) {

    "use strict";

    var bool,
        docElem = doc.documentElement,
        refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
        fakeBody = doc.createElement( "body" ),
        div = doc.createElement( "div" );

    div.id = "mq-test-1";
    div.style.cssText = "position:absolute;top:-100em";
    fakeBody.style.background = "none";
    fakeBody.appendChild(div);

    return function(q){

      div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

      docElem.insertBefore( fakeBody, refNode );
      bool = div.offsetWidth === 42;
      docElem.removeChild( fakeBody );

      return {
        matches: bool,
        media: q
      };

    };

  }( document ));

  // add dusty browser stuff
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null) {
        throw new TypeError();
      }

      var t = Object(this),
          len = t.length >>> 0;
      if (typeof fun !== "function") {
          return;
      }

      var res = [],
          thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun && fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }

      return res;
    }
  }

  if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
      if (typeof this !== "function") {
        // closest thing possible to the ECMAScript 5 internal IsCallable function
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
      }
   
      var aArgs = Array.prototype.slice.call(arguments, 1), 
          fToBind = this, 
          fNOP = function () {},
          fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
               ? this
               : oThis,
             aArgs.concat(Array.prototype.slice.call(arguments)));
          };
   
      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();
   
      return fBound;
    };
  }

  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      "use strict";
      if (this == null) {
        throw new TypeError();
      }
      var t = Object(this);
      var len = t.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n != 0 && n != Infinity && n != -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n >= len) {
          return -1;
      }
      var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }

  // fake stop() for zepto.
  $.fn.stop = $.fn.stop || function() {
    return this;
  };

  window.Foundation = {
    name : 'Foundation',

    version : '4.3.2',

    cache : {},

    media_queries : {
      small : $('.foundation-mq-small').css('font-family').replace(/\'/g, ''),
      medium : $('.foundation-mq-medium').css('font-family').replace(/\'/g, ''),
      large : $('.foundation-mq-large').css('font-family').replace(/\'/g, '')
    },

    stylesheet : $('<style></style>').appendTo('head')[0].sheet,

    init : function (scope, libraries, method, options, response, /* internal */ nc) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [],
          nc = nc || false;

      // disable library error catching,
      // used for development only
      if (nc) this.nc = nc;

      // check RTL
      this.rtl = /rtl/i.test($('html').attr('dir'));

      // set foundation global scope
      this.scope = scope || this.scope;

      if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
        if (/off/i.test(libraries)) return this.off();

        library_arr = libraries.split(' ');

        if (library_arr.length > 0) {
          for (var i = library_arr.length - 1; i >= 0; i--) {
            responses.push(this.init_lib(library_arr[i], args));
          }
        }
      } else {
        if (/reflow/i.test(libraries)) args[1] = 'reflow';

        for (var lib in this.libs) {
          responses.push(this.init_lib(lib, args));
        }
      }

      // if first argument is callback, add to args
      if (typeof libraries === 'function') {
        args.unshift(libraries);
      }

      return this.response_obj(responses, args);
    },

    response_obj : function (response_arr, args) {
      for (var i = 0, len = args.length; i < len; i++) {
        if (typeof args[i] === 'function') {
          return args[i]({
            errors: response_arr.filter(function (s) {
              if (typeof s === 'string') return s;
            })
          });
        }
      }

      return response_arr;
    },

    init_lib : function (lib, args) {
      return this.trap(function () {
        if (this.libs.hasOwnProperty(lib)) {
          this.patch(this.libs[lib]);
          return this.libs[lib].init.apply(this.libs[lib], args);
        } else {
          return function () {};
        }
      }.bind(this), lib);
    },

    trap : function (fun, lib) {
      if (!this.nc) {
        try {
          return fun();
        } catch (e) {
          return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
        }
      }

      return fun();
    },

    patch : function (lib) {
      this.fix_outer(lib);
      lib.scope = this.scope;
      lib.rtl = this.rtl;
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' ');

      for (var i = methods_arr.length - 1; i >= 0; i--) {
        if (this.lib_methods.hasOwnProperty(methods_arr[i])) {
          this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
        }
      }
    },

    random_str : function (length) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

      if (!length) {
        length = Math.floor(Math.random() * chars.length);
      }

      var str = '';
      for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
      }
      return str;
    },

    libs : {},

    // methods that can be inherited in libraries
    lib_methods : {
      set_data : function (node, data) {
        // this.name references the name of the library calling this method
        var id = [this.name,+new Date(),Foundation.random_str(5)].join('-');

        Foundation.cache[id] = data;
        node.attr('data-' + this.name + '-id', id);
        return data;
      },

      get_data : function (node) {
        return Foundation.cache[node.attr('data-' + this.name + '-id')];
      },

      remove_data : function (node) {
        if (node) {
          delete Foundation.cache[node.attr('data-' + this.name + '-id')];
          node.attr('data-' + this.name + '-id', '');
        } else {
          $('[data-' + this.name + '-id]').each(function () {
            delete Foundation.cache[$(this).attr('data-' + this.name + '-id')];
            $(this).attr('data-' + this.name + '-id', '');
          });
        }
      },

      throttle : function(fun, delay) {
        var timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fun.apply(context, args);
          }, delay);
        };
      },

      // parses data-options attribute on nodes and turns
      // them into an object
      data_options : function (el) {
        var opts = {}, ii, p,
            opts_arr = (el.attr('data-options') || ':').split(';'),
            opts_len = opts_arr.length;

        function isNumber (o) {
          return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
        }

        function trim(str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        // parse options
        for (ii = opts_len - 1; ii >= 0; ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;
          if (isNumber(p[1])) p[1] = parseInt(p[1], 10);

          if (p.length === 2 && p[0].length > 0) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      delay : function (fun, delay) {
        return setTimeout(fun, delay);
      },

      // animated scrolling
      scrollTo : function (el, to, duration) {
        if (duration < 0) return;
        var difference = to - $(window).scrollTop();
        var perTick = difference / duration * 10;

        this.scrollToTimerCache = setTimeout(function() {
          if (!isNaN(parseInt(perTick, 10))) {
            window.scrollTo(0, $(window).scrollTop() + perTick);
            this.scrollTo(el, to, duration - 10);
          }
        }.bind(this), 10);
      },

      // not supported in core Zepto
      scrollLeft : function (el) {
        if (!el.length) return;
        return ('scrollLeft' in el[0]) ? el[0].scrollLeft : el[0].pageXOffset;
      },

      // test for empty object or array
      empty : function (obj) {
        if (obj.length && obj.length > 0)    return false;
        if (obj.length && obj.length === 0)  return true;

        for (var key in obj) {
          if (hasOwnProperty.call(obj, key))    return false;
        }

        return true;
      },

      addCustomRule : function(rule, media) {
        if(media === undefined) {
          Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
        } else {
          var query = Foundation.media_queries[media];
          if(query !== undefined) {
            Foundation.stylesheet.insertRule('@media ' + 
              Foundation.media_queries[media] + '{ ' + rule + ' }');
          }
        }
      }
    },

    fix_outer : function (lib) {
      lib.outerHeight = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.height();
        }

        if (typeof bool !== 'undefined') {
          return el.outerHeight(bool);
        }

        return el.outerHeight();
      };

      lib.outerWidth = function (el, bool) {
        if (typeof Zepto === 'function') {
          return el.width();
        }

        if (typeof bool !== 'undefined') {
          return el.outerWidth(bool);
        }

        return el.outerWidth();
      };
    },

    error : function (error) {
      return error.name + ' ' + error.message + '; ' + error.more;
    },

    // remove all foundation events.
    off: function () {
      $(this.scope).off('.fndtn');
      $(window).off('.fndtn');
      return true;
    },

    zj : $
  };

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(libFuncName, this, this.document));
;
/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 * Modified to work with Zepto.js by ZURB
 */
(function ($, document, undefined) {

  var pluses = /\+/g;

  function raw(s) {
    return s;
  }

  function decoded(s) {
    return decodeURIComponent(s.replace(pluses, ' '));
  }

  var config = $.cookie = function (key, value, options) {

    // write
    if (value !== undefined) {
      options = $.extend({}, config.defaults, options);

      if (value === null) {
        options.expires = -1;
      }

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);

      return (document.cookie = [
        encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // read
    var decode = config.raw ? raw : decoded;
    var cookies = document.cookie.split('; ');
    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      if (decode(parts.shift()) === key) {
        var cookie = decode(parts.join('='));
        return config.json ? JSON.parse(cookie) : cookie;
      }
    }

    return null;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== null) {
      $.cookie(key, null, options);
      return true;
    }
    return false;
  };

})(Foundation.zj, document);
;
/**
 * alertify
 * An unobtrusive customizable JavaScript notification system
 *
 * @author Fabien Doiron <fabien.doiron@gmail.com>
 * @copyright Fabien Doiron 2013
 * @license MIT <http://opensource.org/licenses/mit-license.php>
 * @link http://fabien-d.github.com/alertify.js/
 * @module alertify
 * @version 0.3.8
 */
(function(e,t){"use strict";var n=e.document,r;r=function(){var r={},i={},s=!1,o={ENTER:13,ESC:27,SPACE:32},u=[],a,f,l,c,h,p,d,v,m,g,y,b;return i={buttons:{holder:'<nav class="alertify-buttons">{{buttons}}</nav>',submit:'<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',ok:'<a href="#" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</a>',cancel:'<a href="#" class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</a>'},input:'<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',message:'<p class="alertify-message">{{message}}</p>',log:'<article class="alertify-log{{class}}">{{message}}</article>'},b=function(){var e,r=n.createElement("fakeelement"),i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"};for(e in i)if(r.style[e]!==t)return i[e]},a=function(e){return n.getElementById(e)},r={labels:{ok:"OK",cancel:"Cancel"},delay:5e3,buttonReverse:!1,buttonFocus:"ok",transition:t,addListeners:function(e){var t=typeof l!="undefined",r=typeof f!="undefined",i=typeof y!="undefined",s="",u=this,a,h,p,d,v;a=function(t){return typeof t.preventDefault!="undefined"&&t.preventDefault(),p(t),typeof y!="undefined"&&(s=y.value),typeof e=="function"&&(typeof y!="undefined"?e(!0,s):e(!0)),!1},h=function(t){return typeof t.preventDefault!="undefined"&&t.preventDefault(),p(t),typeof e=="function"&&e(!1),!1},p=function(e){u.hide(),u.unbind(n.body,"keyup",d),u.unbind(c,"focus",v),i&&u.unbind(g,"submit",a),t&&u.unbind(l,"click",a),r&&u.unbind(f,"click",h)},d=function(e){var t=e.keyCode;t===o.SPACE&&!i&&a(e),t===o.ESC&&r&&h(e)},v=function(e){i?y.focus():r?f.focus():l.focus()},this.bind(c,"focus",v),t&&this.bind(l,"click",a),r&&this.bind(f,"click",h),this.bind(n.body,"keyup",d),i&&this.bind(g,"submit",a),typeof this.transition=="undefined"&&this.setFocus()},bind:function(e,t,n){typeof e.addEventListener=="function"?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},handleErrors:function(){if(typeof e.onerror!="undefined"){var t=this;return e.onerror=function(e,n,r){t.error("["+e+" on line "+r+" of "+n+"]",0)},!0}return!1},appendButtons:function(e,t){return this.buttonReverse?t+e:e+t},build:function(e){var t="",n=e.type,s=e.message,o=e.cssClass||"";t+='<div class="alertify-dialog">',r.buttonFocus==="none"&&(t+='<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'),n==="prompt"&&(t+='<form id="alertify-form">'),t+='<article class="alertify-inner">',t+=i.message.replace("{{message}}",s),n==="prompt"&&(t+=i.input),t+=i.buttons.holder,t+="</article>",n==="prompt"&&(t+="</form>"),t+='<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>',t+="</div>";switch(n){case"confirm":t=t.replace("{{buttons}}",this.appendButtons(i.buttons.cancel,i.buttons.ok)),t=t.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"prompt":t=t.replace("{{buttons}}",this.appendButtons(i.buttons.cancel,i.buttons.submit)),t=t.replace("{{ok}}",this.labels.ok).replace("{{cancel}}",this.labels.cancel);break;case"alert":t=t.replace("{{buttons}}",i.buttons.ok),t=t.replace("{{ok}}",this.labels.ok);break;default:}return v.className="alertify alertify-show alertify-"+n+" "+o,d.className="alertify-cover",t},close:function(e,t){var n=t&&!isNaN(t)?+t:this.delay,r=this,i,s;this.bind(e,"click",function(){i(e)}),s=function(e){e.stopPropagation(),r.unbind(this,r.transition,s),m.removeChild(this),m.hasChildNodes()||(m.className+=" alertify-logs-hidden")},i=function(e){typeof e!="undefined"&&e.parentNode===m&&(typeof r.transition!="undefined"?(r.bind(e,r.transition,s),e.className+=" alertify-log-hide"):(m.removeChild(e),m.hasChildNodes()||(m.className+=" alertify-logs-hidden")))};if(t===0)return;setTimeout(function(){i(e)},n)},dialog:function(e,t,r,i,o){p=n.activeElement;var a=function(){if(v&&v.scrollTop!==null)return;a()};if(typeof e!="string")throw new Error("message must be a string");if(typeof t!="string")throw new Error("type must be a string");if(typeof r!="undefined"&&typeof r!="function")throw new Error("fn must be a function");return typeof this.init=="function"&&(this.init(),a()),u.push({type:t,message:e,callback:r,placeholder:i,cssClass:o}),s||this.setup(),this},extend:function(e){if(typeof e!="string")throw new Error("extend method must have exactly one paramter");return function(t,n){return this.log(t,e,n),this}},hide:function(){var e,t=this;u.splice(0,1),u.length>0?this.setup():(s=!1,e=function(n){n.stopPropagation(),v.className+=" alertify-isHidden",t.unbind(v,t.transition,e)},typeof this.transition!="undefined"?(this.bind(v,this.transition,e),v.className="alertify alertify-hide alertify-hidden"):v.className="alertify alertify-hide alertify-hidden alertify-isHidden",d.className="alertify-cover alertify-cover-hidden",p.focus())},init:function(){n.createElement("nav"),n.createElement("article"),n.createElement("section"),d=n.createElement("div"),d.setAttribute("id","alertify-cover"),d.className="alertify-cover alertify-cover-hidden",n.body.appendChild(d),v=n.createElement("section"),v.setAttribute("id","alertify"),v.className="alertify alertify-hidden",n.body.appendChild(v),m=n.createElement("section"),m.setAttribute("id","alertify-logs"),m.className="alertify-logs alertify-logs-hidden",n.body.appendChild(m),n.body.setAttribute("tabindex","0"),this.transition=b(),delete this.init},log:function(e,t,n){var r=function(){if(m&&m.scrollTop!==null)return;r()};return typeof this.init=="function"&&(this.init(),r()),m.className="alertify-logs",this.notify(e,t,n),this},notify:function(e,t,r){var i=n.createElement("article");i.className="alertify-log"+(typeof t=="string"&&t!==""?" alertify-log-"+t:""),i.innerHTML=e,m.insertBefore(i,m.firstChild),setTimeout(function(){i.className=i.className+" alertify-log-show"},50),this.close(i,r)},set:function(e){var t;if(typeof e!="object"&&e instanceof Array)throw new Error("args must be an object");for(t in e)e.hasOwnProperty(t)&&(this[t]=e[t])},setFocus:function(){y?(y.focus(),y.select()):h.focus()},setup:function(){var e=u[0],n=this,i;s=!0,i=function(e){e.stopPropagation(),n.setFocus(),n.unbind(v,n.transition,i)},typeof this.transition!="undefined"&&this.bind(v,this.transition,i),v.innerHTML=this.build(e),c=a("alertify-resetFocus"),l=a("alertify-ok")||t,f=a("alertify-cancel")||t,h=r.buttonFocus==="cancel"?f:r.buttonFocus==="none"?a("alertify-noneFocus"):l,y=a("alertify-text")||t,g=a("alertify-form")||t,typeof e.placeholder=="string"&&e.placeholder!==""&&(y.value=e.placeholder),this.addListeners(e.callback)},unbind:function(e,t,n){typeof e.removeEventListener=="function"?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)}},{alert:function(e,t,n){return r.dialog(e,"alert",t,"",n),this},confirm:function(e,t,n){return r.dialog(e,"confirm",t,"",n),this},extend:r.extend,init:r.init,log:function(e,t,n){return r.log(e,t,n),this},prompt:function(e,t,n,i){return r.dialog(e,"prompt",t,n,i),this},success:function(e,t){return r.log(e,"success",t),this},error:function(e,t){return r.log(e,"error",t),this},set:function(e){r.set(e)},labels:r.labels,debug:r.handleErrors}},typeof define=="function"?define([],function(){return new r}):typeof e.alertify=="undefined"&&(e.alertify=new r)})(this);;
(function(a,b){"use strict";var c=a.document,d;var e=function(a,e,f){var g=this,i,j,k,l,m,n,o={updated:[]};this.listContainer=typeof a=="string"?c.getElementById(a):a;if(!this.listContainer)return;this.items=[];this.visibleItems=[];this.matchingItems=[];this.searched=false;this.filtered=false;this.list=null;this.templateEngines={};this.page=e.page||200;this.i=e.i||1;j={start:function(a,b){b.plugins=b.plugins||{};this.classes(b);i=new m(g,b);this.callbacks(b);this.items.start(a,b);g.update();this.plugins(b.plugins)},classes:function(a){a.listClass=a.listClass||"list";a.searchClass=a.searchClass||"search";a.sortClass=a.sortClass||"sort"},callbacks:function(a){g.list=d.getByClass(a.listClass,g.listContainer,true);d.addEvent(d.getByClass(a.searchClass,g.listContainer),"keyup",g.search);n=d.getByClass(a.sortClass,g.listContainer);d.addEvent(n,"click",g.sort)},items:{start:function(a,c){if(c.valueNames){var d=this.get(),e=c.valueNames;if(c.indexAsync){this.indexAsync(d,e)}else{this.index(d,e)}}if(a!==b){g.add(a)}},get:function(){var a=g.list.childNodes,c=[];for(var d=0,e=a.length;d<e;d++){if(a[d].data===b){c.push(a[d])}}return c},index:function(a,b){for(var c=0,d=a.length;c<d;c++){g.items.push(new l(b,a[c]))}},indexAsync:function(a,b){var c=a.splice(0,100);this.index(c,b);if(a.length>0){setTimeout(function(){j.items.indexAsync(a,b)},10)}else{g.update()}}},plugins:function(a){var b={templater:i,init:j,initialItems:k,Item:l,Templater:m,sortButtons:n,events:o,reset:r};for(var c=0;c<a.length;c++){a[c][1]=a[c][1]||{};var d=a[c][1].name||a[c][0];g[d]=g.plugins[a[c][0]].call(g,b,a[c][1])}}};this.add=function(a,c){if(c){p(a,c)}var d=[],e=false;if(a[0]===b){a=[a]}for(var f=0,h=a.length;f<h;f++){var i=null;if(a[f]instanceof l){i=a[f];i.reload()}else{e=g.items.length>g.page?true:false;i=new l(a[f],b,e)}g.items.push(i);d.push(i)}g.update();return d};var p=function(a,b,c){var d=a.splice(0,100);c=c||[];c=c.concat(g.add(d));if(a.length>0){setTimeout(function(){p(a,b,c)},10)}else{g.update();b(c)}};this.show=function(a,b){this.i=a;this.page=b;g.update()};this.remove=function(a,b,c){var d=0;for(var e=0,f=g.items.length;e<f;e++){if(g.items[e].values()[a]==b){i.remove(g.items[e],c);g.items.splice(e,1);f--;d++}}g.update();return d};this.get=function(a,b){var c=[];for(var d=0,e=g.items.length;d<e;d++){var f=g.items[d];if(f.values()[a]==b){c.push(f)}}if(c.length==0){return null}else if(c.length==1){return c[0]}else{return c}};this.sort=function(a,c){var e=g.items.length,f=null,i=a.target||a.srcElement,j="",k=false,l="asc",m="desc",c=c||{};if(i===b){f=a;k=c.asc||false}else{f=d.getAttribute(i,"data-sort");k=d.hasClass(i,l)?false:true}for(var o=0,p=n.length;o<p;o++){d.removeClass(n[o],l);d.removeClass(n[o],m)}if(k){if(i!==b){d.addClass(i,l)}k=true}else{if(i!==b){d.addClass(i,m)}k=false}if(c.sortFunction){c.sortFunction=c.sortFunction}else{c.sortFunction=function(a,b){return d.sorter.alphanum(a.values()[f].toLowerCase(),b.values()[f].toLowerCase(),k)}}g.items.sort(c.sortFunction);g.update()};this.search=function(a,c){g.i=1;var d=[],e,f,h,j,k,c=c===b?g.items[0].values():c,a=a===b?"":a,l=a.target||a.srcElement;a=l===b?(""+a).toLowerCase():""+l.value.toLowerCase();k=g.items;a=a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");i.clear();if(a===""){r.search();g.searched=false;g.update()}else{g.searched=true;for(var m=0,n=k.length;m<n;m++){e=false;f=k[m];j=f.values();for(var o in c){if(j.hasOwnProperty(o)&&c[o]!==null){h=j[o]!=null?j[o].toString().toLowerCase():"";if(a!==""&&h.search(a)>-1){e=true}}}if(e){f.found=true;d.push(f)}else{f.found=false}}g.update()}return g.visibleItems};this.filter=function(a){g.i=1;r.filter();if(a===b){g.filtered=false}else{g.filtered=true;var c=g.items;for(var d=0,e=c.length;d<e;d++){var f=c[d];if(a(f)){f.filtered=true}else{f.filtered=false}}}g.update();return g.visibleItems};this.size=function(){return g.items.length};this.clear=function(){i.clear();g.items=[]};this.on=function(a,b){o[a].push(b)};var q=function(a){var b=o[a].length;while(b--){o[a][b]()}};var r={filter:function(){var a=g.items,b=a.length;while(b--){a[b].filtered=false}},search:function(){var a=g.items,b=a.length;while(b--){a[b].found=false}}};this.update=function(){var a=g.items,b=a.length;g.visibleItems=[];g.matchingItems=[];i.clear();for(var c=0;c<b;c++){if(a[c].matching()&&g.matchingItems.length+1>=g.i&&g.visibleItems.length<g.page){a[c].show();g.visibleItems.push(a[c]);g.matchingItems.push(a[c])}else if(a[c].matching()){g.matchingItems.push(a[c]);a[c].hide()}else{a[c].hide()}}q("updated")};l=function(a,c,d){var e=this,f={};this.found=false;this.filtered=false;var h=function(a,c,d){if(c===b){if(d){e.values(a,d)}else{e.values(a)}}else{e.elm=c;var f=i.get(e,a);e.values(f)}};this.values=function(a,c){if(a!==b){for(var d in a){f[d]=a[d]}if(c!==true){i.set(e,e.values())}}else{return f}};this.show=function(){i.show(e)};this.hide=function(){i.hide(e)};this.matching=function(){return g.filtered&&g.searched&&e.found&&e.filtered||g.filtered&&!g.searched&&e.filtered||!g.filtered&&g.searched&&e.found||!g.filtered&&!g.searched};this.visible=function(){return e.elm.parentNode?true:false};h(a,c,d)};m=function(a,c){if(c.engine===b){c.engine="standard"}else{c.engine=c.engine.toLowerCase()}return new g.constructor.prototype.templateEngines[c.engine](a,c)};j.start(f,e)};e.prototype.templateEngines={};e.prototype.plugins={};e.prototype.templateEngines.standard=function(a,e){function j(a){if(a===b){var d=f.childNodes,g=[];for(var h=0,i=d.length;h<i;h++){if(d[h].data===b){return d[h]}}return null}else if(a.indexOf("<")!==-1){var j=c.createElement("div");j.innerHTML=a;return j.firstChild}else{return c.getElementById(e.item)}}var f=d.getByClass(e.listClass,a.listContainer,true),g=j(e.item),i=this;var k={created:function(a){if(a.elm===b){i.create(a)}}};this.get=function(a,b){k.created(a);var c={};for(var e=0,f=b.length;e<f;e++){var g=d.getByClass(b[e],a.elm,true);c[b[e]]=g?g.innerHTML:""}return c};this.set=function(a,b){k.created(a);for(var c in b){if(b.hasOwnProperty(c)){var e=d.getByClass(c,a.elm,true);if(e){e.innerHTML=b[c]}}}};this.create=function(a){if(a.elm!==b){return}var c=g.cloneNode(true);c.id="";a.elm=c;i.set(a,a.values())};this.remove=function(a){f.removeChild(a.elm)};this.show=function(a){k.created(a);f.appendChild(a.elm)};this.hide=function(a){if(a.elm!==b&&a.elm.parentNode===f){f.removeChild(a.elm)}};this.clear=function(){if(f.hasChildNodes()){while(f.childNodes.length>=1){f.removeChild(f.firstChild)}}}};d={getByClass:function(){if(c.getElementsByClassName){return function(a,b,c){if(c){return b.getElementsByClassName(a)[0]}else{return b.getElementsByClassName(a)}}}else{return function(a,b,d){var e=[],f="*";if(b==null){b=c}var g=b.getElementsByTagName(f);var h=g.length;var i=new RegExp("(^|\\s)"+a+"(\\s|$)");for(var j=0,k=0;j<h;j++){if(i.test(g[j].className)){if(d){return g[j]}else{e[k]=g[j];k++}}}return e}}}(),addEvent:function(a,c){if(c.addEventListener){return function(c,e,f){if(c&&!(c instanceof Array)&&!c.length&&!d.isNodeList(c)&&c.length!==0||c===a){c.addEventListener(e,f,false)}else if(c&&c[0]!==b){var g=c.length;for(var i=0;i<g;i++){d.addEvent(c[i],e,f)}}}}else if(c.attachEvent){return function(c,e,f){if(c&&!(c instanceof Array)&&!c.length&&!d.isNodeList(c)&&c.length!==0||c===a){c.attachEvent("on"+e,function(){return f.call(c,a.event)})}else if(c&&c[0]!==b){var g=c.length;for(var i=0;i<g;i++){d.addEvent(c[i],e,f)}}}}}(this,c),getAttribute:function(a,c){var d=a.getAttribute&&a.getAttribute(c)||null;if(!d){var e=a.attributes;var f=e.length;for(var g=0;g<f;g++){if(c[g]!==b){if(c[g].nodeName===c){d=c[g].nodeValue}}}}return d},isNodeList:function(a){var b=Object.prototype.toString.call(a);if(typeof a==="object"&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(b)&&(a.length==0||typeof a[0]==="object"&&a[0].nodeType>0)){return true}return false},hasClass:function(a,b){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className")||"";return c.search(b)>-1},addClass:function(a,b){if(!this.hasClass(a,b)){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className")||"";c=c+" "+b+" ";c=c.replace(/\s{2,}/g," ");a.setAttribute("class",c)}},removeClass:function(a,b){if(this.hasClass(a,b)){var c=this.getAttribute(a,"class")||this.getAttribute(a,"className")||"";c=c.replace(b,"");a.setAttribute("class",c)}},sorter:{alphanum:function(a,c,d){if(a===b||a===null){a=""}if(c===b||c===null){c=""}a=a.toString().replace(/&(lt|gt);/g,function(a,b){return b=="lt"?"<":">"});a=a.replace(/<\/?[^>]+(>|$)/g,"");c=c.toString().replace(/&(lt|gt);/g,function(a,b){return b=="lt"?"<":">"});c=c.replace(/<\/?[^>]+(>|$)/g,"");var e=this.chunkify(a);var f=this.chunkify(c);for(var g=0;e[g]&&f[g];g++){if(e[g]!==f[g]){var h=Number(e[g]),i=Number(f[g]);if(d){if(h==e[g]&&i==f[g]){return h-i}else{return e[g]>f[g]?1:-1}}else{if(h==e[g]&&i==f[g]){return i-h}else{return e[g]>f[g]?-1:1}}}}return e.length-f.length},chunkify:function(a){var b=[],c=0,d=-1,e=0,f,g;while(f=(g=a.charAt(c++)).charCodeAt(0)){var h=f==45||f==46||f>=48&&f<=57;if(h!==e){b[++d]="";e=h}b[d]+=g}return b}}};a.List=e;a.ListJsHelpers=d})(window);
//#######################################################
// This is the javascript for the fund prices page only.
// This js file should not be included anywhere else.
//var fundsProfile = '55'; // default
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var currentFundGroupID,currentFundGroupNames,allProductTables=[];
var fundGroupNamesLimits,fundsGroupUpperLimits=[];
var jsonData = "";
var fundsProfile="0";
var productGroup="";
var thePriceDate = "";
var defaultBar = true;
var
	a = alertify,
	l = a.log;

// get the specific funds for the site - set in the html on the page	
var fundGroupMain;
// get the product groupings for this site
//var retailFundGroupID = (typeof fundsGroup === 'undefined') ? ['4','2','3','1','5','6'] : fundsGroup;
// Get the upper limits set for seperating funds into groups
// var fundsGroupUpperLimits = ['10','60','80','100'];
var retailFundGroupUpperLimits;
var retailFundGroupNamesLimits;
// get the product groupings ID for this site, for use calling json feed
var productGroupsId;
// The fund group ID's for the default product groups
// var retailFundGroupID = ['4','2','3','1','5','6'];
// var blineFundGroupID = ['1','2','3','4'];
var retailFundGroupNames;
var productGroupNames;

// The array of funds stored in the cookie and the url hash
var fundsStoredArray = [''];
// The array of funds stored in the cookie for charts
var fundsChartStoredArray = [];
// The array of funds stored in session for the product only
var tempFundsForURL = []; // fundsChartProductArray
// The current array of funds checked by user in this session
var fundsChartSessionArray = [];
var fundsChartSingleArray = [];

//////////////////////////////////////////////////////////////////////
// Define the table for the list and sorting options
var isCanada;
var contactList = [];
var productFundList;

// set up the required tables as defined by Group ID and Group Name
(function($){
	
// ON DOCUMENT READY
$(document).ready(function(){
    $( "#tabs" ).tabs();
	clearCharted();
	


});

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
// update the URL with the Hashes that the
// user has saved
updateURLHash = function(cookieName,hashes,updateURL){

	var hashArr = hashes; // passed array
	var newCookieHash = "#";
	
	for (i=0;i<hashes.length;i++){	
		if (hashArr[i] != 'chartscreentrue')
		{	
			newCookieHash += hashArr[i]+"&";
		}
	}
	
	if (updateURL)
	{
		if(cookieName=="chtFundsStoredILFS"){
			location.hash = newCookieHash+"chartscreentrue"; // set the new url
		}
		else
		{
			location.hash = newCookieHash; // set the new url
		}
	}
	$.cookie(cookieName, newCookieHash );
}



loadFundsFromURLandCookie = function(type){

	// check the URL for hashes and use the
	// info to set up the favourites
	var urlFavs = [],fundsStoredArraySort;
	if(window.location.hash) {
	  urlFavs = window.location.hash.split('#')[1].split("&");
	}
	
	if (type=="fav")
	{
		// Cookie overrides the favourites from URL
		if ($.cookie('favFundsStoredILFS') !=null)
		{ // if there is a cookie
			var cookieHash = $.cookie('favFundsStoredILFS')
			var favFundsStored = cookieHash.replace('#','').split("&");
			fundsStoredArraySort = jQuery.grep(favFundsStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
			});
		}
		else
		{
			$.cookie('favFundsStoredILFS','');
			fundsStoredArraySort = urlFavs;
		}
	}
	else if (type=="cht")
	{
		// ####################################
		// If the URL has 'chartscreentrue' then the funds passed in override
		// the funds from the chart cookie
		// ####################################
		if ($.inArray('chartscreentrue', urlFavs)>=1)
		{
			$.cookie('chtFundsStoredILFS','');
			fundsStoredArraySort = urlFavs;
		}
		else
		{
			if ($.cookie('chtFundsStoredILFS') !=null)
			{ //
				var cookieHash = $.cookie('chtFundsStoredILFS');
				var chtFundsStored = cookieHash.replace('#','').split("&");
				
				fundsStoredArraySort = jQuery.grep(chtFundsStored, function(value) {
						return (value !== "" && value != null); // remove empty vals
				});
			}
			else{
				$.cookie('chtFundsStoredILFS','');
				fundsStoredArraySort = urlFavs;
			}
		}
		
		$.cookie('chtFundsStoredILFS',fundsStoredArraySort);

	}
	else if (type=="prd")
	{
	// Cookie overrides the favourites from URL
		if ($.cookie('chtFundsPrdStoredILFS') !=null)
		{ // if there is a cookie
			var cookieHash = $.cookie('chtFundsPrdStoredILFS')
			var chtFundsStored = cookieHash.replace('#','').split("&");
			fundsStoredArraySort = jQuery.grep(chtFundsStored, function(value) {
					return (value !== "" && value != null); // remove empty vals
			});
		}
		else
		{
			$.cookie('chtFundsPrdStoredILFS','');
			fundsStoredArraySort = urlFavs;
		}
	}
	return fundsStoredArraySort;
}

// Called by the table header when the user scrolls so the header
// floats with the scrolling
function UpdateTableHeaders() {

   $(".persist-area,.persist-area-product").each(function() {
   
       var el             = $(this),
           offset         = el.offset(),
           scrollTop      = $(window).scrollTop(),
           floatingHeader = $(".floatingHeader", this)
       
       if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
           floatingHeader.css({
            "visibility": "visible"
           });
       } else {
           floatingHeader.css({
            "visibility": "hidden"
           });      
       };
   });
}

// Show the chart of the selected funds 
// on the screen.
showChartScreen = function(type){

	$('#fundsChartBody').show();
	
	 $('html, body').animate({
        scrollTop: $("#fundsChartBody").offset().top
    }, 1000);
	// set the url hash
	//
	$('#fundsChartBody').html("<div class=\"chart-head\">Funds Comparison<i onclick=\"hideChart();\" class=\"material-icons hideChart hideChartClose\" style=\"display: block;\">close</i></div><div id=\"fundsChartChart\"></div>");
	getChartDataAgain();
	updateURLHash('chtFundsStoredILFS',fundsChartStoredArray,true); // set the url
	
	//show the other tds and hide the chart btns
	$('.charted, .hideCharted').hide();
	$('.whenCharted').show();
	$('.name a').css('pointer-events','none');
	
	$('#backToFundsBar').show();
	

}

/*
find the fund id in the data json
populate the divs in the html
show the div
hide the funds table

*/
showFundScreen = function(fundId,name) {
	//console.log("FundID "+fundId);
	//console.log("name "+name);
	if($('#compareFundsBar').css('display','block') || $('#compareProductsBar').css('display','block') ) {
		$('#compareFundsBar').hide();
		$('#compareProductsBar').hide();
	}
	
	$('#fundScreenBody').show();
	$('#fund-centre-app').hide();
	$('#fundsChartBody').hide();
	$('html, body').animate({
        scrollTop: $("#fundScreenBody").offset().top
    }, 1000);
				
	data = allProductTables[0];
	//fundContent = "";
	//console.log("data "+data);
	var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	
	if(dd<10){
			dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
		
	var currentDate = dd+'/'+mm+'/'+yyyy;
		
	var currentTime = today.toTimeString();
	currentTime = currentTime.split(' ')[0];
		
	var dateTime = currentDate + " " + currentTime;
	var token = "d5a5b6f3-5097-4a64-85e1-6d5e6bcace24";
	
	var fundName;
	var fundId = fundId;
	//console.log(fundId);
	var performanceData=[];
	var performanceCategories = [];
	
	  $.each(data, function(key, val) {
			thePriceDate = val.PriceDate;
			
			if (fundId == val.FundId)
			{
				var riskClass = 'circle-risk rated-'+val.FundRiskRating+'';
				$('#fundScreenBody #fundRisk').addClass(riskClass);
				$("#fundScreenBody #fundRisk").html('IL-'+val.FundRiskRating);
				$("#fundScreenBody #price").html(val.CurrentPrice);
				$("#fundScreenBody #date").html(val.PriceDate);
				$('#fundScreenBody #factsheet').attr('href',val.FundFactsheet);
				$("#fundScreenBody #fundName").html("<span id=\"theName\">"+val.FundName+"</span><i onclick=\"hideFund();\" class=\"material-icons hideChartClose\" style=\"display: block;\">close</i>");
				$('#fundScreenBody #lastMonth').html(val.OneMonthGrowthPercent);
				$('#fundScreenBody #sixMonth').html(val.SixMonthGrowthPercent);
				$('#fundScreenBody #1year').html(val.OneYearGrowthPercent);
				$('#fundScreenBody #3years').html(val.ThreeYearGrowthPercent);
				//$('#fundScreenBody #3yearsAnn').html(val.last3YearsAnn);
				//$('#fundScreenBody #5yearsAnn').html(vale.last5yearsAnn);
				$('#fundScreenBody #sinceLaunch').html(val.SinceLaunchPercent);
				
				if($('#theName').html() == "Protected Consensus Markets") {
					$( ".addFundGuide" ).after("<div class=\"row-item fundGuide\"><div class=\"col-lg-2 col-md-2 col-sm-2 col-xs-2\"><img src=\"https://apps.irishlife.ie/myonlineservices/Content/images/icons/pdf_icon_grey.png\" style=\"width: 48px; height: 48px\"></div><div class=\"col-lg-10 col-md-10 col-sm-10 col-xs-10 \"><span style='font-size:11px;'><span style=\"display:none\">Protected Price Pledge: &euro;"+vale.protPrPl+"<br/>Exposure to Consensus Markets Fund: "+vale.expsConsMktFnd+"</span><a href=\"https://www.irishlife.ie/sites/retail/files/platform-factsheets/Retail-Factsheets/pcmf-fund-guide.pdf\" target=\"_blank\">Protected Consensus Markets Fund Guide</a></span></div></div>");
				}
				else {
					$('.fundGuide').hide();
				}
				
				fundName = val.FundName;
					
			}
				
	        });	
	
	$('#fundScreenBody').show();
	$.ajax({
					type:'POST',
					url:"https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundPerformanceCharts?fundId="+fundId, //SINGLE FUND INFO AJAX CALL
					success: function(response) {
						fundChartDataCollected = response;
						//console.log(fundChartDataCollected);
						barChartData = JSON.parse("[" + fundChartDataCollected.BarChart.Data + "]");
					    barChartLabels = JSON.parse("[" + fundChartDataCollected.BarChart.Labels + "]");
						lineChartData = JSON.parse(fundChartDataCollected.LineChart.Data);
						//console.log('Bar chart data = ' + barChartData + ' ' +  typeof barChartData);
						//console.log('Line chart data = ' + lineChartData + ' ' + typeof lineChartData);
						
						 initFundPerformanceChart('fundPerfChart', fundName, barChartData, barChartLabels);	
                         drawSingleChart(fundName);	
					    /* for (x=0;x < vale.calPerf.length;x++)
					    {
						
						var obj=vale.calPerf[x];
						var strPerf=JSON.stringify(obj);
						strPerf=strPerf.replace('{', '');
						strPerf=strPerf.replace('}','');
						strPerf=strPerf.replaceAll('"','');
						strPerfArr=strPerf.split(':');
						
						performanceData.push(parseFloat(strPerfArr[1]));
						performanceCategories.push(strPerfArr[0]);

					    } */				
					},
					error: function(data){
						a.log("Error loading chart. Refresh or try later.")	
						//console.log(data);
					 },
	            });
				
	
}

var fundChartDataCollected = [ ]; 

function initFundPerformanceChart(id, fundName, performanceData, performanceCategories) 
{
	////console.log(performanceData);
    Highcharts.chart(id, {
            chart: {
                type: 'column',
                height: '300'
            },
            title: {
                text: null,
                visible:false
            },
            xAxis: {
                title: {
                    text: 'TIMEFRAME'
                },
                categories: performanceCategories,
                plotLines: [{
                    color: 'rgba(176,176,176, 1.0)',
                    width: 3,
                    value: '-0.5'
                }]
            },
            yAxis:
            {
                title: {
                    text: 'PERFORMANCE'
                },
                gridLineColor: 'transparent',
                labels: {
                    formatter: function () {
                        return this.value  + '%';
						
                    }                    
                },
                plotLines: [{
                    color: 'rgba(176,176,176, 1.0)',
                    width: 3,
                    value: 0
                }]
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    color: 'rgba(80,201,181, 1.0)',
                    negativeColor: 'rgba(245,67,89, 1.0)'
                }
            },
				    rangeSelector: {
	    	buttonTheme: { // styles for the buttons
	    		fill: 'none',
	    		stroke: 'none',
	    		'stroke-width': 0,
	    		r: 2,
	    		style: {
	    			color: '#FFFFF',
	    			fontWeight: 'normal'
	    		},
	    	},
	    	inputStyle: {
	    		color: '#435399',
	    		fontWeight: 'bold'
	    	},
	    	labelStyle: {
	    		color: '4d4e53',
	    		fontWeight: 'bold'
	    	},
	    	selected: 5
	    },
            series: [{
                name: fundName,
                data: performanceData,
                showInLegend: false
            }]
        });
}


/* function initFundPerformanceChart(n, t, i, r) {
    $('#fundPerfChart').highcharts( {
    colors: ['#2196f3', '#50C9B5', '#5cc151', '#cc092f', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4'],
		
    chart: {
			type: "column",
			style: {
				width:'100%'
			}
    },
	title:{
        text:''
    },
    xAxis: {
        categories: r,
		title: {
            text: 'TIMEFRAME'
            //align: 'center'
        }
	},
	yAxis: {
		title: {
            text: 'PERFORMANCE'
            //align: 'center'
        }
	},
   legend: {
        enabled: false
    },

    credits: {
        enabled: false
    },
    series: [{
        data: [15.2,5.46,2.87,4.01,2.15]
    }]
});
}
*/

function initStockChart(id, seriesName, seriesOptions)
{   
    Highcharts.stockChart(id, {
        chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            width: null,
            gridLineColor: '#FFFFFF',
            height: '300'
        },
        rangeSelector: {
            enabled: true,
            selected: 0,
            buttonTheme: { // styles for the buttons
                fill: 'none',
                stroke: 'none',
                'stroke-width': 0,
                r: 8,
                style: {
                    color: '#FFFFFF',
                    fontWeight: 'bold'
                },
                states: {
                    hover: {
                    },
                    select: {
                        fill: '#039',
                        style: {
                            color: '#FFFFFF'
                        }
                    }
                }
            },
            inputEnabled: false,
            inputBoxBorderColor: '#FFFFFF',
            inputBoxWidth: 120,
            inputBoxHeight: 18,
            inputStyle: {
                color: '#FFFFFF',
                fontWeight: 'bold'
            },
            labelStyle: {
                color: '#FFFFFF',
                fontWeight: 'bold'
            }
        },
		
        tooltip: {
					formatter: function () {
						var s = '<span style="font-size: 80%;"> ' + Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ' </span>';

						$.each(this.points, function () {
							 s += '<br/><b><span style="color:#299df6;font-size: 150%;">•<span></b>' +this.series.name + ':<b>' + this.y.toLocaleString('en-IE',{minimumFractionDigits: 2, maximumFractionDigits: 5}) + '</b>' ;
						});

						return s;
					}
				},
			xAxis: {
				labels: {
					enabled: false
				},
				visible: false
			},
			yAxis: { 
				labels: {
					enabled: false
				},
				gridLineColor: 'transparent'
			},
			scrollbar: {
				enabled: false
			},
			navigator: {
				enabled: true,
				outlineColor: '#FFFFFF',
				series: {
					type: 'areaspline',
					color: '#FFFFFF',
					fillOpacity: 0.15,
					dataGrouping: {
						smoothed: true
					},
					lineWidth: 1,
					marker: {
						enabled: false
					}
				},
				xAxis: {
					labels: {
						style: {color: '#FFFFFF'}
					}
				}                
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				line: {                      
					lineColor: '#fff',
					lineWidth: 1,
					marker: {
						enabled: true,
						symbol: 'circle',
						radius: 3,
						states: {
							hover: {
								enabled: true
							}
						},
						fillColor: '#fff'
					}              
				}
			}
    });
}


drawSingleChart = function(fundName){

		//console.log('drawing single chart');
		//console.log(lineChartData + ' ' + typeof lineChartData);
		$('#fundGrowth').highcharts('StockChart', {
		    
			 chart: {
            backgroundColor: 'rgba(255, 255, 255, 0.0)',
            width: null,
            gridLineColor: '#FFFFFF',
            height: '300'
        },
        rangeSelector: {
            enabled: true,
            selected: 0,
            buttonTheme: { // styles for the buttons
                fill: 'none',
                stroke: 'none',
                'stroke-width': 0,
                r: 8,
                style: {
                    color: '#FFFFFF',
                    fontWeight: 'bold'
                },
                states: {
                    hover: {
                    },
                    select: {
                        fill: '#039',
                        style: {
                            color: '#FFFFFF'
                        }
                    }
                }
            },
            inputEnabled: false,
            inputBoxBorderColor: '#FFFFFF',
            inputBoxWidth: 120,
            inputBoxHeight: 18,
            inputStyle: {
                color: '#FFFFFF',
                fontWeight: 'bold'
            },
            labelStyle: {
                color: '#FFFFFF',
                fontWeight: 'bold'
            }
        },
		
        tooltip: {
					formatter: function () {
						var s = '<span style="font-size: 80%;"> ' + Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ' </span>';

						$.each(this.points, function () {
							 s += '<br/><b><span style="color:#299df6;font-size: 150%;">•<span></b>' + fundName + ':<b>' + this.y.toLocaleString('en-IE',{minimumFractionDigits: 2, maximumFractionDigits: 5}) + '</b>' ;
						});

						return s;
					}
				},
			xAxis: {
				labels: {
					enabled: false
				},
				visible: false
			},
			yAxis: { 
				labels: {
					enabled: false
				},
				gridLineColor: 'transparent'
			},
			scrollbar: {
				enabled: false
			},
			navigator: {
				enabled: true,
				outlineColor: '#FFFFFF',
				series: {
					type: 'areaspline',
					color: '#FFFFFF',
					fillOpacity: 0.15,
					dataGrouping: {
						smoothed: true
					},
					lineWidth: 1,
					marker: {
						enabled: false
					}
				},
				xAxis: {
					labels: {
						style: {color: '#FFFFFF'}
					}
				}                
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				line: {                      
					lineColor: '#fff',
					lineWidth: 1,
					marker: {
						enabled: true,
						symbol: 'circle',
						radius: 3,
						states: {
							hover: {
								enabled: true
							}
						},
						fillColor: '#fff'
					}              
				}
			},
		    series: [{
                name: fundName,
				//turboThreshold:100000,
                data: lineChartData,
                showInLegend: false
            }]
		});
		
}

drawChart = function(){

		$('#fundsChartChart').highcharts('StockChart', {
		    
		//colors: [ "#299DF6", "#7BFEF3", "#FEF97B", "#81FD84", "#9D75F0"],
	            chart: {
                backgroundColor: '#292D52',                            
                width: null,                
                height: '300'
            },
   chart: {
			marginRight: 20,
			borderRadius: 0, 
			borderWidth: 3,
			height:500,
			borderColor: "#dddddd",
			style: {
			fontFamily: 'Arial, sans-serif',
			fontSize: '12px',
			},
			backgroundColor: {
				 linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				 stops: [
					[0, 'rgb(265, 265, 265)'],
					[1, 'rgb(240, 240, 240)']
				 ]
			  }
		    },

	    rangeSelector: {
	    	buttonTheme: { // styles for the buttons
	    		fill: 'none',
	    		stroke: 'none',
	    		'stroke-width': 0,
	    		r: 2,
	    		style: {
	    			color: '#435399',
	    			fontWeight: 'normal'
	    		},
	    		states: {
	    			hover: {
						fill: '#F4AA00',
	    				style: {
	    					color: 'white'
	    				}
	    			},
	    			select: {
	    				fill: '#435399',
	    				style: {
	    					color: 'white'
	    				}
	    			}
	    		}
	    	},
	    	inputStyle: {
	    		color: '#435399',
	    		fontWeight: 'bold'
	    	},
	    	labelStyle: {
	    		color: '4d4e53',
	    		fontWeight: 'bold'
	    	},
	    	selected: 5
	    },

		    yAxis: {
				title: {
					text: 'Percentage %'
				},
		    	labels: {
		    		formatter: function() {
		    			return (this.value > 0 ? '+' : '') + this.value + '%';
		    		}
		    	},
		    	plotLines: [{
		    		value: 0,
		    		width: 4,
		    		color: 'silver'
		    	}]
		    },
            yAxis: {
                labels: {
                    //enabled: false
                },
                gridLineColor: 'transparent'
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false,
                outlineColor: '#FFFFFF',
                series: {
                    type: 'areaspline',
                    
                    fillOpacity: 0.15,
                    dataGrouping: {
                        smoothed: true
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    }
                },
                xAxis: {
                    labels: {
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                line: {                    
                    lineWidth: 1,
                    marker: {
                        enabled: false,                        
                    }
                }
            },
		    series: fundChartDataCollected
		});
		
}

/* //////////////////////////////////////// NEW CHART DESIGN 
drawChart = function(){

		$('#fundsChartChart').highcharts('StockChart', {
		    
		colors: [ "#299DF6", "#7BFEF3", "#FEF97B", "#81FD84", "#9D75F0"],
	            chart: {
                backgroundColor: '#292D52',                            
                width: null,                
                height: '300'
            },
            rangeSelector: {
                enabled: true,
                selected: 4,
                buttonTheme: { // styles for the buttons
                    fill: 'none',
                    stroke: 'none',
                    'stroke-width': 0,
                    r: 8,
                    style: {
                        color: '#FFFFFF',
                        fontWeight: 'bold'
                    },
                    states: {
                        hover: {
                        },
                        select: {
                            fill: '#FFFFFF',
                            style: {
                                //color: '#FFFFFF'
                            }
                        }
                    }
                },
                //inputEnabled: false,
                inputBoxBorderColor: '#FFFFFF',
                inputBoxWidth: 120,
                inputBoxHeight: 18,
                inputStyle: {
                    color: '#FFFFFF',
                    fontWeight: 'bold'
                },
                labelStyle: {
                    color: '#FFFFFF',
                    fontWeight: 'bold'
                }
            },
            xAxis: {
                labels: {
                    enabled: false
                },                
                visible: false
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                gridLineColor: 'transparent'
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: true,
                outlineColor: '#FFFFFF',
                series: {
                    type: 'areaspline',
                    
                    fillOpacity: 0.15,
                    dataGrouping: {
                        smoothed: true
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    }
                },
                xAxis: {
                    labels: {
                        style: { color: '#FFFFFF' }
                    }
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                line: {                    
                    lineWidth: 1,
                    marker: {
                        enabled: false,                        
                    }
                }
            },
		    series: fundChartDataCollected
		});
		
}
*/

var totalFundsSelected = 0;

setDataCounter = function(){
	totalFundsSelected++;
}
resetDataCounter = function(){
	totalFundsSelected=0;
}

getDataCounter = function(){
	return totalFundsSelected;
}
getChartDataAgain = function(whichChart){
	$('.hideChartClose').hide();
	resetDataCounter(); 
	// var fundsSelected = fundsChartStoredArray;
	var fundsSelected;
	var fundString = '';
	if(whichChart=="single"){
		fundsSelected = fundsChartSingleArray;
		
	}else{
		fundsSelected = fundsChartSessionArray;
	}
	////console.log("getChartDataAgain "+fundsSelected);
	var fundPricesTotal = 0;
	fundChartDataCollected = []; 
	
	$.each(fundsSelected, function(z, fund) {
		var fundId = fund.split(';')[0];
		fundString += fundId + ',';
	});
	
	$('#fundsChartChart').html("<h2>LOADING...</h2><div class=\"progress supplementary\"><span class=\"meter\" style=\"width:0%\"></span></div>");
	$.ajax({
	    type: 'POST', 
		url: 'https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundComparisonChart?fundIds='+fundString.slice(0, -1), //COMPARE AJAX CALL CHANGE TO IRISHLIFE.IE WHEN GOING LIVE
		success: function (data, textStatus, jqXHRORerrorThrown) {
			    $.each(data, function(index, chartData) {
					
					var fundName;
					
					$.each(fundsSelected, function(z, fund) {
						var fundId = fund.split(';')[0];
						if(fundId == chartData.FundId) {
							fundName = fund.split(';')[1];
						}
	           });
				fundChartDataCollected[index] = {
					name: fundName,
					data: JSON.parse(chartData.Data)
				};
				});

				drawChart();			
				$('#fundsTableBody').show();
				$('.hideChartClose').show();
				},
		error: function(error,status){
			                  a.error("error, try again later")
		                      //console.log(error);
		        }
		}); 
};


//var starredHTML;
setSortList = function(type){
	// type = 0 - for default list of funds
	// type = 1 - for product groups of 
	var options;
	if (type=="1"){
		options = {
			valueNames: [ 'id', 'charted', 'name', 'price','1mth', '3mth', 
			'6mth', '12mth', '3yrs', '5yrs', '10yrs', '3yrsAnn', '5yrsAnn', '10yrsAnn', 'fromlaunch' ]
		};
		
		for (i=0;i<productGroupNames.length; i++){
			contactList[i] = new List("productGroup"+i, options);
		}
		// contactList[0] = new List("productGroup"+currentFundGroupID[0], options);
	}
	else if (type=="0"){
		options = {
			valueNames: [ 'id', 'starred', 'charted', 'risk', 'name', 'fund charge', 'price','1mth', '3mth', 
			'6mth', '12mth', '3yrs', '5yrs', '10yrs', '3yrsAnn', '5yrsAnn', '10yrsAnn', 'fromlaunch' ]
		};
		for (i=0;i<retailFundGroupUpperLimits.length; i++){
			contactList[i] = new List("fundsGroup"+i, options);
		}
	
	}

	

}


pullDownOverallFundData = function(){


	fundsChartSessionArray = [];
	
	if ((typeof allProductTables[0] !== 'undefined') ){
		// no need to make ajax call as we have table stored
		//currentFundGroupID = retailFundGroupID;
		currentFundGroupNames = retailFundGroupNames;
		setDefaultFunds(allProductTables[0],false);
	}
	else
	{
	$.ajax({
		type:'POST',
		url:"https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundsPerformanceIL?fundGroupId="+fundGroupMain, //OVERALL AJAX CALL CHANGE TO IRISHLIFE.IE WHEN GOING LIVE
		success:function(response) {
		console.log(response)
        var myJSON = response;
		currentFundGroupNames = retailFundGroupNames;
       
		setDefaultFunds(myJSON,false);
		allProductTables[0]=myJSON;
        },
        error: function(data){
			a.log("Error loading all funds. Refresh or try later.")	
			//console.log(data);
		}
	});
	}
	
}


selectFundGroup = function(orderNum){
var currentFundGroup=0;
	for(i=0;i<retailFundGroupUpperLimits.length; i++){
	var limitNum = parseInt(retailFundGroupUpperLimits[i]);
		if(orderNum <= limitNum)
		{
			currentFundGroup = i;
			break;
		}
	}
	return currentFundGroup;
}


//##############################################################
// This function is for setting up the funds for the default page
// rather than products page. The data is passed in and the headers
// and button events are set up specifically for this. 
//##############################################################
setDefaultFunds = function(data, productGroup){
	$('#fundsTableBody').html('');
	
	////console.log(data);
	
	// hold all the HTML for the tables
	var tableBodyContents = [];
	var tableHeader="<th class=\"fundOptionsHeader fundOptionsHeaderOptions\" colspan=\"7\">\
	<ul class=\"button-group right\">\
	<li class=\"showChatBtn\"><a href=\"javascript:window.print();\"  c title=\"Print This Page\"  ><img \
	src=\"/sites/all/modules/fund_centre/css/images/icon-funds-print.png\"  ></a></li>\
	<li class=\"showAllFundsBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" class=\"has-tip showAllFunds\" title=\"Show All Funds\">\
	<img class=\"\" src=\"/sites/all/modules/fund_centre/css/images/icon-funds-star-all.png\" ></a></li>\
	<li class=\"showFavFundsBtn\" ><a href=\"javascript:void(0);\" title=\"Show Only Favourites\" class=\"has-tip showFavFunds\">\
	<img src=\"/sites/all/modules/fund_centre/css/images/icon-funds-star.png\"></a></li>\
	<li class=\"showChartBtn\"><a href=\"javascript:void(0);\" title=\"Show Chart of Selected Funds\" class=\"showChart has-tip\">\
	<img alt=\"Show Chart of Selected Funds\" src=\"/sites/all/modules/fund_centre/css/images/icon-chart-off.png\" \
	></a></li>\
	<li class=\"hideChartBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Hide Chart of Selected Funds\" class=\"has-tip hideChart\">\
	<img src=\"/sites/all/modules/fund_centre/css/images/icon-chart-on.png\" ></a></li>\
	<li class=\"showCumFundsBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Show Cumulative Funds\"  class=\"has-tip showCumFunds\">\
	<img src=\"/sites/all/modules/fund_centre/css/images/icon-funds-cumulative.png\" ></a></li>\
	<li class=\"showAnnFundsBtn\" ><a href=\"javascript:void(0);\" title=\"Show Annualised\" class=\"showAnnFunds has-tip\"><img \
	 src=\"/sites/all/modules/fund_centre/css/images/icon-funds-annualised.png\"></a></li>\
	</ul></th></tr><tr>\
	<th style=\"DISPLAY: none\" class=\"sort\" data-sort=\"id\" ></th>\
	<th class=\"starred sort\" width=\"5%\" data-sort=\"starred\">Fav</th>\
	<th id=\"defaultNames\" class=\"sort leftAlign\" style=\"padding-left: 10px!important;text-align:left!important\" width=\"23%\" data-sort=\"name\">~Name~</th>\
	<th style=\"display:none\" class=\"sort\" width=\"7%\" data-sort=\"1mth\">1 Mth</th>\
	<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"7%\" data-sort=\"3mth\">3 Mths</th>\
	<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"7%\" data-sort=\"6mth\">6 Mths</th>\
	<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"7%\" data-sort=\"12mth\">12 Mth</th>\
	<th style=\"font-size:13px\" class=\"whenCharted sort 3yrs\" width=\"7%\" data-sort=\"3yrs\">3 Yrs</th>\
	<th style=\"font-size:13px\" class=\"whenCharted sort 5yrs\" width=\"7%\" data-sort=\"5yrs\">5 Yrs</th>\
	<th style=\"display:none\" class=\"sort 10yrs\" width=\"7%\" data-sort=\"10yrs\">10 Yrs</th>\
	<th style=\"display:none\" class=\"sort 3yrsAnn\" width=\"7%\" data-sort=\"3yrsAnn\">3 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 5yrsAnn\" width=\"7%\" data-sort=\"5yrsAnn\">5 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 10yrsAnn\" width=\"7%\" data-sort=\"10yrsAnn\">10 Yrs <small>Annualised</small></th>\
	<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"8%\" data-sort=\"fromlaunch\">All time</th>\
	<th style=\"font-size:13px\" class=\"tip hideOnCanada\" width=\"9%\" data-sort=\"risk\" "+Drupal.settings.fund_centre.riskDisplay+" >Risk</th>\
	<th class=\"sort\" width=\"8%\" data-sort=\"charge\" "+Drupal.settings.fund_centre.chargeDisplay+" >Fund Charge</th>\
	<th style=\"font-size:13px\" class=\"sort\" width=\"8%\" data-sort=\"price\">Price on: <br/> <span class=\"thePriceDate\">~<\span></th>\
	<th class=\"hideCharted\" style=\"font-size:13px\" class=\"sort\" width=\"5%\"data-sort=\"charted\">Chart</th>\
	</tr></thead><tbody class=\"list\">";
	
	//var tableFooter = "</tbody></table></div>";

	var tableFooter = "<tr class=\"expand-row\"><td style='text-align:center' class=\"expand\" colspan=\"12\"><i class=\"material-icons icon\" style=\"vertical=-align:middle;color:white\">add_circle_outline</i></td></tr><tr class=\"contract-row hiddenRow\"><td style=\"text-align:center;\" class=\"contract\" colspan=\"12\"><i class=\"material-icons\" style=\"color:white\">remove</i></td></tr></tbody></table></div>";
	
	// set up the required tables as defined by Group ID and Group Name
	for (i=0;i<retailFundGroupUpperLimits.length; i++){	
		tableBodyContents[i] = "<div class=\"mobileHeading sort leftAlign\" width=\"23%\" data-sort=\"name\" style=\"margin-top: 10px;text-align:center!important\">*Name*</div><div id=\"fundsGroup"+i+"\"><div class=\"large-6 columns\"></div>\
		<div class=\"large-6 columns\"></div><table class=\"dataList persist-area\"><thead class=\"persist-header\">\
		<th class=\"fundOptionsHeader\" colspan=\"7\"><h3 style=\"display:none\">"+currentFundGroupNames[i]+" <br/> @ <span class=\"thePriceDate\">~<\span></h3></th>"+tableHeader
		tableBodyContents[i] = tableBodyContents[i].replace('~Name~',currentFundGroupNames[i]);
		tableBodyContents[i] = tableBodyContents[i].replace('*Name*',currentFundGroupNames[i]);
	}
		
	
	// ##################
	// Loop through data
		$.each(data, function(key, val) {
			////console.log(key,val);
		//$.each(val, function(index, vale) {
			thePriceDate = val.PriceDate;
			
			var fundGroupIDtemp = "0";

			fundGroupIDtemp = selectFundGroup(val.FundGroupOrder);
			tableBodyContents[fundGroupIDtemp] +="<tr><td id=\""+val.FundId+"\" style=\"DISPLAY: none\" class=\"id\">"+val.FundGroupOrder+"</td>";
			
			tableBodyContents[fundGroupIDtemp] += "<td style=\"text-align:left\" class=\"name\"><a " +
				"onclick=\"showFundScreen('"+val.FundId+"','"+val.FundName+"');\"" + "href=\"#\"><span class=\"fundName\">"+val.FundName+"</span></a>";

			tableBodyContents[fundGroupIDtemp] += "<td class=\"mobileRow\"><div class=\"mobileRiskRating circle-risk rated-"+val.FundRiskRating+"\"><span class=\"rateditem\">IL-"+val.FundRiskRating+"</span></div><div class=\"mobilePrice "+val.CurrentPrice +" \">&euro;"+val.CurrentPrice+"</div><div class=\"mobileFromLaunch "+val.SinceLaunchPercent+" \">"+val.SinceLaunchPercent+"<div></td>";


			if (!productGroup) {
			tableBodyContents[fundGroupIDtemp] +="<td class=\"starred\">";
				if ($.inArray(data.FundId, fundsStoredArray) >= 0) {
					tableBodyContents[fundGroupIDtemp] += "<input id=\"starred-"+val.FundId+"\" class=\"starred-input\" type=\"checkbox\" value=\"\" checked/><label class=\"feaeae starred-on\" for=\"starred-"+val.FundId+"\"></label><span class=\"starredAgain\" style=\"display:none\">1</span></td>";
				} else {
					tableBodyContents[fundGroupIDtemp] += "<input id=\"starred-"+val.FundId+"\" class=\"starred-input\" type=\"checkbox\" value=\"\"/><label class=\"feaeae\" for=\"starred-"+val.FundId+"\"></label><span class=\"starredAgain\" style=\"display:none\">0</span></td>";
				}
			}

			tableBodyContents[fundGroupIDtemp] += "<td class=\"charge\" "+Drupal.settings.fund_centre.chargeDisplay+">"+val.Fmc+"%</td>\
			<td style=\"display:none\" class=\"1mth "+val.OneMonthGrowthPercent+"\">"+val.OneMonthGrowthPercent+"</td>\
			<td class=\"whenCharted 3mth "+val.ThreeMonthGrowthPercent+"\">"+val.ThreeMonthGrowthPercent+"</td>\
			<td class=\"whenCharted 6mth "+val.SixMonthGrowthPercent+"\">"+val.SixMonthGrowthPercent+"</td>\
			<td class=\"whenCharted 12mth "+val.OneYearGrowthPercent+"\">"+val.OneYearGrowthPercent+"</td>\
			<td class=\"whenCharted 3yrs "+val.ThreeYearGrowthPercent+"\">"+val.ThreeYearGrowthPercent+"</td>\
			<td class=\"whenCharted 5yrs "+val.FiveYearGrowthPercent+"\">"+val.FiveYearGrowthPercent+"</td>\
			<td class=\"whenCharted fromlaunch "+val.SinceLaunchPercent+"\">"+val.SinceLaunchPercent+"</td>\
			<td class=\"risk\" "+Drupal.settings.fund_centre.riskDisplay+ "><div class=\"circle-risk rated-"+val.FundRiskRating+"\">\
			<span class=\"rateditem\">IL-"+val.FundRiskRating+"</span></div></td>\
			<td class=\"price\">&euro;"+val.CurrentPrice+"</td>";
			
			
			tableBodyContents[fundGroupIDtemp] += "<td class=\"charted\" style=\"text-align:left!important\" >";
			if ($.inArray(data.id, fundsChartStoredArray) >= 0) {
				tableBodyContents[fundGroupIDtemp] += "<input id=\"charted-"+val.FundId+"\" class=\"charted-input\" type=\"checkbox\" checked/><label class=\"feaeaea chart-on\" for=\"charted-"+val.FundId+"\"></label><span class=\"chartAgain\" style=\"display:none\">1</span></td></td>";
				fundsChartSessionArray.push(+val.FundId+';'+val.FundName); // set the session chart array to what is taken from URL
			} else {
				tableBodyContents[fundGroupIDtemp] += "<input id=\"charted-"+val.FundId+"\" class=\"charted-input\" type=\"checkbox\" / ><label class=\"feaeaea\" for=\"charted-"+val.FundId+"\"></label><span class=\"chartAgain\" style=\"display:none\">0</span></td></td>";
			}
		
			
			tableBodyContents[fundGroupIDtemp] +="</tr>";
		
	
	});
	
	// Close off each table
	for (i=0;i<retailFundGroupUpperLimits.length; i++){
			tableBodyContents[i] += tableFooter;
			
	}
	
	for (i=0;i<retailFundGroupUpperLimits.length; i++){
			 $('#fundsTableBody').append(tableBodyContents[i]);
	}
	
	$('.thePriceDate').html(thePriceDate);	
	a.log("Funds Loaded");
	 if(window.location.href.indexOf("canada-life") > -1) {
		 $('.hideOnCanada').hide();
	 }
	
	
	$(".fundOptionsHeaderOptions:first").removeClass("fundOptionsHeaderOptions");
	
	
	if($.inArray('fundscreentrue', fundsChartStoredArray) >= 0)
	{
		// removeChartFilter();				
		showChartFilter();
	}
	
	//ADD THE EXPANDABLE BUTTON 
	for (i=0;i<retailFundGroupUpperLimits.length; i++){
		var tableLength = $('#fundsGroup' +i).find('.list tr').length - 1;
		
		if (tableLength > 10) {
			var newTableLength = 6;
			
			$('#fundsGroup' +i).find('.list tr:nth-child(n+'+newTableLength+')').addClass('hiddenRow');
			$('#fundsGroup'+i+' .expand-row').show();
			$('#fundsGroup'+i+' .expand-row').removeClass('hiddenRow');
		}   
		/*else if(tableLength > 7) {
			var newTableLength = Math.round(tableLength / 2);
			////console.log(newTableLength);
			$('#fundsGroup' +i).find('.list tr:nth-child(n+'+newTableLength+')').addClass('hiddenRow');
			$('#fundsGroup'+i+' .expand-row').show();
			$('#fundsGroup'+i+' .expand-row').removeClass('hiddenRow');
		} */ 
		else {
			$('#fundsGroup'+i+' .expand-row').hide();
		}
	};
	
	
	// Set up the header to persist. This code basically
	// copys the header and shows it when scrolling for 
	// any table header with the persist-area class
	var clonedHeaderRow;
   $(".persist-area").each(function() {
	   clonedHeaderRow = $(".persist-header", this);
	   clonedHeaderRow
		 .before(clonedHeaderRow.clone())
		 //.css("width", clonedHeaderRow.width())
		 .addClass("floatingHeader");
		 
   });
   
   $(window)
	.scroll(UpdateTableHeaders)
	.trigger("scroll");
	
	setSortList('0');
	if($.inArray('chartscreentrue', fundsChartStoredArray) >= 0)
	{
		displayChart("default");
	}
	
}


getProductFundPrices = function(id, name){
	//hideChart();
	
	$('#productsTableBody').html("<img alt=\"Loading\" src=\"/sites/all/modules/fund_centre/css/images/ajax-loader.gif\"> Loading Funds, Please Wait.");
	
	if ((typeof allProductTables[id] !== 'undefined') ){
		// no need to make ajax call as we have table stored
		
		var prodFundGroupNames = [name + ' Prices and Performance'];
		//currentFundGroupNames = prodFundGroupNames;
		// currentFundGroupID = [id];
		setProductFunds(allProductTables[id],id,prodFundGroupNames);
	}
	else
	{
		if (id > 0)
		{
			var jqxhr = $.post( "https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundsPerformanceIL?fundGroupId="+id, function() {
			})
			.done(function(data) {
				
				//var prodFundGroupID = [0]; // set to 0 
				var prodFundGroupNames = [name + ' Prices and Performance'];
				
				// currentFundGroupID = [id];
				setProductFunds(data,id,prodFundGroupNames);
				allProductTables[id] = data;

				
			})
			.fail(function(jqxhr, textStatus, error ) {a.error("Error loading all funds. Refresh or try later."); })
		
		}
	}
	
	if(name == "Pick a Product") {
		$('#productsTableBody').html('<div class="loadingBox"><h4>Please select a product from the list above</h4></div>');
	}
	
}


selectProductGroup = function(orderNum, grouping){
	var currentProductGroup=0;
	if (orderNum <=10){
		currentFundGroup = 0;
	}else
	{
		if(grouping == 'I')
		{
			currentFundGroup = 1;
		}
		else if(grouping == 'F')
		{
			currentFundGroup = 2;
		}
		else if(grouping == 'B')
		{
			currentFundGroup = 3;
		}
	}
	
	return currentFundGroup;
}
//##############################################################
// This function is for setting up the funds for the default page
// rather than products page. The data is passed in and the headers
// and button events are set up specifically for this. 
//##############################################################
setProductFunds = function(data,productGroupID,name){
	$('#productsTableBody').html('');
	
			 
	// Build up the html for the group <div> - <table> - </div>
	/*
	var tableHeader="<th class=\"fundOptionsHeader fundOptionsHeaderOptions\" colspan=\"7\">\
	<ul class=\"button-group right\">\
	<li class=\"showChatBtn\"><a href=\"javascript:window.print();\" title=\"Print This Page\"  ><img \
	src=\"/sites/all/modules/fund_centre/css/images/icon-funds-print.png\"  ></a></li>\
	<li class=\"showProductChartBtn\"><a href=\"javascript:void(0);\" title=\"Show Chart of Selected Funds\" class=\"showProductChart has-tip\">\
	<img alt=\"Show Chart of Selected Funds\" src=\"/sites/all/modules/fund_centre/css/images/icon-chart-off.png\" \
	></a></li>\
	<li class=\"hideProductChartBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Hide Chart of Selected Funds\" class=\"has-tip hideProductChart\">\
	<img src=\"/sites/all/modules/fund_centre/css/images/icon-chart-on.png\" ></a></li>\
	<li class=\"showCumFundsBtn\" style=\"display:none\"><a href=\"javascript:void(0);\" title=\"Show Cumulative Funds\"  class=\"has-tip showCumFunds\">\
	<img src=\"/sites/all/modules/fund_centre/css/images/icon-funds-cumulative.png\" ></a></li>\
	<li class=\"showAnnFundsBtn\" ><a href=\"javascript:void(0);\" title=\"Show Annualised\" class=\"showAnnFunds has-tip\"><img \
	 src=\"/sites/all/modules/fund_centre/css/images/icon-funds-annualised.png\"></a></li>\
	</ul></th></tr><tr>\
	<th style=\"DISPLAY: none\" class=\"sort\" data-sort=\"id\" ></th>\
	<th id=\"productNames\" style=\"text-align:left!important\"  class=\"sort leftAlign\" width=\"23%\" data-sort=\"name\"></th>\
	<th class=\"sort\" width=\"8%\" data-sort=\"price\">Price</th>\
	<th style=\"display:none\" class=\"sort\" width=\"8%\" data-sort=\"1mth\">1 Mth</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"3mth\">3 Mths</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"6mth\">6 Mths</th>\
	<th class=\"sort\" width=\"7%\" data-sort=\"12mth\">12 Mths</th>\
	<th class=\"sort 3yrs\" width=\"7%\" data-sort=\"3yrs\">3 Yrs</th>\
	<th class=\"sort 5yrs\" width=\"7%\" data-sort=\"5yrs\">5 Yrs</th>\
	<th style=\"display:none\" class=\"sort 10yrs\" width=\"7%\" data-sort=\"10yrs\">10 Yrs</th>\
	<th style=\"display:none\" class=\"sort 3yrsAnn\" width=\"7%\" data-sort=\"3yrsAnn\">3 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 5yrsAnn\" width=\"7%\" data-sort=\"5yrsAnn\">5 Yrs <small>Annualised</small></th>\
	<th style=\"display:none\" class=\"sort 10yrsAnn\" width=\"7%\" data-sort=\"10yrsAnn\">10 Yrs <small>Annualised</small></th>\
	<th class=\"sort\" width=\"8%\" data-sort=\"fromlaunch\">From Launch</th>\
    <th class=\"sort\" width=\"5%\"data-sort=\"charted\">Chart</th>\
	</tr></thead><tbody class=\"list\">";
	*/

	var tableFooter = "</tbody></table></div>";
	var localTableHolder = [];
	// productGroupNames
	// set up the required tables for each product section (popular, ilim etc)
	for (i=0;i<productGroupNames.length; i++){	
		localTableHolder[i] = "<div class=\"mobileHeading sort leftAlign\" width=\"23%\" data-sort=\"name\" style=\"margin-top: 10px;text-align:center!important\"><strong>"+productGroupNames[i]+" @ <span class=\"thePriceProductDate\">~<\span></strong></div><div id=\"productGroup"+i+"\"><div class=\"large-6 columns\"></div>\
		<div class=\"large-6 columns\"></div><table class=\"dataList persist-area-product\"><thead class=\"persist-header-product\">\
		<th class=\"fundOptionsHeader\" colspan=\"7\"><h3>"+productGroupNames[i]+"<br/> @ <span class=\"thePriceProductDate\">~<\span></h3></th><th id=\"productNames\" style=\"padding-left: 10px!important;text-align:left!important\"  class=\"sort leftAlign\" width=\"23%\" data-sort=\"name\"></th>\
		<th style=\"display:none\" class=\"sort\" width=\"8%\" data-sort=\"1mth\">1 Mth</th>\
		<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"7%\" data-sort=\"3mth\">3 Mths</th>\
		<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"7%\" data-sort=\"6mth\">6 Mths</th>\
		<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"7%\" data-sort=\"12mth\">12 Mths</th>\
		<th style=\"font-size:13px\" class=\"whenCharted sort 3yrs\" width=\"7%\" data-sort=\"3yrs\">3 Yrs</th>\
		<th style=\"font-size:13px\" class=\"whenCharted sort 5yrs\" width=\"7%\" data-sort=\"5yrs\">5 Yrs</th>\
		<th style=\"display:none\" class=\"sort 10yrs\" width=\"7%\" data-sort=\"10yrs\">10 Yrs</th>\
		<th style=\"display:none\" class=\"sort 3yrsAnn\" width=\"7%\" data-sort=\"3yrsAnn\">3 Yrs <small>Annualised</small></th>\
		<th style=\"display:none\" class=\"sort 5yrsAnn\" width=\"7%\" data-sort=\"5yrsAnn\">5 Yrs <small>Annualised</small></th>\
		<th style=\"display:none\" class=\"sort 10yrsAnn\" width=\"7%\" data-sort=\"10yrsAnn\">10 Yrs <small>Annualised</small></th>\
		<th style=\"font-size:13px\" class=\"whenCharted sort\" width=\"8%\" data-sort=\"fromlaunch\">All time</th>\
		<th style=\"font-size:13px\" class=\"sort\" width=\"8%\" data-sort=\"price\">Price on: <br/> <span class=\"thePriceProductDate\">~<\span></th>\
		<th style=\"font-size:13px\" class=\"hideCharted sort\" width=\"5%\"data-sort=\"charted\">Chart</th>\
		</tr></thead><tbody class=\"list\">";
			
		//$('#productNames').html(productGroupNames[i]);
	}
	
	
	//localTableHolder = "<div id=\"productGroup"+productGroupID+"\"><div class=\"large-6 columns\"></div>\
	//	<div class=\"large-6 columns\"></div><table class=\"dataList persist-area-product\"><thead class=\"persist-header-product\">\
	//	<th class=\"fundOptionsHeader\" colspan=\"7\"><h5>"+name+"</h5></th>"+tableHeader;
	
		
	// ##################
	// Loop through data
		$.each(data, function(key, val) {
			////console.log(key,val);
		//$.each(val, function(index, vale) {
			thePriceDate = val.PriceDate;
			var fundGroupIDtemp = "0";

			fundGroupIDtemp = selectProductGroup(val.FundGroupOrder, val.FundGroup);
	
			localTableHolder[fundGroupIDtemp] +="<tr><td id=\""+val.FundId+"\" style=\"DISPLAY: none\" class=\"id\">"+val.FundGroupOrder+"</td>";	
			localTableHolder[fundGroupIDtemp] += "<td style=\"text-align:left\" class=\"name\"><span class=\"fundName\">"+val.FundName+"</span></td>";
			
			localTableHolder[fundGroupIDtemp] += "<td class=\"mobileRow\"><div class=\"mobilePrice "+ val.CurrentPrice +" \">&euro;"+val.CurrentPrice+"</div><div class=\"mobileFromLaunch "+ val.SinceLaunchPercent +" \">"+val.SinceLaunchPercent+"<div></td>";

			localTableHolder[fundGroupIDtemp] += "<td class=\"mobileRow\"><div class=\"mobilePrice "+ val.CurrentPrice +" \">&euro;"+val.CurrentPrice+"</div><div class=\"mobileFromLaunch "+ val.SinceLaunchPercent +" \">"+val.SinceLaunchPercent+"<div></td>\
			<td style=\"display:none\" class=\"1mth "+val.OneMonthGrowthPercent+"\">"+val.OneMonthGrowthPercent+"</td>\
			<td class=\"whenCharted 3mth "+val.ThreeMonthGrowthPercent+"\">"+val.ThreeMonthGrowthPercent+"</td>\
			<td class=\"whenCharted 6mth "+val.SixMonthGrowthPercent+"\">"+val.SixMonthGrowthPercent+"</td>\
			<td class=\"whenCharted 12mth "+val.OneYearGrowthPercent+"\">"+val.OneYearGrowthPercent+"</td>\
			<td class=\"whenCharted 3yrs "+val.ThreeYearGrowthPercent+"\">"+val.ThreeYearGrowthPercent+"</td>\
			<td class=\"whenCharted 5yrs "+val.FiveYearGrowthPercent+"\">"+val.FiveYearGrowthPercent+"</td>\
			<td class=\"whenCharted fromlaunch "+val.SinceLaunchPercent+"\">"+val.SinceLaunchPercent+"</td>\
			<td class=\"price\">&euro;"+val.CurrentPrice+"</td>";
			
			localTableHolder[fundGroupIDtemp] += "<td style=\"text-align:left\!important;\" class=\"charted\" >";	
			
			if ($.inArray(val.id, fundsChartStoredArrayForProducts) >= 0){
				localTableHolder[fundGroupIDtemp] += "<input id=\"charted-"+val.FundId+"\" class=\"charted-input\" type=\"checkbox\" checked/><label class=\"feaeaea chart-on\" for=\"charted-"+val.FundId+"\"></label><span class=\"chartAgain\" style=\"display:none\">1</span></td></td></tr>";
			}
			else{
				localTableHolder[fundGroupIDtemp] += "<input id=\"charted-"+val.FundId+"\" class=\"charted-input\" type=\"checkbox\" /><label class=\"feaeaea\" for=\"charted-"+val.FundId+"\"></label><span class=\"chartAgain\" style=\"display:none\">0</span></td></td></tr>";
			}
		
	
	});
	
	for (i=0;i<productGroupNames.length; i++){
		localTableHolder[i] += tableFooter;
		if(localTableHolder[i].length>2750){
		// don't display empty tables
			$('#productsTableBody').append(localTableHolder[i]);
		}
		else{
			// add to the screen but don't display it.
			// All the list object methods still work this way.
			$('#productsTableBody').append('<span style="display:none">'+localTableHolder[i]+'</span>');
		}
	}

	$('.thePriceProductDate').html(thePriceDate);
	a.log("Funds Loaded");
	
	$('#productsTableBody').show();
	$(".fundOptionsHeaderOptions:first").removeClass("fundOptionsHeaderOptions");
	
	
		
	// Set up the header to persist. This code basically
	// copys the header and shows it when scrolling for 
	// any table header with the persist-area class
	var clonedHeaderRow;
   $(".persist-area-product").each(function() {
	   clonedHeaderRow = $(".persist-header-product", this);
	   clonedHeaderRow
		 .before(clonedHeaderRow.clone())
		 .css("width", clonedHeaderRow.width())
		 .addClass("floatingHeader");
		 
   });
   
   $(window)
	.scroll(UpdateTableHeaders)
	.trigger("scroll");
	
	// set the table sort
	setSortList('1');
}

// return the fund colour class based on the value 
fc = function(n)
{

var m = n.replace('%','');
	var r="";
	if (m>0)
	{
		r= "priceup";
	}
	else if (m<0){
		r = "pricedown";
	}
	else
	{
		r = "";
	}
	return r;
}

clearCharted = function(){

	$('.charted').find('.chartAgain').html('0');
	$('.charted').find('label').removeClass('chart-on');
	$('.charted').find('input').attr('checked', false);
	$('#compareFundsBar, #compareProductsBar').hide();
	$('#productsTableBody').html('<div class="loadingBox"><h4>Please select a product from the list above</h4></div>');
	defaultBar = true;
	
}		
	
//######################################
// Click events on the page
$(document).on('click', '.showAnnFunds', function(){
	$('.showAnnFundsBtn, .3yrs, .5yrs').hide(); //.10yrs
	$('.showCumFundsBtn, .3yrsAnn, .5yrsAnn').show();//, .10yrsAnn
});
	
$(document).on('click', '.showCumFunds', function(){
	$('.showAnnFundsBtn, .3yrs, .5yrs').show();//, .10yrs
	$('.showCumFundsBtn, .3yrsAnn, .5yrsAnn').hide();//, .10yrsAnn
});	

$(document).on('click', '.risk', function(){
	a.log("The level of risk stretches from 1 to 7,1 being the fund with the least amount of risk, and 7 being the fund with the most amount of risk.");
});	

$(document).on('click', '.back', function(){
	hideFund();
});	
	
$(document).on('click', '.showFavFunds', function(){

	if (fundsStoredArray.length > 0)
	{
		$('.showFavFundsBtn').hide();
		$('.showAllFundsBtn').show();
		contactList = [];
		setSortList('0');
		for (i=0;i<retailFundGroupUpperLimits.length; i++){
			contactList[i].filter(function(item) {
			var starredHTML = $.parseHTML( item.values().starred);
			var isStarredCheck = $(starredHTML[2]).filter('span').html();
				if (isStarredCheck >= 1) {
					return true;
				} else {
					return false;
				}
			});
		
			var thisTable = "fundsGroup"+i;
			var thisTableContents = $('#fundsGroup'+i).find('table').find('.list').html();

			if(thisTableContents.length<=5)
			{
				$("#fundsGroup"+i).hide();
			}
		}
	}
	else
	{
		a.error('No funds starred');
	}
		
});


$(document).on('click', '.showAllFunds', function(){
		$('.showFavFundsBtn').show();
		$('.showAllFundsBtn').hide();
		
			for (i=0;i<retailFundGroupUpperLimits.length; i++){
				if (contactList[i])
				{	
					contactList[i].filter();
				}
			}
		
		removeChartFilter();
	});

$(document).on('click', '.showChart', function(){
	displayChart("default");
	$('#compareFundsBar').hide();


});
$(document).on('click', '.showProductChart', function(){
	displayChart("product");
	$('.fundsProductsHeader').hide();
	$('#compareProductsBar').hide();
	
});

//CLICK EVENTS FOR EXPAND AND CONTRACT BUTTONS

//FUNDS GROUP 0
$(document).on('click', '#fundsGroup0 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup0 .hiddenRow').css('display','table-row');	
    $('#fundsGroup0 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup0 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup0 .hiddenRow').css('display','none');	
	$('#fundsGroup0 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 1
$(document).on('click', '#fundsGroup1 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup1 .hiddenRow').css('display','table-row');	
    $('#fundsGroup1 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup1 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup1 .hiddenRow').css('display','none');	
	$('#fundsGroup1 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 2
$(document).on('click', '#fundsGroup2 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup2 .hiddenRow').css('display','table-row');	
    $('#fundsGroup2 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup2 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup2 .hiddenRow').css('display','none');	
	$('#fundsGroup2 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 3
$(document).on('click', '#fundsGroup3 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup3 .hiddenRow').css('display','table-row');	
    $('#fundsGroup3 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup3 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup3 .hiddenRow').css('display','none');	
	$('#fundsGroup3 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 4
$(document).on('click', '#fundsGroup4 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup4 .hiddenRow').css('display','table-row');	
    $('#fundsGroup4 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup4 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup4 .hiddenRow').css('display','none');	
	$('#fundsGroup4 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 5
$(document).on('click', '#fundsGroup5 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup5 .hiddenRow').css('display','table-row');	
    $('#fundsGroup5 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup5 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup5 .hiddenRow').css('display','none');	
	$('#fundsGroup5 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 6
$(document).on('click', '#fundsGroup6 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup6 .hiddenRow').css('display','table-row');	
    $('#fundsGroup6 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup6 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup6 .hiddenRow').css('display','none');	
	$('#fundsGroup6 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 7
$(document).on('click', '#fundsGroup7 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup7 .hiddenRow').css('display','table-row');	
    $('#fundsGroup7 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup7 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup7 .hiddenRow').css('display','none');	
	$('#fundsGroup7 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 8
$(document).on('click', '#fundsGroup8 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup8 .hiddenRow').css('display','table-row');	
    $('#fundsGroup8 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup8 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup8 .hiddenRow').css('display','none');	
	$('#fundsGroup8 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

//FUNDS GROUP 9
$(document).on('click', '#fundsGroup9 .expand-row', function(){
	$(this).hide();
	$('#fundsGroup9 .hiddenRow').css('display','table-row');	
    $('#fundsGroup9 .contract-row').css('display','table-row');
});

$(document).on('click', '#fundsGroup9 .contract-row', function(){
	$(this).hide();
	$('#fundsGroup9 .hiddenRow').css('display','none');	
	$('#fundsGroup9 .expand-row').css('display','table-row');	
    //$('#fundsGroup0 .contract').removeClass('hiddenRow');
});

function compareAmt() {
	 if ($('.chart-on').length > 1 && defaultBar) {
     $('#compareFundsBar').show();	
	 }
	 
	 else if ($('.chart-on').length > 1 && defaultBar == false) {
     $('#compareProductsBar').show();	
	 }
	 else {
     $('#compareProductsBar').hide();
     $('#compareFundsBar').hide();		 
	 
	 }
}

// Show the chart on the screen
function displayChart(type){
	// clean up in case fav filter is on
	if (fundsChartSessionArray.length >0)
	{

	    removeChartFilter();
		
		$('.ui-widget-header').hide();

		showChartScreen();	
		$('.hideChartBtn').show();
		$('.showChartBtn').hide();
		
		if(type=="product")
		{
			showProductChartFilter();
			defaultBar = false;
		}
		else
		{
			showChartFilter();
			defaultBar = true;
			$('#fundsTableBody').hide();
		}
	}
	else
	{
		a.error("Cannot chart - no funds selected");		
	}
}

hideChart = function(){

		$('#fundsChartBody').hide();
		$('.hideChartBtn').hide();
		$('.showChartBtn').show();
		$('.ui-widget-header').show();
		
		removeChartFilter();
		
		$(".button-group").show();
		updateURLHash('favFundsStoredILFS',fundsStoredArray,true); // set the url
		
		//hide the other tds and show the chart buttons 
		$('.charted, .hideCharted').show();
		$('.whenCharted').hide();
		$('.name a').css('pointer-events','auto');
		
		$('#backToFundsBar').hide();
		
		if(defaultBar) {
			$('#compareFundsBar').show();
		}
	    else if(defaultBar == false) {
			$('#compareProductsBar').show();
			$('.fundsProductsHeader').show();
		}
}

hideFund = function(){

		$('#fundScreenBody').hide();
		$('#fund-centre-app').show();
		clearCharted();
		//$('.hideChartBtn').hide();
		//$('.showChartBtn').show();
		
}

$(document).on('click', '.showHelp', function(){
	$('#helpText').slideDown('slow');
	$('.helpTextButton').addClass('open');
	$('.helpTextButton').addClass('hideHelp');
	$('.helpTextButton').removeClass('showHelp');
});

$(document).on('click', '.hideHelp', function(){
	$('#helpText').slideUp('slow');
	$('.helpTextButton').removeClass('open');
	$('.helpTextButton').addClass('showHelp');
	$('.helpTextButton').removeClass('hideHelp');
});




$(document).on('click', '.showFundProducts', function(){
   
        $('#compareFundsBar').hide();
		getFundProductsList();
		clearCharted();

});	

$(document).on('click', '.showDefaultFunds', function(){
   
      clearCharted();

});	
	
$(document).on('click', '.hideFundProducts', function(){

		$('.fundsProductsHeaderContent').slideUp('slow');
		$('.fundsProductHeaderButton').removeClass('open');
		$('.fundsProductHeaderButton').addClass('showFundProducts');
		$('.fundsProductHeaderButton').removeClass('hideFundProducts');
		
		tempFundsForURL = fundsChartStoredArray;
		pullDownOverallFundData();
		//hideChart();
});	



getFundProductsList = function(){
	
	var mySelectList;
	
	$('#fundCategorySelect').html("<img alt=\"Loading\" src=\"/sites/all/modules/fund_centre/css/images/ajax-loader.gif\"> Loading Products");
	$.post('https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundGroups?applicationId='+productGroupsId, function (data, error){
				
			})
			.done(function ( data ) {
				mySelectList = "<select id=\"fundCategory\"><option selected=\"selected\" value=\"0\">Pick a Product</option>";
				$.each(data, function(key, val) {
					mySelectList += "<option value=\""+val.Id+"\">"+val.Name+"</option>";
				});
				mySelectList += "</select>";
								
				$('#fundCategorySelect').html(mySelectList);
				
				$('#fundCategory').change(function() {
					
					defaultBar = false;
					
					tempFundsForURL = fundsChartStoredArray;					
					fundsChartStoredArray = [];
					fundsChartSessionArray = [];
					
					//reset the charted products everytime you select a new dropdown
					$('label .charted').removeClass('.charted');
					$('label .chart-on').removeClass('.chart-on');
					$('#compareProductsBar').hide()
					

					getProductFundPrices($(this).val(),$("#fundCategory option:selected").text());
					
				});
			})
			.fail(function ( jqXHR, textStatus, errorThrown) {
				a.error('Error, refresh or try again later')
			});

			
}

// Shows the list of funds filtered to only show what has
// been selected by the user to display for the chart
function showChartFilter(){
		contactList = [];
		setSortList('0');
		
		for (i=0;i<retailFundGroupUpperLimits.length; i++){
			contactList[i].filter(function(item) {
			
			var chartedHTML = $.parseHTML( item.values().charted);
			if (chartedHTML != null) {
				var isChartedCheck = $(chartedHTML[2]).filter('span').html();
					
					if (isChartedCheck >= 1) {
						return true;
					} else {
						return false;
					}
			}
			else
			{
				return false;
			}
			});
			
			//var thisTable = "fundsGroup"+currentFundGroupID[i];
			var thisTableContents = $('#fundsGroup'+i).find('table').find('.list').html();

			if(thisTableContents.length<=5)
			{
				$("#fundsGroup"+i).hide();
			}
			$(".button-group").hide();
		}
}


// Shows the list of funds filtered to only show what has
// been selected by the user to display for the chart
function showProductChartFilter(){
	contactList = [];
	setSortList('1');

	for (i=0;i<productGroupNames.length; i++){
		contactList[i].filter(function(item) {
		
			var chartedHTML = $.parseHTML( item.values().charted);
			var isChartedCheck = $(chartedHTML[2]).filter('span').html();
				
			if (isChartedCheck >= 1) {
				return true;
			} else {
				return false;
			}
		});
		
		var thisTableContents = $('#productGroup'+i).find('table').find('.list').html();

		if(thisTableContents.length<=5)
		{
			$("#productGroup"+i).hide();
		}
		$(".button-group").hide();
	}
			
}
	
// Reset the funds list after a filter has been applied to 
// it to show a chart for the user
function removeChartFilter(){

	for (i=0;i<retailFundGroupUpperLimits.length; i++){
		//if (typeof(contactList[i]) != "undefined")
		if (typeof contactList[i] != 'undefined')
		{	
			contactList[i].filter();
		}
		$("#fundsGroup"+i).show();
		$("#productGroup"+i).show();
	}
}

window.loadFundsCentre = function(){
	


fundGroupMain = (typeof fundsProfile === 'undefined') ? '72' : fundsProfile;
isCanada = isCanada;
// get the product groupings for this site
//var retailFundGroupID = (typeof fundsGroup === 'undefined') ? ['4','2','3','1','5','6'] : fundsGroup;
// Get the upper limits set for seperating funds into groups
// var fundsGroupUpperLimits = ['10','60','80','100'];
retailFundGroupUpperLimits = (typeof fundsGroupUpperLimits === 'undefined') ? ['10','60','80','100'] : fundsGroupUpperLimits;
retailFundGroupNamesLimits = (typeof fundGroupNamesLimits === 'undefined') ? ['Irish Life Indexed Funds','CORE','Protected Funds','ILIM Actively Managed Funds','External Fund Managers','Clear PRSA Managed Portfolios'] : fundGroupNamesLimits;
// get the product groupings ID for this site, for use calling json feed
productGroupsId = (typeof productGroup === 'undefined') ? 'PRD' : productGroup;


// The fund group ID's for the default product groups
// var retailFundGroupID = ['4','2','3','1','5','6'];
// var blineFundGroupID = ['1','2','3','4'];
productGroupNames = ['Popular Funds','ILIM Funds','Fidelity Funds','Davy Funds'];

retailFundGroupNames = fundGroupNamesLimits ;

	///////////////////////////////////////////////////////
	// Alertify - Alertify - Alertify - Alertify - Alertify 
	// Use this to send messages to the users on the screen
	// for various events such as clicking buttons etc
	// Helps the user understand what they are doing on 
	// more complicated screens such as fund prices page
	alertify.set({ delay : 3000 }); // 3 sec
	///////////////////////////////////////////////////////

	// Set up the stored favourites. This array will set up what is 
	// pre-selected for user 
	fundsStoredArray = loadFundsFromURLandCookie('fav');
	fundsChartStoredArray = loadFundsFromURLandCookie('cht');
	fundsChartStoredArrayForProducts = loadFundsFromURLandCookie('prd');
	
	// Pull down the data from the server and the cookies have been set up to set the
	// chart data to the funds in URL if there or from Cookie if existing

//	
	if (retailFundGroupNames.length>0)
	{
		pullDownOverallFundData();
	}
	
	// Set up the click events for the starred / favourites on the table		
	$(document).on('click', '.starred-input', function(){
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('id');
		var isChecked = $(this).is(':checked');
		
		if(isChecked){
			$(this).closest('tr').find('.starred').find('label').addClass('starred-on');
			$(this).closest('tr').find('.starred').find('.starredAgain').html('1');
				$(this).attr('checked', true);
			a.log(name+" added to favourites");
			
			// causing error with empty
			fundsStoredArray.push(id);
		}else{
		$(this).closest('tr').find('.starred').find('label').removeClass('starred-on');
			$(this).closest('tr').find('.starred').find('.starredAgain').html('0');
			
				$(this).attr('checked', false);
			a.log(name+" removed from favourites" );
			fundsStoredArray =  jQuery.grep(fundsStoredArray, function(value) {
				return (value != id);
			});
		}
		updateURLHash('favFundsStoredILFS', fundsStoredArray,true);
	});
	
	// Set up the click events for the chart the table		
	$(document).on('click', '.charted-input', function(){
		var name = $(this).closest('tr').find('.name').find('.fundName').html();
		var id = $(this).closest('tr').find('.id').attr('id');
		var isChecked = $(this).is(':checked');

		if(isChecked){
		var limit = 8;
			if(fundsChartSessionArray.length<limit)
			{
				$(this).closest('tr').find('.charted').find('label').addClass('chart-on');
				$(this).closest('tr').find('.charted').find('.chartAgain').html('1');
				$(this).attr('checked', true);
				a.log(name+" added to comparison chart");
				fundsChartStoredArray.push(id);
				fundsChartSessionArray.push(id+';'+name);
			}
			else
			{
				a.error("You've reached your limited of "+limit+" funds.");
				$(this).attr('checked', false);
			}
		}else{
			$(this).closest('tr').find('.charted').find('label').removeClass('chart-on');
			$(this).attr('checked', false);
			$(this).closest('tr').find('.charted').find('.chartAgain').html('0');
			a.log(name+" removed from comparison chart" );
			
			fundsChartStoredArray =  jQuery.grep(fundsChartStoredArray, function(value) {
				return (value != id);
			});
			fundsChartSessionArray =  jQuery.grep(fundsChartSessionArray, function(value) {
				return (value.split(';')[0] != id);
			});
			
		}
		updateURLHash('chtFundsStoredILFS',fundsChartStoredArray,false);
		compareAmt();

	});
	
	
};
})(jQuery);;
