window.location.replace("http://www.bline.ie/star");

function getUserNameFromID(systemID){
			
	var id = systemID.toString().replace('{','').replace('}','');
	// search userInfo array for a user and return full name
	var n;
	$.each(userInfo, function(i, v) {
		if (v.id.toLowerCase() == id.toLowerCase()) {
			n = v.name;
		}
	});
	return toTitleCase(n);
}

//// DO for tomorrow
function getIDFromEmail(email){

	var n;
	$.each(userInfo, function(i, v) {
		if (v.email.toLowerCase() == email.toLowerCase()) {
			n = v.id;
		}
	});
	return n;
	
}

function showAccountInteractions(accountID){
	var tasks = retrieveSpecificAccountTasks(accountID);
	var inits = retrieveSpecificAccountInitiatives(accountID);
	setupInteractionsTable(tasks,inits,"list-account-interactions");
}
function stripEventTitle(eventTitle){
	
	var stripped = eventTitle.replace(/ *\([^)]*\) */g, "").replace(/ *\[[^)]*\] */g, "");
	return stripped;
}
function checkEventContext(eventTitle){
	
	var eventContext; 
	if (eventTitle.indexOf("[CAMPAIGN]") >= 0){
		eventContext=true;
	}else{
		eventContext='';	
	}
	return eventContext;
}
function showBrokerageEvents(events,block){
	
	//console.log('events '+JSON.stringify(events));
	$('.'+block).html(events);
	
		$('.tasks-empty').hide();	
		var thead = "<tr><th class='interaction-item-statusValue center'>&nbsp;</th><th class='interaction-item-medium'>Event</th><th class='interaction-item-small'>Location</th><th class='interaction-item-small'>Date</th><th class='interaction-item-small'>Owner</th><th class='interaction-item-small'>Mix</th><th class='interaction-item-small'>Size</th><th class='interaction-item-small'>Status</th></tr>";		
			
		$('#'+block+'-table-head').html(thead);
		var totalEvents=0;
		
		var currentMonth='';
		$.each( events, function( key, v ) {
			totalEvents++;
			var eventID = (v.id) ? v.id.value : "unknown";
			var eventTitle = (v.title) ? v.title.value : "unknown";
			var eventType = (v.type) ? v.type.formattedValue : "unknown";
			var locationName = (v.location) ? v.location.value : "unknown";
			var date = (v.date) ? v.date.formattedValue : "unknown";
			var dateFull = (v.date) ? v.date.value : "unknown";
			var owner = (v.owner) ? v.owner.name : "unknown";
			var ragStatus = (v.rag) ? v.rag.formattedValue : "unknown";
			var mix = (v.mix) ? v.mix.formattedValue : "unknown";
			var size = (v.size) ? v.size.formattedValue : "unknown";
			
			if (dateFull !='unknown'){
			var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];		 
				var thisDate = new Date(dateFull);
				// console.log('month '+thisDate.getMonth());
				if(currentMonth!=monthNames[thisDate.getMonth()]){
				currentMonth=monthNames[thisDate.getMonth()];
				
				$('#'+block+'-table-body').append(
					'<tr class="interaction-item-sub-header-row">'+
						'<td colspan="8">'+currentMonth+'</td>'+
					'</tr>'
				);
				}
			}
			var eventTitleStripped = stripEventTitle(eventTitle);
			var eventTitleContext = checkEventContext(eventTitle);
			
			if(eventTitleContext){
				$('#'+block+'-table-body').append(
					'<tr class="interaction-item-campaign">'+
						'<td class="interaction-item-statusValue center"><i class="fa glowfont fa-bullhorn" aria-hidden="true"></i></td>'+
						'<td class="interaction-item-statusValue interaction-item-larger"><a href="javascript:void(0);" class="interaction-item-larger openEventCRM" data-eventid="'+eventID+'" style="color:#50C9B5">'+eventTitleStripped+'</a></td>'+
						'<td class="interaction-item-statusValue" colspan="6">'+date+'</td>'+
					'</tr>'
					);
			}else{
				
				$('#'+block+'-table-body').append(
					'<tr>'+
						'<td class="interaction-item-statusValue center">'+getEventIcon(eventType)+'</td>'+
						'<td class="interaction-item-statusValue interaction-item-larger"><a href="javascript:void(0);" class="interaction-item-larger openEventCRM" data-eventid="'+eventID+'">'+eventTitleStripped+'</a></td>'+
						'<td class="interaction-item-statusValue">'+date+'</td>'+
						'<td class="interaction-item-statusValue">'+locationName+'</td>'+
						'<td class="interaction-item-statusValue">'+toTitleCase(owner)+'</td>'+
						'<td class="interaction-item-statusValue">'+mix+'</td>'+
						'<td class="interaction-item-statusValue">'+size+'</td>'+
						'<td class="interaction-item-statusValue">'+getRagStatusIcon(ragStatus)+'</td>'+
					'</tr>'
					);
				}
			
		});	
			
		$('.openEventCRM').click(function(){
			var eventID = $(this).data( "eventid" );
			
			openCRMEntity('ilp_event',eventID);
		})
		$('.'+block+'-total').html(totalEvents+" events");
		
		$('#list-search-loading').hide();
		$('#'+block).fadeIn();
		//$('#'+block+'-table').tablesorter();
		$('#'+block+'-table').fadeIn();
}
function showUserTasks(tasks,block){
	
	//$('#'+block).html('test');
	//console.log('user tasks '+JSON.stringify(tasks));
	
	
	//###################################################
	
	
	$('#'+block+'-table-head').html('');
	$('#'+block+'-table-body').html('');
	
	if (tasks.length<=0){
		$('.tasks-empty').show();
		$('#all-tasks-loading').hide();
		$('#list-tasks').fadeIn();
	}
	else{
		$('.tasks-empty').hide();	
		var thead = "<tr><th class='interaction-item-statusValue center'>&nbsp;</th><th class='interaction-item-larger'>Information</th><th class='interaction-item-medium'>Broker</th><th class='interaction-item-small'>Due</th><th class='interaction-item-small'>Priority</th></tr>";		
			
		$('#'+block+'-table-head').html(thead);
		var totalTasks=0;
		$.each( tasks, function( key, v ) {
			totalTasks++;
		// console.log(JSON.stringify(v)+'\n');
		var activityType = (v.activityType) ? v.activityType : "unknown";
		var activityid = (v.activityid) ? v.activityid.value : "unknown";
		var prioritycode = (v.prioritycode) ? v.prioritycode.value : "unknown";
		var regardingobjectid = (v.regardingobjectid) ? v.regardingobjectid.id : "unknown";
		var regardingobjectlogicalName = (v.regardingobjectid) ? v.regardingobjectid.logicalName : "unknown";
		var subject = (v.subject) ? v.subject.value : "";
		var description = (v.description) ? v.description.value : "";
		var scheduledstart = (v.scheduledstart) ? v.scheduledstart.value : "";
		var scheduledend = (v.scheduledend) ? v.scheduledend.value : "";
		var accountName = (v.account) ? v.account.name : "";
		var accountID = (v.account) ? v.account.id : "";
		var DateCreated='';
		if (scheduledend==''){		
			DateCreated = '';
		
		}else{
			DateCreated = new Date(Date.parse(scheduledend)).format("dd/MM/yyyy");
		}
		
		
		
			$('#'+block+'-table-body').append(
				'<tr>'+
					'<td class="interaction-item-statusValue center"><a href="javascript:void(0);" style="color:#50C9B5;" class="openTaskCRM" data-taskid="'+activityid+'" data-tasktype="'+activityType+'">'+getTaskIcon(activityType)+'</a></td>'+
					'<td class="interaction-item-larger"><a href="javascript:void(0);" class="interaction-item-larger openTaskCRM" data-taskid="'+activityid+'" data-tasktype="'+activityType+'">'+subject+'</a> - '+description+'</td>'+
					'<td class="interaction-item-medium contact-display"><a href="javascript:void(0)" class="showAccount" data-accountid="'+accountID+'" data-accountname="'+name+'">'+accountName+'</td>'+
					'<td class="interaction-item-small contact-display ">'+DateCreated+'</td>'+
					'<td style="color:#EDEAED;" class="interaction-item-small contact-display">'+getPriorityIcon(prioritycode)+' '+prioritycode+' </td>'+
					/*
					'<td class="interaction-item- contact-display prettydate" data-date-format="D.M.YYYY h:m">'+scheduledend+'</td>'+
					'<td class="interaction-item- contact-display">'+activityType+'</td>'+
					'<td class="interaction-item- contact-display">'+activityid+'</td>'+
					'<td class="interaction-item- contact-display">'+prioritycode+'</td>'+
					'<td class="interaction-item- contact-display">'+regardingobjectid+'</td>'+
					'<td class="interaction-item- contact-display">'+regardingobjectlogicalName+'</td>'+
					*/
				'</tr>'
				);
		});	
		if (totalTasks==1){
			$('.list-user-task-total').html(totalTasks+" task")
		}else{
			$('.list-user-task-total').html(totalTasks+" tasks")
		}
		
		
		$('.openTaskCRM').click(function(){
			var taskID = $(this).data( "taskid" );
			var tasktype = $(this).data( "tasktype" );
			openCRMEntity(tasktype,taskID);
		})
		
		
		
		$('.showAccount').click(function() {
			
				clearPage();
				
				setTimeout(function() {
					setupSubAccountScreen(subID.accountid);
					showAccountInteractions(subID.accountid);

				  }, 10);
		  
				// $('.account-modal').modal();
				var subID = $(this).data();
				$('.account-display').data( "id", subID.accountid );
				$('.account-display').data( "name", subID.accountname );
				$('.refreshAllInteractions').data( "id", subID.accountid );
				$('.refreshAllInteractions').addClass('selected');
				
		});
		//$(".prettydate").prettydate();
		$('#list-search-loading').hide();
		$('#'+block).fadeIn();
		$('#'+block+'-table').fadeIn();
		
		$('#list-user-tasks-table').tablesorter(); 
	}
}


function getRagStatusIcon(rag){
	//agStatus
	var ragOutput='';
	if (rag=="Green"){
		ragOutput = '<span style="color:green;font-weight:bold;"><i class="fa fa-check-circle" aria-hidden="true"></i></span>';
	}
	else if (rag=="Red"){
		ragOutput = '<span style="color:red;font-weight:bold;"><i class="fa fa-times-circle" aria-hidden="true"></i></span>';
	}
	else if (rag=="Amber"){
		ragOutput = '<span style="color:orange;font-weight:bold;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>';
	}
	else if (rag=="Complete"){
		ragOutput = '<span style="color:green;font-weight:bold;">Complete</span>';
	}
	else if (rag=="Active"){
		ragOutput = '<span style="color:#A4A4A4;font-weight:bold;"><i class="fa fa-refresh" aria-hidden="true"></i></span>';
	}
	else {
		ragOutput = '<span style="color:grey;font-weight:bold;">--</span>';
	}
	return ragOutput;
}
function getEventIcon(eventType){
	
	var eventIcon='';
	if (eventType=="Webinar"){
		eventIcon = '<i class="fa fa-tv" aria-hidden="true"></i>';
	}
	else if (eventType=="Training"){
		eventIcon = '<i class="fa fa-edit" aria-hidden="true"></i>';
	}
	else if (eventType=="Presentation"){
		eventIcon = '<i class="fa fa-file-powerpoint-o" aria-hidden="true"></i>';
	}
	else if (eventType=="Demonstration"){
		eventIcon = '<i class="fa fa-mouse-pointer" aria-hidden="true"></i>';
	}
	else if (eventType=="Tradeshow"){
		eventIcon = '<i class="fa fa-mouse-pointer" aria-hidden="true"></i>';
	}
	else if (eventType=="Seminar"){
		eventIcon = '<i class="fa fa-mouse-pointer" aria-hidden="true"></i>';
	}
	else if (eventType=="Workshop"){
		eventIcon = '<i class="fa fa-mouse-pointer" aria-hidden="true"></i>';
	}
	else if (eventType=="Celebration"){
		eventIcon = '<i class="fa fa-trophy" aria-hidden="true"></i>';
	}
	else if (eventType=="Sporting"){
		eventIcon = '<i class="fa fa-futbol-o" aria-hidden="true"></i>';
	}
	else if (eventType=="Charity"){
		eventIcon = '<i class="fa fa-money" aria-hidden="true"></i>';
	}
	else if (eventType=="Meeting"){
		eventIcon = '<i class="fa fa-users" aria-hidden="true"></i>';
	}
	else if (eventType=="Concert"){
		eventIcon = '<i class="fa fa-microphone" aria-hidden="true"></i>';
	}
	else{
		
		eventIcon = '<i style="color:#EDEAED;" class="fa fa-circle" aria-hidden="true"></i>';
	}

	return eventIcon;
	
}


function getTaskIcon(taskType){
	
	var arrowIcon='';
	if (taskType=="phonecall"){
		arrowIcon = '<i class="fa fa-phone" aria-hidden="true"></i>';
	}
	else if (taskType=="email"){
		arrowIcon = '<i class="fa fa-envelope-o" aria-hidden="true"></i>';
	}
	else if (taskType=="task"){
		arrowIcon = '<i class="fa fa-calendar-check-o" aria-hidden="true"></i>';
	}else{
		
		arrowIcon = '<i style="color:#EDEAED;" class="fa fa-circle" aria-hidden="true"></i>';
	}

	return arrowIcon;
	
}
function getPriorityIcon(taskType){
	
	var arrowIcon='';
	if (taskType=="0"){
		arrowIcon = '<i style="color:#A4A4A4;font-size:20px;" class="fa fa-thermometer-quarter" aria-hidden="true"></i>';
	}
	else if (taskType=="1"){
		arrowIcon = '<i style="color:#FCB364;font-size:20px;" class="fa fa-thermometer-half" aria-hidden="true"></i>';
	}
	else if (taskType=="2"){
		arrowIcon = '<i style="color:#50C9B5;font-size:20px;" class="fa fa-thermometer-full" aria-hidden="true"></i>';
	}else{
		
		arrowIcon = '<i style="color:#A4A4A4;font-size:20px;" class="fa fa-thermometer-empty" aria-hidden="true"></i>';
	}

	return arrowIcon;
	
}


function showAccountFilterList(accountInfo,output){
	$('#'+output).html('');
	$('#'+output+'-table-head').html('');
	$('#'+output+'-table-body').html('');
	$('#'+output+"-stats").html('');
	$('#'+output+"-stats").html(accountInfo.length+" brokers found").show();
	
	
	var saleshead = "<tr><th class='interaction-item-large'>Broker name</th>"+
	"<th class=''>Account Manager</th>"+
	"<th class=''>Margin YTD</th>"+
	"<th class=''>APE YTD</th></tr>";	
	
	$('#'+output+'-table-head').append(saleshead);
	
	
	$.each( accountInfo, function( key, v ) {
		//console.log('\n'+JSON.stringify(v));
		var accountManager = (v.ownerid) ? v.ownerid.name : "";
		var warning = (v.warning) ? v.warning.formattedValue : "";
		var warningTitle = (v.warningDetails) ? v.warningDetails.value : "No Warnings for this Partner";
		var thisyearMargin = (v.thisyearMargin) ? v.thisyearMargin.value : "";
		var thisyearApe = (v.thisyearApe) ? v.thisyearApe.value : "";
		var lastyearMargin = (v.lastyearMargin) ? v.lastyearMargin.value : "";
		var logoURL = (v.logoURL) ? v.logoURL.value : "https://www.irishlife.ie/sites/retail/files/bline/CRM/logos/default.star.crm.logo.small.png";
		var name = (v.name) ? v.name.value : "";
		
		var warningStyle="border-color:#50C9B5"; 
		var warningIcon='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
		if (warning=="" || warning =="None"){
			warningStyle="border-color:#50C9B5;";
			warningIcon='<i style="color:#50C9B5;" class="fa fa-check" aria-hidden="true"></i>';
		}
		else if(warning =="Low"){
			warningStyle="border-color:#C8E59A;";
			warningIcon='<i style="color:#C8E59A;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			warningTitle="Low Warning: "+warningTitle;
		}
		else if(warning =="Medium"){
			warningStyle="border-color:#ea9e9e;";
			warningIcon='<i style="color:#ea9e9e;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			warningTitle="Medium Warning: "+warningTitle;
		}
		else if(warning =="High"){
			warningStyle="border-color:red;";
			warningIcon='<i style="color:red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			warningTitle="High Warning: "+warningTitle;
		}
		
		
	
		$('#'+output+'-table-body').append(
				'<tr>'+
					'<td class="interaction-item-medium contact-display"><a href="javascript:void(0);" class="showAccount" data-accountid="'+v.accountid.value+'" data-accountname="'+name+'">'+name+'</a></td>'+
					'<td class="">'+accountManager+'</a></td>'+
					'<td class="interaction-item-statusValue ">&euro;'+Math.round(thisyearMargin)+'</a></td>'+
					'<td class="interaction-item-statusValue ">&euro;'+Math.round(thisyearApe)+'</a></td>'+
					
					
				'</tr>'
				);
	
	  // createInteraction(v.name.value, v.accountid.value);
	  // return key<2;
	});
	$('#'+output).fadeIn();
	$('#'+output+'-table').fadeIn();
	
	$('.showAccount').click(function() {
		
			clearPage();
			
			setTimeout(function() {
				setupSubAccountScreen(subID.accountid);
				showAccountInteractions(subID.accountid);

			  }, 10);
	  
			// $('.account-modal').modal();
			var subID = $(this).data();
			$('.account-display').data( "id", subID.accountid );
			$('.account-display').data( "name", subID.accountname );
			$('.refreshAllInteractions').data( "id", subID.accountid );
			$('.refreshAllInteractions').addClass('selected');
			
	});
	
	$('#'+output+"-loading").hide();
	$('#'+output+'-table').tablesorter();
	
}




function showAccountInfo(accountInfo,output){
	$('#'+output).html('');
	
	$('.list-search-stats').html(accountInfo.length+" brokers found")
	$.each( accountInfo, function( key, v ) {
		
		var warning = (v.warning) ? v.warning.formattedValue : "";
		var warningTitle = (v.warningDetails) ? v.warningDetails.value : "No Warnings for this Partner";
		var thisyearMargin = (v.thisyearMargin) ? v.thisyearMargin.value : "";
		var thisyearApe = (v.thisyearApe) ? v.thisyearApe.value : "";
		var lastyearMargin = (v.lastyearMargin) ? v.lastyearMargin.value : "";
		var thisyearMargin = (v.thisyearMargin) ? v.thisyearMargin.value : "";
		var logoURL = (v.logoURL) ? v.logoURL.value : "https://www.irishlife.ie/sites/retail/files/bline/CRM/logos/default.star.crm.logo.small.png";
		var name = (v.name) ? v.name.value : "";
		
		var warningStyle="border-color:#50C9B5"; 
		var warningIcon='<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
		if (warning=="" || warning =="None"){
			warningStyle="border-color:#50C9B5;";
			warningIcon='<i style="color:#50C9B5;" class="fa fa-check" aria-hidden="true"></i>';
		}
		else if(warning =="Low"){
			warningStyle="border-color:#C8E59A;";
			warningIcon='<i style="color:#C8E59A;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			warningTitle="Low Warning: "+warningTitle;
		}
		else if(warning =="Medium"){
			warningStyle="border-color:#ea9e9e;";
			warningIcon='<i style="color:#ea9e9e;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			warningTitle="Medium Warning: "+warningTitle;
		}
		else if(warning =="High"){
			warningStyle="border-color:red;";
			warningIcon='<i style="color:red;" class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
			warningTitle="High Warning: "+warningTitle;
		}
		
		$('#'+output).append('<li class="grid_item"><a href="javascript:void(0);" class="showAccount" data-accountid="'+v.accountid.value+'" data-accountname="'+name+'"><div class="infoBar" style="'+warningStyle+'"><span class="warningIcon tip" data-tip="'+warningTitle+'">'+warningIcon+'</span><span class="salesHighlight"><strong style="color:#A4A4A4;">Margin:</strong> &euro;'+numberWithCommas(Math.round(thisyearMargin))+'</div><span class="logo"><img src="'+logoURL+'"></span><span class="title">'+name+'</span></a></li>');
	
	  // createInteraction(v.name.value, v.accountid.value);
	  // return key<2;
	});
	$('#'+output).fadeIn();
	
	if (accountInfo.length>=2){
		var monkeyList = new List('list-search', { 
		  valueNames: ['title']
		});
		
		$('#list-search').show();
	}
		
	$('.showAccount').click(function() {
		
			clearPage();
			
			setTimeout(function() {
				setupSubAccountScreen(subID.accountid);
				showAccountInteractions(subID.accountid);

			  }, 10);
	  
			// $('.account-modal').modal();
			var subID = $(this).data();
			$('.account-display').data( "id", subID.accountid );
			$('.account-display').data( "name", subID.accountname );
			$('.refreshAllInteractions').data( "id", subID.accountid );
			$('.refreshAllInteractions').addClass('selected');
			
	});
	
	
	
	$('#list-search-loading').hide();
	$('#'+output+"-loading").hide();
	
	$('.tip').tipr({
          'mode': 'above'
     });
}
function setupSubAccountScreen(id){
	
	$('#list-search-loading').hide();
	$('#list-search').hide();
	$('#account-menu').show();
	$('.account-display').show();
	
	// this is the call for the account screen information
	var retrievedCampaign = getAccountInfo(id);
	
	var name = (retrievedCampaign.attributes["name"]) ? retrievedCampaign.attributes["name"].value : "";
	var ownerid = (retrievedCampaign.attributes["ownerid"]) ? retrievedCampaign.attributes["ownerid"].name : "";
	var owneridcode = (retrievedCampaign.attributes["ownerid"]) ? retrievedCampaign.attributes["ownerid"].id : "";
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
	// threeyp  potentialscore  paretoprinciple bcgclassification pgsbclassification
	var protectioninterest = (retrievedCampaign.attributes["ilp_protectioninterest"]) ? retrievedCampaign.attributes["ilp_protectioninterest"].formattedValue : "";
	var pensionsinterest = (retrievedCampaign.attributes["ilp_pensionsinterest"]) ? retrievedCampaign.attributes["ilp_pensionsinterest"].formattedValue : "";
	var investmentinterest = (retrievedCampaign.attributes["ilp_investmentinterest"]) ? retrievedCampaign.attributes["ilp_investmentinterest"].formattedValue : "";
	var mapsinterest = (retrievedCampaign.attributes["ilp_mapsinterest"]) ? retrievedCampaign.attributes["ilp_mapsinterest"].formattedValue : "";
	var complianceinterest = (retrievedCampaign.attributes["ilp_complianceinterest"]) ? retrievedCampaign.attributes["ilp_complianceinterest"].formattedValue : "";
	var socialmediainterest = (retrievedCampaign.attributes["ilp_socialmediainterest"]) ? retrievedCampaign.attributes["ilp_socialmediainterest"].formattedValue : "";
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
	
	//console.log(paretoprinciple);
	if (paretoprinciple=="True"){
		$('.account-display').addClass('account-display-fff');
		$('.pareto-fff-icon').fadeIn('slow');
	}
	else{
		
		$('.pareto-fff-icon').hide();
		$('.account-display').removeClass('account-display-fff');
	}
	// "pensionsscore","investmentsscore","emailscore","calculatorsscore","researchscore","sifscore","protectionscore","compliancescore","webinarscore","newsscore","mapsscore","digitalactivityscore"
	
	
	
	
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
	
	
	
	var saleshead = "<tr><th class='interaction-item-statusValue '>&nbsp;</th>"+
	"<th class='interaction-item-title  '>Product Type</th>"+
	"<th class='interaction-item-figure  '>"+(new Date()).getFullYear()+" YTD</th>"+
	"<th class='interaction-item-figure  '>"+((new Date()).getFullYear()-1)+" YTD</th>"+
	"<th class='interaction-item-figure  '>"+((new Date()).getFullYear()-1)+" Total</th></tr>";	
	
	$('#list-account-sales-table-head').append(saleshead);
	
	
	
	/*

	*/
	// set up the tabs with the sales figures
	var salesProtectionAPE = '<tr class="interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearprotectionytdape,ilp_lastyearprotectionytdape)+'</td>'+
		'<td class="interaction-item-sales-title">Protection APE</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearprotectionytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearprotectionytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearprotectiontotalape+'</td>'+
	'</tr>';	
	$('#list-account-sales-table-body').append(salesProtectionAPE);
	
	
	
	var salesProtectionMargin = '<tr class="interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearprotectionytdmargin,ilp_lastyearprotectionytdmargin)+'</td>'+
		'<td class="interaction-item-sales-title">Protection Margin</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearprotectionytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearprotectionytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearprotectiontotalmargin+'</td>'+
	'</tr>';
	$('#list-account-sales-table-body').append(salesProtectionMargin);
	
	
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
	
	
	
	var salesPensionAPAPE = '<tr class="interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearpensionapytdape,ilp_lastyearpensionapytdape)+'</td>'+
		'<td class="interaction-item-sales-title">AP Pension APE</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearpensionapytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionapytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionaptotalape+'</td>'+
	'</tr>';
	$('#list-account-sales-table-body').append(salesPensionAPAPE);
	
	var salesPensionAPMargin = '<tr class="interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearpensionapytdmargin,ilp_lastyearpensionapytdmargin)+'</td>'+
		'<td class="interaction-item-sales-title">AP Pension Margin</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearpensionapytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionapytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionaptotalmargin+'</td>'+
	'</tr>';
	
	$('#list-account-sales-table-body').append(salesPensionAPMargin);
	
	
	var salesPensionSPAPE = '<tr class="interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearpensionspytdape,ilp_lastyearpensionspytdape)+'</td>'+
		'<td class="interaction-item-sales-title">SP Pension APE</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearpensionspytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionspytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionsptotalape+'</td>'+
	'</tr>';
	$('#list-account-sales-table-body').append(salesPensionSPAPE);
	
	var salesPensionSPMargin = '<tr class="interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearpensionspytdmargin,ilp_lastyearpensionspytdmargin)+'</td>'+
		'<td class="interaction-item-sales-title">SP Pension Margin</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearpensionspytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionspytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearpensionsptotalmargin+'</td>'+
	'</tr>';
	
	$('#list-account-sales-table-body').append(salesPensionSPMargin);

	var ilp_thisyearbondsytdape = (retrievedCampaign.attributes["ilp_thisyearbondsytdape"]) ? retrievedCampaign.attributes["ilp_thisyearbondsytdape"].value : "0";
	var ilp_lastyearbondsytdape = (retrievedCampaign.attributes["ilp_lastyearbondsytdape"]) ? retrievedCampaign.attributes["ilp_lastyearbondsytdape"].value : "0";
	var ilp_lastyearbondstotalape = (retrievedCampaign.attributes["ilp_lastyearbondstotalape"]) ? retrievedCampaign.attributes["ilp_lastyearbondstotalape"].value : "0";
	var ilp_thisyearbondsytdmargin = (retrievedCampaign.attributes["ilp_thisyearbondsytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearbondsytdmargin"].value : "0";
	var ilp_lastyearbondsytdmargin = (retrievedCampaign.attributes["ilp_lastyearbondsytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearbondsytdmargin"].value : "0";
	var ilp_lastyearbondstotalmargin = (retrievedCampaign.attributes["ilp_lastyearbondstotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearbondstotalmargin"].value : "0";
	
	var salesBondsAPE = '<tr class="interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearbondsytdape,ilp_lastyearbondsytdape)+'</td>'+
		'<td class="interaction-item-sales-title">Bonds APE</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearbondsytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearbondsytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearbondstotalape+'</td>'+
	'</tr>';
	$('#list-account-sales-table-body').append(salesBondsAPE);
	
	var salesBondsMargin = '<tr class="interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearbondsytdmargin,ilp_lastyearbondsytdmargin)+'</td>'+
		'<td class="interaction-item-sales-title">Bonds Margin</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearbondsytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearbondsytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearbondstotalmargin+'</td>'+
	'</tr>';
	
	$('#list-account-sales-table-body').append(salesBondsMargin);
	
	var ilp_thisyearsavingsytdape = (retrievedCampaign.attributes["ilp_thisyearsavingsytdape"]) ? retrievedCampaign.attributes["ilp_thisyearsavingsytdape"].value : "0";
	var ilp_lastyearsavingsytdape = (retrievedCampaign.attributes["ilp_lastyearsavingsytdape"]) ? retrievedCampaign.attributes["ilp_lastyearsavingsytdape"].value : "0";
	var ilp_lastyearsavingstotalape = (retrievedCampaign.attributes["ilp_lastyearsavingstotalape"]) ? retrievedCampaign.attributes["ilp_lastyearsavingstotalape"].value : "0";
	var ilp_thisyearsavingsytdmargin = (retrievedCampaign.attributes["ilp_thisyearsavingsytdmargin"]) ? retrievedCampaign.attributes["ilp_thisyearsavingsytdmargin"].value : "0";
	var ilp_lastyearsavingsytdmargin = (retrievedCampaign.attributes["ilp_lastyearsavingsytdmargin"]) ? retrievedCampaign.attributes["ilp_lastyearsavingsytdmargin"].value : "0";
	var ilp_lastyearsavingstotalmargin = (retrievedCampaign.attributes["ilp_lastyearsavingstotalmargin"]) ? retrievedCampaign.attributes["ilp_lastyearsavingstotalmargin"].value : "0";
	
	var salesSavingsAPE = '<tr class="interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearsavingsytdape,ilp_lastyearsavingsytdape)+'</td>'+
		'<td class="interaction-item-sales-title">Savings APE</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearsavingsytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearsavingsytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearsavingstotalape+'</td>'+
	'</tr>';
	$('#list-account-sales-table-body').append(salesSavingsAPE);
	
	
	var salesSavingsMargin = '<tr class="interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearsavingsytdmargin,ilp_lastyearsavingsytdmargin)+'</td>'+
		'<td class="interaction-item-sales-title">Savings Margin</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearsavingsytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearsavingsytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearsavingstotalmargin+'</td>'+
	'</tr>';
	
	$('#list-account-sales-table-body').append(salesSavingsMargin);
	
	
	//############################################################
	//#####
	// Set up the TOTALS fields
	
	// Set up the sales fields to display on the screen	
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
	
	
	var salesTotalAPERetail = '<tr class="sub-total-row interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyeargrandtotalytdape,ilp_lastyeargrandtotalytdape)+'</td>'+
		'<td class="interaction-item-sales-title">Total APE (Retail)</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+(ilp_thisyeargrandtotalytdape - ilp_thisyearcorporatebusinessytdape)+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+(ilp_lastyeargrandtotalytdape - ilp_lastyearcorporatebusinessytdape)+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_totallastyearAPE+'</td>'+
	'</tr>';	
	$('#list-account-sales-table-body').append(salesTotalAPERetail);
	
	
	var salesTotalMarginRetail = '<tr class="sub-total-row interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon((tyMargin - ilp_thisyearcorporatebusinessytdmargin),(lyMargin - ilp_lastyearcorporatebusinessytdmargin))+'</td>'+
		'<td class="interaction-item-sales-title">Total Margin (Retail)</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+(tyMargin - ilp_thisyearcorporatebusinessytdmargin)+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+(lyMargin - ilp_lastyearcorporatebusinessytdmargin)+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_totallastyearMargin+'</td>'+
	'</tr>';	
	$('#list-account-sales-table-body').append(salesTotalMarginRetail);
	
	//ilp_lastyearpensionaptotalape ilp_lastyearpensionaptotalmargin ilp_lastyearpensionsptotalape ilp_lastyearpensionsptotalmargin ilp_lastyearbondstotalape ilp_lastyearbondstotalmargin ilp_lastyearsavingstotalape ilp_lastyearsavingstotalmargin
	//###	
	//############################################################
	//############################################################
	
	
	
	
	var salesCBAPE = '<tr class="interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearcorporatebusinessytdape,ilp_lastyearcorporatebusinessytdape)+'</td>'+
		'<td class="interaction-item-sales-title">Corporate Business APE</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearcorporatebusinessytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearcorporatebusinessytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearcorporatebusinesstotalape+'</td>'+
	'</tr>';
	$('#list-account-sales-table-body').append(salesCBAPE);
	
	var salesCBMargin = '<tr class="interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyearcorporatebusinessytdmargin,ilp_lastyearcorporatebusinessytdmargin)+'</td>'+
		'<td class="interaction-item-sales-title">Corporate Business Margin</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyearcorporatebusinessytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearcorporatebusinessytdmargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyearcorporatebusinesstotalmargin+'</td>'+
	'</tr>';
	
	$('#list-account-sales-table-body').append(salesCBMargin);
	
	//############################################################
	//############################################################
	//###
	var ilp_thisyeargrandtotalytdape = (retrievedCampaign.attributes["ilp_thisyeargrandtotalytdape"]) ? retrievedCampaign.attributes["ilp_thisyeargrandtotalytdape"].value : "0";	
	var ilp_lastyeargrandtotalytdape = (retrievedCampaign.attributes["ilp_lastyeargrandtotalytdape"]) ? retrievedCampaign.attributes["ilp_lastyeargrandtotalytdape"].value : "0";	
	
	
	var salesTotalAPEAll = '<tr class="total-row interaction-item-sales-ape" style="display:none;">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(ilp_thisyeargrandtotalytdape,ilp_lastyeargrandtotalytdape)+'</td>'+
		'<td class="interaction-item-sales-title">Total APE (All)</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_thisyeargrandtotalytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_lastyeargrandtotalytdape+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+(ilp_totallastyearAPE + ilp_lastyearcorporatebusinessytdape)+'</td>'+
	'</tr>';	
	
	$('#list-account-sales-table-body').append(salesTotalAPEAll);
	
	
	var salesTotalMarginAll = '<tr class="total-row interaction-item-sales-margin">'+
		'<td class="interaction-item-sales-status center">'+getArrowIcon(tyMargin,lyMargin)+'</td>'+
		'<td class="interaction-item-sales-title">Total Margin (All)</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+tyMargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+lyMargin+'</td>'+
		'<td class="interaction-item-sales-figure">&euro;'+ilp_totallastyearMargin+'</td>'+
	'</tr>';	
	$('#list-account-sales-table-body').append(salesTotalMarginAll);
	//##
	//############################################################
	//############################################################
	
	
	// Put the information on the screen
	$('.account-display-screen-title').html(name);
	//$('.account-display-screen-owner').html('<strong>Account Manager:</strong> '+ownerid);
	$('.account-display-screen-address').html(addressFull);
	//$('.account-display-screen-ty-ape').html('<strong>APE YTD:</strong> &euro;'+numberWithCommas(tyAPE));
	$('.account-display-screen-master').html('<strong>Master Code:</strong>'+masterCode);
	
	var brokerProfile = '';
	if(addressFull!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-location-arrow"></i></span><span class="profileText">'+addressFull+'</span><br/>';
	}
	if(ownerid!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-user"></i></span><span class="profileText" style="text-transform: capitalize;">'+ownerid+'</span><br/>';
	}
	if(masterCode!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-id-card"></i></span><span class="profileText">'+masterCode+'</span><br/>';
	}	
	if(volumenumberofcases!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-file"></i></span><span class="profileText">'+volumenumberofcases+' (Last year: '+lyVolumenumberofcases+')</span><br/>';
	}	
	if(website!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-desktop"></i></span><span class="profileText"><a href="'+website+'" target="_new">'+website+'</a></span><br/>';
	}
	if(linkedin!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-linkedin"></i></span><span class="profileText"><a href="'+linkedin+'" target="_new">'+linkedin+'</a></span><br/>';
	}
	if(facebook!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-facebook"></i></span><span class="profileText"><a href="'+facebook+'" target="_new">'+facebook+'</a></span><br/>';
	}
	if(twitter!=''){
		brokerProfile += '<span class="profileIcon"><i class="fa fa-twitter-square"></i></span><span class="profileText"><a href="'+twitter+'" target="_new">'+twitter+'</a></span>';
	}
	
	var brokerInsights='';
				
	var insightshead = "<tr class='list-account-table-header-row'><td colspan='3'>Segmentation</td></tr>";	
	$('#list-account-insights-table-body').append(insightshead);
	///////////////////
	// #first row
	if(brokertype!=''){
		brokerInsights += 
			//'<td class="interaction-item-insights-status center"><i class="fa fa-twitter-square"></i></td>'+
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Type of broker</div><div class="interaction-item-insights-answer">'+brokertype+'</div></td>';	
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Type of broker</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	if(favouredspshape!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Favoured SP Shape</div><div class="interaction-item-insights-answer">'+favouredspshape+'</div></td>';
		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Favoured SP Shape</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(gearedforgrowth!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Geared For Growth</div><div class="interaction-item-insights-answer">'+gearedforgrowth+'</div></td>';
		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Geared For Growth</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');
	//
	//////////////////////
	
	
	///////////////////
	// 
	brokerInsights = '';
	if(estimatedsizeofwalletape!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Estimated Size of Wallet APE</div><div class="interaction-item-insights-answer">'+estimatedsizeofwalletape+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Estimated Size of Wallet APE</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}	
	if(potentialscore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Potential Score</div><div class="interaction-item-insights-answer">'+potentialscore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Potential Score</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}	
	if(threeyp!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Three year profit</div><div class="interaction-item-insights-answer">'+threeyp+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Three year profit</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');	
	///////////////////
	// 
	brokerInsights = '';
	if(bcgclassification!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">BCG</div><div class="interaction-item-insights-answer">'+bcgclassification+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">BCG Classification</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}	
	if(pgsbclassification!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">PGSB Classification</div><div class="interaction-item-insights-answer">'+pgsbclassification+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">PGSB Classification</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}	
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');
	//
	//////////////////////
		
		
	var insightshead = "<tr class='list-account-table-header-row'><td colspan='3'>Marketing Preferences</td></tr>";	
	$('#list-account-insights-table-body').append(insightshead);
	
	///////////////////
	// #3rd row
	brokerInsights = '';
	if(investmentinterest!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Investments</div><div class="interaction-item-insights-answer">'+investmentinterest+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Investments</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	if(mapsinterest!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">MAPs</div><div class="interaction-item-insights-answer">'+mapsinterest+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">MAPs</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	if(complianceinterest!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Compliance</div><div class="interaction-item-insights-answer">'+complianceinterest+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Compliance</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');
	//
	//////////////////////
	
	
	//       
	///////////////////
	// #3rd row
	brokerInsights = '';
	
	if(socialmediainterest!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Compliance</div><div class="interaction-item-insights-answer">'+socialmediainterest+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Compliance</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(protectioninterest!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Protection</div><div class="interaction-item-insights-answer">'+protectioninterest+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Protection</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(pensionsinterest!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Pensions</div><div class="interaction-item-insights-answer">'+pensionsinterest+'</div></td>';	
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Pensions</div><div class="interaction-item-insights-answer">Not Known</div></td>';	
	}
	
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');
	//
	//////////////////////
		
		
		
		
	var insightshead = "<tr class='list-account-table-header-row'><td colspan='3'>Digital & Bline Activity Scores</td></tr>";	
	$('#list-account-insights-table-body').append(insightshead);
		
		  // "pensionsscore","investmentsscore","","calculatorsscore","researchscore","sifscore","protectionscore","compliancescore","","newsscore","mapsscore" 
	///////////////////
	// #3rd row
	brokerInsights = '';
	
	if(emailscore!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Email</div><div class="interaction-item-insights-answer">'+emailscore+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Email</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(webinarscore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Webinars</div><div class="interaction-item-insights-answer">'+webinarscore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Webinars</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(digitalactivityscore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Digital Activity</div><div class="interaction-item-insights-answer">'+digitalactivityscore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Digital Activity</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');
	
	///////////////////
	// #3rd row
	brokerInsights = '';
	
	if(pensionsscore!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Pensions</div><div class="interaction-item-insights-answer">'+pensionsscore+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Pensions</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(investmentsscore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Investments</div><div class="interaction-item-insights-answer">'+investmentsscore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Investments</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(calculatorsscore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Calculators Activity</div><div class="interaction-item-insights-answer">'+calculatorsscore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Calculators Activity</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
		  // "","","","","researchscore","sifscore","","","","","mapsscore" 
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');	///////////////////
	// #3rd row
	brokerInsights = '';
	
	if(protectionscore!=''){
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Protection</div><div class="interaction-item-insights-answer">'+protectionscore+'</div></td>';		
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Protection</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(compliancescore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Compliance</div><div class="interaction-item-insights-answer">'+compliancescore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">Compliance</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	if(newsscore!=''){
		
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">News</div><div class="interaction-item-insights-answer">'+newsscore+'</div></td>';
	}else{
		brokerInsights += 
			'<td class="interaction-item-insights-description"><div class="interaction-item-insights-subtitle">News</div><div class="interaction-item-insights-answer">Not Known</div></td>';
	}
	
	$('#list-account-insights-table-body').append('<tr>'+brokerInsights+'</tr>');
	//
	//////////////////////
		
						
	$('.account-display-screen-details').html(brokerProfile);
	//$('.account-display-screen-ty-margin').html('<strong>Margin YTD:</strong> &euro;'+numberWithCommas(tyMargin));
	
	var addressMap = addressFull.replace('&', '+');
	addressMap = encodeURIComponent(addressMap);
	$('.account-display-screen-map').html('<img src="https://maps.googleapis.com/maps/api/staticmap?center='+addressMap+'+ireland&zoom=8&scale=1&size=400x260&maptype=roadmap&key=AIzaSyD5qHo4s42uXSLbnx1qtIUJvCbSCNcHYcE&format=jpg&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C'+addressMap+',ireland" alt="Google Map of ireland"> ');
	
	
	// when user clicks the add interaction button on the account screen
	$('.account-display-add-interaction').click(function() {
		
		// set up (reset) the modal divs and title
		$('.account-sub-screen-interaction-screen-details').show();
		$('.account-modal-holder').show();
		$('.account-sub-screen-add-contact').hide();
		$('.account-sub-screen-interaction-screen-notification').hide();
		$('.account-sub-screen-interaction-screen-tasks').hide();
		$('.account-modal-title').html('1. Add Interaction');
			
		try {
			$("#interactionNotifyList").tokenInput('destroy');
			$("#taskNotifyList").tokenInput('destroy');
			$("#taskContactList").tokenInput('destroy');
		}catch(e){}
		
		$('.account-modal').modal();
		
		$('.addInteraction').off(); // remove old click binds
		$('.addSingleTask').off(); // remove old click binds
		$('.addInteractionDetails').off(); // remove old click binds
		$('.addInteractionTasks').off(); // remove old click binds
		$('.addTasksYes').off(); // remove old click binds
		$('.addAnotherTaskYes').off(); // remove old click binds
		$('.closeAddTask').off(); // remove old click binds
		
		// this is the auto fill for the notify input box
            $("#interactionNotifyList").tokenInput(userInfo, {
              hintText: "Search for an email address",
              propertyToSearch: "email",
              resultsFormatter: function(item){ return "<li>" + toTitleCase(item.name) +"</li>" },
              tokenFormatter: function(item) { return "<li>" + toTitleCase(item.name) + " (" + item.email + ")</li>" }
          });
		// this is the auto fill for the notify input box
            $("#taskNotifyList").tokenInput(userInfo, {
              hintText: "Search for an email address",
              propertyToSearch: "email",
				tokenLimit: 1,
              resultsFormatter: function(item){ return "<li>" + toTitleCase(item.name) +"</li>" },
              tokenFormatter: function(item) { return "<li>" + toTitleCase(item.name) + " (" + item.email + ")</li>" }
          });
		  
		  
		$('.addInteractionDetails').click(function() {
			// go to the notify step
			
			$('.account-sub-screen-interaction-screen-details').hide();
			$('.account-sub-screen-interaction-screen-notification').fadeIn();
			$('.account-modal-title').html('2. Notify CRM Users');
		  
		});

		$('.addInteractionTasks').click(function() {
			
			$('.account-sub-screen-interaction-screen-notification').hide();
			$('.account-sub-screen-interaction-screen-tasks').fadeIn();
			$('.account-modal-title').html('3. Add some tasks');
		  
		});
		$('.addTasksYes').click(function() {
			//add the interaction first and then ask for tasks
			var interactionID = $('.account-display').data();
			createInteraction(interactionID.id,true);
						
			$('.tasks-question').hide();
			$('.tasks-add').fadeIn();
			$('.account-modal-title').html('3. Add some tasks');
		  
		});
		$('.addAnotherTaskYes').click(function() {
			//add the interaction first and then ask for tasks
			$('.tasks-question,.tasks-result-success,.tasks-result-error').hide();
			$('.tasks-add').fadeIn();
			$('.account-modal-title').html('3. Add some tasks');
		  
		});
		$('.closeAddTask').click(function() {
			
			try {
				$("#taskNotifyList").tokenInput('destroy');
			}catch(e){}
			$("#taskDescription").html('');
			$.modal.close();
		});
		$('.addInteraction').click(function() {
			
			var interactionID = $('.account-display').data();
			createInteraction(interactionID.id,false);
		  
		});
		$('.addSingleTask').click(function() {
			
			var interactionID = $('.account-display').data();
			createSingleTask(interactionID.id);
		  
		});
		
	});
	
	
	
	$('#salesFiguresToggle').click(function(){
		if ($('#salesFiguresToggle').is(":checked"))
		{
			$('.interaction-item-sales-ape').show();
			$('.interaction-item-sales-margin').hide();
			//$('.thTaskHead').show();
			//$('.thInitHead').hide();
			//console.log('checked');
			
		}else{
			
			$('.interaction-item-sales-ape').hide();
			$('.interaction-item-sales-margin').show();
			//console.log('not checked');
		}
		
		
	});
	
	
	// when user clicks the add interaction button on the account screen
	
	$('.account-display-show-contacts').off(); // remove old click binds
	$('.account-display-show-contacts').click(function() {
		
		$('#list-contacts-header-bar').show();
		var account = $('.account-display').data();
			
		clearAccountDetails();
		
		var contacts = getAccountContacts(account.id);
		
		
		setTimeout(function() {
			displayAllContacts(contacts);
		}, 10); 
		
		$('.account-display-show-contacts').addClass('selected');
	});
	
	
	$('.account-display-show-sales').off(); // remove old click binds
	$('.account-display-show-sales').click(function() {
		
		var account = $('.account-display').data();
			
		clearAccountDetails();
		
		$('#list-sales').fadeIn();
		$('#list-account-sales-table').show();
		
		//var figures = getAccountContacts(account.id);
		
		
		$('.account-display-show-sales').addClass('selected');
	});
		
		
	$('.account-display-add-task-btn').off(); 
	$('.account-display-add-task-btn').click(function(){
		
		$('.account-modal-holder').show();
		$('.account-modal-holder-success').hide();
		$('.account-modal-holder-error').hide();
			
		var account = $('.account-display').data();
			
		clearAccountDetails();
		
		$('.account-task-modal').modal();
		$('.addAccountTask').off(); 
		$('.addAccountTask').click(function(){
			var t = $('#accountTaskTitle').val();
			var d = $('#accountTaskDesc').val();
			createAccountTask(account.id, t, d,owneridcode);	
		});
	});
	
	
		
	$('.account-display-add-phonecall-btn').off(); 
	$('.account-display-add-phonecall-btn').click(function(){
		
		$('.account-call-modal-info').show();
		$('.account-call-modal').show();
		$('.account-call-modal-success').hide();
		$('.account-call-modal-error').hide();
			
		var account = $('.account-display').data();
			
		clearAccountDetails();
		
		$('.account-call-modal').modal();
		$('.addAccountCall').off(); 
		$('.addAccountCall').click(function(){
			var t = $('#accountCallTitle').val();
			var d = $('#accountCallDesc').val();
			createAccountCalltask(account.id, t, d,owneridcode);	
		});
	});
	
	
	$('.account-display-add-to-list-btn').off(); 
	$('.account-display-add-to-list-btn').click(function(){
		
		var marketingLists = getMyMarketingLists();
		//console.log('asdasd '+JSON.stringify(marketingLists));
		//$('.account-add-list-modal').show();
		$('.account-modal-add-list-success').hide();
		$('.account-modal-add-list-error').hide();
			
		var account = $('.account-display').data();
			
		clearAccountDetails();
		$('.account-add-list-modal').modal();
		var listhtml='';
		//<option value="loading">Loading...</option>
		if (marketingLists.length<=0){
			
		$('.account-add-list-list').html("You don't have any marketing lists to add this account to.");
		}else{
			
			for(var i = 0; i<marketingLists.length; i++){
				listhtml += '<option value="'+marketingLists[i].listid.value+'">'+marketingLists[i].listname.value+'</option>';
			}
		$('.account-add-list-list').html(listhtml);
		}

	});
	
	
	$('.account-display-add-to-list-complete').off(); 
	$('.account-display-add-to-list-complete').click(function(){
		var account = $('.account-display').data();
		var brokerID = account.id;
		var listID = $('.account-add-list-list').val();
		addBrokerToList(brokerID,listID);
	});
	
	
		
	
	$('.account-display-show-insights').off(); // remove old click binds
	$('.account-display-show-insights').click(function() {
		
		var account = $('.account-display').data();
			
		clearAccountDetails();
		
		$('#list-insights').fadeIn();
		$('#list-account-insights-table').show();
		
		//var figures = getAccountContacts(account.id);
		
		
		$('.account-display-show-insights').addClass('selected');
	});
		
		
		
	$('.account-display-open-account').off();
	$('.account-display-open-account').click(function() {
		
		Xrm.Utility.openEntityForm("account",  $('.account-display').data('id'));
		
		/*
		var host = location.host;
		if (host.indexOf("serv8613") >= 0)
		{
			host = host+"/main.aspx";
		}
		else if (host.indexOf("uatcrm") >= 0)
		{
			host = host+"/TestCRM/main.aspx";
			
		}else{
			
			host = host+"/main.aspx";
		}
			
			
		
		var win = window.open(location.protocol + "//" + host+'?etc=1&pagetype=entityrecord&id='+$('.account-display').data('id'), '_blank');
		
		if (win) {
			//Browser has allowed it to be opened
			win.focus();
		} else {
			//Browser has blocked it
			alert('Please allow popups for this website');
		}
*/

	});
		
		
}

function addBrokerToList(brokerID,listID){
	
	//console.log('brokerID ' +brokerID);
	//console.log('listID ' +listID);
	
	
	var notify = getTaskNotifyUser();

	
	var list = new XrmServiceToolkit.Soap.BusinessEntity("list",listID);

    list.attributes["ownerid"] = {  id: '{'+listID+'}', logicalName: "list", type: "EntityReference" }
    list.attributes["ilp_accountid"] = {  id: '{'+brokerID+'}', logicalName: "account", type: "EntityReference" }

    response = XrmServiceToolkit.Soap.Update(list,function(r){
		 if (r != "") {
			$('.tasks-add').hide();
			$('.tasks-result-success').fadeIn();
		}else{
			
			$('.tasks-add').hide();
			$('.tasks-result-error').fadeIn();
		}
	});


}

function setupInteractionsTable(tasks,inters,tableID){
	
	$('.interactions-empty').hide();
	
	var count = parseInt(tasks.length)+parseInt(inters.length);
	
	if (count==0){
		// there are no initiatives or connected tasks
		$('#'+tableID).show();
		$('#'+tableID+'-table').hide();
		$('#all-interactions-loading').hide();	
		$('.interactions-empty').show();
	}else{
		
		//////////////////////////////////////////////////
		// For any set of tasks and interactions we group 
		// them together in the same manner. e.g. they will
		// be presented the same on any page like the Account
		// page or the "platform Initiatives" page.
		// tableID = the resulting table to show the interactions on
		
		// Set up the head and body of the table we populate
		var thead = "<tr><th class='interaction-item-statusValue thInitHead center'>&nbsp;</th><th class='interaction-item-task thInitHead center'>Tasks</th><th class='interaction-item-statusValue thTaskHead center' colspan='2' style='display:none;'>Status</th><th class='interaction-item-broker'>Broker</th><th class='interaction-item-name'>Title</th><th class='interaction-item-owner'>Owner</th><th class='interaction-item-created'> Created</th><th class='interaction-item-due'>Due</th></tr>";
		
		$('#'+tableID+'-table-head').html(thead);
		$('#'+tableID+'-table-body').html('');
		
		// set up the initiatives first
		for(var i = 0; i<inters.length; i++)	{
			
			var name, desc, date,datev, statusValue, initiativeID, ownerName, brokerName;
			name = (inters[i].attributes['ilp_name']) ? inters[i].attributes['ilp_name'].value : "";  ;
			desc = (inters[i].attributes['ilp_description']) ? inters[i].attributes['ilp_description'].value : ""; 
			date = inters[i].attributes['createdon'].formattedValue;
			datev = inters[i].attributes['createdon'].value;
			statusValue = inters[i].attributes['statuscode'].formattedValue;
			initiativeID = inters[i].attributes['ilp_initiativeid'].value;
			ownerName = inters[i].attributes['ownerid'].name;
			brokerID = inters[i].attributes['ilp_accountid'].id;
			brokerName = inters[i].attributes['ilp_accountid'].name;			
			//createdby = inters[i].attributes['createdby'].name;				
				
				// add the initiatives to the tag
			$('#'+tableID+'-table-body').append(
				'<tr class="interaction-initiative interaction-initiative-'+initiativeID+'" data-intitiativeid="'+initiativeID+'">'+
					'<td class="interaction-item-statusValue center">'+getStatusIcon(statusValue)+'</td>'+
					'<td class="interaction-item-task interaction-item-id-'+initiativeID+' center ">0</td>'+
					'<td class="interaction-item-broker openbroker" data-brokerid="'+brokerID+'">'+toTitleCase(brokerName)+'</td>'+
					'<td class="interaction-item-name"><a href="javascript:void(0);" class="initiative-open">'+name+'</a> - '+desc+'</td>'+
					'<td class="interaction-item-owner">'+toTitleCase(ownerName)+'</td>'+
					'<td class="interaction-item-created prettydate" data-date-format="D.M.YYYY h:m">'+datev+'</td>'+
					'<td class="interaction-item-due">'+date+'</td>'+
				'</tr>'
				);
			//reset any related counters	
			$('.interaction-item-id-'+initiativeID).html('0');
		}
		
		// set up the tasks now - connecting the tasks to the parent intiative
		for(var i = 0; i<tasks.length; i++)
		{
			
			var taskOwner, taskSubject, taskDesc, taskActivityStatus, taskRegarding, taskDueDate, taskInitiativeName, taskInitiativeID, taskID;
			var initAccount, initBrokerSegment, initCategory, initDesc, initDueDate, initName, initOwner, initStatus, initStatusReason;		
			
			taskOwner = (tasks[i].attributes['ownerid']) ? tasks[i].attributes['ownerid'].name : "";  		
			taskSubject = (tasks[i].attributes['subject']) ? tasks[i].attributes['subject'].value : "";  		
			taskDesc = (tasks[i].attributes['description']) ? tasks[i].attributes['description'].value : "";  		
			taskActivityStatus = (tasks[i].attributes['statuscode']) ? tasks[i].attributes['statuscode'].formattedValue : ""; 		
			taskStatusReason = (tasks[i].attributes['statuscode']) ? tasks[i].attributes['statuscode'].formattedValue : ""; 		
			taskRegarding = (tasks[i].attributes['ah.ilp_accountid']) ? tasks[i].attributes['ah.ilp_accountid'].name : "";  		
			taskRegardingID = (tasks[i].attributes['ah.ilp_accountid']) ? tasks[i].attributes['ah.ilp_accountid'].id : "";  		
			taskDueDate = (tasks[i].attributes['scheduledend']) ? tasks[i].attributes['scheduledend'].value : ""; 		
			taskInitiativeName = (tasks[i].attributes['regardingobjectid']) ? tasks[i].attributes['regardingobjectid'].name : ""; 		
			taskInitiativeID = (tasks[i].attributes['regardingobjectid']) ? tasks[i].attributes['regardingobjectid'].id : ""; 		
			taskID = (tasks[i].attributes['activityid']) ? tasks[i].attributes['activityid'].value : ""; 
			
			
			// Go back to the interaction and update the Counter for the tasks when we
			// find that a task exists for that initiative
			if(!$( ".interaction-item-id-"+taskInitiativeID ).hasClass( "toggleInitiativeTasks" )){		
				$(".interaction-item-id-"+taskInitiativeID).addClass('toggleInitiativeTasks');	
			}else{
				// do nothing right now				
			}
			
			var num = parseInt($(".interaction-item-id-"+taskInitiativeID).text());
			$(".interaction-item-id-"+taskInitiativeID).text(num+1);
			
			var taskRow = '<tr class="interaction-task interaction-toggle-'+taskInitiativeID+'" data-parent-initiative="'+taskInitiativeID+'" style="display:none;">'+
					'<td class="interaction-item-statusValue center" colspan="2">'+getStatusIcon(taskActivityStatus)+'</td>'+
					'<td class="interaction-item-broker openbroker" data-brokerid="'+taskRegardingID+'">'+toTitleCase(taskRegarding)+'</td>'+
					'<td class="interaction-item-name">'+taskSubject+' - '+taskDesc+'</td>'+
					'<td class="interaction-item-owner">'+toTitleCase(taskOwner)+'</td>'+
					'<td class="interaction-item-created">'+taskDueDate+'</td>'+
					'<td class="interaction-item-due">'+taskDueDate+'</td>'+
				'</tr>';
			
			$('.interaction-initiative-'+taskInitiativeID).after(taskRow);
			
		}
		
		// add a listener for the inititives that have tasks to toggle viewing those tasks
		$('.toggleInitiativeTasks').click(function(){
			var d = $(this).parent().data();		
			$(".interaction-toggle-"+d.intitiativeid).toggle();		
			$(this).closest('tr').toggleClass('selected');		
		});
		
		// add a listener for the initiative parent account - open account with specific ID in CRM
		$('.initiative-open').click(function(){
			var d = $(this).closest('tr').data();
			openCRMEntity('ilp_initiative',d.intitiativeid)
		})
		
		// add a listener that opens the broker in the CRM when the link is clicked
		$('.openbroker').click(function(){
			var d = $(this).data();
			
			openCRMEntity('account',d.brokerid)
		})
		$(".prettydate").prettydate();
		$('#'+tableID+"-table").fadeIn();
		$('#'+tableID).fadeIn();
		$('#list-search-loading').hide();
	}
	
	$('.refreshAllInteractions').click(function(){
	
		clearAccountDetails();
		
		$('.refreshAllInteractions').eventPause();
		
		var subID = $('.refreshAllInteractions').data();
		
		setTimeout(function() {
			showAccountInteractions(subID.id);
			$('.refreshAllInteractions').delay(500).eventPause('active');
			$('.refreshAllInteractions').addClass('selected');
		  }, 10);
	});
	
	$('#tasksToggle').click(function(){
		if ($('#tasksToggle').is(":checked"))
		{
			$('.interaction-task').show();
			$('.interaction-initiative').hide();
			$('.thTaskHead').show();
			$('.thInitHead').hide();
			
		}else{
			
			$('.interaction-task').hide();
			$('.interaction-initiative').show();
			$('.thTaskHead').hide();
			$('.thInitHead').show();
		}
		
		
	});
	
	
	
	
	
	
	

	// show on screen
	
}




























function clearPage(){
	$('.account-display,#list-search,#list-interactions,#list-all-interactions,.interactions-empty,#all-interactions-loading,#list-contacts,#graphs,#list-account-interactions,#home-page,#list-contacts-header,#list-contacts-header-bar,#list-contacts-search,.contacts-empty,#account-menu').hide();
	$('.clear').hide();
	$('.empty').html('');
	$('#list-search-loading').show();
}
function clearAccountDetails(){
	
	$('#list-search,#list-interactions,#list-all-interactions,.interactions-empty,#all-interactions-loading,#list-contacts,#list-account-interactions,#list-contacts-search,.contacts-empty,#list-sales,#list-insights').hide();
	$('.accountMenuLink').removeClass('selected');
}
function setMenuItem(menuItem){
	clearPage();
	$('.selected').removeClass('selected');
	$('.'+menuItem).addClass('selected');
}
















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
	var statusIcon = '<i class="fa fa-comments" aria-hidden="true"></i>'; //class="warningIcon tip" 
		if (statusValue=="Closed"){
			statusIcon = '<i style="color:#50C9B5;" class="fa fa-check-circle tip" data-tip="Initiative Closed" aria-hidden="true"></i>';
		}
		else if (statusValue=="Opened"){
			statusIcon = '<i style="color:#E21166;" class="fa fa-folder-open-o tip" data-tip="Initiative Open"aria-hidden="true"></i>';
		}
		else if(statusValue=="In Progress"){
			statusIcon = '<i style="color:#E21166;" class="fa fa-hourglass-half tip" data-tip="Initiative Open"aria-hidden="true"></i>';
		}
		else if(statusValue=="Waiting on someone else"){
			statusIcon = '<i style="color:#FCB364;" class="fa fa-pause tip" data-tip="Waiting on someone else" aria-hidden="true"></i>';
		}
		else if(statusValue=="Not Started"){
			statusIcon = '<i style="color:#E21166;" class="fa fa-exclamation-circle tip" data-tip="Not Started" aria-hidden="true"></i>';
		}
		else if(statusValue=="Completed"){
			statusIcon = '<i style="color:#50C9B5;" class="fa fa-check-circle tip" data-tip="Closed" aria-hidden="true"></i>';
		}
		else if(statusValue=="Deferred"){
			statusIcon = '<i style="color:#2196F3;" class="fa fa-clock-o tip" data-tip="Deffered" aria-hidden="true"></i>';
		}
		
		return statusIcon;
	
}


function getNotifyUser(){
	
	return $("#interactionNotifyList").tokenInput("get");
	
}
function getTaskNotifyUser(){
	
	return $("#taskNotifyList").tokenInput("get");
	
}

function getContactAccountManagerUser(){
	
	return $("#taskContactList").tokenInput("get");
	
}

function createContact(accountID,accountName){
		
		var taskContactFirst = $('#taskContactFirst').val();
		var taskContactSecond = $('#taskContactSecond').val();
		var taskContactEmail = $('#taskContactEmail').val();
		var taskContactMobile = $('#taskContactMobile').val();
		var taskContactLandline = $('#taskContactLandline').val();
		var am = getContactAccountManagerUser();

		var validEntryCount=0;
		
		if (taskContactFirst.length>2 && taskContactFirst.length<=30){
			validEntryCount++;
			 $('#taskContactFirst').removeClass('errorInput');
		}
		else{
			 $('#taskContactFirst').addClass('errorInput');
		}
		
		if (taskContactSecond.length>2 && taskContactSecond.length<=30){
			validEntryCount++;
			 $('#taskContactSecond').removeClass('errorInput');
		}
		else{
			 $('#taskContactSecond').addClass('errorInput');
		}
		if (am.length>=1){
			validEntryCount++;
			 $('.token-input-list').removeClass('errorInput');
		}
		else{
			 $('.token-input-list').addClass('errorInput');
		}
		
		
		// validate the email address
		if (isValidEmailAddress(taskContactEmail)){
			
			validEntryCount++;
			 $('#taskContactEmail').removeClass('errorInput');
		}
		else{
			 $('#taskContactEmail').addClass('errorInput');
		}
		
		
		if (validEntryCount=="4"){
			try {
				var contact = {};

				var dateTask = new Date(1900, 01, 01);
				
				contact.FirstName = taskContactFirst;
				contact.LastName = taskContactSecond;
				contact.Telephone1 = taskContactMobile;
				contact.EMailAddress1 = taskContactEmail;
				contact.Telephone3 = taskContactLandline;
				contact.GenderCode = { Value: 2 };
				contact.DoNotEMail = false;
				contact.DoNotPhone = false;
				contact.BirthDate = dateTask;
				contact.ParentCustomerId = {Id: ''+accountID+'', LogicalName: "account" };
				contact.OwnerId = { Id: ''+am[0].id, LogicalName: "systemuser" }; 
				XrmServiceToolkit.Rest.Create(
								contact,
								"ContactSet",
								function (result) {
									$('.contact-add').hide();
									$('.contact-result-success').show();
								},
								function (error) {
									$('.contact-add').hide();
									$('.contact-result-error').show();
								},
								false
				);
			}
			catch(err) {
				
					var params = {};
					params["firstname"] = taskContactFirst;
					params["lastname"] = taskContactSecond;
					params["telephone1"] = taskContactMobile;
					params["emailaddress1"] = taskContactEmail;
					params["telephone3"] = taskContactLandline;
					params["donotemail"] = false;
					params["donotphone"] = false;
					params["parentcustomerid"] = accountID;
					params["parentcustomeridtype"] = "account";
					params["parentcustomeridname"] = accountName;
					//params["parentcustomerid"] = {Id: ''+accountID+'', LogicalName: "account" };
					params["ownerid"] = am[0].id
					params["owneridname"] = am[0].name
					params["owneridtype"] =  "systemuser"; 
					
					Xrm.Utility.openEntityForm("contact", null, params);
					//console.log("error params: "+JSON.stringify(params));

			}
		}

}

function createSingleTask(accountID) {
	
	var notify = getTaskNotifyUser();
	var initiativeid = $('.account-display').data( "initiativeid" );

	var taskDescription = $('#taskDescription').val();
	
	var createTask = new XrmServiceToolkit.Soap.BusinessEntity("task");
    createTask.attributes["subject"] = "Task assigned";
    createTask.attributes["description"] = ""+taskDescription;

    createTask.attributes["regardingobjectid"] = { id: "{"+initiativeid+"}", logicalName: "ilp_initiative", type: "EntityReference" }
    createTask.attributes["ownerid"] = {  id: '{'+notify[0].id+'}', logicalName: "systemuser", type: "EntityReference" }
    createTask.attributes["ilp_accountid"] = {  id: '{'+accountID+'}', logicalName: "account", type: "EntityReference" }

    response = XrmServiceToolkit.Soap.Create(createTask,function(r){
		 if (r != "") {
			$('.tasks-add').hide();
			$('.tasks-result-success').fadeIn();
		}else{
			
			$('.tasks-add').hide();
			$('.tasks-result-error').fadeIn();
		}
	});
}

function createAccountTask(accountID,subject,description,ownerid) {

	var taskDescription = $('#taskDescription').val();
	var dateTask = new Date();
	//console.log('ownerid '+ownerid);
	//console.log('accountID '+accountID);
	//console.log('dateTask '+dateTask);
	var createTask = new XrmServiceToolkit.Soap.BusinessEntity("task");
    createTask.attributes["subject"] = ""+subject;
    createTask.attributes["description"] = ""+description;
    createTask.attributes["scheduledend"] = { value:dateTask , type: "DateTime" };

    createTask.attributes["ownerid"] = {  id: '{'+ownerid+'}', logicalName: "systemuser", type: "EntityReference" }
    createTask.attributes["ilp_accountid"] = {  id: '{'+accountID+'}', logicalName: "account", type: "EntityReference" }
    createTask.attributes["regardingobjectid"] = { id: "{"+accountID+"}", logicalName: "account", type: "EntityReference" }

    var response = XrmServiceToolkit.Soap.Create(createTask,function(r){
		 if (r != "") {
			// $('.account-display-add-task-btn').off(); // remove this bind so that you don't add multiples
			$('.account-modal-holder').hide();
			$('.account-modal-holder-success').fadeIn();
		}else{
			$('.account-modal-holder').hide();
			$('.account-modal-holder-error').fadeIn();
		}
	});
}


function createAccountCalltask(accountID,subject,description,ownerid) {

	var taskDescription = $('#taskDescription').val();
	var dateTask = new Date();
	// console.log('dateTask '+dateTask);
	var createTask = new XrmServiceToolkit.Soap.BusinessEntity("phonecall");
    createTask.attributes["subject"] = ""+subject;
    createTask.attributes["description"] = ""+description;
	
	var userID = Xrm.Page.context.getUserId();
	  var fromInfo = [
       { id: userID, logicalName: "systemuser", type: "EntityReference" } // broker Data User
    ];
    createTask.attributes["from"] = { value: fromInfo, type: "EntityCollection" };
	
    var to = [];
	  to.push(
			{id: accountID, logicalName: "account", type: "EntityReference"}
		);

    createTask.attributes["to"] = { value: to, type: "EntityCollection" };
	
    createTask.attributes["scheduledend"] = { value:dateTask , type: "DateTime" };

    createTask.attributes["ownerid"] = {  id: '{'+ownerid+'}', logicalName: "systemuser", type: "EntityReference" }
    createTask.attributes["regardingobjectid"] = { id: "{"+accountID+"}", logicalName: "account", type: "EntityReference" }

    var response = XrmServiceToolkit.Soap.Create(createTask,function(r){
		 if (r != "") {
			// $('.account-display-add-task-btn').off(); // remove this bind so that you don't add multiples
			$('.account-call-modal-info').hide();
			$('.account-call-modal-success').fadeIn();
		}else{
			$('.account-call-modal-infor').hide();
			$('.account-call-modal-error').fadeIn();
		}
	});
}


function sendFeedback(emailID,title,query) {
	
	
	var dateTask = new Date();
	var userID = Xrm.Page.context.getUserId();
	var createTask = new XrmServiceToolkit.Soap.BusinessEntity("task");
    createTask.attributes["subject"] = title;
    createTask.attributes["description"] = getUserNameFromID(userID)+" - "+query;
    createTask.attributes["scheduledend"] = { value:dateTask , type: "DateTime" };
    createTask.attributes["ownerid"] = {  id: '{'+emailID+'}', logicalName: "systemuser", type: "EntityReference" }

    response = XrmServiceToolkit.Soap.Create(createTask,function(r){
		 if (r != "") {
			$('.star-feedback-complete').fadeIn();
			$('.star-feedback-show').hide();
		}else{
			
			$('.star-feedback-complete').hide();
			$('.star-feedback-complete-error').fadeIn();
		}
	});
}

function createInteraction(id,addtasks) {
	
	var n = $('#interactionTitle').val();
	var d = $('#interactionDescription').val();
	
	 var initiative = {};
	initiative.ilp_name = n;
	initiative.ilp_description = d;
	initiative.ilp_accountid = {
            Id: id,
            LogicalName: "account"
        }; 
	 //XrmServiceToolkit.Rest.Create(entity,"ilp_initiative",function (result) {var newEntityId = result.CustomerAddressId;},
	 XrmServiceToolkit.Rest.Create(
                initiative,
                "ilp_initiativeSet",
                function (result) {
					var iID = JSON.stringify(result.ilp_initiativeId);
					
					var newInitiative = iID.replace(/"/g, '');
					
					createMyEmail(newInitiative);
					
					$('.account-display').data( "initiativeid", newInitiative );
					
					if(!addtasks){
						
						$.modal.close();
					}
                    // Implement your logic as needed.
                },
                function (error) {
                    equal(true, false, error.message);
                },
                false //synchronous call
            );
}


function createTask(subject,description,assignedto) {
	
	
	 var task = {};
	task.ilp_name = subject;
	task.ilp_description = description;
	task.ilp_accountid = {
            Id: id,
            LogicalName: "systemuser"
        };
			
	var notify = getTaskNotifyUser();
	
	var createTask = new XrmServiceToolkit.Soap.BusinessEntity("task");
    createTask.attributes["subject"] = subject;
    createTask.attributes["description"] = ""+description;

    createTask.attributes["regardingobjectid"] = { id: "{"+initiativeid+"}", logicalName: "ilp_initiative", type: "EntityReference" }
    createTask.attributes["ownerid"] = {  id: '{'+notify[0].id+'}', logicalName: "systemuser", type: "EntityReference" }

    response = XrmServiceToolkit.Soap.Create(createTask,function(r){
		 if (r != "") {
			$('.tasks-add').hide();
			$('.tasks-result-success').fadeIn();
			
		}else{
			
			
			$('.tasks-add').hide();
			$('.tasks-result-error').fadeIn();
		}
	});
		
		
		
		
		
		
		
		
	// to do
		
	//XrmServiceToolkit.Rest.Create(entity,"ilp_initiative",function (result) {var newEntityId = result.CustomerAddressId;},
	 XrmServiceToolkit.Rest.Create(
                task,
                "task",
                function (result) {
					var iID = JSON.stringify(result.ilp_initiativeId);
					
					var newInitiative = iID.replace(/"/g, '');
					
					createMyEmail(newInitiative);
					
					$('.account-display').data( "initiativeid", newInitiative );
					
					if(!addtasks){
						
						$.modal.close();
					}
                    // Implement your logic as needed.
                },
                function (error) {
                    equal(true, false, error.message);
                },
                false //synchronous call
            );
}
function getCurrentUserInformation(){
	//fullname
	//systemuserid
	//internalemailaddress
	// businessunitid
	var userID = Xrm.Page.context.getUserId();
//	var userName = Xrm.Page.context.getUserName();
	var userRoles = Xrm.Page.context.getUserRoles();
	
	var userInfo = new Object();
	userInfo.id=userID;
	//userInfo.name=userName;
	userInfo.roles=userRoles;
	
	return userInfo;
}
function createMyEmail(interactionID) {
	// who needs to be notified
	var notify = getNotifyUser();
	var userID = Xrm.Page.context.getUserId();
					
	var createEmail = new XrmServiceToolkit.Soap.BusinessEntity("email");
    createEmail.attributes["subject"] = "STAR LITE - PORTUS CRM Notification from "+getUserNameFromID(userID);
    createEmail.attributes["description"] = "There has been an activity update for "+$('.account-display').data('name')+" on the Broker CRM - STAR.<br/><br/><strong>You are being notified by "+getUserNameFromID(userID)+" </strong>";

	
	// bkrdata user is a different ID in each partition
	// VM = 1B13CB41-1328-4CF1-A3FB-A217D2666FA4
	// UAT = E0310CC1-0320-4B70-98C0-5E26626ED113
	// PROD_ERROR = FC7D2EC0-595E-E111-B660-005056995BB7
	// PROD = B7A01A6A-6F84-4698-A49D-820C7C9923CF;

	var bkrdataID = '';
	var host = location.host;
	if (host.indexOf("serv8613") >= 0)
	{
		bkrdataID = '1B13CB41-1328-4CF1-A3FB-A217D2666FA4';
	}
	else if (host.indexOf("uatcrm") >= 0)
	{
		bkrdataID = 'E0310CC1-0320-4B70-98C0-5E26626ED113';
		
	}else{
		// default is always PROD
		bkrdataID = 'B7A01A6A-6F84-4698-A49D-820C7C9923CF';
	}
		
		
    var from = [
       { id: bkrdataID, logicalName: "systemuser", type: "EntityReference" } // broker Data User
    ];
    createEmail.attributes["from"] = { value: from, type: "EntityCollection" };
	
    var to = [];
	$.each(notify, function(key,value) {
	  to.push(
			{id: value.id, logicalName: "systemuser", type: "EntityReference"}
		);
	}); 

    createEmail.attributes["to"] = { value: to, type: "EntityCollection" };
	
    var regarding = [
       { id: interactionID, logicalName: "ilp_initiative", type: "EntityReference" }
    ];
    createEmail.attributes["regardingobjectid"] = { id: interactionID, logicalName: "ilp_initiative", type: "EntityReference" }
 
    createEmail.attributes["directioncode"] = true;

    emailId = XrmServiceToolkit.Soap.Create(createEmail);
	
	
}

function displayAllContacts(contacts){
	
	$('#list-account-contacts-table-head').html('');
	$('#list-account-contacts-table-body').html('');
	
	if (contacts.length<=0){
		$('.contacts-empty').show();
		$('#list-search-loading').hide();
		$('#all-contacts-loading').hide();
		$('#list-contacts').fadeIn();
	}
	else{
		$('.contacts-empty').hide();	
		$('.contacts-message').show();	
		var thead = "<tr><th class='interaction-item-statusValue center'>&nbsp;</th><th class='interaction-item-fullname'>Name</th><th class='interaction-item-email'>Email</th><th class='interaction-item-phone'>Phone</th><th class='interaction-item-role'>Role</th><th class='interaction-item-broker'>Broker</th></tr>";		
			
		$('#list-account-contacts-table-head').html(thead);
	
		$.each( contacts, function( key, v ) {
		
		var email = (v.emailaddress1) ? v.emailaddress1.value : "unknown";
		var fullname = (v.fullname) ? v.fullname.value : "unknown";
		var telephone1 = (v.telephone1) ? v.telephone1.value : "unknown";
		var role = (v.role) ? v.role.formattedValue : "unknown";
		var contactid = (v.contactid) ? v.contactid.value : "";
		var broker = (v.broker) ? v.broker.name : "";
					
						
			$('#list-account-contacts-table-body').append(
				'<tr>'+
					'<td class="interaction-item-statusValue center"><a href="javascript:void(0);" style="color:#50C9B5;"class="openContactCRM" data-contactid="'+contactid+'"><i class="fa fa-user-circle-o" aria-hidden="true"></i></a></td>'+
					'<td class="interaction-item-fullname contact-display">'+fullname+'</td>'+
					'<td class="interaction-item-email contact-display"><a href="mailto:'+email+'">'+email+'</a></td>'+
					'<td class="interaction-item-phone contact-display">'+telephone1+'</td>'+
					'<td class="interaction-item-role contact-display">'+role+'</td>'+
					'<td class="interaction-item-broker contact-display">'+broker+'</td>'+
				'</tr>'
				);
		});
		
		
		
		$('.openContactCRM').click(function(){
			var contactID = $(this).data( "contactid" );
			openCRMEntity('contact',contactID);
		});
		
		
		$('#all-contacts-loading').hide();
		$('#list-search-loading').hide();
		$('#list-contacts').fadeIn();
		$('#list-account-contacts-table').fadeIn();
	}
	
		// when user clicks the add interaction button on the account screen
		$('.account-display-add-contact').click(function() {
		
			$('.account-sub-screen-add-contact').show();
			$('.account-modal-holder').show();
			$('.contact-add').show();		
			$('.contact-result-success').hide();	
			$('.contact-result-error').hide();	
			$('.account-sub-screen-interaction-screen-details').hide();	
			$('.account-sub-screen-interaction-screen-notification').hide();
			$('.account-sub-screen-interaction-screen-tasks').hide();
			$('#taskContactFirst,#taskContactSecond,#taskContactEmail,#taskContactMobile,#taskContactLandline').val('');
			
			$('.account-modal-title').html('Add a contact');

			try {
				$("#taskContactList").tokenInput('destroy');
				$("#interactionNotifyList").tokenInput('destroy');
				$("#taskNotifyList").tokenInput('destroy');
			}catch(e){}
			
			// this is the auto fill for the notify input box
				$("#taskContactList").tokenInput(userInfo, {
				  hintText: "Search for an email address",
				  propertyToSearch: "email",
				  tokenLimit: 1,
				  resultsFormatter: function(item){ return "<li>" + toTitleCase(item.name) +"</li>" },
				  tokenFormatter: function(item) { return "<li>" + toTitleCase(item.name) + " (" + item.email + ")</li>" }
			  });
			
			$('.account-modal').modal();	

			$('.addContact').off(); // remove old click binds
			$('.addContact').click(function() {
				
				var account = $('.account-display').data();
				createContact(account.id,account.name);
			  
			});		
		});
}

function showHome(){
		setMenuItem('menuHome');
		$('#home-page').show();
		$('#list-search-loading').hide();
}

function filterSearch(){
	// firstly figure out what has been selected
	// then make the query
	////////////////////////////////
	
	var myBrokersOnly = $('#filter-mybrokers-only').is(":checked");
	
	// The Area
	var areaDublin = $('#filter-area-dublin').is(":checked");
	var areaWest = $('#filter-area-west').is(":checked");
	var areaSouth = $('#filter-area-south').is(":checked");
	var areaNone = $('#filter-area-none').is(":checked");
	
	// The Proposition
	var propPlatform = $('#filter-prop-platform').is(":checked");
	var propBrokersource = $('#filter-prop-brokersource').is(":checked");
	var propOnesource = $('#filter-prop-onesource').is(":checked");
	var propCore = $('#filter-prop-core').is(":checked");
	
	// The Proposition
	var propPlatform = $('#filter-prop-platform').is(":checked");
	var propBrokersource = $('#filter-prop-brokersource').is(":checked");
	var propOnesource = $('#filter-prop-onesource').is(":checked");
	var propCore = $('#filter-prop-core').is(":checked");
	
	var finPlanner = $('#filter-seg-finPlanner').is(":checked");
	var profBroker = $('#filter-seg-profBroker').is(":checked");
	var transBroker = $('#filter-seg-transbroker').is(":checked");
	var segNone = $('#filter-seg-none').is(":checked");
	
	//Value Tier
	
	var valueTP = $('#filter-valueT-p').is(":checked");
	var valueTpos = $('#filter-valueT-pos').is(":checked");
	var valueTe = $('#filter-valueT-e').is(":checked");
	var valueTv = $('#filter-valueT-v').is(":checked");
	var valueTr = $('#filter-valueT-r').is(":checked");
	var valueTu = $('#filter-valueT-u').is(":checked");
	
	// Fit for future segments
	var f4f20 = $('#filter-f4f-20').is(":checked");
	var f4f80 = $('#filter-f4f-80').is(":checked");
	
	// Fit for future segments
	// filter-sps-flat filter-sps-low  filter-sps-mix filter-sps-noset filter-sps-high
	var spsflat = $('#filter-sps-flat').is(":checked");
	var spslow = $('#filter-sps-low').is(":checked");
	var spsmix = $('#filter-sps-mix').is(":checked");
	var spsnoset = $('#filter-sps-noset').is(":checked");
	var spshigh = $('#filter-sps-high').is(":checked");
	var spsunknown = $('#filter-sps-unknown').is(":checked");
	
	// Estimated Size of Wallet
	var sowapea = $('#filter-sowape-0').is(":checked");
	var sowapeb = $('#filter-sowape-100').is(":checked");
	var sowapec = $('#filter-sowape-200').is(":checked");
	var sowaped = $('#filter-sowape-300').is(":checked");
	var sowapee = $('#filter-sowape-400').is(":checked");
	var sowapef = $('#filter-sowape-500').is(":checked");
	var sowapeg = $('#filter-sowape-750').is(":checked");
	var sowapeh = $('#filter-sowape-1m').is(":checked");
	var sowapei = $('#filter-sowape-15m').is(":checked");
	var sowapej = $('#filter-sowape-2m').is(":checked");
	var sowapek = $('#filter-sowape-3m').is(":checked");
	var sowapel = $('#filter-sowape-5m').is(":checked");
	var sowapeUnknown = $('#filter-sowape-unknown').is(":checked");
	
			
							
	/*
	console.log('#############################################' );
	console.log('spsunknown: ' +spsunknown);
	console.log('#############################################' );
	*/
	
	var filterAccounts = getFilterQuery(areaDublin, areaWest, areaSouth,areaNone,propPlatform,propBrokersource,propOnesource,propCore,finPlanner ,profBroker, transBroker,segNone,f4f20,f4f80,spsflat,spslow,spsmix,spsnoset,spshigh,spsunknown,valueTP,valueTpos,valueTe,valueTv,valueTr,valueTu,myBrokersOnly,sowapea,sowapeb,sowapec,sowaped,sowapee,sowapef,sowapeg,sowapeh,sowapei,sowapej,sowapek,sowapel,sowapeUnknown);
	
	showAccountFilterList(filterAccounts,'filterSearchResults');
	
}

$( document ).ready(function() {
	// start the page on the partner list
	var allPlatformPartners,coreBrokers,OSBrokers,BSBrokers;
	var selectedAMs='';
	//var allPlatformPartners = getAccountsBySegment('857190003');
	//showAccountInfo(allPlatformPartners);
	
	getNotifyUsersDetails(); // load the users for the email notification
	
	$('.star-feedback-button').click(function() {
		$('.star-feedback-error').hide();
		
		var starQuery = $('.star-feedback-form').val();
		
		if (starQuery.length<=10){
			$('.star-feedback-error').fadeIn();
		}else{
			var emailID = getIDFromEmail('stephen.hayden@irishlife.ie');
			sendFeedback(emailID,'STAR Feedback',starQuery);
			
		}
			
	});
	
	
	$('.menu-home').click(function() {
		showHome();
	});	
	
	$('.menuPlatform').mousedown(function() {
		$('#list-search h1').html('Platform Partners');
		setMenuItem('menuPlatform');
		// don't retrieve if already retrieved.
		if(allPlatformPartners){
			// use current query
			showAccountInfo(allPlatformPartners,'show-p-list');
		}else{
			// fresh query	
			allPlatformPartners = getAccountsBySegment('857190003');
			showAccountInfo(allPlatformPartners,'show-p-list');
		}
		
		// show the list on the screen
		$('#list-search').fadeIn();
	  
	});
	
	
	$('.menuCore ').mousedown(function() {
		setMenuItem('menuCore ');
		$('#list-search h1').html('Core Brokers');
		if(coreBrokers){
			// use current query			
			  setTimeout(function() {
				showAccountInfo(coreBrokers,'show-p-list');
			  }, 120); 
		}else{
			// fresh query	
			coreBrokers = getAccountsBySegment('857190002');
			
			  setTimeout(function() {
				showAccountInfo(coreBrokers,'show-p-list');
			  }, 120); 
		}
	});
	
	
	$('.menuOS').mousedown(function() {
		setMenuItem('menuOS');
		$('#list-search h1').html('OneSource Brokers');
		if(OSBrokers){
			// use current query			
			  setTimeout(function() {
				showAccountInfo(OSBrokers,'show-p-list');
			  }, 120); 
		}else{
			// fresh query	
			OSBrokers = getAccountsBySegment('857190001');
			  setTimeout(function() {
				showAccountInfo(OSBrokers,'show-p-list');
			  }, 120); 
		}
	});
	
	$('.menuBS').mousedown(function() {
		$('#list-search-loading').show();
		setMenuItem('menuBS');
		$('#list-search h1').html('Broker Source Brokers');
		if(BSBrokers){
			// use current query			
			  setTimeout(function() {
				showAccountInfo(BSBrokers,'show-p-list');
			  }, 120); 
		}else{
			// fresh query	
			BSBrokers = getAccountsBySegment('857190000');
			  setTimeout(function() {
				showAccountInfo(BSBrokers,'show-p-list');
			  }, 120); 
		}
	});
	
	
	var myTasks;
	$('.menuMyTasks').mousedown(function() {
		setMenuItem('menuMyTasks');
		if(myTasks){
			// use current query
			
			myTasks = getMyTasks();
			  setTimeout(function() {
				  showUserTasks(myTasks,'list-user-tasks');
				//showAccountInfo(myPartners,'show-p-list');
			  }, 10); 
		}else{
			// fresh query	
			myTasks = getMyTasks();
			  setTimeout(function() {
				  showUserTasks(myTasks,'list-user-tasks');
				//showAccountInfo(myPartners,'show-p-list');
			  }, 10); 
		}
	});
	
	var brokerageEvents;
	$('.menuEvents').mousedown(function() {
		setMenuItem('menuEvents');
		// fresh query	
		brokerageEvents = getBrokerageEvents();
		  setTimeout(function() {
			  showBrokerageEvents(brokerageEvents,'list-brokerage-events');
			//showAccountInfo(myPartners,'show-p-list');
		  }, 10); 
	});
	
	var myPartners;
	$('.menuMyPartners').mousedown(function() {
		setMenuItem('menuMyPartners');
		$('#list-search h1').html('My Partners');
		if(myPartners){
			// use current query
			
			  setTimeout(function() {
				showAccountInfo(myPartners,'show-p-list');
			  }, 10); 
		}else{
			// fresh query	
			myPartners = getMyPartners();
			  setTimeout(function() {
				showAccountInfo(myPartners,'show-p-list');
			  }, 10); 
		}
	});
	
	$('.menuPlatformInitiatives').mousedown(function() {
		setMenuItem('menuPlatformInitiatives');
		
		  setTimeout(function() {
			var tasks = retrieveAllAccountInteractionTasks();
			var iniaitiaves = retrieveAllAccountInteractions();
			// showInteractionsPage(tasks,iniaitiaves);
			setupInteractionsTable(tasks,iniaitiaves,"list-all-interactions");
				
		  }, 10); 
	});
	
	var myContacts;// = getAllBrokers();
	$('.menuMyContacts').mousedown(function() {
		setMenuItem('menuMyContacts');
		$('#list-contacts-header h1').html('My Contacts');
		$('#list-contacts-header').show();
		
		if(myContacts){
			// use current query
			  setTimeout(function() {
				displayAllContacts(myContacts);
			  }, 10); 
		}else{
			// fresh query	
			myContacts = getMyContacts();
			  setTimeout(function() {
				displayAllContacts(myContacts);
			  }, 10); 
		}
	});
	$('.menuSearchContacts').mousedown(function() {
		$('.contactSearchBtn').off();
		setMenuItem('menuSearchContacts');
		
		
		$('#list-contacts-header h1').html('Search Contacts');
		$('#list-contacts-header').show();
		
		$('#all-contacts-loading').hide();
		$('#list-search-loading').hide();
		
		$('#list-contacts-search').show();
		$('#list-contacts').show();
		
				
			$('.contactSearchBtn').click(function() {
				$('#all-contacts-loading').show();
				
				$('.contactSearchError').hide();
				var searchq = $('.contactSearch').val();
				if (searchq.length<=5){
					$('.contactSearchError').html('Please enter more information to search');
					$('.contactSearchError').show();
					$('#all-contacts-loading').hide();
				}else{
					// do the search
					var returned = findContact(searchq);
					// display the results
					  setTimeout(function() {
						displayAllContacts(returned);
					  }, 10); 
				}
			});
	});
	
	$('.menuSearchSellerCode').mousedown(function() {
		$('.sellerSearchBtn').off();
		setMenuItem('menuSearchSellerCode');
		$('#list-seller-search').show();
		$('#sellerCodeSearchResults').html('');	
		$('#list-search-loading').hide();	
		$('.sellerSearchBtn').click(function() {
				$('#seller-search-loading').show();
				
				$('.sellerSearchError').hide();
				var searchq = $('.sellerSearch').val();
				if (searchq.length>=3){
				
					// do the search
					// E555
					// E965
					var returned = findSeller(searchq);
					if (typeof(returned[0]) == "undefined"){
						returned[0] ="";
					}
					if (JSON.stringify(returned[0]).length>=5){
						var accountDetails = getAccountInfo(returned[0].parentaccount.id);
						var accountInfo = [];
						
						var foundAcc = JSON.parse("["+JSON.stringify(accountDetails)+"]");
						
						if(foundAcc.length>=1){
							for(var i = 0; i<foundAcc.length; i++)
							{
								accountInfo.push({
									"name": foundAcc[i].attributes.name,              
									"accountid": foundAcc[i].attributes.accountid,
									"warning": foundAcc[i].attributes.ilp_warning,
									"warningDetails": foundAcc[i].attributes.ilp_warningdetails,
									"thisyearMargin": foundAcc[i].attributes.ilp_thisyeargrandtotalytdmargin,
									"thisyearApe": foundAcc[i].attributes.ilp_thisyeargrandtotalytdape,
									"lastyearMargin": foundAcc[i].attributes.ilp_lastyeargrandtotalytdape,
									"thisyearMargin": foundAcc[i].attributes.ilp_thisyeargrandtotalytdmargin,
									"logoURL": foundAcc[i].attributes.ilp_companylogo
								});
							}
			
							showAccountInfo(accountInfo,'sellerCodeSearchResults');
						}
						else{
							
						$('.sellerSearchError').html('Sorry, no brokers with that seller code found. Please check the seller code or make sure that the CRM is configured correctly.');
						$('.sellerSearchError').show();
					$('#sellerCodeSearchResults').html('');	
						}
					}
					else{
						
					$('.sellerSearchError').html('Sorry, there are no brokers with that seller code to be found. Please check the seller code or make sure that the CRM is configured correctly.');
					$('.sellerSearchError').show();
					$('#sellerCodeSearchResults').html('');	
					}
				}else{
					$('.sellerSearchError').html('Please enter a valid Seller Code');
					$('.sellerSearchError').show();
					$('#seller-search-loading').hide();
					$('#sellerCodeSearchResults').html('');	
				}
			});
	
		
	});
	
	
	
	
	$('.menuSearchBrokerName').mousedown(function() {
		$('.brokerNameSearchBtn').off();
		setMenuItem('menuSearchBrokerName');
		$('#list-broker-name-search').show();
		$('#brokerNameSearchResults').html('');	
		$('#list-search-loading').hide();	
		$('.brokerNameSearchBtn').click(function() {
				$('#brokerNameSearchResults-loading').show();
				
				$('.brokerNameSearchError').hide();
				var searchq = $('.brokerNameSearch').val();
				if (searchq.length>=3 && searchq.length<=7){
				
					// do the search
					// E555
					// E965
					var returned = findBrokerName(searchq);
					if (typeof(returned[0]) == "undefined"){
						returned[0] ="";
					}
					if (JSON.stringify(returned[0]).length>=5){
						var accountDetails = getAccountInfo(returned[0].parentaccount.id);
						var accountInfo = [];
						
						var foundAcc = JSON.parse("["+JSON.stringify(accountDetails)+"]");
						
						if(foundAcc.length>=1){
							for(var i = 0; i<foundAcc.length; i++)
							{
								accountInfo.push({
									"name": foundAcc[i].attributes.name,              
									"accountid": foundAcc[i].attributes.accountid,
									"warning": foundAcc[i].attributes.ilp_warning,
									"warningDetails": foundAcc[i].attributes.ilp_warningdetails,
									"thisyearMargin": foundAcc[i].attributes.ilp_thisyeargrandtotalytdmargin,
									"thisyearApe": foundAcc[i].attributes.ilp_thisyeargrandtotalytdape,
									"lastyearMargin": foundAcc[i].attributes.ilp_lastyeargrandtotalytdape,
									"thisyearMargin": foundAcc[i].attributes.ilp_thisyeargrandtotalytdmargin,
									"logoURL": foundAcc[i].attributes.ilp_companylogo
								});
							}
			
							showAccountInfo(accountInfo,'brokerNameSearchResults');
						}
						else{
							
						$('#brokerNameSearchResults-loading').hide();
						$('.brokerNameSearchError').html('Sorry, no brokers with that name can be found. Please check the name or make sure that the CRM is configured correctly.');
						$('.brokerNameSearchError').show();
						$('#brokerNameSearchResults').html('');	
						}
					}
					else{
						
						$('#brokerNameSearchResults-loading').hide();
					$('.brokerNameSearchError').html('Sorry, no brokers with that name can be found. Please check the name or make sure that the CRM is configured correctly.');
					$('.brokerNameSearchError').show();
					$('#brokerNameSearchResults').html('');	
					}
				}else{
					$('.brokerNameSearchError').html('Please enter a valid broker name Code');
					$('.brokerNameSearchError').show();
					$('#brokerNameSearchResults-loading').hide();
					$('#brokerNameSearchResults').html('');	
				}
			});
	
		
	});
	
	
	
	var allBrokers;// = getAllBrokers();
	$('.menuAllBrokers').mousedown(function() {
		setMenuItem('menuAllBrokers');
		$('#list-search h1').html('All Brokers');
		
		if(allBrokers){
			// use current query
			  setTimeout(function() {
				showAccountInfo(allBrokers,'show-p-list');
			  }, 120); 
		}else{
			// fresh query	
			allBrokers = getAllBrokers();
			  setTimeout(function() {
				showAccountInfo(allBrokers,'show-p-list');
			  }, 120); 
		}
	});
	function setAMFilter(){
		var allAMFilter = '';
		 $.each(settings.Dublin, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					allAMFilter += '<div class="filter-option"><input type="checkbox" data-amID="'+getIDFromEmail(v.Email)+'" data-amName="'+v.Name+'" class="filter-am">&nbsp;'+v.Name+'</div>';
					//filterAreaDublin += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });
		 $.each(settings.West, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					allAMFilter += '<div class="filter-option"><input type="checkbox" data-amID="'+getIDFromEmail(v.Email)+'" data-amName="'+v.Name+'" class="filter-am">&nbsp;'+v.Name+'</div>';
					//filterAreaDublin += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });
		  
		 $.each(settings.South, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					allAMFilter += '<div class="filter-option"><input type="checkbox" data-amID="'+getIDFromEmail(v.Email)+'" data-amName="'+v.Name+'" class="filter-am">&nbsp;'+v.Name+'</div>';
					//filterAreaDublin += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });
		 $.each(settings.Remote, function(k, v) {
			/// do stuff
				if (typeof getIDFromEmail(v.Email) !== 'undefined'){
					allAMFilter += '<div class="filter-option"><input type="checkbox" data-amID="'+getIDFromEmail(v.Email)+'" data-amName="'+v.Name+'" class="filter-am" >&nbsp;'+v.Name+'</div>';
					//filterAreaDublin += '<value uiname="'+v.Name+'" uitype="systemuser">{'+getIDFromEmail(v.Email)+'}</value>';
				}
				
		  });
	
		  $('#fs-am-filter').html(allAMFilter);

			$('#list-search-loading').hide();
			$('#list-filter-broker').show();
	}
	
	
	//var filterBrokers;// = getAllBrokers();
	$('.menuFilterBrokers').mousedown(function() {
		setMenuItem('menuFilterBrokers');
		$('.brokerFilterBtn').off();
		setAMFilter();
		$('.brokerFilterBtn').click(function() {
			
			$('#filterSearchResults-table').hide();
			$('#filterSearchResults-stats').hide();
			$('#filterSearchResults-loading').show();
			
			setTimeout(function() {
				filterSearch();  
			}, 2); 
			
			// do query and populate 
		});

		$('.filterSectionHeader').click(function(){
			$(this).closest('.filterSection').find('.fs-options').toggle();

		});
	
	});
	
	$('.menuAllGraphs').mousedown(function() {
		setMenuItem('menuAllGraphs');
		
		
		$('#graphs').fadeIn();
		
		$('#list-search-loading').hide();
		
	});
	
	// start by showing the homepage
	showHome();
	
	
});



