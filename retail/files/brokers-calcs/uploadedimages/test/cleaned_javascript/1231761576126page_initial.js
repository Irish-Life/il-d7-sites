
var FORM_NAME;


var iLastKeyPressed = 0;


var isValidate = true;


var isUnloading = false;
window.onunload = doWindowUnload;
window.onbeforeunload = doWindowBeforeUnload;


var firstFocusField = null;
var isErrorField = false;


var FORM_1_INTERVAL;
var FORM_2_INTERVAL;


function doWindowUnload()
{
	isUnloading = true;
	isValidate = false;
}


function doWindowBeforeUnload()
{
	isUnloading = true;
	isValidate = false;
}


function setFirstFocusField()
{
	var isDisabledField = false;
	if ( firstFocusField.isDisabledMode )
	{
		if ( firstFocusField.isDisabledMode == true )
			isDisabledField = true;
	}

	if ( !isDisabledField )
		firstFocusField.focus();

	if(isErrorField) 
		firstFocusField.scrollIntoView(true);

	firstFocusField = null;
}


function right(e)
{
	if(event.button == 2 || event.button == 3)
	{
		alert("Right button click not allowed");
		return false;
	}
		
	iLastKeyPressed = 0;
	return true;
}

document.onmousedown=right;
document.onmouseup=right;
if (document.layers) window.captureEvents(Event.MOUSEDOWN);
if (document.layers) window.captureEvents(Event.MOUSEUP);
window.onmousedown=right;
window.onmouseup=right;





   





function ie_onkeydown(){
    
   iLastKeyPressed = event.keyCode; 
   
    
   
   if(event.altKey) event.returnValue = false;
   
   
   
   
   if(event.keyCode == 93 || event.keyCode == 27 || (event.keyCode >= 113 && event.keyCode <= 123) || (event.ctrlKey && (event.keyCode >= 65 && event.keyCode <= 90))) {
       alert("This operation is not allowed");
   }
   
   
   if ((event.keyCode >= 113 && event.keyCode <= 123) || event.keyCode == 93 || (event.ctrlKey && (event.keyCode >= 65 && event.keyCode <= 90))) {
            window.event.keyCode = 0;
	    event.returnValue = false;
   }   

    
    
   if((event.keyCode == 8) && (event.srcElement.type != "text") && (event.srcElement.type != "textarea") 
   && (event.srcElement.type != "password") ) 
   {
      event.returnValue=false;
   }
   
   
   
   if((event.keyCode == 13) && (event.srcElement.name != "topLink")) {
     
      
     var enterEvent = window.event;
     var bValidData = true;
     if((event.srcElement.type != "button") && (event.srcElement.type != "submit")  && (event.srcElement.type != "image")) {
        if(event.srcElement.type == "text" || event.srcElement.type == "textarea") {
            
            
           
               
            if((event.srcElement.value != "") && (event.srcElement.onblur)) {
                var handler = event.srcElement.onblur;
                
                
                
                
                event.srcElement.onblur = "";
                event.srcElement.ondblclick = handler;
                
                bValidData = event.srcElement.ondblclick();
                
                
                event.srcElement.onblur = handler;
                
            }
            if(!(bValidData)) { 
                
                return false;
                
            }
        } 
        for(var i=0;i<document.forms.length;i++) {
            
            if(document.forms[i].enterDefault) {
                
                if(document.forms[i].onsubmit) {
                    if(document.forms[i].onsubmit()) {
                        document.forms[i].submit();
                    }
                }
                else {
                   document.forms[i].submit();  
                } 
            } 
         } 
         event.returnValue = false;
      } 
   } 
} 

document.onkeydown = ie_onkeydown;
window.onkeydown = ie_onkeydown;


function setLoaded() {

    bLoaded = true;
}

function isFormAlreadySubmitted()

{
    for (var i=0; i < document.forms.length; i++)
    {
        if (document.forms[i].submitted)
        {
            return true;
        }
    }
    return false;

}

