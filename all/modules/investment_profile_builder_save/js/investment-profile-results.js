//$('.test').html('asd');
(function ($) {

	function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
	}
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires+";path=/";
	}
    
		var baseURL = '';
		$( document ).ready(function() {
      $('.goBackPage').click(function(){
        window.history.back();
      });
    // Set the base url
		    baseURL = Drupal.settings.investment_profile_results.baseurl;
      // This is the section where the download button is setup 
      // based on the data in the local storage var
      
        if(getCookie('userInvestmentResults')){
          var c = JSON.parse( getCookie( 'userInvestmentResults' ) ); //current storage
          
          
          // Don't use q1, q2, q3.. etc for url. Make less readable and shorter
          // for url z=q1 x=q2 c=q3 v=q4 b=q5 n=q6 m=q7 a=q8 s=q9 d=q10 f=q11 g=12..h..j..k..l..q.w..e..r..t...
          
          var buildURL = "z="+c.q1+"&x="+c.q2+"&c="+c.q3+"&v="+c.q4+"&b="+c.q5+"&n="+c.q6+"&m="+c.q7+"&a="+c.q8+"&s="+c.q9+"&d="+c.q10+
		  "&f="+c.q11+"&g="+c.q12+"&h="+c.q13+"&j="+c.q14+"&k="+c.q15+"&re="+c.currentScore;
              
          $('.downloadPDF').fadeIn('fast');
          $('.downloadPDF').click(function(){
           
            window.open(baseURL + '/investments/investor-profile-builder/pdf/?' + buildURL);
          });
        }
        else{
        // because there is no local storage just show the link to the investment profile tool
        
          $('.findOutHolder').fadeIn('fast');
          $('.findOutBtn').click(function(){
           
            window.open(baseURL + '/investments/investor-profile-builder/');
          });
        }
	});
  
})(jQuery);