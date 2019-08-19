(function($) {
    var fundSelected = '';
    var fundChartDataCollected = [];
    $(document).ready(function() {
        fundSelected = localStorage.getItem("mapsFundSelected");
        $.ajax({
            type: 'POST',
            url: 'https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundsPerformanceIL?fundGroupId=72&page=price',
            //url: 'https://apps.irishlife.ie/myonlineservices/FundApi/RetrieveFundComparisonChart?fundIds=' + fundSelected.split(';')[0],
            success: function(data) {

                for(var i=0; i < data.length;i++) {

                    if(fundSelected.split(';')[0] == data[i].FundId)
                   
                    {
                            /*Tidy up response*/
                            //console.log("url = " + fundSelected.split(';')[0]);
                            //remove whitespace from before and after data
                            //var nospaces = data[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                            //remove whitespace from before and after data
                            //var result = nospaces.replace(/&#034;/g, "\"");
                            //parse the json to a javascript object
                            //window.fundData = jQuery.parseJSON(result);
                            //var fundData = jQuery.parseJSON(result);
                            var priceDate = data[i].PriceDate;

                            var fundCharge;
                            switch(fundSelected.split(';')[0]) {
                                case 'RKP':
                                    fundCharge = 0.90;

                                    break;
                                
                                case 'MKP':
                                    fundCharge = 0.90;

                                    break;

                                case 'GZP':
                                    fundCharge = 0.90;
        
                                    break;  
                                    
                                case 'GZP':
                                    fundCharge = 0.90;
                
                                    break; 
                                    
                                case 'GWP':
                                    fundCharge = 0.90;
                        
                                    break;

                                case 'XKP':
                                    fundCharge = 0.80;
                                
                                    break;   
                                    
                                default:
                                    fundCharge = 'N/A'    

                            }

                            var latestPrice = parseFloat(data[i].CurrentPrice);
                            var threeMonthGrowth = parseFloat(data[i].ThreeMonthGrowthPercent);
                            var sixMonthGrowth = parseFloat(data[i].SixMonthGrowthPercent);
                            var last12Months = parseFloat(data[i].OneYearGrowthPercent);
                            var last3Years = parseFloat(data[i].ThreeYearGrowthPercent);
                            var last5years = parseFloat(data[i].FiveYearGrowthPercent);
                            var sinceLaunchGrowth = parseFloat(data[i].SinceLaunchPercent);
                            /*console.log("priceDate = " + priceDate );
                            console.log("fundCharge = " + fundCharge );
                            console.log("latestPrice = " + latestPrice );
                            console.log("threeMonthGrowth = " + threeMonthGrowth );
                            console.log("sixMonthGrowth = " + sixMonthGrowth );
                            console.log("last12Months = " + last12Months );
                            console.log("last3Years = " + last3Years );
                            console.log("last5years = " + last5years );
                            console.log("sinceLaunchGrowth = " + sinceLaunchGrowth );*/
                            /*Add colours
                            if (fundCharge > 0) {
                                $("table.dataList td.charge").addClass('priceup');
                            } else if (fundCharge < 0) {
                                $("table.dataList td.charge").addClass('pricedown');
                            } */
                            if (threeMonthGrowth > 0) {
                                $("table.dataList td.3mth").addClass('priceup');
                            } else if (threeMonthGrowth < 0) {
                                $("table.dataList td.3mth").addClass('pricedown');
                            } else {
                                threeMonthGrowth = " - "
                            }
                            if (sixMonthGrowth > 0) {
                                $("table.dataList td.6mth").addClass('priceup');
                            } else if (sixMonthGrowth < 0) {
                                $("table.dataList td.6mth").addClass('pricedown');
                            } else {
                                sixMonthGrowth = " - "
                            }
                           if (last12Months > 0) {
                                $("table.dataList td.12mth").addClass('priceup');
                            } else if (last12Months < 0) {
                                $("table.dataList td.12mth").addClass('pricedown');
                            } else {
                                last12Months = " - "
                            } 
                            if (last3Years > 0) {
                                $("table.dataList td.3yrs").addClass('priceup');
                            } else if (last3Years < 0) {
                                $("table.dataList td.3yrs").addClass('pricedown');
                            } else {
                                last3Years = " - "
                            }
                            if (last5years > 0) {
                                $("table.dataList td.5yrs").addClass('priceup');
                            } else if (last5years < 0) {
                                $("table.dataList td.5yrs").addClass('pricedown');
                            } else {
                                last5years = " - "
                            }
                            if (sinceLaunchGrowth > 0) {
                                $("table.dataList td.fromlaunch").addClass('priceup');
                            } else if (sinceLaunchGrowth < 0) {
                                $("table.dataList td.fromlaunch").addClass('pricedown');
                            } else {
                                sinceLaunchGrowth = " - "
                            }
                            $("table.dataList .sort.dateVal").html(priceDate);
                            $("table.dataList td.date").html(priceDate);
                            //$("table.dataList td.charge").html(fundRisk);
                            $("table.dataList td.charge").html(fundCharge + "%");
                            $("table.dataList td.price").html("€" + latestPrice);
                            $("table.dataList td.3mth ").html(threeMonthGrowth + "%");
                            $("table.dataList td.6mth ").html(sixMonthGrowth + "%");
                            $("table.dataList td.12mth ").html(last12Months + "%");
                            $("table.dataList td.3yrs ").html(last3Years + "%");
                            $("table.dataList td.5yrs").html(last5years + "%");
                            $("table.dataList td.fromlaunch").html(sinceLaunchGrowth + "%");
                    }
                } //END OF LOOP
            }, //END OF SUCCESS
        }); //END OF AJAX
    }); //END OF DOC READY
        /*.always(function ( dataORjqXHR, textStatus, jqXHRORerrorThrown) {console.log("jqXHRORerrorThrown = "+jqXHRORerrorThrown);});*/
    })(jQuery);