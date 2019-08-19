


function getFieldValue(formField)
{
	if ( formField )
	{
		if ( formField.type == "text" || formField.type == "textarea" ) 
			return formField.value;
		else if ( formField.type == "select-one" ) 
			return formField.options[formField.selectedIndex].value;
		else if ( formField.type == "checkbox" ) 
		{
			if (formField.checked)
				return formField.value;
			else
				return "";
		}
		else if ( formField.length > 0 && formField[0].type == "radio" ) 
		{
			for( var i = 0; i < formField.length; i++ )
			{
				if( formField[i] )
				{
					if( formField[i].checked )
						return formField[i].value;
				}
			}
		}
		else if ( formField.value )
			return formField.value;
	}

	return "";
}


function enableField(formField)
{
	if ( formField )
	{
		if ( formField.type == "text" || formField.type == "textarea" ) 
			textEnable(formField);
		else if ( formField.type == "select-one" ) 
			selectEnable(formField);
		else if ( formField.type == "checkbox" ) 
			checkEnable(formField);
		else if ( formField.length > 0 && formField[0].type == "radio" ) 
			radioEnable(formField);
	}
}


function disableField(formField)
{
	if ( formField )
	{
		if ( formField.type == "text" || formField.type == "textarea" ) 
			textDisable(formField);
		else if ( formField.type == "select-one" ) 
			selectDisable(formField);
		else if ( formField.type == "checkbox" ) 
			checkDisable(formField);
		else if ( formField.length > 0 && formField[0].type == "radio" ) 
			radioDisable(formField);
	}
}


function readStylesheet(classCss)
{
    var cls = "#FFFFFF";
	/*for(var s=document.styleSheets.length-1; s>=0; s--) {
 	    for(var r=document.styleSheets(s).rules.length-1; r>=0; r--) {
                if (document.styleSheets(s).rules(r).selectorText == classCss) {
	   	    cls = (document.styleSheets(s).rules(r).style.backgroundColor);
		    break;
                 }
             }
         }
     {
      if (cls == undefined) {
          cls = "#FFFFFF";
       }
      }*/
     return cls;
}




function textEnable(textElement)
{
	//textElement.onfocus = "";
	//textElement.onchange = "";

	textElement.disabled = false;
	//textElement.style.backgroundColor = readStylesheet(".enabledBackground");

	
	//textElement.isDisabledMode = false;

}	


function textDisable(textElement)
{
	textElement.onfocus = textElement.blur;
	textElement.value = "";
	textElement.onchange=removeValue;

	textElement.disabled = true;
	textElement.style.backgroundColor = readStylesheet(".disabledBackground");
	
	textElement.isDisabledMode = true;
}	


function textDisableOnly(textElement)
{
	textElement.onfocus = textElement.blur;

	textElement.disabled = true;
	textElement.style.backgroundColor = readStylesheet(".disabledBackground");
		
	textElement.isDisabledMode = true;
}	


function removeValue()
{
    this.value = "";
}



function selectEnable(selectElement)
{
	selectElement.onfocus = "";

	selectElement.disabled = false;
	selectElement.style.backgroundColor = readStylesheet(".enabledBackground");
		
	selectElement.isDisabledMode = false;
}


function selectDisable(selectElement)
{
	selectElement.onfocus = selectElement.blur;
	selectElement.selectedIndex = 0;

	selectElement.disabled = true;
	selectElement.style.backgroundColor = readStylesheet(".disabledBackground");

	selectElement.isDisabledMode = true;
}	


function selectDisableOnly(selectElement)
{
	selectElement.onfocus = selectElement.blur;

	selectElement.disabled = true;
		
	selectElement.isDisabledMode = true;
}	


function radioEnable(radioGroup)
{
    for(var i=0;i<radioGroup.length;i++) 
    {
        radioGroup[i].onfocus = '';
        radioGroup[i].disabled = false;
     	radioGroup[i].isDisabledMode = false;
    }
}


function radioDisable(radioGroup)
{
    for(var i=0;i<radioGroup.length;i++) 
    {
        radioGroup[i].onfocus = radioGroup[i].blur;
        radioGroup[i].checked = false;
        radioGroup[i].disabled = true;
     	radioGroup[i].isDisabledMode = true;
    }
}


function radioDisableOnly(radioGroup)
{
    for(var i=0;i<radioGroup.length;i++) 
    {
        radioGroup[i].onfocus = radioGroup[i].blur;
        radioGroup[i].disabled = true;
     	radioGroup[i].isDisabledMode = true;
    }
} 


function checkDisable(checkElement)
{
    checkElement.disabled = true;
    checkElement.checked = false;
    checkElement.isDisabledMode = true;
}


function checkEnable(checkElement)
{
    checkElement.disabled = false;
    checkElement.isDisabledMode = false;
}


function layerVisible(layer) 
{
    layer.style.visibility = 'visible';
}



function layerHidden(layer)
{
    layer.style.visibility = 'hidden';    
}



function doForm1Interval(form1Name)
{
    
    FORM_1_INTERVAL = setInterval("document.forms." + form1Name + ".submitted=false;",
                                 SUBMIT_INTERVAL);
}


function doForm2Interval(form2Name)
{
    
    FORM_2_INTERVAL = setInterval("document.forms." + form2Name + ".submitted=false;",
                                 SUBMIT_INTERVAL);
}



function setDynamicOutput(outputString, outputPosition)
{
	var docPosition = document.getElementById(outputPosition);
	
	if (docPosition)
		docPosition.innerHTML = outputString;
}



function getDynamicOutput(outputPosition)
{
	var outputString = null;

	var docPosition = document.getElementById(outputPosition);

	if (docPosition)
		outputString = docPosition.innerHTML;

	return outputString;
}


function getDynamicPosition(positionId, positionClass, numColsOuterCell)
{
	return  '<tr><td height="1" id="TD' + positionId + '" colspan="' 
		+ numColsOuterCell
		+ '" class="' + positionClass + '">'
                + '<div id="' + positionId + '" class="' + positionClass + '">&nbsp;</div>'
        	+ '</td></tr>';
}


function setFormField(fieldName, fieldForm, fieldStatus, dynamicLayer, mandatoryFields)
{
	var mandatoryIndicatorNamePrefix = "";
	var fieldOutput = "";
	var isFieldDynamic = false;

	
	if ( document.all[fieldName + "Position"] )
	{
		fieldOutput = eval(fieldName + "Output"); 
		isFieldDynamic = true;
	}

	
	if ( isFieldDynamic && fieldStatus == "enable" )
	{
		if ( getDynamicOutput(fieldName + "Position") == "" )
			setDynamicOutput(fieldOutput, fieldName + "Position");
	}

	
	if ( fieldForm[fieldName] )
	{
		if ( fieldStatus == "enable" )
			enableField(fieldForm[fieldName]);
		else
			disableField(fieldForm[fieldName]);
	}

	
	if ( dynamicLayer )
	{
		mandatoryIndicatorNamePrefix = fieldName;

		
		if ( fieldName.indexOf("DtDay") != -1 )
			mandatoryIndicatorNamePrefix = fieldName.substring(0, fieldName.length - 3);
		else if ( fieldName.indexOf("DtMonth") != -1 )
			mandatoryIndicatorNamePrefix = fieldName.substring(0, fieldName.length - 5);
		else if ( fieldName.indexOf("DtYear") != -1 )
			mandatoryIndicatorNamePrefix = fieldName.substring(0, fieldName.length - 4);
		else if ( fieldName.indexOf("BankSortCd") != -1 )
			mandatoryIndicatorNamePrefix = fieldName.substring(0, fieldName.length - 1);

		if ( dynamicLayer[mandatoryIndicatorNamePrefix + 'Star'] )
		{
			if ( fieldStatus == "enable" )
			{
				layerVisible(dynamicLayer[mandatoryIndicatorNamePrefix + 'Star']);

				if ( mandatoryFields )
				{
					
					isFieldListed = false;
					for( var i = 0; i < mandatoryFields.length; i++ )
					{
    						if( mandatoryFields[i] == fieldName )
						{
							isFieldListed = true;
							break;
						}
					}

					
					if ( !isFieldListed )
					{
						mandatoryFields[mandatoryFields.length] = fieldName;
						mandatoryFields.length += 1;
					}
				}
			}
			else
			{
				layerHidden(dynamicLayer[mandatoryIndicatorNamePrefix + 'Star']);

				if ( mandatoryFields )
				{
					for( var j = 0; j < mandatoryFields.length; j++ )
					{
    						if( mandatoryFields[j] == fieldName )
						{
							mandatoryFields[j] = '';
							break;
						}
					}
				}
			}
		}
	}

	
	if ( isFieldDynamic && fieldStatus == "disable" )
	{
		if ( getDynamicOutput(fieldName + "Position") != "" )
			setDynamicOutput("", fieldName + "Position");
	}

}



function setFormFieldGroup(fieldArray, fieldStatus, fieldForm, dynamicLayer, mandatoryFieldArray)
{
	var i = 0;

	if ( fieldForm )
	{
		for ( i = 0; i < fieldArray.length; i++ )
			setFormField(fieldArray[i], fieldForm, fieldStatus, dynamicLayer, mandatoryFieldArray);
	}
}


function materialsAck()
{
	$("#materials").slideToggle("fast");
	
	changeDoctorsButton();
}

function changeDoctorsButton()
{
	if(doctorButtons === true)
	{
		disableDoctorButtons();
	}
	else
	{
		enableDoctorButtons();
	}
}
