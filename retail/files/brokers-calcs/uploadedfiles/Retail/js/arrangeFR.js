$(document).ready(function () {
	$(function() {
		var availableTags = [
			"Mr",
			"Mrs",
			"Miss",
			"Ms",
			"Dr",
			"Prof"
		];
		$( "#title" ).autocomplete({
			source: availableTags
		});
	});
});

