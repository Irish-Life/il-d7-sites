function toggleTwinDivs(idA, idB)
{	
	$('#'+idA).removeClass('hidden'); 
	$('#'+idB).addClass('hidden'); 
}
function openPage(divID)
{
	//Close all the open divs
	closeAllDivs();
	if ($('#menuBlockDetailsHolder').is(":visible")){
		resetArrows('A');
		resetArrows('B');
		resetArrows('C');
		$('#menuBlockDetailsHolder').toggle();
	}
	openDiv(divID);
	// close the menu 
}
function closeAllDivs()
{
	for(x = 0; x<=10; x++)
	{
		$('#linkClicked_'+x).addClass('hidden');
	}
}
function openDiv(divID)
{
	$('#linkClicked_'+divID).removeClass('hidden');
}

function toggleMyDiv(id)
{
		$('#'+id).slideToggle();
}//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Documet row stuff


/* these are the functions for the documents */
function displayDocuments(rowID, section)
{
	if (section=="doctype2")
	{
		updateDocRow(rowID+"_docfolder");
	}
	else if (section=="docFolder")
	{
		updateDocRow(rowID+"_document");
		updateDocRow_img(rowID+"_img");
	}
	else if (section=="docType")
	{
		//updateDocRow_img(rowID+"_img");
		//updateDocRow(rowID+"_docfolder");
		
		for(x = 0; ; x++)
		{
			alert($('#'+rowID+"_docfolder"+x).hasClass('hidden'));
			if($('#'+rowID+"_docfolder"+x).length != 0 && $('#'+rowID+"_docfolder"+x).hasClass('hidden'))
			{
				alert("inside");
				closeDocRows(rowID+"_docfolder"+x+"_document");
				//updateDocRow_img(rowID+"_docfolder"+x+"_img");
				closeDocRow_img(rowID+"_docfolder"+x+"_img");
			}
			else
			{
				break;
			}
		}
	}
	else
	{
		alert("No Section");
	}
}
//* toggle a specific row *//
function updateDocRow(rowID)
{
		for(i = 0; ; i++)
		{
			if($('#'+rowID+""+i).length != 0)
			{
				if ($('#'+rowID+""+i).hasClass('hidden'))
				{
					$('#'+rowID+""+i).removeClass('hidden');
				}
				else
				{
					$('#'+rowID+""+i).addClass('hidden');
				}
			}
			else
			{
				break;
			}
		}
}
function closeDocRows(rowID)
{	
	for(i = 0; ; i++)
	{
		if($('#'+rowID+""+i).length != 0)
		{
			$('#'+rowID+""+i).addClass('hidden');
		}
		else
		{
			break;
		}
	}

}
function openDocRow(rowID)
{
	$('#'+rowID).removeClass('hidden');
}
function closeDocRow_img(imgID)
{

	$('#'+imgID+"0").addClass('hidden');
	$('#'+imgID+"1").removeClass('hidden');

}
function openDocRow_img(imgID)
{
	$('#'+imgID+"0").removeClass('hidden');
	$('#'+imgID+"1").addClass('hidden');
}

function updateDocRow_img(imgID)
{
		if ($('#'+imgID+"0").hasClass('hidden'))
		{
			$('#'+imgID+"0").removeClass('hidden');
			$('#'+imgID+"1").addClass('hidden');
		}
		else
		{
			$('#'+imgID+"0").addClass('hidden');
			$('#'+imgID+"1").removeClass('hidden');
		}
}
//- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//	Tabs
//

function changeTab(tabSection, id)
{
	for(i = 0; ; i++)
	{	
		if($('#'+tabSection+'-tab-link' + i).length != 0)
		{
			if(i == id)
			{
				$('#'+tabSection+'-tab-link' + i).addClass('on'); 
				$('#'+tabSection+'-tab-content' + i).removeClass('hidden'); 
			}
			else
			{
				$('#'+tabSection+'-tab-link' + i).removeClass('on'); 
				$('#'+tabSection+'-tab-content' + i).addClass('hidden');
			}
		}
		else
		{
			break;
		}
	}
}

