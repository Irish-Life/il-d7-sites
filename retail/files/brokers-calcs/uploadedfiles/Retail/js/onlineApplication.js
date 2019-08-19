function updateHtml()
{
	
}

function ie(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i>'+v+'</i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}

$(document).ready(function () {

		$('#cookieNotice').html
			('<p>Important information regarding cookies</p>'+
		'<p>Within this over 50s life insurance application, Irish Life uses cookies to enhance your browsing experience and to create a secure and effective website for their customers. ' +
		'By using this quote and application form you agree that Irish Life may store and access cookies on your device, unless you have disabled your cookies.</p>'+
		'<p><a href="http://www.irishlife.ie/about-cookies.html" target="_blank">You can find out more about Irish Life\'s cookies here.</p>'+
		'<a class="buttonred cookie" onclick="javascript:acceptCookies();" href="#"></a>');
		if (window.location.href.indexOf("123") > -1 && ie())
		{$('#cookieNotice').css('height','0px');
		$('#cookieNotice').css('visibility','hidden');}
	
	$('.wideli').each(function(i)
	{
		$(this).html($(this).html().replace('vYou','You'))
	});
	
	var ts=new Date().getTime();
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);
		$(this).removeAttr('onclick');
		$(this).attr('onclick',"if (_gaq) _gaq.push(['_trackEvent', 'PDF download', '"+link + "']);return true");	}
	);
	$('a[href$=".jsp"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);
	}
	);
	$('#getQuoteForm').attr("action",$('#getQuoteForm').attr("action") + "?ts="+ts);
	$('#applyNowForm').attr("action",$('#applyNowForm').attr("action") + "?ts="+ts);
	$('#onlineapplicationform').attr("action",$('#onlineapplicationform').attr("action") + "?ts="+ts);
		
});