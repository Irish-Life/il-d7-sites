(function ($) {

  var ageStart="40",
      SPorTVStart="50000",
      premiumBand="3",
      eeCon="1000",
      erCon="1000",
      yearsStart="1",
      spouseStart="50",
      nraStart="60",
      currentStart="25000",
      lumpStart="10000",
      currentValuePrevJobs="0";
      var paymentfrequency = ["Single Premium or Transfer","Annual Premium"];
      
      var productnames = ["CS ARF1", "CS ARF2", "CS1 - PRB", "CS1 - Pre-Retirement", "CS2 - Pre-Retirement"];
      var productnamesAP = ["CS 1 - Pre-Retirement","CS 2 - Pre-Retirement"];
      
      var structure = ["CS ARF1", "CS ARF2", "CS1 - PRB", "CS1 - Pre-Retirement", "CS2 - Pre-Retirement"];
      var sliderMin, sliderMax, sliderVal, nbProfile, spProfile, tvProfile, takeup, bandcore, initCommPercent=0;
      
    // [ARF1]	[ARF2]	[PRB1]	[CS1 Pre-Retirement]	[CS2 Pre-Retirement]
      var structureProfilesProdObj = [
        ['6109','6950','6952','6954','6956','6962','6964','6966','6968','6970','6972','','8137','8139','8141','8143'],
        ['5756','5755','5754'],
        ['6233','6974','6976','6941','6944','8108','8111','8114','8117','8120','8123','8126','8129','8131','8133','8135'],
        ['6045','6938','6935','6941','6944','8108','8111','8114','8117','8120','8123','8126','8096','8099','8102','8105'],
        ['5656','5657','5658']
      ];
      var structureProfilesCommObj = [
        '0.75% Base AMC -  With No trail commission',
        '0.75% Base AMC - Plus 0.25% trail commission',
        '0.75% Base AMC - Plus 0.50% trail commission',
        '0.50% Base AMC - Plus 0.25% trail commission',
        '0.50% Base AMC - Plus 0.50% trail commission',
        '0.50% Base AMC - Plus 0.10% trail commission',
        '0.50% Base AMC - Plus 0.20% trail commission',
        '0.50% Base AMC - Plus 0.30% trail commission',
        '0.50% Base AMC - Plus 0.40% trail commission',
        '0.50% Base AMC - Plus 0.60% trail commission',
        '0.50% Base AMC - Plus 0.70% trail commission',
        '0.50% Base AMC - Plus 0.75% trail commission',
        '0.75% Base AMC - Plus 0.10% trail commission',
        '0.75% Base AMC - Plus 0.20% trail commission',
        '0.75% Base AMC - Plus 0.30% trail commission',
        '0.75% Base AMC - Plus 0.40% trail commission',
      ];
      
      
    function getObjects(obj, key, val) {
      var objects = [];
      for (var i in obj) {
          if (!obj.hasOwnProperty(i)) continue;
          if (typeof obj[i] == 'object') {
              objects = objects.concat(getObjects(obj[i], key, val));
          } else if (i == key && obj[key] == val) {
              objects.push(obj);
          }
      }
      return objects;
    }

    var profileDescriptionsObj = [
    {productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6819', nbAll:'6820', TV:'6821', intro:'0.05', fundComm:'0', Amc:'0.01', charge:'0.0025', allBand1:'0.98', allBand2:'0.99', allBand3:'0.99', allBand4:'', allBand5:'', rules:'Min Term = 10 years', term:'10', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6822', nbAll:'6823', TV:'6824', intro:'0.05', fundComm:'0.0025', Amc:'0.0125', charge:'0.005', allBand1:'0.98', allBand2:'0.99', allBand3:'0.99', allBand4:'', allBand5:'', rules:'Min Term = 10 years', term:'10', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6935', nbAll:'6936', TV:'6937', intro:'0.05', fundComm:'0.005', Amc:'0.0125', charge:'0.005', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6045', nbAll:'6046', TV:'6195', intro:'0.05', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6938', nbAll:'6939', TV:'6940', intro:'0.05', fundComm:'0.0025', Amc:'0.01', charge:'0.0025', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6941', nbAll:'6942', TV:'6943', intro:'0.05', fundComm:'0.0025', Amc:'0.0075', charge:'0', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6944', nbAll:'6945', TV:'6946', intro:'0.05', fundComm:'0.005', Amc:'0.01', charge:'0.0025', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6053', nbAll:'6054', TV:'6199', intro:'0', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  & Terms < 5 years (see note 4)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6055', nbAll:'6056', TV:'6200', intro:'0', fundComm:'0', Amc:'0.01', charge:'0.0025', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  & Terms < 5 years (see note 4)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6057', nbAll:'6058', TV:'6201', intro:'0.03', fundComm:'0', Amc:'0.01', charge:'0.0025', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & Terms < 5 yrs SIGNOFF for >1% Initial (see note 4)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6059', nbAll:'6060', TV:'6202', intro:'0.03', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & Terms < 5 yrs SIGNOFF for >1% Initial (see note 4)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6947', nbAll:'6948', TV:'6949', intro:'0', fundComm:'0.0025', Amc:'0.01', charge:'0.0025', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  & Terms < 5 years (subject to sign off by Kenny Mellor)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'6828', nbAll:'6829', TV:'6830', intro:'0.03', fundComm:'0', Amc:'0.005', charge:'-0.0025', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years (subject to sign off by Brokerage & Pricing)', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8096', nbAll:'8097', TV:'8098', intro:'0.05', fundComm:'0.001', Amc:'0.0085', charge:'0.001', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8099', nbAll:'8100', TV:'8101', intro:'0.05', fundComm:'0.002', Amc:'0.0095', charge:'0.002', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8102', nbAll:'8103', TV:'8104', intro:'0.05', fundComm:'0.003', Amc:'0.0105', charge:'0.003', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8105', nbAll:'8106', TV:'8107', intro:'0.05', fundComm:'0.004', Amc:'0.0115', charge:'0.004', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8108', nbAll:'8109', TV:'8110', intro:'0.05', fundComm:'0.001', Amc:'0.006', charge:'-0.0015', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8111', nbAll:'8112', TV:'8113', intro:'0.05', fundComm:'0.002', Amc:'0.007', charge:'-0.0005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8114', nbAll:'8115', TV:'8116', intro:'0.05', fundComm:'0.003', Amc:'0.008', charge:'0.0005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8117', nbAll:'8118', TV:'8119', intro:'0.05', fundComm:'0.004', Amc:'0.009', charge:'0.0015', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8120', nbAll:'8121', TV:'8122', intro:'0.05', fundComm:'0.006', Amc:'0.011', charge:'0.0035', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8123', nbAll:'8124', TV:'8125', intro:'0.05', fundComm:'0.007', Amc:'0.012', charge:'0.0045', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'3', name:'CS1 - Pre-Retirement', nbProfileBonds:'8126', nbAll:'8127', TV:'8128', intro:'0.05', fundComm:'0.0075', Amc:'0.0125', charge:'0.005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6831', nbAll:'6832', TV:'N/A', intro:'0.05', fundComm:'0', Amc:'0.01', charge:'0', allBand1:'0.98', allBand2:'0.99', allBand3:'0.99', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6833', nbAll:'6834', TV:'N/A', intro:'0.05', fundComm:'0.0025', Amc:'0.0125', charge:'0.0025', allBand1:'0.98', allBand2:'0.99', allBand3:'0.99', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6109', nbAll:'6110', TV:'N/A', intro:'0.05', fundComm:'0', Amc:'0.0075', charge:'-0.0025', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6950', nbAll:'6951', TV:'N/A', intro:'0.05', fundComm:'0.0025', Amc:'0.01', charge:'0', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6952', nbAll:'6953', TV:'N/A', intro:'0.05', fundComm:'0.005', Amc:'0.0125', charge:'0.0025', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6954', nbAll:'6955', TV:'N/A', intro:'0.05', fundComm:'0.0025', Amc:'0.0075', charge:'-0.0025', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6956', nbAll:'6957', TV:'N/A', intro:'0.05', fundComm:'0.005', Amc:'0.01', charge:'0', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6958', nbAll:'6959', TV:'N/A', intro:'0.05', fundComm:'0.0075', Amc:'0.0125', charge:'0.0025', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6121', nbAll:'6122', TV:'N/A', intro:'0', fundComm:'0', Amc:'0.0075', charge:'-0.0025', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers only', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6123', nbAll:'6124', TV:'N/A', intro:'0', fundComm:'0', Amc:'0.01', charge:'0', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers only', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6125', nbAll:'6126', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.0075', charge:'-0.0025', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & SIGNOFF for >1% Initial', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6127', nbAll:'6128', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.01', charge:'0', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & SIGNOFF for >1% Initial', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6960', nbAll:'6961', TV:'N/A', intro:'0', fundComm:'0.0025', Amc:'0.01', charge:'0', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  (subject to sign off by Kenny Mellor)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6837', nbAll:'6838', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.005', charge:'-0.005', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'(subject to sign off by Brokerage & Pricing)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6962', nbAll:'6963', TV:'N/A', intro:'0.05', fundComm:'0.001', Amc:'0.006', charge:'-0.004', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6964', nbAll:'6965', TV:'N/A', intro:'0.05', fundComm:'0.002', Amc:'0.007', charge:'-0.003', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6966', nbAll:'6967', TV:'N/A', intro:'0.05', fundComm:'0.003', Amc:'0.008', charge:'-0.002', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6968', nbAll:'6969', TV:'N/A', intro:'0.05', fundComm:'0.004', Amc:'0.009', charge:'-0.001', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6970', nbAll:'6971', TV:'N/A', intro:'0.05', fundComm:'0.006', Amc:'0.011', charge:'0.001', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'6972', nbAll:'6973', TV:'N/A', intro:'0.05', fundComm:'0.007', Amc:'0.012', charge:'0.002', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'8137', nbAll:'8138', TV:'N/A', intro:'0.05', fundComm:'0.001', Amc:'0.0085', charge:'0.001', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'8139', nbAll:'8140', TV:'N/A', intro:'0.05', fundComm:'0.002', Amc:'0.0095', charge:'0.002', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'8141', nbAll:'8142', TV:'N/A', intro:'0.05', fundComm:'0.003', Amc:'0.0105', charge:'0.003', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'0', name:'CS ARF1', nbProfileBonds:'8143', nbAll:'8144', TV:'N/A', intro:'0.05', fundComm:'0.004', Amc:'0.0115', charge:'0.004', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6233', nbAll:'6234', TV:'N/A', intro:'0.04', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6974', nbAll:'6975', TV:'N/A', intro:'0.04', fundComm:'0.0025', Amc:'0.01', charge:'0.0025', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6976', nbAll:'6977', TV:'N/A', intro:'0.04', fundComm:'0.005', Amc:'0.0125', charge:'0.005', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6053', nbAll:'6054', TV:'N/A', intro:'0', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  & Terms < 5 years (see note 4)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6055', nbAll:'6056', TV:'N/A', intro:'0', fundComm:'0', Amc:'0.01', charge:'0.0025', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  & Terms < 5 years (see note 4)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6057', nbAll:'6058', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.01', charge:'0.0025', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & Terms < 5 yrs SIGNOFF for >1% Initial (see note 5)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6059', nbAll:'6060', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & Terms < 5 yrs SIGNOFF for >1% Initial (see note 5)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6239', nbAll:'6240', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.01', charge:'0.0025', allBand1:'0.97', allBand2:'0.97', allBand3:'0.97', allBand4:'', allBand5:'', rules:'Internal transfers & Terms < 5 yrs SIGNOFF for >1% Initial (see note 5)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6941', nbAll:'6942', TV:'N/A', intro:'0.05', fundComm:'0.0025', Amc:'0.0075', charge:'0', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6944', nbAll:'6945', TV:'N/A', intro:'0.05', fundComm:'0.005', Amc:'0.01', charge:'0.0025', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6947', nbAll:'6948', TV:'N/A', intro:'0', fundComm:'0.0025', Amc:'0.01', charge:'0.0025', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Internal transfers  & Terms < 5 years (subject to sign off by Kenny Mellor)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6828', nbAll:'6829', TV:'N/A', intro:'0.03', fundComm:'0', Amc:'0.005', charge:'-0.0025', allBand1:'0.96', allBand2:'0.97', allBand3:'0.98', allBand4:'', allBand5:'', rules:'Min Term = 5 years (subject to sign off by Brokerage & Pricing)', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6026', nbAll:'6027', TV:'N/A', intro:'0.015', fundComm:'0.002', Amc:'0.008', charge:'0.0005', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Stephen Doyle Only (NN04)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6028', nbAll:'6029', TV:'N/A', intro:'0.015', fundComm:'0.003', Amc:'0.009', charge:'0.0015', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Stephen Doyle Only (NN04)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'6030', nbAll:'6031', TV:'N/A', intro:'0.015', fundComm:'0', Amc:'0.006', charge:'-0.0015', allBand1:'1', allBand2:'1', allBand3:'1', allBand4:'', allBand5:'', rules:'Stephen Doyle Only (NN04)', term:'0', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'1000', nbAll:'1000', TV:'N/A', intro:'0', fundComm:'0', Amc:'0', charge:'0', allBand1:'0', allBand2:'0', allBand3:'0', allBand4:'', allBand5:'', rules:'Dummy profile', term:'10', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8129', nbAll:'8130', TV:'N/A', intro:'0.04', fundComm:'0.001', Amc:'0.0085', charge:'0.001', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8131', nbAll:'8132', TV:'N/A', intro:'0.04', fundComm:'0.002', Amc:'0.0095', charge:'0.002', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8133', nbAll:'8134', TV:'N/A', intro:'0.04', fundComm:'0.003', Amc:'0.0105', charge:'0.003', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8135', nbAll:'8136', TV:'N/A', intro:'0.04', fundComm:'0.004', Amc:'0.0115', charge:'0.004', allBand1:'0.98', allBand2:'0.99', allBand3:'1', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8108', nbAll:'8109', TV:'N/A', intro:'0.05', fundComm:'0.001', Amc:'0.006', charge:'-0.0015', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8111', nbAll:'8112', TV:'N/A', intro:'0.05', fundComm:'0.002', Amc:'0.007', charge:'-0.0005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8114', nbAll:'8115', TV:'N/A', intro:'0.05', fundComm:'0.003', Amc:'0.008', charge:'0.0005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8117', nbAll:'8118', TV:'N/A', intro:'0.05', fundComm:'0.004', Amc:'0.009', charge:'0.0015', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8120', nbAll:'8121', TV:'N/A', intro:'0.05', fundComm:'0.006', Amc:'0.011', charge:'0.0035', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8123', nbAll:'8124', TV:'N/A', intro:'0.05', fundComm:'0.007', Amc:'0.012', charge:'0.0045', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'2', name:'CS1 - PRB', nbProfileBonds:'8126', nbAll:'8127', TV:'N/A', intro:'0.05', fundComm:'0.0075', Amc:'0.0125', charge:'0.005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'', allBand5:'', rules:'Min Term = 5 years', term:'5', surrender:'5%/5%/5%/3%/1%'},
{productID:'4', name:'CS2 - Pre-Retirement', nbProfileBonds:'5656', nbAll:'5665', TV:'5376', intro:'0.05', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'0.95', allBand2:'0.95', allBand3:'0.95', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'None'},
{productID:'4', name:'CS2 - Pre-Retirement', nbProfileBonds:'5657', nbAll:'5666', TV:'5377', intro:'0.05', fundComm:'0.0025', Amc:'0.01', charge:'0.0025', allBand1:'0.95', allBand2:'0.95', allBand3:'0.95', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'None'},
{productID:'4', name:'CS2 - Pre-Retirement', nbProfileBonds:'5658', nbAll:'5667', TV:'5378', intro:'0.05', fundComm:'0.005', Amc:'0.0125', charge:'0.005', allBand1:'0.95', allBand2:'0.95', allBand3:'0.95', allBand4:'', allBand5:'', rules:'None', term:'0', surrender:'None'},
{productID:'1', name:'CS ARF2', nbProfileBonds:'5756', nbAll:'5759', TV:'N/A', intro:'0.04', fundComm:'0', Amc:'0.0075', charge:'0', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'0.965', allBand5:'0.97', rules:'None', term:'0', surrender:'None'},
{productID:'1', name:'CS ARF2', nbProfileBonds:'5755', nbAll:'5758', TV:'N/A', intro:'0.04', fundComm:'0.0025', Amc:'0.01', charge:'0.0025', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'0.965', allBand5:'0.97', rules:'None', term:'0', surrender:'None'},
{productID:'1', name:'CS ARF2', nbProfileBonds:'5754', nbAll:'5757', TV:'N/A', intro:'0.04', fundComm:'0.005', Amc:'0.0125', charge:'0.005', allBand1:'0.94', allBand2:'0.95', allBand3:'0.96', allBand4:'0.965', allBand5:'0.97', rules:'None', term:'0', surrender:'None'},
{productID:'1', name:'CS ARF2', nbProfileBonds:'1000', nbAll:'1000', TV:'N/A', intro:'0', fundComm:'0', Amc:'0', charge:'0', allBand1:'0', allBand2:'0', allBand3:'0', allBand4:'0', allBand5:'0', rules:'Dummy profile', term:'10', surrender:'None'},


    ];
   
$( document ).ready(function() { 

 
  $('#paymentfrequency').change(function(){
    
      var paymentFreq = $('select#paymentfrequency option:selected').val();
      
      if(paymentFreq != 'none'){
          // for the commission products use the array
      $('#product-ap').html('');
      $('#product-ap').append('<option value="none">Select a Product</option>');
      for (i=0;i<productnamesAP.length; i++){
          $('#product-ap').append('<option value="'+i+'">'+productnamesAP[i]+'</option>');
      }
  
        if(paymentFreq == '1'){
          $('.ps-ap-com-calc').show();
          $('.ps-rev-calc').hide();
        }else{
          $('.ps-ap-com-calc').hide();
          $('.ps-rev-calc').show();
        }
      }
      else{
        $('.ps-ap-com-calc').hide();
        $('.ps-rev-calc').hide();
      }
  });
  
  $('#product').change(function(){
    
    $('.termError').html('');
    // make sure that the person selects a product 
    // and then unhide them
    
    // here we get the profile numbers that we are allowed to use
    // based on the product
      var productID = $('select#product option:selected').val();
      
      if(productID != 'none'){
        $('.hideA').show();
        $('.hideB').hide();
        
        $('#structure').html('');
        $('#structure').append('<option value="none">Select an option</option>');
        var structs = [];
        var structsID = [];
        for(i=0; i<structureProfilesProdObj[0,productID].length; i++){
          // make sure that only structures with a code are added
          //console.log("structureProfilesProdObj[0,productID]["+i+"]: "+structureProfilesProdObj[0,productID][i]+ " "+structureProfilesCommObj[i]);
          if(structureProfilesProdObj[0,productID][i] != '')
          {
            structs.push(structureProfilesCommObj[i]);
            structsID.push(structureProfilesCommObj[i]);
          }
        }
        structs.sort();
        //console.log("len: "+structs.length);
        for(i=0; i<structs.length; i++){
          //console.log("i: "+i+ " "+structs[i]);
         
           $('#structure').append('<option value="'+jQuery.inArray( structs[i], structsID )+'">'+structs[i]+'</option>');
        }
      }
      else{
        $('.hideA').hide();
        $('.hideB').hide();
      }
    
    
    
    
  });
  
  changeStructure = function(){
    
    
        $('.termError').html('');
  // what is the text of the structure chosen
  var structureText = $('select#structure option:selected').text();
  $('.pensionCTAmcTrailResult').html(structureText);
  
  // what is the id of the structure chosen
  var structureID = $('select#structure option:selected').val();
    if(structureID != 'none')
    {
      
        $('.hideB').show();
      // Which of the AMC/Trail Structures have been selected
      var productID = $('select#product option:selected').val();
      var profileChosen = structureProfilesProdObj[productID][structureID];

      
      var profileDescription = getObjects(profileDescriptionsObj, 'nbProfileBonds', ''+profileChosen);
      
      
      for (i=0;i<profileDescription.length; i++){
        // set the max for the slider
        sliderMax = profileDescription[i].intro.replace('%', '')*100;
        
        $( ".pensionCTPercentAmountFee" ).slider( "option", "max",sliderMax );
         $('.pensionCTMinTermResult').html(profileDescription[i].term);
         
        $('.pensionCTinitialMax').html(sliderMax);
        
        // profiles in use
        nbProfile = profileDescription[i].nbProfileBonds;
        spProfile = profileDescription[i].nbAll;
        tvProfile = profileDescription[i].TV;
        
        // show the selected profile
        $('.pensionCTProfileCodeResult').html(nbProfile);
        
          
        $('.pensionCTintro').html();
        
        // The % value
        var adviceFee= $('.pensionCTTakeupResult').html();
        
        var fundComm = ((Math.round(adviceFee*sliderMax))*0.01).toFixed(2);        
        $('.pensionCTfundComm').html(fundComm+"%");
        
//stephen
        
        var sportv = $( ".pensionCTSliderSPorTVResult" ).val();
        $('.pensionCTinitialPaid').html("€"+(Math.round(fundComm * sportv)/100));
        
        // The Annual Management Charge
        var amc = Math.round(profileDescription[i].Amc*10000)/100;
         
        $('.pensionCTallManagementCharge').html(amc.toFixed(2)+"%");
        
  
          // Set up the allocation rate
        var premiumResults = $('.pensionCTPremiumResult').html();
        
        if (premiumResults == '1'){
          bandcore = profileDescription[i].allBand1.replace('%', '');
          
        }else if (premiumResults == '2'){
          
          bandcore = profileDescription[i].allBand2.replace('%', '');
          
        }else if (premiumResults == '3'){
          
          bandcore = profileDescription[i].allBand3.replace('%', '');
          
        }else if (premiumResults == '4'){
          
          bandcore = profileDescription[i].allBand3.replace('%', '');
          
        }else if (premiumResults == '5'){
          
          bandcore = profileDescription[i].allBand5.replace('%', '');
          
        }
        bandcore = bandcore*100;
        //
        //$('.pensionCTallocationRates').html(parseInt(bandcore) + (sliderMax - fundComm)+"%");
        
        // Trail Commission Payable
        var fc = ((profileDescription[i].fundComm)*100).toFixed(2);
        //
        $('.pensionCTTrail').html(fc+"%");
        
        // profile Rules
        $('.pensionCTRules').html(profileDescription[i].rules);
        
        // Surrender Penalty
        $('.pensionCTSurrender').html(profileDescription[i].surrender);
        
        // Min Term
        $('.pensionCTMinTermResult').html(profileDescription[i].term);
        
      }
    }
    else{
      
        $('.hideB').hide();
    }
  }
  
  
  
  $('#structure').change(function(){
    changeStructure();
    
      changeTakeUp(initCommPercent);
      changeInitComm(initCommPercent);
  });
  
  $('.pensionCTEuroAmountFeeResult').change(function(){
    var ans;
    var maxInitialCommission = 0; // TO DO
    var sportv = $( ".pensionCTSliderSPorTVResult" ).val();
    var adviceFee= $('.pensionCTTakeupResult').val();
    feeCommission=$("input:radio[name=ps-advice-fee-comm]:checked").val();
    if (feeCommission == "fee"){
      if(sportv==0)
      {
            ans = 100;
            
      }
      else{
          if((((adviceFee/sportv)/maxInitialCommission)<0) || (((adviceFee/sportv)/maxInitialCommission)>1)){
              //true
              ans = "INITIAL COMMISSION PERCENT NOT ALLOWABLE";
            }
            else{
              // false
              var x = Math.floor(((adviceFee/sportv)/maxInitialCommission)*100)
              ans = x;
            }
            
      }
    }
    else{
      
              ans = "not sure";
    }
  });



  $('.printpage').click(function() {
    $('.printShow').show();
		window.print();
		return false;
	});
   $( ".pensionCTPercentAmountFeeResult" ).html( 0 );
   $( ".pensionCTMoneyAmountFeeResult" ).html( 0 );
   $('.pensionCTTakeupResult').html(0);
  $('.pensionCTPremiumResult').html(premiumBand);
  $('.pensionCTMinTermResult').html(0);
  $( ".pensionCTSliderAgeResult" ).html( ageStart );
  $( ".pensionCTSliderNRAResult" ).html( nraStart );
  $( ".pensionCTSliderSpouseResult" ).html( spouseStart );
  $( ".pensionCTSliderSPorTVResult" ).val( SPorTVStart );
  $( ".pensionCTSliderSPorTVOutput" ).html( '€'+SPorTVStart );
  $( ".pensionCTEuroAmountFeeResult" ).val( '0' );
 
  // for the commission products use the array
  $('#product').html('');
  $('#product').append('<option value="none">Select a Product</option>');
  for (i=0;i<productnames.length; i++){
      $('#product').append('<option value="'+i+'">'+productnames[i]+'</option>');
  }
  
  
  // When the page first loads ask the user to decide what type of
  // frequency they are looking at
  $('#paymentfrequency').html('');
  $('#paymentfrequency').append('<option value="none">Select a Payment Frequency</option>');
  for (i=0;i<paymentfrequency.length; i++){
      $('#paymentfrequency').append('<option value="'+i+'">'+paymentfrequency[i]+'</option>');
  }
  
  loadSliders();
  reset();
   // for editable slider results this code will
   // update the sldier with the value 
  $('.pensionCTSliderNetRelevantResult').change(function() {
    var sliderName = $(this).attr("name");
    var sliderVal  = $(this).val();
    $('.'+sliderName).slider("option", "value", sliderVal);		
    $('.'+sliderName+'Result').val(sliderVal);
  });
    $('.pensionCTSliderEditable').change(function() {
    var sliderName = $(this).attr("name");
    var sliderVal  = $(this).val();
    $('.'+sliderName).slider("option", "value", sliderVal);		
    $('.'+sliderName+'Result').val(sliderVal);
  });
  
  $('.calcCommission').click(function(){
    //calcLSPrem(age, sal, nra, maxLumpSum1,maxLumpSum2, prevLumpSum,currentValue);
    //calcLSPrem();
    
    if (checkAgeTermDiff() == true){
      
      $('.ps-rev-calc').hide();
      $('.ps-rev-loading').show();    
      doCommissionCalcs();
    }
    else{
      
      // past term + Age
     $('.termError').show();
    }    
  });
  
  
  $('.ps-rev-loading').fadeOut(function(){
    //$('.ps-rev-calc').fadeIn();    
    $('.ps-choice').fadeIn();    
  });

  $('.ps-choice-a').click(function(){
     $('.ps-choice').fadeOut(function(){
      $('.ps-rev-calc').fadeIn();    
    });
  });
  $('.ps-choice-b').click(function(){
     $('.ps-choice').fadeOut(function(){
      $('.ps-ap-com-calc').fadeIn();    
    });
  });
 changeInitComm(initCommPercent);
});

doCommissionCalcs = function(){

   
	setGAPageView('/pensions/pension-sums/commission-profile-calculator','Commission profile Calulator');

 // $( ".pensionCTEuroAmountFeeResult" ).html( $('.pensionCTEuroAmountFeeResult').val() );

  
  
  var adviceFee= $('.pensionCTTakeupResult').html();
  var fundComm = (Math.round(adviceFee*sliderMax))/100;        
 
  updateCommissionInputs();
  
  var allRate = parseInt(bandcore) + (sliderMax - fundComm);
  
  
  changeStructure();
  $('.pensionCTallocationRates').html(allRate+"%");

  var structureID = $('select#structure option:selected').text();
  
   $('.pensionCTAmcTrailResult').html(structureID);

  
    $('.ps-rev-loading').fadeOut(function(){
      
      $('.ps-rev-results').fadeIn();    
      scrollToHead();

      $('.close-results').click(function(){
        
        $('.ps-rev-results').hide();
        $('.ps-rev-calc').fadeIn();     
      //scrollToHead();
      });
    });

  
}


function reset()
{

  $('.termError').html('');
  $('.results').html('<span class="smallSpinner">&nbsp;</span>');
  $('.taxFreeLimitB').digits();
  $('.resultMessage').hide();
}

function changeTakeUp(comm){
 //var amt = $( ".pensionCTinitialMax" ).html().replace('%','');
 
  takeup = Math.floor((comm/sliderMax)*100);
 //
 $('.pensionCTTakeupResult').html(takeup);
}
function changeInitComm(val){

  var sportv = $( ".pensionCTSliderSPorTVResult" ).val();
  $( ".pensionCTMoneyAmountFeeResult" ).html( "&nbsp;/&nbsp;€"+(Math.round(val * sportv)/100));
 
  $( ".pensionCTEuroAmountFeeResult" ).html( "€"+(Math.round(val * sportv)/100));
  
  //$('.pensionCTfundComm').html(val+"%");
  
  var adviceFee= $('.pensionCTTakeupResult').html();
  
  var fundComm = ((Math.round(adviceFee*sliderMax))*0.01).toFixed(2);        
  $('.pensionCTfundComm').html(fundComm+"%");
  
  
  $('.pensionCTinitialPaid').html("€"+(Math.round(fundComm * sportv)/100));
        
        
  $('.pensionCTnbProfileCode').html(nbProfile);
  $('.pensionCTspProfileCode').html(spProfile);
  $('.pensionCTtvProfileCode').html(tvProfile);
 
  if(!isNaN(nbProfile))
  {
    if(takeup<100){
      $('.pensionCTnbProfileCode').html(nbProfile+"-0"+takeup);
    }
    else{
      
      $('.pensionCTnbProfileCode').html(nbProfile+"-100");
    }
  }
  
  if(!isNaN(spProfile))
  {
    if(takeup<100){
      $('.pensionCTspProfileCode').html(spProfile+"-0"+takeup);
    }
    else{
      $('.pensionCTspProfileCode').html(spProfile+"-100");
    }
  }
  
  if(!isNaN(tvProfile))
  {
    if(takeup<100){
      $('.pensionCTtvProfileCode').html(tvProfile+"-0"+takeup);
    }
    else{
      $('.pensionCTtvProfileCode').html(tvProfile+"-100");
    }
  }
  
        
}

loadSliders = function(){
  
  var currentYear = (new Date).getFullYear();
    $( ".pensionCTSliderYearsCurrentEmployer" ).slider({
      handle: '#slider-handle',range:"min",animate: true,value:yearsStart,min: 1,max: 40,step: 1,
      slide: function( event, ui ) {
      $('.sliderBubble').fadeOut('fast');
      $( ".pensionCTSliderYearsCurrentEmployerResult" ).html( ui.value );
      },
      start: function(e,ui){

         
      },
      stop: function(e,ui){
         $(".pensionCTSliderYearsCurrentEmployer").slider("option", "value", ui.value);
         reset();
      }
    });
	
	
	$( ".pensionCTSliderAge" ).slider({
      handle: '#slider-handle',range:"min",animate: true,value:ageStart,min: 18,max: 70,step: 1,
      slide: function( event, ui ) {
        $('.sliderBubble').fadeOut('fast');
        $( ".pensionCTSliderAgeResult" ).html( ui.value );
      },
      start: function(e,ui){

        
         
      },		
      stop: function(e,ui){
        
         $(".pensionCTSliderAge").slider("option", "value", ui.value);
         reset();
      }
    });
    
	$( ".pensionCTPercentAmountFee" ).slider({
      handle: '#slider-handle',range:"min",animate: true,value:0,min: 0,max: 5,step: 0.05,
      slide: function( event, ui ) {
        initCommPercent = ui.value;
        $('.sliderBubble').fadeOut('fast');
        $( ".pensionCTPercentAmountFeeResult" ).html( initCommPercent+"%" );
        changeTakeUp(initCommPercent);
        changeInitComm(initCommPercent); 

      },
      start: function(e,ui){
         
      },
      stop: function(e,ui){
         $(".pensionCTPercentAmountFee").slider("option", "value", ui.value);
         reset();
        changeTakeUp(initCommPercent);
        changeInitComm(initCommPercent);
        
        var adviceFee= $('.pensionCTTakeupResult').html();
        var fundComm = (Math.round(adviceFee*sliderMax))/100;        
       
        //
        //$('.pensionCTallocationRates').html(parseInt(bandcore) + (sliderMax - fundComm)+"%");
      }
    });
	$( ".pensionCTSliderNRA" ).slider({
      handle: '#slider-handle',range:"min",animate: true,value:ageStart,min: 60,max: 70,step: 1,
      slide: function( event, ui ) {
      $('.sliderBubble').fadeOut('fast');
      $( ".pensionCTSliderNRAResult" ).html( ui.value );
      },
      start: function(e,ui){
         
      },
      stop: function(e,ui){
         $(".pensionCTSliderNRA").slider("option", "value", ui.value);
         reset();
         
      }
    });
    
    
	
	$( ".pensionCTSliderSPorTV" ).slider({
      handle: '#slider-handle',range:"min",animate: true,value:SPorTVStart,min: 10000,max: 500000,step: 1000,
      slide: function( event, ui ) {
      
        $( ".pensionCTSliderSPorTVResult" ).val( ui.value ); 
        $( ".pensionCTSliderSPorTVOutput" ).html( '€'+ui.value );
        
     
      },
      start: function(e,ui){
        
      },
      stop: function(e,ui){
         $(".pensionCTSliderSPorTV").slider("option", "value", ui.value);
         reset();
      },
      change: function(e,ui){
        changeStructure();
        $( ".pensionCTSliderSPorTVOutput" ).html( '€'+ui.value );
         updateCommissionInputs();
        changeInitComm(initCommPercent);
      }
    });
}


checkAgeTermDiff = function(){
  
  var product = $('select#product option:selected').val();
 
  $('.termError').html('');
  var returner;
  returner = true;
  
  
  if(product == 0 || product == 1){
    
  returner = true;
  }
  else{
    var age = $( ".pensionCTSliderAgeResult" ).html( );
    var retirementAge = $( ".pensionCTSliderNRAResult" ).html( );
    var term = $('.pensionCTMinTermResult').html();
    
    var ageTerm = parseInt(age)+parseInt(term);
    if( ageTerm > retirementAge){
      returner = false;
      $('.termError').html('Please contact your account manager for commission options on cases with terms of 5 years or less to NRA. This combination of age ('+age+') & term ('+term+' years) is not possible with this structure and a retirement age of '+retirementAge);
    }
  }
  
  
  return returner;
}
  
updateCommissionInputs = function(){

  var product = $('select#product option:selected').val();
  $( ".productResult" ).html( productnames[product] );
  var premiumBand;
  var sportv = $( ".pensionCTSliderSPorTVResult" ).val();

  if(product == 2 || product == 3 || product == 4){
  
  
   if(sportv<50000)
    {
      premiumBand = 1;
    }
    else{
        if (sportv<100000){
          premiumBand = 2;
        }
        else{
          premiumBand = 3;
        }
    }
  
    
  }else{
    
    if(product == 0){
      
   //
        if (sportv<100000){
          premiumBand = 1;
        }
        else{
         if (sportv<200000){
            premiumBand = 2;
          }
          else{
            premiumBand = 3;
          }
        }
      
   //
    }
    else 
    {
      if (product == 1)
      {
        if(sportv<25000){
            premiumBand = 1;
        }
        else{
          if(sportv<100000){
            premiumBand = 3;
          }
          else
          {
            if(sportv<250000){
            premiumBand = 4;
            }
            else{
            premiumBand = 5;            
            }
          }
        }
      }
      else{
       premiumBand = "ERROR";
      }
      
    }
  }
  $('.pensionCTPremiumResult').html(premiumBand);
}


scrollToHead = function() {

	 $('html, body').animate({
        scrollTop: $('.ps-rev-results').offset().top 
    }, 200);
}
$.fn.digits = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}

function log(message){ 
	try {
		
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}
setGAPageView = function(p,t){
		try{
			//tag manager
			dataLayer.push({
				'event':'pageview',
				'pageTitle':t,
				'virtualURL':p
				});		
			}
			catch(err){
				//Do nothing
			}
	//return "user set";
}


})(jQuery);
