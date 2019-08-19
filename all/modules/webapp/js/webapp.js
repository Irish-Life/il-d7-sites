/**
 * Inlinelinks based on: https://gist.github.com/1974179
 **/

(function($){
    Drupal.behaviors.webappInlineBehavior = {
        attach: function (context,settings){
            if (window.navigator.standalone){
                var node;
                document.addEventListener('click', function (event) {
                    node = event.target;
                    while (node.nodeName !== "A" && node.nodeName !== "HTML") {
                        if(node.parentNode) { node = node.parentNode; }
                        else { break; }
                    }
                    if (node.href && node.href.match(/^http/i) && (node.href.indexOf(document.location.host) !== -1 || Drupal.settings.webapp.remotes)) {
                        event.preventDefault();
                        document.location.href = node.href;
                        return false;
                    }
                }, false);
            };
        }
    };

    Drupal.behaviors.webappStandaloneBehavior = {
        attach: function (context, settings) {
            $('body', context).once('webapp', function () {
                if ((window.navigator.standalone !== "undefined") && window.navigator.standalone){
                    $(this).addClass("webapp-standalone");
                }
                else{
                    $(this).addClass("webapp-not-standalone");
                }
            });
         }
    };
    $(document).ready(function(){
        if (typeof(webapp_original_viewport) !== "undefined" && webapp_original_viewport){
            document.querySelector("meta[name=viewport]").content = webapp_original_viewport;
        }
    });
})(jQuery);
