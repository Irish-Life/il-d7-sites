(function($){
    $( document ).ready(function() {
      $(document).on('click', '.showHelp', function(){
        $('#helpText').slideToggle(600);
        $('.showHelpOpen').toggle();
        $('.showHelpClosed').toggle();
      });
    });
})(jQuery);