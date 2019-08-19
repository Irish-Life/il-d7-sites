(function(window,undefined){
// console.log("######################################################################################################");
//     // Bind to StateChange Event
//     // History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
//     //     var State = History.getState(); // Note: We are using History.getState() instead of event.state
//     // });

//     // Change our States
    
//    $("body").on("click",".pipe", function(event){
//         history.pushState({state:1}, "pipe", "pipe.html");
        
//         // History.pushState({state:1}, "pipeline 1", "?pipeline"); // logs {state:1}, "State 1", "?state=1"
//     });
   
//       $("body").on("click",".alert", function(event){
//         history.pushState({state:2}, "alert", "start/alert.html");
//         // History.pushState({state:1}, "pipeline 1", "?pipeline"); // logs {state:1}, "State 1", "?state=1"
//     });
//     // History.pushState({state:2}, "State 2", "?state=2"); // logs {state:2}, "State 2", "?state=2"
//     // History.replaceState({state:3}, "State 3", "?state=3"); // logs {state:3}, "State 3", "?state=3"
//     // History.pushState(null, null, "?state=4"); // logs {}, '', "?state=4"
//     // History.back(); // logs {state:3}, "State 3", "?state=3"
//     // History.back(); // logs {state:1}, "State 1", "?state=1"
//     // History.back(); // logs {}, "Home Page", "?"
//     // History.go(2); // logs {state:3}, "State 3", "?state=3"
   
//    var popped = ('state' in window.history);
//    var initialURL = location.href;

//     $(window).bind('popstate', function(event){
//         var initialPop = !popped && location.href == initialURL;
//         popped = true;
//         if ( initialPop ) { return; } 
       

//         var state = event.originalEvent.state;
//          console.log("state = " + state);
//     });



})(window);