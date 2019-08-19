<?php

/**
 * @file
 * Defines move callbacks of DFM Drupal plugin.
 */

/**
 * Implements plugin_hook_move_filepath_validate().
 * Checks if the destination can be overwritten.
 */
function dfm_drupal_move_filepath_validate($dfm, $filepath, $newpath, $existing) {
  if ($existing && !$dfm->getConf('ignoreFileUsage') && ($file = dfm_file_by_path($newpath)) && dfm_get_file_references($file)) {
    $dfm->setMessage(t('The destination %filename is in use by another application and can not be overwritten.', array('%filename' => $file->filename)));
    return FALSE;
  }
  return TRUE;
}

/**
 * Implements plugin_hook_move_filepath().
 * Responds to a file move.
 */
function dfm_drupal_move_filepath($dfm, $filepath, $newpath, $existing) {
  // Delete the overwritten file's record.
  if ($existing) {
    dfm_delete_filepath_record($newpath);
  }
  // Update the moved file's record.
  dfm_rename_filepath_record($filepath, $newpath);
}