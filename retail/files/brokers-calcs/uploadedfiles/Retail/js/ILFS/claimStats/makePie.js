
function makePie(w,h,county){

if (pie==true)d3.select("#vis").remove();
pie = true;
var w = w+10;
var h = h-5;
var r;
if(w<h){r=w/3.5;}else{r=h/3.5;};
var ir = r/2;
var textOffset = 14;
var tweenDuration = 1000;
var forPie = ["Death_Claims_DC", "SIC_Claims"];
var pieData = [];    
var oldPieData = [];
var filteredPieData = [];

var donut = d3.layout.pie().value(function(d){
  return d.value;
});

var color = ["#5cc151","#f4aa00"];

var arc = d3.svg.arc()
  .startAngle(function(d){ return d.startAngle; })
  .endAngle(function(d){ return d.endAngle; })
  .innerRadius(ir)
  .outerRadius(r);

var arrayRange = 100000; 
var arraySize;
var streakerDataAdded;


var vis = d3.select("#pieDiv").append("svg:svg")
  .attr("id", "vis")
  .attr("width", w)
  .attr("height", h);
  
var centerCircle = vis.append("svg:circle")
	.attr("r", ir)
	.attr("fill", "white")
	.attr("transform", "translate(" + (w/2) + "," + (h/2) + ")")
	.style("visibility", "hidden");
	
	
var arc_group = vis.append("svg:g")
	.attr("class", "arc")
	.attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

var label_group = vis.append("svg:g")
	.attr("class", "label_group")
	.attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");
  
var center_group = vis.append("svg:g")
	.attr("class", "center_group")
	.attr("transform", "translate(" + (w/2) + "," + (h/2) + ")");

var centerRollover= center_group.append("circle")
	.attr("r", ir)
	.attr("class", "centerRollover");
	
var totalLabel = center_group.append("svg:text")
	.attr("class", "label textShadow")	
	.attr("dy", -5)
	.attr("text-anchor", "middle") // text-align: right
	.text("Average Age");

var totalValue = center_group.append("svg:text")
	.attr("class", "total")
	.attr("dy", 17)
	.attr("text-anchor", "middle") // text-align: right
	.text("Waiting...");

var totalUnits = center_group.append("svg:text")
	.attr("class", "units")
	.attr("dy", 21)
	.attr("text-anchor", "middle") // text-align: right
	.text("");
	
function getPieValue(name,value){
		for(var key in currentData)
			{if(currentData[key].Name==name){return currentData[key][value];}};
}
	
update();
update();

function update(){
	var newData=[];
	arraySize = 2;

	for(var i=0;i<arraySize;i++){
		obj={name:forPie[i],
		value:getPieValue(county.properties.COUNTY,forPie[i])}
		newData.push(obj);}
	  
	oldPieData = filteredPieData;
 
	pieData = donut(newData);

	var totalOctets = 0;
  
	filteredPieData = pieData.filter(filterData);
  
  function filterData(element, index, array) {
    element.name = newData[index].name;
    element.value = newData[index].value;
    totalOctets += element.value;
    return (element.value > 0);
  }
   
  if(filteredPieData.length > 0 && oldPieData.length > 0){
	for(var j in oldPieData){
		oldPieData[j].endAngle=0;
		oldPieData[j].startAngle=0;}
		
    totalValue.text(function(){return getPieValue(county.properties.COUNTY,"Average_Age_all_claims");});

    paths = arc_group.selectAll("path").data(filteredPieData);
	
    paths.enter().append("svg:path")
      .attr("stroke", "white")
      .attr("stroke-width", 0.5)
	  .attr("opacity", 0.9)
      .attr("fill", function(d, i) {return color[i];})
	  .on("mouseover", function(d,i){showTooltip("<u><b>"+d.name+"</b></u> <br/>"+d.value);})
	  .on("mouseout", function(d){tooltip.style("visibility","hidden");});

    paths
		.transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths
		.transition()
        .duration(tweenDuration)
        .attrTween("d", pieTween);
    paths.exit()
      .transition()
        .duration(tweenDuration)
        .attrTween("d", removePieTween)
      .remove();
  }  
}

function pieTween(d, i) {
  var s0;
  var e0;
  if(oldPieData[i]){
    s0 = oldPieData[i].startAngle;
    e0 = oldPieData[i].endAngle;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    s0 = oldPieData[i-1].endAngle;
    e0 = oldPieData[i-1].endAngle;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0){
    s0 = oldPieData[oldPieData.length-1].endAngle;
    e0 = oldPieData[oldPieData.length-1].endAngle;
  } else {
    s0 = 0;
    e0 = 0;
  }
  var i = d3.interpolate({startAngle: s0, endAngle: e0}, {startAngle: d.startAngle, endAngle: d.endAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function removePieTween(d, i) {
  s0 = 2 * Math.PI;
  e0 = 2 * Math.PI;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: s0, endAngle: e0});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}

function textTween(d, i) {
  var a;
  if(oldPieData[i]){
    a = (oldPieData[i].startAngle + oldPieData[i].endAngle - Math.PI)/2;
  } else if (!(oldPieData[i]) && oldPieData[i-1]) {
    a = (oldPieData[i-1].startAngle + oldPieData[i-1].endAngle - Math.PI)/2;
  } else if(!(oldPieData[i-1]) && oldPieData.length > 0) {
    a = (oldPieData[oldPieData.length-1].startAngle + oldPieData[oldPieData.length-1].endAngle - Math.PI)/2;
  } else {
    a = 0;
  }
  var b = (d.startAngle + d.endAngle - Math.PI)/2;

  var fn = d3.interpolateNumber(a, b);
  return function(t) {
    var val = fn(t);
    return "translate(" + Math.cos(val) * (r+textOffset) + "," + Math.sin(val) * (r+textOffset) + ")";
  };
}
}
