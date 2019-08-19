var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows());
    }

};
window.onload = function() {
	
if(isMobile.any()) {
	
window.location.href = "https://play.google.com/store/apps/details?id=com.irishlife.mylife";

}

if(isMobile.iOS()) {
	
window.location.href = "https://itunes.apple.com/ie/app/mylife-by-irish-life/id1459620652?mt=8";

}

}

