
(function ($) {

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }


    /*
    ###################
    #
    # Return an array of gradient colours for use with charts etc
    # Ensure the colours are not the same and are not too bright
    # or dark.
    */
    function colorLuminance(hex) {

      // convert to decimal and change luminosity
      var rgb = "#",c,i,r,g,b,rl,gl,bl;
      
      r = hexToRgb(hex).r;//parseInt(hex.substr(0,2), 16);
      g = hexToRgb(hex).g;//parseInt(hex.substr(2,2), 16);
      b = hexToRgb(hex).b;//parseInt(hex.substr(4,2), 16);
      
      var a = []; // the resulting array
      for(i=0;i<20;i++){
       var lum = (i-10)/10;
        rl = Math.round(Math.min(Math.max(0, r + ( r * lum)), 255));
        gl = Math.round(Math.min(Math.max(0, g + ( g * lum)), 255));
        bl = Math.round(Math.min(Math.max(0, b + ( b * lum)), 255))
        var luma = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl; // per ITU-R BT.709 http://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
      
         
        if (luma > 40 && luma < 212) {
          // The new hex which has been brightened or darkens based on lum value
          var myHex = rgbToHex(rl, gl, bl);
      
          // from 0 to 510
          // Dark to bright
          //
          a.push(myHex);
         
         
          // pick a different colour
        }
      }
      
      // if in the resulting array the initial hex is 
      // in the 2nd half of the array then flip it
      // so that it is likely gets used in any charts
      
      var initialLoc = a.indexOf(hex);
       if (a.length >=10){
            var extras = a.length - 10;
            for(x=0;x<extras;x++)
            {
              if((x+1) == a.indexOf(hex))
              {
                a.splice(x, 1);
              }
              else{ 
              
                a.splice((x+1), 1);
              }
            }
          }
      
      if(a.indexOf(hex) > (a.length/2)){
        a.reverse();
      }
      
      // a.reverse();
      return a;
    }
    
  $( document ).ready(function() {
    var selectedID = "4";
    var fload = new Array();
    var splitCount = allAssetsData[0].length;
   // var universalColors = ['#425399', '#f49d1d', '#4d4e53', '#5fc048', '#00a9d4', '#87607f', '#748433', '#3f92df', '#007b58', '#748433'];
    var mapColors = ['#c3e088', '#8fd5bd', '#49c3b1', '#5d89b4', '#515ba1'];
    var universalColors = colorLuminance(mapColors[selectedID-2]);
    

    //var universalColors = [colorLuminance('#c3e088',1), '#1a5774', '#356b84', '#4e7d94', '#6991a4', '#6991a4', '#72a6c2', '#c3d3da', '#d9e3e8', '#b5cfdf', '#6AF9C4'];
    // var universalColors = ['#005a8c', '#0badd5', '#26739e', '#7b87c0', '#5792b3', '#56c6e2', '#8cb4ca', '#87d7ea', '#abb0ca', '#c5c9db'];
    fload[0] = toObject(allAssetsData[0]);
    fload[1] = toObject(allAssetsData[1]);
    fload[2] = toObject(allAssetsData[2]);
    fload[3] = toObject(allAssetsData[3]);
    fload[4] = toObject(allAssetsData[4]);
    
    
      $('.irishlife-fc-asset-group-spinner-holder').hide();
      $('.irishlife-fc-asset-group-holder').show();
    getCustomPieChart('irishlife-fc-asset-group-holder','Asset Splits',allAssetsData[selectedID], universalColors);
    addAssetBars(fload, universalColors); // add the bars to the screen
    
    //universalColors = colorLuminance(mapColors[selectedID-2]);
    //setAssetBars(fload[selectedID],colorLuminance[mapColors[selectedID]]);

    var chart= $("#irishlife-fc-asset-group-holder").highcharts();


    function toObject(arr) {
      var table = [],
      keys = arr; // get & remove the first row
      
      for (var i=0; i<arr.length; i++) {
        
        
        var row = {};
          for (var j=0; j<arr[i].length; j++)
            {
              row[ j ] = arr[i][j];
                
            }
           table[i] = row;
        }
        return table;
      }
    
    
    
      function switchAsset(id){
      var c = colorLuminance(mapColors[id]);
      setAssetBars(fload[id],c);
      setAssetText(id);
      
        for(i=0; i<splitCount; i++)
        {
          chart.series[0].data[i].update({y:fload[id][i][1],name:fload[id][i][0]});
          chart.series[0].data[i].update({color:c[i]});
          //chart.series[0].data[i].graphic.attr({fill: c[i]});
        }
      
      }
    
    
               
       $(".switch-asset-2").hover(function () {
        switchAsset(0);
      });
       $(".switch-asset-3").hover(function () {
        switchAsset(1);
      });
       $(".switch-asset-4").hover(function () {
        switchAsset(2);
      });
       $(".switch-asset-5").hover(function () {
        switchAsset(3);
      });
       $(".switch-asset-6").hover(function () {
        switchAsset(4);
      });
          
       $(".circle").hover(function () {
        $(".circle").removeClass('hover');
        $(this).addClass('hover');
      });
      switchAsset((selectedID-2)); // selectedID starts at 2 & asset starts at 0
      $('.switch-asset-'+selectedID).addClass('hover');
      
  });
  
  
  
  function addAssetBars(arr, colors){
    
    var split = Math.round((arr[0].length/2));
    var rightBuildHTML ="",leftBuildHTML ="";
    for(i=0; i<arr[0].length; i++){
      if (i>=split)
      {
        rightBuildHTML += '<h6 class="asset-'+i+'-title">'+i+'</h6><div class="bar-holder bar-holder-'+i+'" style="border-bottom: 1px solid '+colors[i]+';"><div class="bar asset-'+i+'-bar" style="width: 38%;background:'+colors[i]+';"></div></div>';
        }
        else
        {
        leftBuildHTML += '<h6 class="asset-'+i+'-title">'+i+'</h6><div class="bar-holder bar-holder-'+i+'" style="border-bottom: 1px solid '+colors[i]+';"><div class="bar asset-'+i+'-bar" style="width: 38%;background:'+colors[i]+';"></div></div>';
        }
    }
     $('.asset-split-bars-left').html(leftBuildHTML);
     $('.asset-split-bars-right').html(rightBuildHTML);
     
     
  }
  function setAssetBars(obj,colors){
  for(i=0; i<obj.length; i++){
        $('.asset-'+i+'-title').html(obj[i][0]);
        $('.asset-'+i+'-bar').width(obj[i][1]+"%");
        $('.asset-'+i+'-bar').css('background', colors[i]);
        $('.bar-holder-'+i).css('border-color', colors[i]);
       
    }
  }
  
  
  //##########################
  //
  // This is the text for each of the MAP Funds
  //
  
  function setAssetText(id){

    var title = Drupal.settings.fund_charting.title;
    var url = Drupal.settings.fund_charting.url;
    
    var text = Drupal.settings.fund_charting.text;
    
    var html = "<h2><a target=\"_top\" href='"+url[id].trim()+
	"'>"+title[id].trim()+"</a></h2><p class='hide-for-small'>"+
	text[id].trim()+"&nbsp;</p><p ><a target=\"_top\" class='assetSplitCTABtn' href='"+
	url[id].trim()+"'>More Info</a></p>";
    $('#irishlife-fc-asset-group-text').html(html);
  }
  
  
  
  
  
  
  function getCustomPieChart(divTitle, chartTitle, chartData, colors ){

    // Make monochrome colors and set them as default for all pies
    Highcharts.getOptions().plotOptions.pie.colors = (function () {
    //  return ['#0F154F', '#252C6D', '#3C4384', '#5E65A0','#8C91BF', '#6268A2', '#8C91BF', '#BABDDC', '#E3E4F2','#B9AB97']
      // return colors;//['#5261ac', '#f19c2b', '#5cc151', '#cc092f', '#333333', '#4d4e53', '#435399', '#FF9655', '#FFF263', '#6AF9C4']
      
      /*
        var colors = [];
      
        for (i = 0; i < 10; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(Highcharts.Color(startColor).brighten((i - 3) / 10).get());
        }
      */
      
        return colors;
      
    }());

    // Build the chart
    $('#'+divTitle).highcharts({
        chart: {
        backgroundColor:'rgba(255, 255, 255, 0.1)',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        height: 240,
        style: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
			},
			margin:[30,0,0,0]
        },
		credits:{enabled:false},
        title: {
            text: ''
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.point.name + '</b>';
            }
        },
        plotOptions: {
            pie: {
					allowPointSelect: true,
                    cursor: 'pointer',
					size:200,
					center: ["50%", "40%"],
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: false,
					
            }
			
        },
		legend: {
						align: 'center',
						 verticalAlign: 'top',
						 floating: true,
						 y: 255,
						 layout: 'vertical',
            labelFormatter: function () {
              var y = this.y; // get the value
               if (y == 0) // if the value is zero then hide
                return null    
                else
                return this.name
              }
						},
        series: [{
            type: 'pie',
            name: '',
            data: chartData
        }],
        
    });
    }



  
})(jQuery);