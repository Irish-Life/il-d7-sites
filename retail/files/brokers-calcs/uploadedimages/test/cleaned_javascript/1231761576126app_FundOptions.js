


var maxNumFundFields;


var maxNumAddonFundFields;

function iisIndicatorCdChange()
{
	enableIisFundOption();
	
	
	if (appForm.iisFundOptionCd)
	{
		if(appForm.iisIndicatorCd.selectedIndex >1)		
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
		else
		{
			setFormField("fund1InvestmentPct", appForm, "enable", appLayer, mandatoryFieldNames);
			setFormField("fund1InvestmentAmt", appForm, "enable", appLayer, mandatoryFieldNames);
			setFormField("fund1Nm", appForm, "enable", appLayer, mandatoryFieldNames);
			setFormField("fundFooter", appForm, "enable", appLayer, mandatoryFieldNames);
			setFormField("spAddOnFundFooter", appForm, "enable", appLayer, mandatoryFieldNames);
		}
	}

        enableForPremiums("regular");

        if ( maxNumAddonFundFields > 0 )
        {
            enableForPremiums("lump");
        } else {
            enableForPremiums("sp");
        }
}


function defaultInvestmentStrategyCdClick()
{
	enableDisableDISWarning();
	
    enableIisIndicatorCd();	
	
    enableForPremiums("regular");

    if ( maxNumAddonFundFields > 0 )
    {
        enableForPremiums("lump");
    }
    else
    {
        enableForPremiums("sp");
    }
}


function enableDisableDISWarning()
{
	var defaultInvestmentStrategyCdValue = "";
	defaultInvestmentStrategyCdValue = getFieldValue(appForm.defaultInvestmentStrategyCd);
	
	if ("Y" == defaultInvestmentStrategyCdValue)	
	{
		setFormField("defaultInvestmentStrategyWarningCd", appForm, "enable", appLayer, mandatoryFieldNames);
	}
	else
	{
		setFormField("defaultInvestmentStrategyWarningCd", appForm, "disable", appLayer, mandatoryFieldNames);
	}
}


function defaultInvestmentStrategyWarningCdClick()
{	
	var defaultInvestmentStrategyWarningCdValue = "";
	defaultInvestmentStrategyWarningCdValue = getFieldValue(appForm.defaultInvestmentStrategyWarningCd);
	
	if ("N" == defaultInvestmentStrategyWarningCdValue)
	{
		appForm.defaultInvestmentStrategyCd[1].checked = true;	
		defaultInvestmentStrategyCdClick();
	}
}


function enableIisFundOption(){
   
    

    if (appForm.iisIndicatorCd)
    {
        if(appForm.iisIndicatorCd.selectedIndex >1)	
        {
		setFormField("iisFundOptionCd", appForm, "enable", appLayer, mandatoryFieldNames);
        }
        else
        {
		setFormField("iisFundOptionCd", appForm, "disable", appLayer, mandatoryFieldNames);
        }
    }
}


function enableIisIndicatorCd()
{
    

    if (appForm.defaultInvestmentStrategyCd)
    {
        if(appForm.defaultInvestmentStrategyCd[1].checked)	
        {
            if(appForm.iisIndicatorCd)
            {
		        setFormField("iisIndicatorCd", appForm, "enable", appLayer, mandatoryFieldNames);
            }
            else
            {
		        setFormField("iisIndicatorCd", appForm, "disable", appLayer, mandatoryFieldNames);
            }
        }    
        else
        {
		    setFormField("iisIndicatorCd", appForm, "disable", appLayer, mandatoryFieldNames);
        }    
    }
}


var aFund = new Array();      
var aSPFund = new Array();
var aUsedFunds = new Array();

var aIISIndicatorCdList = new Array();  


function initIISIndicatorCdList() {
    
 

 var i, name;

 
 
 if (appForm.iisIndicatorCd)
 {
    for(var i=0;i<appForm.iisIndicatorCd.length-1;i++) {
        aIISIndicatorCdList[i] = new Array(1);
        aIISIndicatorCdList[i][0] = appForm.iisIndicatorCd[i+1].text;
        aIISIndicatorCdList[i][1] = appForm.iisIndicatorCd[i+1].value;
        
        
    }
    
 }

}


function createIISIndicatorOptions(select) {
  

    if(select) {
        var storeSelectedIndex = select.selectedIndex;
        select.length = 1;
       
        for(var i=0;i<aIISIndicatorCdList.length;i++) {
            var newOpt = new Option();
		    newOpt.text = aIISIndicatorCdList[i][0];
		    newOpt.value = aIISIndicatorCdList[i][1];
		    select[select.length] = newOpt;           
        }
        
        select.selectedIndex = storeSelectedIndex;
    }
    
}


function removeIISIndicatorOption(select,iOptionValueNo) {
    
  
    
    for(var j=1;j<select.length;j++) {
        if (select[j].value == iOptionValueNo) {

            
            
            for(var k=j;k<select.length-1;k++) {
            select[k].text = select[k+1].text;
            select[k].value = select[k+1].value;
            }
            select.length = select.length - 1;
            j = j-1;
        }
    } 
    
}


function initFunds() {

  
  
 var i, name;
    
 
 
 

 if(appForm.fund1Nm) {

    for(var i=0;i<appForm.fund1Nm.length-1;i++) {
        aFund[i] = new Array(1);
        aFund[i][0] = appForm.fund1Nm[i+1].text;
        aFund[i][1] = appForm.fund1Nm[i+1].value;
        
    }
  }
  
  
  
   if(appForm.spAddOnFund1Nm) {

    for(var i=0;i<appForm.spAddOnFund1Nm.length-1;i++) {
        aSPFund[i] = new Array(1);
        aSPFund[i][0] = appForm.spAddOnFund1Nm[i+1].text;
        aSPFund[i][1] = appForm.spAddOnFund1Nm[i+1].value;
        
    }
  }
  
 

 for(i=1;i<maxNumFundFields + 1;i++) {
    name = "fund" + i + "Nm";
    if(appForm[name]) {
    	   
    	   fundAmount(i,appForm[name],"fund");
	}
 }

 for(i=1;i<maxNumAddonFundFields + 1;i++) {
	name = "spAddOnFund" + i + "Nm";
	if(appForm[name]) {
        
    	fundAmount(i,appForm[name],"spAddOnFund");
	}
 }  

  
 
 initIISIndicatorCdList();
  
 
 
 
 
        if(appForm.spAddOnFund1Nm) {    
            
            enableForPremiums("lump");
        }
        else {
            
            enableForPremiums("sp");
        }
    
        enableForPremiums("regular");
    }
     

function createFundOptions(select,sFundType) {
 

    if(sFundType == "fund") var aOrigFund = aFund;
    else var aOrigFund = aSPFund;

    if(select) {
        select.length = 1;
       
        for(var i=0;i<aOrigFund.length;i++) {
            var newOpt = new Option();
		    newOpt.text = aOrigFund[i][0];
		    newOpt.value = aOrigFund[i][1];
		    select[select.length] = newOpt;           
        }
    }
}



function destroyFundOptions(select,iFundNo) {
    
 
    var maxFunds;

    if ((select.name).match(/spAddOnFund/))
	maxFunds = maxNumAddonFundFields;
    else
	maxFunds = maxNumFundFields;

    for(var i=1;i<maxFunds + 1;i++) {
       for(var j=1;j<select.length;j++) {
          if((aUsedFunds[i] == select[j].text) && (i != iFundNo)) {
             
             for(var k=j;k<select.length-1;k++) {
                select[k].text = select[k+1].text;
                select[k].value = select[k+1].value;
             }
             select.length = select.length - 1;
             j = j-1;
          }
       } 
    } 
}


function fundAmount(iFundNo,select,sFundType)



{
	var maxFunds;
	var curSel;
	var selIndex;

	if (sFundType == "spAddOnFund")
		maxFunds = maxNumAddonFundFields;
	else
		maxFunds = maxNumFundFields;
    
   	if(select.selectedIndex != 0)	
	{
		var iNextFund = iFundNo + 1;

		

		setFormField(sFundType + iNextFund + "Nm", appForm, "enable", appLayer, mandatoryFieldNames);

		setFormField(sFundType + iFundNo + "InvestmentAmt", appForm, "enable", appLayer, mandatoryFieldNames);
		setFormField(sFundType + iFundNo + "InvestmentPct", appForm, "enable", appLayer, mandatoryFieldNames);

		

		aUsedFunds.length = 0; 

		for(var k = 1; k < maxFunds + 1; k++)
		{
			if (appForm[sFundType + k + "Nm"])
			{
				selIndex = appForm[sFundType + k + "Nm"].selectedIndex;
				aUsedFunds[k] = appForm[sFundType + k + "Nm"][selIndex].text;
			}
	        	else
				aUsedFunds[k] = "";

			
		}
        
        
        
        for(var j = 1; j < maxFunds + 1; j++)
		{
			curSel = appForm[sFundType + j + "Nm"];

			if( curSel )
			{
				createFundOptions(curSel, sFundType);
				destroyFundOptions(curSel, j);

				if(aUsedFunds[j] != "")
				{
					for(var n = 0; n < curSel.length; n++)
					{
						

						if(aUsedFunds[j] == curSel[n].text)
						{
							
							curSel[n].selected = true;

							
							var curSelInvTerm = appForm[sFundType + j + "InvestmentTermQty"];
							if(curSelInvTerm)
							{
								if((curSel[n].text.indexOf("Secured Performance Fund",0) != -1) 
									|| (curSel[n].text.indexOf("Exempt Guaranteed Fund",0) != -1))
								{
									setFormField(curSelInvTerm.name, appForm, "enable", appLayer, mandatoryFieldNames);
								}
                                else
								{
									setFormField(curSelInvTerm.name, appForm, "disable", appLayer, mandatoryFieldNames);
                                }
                            }
							break;
		                 }
		            }
		        }
				
				if(curSel.selectedIndex == 0)
				{
					setFormField(sFundType + j + "InvestmentAmt", appForm, "disable", appLayer, mandatoryFieldNames);
					setFormField(sFundType + j + "InvestmentPct", appForm, "disable", appLayer, mandatoryFieldNames);
					setFormField(sFundType + j + "InvestmentTermQty", appForm, "disable", appLayer, mandatoryFieldNames);

					if ( curSel.name != sFundType + iNextFund + "Nm" )
			               setFormField(curSel.name, appForm, "disable", appLayer, mandatoryFieldNames);
				}

			} 
			else
			{
				break; 
			}

		} 
	}
	else	
	{
		setFormField(sFundType + iFundNo + "InvestmentAmt", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField(sFundType + iFundNo + "InvestmentPct", appForm, "disable", appLayer, mandatoryFieldNames);
		setFormField(sFundType + iFundNo + "InvestmentTermQty", appForm, "disable", appLayer, mandatoryFieldNames);

		
		for(var i = iFundNo + 1; i < maxFunds + 1; i++)
		{
			curSel = appForm[sFundType + i + "Nm"];

			if ( curSel )
			{
				setFormField(sFundType + i + "InvestmentAmt", appForm, "disable", appLayer, mandatoryFieldNames);
				setFormField(sFundType + i + "InvestmentPct", appForm, "disable", appLayer, mandatoryFieldNames);
				setFormField(sFundType + i + "InvestmentTermQty", appForm, "disable", appLayer, mandatoryFieldNames);

				curSel.length = 1;
			   	setFormField(curSel.name, appForm, "disable", appLayer, mandatoryFieldNames);
			}
			else
			{
				break; 
			}
		}

		

		aUsedFunds.length = 0; 
	
		for(var k = 1; k < maxFunds + 1; k++)
		{
			if (appForm[sFundType + k + "Nm"])
			{
				selIndex = appForm[sFundType + k + "Nm"].selectedIndex;
				aUsedFunds[k] = appForm[sFundType + k + "Nm"][selIndex].text;
			}
			else
			{
				aUsedFunds[k] = "";
			}

			
		}

		
		

		createFundOptions(select, sFundType);
		destroyFundOptions(select, iFundNo);

	} 
} 
