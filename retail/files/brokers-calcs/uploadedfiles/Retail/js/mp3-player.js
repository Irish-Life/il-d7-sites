$('#myAdvert').mouseup(function() {
		$(".myAdvertPlay").hide('slow');
});


// for playing the MP3 stuff
jQuery.fn.jmp3 = function(passedOptions){
	// hard-wired options
	var playerpath = "/uploadedimages/retail/img/";					// SET THIS FIRST: path to singlemp3player.swf

	// passable options
	var options = {
		"filepath": "",										// path to MP3 file (default: current directory)
		"backcolor": "",									// background color
		"forecolor": "ffffff",								// foreground color (buttons)
		"width": "25",										// width of player
		"repeat": "no",										// repeat mp3?
		"volume": "50",										// mp3 volume (0-100)
		"autoplay": "false",								// play immediately on page load?
		"showdownload": "true",								// show download button in player
		"showfilename": "true"								// show .mp3 filename after player
	};
	
	// use passed options, if they exist
	if (passedOptions) {
		jQuery.extend(options, passedOptions);
	}
	
	// iterate through each object
	return this.each(function(){
		// filename needs to be enclosed in tag (e.g. <span class='mp3'>mysong.mp3</span>)
		var filename = options.filepath + jQuery(this).html();
		// do nothing if not an .mp3 file
		var validfilename = filename.indexOf(".mp3");
		if (validfilename == -1) { return false; }
		// build the player HTML
		var mp3html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
		mp3html += 'width="' + options.width + '" height="40" ';
		mp3html += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">';
		mp3html += '<param name="movie" value="' + playerpath + 'singlemp3player.swf?';
		mp3html += 'showDownload=' + options.showdownload + '&file=' + filename + '&autoStart=' + options.autoplay;
		mp3html += '&backColor=' + options.backcolor + '&frontColor=' + options.forecolor;
		mp3html += '&repeatPlay=' + options.repeat + '&songVolume=' + options.volume + '" />';
		mp3html += '<param name="wmode" value="transparent" />';
		mp3html += '<embed wmode="transparent" width="' + options.width + '" height="40" ';
		mp3html += 'src="' + playerpath + 'singlemp3player.swf?'
		mp3html += 'showDownload=' + options.showdownload + '&file=' + filename + '&autoStart=' + options.autoplay;
		mp3html += '&backColor=' + options.backcolor + '&frontColor=' + options.forecolor;
		mp3html += '&repeatPlay=' + options.repeat + '&songVolume=' + options.volume + '" ';
		mp3html += 'type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
		mp3html += '</object>';
		// don't display filename if option is set
		if (options.showfilename == "false") { jQuery(this).html(""); }
		jQuery(this).prepend(mp3html+"&nbsp;");
		
		// Eolas workaround for IE (Thanks Kurt!)
		if(jQuery.browser.msie){ this.outerHTML = this.outerHTML; }
	});
};
