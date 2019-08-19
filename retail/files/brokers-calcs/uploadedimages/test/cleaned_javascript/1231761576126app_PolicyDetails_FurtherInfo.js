

var bpersPropSexVal = false;

function proposerHdrTxtClick()
{
	var proposerHdrTxtValue = "";

	if ( appForm.proposerHdrTxt )
	{
		proposerHdrTxtValue = getFieldValue(appForm.proposerHdrTxt);

		if ( proposerDetails(proposerHdrTxtValue, appForm) )
		{
			setupPolicyOwnerSection(proposerHdrTxtValue);
			proposerDetails(proposerHdrTxtValue, appForm);
		}
		
		enableDisableElectronicSignatureInputCd();
	}
}


function proposerAddressLine1TxtKeyUp() { checkAddressFields('proposer', 2); }
function proposerAddressLine2TxtKeyUp() { checkAddressFields('proposer', 3); }
function proposerAddressLine3TxtKeyUp() { checkAddressFields('proposer', 4); }
function proposerAddressLine4TxtKeyUp() { }

function busiProposerAddressLine1TxtKeyUp() { checkAddressFields('busiProposer', 2); }
function busiProposerAddressLine2TxtKeyUp() { checkAddressFields('busiProposer', 3); }
function busiProposerAddressLine3TxtKeyUp() { checkAddressFields('busiProposer', 4); }
function busiProposerAddressLine4TxtKeyUp() { }


function setupPolicyOwnerSection(policyOwnerCode)
{
	var appForm = document.forms.ApplicationForm;

	if (policyOwnerCode == "P" || policyOwnerCode == "")
	{
	    if ( policyOwnerCode == "P" && appForm.life2SurName ) {   
	        if ( document.all["transactionAuthorityCdPosition"] ) 
	            setDynamicOutput(eval("transactionAuthorityCdOutput"), "transactionAuthorityCdPosition");     
			document.getElementById("policyOwnerAnotherPersonSection").innerHTML = policyOwnerPersonalInsurableInterest;
		}	    
		else
		{   
		    if ( document.all["transactionAuthorityCdPosition"] )
   		        setDynamicOutput("", "transactionAuthorityCdPosition");
			document.getElementById("policyOwnerAnotherPersonSection").innerHTML = "";
		}

		document.getElementById("policyOwnerBusinessSection").innerHTML = "";
	}
	else if (policyOwnerCode == "A")
	{
		document.getElementById("policyOwnerAnotherPersonSection").innerHTML = 
			policyOwnerAnotherPersonOutput_1 + policyOwnerPersonalInsurableInterest + policyOwnerAnotherPersonOutput_2;
		document.getElementById("policyOwnerBusinessSection").innerHTML = "";
	}
	else if (policyOwnerCode == "B")
	{
		document.getElementById("policyOwnerAnotherPersonSection").innerHTML = "";
		document.getElementById("policyOwnerBusinessSection").innerHTML = policyOwnerBusinessOutput;
	}
}


function setupGenericPolicyOwnerSection()
{   
	if (document.getElementById("policyOwnerBusinessSection")!= null)
    {
    	document.getElementById("policyOwnerBusinessSection").innerHTML = policyOwnerBusinessOutput;
    }
    if (document.getElementById("policyOwnerAnotherPersonSection")!= null) 
    {
    	document.getElementById("policyOwnerAnotherPersonSection").innerHTML = policyOwnerPersonalInsurableInterest;
    }
    if (document.getElementById("policyOwnerAnotherPersonSection") !=null)  
    {
    	document.getElementById("policyOwnerAnotherPersonSection").innerHTML = 
		policyOwnerAnotherPersonOutput_1 + policyOwnerPersonalInsurableInterest + policyOwnerAnotherPersonOutput_2;
	}
}


function persPropSexRadioM() {

    appForm.persProposerSexCd[0].checked = bpersPropSexVal;
}

function persPropSexRadioF() {
   
    appForm.persProposerSexCd[1].checked = bpersPropSexVal;
}


var bmgtAppCdVal = false;

function clickMgtCode(radio) {
 
    
   radio.checked = bmgtAppCdVal;
}

function noClickPersPropM() {

       
    appForm.persProposerSexCd[0].checked = true;
    
    appForm.persProposerSexCd[0].isDisabledMode = true;
    appForm.persProposerSexCd[1].isDisabledMode = true;
    
    return false;
}


function noClickPersPropF() {
 
   
    appForm.persProposerSexCd[1].checked = true;
    
    appForm.persProposerSexCd[0].isDisabledMode = true;
    appForm.persProposerSexCd[1].isDisabledMode = true;

    return false;
}

  

var iChecked = -1;




var personalProposerFields_1 = new Array
(
'persProposerTitleCd', 'persProposerForeName', 'persProposerSurName', 'persProposerSexCd',
'persProposerBirthDtDay', 'persProposerBirthDtMonth', 'persProposerBirthDtYear'
);

var personalProposerFields_2 = new Array('persProposerInsurableInterestCd');

var personalProposerFields_3 = new Array
(
'persProposerHomePhonePrefixNo', 'persProposerHomePhoneNo', 'persProposerMobilePhonePrefixNo', 'persProposerMobilePhoneNo',
'persProposerWorkPhonePrefixNo', 'persProposerWorkPhoneNo', 'proposerAddressLine1Txt', 'proposerAddressLine2Txt',
'proposerAddressLine3Txt', 'proposerAddressLine4Txt','persProposerIrishLifeDataConsentCd','persProposerThirdPartyDataConsentCd'
);

 

var businessProposerFields = new Array
(
'busiProposerName', 'busiProposerInsurableInterestCd', 'busiProposerAddressLine1Txt', 'busiProposerAddressLine2Txt',
'busiProposerAddressLine3Txt', 'busiProposerAddressLine4Txt', 'busiProposerContactPhonePrefixNo', 'busiProposerContactPhoneNo',
'busiProposerFaxPrefixNo', 'busiProposerFaxNo'
);


function proposerDetails(sProposer,form)


{
   
   
	if((iLastKeyPressed == 9) || (iLastKeyPressed == 37) || (iLastKeyPressed == 39) || (iLastKeyPressed == 40) || (iLastKeyPressed == 38)) 
	{
		event.returnValue = false;
		if(iChecked!=-1) 
		{
        	if(form.proposerHdrTxt[iChecked]) form.proposerHdrTxt[iChecked].checked = true;
       	}
       	return false;
   	}

   
   if(sProposer == "A")
   {
    if ( document.all["transactionAuthorityCdPosition"] )
    {
        setDynamicOutput("", "transactionAuthorityCdPosition");	 
	}
    

	
	

	setFormFieldGroup(personalProposerFields_1, "enable", form, appLayer, mandatoryFieldNames);
	if (!isHiddenPersProposerInsurableInterestCd)
		setFormFieldGroup(personalProposerFields_2, "enable", form, appLayer, mandatoryFieldNames);

	setFormFieldGroup(personalProposerFields_3, "enable", form, appLayer, mandatoryFieldNames);

	
	

	setFormFieldGroup(businessProposerFields, "disable", form, appLayer, mandatoryFieldNames);

	

	if (form.persProposerTitleCd)
	{
	   var persProposerTitle = form.persProposerTitleCd;
	
	   if(persProposerTitle.options[persProposerTitle.selectedIndex].value != "Dr"   &&
          persProposerTitle.options[persProposerTitle.selectedIndex].value != "Prf" &&
          persProposerTitle.options[persProposerTitle.selectedIndex].value != "Rev")
       {
          bpersPropSexVal = true;
	      checkPersProposerSexCd(form);
	   }
	}      
	  
	
	  
	if(form.persProposerTitleCd && !isHiddenPersProposerTitleCd && firstErrorField == "") 
		form.persProposerTitleCd.focus();
	  
   }
   else if (sProposer == "B")
   {
    
    if ( document.all["transactionAuthorityCdPosition"] ) {
        setDynamicOutput("", "transactionAuthorityCdPosition");
	    }

	
	

	setFormFieldGroup(businessProposerFields, "enable", form, appLayer, mandatoryFieldNames);

	
	

	setFormFieldGroup(personalProposerFields_1, "disable", form, appLayer, mandatoryFieldNames);
	if (!isHiddenPersProposerInsurableInterestCd)
		setFormFieldGroup(personalProposerFields_2, "disable", form, appLayer, mandatoryFieldNames);

	setFormFieldGroup(personalProposerFields_3, "disable", form, appLayer, mandatoryFieldNames);

	

	bpersPropSexVal = false;
		
	

	if(form.busiProposerName)
	{
		if (form.busiProposerName.type != 'hidden' && firstErrorField == "")
			form.busiProposerName.focus();
	}

		
		if(form['busiProposerAddressLine3Txt']) {
			if (appForm.busiProposerAddressLine3Txt.value == "") textDisable(appForm.busiProposerAddressLine3Txt);
		}
		if(form['busiProposerAddressLine4Txt']) {
			if (appForm.busiProposerAddressLine4Txt.value == "") textDisable(appForm.busiProposerAddressLine4Txt);
		}

   }
   else 
   {
	
	setFormFieldGroup(personalProposerFields_1, "disable", form, appLayer, mandatoryFieldNames);
	setFormFieldGroup(personalProposerFields_3, "disable", form, appLayer, mandatoryFieldNames);

	setFormFieldGroup(businessProposerFields, "disable", form, appLayer, mandatoryFieldNames);

	

	bpersPropSexVal = false;
		
	
    if( (form['life2SurName']) && (sProposer == "P") ) {
		setFormField("transactionAuthorityCd", appForm, "enable", appLayer, mandatoryFieldNames);
    }
    else
        setFormField("transactionAuthorityCd", appForm, "disable", appLayer, mandatoryFieldNames);
        
	
    
      if( (form['life2SurName']) && (form['persProposerInsurableInterestCd']) )
	{
		if (!isHiddenPersProposerInsurableInterestCd)
			setFormFieldGroup(personalProposerFields_2, "enable", form, appLayer, mandatoryFieldNames);

	}
	else
		if (!isHiddenPersProposerInsurableInterestCd)
			setFormFieldGroup(personalProposerFields_2, "disable", form, appLayer, mandatoryFieldNames);

   
    
    if( (form['life2SurName']) && (sProposer == "P") ) {
        if( form.transactionAuthorityCd && form.transactionAuthorityCd.type != 'hidden' && firstErrorField == "")
            form.transactionAuthorityCd.focus();
        else
	        if(form.persProposerInsurableInterestCd && !isHiddenPersProposerInsurableInterestCd && firstErrorField == "") 
		        form.persProposerInsurableInterestCd.focus();
    }

   }

		
		if(form['proposerAddressLine3Txt']) {
			if (appForm.proposerAddressLine3Txt.value == "") textDisable(appForm.proposerAddressLine3Txt);
		}
		if(form['proposerAddressLine4Txt']) {
			if (appForm.proposerAddressLine4Txt.value == "") textDisable(appForm.proposerAddressLine4Txt);
		}

   return true;
}


function genericProposerDetails (form)


{
    
	
	
    
	setFormFieldGroup(personalProposerFields_1, "enable", form, appLayer, mandatoryFieldNames);
	if (!isHiddenPersProposerInsurableInterestCd)
		setFormFieldGroup(personalProposerFields_2, "enable", form, appLayer, mandatoryFieldNames);
    
	setFormFieldGroup(personalProposerFields_3, "enable", form, appLayer, mandatoryFieldNames);
	
	
	

	bpersPropSexVal = true;
	checkPersProposerSexCd(form);
	  
	
	
	if(form.persProposerTitleCd && !isHiddenPersProposerTitleCd && firstErrorField == "") 
		form.persProposerTitleCd.focus();
		
	
	
	setFormFieldGroup(businessProposerFields, "enable", form, appLayer, mandatoryFieldNames);
	
	

	bpersPropSexVal = false;
		
	

	if(form.busiProposerName)
	{
		if (form.busiProposerName.type != 'hidden' && firstErrorField == "")
			form.busiProposerName.focus();
	}

		
		if(form['busiProposerAddressLine3Txt']) {
			if (appForm.busiProposerAddressLine3Txt.value == "") textDisable(appForm.busiProposerAddressLine3Txt);
		}
		if(form['busiProposerAddressLine4Txt']) {
			if (appForm.busiProposerAddressLine4Txt.value == "") textDisable(appForm.busiProposerAddressLine4Txt);
		}
	

	bpersPropSexVal = false;
		
	
    
      if( (form['life2SurName']) && (form['persProposerInsurableInterestCd']) )
	{
		if (!isHiddenPersProposerInsurableInterestCd)
			setFormFieldGroup(personalProposerFields_2, "enable", form, appLayer, mandatoryFieldNames);

		
		if(form.persProposerInsurableInterestCd && !isHiddenPersProposerInsurableInterestCd && firstErrorField == "") 
			form.persProposerInsurableInterestCd.focus();
	}
	else
		if (!isHiddenPersProposerInsurableInterestCd)
			setFormFieldGroup(personalProposerFields_2, "disable", form, appLayer, mandatoryFieldNames);
   

		
		if(form['proposerAddressLine3Txt']) {
			if (appForm.proposerAddressLine3Txt.value == "") textDisable(appForm.proposerAddressLine3Txt);
		}
		if(form['proposerAddressLine4Txt']) {
			if (appForm.proposerAddressLine4Txt.value == "") textDisable(appForm.proposerAddressLine4Txt);
		}

}


function checkPersProposerSexCd(form) 
{
    

    if(form.persProposerTitleCd) 
    {
        var persProposerTitle = form.persProposerTitleCd;

        if(persProposerTitle.options[persProposerTitle.selectedIndex].value == "Ms"   ||
           persProposerTitle.options[persProposerTitle.selectedIndex].value == "Mrs"  ||
           persProposerTitle.options[persProposerTitle.selectedIndex].value == "Sr")
        {
            if(form.persProposerSexCd) 
            {
                bpersPropSexVal = false;
                form.persProposerSexCd[1].checked = true;
                form.persProposerSexCd[0].onclick = noClickPersPropF;
                form.persProposerSexCd[1].onclick = noClickPersPropF;
            }
        }
        else if(persProposerTitle.options[persProposerTitle.selectedIndex].value == "Mr"  ||
                persProposerTitle.options[persProposerTitle.selectedIndex].value == "Fr"  ||
                persProposerTitle.options[persProposerTitle.selectedIndex].value == "Sir") 
        {
            if(form.persProposerSexCd) 
            {
                 bpersPropSexVal = false;
                 form.persProposerSexCd[0].checked = true;
                 form.persProposerSexCd[0].onclick = noClickPersPropM;
                 form.persProposerSexCd[1].onclick = noClickPersPropM;
            }
        }
        else
        {
            if(form.persProposerSexCd)
            {
            	form.persProposerSexCd[0].checked = false;
                form.persProposerSexCd[1].checked = false;
                form.persProposerSexCd[0].onclick = "";
            	form.persProposerSexCd[1].onclick = "";
            }	
        }    
    }
}


var mortgageFields = new Array("mortgageSameLesserCd", "mortgageAssignPolicyCd", "mortgageAccountNo", "ipMortgageAccountNo");

function enableMortgageCodes(form)
{


    if(form.mortgageApplicationCd)
    {
        if(form.mortgageApplicationCd[0].checked)
        { 
			setFormFieldGroup(mortgageFields, "enable", form, appLayer, mandatoryFieldNames);
            bmgtAppCdVal = true;
        }
        else
        { 
			setFormFieldGroup(mortgageFields, "disable", form, appLayer, mandatoryFieldNames);
            bmgtAppCdVal = false;
        }
    }
}


function conversionOptionCdClick()
{
	
	var conversionOptionCdValue = "";
	conversionOptionCdValue = getFieldValue(appForm.conversionOptionCd);
	
	if ("Y" == conversionOptionCdValue)
	{
        setFormField("conversionOptionIDTxt", appForm, "enable",appLayer, mandatoryFieldNames);
        setFormField("conversionOptionAssignedInTrustCd", appForm, "enable",appLayer, mandatoryFieldNames);

        setFormField("inflationProtectionAppliesCd", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("guaranteedInsurabilityAppliesCd", appForm, "disable", appLayer, mandatoryFieldNames);            
	}
	else
	{
        setFormField("conversionOptionIDTxt", appForm, "disable",appLayer, mandatoryFieldNames);
        setFormField("conversionOptionAssignedInTrustCd", appForm, "disable",appLayer, mandatoryFieldNames);

        setFormField("inflationProtectionAppliesCd", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("guaranteedInsurabilityAppliesCd", appForm, "enable", appLayer, mandatoryFieldNames);            
	}

	
	enableDisableElectronicSignatureInputCd();
	
}


 
function conversionOptionAssignedInTrustCdClick()
{
	enableDisableElectronicSignatureInputCd();
}
