function cleanUp(){
		d3.select("#copy").remove();
			if (pie==true){
				d3.select("#vis").remove();
				d3.select("#pieDiv").remove();
			}
	}
	
function zoom(d,z){
	cleanUp();
	zoomed=true;
	var centroid = path.centroid(d);
	var bb = path.bounds(d);
	var ba = path.area(d);
	var bbW = Math.round(Math.abs(bb[0][0]-bb[1][0]));
	var bbH = Math.round(Math.abs(bb[0][1]-bb[1][1]));
	var bbScale=Math.max(bbH,bbW);
	if(bbScale>120)bbScale=120;
	var zm = 200/bbScale;
	
	clone("#"+d.properties.COUNTY).attr("id", "copy");
	copy = d3.select("#copy").moveToFront();

	x = ((mapCenter.x*2) - zm * (bb[1][0] + bb[0][0])) / 2;
	y = ((mapCenter.y*2) - zm * (bb[1][1] + bb[0][1])) / 2;
		
	copy.transition().duration(1000).attr("transform", "translate(" + (x) + "," + (y) + ")scale(" + zm + ")");

	zm*=1.5;
	
	inspector.transition().duration(1000)
		.attr("width", bbW*zm)
		.attr("height", bbH*zm)
		.attr("x", mapCenter.x-(bbW*zm/2))
		.attr("y", mapCenter.y-(bbH*zm/2));
	
	inspectorText.text(d.properties.COUNTY);
		
	inspectorText.transition().duration(1000)
		.style("font-size", "12px")
		.attr("height", "14px")
		.attr("x", mapCenter.x-(bbW*zm/2)+4)
		.attr("y", mapCenter.y-(bbH*zm/2)+16);
	
	var pieDiv  = d3.select("#map").append("div")
		.attr("class", "pieDiv")
		.attr("id", "pieDiv")
		.style("left", mapCenter.x-(bbW*zm/2)+"px")
		.style("top", mapCenter.y-(bbH*zm/2)+2+"px")
        .style("width", bbW*zm-4+"px")
		.style("height", bbH*zm-4+"px")
		.html("<div class='close'></div>");
				
	d3.select(".close").transition().delay(1000)
		.style("opacity",1);
		
	d3.select(".close").on("click", function(){cleanUp();killInspector();});
	
	setTimeout(function(){makePie( bbW*zm,bbH*zm-5,d);},1100);
	}
	
	function clone(selector) {
		var node = d3.select(selector).node();
		return d3.select(node.parentNode.insertBefore(node.cloneNode(true),
		node.nextSibling));
	}
		
	function extractData(lookUp){
		for(var key in currentData)
			{
				if(currentData[key].Name==lookUp){
				return getData(key);
				}
			}
	};
	
	function killInspector(){
	inspector
		.transition()
		.duration(1000)
		.attr("width", 0)
		.attr("height", 0)
		.attr("x", mapCenter.x)
		.attr("y", mapCenter.y);
		
	inspectorText
		.transition()
		.duration(1000)
		.style("font-size", "0px")
		.attr("x", mapCenter.x)
		.attr("y", mapCenter.y);
	if (pie==true){
		d3.select("#vis").remove();
		d3.select("#pieDiv").remove();
	}		
	zoomed=false;
	d3.select("#copy").remove();
	d3.select(".close").remove();
	}
			
			