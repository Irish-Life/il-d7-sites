(function ($) {

  $(document).ready(function() {
	$('.close').click(function(){

			$('#fundModal').hide();
	})
$(".fund-table-filter").tabulator({
    height:"500px",
    pagination:"local",
    fitColumns:true,
    groupStartOpen:true,
    paginationSize:70,
    columns:[
        {title:"Search Funds", field:"a", sorter:"string", width:200, tooltipHeader:true, headerFilter:"input", headerFilter:true},
        {title:"Fund Provider", field:"b", sorter:"string", width:200, tooltipHeader:true, headerFilter:"input", headerFilter:true},
        {title:"Fund Type", field:"l", Korter:"string", align:"center", width:100, tooltipHeader:true, headerFilter:"input", visible:true},
        {title:"Morningstar Star Rating", field:"j", sorter:"string", width:150,formatter:"star", align:"center", tooltipHeader:true,  headerFilter:true},
        {title:"12 mths Performance", field:"f", sorter:"string",align:"center", width:150,tooltipHeader:true},
        {title:"Currency", field:"e", formatter:"money", align:"center", width:100, tooltipHeader:true, headerFilter:false},
    ],
    rowClick:function(e, row){
        var data = row.getData(); 
        
        $('.modal-content-fund-info').html(
            "<table class='fundModalTable'>\
                 <tbody>\
                  <tr>\
                     <td>Name</td>\
                     <td>" + data.a + "</td>\
                  </tr>\
                  <tr>\
                     <td>Fund Provider</td>\
                     <td>" + data.b + "</td>\
                  </tr>\
                  <tr>\
                     <td>Morningstar Category</td>\
                     <td>" + data.c + "</td>\
                  </tr>\
                  <tr>\
                     <td>ISIN</td>\
                     <td>" + data.d + "</td>\
                  </tr>\
                  <tr>\
                     <td>Currency</td>\
                     <td>" + data.e + "</td>\
                  </tr>\
                  <tr>\
                     <td>ReturnM12</td>\
                     <td>" + data.f+ "</td>\
                  </tr>\
                  <tr>\
                     <td>ReturnM36</td>\
                     <td>" + data.g+ "</td>\
                  </tr>\
                  <tr>\
                     <td>ReturnM60</td>\
                     <td>" + data.h+ "</td>\
                  </tr>\
                  <tr>\
                     <td>ReturnM120</td>\
                     <td>" + data.i+ "</td>\
                  </tr>\
                  <tr>\
                     <td>Morningstar Star Rating</td>\
                     <td>" + data.j+ "</td>\
                  </tr>\
                  <tr>\
                     <td>ExchangeName</td>\
                     <td>" + data.k+ "</td>\
                  </tr>\
                  <tr>\
                     <td>HoldingTypeId</td>\
                     <td>" + data.l+ "</td>\
                  </tr>\
                 </tbody>\
                </table>");
        $('#fundModal').show();
    },
});

$(".fund-table-filter").tabulator("setData", tableData);
  });
})(jQuery);



