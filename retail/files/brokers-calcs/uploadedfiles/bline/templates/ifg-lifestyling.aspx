

<%
Dim password as String = Request.QueryString("p")
password = "fc3707fa908df1e82e30ecbdae3d094804a8f87d"
if password = "fc3707fa908df1e82e30ecbdae3d094804a8f87d" Then
Response.Write(""& _
"<!DOCTYPE html><!--[if IE 8]> <html class=""no-js lt-ie9"" lang=""en"" > <![endif]-->" & _
"<!--[if gt IE 8]><!-->" & _
"<html style="""" class="" js no-touch svg inlinesvg svgclippaths no-ie8compat"" lang=""en""><!--<![endif]--><head>" & _
"<meta http-equiv=""content-type"" content=""text/html; charset=UTF-8"">" & _
	"<meta http-equiv=""X-UA-Compatible"" content=""IE=edge,chrome=1"">" & _
	"<meta charset=""utf-8"">" & _
	"<meta name=""viewport"" content=""width=device-width"">" & _
	"<title>IFG Lifestyling Fund Mix</title>" & _
"<meta name="""" content="""">" & _
"<meta name="""" content="""">" & _
	"<meta http-equiv=""X-UA-Compatible"" content=""IE=Edge"">" & _
"<link rel=""stylesheet"" media=""screen"" type=""text/css"" href=""/secureWeb/uploadedImages/bline/templates/css/ifg-lifestyling.css"">" & _
"<link href=""/secureWeb/uploadedImages/bline/templates/css/ifg-lifestyling-print.css"" rel=""stylesheet"" type=""text/css"" media=""print"" />" & _
	"<!--[if lt IE 9]>" & _
	"<link rel=""stylesheet"" media=""screen, print"" type=""text/css"" href=""/secureWeb/uploadedImages/ie8-grid-foundation-4.css""/>" & _
	"<![endif]-->" & _
"</head>" & _
"<body>" & _
	"<!-- This is the main header of the page, with menus etc -->" & _
	"<div id=""logo"" class=""blueBG"">" & _
		"<nav class=""top-bar row"">" & _
			"<img src=""https://www.bline.ie/secureWeb/uploadedImages/bline/Revamp_2012/Pensions/ifg-logo.gif"" />" & _
			"</nav>" & _
	"</div>" & _
	"<!-- This is the main content of the page -->" & _
	"<div id=""pageHeaderAnchor"" class=""pageHeaderInfo"">" & _
		"<div class=""row pageHeaderInfo"">" & _
			"<div class=""large-12 columns"">" & _
				"<h1>IFG Lifestyling Fund Mix</h1>" & _
			"</div>" & _
		"</div>" & _
	"</div>" & _
"<div id=""content"" class=""row pageContentHolder"">" & _
	"<div style="""" id=""commissionProjectionForm""><div class=""row"">" & _
		"<div class=""large-12 columns"">" & _
			"<h3>Details</h3>" & _
		"</div>" & _
	"</div>" & _
"<div class=""row"">" & _
	"<div class=""large-4 columns"">" & _
		"<h6>Name:</h6>" & _
"</div>" & _
"		<div class=""large-8 columns"">" & _
			"<input id=""name"" name=name type=""text"" placeholder=""First and last name"" required autofocus>" & _
			"</div></div>" & _
			"<div class=""row"">" & _
			"<div class=""large-4 columns"">" & _
			"<h6>Date of Birth:</h6>" & _
"</div>" & _
"<div id=""joyride-3"" class=""large-8 columns"">" & _
"<input id=""dob"" type=""text"" name=""bday"" placeholder=""dd/mm/yyyy"" required>" & _
"</div>" & _
"<div class=""large-4 columns"">" & _
			"<h6>Retirement Age:</h6>" & _
"</div>" & _
"<div id=""joyride-3"" class=""large-8 columns"">" & _
"<select id=""retirementAge"">" & _
							"<option value=""0"">-- Select Retirement Age --</option>" & _
							"<option value=""60"">60</option>" & _
							"<option value=""61"">61</option>" & _
							"<option value=""62"">62</option>" & _
							"<option value=""63"">63</option>" & _
							"<option value=""64"">64</option>" & _
							"<option value=""65"">65</option>" & _
							"<option value=""66"">66</option>" & _
							"<option value=""67"">67</option>" & _
							"<option value=""68"">68</option>" & _
							"<option value=""69"">69</option>" & _
							"<option value=""70"">70</option>" & _
							"<option value=""71"">71</option>" & _
							"<option value=""72"">72</option>" & _
							"<option value=""73"">73</option>" & _
							"<option value=""74"">74</option>" & _
							"<option value=""75"">75</option>" & _
						"</select>" & _
			"<h6><span id=""commissionProfilePercentTotal"" class=""red"">Retirement age must be compatible with the pension contract</span></h6>			" & _
"</div>" & _
"<div class=""large-4 columns"">" & _
			"<h6>Lifestyling Strategy:</h6>" & _
"</div>" & _
"<div id=""joyride-3"" class=""large-8 columns"">" & _
"<select id=""fundStrategy"" name=""Type of Styling?"" class=""ektronTextField medium input-text oversize"">" & _
							"<option value=""0"">-- Please Select --</option>" & _
							"<option value=""arfCautiousStrat"">Cautious Strategy(ARF)</option>" & _
							"<option value=""arfBalancedStrat"">Balanced Strategy(ARF)</option>" & _
							"<option value=""arfAdventureStrat"">Adventurous Strategy (ARF)</option>" & _
							"<option value=""annuityCautiousStrat"">Cautious Strategy(Annuity)</option>" & _
							"<option value=""annuityBalancedStrat"">Balanced Strategy(Annuity)</option>" & _
							"<option value=""annuityAdventureStrat"">Adventurous  Strategy (Annuity)</option>" & _
						"</select>" & _
"</div>" & _
"</div><hr>" & _
"<div class=""row"">" & _
	"<div class=""large-8 large-offset-4 columns"">" & _
		"<a href=""#results""><input id=""showResults"" onclick=""output();"" class=""button supplementary radius"" name=""commit"" value=""Show Fund Selection"" type=""submit""></a>" & _
	"</div>" & _
"</div>" & _
"</div>" & _
"<div id=""results"">" & _
"</div>" & _
"<a href=""#logo"">Back to top</a>" & _
"</div>" & _
"<div class=""large-12 small-12 columns"">" & _
	"<div class=""container subFooter"">" & _
		"<div id=""footer"" class=""row"">" & _
			"<div class=""large-6 small-12 columns"">" & _
			"<div class=""large-6 small-12 columns"">" & _
			"</div>" & _
			"</div>" & _
			"<div class=""large-6 small-12 columns"">" & _
			"<div class=""large-6 small-12 columns"">" & _
"</div>" & _
"<div class=""large-6 small-12 columns"">" & _
"</div>" & _
"</div>" & _
"</div>" & _
"</div><!-- Footer sub section -->" & _
"<div class=""container subFooterText"">" & _
"<div class=""row large-12 small-12 columns"">" & _
"</div>" & _
"</div>" & _
	"<p>&nbsp;</p>" & _
"<script src=""https://www.bline.ie/secureWeb/uploadedFiles/retail/js/iq.jquery.latest.min.js""></script>" & _
"<script type=""text/javascript"" src=""/secureWeb/uploadedFiles/bline/templates/js/ifg-lifestyling.js""></script>" & _
"<script type=""text/javascript""><!--" & _
"var _gaq = _gaq || [];" & _
"_gaq.push(['_setAccount', 'UA-16369698-9']);" & _
"_gaq.push(['_trackPageview']);" & _
"(function() {" & _
"var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;" & _
"ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';" & _
"var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);" & _
"})();" & _
"//-->" & _
"</script>" & _
"</body></html>")
End If
%>
