
function is_touch_device() {
  return !!('ontouchstart' in window)  
      || !!('onmsgesturechange' in window); 
};

var touch = is_touch_device();


var fill = d3.scale.category20(),
	h=500,
	w=1055,
	avg=0,
	min,max,
	title,scale,labels,ticks;
	
var masterList = ["Death_Claims", "SIC_Claims"],
	selector = ["Total_Value_","Average_Age_","Average_Claim_"],
	selected= 0,
	master="DC";

var theCentroids=[];
var barChart;
var chartY = 40,chartX = 400;

var zoomed=false, dir = -3, copy;
var pie = false;
var mapCenter ={x:220,y:200};
var opacityScale;
var bubblesExist=false;

	d3.selection.prototype.moveToFront = function() {
		return this.each(function() {
			this.parentNode.appendChild(this);
			});
		};
		
	var projection = d3.geo.mercator()
        .translate([800, 4920])
        .scale(26500);
   
    var path = d3.geo.path()
        .projection(projection);
	
	var svgMap = d3.select("#map").append("svg")
        .attr("width", w)
        .attr("height", h);
		
	var g = svgMap.append("g").attr("id", "counties");
	
	var centroids = svgMap.append("g").attr("id", "centroids");
		
	var color = d3.rgb(67,83,153);
	 //#435399 
	var inspector = d3.select("#inspector");
	
	var tooltip = d3.select("body")
		.append("div")
		.attr("class", "tooltip box_shadow"); 
		
	var inspector = g.append("rect")
		.attr("class","inspector")
		.attr("rx", 6)
		.attr("ry", 6)
		.attr("x", mapCenter.x)
		.attr("y", mapCenter.y);
		
	var	inspectorText = g.append("text")
		.attr("class", "inspectorText")
		.attr("x", mapCenter.x)
		.attr("y", mapCenter.y)
		.text("");
		
	d3.loadData()
        .json('counties', '/uploadedFiles/retail/js/ilfs/claimStats/ireland.js')
        .csv('stats', statCSV)
	    .onload(function(data) {
	  
	currentData=data.stats;
	
	getAverage();
	
	var theCounties = g.selectAll("path")
        .data(data.counties.features)
        .enter().append("path")
		.attr("class", "path")
		.attr("id", function(d){return d.properties.COUNTY;})
		.attr("fill", function(d,i){return color;})
		.attr("d", path)
		.style("opacity", function(d){if(d.properties.COUNTY==="Northern Ireland"){return ".3";}else{
			var obj={
				name:d.properties.COUNTY,
				x:Math.round(path.centroid(d.geometry)[0]),
				y:Math.round(path.centroid(d.geometry)[1])};
			theCentroids.push(obj);
			return "1"}})
		.on("mouseover", function(d,i){
				if(d.properties.COUNTY!=="Northern Ireland"&&zoomed==false){
				d3.select(this).attr("class", "selectCounty");
				if(selected!==1){var euro = "\u20AC";}else{var euro = "";};
				var displayData = commas(extractData(d.properties.COUNTY));
				showTooltip("<u><b>"+d.properties.COUNTY+"</b></u> <br/>"+selector[selected].replace(/_/gi," ")+"<br/>"+euro+displayData);}
		})
		.on("mouseout", function(d){tooltip.style("visibility","hidden");})
		.on("click", function(d){zoom(d,2);});

	inspector.moveToFront();
	inspectorText.moveToFront();
	
	shadeIt();
	
	var masterSwitch = d3.select("#buttonHolder").selectAll(".master")
		.data(masterList)
		.enter()
		.append("div")
		.attr("class", "master button box_shadow")
		.attr("id", function(d,i){if(i==0){var temp = "DC"}else{var temp ="SIC"};return "master_"+temp;})
		.style("left", "100px")
		.html(function(d,i){var text = d.replace(/_/gi," "); 
				return "<div class='internal'>"+text+"</div>";})
		.on("mouseover", function(d,i){
			if(!touch){
			var drop = masterToggle(opposite(i)); 
			if(master!==drop)d3.select("#master_"+drop).transition().duration(500).style("top","410px");
			}
		})
		.on("click", function(d,i){
			master = masterToggle(i);
			selectMaster(master);
			if(!touch){d3.selectAll(".master").transition().duration(500).style("top","364px");}
			killBubbles(selector[selected]);
			shadeIt();
			});

	selectMaster(master);
	
	if(touch==true){d3.select("#master_SIC").style("top","410px");}
	
	function selectMaster(m){
		d3.selectAll(".master").style("background-color", "#4d4e53").style("z-index",100);
		d3.select("#master_"+m).style("background-color", "#cc092f").style("z-index",101);
	}
	
	function masterToggle(i){if(i==1){return "SIC";}else{return "DC";}};
	
	function opposite(i){if(i==1){return 0;}else{return 1;}};
	
	var buttons = d3.select("#buttonHolder").selectAll(".selector")
		.data(selector)
		.enter()
		.append("div")
		.attr("class", "selector button box_shadow")
		.attr("id", function(d,i){return "button_"+i;})
		.style("left", function(d,i){return 220+(i*100)+"px";})
		.html(function(d,i){var text = d.replace(/_/gi," "); 
				return "<div class='internal'>"+text+"</div>";})
		.on("click", function(d,i){selected=i;selectButton(i);killBubbles(d);shadeIt();});
	
	selectButton(selected);
	
	function selectButton(i){
		d3.selectAll(".selector").style("background-color", " #4d4e53");
		d3.select("#button_"+i).style("background-color", " #5cc151");
	}
	
	function shadeIt(){
	getAverage();
	theCounties.transition().duration(1000).attr("fill", function(d,i){
		var county = d.properties.COUNTY;
		if(county!=="Northern Ireland"){
			for(var key in currentData)
			{
			if(currentData[key].Name==county){var displayData = parseFloat(getData(key));}}
			if(displayData<avg){var temp = color.brighter(getDif(0,displayData));}
			else if(displayData>avg){var temp = color.darker(getDif(1,displayData));};
			}
			else
			{var temp = "#9999FF";}
			d3.select("#bar"+county).attr("fill", temp);
		return temp;	
	});}
	
	function getDif(darker,theValue){
		if(darker==0){var temp = 1.5*(Math.abs(theValue-avg) / Math.abs(avg-min));}
		else{var temp =1.5* (Math.abs(theValue-avg) / Math.abs(max-avg) );};
		return temp;
	}	
});

function commas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
function showTooltip(text){
	var x=d3.event.pageX-(100),y =d3.event.pageY-(80);
	tooltip.style("visibility","visible")
			.style("left",x + "px")
			.style("top", y + "px")
			.html(text);
	}
			
if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}	
