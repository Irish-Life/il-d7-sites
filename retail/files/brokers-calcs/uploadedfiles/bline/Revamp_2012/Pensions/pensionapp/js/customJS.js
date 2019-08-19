jQuery.support.cors = true;

$(document).ready(function() {
    $("#premiumAmt")[0].maxLength = 8;
    // OR:
    $("#premiumAmt").attr('maxlength', 8);
    // OR you can use prop if you are using jQuery 1.6+:
    $("#premiumAmt").prop('maxLength', 8);
    
$('#startLoading').hide();
$('#startButtonHolder').show();
	//$.mobile.changePage('#page-1', { transition: "fade"} );
});
// Styling for the page via jquery 
$(document).bind( 'pagecreate',function(event){
            window_height  = $(document).height();
            header_height  = $('.ui-header').height();
            $('.ui-content').css("min-height", window_height - (2*header_height));
            $('.ui-dialog-contain .ui-content').css("min-height", "200px");
});
// Add commas to numbers
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function showSpinnerModal(message){
  $("body").append('<div class="modalWindow"/>');
  $.mobile.showPageLoadingMsg("a",message, true);
}

function hideModal(){
 $(".modalWindow").remove();
  $.mobile.hidePageLoadingMsg();

}



var premiumCalced; // global storage of the premium
var premFreq; // global storage of freq
var allocationsStored;
var profileIdArr =[], takeUpArr =[], nameArr =[], newDeal =[], introPctArr =[], introAmtArr =[], renewalPctArr =[], renewalAmtArr =[], trailPctArr =[], trailAmtArr =[], messagesArr =[];

function goToPage(pageNum){
	$.mobile.changePage('#page-'+pageNum, { transition: "fade"} );
}

function goBackToPage(pageNum){
	$.mobile.changePage('#page-'+pageNum, { transition: "fade"} );
}

$('.closeDialogError').click(function(){
    $('.ui-dialog').dialog('close');
});

getProducts = function(premium,exitPen,pmFq){
        premFreq = pmFq;
     //$.mobile.showPageLoadingMsg({msgText : 'Loading. Please Wait.',textonly :'true',theme :'a'});
     showSpinnerModal('Loading. Please Wait.');
     //console.log(premium+" "+exitPen+" "+premFreq);
//getProducts('100000','Y','AP');
//make ajax call
//return array of product names & ids
var surl ="url=http://www.irishlife.ie/servlet/brokerCommissionApp?step=getProducts&premiumAmt="+premium+"&exitPenalties="+exitPen+"&premiumFreq="+premFreq;
        $.ajax({
	  
	    type:"POST",
            url:"/servlet/brokerCommissionApp?step=getProducts&premiumAmt="+premium+"&exitPenalties="+exitPen+"&premiumFreq="+premFreq,			
			//"http://www.irishlife-ebiz.net/pensionapp/php/proxy.php?sid=1&"+surl,
            crossDomain: true,
            dataType: "json", 
	        success: function(data){
                if (data[0].products.length<=0)
                {

                    hideModal();
                    $('#errorDialogContents').html("Maximum regular premium allowable is &euro;50k per annum. Please contact your account manager for amounts greater than this.");
                    $.mobile.changePage('#page-error', { transition: "pop", role: 'dialog'} );
                
                }
                else
                {
                    setProducts(data);
                }
            },
            error: function(e, xhr, et){
                alert("ERROR: "+et);
            }
	});

}
setProducts = function(data){

//make ajax call
//return array of product names & ids
var a = "<option value=\"none\">Please Select a Product</option>";
$.each(data[0].products, function(key, item) {
        //console.log(key+" "+item.id+" "+item.name);
        a +="<option value=\""+item.id+"\">"+item.name+"</option>";
  });
    $('#contractName').html(a);
	$.mobile.changePage('#page-2', { transition: "fade"} );
    $('#contractName').selectmenu('refresh');
    hideModal();
}



getAllocations = function(premium,productID){
     //console.log("----- "+premium+"  "+productID);
     showSpinnerModal('Loading. Please Wait.');
     //console.log(premium+" "+exitPen+" "+premFreq);
//getProducts('100000','Y','AP');
//make ajax call
//return array of product names & ids
var surl ="url=http://www.irishlife.ie/servlet/brokerCommissionApp?step=getAllocations&productId="+productID+"&premiumAmt="+premium;
        $.ajax({
	  
	    type:"POST",
             url:"/servlet/brokerCommissionApp?step=getAllocations&productId="+productID+"&premiumAmt="+premium,
			 //"http://www.irishlife-ebiz.net/pensionapp/php/proxy.php?sid=2&"+surl,
            //url:"http://www.irishlife-ebiz.net/pensionapp/php/testJSON.json",
            cache: false,
            crossDomain: true,
	    async:true,
            dataType: "json", 
	        success: function(data){
                        setAllocations(data);
                        //setProducts(data);
            },
            error: function(e, xhr, et){
                alert("ERROR: "+et);
            }
	});

}

String.prototype.replaceAll = function(str1, str2, ignore) 
{
   return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
function removeDuplicates(inputArray) {
            var i;
            var len = inputArray.length;
            var outputArray = [];
            var temp = {};

            for (i = 0; i < len; i++) {
                temp[inputArray[i]] = 0;
            }
            for (i in temp) {
                outputArray.push(i);
            }
            return outputArray;
}

function sortmyway(data_A, data_B)
{
    return (data_A - data_B);
}

var allArrH = [],charArrH = [];
setAllocations = function(data){

    $.each(data[0].charges, function(key, item) {
        
        allArrH[key] = item.allocationPct;
        charArrH[key] = item.chargePct;
        profileIdArr[key] = item.profile[0].profileId;
        takeUpArr[key] = item.profile[0].takeUp;
        nameArr[key] = item.profile[0].name;
        newDeal[key] = item.profile[0].newDeal;
        introPctArr[key] = item.profile[0].introPct;
        introAmtArr[key] = item.profile[0].introAmt;
        renewalPctArr[key] = item.profile[0].renewalPct;
        renewalAmtArr[key] = item.profile[0].renewalAmt;
        trailPctArr[key] = item.profile[0].trailPct;
        trailAmtArr[key] = item.profile[0].trailAmt;
        messagesArr[key] = item.profile[0].messages;
        //allocationsStored[key] = $(item.profile[0]);
        //console.log(key+" "+item.allocationPct+" "+item.chargePct);
       // a +="<option value=\""+item.id+"\">"+item.name+"</option>";
       hideModal();
  });
  
  var allArr = "";
  allArr = removeDuplicates(allArrH);
  allArr.sort(sortmyway);
  
  var a ="";
  a = "<option value=\"none\">Please Select Allocation</option>";
  for(i=0; i<allArr.length; i++){
      a +="<option value=\""+allArr[i]+"\">"+allArr[i]+"</option>";
  }
  //console.log(a);
  $('#clientAlloc').html("");  
  $('#clientAlloc').html(a);
  
  $.mobile.changePage('#page-3', { transition: "slide"} );

    $('#clientAlloc').selectmenu('refresh');
    $('#annualMgtCha').selectmenu('disable');
    var myselect = $("select#annualMgtCha");
    myselect[0].selectedIndex = 0;
    myselect.selectmenu("refresh");

}

$('#clientAlloc').change(function(){
        var a = $('#clientAlloc').val();
        var charArrX = [];
        for(i=0;i<allArrH.length; i++){
           if (allArrH[i] == a){
                charArrX.push(charArrH[i]);
           }
        }
	$('#annualMgtCha').selectmenu('enable');
    var charArr = "";
	charArr = removeDuplicates(charArrX);
        
  	charArr.sort(sortmyway);
    var z = "";
        z = "<option value=\"none\">Please Select Mgt Charge</option>";
        for(i=0; i<charArr.length; i++){
            z +="<option value=\""+charArr[i]+"\">"+charArr[i]+"</option>";
        }
	$('#annualMgtCha').html("");
	$('#annualMgtCha').html(z);
        $('#annualMgtCha').selectmenu('refresh');
});


var newResultSet = '<div data-role="collapsible" data-collapsed="false" data-theme="d" data-content-theme="d"><h3>Profile: <span class="profileId">5527-100</span></h3><div data-role="collapsible-set" data-theme="d" data-content-theme="d" data-mini="false"><div data-role="collapsible"><h3><span class="name"></span></h3><p><span class="details"></span></p></div><div data-role="collapsible"><h3>Warnings</h3><p><span class="messages"></span></p></div></div></div>';


getResults = function(allocation, mgtCharge){

    if(premFreq=="AP")
    {
        $('#resultDetailsHeader').html("<h3>"+productNameEng+"</h3><b>Allocation:</b> "+allocation+"<br/><b>Base AMC:</b> "+mgtCharge+"<br/><b>AP Premium:</b> &euro;"+addCommas(premiumCalced));
    }
    else 
    {
        $('#resultDetailsHeader').html("<h3>"+productNameEng+"</h3><b>Allocation:</b> "+allocation+"<br/><b>Base AMC:</b> "+mgtCharge+"<br/><b>Single Premium:</b> &euro;"+addCommas(premiumCalced));
    }
        var out = ""; // duuude!!
        

	for (i=0;i<allArrH.length;i++)
	{

		if(allArrH[i] == allocation && charArrH[i] == mgtCharge){
            var messages = "";
            for (x=0; x<messagesArr[i].length; x++)
            {
                messages += messagesArr[i][x]+"<br/><br/>";
            }
			
            if (takeUpArr[i].length == 2) // adding a '0' to takeups that aren't 100
			{
				takeUpArr[i] = "0"+takeUpArr[i];
			}
			else if (takeUpArr[i].length == 1) // adding a '0' to takeups that aren't 100
			{
				takeUpArr[i] = "00"+takeUpArr[i];
			}
			
			
                var trailAmtOutput = "";
                if(premFreq=="AP")
                {
                    $('#resultDetailsHeader').html("<h3>"+productNameEng+"</h3><b>Allocation:</b> "+allocation+"<br/><b>Base AMC:</b> "+mgtCharge+"<br/><b>AP Premium:</b> &euro;"+addCommas(premiumCalced));
                    trailAmtOutput = "";
                }
                else 
                {
                    $('#resultDetailsHeader').html("<h3>"+productNameEng+"</h3><b>Allocation:</b> "+allocation+"<br/><b>Base AMC:</b> "+mgtCharge+"<br/><b>Single Premium:</b> &euro;"+addCommas(premiumCalced));
                    trailAmtOutput = trailAmtArr[i].replace("?", "");
                }
    
    
			if ( newDeal[i] == "Y")
			{ // new deal
                        var parts = nameArr[i].split(";;");
						trailPctArr[i] 	= trailPctArr[i].replace("%", "");
			var spit = 
                        	'<div data-role="collapsible" class="collaps" data-collapsed="false" data-theme="d" data-content-theme="d">'+
                                    '<h3>Profile: '+profileIdArr[i]+'-'+takeUpArr[i]+' [Bullet Payments]</h3>'+
                                    //'<h4>'+parts[0]+'</h4>'+
                                    '<b>Commission: </b><br/>'+parts[1].replace("(", "").replace(")", "")+'<br/>'+
                                    '<b>Bullet Payments: </b>'+introPctArr[i]+' = '+introAmtArr[i].replace("?", "").replace("x ","x &euro;")+'<br/>';
                                    
                                    
                            if (premFreq == "AP")
                            {
                                    spit = spit+'<b>Fund Based Renewal: </b>'+trailPctArr[i]+'%  After Yr 9<br/><br/><br/>';
                            }
                            else{
                                    spit = spit+'<b>Fund Based Renewal: </b>'+trailPctArr[i]+'% = &euro;'+trailAmtOutput+' After Yr 9<br/><br/><br/>';
                            }
                            
                            spit = spit +'<div data-role="collapsible"><h3>Warnings</h3><p>'+messages+'</p></div>'+
                                '</div>';
			out = out + spit;
			}
            else
            {
                var checkNil = 'false';
                // regular
                var spit =  '<div data-role="collapsible" class="collaps" data-collapsed="false" data-theme="d" data-content-theme="d">'+
                        '<h3>Profile: '+profileIdArr[i]+'-'+takeUpArr[i]+'</h3>';
                        //'<h4>'+nameArr[i]+'</h4>';
						introPctArr[i] = introPctArr[i].replace("%", "");
						renewalPctArr[i] = renewalPctArr[i].replace("%", "");
						trailPctArr[i] 	= trailPctArr[i].replace("%", "");
						// console.log(introPctArr[i]+ "" +renewalPctArr[i]+ "" +trailPctArr[i]);
						if (introPctArr[i] > 0 || renewalPctArr[i] >0 || trailPctArr[i] >0)
						{
							spit = spit + '<b><u>Commission</u></b><br/>';
                            checkNil = 'true';
						}
						if (introPctArr[i] > 0)
						{
                        spit = spit + '<b>Introductory: </b>'+introPctArr[i]+'% = &euro;'+addCommas(introAmtArr[i])+'<br/>';
                            checkNil = 'true';
						}
                        if (renewalPctArr[i] >0)
                        {
                        	spit = spit +'<b>Renewal: </b>'+renewalPctArr[i]+'% = &euro;'+addCommas(renewalAmtArr[i])+'<br/>';
                            checkNil = 'true';
                        }
                        if (trailPctArr[i] >0 )
                        {   
                            if (premFreq == "AP")
                            {
                                spit = spit +'<b>Fund Based Trail: </b>'+trailPctArr[i]+'%<br/>';
                                checkNil = 'true';
                            }
                            else{
                                spit = spit +'<b>Fund Based Trail: </b>'+trailPctArr[i]+'% = &euro;'+trailAmtOutput+'<br/>';
                                checkNil = 'true';
                            }
                        }
                        if(checkNil == 'false')
                        {
                            spit = spit+'<b>Nil Commission</b><br/>';
                        }
                        spit = spit+'<br/><br/><br/>'+
                        '<div data-role="collapsible"><h3>Warnings</h3><p>'+messages+'</p></div>'+
                    '</div>';
			out = out + spit;

                        }
                }

   	}
        $('#resultsSet').html(out);
        //$('#resultsSet').collapsible({theme:'d',refresh:true});
        
        // This will stop the collapsible set from closing already opened sets
        $('.collaps').bind('expand', function (evt) {
              evt.stopPropagation();
         })

        $('.collaps').bind('collapse', function (evt) {
          evt.stopPropagation();
        });


        
$.mobile.changePage('#page-4', { transition: "slide"} );
        $('#resultsSet').trigger( "create" );  
        $('.ui-collapsible').trigger( "collapse" ); 
}


//##################################################
// The first proper button is pressed after the 
// the user as entered the basic information at 
// the start.
//##################################################

var exitPen; // exit penalty
$('#setPremiumDetails').click(function(){
        var premType = 'AP';
        
        // the premium entered
        var premium = Number($('#premiumAmt').val());
        
        // the frequency
        var freq = $('input[name=freq]:checked').val();
        
        if (!isNaN(freq)){
                
        	premiumCalced = premium*freq;
                premType = 'AP';
        }else{
                premType = 'SP';
                premiumCalced = premium;
        }
        
        var validDetails = true;
        if(isNaN(premium) || premium<=0)
        {
            $('#errorDialogContents').html("Sorry, there is an error with your premium. Please ensure that it is a valid number.");
            $.mobile.changePage('#page-error', { transition: "pop", role: 'dialog'} );
            validDetails = false;
        }

        
        exitPen;
        if ($('#exitPen').attr('checked') == 'checked'){
                exitPen = 'Y';
        }else{
                exitPen = 'N';
        }
        
        if(validDetails){
            getProducts(premiumCalced,exitPen,premType);
        }
});

//##################################################
// The second screen button is clicked after the 
// user has selected the correct product/contract.
//##################################################
var cn,productNameEng ="";
$('#setProductChoice').click(function(){
        cn = $('#contractName').val();
        productNameEng = $('#contractName option:selected').text();
        if(cn == 'none')
        {
            $('#errorDialogContents').html("Sorry, there is an error with your contract type. Please select a valid contract type. Thank you.");
            $.mobile.changePage('#page-error', { transition: "pop", role: 'dialog'} );
            
        }
        else
        {
            getAllocations(premiumCalced,cn);
        }
});

$('#setEmailAddress').click(function(){

    $.mobile.changePage('#page-5', { transition: "slide"} );

});


//##################################################
// The last main screen button is clicked after the 
// user has selected there allocations. The next
// screen displays the results. 
//##################################################

var all,mgt;

$('#showProfiles').click(function(){
    all = $('#clientAlloc').val();
    mgt = $('#annualMgtCha').val();

    if(all =="none" || mgt == "none")
    {
            $('#errorDialogContents').html("Sorry, there is an error with your allocation and management charge. Please ensure that these are both correct before proceeding.");
            $.mobile.changePage('#page-error', { transition: "pop", role: 'dialog'} );
    }
    else{
        getResults(all,mgt);
    }
});


$('#sendEmail').click(function(){
    // email address
    // premium
    // product ids
    // product name
    // frequency
    // exit pen
    // allocation %
    // amc %
    /*
    
var premiumCalced; // global storage of the premium
var premFreq; // global storage of freq
*/

var emailAddress = $('#emailAdd').val();
console.log("emailAddress: "+emailAddress+", premiumCalced: "+ premiumCalced +", premFreq: "+premFreq+", cn: "+cn+ ", productNameEng: "+productNameEng+", exitPen: "+exitPen +", all: "+all.replace("%", "")+",mgt:"+mgt.replace("%", ""));
    
    var surl="emailTo="+emailAddress+"&prem="+ premiumCalced +"&productId="+cn+"&product="+productNameEng+"&freq="+premFreq+"&exit="+exitPen+"&allocPct="+all.replace("%", "")+"&amc="+mgt.replace("%", "");
console.log("here");
        $.ajax({
	  
	    type:"POST",
             url:
			 "/servlet/sendBrokerCommEmail.do?"+surl,
			 //"http://www.irishlife-ebiz.net/pensionapp/php/proxy.php?sid=3&"+surl,
            //url:"http://www.irishlife-ebiz.net/pensionapp/php/testJSON.json",
            cache: false,
            crossDomain: true,
            async:true,
            dataType: "text",
            beforeSend: function(){
                    
                $('#emailDialogContents').html("Sending Email. Please wait.");
                $.mobile.changePage('#page-emailAlert', { transition: "pop", role: 'dialog'} );
            },
	        success: function(data){
             //   emailSent(data);
                $('#emailDialogContents').html("&#x2713;&nbsp;&nbsp;Email has now been sent successfully.");
                $.mobile.changePage('#page-emailAlert', { transition: "pop", role: 'dialog'} );
                        //setProducts(data);
            },
            error: function(e, xhr, et){
                $('#emailDialogContents').html("&#x2713;&nbsp;&nbsp;Email has now been sent successfully.");
                $.mobile.changePage('#page-emailAlert', { transition: "pop", role: 'dialog'} );
            }
	});
    
    
	// http://www.irishlife.ie/servlet/sendBrokerCommEmail.do?emailTo=stephenhayden@gmail.com&prem=55555&productId=C1PPSAA&product=Complete%20Solutions%201&freq=Y&exit=Y&allocPct=100&amc=1.00
});











