


var isExitPerformed = false;
var requestTypeName;


function saveClicked()
{
	requestTypeName = "SaveProposal";
	confirmExit();
}

function correctErrorClicked()
{
	requestTypeName = "CorrectError";
	confirmExit();
}

function exitClicked()
{
	requestTypeName = EXIT_REQUEST_TYPE;
	confirmExit();
}



function confirmExit()
{
    if ( isExitPerformed )
        return;

    var iposnTop;
    var iposnLeft;
    
    iposnTop = (screen.availHeight - 300) / 2;
    iposnLeft = (screen.availWidth - 400) / 2;

	var winUrl = CONFIRM_EXIT_URL + "?requestTypeName=" + requestTypeName;

    window.open(
        winUrl, 
        "Confirm", 
	"resizable=no,width=400,height=300,top=" + iposnTop + ",left=" + iposnLeft);
}



function performExit()
{

    if ( isExitPerformed )
        return;

    if ( IS_NONDISPLAY_CLIENT_APP )  
	  EXIT_REQUEST_TYPE = "ExitApplication";

	eval("document." + EXIT_FORM_NAME + ".RequestTypeName.value='" + EXIT_REQUEST_TYPE + "'");
	eval("document." + EXIT_FORM_NAME + ".submit()");

    if (EXIT_REQUEST_TYPE == "ExitApplication")
	{
	    window.close();
	}

	isExitPerformed = true;

    
    var exitInterval = setInterval("isExitPerformed=false;", SUBMIT_INTERVAL);

}



function performSave()
{
    eval("document." + EXIT_FORM_NAME + ".RequestTypeName.value='SaveProposal'");
	eval("document." + EXIT_FORM_NAME + ".target='savePopup'");
    createPopup();

    eval("document." + EXIT_FORM_NAME + ".submit()");

	if (EXIT_REQUEST_TYPE == "ExitApplication")
	{
	    window.close();
	}
}



function performCorrectError()
{
    eval("document." + EXIT_FORM_NAME + ".RequestTypeName.value='CorrectError'");
    eval("document." + EXIT_FORM_NAME + ".submit()");
}



function createPopup()
{
	var iposnTop;
	var iposnLeft;

	iposnTop = (screen.availHeight - 300) / 2;
	iposnLeft = (screen.availWidth - 400) / 2;

	var winName = eval("document." + EXIT_FORM_NAME + ".target");

	window.open("",winName, "resizable=no,width=400,height=300,top=" + iposnTop + ",left=" + iposnLeft);
}


function performResetParms(saveFlg)
{
	
	
	if(saveFlg){
		eval("document." + EXIT_FORM_NAME + ".RequestTypeName.value='" + DEFAULT_REQUEST_TYPE + "'");
		eval("document." + EXIT_FORM_NAME + ".target='_self'");
	}
}
