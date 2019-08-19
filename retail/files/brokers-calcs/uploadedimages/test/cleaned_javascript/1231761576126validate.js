 

var bValidData = true;  

function stripSpaces(sString) 
{
 
 
 bValidData = true;
 var re = new RegExp();
 re = /\s+$|^\s+/g;
 
 var sNewString = sString.replace(re,"");
 
 return sNewString;
}


function rule0(element,sFieldName)
{
   return true;
}

function rule1(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;  
    
   if (sValue.match(/[^A-Z]/i)) 
   {
       alert(sFieldName + " can only contain a to z and A to Z");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule2(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
   
   if (sValue.match(/[^\sA-Z-']/i)) 
   {
       alert(sFieldName + " can only contain a to z and A to Z and the characters - ' and the space character");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule3(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;
    
   if (sValue.match(/[^0-9]/)) 
   {
       alert(sFieldName + " can only contain 0 to 9");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   
   return true;
}

function rule4(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^0-9\.]/)) 
   {
       alert(sFieldName + " can only contain 0 to 9 and a decimal point");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule5(element,sFieldName)
{
   if ( !isValidate ) return true;

   if (sValue.match(/[^0-9+-]/)) 
   {
       alert(sFieldName + " can only contain 0 to 9 and the characters + -");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule6(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^A-Z0-9]/i)) 
   {
       alert(sFieldName + " can only contain a to z and A to Z and 0 to 9");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule7(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^\sA-Z0-9\.\,'-]/i)) 
   {
       alert(sFieldName + " can only contain a to z and A to Z and 0 to 9 and the characters , - ' . and the space character");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule8(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if ( ((!(sValue.match(/\d{4}/))) || (sValue.match(/\d{4}/) != sValue)) && ( sValue != '') )
   {
       alert(sFieldName + " must contain 4 digits");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule9(element,sFieldName)
{
   
   var returnValue = true;

   if ( !isValidate ) {
       
       returnValue = true;
   }
   else
   {
       var sValue = stripSpaces(element.value); 
       element.value = sValue;  

       if (sValue.match(/[^A-Z]/)) 
       {
           alert(sFieldName + " can only contain A to Z");
           element.focus();
           element.click();
           bValidData = false;
           returnvalue = false;
       }
   }
       return returnValue;
}

function rule10(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if ( ((!(sValue.match(/\d{2}/))) || (sValue.match(/\d{2}/) != sValue)) && ( sValue != '') )
   {
       alert(sFieldName + " must contain 2 digits");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule11(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;   
    
   if ( (((sValue.match(/[^\sA-Z0-9\.\,'-]/i))) || (sValue <= 0)) && (sValue != '') )      
   {
       alert(sFieldName + " can only contain a to z and A to Z and 0 to 9 and the characters , - ' . and the space character and must be non-zero");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   
   return true;
}

function rule12(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^\s0-9+-]/)) 
   {
       alert(sFieldName + " can only contain 0 to 9 and the characters + -");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}


function rule13(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
   
   if ( ( (!(sValue.match(/\d{1,7}\.{1}\d{0,2}|\d{1,7}/))) || (sValue.match(/\d{1,7}\.{1}\d{0,2}|\d{1,7}/) != sValue) ) && ( sValue != '') )
   {
       alert(sFieldName + " can only contain 7 significant digits and 2 after the decimal point");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule14(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
        
   if ( ( (!(sValue.match(/\d{1,9}\.{1}\d{0,2}|\d{1,9}/))) || (sValue.match(/\d{1,9}\.{1}\d{0,2}|\d{1,9}/) != sValue) ) && ( sValue != '') )
   {
       alert(sFieldName + " can only contain 9 significant digits and 2 after the decimal point");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule15(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if ( ((!(sValue.match(/\d{0,6}/))) || (sValue.match(/\d{0,6}/) != sValue) || ( sValue <= 0)) && ( sValue != '') )
   {
       alert(sFieldName + " can contain up to 6 digits only and must be non zero");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule16(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if ( ((!(sValue.match(/[\sA-Z-']{2}[\sA-Z-']{0,}/i))) || (sValue.match(/[\sA-Z-']{2}[\sA-Z-']{0,}/i) != sValue)) && ( sValue != '') )
   {
       alert(sFieldName + " can contain characters a to Z the characters -'<space> and be at least 2 characters long.");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule17(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
   
   if ( ( (!(sValue.match(/\d{1,3}\.{1}\d{0,2}|\d{1,3}/))) || (sValue.match(/\d{1,3}\.{1}\d{0,2}|\d{1,3}/) != sValue) ) && ( sValue != '') )
   {
       alert(sFieldName + " can only contain 3 significant digits and 2 after the decimal point");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule18(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
   
   if (sValue.match(/[^\sA-Z]/i)) 
   {
       alert(sFieldName + " can only contain a to z and A to Z and the space character");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule19(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^\sA-Z0-9\.\,'\-\&]/i)) 
   {
       alert(sFieldName + " can only contain a to z and A to Z and 0 to 9 and the characters , - ' & . and the space character");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule20(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[\$\"]/)) 
   {
       alert(sFieldName + " cannot contain the dollar sign ($) or double quote (\")");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule21(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^\s0-9\,\-]/i)) 
   {
       alert(sFieldName + " can only contain 0 to 9 and the characters , - and the space character");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}

function rule22(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
   
   if ( ( (!(sValue.match(/\d{1,3}\.{1}\d{0,2}|\d{1,3}/))) || (sValue.match(/\d{1,3}\.{1}\d{0,2}|\d{1,3}/) != sValue) || ( sValue <= 0)) && ( sValue != '') )
   {
       alert(sFieldName + " can only contain 3 significant digits and 2 after the decimal point and must be greater than 0");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}


function rule23(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue; 
   
   if ( ( (!(sValue.match(/\d{1,7}\.{1}\d{0,2}|\d{1,7}/))) || (sValue.match(/\d{1,7}\.{1}\d{0,2}|\d{1,7}/) != sValue) || ( sValue <= 0)) && ( sValue != '') )
   {
       alert(sFieldName + " can only contain 7 significant digits and 2 after the decimal point and must be greater than 0");
	   element.focus();
	   element.click();
	   bValidData = false;
       return false;
   }
   return true;
}



function isValidMaxLength(element, theMaxLength)
{
	if ( !isValidate ) return true;

	var valueLength = element.value.length; 
	maxLengthOnKeyPress = theMaxLength - 1;

	if ( valueLength > maxLengthOnKeyPress )
	{
		bValidData = false;
		return false;
	}
	return true;
}


function rule24(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if( sValue != '')
   {
       if (!(sValue.match(/[A-Za-z0-9]{4}/i)))

       {
           alert(sFieldName + " Can only contain a to Z and 0 to 9 and must be 4 characters long.");
               element.focus();
               element.click();
               bValidData = false;
           return false;
       }
   }
   return true;
}

function rule25(element,sFieldName)
{
   return true;
}

function rule26(element,sFieldName)
{
   return true;
}

function rule27(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if ( ((!(sValue.match(/\d{7}/))) || (sValue.match(/\d{7}/) != sValue)) && ( sValue != '') )
   {
        alert(sFieldName + " must contain 7 digits");
        element.focus();
        element.click();
        bValidData = false;
        return false;
   }
   return true;
}

function rule28(element,sFieldName)
{
   
   var returnValue = true;

   
   if ( !isValidate ) 
   {
       
       returnValue = true;
   }
   else
   {
       var sValue = stripSpaces(element.value); 
       element.value = sValue;  

       
       if ( ((!(sValue.match(/\d{8}/))) || (sValue.match(/\d{8}/) != sValue) || ( sValue <= 0)) && ( sValue != '') )
       {
            alert(sFieldName + " must contain 8 digits and be non-zero");
            element.focus();
            element.click();
            bValidData = false;
            returnValue = false;
       }
   }
   return returnValue;

}



// 	then the hyphen needs to be escaped too

// 		/[^\sA-Z0-9\.\,'-\(\)]/i			will not find hyphens
// 		/[^\sA-Z0-9\.\,'\-\(\)]/i			will find hyphens
function rule29(element,sFieldName)
{
   if ( !isValidate ) return true;

   var sValue = stripSpaces(element.value); 
   element.value = sValue;     
    
   if (sValue.match(/[^\sA-Z0-9\.\,'\-\(\)]/i)) 
   {
        alert(sFieldName + " can only contain a to z and A to Z and 0 to 9 and the characters , - ' . ( ) and the space character");
        element.focus();
        element.click();
        bValidData = false;

        return false;
   }
   return true;
}
