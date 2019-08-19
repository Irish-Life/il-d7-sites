
if (document.getElementById('lifeCoverAge').getAttribute('type') != 'text')
{
var min = 61,
    max = 77,
    select = document.getElementById('lifeCoverAge');

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = "Age: "+i;
    select.appendChild(opt);
	//<option value="18">Age: 18</option>
}
}
function calcIPCover(){errorMessages=new Array;requirementsCalculate("iP");showResultsAndErrors()}function showResultsAndErrors(){errorMessages=eliminateDuplicates(errorMessages);if(ageRange!=-1){showResults(result)}showErrors()}function calcLifeIllnessCover(){$("#lifeCoverResult").addClass("hidden");$("#illnessResult").addClass("hidden");$("#lifeCoverError").addClass("hidden");$("#illnessError").addClass("hidden");var a=false;var b;var c=false;errorMessages=new Array;if(isNumeric($("#illnessAmount").val())&&parseInt($("#illnessAmount").val())>0){a=true;type="illness";if($("#independent").attr("checked")){b="I"}else if($("#accelerated").attr("checked")){b="A";if(parseInt($("#lifeCoverAmount").val())<parseInt($("#illnessAmount").val())){errorMessages.push("Accelerated SIC Amount cannot exceed Life Cover Amount");c=true}}else{errorMessages.push("If choosing Specified Illness Cover, select Independent or Accelerated");c=true}}if(!c){if(a){$("#illnessAge").val($("#lifeCoverAge").val());if(b=="A"){type="illness";requirementsCalculate(type);var d=result;if(ageRange!=-1&&isNumeric($("#lifeCoverAmount").val())){type="lifeCover";requirementsCalculate(type);if(result<d){type="illness";requirementsCalculate(type)}}}else{type="illness";requirementsCalculate(type);var d=result;if(ageRange!=-1&&isNumeric($("#lifeCoverAmount").val())){$("#lifeCoverAmount").val(parseInt($("#lifeCoverAmount").val())+parseInt($("#illnessAmount").val()));type="lifeCover";requirementsCalculate(type);if(result<d){type="illness";requirementsCalculate(type)}$("#lifeCoverAmount").val(parseInt($("#lifeCoverAmount").val())-parseInt($("#illnessAmount").val()))}}}else{type="lifeCover";requirementsCalculate(type)}}showResultsAndErrors()}function requirementsCalculate(covertype){type=covertype;formReset(type);age=$("#"+type+"Age").val();amount=$("#"+type+"Amount").val();if(age!=""&&amount!=""){try{errors=eval(type+"Errors");for(ck=0;ck<errors.length;ck++){if(errors[ck].minAge!=null){if(age>=errors[ck].minAge&&age<=errors[ck].maxAge){errorMessages.push(errors[ck].errorMessage)}}if(errors[ck].minValue!=null){if(amount>=errors[ck].minValue&&amount<=errors[ck].maxValue){errorMessages.push(errors[ck].errorMessage)}}}ages=eval(type+"Ages");amounts=eval(type+"Amounts");results=eval(type+"Results");data=eval("requirements");ageRange=-1;for(ci=0;ci<ages.length;ci++){if(age>=ages[ci][0]&&age<=ages[ci][1]){ageRange=ci}}if(ageRange!=-1){amountRange=-1;for(ai=0;ai<amounts.length;ai++){if(amount>=amounts[ai][0]&&amount<=amounts[ai][1]){amountRange=ai}}if(amountRange==-1){throw exception}result=results[ageRange][amountRange]-1}}catch(e){log(" # e = "+e)}}}function showResults(a){log("Results div: "+type+"Results");$("#"+type+"Results").html("");resultsText="";log("got result");for(ri=0;ri<data[result].length;ri++){resultsText+="<div>"+data[result][ri]+"</div>"}for(cl=0;cl<errors.length;cl++){if(errors[cl].medical!=null&&errors[cl].medical==true){if(resultsText.indexOf("Medical")!=-1){errorMessages.push(errors[cl].errorMessage)}}}$("#"+type+"Result").removeClass("hidden");$("#"+type+"Results").html(resultsText+"<br /><br />")}function isNumeric(a){return a-0==a&&a.length>0}function showErrors(){var a="";if(errorMessages.length!=0){$("#"+type+"Error").removeClass("hidden");for(ei=0;ei<errorMessages.length;ei++){a+=errorMessages[ei]+"<br />"}}$("#"+type+"ErrorText").html(a)}function eliminateDuplicates(a){var b,c=a.length,d=[],e={};log("array size "+a.length);for(b=0;b<c;b++){e[a[b]]=0}for(b in e){d.push(b)}log("array size after de-dup "+d.length);return d}function formReset(a){$("#"+a+"Result").addClass("hidden");$("#"+a+"Results").html("");$("#"+a+"Error").addClass("hidden");$("#"+a+"ErrorText").html("")}function validateNumbers(a,b,c){number=false;evt=a||window.event;var d=evt.which||evt.keyCode;if(d==17){ctrlPressed=true}if(ctrlPressed){return true}var e=numberKeys;if(c){e.push(190);e.push(110)}for(vi=0;vi<e.length;vi++){if(d==e[vi]){number=true;break}}return number}function validateUp(a){evt=a||window.event;var b=evt.which||evt.keyCode;if(b==17){ctrlPressed=false}}function tabChange(a){var b=-1;while(document.getElementById("tab"+ ++b)){try{document.getElementById("tab"+b).className=""}catch(c){}try{document.getElementById("tabContent"+b).style.display="none"}catch(c){}}try{document.getElementById("tab"+a).className="selected"}catch(c){}try{document.getElementById("tabContent"+a).style.display=""}catch(c){}}function log(a){try{console.log(consoleCounter++ +"	"+a);return this}catch(b){try{if(document.getElementById("consoleDiv")!=null)document.getElementById("consoleDiv").innerHTML+=consoleCounter++ +"      "+a+"<br />"}catch(b){}}}var errorMessages;var errors;var result;var type;var data;var ageRange=-1;

var numberKeys=[35,36,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,9,13,17,116];var ctrlPressed;var consoleCounter=0;

var lifeCoverErrors=[{minAge:0,maxAge:17,errorMessage:"Minimum age not reached"},{minAge:75,maxAge:77,errorMessage:"These requirements apply to cover effected through Life Term Cover only <br />Maximum age for Life Mortgage Cover exceeded"},{minAge:78,maxAge:99,errorMessage:"Maximum age exceeded"},{minValue:1e6,maxValue:1e7,errorMessage:"Please see our <a href='/ask_underwriting/financial_underwriting.html' >Financial Underwriting section</a><br />"},{medical:true,errorMessage:"Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"}];

var illnessErrors=[{minAge:0,maxAge:17,errorMessage:"Minimum age not reached"},{minAge:56,maxAge:60,errorMessage:"Available for mortgage protection and term assurance only<br />"},{minAge:61,maxAge:99,errorMessage:"Maximum age exceeded"},{minValue:3e5,maxValue:1e6,errorMessage:"Please see our <a href='/ask_underwriting/financial_underwriting.html' >Financial Underwriting section</a><br />"},{medical:true,errorMessage:"Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"}];var iPErrors=[{minAge:0,maxAge:17,errorMessage:"Minimum age not reached"},{minAge:56,maxAge:99,errorMessage:"Maximum age exceeded"},{minValue:80001,maxValue:25e4,errorMessage:"HIV Test required for amounts > €80,000<br />"},{minValue:250001,maxValue:1e7,errorMessage:"Income protection not available for amounts > €250,000"},{medical:true,errorMessage:"Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"},{minValue:8e4,maxValue:25e4,errorMessage:"You will be required to provide evidence of earnings including: P60, copies of most recent payslips or a  statement from your accountant.<br />"}];


var iPResults=[[1,1,1,1,1,5,5,9,15,18,22,25],[1,1,1,4,4,8,8,11,14,22,22,25],[1,1,4,4,8,8,10,11,20,22,22,25],[1,2,2,8,8,10,10,11,20,22,22,25]];
var iPAges=[[0,40],[41,45],[46,50],[51,55]];

var iPAmounts=[[0,15e3],[15001,2e4],[20001,3e4],[30001,35e3],[35001,4e4],[40001,5e4],[50001,6e4],[60001,8e4],[80001,1e5],[100001,15e4],[150001,25e4],[250001,1e8]];

var lifeCoverAges=[[18,35],[36,40],[41,45],[46,50],[51,55],[56,60],[61,65],[66,70],[71,77]];

var lifeCoverAmounts=[
[1,5e3],//1
[5001,2e4],//2
[20001,4e4],//3
[40001,1e5],//4
[100001,125e3],//5
[125001,15e4],//6
[150001,25e4],//7
[250001,275e3],//8
[275001,3e5],//9
[300001,325e3],//10
[325001,4e5],//11
[400001,45e4],//12
[450001,5e5],//13
[500001,55e4],//14
[550001,6e5],//15
[600001,675e3],//16
[675001,75e4],//17
[750001,85e4],//18
[850001,1e6],//19
[1000001,15e5],//20
[1500001,2e6],//21
[2000001,3e6],//22
[3000001,4e6],//23
[4000001,1e7]];//24

var lifeCoverResults=[
  [1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 6, 7, 7,26,23], //18
  [1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 6, 7,13,26,23], //36
  [1,1,1,1,1,1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 8, 8, 8, 9,14,14,27,23], //41
  [1,1,1,1,1,1, 1, 1, 1, 1, 4, 4, 4, 8, 8, 8, 8, 8, 8, 9,14,14,22,23],//46
  [1,1,1,1,1,1, 1, 4, 8, 8, 8, 8, 8, 9, 9, 9, 9,11,11,11,28,28,22,23],//51
  [1,1,1,1,4,4, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9,11,11,11,28,28,22,23],//56
  [1,1,1,4,8,8, 8, 9, 9,11,11,11,11,17,17,17,17,17,17,17,20,22,24,25],//61
  [1,1,4,8,8,8, 8, 9,11,11,11,11,11,17,17,17,17,17,17,17,20,24,24,25],//66
  [1,2,8,8,9,9,17,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25]];//71
// 1 2 3 4 5 6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
var illnessAges=[
[0,35],//1
[36,40],//2
[41,45],//3
[46,50],//4
[51,55],//5
[56,60]];//6

var illnessAmounts=[
[0,5e4],//1
[50001,1e5],//2
[100001,15e4],//3
[150001,2e5],//4
[200001,225e3],//5
[225001,275e3],//6
[275001,3e5],//7
[300001,425e3],//8
[425001,45e4],//9
[450001,5e5],//10
[500001,575e3],//11
[575001,65e4],//12
[650001,75e4],//13
[750001,1275e3],//14
[1275001,1e9]];//15

var illnessResults=[
  [1,1,1,1,1,1, 1, 1, 1, 1, 1, 5, 5,11,21], //18
  [1,1,1,1,1,1, 1, 1, 1, 5, 5, 5,17,17,22], //36
  [1,1,1,1,1,1, 1, 4, 4, 4,17,17,17,21,21], //41
  [1,1,1,1,4,4, 4, 4,19,19,19,19,19,19,19], //46
  [1,1,4,4,4,8,17,17,19,19,19,19,19,19,19], //51
  [1,4,4,8,9,9,17,19,19,19,21,21,21,21,21]]; //56
// 1 2 3 4 5 6  7  8  9 10 11 12 13 14 15
var requirements=[
["None"],//1
["PMA"],//2
["Mini Nurse Screen"],//3
["Nurse Screen"],//4
["Nurse Screen or Medical Exam at the Medicentre for all Dublin based clients"],//5
["Medical"],//6
["Medical","HIV"],//7
["PMA","Nurse Screen or Medical Exam at the Medicentre for all Dublin based clients"],//8
["PMA","Medical Exam"],//9
["PMA","Nurse Screen or Medical Exam at the Medicentre for all Dublin based clients","Fasting Blood lipids"],//10
["PMA","Medical","Fasting Blood Lipids"],//11
["PMA","Medical","HIV"],//12
["Medical","HIV","Fasting Blood Lipids"],//13
["PMA","Medical","HIV","Fasting Blood Lipids"],//14
["PMA","Medical","Full Blood Profile"],//15
["PMA","Medical","Full Blood Profile*","HIV"],//16
["PMA","Medical","Resting ECG","Fasting Blood Lipids"],//17
["PMA","Medical","Resting ECG","Fasting Blood Lipids","HIV"],//18
["PMA","Medical","ExECG","Fasting Blood Lipids"],//19
["PMA","Medical","ExECG","Fasting Blood Lipids","HIV"],//20
["PMA","Medical","ExECG","Full Blood Profile"],//21
["PMA","Medical","ExECG","Full Blood Profile*","HIV"],//22
["Discuss with Large Case Team on 704 1888"],//23
["Please contact our underwriting team on 01 704 1888 to discuss requirements"],//24
["Cover not available"],//25
["Medical","HIV","Full Blood Profile"],//26
["Medical","HIV","Fasting Blood Profile"],//27
["PMA","Medical","Fasting Blood Lipids","HIV"],//28
[],//29
[],//30
[]]//31

