/****
* The following is the code for use on the product fund information section.
* The code is used to display prices of funds etc for a particular product.
* The product id is passed and is used to pull info from the server. 
*
* @LastModified Stephen Hayden
* @Date 01/05/2012
*
**** 01/05/2012 *** Began developing code
*/

// create the ilfs namespace in jquery
$.fn.ilfs = {};

// create a type of plugin for jquery which will be used specifically 
// to manage the cleaning up and ordering of the HTML page pulled down
// from the server for the funds product pages. 
(function( $ ){

  var methods = {
    init : {},
    getTableHeader : function( data ) {
    // get the table header information from the passed in HTML page
        $headerCells = $('thead tr th', data);
        var headers = [];
        $headerCells.each(function(k,v) {
           headers[headers.length] = $(data).text();
        });
        
	return headers;
    
    },
    getTableRows : function( data ) { 
    // get the table row information from the passed in HTML page
        $rows = $('tbody', data).first().find("tr");
        var rows = [];
        $rows.each(function(row,v) {
          $('td', this).each(function(cell,v) {
            if (typeof rows[cell] === 'undefined') rows[cell] = [];
            rows[cell][row] = $(this).text();
          });
        });
        return rows;
    },
    getTableInputs : function( data ) { 
    // get the table input fields from the passed in HTML page
      	var inputs = [];
	
        $('input', data).each(function(i,a){
    //     console.log("here: "+i);
            inputs[i] = "<input class=\"compareFundsCheck\"type=\"checkbox\" value=\""+$(this).val()+"\" id=\""+$(this).attr('id')+"\">";
        });
        
        return inputs;
    },
    getGreenRedDiv : function( data ) { 
    var builder ='';
    var workData = parseFloat(data);
        if (workData >0)
        {
            builder = builder+"<td class='greenUp'>"+data+"</td>";
        }
        else if (workData< 0)
        {
            builder = builder+"<td class='redDown'>"+data+"</td>";
        }
        else
        {
            builder = builder+"<td>"+data+"</td>";
        }
        return builder;
    },
    redevHTML : function( headers, inputFields ) { 
    // create the html
    alert(headers);
    }
  };
    // $.fn.ilfs.chartHTMLRedo('redevHTML','test','teeee');
  $.fn.ilfs.chartHTMLRedo = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );

var totalChecked = 0;
$('.compareFundsCheck').live('change', function() {
  //alert('Handler for .change() called.');
		if($(this).is(':checked'))
		{
        totalChecked = totalChecked+1;
		}
        else{
        totalChecked = totalChecked-1;
        }
        if(totalChecked >= 5)
        {
            disableEmptyCheckBoxes('compareFundsCheck', 'true');
        }
        else if(totalChecked == 4){
         
            disableEmptyCheckBoxes('compareFundsCheck', 'false');   
        }
});

disableEmptyCheckBoxes = function(checkboxname,option){

    $('.'+checkboxname).each(function() {
    if(option=="false"){
        $(this).removeAttr("disabled");
    }
    else{
        if(!$(this).is(':checked'))
        {
            $(this).attr("disabled", "true");
        }
    }
  });
}

clearCheckBoxes = function(checkboxname){

    $('.'+checkboxname).each(function() {

        $(this).removeAttr("disabled");
        $(this).removeAttr('checked');

  });
  totalChecked=0;
}







//**************************************************//
// createTheChartPopOut('chartFlashholder','compareFundsCheck');
function createTheChartPopOut(chartDiv, checkboxname)
{
	var	funds = '', numFunds=0;
		
	    $('.'+checkboxname).each(function() {
		if($(this).is(':checked'))
		{
				funds= funds+ $(this).val() + ';';
				numFunds = numFunds +1;
		}
	});
	
	//alert(numFunds);
	
	if (numFunds >= 1 && numFunds <= 10) 
	{
        $('#charttableholder').fadeOut(function(){
            $('#chartFlashholder').fadeIn();
            $('.compareChartsButton').hide();
            $('#removeChartsButton').show();
        });
	 // <![CDATA[
	 var so = new SWFObject("http://www.irishlife.ie/zoomchart/amchart/amstock.swf", "amstock", "860", "450", "8", "#fff");
	 //so.addVariable("path", "/servlet/amchart/");
	 so.addVariable("settings_file", encodeURIComponent("http://www.irishlife.ie/servlet/amchart/?action=getChart&fund="+funds));
	 so.addVariable("preloader_color", "#fff");
	 so.addParam('wmode', 'window');
	 $('#'+chartDiv).removeClass('hidden');
	 so.write(chartDiv);
	 //$('#'+chartDiv).dialog({modal: true, width:950});
	 // ]]>
	 
	if (_gaq) _gaq.push(['_trackEvent', 'funds', 'Draw Chart',funds]);  
	if (_gaq) _gaq.push(['_trackPageview','/funds/draw-chart-'+funds+'.html']);
	}
	else if (numFunds == 0)
	{
		alert('Please select at least one fund to chart');
	}
	else
	{
		alert('You can only chart up to 10 funds at any one time');
	}
 }
var checkComplete = false;
getProductFundHTML = function (productID){
    if(checkComplete)
    {	
        $('#fundPricesModal').modal({
            minHeight:550,
            minWidth: 900,
            persist:true,
            overlayClose:true
        });
    }
    else{
		$('#fundPricesModalContent').html('<h1>Loading the funds, please wait.</h1>');
                $('#fundPricesModal').modal({
            minHeight:550,
            minWidth: 900,
            persist:true,
            overlayClose:true
        });
            $.ajax({
                //url:"/fund.app/json/fundPerform.json",
                url:"/servlet/retrieveBlineFundPrices.do?fundGroupId="+productID,
                //url:"http://ildev.internal.irishlife.ie:8080/uploadedFiles/emptyFragment.aspx?id=6962",
                //url:"http://www.irishlife.ie/uploadedFiles/retail/templates/iq.retail.content.aspx?id=18960",
                dataType: 'html',
				crossDomain: true,
                success: redevelopProductFundHTML,
                error: function(e, xhr, et){
					var output = "";
					for (property in et) {
					  output += property + ': ' + et[property]+'; ';
					}
					console.log("et = " + et);
                }
            });
    }

}

function redevelopProductFundHTML(data){
checkComplete = true;
    var table,nextTable, myFirstHeaders,myFirstRows,mySecondRows,myInputBoxes,latestFundInfoArr = [],latestHeadInfoArr = [];
	table = $(data).find("table").slice(0,1);
	nextTable = $(data).find("table").slice(1,2);
   	myFirstHeaders = ['Fund','Last Month','1 Yr','3 Yrs','5 Yrs','10 Yrs'];

    // myFirstHeaders = $(this).ilfs.chartHTMLRedo('getTableHeader',table);
    // mySecondHeaders = $(this).ilfs.chartHTMLRedo('getTableHeader',table);

    myFirstRows = $(this).ilfs.chartHTMLRedo('getTableRows',table);
    mySecondRows = $(this).ilfs.chartHTMLRedo('getTableRows',nextTable);
	myInputBoxes = $(this).ilfs.chartHTMLRedo('getTableInputs',$(data).find('#fundSelect').html());
	
	latestHeadInfoArr = new Array('','Fund','Price','Date','Last Mth','1 Yr','3 Yrs','5 Yrs','10 Yrs');

	for (i=0;i<myFirstRows[0].length; i++)
	{
		
		
		if(""+myFirstRows[0][i] == ""+mySecondRows[0][i]){
			latestFundInfoArr[''+i+''] = new Array(myInputBoxes[i],mySecondRows[0][i],myFirstRows[1][i],myFirstRows[2][i],mySecondRows[1][i],mySecondRows[2][i],mySecondRows[3][i],mySecondRows[4][i],mySecondRows[5][i]);
		}else
		{
			alert("Sorry there is an error loading some or all the funds");
		}
	}
	var builder = "<div class='compareChartsButton' ><input type=\"button\" id=\"markSelectedFunds\" value=\"Compare up to 5 Funds\" ><input type=\"button\" id=\"clearSelectedFunds\" value=\"Clear\" >&nbsp;&nbsp;&nbsp;<input type=\"button\" class=\"printFundContents righter\" value=\"Print\" ></div><div style='display:none' id='removeChartsButton'><input type=\"button\" id=\"removeChartFunds\" value=\"&larr; Return to funds list\" ></div><div id='chartFlashholder' style='display:none'></div><div id='charttableholder'><table>";
	builder = builder +"<tr><th> </th><th class='goLeftTD' width='290'>"+latestHeadInfoArr[1]+"</th><th>"+latestHeadInfoArr[2]+"</th><th width='90'>"+latestHeadInfoArr[3]+"</th><th>"+latestHeadInfoArr[4]+"</th><th>"+latestHeadInfoArr[5]+"</th><th>"+latestHeadInfoArr[6]+"</th><th>"+latestHeadInfoArr[7]+"</th><th>"+latestHeadInfoArr[8]+"</th></tr>";

	for (i=0;i<latestFundInfoArr.length; i++)
	{
    //console.log("latest "+i);
		builder = builder+"<tr><td>"+latestFundInfoArr[i][0]+"</td>";

        builder = builder+"<td class='goLeftTD '>"+latestFundInfoArr[i][1]+"</td>";
        builder = builder+"<td>"+latestFundInfoArr[i][2]+"</td>";
        builder = builder+"<td>"+latestFundInfoArr[i][3]+"</td>";
        
        // set the class to be either red or green depending on the contents of the div
        builder = builder+$(this).ilfs.chartHTMLRedo('getGreenRedDiv',latestFundInfoArr[i][4]);
        builder = builder+$(this).ilfs.chartHTMLRedo('getGreenRedDiv',latestFundInfoArr[i][5]);
        builder = builder+$(this).ilfs.chartHTMLRedo('getGreenRedDiv',latestFundInfoArr[i][6]);
        builder = builder+$(this).ilfs.chartHTMLRedo('getGreenRedDiv',latestFundInfoArr[i][7]);
        builder = builder+$(this).ilfs.chartHTMLRedo('getGreenRedDiv',latestFundInfoArr[i][8]);
        
        "</tr>";
	}
	
	builder = builder+"</table></div>";
    
	$('#fundPricesModalContent').html(builder);
    
    $('#markSelectedFunds').click(function(){
        createTheChartPopOut('chartFlashholder','compareFundsCheck');
    });
    $('#clearSelectedFunds').click(function(){
        clearCheckBoxes('compareFundsCheck');

    });
    $('.printFundContents').click(function(){
        var recipe =  window.open('','Fund Prices Window','width=945,height=600');
        var header = $('html>head').html();
        //alert ();
        var html = '<html><head>' + header + '</head><body onLoad="window.print();" style="background-color:#fff !important;"><div id="fundPricesModal" style="height:auto !important;width:940px !important;"><img src="/uploadedImages/retail/images/mainIrishLifeLogo.gif" alt="Irish Life"><br/>' + $('<div />').append($('#charttableholder').clone()).html() + $('<div />').append($('#chartFlashholder').clone()).html() + '</div></body></html>';
        recipe.document.open();
        recipe.document.write(html);
        recipe.document.close();
        recipe.document.print();
    });
    
    
    $('#removeChartFunds').click(function(){
            $('#chartFlashholder').hide(function(){
            $('#charttableholder').show();
            
            $('.compareChartsButton').show();
            $('#removeChartsButton').hide();
        });
    });
}

