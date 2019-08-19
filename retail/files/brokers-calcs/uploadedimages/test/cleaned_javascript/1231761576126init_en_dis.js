

if(document.all)
{
	appForm = document.all.ApplicationForm;
	appLayer = document.all;
}
else
{
	appForm = document.layers[0].document.forms[0];
	appLayer = document.layers[0].document.layers;
}

var isInit = true;



var addressPrefixes = new Array("life1", "life2");
var ADDRESS_LINE = "AddressLine";
var ADDRESS_SUFFIX = "Txt";

	if(appForm.specialArrangementCd)
	{
	    setExtraInvPct();
	}
	
	
	if(appForm.transferValuePremiumAmt)
	{
	    enableTransferValuePremiumSourceCd();
	}
	
	if(appForm.singlePremiumAmt)
	{	
		enablespPaymentSourceCd();
	}
	   
	
	for (var addressPrefixIndex = 0; addressPrefixIndex < addressPrefixes.length; addressPrefixIndex++)
	{
		checkAddressFields(addressPrefixes[addressPrefixIndex], 2);
	}
	
	
	
	checkLife2Address();
	
	
	
	if(appForm.proposerHdrTxt)
	{
		var proposerHdrTxtValue = getFieldValue(appForm.proposerHdrTxt);
	
		if(appForm.persProposerSexCd)
		{
			appForm.persProposerSexCd[0].onclick = persPropSexRadioM;
		}
	
		if(appForm.persProposerSexCd)
		{
			appForm.persProposerSexCd[1].onclick = persPropSexRadioF;
		}
	
	
		setupPolicyOwnerSection(proposerHdrTxtValue);
	
		proposerDetails(proposerHdrTxtValue, appForm);
	}
	else if ( appForm.blockBusinessNameTxt )
	{
		
	
		setupPolicyOwnerSection("B");
	
		proposerDetails("B",appForm);
	}
	else if (!appForm.proposerHdrTxt)
	{
	    
		 
		setupGenericPolicyOwnerSection();
		
		genericProposerDetails(appForm);
	}
	
	
	if (appForm.issuedInTrustCd)
	{
		issuedInTrustCdClick();
	}
	
	
	
	function assignSelectValue(select,value)
	{
	    for(var i=0;i<select.length;i++)
	    {
			if(value == select.options[i].value)
			{
	            select.options[i].selected = true;
	            break;
	        }
	    }
	}
	
	
	if(appForm.life1CountryOfBirthTxt)
	{
	    if(sLife1BirthCountryVal != "") assignSelectValue(appForm.life1CountryOfBirthTxt,sLife1BirthCountryVal);
	}
	
	if(appForm.life2CountryOfBirthTxt)
	{
	    if(sLife2BirthCountryVal != "") assignSelectValue(appForm.life2CountryOfBirthTxt,sLife2BirthCountryVal);
	}
	
	if(appForm.life1Occupation1Cd)
	{
	    if(sLife1Occ1Val != "") assignSelectValue(appForm.life1Occupation1Cd,sLife1Occ1Val);
	}
	
	if(appForm.life2Occupation1Cd)
	{
	    if(sLife2Occ1Val != "") assignSelectValue(appForm.life2Occupation1Cd,sLife2Occ1Val);
	}
	
	
	
	enableMortgageCodes(appForm);
	
	
	
	function initEmployerFields()
	{
	    if(appForm.employerNm)
	    {
	        enableEmployerFields(appForm);
	    }
	}
	
	initEmployerFields();
	
	
	
	
	if(appForm.commissionSplitCd)
	{
		if( appForm.commissionSplitCd[0].checked)
		{
	 		splitCommission('enable');
		}
	}
	
	
	
	
	
	    
	if (appForm.regularCashIncomeCd)
	{
		regularCashIncomeCdClick();
	}	
	
	function initDdBankDetails()
	{
	    if(appForm)
	    {
	        enableInitialDdBankDetails();
	    }
	}    
	
	initDdBankDetails();
	
	
	
	function initBenefitDetails()
	{
		if(appForm)
	    {
	        if(appForm.life1SpecifiedIllnessCoverAmt || appForm.life2SpecifiedIllnessCoverAmt)
			enableVitalCareCd();
	        contractTermCdChange();
	    }
	    
	}
	
	initBenefitDetails();
	
	
	function initPensionBenefitDetails()
	{
		if(appForm)
		{
	        enableLifeCoverFundRelationshipCd();
	        enableBenefitInflationProtectionAppliesCd();
	
			
			applicationUnderAGroupAppliesCdClick();
		}
	}
	
	initPensionBenefitDetails();
	
	
	if (appForm.defaultInvestmentStrategyCd)
	{
		enableDisableDISWarning();
	}
	
	
	function initIndividualInvService()
	{
	    if (appForm)
	    {
	        enableIisFundOption();
	    }
	}
	
	initIndividualInvService();
	
	
	if (appForm.startDateHoldCd)
	{
		startDateHoldCdClick();
	}
	
	if (appForm.conversionOptionCd)
	{
		conversionOptionCdClick();
	}
	
	if (appForm.pensionPaymentProtectionCd)
	{
		pensionPaymentProtectionCdClick();
	}
	
	if (appForm.otherDisabilityBenefitEntitlementAppliesCd)
	{
		otherDisabilityBenefitEntitlementAppliesCdClick();
	}
	
	
	if ( appForm.life1OccupationClassCd )
	{
		setFormField("life1OccupationClassCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	
	if ( appForm.life2OccupationClassCd )
	{
		setFormField("life2OccupationClassCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	
	if ( appForm.life1ACOccupationClassCd )
	{
		setFormField("life1ACOccupationClassCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	
	if ( appForm.life2ACOccupationClassCd )
	{
		setFormField("life2ACOccupationClassCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	
	if ( appForm.life1PHIOccClassCd )
	{
		setFormField("life1PHIOccClassCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	
	
	function startDateHoldCdClick()
	
	{
		var statusEnableDisable = "disable";
		
		startDateHoldCdValue = getFieldValue(appForm.startDateHoldCd);
	
		if ("N" == startDateHoldCdValue)
		{
			statusEnableDisable = "enable";
		}
	
		
		setFormField("confirmStartDateHoldCd", appForm, statusEnableDisable, null, mandatoryFieldNames);
		
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
	
	
	function pensionPaymentProtectionCdClick()
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
	
	
	function otherDisabilityBenefitEntitlementAppliesCdClick()
	
	{
		var otherDisabilityBenefitValue = "";  	
	   	
		if ( appForm.otherDisabilityBenefitEntitlementAppliesCd )
		{
	    	otherDisabilityBenefitValue = getFieldValue(appForm.otherDisabilityBenefitEntitlementAppliesCd); 
			otherDisabilityBenefitDetails(otherDisabilityBenefitValue);
		}
	}
	
	
	if (appForm.replacementPolicyCd)
	{
		replacementPolicyCdClick();
	}
	
	
	if (appForm.electronicSignatureInputCd)
	{
		enableDisableElectronicSignatureInputCd();
	}
	
	
	if (appForm.spPaymentSourceCd)
	{
		spPaymentSourceCdChange();
	}
	
	
	isInit = false;
