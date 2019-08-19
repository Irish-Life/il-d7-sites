groupThresholds = [310000,32500,16250];
step1Complete=false;
step2Complete=false;
$( function() {
    $( "#validation-message" ).dialog({
      modal: true,
	  autoOpen: false,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
	
	$( "#showHelpMessage" ).dialog({
      autoOpen: false,
      width: 850,
	  maxHeight: 650,
      modal: true,
      buttons: {
        Close: function() {
          $(this).dialog( "close" );
        }
      }
    });
		
$( "#familyHomeHelp" ).on( "click", function() {
      showHelpText('A');
    });
	
	$( "#businessReliefHelp" ).on( "click", function() {
      showHelpText('B');
    });
	
	$( "#farmReliefHelp" ).on( "click", function() {
      showHelpText('C');
    });
  }

  
);

	
	

function showHelpText(whichOne) {

		var familyHomeRelief = "<h2>Family Home Relief / Dwelling House Relief</h2> " +
		"<p>The value of a \"dwelling house\" taken on or after 1st December 1999 may be exempt from Gift and Inheritance Tax, in the hands of the beneficiary provided he or she satisfies certain qualifying conditions.</p>" +
		"<p>\"Dwelling House\", for the purpose of this relief, means a building or part of a building with up to one acre of land that was used or was suitable for use as a dwelling and which can be in Ireland or outside of the state.</p> " +
		"To obtain the exemption the beneficiary must satisfy all the following conditions: " +
		"<ul> " +
		"<li>The disponer was living in the property at the time of their death</li> " +

		"<li>He or she must have occupied the dwelling house as his or her only or main residence continuously throughout the 3 year period immediately prior to the date of the gift or inheritance*</li> " +                                                                                                  
		"<li>He or she must not be beneficially entitled to any interest in any other dwelling house at the date of the gift or inheritance</li> " +
		"<li>He or she must continue to both own and occupy the dwelling house as his or her only or main residence throughout the period of 6 years following the date of the gift or inheritance**.</li> " +
		"</ul> " +
		"<p>*where the dwelling house directly or indirectly replaced other property owned by the disponer, the 3 year period in condition a) will be satisfied if the beneficiary occupied both properties for a total of 3 of the 4 years prior to the date of the gift or inheritance.</p> " +
		"<p>** the exemption will not be withdrawn where condition c) above is breached in the following circumstances:</p> " +
		"<ul> " +
		"<li>as a result of the beneficiary requiring long term medical care in a hospital, nursing home or convalescent home, or</li> " +
		"<li>where the beneficiary does not occupy the house as a result of working abroad, or</li> " +
		"<li>where the beneficiary was aged 55 at the date of the gift or inheritance, or</li> " +
		"<li>where the house is sold, if the beneficiary reinvests the proceeds in another dwelling house.</li> " +
		"</ul> " +
		"<p>The following conditions apply in relation to Gifts only:</p> " +
		"<ul> " +
		"<li>any period in the 3 year period prior to the date of the gift, during which a beneficiary occupied a house that was, at that time, the disponer’s only or main residence, will not be treated as a period of occupation, unless the donor lived with the beneficiary by reason of old age, and is dependant on the beneficiary for services.</li> " +
		"<li>the \"other property\" and the property comprised in the gift, must both have been owned by the disponer during the 3 year period prior to the gift.</li> " +
		"</ul>";

		var businessRelief= "<h2>Business Relief</h2>"+
"<p>For gifts and inheritances taken on or after 23rd January 1997 the taxable value of “relevant business” property is reduced by 90%.</p>"+
"<h3>Company Shares</h3>"+
"<p>The definition of \"relevant business property\" includes unquoted shares and securities of Irish incorporated companies subject to certain conditions.</p>"+
"<h3>The company</h3>"+
"<p>The company's business must not consist wholly or mainly of any of the following excluded activities - dealing in currencies, securities, stocks or shares, land or buildings, or making or holding of investments.</p>"+
"<h3>The beneficiary</h3>"+
"<p>For the relief to apply the beneficiary must meet one of the following ownership/control tests:</p>"+
"<ul>"+
"<li>The shares themselves or together with other shares in the company held in the absolute beneficial ownership of the beneficiary, give the beneficiary control of 25% of the voting power over all matters relating to the company, or</li>"+
"<li>the beneficiary controls the company or the company is controlled by the beneficiary and his relatives*, or</li>"+
"<li>the beneficiary holds at least 10% of the issued capital of the company and has worked full time in the company for 5 years prior to the gift/inheritance.</li>"+
"</ul>"+
"<p>* Relatives of a person include his spouse, civil partner, children, mother, father, aunt, uncle and any children, grandchildren of any the forgoing. In addition all spouses of relatives are included for the purposes of determining control.<br>"+
"Control includes - having over 50% of the voting power, or owning more than 50% of the shares or being in a position to control the board of directors.</p>"+
"<h3>Business Relief - unincorporated business.</h3>"+
"<p>Relevant business property also includes property consisting of a business (Sole trader) or an interest in a business (share in a partnership). A business which is wholly or mainly concerned with dealing in land, shares, securities or currencies or the making or holding of investments is excluded.</p>"+
"<p>The relief will apply where the business or part of the business is transferred and not simply where an asset that had been part of the business is subject to CAT.</p>"+
"<h3>General</h3>"+
"<p>So far we have concentrated on the conditions that apply to the business and the beneficiary in order to qualify for Business Relief. There are some other general conditions worth noting:</p>"+
"<ul>"+
"<li>"+
"<b>Disponer</b><br>"+
"The property must have been owned by the disponer for a period of 5 years prior to a gift or 2 years in the case of an inheritance.	</li>"+
"<li><b>Clawback of Relief</b><br>"+
"If within 6 years of the gift or the inheritance of business property:<br>"+
"-	the business ceases to qualify, or<br>"+
"-	the property is sold or compulsorily acquired and not replaced within one year with other business property<br>"+
"the entire relief will be clawed back.</li>"+
"<ul>";

		var farmRelief = "<h2>Agricultural Relief</h2>"+
"<p>This is a special relief given in respect of certain agricultural property taken by a \"farmer\". The relief is given by reducing the market value of the agricultural property by 90% for gifts and inheritances taken on or after 23rd January 1997.</p>"+
"<p>The market value of the agricultural property as so reduced is then termed \"agricultural value\" in the Act and is substituted for market value in the calculation of tax.</p>"+
"<p>There are certain conditions attaching to this relief:</p>"+
"<ul>"+
"<li>The relief only applies to \"agricultural property\" which is defined as \"agricultural land, pasture and woodlands situated within a Member State and crops, trees and underwood growing on such land and also includes such farm buildings, farm houses and mansion houses (together with lands occupied therewith) as are of a character appropriate to the property.\"  The relief also applies to stock and farm machinery.</li>"+
"<li>Any milk quota attaching to lands will also qualify for reduction as part of the market value of the lands.</li>"+
"<li>The relief only applies to agricultural property acquired by an individual, who after taking the agricultural gift or inheritance not less than 80% of his gross assets are represented by the value of agricultural property, including livestock, bloodstock and farm machinery.  For gifts or inheritances taken on or after 1st February 2007 a donee is allowed to offset borrowings for the purchase, repair or improvement of on an off farm principal private residence against the value of the property for the purpose of the 80% test.</li>"+
"<li>For gifts or inheritances received after 1st January 2015 the beneficiary must have<br>"+
"a.	a relevant agricultural qualification or attain such a qualification within four years of the date of the gift or inheritance, and must farm the agricultural property for a period of not less than six years on a commercial basis with a view to realising a profit, or<br>"+
"b.	the beneficiary must spend not less than 50% of their normal working time farming the agricultural property for a period of not less than six years on a commercial basis with a view to realising a profit . Normal working time approximates to 40 hours per week.</li>"+
"</ul>"+
"<p>Where the beneficiary leases the agricultural property the individual to whom the property is leased must satisfy either condition a. or b. above. </p>"+
"<p>The relief is withdrawn in certain circumstances :</p>"+
"<ul><li>If within 6 years of the 'valuation date' the beneficiary ceases to qualify as a farmer as outlined and does not lease the land to a lessee who will farm the land for the remainder of the 6 year period. Or if within six years after the date of the gift or the inheritance lands are sold or compulsorily acquired in the lifetime of the donee or successor, and the agricultural property is not replaced within a year following a sale, or within 6 years following a compulsory acquisition where the land was compulsorily acquired on or after 25th March 2002.</li>"+
"<li>If the gift or inheritance consists of development land and is disposed of in the period commencing 6 years after the date of the gift / inheritance and ending 10 years after the date there will be a partial claw back of the relief.</li></ul>";

		$('#help-message-text').html((whichOne=='A'?familyHomeRelief:(whichOne=='B'?businessRelief:farmRelief)));
		$( "#showHelpMessage" ).dialog( "open" );

		}


function checkAmountEntered(estateAmountDivId,tableRowClassId,beneficiaryFormId,assetName) {
  var assetAmtLeft=Number($(estateAmountDivId).val());	  
	//add up the existing ones
	$("#beneficiaries tbody tr").each(function() {
		assetAmtLeft = assetAmtLeft - Number($(this).find(tableRowClassId).html());			
	});			
	  //now take away this amount
		assetAmtLeft = assetAmtLeft - Number($(beneficiaryFormId).val());
	  valid = (assetAmtLeft >= 0);
	  if (!valid) {
		alert('You have entered more than is available for '+assetName);
	  }
	  return valid;
}

function updateAvailableAmounts(assetNameDivId,tableDivId,labelId)
{
	availableForHome = Number($(assetNameDivId).val())
	
	$("#beneficiaries tbody tr").each(function() {
			availableForHome = availableForHome - Number($(this).find(tableDivId).html());
		$(labelId).html(numberWithCommas(availableForHome));
	});
	
}


function showPrint() {
populateReport();
$('#doCalc').hide();
$('#the-print-report').show();

$('#showInputs').show();
$('#showPrint').hide();

}

function showInputs() {

$('#doCalc').show();
$('#the-print-report').hide();

$('#showInputs').hide();
$('#showPrint').show();

}

function calcTotalTaxLiability()
{
var total=0
	$("#beneficiaries tbody tr").each(function() {
	total = total + Number($(this).find(".taxLiabilityCalc").html());
	});
	$('#totalTaxLiability').html('€'+numberWithCommas(total));
}

function updateReportTotals()
{
$('.reportFamilyHome').html(numberWithCommas($('#familyHome').val()));
$('.reportOtherProperty').html(numberWithCommas($('#residences').val()));
$('.reportInvestments').html(numberWithCommas($('#investments').val()));
$('.reportPersonal').html(numberWithCommas($('#personalProperty').val()));
$('.reportLifeInsurance').html(numberWithCommas($('#lifeInsurance').val()));
$('.reportPensionsPre').html(numberWithCommas($('#perRetirementDeath').val()));
$('.reportPensionsPost').html(numberWithCommas($('#postRetirementDeath').val()));
$('.reportBusiness').html(numberWithCommas($('#businessAssetsTotal').val()));
$('.reportFarm').html(numberWithCommas($('#farmAssetsTotal').val()));
$('.reportEstateTotal').html($('#totalEstateVal').html());

}

function populateReport()
{
var appendices=['II','III','IV'];
var appendixIndex=0;
alert('populating report');
if (Number($('#familyHome').val()) > 0)
{
	$('#inheritOne').show();
	$('.homeReliefApplies').show();
	$('.familyHomeReliefAppendixNo').html(appendices[appendixIndex]);
	appendixIndex++;
}
else
{
	$('#inheritOne').hide();
	$('.homeReliefApplies').hide();
}

if (Number($('#businessAssetsTotal').val()) > 0)
{
	$('#inheritEight').show();
	$('.businessReliefApplies').show();
	$('.businessReliefAppendixNo').html(appendices[appendixIndex]);
	appendixIndex++;
}
else
{
	$('#inheritEight').hide();
	$('.businessReliefApplies').hide();
}

if (Number($('#farmAssetsTotal').val()) > 0)
{
	$('#inheritNine').show();
	$('.farmReliefApplies').show();
	$('.agriReliefAppendixNo').html(appendices[appendixIndex]);
	appendixIndex++;
}
else
{
	$('#inheritNine').hide();
	$('.farmReliefApplies').hide();
}		

var names = $('#name1').val();
$('.reportNames1').html($('#name1').val());
$('.reportNames2').html($('#name2').val());

$('.reportAgeNB1').html(Number($('#dob1').val())+1);
$('.reportAgeNB2').html(Number($('#dob2').val())+1);
$('.reportLife2').css('display','none');
$('.twoLives').css('display','none');
$('.oneLife').css('display','inline');
	
if ($('#name2').val() != '')
{
	names = names + " and " + $('#name2').val();
	$('.reportLife2').css('display','inline');
	$('.twoLives').css('display','inline');
	$('.oneLife').css('display','none');
}
$('.reportNames').html(names);
var d = new Date();
var totalTaxLiability = 0;
var familyHomeRelief = '';
var businessRelief = '';
var agriRelief = '';
var arfLiability = '';
var hasArf = false;
var reportGifts = '';

var totalInheritances=0;
var totalTaxable=0;
$('#today').html(d.toDateString());

updateReportTotals();

//populate the inheritance table but remove all rows first
$("#reportBeneficiariesTable tbody").html("");

$("#beneficiaries tbody tr").each(function() {
		$( "#reportBeneficiariesTable tbody" ).append( "<tr style=\"height:40px\">" + 
		"<td>"+$(this).find("td .name").html()+"</td>" +
		"<td>"+$(this).find("td .relation").html()+"</td>" +
		"<td>"+$(this).find("td .inheritanceVal").html()+"</td>" +
		"<td>€"+$(this).find("td .taxableInheritance").html()+"</td>" +
		"<td>€"+$(this).find("td .taxLiability").html()+"</td>");
		totalInheritances += 
		Number($(this).find(".inherHome").html()) +
		Number($(this).find(".inherOtherProperty").html()) +
		Number($(this).find(".inherInvestments").html()) +
		Number($(this).find(".inherPersonalProperty").html()) +
		Number($(this).find(".inherLifeInsurance").html()) +
		Number($(this).find(".inherPreRetirePen").html()) +
		Number($(this).find(".inherPostRetirePen").html()) +
		Number($(this).find(".inherBusinessAssets").html()) +
		Number($(this).find(".inherFarmAssets").html());
		
		totalTaxLiability+= Number($(this).find(".taxLiabilityCalc").html());
		var taxable = Number($(this).find("td .taxableInheritance").html().replace(/,/g,''));
		totalTaxable+= taxable;
		
		if (Number($('#familyHome').val()) > 0 || 
		    Number($('#farmAssetsTotal').val()) > 0 || 
			Number($('#businessAssetsTotal').val()) > 0)
		{
			if (Number($(this).find(".inherHome").html()) > 0) {
				
				var otherPropInherit= Number($(this).find(".curPropAssets").html()) + 
				Number($(this).find(".inherOtherProperty").html());
			
				familyHomeRelief += $(this).find(".name").html() + " is " +
				(isFamilyHomeRelief(
				$(this).find(".fhrq1").html(),
				$(this).find(".fhrq2").html(),
				$(this).find(".fhrq3").html(),
				$(this).find(".fhrq4").html(),
				$(this).find(".fhrq5").html(),
				$(this).find(".fhrq6").html(),
				otherPropInherit
				)=='Yes'?
				"":"not ") 
				+ "eligible for family home relief. ";
			}
			
			if (Number($(this).find(".inherBusinessAssets").html()) > 0) {
			familyHomeRelief += $(this).find(".name").html() + " is " + 
			(isBusinessRelief($(this).find(".burq1").html(),
			$(this).find(".burq2").html(),
			$(this).find(".burq3").html(),
			$(this).find(".burq4").html(),
			$(this).find(".burq5").html())=='Yes' ?"":"not ") + "eligible for business relief. ";
			}

			if (Number($(this).find(".inherFarmAssets").html()) > 0) {
			familyHomeRelief += $(this).find(".name").html() + " is " +
			(isFarmRelief($(this).find(".agrq1").html(),
			$(this).find(".agrq2").html(),
			$(this).find(".agrq3").html(),
			$(this).find(".agrq4").html(),
			$(this).find(".agrq5").html(),
			Number(totalInheritances) + Number($(this).find(".curPropAssets").html()) +
			Number($(this).find(".curBusAssets").html()) +
			Number($(this).find(".curFarmAssets").html()),
			Number($(this).find(".inherFarmAssets").html())+Number($(this).find(".curFarmAssets").html())
			)=='Yes'?"":"not ") + "eligible for farm relief.";
			}
			
			familyHomeRelief +="<br>";
		}
		
		reportGifts += 
		($(this).find(".name").html() + 
		(hasReceivedGifts(
		$(this).find(".gifts1").html(),
		$(this).find(".gifts2").html(),
		$(this).find(".gifts3").html())?
		" has previously received gifts or inheritances since 5<sup>th</sup>December 1991.":
		" has not previously received any gift or inheritance from any source since 5<sup>th</sup>December 1991.<br>"));

		var arf = Number($(this).find(".inherPostRetirePen").html());
		var age = Number($(this).find(".age").html());
		
		if (age >= 21 && arf > 0 && $(this).find(".relation").html() == 'Child')
		{
			arfPercent = 30;
			hasArf = true;
			arfLiability+= 			
			"<p  style='margin-left:42.55pt;text-indent:-42.55pt;line-height:"+
			"150%;tab-stops:42.55pt 3.0cm 127.6pt 6.0cm 212.65pt 9.0cm 14.0cm'><b " +
			"style='mso-bidi-font-weight:normal'><span  style='font-size:11.0pt; " +
			"mso-bidi-font-size:10.0pt;line-height:150%;font-family:\"Arial\",\"sans-serif\"'><span " +
			"style='mso-tab-count:1'></span>Tax on ARF value inherited by " + 
			$(this).find(".name").html() + " included in the calculation above:<o:p></o:p></span></b></p> " +
			"<p  style='margin-left:42.55pt;text-indent:-42.55pt;line-height: " +
			"150%;tab-stops:42.55pt 3.0cm 127.6pt 6.0cm 212.65pt 9.0cm 14.0cm'><span " +
			 "style='font-size:11.0pt;mso-bidi-font-size:10.0pt;line-height:150%; " +
			"font-family:\"Arial\",\"sans-serif\"'><span style='mso-tab-count:1'></span> " + 
			"€" + numberWithCommas(arf) + " @ "+arfPercent+"% = €" + numberWithCommas(arfPercent*arf/100) + "<o:p></o:p></span></p>";
		}
 });

$( "#reportBeneficiariesTable tbody" ).append("<tr style=\"border-top: 1px solid #000;margin-top: 12px;height: 40px;\"><td colspan=\"2\"></td><td>€" +
numberWithCommas(totalInheritances)+"</td><td>€" + 
numberWithCommas(totalTaxable)+"</td><td>€" + numberWithCommas(totalTaxLiability)+ "</td></tr>");
 
 $('.reportGifts').html(reportGifts);
 $('.reportFamilyHomeRelief').html(familyHomeRelief);
  $('.reportExistingCover').html();  
 $('.reportTotalTaxLiability').html($('#totalTaxLiability').html());

$('.reportARFs').html(arfLiability);
$('.reportArfsTotal').css('display',hasArf?'block':'none');

}

function replaceAll(haystack,needle)
{

}

function step1Valid()
{
    valid = true;
	$('#validation-message-text').html('');
	if ($('#name1').val() === '')
	{
		$('#validation-message-text').html("Enter a name");
		$( "#name1" ).focus();
		valid = false;
	}
	else if ($('#dob1').val() === '')
	{
		$('#validation-message-text').html("Enter first client's age");
		$( "#dob1" ).focus();
		valid = false;
	}
	else if  ($('#dob1').val() > 110)
	{
		$('#validation-message-text').html("Client's age is invalid");
		$( "#dob1" ).focus();
		valid = false;
	}
	else if ($('#dob2').val() === '' && $('#name2').val() != '')
	{
		$('#validation-message-text').html("Enter second client's age");
		$( "#dob2" ).focus();
		valid = false;
	}
	else if  ($('#dob2').val() > 110)
	{
		$('#validation-message-text').html("Second client's age is invalid");
		$( "#dob2" ).focus();
		valid = false;
	}
	else if ($('#dob2').val() != '' && $('#name2').val() != '' && $("input:radio[name=marriedQ]:checked").val() == 'N')
	{
		$('#validation-message-text').html("If you are adding two clients, they must be married. If they are not married you must assess them separately");
		$( "#marriedStatus" ).focus();
		valid = false;
	}
	else if ($('#totalAssetsValue').val() === '')
	{
		$('#validation-message-text').html("You need to enter some estate assets ");
		$( "#familyHome" ).focus();
		valid = false;
	}

	if (!valid)
	{
		$( "#tabs" ).tabs( "option", "disabled", [ 2, 3 ] )
		$( "#validation-message" ).dialog( "open" );
	}
	else
	{
		$( "#tabs" ).tabs( "enable", 2 );
		step1Complete=true;
		$( '#tabs' ).tabs({ active: 2 })
	}	
	
}

function step2Valid() {
	valid = true;
	$('#validation-message-text').html('');

	//check at least one beneficiary
	var rowCount = $('#beneficiaries tbody tr').length;
	
	if (rowCount == 0)
	{
		$('#validation-message-text').html("You need to have at least one beneficiary before proceeding");
		$( "#tabs" ).tabs( "option", "disabled", [ 3 ] )		
		$( "#validation-message" ).dialog( "open" );
	}
	else
	{
		$( "#tabs" ).tabs( "enable", 3 );
		step2Complete=true;
		$( '#tabs' ).tabs({ active: 3 })
		
		//populate report with all the relevant values
	}	
}


function log(text)
{
     $('#consoleDiv').append('<br>'+text);
}

function getGroupThreshold(whichGroup)
{
if (whichGroup === 'Group 1')
return 310000
else if (whichGroup === 'Group 2')
return 32500
else
return 16250;
}

function isFamilyHomeRelief(q1,q2,q3,q4,q5,q6,otherProperty)
{
if (otherProperty == 0 && q1 == 'Y' && q2 == 'Y' && q3 == 'Y' && q4 == 'Y' && q5 == 'N' && q6 == 'Y')
{
   return "Yes"
}
else
{
    return "No";
}
}

function isBusinessRelief(q1,q2,q3,q4,q5) {
if (q1 == 'Y' && q2 == 'Y' && q3 == 'Y' && q4 == 'Y' && q5 == 'Y')
{
   return "Yes"
}
else
{
    return "No";
}
}

function isFarmRelief(q1,q2,q3,q4,q5,totalBeneficiaryAssets,totalFarmAssets) {
if (totalFarmAssets/totalBeneficiaryAssets >= 0.8 && q1 == 'Y' && q2 == 'Y' && q3 == 'Y' && q4 == 'Y' && q5 == 'Y')
{
   return "Yes"
}
else
{
    return "No";
}
}

function hasReceivedGifts(group1,group2,group3)
{
	return (Number(group1) + Number(group2) + Number(group3)) > 0;
}

function willFullThresholdApply(whatThreshold,group1PrevGift, group2PrevGift, group3PrevGift)
{
if ((whatThreshold === "Group 1" && group1PrevGift > 0) || 
	(whatThreshold === "Group 2" && group2PrevGift > 0) || 
	(whatThreshold === "Group 3" && group3PrevGift > 0))
{
	return "No";
}
else
{
	return "Yes";
}
}

/**
After calculating the taxable inheritance calculate the tax liability
*/
function calculateTaxLiability(
    age,
    taxableInheritance,
    postRetireInheritedValue,
	isChild
) {
    "use strict";
	var tax=0;
	if(isChild) {
    tax = (age >= 21
        ? ((taxableInheritance - postRetireInheritedValue) * 0.33) + (postRetireInheritedValue * 0.3)
        : taxableInheritance * 0.33);
	}
	else 
	{
		tax = taxableInheritance * 0.33;
	}
	
    return tax > 0? Math.round(tax):0;
}

/*
calculate the taxable inheritance
*/
function calculateTaxableInheritance(
    age,//1
    totalBeingInherited,//2
    familyHomeReliefApply,//3
    familyHomeInheritedValue,//4
    businessReliefApply,//5
    businessAssetsInheritedValue,//6
    agriReliefApply,//7
    farmAssetsInheritedValue,//8
    fullThresholdApply,//9
    whatThresholdApplies,//10
    thresholdAppliesValue,//11
    postRetireInheritedValue,//12
    previousGroup1GiftsValue,//13
    previousGroup2GiftsValue,//14
    previousGroup3GiftsValue//15
) {

   taxableInheritance = totalBeingInherited;
   if (age >= 21 && whatThresholdApplies === "Group 1")
   {
		taxableInheritance = totalBeingInherited - postRetireInheritedValue;
   }

   taxableInheritance = taxableInheritance - (familyHomeReliefApply === "Yes" ? familyHomeInheritedValue : 0);
   taxableInheritance = taxableInheritance - (businessReliefApply === "Yes" ? businessAssetsInheritedValue * 0.9 : 0);
   taxableInheritance = taxableInheritance - (agriReliefApply === "Yes" ? farmAssetsInheritedValue * 0.9 : 0);
   
   if (fullThresholdApply === "Yes")
   {
		taxableInheritance = taxableInheritance - thresholdAppliesValue;   
   }
   else if (whatThresholdApplies === "Group 1")
   {
		taxableInheritance = taxableInheritance - Math.max(thresholdAppliesValue - previousGroup1GiftsValue, 0);
   }
   else if (whatThresholdApplies === "Group 2")
   {
		taxableInheritance = taxableInheritance - Math.max(thresholdAppliesValue - previousGroup2GiftsValue, 0);
   }
   else if (whatThresholdApplies === "Group 3")
   {
		taxableInheritance = taxableInheritance - Math.max(thresholdAppliesValue - previousGroup3GiftsValue, 0);
   }
   taxableInheritance = Math.max(taxableInheritance,0);
   if (age > 21 && whatThresholdApplies === "Group 1")
   {
		taxableInheritance = Number(taxableInheritance) + Number(postRetireInheritedValue);
   }
   
   return Math.round(taxableInheritance);
}

function doNothing() {

}

function loginClicked() {
  // show the loading message
  var userID = $('#userIDInput').val();
  
        $.ajax({
	  
	    type:"POST",
	    url: "http://www.irishlife-ebiz.net/mobile/blineUserCheckProxy.php?userId=" + userID,
            dataType: "text",
            timeout: 15000,
            success: function (data) {
                var ans = data.trim();
                var charStart = ans.charAt(0);

                if (charStart == 'Y')
                {
                    successLogin();
                }
                else if (charStart == 'N')
                {
                    alert(
                        "Sorry, your user id was not recognised. Please try again." // the message
                    );
                }
                else {
                    alert(
                        "Sorry, there was an error communicating with the server. Please check your internet connection and try again.");
                }
            },
            error: function (e, xhr, et) {
 	            alert(
                    "Sorry, there was an error communicating with the server. Please check your internet connection and try again.", // the message
                    function () { },  // a callback
                    "Bline", // a title
                    "OK" // the button text
                );
            }
	});
}



function successLogin() {
$('#login').hide();
$('#doCalc').show();
$('#startHeading').show();
$('#showPrint').show();
}


function startCAT() {
$( "#tabs" ).tabs( "enable", 1 );
$( "#tabs" ).tabs({ active: 1 });
}

$( function() {
		
	
  } );
  
   $( function() {
    $( "#tabs" ).tabs();
	$( "#tabs" ).tabs({ active: 0 });
	$( "#tabs" ).tabs( "option", "disabled", [ 1, 2, 3 ] )
  } );
  

addingNewUser=false;
var editPerson='';
$( function() {
  } );
  $( function() {
    var dialog, form, confirmDialog,
 
      // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
      emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      name = $( "#name" ),
      //allFields = $( [] ).add( name ).add( email ).add( password ),
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
	
	function setupAccordion() {
	var icons = {
			  header: "ui-icon-circle-arrow-e",
			  activeHeader: "ui-icon-circle-arrow-s"
			};
			try {
				$( "#beneficiaryAccordian" ).accordion('destroy');
			}
			catch (err)
			{
			}
			$( "#beneficiaryAccordian" ).accordion({
			  heightStyle: "content",
			  icons: icons,
			  collapsible: true,
			  active:0
			});
			$( "#toggle" ).button().on( "click", function() {
			  if ( $( "#beneficiaryAccordian" ).accordion( "option", "icons" ) ) {
				$( "#beneficiaryAccordian" ).accordion( "option", "icons", null );
			  } else {
				$( "#beneficiaryAccordian" ).accordion( "option", "icons", icons );
			  }
			  console.log("accordion " + $('#beneficiaryAccordion').accordion( "option", "active" ));
			});
			
			$( ".nextStepAccordion" ).button().on( "click", function() {
				var current = $('#beneficiaryAccordian').accordion("option","active"),
				maximum = $('#beneficiaryAccordian').find("h3").length,
				next = current+1 === maximum ? 0 : current+1;
				$('#beneficiaryAccordian').accordion("option","active",next);
			});
	}
 
	function hideBeneficiaryInputs()
	{
		if (Number($('#familyHome').val()) > 0)
		{
			$('#inheritOne').show();
			$('.homeReliefApplies').show();
		}
		else
		{
			$('#inheritOne').hide();
			$('.homeReliefApplies').hide();
		}
	
		if (Number($('#residences').val()) > 0)
		{
			$('#inheritTwo').show();
		}
		else
		{
			$('#inheritTwo').hide();
		}

		if (Number($('#investments').val()) > 0)
		{
			$('#inheritThree').show();
		}
		else
		{
			$('#inheritThree').hide();
		}

		if (Number($('#personalProperty').val()) > 0)
		{
			$('#inheritFour').show();
		}
		else
		{
			$('#inheritFour').hide();
		}

		if (Number($('#lifeInsurance').val()) > 0)
		{
			$('#inheritFive').show();
		}
		else
		{
			$('#inheritFive').hide();
		}

		if (Number($('#perRetirementDeath').val()) > 0)
		{
			$('#inheritSix').show();
		}
		else
		{
			$('#inheritSix').hide();
		}

		if (Number($('#postRetirementDeath').val()) > 0)
		{
			$('#inheritSeven').show();
		}
		else
		{
			$('#inheritSeven').hide();
		}

		if (Number($('#businessAssetsTotal').val()) > 0)
		{
			$('#inheritEight').show();
			$('.businessReliefApplies').show();
		}
		else
		{
			$('#inheritEight').hide();
			$('.businessReliefApplies').hide();
		}

		if (Number($('#farmAssetsTotal').val()) > 0)
		{
			$('#inheritNine').show();
			$('.farmReliefApplies').show();
		}
		else
		{
			$('#inheritNine').hide();
			$('.farmReliefApplies').hide();
		}		
	}
 
    function saveUser() {     
		var rownum = 0;
		var valid = true;
	  /**
	  mandatory fields are 
	   - name
	   - dob
	   - relationship
	   - assets being inherited > 0
	  */
	  
	  if (addingNewUser)
	  {
			rownum = $('#beneficiaries tbody tr').length + 1;
	  }
	  else
	  {	  			
			$('#beneficiaries tbody tr#Beneficiary-'+editPerson).remove();
			rownum = editPerson;
	  }	  	  
	  
	  
		valid = valid && checkAmountEntered('#familyHome','.inherHome','#homeInherit','Family Home/Main Residence');
		valid = valid && checkAmountEntered('#residences','.inherOtherProperty','#otherInherit','Total Other Properties & Residences');
		valid = valid && checkAmountEntered('#investments','.inherInvestments','#savingsInherit','Total Savings and Investments');
		valid = valid && checkAmountEntered('#personalProperty','.inherPersonalProperty','#personalPropInherit','Total Personal Property');
		valid = valid && checkAmountEntered('#lifeInsurance','.inherLifeInsurance','#lifeInherit','Personal Life Insurance');
		valid = valid && checkAmountEntered('#perRetirementDeath','.inherPreRetirePen','#pensionPreInherit','Pre-Retirement - Total Payment on Death');
		valid = valid && checkAmountEntered('#postRetirementDeath','.inherPostRetirePen','#pensionPostInherit','Post-Retirement - AMRF, ARF, Vested PRSA');
		valid = valid && checkAmountEntered('#businessAssetsTotal','.inherBusinessAssets','#businessAssetsInherit','Total Value of Business Assets');
		valid = valid && checkAmountEntered('#farmAssetsTotal','.inherFarmAssets','#farmAssetsInherit','Total Value of Farm Assets');
	  
	  
      if ( valid ) {		
			$('.calculateBeneficiaryTax').trigger('click');
		//the table row should have a load of hidden columns to store each data item	
			
			$( "#beneficiaries tbody" ).append( "<tr id=\"Beneficiary-"+rownum+"\">" +
			"<td><span class=\"name\">"+$("#beneficiaryName").val()+"</span> (<span class=\"relation\">"+$("#beneficiaryRelationship option:selected").text()+"</span>)</td>"+
			"<td class=\"hidden-xs age\">"+$("#beneficiaryAge").val()+"</td>"+
			"<td class=\"hidden fhrq1\">"+$("input:radio[name=fhr1]:checked").val()+"</td>"+
			"<td class=\"hidden fhrq2\">"+$("input:radio[name=fhr2]:checked").val()+"</td>"+
			"<td class=\"hidden fhrq3\">"+$("input:radio[name=fhr3]:checked").val()+"</td>"+
			"<td class=\"hidden fhrq4\">"+$("input:radio[name=fhr4]:checked").val()+"</td>"+
			"<td class=\"hidden fhrq5\">"+$("input:radio[name=fhr5]:checked").val()+"</td>"+
			"<td class=\"hidden fhrq6\">"+$("input:radio[name=fhr6]:checked").val()+"</td>"+
			"<td class=\"hidden burq1\">"+$("input:radio[name=bur1]:checked").val()+"</td>"+
			"<td class=\"hidden burq2\">"+$("input:radio[name=bur2]:checked").val()+"</td>"+
			"<td class=\"hidden burq3\">"+$("input:radio[name=bur3]:checked").val()+"</td>"+
			"<td class=\"hidden burq4\">"+$("input:radio[name=bur4]:checked").val()+"</td>"+
			"<td class=\"hidden burq5\">"+$("input:radio[name=bur5]:checked").val()+"</td>"+
			"<td class=\"hidden agrq1\">"+$("input:radio[name=far1]:checked").val()+"</td>"+
			"<td class=\"hidden agrq2\">"+$("input:radio[name=far2]:checked").val()+"</td>"+
			"<td class=\"hidden agrq3\">"+$("input:radio[name=far3]:checked").val()+"</td>"+
			"<td class=\"hidden agrq4\">"+$("input:radio[name=far4]:checked").val()+"</td>"+
			"<td class=\"hidden agrq5\">"+$("input:radio[name=far5]:checked").val()+"</td>"+
			"<td class=\"hidden-xs fhr\">"+$("#radioFamilyHomeRelief").val() +" / "+
			$("#radioBusinessRelief").val()+" / "+$("#radioAgriRelief").val()+"</td>"+
			"<td class=\"hidden curPropAssets\">"+$("#beneficiaryProperty").val()+"</td>"+
			"<td class=\"hidden curBusAssets\">"+$("#beneficiaryBusiness").val()+"</td>"+
			"<td class=\"hidden curFarmAssets\">"+$("#beneficiaryFarm").val()+"</td>"+
			"<td class=\"hidden-xs\">&euro;<span class=\"currentAssetsVal\">"+(Number($("#beneficiaryProperty").val())+Number($("#beneficiaryBusiness").val())+Number($("#beneficiaryFarm").val()))+"</span></td>"+
			"<td class=\"hidden gifts1\">"+$("#prevGiftsOne").val()+"</td>"+
			"<td class=\"hidden gifts2\">"+$("#prevGiftsTwo").val()+"</td>"+
			"<td class=\"hidden gifts3\">"+$("#prevGiftsThree").val()+"</td>"+
			"<td class=\"hidden-xs hidden\">&euro;<span class=\"previousGifts\">"+(Number($("#prevGiftsOne").val())+Number($("#prevGiftsTwo").val())+Number($("#prevGiftsThree").val()))+"</span></td>"+
			"<td class=\"hidden inherHome\">"+$("#homeInherit").val()+"</td>"+
			"<td class=\"hidden inherOtherProperty\">"+$("#otherInherit").val()+"</td>"+
			"<td class=\"hidden inherInvestments\">"+$("#savingsInherit").val()+"</td>"+
			"<td class=\"hidden inherPersonalProperty\">"+$("#personalPropInherit").val()+"</td>"+
			"<td class=\"hidden inherLifeInsurance\">"+$("#lifeInherit").val()+"</td>"+
			"<td class=\"hidden inherPreRetirePen\">"+$("#pensionPreInherit").val()+"</td>"+
			"<td class=\"hidden inherPostRetirePen\">"+$("#pensionPostInherit").val()+"</td>"+
			"<td class=\"hidden inherBusinessAssets\">"+$("#businessAssetsInherit").val()+"</td>"+
			"<td class=\"hidden inherFarmAssets\">"+$("#farmAssetsInherit").val()+"</td>"+
			"<td class=\"hidden-xs fullThresholdApplies\">"+$('#radioWillFullThreshold').val()+"</td>"+
			"<td class=\"hidden-xs\"><span class=\"inheritanceVal\">"+$('#totalInherit').val()+"</span></td>"+
			"<td class=\"hidden-xs\">&euro;<span class=\"taxableInheritance\">"+numberWithCommas($('#taxableInheritance').val()) +"</span></td>"+
			"<td>&euro;<span class=\"taxLiability\">"+ numberWithCommas($('#taxLiability').val()) +"</span></td>"+
			"<td class=\"hidden taxLiabilityCalc\">"+$('#taxLiability').val() +"</td>"+
			"<td><button id=\"Person-"+rownum+"\" class=\"btn-primary edit-user\">Edit</button></td>"+
			"<td><button id=\"Person-Delete-"+rownum+"\" class=\"btn-primary delete-user\">Delete</button></td>"+
			"</tr>" );
		
        dialog.dialog( "close" );
		calcTotalTaxLiability();
		 var icons = {
      header: "ui-icon-circle-arrow-e",
      activeHeader: "ui-icon-circle-arrow-s"
    };
    $( "#beneficiaryAccordian" ).accordion({
      heightStyle: "content",
	  icons: icons
    });
	$( "#toggle" ).button().on( "click", function() {
      if ( $( "#beneficiaryAccordian" ).accordion( "option", "icons" ) ) {
        $( "#beneficiaryAccordian" ).accordion( "option", "icons", null );
      } else {
        $( "#beneficiaryAccordian" ).accordion( "option", "icons", icons );
      }
    });
	$( ".edit-user" ).button().on( "click", function() {
		hideBeneficiaryInputs();
		updateReportTotals();
		addingNewUser=false;		
		$('#whichPersonEdit').html($(this).attr('id'));
		editPerson = $(this).attr('id').split('-')[1];
		//get the id of the person to edit so that the form can be populated with the values
		setupAccordion();
		dialog.dialog( "open" );
		
		//populate all the values
		$("#beneficiaryName").val($('#Beneficiary-'+editPerson + ' .name').text());
		$("#beneficiaryAge").val($('#Beneficiary-'+editPerson + ' .age').text());
		$('#beneficiaryRelationship option').filter(function() { 
			return ($(this).text() == $('#Beneficiary-'+editPerson + ' .relation').text()); //To select Blue
			}).prop('selected', true);
		
		
		for (i=1; i <=6;i++)
		{
			$('input[name="fhr'+i+'"][value="'+$('#Beneficiary-'+editPerson + ' .fhrq'+i).text()+'"]').prop('checked', true);
		}
		for (i=1; i <=5;i++)
		{
			$('input[name="bur'+i+'"][value="'+$('#Beneficiary-'+editPerson + ' .burq'+i).text()+'"]').prop('checked', true);
			$('input[name="far'+i+'"][value="'+$('#Beneficiary-'+editPerson + ' .agrq'+i).text()+'"]').prop('checked', true);
		}

		$("#beneficiaryProperty").val($('#Beneficiary-'+editPerson + ' .curPropAssets').text());
		$("#beneficiaryBusiness").val($('#Beneficiary-'+editPerson + ' .curBusAssets').text());
		$("#beneficiaryFarm").val($('#Beneficiary-'+editPerson + ' .curFarmAssets').text());
		$("#prevGiftsOne").val($('#Beneficiary-'+editPerson + ' .gifts1').text());
		$("#prevGiftsTwo").val($('#Beneficiary-'+editPerson + ' .gifts2').text());
		$("#prevGiftsThree").val($('#Beneficiary-'+editPerson + ' .gifts3').text());
		$("#homeInherit").val($('#Beneficiary-'+editPerson + ' .inherHome').text());
		$("#otherInherit").val($('#Beneficiary-'+editPerson + ' .inherOtherProperty').text());
		$("#savingsInherit").val($('#Beneficiary-'+editPerson + ' .inherInvestments').text());
		$("#personalPropInherit").val($('#Beneficiary-'+editPerson + ' .inherPersonalProperty').text());
		$("#lifeInherit").val($('#Beneficiary-'+editPerson + ' .inherLifeInsurance').text());
		$("#pensionPreInherit").val($('#Beneficiary-'+editPerson + ' .inherPreRetirePen').text());
		$("#pensionPostInherit").val($('#Beneficiary-'+editPerson + ' .inherPostRetirePen').text());
		$("#businessAssetsInherit").val($('#Beneficiary-'+editPerson + ' .inherBusinessAssets').text());
		$("#farmAssetsInherit").val($('#Beneficiary-'+editPerson + ' .inherFarmAssets').text());
		
		$( ".estate" ).trigger("change");
		$( ".beneficiaryAssetsInput" ).trigger("change");
		$( ".assetsBeingInherited" ).trigger("change");
		$( ".fhrQ" ).trigger("change");
		$( ".burQ" ).trigger("change");
		$( ".farrQ" ).trigger("change");
		$( ".prevGifts" ).trigger("change");
		$( ".updateTaxableInheritance" ).trigger("change");		
		$('.calculateBeneficiaryTax').trigger('click');
    });
	 	$( ".delete-user" ).button().on( "click", function() {
		$('#whichPersonEdit').html($(this).attr('id'));
		confirmDialog.dialog( "open" );
		});
      }
      return valid;
    }
 
    var diagh = 650, diagw=900;

    dialog = $( "#dialog-form" ).dialog({
	  dialogClass: "addBeneficiaryDialog",
      autoOpen: false,
      height: diagh,
      width: diagw,
      modal: true,
	  resizable: false,
	  position:{ my: "center", at: "center", of: window },
      buttons: {
        "Save this beneficiary": saveUser,
        Cancel: function() {
          dialog.dialog( "close" );
        }
      },
      close: function() {
        form[ 0 ].reset();
        //allFields.removeClass( "ui-state-error" );
      }
    });
 
     confirmDialog = $( "#dialog-confirm-delete" ).dialog({
	 autoOpen: false,
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Delete this beneficiary": function() {
			//get this id - then get the row id and remove using jquery
			//reduce the number of people			
			var deletePerson = $('#whichPersonEdit').html().split('-')[2];
			$('#beneficiaries tbody tr#Beneficiary-'+deletePerson).remove();
          $( this ).dialog( "close" );
		  calcTotalTaxLiability();
        },
        Cancel: function() {
          $( this ).dialog( "close" );
		  calcTotalTaxLiability();
        }
      }
    });

    form = dialog.find( "form" ).on( "submit", function( event ) {
      event.preventDefault();
      saveUser();
    });
 
    $( "#create-user" ).button().on( "click", function() {	
		hideBeneficiaryInputs();
		updateReportTotals();
		
		updateAvailableAmounts('#familyHome','.inherHome','#inheritOne .reportFamilyHome');
		updateAvailableAmounts('#residences','.inherOtherProperty','#inheritTwo .reportOtherProperty');
		updateAvailableAmounts('#investments','.inherInvestments','#inheritThree .reportInvestments');
		updateAvailableAmounts('#personalProperty','.inherPersonalProperty','#inheritFour .reportPersonal');
		updateAvailableAmounts('#lifeInsurance','.inherLifeInsurance','#inheritFive .reportLifeInsurance');
		updateAvailableAmounts('#perRetirementDeath','.inherPreRetirePen','#inheritSix .reportPensionsPre');
		updateAvailableAmounts('#postRetirementDeath','.inherPostRetirePen','#inheritSeven .reportPensionsPost');
		updateAvailableAmounts('#businessAssetsTotal','.inherBusinessAssets','#inheritEight .reportBusiness');
		updateAvailableAmounts('#farmAssetsTotal','.inherFarmAssets','#inheritNine .reportFarm');
		
		var numRows = $('#beneficiaries tbody tr').length;
		if (numRows == 4)
		{
			alert('Only 4 beneficiaries are allowed');
		}
		else
		{
			setupAccordion();
			addingNewUser=true;
			$('#whichPersonEdit').html('');
			dialog.dialog( "open" );
			$( ".radio-qs" ).on( "click", function() {
				//alert( $( "input:checked" ).val() + " is checked!" );
			});
	  }
    });
	
	
	
		  
  } ); 

  
function numberWithCommas(x) {

	if (isNaN(x) || x == '')
	{
		return "0";
	}
	else
	{
		x = parseFloat(x).toFixed(0);
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}	
}
  
$( function() {

  } );
  
