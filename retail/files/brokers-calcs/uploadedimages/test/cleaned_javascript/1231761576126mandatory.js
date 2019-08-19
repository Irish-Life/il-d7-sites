    
    
    var mandatoryFieldNames = new Object();
    var mandatoryFieldDescriptions = new Object();

    
    
    mandatoryFieldNames.length = 0;
    mandatoryFieldDescriptions.length = 0;
    
    
    
    


    
    
    function validateApplication(form)
    {   
        var isValid = false;
        var sName = "";
        var sType = "";
        
        
        
        var numberMandatoryErrors = 0;
        
        
		 var isFieldEmpty;

		


        for (var i = 0; i < mandatoryFieldNames.length; i++ )
        {
        	
            if(mandatoryFieldNames[i] != '') {
            
            
            var theField = form[mandatoryFieldNames[i]];
   			
   			
   			
            
            if(theField) {
            
            
            
            if (theField.type == 'text' || theField.type == 'hidden')   
            {
                sType = "text";
				
                isFieldEmpty = ( theField.value == '') ? true : false;
            }
			 else if (theField.type == 'select-one')   
			 {
			    sType = "select";
				
				isFieldEmpty = ( theField.selectedIndex == 0 ) ? true : false;
			 }
			 else if (theField.type == 'checkbox')
			 {
			 	sType = "checkbox";
			 	
			 	
			 	isFieldEmpty = ( theField.checked == false) ? true : false;
			 	
			 }
        	 else if (theField[0].type == 'radio')   
       	    {
       	    	
                sType = "radio";
                isFieldEmpty = true;
				
      	       for (var j = 0; j < theField.length; j++)
        	   {                  
        	      if ( theField[j].checked == true) 
        	      {
					  
        	         isFieldEmpty = false;
        	         break;
        	      }
        	   }
	
			 }
			 
          
            if ( isFieldEmpty  )
            {
                
                
                numberMandatoryErrors ++;
                break;
            }
            }
          } 
        }  
        
       


        if ( numberMandatoryErrors < 1 )
        {
            isValid = true;
        }
        else
        {
            if(sType=="radio") sName = theField[0].name;
            else sName = theField.name;
            
            var errorMessage = "Some information that is needed has not been filled in.\n\n"
                            + "Please check answers with \* beside them.";

            alert(errorMessage);
			
			
			if(sType=="radio") {
			    theField[0].focus();
			    
			    
			}
            else sName = theField.focus();
			
			return false;
        }

         

		 isValid = isValid && checkCompleteFields(form);
         checkFundAmounts(form);

        

	  
	  for (var j = 0; j < form.length; j++)
	  {
		if (form[j].disabled)
		{
			if (form[j].disabled == true)
				form[j].disabled = false;
		}
	  }

        
        return isValid;
    }


	

	function checkCompleteFields (form)

		

	{
		

	  if(typeof(form['firstIncomePaymentDtMonth']) != 'undefined') {

       var firstIncomePaymentDtMonthDesc = "Month for First Regular Income Payment";
       var firstIncomePaymentDtYearDesc = "Year for First Regular Income Payment";

		var firstIncomeMonth = form['firstIncomePaymentDtMonth'];
		var firstIncomeYear = form['firstIncomePaymentDtYear'];

		if(!( ((firstIncomeMonth.selectedIndex == 0) && (firstIncomeYear.value == '')) 
		  || ((firstIncomeMonth.selectedIndex != 0) && (firstIncomeYear.value != '')) ) )
		  {
			  if(firstIncomeMonth.selectedIndex == 0) 
				 {
				  alert("Please enter a value for " + firstIncomePaymentDtMonthDesc);
				  return false;
			     }
			   if(firstIncomeYear.value == '') {
     			  alert("Please enter a value for " + firstIncomePaymentDtYearDesc);
				  return false;
			     }
		  }

	   }
		
     

     if(typeof(form['aiBankSortCd1']) != 'undefined') {

	   var aiBankSortCd1Desc = "First Part of Regular Income Bank Sort Code";
       var aiBankSortCd2Desc = "Second Part of Regular Income Bank Sort Code";
       var aiBankSortCd3Desc = "Third Part of Regular Income Bank Sort Code";

		var sortCd1 = form['aiBankSortCd1'];
		var sortCd2 = form['aiBankSortCd2'];
		var sortCd3 = form['aiBankSortCd3'];
		
		if( ! ( ((sortCd1.value == '') && (sortCd2.value == '') && (sortCd3.value == '')) 
		  || ((sortCd1.value != '') && (sortCd2.value != '') && (sortCd3.value != '')) ) )
		{
			if(sortCd1.value == '') {
			   alert("Please enter a value for " + aiBankSortCd1Desc);
				return false; }
			if(sortCd2.value == '') {
			   alert("Please enter a value for " + aiBankSortCd2Desc);
				return false; }
			if(sortCd3.value == '') {
			   alert("Please enter a value for " + aiBankSortCd3Desc);
				return false; }
		}

	  }

		return true;

	}
	

   function checkFundAmounts(form) {
    
   

      if(form['fund1InvestmentAmt']) {
         if(form['fund1InvestmentAmt'].value <= 0) {
            form['fund1Nm'].selectedIndex = 0;  
            form['fund1InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund2InvestmentAmt']) {
         if(form['fund2InvestmentAmt'].value <= 0) {
            form['fund2Nm'].selectedIndex = 0;  
            form['fund2InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund3InvestmentAmt']) {
         if(form['fund3InvestmentAmt'].value <= 0) {
            form['fund3Nm'].selectedIndex = 0;  
            form['fund3InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund4InvestmentAmt']) {
         if(form['fund4InvestmentAmt'].value <= 0) {
            form['fund4Nm'].selectedIndex = 0;  
            form['fund4InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund5InvestmentAmt']) {
         if(form['fund5InvestmentAmt'].value <= 0) {
            form['fund5Nm'].selectedIndex = 0;  
            form['fund5InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund6InvestmentAmt']) {
         if(form['fund6InvestmentAmt'].value <= 0) {
            form['fund6Nm'].selectedIndex = 0;  
            form['fund6InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund7InvestmentAmt']) {
         if(form['fund7InvestmentAmt'].value <= 0) {
            form['fund7Nm'].selectedIndex = 0;  
            form['fund7InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund8InvestmentAmt']) {
         if(form['fund8InvestmentAmt'].value <= 0) {
            form['fund8Nm'].selectedIndex = 0;  
            form['fund8InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund9InvestmentAmt']) {
         if(form['fund9InvestmentAmt'].value <= 0) {
            form['fund9Nm'].selectedIndex = 0;  
            form['fund9InvestmentAmt'].value = ''; 
         }
      }
      if(form['fund10InvestmentAmt']) {
         if(form['fund10InvestmentAmt'].value <= 0) {
            form['fund10Nm'].selectedIndex = 0;  
            form['fund10InvestmentAmt'].value = ''; 
         }
      }
   }


  function noSelect() {
    this.selectedIndex = 0;
  }


function addToMandatory(mandField)
{
    mandatoryFieldNames[mandatoryFieldNames.length] = mandField;
    mandatoryFieldNames.length += 1;
}


function removeFromMandatory(mandField)
{
    for( var i = 0; i < mandatoryFieldNames.length; i++ )
    {
            if( mandatoryFieldNames[i] == mandField )
            {
                    mandatoryFieldNames[i] = '';
                    break;
            }
    }
}


function mandatoryVisible(mandatoryIndicator)
{
	var appLayer = document.all;

	if (appLayer[mandatoryIndicator])
		layerVisible(appLayer[mandatoryIndicator]);
}


function mandatoryHidden(mandatoryIndicator)
{
	var appLayer = document.all;

	if (appLayer[mandatoryIndicator])
		layerHidden(appLayer[mandatoryIndicator]);
}


function setMandatoryStatus(fieldName, isMandatory)
{
	if (isMandatory)
	{
		addToMandatory(fieldName); 
		mandatoryVisible(fieldName + "Star"); 
	}
	else
	{
      	removeFromMandatory(fieldName);
		mandatoryHidden(fieldName + "Star"); 
	}
}

function checkAddressFields(addressPrefix, startLine)
{
	var currentAddressLine = addressPrefix + ADDRESS_LINE + (startLine - 1) + ADDRESS_SUFFIX;
	var nextAddressLine = addressPrefix + ADDRESS_LINE + startLine + ADDRESS_SUFFIX;

	if ( appForm[currentAddressLine] && appForm[nextAddressLine] )
	{
		

		if ( appForm[currentAddressLine].value.length > 0 )
		{
			enableField(appForm[nextAddressLine]);

			if ( isInit ) 
			{
				startLine++;
				checkAddressFields(addressPrefix, startLine);
			}
		}
		else
		{
			

			var isNextAddressLineExists = true;

			while ( isNextAddressLineExists )
			{

				if ( appForm[nextAddressLine] )
				{
					disableField(appForm[nextAddressLine]);

					currentAddressLine = nextAddressLine;
					startLine++;
					nextAddressLine = addressPrefix + ADDRESS_LINE + startLine + ADDRESS_SUFFIX;
				}
				else
				{
					isNextAddressLineExists = false;
				}
			}
		}
	}
}
