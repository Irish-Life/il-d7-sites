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

google.load('search', '1', {language : 'en'});
  google.setOnLoadCallback(function() {
  
     var customSearchControl = new google.search.CustomSearchControl(
      '010888959185650814693:yvxml3wm7nk');
	  
	  //010888959185650814693:6yyi5e7cd30
  
    var options = new google.search.DrawOptions();
    options.setAutoComplete(true);
var searching = gup('search');
  customSearchControl.setLinkTarget(
    google.search.Search.LINK_TARGET_SELF);
   customSearchControl.draw('cse', options);
if (searching != '')
{
var intIndexOfMatch = searching.indexOf( "%20" );
while (intIndexOfMatch != -1){
searching= searching.replace( "%20", " " )
intIndexOfMatch = searching.indexOf( "%20" );
}
 customSearchControl.execute(searching); 
}
  }, true);