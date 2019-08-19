jQuery(function ($) {
  $('#changeBarVals').on('change', function() {
    addCountyBarsValues(this.value);
  });
/*
$('#totalValBtn').click(function(){
  
    addCountyBarsValues('SIC_Claims');
		var updatedOptions = {'areas' : {}};
    
		updatedOptions.areas["Carlow"] = {
			value: "1",
			tooltip : {
				content : "Morbihan (56) (2)"
			},
			attrs: {
				fill : "#0088db"
			},
			text : {content : "56 (2)"}
		};
    $("#claimsStatsHolder").trigger('update', [updatedOptions]);
});
*/
function addCountyBarsEmpty(){
  var countiesIRE = ['Carlow','Cavan','Clare','Cork','Donegal','Dublin','Galway','Kerry','Kildare','Kilkenny','Laois','Leitrim','Limerick','Longford','Louth','Mayo','Meath','Monaghan','Offaly','Roscommon','Sligo','Tipperary','Waterford','Westmeath','Wexford','Wicklow'];
  var html='';
  for (i=0; i<countiesIRE.length; i++){
   // console.log('countiesIRE[i] '+countiesIRE[i]);
    html += '<div class="county"><span class="countyName">'+countiesIRE[i]+'</span><span class="countyBar" ><span class="countySolid '+countiesIRE[i]+'Bar" style="width:0%;"></span></span><span class="countyVal '+countiesIRE[i]+'Val"></span></div>';
  }
  $('.countyDataAll').html(html);
}

function totalRecords(county) {
	var customerCount = county.customer_count;
	console.log('Customer Count = ' + customerCount);
	var mobilePhone = county.mobile_phone_pop;
	console.log('Mobile Phone = ' + mobilePhone);
	var emailPop = county.email_pop;
	console.log('Emails = ' + emailPop);
	
	var total = parseInt(customerCount) + parseInt(mobilePhone) + parseInt(emailPop);
	console.log(total)
	
	return commaSeparateNumber(total);
}


function addCountyBarsValues(id){
  var countiesIRE = ['Carlow','Cavan','Clare','Cork','Donegal','Dublin','Galway','Kerry','Kildare','Kilkenny','Laois','Leitrim','Limerick','Longford','Louth','Mayo','Meath','Monaghan','Offaly','Roscommon','Sligo','Tipperary','Waterford','Westmeath','Wexford','Wicklow'];
  var html='';
  var ages= [];
  
  // get the highest number from the array
  for (i=0; i<countiesIRE.length; i++){
    ages.push(CustIntelMapData.counties[0][countiesIRE[i]][0][id]);
  }
  var highestNum = Math.max.apply(Math,ages);
  
  // the max number is the full bar and everything else is relative to that in terms of bar length
  for (i=0; i<countiesIRE.length; i++){
    var barLen = Math.round((100*CustIntelMapData.counties[0][countiesIRE[i]][0][id]/highestNum));
   //alert('start');
    $('.'+countiesIRE[i]+'Bar').css('width',barLen+'%');
    $('.'+countiesIRE[i]+'Val').html(commaSeparateNumber(CustIntelMapData.counties[0][countiesIRE[i]][0][id]));
  }
  $('.all_info').hide();
  $('.'+id+'_info').fadeIn('fast');
}

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }
  
  $('.closeOverlay').click(function(){
    $('.claimsOverlay').hide();
  });
function updateSquare(id){
    
    $('.claimsOverlay').fadeIn('fast');
    var d = '';
	/*
    if (claimsMapData.counties[0][id][0].Desc == undefined){
      d = 'Here is the breakdown of protection claims we paid in 2015 to people living in '+id+'. We paid a total of €'+commaSeparateNumber(claimsMapData.counties[0][id][0].Total_Value_DC)+' to '+commaSeparateNumber(claimsMapData.counties[0][id][0].Death_Claims_DC)+' families in '+id+' in 2015.';
    }
    else{
      d =claimsMapData.counties[0][id][0].Desc;
    }
	*/
    var infoHTML = 
    '<h1>'+id+'</h1>';
    //Name,Death_Claims_DC Total_Value_DC,Average_Age_DC,Average_Claim_DC,SIC_Claims,Total_Value_SIC,Average_Age_SIC,Average_Claim_SIC,Average_Age_all_claims
    
    infoHTML += d;
    infoHTML += '<div class="clearer"></div>';
    infoHTML += '<div class="statBlock"><div class="circleStat">'+commaSeparateNumber(CustIntelMapData.counties[0][id][0].customer_count)+'</div><div class="circleStatText">Number of Customers</div></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">'+commaSeparateNumber(CustIntelMapData.counties[0][id][0].mobile_phone_pop)+'</div><div class="circleStatText">Number of mobile phone records</div></div>';

    infoHTML += '<div class="statBlock"><div class="circleStat">'+commaSeparateNumber(CustIntelMapData.counties[0][id][0].email_pop)+'</div><div class="circleStatText">Number of email records</div></div>';
    
	/*
    infoHTML += '<div class="clearer"></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">€'+commaSeparateNumber(claimsMapData.counties[0][id][0].Total_Value_DC)+'</div><div class="circleStatText">Total Death Value</div></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">'+commaSeparateNumber(claimsMapData.counties[0][id][0].SIC_Claims)+'</div><div class="circleStatText">Number of SIC Claims</div></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">'+commaSeparateNumber(claimsMapData.counties[0][id][0].Average_Age_SIC)+'</div><div class="circleStatText">Avg. Age SIC</div></div>';
    
    infoHTML += '<div class="clearer"></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">€'+commaSeparateNumber(claimsMapData.counties[0][id][0].Average_Claim_SIC)+'</div><div class="circleStatText">Avg. SIC Claim</div></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">€'+commaSeparateNumber(claimsMapData.counties[0][id][0].Total_Value_SIC)+'</div><div class="circleStatText">Total SIC Value</div></div>';
    
    infoHTML += '<div class="statBlock"><div class="circleStat">'+commaSeparateNumber(claimsMapData.counties[0][id][0].Average_Age_all_claims)+'</div><div class="circleStatText">Avg. Age all claims</div></div>';
    */
    
    $('.claimsOverlay span').html(infoHTML);
 }
 /*
function setMap(){
    $("#claimsStatsHolder").mapael({
      map : {
        name : "Ireland_claims",
        defaultArea: {
          attrs : {
            fill: "#5261ac",
            stroke : "#fff", 
            "stroke-width" : 1
          },
          attrsHover : {
            "stroke-width" : 2
          },
           eventHandlers: {
              click: function (e, id, mapElem, textElem) {
                
                 var newData = {
                      'areas': {}
                  };
                  
                          if (mapElem.originalAttrs.fill == "#50C9B5") {
                              newData.areas[id] = {
                                  attrs: {
                                      fill: "#9ADCC6"
                                  }
                              };
                          } else {
                              newData.areas[id] = {
                                  attrs: {
                                      fill: "#50C9B5"
                                  }
                              };
                          }
                      
                $("#claimsStatsHolder").trigger('update', [newData]);
                updateSquare(id);
              }
          }
        }
      },
      areas: {
        "Carlow": {
          value: ""+claimsMapData.counties[0].Carlow[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Carlow</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Carlow[0].customer_count)}
        },
        "Cavan": {
          value: ""+claimsMapData.counties[0].Cavan[0].Total_Value_DC,				
          tooltip: {content : "<span style=\"font-weight:bold;\">Cavan</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Cavan[0].Total_Value_DC)}
        },
        "Clare": {
          value: ""+claimsMapData.counties[0].Clare[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Clare</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Clare[0].Total_Value_DC)}
        },
        "Cork": {
          value: ""+claimsMapData.counties[0].Cork[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Cork</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Cork[0].Total_Value_DC)}
        },
        "Donegal": {
          value: ""+claimsMapData.counties[0].Donegal[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Donegal</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Donegal[0].Total_Value_DC)}
        },
        "Dublin": {
          value: ""+claimsMapData.counties[0].Dublin[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Dublin</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Dublin[0].Total_Value_DC)}
        },
        "Galway": {
          value: ""+claimsMapData.counties[0].Galway[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Galway</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Galway[0].Total_Value_DC)}
        },
        "Kerry": {
          value: ""+claimsMapData.counties[0].Kerry[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Kerry</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Kerry[0].Total_Value_DC)}
        },
        "Kildare": {
          value: ""+claimsMapData.counties[0].Kildare[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Kildare</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Kildare[0].Total_Value_DC)}
        },
        "Kilkenny": {
          value: ""+claimsMapData.counties[0].Kilkenny[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Kilkenny</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Kilkenny[0].Total_Value_DC)}
        },
        "Laois": {
          value: ""+claimsMapData.counties[0].Laois[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Laois</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Laois[0].Total_Value_DC)}
        },
        "Leitrim": {
          value: ""+claimsMapData.counties[0].Leitrim[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Leitrim</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Leitrim[0].Total_Value_DC)}
        },
        "Limerick": {
          value: ""+claimsMapData.counties[0].Limerick[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Limerick</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Limerick[0].Total_Value_DC)}
        },
        "Longford": {
          value: ""+claimsMapData.counties[0].Longford[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Longford</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Longford[0].Total_Value_DC)}
        },
        "Louth": {
          value: ""+claimsMapData.counties[0].Louth[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Louth</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Louth[0].Total_Value_DC)}
        },
        "Mayo": {
          value: ""+claimsMapData.counties[0].Mayo[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Mayo</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Mayo[0].Total_Value_DC)}
        },
        "Meath": {
          value: ""+claimsMapData.counties[0].Meath[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Meath</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Meath[0].Total_Value_DC)}
        },
        "Monaghan": {
          value: ""+claimsMapData.counties[0].Monaghan[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Monaghan</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Monaghan[0].Total_Value_DC)}
        },
        "Offaly": {
          value: ""+claimsMapData.counties[0].Offaly[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Offaly</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Offaly[0].Total_Value_DC)}
        },
        "Roscommon": {
          value: ""+claimsMapData.counties[0].Roscommon[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Roscommon</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Roscommon[0].Total_Value_DC)}
        },
        "Sligo": {
          value: ""+claimsMapData.counties[0].Sligo[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Sligo</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Sligo[0].Total_Value_DC)}
        },
        "Tipperary": {
          value: ""+claimsMapData.counties[0].Tipperary[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Tipperary</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Tipperary[0].Total_Value_DC)}
        },
        "Waterford": {
          value: ""+claimsMapData.counties[0].Waterford[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Waterford</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Waterford[0].Total_Value_DC)}
        },
        "Westmeath": {
          value: ""+claimsMapData.counties[0].Westmeath[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Westmeath</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Westmeath[0].Total_Value_DC)}
        },
        "Wexford": {
          value: ""+claimsMapData.counties[0].Wexford[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Wexford</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Wexford[0].Total_Value_DC)}
        },
        "Wicklow": {
          value: ""+claimsMapData.counties[0].Wicklow[0].Total_Value_DC,
          tooltip: {content : "<span style=\"font-weight:bold;\">Wicklow</span><br />Total number of records"+commaSeparateNumber(claimsMapData.counties[0].Wicklow[0].Total_Value_DC)}
        }
        
      }
    });
	*/
	function setMap(){
    $("#claimsStatsHolder").mapael({
      map : {
        name : "Ireland_claims",
        defaultArea: {
          attrs : {
            fill: "#5261ac",
            stroke : "#fff", 
            "stroke-width" : 1
          },
          attrsHover : {
            "stroke-width" : 2
          },
           eventHandlers: {
              click: function (e, id, mapElem, textElem) {
                
                 var newData = {
                      'areas': {}
                  };
                  
                          if (mapElem.originalAttrs.fill == "#50C9B5") {
                              newData.areas[id] = {
                                  attrs: {
                                      fill: "#9ADCC6"
                                  }
                              };
                          } else {
                              newData.areas[id] = {
                                  attrs: {
                                      fill: "#50C9B5"
                                  }
                              };
                          }
                      
                $("#claimsStatsHolder").trigger('update', [newData]);
                updateSquare(id);
              }
          }
        }
      },
      areas: {
        "Carlow": {
          value: ""+CustIntelMapData.counties[0].Carlow[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Carlow</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Carlow[0])}
        },
        "Cavan": {
          value: ""+CustIntelMapData.counties[0].Carlow[0].customer_count,				
          tooltip: {content : "<span style=\"font-weight:bold;\">Cavan</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Cavan[0])}
        },
        "Clare": {
          value: ""+CustIntelMapData.counties[0].Clare[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Clare</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Clare[0])}
        },
        "Cork": {
          value: ""+CustIntelMapData.counties[0].Cork[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Cork</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Cork[0])}
        },
        "Donegal": {
          value: ""+CustIntelMapData.counties[0].Donegal[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Donegal</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Donegal[0])}
        },
        "Dublin": {
          value: ""+CustIntelMapData.counties[0].Dublin[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Dublin</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Dublin[0])}
        },
        "Galway": {
          value: ""+CustIntelMapData.counties[0].Galway[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Galway</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Galway[0])}
        },
        "Kerry": {
          value: ""+CustIntelMapData.counties[0].Kerry[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Kerry</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Kerry[0])}
        },
        "Kildare": {
          value: ""+CustIntelMapData.counties[0].Kildare[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Kildare</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Kildare[0])}
        },
        "Kilkenny": {
          value: ""+CustIntelMapData.counties[0].Kilkenny[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Kilkenny</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Kilkenny[0])}
        },
        "Laois": {
          value: ""+CustIntelMapData.counties[0].Laois[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Laois</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Laois[0])}
        },
        "Leitrim": {
          value: ""+CustIntelMapData.counties[0].Leitrim[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Leitrim</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Leitrim[0])}
        },
        "Limerick": {
          value: ""+CustIntelMapData.counties[0].Limerick[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Limerick</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Limerick[0])}
        },
        "Longford": {
          value: ""+CustIntelMapData.counties[0].Longford[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Longford</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Longford[0])}
        },
        "Louth": {
          value: ""+CustIntelMapData.counties[0].Louth[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Louth</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Louth[0])}
        },
        "Mayo": {
          value: ""+CustIntelMapData.counties[0].Mayo[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Mayo</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Mayo[0])}
        },
        "Meath": {
          value: ""+CustIntelMapData.counties[0].Meath[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Meath</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Meath[0])}
        },
        "Monaghan": {
          value: ""+CustIntelMapData.counties[0].Monaghan[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Monaghan</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Monaghan[0])}
        },
        "Offaly": {
          value: ""+CustIntelMapData.counties[0].Offaly[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Offaly</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Offaly[0])}
        },
        "Roscommon": {
          value: ""+CustIntelMapData.counties[0].Roscommon[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Roscommon</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Roscommon[0])}
        },
        "Sligo": {
          value: ""+CustIntelMapData.counties[0].Sligo[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Sligo</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Sligo[0])}
        },
        "Tipperary": {
          value: ""+CustIntelMapData.counties[0].Tipperary[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Tipperary</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Tipperary[0])}
        },
        "Waterford": {
          value: ""+CustIntelMapData.counties[0].Waterford[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Waterford</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Waterford[0])}
        },
        "Westmeath": {
          value: ""+CustIntelMapData.counties[0].Westmeath[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Westmeath</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Westmeath[0])}
        },
        "Wexford": {
          value: ""+CustIntelMapData.counties[0].Wexford[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Wexford</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Wexford[0])}
        },
        "Wicklow": {
          value: ""+CustIntelMapData.counties[0].Wicklow[0].customer_count,
          tooltip: {content : "<span style=\"font-weight:bold;\">Wicklow</span><br />Total number of records<br/>"+totalRecords(CustIntelMapData.counties[0].Wicklow[0])}
        }
        
      }
    });
    
    // once the map is loaded show the starting values
    addCountyBarsValues('customer_count');
  }
  addCountyBarsEmpty();
  $('.cs-panel-loading').fadeOut();
  $('.pc-panel').show();
  setMap();
  
	//updateSquare('Ireland');
  
});
