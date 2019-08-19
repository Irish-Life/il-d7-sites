(function($) {
	
	$(document).ready(function() {
		
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": true,
		"progressBar": false,
		"positionClass": "toast-bottom-right",
		"preventDuplicates": false,
		"showDuration": "6222",
		"hideDuration": "1000",
		"timeOut": "5000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	  }

	// when the user clicks the segment link go to the segment page and pass in the paramenter			
	$('.showSegment').click(function() {
		var segment = $(this).data();
		window.location.href = "segment.html#"+segment.segmentname;
	});

	var myTasksCompletedCount = getMyTasksCompletedCount();
	var myTasksOpenCount = getMyTasksOpenCount();
	$('.mytasks-callscompleted').html(myTasksCompletedCount[0].agsubject.value);
	$('.mytasks-callsopen').html(myTasksOpenCount[0].agsubject.value);
		function getDataResults(results){
			// console.log(JSON.stringify(results)); 

			var ilp_thisyeargrandtotalytdape = (results[0].ilp_thisyeargrandtotalytdape) ? results[0].ilp_thisyeargrandtotalytdape.formattedValue : 0;
			var ilp_thisyeargrandtotalytdmargin = (results[0].ilp_thisyeargrandtotalytdmargin) ? results[0].ilp_thisyeargrandtotalytdmargin.formattedValue : 0;

			var ilp_thisyearprotectionytdape = (results[0].ilp_thisyearprotectionytdape) ? results[0].ilp_thisyearprotectionytdape.value : 0;
			var ilp_lastyearprotectionytdape = (results[0].ilp_lastyearprotectionytdape) ? results[0].ilp_lastyearprotectionytdape.value : 0;
			var ilp_thisyearprotectionytdmargin = (results[0].ilp_thisyearprotectionytdmargin) ? results[0].ilp_thisyearprotectionytdmargin.value : 0;
			var ilp_lastyearprotectionytdmargin = (results[0].ilp_lastyearprotectionytdmargin) ? results[0].ilp_lastyearprotectionytdmargin.value : 0;
			
			var ilp_thisyearpensionapytdape = (results[0].ilp_thisyearpensionapytdape) ? results[0].ilp_thisyearpensionapytdape.value : 0;
			var ilp_lastyearpensionapytdape = (results[0].ilp_lastyearpensionapytdape) ? results[0].ilp_lastyearpensionapytdape.value : 0;
			var ilp_thisyearpensionapytdmargin = (results[0].ilp_thisyearpensionapytdmargin) ? results[0].ilp_thisyearpensionapytdmargin.value : 0;
			var ilp_lastyearpensionapytdmargin = (results[0].ilp_lastyearpensionapytdmargin) ? results[0].ilp_lastyearpensionapytdmargin.value : 0;
			
			var ilp_thisyearpensionspytdape = (results[0].ilp_thisyearpensionspytdape) ? results[0].ilp_thisyearpensionspytdape.value : 0;
			var ilp_lastyearpensionspytdape = (results[0].ilp_lastyearpensionspytdape) ? results[0].ilp_lastyearpensionspytdape.value : 0;
			var ilp_thisyearpensionspytdmargin = (results[0].ilp_thisyearpensionspytdmargin) ? results[0].ilp_thisyearpensionspytdmargin.value : 0;
			var ilp_lastyearpensionspytdmargin = (results[0].ilp_lastyearpensionspytdmargin) ? results[0].ilp_lastyearpensionspytdmargin.value : 0;
			
			var ilp_thisyearbondsytdape = (results[0].ilp_thisyearbondsytdape) ? results[0].ilp_thisyearbondsytdape.value : 0;
			var ilp_lastyearbondsytdape = (results[0].ilp_lastyearbondsytdape) ? results[0].ilp_lastyearbondsytdape.value : 0;		
			var ilp_thisyearbondsytdmargin = (results[0].ilp_thisyearbondsytdmargin) ? results[0].ilp_thisyearbondsytdmargin.value : 0;
			var ilp_lastyearbondsytdmargin = (results[0].ilp_lastyearbondsytdmargin) ? results[0].ilp_lastyearbondsytdmargin.value : 0;
			
			var ilp_thisyearsavingsytdape = (results[0].ilp_thisyearsavingsytdape) ? results[0].ilp_thisyearsavingsytdape.value : 0;
			var ilp_lastyearsavingsytdape = (results[0].ilp_lastyearsavingsytdape) ? results[0].ilp_lastyearsavingsytdape.value : 0;
			var ilp_thisyearsavingsytdmargin = (results[0].ilp_thisyearsavingsytdmargin) ? results[0].ilp_thisyearsavingsytdmargin.value : 0;
			var ilp_lastyearsavingsytdmargin = (results[0].ilp_lastyearsavingsytdmargin) ? results[0].ilp_lastyearsavingsytdmargin.value : 0;
			
			var ilp_thisyearcorporatebusinessytdape = (results[0].ilp_thisyearcorporatebusinessytdape) ? results[0].ilp_thisyearcorporatebusinessytdape.value : 0;
			var ilp_lastyearcorporatebusinessytdape = (results[0].ilp_lastyearcorporatebusinessytdape) ? results[0].ilp_lastyearcorporatebusinessytdape.value : 0;
			var ilp_thisyearcorporatebusinessytdmargin = (results[0].ilp_thisyearcorporatebusinessytdmargin) ? results[0].ilp_thisyearcorporatebusinessytdmargin.value : 0;
			var ilp_lastyearcorporatebusinessytdmargin = (results[0].ilp_lastyearcorporatebusinessytdmargin) ? results[0].ilp_lastyearcorporatebusinessytdmargin.value : 0;
			
			var agname = (results[0].agname) ? results[0].agname.value : 0;
			var ilp_volumenumberofcases = (results[0].ilp_volumenumberofcases) ? results[0].ilp_volumenumberofcases.value : 0;
			var ilp_lastyearvolumenumberofcases = (results[0].ilp_lastyearvolumenumberofcases) ? results[0].ilp_lastyearvolumenumberofcases.value : 0;
								
			var resultsArr = [
			ilp_thisyearprotectionytdape,ilp_lastyearprotectionytdape,ilp_thisyearprotectionytdmargin,ilp_lastyearprotectionytdmargin,ilp_thisyearpensionapytdape,ilp_lastyearpensionapytdape,ilp_thisyearpensionapytdmargin,ilp_lastyearpensionapytdmargin,
			ilp_thisyearpensionspytdape,ilp_lastyearpensionspytdape,ilp_thisyearpensionspytdmargin,ilp_lastyearpensionspytdmargin,
			ilp_thisyearbondsytdape,ilp_lastyearbondsytdape,ilp_thisyearbondsytdmargin,ilp_lastyearbondsytdmargin,
			ilp_thisyearsavingsytdape,ilp_lastyearsavingsytdape,ilp_thisyearsavingsytdmargin,ilp_lastyearsavingsytdmargin,
			ilp_thisyearcorporatebusinessytdape,ilp_lastyearcorporatebusinessytdape,ilp_thisyearcorporatebusinessytdmargin,ilp_lastyearcorporatebusinessytdmargin,
			agname,ilp_volumenumberofcases,ilp_lastyearvolumenumberofcases,ilp_thisyeargrandtotalytdape,ilp_thisyeargrandtotalytdmargin];
			
			return resultsArr;
			
		}
		// this is the sales figures for all brokers
		// to be shown everyone in brokerage
		
		// do the CRM query
		var results = getAllDashboardCount();
		
		// Sort out the data that is returned
		var r = getDataResults(results);
		
		var ctx = $("#salesChart");
		var salesChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ["Protection", "AP Pension", "SP Pension", "Bonds", "Savings", "Corporate"],
				datasets: [{
					label: '2018 YTD',
					data: [r[0], r[4], r[8], r[12], r[16], r[20]],
					backgroundColor: 'rgba(82, 97, 172, 0.2)',
					borderColor:  'rgba(82, 97, 172, 1)',
					borderWidth: 1
				},{
					label: '2017 YTD',
					data: [r[1], r[5], r[9], r[13], r[17],r[21]],
					backgroundColor: 'rgba(80, 201, 181, 0.2)',
					borderColor:  'rgba(80, 201, 181, 1)',
					borderWidth: 1
				}]
			},
			options: {
				responsive: true,
					title: {
						display: true,
						text: 'SALES APE'
					},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});
		
		$('.dashboard-brokers-count').html(r[24]);
		$('.dashboard-casesytd').html(r[25]);
		$('.dashboard-caseslytd').html(r[26]);
		//total for the year
		$('.dashboard-salesapeytd').html(r[27]);
		$('.dashboard-salesmarginytd').html(r[28]);
		
		
		var resultsMy; // only use if they are an account manager
		var resultsMigrated; // only use if they are a brokersource AM
		
		/// now when buttons are clicked you should make changes to the screens
		
		$('.dashboard-allmargin-btn').click(function() {
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [r[2], r[6], r[10], r[14], r[18], r[22]];
			salesChart.data.datasets[1].data = [r[3], r[7], r[11], r[15], r[19], r[23]];
			salesChart.options.title.text="SALES MARGIN";
			salesChart.update();
				
			$('.dashboard-brokers-count').html(r[24]);
			$('.dashboard-casesytd').html(r[25]);
			$('.dashboard-caseslytd').html(r[26]);
			
			$('.dashboard-salesapeytd').html(r[27]);
			$('.dashboard-salesmarginytd').html(r[28]);
		});
		
		$('.dashboard-allape-btn').click(function() {
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [r[0], r[4], r[8], r[12], r[16], r[20]];
			salesChart.data.datasets[1].data = [r[1], r[5], r[9], r[13], r[17],r[21]];
			salesChart.options.title.text="SALES APE";
			salesChart.update();
				
			$('.dashboard-brokers-count').html(r[24]);
			$('.dashboard-casesytd').html(r[25]);
			$('.dashboard-caseslytd').html(r[26]);

			$('.dashboard-salesapeytd').html(r[27]);
			$('.dashboard-salesmarginytd').html(r[28]);
		});
		
		var mgr;
		$('.dashboard-migratedmargin-btn').click(function() {
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [mgr[2], mgr[6], mgr[10],mgr[14], mgr[18], mgr[22]];
			salesChart.data.datasets[1].data = [mgr[3], mgr[7], mgr[11], mgr[15], mgr[19], mgr[23]];
			salesChart.options.title.text="MY MIGRATED BROKERS SALES MARGIN";
			salesChart.update();
				
			$('.dashboard-brokers-count').html(mgr[24]);
			$('.dashboard-casesytd').html(mgr[25]);
			$('.dashboard-caseslytd').html(mgr[26]);

			$('.dashboard-salesapeytd').html(mgr[27]);
			$('.dashboard-salesmarginytd').html(mgr[28]);
		});
		
		
		$('.dashboard-migratedape-btn').click(function() {
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [mgr[0], mgr[4], mgr[8], mgr[12], mgr[16], mgr[20]];
			salesChart.data.datasets[1].data = [mgr[1], mgr[5], mgr[9], mgr[13], mgr[17],mgr[21]];
			salesChart.options.title.text="MY MIGRATED BROKERS SALES APE";
			salesChart.update();
				
			$('.dashboard-brokers-count').html(mgr[24]);
			$('.dashboard-casesytd').html(mgr[25]);
			$('.dashboard-caseslytd').html(mgr[26]);
			$('.dashboard-salesapeytd').html(mgr[27]);
			$('.dashboard-salesmarginytd').html(mgr[28]);
		});
		
		
		
		var myr;
		$('.dashboard-margin-btn').click(function() {
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [myr[2], myr[6], myr[10], myr[14], myr[18], myr[22]];
			salesChart.data.datasets[1].data = [myr[3], myr[7], myr[11], myr[15], myr[19], myr[23]];
			salesChart.options.title.text="MY SALES MARGIN";
			salesChart.update();
			$('.dashboard-brokers-count').html(myr[24]);
			$('.dashboard-casesytd').html(myr[25]);
			$('.dashboard-caseslytd').html(myr[26]);
			$('.dashboard-salesapeytd').html(myr[27]);
			$('.dashboard-salesmarginytd').html(myr[28]);
		});
		
		$('.dashboard-ape-btn').click(function() {			
		
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [myr[0], myr[4], myr[8], myr[12], myr[16], myr[20]];
			salesChart.data.datasets[1].data = [myr[1], myr[5], myr[9], myr[13], myr[17],myr[21]];
			salesChart.options.title.text="MY SALES APE";
			salesChart.update();
			$('.dashboard-brokers-count').html(myr[24]);
			$('.dashboard-casesytd').html(myr[25]);
			$('.dashboard-caseslytd').html(myr[26]);
			$('.dashboard-salesapeytd').html(myr[27]);
			$('.dashboard-salesmarginytd').html(myr[28]);
		});
		
		var fp;
		$('.dashboard-fpape-btn').click(function() {			
		
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [fp[0], fp[4], fp[8], fp[12], fp[16], fp[20]];
			salesChart.data.datasets[1].data = [fp[1], fp[5], fp[9], fp[13], fp[17], fp[21]];
			salesChart.options.title.text="FINANCIAL PLANNERS SALES APE";
			salesChart.update();
			$('.dashboard-brokers-count').html(fp[24]);
			$('.dashboard-casesytd').html(fp[25]);
			$('.dashboard-caseslytd').html(fp[26]);
			$('.dashboard-salesapeytd').html(fp[27]);
			$('.dashboard-salesmarginytd').html(fp[28]);
		});
		
		$('.dashboard-fpmargin-btn').click(function() {			
		
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			salesChart.data.datasets[0].data = [fp[2], fp[6], fp[10], fp[14], fp[18], fp[22]];
			salesChart.data.datasets[1].data = [fp[3], fp[7], fp[11], fp[15], fp[19], fp[23]];
			salesChart.options.title.text="FINANCIAL PLANNERS SALES MARGIN";
			salesChart.update();
			$('.dashboard-brokers-count').html(fp[24]);
			$('.dashboard-casesytd').html(fp[25]);
			$('.dashboard-caseslytd').html(fp[26]);
			$('.dashboard-salesapeytd').html(fp[27]);
			$('.dashboard-salesmarginytd').html(fp[28]);
		});
		
		$('.dashboard-settings-btn').click(function() {			
		
			$( this ).siblings().removeClass('active');
			$( this ).addClass('active');
			
			$('#filterDashboardChartModal').modal();
		});
		
		//##################
		// Output the segment ape and margin values
		var platformSegmentVals = getSegmentCount('platform');
		$('.segmentape-platform').html(platformSegmentVals[0].ape.formattedValue);
		$('.segmentmargin-platform').html(platformSegmentVals[0].margin.formattedValue);
		
		var onesourceSegmentVals = getSegmentCount('onesource');
		$('.segmentape-onesource').html(onesourceSegmentVals[0].ape.formattedValue);
		$('.segmentmargin-onesource').html(onesourceSegmentVals[0].margin.formattedValue);
		
		var coreSegmentVals = getSegmentCount('core');
		$('.segmentape-core').html(coreSegmentVals[0].ape.formattedValue);
		$('.segmentmargin-core').html(coreSegmentVals[0].margin.formattedValue);
		
		var brokersourceSegmentVals = getSegmentCount('brokersource');
		$('.segmentape-brokersource').html(brokersourceSegmentVals[0].ape.formattedValue);
		$('.segmentmargin-brokersource').html(brokersourceSegmentVals[0].margin.formattedValue);
		
		var top20SegmentVals = getSegmentCount('top20');
		$('.segmentape-top20').html(top20SegmentVals[0].ape.formattedValue);
		$('.segmentmargin-top20').html(top20SegmentVals[0].margin.formattedValue);
		
		var bottom80SegmentVals = getSegmentCount('bottom80');
		$('.segmentape-bottom80').html(bottom80SegmentVals[0].ape.formattedValue);
		$('.segmentmargin-bottom80').html(bottom80SegmentVals[0].margin.formattedValue);
		


		var currentUser = getCurrentUserDetails();
		//console.log(JSON.stringify(currentUser));
		//var name = Xrm.Page.context.getUserName();
		$('.dashboard-user-name').html("<a href='javascript:void(0)' class='openUser' data-userid='"+toTitleCase(currentUser[0].id)+"'>"+toTitleCase(currentUser[0].name)+"</a>");
		$('.account-position').html(toTitleCase(currentUser[0].businessunitid));
		$('.dashboard-user-name').fadeIn();
		
		
		$('.openUser').click(function(){
			var userid = $(this).data( "userid" );
			//console.log(userid);
			Xrm.Utility.openEntityForm('systemuser',userid);
		});
		
		//console.log('currentUser[0].businessunitid '+currentUser[0].businessunitid);
		// at this point, depending on what team the user is part of we should display different options on the dashboard-ape-btn
		// start with the buttons
		if (currentUser[0].businessunitid == "Brokerage"){
			// brokerage is the business unit for general users and also BET
			
			
		}
		if (currentUser[0].businessunitid == "Broker Source"){
			// if you are an account manager then you should be put into your respect 
			// business unit and it should show things based on that.
			
			// show the broker source specific buttons
			$('.userBrokerSource').show();
			
			/*
			$('.dashboard-ape-btn').show();
			$('.dashboard-margin-btn').show();
			$('.dashboard-migratedape-btn').show();
			$('.dashboard-migratedmargin-btn').show();
			$('.dashboard-settings-btn').show();
			*/
			
			resultsMy = getUserDashboardCount();
			resultsMg = getBrokersourceMigratedCount();
			
			//console.log("resultsMg "+JSON.stringify(resultsMg));
			
			resultsfp = getDashboardInfo('fp');
			
			myr = getDataResults(resultsMy);
			mgr = getDataResults(resultsMg);
			fp = getDataResults(resultsfp);

			
		}
		
		$('.dashboard-alert-check').click(function() {
			// $('.account-modal').modal();
			showDashboardTasks();
			
	});
		function showDashboardTasks(){	// on page load show this 
		var myTasks = getMyTasks();
		$('.my-tasks-table').html('');
		if (myTasks.length<=0){
			$('.tasks-empty').show();
			$('#all-tasks-loading').hide();
			$('#list-tasks').fadeIn();
			$('.my-tasks-table').append(
				'<tr>'+
					'<td class="" colspan="5"><i class="fa fa-trophy" aria-hidden="true"></i>&nbsp;You have completed all your tasks! Congratulations!</td>'+
				'</tr>'
				);

				
	  		toastr["success"]("You have completed all of your tasks. Good work!", "Message");
		}
		else{
			$('.tasks-empty').hide();	
			
			toastr["success"]("You have "+myTasks.length+" tasks to complete.", "Message");

			var totalTasks=0;
			$.each( myTasks, function( key, v ) {
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
				
			
			
				$('.my-tasks-table').append(
					'<tr>'+
						'<td class="text-center"><a href="javascript:void(0);" style="color:#50C9B5;" class="openTaskCRM" data-taskid="'+activityid+'" data-tasktype="'+activityType+'">'+getTaskIcon(activityType)+'</a></td>'+
						'<td class=""><a href="javascript:void(0);" class="interaction-item-larger openTaskCRM" data-taskid="'+activityid+'" data-tasktype="'+activityType+'">'+subject+'</a> - '+description+'</td>'+
						'<td class=""><a href="javascript:void(0)" class="showAccount" data-accountid="'+accountID+'" data-accountname="'+name+'">'+accountName+'</td>'+
						'<td class="">'+DateCreated+'</td>'+
						'<td class="">'+getPriorityIcon(prioritycode)+' </td>'+
					'</tr>'
					);
			});	
			
					$('.my-tasks-table').append(
					'<tr>'+
						'<td colspan="5" class="text-center"><a href="mytasks.html">View all your tasks</a></td>'+
					'</tr>'
					);
			if (totalTasks==1){
				$('.list-user-task-total').html(totalTasks+" task")
			}else{
				$('.list-user-task-total').html(totalTasks+" tasks")
			}
			
			
			$('.openTaskCRM').click(function(){
				var taskID = $(this).data( "taskid" );
				var tasktype = $(this).data( "tasktype" );
				
				Xrm.Utility.openEntityForm(tasktype,taskID);
			})
			
			
			
			$('.showAccount').click(function() {
					// $('.account-modal').modal();
					var subID = $(this).data();
					window.location.href = "broker.html#"+subID.accountid;
					
			});
			
		}
	
	}
	showDashboardTasks();


	});
})(jQuery); // End of use strict


