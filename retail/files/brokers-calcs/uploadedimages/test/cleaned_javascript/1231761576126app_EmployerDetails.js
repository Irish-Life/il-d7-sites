

function enableEmployerFields(form)
{
    if(form.employerNm.value != '')      
        {
            setFormField("employerCorrespondenceAddressLine1Txt", form, "enable", appLayer, mandatoryFieldNames);
            setFormField("employerCorrespondenceAddressLine2Txt", form, "enable", appLayer, mandatoryFieldNames);
            setFormField("employerCorrespondenceAddressLine3Txt", form, "enable", appLayer, mandatoryFieldNames);
            setFormField("employerCorrespondenceAddressLine4Txt", form, "enable", appLayer, mandatoryFieldNames);
            setFormField("employerContactNm", form, "enable", appLayer, mandatoryFieldNames);
            setFormField("employerContactPhonePrefixNo", form, "enable", appLayer, mandatoryFieldNames);
            setFormField("employerContactPhoneNo", form, "enable", appLayer, mandatoryFieldNames);
        }
        else
        {
            setFormField("employerCorrespondenceAddressLine1Txt", form, "disable", appLayer, mandatoryFieldNames);
            setFormField("employerCorrespondenceAddressLine2Txt", form, "disable", appLayer, mandatoryFieldNames);
            setFormField("employerCorrespondenceAddressLine3Txt", form, "disable", appLayer, mandatoryFieldNames);
            setFormField("employerCorrespondenceAddressLine4Txt", form, "disable", appLayer, mandatoryFieldNames);
            setFormField("employerContactNm", form, "disable", appLayer, mandatoryFieldNames);
            setFormField("employerContactPhonePrefixNo", form, "disable", appLayer, mandatoryFieldNames);
            setFormField("employerContactPhoneNo", form, "disable", appLayer, mandatoryFieldNames);
        }
}    
