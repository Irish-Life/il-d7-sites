jQuery(document).ready(function($) {

  if ( ("standalone" in window.navigator) && window.navigator.standalone) {
  } else{

    if( window.location.pathname.indexOf("multi-asset-portfolio-fund") < 0){
      window.addToHomescreen({modal: false});
    }

    $("header").addClass( "show" );
    $(".menu-level-2").addClass( "show" );
  }




});


(function($) {
$("head").append("<link rel='apple-touch-icon' sizes='76x76' href='/sites/default/files/webapp/MapsIcon76x76.png?1422016110' />");
$("head").append("<link rel='apple-touch-icon' href='/sites/default/files/webapp/MapsIcon60x60.png?1422016110' />");
$("head").append("<link rel='shortcut icon' sizes='196x196' href='/sites/default/files/webapp/AndroidChromeApplicationMapsIcon196x196.png?1422016110' />");
$("head").append("<link rel='apple-touch-icon' sizes='120x120' href='/sites/default/files/webapp/MapsIcon60x60@2.png?1422016110' />");
$("head").append("<meta name='apple-mobile-web-app-title' content='Irish Life MAPS' />");
$("head").append("<link rel='apple-touch-icon' sizes='152x152' href='/sites/default/files/webapp/MapsIcon76x76@2.png?1422016110' />");
$("head").append("<meta name='apple-mobile-web-app-capable' content='yes' />");
$("head").append("<meta name='apple-mobile-web-app-status-bar-style' content='black' />");
$("head").append("<meta name='apple-mobile-web-app-capable' content='yes' />");


 /* iOS 6 & 7 iPad (retina, portrait) */
$("head").append("<link href='/sites/default/files/webapp/startup-ipad-portraitMapsIcon@2x.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 & 7 iPad (retina, landscape) */
$("head").append("<link href='/sites/default/files/webapp/startup-ipad-landscapeMapsIcon@2x.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 iPad (portrait) */
$("head").append("<link href='/sites/default/files/webapp/startup-ipad-portraitMapsIcon.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)' rel='apple-touch-startup-image'>");
/* iOS 6 iPad (landscape) */
$("head").append("<link href='/sites/default/files/webapp/startup-ipad-landscapeMapsIcon.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)' rel='apple-touch-startup-image'>");
/* iOS 6 & 7 iPhone 5 */
$("head").append("<link href='/sites/default/files/webapp/startup-iphone5-portraitMapsIcon@2x.png' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 & 7 iPhone (retina) */
$("head").append("<link href='/sites/default/files/webapp/startup-iphone-portraitMapsIcon@2x.png' media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 iPhone */
$("head").append("<link href='/sites/default/files/webapp/startup-iphone-portraitMapsIcon.png' media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)' rel='apple-touch-startup-image'>");
})(jQuery);



(function(document,navigator,standalone) {
  // prevents links from apps from oppening in mobile safari
  // this javascript must be the first script in your <head>

  if ((standalone in navigator) && navigator[standalone]) {
    var curnode, location=document.location, stop=/^(a|html)$/i;
    
    document.addEventListener('click', function(e) {
      curnode=e.target;
      while (!(stop).test(curnode.nodeName)) {
        curnode=curnode.parentNode;
      }
      // Condidions to do this only on links to your own app
      // if you want all links, use if('href' in curnode) instead.
      if(
        'href' in curnode && // is a link
        (chref=curnode.href).replace(location.href,'').indexOf('#') && // is not an anchor
        ( !(/^[a-z\+\.\-]+:/i).test(chref) ||                       // either does not have a proper scheme (relative links)
          chref.indexOf(location.protocol+'//'+location.host)===0 ) // or is in the same protocol and domain
      ) {
        e.preventDefault();
        location.href = curnode.href;
      }
    },false);
  } else{

  }
})(document,window.navigator,'standalone');