(function ($) {
  
  $(document).ready(function() {
  
    $('.top_pdf_link').click(function(){
      var myT = $(this).html().replace(/ /g,"-");
      var htmlURL = '/bline/popular-pdf/';
      setMKVisitWebPageView(window.location.pathname+''+htmlURL);
      setGAPageView(window.location.pathname+''+htmlURL+''+myT, $(this).html());
      setSCamPageView(htmlURL);
    });
  });
  setMKVisitWebPageView = function(p){
      try{
        
            mkVisitWebPage(p);
        }
        catch(err){
          //Do nothing
        }
    //return "user set";
  }   
  setGAPageView = function(p,t){
      try{
        //tag manager
        dataLayer.push({
          'event':'pageview',
          'pageTitle':t,
          'virtualURL':p
          });		
        }
        catch(err){
          //Do nothing
        }
    //return "user set";
  }
  setSCamPageView = function(p){
      try{
          //session cam call
          if(window.sessionCamRecorder) {
              if(window.sessionCamRecorder.createVirtualPageLoad)
              window.sessionCamRecorder.createVirtualPageLoad(p);
          }
        }
        catch(err){
          //Do nothing
        }
    //return "user set";
  }
  function mkVisitWebPage(pagename)
  {
    if (isFunction()){
      mktoMunchkinFunction('visitWebPage', {url: pagename});
    }
  }
})(jQuery);



