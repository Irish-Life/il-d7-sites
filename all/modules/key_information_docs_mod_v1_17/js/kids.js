//Detect if IE9 or less and redirect
 $().ready(function () {
        try {
            var version = detectIE();
            if (version <= 9) {
                window.location.assign("https://www.irishlife.ie/sites/retail/files/old-browser-redirect/old-browser.html");
            }
        } catch (e) { }
    });

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
        //// return IE version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)));
        }

        // other browsers - return 100
        return 100;
    }
//////////////////////////////////////////////////////////

function viewmodel() {
	this.PublicFundNames = ko.observableArray([]);
	this.loading = ko.observable(false);
}

function modelApplyBindings() {
	var example2 = new viewmodel();
	
	//Apply knockout.js bindings to div
	ko.applyBindings(example2, document.getElementById('example2'));
	

	$('#example2').cascadingDropdown({
		selectBoxes: [
			{
				selector: '.step1',						
				source: function(request, response) {
					$.getJSON('/api/PremiumTypeDescs', request, function(data) {
					
						var selectOnlyOption = data.length;
				
						response($.map(data, function(item, index) {
							return {
								label: item,
								value: item
							};
						
						}));
					});
				
				}
			},
			{
				selector: '.step2',						
				requires: ['.step1'],
				source: function(request, response) {
					$.getJSON('/api/PublicProductNames', request, function(data) {
						var selectOnlyOption = data.length <= 1;
						response($.map(data, function(item, index) {
							return {
								label: item,
								value: item
							};
						}));
					});
				
				}
			},
			{
				selector: '.step3',
				requires: ['.step1', '.step2'],
				requireAll: true,
				source: function(request, response) {
					$.getJSON('/api/SellerNames', request, function(data) {
						response($.map(data, function(item, index) {
							
							return {
								label: item,
								value: item
							};
						}));
					});
					
				},
				onChange: function(event, value, requiredValues, requirementsMet) {

					if(!requirementsMet){
					
					// cleaning up the pdf display - dont show anything here
						example2.PublicFundNames('');
						example2.loading(false);
						return;
					 }

					example2.loading(true);

					var ajaxData = requiredValues;
					ajaxData[this.el.attr('name')] = value;
					$.getJSON('/api/PublicFundNames', ajaxData, function(data) {
						example2.PublicFundNames(data);
						example2.loading(false);
					});
				}
			}
		]
	});
}
