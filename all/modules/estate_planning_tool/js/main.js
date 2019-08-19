(function($) {
//////////////////////////////////// GLOBAL VARS ////////////////////////////////

$('.name-1').html(name);

/////////////////estate value data
var totalEstate=0;
var totalTaxLiability = 0;
var totalBeingInherited=0;

/////////////////beneficiary data
var beneficiaryAssets=0;
var addingNewUser=false;
var form='';
window.beneficiaryArfValue=0;
window.beneficiaryNonArfValue=0;
//var form = 0;

step1Complete=false;
step2Complete=false;
step3Complete=false;

//modal content
var businessModalContent = $('#businessModalContent').html();
var farmModalContent = $('#farmModalContent').html();
var familyModalContent = $('#familyModalContent').html();

//reliefs
var familyRelief = false;
var businessRelief = false;
var farmRelief = false;

//////////////////////////////////// FUNCTIONS ////////////////////////////////
//does what it says on the tin
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

function removeCommas(str) {
    while (str.search(",") >= 0) {
        str = (str + "").replace(',', '');
    }
    return str;
};

//calculate total tax liability
function calcTotalTaxLiability()
{
var total=0

	$(".saved-beneficiary").each(function() {
	total = total + Number($(this).find(".taxLiabilityCalc").html());
	});
	$('#totalTaxLiability').html(numberWithCommas(total));
}

//get group threshold
function getGroupThreshold(whichGroup)
{
if (whichGroup === 'Group 1')
return 320000
else if (whichGroup === 'Group 2')
return 32500
else
return 16250;
}



//check if full threshold is applicable
function willFullThresholdApply(whatThreshold,group1PrevGift, group2PrevGift, group3PrevGift)
{
if ((whatThreshold === "Group 1" && group1PrevGift > 0) ||
	(whatThreshold === "Group 2" && group2PrevGift > 0) ||
	(whatThreshold === "Group 3" && group3PrevGift > 0))
{
	$('#beneficiaries-form-'+form+' #ben-full-thresh').val('No');
	return "No";
}
else
{
	$('#beneficiaries-form-'+form+' #ben-full-thresh').val('Yes');
	return "Yes";
}
}

//calculate taxable inheritance
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
	$("table tr:contains('Child')").html("1");



   taxableInheritance = Math.max(taxableInheritance,0);
   if (age > 21 && whatThresholdApplies === "Group 1")
   {
		taxableInheritance = Number(taxableInheritance) + Number(postRetireInheritedValue);
   }

   ////console.log(Math.round(taxableInheritance));
   return Math.round(taxableInheritance);
}

function storeARF(arfValue) {
	window.beneficiaryArfValue = arfValue;
}

function storeNonARF(nonArfValue) {
	window.beneficiaryNonArfValue = nonArfValue;
}

//after calculating the taxable inheritance calculate the tax liability
function calculateTaxLiability(age,taxableInheritance,postRetireInheritedValue,isChild) {
	"use strict";
	var ARF = 0;
	ARF = (postRetireInheritedValue * 0.3);
	storeARF(ARF);

	var nonARF = 0;
	nonARF = (taxableInheritance - postRetireInheritedValue) * 0.33;
	storeNonARF(nonARF);

	var tax=0;
	if(isChild) {

    tax = (age >= 21
        ? ((taxableInheritance - postRetireInheritedValue) * 0.33) + (postRetireInheritedValue * 0.3)
        : taxableInheritance * 0.33);
	}
	else
	{
		tax = Number(taxableInheritance) * 0.33;
	}

	////console.log(tax > 0? Math.round(tax):0);

    return tax > 0? Math.round(tax):0;
}

//check if family home relief is applicable
function isFamilyHomeRelief(q1,q2,q3,q4,q5,q6,otherProperty)
{
if (otherProperty == 0 && q1 == 'yes' && q2 == 'yes' && q3 == 'yes' && q4 == 'yes' && q5 == 'no' && q6 == 'yes')
{
  familyRelief = true;
   return "Yes";
   ////console.log('family home relief is yes');
}
else
{

	familyRelief = false;
    return "No";
	////console.log('family home relief is no');
}
}

//check if business relief is applicable
function isBusinessRelief(q1,q2,q3,q4,q5) {
if (q1 == 'yes' && q2 == 'yes' && q3 == 'yes' && q4 == 'yes' && q5 == 'yes')
{
  businessRelief = true;
   return "Yes"
}
else
{
	businessRelief = false;
    return "No";
}
}

function isFarmRelief(q1,q2,q3,q4,q5,totalBeneficiaryAssets,totalFarmAssets) {
if (totalFarmAssets/totalBeneficiaryAssets >= 0.8 && q1 == 'yes' && q2 == 'yes' && q3 == 'yes' && q4 == 'yes' && q5 == 'yes')
{
   $('#farmReliefResult').html('Yes');
   farmRelief = true;
   return "Yes"

}
else
{
	$('#farmReliefResult').html('No');
	farmRelief = false;
    return "No";
}
}



function hasReceivedGifts(group1,group2,group3)
{
	return (Number(group1) + Number(group2) + Number(group3)) > 0;
}

function hideBeneficiaryInputs()
	{
		if (Number($('#family-home').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritOne').show();
			$('#ben-home-relief').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritOne').hide();
			$('.homeReliefApplies').hide();
		}

		if (Number($('#other-prop').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritTwo').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritTwo').hide();
		}

		if (Number($('#savings-investments').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritThree').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritThree').hide();
		}

		if (Number($('#personal-prop').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritFour').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritFour').hide();
		}

		if (Number($('#personal-life').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritFive').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritFive').hide();
		}

		if (Number($('#pre-retire').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritSix').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritSix').hide();
		}

		if (Number($('#post-retire').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritSeven').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritSeven').hide();
		}

		if (Number($('#business-assets').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritEight').show();
			$('.businessReliefApplies').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritEight').hide();
			$('.businessReliefApplies').hide();
		}

		if (Number($('#farm-assets').val()) > 0)
		{
			$('#beneficiaries-form-'+form+' #inheritNine').show();
			$('.farmReliefApplies').show();
		}
		else
		{
			$('#beneficiaries-form-'+form+' #inheritNine').hide();
			$('.farmReliefApplies').hide();
		}
	}


//update the estate details in beneficiary section and final report
function updateReportTotals()
{
$('.beneficiary_name').html($('#ben-name').text());
$('.reportFamilyHome').html(numberWithCommas($('#family-home').val()));
$('.reportOtherProperty').html(numberWithCommas($('#other-prop').val()));
$('.reportInvestments').html(numberWithCommas($('#savings-investments').val()));
$('.reportPersonal').html(numberWithCommas($('#personal-prop').val()));
$('.reportLifeInsurance').html(numberWithCommas($('#personal-life').val()));
$('.reportPensionsPre').html(numberWithCommas($('#pre-retire').val()));
$('.reportPensionsPost').html(numberWithCommas($('#post-retire').val()));
$('.reportBusiness').html(numberWithCommas($('#business-assets').val()));
$('.reportFarm').html(numberWithCommas($('#farm-assets').val()));
$('.reportEstateTotal').html($('#totalEstateVal').html());
}

//check if farm relief is applicable
function updateFarmRelief() {
var totalBeingInherited = 0;
	var farmRelQ1 = $('#beneficiaries-form-'+form+' #farm-relief-form input[name=radio-q-12]:checked').val();
	var farmRelQ2 = $('#beneficiaries-form-'+form+' #farm-relief-form input[name=radio-q-13]:checked').val();
	var farmRelQ3 = $('#beneficiaries-form-'+form+' #farm-relief-form input[name=radio-q-14]:checked').val();
	var farmRelQ4 = $('#beneficiaries-form-'+form+' #farm-relief-form input[name=radio-q-15]:checked').val();
	var farmRelQ5 = $('#beneficiaries-form-'+form+' #farm-relief-form input[name=radio-q-16]:checked').val();
	var benFarmTotal = $('#beneficiaries-form-'+form+' #ben-farm-total').val();
	var benProperty = $('#beneficiaries-form-'+form+' #ben-property').val();
	var benBusiness = $('#beneficiaries-form-'+form+' #ben-business').val();
    var benFarm = $('#beneficiaries-form-'+form+' #ben-farm').val();

	$( ".assetsBeingInherited" ).each(function( index ) {
		totalBeingInherited = totalBeingInherited + Number($( this ).val());
	});

	$('#beneficiaries-form-'+form+' #ben-farm-relief').val(isFarmRelief(farmRelQ1,farmRelQ2,farmRelQ3,farmRelQ4,farmRelQ5,
			totalBeingInherited + Number(benProperty) +
			Number(benBusiness) +
			Number(benFarm),
			Number(benFarmTotal) + Number(benFarm)));


}

//add the accordion
function setupAccordion(whichForm) {
				var accordion = '<div class="row mt beneficiaries-form" id="beneficiaries-form-'+whichForm+'">\
				<div class="col-lg-8 col-sm-8 col-xs-12 col-lg-offset-2 col-sm-offset-2">\
					<div id="accordion-heading-'+whichForm+'" class="accordion-heading">\
						<div class="row">\
							<div class="col-lg-8 col-sm-8 col-xs-8">\
								<p style="color:whtie">Beneficiary Details<br/>\
								<small style="color:white!important;font-size:12px">Expand each accordion to fill in details for the beneficiary</span>\
								</p>\
							</div>\
							<div class="col-lg-4 col-sm-4 col-xs-4">\
								<span class="close-ben" id="close-beneficiary-'+whichForm+'" style="float:right;cursor:pointer">X</span>\
							</div>\
						</div>\
					</div>\
					<div class="panel-group" id="accordion-'+whichForm+'">\
						<!-- name and relationship -->\
						<div class="panel panel-default">\
							<div class="panel-heading" id="heading-8-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse1-ben-'+whichForm+'">\
								<p class="panel-title">Name and Relationship<i class="fa fa-chevron-down " aria-hidden="true"></i> <span style="color:red" class="nameRelWarning">(Please enter these before proceeding)</span></p>\
							</div>\
							<div class="panel-collapse collapse show" id="collapse1-ben-'+whichForm+'">\
								<div class="panel-body">\
									<div class="form-group">\
										<label for="ben-name">Name</label> <input class="form-control beneficiary-inputs" id="ben-name" type="text">\
									</div>\
									<div class="form-group">\
										<label for="ben-age">Age</label><input class="form-control beneficiary-inputs" id="ben-age" name="ben-age" type="number">\
									</div>\
									<div class="form-group">\
										<label for="ben-rel">Relationship to Client(s)</label> <select class="form-control beneficiary-inputs updateTaxableInheritance impactsBeneficiaryTaxCal" id="ben-rel">\
										    <option value="Group 0">\
											Please select\
											</option>\
											<option value="Group 1">\
												Child\
											</option>\
											<option value="Group 2">\
												Descendant/Anscestor\
											</option>\
											<option value="Group 3">\
												Other\
											</option>\
										</select>\
									</div>\
								</div>\
							</div>\
						</div><!-- previous gifts and inheritances -->\
						<div class="panel panel-default">\
							<div class="panel-heading" id="heading-7-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse2-ben-'+whichForm+'">\
								<p class="panel-title">Previous Gifts/Inheritances<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse collapse" id="collapse2-ben-'+whichForm+'">\
								<div class="panel-body">\
									<div class="form-group">\
										<label for="prevGiftsOne">Total Threshold 1 Value</label> <input placeholder="0" class="form-control beneficiary-inputs prevGifts updateTaxableInheritance impactsBeneficiaryTaxCal" id="prevGiftsOne" type="number">\
									</div>\
									<div class="form-group">\
										<label for="prevGiftsOne">Total Threshold 2 Value</label> <input placeholder="0" class="form-control beneficiary-inputs prevGifts updateTaxableInheritance impactsBeneficiaryTaxCal" id="prevGiftsTwo" type="number">\
									</div>\
									<div class="form-group">\
										<label for="prevGiftsTwo">Total Threshold 3 Value</label> <input placeholder="0" class="form-control beneficiary-inputs prevGifts updateTaxableInheritance impactsBeneficiaryTaxCal" id="prevGiftsThree" type="number">\
									</div>\
								</div>\
							</div>\
						</div><!-- current beneficiary assets -->\
						<div class="panel panel-default">\
							<div class="panel-heading" id="heading-6-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse3-ben-'+whichForm+'">\
								<p class="panel-title">Current Beneficiary Assets<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse collapse" id="collapse3-ben-'+whichForm+'">\
								<div class="panel-body">\
									<div class="form-group">\
										<label for="ben-property">Property</label> <input placeholder="0" class="form-control beneficiary-inputs beneficiary-assets-input impactFarmReliefInput" id="ben-property" type="number">\
									</div>\
									<div class="form-group">\
										<label for="ben-business">Business</label> <input placeholder="0" class="form-control beneficiary-inputs beneficiary-assets-input impactFarmReliefInput" id="ben-business" type="number">\
									</div>\
									<div class="form-group">\
										<label for="ben-farm">Farm</label> <input placeholder="0" class="form-control beneficiary-inputs beneficiary-assets-input impactFarmReliefInput" id="ben-farm" type="number">\
									</div>\
									<div class="form-group">\
										<label for="ben-assets-total">Total</label> <input placeholder="0" class="form-control beneficiary-inputs impactFarmReliefInput" id="ben-assets-total" style="background-color:#eee" readonly>\
									</div>\
								</div>\
							</div>\
						</div><!-- estate details -->\
						<div class="panel panel-default">\
							<div class="panel-heading" id="heading-5-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse4-ben-'+whichForm+'">\
								<p class="panel-title">Estate Details - assets being inherited<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse collapse" id="collapse4-ben-'+whichForm+'">\
								<div class="panel-body">\
								<div class="nextButton" id="resetBtn">\
								Click to reset these fields & enter new amounts\
								</div>\
									<div class="form-group" id="inheritOne">\
										<label for="ben-residence">Family Home/Main Residence (€<span class="reportFamilyHome"></span> remaining)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-residence" type="number">\
									</div>\
									<div class="form-group" id="inheritTwo">\
										<label for="ben-other-property">Total Other Properties/Residences (€<span class="reportOtherProperty"></span> remaining)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput"  id="ben-other-property" type="number">\
									</div>\
									<div class="form-group" id="inheritThree">\
										<label for="ben-total-savings">Total Savings and Investments (€<span class="reportInvestments"></span> remaining)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-total-savings" type="number">\
									</div>\
									<div class="form-group" id="inheritFour">\
										<label for="ben-personal-property">Total Personal Property (€<span class="reportPersonal"></span> remaining)</label>\ <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-personal-property" type="number">\	</div>\<div class="form-group" id="inheritFive">\
										<label for="ben-personal-life">Total Personal Life Assurance (€<span class="reportLifeInsurance"></span>)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-personal-life" type="number">\
									</div>\
									<div class="form-group" id="inheritSix">\
										<label for="ben-pension-benefits">Pension Benefits - Pre-Retirement (€<span class="reportPensionsPre"></span> remaining)</label> <input placeholder="0" id="ben-pension-benefits" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" type="number">\
									</div>\
									<div class="form-group" id="inheritSeven">\
										<label for="ben-pensions-amrf">Pension Benefits - Post-Retirement (AMRF, ARF, Vested PRSA) (€<span class="reportPensionsPost"></span> remaining)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-pensions-amrf" type="number">\
										<p>If the beneficiary of the proceeds of the ARF/AMRF/Vested PRSA is a child of the disponer enter the Gross amount. Otherwise, enter the amount less any deduction of income tax by the QFM.</p>\
										</div>\
									<div class="form-group" id="inheritEight">\
										<label for="ben-bus-total">Total Value of Business Assets (€<span class="reportBusiness"></span> remaining)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-bus-total" type="number">\
									</div>\
									<div class="form-group" id="inheritNine">\
										<label for="ben-farm-total">Total Value of Farm Assets (€<span class="reportFarm"></span> remaining)</label> <input placeholder="0" class="form-control beneficiary-inputs assetsBeingInherited impactsBeneficiaryTaxCal updateTaxableInheritance impactFarmReliefInput" id="ben-farm-total" type="number">\
									</div>\
								</div>\
							</div>\
						</div>\
						<!-- family home relief -->\
						<div class="panel panel-default homeReliefApplies">\
							<div class="panel-heading" id="heading-4-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse5-ben-'+whichForm+'">\
								<p class="panel-title">Family Home Exemption<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse collapse" id="collapse5-ben-'+whichForm+'">\
								<div class="panel-body">\
								<form id="family-relief-form">\
								<p style="cursor:pointer;text-decoration:underline;color: black;" class="familyReliefBtn">To help your client answer the questions below click here for more detail on Family Home Exemption.</p>\
								<br/>\
								    <div class="form-group">\
										<p>Is this beneficiary inheriting the family home?</p>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-2" id="radio-q-2-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-2" id="radio-q-2-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will the property be the family home of the client(s) at the time of their death?</p>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-1" id="radio-q-1-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-1" id="radio-q-1-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Does this beneficiary live in this property?</p>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ"name="radio-q-4" id="radio-q-4-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-4" id="radio-q-4-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Is this the only property this beneficiary is to inherit?</p>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-3" id="radio-q-3-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-3" id="radio-q-3-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Does this beneficiary have an interest in any other property?</p>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-5" id="radio-q-1-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-5" id="radio-q-5-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Does the beneficiary intend to continue to live in this \'family home\' for the next 6 years after the inheritance?</p>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-6" id="radio-q-6-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="fhrQ" name="radio-q-6" id="radio-q-6-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
								  </form>\
								</div>\
							</div>\
						</div>\
						<!-- business relief -->\
						<div class="panel panel-default businessReliefApplies">\
							<div class="panel-heading" id="heading-3-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse7-ben-'+whichForm+'">\
								<p class="panel-title">Business Relief<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse collapse" id="collapse7-ben-'+whichForm+'">\
								<div class="panel-body">\
								<form id="business-relief-form">\
								    <p style="cursor:pointer;text-decoration:underline;color: black;" class="businessReliefBtn">To help your client answer the questions below click here for more detail on Business Relief.</p>\
									<br/>\
									<div class="form-group">\
										<p>Is this beneficiary to inherit \'business\' assets?</p>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-7" id="radio-q-7-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-7" id="radio-q-7-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will the nature of the business assets qualify for business relief?</p>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-8" id="radio-q-8-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-8" id="radio-q-8-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Has the client owned the business assets for two years?</p>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-9" id="radio-q-9-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-9" id="radio-q-9-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will the beneficiary meet one of the three \'control\' conditions?</p>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-10" id="radio-q-10-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-10" id="radio-q-10-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will this beneficiary keep the business as a going concern for 6 years after the inheritance?</p>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-11" id="radio-q-11-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="busQ" name="radio-q-11" id="radio-q-11-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
								  </form>\
								</div>\
							</div>\
						</div>\
						<!-- agricultural relief -->\
						<div class="panel panel-default farmReliefApplies">\
							<div class="panel-heading" id="heading-2-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse8-ben-'+whichForm+'">\
								<p class="panel-title">Farm Relief<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse collapse" id="collapse8-ben-'+whichForm+'">\
								<div class="panel-body">\
								<form id="farm-relief-form">\
								<p style="text-decoration:underline;cursor:pointer;color: black;" class="farmReliefBtn">To help your client answer the questions below click here for more detail on Agricultural Relief.</p>\
									<div class="form-group">\
										<p>Is this beneficiary to inherit the agricultural property / farm assets?</p>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-12" id="radio-q-12-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-12" id="radio-q-12-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will the nature of the agricultural property / farm assets qualify for agricultural relief?</p>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-13" id="radio-q-13-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-13" id="radio-q-13-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will the beneficiary meet the 80% assets rule after this inheritance?</p>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-14" id="radio-q-14-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-14" id="radio-q-14-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will this beneficiary qualify as a \'farmer\' for the purpose of this relief?</p>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-15" id="radio-q-15-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-15" id="radio-q-15-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
									<div class="form-group">\
										<p>Will this beneficiary continue to qualify as a farmer and will the assets continue to qualify for the relief?</p>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-16" id="radio-q-16-yes" type="radio" value="yes"> <span class="radio-label">Yes</span></label>\
											<label class="radio-custom radio-inline">\
											<input class="farmQ" name="radio-q-16" id="radio-q-16-no" type="radio" value="no"> <span class="radio-label">No</span></label>\
									</div>\
								  </form>\
								</div>\
							</div>\
						</div>\
						<!-- calculate totals and inheritance -->\
						<div class="panel panel-default">\
							<div class="panel-heading" id="heading-1-'+whichForm+'" data-parent="#accordion-'+whichForm+'" data-toggle="collapse" href="#collapse6-ben-'+whichForm+'"">\
								<p class="panel-title">Calculate totals and Inheritance liability for this beneficiary<i class="fa fa-chevron-down" aria-hidden="true"></i></p>\
							</div>\
							<div class="panel-collapse in" id="collapse6-ben-'+whichForm+'"">\
								<div class="panel-body">\
								    <div class="calcholder">\
									<div class="calculateBeneficiaryTaxBtn calculateBeneficiaryTax">\
									</div>\
									</div>\
									<div class="form-group">\
									<div class="form-group">\
						            <label for="ben-inheritance">Total Value of Assets being inherited by this beneficiary</label>\
									<input class="form-control beneficiary-inputs" id="ben-inheritance" type="text" readonly>\
					                </div>\
									<div class="form-group homeReliefApplies">\
						            <label for="ben-home-relief">Does Family Home Relief Apply</label>\
									<input class="form-control beneficiary-inputs" id="ben-home-relief" type="text" readonly value="No">\
					                </div>\
									<div class="form-group businessReliefApplies">\
						            <label for="ben-bus-relief">Does Business Relief Apply</label>\
									<input class="form-control beneficiary-inputs" id="ben-bus-relief" type="text" readonly value="No">\
					                </div>\
									<div class="form-group farmReliefApplies">\
						            <label for="ben-farm-relief">Does Agricultural Relief Apply</label>\
									<input class="form-control beneficiary-inputs" id="ben-farm-relief" type="text" readonly value="No">\
					                </div>\
									<div class="form-group">\
						            <label for="ben-threshold">What threshold applies</label>\
									<input class="form-control beneficiary-inputs" id="ben-threshold" type="text" readonly>\
					                </div>\
									<div class="form-group">\
						            <label for="ben-full-thresh">Will full threshold apply?</label>\
									<input class="form-control beneficiary-inputs" id="ben-full-thresh" type="text" readonly value="Yes">\
					                </div>\
									<div class="form-group">\
						            <label for="ben-tax-val">Taxable Value of Beneficiary Inheritance</label>\
									<input class="form-control beneficiary-inputs" id="ben-tax-val" type="text" readonly>\
					                </div>\
									<div class="form-group">\
						            <label for="ben-tax-lib">Tax Liability</label>\
									<input class="form-control beneficiary-inputs" id="ben-tax-lib" type="text" readonly>\
					                </div>\
									</div>\
								</div>\
							</div>\
						</div>\
					</div>\
					<div class="save-beneficiaries">\
						Save Beneficiaries\
					</div>\
				</div>\
			</div>';

			var modals = "<div class=\"modal\" id=\"businessReliefModal\" role=\"dialog\" tabindex=\"-1\">\
			                        <div class=\"modal-dialog\">\
									<div class=\"modal-body\">\
									"+businessModalContent+"\
									</div>\
									</div>\
									</div><div class=\"modal\" role=\"dialog\" tabindex=\"-1\" id=\"familyReliefModal\">\
									<div class=\"modal-dialog\">\
									<div class=\"modal-body\">\
									"+familyModalContent+"\
									</div>\
									</div>\
									</div>\
									<div class=\"modal\" role=\"dialog\" tabindex=\"-1\" id=\"farmReliefModal\">\
									<div class=\"modal-dialog\">\
									<div class=\"modal-body\">\
									"+farmModalContent+"\
									</div>\
									</div>\
									</div>";

			$('#the-accordion').append(accordion);
			$('body').append(modals);

	        //open the modals
			$('body').on('click','.businessReliefBtn',function(){
				$("#businessReliefModal").modal('show');
			})

			$('body').on('click','.familyReliefBtn',function(){
				$("#familyReliefModal").modal('show');
			})

			$('body').on('click','.farmReliefBtn',function(){
				$("#farmReliefModal").modal('show');
			})



			//YOU LEFT OFF HERE ON 10/01/2018
			if (!addingNewUser) {

				$('body').trigger('change','#beneficiary-'+whichForm+' .estateQ');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .beneficiary-assets-input');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .assetsBeingInherited');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .fhrQ');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .busQ');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .farmQ');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .prevGifts');
				$('body').trigger("change",'#beneficiary-'+whichForm+' .updateTaxableInheritance');
				//$('body').trigger('click','#beneficiary-'+whichForm+' .calculateBeneficiaryTax');
				calcBeneficiaryTax();

			updateAvailableAmounts('#family-home','.inherHome','#beneficiaries-form-'+form+' #inheritOne .reportFamilyHome');
			updateAvailableAmounts('#other-prop','.inherOtherProperty','#beneficiaries-form-'+form+' #inheritTwo .reportOtherProperty');
			updateAvailableAmounts('#savings-investments','.inherInvestments','#beneficiaries-form-'+form+' #inheritThree .reportInvestments');
			updateAvailableAmounts('#personal-prop','.inherPersonalProperty','#beneficiaries-form-'+form+' #inheritFour .reportPersonal');
			updateAvailableAmounts('#personal-life','.inherLifeInsurance','#beneficiaries-form-'+form+' #inheritFive .reportLifeInsurance');
			updateAvailableAmounts('#pre-retire','.inherPreRetirePen','#beneficiaries-form-'+form+' #inheritSix .reportPensionsPre');
			updateAvailableAmounts('#post-retire','.inherPostRetirePen','#beneficiaries-form-'+form+' #inheritSeven .reportPensionsPost');
			updateAvailableAmounts('#business-assets','.inherBusinessAssets','#beneficiaries-form-'+form+' #inheritEight .reportBusiness');
			updateAvailableAmounts('#farm-assets','.inherFarmAssets','#beneficiaries-form-'+form+' #inheritNine .reportFarm');

			}
}

//save beneficiary
function saveBeneficiary(number, name, age, reliefs, currentAssets, threshold, assetsInherited, taxVal, taxLib, newOrEdit) {
	// Enable GET THE REPORT button when a beneficiary is saved
	$("#showPrint").removeAttr("disabled");
	    addingNewUser = newOrEdit;

		//store the table for a beneficiary
		var tableHolder = '<div class="row saved-beneficiary" id="beneficiary-'+number+'"><div class="col-lg-8 col-sm-8 col-xs-12 col-lg-offset-2 col-sm-offset-2"><div class="saved-heading">\
					<div class="row">\
						<div class="col-lg-8 col-sm-8 col-xs-8">\
						<p style="color:#ffffff !important" class="beneficiaries">Beneficiary - <span id="benDetailsName" style="color:#ffffff !important">'+name+'</span></p>\
						</div>\
						<div class="col-lg-4 col-sm-8 col-xs-8">\
						<!-- <div id="edit-user-'+number+'" class="edit-user edit">Edit</div>-->\
						<!-- <div id="delete-user-'+number+'" class="delete-user delete">Delete</div>-->\
						</div></div></div>\
                    <div class="saved-body">\
					<div class="row">\
						<div class="col-lg-6 col-sm-6 col-xs-6">Name</div>\
						<div class="col-lg-6 col-sm-6 col-xs-6 name">'+name+'</div>\
				    </div>\
					<div class="row">\
					<div class="col-lg-6 col-sm-6 col-xs-6">Relationship</div>\
					<div class="col-lg-6 col-sm-6 col-xs-6">\
					<span class="relation">'+$("#beneficiaries-form-"+number+" #ben-rel option:selected").text()+'</span>\
					</div>\
					</div>\
					<div class="row">\
						<div class="col-lg-6 col-sm-6 col-xs-6">Age</div>\
						<div class="col-lg-6 col-sm-6 col-xs-6 age">'+age+'</div>\
				    </div>\
					<div class="row hidden">\
					<div class="col-lg-12 col-sm-12 col-xs-12">\
					<div class="hidden fhrq1">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-1]:checked").val()+'</div>\
					<div class="hidden fhrq2">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-2]:checked").val()+'</div>\
					<div class="hidden fhrq3">'+$("#beneficiaries-form-"+number+"input:radio[name=radio-q-3]:checked").val()+'</div>\
                    <div class="hidden fhrq4">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-4]:checked").val()+'</div>\
					<div class="hidden fhrq5">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-5]:checked").val()+'</div>\
					<div class="hidden fhrq6">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-6]:checked").val()+'</div>\
					<div class="hidden burq1">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-7]:checked").val()+'</div>\
					<div class="hidden burq2">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-8]:checked").val()+'</div>\
					<div class="hidden burq3">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-9]:checked").val()+'</div>\
					<div class="hidden burq4">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-10]:checked").val()+'</div>\
					<div class="hidden burq5">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-11]:checked").val()+'</div>\
					<div class="hidden agrq1">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-12]:checked").val()+'</div>\
					<div class="hidden agrq2">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-13]:checked").val()+'</div>\
					<div class="hidden agrq3">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-14]:checked").val()+'</div>\
					<div class="hidden agrq4">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-15]:checked").val()+'</div>\
					<div class="hidden agrq5">'+$("#beneficiaries-form-"+number+" input:radio[name=radio-q-16]:checked").val()+'</div>\
					<div class="hidden curPropAssets">'+$("#beneficiaries-form-"+number+" #ben-property").val()+'</div>\
					<div class="hidden curBusAssets">'+$("#beneficiaries-form-"+number+" #ben-business").val()+'</div>\
					<div class="hidden curFarmAssets">'+$("#beneficiaries-form-"+number+" #ben-farm").val()+'</div>\
					<div class="hidden totalAssets">'+$("#beneficiaries-form-"+number+" #ben-assets-total").val()+'</div>\
					<div class="hidden totalInheritance">'+$('#beneficiaries-form-'+number+' #ben-inheritance').val()+'</div>\
					<div class="hidden doesHomeRelief">'+$('#beneficiaries-form-'+number+' #ben-home-relief').val()+'</div>\
					<div class="hidden doesBusinesssRelief">'+$('#beneficiaries-form-'+number+' #ben-bus-relief').val()+'</div>\
					<div class="hidden doesFarmRelief">'+$('#beneficiaries-form-'+number+' #ben-farm-relief').val()+'</div>\
					<div class="hidden whatThreshold">'+$('#beneficiaries-form-'+number+' #ben-threshold').val()+'</div>\
					<div class="hidden willFullThresh">'+$('#beneficiaries-form-'+number+' #ben-full-thresh').val()+'</div>\
					<div class="hidden taxValInheritance">'+$('#beneficiaries-form-'+number+' #ben-tax-val').val()+'</div>\
					<div class="hidden taxLiability">'+$('#beneficiaries-form-'+number+' #ben-tax-lib').val()+'</div>\
					</div>\
					</div>\
					<div class="row">\
						<div class="col-lg-6 col-sm-6 col-xs-6">Reliefs</div>\
						<div class="col-lg-6 col-sm-6 col-xs-6 fhr">'+reliefs+'</div>\
				    </div>\
					<div class="row">\
						<div class="col-lg-6 col-sm-6 col-xs-6">Current Assets</div>\
						<div class="col-lg-6 col-sm-6 col-xs-6 currentAssetsVal">€'+numberWithCommas(currentAssets)+'</div>\
				    </div>\
					<div class="row hidden">\
					<div class="hidden inherHome">'+$("#beneficiaries-form-"+number+" #ben-residence").val()+'</div>\
					<div class="hidden inherOtherProperty">'+$("#beneficiaries-form-"+number+" #ben-other-property").val()+'</div>\
				    <div class="hidden inherInvestments">'+$("#beneficiaries-form-"+number+" #ben-total-savings").val()+'</div>\
					<div class="hidden inherPersonalProperty">'+$("#beneficiaries-form-"+number+" #ben-personal-property").val()+'</div>\
					<div class="hidden inherLifeInsurance">'+$("#beneficiaries-form-"+number+" #ben-personal-life").val()+'</div>\
					<div class="hidden inherPreRetirePen">'+$("#beneficiaries-form-"+number+" #ben-pension-benefits").val()+'</div>\
					<div class="hidden inherPostRetirePen">'+$("#beneficiaries-form-"+number+" #ben-pensions-amrf").val()+'</div>\
					<div class="hidden inherBusinessAssets">'+$("#beneficiaries-form-"+number+" #ben-bus-total").val()+'</div>\
					<div class="hidden inherFarmAssets">'+$("#beneficiaries-form-"+number+" #ben-farm-total").val()+'</div>\
					<div class="hidden gifts1">'+$("#beneficiaries-form-"+number+" #prevGiftsOne").val()+'</div>\
					<div class="hidden gifts2">'+$("#beneficiaries-form-"+number+" #prevGiftsTwo").val()+'</div>\
					<div class="hidden gifts3">'+$("#beneficiaries-form-"+number+" #prevGiftsThree").val()+'</div>\
					</div>\
					<div class="row">\
						<div class="col-lg-6 col-sm-6 col-xs-6">Full threshold applies?</div>\
						<div class="col-lg-6 col-sm-6 col-xs-6 fullThresholdApplies">'+threshold+'</div>\
				    </div>\					<div class="row">\						<div class="col-lg-6 col-sm-6 col-xs-6">Assets being inherited</div>\						<div class="col-lg-6 col-sm-6 col-xs-6 inheritanceVal">'+assetsInherited+'</div>\				    </div>\					<div class="row">\						<div class="ccol-lg-6 col-sm-6 col-xs-6">Taxable value of inheritance</div>\<div class="hidden" id="taxableInheritance">'+taxVal+'</div>						<div class="col-lg-6 col-sm-6 col-xs-6 taxableInheritance">€'+numberWithCommas(taxVal)+'</div>\
				    </div>\
					<div class="row">\
						<div class="col-lg-6 col-sm-6 col-xs-6">Tax Liability</div>\
						<div class="hidden taxLiabilityCalc">'+taxLib+'</div><div class="col-lg-6 col-sm-6 col-xs-6 ">€'+numberWithCommas(taxLib)+'</div>\
				    </div></div></div></div>';

					////console.log($('.inherPostRetirePen').html())



		//insert the table onto the screen just after the heading

		if(!addingNewUser) {
		$('#beneficiary-'+number+'').remove();
		}

		valid = true;

		valid = valid && checkAmountEntered('#family-home','.inherHome','#beneficiaries-form-'+number+' #ben-residence','Family Home/Main Residence');
		valid = valid && checkAmountEntered(' #other-prop','.inherOtherProperty','#beneficiaries-form-'+number+' #ben-other-property','Total Other Properties & Residences');
		valid = valid && checkAmountEntered('#savings-investments','.inherInvestments','#beneficiaries-form-'+number+' #ben-total-savings','Total Savings and Investments');
		valid = valid && checkAmountEntered(' #personal-prop','.inherPersonalProperty','#beneficiaries-form-'+number+' #ben-personal-property','Total Personal Property');
		valid = valid && checkAmountEntered('#personal-life','.inherLifeInsurance','#beneficiaries-form-'+number+' #ben-personal-life','Personal Life Insurance');
		valid = valid && checkAmountEntered('#pre-retire','.inherPreRetirePen','#beneficiaries-form-'+number+' #ben-pension-benefits','Pre-Retirement - Total Payment on Death');
		valid = valid && checkAmountEntered('#post-retire','.inherPostRetirePen','#beneficiaries-form-'+number+' #ben-pensions-amrf','Post-Retirement - AMRF, ARF, Vested PRSA');
		valid = valid && checkAmountEntered('#business-assets','.inherBusinessAssets','#beneficiaries-form-'+number+' #ben-bus-total','Total Value of Business Assets');
		valid = valid && checkAmountEntered('#farm-assets','.inherFarmAssets','#beneficiaries-form-'+number+' #ben-farm-total','Total Value of Farm Assets');


		if(valid && addingNewUser) {
			$('#beneficiary-heading').after(tableHolder);
			$('.saved-beneficiary').fadeIn();
			$('#add-beneficiary-section').fadeIn();
			$('.beneficiary-inputs').val('');
			calcTotalTaxLiability();
			$('#add-beneficiary, .buttons').fadeIn();
			$('#beneficiaries-form-'+number+'').fadeOut();
		}
		else if(valid && !addingNewUser) {
			$('#beneficiary-heading').after(tableHolder);
			$('.saved-beneficiary').fadeIn();
			$('#add-beneficiary-section').fadeIn();
			$('.beneficiary-inputs').val('');
			calcTotalTaxLiability();
			$('#add-beneficiary, .buttons').fadeIn();
			$('#beneficiaries-form-'+number+'').fadeOut();
		}

		//$('#beneficiaries-form-'+number+'').fadeOut();
			//$('.beneficiary-inputs').val('');

		return valid;

}


//show hidden accordion fields for agricultural and business assets
function showHiddenAccordions() {
	var busTotal = $('#business-assets').val();
    var farmTotal = $('#farm-assets').val();

		if (Number(busTotal) > 0)
		{
			$('#inheritEight').show();
			$('.businessReliefApplies').show();
		}
		else
		{
			$('#inheritEight').hide();
			$('.businessReliefApplies').hide();
		}

		if (Number(farmTotal) > 0)
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

function updateAvailableAmounts(assetNameDivId,tableDivId,labelId)
{
	var availableForHome = Number($(assetNameDivId).val());

	$(labelId).html(numberWithCommas(availableForHome));

	$(".saved-beneficiary").each(function() {
		availableForHome = availableForHome - Number($(this).find(tableDivId).html());
		$(labelId).html(numberWithCommas(availableForHome));
	});


}

function resetInheritance(assetNameDivId,tableDivId,labelId)
{
	var amountAvailable = Number($(assetNameDivId).val());

	$(labelId).html(numberWithCommas(amountAvailable));
	$(tableDivId).html(0);

}

function amountLeftRealTime(assetNameDivId,tableDivId,labelId) {
	$(labelId).html(numberWithCommas(availableForHome));
}

// YOU ARE HERE - THE PROBLEM IS TO DO WITH THE TABLEROW HAVING A VALUE THE SECOND TIME AROUND WHEN EDITING - SO MAYBE IF STATEMENT TO DO WITH ADDINGnEWuSER
function checkAmountEntered(estateAmountDivId,tableRowClassId,beneficiaryFormId,assetName) {
  var assetAmtLeft=Number($(estateAmountDivId).val());
	//add up the existing ones
	//console.log('The tableRowClassID value is ='+$(tableRowClassId).html());
	$(".saved-beneficiary").each(function() {
		assetAmtLeft = assetAmtLeft - Number($(this).find(tableRowClassId).html());
	});
	  //now take away this amount
		assetAmtLeft = assetAmtLeft - Number($(beneficiaryFormId).val());
	  valid = (assetAmtLeft >= 0);
	  if (!valid) {
		alert('You have entered more than is available for '+assetName);
		$(beneficiaryFormId).css('border-color','red');
	  }
	  else {
		  $(beneficiaryFormId).css('border-color','#848484 #c1c1c1 #e1e1e1');
	  }
	  return valid;
}

function checkInheritanceAmt(amountInherited,amountRemaining, assetName) {
	if(amountInherited > amountRemaining) {
		alert('You have entered more than is available for '+assetName);

		return valid = false;
	}
	else {
		return valid;
	}

}

//check  that everything in step 1 is valid if not show an error message
function step1Valid()
{
    valid = true;

	$('#validation-message-text').html('');
	if ($('#name').val() === '')
	{
		$('#name-error').fadeIn();
		valid = false;
	}
	else if ($('#age').val() === '')
	{
		$('#age-error').fadeIn();
		valid = false;
	}
	else if  ($('#age-2').val() > 110)
	{
		$('#validation-message-text').html("Client's age is invalid");
		$( "#age" ).focus();
		valid = false;
	}
	else if ($('#age-2').val() === '' && $('#name-2').val() != '')
	{
		$('#age-2-error').fadeIn();
		$( "#age-2" ).focus();
		valid = false;
	}
	else if  ($('#age-2').val() > 110)
	{
		$('#validation-message-text').html("Second client's age is invalid");
		$( "#age-2" ).focus();
		valid = false;
	}
	else if ($('#age-2').val() != '' && $('#name-2').val() != '' && $("input:radio[name=radio-married]:checked").val() == 'N')
	{
		$('#married-error').fadeIn();
		//$( "#marriedStatus" ).focus();
		valid = false;
	}
	else if ($('#age-2').val() != '' && $('#name-2').val() != '' && $("input:radio[name=radio-married]:checked").val() == 'Y')
	{
		$('#married-error').fadeOut();
	}

	if (!valid)
	{
		$( "#tabs" ).tabs( "option", "disabled", [ 2, 3 ] )
		$( "#validation-message" ).dialog( "open" );
	}
	else
	{

		step1Complete=true;
		$('#personal-info').fadeOut()
		$('#estate-value').fadeIn();
	}

	return valid;

}

function step2Valid() {

	valid = true;

	if ($('#totalAssetsValue').html() === '€0')
	{
		$('#assets-error').fadeIn();
		valid = false;
	}

	if (!valid)
	{
		$( "#tabs" ).tabs( "option", "disabled", [ 2, 3 ] )
		$( "#validation-message" ).dialog( "open" );
	}

	else
	{
		valid = true;
		step2Complete=true;
		$('#estate-value').fadeOut()
		$('#beneficiaries').fadeIn();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');

	}

	return valid;
}

//check  that everything in step 2 is valid if not show an error message
function step3Valid() {
	valid = true;

	//check at least one beneficiary
	var rowCount = $('.saved-beneficiary').length;

	if (rowCount == 0)
	{
		$('#ben-error').fadeIn();
		$( "#tabs" ).tabs( "option", "disabled", [ 3 ] )
		$( "#validation-message" ).dialog( "open" );

		valid = false;
	}
	if (!valid)
	{
		$( "#tabs" ).tabs( "option", "disabled", [ 2, 3 ] )
		$( "#validation-message" ).dialog( "open" );
	}

	else
	{

		step3Complete=true;

		$('#beneficiaries').hide();
		$('#the-print-report').fadeIn();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');
		populateReport();

		//populate report with all the relevant values
	}

	return valid;
}

function changeIcon(whichOne)
{
  var expand = 'fa-chevron-right';
  var collapse = 'fa-chevron-down';
  var thePic = $(''+whichOne+'.panel-title .fa')// use jQuery to get the current one clicked

  // now set the src attribute according to its current state
  if(!(thePic).hasClass('collapsed')){
  $(thePic).addClass(expand);
  }
  else {
	  $(thePic).addClass(collapse);
  }
}



//////////////////////////////////// EVENTS ////////////////////////////////
$( document ).ready(function() {
//fix the document search and broker login buttons issue
$('#region-online-services-login-header').removeClass('grid-3 prefix-6');
$('#region-online-services-login-header').addClass('col-lg-3 col-lg-offset-9');

//only unlock the accordion when benificiary age, name and rel has a value
$('body').on('change','#beneficiaries-form-1 #ben-age, #beneficiaries-form-1 #ben-name, #beneficiaries-form-1 #ben-rel',function(){
	//$('.calculateBeneficiaryTax').trigger('click');
	calcBeneficiaryTax();
	if($('#beneficiaries-form-1 #ben-age').val() != '' && $('#beneficiaries-form-1 #ben-name').val() != '' && $('#beneficiaries-form-1 #ben-rel option:selected').val() != 'Group 0') {
        $('#beneficiaries-form-1 .panel-heading').css('pointer-events','auto');
	    $('#beneficiaries-form-1 .nameRelWarning').hide();
	}
	else {
		$('#beneficiaries-form-1 .panel-heading').css('pointer-events','none');
		$('#beneficiaries-form-1 .nameRelWarning').show();
	}
});

$('body').on('change','#beneficiaries-form-2 #ben-age, #beneficiaries-form-2 #ben-name, #beneficiaries-form-2 #ben-rel',function(){
	//$('.calculateBeneficiaryTax').trigger('click');
	calcBeneficiaryTax();
	if($('#beneficiaries-form-2 #ben-age').val() != '' && $('#beneficiaries-form-2 #ben-name').val() != '' && $('#beneficiaries-form-2 #ben-rel option:selected').val() != 'Group 0') {
		$('#beneficiaries-form-2 .panel-heading').css('pointer-events','auto');
	    $('#beneficiaries-form-2 .nameRelWarning').hide();
	}
	else {
	    $('#beneficiaries-form-2 .panel-heading').css('pointer-events','none');
		$('#beneficiaries-form-2 .nameRelWarning').show();
	}
});

$('body').on('change','#beneficiaries-form-3 #ben-age, #beneficiaries-form-3 #ben-name, #beneficiaries-form-3 #ben-rel',function(){
	//$('.calculateBeneficiaryTax').trigger('click');
	calcBeneficiaryTax();
	if($('#beneficiaries-form-3 #ben-age').val() != '' && $('#beneficiaries-form-3 #ben-name').val() != '' && $('#beneficiaries-form-3 #ben-rel option:selected').val() != 'Group 0') {
		$('#beneficiaries-form-3 .panel-heading').css('pointer-events','auto');
	    $('#beneficiaries-form-3 .nameRelWarning').hide();
	}
	else {
	    $('#beneficiaries-form-3 .panel-heading').css('pointer-events','none');
		$('#beneficiaries-form-3 .nameRelWarning').show();
	}
});

$('body').on('change','#beneficiaries-form-4 #ben-age, #beneficiaries-form-4 #ben-name, #beneficiaries-form-4 #ben-rel',function(){
	//$('.calculateBeneficiaryTax').trigger('click');
	calcBeneficiaryTax();
	if($('#beneficiaries-form-4 #ben-age').val() != '' && $('#beneficiaries-form-4 #ben-name').val() != '' && $('#beneficiaries-form-4 #ben-rel option:selected').val() != 'Group 0') {
		$('#beneficiaries-form-4 .panel-heading').css('pointer-events','auto');
	    $('#beneficiaries-form-4 .nameRelWarning').hide();
	}
	else {
	    $('#beneficiaries-form-4 .panel-heading').css('pointer-events','none');
		$('#beneficiaries-form-4 .nameRelWarning').show();
	}
});





//real time validation
$("#name").change(function () {
	if($('#name').val() === '') {
		$('#name-error').fadeIn();
	} else {
		$('#name-error').fadeOut();
	}
}
);

$("#age").change(function () {
	if($('#age').val() === '') {
		$('#age-error').fadeIn();
	} else {
		$('#age-error').fadeOut();
	}
}
);

$("#age-2").change(function () {
	if($('#age-2').val() === '') {
		$('#age-2-error').fadeIn();
	} else {
		$('#age-2-error').fadeOut();
	}
}
);

$("#name-2").change(function () {
	if($('#name-2').val() === '') {
		$('#married-section').fadeOut();
	} else {
		$('#married-section').fadeIn();
	}
}
);

$('input[type=radio][name=radio-married]').on('change',function () {
	if($(this).val() === 'N') {
		$('#married-error').fadeIn();
	} else {
		$('#married-error').fadeOut();
	}
}
);
    //
	$( ".estateQ" ).change(function() {

		var changedElement = $( this ).attr('id');
		var beforeValue = $('#'+changedElement+'Before').val();
		var newValue = $(this).val();

		//value has been reduced
		if (newValue < beforeValue)
		{
			//do any beneficiaries have this
			//remove if they do
			//reset calc if they do
			var classes = $(this).attr('class').split(' ');
				for (i=1;i<=4;i++) {
					var isInherited = false;
					for(var j=0; j<classes.length && !isInherited; j++){
						if (classes[j] == 'form-control' || classes[j] == 'estateQ')
						{

						}
						else
						if ($('#beneficiary-'+i+' .inher'+classes[j]).html() != undefined && $('#beneficiary-'+i+' .inher'+classes[j]).html() != '') {
							$('#beneficiary-'+i+' .inher'+classes[j]).html('');
							isInherited = true;
						}
					}
					if (isInherited) {
						$('#beneficiary-'+i+' .inheritanceVal').html('Edit to re-calc');
						$('#beneficiary-'+i+' .taxableInheritance').html('~');
						$('#beneficiary-'+i+' .taxLiability').html('~');
						$('#totalTaxLiability').html($('#beneficiaries-form-'+form+' #ben-tax-lib').val());
					}
				}
		}
		$('#'+changedElement+'Before').val(newValue);
		totalEstate=0;
		$( ".estateQ" ).each(function( index ) {
			if (isNaN($( this ).val()))
			{
				$('#validation-message-text').html("Enter numbers only, no currencies or commas");
				$( this ).focus();
			}
			else
			{
				totalEstate = totalEstate + Number($( this ).val());
				$('#totalAssetsValue').html('€'+numberWithCommas(totalEstate));
				$('#totalEstateVal').html('€'+numberWithCommas(totalEstate));
			}
		});
	});

    //calculate the total beneficiary assets
	$( 'body').on('change','.beneficiary-assets-input',function() {
		beneficiaryAssets=0;
		var benAssetsTotal = $('#beneficiaries-form-'+form+' #ben-assets-total');
		$( ".beneficiary-assets-input" ).each(function( index ) {
			beneficiaryAssets = beneficiaryAssets + Number($( this ).val());
			benAssetsTotal.val('€'+numberWithCommas(beneficiaryAssets));
		});
    });

	//calculate total value of assets being inherited
	$('body').on('change',".assetsBeingInherited",function() {

	totalBeingInherited=0;
	$( ".assetsBeingInherited" ).each(function( index ) {
		totalBeingInherited = totalBeingInherited + Number($( this ).val());
		$('#beneficiaries-form-'+form+' #ben-inheritance').val('€'+numberWithCommas(totalBeingInherited));
	});

	    valid = true;

	    valid = valid && checkAmountEntered('#family-home','.inherHome','#beneficiaries-form-'+form+' #ben-residence','Family Home/Main Residence');
		valid = valid && checkAmountEntered(' #other-prop','.inherOtherProperty','#beneficiaries-form-'+form+' #ben-other-property','Total Other Properties & Residences');
		valid = valid && checkAmountEntered('#savings-investments','.inherInvestments','#beneficiaries-form-'+form+' #ben-total-savings','Total Savings and Investments');
		valid = valid && checkAmountEntered(' #personal-prop','.inherPersonalProperty','#beneficiaries-form-'+form+' #ben-personal-property','Total Personal Property');
		valid = valid && checkAmountEntered('#personal-life','.inherLifeInsurance','#beneficiaries-form-'+form+' #ben-personal-life','Personal Life Insurance');
		valid = valid && checkAmountEntered('#pre-retire','.inherPreRetirePen','#beneficiaries-form-'+form+' #ben-pension-benefits','Pre-Retirement - Total Payment on Death');
		valid = valid && checkAmountEntered('#post-retire','.inherPostRetirePen','#beneficiaries-form-'+form+' #ben-pensions-amrf','Post-Retirement - AMRF, ARF, Vested PRSA');
		valid = valid && checkAmountEntered('#business-assets','.inherBusinessAssets','#beneficiaries-form-'+form+' #ben-bus-total','Total Value of Business Assets');
		valid = valid && checkAmountEntered('#farm-assets','.inherFarmAssets','#beneficiaries-form-'+form+' #ben-farm-total','Total Value of Farm Assets');

    });

	//relationship to ben
	$('body').on('change',"#ben-rel",function() {
	$('#beneficiaries-form-'+form+' #ben-threshold').val($('#beneficiaries-form-'+form+' #ben-rel').val());

	if (Number($('#post-retire').val()) > 0)
	{
		$('#inheritSeven').show();
	}
	else
	{
		$('#inheritSeven').hide();
	}

   });


	$('body').on('change',".impactsBeneficiaryTaxCal",function() {
	  //$('.calculateBeneficiaryTax').trigger('click');
	  willFullThresholdApply($('#beneficiaries-form-'+form+' #ben-threshold').val(),
		$('#beneficiaries-form-'+form+' #prevGiftsOne').val(),
		$('#beneficiaries-form-'+form+' #prevGiftsTwo').val(),
		$('#beneficiaries-form-'+form+' #prevGiftsThree').val());
	  calcBeneficiaryTax();
	});

	$( 'body').on('change',".impactFarmReliefInput",function() {
		updateFarmRelief();
		//$('.calculateBeneficiaryTax').trigger('click');
		calcBeneficiaryTax();
	});

	//determine wether or not home relief is applicable
	$("body").on('change','.fhrQ, #ben-property, #ben-other-property',function() {

		var homeRelQ1 = $('#beneficiaries-form-'+form+' #family-relief-form input[name=radio-q-1]:checked').val();
		var homeRelQ2 = $('#beneficiaries-form-'+form+' #family-relief-form input[name=radio-q-2]:checked').val();
		var homeRelQ3 = $('#beneficiaries-form-'+form+' #family-relief-form input[name=radio-q-3]:checked').val();
		var homeRelQ4 = $('#beneficiaries-form-'+form+' #family-relief-form input[name=radio-q-4]:checked').val();
		var homeRelQ5 = $('#beneficiaries-form-'+form+' #family-relief-form input[name=radio-q-5]:checked').val();
		var homeRelQ6 = $('#beneficiaries-form-'+form+' #family-relief-form input[name=radio-q-6]:checked').val();
		var benProperty = $('#beneficiaries-form-'+form+' #ben-property').val();
		var benOtherProp = $('#beneficiaries-form-'+form+' #ben-other-property').val();

		$('#beneficiaries-form-'+form+' #ben-home-relief').val(isFamilyHomeRelief(homeRelQ1,homeRelQ2,homeRelQ3,homeRelQ4,homeRelQ5,homeRelQ6,(Number(benProperty) + Number(benOtherProp))));
		//$('.calculateBeneficiaryTax').trigger('click');
		calcBeneficiaryTax();

     });

	 //determine wether or not business relief is applicable
	 $( 'body').on('change',".busQ",function() {

		var busRelQ1 = $('#beneficiaries-form-'+form+' #business-relief-form input[name=radio-q-7]:checked').val();
		var busRelQ2 = $('#beneficiaries-form-'+form+' #business-relief-form input[name=radio-q-8]:checked').val();
		var busRelQ3 = $('#beneficiaries-form-'+form+' #business-relief-form input[name=radio-q-9]:checked').val();
		var busRelQ4 = $('#beneficiaries-form-'+form+' #business-relief-form input[name=radio-q-10]:checked').val();
		var busRelQ5 = $('#beneficiaries-form-'+form+' #business-relief-form input[name=radio-q-11]:checked').val();

		$('#beneficiaries-form-'+form+' #ben-bus-relief').val(isBusinessRelief(busRelQ1,busRelQ2,busRelQ3,busRelQ4,busRelQ5));
		//$('.calculateBeneficiaryTax').trigger('click');
		calcBeneficiaryTax();

     });

	 //determine wether or not farm relief is applicable
	 $( 'body' ).on('change',".farmQ",function() {

		updateFarmRelief();
		//$('.calculateBeneficiaryTax').trigger('click');
		calcBeneficiaryTax();

	});

	//determine wether or not full threshold applies$( ".prevGifts" ).change(function() {
	$( 'body').on('change',".prevGifts",function() {
		/* willFullThresholdApply($('#beneficiaries-form-'+form+' #ben-threshold').val(),
		$('#beneficiaries-form-'+form+' #prevGiftsOne').val(),
		$('#beneficiaries-form-'+form+' #prevGiftsTwo').val(),
		$('#beneficiaries-form-'+form+' #prevGiftsThree').val()); */
	});

//////////click events

//print report
$('.print').click(function() {
	printReport();
});

//save pdf
$('.download').click(function() {
	//pdf stuff here
});


//save pdf of report (mobile only)


$('#pdf-mobile').click(function () {
  showPrint();
  var doc = new jsPDF();
	var specialElementHandlers = {
		'#editor': function (element, renderer) {
			return true;
		}
	};

		doc.fromHTML($('#the-print-report').html(), 15, 15, {
			'width': 170,
				'elementHandlers': specialElementHandlers
		});
		doc.save('sample-file.pdf');
});



	//get started
	$("#get-started").click(function() {
		$('#start-screen').fadeOut()
		$('#personal-info').fadeIn();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');
	});
	//go back from personal info
	$("#info-back").click(function() {
		$('#personal-info').fadeOut()
		$('#start-screen').fadeIn();

	});
	//go next from personal info
	$("#info-next").click(function() {
		step1Valid();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');

	});
	//go back from estate value
	$("#estate-back").click(function() {
		$('#estate-value').fadeOut()
		$('#personal-info').fadeIn();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');

	});
	//go next from estate value
	$("#estate-next").click(function() {
		step2Valid();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');

	});
	//go back from beneficiaries
	$("#beneficiaries-back").click(function() {
		$('#beneficiaries').fadeOut()
		$('#estate-value').fadeIn();
		$('#add-beneficiary').fadeIn();
		clearBeneficiaries();
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');
	});

	//print the report
	$('#beneficiaries-next').click(function() {
		step3Valid();
	});

	//back from report
	$('#report-back').click(function() {
		$('#the-print-report').fadeOut();
		$('#beneficiaries').fadeIn();
		$('#spinner').show();
	});

	//clear beneficiaries
	$('#clear-beneficiaries').click(function(){
		clearBeneficiaries();
	});


	//add beneficiary
	$("#add-beneficiary").click(function() {
		$('html,body').animate({
        scrollTop: $("#beneficiary-heading").offset().top},
        'slow');

		$('#ben-error').fadeOut();
		var numBens = $('.saved-beneficiary').length;

		if (numBens == 4)
		{
			alert('Only 4 beneficiaries are allowed, please clear and start again');
		}
		else {
		form++;
		addingNewUser=true;

		$('.saved-beneficiary').fadeOut();

			setupAccordion(form);
			console.log("set up accordion");
			hideBeneficiaryInputs();
			updateReportTotals();

			updateAvailableAmounts('#family-home','.inherHome','#beneficiaries-form-'+form+' #inheritOne .reportFamilyHome');
			updateAvailableAmounts('#other-prop','.inherOtherProperty','#beneficiaries-form-'+form+' #inheritTwo .reportOtherProperty');
			updateAvailableAmounts('#savings-investments','.inherInvestments','#beneficiaries-form-'+form+' #inheritThree .reportInvestments');
			updateAvailableAmounts('#personal-prop','.inherPersonalProperty','#beneficiaries-form-'+form+' #inheritFour .reportPersonal');
			updateAvailableAmounts('#personal-life','.inherLifeInsurance','#beneficiaries-form-'+form+' #inheritFive .reportLifeInsurance');
			updateAvailableAmounts('#pre-retire','.inherPreRetirePen','#beneficiaries-form-'+form+' #inheritSix .reportPensionsPre');
			updateAvailableAmounts('#post-retire','.inherPostRetirePen','#beneficiaries-form-'+form+' #inheritSeven .reportPensionsPost');
			updateAvailableAmounts('#business-assets','.inherBusinessAssets','#beneficiaries-form-'+form+' #inheritEight .reportBusiness');
			updateAvailableAmounts('#farm-assets','.inherFarmAssets','#beneficiaries-form-'+form+' #inheritNine .reportFarm');

			///////////////////////

        $('#add-beneficiary').fadeOut();
        $('.buttons').fadeOut();

		}

	});

	//reset amounts inherited when editing
	$('body').on('click','#resetBtn',function() {
		$('#beneficiaries-form-'+form+' .assetsBeingInherited').val(0);
		$('#beneficiaries-form-'+form+' #ben-inheritance').val(0);
			resetInheritance('#family-home','.inherHome','#beneficiaries-form-'+form+' #inheritOne .reportFamilyHome');
			resetInheritance('#other-prop','.inherOtherProperty','#beneficiaries-form-'+form+' #inheritTwo .reportOtherProperty');
			resetInheritance('#savings-investments','.inherInvestments','#beneficiaries-form-'+form+' #inheritThree .reportInvestments');
			resetInheritance('#personal-prop','.inherPersonalProperty','#beneficiaries-form-'+form+' #inheritFour .reportPersonal');
			resetInheritance('#personal-life','.inherLifeInsurance','#beneficiaries-form-'+form+' #inheritFive .reportLifeInsurance');
			resetInheritance('#pre-retire','.inherPreRetirePen','#beneficiaries-form-'+form+' #inheritSix .reportPensionsPre');
			resetInheritance('#post-retire','.inherPostRetirePen','#beneficiaries-form-'+form+' #inheritSeven .reportPensionsPost');
			resetInheritance('#business-assets','.inherBusinessAssets','#beneficiaries-form-'+form+' #inheritEight .reportBusiness');
			resetInheritance('#farm-assets','.inherFarmAssets','#beneficiaries-form-'+form+' #inheritNine .reportFarm');
		});



	//edit a beneficiary
	$('body').on('click','.edit-user',function() {

		//console.log('editing');
		$('.saved-beneficiary').fadeOut()
		hideBeneficiaryInputs();
		addingNewUser=false;
		form = $(this).attr('id').split('-')[2];

		//$('beneficiaries-form-'+form+'').fadeIn();
		$('#whichPersonEdit').html(form);

		//setupAccordion(form);
		$('#add-beneficiary-section, .buttons').fadeOut();
		$('#beneficiaries-form-'+form+'').fadeIn();
		//$('#beneficiaries-form-'+form+' #resetBtn').fadeIn();
		updateReportTotals();
		//get the id of the person to edit so that the form can be populated with the values
		//setupAccordion();
		//dialog.dialog( "open" );

		//populate all the values
		$('#beneficiaries-form-'+form+' #ben-name').val($('#beneficiary-'+form+' .name').text());
		console.log($('#beneficiary-'+form+' .name').text());
		$('#beneficiaries-form-'+form+' #ben-age').val($('#beneficiary-'+form+' .age').text());
		$('#beneficiaries-form-'+form+' #ben-rel option').filter(function() {
			return ($(this).text() == $('#beneficiary-'+form+' .relation').text()); //To select Blue
			}).prop('selected', true);


		for (i=1; i <=6;i++)
		{
			$('#beneficiaries-form-'+form+' input[name="radio-q-'+i+'"][value="'+$('#beneficiary-'+form+' .fhrQ'+i).text()+'"]').prop('checked', true);
		}
		for (i=7; i <=11;i++)
		{
			$('#beneficiaries-form-'+form+' input[name="radio-q-'+i+'"][value="'+$('#beneficiary-'+form+' .busQ'+i).text()+'"]').prop('checked', true);

		}

		for (i=12; i <=16;i++)
	    {
			$('#beneficiaries-form-'+form+' input[name="radio-q-'+i+'"][value="'+$('#beneficiary-'+form+' .farmQ'+i).text()+'"]').prop('checked', true);
		}

		$('#beneficiaries-form-'+form+' #ben-property').val($('#beneficiary-'+form+' .curPropAssets').html());
		//console.log($('#beneficiary-'+form+' .curPropAssets').html());
		$('#beneficiaries-form-'+form+' #ben-business').val($('#beneficiary-'+form+' .curBusAssets').html());
		//console.log($('#beneficiary-'+form+' .curBusAssets').html());
		$('#beneficiaries-form-'+form+' ben-farm').val($('#beneficiary-'+form+' .curFarmAssets').html());
		//console.log($('#beneficiary-'+form+' .curFarmAssets').html());
		$('#beneficiaries-form-'+form+' #prevGiftsOne').val($('#beneficiary-'+form+' .gifts1').html());
		//console.log($('#beneficiary-'+form+' .gifts1').html());
		$('#beneficiaries-form-'+form+' #prevGiftsTwo').val($('#beneficiary-'+form+' .gifts2').html());
		//console.log($('#beneficiary-'+form+' .gifts2').html());
		$('#beneficiaries-form-'+form+' #prevGiftsThree').val($('#beneficiary-'+form+' .gifts3').html());
		//console.log($('#beneficiary-'+form+' .gifts3').html());
		$('#beneficiaries-form-'+form+' #ben-residence').val($('#beneficiary-'+form+' .inherHome').html());
		$('#beneficiaries-form-'+form+' #ben-other-property').val($('#beneficiary-'+form+' .inherOtherProperty').html());
		$('#beneficiaries-form-'+form+' #ben-total-savings').val($('#beneficiary-'+form+' .inherInvestments').html());
		$('#beneficiaries-form-'+form+' #ben-personal-property').val($('#beneficiary-'+form+' .inherPersonalProperty').html());
		$('#beneficiaries-form-'+form+' #ben-personal-life').val($('#beneficiary-'+form+' .inherLifeInsurance').html());
		$('#beneficiaries-form-'+form+' #ben-pension-benefits').val($('#beneficiary-'+form+' .inherPreRetirePen').html());
		////console.log($('#beneficiary-'+form+' .inherPostRetirePen').html());
		$('#beneficiaries-form-'+form+' #ben-pensions-amrf').val($('#beneficiary-'+form+' .inherPostRetirePen').html());
		$('#beneficiaries-form-'+form+' #ben-bus-total').val($('#beneficiary-'+form+' .inherBusinessAssets').html());
		$('#beneficiaries-form-'+form+' #ben-farm-total').val($('#beneficiary-'+form+' .inherFarmAssets').html());
		$('#beneficiaries-form-'+form+' #ben-assets-total').val($('#beneficiary-'+form+' .totalAssets').html());
		$('#beneficiaries-form-'+form+' #ben-inheritance').val($('#beneficiary-'+form+' .totalInheritance').html())
		$('#beneficiaries-form-'+form+' #ben-home-relief').val($('#beneficiary-'+form+' .doesHomeRelief').html());
		$('#beneficiaries-form-'+form+' #ben-bus-relief').val($('#beneficiary-'+form+' .doesBusinesssRelief').html());
		$('#beneficiaries-form-'+form+' #ben-farm-relief').val($('#beneficiary-'+form+' .doesFarmRelief').html());
		$('#beneficiaries-form-'+form+' #ben-threshold').val($('#beneficiary-'+form+' .whatThreshold').html());
		$('#beneficiaries-form-'+form+' #ben-full-thresh').val($('#beneficiary-'+form+' .willFullThresh').html());
		$('#beneficiaries-form-'+form+' #ben-tax-val').val($('#beneficiary-'+form+' .taxValInheritance').html());
		$('#beneficiaries-form-'+form+' #ben-tax-lib').val($('#beneficiary-'+form+' .taxLiability').html());


		    updateAvailableAmounts('#family-home','.inherHome','#beneficiaries-form-'+form+' #inheritOne .reportFamilyHome');
			updateAvailableAmounts('#other-prop','.inherOtherProperty','#beneficiaries-form-'+form+' #inheritTwo .reportOtherProperty');
			updateAvailableAmounts('#savings-investments','.inherInvestments','#beneficiaries-form-'+form+' #inheritThree .reportInvestments');
			updateAvailableAmounts('#personal-prop','.inherPersonalProperty','#beneficiaries-form-'+form+' #inheritFour .reportPersonal');
			updateAvailableAmounts('#personal-life','.inherLifeInsurance','#beneficiaries-form-'+form+' #inheritFive .reportLifeInsurance');
			updateAvailableAmounts('#pre-retire','.inherPreRetirePen','#beneficiaries-form-'+form+' #inheritSix .reportPensionsPre');
			updateAvailableAmounts('#post-retire','.inherPostRetirePen','#beneficiaries-form-'+form+' #inheritSeven .reportPensionsPost');
			updateAvailableAmounts('#business-assets','.inherBusinessAssets','#beneficiaries-form-'+form+' #inheritEight .reportBusiness');
			updateAvailableAmounts('#farm-assets','.inherFarmAssets','#beneficiaries-form-'+form+' #inheritNine .reportFarm');



    });

	//close the beneficiary form
	$("body").on('click','.close-ben',function() {
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');
		var id = $(this).attr('id').split('-')[2];
		if(addingNewUser) {
		$('#beneficiaries-form-'+id+'').remove();
		$('#add-beneficiary-section, .saved-beneficiary, #add-beneficiary, .buttons').fadeIn();
		form--;
		}
		else {
		$('#beneficiaries-form-'+id+'').fadeOut();
		$('#add-beneficiary-section, .saved-beneficiary, #add-beneficiary, .buttons').fadeIn();
		}

	});

	//close the beneficiary form
	$("body").on('click','.delete-user',function() {
		var id = $(this).attr('id').split('-')[2];
		var newTaxLib = Number($('#totalTaxLiability').html().replace(/\,/g,'')) - numberWithCommas($('#beneficiary-'+id+' .taxLiabilityCalc').html());
		////console.log(newTaxLib);
		$('#totalTaxLiability').html(newTaxLib);
		$('#beneficiary-'+id+'').remove();
		$('#beneficiaries-form-'+id+'').remove();

		form--;

	});

	//save a beneficiary
	$('body').on('click',".save-beneficiaries",function() {
		$('html,body').animate({
        scrollTop: $("#page-title").offset().top},
        'slow');

		var benNumber = form;
		var benName = $('#beneficiaries-form-'+benNumber+' #ben-name').val();
        var benAge = $('#beneficiaries-form-'+benNumber+' #ben-age').val();
		var reliefs = "Family - "+$('#beneficiaries-form-'+benNumber+' #ben-home-relief').val() + " <br/> Business - " + $('#beneficiaries-form-'+benNumber+' #ben-bus-relief').val() + " <br/> Farm -  " + $('#beneficiaries-form-'+benNumber+' #ben-farm-relief').val();
		var currentAssets = Number($('#beneficiaries-form-'+benNumber+' #ben-property').val()) + Number($('#beneficiaries-form-'+benNumber+' #ben-business').val())+ Number($('#beneficiaries-form-'+benNumber+' #ben-farm').val());
		var willFullThresh = $('#beneficiaries-form-'+benNumber+' #ben-full-thresh').val();
		var totalAssetsInherited = $('#beneficiaries-form-'+benNumber+' #ben-inheritance').val();
		var taxVal = $('#beneficiaries-form-'+benNumber+' #ben-tax-val').val();
		var taxLiability = $('#beneficiaries-form-'+benNumber+' #ben-tax-lib').val();
		var newOrEdit = addingNewUser;

		if(!newOrEdit) {
		$('#beneficiary-'+benNumber+'').remove();
		}

		updateFarmRelief();
		saveBeneficiary(benNumber,benName,benAge,reliefs,currentAssets,willFullThresh,totalAssetsInherited,taxVal,taxLiability,newOrEdit);
		//console.log(saveBeneficiary(benNumber,benName,benAge,reliefs,currentAssets,willFullThresh,totalAssetsInherited,taxVal,taxLiability,newOrEdit));
        $('#beneficiaries-form-'+benNumber+' .assetsBeingInherited').attr('disabled', 'disabled');
		$('#beneficiaries-form-'+benNumber+' .assetsBeingInherited').css('background-color', '#8080803b!important');


		//add the relief results to the saved beneficiary
		if(familyRelief) {
		$('#beneficiary-'+benNumber+' #familyReliefResult').html('Yes');
		}
		else {
			$('#beneficiary-'+benNumber+' #familyReliefResult').html('No');
		}

		if(businessRelief) {
		$('#beneficiary-'+benNumber+' #businessReliefResult').html('Yes');
		}
		else {
			$('#beneficiary-'+benNumber+' #businessReliefResult').html('No');
		}

		if(farmRelief) {
		$('#beneficiary-'+benNumber+' #farmReliefResult').html('Yes');
		}
		else {
			$('#beneficiary-'+benNumber+' #farmReliefResult').html('No');
		}


	});

	//calculate totals and inheritance for this beneficiary
	 //$('body').on('click',".calculateBeneficiaryTax",function() {
function calcBeneficiaryTax() {

		var totalAssets = Number($('#beneficiaries-form-'+form+' #ben-property').val()) + Number($('#beneficiaries-form-'+form+' #ben-business').val()) + Number($('#beneficiaries-form-'+form+' #ben-farm').val());
		var totalBeingInherited=0;
		$( ".assetsBeingInherited" ).each(function( index ) {
			totalBeingInherited = totalBeingInherited + Number($( this ).val());
		});
		var thresholdAppliesValue = getGroupThreshold($('#beneficiaries-form-'+form+' #ben-threshold').val());
		$('#beneficiaries-form-'+form+' #ben-tax-val').val(calculateTaxableInheritance(
			$('#beneficiaries-form-'+form+' #ben-age').val(),//1
			totalBeingInherited,//2
			$('#beneficiaries-form-'+form+' #ben-home-relief').val(),//3
			$('#beneficiaries-form-'+form+' #ben-residence').val(),//4
			$('#beneficiaries-form-'+form+' #ben-bus-relief').val(),//5
			$('#beneficiaries-form-'+form+' #ben-bus-total').val(),//6
			$('#beneficiaries-form-'+form+' #ben-farm-relief').val(),//7
			$('#beneficiaries-form-'+form+' #ben-farm-total').val(),//8
			$('#beneficiaries-form-'+form+' #ben-full-thresh').val(),//9
			$('#beneficiaries-form-'+form+' #ben-threshold').val(),//10
			thresholdAppliesValue,//11
			$('#beneficiaries-form-'+form+' #ben-pensions-amrf').val(),//12
			$('#beneficiaries-form-'+form+' #prevGiftsOne').val(),//13
			$('#beneficiaries-form-'+form+' #prevGiftsTwo').val(),//14
			$('#beneficiaries-form-'+form+' #prevGiftsThree').val()//15
		));

		$('#beneficiaries-form-'+form+' #ben-tax-lib').val(
		calculateTaxLiability(
		$('#beneficiaries-form-'+form+' #ben-age').val(),
		$('#beneficiaries-form-'+form+' #ben-tax-val').val(),
		$('#beneficiaries-form-'+form+' #ben-pensions-amrf').val(),
		$('#beneficiaries-form-'+form+' #ben-threshold').val() == 'Group 1'
		));


        };


/////////// misc events

 });

 function clearBeneficiaries() {
	 $('.saved-beneficiary, .beneficiaries-form').remove();
	 	$("#showPrint").attr("disabled", true);
		////console.log(newTaxLib);
		totalTaxLiability = 0;
		form ='';
		$('#totalTaxLiability').html(totalTaxLiability);
 }



//////////////////////////////////// REPORT STUFF ////////////////////////////////////////////////////


function showPrint() {
//var savedBenDetails = $('.saved-beneficiary').attr('id');
//alert (savedBenDetails);
//$('#beneficiaries').hide();
$('.estate-value-liability-box').hide();
//$('.beneficiary-heading').hide();
$(".progressBar").css({display: "none"});
$("#add-beneficiary-section").css({display: "none"});
$("#beneficiary-heading").css({display: "none"});
$('#showPrint').hide();
$('#section-footer').hide();
$('#zone-footer-wrapper').hide();
$('#zone-branding-wrapper').hide();
$('#the-accordion').hide();
$('#report-back').hide();


$('#beneficiaries-back').hide();
$('#the-print-report').fadeIn();
//$('#show-ben-details').html($('.saved-beneficiary').val());
$('#show-ben-details').append($('.saved-beneficiary'));
$("#spinner").delay(2000).fadeOut("slow");
$('#report').delay(2500).fadeIn(400);
$('#showInputs').show();
populateReport();

}

function printReport() {
	window.print();
}

function showInputs() {

$('#estate-planner').show();
$('#the-print-report').hide();

$('#showInputs').hide();
$('#showPrint').show();

}

	$('#showPrint').click(function(){
		// Check if it's safe to generate the report
		if($("#showPrint").attr("disabled")) {
			alert("Please ensure to save a beneficiary before generating the report. Up to 4 beneficiaries can be added");
		}
		else {
			$(document).attr("title", "Estate Planning Pathfinder");
			showPrint();
			setupAccordion(form);
			console.log(setupAccordion(form));
		}
	});

	$('#showInputs').click(function(){
		showInputs();
	});

function populateReport()
{
var appendices=['II','III','IV'];
var appendixIndex=0;

if (Number($('#family-home').val()) > 0)
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

if (Number($('#ben-bus-total').val()) > 0)
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

if (Number($('#ben-farm-total').val()) > 0)
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

var addresses = $('#address').val();
$('.reportAddress').html($('#address').val());



var names = $('#name').val();
$('.reportNames1').html($('#name').val());
$('.reportNames2').html($('#name-2').val());
$('.ben-name').html($('#ben-name-1').val())

$('.reportAgeNB1').html(Number($('#age').val())+1);
$('.reportAgeNB2').html(Number($('#age-2').val())+1);
$('.reportLife2').css('display','none');
$('.twoLives').css('display','none');
$('.oneLife').css('display','inline');

if ($('#name-2').val() != '')
{
	names = names + " and " + $('#name-2').val();
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
var locale = "en-us";
var month = d.toLocaleString(locale, { month: "long" });
$('#today').html(month + d.toDateString().substring(7));

updateReportTotals();



//populate the inheritance table but remove all rows first
$("#reportBeneficiariesTable tbody").html("");

$(".saved-beneficiary").each(function() {
		$( "#reportBeneficiariesTable tbody" ).append( "<tr style=\"height:30px\">" +
		"<td>"+$(this).find(".name").html()+"</td>" +
		//"<td>"+$(this).find(".age").html()+"</td>" +
		"<td>"+$(this).find(".relation").html()+"</td>" +
		"<td>"+$(this).find(".inheritanceVal").html()+"</td>" +
		"<td>"+$(this).find(".taxableInheritance").html()+"</td>" +
		//"<td>€"+$(this).find(".inherPostRetirePen").html()+"</td>" +
		"<td>€"+$(this).find(".taxLiability").html()+"</td>");



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
		console.log(totalTaxLiability);
		var taxable = Number($(this).find("#taxableInheritance").html());//.replace(/,/g,''));
		////console.log(taxable);
		totalTaxable += taxable;

		if (Number($('#family-home').val()) > 0 ||
		    Number($('#farm-assets').val()) > 0 ||
			Number($('#business-assets').val()) > 0)
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

var numbers = document.querySelectorAll(".num");
var total = 1;

for (var i = 0; i < numbers.length; i++)
{
    total*= Number(numbers[i].innerText);
}



//document.getElementById("result").innerText ="\u20AC" + total;

$( "#reportBeneficiariesTable tbody" ).append("<tr style=\"border-top: 1px solid #000;margin-top: 12px;height: 40px;\"><td colspan=\"2\"></td><td>€" +
numberWithCommas(totalInheritances)+"</td><td>€" +
numberWithCommas(totalTaxable)+"</td><td>€" +
numberWithCommas(totalTaxLiability)+ "</td></tr>");


 $('.reportGifts').html(reportGifts);
 $('.reportFamilyHomeRelief').html(familyHomeRelief);
  $('.reportExistingCover').html();
 $('.reportTotalTaxLiability').html($('#totalTaxLiability').html());

$('.reportARFs').html(arfLiability);
$('.reportArfsTotal').css('display',hasArf?'block':'none');

$('.name-1').html(name);

}

})(jQuery);;
