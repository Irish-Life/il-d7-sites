$(window).scroll(function () {
  var s = $(window).scrollTop(),
        d = $(document).height(),
        c = $(window).height();
        scrollPercent = (s / (d-c)) * 100;
        var position = scrollPercent;

   $("#progressbar").attr('value', position);

});

$(window).scroll(function(){
    $("#progressbar").css("top",Math.max(0,482-$(this).scrollTop()));
});