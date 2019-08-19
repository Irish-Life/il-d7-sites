



var isLife2AddressMadeMand = false;


function life1AddressLine1TxtKeyUp() { checkAddressFields('life1', 2); }
function life1AddressLine2TxtKeyUp() { checkAddressFields('life1', 3); }
function life1AddressLine3TxtKeyUp() { checkAddressFields('life1', 4); }

function life2AddressLine1TxtKeyUp() { checkAddressFields('life2', 2); checkLife2Address(); }
function life2AddressLine2TxtKeyUp() { checkAddressFields('life2', 3); checkLife2Address(); }
function life2AddressLine3TxtKeyUp() { checkAddressFields('life2', 4); checkLife2Address(); }
function life2AddressLine4TxtKeyUp() { checkLife2Address(); }


function checkLife2Address()
{
	if ( appForm.life2AddressLine1Txt && appForm.life2AddressLine2Txt 
		&& appForm.life2AddressLine3Txt && appForm.life2AddressLine4Txt)
	{
		if ( appForm.life2AddressLine1Txt.value.length > 0
			|| appForm.life2AddressLine2Txt.value.length > 0 
			|| appForm.life2AddressLine3Txt.value.length > 0 
			|| appForm.life2AddressLine4Txt.value.length > 0 )
		{
			if ( !isLife2AddressMadeMand )
			{
				setMandatoryStatus('life2AddressLine1Txt', true);
				setMandatoryStatus('life2AddressLine2Txt', true);
				isLife2AddressMadeMand = true;
			}
		}
		else
		{
			if ( isLife2AddressMadeMand )
			{
				setMandatoryStatus('life2AddressLine1Txt', false);
				setMandatoryStatus('life2AddressLine2Txt', false);
				isLife2AddressMadeMand = false;
			}
		}
	}
}
