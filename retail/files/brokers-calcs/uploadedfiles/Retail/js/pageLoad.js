$(document).ready(function () {
		// Mouse over effects for the buttons
		function resetArrows(id)
		{	
			$('#arrowDown'+id).removeClass('hidden');
			$('#arrowUp'+id).addClass('hidden');
			
			$('#menuButton'+id).removeClass('selectedMenu');
			$('#menuButton'+id).closest('li').attr('id', '');
			// selectedMenu
		}
		function makeTallBlank()
		{//donothing 
		}
		function makeTallA()
		{	
			$('#menuButtonA').closest('li').attr('id', 'active');
			resetArrows('B');
			resetArrows('C');
			$('#menuButtonA').addClass('selectedMenu');
			$('#menuBlockDetailsHolder').fadeIn(90);
			$('#arrowDownA').addClass('hidden');
			$('#arrowUpA').removeClass('hidden');
			$('#menuBlockDetailsA').addClass('hidden');
			$('#menuBlockDetailsB').addClass('hidden');
			$('#menuBlockDetailsC').addClass('hidden');
			$('#menuBlockDetailsA').removeClass('hidden');
		}
		function makeTallB()
		{	
			$('#menuButtonB').closest('li').attr('id', 'active');
			resetArrows('A');
			resetArrows('C');
			$('#menuButtonB').addClass('selectedMenu');
			$('#menuBlockDetailsHolder').fadeIn(90);
			$('#arrowDownB').addClass('hidden');
			$('#arrowUpB').removeClass('hidden');
			$('#menuBlockDetailsA').addClass('hidden');
			$('#menuBlockDetailsB').addClass('hidden');
			$('#menuBlockDetailsC').addClass('hidden');
			$('#menuBlockDetailsB').removeClass('hidden');
		}
		function makeTallC()
		{	
			$('#menuButtonC').closest('li').attr('id', 'active');
			resetArrows('A');
			resetArrows('B');
			$('#menuButtonC').addClass('selectedMenu');
			$('#menuBlockDetailsHolder').fadeIn(90);
			$('#arrowDownC').addClass('hidden');
			$('#arrowUpC').removeClass('hidden');
			$('#menuBlockDetailsA').addClass('hidden');
			$('#menuBlockDetailsB').addClass('hidden');
			$('#menuBlockDetailsC').addClass('hidden');
			$('#menuBlockDetailsC').removeClass('hidden');
		}
		
		function closeAll()
		{
			$('#menuBlockDetailsHolder').fadeOut(140);
			resetArrows('A');
			resetArrows('B');
			resetArrows('C');
		}
		$('a#menuButtonA').hoverIntent( makeTallA,makeTallBlank );
		$('a#menuButtonB').hoverIntent( makeTallB,makeTallBlank );
		$('a#menuButtonC').hoverIntent( makeTallC,makeTallBlank );
		$('.bodyContainer').hover(function() {closeAll();});
		
		// Check when the user has clicked and close the menu if it is outside the page
		$(document).mouseup(function(e) {
			outter(e);
			
		});
		function outter(e)
		{	
			var m = 0;
			var c = $(e.target).parents('div');
			c.each(function(i) { 
				if ($(this).attr('id') == "linksBar" || $(this).attr('id') == "menuBlockDetailsHolder"  ) //menuBlockDetailsHolder
				{
					m = i;
					return false;
				}
			});
			if (m ==0){
			closeAll();
			}
		}
		
    }); 
	
	

	$(function(){
	$('.submitBtn').hover(
		// mouseover
		function(){ $(this).addClass('submitBtnHover'); },
		
		// mouseout
		function(){ $(this).removeClass('submitBtnHover'); }
	);	

	$('button#getQuoteButton').mousedown(function(){
		$("#quoteDetails").addClass("hidden");
		$("#quoteQuote").removeClass("hidden");
		changeTab('fund-performance', 1);
	});
	$('button#getQuoteButton').mousedown(function(){
		$("#quoteDetails").addClass("hidden");
		$("#quoteQuote").removeClass("hidden");
		changeTab('fund-performance', 1);
	});
	$('#addSICQuote').mousedown(function(){
	if ('#addSICQuote:checked') {
			$("#quoteAmount").addClass("hidden");
			$("#quoteAmountSIC").removeClass("hidden");
		}
		if ($('#addSICQuote').attr('checked')) {
			$("#quoteAmountSIC").addClass("hidden");
			$("#quoteAmount").removeClass("hidden");
		}
	});
	

	$('#searchInput').one("focus", function() {
	  $(this).val("");
	});
	
	$("#searchInput").focus(function(){
		$(this).addClass("activeField").removeClass("idle");
	}).blur(function(){
		$(this).removeClass("activeField").addClass("idle");
	});
		
	$("#changer").removeClass('hidden');
	$("#loading").addClass('hidden');
	$("#searchInput").addClass("idle");
		/*
	$('body').keyup(function (event) {
    // handle cursor keys
    if (event.keyCode == 37) {
      // slide left
      alert("left");
    } else if (event.keyCode == 39) {
      // slide right
      alert("right");
    }
	});
	*/
});
