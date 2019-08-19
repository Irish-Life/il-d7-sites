(function($) {
	
	$(document).ready(function() {
	// on page load show this 
	var myTasks = getMyTasks();
	var myTasksCompletedCount = getMyTasksCompletedCount();
	var myTasksOpenCount = getMyTasksOpenCount();
	$('.mytasks-callscompleted').html(myTasksCompletedCount[0].agsubject.value);
	$('.mytasks-callsopen').html(myTasksOpenCount[0].agsubject.value);
	if (myTasks.length<=0){
		$('.tasks-empty').show();
		$('#all-tasks-loading').hide();
		$('#list-tasks').fadeIn();
	}
	else{
		$('.tasks-empty').hide();	
		
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
					'<td class="">'+getPriorityIcon(prioritycode)+' '+prioritycode+' </td>'+
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
			
			Xrm.Utility.openEntityForm(tasktype,taskID);
		})
		
		
		
		$('.showAccount').click(function() {
				// $('.account-modal').modal();
				var subID = $(this).data();
				window.location.href = "broker.html#"+subID.accountid;
				
		});
		
	}
		
	});
})(jQuery); // End of use strict


