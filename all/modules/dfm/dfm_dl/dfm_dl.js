(function(dfm, $) {
"use strict";

/**
 * Register an init callback.
 */
dfm.registerInit('dl', function() {

  // Check if perms exist in any of the folders.
  if (!dfm.permExists('dlFiles') && !dfm.permExists('dlFolders')) return;

  // Add context menu item.
  dfm.addCmi('dl', {
    title: dfm.t('Download'),
    onclick: function(e, opt) {
      if (opt.treeCM) dfm.dlDir(opt.target);
      else if (opt.itemCM) dfm.dlSelectedItems();
    },
    stateCallback: function(opt) {
      // Do not enable if there is a request ongoing.
      if (!dfm.dlRequest) {
        if (opt.treeCM) return dfm.dlDirValidate(opt.target);
        if (opt.itemCM) return dfm.dlSelectedItemsValidate(true);
      }
    }
  });

});

/**
 * Validate download of selected items.
 */
dfm.dlSelectedItemsValidate = function(silent) {
  // Check permissions and operability of the items
  return !dfm.activeDir.busy && dfm.validateSelectionCommon('dlFiles', 'dlFolders', true, false, silent);
};

/**
 * Downloads the selected items in the current directory.
 */
dfm.dlSelectedItems = function() {
  if (dfm.dlSelectedItemsValidate()) {
    dfm.dlItems(dfm.getSelectedItems());
  }
};

/**
 * Validates directory download.
 */
dfm.dlDirValidate = function(Dir) {
  return dfm.validateSelectedDir(Dir, 'dlFolders');
};

/**
 * Downloads the given directory.
 */
dfm.dlDir = function(Dir) {
  if (dfm.dlDirValidate(Dir)) {
    dfm.dlItems([Dir]);
  }
};

/**
 * Sends request for downloading the given items.
 */
dfm.dlItems = function(items) {
  // Check if still dealing with a previous request.
  if (dfm.dlRequest) return;
  // Prepare new request.
  // Download can't be initiated by ajax. We submit data to an iframe
  var i, key, value, els, form, $wrp, opt = dfm.ajaxifyItems(items);
  if (!opt) return;
  // Set values
  form = dfm.dlGetForm();
  els = form.elements;
  els.dltoken.value = opt.dltoken = 'dl' + (new Date() * 1);
  els.securityKey.value = dfm.conf.securityKey;
  // Prepare data elements
  $wrp = $('.data-wrapper', form).empty();
  for (key in opt.data) {
    value = opt.data[key];
    if (dfm.isArray(value)) {
      for (i in value) {
        $wrp.append(dfm.dlDataInput(key, value[i]));
      }
    }
    else {
      $wrp.append(dfm.dlDataInput(key, value));
    }
  }
  // Set timer for checking response
  opt.responseTimer = setInterval(dfm.dlCheckResponse, 1000);
  // Set request timeout as 60 sec
  opt.resetTimer = setTimeout(dfm.dlResetRequest, 60000);
  dfm.dlRequest = opt;
  form.submit();
};

/**
 * Check if download response is received
 */
dfm.dlCheckResponse = function() {
  // Server responded with the cookie that matches the request token
  if (dfm.dlRequest && dfm.dlRequest.dltoken === dfm.cookie('dltoken')) {
    dfm.dlIframeLoad.call(dfm.dlIframe);
  }
};

/**
 * Reset request info and revert busy items.
 */
dfm.dlResetRequest = function() {
  var request = dfm.dlRequest;
  if (request) {
    dfm.dlRequest = null;
    clearInterval(request.responseTimer);
    clearTimeout(request.resetTimer);
    dfm.busyComplete.call(request);
    dfm.cookie('dltoken', '', -7);
    $('.data-wrapper', dfm.dlForm).empty();
  }
};

/**
 * Creates data submission form and iframe as a replacement for AJAX.
 * This is the only way to initiate file downloads. AJAX can not be used here.
 */
dfm.dlGetForm = function() {
  if (dfm.dlForm) return dfm.dlForm;
  dfm.dlIframe = $('<iframe name="dfm_dl_iframe" src="javascript: " style="position: absolute; top: -9999px; left: -9999px;"></iframe>').appendTo(document.body).load(dfm.dlIframeLoad)[0];
  return dfm.dlForm = $('<form method="post" target="dfm_dl_iframe" accept-charset="UTF-8" style="position: absolute; top: -9999px; left: -9999px;"><div class="data-wrapper"></div><input type="hidden" value="dl" name="ajaxOp" /><input type="hidden" name="htmlResponse" value="1" /><input type="hidden" name="securityKey" /><input type="hidden" name="dltoken" /></form>').attr('action', dfm.conf.scriptUrl).appendTo(document.body)[0];
};

/**
 * Load event of dl iframe.
 */
dfm.dlIframeLoad = function(event) {
  // Reset request
  dfm.dlResetRequest();
  // Parse the response
  var response = dfm.parseIframeResponse(this);
  // Check if any message has been returned
  if (response) {
    dfm.responseMessages(response);
  }
};

/**
 * Creates and returns a hidden input element with the given key and value
 */
dfm.dlDataInput = function(name, value) {
  var el = document.createElement('input');
  el.type = 'hidden';
  el.name = name;
  el.value = value;
  return el;
};

})(window.dfm, window.jQuery);