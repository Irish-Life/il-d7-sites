  $( "#containerCenterer div div div" ).each(function( index ) {
	if ($(this).html().indexOf('Allied Irish') > -1)
	{
		$(this).css('color','#202020');
		var oldStr = $(this).html();
		var newStr = oldStr.replace("Allied Irish Banks, p.l.c. is a tied agent of Irish Life Assurance plc, for life and pensions business.","Allied Irish Banks p.l.c. is tied to Irish Life Assurance plc for life and pensions business.");
		var newStr = oldStr.replace("Allied Irish Banks, p.l.c. is regulated by the Central Bank of Ireland. Irish Life Assurance plc is regulated by the Central Bank of Ireland.","Allied Irish Banks, p.l.c. is regulated by the Central Bank of Ireland.");
		$(this).html(newStr);
	}
	
})
$('.contentBottom').html("Irish Life Assurance plc is regulated by the Central Bank of Ireland. <br>Irish Life Assurance plc Registered Office - Lower Abbey Street, PO Box 129, Freepost, Dublin 1. <br>Irish Life Assurance plc Registered Number 152576.");
$('.contentBottom').css('margin-top','10px');
$('.contentBottom').css('background','none');
$('.contentBottom').css('height','25px');
$('.contentBottom').css('font-size','10px');


function checkCookieCompliance()
{
try {
          var enabled = Drupal.settings.eu_cookie_compliance.popup_enabled;
          if(!enabled) {
            return;
          }
          if (!Drupal.eu_cookie_compliance.cookiesEnabled()) {
            return;
          } 
          var status = Drupal.eu_cookie_compliance.getCurrentStatus();
          var clicking_confirms = Drupal.settings.eu_cookie_compliance.popup_clicking_confirmation;
          var agreed_enabled = Drupal.settings.eu_cookie_compliance.popup_agreed_enabled;
          var popup_hide_agreed = Drupal.settings.eu_cookie_compliance.popup_hide_agreed;
          if (status == 0) {
            var next_status = 1;
            if (clicking_confirms) {
              $('a, input[type=submit]').bind('click.eu_cookie_compliance', function(){
                if(!agreed_enabled) {
                  Drupal.eu_cookie_compliance.setStatus(1);
                  next_status = 2;
                }
                Drupal.eu_cookie_compliance.changeStatus(next_status);
              });
            }

            $('.agree-button').click(function(){
              if(!agreed_enabled) {
                Drupal.eu_cookie_compliance.setStatus(1);
                next_status = 2;
              }
              Drupal.eu_cookie_compliance.changeStatus(next_status);
            });

            Drupal.eu_cookie_compliance.createPopup(Drupal.settings.eu_cookie_compliance.popup_html_info);
          } else if(status == 1) {
            Drupal.eu_cookie_compliance.createPopup(Drupal.settings.eu_cookie_compliance.popup_html_agreed);
            if (popup_hide_agreed) {
              $('a, input[type=submit]').bind('click.eu_cookie_compliance_hideagreed', function(){
                Drupal.eu_cookie_compliance.changeStatus(2);
              });
            }

          } else {
            return;
          }
        }
        catch(e) {
          return;
        }
}

window.onload = function() {
  checkCookieCompliance();
};