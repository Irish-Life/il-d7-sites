(function ($, Drupal) {
"use strict";

var dfm_filefield = window.dfm_filefield = {queues: {}};

/**
 * Drupal behavior that process file fields.
 */
Drupal.behaviors.dfm_filefield = {attach: function(context, settings) {
  var set = settings.dfm_filefield;
  if (!set || !set.fields) return;
  $.each(set.fields, function(fieldId, conf) {
    // Check dfm submit button.
    var $button = $('#' + fieldId + '-dfm-filefield-submit', context);
    if (!$button.length) {
      // Prevent remaining queue items added automatically after a file is removed.
      var $remove = $('#' + fieldId + '-remove-button', context);
      if ($remove.length) $remove.mousedown(function(){
        dfm_filefield.removeQueue(fieldId);
      });
      return;
    }
    if ($button.hasClass('dff-processed')) return;
    $button.addClass('dff-processed');
    // Do not process further if there are files to insert
    if (dfm_filefield.processQueue(fieldId)) return;
    // Widget wrapper
    var $wrapper = $(document.createElement('div')).addClass('dfm-filefield-wrapper');
    // Browser link.
    var $opener = $(document.createElement('a')).addClass('dfm-filefield-opener').attr({href: '#'});
    $opener.text(dfm_filefield.linkText()).click(function() {
      var url = set.url + '/' + conf.path + (set.url.indexOf('?') == -1 ? '?' : '&');
      url += 'initHandler=dfm_filefield.initHandler&filefieldId=' + encodeURIComponent(fieldId);
      dfm_filefield.winOpen(url);
      return false;
    });
    // Add elements to document.
    $wrapper.insertBefore($button.parent()).append($opener).append($button);
  });
}};

/**
 * Inithandler callback for Drupella FM.
 */
dfm_filefield.initHandler = function(win) {
  var Tbi, dfm = win.dfm, fieldId = dfm.urlParam('filefieldId'), exts = dfm_filefield.getExts(fieldId);
  // Change default doubleclick handler
  dfm.extFileHandler = function(file, win) {Tbi.onclick()};
  // Add sendto toolbar item
  Tbi = dfm.addTbi('sendto', {title: Drupal.t('Select'), tooltip: Drupal.t('Use the selected files'), onclick: function() {
    // Require at least 1 selected item
    if (!dfm.validateSelection(1)) return;
    var i, winclose, opt, file, files = [], fids = [], selected = dfm.getSelectedItems();
    // Validate each selected item
    for (i = 0; file = selected[i]; i++) {
      if (file.isfile && (!exts || (file.ext && dfm.isIn(file.ext.toLowerCase(), exts)))) {
        // Newly uploaded files have file id.
        if (file.fid) fids.push(file.fid);
        else files.push(file);
      }
    }
    // No selected files to query ids of.
    if (!files.length) {
      // There are some newly uploaded files that passed the validation. Process them immediately.
      if (fids.length) {
        dfm_filefield.setQueue(fieldId, fids, true);
        win.close();
      }
      // None of the selected files were validated
      else {
        dfm.setMessage(Drupal.t('Only files with the following extensions are allowed: %files-allowed.', {'%files-allowed': exts.join(', ')}));
      }
      return;
    }
    // Get file ids for the names dynamically
    Tbi.setWorking(true);
    winclose = false;
    opt = dfm.ajaxifyItems(files, true);
    // Combine existing fids with the ones in th response.
    opt.successCallback = function(response) {
      var path, content, name, items = response.fileIds;
      if (items) {
        for (path in items) if (content = items[path]) for (name in content) fids.push(content[name]);
        dfm_filefield.setQueue(fieldId, fids, true);
        winclose = true;
      }
    };
    // Complete the jax operation
    opt.completeCallback = function () {
      Tbi.setWorking(false);
      if (winclose) win.close();
    };
    dfm.ajax('filefield', opt);
  }});
};

/**
 * Processes the file insertion queue.
 */
dfm_filefield.processQueue = function(fieldId) {
  var queues = dfm_filefield.queues, key = dfm_filefield.fieldKey(fieldId), queue = queues[key], fid;
  if (queue) {
    fid = queue.shift();
    if (!queue.length) delete queues[key];
    if (fid) {
      dfm_filefield.submit(fieldId, fid);
      return true;
    }
  }
};

/**
 * Sets a file insertion queue for a field
 */
dfm_filefield.setQueue = function(fieldId, queue, process) {
  dfm_filefield.queues[dfm_filefield.fieldKey(fieldId)] = queue;
  if (process) dfm_filefield.processQueue(fieldId);
};

/**
 * Removes insertion queue of a field
 */
dfm_filefield.removeQueue = function(fieldId) {
  delete dfm_filefield.queues[dfm_filefield.fieldKey(fieldId)];
};

/**
 * Returns field key part without the delta.
 */
dfm_filefield.fieldKey = function(fieldId) {
  var parts = fieldId.split('-');
  parts.pop();
  return parts.join('-');
};

/**
 * Submits a field widget with a file id.
 */
dfm_filefield.submit = function(fieldId, fid) {
  $('#' + fieldId + '-dfm-filefield-fid').val(fid);
  $('#' + fieldId + '-dfm-filefield-submit').mousedown();
};

/**
 * Returns text for the browser link.
 */
dfm_filefield.linkText = function() {
  return Drupal.t('Select file');
};

/**
 * Returns available extensions for the fieldId.
 */
dfm_filefield.getExts = function(fieldId) {
  var set = Drupal.settings.file, exts = set && set.elements && set.elements['#' + fieldId + '-upload'];
  if (exts) return exts.split(/[\s,]+/);
};

/**
 * Opens DFM window.
 */
dfm_filefield.winOpen = function(url, win) {
  var scrW = screen.availWidth, scrH = screen.availHeight,
  W = Math.max(500, Math.min(960, parseInt(scrW * 0.75))),
  H = Math.max(300, Math.min(720, parseInt(scrH * 0.75))),
  L = parseInt((scrW - W) / 2),
  T = parseInt((scrH - H) * 3 / 7);
  return (win || window).open(url, '', 'width=' + W + ',height=' + H + ',left=' + L + ',top=' + T + ',resizable=1');
};

})(window.jQuery, window.Drupal);