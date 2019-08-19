$(function(){
    
var limit = 0; // 0 = infinite.
var interval = 2;// Secs
var images = [
     "assets/css/images/fitness-2.jpg"
    ,"assets/css/images/banner.jpg",
	"assets/css/images/fitness.jpg"
    
];

var inde = 0; 
var limitCount = 0;
var myInterval = setInterval(function() {
   if (limit && limitCount >= limit-1) clearTimeout(myInterval);
   if (inde >= images.length) inde = 0;
    $('.ww').css({ "background-image":"url(" + images[inde]+ ")" });
   inde++;
   limitCount++;
}, interval*3000);
});