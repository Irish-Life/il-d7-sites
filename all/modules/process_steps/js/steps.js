(function ($) {

function createSteps(currentStep){
		var allCircles = "";
		var numSteps = Drupal.settings.process_steps.numSteps;
		var current = currentStep-1;
		var meterWidth = 0;
		var stepNames = Drupal.settings.process_steps.stepNames.split(':');
		for(i=0; i< numSteps; i++){
			var num = (i/(numSteps-1))*68;
			var aCircle = '<div class="step-circle ' + (i <= current ? 'selected ':'') + 'step-circle-'+(i+1)+'" style="left:'+num+'%"><span class="step-circleNum">'+(i+1)+ "." + "&nbsp;" + stepNames[i]+'</span></div>'
			if (i == current)
			{
				meterWidth = num+'%';
			}
			allCircles = allCircles+""+aCircle;
		}
		
		var allCircles =allCircles;
		$('.step-circleholder').html(allCircles);
		$('.process-steps .step-meter-value').css("width",meterWidth);
}
createSteps(gup("c"));

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}


})(jQuery);