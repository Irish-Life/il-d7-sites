var onlineAvailable = true;

function isOnlineAvailable()
{
	if (onlineAvailable)
			{
				$('#onlineLinks').html('<a href="javascript:MM_openBrWindow(\'/launchOnlineServices/\',\'IrishLifePosWindow\',\'\')">'+
				'<img ' +
				'src="img/onlineServices/login.png" alt="Login" title="Login" class="login" /></a>'+
				'<p class="orange">Access your client information, submit proposals and more</p>' +
				'<ul class="related">'+
				'<li><a href="/how_to_register.html">How to register</a></li>'+
				'<li><a href="/how_to_book_a_demonstration.html">Book a demo</a></li>'+
				'</ul>');
			}
			else
			{
				$('#onlineLinks').html('<p class="orange">Online Services is currently unavailable.<p>');
			}
}