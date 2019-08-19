jQuery(function ($) {
    // basic
    $('#map-modal a.open').click(function (e) {
        e.preventDefault();
        $('#map-modal-content').modal();
		showMap();
    });
    $('#callback-modal a.open').click(function (e) {
        e.preventDefault();
        $('#callback-modal-content').modal();
    });
    $('#financialReview-modal a.open').click(function (e) {
        e.preventDefault();
        $('#financialReview-modal-content').modal();
    });
    $('#video-modal a.open').click(function (e) {
        e.preventDefault();
        $('#video-modal-content').modal();
	});
    $('#financial-review-video-modal a.open').click(function (e) {
        e.preventDefault();
        $('#financial-review-video-modal-content').modal();
	});
});
