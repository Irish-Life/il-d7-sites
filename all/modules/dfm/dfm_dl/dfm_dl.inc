<?php

/**
 * Download callback for DFM.
 */
function dfm_dl_dfm_ajax_dl($dfm) {
  // Create archive info
  $archive = array();
  foreach ($dfm->getSelectedItems() as $dirname => $content) {
    // Handle selected files
    if (isset($content['files']) && $dfm->dirPerm($dirname, 'dlFiles')) {
      foreach ($content['files'] as $filename) {
        // Archive must have unique filenames at the top level.
        if (isset($archive['files'][$filename])) continue;
        // Check existence. Do not allow archiving of unlisted files.
        if ($filepath = $dfm->validateDirFile($dirname, $filename)) {
          $archive['files'][$filename] = $filepath;
        }
      }
    }
    // Handle selected subfolders
    if (isset($content['subdirs']) && $dfm->dirPerm($dirname, 'dlFolders')) {
      foreach ($content['subdirs'] as $subdirname) {
        // Archive must have unique containers. Keep the first one and ignore the rest.
        if (isset($archive['folders'][$subdirname])) continue;
        // Check existence. Do not allow archiving of unlisted folders.
        if ($dfm->validateDirSubdir($dirname, $subdirname)) {
          $archive['folders'][$subdirname] = $subdirname;
          // Get archive info of all files and folders under this directory recursively.
          $_dirname = $dfm->joinPaths($dirname, $subdirname);
          dfm_dl_extend_conf($archive, dfm_dl_dirname_archive_info($dfm, $_dirname, $subdirname));
        }
      }
    }
  }
  // Serve the archive
  if (!empty($archive)) {
    // Set the download token as a cookie value to allow response checking on client side.
    if (!empty($_POST['dltoken'])) {
      setcookie('dltoken', $_POST['dltoken']);
    }
    // Directly serve if it is a single file
    if (empty($archive['folders']) && count($archive['files']) == 1) {
      $fileuri = reset($archive['files']);
      $filename = key($archive['files']);
      $headers = array(
        'Content-type' => file_get_mimetype($fileuri),
        'Content-Length' => filesize($fileuri),
        'Content-Disposition' => 'attachment; filename="' . str_replace('"', '', $filename) . '"',
      );
      file_transfer($fileuri, $headers);
    }
    // Serve multiple files and folders as a zip archive
    else {
      dfm_dl_serve_archive($archive);
    }
  }
}

/**
 * Returns recursive archive info for the given DFM dirname.
 */
function dfm_dl_dirname_archive_info($dfm, $dirname, $localname) {
  $archive = array();
  $dlFiles = $dfm->dirPerm($dirname, 'dlFiles');
  $dlFolders = $dfm->dirPerm($dirname, 'dlFolders');
  if ($dlFiles || $dlFolders) {
    // Set scan options
    $options = $dfm->getFilterOptions();
    $options['listFiles'] = $dlFiles && $dfm->dirPerm($dirname, 'listFiles');
    $options['listFolders'] = $dlFolders && $dfm->dirPerm($dirname, 'listFolders');
    // Scan contents
    $content = $dfm->dirPathContent($dfm->dirPath($dirname), $options);
    // Process subdirs
    foreach ($content['subdirs'] as $name => $path) {
      $_dirname = $dirname . '/' . $name;
      $_localname = $localname . '/' . $name;
      $archive['folders'][$_localname] = $_localname;
      dfm_dl_extend_conf($archive, dfm_dl_dirname_archive_info($dfm, $_dirname, $_localname));
    }
    // Process files
    foreach ($content['files'] as $name => $path) {
      $archive['files'][$localname . '/' . $name] = $path;
    }
  }
  return $archive;
}

/**
 * Serve a zip archive.
 */
function dfm_dl_serve_archive($info) {
  if (!class_exists('ZipArchive')) {
    drupal_set_message(t('Missing PHP Class: ZipArchive.'), 'error');
    return FALSE;
  }
  // Create temp file
  $temp = drupal_tempnam('temporary://', 'dfm');
  register_shutdown_function('file_unmanaged_delete', $temp);
  // Initiate zip
  $zip = new ZipArchive;
  if ($zip->open(drupal_realpath($temp), ZipArchive::OVERWRITE) !== TRUE) {
    drupal_set_message(t('Unable to create a zip archive in temp directory.'), 'error');
    return FALSE;
  }
  // Add folders
  if (!empty($info['folders'])) {
    foreach ($info['folders'] as $localname) {
      $zip->addEmptyDir($localname);
    }
  }
  // Add files
  if (!empty($info['files'])) {
    foreach ($info['files'] as $localname => $path) {
      $zip->addFile(drupal_realpath($path), $localname);
    }
  }
  // Finalize
  if ($zip->close() !== TRUE) {
    drupal_set_message(t('Error closing the zip archive.'), 'error');
    return FALSE;
  }
  // Serve file
  $headers = array(
    'Content-type' => 'application/zip',
    'Content-Length' => filesize($temp),
    'Content-Disposition' => 'attachment; filename="' . basename($temp) . '.zip"',
  );
  file_transfer($temp, $headers);
}

/**
 * Extend a configuration array with another.
 */
function dfm_dl_extend_conf(&$a, $b) {
  foreach ($b as $key => $val) {
    if (isset($a[$key]) && is_array($a[$key]) && is_array($val)) {
      dfm_dl_extend_conf($a[$key], $val);
    }
    else {
      $a[$key] = $val;
    }
  }
}