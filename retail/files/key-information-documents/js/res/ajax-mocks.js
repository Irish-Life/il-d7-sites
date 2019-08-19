
var PublicFundNameList;


//get KIDS index from file

function setUpData(data){
	// this function is called after the successful ajax call to the Irish Life server for the big json file
	
	PublicFundNameList = data;
	// now set up the screen
	
			//loadingPage();
	
	setupMocks();
}


// Some mockjax code to simulate Ajax calls
function arrayIntersect(a, b) {
    return $.grep(a, function(i) {
        return $.inArray(i, b) > -1;
    });
}

function arrayToInt(array) {
	var output = [];

	for(var i=0;i<array.length;i++) {
		if(array[i] && !isNaN(+array[i])) output.push(+array[i]);
	}

	return output;
}

function arrayToFloat(array) {
	var output = [];

	for(var i=0;i<array.length;i++) {
		if(array[i] && !isNaN(parseFloat(array[i]))) output.push(parseFloat(array[i]));
	}

	return output;
}

function getArray(array) {
	var output = [];

	for(var i=0;i<array.length;i++) {
		if(array[i]) 
			output.push(array[i]);
	}

	return output;
}

function getPublicFundNames(PremiumTypeDesc, PublicProductName, SellerName) {
	
	
	var _PremiumTypeDesc = getArray([].concat(PremiumTypeDesc)),
		_PublicProductName = getArray([].concat(PublicProductName)),
		_SellerName = getArray([].concat(SellerName));

		var x = $.grep(PublicFundNameList, function(item, index){
			var s = true, r = true, st = true;

			if(_PremiumTypeDesc.length) {
				s = $.inArray(item.PremiumTypeDesc, _PremiumTypeDesc) > -1;
			}

			if(_PublicProductName.length) {
				r = $.inArray(item.PublicProductName, _PublicProductName) > -1;
			}

			if(_SellerName.length) {
				st = $.inArray(item.SellerName, _SellerName) > -1;
			}
			return !!(s && r && st);
		});
	
	return x;
}

function getPremiumTypeDescs(PublicProductName, SellerName) {
	var PublicFundNames = getPublicFundNames(null, PublicProductName, SellerName);

	var PremiumTypeDescs = $.map(PublicFundNames, function(PublicFundName) { return PublicFundName.PremiumTypeDesc; });
	PremiumTypeDescs.sort(asc);
	return arrayUnique(PremiumTypeDescs);
}

function getPublicProductNames(PremiumTypeDesc, SellerName) {
	
	var PublicFundNames = getPublicFundNames(PremiumTypeDesc, null, SellerName);

	var PublicProductNames = $.map(PublicFundNames, function(PublicFundName) { return PublicFundName.PublicProductName; });

	PublicProductNames.sort();
	return arrayUnique(PublicProductNames);
}



function getSellerNames(PremiumTypeDesc, PublicProductName) {
	var PublicFundNames = getPublicFundNames(PremiumTypeDesc, PublicProductName, null);

	var SellerNames = [];
	$.each(PublicFundNames, function(index, item) {
		SellerNames = arrayUnique(SellerNames.concat(item.SellerName));
	});
	SellerNames.sort(asc);
	return SellerNames;
}

function arrayUnique(array) {
	var a = array.concat();
	for(var i=0; i<a.length; ++i) {
		for(var j=i+1; j<a.length; ++j) {
			if(a[i] === a[j])
				a.splice(j--, 1);
		}
	}
	a.sort();

	return a;
}

function asc(a, b) {
	return a - b;

}

//load the dropdowns

function setupMocks() {
	
	$.mockjax({
		url: '/api/PremiumTypeDescs',
		contentType: 'application/json; charset=utf-8',
		responseTime: 200,
		response: function(settings){
			this.responseText = JSON.stringify(getPremiumTypeDescs(settings.data.PublicProductName, settings.data.SellerName));
		}
	});


	$.mockjax({
		url: '/api/PublicProductNames',
		contentType: 'application/json; charset=utf-8',
		responseTime: 200,
		response: function(settings){
			this.responseText = JSON.stringify(getPublicProductNames(settings.data.PremiumTypeDesc, settings.data.SellerName));
		}
	});

	$.mockjax({
		url: '/api/SellerNames',
		contentType: 'application/json; charset=utf-8',
		responseTime: 200,
		response: function(settings){
			this.responseText = JSON.stringify(getSellerNames(settings.data.PremiumTypeDesc, settings.data.PublicProductName));
		}
	});

	$.mockjax({
		url: '/api/PublicFundNames',
		contentType: 'application/json; charset=utf-8',
		responseTime: 200,
		response: function(settings){
			this.responseText = JSON.stringify(getPublicFundNames(settings.data.PremiumTypeDesc, settings.data.PublicProductName, settings.data.SellerName));
			
		}
	});
	 $('.results-list-item').show();
	modelApplyBindings();
}


//Function for retrieving PDF from Server
function GetKid(token, timestamp, premiumType, distributionCode, productCode, fundCode) {
	$('.loading').show();
    var xhr = new XMLHttpRequest();
    var params = { premiumType: premiumType, distributionCode: distributionCode, productCode: productCode, fundCode: fundCode };
    var url = 'https://apps.irishlife.ie/myonlineservices/KidQueryApi/DownloadFile';
    xhr.open('POST', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
        if (this.status === 200) {
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
            }
            var type = xhr.getResponseHeader('Content-Type');

            var blob = typeof File === 'function'
                ? new File([this.response], filename, { type: type })
                : new Blob([this.response], { type: type });
            if (typeof window.navigator.msSaveOrOpenBlob !== 'undefined') {
                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                window.navigator.msSaveOrOpenBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    // use HTML5 a[download] attribute to specify filename
                    var a = document.createElement("a");
                    // safari doesn't support this yet
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
            }
        }
		  $( this).promise().done(function() {
				$('.loading').hide();
			});	
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('TimeStamp', timestamp);
    xhr.setRequestHeader('Auth-Token', token);
    xhr.send($.param(params));
}

function getServerDate() {
	//Get PHP generated date when button is clicked
	$.ajax( { type : 'GET',
	  //url  : 'functionDate.php',              // <=== CALL THE PHP FUNCTION HERE.
	  url: 'https://www.irishlife.ie/sites/retail/files/key-information-documents/js/res/functionDate.php',  
	  //data : data,
	  async: false,
	  success: function ( data ) {
			phpClickDate = data;			// <=== VALUE RETURNED FROM FUNCTION.
	  },
	  error: function ( xhr ) {
		
	  }
	});
}

function GetKidList(token, timestamp) {
    /*var xhr = new XMLHttpRequest();
    var params = { }; // premiumType: premiumType, distributionCode: distributionCode, productCode: productCode, fundCode: fundCode };
    var url = 'https://www.irishlife.ie/myonlineservices/KidQueryApi/List';
    xhr.open('POST', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
			setUpData(this.response);
		}
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('TimeStamp', timestamp);
    xhr.setRequestHeader('Auth-Token', '6da52967-b118-4a7c-94d0-dfa50e32a2ee');
    xhr.send($.param(params));*/
	
		var res;
    $.ajax({
        type: 'POST',
        url: 'https://apps.irishlife.ie/myonlineservices/KidQueryApi/List',
        headers: {
            "TimeStamp": timestamp, "Auth-Token" : token
        },
        beforeSend: function(xhr, settings) {
            
        },
        success: function(response, textStatus, XMLHttpRequest) {
         
            // Json file
			setUpData(response);
        },
        error: function(xhr, status, error) {
			res = "{'error'}";
        }
    });
	return res;
}




//Call the function to bind the parameters and download the KID PDF
var phpClickDate;

			$(document).ready(function(){
				
				getServerDate();
				GetKidList('6da52967-b118-4a7c-94d0-dfa50e32a2ee', phpClickDate);
				
				//document.addEventListener("click", ".view-pdf-button", function(){
				$("#results-list-id").on("click", ".view-pdf-button", function(){	
						
					getServerDate();
					
					//split the values into variables
					var values = $(this).val().split(',');
					// do whatever with me
					var premiumType = values[0];
					var sellerCode = values[1];
					var productCode = values[2];
					var fund = values[3];
					
					//Trigger the getKid function to retrieve the pdf
					GetKid('6da52967-b118-4a7c-94d0-dfa50e32a2ee', phpClickDate, premiumType, sellerCode, productCode, fund);
					 
			
    
				});
			});