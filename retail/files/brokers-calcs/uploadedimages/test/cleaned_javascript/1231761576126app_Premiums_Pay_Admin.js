


var REGULAR_PREMIUM_FIELD_NAMES = 
["savingsPremiumAmt", "regularPremiumAmt", "employerRecurringPremiumAmt",
 "employeeRecurringPremiumAmt", "avcRecurringPremiumAmt"];

var SINGLE_PREMIUM_FIELD_NAMES = 
["singlePremiumAmt", "transferValuePremiumAmt", "employerSinglePremiumAmt",
 "employeeSinglePremiumAmt", "avcSinglePremiumAmt"];

var REGULAR_PREMIUM_FIELDS = null;

var SINGLE_PREMIUM_FIELDS = null;

var regularInitialised = false; 
var singleInitialised = false; 
var regularEnabled = false; 
var singleEnabled = false; 


function regularPremiumAmtKeyUp() {enableForPremiums("regular");}
function singlePremiumAmtKeyUp() {enableForPremiums("lump");}


function enableForPremiums(regularLumpOrSp)
{
    

    var premiumsArray = null;

    
    if (regularLumpOrSp == "regular")
    {
        if ( !REGULAR_PREMIUM_FIELDS )
            REGULAR_PREMIUM_FIELDS = getPremiumFields(REGULAR_PREMIUM_FIELD_NAMES);
        premiumsArray = REGULAR_PREMIUM_FIELDS;
    } else {
        if ( !SINGLE_PREMIUM_FIELDS )
            SINGLE_PREMIUM_FIELDS = getPremiumFields(SINGLE_PREMIUM_FIELD_NAMES);
        premiumsArray = SINGLE_PREMIUM_FIELDS;
    }


    if ( premiumsArray )
    {
        if ( premiumsArray.length > 0 )
        {
            premiumsArray.sort(testPremsForSorting);

            var premiumsArraySize = premiumsArray.length;

            if (regularLumpOrSp == "regular")
            {
                 regularEnable(premiumsArray[premiumsArraySize-1]);
            }
            else if (regularLumpOrSp == "lump")
            {
                lumpEnable(premiumsArray[premiumsArraySize-1]);
            }
            else if (regularLumpOrSp == "sp")
            {
                 spEnable(premiumsArray[premiumsArraySize-1]);
            }
        }
    }
}

function testPremsForSorting(firstPrem, secondPrem)
{
    

     var returnValue = 0;
     var useFirstPremValue = 0;
     var useSecondPremValue = 0;
                
     if (firstPrem && secondPrem)
     {
         if (firstPrem.value > 0)  useFirstPremValue = firstPrem.value;
         if (secondPrem.value > 0)  useSecondPremValue = secondPrem.value;
   
         returnValue = useFirstPremValue - useSecondPremValue;
      }    
                
      return returnValue;
}


function getPremiumFields(premiumFieldNames)
{
    

    var premiumsFieldArray = new Array();
    var premiumField = null;
    var premiumFieldIndex = 0;

    for ( var i = 0; i < premiumFieldNames.length; i++ )
    {
        premiumField = appForm[premiumFieldNames[i]];
        if (premiumField)
        {
            premiumsFieldArray[premiumFieldIndex] = premiumField;
            premiumFieldIndex++;
        }
    }

    return premiumsFieldArray;
}


function splitCommission(sStatus)



{
   if(sStatus == "enable")	
	{
		setFormField("commissionSplitPct", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("commissionSplit2ndSellerCd", appForm, "enable", appLayer, mandatoryFieldNames);
	}
	else 	
	{
		setFormField("commissionSplitPct", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("commissionSplit2ndSellerCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
}


function regularEnable(premiumField)
{
     

    if ( !premiumField ) 
        return;
        

    
    if ( !appForm.defaultInvestmentStrategyCd ) {
        if ( regularInitialised ) 
        {
            if ( (premiumField.value > 0 && regularEnabled)
                 || (premiumField.value < 1 && !regularEnabled) ) 
            {
                if ( appForm.specialArrangementCd ) setExtraInvPct();
                return;
            }
        }
    }

    if( premiumField.value > 0 ) 
    {
        setFormField("savingsCommissionProfileCd", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("savingsPctOfMaxInitialCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("savingsPctOfMaxRenewalCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("savingsPctOfMaxFundCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("singlePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("employerSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("employeeSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("avcSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);

        enableForPremiums('lump');

        if ( appForm.specialArrangementCd ) {
            setExtraInvPct();
        }
    }
    else 
    {
        setFormField("savingsCommissionProfileCd", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("savingsPctOfMaxInitialCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("savingsPctOfMaxRenewalCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("savingsPctOfMaxFundCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("singlePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("employerSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("employeeSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("avcSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

        enableForPremiums('lump');

        if ( appForm.specialArrangementCd ) {
            setExtraInvPct();
        }
    }

    
    
    var isIndividualService = false;
    if (appForm.iisIndicatorCd)
    {
        
        
        if (appForm.iisIndicatorCd.selectedIndex>1) 
            isIndividualService = true;          
    }

    
    var isDefaultInvestmentService = false;
    var defaultInvestmentAsked = false;
    if (appForm.defaultInvestmentStrategyCd)
    {
        defaultInvestmentAsked = true;
        
        
        if (appForm.defaultInvestmentStrategyCd[0].checked) 
            isDefaultInvestmentService = true;          
    }

    var enableForDefaultInvestmentService = false;

  if (!isDefaultInvestmentService) 
  {
    if (premiumField.value > 0 || isRegularPremMand) 
    {
        enableForDefaultInvestmentService = true;
    }
  }

    if (enableForDefaultInvestmentService)
    {
        setFormField("fund1InvestmentPct", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("fund1InvestmentAmt", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("fund1Nm", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("fundFooter", appForm, "enable", appLayer, mandatoryFieldNames);
        setFormField("spAddOnFundFooter", appForm, "enable", appLayer, mandatoryFieldNames);
    }
    else 
    {
        setFormField("fund1InvestmentPct", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("fund1InvestmentAmt", appForm, "disable", appLayer, mandatoryFieldNames);

        if(appForm.fund1Nm)
        {
            appForm.fund1Nm.selectedIndex = 0;
            fundAmount(1,appForm.fund1Nm,"fund");
            setFormField("fund1Nm", appForm, "disable", appLayer, mandatoryFieldNames);
        }

        setFormField("fundFooter", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("spAddOnFundFooter", appForm, "disable", appLayer, mandatoryFieldNames);
    }

    if( premiumField.value > 0 ) regularEnabled = true;
    else regularEnabled = false;

    if ( !regularInitialised ) regularInitialised = true;
}


function lumpEnable(premiumField)
{
     

    if ( !premiumField )
        return;

    if (!appForm.defaultInvestmentStrategyCd)
    {
        
        if ( singleInitialised ) 
        {
            if ( (premiumField.value > 0 && singleEnabled)
                 || (premiumField.value < 1 && !singleEnabled) )
            {
                if ( appForm.specialArrangementCd ) setExtraInvPct();
                return;
            }
        }
    }

    
    var isIndividualService = false;
    if (appForm.iisIndicatorCd)
    {
        
        if (appForm.iisIndicatorCd.selectedIndex>1) 
        {
            if (appForm.iisIndicatorCd.options[appForm.iisIndicatorCd.selectedIndex].value >="2")
            {
                isIndividualService = true;  
            }
        }
    }

    
    var isDefaultInvestmentService = false;
    var defaultInvestmentAsked = false;
    if (appForm.defaultInvestmentStrategyCd)
    {
       defaultInvestmentAsked = true;
       
       if (appForm.defaultInvestmentStrategyCd[0].checked) 
       {
            isDefaultInvestmentService = true;  
       }
    }

    if(premiumField.value > 0) 
    {
        
        if ( appForm.specialArrangementCd )
        {
            setExtraInvPct();
        }

        
        if ( premiumField.name.indexOf("transferValue") == -1 )
        {
            setFormField("spAddOnCommissionProfileCd", appForm, "enable", appLayer, mandatoryFieldNames);
            setFormField("pctOfMaxSpAddOnInitialCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
            setFormField("pctOfMaxSpAddOnFundCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
        }

        if (!isDefaultInvestmentService)
        {
            setFormField("spAddOnFund1Nm", appForm, "enable", appLayer, mandatoryFieldNames);
        }
        else
        {
            if(appForm.spAddOnFund1Nm) {
                appForm.spAddOnFund1Nm.selectedIndex = 0;
                fundAmount(1,appForm.spAddOnFund1Nm,"spAddOnFund");
                setFormField("spAddOnFund1Nm", appForm, "disable", appLayer, mandatoryFieldNames);
            }

        }	   

        
        if ( appForm.spAddOnFund1Nm ) 
        {
            if ( !appForm.specialArrangementCd ) 
            {
                setFormField("inputSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                setFormField("inputEmployerSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                setFormField("inputEmployeeSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                setFormField("inputAvcSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
            }	
        }
        
        
        
        if (appForm.iisIndicatorCd && !appForm.defaultInvestmentStrategyCd)
        {
            createIISIndicatorOptions(appForm.iisIndicatorCd);
        }

    }
    else 
    {
        
        if ( appForm.specialArrangementCd )
        {
            setExtraInvPct();
        }

        setFormField("spAddOnCommissionProfileCd", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("pctOfMaxSpAddOnInitialCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);
        setFormField("pctOfMaxSpAddOnFundCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);

        if(appForm.spAddOnFund1Nm) {
            appForm.spAddOnFund1Nm.selectedIndex = 0;
            fundAmount(1,appForm.spAddOnFund1Nm,"spAddOnFund");
            setFormField("spAddOnFund1Nm", appForm, "disable", appLayer, mandatoryFieldNames);
        }

        
        if ( appForm.spAddOnFund1Nm ) 
        {
            if ( !appForm.specialArrangementCd ) 
            {
                setFormField("inputSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
                setFormField("inputEmployerSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
                setFormField("inputEmployeeSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
                setFormField("inputAvcSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
            }
        }
        
		
		spPaymentSourceCdChange();
		
        
        //as there is no single premium	
        if (appForm.iisIndicatorCd && !appForm.defaultInvestmentStrategyCd)
        {
            removeIISIndicatorOption(appForm.iisIndicatorCd,2); 
        }

    }

    if( premiumField.value > 0 ) singleEnabled = true;
    else singleEnabled = false;

    if ( !singleInitialised ) singleInitialised = true;
}


function spEnable(singPrem)


{
   
   var isIndividualService = false;
   if (appForm.iisIndicatorCd)
   {
        
       if (appForm.iisIndicatorCd.selectedIndex>1) 
       {
            if (appForm.iisIndicatorCd.options[appForm.iisIndicatorCd.selectedIndex].value =="2")
            {
                isIndividualService = true;  
            }
       }
   }
   
   
   var isDefaultInvestmentService = false;
   var defaultInvestmentAsked = false;
   if (appForm.defaultInvestmentStrategyCd)
   {
       defaultInvestmentAsked = true; 
        
       if (appForm.defaultInvestmentStrategyCd[0].checked) 
       {
            isDefaultInvestmentService = true;  
       }
   }
   
   if (!isDefaultInvestmentService) 
   {
		setFormField("fund1InvestmentPct", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("fund1InvestmentAmt", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("fund1Nm", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("fundFooter", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("spAddOnFundFooter", appForm, "enable", appLayer, mandatoryFieldNames);
   }
   else 
   {
	  setFormField("fund1InvestmentPct", appForm, "disable", appLayer, mandatoryFieldNames);
	  setFormField("fund1InvestmentAmt", appForm, "disable", appLayer, mandatoryFieldNames);

	  if(appForm.fund1Nm) {
	      appForm.fund1Nm.selectedIndex = 0;
	      fundAmount(1,appForm.fund1Nm,"fund");
		setFormField("fund1Nm", appForm, "disable", appLayer, mandatoryFieldNames);
	  }

		setFormField("fundFooter", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("spAddOnFundFooter", appForm, "disable", appLayer, mandatoryFieldNames);

   }

}



function setExtraInvPct()
{
	if(appForm.specialArrangementCd)
	{		
    	var specialArrangement = appForm.specialArrangementCd;
		var regularPremAmt = appForm.regularPremiumAmt;
		var employerRecurringPremAmt = appForm.employerRecurringPremiumAmt;
        var employeeRecurringPremAmt = appForm.employeeRecurringPremiumAmt;
        var avcRecurringPremAmt = appForm.avcRecurringPremiumAmt;

		var singlePremAmt = appForm.singlePremiumAmt;
                var employerSingPremAmt = appForm.employerSinglePremiumAmt;
		var employeeSingPremAmt = appForm.employeeSinglePremiumAmt;
		var avcSingPremAmt = appForm.avcSinglePremiumAmt;

		if(specialArrangement.options[specialArrangement.selectedIndex].value == "XTIN")
		{
		    

		    setFormField("specialArrangementCdExtraInvPct", appForm, "enable", appLayer, mandatoryFieldNames);
		    setFormField("inputRegularPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
            setFormField("inputEmployerRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
            setFormField("inputEmployeeRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
            setFormField("inputAvcRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
            
		    setFormField("inputSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputEmployerSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputEmployeeSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputAvcSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
                }
		else if(specialArrangement.options[specialArrangement.selectedIndex].value == "MIPR")
		{
		    setFormField("specialArrangementCdExtraInvPct", appForm, "disable", appLayer, mandatoryFieldNames);

		    if (singlePremAmt && singlePremAmt.value > 0)		    
			    setFormField("inputSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
		    else
			    setFormField("inputSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

                    if (employerSingPremAmt && employerSingPremAmt.value > 0) 
                        setFormField("inputEmployerSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                    else
                        setFormField("inputEmployerSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

                    if (employeeSingPremAmt && employeeSingPremAmt.value > 0) 
                        setFormField("inputEmployeeSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                    else
                        setFormField("inputEmployeeSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

                    if (avcSingPremAmt && avcSingPremAmt.value > 0) 
                        setFormField("inputAvcSinglePremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                    else
                        setFormField("inputAvcSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

                    if (regularPremAmt && regularPremAmt.value > 0)
			    setFormField("inputRegularPremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
		    else
			    setFormField("inputRegularPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);  
		    
                    if (employerRecurringPremAmt && employerRecurringPremAmt.value > 0) 
                        setFormField("inputEmployerRecurringPremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                    else
                        setFormField("inputEmployerRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

                    if (employeeRecurringPremAmt && employeeRecurringPremAmt.value > 0) 
                        setFormField("inputEmployeeRecurringPremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                    else
                        setFormField("inputEmployeeRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

                    if (avcRecurringPremAmt && avcRecurringPremAmt.value > 0) 
                        setFormField("inputAvcRecurringPremiumAmt", appForm, "enable", appLayer, mandatoryFieldNames);
                    else
                        setFormField("inputAvcRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);

		}
		else
		{
		    setFormField("specialArrangementCdExtraInvPct", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputRegularPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputEmployerRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputEmployeeRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputAvcRecurringPremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputEmployerSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputEmployeeSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		    setFormField("inputAvcSinglePremiumAmt", appForm, "disable", appLayer, mandatoryFieldNames);
	 	}
	}
}

var bddThirdPartyCdVal = false;

function clickDdThirdPartyCode(radio) 
{
 
    
   radio.checked = bddThirdPartyCdVal;
}

var ddPPIFields = new Array("ddThirdPartyCd", "ddDeductPremsDayNo");


function enableInitialDdBankDetails() 
{   

	var isDirectDebit = false;
	var isBrokingForBusiness = false;

	if (appForm.premiumPaymentMethodCd)
	{
		
		if(appForm.premiumPaymentMethodCd.selectedIndex == 1)
			isDirectDebit = true;
	}
    else
	{
	    isDirectDebit = true;
	}    

    if(appForm.brokingForBusinessCd)
    {
        
		if(appForm.brokingForBusinessCd[0].checked)
		{
			isBrokingForBusiness = true;
		}
                        
		enableDisableElectronicSignatureInputCd();
    }

	
    if( !isDirectDebit || isBrokingForBusiness )
	{
		if ( document.all["ddBankSectionPosition"] )
		{
			document.all["TDddBankSectionPosition"].style.backgroundColor = readStylesheet(".bodyBackground");
			setDynamicOutput("", "ddBankSectionPosition");
		}
	}
	else
	{
		if ( document.all["ddBankSectionPosition"] )
		{
			document.all["TDddBankSectionPosition"].style.backgroundColor = readStylesheet(".questions");
			setDynamicOutput(eval("ddBankSectionOutput"), "ddBankSectionPosition");
		}

		
		setFormFieldGroup(ddPPIFields, "enable", appForm, appLayer, mandatoryFieldNames);
		bddThirdPartyCdVal = true;
		
		setFormField("ddBankSortCd1", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("ddBankSortCd2", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("ddBankSortCd3", appForm, "enable", appLayer, mandatoryFieldNames);

		
		enableDdBankDetails(appForm);
	}
}




function enableDdBankDetails(form)
{
	if( (form.ddBankSortCd1) && (form.ddBankSortCd2) && (form.ddBankSortCd3) )
	{ 
		if( (form.ddBankSortCd1.value != '') || (form.ddBankSortCd2.value != '') 
				|| (form.ddBankSortCd3.value != '') )
		{
			setFormField("ddBankAccountNo", form, "enable", appLayer, mandatoryFieldNames);
		}
		else
		{
			setFormField("ddBankAccountNo", form, "disable", appLayer, mandatoryFieldNames);
		}
	}

	if(form.ddBankAccountNo)
	{
		if(form.ddBankAccountNo.value > 0)
			setFormField("ddBankAccountNm", form, "enable", appLayer, mandatoryFieldNames);
		else
			setFormField("ddBankAccountNm", form, "disable", appLayer, mandatoryFieldNames);
	}
}



function enableTransferValuePremiumSourceCd()
{
    if(appForm.transferValuePremiumAmt)
    {
        if(appForm.transferValuePremiumAmt.value > 0)
        {
        	setFormField("transferValuePremiumSourceCd", appForm, "enable", appLayer, mandatoryFieldNames);
        	setFormField("transferValueCommissionProfileCd", appForm, "enable", appLayer, mandatoryFieldNames);
	        setFormField("pctOfMaxTransferValueInitialCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
	        setFormField("pctOfMaxTransferValueFundCommissionPct", appForm, "enable", appLayer, mandatoryFieldNames);
        }
        else
        {
            setFormField("transferValuePremiumSourceCd", appForm, "disable", appLayer, mandatoryFieldNames);
            setFormField("transferValueCommissionProfileCd", appForm, "disable", appLayer, mandatoryFieldNames);
	        setFormField("pctOfMaxTransferValueInitialCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);
	        setFormField("pctOfMaxTransferValueFundCommissionPct", appForm, "disable", appLayer, mandatoryFieldNames);
        }
        
        enableDisableElectronicSignatureInputCd();
    }
}



function enablespPaymentSourceCd()
{
	if(appForm.singlePremiumAmt)
	{
		if(appForm.singlePremiumAmt.value > 0)
		{
			setFormField("spPaymentSourceCd", appForm, "enable", appLayer, mandatoryFieldNames);
		}
		else
		{
			setFormField("spPaymentSourceCd", appForm, "disable", appLayer, mandatoryFieldNames);
		}
	}
}

function spPaymentSourceCdChange()
{
	

	element = appForm.spPaymentSourceCd;
	
	if(element != null)
	{
		if(element.value == "TPC")
		{
			setFormField("ilacEncashedMaturedPolicyNo", appForm, "disable", appLayer, mandatoryFieldNames);
			setFormField("ptsbBankAccountNo", appForm, "disable", appLayer, mandatoryFieldNames);		
			
			setFormField("thirdPartyChqAccountNm", appForm, "enable", appLayer, mandatoryFieldNames);
			
		}
		else if(element.value == "ILAC")
		{		
			setFormField("thirdPartyChqAccountNm", appForm, "disable", appLayer, mandatoryFieldNames);		
			setFormField("ptsbBankAccountNo", appForm, "disable", appLayer, mandatoryFieldNames);
			
			setFormField("ilacEncashedMaturedPolicyNo", appForm, "enable", appLayer, mandatoryFieldNames);		
		}	
		else if(element.value == "PTSBBD" || element.value == "EFT")
		{		
			setFormField("ilacEncashedMaturedPolicyNo", appForm, "disable", appLayer, mandatoryFieldNames);
			setFormField("thirdPartyChqAccountNm", appForm, "disable", appLayer, mandatoryFieldNames);		
			
			setFormField("ptsbBankAccountNo", appForm, "enable", appLayer, mandatoryFieldNames);
		}
		else
		{
			setFormField("ilacEncashedMaturedPolicyNo", appForm, "disable", appLayer, mandatoryFieldNames);
			setFormField("thirdPartyChqAccountNm", appForm, "disable", appLayer, mandatoryFieldNames);		
			setFormField("ptsbBankAccountNo", appForm, "disable", appLayer, mandatoryFieldNames);		
		}
	}
}

