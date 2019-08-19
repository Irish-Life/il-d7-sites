function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
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
function getStatusIcon(status){
	
	var icon='';
	if (status=="Fullfilled"){
		icon = '<i style="color:#38B26E;" class="fa fa-check" aria-hidden="true"></i>';
	}
	else if (status=="Rejected/No Tickets Available"){
		icon = '<i style="color:#E21166;" class="fa fa-thumbs-down" aria-hidden="true"></i>';
	}
	else if (status=="Requested"){
		icon = '<i style="color:#333333;" class="fa fa-question-circle" aria-hidden="true"></i>';
	}
	else if (status=="Approved" || status=="ApprovedAndActive"){
		icon = '<i style="color:#FCB364;" class="fa fa-thumbs-up" aria-hidden="true"></i>';
	}else{
		
		icon = '<i  class="fa fa-circle" aria-hidden="true"></i>';
	}

	return icon;
	
}
function getTableRowColor(status){
	
	var color='';
	if (status=="Fullfilled"){
		color = 'rgba(56, 178, 110, 0.05)';
	}
	else if (status=="Rejected/No Tickets Available"){
		color = 'rgba(226, 17, 102, 0.05)';
	}
	else if (status=="Requested"){
		color = 'rgba(51, 51, 51, 0.05)';
	}
	else if (status=="Approved"){
		color = 'rgba(252, 179, 100, 0.05)';
	}else{
		
		color = 'rgba(51, 51, 51, 0.05)';
	}

	return color;
	
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
var entityMap = {
'&': '&amp;',
'<': '&lt;',
'>': '&gt;',
'"': '&quot;',
"'": '&#39;',
'/': '&#x2F;',
'`': '&#x60;',
'=': '&#x3D;'
};

function escapeHtml (string) {
return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
  return entityMap[s];
});
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


$(document).ready(function() {
	ga('send', {
	  hitType: 'event',
	  eventCategory: 'Pageview',
	  eventAction: window.location.pathname,
	  eventLabel: Xrm.Page.context.getUserName()
	});
});
