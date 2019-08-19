(function($) {
	//console.log('loading');
	// pull the account ID from the URL
	var brokerID = decodeURIComponent(window.location.hash.substring(1));
	var retrievedCampaign='';//get the account information 
	var codes='';
	
	// all the things we need to know about an account
	function getAccountInfo(id){
		var cols = ["name","ownerid","ilp_companylogo","address1_line2","address1_line3","address1_line1","ilp_county","ilp_thisyeargrandtotalytdape","ilp_brokermasterreference","accountid","ilp_warning","ilp_warningdetails","ilp_thisyeargrandtotalytdmargin","ilp_lastyeargrandtotalytdmargin","ilp_lastyeargrandtotalytdape","ilp_thisyearprotectionytdape","ilp_thisyearprotectionytdmargin","ilp_thisyearpensionapytdape","ilp_thisyearpensionapytdmargin","ilp_thisyearpensionspytdape","ilp_lastyearprotectionytdape","ilp_lastyearprotectiontotalape","ilp_lastyearprotectionytdmargin","ilp_lastyearprotectiontotalmargin","ilp_lastyearpensionapytdape","ilp_lastyearpensionaptotalape","ilp_lastyearpensionapytdmargin","ilp_lastyearpensionaptotalmargin","ilp_lastyearpensionspytdape","ilp_lastyearpensionsptotalape","ilp_thisyearpensionspytdmargin","ilp_lastyearpensionspytdmargin","ilp_lastyearpensionsptotalmargin","ilp_thisyearbondsytdape","ilp_lastyearbondsytdape","ilp_lastyearbondstotalape","ilp_thisyearbondsytdmargin","ilp_lastyearbondsytdmargin","ilp_lastyearbondstotalmargin","ilp_thisyearsavingsytdape","ilp_lastyearsavingsytdape","ilp_lastyearsavingstotalape","ilp_thisyearsavingsytdmargin","ilp_lastyearsavingsytdmargin","ilp_lastyearsavingstotalmargin","ilp_thisyearcorporatebusinessytdape","ilp_lastyearcorporatebusinessytdape","ilp_lastyearcorporatebusinesstotalape","ilp_thisyearcorporatebusinessytdmargin","ilp_lastyearcorporatebusinessytdmargin","ilp_lastyearcorporatebusinesstotalmargin","ilp_twitter","ilp_facebook","ilp_linkedin","websiteurl","ilp_brokertype","ilp_favouredspshape","ilp_gearedforgrowth","ilp_estimatedsizeofwalletape","ilp_protectioninterest","ilp_pensionsinterest","ilp_investmentinterest","ilp_mapsinterest","ilp_complianceinterest","ilp_socialmediainterest","ilp_f4fsegment","ilp_3yp","ilp_potentialscore","ilp_paretoprinciple","ilp_bcgclassification","ilp_pgsbclassification","ilp_volumenumberofcases","ilp_lastyearvolumenumberofcases","ilp_pensionsscore","ilp_investmentsscore","ilp_emailscore","ilp_calculatorsscore","ilp_researchscore","ilp_sifscore","ilp_protectionscore","ilp_compliancescore","ilp_webinarscore","ilp_newsscore","ilp_mapsscore","ilp_otherscore","ilp_campaignbscore","ilp_campaigndscore","ilp_digitalactivityscore","ilp_brokersegment"];
		var retrievedAccount = XrmServiceToolkit.Soap.Retrieve("account", id, cols);
		//console.log('\n Getaccountinfo: '+JSON.stringify(retrievedAccount)+'\n\n');
		return retrievedAccount;
		
	}	// all the things we need to know about an account
	function getTaskInfo(id){
		var cols = ["subject","description","ilp_callrating","statecode"];
		var retrievedAccount = XrmServiceToolkit.Soap.Retrieve("phonecall", id, cols);
		//console.log('\n Task Information: '+JSON.stringify(retrievedAccount)+'\n\n');
		return retrievedAccount;
		
	}

	if(brokerID.length >=10){
		retrievedCampaign = getAccountInfo(brokerID);
		
		// All the fields for the broker landing page
		var name = (retrievedCampaign.attributes["name"]) ? retrievedCampaign.attributes["name"].value : "";
		var ownerid = (retrievedCampaign.attributes["ownerid"]) ? retrievedCampaign.attributes["ownerid"].name : "";
		var segment = (retrievedCampaign.attributes["ilp_brokersegment"]) ? retrievedCampaign.attributes["ilp_brokersegment"].formattedValue : "";
		var pareto = (retrievedCampaign.attributes["ilp_paretoprinciple"]) ? retrievedCampaign.attributes["ilp_paretoprinciple"].formattedValue : "";
		var owneridcode = (retrievedCampaign.attributes["ownerid"]) ? retrievedCampaign.attributes["ownerid"].id : "";
		// $('.account-display').data('owneridcode',owneridcode);
		//alert('owneridcode'+);
		var masterCode = (retrievedCampaign.attributes["ilp_brokermasterreference"]) ? retrievedCampaign.attributes["ilp_brokermasterreference"].value : "";
		var brokertype = (retrievedCampaign.attributes["ilp_brokertype"]) ? retrievedCampaign.attributes["ilp_brokertype"].formattedValue : "";
		var favouredspshape = (retrievedCampaign.attributes["ilp_favouredspshape"]) ? retrievedCampaign.attributes["ilp_favouredspshape"].formattedValue : "";
		var gearedforgrowth = (retrievedCampaign.attributes["ilp_gearedforgrowth"]) ? retrievedCampaign.attributes["ilp_gearedforgrowth"].formattedValue : "";
		var estimatedsizeofwalletape = (retrievedCampaign.attributes["ilp_estimatedsizeofwalletape"]) ? retrievedCampaign.attributes["ilp_estimatedsizeofwalletape"].formattedValue : "";
		var threeyp = (retrievedCampaign.attributes["ilp_3yp"]) ? retrievedCampaign.attributes["ilp_3yp"].formattedValue : "";
		var potentialscore = (retrievedCampaign.attributes["ilp_potentialscore"]) ? retrievedCampaign.attributes["ilp_potentialscore"].formattedValue : "";
		var paretoprinciple = (retrievedCampaign.attributes["ilp_paretoprinciple"]) ? retrievedCampaign.attributes["ilp_paretoprinciple"].formattedValue : "";
		var bcgclassification = (retrievedCampaign.attributes["ilp_bcgclassification"]) ? retrievedCampaign.attributes["ilp_bcgclassification"].formattedValue : "";
		var pgsbclassification = (retrievedCampaign.attributes["ilp_pgsbclassification"]) ? retrievedCampaign.attributes["ilp_pgsbclassification"].formattedValue : "";
		var facebook = (retrievedCampaign.attributes["ilp_facebook"]) ? retrievedCampaign.attributes["ilp_facebook"].value : "";
		var linkedin = (retrievedCampaign.attributes["ilp_linkedin"]) ? retrievedCampaign.attributes["ilp_linkedin"].value : "";
		var website = (retrievedCampaign.attributes["websiteurl"]) ? retrievedCampaign.attributes["websiteurl"].value : "";
		var twitter = (retrievedCampaign.attributes["ilp_twitter"]) ? retrievedCampaign.attributes["ilp_twitter"].value : "";
		var addressFull = (retrievedCampaign.attributes["address1_line1"]) ? retrievedCampaign.attributes["address1_line1"].value+", " : "";
		var volumenumberofcases = (retrievedCampaign.attributes["ilp_volumenumberofcases"]) ? retrievedCampaign.attributes["ilp_volumenumberofcases"].value+" " : "unknown";
		var lyVolumenumberofcases = (retrievedCampaign.attributes["ilp_lastyearvolumenumberofcases"]) ? retrievedCampaign.attributes["ilp_lastyearvolumenumberofcases"].value+" " : "unknown";
		var pensionsscore = (retrievedCampaign.attributes["ilp_pensionsscore"]) ? retrievedCampaign.attributes["ilp_pensionsscore"].value+"" : "";
		var investmentsscore = (retrievedCampaign.attributes["ilp_investmentsscore"]) ? retrievedCampaign.attributes["ilp_investmentsscore"].value+" " : "";
		var emailscore = (retrievedCampaign.attributes["ilp_emailscore"]) ? retrievedCampaign.attributes["ilp_emailscore"].value+" " : "";
		var calculatorsscore = (retrievedCampaign.attributes["ilp_calculatorsscore"]) ? retrievedCampaign.attributes["ilp_calculatorsscore"].value+" " : "";
		var emailscore = (retrievedCampaign.attributes["ilp_emailscore"]) ? retrievedCampaign.attributes["ilp_emailscore"].value+" " : "";
		var calculatorsscore = (retrievedCampaign.attributes["ilp_calculatorsscore"]) ? retrievedCampaign.attributes["ilp_calculatorsscore"].value+" " : "";
		var researchscore = (retrievedCampaign.attributes["ilp_researchscore"]) ? retrievedCampaign.attributes["ilp_researchscore"].value+" " : "";
		var sifscore = (retrievedCampaign.attributes["ilp_sifscore"]) ? retrievedCampaign.attributes["ilp_sifscore"].value+" " : "";
		var protectionscore = (retrievedCampaign.attributes["ilp_protectionscore"]) ? retrievedCampaign.attributes["ilp_protectionscore"].value+" " : "";
		var compliancescore = (retrievedCampaign.attributes["ilp_compliancescore"]) ? retrievedCampaign.attributes["ilp_compliancescore"].value+" " : "";
		var webinarscore = (retrievedCampaign.attributes["ilp_webinarscore"]) ? retrievedCampaign.attributes["ilp_webinarscore"].value+" " : "";
		var newsscore = (retrievedCampaign.attributes["ilp_newsscore"]) ? retrievedCampaign.attributes["ilp_newsscore"].value+" " : "";
		var mapsscore = (retrievedCampaign.attributes["ilp_mapsscore"]) ? retrievedCampaign.attributes["ilp_mapsscore"].value+" " : "";
		var digitalactivityscore = (retrievedCampaign.attributes["ilp_digitalactivityscore"]) ? retrievedCampaign.attributes["ilp_digitalactivityscore"].value+" " : "";
		
		addressFull += (retrievedCampaign.attributes["address1_line2"]) ? retrievedCampaign.attributes["address1_line2"].value+", " : "";
		addressFull += (retrievedCampaign.attributes["address1_line3"]) ? retrievedCampaign.attributes["address1_line3"].value+", " : ""
		addressFull += (retrievedCampaign.attributes["ilp_county"]) ? "Co. "+retrievedCampaign.attributes["ilp_county"].formattedValue : "";
		
	var tyAPE = (retrievedCampaign.attributes["ilp_thisyeargrandtotalytdape"]) ? retrievedCampaign.attributes["ilp_thisyeargrandtotalytdape"].value : "";
	var tyMargin = (retrievedCampaign.attributes["ilp_thisyeargrandtotalytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyeargrandtotalytdmargin"].value : "";
	
	var lyMargin = (retrievedCampaign.attributes["ilp_lastyeargrandtotalytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyeargrandtotalytdmargin"].value : "";
	
	
	// Set up the sales fields to display on the screen	
	var ilp_thisyearprotectionytdape = (retrievedCampaign.attributes["ilp_thisyearprotectionytdape"]) ? retrievedCampaign.attributes["ilp_thisyearprotectionytdape"].value : "0";	
	var ilp_lastyearprotectionytdape = (retrievedCampaign.attributes["ilp_lastyearprotectionytdape"]) ? retrievedCampaign.attributes["ilp_lastyearprotectionytdape"].value : "0";	
	var ilp_lastyearprotectiontotalape = (retrievedCampaign.attributes["ilp_lastyearprotectiontotalape"]) ? retrievedCampaign.attributes["ilp_lastyearprotectiontotalape"].value : "0";	
	
	
	var ilp_thisyearprotectionytdmargin = (retrievedCampaign.attributes["ilp_thisyearprotectionytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearprotectionytdmargin"].value : "0";
	var ilp_lastyearprotectionytdmargin = (retrievedCampaign.attributes["ilp_lastyearprotectionytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearprotectionytdmargin"].value : "0";
	var ilp_lastyearprotectiontotalmargin = (retrievedCampaign.attributes["ilp_lastyearprotectiontotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearprotectiontotalmargin"].value : "0";
		var ilp_thisyearpensionapytdape = (retrievedCampaign.attributes["ilp_thisyearpensionapytdape"]) ? retrievedCampaign.attributes["ilp_thisyearpensionapytdape"].value : "0";
	var ilp_lastyearpensionapytdape = (retrievedCampaign.attributes["ilp_lastyearpensionapytdape"]) ? retrievedCampaign.attributes["ilp_lastyearpensionapytdape"].value : "0";
	var ilp_lastyearpensionaptotalape = (retrievedCampaign.attributes["ilp_lastyearpensionaptotalape"]) ? retrievedCampaign.attributes["ilp_lastyearpensionaptotalape"].value : "0";
	var ilp_thisyearpensionapytdmargin = (retrievedCampaign.attributes["ilp_thisyearpensionapytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearpensionapytdmargin"].value : "0";
	
	var ilp_lastyearpensionapytdmargin = (retrievedCampaign.attributes["ilp_lastyearpensionapytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearpensionapytdmargin"].value : "0";
	var ilp_lastyearpensionaptotalmargin = (retrievedCampaign.attributes["ilp_lastyearpensionaptotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearpensionaptotalmargin"].value : "0";
	
	var ilp_thisyearpensionspytdape = (retrievedCampaign.attributes["ilp_thisyearpensionspytdape"]) ? retrievedCampaign.attributes["ilp_thisyearpensionspytdape"].value : "0";
	var ilp_lastyearpensionspytdape = (retrievedCampaign.attributes["ilp_lastyearpensionspytdape"]) ? retrievedCampaign.attributes["ilp_lastyearpensionspytdape"].value : "0";
	var ilp_lastyearpensionsptotalape = (retrievedCampaign.attributes["ilp_lastyearpensionsptotalape"]) ? retrievedCampaign.attributes["ilp_lastyearpensionsptotalape"].value : "0";
	
	var ilp_thisyearpensionspytdmargin = (retrievedCampaign.attributes["ilp_thisyearpensionspytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearpensionspytdmargin"].value : "0";
	var ilp_lastyearpensionspytdmargin = (retrievedCampaign.attributes["ilp_lastyearpensionspytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearpensionspytdmargin"].value : "0";
	var ilp_lastyearpensionsptotalmargin = (retrievedCampaign.attributes["ilp_lastyearpensionsptotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearpensionsptotalmargin"].value : "0";
	
	
	var ilp_thisyearbondsytdape = (retrievedCampaign.attributes["ilp_thisyearbondsytdape"]) ? retrievedCampaign.attributes["ilp_thisyearbondsytdape"].value : "0";
	var ilp_lastyearbondsytdape = (retrievedCampaign.attributes["ilp_lastyearbondsytdape"]) ? retrievedCampaign.attributes["ilp_lastyearbondsytdape"].value : "0";
	var ilp_lastyearbondstotalape = (retrievedCampaign.attributes["ilp_lastyearbondstotalape"]) ? retrievedCampaign.attributes["ilp_lastyearbondstotalape"].value : "0";
	var ilp_thisyearbondsytdmargin = (retrievedCampaign.attributes["ilp_thisyearbondsytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearbondsytdmargin"].value : "0";
	var ilp_lastyearbondsytdmargin = (retrievedCampaign.attributes["ilp_lastyearbondsytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearbondsytdmargin"].value : "0";
	var ilp_lastyearbondstotalmargin = (retrievedCampaign.attributes["ilp_lastyearbondstotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearbondstotalmargin"].value : "0";
	
	var ilp_thisyearsavingsytdape = (retrievedCampaign.attributes["ilp_thisyearsavingsytdape"]) ? retrievedCampaign.attributes["ilp_thisyearsavingsytdape"].value : "0";
	var ilp_lastyearsavingsytdape = (retrievedCampaign.attributes["ilp_lastyearsavingsytdape"]) ? retrievedCampaign.attributes["ilp_lastyearsavingsytdape"].value : "0";
	var ilp_lastyearsavingstotalape = (retrievedCampaign.attributes["ilp_lastyearsavingstotalape"]) ? retrievedCampaign.attributes["ilp_lastyearsavingstotalape"].value : "0";
	var ilp_thisyearsavingsytdmargin = (retrievedCampaign.attributes["ilp_thisyearsavingsytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearsavingsytdmargin"].value : "0";
	var ilp_lastyearsavingsytdmargin = (retrievedCampaign.attributes["ilp_lastyearsavingsytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearsavingsytdmargin"].value : "0";
	var ilp_lastyearsavingstotalmargin = (retrievedCampaign.attributes["ilp_lastyearsavingstotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearsavingstotalmargin"].value : "0";
	
	var ilp_thisyeargrandtotalytdape = (retrievedCampaign.attributes["ilp_thisyeargrandtotalytdape"]) ? retrievedCampaign.attributes["ilp_thisyeargrandtotalytdape"].value : "0";	
	var ilp_lastyeargrandtotalytdape = (retrievedCampaign.attributes["ilp_lastyeargrandtotalytdape"]) ? retrievedCampaign.attributes["ilp_lastyeargrandtotalytdape"].value : "0";	
	
	var ilp_totallastyearAPE= (ilp_lastyearprotectiontotalape+ilp_lastyearpensionaptotalape+ilp_lastyearpensionsptotalape+ilp_lastyearbondstotalape+ilp_lastyearsavingstotalape);
	
	var ilp_totallastyearMargin= (ilp_lastyearprotectiontotalmargin+ilp_lastyearpensionaptotalmargin+ilp_lastyearpensionsptotalmargin+ilp_lastyearbondstotalmargin+ilp_lastyearsavingstotalmargin);
	
	
	// CB Figures
	var ilp_thisyearcorporatebusinessytdape = (retrievedCampaign.attributes["ilp_thisyearcorporatebusinessytdape"]) ? retrievedCampaign.attributes["ilp_thisyearcorporatebusinessytdape"].value : "0";
	var ilp_lastyearcorporatebusinessytdape = (retrievedCampaign.attributes["ilp_lastyearcorporatebusinessytdape"]) ? retrievedCampaign.attributes["ilp_lastyearcorporatebusinessytdape"].value : "0";
	var ilp_lastyearcorporatebusinesstotalape = (retrievedCampaign.attributes["ilp_lastyearcorporatebusinesstotalape"]) ? retrievedCampaign.attributes["ilp_lastyearcorporatebusinesstotalape"].value : "0";
	var ilp_thisyearcorporatebusinessytdmargin = (retrievedCampaign.attributes["ilp_thisyearcorporatebusinessytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearcorporatebusinessytdmargin"].value : "0";
	var ilp_lastyearcorporatebusinessytdmargin = (retrievedCampaign.attributes["ilp_lastyearcorporatebusinessytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearcorporatebusinessytdmargin"].value : "0";
	var ilp_lastyearcorporatebusinesstotalmargin = (retrievedCampaign.attributes["ilp_lastyearcorporatebusinesstotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearcorporatebusinesstotalmargin"].value : "0";
	
	
	
	
	
	
	
	
		// #####################################
		// Now that we have all the information we need to
		// display it if there is something to display
		
		
		
		$('.broker-name').html(name);
		if(pareto){
				$('.broker-name').append('&nbsp;<i style="color:#FFCF30;" class="fa fa-star "></i>')
		}
		$('.broker-address').html(addressFull);
		
		if(ownerid.length>0){
			$('.broker-accountmanager').html(toTitleCase(ownerid));
			$('.broker-accountmanager-holder').show();
		}
		
		if(segment.length>0){
			$('.broker-segment').html(toTitleCase(segment));
			$('.broker-segment-holder').show();
		}
		
		if(masterCode.length>0){
			$('.broker-sellercode').html(masterCode);
			$('.broker-sellercode-holder').show();
		}
		if(volumenumberofcases.length>0){
			$('.broker-casecount').html(volumenumberofcases);
			$('.broker-casecount-holder').show();
		}
		if(website.length>0){
			$('.broker-website').html(website);
			$('.broker-website-holder').show();
		}
		if(linkedin.length>0){
			$('.broker-linkedin').html(linkedin);
			$('.broker-linkedin-holder').show();
		}
		if(facebook.length>0){
			$('.broker-facebook').html(facebook);
			$('.broker-facebook-holder').show();
		}
		if(twitter.length>0){
			$('.broker-twitter').html(twitter);
			$('.broker-twitter-holder').show();
		}
		
		
		var addressMap = addressFull.replace('&', '+');
		addressMap = encodeURIComponent(addressMap);
		$('.broker-map').html('<img src="https://maps.googleapis.com/maps/api/staticmap?center='+addressMap+'+ireland&zoom=8&scale=1&size=370x230&maptype=roadmap&key=AIzaSyD5qHo4s42uXSLbnx1qtIUJvCbSCNcHYcE&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C'+addressMap+',ireland" alt="Google Map of ireland" class="img-fluid"> ');
		
	}else{
		$('.broker-name').html('unknown');
		
	}
	
	
	
	
	//############################################################
	//
	// Watch the broker page tabs and see what is clicked
	//
	//############################################################
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var tabID = $(e.target).attr('id');         // active tab
		
		if(tabID == "nav-activity-tab"){
			// this is the activity information on the broker page
			// show all the activity information
			showBrokerActivity();
			
			
		}else if(tabID == "nav-sales-tab"){
			// this is the sales information on the broker page
			// show all the sales information
			
			showBrokerSales();
		
		}else if(tabID == "nav-contacts-tab"){
			
			showBrokerContacts();
		
		}else if(tabID == "nav-initiatives-tab"){
			showBrokerInitiatives();
		
		}
	});
	//#################################################################
	//### Broker Activities
	//######################
	var edittedRating;
	// show the broker activity results on the screen
	var showBrokerActivity = function(r){
		//console.log('show in table '+r);
		
		// This is the call to get all the data from the CRM
		var brokerActivities = getActivities();
		//console.log('broker aci '+brokerActivities);
		var resultHTML='';
		if (brokerActivities.length <=0){
			resultHTML='<tr><td colspan="4">There is no activity</td></tr>';
		}
		else{
			for(var i = 0; i<brokerActivities.length; i++)	{
				
				var icon = (brokerActivities[i].activityType) ? brokerActivities[i].activityType : "<i>Unknown</i>"; 
				var subject = (brokerActivities[i].subject) ? brokerActivities[i].subject.value : "<i>Unknown subject</i>"; 
				var date = (brokerActivities[i].createdon) ? brokerActivities[i].createdon.formattedValue : ""; 
				var activityid = (brokerActivities[i].activityid) ? brokerActivities[i].activityid.value : ""; 
				var stat = (brokerActivities[i].statuscode) ? brokerActivities[i].statuscode.formattedValue : ""; 
				var productdesc = (brokerActivities[i].productdesc) ? brokerActivities[i].productdesc.value : ""; 
				
				//console.log(brokerActivities[i]);
				//console.log(i+' '+date+' ');
				if (brokerActivities[i].activityType == "Plan"){
				resultHTML+='<tr>'+
				  '<td>'+getActivityIcon(icon)+'</td>'+
				  '<td><a href="javascript:void(0);" class="open'+icon+'" data-activityid="'+activityid+'">Plan Activity ('+subject+') '+productdesc+'</td>'+
				  '<td>'+date+'</td>'+
				  '<td>'+getStatusIcon(stat)+'</td>'+
				'</tr>';
				}
				else{
				resultHTML+='<tr>'+
				  '<td>'+getActivityIcon(icon)+'</td>'+
				  '<td><a href="javascript:void(0);" class="open'+icon+'" data-activityid="'+activityid+'">'+subject+'</td>'+
				  '<td>'+date+'</td>'+
				  '<td>'+getStatusIcon(stat)+'</td>'+
				'</tr>';
				}
			}
		}
		$('.broker-activity-table').html(resultHTML);
		
		$('.opentask').click(function(){
			var activityid = $(this).data( "activityid" );
			Xrm.Utility.openEntityForm('task',activityid);
		});
		$('.openPlan').click(function(){
			var activityid = $(this).data( "activityid" );
			Xrm.Utility.openEntityForm('ilp_plan',activityid);
		});
		$('.openphonecall').click(function(){
			var activityid = $(this).data( "activityid" );
			//Xrm.Utility.openEntityForm('phonecall',activityid);
			
			var callinfo = getTaskInfo(activityid);
			
			var name = (callinfo.attributes["subject"]) ? callinfo.attributes["subject"].value : "";
			var description = (callinfo.attributes["description"]) ? callinfo.attributes["description"].value : "";
			var rating = (callinfo.attributes["ilp_callrating"]) ? callinfo.attributes["ilp_callrating"].value : "";
			var statecode = (callinfo.attributes["statecode"]) ? callinfo.attributes["statecode"].value : "";
			edittedRating = rating;

			$('#broker-edit-phonecall-title').val(name);
			$('#broker-edit-phonecall-description').val(description);
			if(statecode=="1"){
				$('#broker-edit-phonecall-title').prop('disabled', true);
				$('#broker-edit-phonecall-description').prop('disabled', true);
				$('#submit-broker-edit-phonecall').hide();
				$('#submit-broker-edit-phonecall-complete').hide();
				$('#starratingedit').hide();
				$('#starratingdisabled').show();
				$('#starratingdisabled').starrr({
					rating: rating,
					readOnly: true
				});
			}else{				
				$('#broker-edit-phonecall-title').prop('disabled', false);
				$('#broker-edit-phonecall-description').prop('disabled', false);
				$('#submit-broker-edit-phonecall').show();
				$('#submit-broker-edit-phonecall-complete').show();
				$('#starratingedit').show();
				$('#starratingdisabled').hide();
				$('#starratingedit').starrr({
					rating: rating,
					readOnly: false,
					change: function(e, value){
						edittedRating = value;
				  }
				});
			}
			$('#broker-edit-phonecall-title').data("activityid",activityid);
		
			
			$('#editPhonecallModal').modal();
		});
		
		// enable tooltip
		$('[data-toggle="tooltip"]').tooltip();
		
		//console.log('length '+brokerActivities.length);
		
	}
	//##
	
	//###################################################################
	//#################################################################
	//### Broker sales information
	//######################
	//

	// show the broker activity results on the screen
	var showBrokerSales = function(){
		
		//////////////////////////////////////////////////////////////////
		//################################################################
		//################################################################
		//  A P E  S A L E S   F I G U R E S
		//
		
		// Protection Margin
		$('.sales-arrow-protection-margin').html(getArrowIcon(ilp_thisyearprotectionytdmargin,ilp_lastyearprotectionytdmargin));
		$('.sales-protection-margin-a').html('&euro; '+ilp_thisyearprotectionytdmargin);
		$('.sales-protection-margin-b').html('&euro; '+ilp_lastyearprotectionytdmargin);
		$('.sales-protection-margin-c').html('&euro; '+ilp_lastyearprotectiontotalmargin);
		
		// AP Pension Margin
		$('.sales-arrow-ap-pension-margin').html(getArrowIcon(ilp_thisyearpensionapytdmargin,ilp_lastyearpensionapytdmargin));
		$('.sales-ap-pension-margin-a').html('&euro; '+ilp_thisyearpensionapytdmargin);
		$('.sales-ap-pension-margin-b').html('&euro; '+ilp_lastyearpensionapytdmargin);
		$('.sales-ap-pension-margin-c').html('&euro; '+ilp_lastyearpensionaptotalmargin);
		
		// SP Pension Margin
		$('.sales-arrow-sp-pension-margin').html(getArrowIcon(ilp_thisyearpensionspytdmargin,ilp_lastyearpensionspytdmargin));
		$('.sales-sp-pension-margin-a').html('&euro; '+ilp_thisyearpensionspytdmargin);
		$('.sales-sp-pension-margin-b').html('&euro; '+ilp_lastyearpensionspytdmargin);
		$('.sales-sp-pension-margin-c').html('&euro; '+ilp_lastyearpensionsptotalmargin);
		
		// Bonds Margin
		$('.sales-arrow-bonds-margin').html(getArrowIcon(ilp_thisyearbondsytdmargin,ilp_lastyearbondsytdmargin));
		$('.sales-bonds-margin-a').html('&euro; '+ilp_thisyearbondsytdmargin);
		$('.sales-bonds-margin-b').html('&euro; '+ilp_lastyearbondsytdmargin);
		$('.sales-bonds-margin-c').html('&euro; '+ilp_lastyearbondstotalmargin);
		
		// Savings Margin
		$('.sales-arrow-savings-margin').html(getArrowIcon(ilp_thisyearsavingsytdmargin,ilp_lastyearsavingsytdmargin));
		$('.sales-savings-margin-a').html('&euro; '+ilp_thisyearsavingsytdmargin);
		$('.sales-savings-margin-b').html('&euro; '+ilp_lastyearsavingsytdmargin);
		$('.sales-savings-margin-c').html('&euro; '+ilp_lastyearsavingstotalmargin);
		
		// Total Margin (Retail)
		$('.sales-arrow-total-margin').html(getArrowIcon((tyMargin - ilp_thisyearcorporatebusinessytdmargin),(lyMargin - ilp_lastyearcorporatebusinessytdmargin)));
		$('.sales-total-margin-a').html('&euro; '+(tyMargin - ilp_thisyearcorporatebusinessytdmargin).toFixed(2));
		$('.sales-total-margin-b').html('&euro; '+(lyMargin - ilp_lastyearcorporatebusinessytdmargin).toFixed(2));
		$('.sales-total-margin-c').html('&euro; '+(ilp_totallastyearMargin - ilp_lastyearcorporatebusinesstotalmargin).toFixed(2));		
		
		// Corporate Business Margin
		$('.sales-arrow-corporate-business-margin').html(getArrowIcon(ilp_thisyearcorporatebusinessytdmargin,ilp_lastyearcorporatebusinessytdmargin));
		$('.sales-corporate-business-margin-a').html('&euro; '+ilp_thisyearcorporatebusinessytdmargin);
		$('.sales-corporate-business-margin-b').html('&euro; '+ilp_lastyearcorporatebusinessytdmargin);
		$('.sales-corporate-business-margin-c').html('&euro; '+ilp_lastyearcorporatebusinesstotalmargin);
		
		// Total Margin (All)
		$('.sales-arrow-total-margin-all').html(getArrowIcon(tyMargin,lyMargin));
		$('.sales-total-margin-all-a').html('&euro; '+tyMargin);
		$('.sales-total-margin-all-b').html('&euro; '+lyMargin);
		$('.sales-total-margin-all-c').html('&euro; '+ilp_totallastyearMargin);		
		
		//
		// E N D   O F   A P E   S A L E S   F I  G U R E  S
 		//////////////////////////////////////////////////////////////////////////////////
		
		
		//////////////////////////////////////////////////////////////////
		//################################################################
		//################################################################
		//  M A R G I N   S A L E S   F I G U R E S
		//
		
		// Protection APE
		$('.sales-arrow-protection-ape').html(getArrowIcon(ilp_thisyearprotectionytdape,ilp_lastyearprotectionytdape));
		$('.sales-protection-ape-a').html('&euro; '+ilp_thisyearprotectionytdape);
		$('.sales-protection-ape-b').html('&euro; '+ilp_lastyearprotectionytdape);
		$('.sales-protection-ape-c').html('&euro; '+ilp_lastyearprotectiontotalape);
		
		// AP Pension APE
		$('.sales-arrow-ap-pension-ape').html(getArrowIcon(ilp_thisyearpensionapytdape,ilp_lastyearpensionapytdape));
		$('.sales-ap-pension-ape-a').html('&euro; '+ilp_thisyearpensionapytdape);
		$('.sales-ap-pension-ape-b').html('&euro; '+ilp_lastyearpensionapytdape);
		$('.sales-ap-pension-ape-c').html('&euro; '+ilp_lastyearpensionaptotalape);
		
		// SP Pension APE
		$('.sales-arrow-sp-pension-ape').html(getArrowIcon(ilp_thisyearpensionspytdape,ilp_lastyearpensionspytdape));
		$('.sales-sp-pension-ape-a').html('&euro; '+ilp_thisyearpensionspytdape);
		$('.sales-sp-pension-ape-b').html('&euro; '+ilp_lastyearpensionspytdape);
		$('.sales-sp-pension-ape-c').html('&euro; '+ilp_lastyearpensionsptotalape);
		
		// Bonds APE
		$('.sales-arrow-bonds-ape').html(getArrowIcon(ilp_thisyearbondsytdape,ilp_lastyearbondsytdape));
		$('.sales-bonds-ape-a').html('&euro; '+ilp_thisyearbondsytdape);
		$('.sales-bonds-ape-b').html('&euro; '+ilp_lastyearbondsytdape);
		$('.sales-bonds-ape-c').html('&euro; '+ilp_lastyearbondstotalape);
		
		// Savings APE
		$('.sales-arrow-savings-ape').html(getArrowIcon(ilp_thisyearsavingsytdape,ilp_lastyearsavingsytdape));
		$('.sales-savings-ape-a').html('&euro; '+ilp_thisyearsavingsytdape);
		$('.sales-savings-ape-b').html('&euro; '+ilp_lastyearsavingsytdape);
		$('.sales-savings-ape-c').html('&euro; '+ilp_lastyearsavingstotalape);
		
		// Total APE (Retail)
		$('.sales-arrow-total-ape').html(getArrowIcon((ilp_thisyeargrandtotalytdape - ilp_thisyearcorporatebusinessytdape),(ilp_lastyeargrandtotalytdape - ilp_lastyearcorporatebusinessytdape)));
		$('.sales-total-ape-a').html('&euro; '+(ilp_thisyeargrandtotalytdape - ilp_thisyearcorporatebusinessytdape).toFixed(2));
		$('.sales-total-ape-b').html('&euro; '+(ilp_lastyeargrandtotalytdape - ilp_lastyearcorporatebusinessytdape).toFixed(2));
		$('.sales-total-ape-c').html('&euro; '+(ilp_totallastyearAPE - ilp_lastyearcorporatebusinesstotalape).toFixed(2));		
		
		// Corporate Business APE
		$('.sales-arrow-corporate-business-ape').html(getArrowIcon(ilp_thisyearcorporatebusinessytdape,ilp_lastyearcorporatebusinessytdape));
		$('.sales-corporate-business-ape-a').html('&euro; '+ilp_thisyearcorporatebusinessytdape);
		$('.sales-corporate-business-ape-b').html('&euro; '+ilp_lastyearcorporatebusinessytdape);
		$('.sales-corporate-business-ape-c').html('&euro; '+ilp_lastyearcorporatebusinesstotalape);
		
		// Total APE (All)
		$('.sales-arrow-total-ape-all').html(getArrowIcon(ilp_thisyeargrandtotalytdape,ilp_lastyeargrandtotalytdape));
		$('.sales-total-ape-all-a').html('&euro; '+ilp_thisyeargrandtotalytdape);
		$('.sales-total-ape-all-b').html('&euro; '+ilp_lastyeargrandtotalytdape);
		$('.sales-total-ape-all-c').html('&euro; '+ilp_totallastyearAPE);		
		
		//
		// E N D   O F   M A R G I N    S A L E S   F I G U R E S
 		//////////////////////////////////////////////////////////////////////////////////
		
		$('.current-year').html((new Date()).getFullYear());
		$('.last-year').html(((new Date()).getFullYear()-1));
		
	}
	//##
	//###################################################################
	
	$('.broker-name').click(function(){
		// open the broker in the CRM
		Xrm.Utility.openEntityForm("account",  brokerID);
	});
	
	$('#apemargin-switch').click(function(){
		// open the broker in the CRM
		
		if($(this).is(":checked")){
			$('.table-ape').hide();
			$('.table-margin').fadeIn();
		}else{
			$('.table-ape').fadeIn();
			$('.table-margin').hide();
		}
		
	});
	//###################################################################
	//#################################################################
	//### Broker Contacts information
	//######################
	//
	// show the broker activity results on the screen
	var showBrokerContacts = function(){
		var contacts = getAccountContacts(brokerID);
		$('.broker-contact-list').html('');
		
		$.each( contacts, function( key, v ) {
		
		var email = (v.emailaddress1) ? v.emailaddress1.value : "unknown";
		var fullname = (v.fullname) ? v.fullname.value : "unknown";
		var telephone1 = (v.telephone1) ? v.telephone1.value : "unknown";
		var role = (v.role) ? v.role.formattedValue : "unknown";
		var contactid = (v.contactid) ? v.contactid.value : "";
		var broker = (v.broker) ? v.broker.name : "";
						
		$('.broker-contact-list').append(
			'<tr>'+
				'<td><a href="javascript:void(0);" style="color:#50C9B5;" class="openContactCRM" data-contactid="'+contactid+'"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a></td>'+
				'<td>'+fullname+'</td>'+
				'<td><a href="mailto:'+email+'">'+email+'</a></td>'+
				'<td>'+telephone1+'</td>'+
				'<td>'+role+'</td>'+
				'<td><a href="http://score.phosphorusdesign.com/website/email-start.php?eadd='+email+'" target="_new" style="color:#50C9B5;"><i class="fa fa-envelope-o" aria-hidden="true"></i></a></td>'+
			'</tr>'
			);
		});
		
		$('.openContactCRM').click(function(){
			var contactID = $(this).data( "contactid" );
			Xrm.Utility.openEntityForm('contact',contactID);
		});
		
	}
	//##
	//###################################################################


	
	//###################################################################
	//#################################################################
	//### Broker Initiatives information
	//######################
	
	// show the broker activity results on the screen
	var showBrokerInitiatives = function(){
		var initiatives = getAccountInitiatives(brokerID);
		//console.log("initiatives "+JSON.stringify(initiatives))
		$('.broker-initiative-list').html('');
				
		// set up the initiatives first
		for(var i = 0; i<initiatives.length; i++)	{
			
			var name, date,datev, statusValue, initiativeID, ownerName;
			name = (initiatives[i].attributes['ilp_name']) ? initiatives[i].attributes['ilp_name'].value : "";  ;
			//desc = (initiatives[i].attributes['ilp_description']) ? initiatives[i].attributes['ilp_description'].value : ""; 
			date = initiatives[i].attributes['createdon'].formattedValue;
			datev = initiatives[i].attributes['createdon'].formattedValue;
			statusValue = initiatives[i].attributes['statuscode'].formattedValue;
			initiativeID = initiatives[i].attributes['ilp_initiativeid'].value;
			ownerName = initiatives[i].attributes['ownerid'].name;			
			//createdby = inters[i].attributes['createdby'].name;				
				
				// add the initiatives to the tag
			$('.broker-initiative-list').append(
				'<tr>'+
					'<td class="interaction-item-statusValue">'+getStatusIcon(statusValue)+'</td>'+
					'<td><a href="javascript:void(0);" class="initiative-open" data-intitiativeid="'+initiativeID+'">'+name+'</a></td>'+
					'<td>'+toTitleCase(ownerName)+'</td>'+
					'<td>'+datev+'</td>'+
					'<td>'+date+'</td>'+
				'</tr>'
				);
			//reset any related counters	
			$('.interaction-item-id-'+initiativeID).html('0');
		}
		
		// add a listener for the initiative parent account - open account with specific ID in CRM
		$('.initiative-open').click(function(){
			var d = $(this).data();
			Xrm.Utility.openEntityForm('ilp_initiative',d.intitiativeid)
		})
		
	}
	//##
	//###################################################################


	
	
	
	
	function getArrowIcon(intA,intB){
		
		var arrowIcon='';
		if (intA>intB){
			arrowIcon = '<i style="color:green;" class="fa fa-arrow-up" aria-hidden="true"></i>';
		}else if (intA<intB){
			arrowIcon = '<i style="color:red;" class="fa fa-arrow-down" aria-hidden="true"></i>';
		}else{
			
			arrowIcon = '<i style="color:#EDEAED;" class="fa fa-circle" aria-hidden="true"></i>';
		}

		return arrowIcon;
		
	}


	function getStatusIcon(statusValue){
		var statusIcon = '<i class="fa fa-comments" aria-hidden="true"></i>';
		if (statusValue=="Closed"){
			statusIcon = '<i style="color:#50C9B5;" class="fa fa-check-circle " data-toggle="tooltip" data-placement="top" title="Activity Closed"></i>';
		}
		else if (statusValue=="Opened" || statusValue=="Open"){
			statusIcon = '<i style="color:#E21166;" class="fa fa-folder-open-o " data-toggle="tooltip" data-placement="top" title="Activity Open"></i>';
		}
		else if(statusValue=="In Progress"){
			statusIcon = '<i style="color:#E21166;" class="fa fa-hourglass-half " data-toggle="tooltip" data-placement="top" title="In Progress"></i>';
		}
		else if(statusValue=="Waiting on someone else"){
			statusIcon = '<i style="color:#FCB364;" class="fa fa-pause " data-toggle="tooltip" data-placement="top" title="Waiting on someone else"></i>';
		}
		else if(statusValue=="Not Started"){
			statusIcon = '<i style="color:#E21166;" class="fa fa-exclamation-circle " data-toggle="tooltip" data-placement="top" title="Not Started"></i>';
		}
		else if(statusValue=="Completed"){
			statusIcon = '<i style="color:#50C9B5;" class="fa fa-check-circle " data-toggle="tooltip" data-placement="top" title="Completed"></i>';
		}
		else if(statusValue=="Deferred"){
			statusIcon = '<i style="color:#2E909D;" class="fa fa-clock-o " data-toggle="tooltip" data-placement="top" title="Deferred"></i>';
		}
		
		else if(statusValue=="Not Yet In Force"){
			statusIcon = '<i style="color:#F09625;" class="fa fa-clock-o " data-toggle="tooltip" data-placement="top" title="Not Yet In Force"></i>';
		}
		else if(statusValue=="Proposal"){
			statusIcon = '<i style="color:#F266CA;" class="fa fa-handshake-o" data-toggle="tooltip" data-placement="top" title="Proposal"></i>';
		}
		else if(statusValue=="Rejected"){
			statusIcon = '<i style="color:#9D46B7;" class="fa fa-ban" data-toggle="tooltip" data-placement="top" title="Rejected"></i>';
		}
		
		return statusIcon;
	}
	

	function getActivityIcon(activityValue){
		var activityIcon = '<i class="fa fa-comments" aria-hidden="true"></i>'; 
		if (activityValue=="phonecall"){
			activityIcon = '<i style="color:#2E909D;" class="fa fa-phone" data-toggle="tooltip" data-placement="top" title="Phonecall Activity"></i>';
		}
		else if (activityValue=="task" ){
			activityIcon = '<i style="color:#38B26E;" class="fa fa-list" data-toggle="tooltip" data-placement="top" title="Task"></i>';
		}
		else if (activityValue=="Plan" ){
			activityIcon = '<i style="color:#9ADCC6;" class="fa fa-pencil" data-toggle="tooltip" data-placement="top" title="Plan"></i>';
		}
		return activityIcon;
	}
	
	///////////////////////////////////////////////////
	// add an initiative
	$('.addBrokerInitiative').click(function(){
		// adda contact
		var params = {};
		params["ilp_accountid"] = brokerID;

		Xrm.Utility.openEntityForm("ilp_initiative", null, params);

	});
	///////////////////////////////////////////////////
	// edit information
	$('.editbrokerSegmentation').click(function(){
		// threeyp  potentialscore  paretoprinciple bcgclassification pgsbclassification
		var protectioninterest = (retrievedCampaign.attributes["ilp_protectioninterest"]) ? retrievedCampaign.attributes["ilp_protectioninterest"].value : "";
		var pensionsinterest = (retrievedCampaign.attributes["ilp_pensionsinterest"]) ? retrievedCampaign.attributes["ilp_pensionsinterest"].value : "";
		var investmentinterest = (retrievedCampaign.attributes["ilp_investmentinterest"]) ? retrievedCampaign.attributes["ilp_investmentinterest"].value : "";
		var mapsinterest = (retrievedCampaign.attributes["ilp_mapsinterest"]) ? retrievedCampaign.attributes["ilp_mapsinterest"].value : "";
		var complianceinterest = (retrievedCampaign.attributes["ilp_complianceinterest"]) ? retrievedCampaign.attributes["ilp_complianceinterest"].value : "";
		var socialmediainterest = (retrievedCampaign.attributes["ilp_socialmediainterest"]) ? retrievedCampaign.attributes["ilp_socialmediainterest"].value : "";
		
		
		$('#broker-segment-protection').val(protectioninterest);
		$('#broker-segment-pension').val(pensionsinterest);
		$('#broker-segment-investments').val(investmentinterest);
		$('#broker-segment-maps').val(mapsinterest);
		$('#broker-segment-compliance').val(complianceinterest);
		$('#broker-segment-socialmedia').val(socialmediainterest);
		
		$('#updateSegmentationDataModal').modal();

	});
	
	$('#broker-segmentation-update').click(function(){
		
		var protectionval = '857190004';
		var pensionval = '857190004';
		var investmentsval = '857190004';
		var mapsval = '857190004';
		var complianceval = '857190004';
		var socialmediaval = '857190004';
		
		if ($('#broker-segment-protection').val().length >=1)
		{
			protectionval = $('#broker-segment-protection').val();
		}
		
		if ($('#broker-segment-pension').val().length >=1)
		{
			pensionval = $('#broker-segment-pension').val();
		}
		if ($('#broker-segment-investments').val().length >=1)
		{
			investmentsval = $('#broker-segment-investments').val();
		}
		if ($('#broker-segment-maps').val().length >=1)
		{
			mapsval = $('#broker-segment-maps').val();
		}
		if ($('#broker-segment-compliance').val().length >=1)
		{
			complianceval = $('#broker-segment-compliance').val();
		}
		if ($('#broker-segment-socialmedia').val().length >=1)
		{
			socialmediaval = $('#broker-segment-socialmedia').val();
		}
		
		var editAccountSeg = new XrmServiceToolkit.Soap.BusinessEntity("account",brokerID);
		
		editAccountSeg.attributes["ilp_protectioninterest"] = { value:protectionval , type: "OptionSetValue" };
		editAccountSeg.attributes["ilp_pensionsinterest"] = { value:pensionval , type: "OptionSetValue" };
		editAccountSeg.attributes["ilp_investmentinterest"] = { value:investmentsval , type: "OptionSetValue" };
		editAccountSeg.attributes["ilp_mapsinterest"] = { value:mapsval , type: "OptionSetValue" };
		editAccountSeg.attributes["ilp_complianceinterest"] = { value:complianceval , type: "OptionSetValue" };
		editAccountSeg.attributes["ilp_socialmediainterest"] = { value:socialmediaval , type: "OptionSetValue" };

		response = XrmServiceToolkit.Soap.Update(editAccountSeg,function(r){
			$('#updateSegmentationDataModal').modal('hide');	
		});
		
		
		
	});
	///////////////////////////////////////////////////
	// add an Adivosry services task button click
	$('.addBrokerASNote').click(function(){
		// adda broker task
		$('#addASTaskModal').modal();		
		$('#broker-add-ASTask-form').removeClass('was-validated');
		$('#broker-add-ASTask-form').show();
		$('.broker-ASTask-added-btn').show();
		$('.broker-ASTask-added').hide();
		$('#broker-ASTask-title').val('');
		$('#broker-ASTask-description').val('');
	});
	
	///////////////////////////////////////////////////
	// add an Adivosry services task
	$('#submit-broker-ASTask').click(function(){
		// adda broker task		

		$('#broker-add-ASTask-form').addClass('was-validated');
		var enteredTask = $('#broker-add-ASTask-form')[0].checkValidity();
		
		if (enteredTask){
			
			var astaskTitle = $('#broker-ASTask-title').val();
			var astaskDescription = $('#broker-ASTask-description').val();
			var astaskAssignedTo = $('input[name=broker-ASTask-assign]:checked').val();
			var astaskSource = $('#broker-ASTask-sourceofcontact').val();
			var astaskComplexity = $('#broker-ASTask-complexityofcontact').val();
			var astaskTopic = $('#broker-ASTask-topicofcontact').val();
			var astaskDuration = $('#broker-ASTask-durationofcontact').val();
			
			
			var dateTask = new Date();
			var createTask = new XrmServiceToolkit.Soap.BusinessEntity("task");
			createTask.attributes["subject"] = ""+astaskTitle;
			createTask.attributes["description"] = ""+astaskDescription;
			createTask.attributes["scheduledend"] = { value:dateTask , type: "DateTime" };
		
			var userID = Xrm.Page.context.getUserId();
			createTask.attributes["ownerid"] = {  id: '{'+userID+'}', logicalName: "systemuser", type: "EntityReference" }
			
			createTask.attributes["ilp_sourceofcontact"] = { value:astaskSource , type: "OptionSetValue" };
			createTask.attributes["ilp_complexityofcontact"] = { value:astaskComplexity , type: "OptionSetValue" };
			createTask.attributes["ilp_topicofcontact"] = { value:astaskTopic , type: "OptionSetValue" };
			createTask.attributes["ilp_durationofcontact"] = { value:astaskDuration , type: "OptionSetValue" };
		
			createTask.attributes["ilp_accountid"] = {  id: '{'+brokerID+'}', logicalName: "account", type: "EntityReference" }
			createTask.attributes["regardingobjectid"] = { id: "{"+brokerID+"}", logicalName: "account", type: "EntityReference" }
			
			// not able to change the state code via XRM - review 365
			//createTask.attributes["statecode"] = { value:'2', type: "OptionSetValue" };

				response = XrmServiceToolkit.Soap.Create(createTask,function(r){
					 if (r != "") {
						$('#broker-add-ASTask-form').hide();
						$('.broker-ASTask-added-btn').hide();
						$('.broker-ASTask-added').fadeIn();
					}else{
						
						$('#broker-add-ASTask-form').show();
						$('.broker-ASTask-added-btn').show();
						$('.broker-ASTask-added').hide();
						alert('there was an error adding this Advisory Services Task. Try again.');
					}
				});
						
			
			
			
		}
	});

	
	
	///////////////////////////////////////////////////
	// add a task
	$('.addBrokerTask').click(function(){
		// adda broker task
		$('#addTaskModal').modal();		
		$('#broker-add-task-form').removeClass('was-validated');
		$('#broker-add-task-form').show();
		$('.broker-task-added-btn').show();
		$('.broker-task-added').hide();
		$('#broker-task-title').val('');
		$('#broker-task-description').val('');
	});
	
	///////////////////////////////////////////////////
	// add a task
	$('#submit-broker-task').click(function(){
		// add a broker task	

		$('#broker-add-task-form').addClass('was-validated');
		var enteredTask = $('#broker-add-task-form')[0].checkValidity();
		if (enteredTask){
			
			var taskTitle = $('#broker-task-title').val();
			var taskDescription = $('#broker-task-description').val();
			var taskAssignedTo = $('input[name=broker-task-assign]:checked').val();
			
		
			var dateTask = new Date();
			var createTask = new XrmServiceToolkit.Soap.BusinessEntity("task");
			createTask.attributes["subject"] = ""+taskTitle;
			createTask.attributes["description"] = ""+taskDescription;
			createTask.attributes["scheduledend"] = { value:dateTask , type: "DateTime" };
			if (taskAssignedTo=="broker-task-assign-current"){
				var userID = Xrm.Page.context.getUserId();
				createTask.attributes["ownerid"] = {  id: '{'+userID+'}', logicalName: "systemuser", type: "EntityReference" }
			}
			else{
				createTask.attributes["ownerid"] = {  id: '{'+owneridcode+'}', logicalName: "systemuser", type: "EntityReference" }
			}
			createTask.attributes["ilp_accountid"] = {  id: '{'+brokerID+'}', logicalName: "account", type: "EntityReference" }
			createTask.attributes["regardingobjectid"] = { id: "{"+brokerID+"}", logicalName: "account", type: "EntityReference" }

			response = XrmServiceToolkit.Soap.Create(createTask,function(r){
				 if (r != "") {
					$('#broker-add-task-form').hide();
					$('.broker-task-added-btn').hide();
					$('.broker-task-added').fadeIn();
				}else{
					
					$('#broker-add-task-form').show();
					$('.broker-task-added-btn').show();
					$('.broker-task-added').hide();
					alert('there was an error adding this task. Try again.');
				}
			});
		}
	});

	
	///////////////////////////////////////////////////
	// Add a Phone call button is clicked
	var callrating=1;
	$('.addBrokerPhoneCall').click(function(){
		// Add a phone call
		$('#addPhonecallModal').modal();
		// setting up the stars
		 $('#starrating').starrr({
			  change: function(e, value){
				callrating = value;
			  }
			});
		
		$('#broker-add-phonecall-form').removeClass('was-validated');
		$('#broker-add-phonecall-form').show();
		$('.broker-phonecall-added-btn').show();
		$('.broker-phonecall-added').hide();
		$('#broker-phonecall-title').val('');
		$('#broker-phonecall-description').val('');
	
			
	});	
	
	 
	$('#submit-broker-edit-phonecall-complete').click(function(){
		// adda broker phonecall	
		
		$('#broker-edit-phonecall-form').addClass('was-validated');
		
		var activityid = $('#broker-edit-phonecall-title').data( "activityid" );
		var enteredPhonecall = $('#broker-edit-phonecall-form')[0].checkValidity();
		if (enteredPhonecall){
			
			var phonecallTitle = $('#broker-edit-phonecall-title').val();
			var phonecallDescription = $('#broker-edit-phonecall-description').val();
			var rating = edittedRating;
			var editPhonecall = new XrmServiceToolkit.Soap.BusinessEntity("phonecall",activityid);

			editPhonecall.attributes["subject"] = ""+phonecallTitle;
			editPhonecall.attributes["description"] = ""+phonecallDescription;
			editPhonecall.attributes["ilp_callrating"] = { value:rating , type: "OptionSetValue" };
			editPhonecall.attributes["statecode"] = { value:1 , type: "OptionSetValue" };

			response = XrmServiceToolkit.Soap.Update(editPhonecall,function(r){
				$('#editPhonecallModal').modal('hide');				
			});
		}
	});
	
	$('#submit-broker-edit-phonecall').click(function(){
		// adda broker phonecall	
		
		$('#broker-edit-phonecall-form').addClass('was-validated');
		
		var activityid = $('#broker-edit-phonecall-title').data( "activityid" );
		var enteredPhonecall = $('#broker-edit-phonecall-form')[0].checkValidity();
		if (enteredPhonecall){
			
			var phonecallTitle = $('#broker-edit-phonecall-title').val();
			var phonecallDescription = $('#broker-edit-phonecall-description').val();
			var rating = edittedRating;
			var editPhonecall = new XrmServiceToolkit.Soap.BusinessEntity("phonecall",activityid);

			editPhonecall.attributes["subject"] = ""+phonecallTitle;
			editPhonecall.attributes["description"] = ""+phonecallDescription;
			editPhonecall.attributes["ilp_callrating"] = { value:rating , type: "OptionSetValue" };

			response = XrmServiceToolkit.Soap.Update(editPhonecall,function(r){
				$('#editPhonecallModal').modal('hide');				
			});
		}
	});
	
	
	
	$('#submit-broker-phonecall').click(function(){
		// adda broker phonecall	
		
		$('#broker-add-phonecall-form').addClass('was-validated');
		
		var enteredPhonecall = $('#broker-add-phonecall-form')[0].checkValidity();
		var taskAssignedTo = $('input[name=broker-phonecall-assign]:checked').val();
			
		var dateTask = new Date();
		if (enteredPhonecall){
			
			var phonecallTitle = $('#broker-phonecall-title').val();
			var phonecallDescription = $('#broker-phonecall-description').val();
			var phonecallAssignedTo = $('input[name=broker-phonecall-assign]:checked').val();		
			var datePhonecall = new Date();
			var createPhonecall = new XrmServiceToolkit.Soap.BusinessEntity("phonecall");

			var userID = Xrm.Page.context.getUserId();
			
			createPhonecall.attributes["subject"] = ""+phonecallTitle;
			createPhonecall.attributes["description"] = ""+phonecallDescription;
			createPhonecall.attributes["ilp_callrating"] = { value:callrating , type: "OptionSetValue" };
			createPhonecall.attributes["scheduledend"] = { value:dateTask , type: "DateTime" };
			
			if (taskAssignedTo=="broker-phonecall-assign-current"){
				createPhonecall.attributes["ownerid"] = {  id: '{'+userID+'}', logicalName: "systemuser", type: "EntityReference" }
			}
			else{
				createPhonecall.attributes["ownerid"] = {  id: '{'+owneridcode+'}', logicalName: "systemuser", type: "EntityReference" }
			}
			
			var fromInfo = [
				{ id: userID, logicalName: "systemuser", type: "EntityReference" } // broker Data User
			];
			createPhonecall.attributes["from"] = { value: fromInfo, type: "EntityCollection" };

			var to = [];
			to.push(
				{id: brokerID, logicalName: "account", type: "EntityReference"}
			);

			createPhonecall.attributes["to"] = { value: to, type: "EntityCollection" };				
			createPhonecall.attributes["regardingobjectid"] = { id: "{"+brokerID+"}", logicalName: "account", type: "EntityReference" }

			response = XrmServiceToolkit.Soap.Create(createPhonecall,function(r){
				 if (r != "") {
					$('#broker-add-phonecall-form').hide();
					$('.broker-phonecall-added-btn').hide();
					$('.broker-phonecall-added').fadeIn();
				}else{
					
					$('#broker-add-phonecall-form').show();
					$('.broker-phonecall-added-btn').show();
					$('.broker-phonecall-added').hide();
					alert('there was an error adding this phonecall. Try again.');
				}
			});
		}
	});
	
	
	
	
	///////////////////////////////////////////////////
	// add a contact button is clicked
	$('.addBrokerContact').click(function(){
		// adda contact
		$('#addContactModal').modal();
		$('#broker-contact-firstname').val('');
		$('#broker-contact-surname').val('');
		$('#broker-contact-email').val('');
		$('#broker-contact-mobile').val('');
		$('#broker-contact-landline').val('');
		
		
		$('#broker-add-contact-form').show();
		$('#broker-add-contact-form').removeClass('was-validated');
		$('.broker-contact-added-btn').show();		
		$('.broker-contact-added').hide();		
	});	
	
	$('#submit-broker-contact').click(function(){
		// adda contact
		$('#broker-add-contact-form').addClass('was-validated');
		var enteredContact = $('#broker-add-contact-form')[0].checkValidity();
		if (enteredContact){
			
			var contactFirst = $('#broker-contact-firstname').val();
			var contactSecond = $('#broker-contact-surname').val();
			var contactEmail = $('#broker-contact-email').val();
			var contactMobile = $('#broker-contact-mobile').val();
			var contactLandline = $('#broker-contact-landline').val();
			var contactRole = $('#broker-contact-role').val();
			console.log('contactRole '+contactRole);
			try {
				var contact = {};

				var dateTask = new Date(1900, 01, 01);
				
				contact.FirstName = contactFirst;
				contact.LastName = contactSecond;
				contact.LastName = contactSecond;
				contact.Telephone1 = contactMobile;
				contact.EMailAddress1 = contactEmail;
				contact.Telephone3 = contactLandline;
				contact.GenderCode = { Value: 2 };
				contact.ilp_Title = { Value: 1 };
				contact.ilp_Role= { Value: contactRole };
				contact.Address1_Line1 = "none";
				contact.DoNotEMail = false;
				contact.DoNotPhone = false;
				contact.BirthDate = dateTask;
				contact.ParentCustomerId = {Id: ''+brokerID+'', LogicalName: "account" };
				//contact.ilp_role = { value:contactRole , type: "OptionSetValue" };
				// contact.OwnerId = { Id: ''+am[0].id, LogicalName: "systemuser" }; 
				contact.OwnerId = { Id: ''+owneridcode+'', LogicalName: "systemuser" }; 
				XrmServiceToolkit.Rest.Create(
								contact,
								"ContactSet",
								function (result) {
									$('#broker-add-contact-form').hide();
									$('.broker-contact-added').show();									
									$('.broker-contact-added-btn').hide();									
								},
								function (error) {
									//alert('not created');
									$('#broker-add-contact-form').show();							
									$('.broker-contact-added-btn').show();	
									$('.broker-contact-added').hide();
								},
								false
				);
			}
			catch(err) {
				//console.log(err);
					var params = {};
					params["firstname"] = contactFirst;
					params["lastname"] = contactSecond;
					params["telephone1"] = contactMobile;
					params["emailaddress1"] = contactEmail;
					params["telephone3"] = contactLandline;
					params["donotemail"] = false;
					params["donotphone"] = false;
					params["parentcustomerid"] = brokerID;
					params["parentcustomeridtype"] = "account";
					params["parentcustomeridname"] = name;
					//params["parentcustomerid"] = {Id: ''+accountID+'', LogicalName: "account" };
					params["ownerid"] = owneridcode;
					//params["owneridname"] = am[0].name
					params["owneridtype"] =  "systemuser"; 
					
					Xrm.Utility.openEntityForm("contact", null, params);

					//console.log("error params: "+JSON.stringify(params));

			}
			
		}
	});
	
	
	
	
	//########################################
	// Get the query for the activitie section
	// standardise each returned piece of information so that they display correctly
	//
	
	function getActivities() {
		// var initiatives = getAccountInitiatives();
		var foundPhoneCalls = getAccountPhoneCalls(brokerID);
		var foundTasks = getAccountTasks(brokerID);
		var foundPlanActivities = getSubMasterAccountPlanActivity(codes);
		var allActivities = [];
		
		for(var i = 0; i<foundPhoneCalls.length; i++)
		{
			//console.log(JSON.stringify(foundPhoneCalls[i]));
			//console.log('\n\n');
			if (foundPhoneCalls[i].length!=0){
				allActivities.push({
					"activityType": foundPhoneCalls[i].attributes.activitytypecode.value,              
					"activityid": foundPhoneCalls[i].attributes.activityid,
					"prioritycode": foundPhoneCalls[i].attributes.prioritycode,
					"statuscode": foundPhoneCalls[i].attributes.statecode,
					"regardingobjectid": foundPhoneCalls[i].attributes.regardingobjectid,
					"description": foundPhoneCalls[i].attributes.description,
					"scheduledend": foundPhoneCalls[i].attributes.scheduledend,
					"scheduledstart": foundPhoneCalls[i].attributes.scheduledstart,
					"subject": foundPhoneCalls[i].attributes.subject,
					"createdon": foundPhoneCalls[i].attributes.createdon,
					"account": foundPhoneCalls[i].attributes['activityparty1.partyid']
				});
			}
		}
		for(var i = 0; i<foundTasks.length; i++)
		{
			//console.log(JSON.stringify(foundTasks[i]));
			//console.log('\n\n');
			if (foundTasks[i].length!=0){
			allActivities.push({
				"activityType": foundTasks[i].logicalName,              
				"activityid": foundTasks[i].attributes.activityid,
				"prioritycode": foundTasks[i].attributes.prioritycode,
				"statuscode": foundTasks[i].attributes.statuscode,
				"account": foundTasks[i].attributes.regardingobjectid,
				"description": foundTasks[i].attributes.description,
				"scheduledend": foundTasks[i].attributes.scheduledend,
				"scheduledstart": foundTasks[i].attributes.scheduledstart,
				"createdon": foundTasks[i].attributes.createdon,
				"subject": foundTasks[i].attributes.subject
			});
			}
		}
		
		for(var i = 0; i<foundPlanActivities.length; i++)
		{
			//console.log('Found plan '+i+" "+JSON.stringify(foundPlanActivities[i]));
			if (foundPlanActivities[i].length!=0){
				allActivities.push({
					
				"activityType": 'Plan',              
				"activityid": foundPlanActivities[i].attributes.ilp_planid,
				"prioritycode": '',
				"statuscode": foundPlanActivities[i].attributes.ilp_status,
				"account": foundPlanActivities[i].attributes.ownerid,
				"description": foundPlanActivities[i].attributes.ilp_plannumber,
				"scheduledend": foundPlanActivities[i].attributes.ilp_maturitydate,
				"scheduledstart": foundPlanActivities[i].attributes.ilp_startdate,
				"createdon": foundPlanActivities[i].attributes.ilp_crmlastupdatedate,
				"subject": foundPlanActivities[i].attributes.ilp_productcategory,
				"productdesc": foundPlanActivities[i].attributes.ilp_productdescription
				});
			}
		}
		
		
		//console.log('allActivities '+JSON.stringify(allActivities));
		return allActivities.sort(function(obj1, obj2) {
		// Ascending: first age less than the previous
			return obj2.createdon.value - obj1.createdon.value;
		});
		//return allActivities;
	}
	
	function getSubMasterAccountPlanActivity(c){
		var resultPlanActivity = [''];
		var maxlength = 8;
		
		var counter = (c.length>maxlength) ? maxlength : c.length;
		//console.log('counter '+counter);
		for(var i = 0; i<counter; i++)
		{
			var x = getAccountPlanActivity(c[i].sellercode);
			
			if(x.length>=1){
				for(var y=0; y<x.length; y++){
					resultPlanActivity.push(x[y]);
				}
			}
		}
		return resultPlanActivity;
		//console.log('\n########\n');
		//JSON.stringify(resultPlanActivity);
	}
	$(document).ready(function() {
	// on page load show this 
		
		codes = getAccountHierarchy(brokerID,name);
		//console.log(JSON.stringify(codes));
		//console.log(codes.length);
		var h='';
		for(var i = 0; i<codes.length; i++)
		{
			h += codes[i].sellercode+" ";
		}
		$('.broker-sellercode-assoc').html("&nbsp;( "+h+")");
		showBrokerActivity();
		
	});
})(jQuery); // End of use strict


