<?php

/**
 * @file
 * Integrates Drupella FM into FileField.
 */

/**
 * Outputs the Drupella FM browser for FileField.
 */
function dfm_filefield_page($entity_type, $bundle_name, $field_name) {
  $field = field_info_field($field_name);
  $scheme = $field['settings']['uri_scheme'];
  // Check access.
  if (!dfm_access(NULL, $scheme) || !($instance = field_info_instance($entity_type, $field_name, $bundle_name)) || empty($instance['widget']['settings']['dfm_filefield_on'])) {
    return drupal_access_denied();
  }
  $GLOBALS['conf']['dfm_register_hook']['dfm_filefield_register_dfm_hook'] = 1;
  dfm_inc('page');
  return dfm($scheme);
}

/**
 * Registers custom DFM hooks.
 */
function dfm_filefield_register_dfm_hook($dfm) {
  // Register new ajax operation
  $dfm->registerHook('ajax_filefield', 'dfm_filefield_ajax_filefield');
}

/**
 * Drupella FM ajax_filefield callback.
 */
function dfm_filefield_ajax_filefield($dfm) {
  $fids = array();
  foreach ($dfm->getSelectedItems() as $dirname => $content) {
    if (isset($content['files'])) {
      foreach ($content['files'] as $filename) {
        // Check existence.
        if (!$filepath = $dfm->validateDirFile($dirname, $filename)) {
          continue;
        }
        // Get file record by path
        if ($file = dfm_file_by_path($filepath)) {
          // Make sure the file is registered
          if (!file_usage_list($file)) {
            dfm_claim_file($file);
          }
        }
        // Create a new file record
        else {
          $file = (object) array(
            'uid' => $dfm->getConf('drupalUid'),
            'filename' => $filename,
            'uri' => $filepath,
            'filemime' => file_get_mimetype($filepath),
            'filesize' => filesize($filepath),
            'timestamp' => filemtime($filepath),
            'status' => 1,
            'dfm' => 1,
          );
          dfm_write_file_record($file, TRUE);
        }
        // Record the file id
        if (!empty($file->fid)) {
          $fids[$dirname][$filename] = $file->fid;
        }
      }
    }
  }
  if ($fids) {
    $dfm->setResponse('fileIds', $fids);
  }
}

/**
 * Extends filefield_widget element.
 */
function _dfm_filefield_field_process($element, &$form_state, $form) {
  if (!isset($element['#field_name']) || !isset($element['#upload_location'])) return $element;
  $instance = field_widget_instance($element, $form_state);
  if (empty($instance['widget']['settings']['dfm_filefield_on'])) return $element;
  if (!dfm_access(NULL, file_uri_scheme($element['#upload_location']))) return $element;

  // Adjust the Ajax settings so that on upload and remove of any individual
  // file, the entire group of file fields is updated together.
  // Copied from file_field_widget_process().
  $field = field_widget_field($element, $form_state);
  if ($field['cardinality'] != 1) {
    $parents = array_slice($element['#array_parents'], 0, -1);
    $ajax_path = 'file/ajax/' . implode('/', $parents) . '/' . $form['form_build_id']['#value'];
    $field_element = drupal_array_get_nested_value($form, $parents);
    $ajax_wrapper = $field_element['#id'] . '-ajax-wrapper';
  }
  else {
    $ajax_path = 'file/ajax/' . implode('/', $element['#array_parents']) . '/' . $form['form_build_id']['#value'];
    $ajax_wrapper = $element['#id'] . '-ajax-wrapper';
  }

  $element['dfm_filefield_fid'] = array(
    '#attributes' => array('id' => $element['#id'] . '-dfm-filefield-fid'),
    '#type' => 'hidden',
    '#value' => '',
  );
  $element['dfm_filefield_submit'] = array(
    '#type' => 'submit',
    '#value' => t('Select'),
    '#validate' => array(),
    '#submit' => array('dfm_filefield_field_submit'),
    '#limit_validation_errors' => array(array_slice($element['#parents'], 0, -1)),
    '#name' => $element['#name'] . '[dfm_filefield_submit]',
    '#id' => $element['#id'] . '-dfm-filefield-submit',
    '#attributes' => array('style' => 'display: none;'),
    '#ajax' => array(
      'path' => $ajax_path,
      'wrapper' => $ajax_wrapper,
      'method' => 'replace',
      'effect' => 'fade',
    ),
  );
  return $element;
}

/**
 * Submit handler for the dfm widget.
 */
function dfm_filefield_field_submit(&$form, &$form_state) {
  file_field_widget_submit($form, $form_state);
  $form_state['rebuild'] = TRUE;
}

/**
 * Field value callback.
 */
function _dfm_filefield_field_value($element, &$item, &$form_state) {
  if ($file = file_load($item['dfm_filefield_fid'])) {
    if (dfm_filefield_element_validate($element, $file)) {
      $item = array_merge($item, (array) $file);
    }
  }
  else {
    form_error($element, t('The referenced file could not be used because the file does not exist in the database.'));
  }
  $item['dfm_filefield_fid'] = '';
}

/**
 * Pre render callback. Add page elements.
 */
function _dfm_filefield_field_pre_render(&$element) {
  static $done;
  if (!empty($element['#value']['fid'])) {
    $element['dfm_filefield_fid']['#access'] = FALSE;
    $element['dfm_filefield_submit']['#access'] = FALSE;
  }
  if (!isset($done[$element['#id']])) {
    $done[$element['#id']] = TRUE;
    dfm_filefield_jscss();
    $jset['dfm_filefield']['fields'][$element['#id']] = array('path' => $element['#entity_type']  . '/' . $element['#bundle'] . '/' . $element['#field_name']);
    drupal_add_js($jset, 'setting');
  }
}

/**
 * Validate a file with element validators.
 */
function dfm_filefield_element_validate($element, $file) {
  $errors = array();

  // Check download access first
  if ($file->uid != $GLOBALS['user']->uid && file_uri_scheme($file->uri) !== 'public' && !dfm_filefield_download_access($file)) {
    form_error($element, t('You do not have permission to use the selected file.'));
    return FALSE;
  }

  // Validate.
  foreach ($element['#upload_validators'] as $function => $args) {
    array_unshift($args, NULL);
    $args[0] = &$file;
    $errors = array_merge($errors, call_user_func_array($function, $args));
  }

  // Set errors.
  if (!empty($errors)) {
    $message = isset($errors[1]) ? '<ul><li>' . implode('</li><li>', $errors) . '</li></ul>' : $errors[0];
    form_error($element, $message);
    return FALSE;
  }

  return TRUE;
}

/**
 * Adds main js, css files and settings.
 */
function dfm_filefield_jscss() {
  static $done;
  if (!isset($done)) {
    $done = TRUE;
    $path = drupal_get_path('module', 'dfm_filefield');
    drupal_add_css($path . '/dfm_filefield.css');
    drupal_add_js($path . '/dfm_filefield.js');
    drupal_add_js(array('dfm_filefield' => array('url' => url('dfm-filefield'))), 'setting');
  }
}

/**
 * Check download access to a file.
 */
function dfm_filefield_download_access($file) {
  $headers = array();
  foreach (module_implements('file_download') as $module) {
    $function = $module . '_file_download';
    if ($result = $function($file->uri)) {
      if ($result == -1) {
        return FALSE;
      }
      if (is_array($result)) {
        $headers = array_merge($headers, $result);
      }
    }
  }
  return !empty($headers);
}