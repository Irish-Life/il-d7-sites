var arrJour = new Array("pjIntro","pjEmployeeEmployer","pjPensioncalcalculator","pjStartAPension","pjStartAPensionPersonal","pjStartAPensionExecutive","pjTaxRelief","pjHowSafe","pjRetiringSoon","pjRetire","pjRetireHowTo","pjRetireArfs",
"pjStartAPensionHow","pjRetireAge","pjRetireAnnuity");
		$("#pjIntro").click(function(){
		toggleAllPJBoxAndOpenSingle(this.id);
		});
		
		
		
	for(var i=0; i<arrJour.length; i++) {
		var value = arrJour[i];
		$("#"+value).click(function(){
		toggleAllPJBoxAndOpenSingle(this.id);
		});
	
	}
	
	
function toggleAllPJBoxAndOpenSingle(whichClick){	
		$("#"+whichClick+"Journey").removeClass("hidden");
		
		$("#"+whichClick+"Journey").modal({
			minWidth: 400,
			minHeight: 250,
			persist:true,
			overlayClose:false
		});
}

$("#pensionJourneyInfoHolder").hide();
	
	




