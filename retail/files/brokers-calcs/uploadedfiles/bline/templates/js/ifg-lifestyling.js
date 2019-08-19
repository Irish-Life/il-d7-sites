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
var cautiousAnnuityFundCharge=[0.99,0.99,0.99,0.99,0.99,0.99,1,1.01,1.02,1.03,1.03,1.03,1.03,1.03];
	
var cautiousAnnuity = {
    "0": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "1": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "2": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "3": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "4": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "5": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "6": [
        "NT UK Equity Index Fund : 0.3",
        "NT North America Equity Index Fund : 3",
        "NT Europe (ex UK) Equity Index Fund : 3.4",
        "NT Pacific (ex Japan) Equity Index Fund : 1.3",
        "NT Emerging Markets Index Fund : 2",
        "NT Euro Government Bond Index Fund : 37",
        "NT Euro Government Inflation Linked Index Fund : 37",
        "Stepping Stones Global Cash Fund : 16"
    ],
    "7": [
        "NT UK Equity Index Fund : 0.6",
        "NT North America Equity Index Fund : 6",
        "NT Europe (ex UK) Equity Index Fund : 6.8",
        "NT Pacific (ex Japan) Equity Index Fund : 2.6",
        "NT Emerging Markets Index Fund : 4",
        "NT Euro Government Bond Index Fund : 34",
        "NT Euro Government Inflation Linked Index Fund : 34",
        "Stepping Stones Global Cash Fund : 12"
    ],
    "8": [
        "NT UK Equity Index Fund : 0.9",
        "NT North America Equity Index Fund : 9",
        "NT Europe (ex UK) Equity Index Fund : 10.2",
        "NT Pacific (ex Japan) Equity Index Fund : 3.9",
        "NT Emerging Markets Index Fund : 6",
        "NT Euro Government Bond Index Fund : 31",
        "NT Euro Government Inflation Linked Index Fund : 31",
        "Stepping Stones Global Cash Fund : 8"
    ],
    "9": [
        "NT UK Equity Index Fund : 1.2",
        "NT North America Equity Index Fund : 12",
        "NT Europe (ex UK) Equity Index Fund : 13.6",
        "NT Pacific (ex Japan) Equity Index Fund : 5.2",
        "NT Emerging Markets Index Fund : 8",
        "NT Euro Government Bond Index Fund : 28",
        "NT Euro Government Inflation Linked Index Fund : 28",
        "Stepping Stones Global Cash Fund : 4"
    ],
    "10": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 15",
        "NT Europe (ex UK) Equity Index Fund : 17",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
    "11": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 15",
        "NT Europe (ex UK) Equity Index Fund : 17",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
    "12": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 15",
        "NT Europe (ex UK) Equity Index Fund : 17",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
    "13": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 15",
        "NT Europe (ex UK) Equity Index Fund : 17",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
    "14": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 15",
        "NT Europe (ex UK) Equity Index Fund : 17",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ]
}

	//Annuity Balanced

var balancedAnnuityFundCharge=[0.99,1,1.01,1.01,1.02,1.03,1.04,1.04,1.04,1.05,1.05,1.05,1.05,1.06];	
	
var balancedAnnuity = {
    "0": [
        "NT Euro Government Bond Index Fund : 40",
        "NT Euro Government Inflation Linked Index Fund : 40",
        "Stepping Stones Global Cash Fund : 20"
    ],
    "1": [
        "NT North America Equity Index Fund : 2.64",
        "NT Europe (ex UK) Equity Index Fund : 3.256",
        "NT Pacific (ex Japan) Equity Index Fund : 1.144",
        "NT Emerging Markets Index Fund : 1.76",
        "NT Euro Government Bond Index Fund : 37.6",
        "NT Euro Government Inflation Linked Index Fund : 37.6",
        "Stepping Stones Global Cash Fund : 16"
    ],
    "2": [
        "NT UK Equity Index Fund : 0.3",
        "NT North America Equity Index Fund : 5.1",
        "NT Europe (ex UK) Equity Index Fund : 6.66",
        "NT Pacific (ex Japan) Equity Index Fund : 2.34",
        "NT Emerging Markets Index Fund : 3.6",
        "NT Euro Government Bond Index Fund : 35",
        "NT Euro Government Inflation Linked Index Fund : 35",
        "Stepping Stones Global Cash Fund : 12"
    ],
    "3": [
        "NT UK Equity Index Fund : 0.45",
        "NT North America Equity Index Fund : 7.65",
        "NT Europe (ex UK) Equity Index Fund : 9.99",
        "NT Pacific (ex Japan) Equity Index Fund : 3.51",
        "NT Emerging Markets Index Fund : 5.4",
        "NT Euro Government Bond Index Fund : 32.5",
        "NT Euro Government Inflation Linked Index Fund : 32.5",
        "Stepping Stones Global Cash Fund : 8"
    ],
    "4": [
        "NT UK Equity Index Fund : 0.6",
        "NT North America Equity Index Fund : 10.2",
        "NT Europe (ex UK) Equity Index Fund : 13.32",
        "NT Pacific (ex Japan) Equity Index Fund : 4.68",
        "NT Emerging Markets Index Fund : 7.2",
        "NT Euro Government Bond Index Fund : 30",
        "NT Euro Government Inflation Linked Index Fund : 30",
        "Stepping Stones Global Cash Fund : 4"
    ],
    "5": [
        "NT UK Equity Index Fund : 0.75",
        "NT North America Equity Index Fund : 12.75",
        "NT Europe (ex UK) Equity Index Fund : 16.65",
        "NT Pacific (ex Japan) Equity Index Fund : 5.85",
        "NT Emerging Markets Index Fund : 9",
        "NT Euro Government Bond Index Fund : 27.5",
        "NT Euro Government Inflation Linked Index Fund : 27.5"
    ],
    "6": [
        "NT UK Equity Index Fund : 0.87",
        "NT North America Equity Index Fund : 14.73",
        "NT Europe (ex UK) Equity Index Fund : 19.24",
        "NT Pacific (ex Japan) Equity Index Fund : 6.76",
        "NT Emerging Markets Index Fund : 10.4",
        "NT Euro Government Bond Index Fund : 24",
        "NT Euro Government Inflation Linked Index Fund : 24",
    ],
    "7": [
        "NT UK Equity Index Fund : 0.98",
        "NT North America Equity Index Fund : 16.72",
        "NT Europe (ex UK) Equity Index Fund : 21.83",
        "NT Pacific (ex Japan) Equity Index Fund : 7.67",
        "NT Emerging Markets Index Fund : 11.8",
        "NT Euro Government Bond Index Fund : 20.5",
        "NT Euro Government Inflation Linked Index Fund : 20.5",
    ],
    "8": [
        "NT UK Equity Index Fund : 1.1",
        "NT North America Equity Index Fund : 18.7",
        "NT Europe (ex UK) Equity Index Fund : 24.42",
        "NT Pacific (ex Japan) Equity Index Fund : 8.58",
        "NT Emerging Markets Index Fund : 13.2",
        "NT Euro Government Bond Index Fund : 17",
        "NT Euro Government Inflation Linked Index Fund : 17"
    ],
    "9": [
        "NT UK Equity Index Fund : 1.22",
        "NT North America Equity Index Fund : 20.68",
        "NT Europe (ex UK) Equity Index Fund : 27.01",
        "NT Pacific (ex Japan) Equity Index Fund : 9.49",
        "NT Emerging Markets Index Fund : 14.6",
        "NT Euro Government Bond Index Fund : 13.5",
        "NT Euro Government Inflation Linked Index Fund : 13.5"
    ],
    "10": [
        "NT UK Equity Index Fund : 1.33",
        "NT North America Equity Index Fund : 22.67",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
    "11": [
        "NT UK Equity Index Fund : 1.33",
        "NT North America Equity Index Fund : 22.67",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
    "12": [
        "NT UK Equity Index Fund : 1.33",
        "NT North America Equity Index Fund : 22.67",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
    "13": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 25.5",
        "NT Europe (ex UK) Equity Index Fund : 33.3",
        "NT Pacific (ex Japan) Equity Index Fund : 11.7",
        "NT Emerging Markets Index Fund : 18",
        "NT Euro Government Bond Index Fund : 5",
        "NT Euro Government Inflation Linked Index Fund : 5"
    ],
    "14": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 25.5",
        "NT Europe (ex UK) Equity Index Fund : 33.3",
        "NT Pacific (ex Japan) Equity Index Fund : 11.7",
        "NT Emerging Markets Index Fund : 18",
        "NT Euro Government Bond Index Fund : 5",
        "NT Euro Government Inflation Linked Index Fund : 5"
    ]
}

	//Annuity Adventure
var adventureAnnuityFundCharge=[0.99,1,1.02,1.03,1.04,1.05,1.05,1.06,1.06,1.06,1.06,1.07,1.07,1.07];
	
var adventureAnnuity = {
    "0": [
        "NT Euro Government Bond Index Fund:40",
        "NT Euro Government Inflation Linked Index Fund:40",
        "Stepping Stones Global Cash Fund:20"
    ],
    "1": [
        "NT UK Equity Index Fund : 0.2",
        "NT North America Equity Index Fund : 4.3",
        "NT Europe (ex UK) Equity Index Fund : 5.55",
        "NT Pacific (ex Japan) Equity Index Fund : 1.95",
        "NT Emerging Markets Index Fund : 3",
        "NT Euro Government Bond Index Fund : 35",
        "NT Euro Government Inflation Linked Index Fund : 35",
        "Stepping Stones Global Cash Fund : 15"
    ],
    "2": [
        "NT UK Equity Index Fund : 0.45",
        "NT North America Equity Index Fund : 8.4",
        "NT Europe (ex UK) Equity Index Fund : 11.25",
        "NT Pacific (ex Japan) Equity Index Fund : 3.9",
        "NT Emerging Markets Index Fund : 6",
        "NT Euro Government Bond Index Fund : 30",
        "NT Euro Government Inflation Linked Index Fund : 30",
        "Stepping Stones Global Cash Fund : 10"
    ],
    "3": [
        "NT UK Equity Index Fund : 0.67",
        "NT North America Equity Index Fund : 12.7",
        "NT Europe (ex UK) Equity Index Fund : 16.78",
        "NT Pacific (ex Japan) Equity Index Fund : 5.85",
        "NT Emerging Markets Index Fund : 9",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25",
        "Stepping Stones Global Cash Fund : 5"
    ],
    "4": [
        "NT UK Equity Index Fund : 0.9",
        "NT North America Equity Index Fund : 16.9",
        "NT Europe (ex UK) Equity Index Fund : 22.4",
        "NT Pacific (ex Japan) Equity Index Fund : 7.8",
        "NT Emerging Markets Index Fund : 12",
        "NT Euro Government Bond Index Fund : 20",
        "NT Euro Government Inflation Linked Index Fund : 20"
    ],
    "5": [
        "NT UK Equity Index Fund : 1.05",
        "NT North America Equity Index Fund : 19.7",
        "NT Europe (ex UK) Equity Index Fund : 26.15",
        "NT Pacific (ex Japan) Equity Index Fund : 9.1",
        "NT Emerging Markets Index Fund : 14",
        "NT Euro Government Bond Index Fund : 15",
        "NT Euro Government Inflation Linked Index Fund : 15"
    ],
    "6": [
        "NT UK Equity Index Fund : 1.2",
        "NT North America Equity Index Fund : 22.5",
        "NT Europe (ex UK) Equity Index Fund : 29.9",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
    "7": [
        "NT UK Equity Index Fund : 1.27",
        "NT North America Equity Index Fund : 23.9",
        "NT Europe (ex UK) Equity Index Fund : 31.78",
        "NT Pacific (ex Japan) Equity Index Fund : 11.05",
        "NT Emerging Markets Index Fund : 17",
        "NT Euro Government Bond Index Fund : 7.5",
        "NT Euro Government Inflation Linked Index Fund : 7.5"
    ],
    "8": [
        "NT UK Equity Index Fund : 1.27",
        "NT North America Equity Index Fund : 23.9",
        "NT Europe (ex UK) Equity Index Fund : 31.78",
        "NT Pacific (ex Japan) Equity Index Fund : 11.05",
        "NT Emerging Markets Index Fund : 17",
        "NT Euro Government Bond Index Fund : 7.5",
        "NT Euro Government Inflation Linked Index Fund : 7.5"
    ],
    "9": [
        "NT UK Equity Index Fund : 1.35",
        "NT North America Equity Index Fund : 25.3",
        "NT Europe (ex UK) Equity Index Fund : 33.65",
        "NT Pacific (ex Japan) Equity Index Fund : 11.7",
        "NT Emerging Markets Index Fund : 18",
        "NT Euro Government Bond Index Fund : 5",
        "NT Euro Government Inflation Linked Index Fund : 5"
    ],
    "10": [
        "NT UK Equity Index Fund : 1.43",
        "NT North America Equity Index Fund : 26.8",
        "NT Europe (ex UK) Equity Index Fund : 35.42",
        "NT Pacific (ex Japan) Equity Index Fund : 12.35",
        "NT Emerging Markets Index Fund : 19",
        "NT Euro Government Bond Index Fund : 2.5",
        "NT Euro Government Inflation Linked Index Fund : 2.5"
    ],
    "11": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 28",
        "NT Europe (ex UK) Equity Index Fund : 37.5",
        "NT Pacific (ex Japan) Equity Index Fund : 13",
        "NT Emerging Markets Index Fund : 20"
    ],
    "12": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 28",
        "NT Europe (ex UK) Equity Index Fund : 37.5",
        "NT Pacific (ex Japan) Equity Index Fund : 13",
        "NT Emerging Markets Index Fund : 20"
    ],
    "13": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 28",
        "NT Europe (ex UK) Equity Index Fund : 37.5",
        "NT Pacific (ex Japan) Equity Index Fund : 13",
        "NT Emerging Markets Index Fund : 20"
    ],
    "14": [
        "NT UK Equity Index Fund : 1.5",
        "NT North America Equity Index Fund : 28",
        "NT Europe (ex UK) Equity Index Fund : 37.5",
        "NT Pacific (ex Japan) Equity Index Fund : 13",
        "NT Emerging Markets Index Fund : 20"
    ]
}

	//ARF Cautious
var cautiousARFFundCharge=[1,1,1.01,1.01,1.01,1.02,1.02,1.02,1.03,1.03,1.03,1.03,1.03,1.03];	
var cautiousARF = {
    "0": [
        "NT UK Equity Index Fund : 0.26",
        "NT North America Equity Index Fund : 4.3",
        "NT Europe (ex UK) Equity Index Fund : 5.62",
        "NT Pacific (ex Japan) Equity Index Fund : 1.98",
        "NT Emerging Markets Index Fund : 3.04",
        "NT Euro Government Bond Index Fund : 29.9",
        "NT Euro Government Inflation Linked Index Fund : 29.9",
        "Stepping Stones Global Cash Fund : 25"
    ],
    "1": [
        "NT UK Equity Index Fund : 0.32",
        "NT North America Equity Index Fund : 5.29",
        "NT Europe (ex UK) Equity Index Fund : 6.92",
        "NT Pacific (ex Japan) Equity Index Fund : 2.43",
        "NT Emerging Markets Index Fund : 3.74",
        "NT Euro Government Bond Index Fund : 29.55",
        "NT Euro Government Inflation Linked Index Fund : 29.55",
        "Stepping Stones Global Cash Fund : 22.2"
    ],
    "2": [
        "NT UK Equity Index Fund : 0.38",
        "NT North America Equity Index Fund : 6.28",
        "NT Europe (ex UK) Equity Index Fund : 8.21",
        "NT Pacific (ex Japan) Equity Index Fund : 2.89",
        "NT Emerging Markets Index Fund : 4.44",
        "NT Euro Government Bond Index Fund : 29.2",
        "NT Euro Government Inflation Linked Index Fund : 29.2",
        "Stepping Stones Global Cash Fund : 19.4"
    ],
    "3": [
        "NT UK Equity Index Fund : 0.44",
        "NT North America Equity Index Fund : 7.27",
        "NT Europe (ex UK) Equity Index Fund : 9.51",
        "NT Pacific (ex Japan) Equity Index Fund : 3.34",
        "NT Emerging Markets Index Fund : 5.14",
        "NT Euro Government Bond Index Fund : 28.8",
        "NT Euro Government Inflation Linked Index Fund : 28.8",
        "Stepping Stones Global Cash Fund : 16.7"
    ],
    "4": [
        "NT UK Equity Index Fund : 0.5",
        "NT North America Equity Index Fund : 8.26",
        "NT Europe (ex UK) Equity Index Fund : 10.8",
        "NT Pacific (ex Japan) Equity Index Fund : 3.8",
        "NT Emerging Markets Index Fund : 5.84",
        "NT Euro Government Bond Index Fund : 28.45",
        "NT Euro Government Inflation Linked Index Fund : 28.45",
        "Stepping Stones Global Cash Fund : 13.9"
    ],
    "5": [
        "NT UK Equity Index Fund : 0.56",
        "NT North America Equity Index Fund : 9.25",
        "NT Europe (ex UK) Equity Index Fund : 12.1",
        "NT Pacific (ex Japan) Equity Index Fund : 4.25",
        "NT Emerging Markets Index Fund : 6.54",
        "NT Euro Government Bond Index Fund : 28.1",
        "NT Euro Government Inflation Linked Index Fund : 28.1",
        "Stepping Stones Global Cash Fund : 11.1"
    ],
    "6": [
        "NT UK Equity Index Fund : 0.61",
        "NT North America Equity Index Fund : 10.22",
        "NT Europe (ex UK) Equity Index Fund : 13.36",
        "NT Pacific (ex Japan) Equity Index Fund : 4.69",
        "NT Emerging Markets Index Fund : 7.22",
        "NT Euro Government Bond Index Fund : 27.8",
        "NT Euro Government Inflation Linked Index Fund : 27.8",
        "Stepping Stones Global Cash Fund : 8.3"
    ],
    "7": [
        "NT UK Equity Index Fund : 0.67",
        "NT North America Equity Index Fund : 11.21",
        "NT Europe (ex UK) Equity Index Fund : 14.65",
        "NT Pacific (ex Japan) Equity Index Fund : 5.15",
        "NT Emerging Markets Index Fund : 7.92",
        "NT Euro Government Bond Index Fund : 27.4",
        "NT Euro Government Inflation Linked Index Fund : 27.4",
        "Stepping Stones Global Cash Fund : 5.6"
    ],
    "8": [
        "NT UK Equity Index Fund : 0.73",
        "NT North America Equity Index Fund : 12.17",
        "NT Europe (ex UK) Equity Index Fund : 15.91",
        "NT Pacific (ex Japan) Equity Index Fund : 5.59",
        "NT Emerging Markets Index Fund : 8.6",
        "NT Euro Government Bond Index Fund : 27.1",
        "NT Euro Government Inflation Linked Index Fund : 27.1",
        "Stepping Stones Global Cash Fund : 2.8"
    ],
    "9": [
        "NT UK Equity Index Fund : 0.79",
        "NT North America Equity Index Fund : 13.19",
        "NT Europe (ex UK) Equity Index Fund : 17.24",
        "NT Pacific (ex Japan) Equity Index Fund : 6.06",
        "NT Emerging Markets Index Fund : 9.32",
        "NT Euro Government Bond Index Fund : 26.7",
        "NT Euro Government Inflation Linked Index Fund : 26.7"
    ],
    "10": [
        "NT UK Equity Index Fund : 0.85",
        "NT North America Equity Index Fund : 14.15",
        "NT Europe (ex UK) Equity Index Fund : 18.5",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
	"11": [
        "NT UK Equity Index Fund : 0.85",
        "NT North America Equity Index Fund : 14.15",
        "NT Europe (ex UK) Equity Index Fund : 18.5",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
	"12": [
        "NT UK Equity Index Fund : 0.85",
        "NT North America Equity Index Fund : 14.15",
        "NT Europe (ex UK) Equity Index Fund : 18.5",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
	"13": [
        "NT UK Equity Index Fund : 0.85",
        "NT North America Equity Index Fund : 14.15",
        "NT Europe (ex UK) Equity Index Fund : 18.5",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ],
	"14": [
        "NT UK Equity Index Fund : 0.85",
        "NT North America Equity Index Fund : 14.15",
        "NT Europe (ex UK) Equity Index Fund : 18.5",
        "NT Pacific (ex Japan) Equity Index Fund : 6.5",
        "NT Emerging Markets Index Fund : 10",
        "NT Euro Government Bond Index Fund : 25",
        "NT Euro Government Inflation Linked Index Fund : 25"
    ]
}

	//ARF Balanced
var balancedARFFundCharge=[1.01,1.01,1.02,1.02,1.03,1.03,1.04,1.04,1.05,1.05,1.05,1.05,1.05,1.06];	
var balancedARF = {
    "0": [
        "NT UK Equity Index Fund : 0.52",
        "NT North America Equity Index Fund : 8.69",
        "NT Europe (ex UK) Equity Index Fund : 11.36",
        "NT Pacific (ex Japan) Equity Index Fund : 3.99",
        "NT Emerging Markets Index Fund : 6.14",
        "NT Euro Government Bond Index Fund : 22.15",
        "NT Euro Government Inflation Linked Index Fund : 22.15",
        "Stepping Stones Global Cash Fund : 25"
    ],
    "1": [
        "NT UK Equity Index Fund : 0.61",
        "NT North America Equity Index Fund : 10.07",
        "NT Europe (ex UK) Equity Index Fund : 13.17",
        "NT Pacific (ex Japan) Equity Index Fund : 4.63",
        "NT Emerging Markets Index Fund : 7.12",
        "NT Euro Government Bond Index Fund : 21.5",
        "NT Euro Government Inflation Linked Index Fund : 21.5",
        "Stepping Stones Global Cash Fund : 21.4"
    ],
    "2": [
        "NT UK Equity Index Fund : 0.69",
        "NT North America Equity Index Fund : 11.43",
        "NT Europe (ex UK) Equity Index Fund : 14.95",
        "NT Pacific (ex Japan) Equity Index Fund : 5.25",
        "NT Emerging Markets Index Fund : 8.08",
        "NT Euro Government Bond Index Fund : 20.85",
        "NT Euro Government Inflation Linked Index Fund : 20.85",
        "Stepping Stones Global Cash Fund : 17.9"
    ],
    "3": [
        "NT UK Equity Index Fund : 0.77",
        "NT North America Equity Index Fund : 12.88",
        "NT Europe (ex UK) Equity Index Fund : 16.83",
        "NT Pacific (ex Japan) Equity Index Fund : 5.92",
        "NT Emerging Markets Index Fund : 9.1",
        "NT Euro Government Bond Index Fund : 20.1",
        "NT Euro Government Inflation Linked Index Fund : 20.1",
        "Stepping Stones Global Cash Fund : 14.3"
    ],
    "4": [
        "NT UK Equity Index Fund : 0.856",
        "NT North America Equity Index Fund : 14.26",
        "NT Europe (ex UK) Equity Index Fund : 18.65",
        "NT Pacific (ex Japan) Equity Index Fund : 6.55",
        "NT Emerging Markets Index Fund : 10.08",
        "NT Euro Government Bond Index Fund : 19.45",
        "NT Euro Government Inflation Linked Index Fund : 19.45",
        "Stepping Stones Global Cash Fund : 10.7"
    ],
    "5": [
        "NT UK Equity Index Fund : 0.94",
        "NT North America Equity Index Fund : 15.68",
        "NT Europe (ex UK) Equity Index Fund : 20.5",
        "NT Pacific (ex Japan) Equity Index Fund : 7.2",
        "NT Emerging Markets Index Fund : 11.08",
        "NT Euro Government Bond Index Fund : 18.75",
        "NT Euro Government Inflation Linked Index Fund : 18.75",
        "Stepping Stones Global Cash Fund : 7.1"
    ],
    "6": [
        "NT UK Equity Index Fund : 1.02",
        "NT North America Equity Index Fund : 17.04",
        "NT Europe (ex UK) Equity Index Fund : 22.27",
        "NT Pacific (ex Japan) Equity Index Fund : 7.83",
        "NT Emerging Markets Index Fund : 12.04",
        "NT Euro Government Bond Index Fund : 18.1",
        "NT Euro Government Inflation Linked Index Fund : 18.1",
        "Stepping Stones Global Cash Fund : 3.6"
    ],
    "7": [
        "NT UK Equity Index Fund : 1.11",
        "NT North America Equity Index Fund : 18.42",
        "NT Europe (ex UK) Equity Index Fund : 24.09",
        "NT Pacific (ex Japan) Equity Index Fund : 8.46",
        "NT Emerging Markets Index Fund : 13.02",
        "NT Euro Government Bond Index Fund : 17.45",
        "NT Euro Government Inflation Linked Index Fund : 17.45"
    ],
    "8": [
        "NT UK Equity Index Fund : 1.19",
        "NT North America Equity Index Fund : 19.84",
        "NT Europe (ex UK) Equity Index Fund : 25.94",
        "NT Pacific (ex Japan) Equity Index Fund : 9.11",
        "NT Emerging Markets Index Fund : 14.02",
        "NT Euro Government Bond Index Fund : 14.95",
        "NT Euro Government Inflation Linked Index Fund : 14.95"
    ],
    "9": [
        "NT UK Equity Index Fund : 1.28",
        "NT North America Equity Index Fund : 21.23",
        "NT Europe (ex UK) Equity Index Fund : 27.74",
        "NT Pacific (ex Japan) Equity Index Fund : 9.75",
        "NT Emerging Markets Index Fund : 15",
        "NT Euro Government Bond Index Fund : 12.5",
        "NT Euro Government Inflation Linked Index Fund : 12.5"
    ],
    "10": [
        "NT UK Equity Index Fund : 1.36",
        "NT North America Equity Index Fund : 22.64",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
	"11": [
        "NT UK Equity Index Fund : 1.36",
        "NT North America Equity Index Fund : 22.64",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
	"12": [
        "NT UK Equity Index Fund : 1.36",
        "NT North America Equity Index Fund : 22.64",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
	"13": [
        "NT UK Equity Index Fund : 1.36",
        "NT North America Equity Index Fund : 22.64",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ],
	"14": [
        "NT UK Equity Index Fund : 1.36",
        "NT North America Equity Index Fund : 22.64",
        "NT Europe (ex UK) Equity Index Fund : 29.6",
        "NT Pacific (ex Japan) Equity Index Fund : 10.4",
        "NT Emerging Markets Index Fund : 16",
        "NT Euro Government Bond Index Fund : 10",
        "NT Euro Government Inflation Linked Index Fund : 10"
    ]
	
}

	//ARF Adventure
var adventureARFFundCharge=[1.02,1.02,1.03,1.03,1.04,1.04,1.05,1.05,1.06,1.06,1.06,1.07,1.07,1.07];	
var adventureARF = {
    "0": [
        "NT UK Equity Index Fund : 0.76",
        "NT North America Equity Index Fund : 12.59",
        "NT Europe (ex UK) Equity Index Fund : 16.46",
        "NT Pacific (ex Japan) Equity Index Fund : 5.79",
        "NT Emerging Markets Index Fund : 8.9",
        "NT Euro Government Bond Index Fund : 15.25",
        "NT Euro Government Inflation Linked Index Fund : 15.25",
        "Stepping Stones Global Cash Fund : 25"
    ],
    "1": [
        "NT UK Equity Index Fund : 0.84",
        "NT North America Equity Index Fund : 14.01",
        "NT Europe (ex UK) Equity Index Fund : 18.31",
        "NT Pacific (ex Japan) Equity Index Fund : 6.44",
        "NT Emerging Markets Index Fund : 9.9",
        "NT Euro Government Bond Index Fund : 14.55",
        "NT Euro Government Inflation Linked Index Fund : 14.55",
        "Stepping Stones Global Cash Fund : 21.4"
    ],
    "2": [
        "NT UK Equity Index Fund : 0.93",
        "NT North America Equity Index Fund : 15.42",
        "NT Europe (ex UK) Equity Index Fund : 20.16",
        "NT Pacific (ex Japan) Equity Index Fund : 7.09",
        "NT Emerging Markets Index Fund : 10.9",
        "NT Euro Government Bond Index Fund : 13.8",
        "NT Euro Government Inflation Linked Index Fund : 13.8",
        "Stepping Stones Global Cash Fund : 17.9"
    ],
    "3": [
        "NT UK Equity Index Fund : 1.01",
        "NT North America Equity Index Fund : 16.84",
        "NT Europe (ex UK) Equity Index Fund : 22.01",
        "NT Pacific (ex Japan) Equity Index Fund : 7.74",
        "NT Emerging Markets Index Fund : 11.9",
        "NT Euro Government Bond Index Fund : 13.1",
        "NT Euro Government Inflation Linked Index Fund : 13.1",
        "Stepping Stones Global Cash Fund : 14.3"
    ],
    "4": [
        "NT UK Equity Index Fund : 1.1",
        "NT North America Equity Index Fund : 18.31",
        "NT Europe (ex UK) Equity Index Fund : 23.94",
        "NT Pacific (ex Japan) Equity Index Fund : 8.41",
        "NT Emerging Markets Index Fund : 12.94",
        "NT Euro Government Bond Index Fund : 12.3",
        "NT Euro Government Inflation Linked Index Fund : 12.3",
        "Stepping Stones Global Cash Fund : 10.7"
    ],
    "5": [
        "NT UK Equity Index Fund : 1.19",
        "NT North America Equity Index Fund : 19.75",
        "NT Europe (ex UK) Equity Index Fund : 25.83",
        "NT Pacific (ex Japan) Equity Index Fund : 9.07",
        "NT Emerging Markets Index Fund : 13.96",
        "NT Euro Government Bond Index Fund : 11.55",
        "NT Euro Government Inflation Linked Index Fund : 11.55",
        "Stepping Stones Global Cash Fund : 7.1"
    ],
    "6": [
        "NT UK Equity Index Fund : 1.27",
        "NT North America Equity Index Fund : 21.17",
        "NT Europe (ex UK) Equity Index Fund : 27.68",
        "NT Pacific (ex Japan) Equity Index Fund : 9.72",
        "NT Emerging Markets Index Fund : 14.96",
        "NT Euro Government Bond Index Fund : 10.8",
        "NT Euro Government Inflation Linked Index Fund : 10.8",
        "Stepping Stones Global Cash Fund : 3.6"
    ],
    "7": [
        "NT UK Equity Index Fund : 1.36",
        "NT North America Equity Index Fund : 22.61",
        "NT Europe (ex UK) Equity Index Fund : 29.56",
        "NT Pacific (ex Japan) Equity Index Fund : 10.39",
        "NT Emerging Markets Index Fund : 15.98",
        "NT Euro Government Bond Index Fund : 10.05",
        "NT Euro Government Inflation Linked Index Fund : 10.05"
    ],
    "8": [
        "NT UK Equity Index Fund : 1.44",
        "NT North America Equity Index Fund : 24",
        "NT Europe (ex UK) Equity Index Fund : 31.38",
        "NT Pacific (ex Japan) Equity Index Fund : 11.02",
        "NT Emerging Markets Index Fund : 16.960",
        "NT Euro Government Bond Index Fund : 7.600",
        "NT Euro Government Inflation Linked Index Fund : 7.600"
    ],
    "9": [
        "NT UK Equity Index Fund : 1.53",
        "NT North America Equity Index Fund : 25.47",
        "NT Europe (ex UK) Equity Index Fund : 33.3",
        "NT Pacific (ex Japan) Equity Index Fund : 11.7",
        "NT Emerging Markets Index Fund : 18",
        "NT Euro Government Bond Index Fund : 5",
        "NT Euro Government Inflation Linked Index Fund : 5"
    ],
    "10": [
        "NT UK Equity Index Fund : 1.62",
        "NT North America Equity Index Fund : 26.89",
        "NT Europe (ex UK) Equity Index Fund : 35.14",
        "NT Pacific (ex Japan) Equity Index Fund : 12.35",
        "NT Emerging Markets Index Fund : 19",
        "NT Euro Government Bond Index Fund : 2.5",
        "NT Euro Government Inflation Linked Index Fund : 2.5"
    ],
	"11": [
        "NT UK Equity Index Fund : 1.62",
        "NT North America Equity Index Fund : 26.89",
        "NT Europe (ex UK) Equity Index Fund : 35.14",
        "NT Pacific (ex Japan) Equity Index Fund : 12.35",
        "NT Emerging Markets Index Fund : 19",
        "NT Euro Government Bond Index Fund : 2.5",
        "NT Euro Government Inflation Linked Index Fund : 2.5"
    ],
	"12": [
        "NT UK Equity Index Fund : 1.62",
        "NT North America Equity Index Fund : 26.89",
        "NT Europe (ex UK) Equity Index Fund : 35.14",
        "NT Pacific (ex Japan) Equity Index Fund : 12.35",
        "NT Emerging Markets Index Fund : 19",
        "NT Euro Government Bond Index Fund : 2.5",
        "NT Euro Government Inflation Linked Index Fund : 2.5"
    ],
	"13": [
         "NT UK Equity Index Fund : 1.62",
        "NT North America Equity Index Fund : 26.89",
        "NT Europe (ex UK) Equity Index Fund : 35.14",
        "NT Pacific (ex Japan) Equity Index Fund : 12.35",
        "NT Emerging Markets Index Fund : 19",
        "NT Euro Government Bond Index Fund : 2.5",
        "NT Euro Government Inflation Linked Index Fund : 2.5"
    ],
	"14": [
         "NT UK Equity Index Fund : 1.62",
        "NT North America Equity Index Fund : 26.89",
        "NT Europe (ex UK) Equity Index Fund : 35.14",
        "NT Pacific (ex Japan) Equity Index Fund : 12.35",
        "NT Emerging Markets Index Fund : 19",
        "NT Euro Government Bond Index Fund : 2.5",
        "NT Euro Government Inflation Linked Index Fund : 2.5"
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
	tempHTML 		+= "<tr>";
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










