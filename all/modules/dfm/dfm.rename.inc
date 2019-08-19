<?php

/**
 * @file
 * Defines rename callbacks of DFM Drupal plugin.
 */

/**
 * Implements plugin_hook_rename_filepath().
 * Responds to a file renaming.
 */
function dfm_drupal_rename_filepath($dfm, $filepath, $newpath) {
  dfm_rename_filepath_record($filepath, $newpath);
}

/**
 * Implements plugin_hook_rename_dirpath().
 * Responds to a directory renaming.
 */
function dfm_drupal_rename_dirpath($dfm, $dirpath, $newpath) {
  // db_like() is not supported for db_query. http://drupal.org/node/1182428
  db_update('file_managed')
    ->expression('uri', 'CONCAT(:newpath, SUBSTR(uri, CHAR_LENGTH(:oldpath)))', array(':newpath' => $newpath, ':oldpath' => $dirpath . '/'))
    ->condition('uri', db_like($dirpath) . '/%', 'LIKE')
    ->execute();
}