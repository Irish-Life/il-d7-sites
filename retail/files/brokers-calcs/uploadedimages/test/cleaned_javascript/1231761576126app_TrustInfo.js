

function appointorForeNameKeyUp() { checkAppointorName(); }
function appointorSurNameKeyUp() { checkAppointorName(); }

function appointorAddressLine1TxtKeyUp() { checkAddressFields('appointor', 2); }
function appointorAddressLine2TxtKeyUp() { checkAddressFields('appointor', 3); }
function appointorAddressLine3TxtKeyUp() { checkAddressFields('appointor', 4); }
function appointorAddressLine4TxtKeyUp() { }



function issuedInTrustCdClick()
{
	var statusEnableDisable = "disable";
	var issuedInTrustCdValue = "";
	issuedInTrustCdValue = getFieldValue(appForm.issuedInTrustCd);

	if ("Y" == issuedInTrustCdValue)
	{
		statusEnableDisable = "enable";
	}

	
	setFormField("trustTypeCd", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorTitleCd", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorForeName", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorSurName", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorAddressLine1Txt", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorAddressLine2Txt", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorAddressLine3Txt", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorAddressLine4Txt", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorIrishLifeDataConsentCd", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("appointorThirdPartyDataConsentCd", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);

	trustTypeCdChange();
	
	checkAppointorName();
	
	appointorAddressLine1TxtKeyUp();
	appointorAddressLine2TxtKeyUp();
	appointorAddressLine3TxtKeyUp();
	
	enableDisableElectronicSignatureInputCd();
}



function trustTypeCdChange()
{
	var statusEnableDisable = "disable";
	var trustTypeCdValue = "";
	trustTypeCdValue = getFieldValue(appForm.trustTypeCd);

	if ("X" == trustTypeCdValue)
	{
		statusEnableDisable = "enable";
		setDynamicOutput(letterOfExchangeSignedDtOutput, "letterOfExchangeSignedDtPosition");
	}
	else
	{
		setDynamicOutput("", "letterOfExchangeSignedDtPosition");
	}

	
	setFormField("letterOfExchangeSignedDtDay", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("letterOfExchangeSignedDtMonth", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("letterOfExchangeSignedDtYear", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("letterOfExchangeSignedBy", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
	setFormField("letterOfExchangeSignedPosition", appForm, statusEnableDisable, appLayer, mandatoryFieldNames);
}



function checkAppointorName()
{
	if (appForm.appointorForeName && appForm.appointorSurName)
	{
		var foreNameLength = appForm.appointorForeName.value.length;
		var surNameLength = appForm.appointorSurName.value.length;
		
		if ( foreNameLength > 0 && surNameLength == 0 )
		{
			setMandatoryStatus('appointorSurName', true);
		}
		else if ( foreNameLength == 0 && surNameLength > 0 )
		{
			setMandatoryStatus('appointorForeName', true);
		}
		else
		{
			setMandatoryStatus('appointorForeName', false);
			setMandatoryStatus('appointorSurName', false);
		}
	}
}
