var siteNav=true;

function toggleSiteNav()
{
	if (siteNav)
	{
		document.getElementById('group-nav-dropdown').style.display='block';
	}
	else
	{
		document.getElementById('group-nav-dropdown').style.display='none';
	}
	siteNav = !siteNav;

}
