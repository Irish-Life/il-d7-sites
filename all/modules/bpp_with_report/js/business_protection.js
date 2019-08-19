(function ($) {

    var navArray = [['home-screen','Home']];
    var selectedStep = '';
    $( document ).ready(function() {
        $(".report-partner-add-btn").click(function () {
            partnersCount++;
            console.log('partnersCount ' + partnersCount);
            if (partnersCount == "5") {
                $(".report-partner-add-btn").hide();
            }
            $('.partner-' + partnersCount).show();
        });
        //store the client selected
        $(".removePartner").click(function () {
            console.log('partnersCount ' + partnersCount);
            if (partnersCount <= "5") {
                $(".report-partner-add-btn").show();
            }
            $('.partner-' + partnersCount).hide();
            partnersCount--;
        });

        var partnersCount=1;
        $('.breadcrumbBtn').click(function(){
            var step = $(this).data('step');
            var next = $(this).data('next');
            console.log('\tbreadcrumb step:'+step);
            console.log('\tbreadcrumb next:'+next);
            $('.page-'+step).hide();
            $('.page-'+next).show();

            $('.companyConfirmBtn').hide();
        });
        $('#partnershipDropdown').change(function () {
            var s = $(this).val();
            if (s == 'life') {
                $('.reportBtn-life').show();
                $('.reportBtn-own').hide();
            } else {

                $('.reportBtn-life').hide();
                $('.reportBtn-own').show();
            }
        });
        $('#companylossreplaceDropdown').change(function () {
            var s = $(this).val();
            if (s == 'replacement') {
                $('.reportBtn-replacement').show();
                $('.reportBtn-loss').hide();
            } else {
                $('.reportBtn-replacement').hide();
                $('.reportBtn-loss').show();
            }
        });
        $('#personalshareholderDropdown').change(function () {
            var s = $(this).val();
            if (s == 'life') {
                $('.reportBtn-personallife').show();
                $('.reportBtn-personalown').hide();
            } else {
                $('.reportBtn-personallife').hide();
                $('.reportBtn-personalown').show();
            }
        });

        
        
        $('.journeyBtn').click(function(){
            var step = $(this).data('step');
            var next = $(this).data('next');
            console.log('\tstep:'+step);
            console.log('\tnext:'+next);
            $('.page-'+step).hide();
            $('.page-'+next).show();


            // see what was clicked
            if(step=='1'){
                var client = $(this).data('client');
                selectedStep ='client';
                //store the client selected
            }
            else if (step=="1a"){
                var inst = $('[data-remodal-id=partnershipLife]').remodal();
                inst.open();
            }
            else if (step=="1b"){
                var inst = $('[data-remodal-id=partnershipOwn]').remodal();
                inst.open();
            }
            else if (step=="1c"){
                var inst = $('[data-remodal-id=partnershipLegal]').remodal();
                inst.open();
            }
            else if (step=="21e1"){
                var inst = $('[data-remodal-id=companyshareholderExample1]').remodal();
                inst.open();
            }
            else if (step=="21e2"){
                var inst = $('[data-remodal-id=companyshareholderExample2]').remodal();
                inst.open();
            }
            else if (step=="21e3"){
                var inst = $('[data-remodal-id=companyshareholderExample3]').remodal();
                inst.open();
            }
            else if (step=="211a"){ 
                var inst = $('[data-remodal-id=companyshareholderKeypersonLoan]').remodal();
                inst.open();
            }
            else if (step=="212a"){ 
                var inst = $('[data-remodal-id=companyshareholderKeypersonCoverloss]').remodal();
                inst.open();
            }
            else if (step=="213a1"){ 
                var inst = $('[data-remodal-id=companyshareholderoptiona]').remodal();
                inst.open();
            }
            else if (step=="213a2"){ 
                var inst = $('[data-remodal-id=companyshareholderoptionb]').remodal();
                inst.open();
            }
            else if (step=="213AA1"){ 
                var inst = $('[data-remodal-id=companyshareholderlifeinsurancereq]').remodal();
                inst.open();
            }
            else if (step == "213AA2") {
                var inst = $('[data-remodal-id=companyshareholderlifeinsurancelegal]').remodal();
                inst.open();
            }
            else if (step == "213AA3") {
                var inst = $('[data-remodal-id=companyshareholderExample4]').remodal();
                inst.open();
            }
            else if (step == "213AA4") {
                var inst = $('[data-remodal-id=companyshareholderExample5]').remodal();
                inst.open();
            }
            else if (step=="213BA"){ 
                var inst = $('[data-remodal-id=personalshareholderlife]').remodal();
                inst.open();
            }
            else if (step=="213BB"){ 
                var inst = $('[data-remodal-id=personalshareownlife]').remodal();
                inst.open();
            }
            else if (step=="213BC"){ 
                var inst = $('[data-remodal-id=personalshareholderlegalagreement]').remodal();
                inst.open();
            }
            else if (step=="31A"){ 
                var inst = $('[data-remodal-id=soletradersownlife]').remodal();
                inst.open();
            }
            else if (step == "31B") {
                var inst = $('[data-remodal-id=soletraderslifeofanother]').remodal();
                inst.open();
            } 
            else{

                // if not a modal then scroll
                $( '.page-'+next).scrollTop( 300 );
                $('html, body').animate({
                    scrollTop: $('.page-'+next).offset().top - 100
                  }, 500);
            }
            

            $('#corporate-confirm').click(function(){
                if($("#corporate-confirm").is(':checked'))
               {
                   $('.companyConfirmBtn').show();
               }
                else
                {
                    $('.companyConfirmBtn').hide();
                }
            });



        })


        $(".create-report-btn").click(function () {

            var reportid = $(this).data('report-id');

            var brokerInfoName = $('#r' + reportid+'-brokerInfoName').val();

            var businessName = $('#r' + reportid+'-businessName').val();
            var businessContact = $('#r'+reportid+'-businessContact').val();
            var businessAddress1 = $('#r'+reportid+'-businessAddress1').val();
            var businessAddress2 = $('#r'+reportid+'-businessAddress2').val();
            var businessAddress3 = $('#r'+reportid+'-businessAddress3').val();
            var businessAddress4 = $('#r'+reportid+'-businessAddress4').val();

            var partner1Name = $('#r'+reportid+'-partner1Name').val();
            var partner1Share = $('#r'+reportid+'-partner1Share').val();
            var partner1Value = $('#r'+reportid+'-partner1Value').val();

            var partner2Name = $('#r'+reportid+'-partner2Name').val();
            var partner2Share = $('#r'+reportid+'-partner2Share').val();
            var partner2Value = $('#r'+reportid+'-partner2Value').val();

            var partner3Name = $('#r'+reportid+'-partner3Name').val();
            var partner3Share = $('#r'+reportid+'-partner3Share').val();
            var partner3Value = $('#r'+reportid+'-partner3Value').val();

            var partner4Name = $('#r'+reportid+'-partner4Name').val();
            var partner4Share = $('#r'+reportid+'-partner4Share').val();
            var partner4Value = $('#r'+reportid+'-partner4Value').val();

            var partner5Name = $('#r'+reportid+'-partner5Name').val();
            var partner5Share = $('#r'+reportid+'-partner5Share').val();
            var partner5Value = $('#r'+reportid+'-partner5Value').val();

            var partnerProductDetails = $('#r' + reportid + '-partnerProductDetails').val();
            var partnerNeedsObjectives = $('#r' + reportid + '-partnerNeedsObjectives').val();
            var partnerNeedsLevelofCover = $('#r' + reportid + '-partnerNeedsLevelofCover').val();

            console.log('reportid ' + reportid);
            console.log('partnerNeedsObjectives ' + partnerNeedsObjectives);
            
            $.redirect("https://www.irishlife.ie/report/business-protection-pathfinder-report",
                {
                    report: reportid,
                    clientName: businessContact,
                    clientAddress: [
                        { line1: businessAddress1, line2: businessAddress2, line3: businessAddress3, line4: businessAddress4 }
                    ],
                    businessName: businessName,
                    businessAddress: [
                        { line1: "Main Street", line2: "Swords", line3: "Dublin", line4: "Co. Dublin" }
                    ],
                    brokerName: brokerInfoName,
                    brokerNeedsObj: partnerNeedsObjectives,
                    partnerNeedsLevelofCover: partnerNeedsLevelofCover,
                    keyPersonAName: partner1Name,
                    keyPersonAShare: partner1Share,
                    keyPersonAValue: partner1Value,
                    keyPersonBName: partner2Name,
                    keyPersonBShare: partner2Share,
                    keyPersonBValue: partner2Value,
                    keyPersonCName: partner3Name,
                    keyPersonCShare: partner3Share,
                    keyPersonCValue: partner3Value,
                    keyPersonDName: partner4Name,
                    keyPersonDShare: partner4Share,
                    keyPersonDValue: partner4Value,
                    keyPersonEName: partner5Name,
                    keyPersonEShare: partner5Share,
                    keyPersonEValue: partner5Value,
                    BrokerProductDetails: partnerProductDetails,
                },
                "POST", "_blank", null, true);
        });
        function documents(id){
            
            $('[data-remodal-id=partnershipLife]').remodal();
            //var inst = $('[data-remodal-id=partnershipLife]').remodal();
            //inst.open();
        }
    	
    });


})(jQuery);
