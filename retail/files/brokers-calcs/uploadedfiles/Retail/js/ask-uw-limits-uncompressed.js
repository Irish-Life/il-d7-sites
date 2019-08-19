var errorMessages;var errors;var result;var type;var data;var ageRange=-1;function calcIPCover()
{errorMessages=new Array();requirementsCalculate('iP');showResultsAndErrors();}
function showResultsAndErrors()
{errorMessages=eliminateDuplicates(errorMessages);if(ageRange!=-1)
{showResults(result);}
showErrors();}
function calcLifeIllnessCover()
{$('#lifeCoverResult').addClass('hidden');$('#illnessResult').addClass('hidden');$('#lifeCoverError').addClass('hidden');$('#illnessError').addClass('hidden');var illnessSelected=false;var illnessType;var error=false;errorMessages=new Array();if(isNumeric($('#illnessAmount').val())&&parseInt($('#illnessAmount').val())>0)
{illnessSelected=true;type="illness";if($('#independent').attr("checked"))
{illnessType='I';}
else if($('#accelerated').attr("checked"))
{illnessType='A';if(parseInt($('#lifeCoverAmount').val())<parseInt($('#illnessAmount').val()))
{errorMessages.push('Accelerated SIC Amount cannot exceed Life Cover Amount');error=true;}}
else
{errorMessages.push('If choosing Specified Illness Cover, select Independent or Accelerated');error=true;}}
if(!error)
{if(illnessSelected)
{$('#illnessAge').val($('#lifeCoverAge').val());if(illnessType=='A')
{type="illness";requirementsCalculate(type);var illnessResult=result;if(ageRange!=-1&&isNumeric($('#lifeCoverAmount').val()))
{type='lifeCover';requirementsCalculate(type);if(result<illnessResult)
{type='illness';requirementsCalculate(type);}}}
else
{type='illness';requirementsCalculate(type);var illnessResult=result;if(ageRange!=-1&&isNumeric($('#lifeCoverAmount').val()))
{$('#lifeCoverAmount').val(parseInt($('#lifeCoverAmount').val())+
parseInt($('#illnessAmount').val()));type='lifeCover';requirementsCalculate(type);if(result<illnessResult)
{type='illness';requirementsCalculate(type);}
$('#lifeCoverAmount').val(parseInt($('#lifeCoverAmount').val())-
parseInt($('#illnessAmount').val()));}}}
else
{type='lifeCover';requirementsCalculate(type);}}
showResultsAndErrors();}
function requirementsCalculate(covertype)
{type=covertype;formReset(type);age=$('#'+type+'Age').val();amount=$('#'+type+'Amount').val();if(age!=""&&amount!="")
{try
{errors=eval(type+"Errors");for(ck=0;ck<errors.length;ck++)
{if(errors[ck].minAge!=null)
{if(age>=errors[ck].minAge&&age<=errors[ck].maxAge)
{errorMessages.push(errors[ck].errorMessage);}}
if(errors[ck].minValue!=null)
{if(amount>=errors[ck].minValue&&amount<=errors[ck].maxValue)
{errorMessages.push(errors[ck].errorMessage);}}}
ages=eval(type+"Ages");amounts=eval(type+"Amounts");results=eval(type+"Results");data=eval("requirements");ageRange=-1;for(ci=0;ci<ages.length;ci++)
{if(age>=ages[ci][0]&&age<=ages[ci][1])
{ageRange=ci;}}
if(ageRange!=-1)
{amountRange=-1;for(ai=0;ai<amounts.length;ai++)
{if(amount>=amounts[ai][0]&&amount<=amounts[ai][1])
{amountRange=ai;}}
if(amountRange==-1){throw(exception);}
result=results[ageRange][amountRange]-1;}}
catch(e)
{log(" # e = "+e);}}}
function showResults(results)
{log('Results div: '+type+'Results');$('#'+type+'Results').html("");resultsText="";log('got result');for(ri=0;ri<data[result].length;ri++)
{resultsText+="<div>"+data[result][ri]+"</div>";}
for(cl=0;cl<errors.length;cl++)
{if(errors[cl].medical!=null&&errors[cl].medical==true)
{if(resultsText.indexOf("Medical")!=-1)
{errorMessages.push(errors[cl].errorMessage);}}}
$('#'+type+'Result').removeClass('hidden');$('#'+type+'Results').html(resultsText+"<br /><br />");}
function isNumeric(input)
{return(input-0)==input&&input.length>0;}
function showErrors()
{var errorHTML='';if(errorMessages.length!=0)
{$('#'+type+"Error").removeClass('hidden');for(ei=0;ei<errorMessages.length;ei++)
{errorHTML+=(errorMessages[ei]+'<br />');}}
$('#'+type+'ErrorText').html(errorHTML);}
function eliminateDuplicates(arr){var i,len=arr.length,out=[],obj={};log('array size '+arr.length);for(i=0;i<len;i++){obj[arr[i]]=0;}
for(i in obj){out.push(i);}
log('array size after de-dup '+out.length);return out;}
function formReset(type)
{$('#'+type+"Result").addClass('hidden');$('#'+type+"Results").html("");$('#'+type+"Error").addClass('hidden');$('#'+type+'ErrorText').html("");}
var numberKeys=[35,36,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,9,13,17,116];var ctrlPressed;function validateNumbers(e,element,includePoint)
{number=false;evt=e||window.event;var keynum=evt.which||evt.keyCode;if(keynum==17){ctrlPressed=true;}
if(ctrlPressed){return true;}
var keysArrays=numberKeys;if(includePoint)
{keysArrays.push(190);keysArrays.push(110);}
for(vi=0;vi<keysArrays.length;vi++)
{if(keynum==keysArrays[vi])
{number=true;break;}}
return number;}
function validateUp(e)
{evt=e||window.event;var keynum=evt.which||evt.keyCode;if(keynum==17){ctrlPressed=false;}}
function tabChange(id)
{var i=-1;while(document.getElementById('tab'+(++i))){try{document.getElementById('tab'+i).className='';}catch(e){}
try{document.getElementById('tabContent'+i).style.display='none';}catch(e){}}
try{document.getElementById('tab'+id).className='selected';}catch(e){}
try{document.getElementById('tabContent'+id).style.display='';}catch(e){}}
var consoleCounter=0;function log(message){try{console.log(consoleCounter+++"\t"+message);return this;}catch(e){try{if(document.getElementById("consoleDiv")!=null)
document.getElementById("consoleDiv").innerHTML+=(consoleCounter+++"      "+message+"<br />");}catch(e){}}}
var lifeCoverErrors=[{minAge:0,maxAge:17,errorMessage:"Minimum age not reached"},{minAge:75,maxAge:77,errorMessage:"These requirements apply to cover effected through Life Term Cover only <br />Maximum age for Life Mortgage Cover exceeded"},{minAge:78,maxAge:99,errorMessage:"Maximum age exceeded"},{minValue:1000000,maxValue:10000000,errorMessage:"Please see our <a href='/ask_underwriting/financial_underwriting.html' >Financial Underwriting section</a><br />"},{medical:true,errorMessage:"Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"}];var illnessErrors=[{minAge:0,maxAge:17,errorMessage:"Minimum age not reached"},{minAge:56,maxAge:60,errorMessage:"Available for mortgage protection and term assurance only<br />"},{minAge:61,maxAge:99,errorMessage:"Maximum age exceeded"},{minValue:300000,maxValue:1000000,errorMessage:"Please see our <a href='/ask_underwriting/financial_underwriting.html' >Financial Underwriting section</a><br />"},{medical:true,errorMessage:"Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"}];var iPErrors=[{minAge:0,maxAge:17,errorMessage:"Minimum age not reached"},{minAge:56,maxAge:99,errorMessage:"Maximum age exceeded"},{minValue:80001,maxValue:250000,errorMessage:"HIV Test required for amounts > €80,000<br />"},{minValue:250001,maxValue:10000000,errorMessage:"Income protection not available for amounts > €250,000"},{medical:true,errorMessage:"Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"},{minValue:80000,maxValue:250000,errorMessage:"You will be required to provide evidence of earnings including: P60, copies of most recent payslips or a  statement from your accountant.<br />"}]
var iPResults=[
[1,1,1,1,1,5,5,8,12,16,20,23],
[1,1,1,4,4,7,7,10,12,20,20,23],
[1,1,4,4,7,7,9,10,18,20,20,23],
[1,2,2,7,7,9,9,10,18,20,20,23]];

var iPAges=[[0,40],[41,45],[46,50],[51,55]];var iPAmounts=[[0,15000],[15001,20000],[20001,30000],[30001,35000],[35001,40000],[40001,50000],[50001,60000],[60001,80000],[80001,100000],[100001,150000],[150001,250000],[250001,100000000]];
var lifeCoverAges=[[18,35],[36,40],[41,45],[46,50],[51,55],[56,60],[61,65],[66,70],[71,77]];
var lifeCoverAmounts=[
[1,5000],[5001,20000],[20001,40000],[40001,100000],[100001,125000],[125001,150000],[150001,250000],
[250001,275000],[275001,300000],[300001,325000],[325001,400000],[400001,450000],[450001,500000],
[500001,550000],[550001,600000],[600001,675000],[675001,750000],[750001,850000],[850001,1000000],
[1000001,1500000],[1500001,2000000],[2000001,3000000],[3000001,4000000],[4000001,10000000]];

var lifeCoverResults=[
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 6,11,11,20,21],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 6,11,12,20,21],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 7, 7, 7, 8,12,12,20,21],
[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 7, 7, 7, 7, 7, 7, 8,12,12,20,21],
[ 1, 1, 1, 1, 1, 1, 1, 4, 7, 7, 7, 7, 7, 8, 8, 8, 8,10,10,10,18,18,20,21],
[ 1, 1, 1, 1, 4, 4, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, 8,10,10,10,18,18,20,21],
[ 1, 1, 1, 4, 7, 7, 7, 8, 8,10,10,10,10,15,15,15,15,15,15,18,18,20,22,23],
[ 1, 1, 4, 7, 7, 7, 7, 8,10,10,10,10,10,15,15,15,15,15,15,18,18,22,22,23],
[ 1, 2, 7, 7, 8, 8,15,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23]];
/*
  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
*/
var illnessAges=[[0,35],[36,40],[41,45],[46,50],[51,55],[56,60]];var illnessAmounts=[[0,50000],[50001,100000],[100001,150000],[150001,200000],[200001,225000],[225001,275000],[275001,300000],[300001,425000],[425001,450000],[450001,500000],[500001,575000],[575001,650000],[650001,750000],[750001,1275000],[1275001,1000000000]];
var illnessResults=[[1,1,1,1,1,1,1,1,1,1,1,5,5,21,21],[1,1,1,1,1,1,1,1,1,5,5,5,15,21,21],[1,1,1,1,1,1,1,4,4,4,15,15,15,21,21],[1,1,1,1,4,4,4,4,17,17,17,17,17,21,21],[1,1,4,4,4,7,15,15,17,17,17,17,17,21,21],[1,4,4,7,8,8,15,17,17,17,19,19,19,21,21]];

var requirements=[
/*1*/["None"],
/*2*/["PMA"],
/*3*/["Mini Nurse Screen"],
/*4*/["Nurse Screen"],
/*5*/["Nurse Screen or Medical Exam at the Medicentre for all Dublin based clients"],
/*6*/["Medical"],
/*7*/["PMA","Nurse Screen or Medical Exam at the Medicentre for all Dublin based clients"],
/*8*/["PMA","Medical Exam"],
/*9*/["PMA","Nurse Screen or Medical Exam at the Medicentre for all Dublin based clients","Fasting Blood lipids"],
/*10*/["PMA","Medical","Fasting Blood Lipids"],
/*11*/["PMA","Medical","HIV"],
/*12*/["PMA","Medical","HIV","Fasting Blood Lipids"],
/*13*/["PMA","Medical","Full Blood Profile"],
/*14*/["PMA","Medical","Full Blood Profile*","HIV"],
/*15*/["PMA","Medical","Resting ECG","Fasting Blood Lipids"],
/*16*/["PMA","Medical","Resting ECG","Fasting Blood Lipids","HIV"],
/*17*/["PMA","Medical","ExECG","Fasting Blood Lipids"],
/*18*/["PMA","Medical","ExECG","Fasting Blood Lipids","HIV"],
/*19*/["PMA","Medical","ExECG","Full Blood Profile"],
/*20*/["PMA","Medical","ExECG","Full Blood Profile*","HIV"],
/*21*/["Discuss with Large Case Team on 704 1888"],
/*22*/["Please contact our underwriting team on 01 704 1888 to discuss requirements"],
/*23*/["Cover not available"]];