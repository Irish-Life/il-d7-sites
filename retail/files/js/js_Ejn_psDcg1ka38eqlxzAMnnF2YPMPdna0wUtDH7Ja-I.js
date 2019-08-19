(function ($, Drupal) {
"use strict";

/**
 * Drupal behavior.
 */
Drupal.behaviors.dfmWysiwyg = {attach: function(context, set) {
  var i, id, $T, $widget, ids = set.dfmTextareas, url = set.dfmUrl;
  // Handle textarea integration.
  if (ids && url) for (i in ids) {
    if (($T = $('#' + ids[i], context).not('.dtw-processed'))[0] && $T[0].style.display !== 'none') {
      $widget = $('<div class="dfm-textarea-widget description"><a class="ins-image" href="#">' + Drupal.t('Insert image') + '</a>. <a class="ins-link" href="#">' + Drupal.t('Insert file link') + '</a>.</div>');
      $widget.find('a').bind('click', {tid: ids[i]}, dW.eTextareaWidgetClick);
      $T.addClass('dtw-processed').parent().append($widget);
    }
  }
}};

/**
 * Global container for wysiwyg utilities.
 */
var dW = window.dfmWysiwyg = {

/**
 * Returns image html for the given file
 */
imageHtml: function(File) {
  return '<img src="' + File.getUrl() + '" width="' + File.width + '" height="' + File.height + '" alt="' + File.formatName() + '" />';
},

/**
 * Returns file link html for the given file
 */
fileHtml: function(File, inner) {
  return '<a href="' + File.getUrl() + '">' + (inner || File.formatName() + ' (' + File.formatSize() + ')') + '</a>';
},

/**
 * Returns image or file html for the given file
 */
typeHtml: function(File, imgInsert, inner) {
  if (imgInsert && File.width) return dW.imageHtml(File);
  if (File.isfile) return dW.fileHtml(File, inner);
},

/**
 * Gets textarea selection
 */
getSel: function(T) {
  return T.selectionStart !== undefined ? T.value.substring(T.selectionStart, T.selectionEnd) : (document.selection ? document.selection.createRange().text : '');
},

/**
 * Sets textarea selection
 */
setSel: function(T, str) {
  T.selectionStart !== undefined ? (T.value = T.value.substring(0, T.selectionStart) + str + T.value.substring(T.selectionEnd, T.value.length)) : (document.selection ? (document.selection.createRange().text = str) : (T.value += str));
},

/**
 * Sets textarea selection by joining multiple items usually of the same type.
 */
setSelMultiple: function(T, items) {
  dW.setSel(T, items.join('\n'));
},

/**
 * Insert selected files from DFM to the given textarea.
 */
insertSelected: function(dfm, T, isImg) {
  var i, File, items, html, selected = dfm.getSelectedItems();
  // Need a focusable textarea
  try {T.focus()}catch(e){return};
  // Single item
  if (selected.length == 1) {
    if (html = dW.typeHtml(selected[0], isImg, dW.getSel(T))) {
      dW.setSel(T, html);
    }
  }
  // Multiple items
  else {
    items = [];
    for (i = 0; File = selected[i]; i++) {
      if (html = dW.typeHtml(File, isImg)) {
        items.push(html);
      }
    }
    if (items.length) {
      dW.setSelMultiple(T, items, isImg);
    }
  }
},

/**
 * Returns DFM url if set.
 */
url: function() {
  return Drupal.settings.dfmUrl;
},

/**
 * Returns the DFM url with handler parameter attached.
 */
handlerUrl: function(handlerStr) {
  var url = dW.url() || '/dfm';
  return url + (url.indexOf('?') == -1 ? '?' : '&') + 'fileHandler=' + handlerStr;
},

/**
 * DFM file handler for textarea widget.
 */
textareaHandler: function(File, win) {
  var dfm = win.dfm, type = dfm.urlParam('insType'), isImg = type && type.indexOf('image') != -1;
  dW.insertSelected(dfm, $('#' + dfm.urlParam('textareaId'))[0], isImg);
  win.close();
},

/**
 * DFM file handler for BUEditor.
 */
bueHandler: function(File, win) {
  var i, input, field, fillup, els, fieldId, E, dfm = win.dfm;
  // Direct file insertion
  if (E = window.BUE.instances[dfm.urlParam('bueIndex')]) {
    dW.insertSelected(dfm, E.textArea, dfm.urlParam('insType') === 'image');
  }
  // Url field in image/link dialog
  else if (field = dW.bueFields[fieldId = dfm.urlParam('bueFid')]) {
    dW.bueFields[fieldId] = null;
    field.value = File.getUrl();
    fillup = {alt: File.formatName(), width: File.width, height: File.height};
    els = field.form.elements;
    for (i in fillup) {
      if (fillup[i] && (input = els['attr_' + i])) input.value = fillup[i];
    }
    field.focus();
  }
  win.close();
},

/**
 * DFM file handler for CKeditor image/link dialogs.
 */
ckeHandler: function(File, win) {
  window.CKEDITOR.tools.callFunction(win.dfm.urlParam('CKEditorFuncNum'), File.getUrl());
  win.close();
},

/**
 * Opens DFM for an url field of tinymce.
 */
mceBrowser: function(fieldId, url, type, win) {
  var dfmUrl = dW.url();
  if (dfmUrl && win && win.open) {
    dfmUrl += dfmUrl.indexOf('?') == -1 ? '?' : '&';
    dfmUrl += 'urlFieldId=' + encodeURIComponent(fieldId);
    dW.winOpen(dfmUrl, win);
  }
},

/**
 * Keeps track of fields that bueBrowser is opened for.
 */
bueFields: [],

/**
 * Opens DFM for an url field or for a bueditor instance.
 */
bueBrowser: function(obj, type) {
  var url = dW.handlerUrl('dfmWysiwyg.bueHandler');
  // Direct image/file insertion
  if (obj.constructor === window.BUE.instance) {
    url += '&insType=' + type + '&bueIndex=' + obj.index;
  }
  // File insertion into url field
  else if ('value' in obj) {
    url += '&bueFid=' + dW.bueFields.length;
    dW.bueFields.push(obj);
  }
  dW.winOpen(url);
},

/**
 * Browse button for bueditor.
 */
bueButton: function(fname, btnText) {
  return dW.url() ? '<input type="button" id="bue-dfm-button" name="bue_dfm_button" class="form-submit" value="'+ (btnText || Drupal.t('Browse')) +'" onclick="dfmWysiwyg.bueBrowser(this.form.elements[\''+ fname +'\'])">' : '';
},

/**
 * Click handler for textarea widget links.
 */
eTextareaWidgetClick: function(e) {
  var url = dW.handlerUrl('dfmWysiwyg.textareaHandler');
  url += '&insType=' + encodeURIComponent(this.className);
  url += '&textareaId=' + encodeURIComponent(e.data.tid);
  dW.winOpen(url);
  return false;
},

/**
 * Opens DFM window.
 */
winOpen: function(url, win) {
  var scrW = screen.availWidth, scrH = screen.availHeight,
  W = Math.max(500, Math.min(960, parseInt(scrW * 0.75))),
  H = Math.max(300, Math.min(720, parseInt(scrH * 0.75))),
  L = parseInt((scrW - W) / 2),
  T = parseInt((scrH - H) * 3 / 7);
  return (win || window).open(url, '', 'width=' + W + ',height=' + H + ',left=' + L + ',top=' + T + ',resizable=1');
}

};

/**
 * Global equivalent of DFM file handler for CKEditor.
 */
window.dfmCKHandler = dW.ckeHandler;

/**
 * Global equivalent of Bueditor browse button.
 */
window.dfmBUEButton = dW.bueButton;

})(window.jQuery, window.Drupal);
;
(function(c,q){var m="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(f){function n(){var b=c(j),a=c(h);d&&(h.length?d.reject(e,b,a):d.resolve(e));c.isFunction(f)&&f.call(g,e,b,a)}function p(b){k(b.target,"error"===b.type)}function k(b,a){b.src===m||-1!==c.inArray(b,l)||(l.push(b),a?h.push(b):j.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),r&&d.notifyWith(c(b),[a,e,c(j),c(h)]),e.length===l.length&&(setTimeout(n),e.unbind(".imagesLoaded",
p)))}var g=this,d=c.isFunction(c.Deferred)?c.Deferred():0,r=c.isFunction(d.notify),e=g.find("img").add(g.filter("img")),l=[],j=[],h=[];c.isPlainObject(f)&&c.each(f,function(b,a){if("callback"===b)f=a;else if(d)d[b](a)});e.length?e.bind("load.imagesLoaded error.imagesLoaded",p).each(function(b,a){var d=a.src,e=c.data(a,"imagesLoaded");if(e&&e.src===d)k(a,e.isBroken);else if(a.complete&&a.naturalWidth!==q)k(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=m,a.src=d}):
n();return d?d.promise(g):g}})(jQuery);
;
/*! WOW - v1.1.3 - 2016-05-06
* Copyright (c) 2016 Matthieu Aussaguel;*/(function(){var a,b,c,d,e,f=function(a,b){return function(){return a.apply(b,arguments)}},g=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};b=function(){function a(){}return a.prototype.extend=function(a,b){var c,d;for(c in b)d=b[c],null==a[c]&&(a[c]=d);return a},a.prototype.isMobile=function(a){return/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)},a.prototype.createEvent=function(a,b,c,d){var e;return null==b&&(b=!1),null==c&&(c=!1),null==d&&(d=null),null!=document.createEvent?(e=document.createEvent("CustomEvent"),e.initCustomEvent(a,b,c,d)):null!=document.createEventObject?(e=document.createEventObject(),e.eventType=a):e.eventName=a,e},a.prototype.emitEvent=function(a,b){return null!=a.dispatchEvent?a.dispatchEvent(b):b in(null!=a)?a[b]():"on"+b in(null!=a)?a["on"+b]():void 0},a.prototype.addEvent=function(a,b,c){return null!=a.addEventListener?a.addEventListener(b,c,!1):null!=a.attachEvent?a.attachEvent("on"+b,c):a[b]=c},a.prototype.removeEvent=function(a,b,c){return null!=a.removeEventListener?a.removeEventListener(b,c,!1):null!=a.detachEvent?a.detachEvent("on"+b,c):delete a[b]},a.prototype.innerHeight=function(){return"innerHeight"in window?window.innerHeight:document.documentElement.clientHeight},a}(),c=this.WeakMap||this.MozWeakMap||(c=function(){function a(){this.keys=[],this.values=[]}return a.prototype.get=function(a){var b,c,d,e,f;for(f=this.keys,b=d=0,e=f.length;e>d;b=++d)if(c=f[b],c===a)return this.values[b]},a.prototype.set=function(a,b){var c,d,e,f,g;for(g=this.keys,c=e=0,f=g.length;f>e;c=++e)if(d=g[c],d===a)return void(this.values[c]=b);return this.keys.push(a),this.values.push(b)},a}()),a=this.MutationObserver||this.WebkitMutationObserver||this.MozMutationObserver||(a=function(){function a(){"undefined"!=typeof console&&null!==console&&console.warn("MutationObserver is not supported by your browser."),"undefined"!=typeof console&&null!==console&&console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")}return a.notSupported=!0,a.prototype.observe=function(){},a}()),d=this.getComputedStyle||function(a,b){return this.getPropertyValue=function(b){var c;return"float"===b&&(b="styleFloat"),e.test(b)&&b.replace(e,function(a,b){return b.toUpperCase()}),(null!=(c=a.currentStyle)?c[b]:void 0)||null},this},e=/(\-([a-z]){1})/g,this.WOW=function(){function e(a){null==a&&(a={}),this.scrollCallback=f(this.scrollCallback,this),this.scrollHandler=f(this.scrollHandler,this),this.resetAnimation=f(this.resetAnimation,this),this.start=f(this.start,this),this.scrolled=!0,this.config=this.util().extend(a,this.defaults),null!=a.scrollContainer&&(this.config.scrollContainer=document.querySelector(a.scrollContainer)),this.animationNameCache=new c,this.wowEvent=this.util().createEvent(this.config.boxClass)}return e.prototype.defaults={boxClass:"wow",animateClass:"animated",offset:0,mobile:!0,live:!0,callback:null,scrollContainer:null},e.prototype.init=function(){var a;return this.element=window.document.documentElement,"interactive"===(a=document.readyState)||"complete"===a?this.start():this.util().addEvent(document,"DOMContentLoaded",this.start),this.finished=[]},e.prototype.start=function(){var b,c,d,e;if(this.stopped=!1,this.boxes=function(){var a,c,d,e;for(d=this.element.querySelectorAll("."+this.config.boxClass),e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.all=function(){var a,c,d,e;for(d=this.boxes,e=[],a=0,c=d.length;c>a;a++)b=d[a],e.push(b);return e}.call(this),this.boxes.length)if(this.disabled())this.resetStyle();else for(e=this.boxes,c=0,d=e.length;d>c;c++)b=e[c],this.applyStyle(b,!0);return this.disabled()||(this.util().addEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().addEvent(window,"resize",this.scrollHandler),this.interval=setInterval(this.scrollCallback,50)),this.config.live?new a(function(a){return function(b){var c,d,e,f,g;for(g=[],c=0,d=b.length;d>c;c++)f=b[c],g.push(function(){var a,b,c,d;for(c=f.addedNodes||[],d=[],a=0,b=c.length;b>a;a++)e=c[a],d.push(this.doSync(e));return d}.call(a));return g}}(this)).observe(document.body,{childList:!0,subtree:!0}):void 0},e.prototype.stop=function(){return this.stopped=!0,this.util().removeEvent(this.config.scrollContainer||window,"scroll",this.scrollHandler),this.util().removeEvent(window,"resize",this.scrollHandler),null!=this.interval?clearInterval(this.interval):void 0},e.prototype.sync=function(b){return a.notSupported?this.doSync(this.element):void 0},e.prototype.doSync=function(a){var b,c,d,e,f;if(null==a&&(a=this.element),1===a.nodeType){for(a=a.parentNode||a,e=a.querySelectorAll("."+this.config.boxClass),f=[],c=0,d=e.length;d>c;c++)b=e[c],g.call(this.all,b)<0?(this.boxes.push(b),this.all.push(b),this.stopped||this.disabled()?this.resetStyle():this.applyStyle(b,!0),f.push(this.scrolled=!0)):f.push(void 0);return f}},e.prototype.show=function(a){return this.applyStyle(a),a.className=a.className+" "+this.config.animateClass,null!=this.config.callback&&this.config.callback(a),this.util().emitEvent(a,this.wowEvent),this.util().addEvent(a,"animationend",this.resetAnimation),this.util().addEvent(a,"oanimationend",this.resetAnimation),this.util().addEvent(a,"webkitAnimationEnd",this.resetAnimation),this.util().addEvent(a,"MSAnimationEnd",this.resetAnimation),a},e.prototype.applyStyle=function(a,b){var c,d,e;return d=a.getAttribute("data-wow-duration"),c=a.getAttribute("data-wow-delay"),e=a.getAttribute("data-wow-iteration"),this.animate(function(f){return function(){return f.customStyle(a,b,d,c,e)}}(this))},e.prototype.animate=function(){return"requestAnimationFrame"in window?function(a){return window.requestAnimationFrame(a)}:function(a){return a()}}(),e.prototype.resetStyle=function(){var a,b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.style.visibility="visible");return e},e.prototype.resetAnimation=function(a){var b;return a.type.toLowerCase().indexOf("animationend")>=0?(b=a.target||a.srcElement,b.className=b.className.replace(this.config.animateClass,"").trim()):void 0},e.prototype.customStyle=function(a,b,c,d,e){return b&&this.cacheAnimationName(a),a.style.visibility=b?"hidden":"visible",c&&this.vendorSet(a.style,{animationDuration:c}),d&&this.vendorSet(a.style,{animationDelay:d}),e&&this.vendorSet(a.style,{animationIterationCount:e}),this.vendorSet(a.style,{animationName:b?"none":this.cachedAnimationName(a)}),a},e.prototype.vendors=["moz","webkit"],e.prototype.vendorSet=function(a,b){var c,d,e,f;d=[];for(c in b)e=b[c],a[""+c]=e,d.push(function(){var b,d,g,h;for(g=this.vendors,h=[],b=0,d=g.length;d>b;b++)f=g[b],h.push(a[""+f+c.charAt(0).toUpperCase()+c.substr(1)]=e);return h}.call(this));return d},e.prototype.vendorCSS=function(a,b){var c,e,f,g,h,i;for(h=d(a),g=h.getPropertyCSSValue(b),f=this.vendors,c=0,e=f.length;e>c;c++)i=f[c],g=g||h.getPropertyCSSValue("-"+i+"-"+b);return g},e.prototype.animationName=function(a){var b;try{b=this.vendorCSS(a,"animation-name").cssText}catch(c){b=d(a).getPropertyValue("animation-name")}return"none"===b?"":b},e.prototype.cacheAnimationName=function(a){return this.animationNameCache.set(a,this.animationName(a))},e.prototype.cachedAnimationName=function(a){return this.animationNameCache.get(a)},e.prototype.scrollHandler=function(){return this.scrolled=!0},e.prototype.scrollCallback=function(){var a;return!this.scrolled||(this.scrolled=!1,this.boxes=function(){var b,c,d,e;for(d=this.boxes,e=[],b=0,c=d.length;c>b;b++)a=d[b],a&&(this.isVisible(a)?this.show(a):e.push(a));return e}.call(this),this.boxes.length||this.config.live)?void 0:this.stop()},e.prototype.offsetTop=function(a){for(var b;void 0===a.offsetTop;)a=a.parentNode;for(b=a.offsetTop;a=a.offsetParent;)b+=a.offsetTop;return b},e.prototype.isVisible=function(a){var b,c,d,e,f;return c=a.getAttribute("data-wow-offset")||this.config.offset,f=this.config.scrollContainer&&this.config.scrollContainer.scrollTop||window.pageYOffset,e=f+Math.min(this.element.clientHeight,this.util().innerHeight())-c,d=this.offsetTop(a),b=d+a.clientHeight,e>=d&&b>=f},e.prototype.util=function(){return null!=this._util?this._util:this._util=new b},e.prototype.disabled=function(){return!this.config.mobile&&this.util().isMobile(navigator.userAgent)},e}()}).call(this);;
(function ($) {

/**
 * Attach the machine-readable name form element behavior.
 */
Drupal.behaviors.machineName = {
  /**
   * Attaches the behavior.
   *
   * @param settings.machineName
   *   A list of elements to process, keyed by the HTML ID of the form element
   *   containing the human-readable value. Each element is an object defining
   *   the following properties:
   *   - target: The HTML ID of the machine name form element.
   *   - suffix: The HTML ID of a container to show the machine name preview in
   *     (usually a field suffix after the human-readable name form element).
   *   - label: The label to show for the machine name preview.
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - standalone: Whether the preview should stay in its own element rather
   *     than the suffix of the source element.
   *   - field_prefix: The #field_prefix of the form element.
   *   - field_suffix: The #field_suffix of the form element.
   */
  attach: function (context, settings) {
    var self = this;
    $.each(settings.machineName, function (source_id, options) {
      var $source = $(source_id, context).addClass('machine-name-source');
      var $target = $(options.target, context).addClass('machine-name-target');
      var $suffix = $(options.suffix, context);
      var $wrapper = $target.closest('.form-item');
      // All elements have to exist.
      if (!$source.length || !$target.length || !$suffix.length || !$wrapper.length) {
        return;
      }
      // Skip processing upon a form validation error on the machine name.
      if ($target.hasClass('error')) {
        return;
      }
      // Figure out the maximum length for the machine name.
      options.maxlength = $target.attr('maxlength');
      // Hide the form item container of the machine name form element.
      $wrapper.hide();
      // Determine the initial machine name value. Unless the machine name form
      // element is disabled or not empty, the initial default value is based on
      // the human-readable form element value.
      if ($target.is(':disabled') || $target.val() != '') {
        var machine = $target.val();
      }
      else {
        var machine = self.transliterate($source.val(), options);
      }
      // Append the machine name preview to the source field.
      var $preview = $('<span class="machine-name-value">' + options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix + '</span>');
      $suffix.empty();
      if (options.label) {
        $suffix.append(' ').append('<span class="machine-name-label">' + options.label + ':</span>');
      }
      $suffix.append(' ').append($preview);

      // If the machine name cannot be edited, stop further processing.
      if ($target.is(':disabled')) {
        return;
      }

      // If it is editable, append an edit link.
      var $link = $('<span class="admin-link"><a href="#">' + Drupal.t('Edit') + '</a></span>')
        .click(function () {
          $wrapper.show();
          $target.focus();
          $suffix.hide();
          $source.unbind('.machineName');
          return false;
        });
      $suffix.append(' ').append($link);

      // Preview the machine name in realtime when the human-readable name
      // changes, but only if there is no machine name yet; i.e., only upon
      // initial creation, not when editing.
      if ($target.val() == '') {
        $source.bind('keyup.machineName change.machineName input.machineName', function () {
          machine = self.transliterate($(this).val(), options);
          // Set the machine name to the transliterated value.
          if (machine != '') {
            if (machine != options.replace) {
              $target.val(machine);
              $preview.html(options.field_prefix + Drupal.checkPlain(machine) + options.field_suffix);
            }
            $suffix.show();
          }
          else {
            $suffix.hide();
            $target.val(machine);
            $preview.empty();
          }
        });
        // Initialize machine name preview.
        $source.keyup();
      }
    });
  },

  /**
   * Transliterate a human-readable name to a machine name.
   *
   * @param source
   *   A string to transliterate.
   * @param settings
   *   The machine name settings for the corresponding field, containing:
   *   - replace_pattern: A regular expression (without modifiers) matching
   *     disallowed characters in the machine name; e.g., '[^a-z0-9]+'.
   *   - replace: A character to replace disallowed characters with; e.g., '_'
   *     or '-'.
   *   - maxlength: The maximum length of the machine name.
   *
   * @return
   *   The transliterated source string.
   */
  transliterate: function (source, settings) {
    var rx = new RegExp(settings.replace_pattern, 'g');
    return source.toLowerCase().replace(rx, settings.replace).substr(0, settings.maxlength);
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
