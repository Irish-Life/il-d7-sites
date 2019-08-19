


function regularCashIncomeCdClick()
{
	var regularCashIncomeCdValue = getFieldValue(appForm.regularCashIncomeCd);
	
	if ("Y" == regularCashIncomeCdValue)
	{
		setFormField("regularCashIncomeOptionsCd", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("incomePaymentFrequencyCd", appForm, "enable", appLayer, mandatoryFieldNames);
		
		setDynamicOutput(firstIncomePaymentDtOutput, "firstIncomePaymentDtPosition");

		setFormField("firstIncomePaymentDtDay", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("firstIncomePaymentDtMonth", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("firstIncomePaymentDtYear", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("incomePaymentDestinationCd", appForm, "enable", appLayer, mandatoryFieldNames);
	}
	else
	{
		setFormField("regularCashIncomeOptionsCd", appForm, "disable", appLayer, mandatoryFieldNames);	
		setFormField("incomePaymentFrequencyCd", appForm, "disable", appLayer, mandatoryFieldNames);

		setDynamicOutput("", "firstIncomePaymentDtPosition");

		setFormField("firstIncomePaymentDtDay", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("firstIncomePaymentDtMonth", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("firstIncomePaymentDtYear", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField("incomePaymentDestinationCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	regularCashIncomeOptionsCdChange();
	incomePaymentFrequencyCdChange();	
}


function regularCashIncomeOptionsCdChange()
{
	var regularCashIncomeOptionsCdValue = getFieldValue(appForm.regularCashIncomeOptionsCd);
	
	if ("P" == regularCashIncomeOptionsCdValue)
	{
		setFormField("annualIncomePct", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("fixedCashAmt", appForm, "disable", appLayer, mandatoryFieldNames);	
	}
	else if ("F" == regularCashIncomeOptionsCdValue)
	{
		setFormField("fixedCashAmt", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("annualIncomePct", appForm, "disable", appLayer, mandatoryFieldNames);	
	}
	else
	{
		setFormField("annualIncomePct", appForm, "disable", appLayer, mandatoryFieldNames);	
		setFormField("fixedCashAmt", appForm, "disable", appLayer, mandatoryFieldNames);	
	}
		
}


function incomePaymentFrequencyCdChange()
{
	if ( appForm.incomePaymentDestinationCd )
	{
		if(appForm.incomePaymentFrequencyCd.selectedIndex != 1) 
		{
			appForm.incomePaymentDestinationCd.onfocus = "";

			appForm.incomePaymentDestinationCd.disabled = false;
		}
		else 
		{
			appForm.incomePaymentDestinationCd.onfocus = appForm.incomePaymentDestinationCd.blur;
			
			appForm.incomePaymentDestinationCd.disabled = true;

			appForm.incomePaymentDestinationCd.selectedIndex = 2; 
    	}
	}

	enableInitialBankDetails(appForm);
	
}

function incomePaymentDestinationCdChange()
{
	enableInitialBankDetails(appForm);
}


function enableInitialBankDetails(form) 
{
	var isBankChosen = false;

	if ( form.incomePaymentDestinationCd )
	{
		
		if(form.incomePaymentDestinationCd.selectedIndex == 2)
			isBankChosen = true;
	}

	if( !isBankChosen )
	{
		if ( document.all["aiBankHeaderPosition"] )
		{
			document.all["TDaiBankHeaderPosition"].style.backgroundColor = readStylesheet(".bodyBackground");
			setDynamicOutput("", "aiBankHeaderPosition");
		}
		if ( document.all["aiBankSectionPosition"] )
		{
			document.all["TDaiBankSectionPosition"].style.backgroundColor = readStylesheet(".bodyBackground");
			setDynamicOutput("", "aiBankSectionPosition");
		}
		if ( document.all["aiBankFooterPosition"] )
		{
			document.all["TDaiBankFooterPosition"].style.backgroundColor = readStylesheet(".bodyBackground");
			setDynamicOutput("", "aiBankFooterPosition");
		}
	}
	else
	{
		if ( document.all["aiBankHeaderPosition"] )
		{
			document.all["TDaiBankHeaderPosition"].style.backgroundColor = readStylesheet(".whiteheading");
			setDynamicOutput(eval("aiBankHeaderOutput"), "aiBankHeaderPosition");
		}
		if ( document.all["aiBankSectionPosition"] )
		{
			document.all["TDaiBankSectionPosition"].style.backgroundColor = readStylesheet(".questions");
			setDynamicOutput(eval("aiBankSectionOutput"), "aiBankSectionPosition");
		}
		if ( document.all["aiBankFooterPosition"] )
		{
			document.all["TDaiBankFooterPosition"].style.backgroundColor = readStylesheet(".bodyBackground");
			setDynamicOutput(eval("aiBankFooterOutput"), "aiBankFooterPosition");
		}

		
		setFormField("aiBankSortCd1", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("aiBankSortCd2", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField("aiBankSortCd3", appForm, "enable", appLayer, mandatoryFieldNames);

		
		enableBankDetails(form);
	}
}




function enableBankDetails(form)
{
	if( (form.aiBankSortCd1) && (form.aiBankSortCd2) && (form.aiBankSortCd3) )
	{ 
		if( (form.aiBankSortCd1.value != '') && (form.aiBankSortCd2.value != '') 
				&& (form.aiBankSortCd3.value != '') )
		{
			setFormField("aiBankAccountNo", form, "enable", appLayer, mandatoryFieldNames);
		}
		else
		{
			setFormField("aiBankAccountNo", form, "disable", appLayer, mandatoryFieldNames);
		}
	}

	if(form.aiBankAccountNo)
	{
		if(form.aiBankAccountNo.value > 0)
			setFormField("aiBankAccountNm", form, "enable", appLayer, mandatoryFieldNames);
		else
			setFormField("aiBankAccountNm", form, "disable", appLayer, mandatoryFieldNames);
	}
}
