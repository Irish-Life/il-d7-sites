


var blife1VitalCareCdVal = false;
var blife2VitalCareCdVal = false;


function life1LifeCoverAmtKeyUp() {enableLife1LifeCoverAmtFields();}
function life2LifeCoverAmtKeyUp() {enableVitalCareCd();}
function life1SpecifiedIllnessCoverAmtKeyUp() {enableVitalCareCd();}
function life2SpecifiedIllnessCoverAmtKeyUp() {enableVitalCareCd();}


function life1VitalCareCoverCdClick() {
  
    
   if (appForm.life1VitalCareCoverCd[0].checked)
   	appForm.life1VitalCareCoverCd[0].checked = blife1VitalCareCdVal;
   else
   	appForm.life1VitalCareCoverCd[1].checked = blife1VitalCareCdVal;
}


function life2VitalCareCoverCdClick() {
  
   
   if (appForm.life2VitalCareCoverCd[0].checked)
   	appForm.life2VitalCareCoverCd[0].checked = blife2VitalCareCdVal;
   else
   	appForm.life2VitalCareCoverCd[1].checked = blife2VitalCareCdVal;
}


function applicationUnderAGroupAppliesCdClick()

{
	if ( appForm.applicationUnderAGroupAppliesCd )
	{
		var isGroup = getFieldValue(appForm.applicationUnderAGroupAppliesCd);
		if(isGroup == "Y")
   		{
	  		

	  		setFormField("groupNm", appForm, "enable", appLayer, mandatoryFieldNames);
	  		setFormField("groupNo", appForm, "enable", appLayer, mandatoryFieldNames);
   		}
   		else
   		{
	  		

	  		setFormField("groupNm", appForm, "disable", appLayer, mandatoryFieldNames);
	  		setFormField("groupNo", appForm, "disable", appLayer, mandatoryFieldNames);
   		}
	}
}



function enableLife1LifeCoverAmtFields()
{
    enableVitalCareCd();
    enableLifeCoverFundRelationshipCd();
    enableBenefitInflationProtectionAppliesCd();
}

function enableVitalCareCd() {
    




if(appForm.life1SpecifiedIllnessCoverAmt ) {
    if(appForm.life1SpecifiedIllnessCoverAmt.value > 0) {
        setFormField("life1VitalCareCoverCd", appForm, "enable", null, null);
        blife1VitalCareCdVal = true;        
    }
    else {
        setFormField("life1VitalCareCoverCd", appForm, "disable", null, null);
        blife1VitalCareCdVal = false;
    }
}
if(appForm.life2SpecifiedIllnessCoverAmt ) {
    if(appForm.life2SpecifiedIllnessCoverAmt.value > 0) {
        setFormField("life2VitalCareCoverCd", appForm, "enable", null, null);
        blife2VitalCareCdVal = true;
    }
    else {
        setFormField("life2VitalCareCoverCd", appForm, "disable", null, null);
        blife2VitalCareCdVal = false;
        
    }
}
    



if((appForm.life1LifeCoverAmt) && (appForm.life1SpecifiedIllnessCoverAmt)) {
    
    if((appForm.life1LifeCoverAmt.value > 0) && (appForm.life1SpecifiedIllnessCoverAmt.value > 0)) {
       setFormField("life1SpecifiedIllnessCoverTypeCd", appForm, "enable", null, null);
    }
    if((appForm.life1LifeCoverAmt.value > 0) || (appForm.life1SpecifiedIllnessCoverAmt.value > 0)) {
        
        setFormField("life1HospitalCashCoverAmt", appForm, "enable", null, null);
        setFormField("life1AccidentCoverAmt", appForm, "enable", null, null);
    }
    if((appForm.life1LifeCoverAmt.value <= 0) || (appForm.life1SpecifiedIllnessCoverAmt.value <= 0)) {
        setFormField("life1SpecifiedIllnessCoverTypeCd", appForm, "disable", null, null);
    }
    if((appForm.life1LifeCoverAmt.value <= 0) && (appForm.life1SpecifiedIllnessCoverAmt.value <= 0)) {
        
        setFormField("life1HospitalCashCoverAmt", appForm, "disable", null, null);
        setFormField("life1AccidentCoverAmt", appForm, "disable", null, null);
        setFormField("life1SpecifiedIllnessCoverTypeCd", appForm, "disable", null, null);
    }
}



if((appForm.life2LifeCoverAmt) && (appForm.life2SpecifiedIllnessCoverAmt)) {
    if((appForm.life2LifeCoverAmt.value > 0) && (appForm.life2SpecifiedIllnessCoverAmt.value > 0)) {
        setFormField("life2SpecifiedIllnessCoverTypeCd", appForm, "enable", null, null);
    }
    if((appForm.life2LifeCoverAmt.value > 0) || (appForm.life2SpecifiedIllnessCoverAmt.value > 0)) {
        setFormField("life2HospitalCashCoverAmt", appForm, "enable", null, null);
        setFormField("life2AccidentCoverAmt", appForm, "enable", null, null);
    }
    if((appForm.life2LifeCoverAmt.value <= 0) && (appForm.life2SpecifiedIllnessCoverAmt.value <= 0)) {
        setFormField("life2HospitalCashCoverAmt", appForm, "disable", null, null);
        setFormField("life2AccidentCoverAmt", appForm, "disable", null, null);
        setFormField("life2SpecifiedIllnessCoverTypeCd", appForm, "disable", null, null);
    }
    if((appForm.life2LifeCoverAmt.value <= 0) || (appForm.life2SpecifiedIllnessCoverAmt.value <= 0)) {
        setFormField("life2SpecifiedIllnessCoverTypeCd", appForm, "disable", null, null);
    }
 
}

}

function contractTermCdChange() {
    

   
  if(appForm.contractTermCd) {
    if( (appForm.contractTermCd.selectedIndex == 0 ) || 
		(appForm.contractTermCd.selectedIndex == 1 ) || 
			(appForm.contractTermCd.selectedIndex == 2)) {    
        setFormField("contractTermQty", appForm, "disable", null, null);
    }
    else if( appForm.contractTermCd.selectedIndex == 3 ) { 
        setFormField("contractTermQty", appForm, "enable", null, null);
    }
  }
}


function enableLifeCoverFundRelationshipCd()



{
   if( appForm.life1LifeCoverAmt && appForm.lifeCoverFundRelationshipCd )
   {
        if ( appForm.life1LifeCoverAmt.value > 0 )
        {
			setFormField("lifeCoverFundRelationshipCd", appForm, "enable", appLayer, mandatoryFieldNames);
        }
        else
        {
			setFormField("lifeCoverFundRelationshipCd", appForm, "disable", appLayer, mandatoryFieldNames);
		}
    }
}




var bBenefitInflationProt = false;

function benefitInflationProt(radio)
{
	
    radio.checked = bBenefitInflationProt;
}


function enableBenefitInflationProtectionAppliesCd()



{
   if( appForm.life1LifeCoverAmt && appForm.premiumInflationProtectionAppliesCd 
        && appForm.benefitInflationProtectionAppliesCd )
   {
        if ( appForm.life1LifeCoverAmt.value > 0 
                && appForm.premiumInflationProtectionAppliesCd[0].checked )
        {
			setFormField("benefitInflationProtectionAppliesCd", appForm, "enable", appLayer, mandatoryFieldNames);
	        bBenefitInflationProt = true;
	    }
	    else
	    {
			setFormField("benefitInflationProtectionAppliesCd", appForm, "disable", appLayer, mandatoryFieldNames);
	        bBenefitInflationProt = false;
	    }
    }
}



function startDateHoldCdClick()

{
    if (appForm.startDateHoldCd[1].checked)
    {
        setFormField("commencementDtDay", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("commencementDtMonth", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("commencementDtYear", appForm, "disable", appLayer, mandatoryFieldNames);
    }
    else
    {
        setFormField("commencementDtDay", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("commencementDtMonth", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("commencementDtYear", appForm, "enable", appLayer, mandatoryFieldNames);
    }
}


function otherDisabilityBenefitEntitlementAppliesCdClick()

{
	var otherDisabilityBenefitValue = "";

	if ( appForm.otherDisabilityBenefitEntitlementAppliesCd )
	{
		otherDisabilityBenefitValue = getFieldValue(appForm.otherDisabilityBenefitEntitlementAppliesCd);		
		otherDisabilityBenefitDetails(otherDisabilityBenefitValue);
	}
}


function otherDisabilityBenefitDetails(sOtherBenefit)


{
   if(sOtherBenefit == "Y")
   {
		
		
	 
		setFormField("otherDisabilityBenefitEntitlementProviderTxt",appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("otherDisabilityBenefitEntitlementAmt",appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("otherDisabilityBenefitEntitlementContinueCd",appForm, "enable", appLayer, mandatoryFieldNames);
	
		
   }
   else 
   {
		
		
	
		setFormField("otherDisabilityBenefitEntitlementProviderTxt",appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("otherDisabilityBenefitEntitlementAmt",appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("otherDisabilityBenefitEntitlementContinueCd",appForm, "disable", appLayer, mandatoryFieldNames);
   }

   return true;
}


function pensionPaymentProtectionCdClick ()
{
	var pensionPaymentProtectionCdValue;

    pensionPaymentProtectionCdValue = getFieldValue(appForm.pensionPaymentProtectionCd);

	if (pensionPaymentProtectionCdValue =="Y")
	{
    	setFormField("pensionPaymentProtectionAmt",appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("protectionAppliesPolicyNo",appForm, "enable", appLayer, mandatoryFieldNames);
    }
	else
    {
    	setFormField("pensionPaymentProtectionAmt",appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("protectionAppliesPolicyNo",appForm, "disable", appLayer, mandatoryFieldNames);
    }
}
