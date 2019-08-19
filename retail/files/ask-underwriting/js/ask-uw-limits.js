(function($) {
	$(document).ready(function() {
		
	//handle the tabs
    $('#tab0').click(function(){
        tabChange(0);
    });
    
    $('#tab1').click(function(){
        tabChange(1);
    });
    
    $('#calcIP').click(function(){
        calcIPCover();
    });
    
    $('#calcIllness').click(function(){
        calcLifeIllnessCover();
    });
    
    $('#occupationSelect').change(function() {
        selectChange();
    });
	
});

if ($('#lifeCoverAge').attr('type') != 'text')
{
var min = 61,
    max = 77,
    select = $('#lifeCoverAge');

for (var i = min; i<=max; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = "Age: "+i;
    select.append(opt);
	//<option value="18">Age: 18</option>
}
}

function calcIPCover(){
	result=-1;
    $("#iPResults").html("");
	$("#iPResult").addClass("hidden");
	$("#iPError").addClass("hidden");
	errorMessages=new Array;
	requirementsCalculate("iP");
	showResultsAndErrors()
	
}function showResultsAndErrors(){errorMessages=eliminateDuplicates(errorMessages);if(ageRange!=-1){showResults(result)}showErrors()}

function calcLifeIllnessCover() {
	result=-1;
    $("#lifeCoverResults").html("");
    $("#illnessResults").html("");
    $("#lifeCoverErrorText").html("");
    $("#illnessErrorText").html("");
	
    $("#lifeCoverResult").addClass("hidden");
    $("#illnessResult").addClass("hidden");
    $("#lifeCoverError").addClass("hidden");
    $("#illnessError").addClass("hidden");

    var a = false;
    var b;
    var c = false;
    errorMessages = new Array;
    if (isNumeric($("#illnessAmount").val()) && parseInt($("#illnessAmount").val()) > 0) {
        a = true;
        type = "illness";
        if (document.getElementById("independent").checked) {
            b = "I"
        } else if (document.getElementById("accelerated").checked) {
            b = "A";
            if (parseInt($("#lifeCoverAmount").val()) < parseInt($("#illnessAmount").val())) {
                errorMessages.push("Accelerated SIC Amount cannot exceed Life Cover Amount");
                c = true;
            }
        } else {
            errorMessages.push("If choosing Specified Illness Cover, select Independent or Accelerated");
            c = true;
        }
    }

    if (!c) {
        if (a) {
            $("#illnessAge").val($("#lifeCoverAge").val());
            if (b == "A") {
			//ASIC - do lookup on life and illness and pick highest
                type = "illness";
                requirementsCalculate(type);
                var d = result;
                if (ageRange != -1 && isNumeric($("#lifeCoverAmount").val())) {
                    type = "lifeCover";
                    requirementsCalculate(type);
                    if (result < d) {
                        type = "illness";
                        requirementsCalculate(type)
                    }
                }
            } else {
			//ISIC
			// - look up sic, look up life+sic and pick highest
			//
			//
                type = "illness";
                requirementsCalculate(type);
                var d = result;
                if (ageRange != -1 && isNumeric($("#lifeCoverAmount").val())) {
                    $("#lifeCoverAmount").val(parseInt($("#lifeCoverAmount").val()) + parseInt($("#illnessAmount").val()));
                    type = "lifeCover";
                    requirementsCalculate(type);
                    if (result < d) {
                        type = "illness";
                        requirementsCalculate(type)
                    }
                    $("#lifeCoverAmount").val(parseInt($("#lifeCoverAmount").val()) - parseInt($("#illnessAmount").val()))
                }
            }
        } else {
            type = "lifeCover";
            requirementsCalculate(type);
        }
    }
    showResultsAndErrors()
}

function requirementsCalculate(covertype) {
    type = covertype;
    formReset(type);
    age = $("#" + type + "Age").val();
    amount = $("#" + type + "Amount").val();
    if (age != "" && amount != "") {
        try {
            errors = eval(type + "Errors");
            
            for (ck = 0; ck < errors.length; ck++) {
                if (errors[ck].minAge != null) {
                    if (age >= errors[ck].minAge && age <= errors[ck].maxAge && errors[ck].errorMessage != null) {
                        errorMessages.push(errors[ck].errorMessage)
                    }
                }
                if (errors[ck].minValue != null) {
                    if (amount >= errors[ck].minValue && amount <= errors[ck].maxValue && errors[ck].errorMessage != null) {
                        errorMessages.push(errors[ck].errorMessage)
                    }
                }
            }
            ages = eval(type + "Ages");
            amounts = eval(type + "Amounts");
            results = eval(type + "Results");
            data = eval("requirements");
            ageRange = -1;
            for (ci = 0; ci < ages.length; ci++) {
                if (age >= ages[ci][0] && age <= ages[ci][1]) {
                    ageRange = ci
                }
            }

            if (ageRange != -1) {
                amountRange = -1;
                for (ai = 0; ai < amounts.length; ai++) {
                    if (amount >= amounts[ai][0] && amount <= amounts[ai][1]) {
                        amountRange = ai						
                    }
                }
                if (amountRange == -1) {
                    //throw exception
                }
                else 
                {
                  result = results[amountRange][ageRange] - 1
                }
            }
        } catch (e) {
            //log(" # e = " + e)
        }
    }
}

function showResults() {
	resultsText = "";
	var lifeCoverExists = (isNumeric($("#lifeCoverAmount").val()) && $("#lifeCoverAmount").val() > 0);
	var hivAdded = false;
	//console.log('result '+result);
	//console.log('type '+type);
	if (result >= 0)
	{
		$("#" + type + "Results").html("");		
		for (ri = 0; ri < data[result].length; ri++) {
			
			//console.log('data['+result+']['+ri+'] '+data[result][ri]);
			
			resultsText += "<div>" + data[result][ri] + "</div>"
			if (data[result][ri] == 'HIV')
			{
				hivAdded =true;
			}
		}			
	}
	for (cl = 0; cl < errors.length; cl++) {
	if (errors[cl].nurse != null && errors[cl].nurse == true) {
		if (resultsText.indexOf("Nurse") != -1) {
			errorMessages.push(errors[cl].errorMessage)
		}
	}
	if (errors[cl].medical != null && errors[cl].medical == true) {
		if (resultsText.indexOf("Medical") != -1) {
			errorMessages.push(errors[cl].errorMessage)
		}
	}
	if (!hivAdded && errors[cl].requirement != null && lifeCoverExists && $("#lifeCoverAmount").val() > 3000000)
	{
		resultsText += "<div>HIV</div>";
	}
	/*
	if (!hivAdded && errors[cl].requirement != null && lifeCoverExists && $("#lifeCoverAmount").val() > 1500000)
	{
		resultsText += "<div>HIV</div>";
	}
	*/
	
	//console.log('resultsText '+resultsText);
}

$("#" + type + "Result").removeClass("hidden");
		$("#" + type + "Results").html(resultsText + "<br /><br />")

}

function isNumeric(a){return a-0==a&&a.length>0}

function showErrors(){var a="";if(errorMessages.length!=0){$("#"+type+"Error").removeClass("hidden");for(ei=0;ei<errorMessages.length;ei++){
a+=errorMessages[ei]+"<br />"}

}$("#"+type+"ErrorText").html(a)}

function eliminateDuplicates(a){var b,c=a.length,d=[],e={};for(b=0;b<c;b++){e[a[b]]=0}for(b in e){d.push(b)}return d}

function formReset(a){$("#"+a+"Result").addClass("hidden");$("#"+a+"Results").html("");$("#"+a+"Error").addClass("hidden");$("#"+a+"ErrorText").html("")}

function validateNumbers(a,b,c){number=false;evt=a||window.event;var d=evt.which||evt.keyCode;if(d==17){ctrlPressed=true}if(ctrlPressed){return true}var e=numberKeys;if(c){e.push(190);e.push(110)}for(vi=0;vi<e.length;vi++){if(d==e[vi]){number=true;break}}return number}

function validateUp(a){evt=a||window.event;var b=evt.which||evt.keyCode;if(b==17){ctrlPressed=false}}

function tabChange(a){var b=-1;while(document.getElementById("tab"+ ++b)){try{document.getElementById("tab"+b).className=""}catch(c){}try{document.getElementById("tabContent"+b).style.display="none"}catch(c){}}try{document.getElementById("tab"+a).className="selected"}catch(c){}try{document.getElementById("tabContent"+a).style.display=""}catch(c){}}

function log(a){try{console.log(consoleCounter++ +"	"+a);return this}catch(b){try{if(document.getElementById("consoleDiv")!=null)document.getElementById("consoleDiv").innerHTML+=consoleCounter++ +"      "+a+"<br />"}catch(b){}}}

var errorMessages;
var errors;
var result;
var type;
var data;
var ageRange=-1;

var numberKeys=[35,36,37,38,39,40,46,48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105,8,9,13,17,116];var ctrlPressed;var consoleCounter=0;

var lifeCoverErrors = [{
    minAge: 0,
    maxAge: 17,
    errorMessage: "Minimum age not reached"
}, {
    minAge: 75,
    maxAge: 83,
    errorMessage: "These requirements apply to cover effected through Life Term Cover only. <br />Maximum age for Life Mortgage Cover exceeded"
}, {
    minAge: 84,
    maxAge: 99,
    errorMessage: "Maximum Expiry Age Exceeded"
}, {
    minValue: 1e6,
    maxValue: 1e7,
    errorMessage: "Please see our <a href='/sites/retail/files/ask-underwriting/financial_underwriting.html' >Financial Underwriting section</a><br />"
}, {
    medical: true,
    errorMessage: "A Cotinine test will be requested for all declared non-smokers on our independent exams.<br/>"
}, {
    nurse: true,
    errorMessage: "For all Dublin based customers a medical exam at the <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> may be requested instead.<br/>"
}, {
    minValue: 3000001,
    maxValue: 4000000,
    errorMessage: "HIV Test required for all lives > &euro;3,000,000<br />"
}, {
    minValue: 1500001,
    maxValue: 9999999999,
    requirement: "HIV"
}
/*
{
    minValue: 1500001,
    maxValue: 4000000,
    errorMessage: "HIV Test required for all lives > &euro;1,500,000<br />"
},
*/];

var illnessErrors = [{
    minAge: 0,
    maxAge: 17,
    errorMessage: "Minimum age not reached"
}, {
    minAge: 56,
    maxAge: 65,
    errorMessage: "Available for mortgage protection and term assurance only<br />"
}, {
    minAge: 66,
    maxAge: 99,
    errorMessage: "Maximum age exceeded"
}, {
    minValue: 3e5,
    maxValue: 1e6,
    errorMessage: "Please see our <a href='/sites/retail/files/ask-underwriting/financial_underwriting.html' >Financial Underwriting section</a><br />"
}, {
    medical: true,
    errorMessage: "A Cotinine test will be requested for all declared non-smokers on our independent exams.<br/>"
},{
    medical: true,
    errorMessage: "Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"
},
/*
{
    minValue: 1500001,
    maxValue: 9999999999,
    requirement: "HIV"
},
*/
{
    minValue: 3000001,
    maxValue: 9999999999,
    requirement: "HIV"
}];
var iPErrors = [{
    minAge: 0,
    maxAge: 17,
    errorMessage: "Minimum age not reached"
}, {
    minAge: 56,
    maxAge: 99,
    errorMessage: "Maximum age exceeded"	
}, {
    minValue: 100001,
    maxValue: 25e4,
    errorMessage: "HIV Test required for amounts > &euro;100,000<br />"
}, {
    minValue: 250001,
    maxValue: 1e7,
    errorMessage: "You have exceeded the maximum income protection amount"
}, {
    medical: true,
    errorMessage: "Please see our <a target='_blank' href='/uploadedFiles/bline/Ask_Underwriting/Tools/Medicentre_flyer.pdf' >Medicentre</a> for all Dublin based medicals<br />"
}, {
    minValue: 100001,
    maxValue: 25e4,
    errorMessage: "You will be required to provide evidence of earnings including: P60, copies of most recent payslips or a  statement from your accountant.<br />"
}];


var iPAges=[[0,40],[41,45],[46,50],[51,55]];

var iPAmounts=[[0,15e3],[15001,2e4],[20001,3e4],[30001,35e3],[35001,4e4],[40001,5e4],[50001,6e4],[60001,8e4],[80001,1e5],[100001,250000]];

var lifeCoverAges=[[18,35],[36,40],[41,45],[46,50],[51,55],[56,60],[61,65],[66,70],[71,84]];

var lifeCoverAmounts=[
[1,25000],//1
[25001,50000],//2
[50001,100000],//3
[100001,125e3],//4
[125001,15e4],//5
[150001,25e4],//6
[250001,3e5],//7
[300001,325e3],//8
[325001,4e5],//9
[400001,45e4],//10
[450001,5e5],//11
[500001,55e4],//12
[550001,6e5],//13
[600001,675e3],//14
[675001,75e4],//15
[750001,85e4],//16
[850001,1e6],//17
[1000001,15e5],//18
[1500001,2e6],//19
[2000001,3e6],//20
[3000001,4e6],//21
[4000001,1e7]];//22

//  1  2  3  4  5  6  7  8  9 
var illnessAges=[
[0,35],//1
[36,40],//2
[41,45],//3
[46,50],//4
[51,55],//5
[56,60],//6
[61,65]];//7

var illnessAmounts=[
[0,25000],//1
[25001,50000],//2
[50001,100000],//3
[100001,150000],//4
[150001,200000],//5
[200001,250000],//6
[250001,300000],//7
[300001,400000],//8
[400001,450000],//9
[450001,550000],//10
[550001,650000],//11
[650001,750000],//12
[750001,1275000],//13
[1275001,9999999]];//14
  

  
var lifeCoverResults=[
  [ 1, 1, 1, 1, 1, 1, 1, 1, 5], //25k      1
  [ 1, 1, 1, 1, 1, 1, 1, 5, 7], //50k      2
  [ 1, 1, 1, 1, 1, 1, 3, 7, 7], //100k     3
  [ 1, 1, 1, 1, 1, 1, 7, 7, 7], //125k     4
  [ 1, 1, 1, 1, 1, 1, 7, 7, 7], //150k     5
  [ 1, 1, 1, 1, 1, 3, 7, 7, 7], //250k     6
  [ 1, 1, 1, 1, 3, 7, 7, 7,19], //300k     7 changed
  [ 1, 1, 1, 1, 3, 7, 7, 7,19], //325k     8 changed
  [ 1, 1, 1, 1, 3, 7, 7, 7,19], //400k     9 changed
  [ 1, 1, 1, 1, 3, 7, 7, 7,19], //450k    10 changed
  [ 1, 1, 1, 1, 3, 7, 7, 7,23], //500k    11 changed
  [ 1, 1, 1, 3, 3, 7,18,19,23], //550k    12 changed
  [ 1, 1, 1, 3, 3, 7,18,19,23], //600k    13 changed
  [ 1, 1, 3, 3, 7, 7,18,19,23], //675k    14 changed
  [ 1, 1, 3, 3, 7, 7,18,19,23], //750k    15 changed
  [ 1, 3, 3, 7,10,10,18,19,23], //850k    16 changed
  [ 1, 3, 3, 7,10,10,18,19,22], //1000k   17 changed
  [ 3, 3, 3, 7,18,18,18,19,25], //1500k   18 changed
  [ 3, 3,10,10,18,18,25,25,25], //2000k   19 changed
  [ 3,11,18,18,18,25,25,25,25], //3000k   20 changed
  [17,17,21,28,28,28,28,28,28], //4000k   21 changed
  [30,30,30,30,30,30,30,30,30], //>4000k  22 changed
// 35 40 45 50 55 60 65 70 71+ 
  ];

  var illnessResults=[
  [ 1, 1, 1, 1, 1, 1, 1], //25k      1 changed
  [ 1, 1, 1, 1, 1, 1, 5], //50k      2 changed
  [ 1, 1, 1, 1, 1, 3, 5], //100k     3 changed
  [ 1, 1, 1, 1, 1, 3, 7], //150k     4 changed
  [ 1, 1, 1, 1, 3, 7, 7], //200k     5 changed
  [ 1, 1, 1, 1, 3, 7,15], //250k     6 changed
  [ 1, 1, 1, 3,15,15,24], //300k     7 changed
  [ 1, 1, 3, 3,15,24,24], //400k     8 changed
  [ 1, 1, 3,24,24,24,24], //450k     9 changed
  [ 1, 3, 3,24,25,25,25], //550k    10 changed
  [ 3, 3,15,24,25,25,25], //650k    11 changed
  [ 3,15,15,24,25,25,25], //750k    12 changed
  [15,15,25,25,25,25,29], //1275k   13 changed
  [25,25,25,25,25,25,29] //>1275k   14 changed
// 35 40 45 50 55 60 65  
  ];
  
  
var iPResults=[
  [ 1, 1, 1, 1],//15k
  [ 1, 1, 1, 1],//20k
  [ 1, 1, 1, 3],//30k
  [ 1, 1, 3, 4],//35k
  [ 1, 1, 4, 4],//40k
  [ 3, 3, 4, 8],//50k
  [ 3, 4, 4,10],//60k
  [ 4, 4, 9,18],//80k changed
  [18,18,24,24],//100k changed
  [20,28,28,28]//250k changed
// 40 45 50 55
];

var requirements=[
  ["None"],//1
  ["Mini Nurse Screen"],//2
  ["Nurse Screen"],//3
  ["Medical Exam (for all Dublin based customers) or Nurse Screen"], //4
  ["Private Medical Attendants Report"],//5
  ["Medical Exam"],//6
  ["Private Medical Attendants Report","Nurse Screen"],//7
  ["Private Medical Attendants Report","Medical Exam (for all Dublin based customers) or Nurse Screen"],//8
  ["Private Medical Attendants Report","Medical Exam"],//9
  ["Private Medical Attendants Report","Medical Exam(for all Dublin based customers) or Nurse Screen","Fasting Blood Lipids"],//10
  ["Nurse Screen", "Fasting Blood Lipids"],//11 
  ["Nurse Screen","HIV"],//12
  ["Medical Exam","HIV"],//13
  ["Private Medical Attendants Report","Medical Exam","HIV"],//14
  ["Private Medical Attendants Report","Nurse Screen","Fasting Blood Lipids"], //15
  ["Medical Exam","HIV","Fasting Blood Lipids"],//16
  ["Medical Exam","HIV","Fasting Blood Profile"],//17
  ["Private Medical Attendants Report","Medical Exam","Fasting Blood Lipids"],//18
  ["Private Medical Attendants Report","Medical Exam","Fasting Blood Profile"],//19
  ["Private Medical Attendants Report","Medical Exam","HIV","Fasting Blood Lipids"],//20
  ["Private Medical Attendants Report","Medical Exam","HIV","Fasting Blood Profile"],//21
  ["Private Medical Attendants Report","Medical Exam","Fasting Blood Lipids","Resting ECG"],//22
  ["Private Medical Attendants Report","Medical Exam","Fasting Blood Profile","Resting ECG"],//23
  ["Private Medical Attendants Report","Medical Exam","Fasting Blood Lipids","Exercise ECG"], //24
  ["Private Medical Attendants Report","Medical Exam","Fasting Blood Profile","Exercise ECG"], //25
  ["Private Medical Attendants Report","Medical Exam","HIV","Fasting Blood Lipids","Resting ECG"],//26
  ["Private Medical Attendants Report","Medical Exam","HIV","Fasting Blood Lipids","Exercise ECG"],//27
  ["Private Medical Attendants Report","Medical Exam","HIV","Fasting Blood Profile","Exercise ECG"],//28
  ["Discuss with Underwriting"],//29
  ["Discuss with Large Case Team"],//30

]


})(jQuery);
