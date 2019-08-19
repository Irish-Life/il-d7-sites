(function($){
	$(document).ready(function(){
	
    $(".tableLink").click(function(){
		var x = $(this).attr('rel');
		var vis = $( "."+x).css("display");
		if (vis =='none'){
			$(".tableHolder").hide();
			$("."+x).show();
		}else{
			$("."+x).hide();
			
		}
    });	
	
	
	$(".tableLink").on("click", function() {
    $(this).toggleClass("bgCol");
    $(".tableLink").not(this).removeClass("bgCol");

    }); 
	
	$(".tableLinkCred").click(function(){
		var x = $(this).attr('rel');
		var vis = $( "."+x).css("display");
		if (vis =='none'){
			$(".tableHolderCred").hide();
			$("."+x).show();
		}else{
			$("."+x).hide();
			
		}
    });	
	
	
	$(".tableLinkCred").on("click", function() {
    $(this).toggleClass("bgCol");
    $(".tableLinkCred").not(this).removeClass("bgCol");

    }); 

});
})(jQuery);