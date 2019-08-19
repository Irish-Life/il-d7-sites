


 
function replacementPolicyCdClick()
{
	var replacementPolicyCdValue = "";
	replacementPolicyCdValue = getFieldValue(appForm.replacementPolicyCd);
	
	if ("Y" == replacementPolicyCdValue)	
	{
		setFormField("replacementPolicyNo", appForm, "enable", appLayer, mandatoryFieldNames);
	}
	else
	{
		setFormField("replacementPolicyNo", appForm, "disable", appLayer, mandatoryFieldNames);
	}
}


 
function paperProposalInputCdClick()
{
	enableDisableElectronicSignatureInputCd();
}



function enableDisableElectronicSignatureInputCd()
{
	var paperProposalInputCdValue = getFieldValue(appForm.paperProposalInputCd);
	var issuedInTrustCdValue = getFieldValue(appForm.issuedInTrustCd);
	var conversionOptionAssignedInTrustCdValue = getFieldValue(appForm.conversionOptionAssignedInTrustCd);
	var transferValuePremiumAmtValue = getFieldValue(appForm.transferValuePremiumAmt);
	var proposerHdrTxtValue = getFieldValue(appForm.proposerHdrTxt);
	var brokingForBusinessCdValue = getFieldValue(appForm.brokingForBusinessCd);
	
	if ( ("Y" == paperProposalInputCdValue) || 
		 ("Y" == issuedInTrustCdValue) || 
		 ("Y" == conversionOptionAssignedInTrustCdValue) || 
		 (transferValuePremiumAmtValue > 0) || 
		 ("B" == proposerHdrTxtValue) || 
		 ("Y" == brokingForBusinessCdValue))
	{
		setFormField("electronicSignatureInputCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
	else
	{
		setFormField("electronicSignatureInputCd", appForm, "enable", appLayer, mandatoryFieldNames);
	}
}
