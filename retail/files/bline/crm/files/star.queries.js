function getFilterQuery(areaDublin, areaWest, areaSouth, areaNone, propPlatform ,propBrokersource, propOnesource, propCore,finPlanner ,profBroker, transBroker,segNone,f4f20,f4f80,spsflat,spslow,spsmix,spsnoset,spshigh,spsunknown,valueTP,valueTpos,valueTe,valueTv,valueTr,valueTu,myBrokersOnly,sowapea,sowapeb,sowapec,sowaped,sowapee,sowapef,sowapeg,sowapeh,sowapei,sowapej,sowapek,sowapel,sowapeUnknown){
		
		

		var filterAreaDublin = '';

		  $.each(settings.Dublin, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					filterAreaDublin += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });

		var filterAreaWest = '';
		  $.each(settings.West, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					filterAreaWest += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });

		var filterAreaSouth = '';
		  $.each(settings.South, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					filterAreaSouth += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });

		/*
		console.log("filterAreaDublin: "+filterAreaDublin);
		console.log("\n\n ");
		console.log("filterAreaWest: "+filterAreaWest);
		console.log("\n\n ");
		console.log("filterAreaSouth: "+filterAreaSouth);
		console.log("\n\n ");
		*/
		
		var areaCondition = '';
		var areaNoneCondition = '';
		if(areaDublin || areaWest || areaSouth)
		{
			areaCondition = '<condition attribute="ownerid" operator="in">';
			if(areaDublin){
				areaCondition += filterAreaDublin;
			}
			if(areaWest){
				areaCondition += filterAreaWest;
			}
			if(areaSouth){
				areaCondition += filterAreaSouth;
			}
			areaCondition += '</condition>';
		}
		
		if(areaNone) {
			areaNoneCondition = '<condition attribute="ownerid" operator="not-in">';
				areaNoneCondition += filterAreaDublin;
				areaNoneCondition += filterAreaWest;
				areaNoneCondition += filterAreaSouth;
			areaNoneCondition += '</condition>';
		}	
		
		
		////////////////////////////
		// Is it core, platform, brokersource, onesource
		/////////////////////////////
		//propPlatform ,propBrokersource, propOnesource, propCore
		
		var myBrokersOnlyCondition = '';
		if(myBrokersOnly)
		{
			myBrokersOnlyCondition = '<condition attribute="ownerid" operator="eq-userid" />';
			
		}
		
		////////////////////////////
		// Is it core, platform, brokersource, onesource
		/////////////////////////////
		//propPlatform ,propBrokersource, propOnesource, propCore
		
		var propCondition = '';
		if(propPlatform || propBrokersource || propOnesource || propCore)
		{
			
			propCondition = '<condition attribute="ilp_brokersegment" operator="in">';
			
			if (propPlatform){
				propCondition += '<value>857190003</value>';
			}
			if (propBrokersource){
				propCondition += '<value>857190000</value>';
			}
			if (propCore){
				propCondition += '<value>857190002</value>';
			}
			if (propOnesource){
				propCondition += '<value>857190001</value>';
			}
			
			propCondition += '</condition>';
		}
		
		
		////////////////////////////
		// Select Broker Segment - Financial Planner, Professional or transactional
		/////////////////////////////
		var segmentCondition = '';
		if(finPlanner || profBroker || transBroker)
		{
			
			segmentCondition = '<condition attribute="ilp_f4fsegment" operator="in">';
			
			if (finPlanner){
				segmentCondition += '<value>857190000</value>';
			}
			if (profBroker){
				segmentCondition += '<value>857190001</value>';
			}
			if (transBroker){
				segmentCondition += '<value>857190002</value>';
			}
			
			segmentCondition += '</condition>';
		}	
		var segmentConditionNone = '';
		if(segNone)
		{
			
			segmentConditionNone = '<condition attribute="ilp_f4fsegment" operator="not-in">';
			
				segmentConditionNone += '<value>857190000</value>';
				segmentConditionNone += '<value>857190001</value>';
				segmentConditionNone += '<value>857190002</value>';
			
			segmentConditionNone += '</condition>';
		}
		
		////////////////////////////
		// Select Broker Value Tier
		/////////////////////////////
		valueTP,valueTpos,valueTe,valueTv,valueTr,valueTu
		var valueTSegment = '';
		if(valueTP || valueTpos || valueTe || valueTv || valueTr)
		{
			
			valueTSegment = '<condition attribute="ilp_brokervaluetier" operator="in">';
			
			if (valueTP){
				valueTSegment += '<value>857190000</value>';
			}
			if (valueTpos){
				valueTSegment += '<value>857190001</value>';
			}
			if (valueTe){
				valueTSegment += '<value>857190002</value>';
			}
			if (valueTv){
				valueTSegment += '<value>857190003</value>';
			}
			if (valueTr){
				valueTSegment += '<value>857190004</value>';
			}
			
			valueTSegment += '</condition>';
		}	
		var valueTSegmentNone = '';
		if(valueTu)
		{
			valueTSegmentNone +=  '<condition attribute="ilp_brokervaluetier" operator="eq" value="857190005" />';
			valueTSegmentNone +=  '<condition attribute="ilp_brokervaluetier" operator="null" />';
		}
		
		
		
		
		/*
		////////////////////////////
		// Select Broker BCG 
		/////////////////////////////
		var bcgCondition = '';
		if(bcgCC || bcgRH || bcgKH || bcgFO || bcgG || bcgI || bcgILM || bcgQLM)
		{
			
			bcgCondition = '<condition attribute="ilp_bcgclassification" operator="in">';
			
			if (bcgCC){
				bcgCondition += '<value>857190008</value>';
			}
			if (bcgRH){
				bcgCondition += '<value>857190003</value>';
			}
			if (bcgKH){
				bcgCondition += '<value>857190001</value>';
			}
			if (bcgFO){
				bcgCondition += '<value>857190000</value>';
			}
			if (bcgG){
				bcgCondition += '<value>857190002</value>';
			}
			if (bcgI){
				bcgCondition += '<value>857190004</value>';
			}
			if (bcgILM){
				bcgCondition += '<value>857190005</value>';
			}
			if (bcgQLM){
				bcgCondition += '<value>857190006</value>';
			}
			
			bcgCondition += '</condition>';
		}	
		var bcgConditionNone = '';
		if(bcgNone)
		{
			bcgConditionNone = '<condition attribute="ilp_bcgclassification" operator="null" />';
		}
		*/
		
		////////////////////////////
		// Fit for future fields - f4f20,f4f80
		/////////////////////////////
		var f4fCondition = '';

		if(f4f20)
		{
			
			f4fCondition = '<condition attribute="ilp_paretoprinciple" operator="eq" value="1" />';
			
		}	
		var f4fConditionNone = '';
		if(f4f80)
		{
			f4fConditionNone = '<condition attribute="ilp_paretoprinciple" operator="eq" value="0" />'+
				'<condition attribute="ilp_paretoprinciple" operator="null" />';
			
		}
		
		////////////////////////////
		// Favoured SP Shapes
		/////////////////////////////
		var spShapesCondition = '';
		if(spsflat || spslow || spsmix || spsnoset || spshigh )
		{ 
			spShapesCondition = '<condition attribute="ilp_favouredspshape" operator="in">';
			
			if (spsflat){
				spShapesCondition += '<value>857190000</value>';
			}
			if (spslow){
				spShapesCondition += '<value>857190001</value>';
			}
			if (spsmix){
				spShapesCondition += '<value>857190002</value>';
			}
			if (spsnoset){
				spShapesCondition += '<value>857190003</value>';
			}
			if (spshigh){
				spShapesCondition += '<value>857190004</value>';
			}
			
			spShapesCondition += '</condition>';

			
		}
		
		var spShapesConditionNone = '';
		if(spsunknown)
		{
			spShapesConditionNone = '<condition attribute="ilp_favouredspshape" operator="null" />';
			
		}
		
		
		////////////////////////////
		// Estimated Size of wallet
		/////////////////////////////
		var sowapeCondition = ''; 
		if(sowapea || sowapeb || sowapec || sowaped || sowapee || sowapef || sowapeg || sowapeh || sowapei || sowapej || sowapek || sowapel )
		{ 
			sowapeCondition = '<condition attribute="ilp_estimatedsizeofwalletape" operator="in">';
			
			if (sowapea){
				sowapeCondition += '<value>857190000</value>';
			}
			if (sowapeb){
				sowapeCondition += '<value>857190001</value>';
			}
			if (sowapec){
				sowapeCondition += '<value>857190002</value>';
			}
			if (sowaped){
				sowapeCondition += '<value>857190003</value>';
			}
			if (sowapee){
				sowapeCondition += '<value>857190004</value>';
			}
			if (sowapef){
				sowapeCondition += '<value>857190005</value>';
			}
			if (sowapeg){
				sowapeCondition += '<value>857190006</value>';
			}
			if (sowapeh){
				sowapeCondition += '<value>857190007</value>';
			}
			if (sowapei){
				sowapeCondition += '<value>857190008</value>';
			}
			if (sowapej){
				sowapeCondition += '<value>857190009</value>';
			}
			if (sowapek){
				sowapeCondition += '<value>857190010</value>';
			}
			if (sowapel){
				sowapeCondition += '<value>857190011</value>';
			}
			
			sowapeCondition += '</condition>';

			
		}
		
		
		var sowapeNoneCondition = '';
		if(sowapeUnknown)
		{
			sowapeNoneCondition = '<condition attribute="ilp_estimatedsizeofwalletape" operator="null" />';
			
		}
		
		
		
		
		
		
		
		
		// if the account manager name is selected then add that name as a filter too
		
		var amIDCondition = '';			
		var amIDCount=0;
		amIDCondition = '<condition attribute="ownerid" operator="in">';
		$('.filter-am:checkbox:checked').each(function(i, obj) {
			var isChecked = (this.checked ? $(this).val() : "");
			//console.log('name/id: '+$(this).data( "amname" )+' '+$(this).data( "amid" ));
			amIDCondition +='<value uiname="'+$(this).data( "amname" )+'" uitype="systemuser">{'+$(this).data( "amid" )+'}</value>';
			amIDCount++;
		});
		amIDCondition +='</condition>';
		if(amIDCount<=0){
			
			amIDCondition='';
		}
		
		
		var queryBuild='<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
						  '<entity name="account">'+
							'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
							'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
							'<attribute name="ilp_thisyeargrandtotalytdape" />'+
							'<attribute name="ilp_lastyeargrandtotalytdape" />'+
							'<attribute name="name" />'+
							'<attribute name="accountid" />'+
							'<attribute name="ilp_warning" />'+
							'<attribute name="ilp_warningdetails" />'+
							'<attribute name="ilp_companylogo" />'+
							'<attribute name="ownerid" />'+
							'<order attribute="name" descending="false" />'+
							'<filter type="and">'+
							  '<condition attribute="statecode" operator="eq" value="0" />'+
								'<filter type="or">'+
									sowapeCondition+
									sowapeNoneCondition+
								'</filter>'+
								'<filter type="or">'+
									amIDCondition+
								'</filter>'+
								'<filter type="or">'+
									areaCondition+
									areaNoneCondition+
								'</filter>'+
								propCondition+
								'<filter type="or">'+
									segmentCondition+
									segmentConditionNone+
								'</filter>'+
								'<filter type="or">'+
									valueTSegment+
									valueTSegmentNone+
								'</filter>'+
								'<filter type="or">'+
									f4fCondition+
									f4fConditionNone+
								'</filter>'+
								'<filter type="or">'+
									spShapesCondition+
									spShapesConditionNone+
								'</filter>'+
								myBrokersOnlyCondition+
							  '<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
							'</filter>'+
						  '</entity>'+
						'</fetch>';

		//console.log(queryBuild);
		var foundAccounts = XrmServiceToolkit.Soap.Fetch(queryBuild);
	//	console.log("\n marketingLists "+JSON.stringify(foundAccounts));
		var filteredAccounts=[];
		for(var i = 0; i<foundAccounts.length; i++)
		{
			filteredAccounts.push({
				"name": foundAccounts[i].attributes.name,              
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"ownerid": foundAccounts[i].attributes.ownerid,
				"logoURL": foundAccounts[i].attributes.ilp_companylogo
			});
		}
		
		return filteredAccounts;

	}
	function getAccountInfo(id){

		
		var cols = ["name","ownerid","ilp_companylogo","address1_line2","address1_line3","address1_line1","ilp_county","ilp_thisyeargrandtotalytdape","ilp_brokermasterreference","accountid","ilp_warning","ilp_warningdetails","ilp_thisyeargrandtotalytdmargin","ilp_lastyeargrandtotalytdmargin","ilp_lastyeargrandtotalytdape","ilp_thisyearprotectionytdape","ilp_thisyearprotectionytdmargin","ilp_thisyearpensionapytdape","ilp_thisyearpensionapytdmargin","ilp_thisyearpensionspytdape","ilp_lastyearprotectionytdape","ilp_lastyearprotectiontotalape","ilp_lastyearprotectionytdmargin","ilp_lastyearprotectiontotalmargin","ilp_lastyearpensionapytdape","ilp_lastyearpensionaptotalape","ilp_lastyearpensionapytdmargin","ilp_lastyearpensionaptotalmargin","ilp_lastyearpensionspytdape","ilp_lastyearpensionsptotalape","ilp_thisyearpensionspytdmargin","ilp_lastyearpensionspytdmargin","ilp_lastyearpensionsptotalmargin","ilp_thisyearbondsytdape","ilp_lastyearbondsytdape","ilp_lastyearbondstotalape","ilp_thisyearbondsytdmargin","ilp_lastyearbondsytdmargin","ilp_lastyearbondstotalmargin","ilp_thisyearsavingsytdape","ilp_lastyearsavingsytdape","ilp_lastyearsavingstotalape","ilp_thisyearsavingsytdmargin","ilp_lastyearsavingsytdmargin","ilp_lastyearsavingstotalmargin","ilp_thisyearcorporatebusinessytdape","ilp_lastyearcorporatebusinessytdape","ilp_lastyearcorporatebusinesstotalape","ilp_thisyearcorporatebusinessytdmargin","ilp_lastyearcorporatebusinessytdmargin","ilp_lastyearcorporatebusinesstotalmargin","ilp_twitter","ilp_facebook","ilp_linkedin","websiteurl","ilp_brokertype","ilp_favouredspshape","ilp_gearedforgrowth","ilp_estimatedsizeofwalletape","ilp_protectioninterest","ilp_pensionsinterest","ilp_investmentinterest","ilp_mapsinterest","ilp_complianceinterest","ilp_socialmediainterest","ilp_f4fsegment","ilp_3yp","ilp_potentialscore","ilp_paretoprinciple","ilp_bcgclassification","ilp_pgsbclassification","ilp_volumenumberofcases","ilp_lastyearvolumenumberofcases","ilp_pensionsscore","ilp_investmentsscore","ilp_emailscore","ilp_calculatorsscore","ilp_researchscore","ilp_sifscore","ilp_protectionscore","ilp_compliancescore","ilp_webinarscore","ilp_newsscore","ilp_mapsscore","ilp_otherscore","ilp_campaignbscore","ilp_campaigndscore","ilp_digitalactivityscore"];
		var retrievedAccount = XrmServiceToolkit.Soap.Retrieve("account", id, cols);
		//console.log('\n Getaccountinfo: '+JSON.stringify(retrievedAccount)+'\n\n');
		return retrievedAccount;
		
	}

	function getPhoneCallInfo(){
		// 'C7C9B1EB-F583-E711-96A6-0050569A001B'
		
		var cols = ["subject","to"];
		var retrievedPhoneCall = XrmServiceToolkit.Soap.Retrieve("phonecall", id, cols);
		return retrievedPhoneCall;
		
	}

	function getMyMarketingLists(){


		var marketingLists = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
								'<entity name="list">'+
								'<attribute name="listname" />'+
								'<attribute name="purpose" />'+
								'<attribute name="type" />'+
								'<attribute name="createdfromcode" />'+
								'<attribute name="listid" />'+
								'<attribute name="createdon" />'+
								'<order attribute="listname" descending="false" />'+
									'<filter type="and">'+
									  '<condition attribute="ownerid" operator="eq-userid" />'+
									 '<condition attribute="statecode" operator="eq" value="0" />'+
									'</filter>'+
								  '</entity>'+
								'</fetch>';

				//console.log("query "+query);
		var foundMarketingLists = XrmServiceToolkit.Soap.Fetch(query);
		//console.log("\n marketingLists "+JSON.stringify(foundMarketingLists));

		for(var i = 0; i<foundMarketingLists.length; i++)
		{
			
			marketingLists.push({
				"listname": foundMarketingLists[i].attributes.listname,              
				"listtype": foundMarketingLists[i].attributes.type,
				"listid": foundMarketingLists[i].attributes.listid
			});
		}
		
		return marketingLists;	
	}
	function findSeller(sellerCode) {

		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_brokerageparentaccount" />'+
					'<order attribute="name" descending="false" />'+
					  '<filter type="and">'+
					  '<condition attribute="il_referencecode" operator="eq" value="'+sellerCode+'" />'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';
				

			//console.log(query);

		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"parentaccount": foundAccounts[i].attributes.ilp_brokerageparentaccount
			});
		}
		
		return accountInfo;
	}
	function findBrokerName(brokerName) {

		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_brokerageparentaccount" />'+
					'<order attribute="name" descending="false" />'+
					  '<filter type="and">'+
					  '<condition attribute="name" operator="like" value="%'+brokerName+'%" />'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';
				

			console.log(query);

		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);

			console.log("foundAccounts "+foundAccounts);
		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"parentaccount": foundAccounts[i].attributes.ilp_brokerageparentaccount
			});
		}
		
		return accountInfo;
	}

	function getAccountsBySegment(segmentID) {

		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_thisyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdape" />'+
					'<attribute name="name" />'+
					'<attribute name="accountid" />'+
					'<attribute name="ilp_warning" />'+
					'<attribute name="ilp_warningdetails" />'+
					'<attribute name="ilp_companylogo" />'+
					'<order attribute="name" descending="false" />'+
					'<filter type="and">'+
					  '<condition attribute="ilp_brokersegment" operator="eq" value="'+segmentID+'" />'+
					  '<condition attribute="ilp_brokeraccounttype" operator="in">'+
						//'<value>273220000</value>'+
						'<value>857190000</value>'+
					  '</condition>'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';

				//console.log("query "+query);
		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);
				//console.log("foundAccounts "+JSON.stringify(foundAccounts));

		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"name": foundAccounts[i].attributes.name,              
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"logoURL": foundAccounts[i].attributes.ilp_companylogo
			});
		}
		
		return accountInfo;
	}

	function getAccountsByID(ID) {

		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_thisyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdape" />'+
					'<attribute name="name" />'+
					'<attribute name="accountid" />'+
					'<attribute name="ilp_warning" />'+
					'<attribute name="ilp_warningdetails" />'+
					'<attribute name="ilp_companylogo" />'+
					'<order attribute="name" descending="false" />'+
					'<filter type="and">'+
					  '<condition attribute="ilp_brokersegment" operator="eq" value="'+segmentID+'" />'+
					  '<condition attribute="ilp_brokeraccounttype" operator="in">'+
						'<value>273220000</value>'+
						'<value>857190000</value>'+
					  '</condition>'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';

		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"name": foundAccounts[i].attributes.name,              
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"logoURL": foundAccounts[i].attributes.ilp_companylogo
			});
		}
		
		return accountInfo;
	}





	function getAllBrokers() {

		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_thisyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdape" />'+
					'<attribute name="name" />'+
					'<attribute name="accountid" />'+
					'<attribute name="ilp_warning" />'+
					'<attribute name="ilp_warningdetails" />'+
					'<order attribute="name" descending="false" />'+
					'<filter type="and">'+
					  '<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';

		//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"name": foundAccounts[i].attributes.name,              
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin
			});
		}
		
		return accountInfo;
	}
	function getNotifyUsersDetails(){
		// userInfo
		if(userInfo.length==0){
			var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
					  '<entity name="systemuser">'+
						'<attribute name="fullname" />'+
						'<attribute name="systemuserid" />'+
						'<attribute name="internalemailaddress" />'+
						'<attribute name="businessunitid" />'+
						'<order attribute="fullname" descending="false" />'+
						'<filter type="and">'+
						  '<filter type="or">'+
							'<condition attribute="businessunitid" operator="in">'+
							  '<value uiname="Broker Source" uitype="businessunit">{ED25A99A-6FE1-E611-86BC-005056A13829}</value>'+
							  '<value uiname="Brokerage" uitype="businessunit">{618CEA30-A03C-E311-9764-0050569957AC}</value>'+
							  '<value uiname="Core" uitype="businessunit">{A912FEB2-6FE1-E611-86BC-005056A13829}</value>'+
							  '<value uiname="OneSource" uitype="businessunit">{163BD8A6-6FE1-E611-86BC-005056A13829}</value>'+
							'</condition>'+
							'<condition attribute="ilp_teamshareid" operator="eq" uiname="Executive Manager Authorisations Team" uitype="team" value="{53F04A8E-2FAC-E211-86EA-005056993989}" />'+
							'<condition attribute="ilp_teamshareid_2" operator="eq" uiname="Executive Manager Authorisations Team" uitype="team" value="{53F04A8E-2FAC-E211-86EA-005056993989}" />'+
							'<condition attribute="ilp_teamshareid_3" operator="eq" uiname="Executive Manager Authorisations Team" uitype="team" value="{53F04A8E-2FAC-E211-86EA-005056993989}" />'+
						  '</filter>'+
						'</filter>'+
					  '</entity>'+
					'</fetch>';


			//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
			var foundUsers = XrmServiceToolkit.Soap.Fetch(query);
			
			for(var i = 0; i<foundUsers.length; i++)
			{
				userInfo.push({
					"name": (foundUsers[i].attributes.fullname) ? foundUsers[i].attributes.fullname.value : "",              
					"id": (foundUsers[i].attributes.systemuserid) ? foundUsers[i].attributes.systemuserid.value : "",              
					"email": (foundUsers[i].attributes.internalemailaddress) ? foundUsers[i].attributes.internalemailaddress.value : "",
					"businessunitid": (foundUsers[i].attributes.businessunitid) ? foundUsers[i].attributes.businessunitid.name : ""
				});
			}
		}
			//return userInfo;
	}



	function getAccountContacts(accountID) {
		
		var accountID = $('.account-display').data();
		
		var accountContacts = [];

		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="contact">'+
			'<attribute name="fullname" />'+
			'<attribute name="telephone1" />'+
			'<attribute name="emailaddress1" />'+
			'<attribute name="ilp_role" />'+
			'<order attribute="fullname" descending="false" />'+
			'<filter type="and">'+
			  '<condition attribute="parentcustomerid" operator="eq" uitype="account" value="{'+accountID.id+'}" />'+
			  '<condition attribute="statecode" operator="eq" value="0" />'+
			'</filter>'+
		  '</entity>'+
		'</fetch>';
		
		//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
		var foundContacts = XrmServiceToolkit.Soap.Fetch(query);

		
		for(var i = 0; i<foundContacts.length; i++)
		{
			accountContacts.push({
				"fullname": foundContacts[i].attributes.fullname,              
				"emailaddress1": foundContacts[i].attributes.emailaddress1,
				"telephone1": foundContacts[i].attributes.telephone1,
				"role": foundContacts[i].attributes.ilp_role,
				"contactid": foundContacts[i].attributes.contactid
			});
		}
		
		return accountContacts;
	}



	function getBrokerageEvents(){
		
		
		var myEvents = [];
		
		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
						'<entity name="ilp_event">'+
						'<attribute name="ilp_title" />'+
						'<attribute name="ilp_startdate" />'+
						'<attribute name="ilp_location" />'+
						'<attribute name="ilp_ragstatus" />'+
						'<attribute name="ilp_eventtype" />'+
						'<attribute name="ilp_eventaudiencesize" />'+
						'<attribute name="ilp_eventaudiencemix" />'+
						'<attribute name="ownerid" />'+
						'<attribute name="ilp_eventid" />'+
						'<order attribute="ilp_startdate" descending="false" />'+
						'<filter type="and">'+
						 '<condition attribute="ilp_ragstatus" value="857190003" operator="ne"/>'+
						'</filter>'+
					  '</entity>'+
					'</fetch>';

		var foundEvents = XrmServiceToolkit.Soap.Fetch(query);
		//console.log(JSON.stringify(foundEvents));
		for(var i = 0; i<foundEvents.length; i++)
		{
			myEvents.push({
				"id": foundEvents[i].attributes.ilp_eventid,              
				"title": foundEvents[i].attributes.ilp_title,
				"date": foundEvents[i].attributes.ilp_startdate,
				"type": foundEvents[i].attributes.ilp_eventtype,
				"rag": foundEvents[i].attributes.ilp_ragstatus,
				"mix": foundEvents[i].attributes.ilp_eventaudiencemix,
				"size": foundEvents[i].attributes.ilp_eventaudiencesize,
				"location": foundEvents[i].attributes.ilp_location,
				"owner": foundEvents[i].attributes.ownerid
			});
		}

		return myEvents;
	}

	function getMyTasks() {
		
		var myTasks = [];
		
		var myPhoneCallsQuery = 
								'<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" >'+
									'<entity name="phonecall" >'+
										'<attribute name="subject" />'+
										'<attribute name="scheduledstart" />'+
										'<attribute name="scheduledend" />'+
										'<attribute name="activitytypecode" />'+
										'<attribute name="regardingobjectid" />'+
										'<attribute name="prioritycode" />'+
										'<attribute name="activityid" />'+
										'<attribute name="description" />'+
										'<order attribute="subject" descending="false" />'+
										'<link-entity name="activityparty" to="activityid" from="activityid" link-type="outer" >'+
											'<attribute name="participationtypemask" />'+
											'<attribute name="partyid"  />'+
											'<attribute name="partyidname" />'+
											   '<filter>'+
												  '<condition attribute="participationtypemask" operator="eq" value="2" />'+
												'</filter>'+
									   '</link-entity>'+
										'<filter type="and">'+
											'<condition attribute="statecode" operator="eq" value="0" />'+
											'<condition attribute="ownerid" operator="eq-userid" />'+
										'</filter>'+
									'</entity>'+
								'</fetch>';
		
		
		
		
		var foundPhoneCalls = XrmServiceToolkit.Soap.Fetch(myPhoneCallsQuery);

		for(var i = 0; i<foundPhoneCalls.length; i++)
		{
			//console.log(JSON.stringify(foundPhoneCalls[i]));
			myTasks.push({
				"activityType": foundPhoneCalls[i].attributes.activitytypecode.value,              
				"activityid": foundPhoneCalls[i].attributes.activityid,
				"prioritycode": foundPhoneCalls[i].attributes.prioritycode,
				"regardingobjectid": foundPhoneCalls[i].attributes.regardingobjectid,
				"description": foundPhoneCalls[i].attributes.description,
				"scheduledend": foundPhoneCalls[i].attributes.scheduledend,
				"scheduledstart": foundPhoneCalls[i].attributes.scheduledstart,
				"subject": foundPhoneCalls[i].attributes.subject,
				"account": foundPhoneCalls[i].attributes['activityparty1.partyid']
			});
		}
		
		
		
		var myTasksQuery = 
								'<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
								  '<entity name="task">'+
									'<attribute name="subject" />'+
									'<attribute name="description" />'+
									'<attribute name="prioritycode" />'+
									'<attribute name="scheduledend" />'+
									'<attribute name="regardingobjectid" />'+
									'<attribute name="activityid" />'+
									'<order attribute="scheduledend" descending="false" />'+
									'<filter type="and">'+
									  '<condition attribute="statecode" operator="eq" value="0" />'+
									  '<condition attribute="ownerid" operator="eq-userid" />'+
									'</filter>'+
										'<link-entity name="account" from="accountid" to="regardingobjectid" alias="ab">'+
										  '<attribute name="accountid" />'+
										  '<attribute name="name" />'+
										'</link-entity>'+
								  '</entity>'+
								'</fetch>';
									
		
		
		
		var foundTasks = XrmServiceToolkit.Soap.Fetch(myTasksQuery);

		for(var i = 0; i<foundTasks.length; i++)
		{
			//console.log(JSON.stringify(foundTasks[i]));
			//console.log('\n\n');
			myTasks.push({
				"activityType": foundTasks[i].logicalName,              
				"activityid": foundTasks[i].attributes.activityid,
				"prioritycode": foundTasks[i].attributes.prioritycode,
				"account": foundTasks[i].attributes.regardingobjectid,
				"description": foundTasks[i].attributes.description,
				"scheduledend": foundTasks[i].attributes.scheduledend,
				"scheduledstart": foundTasks[i].attributes.scheduledstart,
				"subject": foundTasks[i].attributes.subject
			});
		}
		
		
		
			var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="activitypointer">'+
			'<attribute name="subject" />'+
			'<attribute name="scheduledstart" />'+
			'<attribute name="scheduledend" />'+
			'<attribute name="activitytypecode" />'+
			'<attribute name="instancetypecode" />'+
			'<attribute name="prioritycode" />'+
			'<attribute name="regardingobjectid" />'+
			'<attribute name="activityid" />'+
			'<attribute name="description" />'+
			'<order attribute="scheduledstart" descending="true" />'+
			'<filter type="and">'+
			  '<condition attribute="statecode" operator="in">'+
				'<value>0</value>'+
				'<value>3</value>'+
			  '</condition>'+
			  '<condition attribute="ownerid" operator="eq-userid" />'+
			'</filter>'+
			'<link-entity name="campaign" from="campaignid" to="regardingobjectid" visible="false" link-type="outer" alias="a_791ad554d1aa4798bac5c31d33dd696c">'+
			  '<attribute name="name" />'+
			'</link-entity>'+
		  '</entity>'+
		'</fetch>'
		
		return myTasks;
	}

	function getMyContacts() {
		
		var myContacts = [];
		
		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="contact">'+
			'<attribute name="fullname" />'+
			'<attribute name="telephone1" />'+
			'<attribute name="emailaddress1" />'+
			'<attribute name="parentcustomerid" />'+
			'<attribute name="ilp_role" />'+
			'<order attribute="fullname" descending="false" />'+
			'<filter type="and">'+
			  '<condition attribute="ownerid" operator="eq-userid" />'+
			  '<condition attribute="statecode" operator="eq" value="0" />'+
			'</filter>'+
		  '</entity>'+
		'</fetch>';
		
		//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
		var foundContacts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundContacts.length; i++)
		{
			myContacts.push({
				"fullname": foundContacts[i].attributes.fullname,              
				"broker": foundContacts[i].attributes.parentcustomerid,
				"emailaddress1": foundContacts[i].attributes.emailaddress1,
				"telephone1": foundContacts[i].attributes.telephone1,
				"role": foundContacts[i].attributes.ilp_role,
				"contactid": foundContacts[i].attributes.contactid
			});
		}
		
		return myContacts;
	}

	function getMyPartners() {

		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_thisyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdape" />'+
					'<attribute name="name" />'+
					'<attribute name="accountid" />'+
					'<attribute name="ilp_warning" />'+
					'<attribute name="ilp_warningdetails" />'+
					'<order attribute="name" descending="false" />'+
					'<filter type="and">'+
					  '<condition attribute="ownerid" operator="eq-userid" />'+
					  //'<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+				  
					  '<condition attribute="ilp_brokeraccounttype" operator="in">'+
						'<value>273220000</value>'+
						'<value>857190000</value>'+
					  '</condition>'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';

		//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"name": foundAccounts[i].attributes.name,              
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin
			});
		}
		
		return accountInfo;
	}


	function getCoreBrokers() {
		
		var accountInfo = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_thisyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdape" />'+
					'<attribute name="name" />'+
					'<attribute name="accountid" />'+
					'<attribute name="ilp_warning" />'+
					'<attribute name="ilp_warningdetails" />'+
					'<attribute name="ilp_companylogo" />'+
					'<order attribute="name" descending="false" />'+
					'<filter type="and">'+
						'<condition attribute="ilp_brokersegment" operator="eq" value="857190002" />'+
							'<condition attribute="ilp_brokeraccounttype" operator="in">'+
							'<value>273220000</value>'+
							'<value>857190000</value>'+
						'</condition>'+
					'</filter>'+
				  '</entity>'+
				'</fetch>';

		//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"name": foundAccounts[i].attributes.name,              
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin
			});
		}
		
		return accountInfo;
	}




	function findContact(searchTerm) {
		var searchContacts = [];
		var searchFilter='';
		
		searchTerm = searchTerm.replace(/'/g, '%');
		searchTerm = escapeHtml(searchTerm);
		
		if (isValidEmailAddress(searchTerm)){
			searchFilter = 
			'<condition attribute="emailaddress1" operator="eq" value="'+searchTerm+'" />';
		}
		else{
			searchFilter = 
			'<condition attribute="fullname" operator="like" value="%'+searchTerm+'%" />';
		}
		
		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="contact">'+
			'<attribute name="fullname" />'+
			'<attribute name="telephone1" />'+
			'<attribute name="emailaddress1" />'+
			'<attribute name="parentcustomerid" />'+
			'<attribute name="ilp_role" />'+
			'<order attribute="fullname" descending="false" />'+
				'<filter type="and">'+
				  '<filter type="or">'+
				  searchFilter+
				  '</filter>'+
				'</filter>'+
				'<link-entity name="account" from="accountid" to="parentcustomerid" visible="false" link-type="outer" alias="a_dc9b80f8c78146d89fd6a3b610836975">'+
				  '<attribute name="name" />'+
				  '<attribute name="ilp_brokersegment" />'+
				'</link-entity>'+
				'<link-entity name="systemuser" from="systemuserid" to="owninguser" alias="ai">'+
				  '<filter type="and">'+
					'<condition attribute="businessunitid" operator="in">'+
					  '<value uiname="Brokerage" uitype="businessunit">{618CEA30-A03C-E311-9764-0050569957AC}</value>'+
					  '<value uiname="Broker Source" uitype="businessunit">{ED25A99A-6FE1-E611-86BC-005056A13829}</value>'+
					  '<value uiname="Core" uitype="businessunit">{A912FEB2-6FE1-E611-86BC-005056A13829}</value>'+
					  '<value uiname="OneSource" uitype="businessunit">{163BD8A6-6FE1-E611-86BC-005056A13829}</value>'+
					'</condition>'+
				  '</filter>'+
				'</link-entity>'+		
		  '</entity>'+
		'</fetch>';
		

		//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
		var foundContacts = XrmServiceToolkit.Soap.Fetch(query);

		for(var i = 0; i<foundContacts.length; i++)
		{
			searchContacts.push({
				"fullname": foundContacts[i].attributes.fullname,              
				"emailaddress1": foundContacts[i].attributes.emailaddress1,
				"telephone1": foundContacts[i].attributes.telephone1,
				"role": foundContacts[i].attributes.ilp_role,      
				"broker": foundContacts[i].attributes.parentcustomerid,
				"contactid": foundContacts[i].attributes.contactid
			});
		}
		return searchContacts;
	}


	function retrieveAllAccountInteractionTasks(){
		// an interaction is an initiative or task or other version of the same thing
		
		// $('#show-all-interaction-list').html('');

		var allQuery = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
					  '<entity name="task">'+
						'<attribute name="subject" />'+
						'<attribute name="ownerid" />'+
						'<attribute name="prioritycode" />'+
						'<attribute name="scheduledend" />'+
						'<attribute name="statuscode" />'+
						'<attribute name="activityid" />'+
						'<attribute name="description" />'+
						'<attribute name="regardingobjectid" />'+
						'<order attribute="subject" descending="false" />'+
						'<filter type="and">'+
						  '<condition attribute="statecode" operator="not-null" />'+
						'</filter>'+
						'<link-entity name="ilp_initiative" from="ilp_initiativeid" to="regardingobjectid" alias="ah">'+
						  '<attribute name="ilp_accountid" />'+
						  '<filter type="and">'+
							'<condition attribute="ilp_initiativeid" operator="not-null" />'+
						  '</filter>'+
						'</link-entity>'+
					  '</entity>'+
					'</fetch>';

		var fetchedInteractions = XrmServiceToolkit.Soap.Fetch(allQuery);		
		
		return fetchedInteractions;
	}


	function retrieveAllAccountInteractions(){

		var allQuery = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
						  '<entity name="ilp_initiative">'+
							'<filter type="and">'+
							  '<condition attribute="statecode" operator="in">'+
								'<value>0</value>'+
								'<value>1</value>'+
							  '</condition>'+
							'</filter>'+
							'<order attribute="createdon" descending="true" />'+
							'<link-entity name="account" from="accountid" to="ilp_accountid" alias="ab">'+
							  '<filter type="and">'+
								'<condition attribute="ilp_brokersegment" operator="eq" value="857190003" />'+
							 ' </filter>'+
							'</link-entity>'+
						'  </entity>'+
						'</fetch>';

		var fetchedContacts = XrmServiceToolkit.Soap.Fetch(allQuery);		
		
		return fetchedContacts;
	}







	////////////////////////////////////////////////////////////////////////////////////////
	// This query will retrive all the tasks relating to initiatives for a specifc account
	////
	function retrieveSpecificAccountTasks(accountID){
		// an interaction is an initiative or task or other version of the same thing
		

		var allQuery = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
					  '<entity name="task">'+
						'<attribute name="subject" />'+
						'<attribute name="ownerid" />'+
						'<attribute name="prioritycode" />'+
						'<attribute name="scheduledend" />'+
						'<attribute name="statuscode" />'+
						'<attribute name="activityid" />'+
						'<attribute name="description" />'+
						'<attribute name="regardingobjectid" />'+
						'<order attribute="subject" descending="false" />'+
						'<filter type="and">'+
							'<condition attribute="statecode" operator="not-null" />'+
							'<condition attribute="ilp_accountid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
						'</filter>'+
						'<link-entity name="ilp_initiative" from="ilp_initiativeid" to="regardingobjectid" alias="ah">'+
						  '<attribute name="ilp_accountid" />'+
						  '<filter type="and">'+
							'<condition attribute="ilp_initiativeid" operator="not-null" />'+
						  '</filter>'+
						'</link-entity>'+
					  '</entity>'+
					'</fetch>';

		var fetchedTasks = XrmServiceToolkit.Soap.Fetch(allQuery);		
		
		return fetchedTasks;
	}


	////////////////////////////////////////////////////////////////////////////////////////
	// This query will retrive all the initiatives relating to initiatives for a specifc account
	////
	function retrieveSpecificAccountInitiatives(accountID){
		
		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
					  '<entity name="ilp_initiative">'+
					   ' <order attribute="createdon" descending="true" />'+
					   ' <filter type="and">'+
					   '	<condition attribute="statecode" operator="in">'+
						' 	   <value>0</value>'+
						'      <value>1</value>'+
						'   </condition>'+  
						'   <condition attribute="ilp_accountid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
					   ' </filter>'+
					  '</entity>'+
					'</fetch>';

		var fetchedinitiatives = XrmServiceToolkit.Soap.Fetch(query);		
		
		return fetchedinitiatives;
	}





