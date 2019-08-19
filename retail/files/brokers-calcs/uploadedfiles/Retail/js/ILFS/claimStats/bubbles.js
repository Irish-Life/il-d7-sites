function makeBubbles(data){	

	bubblesExist = true;
	var total =0;
	var maxValue=0;
	var temp;
	
		for(var i=0;i<currentData.length; i++){
			var value = parseFloat(currentData[i][data+master]);
			if(value>maxValue){maxValue=value;};
			total += value;
		}
	
	var radius = 5, maxRadius=70;
	
	var bubbleScale = d3.scale.linear()
		.domain([0, maxValue])
		.range([radius, maxRadius]);
		
	var barScale = d3.scale.linear()
		.domain([0, maxValue])
		.range([0, 350]);

	theCentroids.sort(function(a,b){return getValue(b)-getValue(a)});
	
	function getValue(d){
		for(var key in currentData)
			{if(currentData[key].Name==d.name){var temp = parseFloat(getData(key));}};
		return bubbleScale(temp);
	}
	
	var bubbles =  d3.select("#map").selectAll(".bubble")
		.data(theCentroids)
		.enter()
		.append("div")
		.attr("class", "bubble")
		.style("left", function(d,i){return d.x+"px";})
		.style("top", function(d){return d.y+"px";})
		.style("width", radius+"px")
		.style("height", radius+"px")
		.on("mouseover", function(d,i){
				displayData = commas(extractData(d.name));
				if(selected!==1){var euro = "\u20AC";}else{var euro = "";};
				showTooltip("<u><b>"+d.name+"</b></u> <br/>"+selector[selected].replace(/_/gi," ")+"<br/>"+euro+displayData);
		})
		.on("mouseout", function(d){tooltip.style("visibility","hidden");});
	
	/*if (selected==1){

	var lifeExpectancy=d3.select("#map")
		.append("div")//
		.attr("class", "bubble")
		.style("border-radius", "0px")
		.style("opacity", .5)
		.style("left", chartX+"px")
		.style("top", (chartY-16)+"px")	
		.style("width", "0px")
		.style("height", "13px");
		
		lifeExpectancy
		.transition()
		.delay(1000)
		.duration(2000)
		.style("width", function(){return barScale(80.3)+"px";})
	}*/
		
	bubbles.transition()
		.duration(1000)
		.style("left", function(d,i){return d.x-(getValue(d)/2)+"px";})
		.style("top", function(d){return d.y-(getValue(d)/2)+"px";})
		.style("width", function(d){return getValue(d)+"px";})
		.style("height", function(d){return getValue(d)+"px";});
		
	bubbles.transition()
		.delay(1000)
		.duration(2000)
		.style("top", function(d,i){return chartY + (i * 16)+"px";})	
		.style("left", chartX+"px")
		.style("border-radius", "0px")
		.style("width", function(d,i){
			for(var key in currentData)
				{if(currentData[key].Name==d.name){temp = parseFloat(getData(key));}};
				temp = barScale(temp);	
			return parseFloat(temp)+"px";})
		.style("height", "13px");
	
	setTimeout(function(){
	bubbles.html(function(d){
			for(var key in currentData)
				{if(currentData[key].Name==d.name){temp = parseFloat(getData(key));}};
				temp = parseFloat(barScale(temp));
				displayData = commas(extractData(d.name));
				if (selected !=1) {displayData = "&euro;"+displayData};
			return "<div class='barLabel' style='left:"+(temp+10)+"px'>"+d.name+" - " + displayData+" </div>";});
	/*if(selected==1){lifeExpectancy.html("<div class='barLabel' style='left:"+(barScale(80.3)+10)+"px'>Average Life Expecancy (80.3)</div>")};*/
	},2100);
	
	}
	
	function getWidth(d){
		for(var key in currentData)
				{if(currentData[key].Name==d.name){var temp = parseFloat(getData(key));}};
			temp = barScale(temp);	
		return parseFloat(temp);
	}
			
	function getData(key){
		return currentData[key][selector[selected]+master];
	}
	
	function getAverage(){
	avg=0,i=0,min="n",max="n";
		for(var key in currentData){
		var value = parseFloat(currentData[key][selector[selected]+master]);
		avg+= value;
		i++;
		if(value>max||max=="n")max = value;
		if(value<min||min=="n")min = value;
		}
	avg/=i;
	opacityScale = d3.scale.linear()
		.domain([min, max])
		.range([0.2, 1]);
	}
	function killBubbles(data){
	d3.selectAll(".bubble")
			.transition()
			.duration(1000)
			.style("width", "0px")
			.remove();
	d3.selectAll(".barLabel")
			.transition()
			.duration(1000)
			.style("left", "0px");
	killInspector();	
	
	setTimeout(function(){makeBubbles(data);},1100);
	}