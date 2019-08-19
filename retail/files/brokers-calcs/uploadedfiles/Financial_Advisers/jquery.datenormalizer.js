/**
 *
 * ***********************
 * *   Date Normalizer   *
 * ***********************
 *
 * jQuery Plugin
 *
 * @version 0.1
 *
 * @author Walter Dal Mut
 * @author Antonello Pasella
 * 
 * @copyright Walter Dal Mut
 * 
 * 
 *
 */

(function($) {
	
	var _options = {
		baseYear: '1900',
		format: 'd.m.y',
		separator: '/',
		display: false,
		error_message: 'Wrong date',
		valid_message: ''
	};
		
	var _subinfos =	{
		day: 0,
		month: 1,
		year: 2,
		error: false
	};

	var is_date = function( gg, mm, aaaa )
	{
	
		strdata = gg+"/"+mm+"/"+aaaa;
	
		data = new Date(aaaa,mm-1,gg);
	   	daa=data.getFullYear().toString();
	   	
	   	dmm=(data.getMonth()+1).toString();
	    dmm=dmm.length==1?"0"+dmm:dmm
	   	dgg=data.getDate().toString();
	    dgg=dgg.length==1?"0"+dgg:dgg
	   	dddata=dgg+"/"+dmm+"/"+daa
	
	   	if( dddata != strdata)
	    	return false;
	    else
	    	return true;
	}
	
	var sep7 = function( the_data )
	{
		data_a = new Array();
		
		data_a.push( the_data.substring(0,1) );
		data_a.push( the_data.substring(1,3) );
		data_a.push( the_data.substring(3) );
		
		return data_a;
	};
	
	var sep6 = function( the_data )
	{
		data_a = new Array();
		
		data_a.push( the_data.substring(0,2) );
		data_a.push( the_data.substring(2,4) );
		data_a.push( the_data.substring(4) );
		
		return data_a;
	};

	var sep5 = function( the_data )
	{
		data_a = new Array();
		
		data_a.push( the_data.substring(0,2) );
		data_a.push( the_data.substring(2,3) );
		data_a.push( the_data.substring(3) );
		
		return data_a;
	};
	
	var sep4 = function( the_data )
	{
		data_a = new Array();
		
		data_a.push( the_data.substring(0,1) );
		data_a.push( the_data.substring(1,2) );
		data_a.push( the_data.substring(2) );
		
		return data_a;
	};

	var sep3 = function( the_data )
	{
		data_a = new Array();
		
		data_a.push( the_data.substring(0,1) );
		data_a.push( the_data.substring(1,2) );
		data_a.push( the_data.substring(2) );
		
		return data_a;
	};
	
	var sep2 = function( the_data )
	{
		data_a = new Array();
		
		data_a.push( the_data.substring(0,1) );
		data_a.push( the_data.substring(1) );
		data_a.push( _options.baseYear );
		
		return data_a;
	};

	var processor = function( data_a )
	{
		if( data_a.length != 3 )
		{
			var malformed = "";
			//Fusion
			for( var i=0; i< data_a.length; i++ )
				malformed += data_a[i];
			
			switch( malformed.length )
			{
				case 2:
					data_a = sep2( malformed );
					break;
				case 3:
					data_a = sep3( malformed );
					break;
				case 4:
					data_a = sep4( malformed );
					break;
				case 5:
					data_a = sep5( malformed );	
					break;
				case 6:
				case 8:
					data_a = sep6( malformed );
					break;
				case 7:
					data_a = sep7( malformed );
					break;
				default:
					_subinfos.error = true;
					break;
			}
		}
		
		return data_a;
	};

	var joinner = function( data_a )
	{
		if( data_a.length == 3 )
		{
			if( data_a[_subinfos.day].length < 2 )
			data_a[_subinfos.day] = '0'+data_a[_subinfos.day];
			
			if( data_a[_subinfos.month].length < 2 )
				data_a[_subinfos.month] = '0'+data_a[_subinfos.month];
				
			if( data_a[_subinfos.year].length < 4 )
				data_a[_subinfos.year] = _options.baseYear.toString().substring( 0, (4-data_a[_subinfos.year].length) )  + data_a[_subinfos.year];
			
			if( !is_date( data_a[_subinfos.day], data_a[_subinfos.month], data_a[_subinfos.year] ) )
			{
				_subinfos.error = true;
			}
			else
			{
				_subinfos.error = false;
			}
			
			return data_a[0]+_options.separator+data_a[1]+_options.separator+data_a[2];
		}
		else
		{
			return "";
		}

	};

	var splitter = function( data_b )
	{
		return data_b.split( _options.separator );
	};
	
	var converter = function( data_b )
	{
		data_a = splitter( data_b );
		
		data_a = processor( data_a );
		
		return joinner( data_a );
	};
	
	var replacer = function( data_b )
	{	
		data_b = data_b.replace( /\./g, "/" );
		data_b = data_b.replace( /\-/g, "/" ); 
		data_b = data_b.replace( /\,/g, "/" );
		data_b = data_b.replace( /\;/g, "/" );
		data_b = data_b.replace( /\:/g, "/" );
		
		return data_b.replace( /\//g, _options.separator );
	};
	
	var normalizer= function()
	{
		var the_data = $(this).val();
		
		if( the_data.match(/[\sA-Z]/i) ) {return false;	}
		
		the_data = replacer( the_data );
		
		the_data = converter( the_data );
		
		$(this).val( the_data );
		
		if( _options.display )
		{
			if( _subinfos.error )
			{
				$('#'+_options.display).text(_options.error_message);
				$('#'+_options.display).removeClass( 'valid_date' );
			}
			else
			{
				$('#'+_options.display).text(_options.valid_message);
				$('#'+_options.display).addClass( 'valid_date' );
			}
		}
		
	};
	
	var setOptions = function( options )
	{
				
		if( options.baseYear )
			_options.baseYear = options.baseYear;
		if( options.format )
			_options.format = options.format;
		if( options.separator )
			_options.separator = options.separator;
		if( options.display )
			_options.display = options.display;
		if( options.valid_message )
			_options.valid_message = options.valid_message;
		if( options.error_message )
			_options.error_message = options.error_message;
			
		var extra = _options.format.toString().split(".");
		
		for( i=0;i<3;i++ )
		{
			data = extra[i];
			switch( data )
			{
				case 'd':
					_subinfos.day = i;
					break;
				case 'm':
					_subinfos.month = i;
					break;
				case 'y':
					_subinfos.year = i;
					break;
				default:
					throw "Impossibile to understand the date format";
					break;
			}
		}
	};
	
	$.fn.dateNormalizer = function( options )
    {
    	if( options )
    		setOptions( options );		//Set the options for normalize the date in input
    	
    	//$(this).blur( normalizer );		//On blur action run the normalizer!
		
		$(this).each( normalizer );
    };    
})(jQuery);