(function($) {
$("head").append("<link rel='apple-touch-icon' sizes='57x57' href='/sites/all/modules/webapps/images/icons/iOS/57x57.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='60x60' href='/sites/all/modules/webapps/images/icons/iOS/60x60.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='72x72' href='/sites/all/modules/webapps/images/icons/iOS/72x72.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='76x76' href='/sites/all/modules/webapps/images/icons/iOS/76x76.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='114x114' href='/sites/all/modules/webapps/images/icons/iOS/114x114.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='120x120' href='/sites/all/modules/webapps/images/icons/iOS/120x120.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='144x144' href='/sites/all/modules/webapps/images/icons/iOS/144x144.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='152x152' href='/sites/all/modules/webapps/images/icons/iOS/152x152.png' />");
$("head").append("<link rel='apple-touch-icon' sizes='180x180' href='/sites/all/modules/webapps/images/icons/iOS/180x180.png' />");
$("head").append("<link rel='icon' sizes='196x196' href='/sites/all/modules/webapps/images/icons/Android/192x192.png' />");
 /* iOS 6 & 7 iPad (retina, portrait) */
$("head").append("<link href='/sites/all/modules/webapps/startup-ipad-portrait@2x.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 & 7 iPad (retina, landscape) */
$("head").append("<link href='/sites/all/modules/webapps/startup-ipad-landscape@2x.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 iPad (portrait) */
$("head").append("<link href='/sites/all/modules/webapps/startup-ipad-portrait.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)' rel='apple-touch-startup-image'>");
/* iOS 6 iPad (landscape) */
$("head").append("<link href='/sites/all/modules/webapps/startup-ipad-landscape.png' media='(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)' rel='apple-touch-startup-image'>");
/* iOS 6 & 7 iPhone 5 */
$("head").append("<link href='/sites/all/modules/webapps/startup-iphone5-portrait@2x.png' media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 & 7 iPhone (retina) */
$("head").append("<link href='/sites/all/modules/webapps/startup-iphone-portrait@2x.png' media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)' rel='apple-touch-startup-image'>");
/* iOS 6 iPhone */
$("head").append("<link href='/sites/all/modules/webapps/startup-iphone-portrait.png' media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)' rel='apple-touch-startup-image'>");


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