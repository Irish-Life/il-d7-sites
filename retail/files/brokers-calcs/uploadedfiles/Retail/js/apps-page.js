/**
 * Minified, all global Javascript
 * version 0.1
 * Date: 12-DEC-10 
 */
//	Image Scroll on Apps page

function showImage (whichOne, whichWay)
{
	var next = parseInt($('#'+whichOne+'Img').val());
	
	if (whichWay=="next") 
	{
		next=next+1;
		if (next>4) 
		{
			next=1;
		}
		
	$('.'+whichOne).hide('slide', {direction: 'left'}, 100);	
	$('#'+whichOne+'Img').val(next);
	$('#'+whichOne+'img'+next).show('slide', {direction: 'right'}, 200);
	
	}else if (whichWay=="prev") 
	{	
		next=next-1;
		if (next==0)
		{
			next=4;
		}
		
	$('.'+whichOne).hide('slide', {direction: 'right'}, 100);	
	$('#'+whichOne+'Img').val(next);
	$('#'+whichOne+'img'+next).show('slide', {direction: 'left'}, 200);
	
	}
	
	
	$('#'+whichOne+'infoText'+next).fadeIn('hidden');

}		