var onePlanChannels=["2","3","25","12","24","26","21","22","11"];

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //###################################################################
    // Control the Login button pressed
    //
function hideModal(){
  $.modal.close();
}
function hideSpinnerModal(){
  $('.loginModalLoading').fadeOut();
  $('.loginModalText').show();
}
function showSpinnerModal(){
  $('.loginModalLoading').show();
  $('.loginModalText').hide();
}

function setSuccess(data){  
  var ans = data.trim();
  var charStart = ans.charAt(0);
  hideModal();
  if (charStart == 'Y')
  {
		localStorage.setItem("isOnePlan", "N");
		var thisChannel = ans.substring(2);
		for (i = 0; i < onePlanChannels.length; i++) {
			if (thisChannel == onePlanChannels[i])
			{
				localStorage.setItem("isOnePlan", "Y");			
			}
		}		          
      hideModal();
      location.reload();	  
  }
  else if (charStart == 'N')
  {
      alert(
          "Sorry, your user id was not recognised. Please try again."
      );
      hideSpinnerModal();
	  $("#loginModal").modal({
      close: false,
      minHeight:400,
      maxWidth : 600
    });
  }
  else{
      alert(
          "Sorry, there was an error communicating with the server. Please check your internet connection and try again."
         
      );
      hideSpinnerModal();
  }
}

function loginClicked(){
  // show the loading message
  var userID=$('#userID').val();
  if (userID == null || userID == '')
  {
	alert('Enter your Irish Life user id');   
  }
  else if (userID == 'BillOn' || userID == 'BillOff')
  {
	localStorage.setItem("isOnePlan",userID == 'BillOn'?"Y":"N");
	hideModal();
	location.reload();
  }
  else
  {
    message = "Please Wait. Checking User Details..." ;
    showSpinnerModal(message);

        $.ajax({
      
        type:"GET",
       // url: "http://www.irishlife-ebiz.net/mobile/blineUserCheckProxy.php?userId=" + userID,
        url: "https://www.irishlife.ie/secure/blineUserCheck.do?userId=" + userID,
              dataType: "text",
              timeout: 15000,
              crossDomain: true,
              success: function (data) {
                setSuccess(data);
              },
              error: function (e, xhr, et) {
                alert("Sorry, there was an error communicating with the server. Please check your internet connection and try again.");
                hideSpinnerModal();
              },
              always: function (){      
                  setTimeout(hideModal(), 10000);           
              }
    });
  }
}

function loginAgain(){
	localStorage.removeItem("isOnePlan");	
	window.location.href = '/ask-underwriting';
}