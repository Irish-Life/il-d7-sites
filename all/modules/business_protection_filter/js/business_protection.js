(function ($) {

    var navArray = [['home-screen','Home']];


    $( document ).ready(function() {        

        $('.navitems .step').bind( "click", function(e) {
            e.preventDefault();
            navClick($(this).data('div'));
        });

        $('.bp-startBtn').click(function(){

            $('.header-banner').hide();
            $('#splashScreen').hide();
            $('#bp-app').show();
        });


        $('#bp-partnership').click(function(){

            $('#home-screen').hide();
            $('#partnership').show();
            $('#partnership-screen').show();
            addToBreadcrum('partnership-screen', "Partnership Insurance");
            $('.step-bar').width('100%');
        });

        /*
        $('#partnership-life-assurance').click(function(){

            $('#partnership-screen').hide();
            $('#partnership-life-assurance-screen').show();
            addToBreadcrum('partnership-life-assurance-screen', "Life Assurance");
            $('.step-bar').width('37%');
        });
        */

        $('#bp-shareholder').click(function(){

            $('#home-screen').hide();
            $('#shareholder').show();
            $('#shareholder-home').show();
            addToBreadcrum('shareholder-home', "Company Shareholder");
            $('.step-bar').width('75%');
        });

        $('#shareholder-unsecured-loans').click(function(){

            $('#shareholder-home').hide();
            $('#shareholder-unsecured-loans-screen').show();
            addToBreadcrum('shareholder-unsecured-loans-screen', "Keyperson Cover");
            $('.step-bar').width('100%');
        });

        $('#shareholder-loss-of-profits').click(function(){

            $('#shareholder-home').hide();
            $('#shareholder-loss-of-profits-screen').show();
            addToBreadcrum('shareholder-loss-of-profits-screen', "Keyperson Cover");
            $('.step-bar').width('100%');
        });

        $('#shareholder-shareholders-shares').click(function(){

            $('#shareholder-home').hide();
            $('#shareholder-shareholders-shares-screen').show();
            addToBreadcrum('shareholder-shareholders-shares-screen', "Shareholder Protection");
            $('.step-bar').width('85%');
        });

        $('#shareholder-personal-shareholder-protection').click(function(){

            $('#shareholder-shareholders-shares-screen').hide();
            $('#shareholder-personal-shareholder-protection-screen').show();
            addToBreadcrum('shareholder-personal-shareholder-protection-screen', "Personal Shareholder Protection");
            $('.step-bar').width('100%');
        });


        $('#shareholder-corporate-shareholder-protection-validation').click(function(){

            $('#corporate-validation').removeAttr("checked");

            $('#shareholder-shareholders-shares-screen').hide();
            $('#shareholder-corporate-shareholder-protection-validation-screen').show();
            addToBreadcrum('shareholder-corporate-shareholder-protection-validation-screen', "Declaration");
            $('.step-bar').width('89%');
        });

        $('#shareholder-corporate-shareholder-protection').click(function(){

            $('#shareholder-corporate-shareholder-protection-validation-screen').hide();
            $('#shareholder-corporate-shareholder-protection-screen').show();
            addToBreadcrum('shareholder-corporate-shareholder-protection-screen', "Corporate Shareholder Protection");
            $('.step-bar').width('100%');
        });


        $('#bp-trader').click(function(){

            $('#home-screen').hide();
            $('#sole-trader').show();
            $('#sole-trader-screen').show();
            addToBreadcrum('sole-trader-screen', "Sole Trader");
            $('.step-bar').width('100%');
        });


        $('#corporate-validation').click(function(){
            $('#corporate-validation').toggle(this.checked);
            if($("#corporate-validation").is(':checked')){
                $('#shareholder-corporate-shareholder-protection').removeAttr("disabled");
            }else{
                $('#shareholder-corporate-shareholder-protection').attr('disabled', 'disabled');
            }
        });

        /*
        $('#LifeofanotherExpand').click(function(){
            $('#Ownlifeintrust').removeClass("in");
        });

        $('#OwnlifeintrustExpand').click(function(){
            $('#Lifeofanother').removeClass("in");
        });

        $('#PersonalLifeofanotherExpand').click(function(){
            $('#PersonalOwnlifeintrust').removeClass("in");
        });

        $('#PersonalOwnlifeintrustExpand').click(function(){
            $('#PersonalLifeofanother').removeClass("in");
        });

        $('#PersonalLifeofanotherExpand').click(function(){
            $('#PersonalOwnlifeintrust').removeClass("in");
        });

        $('#PersonalOwnlifeintrustExpand').click(function(){
            $('#PersonalLifeofanother').removeClass("in");
        });      

        $('#SoleTraderPersonalCoverExpand').click(function(){
            $('#SoleTraderkeyPerson').removeClass("in");
        });

        $('#SoleTraderkeyPersonExpand').click(function(){
            $('#SoleTraderPersonalCover').removeClass("in");
        });
        */

    	
    });

    function addToBreadcrum(divid, divName){

        var narPart = [divid, divName];
        navArray.push(narPart);
        navClick(divid);

    }

    function navClick(divid){

        var newNavlinks = '';
        var newNavArray = [];
        var keepAdding = true;

        $.each(navArray, function( index, element ) {

            var divid1 = element[0];
            var divName = element[1];      

            if(keepAdding){
                newNavArray.push(element);                
            }
            //stops adding the list of divs back into the array
            if(divid == divid1){
                keepAdding = false;
            }
            
        });

        navArray = newNavArray;


        var maxlenght = 100;
        var stepwidth = 100 / navArray.length;
        if(stepwidth == 100){
            stepwidth = 50;
        }
        //loop through and create the breadcrum
        $.each(navArray, function( index, element ) {

            var divid1 = element[0];
            var divName = element[1]; 

            var link = '<li style="width:'+stepwidth+'%;" class="activated"><div data-div="'+divid1+'" class="step"><div class="step-image"><span></span></div><div class="step-description">'+divName+'</div</div></li>';
            newNavlinks +=  link;
            
        });

        $('.steps ul').html(newNavlinks);
        
        if(navArray.length == 1){
            $('.step-bar').width('25%');
        }else if(navArray.length == 2){
            $('.step-bar').width('75%');
        }else if(navArray.length == 3){
            $('.step-bar').width('85%');
        }else if(navArray.length == 4){
            $('.step-bar').width('89%');
        }


        //add remove from array
        $('.screen-part').hide();
        $('#'+divid).fadeIn('slow');

        $('.navitems .step').bind( "click", function(e) {
            e.preventDefault();
            navClick($(this).data('div'));
        });
    }

})(jQuery);
