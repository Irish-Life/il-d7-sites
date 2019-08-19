<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700');
</style>

<!-- PAGE 1-->
<span class="page-1">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Protecting You and Your Business</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Use our Business Protection Pathfinder to navigate through your clients business protection needs. Business Protection Pathfinder will take you to the information you need, to help you make a recommendation and generate a personalised report for your client.</p>
            </div>
        </div>
        </div>
    </div>
    <div class="container pt-5">
        <div class="row center ">
            <div class="twelve columns ">
                <h1 class="">What type of business client are you?</h1>
            </div>
        </div>
    </div>


    <div class=" pt-5 pb-5">
        <div class="row center ">
            <div class="four columns border-blue">
                <span class="card-header pb-3 pt-3">
                    <span class="large-icon "><i class=" pt-3 fa fa-users" aria-hidden="true"></i></span>
                    <h3 class="pt-3 pb-3 white">Partner in a partnership</h3>
                </span>
                <span class="card-bottom">
                    <a class="button button-primary journeyBtn" href="javascript:void(0)" data-client="partner" data-step="1" data-next="11">SELECT</a>
                </span>
            </div>

            <div class="four columns border-blue">
                <span class="card-header pb-3 pt-3">
                <span class="large-icon "><i class="pt-3 fa fa-pie-chart" aria-hidden="true"></i></span>
                <h3 class=" pt-3 pb-3 white">Shareholder in a company</h3>
                </span>
                <span class="card-bottom">
                <a class="button button-primary journeyBtn" href="javascript:void(0)" data-client="shareholder" data-step="1" data-next="21">SELECT</a>
                </span>
            </div>

            <div class="four columns border-blue">
                <span class="card-header pb-3 pt-3">
                <span class="large-icon "><i class="pt-3 fa fa-male" aria-hidden="true"></i></span>
                <h3 class=" pt-3 pb-3 white">Sole Trader</h3>
                </span>
                <span class="card-bottom">
                <a class="button button-primary journeyBtn" href="javascript:void(0)" data-client="sole" data-step="1" data-next="31">SELECT</a>
                </span>
            </div>

            
        </div>
    </div>
</span>

<!-- PAGE 1 - Partnership insurance -->
<span class="page-11" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Partnership Insurance</h1></div>
                <div class="twelve columns white "><p class="white pb-1">Provides money on the death of a partner to allow the surviving partners to buy out his / her estate from the partnership.</p></div>
            </div>
        </div>
    </div>

    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="11" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Partnership Insurance</div>
        </div>
    </div>

            <div class="row ">
                <div class="twelve columns">
                        <h1 class="pt-1 pb-1">Life Assurance & Partnership Legal Agreement</h1>
                        <p class="pt-1 pb-1 m-0">There are two parts to a Partnership Insurance arrangement. Each partner should take out a protection plan on his/her own life for the benefit of the other partners. All participating partners enter into the legal agreement. The legal agreement should outline the precise entitlement of each partner’s estate in the event of a partner’s death.</p>
                        <p class="pt-1 pb-1 m-0">The Life Assurance can be done in <strong>two ways</strong>:</p>
                </div>
            </div>

            <div class="row ">
                <div class="six columns">
                        <h2 class="pt-1 pb-1 header">A) Life of Another</h1>
                        <p class="pt-1 pb-1 m-0">Each partner who has signed up to the legal agreement takes out a protection plan on the life of the other partners.</p>
                        <p class="pt-1 pb-1 m-0">The total level of cover on each partner over all plans should equal the total value of their share of the partnership.</p>
                        <p class="pt-1 pb-1 m-0">The owner of each plan pays the premium on the plan.<br/><br/></p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="1a" data-next="13"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
                </div>
                <div class="six columns">
                        <h2 class="pt-1 pb-1 header">B) Own Life in Trust</h1>
                        <p class="pt-1 pb-1 m-0">Each partner who has signed up to the legal agreement takes out a protection plan on their own life for a sum assured equal to the value of their share of the partnership.</p>
                        <p class="pt-1 pb-1 m-0">The level of cover on the plan should equal the total value of the partners share of the partnership.</p>
                        <p class="pt-1 pb-1 m-0">The owner of each plan pays the premium on the plan.</p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="1b" data-next="13"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
                </div>
            </div>
            <!--<div class="row ">
                <div class="twelve columns">
                    <div class="grey pt-2 stepper">STEP 2</div>
                        <h1 class="pt-1 pb-1">Partnership Legal Agreement</h1>
                        <p class="pt-1">Should outline the precise entitlement of each partner’s estate in the event of a partner’s death. All participating partners enter into this agreement.</p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="1c" data-next="13"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
                </div>
            </div>
-->

            <div class="report-container">
                <div class="row ">
                    <div class="twelve columns">
                        <div class="grey pt-2 stepper">CLIENT REPORT</div>
                        <p class="pt-1 pb-1 m-0">Produce a report for your client expressing an interest in Partnership Insurance.</p>
                        <p class="pt-1 pb-1 m-0">Select which type of Partnership Insurance report you would like to create.</p>
                        <select id="partnershipDropdown" >
                            <option value="life">Life of Another</option>
                            <option value="own">Own Life in Trust</option>
                        </select>
                        <a class="button button-secondary journeyBtn full-width reportBtn-life" href="javascript:void(0)" data-step="11" data-next="report-11"><i class="fa fa-book" aria-hidden="true"></i> Create 'Life of Another' Report </a>
                        <a style="display:none;" class="button button-secondary journeyBtn full-width reportBtn-own" href="javascript:void(0)" data-step="11" data-next="report-12"><i class="fa fa-book" aria-hidden="true"></i> Create 'Own Life in Trust' Report </a>
                    </div>
                </div>
            </div>
</span>



<!-- PAGE 2 - Shareholder in a company -->
<span class="page-21" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Shareholder in a Company</h1></div>
            </div>
        </div>
    </div>

    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="21" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Company Shareholder</div>
        </div>
    </div>
            <div class="row ">
                <div class="four columns">
                        <h2 class="pt-1 pb-1 header">Option 1</h1>
                        <p class="pt-1 pb-1 m-0">Does your company have unsecured loans that need to be repaid on your /someone else’s death?</p>
                        <p class="pt-1 pb-1 m-0"><br/><a href="javascript:void(0)" class="journeyBtn" data-step="21e1"><i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp;Example</a></p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="21" data-next="211">NEXT <i class="fa fa-chevron-circle-right" aria-hidden="true"></i> </a>
                </div>
                <div class="four columns">
                        <h2 class="pt-1 pb-1 header">Option 2</h1>
                        <p class="pt-1 pb-1 m-0">Is there a key employee whose death or serious illness would impact the profits of the business or who would need to be replaced urgently?</p>
                        <p class="pt-1 pb-1 m-0"><a href="javascript:void(0)" class="journeyBtn" data-step="21e2"><i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp;Example</a></p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="21" data-next="212">NEXT <i class="fa fa-chevron-circle-right" aria-hidden="true"></i> </a>
                </div>
                <div class="four columns">
                        <h2 class="pt-1 pb-1 header">Option 3</h1>
                        <p class="pt-1 pb-1 m-0">Do you want to ensure the continuity of the business by putting funds in place to buy back a deceased shareholders share in the company from his / her family? </p>
                        <p class="pt-1 pb-1 m-0"><a href="javascript:void(0)" class="journeyBtn" data-step="21e3"><i class="fa fa-list-alt" aria-hidden="true"></i>&nbsp;Example</a></p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="21" data-next="213">NEXT <i class="fa fa-chevron-circle-right" aria-hidden="true"></i> </a>
                </div>
            </div>
</span>


<!-- PAGE 211 - Shareholder in a company -->
<span class="page-211" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Keyperson Cover - Loan</h1></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="211" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="211" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Keyperson Cover - Loan</div>
        </div>
    </div>
    <div class="row ">
        <div class="twelve columns">
                <p class="pt-1 pb-1 m-0">The company takes out a protection plan on a key person to provide for the calling in of loans on his / her death or serious illness.</p>
                    <ul class="protectionList">
                        <li>Life assured = key person</li>
                        <li>Plan owner = company (the plan owner must sign for and on behalf of the company)</li>
                        <li>Payer of premium = company</li>
                        <li>Benefits paid to the company</li>
                    </ul>
                <p></p>
                <p></p>
                <p></p>
                <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="company" data-step="211a" data-next="2"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;REQUIREMENTS</a>
        </div>
    </div>
            <div class="report-container">
                <div class="row ">
                    <div class="twelve columns">
                        <div class="grey pt-2 stepper">CLIENT REPORT</div>
                            <p class="pt-1 pb-1 m-0">Produce a report for your client expressing an interest in Keyperson Cover - Loan.</p>
                            <a class="button button-secondary journeyBtn full-width" href="javascript:void(0)" data-step="211" data-next="report-211"><i class="fa fa-book" aria-hidden="true"></i> Create Report </a>
                    </div>
                </div>
            </div>
</span>



<!-- PAGE 212 - Shareholder in a company -->
<span class="page-212" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Keyperson Cover - Loss of Profits / Replacement Costs</h1></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="212" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="212" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Keyperson Cover - Loss of Profits / Replacement Costs</div>
        </div>
    </div>
    <div class="row ">
        <div class="twelve columns">
                <p class="pt-1 pb-1 m-0">The company takes out a protection plan on a key person to replace them or to provide for the loss of profits on his / her death or serious illness.</p>
                    <ul class="protectionList">
                        <li>Life assured = key person</li>
                        <li>Plan owner = company (the plan owner must sign for and on behalf of the company)</li>
                        <li>Payer of premium = company</li>
                        <li>Benefits paid to the company</li>
                    </ul>
                <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="company" data-step="212a" data-next="2"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;REQUIREMENTS</a>
        </div>
    </div>
            <div class="report-container">
                <div class="row ">
                    <div class="twelve columns">
                        <div class="grey pt-2 stepper">CLIENT REPORT</div>
                            <p class="pt-1 pb-1 m-0">Produce a report for your client expressing an interest in Keyperson Cover - Loss of Profits / Replacement Costs.</p>
                            
                        <p class="pt-1 pb-1 m-0">Select the reason for this cover to create the Keyperson report:</p>
                            

                        <select id="companylossreplaceDropdown" >
                            <option value="loss">Loss of Profits</option>
                            <option value="replacement">Replacement Costs</option>
                        </select>

                        <a class="button button-secondary journeyBtn full-width reportBtn-loss" href="javascript:void(0)" data-step="212" data-next="report-2121"><i class="fa fa-book" aria-hidden="true"></i> Create 'Loss of Profits' Report </a>
                        <a class="button button-secondary journeyBtn full-width reportBtn-replacement" style="display:none;"href="javascript:void(0)" data-step="212" data-next="report-2122"><i class="fa fa-book" aria-hidden="true"></i> Create 'Replacement Costs' Report </a>
                    </div>
                </div>
            </div>
</span>




<!-- PAGE 213 - Shareholder Protection -->
<span class="page-213" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Shareholder Protection</h1></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="213" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Shareholder Protection</div>
        </div>
    </div>

    <div class="row ">
                <div class="twelve columns">
                        <h1 class="pt-1 pb-1">Shareholder Protection</h1>
                        <p class="pt-1 pb-1 m-0">Provides funds on the death of a shareholder to enable the surviving shareholders to maintain ownership and control of the business. It also allows for the deceased's shares to be bought back from his / her estate.</p>
                        <p class="pt-1 pb-1 m-0">This can be done in <strong>two ways</strong>:</p>
                </div>
            </div>

            <div class="row ">
                <div class="six columns">
                        <h2 class="pt-1 pb-1 header">A) Corporate Shareholder Protection</h1>
                        <p class="pt-1 pb-1 m-0">Corporate Shareholder Protection may be the solution where;</p>
                        <ul class="protectionList">
                            <li>All shareholders are not participating</li>
                            <li>The shares have been owned for MORE than 3 years</li>
                            <li>The plan is owned and the premium paid by the COMPANY</li>
                        </ul>
                        
                        <p class="pt-1 pb-1 m-0">It may not be the solution for holding / investment companies, where there are non resident shareholders or the shares have been owned for LESS than 3 years.</p>
                        <p class="pt-1 pb-1 m-0"><i>See the rules for CGT treatment on the sale of shares back to the company.</i><br/><br/></p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="213" data-next="213A">NEXT <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></a>
                </div>
                <div class="six columns">
                        <h2 class="pt-1 pb-1 header">B) Personal Shareholder Protection</h1>
                        <p class="pt-1 pb-1 m-0">Personal Shareholder Protection may be the solution in most cases, particularly where;</p>
                        <ul class="protectionList">
                            <li>the business is a holding company/investment company</li>
                            <li>shares have been owned for LESS than 3 years</li>
                            <li>there are non resident shareholders, and</li>
                            <li>the plan is to be owned and the premiums paid PERSONALLY.</li>
                        </ul>
                        
                        <p class="pt-1 pb-1 m-0">It may not be the solution where all shareholders are not participating as only shareholders who participate in the arrangement may benefit from it.<br/><br/></p>
                        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="213" data-next="213B">NEXT <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></a>
                </div>
            </div>
</span>



<!-- PAGE 213 - Shareholder Protection - Option A -->
<span class="page-213A" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Corporate Shareholder Protection Declaration</h1></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="213A" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213A" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213A" data-next="213">SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Declaration</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">STEP 1</div>
                <h1 class="pt-1 pb-1">Before choosing this option you MUST ensure</h1>
                <p class="pt-1 pb-1 m-0"> - The company can meet the Company Law Conditions i.e. that the company can buy back it’s own shares under it’s constitution.</p>
                <a class="button button-primary journeyBtn" href="javascript:void(0)" data-client="company" data-step="213a1" data-next="2">READ MORE</a>
                <p class="pt-1 pb-1 m-0"> - The family will meet ALL the conditions to ensure the buy back will be subject to CGT and NOT income tax. </p>
                <a class="button button-primary journeyBtn" href="javascript:void(0)" data-client="company" data-step="213a2" data-next="2">READ MORE</a>
        </div>
    </div>
    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">STEP 2</div>
                <h1 class="pt-1 pb-1">Please confirm</h1>
                <p class="pt-1 pb-1 m-0"> 
                <div class="checkbox">
				  	<label><input id="corporate-confirm" name="corporate-confirm" type="checkbox" value="" style="">I have read and understood the conditions</label>
				</div></p>
                <a class="button button-primary journeyBtn full-width companyConfirmBtn" style="display:none;" href="javascript:void(0)" data-client="company" data-step="213A" data-next="213AA">NEXT <i class="fa fa-chevron-circle-right" aria-hidden="true"></i></a>
        </div>
    </div>

</span>


<!-- PAGE 213 - Shareholder Protection - Option A - Final-->
<span class="page-213AA" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Corporate Shareholder Protection</h1></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="213AA" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213AA" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213AA" data-next="213">SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213AA" data-next="213A">DECLARATION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Corporate Sharehholder Protection</div>
        </div>
    </div>

    <h1 class="pt-1 pb-1">Life Insurance &amp; Shareholders Legal Agreement</h1>
    <p class="pt-1 pb-1 m-0">The company takes out a protection plan on each shareholder who is to be party to the arrangement. Each participating shareholder, whose shares are to be bought back on their death, completes their own legal agreement with the company.</p>
        <ul class="protectionList">
            <li>Life assured = shareholder</li>
            <li>Plan owner = company (the plan owner must sign for and on behalf of the company)</li>
            <li>Payer of premium = company</li>
            <li>Benefits are paid to the company</li>
        </ul>
        
        <a href="<?php echo variable_get('business_protection_filter_corporate_shareholder_buy_back') ?>" target="_blank" class="download-link"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;What happens after the buy back?</a>

        <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="company" data-step="213AA1" data-next="x"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;REQUIREMENTS</a>



        <div class="report-container">
            <div class="row ">
                <div class="twelve columns">
                    <div class="grey pt-2 stepper">CLIENT REPORT</div>
                        <p class="pt-1 pb-1 m-0">Produce a report for your client expressing an interest in Corporate Shareholder Protection.</p>
                        
                    <a class="button button-secondary journeyBtn full-width" href="javascript:void(0)" data-step="213AA" data-next="report-213AAa"><i class="fa fa-book" aria-hidden="true"></i> Create 'Corporate Shareholder Protection' Report </a>
                </div>
            </div>
        </div>

</span>






<!-- PAGE 213 - Shareholder Protection - Option A -->
<span class="page-213B" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Personal Shareholder Protection</h1></div>
            </div>
        </div>
    </div>
    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="213B" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213B" data-next="21">COMPANY SHAREHOLDER</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;<a href="javascript:void(0);" class="breadcrumbBtn" data-step="213B" data-next="213">SHAREHOLDER PROTECTION</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Personal Shareholder Protection</div>
        </div>
    </div>
    <div class="row ">
        <div class="twelve columns">
                <h1 class="pt-1 pb-1">Life Assurance &amp; Shareholder Legal Agreement</h1>
                <p class="pt-1 pb-1 m-0">Each shareholder takes out a life assurance plan on his / her own life for the benefit of the other shareholders. All of the shareholders who are to benefit from the arrangement are party to the one legal agreement.</p>
                <p class="pt-1 pb-1 m-0">The Life Assurance can be done in <strong>two ways</strong>:</p>
        </div>
    </div>

    <div class="row ">
        <div class="six columns">
                <h2 class="pt-1 pb-1 header">A) Life of Another</h1>
                <p class="pt-1 pb-1 m-0">Each shareholder who has signed up to the legal agreement takes out a protection plan on the life of the other shareholders.</p>
                <p class="pt-1 pb-1 m-0">The total level of cover on each shareholder over all plans should equal the total value of their share of the company.</p>
                <p class="pt-1 pb-1 m-0">The owner of each plan will pay the premium on the plan.<br/><br/></p>
                <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="213BA" data-next="x"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
        </div>
        <div class="six columns">
                <h2 class="pt-1 pb-1 header">B) Own Life in Trust</h1>
                <p class="pt-1 pb-1 m-0">Each shareholder covered by the legal agreement takes out a protection plan on their own life for a sum assured equal to the value of their share of the business.</p>
                <p class="pt-1 pb-1 m-0">Each plan is written under trust for the benefit of the other shareholders covered by the agreement.</p>
                <p class="pt-1 pb-1 m-0">Each shareholder pays the premium on his / her own plan.</p>
                <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="213BB" data-next="x"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
        </div>
    </div>
    <div class="row ">
        <div class="twelve columns">
            <div class="grey pt-2 stepper">INFO</div>
            <p class="pt-1 pb-1 m-0"><a href="<?php echo variable_get('business_protection_filter_personal_shareholder_buy_back') ?>" target="_blank" class="download-link"><i class="fa fa-file-pdf-o" aria-hidden="true"></i>&nbsp;What happens after the buy back?</a> </p>            
        </div>
    </div>

    <div class="report-container">
        <div class="row ">
            <div class="twelve columns">
                <div class="grey pt-2 stepper">CLIENT REPORT</div>
                    <p class="pt-1 pb-1 m-0">Produce a report for your client expressing an interest in Personal Shareholder Protection.</p>
                        <p class="pt-1 pb-1 m-0">Select which type of Personal Shareholder Protection report you would like to create.</p>
                        <select id="personalshareholderDropdown" >
                            <option value="life">Life of Another</option>
                            <option value="own">Own Life in Trust</option>
                        </select>
                    <a class="button button-secondary journeyBtn full-width reportBtn-personallife" href="javascript:void(0)" data-step="213B" data-next="report-213Ba"><i class="fa fa-book" aria-hidden="true"></i> Create 'Life of Another' Report </a>
                    <a class="button button-secondary journeyBtn full-width reportBtn-personalown" style="display:none;" href="javascript:void(0)" data-step="213B" data-next="report-213Bb"><i class="fa fa-book" aria-hidden="true"></i> Create 'Own Life in Trust' Report </a>
            </div>
        </div>
    </div>
</span>



<!-- PAGE 3 - Sole Trader -->
<span class="page-31" style="display:none;">
    <div class="header-banner">
        <div class="container ">
            <div class="row center">
                <div class="twelve columns white "><h1 class="white pt-5 pb-5">Sole Trader</h1></div>
            </div>
        </div>
    </div>

    <div class="breadcrumbs">
        <div class="row ">
            <div class="twelve columns "><a href="javascript:void(0);" class="breadcrumbBtn" data-step="31" data-next="1">HOME</a>&nbsp;<i class="fa fa-chevron-right" aria-hidden="true"></i>&nbsp;Sole Trader</div>
        </div>
    </div>

    <div class="row ">
        <div class="twelve columns">
                <h1 class="pt-1 pb-1">Sole Trader</h1>
                <p class="pt-1 pb-1 m-0">If a sole trader wants to protect his / her business or a key employee in his / her business this is done on a personal basis.</p>
                <p class="pt-1 pb-1 m-0">This can be done in <strong>two ways</strong>:</p>
        </div>
    </div>

    <div class="row ">
        <div class="six columns">
                <h2 class="pt-1 pb-1 header">A) Own Life Plan</h1>
                <p class="pt-1 pb-1 m-0">Do you have unsecured loans on your business that need to be repaid on your death?<br/><br/></p>
                <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="31A" data-next="x"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
        </div>
        <div class="six columns">
                <h2 class="pt-1 pb-1 header">B) Life of Another</h1>
                <p class="pt-1 pb-1 m-0">Is there a key employee whose death or serious illness would impact the profits of your business or who would need to be replaced urgently?</p>
                <a class="button button-primary journeyBtn full-width" href="javascript:void(0)" data-client="sole" data-step="31B" data-next="x"><i class="fa fa-file-pdf-o" aria-hidden="true"></i> REQUIREMENTS </a>
        </div>
    </div>

</span>


