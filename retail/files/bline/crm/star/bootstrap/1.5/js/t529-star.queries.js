//#################################################
// Get the contacts for a specific account (broker)
function getAccountHierarchy(accountID, accountName) {
	var accountCodes = [];
	
			
		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="account">'+
			'<attribute name="il_referencecode" />'+
			'<order attribute="name" descending="false" />'+
			'<filter type="and">'+
			  '<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>857190002</value>'+
				'<value>857190001</value>'+
			  '</condition>'+
			  '<condition attribute="ilp_brokerageparentaccount" operator="eq" uiname="" uitype="account" value="{'+accountID+'}" />'+
			'</filter>'+
		 '</entity>'+
		'</fetch>';
	//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
	var foundCodes = XrmServiceToolkit.Soap.Fetch(query);
	
	
	for(var i = 0; i<foundCodes.length; i++)
	{
		if(typeof  foundCodes[i].attributes.il_referencecode != 'undefined'){
			
			accountCodes.push({
				"sellercode": foundCodes[i].attributes.il_referencecode.value
			});
		}
	}
	
	
    accountCodes.sort(function(obj1, obj2) {
	// Ascending: first age less than the previous
		return obj2.sellercode - obj1.sellercode;
	});
	
	return accountCodes;
}

//#################################################
// Get the contacts for a specific account (broker)
function getAccountContacts(accountID) {
	var accountContacts = [];

	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
	  '<entity name="contact">'+
		'<attribute name="fullname" />'+
		'<attribute name="telephone1" />'+
		'<attribute name="emailaddress1" />'+
		'<attribute name="ilp_role" />'+
		'<order attribute="fullname" descending="false" />'+
		'<filter type="and">'+
		  '<condition attribute="parentcustomerid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
		  '<condition attribute="statecode" operator="eq" value="0" />'+
		  '<condition attribute="il_contactterminated" operator="ne" value="1" />'+
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
//#################################################
// Get the initiatives for a specific account (broker)
//
// This query will retrive all the initiatives relating to initiatives for a specifc account
////
function getAccountInitiatives(accountID){
	
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

// get the task activities for a specific broker
function getAccountTasks(accountID){
	
		var tasksQuery = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
					  '<entity name="task">'+
						'<attribute name="subject" />'+
						'<attribute name="ownerid" />'+
						'<attribute name="prioritycode" />'+
						'<attribute name="scheduledend" />'+
						'<attribute name="createdon" />'+
						'<attribute name="statuscode" />'+
						'<attribute name="activityid" />'+
						'<attribute name="description" />'+
						'<attribute name="ilp_sourceofcontact" />'+
						'<attribute name="ilp_typeofsupport" />'+
						'<attribute name="ilp_platformtopicofcontact" />'+
						'<attribute name="regardingobjectid" />'+
						'<order attribute="subject" descending="false" />'+
						'<filter type="and">'+
							'<condition attribute="statecode" operator="not-null" />'+
							'<condition attribute="ilp_accountid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
						'</filter>'+
						'<filter type="and">'+
							'<condition attribute="createdon" operator="last-x-days" value="100"/>'+
						'</filter>'+
					  '</entity>'+
					'</fetch>';

		var fetchedTasks = XrmServiceToolkit.Soap.Fetch(tasksQuery);		
		
		return fetchedTasks;
}
// get the task activities for a specific broker
function getAccountPlanActivity(sellerCode){
	
		var plansQuery = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
							  '<entity name="ilp_plan">'+
								'<attribute name="ilp_plannumber" />'+
								'<attribute name="ilp_productdescription" />'+
								'<attribute name="ilp_productcategory" />'+
								'<attribute name="ilp_status" />'+
								'<attribute name="ilp_premium" />'+
								'<attribute name="ilp_paymentfrequency" />'+
								'<attribute name="ilp_startdate" />'+
								'<attribute name="ilp_crmlastupdatedate" />'+
								'<attribute name="ilp_paidtodate" />'+
								'<attribute name="ownerid" />'+
								'<attribute name="ilp_maturitydate" />'+
								'<attribute name="ilp_term" />'+
								'<attribute name="ilp_planid" />'+
								'<attribute name="ilp_sellercode" />'+
								'<attribute name="ilp_distributioncd" />'+
								'<attribute name="ilp_channelcd" />'+
								'<order attribute="ilp_plannumber" descending="true" />'+
								'<filter type="and">'+
								  '<condition attribute="ilp_status" operator="in">'+
									'<value>10</value>'+
									'<value>21</value>'+
									'<value>11</value>'+
									'<value>12</value>'+
									'<value>22</value>'+
								  '</condition>'+
								  '<condition attribute="ilp_sellercode" operator="not-null" />'+
								  '<condition attribute="ilp_channelcd" operator="like" value="%BR%" />'+
								  '<condition attribute="ilp_plannumber" operator="not-null" />'+
								  '<condition attribute="ilp_productdescription" operator="not-null" />'+
								  '<condition attribute="createdon" operator="last-x-months" value="8" />'+
								  '<condition attribute="ilp_sellercode" operator="eq" value="'+sellerCode+'" />'+
								'</filter>'+
							  '</entity>'+
							'</fetch>';
		//console.log(plansQuery);
		//console.log('\n');
		
		var fetchedPlans = XrmServiceToolkit.Soap.Fetch(plansQuery);
	//	console.log('\n########\n '+JSON.stringify(fetchedPlans));
		return fetchedPlans;
}

// get the account Phone call activities for a specific broker
function getAccountPhoneCalls(accountID){
		
	var phoneCallsQuery = 
							'<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
								'<entity name="phonecall" >'+
									'<attribute name="subject" />'+
									'<attribute name="scheduledstart" />'+
									'<attribute name="scheduledend" />'+
									'<attribute name="activitytypecode" />'+
									'<attribute name="regardingobjectid" />'+
									'<attribute name="statecode" />'+
									'<attribute name="prioritycode" />'+
									'<attribute name="activityid" />'+
									'<attribute name="description" />'+
									'<attribute name="createdon" />'+
									'<order attribute="subject" descending="false" />'+
									'<link-entity name="activityparty" to="activityid" from="activityid" link-type="outer" >'+
										'<attribute name="participationtypemask" />'+
										'<attribute name="partyid"  />'+
										'<attribute name="partyidname" />'+
										   '<filter>'+
											  '<condition attribute="participationtypemask" operator="eq" value="8" />'+
											  '<condition attribute="partyid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
											'</filter>'+
								   '</link-entity>'+
									'<filter type="and">'+
										'<condition attribute="regardingobjectid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
									'</filter>'+
									'<filter type="and">'+
										'<condition attribute="createdon" operator="last-x-days" value="700"/>'+
									'</filter>'+
								'</entity>'+
							'</fetch>';

	//console.log('^^^^^');
	//console.log(phoneCallsQuery);
	//console.log('^^^^^');
	var foundPhoneCalls = XrmServiceToolkit.Soap.Fetch(phoneCallsQuery);
	//console.log(JSON.stringify(foundPhoneCalls));
	return foundPhoneCalls;
}


// get the account Phone call activities for a specific broker
function getAccountCampaignPhoneCalls(accountID){
		
							var phoneCallsQueryNew = 
							'<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">'+
								'<entity name="phonecall" >'+
									'<attribute name="subject" />'+
									'<attribute name="scheduledstart" />'+
									'<attribute name="scheduledend" />'+
									'<attribute name="activitytypecode" />'+
									'<attribute name="regardingobjectid" />'+
									'<attribute name="statecode" />'+
									'<attribute name="prioritycode" />'+
									'<attribute name="activityid" />'+
									'<attribute name="description" />'+
									'<attribute name="createdon" />'+
									'<order attribute="subject" descending="false" />'+
									'<link-entity name="campaign" from="campaignid" to="regardingobjectid" visible="false" link-type="outer" >'+
										'<attribute name="name" />'+
								   '</link-entity>'+
								   '<link-entity name="activityparty" from="activityid" to="activityid" alias="ad" >'+
									'<filter type="and" >'+
										'<condition attribute="participationtypemask" operator="eq" value="2" />'+
										'<condition attribute="partyid" operator="eq" uitype="account" value="{'+accountID+'}" />'+
									'</filter>'+
									'</link-entity>'+
									'<link-entity name="activityparty" from="activityid" to="activityid" alias="ad2" >'+
									 '<filter type="and" >'+
										 '<condition attribute="participationtypemask" operator="eq" value="8" />'+
										 '<condition attribute="partyid" operator="ne" uitype="account" value="{'+accountID+'}" />'+
									 '</filter>'+
									 '</link-entity>'+
								'</entity>'+
							'</fetch>';
	//console.log('######');
	//console.log(phoneCallsQueryNew);
	//console.log('######');
	//var foundPhoneCalls = XrmServiceToolkit.Soap.Fetch(phoneCallsQueryNew);
	var foundCampaignPhoneCalls = XrmServiceToolkit.Soap.Fetch(phoneCallsQueryNew);
	// console.log(JSON.stringify(foundCampaignPhoneCalls));
	return foundCampaignPhoneCalls;
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
										'<order attribute="prioritycode" descending="true" />'+
										'<link-entity name="activityparty" to="activityid" from="activityid" link-type="outer" >'+
											'<attribute name="participationtypemask" />'+
											'<attribute name="partyid"  />'+
											'<attribute name="partyidname" />'+
											   '<filter>'+
												  '<condition attribute="participationtypemask" operator="eq" value="2" />'+
												'</filter>'+
									   '</link-entity>'+
										'<filter type="and">'+
											'<condition attribute="scheduledstart" operator="last-x-months" value="18" />'+
											'<condition attribute="statecode" operator="eq" value="0" />'+
											'<condition attribute="ownerid" operator="eq-userid" />'+
										'</filter>'+
									'</entity>'+
								'</fetch>';
		
		
		
		
		var foundPhoneCalls = XrmServiceToolkit.Soap.Fetch(myPhoneCallsQuery);

		for(var i = 0; i<foundPhoneCalls.length; i++)
		{
			
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




	function getMyPanel() {

		var myPanel = [];

				var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
				  '<entity name="account">'+
					'<attribute name="name" />'+
					'<attribute name="ilp_brokersegment" />'+
					'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_thisyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdape" />'+
					'<attribute name="ilp_lastyeargrandtotalytdmargin" />'+
					'<attribute name="ilp_volumenumberofcases" />'+
					'<attribute name="accountid" />'+
					'<attribute name="ilp_warning" />'+
					'<attribute name="ilp_warningdetails" />'+
					'<attribute name="ilp_3yp" />'+
					'<attribute name="ilp_paretoprinciple" />'+
					'<attribute name="ilp_brokervaluetier" />'+
					'<order attribute="name" descending="false" />'+
					'<filter type="and">'+
						'<filter type="or">'+
							'<condition attribute="ownerid" operator="eq-userid" />'+
							'<condition attribute="ilp_platformbdm" operator="eq-userid" />'+
							'<condition attribute="ilp_platformsupport" operator="eq-userid" />'+
							'<condition attribute="ilp_ilimcontact" operator="eq-userid" />'+
							'<condition attribute="ilp_departmenthead" operator="eq-userid" />'+
						'</filter>'+
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
			myPanel.push({
				"name": foundAccounts[i].attributes.name,              
				"brokersegment": foundAccounts[i].attributes.ilp_brokersegment,
				"accountid": foundAccounts[i].attributes.accountid,
				"warning": foundAccounts[i].attributes.ilp_warning,
				"warningDetails": foundAccounts[i].attributes.ilp_warningdetails,
				"thisyearMargin": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdmargin,
				"thisyearApe": foundAccounts[i].attributes.ilp_thisyeargrandtotalytdape,
				"lastyearApe": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdape,
				"lastyearMargin": foundAccounts[i].attributes.ilp_lastyeargrandtotalytdmargin,
				"volumenumberofcases": foundAccounts[i].attributes.ilp_volumenumberofcases,
				"threeYP": foundAccounts[i].attributes.ilp_3yp,
				"pareto": foundAccounts[i].attributes.ilp_paretoprinciple,
				"brokervaluetier": foundAccounts[i].attributes.ilp_brokervaluetier
			});
		}
		
		return myPanel;
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
			  '<condition attribute="il_contactterminated" operator="ne" value="1" />'+
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

	

	function getMyTickets() {
		
		var myTickets = [];
		
		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
						'<entity name="ilp_ticketrequest">'+
						'<attribute name="createdon" />'+
						'<attribute name="statuscode" />'+
						'<attribute name="ilp_eventtitle" />'+
						'<attribute name="ilp_eventdate" />'+
						'<attribute name="ilp_accountid" />'+
						'<attribute name="ilp_ticketrequestid" />'+
						'<attribute name="ilp_numberoftickets" />'+
						'<attribute name="ownerid" />'+
						'<order attribute="createdon" descending="true" />'+
						'</entity>'+
					'</fetch>';
		
		var foundTickets = XrmServiceToolkit.Soap.Fetch(query);
	//	console.log(JSON.stringify(foundTickets));
		for(var i = 0; i<foundTickets.length; i++)
		{
			myTickets.push({
				"createdon": foundTickets[i].attributes.createdon,              
				"statuscode": foundTickets[i].attributes.statuscode,
				"eventtitle": foundTickets[i].attributes.ilp_eventtitle,
				"eventdate": foundTickets[i].attributes.ilp_eventdate,
				"ticketrequestid": foundTickets[i].attributes.ilp_ticketrequestid,
				"numberoftickets": foundTickets[i].attributes.ilp_numberoftickets,
				"ownerid": foundTickets[i].attributes.ownerid,
				"accountid": foundTickets[i].attributes.ilp_accountid
			});
		}
		
		return myTickets;
	}
	
	
	
	 function callbackfunction(results){
	//your handler here
	alert('res '+results);
	}


	

	
	function findContact(searchTerm) {
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
				'<filter type="and" >'+
					'<condition attribute="emailaddress1" operator="not-null" />'+
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

		var foundContacts = XrmServiceToolkit.Soap.Fetch(query, false, returnContacts);

		//console.log(query);
	}

	function findBroker(searchterm) {

		var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="account">'+
			'<attribute name="ilp_brokerageparentaccount" />'+
			'<attribute name="accountid" />'+
			'<order attribute="name" descending="false" />'+
			  '<filter type="and">'+
				'<filter type="or">'+
					'<condition attribute="name" operator="like" value="%'+searchterm+'%" />'+
					'<condition attribute="il_referencecode" operator="eq" value="'+searchterm+'" />'+
				'</filter>'+
				'<condition attribute="ilp_brokerageparentaccount" operator="not-null" />'+
				  '<condition attribute="ilp_brokeraccounttype" operator="in">'+
					'<value>857190001</value>'+
					'<value>857190003</value>'+
					'<value>857190002</value>'+
					'<value>273220000</value>'+
				  '</condition>'+
			  '</filter>'+
				'<link-entity name="account" from="accountid" to="ilp_brokerageparentaccount" visible="false" link-type="outer" alias="topaccount">'+
				  '<attribute name="ilp_county" />'+
				  '<attribute name="address1_line3" />'+
				  '<attribute name="address1_line2" />'+
				  '<attribute name="address1_line1" />'+
				  '<attribute name="ownerid" />'+
				  '<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
				  '<attribute name="ilp_thisyeargrandtotalytdape" />'+
				  '<attribute name="ilp_brokersegment" />'+
				  '<attribute name="ilp_paretoprinciple" />'+
				'</link-entity>'+
		  '</entity>'+
		'</fetch>';		
		
		var querytop = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
		  '<entity name="account">'+
			'<attribute name="accountid" />'+
			'<attribute name="ilp_county" />'+
			'<attribute name="address1_line3" />'+
			'<attribute name="address1_line2" />'+
			'<attribute name="address1_line1" />'+
			'<attribute name="ownerid" />'+
			'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
			'<attribute name="ilp_thisyeargrandtotalytdape" />'+
			'<attribute name="ilp_brokersegment" />'+
			'<attribute name="ilp_paretoprinciple" />'+
			'<order attribute="name" descending="false" />'+
			 '<filter type="and">'+
				'<filter type="or">'+
					'<condition attribute="name" operator="like" value="%'+searchterm+'%" />'+
					'<condition attribute="il_referencecode" operator="eq" value="'+searchterm+'" />'+
				'</filter>'+
				'<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
			'</filter>'+
		  '</entity>'+
		'</fetch>';
		
		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query, false, returnBrokers);
		var foundAccountstop = XrmServiceToolkit.Soap.Fetch(querytop, false, returnBrokersTop);

		
	}
var searchCount; var searchCountFull;
returnContacts = function(foundContacts){
	//console.log(foundContacts);
	searchCountFull++;
	// console.log('searchCountFull 1');
	var searchContacts = [];
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
	// console.log(JSON.stringify(searchContacts));
	updateSearchResultsContact(searchContacts);
}

returnBrokers = function(foundAccounts){
	searchCount++;
	searchCountFull++;
	// console.log('searchCountFull 2');
		var accountInfo = [];
		for(var i = 0; i<foundAccounts.length; i++)
		{
			accountInfo.push({
				"name": foundAccounts[i].attributes.ilp_brokerageparentaccount.formattedValue,
				"accountid": foundAccounts[i].attributes.ilp_brokerageparentaccount.id,
				"parentaccount": foundAccounts[i].attributes.ilp_brokerageparentaccount,
				"address1": foundAccounts[i].attributes["topaccount.address1_line1"],
				"address2": foundAccounts[i].attributes["topaccount.address1_line2"],
				"address3": foundAccounts[i].attributes["topaccount.address1_line3"],
				"ownerid": foundAccounts[i].attributes["topaccount.ownerid"],
				"margin": foundAccounts[i].attributes["topaccount.ilp_thisyeargrandtotalytdmargin"],
				"ape": foundAccounts[i].attributes["topaccount.ilp_thisyeargrandtotalytdape"],
				"segment": foundAccounts[i].attributes["topaccount.ilp_brokersegment"],
				"pareto": foundAccounts[i].attributes["topaccount.ilp_paretoprinciple"]
			});
		}	
		//console.log(accountInfo);
		
		//console.log('rb '+searchCount);
		updateSearchResultsAccounts(accountInfo);
		
		//return accountInfo;	
	}
returnBrokersTop = function(foundAccountstop){
searchCount++;
searchCountFull++;

		var accountInfo = [];

		for(var i = 0; i<foundAccountstop.length; i++)
		{
			accountInfo.push({
				"name": foundAccountstop[i].attributes.name.value,
				"accountid": foundAccountstop[i].attributes.accountid.value,
				"address1": foundAccountstop[i].attributes.address1_line1,
				"address2": foundAccountstop[i].attributes["address1_line2"],
				"address3": foundAccountstop[i].attributes["address1_line3"],
				"ownerid": foundAccountstop[i].attributes["ownerid"],
				"margin": foundAccountstop[i].attributes["ilp_thisyeargrandtotalytdmargin"],
				"ape": foundAccountstop[i].attributes["ilp_thisyeargrandtotalytdape"],
				"segment": foundAccountstop[i].attributes["ilp_brokersegment"],
				"pareto": foundAccountstop[i].attributes["ilp_paretoprinciple"]
			});
		}
		
		
		//console.log(accountInfo);
		
		//console.log('rbt '+searchCount);
		updateSearchResultsAccounts(accountInfo);
		
		//return accountInfo;	
	}
//#################################################
// Get the contacts for a specific account (broker)
function getUserDashboardCount() {
	var dashboardInfo = [];
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="account" >'+
						'<attribute name="name" alias="agname" aggregate="count" />'+
						'<attribute name="ilp_thisyeargrandtotalytdape" alias="ilp_thisyeargrandtotalytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyeargrandtotalytdape" alias="ilp_lastyeargrandtotalytdape" aggregate="sum" />'+
				        '<attribute name="ilp_thisyeargrandtotalytdmargin" alias="ilp_thisyeargrandtotalytdmargin" aggregate="sum" />'+
				        '<attribute name="ilp_lastyeargrandtotalytdmargin" alias="ilp_lastyeargrandtotalytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearprotectionytdape" alias="ilp_thisyearprotectionytdape" aggregate="sum" />'+
				        '<attribute name="ilp_lastyearprotectionytdape" alias="ilp_lastyearprotectionytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearprotectionytdmargin" alias="ilp_thisyearprotectionytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearprotectionytdmargin" alias="ilp_lastyearprotectionytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionapytdape" alias="ilp_thisyearpensionapytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionapytdape" alias="ilp_lastyearpensionapytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionapytdmargin" alias="ilp_thisyearpensionapytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionapytdmargin" alias="ilp_lastyearpensionapytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionspytdape" alias="ilp_thisyearpensionspytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionspytdape" alias="ilp_lastyearpensionspytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionspytdmargin" alias="ilp_thisyearpensionspytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionspytdmargin" alias="ilp_lastyearpensionspytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearbondsytdape" alias="ilp_thisyearbondsytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearbondsytdape" alias="ilp_lastyearbondsytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearbondsytdmargin" alias="ilp_thisyearbondsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearbondsytdmargin" alias="ilp_lastyearbondsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearsavingsytdape" alias="ilp_thisyearsavingsytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearsavingsytdape" alias="ilp_lastyearsavingsytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearsavingsytdmargin" alias="ilp_thisyearsavingsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearsavingsytdmargin" alias="ilp_lastyearsavingsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdape" alias="ilp_thisyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearcorporatebusinessytdape" alias="ilp_lastyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdmargin" alias="ilp_thisyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearcorporatebusinessytdmargin" alias="ilp_lastyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_volumenumberofcases" alias="ilp_volumenumberofcases" aggregate="sum" />'+
						'<attribute name="ilp_lastyearvolumenumberofcases" alias="ilp_lastyearvolumenumberofcases" aggregate="sum" />'+
						'<filter type="and" >'+
							'<filter type="or" >'+
								'<condition attribute="ownerid" operator="eq-userid" />'+		
								'<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
							'</filter>'+
						'</filter>'+
					'</entity>'+
				'</fetch>';
				
	//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
	var foundRecords = XrmServiceToolkit.Soap.Fetch(query);
	
		dashboardInfo.push({ 
			"agname": foundRecords[0].attributes.agname,
			"ilp_thisyeargrandtotalytdape": foundRecords[0].attributes.ilp_thisyeargrandtotalytdape,
			"ilp_lastyeargrandtotalytdape": foundRecords[0].attributes.ilp_lastyeargrandtotalytdape,
			"ilp_thisyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_thisyeargrandtotalytdmargin,
			"ilp_lastyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_lastyeargrandtotalytdmargin,
			"ilp_thisyearprotectionytdape": foundRecords[0].attributes.ilp_thisyearprotectionytdape,
			"ilp_lastyearprotectionytdape": foundRecords[0].attributes.ilp_lastyearprotectionytdape,
			"ilp_thisyearprotectionytdmargin": foundRecords[0].attributes.ilp_thisyearprotectionytdmargin,
			"ilp_lastyearprotectionytdmargin": foundRecords[0].attributes.ilp_lastyearprotectionytdmargin,
			"ilp_thisyearpensionapytdape": foundRecords[0].attributes.ilp_thisyearpensionapytdape,
			"ilp_lastyearpensionapytdape": foundRecords[0].attributes.ilp_lastyearpensionapytdape,
			"ilp_thisyearpensionapytdmargin": foundRecords[0].attributes.ilp_thisyearpensionapytdmargin,
			"ilp_lastyearpensionapytdmargin": foundRecords[0].attributes.ilp_lastyearpensionapytdmargin,
			"ilp_thisyearpensionspytdape": foundRecords[0].attributes.ilp_thisyearpensionspytdape,
			"ilp_thisyearpensionspytdmargin": foundRecords[0].attributes.ilp_thisyearpensionspytdmargin,
			"ilp_lastyearpensionspytdape": foundRecords[0].attributes.ilp_lastyearpensionspytdape,
			"ilp_lastyearpensionspytdmargin": foundRecords[0].attributes.ilp_lastyearpensionspytdmargin,
			"ilp_thisyearbondsytdape": foundRecords[0].attributes.ilp_thisyearbondsytdape,
			"ilp_lastyearbondsytdape": foundRecords[0].attributes.ilp_lastyearbondsytdape,
			"ilp_thisyearbondsytdmargin": foundRecords[0].attributes.ilp_thisyearbondsytdmargin,
			"ilp_lastyearbondsytdmargin": foundRecords[0].attributes.ilp_lastyearbondsytdmargin,
			"ilp_thisyearsavingsytdape": foundRecords[0].attributes.ilp_thisyearsavingsytdape,
			"ilp_lastyearsavingsytdape": foundRecords[0].attributes.ilp_lastyearsavingsytdape,
			"ilp_thisyearsavingsytdmargin": foundRecords[0].attributes.ilp_thisyearsavingsytdmargin,
			"ilp_lastyearsavingsytdmargin": foundRecords[0].attributes.ilp_lastyearsavingsytdmargin,
			"ilp_thisyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdape,
			"ilp_lastyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdape,
			"ilp_thisyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdmargin,
			"ilp_lastyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdmargin,
			"ilp_volumenumberofcases": foundRecords[0].attributes.ilp_volumenumberofcases,
			"ilp_lastyearvolumenumberofcases": foundRecords[0].attributes.ilp_lastyearvolumenumberofcases
		});
	
	return dashboardInfo;
}


function getBrokersourceMigratedCount() {
	var dashboardInfo = [];
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="account" >'+
						'<attribute name="name" alias="agname" aggregate="count" default="0"/>'+
						'<attribute name="ilp_thisyeargrandtotalytdape" alias="ilp_thisyeargrandtotalytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyeargrandtotalytdape" alias="ilp_lastyeargrandtotalytdape" aggregate="sum" default="0"/>'+
				        '<attribute name="ilp_thisyeargrandtotalytdmargin" alias="ilp_thisyeargrandtotalytdmargin" aggregate="sum" default="0"/>'+
				        '<attribute name="ilp_lastyeargrandtotalytdmargin" alias="ilp_lastyeargrandtotalytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearprotectionytdape" alias="ilp_thisyearprotectionytdape" aggregate="sum" default="0"/>'+
				        '<attribute name="ilp_lastyearprotectionytdape" alias="ilp_lastyearprotectionytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearprotectionytdmargin" alias="ilp_thisyearprotectionytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearprotectionytdmargin" alias="ilp_lastyearprotectionytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearpensionapytdape" alias="ilp_thisyearpensionapytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearpensionapytdape" alias="ilp_lastyearpensionapytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearpensionapytdmargin" alias="ilp_thisyearpensionapytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearpensionapytdmargin" alias="ilp_lastyearpensionapytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearpensionspytdape" alias="ilp_thisyearpensionspytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearpensionspytdape" alias="ilp_lastyearpensionspytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearpensionspytdmargin" alias="ilp_thisyearpensionspytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearpensionspytdmargin" alias="ilp_lastyearpensionspytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearbondsytdape" alias="ilp_thisyearbondsytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearbondsytdape" alias="ilp_lastyearbondsytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearbondsytdmargin" alias="ilp_thisyearbondsytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearbondsytdmargin" alias="ilp_lastyearbondsytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearsavingsytdape" alias="ilp_thisyearsavingsytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearsavingsytdape" alias="ilp_lastyearsavingsytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearsavingsytdmargin" alias="ilp_thisyearsavingsytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearsavingsytdmargin" alias="ilp_lastyearsavingsytdmargin" aggregate="sum" default="0" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdape" alias="ilp_thisyearcorporatebusinessytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearcorporatebusinessytdape" alias="ilp_lastyearcorporatebusinessytdape" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_thisyearcorporatebusinessytdmargin" alias="ilp_thisyearcorporatebusinessytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearcorporatebusinessytdmargin" alias="ilp_lastyearcorporatebusinessytdmargin" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_volumenumberofcases" alias="ilp_volumenumberofcases" aggregate="sum" default="0"/>'+
						'<attribute name="ilp_lastyearvolumenumberofcases" alias="ilp_lastyearvolumenumberofcases" aggregate="sum" default="0"/>'+
						'<filter type="and" >'+
							'<filter type="or" >'+
								'<condition attribute="ownerid" operator="eq" uiname="Test Broker" uitype="systemuser" value="{854D7216-5C47-4B82-891A-6D09D8076F0E}" />'+		
								'<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
							'</filter>'+
							'<condition attribute="ilp_campaignescore" operator="ge" value="1" />'+
						'</filter>'+
					'</entity>'+
				'</fetch>';
	var foundRecords;
	try {
		foundRecords = XrmServiceToolkit.Soap.Fetch(query);
		dashboardInfo.push({ 
			"agname": foundRecords[0].attributes.agname,
			"ilp_thisyeargrandtotalytdape": foundRecords[0].attributes.ilp_thisyeargrandtotalytdape,
			"ilp_lastyeargrandtotalytdape": foundRecords[0].attributes.ilp_lastyeargrandtotalytdape,
			"ilp_thisyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_thisyeargrandtotalytdmargin,
			"ilp_lastyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_lastyeargrandtotalytdmargin,
			"ilp_thisyearprotectionytdape": foundRecords[0].attributes.ilp_thisyearprotectionytdape,
			"ilp_lastyearprotectionytdape": foundRecords[0].attributes.ilp_lastyearprotectionytdape,
			"ilp_thisyearprotectionytdmargin": foundRecords[0].attributes.ilp_thisyearprotectionytdmargin,
			"ilp_lastyearprotectionytdmargin": foundRecords[0].attributes.ilp_lastyearprotectionytdmargin,
			"ilp_thisyearpensionapytdape": foundRecords[0].attributes.ilp_thisyearpensionapytdape,
			"ilp_lastyearpensionapytdape": foundRecords[0].attributes.ilp_lastyearpensionapytdape,
			"ilp_thisyearpensionapytdmargin": foundRecords[0].attributes.ilp_thisyearpensionapytdmargin,
			"ilp_lastyearpensionapytdmargin": foundRecords[0].attributes.ilp_lastyearpensionapytdmargin,
			"ilp_thisyearpensionspytdape": foundRecords[0].attributes.ilp_thisyearpensionspytdape,
			"ilp_thisyearpensionspytdmargin": foundRecords[0].attributes.ilp_thisyearpensionspytdmargin,
			"ilp_lastyearpensionspytdape": foundRecords[0].attributes.ilp_lastyearpensionspytdape,
			"ilp_lastyearpensionspytdmargin": foundRecords[0].attributes.ilp_lastyearpensionspytdmargin,
			"ilp_thisyearbondsytdape": foundRecords[0].attributes.ilp_thisyearbondsytdape,
			"ilp_lastyearbondsytdape": foundRecords[0].attributes.ilp_lastyearbondsytdape,
			"ilp_thisyearbondsytdmargin": foundRecords[0].attributes.ilp_thisyearbondsytdmargin,
			"ilp_lastyearbondsytdmargin": foundRecords[0].attributes.ilp_lastyearbondsytdmargin,
			"ilp_thisyearsavingsytdape": foundRecords[0].attributes.ilp_thisyearsavingsytdape,
			"ilp_lastyearsavingsytdape": foundRecords[0].attributes.ilp_lastyearsavingsytdape,
			"ilp_thisyearsavingsytdmargin": foundRecords[0].attributes.ilp_thisyearsavingsytdmargin,
			"ilp_lastyearsavingsytdmargin": foundRecords[0].attributes.ilp_lastyearsavingsytdmargin,
			"ilp_thisyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdape,
			"ilp_lastyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdape,
			"ilp_thisyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdmargin,
			"ilp_lastyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdmargin,
			"ilp_volumenumberofcases": foundRecords[0].attributes.ilp_volumenumberofcases,
			"ilp_lastyearvolumenumberofcases": foundRecords[0].attributes.ilp_lastyearvolumenumberofcases
		});
	}
	catch(err) {
		dashboardInfo.push({ 
			"agname": "0",
			"ilp_thisyeargrandtotalytdape": "0",
			"ilp_lastyeargrandtotalytdape": "0",
			"ilp_thisyeargrandtotalytdmargin": "0",
			"ilp_lastyeargrandtotalytdmargin": "0",
			"ilp_thisyearprotectionytdape": "0",
			"ilp_lastyearprotectionytdape": "0",
			"ilp_thisyearprotectionytdmargin": "0",
			"ilp_lastyearprotectionytdmargin": "0",
			"ilp_thisyearpensionapytdape": "0",
			"ilp_lastyearpensionapytdape": "0",
			"ilp_thisyearpensionapytdmargin": "0",
			"ilp_lastyearpensionapytdmargin": "0",
			"ilp_thisyearpensionspytdape": "0",
			"ilp_thisyearpensionspytdmargin": "0",
			"ilp_lastyearpensionspytdape": "0",
			"ilp_lastyearpensionspytdmargin": "0",
			"ilp_thisyearbondsytdape": "0",
			"ilp_lastyearbondsytdape": "0",
			"ilp_thisyearbondsytdmargin": "0",
			"ilp_lastyearbondsytdmargin": "0",
			"ilp_thisyearsavingsytdape": "0",
			"ilp_lastyearsavingsytdape": "0",
			"ilp_thisyearsavingsytdmargin": "0",
			"ilp_lastyearsavingsytdmargin": "0",
			"ilp_thisyearcorporatebusinessytdape": "0",
			"ilp_lastyearcorporatebusinessytdape": "0",
			"ilp_thisyearcorporatebusinessytdmargin": "0",
			"ilp_lastyearcorporatebusinessytdmargin": "0",
			"ilp_volumenumberofcases": "0",
			"ilp_lastyearvolumenumberofcases": "0"
		});
	}
	//console.log('foundRecords '+foundRecords);
	
	return dashboardInfo;
}


function getAllDashboardCount() {
	var dashboardInfo = [];
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="account" >'+
						'<attribute name="name" alias="agname" aggregate="count" />'+
						'<attribute name="ilp_thisyeargrandtotalytdape" alias="ilp_thisyeargrandtotalytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyeargrandtotalytdape" alias="ilp_lastyeargrandtotalytdape" aggregate="sum" />'+
				        '<attribute name="ilp_thisyeargrandtotalytdmargin" alias="ilp_thisyeargrandtotalytdmargin" aggregate="sum" />'+
				        '<attribute name="ilp_lastyeargrandtotalytdmargin" alias="ilp_lastyeargrandtotalytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearprotectionytdape" alias="ilp_thisyearprotectionytdape" aggregate="sum" />'+
				        '<attribute name="ilp_lastyearprotectionytdape" alias="ilp_lastyearprotectionytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearprotectionytdmargin" alias="ilp_thisyearprotectionytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearprotectionytdmargin" alias="ilp_lastyearprotectionytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionapytdape" alias="ilp_thisyearpensionapytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionapytdape" alias="ilp_lastyearpensionapytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionapytdmargin" alias="ilp_thisyearpensionapytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionapytdmargin" alias="ilp_lastyearpensionapytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionspytdape" alias="ilp_thisyearpensionspytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionspytdape" alias="ilp_lastyearpensionspytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionspytdmargin" alias="ilp_thisyearpensionspytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionspytdmargin" alias="ilp_lastyearpensionspytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearbondsytdape" alias="ilp_thisyearbondsytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearbondsytdape" alias="ilp_lastyearbondsytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearbondsytdmargin" alias="ilp_thisyearbondsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearbondsytdmargin" alias="ilp_lastyearbondsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearsavingsytdape" alias="ilp_thisyearsavingsytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearsavingsytdape" alias="ilp_lastyearsavingsytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearsavingsytdmargin" alias="ilp_thisyearsavingsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearsavingsytdmargin" alias="ilp_lastyearsavingsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdape" alias="ilp_thisyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearcorporatebusinessytdape" alias="ilp_lastyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdmargin" alias="ilp_thisyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearcorporatebusinessytdmargin" alias="ilp_lastyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_volumenumberofcases" alias="ilp_volumenumberofcases" aggregate="sum" />'+
						'<attribute name="ilp_lastyearvolumenumberofcases" alias="ilp_lastyearvolumenumberofcases" aggregate="sum" />'+
						'<filter type="and" >'+
							'<filter type="or" >'+	
								'<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
							'</filter>'+
						'</filter>'+
					'</entity>'+
				'</fetch>';
	//console.log(query);	
	//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
	var foundRecords = XrmServiceToolkit.Soap.Fetch(query);
	
		dashboardInfo.push({ 
			"agname": foundRecords[0].attributes.agname,
			"ilp_thisyeargrandtotalytdape": foundRecords[0].attributes.ilp_thisyeargrandtotalytdape,
			"ilp_lastyeargrandtotalytdape": foundRecords[0].attributes.ilp_lastyeargrandtotalytdape,
			"ilp_thisyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_thisyeargrandtotalytdmargin,
			"ilp_lastyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_lastyeargrandtotalytdmargin,
			"ilp_thisyearprotectionytdape": foundRecords[0].attributes.ilp_thisyearprotectionytdape,
			"ilp_lastyearprotectionytdape": foundRecords[0].attributes.ilp_lastyearprotectionytdape,
			"ilp_thisyearprotectionytdmargin": foundRecords[0].attributes.ilp_thisyearprotectionytdmargin,
			"ilp_lastyearprotectionytdmargin": foundRecords[0].attributes.ilp_lastyearprotectionytdmargin,
			"ilp_thisyearpensionapytdape": foundRecords[0].attributes.ilp_thisyearpensionapytdape,
			"ilp_lastyearpensionapytdape": foundRecords[0].attributes.ilp_lastyearpensionapytdape,
			"ilp_thisyearpensionapytdmargin": foundRecords[0].attributes.ilp_thisyearpensionapytdmargin,
			"ilp_lastyearpensionapytdmargin": foundRecords[0].attributes.ilp_lastyearpensionapytdmargin,
			"ilp_thisyearpensionspytdape": foundRecords[0].attributes.ilp_thisyearpensionspytdape,
			"ilp_thisyearpensionspytdmargin": foundRecords[0].attributes.ilp_thisyearpensionspytdmargin,
			"ilp_lastyearpensionspytdape": foundRecords[0].attributes.ilp_lastyearpensionspytdape,
			"ilp_lastyearpensionspytdmargin": foundRecords[0].attributes.ilp_lastyearpensionspytdmargin,
			"ilp_thisyearbondsytdape": foundRecords[0].attributes.ilp_thisyearbondsytdape,
			"ilp_lastyearbondsytdape": foundRecords[0].attributes.ilp_lastyearbondsytdape,
			"ilp_thisyearbondsytdmargin": foundRecords[0].attributes.ilp_thisyearbondsytdmargin,
			"ilp_lastyearbondsytdmargin": foundRecords[0].attributes.ilp_lastyearbondsytdmargin,
			"ilp_thisyearsavingsytdape": foundRecords[0].attributes.ilp_thisyearsavingsytdape,
			"ilp_lastyearsavingsytdape": foundRecords[0].attributes.ilp_lastyearsavingsytdape,
			"ilp_thisyearsavingsytdmargin": foundRecords[0].attributes.ilp_thisyearsavingsytdmargin,
			"ilp_lastyearsavingsytdmargin": foundRecords[0].attributes.ilp_lastyearsavingsytdmargin,
			"ilp_thisyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdape,
			"ilp_lastyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdape,
			"ilp_thisyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdmargin,
			"ilp_lastyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdmargin,
			"ilp_volumenumberofcases": foundRecords[0].attributes.ilp_volumenumberofcases,
			"ilp_lastyearvolumenumberofcases": foundRecords[0].attributes.ilp_lastyearvolumenumberofcases
		});
	
	//console.log('dashboardInfo '+JSON.stringify(dashboardInfo));
	return dashboardInfo;
}



function getMyTasksCompletedCount() {
	var tasksInfo = [];
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="phonecall" >'+
						'<attribute name="subject" alias="agsubject" aggregate="count" />'+
						'<filter type="and">'+
						  '<condition attribute="statecode" operator="eq" value="1" />'+
						  '<condition attribute="ownerid" operator="eq-userid" />'+
						  '<condition attribute="actualend" operator="this-week" />'+
						'</filter>'+
					'</entity>'+
				'</fetch>';
	
	 
	//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
	var foundRecords = XrmServiceToolkit.Soap.Fetch(query);
	
		tasksInfo.push({ 
			"agsubject": foundRecords[0].attributes.agsubject
		});
	
	return tasksInfo;
}



function getMyTasksOpenCount() {
	var tasksInfo = [];
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="phonecall" >'+
						'<attribute name="subject" alias="agsubject" aggregate="count" />'+
						'<filter type="and">'+
						  '<condition attribute="statecode" operator="eq" value="0" />'+
						  '<condition attribute="ownerid" operator="eq-userid" />'+
						'</filter>'+
					'</entity>'+
				'</fetch>';
	
	 
	//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
	var foundRecords = XrmServiceToolkit.Soap.Fetch(query);
	
		tasksInfo.push({ 
			"agsubject": foundRecords[0].attributes.agsubject
		});
	
	return tasksInfo;
}



function getDashboardInfo(q) {
	var dashboardInfo = [];
	
	var out;
	if (q=="fp"){
		
		out='<filter type="and" >'+
			   '<filter type="or" >'+	
					'<condition attribute="ilp_brokeraccounttype" operator="eq" value="857190000" />'+
					'<condition attribute="ilp_f4fsegment" operator="eq" value="857190000" />'+
				'</filter>'+
			'</filter>';
	}
	
	
	
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="account" >'+
						'<attribute name="name" alias="agname" aggregate="count" />'+
						'<attribute name="ilp_thisyeargrandtotalytdape" alias="ilp_thisyeargrandtotalytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyeargrandtotalytdape" alias="ilp_lastyeargrandtotalytdape" aggregate="sum" />'+
				        '<attribute name="ilp_thisyeargrandtotalytdmargin" alias="ilp_thisyeargrandtotalytdmargin" aggregate="sum" />'+
				        '<attribute name="ilp_lastyeargrandtotalytdmargin" alias="ilp_lastyeargrandtotalytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearprotectionytdape" alias="ilp_thisyearprotectionytdape" aggregate="sum" />'+
				        '<attribute name="ilp_lastyearprotectionytdape" alias="ilp_lastyearprotectionytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearprotectionytdmargin" alias="ilp_thisyearprotectionytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearprotectionytdmargin" alias="ilp_lastyearprotectionytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionapytdape" alias="ilp_thisyearpensionapytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionapytdape" alias="ilp_lastyearpensionapytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionapytdmargin" alias="ilp_thisyearpensionapytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionapytdmargin" alias="ilp_lastyearpensionapytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionspytdape" alias="ilp_thisyearpensionspytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionspytdape" alias="ilp_lastyearpensionspytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearpensionspytdmargin" alias="ilp_thisyearpensionspytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearpensionspytdmargin" alias="ilp_lastyearpensionspytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearbondsytdape" alias="ilp_thisyearbondsytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearbondsytdape" alias="ilp_lastyearbondsytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearbondsytdmargin" alias="ilp_thisyearbondsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearbondsytdmargin" alias="ilp_lastyearbondsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearsavingsytdape" alias="ilp_thisyearsavingsytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearsavingsytdape" alias="ilp_lastyearsavingsytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearsavingsytdmargin" alias="ilp_thisyearsavingsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearsavingsytdmargin" alias="ilp_lastyearsavingsytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdape" alias="ilp_thisyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_lastyearcorporatebusinessytdape" alias="ilp_lastyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdmargin" alias="ilp_thisyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_lastyearcorporatebusinessytdmargin" alias="ilp_lastyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_volumenumberofcases" alias="ilp_volumenumberofcases" aggregate="sum" />'+
						'<attribute name="ilp_lastyearvolumenumberofcases" alias="ilp_lastyearvolumenumberofcases" aggregate="sum" />'+
						   out+
					'</entity>'+
				'</fetch>';
	
	//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
	var foundRecords = XrmServiceToolkit.Soap.Fetch(query);
	
		dashboardInfo.push({ 
			"agname": foundRecords[0].attributes.agname,
			"ilp_thisyeargrandtotalytdape": foundRecords[0].attributes.ilp_thisyeargrandtotalytdape,
			"ilp_lastyeargrandtotalytdape": foundRecords[0].attributes.ilp_lastyeargrandtotalytdape,
			"ilp_thisyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_thisyeargrandtotalytdmargin,
			"ilp_lastyeargrandtotalytdmargin": foundRecords[0].attributes.ilp_lastyeargrandtotalytdmargin,
			"ilp_thisyearprotectionytdape": foundRecords[0].attributes.ilp_thisyearprotectionytdape,
			"ilp_lastyearprotectionytdape": foundRecords[0].attributes.ilp_lastyearprotectionytdape,
			"ilp_thisyearprotectionytdmargin": foundRecords[0].attributes.ilp_thisyearprotectionytdmargin,
			"ilp_lastyearprotectionytdmargin": foundRecords[0].attributes.ilp_lastyearprotectionytdmargin,
			"ilp_thisyearpensionapytdape": foundRecords[0].attributes.ilp_thisyearpensionapytdape,
			"ilp_lastyearpensionapytdape": foundRecords[0].attributes.ilp_lastyearpensionapytdape,
			"ilp_thisyearpensionapytdmargin": foundRecords[0].attributes.ilp_thisyearpensionapytdmargin,
			"ilp_lastyearpensionapytdmargin": foundRecords[0].attributes.ilp_lastyearpensionapytdmargin,
			"ilp_thisyearpensionspytdape": foundRecords[0].attributes.ilp_thisyearpensionspytdape,
			"ilp_thisyearpensionspytdmargin": foundRecords[0].attributes.ilp_thisyearpensionspytdmargin,
			"ilp_lastyearpensionspytdape": foundRecords[0].attributes.ilp_lastyearpensionspytdape,
			"ilp_lastyearpensionspytdmargin": foundRecords[0].attributes.ilp_lastyearpensionspytdmargin,
			"ilp_thisyearbondsytdape": foundRecords[0].attributes.ilp_thisyearbondsytdape,
			"ilp_lastyearbondsytdape": foundRecords[0].attributes.ilp_lastyearbondsytdape,
			"ilp_thisyearbondsytdmargin": foundRecords[0].attributes.ilp_thisyearbondsytdmargin,
			"ilp_lastyearbondsytdmargin": foundRecords[0].attributes.ilp_lastyearbondsytdmargin,
			"ilp_thisyearsavingsytdape": foundRecords[0].attributes.ilp_thisyearsavingsytdape,
			"ilp_lastyearsavingsytdape": foundRecords[0].attributes.ilp_lastyearsavingsytdape,
			"ilp_thisyearsavingsytdmargin": foundRecords[0].attributes.ilp_thisyearsavingsytdmargin,
			"ilp_lastyearsavingsytdmargin": foundRecords[0].attributes.ilp_lastyearsavingsytdmargin,
			"ilp_thisyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdape,
			"ilp_lastyearcorporatebusinessytdape": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdape,
			"ilp_thisyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdmargin,
			"ilp_lastyearcorporatebusinessytdmargin": foundRecords[0].attributes.ilp_lastyearcorporatebusinessytdmargin,
			"ilp_volumenumberofcases": foundRecords[0].attributes.ilp_volumenumberofcases,
			"ilp_lastyearvolumenumberofcases": foundRecords[0].attributes.ilp_lastyearvolumenumberofcases
		});
	
	return dashboardInfo;
}


function getSegmentCount(segment) {
	var segmentInfo = [];
	
	var seg=getSegmentquery(segment);
	
	var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true" >'+
					'<entity name="account" >'+
						'<attribute name="name" alias="agname" aggregate="count" />'+
						'<attribute name="ilp_thisyeargrandtotalytdape" alias="ilp_thisyeargrandtotalytdape" aggregate="sum" />'+
				        '<attribute name="ilp_thisyeargrandtotalytdmargin" alias="ilp_thisyeargrandtotalytdmargin" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdape" alias="ilp_thisyearcorporatebusinessytdape" aggregate="sum" />'+
						'<attribute name="ilp_thisyearcorporatebusinessytdmargin" alias="ilp_thisyearcorporatebusinessytdmargin" aggregate="sum" />'+
						'<filter type="and">'+
							seg+
						'</filter>'+
					'</entity>'+
				'</fetch>';
	 
	var foundRecords = XrmServiceToolkit.Soap.Fetch(query);
	
		segmentInfo.push({ 
			"ape": foundRecords[0].attributes.ilp_thisyeargrandtotalytdape,
			"margin": foundRecords[0].attributes.ilp_thisyeargrandtotalytdmargin,
			"cbape": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdape,
			"cbmargin": foundRecords[0].attributes.ilp_thisyearcorporatebusinessytdmargin,
		});
	return segmentInfo;
}

getSegmentquery = function(segment){
	var seg='';
	if (segment=="platform"){
		seg ='<condition attribute="ilp_brokersegment" operator="eq" value="857190003" />'+
			'<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}
	else if (segment=="brokersource"){
		seg ='<condition attribute="ilp_brokersegment" operator="eq" value="857190000" />'+
			'<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}
	else if (segment=="onesource"){
		seg ='<condition attribute="ilp_brokersegment" operator="eq" value="857190001" />'+
			'<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}
	else if (segment=="core"){
		seg ='<condition attribute="ilp_brokersegment" operator="eq" value="857190002" />'+
			'<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}
	else if (segment=="top20"){
		seg ='<condition attribute="ilp_paretoprinciple" operator="eq" value="1" />'+
			'<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}
	else if (segment=="bottom80"){
		seg ='<condition attribute="ilp_paretoprinciple" operator="ne" value="1" />'+
			'<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}
	else{
		seg = '<condition attribute="ilp_brokeraccounttype" operator="in">'+
				'<value>273220000</value>'+
				'<value>857190000</value>'+
			'</condition>';
	}

	return seg;
}
getSegmentAccounts = function(segment){
	
			var accountInfo = [];
			var seg=getSegmentquery(segment);

			var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
							'<entity name="account" >'+
								'<attribute name="name" />'+
								'<attribute name="accountid" />'+
								'<attribute name="ilp_assetsundermanagement" />'+
								'<attribute name="address1_line1" />'+
								'<attribute name="address1_line2" />'+
								'<attribute name="address1_line3" />'+
								'<attribute name="ilp_county" />'+
								'<attribute name="ownerid" />'+
								'<attribute name="ilp_thisyeargrandtotalytdmargin" />'+
								'<attribute name="ilp_thisyeargrandtotalytdape" />'+
								'<attribute name="ilp_brokersegment" />'+
								'<attribute name="ilp_paretoprinciple" />'+
								'<order attribute="name" descending="false" />'+
								'<filter type="and">'+
									seg+
								'</filter>'+
							'</entity>'+
						'</fetch>';

		var foundAccounts = XrmServiceToolkit.Soap.Fetch(query);
		// console.log(query);
			for(var i = 0; i<foundAccounts.length; i++)
			{
				accountInfo.push({
					"name": foundAccounts[i].attributes.name.value,
					"accountid": foundAccounts[i].attributes.accountid.value,
					"address1": foundAccounts[i].attributes.address1_line1,
					"address2": foundAccounts[i].attributes["address1_line2"],
					"address3": foundAccounts[i].attributes["address1_line3"],
					"county": foundAccounts[i].attributes["ilp_county"],
					"ownerid": foundAccounts[i].attributes["ownerid"],
					"margin": foundAccounts[i].attributes["ilp_thisyeargrandtotalytdmargin"],
					"ape": foundAccounts[i].attributes["ilp_thisyeargrandtotalytdape"],
					"segment": foundAccounts[i].attributes["ilp_brokersegment"],
					"pareto": foundAccounts[i].attributes["ilp_paretoprinciple"]
				});
			}
			
			// console.log(JSON.stringify(accountInfo));
			return accountInfo;	
	}



function getCurrentUserDetails(){
		// userInfo
		var userInfo = [];
			var query = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">'+
						  '<entity name="systemuser">'+
							'<attribute name="fullname" />'+
							'<attribute name="businessunitid" />'+
							'<attribute name="systemuserid" />'+
							'<attribute name="ilp_userid" />'+
							'<attribute name="internalemailaddress" />'+
							'<attribute name="isdisabled" />'+
							'<attribute name="jobtitle" />'+
							'<attribute name="ilp_teamshareid" />'+
							'<attribute name="ilp_teamshareid_5" />'+
							'<attribute name="ilp_teamshareid_4" />'+
							'<attribute name="ilp_teamshareid_3" />'+
							'<attribute name="ilp_teamshareid_2" />'+
							'<order attribute="fullname" descending="false" />'+
							'<filter type="and">'+
							  '<condition attribute="systemuserid" operator="eq-userid" />'+
							'</filter>'+
						  '</entity>'+
						'</fetch>';


			//var foundRecords = XrmServiceToolkit.Soap.Fetch(query2);
			var foundUsers = XrmServiceToolkit.Soap.Fetch(query);
			
				userInfo.push({
					"name": (foundUsers[0].attributes.fullname) ? foundUsers[0].attributes.fullname.value : "",              
					"id": (foundUsers[0].attributes.systemuserid) ? foundUsers[0].attributes.systemuserid.value : "",              
					"email": (foundUsers[0].attributes.internalemailaddress) ? foundUsers[0].attributes.internalemailaddress.value : "",
					"businessunitid": (foundUsers[0].attributes.businessunitid) ? foundUsers[0].attributes.businessunitid.name : "",
					"ilp_teamshareid": (foundUsers[0].attributes.ilp_teamshareid) ? foundUsers[0].attributes.ilp_teamshareid.name : ""
				});
		return userInfo;
	}