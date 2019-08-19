// this variable is used later from webapp.js to restore
// the original viewport once the dom is loaded
var webapp_original_viewport = false;

(function (w, d){
    if (typeof(WEBAPP_STARTUP) === "undefined"){
        return;
    }
    var
        nav = w.navigator,
        gfxpath = WEBAPP_STARTUP.startup_root;
        cache_suffix = '?' + WEBAPP_STARTUP.cache_token;
        pixelRatio = w.devicePixelRatio === 2 ? '@2x' : '',
        device = WEBAPP_STARTUP.device_name;
        orient = device == 'ipad' && w.orientation % 180 ? 'landscape' : 'portrait';
    if(device == 'iphone' && w.screen.height == 568) {
        device = 'iphone5';
        webapp_original_viewport = d.querySelector("meta[name=viewport]").content;
        d.querySelector("meta[name=viewport]").content="width=320.1";
    }
    if (device === ''){
        return;
    }
	
	var l = d.getElementsByTagName('link')[0];
	
    if (device == 'iphone' || device == 'iphone5' || nav.standalone){
		link = d.createElement('link');
		link.href=gfxpath + "startup-" + device + "-" + orient + pixelRatio + ".png" + cache_suffix;
		link.media = device == 'ipad' ? "screen and (orientation:" + orient + ")" : "";
		link.rel = "apple-touch-startup-image";
		
		l.parentNode.insertBefore(link,l);
		
		
        /*d.write('<link rel="apple-touch-startup-image" href="' + gfxpath + 'startup-' + device + '-' + orient + pixelRatio + '.png' + cache_suffix + '"' + (device == 'ipad' ? ' media="screen and (orientation:' + orient + ')"' : '') + '>');*/
    } else{
		link = d.createElement('link');
		link.rel = "apple-touch-startup-image";
		link.href = gfxpath + "startup-" + device + "-landscape" + pixelRatio + ".png" + cache_suffix;
		link.media = "screen and (orientation:landscape)";

		l.parentNode.insertBefore(link,l);

		
        /*d.write('<link rel="apple-touch-startup-image" href="' + gfxpath + 'startup-' + device + '-landscape' + pixelRatio + '.png' + cache_suffix + '" media="screen and (orientation:landscape)">');*/
		
		link = d.createElement('link');
		link.rel = "apple-touch-startup-image";
		link.href = gfxpath + "startup-" + device + "-portrait" + pixelRatio + ".png" + cache_suffix;
		link.media = "screen and (orientation:portrait)";
		l.parentNode.insertBefore(link,l);
		
        /*d.write('<link rel="apple-touch-startup-image" href="' + gfxpath + 'startup-' + device + '-portrait' + pixelRatio + '.png' + cache_suffix + '" media="screen and (orientation:portrait)">');*/
    }
})(window, document);