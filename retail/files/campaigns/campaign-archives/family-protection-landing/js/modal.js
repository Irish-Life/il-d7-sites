/* Modals */
$(function(){

var appendthis =  ("<div class='modal-overlay js-modal-close'></div>");
var screenTop = $(document).scrollTop();

  $('a[data-modal-id]').click(function(e) {
    e.preventDefault();
    $("body").append(appendthis);
    $(".modal-overlay").fadeTo(500, 0.7);
    //$(".js-modalbox").fadeIn(500);
    var modalBox = $(this).attr('data-modal-id');
    $('#'+modalBox).fadeIn($(this).data());
  });  
  
  
$(".js-modal-close, .modal-overlay").click(function() {
  $(".modal-box, .modal-overlay, .small-modal").fadeOut(500, function() {
    $(".modal-overlay").remove();
  });
});

/*
$(window).resize(function() {
  $(".modal-box").css({
    top: (screenTop + $(".modal-box").outerHeight()) / 3,
  });
});
 
$(window).resize();
*/


});