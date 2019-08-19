var thisPageUrl = window.location.pathname;
setTimeout(function () {
    window.location.href = "/myonlineservices/Account/Logout?timedOut=true";
}, 1000 * 60 * 20);
//**************************************************************************
////Fix IE11 Error: Object doesn't support property or method 'startsWith'
//**************************************************************************
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}

//**************************************************************************
// Suppress IE9 console error
//**************************************************************************
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };

function doNothing() {

}


$(document).ready(function () {
	
// Hide LifeCare tile

 var lifeCare = document.getElementsByClassName('col s12 m8 m-padding-left');
    for (var x = 0; x < lifeCare.length; x++) {
        var content = lifeCare[x];

        if (content.textContent.includes('Life Care')) {
            content.style.display = 'none';
        }
    }

// Hide childrens cover and conversion option

 var childrensCover = document.getElementsByClassName('row-item');
    for (var x = 0; x < childrensCover.length; x++) {
        var content = childrensCover[x];

        if (content.textContent.includes('Childrens cover') || content.textContent.includes('Automatically included for life cover (and specified illness if taken).') || content.textContent.includes('Conversion:')) {
            content.style.display = 'none';
        }
    }

// Hide additional benefits tile if no guaranteed cover

 var guaranteedCover = document.getElementsByClassName('card card-plan card-plan-footer');
    for (var x = 0; x < guaranteedCover.length; x++) {
        var content = guaranteedCover[x];

        if (!content.textContent.includes('Guaranteed cover again')) {
            content.style.display = 'none';
        }
    }	
	
	//fix for MOs T&C's
	var spans = document.getElementsByClassName('row s-margin-bottom-20');

    for (var x = 0; x < spans.length; x++) {
        var span = spans[x];
        var content = span.innerHTML.trim();

		if (content == 'Life Assurance, Protection, Pensions and Investments are provided by Irish Life Assurance plc. Health Insurance is provided by Irish Life Health Dac.' || content == 'Irish Life Health dac is a private company limited by shares and registered in Ireland. Registered Office: Irish Life Centre, Lower Abbey Street, Dublin1. Registered Number: 376607. Irish Life Health dac is regulated by the Central Bank of Ireland.' || content == 'Irish Life Financial Services Limited is registered in Ireland. Registered Office: Irish Life Centre, Lower Abbey street, Dublin 1. Registered Number: 489221. Irish Life Financial Services Limited is regulated by the Central Bank of Ireland.') {
					span.style.display = 'none';
				}

        // If you want space at the bottom
        if (content == 'Irish Life Assurance plc is registered in Ireland.Registered Office: Irish Life Centre, Lower Abbey Street, Dublin 1. Registered Number: 152576. Irish Life Assurance plc is regulated by the Central Bank of Ireland.') {
            span.style.padding = '0 0 100px 0';
        }
    }


    //TEMPORARY: Delete after Sep-2018 release
    $("#ForgotEmailBtn").removeAttr("disabled")
    $("#ForgotPasswordBtn").removeAttr("disabled")

    //hide stuff on charts
    $('.performance-text-group2').css({ "display": "none" });
    $('.performance-text-group1 .performance-text-row2').html("This period");


    if (thisPageUrl.indexOf('modal') > -1) {
        $('#google-login').hide();
    }

    if (thisPageUrl.indexOf('/LogIn1App') > -1) {
        $('.logIn-top, #login-form').attr('style', 'display: none !important');
    }

    try {
        _gscq.push(['user', 'emailAddress', emailAddress]);
    }
    catch (e) {
    }

});