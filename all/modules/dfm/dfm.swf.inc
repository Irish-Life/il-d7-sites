<?php

/**
 * @file
 * Implements swf related functionality.
 */

/**
 * Authenticates a user by checking the request parameters.
 */
function dfm_swf_authenticate_by_request() {
  if (!isset($_POST['swfAuth']['uid']) || empty($_POST['swfAuth']['token'])) return FALSE;
  // Need a HTTP_REFERER check?
  if (dfm_swf_authenticate($_POST['swfAuth']['uid'], $_POST['swfAuth']['token'])) return TRUE;
  // Auth failed but the current user is authenticated (unclosed swf session of a previous user).
  if (!empty($GLOBALS['user']->uid)) {
    // Perform logout?
  }
  return FALSE;
}

/**
 * Authenticates and logs in a user by uid and authentication key(md5(session_id)).
 * Returns TRUE/FALSE for success/fail.
 */
function dfm_swf_authenticate($uid, $authkey) {
  global $user;
  $sess_id = session_id();
  // It's the current session
  if ($authkey === md5($sess_id)) {
    // It's the current user
    return "$uid" == "$user->uid";
  }
  // Find the matching session and start it.
  $result = db_query('SELECT sid FROM {sessions} WHERE uid = :uid', array(':uid' => $uid));
  foreach ($result as $sess) {
    if ($authkey === md5($sess->sid)) {
      // Destroy session if started
      if (drupal_session_started()) {
        session_destroy();
        // Need to set session started state to false manually.
        drupal_session_started(FALSE);
      }
      // Set new session id.
      session_id($sess->sid);
      // Make sure we have the cookie value to prevent $user being anonymous on session start.
      $sess_name = session_name();
      $_COOKIE[$sess_name] = $sess->sid;
      // Set the handlers(session_destroy destroyed). Start the session, load the user.
      drupal_session_initialize();
      // We should prevent swf to keep a session in the system browser.
      // It should send athentication parameters in every request as an anonymous user.
      setcookie($sess_name, '', time() - 42000, '/');
      return TRUE;
    }
  }
  return FALSE;
}