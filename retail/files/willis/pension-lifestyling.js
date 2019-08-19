var consoleCounter = 0;
function log(message){ 
	try {
		console.log(consoleCounter++ + "\t" + message);
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}


//JSON Data

	//Annuity Cautious
var cautiousAnnuityFundCharge=[1.01,1.01,1.01,1.01,1.01,1.01,1.0055,1.001,0.9965,0.992,0.9875,0.9875,0.9875,0.9875,0.9875];
	
var cautiousAnnuity = {
    "0": [
'Global Cash Fund:20','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Conservative:40'
    ],
    "1": [
'Global Cash Fund:20','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Conservative:40'
    ],
    "2": [
'Global Cash Fund:20','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Conservative:40'
    ],
    "3": [
'Global Cash Fund:20','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Conservative:40'
    ],
    "4": [
'Global Cash Fund:20','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Conservative:40'
    ],
    "5": [
'Global Cash Fund:20','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','NT UK Equity Index Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Conservative:40'
    ],
    "6": [
'Global Cash Fund:16','NT UK Equity Index Fund:0.3','NT UK Equity Index Fund:3','NT UK Equity Index Fund:3.4','NT UK Equity Index Fund:1.3','Indexed Emerging Market Equity Fund:2','Indexed European Gilts Fund:18.5','Indexed Inflation Linked Bond Fund:18.5','TAP – Conservative:37'
    ],
    "7": [
'Global Cash Fund:12','NT UK Equity Index Fund:0.6','NT UK Equity Index Fund:6','NT UK Equity Index Fund:6.8','NT UK Equity Index Fund:2.6','Indexed Emerging Market Equity Fund:4','Indexed European Gilts Fund:17','Indexed Inflation Linked Bond Fund:17','TAP – Conservative:34'
    ],
    "8": [
'Global Cash Fund:8','NT UK Equity Index Fund:0.9','NT UK Equity Index Fund:9','NT UK Equity Index Fund:10.2','NT UK Equity Index Fund:3.9','Indexed Emerging Market Equity Fund:6','Indexed European Gilts Fund:15.5','Indexed Inflation Linked Bond Fund:15.5','TAP – Conservative:31'
    ],
    "9": [
'Global Cash Fund:4','NT UK Equity Index Fund:1.2','NT UK Equity Index Fund:12','NT UK Equity Index Fund:13.6','NT UK Equity Index Fund:5.2','Indexed Emerging Market Equity Fund:8','Indexed European Gilts Fund:14','Indexed Inflation Linked Bond Fund:14','TAP – Conservative:28'
    ],
    "10": [
'Global Cash Fund:0','NT UK Equity Index Fund:1.5','NT UK Equity Index Fund:15','NT UK Equity Index Fund:17','NT UK Equity Index Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
    "11": [
'Global Cash Fund:0','NT UK Equity Index Fund:1.5','NT UK Equity Index Fund:15','NT UK Equity Index Fund:17','NT UK Equity Index Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
    "12": [
'Global Cash Fund:0','NT UK Equity Index Fund:1.5','NT UK Equity Index Fund:15','NT UK Equity Index Fund:17','NT UK Equity Index Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
    "13": [
'Global Cash Fund:0','NT UK Equity Index Fund:1.5','NT UK Equity Index Fund:15','NT UK Equity Index Fund:17','NT UK Equity Index Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
    "14": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:15','Indexed European Equity Fund:17','Indexed Pacific Equity Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ]
}

	//Annuity Balanced

var balancedAnnuityFundCharge=[1.01,1.0064,1.0025,0.99875,0.995,0.99125,0.986,0.98075,0.9755,0.97025,0.965,0.965,0.965,0.9575,0.9575];	
	
var balancedAnnuity = {
    "0": [
'Global Cash Fund:20','Indexed UK Equity Fund:0','Indexed North American Equity Fund:0','Indexed European Equity Fund:0','Indexed Pacific Equity Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Balanced         :40'
    ],
    "1": [
'Global Cash Fund:16','Indexed UK Equity Fund:0','Indexed North American Equity Fund:2.64','Indexed European Equity Fund:3.26','Indexed Pacific Equity Fund:1.14','Indexed Emerging Market Equity Fund:1.76','Indexed European Gilts Fund:18.8','Indexed Inflation Linked Bond Fund:18.8','TAP – Balanced         :37.6'
    ],
    "2": [
'Global Cash Fund:12','Indexed UK Equity Fund:0.3','Indexed North American Equity Fund:5.1','Indexed European Equity Fund:6.66','Indexed Pacific Equity Fund:2.34','Indexed Emerging Market Equity Fund:3.6','Indexed European Gilts Fund:17.5','Indexed Inflation Linked Bond Fund:17.5','TAP – Balanced         :35'
    ],
    "3": [
'Global Cash Fund:8','Indexed UK Equity Fund:0.45','Indexed North American Equity Fund:7.65','Indexed European Equity Fund:9.99','Indexed Pacific Equity Fund:3.51','Indexed Emerging Market Equity Fund:5.4','Indexed European Gilts Fund:16.25','Indexed Inflation Linked Bond Fund:16.25','TAP – Balanced         :32.5'
    ],
    "4": [
'Global Cash Fund:4','Indexed UK Equity Fund:0.6','Indexed North American Equity Fund:10.2','Indexed European Equity Fund:13.32','Indexed Pacific Equity Fund:4.68','Indexed Emerging Market Equity Fund:7.2','Indexed European Gilts Fund:15','Indexed Inflation Linked Bond Fund:15','TAP – Balanced         :30'
    ],
    "5": [
'Global Cash Fund:0','Indexed UK Equity Fund:0.75','Indexed North American Equity Fund:12.75','Indexed European Equity Fund:16.65','Indexed Pacific Equity Fund:5.85','Indexed Emerging Market Equity Fund:9','Indexed European Gilts Fund:13.75','Indexed Inflation Linked Bond Fund:13.75','TAP – Balanced         :27.5'
    ],
    "6": [
'Global Cash Fund:0','Indexed UK Equity Fund:0.87','Indexed North American Equity Fund:14.73','Indexed European Equity Fund:19.24','Indexed Pacific Equity Fund:6.76','Indexed Emerging Market Equity Fund:10.4','Indexed European Gilts Fund:12','Indexed Inflation Linked Bond Fund:12','TAP – Balanced         :24'
    ],
    "7": [
'Global Cash Fund:0','Indexed UK Equity Fund:0.98','Indexed North American Equity Fund:16.72','Indexed European Equity Fund:21.83','Indexed Pacific Equity Fund:7.67','Indexed Emerging Market Equity Fund:11.8','Indexed European Gilts Fund:10.25','Indexed Inflation Linked Bond Fund:10.25','TAP – Balanced         :20.5'
    ],
    "8": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.1','Indexed North American Equity Fund:18.7','Indexed European Equity Fund:24.42','Indexed Pacific Equity Fund:8.58','Indexed Emerging Market Equity Fund:13.2','Indexed European Gilts Fund:8.5','Indexed Inflation Linked Bond Fund:8.5','TAP – Balanced         :17'
    ],
    "9": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.22','Indexed North American Equity Fund:20.68','Indexed European Equity Fund:27.01','Indexed Pacific Equity Fund:9.49','Indexed Emerging Market Equity Fund:14.6','Indexed European Gilts Fund:6.75','Indexed Inflation Linked Bond Fund:6.75','TAP – Balanced         :13.5'
    ],
    "10": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.33','Indexed North American Equity Fund:22.67','Indexed European Equity Fund:29.6','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Balanced         :10'
    ],
    "11": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.33','Indexed North American Equity Fund:22.67','Indexed European Equity Fund:29.6','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Balanced         :10'
    ],
    "12": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.33','Indexed North American Equity Fund:22.67','Indexed European Equity Fund:29.6','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Balanced         :10'
    ],
    "13": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:25.5','Indexed European Equity Fund:33.3','Indexed Pacific Equity Fund:11.7','Indexed Emerging Market Equity Fund:18','Indexed European Gilts Fund:2.5','Indexed Inflation Linked Bond Fund:2.5','TAP – Balanced         :5'
    ],
    "14": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:25.5','Indexed European Equity Fund:33.3','Indexed Pacific Equity Fund:11.7','Indexed Emerging Market Equity Fund:18','Indexed European Gilts Fund:2.5','Indexed Inflation Linked Bond Fund:2.5','TAP – Balanced         :5'
    ]
}

	//Annuity Adventure
var adventureAnnuityFundCharge=[1.01,1.0025,0.995,0.9875,0.98,0.9725,0.965,0.96125,0.96125,0.9575,0.95375,0.95,0.95,0.95,0.95];
	
var adventureAnnuity = {
    "0": [
'Global Cash Fund:20','Indexed UK Equity Fund:0','Indexed North American Equity Fund:0','Indexed European Equity Fund:0','Indexed Pacific Equity Fund:0','Indexed Emerging Market Equity Fund:0','Indexed European Gilts Fund:20','Indexed Inflation Linked Bond Fund:20','TAP – Experienced:40'
    ],
    "1": [
'Global Cash Fund:15','Indexed UK Equity Fund:0.2','Indexed North American Equity Fund:4.3','Indexed European Equity Fund:5.55','Indexed Pacific Equity Fund:1.95','Indexed Emerging Market Equity Fund:3','Indexed European Gilts Fund:17.5','Indexed Inflation Linked Bond Fund:17.5','TAP – Experienced:35'
    ],
    "2": [
'Global Cash Fund:10','Indexed UK Equity Fund:0.45','Indexed North American Equity Fund:8.4','Indexed European Equity Fund:11.25','Indexed Pacific Equity Fund:3.9','Indexed Emerging Market Equity Fund:6','Indexed European Gilts Fund:15','Indexed Inflation Linked Bond Fund:15','TAP – Experienced:30'
    ],
    "3": [
'Global Cash Fund:5','Indexed UK Equity Fund:0.67','Indexed North American Equity Fund:12.7','Indexed European Equity Fund:16.78','Indexed Pacific Equity Fund:5.85','Indexed Emerging Market Equity Fund:9','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Experienced:25'
    ],
    "4": [
'Global Cash Fund:0','Indexed UK Equity Fund:0.9','Indexed North American Equity Fund:16.9','Indexed European Equity Fund:22.4','Indexed Pacific Equity Fund:7.8','Indexed Emerging Market Equity Fund:12','Indexed European Gilts Fund:10','Indexed Inflation Linked Bond Fund:10','TAP – Experienced:20'
    ],
    "5": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.05','Indexed North American Equity Fund:19.7','Indexed European Equity Fund:26.15','Indexed Pacific Equity Fund:9.1','Indexed Emerging Market Equity Fund:14','Indexed European Gilts Fund:7.5','Indexed Inflation Linked Bond Fund:7.5','TAP – Experienced:15'
    ],
    "6": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.2','Indexed North American Equity Fund:22.5','Indexed European Equity Fund:29.9','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Experienced:10'
    ],
    "7": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.27','Indexed North American Equity Fund:23.9','Indexed European Equity Fund:31.78','Indexed Pacific Equity Fund:11.05','Indexed Emerging Market Equity Fund:17','Indexed European Gilts Fund:3.75','Indexed Inflation Linked Bond Fund:3.75','TAP – Experienced:7.5'
    ],
    "8": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.27','Indexed North American Equity Fund:23.9','Indexed European Equity Fund:31.78','Indexed Pacific Equity Fund:11.05','Indexed Emerging Market Equity Fund:17','Indexed European Gilts Fund:3.75','Indexed Inflation Linked Bond Fund:3.75','TAP – Experienced:7.5'
    ],
    "9": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.35','Indexed North American Equity Fund:25.3','Indexed European Equity Fund:33.65','Indexed Pacific Equity Fund:11.7','Indexed Emerging Market Equity Fund:18','Indexed European Gilts Fund:2.5','Indexed Inflation Linked Bond Fund:2.5','TAP – Experienced:5'
    ],
    "10": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.43','Indexed North American Equity Fund:26.8','Indexed European Equity Fund:35.42','Indexed Pacific Equity Fund:12.35','Indexed Emerging Market Equity Fund:19','Indexed European Gilts Fund:1.25','Indexed Inflation Linked Bond Fund:1.25','TAP – Experienced:2.5'
    ],
    "11": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ],
    "12": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ],
    "13": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ],
    "14": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ]
}

	//ARF Cautious
var cautiousARFFundCharge=[1.0397,1.03865,1.0376,1.0364,1.03535,1.0343,1.0334,1.0322,1.0187,1.0052,0.9875,0.9875,0.9875,0.9875,0.9875];	
var cautiousARF = {
    "0": [
'Global Cash Fund:25','Indexed UK Equity Fund:0.46','Indexed North American Equity Fund:4.56','Indexed European Equity Fund:5.17','Indexed Pacific Equity Fund:1.97','Indexed Emerging Market Equity Fund:3.04','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:59.8'
    ],
    "1": [
'Global Cash Fund:22.2','Indexed UK Equity Fund:0.56','Indexed North American Equity Fund:5.61','Indexed European Equity Fund:6.36','Indexed Pacific Equity Fund:2.43','Indexed Emerging Market Equity Fund:3.74','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:59.1'
    ],
    "2": [
'Global Cash Fund:19.4','Indexed UK Equity Fund:0.67','Indexed North American Equity Fund:6.65','Indexed European Equity Fund:7.55','Indexed Pacific Equity Fund:2.89','Indexed Emerging Market Equity Fund:4.44','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:58.4'
    ],
    "3": [
'Global Cash Fund:16.7','Indexed UK Equity Fund:0.77','Indexed North American Equity Fund:7.71','Indexed European Equity Fund:8.74','Indexed Pacific Equity Fund:3.34','Indexed Emerging Market Equity Fund:5.14','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:57.6'
    ],
    "4": [
'Global Cash Fund:13.9','Indexed UK Equity Fund:0.88','Indexed North American Equity Fund:8.76','Indexed European Equity Fund:9.92','Indexed Pacific Equity Fund:3.8','Indexed Emerging Market Equity Fund:5.84','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:56.9'
    ],
    "5": [
'Global Cash Fund:11.1','Indexed UK Equity Fund:0.98','Indexed North American Equity Fund:9.81','Indexed European Equity Fund:11.12','Indexed Pacific Equity Fund:4.25','Indexed Emerging Market Equity Fund:6.54','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:56.2'
    ],
    "6": [
'Global Cash Fund:8.3','Indexed UK Equity Fund:1.09','Indexed North American Equity Fund:10.83','Indexed European Equity Fund:12.27','Indexed Pacific Equity Fund:4.69','Indexed Emerging Market Equity Fund:7.22','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:55.6'
    ],
    "7": [
'Global Cash Fund:5.6','Indexed UK Equity Fund:1.19','Indexed North American Equity Fund:11.88','Indexed European Equity Fund:13.46','Indexed Pacific Equity Fund:5.15','Indexed Emerging Market Equity Fund:7.92','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Conservative:54.8'
    ],
    "8": [
'Global Cash Fund:2.8','Indexed UK Equity Fund:1.29','Indexed North American Equity Fund:12.9','Indexed European Equity Fund:14.62','Indexed Pacific Equity Fund:5.59','Indexed Emerging Market Equity Fund:8.6','Indexed European Gilts Fund:4.2','Indexed Inflation Linked Bond Fund:4.2','TAP – Conservative:45.8'
    ],
    "9": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.4','Indexed North American Equity Fund:13.98','Indexed European Equity Fund:15.84','Indexed Pacific Equity Fund:6.06','Indexed Emerging Market Equity Fund:9.32','Indexed European Gilts Fund:8.3','Indexed Inflation Linked Bond Fund:8.3','TAP – Conservative:36.8'
    ],
    "10": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:15','Indexed European Equity Fund:17','Indexed Pacific Equity Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
	"11": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:15','Indexed European Equity Fund:17','Indexed Pacific Equity Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
	"12": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:15','Indexed European Equity Fund:17','Indexed Pacific Equity Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
	"13": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:15','Indexed European Equity Fund:17','Indexed Pacific Equity Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ],
	"14": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:15','Indexed European Equity Fund:17','Indexed Pacific Equity Fund:6.5','Indexed Emerging Market Equity Fund:10','Indexed European Gilts Fund:12.5','Indexed Inflation Linked Bond Fund:12.5','TAP – Conservative:25'
    ]
}

	//ARF Balanced
var balancedARFFundCharge=[1.01645,1.0145,1.01255,1.0103,1.00835,1.00625,1.0043,1.00235,0.98975,0.9776,0.965,0.965,0.965,0.9575,0.9575];	
var balancedARF = {
    "0": [
'Global Cash Fund:25','Indexed UK Equity Fund:0.51','Indexed North American Equity Fund:8.7','Indexed European Equity Fund:11.36','Indexed Pacific Equity Fund:3.99','Indexed Emerging Market Equity Fund:6.14','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :44.3'
    ],
    "1": [
'Global Cash Fund:21.4','Indexed UK Equity Fund:0.59','Indexed North American Equity Fund:10.09','Indexed European Equity Fund:13.17','Indexed Pacific Equity Fund:4.63','Indexed Emerging Market Equity Fund:7.12','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :43'
    ],
    "2": [
'Global Cash Fund:17.9','Indexed UK Equity Fund:0.67','Indexed North American Equity Fund:11.45','Indexed European Equity Fund:14.95','Indexed Pacific Equity Fund:5.25','Indexed Emerging Market Equity Fund:8.08','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :41.7'
    ],
    "3": [
'Global Cash Fund:14.3','Indexed UK Equity Fund:0.76','Indexed North American Equity Fund:12.89','Indexed European Equity Fund:16.84','Indexed Pacific Equity Fund:5.91','Indexed Emerging Market Equity Fund:9.1','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :40.2'
    ],
    "4": [
'Global Cash Fund:10.7','Indexed UK Equity Fund:0.84','Indexed North American Equity Fund:14.28','Indexed European Equity Fund:18.65','Indexed Pacific Equity Fund:6.55','Indexed Emerging Market Equity Fund:10.08','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :38.9'
    ],
    "5": [
'Global Cash Fund:7.1','Indexed UK Equity Fund:0.92','Indexed North American Equity Fund:15.7','Indexed European Equity Fund:20.5','Indexed Pacific Equity Fund:7.2','Indexed Emerging Market Equity Fund:11.08','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :37.5'
    ],
    "6": [
'Global Cash Fund:3.6','Indexed UK Equity Fund:1','Indexed North American Equity Fund:17.06','Indexed European Equity Fund:22.27','Indexed Pacific Equity Fund:7.83','Indexed Emerging Market Equity Fund:12.04','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :36.2'
    ],
    "7": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.08','Indexed North American Equity Fund:18.45','Indexed European Equity Fund:24.09','Indexed Pacific Equity Fund:8.46','Indexed Emerging Market Equity Fund:13.02','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Balanced         :34.9'
    ],
    "8": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.17','Indexed North American Equity Fund:19.86','Indexed European Equity Fund:25.94','Indexed Pacific Equity Fund:9.11','Indexed Emerging Market Equity Fund:14.02','Indexed European Gilts Fund:1.7','Indexed Inflation Linked Bond Fund:1.7','TAP – Balanced         :26.5'
    ],
    "9": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.25','Indexed North American Equity Fund:21.25','Indexed European Equity Fund:27.75','Indexed Pacific Equity Fund:9.75','Indexed Emerging Market Equity Fund:15','Indexed European Gilts Fund:3.3','Indexed Inflation Linked Bond Fund:3.3','TAP – Balanced         :18.4'
    ],
    "10": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.33','Indexed North American Equity Fund:22.67','Indexed European Equity Fund:29.6','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Balanced         :10'
    ],
	"11": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.33','Indexed North American Equity Fund:22.67','Indexed European Equity Fund:29.6','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Balanced         :10'
    ],
	"12": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.33','Indexed North American Equity Fund:22.67','Indexed European Equity Fund:29.6','Indexed Pacific Equity Fund:10.4','Indexed Emerging Market Equity Fund:16','Indexed European Gilts Fund:5','Indexed Inflation Linked Bond Fund:5','TAP – Balanced         :10'
    ],
	"13": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:25.5','Indexed European Equity Fund:33.3','Indexed Pacific Equity Fund:11.7','Indexed Emerging Market Equity Fund:18','Indexed European Gilts Fund:2.5','Indexed Inflation Linked Bond Fund:2.5','TAP – Balanced         :5'
    ],
	"14": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:25.5','Indexed European Equity Fund:33.3','Indexed Pacific Equity Fund:11.7','Indexed Emerging Market Equity Fund:18','Indexed European Gilts Fund:2.5','Indexed Inflation Linked Bond Fund:2.5','TAP – Balanced         :5'
    ]
	
}

	//ARF Adventure
var adventureARFFundCharge=[0.995735,0.99365,0.991385,0.9893,0.9869,0.98465,0.9824,0.98015,0.9716,0.9626,0.95375,0.95,0.95,0.95,0.95];	
var adventureARF = {
    "0": [
'Global Cash Fund:25','Indexed UK Equity Fund:0.67','Indexed North American Equity Fund:12.46','Indexed European Equity Fund:16.69','Indexed Pacific Equity Fund:5.79','Indexed Emerging Market Equity Fund:8.9','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:30.49'
    ],
    "1": [
'Global Cash Fund:21.4','Indexed UK Equity Fund:0.74','Indexed North American Equity Fund:13.86','Indexed European Equity Fund:18.56','Indexed Pacific Equity Fund:6.44','Indexed Emerging Market Equity Fund:9.9','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:29.1'
    ],
    "2": [
'Global Cash Fund:17.9','Indexed UK Equity Fund:0.82','Indexed North American Equity Fund:15.26','Indexed European Equity Fund:20.44','Indexed Pacific Equity Fund:7.09','Indexed Emerging Market Equity Fund:10.9','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:27.59'
    ],
    "3": [
'Global Cash Fund:14.3','Indexed UK Equity Fund:0.89','Indexed North American Equity Fund:16.66','Indexed European Equity Fund:22.31','Indexed Pacific Equity Fund:7.74','Indexed Emerging Market Equity Fund:11.9','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:26.2'
    ],
    "4": [
'Global Cash Fund:10.7','Indexed UK Equity Fund:0.97','Indexed North American Equity Fund:18.12','Indexed European Equity Fund:24.26','Indexed Pacific Equity Fund:8.41','Indexed Emerging Market Equity Fund:12.94','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:24.6'
    ],
    "5": [
'Global Cash Fund:7.1','Indexed UK Equity Fund:1.05','Indexed North American Equity Fund:19.54','Indexed European Equity Fund:26.18','Indexed Pacific Equity Fund:9.07','Indexed Emerging Market Equity Fund:13.96','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:23.1'
    ],
    "6": [
'Global Cash Fund:3.6','Indexed UK Equity Fund:1.12','Indexed North American Equity Fund:20.95','Indexed European Equity Fund:28.05','Indexed Pacific Equity Fund:9.72','Indexed Emerging Market Equity Fund:14.96','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:21.6'
    ],
    "7": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.2','Indexed North American Equity Fund:22.37','Indexed European Equity Fund:29.96','Indexed Pacific Equity Fund:10.39','Indexed Emerging Market Equity Fund:15.98','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:20.1'
    ],
    "8": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.27','Indexed North American Equity Fund:23.74','Indexed European Equity Fund:31.8','Indexed Pacific Equity Fund:11.03','Indexed Emerging Market Equity Fund:16.96','Indexed European Gilts Fund:0.4','Indexed Inflation Linked Bond Fund:0.4','TAP – Experienced:14.4'
    ],
    "9": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.35','Indexed North American Equity Fund:25.2','Indexed European Equity Fund:33.75','Indexed Pacific Equity Fund:11.7','Indexed Emerging Market Equity Fund:18','Indexed European Gilts Fund:0.8','Indexed Inflation Linked Bond Fund:0.8','TAP – Experienced:8.4'
    ],
    "10": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.43','Indexed North American Equity Fund:26.8','Indexed European Equity Fund:35.42','Indexed Pacific Equity Fund:12.35','Indexed Emerging Market Equity Fund:19','Indexed European Gilts Fund:1.25','Indexed Inflation Linked Bond Fund:1.25','TAP – Experienced:2.5'
    ],
	"11": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ],
	"12": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ],
	"13": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ],
	"14": [
'Global Cash Fund:0','Indexed UK Equity Fund:1.5','Indexed North American Equity Fund:28','Indexed European Equity Fund:37.5','Indexed Pacific Equity Fund:13','Indexed Emerging Market Equity Fund:20','Indexed European Gilts Fund:0','Indexed Inflation Linked Bond Fund:0','TAP – Experienced:0'
    ]
}

//Calculate age from date of birth field
function getAge(dateString) {

    var dates = dateString.split("/");
    var d = new Date();

    var userday = dates[0];
    var usermonth = dates[1];
    var useryear = dates[2];

    var curday = d.getDate();
    var curmonth = d.getMonth()+1;
    var curyear = d.getFullYear();

    var age = (curyear - useryear) + 1;

    if((curmonth < usermonth) || ( (curmonth == usermonth) && curday < userday   )){

        age--;

    }

    return age;
}






//Calculate Retirement Term
function retirementTerm(){
		var birthDay = $('#dob').val();
		var x, y, total;
		x = $('#retirementAge').val();
		log('retirement age ' + x);
		y = getAge(birthDay);
			total = x - y;
		log('term is ' + total);	
		
			return total;
		
}


//the only other code needed is the 
//code that assigns the selected styling strategy
//to the fundingStyle array.

//Check which funding style has been selected
var fundingStyle;
var charge;
function selectedOption(){
        var value;
		value = $('#fundStrategy').val();
        //alert(value);
		log('selected option is ' + value);
		if (value == 'annuityAdventureStrat')
		{
			fundingStyle=adventureAnnuity;
			charge=adventureAnnuityFundCharge;
		}
		else if (value == 'annuityBalancedStrat')
		{
			fundingStyle=balancedAnnuity;
			charge=balancedAnnuityFundCharge;
		}
		else if (value == 'annuityCautiousStrat')
		{
			fundingStyle=cautiousAnnuity;
			charge=cautiousAnnuityFundCharge;
		}
		else if (value == 'arfAdventureStrat')
		{
			fundingStyle=adventureARF;
			charge=adventureARFFundCharge;
		}
		else if (value == 'arfBalancedStrat')
		{
			fundingStyle=balancedARF;
			charge=balancedARFFundCharge;
		}
		else if (value == 'arfCautiousStrat')
		{
			fundingStyle=cautiousARF;
			charge=cautiousARFFundCharge;
		}
		else if (value == 0)
		{
			alert("Please select a Lifestyling Strategy");
		}
		return fundingStyle;
};

//function to get element in array to use
function elementInArray(){ 
	var element=0;
	var years = retirementTerm();
    if (years>=40){
		element= 14;
	}
	else if ((years<40) && (years>=30)){
		element= 13;
	}
	else if ((years<30) && (years>=20)){
		element= 12;
	}
	else if ((years<20) && (years>=15)){
		element= 11;
	}
	else if ((years<15) && (years>=10)){
		element =  10;
	}
	else 
	{
		element =  years;
	}
	log('element in array ' + element);
	return element;
};

//get todays date
function todaysDate(){
	var currentDate = new Date()
	var day = currentDate.getDate()
	var month = currentDate.getMonth() + 1
	var year = currentDate.getFullYear()
	return("<b>" + day + "/" + month + "/" + year + "</b>")
}

function output(){
	
	//check that name has been entered
	var checkName = $('#name').val();
	if (checkName==null || checkName=="")
		{
		alert("Please enter a name");
		return false;
		}
	
	//check that date of birth has been filled out
	var birthDay = $('#dob').val();
	/*if (birthDay==null || birthDay=="")
		{
		alert("Please enter a date of birth");
		return false;
		}
	*/	
	var validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity
	var returnval=false
	if (!validformat.test(birthDay))
	alert("Enter a valid date of birth.")
	/*
	else{ //Detailed check for valid date ranges
	var monthfield=birthDay.split("/")[0]
	var dayfield=birthDay.split("/")[1]
	var yearfield=birthDay.split("/")[2]
	var dayobj = new Date(yearfield, monthfield-1, dayfield)
	if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
	alert("Invalid Day, Month, or Year range detected. Please correct and submit again.")
	else
	returnval=true
	}
	if (returnval==false) input.select()
	return returnval
	*/
	

	var validInput = true;
	$('#results').html("");
	
	var retirement = $('#retirementAge').val();
	//check that retirement age has been entered
	if (retirement == 0)
		{
		alert("Please enter the retirement age");
		return false;
		}
	//check that retirement age > current age
	var current = getAge(birthDay);
		if (current > retirement){
			alert("Retirement age must be greater then current age");
			return false;
			}
	
			

	//if input is valid generate results
	
	if (validInput)
	{
	var fundingStyle = selectedOption(); //what option did we pick
	log('step 1 done');
	var arrayElement = elementInArray();
	var fundSplit = fundingStyle[arrayElement];//years to retirement
	var chargeSelected = charge[arrayElement];
	log('step 2 done');
	
	//generate tables
	
	var tempHTML 	= "<hr><div id='pie-container' style='width: 95%; margin-left: auto; margin-right: auto'>"
	tempHTML 	+= "<div>"
	tempHTML 	+= "<p>Date on which calculations based:&nbsp;"+ todaysDate() +"</p>";
	tempHTML 	+= "</div>"
	tempHTML 	+= "<div id='pie-list' style='float: left; padding-right: 20px'>"	
	tempHTML 	+= "<table>";
	tempHTML 		+= "<thead>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<th>Client Details</th>";
	tempHTML 		+= "<th></th>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "</thead>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<td>Name:</td>";
	tempHTML 		+= "<td>" + $('#name').val() + "</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<td>Date of Birth:</td>";
	tempHTML 		+= "<td>" + $('#dob').val() + "</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<td>Age next birthday:</td>";
	tempHTML 		+= "<td>" + current + "</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<td>Retirement Age:</td>";
	tempHTML 		+= "<td>" + $('#retirementAge').val() + "</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<td>Years left until retirement:</td>";
	tempHTML 		+= "<td>" + retirementTerm() + "</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<td>Lifestyling Strategy:</td>";
	tempHTML 		+= "<td>" + $('#fundStrategy option:selected').text(); + "</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "<tr style='display:none'>";
	tempHTML 		+= "<td>Fund Charge:</td>";
	tempHTML 		+= "<td>" + chargeSelected + "%</td>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "</table>";
	tempHTML 		+= "</ br>";
	tempHTML 	+= "</div>"
	
	tempHTML 	+= "<div id='pie-chart' style='float: left'>"
	tempHTML 		+= "<table>";
	tempHTML 		+= "<thead>";
	tempHTML 		+= "<tr>";
	tempHTML 		+= "<th>Fund</th>";
	tempHTML 		+= "<th>Percentage</th>";
	tempHTML 		+= "</tr>";
	tempHTML 		+= "</thead>";
	
	for (var i=0;i < fundSplit.length;i++)
	{	//loop through each fund 
	
		var fund = fundSplit[i].split(":");
		if (fund[1] > 0)
		tempHTML +="<tr><td>"+fund[0]+"</td><td>"+fund[1]+"%</td></tr>";
	}
	
	tempHTML 	+= "</table>";
	tempHTML 	+= "</div>"
	tempHTML 	+= "<div class='clear'></div>"
	tempHTML 	+= "<div class='row'>"
	tempHTML 	+= "<div class='large-8 large-offset-4 columns'>"
	tempHTML    += "<input id='print-button' type='button' class='button supplementary radius' value='Print results' onClick='window.print()'>"
	tempHTML 	+= "</div>"
	tempHTML 	+= "</div>"
	tempHTML 	+= "</div><hr>"
	log('html to output ' + tempHTML);
		$('#results').html(tempHTML);
	
	var position = $("#pageHeaderAnchor").position();
	scroll(0,position.top);
	
	}
	
};

$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html,body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});










