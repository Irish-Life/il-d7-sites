var url = 'https://www.irishlife.ie/eBusinessApps/Launch/Referral/Free/';
var refer= gup('refer');
var npa2014=gup('npa2014');
refer = $.trim(refer);
if (refer == '')
{
	refer='~';
}

refer = refer.toUpperCase();
var remainingIds=
'1058;1059;1060;1061;1062;1063;1064;3601;3605;360A;3612;3615;3617;3619;3621;3628;3629;3637;3641;3650;3654;3655;3657;3665;3668;3672;3673;3682;3686;3687;3689;3693;3694;3695;3801;3804;3805;380A;3819;3825;3828;3830;3831;3836;3838;3842;3846;3848;3850;3874;3877;3878;3880;3881;4216;4227;4288;4294;4706;4707;4708;4711;4713;4714;4719;4720;4721;4725;4726;4727;4728;4729;4733;4735;4736;4738;4739;4741;4742;4743;4747;4748;4750;4753;4755;4756;4757;4758;4759;4760;4761;4762;4763;4764;4766;4767;4768;4769;4772;4774;4777;4778;4779;4780;4782;4790;4791;4792;4793;4794;4795;4796;4797;4799;6007;6014;6021;6040;6042;6047;6048;6050;6053;6067;6070;6071;6075;6076;6077;6095;6106;6114;6117;6118;6121;6123;6125;6126;6130;6131;6132;6133;6134;6147;6148;6162;6179;6188;6198;4789;6208;6369;6401;6375;6373;6397;6309;6330;6379;6388;6391;6314;6364;6339;6363;6395;6361;6357;6346;6333;6384;6302;6318;6358;6317;6313;6332;6385;6338;6378;6321;6376;6359;6345;6343;6348;6382;6351;6328;6322;6381;63426354;6398;6400;6347;6360;6305;6320;6386;6362;6390;6337;6353;6303;6377;6307;6374;6310;6308;6399;6329;6393;6371;6389;6394;6372;6352;6340;6316;6324;6325;TS02;TS03;TS04;TS05;TS06;TS08;Z401;4785;4783;4786;Z402;TN71;VG93;E529;4517;RJ02;RK42;6207;6209';

var ploughingSellers=
'4025;4241;4206;4261;4228;4271;3880;3654;3601;3627;4218;4056;3848;4089;3619;4283;3655;4215;3825;3628;4294;';

remainingIds +=ploughingSellers;

var numPlacesLeft=99999;
$('#launchLink').removeClass('hidden');

if (refer !='')
{
	storeReferCookie(refer);
	url = url+refer;
}
log(url);

if (npa2014 == 'Y')
{
	localStorage['NPA2014'] = 'Y';
	localStorage['currentSeller']=refer;
}
else{
	localStorage.removeItem('NPA2014');
	localStorage.removeItem('currentSeller');
}

$('.launchFreeCover').click(function () {

	if (refer != '' && remainingIds.indexOf(refer) >=0 && numPlacesLeft > 0)
	{
		log('launching ' + url);
		window.location = url;		
	}
	else
	{
		alert("The Free Parent Life Insurance Offer is now closed!!!");
	}

	ga('send','event','Free Parent Cover', refer, 'Apply Now Button');

});
var values;
function storeReferCookie(referId)
{
	setCookie('FreeCover', referId, 1);
}

function remainingPlaces()
{
	$.get("/secure/numAvailable.jsp", function(data) {
		str = jQuery.trim(data);
		 values = str.split(';');
		 var sellerCode='';
		if (refer !='')
		{
			for (var i=0; i < values.length;i++)
			{				
				sellerCode = $.trim(values[i].split('=')[0]);
				if (refer == sellerCode)
				{
					numPlacesLeft=values[i].split('=')[1];
				}
			}
		}
		$('.freecoverRemain').html(numPlacesLeft);
		$('.freecoverRemain').digits();

	});
}

remainingPlaces();
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

window.onload=function(){if (refer != '' && remainingIds.indexOf(refer) >=0){}
else{
//	$('#limitedOffer').addClass('hidden');
}};