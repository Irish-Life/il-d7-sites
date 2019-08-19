<!-- Form where the broker must input the imformation to create the report -->

<!-- 
    Report A - 
    LIFE INSURANCE LIFE OF ANOTHER
-->
<div class="page-report-11" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-11" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-11" data-next="11">Partnership Insurance</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Life of Another report</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="ra-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT PARTNERSHIP INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="ra-businessName">Partnership Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Firm ABC" id="ra-businessName">
                </div>
                <div class="six columns">
                    <label for="ra-businessContact">Partnership Contact Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Address of partnership</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="ra-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="ra-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="ra-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="ra-businessAddress4">
                </div>
            </div>
            <div class="grey pt-2 stepper">PARTNER INFORMATION</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="ra-partner1Name">Partner One Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-partner1Name">
                </div>
                <div class="three columns">
                    <label for="ra-partner1Share">Share in Partnership %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="ra-partner1Share">
                </div>
                <div class="three columns">
                    <label for="ra-partner1Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="ra-partner1Value">
                </div>
            </div>
            <div class="row partner-2" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="ra-partner2Name">Partner Two Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-partner2Name">
                </div>
                <div class="three columns">
                    <label for="ra-partner2Share">Share in Partnership %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="ra-partner2Share">
                </div>
                <div class="three columns">
                    <label for="ra-partner2Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="ra-partner2Value" >
                </div>
            </div>
            <div class="row partner-3" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="ra-partner3Name">Partner Three Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-partner3Name">
                </div>
                <div class="three columns">
                    <label for="ra-partner3Share">Share in Partnership %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="ra-partner3Share">
                </div>
                <div class="three columns">
                    <label for="ra-partner3Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0" placeholder="000,000" id="ra-partner3Value">
                </div>
            </div>
            <div class="row partner-4" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="ra-partner4Name">Partner Four Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-partner4Name">
                </div>
                <div class="three columns">
                    <label for="ra-partner4Share">Share in Partnership %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="ra-partner4Share">
                </div>
                <div class="three columns">
                    <label for="ra-partner4Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="ra-partner4Value">
                </div>
            </div>
            <div class="row partner-5" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="ra-partner5Name">Partner Five Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="ra-partner5Name">
                </div>
                <div class="three columns">
                    <label for="ra-partner5Share">Share in Partnership %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="ra-partner5Share">
                </div>
                <div class="three columns">
                    <label for="ra-partner5Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="ra-partner5Value">
                </div>
            </div>
            <div class="row" >
                <div class="six columns">
                    <a href="javascript:void(0)"  class="button button-secondary report-partner-add-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add another partner</a>
                </div>
                <div class="six columns">&nbsp;</div>
            </div>



            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="ra-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="ra-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="ra-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="ra-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="a">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>


<!-- Form where the broker must input the imformation to create the report -->

<!-- 
    Report B - 
    L OWN LIFE IN TRUST
-->
<span class="page-report-12" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-12" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-12" data-next="11">Partnership Insurance</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Own Life in Trust</div>
        </div>
    </div>


    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rb-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT PARTNERSHIP INFORMATION</div>
                <div class="row">
                    <div class="six columns">
                        <label for="rb-businessName">Partnership Name</label>
                        <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="rb-businessName">
                    </div>
                    <div class="six columns">
                        <label for="rb-businessContact">Partnership Contact Name</label>
                        <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-businessContact">
                    </div>
                </div>
                <div class="row">
                    <div class="six columns">
                        <label for="rb-businessAddress1">Address of partnership</label>
                        <input class="u-full-width" type="text" placeholder="Address Line 1" id="rb-businessAddress1">
                        <input class="u-full-width" type="text" placeholder="Address Line 2" id="rb-businessAddress2">
                        <input class="u-full-width" type="text" placeholder="Address Line 3" id="rb-businessAddress3">
                        <input class="u-full-width" type="text" placeholder="County" id="rb-businessAddress4">
                    </div>
                </div>
                <div class="grey pt-2 stepper">SHAREHOLDER INFORMATION</div>
                    <div class="row partner-1">
                        <div class="six columns">
                            <label for="rb-partner1Name">Partner One Name</label>
                            <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-partner1Name">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner1Share">Share in Partnership %</label>
                            <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rb-partner1Share">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner1Value">Estimated Value of Share &euro;</label>
                            <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rb-partner1Value">
                        </div>
                    </div>
                    <div class="row partner-2" style="display:none;">
                        <div class="six columns">
                        <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rb-partner2Name">Partner Two Name</label>
                            <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-partner2Name">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner2Share">Share in Partnership %</label>
                            <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rb-partner2Share">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner2Value">Estimated Value of Share &euro;</label>
                            <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rb-partner2Value">
                        </div>
                    </div>
                    <div class="row partner-3" style="display:none;">
                        <div class="six columns">
                        <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rb-partner3Name">Partner Three Name</label>
                            <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-partner3Name">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner3Share">Share in Partnership %</label>
                            <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rb-partner3Share">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner3Value">Estimated Value of Share &euro;</label>
                            <input class="u-full-width" type="number" max="100000000" min="0" placeholder="000,000" id="rb-partner3Value">
                        </div>
                    </div>
                    <div class="row partner-4" style="display:none;">
                        <div class="six columns">
                            <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rb-partner4Name">Partner Four Name</label>
                            <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-partner4Name">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner4Share">Share in Partnership %</label>
                            <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rb-partner4Share">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner4Value">Estimated Value of Share &euro;</label>
                            <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rb-partner4Value">
                        </div>
                    </div>
                    <div class="row partner-5" style="display:none;">
                        <div class="six columns">
                        <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rb-partner5Name">Partner Five Name</label>
                            <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rb-partner5Name">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner5Share">Share in Partnership %</label>
                            <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rb-partner5Share">
                        </div>
                        <div class="three columns">
                            <label for="rb-partner5Value">Estimated Value of Share &euro;</label>
                            <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rb-partner5Value">
                        </div>
                    </div>
                    <div class="row " >
                        <div class="six columns">
                            <a href="javascript:void(0)"  class="button button-secondary report-partner-add-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add another partner</a>
                        </div>
                        <div class="six columns">
                            &nbsp;
                        </div>
                    </div>
                </div>   
                <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
                    <div class="row ">
                        <div class="twelve columns">    
                            <label for="rb-partnerNeedsObjectives">This will appear in the body of the report</label>
                            <textarea class="u-full-width" placeholder="" id="rb-partnerNeedsObjectives"></textarea>
                        </div>
                    </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
                    <div class="row ">
                        <div class="twelve columns">    
                            <label for="rb-partnerProductDetails">This will appear in the body of the report</label>
                            <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="rb-partnerProductDetails"></textarea>
                        </div>
                    </div>
                    <div class="row " >
                        <div class="two columns">
                            &nbsp;
                        </div>
                        <div class="eight columns">
                            <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width " data-report-id="b">Create Report</a>
                        </div>
                        <div class="two columns">
                            &nbsp;
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</span>



<!-- 
    Report C - 
    Keyperson Cover - Loan
-->
<div class="page-report-211" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-211" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-211" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-211" data-next="211">KEYPERSON COVER - LOAN</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;KEYPERSON COVER - LOAN REPORT</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rc-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rc-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT BUSINESS INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rc-businessName">Business Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="rc-businessName">
                </div>
                <div class="six columns">
                    <label for="rc-businessContact">Business Contact</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rc-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Business Address</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="rc-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="rc-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="rc-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="rc-businessAddress4">
                </div>
            </div>
            <div class="grey pt-2 stepper">BUSINESS DETAILS</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="rc-partner1Name">Keyperson Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rc-partner1Name">
                </div>
                <div class="three columns">
                    <label for="rc-partner1Share">Life Cover amount &euro;</label>
                    <input class="u-full-width" type="number" max="99999999999" min="0" maxlength="12" placeholder="000,000" id="rc-partner1Share">
                </div>
                <div class="three columns">
                    <label for="rc-partner1Value">Serious Illness Cover &euro;</label>
                    <input class="u-full-width" type="number" max="99999999999" min="0"placeholder="000,000" id="rc-partner1Value">
                </div>
            </div>
            



            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rc-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="rc-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rc-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="rc-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="c">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>



<!-- 
    Report D - 
    Comapny Cover for Keyperson Cover - Loss of Profits
-->
<div class="page-report-2121" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-2121" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-2121" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-2121" data-next="212">KEYPERSON COVER - LOSS OF PROFITS / REPLACEMENT COSTS</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;LOSS OF PROFITS REPORT</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rd-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rd-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT BUSINESS INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rd-businessName">Business Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="rd-businessName">
                </div>
                <div class="six columns">
                    <label for="rd-businessContact">Business Contact</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rd-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Business Address</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="rd-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="rd-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="rd-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="rd-businessAddress4">
                </div>
            </div>
            <div class="grey pt-2 stepper">BUSINESS DETAILS</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="rd-partner1Name">Keyperson Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rd-partner1Name">
                </div>
                <div class="three columns">
                    <label for="rd-partner1Share">Life Cover amount &euro;</label>
                    <input class="u-full-width" type="number" max="99999999999" min="0" maxlength="12" placeholder="000,000" id="rd-partner1Share">
                </div>
                <div class="three columns">
                    <label for="rd-partner1Value">Serious Illness Cover &euro;</label>
                    <input class="u-full-width" type="number" max="99999999999" min="0"placeholder="000,000" id="rd-partner1Value">
                </div>
            </div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="rd-partner2Share">What % contribution to profit does the keyperson make? </label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="" id="rd-partner2Share">
                </div>
                <div class="six columns">
                    <label for="rd-partner2Value">The level of cover is based on a multiple of:</label>
                        <select id="rd-partner2Value" class="u-full-width" >
                            <option value="gross">Gross Profit</option>
                            <option value="net">Net Profit</option>
                        </select>
                </div>
                <!--<div class="row ">
                    <div class="twelve columns">    
                        <label for="rd-partnerNeedsLevelofCover">Reason for this level of cover</label>
                        <textarea class="u-full-width" placeholder="If the level of cover is not related to the keypersons percentage(%) contribution to profit then detail the reason for the chosen level of cover." id="rd-partnerNeedsLevelofCover"></textarea>
                    </div>
                </div>-->
            </div>
            

            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rd-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="rd-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rd-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="rd-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="d">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>
<!-- 
    Report E - 
    Comapny Cover for Keyperson Cover - Replacement Costs.
-->

<div class="page-report-2122" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-2122" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-2122" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-2122" data-next="212">KEYPERSON COVER - LOSS OF PROFITS / REPLACEMENT COSTS</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;REPLACEMENT COSTS REPORT</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="re-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="re-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT BUSINESS INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="re-businessName">Business Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="re-businessName">
                </div>
                <div class="six columns">
                    <label for="re-businessContact">Business Contact</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="re-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Business Address</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="re-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="re-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="re-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="re-businessAddress4">
                </div>
            </div>
            <div class="grey pt-2 stepper">BUSINESS DETAILS</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="re-partner1Name">Keyperson Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="re-partner1Name">
                </div>
                <div class="three columns">
                    <label for="re-partner1Share">Life Cover amount &euro;</label>
                    <input class="u-full-width" type="number" max="99999999999" min="0" maxlength="12" placeholder="000,000" id="re-partner1Share">
                </div>
                <div class="three columns">
                    <label for="re-partner1Value">Serious Illness Cover &euro;</label>
                    <input class="u-full-width" type="number" max="99999999999" min="0"placeholder="000,000" id="re-partner1Value">
                </div>
            </div>
            <div class="row partner-1">
                
                <div class="six columns">
                    <label for="re-partner2Value">Is this a multiple of salary?</label>
                        <select id="re-partner2Value" class="u-full-width" >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                </div>
                <div class="six columns">
                    <label for="re-partner2Share">What is the multiple of salary?</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="e.g. 5" id="re-partner2Share">
                </div>
                <!--<div class="row ">
                    <div class="twelve columns">    
                        <label for="re-partnerNeedsLevelofCover">Reason for this level of cover</label>
                        <textarea class="u-full-width" placeholder="If the level of cover is not related to the keypersons salary then detail the reason for the chosen level of cover change" id="re-partnerNeedsLevelofCover"></textarea>
                    </div>
                </div>-->
            </div>
            

            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="re-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="re-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="re-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="re-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="e">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>


<!-- 
    Report F - 
    Corporate Shareholder Protection
-->
<div class="page-report-213AAa" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213AAa" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213AAa" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213AAa" data-next="213">SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213AAa" data-next="213A">DECLARATION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213AAa" data-next="213AA">Corporate Sharehholder Protection</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Report</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rf-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT COMPANY INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rf-businessName">Company Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="rf-businessName">
                </div>
                <div class="six columns">
                    <label for="rf-businessContact">Company Contact Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Address of Company</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="rf-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="rf-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="rf-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="rf-businessAddress4">
                </div>
                <div class="six columns">
                    <label for="rf-partnerNeedsLevelofCover">Value of Company</label>
                    <input class="u-full-width" type="number" placeholder="e.g. 1000000"max="999999999" min="0"  id="rf-partnerNeedsLevelofCover">
                </div>
            </div>
            <div class="grey pt-2 stepper">SHAREHOLDER INFORMATION</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="rf-partner1Name">Shareholder One Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-partner1Name">
                </div>
                <div class="six columns">
                    <label for="rf-partner1Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rf-partner1Share">
                </div>
               <!-- <div class="three columns">
                    <label for="rf-partner1Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner1Value">
                </div>-->
            </div>
            <div class="row partner-2" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="rf-partner2Name">Shareholder Two Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-partner2Name">
                </div>
                <div class="six columns">
                    <label for="rf-partner2Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rf-partner2Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner2Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner2Value" >
                </div>-->
            </div>
            <div class="row partner-3" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="rf-partner3Name">Shareholder Three Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-partner3Name">
                </div>
                <div class="six columns">
                    <label for="rf-partner3Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rf-partner3Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner3Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0" placeholder="000,000" id="rf-partner3Value">
                </div>-->
            </div>
            <div class="row partner-4" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rf-partner4Name">Shareholder Four Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-partner4Name">
                </div>
                <div class="six columns">
                    <label for="rf-partner4Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rf-partner4Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner4Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner4Value">
                </div>-->
            </div>
            <div class="row partner-5" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rf-partner5Name">Shareholder Five Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rf-partner5Name">
                </div>
                <div class="six columns">
                    <label for="rf-partner5Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rf-partner5Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner5Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner5Value">
                </div>-->
            </div>
            <div class="row" >
                <div class="six columns">
                    <a href="javascript:void(0)"  class="button button-secondary report-partner-add-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add another shareholder</a>
                </div>
                <div class="six columns">&nbsp;</div>
            </div>



            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rf-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="rf-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rf-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="rf-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="f">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>



<!-- 
    Report G - 
    LIFE INSURANCE LIFE OF ANOTHER
-->
<div class="page-report-213Ba" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter your clients information in order to generate a personalised report.</p></div>
            </div>
        </div>
    </div>

    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Ba" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Ba" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Ba" data-next="213">SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Ba" data-next="213B">PERSONAL SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;LIFE OF ANOTHER REPORT</div>
        </div>
    </div>
    
    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rg-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT COMPANY INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rg-businessName">Company Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="rg-businessName">
                </div>
                <div class="six columns">
                    <label for="rg-businessContact">Company Contact Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Address of Company</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="rg-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="rg-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="rg-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="rg-businessAddress4">
                </div>
                <div class="six columns">
                    <label for="rg-partnerNeedsLevelofCover">Value of Company</label>
                    <input class="u-full-width" type="number" placeholder="e.g. 1000000"max="999999999" min="0"  id="rg-partnerNeedsLevelofCover">
                </div>
            </div>
            <div class="grey pt-2 stepper">SHAREHOLDER INFORMATION</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="rg-partner1Name">Shareholder One Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-partner1Name">
                </div>
                <div class="six columns">
                    <label for="rg-partner1Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rg-partner1Share">
                </div>
               <!-- <div class="three columns">
                    <label for="rf-partner1Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner1Value">
                </div>-->
            </div>
            <div class="row partner-2" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="rg-partner2Name">Shareholder Two Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-partner2Name">
                </div>
                <div class="six columns">
                    <label for="rg-partner2Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rg-partner2Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner2Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner2Value" >
                </div>-->
            </div>
            <div class="row partner-3" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="rg-partner3Name">Shareholder Three Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-partner3Name">
                </div>
                <div class="six columns">
                    <label for="rg-partner3Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rg-partner3Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner3Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0" placeholder="000,000" id="rf-partner3Value">
                </div>-->
            </div>
            <div class="row partner-4" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rg-partner4Name">Shareholder Four Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-partner4Name">
                </div>
                <div class="six columns">
                    <label for="rg-partner4Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rg-partner4Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner4Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner4Value">
                </div>-->
            </div>
            <div class="row partner-5" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rg-partner5Name">Shareholder Five Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rg-partner5Name">
                </div>
                <div class="six columns">
                    <label for="rg-partner5Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rg-partner5Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner5Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner5Value">
                </div>-->
            </div>
            <div class="row" >
                <div class="six columns">
                    <a href="javascript:void(0)"  class="button button-secondary report-partner-add-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add another shareholder</a>
                </div>
                <div class="six columns">&nbsp;</div>
            </div>



            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rg-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="rg-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rg-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="rg-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="g">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>




<!-- 
    Report H - 
    PERSONAL SHAREHOLDER PROTECTION - life in trust
-->
<div class="page-report-213Bb" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Client Information</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Enter you clients informaion in order to generate a report.</p></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Bb" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Bb" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Bb" data-next="213">SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="report-213Bb" data-next="213B">PERSONAL SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;OWN LIFE IN TRUST REPORT</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">BROKER INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rh-brokerInfoName">Your Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-brokerInfoName">
                </div>
            </div>
            <div class="grey pt-2 stepper">CLIENT COMPANY INFORMATION</div>
            <div class="row">
                <div class="six columns">
                    <label for="rh-businessName">Company Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Company ABC" id="rh-businessName">
                </div>
                <div class="six columns">
                    <label for="rh-businessContact">Company Contact Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-businessContact">
                </div>
            </div>
            <div class="row">
                <div class="six columns">
                    <label for="exampleMessage">Address of Company</label>
                    <input class="u-full-width" type="text" placeholder="Address Line 1" id="rh-businessAddress1">
                    <input class="u-full-width" type="text" placeholder="Address Line 2" id="rh-businessAddress2">
                    <input class="u-full-width" type="text" placeholder="Address Line 3" id="rh-businessAddress3">
                    <input class="u-full-width" type="text" placeholder="County" id="rh-businessAddress4">
                </div>
                <div class="six columns">
                    <label for="rh-partnerNeedsLevelofCover">Value of Company</label>
                    <input class="u-full-width" type="number" placeholder="e.g. 1000000"max="999999999" min="0"  id="rh-partnerNeedsLevelofCover">
                </div>
            </div>
            <div class="grey pt-2 stepper">SHAREHOLDER INFORMATION</div>
            <div class="row partner-1">
                <div class="six columns">
                    <label for="rh-partner1Name">Shareholder One Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-partner1Name">
                </div>
                <div class="six columns">
                    <label for="rh-partner1Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rh-partner1Share">
                </div>
               <!-- <div class="three columns">
                    <label for="rf-partner1Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner1Value">
                </div>-->
            </div>
            <div class="row partner-2" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="rh-partner2Name">Shareholder Two Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-partner2Name">
                </div>
                <div class="six columns">
                    <label for="rh-partner2Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rh-partner2Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner2Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner2Value" >
                </div>-->
            </div>
            <div class="row partner-3" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
                    <label for="rh-partner3Name">Shareholder Three Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-partner3Name">
                </div>
                <div class="six columns">
                    <label for="rh-partner3Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rh-partner3Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner3Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0" placeholder="000,000" id="rf-partner3Value">
                </div>-->
            </div>
            <div class="row partner-4" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rh-partner4Name">Shareholder Four Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-partner4Name">
                </div>
                <div class="six columns">
                    <label for="rh-partner4Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rh-partner4Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner4Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner4Value">
                </div>-->
            </div>
            <div class="row partner-5" style="display:none;">
                <div class="six columns">
                    <a href="javascript:void(0);" class="removePartner"><i class="fa fa-minus-circle" aria-hidden="true"></i></a><label for="rh-partner5Name">Shareholder Five Name</label>
                    <input class="u-full-width" type="text" placeholder="e.g. Joe Bloggs" id="rh-partner5Name">
                </div>
                <div class="six columns">
                    <label for="rh-partner5Share">Share in Company %</label>
                    <input class="u-full-width" type="number" max="100" min="0" maxlength="3" placeholder="0" id="rh-partner5Share">
                </div>
                <!--<div class="three columns">
                    <label for="rf-partner5Value">Estimated Value of Share &euro;</label>
                    <input class="u-full-width" type="number" max="100000000" min="0"placeholder="000,000" id="rf-partner5Value">
                </div>-->
            </div>
            <div class="row" >
                <div class="six columns">
                    <a href="javascript:void(0)"  class="button button-secondary report-partner-add-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;Add another shareholder</a>
                </div>
                <div class="six columns">&nbsp;</div>
            </div>



            <!-- next -->
            <div class="grey pt-2 stepper">NEEDS AND OBJECTIVES</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rh-partnerNeedsObjectives">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="" id="rh-partnerNeedsObjectives"></textarea>
                </div>
            </div>
            <div class="grey pt-2 stepper">CONCLUSION</div>
            <div class="row ">
                <div class="twelve columns">    
                    <label for="rh-partnerProductDetails">This will appear in the body of the report</label>
                    <textarea class="u-full-width" placeholder="e.g. You may wish to outline how the specific features of the product type selected are suitable to meet your clients’ needs and why the product recommended is most suitable." id="rh-partnerProductDetails"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="two columns">&nbsp;</div>
                <div class="eight columns">
                    <a href="javascript:void(0)" class="button button-primary create-report-btn u-full-width "data-report-id="h">Create Report</a>
                </div>
                <div class="two columns">&nbsp;</div>
            </div>  
        </div>
    </div>
</div>


